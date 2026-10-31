/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * The person's files over WebDAV, as the Files app reads them: a vault's folder
 * as the storage js/vault.js reads (encrypted files only), and the search for
 * folders that hold a vault.
 */
import { getCurrentUser } from '@nextcloud/auth'
import { generateRemoteUrl } from '@nextcloud/router'
import vaultLib from '../app/cryptomator_vaults/js/vault.js'

const { VaultError } = vaultLib
const DAV = 'DAV:'

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

/** The vault's folder: paths relative to it, contents as they are stored (encrypted). */
export function davStorage(folder) {
	const base = filesUrl(folder)
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
