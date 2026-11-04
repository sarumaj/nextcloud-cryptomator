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
 *
 * A sign-in form as password managers know one: the vault's folder (account) as
 * the user name beside the password, so that a manager offers, fills and saves an
 * entry per vault (its suggestions follow the page's address, not the name of the
 * Cryptomator app an entry may have been saved for).
 */
export function askPassword(vaultName, unlock, account) {
	return new Promise((resolve) => {
		let done = false
		const username = el('input', {
			type: 'text', name: 'username', autocomplete: 'username', readonly: true,
			class: 'cryptomator-unlock__account', 'aria-label': t('Vault'),
		})
		username.value = account
		const password = el('input', { type: 'password', name: 'password', autocomplete: 'current-password', required: true, 'aria-label': t('Password') })
		const status = el('div', { 'aria-live': 'polite' })
		const submit = el('button', { type: 'submit', class: 'primary' }, t('Unlock'))
		openDialog(vaultName, [
			el('h2', {}, t('Unlock {vault}', { vault: vaultName })),
			notice(t('The password and the vault\'s keys stay in this browser tab: the server only sends the encrypted files.')),
			el('form', {
				class: 'cryptomator-unlock',
				name: 'cryptomator-unlock',
				method: 'post',
				action: '#',
				autocomplete: 'on',
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
			}, [el('label', {}, [t('Vault'), username]), el('label', {}, [t('Password'), password]), submit,
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
const TEXT = ['txt', 'csv', 'tsv', 'json', 'log', 'xml', 'yml', 'yaml', 'ini', 'conf', 'cfg', 'toml',
	'js', 'ts', 'py', 'sh', 'php', 'java', 'go', 'rs', 'c', 'h', 'css', 'html', 'htm', 'vcf', 'ics', 'tex']

/** Whether the dialog previews files of this name (else it only offers them for download). */
export function hasPreview(name) {
	return previewKind(name).kind !== 'none'
}

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
	if (ext === 'docx') {
		return { kind: 'docx' }
	}
	if (['pptx', 'odp', 'odt'].includes(ext)) {
		return { kind: ext }
	}
	if (['md', 'markdown'].includes(ext)) {
		return { kind: 'markdown' }
	}
	if (ext === 'zip') {
		return { kind: 'zip' }
	}
	if (['heic', 'heif'].includes(ext)) {
		return { kind: 'heic' }
	}
	if (['xlsx', 'xls', 'ods'].includes(ext)) {
		return { kind: 'sheet' }
	}
	return { kind: 'none' }
}

// Previews whose code loads when a file of their kind is opened: those that make a
// page for the sandboxed frame (sandbox.js), and HEIC, which becomes a picture.
const PAGES = {
	docx: async (data) => (await import('./documents.js')).docxPage(data),
	sheet: async (data) => (await import('./documents.js')).sheetPage(data),
	pptx: async (data) => (await import('./office.js')).pptxPage(data),
	odp: async (data) => (await import('./office.js')).odpPage(data),
	odt: async (data) => (await import('./office.js')).odtPage(data),
	markdown: async (data) => (await import('./previews.js')).markdownPage(data),
	zip: async (data) => (await import('./previews.js')).zipPage(data),
}

export function isLazyPreview(kind) {
	return kind in PAGES || kind === 'heic'
}

/**
 * A preview made by code loaded now: a frame with neither scripts nor an origin of
 * its own, whose page loads nothing from outside; or, for HEIC, a picture.
 */
async function renderDocument(preview, data, name) {
	if (preview.kind === 'heic') {
		const png = await (await import('./previews.js')).heicToPng(data)
		return el('img', { class: 'cryptomator-preview', src: objectUrl(png, 'image/png'), alt: name })
	}
	const html = await PAGES[preview.kind](data)
	return el('iframe', { class: 'cryptomator-preview cryptomator-preview--frame cryptomator-preview--document', sandbox: '', referrerpolicy: 'no-referrer', title: name, srcdoc: html })
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
		if (!previewable) {
			body.replaceChildren(notice(t('No preview for this file. Download it to open it.')))
		} else if (isLazyPreview(preview.kind)) {
			body.replaceChildren(notice(t('Preparing the preview …')))
			try {
				const frame = await renderDocument(preview, data, name)
				if (current?.dialog === dialog) {
					body.replaceChildren(frame)
				}
			} catch (error) {
				if (current?.dialog === dialog) {
					body.replaceChildren(notice(t('This document cannot be previewed: {detail}. Download it to open it.', { detail: error.message }), 'error'))
				}
			}
		} else {
			body.replaceChildren(render(preview, data, name))
		}
	} catch (error) {
		if (current?.dialog === dialog) {
			body.replaceChildren(notice(message(error), 'error'))
		}
	}
}

// ----- Writing -----

/** Asks for a name (a new folder's, a new one for an entry); null if the dialog is closed. */
export function askName(title, label, check, { initial = '', action = t('Create') } = {}) {
	return new Promise((resolve) => {
		let done = false
		const input = el('input', { type: 'text', required: true, 'aria-label': label, autocomplete: 'off' })
		input.value = initial
		const status = el('div', { 'aria-live': 'polite' })
		openDialog(title, [
			el('h2', {}, title),
			el('form', {
				class: 'cryptomator-unlock',
				onsubmit: (event) => {
					event.preventDefault()
					const problem = check(input.value)
					if (problem) {
						status.replaceChildren(notice(problem, 'error'))
						return
					}
					done = true
					const value = input.value
					closeDialog()
					resolve(value)
				},
			}, [el('label', {}, [label, input]), el('button', { type: 'submit', class: 'primary' }, action),
				el('button', { type: 'button', onclick: closeDialog }, t('Cancel'))]),
			status,
		], () => {
			if (!done) {
				resolve(null)
			}
		})
		input.focus()
		// The name without its extension selected, as Files does.
		const dot = initial.lastIndexOf('.')
		input.setSelectionRange(0, dot > 0 ? dot : initial.length)
	})
}

/** Asks to confirm something that cannot be taken back here; resolves true or false. */
export function confirmAction(title, text, action) {
	return new Promise((resolve) => {
		let answer = false
		openDialog(title, [
			el('h2', {}, title),
			notice(text),
			el('div', { class: 'cryptomator-choices' }, [
				el('button', { type: 'button', class: 'error primary', onclick: () => {
					answer = true
					closeDialog()
				} }, action),
				el('button', { type: 'button', onclick: closeDialog }, t('Cancel')),
			]),
		], () => resolve(answer))
		document.querySelector('.cryptomator-dialog button:last-child')?.focus()
	})
}

/**
 * Chooses a folder of a vault (its folders are decrypted here, so Nextcloud's
 * picker cannot show them): list(dirId) gives a folder's folders ({name, dirId});
 * the folders in excluded (those being moved) cannot be chosen or entered.
 * Resolves {dirId, ancestors (IDs from the top, '' first, ending with dirId)},
 * or null.
 */
export function chooseFolder(title, rootName, list, excluded, action) {
	return new Promise((resolve) => {
		let result = null
		let trail = [{ name: rootName, dirId: '' }]
		const crumbs = el('ol', { class: 'cryptomator-crumbs' })
		const folders = el('ul', { class: 'cryptomator-folders' })
		const choose = el('button', { type: 'button', class: 'primary', onclick: () => {
			result = { dirId: trail[trail.length - 1].dirId, ancestors: trail.map((item) => item.dirId) }
			closeDialog()
		} }, action)
		const show = async () => {
			crumbs.replaceChildren(...trail.map((item, index) => el('li', {}, index === trail.length - 1
				? el('span', { 'aria-current': 'page' }, item.name)
				: el('button', { type: 'button', onclick: () => {
					trail = trail.slice(0, index + 1)
					show()
				} }, item.name))))
			folders.replaceChildren(notice(t('Loading …')))
			try {
				const items = (await list(trail[trail.length - 1].dirId)).sort((a, b) => a.name.localeCompare(b.name))
				folders.replaceChildren(...(items.length ? items.map((item) => el('li', {}, el('button', {
					type: 'button',
					class: 'cryptomator-folders__item',
					disabled: excluded.has(item.dirId),
					onclick: () => {
						trail = [...trail, item]
						show()
					},
				}, item.name))) : [notice(t('No folders in here.'))]))
			} catch (error) {
				folders.replaceChildren(notice(error.message, 'error'))
			}
		}
		openDialog(title, [
			el('h2', {}, title),
			el('nav', {}, crumbs),
			el('div', { class: 'cryptomator-dialog__body' }, folders),
			el('div', { class: 'cryptomator-choices' }, [choose, el('button', { type: 'button', onclick: closeDialog }, t('Cancel'))]),
		], () => resolve(result))
		show()
	})
}

/**
 * The upload's dialog: a line per file with its state, Stop, which ends the
 * upload after the file being written (a file is never left half-written), and
 * the question what to do with a taken name (ask), asked within it.
 */
export function showUploads(title) {
	const list = el('ul', { class: 'cryptomator-uploads' })
	const overall = el('progress', { max: 1, value: 0 })
	const summary = el('div', { 'aria-live': 'polite' })
	const question = el('div', { class: 'cryptomator-question', hidden: true })
	let stopped = false
	const stop = el('button', { type: 'button', onclick: () => {
		stopped = true
		stop.disabled = true
		stop.textContent = t('Stopping after this file …')
	} }, t('Stop'))
	const close = el('button', { type: 'button', class: 'primary', hidden: true, onclick: closeDialog }, t('Close'))
	openDialog(title, [
		el('div', { class: 'cryptomator-dialog__head' }, [el('h2', {}, title), stop, close]),
		overall,
		question,
		el('div', { class: 'cryptomator-dialog__body' }, list),
		summary,
	])
	return {
		get stopped() {
			return stopped
		},
		file(name) {
			const state = el('span', { class: 'cryptomator-dialog__meta' }, t('Waiting'))
			const bar = el('progress', { max: 1, value: 0 })
			list.append(el('li', {}, [el('span', { class: 'cryptomator-uploads__name' }, name), state, bar]))
			return {
				phase(text, fraction) {
					state.textContent = text
					bar.value = fraction
				},
				done(text, failed) {
					state.textContent = text
					state.classList.toggle('cryptomator-notice--error', Boolean(failed))
					bar.value = 1
				},
			}
		},
		/**
		 * What to do with a taken name: 'replace', 'skip', 'replace-all', 'skip-all' or
		 * 'cancel'; text and cancel tell what replacing does and what stops.
		 */
		ask(name, total, { text, cancel } = {}) {
			return new Promise((resolve) => {
				const choose = (choice) => () => {
					question.hidden = true
					question.replaceChildren()
					resolve(choice)
				}
				question.replaceChildren(
					el('h3', {}, t('“{name}” already exists', { name })),
					notice(text || t('Replace the file in the vault with the one you chose? The vault keeps no copy of the old one; Nextcloud\'s versions keep its encrypted file.')),
					el('div', { class: 'cryptomator-choices' }, [
						el('button', { type: 'button', class: 'primary', onclick: choose('replace') }, t('Replace')),
						el('button', { type: 'button', onclick: choose('skip') }, t('Skip')),
						total > 1 ? el('button', { type: 'button', onclick: choose('replace-all') }, t('Replace all')) : null,
						total > 1 ? el('button', { type: 'button', onclick: choose('skip-all') }, t('Skip all')) : null,
						el('button', { type: 'button', onclick: choose('cancel') }, cancel || t('Cancel upload')),
					]),
				)
				question.hidden = false
				question.querySelector('button').focus()
			})
		},
		progress(fraction) {
			overall.value = fraction
		},
		finish(text, failed) {
			overall.value = 1
			stop.hidden = true
			close.hidden = false
			summary.replaceChildren(notice(text, failed ? 'error' : undefined))
			close.focus()
		},
	}
}

/**
 * A form in the dialog. fields: {name, label, type ('text', 'password' or
 * 'textarea'), autocomplete, value, readonly, optional (may stay empty), account
 * (the vault's folder for a password manager)}; run(values) does the work, its
 * error shown and the form kept for another try; resolves with what run returns,
 * or null when closed.
 */
export function askForm({ title, intro, fields, action, working, run }) {
	return new Promise((resolve) => {
		let result = null
		const inputs = {}
		const status = el('div', { 'aria-live': 'polite' })
		const submit = el('button', { type: 'submit', class: 'primary' }, action)
		const rows = fields.map((field) => {
			const input = field.type === 'textarea'
				? el('textarea', { name: field.name, rows: 4, required: true, spellcheck: 'false', autocomplete: 'off', class: 'cryptomator-form__words' })
				: el('input', {
					type: field.type ?? 'text', name: field.name, autocomplete: field.autocomplete ?? 'off',
					required: !field.readonly && !field.optional, readonly: field.readonly || null, class: field.account ? 'cryptomator-unlock__account' : null,
				})
			input.value = field.value ?? ''
			inputs[field.name] = input
			return el('label', {}, [field.label, input])
		})
		openDialog(title, [
			el('h2', {}, title),
			...(intro ? [].concat(intro).map((text) => notice(text)) : []),
			el('form', {
				class: 'cryptomator-unlock cryptomator-form',
				method: 'post',
				action: '#',
				autocomplete: 'on',
				onsubmit: async (event) => {
					event.preventDefault()
					submit.disabled = true
					status.replaceChildren(notice(working ?? t('Working …')))
					// Let the page paint before scrypt takes the thread for a moment.
					await new Promise((wait) => setTimeout(wait, 30))
					try {
						result = await run(Object.fromEntries(Object.entries(inputs).map(([name, input]) => [name, input.value])))
						closeDialog()
					} catch (error) {
						submit.disabled = false
						status.replaceChildren(notice(error.message, 'error'))
					}
				},
			}, [...rows, el('div', { class: 'cryptomator-choices' }, [submit, el('button', { type: 'button', onclick: closeDialog }, t('Cancel'))])]),
			status,
		], () => {
			for (const input of Object.values(inputs)) {
				if (input.type === 'password' || input.tagName === 'TEXTAREA') {
					input.value = ''
				}
			}
			resolve(result)
		})
		Object.values(inputs).find((input) => !input.readOnly)?.focus()
	})
}

/** A vault's recovery key, to be written down; copied on request. */
export function showRecoveryKey(vaultName, key, { created = false } = {}) {
	return new Promise((resolve) => {
		const words = el('div', { class: 'cryptomator-recovery-key', tabindex: '0' }, key)
		const copied = el('span', { class: 'cryptomator-dialog__meta', 'aria-live': 'polite' })
		openDialog(t('Recovery key'), [
			el('h2', {}, created ? t('{vault} is ready', { vault: vaultName }) : t('Recovery key of {vault}', { vault: vaultName })),
			notice(t('With this recovery key you can set a new password if you forget the one you have, here or in Cryptomator. Anyone who has it can open the vault: keep it on paper or in your password manager, not in this cloud.')),
			words,
			el('div', { class: 'cryptomator-choices' }, [
				el('button', { type: 'button', onclick: async () => {
					try {
						await navigator.clipboard.writeText(key)
						copied.textContent = t('Copied')
					} catch {
						copied.textContent = t('Copying is not allowed here: select the words and copy them.')
					}
				} }, t('Copy')),
				copied,
				el('button', { type: 'button', class: 'primary', onclick: closeDialog }, t('Done')),
			]),
		], () => {
			words.textContent = ''
			resolve()
		})
		words.focus()
	})
}

/**
 * The health check's dialog: check(onProgress) gives the findings, describe(finding)
 * a sentence for one, repair(findings) repairs those that can be; checked again after.
 */
export function showHealth(vaultName, { check, describe, repair }) {
	const body = el('div', { class: 'cryptomator-dialog__body' })
	const status = el('div', { 'aria-live': 'polite' })
	const progress = el('progress', { max: 1, value: 0 })
	const severity = { CRITICAL: t('Damaged'), WARN: t('Needs repair'), INFO: t('Note') }
	const run = async () => {
		body.replaceChildren()
		progress.hidden = false
		progress.value = 0
		status.replaceChildren(notice(t('Checking the vault …')))
		let findings
		try {
			findings = await check((done, total) => {
				progress.value = total ? done / total : 1
			})
		} catch (error) {
			progress.hidden = true
			status.replaceChildren(notice(error.message, 'error'))
			return
		}
		progress.hidden = true
		if (findings.length === 0) {
			status.replaceChildren(notice(t('The vault is healthy: the check found nothing to repair.')))
			return
		}
		body.append(el('ul', { class: 'cryptomator-findings' }, findings.map((finding) => el('li', {}, [
			el('span', { class: 'cryptomator-findings__severity cryptomator-findings__severity--' + finding.severity.toLowerCase() }, severity[finding.severity]),
			el('span', {}, describe(finding)),
			el('code', { class: 'cryptomator-dialog__meta' }, finding.path),
		]))))
		const fixable = findings.filter((finding) => finding.fixable)
		const choices = []
		if (fixable.length) {
			choices.push(el('button', { type: 'button', class: 'primary', onclick: async (event) => {
				event.target.disabled = true
				status.replaceChildren(notice(t('Repairing …')))
				try {
					await repair(fixable)
				} catch (error) {
					status.replaceChildren(notice(error.message, 'error'))
					return
				}
				await run()
			} }, t('Repair {count}', { count: fixable.length })))
		}
		status.replaceChildren(
			notice(fixable.length === findings.length
				? t('Each of these can be repaired, as Cryptomator\'s health check repairs it.')
				: t('{count} of these can be repaired, as Cryptomator\'s health check repairs them; the others need Cryptomator or a backup.', { count: fixable.length })),
			el('div', { class: 'cryptomator-choices' }, choices),
		)
	}
	openDialog(t('Health check'), [
		el('div', { class: 'cryptomator-dialog__head' }, [el('h2', {}, t('Health check of {vault}', { vault: vaultName })),
			el('button', { type: 'button', onclick: closeDialog }, t('Close'))]),
		progress,
		body,
		status,
	])
	run()
}
