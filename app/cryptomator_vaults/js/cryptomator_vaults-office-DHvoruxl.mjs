import { J as gt } from "./cryptomator_vaults-zip-CUMurq2b.mjs";
import { d as wt, p as xt, e as Q } from "./cryptomator_vaults-sandbox-DTyXRA90.mjs";
const t = {
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
}, nt = 960, C = (n) => (n / nt * 100).toFixed(3) + "cqw", E = (n, e) => (n / e * 100).toFixed(3) + "%", At = { png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg", gif: "image/gif", bmp: "image/bmp", webp: "image/webp", svg: "image/svg+xml" }, St = "<style>body{margin:0;padding:12px;background:#e8e8e8;font-family:system-ui,sans-serif;color:#222}.slide{position:relative;overflow:hidden;background:#fff;margin:0 auto 16px;box-shadow:0 1px 4px rgba(0,0,0,.3);width:100%;container-type:inline-size}.box{position:absolute;overflow:hidden;box-sizing:border-box}.box p{margin:0}.slide .box img{width:100%;height:100%;object-fit:fill}.slide table{width:100%}.slide ul{margin:0;padding-left:1.2em}.doc{background:#fff;max-width:800px;margin:0 auto;padding:40px 56px;box-shadow:0 1px 4px rgba(0,0,0,.3);line-height:1.4}table{border-collapse:collapse}td{border:1px solid #bbb;padding:2px 6px;vertical-align:top}img{max-width:100%}</style>";
function G(n) {
  return new DOMParser().parseFromString(n, "application/xml");
}
function O(n, e, s) {
  return [...n?.children ?? []].filter((a) => a.namespaceURI === e && a.localName === s);
}
function c(n, e, s) {
  return O(n, e, s)[0] ?? null;
}
function y(n, e, s) {
  return n ? [...n.getElementsByTagNameNS(e, s)] : [];
}
async function V(n, e) {
  const s = n.file(e), a = At[(/\.([^.]+)$/.exec(e)?.[1] ?? "").toLowerCase()];
  return !s || !a ? null : "data:" + a + ";base64," + await s.async("base64");
}
function Nt(n, e) {
  const s = n.split("/").slice(0, -1);
  for (const a of e.split("/"))
    a === ".." ? s.pop() : a !== "." && s.push(a);
  return s.join("/");
}
function st(n) {
  const e = document.implementation.createHTMLDocument("").createElement("div");
  return e.innerHTML = n, wt(e), xt(St, e.innerHTML);
}
const kt = /* @__PURE__ */ new Set(["srgbClr", "schemeClr", "sysClr", "scrgbClr", "prstClr", "hslClr"]), Ft = /* @__PURE__ */ new Set(["noFill", "solidFill", "gradFill", "blipFill", "pattFill", "grpFill"]), W = 9525, vt = { "": "▪", "": "•", "": "➢", "": "✓", "": "❖", "": "◦", q: "▪", l: "●", n: "■", Ø: "➢", ü: "✓" };
async function Mt(n, e) {
  const s = e.replace(/([^/]+)$/, "_rels/$1.rels"), a = n.file(s), o = {};
  if (a)
    for (const r of y(G(await a.async("string")), t.rel, "Relationship"))
      r.getAttribute("TargetMode") !== "External" && (o[r.getAttribute("Id")] = { target: Nt(e, r.getAttribute("Target")), type: r.getAttribute("Type") });
  return o;
}
async function at(n, e) {
  return !e || !n.file(e) ? null : { path: e, doc: G(await n.file(e).async("string")), rels: await Mt(n, e) };
}
function Z(n, e) {
  return Object.values(n?.rels ?? {}).find((s) => s.type.endsWith("/" + e))?.target;
}
function jt(n) {
  const e = {};
  for (const o of [...y(n, t.a, "clrScheme")[0]?.children ?? []]) {
    const r = c(o, t.a, "srgbClr")?.getAttribute("val") ?? c(o, t.a, "sysClr")?.getAttribute("lastClr");
    r && (e[o.localName] = r);
  }
  const s = (o) => c(y(n, t.a, o)[0], t.a, "latin")?.getAttribute("typeface") || null, a = (o) => [...y(n, t.a, o)[0]?.children ?? []];
  return { colors: e, major: s("majorFont"), minor: s("minorFont"), fills: a("fillStyleLst"), lines: a("lnStyleLst"), backgrounds: a("bgFillStyleLst") };
}
function ot(n, e) {
  const s = { ...e };
  for (const a of [...n?.attributes ?? []])
    s[a.name] = a.value;
  return s;
}
function $(n) {
  const e = parseInt(n.padStart(6, "0").slice(-6), 16);
  return [e >> 16 & 255, e >> 8 & 255, e & 255];
}
function it(n) {
  const e = n / 255;
  return e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4;
}
function lt(n) {
  const e = Math.max(0, Math.min(1, n));
  return Math.round(255 * (e <= 31308e-7 ? e * 12.92 : 1.055 * e ** (1 / 2.4) - 0.055));
}
function Ct([n, e, s]) {
  const [a, o, r] = [n / 255, e / 255, s / 255], i = Math.max(a, o, r), l = Math.min(a, o, r), f = (i + l) / 2;
  if (i === l)
    return [0, 0, f];
  const u = i - l, d = f > 0.5 ? u / (2 - i - l) : u / (i + l);
  return [(i === a ? (o - r) / u + (o < r ? 6 : 0) : i === o ? (r - a) / u + 2 : (a - o) / u + 4) / 6, d, f];
}
function ct([n, e, s]) {
  if (e === 0)
    return [s, s, s].map((i) => Math.round(i * 255));
  const a = s < 0.5 ? s * (1 + e) : s + e - s * e, o = 2 * s - a, r = (i) => {
    const l = i < 0 ? i + 1 : i > 1 ? i - 1 : i;
    return l < 1 / 6 ? o + (a - o) * 6 * l : l < 1 / 2 ? a : l < 2 / 3 ? o + (a - o) * (2 / 3 - l) * 6 : o;
  };
  return [r(n + 1 / 3), r(n), r(n - 1 / 3)].map((i) => Math.round(i * 255));
}
function Tt(n, e, s) {
  if (!n)
    return null;
  let a = null, o = 1;
  switch (n.localName) {
    case "srgbClr":
      a = $(n.getAttribute("val") ?? "000000");
      break;
    case "sysClr":
      a = $(n.getAttribute("lastClr") ?? (n.getAttribute("val") === "window" ? "FFFFFF" : "000000"));
      break;
    case "scrgbClr":
      a = ["r", "g", "b"].map((r) => Math.round(Math.min(1, +n.getAttribute(r) / 1e5) ** (1 / 2.2) * 255));
      break;
    case "hslClr":
      a = ct([+n.getAttribute("hue") / 216e5, +n.getAttribute("sat") / 1e5, +n.getAttribute("lum") / 1e5]);
      break;
    case "prstClr": {
      const r = { black: "000000", white: "FFFFFF", red: "FF0000", green: "008000", blue: "0000FF", yellow: "FFFF00", gray: "808080", grey: "808080" }[n.getAttribute("val")];
      a = r ? $(r) : null;
      break;
    }
    case "schemeClr": {
      const r = n.getAttribute("val");
      if (r === "phClr") {
        if (!s)
          return null;
        a = s.rgb, o = s.alpha;
      } else {
        const i = e.theme.colors[e.map[r] ?? r];
        a = i ? $(i) : null;
      }
      break;
    }
  }
  if (!a)
    return null;
  for (const r of n.children) {
    const i = +r.getAttribute("val") / 1e5;
    switch (r.localName) {
      case "lumMod":
      case "lumOff":
      case "satMod": {
        const l = Ct(a);
        r.localName === "lumMod" ? l[2] = Math.min(1, l[2] * i) : r.localName === "lumOff" ? l[2] = Math.max(0, Math.min(1, l[2] + i)) : l[1] = Math.min(1, l[1] * i), a = ct(l);
        break;
      }
      // Tint and shade work in linear light (as PowerPoint draws them): 75 % of black is a mid grey.
      case "tint":
        a = a.map((l) => lt(1 - (1 - it(l)) * i));
        break;
      case "shade":
        a = a.map((l) => lt(it(l) * i));
        break;
      case "alpha":
        o = i;
        break;
    }
  }
  return { rgb: a, alpha: o, toString: () => o < 1 ? "rgba(" + a.join(",") + "," + o.toFixed(3) + ")" : "rgb(" + a.join(",") + ")" };
}
function z(n, e, s) {
  return Tt([...n?.children ?? []].find((a) => kt.has(a.localName)), e, s);
}
function _(n) {
  return [...n?.children ?? []].find((e) => Ft.has(e.localName)) ?? null;
}
async function J(n, e, s, a) {
  switch (n?.localName) {
    case "noFill":
      return "transparent";
    case "solidFill":
      return String(z(n, e, a) ?? "") || null;
    case "gradFill": {
      const o = y(n, t.a, "gs").map((i) => ({ at: +i.getAttribute("pos") / 1e3, color: z(i, e, a) })).filter((i) => i.color).sort((i, l) => i.at - l.at).map((i) => i.color + " " + i.at.toFixed(1) + "%");
      return o.length === 0 ? null : o.length === 1 ? o[0].split(" ")[0] : c(n, t.a, "path") ? "radial-gradient(circle," + o.join(",") + ")" : "linear-gradient(" + (+(c(n, t.a, "lin")?.getAttribute("ang") ?? 0) / 6e4 + 90).toFixed(1) + "deg," + o.join(",") + ")";
    }
    case "blipFill": {
      const o = c(n, t.a, "blip")?.getAttributeNS(t.r, "embed"), r = o && s?.rels[o] ? await V(e.zip, s.rels[o].target) : null;
      return r ? c(n, t.a, "tile") ? "url(" + r + ") repeat" : "url(" + r + ") center/100% 100% no-repeat" : null;
    }
    case "pattFill":
      return String(z(c(n, t.a, "bgClr"), e, a) ?? "") || null;
    default:
      return null;
  }
}
function rt(n, e, s) {
  const a = +(n?.getAttribute("idx") ?? 0), r = (s === "line" ? e.theme.lines : a >= 1001 ? e.theme.backgrounds : e.theme.fills)[a >= 1001 ? a - 1001 : a - 1] ?? null;
  return a > 0 && r ? { entry: r, phClr: z(n, e) } : null;
}
async function Pt(n, e) {
  for (const s of n) {
    const a = y(s.doc, t.p, "bg")[0];
    if (!a)
      continue;
    const o = c(a, t.p, "bgPr");
    if (o) {
      const i = await J(_(o), e, s);
      if (i)
        return i;
    }
    const r = rt(c(a, t.p, "bgRef"), e, "fill");
    if (r) {
      const i = await J(r.entry, e, s, r.phClr);
      if (i)
        return i;
    }
  }
  return "#fff";
}
function D(n) {
  const e = y(n, t.p, "ph")[0];
  return e ? { type: e.getAttribute("type") || "body", idx: e.getAttribute("idx") } : null;
}
function Lt(n, e) {
  const s = D(n);
  if (!s)
    return [];
  const a = [];
  for (const o of e) {
    const r = y(o.doc, t.p, "sp").filter((l) => D(l)), i = r.find((l) => s.idx && D(l).idx === s.idx) ?? r.find((l) => {
      const f = D(l).type;
      return f === s.type || s.type === "ctrTitle" && f === "title" || s.type === "subTitle" && f === "body";
    });
    i && a.push(i);
  }
  return a;
}
function ut(n) {
  const e = c(n, t.p, "spPr") ?? c(n, t.p, "grpSpPr"), s = c(e, t.a, "xfrm") ?? c(n, t.p, "xfrm"), a = c(s, t.a, "off"), o = c(s, t.a, "ext");
  if (!a || !o)
    return null;
  const r = { x: +a.getAttribute("x"), y: +a.getAttribute("y"), w: +o.getAttribute("cx"), h: +o.getAttribute("cy"), rotation: +(s.getAttribute("rot") ?? 0) / 6e4 }, i = c(s, t.a, "chOff"), l = c(s, t.a, "chExt");
  return i && l && (r.child = { x: +i.getAttribute("x"), y: +i.getAttribute("y"), w: +l.getAttribute("cx") || 1, h: +l.getAttribute("cy") || 1 }), r;
}
function q(n, e) {
  return c(n, t.a, "lvl" + (e + 1) + "pPr");
}
function It(n, e, s, a) {
  const o = D(n)?.type, r = o === "title" || o === "ctrTitle" ? "titleStyle" : o && o !== "dt" && o !== "ftr" && o !== "sldNum" ? "bodyStyle" : "otherStyle";
  return [
    q(c(c(n, t.p, "txBody"), t.a, "lstStyle"), a),
    ...e.map((i) => q(c(c(i, t.p, "txBody"), t.a, "lstStyle"), a)),
    q(c(y(s.master.doc, t.p, "txStyles")[0], t.p, r), a),
    q(s.defaultText, a)
  ].filter(Boolean);
}
const ft = {
  Calibri: "Carlito",
  Cambria: "Caladea",
  Arial: "Liberation Sans",
  Helvetica: "Liberation Sans",
  "Times New Roman": "Liberation Serif",
  "Courier New": "Liberation Mono",
  "Calibri Light": "Carlito"
};
function bt(n) {
  const e = n?.replace(/[^\p{L}\p{N} ._-]/gu, "");
  return e ? "'" + e + "'," + (ft[e] ? "'" + ft[e] + "'," : "") : "";
}
function K(n, e) {
  return bt(n === "+mj-lt" ? e.theme.major : n === "+mn-lt" ? e.theme.minor : n);
}
function mt(n, e, s, { color: a = null } = {}) {
  return O(n, t.a, "p").map((o) => {
    const r = c(o, t.a, "pPr"), i = +(r?.getAttribute("lvl") ?? 0), l = [r, ...s(i)].filter(Boolean), f = (p) => {
      for (const b of l) {
        const w = p(b);
        if (w != null)
          return w;
      }
      return null;
    }, u = (p) => f((b) => p(c(b, t.a, "defRPr"))), h = ["text-align:" + ({ ctr: "center", r: "right", just: "justify" }[f((p) => p.getAttribute("algn"))] ?? "left"), "margin-left:" + C(+(f((p) => p.getAttribute("marL")) ?? 0) / W * e.scale)], m = f((p) => {
      if (c(p, t.a, "buNone"))
        return "";
      const b = c(p, t.a, "buChar")?.getAttribute("char");
      return b ? vt[b] ?? b : c(p, t.a, "buAutoNum") ? "•" : null;
    }), g = [...o.children].map((p) => {
      if (p.localName === "br")
        return "<br>";
      if (p.localName !== "r" && p.localName !== "fld")
        return "";
      const b = c(p, t.a, "rPr"), w = (S) => b && S(b) !== null && S(b) !== void 0 ? S(b) : u(S), N = +(w((S) => S?.getAttribute("sz")) ?? 1800) / 100, x = ["font-size:" + C(N * (96 / 72) * e.scale)];
      w((S) => S?.getAttribute("b")) === "1" && x.push("font-weight:bold"), w((S) => S?.getAttribute("i")) === "1" && x.push("font-style:italic"), (w((S) => S?.getAttribute("u")) ?? "none") !== "none" && x.push("text-decoration:underline");
      const j = (S) => c(S, t.a, "solidFill") ? z(c(S, t.a, "solidFill"), e) : null, T = (b && j(b)) ?? (a ? null : u(j));
      T && x.push("color:" + T);
      const F = w((S) => c(S, t.a, "latin")?.getAttribute("typeface") ?? null);
      return F && x.push("font-family:" + K(F, e) + "system-ui,sans-serif"), '<span style="' + x.join(";") + '">' + Q(c(p, t.a, "t")?.textContent ?? "") + "</span>";
    }).join(""), k = g && m ? '<span style="display:inline-block;width:1.2em;margin-left:-1.2em">' + Q(m) + "</span>" : "";
    return k && h.push("padding-left:1.2em"), '<p style="' + h.join(";") + '">' + k + (g || '<span style="font-size:' + C(+(u((p) => p?.getAttribute("sz")) ?? 1800) / 100 * (96 / 72) * e.scale) + '">&nbsp;</span>') + "</p>";
  }).join("");
}
const Rt = "{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}";
function pt(n, e) {
  const s = n.theme.colors.accent1;
  return s ? "rgb(" + $(s).map((o) => Math.round(e === 1 ? o : 255 - (255 - o) * e)).join(",") + ")" : null;
}
function Bt(n, e) {
  const s = c(n, t.a, "tblPr"), a = c(s, t.a, "tableStyleId")?.textContent?.trim(), o = (!a || a === Rt) && e.theme.colors.accent1, r = s?.getAttribute("firstRow") === "1", i = s?.getAttribute("bandRow") === "1";
  return '<table style="width:100%;height:100%">' + O(n, t.a, "tr").map((f, u) => {
    const d = r && u === 0, h = i && (r ? u - 1 : u) % 2 === 0;
    return "<tr>" + O(f, t.a, "tc").map((g) => {
      const k = _(c(g, t.a, "tcPr")), b = (k?.localName === "solidFill" ? z(k, e) : null) ?? (o ? d ? pt(e, 1) : pt(e, h ? 0.4 : 0.2) : null), w = [];
      b && w.push("background:" + b), o && w.push("border:1px solid #fff", "color:" + (d ? "#fff" : "#000")), o && d && w.push("font-weight:bold");
      const N = mt(c(g, t.a, "txBody"), e, (x) => [q(e.defaultText, x)].filter(Boolean), { color: o });
      return "<td" + (w.length ? ' style="' + w.join(";") + '"' : "") + ">" + N + "</td>";
    }).join("") + "</tr>";
  }).join("") + "</table>";
}
function Et(n, e) {
  const s = c(c(n, t.p, "spPr"), t.a, "ln"), a = rt(c(c(n, t.p, "style"), t.a, "lnRef"), e, "line"), o = _(s) ?? _(a?.entry);
  if (!o || o.localName !== "solidFill")
    return "";
  const r = z(o, e, _(s) ? null : a?.phClr), i = Math.max(1, +(s?.getAttribute("w") ?? a?.entry.getAttribute("w") ?? 9525) / W * e.scale), l = c(s, t.a, "prstDash")?.getAttribute("val") ?? c(a?.entry, t.a, "prstDash")?.getAttribute("val");
  return r ? "border:" + C(i) + " " + (l && l !== "solid" ? "dashed" : "solid") + " " + r : "";
}
function zt(n, e, s) {
  const a = c(c(n, t.p, "spPr"), t.a, "prstGeom")?.getAttribute("prst");
  return a === "ellipse" ? ";border-radius:50%" : a === "roundRect" ? ";border-radius:" + C(Math.min(e.w, e.h) / 6 / W * s.scale) : "";
}
async function Y(n, e, s, { inherited: a = [], placeholders: o = !0, at: r = (i) => i } = {}) {
  const i = [];
  for (const l of n ? [...n.children] : []) {
    if (!["sp", "pic", "graphicFrame", "grpSp", "cxnSp"].includes(l.localName))
      continue;
    const f = D(l);
    if (f && !o || y(l, t.p, "cNvPr")[0]?.getAttribute("hidden") === "1")
      continue;
    const u = f ? Lt(l, a) : [], h = ut(l) ?? u.map(ut).find(Boolean);
    if (!h)
      continue;
    const m = r(h), { width: g, height: k } = s;
    let p = "left:" + E(m.x, g) + ";top:" + E(m.y, k) + ";width:" + E(m.w, g) + ";height:" + E(m.h, k);
    if (m.rotation && (p += ";transform:rotate(" + m.rotation.toFixed(2) + "deg)"), l.localName === "grpSp") {
      const A = h.child, I = A ? m.w / A.w : 1, B = A ? m.h / A.h : 1;
      i.push(...await Y(l, e, s, {
        inherited: a,
        placeholders: o,
        at: (H) => ({ ...H, x: m.x + (H.x - (A?.x ?? 0)) * I, y: m.y + (H.y - (A?.y ?? 0)) * B, w: H.w * I, h: H.h * B })
      }));
      continue;
    }
    if (l.localName === "pic") {
      const A = c(l, t.p, "blipFill"), I = c(A, t.a, "blip")?.getAttributeNS(t.r, "embed"), B = I && e.rels[I] ? await V(s.zip, e.rels[I].target) : null;
      B && i.push('<img class="box" style="' + p + ';object-fit:fill" src="' + B + '" alt="">');
      continue;
    }
    if (l.localName === "graphicFrame") {
      const A = y(l, t.a, "tbl")[0];
      A && i.push('<div class="box" style="' + p + '">' + Bt(A, s) + "</div>");
      continue;
    }
    const b = [l, ...u].find((A) => _(c(A, t.p, "spPr")));
    let w = b ? await J(_(c(b, t.p, "spPr")), s, b === l ? e : null) : null;
    if (!b) {
      const A = rt(c(c(l, t.p, "style"), t.a, "fillRef"), s, "fill");
      w = A ? await J(A.entry, s, e, A.phClr) : null;
    }
    const N = Et(l, s), x = [p, "padding:0"];
    if (w && x.push("background:" + w), l.localName === "cxnSp") {
      N && x.push(N.replace("border:", "border-top:"), "height:0"), i.push('<div class="box" style="' + x.join(";") + '"></div>');
      continue;
    }
    N && x.push(N);
    const j = c(l, t.p, "txBody"), T = [c(j, t.a, "bodyPr"), ...u.map((A) => c(c(A, t.p, "txBody"), t.a, "bodyPr"))].filter(Boolean), F = (A, I) => {
      for (const B of T)
        if (B.hasAttribute(A))
          return B.getAttribute(A);
      return I;
    }, S = (A, I) => C(+F(A, I) / W * s.scale);
    x.push("padding:" + [S("tIns", 45720), S("rIns", 91440), S("bIns", 45720), S("lIns", 91440)].join(" ")), x.push("display:flex;flex-direction:column;justify-content:" + ({ ctr: "center", b: "flex-end" }[F("anchor", "t")] ?? "flex-start"));
    const U = c(c(l, t.p, "style"), t.a, "fontRef"), L = z(U, s);
    L && x.push("color:" + L);
    const P = { major: "+mj-lt", minor: "+mn-lt" }[U?.getAttribute("idx")];
    P && K(P, s) && x.push("font-family:" + K(P, s) + "system-ui,sans-serif");
    const v = j ? mt(j, s, (A) => It(l, u, s, A), { color: L }) : "";
    i.push('<div class="box" style="' + x.join(";") + zt(l, m, s) + '"><div>' + v + "</div></div>");
  }
  return i;
}
async function Ot(n) {
  const e = await gt.loadAsync(n), s = await at(e, "ppt/presentation.xml"), a = s.doc, o = y(a, t.p, "sldSz")[0], r = +(o?.getAttribute("cx") ?? 12192e3), i = +(o?.getAttribute("cy") ?? 6858e3), l = nt / (r / W), f = y(a, t.p, "defaultTextStyle")[0] ?? null, u = /* @__PURE__ */ new Map(), d = async (m) => (u.has(m) || u.set(m, await at(e, m)), u.get(m)), h = [];
  for (const m of y(a, t.p, "sldId")) {
    const g = await d(s.rels[m.getAttributeNS(t.r, "id")]?.target);
    if (!g)
      continue;
    const k = await d(Z(g, "slideLayout")), p = await d(Z(k, "slideMaster")), b = await d(Z(p, "theme")), w = b ? jt(b.doc) : { colors: {}, fills: [], lines: [], backgrounds: [] };
    let N = ot(y(p?.doc, t.p, "clrMap")[0], {});
    for (const P of [k, g]) {
      const v = y(P?.doc, t.a, "overrideClrMapping")[0];
      v && (N = ot(v, N));
    }
    const x = { zip: e, theme: w, map: N, width: r, height: i, scale: l, defaultText: f, master: p ?? { doc: null } }, j = [k, p].filter(Boolean), T = (P) => y(P?.doc, t.p, "sld")[0]?.getAttribute("showMasterSp") !== "0" && y(P?.doc, t.p, "sldLayout")[0]?.getAttribute("showMasterSp") !== "0", F = [];
    p && T(g) && T(k) && F.push(...await Y(y(p.doc, t.p, "spTree")[0], p, x, { placeholders: !1 })), k && T(g) && F.push(...await Y(y(k.doc, t.p, "spTree")[0], k, x, { placeholders: !1 })), F.push(...await Y(y(g.doc, t.p, "spTree")[0], g, x, { inherited: j }));
    const S = await Pt([g, ...j], x), U = w.colors[N.tx1 ?? "dk1"], L = K("+mn-lt", x);
    h.push('<div class="slide" style="aspect-ratio:' + r + "/" + i + ";background:" + S + (U ? ";color:#" + U : "") + (L ? ";font-family:" + L + "system-ui,sans-serif" : "") + '">' + F.join("") + "</div>");
  }
  return st(h.join(""));
}
const Ut = { cm: 96 / 2.54, mm: 96 / 25.4, in: 96, pt: 96 / 72, pc: 16, px: 1 };
function M(n) {
  const e = /^(-?[\d.]+)([a-z]+)?$/.exec(n ?? "");
  return e ? +e[1] * (Ut[e[2] ?? "px"] ?? 1) : 0;
}
function ht(n, e = (s) => s.toFixed(1) + "px") {
  const s = {};
  for (const a of n)
    for (const o of y(a, t.style, "style")) {
      const r = c(o, t.style, "text-properties"), i = [];
      if (r) {
        const u = r.getAttributeNS(t.fo, "font-weight");
        (u === "bold" || +u >= 600) && i.push("font-weight:bold"), r.getAttributeNS(t.fo, "font-style") === "italic" && i.push("font-style:italic");
        const d = r.getAttributeNS(t.fo, "font-size");
        d && !d.endsWith("%") && i.push("font-size:" + e(M(d)));
        const h = r.getAttributeNS(t.fo, "color");
        h && i.push("color:" + h), (r.getAttributeNS(t.style, "text-underline-style") || "none") !== "none" && i.push("text-decoration:underline");
      }
      const l = c(o, t.style, "paragraph-properties"), f = l?.getAttributeNS(t.fo, "text-align");
      if (f && i.push("text-align:" + ({ start: "left", end: "right" }[f] ?? f)), o.getAttributeNS(t.style, "family") === "table-cell") {
        const u = c(o, t.style, "table-cell-properties"), d = c(o, t.loext, "graphic-properties"), h = u?.getAttributeNS(t.fo, "background-color") || (d?.getAttributeNS(t.draw, "fill") === "solid" ? d.getAttributeNS(t.draw, "fill-color") : "");
        h && h !== "transparent" && i.push("background:" + h);
        const m = u?.getAttributeNS(t.fo, "border") || l?.getAttributeNS(t.fo, "border");
        m && m !== "none" && i.push("border:" + m);
      }
      s[o.getAttributeNS(t.style, "name")] = i.join(";");
    }
  return s;
}
async function X(n, e, s, a = 1) {
  const o = [];
  for (const r of n.childNodes) {
    if (r.nodeType === 3) {
      o.push(Q(r.textContent));
      continue;
    }
    if (r.nodeType !== 1)
      continue;
    const i = s[r.getAttributeNS(t.text, "style-name")] ?? "", l = i ? ' style="' + i + '"' : "", f = () => X(r, e, s, a);
    switch (r.namespaceURI === t.text || r.namespaceURI === t.table || r.namespaceURI === t.draw ? r.localName : "") {
      case "h": {
        const u = Math.min(6, Math.max(1, +(r.getAttributeNS(t.text, "outline-level") || 1)));
        o.push("<h" + u + l + ">" + await f() + "</h" + u + ">");
        break;
      }
      case "p":
        o.push("<p" + l + ">" + (await f() || "&nbsp;") + "</p>");
        break;
      case "span":
      case "a":
        o.push("<span" + l + ">" + await f() + "</span>");
        break;
      case "s":
        o.push("&nbsp;".repeat(+(r.getAttributeNS(t.text, "c") || 1)));
        break;
      case "tab":
        o.push("&emsp;");
        break;
      case "line-break":
        o.push("<br>");
        break;
      case "list":
        o.push("<ul>" + await f() + "</ul>");
        break;
      case "list-item":
      case "list-header": {
        const u = [...r.children].some((d) => d.localName !== "list");
        o.push((u ? "<li>" : '<li style="list-style:none">') + await f() + "</li>");
        break;
      }
      case "table":
        o.push("<table>" + await f() + "</table>");
        break;
      case "table-row": {
        const u = r.getAttributeNS(t.table, "default-cell-style-name"), d = [];
        for (const h of r.children) {
          if (h.namespaceURI !== t.table || h.localName !== "table-cell")
            continue;
          const m = s[h.getAttributeNS(t.table, "style-name") || u] ?? "", g = +(h.getAttributeNS(t.table, "number-columns-spanned") || 1);
          d.push("<td" + (g > 1 ? ' colspan="' + g + '"' : "") + (m ? ' style="' + m + '"' : "") + ">" + await X(h, e, s, a) + "</td>");
        }
        o.push("<tr>" + d.join("") + "</tr>");
        break;
      }
      case "table-cell":
        o.push("<td>" + await f() + "</td>");
        break;
      case "table-header-rows":
      case "table-rows":
      case "section":
      case "text-box":
        o.push(await f());
        break;
      case "frame":
        o.push(await f());
        break;
      case "image": {
        const u = await V(e, r.getAttributeNS(t.xlink, "href") ?? "");
        u && o.push('<img src="' + u + '" alt="">');
        break;
      }
      default:
        (r.namespaceURI === t.text || r.namespaceURI === t.draw) && o.push(await f());
    }
  }
  return o.join("");
}
async function yt(n) {
  const e = await gt.loadAsync(n), s = G(await e.file("content.xml").async("string")), a = e.file("styles.xml") ? G(await e.file("styles.xml").async("string")) : null;
  return { zip: e, content: s, styles: a, css: ht([a, s]) };
}
async function Ht(n) {
  const { zip: e, content: s, css: a } = await yt(n), o = y(s, t.office, "text")[0];
  return st('<div class="doc">' + (o ? await X(o, e, a) : "") + "</div>");
}
function dt(n, e) {
  const s = (o, r) => {
    const i = /* @__PURE__ */ new Map();
    for (const l of O(o, t.style, "style"))
      l.getAttributeNS(t.style, "family") === r && i.set(l.getAttributeNS(t.style, "name"), l);
    return i;
  }, a = y(e, t.office, "styles")[0];
  return (o, r) => {
    const i = [];
    let l = s(y(n, t.office, "automatic-styles")[0], o).get(r) ?? s(a, o).get(r);
    for (; l && i.length < 10; )
      i.push(l), l = s(a, o).get(l.getAttributeNS(t.style, "parent-style-name"));
    const f = O(a, t.style, "default-style").find((u) => u.getAttributeNS(t.style, "family") === o);
    return f ? [...i, f] : i;
  };
}
function R(n, e, s, a) {
  for (const o of n) {
    const r = c(o, t.style, e)?.getAttributeNS(s, a);
    if (r)
      return r;
  }
  return null;
}
async function tt(n, e, s, a) {
  const o = R(n, e, t.draw, "fill"), r = (i) => R(n, e, t.draw, i);
  switch (o) {
    case "none":
      return "transparent";
    case "solid":
      return r("fill-color") || null;
    case "gradient": {
      const i = y(a, t.draw, "gradient").find((g) => g.getAttributeNS(t.draw, "name") === r("fill-gradient-name"));
      if (!i)
        return r("fill-color") || null;
      const l = i.getAttributeNS(t.draw, "start-color") || "#ffffff", f = i.getAttributeNS(t.draw, "end-color") || "#000000", u = i.getAttributeNS(t.draw, "style") || "linear", d = i.getAttributeNS(t.draw, "angle") || "0", h = /deg$/.test(d) ? parseFloat(d) : /rad$/.test(d) ? parseFloat(d) * 180 / Math.PI : parseFloat(d) / 10;
      if (u === "radial" || u === "ellipsoid" || u === "square" || u === "rectangular")
        return "radial-gradient(circle," + f + "," + l + ")";
      const m = (180 - h).toFixed(1) + "deg";
      return u === "axial" ? "linear-gradient(" + m + "," + l + "," + f + " 50%," + l + ")" : "linear-gradient(" + m + "," + l + "," + f + ")";
    }
    case "bitmap": {
      const i = y(a, t.draw, "fill-image").find((f) => f.getAttributeNS(t.draw, "name") === r("fill-image-name")), l = i ? await V(s, i.getAttributeNS(t.xlink, "href") ?? "") : null;
      return l ? r("fill-image-ref-point") || R(n, e, t.style, "repeat") === "repeat" ? "url(" + l + ") repeat" : "url(" + l + ") center/100% 100% no-repeat" : null;
    }
    default:
      return null;
  }
}
async function et(n, e, s, { masterPage: a = !1 } = {}) {
  const o = [];
  for (const r of [...n.children]) {
    if (r.namespaceURI === t.draw && r.localName === "g") {
      o.push(...await et(r, e, s, { masterPage: a }));
      continue;
    }
    const i = r.getAttributeNS(t.svg, "x"), l = r.getAttributeNS(t.svg, "y");
    if (i === null || l === null || a && r.hasAttributeNS(t.presentation, "class"))
      continue;
    const { width: f, height: u, scale: d, find: h, styles: m } = s, g = [
      "left:" + E(M(i), f),
      "top:" + E(M(l), u),
      "width:" + E(M(r.getAttributeNS(t.svg, "width")), f),
      "height:" + E(M(r.getAttributeNS(t.svg, "height")), u),
      "font-size:" + C(18 * d * 96 / 72)
    ], k = r.getAttributeNS(t.draw, "style-name"), p = [...k ? h("graphic", k) : [], ...h("presentation", r.getAttributeNS(t.presentation, "style-name") ?? "")], b = r.localName === "frame" && !c(r, t.draw, "text-box"), w = b ? null : await tt(p, "graphic-properties", e, m);
    w && g.push("background:" + w);
    const N = (v, A) => R(p, "text-properties", v, A), x = N(t.fo, "font-weight");
    (x === "bold" || +x >= 600) && g.push("font-weight:bold"), N(t.fo, "font-style") === "italic" && g.push("font-style:italic"), N(t.fo, "color") && g.push("color:" + N(t.fo, "color")), N(t.fo, "font-size") && !N(t.fo, "font-size").endsWith("%") && (g[4] = "font-size:" + C(M(N(t.fo, "font-size")) * d));
    const j = N(t.style, "font-name"), T = j ? y(m, t.style, "font-face").find((v) => v.getAttributeNS(t.style, "name") === j)?.getAttributeNS(t.svg, "font-family") : null;
    T && g.push("font-family:" + bt(T.replace(/^'|'$/g, "")) + "system-ui,sans-serif");
    const F = R(p, "paragraph-properties", t.fo, "text-align");
    F && g.push("text-align:" + ({ start: "left", end: "right" }[F] ?? F));
    const S = R(p, "graphic-properties", t.draw, "textarea-vertical-align");
    g.push("display:flex;flex-direction:column;justify-content:" + ({ middle: "center", bottom: "flex-end" }[S] ?? "flex-start"));
    const U = ["top", "right", "bottom", "left"].map((v) => C(M(R(p, "graphic-properties", t.fo, "padding-" + v) || "0") * d));
    g.push("padding:" + U.join(" "));
    const L = b ? null : R(p, "graphic-properties", t.draw, "stroke");
    if (L && L !== "none") {
      const v = Math.max(1, M(R(p, "graphic-properties", t.svg, "stroke-width") || "0") * d);
      g.push("border:" + C(v) + " " + (L === "dash" ? "dashed" : "solid") + " " + (R(p, "graphic-properties", t.svg, "stroke-color") || "#000"));
    }
    const P = (y(r, t.draw, "enhanced-geometry")[0]?.getAttributeNS(t.draw, "type") ?? "").replace(/^ooxml-/, "");
    if (r.localName === "ellipse" || r.localName === "circle" || P === "ellipse")
      g.push("border-radius:50%");
    else if (["roundRect", "round-rectangle", "round-square"].includes(P)) {
      const v = Math.min(M(r.getAttributeNS(t.svg, "width")), M(r.getAttributeNS(t.svg, "height")));
      g.push("border-radius:" + C(v / 6 * d));
    }
    o.push('<div class="box" style="' + g.join(";") + '"><div>' + await X(r, e, s.css, d) + "</div></div>");
  }
  return o;
}
async function $t(n) {
  const { zip: e, content: s, styles: a } = await yt(n), o = new Map(y(a, t.style, "master-page").map((b) => [b.getAttributeNS(t.style, "name"), b]));
  let r = M("28cm"), i = M("15.75cm");
  const l = [...o.values()][0], f = l?.getAttributeNS(t.style, "page-layout-name"), u = y(a, t.style, "page-layout").find((b) => b.getAttributeNS(t.style, "name") === f), d = c(u, t.style, "page-layout-properties");
  d && (r = M(d.getAttributeNS(t.fo, "page-width")) || r, i = M(d.getAttributeNS(t.fo, "page-height")) || i);
  const h = nt / r, m = { width: r, height: i, scale: h, styles: a, css: ht([a, s], (b) => C(b * h)) }, g = { ...m, find: dt(s, a) }, k = { ...m, find: dt(a, a) }, p = [];
  for (const b of y(s, t.draw, "page")) {
    const w = o.get(b.getAttributeNS(t.draw, "master-page-name")) ?? l, N = await tt(g.find("drawing-page", b.getAttributeNS(t.draw, "style-name") ?? ""), "drawing-page-properties", e, a) ?? await tt(k.find("drawing-page", w?.getAttributeNS(t.draw, "style-name") ?? ""), "drawing-page-properties", e, a) ?? "#fff", x = [...w ? await et(w, e, k, { masterPage: !0 }) : [], ...await et(b, e, g)];
    p.push('<div class="slide" style="aspect-ratio:' + r.toFixed(1) + "/" + i.toFixed(1) + ";background:" + N + '">' + x.join("") + "</div>");
  }
  return st(p.join(""));
}
export {
  $t as odpPage,
  Ht as odtPage,
  Ot as pptxPage
};
