/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Pages for the previews' sandboxed frame (dialogs.js: no scripts, an opaque
 * origin): a whole HTML document with its own Content Security Policy that loads
 * nothing from outside (pictures and fonts only as data: URLs), and the removal of
 * links and outside addresses from what a document brings: nothing in a preview
 * reaches the network.
 */

export const POLICY = "default-src 'none'; img-src data:; font-src data:; style-src 'unsafe-inline'"

export function page(head, body) {
	return '<!doctype html><html><head><meta charset="utf-8">'
		+ '<meta http-equiv="Content-Security-Policy" content="' + POLICY + '">'
		+ '<meta name="referrer" content="no-referrer">' + head + '</head><body>' + body + '</body></html>'
}

/** Takes links and outside addresses off what was rendered. */
export function disarm(root) {
	for (const node of root.querySelectorAll('[href]')) {
		node.removeAttribute('href')
	}
	for (const node of root.querySelectorAll('[src], [srcset], [poster]')) {
		for (const name of ['src', 'srcset', 'poster']) {
			const value = node.getAttribute(name)
			if (value !== null && !value.startsWith('data:')) {
				node.removeAttribute(name)
			}
		}
	}
	for (const node of root.querySelectorAll('script, iframe, object, embed, link, meta, base, form')) {
		node.remove()
	}
	for (const node of root.querySelectorAll('*')) {
		for (const attribute of [...node.attributes]) {
			if (attribute.name.startsWith('on')) {
				node.removeAttribute(attribute.name)
			}
		}
	}
}


/** Text for HTML. */
export function escapeHtml(text) {
	return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
