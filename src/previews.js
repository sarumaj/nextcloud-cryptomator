/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Previews made in the browser, each loaded when a file of its kind is opened:
 * Markdown rendered (marked), a ZIP archive's contents listed (JSZip), and HEIC
 * pictures decoded (libheif, as WebAssembly), as phones take them and browsers do
 * not show. Markdown and ZIP become pages for the sandboxed frame (sandbox.js).
 */
import { disarm, escapeHtml, page } from './sandbox.js'

const STYLE = '<style>body{font:14px/1.5 system-ui,sans-serif;margin:12px 16px;color:#222;background:#fff}'
	+ 'pre,code{background:#f4f4f4;border-radius:4px}pre{padding:8px;overflow:auto}code{padding:1px 3px}'
	+ 'table{border-collapse:collapse}td,th{border:1px solid #ddd;padding:3px 8px;text-align:start}'
	+ 'img{max-width:100%}blockquote{border-left:3px solid #ccc;margin-left:0;padding-left:12px;color:#555}</style>'

/** A Markdown file, rendered, as a page (raw HTML in it is kept, but runs nothing and loads nothing). */
export async function markdownPage(data) {
	const { marked } = await import('marked')
	const holder = document.createElement('div')
	holder.innerHTML = await marked.parse(new TextDecoder('utf-8').decode(data), { async: true, gfm: true })
	disarm(holder)
	return page(STYLE, holder.innerHTML)
}

/** A ZIP archive's contents as a page: every entry with its size and date. */
export async function zipPage(data) {
	const { default: JSZip } = await import('jszip')
	const zip = await JSZip.loadAsync(data)
	const rows = []
	let files = 0
	let bytes = 0
	zip.forEach((path, entry) => {
		const size = entry.dir ? '' : (entry._data?.uncompressedSize ?? '')
		if (!entry.dir) {
			files++
			bytes += Number(size) || 0
		}
		rows.push('<tr><td>' + escapeHtml(path) + '</td><td>' + escapeHtml(size) + '</td><td>'
			+ escapeHtml(entry.date ? entry.date.toISOString().slice(0, 16).replace('T', ' ') : '') + '</td></tr>')
	})
	return page(STYLE, '<p>' + files + (files === 1 ? ' file, ' : ' files, ') + bytes + (bytes === 1 ? ' byte' : ' bytes') + ' unpacked</p>'
		+ '<table><thead><tr><th>Name</th><th>Bytes</th><th>Modified</th></tr></thead><tbody>' + rows.join('') + '</tbody></table>')
}

/** A HEIC or HEIF picture's first image as PNG. */
export async function heicToPng(data) {
	const { default: factory } = await import('libheif-js/libheif-wasm/libheif-bundle.mjs')
	const libheif = await factory()
	const images = new libheif.HeifDecoder().decode(data)
	if (!images.length) {
		throw new Error('no image in the file')
	}
	const image = images[0]
	const width = image.get_width()
	const height = image.get_height()
	const canvas = document.createElement('canvas')
	canvas.width = width
	canvas.height = height
	const context = canvas.getContext('2d')
	const pixels = context.createImageData(width, height)
	await new Promise((resolve, reject) => image.display(pixels, (shown) => (shown ? resolve() : reject(new Error('the picture does not decode')))))
	context.putImageData(pixels, 0, 0)
	for (const each of images) {
		each.free?.()
	}
	const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
	return new Uint8Array(await blob.arrayBuffer())
}
