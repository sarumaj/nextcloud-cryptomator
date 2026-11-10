// src/sandbox.js
function e(e, t) {
	return "<!doctype html><html><head><meta charset=\"utf-8\"><meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; img-src data:; font-src data:; style-src 'unsafe-inline'\"><meta name=\"referrer\" content=\"no-referrer\">" + e + "</head><body>" + t + "</body></html>";
}
function t(e) {
	for (let t of e.querySelectorAll("[href]")) t.removeAttribute("href");
	for (let t of e.querySelectorAll("[src], [srcset], [poster]")) for (let e of [
		"src",
		"srcset",
		"poster"
	]) {
		let n = t.getAttribute(e);
		n !== null && !n.startsWith("data:") && t.removeAttribute(e);
	}
	for (let t of e.querySelectorAll("script, iframe, object, embed, link, meta, base, form")) t.remove();
	for (let t of e.querySelectorAll("*")) for (let e of [...t.attributes]) e.name.startsWith("on") && t.removeAttribute(e.name);
}
function n(e) {
	return String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
export { n, e as r, t };
