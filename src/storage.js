/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * The person's files over WebDAV, as the Files app reads and writes them: a
 * vault's folder as the storage js/vault.js uses (encrypted files only), and the
 * search for folders that hold a vault.
 *
 * Writing never overwrites by accident: a new file is put with If-None-Match: *
 * and moved with Overwrite: F, so the server refuses (412, VaultError 'exists')
 * where something of that name appeared meanwhile. A file is complete or absent:
 * Nextcloud writes a PUT to a .part file and renames it, and assembles a chunked
 * upload (CHUNKED_FROM and up) only at its final MOVE.
 */
import { getCurrentUser } from '@nextcloud/auth'
import { generateRemoteUrl } from '@nextcloud/router'
import vaultLib from '../app/cryptomator_vaults/js/vault.js'

const { VaultError } = vaultLib
const DAV = 'DAV:'
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
		const prop = (name) => response.getElementsByTagNameNS(DAV, name)[0]
		const length = prop('getcontentlength')
		const modified = prop('getlastmodified')
		return {
			href: prop('href').textContent,
			isDir: response.getElementsByTagNameNS(DAV, 'collection').length > 0,
			size: length ? Number(length.textContent) : 0,
			mtime: modified ? new Date(modified.textContent) : undefined,
		}
	})
}

function lastSegment(href) {
	const parts = href.replace(/\/+$/, '').split('/')
	return decodeURIComponent(parts[parts.length - 1])
}

function davError(status, relative) {
	if (status === 404) {
		return new VaultError('not-found', relative)
	}
	if (status === 412 || status === 405) {
		return new VaultError('exists', relative)
	}
	if (status === 507) {
		return new VaultError('quota', relative)
	}
	return new VaultError('network', 'HTTP ' + status)
}

/** A request with the upload's progress (fetch reports none): resolves with the status. */
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
		request.addEventListener('load', () => resolve(request.status))
		request.addEventListener('error', () => reject(new VaultError('network', method + ' failed')))
		request.addEventListener('abort', () => reject(new VaultError('network', method + ' aborted')))
		request.send(body ?? null)
	})
}

async function davRequest(method, url, headers, relative, accept) {
	const response = await fetch(url, { method, headers: davHeaders(headers), credentials: 'same-origin' })
	if (!accept.includes(response.status)) {
		throw davError(response.status, relative)
	}
	return response
}

/** The vault's folder: paths relative to it, contents as they are stored (encrypted). */
export function davStorage(folder) {
	const base = filesUrl(folder)
	const url = (relative) => base + encodePath(relative)
	// A whole file in chunks: an upload folder, its parts, then one MOVE onto the
	// target, which only then appears.
	async function writeChunked(relative, data, create, onProgress) {
		const uploads = generateRemoteUrl('dav') + '/uploads/' + encodeURIComponent(userId()) + '/'
			+ 'cryptomator-vaults-' + crypto.randomUUID()
		const target = new URL(url(relative), window.location.href).href
		const common = { Destination: target, 'OC-Total-Length': String(data.length) }
		await davRequest('MKCOL', uploads, { Destination: target }, relative, [201])
		try {
			for (let offset = 0, part = 1; offset < data.length; offset += CHUNK_SIZE, part++) {
				const chunk = data.subarray(offset, Math.min(offset + CHUNK_SIZE, data.length))
				const status = await send('PUT', uploads + '/' + String(part).padStart(5, '0'), common, chunk,
					(done) => onProgress?.(offset + done, data.length))
				if (status !== 201 && status !== 204) {
					throw davError(status, relative)
				}
			}
			const response = await fetch(uploads + '/.file', {
				method: 'MOVE',
				headers: davHeaders({ ...common, Overwrite: create ? 'F' : 'T' }),
				credentials: 'same-origin',
			})
			if (![201, 204].includes(response.status)) {
				throw davError(response.status, relative)
			}
		} catch (error) {
			await fetch(uploads, { method: 'DELETE', headers: davHeaders(), credentials: 'same-origin' }).catch(() => {})
			throw error
		}
	}

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
		async stat(relative) {
			const response = await fetch(url(relative), {
				method: 'PROPFIND',
				headers: davHeaders({ Depth: '0', 'Content-Type': 'application/xml; charset=utf-8' }),
				credentials: 'same-origin',
				body: '<?xml version="1.0"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/></d:prop></d:propfind>',
			})
			if (response.status === 404) {
				return null
			}
			if (response.status !== 207) {
				throw davError(response.status, relative)
			}
			const [entry] = parseMultistatus(await response.text())
			return { isDir: entry.isDir, size: entry.size }
		},
		/** Stores a file whole; create: refused (VaultError 'exists') if the name is taken. */
		async write(relative, data, { create = false, onProgress } = {}) {
			if (data.length >= CHUNKED_FROM) {
				return writeChunked(relative, data, create, onProgress)
			}
			const status = await send('PUT', url(relative), create ? { 'If-None-Match': '*' } : {}, data, onProgress)
			if (status !== 201 && status !== 204) {
				throw davError(status, relative)
			}
		},
		async mkdir(relative, { existsOk = false } = {}) {
			const response = await fetch(url(relative), { method: 'MKCOL', headers: davHeaders(), credentials: 'same-origin' })
			if (response.status === 201 || (response.status === 405 && existsOk)) {
				return
			}
			throw davError(response.status, relative)
		},
		/** Moves in one step; refused (VaultError 'exists') if the target is taken, unless overwrite. */
		async move(from, to, { overwrite = false } = {}) {
			await davRequest('MOVE', url(from), { Destination: new URL(url(to), window.location.href).href, Overwrite: overwrite ? 'T' : 'F' }, to, [201, 204])
		},
		async remove(relative) {
			await davRequest('DELETE', url(relative), {}, relative, [204, 404])
		},
		async list(relative) {
			const response = await fetch(base + (relative ? encodePath(relative) + '/' : ''), {
				method: 'PROPFIND',
				headers: davHeaders({ Depth: '1', 'Content-Type': 'application/xml; charset=utf-8' }),
				credentials: 'same-origin',
				body: '<?xml version="1.0"?><d:propfind xmlns:d="DAV:"><d:prop>'
					+ '<d:resourcetype/><d:getcontentlength/><d:getlastmodified/></d:prop></d:propfind>',
			})
			if (response.status === 404) {
				throw new VaultError('not-found', relative)
			}
			if (!response.ok) {
				throw new VaultError('network', 'HTTP ' + response.status)
			}
			// The first response is the folder itself.
			return parseMultistatus(await response.text()).slice(1)
				.map((entry) => ({ name: lastSegment(entry.href), isDir: entry.isDir, size: entry.size, mtime: entry.mtime }))
		},
	}
}

/** The folders of the person's files that hold a vault.cryptomator, e.g. /Documents/Vault. */
export async function findVaults() {
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
			+ '<d:where><d:like><d:prop><d:displayname/></d:prop><d:literal>vault.cryptomator</d:literal></d:like></d:where>'
			+ '</d:basicsearch></d:searchrequest>',
	})
	if (!response.ok) {
		throw new Error('HTTP ' + response.status)
	}
	const prefix = '/files/' + user + '/'
	return parseMultistatus(await response.text())
		.map((entry) => decodeURIComponent(entry.href))
		.filter((href) => href.endsWith('/vault.cryptomator') && href.includes(prefix))
		.map((href) => '/' + href.slice(href.indexOf(prefix) + prefix.length, -'/vault.cryptomator'.length))
		.map((folder) => folder.replace(/\/+$/, '') || '/')
		.sort((a, b) => a.localeCompare(b))
}
