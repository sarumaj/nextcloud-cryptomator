/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * The vaults' page: finds the vaults in the person's files, unlocks one with
 * its password and shows its folders, with previews and downloads. Everything
 * happens here, in the browser: the encrypted files come over WebDAV, as the
 * Files app reads them, and js/vault.js decrypts them. The password and the keys
 * stay in this tab and are dropped on Lock, after AUTO_LOCK_MINUTES without use
 * and when the page closes.
 *
 * Decrypted files are shown from blob: URLs, which carry this page's origin:
 * HTML is therefore only ever shown as text (a script in it would act as the
 * person in Nextcloud), SVG only as an image (where it runs no scripts), and
 * downloads are typed application/octet-stream, which no browser renders.
 *
 * Plain DOM, no build step, like the project's other apps.
 */
(function () {
	'use strict'

	const APP = 'cryptomator_vaults'
	const AUTO_LOCK_MINUTES = 15
	const RECENT_KEY = 'cryptomator_vaults.recent'
	const RECENT_MAX = 8
	// Above this size a file is only offered for download: the browser holds it
	// encrypted and decrypted at once.
	const PREVIEW_LIMIT = 100 * 1024 * 1024
	const TEXT_LIMIT = 5 * 1024 * 1024
	const LARGE_FILE = 1024 * 1024 * 1024

	// Unescaped: the page only ever sets text, never HTML.
	const t = (text, vars) => (typeof window.t === 'function' ? window.t(APP, text, vars, undefined, { escape: false }) : text)

	// ----- Small DOM helpers -----

	function el(tag, attributes, children) {
		const node = document.createElement(tag)
		for (const [key, value] of Object.entries(attributes || {})) {
			if (value === undefined || value === null || value === false) {
				continue
			}
			if (key === 'class') {
				node.className = value
			} else if (key.startsWith('on')) {
				node.addEventListener(key.slice(2), value)
			} else if (value === true) {
				node.setAttribute(key, '')
			} else {
				node.setAttribute(key, value)
			}
		}
		for (const child of [].concat(children || [])) {
			if (child !== null && child !== undefined && child !== false) {
				node.append(child instanceof Node ? child : document.createTextNode(String(child)))
			}
		}
		return node
	}

	function humanSize(bytes) {
		if (window.OC && window.OC.Util && typeof window.OC.Util.humanFileSize === 'function') {
			return window.OC.Util.humanFileSize(bytes)
		}
		const units = ['B', 'KB', 'MB', 'GB', 'TB']
		let value = bytes
		let unit = 0
		while (value >= 1024 && unit < units.length - 1) {
			value /= 1024
			unit++
		}
		return (unit === 0 ? value : value.toFixed(1)) + ' ' + units[unit]
	}

	// ----- WebDAV -----

	function requestToken() {
		return (window.OC && window.OC.requestToken) || document.head.dataset.requesttoken || ''
	}

	function currentUser() {
		return window.OC && typeof window.OC.getCurrentUser === 'function' ? window.OC.getCurrentUser().uid : ''
	}

	function davRoot() {
		if (window.OC && typeof window.OC.linkToRemote === 'function') {
			return window.OC.linkToRemote('dav')
		}
		return (window.OC && window.OC.webroot ? window.OC.webroot : '') + '/remote.php/dav'
	}

	function encodePath(path) {
		return path.split('/').filter((part) => part !== '').map(encodeURIComponent).join('/')
	}

	/** A folder of the person's files, as a WebDAV URL ending in /. */
	function filesUrl(folder) {
		const inner = encodePath(folder)
		return davRoot() + '/files/' + encodeURIComponent(currentUser()) + '/' + (inner ? inner + '/' : '')
	}

	function davHeaders(extra) {
		return Object.assign({ requesttoken: requestToken(), 'X-Requested-With': 'XMLHttpRequest' }, extra || {})
	}

	const DAV = 'DAV:'

	function parseMultistatus(text) {
		const xml = new DOMParser().parseFromString(text, 'application/xml')
		return Array.from(xml.getElementsByTagNameNS(DAV, 'response')).map((response) => {
			const href = response.getElementsByTagNameNS(DAV, 'href')[0].textContent
			const isDir = response.getElementsByTagNameNS(DAV, 'collection').length > 0
			const length = response.getElementsByTagNameNS(DAV, 'getcontentlength')[0]
			return { href, isDir, size: length ? Number(length.textContent) : 0 }
		})
	}

	function lastSegment(href) {
		const parts = href.replace(/\/+$/, '').split('/')
		return decodeURIComponent(parts[parts.length - 1])
	}

	/** The vault's folder as the storage js/vault.js reads: paths relative to it. */
	function davStorage(folder) {
		const base = filesUrl(folder)
		const { VaultError } = window.CryptomatorVault
		return {
			async read(relative, onProgress) {
				const response = await fetch(base + encodePath(relative), { headers: davHeaders(), credentials: 'same-origin' })
				if (response.status === 404) {
					throw new VaultError('not-found', relative)
				}
				if (!response.ok) {
					throw new VaultError('network', 'HTTP ' + response.status)
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
			async list(relative) {
				const url = base + (relative ? encodePath(relative) + '/' : '')
				const response = await fetch(url, {
					method: 'PROPFIND',
					headers: davHeaders({ Depth: '1', 'Content-Type': 'application/xml; charset=utf-8' }),
					credentials: 'same-origin',
					body: '<?xml version="1.0"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/></d:prop></d:propfind>',
				})
				if (response.status === 404) {
					throw new VaultError('not-found', relative)
				}
				if (!response.ok) {
					throw new VaultError('network', 'HTTP ' + response.status)
				}
				// The first response is the folder itself.
				return parseMultistatus(await response.text()).slice(1)
					.map((entry) => ({ name: lastSegment(entry.href), isDir: entry.isDir, size: entry.size }))
			},
		}
	}

	/** The folders of the person's files that hold a vault.cryptomator. */
	async function findVaults() {
		const user = currentUser()
		const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;')
		const body = '<?xml version="1.0" encoding="UTF-8"?>'
			+ '<d:searchrequest xmlns:d="DAV:"><d:basicsearch>'
			+ '<d:select><d:prop><d:displayname/></d:prop></d:select>'
			+ '<d:from><d:scope><d:href>/files/' + escape(user) + '</d:href><d:depth>infinity</d:depth></d:scope></d:from>'
			+ '<d:where><d:like><d:prop><d:displayname/></d:prop><d:literal>vault.cryptomator</d:literal></d:like></d:where>'
			+ '</d:basicsearch></d:searchrequest>'
		const response = await fetch(davRoot() + '/', {
			method: 'SEARCH',
			headers: davHeaders({ 'Content-Type': 'text/xml; charset=utf-8' }),
			credentials: 'same-origin',
			body,
		})
		if (!response.ok) {
			throw new Error('HTTP ' + response.status)
		}
		const prefix = '/files/' + encodeURIComponent(user) + '/'
		return parseMultistatus(await response.text())
			.map((entry) => decodeURIComponent(entry.href))
			.filter((href) => href.endsWith('/vault.cryptomator'))
			.map((href) => {
				const at = href.indexOf(decodeURIComponent(prefix))
				return '/' + href.slice(at + decodeURIComponent(prefix).length, -'/vault.cryptomator'.length)
			})
			.sort((a, b) => a.localeCompare(b))
	}

	// ----- Recent vaults (their folders only) -----

	function readRecent() {
		try {
			const value = JSON.parse(window.localStorage.getItem(RECENT_KEY) || '[]')
			return Array.isArray(value) ? value.filter((item) => typeof item === 'string') : []
		} catch (e) {
			return []
		}
	}

	function rememberRecent(folder) {
		try {
			const recent = [folder].concat(readRecent().filter((item) => item !== folder)).slice(0, RECENT_MAX)
			window.localStorage.setItem(RECENT_KEY, JSON.stringify(recent))
		} catch (e) {
			// Without storage the list is simply empty next time.
		}
	}

	// ----- File types -----

	const IMAGE = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'bmp', 'svg']
	const VIDEO = { mp4: 'video/mp4', m4v: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime', ogv: 'video/ogg' }
	const AUDIO = { mp3: 'audio/mpeg', m4a: 'audio/mp4', ogg: 'audio/ogg', oga: 'audio/ogg', opus: 'audio/ogg', wav: 'audio/wav', flac: 'audio/flac' }
	const TEXT = ['txt', 'md', 'csv', 'tsv', 'json', 'log', 'xml', 'yml', 'yaml', 'ini', 'conf', 'cfg', 'toml',
		'js', 'ts', 'py', 'sh', 'php', 'java', 'go', 'rs', 'c', 'h', 'css', 'html', 'htm', 'svg', 'vcf', 'ics', 'tex']

	function extension(name) {
		const match = /\.([^.]+)$/.exec(name)
		return match ? match[1].toLowerCase() : ''
	}

	function previewKind(name) {
		const ext = extension(name)
		if (IMAGE.includes(ext)) {
			return { kind: 'image', type: ext === 'svg' ? 'image/svg+xml' : 'image/' + (ext === 'jpg' ? 'jpeg' : ext) }
		}
		if (ext === 'pdf') {
			return { kind: 'pdf', type: 'application/pdf' }
		}
		if (ext in VIDEO) {
			return { kind: 'video', type: VIDEO[ext] }
		}
		if (ext in AUDIO) {
			return { kind: 'audio', type: AUDIO[ext] }
		}
		if (TEXT.includes(ext)) {
			return { kind: 'text', type: 'text/plain' }
		}
		return { kind: 'none', type: 'application/octet-stream' }
	}

	// ----- The page -----

	const state = {
		root: null,
		folder: '',
		vault: null,
		// The folders opened, from the vault's top: {name, dirId}.
		trail: [],
		urls: [],
		idleTimer: null,
		viewer: null,
	}

	function message(error) {
		const code = error && error.code
		switch (code) {
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
			return t('Something went wrong: {detail}', { detail: (error && error.message) || String(error) })
		}
	}

	// Parts left out are null: replaceChildren() would show them as the text "null".
	function setView(...children) {
		state.root.replaceChildren(...children.filter((child) => child !== null && child !== undefined && child !== false))
	}

	function notice(text, type) {
		return el('p', { class: 'cryptomator-notice' + (type ? ' cryptomator-notice--' + type : ''), role: type === 'error' ? 'alert' : null }, text)
	}

	function folderName(folder) {
		const parts = folder.split('/').filter((part) => part !== '')
		return parts.length ? parts[parts.length - 1] : t('All files')
	}

	// The list of vaults.

	function showVaults() {
		const found = el('div', { class: 'cryptomator-list' }, notice(t('Looking for vaults …')))
		const pathInput = el('input', { type: 'text', class: 'cryptomator-path', placeholder: t('Folder, e.g. /Documents/Vault'), 'aria-label': t('Folder of a vault') })
		const recent = readRecent()
		setView(
			el('h2', {}, t('Cryptomator vaults')),
			notice(t('The password and the vault\'s keys stay in this browser tab: the server only sends the encrypted files. Read only: use Cryptomator to change a vault.')),
			found,
			recent.length ? el('h3', {}, t('Recently opened')) : null,
			recent.length ? el('ul', { class: 'cryptomator-vaults' }, recent.map(vaultItem)) : null,
			el('form', {
				class: 'cryptomator-open',
				onsubmit: (event) => {
					event.preventDefault()
					const value = pathInput.value.trim()
					if (value) {
						openVault('/' + value.replace(/^\/+|\/+$/g, ''))
					}
				},
			}, [pathInput, el('button', { type: 'submit' }, t('Open'))]),
		)
		findVaults().then((folders) => {
			found.replaceChildren(folders.length
				? el('ul', { class: 'cryptomator-vaults' }, folders.map(vaultItem))
				: notice(t('No vaults found in your files. Enter a vault\'s folder below.')))
		}).catch((error) => {
			found.replaceChildren(notice(t('The search for vaults failed: {detail}', { detail: error.message }), 'error'))
		})
	}

	function vaultItem(folder) {
		return el('li', {}, el('button', { type: 'button', class: 'cryptomator-vault', onclick: () => openVault(folder) }, [
			el('span', { class: 'cryptomator-vault__name' }, folderName(folder)),
			el('span', { class: 'cryptomator-vault__path' }, folder),
		]))
	}

	// Unlocking.

	async function openVault(folder) {
		setView(notice(t('Opening the vault …')))
		try {
			state.vault = await window.CryptomatorVault.Vault.open(davStorage(folder))
			state.folder = folder
			showUnlock()
		} catch (error) {
			setView(notice(message(error), 'error'), el('button', { type: 'button', onclick: showVaults }, t('Back')))
		}
	}

	function showUnlock(info) {
		const password = el('input', { type: 'password', name: 'password', autocomplete: 'current-password', required: true, 'aria-label': t('Password') })
		const status = el('div', { 'aria-live': 'polite' }, info ? notice(info) : null)
		const submit = el('button', { type: 'submit', class: 'primary' }, t('Unlock'))
		setView(
			el('h2', {}, folderName(state.folder)),
			el('p', { class: 'cryptomator-vault__path' }, state.folder),
			el('form', {
				class: 'cryptomator-unlock',
				onsubmit: async (event) => {
					event.preventDefault()
					submit.disabled = true
					status.replaceChildren(notice(t('Unlocking …')))
					// Let the page paint before scrypt takes the thread for a moment.
					await new Promise((resolve) => setTimeout(resolve, 30))
					try {
						await state.vault.unlock(password.value)
						password.value = ''
						rememberRecent(state.folder)
						state.trail = [{ name: folderName(state.folder), dirId: '' }]
						startIdleTimer()
						showFolder()
					} catch (error) {
						submit.disabled = false
						status.replaceChildren(notice(message(error), 'error'))
						password.select()
					}
				},
			}, [el('label', {}, [t('Password'), password]), submit]),
			status,
			el('button', { type: 'button', class: 'cryptomator-back', onclick: showVaults }, t('Other vault')),
		)
		password.focus()
	}

	// Locking: the keys go, and with them every decrypted file the page made.

	function lock(reason) {
		if (!state.vault) {
			return
		}
		state.vault.lock()
		closeViewer()
		for (const url of state.urls) {
			URL.revokeObjectURL(url)
		}
		state.urls = []
		state.trail = []
		clearTimeout(state.idleTimer)
		state.idleTimer = null
		showUnlock(reason || t('The vault is locked.'))
	}

	function startIdleTimer() {
		clearTimeout(state.idleTimer)
		state.idleTimer = setTimeout(() => lock(t('Locked after {minutes} minutes without use.', { minutes: AUTO_LOCK_MINUTES })),
			AUTO_LOCK_MINUTES * 60 * 1000)
	}

	function onActivity() {
		if (state.vault && state.vault.unlocked) {
			startIdleTimer()
		}
	}

	// Browsing.

	async function showFolder() {
		const here = state.trail[state.trail.length - 1]
		const list = el('div', { class: 'cryptomator-files' }, notice(t('Decrypting the folder …')))
		setView(toolbar(), list)
		try {
			const entries = await state.vault.list(here.dirId)
			if (state.trail[state.trail.length - 1] !== here) {
				return
			}
			list.replaceChildren(entries.length
				? el('ul', { class: 'cryptomator-entries' }, entries.map(entryItem))
				: notice(t('This folder is empty.')))
		} catch (error) {
			if (error && error.code === 'locked') {
				return
			}
			list.replaceChildren(notice(message(error), 'error'))
		}
	}

	function toolbar() {
		const crumbs = state.trail.map((item, index) => {
			const last = index === state.trail.length - 1
			return el('li', {}, last
				? el('span', { 'aria-current': 'page' }, item.name)
				: el('button', {
					type: 'button',
					onclick: () => {
						state.trail = state.trail.slice(0, index + 1)
						showFolder()
					},
				}, item.name))
		})
		return el('div', { class: 'cryptomator-toolbar' }, [
			el('nav', { 'aria-label': t('Folders') }, el('ol', { class: 'cryptomator-crumbs' }, crumbs)),
			el('button', { type: 'button', class: 'cryptomator-lock', onclick: () => lock() }, t('Lock')),
		])
	}

	function entryItem(entry) {
		if (entry.type === 'dir') {
			return el('li', {}, el('button', {
				type: 'button',
				class: 'cryptomator-entry cryptomator-entry--dir',
				onclick: () => {
					state.trail.push({ name: entry.name, dirId: entry.dirId })
					showFolder()
				},
			}, [el('span', { class: 'cryptomator-entry__name' }, entry.name)]))
		}
		if (entry.type === 'link') {
			return el('li', { class: 'cryptomator-entry cryptomator-entry--link' }, [
				el('span', { class: 'cryptomator-entry__name' }, entry.name),
				el('span', { class: 'cryptomator-entry__meta' }, '→ ' + entry.target),
			])
		}
		if (entry.type === 'broken') {
			return el('li', { class: 'cryptomator-entry cryptomator-entry--broken', title: entry.error }, [
				el('span', { class: 'cryptomator-entry__name' }, t('Unreadable entry')),
				el('span', { class: 'cryptomator-entry__meta' }, entry.name),
			])
		}
		return el('li', {}, el('button', { type: 'button', class: 'cryptomator-entry cryptomator-entry--file', onclick: () => openFile(entry) }, [
			el('span', { class: 'cryptomator-entry__name' }, entry.name),
			el('span', { class: 'cryptomator-entry__meta' }, humanSize(entry.size)),
		]))
	}

	// A file: decrypted on demand, previewed where safe, offered for download.

	function closeViewer() {
		if (state.viewer) {
			state.viewer.remove()
			state.viewer = null
		}
	}

	function objectUrl(data, type) {
		const url = URL.createObjectURL(new Blob([data], { type }))
		state.urls.push(url)
		return url
	}

	function download(name, data) {
		const link = el('a', { href: objectUrl(data, 'application/octet-stream'), download: name })
		document.body.append(link)
		link.click()
		link.remove()
	}

	async function openFile(entry) {
		closeViewer()
		const preview = previewKind(entry.name)
		const previewable = preview.kind !== 'none' && entry.size <= (preview.kind === 'text' ? TEXT_LIMIT : PREVIEW_LIMIT)
		const progress = el('progress', { max: 1, value: 0 })
		const body = el('div', { class: 'cryptomator-viewer__body' }, [notice(t('Decrypting …')), progress])
		const downloadButton = el('button', { type: 'button', disabled: true }, t('Download'))
		const dialog = el('div', {
			class: 'cryptomator-viewer',
			role: 'dialog',
			'aria-modal': 'true',
			'aria-label': entry.name,
			onkeydown: (event) => {
				if (event.key === 'Escape') {
					closeViewer()
				}
			},
		}, el('div', { class: 'cryptomator-viewer__panel' }, [
			el('div', { class: 'cryptomator-viewer__head' }, [
				el('h3', {}, entry.name),
				el('span', { class: 'cryptomator-entry__meta' }, humanSize(entry.size)),
				downloadButton,
				el('button', { type: 'button', class: 'cryptomator-viewer__close', onclick: closeViewer }, t('Close')),
			]),
			body,
		]))
		state.viewer = dialog
		document.body.append(dialog)
		dialog.querySelector('.cryptomator-viewer__close').focus()

		if (!previewable && entry.size > LARGE_FILE
			&& !window.confirm(t('This file is {size}. Your browser holds it twice while decrypting. Continue?', { size: humanSize(entry.size) }))) {
			closeViewer()
			return
		}
		try {
			// Half the bar for the download, half for the decryption.
			const data = await state.vault.readFile(entry, (done, total) => { progress.value = 0.5 + done / total / 2 }, (done, total) => { progress.value = done / total / 2 })
			if (state.viewer !== dialog) {
				return
			}
			downloadButton.disabled = false
			downloadButton.addEventListener('click', () => download(entry.name, data))
			body.replaceChildren(previewable ? render(preview, data, entry.name) : notice(t('No preview for this file. Download it to open it.')))
		} catch (error) {
			if (state.viewer === dialog) {
				body.replaceChildren(notice(message(error), 'error'))
			}
		}
	}

	function render(preview, data, name) {
		switch (preview.kind) {
		case 'image':
			return el('img', { class: 'cryptomator-preview', src: objectUrl(data, preview.type), alt: name })
		case 'pdf':
			return el('iframe', { class: 'cryptomator-preview cryptomator-preview--frame', src: objectUrl(data, preview.type), title: name })
		case 'video':
			return el('video', { class: 'cryptomator-preview', src: objectUrl(data, preview.type), controls: true })
		case 'audio':
			return el('audio', { class: 'cryptomator-preview', src: objectUrl(data, preview.type), controls: true })
		case 'text':
			return el('pre', { class: 'cryptomator-preview cryptomator-preview--text' }, new TextDecoder('utf-8').decode(data))
		default:
			return notice(t('No preview for this file. Download it to open it.'))
		}
	}

	// ----- Start -----

	function start() {
		state.root = document.getElementById('cryptomator-page')
		if (!state.root) {
			return
		}
		for (const type of ['pointerdown', 'keydown', 'wheel', 'touchstart']) {
			document.addEventListener(type, onActivity, { passive: true })
		}
		// Closing or leaving the page locks: nothing stays in a cached page.
		window.addEventListener('pagehide', () => lock())
		// Web Crypto exists only on HTTPS (and localhost).
		if (!window.isSecureContext || !window.crypto || !window.crypto.subtle) {
			setView(el('h2', {}, t('Cryptomator vaults')), notice(t('Vaults can only be opened over HTTPS: the browser provides its encryption only there.'), 'error'))
			return
		}
		const requested = new URLSearchParams(window.location.search).get('vault')
		if (requested) {
			openVault('/' + requested.replace(/^\/+|\/+$/g, ''))
		} else {
			showVaults()
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', start)
	} else {
		start()
	}
})()
