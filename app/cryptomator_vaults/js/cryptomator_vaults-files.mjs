import { g as tn, t as en, v as nn, x as jt, K as rn, L as st, M as an, O as Ce, s as on, F as Z, Q as kt, R as sn, V as cn, z as xe, P as Gt, S as ln, y as un, A as Ae, T as dn } from "./cryptomator_vaults-common.mjs";
var Et = { exports: {} }, hn = Et.exports, de;
function pn() {
  return de || (de = 1, (function(t) {
    (function(n, o) {
      t.exports ? t.exports = o(globalThis.crypto) : n.CryptomatorVault = o(n.crypto);
    })(typeof self < "u" ? self : hn, function(n) {
      const o = n.subtle, l = new TextEncoder(), d = new TextDecoder("utf-8", { fatal: !0 });
      class s extends Error {
        constructor(e, a) {
          super(a || e), this.name = "VaultError", this.code = e;
        }
      }
      function w(g) {
        const e = g.replace(/-/g, "+").replace(/_/g, "/"), a = e + "=".repeat((4 - e.length % 4) % 4), r = atob(a), i = new Uint8Array(r.length);
        for (let c = 0; c < r.length; c++)
          i[c] = r.charCodeAt(c);
        return i;
      }
      function p(g, e) {
        let a = "";
        for (let i = 0; i < g.length; i++)
          a += String.fromCharCode(g[i]);
        const r = btoa(a).replace(/\+/g, "-").replace(/\//g, "_");
        return e ? r : r.replace(/=+$/, "");
      }
      const v = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      function A(g) {
        let e = "", a = 0, r = 0;
        for (const i of g)
          for (a = a << 8 | i, r += 8; r >= 5; )
            e += v[a >>> r - 5 & 31], r -= 5;
        return r > 0 && (e += v[a << 5 - r & 31]), e;
      }
      function C(...g) {
        const e = new Uint8Array(g.reduce((r, i) => r + i.length, 0));
        let a = 0;
        for (const r of g)
          e.set(r, a), a += r.length;
        return e;
      }
      function x(g) {
        const e = new Uint8Array(8);
        return new DataView(e.buffer).setBigUint64(0, BigInt(g)), e;
      }
      function S(g, e) {
        if (g.length !== e.length)
          return !1;
        let a = 0;
        for (let r = 0; r < g.length; r++)
          a |= g[r] ^ e[r];
        return a === 0;
      }
      async function T(g, e, a) {
        const r = await o.importKey(
          "raw",
          g.length ? g : new Uint8Array(64),
          { name: "HMAC", hash: "SHA-256" },
          !1,
          ["sign"]
        ), i = new Uint8Array(a);
        for (let c = 1, h = 0; h < a; c++, h += 32) {
          const f = new Uint8Array([c >>> 24, c >>> 16 & 255, c >>> 8 & 255, c & 255]), m = new Uint8Array(await o.sign("HMAC", r, C(e, f)));
          i.set(m.subarray(0, Math.min(32, a - h)), h);
        }
        return i;
      }
      function O(g) {
        const e = g.slice(), a = (r, i) => r << i | r >>> 32 - i;
        for (let r = 0; r < 8; r += 2)
          e[4] ^= a(e[0] + e[12], 7), e[8] ^= a(e[4] + e[0], 9), e[12] ^= a(e[8] + e[4], 13), e[0] ^= a(e[12] + e[8], 18), e[9] ^= a(e[5] + e[1], 7), e[13] ^= a(e[9] + e[5], 9), e[1] ^= a(e[13] + e[9], 13), e[5] ^= a(e[1] + e[13], 18), e[14] ^= a(e[10] + e[6], 7), e[2] ^= a(e[14] + e[10], 9), e[6] ^= a(e[2] + e[14], 13), e[10] ^= a(e[6] + e[2], 18), e[3] ^= a(e[15] + e[11], 7), e[7] ^= a(e[3] + e[15], 9), e[11] ^= a(e[7] + e[3], 13), e[15] ^= a(e[11] + e[7], 18), e[1] ^= a(e[0] + e[3], 7), e[2] ^= a(e[1] + e[0], 9), e[3] ^= a(e[2] + e[1], 13), e[0] ^= a(e[3] + e[2], 18), e[6] ^= a(e[5] + e[4], 7), e[7] ^= a(e[6] + e[5], 9), e[4] ^= a(e[7] + e[6], 13), e[5] ^= a(e[4] + e[7], 18), e[11] ^= a(e[10] + e[9], 7), e[8] ^= a(e[11] + e[10], 9), e[9] ^= a(e[8] + e[11], 13), e[10] ^= a(e[9] + e[8], 18), e[12] ^= a(e[15] + e[14], 7), e[13] ^= a(e[12] + e[15], 9), e[14] ^= a(e[13] + e[12], 13), e[15] ^= a(e[14] + e[13], 18);
        for (let r = 0; r < 16; r++)
          g[r] = g[r] + e[r] | 0;
      }
      function W(g, e, a, r) {
        r.set(g.subarray((2 * a - 1) * 16, 2 * a * 16));
        for (let i = 0; i < 2 * a; i++) {
          for (let c = 0; c < 16; c++)
            r[c] ^= g[i * 16 + c];
          O(r), e.set(r, ((i & 1) * a + (i >> 1)) * 16);
        }
      }
      function et(g, e, a) {
        const r = 32 * a, i = new Int32Array(r * e), c = new Int32Array(g), h = new Int32Array(r), f = new Int32Array(16);
        for (let m = 0; m < e; m++)
          i.set(c, m * r), W(c, h, a, f), c.set(h);
        for (let m = 0; m < e; m++) {
          const k = c[(2 * a - 1) * 16] & e - 1;
          for (let b = 0; b < r; b++)
            c[b] ^= i[k * r + b];
          W(c, h, a, f), c.set(h);
        }
        return c;
      }
      function H(g) {
        const e = new DataView(g.buffer, g.byteOffset, g.byteLength), a = new Int32Array(g.length / 4);
        for (let r = 0; r < a.length; r++)
          a[r] = e.getInt32(r * 4, !0);
        return a;
      }
      function Y(g, e) {
        const a = new DataView(e.buffer, e.byteOffset, e.byteLength);
        for (let r = 0; r < g.length; r++)
          a.setInt32(r * 4, g[r], !0);
      }
      async function ct(g, e, a, r, i, c) {
        if (a < 2 || (a & a - 1) !== 0)
          throw new s("corrupt", "scrypt cost is not a power of two");
        const h = 128 * r, f = await T(g, e, i * h);
        for (let m = 0; m < i; m++) {
          const k = f.subarray(m * h, (m + 1) * h);
          Y(et(H(k), a, r), k);
        }
        return T(g, f, c);
      }
      function lt(g) {
        const e = new Uint8Array(16);
        for (let a = 0; a < 15; a++)
          e[a] = (g[a] << 1 | g[a + 1] >>> 7) & 255;
        return e[15] = g[15] << 1 & 255, g[0] & 128 && (e[15] ^= 135), e;
      }
      function $(g, e) {
        const a = new Uint8Array(g.length);
        for (let r = 0; r < g.length; r++)
          a[r] = g[r] ^ e[r];
        return a;
      }
      class ut {
        constructor(e) {
          this.key = e, this.subkeys = null;
        }
        async cbcLast(e) {
          return new Uint8Array(await o.encrypt({ name: "AES-CBC", iv: new Uint8Array(16) }, this.key, e)).subarray(e.length - 16, e.length);
        }
        async mac(e) {
          if (this.subkeys === null) {
            const f = await this.cbcLast(new Uint8Array(16)), m = lt(f);
            this.subkeys = [m, lt(m)];
          }
          const [a, r] = this.subkeys, i = Math.max(1, Math.ceil(e.length / 16)), c = new Uint8Array(i * 16);
          c.set(e);
          const h = c.subarray((i - 1) * 16);
          return e.length > 0 && e.length % 16 === 0 ? h.set($(h, a)) : (h[e.length - (i - 1) * 16] = 128, h.set($(h, r))), this.cbcLast(c);
        }
      }
      async function xt(g, e, a) {
        let r = await g.mac(new Uint8Array(16));
        for (const c of e)
          r = $(lt(r), await g.mac(c));
        let i;
        if (a.length >= 16)
          i = a.slice(), i.set($(i.subarray(i.length - 16), r), i.length - 16);
        else {
          const c = new Uint8Array(16);
          c.set(a), c[a.length] = 128, i = $(lt(r), c);
        }
        return g.mac(i);
      }
      function wt(g) {
        const e = g.slice();
        return e[8] &= 127, e[12] &= 127, e;
      }
      class At {
        constructor(e, a) {
          this.cmac = e, this.ctrKey = a;
        }
        async encrypt(e, a) {
          const r = await xt(this.cmac, a, e), i = await o.encrypt({ name: "AES-CTR", counter: wt(r), length: 128 }, this.ctrKey, e);
          return C(r, new Uint8Array(i));
        }
        async decrypt(e, a) {
          if (e.length < 16)
            throw new s("corrupt", "name too short");
          const r = e.subarray(0, 16), i = new Uint8Array(await o.decrypt(
            { name: "AES-CTR", counter: wt(r), length: 128 },
            this.ctrKey,
            e.subarray(16)
          ));
          if (!S(await xt(this.cmac, a, i), r))
            throw new s("corrupt", "name does not authenticate");
          return i;
        }
      }
      const N = 32 * 1024, nt = {
        SIV_GCM: { header: 68, nonce: 12, overhead: 28 },
        SIV_CTRMAC: { header: 88, nonce: 16, overhead: 48 }
      };
      function yt(g, e) {
        const { header: a, overhead: r } = nt[g], i = e - a;
        if (i <= 0)
          return 0;
        const c = Math.floor(i / (N + r)), h = i % (N + r);
        return c * N + Math.max(0, h - r);
      }
      const Xe = /[a-zA-Z0-9\-_]{20}(?:[a-zA-Z0-9\-_]{4})*(?:[a-zA-Z0-9\-_]{4}|[a-zA-Z0-9\-_]{3}=|[a-zA-Z0-9\-_]{2}==)/g, Ye = 36, Je = 32767, Pt = ".cryptomator-vaults-", Ze = 1440 * 60 * 1e3, $e = 255;
      function _t(g) {
        return n.getRandomValues(new Uint8Array(g));
      }
      function ce() {
        return n.randomUUID();
      }
      async function zt(g) {
        return new Uint8Array(await o.digest("SHA-256", g));
      }
      function dt(g) {
        const e = String(g).normalize("NFC");
        if (e === "" || e === "." || e === ".." || /[/\\\u0000-\u001f\u007f]/.test(e) || e.length > $e)
          throw new s("invalid-name", e);
        return e;
      }
      const le = "vault.cryptomator";
      function Qe(g) {
        const e = g.trim().split(".");
        if (e.length !== 3)
          throw new s("unsupported-format", "vault.cryptomator is not a JWT");
        const a = (r) => JSON.parse(d.decode(w(r)));
        return { header: a(e[0]), payload: a(e[1]), signed: e[0] + "." + e[1], signature: w(e[2]) };
      }
      function U(...g) {
        return g.filter((e) => e !== "").join("/");
      }
      class Dt {
        constructor(e, a, r) {
          this.storage = e, this.config = a, this.masterkeyFile = r, this.keys = null;
        }
        /** Reads the vault's configuration and key file; checks the format before any password. */
        static async open(e) {
          let a;
          try {
            a = Qe(d.decode(await e.read(le)));
          } catch (m) {
            throw m instanceof s ? m : new s("unsupported-format", "vault.cryptomator unreadable: " + m.message);
          }
          const { header: r, payload: i } = a;
          if (i.format !== 8)
            throw new s("unsupported-format", "vault format " + i.format);
          if (!(i.cipherCombo in nt))
            throw new s("unsupported-format", "cipher combination " + i.cipherCombo);
          if (r.alg !== "HS256")
            throw new s("unsupported-format", "signature " + r.alg);
          const c = String(r.kid || "");
          if (!c.startsWith("masterkeyfile:"))
            throw new s("unsupported-key", c);
          const h = c.slice(14);
          if (!/^[^/\\]+$/.test(h))
            throw new s("unsupported-key", c);
          const f = JSON.parse(d.decode(await e.read(h)));
          return new Dt(e, a, f);
        }
        get scheme() {
          return this.config.payload.cipherCombo;
        }
        get unlocked() {
          return this.keys !== null;
        }
        /** Derives the keys from the password; a VaultError 'wrong-password' if it is not the vault's. */
        async unlock(e) {
          const a = this.masterkeyFile, r = await ct(
            l.encode(String(e).normalize("NFC")),
            w(a.scryptSalt),
            a.scryptCostParam,
            a.scryptBlockSize,
            1,
            32
          ), i = await o.importKey("raw", r, "AES-KW", !1, ["unwrapKey"]);
          r.fill(0);
          let c, h;
          try {
            const f = async (m) => new Uint8Array(await o.exportKey(
              "raw",
              await o.unwrapKey("raw", w(m), i, "AES-KW", { name: "HMAC", hash: "SHA-256" }, !0, ["sign"])
            ));
            c = await f(a.primaryMasterKey), h = await f(a.hmacMasterKey);
          } catch {
            throw new s("wrong-password");
          }
          try {
            const f = await o.importKey("raw", C(c, h), { name: "HMAC", hash: "SHA-256" }, !1, ["verify"]);
            if (!await o.verify("HMAC", f, this.config.signature, l.encode(this.config.signed)))
              throw new s("corrupt", "vault.cryptomator is not signed with this key");
            const m = (k, b) => o.importKey("raw", k, b, !1, ["encrypt", "decrypt"]);
            this.keys = {
              gcm: await m(c, "AES-GCM"),
              ctr: await m(c, "AES-CTR"),
              mac: await o.importKey("raw", h, { name: "HMAC", hash: "SHA-256" }, !1, ["sign", "verify"])
            }, this.siv = new At(new ut(await m(h, "AES-CBC")), this.keys.ctr), this.dirPaths = /* @__PURE__ */ new Map();
          } finally {
            c.fill(0), h.fill(0);
          }
        }
        /** Forgets the keys; reading needs the password again. */
        lock() {
          this.keys = null, this.siv = null, this.dirPaths = null;
        }
        requireKeys() {
          if (!this.keys)
            throw new s("locked");
        }
        /** The storage folder of a directory: d/XX/YYYY… from the hash of its ID. */
        async dirPath(e) {
          if (this.requireKeys(), !this.dirPaths.has(e)) {
            const a = await this.siv.encrypt(l.encode(e), []), r = A(new Uint8Array(await o.digest("SHA-1", a)));
            this.dirPaths.set(e, U("d", r.slice(0, 2), r.slice(2)));
          }
          return this.dirPaths.get(e);
        }
        /**
         * The name in an entry's file name, found as cryptofs finds it (C9rDecryptor):
         * the first run of base64 in it that decrypts; where one does not, the run is
         * narrowed at its first and last '-' or '_' and tried again. {name, extracted}
         * or null.
         */
        async extractName(e, a, r = 0, i = e.length) {
          const c = new RegExp(Xe.source, "g");
          c.lastIndex = r;
          const h = c.exec(e.slice(0, i));
          if (h === null)
            return null;
          const f = h[0];
          try {
            return { name: d.decode(await this.siv.decrypt(w(f), [l.encode(a)])), extracted: f };
          } catch {
            const m = f.search(/[-_]/);
            if (m === -1)
              return null;
            const k = Math.max(f.lastIndexOf("-"), f.lastIndexOf("_")), b = await this.extractName(e, a, h.index + Math.max(1, m), i);
            return b !== null ? b : this.extractName(e, a, r, h.index + f.length - Math.max(1, f.length - k));
          }
        }
        async decryptName(e, a) {
          const r = e.endsWith(".c9r") ? e.slice(0, -4) : e;
          try {
            return d.decode(await this.siv.decrypt(w(r), [l.encode(a)]));
          } catch (i) {
            throw i instanceof s ? i : new s("corrupt", "name not decryptable");
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
          const a = await this.dirPath(e), r = await this.storage.list(a), i = await Promise.all(r.map((f) => this.describe(a, f, e))), c = i.filter((f) => f !== null && !f.conflict);
          for (const f of i.filter((m) => m?.conflict)) {
            const m = await this.resolveConflict(a, e, f);
            m !== null && c.push(m);
          }
          const h = await Promise.all(c.map(async (f) => f.type !== "dir" || await this.storage.stat?.(await this.dirPath(f.dirId)).then((m) => m !== null, () => !0) !== !1));
          return c.filter((f, m) => h[m]).sort((f, m) => (m.type === "dir") - (f.type === "dir") || f.name.localeCompare(m.name));
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
        async resolveConflict(e, a, r) {
          if (typeof this.storage.move != "function")
            return null;
          const i = r.found.extracted + ".c9r", c = U(e, i);
          try {
            try {
              return await this.storage.move(r.path, c), this.describe(e, { ...r.entry, name: i }, a);
            } catch (f) {
              if (f?.code !== "exists")
                throw f;
            }
            const h = await this.storage.stat(c);
            if (r.entry.isDir && h?.isDir) {
              const f = await this.compareTypeFile(r.path, c, "dir.c9r", Ye, !0);
              if (f.both)
                return f.same ? this.removeDuplicate(r.path) : this.renameConflict(e, a, r);
              const m = await this.compareTypeFile(r.path, c, "symlink.c9r", Je, !1);
              if (m.both)
                return m.same ? this.removeDuplicate(r.path) : this.renameConflict(e, a, r);
              if (!((f.conflicting || m.conflicting) && (f.canonical || m.canonical)))
                return null;
            }
            return this.renameConflict(e, a, r);
          } catch {
            return null;
          }
        }
        async removeDuplicate(e) {
          return await this.storage.remove(e), null;
        }
        /** The first bytes of a folder entry's type file in both entries, compared. */
        async compareTypeFile(e, a, r, i, c) {
          const h = (P) => this.storage.read(U(P, r)).then((M) => M.subarray(0, i), (M) => {
            if (M?.code === "not-found")
              return new Uint8Array(0);
            throw M;
          }), [f, m] = await Promise.all([h(e), h(a)]), k = c ? i : 1, b = f.length >= k, E = m.length >= k;
          return { conflicting: b, canonical: E, both: b && E, same: b && E && S(f, m) };
        }
        /** Renames a conflict's copy as cryptofs does (renameConflictingFile). */
        async renameConflict(e, a, r) {
          const i = r.found.name, c = i.lastIndexOf("."), h = c > 0 ? i.slice(c) : "", f = c > 0 ? i.slice(0, c) : i, m = r.entry.name, k = m.indexOf(r.found.extracted) + r.found.extracted.length, b = m.slice(k, m.length - 4), E = this.config.payload.shorteningThreshold ?? 220, M = Math.trunc((E - 4) / 4) * 3 - 16 - h.length, I = b.slice(0, Math.min(b.length, Math.trunc(M / 2))), D = f.slice(0, Math.max(0, Math.min(f.length, M - Math.max(4, I.length)))), B = [D + I + h];
          for (let z = 1; z < 10; z++)
            B.push(D + " (" + z + ")" + h);
          for (const z of B) {
            const R = p(await this.siv.encrypt(l.encode(z), [l.encode(a)]), !0) + ".c9r", rt = U(e, R);
            if (await this.storage.stat(rt) === null)
              return await this.storage.move(r.path, rt), this.describe(e, { ...r.entry, name: R }, a);
          }
          return null;
        }
        async describe(e, a, r) {
          const i = U(e, a.name), c = await this.describeEntry(e, a, r, i);
          return c !== null && a.mtime && !c.mtime && (c.mtime = a.mtime), c;
        }
        async describeEntry(e, a, r, i) {
          try {
            if (a.name.endsWith(".c9s") && a.isDir) {
              const f = await this.decryptName(d.decode(await this.storage.read(U(i, "name.c9s"))).trim(), r), m = await this.storage.list(i), k = m.find((b) => b.name === "contents.c9r");
              return k ? { name: f, type: "file", size: yt(this.scheme, k.size), path: U(i, "contents.c9r"), mtime: k.mtime } : this.describeNode(f, i, m.map((b) => b.name));
            }
            if (!a.name.endsWith(".c9r"))
              return null;
            const c = await this.extractName(a.name.slice(0, -4), r);
            if (c === null)
              return null;
            if (a.name !== c.extracted + ".c9r")
              return a.name.startsWith(".") ? null : { conflict: !0, entry: a, found: c, path: i };
            const h = c.name;
            return a.isDir ? this.describeNode(h, i, null) : { name: h, type: "file", size: yt(this.scheme, a.size), path: i };
          } catch (c) {
            return { name: a.name, type: "broken", error: c.message, path: i };
          }
        }
        // A folder <name>.c9r (or .c9s): a directory (dir.c9r, its ID) or a link (symlink.c9r).
        async describeNode(e, a, r) {
          const i = async (f) => {
            if (r !== null && !r.includes(f))
              return null;
            try {
              return await this.storage.read(U(a, f));
            } catch (m) {
              if (m instanceof s && m.code === "not-found")
                return null;
              throw m;
            }
          }, c = await i("dir.c9r");
          if (c !== null)
            return { name: e, type: "dir", dirId: d.decode(c).trim(), path: a };
          const h = await i("symlink.c9r");
          if (h !== null) {
            const f = d.decode(await this.decryptContents(h));
            return { name: e, type: "link", target: f, path: a };
          }
          throw new s("corrupt", "neither a directory nor a link");
        }
        /**
         * A file's decrypted contents: onProgress(done, total) after each chunk,
         * onDownload(done, total) while the storage reads it (if it reports that).
         */
        async readFile(e, a, r) {
          return this.decryptContents(await this.storage.read(e.path, r), a);
        }
        async decryptContents(e, a) {
          this.requireKeys();
          const r = nt[this.scheme];
          if (e.length === 0)
            return new Uint8Array(0);
          if (e.length < r.header)
            throw new s("corrupt", "file header too short");
          const i = e.subarray(0, r.header), c = i.subarray(0, r.nonce), h = await this.decryptHeader(i, c), f = e.subarray(r.header), m = N + r.overhead, k = new Uint8Array(yt(this.scheme, e.length));
          for (let b = 0, E = 0; E < f.length; b++, E += m) {
            const P = f.subarray(E, Math.min(E + m, f.length)), M = await this.decryptChunk(P, b, c, h);
            k.set(M, b * N), a && a(Math.min(E + m, f.length), f.length);
          }
          return k;
        }
        async decryptHeader(e, a) {
          let r;
          if (this.scheme === "SIV_GCM")
            try {
              r = new Uint8Array(await o.decrypt({ name: "AES-GCM", iv: a }, this.keys.gcm, e.subarray(12)));
            } catch {
              throw new s("corrupt", "file header does not authenticate");
            }
          else {
            const f = e.subarray(16, 56);
            if (!await o.verify("HMAC", this.keys.mac, e.subarray(56, 88), e.subarray(0, 56)))
              throw new s("corrupt", "file header does not authenticate");
            r = new Uint8Array(await o.decrypt({ name: "AES-CTR", counter: a, length: 128 }, this.keys.ctr, f));
          }
          const i = r.subarray(8, 40), c = this.scheme === "SIV_GCM" ? "AES-GCM" : "AES-CTR", h = await o.importKey("raw", i, c, !1, ["decrypt"]);
          return r.fill(0), h;
        }
        async decryptChunk(e, a, r, i) {
          try {
            if (this.scheme === "SIV_GCM") {
              const m = e.subarray(0, 12);
              return new Uint8Array(await o.decrypt(
                { name: "AES-GCM", iv: m, additionalData: C(x(a), r) },
                i,
                e.subarray(12)
              ));
            }
            const c = e.subarray(0, 16), h = e.subarray(16, e.length - 32), f = e.subarray(e.length - 32);
            if (!await o.verify("HMAC", this.keys.mac, f, C(r, x(a), c, h)))
              throw new Error("mac");
            return new Uint8Array(await o.decrypt({ name: "AES-CTR", counter: c, length: 128 }, i, h));
          } catch {
            throw new s("corrupt", "chunk " + a + " does not authenticate");
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
            throw new s("read-only");
        }
        /**
         * Where a directory's entry of this (checked) name lives: {path (its .c9r, or
         * .c9s for a long name), long, fullName (the encrypted name)}.
         */
        async entryPath(e, a) {
          const r = await this.dirPath(e), i = p(await this.siv.encrypt(l.encode(a), [l.encode(e)]), !0) + ".c9r", c = this.config.payload.shorteningThreshold ?? 220;
          if (i.length > c) {
            const h = p(new Uint8Array(await o.digest("SHA-1", l.encode(i))), !0) + ".c9s";
            return { folder: r, path: U(r, h), long: !0, fullName: i };
          }
          return { folder: r, path: U(r, i), long: !1, fullName: i };
        }
        /** What is stored at an entry's place: null, 'file', 'dir', 'link' or 'unknown'. */
        async existing(e) {
          const a = await this.storage.stat(e.path);
          if (!a)
            return null;
          if (!a.isDir)
            return "file";
          const r = (await this.storage.list(e.path)).map((i) => i.name);
          return r.includes("contents.c9r") ? "file" : r.includes("dir.c9r") ? "dir" : r.includes("symlink.c9r") ? "link" : "unknown";
        }
        /**
         * The start of a file's encryption: a new content key and the header that
         * holds it; encryptChunk(number, plain) encrypts the file's chunks in turn.
         */
        async startEncryption() {
          this.requireKeys();
          const e = nt[this.scheme], a = this.scheme === "SIV_GCM", r = _t(e.nonce), i = _t(32), c = C(new Uint8Array(8).fill(255), i);
          let h;
          if (a)
            h = C(r, new Uint8Array(await o.encrypt({ name: "AES-GCM", iv: r }, this.keys.gcm, c)));
          else {
            const k = new Uint8Array(await o.encrypt({ name: "AES-CTR", counter: r, length: 128 }, this.keys.ctr, c)), b = new Uint8Array(await o.sign("HMAC", this.keys.mac, C(r, k)));
            h = C(r, k, b);
          }
          const f = await o.importKey("raw", i, a ? "AES-GCM" : "AES-CTR", !1, ["encrypt"]);
          c.fill(0), i.fill(0);
          const m = this.keys;
          return {
            header: h,
            async encryptChunk(k, b) {
              const E = _t(e.nonce);
              if (a)
                return C(E, new Uint8Array(await o.encrypt(
                  { name: "AES-GCM", iv: E, additionalData: C(x(k), r) },
                  f,
                  b
                )));
              const P = new Uint8Array(await o.encrypt({ name: "AES-CTR", counter: E, length: 128 }, f, b)), M = new Uint8Array(await o.sign("HMAC", m.mac, C(r, x(k), E, P)));
              return C(E, P, M);
            }
          };
        }
        /** The size of a file of this many bytes, encrypted. */
        encryptedSize(e) {
          const a = nt[this.scheme];
          return a.header + e + Math.ceil(e / N) * a.overhead;
        }
        /** A file's contents encrypted as Cryptomator does: a new content key, header, chunks. */
        async encryptContents(e, a) {
          const r = await this.startEncryption(), i = Math.ceil(e.length / N), c = new Uint8Array(this.encryptedSize(e.length));
          c.set(r.header);
          for (let h = 0, f = r.header.length; h < i; h++) {
            const m = await r.encryptChunk(h, e.subarray(h * N, Math.min((h + 1) * N, e.length)));
            c.set(m, f), f += m.length, a && a(h + 1, i);
          }
          return c;
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
        async *encryptedParts(e, a, r) {
          const i = await this.startEncryption(), c = 32 * N;
          let h = [i.header], f = i.header.length;
          for (let m = 0, k = 0; m < e.size; m += c) {
            const b = await e.read(m, Math.min(m + c, e.size));
            for (let E = 0; E < b.length; E += N, k++) {
              const P = await i.encryptChunk(k, b.subarray(E, Math.min(E + N, b.length)));
              h.push(P), f += P.length, f >= a && (yield C(...h), h = [], f = 0);
            }
            r?.(Math.min(m + c, e.size), e.size);
          }
          f > 0 && (yield C(...h));
        }
        /**
         * Compares a stored file with its source, in ranges: each chunk decrypted and
         * authenticated, its bytes equal to the source's.
         */
        async checkStoredStream(e, a, r) {
          const i = nt[this.scheme], c = this.encryptedSize(a.size), h = await this.storage.stat(e);
          if (!h || h.size !== c)
            throw new s("corrupt", "the stored file has " + (h?.size ?? "no") + " bytes, not " + c);
          const f = await this.storage.readRange(e, 0, i.header), m = f.subarray(0, i.nonce), k = await this.decryptHeader(f, m), b = N + i.overhead, E = Math.ceil(a.size / N), P = 32;
          for (let M = 0; M < E; M += P) {
            const I = Math.min(M + P, E), D = i.header + M * b, B = await this.storage.readRange(e, D, Math.min(i.header + I * b, c)), z = await a.read(M * N, Math.min(I * N, a.size));
            for (let R = M; R < I; R++) {
              const rt = (R - M) * b, ue = await this.decryptChunk(B.subarray(rt, Math.min(rt + b, B.length)), R, m, k);
              if (!S(ue, z.subarray((R - M) * N, (R - M) * N + ue.length)))
                throw new s("corrupt", "the stored file differs from the one written (chunk " + R + ")");
            }
            r?.(Math.min(I * N, a.size), a.size);
          }
        }
        /**
         * writeFile for a source read in pieces (see above). options: replace,
         * onProgress(phase, done, total) with the phases 'upload' and 'verify',
         * partSize (bytes per part handed to the storage).
         */
        async writeFileStream(e, a, r, i = {}) {
          this.requireWritable();
          const { replace: c = !1, onProgress: h, partSize: f = 10 * 1024 * 1024 } = i, m = (z) => (R, rt) => h?.(z, R, rt), k = dt(a), b = await this.entryPath(e, k), E = await this.existing(b);
          if (E !== null && (E !== "file" || !c))
            throw new s(E === "file" ? "exists" : "exists-other", k);
          const P = this.encryptedSize(r.size), M = b.long ? U(b.path, "contents.c9r") : b.path, I = this.stagingPath(), D = b.long && E === null, B = D ? U(I, "contents.c9r") : I;
          try {
            D && (await this.storage.mkdir(I), await this.storage.write(U(I, "name.c9s"), l.encode(b.fullName), { create: !0 })), await this.storage.writeParts(B, P, this.encryptedParts(r, f, m("upload")), { create: !0 }), await this.checkStoredStream(B, r, m("verify")), D ? await this.storage.move(I, b.path) : await this.storage.move(I, M, { overwrite: E !== null });
          } catch (z) {
            throw await this.storage.remove(I).catch(() => {
            }), z;
          }
          return { name: k, path: M, size: r.size };
        }
        /**
         * A file's decrypted contents in pieces, for a file too large to hold:
         * onPiece(bytes) for each range of chunks in turn (awaited), each chunk
         * authenticated; onProgress(done, total).
         */
        async readFileStream(e, a, r) {
          this.requireKeys();
          const i = nt[this.scheme], c = await this.storage.stat(e.path);
          if (!c || c.size === 0)
            return;
          if (c.size < i.header)
            throw new s("corrupt", "file header too short");
          const h = await this.storage.readRange(e.path, 0, i.header), f = h.subarray(0, i.nonce), m = await this.decryptHeader(h, f), k = N + i.overhead, b = yt(this.scheme, c.size), E = Math.ceil((c.size - i.header) / k), P = 64;
          for (let M = 0; M < E; M += P) {
            const I = Math.min(M + P, E), D = await this.storage.readRange(e.path, i.header + M * k, Math.min(i.header + I * k, c.size)), B = [];
            for (let z = M; z < I; z++) {
              const R = (z - M) * k;
              B.push(await this.decryptChunk(D.subarray(R, Math.min(R + k, D.length)), z, f, m));
            }
            await a(C(...B)), r?.(Math.min(I * N, b), b);
          }
        }
        /**
         * A staging name in the vault's top folder, outside d/: Cryptomator passes it
         * by, and its health checks (which look at d/) do not report one a browser
         * left behind. Moving from there is still one rename on the server.
         */
        stagingPath() {
          return Pt + ce() + ".tmp";
        }
        /**
         * Removes the staging files and folders that writes which never finished (a
         * browser closed midway) left in the vault's top folder, once they are older
         * than olderThan (milliseconds; LEFTOVER_AGE), so that a write still going on
         * elsewhere is left alone. Nothing for a vault that cannot be written. Returns
         * the names removed.
         */
        async removeLeftovers({ olderThan: e = Ze, now: a = Date.now() } = {}) {
          if (this.requireKeys(), typeof this.storage.write != "function")
            return [];
          const r = [];
          for (const i of await this.storage.list(""))
            i.name.startsWith(Pt) && i.name.endsWith(".tmp") && i.mtime && a - i.mtime.getTime() >= e && (await this.storage.remove(i.name), r.push(i.name));
          return r;
        }
        /**
         * Puts an entry of several files (name -> bytes) together in a staging folder,
         * checks it (check(stagingFolder), if given) and moves it into
         * place in one step; refused if the place is taken meanwhile. The staging
         * folder goes on any failure.
         */
        async stageAndMove(e, a, r) {
          const i = this.stagingPath();
          await this.storage.mkdir(i);
          try {
            for (const [c, h] of Object.entries(a))
              await this.storage.write(U(i, c), h, { create: !0 });
            r && await r(i), await this.storage.move(i, e.path);
          } catch (c) {
            throw await this.storage.remove(i).catch(() => {
            }), c;
          }
        }
        /** Reads a stored file back and compares it with what was written. */
        async checkStored(e, a, r) {
          const i = await this.storage.read(e, r);
          let c;
          try {
            c = await this.decryptContents(i);
          } catch (h) {
            throw new s("corrupt", "the stored file does not decrypt: " + h.message);
          }
          if (!S(await zt(c), a))
            throw new s("corrupt", "the stored file differs from the one written");
        }
        /**
         * Writes a file into a directory. options.replace allows replacing a file of
         * that name (never a folder); onProgress(phase, done, total) with the phases
         * 'encrypt', 'upload' and 'verify'. Returns {name, path, size}.
         */
        async writeFile(e, a, r, i = {}) {
          this.requireWritable();
          const { replace: c = !1, onProgress: h } = i, f = (D) => (B, z) => h?.(D, B, z), m = dt(a), k = await this.entryPath(e, m), b = await this.existing(k);
          if (b !== null && (b !== "file" || !c))
            throw new s(b === "file" ? "exists" : "exists-other", m);
          const E = await zt(r), P = await this.encryptContents(r, f("encrypt"));
          if (!S(await zt(await this.decryptContents(P)), E))
            throw new s("corrupt", "the encryption does not read back");
          const M = k.long ? U(k.path, "contents.c9r") : k.path;
          if (k.long && b === null)
            return await this.stageAndMove(
              k,
              { "name.c9s": l.encode(k.fullName), "contents.c9r": P },
              (D) => this.checkStored(U(D, "contents.c9r"), E, f("verify"))
            ), { name: m, path: M, size: r.length };
          const I = this.stagingPath();
          try {
            await this.storage.write(I, P, { create: !0, onProgress: f("upload") }), await this.checkStored(I, E, f("verify")), await this.storage.move(I, M, { overwrite: b !== null });
          } catch (D) {
            throw await this.storage.remove(I).catch(() => {
            }), D;
          }
          return { name: m, path: M, size: r.length };
        }
        /** Creates a folder in a directory. Returns {name, dirId}. */
        async createDirectory(e, a) {
          this.requireWritable();
          const r = dt(a), i = await this.entryPath(e, r);
          if (await this.existing(i) !== null)
            throw new s("exists-other", r);
          const c = ce(), h = await this.dirPath(c);
          await this.storage.mkdir(h.split("/").slice(0, 2).join("/"), { existsOk: !0 }), await this.storage.mkdir(h);
          try {
            await this.storage.write(U(h, "dirid.c9r"), await this.encryptContents(l.encode(c)), { create: !0 });
            const m = { "dir.c9r": l.encode(c) };
            i.long && (m["name.c9s"] = l.encode(i.fullName)), await this.stageAndMove(i, m);
          } catch (m) {
            throw await this.storage.remove(h).catch(() => {
            }), m;
          }
          const f = (await this.list(e)).find((m) => m.type === "dir" && m.dirId === c);
          if (!f || f.name !== r)
            throw new s("corrupt", "the new folder does not read back");
          return { name: r, dirId: c };
        }
        /**
         * The folder of this name in a directory: the one there (an upload of a folder
         * merges into it), or a new one. Refused where a file or link has the name.
         * Returns {name, dirId, created}.
         */
        async ensureDirectory(e, a) {
          this.requireWritable();
          const r = await this.findEntry(e, a);
          if (r === null)
            return { ...await this.createDirectory(e, a), created: !0 };
          if (r.kind !== "dir")
            throw new s("exists-other", r.name);
          return { name: r.name, dirId: await this.entryDirId(r), created: !1 };
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
        async findEntry(e, a) {
          const r = dt(a), i = await this.entryPath(e, r), c = await this.existing(i);
          if (c === null)
            return null;
          if (c === "unknown")
            throw new s("corrupt", "the entry of " + r + " is neither file, folder nor link");
          return { ...i, name: r, kind: c };
        }
        async entryDirId(e) {
          return d.decode(await this.storage.read(U(e.path, "dir.c9r"))).trim();
        }
        /**
         * Renames and/or moves an entry: from a directory to another (or the same)
         * under a new (or the same) name. Refused where the new name is taken. A
         * folder moved to another directory needs options.ancestors, the IDs of the
         * target's directories from the vault's top ('' first): a folder cannot go into
         * itself or below itself. Returns {name}.
         */
        async moveEntry(e, a, r, i, c = {}) {
          this.requireWritable();
          const h = await this.findEntry(e, a);
          if (h === null)
            throw new s("not-found", String(a));
          const f = dt(i ?? h.name);
          if (e === r && f === h.name)
            return { name: f };
          if (h.kind === "dir" && e !== r) {
            const k = c.ancestors;
            if (!Array.isArray(k) || k[k.length - 1] !== r)
              throw new s("invalid-move", "the target's ancestors are not known");
            const b = await this.entryDirId(h);
            if (k.includes(b))
              throw new s("invalid-move", h.name);
          }
          const m = await this.entryPath(r, f);
          if (await this.existing(m) !== null)
            throw new s("exists-other", f);
          return !h.long && !m.long ? (await this.storage.move(h.path, m.path), { name: f }) : (await this.rebuildEntry(h, m), await this.storage.remove(h.path), { name: f });
        }
        /**
         * Puts an entry together anew at another place (for a change between short
         * and long names): its files copied on the server into a staging name, a
         * file's contents checked (they decrypt and authenticate), then moved into
         * place in one step. The old entry stays.
         */
        async rebuildEntry(e, a) {
          const r = this.stagingPath(), i = { file: "contents.c9r", dir: "dir.c9r", link: "symlink.c9r" }[e.kind], c = e.long || e.kind !== "file" ? U(e.path, i) : e.path, h = a.long || e.kind !== "file" ? U(r, i) : r;
          try {
            if (h !== r && await this.storage.mkdir(r), await this.storage.copy(c, h), a.long && await this.storage.write(U(r, "name.c9s"), l.encode(a.fullName), { create: !0 }), e.kind !== "dir")
              await this.decryptContents(await this.storage.read(h));
            else if (d.decode(await this.storage.read(h)).trim() !== await this.entryDirId(e))
              throw new s("corrupt", "the copied folder entry differs");
            await this.storage.move(r, a.path);
          } catch (f) {
            throw await this.storage.remove(r).catch(() => {
            }), f;
          }
        }
        /** The IDs of a folder and of every folder below it. */
        async subtree(e) {
          const a = [e];
          for (const r of await this.list(e))
            if (r.type === "dir")
              a.push(...await this.subtree(r.dirId));
            else if (r.type === "broken" && r.path.endsWith(".c9r")) {
              const i = await this.storage.read(U(r.path, "dir.c9r")).then((c) => d.decode(c).trim(), () => null);
              i !== null && a.push(...await this.subtree(i));
            }
          return a;
        }
        /**
         * Deletes an entry: a file or link, or a folder with everything in it (its
         * entry first, so that all of it disappears at once; then the directories of
         * the folder and of every folder below it). Returns {name, folders}.
         */
        async removeEntry(e, a) {
          this.requireWritable();
          const r = await this.findEntry(e, a);
          if (r === null)
            throw new s("not-found", String(a));
          if (r.kind !== "dir")
            return await this.storage.remove(r.path), { name: r.name, folders: 0 };
          const i = await this.subtree(await this.entryDirId(r));
          await this.storage.remove(r.path);
          for (const c of i)
            await this.storage.remove(await this.dirPath(c));
          return { name: r.name, folders: i.length };
        }
      }
      return { Vault: Dt, VaultError: s, cleartextSize: yt, checkName: dt, scrypt: ct, Siv: At, Cmac: ut, base32Encode: A, base64UrlEncode: p, base64Decode: w, VAULT_CONFIG: le, STAGING_PREFIX: Pt };
    });
  })(Et)), Et.exports;
}
var fn = pn();
const Se = /* @__PURE__ */ tn(fn), mn = "cryptomator_vaults";
function u(t, n) {
  return en(mn, t, n, void 0, { escape: !1 });
}
const wn = 100 * 1024 * 1024, yn = 5 * 1024 * 1024, Ee = 1024 * 1024 * 1024, Ft = /* @__PURE__ */ new Set();
function y(t, n, o) {
  const l = document.createElement(t);
  for (const [d, s] of Object.entries(n || {}))
    s == null || s === !1 || (d === "class" ? l.className = s : d.startsWith("on") ? l.addEventListener(d.slice(2), s) : l.setAttribute(d, s === !0 ? "" : s));
  for (const d of [].concat(o ?? []))
    d != null && d !== !1 && l.append(d instanceof Node ? d : document.createTextNode(String(d)));
  return l;
}
function Lt(t) {
  if (window.OC?.Util?.humanFileSize)
    return window.OC.Util.humanFileSize(t);
  const n = ["B", "KB", "MB", "GB", "TB"];
  let o = t, l = 0;
  for (; o >= 1024 && l < n.length - 1; )
    o /= 1024, l++;
  return (l === 0 ? o : o.toFixed(1)) + " " + n[l];
}
function pt(t, n) {
  const o = URL.createObjectURL(new Blob([t], { type: n }));
  return Ft.add(o), o;
}
function gn() {
  for (const t of Ft)
    URL.revokeObjectURL(t);
  Ft.clear(), V();
}
function Me(t, n) {
  const o = y("a", { href: pt(n, "application/octet-stream"), download: t });
  document.body.append(o), o.click(), o.remove();
}
let Q = null;
function V() {
  if (Q) {
    const { dialog: t, onClose: n } = Q;
    Q = null, t.remove(), n?.();
  }
}
function ft(t, n, o) {
  V();
  const l = y("div", {
    class: "cryptomator-dialog",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": t,
    onkeydown: (d) => {
      d.key === "Escape" && V();
    },
    onclick: (d) => {
      d.target === l && V();
    }
  }, y("div", { class: "cryptomator-dialog__panel" }, n));
  return Q = { dialog: l, onClose: o }, document.body.append(l), l;
}
function _(t, n) {
  return y("p", { class: "cryptomator-notice" + (n ? " cryptomator-notice--" + n : ""), role: n === "error" ? "alert" : null }, t);
}
function vn(t, n, o) {
  return new Promise((l) => {
    let d = !1;
    const s = y("input", {
      type: "text",
      name: "username",
      autocomplete: "username",
      readonly: !0,
      class: "cryptomator-unlock__account",
      "aria-label": u("Vault")
    });
    s.value = o;
    const w = y("input", { type: "password", name: "password", autocomplete: "current-password", required: !0, "aria-label": u("Password") }), p = y("div", { "aria-live": "polite" }), v = y("button", { type: "submit", class: "primary" }, u("Unlock"));
    ft(t, [
      y("h2", {}, u("Unlock {vault}", { vault: t })),
      _(u("The password and the vault's keys stay in this browser tab: the server only sends the encrypted files.")),
      y("form", {
        class: "cryptomator-unlock",
        name: "cryptomator-unlock",
        method: "post",
        action: "#",
        autocomplete: "on",
        onsubmit: async (A) => {
          A.preventDefault(), v.disabled = !0, p.replaceChildren(_(u("Unlocking …"))), await new Promise((C) => setTimeout(C, 30));
          try {
            await n(w.value), w.value = "", d = !0, V(), l(!0);
          } catch (C) {
            v.disabled = !1, p.replaceChildren(_(C.message, "error")), w.select();
          }
        }
      }, [
        y("label", {}, [u("Vault"), s]),
        y("label", {}, [u("Password"), w]),
        v,
        y("button", { type: "button", onclick: V }, u("Cancel"))
      ]),
      p
    ], () => {
      w.value = "", d || l(!1);
    }), w.focus();
  });
}
const bn = ["png", "jpg", "jpeg", "gif", "webp", "avif", "bmp", "svg"], he = { mp4: "video/mp4", m4v: "video/mp4", webm: "video/webm", mov: "video/quicktime", ogv: "video/ogg" }, pe = { mp3: "audio/mpeg", m4a: "audio/mp4", ogg: "audio/ogg", oga: "audio/ogg", opus: "audio/ogg", wav: "audio/wav", flac: "audio/flac" }, kn = [
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
function Cn(t) {
  return Te(t).kind !== "none";
}
function Te(t) {
  const n = (/\.([^.]+)$/.exec(t)?.[1] ?? "").toLowerCase();
  return bn.includes(n) ? { kind: "image", type: n === "svg" ? "image/svg+xml" : "image/" + (n === "jpg" ? "jpeg" : n) } : n === "pdf" ? { kind: "pdf", type: "application/pdf" } : n in he ? { kind: "video", type: he[n] } : n in pe ? { kind: "audio", type: pe[n] } : kn.includes(n) ? { kind: "text", type: "text/plain" } : n === "docx" ? { kind: "docx" } : ["pptx", "odp", "odt"].includes(n) ? { kind: n } : ["md", "markdown"].includes(n) ? { kind: "markdown" } : n === "zip" ? { kind: "zip" } : ["heic", "heif"].includes(n) ? { kind: "heic" } : ["xlsx", "xls", "ods"].includes(n) ? { kind: "sheet" } : { kind: "none" };
}
const Ie = {
  docx: async (t) => (await import("./cryptomator_vaults-documents.mjs")).docxPage(t),
  sheet: async (t) => (await import("./cryptomator_vaults-documents.mjs")).sheetPage(t),
  pptx: async (t) => (await import("./cryptomator_vaults-office.mjs")).pptxPage(t),
  odp: async (t) => (await import("./cryptomator_vaults-office.mjs")).odpPage(t),
  odt: async (t) => (await import("./cryptomator_vaults-office.mjs")).odtPage(t),
  markdown: async (t) => (await import("./cryptomator_vaults-previews.mjs")).markdownPage(t),
  zip: async (t) => (await import("./cryptomator_vaults-previews.mjs")).zipPage(t)
};
function xn(t) {
  return t in Ie || t === "heic";
}
async function An(t, n, o) {
  if (t.kind === "heic") {
    const d = await (await import("./cryptomator_vaults-previews.mjs")).heicToPng(n);
    return y("img", { class: "cryptomator-preview", src: pt(d, "image/png"), alt: o });
  }
  const l = await Ie[t.kind](n);
  return y("iframe", { class: "cryptomator-preview cryptomator-preview--frame cryptomator-preview--document", sandbox: "", referrerpolicy: "no-referrer", title: o, srcdoc: l });
}
function Sn(t, n, o) {
  switch (t.kind) {
    case "image":
      return y("img", { class: "cryptomator-preview", src: pt(n, t.type), alt: o });
    case "pdf":
      return y("iframe", { class: "cryptomator-preview cryptomator-preview--frame", src: pt(n, t.type), title: o });
    case "video":
      return y("video", { class: "cryptomator-preview", src: pt(n, t.type), controls: !0 });
    case "audio":
      return y("audio", { class: "cryptomator-preview", src: pt(n, t.type), controls: !0 });
    case "text":
      return y("pre", { class: "cryptomator-preview cryptomator-preview--text" }, new TextDecoder("utf-8").decode(n));
    default:
      return _(u("No preview for this file. Download it to open it."));
  }
}
async function En(t, n, o, l) {
  const d = Te(t), s = d.kind !== "none" && n <= (d.kind === "text" ? yn : wn);
  if (!s && n > Ee && !window.confirm(u("This file is {size}. Your browser holds it twice while decrypting. Continue?", { size: Lt(n) })))
    return;
  const w = y("progress", { max: 1, value: 0 }), p = y("div", { class: "cryptomator-dialog__body" }, [_(u("Decrypting …")), w]), v = y("button", { type: "button", disabled: !0 }, u("Download")), A = ft(t, [
    y("div", { class: "cryptomator-dialog__head" }, [
      y("h2", {}, t),
      y("span", { class: "cryptomator-dialog__meta" }, Lt(n)),
      v,
      y("button", { type: "button", class: "cryptomator-dialog__close", onclick: V }, u("Close"))
    ]),
    p
  ]);
  A.querySelector(".cryptomator-dialog__close").focus();
  try {
    const C = await o((x, S) => {
      w.value = 0.5 + x / S / 2;
    }, (x, S) => {
      w.value = x / S / 2;
    });
    if (Q?.dialog !== A)
      return;
    if (v.disabled = !1, v.addEventListener("click", () => Me(t, C)), !s)
      p.replaceChildren(_(u("No preview for this file. Download it to open it.")));
    else if (xn(d.kind)) {
      p.replaceChildren(_(u("Preparing the preview …")));
      try {
        const x = await An(d, C, t);
        Q?.dialog === A && p.replaceChildren(x);
      } catch (x) {
        Q?.dialog === A && p.replaceChildren(_(u("This document cannot be previewed: {detail}. Download it to open it.", { detail: x.message }), "error"));
      }
    } else
      p.replaceChildren(Sn(d, C, t));
  } catch (C) {
    Q?.dialog === A && p.replaceChildren(_(l(C), "error"));
  }
}
function Ne(t, n, o, { initial: l = "", action: d = u("Create") } = {}) {
  return new Promise((s) => {
    let w = !1;
    const p = y("input", { type: "text", required: !0, "aria-label": n, autocomplete: "off" });
    p.value = l;
    const v = y("div", { "aria-live": "polite" });
    ft(t, [
      y("h2", {}, t),
      y("form", {
        class: "cryptomator-unlock",
        onsubmit: (C) => {
          C.preventDefault();
          const x = o(p.value);
          if (x) {
            v.replaceChildren(_(x, "error"));
            return;
          }
          w = !0;
          const S = p.value;
          V(), s(S);
        }
      }, [
        y("label", {}, [n, p]),
        y("button", { type: "submit", class: "primary" }, d),
        y("button", { type: "button", onclick: V }, u("Cancel"))
      ]),
      v
    ], () => {
      w || s(null);
    }), p.focus();
    const A = l.lastIndexOf(".");
    p.setSelectionRange(0, A > 0 ? A : l.length);
  });
}
function Mn(t, n, o) {
  return new Promise((l) => {
    let d = !1;
    ft(t, [
      y("h2", {}, t),
      _(n),
      y("div", { class: "cryptomator-choices" }, [
        y("button", { type: "button", class: "error primary", onclick: () => {
          d = !0, V();
        } }, o),
        y("button", { type: "button", onclick: V }, u("Cancel"))
      ])
    ], () => l(d)), document.querySelector(".cryptomator-dialog button:last-child")?.focus();
  });
}
function Tn(t, n, o, l, d) {
  return new Promise((s) => {
    let w = null, p = [{ name: n, dirId: "" }];
    const v = y("ol", { class: "cryptomator-crumbs" }), A = y("ul", { class: "cryptomator-folders" }), C = y("button", { type: "button", class: "primary", onclick: () => {
      w = { dirId: p[p.length - 1].dirId, ancestors: p.map((S) => S.dirId) }, V();
    } }, d), x = async () => {
      v.replaceChildren(...p.map((S, T) => y("li", {}, T === p.length - 1 ? y("span", { "aria-current": "page" }, S.name) : y("button", { type: "button", onclick: () => {
        p = p.slice(0, T + 1), x();
      } }, S.name)))), A.replaceChildren(_(u("Loading …")));
      try {
        const S = (await o(p[p.length - 1].dirId)).sort((T, O) => T.name.localeCompare(O.name));
        A.replaceChildren(...S.length ? S.map((T) => y("li", {}, y("button", {
          type: "button",
          class: "cryptomator-folders__item",
          disabled: l.has(T.dirId),
          onclick: () => {
            p = [...p, T], x();
          }
        }, T.name))) : [_(u("No folders in here."))]);
      } catch (S) {
        A.replaceChildren(_(S.message, "error"));
      }
    };
    ft(t, [
      y("h2", {}, t),
      y("nav", {}, v),
      y("div", { class: "cryptomator-dialog__body" }, A),
      y("div", { class: "cryptomator-choices" }, [C, y("button", { type: "button", onclick: V }, u("Cancel"))])
    ], () => s(w)), x();
  });
}
function In(t) {
  const n = y("ul", { class: "cryptomator-uploads" }), o = y("progress", { max: 1, value: 0 }), l = y("div", { "aria-live": "polite" }), d = y("div", { class: "cryptomator-question", hidden: !0 });
  let s = !1;
  const w = y("button", { type: "button", onclick: () => {
    s = !0, w.disabled = !0, w.textContent = u("Stopping after this file …");
  } }, u("Stop")), p = y("button", { type: "button", class: "primary", hidden: !0, onclick: V }, u("Close"));
  return ft(t, [
    y("div", { class: "cryptomator-dialog__head" }, [y("h2", {}, t), w, p]),
    o,
    d,
    y("div", { class: "cryptomator-dialog__body" }, n),
    l
  ]), {
    get stopped() {
      return s;
    },
    file(v) {
      const A = y("span", { class: "cryptomator-dialog__meta" }, u("Waiting")), C = y("progress", { max: 1, value: 0 });
      return n.append(y("li", {}, [y("span", { class: "cryptomator-uploads__name" }, v), A, C])), {
        phase(x, S) {
          A.textContent = x, C.value = S;
        },
        done(x, S) {
          A.textContent = x, A.classList.toggle("cryptomator-notice--error", !!S), C.value = 1;
        }
      };
    },
    /** What to do with a taken name: 'replace', 'skip', 'replace-all', 'skip-all' or 'cancel'. */
    ask(v, A) {
      return new Promise((C) => {
        const x = (S) => () => {
          d.hidden = !0, d.replaceChildren(), C(S);
        };
        d.replaceChildren(
          y("h3", {}, u("“{name}” already exists", { name: v })),
          _(u("Replace the file in the vault with the one you chose? The vault keeps no copy of the old one; Nextcloud's versions keep its encrypted file.")),
          y("div", { class: "cryptomator-choices" }, [
            y("button", { type: "button", class: "primary", onclick: x("replace") }, u("Replace")),
            y("button", { type: "button", onclick: x("skip") }, u("Skip")),
            A > 1 ? y("button", { type: "button", onclick: x("replace-all") }, u("Replace all")) : null,
            A > 1 ? y("button", { type: "button", onclick: x("skip-all") }, u("Skip all")) : null,
            y("button", { type: "button", onclick: x("cancel") }, u("Cancel upload"))
          ])
        ), d.hidden = !1, d.querySelector("button").focus();
      });
    },
    progress(v) {
      o.value = v;
    },
    finish(v, A) {
      o.value = 1, w.hidden = !0, p.hidden = !1, l.replaceChildren(_(v, A ? "error" : void 0)), p.focus();
    }
  };
}
const { VaultError: K } = Se, Ot = "DAV:", Nn = 20 * 1024 * 1024, fe = 10 * 1024 * 1024;
function Un() {
  return window.OC && window.OC.requestToken || document.head.dataset.requesttoken || "";
}
function J(t) {
  return { requesttoken: Un(), "X-Requested-With": "XMLHttpRequest", ...t || {} };
}
function mt() {
  return nn()?.uid ?? "";
}
function Mt(t) {
  return t.split("/").filter((n) => n !== "").map(encodeURIComponent).join("/");
}
function Pn(t) {
  const n = Mt(t);
  return jt("dav") + "/files/" + encodeURIComponent(mt()) + "/" + (n ? n + "/" : "");
}
function Ht(t) {
  const n = new DOMParser().parseFromString(t, "application/xml");
  return Array.from(n.getElementsByTagNameNS(Ot, "response")).map((o) => {
    const l = (w) => o.getElementsByTagNameNS(Ot, w)[0], d = l("getcontentlength"), s = l("getlastmodified");
    return {
      href: l("href").textContent,
      isDir: o.getElementsByTagNameNS(Ot, "collection").length > 0,
      size: d ? Number(d.textContent) : 0,
      mtime: s ? new Date(s.textContent) : void 0
    };
  });
}
function _n(t) {
  const n = t.replace(/\/+$/, "").split("/");
  return decodeURIComponent(n[n.length - 1]);
}
function ht(t, n, o) {
  return t === 0 ? new K("network", (o ? o + ": " : "") + "redirected (signed out?)") : t === 404 ? new K("not-found", n) : t === 412 || t === 405 ? new K("exists", n) : t === 507 ? new K("quota", n) : new K("network", (o ? o + ": " : "") + "HTTP " + t);
}
function gt(t, n) {
  return t >= 200 && t < 300 && !n;
}
function me(t, n, o, l, d) {
  return new Promise((s, w) => {
    const p = new XMLHttpRequest();
    p.open(t, n);
    for (const [v, A] of Object.entries(J(o)))
      p.setRequestHeader(v, A);
    d && p.upload.addEventListener("progress", (v) => d(v.loaded, v.total)), p.addEventListener("load", () => s(new URL(p.responseURL, n).href === new URL(n, window.location.href).href ? p.status : 0)), p.addEventListener("error", () => w(new K("network", t + " failed"))), p.addEventListener("abort", () => w(new K("network", t + " aborted"))), p.send(l ?? null);
  });
}
async function St(t, n, o, l, d = []) {
  const s = await fetch(n, { method: t, headers: J(o), credentials: "same-origin" });
  if (!gt(s.status, s.redirected) && !d.includes(s.status))
    throw ht(s.redirected ? 0 : s.status, l, t);
  return s;
}
function Ue(t) {
  const n = Pn(t), o = (s) => n + Mt(s);
  async function l(s, w, p, v, A) {
    const C = jt("dav") + "/uploads/" + encodeURIComponent(mt()) + "/cryptomator-vaults-" + crypto.randomUUID(), x = new URL(o(s), window.location.href).href, S = { Destination: x, "OC-Total-Length": String(w) };
    await St("MKCOL", C, { Destination: x }, s);
    try {
      let T = 0, O = 1;
      for await (const et of p) {
        const H = await me(
          "PUT",
          C + "/" + String(O).padStart(5, "0"),
          S,
          et,
          (Y) => A?.(T + Y, w)
        );
        if (!gt(H, !1))
          throw ht(H, s, "PUT (part " + O + ")");
        T += et.length, O++;
      }
      const W = await fetch(C + "/.file", {
        method: "MOVE",
        headers: J({ ...S, Overwrite: v ? "F" : "T" }),
        credentials: "same-origin"
      });
      if (!gt(W.status, W.redirected))
        throw ht(W.redirected ? 0 : W.status, s, "MOVE (assembling the parts)");
    } catch (T) {
      throw await fetch(C, { method: "DELETE", headers: J(), credentials: "same-origin" }).catch(() => {
      }), T;
    }
  }
  function* d(s) {
    for (let w = 0; w < s.length; w += fe)
      yield s.subarray(w, Math.min(w + fe, s.length));
  }
  return {
    async read(s, w) {
      const p = await fetch(n + Mt(s), { headers: J(), credentials: "same-origin" });
      if (p.status === 404)
        throw new K("not-found", s);
      if (!p.ok)
        throw new K("network", "GET: HTTP " + p.status);
      const v = Number(p.headers.get("Content-Length")) || 0;
      if (!w || !p.body || v === 0)
        return new Uint8Array(await p.arrayBuffer());
      const A = new Uint8Array(v), C = p.body.getReader();
      let x = 0;
      for (; ; ) {
        const { done: S, value: T } = await C.read();
        if (S)
          break;
        A.set(T, x), x += T.length, w(x, v);
      }
      return A.subarray(0, x);
    },
    async stat(s) {
      const w = await fetch(o(s), {
        method: "PROPFIND",
        headers: J({ Depth: "0", "Content-Type": "application/xml; charset=utf-8" }),
        credentials: "same-origin",
        body: '<?xml version="1.0"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/></d:prop></d:propfind>'
      });
      if (w.status === 404)
        return null;
      if (w.status !== 207)
        throw ht(w.status, s, "PROPFIND");
      const [p] = Ht(await w.text());
      return { isDir: p.isDir, size: p.size };
    },
    /** Stores a file whole; create: refused (VaultError 'exists') if the name is taken. */
    async write(s, w, { create: p = !1, onProgress: v } = {}) {
      if (w.length >= Nn)
        return l(s, w.length, d(w), p, v);
      const A = await me("PUT", o(s), p ? { "If-None-Match": "*" } : {}, w, v);
      if (!gt(A, !1))
        throw ht(A, s, "PUT");
    },
    /** A file too large to hold, from its parts in turn (chunked upload); complete or absent. */
    async writeParts(s, w, p, { create: v = !1, onProgress: A } = {}) {
      return l(s, w, p, v, A);
    },
    /** Bytes start to end (exclusive) of a stored file. */
    async readRange(s, w, p) {
      if (p <= w)
        return new Uint8Array(0);
      const v = await fetch(o(s), {
        headers: J({ Range: "bytes=" + w + "-" + (p - 1) }),
        credentials: "same-origin"
      });
      if (v.status === 404)
        throw new K("not-found", s);
      if (v.status === 206)
        return new Uint8Array(await v.arrayBuffer());
      if (v.status === 200)
        return new Uint8Array(await v.arrayBuffer()).slice(w, p);
      throw new K("network", "GET (range): HTTP " + v.status);
    },
    async mkdir(s, { existsOk: w = !1 } = {}) {
      const p = await fetch(o(s), { method: "MKCOL", headers: J(), credentials: "same-origin" });
      if (!(gt(p.status, p.redirected) || p.status === 405 && w))
        throw ht(p.status, s, "MKCOL");
    },
    /** Moves in one step; refused (VaultError 'exists') if the target is taken, unless overwrite. */
    async move(s, w, { overwrite: p = !1 } = {}) {
      await St("MOVE", o(s), { Destination: new URL(o(w), window.location.href).href, Overwrite: p ? "T" : "F" }, w);
    },
    /** Copies on the server; refused (VaultError 'exists') if the target is taken. */
    async copy(s, w) {
      await St("COPY", o(s), { Destination: new URL(o(w), window.location.href).href, Overwrite: "F" }, w);
    },
    async remove(s) {
      await St("DELETE", o(s), {}, s, [404]);
    },
    async list(s) {
      const w = await fetch(n + (s ? Mt(s) + "/" : ""), {
        method: "PROPFIND",
        headers: J({ Depth: "1", "Content-Type": "application/xml; charset=utf-8" }),
        credentials: "same-origin",
        body: '<?xml version="1.0"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/></d:prop></d:propfind>'
      });
      if (w.status === 404)
        throw new K("not-found", s);
      if (!w.ok)
        throw new K("network", "PROPFIND: HTTP " + w.status);
      return Ht(await w.text()).slice(1).map((p) => ({ name: _n(p.href), isDir: p.isDir, size: p.size, mtime: p.mtime }));
    }
  };
}
async function zn() {
  const t = mt(), n = (d) => d.replace(/&/g, "&amp;").replace(/</g, "&lt;"), o = await fetch(jt("dav") + "/", {
    method: "SEARCH",
    headers: J({ "Content-Type": "text/xml; charset=utf-8" }),
    credentials: "same-origin",
    body: '<?xml version="1.0" encoding="UTF-8"?><d:searchrequest xmlns:d="DAV:"><d:basicsearch><d:select><d:prop><d:displayname/></d:prop></d:select><d:from><d:scope><d:href>/files/' + n(t) + "</d:href><d:depth>infinity</d:depth></d:scope></d:from><d:where><d:like><d:prop><d:displayname/></d:prop><d:literal>vault.cryptomator</d:literal></d:like></d:where></d:basicsearch></d:searchrequest>"
  });
  if (!o.ok)
    throw new Error("HTTP " + o.status);
  const l = "/files/" + t + "/";
  return Ht(await o.text()).map((d) => decodeURIComponent(d.href)).filter((d) => d.endsWith("/vault.cryptomator") && d.includes(l)).map((d) => "/" + d.slice(d.indexOf(l) + l.length, -18)).map((d) => d.replace(/\/+$/, "") || "/").sort((d, s) => d.localeCompare(s));
}
const { Vault: Pe, checkName: _e } = Se;
let Rt = null;
function Xt() {
  return Rt || (document.head.append(y("link", { rel: "stylesheet", href: dn("cryptomator_vaults", "css", "cryptomator_vaults-files.css") })), Rt = import("./cryptomator_vaults-dialogs.mjs")), Rt;
}
function F(t) {
  Xt().then(({ showError: n }) => n(t));
}
function Yt(t) {
  Xt().then(({ showInfo: n }) => n(t));
}
const Jt = "cryptomator-vaults", Ct = "/cryptomator-vaults", Zt = window.location.origin + "/apps/cryptomator_vaults" + Ct, Dn = rn("cryptomator_vaults", "file.svg"), Bt = 15, ze = "cryptomator_vaults.added", $t = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 3h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-1v1h-3v-1H8v1H5v-1H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v13h16V5zm8 2.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5.5 8h1.5v7H5.5z"/></svg>', On = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 8a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/></svg>', Rn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>', De = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9V6zm9 14H6V10h12v10z"/></svg>', Oe = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>', Vn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"/></svg>', Fn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.21a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>', Ln = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-6 12v-3h-4v-4h4V8l5 5-5 5z"/></svg>', Hn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>', Bn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6a5 5 0 0 0-9.9-1l1.95.45A3 3 0 0 1 15 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm0 12H6V10h12v10z"/></svg>', Kn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2zm5 9h-2v2h-2v-2H9v-2h2V9h2v2h2v2z"/></svg>', L = /* @__PURE__ */ new Map();
let Vt = null, vt = null, j = { kind: "vaults" };
async function Kt(t, n) {
  const o = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)));
  return Array.from(o, (l) => l.toString(16).padStart(2, "0")).join("").slice(0, n);
}
const qn = "r000000000001", Re = 2 ** 52;
function Ve(t) {
  return Re + parseInt(t.slice(1, 13), 16);
}
function Fe() {
  try {
    const t = JSON.parse(window.localStorage.getItem(ze) || "[]");
    return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
  } catch {
    return [];
  }
}
function Wn(t) {
  try {
    window.localStorage.setItem(ze, JSON.stringify([.../* @__PURE__ */ new Set([t, ...Fe()])]));
  } catch {
  }
}
function jn(t) {
  return t.split("/").filter(Boolean).pop() || u("All files");
}
async function Le(t) {
  const n = "v" + await Kt("vault:" + t, 12);
  return L.has(n) || L.set(n, { seg: n, folder: t, name: jn(t), vault: null, dirs: /* @__PURE__ */ new Map(), entries: /* @__PURE__ */ new Map(), nodes: /* @__PURE__ */ new Set() }), L.get(n);
}
function Qt() {
  return Vt || (Vt = (async () => {
    let t = [];
    try {
      t = await zn();
    } catch (n) {
      F(u("The search for vaults failed: {detail}", { detail: n.message }));
    }
    for (const n of [.../* @__PURE__ */ new Set([...t, ...Fe()])])
      await Le(n);
  })()), Vt;
}
function it(t, n, o, l, d = !0) {
  const s = t.split("/").filter(Boolean).pop() || qn, w = new xe({
    id: Ve(s),
    source: Zt + t,
    root: Ct,
    owner: mt(),
    displayname: n,
    permissions: Gt.READ,
    mtime: l?.mtime,
    attributes: { cryptomatorVault: o?.seg ?? null, ...l?.attributes }
  });
  return d && o?.nodes.add(w), w;
}
function Gn(t, n, o) {
  const l = t.split("/").pop(), d = new un({
    id: Ve(l),
    source: Zt + t,
    root: Ct,
    owner: mt(),
    displayname: n.name,
    mime: "application/octet-stream",
    size: n.size ?? 0,
    mtime: n.mtime,
    permissions: Gt.READ,
    attributes: { "has-preview": !0, previewUrl: Dn, cryptomatorVault: o.seg, cryptomatorType: n.type }
  });
  return o.nodes.add(d), d;
}
function q(t) {
  switch (t?.code) {
    case "exists":
    case "exists-other":
      return u("“{name}” already exists in this folder.", { name: t.message });
    case "invalid-name":
      return u("“{name}” cannot be a name in a vault.", { name: t.message });
    case "quota":
      return u("Your storage is full.");
    case "read-only":
      return u("This vault cannot be written to.");
    case "invalid-move":
      return u("A folder cannot be moved into itself or into a folder inside it.");
    case "wrong-password":
      return u("Wrong password.");
    case "unsupported-format":
      return u("This vault has a format the app cannot read (only vault format 8, Cryptomator 1.6 and later).");
    case "unsupported-key":
      return u("This vault keeps its key on a Cryptomator Hub, which the app does not support.");
    case "not-found":
      return u("There is no Cryptomator vault in this folder.");
    case "corrupt":
      return u("The vault is damaged: {detail}", { detail: t.message });
    case "locked":
      return u("The vault is locked.");
    default:
      return u("Something went wrong: {detail}", { detail: t?.message || String(t) });
  }
}
function bt(t) {
  window.OCP.Files.Router.goToRoute(null, { view: Jt }, { dir: t });
}
function te() {
  return window.OCP?.Files?.Router?.query?.dir || "/";
}
async function He(t) {
  if (t.vault?.unlocked)
    return !0;
  try {
    t.vault = t.vault || await Pe.open(Ue(t.folder));
  } catch (o) {
    return F(q(o)), !1;
  }
  const n = await vn(t.name, async (o) => {
    try {
      await t.vault.unlock(o);
    } catch (l) {
      throw new Error(q(l));
    }
  }, t.folder);
  return n && (Be(), t.vault.removeLeftovers().catch(() => {
  })), n;
}
async function we() {
  j = { kind: "vaults" };
  const t = it("/", u("Vaults"), null), n = [...L.values()].sort((o, l) => o.name.localeCompare(l.name)).map((o) => it("/" + o.seg, o.name, o, { attributes: { cryptomatorVaultRoot: !0, cryptomatorFolder: o.folder } }, !1));
  return { folder: t, contents: n };
}
const It = window.isSecureContext && !!window.crypto?.subtle;
async function Xn(t) {
  if (re(), !It)
    return j = { kind: "insecure" }, { folder: new xe({ id: Re + 1, source: Zt + "/", root: Ct, owner: mt(), permissions: Gt.READ }), contents: [] };
  await Qt();
  const n = t.split("/").filter(Boolean);
  if (n.length === 0)
    return we();
  const o = L.get(n[0]);
  if (!o)
    return bt("/"), we();
  if (!o.vault?.unlocked && !await He(o))
    return j = { kind: "locked", vault: o }, { folder: it(t, o.name, o, { attributes: { cryptomatorVaultRoot: n.length === 1 } }, !1), contents: [] };
  let l = "", d = o.name;
  if (n.length > 1) {
    const p = o.dirs.get(n[n.length - 1]);
    if (!p)
      return bt("/" + o.seg), { folder: it(t, o.name, o), contents: [] };
    l = p.dirId, d = p.name;
  }
  const s = await o.vault.list(l), w = [];
  for (const p of s)
    if (p.type === "dir") {
      const v = "d" + await Kt(o.seg + ":dir:" + p.dirId, 12);
      o.dirs.set(v, { dirId: p.dirId, name: p.name }), w.push(it(t + "/" + v, p.name, o, { mtime: p.mtime }));
    } else {
      const v = "f" + await Kt(o.seg + ":file:" + p.path, 12);
      o.entries.set(v, p), w.push(Gn(t + "/" + v, p, o));
    }
  return j = { kind: "folder", vault: o, dirId: l, path: t }, { folder: it(t, d, o, void 0, n.length > 1), contents: w };
}
function Yn(t) {
  if (t.replaceChildren(), t.classList.add("cryptomator-empty"), j.kind === "insecure")
    t.append(_(u("Vaults can only be opened over HTTPS: the browser provides its encryption only there."), "error"));
  else if (j.kind === "locked") {
    const n = j.vault;
    t.append(
      y("h2", {}, u("{vault} is locked", { vault: n.name })),
      _(u("Its files are decrypted in this browser tab once you enter its password.")),
      y("button", {
        type: "button",
        class: "primary",
        onclick: async () => {
          await He(n) && Nt(n.name);
        }
      }, u("Unlock"))
    );
  } else j.kind === "folder" ? t.append(y("h2", {}, u("This folder is empty."))) : t.append(
    y("h2", {}, u("No vaults found")),
    _(u("Vaults in your files appear here. Open a vault's folder to add one.")),
    y("button", { type: "button", class: "primary", onclick: Ke }, u("Open a vault folder …"))
  );
}
function Nt(t) {
  Ae("files:node:updated", it(te(), t, null));
}
function Ut(t) {
  if (t.vault?.unlocked) {
    if (tt && j.vault === t) {
      Yt(u("The vault locks when the change being made has finished."));
      const n = setInterval(() => {
        tt || (clearInterval(n), Ut(t));
      }, 500);
      return;
    }
    t.vault.lock();
    for (const n of t.nodes)
      Ae("files:node:deleted", n);
    t.nodes.clear(), t.dirs.clear(), t.entries.clear(), gn(), qt(ot?.folder), te().startsWith("/" + t.seg) && bt("/"), [...L.values()].some((n) => n.vault?.unlocked) || (clearTimeout(vt), vt = null);
  }
}
function ee(t) {
  let n = !1;
  for (const o of L.values())
    o.vault?.unlocked && (Ut(o), n = !0);
  n && t && Yt(t);
}
function Be() {
  clearTimeout(vt), vt = setTimeout(
    () => ee(u("Locked after {minutes} minutes without use.", { minutes: Bt })),
    Bt * 60 * 1e3
  );
}
function Jn() {
  vt !== null && Be();
}
async function ne(t) {
  try {
    await Pe.open(Ue(t));
  } catch (o) {
    F(q(o));
    return;
  }
  Wn(t), await Qt();
  const n = await Le(t);
  bt("/" + n.seg);
}
async function Ke() {
  let t;
  try {
    const { getFilePickerBuilder: o } = await Xt();
    t = await o(u("Choose a vault")).setMultiSelect(!1).allowDirectories(!0).setFilter((l) => l.type === Z.Folder || l.basename === "vault.cryptomator").addButton({ label: u("Open vault"), variant: "primary", callback: () => {
    } }).build().pick();
  } catch {
    return;
  }
  const n = "/" + String(t).replace(/^\/+|\/+$/g, "");
  await ne(n.endsWith("/vault.cryptomator") ? n.slice(0, -18) || "/" : n);
}
function G(t) {
  return t?.id === Jt;
}
const Zn = /* @__PURE__ */ new Set([
  "cryptomator-vaults-open",
  "cryptomator-vaults-download",
  "cryptomator-vaults-lock",
  "cryptomator-vaults-open-vault",
  "cryptomator-vaults-rename",
  "cryptomator-vaults-move",
  "cryptomator-vaults-delete"
]), ye = /* @__PURE__ */ new WeakSet();
let ge = 0;
function re() {
  const t = ln();
  if (t.length !== ge) {
    ge = t.length;
    for (const n of t) {
      if (Zn.has(n.id) || ye.has(n))
        continue;
      const o = n.enabled;
      try {
        Object.defineProperty(n, "enabled", {
          configurable: !0,
          enumerable: !0,
          writable: !0,
          value: (l) => !G(l?.view) && !(l?.nodes ?? []).some((d) => d?.root === Ct) && (o ? o.call(n, l) : !0)
        }), ye.add(n);
      } catch {
      }
    }
  }
}
function qe(t) {
  const n = L.get(t.attributes?.cryptomatorVault), o = n?.entries.get(t.basename);
  return { vault: n, entry: o };
}
st({
  id: "cryptomator-vaults-open",
  displayName: ({ nodes: t }) => t[0]?.type === Z.Folder ? u("Open") : u("View"),
  iconSvgInline: () => On,
  enabled: ({ nodes: t, view: n }) => (re(), G(n) && t.length === 1),
  async exec({ nodes: t }) {
    const n = t[0];
    if (n.type === Z.Folder)
      return bt(n.path), null;
    const { vault: o, entry: l } = qe(n);
    return !o?.vault?.unlocked || !l ? (F(u("The vault is locked.")), null) : (l.type === "link" ? Yt(u("A link to {target}", { target: l.target })) : l.type === "broken" ? F(u("This entry cannot be read: {detail}", { detail: l.error })) : l.size >= ae && !Cn(l.name) ? await We(o, l) : await En(l.name, l.size, (d, s) => o.vault.readFile(l, d, s), q), null);
  },
  default: an.DEFAULT,
  order: -1e3
});
async function We(t, n) {
  if (n.size >= ae && typeof window.showSaveFilePicker == "function") {
    let o;
    try {
      o = await (await window.showSaveFilePicker({ suggestedName: n.name })).createWritable();
    } catch {
      return;
    }
    try {
      await t.vault.readFileStream(n, (l) => o.write(l)), await o.close();
    } catch (l) {
      await o.abort().catch(() => {
      }), F(q(l));
    }
    return;
  }
  if (!(n.size > Ee && !window.confirm(u("This file is {size}. Your browser holds it twice while decrypting. Continue?", { size: Lt(n.size) }))))
    try {
      Me(n.name, await t.vault.readFile(n));
    } catch (o) {
      F(q(o));
    }
}
async function ve(t) {
  const { vault: n, entry: o } = qe(t);
  return !n?.vault?.unlocked || !o ? (F(u("The vault is locked.")), null) : (await We(n, o), null);
}
st({
  id: "cryptomator-vaults-download",
  displayName: () => u("Download"),
  iconSvgInline: () => Rn,
  enabled: ({ nodes: t, view: n }) => G(n) && t.length > 0 && t.every((o) => o.type === Z.File && o.attributes?.cryptomatorType === "file"),
  exec: ({ nodes: t }) => ve(t[0]),
  async execBatch({ nodes: t }) {
    const n = [];
    for (const o of t)
      n.push(await ve(o));
    return n;
  },
  order: -900
});
st({
  id: "cryptomator-vaults-lock",
  displayName: () => u("Lock"),
  iconSvgInline: () => De,
  enabled: ({ nodes: t, view: n }) => G(n) && t.length === 1 && t[0].attributes?.cryptomatorVaultRoot === !0 && L.get(t[0].attributes.cryptomatorVault)?.vault?.unlocked === !0,
  async exec({ nodes: t }) {
    return Ut(L.get(t[0].attributes.cryptomatorVault)), null;
  },
  order: -800
});
st({
  id: "cryptomator-vaults-open-vault",
  displayName: () => u("Open vault"),
  iconSvgInline: () => $t,
  enabled: ({ nodes: t, view: n }) => n?.id === "files" && t.length === 1 && t[0].root?.startsWith("/files/") && (t[0].basename === "vault.cryptomator" || t[0].type === Z.Folder && [...L.values()].some((o) => o.folder === t[0].path)),
  async exec({ nodes: t }) {
    const n = t[0];
    return await ne(n.type === Z.Folder ? n.path : n.dirname), null;
  },
  order: 50
});
const je = /* @__PURE__ */ new Set();
let at = null;
function $n(t) {
  return je.has(t) || [...L.values()].some((n) => n.folder === t);
}
function Tt(t) {
  if (!at)
    return;
  at.folder = t;
  const n = t?.path;
  if (!n || !$n(n)) {
    at.el.replaceChildren();
    return;
  }
  at.el.replaceChildren(y("div", { class: "cryptomator-banner", role: "note" }, [
    y("span", { class: "cryptomator-banner__icon", "aria-hidden": "true" }),
    y(
      "span",
      { class: "cryptomator-banner__text" },
      u("This folder is a Cryptomator vault: its files are encrypted. Open it to see them, decrypted in this browser.")
    ),
    y("button", { type: "button", class: "primary", onclick: () => ne(n) }, u("Open vault"))
  ])), at.el.querySelector(".cryptomator-banner__icon").innerHTML = $t;
}
let ot = null;
function qt(t) {
  if (!ot)
    return;
  ot.folder = t;
  const n = L.get(t?.attributes?.cryptomatorVault);
  if (!n?.vault?.unlocked) {
    ot.el.replaceChildren();
    return;
  }
  ot.el.replaceChildren(y("div", { class: "cryptomator-banner cryptomator-banner--unlocked", role: "status" }, [
    y("span", { class: "cryptomator-banner__icon", "aria-hidden": "true" }),
    y(
      "span",
      { class: "cryptomator-banner__text" },
      u("{vault} is unlocked in this browser. It locks after {minutes} minutes without use.", { vault: n.name, minutes: Bt })
    ),
    y("button", { type: "button", class: "cryptomator-banner__lock", onclick: () => Ut(n) }, u("Lock"))
  ])), ot.el.querySelector(".cryptomator-banner__icon").innerHTML = Bn;
}
Ce({
  id: "cryptomator-vaults-unlocked",
  order: 4,
  enabled: (t, n) => It && G(n),
  render(t, n) {
    ot = { el: t, folder: n }, qt(n);
  },
  updated(t) {
    qt(t);
  }
});
Ce({
  id: "cryptomator-vaults-banner",
  order: 5,
  enabled: (t, n) => It && n?.id === "files",
  render(t, n) {
    at = { el: t, folder: n }, Tt(n);
  },
  updated(t) {
    Tt(t);
  }
});
on("files:list:updated", ({ view: t, folder: n, contents: o }) => {
  t?.id !== "files" || !n?.path || ((o || []).some((l) => l.type === Z.File && l.basename === "vault.cryptomator") && je.add(n.path), Tt(n));
});
function X() {
  const t = j.kind === "folder" ? j : null;
  return t?.vault?.vault?.unlocked && te() === t.path ? t : null;
}
let tt = !1;
const ae = 16 * 1024 * 1024;
function Qn(t) {
  return { size: t.size, read: async (n, o) => new Uint8Array(await t.slice(n, o).arrayBuffer()) };
}
async function Wt(t, n = []) {
  const o = X();
  if (!o || t.length === 0 && n.length === 0)
    return;
  if (tt) {
    F(u("Another change to the vault is still running."));
    return;
  }
  tt = !0;
  const { vault: l } = o.vault, d = In(u("Uploading to {vault}", { vault: o.vault.name }));
  let s = null, w = 0;
  const p = [], v = /* @__PURE__ */ new Map([["", o.dirId]]), A = async (C) => {
    let x = "";
    for (const S of C) {
      const T = x ? x + "/" + S : S;
      v.has(T) || v.set(T, (await l.ensureDirectory(v.get(x), S)).dirId), x = T;
    }
    return v.get(x);
  };
  try {
    for (const C of n)
      try {
        await A(C);
      } catch (x) {
        p.push(C.join("/")), d.file(C.join("/") + "/").done(q(x), !0);
      }
    for (const [C, { file: x, dirs: S }] of t.entries()) {
      const T = [...S, x.name].join("/"), O = d.file(T);
      if (d.stopped) {
        O.done(u("Not uploaded"));
        continue;
      }
      let W = s === "replace-all";
      const et = async () => {
        const H = await A(S), Y = { encrypt: u("Encrypting"), upload: u("Uploading"), verify: u("Checking") }, ct = x.size >= ae, lt = ct ? { upload: [0, 0.7], verify: [0.7, 0.3] } : { encrypt: [0, 0.2], upload: [0.2, 0.6], verify: [0.8, 0.2] }, $ = (ut, xt, wt) => {
          const [At, N] = lt[ut];
          O.phase(ut === "upload" && ct ? u("Encrypting and uploading") : Y[ut], At + N * (wt ? xt / wt : 1));
        };
        ct ? await l.writeFileStream(H, x.name, Qn(x), { replace: W, onProgress: $ }) : await l.writeFile(H, x.name, new Uint8Array(await x.arrayBuffer()), { replace: W, onProgress: $ });
      };
      try {
        try {
          await et();
        } catch (H) {
          if (H?.code !== "exists" || s === "skip-all")
            throw H;
          const Y = s === "replace-all" ? "replace" : await d.ask(T, t.length);
          if (Y === "cancel") {
            O.done(u("Not uploaded"));
            break;
          }
          if (Y.endsWith("-all") && (s = Y), Y.startsWith("skip")) {
            O.done(u("Skipped"));
            continue;
          }
          W = !0, await et();
        }
        w++, O.done(u("Uploaded and checked"));
      } catch (H) {
        H?.code === "exists" && s === "skip-all" ? O.done(u("Skipped")) : (p.push(T), O.done(q(H), !0));
      }
      d.progress((C + 1) / t.length);
    }
  } finally {
    tt = !1, d.finish(p.length ? u("{written} uploaded, {failed} failed. The vault is unchanged where an upload failed.", { written: w, failed: p.length }) : u("{written} uploaded and checked.", { written: w }), p.length > 0), Nt(o.vault.name);
  }
}
function Ge(t = !1) {
  const n = y("input", { type: "file", multiple: !0, hidden: !0, webkitdirectory: t || null });
  n.addEventListener("change", () => {
    const o = [...n.files].map((l) => ({ file: l, dirs: (l.webkitRelativePath || l.name).split("/").slice(0, -1) }));
    n.remove(), Wt(o);
  }), document.body.append(n), n.click();
}
async function tr(t) {
  const n = [], o = [], l = async (d, s) => {
    if (d.isFile)
      n.push({ file: await new Promise((w, p) => d.file(w, p)), dirs: s });
    else if (d.isDirectory) {
      const w = [...s, d.name];
      o.push(w);
      const p = d.createReader();
      for (; ; ) {
        const v = await new Promise((A, C) => p.readEntries(A, C));
        if (v.length === 0)
          break;
        for (const A of v)
          await l(A, w);
      }
    }
  };
  for (const d of t)
    await l(d, []);
  return { files: n, folders: o };
}
async function er() {
  const t = X();
  if (!t)
    return;
  const n = await Ne(u("New folder"), u("Folder name"), (o) => {
    try {
      return _e(o), null;
    } catch (l) {
      return q(l);
    }
  });
  if (n !== null)
    try {
      await t.vault.vault.createDirectory(t.dirId, n), Nt(t.vault.name);
    } catch (o) {
      F(q(o));
    }
}
async function oe(t, n) {
  if (tt) {
    F(u("Another change to the vault is still running."));
    return;
  }
  tt = !0;
  try {
    await n();
  } finally {
    tt = !1, Nt(t.vault.name);
  }
}
function ie(t, n) {
  return t?.code === "not-found" ? u("“{name}” is no longer there.", { name: n }) : q(t);
}
function se(t, n) {
  const o = G(n) ? X() : null;
  return o !== null && t.length > 0 && t.every((l) => l.attributes?.cryptomatorVault === o.vault.seg);
}
async function nr(t) {
  const n = X(), o = t.displayname, l = await Ne(u("Rename"), u("New name"), (d) => {
    try {
      return _e(d), null;
    } catch (s) {
      return q(s);
    }
  }, { initial: o, action: u("Rename") });
  l === null || l.normalize("NFC") === o || await oe(n, async () => {
    try {
      await n.vault.vault.moveEntry(n.dirId, o, n.dirId, l);
    } catch (d) {
      F(ie(d, o));
    }
  });
}
async function be(t) {
  const n = X(), { vault: o } = n.vault, l = new Set(t.filter((s) => s.type === Z.Folder).map((s) => n.vault.dirs.get(s.basename)?.dirId).filter(Boolean)), d = await Tn(
    t.length === 1 ? u("Move “{name}” to …", { name: t[0].displayname }) : u("Move {count} items to …", { count: t.length }),
    n.vault.name,
    async (s) => (await o.list(s)).filter((w) => w.type === "dir").map((w) => ({ name: w.name, dirId: w.dirId })),
    l,
    u("Move here")
  );
  d === null || d.dirId === n.dirId || await oe(n, async () => {
    const s = [];
    for (const w of t)
      try {
        await o.moveEntry(n.dirId, w.displayname, d.dirId, void 0, { ancestors: d.ancestors });
      } catch (p) {
        s.push(w.displayname + ": " + ie(p, w.displayname));
      }
    s.length && F(s.join(`
`));
  });
}
async function ke(t) {
  const n = X(), o = t.filter((s) => s.type === Z.Folder).length, l = t.length === 1 ? u("Delete “{name}”?", { name: t[0].displayname }) : u("Delete {count} items?", { count: t.length }), d = (o ? u("Folders are deleted with everything in them.") + " " : "") + u("The encrypted files go to Nextcloud's deleted files.");
  await Mn(l, d, u("Delete")) && await oe(n, async () => {
    const s = [];
    for (const w of t)
      try {
        await n.vault.vault.removeEntry(n.dirId, w.displayname);
      } catch (p) {
        s.push(w.displayname + ": " + ie(p, w.displayname));
      }
    s.length && F(s.join(`
`));
  });
}
st({
  id: "cryptomator-vaults-rename",
  displayName: () => u("Rename"),
  iconSvgInline: () => Fn,
  enabled: ({ nodes: t, view: n }) => se(t, n) && t.length === 1,
  async exec({ nodes: t }) {
    return await nr(t[0]), null;
  },
  order: -700
});
st({
  id: "cryptomator-vaults-move",
  displayName: () => u("Move …"),
  iconSvgInline: () => Ln,
  enabled: ({ nodes: t, view: n }) => se(t, n),
  async exec({ nodes: t }) {
    return await be(t), null;
  },
  async execBatch({ nodes: t }) {
    return await be(t), t.map(() => null);
  },
  order: -690
});
st({
  id: "cryptomator-vaults-delete",
  displayName: () => u("Delete"),
  iconSvgInline: () => Hn,
  enabled: ({ nodes: t, view: n }) => se(t, n),
  async exec({ nodes: t }) {
    return await ke(t), null;
  },
  async execBatch({ nodes: t }) {
    return await ke(t), t.map(() => null);
  },
  destructive: !0,
  order: 100
});
kt({
  id: "cryptomator-vaults-upload",
  displayName: () => u("Upload files …"),
  iconSvgInline: () => Oe,
  order: -2,
  enabled: ({ view: t }) => G(t) && X() !== null,
  exec: async () => (Ge(), null)
});
kt({
  id: "cryptomator-vaults-upload-folder",
  displayName: () => u("Upload folder …"),
  iconSvgInline: () => Oe,
  order: -1.5,
  enabled: ({ view: t }) => G(t) && X() !== null,
  exec: async () => (Ge(!0), null)
});
kt({
  id: "cryptomator-vaults-new-folder",
  displayName: () => u("New folder …"),
  iconSvgInline: () => Vn,
  order: -1,
  enabled: ({ view: t }) => G(t) && X() !== null,
  exec: async () => (await er(), null)
});
function rr(t) {
  X() && t.dataTransfer?.types?.includes("Files") && (t.preventDefault(), t.stopPropagation(), t.dataTransfer.dropEffect = "copy");
}
function ar(t) {
  if (!X() || !t.dataTransfer?.files?.length)
    return;
  t.preventDefault(), t.stopPropagation();
  const n = [...t.dataTransfer.items || []].map((o) => o.webkitGetAsEntry?.()).filter(Boolean);
  if (n.length === 0) {
    Wt([...t.dataTransfer.files].map((o) => ({ file: o, dirs: [] })));
    return;
  }
  tr(n).then(({ files: o, folders: l }) => Wt(o, l), (o) => F(q(o)));
}
window.addEventListener("dragover", rr, !0);
window.addEventListener("drop", ar, !0);
kt({
  id: "cryptomator-vaults-add",
  displayName: () => u("Open a vault folder …"),
  iconSvgInline: () => Kn,
  order: 0,
  enabled: ({ view: t }) => G(t),
  exec: async () => (await Ke(), null)
});
kt({
  id: "cryptomator-vaults-lock-all",
  displayName: () => u("Lock all vaults"),
  iconSvgInline: () => De,
  order: 1,
  enabled: ({ view: t }) => G(t) && [...L.values()].some((n) => n.vault?.unlocked),
  exec: async () => (ee(), null)
});
sn().register(new cn({
  id: Jt,
  name: u("Vaults"),
  caption: u("Cryptomator vaults, unlocked in this browser"),
  emptyTitle: u("No vaults found"),
  emptyCaption: u("Vaults in your files appear here. Open a vault's folder to add one."),
  emptyView: Yn,
  icon: $t,
  order: 90,
  getContents: Xn
}));
re();
for (const t of ["pointerdown", "keydown", "wheel", "touchstart"])
  document.addEventListener(t, Jn, { passive: !0 });
window.addEventListener("pagehide", () => {
  V(), ee();
});
It && Qt().then(() => Tt(at?.folder));
export {
  Jt as VIEW_ID
};
