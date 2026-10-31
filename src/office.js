/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Previews of presentations and OpenDocument text, made in the browser from the
 * files' XML (JSZip opens them): PowerPoint (pptx) and Impress (odp) slides at
 * their size with their text boxes, pictures and simple tables, Writer (odt) text
 * with headings, lists, tables and pictures. A preview, not an office suite: what
 * these renderers do not know (charts, effects, animations) is left out. Loaded
 * when such a file is opened; the pages go to the sandboxed frame (sandbox.js).
 */
import JSZip from 'jszip'
import { disarm, escapeHtml, page } from './sandbox.js'

const NS = {
	a: 'http://schemas.openxmlformats.org/drawingml/2006/main',
	p: 'http://schemas.openxmlformats.org/presentationml/2006/main',
	r: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
	rel: 'http://schemas.openxmlformats.org/package/2006/relationships',
	office: 'urn:oasis:names:tc:opendocument:xmlns:office:1.0',
	text: 'urn:oasis:names:tc:opendocument:xmlns:text:1.0',
	table: 'urn:oasis:names:tc:opendocument:xmlns:table:1.0',
	draw: 'urn:oasis:names:tc:opendocument:xmlns:drawing:1.0',
	svg: 'urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0',
	fo: 'urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0',
	style: 'urn:oasis:names:tc:opendocument:xmlns:style:1.0',
	xlink: 'http://www.w3.org/1999/xlink',
}

// Slides take the frame's width at their aspect ratio (the frame runs no script to
// measure it): places in percent of the slide, sizes in cqw (hundredths of its
// width), computed as if it were SLIDE_WIDTH pixels wide.
const SLIDE_WIDTH = 960
const cqw = (pixels) => (pixels / SLIDE_WIDTH * 100).toFixed(3) + 'cqw'
const percent = (part, whole) => (part / whole * 100).toFixed(3) + '%'
const IMAGE_TYPES = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', bmp: 'image/bmp', webp: 'image/webp', svg: 'image/svg+xml' }

const STYLE = '<style>body{margin:0;padding:12px;background:#e8e8e8;font-family:system-ui,sans-serif;color:#222}'
	+ '.slide{position:relative;overflow:hidden;background:#fff;margin:0 auto 16px;box-shadow:0 1px 4px rgba(0,0,0,.3);width:100%;container-type:inline-size}'
	+ '.box{position:absolute;overflow:hidden;box-sizing:border-box}.box p{margin:0}'
	+ '.doc{background:#fff;max-width:800px;margin:0 auto;padding:40px 56px;box-shadow:0 1px 4px rgba(0,0,0,.3);line-height:1.4}'
	+ 'table{border-collapse:collapse}td{border:1px solid #bbb;padding:2px 6px;vertical-align:top}img{max-width:100%}</style>'

function xml(text) {
	return new DOMParser().parseFromString(text, 'application/xml')
}

function children(node, ns, name) {
	return [...(node?.children ?? [])].filter((child) => child.namespaceURI === ns && child.localName === name)
}

function child(node, ns, name) {
	return children(node, ns, name)[0] ?? null
}

function all(node, ns, name) {
	return node ? [...node.getElementsByTagNameNS(ns, name)] : []
}

async function dataUrl(zip, path) {
	const file = zip.file(path)
	const type = IMAGE_TYPES[(/\.([^.]+)$/.exec(path)?.[1] ?? '').toLowerCase()]
	if (!file || !type) {
		return null
	}
	return 'data:' + type + ';base64,' + await file.async('base64')
}

function resolvePath(base, target) {
	const parts = base.split('/').slice(0, -1)
	for (const part of target.split('/')) {
		if (part === '..') {
			parts.pop()
		} else if (part !== '.') {
			parts.push(part)
		}
	}
	return parts.join('/')
}

function finish(body) {
	const holder = document.implementation.createHTMLDocument('').createElement('div')
	holder.innerHTML = body
	disarm(holder)
	return page(STYLE, holder.innerHTML)
}

// ----- PowerPoint (pptx) -----

async function relationships(zip, part) {
	const path = part.replace(/([^/]+)$/, '_rels/$1.rels')
	const file = zip.file(path)
	const map = {}
	if (file) {
		for (const rel of all(xml(await file.async('string')), NS.rel, 'Relationship')) {
			map[rel.getAttribute('Id')] = { target: resolvePath(part, rel.getAttribute('Target')), type: rel.getAttribute('Type') }
		}
	}
	return map
}

function placeholderKey(shape) {
	const ph = all(shape, NS.p, 'ph')[0]
	return ph ? { type: ph.getAttribute('type') || 'body', idx: ph.getAttribute('idx') } : null
}

function transform(shape) {
	const xfrm = all(shape, NS.a, 'xfrm')[0]
	const off = child(xfrm, NS.a, 'off')
	const ext = child(xfrm, NS.a, 'ext')
	return off && ext ? { x: +off.getAttribute('x'), y: +off.getAttribute('y'), w: +ext.getAttribute('cx'), h: +ext.getAttribute('cy') } : null
}

/** A shape's place: its own, else its placeholder's in the layout, else in the master. */
function placeOf(shape, inherited) {
	const own = transform(shape)
	if (own) {
		return own
	}
	const key = placeholderKey(shape)
	for (const source of inherited) {
		for (const other of all(source, NS.p, 'sp')) {
			const theirs = placeholderKey(other)
			if (key && theirs && ((key.idx && key.idx === theirs.idx) || key.type === theirs.type)) {
				const found = transform(other)
				if (found) {
					return found
				}
			}
		}
	}
	return null
}

function color(node) {
	const value = all(node, NS.a, 'srgbClr')[0]?.getAttribute('val')
	return value ? '#' + value : null
}

function drawingParagraphs(body, scale) {
	return children(body, NS.a, 'p').map((paragraph) => {
		const align = { ctr: 'center', r: 'right', just: 'justify' }[child(paragraph, NS.a, 'pPr')?.getAttribute('algn')] ?? 'left'
		const runs = [...paragraph.children].map((run) => {
			if (run.localName === 'br') {
				return '<br>'
			}
			if (run.localName !== 'r' && run.localName !== 'fld') {
				return ''
			}
			const props = child(run, NS.a, 'rPr')
			const size = props?.getAttribute('sz') ? (+props.getAttribute('sz') / 100) * scale * (96 / 72) : 18 * scale * (96 / 72)
			const css = ['font-size:' + cqw(size)]
			if (props?.getAttribute('b') === '1') {
				css.push('font-weight:bold')
			}
			if (props?.getAttribute('i') === '1') {
				css.push('font-style:italic')
			}
			const fill = child(props, NS.a, 'solidFill')
			if (fill && color(fill)) {
				css.push('color:' + color(fill))
			}
			return '<span style="' + css.join(';') + '">' + escapeHtml(child(run, NS.a, 't')?.textContent ?? '') + '</span>'
		}).join('')
		return '<p style="text-align:' + align + '">' + (runs || '&nbsp;') + '</p>'
	}).join('')
}

/** A PowerPoint presentation (pptx) as a page: every slide at its size. */
export async function pptxPage(data) {
	const zip = await JSZip.loadAsync(data)
	const presentation = xml(await zip.file('ppt/presentation.xml').async('string'))
	const size = all(presentation, NS.p, 'sldSz')[0]
	const width = +(size?.getAttribute('cx') ?? 12192000)
	const height = +(size?.getAttribute('cy') ?? 6858000)
	const scale = SLIDE_WIDTH / (width / 9525)
	const rels = await relationships(zip, 'ppt/presentation.xml')
	const slides = []
	for (const id of all(presentation, NS.p, 'sldId')) {
		const part = rels[id.getAttributeNS(NS.r, 'id')]?.target
		if (!part || !zip.file(part)) {
			continue
		}
		const slide = xml(await zip.file(part).async('string'))
		const slideRels = await relationships(zip, part)
		const inherited = []
		const layoutPart = Object.values(slideRels).find((rel) => rel.type.endsWith('/slideLayout'))?.target
		if (layoutPart && zip.file(layoutPart)) {
			inherited.push(xml(await zip.file(layoutPart).async('string')))
			const masterPart = Object.values(await relationships(zip, layoutPart)).find((rel) => rel.type.endsWith('/slideMaster'))?.target
			if (masterPart && zip.file(masterPart)) {
				inherited.push(xml(await zip.file(masterPart).async('string')))
			}
		}
		const boxes = []
		const tree = all(slide, NS.p, 'spTree')[0]
		for (const shape of tree ? [...tree.children] : []) {
			const place = placeOf(shape, inherited)
			if (!place) {
				continue
			}
			const position = 'left:' + percent(place.x, width) + ';top:' + percent(place.y, height) + ';width:' + percent(place.w, width) + ';height:' + percent(place.h, height)
			if (shape.localName === 'sp') {
				const fill = child(child(shape, NS.p, 'spPr'), NS.a, 'solidFill')
				const background = fill && color(fill) ? ';background:' + color(fill) : ''
				const body = child(shape, NS.p, 'txBody')
				boxes.push('<div class="box" style="' + position + background + ';padding:' + cqw(4 * scale) + '">' + (body ? drawingParagraphs(body, scale) : '') + '</div>')
			} else if (shape.localName === 'pic') {
				const embed = all(shape, NS.a, 'blip')[0]?.getAttributeNS(NS.r, 'embed')
				const url = embed && slideRels[embed] ? await dataUrl(zip, slideRels[embed].target) : null
				if (url) {
					boxes.push('<img class="box" style="' + position + ';object-fit:contain" src="' + url + '" alt="">')
				}
			} else if (shape.localName === 'graphicFrame') {
				const table = all(shape, NS.a, 'tbl')[0]
				if (table) {
					const rows = children(table, NS.a, 'tr').map((row) => '<tr>' + children(row, NS.a, 'tc')
						.map((cell) => '<td>' + drawingParagraphs(child(cell, NS.a, 'txBody'), scale) + '</td>').join('') + '</tr>').join('')
					boxes.push('<div class="box" style="' + position + '"><table style="width:100%">' + rows + '</table></div>')
				}
			}
		}
		slides.push('<div class="slide" style="aspect-ratio:' + width + '/' + height + '">' + boxes.join('') + '</div>')
	}
	return finish(slides.join(''))
}

// ----- OpenDocument (odt, odp) -----

const UNITS = { cm: 96 / 2.54, mm: 96 / 25.4, in: 96, pt: 96 / 72, pc: 16, px: 1 }

function length(value) {
	const match = /^(-?[\d.]+)([a-z]+)?$/.exec(value ?? '')
	return match ? +match[1] * (UNITS[match[2] ?? 'px'] ?? 1) : 0
}

/** The text styles of documents (automatic and common): name -> CSS; size(pixels) gives a font size. */
function textStyles(documents, size = (pixels) => pixels.toFixed(1) + 'px') {
	const css = {}
	for (const document of documents) {
		for (const style of all(document, NS.style, 'style')) {
			const props = child(style, NS.style, 'text-properties')
			const parts = []
			if (props) {
				const weight = props.getAttributeNS(NS.fo, 'font-weight')
				if (weight === 'bold' || +weight >= 600) {
					parts.push('font-weight:bold')
				}
				if (props.getAttributeNS(NS.fo, 'font-style') === 'italic') {
					parts.push('font-style:italic')
				}
				const fontSize = props.getAttributeNS(NS.fo, 'font-size')
				if (fontSize && !fontSize.endsWith('%')) {
					parts.push('font-size:' + size(length(fontSize)))
				}
				const colour = props.getAttributeNS(NS.fo, 'color')
				if (colour) {
					parts.push('color:' + colour)
				}
				if ((props.getAttributeNS(NS.style, 'text-underline-style') || 'none') !== 'none') {
					parts.push('text-decoration:underline')
				}
			}
			const paragraph = child(style, NS.style, 'paragraph-properties')
			const align = paragraph?.getAttributeNS(NS.fo, 'text-align')
			if (align) {
				parts.push('text-align:' + ({ start: 'left', end: 'right' }[align] ?? align))
			}
			css[style.getAttributeNS(NS.style, 'name')] = parts.join(';')
		}
	}
	return css
}

/** ODF text (paragraphs, spans, lists, tables, frames) as HTML. */
async function odfText(node, zip, css, scale = 1) {
	const out = []
	for (const item of node.childNodes) {
		if (item.nodeType === 3) {
			out.push(escapeHtml(item.textContent))
			continue
		}
		if (item.nodeType !== 1) {
			continue
		}
		const style = css[item.getAttributeNS(NS.text, 'style-name')] ?? ''
		const attr = style ? ' style="' + style + '"' : ''
		const inner = () => odfText(item, zip, css, scale)
		switch (item.namespaceURI === NS.text || item.namespaceURI === NS.table || item.namespaceURI === NS.draw ? item.localName : '') {
		case 'h': {
			const level = Math.min(6, Math.max(1, +(item.getAttributeNS(NS.text, 'outline-level') || 1)))
			out.push('<h' + level + attr + '>' + await inner() + '</h' + level + '>')
			break
		}
		case 'p':
			out.push('<p' + attr + '>' + (await inner() || '&nbsp;') + '</p>')
			break
		case 'span':
		case 'a':
			out.push('<span' + attr + '>' + await inner() + '</span>')
			break
		case 's':
			out.push('&nbsp;'.repeat(+(item.getAttributeNS(NS.text, 'c') || 1)))
			break
		case 'tab':
			out.push('&emsp;')
			break
		case 'line-break':
			out.push('<br>')
			break
		case 'list':
			out.push('<ul>' + await inner() + '</ul>')
			break
		case 'list-item':
		case 'list-header':
			out.push('<li>' + await inner() + '</li>')
			break
		case 'table':
			out.push('<table>' + await inner() + '</table>')
			break
		case 'table-row':
			out.push('<tr>' + await inner() + '</tr>')
			break
		case 'table-cell':
			out.push('<td>' + await inner() + '</td>')
			break
		case 'table-header-rows':
		case 'table-rows':
		case 'section':
		case 'text-box':
			out.push(await inner())
			break
		case 'frame':
			out.push(await inner())
			break
		case 'image': {
			const url = await dataUrl(zip, item.getAttributeNS(NS.xlink, 'href') ?? '')
			if (url) {
				out.push('<img src="' + url + '" alt="">')
			}
			break
		}
		default:
			// Unknown elements: their text, if any (fields, bookmarks, shapes with text).
			if (item.namespaceURI === NS.text || item.namespaceURI === NS.draw) {
				out.push(await inner())
			}
		}
	}
	return out.join('')
}

async function odfParts(data) {
	const zip = await JSZip.loadAsync(data)
	const content = xml(await zip.file('content.xml').async('string'))
	const styles = zip.file('styles.xml') ? xml(await zip.file('styles.xml').async('string')) : null
	return { zip, content, styles, css: textStyles([styles, content]) }
}

/** An OpenDocument text (odt) as a page. */
export async function odtPage(data) {
	const { zip, content, css } = await odfParts(data)
	const text = all(content, NS.office, 'text')[0]
	return finish('<div class="doc">' + (text ? await odfText(text, zip, css) : '') + '</div>')
}

/** An OpenDocument presentation (odp) as a page: every slide at its size. */
export async function odpPage(data) {
	const { zip, content, styles } = await odfParts(data)
	// The page size: the first master page's page layout (styles.xml).
	let width = length('28cm')
	let height = length('15.75cm')
	const master = all(styles, NS.style, 'master-page')[0]
	const layoutName = master?.getAttributeNS(NS.style, 'page-layout-name')
	const layout = all(styles, NS.style, 'page-layout').find((item) => item.getAttributeNS(NS.style, 'name') === layoutName)
	const props = child(layout, NS.style, 'page-layout-properties')
	if (props) {
		width = length(props.getAttributeNS(NS.fo, 'page-width')) || width
		height = length(props.getAttributeNS(NS.fo, 'page-height')) || height
	}
	const scale = SLIDE_WIDTH / width
	// On a slide, sizes go with the slide's width.
	const slideCss = textStyles([styles, content], (pixels) => cqw(pixels * scale))
	const slides = []
	for (const slide of all(content, NS.draw, 'page')) {
		const boxes = []
		for (const shape of slide.children) {
			const x = shape.getAttributeNS(NS.svg, 'x')
			const y = shape.getAttributeNS(NS.svg, 'y')
			if (x === null || y === null) {
				continue
			}
			const position = 'left:' + percent(length(x), width) + ';top:' + percent(length(y), height)
				+ ';width:' + percent(length(shape.getAttributeNS(NS.svg, 'width')), width) + ';height:' + percent(length(shape.getAttributeNS(NS.svg, 'height')), height)
			boxes.push('<div class="box" style="' + position + ';font-size:' + cqw(18 * scale * 96 / 72) + '">' + await odfText(shape, zip, slideCss, scale) + '</div>')
		}
		slides.push('<div class="slide" style="aspect-ratio:' + width.toFixed(1) + '/' + height.toFixed(1) + '">' + boxes.join('') + '</div>')
	}
	return finish(slides.join(''))
}
