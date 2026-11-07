import { r as l, u as i, a as p } from "./cryptomator_vaults-office-libraries-BlJ6tdmh.mjs";
import { d as c, p as d } from "./cryptomator_vaults-sandbox-DTyXRA90.mjs";
const m = 2e3;
async function h(n) {
  const e = document.createElement("div"), t = document.createElement("div");
  return await p(new Blob([n]), e, t, {
    inWrapper: !0,
    useBase64URL: !0,
    ignoreLastRenderedPageBreak: !0,
    renderHeaders: !0,
    renderFooters: !0,
    experimental: !1
  }), c(e), d(t.innerHTML + "<style>body{margin:0;background:#eee}</style>", e.innerHTML);
}
function x(n) {
  const e = l(n, { type: "array", sheetRows: m + 1, cellHTML: !1, cellFormula: !1, dense: !0 }), t = document.createElement("div");
  for (const o of e.SheetNames) {
    const r = document.createElement("section"), s = document.createElement("h2");
    s.textContent = o, r.append(s);
    const a = document.createElement("div");
    a.innerHTML = i.sheet_to_html(e.Sheets[o], { header: "", footer: "" }), r.append(a), t.append(r);
  }
  return c(t), d("<style>body{font:13px system-ui,sans-serif;margin:8px}h2{font-size:15px;margin:16px 0 6px}table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:2px 6px;white-space:nowrap}</style>", t.innerHTML);
}
export {
  h as docxPage,
  x as sheetPage
};
