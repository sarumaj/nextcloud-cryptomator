import { i as e } from "./cryptomator_vaults-rolldown-runtime-CwxnZyOB.mjs";
import { n as t, r as n, t as r } from "./cryptomator_vaults-sandbox-CllzWuqe.mjs";
// src/previews.js
var i = "<style>body{font:14px/1.5 system-ui,sans-serif;margin:12px 16px;color:#222;background:#fff}pre,code{background:#f4f4f4;border-radius:4px}pre{padding:8px;overflow:auto}code{padding:1px 3px}table{border-collapse:collapse}td,th{border:1px solid #ddd;padding:3px 8px;text-align:start}img{max-width:100%}blockquote{border-left:3px solid #ccc;margin-left:0;padding-left:12px;color:#555}</style>";
async function a(e) {
	let { marked: t } = await import("./cryptomator_vaults-marked.esm-iyYFkRml.mjs"), a = document.createElement("div");
	return a.innerHTML = await t.parse(new TextDecoder("utf-8").decode(e), {
		async: !0,
		gfm: !0
	}), r(a), n(i, a.innerHTML);
}
async function o(r) {
	let { default: a } = await import("./cryptomator_vaults-zip-Ca_DgTlH.mjs").then((t) => /* @__PURE__ */ e(t.t())), o = await a.loadAsync(r), s = [], c = 0, l = 0;
	return o.forEach((e, n) => {
		let r = n.dir ? "" : n._data?.uncompressedSize ?? "";
		n.dir || (c++, l += Number(r) || 0), s.push("<tr><td>" + t(e) + "</td><td>" + t(r) + "</td><td>" + t(n.date ? n.date.toISOString().slice(0, 16).replace("T", " ") : "") + "</td></tr>");
	}), n(i, "<p>" + c + (c === 1 ? " file, " : " files, ") + l + (l === 1 ? " byte" : " bytes") + " unpacked</p><table><thead><tr><th>Name</th><th>Bytes</th><th>Modified</th></tr></thead><tbody>" + s.join("") + "</tbody></table>");
}
async function s(e) {
	let { default: t } = await import("./cryptomator_vaults-libheif-bundle-CFYkTcd_.mjs"), n = new (await (t())).HeifDecoder().decode(e);
	if (!n.length) throw Error("no image in the file");
	let r = n[0], i = r.get_width(), a = r.get_height(), o = document.createElement("canvas");
	o.width = i, o.height = a;
	let s = o.getContext("2d"), c = s.createImageData(i, a);
	await new Promise((e, t) => r.display(c, (n) => n ? e() : t(/* @__PURE__ */ Error("the picture does not decode")))), s.putImageData(c, 0, 0);
	for (let e of n) e.free?.();
	let l = await new Promise((e) => o.toBlob(e, "image/png"));
	return new Uint8Array(await l.arrayBuffer());
}
export { s as heicToPng, a as markdownPage, o as zipPage };
