import { d as w, p as f, e as p } from "./cryptomator_vaults-sandbox-DTyXRA90.mjs";
const g = "<style>body{font:14px/1.5 system-ui,sans-serif;margin:12px 16px;color:#222;background:#fff}pre,code{background:#f4f4f4;border-radius:4px}pre{padding:8px;overflow:auto}code{padding:1px 3px}table{border-collapse:collapse}td,th{border:1px solid #ddd;padding:3px 8px;text-align:start}img{max-width:100%}blockquote{border-left:3px solid #ccc;margin-left:0;padding-left:12px;color:#555}</style>";
async function x(n) {
  const { marked: d } = await import("./cryptomator_vaults-marked.esm-p8cjBCFy.mjs"), e = document.createElement("div");
  return e.innerHTML = await d.parse(new TextDecoder("utf-8").decode(n), { async: !0, gfm: !0 }), w(e), f(g, e.innerHTML);
}
async function y(n) {
  const { default: d } = await import("./cryptomator_vaults-zip-CUMurq2b.mjs").then((r) => r.j), e = await d.loadAsync(n), o = [];
  let a = 0, i = 0;
  return e.forEach((r, t) => {
    const c = t.dir ? "" : t._data?.uncompressedSize ?? "";
    t.dir || (a++, i += Number(c) || 0), o.push("<tr><td>" + p(r) + "</td><td>" + p(c) + "</td><td>" + p(t.date ? t.date.toISOString().slice(0, 16).replace("T", " ") : "") + "</td></tr>");
  }), f(g, "<p>" + a + (a === 1 ? " file, " : " files, ") + i + (i === 1 ? " byte" : " bytes") + " unpacked</p><table><thead><tr><th>Name</th><th>Bytes</th><th>Modified</th></tr></thead><tbody>" + o.join("") + "</tbody></table>");
}
async function k(n) {
  const { default: d } = await import("./cryptomator_vaults-libheif-bundle-CIfX34WW.mjs"), e = await d(), o = new e.HeifDecoder().decode(n);
  if (!o.length)
    throw new Error("no image in the file");
  const a = o[0], i = a.get_width(), r = a.get_height(), t = document.createElement("canvas");
  t.width = i, t.height = r;
  const c = t.getContext("2d"), l = c.createImageData(i, r);
  await new Promise((s, m) => a.display(l, (u) => u ? s() : m(new Error("the picture does not decode")))), c.putImageData(l, 0, 0);
  for (const s of o)
    s.free?.();
  const h = await new Promise((s) => t.toBlob(s, "image/png"));
  return new Uint8Array(await h.arrayBuffer());
}
export {
  k as heicToPng,
  x as markdownPage,
  y as zipPage
};
