/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * The person's files over WebDAV, as the Files app reads and writes them: a
 * vault's folder as the storage js/vault.js uses (encrypted files only), and the
 * search for folders that hold a vault (or an inbox's marker).
 *
 * A write succeeds on any 2xx that no redirect led to (a redirect could end on a
 * sign-in page with 200): Nextcloud answers a part of a chunked upload to object
 * storage with an empty 200, not the 201 it means (its plugin stops WebDAV before
 * the response is sent). What a write stored is read back and compared anyway
 * (js/vault.js).
 *
 * Writing never overwrites by accident: a new file is put with If-None-Match: *
 * and moved with Overwrite: F, so the server refuses (412, VaultError 'exists')
 * where something of that name appeared meanwhile. A file is complete or absent:
 * Nextcloud writes a PUT to a .part file and renames it, and assembles a chunked
 * upload (CHUNKED_FROM and up) only at its final MOVE.
 *
 * The person's other files (davStorage('')) are read for copying into a vault and
 * written for exporting out of one; a file moved into a vault is deleted only if
 * it did not change meanwhile (If-Match), and also from the deleted files.
 */
import { getCurrentUser } from '@nextcloud/auth'
import { generateRemoteUrl } from '@nextcloud/router'
import vaultLib from '../app/cryptomator_vaults/js/vault.js'

const { VaultError } = vaultLib
const DAV = 'DAV:'
const OC = 'http://owncloud.org/ns'
const NC = 'http://nextcloud.org/ns'
// What a listing asks for: the type, size and time, the ETag (which changes with
// the contents, a folder's also with anything inside it), the permissions and when
// a file was uploaded (an inbox's files wait while they may still be written).
const PROPS = '<?xml version="1.0"?><d:propfind xmlns:d="DAV:" xmlns:oc="http://owncloud.org/ns" xmlns:nc="http://nextcloud.org/ns"><d:prop>'
	+ '<d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getetag/><oc:permissions/><nc:upload_time/></d:prop></d:propfind>'
// Larger files go up in chunks (Nextcloud's chunked upload, v2): each request
// stays below the server's upload limit, and the object store assembles the parts.
const CHUNKED_FROM = 20 * 1024 * 1024
const CHUNK_SIZE = 10 * 1024 * 1024

function requestToken() {
	return (window.OC && window.OC.requestToken) || document.head.dataset.requesttoken || ''
}

function davHeaders(extra) {
	return { requesttoken: requestToken(), 'X-Requested-With': 'XMLHttpRequest', ...(extra || {}) }
}

export function userId() {
	return getCurrentUser()?.uid ?? ''
}

function encodePath(path) {
	return path.split('/').filter((part) => part !== '').map(encodeURIComponent).join('/')
}

/** A folder of the person's files, as a WebDAV URL ending in /. */
function filesUrl(folder) {
	const inner = encodePath(folder)
	return generateRemoteUrl('dav') + '/files/' + encodeURIComponent(userId()) + '/' + (inner ? inner + '/' : '')
}

function parseMultistatus(text) {
	const xml = new DOMParser().parseFromString(text, 'application/xml')
	return Array.from(xml.getElementsByTagNameNS(DAV, 'response')).map((response) => {
		const prop = (name, ns = DAV) => response.getElementsByTagNameNS(ns, name)[0]
		const length = prop('getcontentlength')
		const modified = prop('getlastmodified')
		const uploaded = Number(prop('upload_time', NC)?.textContent) || 0
		return {
			href: prop('href').textContent,
			isDir: response.getElementsByTagNameNS(DAV, 'collection').length > 0,
			size: length ? Number(length.textContent) : 0,
			mtime: modified ? new Date(modified.textContent) : undefined,
			uploadTime: uploaded ? new Date(uploaded * 1000) : undefined,
			etag: prop('getetag')?.textContent || undefined,
			permissions: prop('permissions', OC)?.textContent ?? '',
			originalLocation: prop('trashbin-original-location', NC)?.textContent,
			deletionTime: Number(prop('trashbin-deletion-time', NC)?.textContent) || 0,
		}
	})
}

function lastSegment(href) {
	const parts = href.replace(/\/+$/, '').split('/')
	return decodeURIComponent(parts[parts.length - 1])
}

// The request's method in the message: which step failed (the paths are opaque).
function davError(status, relative, method) {
	if (status === 0) {
		return new VaultError('network', (method ? method + ': ' : '') + 'redirected (signed out?)')
	}
	if (status === 404) {
		return new VaultError('not-found', relative)
	}
	if (status === 412 || status === 405) {
		return new VaultError('exists', relative)
	}
	if (status === 507) {
		return new VaultError('quota', relative)
	}
	return new VaultError('network', (method ? method + ': ' : '') + 'HTTP ' + status)
}

/** Success of a write: a 2xx status, not reached through a redirect. */
function succeeded(status, redirected) {
	return status >= 200 && status < 300 && !redirected
}

/** A request with the upload's progress (fetch reports none): resolves with its status, 0 after a redirect. */
function send(method, url, headers, body, onProgress) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest()
		request.open(method, url)
		for (const [name, value] of Object.entries(davHeaders(headers))) {
			request.setRequestHeader(name, value)
		}
		if (onProgress) {
			request.upload.addEventListener('progress', (event) => onProgress(event.loaded, event.total))
		}
		// A redirect followed (e.g. to a sign-in page) counts as no success.
		request.addEventListener('load', () => resolve(new URL(request.responseURL, url).href === new URL(url, window.location.href).href ? request.status : 0))
		request.addEventListener('error', () => reject(new VaultError('network', method + ' failed')))
		request.addEventListener('abort', () => reject(new VaultError('network', method + ' aborted')))
		request.send(body ?? null)
	})
}

/** A write with fetch: succeeds on a 2xx without redirect, or on one of the statuses in also. */
async function davRequest(method, url, headers, relative, also = []) {
	const response = await fetch(url, { method, headers: davHeaders(headers), credentials: 'same-origin' })
	if (!succeeded(response.status, response.redirected) && !also.includes(response.status)) {
		throw davError(response.redirected ? 0 : response.status, relative, method)
	}
	return response
}

/** The vault's folder: paths relative to it, contents as they are stored (encrypted). */
export function davStorage(folder) {
	const base = filesUrl(folder)
	const url = (relative) => base + encodePath(relative)
	// A file in parts (Nextcloud's chunked upload, v2): an upload folder, its parts in
	// turn, then one MOVE onto the target, which only then appears.
	async function writeChunked(relative, total, parts, create, onProgress) {
		const uploads = generateRemoteUrl('dav') + '/uploads/' + encodeURIComponent(userId()) + '/'
			+ 'cryptomator-vaults-' + crypto.randomUUID()
		const target = new URL(url(relative), window.location.href).href
		const common = { Destination: target, 'OC-Total-Length': String(total) }
		await davRequest('MKCOL', uploads, { Destination: target }, relative)
		try {
			let sent = 0
			let number = 1
			for await (const part of parts) {
				const status = await send('PUT', uploads + '/' + String(number).padStart(5, '0'), common, part,
					(done) => onProgress?.(sent + done, total))
				if (!succeeded(status, false)) {
					throw davError(status, relative, 'PUT (part ' + number + ')')
				}
				sent += part.length
				number++
			}
			const response = await fetch(uploads + '/.file', {
				method: 'MOVE',
				headers: davHeaders({ ...common, Overwrite: create ? 'F' : 'T' }),
				credentials: 'same-origin',
			})
			if (!succeeded(response.status, response.redirected)) {
				throw davError(response.redirected ? 0 : response.status, relative, 'MOVE (assembling the parts)')
			}
		} catch (error) {
			await fetch(uploads, { method: 'DELETE', headers: davHeaders(), credentials: 'same-origin' }).catch(() => {})
			throw error
		}
	}

	// A whole file in memory, as parts of CHUNK_SIZE.
	function * slices(data) {
		for (let offset = 0; offset < data.length; offset += CHUNK_SIZE) {
			yield data.subarray(offset, Math.min(offset + CHUNK_SIZE, data.length))
		}
	}

	return {
		async read(relative, onProgress) {
			const response = await fetch(base + encodePath(relative), { headers: davHeaders(), credentials: 'same-origin' })
			if (response.status === 404) {
				throw new VaultError('not-found', relative)
			}
			if (!response.ok) {
				throw new VaultError('network', 'GET: HTTP ' + response.status)
			}
			const total = Number(response.headers.get('Content-Length')) || 0
			if (!onProgress || !response.body || total === 0) {
				return new Uint8Array(await response.arrayBuffer())
			}
			const data = new Uint8Array(total)
			const reader = response.body.getReader()
			let received = 0
			for (;;) {
				const { done, value } = await reader.read()
				if (done) {
					break
				}
				data.set(value, received)
				received += value.length
				onProgress(received, total)
			}
			return data.subarray(0, received)
		},
		async stat(relative) {
			const response = await fetch(url(relative), {
				method: 'PROPFIND',
				headers: davHeaders({ Depth: '0', 'Content-Type': 'application/xml; charset=utf-8' }),
				credentials: 'same-origin',
				body: PROPS,
			})
			if (response.status === 404) {
				return null
			}
			if (response.status !== 207) {
				throw davError(response.status, relative, 'PROPFIND')
			}
			const [entry] = parseMultistatus(await response.text())
			return { isDir: entry.isDir, size: entry.size, etag: entry.etag, permissions: entry.permissions }
		},
		/** Stores a file whole; create: refused (VaultError 'exists') if the name is taken. */
		async write(relative, data, { create = false, onProgress } = {}) {
			if (data.length >= CHUNKED_FROM) {
				return writeChunked(relative, data.length, slices(data), create, onProgress)
			}
			const status = await send('PUT', url(relative), create ? { 'If-None-Match': '*' } : {}, data, onProgress)
			if (!succeeded(status, false)) {
				throw davError(status, relative, 'PUT')
			}
		},
		/** A file too large to hold, from its parts in turn (chunked upload); complete or absent. */
		async writeParts(relative, total, parts, { create = false, onProgress } = {}) {
			return writeChunked(relative, total, parts, create, onProgress)
		},
		/** Bytes start to end (exclusive) of a stored file. */
		async readRange(relative, start, end) {
			if (end <= start) {
				return new Uint8Array(0)
			}
			const response = await fetch(url(relative), {
				headers: davHeaders({ Range: 'bytes=' + start + '-' + (end - 1) }),
				credentials: 'same-origin',
			})
			if (response.status === 404) {
				throw new VaultError('not-found', relative)
			}
			if (response.status === 206) {
				return new Uint8Array(await response.arrayBuffer())
			}
			if (response.status === 200) {
				// No ranges served: the whole file, cut here.
				return new Uint8Array(await response.arrayBuffer()).slice(start, end)
			}
			throw new VaultError('network', 'GET (range): HTTP ' + response.status)
		},
		async mkdir(relative, { existsOk = false } = {}) {
			const response = await fetch(url(relative), { method: 'MKCOL', headers: davHeaders(), credentials: 'same-origin' })
			if (succeeded(response.status, response.redirected) || (response.status === 405 && existsOk)) {
				return
			}
			throw davError(response.status, relative, 'MKCOL')
		},
		/** Moves in one step; refused (VaultError 'exists') if the target is taken, unless overwrite. */
		async move(from, to, { overwrite = false } = {}) {
			await davRequest('MOVE', url(from), { Destination: new URL(url(to), window.location.href).href, Overwrite: overwrite ? 'T' : 'F' }, to)
		},
		/** Copies on the server; refused (VaultError 'exists') if the target is taken. */
		async copy(from, to) {
			await davRequest('COPY', url(from), { Destination: new URL(url(to), window.location.href).href, Overwrite: 'F' }, to)
		},
		async remove(relative) {
			await davRequest('DELETE', url(relative), {}, relative, [404])
		},
		/**
		 * Deletes a file or folder only as it was (its ETag): VaultError 'changed' if it
		 * changed meanwhile (a folder: anything inside it), 'not-found' if it is gone.
		 * A file's DELETE carries If-Match; Nextcloud refuses that on folders, so a
		 * folder's ETag is compared just before.
		 */
		async removeUnchanged(relative, etag, { isDir = false } = {}) {
			if (isDir) {
				const found = await this.stat(relative)
				if (found === null) {
					throw new VaultError('not-found', relative)
				}
				if (found.etag !== etag) {
					throw new VaultError('changed', relative)
				}
			}
			const response = await fetch(url(relative), { method: 'DELETE', headers: davHeaders(isDir ? {} : { 'If-Match': etag }), credentials: 'same-origin' })
			if (response.status === 412) {
				throw new VaultError('changed', relative)
			}
			if (!succeeded(response.status, response.redirected)) {
				throw davError(response.redirected ? 0 : response.status, relative, 'DELETE')
			}
		},
		async list(relative) {
			const response = await fetch(base + (relative ? encodePath(relative) + '/' : ''), {
				method: 'PROPFIND',
				headers: davHeaders({ Depth: '1', 'Content-Type': 'application/xml; charset=utf-8' }),
				credentials: 'same-origin',
				body: PROPS,
			})
			if (response.status === 404) {
				throw new VaultError('not-found', relative)
			}
			if (!response.ok) {
				throw new VaultError('network', 'PROPFIND: HTTP ' + response.status)
			}
			// The first response is the folder itself.
			return parseMultistatus(await response.text()).slice(1)
				.map((entry) => ({ name: lastSegment(entry.href), isDir: entry.isDir, size: entry.size, mtime: entry.mtime, uploadTime: entry.uploadTime, etag: entry.etag, permissions: entry.permissions }))
		},
	}
}

/** The folders of the person's files that hold a file of this name, e.g. /Documents/Vault. */
async function foldersHolding(name) {
	const user = userId()
	const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;')
	const response = await fetch(generateRemoteUrl('dav') + '/', {
		method: 'SEARCH',
		headers: davHeaders({ 'Content-Type': 'text/xml; charset=utf-8' }),
		credentials: 'same-origin',
		body: '<?xml version="1.0" encoding="UTF-8"?>'
			+ '<d:searchrequest xmlns:d="DAV:"><d:basicsearch>'
			+ '<d:select><d:prop><d:displayname/></d:prop></d:select>'
			+ '<d:from><d:scope><d:href>/files/' + escape(user) + '</d:href><d:depth>infinity</d:depth></d:scope></d:from>'
			+ '<d:where><d:like><d:prop><d:displayname/></d:prop><d:literal>' + escape(name) + '</d:literal></d:like></d:where>'
			+ '</d:basicsearch></d:searchrequest>',
	})
	if (!response.ok) {
		throw new Error('HTTP ' + response.status)
	}
	const prefix = '/files/' + user + '/'
	return parseMultistatus(await response.text())
		.map((entry) => decodeURIComponent(entry.href))
		.filter((href) => href.endsWith('/' + name) && href.includes(prefix))
		.map((href) => '/' + href.slice(href.indexOf(prefix) + prefix.length, -('/' + name).length))
		.map((folder) => folder.replace(/\/+$/, '') || '/')
		.sort((a, b) => a.localeCompare(b))
}

/** The folders of the person's files that hold a vault.cryptomator, e.g. /Documents/Vault. */
export function findVaults() {
	return foldersHolding('vault.cryptomator')
}

/** The folders of the person's files that hold a file of this name: inboxes, by their marker. */
export function findMarkers(name) {
	return foldersHolding(name)
}

/**
 * The files and folders chosen in the person's files (paths such as /Documents/a),
 * walked down: one item per chosen path, {path, name, isDir, etag, permissions,
 * files: [{path, name, size, etag, dirs}], folders: [dirs]}, where dirs are the
 * folders from the chosen one's parent down to the file (a chosen folder's name
 * first). A folder that holds a vault (a vault.cryptomator anywhere inside) is
 * refused (VaultError 'contains-vault'): its encrypted files are no one's to copy.
 */
export async function walkFiles(storage, paths) {
	const items = []
	for (const chosen of paths) {
		const path = chosen.replace(/^\/+|\/+$/g, '')
		const name = path.split('/').pop()
		const found = await storage.stat(path)
		if (found === null) {
			throw new VaultError('not-found', path)
		}
		const item = { path, name, isDir: found.isDir, etag: found.etag, permissions: found.permissions, files: [], folders: [] }
		if (!found.isDir) {
			item.files.push({ path, name, size: found.size, etag: found.etag, dirs: [] })
		} else {
			const visit = async (folder, dirs) => {
				item.folders.push(dirs)
				const entries = await storage.list(folder)
				if (entries.some((entry) => !entry.isDir && entry.name === 'vault.cryptomator')) {
					throw new VaultError('contains-vault', folder)
				}
				for (const entry of entries) {
					const inside = folder + '/' + entry.name
					if (entry.isDir) {
						await visit(inside, [...dirs, entry.name])
					} else {
						item.files.push({ path: inside, name: entry.name, size: entry.size, etag: entry.etag, dirs })
					}
				}
			}
			await visit(path, [name])
		}
		items.push(item)
	}
	return items
}

/**
 * Removes what was just deleted at path (e.g. Documents/a) from the person's
 * deleted files, with its versions: the newest item from there. True if it was
 * removed or there are no deleted files (the app is off: deleting was final),
 * false if it is not among them (e.g. it was in someone else's share).
 */
export async function purgeDeleted(path) {
	return (await purgeDeletedMany([path])).has(path.replace(/^\/+|\/+$/g, ''))
}

/**
 * purgeDeleted for several paths, with one listing of the deleted files: the set
 * of those removed (all of them where there are no deleted files). onlyEmpty
 * removes a deleted folder only if nothing is in it: a file put into it just
 * before it was deleted is no one's to destroy.
 */
export async function purgeDeletedMany(paths, { onlyEmpty = false } = {}) {
	const wanted = paths.map((path) => path.replace(/^\/+|\/+$/g, ''))
	const trash = generateRemoteUrl('dav') + '/trashbin/' + encodeURIComponent(userId()) + '/trash/'
	const propfind = (url) => fetch(url, {
		method: 'PROPFIND',
		headers: davHeaders({ Depth: '1', 'Content-Type': 'application/xml; charset=utf-8' }),
		credentials: 'same-origin',
		body: '<?xml version="1.0"?><d:propfind xmlns:d="DAV:" xmlns:nc="http://nextcloud.org/ns"><d:prop>'
			+ '<d:resourcetype/><nc:trashbin-original-location/><nc:trashbin-deletion-time/></d:prop></d:propfind>',
	})
	const response = await propfind(trash)
	if (response.status === 404 || response.status === 405) {
		return new Set(wanted)
	}
	if (response.status !== 207) {
		throw davError(response.status, wanted[0] ?? '', 'PROPFIND (deleted files)')
	}
	const items = parseMultistatus(await response.text()).slice(1)
	const removed = new Set()
	for (const path of wanted) {
		const [item] = items.filter((entry) => entry.originalLocation === path).sort((a, b) => b.deletionTime - a.deletionTime)
		if (!item) {
			continue
		}
		const url = new URL(item.href, window.location.href).href
		if (onlyEmpty && item.isDir) {
			const inside = await propfind(url)
			if (inside.status !== 207 || parseMultistatus(await inside.text()).length > 1) {
				continue
			}
		}
		await davRequest('DELETE', url, {}, path, [404])
		removed.add(path)
	}
	return removed
}
