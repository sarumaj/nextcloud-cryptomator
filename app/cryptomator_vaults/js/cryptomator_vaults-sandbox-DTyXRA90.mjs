const n = "default-src 'none'; img-src data:; font-src data:; style-src 'unsafe-inline'";
function a(t, e) {
  return '<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="' + n + '"><meta name="referrer" content="no-referrer">' + t + "</head><body>" + e + "</body></html>";
}
function c(t) {
  for (const e of t.querySelectorAll("[href]"))
    e.removeAttribute("href");
  for (const e of t.querySelectorAll("[src], [srcset], [poster]"))
    for (const r of ["src", "srcset", "poster"]) {
      const o = e.getAttribute(r);
      o !== null && !o.startsWith("data:") && e.removeAttribute(r);
    }
  for (const e of t.querySelectorAll("script, iframe, object, embed, link, meta, base, form"))
    e.remove();
  for (const e of t.querySelectorAll("*"))
    for (const r of [...e.attributes])
      r.name.startsWith("on") && e.removeAttribute(r.name);
}
function s(t) {
  return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
export {
  c as d,
  s as e,
  a as p
};
