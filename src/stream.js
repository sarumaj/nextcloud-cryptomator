// SPDX-License-Identifier: AGPL-3.0-or-later
//
// Files streamed to the browser's player, PDF viewer and downloads through the
// service worker js/stream-worker.js: the page keeps the files it opened
// (Vault.openFile) and answers the worker's asks for their bytes, decrypting only
// the chunks a range needs. No file is held whole, so neither its size nor the
// browser's memory limits what is played or downloaded.
//
// A service worker serves only the pages in its scope (js/stream/), not the Files
// app's: the player is a page of its own there, in a frame. Without a working
// worker (a private window of Firefox, a browser without them) streaming() is
// false, and the dialogs decrypt the file whole, as before.
import { generateFilePath } from '@nextcloud/router'

const WORKER = new URL(generateFilePath('cryptomator_vaults', 'js', 'stream-worker.js'), window.location.href).href
const SCOPE = new URL('stream/', WORKER).href
// How long the worker may take to start and answer its probe.
const START_TIMEOUT = 10000
// While a file is open, the page reminds the worker so often that it is in use:
// a browser stops an idle worker after 30 seconds, also in the middle of a download.
const KEEPALIVE = 10000
// A download nobody reads from any more (cancelled) is closed after this long.
const DOWNLOAD_IDLE = 30 * 60 * 1000

/** The open files by ID: { file, name, type, kind, read (when last read) }. */
const streams = new Map()
let started = null
let registration = null
let keepalive = null

/** Whether files are streamed (the worker answers); started on the first ask. */
export function streaming() {
	started ??= start().catch(() => false)
	return started
}

async function start() {
	if (!window.isSecureContext || !('serviceWorker' in navigator)) {
		return false
	}
	navigator.serviceWorker.addEventListener('message', answer)
	navigator.serviceWorker.startMessages()
	registration = await navigator.serviceWorker.register(WORKER, { scope: SCOPE })
	await within(activated(registration), START_TIMEOUT)
	return within(probe(), START_TIMEOUT)
}

const within = (promise, timeout) => Promise.race([promise, new Promise((resolve, reject) => setTimeout(() => reject(new Error('timeout')), timeout))])

function activated(registration) {
	if (registration.active) {
		return Promise.resolve()
	}
	const worker = registration.installing || registration.waiting
	return new Promise((resolve, reject) => {
		worker.addEventListener('statechange', () => {
			if (worker.state === 'activated') {
				resolve()
			} else if (worker.state === 'redundant') {
				reject(new Error('the stream worker did not start'))
			}
		})
	})
}

/** Whether the worker answers its probe in a hidden frame (else the server does, and the page is not its). */
function probe() {
	return new Promise((resolve) => {
		const frame = hiddenFrame(SCOPE + 'probe')
		frame.addEventListener('load', () => {
			let ok = false
			try {
				ok = frame.contentDocument?.documentElement?.getAttribute('data-cryptomator-stream') === 'ok'
			} catch {
				// Another origin's page: not the worker's.
			}
			frame.remove()
			resolve(ok)
		})
		document.body.append(frame)
	})
}

function hiddenFrame(src) {
	const frame = document.createElement('iframe')
	frame.hidden = true
	frame.setAttribute('aria-hidden', 'true')
	frame.src = src
	return frame
}

/** The worker's asks: a file's facts (info) or its bytes start to end (read), answered on the ask's port. */
function answer(event) {
	const port = event.ports?.[0]
	if (event.data?.type !== 'cryptomator-stream' || !port || event.source?.scriptURL !== WORKER) {
		return
	}
	const stream = streams.get(event.data.id)
	if (!stream) {
		port.postMessage({ unknown: true })
		return
	}
	if (event.data.op === 'info') {
		port.postMessage({ size: stream.file.size, type: stream.type, name: stream.name, kind: stream.kind })
	} else if (event.data.op === 'read') {
		stream.read = Date.now()
		stream.file.read(event.data.start, event.data.end).then((bytes) => {
			port.postMessage({ bytes }, [bytes.buffer])
			if (stream.kind === 'download' && event.data.end >= stream.file.size) {
				// The download's last bytes: done once the browser has them.
				setTimeout(() => closeStream(event.data.id), 60000)
			}
		}, (error) => port.postMessage({ error: error?.message || String(error) }))
	}
}

/**
 * Opens a file (Vault.openFile's { size, read }) for the worker: its URLs, the
 * player's page (frame) and the bytes (file), valid until closeStream(id).
 */
export function openStream(file, name, type, kind) {
	const id = Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, '0')).join('')
	streams.set(id, { file, name, type, kind, read: Date.now() })
	keepalive ??= setInterval(() => {
		const now = Date.now()
		for (const [id, stream] of streams) {
			if (stream.kind === 'download' && now - stream.read > DOWNLOAD_IDLE) {
				closeStream(id)
			}
		}
		registration?.active?.postMessage({ type: 'cryptomator-keepalive' })
	}, KEEPALIVE)
	return { id, frame: SCOPE + id + '/frame', url: SCOPE + id + '/file' }
}

export function closeStream(id) {
	const stream = streams.get(id)
	streams.delete(id)
	stream?.frame?.remove()
	if (streams.size === 0 && keepalive) {
		clearInterval(keepalive)
		keepalive = null
	}
}

/** Closes every open file (the vault was locked): the worker's URLs answer "no longer open". */
export function closeStreams() {
	for (const id of [...streams.keys()]) {
		closeStream(id)
	}
}

/** Downloads an opened file through the worker, decrypted as the browser saves it. */
export function streamDownload(file, name) {
	const { id, url } = openStream(file, name, 'application/octet-stream', 'download')
	// A navigation in a frame below the worker's scope: the worker answers it, and the
	// browser saves it as the answer says (Content-Disposition: attachment).
	const frame = hiddenFrame(url + '?download')
	streams.get(id).frame = frame
	document.body.append(frame)
	if (file.size === 0) {
		setTimeout(() => closeStream(id), 60000)
	}
}
