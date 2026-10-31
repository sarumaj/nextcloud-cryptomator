import { g as pn, t as fn, v as mn, x as _t, K as wn, L as dt, M as yn, O as _e, s as gn, F as ot, Q as bt, R as vn, V as bn, z as Re, P as re, S as kn, y as xn, A as Fe, T as Cn } from "./cryptomator_vaults-common-DyNnossx.mjs";
var Nt = { exports: {} }, An = Nt.exports, ve;
function En() {
  return ve || (ve = 1, (function(t) {
    (function(n, r) {
      t.exports ? t.exports = r(globalThis.crypto) : n.CryptomatorVault = r(n.crypto);
    })(typeof self < "u" ? self : An, function(n) {
      const r = n.subtle, s = new TextEncoder(), d = new TextDecoder("utf-8", { fatal: !0 });
      class i extends Error {
        constructor(e, o) {
          super(o || e), this.name = "VaultError", this.code = e;
        }
      }
      function u(b) {
        const e = b.replace(/-/g, "+").replace(/_/g, "/"), o = e + "=".repeat((4 - e.length % 4) % 4), a = atob(o), c = new Uint8Array(a.length);
        for (let h = 0; h < a.length; h++)
          c[h] = a.charCodeAt(h);
        return c;
      }
      function p(b, e) {
        let o = "";
        for (let c = 0; c < b.length; c++)
          o += String.fromCharCode(b[c]);
        const a = btoa(o).replace(/\+/g, "-").replace(/\//g, "_");
        return e ? a : a.replace(/=+$/, "");
      }
      const g = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      function v(b) {
        let e = "", o = 0, a = 0;
        for (const c of b)
          for (o = o << 8 | c, a += 8; a >= 5; )
            e += g[o >>> a - 5 & 31], a -= 5;
        return a > 0 && (e += g[o << 5 - a & 31]), e;
      }
      function k(...b) {
        const e = new Uint8Array(b.reduce((a, c) => a + c.length, 0));
        let o = 0;
        for (const a of b)
          e.set(a, o), o += a.length;
        return e;
      }
      function E(b) {
        const e = new Uint8Array(8);
        return new DataView(e.buffer).setBigUint64(0, BigInt(b)), e;
      }
      function A(b, e) {
        if (b.length !== e.length)
          return !1;
        let o = 0;
        for (let a = 0; a < b.length; a++)
          o |= b[a] ^ e[a];
        return o === 0;
      }
      async function S(b, e, o) {
        const a = await r.importKey(
          "raw",
          b.length ? b : new Uint8Array(64),
          { name: "HMAC", hash: "SHA-256" },
          !1,
          ["sign"]
        ), c = new Uint8Array(o);
        for (let h = 1, f = 0; f < o; h++, f += 32) {
          const w = new Uint8Array([h >>> 24, h >>> 16 & 255, h >>> 8 & 255, h & 255]), m = new Uint8Array(await r.sign("HMAC", a, k(e, w)));
          c.set(m.subarray(0, Math.min(32, o - f)), f);
        }
        return c;
      }
      function M(b) {
        const e = b.slice(), o = (a, c) => a << c | a >>> 32 - c;
        for (let a = 0; a < 8; a += 2)
          e[4] ^= o(e[0] + e[12], 7), e[8] ^= o(e[4] + e[0], 9), e[12] ^= o(e[8] + e[4], 13), e[0] ^= o(e[12] + e[8], 18), e[9] ^= o(e[5] + e[1], 7), e[13] ^= o(e[9] + e[5], 9), e[1] ^= o(e[13] + e[9], 13), e[5] ^= o(e[1] + e[13], 18), e[14] ^= o(e[10] + e[6], 7), e[2] ^= o(e[14] + e[10], 9), e[6] ^= o(e[2] + e[14], 13), e[10] ^= o(e[6] + e[2], 18), e[3] ^= o(e[15] + e[11], 7), e[7] ^= o(e[3] + e[15], 9), e[11] ^= o(e[7] + e[3], 13), e[15] ^= o(e[11] + e[7], 18), e[1] ^= o(e[0] + e[3], 7), e[2] ^= o(e[1] + e[0], 9), e[3] ^= o(e[2] + e[1], 13), e[0] ^= o(e[3] + e[2], 18), e[6] ^= o(e[5] + e[4], 7), e[7] ^= o(e[6] + e[5], 9), e[4] ^= o(e[7] + e[6], 13), e[5] ^= o(e[4] + e[7], 18), e[11] ^= o(e[10] + e[9], 7), e[8] ^= o(e[11] + e[10], 9), e[9] ^= o(e[8] + e[11], 13), e[10] ^= o(e[9] + e[8], 18), e[12] ^= o(e[15] + e[14], 7), e[13] ^= o(e[12] + e[15], 9), e[14] ^= o(e[13] + e[12], 13), e[15] ^= o(e[14] + e[13], 18);
        for (let a = 0; a < 16; a++)
          b[a] = b[a] + e[a] | 0;
      }
      function _(b, e, o, a) {
        a.set(b.subarray((2 * o - 1) * 16, 2 * o * 16));
        for (let c = 0; c < 2 * o; c++) {
          for (let h = 0; h < 16; h++)
            a[h] ^= b[c * 16 + h];
          M(a), e.set(a, ((c & 1) * o + (c >> 1)) * 16);
        }
      }
      function B(b, e, o) {
        const a = 32 * o, c = new Int32Array(a * e), h = new Int32Array(b), f = new Int32Array(a), w = new Int32Array(16);
        for (let m = 0; m < e; m++)
          c.set(h, m * a), _(h, f, o, w), h.set(f);
        for (let m = 0; m < e; m++) {
          const C = h[(2 * o - 1) * 16] & e - 1;
          for (let x = 0; x < a; x++)
            h[x] ^= c[C * a + x];
          _(h, f, o, w), h.set(f);
        }
        return h;
      }
      function z(b) {
        const e = new DataView(b.buffer, b.byteOffset, b.byteLength), o = new Int32Array(b.length / 4);
        for (let a = 0; a < o.length; a++)
          o[a] = e.getInt32(a * 4, !0);
        return o;
      }
      function D(b, e) {
        const o = new DataView(e.buffer, e.byteOffset, e.byteLength);
        for (let a = 0; a < b.length; a++)
          o.setInt32(a * 4, b[a], !0);
      }
      async function F(b, e, o, a, c, h) {
        if (o < 2 || (o & o - 1) !== 0)
          throw new i("corrupt", "scrypt cost is not a power of two");
        const f = 128 * a, w = await S(b, e, c * f);
        for (let m = 0; m < c; m++) {
          const C = w.subarray(m * f, (m + 1) * f);
          D(B(z(C), o, a), C);
        }
        return S(b, w, h);
      }
      function V(b) {
        const e = new Uint8Array(16);
        for (let o = 0; o < 15; o++)
          e[o] = (b[o] << 1 | b[o + 1] >>> 7) & 255;
        return e[15] = b[15] << 1 & 255, b[0] & 128 && (e[15] ^= 135), e;
      }
      function R(b, e) {
        const o = new Uint8Array(b.length);
        for (let a = 0; a < b.length; a++)
          o[a] = b[a] ^ e[a];
        return o;
      }
      class Q {
        constructor(e) {
          this.key = e, this.subkeys = null;
        }
        async cbcLast(e) {
          return new Uint8Array(await r.encrypt({ name: "AES-CBC", iv: new Uint8Array(16) }, this.key, e)).subarray(e.length - 16, e.length);
        }
        async mac(e) {
          if (this.subkeys === null) {
            const w = await this.cbcLast(new Uint8Array(16)), m = V(w);
            this.subkeys = [m, V(m)];
          }
          const [o, a] = this.subkeys, c = Math.max(1, Math.ceil(e.length / 16)), h = new Uint8Array(c * 16);
          h.set(e);
          const f = h.subarray((c - 1) * 16);
          return e.length > 0 && e.length % 16 === 0 ? f.set(R(f, o)) : (f[e.length - (c - 1) * 16] = 128, f.set(R(f, a))), this.cbcLast(h);
        }
      }
      async function J(b, e, o) {
        let a = await b.mac(new Uint8Array(16));
        for (const h of e)
          a = R(V(a), await b.mac(h));
        let c;
        if (o.length >= 16)
          c = o.slice(), c.set(R(c.subarray(c.length - 16), a), c.length - 16);
        else {
          const h = new Uint8Array(16);
          h.set(o), h[o.length] = 128, c = R(V(a), h);
        }
        return b.mac(c);
      }
      function ct(b) {
        const e = b.slice();
        return e[8] &= 127, e[12] &= 127, e;
      }
      class it {
        constructor(e, o) {
          this.cmac = e, this.ctrKey = o;
        }
        async encrypt(e, o) {
          const a = await J(this.cmac, o, e), c = await r.encrypt({ name: "AES-CTR", counter: ct(a), length: 128 }, this.ctrKey, e);
          return k(a, new Uint8Array(c));
        }
        async decrypt(e, o) {
          if (e.length < 16)
            throw new i("corrupt", "name too short");
          const a = e.subarray(0, 16), c = new Uint8Array(await r.decrypt(
            { name: "AES-CTR", counter: ct(a), length: 128 },
            this.ctrKey,
            e.subarray(16)
          ));
          if (!A(await J(this.cmac, o, c), a))
            throw new i("corrupt", "name does not authenticate");
          return c;
        }
      }
      const I = 32 * 1024, W = {
        SIV_GCM: { header: 68, nonce: 12, overhead: 28 },
        SIV_CTRMAC: { header: 88, nonce: 16, overhead: 48 }
      };
      function st(b, e) {
        const { header: o, overhead: a } = W[b], c = e - o;
        if (c <= 0)
          return 0;
        const h = Math.floor(c / (I + a)), f = c % (I + a);
        return h * I + Math.max(0, f - a);
      }
      const Bt = /[a-zA-Z0-9\-_]{20}(?:[a-zA-Z0-9\-_]{4})*(?:[a-zA-Z0-9\-_]{4}|[a-zA-Z0-9\-_]{3}=|[a-zA-Z0-9\-_]{2}==)/g, cn = 36, ln = 32767, Kt = ".cryptomator-vaults-", un = 1440 * 60 * 1e3, dn = 255;
      function qt(b) {
        return n.getRandomValues(new Uint8Array(b));
      }
      function we() {
        return n.randomUUID();
      }
      async function Wt(b) {
        return new Uint8Array(await r.digest("SHA-256", b));
      }
      function yt(b) {
        const e = String(b).normalize("NFC");
        if (e === "" || e === "." || e === ".." || /[/\\\u0000-\u001f\u007f]/.test(e) || e.length > dn)
          throw new i("invalid-name", e);
        return e;
      }
      const ye = "vault.cryptomator";
      function hn(b) {
        const e = b.trim().split(".");
        if (e.length !== 3)
          throw new i("unsupported-format", "vault.cryptomator is not a JWT");
        const o = (a) => JSON.parse(d.decode(u(a)));
        return { header: o(e[0]), payload: o(e[1]), signed: e[0] + "." + e[1], signature: u(e[2]) };
      }
      function O(...b) {
        return b.filter((e) => e !== "").join("/");
      }
      class jt {
        constructor(e, o, a) {
          this.storage = e, this.config = o, this.masterkeyFile = a, this.keys = null;
        }
        /** Reads the vault's configuration and key file; checks the format before any password. */
        static async open(e) {
          let o;
          try {
            o = hn(d.decode(await e.read(ye)));
          } catch (m) {
            throw m instanceof i ? m : new i("unsupported-format", "vault.cryptomator unreadable: " + m.message);
          }
          const { header: a, payload: c } = o;
          if (c.format !== 8)
            throw new i("unsupported-format", "vault format " + c.format);
          if (!(c.cipherCombo in W))
            throw new i("unsupported-format", "cipher combination " + c.cipherCombo);
          if (a.alg !== "HS256")
            throw new i("unsupported-format", "signature " + a.alg);
          const h = String(a.kid || "");
          if (!h.startsWith("masterkeyfile:"))
            throw new i("unsupported-key", h);
          const f = h.slice(14);
          if (!/^[^/\\]+$/.test(f))
            throw new i("unsupported-key", h);
          const w = JSON.parse(d.decode(await e.read(f)));
          return new jt(e, o, w);
        }
        get scheme() {
          return this.config.payload.cipherCombo;
        }
        get unlocked() {
          return this.keys !== null;
        }
        /** Derives the keys from the password; a VaultError 'wrong-password' if it is not the vault's. */
        async unlock(e) {
          const o = this.masterkeyFile, a = await F(
            s.encode(String(e).normalize("NFC")),
            u(o.scryptSalt),
            o.scryptCostParam,
            o.scryptBlockSize,
            1,
            32
          ), c = await r.importKey("raw", a, "AES-KW", !1, ["unwrapKey"]);
          a.fill(0);
          let h, f;
          try {
            const w = async (m) => new Uint8Array(await r.exportKey(
              "raw",
              await r.unwrapKey("raw", u(m), c, "AES-KW", { name: "HMAC", hash: "SHA-256" }, !0, ["sign"])
            ));
            h = await w(o.primaryMasterKey), f = await w(o.hmacMasterKey);
          } catch {
            throw new i("wrong-password");
          }
          try {
            const w = await r.importKey("raw", k(h, f), { name: "HMAC", hash: "SHA-256" }, !1, ["verify"]);
            if (!await r.verify("HMAC", w, this.config.signature, s.encode(this.config.signed)))
              throw new i("corrupt", "vault.cryptomator is not signed with this key");
            const m = (C, x) => r.importKey("raw", C, x, !1, ["encrypt", "decrypt"]);
            this.keys = {
              gcm: await m(h, "AES-GCM"),
              ctr: await m(h, "AES-CTR"),
              mac: await r.importKey("raw", f, { name: "HMAC", hash: "SHA-256" }, !1, ["sign", "verify"])
            }, this.siv = new it(new Q(await m(f, "AES-CBC")), this.keys.ctr), this.dirPaths = /* @__PURE__ */ new Map();
          } finally {
            h.fill(0), f.fill(0);
          }
        }
        /** Forgets the keys; reading needs the password again. */
        lock() {
          this.keys = null, this.siv = null, this.dirPaths = null;
        }
        requireKeys() {
          if (!this.keys)
            throw new i("locked");
        }
        /** The storage folder of a directory: d/XX/YYYY… from the hash of its ID. */
        async dirPath(e) {
          if (this.requireKeys(), !this.dirPaths.has(e)) {
            const o = await this.siv.encrypt(s.encode(e), []), a = v(new Uint8Array(await r.digest("SHA-1", o)));
            this.dirPaths.set(e, O("d", a.slice(0, 2), a.slice(2)));
          }
          return this.dirPaths.get(e);
        }
        /**
         * The name in an entry's file name, found as cryptofs finds it (C9rDecryptor):
         * the first run of base64 in it that decrypts; where one does not, the run is
         * narrowed at its first and last '-' or '_' and tried again. {name, extracted}
         * or null.
         */
        async extractName(e, o, a = 0, c = e.length) {
          const h = new RegExp(Bt.source, "g");
          h.lastIndex = a;
          const f = h.exec(e.slice(0, c));
          if (f === null)
            return null;
          const w = f[0];
          try {
            return { name: d.decode(await this.siv.decrypt(u(w), [s.encode(o)])), extracted: w };
          } catch {
            const m = w.search(/[-_]/);
            if (m === -1)
              return null;
            const C = Math.max(w.lastIndexOf("-"), w.lastIndexOf("_")), x = await this.extractName(e, o, f.index + Math.max(1, m), c);
            return x !== null ? x : this.extractName(e, o, a, f.index + w.length - Math.max(1, w.length - C));
          }
        }
        async decryptName(e, o) {
          const a = e.endsWith(".c9r") ? e.slice(0, -4) : e;
          try {
            return d.decode(await this.siv.decrypt(u(a), [s.encode(o)]));
          } catch (c) {
            throw c instanceof i ? c : new i("corrupt", "name not decryptable");
          }
        }
        /**
         * The entries of a directory (the root's ID is ''): {name, type ('file',
         * 'dir', 'link'), size (of a file, decrypted), dirId (of a directory), path
         * (in the storage), mtime (the storage's, if known)}. As Cryptomator lists a
         * directory (cryptofs' NodeProcessor): an entry whose name does not decrypt is
         * left out, a sync conflict's copy is resolved (resolveConflict), a folder whose
         * directory is missing is left out (BrokenDirectoryFilter). An entry that cannot
         * be read for another reason is listed as type 'broken'.
         */
        async list(e) {
          const o = await this.dirPath(e), a = await this.storage.list(o), c = await Promise.all(a.map((w) => this.describe(o, w, e))), h = c.filter((w) => w !== null && !w.conflict);
          for (const w of c.filter((m) => m?.conflict)) {
            const m = await this.resolveConflict(o, e, w);
            m !== null && h.push(m);
          }
          const f = await Promise.all(h.map(async (w) => w.type !== "dir" || await this.storage.stat?.(await this.dirPath(w.dirId)).then((m) => m !== null, () => !0) !== !1));
          return h.filter((w, m) => f[m]).sort((w, m) => (m.type === "dir") - (w.type === "dir") || w.name.localeCompare(m.name));
        }
        /**
         * A sync conflict's copy, resolved as Cryptomator resolves it (cryptofs'
         * C9rConflictResolver), so that the vault ends up as if Cryptomator had listed
         * the directory: moved to its proper name if that is free; deleted if it and
         * the entry of that name are the same folder or link; else renamed to its name
         * with the sync tool's suffix, or " (1)" to " (9)". Left for the next listing
         * (not listed now) if a folder's type cannot be told yet, or on an error.
         * Returns the entry it became, or null.
         */
        async resolveConflict(e, o, a) {
          if (typeof this.storage.move != "function")
            return null;
          const c = a.found.extracted + ".c9r", h = O(e, c);
          try {
            try {
              return await this.storage.move(a.path, h), this.describe(e, { ...a.entry, name: c }, o);
            } catch (w) {
              if (w?.code !== "exists")
                throw w;
            }
            const f = await this.storage.stat(h);
            if (a.entry.isDir && f?.isDir) {
              const w = await this.compareTypeFile(a.path, h, "dir.c9r", cn, !0);
              if (w.both)
                return w.same ? this.removeDuplicate(a.path) : this.renameConflict(e, o, a);
              const m = await this.compareTypeFile(a.path, h, "symlink.c9r", ln, !1);
              if (m.both)
                return m.same ? this.removeDuplicate(a.path) : this.renameConflict(e, o, a);
              if (!((w.conflicting || m.conflicting) && (w.canonical || m.canonical)))
                return null;
            }
            return this.renameConflict(e, o, a);
          } catch {
            return null;
          }
        }
        async removeDuplicate(e) {
          return await this.storage.remove(e), null;
        }
        /** The first bytes of a folder entry's type file in both entries, compared. */
        async compareTypeFile(e, o, a, c, h) {
          const f = (P) => this.storage.read(O(P, a)).then((N) => N.subarray(0, c), (N) => {
            if (N?.code === "not-found")
              return new Uint8Array(0);
            throw N;
          }), [w, m] = await Promise.all([f(e), f(o)]), C = h ? c : 1, x = w.length >= C, T = m.length >= C;
          return { conflicting: x, canonical: T, both: x && T, same: x && T && A(w, m) };
        }
        /** Renames a conflict's copy as cryptofs does (renameConflictingFile). */
        async renameConflict(e, o, a) {
          const c = a.found.name, h = c.lastIndexOf("."), f = h > 0 ? c.slice(h) : "", w = h > 0 ? c.slice(0, h) : c, m = a.entry.name, C = m.indexOf(a.found.extracted) + a.found.extracted.length, x = m.slice(C, m.length - 4), T = this.config.payload.shorteningThreshold ?? 220, N = Math.trunc((T - 4) / 4) * 3 - 16 - f.length, U = x.slice(0, Math.min(x.length, Math.trunc(N / 2))), j = w.slice(0, Math.max(0, Math.min(w.length, N - Math.max(4, U.length)))), $ = [j + U + f];
          for (let G = 1; G < 10; G++)
            $.push(j + " (" + G + ")" + f);
          for (const G of $) {
            const tt = p(await this.siv.encrypt(s.encode(G), [s.encode(o)]), !0) + ".c9r", ht = O(e, tt);
            if (await this.storage.stat(ht) === null)
              return await this.storage.move(a.path, ht), this.describe(e, { ...a.entry, name: tt }, o);
          }
          return null;
        }
        async describe(e, o, a) {
          const c = O(e, o.name), h = await this.describeEntry(e, o, a, c);
          return h !== null && o.mtime && !h.mtime && (h.mtime = o.mtime), h;
        }
        async describeEntry(e, o, a, c) {
          try {
            if (o.name.endsWith(".c9s") && o.isDir) {
              const w = await this.decryptName(d.decode(await this.storage.read(O(c, "name.c9s"))).trim(), a), m = await this.storage.list(c), C = m.find((x) => x.name === "contents.c9r");
              return C ? { name: w, type: "file", size: st(this.scheme, C.size), path: O(c, "contents.c9r"), mtime: C.mtime } : this.describeNode(w, c, m.map((x) => x.name));
            }
            if (!o.name.endsWith(".c9r"))
              return null;
            const h = await this.extractName(o.name.slice(0, -4), a);
            if (h === null)
              return null;
            if (o.name !== h.extracted + ".c9r")
              return o.name.startsWith(".") ? null : { conflict: !0, entry: o, found: h, path: c };
            const f = h.name;
            return o.isDir ? this.describeNode(f, c, null) : { name: f, type: "file", size: st(this.scheme, o.size), path: c };
          } catch (h) {
            return { name: o.name, type: "broken", error: h.message, path: c };
          }
        }
        // A folder <name>.c9r (or .c9s): a directory (dir.c9r, its ID) or a link (symlink.c9r).
        async describeNode(e, o, a) {
          const c = async (w) => {
            if (a !== null && !a.includes(w))
              return null;
            try {
              return await this.storage.read(O(o, w));
            } catch (m) {
              if (m instanceof i && m.code === "not-found")
                return null;
              throw m;
            }
          }, h = await c("dir.c9r");
          if (h !== null)
            return { name: e, type: "dir", dirId: d.decode(h).trim(), path: o };
          const f = await c("symlink.c9r");
          if (f !== null) {
            const w = d.decode(await this.decryptContents(f));
            return { name: e, type: "link", target: w, path: o };
          }
          throw new i("corrupt", "neither a directory nor a link");
        }
        /**
         * A file's decrypted contents: onProgress(done, total) after each chunk,
         * onDownload(done, total) while the storage reads it (if it reports that).
         */
        async readFile(e, o, a) {
          return this.decryptContents(await this.storage.read(e.path, a), o);
        }
        async decryptContents(e, o) {
          this.requireKeys();
          const a = W[this.scheme];
          if (e.length === 0)
            return new Uint8Array(0);
          if (e.length < a.header)
            throw new i("corrupt", "file header too short");
          const c = e.subarray(0, a.header), h = c.subarray(0, a.nonce), f = await this.decryptHeader(c, h), w = e.subarray(a.header), m = I + a.overhead, C = new Uint8Array(st(this.scheme, e.length));
          for (let x = 0, T = 0; T < w.length; x++, T += m) {
            const P = w.subarray(T, Math.min(T + m, w.length)), N = await this.decryptChunk(P, x, h, f);
            C.set(N, x * I), o && o(Math.min(T + m, w.length), w.length);
          }
          return C;
        }
        async decryptHeader(e, o) {
          let a;
          if (this.scheme === "SIV_GCM")
            try {
              a = new Uint8Array(await r.decrypt({ name: "AES-GCM", iv: o }, this.keys.gcm, e.subarray(12)));
            } catch {
              throw new i("corrupt", "file header does not authenticate");
            }
          else {
            const w = e.subarray(16, 56);
            if (!await r.verify("HMAC", this.keys.mac, e.subarray(56, 88), e.subarray(0, 56)))
              throw new i("corrupt", "file header does not authenticate");
            a = new Uint8Array(await r.decrypt({ name: "AES-CTR", counter: o, length: 128 }, this.keys.ctr, w));
          }
          const c = a.subarray(8, 40), h = this.scheme === "SIV_GCM" ? "AES-GCM" : "AES-CTR", f = await r.importKey("raw", c, h, !1, ["decrypt"]);
          return a.fill(0), f;
        }
        async decryptChunk(e, o, a, c) {
          try {
            if (this.scheme === "SIV_GCM") {
              const m = e.subarray(0, 12);
              return new Uint8Array(await r.decrypt(
                { name: "AES-GCM", iv: m, additionalData: k(E(o), a) },
                c,
                e.subarray(12)
              ));
            }
            const h = e.subarray(0, 16), f = e.subarray(16, e.length - 32), w = e.subarray(e.length - 32);
            if (!await r.verify("HMAC", this.keys.mac, w, k(a, E(o), h, f)))
              throw new Error("mac");
            return new Uint8Array(await r.decrypt({ name: "AES-CTR", counter: h, length: 128 }, c, f));
          } catch {
            throw new i("corrupt", "chunk " + o + " does not authenticate");
          }
        }
        // ----- Writing -----
        //
        // As Cryptomator writes (tests/compat.test.js has Cryptomator's own library
        // read and check what is written here). The vault must never be left in a
        // state Cryptomator cannot read:
        // - a file is written under a staging name that Cryptomator ignores (in the
        //   vault's top folder, outside d/), read back and compared, and only then moved into place in one
        //   step (over the old file when replacing): a failed check leaves the vault
        //   as it was, and what a browser that closed midway left there is removed
        //   when the vault is next unlocked (removeLeftovers);
        // - an entry of several files (a folder's dir.c9r, a long name's name.c9s) is
        //   put together in a staging folder and moved into place in one step;
        // - a new folder's own directory (with its dirid.c9r) exists before the entry
        //   that points to it;
        // - nothing is replaced unless asked to (a file only, never a folder), and a
        //   new entry is refused where one of that name appeared meanwhile;
        // - the encryption is undone in memory before anything is stored.
        requireWritable() {
          if (this.requireKeys(), typeof this.storage.write != "function")
            throw new i("read-only");
        }
        /**
         * Where a directory's entry of this (checked) name lives: {path (its .c9r, or
         * .c9s for a long name), long, fullName (the encrypted name)}.
         */
        async entryPath(e, o) {
          const a = await this.dirPath(e), c = p(await this.siv.encrypt(s.encode(o), [s.encode(e)]), !0) + ".c9r", h = this.config.payload.shorteningThreshold ?? 220;
          if (c.length > h) {
            const f = p(new Uint8Array(await r.digest("SHA-1", s.encode(c))), !0) + ".c9s";
            return { folder: a, path: O(a, f), long: !0, fullName: c };
          }
          return { folder: a, path: O(a, c), long: !1, fullName: c };
        }
        /** What is stored at an entry's place: null, 'file', 'dir', 'link' or 'unknown'. */
        async existing(e) {
          const o = await this.storage.stat(e.path);
          if (!o)
            return null;
          if (!o.isDir)
            return "file";
          const a = (await this.storage.list(e.path)).map((c) => c.name);
          return a.includes("contents.c9r") ? "file" : a.includes("dir.c9r") ? "dir" : a.includes("symlink.c9r") ? "link" : "unknown";
        }
        /**
         * The start of a file's encryption: a new content key and the header that
         * holds it; encryptChunk(number, plain) encrypts the file's chunks in turn.
         */
        async startEncryption() {
          this.requireKeys();
          const e = W[this.scheme], o = this.scheme === "SIV_GCM", a = qt(e.nonce), c = qt(32), h = k(new Uint8Array(8).fill(255), c);
          let f;
          if (o)
            f = k(a, new Uint8Array(await r.encrypt({ name: "AES-GCM", iv: a }, this.keys.gcm, h)));
          else {
            const C = new Uint8Array(await r.encrypt({ name: "AES-CTR", counter: a, length: 128 }, this.keys.ctr, h)), x = new Uint8Array(await r.sign("HMAC", this.keys.mac, k(a, C)));
            f = k(a, C, x);
          }
          const w = await r.importKey("raw", c, o ? "AES-GCM" : "AES-CTR", !1, ["encrypt"]);
          h.fill(0), c.fill(0);
          const m = this.keys;
          return {
            header: f,
            async encryptChunk(C, x) {
              const T = qt(e.nonce);
              if (o)
                return k(T, new Uint8Array(await r.encrypt(
                  { name: "AES-GCM", iv: T, additionalData: k(E(C), a) },
                  w,
                  x
                )));
              const P = new Uint8Array(await r.encrypt({ name: "AES-CTR", counter: T, length: 128 }, w, x)), N = new Uint8Array(await r.sign("HMAC", m.mac, k(a, E(C), T, P)));
              return k(T, P, N);
            }
          };
        }
        /** The size of a file of this many bytes, encrypted. */
        encryptedSize(e) {
          const o = W[this.scheme];
          return o.header + e + Math.ceil(e / I) * o.overhead;
        }
        /** A file's contents encrypted as Cryptomator does: a new content key, header, chunks. */
        async encryptContents(e, o) {
          const a = await this.startEncryption(), c = Math.ceil(e.length / I), h = new Uint8Array(this.encryptedSize(e.length));
          h.set(a.header);
          for (let f = 0, w = a.header.length; f < c; f++) {
            const m = await a.encryptChunk(f, e.subarray(f * I, Math.min((f + 1) * I, e.length)));
            h.set(m, w), w += m.length, o && o(f + 1, c);
          }
          return h;
        }
        // ----- Large files, in pieces -----
        //
        // A file too large to hold in memory twice: source.size and
        // source.read(start, end) give its plain bytes in pieces (a File's slices).
        // It is encrypted chunk by chunk into parts the storage takes in turn
        // (storage.writeParts), then read back in ranges (storage.readRange), each
        // chunk decrypted (which authenticates it) and compared byte for byte with
        // the source. As with writeFile, under a staging name and moved into place
        // only after; a failed check leaves the vault as it was. In memory: a part.
        /** The encrypted file in parts of about partSize bytes (an async iterable). */
        async *encryptedParts(e, o, a) {
          const c = await this.startEncryption(), h = 32 * I;
          let f = [c.header], w = c.header.length;
          for (let m = 0, C = 0; m < e.size; m += h) {
            const x = await e.read(m, Math.min(m + h, e.size));
            for (let T = 0; T < x.length; T += I, C++) {
              const P = await c.encryptChunk(C, x.subarray(T, Math.min(T + I, x.length)));
              f.push(P), w += P.length, w >= o && (yield k(...f), f = [], w = 0);
            }
            a?.(Math.min(m + h, e.size), e.size);
          }
          w > 0 && (yield k(...f));
        }
        /**
         * Compares a stored file with its source, in ranges: each chunk decrypted and
         * authenticated, its bytes equal to the source's.
         */
        async checkStoredStream(e, o, a) {
          const c = W[this.scheme], h = this.encryptedSize(o.size), f = await this.storage.stat(e);
          if (!f || f.size !== h)
            throw new i("corrupt", "the stored file has " + (f?.size ?? "no") + " bytes, not " + h);
          const w = await this.storage.readRange(e, 0, c.header), m = w.subarray(0, c.nonce), C = await this.decryptHeader(w, m), x = I + c.overhead, T = Math.ceil(o.size / I), P = 32;
          for (let N = 0; N < T; N += P) {
            const U = Math.min(N + P, T), j = c.header + N * x, $ = await this.storage.readRange(e, j, Math.min(c.header + U * x, h)), G = await o.read(N * I, Math.min(U * I, o.size));
            for (let tt = N; tt < U; tt++) {
              const ht = (tt - N) * x, ge = await this.decryptChunk($.subarray(ht, Math.min(ht + x, $.length)), tt, m, C);
              if (!A(ge, G.subarray((tt - N) * I, (tt - N) * I + ge.length)))
                throw new i("corrupt", "the stored file differs from the one written (chunk " + tt + ")");
            }
            a?.(Math.min(U * I, o.size), o.size);
          }
        }
        /**
         * writeFile for a source read in pieces (see above). options: replace,
         * onProgress(phase, done, total) with the phases 'upload' and 'verify',
         * partSize (bytes per part handed to the storage).
         */
        async writeFileStream(e, o, a, c = {}) {
          this.requireWritable();
          const { replace: h = !1, onProgress: f, partSize: w = 10 * 1024 * 1024 } = c, m = (G) => (tt, ht) => f?.(G, tt, ht), C = yt(o), x = await this.entryPath(e, C), T = await this.existing(x);
          if (T !== null && (T !== "file" || !h))
            throw new i(T === "file" ? "exists" : "exists-other", C);
          const P = this.encryptedSize(a.size), N = x.long ? O(x.path, "contents.c9r") : x.path, U = this.stagingPath(), j = x.long && T === null, $ = j ? O(U, "contents.c9r") : U;
          try {
            j && (await this.storage.mkdir(U), await this.storage.write(O(U, "name.c9s"), s.encode(x.fullName), { create: !0 })), await this.storage.writeParts($, P, this.encryptedParts(a, w, m("upload")), { create: !0 }), await this.checkStoredStream($, a, m("verify")), j ? await this.storage.move(U, x.path) : await this.storage.move(U, N, { overwrite: T !== null });
          } catch (G) {
            throw await this.storage.remove(U).catch(() => {
            }), G;
          }
          return { name: C, path: N, size: a.size };
        }
        /**
         * A file's decrypted contents in pieces, for a file too large to hold:
         * onPiece(bytes) for each range of chunks in turn (awaited), each chunk
         * authenticated; onProgress(done, total).
         */
        async readFileStream(e, o, a) {
          for await (const c of this.decryptedPieces(e, a))
            await o(c);
        }
        /**
         * A file's decrypted contents in pieces of up to 64 chunks (2 MiB), in order,
         * each read in one range and checked: what readFileStream hands on, for a
         * reader that pulls (e.g. an upload in parts). Nothing for an empty file.
         */
        async *decryptedPieces(e, o) {
          this.requireKeys();
          const a = W[this.scheme], c = await this.storage.stat(e.path);
          if (!c || c.size === 0)
            return;
          if (c.size < a.header)
            throw new i("corrupt", "file header too short");
          const h = await this.storage.readRange(e.path, 0, a.header), f = h.subarray(0, a.nonce), w = await this.decryptHeader(h, f), m = I + a.overhead, C = st(this.scheme, c.size), x = Math.ceil((c.size - a.header) / m), T = 64;
          for (let P = 0; P < x; P += T) {
            const N = Math.min(P + T, x), U = await this.storage.readRange(e.path, a.header + P * m, Math.min(a.header + N * m, c.size)), j = [];
            for (let $ = P; $ < N; $++) {
              const G = ($ - P) * m;
              j.push(await this.decryptChunk(U.subarray(G, Math.min(G + m, U.length)), $, f, w));
            }
            yield k(...j), o?.(Math.min(N * I, C), C);
          }
        }
        /**
         * A staging name in the vault's top folder, outside d/: Cryptomator passes it
         * by, and its health checks (which look at d/) do not report one a browser
         * left behind. Moving from there is still one rename on the server.
         */
        stagingPath() {
          return Kt + we() + ".tmp";
        }
        /**
         * Removes the staging files and folders that writes which never finished (a
         * browser closed midway) left in the vault's top folder, once they are older
         * than olderThan (milliseconds; LEFTOVER_AGE), so that a write still going on
         * elsewhere is left alone. Nothing for a vault that cannot be written. Returns
         * the names removed.
         */
        async removeLeftovers({ olderThan: e = un, now: o = Date.now() } = {}) {
          if (this.requireKeys(), typeof this.storage.write != "function")
            return [];
          const a = [];
          for (const c of await this.storage.list(""))
            c.name.startsWith(Kt) && c.name.endsWith(".tmp") && c.mtime && o - c.mtime.getTime() >= e && (await this.storage.remove(c.name), a.push(c.name));
          return a;
        }
        /**
         * Puts an entry of several files (name -> bytes) together in a staging folder,
         * checks it (check(stagingFolder), if given) and moves it into
         * place in one step; refused if the place is taken meanwhile. The staging
         * folder goes on any failure.
         */
        async stageAndMove(e, o, a) {
          const c = this.stagingPath();
          await this.storage.mkdir(c);
          try {
            for (const [h, f] of Object.entries(o))
              await this.storage.write(O(c, h), f, { create: !0 });
            a && await a(c), await this.storage.move(c, e.path);
          } catch (h) {
            throw await this.storage.remove(c).catch(() => {
            }), h;
          }
        }
        /** Reads a stored file back and compares it with what was written. */
        async checkStored(e, o, a) {
          const c = await this.storage.read(e, a);
          let h;
          try {
            h = await this.decryptContents(c);
          } catch (f) {
            throw new i("corrupt", "the stored file does not decrypt: " + f.message);
          }
          if (!A(await Wt(h), o))
            throw new i("corrupt", "the stored file differs from the one written");
        }
        /**
         * Writes a file into a directory. options.replace allows replacing a file of
         * that name (never a folder); onProgress(phase, done, total) with the phases
         * 'encrypt', 'upload' and 'verify'. Returns {name, path, size}.
         */
        async writeFile(e, o, a, c = {}) {
          this.requireWritable();
          const { replace: h = !1, onProgress: f } = c, w = (j) => ($, G) => f?.(j, $, G), m = yt(o), C = await this.entryPath(e, m), x = await this.existing(C);
          if (x !== null && (x !== "file" || !h))
            throw new i(x === "file" ? "exists" : "exists-other", m);
          const T = await Wt(a), P = await this.encryptContents(a, w("encrypt"));
          if (!A(await Wt(await this.decryptContents(P)), T))
            throw new i("corrupt", "the encryption does not read back");
          const N = C.long ? O(C.path, "contents.c9r") : C.path;
          if (C.long && x === null)
            return await this.stageAndMove(
              C,
              { "name.c9s": s.encode(C.fullName), "contents.c9r": P },
              (j) => this.checkStored(O(j, "contents.c9r"), T, w("verify"))
            ), { name: m, path: N, size: a.length };
          const U = this.stagingPath();
          try {
            await this.storage.write(U, P, { create: !0, onProgress: w("upload") }), await this.checkStored(U, T, w("verify")), await this.storage.move(U, N, { overwrite: x !== null });
          } catch (j) {
            throw await this.storage.remove(U).catch(() => {
            }), j;
          }
          return { name: m, path: N, size: a.length };
        }
        /** Creates a folder in a directory. Returns {name, dirId}. */
        async createDirectory(e, o) {
          this.requireWritable();
          const a = yt(o), c = await this.entryPath(e, a);
          if (await this.existing(c) !== null)
            throw new i("exists-other", a);
          const h = we(), f = await this.dirPath(h);
          await this.storage.mkdir(f.split("/").slice(0, 2).join("/"), { existsOk: !0 }), await this.storage.mkdir(f);
          try {
            await this.storage.write(O(f, "dirid.c9r"), await this.encryptContents(s.encode(h)), { create: !0 });
            const m = { "dir.c9r": s.encode(h) };
            c.long && (m["name.c9s"] = s.encode(c.fullName)), await this.stageAndMove(c, m);
          } catch (m) {
            throw await this.storage.remove(f).catch(() => {
            }), m;
          }
          const w = (await this.list(e)).find((m) => m.type === "dir" && m.dirId === h);
          if (!w || w.name !== a)
            throw new i("corrupt", "the new folder does not read back");
          return { name: a, dirId: h };
        }
        /**
         * The folder of this name in a directory: the one there (an upload of a folder
         * merges into it), or a new one. Refused where a file or link has the name.
         * Returns {name, dirId, created}.
         */
        async ensureDirectory(e, o) {
          this.requireWritable();
          const a = await this.findEntry(e, o);
          if (a === null)
            return { ...await this.createDirectory(e, o), created: !0 };
          if (a.kind !== "dir")
            throw new i("exists-other", a.name);
          return { name: a.name, dirId: await this.entryDirId(a), created: !1 };
        }
        // ----- Renaming, moving, deleting -----
        //
        // A file's contents are not bound to its name or place, and a folder's entries
        // live under its ID, not its name: renaming or moving changes an entry alone.
        // Between two short names that is one move on the server. Where a long name
        // (.c9s) is involved, the new entry is put together under a staging name (the
        // contents copied on the server and checked), moved into place, and only then
        // is the old one removed: a crash leaves both, never neither. Deleting a folder
        // removes its entry first (all of it disappears at once), then the directories
        // of everything that was in it.
        /** An entry by name: {name, kind ('file', 'dir', 'link'), path, long, fullName, folder}, or null. */
        async findEntry(e, o) {
          const a = yt(o), c = await this.entryPath(e, a), h = await this.existing(c);
          if (h === null)
            return null;
          if (h === "unknown")
            throw new i("corrupt", "the entry of " + a + " is neither file, folder nor link");
          return { ...c, name: a, kind: h };
        }
        async entryDirId(e) {
          return d.decode(await this.storage.read(O(e.path, "dir.c9r"))).trim();
        }
        /**
         * Renames and/or moves an entry: from a directory to another (or the same)
         * under a new (or the same) name. Refused where the new name is taken. A
         * folder moved to another directory needs options.ancestors, the IDs of the
         * target's directories from the vault's top ('' first): a folder cannot go into
         * itself or below itself. Returns {name}.
         */
        async moveEntry(e, o, a, c, h = {}) {
          this.requireWritable();
          const f = await this.findEntry(e, o);
          if (f === null)
            throw new i("not-found", String(o));
          const w = yt(c ?? f.name);
          if (e === a && w === f.name)
            return { name: w };
          if (f.kind === "dir" && e !== a) {
            const C = h.ancestors;
            if (!Array.isArray(C) || C[C.length - 1] !== a)
              throw new i("invalid-move", "the target's ancestors are not known");
            const x = await this.entryDirId(f);
            if (C.includes(x))
              throw new i("invalid-move", f.name);
          }
          const m = await this.entryPath(a, w);
          if (await this.existing(m) !== null)
            throw new i("exists-other", w);
          return !f.long && !m.long ? (await this.storage.move(f.path, m.path), { name: w }) : (await this.rebuildEntry(f, m), await this.storage.remove(f.path), { name: w });
        }
        /**
         * Puts an entry together anew at another place (for a change between short
         * and long names): its files copied on the server into a staging name, a
         * file's contents checked (they decrypt and authenticate), then moved into
         * place in one step. The old entry stays.
         */
        async rebuildEntry(e, o) {
          const a = this.stagingPath(), c = { file: "contents.c9r", dir: "dir.c9r", link: "symlink.c9r" }[e.kind], h = e.long || e.kind !== "file" ? O(e.path, c) : e.path, f = o.long || e.kind !== "file" ? O(a, c) : a;
          try {
            if (f !== a && await this.storage.mkdir(a), await this.storage.copy(h, f), o.long && await this.storage.write(O(a, "name.c9s"), s.encode(o.fullName), { create: !0 }), e.kind !== "dir")
              await this.decryptContents(await this.storage.read(f));
            else if (d.decode(await this.storage.read(f)).trim() !== await this.entryDirId(e))
              throw new i("corrupt", "the copied folder entry differs");
            await this.storage.move(a, o.path);
          } catch (w) {
            throw await this.storage.remove(a).catch(() => {
            }), w;
          }
        }
        /** The IDs of a folder and of every folder below it. */
        async subtree(e) {
          const o = [e];
          for (const a of await this.list(e))
            if (a.type === "dir")
              o.push(...await this.subtree(a.dirId));
            else if (a.type === "broken" && a.path.endsWith(".c9r")) {
              const c = await this.storage.read(O(a.path, "dir.c9r")).then((h) => d.decode(h).trim(), () => null);
              c !== null && o.push(...await this.subtree(c));
            }
          return o;
        }
        /**
         * Deletes an entry: a file or link, or a folder with everything in it (its
         * entry first, so that all of it disappears at once; then the directories of
         * the folder and of every folder below it). Returns {name, folders}.
         */
        async removeEntry(e, o) {
          this.requireWritable();
          const a = await this.findEntry(e, o);
          if (a === null)
            throw new i("not-found", String(o));
          if (a.kind !== "dir")
            return await this.storage.remove(a.path), { name: a.name, folders: 0 };
          const c = await this.subtree(await this.entryDirId(a));
          await this.storage.remove(a.path);
          for (const h of c)
            await this.storage.remove(await this.dirPath(h));
          return { name: a.name, folders: c.length };
        }
      }
      return { Vault: jt, VaultError: i, cleartextSize: st, checkName: yt, scrypt: F, Siv: it, Cmac: Q, base32Encode: v, base64UrlEncode: p, base64Decode: u, VAULT_CONFIG: ye, STAGING_PREFIX: Kt };
    });
  })(Nt)), Nt.exports;
}
var Sn = En();
const Ve = /* @__PURE__ */ pn(Sn), Mn = "cryptomator_vaults";
function l(t, n) {
  return fn(Mn, t, n, void 0, { escape: !1 });
}
const Tn = 100 * 1024 * 1024, In = 5 * 1024 * 1024, Le = 1024 * 1024 * 1024, Zt = /* @__PURE__ */ new Set();
function y(t, n, r) {
  const s = document.createElement(t);
  for (const [d, i] of Object.entries(n || {}))
    i == null || i === !1 || (d === "class" ? s.className = i : d.startsWith("on") ? s.addEventListener(d.slice(2), i) : s.setAttribute(d, i === !0 ? "" : i));
  for (const d of [].concat(r ?? []))
    d != null && d !== !1 && s.append(d instanceof Node ? d : document.createTextNode(String(d)));
  return s;
}
function Jt(t) {
  if (window.OC?.Util?.humanFileSize)
    return window.OC.Util.humanFileSize(t);
  const n = ["B", "KB", "MB", "GB", "TB"];
  let r = t, s = 0;
  for (; r >= 1024 && s < n.length - 1; )
    r /= 1024, s++;
  return (s === 0 ? r : r.toFixed(1)) + " " + n[s];
}
function vt(t, n) {
  const r = URL.createObjectURL(new Blob([t], { type: n }));
  return Zt.add(r), r;
}
function Nn() {
  for (const t of Zt)
    URL.revokeObjectURL(t);
  Zt.clear(), Y();
}
function He(t, n) {
  const r = y("a", { href: vt(n, "application/octet-stream"), download: t });
  document.body.append(r), r.click(), r.remove();
}
let ut = null;
function Y() {
  if (ut) {
    const { dialog: t, onClose: n } = ut;
    ut = null, t.remove(), n?.();
  }
}
function kt(t, n, r) {
  Y();
  const s = y("div", {
    class: "cryptomator-dialog",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": t,
    onkeydown: (d) => {
      d.key === "Escape" && Y();
    },
    onclick: (d) => {
      d.target === s && Y();
    }
  }, y("div", { class: "cryptomator-dialog__panel" }, n));
  return ut = { dialog: s, onClose: r }, document.body.append(s), s;
}
function L(t, n) {
  return y("p", { class: "cryptomator-notice" + (n ? " cryptomator-notice--" + n : ""), role: n === "error" ? "alert" : null }, t);
}
function Dn(t, n, r) {
  return new Promise((s) => {
    let d = !1;
    const i = y("input", {
      type: "text",
      name: "username",
      autocomplete: "username",
      readonly: !0,
      class: "cryptomator-unlock__account",
      "aria-label": l("Vault")
    });
    i.value = r;
    const u = y("input", { type: "password", name: "password", autocomplete: "current-password", required: !0, "aria-label": l("Password") }), p = y("div", { "aria-live": "polite" }), g = y("button", { type: "submit", class: "primary" }, l("Unlock"));
    kt(t, [
      y("h2", {}, l("Unlock {vault}", { vault: t })),
      L(l("The password and the vault's keys stay in this browser tab: the server only sends the encrypted files.")),
      y("form", {
        class: "cryptomator-unlock",
        name: "cryptomator-unlock",
        method: "post",
        action: "#",
        autocomplete: "on",
        onsubmit: async (v) => {
          v.preventDefault(), g.disabled = !0, p.replaceChildren(L(l("Unlocking …"))), await new Promise((k) => setTimeout(k, 30));
          try {
            await n(u.value), u.value = "", d = !0, Y(), s(!0);
          } catch (k) {
            g.disabled = !1, p.replaceChildren(L(k.message, "error")), u.select();
          }
        }
      }, [
        y("label", {}, [l("Vault"), i]),
        y("label", {}, [l("Password"), u]),
        g,
        y("button", { type: "button", onclick: Y }, l("Cancel"))
      ]),
      p
    ], () => {
      u.value = "", d || s(!1);
    }), u.focus();
  });
}
const zn = ["png", "jpg", "jpeg", "gif", "webp", "avif", "bmp", "svg"], be = { mp4: "video/mp4", m4v: "video/mp4", webm: "video/webm", mov: "video/quicktime", ogv: "video/ogg" }, ke = { mp3: "audio/mpeg", m4a: "audio/mp4", ogg: "audio/ogg", oga: "audio/ogg", opus: "audio/ogg", wav: "audio/wav", flac: "audio/flac" }, Pn = [
  "txt",
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
function Un(t) {
  return Be(t).kind !== "none";
}
function Be(t) {
  const n = (/\.([^.]+)$/.exec(t)?.[1] ?? "").toLowerCase();
  return zn.includes(n) ? { kind: "image", type: n === "svg" ? "image/svg+xml" : "image/" + (n === "jpg" ? "jpeg" : n) } : n === "pdf" ? { kind: "pdf", type: "application/pdf" } : n in be ? { kind: "video", type: be[n] } : n in ke ? { kind: "audio", type: ke[n] } : Pn.includes(n) ? { kind: "text", type: "text/plain" } : n === "docx" ? { kind: "docx" } : ["pptx", "odp", "odt"].includes(n) ? { kind: n } : ["md", "markdown"].includes(n) ? { kind: "markdown" } : n === "zip" ? { kind: "zip" } : ["heic", "heif"].includes(n) ? { kind: "heic" } : ["xlsx", "xls", "ods"].includes(n) ? { kind: "sheet" } : { kind: "none" };
}
const Ke = {
  docx: async (t) => (await import("./cryptomator_vaults-documents-DqUUeel0.mjs")).docxPage(t),
  sheet: async (t) => (await import("./cryptomator_vaults-documents-DqUUeel0.mjs")).sheetPage(t),
  pptx: async (t) => (await import("./cryptomator_vaults-office-DHvoruxl.mjs")).pptxPage(t),
  odp: async (t) => (await import("./cryptomator_vaults-office-DHvoruxl.mjs")).odpPage(t),
  odt: async (t) => (await import("./cryptomator_vaults-office-DHvoruxl.mjs")).odtPage(t),
  markdown: async (t) => (await import("./cryptomator_vaults-previews-B_i4ypfy.mjs")).markdownPage(t),
  zip: async (t) => (await import("./cryptomator_vaults-previews-B_i4ypfy.mjs")).zipPage(t)
};
function On(t) {
  return t in Ke || t === "heic";
}
async function _n(t, n, r) {
  if (t.kind === "heic") {
    const d = await (await import("./cryptomator_vaults-previews-B_i4ypfy.mjs")).heicToPng(n);
    return y("img", { class: "cryptomator-preview", src: vt(d, "image/png"), alt: r });
  }
  const s = await Ke[t.kind](n);
  return y("iframe", { class: "cryptomator-preview cryptomator-preview--frame cryptomator-preview--document", sandbox: "", referrerpolicy: "no-referrer", title: r, srcdoc: s });
}
function Rn(t, n, r) {
  switch (t.kind) {
    case "image":
      return y("img", { class: "cryptomator-preview", src: vt(n, t.type), alt: r });
    case "pdf":
      return y("iframe", { class: "cryptomator-preview cryptomator-preview--frame", src: vt(n, t.type), title: r });
    case "video":
      return y("video", { class: "cryptomator-preview", src: vt(n, t.type), controls: !0 });
    case "audio":
      return y("audio", { class: "cryptomator-preview", src: vt(n, t.type), controls: !0 });
    case "text":
      return y("pre", { class: "cryptomator-preview cryptomator-preview--text" }, new TextDecoder("utf-8").decode(n));
    default:
      return L(l("No preview for this file. Download it to open it."));
  }
}
async function Fn(t, n, r, s) {
  const d = Be(t), i = d.kind !== "none" && n <= (d.kind === "text" ? In : Tn);
  if (!i && n > Le && !window.confirm(l("This file is {size}. Your browser holds it twice while decrypting. Continue?", { size: Jt(n) })))
    return;
  const u = y("progress", { max: 1, value: 0 }), p = y("div", { class: "cryptomator-dialog__body" }, [L(l("Decrypting …")), u]), g = y("button", { type: "button", disabled: !0 }, l("Download")), v = kt(t, [
    y("div", { class: "cryptomator-dialog__head" }, [
      y("h2", {}, t),
      y("span", { class: "cryptomator-dialog__meta" }, Jt(n)),
      g,
      y("button", { type: "button", class: "cryptomator-dialog__close", onclick: Y }, l("Close"))
    ]),
    p
  ]);
  v.querySelector(".cryptomator-dialog__close").focus();
  try {
    const k = await r((E, A) => {
      u.value = 0.5 + E / A / 2;
    }, (E, A) => {
      u.value = E / A / 2;
    });
    if (ut?.dialog !== v)
      return;
    if (g.disabled = !1, g.addEventListener("click", () => He(t, k)), !i)
      p.replaceChildren(L(l("No preview for this file. Download it to open it.")));
    else if (On(d.kind)) {
      p.replaceChildren(L(l("Preparing the preview …")));
      try {
        const E = await _n(d, k, t);
        ut?.dialog === v && p.replaceChildren(E);
      } catch (E) {
        ut?.dialog === v && p.replaceChildren(L(l("This document cannot be previewed: {detail}. Download it to open it.", { detail: E.message }), "error"));
      }
    } else
      p.replaceChildren(Rn(d, k, t));
  } catch (k) {
    ut?.dialog === v && p.replaceChildren(L(s(k), "error"));
  }
}
function qe(t, n, r, { initial: s = "", action: d = l("Create") } = {}) {
  return new Promise((i) => {
    let u = !1;
    const p = y("input", { type: "text", required: !0, "aria-label": n, autocomplete: "off" });
    p.value = s;
    const g = y("div", { "aria-live": "polite" });
    kt(t, [
      y("h2", {}, t),
      y("form", {
        class: "cryptomator-unlock",
        onsubmit: (k) => {
          k.preventDefault();
          const E = r(p.value);
          if (E) {
            g.replaceChildren(L(E, "error"));
            return;
          }
          u = !0;
          const A = p.value;
          Y(), i(A);
        }
      }, [
        y("label", {}, [n, p]),
        y("button", { type: "submit", class: "primary" }, d),
        y("button", { type: "button", onclick: Y }, l("Cancel"))
      ]),
      g
    ], () => {
      u || i(null);
    }), p.focus();
    const v = s.lastIndexOf(".");
    p.setSelectionRange(0, v > 0 ? v : s.length);
  });
}
function Vn(t, n, r) {
  return new Promise((s) => {
    let d = !1;
    kt(t, [
      y("h2", {}, t),
      L(n),
      y("div", { class: "cryptomator-choices" }, [
        y("button", { type: "button", class: "error primary", onclick: () => {
          d = !0, Y();
        } }, r),
        y("button", { type: "button", onclick: Y }, l("Cancel"))
      ])
    ], () => s(d)), document.querySelector(".cryptomator-dialog button:last-child")?.focus();
  });
}
function Ln(t, n, r, s, d) {
  return new Promise((i) => {
    let u = null, p = [{ name: n, dirId: "" }];
    const g = y("ol", { class: "cryptomator-crumbs" }), v = y("ul", { class: "cryptomator-folders" }), k = y("button", { type: "button", class: "primary", onclick: () => {
      u = { dirId: p[p.length - 1].dirId, ancestors: p.map((A) => A.dirId) }, Y();
    } }, d), E = async () => {
      g.replaceChildren(...p.map((A, S) => y("li", {}, S === p.length - 1 ? y("span", { "aria-current": "page" }, A.name) : y("button", { type: "button", onclick: () => {
        p = p.slice(0, S + 1), E();
      } }, A.name)))), v.replaceChildren(L(l("Loading …")));
      try {
        const A = (await r(p[p.length - 1].dirId)).sort((S, M) => S.name.localeCompare(M.name));
        v.replaceChildren(...A.length ? A.map((S) => y("li", {}, y("button", {
          type: "button",
          class: "cryptomator-folders__item",
          disabled: s.has(S.dirId),
          onclick: () => {
            p = [...p, S], E();
          }
        }, S.name))) : [L(l("No folders in here."))]);
      } catch (A) {
        v.replaceChildren(L(A.message, "error"));
      }
    };
    kt(t, [
      y("h2", {}, t),
      y("nav", {}, g),
      y("div", { class: "cryptomator-dialog__body" }, v),
      y("div", { class: "cryptomator-choices" }, [k, y("button", { type: "button", onclick: Y }, l("Cancel"))])
    ], () => i(u)), E();
  });
}
function We(t) {
  const n = y("ul", { class: "cryptomator-uploads" }), r = y("progress", { max: 1, value: 0 }), s = y("div", { "aria-live": "polite" }), d = y("div", { class: "cryptomator-question", hidden: !0 });
  let i = !1;
  const u = y("button", { type: "button", onclick: () => {
    i = !0, u.disabled = !0, u.textContent = l("Stopping after this file …");
  } }, l("Stop")), p = y("button", { type: "button", class: "primary", hidden: !0, onclick: Y }, l("Close"));
  return kt(t, [
    y("div", { class: "cryptomator-dialog__head" }, [y("h2", {}, t), u, p]),
    r,
    d,
    y("div", { class: "cryptomator-dialog__body" }, n),
    s
  ]), {
    get stopped() {
      return i;
    },
    file(g) {
      const v = y("span", { class: "cryptomator-dialog__meta" }, l("Waiting")), k = y("progress", { max: 1, value: 0 });
      return n.append(y("li", {}, [y("span", { class: "cryptomator-uploads__name" }, g), v, k])), {
        phase(E, A) {
          v.textContent = E, k.value = A;
        },
        done(E, A) {
          v.textContent = E, v.classList.toggle("cryptomator-notice--error", !!A), k.value = 1;
        }
      };
    },
    /**
     * What to do with a taken name: 'replace', 'skip', 'replace-all', 'skip-all' or
     * 'cancel'; text and cancel tell what replacing does and what stops.
     */
    ask(g, v, { text: k, cancel: E } = {}) {
      return new Promise((A) => {
        const S = (M) => () => {
          d.hidden = !0, d.replaceChildren(), A(M);
        };
        d.replaceChildren(
          y("h3", {}, l("“{name}” already exists", { name: g })),
          L(k || l("Replace the file in the vault with the one you chose? The vault keeps no copy of the old one; Nextcloud's versions keep its encrypted file.")),
          y("div", { class: "cryptomator-choices" }, [
            y("button", { type: "button", class: "primary", onclick: S("replace") }, l("Replace")),
            y("button", { type: "button", onclick: S("skip") }, l("Skip")),
            v > 1 ? y("button", { type: "button", onclick: S("replace-all") }, l("Replace all")) : null,
            v > 1 ? y("button", { type: "button", onclick: S("skip-all") }, l("Skip all")) : null,
            y("button", { type: "button", onclick: S("cancel") }, E || l("Cancel upload"))
          ])
        ), d.hidden = !1, d.querySelector("button").focus();
      });
    },
    progress(g) {
      r.value = g;
    },
    finish(g, v) {
      r.value = 1, u.hidden = !0, p.hidden = !1, s.replaceChildren(L(g, v ? "error" : void 0)), p.focus();
    }
  };
}
const { VaultError: K } = Ve, Gt = "DAV:", Hn = "http://owncloud.org/ns", xe = "http://nextcloud.org/ns", Ce = '<?xml version="1.0"?><d:propfind xmlns:d="DAV:" xmlns:oc="http://owncloud.org/ns"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getetag/><oc:permissions/></d:prop></d:propfind>', Bn = 20 * 1024 * 1024, Ae = 10 * 1024 * 1024;
function Kn() {
  return window.OC && window.OC.requestToken || document.head.dataset.requesttoken || "";
}
function et(t) {
  return { requesttoken: Kn(), "X-Requested-With": "XMLHttpRequest", ...t || {} };
}
function wt() {
  return mn()?.uid ?? "";
}
function Dt(t) {
  return t.split("/").filter((n) => n !== "").map(encodeURIComponent).join("/");
}
function qn(t) {
  const n = Dt(t);
  return _t("dav") + "/files/" + encodeURIComponent(wt()) + "/" + (n ? n + "/" : "");
}
function Pt(t) {
  const n = new DOMParser().parseFromString(t, "application/xml");
  return Array.from(n.getElementsByTagNameNS(Gt, "response")).map((r) => {
    const s = (u, p = Gt) => r.getElementsByTagNameNS(p, u)[0], d = s("getcontentlength"), i = s("getlastmodified");
    return {
      href: s("href").textContent,
      isDir: r.getElementsByTagNameNS(Gt, "collection").length > 0,
      size: d ? Number(d.textContent) : 0,
      mtime: i ? new Date(i.textContent) : void 0,
      etag: s("getetag")?.textContent || void 0,
      permissions: s("permissions", Hn)?.textContent ?? "",
      originalLocation: s("trashbin-original-location", xe)?.textContent,
      deletionTime: Number(s("trashbin-deletion-time", xe)?.textContent) || 0
    };
  });
}
function Wn(t) {
  const n = t.replace(/\/+$/, "").split("/");
  return decodeURIComponent(n[n.length - 1]);
}
function lt(t, n, r) {
  return t === 0 ? new K("network", (r ? r + ": " : "") + "redirected (signed out?)") : t === 404 ? new K("not-found", n) : t === 412 || t === 405 ? new K("exists", n) : t === 507 ? new K("quota", n) : new K("network", (r ? r + ": " : "") + "HTTP " + t);
}
function gt(t, n) {
  return t >= 200 && t < 300 && !n;
}
function Ee(t, n, r, s, d) {
  return new Promise((i, u) => {
    const p = new XMLHttpRequest();
    p.open(t, n);
    for (const [g, v] of Object.entries(et(r)))
      p.setRequestHeader(g, v);
    d && p.upload.addEventListener("progress", (g) => d(g.loaded, g.total)), p.addEventListener("load", () => i(new URL(p.responseURL, n).href === new URL(n, window.location.href).href ? p.status : 0)), p.addEventListener("error", () => u(new K("network", t + " failed"))), p.addEventListener("abort", () => u(new K("network", t + " aborted"))), p.send(s ?? null);
  });
}
async function xt(t, n, r, s, d = []) {
  const i = await fetch(n, { method: t, headers: et(r), credentials: "same-origin" });
  if (!gt(i.status, i.redirected) && !d.includes(i.status))
    throw lt(i.redirected ? 0 : i.status, s, t);
  return i;
}
function Rt(t) {
  const n = qn(t), r = (i) => n + Dt(i);
  async function s(i, u, p, g, v) {
    const k = _t("dav") + "/uploads/" + encodeURIComponent(wt()) + "/cryptomator-vaults-" + crypto.randomUUID(), E = new URL(r(i), window.location.href).href, A = { Destination: E, "OC-Total-Length": String(u) };
    await xt("MKCOL", k, { Destination: E }, i);
    try {
      let S = 0, M = 1;
      for await (const B of p) {
        const z = await Ee(
          "PUT",
          k + "/" + String(M).padStart(5, "0"),
          A,
          B,
          (D) => v?.(S + D, u)
        );
        if (!gt(z, !1))
          throw lt(z, i, "PUT (part " + M + ")");
        S += B.length, M++;
      }
      const _ = await fetch(k + "/.file", {
        method: "MOVE",
        headers: et({ ...A, Overwrite: g ? "F" : "T" }),
        credentials: "same-origin"
      });
      if (!gt(_.status, _.redirected))
        throw lt(_.redirected ? 0 : _.status, i, "MOVE (assembling the parts)");
    } catch (S) {
      throw await fetch(k, { method: "DELETE", headers: et(), credentials: "same-origin" }).catch(() => {
      }), S;
    }
  }
  function* d(i) {
    for (let u = 0; u < i.length; u += Ae)
      yield i.subarray(u, Math.min(u + Ae, i.length));
  }
  return {
    async read(i, u) {
      const p = await fetch(n + Dt(i), { headers: et(), credentials: "same-origin" });
      if (p.status === 404)
        throw new K("not-found", i);
      if (!p.ok)
        throw new K("network", "GET: HTTP " + p.status);
      const g = Number(p.headers.get("Content-Length")) || 0;
      if (!u || !p.body || g === 0)
        return new Uint8Array(await p.arrayBuffer());
      const v = new Uint8Array(g), k = p.body.getReader();
      let E = 0;
      for (; ; ) {
        const { done: A, value: S } = await k.read();
        if (A)
          break;
        v.set(S, E), E += S.length, u(E, g);
      }
      return v.subarray(0, E);
    },
    async stat(i) {
      const u = await fetch(r(i), {
        method: "PROPFIND",
        headers: et({ Depth: "0", "Content-Type": "application/xml; charset=utf-8" }),
        credentials: "same-origin",
        body: Ce
      });
      if (u.status === 404)
        return null;
      if (u.status !== 207)
        throw lt(u.status, i, "PROPFIND");
      const [p] = Pt(await u.text());
      return { isDir: p.isDir, size: p.size, etag: p.etag, permissions: p.permissions };
    },
    /** Stores a file whole; create: refused (VaultError 'exists') if the name is taken. */
    async write(i, u, { create: p = !1, onProgress: g } = {}) {
      if (u.length >= Bn)
        return s(i, u.length, d(u), p, g);
      const v = await Ee("PUT", r(i), p ? { "If-None-Match": "*" } : {}, u, g);
      if (!gt(v, !1))
        throw lt(v, i, "PUT");
    },
    /** A file too large to hold, from its parts in turn (chunked upload); complete or absent. */
    async writeParts(i, u, p, { create: g = !1, onProgress: v } = {}) {
      return s(i, u, p, g, v);
    },
    /** Bytes start to end (exclusive) of a stored file. */
    async readRange(i, u, p) {
      if (p <= u)
        return new Uint8Array(0);
      const g = await fetch(r(i), {
        headers: et({ Range: "bytes=" + u + "-" + (p - 1) }),
        credentials: "same-origin"
      });
      if (g.status === 404)
        throw new K("not-found", i);
      if (g.status === 206)
        return new Uint8Array(await g.arrayBuffer());
      if (g.status === 200)
        return new Uint8Array(await g.arrayBuffer()).slice(u, p);
      throw new K("network", "GET (range): HTTP " + g.status);
    },
    async mkdir(i, { existsOk: u = !1 } = {}) {
      const p = await fetch(r(i), { method: "MKCOL", headers: et(), credentials: "same-origin" });
      if (!(gt(p.status, p.redirected) || p.status === 405 && u))
        throw lt(p.status, i, "MKCOL");
    },
    /** Moves in one step; refused (VaultError 'exists') if the target is taken, unless overwrite. */
    async move(i, u, { overwrite: p = !1 } = {}) {
      await xt("MOVE", r(i), { Destination: new URL(r(u), window.location.href).href, Overwrite: p ? "T" : "F" }, u);
    },
    /** Copies on the server; refused (VaultError 'exists') if the target is taken. */
    async copy(i, u) {
      await xt("COPY", r(i), { Destination: new URL(r(u), window.location.href).href, Overwrite: "F" }, u);
    },
    async remove(i) {
      await xt("DELETE", r(i), {}, i, [404]);
    },
    /**
     * Deletes a file or folder only as it was (its ETag): VaultError 'changed' if it
     * changed meanwhile (a folder: anything inside it), 'not-found' if it is gone.
     * A file's DELETE carries If-Match; Nextcloud refuses that on folders, so a
     * folder's ETag is compared just before.
     */
    async removeUnchanged(i, u, { isDir: p = !1 } = {}) {
      if (p) {
        const v = await this.stat(i);
        if (v === null)
          throw new K("not-found", i);
        if (v.etag !== u)
          throw new K("changed", i);
      }
      const g = await fetch(r(i), { method: "DELETE", headers: et(p ? {} : { "If-Match": u }), credentials: "same-origin" });
      if (g.status === 412)
        throw new K("changed", i);
      if (!gt(g.status, g.redirected))
        throw lt(g.redirected ? 0 : g.status, i, "DELETE");
    },
    async list(i) {
      const u = await fetch(n + (i ? Dt(i) + "/" : ""), {
        method: "PROPFIND",
        headers: et({ Depth: "1", "Content-Type": "application/xml; charset=utf-8" }),
        credentials: "same-origin",
        body: Ce
      });
      if (u.status === 404)
        throw new K("not-found", i);
      if (!u.ok)
        throw new K("network", "PROPFIND: HTTP " + u.status);
      return Pt(await u.text()).slice(1).map((p) => ({ name: Wn(p.href), isDir: p.isDir, size: p.size, mtime: p.mtime, etag: p.etag, permissions: p.permissions }));
    }
  };
}
async function jn() {
  const t = wt(), n = (d) => d.replace(/&/g, "&amp;").replace(/</g, "&lt;"), r = await fetch(_t("dav") + "/", {
    method: "SEARCH",
    headers: et({ "Content-Type": "text/xml; charset=utf-8" }),
    credentials: "same-origin",
    body: '<?xml version="1.0" encoding="UTF-8"?><d:searchrequest xmlns:d="DAV:"><d:basicsearch><d:select><d:prop><d:displayname/></d:prop></d:select><d:from><d:scope><d:href>/files/' + n(t) + "</d:href><d:depth>infinity</d:depth></d:scope></d:from><d:where><d:like><d:prop><d:displayname/></d:prop><d:literal>vault.cryptomator</d:literal></d:like></d:where></d:basicsearch></d:searchrequest>"
  });
  if (!r.ok)
    throw new Error("HTTP " + r.status);
  const s = "/files/" + t + "/";
  return Pt(await r.text()).map((d) => decodeURIComponent(d.href)).filter((d) => d.endsWith("/vault.cryptomator") && d.includes(s)).map((d) => "/" + d.slice(d.indexOf(s) + s.length, -18)).map((d) => d.replace(/\/+$/, "") || "/").sort((d, i) => d.localeCompare(i));
}
async function Gn(t, n) {
  const r = [];
  for (const s of n) {
    const d = s.replace(/^\/+|\/+$/g, ""), i = d.split("/").pop(), u = await t.stat(d);
    if (u === null)
      throw new K("not-found", d);
    const p = { path: d, name: i, isDir: u.isDir, etag: u.etag, permissions: u.permissions, files: [], folders: [] };
    if (!u.isDir)
      p.files.push({ path: d, name: i, size: u.size, etag: u.etag, dirs: [] });
    else {
      const g = async (v, k) => {
        p.folders.push(k);
        const E = await t.list(v);
        if (E.some((A) => !A.isDir && A.name === "vault.cryptomator"))
          throw new K("contains-vault", v);
        for (const A of E) {
          const S = v + "/" + A.name;
          A.isDir ? await g(S, [...k, A.name]) : p.files.push({ path: S, name: A.name, size: A.size, etag: A.etag, dirs: k });
        }
      };
      await g(d, [i]);
    }
    r.push(p);
  }
  return r;
}
async function Xn(t) {
  const n = _t("dav") + "/trashbin/" + encodeURIComponent(wt()) + "/trash/", r = await fetch(n, {
    method: "PROPFIND",
    headers: et({ Depth: "1", "Content-Type": "application/xml; charset=utf-8" }),
    credentials: "same-origin",
    body: '<?xml version="1.0"?><d:propfind xmlns:d="DAV:" xmlns:nc="http://nextcloud.org/ns"><d:prop><nc:trashbin-original-location/><nc:trashbin-deletion-time/></d:prop></d:propfind>'
  });
  if (r.status === 404 || r.status === 405)
    return !0;
  if (r.status !== 207)
    throw lt(r.status, t, "PROPFIND (deleted files)");
  const s = t.replace(/^\/+|\/+$/g, ""), [d] = Pt(await r.text()).slice(1).filter((i) => i.originalLocation === s).sort((i, u) => u.deletionTime - i.deletionTime);
  return d ? (await xt("DELETE", new URL(d.href, window.location.href).href, {}, t, [404]), !0) : !1;
}
const { Vault: je, VaultError: zt, checkName: Ge } = Ve;
let Xt = null;
function Et() {
  return Xt || (document.head.append(y("link", { rel: "stylesheet", href: Cn("cryptomator_vaults", "css", "cryptomator_vaults-files.css") })), Xt = import("./cryptomator_vaults-dialogs-h5ro9skc.mjs")), Xt;
}
function H(t) {
  Et().then(({ showError: n }) => n(t));
}
function ae(t) {
  Et().then(({ showInfo: n }) => n(t));
}
const oe = "cryptomator-vaults", St = "/cryptomator-vaults", ie = window.location.origin + "/apps/cryptomator_vaults" + St, $n = wn("cryptomator_vaults", "file.svg"), Qt = 15, Xe = "cryptomator_vaults.added", se = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 3h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-1v1h-3v-1H8v1H5v-1H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v13h16V5zm8 2.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5.5 8h1.5v7H5.5z"/></svg>', Yn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 8a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/></svg>', Zn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>', $e = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9V6zm9 14H6V10h12v10z"/></svg>', Ye = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>', Jn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"/></svg>', Qn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.21a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>', tr = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-6 12v-3h-4v-4h4V8l5 5-5 5z"/></svg>', er = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>', nr = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6a5 5 0 0 0-9.9-1l1.95.45A3 3 0 0 1 15 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm0 12H6V10h12v10z"/></svg>', rr = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4h-2v4H6V4h7v5h5v1h2V8l-6-6H6zm12 10v3h-4v2h4v3l4-4-4-4z"/></svg>', ar = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v6h2V4h7v5h5v11H6v-4H4v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM10 11v3H2v2h8v3l4-4-4-4z"/></svg>', or = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2zm5 9h-2v2h-2v-2H9v-2h2V9h2v2h2v2z"/></svg>', X = /* @__PURE__ */ new Map();
let $t = null, Ct = null, rt = { kind: "vaults" };
async function te(t, n) {
  const r = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)));
  return Array.from(r, (s) => s.toString(16).padStart(2, "0")).join("").slice(0, n);
}
const ir = "r000000000001", Ze = 2 ** 52;
function Je(t) {
  return Ze + parseInt(t.slice(1, 13), 16);
}
function Qe() {
  try {
    const t = JSON.parse(window.localStorage.getItem(Xe) || "[]");
    return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
  } catch {
    return [];
  }
}
function sr(t) {
  try {
    window.localStorage.setItem(Xe, JSON.stringify([.../* @__PURE__ */ new Set([t, ...Qe()])]));
  } catch {
  }
}
function cr(t) {
  return t.split("/").filter(Boolean).pop() || l("All files");
}
async function tn(t) {
  const n = "v" + await te("vault:" + t, 12);
  return X.has(n) || X.set(n, { seg: n, folder: t, name: cr(t), vault: null, dirs: /* @__PURE__ */ new Map(), entries: /* @__PURE__ */ new Map(), nodes: /* @__PURE__ */ new Set() }), X.get(n);
}
function ce() {
  return $t || ($t = (async () => {
    let t = [];
    try {
      t = await jn();
    } catch (n) {
      H(l("The search for vaults failed: {detail}", { detail: n.message }));
    }
    for (const n of [.../* @__PURE__ */ new Set([...t, ...Qe()])])
      await tn(n);
  })()), $t;
}
function mt(t, n, r, s, d = !0) {
  const i = t.split("/").filter(Boolean).pop() || ir, u = new Re({
    id: Je(i),
    source: ie + t,
    root: St,
    owner: wt(),
    displayname: n,
    permissions: re.READ,
    mtime: s?.mtime,
    attributes: { cryptomatorVault: r?.seg ?? null, ...s?.attributes }
  });
  return d && r?.nodes.add(u), u;
}
function lr(t, n, r) {
  const s = t.split("/").pop(), d = new xn({
    id: Je(s),
    source: ie + t,
    root: St,
    owner: wt(),
    displayname: n.name,
    mime: "application/octet-stream",
    size: n.size ?? 0,
    mtime: n.mtime,
    permissions: re.READ,
    attributes: { "has-preview": !0, previewUrl: $n, cryptomatorVault: r.seg, cryptomatorType: n.type }
  });
  return r.nodes.add(d), d;
}
function q(t) {
  switch (t?.code) {
    case "exists":
    case "exists-other":
      return l("“{name}” already exists in this folder.", { name: t.message });
    case "invalid-name":
      return l("“{name}” cannot be a name in a vault.", { name: t.message });
    case "quota":
      return l("Your storage is full.");
    case "read-only":
      return l("This vault cannot be written to.");
    case "invalid-move":
      return l("A folder cannot be moved into itself or into a folder inside it.");
    case "wrong-password":
      return l("Wrong password.");
    case "unsupported-format":
      return l("This vault has a format the app cannot read (only vault format 8, Cryptomator 1.6 and later).");
    case "unsupported-key":
      return l("This vault keeps its key on a Cryptomator Hub, which the app does not support.");
    case "not-found":
      return l("There is no Cryptomator vault in this folder.");
    case "corrupt":
      return l("The vault is damaged: {detail}", { detail: t.message });
    case "locked":
      return l("The vault is locked.");
    case "changed":
      return l("“{name}” changed meanwhile: it was kept, and the vault may not hold its latest state.", { name: t.message.split("/").pop() });
    case "contains-vault":
      return l("“{name}” holds a Cryptomator vault, which cannot go into a vault.", { name: t.message.split("/").pop() });
    default:
      return l("Something went wrong: {detail}", { detail: t?.message || String(t) });
  }
}
function At(t) {
  window.OCP.Files.Router.goToRoute(null, { view: oe }, { dir: t });
}
function le() {
  return window.OCP?.Files?.Router?.query?.dir || "/";
}
async function en(t) {
  if (t.vault?.unlocked)
    return !0;
  try {
    t.vault = t.vault || await je.open(Rt(t.folder));
  } catch (r) {
    return H(q(r)), !1;
  }
  const n = await Dn(t.name, async (r) => {
    try {
      await t.vault.unlock(r);
    } catch (s) {
      throw new Error(q(s));
    }
  }, t.folder);
  return n && (nn(), t.vault.removeLeftovers().catch(() => {
  })), n;
}
async function Se() {
  rt = { kind: "vaults" };
  const t = mt("/", l("Vaults"), null), n = [...X.values()].sort((r, s) => r.name.localeCompare(s.name)).map((r) => mt("/" + r.seg, r.name, r, { attributes: { cryptomatorVaultRoot: !0, cryptomatorFolder: r.folder } }, !1));
  return { folder: t, contents: n };
}
const Ft = window.isSecureContext && !!window.crypto?.subtle;
async function ur(t) {
  if (he(), !Ft)
    return rt = { kind: "insecure" }, { folder: new Re({ id: Ze + 1, source: ie + "/", root: St, owner: wt(), permissions: re.READ }), contents: [] };
  await ce();
  const n = t.split("/").filter(Boolean);
  if (n.length === 0)
    return Se();
  const r = X.get(n[0]);
  if (!r)
    return At("/"), Se();
  if (!r.vault?.unlocked && !await en(r))
    return rt = { kind: "locked", vault: r }, { folder: mt(t, r.name, r, { attributes: { cryptomatorVaultRoot: n.length === 1 } }, !1), contents: [] };
  let s = "", d = r.name;
  if (n.length > 1) {
    const p = r.dirs.get(n[n.length - 1]);
    if (!p)
      return At("/" + r.seg), { folder: mt(t, r.name, r), contents: [] };
    s = p.dirId, d = p.name;
  }
  const i = await r.vault.list(s), u = [];
  for (const p of i)
    if (p.type === "dir") {
      const g = "d" + await te(r.seg + ":dir:" + p.dirId, 12);
      r.dirs.set(g, { dirId: p.dirId, name: p.name }), u.push(mt(t + "/" + g, p.name, r, { mtime: p.mtime }));
    } else {
      const g = "f" + await te(r.seg + ":file:" + p.path, 12);
      r.entries.set(g, p), u.push(lr(t + "/" + g, p, r));
    }
  return rt = { kind: "folder", vault: r, dirId: s, path: t }, { folder: mt(t, d, r, void 0, n.length > 1), contents: u };
}
function dr(t) {
  if (t)
    if (t.replaceChildren(), t.classList.add("cryptomator-empty"), rt.kind === "insecure")
      t.append(L(l("Vaults can only be opened over HTTPS: the browser provides its encryption only there."), "error"));
    else if (rt.kind === "locked") {
      const n = rt.vault;
      t.append(
        y("h2", {}, l("{vault} is locked", { vault: n.name })),
        L(l("Its files are decrypted in this browser tab once you enter its password.")),
        y("button", {
          type: "button",
          class: "primary",
          onclick: async () => {
            await en(n) && Mt(n.name);
          }
        }, l("Unlock"))
      );
    } else rt.kind === "folder" ? t.append(y("h2", {}, l("This folder is empty."))) : t.append(
      y("h2", {}, l("No vaults found")),
      L(l("Vaults in your files appear here. Open a vault's folder to add one.")),
      y("button", { type: "button", class: "primary", onclick: rn }, l("Open a vault folder …"))
    );
}
function Mt(t) {
  Fe("files:node:updated", mt(le(), t, null));
}
function Vt(t) {
  if (t.vault?.unlocked) {
    if (at && rt.vault === t) {
      ae(l("The vault locks when the change being made has finished."));
      const n = setInterval(() => {
        at || (clearInterval(n), Vt(t));
      }, 500);
      return;
    }
    t.vault.lock();
    for (const n of t.nodes)
      Fe("files:node:deleted", n);
    t.nodes.clear(), t.dirs.clear(), t.entries.clear(), Nn(), ee(ft?.folder), le().startsWith("/" + t.seg) && At("/"), [...X.values()].some((n) => n.vault?.unlocked) || (clearTimeout(Ct), Ct = null);
  }
}
function ue(t) {
  let n = !1;
  for (const r of X.values())
    r.vault?.unlocked && (Vt(r), n = !0);
  n && t && ae(t);
}
function nn() {
  clearTimeout(Ct), Ct = setTimeout(
    () => ue(l("Locked after {minutes} minutes without use.", { minutes: Qt })),
    Qt * 60 * 1e3
  );
}
function hr() {
  Ct !== null && nn();
}
async function de(t) {
  try {
    await je.open(Rt(t));
  } catch (r) {
    H(q(r));
    return;
  }
  sr(t), await ce();
  const n = await tn(t);
  At("/" + n.seg);
}
async function rn() {
  let t;
  try {
    const { getFilePickerBuilder: r } = await Et();
    t = await r(l("Choose a vault")).startAt("/").setMultiSelect(!1).allowDirectories(!0).setFilter((s) => s.type === ot.Folder || s.basename === "vault.cryptomator").addButton({ label: l("Open vault"), variant: "primary", callback: () => {
    } }).build().pick();
  } catch {
    return;
  }
  const n = "/" + String(t).replace(/^\/+|\/+$/g, "");
  await de(n.endsWith("/vault.cryptomator") ? n.slice(0, -18) || "/" : n);
}
function nt(t) {
  return t?.id === oe;
}
const pr = /* @__PURE__ */ new Set([
  "cryptomator-vaults-open",
  "cryptomator-vaults-download",
  "cryptomator-vaults-lock",
  "cryptomator-vaults-open-vault",
  "cryptomator-vaults-rename",
  "cryptomator-vaults-move",
  "cryptomator-vaults-export",
  "cryptomator-vaults-delete"
]), Me = /* @__PURE__ */ new WeakSet();
let Te = 0;
function he() {
  const t = kn();
  if (t.length !== Te) {
    Te = t.length;
    for (const n of t) {
      if (pr.has(n.id) || Me.has(n))
        continue;
      const r = n.enabled;
      try {
        Object.defineProperty(n, "enabled", {
          configurable: !0,
          enumerable: !0,
          writable: !0,
          value: (s) => !nt(s?.view) && !(s?.nodes ?? []).some((d) => d?.root === St) && (r ? r.call(n, s) : !0)
        }), Me.add(n);
      } catch {
      }
    }
  }
}
function an(t) {
  const n = X.get(t.attributes?.cryptomatorVault), r = n?.entries.get(t.basename);
  return { vault: n, entry: r };
}
dt({
  id: "cryptomator-vaults-open",
  displayName: ({ nodes: t }) => t[0]?.type === ot.Folder ? l("Open") : l("View"),
  iconSvgInline: () => Yn,
  enabled: ({ nodes: t, view: n }) => (he(), nt(n) && t.length === 1),
  async exec({ nodes: t }) {
    const n = t[0];
    if (n.type === ot.Folder)
      return At(n.path), null;
    const { vault: r, entry: s } = an(n);
    return !r?.vault?.unlocked || !s ? (H(l("The vault is locked.")), null) : (s.type === "link" ? ae(l("A link to {target}", { target: s.target })) : s.type === "broken" ? H(l("This entry cannot be read: {detail}", { detail: s.error })) : s.size >= Tt && !Un(s.name) ? await on(r, s) : await Fn(s.name, s.size, (d, i) => r.vault.readFile(s, d, i), q), null);
  },
  default: yn.DEFAULT,
  order: -1e3
});
async function on(t, n) {
  if (n.size >= Tt && typeof window.showSaveFilePicker == "function") {
    let r;
    try {
      r = await (await window.showSaveFilePicker({ suggestedName: n.name })).createWritable();
    } catch {
      return;
    }
    try {
      await t.vault.readFileStream(n, (s) => r.write(s)), await r.close();
    } catch (s) {
      await r.abort().catch(() => {
      }), H(q(s));
    }
    return;
  }
  if (!(n.size > Le && !window.confirm(l("This file is {size}. Your browser holds it twice while decrypting. Continue?", { size: Jt(n.size) }))))
    try {
      He(n.name, await t.vault.readFile(n));
    } catch (r) {
      H(q(r));
    }
}
async function Ie(t) {
  const { vault: n, entry: r } = an(t);
  return !n?.vault?.unlocked || !r ? (H(l("The vault is locked.")), null) : (await on(n, r), null);
}
dt({
  id: "cryptomator-vaults-download",
  displayName: () => l("Download"),
  iconSvgInline: () => Zn,
  enabled: ({ nodes: t, view: n }) => nt(n) && t.length > 0 && t.every((r) => r.type === ot.File && r.attributes?.cryptomatorType === "file"),
  exec: ({ nodes: t }) => Ie(t[0]),
  async execBatch({ nodes: t }) {
    const n = [];
    for (const r of t)
      n.push(await Ie(r));
    return n;
  },
  order: -900
});
dt({
  id: "cryptomator-vaults-lock",
  displayName: () => l("Lock"),
  iconSvgInline: () => $e,
  enabled: ({ nodes: t, view: n }) => nt(n) && t.length === 1 && t[0].attributes?.cryptomatorVaultRoot === !0 && X.get(t[0].attributes.cryptomatorVault)?.vault?.unlocked === !0,
  async exec({ nodes: t }) {
    return Vt(X.get(t[0].attributes.cryptomatorVault)), null;
  },
  order: -800
});
dt({
  id: "cryptomator-vaults-open-vault",
  displayName: () => l("Open vault"),
  iconSvgInline: () => se,
  enabled: ({ nodes: t, view: n }) => n?.id === "files" && t.length === 1 && t[0].root?.startsWith("/files/") && (t[0].basename === "vault.cryptomator" || t[0].type === ot.Folder && [...X.values()].some((r) => r.folder === t[0].path)),
  async exec({ nodes: t }) {
    const n = t[0];
    return await de(n.type === ot.Folder ? n.path : n.dirname), null;
  },
  order: 50
});
const pe = /* @__PURE__ */ new Set();
let pt = null;
function fr(t) {
  return pe.has(t) || [...X.values()].some((n) => n.folder === t);
}
function Ut(t) {
  if (!pt)
    return;
  pt.folder = t;
  const n = t?.path;
  if (!n || !fr(n)) {
    pt.el.replaceChildren();
    return;
  }
  pt.el.replaceChildren(y("div", { class: "cryptomator-banner", role: "note" }, [
    y("span", { class: "cryptomator-banner__icon", "aria-hidden": "true" }),
    y(
      "span",
      { class: "cryptomator-banner__text" },
      l("This folder is a Cryptomator vault: its files are encrypted. Open it to see them, decrypted in this browser.")
    ),
    y("button", { type: "button", class: "primary", onclick: () => de(n) }, l("Open vault"))
  ])), pt.el.querySelector(".cryptomator-banner__icon").innerHTML = se;
}
let ft = null;
function ee(t) {
  if (!ft)
    return;
  ft.folder = t;
  const n = X.get(t?.attributes?.cryptomatorVault);
  if (!n?.vault?.unlocked) {
    ft.el.replaceChildren();
    return;
  }
  ft.el.replaceChildren(y("div", { class: "cryptomator-banner cryptomator-banner--unlocked", role: "status" }, [
    y("span", { class: "cryptomator-banner__icon", "aria-hidden": "true" }),
    y(
      "span",
      { class: "cryptomator-banner__text" },
      l("{vault} is unlocked in this browser. It locks after {minutes} minutes without use.", { vault: n.name, minutes: Qt })
    ),
    y("button", { type: "button", class: "cryptomator-banner__lock", onclick: () => Vt(n) }, l("Lock"))
  ])), ft.el.querySelector(".cryptomator-banner__icon").innerHTML = nr;
}
_e({
  id: "cryptomator-vaults-unlocked",
  order: 4,
  enabled: (t, n) => Ft && nt(n),
  render(t, n) {
    ft = { el: t, folder: n }, ee(n);
  },
  updated(t) {
    ee(t);
  }
});
_e({
  id: "cryptomator-vaults-banner",
  order: 5,
  enabled: (t, n) => Ft && n?.id === "files",
  render(t, n) {
    pt = { el: t, folder: n }, Ut(n);
  },
  updated(t) {
    Ut(t);
  }
});
gn("files:list:updated", ({ view: t, folder: n, contents: r }) => {
  t?.id !== "files" || !n?.path || ((r || []).some((s) => s.type === ot.File && s.basename === "vault.cryptomator") && pe.add(n.path), Ut(n));
});
function Z() {
  const t = rt.kind === "folder" ? rt : null;
  return t?.vault?.vault?.unlocked && le() === t.path ? t : null;
}
let at = !1;
const Tt = 16 * 1024 * 1024;
function fe(t, n) {
  const r = {
    size: t.size,
    read: async (s, d) => new Uint8Array(await t.slice(s, d).arrayBuffer()),
    all: async () => new Uint8Array(await t.arrayBuffer())
  };
  return { name: t.name, size: t.size, dirs: n, source: r };
}
function mr(t, n) {
  const r = {
    size: n.size,
    read: (s, d) => t.readRange(n.path, s, d),
    all: () => t.read(n.path),
    remote: !0
  };
  return { name: n.name, size: n.size, dirs: n.dirs, source: r, origin: n };
}
async function Ot(t, n = [], r = {}) {
  const s = Z();
  if (!s || t.length === 0 && n.length === 0)
    return;
  if (at) {
    H(l("Another change to the vault is still running."));
    return;
  }
  at = !0;
  const { vault: d } = s.vault, i = We(r.title || l("Uploading to {vault}", { vault: s.vault.name }));
  let u = null, p = 0;
  const g = [], v = [];
  let k = "";
  const E = /* @__PURE__ */ new Map([["", s.dirId]]), A = async (S) => {
    let M = "";
    for (const _ of S) {
      const B = M ? M + "/" + _ : _;
      E.has(B) || E.set(B, (await d.ensureDirectory(E.get(M), _)).dirId), M = B;
    }
    return E.get(M);
  };
  try {
    for (const S of n)
      try {
        await A(S);
      } catch (M) {
        v.push(S.join("/")), i.file(S.join("/") + "/").done(q(M), !0);
      }
    for (const [S, M] of t.entries()) {
      const { dirs: _ } = M, B = [..._, M.name].join("/"), z = i.file(B);
      if (i.stopped) {
        z.done(l("Not uploaded"));
        continue;
      }
      let D = u === "replace-all";
      const F = async () => {
        const V = await A(_), R = { encrypt: l("Encrypting"), upload: l("Uploading"), verify: l("Checking") }, Q = M.size >= Tt, J = Q ? { upload: [0, 0.7], verify: [0.7, 0.3] } : { encrypt: [0, 0.2], upload: [0.2, 0.6], verify: [0.8, 0.2] }, ct = (it, I, W) => {
          const [st, Bt] = J[it];
          z.phase(it === "upload" && Q ? l("Encrypting and uploading") : R[it], st + Bt * (W ? I / W : 1));
        };
        Q ? await d.writeFileStream(V, M.name, M.source, { replace: D, onProgress: ct }) : (M.source.remote && z.phase(l("Reading"), 0), await d.writeFile(V, M.name, await M.source.all(), { replace: D, onProgress: ct })), await r.check?.(M);
      };
      try {
        try {
          await F();
        } catch (V) {
          if (V?.code !== "exists" || u === "skip-all")
            throw V;
          const R = u === "replace-all" ? "replace" : await i.ask(B, t.length);
          if (R === "cancel") {
            z.done(l("Not uploaded"));
            break;
          }
          if (R.endsWith("-all") && (u = R), R.startsWith("skip")) {
            z.done(l("Skipped"));
            continue;
          }
          D = !0, await F();
        }
        p++, g.push(M), z.done(r.written || l("Uploaded and checked"));
      } catch (V) {
        V?.code === "exists" && u === "skip-all" ? z.done(l("Skipped")) : (v.push(B), z.done(q(V), !0));
      }
      i.progress((S + 1) / t.length);
    }
    r.after && (k = await r.after(g, i));
  } finally {
    at = !1, i.finish((v.length ? l("{written} uploaded, {failed} failed. The vault is unchanged where an upload failed.", { written: p, failed: v.length }) : l("{written} uploaded and checked.", { written: p })) + (k ? " " + k : ""), v.length > 0), Mt(s.vault.name);
  }
}
function sn(t = !1) {
  const n = y("input", { type: "file", multiple: !0, hidden: !0, webkitdirectory: t || null });
  n.addEventListener("change", () => {
    const r = [...n.files].map((s) => fe(s, (s.webkitRelativePath || s.name).split("/").slice(0, -1)));
    n.remove(), Ot(r);
  }), document.body.append(n), n.click();
}
async function wr(t) {
  const n = [], r = [], s = async (d, i) => {
    if (d.isFile)
      n.push(fe(await new Promise((u, p) => d.file(u, p)), i));
    else if (d.isDirectory) {
      const u = [...i, d.name];
      r.push(u);
      const p = d.createReader();
      for (; ; ) {
        const g = await new Promise((v, k) => p.readEntries(v, k));
        if (g.length === 0)
          break;
        for (const v of g)
          await s(v, u);
      }
    }
  };
  for (const d of t)
    await s(d, []);
  return { files: n, folders: r };
}
async function yr() {
  const t = Z();
  if (!t)
    return;
  const n = await qe(l("New folder"), l("Folder name"), (r) => {
    try {
      return Ge(r), null;
    } catch (s) {
      return q(s);
    }
  });
  if (n !== null)
    try {
      await t.vault.vault.createDirectory(t.dirId, n), Mt(t.vault.name);
    } catch (r) {
      H(q(r));
    }
}
async function me(t, n) {
  if (at) {
    H(l("Another change to the vault is still running."));
    return;
  }
  at = !0;
  try {
    await n();
  } finally {
    at = !1, Mt(t.vault.name);
  }
}
function Lt(t, n) {
  return t?.code === "not-found" ? l("“{name}” is no longer there.", { name: n }) : q(t);
}
function Ht(t, n) {
  const r = nt(n) ? Z() : null;
  return r !== null && t.length > 0 && t.every((s) => s.attributes?.cryptomatorVault === r.vault.seg);
}
async function gr(t) {
  const n = Z(), r = t.displayname, s = await qe(l("Rename"), l("New name"), (d) => {
    try {
      return Ge(d), null;
    } catch (i) {
      return q(i);
    }
  }, { initial: r, action: l("Rename") });
  s === null || s.normalize("NFC") === r || await me(n, async () => {
    try {
      await n.vault.vault.moveEntry(n.dirId, r, n.dirId, s);
    } catch (d) {
      H(Lt(d, r));
    }
  });
}
async function Ne(t) {
  const n = Z(), { vault: r } = n.vault, s = new Set(t.filter((i) => i.type === ot.Folder).map((i) => n.vault.dirs.get(i.basename)?.dirId).filter(Boolean)), d = await Ln(
    t.length === 1 ? l("Move “{name}” to …", { name: t[0].displayname }) : l("Move {count} items to …", { count: t.length }),
    n.vault.name,
    async (i) => (await r.list(i)).filter((u) => u.type === "dir").map((u) => ({ name: u.name, dirId: u.dirId })),
    s,
    l("Move here")
  );
  d === null || d.dirId === n.dirId || await me(n, async () => {
    const i = [];
    for (const u of t)
      try {
        await r.moveEntry(n.dirId, u.displayname, d.dirId, void 0, { ancestors: d.ancestors });
      } catch (p) {
        i.push(u.displayname + ": " + Lt(p, u.displayname));
      }
    i.length && H(i.join(`
`));
  });
}
async function De(t) {
  const n = Z(), r = t.filter((i) => i.type === ot.Folder).length, s = t.length === 1 ? l("Delete “{name}”?", { name: t[0].displayname }) : l("Delete {count} items?", { count: t.length }), d = (r ? l("Folders are deleted with everything in them.") + " " : "") + l("The encrypted files go to Nextcloud's deleted files.");
  await Vn(s, d, l("Delete")) && await me(n, async () => {
    const i = [];
    for (const u of t)
      try {
        await n.vault.vault.removeEntry(n.dirId, u.displayname);
      } catch (p) {
        i.push(u.displayname + ": " + Lt(p, u.displayname));
      }
    i.length && H(i.join(`
`));
  });
}
const Yt = 10 * 1024 * 1024;
function ne(t) {
  return [...pe, ...[...X.values()].map((r) => r.folder)].some((r) => t === r || t.startsWith(r.replace(/\/+$/, "") + "/"));
}
function ze(t) {
  const n = new Uint8Array(t.reduce((s, d) => s + d.length, 0));
  let r = 0;
  for (const s of t)
    n.set(s, r), r += s.length;
  return n;
}
async function* vr(t, n) {
  let r = [], s = 0;
  for await (const d of t)
    for (r.push(d), s += d.length; s >= n; ) {
      const i = ze(r);
      yield i.subarray(0, n), r = s > n ? [i.subarray(n)] : [], s -= n;
    }
  s > 0 && (yield ze(r));
}
async function It(t) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", t));
}
function Pe(t, n) {
  return t.length === n.length && t.every((r, s) => r === n[s]);
}
function br(t) {
  const n = X.get(t.attributes?.cryptomatorVault);
  if (t.type === ot.Folder) {
    const r = n?.dirs.get(t.basename);
    return r ? { type: "dir", name: r.name, dirId: r.dirId } : null;
  }
  return n?.entries.get(t.basename) ?? null;
}
async function kr() {
  const t = Z();
  if (!t)
    return;
  let n = null, r;
  try {
    const { getFilePickerBuilder: i } = await Et();
    r = await i(l("Copy or move into the vault")).setMultiSelect(!0).allowDirectories(!0).setFilter((u) => !ne(u.path)).setButtonFactory((u) => [
      { label: l("Copy into the vault"), variant: "secondary", disabled: u.length === 0, callback: () => {
        n = "copy";
      } },
      { label: l("Move into the vault"), variant: "primary", disabled: u.length === 0, callback: () => {
        n = "move";
      } }
    ]).build().pick();
  } catch {
    return;
  }
  if (r = [].concat(r || []), n === null || r.length === 0)
    return;
  const s = Rt("");
  let d;
  try {
    d = await Gn(s, r);
  } catch (i) {
    H(q(i));
    return;
  }
  await Ot(d.flatMap((i) => i.files.map((u) => mr(s, u))), d.flatMap((i) => i.folders), {
    title: n === "move" ? l("Moving into {vault}", { vault: t.vault.name }) : l("Copying into {vault}", { vault: t.vault.name }),
    written: l("Encrypted and checked"),
    // A file that changed while it was read may be in the vault half old, half new.
    async check(i) {
      if ((await s.stat(i.origin.path))?.etag !== i.origin.etag)
        throw new zt("changed", i.origin.path);
    },
    after: n === "move" ? (i, u) => xr(s, d, i, u) : void 0
  });
}
async function xr(t, n, r, s) {
  const d = new Set(r.map((u) => u.origin));
  let i = 0;
  for (const u of n) {
    const p = s.file(u.isDir ? u.name + "/" : u.name);
    if (!u.files.every((g) => d.has(g))) {
      p.done(l("Original kept: not all of it is in the vault"), !0);
      continue;
    }
    if (!u.permissions.includes("D") || u.permissions.includes("S")) {
      p.done(l("Original kept: it is shared with you"), !0);
      continue;
    }
    try {
      await t.removeUnchanged(u.path, u.etag, { isDir: u.isDir }), i++, p.done(await Xn(u.path) ? l("Original deleted for good") : l("Original deleted; it may still be in the deleted files"));
    } catch (g) {
      p.done(q(g), !0);
    }
  }
  return i ? l("Originals deleted for good: {removed}.", { removed: i }) : "";
}
async function Ue(t, n, r, s, d, i) {
  if (r.size < Tt) {
    i("decrypt", 0, 1);
    const g = await t.readFile(r);
    if (await n.write(s, g, { create: !d, onProgress: (v, k) => i("upload", v, k) }), i("verify", 0, 1), !Pe(await It(await n.read(s)), await It(g)))
      throw new zt("network", "the stored copy differs from the decrypted file");
    return;
  }
  const u = [];
  async function* p(g) {
    for await (const v of g)
      u.push(await It(v)), yield v;
  }
  if (await n.writeParts(
    s,
    r.size,
    p(vr(t.decryptedPieces(r), Yt)),
    { create: !d, onProgress: (g, v) => i("upload", g, v) }
  ), (await n.stat(s))?.size !== r.size)
    throw new zt("network", "the stored copy has another size than the decrypted file");
  for (const [g, v] of u.entries()) {
    const k = g * Yt;
    if (!Pe(await It(await n.readRange(s, k, Math.min(k + Yt, r.size))), v))
      throw new zt("network", "the stored copy differs from the decrypted file");
    i("verify", g + 1, u.length);
  }
}
async function Oe(t) {
  const n = Z();
  if (!n)
    return;
  let r = null, s = null;
  try {
    const { getFilePickerBuilder: M } = await Et();
    await M(t.length === 1 ? l("Export “{name}” decrypted to …", { name: t[0].displayname }) : l("Export {count} items decrypted to …", { count: t.length })).setMultiSelect(!1).allowDirectories(!0).setMimeTypeFilter(["httpd/unix-directory"]).setFilter((_) => _.type === ot.Folder && !ne(_.path)).setButtonFactory((_, B) => [
      { label: l("Copy here"), variant: "secondary", callback: () => {
        r = "copy", s = B;
      } },
      { label: l("Move here"), variant: "primary", callback: () => {
        r = "move", s = B;
      } }
    ]).build().pick();
  } catch {
  }
  if (r === null || s === null)
    return;
  if (ne(s)) {
    H(l("Choose a folder outside the vault."));
    return;
  }
  if (at) {
    H(l("Another change to the vault is still running."));
    return;
  }
  at = !0;
  const { vault: d } = n.vault, i = Rt(""), u = (...M) => [s.replace(/^\/+|\/+$/g, ""), ...M].filter(Boolean).join("/"), p = We(r === "move" ? l("Moving out of {vault}", { vault: n.vault.name }) : l("Exporting from {vault}", { vault: n.vault.name })), g = { text: l("Replace the file in your files with the one from the vault? Nextcloud keeps the old one among its versions."), cancel: l("Cancel") };
  let v = null, k = 0, E = 0, A = !1;
  const S = [];
  try {
    const M = [];
    for (const z of t) {
      const D = br(z), F = { name: z.displayname, files: [], folders: [], complete: D !== null }, V = async (R, Q) => {
        F.folders.push(Q);
        for (const J of await d.list(R))
          J.type === "dir" ? await V(J.dirId, [...Q, J.name]) : J.type === "file" ? F.files.push({ entry: J, dirs: Q }) : F.complete = !1;
      };
      D?.type === "dir" ? await V(D.dirId, [D.name]) : D?.type === "file" ? F.files.push({ entry: D, dirs: [] }) : F.complete = !1, M.push(F);
    }
    const _ = M.reduce((z, D) => z + D.files.length, 0);
    let B = 0;
    for (const z of M) {
      for (const D of z.folders)
        try {
          await i.mkdir(u(...D), { existsOk: !0 });
        } catch (F) {
          z.complete = !1, S.push(D.join("/")), p.file(D.join("/") + "/").done(q(F), !0);
        }
      for (const { entry: D, dirs: F } of z.files) {
        const V = [...F, D.name].join("/"), R = p.file(V);
        if (B++, p.stopped || A) {
          z.complete = !1, R.done(l("Not exported"));
          continue;
        }
        const Q = { decrypt: l("Decrypting"), upload: D.size >= Tt ? l("Decrypting and uploading") : l("Uploading"), verify: l("Checking") }, J = { decrypt: [0, 0.2], upload: [0.2, 0.6], verify: [0.8, 0.2] }, ct = (I, W, st) => R.phase(Q[I], J[I][0] + J[I][1] * (st ? W / st : 1));
        let it = v === "replace-all";
        try {
          try {
            await Ue(d, i, D, u(...F, D.name), it, ct);
          } catch (I) {
            if (I?.code !== "exists" || v === "skip-all")
              throw I;
            const W = v === "replace-all" ? "replace" : await p.ask(V, _, g);
            if (W === "cancel")
              throw A = !0, Object.assign(new Error("cancelled"), { cancelled: !0 });
            if (W.endsWith("-all") && (v = W), W.startsWith("skip"))
              throw Object.assign(new Error("skipped"), { skipped: !0 });
            it = !0, await Ue(d, i, D, u(...F, D.name), it, ct);
          }
          k++, R.done(l("Exported and checked"));
        } catch (I) {
          if (z.complete = !1, I?.cancelled) {
            R.done(l("Not exported"));
            continue;
          }
          I?.skipped || I?.code === "exists" && v === "skip-all" ? R.done(l("Skipped")) : (S.push(V), R.done(q(I), !0));
        }
        p.progress(B / Math.max(_, 1));
      }
      if (r === "move") {
        const D = p.file(l("“{name}” in the vault", { name: z.name }));
        if (!z.complete) {
          D.done(l("Kept in the vault: not all of it was exported"), !0);
          continue;
        }
        try {
          await d.removeEntry(n.dirId, z.name), E++, D.done(l("Removed from the vault"));
        } catch (F) {
          D.done(Lt(F, z.name), !0);
        }
      }
    }
  } catch (M) {
    S.push(""), H(q(M));
  } finally {
    at = !1;
    const M = S.length ? l("{written} exported, {failed} failed.", { written: k, failed: S.length }) : l("{written} exported and checked.", { written: k });
    p.finish(M + (E ? " " + l("{removed} removed from the vault.", { removed: E }) : ""), S.length > 0), Mt(n.vault.name);
  }
}
dt({
  id: "cryptomator-vaults-rename",
  displayName: () => l("Rename"),
  iconSvgInline: () => Qn,
  enabled: ({ nodes: t, view: n }) => Ht(t, n) && t.length === 1,
  async exec({ nodes: t }) {
    return await gr(t[0]), null;
  },
  order: -700
});
dt({
  id: "cryptomator-vaults-move",
  displayName: () => l("Move …"),
  iconSvgInline: () => tr,
  enabled: ({ nodes: t, view: n }) => Ht(t, n),
  async exec({ nodes: t }) {
    return await Ne(t), null;
  },
  async execBatch({ nodes: t }) {
    return await Ne(t), t.map(() => null);
  },
  order: -690
});
dt({
  id: "cryptomator-vaults-export",
  displayName: () => l("Export to your files …"),
  iconSvgInline: () => rr,
  enabled: ({ nodes: t, view: n }) => Ht(t, n),
  async exec({ nodes: t }) {
    return await Oe(t), null;
  },
  async execBatch({ nodes: t }) {
    return await Oe(t), t.map(() => null);
  },
  order: -680
});
dt({
  id: "cryptomator-vaults-delete",
  displayName: () => l("Delete"),
  iconSvgInline: () => er,
  enabled: ({ nodes: t, view: n }) => Ht(t, n),
  async exec({ nodes: t }) {
    return await De(t), null;
  },
  async execBatch({ nodes: t }) {
    return await De(t), t.map(() => null);
  },
  destructive: !0,
  order: 100
});
bt({
  id: "cryptomator-vaults-upload",
  displayName: () => l("Upload files …"),
  iconSvgInline: () => Ye,
  order: -2,
  enabled: ({ view: t }) => nt(t) && Z() !== null,
  exec: async () => (sn(), null)
});
bt({
  id: "cryptomator-vaults-upload-folder",
  displayName: () => l("Upload folder …"),
  iconSvgInline: () => Ye,
  order: -1.5,
  enabled: ({ view: t }) => nt(t) && Z() !== null,
  exec: async () => (sn(!0), null)
});
bt({
  id: "cryptomator-vaults-import",
  displayName: () => l("Add from your files …"),
  iconSvgInline: () => ar,
  order: -1.2,
  enabled: ({ view: t }) => nt(t) && Z() !== null,
  exec: async () => (await kr(), null)
});
bt({
  id: "cryptomator-vaults-new-folder",
  displayName: () => l("New folder …"),
  iconSvgInline: () => Jn,
  order: -1,
  enabled: ({ view: t }) => nt(t) && Z() !== null,
  exec: async () => (await yr(), null)
});
function Cr(t) {
  Z() && t.dataTransfer?.types?.includes("Files") && (t.preventDefault(), t.stopPropagation(), t.dataTransfer.dropEffect = "copy");
}
function Ar(t) {
  if (!Z() || !t.dataTransfer?.files?.length)
    return;
  t.preventDefault(), t.stopPropagation();
  const n = [...t.dataTransfer.items || []].map((r) => r.webkitGetAsEntry?.()).filter(Boolean);
  if (n.length === 0) {
    Ot([...t.dataTransfer.files].map((r) => fe(r, [])));
    return;
  }
  wr(n).then(({ files: r, folders: s }) => Ot(r, s), (r) => H(q(r)));
}
window.addEventListener("dragover", Cr, !0);
window.addEventListener("drop", Ar, !0);
bt({
  id: "cryptomator-vaults-add",
  displayName: () => l("Open a vault folder …"),
  iconSvgInline: () => or,
  order: 0,
  enabled: ({ view: t }) => nt(t),
  exec: async () => (await rn(), null)
});
bt({
  id: "cryptomator-vaults-lock-all",
  displayName: () => l("Lock all vaults"),
  iconSvgInline: () => $e,
  order: 1,
  enabled: ({ view: t }) => nt(t) && [...X.values()].some((n) => n.vault?.unlocked),
  exec: async () => (ue(), null)
});
vn().register(new bn({
  id: oe,
  name: l("Vaults"),
  caption: l("Cryptomator vaults, unlocked in this browser"),
  emptyTitle: l("No vaults found"),
  emptyCaption: l("Vaults in your files appear here. Open a vault's folder to add one."),
  emptyView: dr,
  icon: se,
  order: 90,
  getContents: ur
}));
he();
for (const t of ["pointerdown", "keydown", "wheel", "touchstart"])
  document.addEventListener(t, hr, { passive: !0 });
window.addEventListener("pagehide", () => {
  Y(), ue();
});
Ft && ce().then(() => Ut(pt?.folder));
export {
  oe as VIEW_ID
};
