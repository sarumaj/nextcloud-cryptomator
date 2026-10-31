/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Previews of presentations and OpenDocument text, made in the browser from the
 * files' XML (JSZip opens them): PowerPoint (pptx) and Impress (odp) slides at
 * their size with their backgrounds, the shapes of their master (and layout), the
 * theme's colours and fonts, fills and outlines, text boxes, pictures and simple
 * tables, Writer (odt) text
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
	presentation: 'urn:oasis:names:tc:opendocument:xmlns:presentation:1.0',
	loext: 'urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0',
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
	+ '.box{position:absolute;overflow:hidden;box-sizing:border-box}.box p{margin:0}.slide .box img{width:100%;height:100%;object-fit:fill}'
	+ '.slide table{width:100%}.slide ul{margin:0;padding-left:1.2em}'
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
//
// A slide draws on its layout and the layout on its master: the background is the
// first of theirs that has one, the master's and the layout's own shapes (not their
// placeholders) lie under the slide's, and a placeholder takes its place, its text's
// look and its anchoring from theirs. Colours are often the theme's (theme1.xml),
// by a name the master maps (tx1 -> dk1) and varied (lumMod, tint, …), and fills,
// lines and backgrounds can name the theme's styles (fillRef, lnRef, bgRef).

const COLOR_TAGS = new Set(['srgbClr', 'schemeClr', 'sysClr', 'scrgbClr', 'prstClr', 'hslClr'])
const FILL_TAGS = new Set(['noFill', 'solidFill', 'gradFill', 'blipFill', 'pattFill', 'grpFill'])
const EMU_PER_PIXEL = 9525
// Characters of symbol fonts that bullets use, as the character they show.
const SYMBOL_BULLETS = { '\uf0a7': '▪', '\uf0b7': '•', '\uf0d8': '➢', '\uf0fc': '✓', '\uf076': '❖', '\uf0a8': '◦', 'q': '▪', 'l': '●', 'n': '■', 'Ø': '➢', 'ü': '✓' }

async function relationships(zip, part) {
	const path = part.replace(/([^/]+)$/, '_rels/$1.rels')
	const file = zip.file(path)
	const map = {}
	if (file) {
		for (const rel of all(xml(await file.async('string')), NS.rel, 'Relationship')) {
			if (rel.getAttribute('TargetMode') !== 'External') {
				map[rel.getAttribute('Id')] = { target: resolvePath(part, rel.getAttribute('Target')), type: rel.getAttribute('Type') }
			}
		}
	}
	return map
}

/** A part of the package: {path, doc, rels}, or null. */
async function openPart(zip, path) {
	if (!path || !zip.file(path)) {
		return null
	}
	return { path, doc: xml(await zip.file(path).async('string')), rels: await relationships(zip, path) }
}

function relatedPath(part, type) {
	return Object.values(part?.rels ?? {}).find((rel) => rel.type.endsWith('/' + type))?.target
}

/** The theme's colours (dk1 -> 'RRGGBB'), fonts and the styles fills, lines and backgrounds name. */
function readTheme(doc) {
	const colors = {}
	for (const entry of [...(all(doc, NS.a, 'clrScheme')[0]?.children ?? [])]) {
		const value = child(entry, NS.a, 'srgbClr')?.getAttribute('val') ?? child(entry, NS.a, 'sysClr')?.getAttribute('lastClr')
		if (value) {
			colors[entry.localName] = value
		}
	}
	const typeface = (kind) => child(all(doc, NS.a, kind)[0], NS.a, 'latin')?.getAttribute('typeface') || null
	const list = (name) => [...(all(doc, NS.a, name)[0]?.children ?? [])]
	return { colors, major: typeface('majorFont'), minor: typeface('minorFont'), fills: list('fillStyleLst'), lines: list('lnStyleLst'), backgrounds: list('bgFillStyleLst') }
}

/** The master's mapping of colour names (tx1 -> dk1), as a layout or slide may override it. */
function colorMap(node, inherited) {
	const map = { ...inherited }
	for (const attribute of [...(node?.attributes ?? [])]) {
		map[attribute.name] = attribute.value
	}
	return map
}

function hexToRgb(hex) {
	const value = parseInt(hex.padStart(6, '0').slice(-6), 16)
	return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function toLinear(channel) {
	const value = channel / 255
	return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

function fromLinear(value) {
	const clamped = Math.max(0, Math.min(1, value))
	return Math.round(255 * (clamped <= 0.0031308 ? clamped * 12.92 : 1.055 * clamped ** (1 / 2.4) - 0.055))
}

function rgbToHsl([r, g, b]) {
	const [red, green, blue] = [r / 255, g / 255, b / 255]
	const max = Math.max(red, green, blue)
	const min = Math.min(red, green, blue)
	const light = (max + min) / 2
	if (max === min) {
		return [0, 0, light]
	}
	const delta = max - min
	const saturation = light > 0.5 ? delta / (2 - max - min) : delta / (max + min)
	const hue = max === red ? (green - blue) / delta + (green < blue ? 6 : 0) : max === green ? (blue - red) / delta + 2 : (red - green) / delta + 4
	return [hue / 6, saturation, light]
}

function hslToRgb([hue, saturation, light]) {
	if (saturation === 0) {
		return [light, light, light].map((value) => Math.round(value * 255))
	}
	const q = light < 0.5 ? light * (1 + saturation) : light + saturation - light * saturation
	const p = 2 * light - q
	const channel = (t) => {
		const x = t < 0 ? t + 1 : t > 1 ? t - 1 : t
		return x < 1 / 6 ? p + (q - p) * 6 * x : x < 1 / 2 ? q : x < 2 / 3 ? p + (q - p) * (2 / 3 - x) * 6 : p
	}
	return [channel(hue + 1 / 3), channel(hue), channel(hue - 1 / 3)].map((value) => Math.round(value * 255))
}

/**
 * A colour element (srgbClr, schemeClr, …) with its variations as CSS; phClr (in the
 * theme's styles) is the colour the reference gives. Null where it names nothing known.
 */
function colorCss(element, context, phClr) {
	if (!element) {
		return null
	}
	let rgb = null
	let alpha = 1
	switch (element.localName) {
	case 'srgbClr':
		rgb = hexToRgb(element.getAttribute('val') ?? '000000')
		break
	case 'sysClr':
		rgb = hexToRgb(element.getAttribute('lastClr') ?? (element.getAttribute('val') === 'window' ? 'FFFFFF' : '000000'))
		break
	case 'scrgbClr':
		rgb = ['r', 'g', 'b'].map((name) => Math.round(Math.min(1, +element.getAttribute(name) / 100000) ** (1 / 2.2) * 255))
		break
	case 'hslClr':
		rgb = hslToRgb([+element.getAttribute('hue') / 21600000, +element.getAttribute('sat') / 100000, +element.getAttribute('lum') / 100000])
		break
	case 'prstClr': {
		const named = { black: '000000', white: 'FFFFFF', red: 'FF0000', green: '008000', blue: '0000FF', yellow: 'FFFF00', gray: '808080', grey: '808080' }[element.getAttribute('val')]
		rgb = named ? hexToRgb(named) : null
		break
	}
	case 'schemeClr': {
		const name = element.getAttribute('val')
		if (name === 'phClr') {
			if (!phClr) {
				return null
			}
			rgb = phClr.rgb
			alpha = phClr.alpha
		} else {
			const hex = context.theme.colors[context.map[name] ?? name]
			rgb = hex ? hexToRgb(hex) : null
		}
		break
	}
	default:
	}
	if (!rgb) {
		return null
	}
	for (const change of element.children) {
		const value = +change.getAttribute('val') / 100000
		switch (change.localName) {
		case 'lumMod':
		case 'lumOff':
		case 'satMod': {
			const hsl = rgbToHsl(rgb)
			if (change.localName === 'lumMod') {
				hsl[2] = Math.min(1, hsl[2] * value)
			} else if (change.localName === 'lumOff') {
				hsl[2] = Math.max(0, Math.min(1, hsl[2] + value))
			} else {
				hsl[1] = Math.min(1, hsl[1] * value)
			}
			rgb = hslToRgb(hsl)
			break
		}
		// Tint and shade work in linear light (as PowerPoint draws them): 75 % of black is a mid grey.
		case 'tint':
			rgb = rgb.map((channel) => fromLinear(1 - (1 - toLinear(channel)) * value))
			break
		case 'shade':
			rgb = rgb.map((channel) => fromLinear(toLinear(channel) * value))
			break
		case 'alpha':
			alpha = value
			break
		default:
		}
	}
	return { rgb, alpha, toString: () => alpha < 1 ? 'rgba(' + rgb.join(',') + ',' + alpha.toFixed(3) + ')' : 'rgb(' + rgb.join(',') + ')' }
}

/** The colour inside an element (a solidFill, a reference, a text's fill), or null. */
function colorIn(node, context, phClr) {
	return colorCss([...(node?.children ?? [])].find((item) => COLOR_TAGS.has(item.localName)), context, phClr)
}

function fillElement(node) {
	return [...(node?.children ?? [])].find((item) => FILL_TAGS.has(item.localName)) ?? null
}

/**
 * A fill element as a CSS background ('' for none), or null where it says nothing;
 * part: whose relationships a picture is found by.
 */
async function backgroundCss(fill, context, part, phClr) {
	switch (fill?.localName) {
	case 'noFill':
		return 'transparent'
	case 'solidFill':
		return String(colorIn(fill, context, phClr) ?? '') || null
	case 'gradFill': {
		const stops = all(fill, NS.a, 'gs').map((stop) => ({ at: +stop.getAttribute('pos') / 1000, color: colorIn(stop, context, phClr) }))
			.filter((stop) => stop.color).sort((a, b) => a.at - b.at).map((stop) => stop.color + ' ' + stop.at.toFixed(1) + '%')
		if (stops.length === 0) {
			return null
		}
		if (stops.length === 1) {
			return stops[0].split(' ')[0]
		}
		if (child(fill, NS.a, 'path')) {
			return 'radial-gradient(circle,' + stops.join(',') + ')'
		}
		const angle = +(child(fill, NS.a, 'lin')?.getAttribute('ang') ?? 0) / 60000
		return 'linear-gradient(' + (angle + 90).toFixed(1) + 'deg,' + stops.join(',') + ')'
	}
	case 'blipFill': {
		const embed = child(fill, NS.a, 'blip')?.getAttributeNS(NS.r, 'embed')
		const url = embed && part?.rels[embed] ? await dataUrl(context.zip, part.rels[embed].target) : null
		if (!url) {
			return null
		}
		return child(fill, NS.a, 'tile') ? 'url(' + url + ') repeat' : 'url(' + url + ') center/100% 100% no-repeat'
	}
	case 'pattFill':
		return String(colorIn(child(fill, NS.a, 'bgClr'), context, phClr) ?? '') || null
	default:
		return null
	}
}

/** A style reference's entry of the theme (fillRef, lnRef, bgRef) with the colour it gives. */
function themeStyle(reference, context, kind) {
	const index = +(reference?.getAttribute('idx') ?? 0)
	const list = kind === 'line' ? context.theme.lines : index >= 1001 ? context.theme.backgrounds : context.theme.fills
	const entry = list[(index >= 1001 ? index - 1001 : index - 1)] ?? null
	return index > 0 && entry ? { entry, phClr: colorIn(reference, context) } : null
}

/** The slide's background: the slide's own, else its layout's, else its master's. */
async function slideBackground(parts, context) {
	for (const part of parts) {
		const background = all(part.doc, NS.p, 'bg')[0]
		if (!background) {
			continue
		}
		const properties = child(background, NS.p, 'bgPr')
		if (properties) {
			const css = await backgroundCss(fillElement(properties), context, part)
			if (css) {
				return css
			}
		}
		const style = themeStyle(child(background, NS.p, 'bgRef'), context, 'fill')
		if (style) {
			const css = await backgroundCss(style.entry, context, part, style.phClr)
			if (css) {
				return css
			}
		}
	}
	return '#fff'
}

function placeholderKey(shape) {
	const ph = all(shape, NS.p, 'ph')[0]
	return ph ? { type: ph.getAttribute('type') || 'body', idx: ph.getAttribute('idx') } : null
}

/** The shapes of the layout and master that a placeholder stands in for: by index, else by type. */
function placeholderSources(shape, inherited) {
	const key = placeholderKey(shape)
	if (!key) {
		return []
	}
	const found = []
	for (const part of inherited) {
		const candidates = all(part.doc, NS.p, 'sp').filter((other) => placeholderKey(other))
		const match = candidates.find((other) => key.idx && placeholderKey(other).idx === key.idx)
			?? candidates.find((other) => {
				const theirs = placeholderKey(other).type
				return theirs === key.type || (key.type === 'ctrTitle' && theirs === 'title') || (key.type === 'subTitle' && theirs === 'body')
			})
		if (match) {
			found.push(match)
		}
	}
	return found
}

function transform(shape) {
	const properties = child(shape, NS.p, 'spPr') ?? child(shape, NS.p, 'grpSpPr')
	const xfrm = child(properties, NS.a, 'xfrm') ?? child(shape, NS.p, 'xfrm')
	const off = child(xfrm, NS.a, 'off')
	const ext = child(xfrm, NS.a, 'ext')
	if (!off || !ext) {
		return null
	}
	const place = { x: +off.getAttribute('x'), y: +off.getAttribute('y'), w: +ext.getAttribute('cx'), h: +ext.getAttribute('cy'), rotation: +(xfrm.getAttribute('rot') ?? 0) / 60000 }
	const childOff = child(xfrm, NS.a, 'chOff')
	const childExt = child(xfrm, NS.a, 'chExt')
	if (childOff && childExt) {
		place.child = { x: +childOff.getAttribute('x'), y: +childOff.getAttribute('y'), w: +childExt.getAttribute('cx') || 1, h: +childExt.getAttribute('cy') || 1 }
	}
	return place
}

/** The level's properties (a:lvl1pPr …) in a list style, or null. */
function levelProperties(listStyle, level) {
	return child(listStyle, NS.a, 'lvl' + (level + 1) + 'pPr')
}

/**
 * Where a text's look comes from, nearest first, for a paragraph level: the
 * shape's list style, its placeholder's in the layout and master, the master's text
 * styles for its kind, the presentation's default.
 */
function textChain(shape, sources, context, level) {
	const kind = placeholderKey(shape)?.type
	const masterStyle = kind === 'title' || kind === 'ctrTitle' ? 'titleStyle' : kind && kind !== 'dt' && kind !== 'ftr' && kind !== 'sldNum' ? 'bodyStyle' : 'otherStyle'
	return [
		levelProperties(child(child(shape, NS.p, 'txBody'), NS.a, 'lstStyle'), level),
		...sources.map((source) => levelProperties(child(child(source, NS.p, 'txBody'), NS.a, 'lstStyle'), level)),
		levelProperties(child(all(context.master.doc, NS.p, 'txStyles')[0], NS.p, masterStyle), level),
		levelProperties(context.defaultText, level),
	].filter(Boolean)
}

// Free fonts of the same measures, where the office font is not installed (Linux).
const FONT_FALLBACKS = { Calibri: 'Carlito', Cambria: 'Caladea', Arial: 'Liberation Sans', Helvetica: 'Liberation Sans',
	'Times New Roman': 'Liberation Serif', 'Courier New': 'Liberation Mono', 'Calibri Light': 'Carlito' }

/** A font name and its fallback for a style attribute, with a comma after; '' for none. */
function fontNames(name) {
	const clean = name?.replace(/[^\p{L}\p{N} ._-]/gu, '')
	if (!clean) {
		return ''
	}
	return "'" + clean + "'," + (FONT_FALLBACKS[clean] ? "'" + FONT_FALLBACKS[clean] + "'," : '')
}

/** A typeface (or the theme's, +mj-lt and +mn-lt) for a style attribute, with a comma after; '' for none. */
function fontFamily(typeface, context) {
	return fontNames(typeface === '+mj-lt' ? context.theme.major : typeface === '+mn-lt' ? context.theme.minor : typeface)
}

/**
 * A text body's paragraphs as HTML, each run's look from its own properties, else
 * from chain(level); a colour of the shape's (its style's fontRef, a table's) goes
 * before the chain's.
 */
function drawingParagraphs(body, context, chainOf, { color: shapeColor = null } = {}) {
	return children(body, NS.a, 'p').map((paragraph) => {
		const own = child(paragraph, NS.a, 'pPr')
		const level = +(own?.getAttribute('lvl') ?? 0)
		const chain = [own, ...chainOf(level)].filter(Boolean)
		const first = (read) => {
			for (const properties of chain) {
				const value = read(properties)
				if (value !== null && value !== undefined) {
					return value
				}
			}
			return null
		}
		const fromDefaults = (read) => first((properties) => read(child(properties, NS.a, 'defRPr')))
		const align = { ctr: 'center', r: 'right', just: 'justify' }[first((properties) => properties.getAttribute('algn'))] ?? 'left'
		const css = ['text-align:' + align, 'margin-left:' + cqw(+(first((properties) => properties.getAttribute('marL')) ?? 0) / EMU_PER_PIXEL * context.scale)]
		const bullet = first((properties) => {
			if (child(properties, NS.a, 'buNone')) {
				return ''
			}
			const character = child(properties, NS.a, 'buChar')?.getAttribute('char')
			if (character) {
				return SYMBOL_BULLETS[character] ?? character
			}
			return child(properties, NS.a, 'buAutoNum') ? '•' : null
		})
		let size = 0
		const runs = [...paragraph.children].map((run) => {
			if (run.localName === 'br') {
				return '<br>'
			}
			if (run.localName !== 'r' && run.localName !== 'fld') {
				return ''
			}
			const props = child(run, NS.a, 'rPr')
			const pick = (read) => (props && read(props) !== null && read(props) !== undefined ? read(props) : fromDefaults(read))
			const points = +(pick((item) => item?.getAttribute('sz')) ?? 1800) / 100
			size = Math.max(size, points)
			const style = ['font-size:' + cqw(points * (96 / 72) * context.scale)]
			if (pick((item) => item?.getAttribute('b')) === '1') {
				style.push('font-weight:bold')
			}
			if (pick((item) => item?.getAttribute('i')) === '1') {
				style.push('font-style:italic')
			}
			if ((pick((item) => item?.getAttribute('u')) ?? 'none') !== 'none') {
				style.push('text-decoration:underline')
			}
			const colorOf = (item) => (child(item, NS.a, 'solidFill') ? colorIn(child(item, NS.a, 'solidFill'), context) : null)
			const color = (props && colorOf(props)) ?? (shapeColor ? null : fromDefaults(colorOf))
			if (color) {
				style.push('color:' + color)
			}
			const typeface = pick((item) => child(item, NS.a, 'latin')?.getAttribute('typeface') ?? null)
			if (typeface) {
				style.push('font-family:' + fontFamily(typeface, context) + 'system-ui,sans-serif')
			}
			return '<span style="' + style.join(';') + '">' + escapeHtml(child(run, NS.a, 't')?.textContent ?? '') + '</span>'
		}).join('')
		const mark = runs && bullet ? '<span style="display:inline-block;width:1.2em;margin-left:-1.2em">' + escapeHtml(bullet) + '</span>' : ''
		if (mark) {
			css.push('padding-left:1.2em')
		}
		return '<p style="' + css.join(';') + '">' + mark + (runs || '<span style="font-size:' + cqw(+(fromDefaults((item) => item?.getAttribute('sz')) ?? 1800) / 100 * (96 / 72) * context.scale) + '">&nbsp;</span>') + '</p>'
	}).join('')
}

// PowerPoint's default table style (Medium Style 2 - Accent 1): a table names its
// style by this ID and the file need not describe it.
const DEFAULT_TABLE_STYLE = '{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}'

/** The theme's accent 1, lightened (tint) as the default table style has it, as CSS. */
function accentCss(context, tint) {
	const hex = context.theme.colors.accent1
	if (!hex) {
		return null
	}
	const rgb = hexToRgb(hex).map((channel) => Math.round(tint === 1 ? channel : 255 - (255 - channel) * tint))
	return 'rgb(' + rgb.join(',') + ')'
}

/** A table: its cells' own fills and text, else the default style's header row and bands. */
function tableHtml(table, context) {
	const settings = child(table, NS.a, 'tblPr')
	const styleId = child(settings, NS.a, 'tableStyleId')?.textContent?.trim()
	const styled = (!styleId || styleId === DEFAULT_TABLE_STYLE) && context.theme.colors.accent1
	const header = settings?.getAttribute('firstRow') === '1'
	const banded = settings?.getAttribute('bandRow') === '1'
	const rows = children(table, NS.a, 'tr').map((row, index) => {
		const first = header && index === 0
		const band = banded && (header ? index - 1 : index) % 2 === 0
		const cells = children(row, NS.a, 'tc').map((cell) => {
			const fill = fillElement(child(cell, NS.a, 'tcPr'))
			const own = fill?.localName === 'solidFill' ? colorIn(fill, context) : null
			const background = own ?? (styled ? (first ? accentCss(context, 1) : accentCss(context, band ? 0.4 : 0.2)) : null)
			const style = []
			if (background) {
				style.push('background:' + background)
			}
			if (styled) {
				style.push('border:1px solid #fff', 'color:' + (first ? '#fff' : '#000'))
			}
			if (styled && first) {
				style.push('font-weight:bold')
			}
			const text = drawingParagraphs(child(cell, NS.a, 'txBody'), context, (level) => [levelProperties(context.defaultText, level)].filter(Boolean), { color: styled })
			return '<td' + (style.length ? ' style="' + style.join(';') + '"' : '') + '>' + text + '</td>'
		}).join('')
		return '<tr>' + cells + '</tr>'
	}).join('')
	return '<table style="width:100%;height:100%">' + rows + '</table>'
}

/** The outline of a shape (its a:ln, what it leaves out from its style's lnRef) as a CSS border, or ''. */
function borderCss(shape, context) {
	const own = child(child(shape, NS.p, 'spPr'), NS.a, 'ln')
	const style = themeStyle(child(child(shape, NS.p, 'style'), NS.a, 'lnRef'), context, 'line')
	const fill = fillElement(own) ?? fillElement(style?.entry)
	if (!fill || fill.localName !== 'solidFill') {
		return ''
	}
	const color = colorIn(fill, context, fillElement(own) ? null : style?.phClr)
	const width = Math.max(1, +(own?.getAttribute('w') ?? style?.entry.getAttribute('w') ?? 9525) / EMU_PER_PIXEL * context.scale)
	const dash = child(own, NS.a, 'prstDash')?.getAttribute('val') ?? child(style?.entry, NS.a, 'prstDash')?.getAttribute('val')
	return color ? 'border:' + cqw(width) + ' ' + (dash && dash !== 'solid' ? 'dashed' : 'solid') + ' ' + color : ''
}

function shapeRadius(shape, place, context) {
	const geometry = child(child(shape, NS.p, 'spPr'), NS.a, 'prstGeom')?.getAttribute('prst')
	if (geometry === 'ellipse') {
		return ';border-radius:50%'
	}
	if (geometry === 'roundRect') {
		return ';border-radius:' + cqw(Math.min(place.w, place.h) / 6 / EMU_PER_PIXEL * context.scale)
	}
	return ''
}

/**
 * The shapes of a shape tree as positioned boxes. at(place) maps a place to the
 * slide's (groups have places of their own); placeholders are left out of a
 * layout's and master's (the slide fills them), and take from theirs on a slide.
 */
async function drawTree(tree, part, context, { inherited = [], placeholders = true, at = (place) => place } = {}) {
	const boxes = []
	for (const shape of tree ? [...tree.children] : []) {
		if (!['sp', 'pic', 'graphicFrame', 'grpSp', 'cxnSp'].includes(shape.localName)) {
			continue
		}
		const key = placeholderKey(shape)
		if ((key && !placeholders) || all(shape, NS.p, 'cNvPr')[0]?.getAttribute('hidden') === '1') {
			continue
		}
		const sources = key ? placeholderSources(shape, inherited) : []
		const ownPlace = transform(shape)
		const found = ownPlace ?? sources.map(transform).find(Boolean)
		if (!found) {
			continue
		}
		const place = at(found)
		const { width, height } = context
		let position = 'left:' + percent(place.x, width) + ';top:' + percent(place.y, height) + ';width:' + percent(place.w, width) + ';height:' + percent(place.h, height)
		if (place.rotation) {
			position += ';transform:rotate(' + place.rotation.toFixed(2) + 'deg)'
		}
		if (shape.localName === 'grpSp') {
			const inner = found.child
			const scaleX = inner ? place.w / inner.w : 1
			const scaleY = inner ? place.h / inner.h : 1
			boxes.push(...await drawTree(shape, part, context, {
				inherited, placeholders,
				at: (item) => ({ ...item, x: place.x + (item.x - (inner?.x ?? 0)) * scaleX, y: place.y + (item.y - (inner?.y ?? 0)) * scaleY, w: item.w * scaleX, h: item.h * scaleY }),
			}))
			continue
		}
		if (shape.localName === 'pic') {
			const fill = child(shape, NS.p, 'blipFill')
			const embed = child(fill, NS.a, 'blip')?.getAttributeNS(NS.r, 'embed')
			const url = embed && part.rels[embed] ? await dataUrl(context.zip, part.rels[embed].target) : null
			if (url) {
				boxes.push('<img class="box" style="' + position + ';object-fit:fill" src="' + url + '" alt="">')
			}
			continue
		}
		if (shape.localName === 'graphicFrame') {
			const table = all(shape, NS.a, 'tbl')[0]
			if (table) {
				boxes.push('<div class="box" style="' + position + '">' + tableHtml(table, context) + '</div>')
			}
			continue
		}
		// A shape or connector: its fill and outline (its own, else its style's), then its text.
		// A placeholder without a fill of its own has its layout's or master's.
		const filled = [shape, ...sources].find((item) => fillElement(child(item, NS.p, 'spPr')))
		let background = filled ? await backgroundCss(fillElement(child(filled, NS.p, 'spPr')), context, filled === shape ? part : null) : null
		if (!filled) {
			const style = themeStyle(child(child(shape, NS.p, 'style'), NS.a, 'fillRef'), context, 'fill')
			background = style ? await backgroundCss(style.entry, context, part, style.phClr) : null
		}
		const border = borderCss(shape, context)
		const css = [position, 'padding:0']
		if (background) {
			css.push('background:' + background)
		}
		if (shape.localName === 'cxnSp') {
			// A line: its outline along the top (a connector's box is the line's extent).
			if (border) {
				css.push(border.replace('border:', 'border-top:'), 'height:0')
			}
			boxes.push('<div class="box" style="' + css.join(';') + '"></div>')
			continue
		}
		if (border) {
			css.push(border)
		}
		const body = child(shape, NS.p, 'txBody')
		const bodyProperties = [child(body, NS.a, 'bodyPr'), ...sources.map((source) => child(child(source, NS.p, 'txBody'), NS.a, 'bodyPr'))].filter(Boolean)
		const setting = (name, fallback) => {
			for (const item of bodyProperties) {
				if (item.hasAttribute(name)) {
					return item.getAttribute(name)
				}
			}
			return fallback
		}
		const inset = (name, fallback) => cqw(+setting(name, fallback) / EMU_PER_PIXEL * context.scale)
		css.push('padding:' + [inset('tIns', 45720), inset('rIns', 91440), inset('bIns', 45720), inset('lIns', 91440)].join(' '))
		css.push('display:flex;flex-direction:column;justify-content:' + ({ ctr: 'center', b: 'flex-end' }[setting('anchor', 't')] ?? 'flex-start'))
		// The shape's style may give its text a colour and the theme's font (fontRef).
		const fontReference = child(child(shape, NS.p, 'style'), NS.a, 'fontRef')
		const fontColor = colorIn(fontReference, context)
		if (fontColor) {
			css.push('color:' + fontColor)
		}
		const themeFont = { major: '+mj-lt', minor: '+mn-lt' }[fontReference?.getAttribute('idx')]
		if (themeFont && fontFamily(themeFont, context)) {
			css.push('font-family:' + fontFamily(themeFont, context) + 'system-ui,sans-serif')
		}
		const text = body ? drawingParagraphs(body, context, (level) => textChain(shape, sources, context, level), { color: fontColor }) : ''
		boxes.push('<div class="box" style="' + css.join(';') + shapeRadius(shape, place, context) + '"><div>' + text + '</div></div>')
	}
	return boxes
}

/** A PowerPoint presentation (pptx) as a page: every slide at its size, with its layout's and master's look. */
export async function pptxPage(data) {
	const zip = await JSZip.loadAsync(data)
	const presentationPart = await openPart(zip, 'ppt/presentation.xml')
	const presentation = presentationPart.doc
	const size = all(presentation, NS.p, 'sldSz')[0]
	const width = +(size?.getAttribute('cx') ?? 12192000)
	const height = +(size?.getAttribute('cy') ?? 6858000)
	const scale = SLIDE_WIDTH / (width / EMU_PER_PIXEL)
	const defaultText = all(presentation, NS.p, 'defaultTextStyle')[0] ?? null
	const parts = new Map()
	const cached = async (path) => {
		if (!parts.has(path)) {
			parts.set(path, await openPart(zip, path))
		}
		return parts.get(path)
	}
	const slides = []
	for (const id of all(presentation, NS.p, 'sldId')) {
		const slide = await cached(presentationPart.rels[id.getAttributeNS(NS.r, 'id')]?.target)
		if (!slide) {
			continue
		}
		const layout = await cached(relatedPath(slide, 'slideLayout'))
		const master = await cached(relatedPath(layout, 'slideMaster'))
		const themePart = await cached(relatedPath(master, 'theme'))
		const theme = themePart ? readTheme(themePart.doc) : { colors: {}, fills: [], lines: [], backgrounds: [] }
		// The master maps the colour names; a layout or slide may map them anew.
		let map = colorMap(all(master?.doc, NS.p, 'clrMap')[0], {})
		for (const part of [layout, slide]) {
			const override = all(part?.doc, NS.a, 'overrideClrMapping')[0]
			if (override) {
				map = colorMap(override, map)
			}
		}
		const context = { zip, theme, map, width, height, scale, defaultText, master: master ?? { doc: null } }
		const inherited = [layout, master].filter(Boolean)
		const shown = (part) => all(part?.doc, NS.p, 'sld')[0]?.getAttribute('showMasterSp') !== '0' && all(part?.doc, NS.p, 'sldLayout')[0]?.getAttribute('showMasterSp') !== '0'
		const boxes = []
		if (master && shown(slide) && shown(layout)) {
			boxes.push(...await drawTree(all(master.doc, NS.p, 'spTree')[0], master, context, { placeholders: false }))
		}
		if (layout && shown(slide)) {
			boxes.push(...await drawTree(all(layout.doc, NS.p, 'spTree')[0], layout, context, { placeholders: false }))
		}
		boxes.push(...await drawTree(all(slide.doc, NS.p, 'spTree')[0], slide, context, { inherited }))
		const background = await slideBackground([slide, ...inherited], context)
		// Text without a colour of its own: the theme's for text (tx1, mapped).
		const text = theme.colors[map.tx1 ?? 'dk1']
		const font = fontFamily('+mn-lt', context)
		slides.push('<div class="slide" style="aspect-ratio:' + width + '/' + height + ';background:' + background
			+ (text ? ';color:#' + text : '') + (font ? ';font-family:' + font + 'system-ui,sans-serif' : '') + '">' + boxes.join('') + '</div>')
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
			if (style.getAttributeNS(NS.style, 'family') === 'table-cell') {
				// A cell's fill: Writer's background colour, Impress's fill (LibreOffice's own properties).
				const cell = child(style, NS.style, 'table-cell-properties')
				const graphic = child(style, NS.loext, 'graphic-properties')
				const fill = cell?.getAttributeNS(NS.fo, 'background-color') || (graphic?.getAttributeNS(NS.draw, 'fill') === 'solid' ? graphic.getAttributeNS(NS.draw, 'fill-color') : '')
				if (fill && fill !== 'transparent') {
					parts.push('background:' + fill)
				}
				const border = cell?.getAttributeNS(NS.fo, 'border') || paragraph?.getAttributeNS(NS.fo, 'border')
				if (border && border !== 'none') {
					parts.push('border:' + border)
				}
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
		case 'list-header': {
			// An item that only holds a deeper list shows no mark of its own.
			const own = [...item.children].some((part) => part.localName !== 'list')
			out.push((own ? '<li>' : '<li style="list-style:none">') + await inner() + '</li>')
			break
		}
		case 'table':
			out.push('<table>' + await inner() + '</table>')
			break
		case 'table-row': {
			// A cell's style: its own, else the row's default for its cells.
			const fallback = item.getAttributeNS(NS.table, 'default-cell-style-name')
			const cells = []
			for (const cell of item.children) {
				if (cell.namespaceURI !== NS.table || cell.localName !== 'table-cell') {
					continue
				}
				const cellStyle = css[cell.getAttributeNS(NS.table, 'style-name') || fallback] ?? ''
				const span = +(cell.getAttributeNS(NS.table, 'number-columns-spanned') || 1)
				cells.push('<td' + (span > 1 ? ' colspan="' + span + '"' : '') + (cellStyle ? ' style="' + cellStyle + '"' : '') + '>' + await odfText(cell, zip, css, scale) + '</td>')
			}
			out.push('<tr>' + cells.join('') + '</tr>')
			break
		}
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

/**
 * Styles of a family by name, as a document's shapes find them: its automatic
 * styles, then styles.xml's common ones (with their parents, and the family's default).
 */
function styleFinder(own, styles) {
	const named = (container, family) => {
		const map = new Map()
		for (const style of children(container, NS.style, 'style')) {
			if (style.getAttributeNS(NS.style, 'family') === family) {
				map.set(style.getAttributeNS(NS.style, 'name'), style)
			}
		}
		return map
	}
	const common = all(styles, NS.office, 'styles')[0]
	return (family, name) => {
		const chain = []
		let current = named(all(own, NS.office, 'automatic-styles')[0], family).get(name) ?? named(common, family).get(name)
		while (current && chain.length < 10) {
			chain.push(current)
			current = named(common, family).get(current.getAttributeNS(NS.style, 'parent-style-name'))
		}
		const fallback = children(common, NS.style, 'default-style').find((style) => style.getAttributeNS(NS.style, 'family') === family)
		return fallback ? [...chain, fallback] : chain
	}
}

/** An attribute of a style's properties element, the nearest in its chain that sets it. */
function styleValue(chain, properties, ns, name) {
	for (const style of chain) {
		const value = child(style, NS.style, properties)?.getAttributeNS(ns, name)
		if (value) {
			return value
		}
	}
	return null
}

/** The fill a style chain sets (draw:fill and what it names in styles.xml) as CSS, or null if none is set. */
async function odfFill(chain, properties, zip, styles) {
	const fill = styleValue(chain, properties, NS.draw, 'fill')
	const value = (name) => styleValue(chain, properties, NS.draw, name)
	switch (fill) {
	case 'none':
		return 'transparent'
	case 'solid':
		return value('fill-color') || null
	case 'gradient': {
		const gradient = all(styles, NS.draw, 'gradient').find((item) => item.getAttributeNS(NS.draw, 'name') === value('fill-gradient-name'))
		if (!gradient) {
			return value('fill-color') || null
		}
		const start = gradient.getAttributeNS(NS.draw, 'start-color') || '#ffffff'
		const end = gradient.getAttributeNS(NS.draw, 'end-color') || '#000000'
		const kind = gradient.getAttributeNS(NS.draw, 'style') || 'linear'
		// ODF's angle turns a top-to-bottom gradient counter-clockwise (tenths of a degree, or with a unit).
		const raw = gradient.getAttributeNS(NS.draw, 'angle') || '0'
		const degrees = /deg$/.test(raw) ? parseFloat(raw) : /rad$/.test(raw) ? parseFloat(raw) * 180 / Math.PI : parseFloat(raw) / 10
		if (kind === 'radial' || kind === 'ellipsoid' || kind === 'square' || kind === 'rectangular') {
			return 'radial-gradient(circle,' + end + ',' + start + ')'
		}
		const angle = (180 - degrees).toFixed(1) + 'deg'
		return kind === 'axial' ? 'linear-gradient(' + angle + ',' + start + ',' + end + ' 50%,' + start + ')' : 'linear-gradient(' + angle + ',' + start + ',' + end + ')'
	}
	case 'bitmap': {
		const image = all(styles, NS.draw, 'fill-image').find((item) => item.getAttributeNS(NS.draw, 'name') === value('fill-image-name'))
		const url = image ? await dataUrl(zip, image.getAttributeNS(NS.xlink, 'href') ?? '') : null
		if (!url) {
			return null
		}
		return value('fill-image-ref-point') || styleValue(chain, properties, NS.style, 'repeat') === 'repeat' ? 'url(' + url + ') repeat' : 'url(' + url + ') center/100% 100% no-repeat'
	}
	default:
		return null
	}
}

/**
 * The shapes in a page or master page as boxes (groups taken apart); placeholders
 * of a master page (presentation:class) are left out: slides fill them.
 */
async function odfShapes(container, zip, context, { masterPage = false } = {}) {
	const boxes = []
	for (const shape of [...container.children]) {
		if (shape.namespaceURI === NS.draw && shape.localName === 'g') {
			boxes.push(...await odfShapes(shape, zip, context, { masterPage }))
			continue
		}
		const x = shape.getAttributeNS(NS.svg, 'x')
		const y = shape.getAttributeNS(NS.svg, 'y')
		if (x === null || y === null || (masterPage && shape.hasAttributeNS(NS.presentation, 'class'))) {
			continue
		}
		const { width, height, scale, find, styles } = context
		const css = ['left:' + percent(length(x), width), 'top:' + percent(length(y), height),
			'width:' + percent(length(shape.getAttributeNS(NS.svg, 'width')), width), 'height:' + percent(length(shape.getAttributeNS(NS.svg, 'height')), height),
			'font-size:' + cqw(18 * scale * 96 / 72)]
		const name = shape.getAttributeNS(NS.draw, 'style-name')
		const chain = [...(name ? find('graphic', name) : []), ...find('presentation', shape.getAttributeNS(NS.presentation, 'style-name') ?? '')]
		// A frame of a table, picture or object is drawn without its style's fill and outline (as Impress does).
		const holder = shape.localName === 'frame' && !child(shape, NS.draw, 'text-box')
		const background = holder ? null : await odfFill(chain, 'graphic-properties', zip, styles)
		if (background) {
			css.push('background:' + background)
		}
		const text = (ns, attribute) => styleValue(chain, 'text-properties', ns, attribute)
		const weight = text(NS.fo, 'font-weight')
		if (weight === 'bold' || +weight >= 600) {
			css.push('font-weight:bold')
		}
		if (text(NS.fo, 'font-style') === 'italic') {
			css.push('font-style:italic')
		}
		if (text(NS.fo, 'color')) {
			css.push('color:' + text(NS.fo, 'color'))
		}
		if (text(NS.fo, 'font-size') && !text(NS.fo, 'font-size').endsWith('%')) {
			css[4] = 'font-size:' + cqw(length(text(NS.fo, 'font-size')) * scale)
		}
		const face = text(NS.style, 'font-name')
		const family = face ? all(styles, NS.style, 'font-face').find((item) => item.getAttributeNS(NS.style, 'name') === face)?.getAttributeNS(NS.svg, 'font-family') : null
		if (family) {
			css.push('font-family:' + fontNames(family.replace(/^'|'$/g, '')) + 'system-ui,sans-serif')
		}
		const align = styleValue(chain, 'paragraph-properties', NS.fo, 'text-align')
		if (align) {
			css.push('text-align:' + ({ start: 'left', end: 'right' }[align] ?? align))
		}
		const anchor = styleValue(chain, 'graphic-properties', NS.draw, 'textarea-vertical-align')
		css.push('display:flex;flex-direction:column;justify-content:' + ({ middle: 'center', bottom: 'flex-end' }[anchor] ?? 'flex-start'))
		const padding = ['top', 'right', 'bottom', 'left'].map((side) => cqw(length(styleValue(chain, 'graphic-properties', NS.fo, 'padding-' + side) || '0') * scale))
		css.push('padding:' + padding.join(' '))
		const stroke = holder ? null : styleValue(chain, 'graphic-properties', NS.draw, 'stroke')
		if (stroke && stroke !== 'none') {
			const strokeWidth = Math.max(1, length(styleValue(chain, 'graphic-properties', NS.svg, 'stroke-width') || '0') * scale)
			css.push('border:' + cqw(strokeWidth) + ' ' + (stroke === 'dash' ? 'dashed' : 'solid') + ' ' + (styleValue(chain, 'graphic-properties', NS.svg, 'stroke-color') || '#000'))
		}
		// Impress names shapes from PowerPoint ooxml-…: an ellipse, a rounded rectangle.
		const geometry = (all(shape, NS.draw, 'enhanced-geometry')[0]?.getAttributeNS(NS.draw, 'type') ?? '').replace(/^ooxml-/, '')
		if (shape.localName === 'ellipse' || shape.localName === 'circle' || geometry === 'ellipse') {
			css.push('border-radius:50%')
		} else if (['roundRect', 'round-rectangle', 'round-square'].includes(geometry)) {
			const side = Math.min(length(shape.getAttributeNS(NS.svg, 'width')), length(shape.getAttributeNS(NS.svg, 'height')))
			css.push('border-radius:' + cqw(side / 6 * scale))
		}
		boxes.push('<div class="box" style="' + css.join(';') + '"><div>' + await odfText(shape, zip, context.css, scale) + '</div></div>')
	}
	return boxes
}

/** An OpenDocument presentation (odp) as a page: every slide at its size, on its master page. */
export async function odpPage(data) {
	const { zip, content, styles } = await odfParts(data)
	const masters = new Map(all(styles, NS.style, 'master-page').map((item) => [item.getAttributeNS(NS.style, 'name'), item]))
	// The page size: the first master page's page layout (styles.xml).
	let width = length('28cm')
	let height = length('15.75cm')
	const firstMaster = [...masters.values()][0]
	const layoutName = firstMaster?.getAttributeNS(NS.style, 'page-layout-name')
	const layout = all(styles, NS.style, 'page-layout').find((item) => item.getAttributeNS(NS.style, 'name') === layoutName)
	const props = child(layout, NS.style, 'page-layout-properties')
	if (props) {
		width = length(props.getAttributeNS(NS.fo, 'page-width')) || width
		height = length(props.getAttributeNS(NS.fo, 'page-height')) || height
	}
	const scale = SLIDE_WIDTH / width
	// On a slide, sizes go with the slide's width; a master page's shapes find
	// their styles in styles.xml, a slide's in content.xml.
	const base = { width, height, scale, styles, css: textStyles([styles, content], (pixels) => cqw(pixels * scale)) }
	const onSlide = { ...base, find: styleFinder(content, styles) }
	const onMaster = { ...base, find: styleFinder(styles, styles) }
	const slides = []
	for (const slide of all(content, NS.draw, 'page')) {
		const master = masters.get(slide.getAttributeNS(NS.draw, 'master-page-name')) ?? firstMaster
		// The background: the slide's own, else its master page's.
		const background = await odfFill(onSlide.find('drawing-page', slide.getAttributeNS(NS.draw, 'style-name') ?? ''), 'drawing-page-properties', zip, styles)
			?? await odfFill(onMaster.find('drawing-page', master?.getAttributeNS(NS.draw, 'style-name') ?? ''), 'drawing-page-properties', zip, styles)
			?? '#fff'
		const boxes = [...(master ? await odfShapes(master, zip, onMaster, { masterPage: true }) : []), ...await odfShapes(slide, zip, onSlide)]
		slides.push('<div class="slide" style="aspect-ratio:' + width.toFixed(1) + '/' + height.toFixed(1) + ';background:' + background + '">' + boxes.join('') + '</div>')
	}
	return finish(slides.join(''))
}
