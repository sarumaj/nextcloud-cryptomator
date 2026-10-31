import { H as Le, t as He, q as ze, v as Vt, J as Be, K as Y, L as Ke, M as qe, s as We, F as B, O as bt, Q as je, V as Ge, x as ye, P as _t, R as Xe, w as Je, y as we, S as Ye } from "./cryptomator_vaults-common.mjs";
var wt = { exports: {} }, $e = wt.exports, ae;
function Qe() {
  return ae || (ae = 1, (function(t) {
    (function(n, o) {
      t.exports ? t.exports = o(globalThis.crypto) : n.CryptomatorVault = o(n.crypto);
    })(typeof self < "u" ? self : $e, function(n) {
      const o = n.subtle, l = new TextEncoder(), i = new TextDecoder("utf-8", { fatal: !0 });
      class s extends Error {
        constructor(e, a) {
          super(a || e), this.name = "VaultError", this.code = e;
        }
      }
      function h(y) {
        const e = y.replace(/-/g, "+").replace(/_/g, "/"), a = e + "=".repeat((4 - e.length % 4) % 4), r = atob(a), c = new Uint8Array(r.length);
        for (let u = 0; u < r.length; u++)
          c[u] = r.charCodeAt(u);
        return c;
      }
      function m(y, e) {
        let a = "";
        for (let c = 0; c < y.length; c++)
          a += String.fromCharCode(y[c]);
        const r = btoa(a).replace(/\+/g, "-").replace(/\//g, "_");
        return e ? r : r.replace(/=+$/, "");
      }
      const v = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      function k(y) {
        let e = "", a = 0, r = 0;
        for (const c of y)
          for (a = a << 8 | c, r += 8; r >= 5; )
            e += v[a >>> r - 5 & 31], r -= 5;
        return r > 0 && (e += v[a << 5 - r & 31]), e;
      }
      function b(...y) {
        const e = new Uint8Array(y.reduce((r, c) => r + c.length, 0));
        let a = 0;
        for (const r of y)
          e.set(r, a), a += r.length;
        return e;
      }
      function C(y) {
        const e = new Uint8Array(8);
        return new DataView(e.buffer).setBigUint64(0, BigInt(y)), e;
      }
      function A(y, e) {
        if (y.length !== e.length)
          return !1;
        let a = 0;
        for (let r = 0; r < y.length; r++)
          a |= y[r] ^ e[r];
        return a === 0;
      }
      async function S(y, e, a) {
        const r = await o.importKey(
          "raw",
          y.length ? y : new Uint8Array(64),
          { name: "HMAC", hash: "SHA-256" },
          !1,
          ["sign"]
        ), c = new Uint8Array(a);
        for (let u = 1, f = 0; f < a; u++, f += 32) {
          const g = new Uint8Array([u >>> 24, u >>> 16 & 255, u >>> 8 & 255, u & 255]), w = new Uint8Array(await o.sign("HMAC", r, b(e, g)));
          c.set(w.subarray(0, Math.min(32, a - f)), f);
        }
        return c;
      }
      function V(y) {
        const e = y.slice(), a = (r, c) => r << c | r >>> 32 - c;
        for (let r = 0; r < 8; r += 2)
          e[4] ^= a(e[0] + e[12], 7), e[8] ^= a(e[4] + e[0], 9), e[12] ^= a(e[8] + e[4], 13), e[0] ^= a(e[12] + e[8], 18), e[9] ^= a(e[5] + e[1], 7), e[13] ^= a(e[9] + e[5], 9), e[1] ^= a(e[13] + e[9], 13), e[5] ^= a(e[1] + e[13], 18), e[14] ^= a(e[10] + e[6], 7), e[2] ^= a(e[14] + e[10], 9), e[6] ^= a(e[2] + e[14], 13), e[10] ^= a(e[6] + e[2], 18), e[3] ^= a(e[15] + e[11], 7), e[7] ^= a(e[3] + e[15], 9), e[11] ^= a(e[7] + e[3], 13), e[15] ^= a(e[11] + e[7], 18), e[1] ^= a(e[0] + e[3], 7), e[2] ^= a(e[1] + e[0], 9), e[3] ^= a(e[2] + e[1], 13), e[0] ^= a(e[3] + e[2], 18), e[6] ^= a(e[5] + e[4], 7), e[7] ^= a(e[6] + e[5], 9), e[4] ^= a(e[7] + e[6], 13), e[5] ^= a(e[4] + e[7], 18), e[11] ^= a(e[10] + e[9], 7), e[8] ^= a(e[11] + e[10], 9), e[9] ^= a(e[8] + e[11], 13), e[10] ^= a(e[9] + e[8], 18), e[12] ^= a(e[15] + e[14], 7), e[13] ^= a(e[12] + e[15], 9), e[14] ^= a(e[13] + e[12], 13), e[15] ^= a(e[14] + e[13], 18);
        for (let r = 0; r < 16; r++)
          y[r] = y[r] + e[r] | 0;
      }
      function j(y, e, a, r) {
        r.set(y.subarray((2 * a - 1) * 16, 2 * a * 16));
        for (let c = 0; c < 2 * a; c++) {
          for (let u = 0; u < 16; u++)
            r[u] ^= y[c * 16 + u];
          V(r), e.set(r, ((c & 1) * a + (c >> 1)) * 16);
        }
      }
      function $(y, e, a) {
        const r = 32 * a, c = new Int32Array(r * e), u = new Int32Array(y), f = new Int32Array(r), g = new Int32Array(16);
        for (let w = 0; w < e; w++)
          c.set(u, w * r), j(u, f, a, g), u.set(f);
        for (let w = 0; w < e; w++) {
          const x = u[(2 * a - 1) * 16] & e - 1;
          for (let E = 0; E < r; E++)
            u[E] ^= c[x * r + E];
          j(u, f, a, g), u.set(f);
        }
        return u;
      }
      function Ct(y) {
        const e = new DataView(y.buffer, y.byteOffset, y.byteLength), a = new Int32Array(y.length / 4);
        for (let r = 0; r < a.length; r++)
          a[r] = e.getInt32(r * 4, !0);
        return a;
      }
      function dt(y, e) {
        const a = new DataView(e.buffer, e.byteOffset, e.byteLength);
        for (let r = 0; r < y.length; r++)
          a.setInt32(r * 4, y[r], !0);
      }
      async function ht(y, e, a, r, c, u) {
        if (a < 2 || (a & a - 1) !== 0)
          throw new s("corrupt", "scrypt cost is not a power of two");
        const f = 128 * r, g = await S(y, e, c * f);
        for (let w = 0; w < c; w++) {
          const x = g.subarray(w * f, (w + 1) * f);
          dt($(Ct(x), a, r), x);
        }
        return S(y, g, u);
      }
      function Q(y) {
        const e = new Uint8Array(16);
        for (let a = 0; a < 15; a++)
          e[a] = (y[a] << 1 | y[a + 1] >>> 7) & 255;
        return e[15] = y[15] << 1 & 255, y[0] & 128 && (e[15] ^= 135), e;
      }
      function at(y, e) {
        const a = new Uint8Array(y.length);
        for (let r = 0; r < y.length; r++)
          a[r] = y[r] ^ e[r];
        return a;
      }
      class $t {
        constructor(e) {
          this.key = e, this.subkeys = null;
        }
        async cbcLast(e) {
          return new Uint8Array(await o.encrypt({ name: "AES-CBC", iv: new Uint8Array(16) }, this.key, e)).subarray(e.length - 16, e.length);
        }
        async mac(e) {
          if (this.subkeys === null) {
            const g = await this.cbcLast(new Uint8Array(16)), w = Q(g);
            this.subkeys = [w, Q(w)];
          }
          const [a, r] = this.subkeys, c = Math.max(1, Math.ceil(e.length / 16)), u = new Uint8Array(c * 16);
          u.set(e);
          const f = u.subarray((c - 1) * 16);
          return e.length > 0 && e.length % 16 === 0 ? f.set(at(f, a)) : (f[e.length - (c - 1) * 16] = 128, f.set(at(f, r))), this.cbcLast(u);
        }
      }
      async function Qt(y, e, a) {
        let r = await y.mac(new Uint8Array(16));
        for (const u of e)
          r = at(Q(r), await y.mac(u));
        let c;
        if (a.length >= 16)
          c = a.slice(), c.set(at(c.subarray(c.length - 16), r), c.length - 16);
        else {
          const u = new Uint8Array(16);
          u.set(a), u[a.length] = 128, c = at(Q(r), u);
        }
        return y.mac(c);
      }
      function Zt(y) {
        const e = y.slice();
        return e[8] &= 127, e[12] &= 127, e;
      }
      class te {
        constructor(e, a) {
          this.cmac = e, this.ctrKey = a;
        }
        async encrypt(e, a) {
          const r = await Qt(this.cmac, a, e), c = await o.encrypt({ name: "AES-CTR", counter: Zt(r), length: 128 }, this.ctrKey, e);
          return b(r, new Uint8Array(c));
        }
        async decrypt(e, a) {
          if (e.length < 16)
            throw new s("corrupt", "name too short");
          const r = e.subarray(0, 16), c = new Uint8Array(await o.decrypt(
            { name: "AES-CTR", counter: Zt(r), length: 128 },
            this.ctrKey,
            e.subarray(16)
          ));
          if (!A(await Qt(this.cmac, a, c), r))
            throw new s("corrupt", "name does not authenticate");
          return c;
        }
      }
      const q = 32 * 1024, pt = {
        SIV_GCM: { header: 68, nonce: 12, overhead: 28 },
        SIV_CTRMAC: { header: 88, nonce: 16, overhead: 48 }
      };
      function ft(y, e) {
        const { header: a, overhead: r } = pt[y], c = e - a;
        if (c <= 0)
          return 0;
        const u = Math.floor(c / (q + r)), f = c % (q + r);
        return u * q + Math.max(0, f - r);
      }
      const ee = ".cryptomator-vaults-", Fe = 255;
      function At(y) {
        return n.getRandomValues(new Uint8Array(y));
      }
      function ne() {
        return n.randomUUID();
      }
      async function xt(y) {
        return new Uint8Array(await o.digest("SHA-256", y));
      }
      function ot(y) {
        const e = String(y).normalize("NFC");
        if (e === "" || e === "." || e === ".." || /[/\\\u0000-\u001f\u007f]/.test(e) || e.length > Fe)
          throw new s("invalid-name", e);
        return e;
      }
      const re = "vault.cryptomator";
      function Pe(y) {
        const e = y.trim().split(".");
        if (e.length !== 3)
          throw new s("unsupported-format", "vault.cryptomator is not a JWT");
        const a = (r) => JSON.parse(i.decode(h(r)));
        return { header: a(e[0]), payload: a(e[1]), signed: e[0] + "." + e[1], signature: h(e[2]) };
      }
      function I(...y) {
        return y.filter((e) => e !== "").join("/");
      }
      class St {
        constructor(e, a, r) {
          this.storage = e, this.config = a, this.masterkeyFile = r, this.keys = null;
        }
        /** Reads the vault's configuration and key file; checks the format before any password. */
        static async open(e) {
          let a;
          try {
            a = Pe(i.decode(await e.read(re)));
          } catch (w) {
            throw w instanceof s ? w : new s("unsupported-format", "vault.cryptomator unreadable: " + w.message);
          }
          const { header: r, payload: c } = a;
          if (c.format !== 8)
            throw new s("unsupported-format", "vault format " + c.format);
          if (!(c.cipherCombo in pt))
            throw new s("unsupported-format", "cipher combination " + c.cipherCombo);
          if (r.alg !== "HS256")
            throw new s("unsupported-format", "signature " + r.alg);
          const u = String(r.kid || "");
          if (!u.startsWith("masterkeyfile:"))
            throw new s("unsupported-key", u);
          const f = u.slice(14);
          if (!/^[^/\\]+$/.test(f))
            throw new s("unsupported-key", u);
          const g = JSON.parse(i.decode(await e.read(f)));
          return new St(e, a, g);
        }
        get scheme() {
          return this.config.payload.cipherCombo;
        }
        get unlocked() {
          return this.keys !== null;
        }
        /** Derives the keys from the password; a VaultError 'wrong-password' if it is not the vault's. */
        async unlock(e) {
          const a = this.masterkeyFile, r = await ht(
            l.encode(String(e).normalize("NFC")),
            h(a.scryptSalt),
            a.scryptCostParam,
            a.scryptBlockSize,
            1,
            32
          ), c = await o.importKey("raw", r, "AES-KW", !1, ["unwrapKey"]);
          r.fill(0);
          let u, f;
          try {
            const g = async (w) => new Uint8Array(await o.exportKey(
              "raw",
              await o.unwrapKey("raw", h(w), c, "AES-KW", { name: "HMAC", hash: "SHA-256" }, !0, ["sign"])
            ));
            u = await g(a.primaryMasterKey), f = await g(a.hmacMasterKey);
          } catch {
            throw new s("wrong-password");
          }
          try {
            const g = await o.importKey("raw", b(u, f), { name: "HMAC", hash: "SHA-256" }, !1, ["verify"]);
            if (!await o.verify("HMAC", g, this.config.signature, l.encode(this.config.signed)))
              throw new s("corrupt", "vault.cryptomator is not signed with this key");
            const w = (x, E) => o.importKey("raw", x, E, !1, ["encrypt", "decrypt"]);
            this.keys = {
              gcm: await w(u, "AES-GCM"),
              ctr: await w(u, "AES-CTR"),
              mac: await o.importKey("raw", f, { name: "HMAC", hash: "SHA-256" }, !1, ["sign", "verify"])
            }, this.siv = new te(new $t(await w(f, "AES-CBC")), this.keys.ctr), this.dirPaths = /* @__PURE__ */ new Map();
          } finally {
            u.fill(0), f.fill(0);
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
            const a = await this.siv.encrypt(l.encode(e), []), r = k(new Uint8Array(await o.digest("SHA-1", a)));
            this.dirPaths.set(e, I("d", r.slice(0, 2), r.slice(2)));
          }
          return this.dirPaths.get(e);
        }
        async decryptName(e, a) {
          const r = e.endsWith(".c9r") ? e.slice(0, -4) : e;
          try {
            return i.decode(await this.siv.decrypt(h(r), [l.encode(a)]));
          } catch (c) {
            throw c instanceof s ? c : new s("corrupt", "name not decryptable");
          }
        }
        /**
         * The entries of a directory (the root's ID is ''): {name, type ('file',
         * 'dir', 'link'), size (of a file, decrypted), dirId (of a directory), path
         * (in the storage), mtime (the storage's, if known)}. An entry that does not
         * decrypt is listed as type 'broken'.
         */
        async list(e) {
          const a = await this.dirPath(e), r = await this.storage.list(a);
          return (await Promise.all(r.map((u) => this.describe(a, u, e)))).filter((u) => u !== null).sort((u, f) => (f.type === "dir") - (u.type === "dir") || u.name.localeCompare(f.name));
        }
        async describe(e, a, r) {
          const c = I(e, a.name), u = await this.describeEntry(e, a, r, c);
          return u !== null && a.mtime && !u.mtime && (u.mtime = a.mtime), u;
        }
        async describeEntry(e, a, r, c) {
          try {
            if (a.name.endsWith(".c9s") && a.isDir) {
              const f = await this.decryptName(i.decode(await this.storage.read(I(c, "name.c9s"))).trim(), r), g = await this.storage.list(c), w = g.find((x) => x.name === "contents.c9r");
              return w ? { name: f, type: "file", size: ft(this.scheme, w.size), path: I(c, "contents.c9r"), mtime: w.mtime } : this.describeNode(f, c, g.map((x) => x.name));
            }
            if (a.name === "dirid.c9r" || !a.name.endsWith(".c9r"))
              return null;
            const u = await this.decryptName(a.name, r);
            return a.isDir ? this.describeNode(u, c, null) : { name: u, type: "file", size: ft(this.scheme, a.size), path: c };
          } catch (u) {
            return { name: a.name, type: "broken", error: u.message, path: c };
          }
        }
        // A folder <name>.c9r (or .c9s): a directory (dir.c9r, its ID) or a link (symlink.c9r).
        async describeNode(e, a, r) {
          const c = async (g) => {
            if (r !== null && !r.includes(g))
              return null;
            try {
              return await this.storage.read(I(a, g));
            } catch (w) {
              if (w instanceof s && w.code === "not-found")
                return null;
              throw w;
            }
          }, u = await c("dir.c9r");
          if (u !== null)
            return { name: e, type: "dir", dirId: i.decode(u).trim(), path: a };
          const f = await c("symlink.c9r");
          if (f !== null) {
            const g = i.decode(await this.decryptContents(f));
            return { name: e, type: "link", target: g, path: a };
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
          const r = pt[this.scheme];
          if (e.length === 0)
            return new Uint8Array(0);
          if (e.length < r.header)
            throw new s("corrupt", "file header too short");
          const c = e.subarray(0, r.header), u = c.subarray(0, r.nonce), f = await this.decryptHeader(c, u), g = e.subarray(r.header), w = q + r.overhead, x = new Uint8Array(ft(this.scheme, e.length));
          for (let E = 0, D = 0; D < g.length; E++, D += w) {
            const U = g.subarray(D, Math.min(D + w, g.length)), R = await this.decryptChunk(U, E, u, f);
            x.set(R, E * q), a && a(Math.min(D + w, g.length), g.length);
          }
          return x;
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
            const g = e.subarray(16, 56);
            if (!await o.verify("HMAC", this.keys.mac, e.subarray(56, 88), e.subarray(0, 56)))
              throw new s("corrupt", "file header does not authenticate");
            r = new Uint8Array(await o.decrypt({ name: "AES-CTR", counter: a, length: 128 }, this.keys.ctr, g));
          }
          const c = r.subarray(8, 40), u = this.scheme === "SIV_GCM" ? "AES-GCM" : "AES-CTR", f = await o.importKey("raw", c, u, !1, ["decrypt"]);
          return r.fill(0), f;
        }
        async decryptChunk(e, a, r, c) {
          try {
            if (this.scheme === "SIV_GCM") {
              const w = e.subarray(0, 12);
              return new Uint8Array(await o.decrypt(
                { name: "AES-GCM", iv: w, additionalData: b(C(a), r) },
                c,
                e.subarray(12)
              ));
            }
            const u = e.subarray(0, 16), f = e.subarray(16, e.length - 32), g = e.subarray(e.length - 32);
            if (!await o.verify("HMAC", this.keys.mac, g, b(r, C(a), u, f)))
              throw new Error("mac");
            return new Uint8Array(await o.decrypt({ name: "AES-CTR", counter: u, length: 128 }, c, f));
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
        //   as it was;
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
          const r = await this.dirPath(e), c = m(await this.siv.encrypt(l.encode(a), [l.encode(e)]), !0) + ".c9r", u = this.config.payload.shorteningThreshold ?? 220;
          if (c.length > u) {
            const f = m(new Uint8Array(await o.digest("SHA-1", l.encode(c))), !0) + ".c9s";
            return { folder: r, path: I(r, f), long: !0, fullName: c };
          }
          return { folder: r, path: I(r, c), long: !1, fullName: c };
        }
        /** What is stored at an entry's place: null, 'file', 'dir', 'link' or 'unknown'. */
        async existing(e) {
          const a = await this.storage.stat(e.path);
          if (!a)
            return null;
          if (!a.isDir)
            return "file";
          const r = (await this.storage.list(e.path)).map((c) => c.name);
          return r.includes("contents.c9r") ? "file" : r.includes("dir.c9r") ? "dir" : r.includes("symlink.c9r") ? "link" : "unknown";
        }
        /** A file's contents encrypted as Cryptomator does: a new content key, header, chunks. */
        async encryptContents(e, a) {
          this.requireKeys();
          const r = pt[this.scheme], c = this.scheme === "SIV_GCM", u = At(r.nonce), f = At(32), g = b(new Uint8Array(8).fill(255), f);
          let w;
          if (c)
            w = b(u, new Uint8Array(await o.encrypt({ name: "AES-GCM", iv: u }, this.keys.gcm, g)));
          else {
            const U = new Uint8Array(await o.encrypt({ name: "AES-CTR", counter: u, length: 128 }, this.keys.ctr, g)), R = new Uint8Array(await o.sign("HMAC", this.keys.mac, b(u, U)));
            w = b(u, U, R);
          }
          const x = await o.importKey("raw", f, c ? "AES-GCM" : "AES-CTR", !1, ["encrypt"]);
          g.fill(0), f.fill(0);
          const E = Math.ceil(e.length / q), D = new Uint8Array(r.header + e.length + E * r.overhead);
          D.set(w);
          for (let U = 0, R = r.header; U < E; U++) {
            const G = e.subarray(U * q, Math.min((U + 1) * q, e.length)), _ = At(r.nonce);
            let Z;
            if (c)
              Z = b(_, new Uint8Array(await o.encrypt(
                { name: "AES-GCM", iv: _, additionalData: b(C(U), u) },
                x,
                G
              )));
            else {
              const mt = new Uint8Array(await o.encrypt({ name: "AES-CTR", counter: _, length: 128 }, x, G)), Re = new Uint8Array(await o.sign("HMAC", this.keys.mac, b(u, C(U), _, mt)));
              Z = b(_, mt, Re);
            }
            D.set(Z, R), R += Z.length, a && a(U + 1, E);
          }
          return D;
        }
        /**
         * A staging name in the vault's top folder, outside d/: Cryptomator passes it
         * by, and its health checks (which look at d/) do not report one a browser
         * left behind. Moving from there is still one rename on the server.
         */
        stagingPath() {
          return ee + ne() + ".tmp";
        }
        /**
         * Puts an entry of several files (name -> bytes) together in a staging folder,
         * checks it (check(stagingFolder), if given) and moves it into
         * place in one step; refused if the place is taken meanwhile. The staging
         * folder goes on any failure.
         */
        async stageAndMove(e, a, r) {
          const c = this.stagingPath();
          await this.storage.mkdir(c);
          try {
            for (const [u, f] of Object.entries(a))
              await this.storage.write(I(c, u), f, { create: !0 });
            r && await r(c), await this.storage.move(c, e.path);
          } catch (u) {
            throw await this.storage.remove(c).catch(() => {
            }), u;
          }
        }
        /** Reads a stored file back and compares it with what was written. */
        async checkStored(e, a, r) {
          const c = await this.storage.read(e, r);
          let u;
          try {
            u = await this.decryptContents(c);
          } catch (f) {
            throw new s("corrupt", "the stored file does not decrypt: " + f.message);
          }
          if (!A(await xt(u), a))
            throw new s("corrupt", "the stored file differs from the one written");
        }
        /**
         * Writes a file into a directory. options.replace allows replacing a file of
         * that name (never a folder); onProgress(phase, done, total) with the phases
         * 'encrypt', 'upload' and 'verify'. Returns {name, path, size}.
         */
        async writeFile(e, a, r, c = {}) {
          this.requireWritable();
          const { replace: u = !1, onProgress: f } = c, g = (_) => (Z, mt) => f?.(_, Z, mt), w = ot(a), x = await this.entryPath(e, w), E = await this.existing(x);
          if (E !== null && (E !== "file" || !u))
            throw new s(E === "file" ? "exists" : "exists-other", w);
          const D = await xt(r), U = await this.encryptContents(r, g("encrypt"));
          if (!A(await xt(await this.decryptContents(U)), D))
            throw new s("corrupt", "the encryption does not read back");
          const R = x.long ? I(x.path, "contents.c9r") : x.path;
          if (x.long && E === null)
            return await this.stageAndMove(
              x,
              { "name.c9s": l.encode(x.fullName), "contents.c9r": U },
              (_) => this.checkStored(I(_, "contents.c9r"), D, g("verify"))
            ), { name: w, path: R, size: r.length };
          const G = this.stagingPath();
          try {
            await this.storage.write(G, U, { create: !0, onProgress: g("upload") }), await this.checkStored(G, D, g("verify")), await this.storage.move(G, R, { overwrite: E !== null });
          } catch (_) {
            throw await this.storage.remove(G).catch(() => {
            }), _;
          }
          return { name: w, path: R, size: r.length };
        }
        /** Creates a folder in a directory. Returns {name, dirId}. */
        async createDirectory(e, a) {
          this.requireWritable();
          const r = ot(a), c = await this.entryPath(e, r);
          if (await this.existing(c) !== null)
            throw new s("exists-other", r);
          const u = ne(), f = await this.dirPath(u);
          await this.storage.mkdir(f.split("/").slice(0, 2).join("/"), { existsOk: !0 }), await this.storage.mkdir(f);
          try {
            await this.storage.write(I(f, "dirid.c9r"), await this.encryptContents(l.encode(u)), { create: !0 });
            const w = { "dir.c9r": l.encode(u) };
            c.long && (w["name.c9s"] = l.encode(c.fullName)), await this.stageAndMove(c, w);
          } catch (w) {
            throw await this.storage.remove(f).catch(() => {
            }), w;
          }
          const g = (await this.list(e)).find((w) => w.type === "dir" && w.dirId === u);
          if (!g || g.name !== r)
            throw new s("corrupt", "the new folder does not read back");
          return { name: r, dirId: u };
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
          const r = ot(a), c = await this.entryPath(e, r), u = await this.existing(c);
          if (u === null)
            return null;
          if (u === "unknown")
            throw new s("corrupt", "the entry of " + r + " is neither file, folder nor link");
          return { ...c, name: r, kind: u };
        }
        async entryDirId(e) {
          return i.decode(await this.storage.read(I(e.path, "dir.c9r"))).trim();
        }
        /**
         * Renames and/or moves an entry: from a directory to another (or the same)
         * under a new (or the same) name. Refused where the new name is taken. A
         * folder moved to another directory needs options.ancestors, the IDs of the
         * target's directories from the vault's top ('' first): a folder cannot go into
         * itself or below itself. Returns {name}.
         */
        async moveEntry(e, a, r, c, u = {}) {
          this.requireWritable();
          const f = await this.findEntry(e, a);
          if (f === null)
            throw new s("not-found", String(a));
          const g = ot(c ?? f.name);
          if (e === r && g === f.name)
            return { name: g };
          if (f.kind === "dir" && e !== r) {
            const x = u.ancestors;
            if (!Array.isArray(x) || x[x.length - 1] !== r)
              throw new s("invalid-move", "the target's ancestors are not known");
            const E = await this.entryDirId(f);
            if (x.includes(E))
              throw new s("invalid-move", f.name);
          }
          const w = await this.entryPath(r, g);
          if (await this.existing(w) !== null)
            throw new s("exists-other", g);
          return !f.long && !w.long ? (await this.storage.move(f.path, w.path), { name: g }) : (await this.rebuildEntry(f, w), await this.storage.remove(f.path), { name: g });
        }
        /**
         * Puts an entry together anew at another place (for a change between short
         * and long names): its files copied on the server into a staging name, a
         * file's contents checked (they decrypt and authenticate), then moved into
         * place in one step. The old entry stays.
         */
        async rebuildEntry(e, a) {
          const r = this.stagingPath(), c = { file: "contents.c9r", dir: "dir.c9r", link: "symlink.c9r" }[e.kind], u = e.long || e.kind !== "file" ? I(e.path, c) : e.path, f = a.long || e.kind !== "file" ? I(r, c) : r;
          try {
            if (f !== r && await this.storage.mkdir(r), await this.storage.copy(u, f), a.long && await this.storage.write(I(r, "name.c9s"), l.encode(a.fullName), { create: !0 }), e.kind !== "dir")
              await this.decryptContents(await this.storage.read(f));
            else if (i.decode(await this.storage.read(f)).trim() !== await this.entryDirId(e))
              throw new s("corrupt", "the copied folder entry differs");
            await this.storage.move(r, a.path);
          } catch (g) {
            throw await this.storage.remove(r).catch(() => {
            }), g;
          }
        }
        /** The IDs of a folder and of every folder below it. */
        async subtree(e) {
          const a = [e];
          for (const r of await this.list(e))
            if (r.type === "dir")
              a.push(...await this.subtree(r.dirId));
            else if (r.type === "broken" && r.path.endsWith(".c9r")) {
              const c = await this.storage.read(I(r.path, "dir.c9r")).then((u) => i.decode(u).trim(), () => null);
              c !== null && a.push(...await this.subtree(c));
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
          const c = await this.subtree(await this.entryDirId(r));
          await this.storage.remove(r.path);
          for (const u of c)
            await this.storage.remove(await this.dirPath(u));
          return { name: r.name, folders: c.length };
        }
      }
      return { Vault: St, VaultError: s, cleartextSize: ft, checkName: ot, scrypt: ht, Siv: te, Cmac: $t, base32Encode: k, base64UrlEncode: m, base64Decode: h, VAULT_CONFIG: re, STAGING_PREFIX: ee };
    });
  })(wt)), wt.exports;
}
var Ze = Qe();
const ge = /* @__PURE__ */ Le(Ze), tn = "cryptomator_vaults";
function d(t, n) {
  return He(tn, t, n, void 0, { escape: !1 });
}
const en = 100 * 1024 * 1024, nn = 5 * 1024 * 1024, Ut = 1024 * 1024 * 1024, Mt = /* @__PURE__ */ new Set();
function p(t, n, o) {
  const l = document.createElement(t);
  for (const [i, s] of Object.entries(n || {}))
    s == null || s === !1 || (i === "class" ? l.className = s : i.startsWith("on") ? l.addEventListener(i.slice(2), s) : l.setAttribute(i, s === !0 ? "" : s));
  for (const i of [].concat(o ?? []))
    i != null && i !== !1 && l.append(i instanceof Node ? i : document.createTextNode(String(i)));
  return l;
}
function Nt(t) {
  if (window.OC?.Util?.humanFileSize)
    return window.OC.Util.humanFileSize(t);
  const n = ["B", "KB", "MB", "GB", "TB"];
  let o = t, l = 0;
  for (; o >= 1024 && l < n.length - 1; )
    o /= 1024, l++;
  return (l === 0 ? o : o.toFixed(1)) + " " + n[l];
}
function st(t, n) {
  const o = URL.createObjectURL(new Blob([t], { type: n }));
  return Mt.add(o), o;
}
function rn() {
  for (const t of Mt)
    URL.revokeObjectURL(t);
  Mt.clear(), M();
}
function ve(t, n) {
  const o = p("a", { href: st(n, "application/octet-stream"), download: t });
  document.body.append(o), o.click(), o.remove();
}
let et = null;
function M() {
  if (et) {
    const { dialog: t, onClose: n } = et;
    et = null, t.remove(), n?.();
  }
}
function nt(t, n, o) {
  M();
  const l = p("div", {
    class: "cryptomator-dialog",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": t,
    onkeydown: (i) => {
      i.key === "Escape" && M();
    },
    onclick: (i) => {
      i.target === l && M();
    }
  }, p("div", { class: "cryptomator-dialog__panel" }, n));
  return et = { dialog: l, onClose: o }, document.body.append(l), l;
}
function T(t, n) {
  return p("p", { class: "cryptomator-notice" + (n ? " cryptomator-notice--" + n : ""), role: n === "error" ? "alert" : null }, t);
}
function an(t, n, o) {
  return new Promise((l) => {
    let i = !1;
    const s = p("input", {
      type: "text",
      name: "username",
      autocomplete: "username",
      readonly: !0,
      class: "cryptomator-unlock__account",
      "aria-label": d("Vault")
    });
    s.value = o;
    const h = p("input", { type: "password", name: "password", autocomplete: "current-password", required: !0, "aria-label": d("Password") }), m = p("div", { "aria-live": "polite" }), v = p("button", { type: "submit", class: "primary" }, d("Unlock"));
    nt(t, [
      p("h2", {}, d("Unlock {vault}", { vault: t })),
      T(d("The password and the vault's keys stay in this browser tab: the server only sends the encrypted files.")),
      p("form", {
        class: "cryptomator-unlock",
        name: "cryptomator-unlock",
        method: "post",
        action: "#",
        autocomplete: "on",
        onsubmit: async (k) => {
          k.preventDefault(), v.disabled = !0, m.replaceChildren(T(d("Unlocking …"))), await new Promise((b) => setTimeout(b, 30));
          try {
            await n(h.value), h.value = "", i = !0, M(), l(!0);
          } catch (b) {
            v.disabled = !1, m.replaceChildren(T(b.message, "error")), h.select();
          }
        }
      }, [
        p("label", {}, [d("Vault"), s]),
        p("label", {}, [d("Password"), h]),
        v,
        p("button", { type: "button", onclick: M }, d("Cancel"))
      ]),
      m
    ], () => {
      h.value = "", i || l(!1);
    }), h.focus();
  });
}
const on = ["png", "jpg", "jpeg", "gif", "webp", "avif", "bmp", "svg"], oe = { mp4: "video/mp4", m4v: "video/mp4", webm: "video/webm", mov: "video/quicktime", ogv: "video/ogg" }, se = { mp3: "audio/mpeg", m4a: "audio/mp4", ogg: "audio/ogg", oga: "audio/ogg", opus: "audio/ogg", wav: "audio/wav", flac: "audio/flac" }, sn = [
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
function cn(t) {
  const n = (/\.([^.]+)$/.exec(t)?.[1] ?? "").toLowerCase();
  return on.includes(n) ? { kind: "image", type: n === "svg" ? "image/svg+xml" : "image/" + (n === "jpg" ? "jpeg" : n) } : n === "pdf" ? { kind: "pdf", type: "application/pdf" } : n in oe ? { kind: "video", type: oe[n] } : n in se ? { kind: "audio", type: se[n] } : sn.includes(n) ? { kind: "text", type: "text/plain" } : { kind: "none" };
}
function ln(t, n, o) {
  switch (t.kind) {
    case "image":
      return p("img", { class: "cryptomator-preview", src: st(n, t.type), alt: o });
    case "pdf":
      return p("iframe", { class: "cryptomator-preview cryptomator-preview--frame", src: st(n, t.type), title: o });
    case "video":
      return p("video", { class: "cryptomator-preview", src: st(n, t.type), controls: !0 });
    case "audio":
      return p("audio", { class: "cryptomator-preview", src: st(n, t.type), controls: !0 });
    case "text":
      return p("pre", { class: "cryptomator-preview cryptomator-preview--text" }, new TextDecoder("utf-8").decode(n));
    default:
      return T(d("No preview for this file. Download it to open it."));
  }
}
async function un(t, n, o, l) {
  const i = cn(t), s = i.kind !== "none" && n <= (i.kind === "text" ? nn : en);
  if (!s && n > Ut && !window.confirm(d("This file is {size}. Your browser holds it twice while decrypting. Continue?", { size: Nt(n) })))
    return;
  const h = p("progress", { max: 1, value: 0 }), m = p("div", { class: "cryptomator-dialog__body" }, [T(d("Decrypting …")), h]), v = p("button", { type: "button", disabled: !0 }, d("Download")), k = nt(t, [
    p("div", { class: "cryptomator-dialog__head" }, [
      p("h2", {}, t),
      p("span", { class: "cryptomator-dialog__meta" }, Nt(n)),
      v,
      p("button", { type: "button", class: "cryptomator-dialog__close", onclick: M }, d("Close"))
    ]),
    m
  ]);
  k.querySelector(".cryptomator-dialog__close").focus();
  try {
    const b = await o((C, A) => {
      h.value = 0.5 + C / A / 2;
    }, (C, A) => {
      h.value = C / A / 2;
    });
    if (et?.dialog !== k)
      return;
    v.disabled = !1, v.addEventListener("click", () => ve(t, b)), m.replaceChildren(s ? ln(i, b, t) : T(d("No preview for this file. Download it to open it.")));
  } catch (b) {
    et?.dialog === k && m.replaceChildren(T(l(b), "error"));
  }
}
function be(t, n, o, { initial: l = "", action: i = d("Create") } = {}) {
  return new Promise((s) => {
    let h = !1;
    const m = p("input", { type: "text", required: !0, "aria-label": n, autocomplete: "off" });
    m.value = l;
    const v = p("div", { "aria-live": "polite" });
    nt(t, [
      p("h2", {}, t),
      p("form", {
        class: "cryptomator-unlock",
        onsubmit: (b) => {
          b.preventDefault();
          const C = o(m.value);
          if (C) {
            v.replaceChildren(T(C, "error"));
            return;
          }
          h = !0;
          const A = m.value;
          M(), s(A);
        }
      }, [
        p("label", {}, [n, m]),
        p("button", { type: "submit", class: "primary" }, i),
        p("button", { type: "button", onclick: M }, d("Cancel"))
      ]),
      v
    ], () => {
      h || s(null);
    }), m.focus();
    const k = l.lastIndexOf(".");
    m.setSelectionRange(0, k > 0 ? k : l.length);
  });
}
function dn(t, n, o) {
  return new Promise((l) => {
    let i = !1;
    nt(t, [
      p("h2", {}, t),
      T(n),
      p("div", { class: "cryptomator-choices" }, [
        p("button", { type: "button", class: "error primary", onclick: () => {
          i = !0, M();
        } }, o),
        p("button", { type: "button", onclick: M }, d("Cancel"))
      ])
    ], () => l(i)), document.querySelector(".cryptomator-dialog button:last-child")?.focus();
  });
}
function hn(t, n, o, l, i) {
  return new Promise((s) => {
    let h = null, m = [{ name: n, dirId: "" }];
    const v = p("ol", { class: "cryptomator-crumbs" }), k = p("ul", { class: "cryptomator-folders" }), b = p("button", { type: "button", class: "primary", onclick: () => {
      h = { dirId: m[m.length - 1].dirId, ancestors: m.map((A) => A.dirId) }, M();
    } }, i), C = async () => {
      v.replaceChildren(...m.map((A, S) => p("li", {}, S === m.length - 1 ? p("span", { "aria-current": "page" }, A.name) : p("button", { type: "button", onclick: () => {
        m = m.slice(0, S + 1), C();
      } }, A.name)))), k.replaceChildren(T(d("Loading …")));
      try {
        const A = (await o(m[m.length - 1].dirId)).sort((S, V) => S.name.localeCompare(V.name));
        k.replaceChildren(...A.length ? A.map((S) => p("li", {}, p("button", {
          type: "button",
          class: "cryptomator-folders__item",
          disabled: l.has(S.dirId),
          onclick: () => {
            m = [...m, S], C();
          }
        }, S.name))) : [T(d("No folders in here."))]);
      } catch (A) {
        k.replaceChildren(T(A.message, "error"));
      }
    };
    nt(t, [
      p("h2", {}, t),
      p("nav", {}, v),
      p("div", { class: "cryptomator-dialog__body" }, k),
      p("div", { class: "cryptomator-choices" }, [b, p("button", { type: "button", onclick: M }, d("Cancel"))])
    ], () => s(h)), C();
  });
}
function pn(t) {
  const n = p("ul", { class: "cryptomator-uploads" }), o = p("progress", { max: 1, value: 0 }), l = p("div", { "aria-live": "polite" }), i = p("div", { class: "cryptomator-question", hidden: !0 });
  let s = !1;
  const h = p("button", { type: "button", onclick: () => {
    s = !0, h.disabled = !0, h.textContent = d("Stopping after this file …");
  } }, d("Stop")), m = p("button", { type: "button", class: "primary", hidden: !0, onclick: M }, d("Close"));
  return nt(t, [
    p("div", { class: "cryptomator-dialog__head" }, [p("h2", {}, t), h, m]),
    o,
    i,
    p("div", { class: "cryptomator-dialog__body" }, n),
    l
  ]), {
    get stopped() {
      return s;
    },
    file(v) {
      const k = p("span", { class: "cryptomator-dialog__meta" }, d("Waiting")), b = p("progress", { max: 1, value: 0 });
      return n.append(p("li", {}, [p("span", { class: "cryptomator-uploads__name" }, v), k, b])), {
        phase(C, A) {
          k.textContent = C, b.value = A;
        },
        done(C, A) {
          k.textContent = C, k.classList.toggle("cryptomator-notice--error", !!A), b.value = 1;
        }
      };
    },
    /** What to do with a taken name: 'replace', 'skip', 'replace-all', 'skip-all' or 'cancel'. */
    ask(v, k) {
      return new Promise((b) => {
        const C = (A) => () => {
          i.hidden = !0, i.replaceChildren(), b(A);
        };
        i.replaceChildren(
          p("h3", {}, d("“{name}” already exists", { name: v })),
          T(d("Replace the file in the vault with the one you chose? The vault keeps no copy of the old one; Nextcloud's versions keep its encrypted file.")),
          p("div", { class: "cryptomator-choices" }, [
            p("button", { type: "button", class: "primary", onclick: C("replace") }, d("Replace")),
            p("button", { type: "button", onclick: C("skip") }, d("Skip")),
            k > 1 ? p("button", { type: "button", onclick: C("replace-all") }, d("Replace all")) : null,
            k > 1 ? p("button", { type: "button", onclick: C("skip-all") }, d("Skip all")) : null,
            p("button", { type: "button", onclick: C("cancel") }, d("Cancel upload"))
          ])
        ), i.hidden = !1, i.querySelector("button").focus();
      });
    },
    progress(v) {
      o.value = v;
    },
    finish(v, k) {
      o.value = 1, h.hidden = !0, m.hidden = !1, l.replaceChildren(T(v, k ? "error" : void 0)), m.focus();
    }
  };
}
const { VaultError: F } = ge, Et = "DAV:", fn = 20 * 1024 * 1024, ie = 10 * 1024 * 1024;
function mn() {
  return window.OC && window.OC.requestToken || document.head.dataset.requesttoken || "";
}
function z(t) {
  return { requesttoken: mn(), "X-Requested-With": "XMLHttpRequest", ...t || {} };
}
function rt() {
  return ze()?.uid ?? "";
}
function gt(t) {
  return t.split("/").filter((n) => n !== "").map(encodeURIComponent).join("/");
}
function yn(t) {
  const n = gt(t);
  return Vt("dav") + "/files/" + encodeURIComponent(rt()) + "/" + (n ? n + "/" : "");
}
function Dt(t) {
  const n = new DOMParser().parseFromString(t, "application/xml");
  return Array.from(n.getElementsByTagNameNS(Et, "response")).map((o) => {
    const l = (h) => o.getElementsByTagNameNS(Et, h)[0], i = l("getcontentlength"), s = l("getlastmodified");
    return {
      href: l("href").textContent,
      isDir: o.getElementsByTagNameNS(Et, "collection").length > 0,
      size: i ? Number(i.textContent) : 0,
      mtime: s ? new Date(s.textContent) : void 0
    };
  });
}
function wn(t) {
  const n = t.replace(/\/+$/, "").split("/");
  return decodeURIComponent(n[n.length - 1]);
}
function tt(t, n, o) {
  return t === 0 ? new F("network", (o ? o + ": " : "") + "redirected (signed out?)") : t === 404 ? new F("not-found", n) : t === 412 || t === 405 ? new F("exists", n) : t === 507 ? new F("quota", n) : new F("network", (o ? o + ": " : "") + "HTTP " + t);
}
function it(t, n) {
  return t >= 200 && t < 300 && !n;
}
function ce(t, n, o, l, i) {
  return new Promise((s, h) => {
    const m = new XMLHttpRequest();
    m.open(t, n);
    for (const [v, k] of Object.entries(z(o)))
      m.setRequestHeader(v, k);
    i && m.upload.addEventListener("progress", (v) => i(v.loaded, v.total)), m.addEventListener("load", () => s(new URL(m.responseURL, n).href === new URL(n, window.location.href).href ? m.status : 0)), m.addEventListener("error", () => h(new F("network", t + " failed"))), m.addEventListener("abort", () => h(new F("network", t + " aborted"))), m.send(l ?? null);
  });
}
async function yt(t, n, o, l, i = []) {
  const s = await fetch(n, { method: t, headers: z(o), credentials: "same-origin" });
  if (!it(s.status, s.redirected) && !i.includes(s.status))
    throw tt(s.redirected ? 0 : s.status, l, t);
  return s;
}
function ke(t) {
  const n = yn(t), o = (i) => n + gt(i);
  async function l(i, s, h, m) {
    const v = Vt("dav") + "/uploads/" + encodeURIComponent(rt()) + "/cryptomator-vaults-" + crypto.randomUUID(), k = new URL(o(i), window.location.href).href, b = { Destination: k, "OC-Total-Length": String(s.length) };
    await yt("MKCOL", v, { Destination: k }, i);
    try {
      for (let A = 0, S = 1; A < s.length; A += ie, S++) {
        const V = s.subarray(A, Math.min(A + ie, s.length)), j = await ce(
          "PUT",
          v + "/" + String(S).padStart(5, "0"),
          b,
          V,
          ($) => m?.(A + $, s.length)
        );
        if (!it(j, !1))
          throw tt(j, i, "PUT (part " + S + ")");
      }
      const C = await fetch(v + "/.file", {
        method: "MOVE",
        headers: z({ ...b, Overwrite: h ? "F" : "T" }),
        credentials: "same-origin"
      });
      if (!it(C.status, C.redirected))
        throw tt(C.redirected ? 0 : C.status, i, "MOVE (assembling the parts)");
    } catch (C) {
      throw await fetch(v, { method: "DELETE", headers: z(), credentials: "same-origin" }).catch(() => {
      }), C;
    }
  }
  return {
    async read(i, s) {
      const h = await fetch(n + gt(i), { headers: z(), credentials: "same-origin" });
      if (h.status === 404)
        throw new F("not-found", i);
      if (!h.ok)
        throw new F("network", "GET: HTTP " + h.status);
      const m = Number(h.headers.get("Content-Length")) || 0;
      if (!s || !h.body || m === 0)
        return new Uint8Array(await h.arrayBuffer());
      const v = new Uint8Array(m), k = h.body.getReader();
      let b = 0;
      for (; ; ) {
        const { done: C, value: A } = await k.read();
        if (C)
          break;
        v.set(A, b), b += A.length, s(b, m);
      }
      return v.subarray(0, b);
    },
    async stat(i) {
      const s = await fetch(o(i), {
        method: "PROPFIND",
        headers: z({ Depth: "0", "Content-Type": "application/xml; charset=utf-8" }),
        credentials: "same-origin",
        body: '<?xml version="1.0"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/></d:prop></d:propfind>'
      });
      if (s.status === 404)
        return null;
      if (s.status !== 207)
        throw tt(s.status, i, "PROPFIND");
      const [h] = Dt(await s.text());
      return { isDir: h.isDir, size: h.size };
    },
    /** Stores a file whole; create: refused (VaultError 'exists') if the name is taken. */
    async write(i, s, { create: h = !1, onProgress: m } = {}) {
      if (s.length >= fn)
        return l(i, s, h, m);
      const v = await ce("PUT", o(i), h ? { "If-None-Match": "*" } : {}, s, m);
      if (!it(v, !1))
        throw tt(v, i, "PUT");
    },
    async mkdir(i, { existsOk: s = !1 } = {}) {
      const h = await fetch(o(i), { method: "MKCOL", headers: z(), credentials: "same-origin" });
      if (!(it(h.status, h.redirected) || h.status === 405 && s))
        throw tt(h.status, i, "MKCOL");
    },
    /** Moves in one step; refused (VaultError 'exists') if the target is taken, unless overwrite. */
    async move(i, s, { overwrite: h = !1 } = {}) {
      await yt("MOVE", o(i), { Destination: new URL(o(s), window.location.href).href, Overwrite: h ? "T" : "F" }, s);
    },
    /** Copies on the server; refused (VaultError 'exists') if the target is taken. */
    async copy(i, s) {
      await yt("COPY", o(i), { Destination: new URL(o(s), window.location.href).href, Overwrite: "F" }, s);
    },
    async remove(i) {
      await yt("DELETE", o(i), {}, i, [404]);
    },
    async list(i) {
      const s = await fetch(n + (i ? gt(i) + "/" : ""), {
        method: "PROPFIND",
        headers: z({ Depth: "1", "Content-Type": "application/xml; charset=utf-8" }),
        credentials: "same-origin",
        body: '<?xml version="1.0"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/></d:prop></d:propfind>'
      });
      if (s.status === 404)
        throw new F("not-found", i);
      if (!s.ok)
        throw new F("network", "PROPFIND: HTTP " + s.status);
      return Dt(await s.text()).slice(1).map((h) => ({ name: wn(h.href), isDir: h.isDir, size: h.size, mtime: h.mtime }));
    }
  };
}
async function gn() {
  const t = rt(), n = (i) => i.replace(/&/g, "&amp;").replace(/</g, "&lt;"), o = await fetch(Vt("dav") + "/", {
    method: "SEARCH",
    headers: z({ "Content-Type": "text/xml; charset=utf-8" }),
    credentials: "same-origin",
    body: '<?xml version="1.0" encoding="UTF-8"?><d:searchrequest xmlns:d="DAV:"><d:basicsearch><d:select><d:prop><d:displayname/></d:prop></d:select><d:from><d:scope><d:href>/files/' + n(t) + "</d:href><d:depth>infinity</d:depth></d:scope></d:from><d:where><d:like><d:prop><d:displayname/></d:prop><d:literal>vault.cryptomator</d:literal></d:like></d:where></d:basicsearch></d:searchrequest>"
  });
  if (!o.ok)
    throw new Error("HTTP " + o.status);
  const l = "/files/" + t + "/";
  return Dt(await o.text()).map((i) => decodeURIComponent(i.href)).filter((i) => i.endsWith("/vault.cryptomator") && i.includes(l)).map((i) => "/" + i.slice(i.indexOf(l) + l.length, -18)).map((i) => i.replace(/\/+$/, "") || "/").sort((i, s) => i.localeCompare(s));
}
const { Vault: Ce, checkName: Ae } = ge;
let Tt = null;
function Ft() {
  return Tt || (document.head.append(p("link", { rel: "stylesheet", href: Ye("cryptomator_vaults", "css", "cryptomator_vaults-files.css") })), Tt = import("./cryptomator_vaults-dialogs.mjs")), Tt;
}
function N(t) {
  Ft().then(({ showError: n }) => n(t));
}
function Pt(t) {
  Ft().then(({ showInfo: n }) => n(t));
}
const Rt = "cryptomator-vaults", ut = "/cryptomator-vaults", Lt = window.location.origin + "/apps/cryptomator_vaults" + ut, vn = Be("cryptomator_vaults", "file.svg"), le = 15, xe = "cryptomator_vaults.added", Ht = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 3h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-1v1h-3v-1H8v1H5v-1H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v13h16V5zm8 2.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5.5 8h1.5v7H5.5z"/></svg>', bn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 8a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/></svg>', kn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>', Se = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9V6zm9 14H6V10h12v10z"/></svg>', Cn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>', An = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"/></svg>', xn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.21a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>', Sn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-6 12v-3h-4v-4h4V8l5 5-5 5z"/></svg>', En = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>', Tn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2zm5 9h-2v2h-2v-2H9v-2h2V9h2v2h2v2z"/></svg>', O = /* @__PURE__ */ new Map();
let It = null, ct = null, P = { kind: "vaults" };
async function Ot(t, n) {
  const o = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t)));
  return Array.from(o, (l) => l.toString(16).padStart(2, "0")).join("").slice(0, n);
}
const In = "r000000000001", Ee = 2 ** 52;
function Te(t) {
  return Ee + parseInt(t.slice(1, 13), 16);
}
function Ie() {
  try {
    const t = JSON.parse(window.localStorage.getItem(xe) || "[]");
    return Array.isArray(t) ? t.filter((n) => typeof n == "string") : [];
  } catch {
    return [];
  }
}
function Un(t) {
  try {
    window.localStorage.setItem(xe, JSON.stringify([.../* @__PURE__ */ new Set([t, ...Ie()])]));
  } catch {
  }
}
function Mn(t) {
  return t.split("/").filter(Boolean).pop() || d("All files");
}
async function Ue(t) {
  const n = "v" + await Ot("vault:" + t, 12);
  return O.has(n) || O.set(n, { seg: n, folder: t, name: Mn(t), vault: null, dirs: /* @__PURE__ */ new Map(), entries: /* @__PURE__ */ new Map(), nodes: /* @__PURE__ */ new Set() }), O.get(n);
}
function zt() {
  return It || (It = (async () => {
    let t = [];
    try {
      t = await gn();
    } catch (n) {
      N(d("The search for vaults failed: {detail}", { detail: n.message }));
    }
    for (const n of [.../* @__PURE__ */ new Set([...t, ...Ie()])])
      await Ue(n);
  })()), It;
}
function J(t, n, o, l, i = !0) {
  const s = t.split("/").filter(Boolean).pop() || In, h = new ye({
    id: Te(s),
    source: Lt + t,
    root: ut,
    owner: rt(),
    displayname: n,
    permissions: _t.READ,
    mtime: l?.mtime,
    attributes: { cryptomatorVault: o?.seg ?? null, ...l?.attributes }
  });
  return i && o?.nodes.add(h), h;
}
function Nn(t, n, o) {
  const l = t.split("/").pop(), i = new Je({
    id: Te(l),
    source: Lt + t,
    root: ut,
    owner: rt(),
    displayname: n.name,
    mime: "application/octet-stream",
    size: n.size ?? 0,
    mtime: n.mtime,
    permissions: _t.READ,
    attributes: { "has-preview": !0, previewUrl: vn, cryptomatorVault: o.seg, cryptomatorType: n.type }
  });
  return o.nodes.add(i), i;
}
function L(t) {
  switch (t?.code) {
    case "exists":
    case "exists-other":
      return d("“{name}” already exists in this folder.", { name: t.message });
    case "invalid-name":
      return d("“{name}” cannot be a name in a vault.", { name: t.message });
    case "quota":
      return d("Your storage is full.");
    case "read-only":
      return d("This vault cannot be written to.");
    case "invalid-move":
      return d("A folder cannot be moved into itself or into a folder inside it.");
    case "wrong-password":
      return d("Wrong password.");
    case "unsupported-format":
      return d("This vault has a format the app cannot read (only vault format 8, Cryptomator 1.6 and later).");
    case "unsupported-key":
      return d("This vault keeps its key on a Cryptomator Hub, which the app does not support.");
    case "not-found":
      return d("There is no Cryptomator vault in this folder.");
    case "corrupt":
      return d("The vault is damaged: {detail}", { detail: t.message });
    case "locked":
      return d("The vault is locked.");
    default:
      return d("Something went wrong: {detail}", { detail: t?.message || String(t) });
  }
}
function lt(t) {
  window.OCP.Files.Router.goToRoute(null, { view: Rt }, { dir: t });
}
function Bt() {
  return window.OCP?.Files?.Router?.query?.dir || "/";
}
async function Me(t) {
  if (t.vault?.unlocked)
    return !0;
  try {
    t.vault = t.vault || await Ce.open(ke(t.folder));
  } catch (o) {
    return N(L(o)), !1;
  }
  const n = await an(t.name, async (o) => {
    try {
      await t.vault.unlock(o);
    } catch (l) {
      throw new Error(L(l));
    }
  }, t.folder);
  return n && Ne(), n;
}
async function ue() {
  P = { kind: "vaults" };
  const t = J("/", d("Vaults"), null), n = [...O.values()].sort((o, l) => o.name.localeCompare(l.name)).map((o) => J("/" + o.seg, o.name, o, { attributes: { cryptomatorVaultRoot: !0, cryptomatorFolder: o.folder } }, !1));
  return { folder: t, contents: n };
}
const Kt = window.isSecureContext && !!window.crypto?.subtle;
async function Dn(t) {
  if (Gt(), !Kt)
    return P = { kind: "insecure" }, { folder: new ye({ id: Ee + 1, source: Lt + "/", root: ut, owner: rt(), permissions: _t.READ }), contents: [] };
  await zt();
  const n = t.split("/").filter(Boolean);
  if (n.length === 0)
    return ue();
  const o = O.get(n[0]);
  if (!o)
    return lt("/"), ue();
  if (!o.vault?.unlocked && !await Me(o))
    return P = { kind: "locked", vault: o }, { folder: J(t, o.name, o, { attributes: { cryptomatorVaultRoot: n.length === 1 } }, !1), contents: [] };
  let l = "", i = o.name;
  if (n.length > 1) {
    const m = o.dirs.get(n[n.length - 1]);
    if (!m)
      return lt("/" + o.seg), { folder: J(t, o.name, o), contents: [] };
    l = m.dirId, i = m.name;
  }
  const s = await o.vault.list(l), h = [];
  for (const m of s)
    if (m.type === "dir") {
      const v = "d" + await Ot(o.seg + ":dir:" + m.dirId, 12);
      o.dirs.set(v, { dirId: m.dirId, name: m.name }), h.push(J(t + "/" + v, m.name, o, { mtime: m.mtime }));
    } else {
      const v = "f" + await Ot(o.seg + ":file:" + m.path, 12);
      o.entries.set(v, m), h.push(Nn(t + "/" + v, m, o));
    }
  return P = { kind: "folder", vault: o, dirId: l, path: t }, { folder: J(t, i, o, void 0, n.length > 1), contents: h };
}
function On(t) {
  if (t.replaceChildren(), t.classList.add("cryptomator-empty"), P.kind === "insecure")
    t.append(T(d("Vaults can only be opened over HTTPS: the browser provides its encryption only there."), "error"));
  else if (P.kind === "locked") {
    const n = P.vault;
    t.append(
      p("h2", {}, d("{vault} is locked", { vault: n.name })),
      T(d("Its files are decrypted in this browser tab once you enter its password.")),
      p("button", {
        type: "button",
        class: "primary",
        onclick: async () => {
          await Me(n) && kt(n.name);
        }
      }, d("Unlock"))
    );
  } else P.kind === "folder" ? t.append(p("h2", {}, d("This folder is empty."))) : t.append(
    p("h2", {}, d("No vaults found")),
    T(d("Vaults in your files appear here. Open a vault's folder to add one.")),
    p("button", { type: "button", class: "primary", onclick: De }, d("Open a vault folder …"))
  );
}
function kt(t) {
  we("files:node:updated", J(Bt(), t, null));
}
function qt(t) {
  if (t.vault?.unlocked) {
    if (W && P.vault === t) {
      Pt(d("The vault locks when the change being made has finished."));
      const n = setInterval(() => {
        W || (clearInterval(n), qt(t));
      }, 500);
      return;
    }
    t.vault.lock();
    for (const n of t.nodes)
      we("files:node:deleted", n);
    t.nodes.clear(), t.dirs.clear(), t.entries.clear(), rn(), Bt().startsWith("/" + t.seg) && lt("/"), [...O.values()].some((n) => n.vault?.unlocked) || (clearTimeout(ct), ct = null);
  }
}
function Wt(t) {
  let n = !1;
  for (const o of O.values())
    o.vault?.unlocked && (qt(o), n = !0);
  n && t && Pt(t);
}
function Ne() {
  clearTimeout(ct), ct = setTimeout(
    () => Wt(d("Locked after {minutes} minutes without use.", { minutes: le })),
    le * 60 * 1e3
  );
}
function Vn() {
  ct !== null && Ne();
}
async function jt(t) {
  try {
    await Ce.open(ke(t));
  } catch (o) {
    N(L(o));
    return;
  }
  Un(t), await zt();
  const n = await Ue(t);
  lt("/" + n.seg);
}
async function De() {
  let t;
  try {
    const { getFilePickerBuilder: o } = await Ft();
    t = await o(d("Choose a vault")).setMultiSelect(!1).allowDirectories(!0).setFilter((l) => l.type === B.Folder || l.basename === "vault.cryptomator").addButton({ label: d("Open vault"), variant: "primary", callback: () => {
    } }).build().pick();
  } catch {
    return;
  }
  const n = "/" + String(t).replace(/^\/+|\/+$/g, "");
  await jt(n.endsWith("/vault.cryptomator") ? n.slice(0, -18) || "/" : n);
}
function K(t) {
  return t?.id === Rt;
}
const _n = /* @__PURE__ */ new Set([
  "cryptomator-vaults-open",
  "cryptomator-vaults-download",
  "cryptomator-vaults-lock",
  "cryptomator-vaults-open-vault",
  "cryptomator-vaults-rename",
  "cryptomator-vaults-move",
  "cryptomator-vaults-delete"
]), de = /* @__PURE__ */ new WeakSet();
let he = 0;
function Gt() {
  const t = Xe();
  if (t.length !== he) {
    he = t.length;
    for (const n of t) {
      if (_n.has(n.id) || de.has(n))
        continue;
      const o = n.enabled;
      try {
        Object.defineProperty(n, "enabled", {
          configurable: !0,
          enumerable: !0,
          writable: !0,
          value: (l) => !K(l?.view) && !(l?.nodes ?? []).some((i) => i?.root === ut) && (o ? o.call(n, l) : !0)
        }), de.add(n);
      } catch {
      }
    }
  }
}
function Oe(t) {
  const n = O.get(t.attributes?.cryptomatorVault), o = n?.entries.get(t.basename);
  return { vault: n, entry: o };
}
Y({
  id: "cryptomator-vaults-open",
  displayName: ({ nodes: t }) => t[0]?.type === B.Folder ? d("Open") : d("View"),
  iconSvgInline: () => bn,
  enabled: ({ nodes: t, view: n }) => (Gt(), K(n) && t.length === 1),
  async exec({ nodes: t }) {
    const n = t[0];
    if (n.type === B.Folder)
      return lt(n.path), null;
    const { vault: o, entry: l } = Oe(n);
    return !o?.vault?.unlocked || !l ? (N(d("The vault is locked.")), null) : (l.type === "link" ? Pt(d("A link to {target}", { target: l.target })) : l.type === "broken" ? N(d("This entry cannot be read: {detail}", { detail: l.error })) : await un(l.name, l.size, (i, s) => o.vault.readFile(l, i, s), L), null);
  },
  default: Ke.DEFAULT,
  order: -1e3
});
async function pe(t) {
  const { vault: n, entry: o } = Oe(t);
  if (!n?.vault?.unlocked || !o)
    return N(d("The vault is locked.")), null;
  try {
    ve(o.name, await n.vault.readFile(o));
  } catch (l) {
    N(L(l));
  }
  return null;
}
Y({
  id: "cryptomator-vaults-download",
  displayName: () => d("Download"),
  iconSvgInline: () => kn,
  enabled: ({ nodes: t, view: n }) => K(n) && t.length > 0 && t.every((o) => o.type === B.File && o.attributes?.cryptomatorType === "file"),
  exec: ({ nodes: t }) => pe(t[0]),
  async execBatch({ nodes: t }) {
    const n = [];
    for (const o of t)
      n.push(await pe(o));
    return n;
  },
  order: -900
});
Y({
  id: "cryptomator-vaults-lock",
  displayName: () => d("Lock"),
  iconSvgInline: () => Se,
  enabled: ({ nodes: t, view: n }) => K(n) && t.length === 1 && t[0].attributes?.cryptomatorVaultRoot === !0 && O.get(t[0].attributes.cryptomatorVault)?.vault?.unlocked === !0,
  async exec({ nodes: t }) {
    return qt(O.get(t[0].attributes.cryptomatorVault)), null;
  },
  order: -800
});
Y({
  id: "cryptomator-vaults-open-vault",
  displayName: () => d("Open vault"),
  iconSvgInline: () => Ht,
  enabled: ({ nodes: t, view: n }) => n?.id === "files" && t.length === 1 && t[0].root?.startsWith("/files/") && (t[0].basename === "vault.cryptomator" || t[0].type === B.Folder && [...O.values()].some((o) => o.folder === t[0].path)),
  async exec({ nodes: t }) {
    const n = t[0];
    return await jt(n.type === B.Folder ? n.path : n.dirname), null;
  },
  order: 50
});
const Ve = /* @__PURE__ */ new Set();
let X = null;
function Fn(t) {
  return Ve.has(t) || [...O.values()].some((n) => n.folder === t);
}
function vt(t) {
  if (!X)
    return;
  X.folder = t;
  const n = t?.path;
  if (!n || !Fn(n)) {
    X.el.replaceChildren();
    return;
  }
  X.el.replaceChildren(p("div", { class: "cryptomator-banner", role: "note" }, [
    p("span", { class: "cryptomator-banner__icon", "aria-hidden": "true" }),
    p(
      "span",
      { class: "cryptomator-banner__text" },
      d("This folder is a Cryptomator vault: its files are encrypted. Open it to see them, decrypted in this browser.")
    ),
    p("button", { type: "button", class: "primary", onclick: () => jt(n) }, d("Open vault"))
  ])), X.el.querySelector(".cryptomator-banner__icon").innerHTML = Ht;
}
qe({
  id: "cryptomator-vaults-banner",
  order: 5,
  enabled: (t, n) => Kt && n?.id === "files",
  render(t, n) {
    X = { el: t, folder: n }, vt(n);
  },
  updated(t) {
    vt(t);
  }
});
We("files:list:updated", ({ view: t, folder: n, contents: o }) => {
  t?.id !== "files" || !n?.path || ((o || []).some((l) => l.type === B.File && l.basename === "vault.cryptomator") && Ve.add(n.path), vt(n));
});
function H() {
  const t = P.kind === "folder" ? P : null;
  return t?.vault?.vault?.unlocked && Bt() === t.path ? t : null;
}
let W = !1;
async function _e(t) {
  const n = H();
  if (!n || t.length === 0)
    return;
  if (W) {
    N(d("Another change to the vault is still running."));
    return;
  }
  const o = t.filter((v) => v.size > Ut);
  if (o.length > 0 && !window.confirm(d("{count} of the files are larger than {size}. Your browser holds each twice while encrypting. Continue?", { count: o.length, size: Nt(Ut) })))
    return;
  W = !0;
  const { vault: l } = n.vault, i = pn(d("Uploading to {vault}", { vault: n.vault.name }));
  let s = null, h = 0;
  const m = [];
  try {
    for (const [v, k] of t.entries()) {
      const b = i.file(k.name);
      if (i.stopped) {
        b.done(d("Not uploaded"));
        continue;
      }
      let C = s === "replace-all";
      const A = async () => {
        const S = new Uint8Array(await k.arrayBuffer()), V = { encrypt: d("Encrypting"), upload: d("Uploading"), verify: d("Checking") }, j = { encrypt: [0, 0.2], upload: [0.2, 0.6], verify: [0.8, 0.2] };
        await l.writeFile(n.dirId, k.name, S, {
          replace: C,
          onProgress: ($, Ct, dt) => {
            const [ht, Q] = j[$];
            b.phase(V[$], ht + Q * (dt ? Ct / dt : 1));
          }
        });
      };
      try {
        try {
          await A();
        } catch (S) {
          if (S?.code !== "exists" || s === "skip-all")
            throw S;
          const V = s === "replace-all" ? "replace" : await i.ask(k.name, t.length);
          if (V === "cancel") {
            b.done(d("Not uploaded"));
            break;
          }
          if (V.endsWith("-all") && (s = V), V.startsWith("skip")) {
            b.done(d("Skipped"));
            continue;
          }
          C = !0, await A();
        }
        h++, b.done(d("Uploaded and checked"));
      } catch (S) {
        S?.code === "exists" && s === "skip-all" ? b.done(d("Skipped")) : (m.push(k.name), b.done(L(S), !0));
      }
      i.progress((v + 1) / t.length);
    }
  } finally {
    W = !1, i.finish(m.length ? d("{written} uploaded, {failed} failed. The vault is unchanged where an upload failed.", { written: h, failed: m.length }) : d("{written} uploaded and checked.", { written: h }), m.length > 0), kt(n.vault.name);
  }
}
function Pn() {
  const t = p("input", { type: "file", multiple: !0, hidden: !0 });
  t.addEventListener("change", () => {
    const n = [...t.files];
    t.remove(), _e(n);
  }), document.body.append(t), t.click();
}
async function Rn() {
  const t = H();
  if (!t)
    return;
  const n = await be(d("New folder"), d("Folder name"), (o) => {
    try {
      return Ae(o), null;
    } catch (l) {
      return L(l);
    }
  });
  if (n !== null)
    try {
      await t.vault.vault.createDirectory(t.dirId, n), kt(t.vault.name);
    } catch (o) {
      N(L(o));
    }
}
async function Xt(t, n) {
  if (W) {
    N(d("Another change to the vault is still running."));
    return;
  }
  W = !0;
  try {
    await n();
  } finally {
    W = !1, kt(t.vault.name);
  }
}
function Jt(t, n) {
  return t?.code === "not-found" ? d("“{name}” is no longer there.", { name: n }) : L(t);
}
function Yt(t, n) {
  const o = K(n) ? H() : null;
  return o !== null && t.length > 0 && t.every((l) => l.attributes?.cryptomatorVault === o.vault.seg);
}
async function Ln(t) {
  const n = H(), o = t.displayname, l = await be(d("Rename"), d("New name"), (i) => {
    try {
      return Ae(i), null;
    } catch (s) {
      return L(s);
    }
  }, { initial: o, action: d("Rename") });
  l === null || l.normalize("NFC") === o || await Xt(n, async () => {
    try {
      await n.vault.vault.moveEntry(n.dirId, o, n.dirId, l);
    } catch (i) {
      N(Jt(i, o));
    }
  });
}
async function fe(t) {
  const n = H(), { vault: o } = n.vault, l = new Set(t.filter((s) => s.type === B.Folder).map((s) => n.vault.dirs.get(s.basename)?.dirId).filter(Boolean)), i = await hn(
    t.length === 1 ? d("Move “{name}” to …", { name: t[0].displayname }) : d("Move {count} items to …", { count: t.length }),
    n.vault.name,
    async (s) => (await o.list(s)).filter((h) => h.type === "dir").map((h) => ({ name: h.name, dirId: h.dirId })),
    l,
    d("Move here")
  );
  i === null || i.dirId === n.dirId || await Xt(n, async () => {
    const s = [];
    for (const h of t)
      try {
        await o.moveEntry(n.dirId, h.displayname, i.dirId, void 0, { ancestors: i.ancestors });
      } catch (m) {
        s.push(h.displayname + ": " + Jt(m, h.displayname));
      }
    s.length && N(s.join(`
`));
  });
}
async function me(t) {
  const n = H(), o = t.filter((s) => s.type === B.Folder).length, l = t.length === 1 ? d("Delete “{name}”?", { name: t[0].displayname }) : d("Delete {count} items?", { count: t.length }), i = (o ? d("Folders are deleted with everything in them.") + " " : "") + d("The encrypted files go to Nextcloud's deleted files.");
  await dn(l, i, d("Delete")) && await Xt(n, async () => {
    const s = [];
    for (const h of t)
      try {
        await n.vault.vault.removeEntry(n.dirId, h.displayname);
      } catch (m) {
        s.push(h.displayname + ": " + Jt(m, h.displayname));
      }
    s.length && N(s.join(`
`));
  });
}
Y({
  id: "cryptomator-vaults-rename",
  displayName: () => d("Rename"),
  iconSvgInline: () => xn,
  enabled: ({ nodes: t, view: n }) => Yt(t, n) && t.length === 1,
  async exec({ nodes: t }) {
    return await Ln(t[0]), null;
  },
  order: -700
});
Y({
  id: "cryptomator-vaults-move",
  displayName: () => d("Move …"),
  iconSvgInline: () => Sn,
  enabled: ({ nodes: t, view: n }) => Yt(t, n),
  async exec({ nodes: t }) {
    return await fe(t), null;
  },
  async execBatch({ nodes: t }) {
    return await fe(t), t.map(() => null);
  },
  order: -690
});
Y({
  id: "cryptomator-vaults-delete",
  displayName: () => d("Delete"),
  iconSvgInline: () => En,
  enabled: ({ nodes: t, view: n }) => Yt(t, n),
  async exec({ nodes: t }) {
    return await me(t), null;
  },
  async execBatch({ nodes: t }) {
    return await me(t), t.map(() => null);
  },
  destructive: !0,
  order: 100
});
bt({
  id: "cryptomator-vaults-upload",
  displayName: () => d("Upload files …"),
  iconSvgInline: () => Cn,
  order: -2,
  enabled: ({ view: t }) => K(t) && H() !== null,
  exec: async () => (Pn(), null)
});
bt({
  id: "cryptomator-vaults-new-folder",
  displayName: () => d("New folder …"),
  iconSvgInline: () => An,
  order: -1,
  enabled: ({ view: t }) => K(t) && H() !== null,
  exec: async () => (await Rn(), null)
});
function Hn(t) {
  H() && t.dataTransfer?.types?.includes("Files") && (t.preventDefault(), t.stopPropagation(), t.dataTransfer.dropEffect = "copy");
}
function zn(t) {
  if (!H() || !t.dataTransfer?.files?.length)
    return;
  t.preventDefault(), t.stopPropagation();
  const n = [...t.dataTransfer.items || []].map((l) => ({ entry: l.webkitGetAsEntry?.(), file: l.getAsFile() })), o = n.length > 0 ? n.filter(({ entry: l, file: i }) => i && !l?.isDirectory).map(({ file: l }) => l) : [...t.dataTransfer.files];
  n.some(({ entry: l }) => l?.isDirectory) && N(d("Folders cannot be dropped into a vault yet: drop the files, or create the folder first.")), _e(o);
}
window.addEventListener("dragover", Hn, !0);
window.addEventListener("drop", zn, !0);
bt({
  id: "cryptomator-vaults-add",
  displayName: () => d("Open a vault folder …"),
  iconSvgInline: () => Tn,
  order: 0,
  enabled: ({ view: t }) => K(t),
  exec: async () => (await De(), null)
});
bt({
  id: "cryptomator-vaults-lock-all",
  displayName: () => d("Lock all vaults"),
  iconSvgInline: () => Se,
  order: 1,
  enabled: ({ view: t }) => K(t) && [...O.values()].some((n) => n.vault?.unlocked),
  exec: async () => (Wt(), null)
});
je().register(new Ge({
  id: Rt,
  name: d("Vaults"),
  caption: d("Cryptomator vaults, unlocked in this browser"),
  emptyTitle: d("No vaults found"),
  emptyCaption: d("Vaults in your files appear here. Open a vault's folder to add one."),
  emptyView: On,
  icon: Ht,
  order: 90,
  getContents: Dn
}));
Gt();
for (const t of ["pointerdown", "keydown", "wheel", "touchstart"])
  document.addEventListener(t, Vn, { passive: !0 });
window.addEventListener("pagehide", () => {
  M(), Wt();
});
Kt && zt().then(() => vt(X?.folder));
export {
  Rt as VIEW_ID
};
