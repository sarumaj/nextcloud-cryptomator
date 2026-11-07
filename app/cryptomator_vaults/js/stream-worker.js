/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * The service worker that streams a vault's file to the browser's own player (video,
 * audio) and PDF viewer, and to its downloads (src/stream.js registers it). Players
 * read in ranges of bytes (bytes 42 to 3567, then elsewhere after a seek), and only
 * from a URL; this worker answers the URLs below its scope (js/stream/) itself, so
 * that they never reach the server:
 *
 *   probe          a page marked data-cryptomator-stream="ok": the page's check that
 *                  the worker answers (else the server would, with its "not found")
 *   <id>/frame     a page with the player for the file, which reads <id>/file
 *   <id>/file      the file's bytes, a range (206) if asked; ?download: as a download
 *
 * The bytes come from the page that opened the file (src/stream.js), which holds the
 * vault's keys and decrypts only the chunks a range needs (Vault.openFile): the
 * worker holds no key, and nothing it does reaches the network. It asks the page in
 * messages, each answered on a port of its own. The same file runs under Node for
 * the tests (tests/stream.test.js): its helpers, without the worker's events.
 */
'use strict'

// The most a range answer holds: a player asking for "the rest" (bytes=N-) gets
// this much and asks again, so a seek does not leave a long read behind.
const RANGE_LIMIT = 8 * 1024 * 1024
// The bytes asked from the page at once.
const PIECE = 2 * 1024 * 1024
// How long a page may take to say whether a file is its own.
const ASK_TIMEOUT = 5000
// The types the worker serves a file as: never one a browser runs (HTML, SVG).
const TYPES = /^(video|audio)\/[\w.+-]+$|^application\/pdf$/
const MARKER = 'data-cryptomator-stream="ok"'

/**
 * A Range header for a file of size bytes: { start, end } (end exclusive), at most
 * RANGE_LIMIT long; null when it asks for none or for several (answered whole), or
 * 'unsatisfiable' when it starts past the end.
 */
function parseRange(header, size) {
	const match = /^bytes=(\d*)-(\d*)$/.exec((header || '').trim())
	if (!match || (match[1] === '' && match[2] === '')) {
		return null
	}
	let start
	let end
	if (match[1] === '') {
		// The last N bytes.
		start = Math.max(0, size - Number(match[2]))
		end = size
	} else {
		start = Number(match[1])
		end = match[2] === '' ? size : Math.min(Number(match[2]) + 1, size)
	}
	if (start >= size || end <= start) {
		return 'unsatisfiable'
	}
	return { start, end: Math.min(end, start + RANGE_LIMIT) }
}

/** Content-Disposition for a file's name (RFC 6266): ASCII for old readers, UTF-8 for the rest. */
function contentDisposition(name, download) {
	const ascii = name.replace(/[^\x20-\x7e]|["\\%]/g, '_')
	const utf8 = encodeURIComponent(name).replace(/['()*]/g, (character) => '%' + character.charCodeAt(0).toString(16).toUpperCase())
	return (download ? 'attachment' : 'inline') + '; filename="' + ascii + '"; filename*=UTF-8\'\'' + utf8
}

/** The page with the player: no script, only the file below it. */
function playerPage(kind) {
	const media = kind === 'audio' ? '<audio src="file" controls preload="metadata"></audio>' : '<video src="file" controls preload="metadata"></video>'
	return '<!DOCTYPE html><html lang="" ' + MARKER + '><head><meta charset="utf-8"><title></title>'
		+ '<style>html,body{margin:0;height:100%}body{display:flex;align-items:center;justify-content:center}'
		+ 'video{max-width:100%;max-height:100%;background:#000}audio{width:100%}</style></head><body>' + media + '</body></html>'
}

/** What the worker answers for a path below its scope: { kind, id, download } or null (not its own). */
function route(relative, search) {
	if (relative === 'probe') {
		return { kind: 'probe' }
	}
	const match = /^([0-9a-f]{32})\/(frame|file)$/.exec(relative)
	if (!match) {
		return null
	}
	return { kind: match[2], id: match[1], download: new URLSearchParams(search).has('download') }
}

const PAGE_HEADERS = {
	'Content-Type': 'text/html; charset=utf-8',
	'Content-Security-Policy': "default-src 'none'; media-src 'self'; style-src 'unsafe-inline'; frame-ancestors 'self'",
}
const COMMON_HEADERS = {
	'Cache-Control': 'no-store',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'no-referrer',
}

if (typeof module === 'object' && module.exports) {
	module.exports = { parseRange, contentDisposition, playerPage, route, RANGE_LIMIT }
} else {
	// The page that opened each file, by the file's ID: asked first, the others after.
	const owners = new Map()

	/** Asks one page; its answer, or null when it has none in time. */
	const askClient = (client, message) => new Promise((resolve) => {
		const channel = new MessageChannel()
		const timer = setTimeout(() => resolve(null), ASK_TIMEOUT)
		channel.port1.onmessage = (event) => {
			clearTimeout(timer)
			resolve(event.data)
		}
		client.postMessage({ type: 'cryptomator-stream', ...message }, [channel.port2])
	})

	/** Asks the page that opened the file; an answer { unknown } if no page has it (any more). */
	async function ask(message) {
		const known = owners.get(message.id)
		const client = known && await self.clients.get(known)
		if (client) {
			const answer = await askClient(client, message)
			if (answer && !answer.unknown) {
				return answer
			}
		}
		const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true })
		const answers = await Promise.all(windows.map(async (window) => ({ window, answer: await askClient(window, message) })))
		const found = answers.find(({ answer }) => answer && !answer.unknown)
		if (!found) {
			owners.delete(message.id)
			return { unknown: true }
		}
		owners.set(message.id, found.window.id)
		return found.answer
	}

	/** Bytes start to end of the file, in pieces as the reader takes them. */
	function body(id, start, end) {
		let position = start
		return new ReadableStream({
			async pull(controller) {
				if (position >= end) {
					controller.close()
					return
				}
				const answer = await ask({ op: 'read', id, start: position, end: Math.min(position + PIECE, end) })
				if (!answer.bytes || answer.bytes.length === 0) {
					controller.error(new Error(answer.error || 'the file is no longer open'))
					return
				}
				position += answer.bytes.length
				controller.enqueue(answer.bytes)
			},
		}, { highWaterMark: 1 })
	}

	const html = (status, text) => new Response(text, { status, headers: { ...COMMON_HEADERS, ...PAGE_HEADERS } })
	const gone = () => html(404, '<!DOCTYPE html><html lang="en"><meta charset="utf-8"><title>Closed</title><p>This file is no longer open. Open it again in the vault.</p></html>')

	async function respond(request, target) {
		if (target.kind === 'probe') {
			return html(200, '<!DOCTYPE html><html lang="" ' + MARKER + '></html>')
		}
		const info = await ask({ op: 'info', id: target.id })
		if (info.unknown) {
			return gone()
		}
		if (target.kind === 'frame') {
			return html(200, playerPage(info.kind))
		}
		const type = !target.download && TYPES.test(info.type) ? info.type : 'application/octet-stream'
		const headers = {
			...COMMON_HEADERS,
			'Content-Type': type,
			'Content-Disposition': contentDisposition(info.name, target.download || type === 'application/octet-stream'),
			'Accept-Ranges': 'bytes',
			'Content-Security-Policy': "frame-ancestors 'self'",
		}
		const range = target.download ? null : parseRange(request.headers.get('Range'), info.size)
		if (range === 'unsatisfiable') {
			return new Response(null, { status: 416, headers: { ...headers, 'Content-Range': 'bytes */' + info.size } })
		}
		if (range) {
			return new Response(request.method === 'HEAD' ? null : body(target.id, range.start, range.end), {
				status: 206,
				headers: { ...headers, 'Content-Length': String(range.end - range.start), 'Content-Range': 'bytes ' + range.start + '-' + (range.end - 1) + '/' + info.size },
			})
		}
		return new Response(request.method === 'HEAD' ? null : body(target.id, 0, info.size), { status: 200, headers: { ...headers, 'Content-Length': String(info.size) } })
	}

	self.addEventListener('install', () => self.skipWaiting())
	self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))
	// The page's keepalive while a file is open: each message keeps the worker running.
	self.addEventListener('message', () => {})
	self.addEventListener('fetch', (event) => {
		const url = new URL(event.request.url)
		const scope = new URL(self.registration.scope)
		if (url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname) || !['GET', 'HEAD'].includes(event.request.method)) {
			return
		}
		const target = route(url.pathname.slice(scope.pathname.length), url.search)
		event.respondWith(target ? respond(event.request, target).catch(() => gone()) : gone())
	})
}
