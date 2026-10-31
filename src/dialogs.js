/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * The two dialogs of the Files integration: the password of a vault, and a
 * decrypted file's preview. Plain DOM over Nextcloud's own styles.
 *
 * Decrypted files are shown from blob: URLs, which carry Nextcloud's origin:
 * HTML is therefore only ever shown as text (a script in it would act as the
 * person in Nextcloud), SVG only as an image (where it runs no scripts), and
 * downloads are typed application/octet-stream, which no browser renders.
 */
import { t } from './l10n.js'

// Above this size a file is only offered for download: the browser holds it
// encrypted and decrypted at once.
const PREVIEW_LIMIT = 100 * 1024 * 1024
const TEXT_LIMIT = 5 * 1024 * 1024
export const LARGE_FILE = 1024 * 1024 * 1024

/** Every decrypted file the dialogs made into a URL, revoked on lock. */
const urls = new Set()

export function el(tag, attributes, children) {
	const node = document.createElement(tag)
	for (const [key, value] of Object.entries(attributes || {})) {
		if (value === undefined || value === null || value === false) {
			continue
		}
		if (key === 'class') {
			node.className = value
		} else if (key.startsWith('on')) {
			node.addEventListener(key.slice(2), value)
		} else {
			node.setAttribute(key, value === true ? '' : value)
		}
	}
	for (const child of [].concat(children ?? [])) {
		if (child !== null && child !== undefined && child !== false) {
			node.append(child instanceof Node ? child : document.createTextNode(String(child)))
		}
	}
	return node
}

export function humanSize(bytes) {
	if (window.OC?.Util?.humanFileSize) {
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

function objectUrl(data, type) {
	const url = URL.createObjectURL(new Blob([data], { type }))
	urls.add(url)
	return url
}

/** Drops every decrypted file the page still holds as a URL. */
export function revokeAll() {
	for (const url of urls) {
		URL.revokeObjectURL(url)
	}
	urls.clear()
	closeDialog()
}

export function download(name, data) {
	const link = el('a', { href: objectUrl(data, 'application/octet-stream'), download: name })
	document.body.append(link)
	link.click()
	link.remove()
}

let current = null

export function closeDialog() {
	if (current) {
		const { dialog, onClose } = current
		current = null
		dialog.remove()
		onClose?.()
	}
}

function openDialog(label, children, onClose) {
	closeDialog()
	const dialog = el('div', {
		class: 'cryptomator-dialog',
		role: 'dialog',
		'aria-modal': 'true',
		'aria-label': label,
		onkeydown: (event) => {
			if (event.key === 'Escape') {
				closeDialog()
			}
		},
		onclick: (event) => {
			if (event.target === dialog) {
				closeDialog()
			}
		},
	}, el('div', { class: 'cryptomator-dialog__panel' }, children))
	current = { dialog, onClose }
	document.body.append(dialog)
	return dialog
}

export function notice(text, type) {
	return el('p', { class: 'cryptomator-notice' + (type ? ' cryptomator-notice--' + type : ''), role: type === 'error' ? 'alert' : null }, text)
}

/**
 * Asks for a vault's password until unlock(password) succeeds (true) or the
 * dialog is closed (false). unlock throws to refuse, with a message for the person.
 */
export function askPassword(vaultName, unlock) {
	return new Promise((resolve) => {
		let done = false
		const password = el('input', { type: 'password', name: 'password', autocomplete: 'current-password', required: true, 'aria-label': t('Password') })
		const status = el('div', { 'aria-live': 'polite' })
		const submit = el('button', { type: 'submit', class: 'primary' }, t('Unlock'))
		openDialog(vaultName, [
			el('h2', {}, t('Unlock {vault}', { vault: vaultName })),
			notice(t('The password and the vault\'s keys stay in this browser tab: the server only sends the encrypted files.')),
			el('form', {
				class: 'cryptomator-unlock',
				onsubmit: async (event) => {
					event.preventDefault()
					submit.disabled = true
					status.replaceChildren(notice(t('Unlocking …')))
					// Let the page paint before scrypt takes the thread for a moment.
					await new Promise((wait) => setTimeout(wait, 30))
					try {
						await unlock(password.value)
						password.value = ''
						done = true
						closeDialog()
						resolve(true)
					} catch (error) {
						submit.disabled = false
						status.replaceChildren(notice(error.message, 'error'))
						password.select()
					}
				},
			}, [el('label', {}, [t('Password'), password]), submit,
				el('button', { type: 'button', onclick: closeDialog }, t('Cancel'))]),
			status,
		], () => {
			password.value = ''
			if (!done) {
				resolve(false)
			}
		})
		password.focus()
	})
}

// ----- Previews -----

const IMAGE = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'bmp', 'svg']
const VIDEO = { mp4: 'video/mp4', m4v: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime', ogv: 'video/ogg' }
const AUDIO = { mp3: 'audio/mpeg', m4a: 'audio/mp4', ogg: 'audio/ogg', oga: 'audio/ogg', opus: 'audio/ogg', wav: 'audio/wav', flac: 'audio/flac' }
const TEXT = ['txt', 'md', 'csv', 'tsv', 'json', 'log', 'xml', 'yml', 'yaml', 'ini', 'conf', 'cfg', 'toml',
	'js', 'ts', 'py', 'sh', 'php', 'java', 'go', 'rs', 'c', 'h', 'css', 'html', 'htm', 'vcf', 'ics', 'tex']

function previewKind(name) {
	const ext = (/\.([^.]+)$/.exec(name)?.[1] ?? '').toLowerCase()
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
	return { kind: 'none' }
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

/**
 * A file's preview: read(onProgress, onDownload) decrypts it; previewed where it
 * is safe and small enough, always offered for download.
 */
export async function showFile(name, size, read, message) {
	const preview = previewKind(name)
	const previewable = preview.kind !== 'none' && size <= (preview.kind === 'text' ? TEXT_LIMIT : PREVIEW_LIMIT)
	if (!previewable && size > LARGE_FILE
		&& !window.confirm(t('This file is {size}. Your browser holds it twice while decrypting. Continue?', { size: humanSize(size) }))) {
		return
	}
	const progress = el('progress', { max: 1, value: 0 })
	const body = el('div', { class: 'cryptomator-dialog__body' }, [notice(t('Decrypting …')), progress])
	const downloadButton = el('button', { type: 'button', disabled: true }, t('Download'))
	const dialog = openDialog(name, [
		el('div', { class: 'cryptomator-dialog__head' }, [
			el('h2', {}, name),
			el('span', { class: 'cryptomator-dialog__meta' }, humanSize(size)),
			downloadButton,
			el('button', { type: 'button', class: 'cryptomator-dialog__close', onclick: closeDialog }, t('Close')),
		]),
		body,
	])
	dialog.querySelector('.cryptomator-dialog__close').focus()
	try {
		// Half the bar for the download, half for the decryption.
		const data = await read((done, total) => { progress.value = 0.5 + done / total / 2 }, (done, total) => { progress.value = done / total / 2 })
		if (current?.dialog !== dialog) {
			return
		}
		downloadButton.disabled = false
		downloadButton.addEventListener('click', () => download(name, data))
		body.replaceChildren(previewable ? render(preview, data, name) : notice(t('No preview for this file. Download it to open it.')))
	} catch (error) {
		if (current?.dialog === dialog) {
			body.replaceChildren(notice(message(error), 'error'))
		}
	}
}
