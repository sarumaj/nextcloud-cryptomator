import { J as H } from "./cryptomator_vaults-zip.mjs";
import { d as q, p as J, e as O } from "./cryptomator_vaults-sandbox.mjs";
const e = {
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
  xlink: "http://www.w3.org/1999/xlink"
}, R = 960, T = (s) => (s / R * 100).toFixed(3) + "cqw", w = (s, t) => (s / t * 100).toFixed(3) + "%", Y = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", bmp: "image/bmp", webp: "image/webp", svg: "image/svg+xml" }, G = "<style>body{margin:0;padding:12px;background:#e8e8e8;font-family:system-ui,sans-serif;color:#222}.slide{position:relative;overflow:hidden;background:#fff;margin:0 auto 16px;box-shadow:0 1px 4px rgba(0,0,0,.3);width:100%;container-type:inline-size}.box{position:absolute;overflow:hidden;box-sizing:border-box}.box p{margin:0}.doc{background:#fff;max-width:800px;margin:0 auto;padding:40px 56px;box-shadow:0 1px 4px rgba(0,0,0,.3);line-height:1.4}table{border-collapse:collapse}td{border:1px solid #bbb;padding:2px 6px;vertical-align:top}img{max-width:100%}</style>";
function N(s) {
  return new DOMParser().parseFromString(s, "application/xml");
}
function P(s, t, i) {
  return [...s?.children ?? []].filter((o) => o.namespaceURI === t && o.localName === i);
}
function d(s, t, i) {
  return P(s, t, i)[0] ?? null;
}
function u(s, t, i) {
  return s ? [...s.getElementsByTagNameNS(t, i)] : [];
}
async function W(s, t) {
  const i = s.file(t), o = Y[(/\.([^.]+)$/.exec(t)?.[1] ?? "").toLowerCase()];
  return !i || !o ? null : "data:" + o + ";base64," + await i.async("base64");
}
function K(s, t) {
  const i = s.split("/").slice(0, -1);
  for (const o of t.split("/"))
    o === ".." ? i.pop() : o !== "." && i.push(o);
  return i.join("/");
}
function U(s) {
  const t = document.implementation.createHTMLDocument("").createElement("div");
  return t.innerHTML = s, q(t), J(G, t.innerHTML);
}
async function M(s, t) {
  const i = t.replace(/([^/]+)$/, "_rels/$1.rels"), o = s.file(i), a = {};
  if (o)
    for (const n of u(N(await o.async("string")), e.rel, "Relationship"))
      a[n.getAttribute("Id")] = { target: K(t, n.getAttribute("Target")), type: n.getAttribute("Type") };
  return a;
}
function E(s) {
  const t = u(s, e.p, "ph")[0];
  return t ? { type: t.getAttribute("type") || "body", idx: t.getAttribute("idx") } : null;
}
function C(s) {
  const t = u(s, e.a, "xfrm")[0], i = d(t, e.a, "off"), o = d(t, e.a, "ext");
  return i && o ? { x: +i.getAttribute("x"), y: +i.getAttribute("y"), w: +o.getAttribute("cx"), h: +o.getAttribute("cy") } : null;
}
function Z(s, t) {
  const i = C(s);
  if (i)
    return i;
  const o = E(s);
  for (const a of t)
    for (const n of u(a, e.p, "sp")) {
      const r = E(n);
      if (o && r && (o.idx && o.idx === r.idx || o.type === r.type)) {
        const f = C(n);
        if (f)
          return f;
      }
    }
  return null;
}
function I(s) {
  const t = u(s, e.a, "srgbClr")[0]?.getAttribute("val");
  return t ? "#" + t : null;
}
function D(s, t) {
  return P(s, e.a, "p").map((i) => {
    const o = { ctr: "center", r: "right", just: "justify" }[d(i, e.a, "pPr")?.getAttribute("algn")] ?? "left", a = [...i.children].map((n) => {
      if (n.localName === "br")
        return "<br>";
      if (n.localName !== "r" && n.localName !== "fld")
        return "";
      const r = d(n, e.a, "rPr"), f = r?.getAttribute("sz") ? +r.getAttribute("sz") / 100 * t * (96 / 72) : 18 * t * (96 / 72), c = ["font-size:" + T(f)];
      r?.getAttribute("b") === "1" && c.push("font-weight:bold"), r?.getAttribute("i") === "1" && c.push("font-style:italic");
      const l = d(r, e.a, "solidFill");
      return l && I(l) && c.push("color:" + I(l)), '<span style="' + c.join(";") + '">' + O(d(n, e.a, "t")?.textContent ?? "") + "</span>";
    }).join("");
    return '<p style="text-align:' + o + '">' + (a || "&nbsp;") + "</p>";
  }).join("");
}
async function tt(s) {
  const t = await H.loadAsync(s), i = N(await t.file("ppt/presentation.xml").async("string")), o = u(i, e.p, "sldSz")[0], a = +(o?.getAttribute("cx") ?? 12192e3), n = +(o?.getAttribute("cy") ?? 6858e3), r = R / (a / 9525), f = await M(t, "ppt/presentation.xml"), c = [];
  for (const l of u(i, e.p, "sldId")) {
    const g = f[l.getAttributeNS(e.r, "id")]?.target;
    if (!g || !t.file(g))
      continue;
    const v = N(await t.file(g).async("string")), S = await M(t, g), h = [], A = Object.values(S).find((p) => p.type.endsWith("/slideLayout"))?.target;
    if (A && t.file(A)) {
      h.push(N(await t.file(A).async("string")));
      const p = Object.values(await M(t, A)).find((x) => x.type.endsWith("/slideMaster"))?.target;
      p && t.file(p) && h.push(N(await t.file(p).async("string")));
    }
    const m = [], j = u(v, e.p, "spTree")[0];
    for (const p of j ? [...j.children] : []) {
      const x = Z(p, h);
      if (!x)
        continue;
      const F = "left:" + w(x.x, a) + ";top:" + w(x.y, n) + ";width:" + w(x.w, a) + ";height:" + w(x.h, n);
      if (p.localName === "sp") {
        const b = d(d(p, e.p, "spPr"), e.a, "solidFill"), k = b && I(b) ? ";background:" + I(b) : "", z = d(p, e.p, "txBody");
        m.push('<div class="box" style="' + F + k + ";padding:" + T(4 * r) + '">' + (z ? D(z, r) : "") + "</div>");
      } else if (p.localName === "pic") {
        const b = u(p, e.a, "blip")[0]?.getAttributeNS(e.r, "embed"), k = b && S[b] ? await W(t, S[b].target) : null;
        k && m.push('<img class="box" style="' + F + ';object-fit:contain" src="' + k + '" alt="">');
      } else if (p.localName === "graphicFrame") {
        const b = u(p, e.a, "tbl")[0];
        if (b) {
          const k = P(b, e.a, "tr").map((z) => "<tr>" + P(z, e.a, "tc").map((_) => "<td>" + D(d(_, e.a, "txBody"), r) + "</td>").join("") + "</tr>").join("");
          m.push('<div class="box" style="' + F + '"><table style="width:100%">' + k + "</table></div>");
        }
      }
    }
    c.push('<div class="slide" style="aspect-ratio:' + a + "/" + n + '">' + m.join("") + "</div>");
  }
  return U(c.join(""));
}
const Q = { cm: 96 / 2.54, mm: 96 / 25.4, in: 96, pt: 96 / 72, pc: 16, px: 1 };
function y(s) {
  const t = /^(-?[\d.]+)([a-z]+)?$/.exec(s ?? "");
  return t ? +t[1] * (Q[t[2] ?? "px"] ?? 1) : 0;
}
function $(s, t = (i) => i.toFixed(1) + "px") {
  const i = {};
  for (const o of s)
    for (const a of u(o, e.style, "style")) {
      const n = d(a, e.style, "text-properties"), r = [];
      if (n) {
        const l = n.getAttributeNS(e.fo, "font-weight");
        (l === "bold" || +l >= 600) && r.push("font-weight:bold"), n.getAttributeNS(e.fo, "font-style") === "italic" && r.push("font-style:italic");
        const g = n.getAttributeNS(e.fo, "font-size");
        g && !g.endsWith("%") && r.push("font-size:" + t(y(g)));
        const v = n.getAttributeNS(e.fo, "color");
        v && r.push("color:" + v), (n.getAttributeNS(e.style, "text-underline-style") || "none") !== "none" && r.push("text-decoration:underline");
      }
      const c = d(a, e.style, "paragraph-properties")?.getAttributeNS(e.fo, "text-align");
      c && r.push("text-align:" + ({ start: "left", end: "right" }[c] ?? c)), i[a.getAttributeNS(e.style, "name")] = r.join(";");
    }
  return i;
}
async function L(s, t, i, o = 1) {
  const a = [];
  for (const n of s.childNodes) {
    if (n.nodeType === 3) {
      a.push(O(n.textContent));
      continue;
    }
    if (n.nodeType !== 1)
      continue;
    const r = i[n.getAttributeNS(e.text, "style-name")] ?? "", f = r ? ' style="' + r + '"' : "", c = () => L(n, t, i, o);
    switch (n.namespaceURI === e.text || n.namespaceURI === e.table || n.namespaceURI === e.draw ? n.localName : "") {
      case "h": {
        const l = Math.min(6, Math.max(1, +(n.getAttributeNS(e.text, "outline-level") || 1)));
        a.push("<h" + l + f + ">" + await c() + "</h" + l + ">");
        break;
      }
      case "p":
        a.push("<p" + f + ">" + (await c() || "&nbsp;") + "</p>");
        break;
      case "span":
      case "a":
        a.push("<span" + f + ">" + await c() + "</span>");
        break;
      case "s":
        a.push("&nbsp;".repeat(+(n.getAttributeNS(e.text, "c") || 1)));
        break;
      case "tab":
        a.push("&emsp;");
        break;
      case "line-break":
        a.push("<br>");
        break;
      case "list":
        a.push("<ul>" + await c() + "</ul>");
        break;
      case "list-item":
      case "list-header":
        a.push("<li>" + await c() + "</li>");
        break;
      case "table":
        a.push("<table>" + await c() + "</table>");
        break;
      case "table-row":
        a.push("<tr>" + await c() + "</tr>");
        break;
      case "table-cell":
        a.push("<td>" + await c() + "</td>");
        break;
      case "table-header-rows":
      case "table-rows":
      case "section":
      case "text-box":
        a.push(await c());
        break;
      case "frame":
        a.push(await c());
        break;
      case "image": {
        const l = await W(t, n.getAttributeNS(e.xlink, "href") ?? "");
        l && a.push('<img src="' + l + '" alt="">');
        break;
      }
      default:
        (n.namespaceURI === e.text || n.namespaceURI === e.draw) && a.push(await c());
    }
  }
  return a.join("");
}
async function B(s) {
  const t = await H.loadAsync(s), i = N(await t.file("content.xml").async("string")), o = t.file("styles.xml") ? N(await t.file("styles.xml").async("string")) : null;
  return { zip: t, content: i, styles: o, css: $([o, i]) };
}
async function et(s) {
  const { zip: t, content: i, css: o } = await B(s), a = u(i, e.office, "text")[0];
  return U('<div class="doc">' + (a ? await L(a, t, o) : "") + "</div>");
}
async function st(s) {
  const { zip: t, content: i, styles: o } = await B(s);
  let a = y("28cm"), n = y("15.75cm");
  const f = u(o, e.style, "master-page")[0]?.getAttributeNS(e.style, "page-layout-name"), c = u(o, e.style, "page-layout").find((h) => h.getAttributeNS(e.style, "name") === f), l = d(c, e.style, "page-layout-properties");
  l && (a = y(l.getAttributeNS(e.fo, "page-width")) || a, n = y(l.getAttributeNS(e.fo, "page-height")) || n);
  const g = R / a, v = $([o, i], (h) => T(h * g)), S = [];
  for (const h of u(i, e.draw, "page")) {
    const A = [];
    for (const m of h.children) {
      const j = m.getAttributeNS(e.svg, "x"), p = m.getAttributeNS(e.svg, "y");
      if (j === null || p === null)
        continue;
      const x = "left:" + w(y(j), a) + ";top:" + w(y(p), n) + ";width:" + w(y(m.getAttributeNS(e.svg, "width")), a) + ";height:" + w(y(m.getAttributeNS(e.svg, "height")), n);
      A.push('<div class="box" style="' + x + ";font-size:" + T(18 * g * 96 / 72) + '">' + await L(m, t, v, g) + "</div>");
    }
    S.push('<div class="slide" style="aspect-ratio:' + a.toFixed(1) + "/" + n.toFixed(1) + '">' + A.join("") + "</div>");
  }
  return U(S.join(""));
}
export {
  st as odpPage,
  et as odtPage,
  tt as pptxPage
};
