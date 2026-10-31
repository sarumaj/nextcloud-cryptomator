/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Previews of office documents, made in the browser: Word (docx) with
 * docx-preview, spreadsheets (xlsx, xls, ods) with SheetJS. Loaded only when a
 * document is opened (a chunk of its own). Collabora would need the decrypted
 * file on the server.
 *
 * The result is a whole HTML document for the sandboxed frame (sandbox.js).
 */
import { renderAsync } from 'docx-preview'
import { read, utils } from 'xlsx'
import { disarm, page } from './sandbox.js'

// Rows of a sheet shown at most: a preview, not a spreadsheet program.
const SHEET_ROWS = 2000

/** A Word document (docx) as a page for the sandboxed frame. */
export async function docxPage(data) {
	const body = document.createElement('div')
	const styles = document.createElement('div')
	await renderAsync(new Blob([data]), body, styles, {
		inWrapper: true,
		useBase64URL: true,
		ignoreLastRenderedPageBreak: true,
		renderHeaders: true,
		renderFooters: true,
		experimental: false,
	})
	disarm(body)
	return page(styles.innerHTML + '<style>body{margin:0;background:#eee}</style>', body.innerHTML)
}

/** A spreadsheet (xlsx, xls, ods) as a page: every sheet as a table, up to SHEET_ROWS rows. */
export function sheetPage(data) {
	const workbook = read(data, { type: 'array', sheetRows: SHEET_ROWS + 1, cellHTML: false, cellFormula: false, dense: true })
	const holder = document.createElement('div')
	for (const name of workbook.SheetNames) {
		const section = document.createElement('section')
		const heading = document.createElement('h2')
		heading.textContent = name
		section.append(heading)
		const table = document.createElement('div')
		table.innerHTML = utils.sheet_to_html(workbook.Sheets[name], { header: '', footer: '' })
		section.append(table)
		holder.append(section)
	}
	disarm(holder)
	const style = '<style>body{font:13px system-ui,sans-serif;margin:8px}h2{font-size:15px;margin:16px 0 6px}'
		+ 'table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:2px 6px;white-space:nowrap}</style>'
	return page(style, holder.innerHTML)
}
