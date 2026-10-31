import { H as ue, t as de, q as pe, v as _t, J as fe, K as X, L as he, M as ye, s as me, F as I, O as Nt, Q as we, V as ge, x as Ft, P as it, R as ve, w as be, y as Ht, S as ke } from "./cryptomator_vaults-common.mjs";
var J = { exports: {} }, Ce = J.exports, Tt;
function Ae() {
  return Tt || (Tt = 1, (function(e) {
    (function(r, o) {
      e.exports ? e.exports = o(globalThis.crypto) : r.CryptomatorVault = o(r.crypto);
    })(typeof self < "u" ? self : Ce, function(r) {
      const o = r.subtle, c = new TextEncoder(), l = new TextDecoder("utf-8", { fatal: !0 });
      class d extends Error {
        constructor(t, n) {
          super(n || t), this.name = "VaultError", this.code = t;
        }
      }
      function w(u) {
        const t = u.replace(/-/g, "+").replace(/_/g, "/"), n = t + "=".repeat((4 - t.length % 4) % 4), a = atob(n), s = new Uint8Array(a.length);
        for (let i = 0; i < a.length; i++)
          s[i] = a.charCodeAt(i);
        return s;
      }
      function g(u, t) {
        let n = "";
        for (let s = 0; s < u.length; s++)
          n += String.fromCharCode(u[s]);
        const a = btoa(n).replace(/\+/g, "-").replace(/\//g, "_");
        return t ? a : a.replace(/=+$/, "");
      }
      const v = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      function T(u) {
        let t = "", n = 0, a = 0;
        for (const s of u)
          for (n = n << 8 | s, a += 8; a >= 5; )
            t += v[n >>> a - 5 & 31], a -= 5;
        return a > 0 && (t += v[n << 5 - a & 31]), t;
      }
      function b(...u) {
        const t = new Uint8Array(u.reduce((a, s) => a + s.length, 0));
        let n = 0;
        for (const a of u)
          t.set(a, n), n += a.length;
        return t;
      }
      function O(u) {
        const t = new Uint8Array(8);
        return new DataView(t.buffer).setBigUint64(0, BigInt(u)), t;
      }
      function N(u, t) {
        if (u.length !== t.length)
          return !1;
        let n = 0;
        for (let a = 0; a < u.length; a++)
          n |= u[a] ^ t[a];
        return n === 0;
      }
      async function wt(u, t, n) {
        const a = await o.importKey(
          "raw",
          u.length ? u : new Uint8Array(64),
          { name: "HMAC", hash: "SHA-256" },
          !1,
          ["sign"]
        ), s = new Uint8Array(n);
        for (let i = 1, f = 0; f < n; i++, f += 32) {
          const y = new Uint8Array([i >>> 24, i >>> 16 & 255, i >>> 8 & 255, i & 255]), h = new Uint8Array(await o.sign("HMAC", a, b(t, y)));
          s.set(h.subarray(0, Math.min(32, n - f)), f);
        }
        return s;
      }
      function ne(u) {
        const t = u.slice(), n = (a, s) => a << s | a >>> 32 - s;
        for (let a = 0; a < 8; a += 2)
          t[4] ^= n(t[0] + t[12], 7), t[8] ^= n(t[4] + t[0], 9), t[12] ^= n(t[8] + t[4], 13), t[0] ^= n(t[12] + t[8], 18), t[9] ^= n(t[5] + t[1], 7), t[13] ^= n(t[9] + t[5], 9), t[1] ^= n(t[13] + t[9], 13), t[5] ^= n(t[1] + t[13], 18), t[14] ^= n(t[10] + t[6], 7), t[2] ^= n(t[14] + t[10], 9), t[6] ^= n(t[2] + t[14], 13), t[10] ^= n(t[6] + t[2], 18), t[3] ^= n(t[15] + t[11], 7), t[7] ^= n(t[3] + t[15], 9), t[11] ^= n(t[7] + t[3], 13), t[15] ^= n(t[11] + t[7], 18), t[1] ^= n(t[0] + t[3], 7), t[2] ^= n(t[1] + t[0], 9), t[3] ^= n(t[2] + t[1], 13), t[0] ^= n(t[3] + t[2], 18), t[6] ^= n(t[5] + t[4], 7), t[7] ^= n(t[6] + t[5], 9), t[4] ^= n(t[7] + t[6], 13), t[5] ^= n(t[4] + t[7], 18), t[11] ^= n(t[10] + t[9], 7), t[8] ^= n(t[11] + t[10], 9), t[9] ^= n(t[8] + t[11], 13), t[10] ^= n(t[9] + t[8], 18), t[12] ^= n(t[15] + t[14], 7), t[13] ^= n(t[12] + t[15], 9), t[14] ^= n(t[13] + t[12], 13), t[15] ^= n(t[14] + t[13], 18);
        for (let a = 0; a < 16; a++)
          u[a] = u[a] + t[a] | 0;
      }
      function gt(u, t, n, a) {
        a.set(u.subarray((2 * n - 1) * 16, 2 * n * 16));
        for (let s = 0; s < 2 * n; s++) {
          for (let i = 0; i < 16; i++)
            a[i] ^= u[s * 16 + i];
          ne(a), t.set(a, ((s & 1) * n + (s >> 1)) * 16);
        }
      }
      function oe(u, t, n) {
        const a = 32 * n, s = new Int32Array(a * t), i = new Int32Array(u), f = new Int32Array(a), y = new Int32Array(16);
        for (let h = 0; h < t; h++)
          s.set(i, h * a), gt(i, f, n, y), i.set(f);
        for (let h = 0; h < t; h++) {
          const k = i[(2 * n - 1) * 16] & t - 1;
          for (let A = 0; A < a; A++)
            i[A] ^= s[k * a + A];
          gt(i, f, n, y), i.set(f);
        }
        return i;
      }
      function ae(u) {
        const t = new DataView(u.buffer, u.byteOffset, u.byteLength), n = new Int32Array(u.length / 4);
        for (let a = 0; a < n.length; a++)
          n[a] = t.getInt32(a * 4, !0);
        return n;
      }
      function se(u, t) {
        const n = new DataView(t.buffer, t.byteOffset, t.byteLength);
        for (let a = 0; a < u.length; a++)
          n.setInt32(a * 4, u[a], !0);
      }
      async function vt(u, t, n, a, s, i) {
        if (n < 2 || (n & n - 1) !== 0)
          throw new d("corrupt", "scrypt cost is not a power of two");
        const f = 128 * a, y = await wt(u, t, s * f);
        for (let h = 0; h < s; h++) {
          const k = y.subarray(h * f, (h + 1) * f);
          se(oe(ae(k), n, a), k);
        }
        return wt(u, y, i);
      }
      function j(u) {
        const t = new Uint8Array(16);
        for (let n = 0; n < 15; n++)
          t[n] = (u[n] << 1 | u[n + 1] >>> 7) & 255;
        return t[15] = u[15] << 1 & 255, u[0] & 128 && (t[15] ^= 135), t;
      }
      function F(u, t) {
        const n = new Uint8Array(u.length);
        for (let a = 0; a < u.length; a++)
          n[a] = u[a] ^ t[a];
        return n;
      }
      class bt {
        constructor(t) {
          this.key = t, this.subkeys = null;
        }
        async cbcLast(t) {
          return new Uint8Array(await o.encrypt({ name: "AES-CBC", iv: new Uint8Array(16) }, this.key, t)).subarray(t.length - 16, t.length);
        }
        async mac(t) {
          if (this.subkeys === null) {
            const y = await this.cbcLast(new Uint8Array(16)), h = j(y);
            this.subkeys = [h, j(h)];
          }
          const [n, a] = this.subkeys, s = Math.max(1, Math.ceil(t.length / 16)), i = new Uint8Array(s * 16);
          i.set(t);
          const f = i.subarray((s - 1) * 16);
          return t.length > 0 && t.length % 16 === 0 ? f.set(F(f, n)) : (f[t.length - (s - 1) * 16] = 128, f.set(F(f, a))), this.cbcLast(i);
        }
      }
      async function kt(u, t, n) {
        let a = await u.mac(new Uint8Array(16));
        for (const i of t)
          a = F(j(a), await u.mac(i));
        let s;
        if (n.length >= 16)
          s = n.slice(), s.set(F(s.subarray(s.length - 16), a), s.length - 16);
        else {
          const i = new Uint8Array(16);
          i.set(n), i[n.length] = 128, s = F(j(a), i);
        }
        return u.mac(s);
      }
      function Ct(u) {
        const t = u.slice();
        return t[8] &= 127, t[12] &= 127, t;
      }
      class At {
        constructor(t, n) {
          this.cmac = t, this.ctrKey = n;
        }
        async encrypt(t, n) {
          const a = await kt(this.cmac, n, t), s = await o.encrypt({ name: "AES-CTR", counter: Ct(a), length: 128 }, this.ctrKey, t);
          return b(a, new Uint8Array(s));
        }
        async decrypt(t, n) {
          if (t.length < 16)
            throw new d("corrupt", "name too short");
          const a = t.subarray(0, 16), s = new Uint8Array(await o.decrypt(
            { name: "AES-CTR", counter: Ct(a), length: 128 },
            this.ctrKey,
            t.subarray(16)
          ));
          if (!N(await kt(this.cmac, n, s), a))
            throw new d("corrupt", "name does not authenticate");
          return s;
        }
      }
      const H = 32 * 1024, Q = {
        SIV_GCM: { header: 68, nonce: 12, overhead: 28 },
        SIV_CTRMAC: { header: 88, nonce: 16, overhead: 48 }
      };
      function q(u, t) {
        const { header: n, overhead: a } = Q[u], s = t - n;
        if (s <= 0)
          return 0;
        const i = Math.floor(s / (H + a)), f = s % (H + a);
        return i * H + Math.max(0, f - a);
      }
      const St = "vault.cryptomator";
      function ie(u) {
        const t = u.trim().split(".");
        if (t.length !== 3)
          throw new d("unsupported-format", "vault.cryptomator is not a JWT");
        const n = (a) => JSON.parse(l.decode(w(a)));
        return { header: n(t[0]), payload: n(t[1]), signed: t[0] + "." + t[1], signature: w(t[2]) };
      }
      function R(...u) {
        return u.filter((t) => t !== "").join("/");
      }
      class Z {
        constructor(t, n, a) {
          this.storage = t, this.config = n, this.masterkeyFile = a, this.keys = null;
        }
        /** Reads the vault's configuration and key file; checks the format before any password. */
        static async open(t) {
          let n;
          try {
            n = ie(l.decode(await t.read(St)));
          } catch (h) {
            throw h instanceof d ? h : new d("unsupported-format", "vault.cryptomator unreadable: " + h.message);
          }
          const { header: a, payload: s } = n;
          if (s.format !== 8)
            throw new d("unsupported-format", "vault format " + s.format);
          if (!(s.cipherCombo in Q))
            throw new d("unsupported-format", "cipher combination " + s.cipherCombo);
          if (a.alg !== "HS256")
            throw new d("unsupported-format", "signature " + a.alg);
          const i = String(a.kid || "");
          if (!i.startsWith("masterkeyfile:"))
            throw new d("unsupported-key", i);
          const f = i.slice(14);
          if (!/^[^/\\]+$/.test(f))
            throw new d("unsupported-key", i);
          const y = JSON.parse(l.decode(await t.read(f)));
          return new Z(t, n, y);
        }
        get scheme() {
          return this.config.payload.cipherCombo;
        }
        get unlocked() {
          return this.keys !== null;
        }
        /** Derives the keys from the password; a VaultError 'wrong-password' if it is not the vault's. */
        async unlock(t) {
          const n = this.masterkeyFile, a = await vt(
            c.encode(String(t).normalize("NFC")),
            w(n.scryptSalt),
            n.scryptCostParam,
            n.scryptBlockSize,
            1,
            32
          ), s = await o.importKey("raw", a, "AES-KW", !1, ["unwrapKey"]);
          a.fill(0);
          let i, f;
          try {
            const y = async (h) => new Uint8Array(await o.exportKey(
              "raw",
              await o.unwrapKey("raw", w(h), s, "AES-KW", { name: "HMAC", hash: "SHA-256" }, !0, ["sign"])
            ));
            i = await y(n.primaryMasterKey), f = await y(n.hmacMasterKey);
          } catch {
            throw new d("wrong-password");
          }
          try {
            const y = await o.importKey("raw", b(i, f), { name: "HMAC", hash: "SHA-256" }, !1, ["verify"]);
            if (!await o.verify("HMAC", y, this.config.signature, c.encode(this.config.signed)))
              throw new d("corrupt", "vault.cryptomator is not signed with this key");
            const h = (k, A) => o.importKey("raw", k, A, !1, ["encrypt", "decrypt"]);
            this.keys = {
              gcm: await h(i, "AES-GCM"),
              ctr: await h(i, "AES-CTR"),
              mac: await o.importKey("raw", f, { name: "HMAC", hash: "SHA-256" }, !1, ["sign", "verify"])
            }, this.siv = new At(new bt(await h(f, "AES-CBC")), this.keys.ctr), this.dirPaths = /* @__PURE__ */ new Map();
          } finally {
            i.fill(0), f.fill(0);
          }
        }
        /** Forgets the keys; reading needs the password again. */
        lock() {
          this.keys = null, this.siv = null, this.dirPaths = null;
        }
        requireKeys() {
          if (!this.keys)
            throw new d("locked");
        }
        /** The storage folder of a directory: d/XX/YYYY… from the hash of its ID. */
        async dirPath(t) {
          if (this.requireKeys(), !this.dirPaths.has(t)) {
            const n = await this.siv.encrypt(c.encode(t), []), a = T(new Uint8Array(await o.digest("SHA-1", n)));
            this.dirPaths.set(t, R("d", a.slice(0, 2), a.slice(2)));
          }
          return this.dirPaths.get(t);
        }
        async decryptName(t, n) {
          const a = t.endsWith(".c9r") ? t.slice(0, -4) : t;
          try {
            return l.decode(await this.siv.decrypt(w(a), [c.encode(n)]));
          } catch (s) {
            throw s instanceof d ? s : new d("corrupt", "name not decryptable");
          }
        }
        /**
         * The entries of a directory (the root's ID is ''): {name, type ('file',
         * 'dir', 'link'), size (of a file, decrypted), dirId (of a directory), path
         * (in the storage), mtime (the storage's, if known)}. An entry that does not
         * decrypt is listed as type 'broken'.
         */
        async list(t) {
          const n = await this.dirPath(t), a = await this.storage.list(n);
          return (await Promise.all(a.map((i) => this.describe(n, i, t)))).filter((i) => i !== null).sort((i, f) => (f.type === "dir") - (i.type === "dir") || i.name.localeCompare(f.name));
        }
        async describe(t, n, a) {
          const s = R(t, n.name), i = await this.describeEntry(t, n, a, s);
          return i !== null && n.mtime && !i.mtime && (i.mtime = n.mtime), i;
        }
        async describeEntry(t, n, a, s) {
          try {
            if (n.name.endsWith(".c9s") && n.isDir) {
              const f = await this.decryptName(l.decode(await this.storage.read(R(s, "name.c9s"))).trim(), a), y = await this.storage.list(s), h = y.find((k) => k.name === "contents.c9r");
              return h ? { name: f, type: "file", size: q(this.scheme, h.size), path: R(s, "contents.c9r"), mtime: h.mtime } : this.describeNode(f, s, y.map((k) => k.name));
            }
            if (n.name === "dirid.c9r" || !n.name.endsWith(".c9r"))
              return null;
            const i = await this.decryptName(n.name, a);
            return n.isDir ? this.describeNode(i, s, null) : { name: i, type: "file", size: q(this.scheme, n.size), path: s };
          } catch (i) {
            return { name: n.name, type: "broken", error: i.message, path: s };
          }
        }
        // A folder <name>.c9r (or .c9s): a directory (dir.c9r, its ID) or a link (symlink.c9r).
        async describeNode(t, n, a) {
          const s = async (y) => {
            if (a !== null && !a.includes(y))
              return null;
            try {
              return await this.storage.read(R(n, y));
            } catch (h) {
              if (h instanceof d && h.code === "not-found")
                return null;
              throw h;
            }
          }, i = await s("dir.c9r");
          if (i !== null)
            return { name: t, type: "dir", dirId: l.decode(i).trim(), path: n };
          const f = await s("symlink.c9r");
          if (f !== null) {
            const y = l.decode(await this.decryptContents(f));
            return { name: t, type: "link", target: y, path: n };
          }
          throw new d("corrupt", "neither a directory nor a link");
        }
        /**
         * A file's decrypted contents: onProgress(done, total) after each chunk,
         * onDownload(done, total) while the storage reads it (if it reports that).
         */
        async readFile(t, n, a) {
          return this.decryptContents(await this.storage.read(t.path, a), n);
        }
        async decryptContents(t, n) {
          this.requireKeys();
          const a = Q[this.scheme];
          if (t.length === 0)
            return new Uint8Array(0);
          if (t.length < a.header)
            throw new d("corrupt", "file header too short");
          const s = t.subarray(0, a.header), i = s.subarray(0, a.nonce), f = await this.decryptHeader(s, i), y = t.subarray(a.header), h = H + a.overhead, k = new Uint8Array(q(this.scheme, t.length));
          for (let A = 0, L = 0; L < y.length; A++, L += h) {
            const ce = y.subarray(L, Math.min(L + h, y.length)), le = await this.decryptChunk(ce, A, i, f);
            k.set(le, A * H), n && n(Math.min(L + h, y.length), y.length);
          }
          return k;
        }
        async decryptHeader(t, n) {
          let a;
          if (this.scheme === "SIV_GCM")
            try {
              a = new Uint8Array(await o.decrypt({ name: "AES-GCM", iv: n }, this.keys.gcm, t.subarray(12)));
            } catch {
              throw new d("corrupt", "file header does not authenticate");
            }
          else {
            const y = t.subarray(16, 56);
            if (!await o.verify("HMAC", this.keys.mac, t.subarray(56, 88), t.subarray(0, 56)))
              throw new d("corrupt", "file header does not authenticate");
            a = new Uint8Array(await o.decrypt({ name: "AES-CTR", counter: n, length: 128 }, this.keys.ctr, y));
          }
          const s = a.subarray(8, 40), i = this.scheme === "SIV_GCM" ? "AES-GCM" : "AES-CTR", f = await o.importKey("raw", s, i, !1, ["decrypt"]);
          return a.fill(0), f;
        }
        async decryptChunk(t, n, a, s) {
          try {
            if (this.scheme === "SIV_GCM") {
              const h = t.subarray(0, 12);
              return new Uint8Array(await o.decrypt(
                { name: "AES-GCM", iv: h, additionalData: b(O(n), a) },
                s,
                t.subarray(12)
              ));
            }
            const i = t.subarray(0, 16), f = t.subarray(16, t.length - 32), y = t.subarray(t.length - 32);
            if (!await o.verify("HMAC", this.keys.mac, y, b(a, O(n), i, f)))
              throw new Error("mac");
            return new Uint8Array(await o.decrypt({ name: "AES-CTR", counter: i, length: 128 }, s, f));
          } catch {
            throw new d("corrupt", "chunk " + n + " does not authenticate");
          }
        }
      }
      return { Vault: Z, VaultError: d, cleartextSize: q, scrypt: vt, Siv: At, Cmac: bt, base32Encode: T, base64UrlEncode: g, base64Decode: w, VAULT_CONFIG: St };
    });
  })(J)), J.exports;
}
var Se = Ae();
const Rt = /* @__PURE__ */ ue(Se), Te = "cryptomator_vaults";
function p(e, r) {
  return de(Te, e, r, void 0, { escape: !1 });
}
const xe = 100 * 1024 * 1024, Ee = 5 * 1024 * 1024, Ve = 1024 * 1024 * 1024, nt = /* @__PURE__ */ new Set();
function m(e, r, o) {
  const c = document.createElement(e);
  for (const [l, d] of Object.entries(r || {}))
    d == null || d === !1 || (l === "class" ? c.className = d : l.startsWith("on") ? c.addEventListener(l.slice(2), d) : c.setAttribute(l, d === !0 ? "" : d));
  for (const l of [].concat(o ?? []))
    l != null && l !== !1 && c.append(l instanceof Node ? l : document.createTextNode(String(l)));
  return c;
}
function xt(e) {
  if (window.OC?.Util?.humanFileSize)
    return window.OC.Util.humanFileSize(e);
  const r = ["B", "KB", "MB", "GB", "TB"];
  let o = e, c = 0;
  for (; o >= 1024 && c < r.length - 1; )
    o /= 1024, c++;
  return (c === 0 ? o : o.toFixed(1)) + " " + r[c];
}
function P(e, r) {
  const o = URL.createObjectURL(new Blob([e], { type: r }));
  return nt.add(o), o;
}
function Ue() {
  for (const e of nt)
    URL.revokeObjectURL(e);
  nt.clear(), E();
}
function Lt(e, r) {
  const o = m("a", { href: P(r, "application/octet-stream"), download: e });
  document.body.append(o), o.click(), o.remove();
}
let D = null;
function E() {
  if (D) {
    const { dialog: e, onClose: r } = D;
    D = null, e.remove(), r?.();
  }
}
function Pt(e, r, o) {
  E();
  const c = m("div", {
    class: "cryptomator-dialog",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": e,
    onkeydown: (l) => {
      l.key === "Escape" && E();
    },
    onclick: (l) => {
      l.target === c && E();
    }
  }, m("div", { class: "cryptomator-dialog__panel" }, r));
  return D = { dialog: c, onClose: o }, document.body.append(c), c;
}
function S(e, r) {
  return m("p", { class: "cryptomator-notice" + (r ? " cryptomator-notice--" + r : ""), role: r === "error" ? "alert" : null }, e);
}
function Ie(e, r) {
  return new Promise((o) => {
    let c = !1;
    const l = m("input", { type: "password", name: "password", autocomplete: "current-password", required: !0, "aria-label": p("Password") }), d = m("div", { "aria-live": "polite" }), w = m("button", { type: "submit", class: "primary" }, p("Unlock"));
    Pt(e, [
      m("h2", {}, p("Unlock {vault}", { vault: e })),
      S(p("The password and the vault's keys stay in this browser tab: the server only sends the encrypted files.")),
      m("form", {
        class: "cryptomator-unlock",
        onsubmit: async (g) => {
          g.preventDefault(), w.disabled = !0, d.replaceChildren(S(p("Unlocking …"))), await new Promise((v) => setTimeout(v, 30));
          try {
            await r(l.value), l.value = "", c = !0, E(), o(!0);
          } catch (v) {
            w.disabled = !1, d.replaceChildren(S(v.message, "error")), l.select();
          }
        }
      }, [
        m("label", {}, [p("Password"), l]),
        w,
        m("button", { type: "button", onclick: E }, p("Cancel"))
      ]),
      d
    ], () => {
      l.value = "", c || o(!1);
    }), l.focus();
  });
}
const Me = ["png", "jpg", "jpeg", "gif", "webp", "avif", "bmp", "svg"], Et = { mp4: "video/mp4", m4v: "video/mp4", webm: "video/webm", mov: "video/quicktime", ogv: "video/ogg" }, Vt = { mp3: "audio/mpeg", m4a: "audio/mp4", ogg: "audio/ogg", oga: "audio/ogg", opus: "audio/ogg", wav: "audio/wav", flac: "audio/flac" }, Oe = [
  "txt",
  "md",
  "csv",
  "tsv",
  "json",
  "log",
  "xml",
  "yml",
  "yaml",
  "ini",
  "conf",
  "cfg",
  "toml",
  "js",
  "ts",
  "py",
  "sh",
  "php",
  "java",
  "go",
  "rs",
  "c",
  "h",
  "css",
  "html",
  "htm",
  "vcf",
  "ics",
  "tex"
];
function De(e) {
  const r = (/\.([^.]+)$/.exec(e)?.[1] ?? "").toLowerCase();
  return Me.includes(r) ? { kind: "image", type: r === "svg" ? "image/svg+xml" : "image/" + (r === "jpg" ? "jpeg" : r) } : r === "pdf" ? { kind: "pdf", type: "application/pdf" } : r in Et ? { kind: "video", type: Et[r] } : r in Vt ? { kind: "audio", type: Vt[r] } : Oe.includes(r) ? { kind: "text", type: "text/plain" } : { kind: "none" };
}
function _e(e, r, o) {
  switch (e.kind) {
    case "image":
      return m("img", { class: "cryptomator-preview", src: P(r, e.type), alt: o });
    case "pdf":
      return m("iframe", { class: "cryptomator-preview cryptomator-preview--frame", src: P(r, e.type), title: o });
    case "video":
      return m("video", { class: "cryptomator-preview", src: P(r, e.type), controls: !0 });
    case "audio":
      return m("audio", { class: "cryptomator-preview", src: P(r, e.type), controls: !0 });
    case "text":
      return m("pre", { class: "cryptomator-preview cryptomator-preview--text" }, new TextDecoder("utf-8").decode(r));
    default:
      return S(p("No preview for this file. Download it to open it."));
  }
}
async function Ne(e, r, o, c) {
  const l = De(e), d = l.kind !== "none" && r <= (l.kind === "text" ? Ee : xe);
  if (!d && r > Ve && !window.confirm(p("This file is {size}. Your browser holds it twice while decrypting. Continue?", { size: xt(r) })))
    return;
  const w = m("progress", { max: 1, value: 0 }), g = m("div", { class: "cryptomator-dialog__body" }, [S(p("Decrypting …")), w]), v = m("button", { type: "button", disabled: !0 }, p("Download")), T = Pt(e, [
    m("div", { class: "cryptomator-dialog__head" }, [
      m("h2", {}, e),
      m("span", { class: "cryptomator-dialog__meta" }, xt(r)),
      v,
      m("button", { type: "button", class: "cryptomator-dialog__close", onclick: E }, p("Close"))
    ]),
    g
  ]);
  T.querySelector(".cryptomator-dialog__close").focus();
  try {
    const b = await o((O, N) => {
      w.value = 0.5 + O / N / 2;
    }, (O, N) => {
      w.value = O / N / 2;
    });
    if (D?.dialog !== T)
      return;
    v.disabled = !1, v.addEventListener("click", () => Lt(e, b)), g.replaceChildren(d ? _e(l, b, e) : S(p("No preview for this file. Download it to open it.")));
  } catch (b) {
    D?.dialog === T && g.replaceChildren(S(c(b), "error"));
  }
}
const { VaultError: G } = Rt, tt = "DAV:";
function Fe() {
  return window.OC && window.OC.requestToken || document.head.dataset.requesttoken || "";
}
function ot(e) {
  return { requesttoken: Fe(), "X-Requested-With": "XMLHttpRequest", ...e || {} };
}
function W() {
  return pe()?.uid ?? "";
}
function at(e) {
  return e.split("/").filter((r) => r !== "").map(encodeURIComponent).join("/");
}
function He(e) {
  const r = at(e);
  return _t("dav") + "/files/" + encodeURIComponent(W()) + "/" + (r ? r + "/" : "");
}
function Bt(e) {
  const r = new DOMParser().parseFromString(e, "application/xml");
  return Array.from(r.getElementsByTagNameNS(tt, "response")).map((o) => {
    const c = (w) => o.getElementsByTagNameNS(tt, w)[0], l = c("getcontentlength"), d = c("getlastmodified");
    return {
      href: c("href").textContent,
      isDir: o.getElementsByTagNameNS(tt, "collection").length > 0,
      size: l ? Number(l.textContent) : 0,
      mtime: d ? new Date(d.textContent) : void 0
    };
  });
}
function Re(e) {
  const r = e.replace(/\/+$/, "").split("/");
  return decodeURIComponent(r[r.length - 1]);
}
function zt(e) {
  const r = He(e);
  return {
    async read(o, c) {
      const l = await fetch(r + at(o), { headers: ot(), credentials: "same-origin" });
      if (l.status === 404)
        throw new G("not-found", o);
      if (!l.ok)
        throw new G("network", "HTTP " + l.status);
      const d = Number(l.headers.get("Content-Length")) || 0;
      if (!c || !l.body || d === 0)
        return new Uint8Array(await l.arrayBuffer());
      const w = new Uint8Array(d), g = l.body.getReader();
      let v = 0;
      for (; ; ) {
        const { done: T, value: b } = await g.read();
        if (T)
          break;
        w.set(b, v), v += b.length, c(v, d);
      }
      return w.subarray(0, v);
    },
    async list(o) {
      const c = await fetch(r + (o ? at(o) + "/" : ""), {
        method: "PROPFIND",
        headers: ot({ Depth: "1", "Content-Type": "application/xml; charset=utf-8" }),
        credentials: "same-origin",
        body: '<?xml version="1.0"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/></d:prop></d:propfind>'
      });
      if (c.status === 404)
        throw new G("not-found", o);
      if (!c.ok)
        throw new G("network", "HTTP " + c.status);
      return Bt(await c.text()).slice(1).map((l) => ({ name: Re(l.href), isDir: l.isDir, size: l.size, mtime: l.mtime }));
    }
  };
}
async function Le() {
  const e = W(), r = (l) => l.replace(/&/g, "&amp;").replace(/</g, "&lt;"), o = await fetch(_t("dav") + "/", {
    method: "SEARCH",
    headers: ot({ "Content-Type": "text/xml; charset=utf-8" }),
    credentials: "same-origin",
    body: '<?xml version="1.0" encoding="UTF-8"?><d:searchrequest xmlns:d="DAV:"><d:basicsearch><d:select><d:prop><d:displayname/></d:prop></d:select><d:from><d:scope><d:href>/files/' + r(e) + "</d:href><d:depth>infinity</d:depth></d:scope></d:from><d:where><d:like><d:prop><d:displayname/></d:prop><d:literal>vault.cryptomator</d:literal></d:like></d:where></d:basicsearch></d:searchrequest>"
  });
  if (!o.ok)
    throw new Error("HTTP " + o.status);
  const c = "/files/" + e + "/";
  return Bt(await o.text()).map((l) => decodeURIComponent(l.href)).filter((l) => l.endsWith("/vault.cryptomator") && l.includes(c)).map((l) => "/" + l.slice(l.indexOf(c) + c.length, -18)).map((l) => l.replace(/\/+$/, "") || "/").sort((l, d) => l.localeCompare(d));
}
const { Vault: Kt } = Rt;
let et = null;
function ct() {
  return et || (document.head.append(m("link", { rel: "stylesheet", href: ke("cryptomator_vaults", "css", "cryptomator_vaults-files.css") })), et = import("./cryptomator_vaults-dialogs.mjs")), et;
}
function M(e) {
  ct().then(({ showError: r }) => r(e));
}
function Wt(e) {
  ct().then(({ showInfo: r }) => r(e));
}
const lt = "cryptomator-vaults", Y = "/cryptomator-vaults", ut = window.location.origin + "/apps/cryptomator_vaults" + Y, Pe = fe("cryptomator_vaults", "file.svg"), Ut = 15, jt = "cryptomator_vaults.added", dt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 3h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-1v1h-3v-1H8v1H5v-1H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v13h16V5zm8 2.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5.5 8h1.5v7H5.5z"/></svg>', Be = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 8a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/></svg>', ze = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>', qt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9V6zm9 14H6V10h12v10z"/></svg>', Ke = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2zm5 9h-2v2h-2v-2H9v-2h2V9h2v2h2v2z"/></svg>', C = /* @__PURE__ */ new Map();
let rt = null, B = null, x = { kind: "vaults" };
async function st(e, r) {
  const o = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(e)));
  return Array.from(o, (c) => c.toString(16).padStart(2, "0")).join("").slice(0, r);
}
const We = "r000000000001";
function Gt(e) {
  return -parseInt(e.slice(1, 13), 16);
}
function Jt() {
  try {
    const e = JSON.parse(window.localStorage.getItem(jt) || "[]");
    return Array.isArray(e) ? e.filter((r) => typeof r == "string") : [];
  } catch {
    return [];
  }
}
function je(e) {
  try {
    window.localStorage.setItem(jt, JSON.stringify([.../* @__PURE__ */ new Set([e, ...Jt()])]));
  } catch {
  }
}
function qe(e) {
  return e.split("/").filter(Boolean).pop() || p("All files");
}
async function $t(e) {
  const r = "v" + await st("vault:" + e, 12);
  return C.has(r) || C.set(r, { seg: r, folder: e, name: qe(e), vault: null, dirs: /* @__PURE__ */ new Map(), entries: /* @__PURE__ */ new Map(), nodes: /* @__PURE__ */ new Set() }), C.get(r);
}
function pt() {
  return rt || (rt = (async () => {
    let e = [];
    try {
      e = await Le();
    } catch (r) {
      M(p("The search for vaults failed: {detail}", { detail: r.message }));
    }
    for (const r of [.../* @__PURE__ */ new Set([...e, ...Jt()])])
      await $t(r);
  })()), rt;
}
function U(e, r, o, c, l = !0) {
  const d = e.split("/").filter(Boolean).pop() || We, w = new Ft({
    id: Gt(d),
    source: ut + e,
    root: Y,
    owner: W(),
    displayname: r,
    permissions: it.READ,
    mtime: c?.mtime,
    attributes: { cryptomatorVault: o?.seg ?? null, ...c?.attributes }
  });
  return l && o?.nodes.add(w), w;
}
function Ge(e, r, o) {
  const c = e.split("/").pop(), l = new be({
    id: Gt(c),
    source: ut + e,
    root: Y,
    owner: W(),
    displayname: r.name,
    mime: "application/octet-stream",
    size: r.size ?? 0,
    mtime: r.mtime,
    permissions: it.READ,
    attributes: { "has-preview": !0, previewUrl: Pe, cryptomatorVault: o.seg, cryptomatorType: r.type }
  });
  return o.nodes.add(l), l;
}
function z(e) {
  switch (e?.code) {
    case "wrong-password":
      return p("Wrong password.");
    case "unsupported-format":
      return p("This vault has a format the app cannot read (only vault format 8, Cryptomator 1.6 and later).");
    case "unsupported-key":
      return p("This vault keeps its key on a Cryptomator Hub, which the app does not support.");
    case "not-found":
      return p("There is no Cryptomator vault in this folder.");
    case "corrupt":
      return p("The vault is damaged: {detail}", { detail: e.message });
    case "locked":
      return p("The vault is locked.");
    default:
      return p("Something went wrong: {detail}", { detail: e?.message || String(e) });
  }
}
function K(e) {
  window.OCP.Files.Router.goToRoute(null, { view: lt }, { dir: e });
}
function Xt() {
  return window.OCP?.Files?.Router?.query?.dir || "/";
}
async function Yt(e) {
  if (e.vault?.unlocked)
    return !0;
  try {
    e.vault = e.vault || await Kt.open(zt(e.folder));
  } catch (o) {
    return M(z(o)), !1;
  }
  const r = await Ie(e.name, async (o) => {
    try {
      await e.vault.unlock(o);
    } catch (c) {
      throw new Error(z(c));
    }
  });
  return r && Zt(), r;
}
async function It() {
  x = { kind: "vaults" };
  const e = U("/", p("Vaults"), null), r = [...C.values()].sort((o, c) => o.name.localeCompare(c.name)).map((o) => U("/" + o.seg, o.name, o, { attributes: { cryptomatorVaultRoot: !0, cryptomatorFolder: o.folder } }, !1));
  return { folder: e, contents: r };
}
const ft = window.isSecureContext && !!window.crypto?.subtle;
async function Je(e) {
  if (mt(), !ft)
    return x = { kind: "insecure" }, { folder: new Ft({ id: -1, source: ut + "/", root: Y, owner: W(), permissions: it.READ }), contents: [] };
  await pt();
  const r = e.split("/").filter(Boolean);
  if (r.length === 0)
    return It();
  const o = C.get(r[0]);
  if (!o)
    return K("/"), It();
  if (!o.vault?.unlocked && !await Yt(o))
    return x = { kind: "locked", vault: o }, { folder: U(e, o.name, o, { attributes: { cryptomatorVaultRoot: r.length === 1 } }, !1), contents: [] };
  let c = "", l = o.name;
  if (r.length > 1) {
    const g = o.dirs.get(r[r.length - 1]);
    if (!g)
      return K("/" + o.seg), { folder: U(e, o.name, o), contents: [] };
    c = g.dirId, l = g.name;
  }
  const d = await o.vault.list(c), w = [];
  for (const g of d)
    if (g.type === "dir") {
      const v = "d" + await st(o.seg + ":dir:" + g.dirId, 12);
      o.dirs.set(v, { dirId: g.dirId, name: g.name }), w.push(U(e + "/" + v, g.name, o, { mtime: g.mtime }));
    } else {
      const v = "f" + await st(o.seg + ":file:" + g.path, 12);
      o.entries.set(v, g), w.push(Ge(e + "/" + v, g, o));
    }
  return x = { kind: "folder", vault: o }, { folder: U(e, l, o, void 0, r.length > 1), contents: w };
}
function $e(e) {
  if (e.replaceChildren(), e.classList.add("cryptomator-empty"), x.kind === "insecure")
    e.append(S(p("Vaults can only be opened over HTTPS: the browser provides its encryption only there."), "error"));
  else if (x.kind === "locked") {
    const r = x.vault;
    e.append(
      m("h2", {}, p("{vault} is locked", { vault: r.name })),
      S(p("Its files are decrypted in this browser tab once you enter its password.")),
      m("button", {
        type: "button",
        class: "primary",
        onclick: async () => {
          await Yt(r) && Xe(r.name);
        }
      }, p("Unlock"))
    );
  } else x.kind === "folder" ? e.append(m("h2", {}, p("This folder is empty."))) : e.append(
    m("h2", {}, p("No vaults found")),
    S(p("Vaults in your files appear here. Open a vault's folder to add one.")),
    m("button", { type: "button", class: "primary", onclick: te }, p("Open a vault folder …"))
  );
}
function Xe(e) {
  Ht("files:node:updated", U(Xt(), e, null));
}
function Qt(e) {
  if (e.vault?.unlocked) {
    e.vault.lock();
    for (const r of e.nodes)
      Ht("files:node:deleted", r);
    e.nodes.clear(), e.dirs.clear(), e.entries.clear(), Ue(), Xt().startsWith("/" + e.seg) && K("/"), [...C.values()].some((r) => r.vault?.unlocked) || (clearTimeout(B), B = null);
  }
}
function ht(e) {
  let r = !1;
  for (const o of C.values())
    o.vault?.unlocked && (Qt(o), r = !0);
  r && e && Wt(e);
}
function Zt() {
  clearTimeout(B), B = setTimeout(
    () => ht(p("Locked after {minutes} minutes without use.", { minutes: Ut })),
    Ut * 60 * 1e3
  );
}
function Ye() {
  B !== null && Zt();
}
async function yt(e) {
  try {
    await Kt.open(zt(e));
  } catch (o) {
    M(z(o));
    return;
  }
  je(e), await pt();
  const r = await $t(e);
  K("/" + r.seg);
}
async function te() {
  let e;
  try {
    const { getFilePickerBuilder: o } = await ct();
    e = await o(p("Choose a vault")).setMultiSelect(!1).allowDirectories(!0).setFilter((c) => c.type === I.Folder || c.basename === "vault.cryptomator").addButton({ label: p("Open vault"), variant: "primary", callback: () => {
    } }).build().pick();
  } catch {
    return;
  }
  const r = "/" + String(e).replace(/^\/+|\/+$/g, "");
  await yt(r.endsWith("/vault.cryptomator") ? r.slice(0, -18) || "/" : r);
}
const _ = (e) => e?.id === lt, Qe = /* @__PURE__ */ new Set(["cryptomator-vaults-open", "cryptomator-vaults-download", "cryptomator-vaults-lock", "cryptomator-vaults-open-vault"]), Mt = /* @__PURE__ */ new WeakSet();
let Ot = 0;
function mt() {
  const e = ve();
  if (e.length !== Ot) {
    Ot = e.length;
    for (const r of e) {
      if (Qe.has(r.id) || Mt.has(r))
        continue;
      const o = r.enabled;
      try {
        Object.defineProperty(r, "enabled", {
          configurable: !0,
          enumerable: !0,
          writable: !0,
          value: (c) => !_(c?.view) && (o ? o.call(r, c) : !0)
        }), Mt.add(r);
      } catch {
      }
    }
  }
}
function ee(e) {
  const r = C.get(e.attributes?.cryptomatorVault), o = r?.entries.get(e.basename);
  return { vault: r, entry: o };
}
X({
  id: "cryptomator-vaults-open",
  displayName: ({ nodes: e }) => e[0]?.type === I.Folder ? p("Open") : p("View"),
  iconSvgInline: () => Be,
  enabled: ({ nodes: e, view: r }) => (mt(), _(r) && e.length === 1),
  async exec({ nodes: e }) {
    const r = e[0];
    if (r.type === I.Folder)
      return K(r.path), null;
    const { vault: o, entry: c } = ee(r);
    return !o?.vault?.unlocked || !c ? (M(p("The vault is locked.")), null) : (c.type === "link" ? Wt(p("A link to {target}", { target: c.target })) : c.type === "broken" ? M(p("This entry cannot be read: {detail}", { detail: c.error })) : await Ne(c.name, c.size, (l, d) => o.vault.readFile(c, l, d), z), null);
  },
  default: he.DEFAULT,
  order: -1e3
});
async function Dt(e) {
  const { vault: r, entry: o } = ee(e);
  if (!r?.vault?.unlocked || !o)
    return M(p("The vault is locked.")), null;
  try {
    Lt(o.name, await r.vault.readFile(o));
  } catch (c) {
    M(z(c));
  }
  return null;
}
X({
  id: "cryptomator-vaults-download",
  displayName: () => p("Download"),
  iconSvgInline: () => ze,
  enabled: ({ nodes: e, view: r }) => _(r) && e.length > 0 && e.every((o) => o.type === I.File && o.attributes?.cryptomatorType === "file"),
  exec: ({ nodes: e }) => Dt(e[0]),
  async execBatch({ nodes: e }) {
    const r = [];
    for (const o of e)
      r.push(await Dt(o));
    return r;
  },
  order: -900
});
X({
  id: "cryptomator-vaults-lock",
  displayName: () => p("Lock"),
  iconSvgInline: () => qt,
  enabled: ({ nodes: e, view: r }) => _(r) && e.length === 1 && e[0].attributes?.cryptomatorVaultRoot === !0 && C.get(e[0].attributes.cryptomatorVault)?.vault?.unlocked === !0,
  async exec({ nodes: e }) {
    return Qt(C.get(e[0].attributes.cryptomatorVault)), null;
  },
  order: -800
});
X({
  id: "cryptomator-vaults-open-vault",
  displayName: () => p("Open vault"),
  iconSvgInline: () => dt,
  enabled: ({ nodes: e, view: r }) => r?.id === "files" && e.length === 1 && e[0].root?.startsWith("/files/") && (e[0].basename === "vault.cryptomator" || e[0].type === I.Folder && [...C.values()].some((o) => o.folder === e[0].path)),
  async exec({ nodes: e }) {
    const r = e[0];
    return await yt(r.type === I.Folder ? r.path : r.dirname), null;
  },
  order: 50
});
const re = /* @__PURE__ */ new Set();
let V = null;
function Ze(e) {
  return re.has(e) || [...C.values()].some((r) => r.folder === e);
}
function $(e) {
  if (!V)
    return;
  V.folder = e;
  const r = e?.path;
  if (!r || !Ze(r)) {
    V.el.replaceChildren();
    return;
  }
  V.el.replaceChildren(m("div", { class: "cryptomator-banner", role: "note" }, [
    m("span", { class: "cryptomator-banner__icon", "aria-hidden": "true" }),
    m(
      "span",
      { class: "cryptomator-banner__text" },
      p("This folder is a Cryptomator vault: its files are encrypted. Open it to see them, decrypted in this browser.")
    ),
    m("button", { type: "button", class: "primary", onclick: () => yt(r) }, p("Open vault"))
  ])), V.el.querySelector(".cryptomator-banner__icon").innerHTML = dt;
}
ye({
  id: "cryptomator-vaults-banner",
  order: 5,
  enabled: (e, r) => ft && r?.id === "files",
  render(e, r) {
    V = { el: e, folder: r }, $(r);
  },
  updated(e) {
    $(e);
  }
});
me("files:list:updated", ({ view: e, folder: r, contents: o }) => {
  e?.id !== "files" || !r?.path || ((o || []).some((c) => c.type === I.File && c.basename === "vault.cryptomator") && re.add(r.path), $(r));
});
Nt({
  id: "cryptomator-vaults-add",
  displayName: () => p("Open a vault folder …"),
  iconSvgInline: () => Ke,
  order: 0,
  enabled: ({ view: e }) => _(e),
  exec: async () => (await te(), null)
});
Nt({
  id: "cryptomator-vaults-lock-all",
  displayName: () => p("Lock all vaults"),
  iconSvgInline: () => qt,
  order: 1,
  enabled: ({ view: e }) => _(e) && [...C.values()].some((r) => r.vault?.unlocked),
  exec: async () => (ht(), null)
});
we().register(new ge({
  id: lt,
  name: p("Vaults"),
  caption: p("Cryptomator vaults, unlocked in this browser"),
  emptyTitle: p("No vaults found"),
  emptyCaption: p("Vaults in your files appear here. Open a vault's folder to add one."),
  emptyView: $e,
  icon: dt,
  order: 90,
  getContents: Je
}));
mt();
for (const e of ["pointerdown", "keydown", "wheel", "touchstart"])
  document.addEventListener(e, Ye, { passive: !0 });
window.addEventListener("pagehide", () => {
  E(), ht();
});
ft && pt().then(() => $(V?.folder));
export {
  lt as VIEW_ID
};
