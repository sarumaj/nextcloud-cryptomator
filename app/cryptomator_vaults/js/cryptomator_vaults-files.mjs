import { g as pr, t as fr, d as mr, v as wr, x as ot, K as yr, L as he, M as gr, O as xn, s as vr, F as ie, Q as Ee, R as br, V as kr, z as Cn, P as Rt, S as xr, y as Cr, A as An, T as Ar } from "./cryptomator_vaults-common-DyNnossx.mjs";
var Qe = { exports: {} }, Er = Qe.exports, an;
function Sr() {
  return an || (an = 1, (function(e) {
    (function(n, r) {
      e.exports ? e.exports = r(globalThis.crypto) : n.CryptomatorVault = r(n.crypto);
    })(typeof self < "u" ? self : Er, function(n) {
      const r = n.subtle, c = new TextEncoder(), u = new TextDecoder("utf-8", { fatal: !0 });
      class i extends Error {
        constructor(t, o) {
          super(o || t), this.name = "VaultError", this.code = t;
        }
      }
      function p(b) {
        const t = b.replace(/-/g, "+").replace(/_/g, "/"), o = t + "=".repeat((4 - t.length % 4) % 4), a = atob(o), l = new Uint8Array(a.length);
        for (let h = 0; h < a.length; h++)
          l[h] = a.charCodeAt(h);
        return l;
      }
      function d(b, t) {
        let o = "";
        for (let l = 0; l < b.length; l++)
          o += String.fromCharCode(b[l]);
        const a = btoa(o).replace(/\+/g, "-").replace(/\//g, "_");
        return t ? a : a.replace(/=+$/, "");
      }
      function m(b) {
        let t = "";
        for (let o = 0; o < b.length; o++)
          t += String.fromCharCode(b[o]);
        return btoa(t);
      }
      const v = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      function k(b) {
        let t = "", o = 0, a = 0;
        for (const l of b)
          for (o = o << 8 | l, a += 8; a >= 5; )
            t += v[o >>> a - 5 & 31], a -= 5;
        return a > 0 && (t += v[o << 5 - a & 31]), t;
      }
      function A(...b) {
        const t = new Uint8Array(b.reduce((a, l) => a + l.length, 0));
        let o = 0;
        for (const a of b)
          t.set(a, o), o += a.length;
        return t;
      }
      function C(b) {
        const t = new Uint8Array(8);
        return new DataView(t.buffer).setBigUint64(0, BigInt(b)), t;
      }
      function S(b, t) {
        if (b.length !== t.length)
          return !1;
        let o = 0;
        for (let a = 0; a < b.length; a++)
          o |= b[a] ^ t[a];
        return o === 0;
      }
      async function M(b, t, o) {
        const a = await r.importKey(
          "raw",
          b.length ? b : new Uint8Array(64),
          { name: "HMAC", hash: "SHA-256" },
          !1,
          ["sign"]
        ), l = new Uint8Array(o);
        for (let h = 1, f = 0; f < o; h++, f += 32) {
          const w = new Uint8Array([h >>> 24, h >>> 16 & 255, h >>> 8 & 255, h & 255]), y = new Uint8Array(await r.sign("HMAC", a, A(t, w)));
          l.set(y.subarray(0, Math.min(32, o - f)), f);
        }
        return l;
      }
      function j(b) {
        const t = b.slice(), o = (a, l) => a << l | a >>> 32 - l;
        for (let a = 0; a < 8; a += 2)
          t[4] ^= o(t[0] + t[12], 7), t[8] ^= o(t[4] + t[0], 9), t[12] ^= o(t[8] + t[4], 13), t[0] ^= o(t[12] + t[8], 18), t[9] ^= o(t[5] + t[1], 7), t[13] ^= o(t[9] + t[5], 9), t[1] ^= o(t[13] + t[9], 13), t[5] ^= o(t[1] + t[13], 18), t[14] ^= o(t[10] + t[6], 7), t[2] ^= o(t[14] + t[10], 9), t[6] ^= o(t[2] + t[14], 13), t[10] ^= o(t[6] + t[2], 18), t[3] ^= o(t[15] + t[11], 7), t[7] ^= o(t[3] + t[15], 9), t[11] ^= o(t[7] + t[3], 13), t[15] ^= o(t[11] + t[7], 18), t[1] ^= o(t[0] + t[3], 7), t[2] ^= o(t[1] + t[0], 9), t[3] ^= o(t[2] + t[1], 13), t[0] ^= o(t[3] + t[2], 18), t[6] ^= o(t[5] + t[4], 7), t[7] ^= o(t[6] + t[5], 9), t[4] ^= o(t[7] + t[6], 13), t[5] ^= o(t[4] + t[7], 18), t[11] ^= o(t[10] + t[9], 7), t[8] ^= o(t[11] + t[10], 9), t[9] ^= o(t[8] + t[11], 13), t[10] ^= o(t[9] + t[8], 18), t[12] ^= o(t[15] + t[14], 7), t[13] ^= o(t[12] + t[15], 9), t[14] ^= o(t[13] + t[12], 13), t[15] ^= o(t[14] + t[13], 18);
        for (let a = 0; a < 16; a++)
          b[a] = b[a] + t[a] | 0;
      }
      function q(b, t, o, a) {
        a.set(b.subarray((2 * o - 1) * 16, 2 * o * 16));
        for (let l = 0; l < 2 * o; l++) {
          for (let h = 0; h < 16; h++)
            a[h] ^= b[l * 16 + h];
          j(a), t.set(a, ((l & 1) * o + (l >> 1)) * 16);
        }
      }
      function U(b, t, o) {
        const a = 32 * o, l = new Int32Array(a * t), h = new Int32Array(b), f = new Int32Array(a), w = new Int32Array(16);
        for (let y = 0; y < t; y++)
          l.set(h, y * a), q(h, f, o, w), h.set(f);
        for (let y = 0; y < t; y++) {
          const E = h[(2 * o - 1) * 16] & t - 1;
          for (let x = 0; x < a; x++)
            h[x] ^= l[E * a + x];
          q(h, f, o, w), h.set(f);
        }
        return h;
      }
      function P(b) {
        const t = new DataView(b.buffer, b.byteOffset, b.byteLength), o = new Int32Array(b.length / 4);
        for (let a = 0; a < o.length; a++)
          o[a] = t.getInt32(a * 4, !0);
        return o;
      }
      function B(b, t) {
        const o = new DataView(t.buffer, t.byteOffset, t.byteLength);
        for (let a = 0; a < b.length; a++)
          o.setInt32(a * 4, b[a], !0);
      }
      async function re(b, t, o, a, l, h) {
        if (o < 2 || (o & o - 1) !== 0)
          throw new i("corrupt", "scrypt cost is not a power of two");
        const f = 128 * a, w = await M(b, t, l * f);
        for (let y = 0; y < l; y++) {
          const E = w.subarray(y * f, (y + 1) * f);
          B(U(P(E), o, a), E);
        }
        return M(b, w, h);
      }
      function K(b) {
        const t = new Uint8Array(16);
        for (let o = 0; o < 15; o++)
          t[o] = (b[o] << 1 | b[o + 1] >>> 7) & 255;
        return t[15] = b[15] << 1 & 255, b[0] & 128 && (t[15] ^= 135), t;
      }
      function Y(b, t) {
        const o = new Uint8Array(b.length);
        for (let a = 0; a < b.length; a++)
          o[a] = b[a] ^ t[a];
        return o;
      }
      class Z {
        constructor(t) {
          this.key = t, this.subkeys = null;
        }
        async cbcLast(t) {
          return new Uint8Array(await r.encrypt({ name: "AES-CBC", iv: new Uint8Array(16) }, this.key, t)).subarray(t.length - 16, t.length);
        }
        async mac(t) {
          if (this.subkeys === null) {
            const w = await this.cbcLast(new Uint8Array(16)), y = K(w);
            this.subkeys = [y, K(y)];
          }
          const [o, a] = this.subkeys, l = Math.max(1, Math.ceil(t.length / 16)), h = new Uint8Array(l * 16);
          h.set(t);
          const f = h.subarray((l - 1) * 16);
          return t.length > 0 && t.length % 16 === 0 ? f.set(Y(f, o)) : (f[t.length - (l - 1) * 16] = 128, f.set(Y(f, a))), this.cbcLast(h);
        }
      }
      async function ge(b, t, o) {
        let a = await b.mac(new Uint8Array(16));
        for (const h of t)
          a = Y(K(a), await b.mac(h));
        let l;
        if (o.length >= 16)
          l = o.slice(), l.set(Y(l.subarray(l.length - 16), a), l.length - 16);
        else {
          const h = new Uint8Array(16);
          h.set(o), h[o.length] = 128, l = Y(K(a), h);
        }
        return b.mac(l);
      }
      function de(b) {
        const t = b.slice();
        return t[8] &= 127, t[12] &= 127, t;
      }
      class X {
        constructor(t, o) {
          this.cmac = t, this.ctrKey = o;
        }
        async encrypt(t, o) {
          const a = await ge(this.cmac, o, t), l = await r.encrypt({ name: "AES-CTR", counter: de(a), length: 128 }, this.ctrKey, t);
          return A(a, new Uint8Array(l));
        }
        async decrypt(t, o) {
          if (t.length < 16)
            throw new i("corrupt", "name too short");
          const a = t.subarray(0, 16), l = new Uint8Array(await r.decrypt(
            { name: "AES-CTR", counter: de(a), length: 128 },
            this.ctrKey,
            t.subarray(16)
          ));
          if (!S(await ge(this.cmac, o, l), a))
            throw new i("corrupt", "name does not authenticate");
          return l;
        }
      }
      const D = 32 * 1024, Q = {
        SIV_GCM: { header: 68, nonce: 12, overhead: 28 },
        SIV_CTRMAC: { header: 88, nonce: 16, overhead: 48 }
      };
      function fe(b, t) {
        const { header: o, overhead: a } = Q[b], l = t - o;
        if (l <= 0)
          return 0;
        const h = Math.floor(l / (D + a)), f = l % (D + a);
        return h * D + Math.max(0, f - a);
      }
      const ht = /[a-zA-Z0-9\-_]{20}(?:[a-zA-Z0-9\-_]{4})*(?:[a-zA-Z0-9\-_]{4}|[a-zA-Z0-9\-_]{3}=|[a-zA-Z0-9\-_]{2}==)/g, qe = 36, tr = 10 * 1024, nr = 28, Gt = "LOST+FOUND", Ge = "recovery";
      async function rr(b, t, o) {
        let a = 0;
        const l = async () => {
          for (; a < b.length; )
            await o(b[a++]);
        };
        await Promise.all(Array.from({ length: Math.min(t, b.length) }, l));
      }
      const ar = 32767, pt = ".cryptomator-vaults-", or = 1440 * 60 * 1e3, ir = 255;
      function Se(b) {
        return n.getRandomValues(new Uint8Array(b));
      }
      function Ye() {
        return n.randomUUID();
      }
      async function Je(b) {
        return new Uint8Array(await r.digest("SHA-256", b));
      }
      const ft = 999, mt = { HS256: "SHA-256", HS384: "SHA-384", HS512: "SHA-512" }, sr = 2 ** 15, Yt = 8, Jt = 220, wt = "masterkeyfile:";
      async function Xt(b, t, o, a, l) {
        const h = await re(c.encode(String(b).normalize("NFC")), t, o, a, 1, 32);
        try {
          return await r.importKey("raw", h, "AES-KW", !1, l);
        } finally {
          h.fill(0);
        }
      }
      async function Xe(b, t) {
        if (b.version !== ft)
          throw new i("unsupported-format", "key file version " + b.version);
        const o = await Xt(t, p(b.scryptSalt), b.scryptCostParam, b.scryptBlockSize, ["unwrapKey"]);
        let a;
        try {
          const l = async (h) => new Uint8Array(await r.exportKey(
            "raw",
            await r.unwrapKey("raw", p(h), o, "AES-KW", { name: "HMAC", hash: "SHA-256" }, !0, ["sign"])
          ));
          a = { encRaw: await l(b.primaryMasterKey), macRaw: await l(b.hmacMasterKey) };
        } catch {
          throw new i("wrong-password");
        }
        if (!await cr(a.macRaw, b))
          throw a.encRaw.fill(0), a.macRaw.fill(0), new i("corrupt", "the key file's version does not authenticate");
        return a;
      }
      function $t(b) {
        const t = new Uint8Array(4);
        return new DataView(t.buffer).setInt32(0, b), t;
      }
      async function cr(b, t) {
        let o;
        try {
          o = p(String(t.versionMac ?? ""));
        } catch {
          return !1;
        }
        const a = await r.importKey("raw", b, { name: "HMAC", hash: "SHA-256" }, !1, ["verify"]);
        return r.verify("HMAC", a, o, $t(t.version));
      }
      async function yt({ encRaw: b, macRaw: t }, o, a = sr) {
        const l = Se(8), h = await Xt(o, l, a, Yt, ["wrapKey"]), f = async (E) => new Uint8Array(await r.wrapKey(
          "raw",
          await r.importKey("raw", E, { name: "HMAC", hash: "SHA-256" }, !0, ["sign"]),
          h,
          "AES-KW"
        )), w = await r.importKey("raw", t, { name: "HMAC", hash: "SHA-256" }, !1, ["sign"]), y = {
          version: ft,
          scryptSalt: m(l),
          scryptCostParam: a,
          scryptBlockSize: Yt,
          primaryMasterKey: m(await f(b)),
          hmacMasterKey: m(await f(t)),
          versionMac: m(new Uint8Array(await r.sign("HMAC", w, $t(ft))))
        };
        return c.encode(JSON.stringify(y, null, 2));
      }
      async function lr({ encRaw: b, macRaw: t }, o, a) {
        const l = (w) => d(c.encode(JSON.stringify(w)), !1), h = l({ kid: o, typ: "JWT", alg: "HS256" }) + "." + l({ jti: Ye(), format: 8, cipherCombo: a, shorteningThreshold: Jt }), f = await r.importKey("raw", A(b, t), { name: "HMAC", hash: "SHA-256" }, !1, ["sign"]);
        return h + "." + d(new Uint8Array(await r.sign("HMAC", f, c.encode(h))), !1);
      }
      async function Zt(b, { encRaw: t, macRaw: o }) {
        const a = Object.hasOwn(mt, b.header.alg) ? mt[b.header.alg] : null;
        if (a === null)
          return !1;
        const l = await r.importKey("raw", A(t, o), { name: "HMAC", hash: a }, !1, ["verify"]);
        return r.verify("HMAC", l, b.signature, c.encode(b.signed));
      }
      const ur = Array.from({ length: 256 }, (b, t) => {
        let o = t;
        for (let a = 0; a < 8; a++)
          o = o & 1 ? 3988292384 ^ o >>> 1 : o >>> 1;
        return o >>> 0;
      });
      function Qt(b) {
        let t = 4294967295;
        for (const o of b)
          t = ur[(t ^ o) & 255] ^ t >>> 8;
        return (t ^ 4294967295) >>> 0;
      }
      function en(b, t) {
        const o = Qt(b), a = A(b, new Uint8Array([o & 255, o >>> 8 & 255])), l = [];
        for (let h = 0; h < a.length; h += 3)
          l.push(t[a[h] << 4 | a[h + 1] >> 4], t[(a[h + 1] & 15) << 8 | a[h + 2]]);
        return a.fill(0), l.join(" ");
      }
      function tn(b, t) {
        const o = new Map(t.map((y, E) => [y, E])), a = String(b).trim().toLowerCase().split(/\s+/).filter(Boolean);
        if (a.length !== 44)
          throw new i("invalid-recovery-key", a.length + " words, not 44");
        const l = a.find((y) => !o.has(y));
        if (l)
          throw new i("invalid-recovery-key", '"' + l + '" is not a word of the list');
        const h = new Uint8Array(66);
        for (let y = 0; y < a.length; y += 2) {
          const E = o.get(a[y]), x = o.get(a[y + 1]);
          h.set([E >> 4, (E & 15) << 4 | x >> 8, x & 255], y / 2 * 3);
        }
        const f = h.slice(0, 64), w = Qt(f);
        if (h[64] !== (w & 255) || h[65] !== (w >>> 8 & 255))
          throw new i("invalid-recovery-key", "its check sum does not match");
        return f;
      }
      async function dr(b, t) {
        const o = await Je(t);
        return b + "." + [...o.slice(0, 4)].map((a) => a.toString(16).padStart(2, "0").toUpperCase()).join("") + ".bkup";
      }
      async function nn(b) {
        let t;
        try {
          t = hr(u.decode(await b.read($e)));
        } catch (f) {
          throw f instanceof i ? f : new i("unsupported-format", "vault.cryptomator unreadable: " + f.message);
        }
        const { header: o, payload: a } = t;
        if (a.format !== 8)
          throw new i("unsupported-format", "vault format " + a.format);
        if (!(a.cipherCombo in Q))
          throw new i("unsupported-format", "cipher combination " + a.cipherCombo);
        if (!Object.hasOwn(mt, o.alg))
          throw new i("unsupported-format", "signature " + o.alg);
        const l = String(o.kid || "");
        if (!l.startsWith(wt))
          throw new i("unsupported-key", l);
        const h = l.slice(wt.length);
        if (!/^[^/\\]+$/.test(h))
          throw new i("unsupported-key", l);
        return { config: t, name: h };
      }
      function Ie(b) {
        const t = String(b).normalize("NFC");
        if (t === "" || t === "." || t === ".." || /[/\\\u0000-\u001f\u007f]/.test(t) || t.length > ir)
          throw new i("invalid-name", t);
        return t;
      }
      const $e = "vault.cryptomator";
      function hr(b) {
        const t = b.trim().split(".");
        if (t.length !== 3)
          throw new i("unsupported-format", "vault.cryptomator is not a JWT");
        const o = (a) => JSON.parse(u.decode(p(a)));
        return { header: o(t[0]), payload: o(t[1]), signed: t[0] + "." + t[1], signature: p(t[2]) };
      }
      function T(...b) {
        return b.filter((t) => t !== "").join("/");
      }
      class ve {
        constructor(t, o, a) {
          this.storage = t, this.config = o, this.masterkeyFile = a, this.keys = null;
        }
        /** Reads the vault's configuration and key file; checks the format before any password. */
        static async open(t) {
          const { config: o, name: a } = await nn(t), l = JSON.parse(u.decode(await t.read(a))), h = new ve(t, o, l);
          return h.masterkeyName = a, h;
        }
        get scheme() {
          return this.config.payload.cipherCombo;
        }
        get unlocked() {
          return this.keys !== null;
        }
        /** Derives the keys from the password; a VaultError 'wrong-password' if it is not the vault's. */
        async unlock(t) {
          const o = await Xe(this.masterkeyFile, t);
          try {
            await this.useKeys(o);
          } finally {
            o.encRaw.fill(0), o.macRaw.fill(0);
          }
        }
        /** Takes raw keys into use (not kept raw); refused if the configuration is not signed with them. */
        async useKeys({ encRaw: t, macRaw: o }) {
          if (!await Zt(this.config, { encRaw: t, macRaw: o }))
            throw new i("corrupt", "vault.cryptomator is not signed with this key");
          const a = (l, h) => r.importKey("raw", l, h, !1, ["encrypt", "decrypt"]);
          this.keys = {
            gcm: await a(t, "AES-GCM"),
            ctr: await a(t, "AES-CTR"),
            mac: await r.importKey("raw", o, { name: "HMAC", hash: "SHA-256" }, !1, ["sign", "verify"])
          }, this.siv = new X(new Z(await a(o, "AES-CBC")), this.keys.ctr), this.dirPaths = /* @__PURE__ */ new Map();
        }
        /**
         * Creates a vault in an empty folder of the storage, as Cryptomator's desktop
         * app and cryptofs do: new keys, the key file, the configuration, the root
         * directory with its ID's backup (dirid.c9r). Opened again from the storage
         * and unlocked with the password before it is returned, unlocked.
         */
        static async create(t, o, { cipherCombo: a = "SIV_GCM" } = {}) {
          if (typeof t.write != "function")
            throw new i("read-only");
          if (!(a in Q))
            throw new i("unsupported-format", "cipher combination " + a);
          const l = "masterkey.cryptomator";
          for (const w of [$e, l, "d"])
            if (await t.stat(w))
              throw new i("exists-other", w);
          const h = { encRaw: Se(32), macRaw: Se(32) };
          try {
            await t.write(l, await yt(h, o), { create: !0 }), await t.write($e, c.encode(await lr(h, wt + l, a)), { create: !0 });
            const w = await ve.open(t);
            await w.useKeys(h);
            const y = await w.dirPath("");
            await t.mkdir("d", { existsOk: !0 }), await t.mkdir(y.split("/").slice(0, 2).join("/"), { existsOk: !0 }), await t.mkdir(y, { existsOk: !0 }), await t.write(T(y, "dirid.c9r"), await w.encryptContents(new Uint8Array(0)), { create: !0 });
          } finally {
            h.encRaw.fill(0), h.macRaw.fill(0);
          }
          const f = await ve.open(t);
          return await f.unlock(o), f;
        }
        /**
         * Changes the password, as Cryptomator's desktop app does: the keys unwrapped
         * with the old one and wrapped with the new one (a new salt, the same scrypt
         * cost); the old key file kept beside as a backup (backupName). The new one
         * is read back and must give the same keys, else the old one is put back.
         * Nothing else changes: the files stay as they are encrypted.
         */
        async changePassword(t, o) {
          if (typeof this.storage.write != "function")
            throw new i("read-only");
          const a = this.masterkeyName, l = await this.storage.read(a), h = JSON.parse(u.decode(l)), f = await Xe(h, t);
          try {
            await this.replaceKeyFile(a, l, await yt(f, o, h.scryptCostParam), f, o);
          } finally {
            f.encRaw.fill(0), f.macRaw.fill(0);
          }
        }
        /**
         * Puts a new key file in place of the old one (backed up beside it, if there
         * was one) and reads it back: it must give these keys with the password, else
         * the old file is put back (VaultError 'corrupt').
         */
        async replaceKeyFile(t, o, a, l, h) {
          o && await this.storage.write(await dr(t, o), o), await this.storage.write(t, a, { create: !o });
          const f = JSON.parse(u.decode(await this.storage.read(t)));
          let w = null;
          try {
            w = await Xe(f, h);
          } catch {
          }
          const y = w !== null && S(w.encRaw, l.encRaw) && S(w.macRaw, l.macRaw);
          if (w?.encRaw.fill(0), w?.macRaw.fill(0), !y)
            throw o && await this.storage.write(t, o), new i("corrupt", "the new key file does not read back");
          this.masterkeyFile = f;
        }
        /** The vault's recovery key (encodeRecoveryKey), after its password. */
        async recoveryKey(t, o) {
          const a = await Xe(JSON.parse(u.decode(await this.storage.read(this.masterkeyName))), t), l = A(a.encRaw, a.macRaw);
          try {
            return en(l, o);
          } finally {
            l.fill(0), a.encRaw.fill(0), a.macRaw.fill(0);
          }
        }
        /**
         * A new password with the recovery key, as Cryptomator's desktop app sets one:
         * the keys from the recovery key, checked against the vault's configuration
         * (signed with them), a new key file (the old one, if any, backed up). Also
         * where the key file is lost. Returns the vault, unlocked.
         */
        static async resetPassword(t, o, a, l) {
          if (typeof t.write != "function")
            throw new i("read-only");
          const { config: h, name: f } = await nn(t), w = tn(o, l), y = { encRaw: w.slice(0, 32), macRaw: w.slice(32) };
          w.fill(0);
          try {
            if (!await Zt(h, y))
              throw new i("invalid-recovery-key", "it is not this vault's");
            const x = await t.read(f).catch((N) => {
              if (N?.code === "not-found")
                return null;
              throw N;
            }), I = new ve(t, h, null);
            I.masterkeyName = f, await I.replaceKeyFile(f, x, await yt(y, a), y, a);
          } finally {
            y.encRaw.fill(0), y.macRaw.fill(0);
          }
          const E = await ve.open(t);
          return await E.unlock(a), E;
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
        async dirPath(t) {
          if (this.requireKeys(), !this.dirPaths.has(t)) {
            const o = await this.siv.encrypt(c.encode(t), []), a = k(new Uint8Array(await r.digest("SHA-1", o)));
            this.dirPaths.set(t, T("d", a.slice(0, 2), a.slice(2)));
          }
          return this.dirPaths.get(t);
        }
        /**
         * The name in an entry's file name, found as cryptofs finds it (C9rDecryptor):
         * the first run of base64 in it that decrypts; where one does not, the run is
         * narrowed at its first and last '-' or '_' and tried again. {name, extracted}
         * or null.
         */
        async extractName(t, o, a = 0, l = t.length) {
          const h = new RegExp(ht.source, "g");
          h.lastIndex = a;
          const f = h.exec(t.slice(0, l));
          if (f === null)
            return null;
          const w = f[0];
          try {
            return { name: u.decode(await this.siv.decrypt(p(w), [c.encode(o)])), extracted: w };
          } catch {
            const y = w.search(/[-_]/);
            if (y === -1)
              return null;
            const E = Math.max(w.lastIndexOf("-"), w.lastIndexOf("_")), x = await this.extractName(t, o, f.index + Math.max(1, y), l);
            return x !== null ? x : this.extractName(t, o, a, f.index + w.length - Math.max(1, w.length - E));
          }
        }
        async decryptName(t, o) {
          const a = t.endsWith(".c9r") ? t.slice(0, -4) : t;
          try {
            return u.decode(await this.siv.decrypt(p(a), [c.encode(o)]));
          } catch (l) {
            throw l instanceof i ? l : new i("corrupt", "name not decryptable");
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
        async list(t) {
          const o = await this.dirPath(t), a = await this.storage.list(o), l = await Promise.all(a.map((w) => this.describe(o, w, t))), h = l.filter((w) => w !== null && !w.conflict);
          for (const w of l.filter((y) => y?.conflict)) {
            const y = await this.resolveConflict(o, t, w);
            y !== null && h.push(y);
          }
          const f = await Promise.all(h.map(async (w) => w.type !== "dir" || await this.storage.stat?.(await this.dirPath(w.dirId)).then((y) => y !== null, () => !0) !== !1));
          return h.filter((w, y) => f[y]).sort((w, y) => (y.type === "dir") - (w.type === "dir") || w.name.localeCompare(y.name));
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
        async resolveConflict(t, o, a) {
          if (typeof this.storage.move != "function")
            return null;
          const l = a.found.extracted + ".c9r", h = T(t, l);
          try {
            try {
              return await this.storage.move(a.path, h), this.describe(t, { ...a.entry, name: l }, o);
            } catch (w) {
              if (w?.code !== "exists")
                throw w;
            }
            const f = await this.storage.stat(h);
            if (a.entry.isDir && f?.isDir) {
              const w = await this.compareTypeFile(a.path, h, "dir.c9r", qe, !0);
              if (w.both)
                return w.same ? this.removeDuplicate(a.path) : this.renameConflict(t, o, a);
              const y = await this.compareTypeFile(a.path, h, "symlink.c9r", ar, !1);
              if (y.both)
                return y.same ? this.removeDuplicate(a.path) : this.renameConflict(t, o, a);
              if (!((w.conflicting || y.conflicting) && (w.canonical || y.canonical)))
                return null;
            }
            return this.renameConflict(t, o, a);
          } catch {
            return null;
          }
        }
        async removeDuplicate(t) {
          return await this.storage.remove(t), null;
        }
        /** The first bytes of a folder entry's type file in both entries, compared. */
        async compareTypeFile(t, o, a, l, h) {
          const f = (N) => this.storage.read(T(N, a)).then((R) => R.subarray(0, l), (R) => {
            if (R?.code === "not-found")
              return new Uint8Array(0);
            throw R;
          }), [w, y] = await Promise.all([f(t), f(o)]), E = h ? l : 1, x = w.length >= E, I = y.length >= E;
          return { conflicting: x, canonical: I, both: x && I, same: x && I && S(w, y) };
        }
        /** Renames a conflict's copy as cryptofs does (renameConflictingFile). */
        async renameConflict(t, o, a) {
          const l = a.found.name, h = l.lastIndexOf("."), f = h > 0 ? l.slice(h) : "", w = h > 0 ? l.slice(0, h) : l, y = a.entry.name, E = y.indexOf(a.found.extracted) + a.found.extracted.length, x = y.slice(E, y.length - 4), I = this.config.payload.shorteningThreshold ?? 220, R = Math.trunc((I - 4) / 4) * 3 - 16 - f.length, F = x.slice(0, Math.min(x.length, Math.trunc(R / 2))), _ = w.slice(0, Math.max(0, Math.min(w.length, R - Math.max(4, F.length)))), V = [_ + F + f];
          for (let O = 1; O < 10; O++)
            V.push(_ + " (" + O + ")" + f);
          for (const O of V) {
            const H = d(await this.siv.encrypt(c.encode(O), [c.encode(o)]), !0) + ".c9r", ce = T(t, H);
            if (await this.storage.stat(ce) === null)
              return await this.storage.move(a.path, ce), this.describe(t, { ...a.entry, name: H }, o);
          }
          return null;
        }
        async describe(t, o, a) {
          const l = T(t, o.name), h = await this.describeEntry(t, o, a, l);
          return h !== null && o.mtime && !h.mtime && (h.mtime = o.mtime), h;
        }
        async describeEntry(t, o, a, l) {
          try {
            if (o.name.endsWith(".c9s") && o.isDir) {
              const w = await this.decryptName(u.decode(await this.storage.read(T(l, "name.c9s"))).trim(), a), y = await this.storage.list(l), E = y.find((x) => x.name === "contents.c9r");
              return E ? { name: w, type: "file", size: fe(this.scheme, E.size), path: T(l, "contents.c9r"), mtime: E.mtime } : this.describeNode(w, l, y.map((x) => x.name));
            }
            if (!o.name.endsWith(".c9r"))
              return null;
            const h = await this.extractName(o.name.slice(0, -4), a);
            if (h === null)
              return null;
            if (o.name !== h.extracted + ".c9r")
              return o.name.startsWith(".") ? null : { conflict: !0, entry: o, found: h, path: l };
            const f = h.name;
            return o.isDir ? this.describeNode(f, l, null) : { name: f, type: "file", size: fe(this.scheme, o.size), path: l };
          } catch (h) {
            return { name: o.name, type: "broken", error: h.message, path: l };
          }
        }
        // A folder <name>.c9r (or .c9s): a directory (dir.c9r, its ID) or a link (symlink.c9r).
        async describeNode(t, o, a) {
          const l = async (w) => {
            if (a !== null && !a.includes(w))
              return null;
            try {
              return await this.storage.read(T(o, w));
            } catch (y) {
              if (y instanceof i && y.code === "not-found")
                return null;
              throw y;
            }
          }, h = await l("dir.c9r");
          if (h !== null)
            return { name: t, type: "dir", dirId: u.decode(h).trim(), path: o };
          const f = await l("symlink.c9r");
          if (f !== null) {
            const w = u.decode(await this.decryptContents(f));
            return { name: t, type: "link", target: w, path: o };
          }
          throw new i("corrupt", "neither a directory nor a link");
        }
        /**
         * A file's decrypted contents: onProgress(done, total) after each chunk,
         * onDownload(done, total) while the storage reads it (if it reports that).
         */
        async readFile(t, o, a) {
          return this.decryptContents(await this.storage.read(t.path, a), o);
        }
        async decryptContents(t, o) {
          this.requireKeys();
          const a = Q[this.scheme];
          if (t.length === 0)
            return new Uint8Array(0);
          if (t.length < a.header)
            throw new i("corrupt", "file header too short");
          const l = t.subarray(0, a.header), h = l.subarray(0, a.nonce), f = await this.decryptHeader(l, h), w = t.subarray(a.header), y = D + a.overhead, E = new Uint8Array(fe(this.scheme, t.length));
          for (let x = 0, I = 0; I < w.length; x++, I += y) {
            const N = w.subarray(I, Math.min(I + y, w.length)), R = await this.decryptChunk(N, x, h, f);
            E.set(R, x * D), o && o(Math.min(I + y, w.length), w.length);
          }
          return E;
        }
        async decryptHeader(t, o) {
          let a;
          if (this.scheme === "SIV_GCM")
            try {
              a = new Uint8Array(await r.decrypt({ name: "AES-GCM", iv: o }, this.keys.gcm, t.subarray(12)));
            } catch {
              throw new i("corrupt", "file header does not authenticate");
            }
          else {
            const w = t.subarray(16, 56);
            if (!await r.verify("HMAC", this.keys.mac, t.subarray(56, 88), t.subarray(0, 56)))
              throw new i("corrupt", "file header does not authenticate");
            a = new Uint8Array(await r.decrypt({ name: "AES-CTR", counter: o, length: 128 }, this.keys.ctr, w));
          }
          const l = a.subarray(8, 40), h = this.scheme === "SIV_GCM" ? "AES-GCM" : "AES-CTR", f = await r.importKey("raw", l, h, !1, ["decrypt"]);
          return a.fill(0), f;
        }
        async decryptChunk(t, o, a, l) {
          try {
            if (this.scheme === "SIV_GCM") {
              const y = t.subarray(0, 12);
              return new Uint8Array(await r.decrypt(
                { name: "AES-GCM", iv: y, additionalData: A(C(o), a) },
                l,
                t.subarray(12)
              ));
            }
            const h = t.subarray(0, 16), f = t.subarray(16, t.length - 32), w = t.subarray(t.length - 32);
            if (!await r.verify("HMAC", this.keys.mac, w, A(a, C(o), h, f)))
              throw new Error("mac");
            return new Uint8Array(await r.decrypt({ name: "AES-CTR", counter: h, length: 128 }, l, f));
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
        async entryPath(t, o) {
          const a = await this.dirPath(t), l = d(await this.siv.encrypt(c.encode(o), [c.encode(t)]), !0) + ".c9r", h = this.config.payload.shorteningThreshold ?? 220;
          if (l.length > h) {
            const f = d(new Uint8Array(await r.digest("SHA-1", c.encode(l))), !0) + ".c9s";
            return { folder: a, path: T(a, f), long: !0, fullName: l };
          }
          return { folder: a, path: T(a, l), long: !1, fullName: l };
        }
        /** What is stored at an entry's place: null, 'file', 'dir', 'link' or 'unknown'. */
        async existing(t) {
          const o = await this.storage.stat(t.path);
          if (!o)
            return null;
          if (!o.isDir)
            return "file";
          const a = (await this.storage.list(t.path)).map((l) => l.name);
          return a.includes("contents.c9r") ? "file" : a.includes("dir.c9r") ? "dir" : a.includes("symlink.c9r") ? "link" : "unknown";
        }
        /**
         * The start of a file's encryption: a new content key and the header that
         * holds it; encryptChunk(number, plain) encrypts the file's chunks in turn.
         */
        async startEncryption() {
          this.requireKeys();
          const t = Q[this.scheme], o = this.scheme === "SIV_GCM", a = Se(t.nonce), l = Se(32), h = A(new Uint8Array(8).fill(255), l);
          let f;
          if (o)
            f = A(a, new Uint8Array(await r.encrypt({ name: "AES-GCM", iv: a }, this.keys.gcm, h)));
          else {
            const E = new Uint8Array(await r.encrypt({ name: "AES-CTR", counter: a, length: 128 }, this.keys.ctr, h)), x = new Uint8Array(await r.sign("HMAC", this.keys.mac, A(a, E)));
            f = A(a, E, x);
          }
          const w = await r.importKey("raw", l, o ? "AES-GCM" : "AES-CTR", !1, ["encrypt"]);
          h.fill(0), l.fill(0);
          const y = this.keys;
          return {
            header: f,
            async encryptChunk(E, x) {
              const I = Se(t.nonce);
              if (o)
                return A(I, new Uint8Array(await r.encrypt(
                  { name: "AES-GCM", iv: I, additionalData: A(C(E), a) },
                  w,
                  x
                )));
              const N = new Uint8Array(await r.encrypt({ name: "AES-CTR", counter: I, length: 128 }, w, x)), R = new Uint8Array(await r.sign("HMAC", y.mac, A(a, C(E), I, N)));
              return A(I, N, R);
            }
          };
        }
        /** The size of a file of this many bytes, encrypted. */
        encryptedSize(t) {
          const o = Q[this.scheme];
          return o.header + t + Math.ceil(t / D) * o.overhead;
        }
        /** A file's contents encrypted as Cryptomator does: a new content key, header, chunks. */
        async encryptContents(t, o) {
          const a = await this.startEncryption(), l = Math.ceil(t.length / D), h = new Uint8Array(this.encryptedSize(t.length));
          h.set(a.header);
          for (let f = 0, w = a.header.length; f < l; f++) {
            const y = await a.encryptChunk(f, t.subarray(f * D, Math.min((f + 1) * D, t.length)));
            h.set(y, w), w += y.length, o && o(f + 1, l);
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
        async *encryptedParts(t, o, a) {
          const l = await this.startEncryption(), h = 32 * D;
          let f = [l.header], w = l.header.length;
          for (let y = 0, E = 0; y < t.size; y += h) {
            const x = await t.read(y, Math.min(y + h, t.size));
            for (let I = 0; I < x.length; I += D, E++) {
              const N = await l.encryptChunk(E, x.subarray(I, Math.min(I + D, x.length)));
              f.push(N), w += N.length, w >= o && (yield A(...f), f = [], w = 0);
            }
            a?.(Math.min(y + h, t.size), t.size);
          }
          w > 0 && (yield A(...f));
        }
        /**
         * Compares a stored file with its source, in ranges: each chunk decrypted and
         * authenticated, its bytes equal to the source's.
         */
        async checkStoredStream(t, o, a) {
          const l = Q[this.scheme], h = this.encryptedSize(o.size), f = await this.storage.stat(t);
          if (!f || f.size !== h)
            throw new i("corrupt", "the stored file has " + (f?.size ?? "no") + " bytes, not " + h);
          const w = await this.storage.readRange(t, 0, l.header), y = w.subarray(0, l.nonce), E = await this.decryptHeader(w, y), x = D + l.overhead, I = Math.ceil(o.size / D), N = 32;
          for (let R = 0; R < I; R += N) {
            const F = Math.min(R + N, I), _ = l.header + R * x, V = await this.storage.readRange(t, _, Math.min(l.header + F * x, h)), O = await o.read(R * D, Math.min(F * D, o.size));
            for (let H = R; H < F; H++) {
              const ce = (H - R) * x, ue = await this.decryptChunk(V.subarray(ce, Math.min(ce + x, V.length)), H, y, E);
              if (!S(ue, O.subarray((H - R) * D, (H - R) * D + ue.length)))
                throw new i("corrupt", "the stored file differs from the one written (chunk " + H + ")");
            }
            a?.(Math.min(F * D, o.size), o.size);
          }
        }
        /**
         * writeFile for a source read in pieces (see above). options: replace,
         * onProgress(phase, done, total) with the phases 'upload' and 'verify',
         * partSize (bytes per part handed to the storage).
         */
        async writeFileStream(t, o, a, l = {}) {
          this.requireWritable();
          const { replace: h = !1, onProgress: f, partSize: w = 10 * 1024 * 1024 } = l, y = (O) => (H, ce) => f?.(O, H, ce), E = Ie(o), x = await this.entryPath(t, E), I = await this.existing(x);
          if (I !== null && (I !== "file" || !h))
            throw new i(I === "file" ? "exists" : "exists-other", E);
          const N = this.encryptedSize(a.size), R = x.long ? T(x.path, "contents.c9r") : x.path, F = this.stagingPath(), _ = x.long && I === null, V = _ ? T(F, "contents.c9r") : F;
          try {
            _ && (await this.storage.mkdir(F), await this.storage.write(T(F, "name.c9s"), c.encode(x.fullName), { create: !0 })), await this.storage.writeParts(V, N, this.encryptedParts(a, w, y("upload")), { create: !0 }), await this.checkStoredStream(V, a, y("verify")), _ ? await this.storage.move(F, x.path) : await this.storage.move(F, R, { overwrite: I !== null });
          } catch (O) {
            throw await this.storage.remove(F).catch(() => {
            }), O;
          }
          return { name: E, path: R, size: a.size };
        }
        /**
         * A file's decrypted contents in pieces, for a file too large to hold:
         * onPiece(bytes) for each range of chunks in turn (awaited), each chunk
         * authenticated; onProgress(done, total).
         */
        async readFileStream(t, o, a) {
          for await (const l of this.decryptedPieces(t, a))
            await o(l);
        }
        /**
         * A file's decrypted contents in pieces of up to 64 chunks (2 MiB), in order,
         * each read in one range and checked: what readFileStream hands on, for a
         * reader that pulls (e.g. an upload in parts). Nothing for an empty file.
         */
        async *decryptedPieces(t, o) {
          this.requireKeys();
          const a = Q[this.scheme], l = await this.storage.stat(t.path);
          if (!l || l.size === 0)
            return;
          if (l.size < a.header)
            throw new i("corrupt", "file header too short");
          const h = await this.storage.readRange(t.path, 0, a.header), f = h.subarray(0, a.nonce), w = await this.decryptHeader(h, f), y = D + a.overhead, E = fe(this.scheme, l.size), x = Math.ceil((l.size - a.header) / y), I = 64;
          for (let N = 0; N < x; N += I) {
            const R = Math.min(N + I, x), F = await this.storage.readRange(t.path, a.header + N * y, Math.min(a.header + R * y, l.size)), _ = [];
            for (let V = N; V < R; V++) {
              const O = (V - N) * y;
              _.push(await this.decryptChunk(F.subarray(O, Math.min(O + y, F.length)), V, f, w));
            }
            yield A(..._), o?.(Math.min(R * D, E), E);
          }
        }
        /**
         * A staging name in the vault's top folder, outside d/: Cryptomator passes it
         * by, and its health checks (which look at d/) do not report one a browser
         * left behind. Moving from there is still one rename on the server.
         */
        stagingPath() {
          return pt + Ye() + ".tmp";
        }
        /**
         * Removes the staging files and folders that writes which never finished (a
         * browser closed midway) left in the vault's top folder, once they are older
         * than olderThan (milliseconds; LEFTOVER_AGE), so that a write still going on
         * elsewhere is left alone. Nothing for a vault that cannot be written. Returns
         * the names removed.
         */
        async removeLeftovers({ olderThan: t = or, now: o = Date.now() } = {}) {
          if (this.requireKeys(), typeof this.storage.write != "function")
            return [];
          const a = [];
          for (const l of await this.storage.list(""))
            l.name.startsWith(pt) && l.name.endsWith(".tmp") && l.mtime && o - l.mtime.getTime() >= t && (await this.storage.remove(l.name), a.push(l.name));
          return a;
        }
        /**
         * Puts an entry of several files (name -> bytes) together in a staging folder,
         * checks it (check(stagingFolder), if given) and moves it into
         * place in one step; refused if the place is taken meanwhile. The staging
         * folder goes on any failure.
         */
        async stageAndMove(t, o, a) {
          const l = this.stagingPath();
          await this.storage.mkdir(l);
          try {
            for (const [h, f] of Object.entries(o))
              await this.storage.write(T(l, h), f, { create: !0 });
            a && await a(l), await this.storage.move(l, t.path);
          } catch (h) {
            throw await this.storage.remove(l).catch(() => {
            }), h;
          }
        }
        /** Reads a stored file back and compares it with what was written. */
        async checkStored(t, o, a) {
          const l = await this.storage.read(t, a);
          let h;
          try {
            h = await this.decryptContents(l);
          } catch (f) {
            throw new i("corrupt", "the stored file does not decrypt: " + f.message);
          }
          if (!S(await Je(h), o))
            throw new i("corrupt", "the stored file differs from the one written");
        }
        /**
         * Writes a file into a directory. options.replace allows replacing a file of
         * that name (never a folder); onProgress(phase, done, total) with the phases
         * 'encrypt', 'upload' and 'verify'. Returns {name, path, size}.
         */
        async writeFile(t, o, a, l = {}) {
          this.requireWritable();
          const { replace: h = !1, onProgress: f } = l, w = (_) => (V, O) => f?.(_, V, O), y = Ie(o), E = await this.entryPath(t, y), x = await this.existing(E);
          if (x !== null && (x !== "file" || !h))
            throw new i(x === "file" ? "exists" : "exists-other", y);
          const I = await Je(a), N = await this.encryptContents(a, w("encrypt"));
          if (!S(await Je(await this.decryptContents(N)), I))
            throw new i("corrupt", "the encryption does not read back");
          const R = E.long ? T(E.path, "contents.c9r") : E.path;
          if (E.long && x === null)
            return await this.stageAndMove(
              E,
              { "name.c9s": c.encode(E.fullName), "contents.c9r": N },
              (_) => this.checkStored(T(_, "contents.c9r"), I, w("verify"))
            ), { name: y, path: R, size: a.length };
          const F = this.stagingPath();
          try {
            await this.storage.write(F, N, { create: !0, onProgress: w("upload") }), await this.checkStored(F, I, w("verify")), await this.storage.move(F, R, { overwrite: x !== null });
          } catch (_) {
            throw await this.storage.remove(F).catch(() => {
            }), _;
          }
          return { name: y, path: R, size: a.length };
        }
        /** Creates a folder in a directory. Returns {name, dirId}. */
        async createDirectory(t, o) {
          this.requireWritable();
          const a = Ie(o), l = await this.entryPath(t, a);
          if (await this.existing(l) !== null)
            throw new i("exists-other", a);
          const h = Ye(), f = await this.dirPath(h);
          await this.storage.mkdir(f.split("/").slice(0, 2).join("/"), { existsOk: !0 }), await this.storage.mkdir(f);
          try {
            await this.storage.write(T(f, "dirid.c9r"), await this.encryptContents(c.encode(h)), { create: !0 });
            const y = { "dir.c9r": c.encode(h) };
            l.long && (y["name.c9s"] = c.encode(l.fullName)), await this.stageAndMove(l, y);
          } catch (y) {
            throw await this.storage.remove(f).catch(() => {
            }), y;
          }
          const w = (await this.list(t)).find((y) => y.type === "dir" && y.dirId === h);
          if (!w || w.name !== a)
            throw new i("corrupt", "the new folder does not read back");
          return { name: a, dirId: h };
        }
        /**
         * The folder of this name in a directory: the one there (an upload of a folder
         * merges into it), or a new one. Refused where a file or link has the name.
         * Returns {name, dirId, created}.
         */
        async ensureDirectory(t, o) {
          this.requireWritable();
          const a = await this.findEntry(t, o);
          if (a === null)
            return { ...await this.createDirectory(t, o), created: !0 };
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
        async findEntry(t, o) {
          const a = Ie(o), l = await this.entryPath(t, a), h = await this.existing(l);
          if (h === null)
            return null;
          if (h === "unknown")
            throw new i("corrupt", "the entry of " + a + " is neither file, folder nor link");
          return { ...l, name: a, kind: h };
        }
        async entryDirId(t) {
          return u.decode(await this.storage.read(T(t.path, "dir.c9r"))).trim();
        }
        /**
         * Renames and/or moves an entry: from a directory to another (or the same)
         * under a new (or the same) name. Refused where the new name is taken. A
         * folder moved to another directory needs options.ancestors, the IDs of the
         * target's directories from the vault's top ('' first): a folder cannot go into
         * itself or below itself. Returns {name}.
         */
        async moveEntry(t, o, a, l, h = {}) {
          this.requireWritable();
          const f = await this.findEntry(t, o);
          if (f === null)
            throw new i("not-found", String(o));
          const w = Ie(l ?? f.name);
          if (t === a && w === f.name)
            return { name: w };
          if (f.kind === "dir" && t !== a) {
            const E = h.ancestors;
            if (!Array.isArray(E) || E[E.length - 1] !== a)
              throw new i("invalid-move", "the target's ancestors are not known");
            const x = await this.entryDirId(f);
            if (E.includes(x))
              throw new i("invalid-move", f.name);
          }
          const y = await this.entryPath(a, w);
          if (await this.existing(y) !== null)
            throw new i("exists-other", w);
          return !f.long && !y.long ? (await this.storage.move(f.path, y.path), { name: w }) : (await this.rebuildEntry(f, y), await this.storage.remove(f.path), { name: w });
        }
        /**
         * Puts an entry together anew at another place (for a change between short
         * and long names): its files copied on the server into a staging name, a
         * file's contents checked (they decrypt and authenticate), then moved into
         * place in one step. The old entry stays.
         */
        async rebuildEntry(t, o) {
          const a = this.stagingPath(), l = { file: "contents.c9r", dir: "dir.c9r", link: "symlink.c9r" }[t.kind], h = t.long || t.kind !== "file" ? T(t.path, l) : t.path, f = o.long || t.kind !== "file" ? T(a, l) : a;
          try {
            if (f !== a && await this.storage.mkdir(a), await this.storage.copy(h, f), o.long && await this.storage.write(T(a, "name.c9s"), c.encode(o.fullName), { create: !0 }), t.kind !== "dir")
              await this.decryptContents(await this.storage.read(f));
            else if (u.decode(await this.storage.read(f)).trim() !== await this.entryDirId(t))
              throw new i("corrupt", "the copied folder entry differs");
            await this.storage.move(a, o.path);
          } catch (w) {
            throw await this.storage.remove(a).catch(() => {
            }), w;
          }
        }
        /** The IDs of a folder and of every folder below it. */
        async subtree(t) {
          const o = [t];
          for (const a of await this.list(t))
            if (a.type === "dir")
              o.push(...await this.subtree(a.dirId));
            else if (a.type === "broken" && a.path.endsWith(".c9r")) {
              const l = await this.storage.read(T(a.path, "dir.c9r")).then((h) => u.decode(h).trim(), () => null);
              l !== null && o.push(...await this.subtree(l));
            }
          return o;
        }
        /**
         * Deletes an entry: a file or link, or a folder with everything in it (its
         * entry first, so that all of it disappears at once; then the directories of
         * the folder and of every folder below it). Returns {name, folders}.
         */
        async removeEntry(t, o) {
          this.requireWritable();
          const a = await this.findEntry(t, o);
          if (a === null)
            throw new i("not-found", String(o));
          if (a.kind !== "dir")
            return await this.storage.remove(a.path), { name: a.name, folders: 0 };
          const l = await this.subtree(await this.entryDirId(a));
          await this.storage.remove(a.path);
          for (const h of l)
            await this.storage.remove(await this.dirPath(h));
          return { name: a.name, folders: l.length };
        }
        // ----- Health check -----
        //
        // cryptofs' checks (DirIdCheck, ShortenedNamesCheck, CiphertextFileTypeCheck),
        // their findings named as its kinds with its severities, and the repairs it
        // offers (repair): the vault's folder d/ walked as they walk it.
        /**
         * The vault's findings, the worst first: {kind, severity ('CRITICAL', 'WARN' or
         * 'INFO'), path (in the vault's folder), fixable, …}. onProgress(done, total)
         * counts the directories looked into.
         */
        async checkHealth(t) {
          this.requireKeys();
          const o = [], a = (x, I, N, R = {}) => o.push({ kind: x, severity: I, path: N, fixable: !1, ...R }), l = async (x) => {
            try {
              return await this.storage.list(x);
            } catch (I) {
              if (I?.code === "not-found")
                return [];
              throw I;
            }
          }, h = /* @__PURE__ */ new Map([["", null]]), f = /* @__PURE__ */ new Map(), w = [];
          for (const x of (await l("d")).filter((I) => I.isDir))
            for (const I of (await l("d/" + x.name)).filter((N) => N.isDir)) {
              const N = T("d", x.name, I.name), R = await l(N);
              f.set(N, R.some((F) => !F.isDir && F.name === "dirid.c9r"));
              for (const F of R)
                F.isDir ? w.push(T(N, F.name)) : F.name === "dir.c9r" && a("LooseDirFile", "INFO", T(N, F.name), { fixable: !0 });
            }
          let y = 0;
          await rr(w, 8, async (x) => {
            const I = x.split("/").pop(), N = I.endsWith(".c9r"), R = I.endsWith(".c9s"), F = await l(x), _ = (O) => F.find((H) => !H.isDir && H.name === O), V = _("dir.c9r");
            if (V) {
              const O = T(x, "dir.c9r");
              if (!N && !R)
                a("LooseDirFile", "INFO", O, { fixable: !0 });
              else if (V.size > qe)
                a("ObeseDirFile", "CRITICAL", O);
              else if (V.size === 0)
                a("EmptyDirFile", "CRITICAL", O, { fixable: !0 });
              else {
                const H = u.decode(await this.storage.read(O));
                h.has(H) ? a("DirIdCollision", "CRITICAL", O, { dirId: H, other: h.get(H) }) : h.set(H, O);
              }
            }
            if (N || R) {
              const O = [V && "DIRECTORY", _("symlink.c9r") && "SYMLINK", R && _("contents.c9r") && "FILE"].filter(Boolean);
              O.length === 0 ? a("UnknownType", "CRITICAL", x, { fixable: F.length === 0 }) : O.length > 1 && a("AmbiguousType", "CRITICAL", x, { types: O });
            }
            R && await this.checkShortened(x, _("name.c9s"), a), t?.(++y, w.length);
          });
          for (const [x, I] of h) {
            const N = await this.dirPath(x);
            f.has(N) ? (f.get(N) || a("MissingDirIdBackup", "INFO", N, { dirId: x, fixable: !0 }), f.delete(N)) : a("MissingContentDir", "WARN", I ?? N, { dirId: x, fixable: !0 });
          }
          for (const x of f.keys())
            a("OrphanContentDir", "WARN", x, { fixable: !0 });
          const E = { CRITICAL: 0, WARN: 1, INFO: 2 };
          return o.sort((x, I) => E[x.severity] - E[I.severity] || x.kind.localeCompare(I.kind) || x.path.localeCompare(I.path));
        }
        /** cryptofs' ShortenedNamesCheck for one .c9s directory. */
        async checkShortened(t, o, a) {
          const l = T(t, "name.c9s");
          if (!o) {
            a("MissingLongName", "CRITICAL", t);
            return;
          }
          if (o.size > tr) {
            a("ObeseNameFile", "CRITICAL", l);
            return;
          }
          const h = u.decode(await this.storage.read(l)), f = h.indexOf(".c9r");
          if (f === -1 || !/^[A-Za-z0-9_-]*={0,2}$/.test(h.slice(0, f)) || h.slice(0, f).length % 4 !== 0) {
            a("NotDecodableLongName", "CRITICAL", l);
            return;
          }
          if (h.length > f + 4) {
            a("TrailingBytesInNameFile", "WARN", l, { longName: h, fixable: !0 });
            return;
          }
          const w = d(new Uint8Array(await r.digest("SHA-1", c.encode(h))), !0) + ".c9s";
          t.split("/").pop() !== w && a("LongShortNamesMismatch", "WARN", t, { expected: w, fixable: !0 });
        }
        /** Applies the repair cryptofs offers for a finding of checkHealth. */
        async repair(t) {
          this.requireWritable();
          const o = (a) => a.split("/").slice(0, -1).join("/");
          switch (t.kind) {
            case "LooseDirFile":
              await this.storage.remove(t.path);
              return;
            case "EmptyDirFile": {
              await this.storage.remove(t.path), (await this.storage.list(o(t.path))).length === 0 && await this.storage.remove(o(t.path));
              return;
            }
            case "MissingContentDir":
            case "MissingDirIdBackup": {
              const a = await this.dirPath(t.dirId);
              await this.storage.mkdir(o(a), { existsOk: !0 }), await this.storage.mkdir(a, { existsOk: !0 }), await this.storage.write(T(a, "dirid.c9r"), await this.encryptContents(c.encode(t.dirId)), { create: !0 });
              return;
            }
            case "LongShortNamesMismatch":
              await this.storage.move(t.path, T(o(t.path), t.expected));
              return;
            case "TrailingBytesInNameFile":
              await this.storage.write(t.path, c.encode(t.longName.slice(0, t.longName.indexOf(".c9r") + 4)));
              return;
            case "UnknownType":
              await this.storage.remove(t.path);
              return;
            case "OrphanContentDir":
              await this.adoptOrphan(t.path);
              return;
            default:
              throw new i("not-repairable", t.kind);
          }
        }
        /**
         * The entries of a directory no folder points to, rescued as cryptofs rescues
         * them (OrphanContentDir): into /LOST+FOUND/<the directory's d/ path, XX and
         * YYY joined>/, by their names where the directory's ID backup decrypts them,
         * else as file1_…, directory1_…, symlink1_…; anything else in it moved along.
         */
        async adoptOrphan(t) {
          const o = await this.dirPath(""), a = T(o, await this.encryptedName(Gt, "")), l = T(a, "dir.c9r");
          if (await this.storage.stat(l)) {
            if (u.decode(await this.storage.read(l)) !== Ge)
              throw new i("exists-other", "/" + Gt);
          } else
            await this.storage.mkdir(a, { existsOk: !0 }), await this.storage.write(l, c.encode(Ge), { create: !0 });
          const h = await this.ensureContentDir(Ge);
          if (h === t)
            return;
          const f = T(h, await this.encryptedName(t.split("/").slice(1).join(""), Ge)), w = T(f, "dir.c9r");
          let y;
          await this.storage.stat(w) ? y = u.decode(await this.storage.read(w)) : (y = Ye(), await this.storage.mkdir(f, { existsOk: !0 }), await this.storage.write(w, c.encode(y), { create: !0 }));
          const E = await this.ensureContentDir(y);
          let x = null;
          try {
            x = u.decode(await this.decryptContents(await this.storage.read(T(t, "dirid.c9r"))));
          } catch {
          }
          const I = Math.floor(Math.random() * 65536).toString(32), N = { file: 0, directory: 0, symlink: 0 }, R = "_withVeryLongName".repeat((((Jt - 4) / 4 | 0) * 3 - 16) % 17 + 1), F = await this.storage.list(t);
          for (const _ of F) {
            if (_.name.length < nr || !(_.name.endsWith(".c9r") || _.name.endsWith(".c9s")))
              continue;
            const V = _.name.endsWith(".c9s"), O = T(t, _.name);
            let H = null;
            if (x !== null)
              try {
                const ue = V ? u.decode(await this.storage.read(T(O, "name.c9s"))) : _.name;
                H = await this.decryptName(ue, x);
              } catch {
              }
            if (H === null) {
              const ue = _.isDir ? await this.storage.list(O) : [], rn = ue.some((gt) => gt.name === "dir.c9r") ? "directory" : ue.some((gt) => gt.name === "symlink.c9r") ? "symlink" : "file";
              H = rn + ++N[rn] + "_" + I + (V ? R : "");
            }
            const ce = await this.encryptedName(H, y);
            if (V) {
              const ue = d(new Uint8Array(await r.digest("SHA-1", c.encode(ce))), !0) + ".c9s";
              await this.storage.move(O, T(E, ue)), await this.storage.write(T(E, ue, "name.c9s"), c.encode(ce));
            } else
              await this.storage.move(O, T(E, ce));
          }
          await this.storage.remove(T(t, "dirid.c9r"));
          for (const _ of await this.storage.list(t))
            await this.storage.move(T(t, _.name), T(E, _.name));
          await this.storage.remove(t);
        }
        /** An entry's encrypted name (.c9r) in a directory, not shortened. */
        async encryptedName(t, o) {
          return d(await this.siv.encrypt(c.encode(t), [c.encode(o)]), !0) + ".c9r";
        }
        /** A directory's folder in d/, made with its ID's backup where missing. */
        async ensureContentDir(t) {
          const o = await this.dirPath(t);
          return await this.storage.mkdir(o.split("/").slice(0, 2).join("/"), { existsOk: !0 }), await this.storage.mkdir(o, { existsOk: !0 }), await this.storage.stat(T(o, "dirid.c9r")) || await this.storage.write(T(o, "dirid.c9r"), await this.encryptContents(c.encode(t)), { create: !0 }), o;
        }
      }
      return { Vault: ve, VaultError: i, cleartextSize: fe, checkName: Ie, scrypt: re, Siv: X, Cmac: Z, base32Encode: k, base64UrlEncode: d, base64Decode: p, encodeRecoveryKey: en, decodeRecoveryKey: tn, VAULT_CONFIG: $e, STAGING_PREFIX: pt };
    });
  })(Qe)), Qe.exports;
}
var Ir = Sr();
const En = /* @__PURE__ */ pr(Ir), Sn = "cryptomator_vaults";
function s(e, n) {
  return fr(Sn, e, n, void 0, { escape: !1 });
}
function vt(e, n, r, c) {
  return mr(Sn, e, n, r, c, { escape: !1 });
}
const Nr = 100 * 1024 * 1024, Mr = 5 * 1024 * 1024, In = 1024 * 1024 * 1024, St = /* @__PURE__ */ new Set();
function g(e, n, r) {
  const c = document.createElement(e);
  for (const [u, i] of Object.entries(n || {}))
    i == null || i === !1 || (u === "class" ? c.className = i : u.startsWith("on") ? c.addEventListener(u.slice(2), i) : c.setAttribute(u, i === !0 ? "" : i));
  for (const u of [].concat(r ?? []))
    u != null && u !== !1 && c.append(u instanceof Node ? u : document.createTextNode(String(u)));
  return c;
}
function tt(e) {
  if (window.OC?.Util?.humanFileSize)
    return window.OC.Util.humanFileSize(e);
  const n = ["B", "KB", "MB", "GB", "TB"];
  let r = e, c = 0;
  for (; r >= 1024 && c < n.length - 1; )
    r /= 1024, c++;
  return (c === 0 ? r : r.toFixed(1)) + " " + n[c];
}
function Te(e, n) {
  const r = URL.createObjectURL(new Blob([e], { type: n }));
  return St.add(r), r;
}
function Tr() {
  for (const e of St)
    URL.revokeObjectURL(e);
  St.clear(), G();
}
function Nn(e, n) {
  const r = g("a", { href: Te(n, "application/octet-stream"), download: e });
  document.body.append(r), r.click(), r.remove();
}
let we = null;
function G() {
  if (we) {
    const { dialog: e, onClose: n } = we;
    we = null, e.remove(), n?.();
  }
}
function pe(e, n, r) {
  G();
  const c = g("div", {
    class: "cryptomator-dialog",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": e,
    onkeydown: (u) => {
      u.key === "Escape" && G();
    },
    onclick: (u) => {
      u.target === c && G();
    }
  }, g("div", { class: "cryptomator-dialog__panel" }, n));
  return we = { dialog: c, onClose: r }, document.body.append(c), c;
}
function z(e, n) {
  return g("p", { class: "cryptomator-notice" + (n ? " cryptomator-notice--" + n : ""), role: n === "error" ? "alert" : null }, e);
}
function Rr(e, n, r) {
  return new Promise((c) => {
    let u = !1;
    const i = g("input", {
      type: "text",
      name: "username",
      autocomplete: "username",
      readonly: !0,
      class: "cryptomator-unlock__account",
      "aria-label": s("Vault")
    });
    i.value = r;
    const p = g("input", { type: "password", name: "password", autocomplete: "current-password", required: !0, "aria-label": s("Password") }), d = g("div", { "aria-live": "polite" }), m = g("button", { type: "submit", class: "primary" }, s("Unlock"));
    pe(e, [
      g("h2", {}, s("Unlock {vault}", { vault: e })),
      z(s("The password and the vault's keys stay in this browser tab: the server only sends the encrypted files.")),
      g("form", {
        class: "cryptomator-unlock",
        name: "cryptomator-unlock",
        method: "post",
        action: "#",
        autocomplete: "on",
        onsubmit: async (v) => {
          v.preventDefault(), m.disabled = !0, d.replaceChildren(z(s("Unlocking …"))), await new Promise((k) => setTimeout(k, 30));
          try {
            await n(p.value), p.value = "", u = !0, G(), c(!0);
          } catch (k) {
            m.disabled = !1, d.replaceChildren(z(k.message, "error")), p.select();
          }
        }
      }, [
        g("label", {}, [s("Vault"), i]),
        g("label", {}, [s("Password"), p]),
        m,
        g("button", { type: "button", onclick: G }, s("Cancel"))
      ]),
      d
    ], () => {
      p.value = "", u || c(!1);
    }), p.focus();
  });
}
const Dr = ["png", "jpg", "jpeg", "gif", "webp", "avif", "bmp", "svg"], on = { mp4: "video/mp4", m4v: "video/mp4", webm: "video/webm", mov: "video/quicktime", ogv: "video/ogg" }, sn = { mp3: "audio/mpeg", m4a: "audio/mp4", ogg: "audio/ogg", oga: "audio/ogg", opus: "audio/ogg", wav: "audio/wav", flac: "audio/flac" }, Fr = [
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
function Or(e) {
  return Mn(e).kind !== "none";
}
function Mn(e) {
  const n = (/\.([^.]+)$/.exec(e)?.[1] ?? "").toLowerCase();
  return Dr.includes(n) ? { kind: "image", type: n === "svg" ? "image/svg+xml" : "image/" + (n === "jpg" ? "jpeg" : n) } : n === "pdf" ? { kind: "pdf", type: "application/pdf" } : n in on ? { kind: "video", type: on[n] } : n in sn ? { kind: "audio", type: sn[n] } : Fr.includes(n) ? { kind: "text", type: "text/plain" } : n === "docx" ? { kind: "docx" } : ["pptx", "odp", "odt"].includes(n) ? { kind: n } : ["md", "markdown"].includes(n) ? { kind: "markdown" } : n === "zip" ? { kind: "zip" } : ["heic", "heif"].includes(n) ? { kind: "heic" } : ["xlsx", "xls", "ods"].includes(n) ? { kind: "sheet" } : { kind: "none" };
}
const Tn = {
  docx: async (e) => (await import("./cryptomator_vaults-documents-DqUUeel0.mjs")).docxPage(e),
  sheet: async (e) => (await import("./cryptomator_vaults-documents-DqUUeel0.mjs")).sheetPage(e),
  pptx: async (e) => (await import("./cryptomator_vaults-office-DHvoruxl.mjs")).pptxPage(e),
  odp: async (e) => (await import("./cryptomator_vaults-office-DHvoruxl.mjs")).odpPage(e),
  odt: async (e) => (await import("./cryptomator_vaults-office-DHvoruxl.mjs")).odtPage(e),
  markdown: async (e) => (await import("./cryptomator_vaults-previews-9VMwwVCs.mjs")).markdownPage(e),
  zip: async (e) => (await import("./cryptomator_vaults-previews-9VMwwVCs.mjs")).zipPage(e)
};
function _r(e) {
  return e in Tn || e === "heic";
}
async function Pr(e, n, r) {
  if (e.kind === "heic") {
    const u = await (await import("./cryptomator_vaults-previews-9VMwwVCs.mjs")).heicToPng(n);
    return g("img", { class: "cryptomator-preview", src: Te(u, "image/png"), alt: r });
  }
  const c = await Tn[e.kind](n);
  return g("iframe", { class: "cryptomator-preview cryptomator-preview--frame cryptomator-preview--document", sandbox: "", referrerpolicy: "no-referrer", title: r, srcdoc: c });
}
function zr(e, n, r) {
  switch (e.kind) {
    case "image":
      return g("img", { class: "cryptomator-preview", src: Te(n, e.type), alt: r });
    case "pdf":
      return g("iframe", { class: "cryptomator-preview cryptomator-preview--frame", src: Te(n, e.type), title: r });
    case "video":
      return g("video", { class: "cryptomator-preview", src: Te(n, e.type), controls: !0 });
    case "audio":
      return g("audio", { class: "cryptomator-preview", src: Te(n, e.type), controls: !0 });
    case "text":
      return g("pre", { class: "cryptomator-preview cryptomator-preview--text" }, new TextDecoder("utf-8").decode(n));
    default:
      return z(s("No preview for this file. Download it to open it."));
  }
}
async function Lr(e, n, r, c) {
  const u = Mn(e), i = u.kind !== "none" && n <= (u.kind === "text" ? Mr : Nr);
  if (!i && n > In && !window.confirm(s("This file is {size}. Your browser holds it twice while decrypting. Continue?", { size: tt(n) })))
    return;
  const p = g("progress", { max: 1, value: 0 }), d = g("div", { class: "cryptomator-dialog__body" }, [z(s("Decrypting …")), p]), m = g("button", { type: "button", disabled: !0 }, s("Download")), v = pe(e, [
    g("div", { class: "cryptomator-dialog__head" }, [
      g("h2", {}, e),
      g("span", { class: "cryptomator-dialog__meta" }, tt(n)),
      m,
      g("button", { type: "button", class: "cryptomator-dialog__close", onclick: G }, s("Close"))
    ]),
    d
  ]);
  v.querySelector(".cryptomator-dialog__close").focus();
  try {
    const k = await r((A, C) => {
      p.value = 0.5 + A / C / 2;
    }, (A, C) => {
      p.value = A / C / 2;
    });
    if (we?.dialog !== v)
      return;
    if (m.disabled = !1, m.addEventListener("click", () => Nn(e, k)), !i)
      d.replaceChildren(z(s("No preview for this file. Download it to open it.")));
    else if (_r(u.kind)) {
      d.replaceChildren(z(s("Preparing the preview …")));
      try {
        const A = await Pr(u, k, e);
        we?.dialog === v && d.replaceChildren(A);
      } catch (A) {
        we?.dialog === v && d.replaceChildren(z(s("This document cannot be previewed: {detail}. Download it to open it.", { detail: A.message }), "error"));
      }
    } else
      d.replaceChildren(zr(u, k, e));
  } catch (k) {
    we?.dialog === v && d.replaceChildren(z(c(k), "error"));
  }
}
function Rn(e, n, r, { initial: c = "", action: u = s("Create") } = {}) {
  return new Promise((i) => {
    let p = !1;
    const d = g("input", { type: "text", required: !0, "aria-label": n, autocomplete: "off" });
    d.value = c;
    const m = g("div", { "aria-live": "polite" });
    pe(e, [
      g("h2", {}, e),
      g("form", {
        class: "cryptomator-unlock",
        onsubmit: (k) => {
          k.preventDefault();
          const A = r(d.value);
          if (A) {
            m.replaceChildren(z(A, "error"));
            return;
          }
          p = !0;
          const C = d.value;
          G(), i(C);
        }
      }, [
        g("label", {}, [n, d]),
        g("button", { type: "submit", class: "primary" }, u),
        g("button", { type: "button", onclick: G }, s("Cancel"))
      ]),
      m
    ], () => {
      p || i(null);
    }), d.focus();
    const v = c.lastIndexOf(".");
    d.setSelectionRange(0, v > 0 ? v : c.length);
  });
}
function Ur(e, n, r) {
  return new Promise((c) => {
    let u = !1;
    pe(e, [
      g("h2", {}, e),
      z(n),
      g("div", { class: "cryptomator-choices" }, [
        g("button", { type: "button", class: "error primary", onclick: () => {
          u = !0, G();
        } }, r),
        g("button", { type: "button", onclick: G }, s("Cancel"))
      ])
    ], () => c(u)), document.querySelector(".cryptomator-dialog button:last-child")?.focus();
  });
}
function Hr(e, n, r, c, u) {
  return new Promise((i) => {
    let p = null, d = [{ name: n, dirId: "" }];
    const m = g("ol", { class: "cryptomator-crumbs" }), v = g("ul", { class: "cryptomator-folders" }), k = g("button", { type: "button", class: "primary", onclick: () => {
      p = { dirId: d[d.length - 1].dirId, ancestors: d.map((C) => C.dirId) }, G();
    } }, u), A = async () => {
      m.replaceChildren(...d.map((C, S) => g("li", {}, S === d.length - 1 ? g("span", { "aria-current": "page" }, C.name) : g("button", { type: "button", onclick: () => {
        d = d.slice(0, S + 1), A();
      } }, C.name)))), v.replaceChildren(z(s("Loading …")));
      try {
        const C = (await r(d[d.length - 1].dirId)).sort((S, M) => S.name.localeCompare(M.name));
        v.replaceChildren(...C.length ? C.map((S) => g("li", {}, g("button", {
          type: "button",
          class: "cryptomator-folders__item",
          disabled: c.has(S.dirId),
          onclick: () => {
            d = [...d, S], A();
          }
        }, S.name))) : [z(s("No folders in here."))]);
      } catch (C) {
        v.replaceChildren(z(C.message, "error"));
      }
    };
    pe(e, [
      g("h2", {}, e),
      g("nav", {}, m),
      g("div", { class: "cryptomator-dialog__body" }, v),
      g("div", { class: "cryptomator-choices" }, [k, g("button", { type: "button", onclick: G }, s("Cancel"))])
    ], () => i(p)), A();
  });
}
function Dn(e) {
  const n = g("ul", { class: "cryptomator-uploads" }), r = g("progress", { max: 1, value: 0 }), c = g("div", { "aria-live": "polite" }), u = g("div", { class: "cryptomator-question", hidden: !0 });
  let i = !1;
  const p = g("button", { type: "button", onclick: () => {
    i = !0, p.disabled = !0, p.textContent = s("Stopping after this file …");
  } }, s("Stop")), d = g("button", { type: "button", class: "primary", hidden: !0, onclick: G }, s("Close"));
  return pe(e, [
    g("div", { class: "cryptomator-dialog__head" }, [g("h2", {}, e), p, d]),
    r,
    u,
    g("div", { class: "cryptomator-dialog__body" }, n),
    c
  ]), {
    get stopped() {
      return i;
    },
    file(m) {
      const v = g("span", { class: "cryptomator-dialog__meta" }, s("Waiting")), k = g("progress", { max: 1, value: 0 });
      return n.append(g("li", {}, [g("span", { class: "cryptomator-uploads__name" }, m), v, k])), {
        phase(A, C) {
          v.textContent = A, k.value = C;
        },
        done(A, C) {
          v.textContent = A, v.classList.toggle("cryptomator-notice--error", !!C), k.value = 1;
        }
      };
    },
    /**
     * What to do with a taken name: 'replace', 'skip', 'replace-all', 'skip-all' or
     * 'cancel'; text and cancel tell what replacing does and what stops.
     */
    ask(m, v, { text: k, cancel: A } = {}) {
      return new Promise((C) => {
        const S = (M) => () => {
          u.hidden = !0, u.replaceChildren(), C(M);
        };
        u.replaceChildren(
          g("h3", {}, s("“{name}” already exists", { name: m })),
          z(k || s("Replace the file in the vault with the one you chose? The vault keeps no copy of the old one; Nextcloud's versions keep its encrypted file.")),
          g("div", { class: "cryptomator-choices" }, [
            g("button", { type: "button", class: "primary", onclick: S("replace") }, s("Replace")),
            g("button", { type: "button", onclick: S("skip") }, s("Skip")),
            v > 1 ? g("button", { type: "button", onclick: S("replace-all") }, s("Replace all")) : null,
            v > 1 ? g("button", { type: "button", onclick: S("skip-all") }, s("Skip all")) : null,
            g("button", { type: "button", onclick: S("cancel") }, A || s("Cancel upload"))
          ])
        ), u.hidden = !1, u.querySelector("button").focus();
      });
    },
    progress(m) {
      r.value = m;
    },
    finish(m, v) {
      r.value = 1, p.hidden = !0, d.hidden = !1, c.replaceChildren(z(m, v ? "error" : void 0)), d.focus();
    }
  };
}
function Be({ title: e, intro: n, fields: r, action: c, working: u, run: i }) {
  return new Promise((p) => {
    let d = null;
    const m = {}, v = g("div", { "aria-live": "polite" }), k = g("button", { type: "submit", class: "primary" }, c), A = r.map((C) => {
      const S = C.type === "textarea" ? g("textarea", { name: C.name, rows: 4, required: !0, spellcheck: "false", autocomplete: "off", class: "cryptomator-form__words" }) : g("input", {
        type: C.type ?? "text",
        name: C.name,
        autocomplete: C.autocomplete ?? "off",
        required: !C.readonly && !C.optional,
        readonly: C.readonly || null,
        class: C.account ? "cryptomator-unlock__account" : null
      });
      return S.value = C.value ?? "", m[C.name] = S, g("label", {}, [C.label, S]);
    });
    pe(e, [
      g("h2", {}, e),
      ...n ? [].concat(n).map((C) => z(C)) : [],
      g("form", {
        class: "cryptomator-unlock cryptomator-form",
        method: "post",
        action: "#",
        autocomplete: "on",
        onsubmit: async (C) => {
          C.preventDefault(), k.disabled = !0, v.replaceChildren(z(u ?? s("Working …"))), await new Promise((S) => setTimeout(S, 30));
          try {
            d = await i(Object.fromEntries(Object.entries(m).map(([S, M]) => [S, M.value]))), G();
          } catch (S) {
            k.disabled = !1, v.replaceChildren(z(S.message, "error"));
          }
        }
      }, [...A, g("div", { class: "cryptomator-choices" }, [k, g("button", { type: "button", onclick: G }, s("Cancel"))])]),
      v
    ], () => {
      for (const C of Object.values(m))
        (C.type === "password" || C.tagName === "TEXTAREA") && (C.value = "");
      p(d);
    }), Object.values(m).find((C) => !C.readOnly)?.focus();
  });
}
function Fn(e, n, { created: r = !1 } = {}) {
  return new Promise((c) => {
    const u = g("div", { class: "cryptomator-recovery-key", tabindex: "0" }, n), i = g("span", { class: "cryptomator-dialog__meta", "aria-live": "polite" });
    pe(s("Recovery key"), [
      g("h2", {}, r ? s("{vault} is ready", { vault: e }) : s("Recovery key of {vault}", { vault: e })),
      z(s("With this recovery key you can set a new password if you forget the one you have, here or in Cryptomator. Anyone who has it can open the vault: keep it on paper or in your password manager, not in this cloud.")),
      u,
      g("div", { class: "cryptomator-choices" }, [
        g("button", { type: "button", onclick: async () => {
          try {
            await navigator.clipboard.writeText(n), i.textContent = s("Copied");
          } catch {
            i.textContent = s("Copying is not allowed here: select the words and copy them.");
          }
        } }, s("Copy")),
        i,
        g("button", { type: "button", class: "primary", onclick: G }, s("Done"))
      ])
    ], () => {
      u.textContent = "", c();
    }), u.focus();
  });
}
function Vr(e, { check: n, describe: r, repair: c }) {
  const u = g("div", { class: "cryptomator-dialog__body" }), i = g("div", { "aria-live": "polite" }), p = g("progress", { max: 1, value: 0 }), d = { CRITICAL: s("Damaged"), WARN: s("Needs repair"), INFO: s("Note") }, m = async () => {
    u.replaceChildren(), p.hidden = !1, p.value = 0, i.replaceChildren(z(s("Checking the vault …")));
    let v;
    try {
      v = await n((C, S) => {
        p.value = S ? C / S : 1;
      });
    } catch (C) {
      p.hidden = !0, i.replaceChildren(z(C.message, "error"));
      return;
    }
    if (p.hidden = !0, v.length === 0) {
      i.replaceChildren(z(s("The vault is healthy: the check found nothing to repair.")));
      return;
    }
    u.append(g("ul", { class: "cryptomator-findings" }, v.map((C) => g("li", {}, [
      g("span", { class: "cryptomator-findings__severity cryptomator-findings__severity--" + C.severity.toLowerCase() }, d[C.severity]),
      g("span", {}, r(C)),
      g("code", { class: "cryptomator-dialog__meta" }, C.path)
    ]))));
    const k = v.filter((C) => C.fixable), A = [];
    k.length && A.push(g("button", { type: "button", class: "primary", onclick: async (C) => {
      C.target.disabled = !0, i.replaceChildren(z(s("Repairing …")));
      try {
        await c(k);
      } catch (S) {
        i.replaceChildren(z(S.message, "error"));
        return;
      }
      await m();
    } }, s("Repair {count}", { count: k.length }))), i.replaceChildren(
      z(k.length === v.length ? s("Each of these can be repaired, as Cryptomator's health check repairs it.") : s("{count} of these can be repaired, as Cryptomator's health check repairs them; the others need Cryptomator or a backup.", { count: k.length })),
      g("div", { class: "cryptomator-choices" }, A)
    );
  };
  pe(s("Health check"), [
    g("div", { class: "cryptomator-dialog__head" }, [
      g("h2", {}, s("Health check of {vault}", { vault: e })),
      g("button", { type: "button", onclick: G }, s("Close"))
    ]),
    p,
    u,
    i
  ]), m();
}
const { VaultError: J } = En, bt = "DAV:", Br = "http://owncloud.org/ns", kt = "http://nextcloud.org/ns", cn = '<?xml version="1.0"?><d:propfind xmlns:d="DAV:" xmlns:oc="http://owncloud.org/ns" xmlns:nc="http://nextcloud.org/ns"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getetag/><oc:permissions/><nc:upload_time/></d:prop></d:propfind>', Kr = 20 * 1024 * 1024, ln = 10 * 1024 * 1024;
function Wr() {
  return window.OC && window.OC.requestToken || document.head.dataset.requesttoken || "";
}
function ae(e) {
  return { requesttoken: Wr(), "X-Requested-With": "XMLHttpRequest", ...e || {} };
}
function ye() {
  return wr()?.uid ?? "";
}
function et(e) {
  return e.split("/").filter((n) => n !== "").map(encodeURIComponent).join("/");
}
function jr(e) {
  const n = et(e);
  return ot("dav") + "/files/" + encodeURIComponent(ye()) + "/" + (n ? n + "/" : "");
}
function Ue(e) {
  const n = new DOMParser().parseFromString(e, "application/xml");
  return Array.from(n.getElementsByTagNameNS(bt, "response")).map((r) => {
    const c = (d, m = bt) => r.getElementsByTagNameNS(m, d)[0], u = c("getcontentlength"), i = c("getlastmodified"), p = Number(c("upload_time", kt)?.textContent) || 0;
    return {
      href: c("href").textContent,
      isDir: r.getElementsByTagNameNS(bt, "collection").length > 0,
      size: u ? Number(u.textContent) : 0,
      mtime: i ? new Date(i.textContent) : void 0,
      uploadTime: p ? new Date(p * 1e3) : void 0,
      etag: c("getetag")?.textContent || void 0,
      permissions: c("permissions", Br)?.textContent ?? "",
      originalLocation: c("trashbin-original-location", kt)?.textContent,
      deletionTime: Number(c("trashbin-deletion-time", kt)?.textContent) || 0
    };
  });
}
function qr(e) {
  const n = e.replace(/\/+$/, "").split("/");
  return decodeURIComponent(n[n.length - 1]);
}
function me(e, n, r) {
  return e === 0 ? new J("network", (r ? r + ": " : "") + "redirected (signed out?)") : e === 404 ? new J("not-found", n) : e === 412 || e === 405 ? new J("exists", n) : e === 507 ? new J("quota", n) : new J("network", (r ? r + ": " : "") + "HTTP " + e);
}
function Me(e, n) {
  return e >= 200 && e < 300 && !n;
}
function un(e, n, r, c, u) {
  return new Promise((i, p) => {
    const d = new XMLHttpRequest();
    d.open(e, n);
    for (const [m, v] of Object.entries(ae(r)))
      d.setRequestHeader(m, v);
    u && d.upload.addEventListener("progress", (m) => u(m.loaded, m.total)), d.addEventListener("load", () => i(new URL(d.responseURL, n).href === new URL(n, window.location.href).href ? d.status : 0)), d.addEventListener("error", () => p(new J("network", e + " failed"))), d.addEventListener("abort", () => p(new J("network", e + " aborted"))), d.send(c ?? null);
  });
}
async function ze(e, n, r, c, u = []) {
  const i = await fetch(n, { method: e, headers: ae(r), credentials: "same-origin" });
  if (!Me(i.status, i.redirected) && !u.includes(i.status))
    throw me(i.redirected ? 0 : i.status, c, e);
  return i;
}
function se(e) {
  const n = jr(e), r = (i) => n + et(i);
  async function c(i, p, d, m, v) {
    const k = ot("dav") + "/uploads/" + encodeURIComponent(ye()) + "/cryptomator-vaults-" + crypto.randomUUID(), A = new URL(r(i), window.location.href).href, C = { Destination: A, "OC-Total-Length": String(p) };
    await ze("MKCOL", k, { Destination: A }, i);
    try {
      let S = 0, M = 1;
      for await (const q of d) {
        const U = await un(
          "PUT",
          k + "/" + String(M).padStart(5, "0"),
          C,
          q,
          (P) => v?.(S + P, p)
        );
        if (!Me(U, !1))
          throw me(U, i, "PUT (part " + M + ")");
        S += q.length, M++;
      }
      const j = await fetch(k + "/.file", {
        method: "MOVE",
        headers: ae({ ...C, Overwrite: m ? "F" : "T" }),
        credentials: "same-origin"
      });
      if (!Me(j.status, j.redirected))
        throw me(j.redirected ? 0 : j.status, i, "MOVE (assembling the parts)");
    } catch (S) {
      throw await fetch(k, { method: "DELETE", headers: ae(), credentials: "same-origin" }).catch(() => {
      }), S;
    }
  }
  function* u(i) {
    for (let p = 0; p < i.length; p += ln)
      yield i.subarray(p, Math.min(p + ln, i.length));
  }
  return {
    async read(i, p) {
      const d = await fetch(n + et(i), { headers: ae(), credentials: "same-origin" });
      if (d.status === 404)
        throw new J("not-found", i);
      if (!d.ok)
        throw new J("network", "GET: HTTP " + d.status);
      const m = Number(d.headers.get("Content-Length")) || 0;
      if (!p || !d.body || m === 0)
        return new Uint8Array(await d.arrayBuffer());
      const v = new Uint8Array(m), k = d.body.getReader();
      let A = 0;
      for (; ; ) {
        const { done: C, value: S } = await k.read();
        if (C)
          break;
        v.set(S, A), A += S.length, p(A, m);
      }
      return v.subarray(0, A);
    },
    async stat(i) {
      const p = await fetch(r(i), {
        method: "PROPFIND",
        headers: ae({ Depth: "0", "Content-Type": "application/xml; charset=utf-8" }),
        credentials: "same-origin",
        body: cn
      });
      if (p.status === 404)
        return null;
      if (p.status !== 207)
        throw me(p.status, i, "PROPFIND");
      const [d] = Ue(await p.text());
      return { isDir: d.isDir, size: d.size, etag: d.etag, permissions: d.permissions };
    },
    /** Stores a file whole; create: refused (VaultError 'exists') if the name is taken. */
    async write(i, p, { create: d = !1, onProgress: m } = {}) {
      if (p.length >= Kr)
        return c(i, p.length, u(p), d, m);
      const v = await un("PUT", r(i), d ? { "If-None-Match": "*" } : {}, p, m);
      if (!Me(v, !1))
        throw me(v, i, "PUT");
    },
    /** A file too large to hold, from its parts in turn (chunked upload); complete or absent. */
    async writeParts(i, p, d, { create: m = !1, onProgress: v } = {}) {
      return c(i, p, d, m, v);
    },
    /** Bytes start to end (exclusive) of a stored file. */
    async readRange(i, p, d) {
      if (d <= p)
        return new Uint8Array(0);
      const m = await fetch(r(i), {
        headers: ae({ Range: "bytes=" + p + "-" + (d - 1) }),
        credentials: "same-origin"
      });
      if (m.status === 404)
        throw new J("not-found", i);
      if (m.status === 206)
        return new Uint8Array(await m.arrayBuffer());
      if (m.status === 200)
        return new Uint8Array(await m.arrayBuffer()).slice(p, d);
      throw new J("network", "GET (range): HTTP " + m.status);
    },
    async mkdir(i, { existsOk: p = !1 } = {}) {
      const d = await fetch(r(i), { method: "MKCOL", headers: ae(), credentials: "same-origin" });
      if (!(Me(d.status, d.redirected) || d.status === 405 && p))
        throw me(d.status, i, "MKCOL");
    },
    /** Moves in one step; refused (VaultError 'exists') if the target is taken, unless overwrite. */
    async move(i, p, { overwrite: d = !1 } = {}) {
      await ze("MOVE", r(i), { Destination: new URL(r(p), window.location.href).href, Overwrite: d ? "T" : "F" }, p);
    },
    /** Copies on the server; refused (VaultError 'exists') if the target is taken. */
    async copy(i, p) {
      await ze("COPY", r(i), { Destination: new URL(r(p), window.location.href).href, Overwrite: "F" }, p);
    },
    async remove(i) {
      await ze("DELETE", r(i), {}, i, [404]);
    },
    /**
     * Deletes a file or folder only as it was (its ETag): VaultError 'changed' if it
     * changed meanwhile (a folder: anything inside it), 'not-found' if it is gone.
     * A file's DELETE carries If-Match; Nextcloud refuses that on folders, so a
     * folder's ETag is compared just before.
     */
    async removeUnchanged(i, p, { isDir: d = !1 } = {}) {
      if (d) {
        const v = await this.stat(i);
        if (v === null)
          throw new J("not-found", i);
        if (v.etag !== p)
          throw new J("changed", i);
      }
      const m = await fetch(r(i), { method: "DELETE", headers: ae(d ? {} : { "If-Match": p }), credentials: "same-origin" });
      if (m.status === 412)
        throw new J("changed", i);
      if (!Me(m.status, m.redirected))
        throw me(m.redirected ? 0 : m.status, i, "DELETE");
    },
    async list(i) {
      const p = await fetch(n + (i ? et(i) + "/" : ""), {
        method: "PROPFIND",
        headers: ae({ Depth: "1", "Content-Type": "application/xml; charset=utf-8" }),
        credentials: "same-origin",
        body: cn
      });
      if (p.status === 404)
        throw new J("not-found", i);
      if (!p.ok)
        throw new J("network", "PROPFIND: HTTP " + p.status);
      return Ue(await p.text()).slice(1).map((d) => ({ name: qr(d.href), isDir: d.isDir, size: d.size, mtime: d.mtime, uploadTime: d.uploadTime, etag: d.etag, permissions: d.permissions }));
    }
  };
}
async function On(e) {
  const n = ye(), r = (i) => i.replace(/&/g, "&amp;").replace(/</g, "&lt;"), c = await fetch(ot("dav") + "/", {
    method: "SEARCH",
    headers: ae({ "Content-Type": "text/xml; charset=utf-8" }),
    credentials: "same-origin",
    body: '<?xml version="1.0" encoding="UTF-8"?><d:searchrequest xmlns:d="DAV:"><d:basicsearch><d:select><d:prop><d:displayname/></d:prop></d:select><d:from><d:scope><d:href>/files/' + r(n) + "</d:href><d:depth>infinity</d:depth></d:scope></d:from><d:where><d:like><d:prop><d:displayname/></d:prop><d:literal>" + r(e) + "</d:literal></d:like></d:where></d:basicsearch></d:searchrequest>"
  });
  if (!c.ok)
    throw new Error("HTTP " + c.status);
  const u = "/files/" + n + "/";
  return Ue(await c.text()).map((i) => decodeURIComponent(i.href)).filter((i) => i.endsWith("/" + e) && i.includes(u)).map((i) => "/" + i.slice(i.indexOf(u) + u.length, -("/" + e).length)).map((i) => i.replace(/\/+$/, "") || "/").sort((i, p) => i.localeCompare(p));
}
function Gr() {
  return On("vault.cryptomator");
}
function Yr(e) {
  return On(e);
}
async function Jr(e, n) {
  const r = [];
  for (const c of n) {
    const u = c.replace(/^\/+|\/+$/g, ""), i = u.split("/").pop(), p = await e.stat(u);
    if (p === null)
      throw new J("not-found", u);
    const d = { path: u, name: i, isDir: p.isDir, etag: p.etag, permissions: p.permissions, files: [], folders: [] };
    if (!p.isDir)
      d.files.push({ path: u, name: i, size: p.size, etag: p.etag, dirs: [] });
    else {
      const m = async (v, k) => {
        d.folders.push(k);
        const A = await e.list(v);
        if (A.some((C) => !C.isDir && C.name === "vault.cryptomator"))
          throw new J("contains-vault", v);
        for (const C of A) {
          const S = v + "/" + C.name;
          C.isDir ? await m(S, [...k, C.name]) : d.files.push({ path: S, name: C.name, size: C.size, etag: C.etag, dirs: k });
        }
      };
      await m(u, [i]);
    }
    r.push(d);
  }
  return r;
}
async function Xr(e) {
  return (await It([e])).has(e.replace(/^\/+|\/+$/g, ""));
}
async function It(e, { onlyEmpty: n = !1 } = {}) {
  const r = e.map((m) => m.replace(/^\/+|\/+$/g, "")), c = ot("dav") + "/trashbin/" + encodeURIComponent(ye()) + "/trash/", u = (m) => fetch(m, {
    method: "PROPFIND",
    headers: ae({ Depth: "1", "Content-Type": "application/xml; charset=utf-8" }),
    credentials: "same-origin",
    body: '<?xml version="1.0"?><d:propfind xmlns:d="DAV:" xmlns:nc="http://nextcloud.org/ns"><d:prop><d:resourcetype/><nc:trashbin-original-location/><nc:trashbin-deletion-time/></d:prop></d:propfind>'
  }), i = await u(c);
  if (i.status === 404 || i.status === 405)
    return new Set(r);
  if (i.status !== 207)
    throw me(i.status, r[0] ?? "", "PROPFIND (deleted files)");
  const p = Ue(await i.text()).slice(1), d = /* @__PURE__ */ new Set();
  for (const m of r) {
    const [v] = p.filter((A) => A.originalLocation === m).sort((A, C) => C.deletionTime - A.deletionTime);
    if (!v)
      continue;
    const k = new URL(v.href, window.location.href).href;
    if (n && v.isDir) {
      const A = await u(k);
      if (A.status !== 207 || Ue(await A.text()).length > 1)
        continue;
    }
    await ze("DELETE", k, {}, m, [404]), d.add(m);
  }
  return d;
}
const Re = ".cryptomator-inbox.json", _n = 1, $r = 64 * 1024, Zr = 120 * 1e3;
function xe(e) {
  if (typeof e != "string")
    return null;
  const n = e.normalize("NFC").split("/").filter((r) => r !== "");
  return n.some((r) => r === "." || r === "..") ? null : "/" + n.join("/");
}
function Nt(e) {
  return e.split("/").filter(Boolean);
}
function nt(e, n) {
  return e === n || n === "/" || e.startsWith(n + "/");
}
function Qr(e, n) {
  let r;
  try {
    r = JSON.parse(e);
  } catch {
    return { problem: "invalid" };
  }
  if (r === null || typeof r != "object" || Array.isArray(r))
    return { problem: "invalid" };
  const { version: c } = r;
  if (!Number.isInteger(c) || c < 1)
    return { problem: "invalid" };
  const u = xe(r.vault);
  if (c > _n)
    return { problem: "version", version: c, vault: u, folder: n };
  const i = r.target === void 0 ? "/" : xe(r.target);
  return u === null || i === null || r.from !== void 0 && typeof r.from != "string" ? { problem: "invalid" } : nt(n, u) || nt(u, n) ? { problem: "loop", vault: u, folder: n } : { inbox: { folder: n, vault: u, target: i, from: (r.from ?? "").trim() } };
}
function ea({ vault: e, target: n, from: r }) {
  const c = { version: _n, vault: e, target: n };
  return r && (c.from = r), JSON.stringify(c, null, "	") + `
`;
}
function ta(e, n = Date.now()) {
  const r = [e.mtime, e.uploadTime].filter((c) => c instanceof Date && !Number.isNaN(c.getTime()));
  return r.length === 0 ? !1 : n - Math.max(...r.map((c) => c.getTime())) >= Zr;
}
function na(e, n) {
  if (n < 2)
    return e;
  const r = e.lastIndexOf(".");
  return r > 0 ? e.slice(0, r) + " (" + n + ")" + e.slice(r) : e + " (" + n + ")";
}
async function ra(e, n, r = Date.now()) {
  const c = e.folder.replace(/^\/+/, ""), u = Nt(e.target), i = { ready: [], recent: [], skipped: [], folders: [] }, p = async (d) => {
    const m = [c, ...d].filter(Boolean).join("/"), v = await n(m);
    if (d.length > 0 && v.some((k) => !k.isDir && (k.name === Re || k.name === "vault.cryptomator")))
      return i.skipped.push(d), !1;
    for (const k of v) {
      const A = m ? m + "/" + k.name : k.name;
      if (k.isDir)
        await p([...d, k.name]) && i.folders.push([...d, k.name]);
      else {
        if (d.length === 0 && k.name === Re)
          continue;
        ta(k, r) ? i.ready.push({ path: A, name: k.name, size: k.size, etag: k.etag, permissions: k.permissions ?? "", inner: d, dirs: [...u, ...d] }) : i.recent.push({ path: A, name: k.name });
      }
    }
    return !0;
  };
  return await p([]), i;
}
const { Vault: Ke, VaultError: Le, checkName: Dt } = En;
let xt = null;
function Fe() {
  return xt || (document.head.append(g("link", { rel: "stylesheet", href: Ar("cryptomator_vaults", "css", "cryptomator_vaults-files.css") })), xt = import("./cryptomator_vaults-dialogs-h5ro9skc.mjs")), xt;
}
function W(e) {
  Fe().then(({ showError: n }) => n(e));
}
function Oe(e) {
  Fe().then(({ showInfo: n }) => n(e));
}
const Ft = "cryptomator-vaults", We = "/cryptomator-vaults", Ot = window.location.origin + "/apps/cryptomator_vaults" + We, aa = yr("cryptomator_vaults", "file.svg"), Mt = 15, Pn = "cryptomator_vaults.added", _t = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 3h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-1v1h-3v-1H8v1H5v-1H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v13h16V5zm8 2.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5.5 8h1.5v7H5.5z"/></svg>', oa = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 8a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/></svg>', ia = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>', zn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9V6zm9 14H6V10h12v10z"/></svg>', Ln = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>', Un = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"/></svg>', sa = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.21a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>', ca = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-6 12v-3h-4v-4h4V8l5 5-5 5z"/></svg>', la = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>', ua = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6a5 5 0 0 0-9.9-1l1.95.45A3 3 0 0 1 15 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm0 12H6V10h12v10z"/></svg>', da = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4h-2v4H6V4h7v5h5v1h2V8l-6-6H6zm12 10v3h-4v2h4v3l4-4-4-4z"/></svg>', Pt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v6h2V4h7v5h5v11H6v-4H4v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM10 11v3H2v2h8v3l4-4-4-4z"/></svg>', ha = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2zm5 9h-2v2h-2v-2H9v-2h2V9h2v2h2v2z"/></svg>', $ = /* @__PURE__ */ new Map();
let Ct = null, He = null, oe = { kind: "vaults" };
async function Tt(e, n) {
  const r = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(e)));
  return Array.from(r, (c) => c.toString(16).padStart(2, "0")).join("").slice(0, n);
}
const pa = "r000000000001", Hn = 2 ** 52;
function Vn(e) {
  return Hn + parseInt(e.slice(1, 13), 16);
}
function Bn() {
  try {
    const e = JSON.parse(window.localStorage.getItem(Pn) || "[]");
    return Array.isArray(e) ? e.filter((n) => typeof n == "string") : [];
  } catch {
    return [];
  }
}
function Kn(e) {
  try {
    window.localStorage.setItem(Pn, JSON.stringify([.../* @__PURE__ */ new Set([e, ...Bn()])]));
  } catch {
  }
}
function fa(e) {
  return e.split("/").filter(Boolean).pop() || s("All files");
}
async function zt(e) {
  const n = "v" + await Tt("vault:" + e, 12);
  return $.has(n) || $.set(n, { seg: n, folder: e, name: fa(e), vault: null, dirs: /* @__PURE__ */ new Map(), entries: /* @__PURE__ */ new Map(), nodes: /* @__PURE__ */ new Set() }), $.get(n);
}
function it() {
  return Ct || (Ct = (async () => {
    let e = [];
    try {
      e = await Gr();
    } catch (n) {
      W(s("The search for vaults failed: {detail}", { detail: n.message }));
    }
    for (const n of [.../* @__PURE__ */ new Set([...e, ...Bn()])])
      await zt(n);
  })()), Ct;
}
function ke(e, n, r, c, u = !0) {
  const i = e.split("/").filter(Boolean).pop() || pa, p = new Cn({
    id: Vn(i),
    source: Ot + e,
    root: We,
    owner: ye(),
    displayname: n,
    permissions: Rt.READ,
    mtime: c?.mtime,
    attributes: { cryptomatorVault: r?.seg ?? null, ...c?.attributes }
  });
  return u && r?.nodes.add(p), p;
}
function ma(e, n, r) {
  const c = e.split("/").pop(), u = new Cr({
    id: Vn(c),
    source: Ot + e,
    root: We,
    owner: ye(),
    displayname: n.name,
    mime: "application/octet-stream",
    size: n.size ?? 0,
    mtime: n.mtime,
    permissions: Rt.READ,
    attributes: { "has-preview": !0, previewUrl: aa, cryptomatorVault: r.seg, cryptomatorType: n.type }
  });
  return r.nodes.add(u), u;
}
function L(e) {
  switch (e?.code) {
    case "exists":
    case "exists-other":
      return s("“{name}” already exists in this folder.", { name: e.message });
    case "invalid-name":
      return s("“{name}” cannot be a name in a vault.", { name: e.message });
    case "quota":
      return s("Your storage is full.");
    case "read-only":
      return s("This vault cannot be written to.");
    case "invalid-move":
      return s("A folder cannot be moved into itself or into a folder inside it.");
    case "wrong-password":
      return s("Wrong password.");
    case "unsupported-format":
      return s("This vault has a format the app cannot read (only vault format 8, Cryptomator 1.6 and later).");
    case "unsupported-key":
      return s("This vault keeps its key on a Cryptomator Hub, which the app does not support.");
    case "not-found":
      return s("There is no Cryptomator vault in this folder.");
    case "corrupt":
      return s("The vault is damaged: {detail}", { detail: e.message });
    case "locked":
      return s("The vault is locked.");
    case "invalid-recovery-key":
      return s("This is not the vault's recovery key: {detail}.", { detail: e.message });
    case "changed":
      return s("“{name}” changed meanwhile: it was kept, and the vault may not hold its latest state.", { name: e.message.split("/").pop() });
    case "contains-vault":
      return s("“{name}” holds a Cryptomator vault, which cannot go into a vault.", { name: e.message.split("/").pop() });
    default:
      return s("Something went wrong: {detail}", { detail: e?.message || String(e) });
  }
}
function De(e) {
  window.OCP.Files.Router.goToRoute(null, { view: Ft }, { dir: e });
}
function Lt() {
  return window.OCP?.Files?.Router?.query?.dir || "/";
}
async function Ut(e) {
  if (e.vault?.unlocked)
    return !0;
  try {
    e.vault = e.vault || await Ke.open(se(e.folder));
  } catch (r) {
    return W(L(r)), !1;
  }
  const n = await Rr(e.name, async (r) => {
    try {
      await e.vault.unlock(r);
    } catch (c) {
      throw new Error(L(c));
    }
  }, e.folder);
  return n && (ct(), e.vault.removeLeftovers().catch(() => {
  }), _a(e)), n;
}
async function dn() {
  oe = { kind: "vaults" };
  const e = ke("/", s("Vaults"), null), n = [...$.values()].sort((r, c) => r.name.localeCompare(c.name)).map((r) => ke("/" + r.seg, r.name, r, { attributes: { cryptomatorVaultRoot: !0, cryptomatorFolder: r.folder } }, !1));
  return { folder: e, contents: n };
}
const _e = window.isSecureContext && !!window.crypto?.subtle;
async function wa(e) {
  if (Bt(), !_e)
    return oe = { kind: "insecure" }, { folder: new Cn({ id: Hn + 1, source: Ot + "/", root: We, owner: ye(), permissions: Rt.READ }), contents: [] };
  await it();
  const n = e.split("/").filter(Boolean);
  if (n.length === 0)
    return dn();
  const r = $.get(n[0]);
  if (!r)
    return De("/"), dn();
  if (!r.vault?.unlocked && !await Ut(r))
    return oe = { kind: "locked", vault: r }, { folder: ke(e, r.name, r, { attributes: { cryptomatorVaultRoot: n.length === 1 } }, !1), contents: [] };
  let c = "", u = r.name;
  if (n.length > 1) {
    const d = r.dirs.get(n[n.length - 1]);
    if (!d)
      return De("/" + r.seg), { folder: ke(e, r.name, r), contents: [] };
    c = d.dirId, u = d.name;
  }
  const i = await r.vault.list(c), p = [];
  for (const d of i)
    if (d.type === "dir") {
      const m = "d" + await Tt(r.seg + ":dir:" + d.dirId, 12);
      r.dirs.set(m, { dirId: d.dirId, name: d.name }), p.push(ke(e + "/" + m, d.name, r, { mtime: d.mtime }));
    } else {
      const m = "f" + await Tt(r.seg + ":file:" + d.path, 12);
      r.entries.set(m, d), p.push(ma(e + "/" + m, d, r));
    }
  return oe = { kind: "folder", vault: r, dirId: c, path: e }, { folder: ke(e, u, r, void 0, n.length > 1), contents: p };
}
function ya(e) {
  if (e)
    if (e.replaceChildren(), e.classList.add("cryptomator-empty"), oe.kind === "insecure")
      e.append(z(s("Vaults can only be opened over HTTPS: the browser provides its encryption only there."), "error"));
    else if (oe.kind === "locked") {
      const n = oe.vault;
      e.append(
        g("h2", {}, s("{vault} is locked", { vault: n.name })),
        z(s("Its files are decrypted in this browser tab once you enter its password.")),
        g("button", {
          type: "button",
          class: "primary",
          onclick: async () => {
            await Ut(n) && Pe(n.name);
          }
        }, s("Unlock"))
      );
    } else oe.kind === "folder" ? e.append(g("h2", {}, s("This folder is empty."))) : e.append(
      g("h2", {}, s("No vaults found")),
      z(s("Vaults in your files appear here. Open a vault's folder to add one.")),
      g("button", { type: "button", class: "primary", onclick: Wn }, s("Open a vault folder …"))
    );
}
function Pe(e) {
  An("files:node:updated", ke(Lt(), e, null));
}
function st(e) {
  if (e.vault?.unlocked) {
    if (ee && oe.vault === e) {
      Oe(s("The vault locks when the change being made has finished."));
      const n = setInterval(() => {
        ee || (clearInterval(n), st(e));
      }, 500);
      return;
    }
    e.vault.lock();
    for (const n of e.nodes)
      An("files:node:deleted", n);
    e.nodes.clear(), e.dirs.clear(), e.entries.clear(), e.inbox = null, Tr(), Ce(le?.folder), Lt().startsWith("/" + e.seg) && De("/"), [...$.values()].some((n) => n.vault?.unlocked) || (clearTimeout(He), He = null);
  }
}
function Ht(e) {
  let n = !1;
  for (const r of $.values())
    r.vault?.unlocked && (st(r), n = !0);
  n && e && Oe(e);
}
function ct() {
  clearTimeout(He), He = setTimeout(
    () => Ht(s("Locked after {minutes} minutes without use.", { minutes: Mt })),
    Mt * 60 * 1e3
  );
}
function ga() {
  He !== null && ct();
}
async function Vt(e) {
  try {
    await Ke.open(se(e));
  } catch (r) {
    W(L(r));
    return;
  }
  Kn(e), await it();
  const n = await zt(e);
  De("/" + n.seg);
}
async function Wn() {
  let e;
  try {
    const { getFilePickerBuilder: r } = await Fe();
    e = await r(s("Choose a vault")).startAt("/").setMultiSelect(!1).allowDirectories(!0).setFilter((c) => c.type === ie.Folder || c.basename === "vault.cryptomator").addButton({ label: s("Open vault"), variant: "primary", callback: () => {
    } }).build().pick();
  } catch {
    return;
  }
  const n = "/" + String(e).replace(/^\/+|\/+$/g, "");
  await Vt(n.endsWith("/vault.cryptomator") ? n.slice(0, -18) || "/" : n);
}
function te(e) {
  return e?.id === Ft;
}
const va = /* @__PURE__ */ new Set([
  "cryptomator-vaults-open",
  "cryptomator-vaults-download",
  "cryptomator-vaults-lock",
  "cryptomator-vaults-open-vault",
  "cryptomator-vaults-rename",
  "cryptomator-vaults-move",
  "cryptomator-vaults-export",
  "cryptomator-vaults-delete",
  "cryptomator-vaults-change-password",
  "cryptomator-vaults-recovery-key",
  "cryptomator-vaults-reset-password",
  "cryptomator-vaults-health",
  "cryptomator-vaults-make-inbox"
]), hn = /* @__PURE__ */ new WeakSet();
let pn = 0;
function Bt() {
  const e = xr();
  if (e.length !== pn) {
    pn = e.length;
    for (const n of e) {
      if (va.has(n.id) || hn.has(n))
        continue;
      const r = n.enabled;
      try {
        Object.defineProperty(n, "enabled", {
          configurable: !0,
          enumerable: !0,
          writable: !0,
          value: (c) => !te(c?.view) && !(c?.nodes ?? []).some((u) => u?.root === We) && (r ? r.call(n, c) : !0)
        }), hn.add(n);
      } catch {
      }
    }
  }
}
function jn(e) {
  const n = $.get(e.attributes?.cryptomatorVault), r = n?.entries.get(e.basename);
  return { vault: n, entry: r };
}
he({
  id: "cryptomator-vaults-open",
  displayName: ({ nodes: e }) => e[0]?.type === ie.Folder ? s("Open") : s("View"),
  iconSvgInline: () => oa,
  enabled: ({ nodes: e, view: n }) => (Bt(), te(n) && e.length === 1),
  async exec({ nodes: e }) {
    const n = e[0];
    if (n.type === ie.Folder)
      return De(n.path), null;
    const { vault: r, entry: c } = jn(n);
    return !r?.vault?.unlocked || !c ? (W(s("The vault is locked.")), null) : (c.type === "link" ? Oe(s("A link to {target}", { target: c.target })) : c.type === "broken" ? W(s("This entry cannot be read: {detail}", { detail: c.error })) : c.size >= je && !Or(c.name) ? await qn(r, c) : await Lr(c.name, c.size, (u, i) => r.vault.readFile(c, u, i), L), null);
  },
  default: gr.DEFAULT,
  order: -1e3
});
async function qn(e, n) {
  if (n.size >= je && typeof window.showSaveFilePicker == "function") {
    let r;
    try {
      r = await (await window.showSaveFilePicker({ suggestedName: n.name })).createWritable();
    } catch {
      return;
    }
    try {
      await e.vault.readFileStream(n, (c) => r.write(c)), await r.close();
    } catch (c) {
      await r.abort().catch(() => {
      }), W(L(c));
    }
    return;
  }
  if (!(n.size > In && !window.confirm(s("This file is {size}. Your browser holds it twice while decrypting. Continue?", { size: tt(n.size) }))))
    try {
      Nn(n.name, await e.vault.readFile(n));
    } catch (r) {
      W(L(r));
    }
}
async function fn(e) {
  const { vault: n, entry: r } = jn(e);
  return !n?.vault?.unlocked || !r ? (W(s("The vault is locked.")), null) : (await qn(n, r), null);
}
he({
  id: "cryptomator-vaults-download",
  displayName: () => s("Download"),
  iconSvgInline: () => ia,
  enabled: ({ nodes: e, view: n }) => te(n) && e.length > 0 && e.every((r) => r.type === ie.File && r.attributes?.cryptomatorType === "file"),
  exec: ({ nodes: e }) => fn(e[0]),
  async execBatch({ nodes: e }) {
    const n = [];
    for (const r of e)
      n.push(await fn(r));
    return n;
  },
  order: -900
});
he({
  id: "cryptomator-vaults-lock",
  displayName: () => s("Lock"),
  iconSvgInline: () => zn,
  enabled: ({ nodes: e, view: n }) => te(n) && e.length === 1 && e[0].attributes?.cryptomatorVaultRoot === !0 && $.get(e[0].attributes.cryptomatorVault)?.vault?.unlocked === !0,
  async exec({ nodes: e }) {
    return st($.get(e[0].attributes.cryptomatorVault)), null;
  },
  order: -800
});
he({
  id: "cryptomator-vaults-open-vault",
  displayName: () => s("Open vault"),
  iconSvgInline: () => _t,
  enabled: ({ nodes: e, view: n }) => n?.id === "files" && e.length === 1 && e[0].root?.startsWith("/files/") && (e[0].basename === "vault.cryptomator" || e[0].type === ie.Folder && [...$.values()].some((r) => r.folder === e[0].path)),
  async exec({ nodes: e }) {
    const n = e[0];
    return await Vt(n.type === ie.Folder ? n.path : n.dirname), null;
  },
  order: 50
});
const lt = /* @__PURE__ */ new Set();
let be = null;
function ba(e) {
  return lt.has(e) || [...$.values()].some((n) => n.folder === e);
}
function rt(e) {
  if (!be)
    return;
  be.folder = e;
  const n = e?.path;
  if (!n || !ba(n)) {
    be.el.replaceChildren();
    return;
  }
  be.el.replaceChildren(g("div", { class: "cryptomator-banner", role: "note" }, [
    g("span", { class: "cryptomator-banner__icon", "aria-hidden": "true" }),
    g(
      "span",
      { class: "cryptomator-banner__text" },
      s("This folder is a Cryptomator vault: its files are encrypted. Open it to see them, decrypted in this browser.")
    ),
    g("button", { type: "button", class: "primary", onclick: () => Vt(n) }, s("Open vault"))
  ])), be.el.querySelector(".cryptomator-banner__icon").innerHTML = _t;
}
let le = null;
function Ce(e) {
  if (!le)
    return;
  le.folder = e;
  const n = $.get(e?.attributes?.cryptomatorVault);
  if (!n?.vault?.unlocked) {
    le.el.replaceChildren();
    return;
  }
  le.el.replaceChildren(g("div", { class: "cryptomator-banner cryptomator-banner--unlocked", role: "status" }, [
    g("span", { class: "cryptomator-banner__icon", "aria-hidden": "true" }),
    g(
      "span",
      { class: "cryptomator-banner__text" },
      s("{vault} is unlocked in this browser. It locks after {minutes} minutes without use.", { vault: n.name, minutes: Mt })
    ),
    g("button", { type: "button", class: "cryptomator-banner__lock", onclick: () => st(n) }, s("Lock"))
  ]), ...Oa(n)), le.el.querySelector(".cryptomator-banner__icon").innerHTML = ua;
}
xn({
  id: "cryptomator-vaults-unlocked",
  order: 4,
  enabled: (e, n) => _e && te(n),
  render(e, n) {
    le = { el: e, folder: n }, Ce(n);
  },
  updated(e) {
    Ce(e);
  }
});
xn({
  id: "cryptomator-vaults-banner",
  order: 5,
  enabled: (e, n) => _e && n?.id === "files",
  render(e, n) {
    be = { el: e, folder: n }, rt(n);
  },
  updated(e) {
    rt(e);
  }
});
vr("files:list:updated", ({ view: e, folder: n, contents: r }) => {
  e?.id !== "files" || !n?.path || ((r || []).some((c) => c.type === ie.File && c.basename === "vault.cryptomator") && lt.add(n.path), rt(n));
});
function ne() {
  const e = oe.kind === "folder" ? oe : null;
  return e?.vault?.vault?.unlocked && Lt() === e.path ? e : null;
}
let ee = !1;
const je = 16 * 1024 * 1024, ka = 1e3;
function Kt(e, n) {
  const r = {
    size: e.size,
    read: async (c, u) => new Uint8Array(await e.slice(c, u).arrayBuffer()),
    all: async () => new Uint8Array(await e.arrayBuffer())
  };
  return { name: e.name, size: e.size, dirs: n, source: r };
}
function Gn(e, n) {
  const r = {
    size: n.size,
    read: (c, u) => e.readRange(n.path, c, u),
    all: () => e.read(n.path),
    remote: !0
  };
  return { name: n.name, size: n.size, dirs: n.dirs, source: r, origin: n };
}
async function Ve(e, n = [], r = {}) {
  const c = r.into ?? ne();
  if (!c || e.length === 0 && n.length === 0)
    return;
  if (ee) {
    W(s("Another change to the vault is still running."));
    return;
  }
  ee = !0;
  const { vault: u } = c.vault, i = Dn(r.title || s("Uploading to {vault}", { vault: c.vault.name }));
  let p = null, d = 0;
  const m = [], v = [];
  let k = "";
  const A = /* @__PURE__ */ new Map([["", c.dirId]]), C = async (S) => {
    let M = "";
    for (const j of S) {
      const q = M ? M + "/" + j : j;
      A.has(q) || A.set(q, (await u.ensureDirectory(A.get(M), j)).dirId), M = q;
    }
    return A.get(M);
  };
  try {
    for (const S of n)
      try {
        await C(S);
      } catch (M) {
        v.push(S.join("/")), i.file(S.join("/") + "/").done(L(M), !0);
      }
    for (const [S, M] of e.entries()) {
      const { dirs: j } = M, q = [...j, M.name].join("/"), U = i.file(q);
      if (i.stopped) {
        U.done(s("Not uploaded"));
        continue;
      }
      let P = p === "replace-all", B = M.name;
      const re = async () => {
        const K = await C(j), Y = { encrypt: s("Encrypting"), upload: s("Uploading"), verify: s("Checking") }, Z = M.size >= je, ge = Z ? { upload: [0, 0.7], verify: [0.7, 0.3] } : { encrypt: [0, 0.2], upload: [0.2, 0.6], verify: [0.8, 0.2] }, de = (D, Q, fe) => {
          const [ht, qe] = ge[D];
          U.phase(D === "upload" && Z ? s("Encrypting and uploading") : Y[D], ht + qe * (fe ? Q / fe : 1));
        };
        let X = null;
        Z || (M.source.remote && U.phase(s("Reading"), 0), X = await M.source.all());
        for (let D = 1; ; D++) {
          B = r.keepBoth ? na(M.name, D) : M.name;
          try {
            Z ? await u.writeFileStream(K, B, M.source, { replace: P, onProgress: de }) : await u.writeFile(K, B, X, { replace: P, onProgress: de });
            break;
          } catch (Q) {
            if (!r.keepBoth || !["exists", "exists-other"].includes(Q?.code) || D >= ka)
              throw Q;
          }
        }
        await r.check?.(M);
      };
      try {
        try {
          await re();
        } catch (K) {
          if (K?.code !== "exists" || p === "skip-all" || r.keepBoth)
            throw K;
          const Y = p === "replace-all" ? "replace" : await i.ask(q, e.length);
          if (Y === "cancel") {
            U.done(s("Not uploaded"));
            break;
          }
          if (Y.endsWith("-all") && (p = Y), Y.startsWith("skip")) {
            U.done(s("Skipped"));
            continue;
          }
          P = !0, await re();
        }
        d++, m.push(M), U.done(B === M.name ? r.written || s("Uploaded and checked") : s("Encrypted and checked as “{name}”", { name: B }));
      } catch (K) {
        K?.code === "exists" && p === "skip-all" ? U.done(s("Skipped")) : (v.push(q), U.done(L(K), !0));
      }
      i.progress((S + 1) / e.length);
    }
    r.after && (k = await r.after(m, i));
  } finally {
    ee = !1, i.finish((v.length ? s("{written} uploaded, {failed} failed. The vault is unchanged where an upload failed.", { written: d, failed: v.length }) : s("{written} uploaded and checked.", { written: d })) + (k ? " " + k : ""), v.length > 0), Pe(c.vault.name);
  }
}
function Yn(e = !1) {
  const n = g("input", { type: "file", multiple: !0, hidden: !0, webkitdirectory: e || null });
  n.addEventListener("change", () => {
    const r = [...n.files].map((c) => Kt(c, (c.webkitRelativePath || c.name).split("/").slice(0, -1)));
    n.remove(), Ve(r);
  }), document.body.append(n), n.click();
}
async function xa(e) {
  const n = [], r = [], c = async (u, i) => {
    if (u.isFile)
      n.push(Kt(await new Promise((p, d) => u.file(p, d)), i));
    else if (u.isDirectory) {
      const p = [...i, u.name];
      r.push(p);
      const d = u.createReader();
      for (; ; ) {
        const m = await new Promise((v, k) => d.readEntries(v, k));
        if (m.length === 0)
          break;
        for (const v of m)
          await c(v, p);
      }
    }
  };
  for (const u of e)
    await c(u, []);
  return { files: n, folders: r };
}
async function Ca() {
  const e = ne();
  if (!e)
    return;
  const n = await Rn(s("New folder"), s("Folder name"), (r) => {
    try {
      return Dt(r), null;
    } catch (c) {
      return L(c);
    }
  });
  if (n !== null)
    try {
      await e.vault.vault.createDirectory(e.dirId, n), Pe(e.vault.name);
    } catch (r) {
      W(L(r));
    }
}
async function Wt(e, n) {
  if (ee) {
    W(s("Another change to the vault is still running."));
    return;
  }
  ee = !0;
  try {
    await n();
  } finally {
    ee = !1, Pe(e.vault.name);
  }
}
function ut(e, n) {
  return e?.code === "not-found" ? s("“{name}” is no longer there.", { name: n }) : L(e);
}
function dt(e, n) {
  const r = te(n) ? ne() : null;
  return r !== null && e.length > 0 && e.every((c) => c.attributes?.cryptomatorVault === r.vault.seg);
}
async function Aa(e) {
  const n = ne(), r = e.displayname, c = await Rn(s("Rename"), s("New name"), (u) => {
    try {
      return Dt(u), null;
    } catch (i) {
      return L(i);
    }
  }, { initial: r, action: s("Rename") });
  c === null || c.normalize("NFC") === r || await Wt(n, async () => {
    try {
      await n.vault.vault.moveEntry(n.dirId, r, n.dirId, c);
    } catch (u) {
      W(ut(u, r));
    }
  });
}
async function mn(e) {
  const n = ne(), { vault: r } = n.vault, c = new Set(e.filter((i) => i.type === ie.Folder).map((i) => n.vault.dirs.get(i.basename)?.dirId).filter(Boolean)), u = await Hr(
    e.length === 1 ? s("Move “{name}” to …", { name: e[0].displayname }) : s("Move {count} items to …", { count: e.length }),
    n.vault.name,
    async (i) => (await r.list(i)).filter((p) => p.type === "dir").map((p) => ({ name: p.name, dirId: p.dirId })),
    c,
    s("Move here")
  );
  u === null || u.dirId === n.dirId || await Wt(n, async () => {
    const i = [];
    for (const p of e)
      try {
        await r.moveEntry(n.dirId, p.displayname, u.dirId, void 0, { ancestors: u.ancestors });
      } catch (d) {
        i.push(p.displayname + ": " + ut(d, p.displayname));
      }
    i.length && W(i.join(`
`));
  });
}
async function wn(e) {
  const n = ne(), r = e.filter((i) => i.type === ie.Folder).length, c = e.length === 1 ? s("Delete “{name}”?", { name: e[0].displayname }) : s("Delete {count} items?", { count: e.length }), u = (r ? s("Folders are deleted with everything in them.") + " " : "") + s("The encrypted files go to Nextcloud's deleted files.");
  await Ur(c, u, s("Delete")) && await Wt(n, async () => {
    const i = [];
    for (const p of e)
      try {
        await n.vault.vault.removeEntry(n.dirId, p.displayname);
      } catch (d) {
        i.push(p.displayname + ": " + ut(d, p.displayname));
      }
    i.length && W(i.join(`
`));
  });
}
const At = 10 * 1024 * 1024;
function Ae(e) {
  return [...lt, ...[...$.values()].map((r) => r.folder)].some((r) => e === r || e.startsWith(r.replace(/\/+$/, "") + "/"));
}
function yn(e) {
  const n = new Uint8Array(e.reduce((c, u) => c + u.length, 0));
  let r = 0;
  for (const c of e)
    n.set(c, r), r += c.length;
  return n;
}
async function* Ea(e, n) {
  let r = [], c = 0;
  for await (const u of e)
    for (r.push(u), c += u.length; c >= n; ) {
      const i = yn(r);
      yield i.subarray(0, n), r = c > n ? [i.subarray(n)] : [], c -= n;
    }
  c > 0 && (yield yn(r));
}
async function Ze(e) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", e));
}
function gn(e, n) {
  return e.length === n.length && e.every((r, c) => r === n[c]);
}
function Sa(e) {
  const n = $.get(e.attributes?.cryptomatorVault);
  if (e.type === ie.Folder) {
    const r = n?.dirs.get(e.basename);
    return r ? { type: "dir", name: r.name, dirId: r.dirId } : null;
  }
  return n?.entries.get(e.basename) ?? null;
}
async function Ia() {
  const e = ne();
  if (!e)
    return;
  let n = null, r;
  try {
    const { getFilePickerBuilder: i } = await Fe();
    r = await i(s("Copy or move into the vault")).setMultiSelect(!0).allowDirectories(!0).setFilter((p) => !Ae(p.path)).setButtonFactory((p) => [
      { label: s("Copy into the vault"), variant: "secondary", disabled: p.length === 0, callback: () => {
        n = "copy";
      } },
      { label: s("Move into the vault"), variant: "primary", disabled: p.length === 0, callback: () => {
        n = "move";
      } }
    ]).build().pick();
  } catch {
    return;
  }
  if (r = [].concat(r || []), n === null || r.length === 0)
    return;
  const c = se("");
  let u;
  try {
    u = await Jr(c, r);
  } catch (i) {
    W(L(i));
    return;
  }
  await Ve(u.flatMap((i) => i.files.map((p) => Gn(c, p))), u.flatMap((i) => i.folders), {
    title: n === "move" ? s("Moving into {vault}", { vault: e.vault.name }) : s("Copying into {vault}", { vault: e.vault.name }),
    written: s("Encrypted and checked"),
    // A file that changed while it was read may be in the vault half old, half new.
    async check(i) {
      if ((await c.stat(i.origin.path))?.etag !== i.origin.etag)
        throw new Le("changed", i.origin.path);
    },
    after: n === "move" ? (i, p) => Na(c, u, i, p) : void 0
  });
}
async function Na(e, n, r, c) {
  const u = new Set(r.map((p) => p.origin));
  let i = 0;
  for (const p of n) {
    const d = c.file(p.isDir ? p.name + "/" : p.name);
    if (!p.files.every((m) => u.has(m))) {
      d.done(s("Original kept: not all of it is in the vault"), !0);
      continue;
    }
    if (!p.permissions.includes("D") || p.permissions.includes("S")) {
      d.done(s("Original kept: it is shared with you"), !0);
      continue;
    }
    try {
      await e.removeUnchanged(p.path, p.etag, { isDir: p.isDir }), i++, d.done(await Xr(p.path) ? s("Original deleted for good") : s("Original deleted; it may still be in the deleted files"));
    } catch (m) {
      d.done(L(m), !0);
    }
  }
  return i ? s("Originals deleted for good: {removed}.", { removed: i }) : "";
}
async function vn(e, n, r, c, u, i) {
  if (r.size < je) {
    i("decrypt", 0, 1);
    const m = await e.readFile(r);
    if (await n.write(c, m, { create: !u, onProgress: (v, k) => i("upload", v, k) }), i("verify", 0, 1), !gn(await Ze(await n.read(c)), await Ze(m)))
      throw new Le("network", "the stored copy differs from the decrypted file");
    return;
  }
  const p = [];
  async function* d(m) {
    for await (const v of m)
      p.push(await Ze(v)), yield v;
  }
  if (await n.writeParts(
    c,
    r.size,
    d(Ea(e.decryptedPieces(r), At)),
    { create: !u, onProgress: (m, v) => i("upload", m, v) }
  ), (await n.stat(c))?.size !== r.size)
    throw new Le("network", "the stored copy has another size than the decrypted file");
  for (const [m, v] of p.entries()) {
    const k = m * At;
    if (!gn(await Ze(await n.readRange(c, k, Math.min(k + At, r.size))), v))
      throw new Le("network", "the stored copy differs from the decrypted file");
    i("verify", m + 1, p.length);
  }
}
async function bn(e) {
  const n = ne();
  if (!n)
    return;
  let r = null, c = null;
  try {
    const { getFilePickerBuilder: M } = await Fe();
    await M(e.length === 1 ? s("Export “{name}” decrypted to …", { name: e[0].displayname }) : s("Export {count} items decrypted to …", { count: e.length })).setMultiSelect(!1).allowDirectories(!0).setMimeTypeFilter(["httpd/unix-directory"]).setFilter((j) => j.type === ie.Folder && !Ae(j.path)).setButtonFactory((j, q) => [
      { label: s("Copy here"), variant: "secondary", callback: () => {
        r = "copy", c = q;
      } },
      { label: s("Move here"), variant: "primary", callback: () => {
        r = "move", c = q;
      } }
    ]).build().pick();
  } catch {
  }
  if (r === null || c === null)
    return;
  if (Ae(c)) {
    W(s("Choose a folder outside the vault."));
    return;
  }
  if (ee) {
    W(s("Another change to the vault is still running."));
    return;
  }
  ee = !0;
  const { vault: u } = n.vault, i = se(""), p = (...M) => [c.replace(/^\/+|\/+$/g, ""), ...M].filter(Boolean).join("/"), d = Dn(r === "move" ? s("Moving out of {vault}", { vault: n.vault.name }) : s("Exporting from {vault}", { vault: n.vault.name })), m = { text: s("Replace the file in your files with the one from the vault? Nextcloud keeps the old one among its versions."), cancel: s("Cancel") };
  let v = null, k = 0, A = 0, C = !1;
  const S = [];
  try {
    const M = [];
    for (const U of e) {
      const P = Sa(U), B = { name: U.displayname, files: [], folders: [], complete: P !== null }, re = async (K, Y) => {
        B.folders.push(Y);
        for (const Z of await u.list(K))
          Z.type === "dir" ? await re(Z.dirId, [...Y, Z.name]) : Z.type === "file" ? B.files.push({ entry: Z, dirs: Y }) : B.complete = !1;
      };
      P?.type === "dir" ? await re(P.dirId, [P.name]) : P?.type === "file" ? B.files.push({ entry: P, dirs: [] }) : B.complete = !1, M.push(B);
    }
    const j = M.reduce((U, P) => U + P.files.length, 0);
    let q = 0;
    for (const U of M) {
      for (const P of U.folders)
        try {
          await i.mkdir(p(...P), { existsOk: !0 });
        } catch (B) {
          U.complete = !1, S.push(P.join("/")), d.file(P.join("/") + "/").done(L(B), !0);
        }
      for (const { entry: P, dirs: B } of U.files) {
        const re = [...B, P.name].join("/"), K = d.file(re);
        if (q++, d.stopped || C) {
          U.complete = !1, K.done(s("Not exported"));
          continue;
        }
        const Y = { decrypt: s("Decrypting"), upload: P.size >= je ? s("Decrypting and uploading") : s("Uploading"), verify: s("Checking") }, Z = { decrypt: [0, 0.2], upload: [0.2, 0.6], verify: [0.8, 0.2] }, ge = (X, D, Q) => K.phase(Y[X], Z[X][0] + Z[X][1] * (Q ? D / Q : 1));
        let de = v === "replace-all";
        try {
          try {
            await vn(u, i, P, p(...B, P.name), de, ge);
          } catch (X) {
            if (X?.code !== "exists" || v === "skip-all")
              throw X;
            const D = v === "replace-all" ? "replace" : await d.ask(re, j, m);
            if (D === "cancel")
              throw C = !0, Object.assign(new Error("cancelled"), { cancelled: !0 });
            if (D.endsWith("-all") && (v = D), D.startsWith("skip"))
              throw Object.assign(new Error("skipped"), { skipped: !0 });
            de = !0, await vn(u, i, P, p(...B, P.name), de, ge);
          }
          k++, K.done(s("Exported and checked"));
        } catch (X) {
          if (U.complete = !1, X?.cancelled) {
            K.done(s("Not exported"));
            continue;
          }
          X?.skipped || X?.code === "exists" && v === "skip-all" ? K.done(s("Skipped")) : (S.push(re), K.done(L(X), !0));
        }
        d.progress(q / Math.max(j, 1));
      }
      if (r === "move") {
        const P = d.file(s("“{name}” in the vault", { name: U.name }));
        if (!U.complete) {
          P.done(s("Kept in the vault: not all of it was exported"), !0);
          continue;
        }
        try {
          await u.removeEntry(n.dirId, U.name), A++, P.done(s("Removed from the vault"));
        } catch (B) {
          P.done(ut(B, U.name), !0);
        }
      }
    }
  } catch (M) {
    S.push(""), W(L(M));
  } finally {
    ee = !1;
    const M = S.length ? s("{written} exported, {failed} failed.", { written: k, failed: S.length }) : s("{written} exported and checked.", { written: k });
    d.finish(M + (A ? " " + s("{removed} removed from the vault.", { removed: A }) : ""), S.length > 0), Pe(n.vault.name);
  }
}
he({
  id: "cryptomator-vaults-rename",
  displayName: () => s("Rename"),
  iconSvgInline: () => sa,
  enabled: ({ nodes: e, view: n }) => dt(e, n) && e.length === 1,
  async exec({ nodes: e }) {
    return await Aa(e[0]), null;
  },
  order: -700
});
he({
  id: "cryptomator-vaults-move",
  displayName: () => s("Move …"),
  iconSvgInline: () => ca,
  enabled: ({ nodes: e, view: n }) => dt(e, n),
  async exec({ nodes: e }) {
    return await mn(e), null;
  },
  async execBatch({ nodes: e }) {
    return await mn(e), e.map(() => null);
  },
  order: -690
});
he({
  id: "cryptomator-vaults-export",
  displayName: () => s("Export to your files …"),
  iconSvgInline: () => da,
  enabled: ({ nodes: e, view: n }) => dt(e, n),
  async exec({ nodes: e }) {
    return await bn(e), null;
  },
  async execBatch({ nodes: e }) {
    return await bn(e), e.map(() => null);
  },
  order: -680
});
he({
  id: "cryptomator-vaults-delete",
  displayName: () => s("Delete"),
  iconSvgInline: () => la,
  enabled: ({ nodes: e, view: n }) => dt(e, n),
  async exec({ nodes: e }) {
    return await wn(e), null;
  },
  async execBatch({ nodes: e }) {
    return await wn(e), e.map(() => null);
  },
  destructive: !0,
  order: 100
});
Ee({
  id: "cryptomator-vaults-upload",
  displayName: () => s("Upload files …"),
  iconSvgInline: () => Ln,
  order: -2,
  enabled: ({ view: e }) => te(e) && ne() !== null,
  exec: async () => (Yn(), null)
});
Ee({
  id: "cryptomator-vaults-upload-folder",
  displayName: () => s("Upload folder …"),
  iconSvgInline: () => Ln,
  order: -1.5,
  enabled: ({ view: e }) => te(e) && ne() !== null,
  exec: async () => (Yn(!0), null)
});
Ee({
  id: "cryptomator-vaults-import",
  displayName: () => s("Add from your files …"),
  iconSvgInline: () => Pt,
  order: -1.2,
  enabled: ({ view: e }) => te(e) && ne() !== null,
  exec: async () => (await Ia(), null)
});
Ee({
  id: "cryptomator-vaults-new-folder",
  displayName: () => s("New folder …"),
  iconSvgInline: () => Un,
  order: -1,
  enabled: ({ view: e }) => te(e) && ne() !== null,
  exec: async () => (await Ca(), null)
});
function Ma(e) {
  ne() && e.dataTransfer?.types?.includes("Files") && (e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy");
}
function Ta(e) {
  if (!ne() || !e.dataTransfer?.files?.length)
    return;
  e.preventDefault(), e.stopPropagation();
  const n = [...e.dataTransfer.items || []].map((r) => r.webkitGetAsEntry?.()).filter(Boolean);
  if (n.length === 0) {
    Ve([...e.dataTransfer.files].map((r) => Kt(r, [])));
    return;
  }
  xa(n).then(({ files: r, folders: c }) => Ve(r, c), (r) => W(L(r)));
}
window.addEventListener("dragover", Ma, !0);
window.addEventListener("drop", Ta, !0);
const Ra = 600 * 1e3, Da = "cryptomator_vaults.inbox-auto";
let Ne = null;
function Jn(e = !1) {
  if (e || !Ne || Date.now() - Ne.at > Ra) {
    const n = (async () => {
      const r = se(""), c = [];
      for (const u of (await Yr(Re)).map(xe))
        try {
          const i = await r.read(u.slice(1) + "/" + Re);
          c.push({ folder: u, ...i.length > $r ? { problem: "invalid" } : Qr(new TextDecoder().decode(i), u) });
        } catch {
        }
      return c;
    })();
    Ne = { at: Date.now(), promise: n }, n.catch(() => {
      Ne?.promise === n && (Ne = null);
    });
  }
  return Ne.promise;
}
function Xn() {
  return Da + "." + ye();
}
function $n() {
  try {
    const e = JSON.parse(window.localStorage.getItem(Xn()) || "[]");
    return Array.isArray(e) ? e.filter((n) => typeof n == "string") : [];
  } catch {
    return [];
  }
}
function Zn(e) {
  return $n().includes(e.folder);
}
function Fa(e, n) {
  try {
    const r = $n().filter((c) => c !== e.folder);
    window.localStorage.setItem(Xn(), JSON.stringify(n ? [...r, e.folder] : r));
  } catch {
  }
}
async function at(e) {
  const n = [], r = [], c = se(""), u = xe(e.folder);
  let i;
  try {
    i = (await Jn()).filter((d) => (d.inbox?.vault ?? d.vault) === u);
  } catch (d) {
    return e.inbox = { items: n, problems: [s("The search for inboxes failed: {detail}", { detail: d.message })] }, e.inbox;
  }
  let p = null;
  for (const d of i) {
    const m = d.folder;
    if (d.problem === "version") {
      r.push(s("The inbox “{inbox}” needs a newer version of this app; it is left alone.", { inbox: m }));
      continue;
    }
    if (d.problem === "loop" || Ae(m)) {
      r.push(s("The inbox “{inbox}” is left alone: it is a vault's folder, inside one or holds one.", { inbox: m }));
      continue;
    }
    if (d.inbox)
      try {
        if (p === null) {
          const k = (await c.stat(u.slice(1)))?.permissions ?? "";
          p = k.includes("C") && k.includes("K");
        }
        if (!p) {
          r.push(s("The inbox “{inbox}” is left alone: you cannot write to this vault.", { inbox: m }));
          continue;
        }
        const v = await c.stat(m.slice(1));
        if (v === null || !v.isDir)
          continue;
        if (v.permissions.includes("S")) {
          r.push(s("The inbox “{inbox}” is left alone: it is shared with you, and its files are not yours to delete.", { inbox: m }));
          continue;
        }
        n.push({ inbox: d.inbox, plan: await ra(d.inbox, (k) => c.list(k)) });
      } catch (v) {
        r.push(s("The inbox “{inbox}” cannot be read: {detail}", { inbox: m, detail: L(v) }));
      }
  }
  return e.inbox = { items: n, problems: r }, e.inbox;
}
function Oa(e) {
  const r = (e.inbox?.items ?? []).filter((u) => u.plan.ready.length > 0), c = (e.inbox?.problems ?? []).map((u) => g(
    "div",
    { class: "cryptomator-banner cryptomator-banner--inbox", role: "note" },
    g("span", { class: "cryptomator-banner__text cryptomator-notice--error" }, u)
  ));
  for (const u of r) {
    const { inbox: i, plan: p } = u, d = p.ready.length, m = { from: i.from, inbox: i.folder, size: tt(p.ready.reduce((k, A) => k + A.size, 0)) }, v = (i.from ? vt("%n file from {from} is waiting in “{inbox}” ({size}).", "%n files from {from} are waiting in “{inbox}” ({size}).", d, m) : vt("%n file is waiting in “{inbox}” ({size}).", "%n files are waiting in “{inbox}” ({size}).", d, m)) + (p.recent.length ? " " + vt("%n more is still being written and comes next time.", "%n more are still being written and come next time.", p.recent.length) : "");
    c.push(g("div", { class: "cryptomator-banner cryptomator-banner--inbox", role: "status" }, [
      g("span", { class: "cryptomator-banner__icon", "aria-hidden": "true" }),
      g("span", { class: "cryptomator-banner__text" }, v),
      g("button", { type: "button", class: "primary", onclick: () => Qn(e, [u]) }, s("Move into the vault"))
    ])), c[c.length - 1].querySelector(".cryptomator-banner__icon").innerHTML = Pt;
  }
  if (r.length > 0) {
    const u = g("input", { type: "checkbox", checked: Zn(e), onchange: () => Fa(e, u.checked) });
    c.push(g("label", { class: "cryptomator-inbox-auto" }, [u, s("Move files from inboxes automatically when I unlock")]));
  }
  return c;
}
async function _a(e) {
  try {
    await at(e);
  } catch {
    return;
  }
  Ce(le?.folder), Zn(e) && e.inbox.items.some((n) => n.plan.ready.length > 0) && await Qn(e, e.inbox.items);
}
async function Qn(e, n) {
  if (!e.vault?.unlocked)
    return;
  if (ee) {
    W(s("Another change to the vault is still running."));
    return;
  }
  const r = new Set(n.map((i) => i.inbox.folder)), c = (await at(e)).items.filter((i) => r.has(i.inbox.folder) && i.plan.ready.length > 0);
  if (Ce(le?.folder), c.length === 0)
    return;
  const u = se("");
  await Ve(c.flatMap((i) => i.plan.ready.map((p) => Gn(u, p))), [], {
    into: { vault: e, dirId: "" },
    keepBoth: !0,
    title: s("Moving from inboxes into {vault}", { vault: e.name }),
    written: s("Encrypted and checked"),
    // A file that changed while it was read may be in the vault half old, half new.
    async check(i) {
      if ((await u.stat(i.origin.path))?.etag !== i.origin.etag)
        throw new Le("changed", i.origin.path);
    },
    after: (i, p) => Pa(u, c, i, p)
  }), await at(e).catch(() => {
  }), Ce(le?.folder);
}
async function Pa(e, n, r, c) {
  const u = [];
  for (const m of r.map((v) => v.origin)) {
    if (!m.permissions.includes("D")) {
      c.file(m.path).done(s("Plain copy kept: you cannot delete it"), !0);
      continue;
    }
    try {
      await e.removeUnchanged(m.path, m.etag), u.push(m.path);
    } catch (v) {
      c.file(m.path).done(L(v), !0);
    }
  }
  const i = [];
  for (const m of n)
    for (const v of m.plan.folders) {
      const k = [m.inbox.folder.slice(1), ...v].join("/");
      if (u.some((A) => A.startsWith(k + "/")))
        try {
          (await e.list(k)).length === 0 && (await e.remove(k), i.push(k));
        } catch {
        }
    }
  let p = /* @__PURE__ */ new Set();
  try {
    p = await It(u), await It(i, { onlyEmpty: !0 });
  } catch (m) {
    c.file(s("Deleted files")).done(L(m), !0);
  }
  const d = u.length - p.size;
  return (u.length ? s("Plain copies deleted for good: {removed}.", { removed: p.size }) : "") + (d ? " " + s("{count} of them may still be in the deleted files.", { count: d }) : "");
}
async function za(e) {
  const n = xe(e.folder), r = Nt(n).slice(0, -1), c = await Be({
    title: s("Make an inbox for {vault}", { vault: e.name }),
    intro: [
      s("Files put into an inbox, by you or by an app such as Harvester, are offered for the vault when you unlock it, and moved into it encrypted. Until then they are ordinary files on the server."),
      s("The folder in the vault the files go to is written unencrypted into the inbox's marker file, {marker}.", { marker: Re })
    ],
    fields: [
      { name: "folder", label: s("Inbox folder"), value: "/" + [...r, s("{vault} inbox", { vault: e.name })].join("/") },
      { name: "target", label: s("Folder in the vault"), value: "/" },
      { name: "from", label: s("Filled by (optional)"), value: "", optional: !0 }
    ],
    action: s("Make the inbox"),
    working: s("Making the inbox …"),
    async run({ folder: u, target: i, from: p }) {
      const d = xe(u), m = xe(i);
      if (d === null || d === "/")
        throw new Error(s("“{name}” cannot be a folder's name.", { name: u }));
      if (m === null)
        throw new Error(s("“{name}” cannot be a name in a vault.", { name: i }));
      for (const A of Nt(m))
        try {
          Dt(A);
        } catch (C) {
          throw new Error(L(C));
        }
      if (nt(d, n) || nt(n, d) || Ae(d))
        throw new Error(s("An inbox cannot be a vault's folder, inside one or hold one."));
      const v = se(""), k = await v.stat(d.slice(1));
      if (k === null)
        try {
          await v.mkdir(d.slice(1));
        } catch (A) {
          throw new Error(s("“{folder}” could not be created: {detail}", { folder: d, detail: A.message }));
        }
      else if (!k.isDir)
        throw new Error(s("“{folder}” is a file.", { folder: d }));
      try {
        await v.write(d.slice(1) + "/" + Re, new TextEncoder().encode(ea({ vault: n, target: m, from: p.trim() })), { create: !0 });
      } catch (A) {
        throw new Error(A?.code === "exists" ? s("“{folder}” is an inbox already.", { folder: d }) : L(A));
      }
      return d;
    }
  });
  c && (await Jn(!0).catch(() => {
  }), e.vault?.unlocked && (await at(e).catch(() => {
  }), Ce(le?.folder)), Oe(s("“{folder}” is an inbox of {vault} now.", { folder: c, vault: e.name })));
}
const kn = 8, Et = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm5.65-4A6 6 0 1 0 12.65 14H17v4h4v-4h2v-4H12.65z"/></svg>', La = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 0 1 7.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 3 5.5 5.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35zM11 7v3H8v2h3v3h2v-3h3v-2h-3V7h-2z"/></svg>';
function jt() {
  return import("./cryptomator_vaults-recovery-words-CHlfZTyo.mjs").then((e) => e.default.split(`
`));
}
function qt(e, n) {
  if (e.length < kn)
    throw new Error(s("The password needs at least {count} characters.", { count: kn }));
  if (e !== n)
    throw new Error(s("The two passwords differ."));
}
function Ua(e) {
  switch (e.kind) {
    case "MissingDirIdBackup":
      return s("A folder's spare copy of its ID is missing. Repairing writes it.");
    case "MissingContentDir":
      return s("A folder's contents are missing; it cannot be opened. Repairing creates it anew, empty.");
    case "OrphanContentDir":
      return s("Encrypted files that no folder leads to. Repairing moves them into the folder LOST+FOUND.");
    case "LooseDirFile":
      return s("A stray folder file outside any folder. Repairing removes it.");
    case "EmptyDirFile":
      return s("A folder whose file is empty; it cannot be opened. Repairing removes the broken entry.");
    case "UnknownType":
      return e.fixable ? s("An empty entry that is neither file, folder nor link. Repairing removes it.") : s("An entry that is neither file, folder nor link, and not empty. Look at it in Cryptomator.");
    case "AmbiguousType":
      return s("An entry that is several kinds at once. Look at it in Cryptomator.");
    case "LongShortNamesMismatch":
      return s("An entry with a long name, stored under the wrong short name. Repairing renames it.");
    case "TrailingBytesInNameFile":
      return s("A long name with stray bytes after it. Repairing removes them.");
    case "MissingLongName":
    case "NotDecodableLongName":
    case "ObeseNameFile":
      return s("An entry whose long name is missing or damaged. Look at it in Cryptomator.");
    case "ObeseDirFile":
    case "DirIdCollision":
      return s("A folder whose ID is damaged or used twice. Look at it in Cryptomator.");
    default:
      return e.kind;
  }
}
async function Ha() {
  let e = null;
  try {
    const { getFilePickerBuilder: u } = await Fe();
    await u(s("Where should the new vault go?")).startAt("/").setMultiSelect(!1).allowDirectories(!0).setMimeTypeFilter(["httpd/unix-directory"]).setFilter((i) => i.type === ie.Folder && !Ae(i.path)).setButtonFactory((i, p) => [{ label: s("Create the vault here"), variant: "primary", callback: () => {
      e = p;
    } }]).build().pick();
  } catch {
  }
  if (e === null)
    return;
  if (Ae(e)) {
    W(s("A vault cannot be inside a vault."));
    return;
  }
  const n = se(""), r = await Be({
    title: s("New vault"),
    intro: [s("The vault is a folder of encrypted files, which Cryptomator opens too. Its password cannot be recovered without the recovery key shown next.")],
    fields: [
      { name: "place", label: s("In"), value: e, readonly: !0 },
      { name: "name", label: s("Name"), value: s("Vault") },
      { name: "password", label: s("Password"), type: "password", autocomplete: "new-password" },
      { name: "repeated", label: s("Password again"), type: "password", autocomplete: "new-password" }
    ],
    action: s("Create"),
    working: s("Creating the vault …"),
    async run({ name: u, password: i, repeated: p }) {
      const d = u.trim();
      if (!d || d === "." || d === ".." || /[/\\]/.test(d))
        throw new Error(s("“{name}” cannot be a folder's name.", { name: d }));
      qt(i, p);
      const m = (e.replace(/\/+$/, "") + "/" + d).replace(/^\/*/, "/");
      try {
        await n.mkdir(m.slice(1));
      } catch (k) {
        throw new Error(k?.code === "exists" ? s("A folder “{name}” is there already.", { name: d }) : L(k));
      }
      let v;
      try {
        v = await Ke.create(se(m), i);
      } catch (k) {
        throw await n.remove(m.slice(1)).catch(() => {
        }), new Error(L(k));
      }
      return { folder: m, vault: v, key: await v.recoveryKey(i, await jt()) };
    }
  });
  if (!r)
    return;
  Kn(r.folder), lt.add(r.folder), await it();
  const c = await zt(r.folder);
  c.vault = r.vault, ct(), await Fn(c.name, r.key, { created: !0 }), De("/" + c.seg);
}
async function er(e) {
  return e.vault ?? await Ke.open(se(e.folder));
}
async function Va(e) {
  await Be({
    title: s("Change the password of {vault}", { vault: e.name }),
    intro: [s("The files stay as they are; only the vault's key file gets the new password. Cryptomator on your other devices then needs the new one, too.")],
    fields: [
      { name: "account", label: s("Vault"), value: e.folder, readonly: !0, account: !0, autocomplete: "username" },
      { name: "old", label: s("Current password"), type: "password", autocomplete: "current-password" },
      { name: "password", label: s("New password"), type: "password", autocomplete: "new-password" },
      { name: "repeated", label: s("New password again"), type: "password", autocomplete: "new-password" }
    ],
    action: s("Change password"),
    working: s("Changing the password …"),
    async run({ old: r, password: c, repeated: u }) {
      qt(c, u);
      try {
        const i = await er(e);
        await i.changePassword(r, c), e.vault = i;
      } catch (i) {
        throw new Error(L(i));
      }
      return !0;
    }
  }) && Oe(s("The password of {vault} is changed.", { vault: e.name }));
}
async function Ba(e) {
  const n = await Be({
    title: s("Recovery key of {vault}", { vault: e.name }),
    intro: [s("Enter the vault's password to see its recovery key.")],
    fields: [
      { name: "account", label: s("Vault"), value: e.folder, readonly: !0, account: !0, autocomplete: "username" },
      { name: "password", label: s("Password"), type: "password", autocomplete: "current-password" }
    ],
    action: s("Show"),
    working: s("Unlocking …"),
    async run({ password: r }) {
      try {
        return await (await er(e)).recoveryKey(r, await jt());
      } catch (c) {
        throw new Error(L(c));
      }
    }
  });
  n && await Fn(e.name, n);
}
async function Ka(e) {
  const n = await Be({
    title: s("Reset the password of {vault}", { vault: e.name }),
    intro: [s("With the vault's recovery key (the words from Cryptomator or from this app) it gets a new password. The files stay as they are.")],
    fields: [
      { name: "account", label: s("Vault"), value: e.folder, readonly: !0, account: !0, autocomplete: "username" },
      { name: "key", label: s("Recovery key"), type: "textarea" },
      { name: "password", label: s("New password"), type: "password", autocomplete: "new-password" },
      { name: "repeated", label: s("New password again"), type: "password", autocomplete: "new-password" }
    ],
    action: s("Set the new password"),
    working: s("Setting the new password …"),
    async run({ key: r, password: c, repeated: u }) {
      qt(c, u);
      try {
        return await Ke.resetPassword(se(e.folder), r, c, await jt());
      } catch (i) {
        throw new Error(L(i));
      }
    }
  });
  n && (e.vault = n, ct(), Oe(s("{vault} has a new password and is unlocked.", { vault: e.name })));
}
async function Wa(e) {
  !e.vault?.unlocked && !await Ut(e) || Vr(e.name, {
    check: (n) => e.vault.checkHealth(n),
    describe: Ua,
    async repair(n) {
      if (ee)
        throw new Error(s("Another change to the vault is still running."));
      ee = !0;
      try {
        for (const r of n)
          await e.vault.repair(r);
      } catch (r) {
        throw new Error(L(r));
      } finally {
        ee = !1, Pe(e.name);
      }
    }
  });
}
const ja = (e) => $.get(e[0].attributes.cryptomatorVault), qa = ({ nodes: e, view: n }) => _e && te(n) && e.length === 1 && e[0].attributes?.cryptomatorVaultRoot === !0;
for (const [e, n, r, c, u] of [
  ["cryptomator-vaults-change-password", () => s("Change password …"), Et, Va, -790],
  ["cryptomator-vaults-recovery-key", () => s("Show recovery key …"), Et, Ba, -780],
  ["cryptomator-vaults-reset-password", () => s("Reset password with recovery key …"), Et, Ka, -770],
  ["cryptomator-vaults-health", () => s("Check health …"), La, Wa, -760],
  ["cryptomator-vaults-make-inbox", () => s("Make an inbox for this vault …"), Pt, za, -750]
])
  he({
    id: e,
    displayName: n,
    iconSvgInline: () => r,
    enabled: qa,
    async exec({ nodes: i }) {
      return await c(ja(i)), null;
    },
    order: u
  });
Ee({
  id: "cryptomator-vaults-new",
  displayName: () => s("New vault …"),
  iconSvgInline: () => Un,
  order: -0.5,
  enabled: ({ view: e }) => _e && te(e) && oe.kind === "vaults",
  exec: async () => (await Ha(), null)
});
Ee({
  id: "cryptomator-vaults-add",
  displayName: () => s("Open a vault folder …"),
  iconSvgInline: () => ha,
  order: 0,
  enabled: ({ view: e }) => te(e),
  exec: async () => (await Wn(), null)
});
Ee({
  id: "cryptomator-vaults-lock-all",
  displayName: () => s("Lock all vaults"),
  iconSvgInline: () => zn,
  order: 1,
  enabled: ({ view: e }) => te(e) && [...$.values()].some((n) => n.vault?.unlocked),
  exec: async () => (Ht(), null)
});
br().register(new kr({
  id: Ft,
  name: s("Vaults"),
  caption: s("Cryptomator vaults, unlocked in this browser"),
  emptyTitle: s("No vaults found"),
  emptyCaption: s("Vaults in your files appear here. Open a vault's folder to add one."),
  emptyView: ya,
  icon: _t,
  order: 90,
  getContents: wa
}));
Bt();
for (const e of ["pointerdown", "keydown", "wheel", "touchstart"])
  document.addEventListener(e, ga, { passive: !0 });
window.addEventListener("pagehide", () => {
  G(), Ht();
});
_e && it().then(() => rt(be?.folder));
export {
  Ft as VIEW_ID
};
