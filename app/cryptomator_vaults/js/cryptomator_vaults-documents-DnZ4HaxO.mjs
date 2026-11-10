import { n as e, r as t, t as n } from "./cryptomator_vaults-office-libraries-DSobXTCo.mjs";
import { r, t as i } from "./cryptomator_vaults-sandbox-CllzWuqe.mjs";
// src/documents.js
async function a(e) {
	let n = document.createElement("div"), a = document.createElement("div");
	return await t(new Blob([e]), n, a, {
		inWrapper: !0,
		useBase64URL: !0,
		ignoreLastRenderedPageBreak: !0,
		renderHeaders: !0,
		renderFooters: !0,
		experimental: !1
	}), i(n), r(a.innerHTML + "<style>body{margin:0;background:#eee}</style>", n.innerHTML);
}
function o(t) {
	let a = n(t, {
		type: "array",
		sheetRows: 2001,
		cellHTML: !1,
		cellFormula: !1,
		dense: !0
	}), o = document.createElement("div");
	for (let t of a.SheetNames) {
		let n = document.createElement("section"), r = document.createElement("h2");
		r.textContent = t, n.append(r);
		let i = document.createElement("div");
		i.innerHTML = e.sheet_to_html(a.Sheets[t], {
			header: "",
			footer: ""
		}), n.append(i), o.append(n);
	}
	return i(o), r("<style>body{font:13px system-ui,sans-serif;margin:8px}h2{font-size:15px;margin:16px 0 6px}table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:2px 6px;white-space:nowrap}</style>", o.innerHTML);
}
export { a as docxPage, o as sheetPage };
