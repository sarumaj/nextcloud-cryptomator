/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Inboxes of a vault: folders of the person's files that something without the
 * vault's key (Harvester, which downloads files on a schedule) fills with plain
 * files, to be moved into the vault, encrypted in the browser, once it is
 * unlocked. An inbox is a folder with a marker file, MARKER_NAME, in it:
 *
 *   {"version": 1, "vault": "/Vaults/Family papers", "target": "/Magazines",
 *    "from": "Harvester job \"Mag\""}
 *
 * vault: the vault's folder, relative to the person's files; target: the folder
 * inside the vault the files go to (/ for its top); from: who fills it, shown to
 * the person. Unknown keys are ignored; a later version is left alone. Everything
 * else in the folder, its subfolders kept, goes to target/<its path in the inbox>.
 * docs/inbox.md describes the contract for those who write markers.
 *
 * This module is the contract's logic without the browser or the server (tests in
 * tests/inbox.test.mjs); src/files.js does the reading, writing and asking.
 */

export const MARKER_NAME = '.cryptomator-inbox.json'
export const MARKER_VERSION = 1
// A marker is a few lines; anything larger is not one.
export const MARKER_LIMIT = 64 * 1024
// A file changed or uploaded more recently may still be being written: it waits
// for the next time.
export const SETTLE_MS = 2 * 60 * 1000

/**
 * A path of the person's files or of a vault's folders as /a/b (/ for the top):
 * slashes collapsed, none at the end, Unicode composed (NFC, as names are stored).
 * null for what is no path: not a string, or with a segment . or ..
 */
export function normalizePath(path) {
	if (typeof path !== 'string') {
		return null
	}
	const segments = path.normalize('NFC').split('/').filter((segment) => segment !== '')
	if (segments.some((segment) => segment === '.' || segment === '..')) {
		return null
	}
	return '/' + segments.join('/')
}

/** The names of a path's folders, from the top: /a/b gives ['a', 'b'], / none. */
export function segments(path) {
	return path.split('/').filter(Boolean)
}

/** Whether path is folder or inside it (both normalized). */
export function within(path, folder) {
	return path === folder || folder === '/' || path.startsWith(folder + '/')
}

/**
 * A marker's text, read from the inbox folder (a normalized path): {inbox} with
 * {folder, vault, target, from}, or {problem} where it is not usable: 'invalid'
 * (not a marker of this contract), 'version' (a later version, with vault where
 * it names one, so that its vault can tell), 'loop' (the inbox is the vault, in
 * it, or holds it).
 */
export function parseMarker(text, folder) {
	let data
	try {
		data = JSON.parse(text)
	} catch {
		return { problem: 'invalid' }
	}
	if (data === null || typeof data !== 'object' || Array.isArray(data)) {
		return { problem: 'invalid' }
	}
	const { version } = data
	if (!Number.isInteger(version) || version < 1) {
		return { problem: 'invalid' }
	}
	const vault = normalizePath(data.vault)
	if (version > MARKER_VERSION) {
		return { problem: 'version', version, vault, folder }
	}
	const target = data.target === undefined ? '/' : normalizePath(data.target)
	if (vault === null || target === null || (data.from !== undefined && typeof data.from !== 'string')) {
		return { problem: 'invalid' }
	}
	if (within(folder, vault) || within(vault, folder)) {
		return { problem: 'loop', vault, folder }
	}
	return { inbox: { folder, vault, target, from: (data.from ?? '').trim() } }
}

/** A marker's text for an inbox of the vault (paths as normalizePath gives them). */
export function makeMarker({ vault, target, from }) {
	const marker = { version: MARKER_VERSION, vault, target }
	if (from) {
		marker.from = from
	}
	return JSON.stringify(marker, null, '\t') + '\n'
}

/**
 * Whether a file is done being written: neither changed (mtime) nor uploaded
 * (uploadTime, which Nextcloud keeps apart from the mtime a client may set to an
 * old date) in the last SETTLE_MS. A file without either time waits.
 */
export function isSettled(file, now = Date.now()) {
	const times = [file.mtime, file.uploadTime].filter((time) => time instanceof Date && !Number.isNaN(time.getTime()))
	if (times.length === 0) {
		return false
	}
	return now - Math.max(...times.map((time) => time.getTime())) >= SETTLE_MS
}

/**
 * The name for the n-th of several files of one name in a folder (n from 2), as
 * Nextcloud names them: "Report (2).pdf"; a leading dot is no extension.
 */
export function clashName(name, n) {
	if (n < 2) {
		return name
	}
	const dot = name.lastIndexOf('.')
	return dot > 0 ? name.slice(0, dot) + ' (' + n + ')' + name.slice(dot) : name + ' (' + n + ')'
}

/**
 * What waits in an inbox, walked down with list(folder) (a folder of the person's
 * files without the leading slash: its entries {name, isDir, size, mtime,
 * uploadTime, etag, permissions}). Returns {ready, recent, skipped, folders}:
 * ready are the files to move, {path (in the person's files, no leading slash),
 * name, size, etag, permissions, inner (folders inside the inbox), dirs (the
 * folders inside the vault, from its top)}; recent the files still being written
 * (not settled); skipped the subfolders left alone, an inbox or a vault of their
 * own; folders the subfolders (inner paths), deepest first.
 */
export async function planInbox(inbox, list, now = Date.now()) {
	const top = inbox.folder.replace(/^\/+/, '')
	const target = segments(inbox.target)
	const plan = { ready: [], recent: [], skipped: [], folders: [] }
	const visit = async (inner) => {
		const folder = [top, ...inner].filter(Boolean).join('/')
		const entries = await list(folder)
		if (inner.length > 0 && entries.some((entry) => !entry.isDir && (entry.name === MARKER_NAME || entry.name === 'vault.cryptomator'))) {
			plan.skipped.push(inner)
			return false
		}
		for (const entry of entries) {
			const path = folder ? folder + '/' + entry.name : entry.name
			if (entry.isDir) {
				if (await visit([...inner, entry.name])) {
					plan.folders.push([...inner, entry.name])
				}
			} else if (inner.length === 0 && entry.name === MARKER_NAME) {
				continue
			} else if (isSettled(entry, now)) {
				plan.ready.push({ path, name: entry.name, size: entry.size, etag: entry.etag, permissions: entry.permissions ?? '', inner, dirs: [...target, ...inner] })
			} else {
				plan.recent.push({ path, name: entry.name })
			}
		}
		return true
	}
	await visit([])
	return plan
}
