import { H as De, t as Ie, q as Ne, v as Nt, J as Oe, K as ft, L as Ve, M as _e, s as Fe, F as G, O as yt, Q as Le, V as Re, x as ue, P as Ot, R as He, w as Pe, y as de, S as ze } from "./cryptomator_vaults-common.mjs";
var dt = { exports: {} }, Ke = dt.exports, te;
function Be() {
  return te || (te = 1, (function(e) {
    (function(n, a) {
      e.exports ? e.exports = a(globalThis.crypto) : n.CryptomatorVault = a(n.crypto);
    })(typeof self < "u" ? self : Ke, function(n) {
      const a = n.subtle, u = new TextEncoder(), s = new TextDecoder("utf-8", { fatal: !0 });
      class c extends Error {
        constructor(t, r) {
          super(r || t), this.name = "VaultError", this.code = t;
        }
      }
      function h(p) {
        const t = p.replace(/-/g, "+").replace(/_/g, "/"), r = t + "=".repeat((4 - t.length % 4) % 4), o = atob(r), i = new Uint8Array(o.length);
        for (let l = 0; l < o.length; l++)
          i[l] = o.charCodeAt(l);
        return i;
      }
      function m(p, t) {
        let r = "";
        for (let i = 0; i < p.length; i++)
          r += String.fromCharCode(p[i]);
        const o = btoa(r).replace(/\+/g, "-").replace(/\//g, "_");
        return t ? o : o.replace(/=+$/, "");
      }
      const g = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      function k(p) {
        let t = "", r = 0, o = 0;
        for (const i of p)
          for (r = r << 8 | i, o += 8; o >= 5; )
            t += g[r >>> o - 5 & 31], o -= 5;
        return o > 0 && (t += g[r << 5 - o & 31]), t;
      }
      function b(...p) {
        const t = new Uint8Array(p.reduce((o, i) => o + i.length, 0));
        let r = 0;
        for (const o of p)
          t.set(o, r), r += o.length;
        return t;
      }
      function C(p) {
        const t = new Uint8Array(8);
        return new DataView(t.buffer).setBigUint64(0, BigInt(p)), t;
      }
      function A(p, t) {
        if (p.length !== t.length)
          return !1;
        let r = 0;
        for (let o = 0; o < p.length; o++)
          r |= p[o] ^ t[o];
        return r === 0;
      }
      async function T(p, t, r) {
        const o = await a.importKey(
          "raw",
          p.length ? p : new Uint8Array(64),
          { name: "HMAC", hash: "SHA-256" },
          !1,
          ["sign"]
        ), i = new Uint8Array(r);
        for (let l = 1, f = 0; f < r; l++, f += 32) {
          const v = new Uint8Array([l >>> 24, l >>> 16 & 255, l >>> 8 & 255, l & 255]), w = new Uint8Array(await a.sign("HMAC", o, b(t, v)));
          i.set(w.subarray(0, Math.min(32, r - f)), f);
        }
        return i;
      }
      function _(p) {
        const t = p.slice(), r = (o, i) => o << i | o >>> 32 - i;
        for (let o = 0; o < 8; o += 2)
          t[4] ^= r(t[0] + t[12], 7), t[8] ^= r(t[4] + t[0], 9), t[12] ^= r(t[8] + t[4], 13), t[0] ^= r(t[12] + t[8], 18), t[9] ^= r(t[5] + t[1], 7), t[13] ^= r(t[9] + t[5], 9), t[1] ^= r(t[13] + t[9], 13), t[5] ^= r(t[1] + t[13], 18), t[14] ^= r(t[10] + t[6], 7), t[2] ^= r(t[14] + t[10], 9), t[6] ^= r(t[2] + t[14], 13), t[10] ^= r(t[6] + t[2], 18), t[3] ^= r(t[15] + t[11], 7), t[7] ^= r(t[3] + t[15], 9), t[11] ^= r(t[7] + t[3], 13), t[15] ^= r(t[11] + t[7], 18), t[1] ^= r(t[0] + t[3], 7), t[2] ^= r(t[1] + t[0], 9), t[3] ^= r(t[2] + t[1], 13), t[0] ^= r(t[3] + t[2], 18), t[6] ^= r(t[5] + t[4], 7), t[7] ^= r(t[6] + t[5], 9), t[4] ^= r(t[7] + t[6], 13), t[5] ^= r(t[4] + t[7], 18), t[11] ^= r(t[10] + t[9], 7), t[8] ^= r(t[11] + t[10], 9), t[9] ^= r(t[8] + t[11], 13), t[10] ^= r(t[9] + t[8], 18), t[12] ^= r(t[15] + t[14], 7), t[13] ^= r(t[12] + t[15], 9), t[14] ^= r(t[13] + t[12], 13), t[15] ^= r(t[14] + t[13], 18);
        for (let o = 0; o < 16; o++)
          p[o] = p[o] + t[o] | 0;
      }
      function P(p, t, r, o) {
        o.set(p.subarray((2 * r - 1) * 16, 2 * r * 16));
        for (let i = 0; i < 2 * r; i++) {
          for (let l = 0; l < 16; l++)
            o[l] ^= p[i * 16 + l];
          _(o), t.set(o, ((i & 1) * r + (i >> 1)) * 16);
        }
      }
      function X(p, t, r) {
        const o = 32 * r, i = new Int32Array(o * t), l = new Int32Array(p), f = new Int32Array(o), v = new Int32Array(16);
        for (let w = 0; w < t; w++)
          i.set(l, w * o), P(l, f, r, v), l.set(f);
        for (let w = 0; w < t; w++) {
          const S = l[(2 * r - 1) * 16] & t - 1;
          for (let x = 0; x < o; x++)
            l[x] ^= i[S * o + x];
          P(l, f, r, v), l.set(f);
        }
        return l;
      }
      function gt(p) {
        const t = new DataView(p.buffer, p.byteOffset, p.byteLength), r = new Int32Array(p.length / 4);
        for (let o = 0; o < r.length; o++)
          r[o] = t.getInt32(o * 4, !0);
        return r;
      }
      function st(p, t) {
        const r = new DataView(t.buffer, t.byteOffset, t.byteLength);
        for (let o = 0; o < p.length; o++)
          r.setInt32(o * 4, p[o], !0);
      }
      async function it(p, t, r, o, i, l) {
        if (r < 2 || (r & r - 1) !== 0)
          throw new c("corrupt", "scrypt cost is not a power of two");
        const f = 128 * o, v = await T(p, t, i * f);
        for (let w = 0; w < i; w++) {
          const S = v.subarray(w * f, (w + 1) * f);
          st(X(gt(S), r, o), S);
        }
        return T(p, v, l);
      }
      function J(p) {
        const t = new Uint8Array(16);
        for (let r = 0; r < 15; r++)
          t[r] = (p[r] << 1 | p[r + 1] >>> 7) & 255;
        return t[15] = p[15] << 1 & 255, p[0] & 128 && (t[15] ^= 135), t;
      }
      function et(p, t) {
        const r = new Uint8Array(p.length);
        for (let o = 0; o < p.length; o++)
          r[o] = p[o] ^ t[o];
        return r;
      }
      class Gt {
        constructor(t) {
          this.key = t, this.subkeys = null;
        }
        async cbcLast(t) {
          return new Uint8Array(await a.encrypt({ name: "AES-CBC", iv: new Uint8Array(16) }, this.key, t)).subarray(t.length - 16, t.length);
        }
        async mac(t) {
          if (this.subkeys === null) {
            const v = await this.cbcLast(new Uint8Array(16)), w = J(v);
            this.subkeys = [w, J(w)];
          }
          const [r, o] = this.subkeys, i = Math.max(1, Math.ceil(t.length / 16)), l = new Uint8Array(i * 16);
          l.set(t);
          const f = l.subarray((i - 1) * 16);
          return t.length > 0 && t.length % 16 === 0 ? f.set(et(f, r)) : (f[t.length - (i - 1) * 16] = 128, f.set(et(f, o))), this.cbcLast(l);
        }
      }
      async function Xt(p, t, r) {
        let o = await p.mac(new Uint8Array(16));
        for (const l of t)
          o = et(J(o), await p.mac(l));
        let i;
        if (r.length >= 16)
          i = r.slice(), i.set(et(i.subarray(i.length - 16), o), i.length - 16);
        else {
          const l = new Uint8Array(16);
          l.set(r), l[r.length] = 128, i = et(J(o), l);
        }
        return p.mac(i);
      }
      function Jt(p) {
        const t = p.slice();
        return t[8] &= 127, t[12] &= 127, t;
      }
      class $t {
        constructor(t, r) {
          this.cmac = t, this.ctrKey = r;
        }
        async encrypt(t, r) {
          const o = await Xt(this.cmac, r, t), i = await a.encrypt({ name: "AES-CTR", counter: Jt(o), length: 128 }, this.ctrKey, t);
          return b(o, new Uint8Array(i));
        }
        async decrypt(t, r) {
          if (t.length < 16)
            throw new c("corrupt", "name too short");
          const o = t.subarray(0, 16), i = new Uint8Array(await a.decrypt(
            { name: "AES-CTR", counter: Jt(o), length: 128 },
            this.ctrKey,
            t.subarray(16)
          ));
          if (!A(await Xt(this.cmac, r, i), o))
            throw new c("corrupt", "name does not authenticate");
          return i;
        }
      }
      const z = 32 * 1024, ct = {
        SIV_GCM: { header: 68, nonce: 12, overhead: 28 },
        SIV_CTRMAC: { header: 88, nonce: 16, overhead: 48 }
      };
      function lt(p, t) {
        const { header: r, overhead: o } = ct[p], i = t - r;
        if (i <= 0)
          return 0;
        const l = Math.floor(i / (z + o)), f = i % (z + o);
        return l * z + Math.max(0, f - o);
      }
      const Yt = ".cryptomator-vaults-", Te = 255;
      function vt(p) {
        return n.getRandomValues(new Uint8Array(p));
      }
      function Qt() {
        return n.randomUUID();
      }
      async function bt(p) {
        return new Uint8Array(await a.digest("SHA-256", p));
      }
      function kt(p) {
        const t = String(p).normalize("NFC");
        if (t === "" || t === "." || t === ".." || /[/\\\u0000-\u001f\u007f]/.test(t) || t.length > Te)
          throw new c("invalid-name", t);
        return t;
      }
      const Zt = "vault.cryptomator";
      function Ue(p) {
        const t = p.trim().split(".");
        if (t.length !== 3)
          throw new c("unsupported-format", "vault.cryptomator is not a JWT");
        const r = (o) => JSON.parse(s.decode(h(o)));
        return { header: r(t[0]), payload: r(t[1]), signed: t[0] + "." + t[1], signature: h(t[2]) };
      }
      function I(...p) {
        return p.filter((t) => t !== "").join("/");
      }
      class Ct {
        constructor(t, r, o) {
          this.storage = t, this.config = r, this.masterkeyFile = o, this.keys = null;
        }
        /** Reads the vault's configuration and key file; checks the format before any password. */
        static async open(t) {
          let r;
          try {
            r = Ue(s.decode(await t.read(Zt)));
          } catch (w) {
            throw w instanceof c ? w : new c("unsupported-format", "vault.cryptomator unreadable: " + w.message);
          }
          const { header: o, payload: i } = r;
          if (i.format !== 8)
            throw new c("unsupported-format", "vault format " + i.format);
          if (!(i.cipherCombo in ct))
            throw new c("unsupported-format", "cipher combination " + i.cipherCombo);
          if (o.alg !== "HS256")
            throw new c("unsupported-format", "signature " + o.alg);
          const l = String(o.kid || "");
          if (!l.startsWith("masterkeyfile:"))
            throw new c("unsupported-key", l);
          const f = l.slice(14);
          if (!/^[^/\\]+$/.test(f))
            throw new c("unsupported-key", l);
          const v = JSON.parse(s.decode(await t.read(f)));
          return new Ct(t, r, v);
        }
        get scheme() {
          return this.config.payload.cipherCombo;
        }
        get unlocked() {
          return this.keys !== null;
        }
        /** Derives the keys from the password; a VaultError 'wrong-password' if it is not the vault's. */
        async unlock(t) {
          const r = this.masterkeyFile, o = await it(
            u.encode(String(t).normalize("NFC")),
            h(r.scryptSalt),
            r.scryptCostParam,
            r.scryptBlockSize,
            1,
            32
          ), i = await a.importKey("raw", o, "AES-KW", !1, ["unwrapKey"]);
          o.fill(0);
          let l, f;
          try {
            const v = async (w) => new Uint8Array(await a.exportKey(
              "raw",
              await a.unwrapKey("raw", h(w), i, "AES-KW", { name: "HMAC", hash: "SHA-256" }, !0, ["sign"])
            ));
            l = await v(r.primaryMasterKey), f = await v(r.hmacMasterKey);
          } catch {
            throw new c("wrong-password");
          }
          try {
            const v = await a.importKey("raw", b(l, f), { name: "HMAC", hash: "SHA-256" }, !1, ["verify"]);
            if (!await a.verify("HMAC", v, this.config.signature, u.encode(this.config.signed)))
              throw new c("corrupt", "vault.cryptomator is not signed with this key");
            const w = (S, x) => a.importKey("raw", S, x, !1, ["encrypt", "decrypt"]);
            this.keys = {
              gcm: await w(l, "AES-GCM"),
              ctr: await w(l, "AES-CTR"),
              mac: await a.importKey("raw", f, { name: "HMAC", hash: "SHA-256" }, !1, ["sign", "verify"])
            }, this.siv = new $t(new Gt(await w(f, "AES-CBC")), this.keys.ctr), this.dirPaths = /* @__PURE__ */ new Map();
          } finally {
            l.fill(0), f.fill(0);
          }
        }
        /** Forgets the keys; reading needs the password again. */
        lock() {
          this.keys = null, this.siv = null, this.dirPaths = null;
        }
        requireKeys() {
          if (!this.keys)
            throw new c("locked");
        }
        /** The storage folder of a directory: d/XX/YYYY… from the hash of its ID. */
        async dirPath(t) {
          if (this.requireKeys(), !this.dirPaths.has(t)) {
            const r = await this.siv.encrypt(u.encode(t), []), o = k(new Uint8Array(await a.digest("SHA-1", r)));
            this.dirPaths.set(t, I("d", o.slice(0, 2), o.slice(2)));
          }
          return this.dirPaths.get(t);
        }
        async decryptName(t, r) {
          const o = t.endsWith(".c9r") ? t.slice(0, -4) : t;
          try {
            return s.decode(await this.siv.decrypt(h(o), [u.encode(r)]));
          } catch (i) {
            throw i instanceof c ? i : new c("corrupt", "name not decryptable");
          }
        }
        /**
         * The entries of a directory (the root's ID is ''): {name, type ('file',
         * 'dir', 'link'), size (of a file, decrypted), dirId (of a directory), path
         * (in the storage), mtime (the storage's, if known)}. An entry that does not
         * decrypt is listed as type 'broken'.
         */
        async list(t) {
          const r = await this.dirPath(t), o = await this.storage.list(r);
          return (await Promise.all(o.map((l) => this.describe(r, l, t)))).filter((l) => l !== null).sort((l, f) => (f.type === "dir") - (l.type === "dir") || l.name.localeCompare(f.name));
        }
        async describe(t, r, o) {
          const i = I(t, r.name), l = await this.describeEntry(t, r, o, i);
          return l !== null && r.mtime && !l.mtime && (l.mtime = r.mtime), l;
        }
        async describeEntry(t, r, o, i) {
          try {
            if (r.name.endsWith(".c9s") && r.isDir) {
              const f = await this.decryptName(s.decode(await this.storage.read(I(i, "name.c9s"))).trim(), o), v = await this.storage.list(i), w = v.find((S) => S.name === "contents.c9r");
              return w ? { name: f, type: "file", size: lt(this.scheme, w.size), path: I(i, "contents.c9r"), mtime: w.mtime } : this.describeNode(f, i, v.map((S) => S.name));
            }
            if (r.name === "dirid.c9r" || !r.name.endsWith(".c9r"))
              return null;
            const l = await this.decryptName(r.name, o);
            return r.isDir ? this.describeNode(l, i, null) : { name: l, type: "file", size: lt(this.scheme, r.size), path: i };
          } catch (l) {
            return { name: r.name, type: "broken", error: l.message, path: i };
          }
        }
        // A folder <name>.c9r (or .c9s): a directory (dir.c9r, its ID) or a link (symlink.c9r).
        async describeNode(t, r, o) {
          const i = async (v) => {
            if (o !== null && !o.includes(v))
              return null;
            try {
              return await this.storage.read(I(r, v));
            } catch (w) {
              if (w instanceof c && w.code === "not-found")
                return null;
              throw w;
            }
          }, l = await i("dir.c9r");
          if (l !== null)
            return { name: t, type: "dir", dirId: s.decode(l).trim(), path: r };
          const f = await i("symlink.c9r");
          if (f !== null) {
            const v = s.decode(await this.decryptContents(f));
            return { name: t, type: "link", target: v, path: r };
          }
          throw new c("corrupt", "neither a directory nor a link");
        }
        /**
         * A file's decrypted contents: onProgress(done, total) after each chunk,
         * onDownload(done, total) while the storage reads it (if it reports that).
         */
        async readFile(t, r, o) {
          return this.decryptContents(await this.storage.read(t.path, o), r);
        }
        async decryptContents(t, r) {
          this.requireKeys();
          const o = ct[this.scheme];
          if (t.length === 0)
            return new Uint8Array(0);
          if (t.length < o.header)
            throw new c("corrupt", "file header too short");
          const i = t.subarray(0, o.header), l = i.subarray(0, o.nonce), f = await this.decryptHeader(i, l), v = t.subarray(o.header), w = z + o.overhead, S = new Uint8Array(lt(this.scheme, t.length));
          for (let x = 0, U = 0; U < v.length; x++, U += w) {
            const E = v.subarray(U, Math.min(U + w, v.length)), F = await this.decryptChunk(E, x, l, f);
            S.set(F, x * z), r && r(Math.min(U + w, v.length), v.length);
          }
          return S;
        }
        async decryptHeader(t, r) {
          let o;
          if (this.scheme === "SIV_GCM")
            try {
              o = new Uint8Array(await a.decrypt({ name: "AES-GCM", iv: r }, this.keys.gcm, t.subarray(12)));
            } catch {
              throw new c("corrupt", "file header does not authenticate");
            }
          else {
            const v = t.subarray(16, 56);
            if (!await a.verify("HMAC", this.keys.mac, t.subarray(56, 88), t.subarray(0, 56)))
              throw new c("corrupt", "file header does not authenticate");
            o = new Uint8Array(await a.decrypt({ name: "AES-CTR", counter: r, length: 128 }, this.keys.ctr, v));
          }
          const i = o.subarray(8, 40), l = this.scheme === "SIV_GCM" ? "AES-GCM" : "AES-CTR", f = await a.importKey("raw", i, l, !1, ["decrypt"]);
          return o.fill(0), f;
        }
        async decryptChunk(t, r, o, i) {
          try {
            if (this.scheme === "SIV_GCM") {
              const w = t.subarray(0, 12);
              return new Uint8Array(await a.decrypt(
                { name: "AES-GCM", iv: w, additionalData: b(C(r), o) },
                i,
                t.subarray(12)
              ));
            }
            const l = t.subarray(0, 16), f = t.subarray(16, t.length - 32), v = t.subarray(t.length - 32);
            if (!await a.verify("HMAC", this.keys.mac, v, b(o, C(r), l, f)))
              throw new Error("mac");
            return new Uint8Array(await a.decrypt({ name: "AES-CTR", counter: l, length: 128 }, i, f));
          } catch {
            throw new c("corrupt", "chunk " + r + " does not authenticate");
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
            throw new c("read-only");
        }
        /**
         * Where a directory's entry of this (checked) name lives: {path (its .c9r, or
         * .c9s for a long name), long, fullName (the encrypted name)}.
         */
        async entryPath(t, r) {
          const o = await this.dirPath(t), i = m(await this.siv.encrypt(u.encode(r), [u.encode(t)]), !0) + ".c9r", l = this.config.payload.shorteningThreshold ?? 220;
          if (i.length > l) {
            const f = m(new Uint8Array(await a.digest("SHA-1", u.encode(i))), !0) + ".c9s";
            return { folder: o, path: I(o, f), long: !0, fullName: i };
          }
          return { folder: o, path: I(o, i), long: !1, fullName: i };
        }
        /** What is stored at an entry's place: null, 'file', 'dir', 'link' or 'unknown'. */
        async existing(t) {
          const r = await this.storage.stat(t.path);
          if (!r)
            return null;
          if (!r.isDir)
            return "file";
          const o = (await this.storage.list(t.path)).map((i) => i.name);
          return o.includes("contents.c9r") ? "file" : o.includes("dir.c9r") ? "dir" : o.includes("symlink.c9r") ? "link" : "unknown";
        }
        /** A file's contents encrypted as Cryptomator does: a new content key, header, chunks. */
        async encryptContents(t, r) {
          this.requireKeys();
          const o = ct[this.scheme], i = this.scheme === "SIV_GCM", l = vt(o.nonce), f = vt(32), v = b(new Uint8Array(8).fill(255), f);
          let w;
          if (i)
            w = b(l, new Uint8Array(await a.encrypt({ name: "AES-GCM", iv: l }, this.keys.gcm, v)));
          else {
            const E = new Uint8Array(await a.encrypt({ name: "AES-CTR", counter: l, length: 128 }, this.keys.ctr, v)), F = new Uint8Array(await a.sign("HMAC", this.keys.mac, b(l, E)));
            w = b(l, E, F);
          }
          const S = await a.importKey("raw", f, i ? "AES-GCM" : "AES-CTR", !1, ["encrypt"]);
          v.fill(0), f.fill(0);
          const x = Math.ceil(t.length / z), U = new Uint8Array(o.header + t.length + x * o.overhead);
          U.set(w);
          for (let E = 0, F = o.header; E < x; E++) {
            const q = t.subarray(E * z, Math.min((E + 1) * z, t.length)), N = vt(o.nonce);
            let $;
            if (i)
              $ = b(N, new Uint8Array(await a.encrypt(
                { name: "AES-GCM", iv: N, additionalData: b(C(E), l) },
                S,
                q
              )));
            else {
              const ut = new Uint8Array(await a.encrypt({ name: "AES-CTR", counter: N, length: 128 }, S, q)), Me = new Uint8Array(await a.sign("HMAC", this.keys.mac, b(l, C(E), N, ut)));
              $ = b(N, ut, Me);
            }
            U.set($, F), F += $.length, r && r(E + 1, x);
          }
          return U;
        }
        /**
         * A staging name in the vault's top folder, outside d/: Cryptomator passes it
         * by, and its health checks (which look at d/) do not report one a browser
         * left behind. Moving from there is still one rename on the server.
         */
        stagingPath() {
          return Yt + Qt() + ".tmp";
        }
        /**
         * Puts an entry of several files (name -> bytes) together in a staging folder,
         * checks it (check(stagingFolder), if given) and moves it into
         * place in one step; refused if the place is taken meanwhile. The staging
         * folder goes on any failure.
         */
        async stageAndMove(t, r, o) {
          const i = this.stagingPath();
          await this.storage.mkdir(i);
          try {
            for (const [l, f] of Object.entries(r))
              await this.storage.write(I(i, l), f, { create: !0 });
            o && await o(i), await this.storage.move(i, t.path);
          } catch (l) {
            throw await this.storage.remove(i).catch(() => {
            }), l;
          }
        }
        /** Reads a stored file back and compares it with what was written. */
        async checkStored(t, r, o) {
          const i = await this.storage.read(t, o);
          let l;
          try {
            l = await this.decryptContents(i);
          } catch (f) {
            throw new c("corrupt", "the stored file does not decrypt: " + f.message);
          }
          if (!A(await bt(l), r))
            throw new c("corrupt", "the stored file differs from the one written");
        }
        /**
         * Writes a file into a directory. options.replace allows replacing a file of
         * that name (never a folder); onProgress(phase, done, total) with the phases
         * 'encrypt', 'upload' and 'verify'. Returns {name, path, size}.
         */
        async writeFile(t, r, o, i = {}) {
          this.requireWritable();
          const { replace: l = !1, onProgress: f } = i, v = (N) => ($, ut) => f?.(N, $, ut), w = kt(r), S = await this.entryPath(t, w), x = await this.existing(S);
          if (x !== null && (x !== "file" || !l))
            throw new c(x === "file" ? "exists" : "exists-other", w);
          const U = await bt(o), E = await this.encryptContents(o, v("encrypt"));
          if (!A(await bt(await this.decryptContents(E)), U))
            throw new c("corrupt", "the encryption does not read back");
          const F = S.long ? I(S.path, "contents.c9r") : S.path;
          if (S.long && x === null)
            return await this.stageAndMove(
              S,
              { "name.c9s": u.encode(S.fullName), "contents.c9r": E },
              (N) => this.checkStored(I(N, "contents.c9r"), U, v("verify"))
            ), { name: w, path: F, size: o.length };
          const q = this.stagingPath();
          try {
            await this.storage.write(q, E, { create: !0, onProgress: v("upload") }), await this.checkStored(q, U, v("verify")), await this.storage.move(q, F, { overwrite: x !== null });
          } catch (N) {
            throw await this.storage.remove(q).catch(() => {
            }), N;
          }
          return { name: w, path: F, size: o.length };
        }
        /** Creates a folder in a directory. Returns {name, dirId}. */
        async createDirectory(t, r) {
          this.requireWritable();
          const o = kt(r), i = await this.entryPath(t, o);
          if (await this.existing(i) !== null)
            throw new c("exists-other", o);
          const l = Qt(), f = await this.dirPath(l);
          await this.storage.mkdir(f.split("/").slice(0, 2).join("/"), { existsOk: !0 }), await this.storage.mkdir(f);
          try {
            await this.storage.write(I(f, "dirid.c9r"), await this.encryptContents(u.encode(l)), { create: !0 });
            const w = { "dir.c9r": u.encode(l) };
            i.long && (w["name.c9s"] = u.encode(i.fullName)), await this.stageAndMove(i, w);
          } catch (w) {
            throw await this.storage.remove(f).catch(() => {
            }), w;
          }
          const v = (await this.list(t)).find((w) => w.type === "dir" && w.dirId === l);
          if (!v || v.name !== o)
            throw new c("corrupt", "the new folder does not read back");
          return { name: o, dirId: l };
        }
      }
      return { Vault: Ct, VaultError: c, cleartextSize: lt, checkName: kt, scrypt: it, Siv: $t, Cmac: Gt, base32Encode: k, base64UrlEncode: m, base64Decode: h, VAULT_CONFIG: Zt, STAGING_PREFIX: Yt };
    });
  })(dt)), dt.exports;
}
var qe = Be();
const pe = /* @__PURE__ */ De(qe), We = "cryptomator_vaults";
function d(e, n) {
  return Ie(We, e, n, void 0, { escape: !1 });
}
const je = 100 * 1024 * 1024, Ge = 5 * 1024 * 1024, Tt = 1024 * 1024 * 1024, Ut = /* @__PURE__ */ new Set();
function y(e, n, a) {
  const u = document.createElement(e);
  for (const [s, c] of Object.entries(n || {}))
    c == null || c === !1 || (s === "class" ? u.className = c : s.startsWith("on") ? u.addEventListener(s.slice(2), c) : u.setAttribute(s, c === !0 ? "" : c));
  for (const s of [].concat(a ?? []))
    s != null && s !== !1 && u.append(s instanceof Node ? s : document.createTextNode(String(s)));
  return u;
}
function Mt(e) {
  if (window.OC?.Util?.humanFileSize)
    return window.OC.Util.humanFileSize(e);
  const n = ["B", "KB", "MB", "GB", "TB"];
  let a = e, u = 0;
  for (; a >= 1024 && u < n.length - 1; )
    a /= 1024, u++;
  return (u === 0 ? a : a.toFixed(1)) + " " + n[u];
}
function nt(e, n) {
  const a = URL.createObjectURL(new Blob([e], { type: n }));
  return Ut.add(a), a;
}
function Xe() {
  for (const e of Ut)
    URL.revokeObjectURL(e);
  Ut.clear(), V();
}
function he(e, n) {
  const a = y("a", { href: nt(n, "application/octet-stream"), download: e });
  document.body.append(a), a.click(), a.remove();
}
let Q = null;
function V() {
  if (Q) {
    const { dialog: e, onClose: n } = Q;
    Q = null, e.remove(), n?.();
  }
}
function wt(e, n, a) {
  V();
  const u = y("div", {
    class: "cryptomator-dialog",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": e,
    onkeydown: (s) => {
      s.key === "Escape" && V();
    },
    onclick: (s) => {
      s.target === u && V();
    }
  }, y("div", { class: "cryptomator-dialog__panel" }, n));
  return Q = { dialog: u, onClose: a }, document.body.append(u), u;
}
function M(e, n) {
  return y("p", { class: "cryptomator-notice" + (n ? " cryptomator-notice--" + n : ""), role: n === "error" ? "alert" : null }, e);
}
function Je(e, n) {
  return new Promise((a) => {
    let u = !1;
    const s = y("input", { type: "password", name: "password", autocomplete: "current-password", required: !0, "aria-label": d("Password") }), c = y("div", { "aria-live": "polite" }), h = y("button", { type: "submit", class: "primary" }, d("Unlock"));
    wt(e, [
      y("h2", {}, d("Unlock {vault}", { vault: e })),
      M(d("The password and the vault's keys stay in this browser tab: the server only sends the encrypted files.")),
      y("form", {
        class: "cryptomator-unlock",
        onsubmit: async (m) => {
          m.preventDefault(), h.disabled = !0, c.replaceChildren(M(d("Unlocking …"))), await new Promise((g) => setTimeout(g, 30));
          try {
            await n(s.value), s.value = "", u = !0, V(), a(!0);
          } catch (g) {
            h.disabled = !1, c.replaceChildren(M(g.message, "error")), s.select();
          }
        }
      }, [
        y("label", {}, [d("Password"), s]),
        h,
        y("button", { type: "button", onclick: V }, d("Cancel"))
      ]),
      c
    ], () => {
      s.value = "", u || a(!1);
    }), s.focus();
  });
}
const $e = ["png", "jpg", "jpeg", "gif", "webp", "avif", "bmp", "svg"], ee = { mp4: "video/mp4", m4v: "video/mp4", webm: "video/webm", mov: "video/quicktime", ogv: "video/ogg" }, ne = { mp3: "audio/mpeg", m4a: "audio/mp4", ogg: "audio/ogg", oga: "audio/ogg", opus: "audio/ogg", wav: "audio/wav", flac: "audio/flac" }, Ye = [
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
function Qe(e) {
  const n = (/\.([^.]+)$/.exec(e)?.[1] ?? "").toLowerCase();
  return $e.includes(n) ? { kind: "image", type: n === "svg" ? "image/svg+xml" : "image/" + (n === "jpg" ? "jpeg" : n) } : n === "pdf" ? { kind: "pdf", type: "application/pdf" } : n in ee ? { kind: "video", type: ee[n] } : n in ne ? { kind: "audio", type: ne[n] } : Ye.includes(n) ? { kind: "text", type: "text/plain" } : { kind: "none" };
}
function Ze(e, n, a) {
  switch (e.kind) {
    case "image":
      return y("img", { class: "cryptomator-preview", src: nt(n, e.type), alt: a });
    case "pdf":
      return y("iframe", { class: "cryptomator-preview cryptomator-preview--frame", src: nt(n, e.type), title: a });
    case "video":
      return y("video", { class: "cryptomator-preview", src: nt(n, e.type), controls: !0 });
    case "audio":
      return y("audio", { class: "cryptomator-preview", src: nt(n, e.type), controls: !0 });
    case "text":
      return y("pre", { class: "cryptomator-preview cryptomator-preview--text" }, new TextDecoder("utf-8").decode(n));
    default:
      return M(d("No preview for this file. Download it to open it."));
  }
}
async function tn(e, n, a, u) {
  const s = Qe(e), c = s.kind !== "none" && n <= (s.kind === "text" ? Ge : je);
  if (!c && n > Tt && !window.confirm(d("This file is {size}. Your browser holds it twice while decrypting. Continue?", { size: Mt(n) })))
    return;
  const h = y("progress", { max: 1, value: 0 }), m = y("div", { class: "cryptomator-dialog__body" }, [M(d("Decrypting …")), h]), g = y("button", { type: "button", disabled: !0 }, d("Download")), k = wt(e, [
    y("div", { class: "cryptomator-dialog__head" }, [
      y("h2", {}, e),
      y("span", { class: "cryptomator-dialog__meta" }, Mt(n)),
      g,
      y("button", { type: "button", class: "cryptomator-dialog__close", onclick: V }, d("Close"))
    ]),
    m
  ]);
  k.querySelector(".cryptomator-dialog__close").focus();
  try {
    const b = await a((C, A) => {
      h.value = 0.5 + C / A / 2;
    }, (C, A) => {
      h.value = C / A / 2;
    });
    if (Q?.dialog !== k)
      return;
    g.disabled = !1, g.addEventListener("click", () => he(e, b)), m.replaceChildren(c ? Ze(s, b, e) : M(d("No preview for this file. Download it to open it.")));
  } catch (b) {
    Q?.dialog === k && m.replaceChildren(M(u(b), "error"));
  }
}
function en(e, n, a) {
  return new Promise((u) => {
    let s = !1;
    const c = y("input", { type: "text", required: !0, "aria-label": n, autocomplete: "off" }), h = y("div", { "aria-live": "polite" });
    wt(e, [
      y("h2", {}, e),
      y("form", {
        class: "cryptomator-unlock",
        onsubmit: (m) => {
          m.preventDefault();
          const g = a(c.value);
          if (g) {
            h.replaceChildren(M(g, "error"));
            return;
          }
          s = !0;
          const k = c.value;
          V(), u(k);
        }
      }, [
        y("label", {}, [n, c]),
        y("button", { type: "submit", class: "primary" }, d("Create")),
        y("button", { type: "button", onclick: V }, d("Cancel"))
      ]),
      h
    ], () => {
      s || u(null);
    }), c.focus();
  });
}
function nn(e) {
  const n = y("ul", { class: "cryptomator-uploads" }), a = y("progress", { max: 1, value: 0 }), u = y("div", { "aria-live": "polite" }), s = y("div", { class: "cryptomator-question", hidden: !0 });
  let c = !1;
  const h = y("button", { type: "button", onclick: () => {
    c = !0, h.disabled = !0, h.textContent = d("Stopping after this file …");
  } }, d("Stop")), m = y("button", { type: "button", class: "primary", hidden: !0, onclick: V }, d("Close"));
  return wt(e, [
    y("div", { class: "cryptomator-dialog__head" }, [y("h2", {}, e), h, m]),
    a,
    s,
    y("div", { class: "cryptomator-dialog__body" }, n),
    u
  ]), {
    get stopped() {
      return c;
    },
    file(g) {
      const k = y("span", { class: "cryptomator-dialog__meta" }, d("Waiting")), b = y("progress", { max: 1, value: 0 });
      return n.append(y("li", {}, [y("span", { class: "cryptomator-uploads__name" }, g), k, b])), {
        phase(C, A) {
          k.textContent = C, b.value = A;
        },
        done(C, A) {
          k.textContent = C, k.classList.toggle("cryptomator-notice--error", !!A), b.value = 1;
        }
      };
    },
    /** What to do with a taken name: 'replace', 'skip', 'replace-all', 'skip-all' or 'cancel'. */
    ask(g, k) {
      return new Promise((b) => {
        const C = (A) => () => {
          s.hidden = !0, s.replaceChildren(), b(A);
        };
        s.replaceChildren(
          y("h3", {}, d("“{name}” already exists", { name: g })),
          M(d("Replace the file in the vault with the one you chose? The vault keeps no copy of the old one; Nextcloud's versions keep its encrypted file.")),
          y("div", { class: "cryptomator-choices" }, [
            y("button", { type: "button", class: "primary", onclick: C("replace") }, d("Replace")),
            y("button", { type: "button", onclick: C("skip") }, d("Skip")),
            k > 1 ? y("button", { type: "button", onclick: C("replace-all") }, d("Replace all")) : null,
            k > 1 ? y("button", { type: "button", onclick: C("skip-all") }, d("Skip all")) : null,
            y("button", { type: "button", onclick: C("cancel") }, d("Cancel upload"))
          ])
        ), s.hidden = !1, s.querySelector("button").focus();
      });
    },
    progress(g) {
      a.value = g;
    },
    finish(g, k) {
      a.value = 1, h.hidden = !0, m.hidden = !1, u.replaceChildren(M(g, k ? "error" : void 0)), m.focus();
    }
  };
}
const { VaultError: L } = pe, At = "DAV:", rn = 20 * 1024 * 1024, re = 10 * 1024 * 1024;
function an() {
  return window.OC && window.OC.requestToken || document.head.dataset.requesttoken || "";
}
function H(e) {
  return { requesttoken: an(), "X-Requested-With": "XMLHttpRequest", ...e || {} };
}
function Z() {
  return Ne()?.uid ?? "";
}
function pt(e) {
  return e.split("/").filter((n) => n !== "").map(encodeURIComponent).join("/");
}
function on(e) {
  const n = pt(e);
  return Nt("dav") + "/files/" + encodeURIComponent(Z()) + "/" + (n ? n + "/" : "");
}
function Dt(e) {
  const n = new DOMParser().parseFromString(e, "application/xml");
  return Array.from(n.getElementsByTagNameNS(At, "response")).map((a) => {
    const u = (h) => a.getElementsByTagNameNS(At, h)[0], s = u("getcontentlength"), c = u("getlastmodified");
    return {
      href: u("href").textContent,
      isDir: a.getElementsByTagNameNS(At, "collection").length > 0,
      size: s ? Number(s.textContent) : 0,
      mtime: c ? new Date(c.textContent) : void 0
    };
  });
}
function sn(e) {
  const n = e.replace(/\/+$/, "").split("/");
  return decodeURIComponent(n[n.length - 1]);
}
function Y(e, n) {
  return e === 404 ? new L("not-found", n) : e === 412 || e === 405 ? new L("exists", n) : e === 507 ? new L("quota", n) : new L("network", "HTTP " + e);
}
function ae(e, n, a, u, s) {
  return new Promise((c, h) => {
    const m = new XMLHttpRequest();
    m.open(e, n);
    for (const [g, k] of Object.entries(H(a)))
      m.setRequestHeader(g, k);
    s && m.upload.addEventListener("progress", (g) => s(g.loaded, g.total)), m.addEventListener("load", () => c(m.status)), m.addEventListener("error", () => h(new L("network", e + " failed"))), m.addEventListener("abort", () => h(new L("network", e + " aborted"))), m.send(u ?? null);
  });
}
async function St(e, n, a, u, s) {
  const c = await fetch(n, { method: e, headers: H(a), credentials: "same-origin" });
  if (!s.includes(c.status))
    throw Y(c.status, u);
  return c;
}
function fe(e) {
  const n = on(e), a = (s) => n + pt(s);
  async function u(s, c, h, m) {
    const g = Nt("dav") + "/uploads/" + encodeURIComponent(Z()) + "/cryptomator-vaults-" + crypto.randomUUID(), k = new URL(a(s), window.location.href).href, b = { Destination: k, "OC-Total-Length": String(c.length) };
    await St("MKCOL", g, { Destination: k }, s, [201]);
    try {
      for (let A = 0, T = 1; A < c.length; A += re, T++) {
        const _ = c.subarray(A, Math.min(A + re, c.length)), P = await ae(
          "PUT",
          g + "/" + String(T).padStart(5, "0"),
          b,
          _,
          (X) => m?.(A + X, c.length)
        );
        if (P !== 201 && P !== 204)
          throw Y(P, s);
      }
      const C = await fetch(g + "/.file", {
        method: "MOVE",
        headers: H({ ...b, Overwrite: h ? "F" : "T" }),
        credentials: "same-origin"
      });
      if (![201, 204].includes(C.status))
        throw Y(C.status, s);
    } catch (C) {
      throw await fetch(g, { method: "DELETE", headers: H(), credentials: "same-origin" }).catch(() => {
      }), C;
    }
  }
  return {
    async read(s, c) {
      const h = await fetch(n + pt(s), { headers: H(), credentials: "same-origin" });
      if (h.status === 404)
        throw new L("not-found", s);
      if (!h.ok)
        throw new L("network", "HTTP " + h.status);
      const m = Number(h.headers.get("Content-Length")) || 0;
      if (!c || !h.body || m === 0)
        return new Uint8Array(await h.arrayBuffer());
      const g = new Uint8Array(m), k = h.body.getReader();
      let b = 0;
      for (; ; ) {
        const { done: C, value: A } = await k.read();
        if (C)
          break;
        g.set(A, b), b += A.length, c(b, m);
      }
      return g.subarray(0, b);
    },
    async stat(s) {
      const c = await fetch(a(s), {
        method: "PROPFIND",
        headers: H({ Depth: "0", "Content-Type": "application/xml; charset=utf-8" }),
        credentials: "same-origin",
        body: '<?xml version="1.0"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/></d:prop></d:propfind>'
      });
      if (c.status === 404)
        return null;
      if (c.status !== 207)
        throw Y(c.status, s);
      const [h] = Dt(await c.text());
      return { isDir: h.isDir, size: h.size };
    },
    /** Stores a file whole; create: refused (VaultError 'exists') if the name is taken. */
    async write(s, c, { create: h = !1, onProgress: m } = {}) {
      if (c.length >= rn)
        return u(s, c, h, m);
      const g = await ae("PUT", a(s), h ? { "If-None-Match": "*" } : {}, c, m);
      if (g !== 201 && g !== 204)
        throw Y(g, s);
    },
    async mkdir(s, { existsOk: c = !1 } = {}) {
      const h = await fetch(a(s), { method: "MKCOL", headers: H(), credentials: "same-origin" });
      if (!(h.status === 201 || h.status === 405 && c))
        throw Y(h.status, s);
    },
    /** Moves in one step; refused (VaultError 'exists') if the target is taken, unless overwrite. */
    async move(s, c, { overwrite: h = !1 } = {}) {
      await St("MOVE", a(s), { Destination: new URL(a(c), window.location.href).href, Overwrite: h ? "T" : "F" }, c, [201, 204]);
    },
    async remove(s) {
      await St("DELETE", a(s), {}, s, [204, 404]);
    },
    async list(s) {
      const c = await fetch(n + (s ? pt(s) + "/" : ""), {
        method: "PROPFIND",
        headers: H({ Depth: "1", "Content-Type": "application/xml; charset=utf-8" }),
        credentials: "same-origin",
        body: '<?xml version="1.0"?><d:propfind xmlns:d="DAV:"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/></d:prop></d:propfind>'
      });
      if (c.status === 404)
        throw new L("not-found", s);
      if (!c.ok)
        throw new L("network", "HTTP " + c.status);
      return Dt(await c.text()).slice(1).map((h) => ({ name: sn(h.href), isDir: h.isDir, size: h.size, mtime: h.mtime }));
    }
  };
}
async function cn() {
  const e = Z(), n = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;"), a = await fetch(Nt("dav") + "/", {
    method: "SEARCH",
    headers: H({ "Content-Type": "text/xml; charset=utf-8" }),
    credentials: "same-origin",
    body: '<?xml version="1.0" encoding="UTF-8"?><d:searchrequest xmlns:d="DAV:"><d:basicsearch><d:select><d:prop><d:displayname/></d:prop></d:select><d:from><d:scope><d:href>/files/' + n(e) + "</d:href><d:depth>infinity</d:depth></d:scope></d:from><d:where><d:like><d:prop><d:displayname/></d:prop><d:literal>vault.cryptomator</d:literal></d:like></d:where></d:basicsearch></d:searchrequest>"
  });
  if (!a.ok)
    throw new Error("HTTP " + a.status);
  const u = "/files/" + e + "/";
  return Dt(await a.text()).map((s) => decodeURIComponent(s.href)).filter((s) => s.endsWith("/vault.cryptomator") && s.includes(u)).map((s) => "/" + s.slice(s.indexOf(u) + u.length, -18)).map((s) => s.replace(/\/+$/, "") || "/").sort((s, c) => s.localeCompare(c));
}
const { Vault: ye, checkName: ln } = pe;
let xt = null;
function Vt() {
  return xt || (document.head.append(y("link", { rel: "stylesheet", href: ze("cryptomator_vaults", "css", "cryptomator_vaults-files.css") })), xt = import("./cryptomator_vaults-dialogs.mjs")), xt;
}
function R(e) {
  Vt().then(({ showError: n }) => n(e));
}
function _t(e) {
  Vt().then(({ showInfo: n }) => n(e));
}
const Ft = "cryptomator-vaults", mt = "/cryptomator-vaults", Lt = window.location.origin + "/apps/cryptomator_vaults" + mt, un = Oe("cryptomator_vaults", "file.svg"), oe = 15, we = "cryptomator_vaults.added", Rt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 3h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-1v1h-3v-1H8v1H5v-1H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v13h16V5zm8 2.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5.5 8h1.5v7H5.5z"/></svg>', dn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 8a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/></svg>', pn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>', me = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9V6zm9 14H6V10h12v10z"/></svg>', hn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>', fn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"/></svg>', yn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2zm5 9h-2v2h-2v-2H9v-2h2V9h2v2h2v2z"/></svg>', D = /* @__PURE__ */ new Map();
let Et = null, at = null, O = { kind: "vaults" };
async function It(e, n) {
  const a = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(e)));
  return Array.from(a, (u) => u.toString(16).padStart(2, "0")).join("").slice(0, n);
}
const wn = "r000000000001";
function ge(e) {
  return -parseInt(e.slice(1, 13), 16);
}
function ve() {
  try {
    const e = JSON.parse(window.localStorage.getItem(we) || "[]");
    return Array.isArray(e) ? e.filter((n) => typeof n == "string") : [];
  } catch {
    return [];
  }
}
function mn(e) {
  try {
    window.localStorage.setItem(we, JSON.stringify([.../* @__PURE__ */ new Set([e, ...ve()])]));
  } catch {
  }
}
function gn(e) {
  return e.split("/").filter(Boolean).pop() || d("All files");
}
async function be(e) {
  const n = "v" + await It("vault:" + e, 12);
  return D.has(n) || D.set(n, { seg: n, folder: e, name: gn(e), vault: null, dirs: /* @__PURE__ */ new Map(), entries: /* @__PURE__ */ new Map(), nodes: /* @__PURE__ */ new Set() }), D.get(n);
}
function Ht() {
  return Et || (Et = (async () => {
    let e = [];
    try {
      e = await cn();
    } catch (n) {
      R(d("The search for vaults failed: {detail}", { detail: n.message }));
    }
    for (const n of [.../* @__PURE__ */ new Set([...e, ...ve()])])
      await be(n);
  })()), Et;
}
function j(e, n, a, u, s = !0) {
  const c = e.split("/").filter(Boolean).pop() || wn, h = new ue({
    id: ge(c),
    source: Lt + e,
    root: mt,
    owner: Z(),
    displayname: n,
    permissions: Ot.READ,
    mtime: u?.mtime,
    attributes: { cryptomatorVault: a?.seg ?? null, ...u?.attributes }
  });
  return s && a?.nodes.add(h), h;
}
function vn(e, n, a) {
  const u = e.split("/").pop(), s = new Pe({
    id: ge(u),
    source: Lt + e,
    root: mt,
    owner: Z(),
    displayname: n.name,
    mime: "application/octet-stream",
    size: n.size ?? 0,
    mtime: n.mtime,
    permissions: Ot.READ,
    attributes: { "has-preview": !0, previewUrl: un, cryptomatorVault: a.seg, cryptomatorType: n.type }
  });
  return a.nodes.add(s), s;
}
function K(e) {
  switch (e?.code) {
    case "exists":
    case "exists-other":
      return d("“{name}” already exists in this folder.", { name: e.message });
    case "invalid-name":
      return d("“{name}” cannot be a name in a vault.", { name: e.message });
    case "quota":
      return d("Your storage is full.");
    case "read-only":
      return d("This vault cannot be written to.");
    case "wrong-password":
      return d("Wrong password.");
    case "unsupported-format":
      return d("This vault has a format the app cannot read (only vault format 8, Cryptomator 1.6 and later).");
    case "unsupported-key":
      return d("This vault keeps its key on a Cryptomator Hub, which the app does not support.");
    case "not-found":
      return d("There is no Cryptomator vault in this folder.");
    case "corrupt":
      return d("The vault is damaged: {detail}", { detail: e.message });
    case "locked":
      return d("The vault is locked.");
    default:
      return d("Something went wrong: {detail}", { detail: e?.message || String(e) });
  }
}
function ot(e) {
  window.OCP.Files.Router.goToRoute(null, { view: Ft }, { dir: e });
}
function Pt() {
  return window.OCP?.Files?.Router?.query?.dir || "/";
}
async function ke(e) {
  if (e.vault?.unlocked)
    return !0;
  try {
    e.vault = e.vault || await ye.open(fe(e.folder));
  } catch (a) {
    return R(K(a)), !1;
  }
  const n = await Je(e.name, async (a) => {
    try {
      await e.vault.unlock(a);
    } catch (u) {
      throw new Error(K(u));
    }
  });
  return n && Ce(), n;
}
async function se() {
  O = { kind: "vaults" };
  const e = j("/", d("Vaults"), null), n = [...D.values()].sort((a, u) => a.name.localeCompare(u.name)).map((a) => j("/" + a.seg, a.name, a, { attributes: { cryptomatorVaultRoot: !0, cryptomatorFolder: a.folder } }, !1));
  return { folder: e, contents: n };
}
const zt = window.isSecureContext && !!window.crypto?.subtle;
async function bn(e) {
  if (jt(), !zt)
    return O = { kind: "insecure" }, { folder: new ue({ id: -1, source: Lt + "/", root: mt, owner: Z(), permissions: Ot.READ }), contents: [] };
  await Ht();
  const n = e.split("/").filter(Boolean);
  if (n.length === 0)
    return se();
  const a = D.get(n[0]);
  if (!a)
    return ot("/"), se();
  if (!a.vault?.unlocked && !await ke(a))
    return O = { kind: "locked", vault: a }, { folder: j(e, a.name, a, { attributes: { cryptomatorVaultRoot: n.length === 1 } }, !1), contents: [] };
  let u = "", s = a.name;
  if (n.length > 1) {
    const m = a.dirs.get(n[n.length - 1]);
    if (!m)
      return ot("/" + a.seg), { folder: j(e, a.name, a), contents: [] };
    u = m.dirId, s = m.name;
  }
  const c = await a.vault.list(u), h = [];
  for (const m of c)
    if (m.type === "dir") {
      const g = "d" + await It(a.seg + ":dir:" + m.dirId, 12);
      a.dirs.set(g, { dirId: m.dirId, name: m.name }), h.push(j(e + "/" + g, m.name, a, { mtime: m.mtime }));
    } else {
      const g = "f" + await It(a.seg + ":file:" + m.path, 12);
      a.entries.set(g, m), h.push(vn(e + "/" + g, m, a));
    }
  return O = { kind: "folder", vault: a, dirId: u, path: e }, { folder: j(e, s, a, void 0, n.length > 1), contents: h };
}
function kn(e) {
  if (e.replaceChildren(), e.classList.add("cryptomator-empty"), O.kind === "insecure")
    e.append(M(d("Vaults can only be opened over HTTPS: the browser provides its encryption only there."), "error"));
  else if (O.kind === "locked") {
    const n = O.vault;
    e.append(
      y("h2", {}, d("{vault} is locked", { vault: n.name })),
      M(d("Its files are decrypted in this browser tab once you enter its password.")),
      y("button", {
        type: "button",
        class: "primary",
        onclick: async () => {
          await ke(n) && Kt(n.name);
        }
      }, d("Unlock"))
    );
  } else O.kind === "folder" ? e.append(y("h2", {}, d("This folder is empty."))) : e.append(
    y("h2", {}, d("No vaults found")),
    M(d("Vaults in your files appear here. Open a vault's folder to add one.")),
    y("button", { type: "button", class: "primary", onclick: Ae }, d("Open a vault folder …"))
  );
}
function Kt(e) {
  de("files:node:updated", j(Pt(), e, null));
}
function Bt(e) {
  if (e.vault?.unlocked) {
    if (rt && O.vault === e) {
      _t(d("The vault locks when the upload has finished."));
      const n = setInterval(() => {
        rt || (clearInterval(n), Bt(e));
      }, 500);
      return;
    }
    e.vault.lock();
    for (const n of e.nodes)
      de("files:node:deleted", n);
    e.nodes.clear(), e.dirs.clear(), e.entries.clear(), Xe(), Pt().startsWith("/" + e.seg) && ot("/"), [...D.values()].some((n) => n.vault?.unlocked) || (clearTimeout(at), at = null);
  }
}
function qt(e) {
  let n = !1;
  for (const a of D.values())
    a.vault?.unlocked && (Bt(a), n = !0);
  n && e && _t(e);
}
function Ce() {
  clearTimeout(at), at = setTimeout(
    () => qt(d("Locked after {minutes} minutes without use.", { minutes: oe })),
    oe * 60 * 1e3
  );
}
function Cn() {
  at !== null && Ce();
}
async function Wt(e) {
  try {
    await ye.open(fe(e));
  } catch (a) {
    R(K(a));
    return;
  }
  mn(e), await Ht();
  const n = await be(e);
  ot("/" + n.seg);
}
async function Ae() {
  let e;
  try {
    const { getFilePickerBuilder: a } = await Vt();
    e = await a(d("Choose a vault")).setMultiSelect(!1).allowDirectories(!0).setFilter((u) => u.type === G.Folder || u.basename === "vault.cryptomator").addButton({ label: d("Open vault"), variant: "primary", callback: () => {
    } }).build().pick();
  } catch {
    return;
  }
  const n = "/" + String(e).replace(/^\/+|\/+$/g, "");
  await Wt(n.endsWith("/vault.cryptomator") ? n.slice(0, -18) || "/" : n);
}
function B(e) {
  return e?.id === Ft;
}
const An = /* @__PURE__ */ new Set(["cryptomator-vaults-open", "cryptomator-vaults-download", "cryptomator-vaults-lock", "cryptomator-vaults-open-vault"]), ie = /* @__PURE__ */ new WeakSet();
let ce = 0;
function jt() {
  const e = He();
  if (e.length !== ce) {
    ce = e.length;
    for (const n of e) {
      if (An.has(n.id) || ie.has(n))
        continue;
      const a = n.enabled;
      try {
        Object.defineProperty(n, "enabled", {
          configurable: !0,
          enumerable: !0,
          writable: !0,
          value: (u) => !B(u?.view) && (a ? a.call(n, u) : !0)
        }), ie.add(n);
      } catch {
      }
    }
  }
}
function Se(e) {
  const n = D.get(e.attributes?.cryptomatorVault), a = n?.entries.get(e.basename);
  return { vault: n, entry: a };
}
ft({
  id: "cryptomator-vaults-open",
  displayName: ({ nodes: e }) => e[0]?.type === G.Folder ? d("Open") : d("View"),
  iconSvgInline: () => dn,
  enabled: ({ nodes: e, view: n }) => (jt(), B(n) && e.length === 1),
  async exec({ nodes: e }) {
    const n = e[0];
    if (n.type === G.Folder)
      return ot(n.path), null;
    const { vault: a, entry: u } = Se(n);
    return !a?.vault?.unlocked || !u ? (R(d("The vault is locked.")), null) : (u.type === "link" ? _t(d("A link to {target}", { target: u.target })) : u.type === "broken" ? R(d("This entry cannot be read: {detail}", { detail: u.error })) : await tn(u.name, u.size, (s, c) => a.vault.readFile(u, s, c), K), null);
  },
  default: Ve.DEFAULT,
  order: -1e3
});
async function le(e) {
  const { vault: n, entry: a } = Se(e);
  if (!n?.vault?.unlocked || !a)
    return R(d("The vault is locked.")), null;
  try {
    he(a.name, await n.vault.readFile(a));
  } catch (u) {
    R(K(u));
  }
  return null;
}
ft({
  id: "cryptomator-vaults-download",
  displayName: () => d("Download"),
  iconSvgInline: () => pn,
  enabled: ({ nodes: e, view: n }) => B(n) && e.length > 0 && e.every((a) => a.type === G.File && a.attributes?.cryptomatorType === "file"),
  exec: ({ nodes: e }) => le(e[0]),
  async execBatch({ nodes: e }) {
    const n = [];
    for (const a of e)
      n.push(await le(a));
    return n;
  },
  order: -900
});
ft({
  id: "cryptomator-vaults-lock",
  displayName: () => d("Lock"),
  iconSvgInline: () => me,
  enabled: ({ nodes: e, view: n }) => B(n) && e.length === 1 && e[0].attributes?.cryptomatorVaultRoot === !0 && D.get(e[0].attributes.cryptomatorVault)?.vault?.unlocked === !0,
  async exec({ nodes: e }) {
    return Bt(D.get(e[0].attributes.cryptomatorVault)), null;
  },
  order: -800
});
ft({
  id: "cryptomator-vaults-open-vault",
  displayName: () => d("Open vault"),
  iconSvgInline: () => Rt,
  enabled: ({ nodes: e, view: n }) => n?.id === "files" && e.length === 1 && e[0].root?.startsWith("/files/") && (e[0].basename === "vault.cryptomator" || e[0].type === G.Folder && [...D.values()].some((a) => a.folder === e[0].path)),
  async exec({ nodes: e }) {
    const n = e[0];
    return await Wt(n.type === G.Folder ? n.path : n.dirname), null;
  },
  order: 50
});
const xe = /* @__PURE__ */ new Set();
let W = null;
function Sn(e) {
  return xe.has(e) || [...D.values()].some((n) => n.folder === e);
}
function ht(e) {
  if (!W)
    return;
  W.folder = e;
  const n = e?.path;
  if (!n || !Sn(n)) {
    W.el.replaceChildren();
    return;
  }
  W.el.replaceChildren(y("div", { class: "cryptomator-banner", role: "note" }, [
    y("span", { class: "cryptomator-banner__icon", "aria-hidden": "true" }),
    y(
      "span",
      { class: "cryptomator-banner__text" },
      d("This folder is a Cryptomator vault: its files are encrypted. Open it to see them, decrypted in this browser.")
    ),
    y("button", { type: "button", class: "primary", onclick: () => Wt(n) }, d("Open vault"))
  ])), W.el.querySelector(".cryptomator-banner__icon").innerHTML = Rt;
}
_e({
  id: "cryptomator-vaults-banner",
  order: 5,
  enabled: (e, n) => zt && n?.id === "files",
  render(e, n) {
    W = { el: e, folder: n }, ht(n);
  },
  updated(e) {
    ht(e);
  }
});
Fe("files:list:updated", ({ view: e, folder: n, contents: a }) => {
  e?.id !== "files" || !n?.path || ((a || []).some((u) => u.type === G.File && u.basename === "vault.cryptomator") && xe.add(n.path), ht(n));
});
function tt() {
  const e = O.kind === "folder" ? O : null;
  return e?.vault?.vault?.unlocked && Pt() === e.path ? e : null;
}
let rt = !1;
async function Ee(e) {
  const n = tt();
  if (!n || e.length === 0)
    return;
  if (rt) {
    R(d("An upload is still running."));
    return;
  }
  const a = e.filter((g) => g.size > Tt);
  if (a.length > 0 && !window.confirm(d("{count} of the files are larger than {size}. Your browser holds each twice while encrypting. Continue?", { count: a.length, size: Mt(Tt) })))
    return;
  rt = !0;
  const { vault: u } = n.vault, s = nn(d("Uploading to {vault}", { vault: n.vault.name }));
  let c = null, h = 0;
  const m = [];
  try {
    for (const [g, k] of e.entries()) {
      const b = s.file(k.name);
      if (s.stopped) {
        b.done(d("Not uploaded"));
        continue;
      }
      let C = c === "replace-all";
      const A = async () => {
        const T = new Uint8Array(await k.arrayBuffer()), _ = { encrypt: d("Encrypting"), upload: d("Uploading"), verify: d("Checking") }, P = { encrypt: [0, 0.2], upload: [0.2, 0.6], verify: [0.8, 0.2] };
        await u.writeFile(n.dirId, k.name, T, {
          replace: C,
          onProgress: (X, gt, st) => {
            const [it, J] = P[X];
            b.phase(_[X], it + J * (st ? gt / st : 1));
          }
        });
      };
      try {
        try {
          await A();
        } catch (T) {
          if (T?.code !== "exists" || c === "skip-all")
            throw T;
          const _ = c === "replace-all" ? "replace" : await s.ask(k.name, e.length);
          if (_ === "cancel") {
            b.done(d("Not uploaded"));
            break;
          }
          if (_.endsWith("-all") && (c = _), _.startsWith("skip")) {
            b.done(d("Skipped"));
            continue;
          }
          C = !0, await A();
        }
        h++, b.done(d("Uploaded and checked"));
      } catch (T) {
        T?.code === "exists" && c === "skip-all" ? b.done(d("Skipped")) : (m.push(k.name), b.done(K(T), !0));
      }
      s.progress((g + 1) / e.length);
    }
  } finally {
    rt = !1, s.finish(m.length ? d("{written} uploaded, {failed} failed. The vault is unchanged where an upload failed.", { written: h, failed: m.length }) : d("{written} uploaded and checked.", { written: h }), m.length > 0), Kt(n.vault.name);
  }
}
function xn() {
  const e = y("input", { type: "file", multiple: !0, hidden: !0 });
  e.addEventListener("change", () => {
    const n = [...e.files];
    e.remove(), Ee(n);
  }), document.body.append(e), e.click();
}
async function En() {
  const e = tt();
  if (!e)
    return;
  const n = await en(d("New folder"), d("Folder name"), (a) => {
    try {
      return ln(a), null;
    } catch (u) {
      return K(u);
    }
  });
  if (n !== null)
    try {
      await e.vault.vault.createDirectory(e.dirId, n), Kt(e.vault.name);
    } catch (a) {
      R(K(a));
    }
}
yt({
  id: "cryptomator-vaults-upload",
  displayName: () => d("Upload files …"),
  iconSvgInline: () => hn,
  order: -2,
  enabled: ({ view: e }) => B(e) && tt() !== null,
  exec: async () => (xn(), null)
});
yt({
  id: "cryptomator-vaults-new-folder",
  displayName: () => d("New folder …"),
  iconSvgInline: () => fn,
  order: -1,
  enabled: ({ view: e }) => B(e) && tt() !== null,
  exec: async () => (await En(), null)
});
function Tn(e) {
  tt() && e.dataTransfer?.types?.includes("Files") && (e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy");
}
function Un(e) {
  if (!tt() || !e.dataTransfer?.files?.length)
    return;
  e.preventDefault(), e.stopPropagation();
  const n = [...e.dataTransfer.items || []].map((u) => ({ entry: u.webkitGetAsEntry?.(), file: u.getAsFile() })), a = n.length > 0 ? n.filter(({ entry: u, file: s }) => s && !u?.isDirectory).map(({ file: u }) => u) : [...e.dataTransfer.files];
  n.some(({ entry: u }) => u?.isDirectory) && R(d("Folders cannot be dropped into a vault yet: drop the files, or create the folder first.")), Ee(a);
}
window.addEventListener("dragover", Tn, !0);
window.addEventListener("drop", Un, !0);
yt({
  id: "cryptomator-vaults-add",
  displayName: () => d("Open a vault folder …"),
  iconSvgInline: () => yn,
  order: 0,
  enabled: ({ view: e }) => B(e),
  exec: async () => (await Ae(), null)
});
yt({
  id: "cryptomator-vaults-lock-all",
  displayName: () => d("Lock all vaults"),
  iconSvgInline: () => me,
  order: 1,
  enabled: ({ view: e }) => B(e) && [...D.values()].some((n) => n.vault?.unlocked),
  exec: async () => (qt(), null)
});
Le().register(new Re({
  id: Ft,
  name: d("Vaults"),
  caption: d("Cryptomator vaults, unlocked in this browser"),
  emptyTitle: d("No vaults found"),
  emptyCaption: d("Vaults in your files appear here. Open a vault's folder to add one."),
  emptyView: kn,
  icon: Rt,
  order: 90,
  getContents: bn
}));
jt();
for (const e of ["pointerdown", "keydown", "wheel", "touchstart"])
  document.addEventListener(e, Cn, { passive: !0 });
window.addEventListener("pagehide", () => {
  V(), qt();
});
zt && Ht().then(() => ht(W?.folder));
export {
  Ft as VIEW_ID
};
