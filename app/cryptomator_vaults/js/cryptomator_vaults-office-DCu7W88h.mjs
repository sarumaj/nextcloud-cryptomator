import { i as e } from "./cryptomator_vaults-rolldown-runtime-CwxnZyOB.mjs";
import { t } from "./cryptomator_vaults-zip-Ca_DgTlH.mjs";
import { n, r, t as i } from "./cryptomator_vaults-sandbox-CllzWuqe.mjs";
// src/office.js
var a = /* @__PURE__ */ e(t()), o = {
	a: "http://schemas.openxmlformats.org/drawingml/2006/main",
	p: "http://schemas.openxmlformats.org/presentationml/2006/main",
	r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
	rel: "http://schemas.openxmlformats.org/package/2006/relationships",
	office: "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
	text: "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
	table: "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
	draw: "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
	svg: "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
	fo: "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
	style: "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
	xlink: "http://www.w3.org/1999/xlink",
	presentation: "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
	loext: "urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0"
}, s = 960, c = (e) => (e / s * 100).toFixed(3) + "cqw", l = (e, t) => (e / t * 100).toFixed(3) + "%", u = {
	png: "image/png",
	jpg: "image/jpeg",
	jpeg: "image/jpeg",
	gif: "image/gif",
	bmp: "image/bmp",
	webp: "image/webp",
	svg: "image/svg+xml"
}, d = "<style>body{margin:0;padding:12px;background:#e8e8e8;font-family:system-ui,sans-serif;color:#222}.slide{position:relative;overflow:hidden;background:#fff;margin:0 auto 16px;box-shadow:0 1px 4px rgba(0,0,0,.3);width:100%;container-type:inline-size}.box{position:absolute;overflow:hidden;box-sizing:border-box}.box p{margin:0}.slide .box img{width:100%;height:100%;object-fit:fill}.slide table{width:100%}.slide ul{margin:0;padding-left:1.2em}.doc{background:#fff;max-width:800px;margin:0 auto;padding:40px 56px;box-shadow:0 1px 4px rgba(0,0,0,.3);line-height:1.4}table{border-collapse:collapse}td{border:1px solid #bbb;padding:2px 6px;vertical-align:top}img{max-width:100%}</style>";
function f(e) {
	return new DOMParser().parseFromString(e, "application/xml");
}
function p(e, t, n) {
	return [...e?.children ?? []].filter((e) => e.namespaceURI === t && e.localName === n);
}
function m(e, t, n) {
	return p(e, t, n)[0] ?? null;
}
function h(e, t, n) {
	return e ? [...e.getElementsByTagNameNS(t, n)] : [];
}
async function g(e, t) {
	let n = e.file(t), r = u[(/\.([^.]+)$/.exec(t)?.[1] ?? "").toLowerCase()];
	return !n || !r ? null : "data:" + r + ";base64," + await n.async("base64");
}
function _(e, t) {
	let n = e.split("/").slice(0, -1);
	for (let e of t.split("/")) e === ".." ? n.pop() : e !== "." && n.push(e);
	return n.join("/");
}
function v(e) {
	let t = document.implementation.createHTMLDocument("").createElement("div");
	return t.innerHTML = e, i(t), r(d, t.innerHTML);
}
var y = /* @__PURE__ */ new Set([
	"srgbClr",
	"schemeClr",
	"sysClr",
	"scrgbClr",
	"prstClr",
	"hslClr"
]), b = /* @__PURE__ */ new Set([
	"noFill",
	"solidFill",
	"gradFill",
	"blipFill",
	"pattFill",
	"grpFill"
]), x = 9525, S = {
	"": "▪",
	"": "•",
	"": "➢",
	"": "✓",
	"": "❖",
	"": "◦",
	q: "▪",
	l: "●",
	n: "■",
	Ø: "➢",
	ü: "✓"
};
async function C(e, t) {
	let n = t.replace(/([^/]+)$/, "_rels/$1.rels"), r = e.file(n), i = {};
	if (r) for (let e of h(f(await r.async("string")), o.rel, "Relationship")) e.getAttribute("TargetMode") !== "External" && (i[e.getAttribute("Id")] = {
		target: _(t, e.getAttribute("Target")),
		type: e.getAttribute("Type")
	});
	return i;
}
async function w(e, t) {
	return !t || !e.file(t) ? null : {
		path: t,
		doc: f(await e.file(t).async("string")),
		rels: await C(e, t)
	};
}
function T(e, t) {
	return Object.values(e?.rels ?? {}).find((e) => e.type.endsWith("/" + t))?.target;
}
function E(e) {
	let t = {};
	for (let n of [...h(e, o.a, "clrScheme")[0]?.children ?? []]) {
		let e = m(n, o.a, "srgbClr")?.getAttribute("val") ?? m(n, o.a, "sysClr")?.getAttribute("lastClr");
		e && (t[n.localName] = e);
	}
	let n = (t) => m(h(e, o.a, t)[0], o.a, "latin")?.getAttribute("typeface") || null, r = (t) => [...h(e, o.a, t)[0]?.children ?? []];
	return {
		colors: t,
		major: n("majorFont"),
		minor: n("minorFont"),
		fills: r("fillStyleLst"),
		lines: r("lnStyleLst"),
		backgrounds: r("bgFillStyleLst")
	};
}
function D(e, t) {
	let n = { ...t };
	for (let t of [...e?.attributes ?? []]) n[t.name] = t.value;
	return n;
}
function O(e) {
	let t = parseInt(e.padStart(6, "0").slice(-6), 16);
	return [
		t >> 16 & 255,
		t >> 8 & 255,
		t & 255
	];
}
function k(e) {
	let t = e / 255;
	return t <= .04045 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
}
function A(e) {
	let t = Math.max(0, Math.min(1, e));
	return Math.round(255 * (t <= .0031308 ? t * 12.92 : 1.055 * t ** (1 / 2.4) - .055));
}
function j([e, t, n]) {
	let [r, i, a] = [
		e / 255,
		t / 255,
		n / 255
	], o = Math.max(r, i, a), s = Math.min(r, i, a), c = (o + s) / 2;
	if (o === s) return [
		0,
		0,
		c
	];
	let l = o - s, u = c > .5 ? l / (2 - o - s) : l / (o + s);
	return [
		(o === r ? (i - a) / l + (i < a ? 6 : 0) : o === i ? (a - r) / l + 2 : (r - i) / l + 4) / 6,
		u,
		c
	];
}
function M([e, t, n]) {
	if (t === 0) return [
		n,
		n,
		n
	].map((e) => Math.round(e * 255));
	let r = n < .5 ? n * (1 + t) : n + t - n * t, i = 2 * n - r, a = (e) => {
		let t = e < 0 ? e + 1 : e > 1 ? e - 1 : e;
		return t < 1 / 6 ? i + (r - i) * 6 * t : t < 1 / 2 ? r : t < 2 / 3 ? i + (r - i) * (2 / 3 - t) * 6 : i;
	};
	return [
		a(e + 1 / 3),
		a(e),
		a(e - 1 / 3)
	].map((e) => Math.round(e * 255));
}
function ee(e, t, n) {
	if (!e) return null;
	let r = null, i = 1;
	switch (e.localName) {
		case "srgbClr":
			r = O(e.getAttribute("val") ?? "000000");
			break;
		case "sysClr":
			r = O(e.getAttribute("lastClr") ?? (e.getAttribute("val") === "window" ? "FFFFFF" : "000000"));
			break;
		case "scrgbClr":
			r = [
				"r",
				"g",
				"b"
			].map((t) => Math.round(Math.min(1, e.getAttribute(t) / 1e5) ** (1 / 2.2) * 255));
			break;
		case "hslClr":
			r = M([
				e.getAttribute("hue") / 216e5,
				e.getAttribute("sat") / 1e5,
				e.getAttribute("lum") / 1e5
			]);
			break;
		case "prstClr": {
			let t = {
				black: "000000",
				white: "FFFFFF",
				red: "FF0000",
				green: "008000",
				blue: "0000FF",
				yellow: "FFFF00",
				gray: "808080",
				grey: "808080"
			}[e.getAttribute("val")];
			r = t ? O(t) : null;
			break;
		}
		case "schemeClr": {
			let a = e.getAttribute("val");
			if (a === "phClr") {
				if (!n) return null;
				r = n.rgb, i = n.alpha;
			} else {
				let e = t.theme.colors[t.map[a] ?? a];
				r = e ? O(e) : null;
			}
			break;
		}
	}
	if (!r) return null;
	for (let t of e.children) {
		let e = t.getAttribute("val") / 1e5;
		switch (t.localName) {
			case "lumMod":
			case "lumOff":
			case "satMod": {
				let n = j(r);
				t.localName === "lumMod" ? n[2] = Math.min(1, n[2] * e) : t.localName === "lumOff" ? n[2] = Math.max(0, Math.min(1, n[2] + e)) : n[1] = Math.min(1, n[1] * e), r = M(n);
				break;
			}
			case "tint":
				r = r.map((t) => A(1 - (1 - k(t)) * e));
				break;
			case "shade":
				r = r.map((t) => A(k(t) * e));
				break;
			case "alpha": i = e;
		}
	}
	return {
		rgb: r,
		alpha: i,
		toString: () => i < 1 ? "rgba(" + r.join(",") + "," + i.toFixed(3) + ")" : "rgb(" + r.join(",") + ")"
	};
}
function N(e, t, n) {
	return ee([...e?.children ?? []].find((e) => y.has(e.localName)), t, n);
}
function P(e) {
	return [...e?.children ?? []].find((e) => b.has(e.localName)) ?? null;
}
async function F(e, t, n, r) {
	switch (e?.localName) {
		case "noFill": return "transparent";
		case "solidFill": return String(N(e, t, r) ?? "") || null;
		case "gradFill": {
			let n = h(e, o.a, "gs").map((e) => ({
				at: e.getAttribute("pos") / 1e3,
				color: N(e, t, r)
			})).filter((e) => e.color).sort((e, t) => e.at - t.at).map((e) => e.color + " " + e.at.toFixed(1) + "%");
			return n.length === 0 ? null : n.length === 1 ? n[0].split(" ")[0] : m(e, o.a, "path") ? "radial-gradient(circle," + n.join(",") + ")" : "linear-gradient(" + ((m(e, o.a, "lin")?.getAttribute("ang") ?? 0) / 6e4 + 90).toFixed(1) + "deg," + n.join(",") + ")";
		}
		case "blipFill": {
			let r = m(e, o.a, "blip")?.getAttributeNS(o.r, "embed"), i = r && n?.rels[r] ? await g(t.zip, n.rels[r].target) : null;
			return i ? m(e, o.a, "tile") ? "url(" + i + ") repeat" : "url(" + i + ") center/100% 100% no-repeat" : null;
		}
		case "pattFill": return String(N(m(e, o.a, "bgClr"), t, r) ?? "") || null;
		default: return null;
	}
}
function I(e, t, n) {
	let r = +(e?.getAttribute("idx") ?? 0), i = (n === "line" ? t.theme.lines : r >= 1001 ? t.theme.backgrounds : t.theme.fills)[r >= 1001 ? r - 1001 : r - 1] ?? null;
	return r > 0 && i ? {
		entry: i,
		phClr: N(e, t)
	} : null;
}
async function te(e, t) {
	for (let n of e) {
		let e = h(n.doc, o.p, "bg")[0];
		if (!e) continue;
		let r = m(e, o.p, "bgPr");
		if (r) {
			let e = await F(P(r), t, n);
			if (e) return e;
		}
		let i = I(m(e, o.p, "bgRef"), t, "fill");
		if (i) {
			let e = await F(i.entry, t, n, i.phClr);
			if (e) return e;
		}
	}
	return "#fff";
}
function L(e) {
	let t = h(e, o.p, "ph")[0];
	return t ? {
		type: t.getAttribute("type") || "body",
		idx: t.getAttribute("idx")
	} : null;
}
function ne(e, t) {
	let n = L(e);
	if (!n) return [];
	let r = [];
	for (let e of t) {
		let t = h(e.doc, o.p, "sp").filter((e) => L(e)), i = t.find((e) => n.idx && L(e).idx === n.idx) ?? t.find((e) => {
			let t = L(e).type;
			return t === n.type || n.type === "ctrTitle" && t === "title" || n.type === "subTitle" && t === "body";
		});
		i && r.push(i);
	}
	return r;
}
function R(e) {
	let t = m(m(e, o.p, "spPr") ?? m(e, o.p, "grpSpPr"), o.a, "xfrm") ?? m(e, o.p, "xfrm"), n = m(t, o.a, "off"), r = m(t, o.a, "ext");
	if (!n || !r) return null;
	let i = {
		x: +n.getAttribute("x"),
		y: +n.getAttribute("y"),
		w: +r.getAttribute("cx"),
		h: +r.getAttribute("cy"),
		rotation: (t.getAttribute("rot") ?? 0) / 6e4
	}, a = m(t, o.a, "chOff"), s = m(t, o.a, "chExt");
	return a && s && (i.child = {
		x: +a.getAttribute("x"),
		y: +a.getAttribute("y"),
		w: +s.getAttribute("cx") || 1,
		h: +s.getAttribute("cy") || 1
	}), i;
}
function z(e, t) {
	return m(e, o.a, "lvl" + (t + 1) + "pPr");
}
function re(e, t, n, r) {
	let i = L(e)?.type, a = i === "title" || i === "ctrTitle" ? "titleStyle" : i && i !== "dt" && i !== "ftr" && i !== "sldNum" ? "bodyStyle" : "otherStyle";
	return [
		z(m(m(e, o.p, "txBody"), o.a, "lstStyle"), r),
		...t.map((e) => z(m(m(e, o.p, "txBody"), o.a, "lstStyle"), r)),
		z(m(h(n.master.doc, o.p, "txStyles")[0], o.p, a), r),
		z(n.defaultText, r)
	].filter(Boolean);
}
var B = {
	Calibri: "Carlito",
	Cambria: "Caladea",
	Arial: "Liberation Sans",
	Helvetica: "Liberation Sans",
	"Times New Roman": "Liberation Serif",
	"Courier New": "Liberation Mono",
	"Calibri Light": "Carlito"
};
function V(e) {
	let t = e?.replace(/[^\p{L}\p{N} ._-]/gu, "");
	return t ? "'" + t + "'," + (B[t] ? "'" + B[t] + "'," : "") : "";
}
function H(e, t) {
	return V(e === "+mj-lt" ? t.theme.major : e === "+mn-lt" ? t.theme.minor : e);
}
function U(e, t, r, { color: i = null } = {}) {
	return p(e, o.a, "p").map((e) => {
		let a = m(e, o.a, "pPr"), s = [a, ...r(+(a?.getAttribute("lvl") ?? 0))].filter(Boolean), l = (e) => {
			for (let t of s) {
				let n = e(t);
				if (n != null) return n;
			}
			return null;
		}, u = (e) => l((t) => e(m(t, o.a, "defRPr"))), d = ["text-align:" + ({
			ctr: "center",
			r: "right",
			just: "justify"
		}[l((e) => e.getAttribute("algn"))] ?? "left"), "margin-left:" + c(+(l((e) => e.getAttribute("marL")) ?? 0) / x * t.scale)], f = l((e) => {
			if (m(e, o.a, "buNone")) return "";
			let t = m(e, o.a, "buChar")?.getAttribute("char");
			return t ? S[t] ?? t : m(e, o.a, "buAutoNum") ? "•" : null;
		}), p = 0, h = [...e.children].map((e) => {
			if (e.localName === "br") return "<br>";
			if (e.localName !== "r" && e.localName !== "fld") return "";
			let r = m(e, o.a, "rPr"), a = (e) => r && e(r) !== null && e(r) !== void 0 ? e(r) : u(e), s = (a((e) => e?.getAttribute("sz")) ?? 1800) / 100;
			p = Math.max(p, s);
			let l = ["font-size:" + c(96 / 72 * s * t.scale)];
			a((e) => e?.getAttribute("b")) === "1" && l.push("font-weight:bold"), a((e) => e?.getAttribute("i")) === "1" && l.push("font-style:italic"), (a((e) => e?.getAttribute("u")) ?? "none") !== "none" && l.push("text-decoration:underline");
			let d = (e) => m(e, o.a, "solidFill") ? N(m(e, o.a, "solidFill"), t) : null, f = (r && d(r)) ?? (i ? null : u(d));
			f && l.push("color:" + f);
			let h = a((e) => m(e, o.a, "latin")?.getAttribute("typeface") ?? null);
			return h && l.push("font-family:" + H(h, t) + "system-ui,sans-serif"), "<span style=\"" + l.join(";") + "\">" + n(m(e, o.a, "t")?.textContent ?? "") + "</span>";
		}).join(""), g = h && f ? "<span style=\"display:inline-block;width:1.2em;margin-left:-1.2em\">" + n(f) + "</span>" : "";
		return g && d.push("padding-left:1.2em"), "<p style=\"" + d.join(";") + "\">" + g + (h || "<span style=\"font-size:" + c((u((e) => e?.getAttribute("sz")) ?? 1800) / 100 * (96 / 72) * t.scale) + "\">&nbsp;</span>") + "</p>";
	}).join("");
}
var ie = "{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}";
function W(e, t) {
	let n = e.theme.colors.accent1;
	return n ? "rgb(" + O(n).map((e) => Math.round(t === 1 ? e : 255 - (255 - e) * t)).join(",") + ")" : null;
}
function ae(e, t) {
	let n = m(e, o.a, "tblPr"), r = m(n, o.a, "tableStyleId")?.textContent?.trim(), i = (!r || r === ie) && t.theme.colors.accent1, a = n?.getAttribute("firstRow") === "1", s = n?.getAttribute("bandRow") === "1";
	return "<table style=\"width:100%;height:100%\">" + p(e, o.a, "tr").map((e, n) => {
		let r = a && n === 0, c = s && (a ? n - 1 : n) % 2 == 0;
		return "<tr>" + p(e, o.a, "tc").map((e) => {
			let n = P(m(e, o.a, "tcPr")), a = (n?.localName === "solidFill" ? N(n, t) : null) ?? (i ? r ? W(t, 1) : W(t, c ? .4 : .2) : null), s = [];
			a && s.push("background:" + a), i && s.push("border:1px solid #fff", "color:" + (r ? "#fff" : "#000")), i && r && s.push("font-weight:bold");
			let l = U(m(e, o.a, "txBody"), t, (e) => [z(t.defaultText, e)].filter(Boolean), { color: i });
			return "<td" + (s.length ? " style=\"" + s.join(";") + "\"" : "") + ">" + l + "</td>";
		}).join("") + "</tr>";
	}).join("") + "</table>";
}
function oe(e, t) {
	let n = m(m(e, o.p, "spPr"), o.a, "ln"), r = I(m(m(e, o.p, "style"), o.a, "lnRef"), t, "line"), i = P(n) ?? P(r?.entry);
	if (!i || i.localName !== "solidFill") return "";
	let a = N(i, t, P(n) ? null : r?.phClr), s = Math.max(1, +(n?.getAttribute("w") ?? r?.entry.getAttribute("w") ?? 9525) / x * t.scale), l = m(n, o.a, "prstDash")?.getAttribute("val") ?? m(r?.entry, o.a, "prstDash")?.getAttribute("val");
	return a ? "border:" + c(s) + " " + (l && l !== "solid" ? "dashed" : "solid") + " " + a : "";
}
function se(e, t, n) {
	let r = m(m(e, o.p, "spPr"), o.a, "prstGeom")?.getAttribute("prst");
	return r === "ellipse" ? ";border-radius:50%" : r === "roundRect" ? ";border-radius:" + c(Math.min(t.w, t.h) / 6 / x * n.scale) : "";
}
async function G(e, t, n, { inherited: r = [], placeholders: i = !0, at: a = (e) => e } = {}) {
	let s = [];
	for (let u of e ? [...e.children] : []) {
		if (![
			"sp",
			"pic",
			"graphicFrame",
			"grpSp",
			"cxnSp"
		].includes(u.localName)) continue;
		let e = L(u);
		if (e && !i || h(u, o.p, "cNvPr")[0]?.getAttribute("hidden") === "1") continue;
		let d = e ? ne(u, r) : [], f = R(u) ?? d.map(R).find(Boolean);
		if (!f) continue;
		let p = a(f), { width: _, height: v } = n, y = "left:" + l(p.x, _) + ";top:" + l(p.y, v) + ";width:" + l(p.w, _) + ";height:" + l(p.h, v);
		if (p.rotation && (y += ";transform:rotate(" + p.rotation.toFixed(2) + "deg)"), u.localName === "grpSp") {
			let e = f.child, a = e ? p.w / e.w : 1, o = e ? p.h / e.h : 1;
			s.push(...await G(u, t, n, {
				inherited: r,
				placeholders: i,
				at: (t) => ({
					...t,
					x: p.x + (t.x - (e?.x ?? 0)) * a,
					y: p.y + (t.y - (e?.y ?? 0)) * o,
					w: t.w * a,
					h: t.h * o
				})
			}));
			continue;
		}
		if (u.localName === "pic") {
			let e = m(m(u, o.p, "blipFill"), o.a, "blip")?.getAttributeNS(o.r, "embed"), r = e && t.rels[e] ? await g(n.zip, t.rels[e].target) : null;
			r && s.push("<img class=\"box\" style=\"" + y + ";object-fit:fill\" src=\"" + r + "\" alt=\"\">");
			continue;
		}
		if (u.localName === "graphicFrame") {
			let e = h(u, o.a, "tbl")[0];
			e && s.push("<div class=\"box\" style=\"" + y + "\">" + ae(e, n) + "</div>");
			continue;
		}
		let b = [u, ...d].find((e) => P(m(e, o.p, "spPr"))), S = b ? await F(P(m(b, o.p, "spPr")), n, b === u ? t : null) : null;
		if (!b) {
			let e = I(m(m(u, o.p, "style"), o.a, "fillRef"), n, "fill");
			S = e ? await F(e.entry, n, t, e.phClr) : null;
		}
		let C = oe(u, n), w = [y, "padding:0"];
		if (S && w.push("background:" + S), u.localName === "cxnSp") {
			C && w.push(C.replace("border:", "border-top:"), "height:0"), s.push("<div class=\"box\" style=\"" + w.join(";") + "\"></div>");
			continue;
		}
		C && w.push(C);
		let T = m(u, o.p, "txBody"), E = [m(T, o.a, "bodyPr"), ...d.map((e) => m(m(e, o.p, "txBody"), o.a, "bodyPr"))].filter(Boolean), D = (e, t) => {
			for (let t of E) if (t.hasAttribute(e)) return t.getAttribute(e);
			return t;
		}, O = (e, t) => c(+D(e, t) / x * n.scale);
		w.push("padding:" + [
			O("tIns", 45720),
			O("rIns", 91440),
			O("bIns", 45720),
			O("lIns", 91440)
		].join(" ")), w.push("display:flex;flex-direction:column;justify-content:" + ({
			ctr: "center",
			b: "flex-end"
		}[D("anchor", "t")] ?? "flex-start"));
		let k = m(m(u, o.p, "style"), o.a, "fontRef"), A = N(k, n);
		A && w.push("color:" + A);
		let j = {
			major: "+mj-lt",
			minor: "+mn-lt"
		}[k?.getAttribute("idx")];
		j && H(j, n) && w.push("font-family:" + H(j, n) + "system-ui,sans-serif");
		let M = T ? U(T, n, (e) => re(u, d, n, e), { color: A }) : "";
		s.push("<div class=\"box\" style=\"" + w.join(";") + se(u, p, n) + "\"><div>" + M + "</div></div>");
	}
	return s;
}
async function ce(e) {
	let t = await a.default.loadAsync(e), n = await w(t, "ppt/presentation.xml"), r = n.doc, i = h(r, o.p, "sldSz")[0], c = +(i?.getAttribute("cx") ?? 12192e3), l = +(i?.getAttribute("cy") ?? 6858e3), u = s / (c / x), d = h(r, o.p, "defaultTextStyle")[0] ?? null, f = /* @__PURE__ */ new Map(), p = async (e) => (f.has(e) || f.set(e, await w(t, e)), f.get(e)), m = [];
	for (let e of h(r, o.p, "sldId")) {
		let r = await p(n.rels[e.getAttributeNS(o.r, "id")]?.target);
		if (!r) continue;
		let i = await p(T(r, "slideLayout")), a = await p(T(i, "slideMaster")), s = await p(T(a, "theme")), f = s ? E(s.doc) : {
			colors: {},
			fills: [],
			lines: [],
			backgrounds: []
		}, g = D(h(a?.doc, o.p, "clrMap")[0], {});
		for (let e of [i, r]) {
			let t = h(e?.doc, o.a, "overrideClrMapping")[0];
			t && (g = D(t, g));
		}
		let _ = {
			zip: t,
			theme: f,
			map: g,
			width: c,
			height: l,
			scale: u,
			defaultText: d,
			master: a ?? { doc: null }
		}, v = [i, a].filter(Boolean), y = (e) => h(e?.doc, o.p, "sld")[0]?.getAttribute("showMasterSp") !== "0" && h(e?.doc, o.p, "sldLayout")[0]?.getAttribute("showMasterSp") !== "0", b = [];
		a && y(r) && y(i) && b.push(...await G(h(a.doc, o.p, "spTree")[0], a, _, { placeholders: !1 })), i && y(r) && b.push(...await G(h(i.doc, o.p, "spTree")[0], i, _, { placeholders: !1 })), b.push(...await G(h(r.doc, o.p, "spTree")[0], r, _, { inherited: v }));
		let x = await te([r, ...v], _), S = f.colors[g.tx1 ?? "dk1"], C = H("+mn-lt", _);
		m.push("<div class=\"slide\" style=\"aspect-ratio:" + c + "/" + l + ";background:" + x + (S ? ";color:#" + S : "") + (C ? ";font-family:" + C + "system-ui,sans-serif" : "") + "\">" + b.join("") + "</div>");
	}
	return v(m.join(""));
}
var le = {
	cm: 96 / 2.54,
	mm: 96 / 25.4,
	in: 96,
	pt: 96 / 72,
	pc: 16,
	px: 1
};
function K(e) {
	let t = /^(-?[\d.]+)([a-z]+)?$/.exec(e ?? "");
	return t ? +t[1] * (le[t[2] ?? "px"] ?? 1) : 0;
}
function q(e, t = (e) => e.toFixed(1) + "px") {
	let n = {};
	for (let r of e) for (let e of h(r, o.style, "style")) {
		let r = m(e, o.style, "text-properties"), i = [];
		if (r) {
			let e = r.getAttributeNS(o.fo, "font-weight");
			(e === "bold" || +e >= 600) && i.push("font-weight:bold"), r.getAttributeNS(o.fo, "font-style") === "italic" && i.push("font-style:italic");
			let n = r.getAttributeNS(o.fo, "font-size");
			n && !n.endsWith("%") && i.push("font-size:" + t(K(n)));
			let a = r.getAttributeNS(o.fo, "color");
			a && i.push("color:" + a), (r.getAttributeNS(o.style, "text-underline-style") || "none") !== "none" && i.push("text-decoration:underline");
		}
		let a = m(e, o.style, "paragraph-properties"), s = a?.getAttributeNS(o.fo, "text-align");
		if (s && i.push("text-align:" + ({
			start: "left",
			end: "right"
		}[s] ?? s)), e.getAttributeNS(o.style, "family") === "table-cell") {
			let t = m(e, o.style, "table-cell-properties"), n = m(e, o.loext, "graphic-properties"), r = t?.getAttributeNS(o.fo, "background-color") || (n?.getAttributeNS(o.draw, "fill") === "solid" ? n.getAttributeNS(o.draw, "fill-color") : "");
			r && r !== "transparent" && i.push("background:" + r);
			let s = t?.getAttributeNS(o.fo, "border") || a?.getAttributeNS(o.fo, "border");
			s && s !== "none" && i.push("border:" + s);
		}
		n[e.getAttributeNS(o.style, "name")] = i.join(";");
	}
	return n;
}
async function J(e, t, r, i = 1) {
	let a = [];
	for (let s of e.childNodes) {
		if (s.nodeType === 3) {
			a.push(n(s.textContent));
			continue;
		}
		if (s.nodeType !== 1) continue;
		let e = r[s.getAttributeNS(o.text, "style-name")] ?? "", c = e ? " style=\"" + e + "\"" : "", l = () => J(s, t, r, i);
		switch (s.namespaceURI === o.text || s.namespaceURI === o.table || s.namespaceURI === o.draw ? s.localName : "") {
			case "h": {
				let e = Math.min(6, Math.max(1, +(s.getAttributeNS(o.text, "outline-level") || 1)));
				a.push("<h" + e + c + ">" + await l() + "</h" + e + ">");
				break;
			}
			case "p":
				a.push("<p" + c + ">" + (await l() || "&nbsp;") + "</p>");
				break;
			case "span":
			case "a":
				a.push("<span" + c + ">" + await l() + "</span>");
				break;
			case "s":
				a.push("&nbsp;".repeat(+(s.getAttributeNS(o.text, "c") || 1)));
				break;
			case "tab":
				a.push("&emsp;");
				break;
			case "line-break":
				a.push("<br>");
				break;
			case "list":
				a.push("<ul>" + await l() + "</ul>");
				break;
			case "list-item":
			case "list-header": {
				let e = [...s.children].some((e) => e.localName !== "list");
				a.push((e ? "<li>" : "<li style=\"list-style:none\">") + await l() + "</li>");
				break;
			}
			case "table":
				a.push("<table>" + await l() + "</table>");
				break;
			case "table-row": {
				let e = s.getAttributeNS(o.table, "default-cell-style-name"), n = [];
				for (let a of s.children) {
					if (a.namespaceURI !== o.table || a.localName !== "table-cell") continue;
					let s = r[a.getAttributeNS(o.table, "style-name") || e] ?? "", c = +(a.getAttributeNS(o.table, "number-columns-spanned") || 1);
					n.push("<td" + (c > 1 ? " colspan=\"" + c + "\"" : "") + (s ? " style=\"" + s + "\"" : "") + ">" + await J(a, t, r, i) + "</td>");
				}
				a.push("<tr>" + n.join("") + "</tr>");
				break;
			}
			case "table-cell":
				a.push("<td>" + await l() + "</td>");
				break;
			case "table-header-rows":
			case "table-rows":
			case "section":
			case "text-box":
				a.push(await l());
				break;
			case "frame":
				a.push(await l());
				break;
			case "image": {
				let e = await g(t, s.getAttributeNS(o.xlink, "href") ?? "");
				e && a.push("<img src=\"" + e + "\" alt=\"\">");
				break;
			}
			default: (s.namespaceURI === o.text || s.namespaceURI === o.draw) && a.push(await l());
		}
	}
	return a.join("");
}
async function Y(e) {
	let t = await a.default.loadAsync(e), n = f(await t.file("content.xml").async("string")), r = t.file("styles.xml") ? f(await t.file("styles.xml").async("string")) : null;
	return {
		zip: t,
		content: n,
		styles: r,
		css: q([r, n])
	};
}
async function ue(e) {
	let { zip: t, content: n, css: r } = await Y(e), i = h(n, o.office, "text")[0];
	return v("<div class=\"doc\">" + (i ? await J(i, t, r) : "") + "</div>");
}
function X(e, t) {
	let n = (e, t) => {
		let n = /* @__PURE__ */ new Map();
		for (let r of p(e, o.style, "style")) r.getAttributeNS(o.style, "family") === t && n.set(r.getAttributeNS(o.style, "name"), r);
		return n;
	}, r = h(t, o.office, "styles")[0];
	return (t, i) => {
		let a = [], s = n(h(e, o.office, "automatic-styles")[0], t).get(i) ?? n(r, t).get(i);
		for (; s && a.length < 10;) a.push(s), s = n(r, t).get(s.getAttributeNS(o.style, "parent-style-name"));
		let c = p(r, o.style, "default-style").find((e) => e.getAttributeNS(o.style, "family") === t);
		return c ? [...a, c] : a;
	};
}
function Z(e, t, n, r) {
	for (let i of e) {
		let e = m(i, o.style, t)?.getAttributeNS(n, r);
		if (e) return e;
	}
	return null;
}
async function Q(e, t, n, r) {
	let i = Z(e, t, o.draw, "fill"), a = (n) => Z(e, t, o.draw, n);
	switch (i) {
		case "none": return "transparent";
		case "solid": return a("fill-color") || null;
		case "gradient": {
			let e = h(r, o.draw, "gradient").find((e) => e.getAttributeNS(o.draw, "name") === a("fill-gradient-name"));
			if (!e) return a("fill-color") || null;
			let t = e.getAttributeNS(o.draw, "start-color") || "#ffffff", n = e.getAttributeNS(o.draw, "end-color") || "#000000", i = e.getAttributeNS(o.draw, "style") || "linear", s = e.getAttributeNS(o.draw, "angle") || "0", c = /deg$/.test(s) ? parseFloat(s) : /rad$/.test(s) ? parseFloat(s) * 180 / Math.PI : parseFloat(s) / 10;
			if (i === "radial" || i === "ellipsoid" || i === "square" || i === "rectangular") return "radial-gradient(circle," + n + "," + t + ")";
			let l = (180 - c).toFixed(1) + "deg";
			return i === "axial" ? "linear-gradient(" + l + "," + t + "," + n + " 50%," + t + ")" : "linear-gradient(" + l + "," + t + "," + n + ")";
		}
		case "bitmap": {
			let i = h(r, o.draw, "fill-image").find((e) => e.getAttributeNS(o.draw, "name") === a("fill-image-name")), s = i ? await g(n, i.getAttributeNS(o.xlink, "href") ?? "") : null;
			return s ? a("fill-image-ref-point") || Z(e, t, o.style, "repeat") === "repeat" ? "url(" + s + ") repeat" : "url(" + s + ") center/100% 100% no-repeat" : null;
		}
		default: return null;
	}
}
async function $(e, t, n, { masterPage: r = !1 } = {}) {
	let i = [];
	for (let a of [...e.children]) {
		if (a.namespaceURI === o.draw && a.localName === "g") {
			i.push(...await $(a, t, n, { masterPage: r }));
			continue;
		}
		let e = a.getAttributeNS(o.svg, "x"), s = a.getAttributeNS(o.svg, "y");
		if (e === null || s === null || r && a.hasAttributeNS(o.presentation, "class")) continue;
		let { width: u, height: d, scale: f, find: p, styles: g } = n, _ = [
			"left:" + l(K(e), u),
			"top:" + l(K(s), d),
			"width:" + l(K(a.getAttributeNS(o.svg, "width")), u),
			"height:" + l(K(a.getAttributeNS(o.svg, "height")), d),
			"font-size:" + c(18 * f * 96 / 72)
		], v = a.getAttributeNS(o.draw, "style-name"), y = [...v ? p("graphic", v) : [], ...p("presentation", a.getAttributeNS(o.presentation, "style-name") ?? "")], b = a.localName === "frame" && !m(a, o.draw, "text-box"), x = b ? null : await Q(y, "graphic-properties", t, g);
		x && _.push("background:" + x);
		let S = (e, t) => Z(y, "text-properties", e, t), C = S(o.fo, "font-weight");
		(C === "bold" || +C >= 600) && _.push("font-weight:bold"), S(o.fo, "font-style") === "italic" && _.push("font-style:italic"), S(o.fo, "color") && _.push("color:" + S(o.fo, "color")), S(o.fo, "font-size") && !S(o.fo, "font-size").endsWith("%") && (_[4] = "font-size:" + c(K(S(o.fo, "font-size")) * f));
		let w = S(o.style, "font-name"), T = w ? h(g, o.style, "font-face").find((e) => e.getAttributeNS(o.style, "name") === w)?.getAttributeNS(o.svg, "font-family") : null;
		T && _.push("font-family:" + V(T.replace(/^'|'$/g, "")) + "system-ui,sans-serif");
		let E = Z(y, "paragraph-properties", o.fo, "text-align");
		E && _.push("text-align:" + ({
			start: "left",
			end: "right"
		}[E] ?? E));
		let D = Z(y, "graphic-properties", o.draw, "textarea-vertical-align");
		_.push("display:flex;flex-direction:column;justify-content:" + ({
			middle: "center",
			bottom: "flex-end"
		}[D] ?? "flex-start"));
		let O = [
			"top",
			"right",
			"bottom",
			"left"
		].map((e) => c(K(Z(y, "graphic-properties", o.fo, "padding-" + e) || "0") * f));
		_.push("padding:" + O.join(" "));
		let k = b ? null : Z(y, "graphic-properties", o.draw, "stroke");
		if (k && k !== "none") {
			let e = Math.max(1, K(Z(y, "graphic-properties", o.svg, "stroke-width") || "0") * f);
			_.push("border:" + c(e) + " " + (k === "dash" ? "dashed" : "solid") + " " + (Z(y, "graphic-properties", o.svg, "stroke-color") || "#000"));
		}
		let A = (h(a, o.draw, "enhanced-geometry")[0]?.getAttributeNS(o.draw, "type") ?? "").replace(/^ooxml-/, "");
		if (a.localName === "ellipse" || a.localName === "circle" || A === "ellipse") _.push("border-radius:50%");
		else if ([
			"roundRect",
			"round-rectangle",
			"round-square"
		].includes(A)) {
			let e = Math.min(K(a.getAttributeNS(o.svg, "width")), K(a.getAttributeNS(o.svg, "height")));
			_.push("border-radius:" + c(e / 6 * f));
		}
		i.push("<div class=\"box\" style=\"" + _.join(";") + "\"><div>" + await J(a, t, n.css, f) + "</div></div>");
	}
	return i;
}
async function de(e) {
	let { zip: t, content: n, styles: r } = await Y(e), i = new Map(h(r, o.style, "master-page").map((e) => [e.getAttributeNS(o.style, "name"), e])), a = K("28cm"), l = K("15.75cm"), u = [...i.values()][0], d = u?.getAttributeNS(o.style, "page-layout-name"), f = m(h(r, o.style, "page-layout").find((e) => e.getAttributeNS(o.style, "name") === d), o.style, "page-layout-properties");
	f && (a = K(f.getAttributeNS(o.fo, "page-width")) || a, l = K(f.getAttributeNS(o.fo, "page-height")) || l);
	let p = s / a, g = {
		width: a,
		height: l,
		scale: p,
		styles: r,
		css: q([r, n], (e) => c(e * p))
	}, _ = {
		...g,
		find: X(n, r)
	}, y = {
		...g,
		find: X(r, r)
	}, b = [];
	for (let e of h(n, o.draw, "page")) {
		let n = i.get(e.getAttributeNS(o.draw, "master-page-name")) ?? u, s = await Q(_.find("drawing-page", e.getAttributeNS(o.draw, "style-name") ?? ""), "drawing-page-properties", t, r) ?? await Q(y.find("drawing-page", n?.getAttributeNS(o.draw, "style-name") ?? ""), "drawing-page-properties", t, r) ?? "#fff", c = [...n ? await $(n, t, y, { masterPage: !0 }) : [], ...await $(e, t, _)];
		b.push("<div class=\"slide\" style=\"aspect-ratio:" + a.toFixed(1) + "/" + l.toFixed(1) + ";background:" + s + "\">" + c.join("") + "</div>");
	}
	return v(b.join(""));
}
export { de as odpPage, ue as odtPage, ce as pptxPage };
