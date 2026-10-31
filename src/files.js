/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Cryptomator vaults in the Files app: the view "Vaults" in its navigation,
 * whose folders are the person's vaults; an unlocked vault is browsed in Files'
 * own list. The browser decrypts (js/vault.js): the password, the keys and
 * every decrypted name and file stay in this tab. What the server could learn
 * from Files itself is kept from it:
 *
 * - Entries are not WebDAV resources and lie outside /files/ (their addresses are
 *   under BASE, never requested), with read permission only: Files' own actions
 *   that would reach the server (download, details, rename, delete, move,
 *   favourite, open in the desktop client, view in folder) are not offered for
 *   them. This integration's actions take their place.
 * - Addresses and paths are opaque: the vault, folder and file segments are hashes
 *   (VAULT/DIR/FILE_PREFIX), names are only display names. The URL of a folder
 *   (?dir=/v…/d…), which a reload sends to the server, names nothing.
 * - Every file shows the same icon (FILE_ICON) and has the type
 *   application/octet-stream: Files would fetch a type's icon from the server
 *   (/core/mimeicon?mime=…) and tell it each file's type.
 * - Every other app's file action is switched off in the view, and for the
 *   vault's entries in any view (guardActions): an action that does not know these
 *   entries could take one for a file of the server's (the sharing app offers its
 *   sidebar for any entry it takes for someone else's, as entries outside WebDAV
 *   have no owner).
 * - Locking removes the vault's entries from Files' memory (files:node:deleted).
 * - Uploads and new folders are encrypted here and written as Cryptomator writes
 *   (js/vault.js, "Writing"); Files' own upload never sees them: the entries give
 *   it no permission to create, and a drop on the list is taken before it.
 *   Renaming, moving and deleting are this integration's actions as well (js/vault.js,
 *   "Renaming, moving, deleting"); Files' own are not offered for the entries.
 *
 * In the person's own files, a vault's folder is recognised as it is opened (a
 * vault.cryptomator among its contents, or found by the search) and offers to
 * open the vault, above the list.
 *
 * tests/e2e/check.mjs checks all of it in a browser against a real Nextcloud.
 */
import { DefaultType, File, FileType, Folder, Permission, View, getFileActions, getNavigation, registerFileAction, registerFileListAction, registerFileListHeader } from '@nextcloud/files'
import { emit, subscribe } from '@nextcloud/event-bus'
import { generateFilePath, imagePath } from '@nextcloud/router'
import vaultLib from '../app/cryptomator_vaults/js/vault.js'
import { LARGE_FILE, askName, askPassword, chooseFolder, closeDialog, confirmAction, download, el, humanSize, notice, revokeAll, showFile, showUploads } from './dialogs.js'
import { davStorage, findVaults, userId } from './storage.js'
import { t } from './l10n.js'

const { Vault, checkName } = vaultLib

// Nextcloud's toasts and file picker (@nextcloud/dialogs, with Vue and its
// components) load when first needed: not on every page of Files.
let dialogsLoading = null
function dialogs() {
	if (!dialogsLoading) {
		// Their styles with them, not on every page of Files (they would restyle it).
		document.head.append(el('link', { rel: 'stylesheet', href: generateFilePath('cryptomator_vaults', 'css', 'cryptomator_vaults-files.css') }))
		dialogsLoading = import('@nextcloud/dialogs')
	}
	return dialogsLoading
}

function showError(text) {
	dialogs().then(({ showError: show }) => show(text))
}

function showInfo(text) {
	dialogs().then(({ showInfo: show }) => show(text))
}

export const VIEW_ID = 'cryptomator-vaults'
const ROOT = '/cryptomator-vaults'
const BASE = window.location.origin + '/apps/cryptomator_vaults' + ROOT
const FILE_ICON = imagePath('cryptomator_vaults', 'file.svg')
const AUTO_LOCK_MINUTES = 15
// Vault folders opened by hand (the picker, "Open vault"), beside those found.
const ADDED_KEY = 'cryptomator_vaults.added'

const ICON_VAULT = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 3h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-1v1h-3v-1H8v1H5v-1H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v13h16V5zm8 2.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5.5 8h1.5v7H5.5z"/></svg>'
const ICON_OPEN = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 8a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/></svg>'
const ICON_DOWNLOAD = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>'
const ICON_LOCK = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9V6zm9 14H6V10h12v10z"/></svg>'
const ICON_UPLOAD = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>'
const ICON_NEW_FOLDER = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"/></svg>'
const ICON_RENAME = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.21a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'
const ICON_MOVE = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-6 12v-3h-4v-4h4V8l5 5-5 5z"/></svg>'
const ICON_DELETE = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>'
const ICON_ADD = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2zm5 9h-2v2h-2v-2H9v-2h2V9h2v2h2v2z"/></svg>'

// ----- Vaults and their opaque names -----

/** seg -> {seg, folder, name, vault (a Vault once opened), dirs: seg -> {dirId, name}, entries: seg -> entry, nodes} */
const vaults = new Map()
let loading = null
let idleTimer = null
// What the list shows, for the empty view: {kind: 'vaults' | 'locked' | 'folder', vault},
// and for a folder of an unlocked vault where it is (dirId, path), for writing.
let shown = { kind: 'vaults' }

async function hash(text, length) {
	const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)))
	return Array.from(digest, (byte) => byte.toString(16).padStart(2, '0')).join('').slice(0, length)
}

// The list of vaults' own segment (its path is /).
const ROOT_SEGMENT = 'r000000000001'

// An ID from the segment's hash: Files needs one for a folder. Positive (its router
// takes only digits in a URL, and going back to a parent folder puts the ID there:
// a negative one sent Files to its default view), and above 2^52, far beyond any
// real file's ID, yet exact as a JavaScript number.
const ID_BASE = 2 ** 52
function fakeId(segment) {
	return ID_BASE + parseInt(segment.slice(1, 13), 16)
}

function readAdded() {
	try {
		const value = JSON.parse(window.localStorage.getItem(ADDED_KEY) || '[]')
		return Array.isArray(value) ? value.filter((item) => typeof item === 'string') : []
	} catch {
		return []
	}
}

function addVaultFolder(folder) {
	try {
		window.localStorage.setItem(ADDED_KEY, JSON.stringify([...new Set([folder, ...readAdded()])]))
	} catch {
		// Without storage the vault is simply not remembered.
	}
}

function folderName(folder) {
	return folder.split('/').filter(Boolean).pop() || t('All files')
}

async function register(folder) {
	const seg = 'v' + await hash('vault:' + folder, 12)
	if (!vaults.has(seg)) {
		vaults.set(seg, { seg, folder, name: folderName(folder), vault: null, dirs: new Map(), entries: new Map(), nodes: new Set() })
	}
	return vaults.get(seg)
}

/** The vaults found in the files and those added by hand; found once per page. */
function loadVaults() {
	if (!loading) {
		loading = (async () => {
			let found = []
			try {
				found = await findVaults()
			} catch (error) {
				showError(t('The search for vaults failed: {detail}', { detail: error.message }))
			}
			for (const folder of [...new Set([...found, ...readAdded()])]) {
				await register(folder)
			}
		})()
	}
	return loading
}

// ----- Entries for Files -----

// A vault's own entries (track: decrypted names) are removed from Files' memory on
// lock; the vault's row in the list and its top folder show only its folder's name.
function folderNode(path, name, vault, extra, track = true) {
	const segment = path.split('/').filter(Boolean).pop() || ROOT_SEGMENT
	const node = new Folder({
		id: fakeId(segment),
		source: BASE + path,
		root: ROOT,
		owner: userId(),
		displayname: name,
		permissions: Permission.READ,
		mtime: extra?.mtime,
		attributes: { cryptomatorVault: vault?.seg ?? null, ...extra?.attributes },
	})
	if (track) {
		vault?.nodes.add(node)
	}
	return node
}

function fileNode(path, entry, vault) {
	const segment = path.split('/').pop()
	const node = new File({
		id: fakeId(segment),
		source: BASE + path,
		root: ROOT,
		owner: userId(),
		displayname: entry.name,
		mime: 'application/octet-stream',
		size: entry.size ?? 0,
		mtime: entry.mtime,
		permissions: Permission.READ,
		attributes: { 'has-preview': true, previewUrl: FILE_ICON, cryptomatorVault: vault.seg, cryptomatorType: entry.type },
	})
	vault.nodes.add(node)
	return node
}

function message(error) {
	switch (error?.code) {
	case 'exists':
	case 'exists-other':
		return t('“{name}” already exists in this folder.', { name: error.message })
	case 'invalid-name':
		return t('“{name}” cannot be a name in a vault.', { name: error.message })
	case 'quota':
		return t('Your storage is full.')
	case 'read-only':
		return t('This vault cannot be written to.')
	case 'invalid-move':
		return t('A folder cannot be moved into itself or into a folder inside it.')
	case 'wrong-password':
		return t('Wrong password.')
	case 'unsupported-format':
		return t('This vault has a format the app cannot read (only vault format 8, Cryptomator 1.6 and later).')
	case 'unsupported-key':
		return t('This vault keeps its key on a Cryptomator Hub, which the app does not support.')
	case 'not-found':
		return t('There is no Cryptomator vault in this folder.')
	case 'corrupt':
		return t('The vault is damaged: {detail}', { detail: error.message })
	case 'locked':
		return t('The vault is locked.')
	default:
		return t('Something went wrong: {detail}', { detail: error?.message || String(error) })
	}
}

function goTo(path) {
	window.OCP.Files.Router.goToRoute(null, { view: VIEW_ID }, { dir: path })
}

function currentDir() {
	return window.OCP?.Files?.Router?.query?.dir || '/'
}

/** Opens and unlocks a vault with the person's password; false if they gave up. */
async function unlock(vault) {
	if (vault.vault?.unlocked) {
		return true
	}
	try {
		vault.vault = vault.vault || await Vault.open(davStorage(vault.folder))
	} catch (error) {
		showError(message(error))
		return false
	}
	const ok = await askPassword(vault.name, async (password) => {
		try {
			await vault.vault.unlock(password)
		} catch (error) {
			throw new Error(message(error))
		}
	})
	if (ok) {
		startIdleTimer()
	}
	return ok
}

async function rootContents() {
	shown = { kind: 'vaults' }
	const root = folderNode('/', t('Vaults'), null)
	const contents = [...vaults.values()]
		.sort((a, b) => a.name.localeCompare(b.name))
		.map((vault) => folderNode('/' + vault.seg, vault.name, vault, { attributes: { cryptomatorVaultRoot: true, cryptomatorFolder: vault.folder } }, false))
	return { folder: root, contents }
}

// Web Crypto exists only on HTTPS (and localhost).
const SECURE = window.isSecureContext && Boolean(window.crypto?.subtle)

async function getContents(path) {
	guardActions()
	if (!SECURE) {
		shown = { kind: 'insecure' }
		return { folder: new Folder({ id: ID_BASE + 1, source: BASE + '/', root: ROOT, owner: userId(), permissions: Permission.READ }), contents: [] }
	}
	await loadVaults()
	const parts = path.split('/').filter(Boolean)
	if (parts.length === 0) {
		return rootContents()
	}
	const vault = vaults.get(parts[0])
	if (!vault) {
		// A vault no longer found (moved, removed): back to the list.
		goTo('/')
		return rootContents()
	}
	if (!vault.vault?.unlocked && !(await unlock(vault))) {
		shown = { kind: 'locked', vault }
		return { folder: folderNode(path, vault.name, vault, { attributes: { cryptomatorVaultRoot: parts.length === 1 } }, false), contents: [] }
	}
	let dirId = ''
	let name = vault.name
	if (parts.length > 1) {
		const dir = vault.dirs.get(parts[parts.length - 1])
		if (!dir) {
			// A folder's address from before a lock or reload: its names are gone with
			// the keys, so back to the vault's top.
			goTo('/' + vault.seg)
			return { folder: folderNode(path, vault.name, vault), contents: [] }
		}
		dirId = dir.dirId
		name = dir.name
	}
	const entries = await vault.vault.list(dirId)
	const contents = []
	for (const entry of entries) {
		if (entry.type === 'dir') {
			const seg = 'd' + await hash(vault.seg + ':dir:' + entry.dirId, 12)
			vault.dirs.set(seg, { dirId: entry.dirId, name: entry.name })
			contents.push(folderNode(path + '/' + seg, entry.name, vault, { mtime: entry.mtime }))
		} else {
			const seg = 'f' + await hash(vault.seg + ':file:' + entry.path, 12)
			vault.entries.set(seg, entry)
			contents.push(fileNode(path + '/' + seg, entry, vault))
		}
	}
	shown = { kind: 'folder', vault, dirId, path }
	return { folder: folderNode(path, name, vault, undefined, parts.length > 1), contents }
}

function emptyView(div) {
	div.replaceChildren()
	div.classList.add('cryptomator-empty')
	if (shown.kind === 'insecure') {
		div.append(notice(t('Vaults can only be opened over HTTPS: the browser provides its encryption only there.'), 'error'))
	} else if (shown.kind === 'locked') {
		const vault = shown.vault
		div.append(
			el('h2', {}, t('{vault} is locked', { vault: vault.name })),
			notice(t('Its files are decrypted in this browser tab once you enter its password.')),
			el('button', {
				type: 'button',
				class: 'primary',
				onclick: async () => {
					if (await unlock(vault)) {
						refresh(vault.name)
					}
				},
			}, t('Unlock')),
		)
	} else if (shown.kind === 'folder') {
		div.append(el('h2', {}, t('This folder is empty.')))
	} else {
		div.append(
			el('h2', {}, t('No vaults found')),
			notice(t('Vaults in your files appear here. Open a vault\'s folder to add one.')),
			el('button', { type: 'button', class: 'primary', onclick: pickVault }, t('Open a vault folder …')),
		)
	}
}

/** Makes Files fetch the current folder again: it listens for its folder's update (by ID). */
function refresh(name) {
	emit('files:node:updated', folderNode(currentDir(), name, null))
}

// ----- Locking -----

function lock(vault) {
	if (!vault.vault?.unlocked) {
		return
	}
	// The keys stay while a change is made: nothing is left half-done.
	if (busy && shown.vault === vault) {
		showInfo(t('The vault locks when the change being made has finished.'))
		const wait = setInterval(() => {
			if (!busy) {
				clearInterval(wait)
				lock(vault)
			}
		}, 500)
		return
	}
	vault.vault.lock()
	// The names go from Files' memory with the keys.
	for (const node of vault.nodes) {
		emit('files:node:deleted', node)
	}
	vault.nodes.clear()
	vault.dirs.clear()
	vault.entries.clear()
	revokeAll()
	if (currentDir().startsWith('/' + vault.seg)) {
		goTo('/')
	}
	if (![...vaults.values()].some((other) => other.vault?.unlocked)) {
		clearTimeout(idleTimer)
		idleTimer = null
	}
}

function lockAll(reason) {
	let locked = false
	for (const vault of vaults.values()) {
		if (vault.vault?.unlocked) {
			lock(vault)
			locked = true
		}
	}
	if (locked && reason) {
		showInfo(reason)
	}
}

function startIdleTimer() {
	clearTimeout(idleTimer)
	idleTimer = setTimeout(() => lockAll(t('Locked after {minutes} minutes without use.', { minutes: AUTO_LOCK_MINUTES })),
		AUTO_LOCK_MINUTES * 60 * 1000)
}

function onActivity() {
	if (idleTimer !== null) {
		startIdleTimer()
	}
}

// ----- Choosing a vault -----

async function openVaultFolder(folder) {
	try {
		await Vault.open(davStorage(folder))
	} catch (error) {
		showError(message(error))
		return
	}
	addVaultFolder(folder)
	await loadVaults()
	const vault = await register(folder)
	goTo('/' + vault.seg)
}

async function pickVault() {
	let picked
	try {
		const { getFilePickerBuilder } = await dialogs()
		picked = await getFilePickerBuilder(t('Choose a vault'))
			.setMultiSelect(false)
			.allowDirectories(true)
			// A vault is a folder; its vault.cryptomator chooses it too.
			.setFilter((node) => node.type === FileType.Folder || node.basename === 'vault.cryptomator')
			.addButton({ label: t('Open vault'), variant: 'primary', callback: () => {} })
			.build()
			.pick()
	} catch {
		return
	}
	const path = '/' + String(picked).replace(/^\/+|\/+$/g, '')
	await openVaultFolder(path.endsWith('/vault.cryptomator') ? path.slice(0, -'/vault.cryptomator'.length) || '/' : path)
}

// ----- Actions -----

function inVaults(view) {
	return view?.id === VIEW_ID
}
const OWN_ACTIONS = new Set(['cryptomator-vaults-open', 'cryptomator-vaults-download', 'cryptomator-vaults-lock', 'cryptomator-vaults-open-vault',
	'cryptomator-vaults-rename', 'cryptomator-vaults-move', 'cryptomator-vaults-delete'])
const guarded = new WeakSet()
let guardedCount = 0

/**
 * Switches every other file action off in the view and for the vault's entries
 * anywhere: its own check stays as it is elsewhere. Changed in place, as Files keeps the actions it read. Run at the
 * start, for every folder and from this integration's own check (which Files
 * asks for every entry), so that an app registering later is caught too.
 */
function guardActions() {
	const actions = getFileActions()
	if (actions.length === guardedCount) {
		return
	}
	guardedCount = actions.length
	for (const action of actions) {
		if (OWN_ACTIONS.has(action.id) || guarded.has(action)) {
			continue
		}
		const original = action.enabled
		try {
			Object.defineProperty(action, 'enabled', {
				configurable: true,
				enumerable: true,
				writable: true,
				value: (context) => !inVaults(context?.view) && !(context?.nodes ?? []).some((node) => node?.root === ROOT)
					&& (original ? original.call(action, context) : true),
			})
			guarded.add(action)
		} catch {
			// A frozen action stays as it is; tests/e2e/check.mjs lists what is offered.
		}
	}
}

function entryOf(node) {
	const vault = vaults.get(node.attributes?.cryptomatorVault)
	const entry = vault?.entries.get(node.basename)
	return { vault, entry }
}

registerFileAction({
	id: 'cryptomator-vaults-open',
	displayName: ({ nodes }) => (nodes[0]?.type === FileType.Folder ? t('Open') : t('View')),
	iconSvgInline: () => ICON_OPEN,
	enabled: ({ nodes, view }) => {
		guardActions()
		return inVaults(view) && nodes.length === 1
	},
	async exec({ nodes }) {
		const node = nodes[0]
		if (node.type === FileType.Folder) {
			goTo(node.path)
			return null
		}
		const { vault, entry } = entryOf(node)
		if (!vault?.vault?.unlocked || !entry) {
			showError(t('The vault is locked.'))
			return null
		}
		if (entry.type === 'link') {
			showInfo(t('A link to {target}', { target: entry.target }))
		} else if (entry.type === 'broken') {
			showError(t('This entry cannot be read: {detail}', { detail: entry.error }))
		} else {
			await showFile(entry.name, entry.size, (onProgress, onDownload) => vault.vault.readFile(entry, onProgress, onDownload), message)
		}
		return null
	},
	default: DefaultType.DEFAULT,
	order: -1000,
})

async function downloadNode(node) {
	const { vault, entry } = entryOf(node)
	if (!vault?.vault?.unlocked || !entry) {
		showError(t('The vault is locked.'))
		return null
	}
	try {
		download(entry.name, await vault.vault.readFile(entry))
	} catch (error) {
		showError(message(error))
	}
	return null
}

registerFileAction({
	id: 'cryptomator-vaults-download',
	displayName: () => t('Download'),
	iconSvgInline: () => ICON_DOWNLOAD,
	enabled: ({ nodes, view }) => inVaults(view) && nodes.length > 0
		&& nodes.every((node) => node.type === FileType.File && node.attributes?.cryptomatorType === 'file'),
	exec: ({ nodes }) => downloadNode(nodes[0]),
	async execBatch({ nodes }) {
		const results = []
		for (const node of nodes) {
			results.push(await downloadNode(node))
		}
		return results
	},
	order: -900,
})

registerFileAction({
	id: 'cryptomator-vaults-lock',
	displayName: () => t('Lock'),
	iconSvgInline: () => ICON_LOCK,
	enabled: ({ nodes, view }) => inVaults(view) && nodes.length === 1 && nodes[0].attributes?.cryptomatorVaultRoot === true
		&& vaults.get(nodes[0].attributes.cryptomatorVault)?.vault?.unlocked === true,
	async exec({ nodes }) {
		lock(vaults.get(nodes[0].attributes.cryptomatorVault))
		return null
	},
	order: -800,
})

// In the person's own files: a vault's folder, or its vault.cryptomator, opens it here.
registerFileAction({
	id: 'cryptomator-vaults-open-vault',
	displayName: () => t('Open vault'),
	iconSvgInline: () => ICON_VAULT,
	enabled: ({ nodes, view }) => view?.id === 'files' && nodes.length === 1 && nodes[0].root?.startsWith('/files/')
		&& (nodes[0].basename === 'vault.cryptomator'
			|| (nodes[0].type === FileType.Folder && [...vaults.values()].some((vault) => vault.folder === nodes[0].path))),
	async exec({ nodes }) {
		const node = nodes[0]
		await openVaultFolder(node.type === FileType.Folder ? node.path : node.dirname)
		return null
	},
	order: 50,
})

// ----- Recognising a vault's folder in the person's files -----

// Folders seen to hold a vault.cryptomator (also those the search does not reach,
// such as shares).
const seenVaults = new Set()
let banner = null

function isVaultFolder(path) {
	return seenVaults.has(path) || [...vaults.values()].some((vault) => vault.folder === path)
}

function updateBanner(folder) {
	if (!banner) {
		return
	}
	banner.folder = folder
	const path = folder?.path
	if (!path || !isVaultFolder(path)) {
		banner.el.replaceChildren()
		return
	}
	banner.el.replaceChildren(el('div', { class: 'cryptomator-banner', role: 'note' }, [
		el('span', { class: 'cryptomator-banner__icon', 'aria-hidden': 'true' }),
		el('span', { class: 'cryptomator-banner__text' },
			t('This folder is a Cryptomator vault: its files are encrypted. Open it to see them, decrypted in this browser.')),
		el('button', { type: 'button', class: 'primary', onclick: () => openVaultFolder(path) }, t('Open vault')),
	]))
	banner.el.querySelector('.cryptomator-banner__icon').innerHTML = ICON_VAULT
}

registerFileListHeader({
	id: 'cryptomator-vaults-banner',
	order: 5,
	enabled: (folder, view) => SECURE && view?.id === 'files',
	render(container, folder) {
		banner = { el: container, folder }
		updateBanner(folder)
	},
	updated(folder) {
		updateBanner(folder)
	},
})

subscribe('files:list:updated', ({ view, folder, contents }) => {
	if (view?.id !== 'files' || !folder?.path) {
		return
	}
	if ((contents || []).some((node) => node.type === FileType.File && node.basename === 'vault.cryptomator')) {
		seenVaults.add(folder.path)
	}
	updateBanner(folder)
})

// ----- Writing: uploads and new folders -----

/** Where new entries go: the folder of an unlocked vault the list shows, or null. */
function writableHere() {
	const here = shown.kind === 'folder' ? shown : null
	return here?.vault?.vault?.unlocked && currentDir() === here.path ? here : null
}

// One change to a vault at a time (an upload, a rename, …); the keys stay meanwhile.
let busy = false

/**
 * Encrypts and writes files into the folder the list shows, one after the other:
 * each is checked before and after it is stored (Vault.writeFile). A taken name
 * is replaced only when the person says so.
 */
async function uploadFiles(files) {
	const here = writableHere()
	if (!here || files.length === 0) {
		return
	}
	if (busy) {
		showError(t('Another change to the vault is still running.'))
		return
	}
	const large = files.filter((file) => file.size > LARGE_FILE)
	if (large.length > 0 && !window.confirm(t('{count} of the files are larger than {size}. Your browser holds each twice while encrypting. Continue?', { count: large.length, size: humanSize(LARGE_FILE) }))) {
		return
	}
	busy = true
	const { vault } = here.vault
	const dialog = showUploads(t('Uploading to {vault}', { vault: here.vault.name }))
	let decision = null
	let written = 0
	const failed = []
	try {
		for (const [index, file] of files.entries()) {
			const line = dialog.file(file.name)
			if (dialog.stopped) {
				line.done(t('Not uploaded'))
				continue
			}
			let replace = decision === 'replace-all'
			const write = async () => {
				const data = new Uint8Array(await file.arrayBuffer())
				const labels = { encrypt: t('Encrypting'), upload: t('Uploading'), verify: t('Checking') }
				const share = { encrypt: [0, 0.2], upload: [0.2, 0.6], verify: [0.8, 0.2] }
				await vault.writeFile(here.dirId, file.name, data, {
					replace,
					onProgress: (phase, done, total) => {
						const [start, width] = share[phase]
						line.phase(labels[phase], start + width * (total ? done / total : 1))
					},
				})
			}
			try {
				try {
					await write()
				} catch (error) {
					if (error?.code !== 'exists' || decision === 'skip-all') {
						throw error
					}
					const answer = decision === 'replace-all' ? 'replace' : await dialog.ask(file.name, files.length)
					if (answer === 'cancel') {
						line.done(t('Not uploaded'))
						break
					}
					if (answer.endsWith('-all')) {
						decision = answer
					}
					if (answer.startsWith('skip')) {
						line.done(t('Skipped'))
						continue
					}
					replace = true
					await write()
				}
				written++
				line.done(t('Uploaded and checked'))
			} catch (error) {
				if (error?.code === 'exists' && decision === 'skip-all') {
					line.done(t('Skipped'))
				} else {
					failed.push(file.name)
					line.done(message(error), true)
				}
			}
			dialog.progress((index + 1) / files.length)
		}
	} finally {
		busy = false
		dialog.finish(failed.length
			? t('{written} uploaded, {failed} failed. The vault is unchanged where an upload failed.', { written, failed: failed.length })
			: t('{written} uploaded and checked.', { written }), failed.length > 0)
		refresh(here.vault.name)
	}
}

function chooseFiles() {
	const input = el('input', { type: 'file', multiple: true, hidden: true })
	input.addEventListener('change', () => {
		const files = [...input.files]
		input.remove()
		uploadFiles(files)
	})
	document.body.append(input)
	input.click()
}

async function newFolder() {
	const here = writableHere()
	if (!here) {
		return
	}
	const name = await askName(t('New folder'), t('Folder name'), (value) => {
		try {
			checkName(value)
			return null
		} catch (error) {
			return message(error)
		}
	})
	if (name === null) {
		return
	}
	try {
		await here.vault.vault.createDirectory(here.dirId, name)
		refresh(here.vault.name)
	} catch (error) {
		showError(message(error))
	}
}

/** Runs a change to the vault the list shows, one at a time; the list is fetched again after. */
async function change(here, task) {
	if (busy) {
		showError(t('Another change to the vault is still running.'))
		return
	}
	busy = true
	try {
		await task()
	} finally {
		busy = false
		refresh(here.vault.name)
	}
}

function entryMessage(error, name) {
	return error?.code === 'not-found' ? t('“{name}” is no longer there.', { name }) : message(error)
}

// The vault's own entries in the folder the list shows (not the vaults' list).
function editable(nodes, view) {
	const here = inVaults(view) ? writableHere() : null
	return here !== null && nodes.length > 0 && nodes.every((node) => node.attributes?.cryptomatorVault === here.vault.seg)
}

async function renameNode(node) {
	const here = writableHere()
	const name = node.displayname
	const newName = await askName(t('Rename'), t('New name'), (value) => {
		try {
			checkName(value)
			return null
		} catch (error) {
			return message(error)
		}
	}, { initial: name, action: t('Rename') })
	if (newName === null || newName.normalize('NFC') === name) {
		return
	}
	await change(here, async () => {
		try {
			await here.vault.vault.moveEntry(here.dirId, name, here.dirId, newName)
		} catch (error) {
			showError(entryMessage(error, name))
		}
	})
}

async function moveNodes(nodes) {
	const here = writableHere()
	const { vault } = here.vault
	// Folders being moved cannot be the target, nor anything inside them.
	const excluded = new Set(nodes.filter((node) => node.type === FileType.Folder)
		.map((node) => here.vault.dirs.get(node.basename)?.dirId).filter(Boolean))
	const target = await chooseFolder(nodes.length === 1 ? t('Move “{name}” to …', { name: nodes[0].displayname }) : t('Move {count} items to …', { count: nodes.length }),
		here.vault.name,
		async (dirId) => (await vault.list(dirId)).filter((entry) => entry.type === 'dir').map((entry) => ({ name: entry.name, dirId: entry.dirId })),
		excluded, t('Move here'))
	if (target === null || target.dirId === here.dirId) {
		return
	}
	await change(here, async () => {
		const failed = []
		for (const node of nodes) {
			try {
				await vault.moveEntry(here.dirId, node.displayname, target.dirId, undefined, { ancestors: target.ancestors })
			} catch (error) {
				failed.push(node.displayname + ': ' + entryMessage(error, node.displayname))
			}
		}
		if (failed.length) {
			showError(failed.join('\n'))
		}
	})
}

async function deleteNodes(nodes) {
	const here = writableHere()
	const folders = nodes.filter((node) => node.type === FileType.Folder).length
	const title = nodes.length === 1 ? t('Delete “{name}”?', { name: nodes[0].displayname }) : t('Delete {count} items?', { count: nodes.length })
	const text = (folders ? t('Folders are deleted with everything in them.') + ' ' : '')
		+ t('The encrypted files go to Nextcloud\'s deleted files.')
	if (!await confirmAction(title, text, t('Delete'))) {
		return
	}
	await change(here, async () => {
		const failed = []
		for (const node of nodes) {
			try {
				await here.vault.vault.removeEntry(here.dirId, node.displayname)
			} catch (error) {
				failed.push(node.displayname + ': ' + entryMessage(error, node.displayname))
			}
		}
		if (failed.length) {
			showError(failed.join('\n'))
		}
	})
}

registerFileAction({
	id: 'cryptomator-vaults-rename',
	displayName: () => t('Rename'),
	iconSvgInline: () => ICON_RENAME,
	enabled: ({ nodes, view }) => editable(nodes, view) && nodes.length === 1,
	async exec({ nodes }) {
		await renameNode(nodes[0])
		return null
	},
	order: -700,
})

registerFileAction({
	id: 'cryptomator-vaults-move',
	displayName: () => t('Move …'),
	iconSvgInline: () => ICON_MOVE,
	enabled: ({ nodes, view }) => editable(nodes, view),
	async exec({ nodes }) {
		await moveNodes(nodes)
		return null
	},
	async execBatch({ nodes }) {
		await moveNodes(nodes)
		return nodes.map(() => null)
	},
	order: -690,
})

registerFileAction({
	id: 'cryptomator-vaults-delete',
	displayName: () => t('Delete'),
	iconSvgInline: () => ICON_DELETE,
	enabled: ({ nodes, view }) => editable(nodes, view),
	async exec({ nodes }) {
		await deleteNodes(nodes)
		return null
	},
	async execBatch({ nodes }) {
		await deleteNodes(nodes)
		return nodes.map(() => null)
	},
	destructive: true,
	order: 100,
})

registerFileListAction({
	id: 'cryptomator-vaults-upload',
	displayName: () => t('Upload files …'),
	iconSvgInline: () => ICON_UPLOAD,
	order: -2,
	enabled: ({ view }) => inVaults(view) && writableHere() !== null,
	exec: async () => {
		chooseFiles()
		return null
	},
})

registerFileListAction({
	id: 'cryptomator-vaults-new-folder',
	displayName: () => t('New folder …'),
	iconSvgInline: () => ICON_NEW_FOLDER,
	order: -1,
	enabled: ({ view }) => inVaults(view) && writableHere() !== null,
	exec: async () => {
		await newFolder()
		return null
	},
})

// Files dropped on the list of an unlocked vault: taken before Files sees them
// (it would refuse them anyway: the entries give it no permission to create).
function onDragOver(event) {
	if (writableHere() && event.dataTransfer?.types?.includes('Files')) {
		event.preventDefault()
		event.stopPropagation()
		event.dataTransfer.dropEffect = 'copy'
	}
}

function onDrop(event) {
	if (!writableHere() || !event.dataTransfer?.files?.length) {
		return
	}
	event.preventDefault()
	event.stopPropagation()
	// Files only: a dropped folder would need its tree walked, not supported yet.
	const items = [...(event.dataTransfer.items || [])].map((item) => ({ entry: item.webkitGetAsEntry?.(), file: item.getAsFile() }))
	const files = items.length > 0
		? items.filter(({ entry, file }) => file && !entry?.isDirectory).map(({ file }) => file)
		: [...event.dataTransfer.files]
	if (items.some(({ entry }) => entry?.isDirectory)) {
		showError(t('Folders cannot be dropped into a vault yet: drop the files, or create the folder first.'))
	}
	uploadFiles(files)
}

window.addEventListener('dragover', onDragOver, true)
window.addEventListener('drop', onDrop, true)

registerFileListAction({
	id: 'cryptomator-vaults-add',
	displayName: () => t('Open a vault folder …'),
	iconSvgInline: () => ICON_ADD,
	order: 0,
	enabled: ({ view }) => inVaults(view),
	exec: async () => {
		await pickVault()
		return null
	},
})

registerFileListAction({
	id: 'cryptomator-vaults-lock-all',
	displayName: () => t('Lock all vaults'),
	iconSvgInline: () => ICON_LOCK,
	order: 1,
	enabled: ({ view }) => inVaults(view) && [...vaults.values()].some((vault) => vault.vault?.unlocked),
	exec: async () => {
		lockAll()
		return null
	},
})

getNavigation().register(new View({
	id: VIEW_ID,
	name: t('Vaults'),
	caption: t('Cryptomator vaults, unlocked in this browser'),
	emptyTitle: t('No vaults found'),
	emptyCaption: t('Vaults in your files appear here. Open a vault\'s folder to add one.'),
	emptyView,
	icon: ICON_VAULT,
	order: 90,
	getContents,
}))

guardActions()

for (const type of ['pointerdown', 'keydown', 'wheel', 'touchstart']) {
	document.addEventListener(type, onActivity, { passive: true })
}
// Leaving the page locks: nothing stays in a cached page.
window.addEventListener('pagehide', () => {
	closeDialog()
	lockAll()
})
// The folders known to hold a vault, for "Open vault" and the notice in the
// person's files.
if (SECURE) {
	loadVaults().then(() => updateBanner(banner?.folder))
}
