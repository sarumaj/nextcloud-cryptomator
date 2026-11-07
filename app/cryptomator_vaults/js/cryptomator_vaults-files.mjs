import { g as Tr, t as Ir, d as Nr, K as Fn, v as Dr, x as lt, L as Rr, M as me, O as Fr, Q as On, s as Or, F as ce, R as Me, S as _r, V as Pr, z as _n, P as Pt, T as zr, y as Lr, A as Pn } from "./cryptomator_vaults-common-ByXmhu3u.mjs";
var nt = { exports: {} }, Ur = nt.exports, pn;
function Hr() {
  return pn || (pn = 1, (function(e) {
    (function(n, r) {
      e.exports ? e.exports = r(globalThis.crypto) : n.CryptomatorVault = r(n.crypto);
    })(typeof self < "u" ? self : Ur, function(n) {
      const r = n.subtle, s = new TextEncoder(), d = new TextDecoder("utf-8", { fatal: !0 });
      class o extends Error {
        constructor(t, i) {
          super(i || t), this.name = "VaultError", this.code = t;
        }
      }
      function p(b) {
        const t = b.replace(/-/g, "+").replace(/_/g, "/"), i = t + "=".repeat((4 - t.length % 4) % 4), a = atob(i), l = new Uint8Array(a.length);
        for (let h = 0; h < a.length; h++)
          l[h] = a.charCodeAt(h);
        return l;
      }
      function u(b, t) {
        let i = "";
        for (let l = 0; l < b.length; l++)
          i += String.fromCharCode(b[l]);
        const a = btoa(i).replace(/\+/g, "-").replace(/\//g, "_");
        return t ? a : a.replace(/=+$/, "");
      }
      function m(b) {
        let t = "";
        for (let i = 0; i < b.length; i++)
          t += String.fromCharCode(b[i]);
        return btoa(t);
      }
      const v = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      function x(b) {
        let t = "", i = 0, a = 0;
        for (const l of b)
          for (i = i << 8 | l, a += 8; a >= 5; )
            t += v[i >>> a - 5 & 31], a -= 5;
        return a > 0 && (t += v[i << 5 - a & 31]), t;
      }
      function A(...b) {
        const t = new Uint8Array(b.reduce((a, l) => a + l.length, 0));
        let i = 0;
        for (const a of b)
          t.set(a, i), i += a.length;
        return t;
      }
      function C(b) {
        const t = new Uint8Array(8);
        return new DataView(t.buffer).setBigUint64(0, BigInt(b)), t;
      }
      function M(b, t) {
        if (b.length !== t.length)
          return !1;
        let i = 0;
        for (let a = 0; a < b.length; a++)
          i |= b[a] ^ t[a];
        return i === 0;
      }
      async function D(b, t, i) {
        const a = await r.importKey(
          "raw",
          b.length ? b : new Uint8Array(64),
          { name: "HMAC", hash: "SHA-256" },
          !1,
          ["sign"]
        ), l = new Uint8Array(i);
        for (let h = 1, f = 0; f < i; h++, f += 32) {
          const w = new Uint8Array([h >>> 24, h >>> 16 & 255, h >>> 8 & 255, h & 255]), y = new Uint8Array(await r.sign("HMAC", a, A(t, w)));
          l.set(y.subarray(0, Math.min(32, i - f)), f);
        }
        return l;
      }
      function j(b) {
        const t = b.slice(), i = (a, l) => a << l | a >>> 32 - l;
        for (let a = 0; a < 8; a += 2)
          t[4] ^= i(t[0] + t[12], 7), t[8] ^= i(t[4] + t[0], 9), t[12] ^= i(t[8] + t[4], 13), t[0] ^= i(t[12] + t[8], 18), t[9] ^= i(t[5] + t[1], 7), t[13] ^= i(t[9] + t[5], 9), t[1] ^= i(t[13] + t[9], 13), t[5] ^= i(t[1] + t[13], 18), t[14] ^= i(t[10] + t[6], 7), t[2] ^= i(t[14] + t[10], 9), t[6] ^= i(t[2] + t[14], 13), t[10] ^= i(t[6] + t[2], 18), t[3] ^= i(t[15] + t[11], 7), t[7] ^= i(t[3] + t[15], 9), t[11] ^= i(t[7] + t[3], 13), t[15] ^= i(t[11] + t[7], 18), t[1] ^= i(t[0] + t[3], 7), t[2] ^= i(t[1] + t[0], 9), t[3] ^= i(t[2] + t[1], 13), t[0] ^= i(t[3] + t[2], 18), t[6] ^= i(t[5] + t[4], 7), t[7] ^= i(t[6] + t[5], 9), t[4] ^= i(t[7] + t[6], 13), t[5] ^= i(t[4] + t[7], 18), t[11] ^= i(t[10] + t[9], 7), t[8] ^= i(t[11] + t[10], 9), t[9] ^= i(t[8] + t[11], 13), t[10] ^= i(t[9] + t[8], 18), t[12] ^= i(t[15] + t[14], 7), t[13] ^= i(t[12] + t[15], 9), t[14] ^= i(t[13] + t[12], 13), t[15] ^= i(t[14] + t[13], 18);
        for (let a = 0; a < 16; a++)
          b[a] = b[a] + t[a] | 0;
      }
      function G(b, t, i, a) {
        a.set(b.subarray((2 * i - 1) * 16, 2 * i * 16));
        for (let l = 0; l < 2 * i; l++) {
          for (let h = 0; h < 16; h++)
            a[h] ^= b[l * 16 + h];
          j(a), t.set(a, ((l & 1) * i + (l >> 1)) * 16);
        }
      }
      function V(b, t, i) {
        const a = 32 * i, l = new Int32Array(a * t), h = new Int32Array(b), f = new Int32Array(a), w = new Int32Array(16);
        for (let y = 0; y < t; y++)
          l.set(h, y * a), G(h, f, i, w), h.set(f);
        for (let y = 0; y < t; y++) {
          const S = h[(2 * i - 1) * 16] & t - 1;
          for (let k = 0; k < a; k++)
            h[k] ^= l[S * a + k];
          G(h, f, i, w), h.set(f);
        }
        return h;
      }
      function L(b) {
        const t = new DataView(b.buffer, b.byteOffset, b.byteLength), i = new Int32Array(b.length / 4);
        for (let a = 0; a < i.length; a++)
          i[a] = t.getInt32(a * 4, !0);
        return i;
      }
      function K(b, t) {
        const i = new DataView(t.buffer, t.byteOffset, t.byteLength);
        for (let a = 0; a < b.length; a++)
          i.setInt32(a * 4, b[a], !0);
      }
      async function ae(b, t, i, a, l, h) {
        if (i < 2 || (i & i - 1) !== 0)
          throw new o("corrupt", "scrypt cost is not a power of two");
        const f = 128 * a, w = await D(b, t, l * f);
        for (let y = 0; y < l; y++) {
          const S = w.subarray(y * f, (y + 1) * f);
          K(V(L(S), i, a), S);
        }
        return D(b, w, h);
      }
      function B(b) {
        const t = new Uint8Array(16);
        for (let i = 0; i < 15; i++)
          t[i] = (b[i] << 1 | b[i + 1] >>> 7) & 255;
        return t[15] = b[15] << 1 & 255, b[0] & 128 && (t[15] ^= 135), t;
      }
      function J(b, t) {
        const i = new Uint8Array(b.length);
        for (let a = 0; a < b.length; a++)
          i[a] = b[a] ^ t[a];
        return i;
      }
      class Q {
        constructor(t) {
          this.key = t, this.subkeys = null;
        }
        async cbcLast(t) {
          return new Uint8Array(await r.encrypt({ name: "AES-CBC", iv: new Uint8Array(16) }, this.key, t)).subarray(t.length - 16, t.length);
        }
        async mac(t) {
          if (this.subkeys === null) {
            const w = await this.cbcLast(new Uint8Array(16)), y = B(w);
            this.subkeys = [y, B(y)];
          }
          const [i, a] = this.subkeys, l = Math.max(1, Math.ceil(t.length / 16)), h = new Uint8Array(l * 16);
          h.set(t);
          const f = h.subarray((l - 1) * 16);
          return t.length > 0 && t.length % 16 === 0 ? f.set(J(f, i)) : (f[t.length - (l - 1) * 16] = 128, f.set(J(f, a))), this.cbcLast(h);
        }
      }
      async function be(b, t, i) {
        let a = await b.mac(new Uint8Array(16));
        for (const h of t)
          a = J(B(a), await b.mac(h));
        let l;
        if (i.length >= 16)
          l = i.slice(), l.set(J(l.subarray(l.length - 16), a), l.length - 16);
        else {
          const h = new Uint8Array(16);
          h.set(i), h[i.length] = 128, l = J(B(a), h);
        }
        return b.mac(l);
      }
      function pe(b) {
        const t = b.slice();
        return t[8] &= 127, t[12] &= 127, t;
      }
      class $ {
        constructor(t, i) {
          this.cmac = t, this.ctrKey = i;
        }
        async encrypt(t, i) {
          const a = await be(this.cmac, i, t), l = await r.encrypt({ name: "AES-CTR", counter: pe(a), length: 128 }, this.ctrKey, t);
          return A(a, new Uint8Array(l));
        }
        async decrypt(t, i) {
          if (t.length < 16)
            throw new o("corrupt", "name too short");
          const a = t.subarray(0, 16), l = new Uint8Array(await r.decrypt(
            { name: "AES-CTR", counter: pe(a), length: 128 },
            this.ctrKey,
            t.subarray(16)
          ));
          if (!M(await be(this.cmac, i, l), a))
            throw new o("corrupt", "name does not authenticate");
          return l;
        }
      }
      const F = 32 * 1024, fe = 128, oe = {
        SIV_GCM: { header: 68, nonce: 12, overhead: 28 },
        SIV_CTRMAC: { header: 88, nonce: 16, overhead: 48 }
      };
      function we(b, t) {
        const { header: i, overhead: a } = oe[b], l = t - i;
        if (l <= 0)
          return 0;
        const h = Math.floor(l / (F + a)), f = l % (F + a);
        return h * F + Math.max(0, f - a);
      }
      const wt = /[a-zA-Z0-9\-_]{20}(?:[a-zA-Z0-9\-_]{4})*(?:[a-zA-Z0-9\-_]{4}|[a-zA-Z0-9\-_]{3}=|[a-zA-Z0-9\-_]{2}==)/g, en = 36, wr = 10 * 1024, yr = 28, tn = "LOST+FOUND", Xe = "recovery";
      async function gr(b, t, i) {
        let a = 0;
        const l = async () => {
          for (; a < b.length; )
            await i(b[a++]);
        };
        await Promise.all(Array.from({ length: Math.min(t, b.length) }, l));
      }
      const vr = 32767, yt = ".cryptomator-vaults-", br = 1440 * 60 * 1e3, kr = 255;
      function Te(b) {
        return n.getRandomValues(new Uint8Array(b));
      }
      function $e() {
        return n.randomUUID();
      }
      async function Ze(b) {
        return new Uint8Array(await r.digest("SHA-256", b));
      }
      const gt = 999, vt = { HS256: "SHA-256", HS384: "SHA-384", HS512: "SHA-512" }, xr = 2 ** 15, nn = 8, rn = 220, bt = "masterkeyfile:";
      async function an(b, t, i, a, l) {
        const h = await ae(s.encode(String(b).normalize("NFC")), t, i, a, 1, 32);
        try {
          return await r.importKey("raw", h, "AES-KW", !1, l);
        } finally {
          h.fill(0);
        }
      }
      async function Qe(b, t) {
        if (b.version !== gt)
          throw new o("unsupported-format", "key file version " + b.version);
        const i = await an(t, p(b.scryptSalt), b.scryptCostParam, b.scryptBlockSize, ["unwrapKey"]);
        let a;
        try {
          const l = async (h) => new Uint8Array(await r.exportKey(
            "raw",
            await r.unwrapKey("raw", p(h), i, "AES-KW", { name: "HMAC", hash: "SHA-256" }, !0, ["sign"])
          ));
          a = { encRaw: await l(b.primaryMasterKey), macRaw: await l(b.hmacMasterKey) };
        } catch {
          throw new o("wrong-password");
        }
        if (!await Cr(a.macRaw, b))
          throw a.encRaw.fill(0), a.macRaw.fill(0), new o("corrupt", "the key file's version does not authenticate");
        return a;
      }
      function on(b) {
        const t = new Uint8Array(4);
        return new DataView(t.buffer).setInt32(0, b), t;
      }
      async function Cr(b, t) {
        let i;
        try {
          i = p(String(t.versionMac ?? ""));
        } catch {
          return !1;
        }
        const a = await r.importKey("raw", b, { name: "HMAC", hash: "SHA-256" }, !1, ["verify"]);
        return r.verify("HMAC", a, i, on(t.version));
      }
      async function kt({ encRaw: b, macRaw: t }, i, a = xr) {
        const l = Te(8), h = await an(i, l, a, nn, ["wrapKey"]), f = async (S) => new Uint8Array(await r.wrapKey(
          "raw",
          await r.importKey("raw", S, { name: "HMAC", hash: "SHA-256" }, !0, ["sign"]),
          h,
          "AES-KW"
        )), w = await r.importKey("raw", t, { name: "HMAC", hash: "SHA-256" }, !1, ["sign"]), y = {
          version: gt,
          scryptSalt: m(l),
          scryptCostParam: a,
          scryptBlockSize: nn,
          primaryMasterKey: m(await f(b)),
          hmacMasterKey: m(await f(t)),
          versionMac: m(new Uint8Array(await r.sign("HMAC", w, on(gt))))
        };
        return s.encode(JSON.stringify(y, null, 2));
      }
      async function Ar({ encRaw: b, macRaw: t }, i, a) {
        const l = (w) => u(s.encode(JSON.stringify(w)), !1), h = l({ kid: i, typ: "JWT", alg: "HS256" }) + "." + l({ jti: $e(), format: 8, cipherCombo: a, shorteningThreshold: rn }), f = await r.importKey("raw", A(b, t), { name: "HMAC", hash: "SHA-256" }, !1, ["sign"]);
        return h + "." + u(new Uint8Array(await r.sign("HMAC", f, s.encode(h))), !1);
      }
      async function sn(b, { encRaw: t, macRaw: i }) {
        const a = Object.hasOwn(vt, b.header.alg) ? vt[b.header.alg] : null;
        if (a === null)
          return !1;
        const l = await r.importKey("raw", A(t, i), { name: "HMAC", hash: a }, !1, ["verify"]);
        return r.verify("HMAC", l, b.signature, s.encode(b.signed));
      }
      const Er = Array.from({ length: 256 }, (b, t) => {
        let i = t;
        for (let a = 0; a < 8; a++)
          i = i & 1 ? 3988292384 ^ i >>> 1 : i >>> 1;
        return i >>> 0;
      });
      function cn(b) {
        let t = 4294967295;
        for (const i of b)
          t = Er[(t ^ i) & 255] ^ t >>> 8;
        return (t ^ 4294967295) >>> 0;
      }
      function ln(b, t) {
        const i = cn(b), a = A(b, new Uint8Array([i & 255, i >>> 8 & 255])), l = [];
        for (let h = 0; h < a.length; h += 3)
          l.push(t[a[h] << 4 | a[h + 1] >> 4], t[(a[h + 1] & 15) << 8 | a[h + 2]]);
        return a.fill(0), l.join(" ");
      }
      function dn(b, t) {
        const i = new Map(t.map((y, S) => [y, S])), a = String(b).trim().toLowerCase().split(/\s+/).filter(Boolean);
        if (a.length !== 44)
          throw new o("invalid-recovery-key", a.length + " words, not 44");
        const l = a.find((y) => !i.has(y));
        if (l)
          throw new o("invalid-recovery-key", '"' + l + '" is not a word of the list');
        const h = new Uint8Array(66);
        for (let y = 0; y < a.length; y += 2) {
          const S = i.get(a[y]), k = i.get(a[y + 1]);
          h.set([S >> 4, (S & 15) << 4 | k >> 8, k & 255], y / 2 * 3);
        }
        const f = h.slice(0, 64), w = cn(f);
        if (h[64] !== (w & 255) || h[65] !== (w >>> 8 & 255))
          throw new o("invalid-recovery-key", "its check sum does not match");
        return f;
      }
      async function Sr(b, t) {
        const i = await Ze(t);
        return b + "." + [...i.slice(0, 4)].map((a) => a.toString(16).padStart(2, "0").toUpperCase()).join("") + ".bkup";
      }
      async function un(b) {
        let t;
        try {
          t = Mr(d.decode(await b.read(et)));
        } catch (f) {
          throw f instanceof o ? f : new o("unsupported-format", "vault.cryptomator unreadable: " + f.message);
        }
        const { header: i, payload: a } = t;
        if (a.format !== 8)
          throw new o("unsupported-format", "vault format " + a.format);
        if (!(a.cipherCombo in oe))
          throw new o("unsupported-format", "cipher combination " + a.cipherCombo);
        if (!Object.hasOwn(vt, i.alg))
          throw new o("unsupported-format", "signature " + i.alg);
        const l = String(i.kid || "");
        if (!l.startsWith(bt))
          throw new o("unsupported-key", l);
        const h = l.slice(bt.length);
        if (!/^[^/\\]+$/.test(h))
          throw new o("unsupported-key", l);
        return { config: t, name: h };
      }
      function Ie(b) {
        const t = String(b).normalize("NFC");
        if (t === "" || t === "." || t === ".." || /[/\\\u0000-\u001f\u007f]/.test(t) || t.length > kr)
          throw new o("invalid-name", t);
        return t;
      }
      const et = "vault.cryptomator";
      function Mr(b) {
        const t = b.trim().split(".");
        if (t.length !== 3)
          throw new o("unsupported-format", "vault.cryptomator is not a JWT");
        const i = (a) => JSON.parse(d.decode(p(a)));
        return { header: i(t[0]), payload: i(t[1]), signed: t[0] + "." + t[1], signature: p(t[2]) };
      }
      function R(...b) {
        return b.filter((t) => t !== "").join("/");
      }
      class ke {
        constructor(t, i, a) {
          this.storage = t, this.config = i, this.masterkeyFile = a, this.keys = null;
        }
        /** Reads the vault's configuration and key file; checks the format before any password. */
        static async open(t) {
          const { config: i, name: a } = await un(t), l = JSON.parse(d.decode(await t.read(a))), h = new ke(t, i, l);
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
          const i = await Qe(this.masterkeyFile, t);
          try {
            await this.useKeys(i);
          } finally {
            i.encRaw.fill(0), i.macRaw.fill(0);
          }
        }
        /** Takes raw keys into use (not kept raw); refused if the configuration is not signed with them. */
        async useKeys({ encRaw: t, macRaw: i }) {
          if (!await sn(this.config, { encRaw: t, macRaw: i }))
            throw new o("corrupt", "vault.cryptomator is not signed with this key");
          const a = (l, h) => r.importKey("raw", l, h, !1, ["encrypt", "decrypt"]);
          this.keys = {
            gcm: await a(t, "AES-GCM"),
            ctr: await a(t, "AES-CTR"),
            mac: await r.importKey("raw", i, { name: "HMAC", hash: "SHA-256" }, !1, ["sign", "verify"])
          }, this.siv = new $(new Q(await a(i, "AES-CBC")), this.keys.ctr), this.dirPaths = /* @__PURE__ */ new Map();
        }
        /**
         * Creates a vault in an empty folder of the storage, as Cryptomator's desktop
         * app and cryptofs do: new keys, the key file, the configuration, the root
         * directory with its ID's backup (dirid.c9r). Opened again from the storage
         * and unlocked with the password before it is returned, unlocked.
         */
        static async create(t, i, { cipherCombo: a = "SIV_GCM" } = {}) {
          if (typeof t.write != "function")
            throw new o("read-only");
          if (!(a in oe))
            throw new o("unsupported-format", "cipher combination " + a);
          const l = "masterkey.cryptomator";
          for (const w of [et, l, "d"])
            if (await t.stat(w))
              throw new o("exists-other", w);
          const h = { encRaw: Te(32), macRaw: Te(32) };
          try {
            await t.write(l, await kt(h, i), { create: !0 }), await t.write(et, s.encode(await Ar(h, bt + l, a)), { create: !0 });
            const w = await ke.open(t);
            await w.useKeys(h);
            const y = await w.dirPath("");
            await t.mkdir("d", { existsOk: !0 }), await t.mkdir(y.split("/").slice(0, 2).join("/"), { existsOk: !0 }), await t.mkdir(y, { existsOk: !0 }), await t.write(R(y, "dirid.c9r"), await w.encryptContents(new Uint8Array(0)), { create: !0 });
          } finally {
            h.encRaw.fill(0), h.macRaw.fill(0);
          }
          const f = await ke.open(t);
          return await f.unlock(i), f;
        }
        /**
         * Changes the password, as Cryptomator's desktop app does: the keys unwrapped
         * with the old one and wrapped with the new one (a new salt, the same scrypt
         * cost); the old key file kept beside as a backup (backupName). The new one
         * is read back and must give the same keys, else the old one is put back.
         * Nothing else changes: the files stay as they are encrypted.
         */
        async changePassword(t, i) {
          if (typeof this.storage.write != "function")
            throw new o("read-only");
          const a = this.masterkeyName, l = await this.storage.read(a), h = JSON.parse(d.decode(l)), f = await Qe(h, t);
          try {
            await this.replaceKeyFile(a, l, await kt(f, i, h.scryptCostParam), f, i);
          } finally {
            f.encRaw.fill(0), f.macRaw.fill(0);
          }
        }
        /**
         * Puts a new key file in place of the old one (backed up beside it, if there
         * was one) and reads it back: it must give these keys with the password, else
         * the old file is put back (VaultError 'corrupt').
         */
        async replaceKeyFile(t, i, a, l, h) {
          i && await this.storage.write(await Sr(t, i), i), await this.storage.write(t, a, { create: !i });
          const f = JSON.parse(d.decode(await this.storage.read(t)));
          let w = null;
          try {
            w = await Qe(f, h);
          } catch {
          }
          const y = w !== null && M(w.encRaw, l.encRaw) && M(w.macRaw, l.macRaw);
          if (w?.encRaw.fill(0), w?.macRaw.fill(0), !y)
            throw i && await this.storage.write(t, i), new o("corrupt", "the new key file does not read back");
          this.masterkeyFile = f;
        }
        /** The vault's recovery key (encodeRecoveryKey), after its password. */
        async recoveryKey(t, i) {
          const a = await Qe(JSON.parse(d.decode(await this.storage.read(this.masterkeyName))), t), l = A(a.encRaw, a.macRaw);
          try {
            return ln(l, i);
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
        static async resetPassword(t, i, a, l) {
          if (typeof t.write != "function")
            throw new o("read-only");
          const { config: h, name: f } = await un(t), w = dn(i, l), y = { encRaw: w.slice(0, 32), macRaw: w.slice(32) };
          w.fill(0);
          try {
            if (!await sn(h, y))
              throw new o("invalid-recovery-key", "it is not this vault's");
            const k = await t.read(f).catch((T) => {
              if (T?.code === "not-found")
                return null;
              throw T;
            }), E = new ke(t, h, null);
            E.masterkeyName = f, await E.replaceKeyFile(f, k, await kt(y, a), y, a);
          } finally {
            y.encRaw.fill(0), y.macRaw.fill(0);
          }
          const S = await ke.open(t);
          return await S.unlock(a), S;
        }
        /** Forgets the keys; reading needs the password again. */
        lock() {
          this.keys = null, this.siv = null, this.dirPaths = null;
        }
        requireKeys() {
          if (!this.keys)
            throw new o("locked");
        }
        /** The storage folder of a directory: d/XX/YYYY… from the hash of its ID. */
        async dirPath(t) {
          if (this.requireKeys(), !this.dirPaths.has(t)) {
            const i = await this.siv.encrypt(s.encode(t), []), a = x(new Uint8Array(await r.digest("SHA-1", i)));
            this.dirPaths.set(t, R("d", a.slice(0, 2), a.slice(2)));
          }
          return this.dirPaths.get(t);
        }
        /**
         * The name in an entry's file name, found as cryptofs finds it (C9rDecryptor):
         * the first run of base64 in it that decrypts; where one does not, the run is
         * narrowed at its first and last '-' or '_' and tried again. {name, extracted}
         * or null.
         */
        async extractName(t, i, a = 0, l = t.length) {
          const h = new RegExp(wt.source, "g");
          h.lastIndex = a;
          const f = h.exec(t.slice(0, l));
          if (f === null)
            return null;
          const w = f[0];
          try {
            return { name: d.decode(await this.siv.decrypt(p(w), [s.encode(i)])), extracted: w };
          } catch {
            const y = w.search(/[-_]/);
            if (y === -1)
              return null;
            const S = Math.max(w.lastIndexOf("-"), w.lastIndexOf("_")), k = await this.extractName(t, i, f.index + Math.max(1, y), l);
            return k !== null ? k : this.extractName(t, i, a, f.index + w.length - Math.max(1, w.length - S));
          }
        }
        async decryptName(t, i) {
          const a = t.endsWith(".c9r") ? t.slice(0, -4) : t;
          try {
            return d.decode(await this.siv.decrypt(p(a), [s.encode(i)]));
          } catch (l) {
            throw l instanceof o ? l : new o("corrupt", "name not decryptable");
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
          const i = await this.dirPath(t), a = await this.storage.list(i), l = await Promise.all(a.map((w) => this.describe(i, w, t))), h = l.filter((w) => w !== null && !w.conflict);
          for (const w of l.filter((y) => y?.conflict)) {
            const y = await this.resolveConflict(i, t, w);
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
        async resolveConflict(t, i, a) {
          if (typeof this.storage.move != "function")
            return null;
          const l = a.found.extracted + ".c9r", h = R(t, l);
          try {
            try {
              return await this.storage.move(a.path, h), this.describe(t, { ...a.entry, name: l }, i);
            } catch (w) {
              if (w?.code !== "exists")
                throw w;
            }
            const f = await this.storage.stat(h);
            if (a.entry.isDir && f?.isDir) {
              const w = await this.compareTypeFile(a.path, h, "dir.c9r", en, !0);
              if (w.both)
                return w.same ? this.removeDuplicate(a.path) : this.renameConflict(t, i, a);
              const y = await this.compareTypeFile(a.path, h, "symlink.c9r", vr, !1);
              if (y.both)
                return y.same ? this.removeDuplicate(a.path) : this.renameConflict(t, i, a);
              if (!((w.conflicting || y.conflicting) && (w.canonical || y.canonical)))
                return null;
            }
            return this.renameConflict(t, i, a);
          } catch {
            return null;
          }
        }
        async removeDuplicate(t) {
          return await this.storage.remove(t), null;
        }
        /** The first bytes of a folder entry's type file in both entries, compared. */
        async compareTypeFile(t, i, a, l, h) {
          const f = (T) => this.storage.read(R(T, a)).then((I) => I.subarray(0, l), (I) => {
            if (I?.code === "not-found")
              return new Uint8Array(0);
            throw I;
          }), [w, y] = await Promise.all([f(t), f(i)]), S = h ? l : 1, k = w.length >= S, E = y.length >= S;
          return { conflicting: k, canonical: E, both: k && E, same: k && E && M(w, y) };
        }
        /** Renames a conflict's copy as cryptofs does (renameConflictingFile). */
        async renameConflict(t, i, a) {
          const l = a.found.name, h = l.lastIndexOf("."), f = h > 0 ? l.slice(h) : "", w = h > 0 ? l.slice(0, h) : l, y = a.entry.name, S = y.indexOf(a.found.extracted) + a.found.extracted.length, k = y.slice(S, y.length - 4), E = this.config.payload.shorteningThreshold ?? 220, I = Math.trunc((E - 4) / 4) * 3 - 16 - f.length, N = k.slice(0, Math.min(k.length, Math.trunc(I / 2))), _ = w.slice(0, Math.max(0, Math.min(w.length, I - Math.max(4, N.length)))), P = [_ + N + f];
          for (let O = 1; O < 10; O++)
            P.push(_ + " (" + O + ")" + f);
          for (const O of P) {
            const U = u(await this.siv.encrypt(s.encode(O), [s.encode(i)]), !0) + ".c9r", Y = R(t, U);
            if (await this.storage.stat(Y) === null)
              return await this.storage.move(a.path, Y), this.describe(t, { ...a.entry, name: U }, i);
          }
          return null;
        }
        async describe(t, i, a) {
          const l = R(t, i.name), h = await this.describeEntry(t, i, a, l);
          return h !== null && i.mtime && !h.mtime && (h.mtime = i.mtime), h;
        }
        async describeEntry(t, i, a, l) {
          try {
            if (i.name.endsWith(".c9s") && i.isDir) {
              const w = await this.decryptName(d.decode(await this.storage.read(R(l, "name.c9s"))).trim(), a), y = await this.storage.list(l), S = y.find((k) => k.name === "contents.c9r");
              return S ? { name: w, type: "file", size: we(this.scheme, S.size), path: R(l, "contents.c9r"), mtime: S.mtime } : this.describeNode(w, l, y.map((k) => k.name));
            }
            if (!i.name.endsWith(".c9r"))
              return null;
            const h = await this.extractName(i.name.slice(0, -4), a);
            if (h === null)
              return null;
            if (i.name !== h.extracted + ".c9r")
              return i.name.startsWith(".") ? null : { conflict: !0, entry: i, found: h, path: l };
            const f = h.name;
            return i.isDir ? this.describeNode(f, l, null) : { name: f, type: "file", size: we(this.scheme, i.size), path: l };
          } catch (h) {
            return { name: i.name, type: "broken", error: h.message, path: l };
          }
        }
        // A folder <name>.c9r (or .c9s): a directory (dir.c9r, its ID) or a link (symlink.c9r).
        async describeNode(t, i, a) {
          const l = async (w) => {
            if (a !== null && !a.includes(w))
              return null;
            try {
              return await this.storage.read(R(i, w));
            } catch (y) {
              if (y instanceof o && y.code === "not-found")
                return null;
              throw y;
            }
          }, h = await l("dir.c9r");
          if (h !== null)
            return { name: t, type: "dir", dirId: d.decode(h).trim(), path: i };
          const f = await l("symlink.c9r");
          if (f !== null) {
            const w = d.decode(await this.decryptContents(f));
            return { name: t, type: "link", target: w, path: i };
          }
          throw new o("corrupt", "neither a directory nor a link");
        }
        /**
         * A file's decrypted contents: onProgress(done, total) after each chunk,
         * onDownload(done, total) while the storage reads it (if it reports that).
         */
        async readFile(t, i, a) {
          return this.decryptContents(await this.storage.read(t.path, a), i);
        }
        async decryptContents(t, i) {
          this.requireKeys();
          const a = oe[this.scheme];
          if (t.length === 0)
            return new Uint8Array(0);
          if (t.length < a.header)
            throw new o("corrupt", "file header too short");
          const l = t.subarray(0, a.header), h = l.subarray(0, a.nonce), f = await this.decryptHeader(l, h), w = t.subarray(a.header), y = F + a.overhead, S = new Uint8Array(we(this.scheme, t.length));
          for (let k = 0, E = 0; E < w.length; k++, E += y) {
            const T = w.subarray(E, Math.min(E + y, w.length)), I = await this.decryptChunk(T, k, h, f);
            S.set(I, k * F), i && i(Math.min(E + y, w.length), w.length);
          }
          return S;
        }
        async decryptHeader(t, i) {
          let a;
          if (this.scheme === "SIV_GCM")
            try {
              a = new Uint8Array(await r.decrypt({ name: "AES-GCM", iv: i }, this.keys.gcm, t.subarray(12)));
            } catch {
              throw new o("corrupt", "file header does not authenticate");
            }
          else {
            const w = t.subarray(16, 56);
            if (!await r.verify("HMAC", this.keys.mac, t.subarray(56, 88), t.subarray(0, 56)))
              throw new o("corrupt", "file header does not authenticate");
            a = new Uint8Array(await r.decrypt({ name: "AES-CTR", counter: i, length: 128 }, this.keys.ctr, w));
          }
          const l = a.subarray(8, 40), h = this.scheme === "SIV_GCM" ? "AES-GCM" : "AES-CTR", f = await r.importKey("raw", l, h, !1, ["decrypt"]);
          return a.fill(0), f;
        }
        async decryptChunk(t, i, a, l) {
          try {
            if (this.scheme === "SIV_GCM") {
              const y = t.subarray(0, 12);
              return new Uint8Array(await r.decrypt(
                { name: "AES-GCM", iv: y, additionalData: A(C(i), a) },
                l,
                t.subarray(12)
              ));
            }
            const h = t.subarray(0, 16), f = t.subarray(16, t.length - 32), w = t.subarray(t.length - 32);
            if (!await r.verify("HMAC", this.keys.mac, w, A(a, C(i), h, f)))
              throw new Error("mac");
            return new Uint8Array(await r.decrypt({ name: "AES-CTR", counter: h, length: 128 }, l, f));
          } catch {
            throw new o("corrupt", "chunk " + i + " does not authenticate");
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
            throw new o("read-only");
        }
        /**
         * Where a directory's entry of this (checked) name lives: {path (its .c9r, or
         * .c9s for a long name), long, fullName (the encrypted name)}.
         */
        async entryPath(t, i) {
          const a = await this.dirPath(t), l = u(await this.siv.encrypt(s.encode(i), [s.encode(t)]), !0) + ".c9r", h = this.config.payload.shorteningThreshold ?? 220;
          if (l.length > h) {
            const f = u(new Uint8Array(await r.digest("SHA-1", s.encode(l))), !0) + ".c9s";
            return { folder: a, path: R(a, f), long: !0, fullName: l };
          }
          return { folder: a, path: R(a, l), long: !1, fullName: l };
        }
        /** What is stored at an entry's place: null, 'file', 'dir', 'link' or 'unknown'. */
        async existing(t) {
          const i = await this.storage.stat(t.path);
          if (!i)
            return null;
          if (!i.isDir)
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
          const t = oe[this.scheme], i = this.scheme === "SIV_GCM", a = Te(t.nonce), l = Te(32), h = A(new Uint8Array(8).fill(255), l);
          let f;
          if (i)
            f = A(a, new Uint8Array(await r.encrypt({ name: "AES-GCM", iv: a }, this.keys.gcm, h)));
          else {
            const S = new Uint8Array(await r.encrypt({ name: "AES-CTR", counter: a, length: 128 }, this.keys.ctr, h)), k = new Uint8Array(await r.sign("HMAC", this.keys.mac, A(a, S)));
            f = A(a, S, k);
          }
          const w = await r.importKey("raw", l, i ? "AES-GCM" : "AES-CTR", !1, ["encrypt"]);
          h.fill(0), l.fill(0);
          const y = this.keys;
          return {
            header: f,
            async encryptChunk(S, k) {
              const E = Te(t.nonce);
              if (i)
                return A(E, new Uint8Array(await r.encrypt(
                  { name: "AES-GCM", iv: E, additionalData: A(C(S), a) },
                  w,
                  k
                )));
              const T = new Uint8Array(await r.encrypt({ name: "AES-CTR", counter: E, length: 128 }, w, k)), I = new Uint8Array(await r.sign("HMAC", y.mac, A(a, C(S), E, T)));
              return A(E, T, I);
            }
          };
        }
        /** The size of a file of this many bytes, encrypted. */
        encryptedSize(t) {
          const i = oe[this.scheme];
          return i.header + t + Math.ceil(t / F) * i.overhead;
        }
        /** A file's contents encrypted as Cryptomator does: a new content key, header, chunks. */
        async encryptContents(t, i) {
          const a = await this.startEncryption(), l = Math.ceil(t.length / F), h = new Uint8Array(this.encryptedSize(t.length));
          h.set(a.header);
          for (let f = 0, w = a.header.length; f < l; f++) {
            const y = await a.encryptChunk(f, t.subarray(f * F, Math.min((f + 1) * F, t.length)));
            h.set(y, w), w += y.length, i && i(f + 1, l);
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
        async *encryptedParts(t, i, a) {
          const l = await this.startEncryption(), h = 32 * F;
          let f = [l.header], w = l.header.length;
          for (let y = 0, S = 0; y < t.size; y += h) {
            const k = await t.read(y, Math.min(y + h, t.size));
            for (let E = 0; E < k.length; E += F, S++) {
              const T = await l.encryptChunk(S, k.subarray(E, Math.min(E + F, k.length)));
              f.push(T), w += T.length, w >= i && (yield A(...f), f = [], w = 0);
            }
            a?.(Math.min(y + h, t.size), t.size);
          }
          w > 0 && (yield A(...f));
        }
        /**
         * Compares a stored file with its source, in ranges: each chunk decrypted and
         * authenticated, its bytes equal to the source's.
         */
        async checkStoredStream(t, i, a) {
          const l = oe[this.scheme], h = this.encryptedSize(i.size), f = await this.storage.stat(t);
          if (!f || f.size !== h)
            throw new o("corrupt", "the stored file has " + (f?.size ?? "no") + " bytes, not " + h);
          const w = await this.storage.readRange(t, 0, l.header), y = w.subarray(0, l.nonce), S = await this.decryptHeader(w, y), k = F + l.overhead, E = Math.ceil(i.size / F), T = 32;
          for (let I = 0; I < E; I += T) {
            const N = Math.min(I + T, E), _ = l.header + I * k, P = await this.storage.readRange(t, _, Math.min(l.header + N * k, h)), O = await i.read(I * F, Math.min(N * F, i.size));
            for (let U = I; U < N; U++) {
              const Y = (U - I) * k, re = await this.decryptChunk(P.subarray(Y, Math.min(Y + k, P.length)), U, y, S);
              if (!M(re, O.subarray((U - I) * F, (U - I) * F + re.length)))
                throw new o("corrupt", "the stored file differs from the one written (chunk " + U + ")");
            }
            a?.(Math.min(N * F, i.size), i.size);
          }
        }
        /**
         * writeFile for a source read in pieces (see above). options: replace,
         * onProgress(phase, done, total) with the phases 'upload' and 'verify',
         * partSize (bytes per part handed to the storage).
         */
        async writeFileStream(t, i, a, l = {}) {
          this.requireWritable();
          const { replace: h = !1, onProgress: f, partSize: w = 10 * 1024 * 1024 } = l, y = (O) => (U, Y) => f?.(O, U, Y), S = Ie(i), k = await this.entryPath(t, S), E = await this.existing(k);
          if (E !== null && (E !== "file" || !h))
            throw new o(E === "file" ? "exists" : "exists-other", S);
          const T = this.encryptedSize(a.size), I = k.long ? R(k.path, "contents.c9r") : k.path, N = this.stagingPath(), _ = k.long && E === null, P = _ ? R(N, "contents.c9r") : N;
          try {
            _ && (await this.storage.mkdir(N), await this.storage.write(R(N, "name.c9s"), s.encode(k.fullName), { create: !0 })), await this.storage.writeParts(P, T, this.encryptedParts(a, w, y("upload")), { create: !0 }), await this.checkStoredStream(P, a, y("verify")), _ ? await this.storage.move(N, k.path) : await this.storage.move(N, I, { overwrite: E !== null });
          } catch (O) {
            throw await this.storage.remove(N).catch(() => {
            }), O;
          }
          return { name: S, path: I, size: a.size };
        }
        /**
         * A file's decrypted contents in pieces, for a file too large to hold:
         * onPiece(bytes) for each range of chunks in turn (awaited), each chunk
         * authenticated; onProgress(done, total).
         */
        async readFileStream(t, i, a) {
          for await (const l of this.decryptedPieces(t, a))
            await i(l);
        }
        /**
         * A file's decrypted contents in pieces of up to 64 chunks (2 MiB), in order,
         * each read in one range and checked: what readFileStream hands on, for a
         * reader that pulls (e.g. an upload in parts). Nothing for an empty file.
         */
        async *decryptedPieces(t, i) {
          this.requireKeys();
          const a = oe[this.scheme], l = await this.storage.stat(t.path);
          if (!l || l.size === 0)
            return;
          if (l.size < a.header)
            throw new o("corrupt", "file header too short");
          const h = await this.storage.readRange(t.path, 0, a.header), f = h.subarray(0, a.nonce), w = await this.decryptHeader(h, f), y = F + a.overhead, S = we(this.scheme, l.size), k = Math.ceil((l.size - a.header) / y), E = 64;
          for (let T = 0; T < k; T += E) {
            const I = Math.min(T + E, k), N = await this.storage.readRange(t.path, a.header + T * y, Math.min(a.header + I * y, l.size)), _ = [];
            for (let P = T; P < I; P++) {
              const O = (P - T) * y;
              _.push(await this.decryptChunk(N.subarray(O, Math.min(O + y, N.length)), P, f, w));
            }
            yield A(..._), i?.(Math.min(I * F, S), S);
          }
        }
        /**
         * A file opened for reads anywhere in it, as a player asks (a range of bytes,
         * then another after a seek): { size, read(start, end) }. Each read fetches
         * only the chunks its bytes are in, in one range, and decrypts them (which
         * authenticates them); the header once. The chunks last read are kept
         * (CACHED_CHUNKS), as players ask for overlapping ranges.
         */
        async openFile(t) {
          this.requireKeys();
          const i = oe[this.scheme], a = await this.storage.stat(t.path);
          if (!a)
            throw new o("not-found", t.path);
          if (a.size > 0 && a.size < i.header)
            throw new o("corrupt", "file header too short");
          const l = we(this.scheme, a.size), h = F + i.overhead, f = /* @__PURE__ */ new Map(), w = (k, E) => {
            f.delete(k), f.set(k, E);
          };
          let y = null;
          const S = () => (y ??= this.storage.readRange(t.path, 0, i.header).then(async (k) => {
            const E = k.subarray(0, i.nonce);
            return { nonce: E, contentKey: await this.decryptHeader(k, E) };
          }), y.catch(() => {
            y = null;
          }), y);
          return {
            size: l,
            read: async (k, E) => {
              if (k = Math.max(0, k), E = Math.min(E, l), E <= k)
                return new Uint8Array(0);
              const T = Math.floor(k / F), I = Math.ceil(E / F);
              let N = T;
              for (; N < I && f.has(N); )
                w(N, f.get(N)), N++;
              if (N < I) {
                const { nonce: P, contentKey: O } = await S(), U = await this.storage.readRange(t.path, i.header + N * h, Math.min(i.header + I * h, a.size));
                for (let Y = N; Y < I; Y++) {
                  const re = (Y - N) * h;
                  w(Y, await this.decryptChunk(U.subarray(re, Math.min(re + h, U.length)), Y, P, O));
                }
              }
              const _ = new Uint8Array(E - k);
              for (let P = T; P < I; P++) {
                const O = f.get(P), U = Math.max(k - P * F, 0), Y = Math.min(E - P * F, O.length);
                _.set(O.subarray(U, Y), P * F + U - k);
              }
              for (; f.size > fe; )
                f.delete(f.keys().next().value);
              return _;
            }
          };
        }
        /**
         * A staging name in the vault's top folder, outside d/: Cryptomator passes it
         * by, and its health checks (which look at d/) do not report one a browser
         * left behind. Moving from there is still one rename on the server.
         */
        stagingPath() {
          return yt + $e() + ".tmp";
        }
        /**
         * Removes the staging files and folders that writes which never finished (a
         * browser closed midway) left in the vault's top folder, once they are older
         * than olderThan (milliseconds; LEFTOVER_AGE), so that a write still going on
         * elsewhere is left alone. Nothing for a vault that cannot be written. Returns
         * the names removed.
         */
        async removeLeftovers({ olderThan: t = br, now: i = Date.now() } = {}) {
          if (this.requireKeys(), typeof this.storage.write != "function")
            return [];
          const a = [];
          for (const l of await this.storage.list(""))
            l.name.startsWith(yt) && l.name.endsWith(".tmp") && l.mtime && i - l.mtime.getTime() >= t && (await this.storage.remove(l.name), a.push(l.name));
          return a;
        }
        /**
         * Puts an entry of several files (name -> bytes) together in a staging folder,
         * checks it (check(stagingFolder), if given) and moves it into
         * place in one step; refused if the place is taken meanwhile. The staging
         * folder goes on any failure.
         */
        async stageAndMove(t, i, a) {
          const l = this.stagingPath();
          await this.storage.mkdir(l);
          try {
            for (const [h, f] of Object.entries(i))
              await this.storage.write(R(l, h), f, { create: !0 });
            a && await a(l), await this.storage.move(l, t.path);
          } catch (h) {
            throw await this.storage.remove(l).catch(() => {
            }), h;
          }
        }
        /** Reads a stored file back and compares it with what was written. */
        async checkStored(t, i, a) {
          const l = await this.storage.read(t, a);
          let h;
          try {
            h = await this.decryptContents(l);
          } catch (f) {
            throw new o("corrupt", "the stored file does not decrypt: " + f.message);
          }
          if (!M(await Ze(h), i))
            throw new o("corrupt", "the stored file differs from the one written");
        }
        /**
         * Writes a file into a directory. options.replace allows replacing a file of
         * that name (never a folder); onProgress(phase, done, total) with the phases
         * 'encrypt', 'upload' and 'verify'. Returns {name, path, size}.
         */
        async writeFile(t, i, a, l = {}) {
          this.requireWritable();
          const { replace: h = !1, onProgress: f } = l, w = (_) => (P, O) => f?.(_, P, O), y = Ie(i), S = await this.entryPath(t, y), k = await this.existing(S);
          if (k !== null && (k !== "file" || !h))
            throw new o(k === "file" ? "exists" : "exists-other", y);
          const E = await Ze(a), T = await this.encryptContents(a, w("encrypt"));
          if (!M(await Ze(await this.decryptContents(T)), E))
            throw new o("corrupt", "the encryption does not read back");
          const I = S.long ? R(S.path, "contents.c9r") : S.path;
          if (S.long && k === null)
            return await this.stageAndMove(
              S,
              { "name.c9s": s.encode(S.fullName), "contents.c9r": T },
              (_) => this.checkStored(R(_, "contents.c9r"), E, w("verify"))
            ), { name: y, path: I, size: a.length };
          const N = this.stagingPath();
          try {
            await this.storage.write(N, T, { create: !0, onProgress: w("upload") }), await this.checkStored(N, E, w("verify")), await this.storage.move(N, I, { overwrite: k !== null });
          } catch (_) {
            throw await this.storage.remove(N).catch(() => {
            }), _;
          }
          return { name: y, path: I, size: a.length };
        }
        /** Creates a folder in a directory. Returns {name, dirId}. */
        async createDirectory(t, i) {
          this.requireWritable();
          const a = Ie(i), l = await this.entryPath(t, a);
          if (await this.existing(l) !== null)
            throw new o("exists-other", a);
          const h = $e(), f = await this.dirPath(h);
          await this.storage.mkdir(f.split("/").slice(0, 2).join("/"), { existsOk: !0 }), await this.storage.mkdir(f);
          try {
            await this.storage.write(R(f, "dirid.c9r"), await this.encryptContents(s.encode(h)), { create: !0 });
            const y = { "dir.c9r": s.encode(h) };
            l.long && (y["name.c9s"] = s.encode(l.fullName)), await this.stageAndMove(l, y);
          } catch (y) {
            throw await this.storage.remove(f).catch(() => {
            }), y;
          }
          const w = (await this.list(t)).find((y) => y.type === "dir" && y.dirId === h);
          if (!w || w.name !== a)
            throw new o("corrupt", "the new folder does not read back");
          return { name: a, dirId: h };
        }
        /**
         * The folder of this name in a directory: the one there (an upload of a folder
         * merges into it), or a new one. Refused where a file or link has the name.
         * Returns {name, dirId, created}.
         */
        async ensureDirectory(t, i) {
          this.requireWritable();
          const a = await this.findEntry(t, i);
          if (a === null)
            return { ...await this.createDirectory(t, i), created: !0 };
          if (a.kind !== "dir")
            throw new o("exists-other", a.name);
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
        async findEntry(t, i) {
          const a = Ie(i), l = await this.entryPath(t, a), h = await this.existing(l);
          if (h === null)
            return null;
          if (h === "unknown")
            throw new o("corrupt", "the entry of " + a + " is neither file, folder nor link");
          return { ...l, name: a, kind: h };
        }
        async entryDirId(t) {
          return d.decode(await this.storage.read(R(t.path, "dir.c9r"))).trim();
        }
        /**
         * Renames and/or moves an entry: from a directory to another (or the same)
         * under a new (or the same) name. Refused where the new name is taken. A
         * folder moved to another directory needs options.ancestors, the IDs of the
         * target's directories from the vault's top ('' first): a folder cannot go into
         * itself or below itself. Returns {name}.
         */
        async moveEntry(t, i, a, l, h = {}) {
          this.requireWritable();
          const f = await this.findEntry(t, i);
          if (f === null)
            throw new o("not-found", String(i));
          const w = Ie(l ?? f.name);
          if (t === a && w === f.name)
            return { name: w };
          if (f.kind === "dir" && t !== a) {
            const S = h.ancestors;
            if (!Array.isArray(S) || S[S.length - 1] !== a)
              throw new o("invalid-move", "the target's ancestors are not known");
            const k = await this.entryDirId(f);
            if (S.includes(k))
              throw new o("invalid-move", f.name);
          }
          const y = await this.entryPath(a, w);
          if (await this.existing(y) !== null)
            throw new o("exists-other", w);
          return !f.long && !y.long ? (await this.storage.move(f.path, y.path), { name: w }) : (await this.rebuildEntry(f, y), await this.storage.remove(f.path), { name: w });
        }
        /**
         * Puts an entry together anew at another place (for a change between short
         * and long names): its files copied on the server into a staging name, a
         * file's contents checked (they decrypt and authenticate), then moved into
         * place in one step. The old entry stays.
         */
        async rebuildEntry(t, i) {
          const a = this.stagingPath(), l = { file: "contents.c9r", dir: "dir.c9r", link: "symlink.c9r" }[t.kind], h = t.long || t.kind !== "file" ? R(t.path, l) : t.path, f = i.long || t.kind !== "file" ? R(a, l) : a;
          try {
            if (f !== a && await this.storage.mkdir(a), await this.storage.copy(h, f), i.long && await this.storage.write(R(a, "name.c9s"), s.encode(i.fullName), { create: !0 }), t.kind !== "dir")
              await this.decryptContents(await this.storage.read(f));
            else if (d.decode(await this.storage.read(f)).trim() !== await this.entryDirId(t))
              throw new o("corrupt", "the copied folder entry differs");
            await this.storage.move(a, i.path);
          } catch (w) {
            throw await this.storage.remove(a).catch(() => {
            }), w;
          }
        }
        /** The IDs of a folder and of every folder below it. */
        async subtree(t) {
          const i = [t];
          for (const a of await this.list(t))
            if (a.type === "dir")
              i.push(...await this.subtree(a.dirId));
            else if (a.type === "broken" && a.path.endsWith(".c9r")) {
              const l = await this.storage.read(R(a.path, "dir.c9r")).then((h) => d.decode(h).trim(), () => null);
              l !== null && i.push(...await this.subtree(l));
            }
          return i;
        }
        /**
         * Deletes an entry: a file or link, or a folder with everything in it (its
         * entry first, so that all of it disappears at once; then the directories of
         * the folder and of every folder below it). Returns {name, folders}.
         */
        async removeEntry(t, i) {
          this.requireWritable();
          const a = await this.findEntry(t, i);
          if (a === null)
            throw new o("not-found", String(i));
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
          const i = [], a = (k, E, T, I = {}) => i.push({ kind: k, severity: E, path: T, fixable: !1, ...I }), l = async (k) => {
            try {
              return await this.storage.list(k);
            } catch (E) {
              if (E?.code === "not-found")
                return [];
              throw E;
            }
          }, h = /* @__PURE__ */ new Map([["", null]]), f = /* @__PURE__ */ new Map(), w = [];
          for (const k of (await l("d")).filter((E) => E.isDir))
            for (const E of (await l("d/" + k.name)).filter((T) => T.isDir)) {
              const T = R("d", k.name, E.name), I = await l(T);
              f.set(T, I.some((N) => !N.isDir && N.name === "dirid.c9r"));
              for (const N of I)
                N.isDir ? w.push(R(T, N.name)) : N.name === "dir.c9r" && a("LooseDirFile", "INFO", R(T, N.name), { fixable: !0 });
            }
          let y = 0;
          await gr(w, 8, async (k) => {
            const E = k.split("/").pop(), T = E.endsWith(".c9r"), I = E.endsWith(".c9s"), N = await l(k), _ = (O) => N.find((U) => !U.isDir && U.name === O), P = _("dir.c9r");
            if (P) {
              const O = R(k, "dir.c9r");
              if (!T && !I)
                a("LooseDirFile", "INFO", O, { fixable: !0 });
              else if (P.size > en)
                a("ObeseDirFile", "CRITICAL", O);
              else if (P.size === 0)
                a("EmptyDirFile", "CRITICAL", O, { fixable: !0 });
              else {
                const U = d.decode(await this.storage.read(O));
                h.has(U) ? a("DirIdCollision", "CRITICAL", O, { dirId: U, other: h.get(U) }) : h.set(U, O);
              }
            }
            if (T || I) {
              const O = [P && "DIRECTORY", _("symlink.c9r") && "SYMLINK", I && _("contents.c9r") && "FILE"].filter(Boolean);
              O.length === 0 ? a("UnknownType", "CRITICAL", k, { fixable: N.length === 0 }) : O.length > 1 && a("AmbiguousType", "CRITICAL", k, { types: O });
            }
            I && await this.checkShortened(k, _("name.c9s"), a), t?.(++y, w.length);
          });
          for (const [k, E] of h) {
            const T = await this.dirPath(k);
            f.has(T) ? (f.get(T) || a("MissingDirIdBackup", "INFO", T, { dirId: k, fixable: !0 }), f.delete(T)) : a("MissingContentDir", "WARN", E ?? T, { dirId: k, fixable: !0 });
          }
          for (const k of f.keys())
            a("OrphanContentDir", "WARN", k, { fixable: !0 });
          const S = { CRITICAL: 0, WARN: 1, INFO: 2 };
          return i.sort((k, E) => S[k.severity] - S[E.severity] || k.kind.localeCompare(E.kind) || k.path.localeCompare(E.path));
        }
        /** cryptofs' ShortenedNamesCheck for one .c9s directory. */
        async checkShortened(t, i, a) {
          const l = R(t, "name.c9s");
          if (!i) {
            a("MissingLongName", "CRITICAL", t);
            return;
          }
          if (i.size > wr) {
            a("ObeseNameFile", "CRITICAL", l);
            return;
          }
          const h = d.decode(await this.storage.read(l)), f = h.indexOf(".c9r");
          if (f === -1 || !/^[A-Za-z0-9_-]*={0,2}$/.test(h.slice(0, f)) || h.slice(0, f).length % 4 !== 0) {
            a("NotDecodableLongName", "CRITICAL", l);
            return;
          }
          if (h.length > f + 4) {
            a("TrailingBytesInNameFile", "WARN", l, { longName: h, fixable: !0 });
            return;
          }
          const w = u(new Uint8Array(await r.digest("SHA-1", s.encode(h))), !0) + ".c9s";
          t.split("/").pop() !== w && a("LongShortNamesMismatch", "WARN", t, { expected: w, fixable: !0 });
        }
        /** Applies the repair cryptofs offers for a finding of checkHealth. */
        async repair(t) {
          this.requireWritable();
          const i = (a) => a.split("/").slice(0, -1).join("/");
          switch (t.kind) {
            case "LooseDirFile":
              await this.storage.remove(t.path);
              return;
            case "EmptyDirFile": {
              await this.storage.remove(t.path), (await this.storage.list(i(t.path))).length === 0 && await this.storage.remove(i(t.path));
              return;
            }
            case "MissingContentDir":
            case "MissingDirIdBackup": {
              const a = await this.dirPath(t.dirId);
              await this.storage.mkdir(i(a), { existsOk: !0 }), await this.storage.mkdir(a, { existsOk: !0 }), await this.storage.write(R(a, "dirid.c9r"), await this.encryptContents(s.encode(t.dirId)), { create: !0 });
              return;
            }
            case "LongShortNamesMismatch":
              await this.storage.move(t.path, R(i(t.path), t.expected));
              return;
            case "TrailingBytesInNameFile":
              await this.storage.write(t.path, s.encode(t.longName.slice(0, t.longName.indexOf(".c9r") + 4)));
              return;
            case "UnknownType":
              await this.storage.remove(t.path);
              return;
            case "OrphanContentDir":
              await this.adoptOrphan(t.path);
              return;
            default:
              throw new o("not-repairable", t.kind);
          }
        }
        /**
         * The entries of a directory no folder points to, rescued as cryptofs rescues
         * them (OrphanContentDir): into /LOST+FOUND/<the directory's d/ path, XX and
         * YYY joined>/, by their names where the directory's ID backup decrypts them,
         * else as file1_…, directory1_…, symlink1_…; anything else in it moved along.
         */
        async adoptOrphan(t) {
          const i = await this.dirPath(""), a = R(i, await this.encryptedName(tn, "")), l = R(a, "dir.c9r");
          if (await this.storage.stat(l)) {
            if (d.decode(await this.storage.read(l)) !== Xe)
              throw new o("exists-other", "/" + tn);
          } else
            await this.storage.mkdir(a, { existsOk: !0 }), await this.storage.write(l, s.encode(Xe), { create: !0 });
          const h = await this.ensureContentDir(Xe);
          if (h === t)
            return;
          const f = R(h, await this.encryptedName(t.split("/").slice(1).join(""), Xe)), w = R(f, "dir.c9r");
          let y;
          await this.storage.stat(w) ? y = d.decode(await this.storage.read(w)) : (y = $e(), await this.storage.mkdir(f, { existsOk: !0 }), await this.storage.write(w, s.encode(y), { create: !0 }));
          const S = await this.ensureContentDir(y);
          let k = null;
          try {
            k = d.decode(await this.decryptContents(await this.storage.read(R(t, "dirid.c9r"))));
          } catch {
          }
          const E = Math.floor(Math.random() * 65536).toString(32), T = { file: 0, directory: 0, symlink: 0 }, I = "_withVeryLongName".repeat((((rn - 4) / 4 | 0) * 3 - 16) % 17 + 1), N = await this.storage.list(t);
          for (const _ of N) {
            if (_.name.length < yr || !(_.name.endsWith(".c9r") || _.name.endsWith(".c9s")))
              continue;
            const P = _.name.endsWith(".c9s"), O = R(t, _.name);
            let U = null;
            if (k !== null)
              try {
                const re = P ? d.decode(await this.storage.read(R(O, "name.c9s"))) : _.name;
                U = await this.decryptName(re, k);
              } catch {
              }
            if (U === null) {
              const re = _.isDir ? await this.storage.list(O) : [], hn = re.some((xt) => xt.name === "dir.c9r") ? "directory" : re.some((xt) => xt.name === "symlink.c9r") ? "symlink" : "file";
              U = hn + ++T[hn] + "_" + E + (P ? I : "");
            }
            const Y = await this.encryptedName(U, y);
            if (P) {
              const re = u(new Uint8Array(await r.digest("SHA-1", s.encode(Y))), !0) + ".c9s";
              await this.storage.move(O, R(S, re)), await this.storage.write(R(S, re, "name.c9s"), s.encode(Y));
            } else
              await this.storage.move(O, R(S, Y));
          }
          await this.storage.remove(R(t, "dirid.c9r"));
          for (const _ of await this.storage.list(t))
            await this.storage.move(R(t, _.name), R(S, _.name));
          await this.storage.remove(t);
        }
        /** An entry's encrypted name (.c9r) in a directory, not shortened. */
        async encryptedName(t, i) {
          return u(await this.siv.encrypt(s.encode(t), [s.encode(i)]), !0) + ".c9r";
        }
        /** A directory's folder in d/, made with its ID's backup where missing. */
        async ensureContentDir(t) {
          const i = await this.dirPath(t);
          return await this.storage.mkdir(i.split("/").slice(0, 2).join("/"), { existsOk: !0 }), await this.storage.mkdir(i, { existsOk: !0 }), await this.storage.stat(R(i, "dirid.c9r")) || await this.storage.write(R(i, "dirid.c9r"), await this.encryptContents(s.encode(t)), { create: !0 }), i;
        }
      }
      return { Vault: ke, VaultError: o, cleartextSize: we, checkName: Ie, scrypt: ae, Siv: $, Cmac: Q, base32Encode: x, base64UrlEncode: u, base64Decode: p, encodeRecoveryKey: ln, decodeRecoveryKey: dn, VAULT_CONFIG: et, STAGING_PREFIX: yt };
    });
  })(nt)), nt.exports;
}
var Vr = Hr();
const zn = /* @__PURE__ */ Tr(Vr), Ln = "cryptomator_vaults";
function c(e, n) {
  return Ir(Ln, e, n, void 0, { escape: !1 });
}
function Ct(e, n, r, s) {
  return Nr(Ln, e, n, r, s, { escape: !1 });
}
const zt = new URL(Fn("cryptomator_vaults", "js", "stream-worker.js"), window.location.href).href, ot = new URL("stream/", zt).href, fn = 1e4, Kr = 1e4, Br = 1800 * 1e3, ge = /* @__PURE__ */ new Map();
let mn = null, Nt = null, rt = null;
function Lt() {
  return mn ??= Wr().catch(() => !1), mn;
}
async function Wr() {
  return !window.isSecureContext || !("serviceWorker" in navigator) ? !1 : (navigator.serviceWorker.addEventListener("message", Gr), navigator.serviceWorker.startMessages(), Nt = await navigator.serviceWorker.register(zt, { scope: ot }), await wn(jr(Nt), fn), wn(qr(), fn));
}
const wn = (e, n) => Promise.race([e, new Promise((r, s) => setTimeout(() => s(new Error("timeout")), n))]);
function jr(e) {
  if (e.active)
    return Promise.resolve();
  const n = e.installing || e.waiting;
  return new Promise((r, s) => {
    n.addEventListener("statechange", () => {
      n.state === "activated" ? r() : n.state === "redundant" && s(new Error("the stream worker did not start"));
    });
  });
}
function qr() {
  return new Promise((e) => {
    const n = Un(ot + "probe");
    n.addEventListener("load", () => {
      let r = !1;
      try {
        r = n.contentDocument?.documentElement?.getAttribute("data-cryptomator-stream") === "ok";
      } catch {
      }
      n.remove(), e(r);
    }), document.body.append(n);
  });
}
function Un(e) {
  const n = document.createElement("iframe");
  return n.hidden = !0, n.setAttribute("aria-hidden", "true"), n.src = e, n;
}
function Gr(e) {
  const n = e.ports?.[0];
  if (e.data?.type !== "cryptomator-stream" || !n || e.source?.scriptURL !== zt)
    return;
  const r = ge.get(e.data.id);
  if (!r) {
    n.postMessage({ unknown: !0 });
    return;
  }
  e.data.op === "info" ? n.postMessage({ size: r.file.size, type: r.type, name: r.name, kind: r.kind }) : e.data.op === "read" && (r.read = Date.now(), r.file.read(e.data.start, e.data.end).then((s) => {
    n.postMessage({ bytes: s }, [s.buffer]), r.kind === "download" && e.data.end >= r.file.size && setTimeout(() => qe(e.data.id), 6e4);
  }, (s) => n.postMessage({ error: s?.message || String(s) })));
}
function Hn(e, n, r, s) {
  const d = Array.from(crypto.getRandomValues(new Uint8Array(16)), (o) => o.toString(16).padStart(2, "0")).join("");
  return ge.set(d, { file: e, name: n, type: r, kind: s, read: Date.now() }), rt ??= setInterval(() => {
    const o = Date.now();
    for (const [p, u] of ge)
      u.kind === "download" && o - u.read > Br && qe(p);
    Nt?.active?.postMessage({ type: "cryptomator-keepalive" });
  }, Kr), { id: d, frame: ot + d + "/frame", url: ot + d + "/file" };
}
function qe(e) {
  const n = ge.get(e);
  ge.delete(e), n?.frame?.remove(), ge.size === 0 && rt && (clearInterval(rt), rt = null);
}
function Yr() {
  for (const e of [...ge.keys()])
    qe(e);
}
function Vn(e, n) {
  const { id: r, url: s } = Hn(e, n, "application/octet-stream", "download"), d = Un(s + "?download");
  ge.get(r).frame = d, document.body.append(d), e.size === 0 && setTimeout(() => qe(r), 6e4);
}
const Jr = 100 * 1024 * 1024, Xr = 5 * 1024 * 1024, Kn = 1024 * 1024 * 1024, $r = ["video", "audio", "pdf"], Dt = /* @__PURE__ */ new Set();
function g(e, n, r) {
  const s = document.createElement(e);
  for (const [d, o] of Object.entries(n || {}))
    o == null || o === !1 || (d === "class" ? s.className = o : d.startsWith("on") ? s.addEventListener(d.slice(2), o) : s.setAttribute(d, o === !0 ? "" : o));
  for (const d of [].concat(r ?? []))
    d != null && d !== !1 && s.append(d instanceof Node ? d : document.createTextNode(String(d)));
  return s;
}
function Ke(e) {
  if (window.OC?.Util?.humanFileSize)
    return window.OC.Util.humanFileSize(e);
  const n = ["B", "KB", "MB", "GB", "TB"];
  let r = e, s = 0;
  for (; r >= 1024 && s < n.length - 1; )
    r /= 1024, s++;
  return (s === 0 ? r : r.toFixed(1)) + " " + n[s];
}
function Re(e, n) {
  const r = URL.createObjectURL(new Blob([e], { type: n }));
  return Dt.add(r), r;
}
function Zr() {
  for (const e of Dt)
    URL.revokeObjectURL(e);
  Dt.clear(), q(), Yr();
}
function Bn(e, n) {
  const r = g("a", { href: Re(n, "application/octet-stream"), download: e });
  document.body.append(r), r.click(), r.remove();
}
let ue = null;
function q() {
  if (ue) {
    const { dialog: e, onClose: n } = ue;
    ue = null, e.remove(), n?.();
  }
}
function he(e, n, r) {
  q();
  const s = g("div", {
    class: "cryptomator-dialog",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": e,
    onkeydown: (d) => {
      d.key === "Escape" && q();
    },
    onclick: (d) => {
      d.target === s && q();
    }
  }, g("div", { class: "cryptomator-dialog__panel" }, n));
  return ue = { dialog: s, onClose: r }, document.body.append(s), s;
}
function z(e, n) {
  return g("p", { class: "cryptomator-notice" + (n ? " cryptomator-notice--" + n : ""), role: n === "error" ? "alert" : null }, e);
}
function Qr(e, n, r) {
  return new Promise((s) => {
    let d = !1;
    const o = g("input", {
      type: "text",
      name: "username",
      autocomplete: "username",
      readonly: !0,
      class: "cryptomator-unlock__account",
      "aria-label": c("Vault")
    });
    o.value = r;
    const p = g("input", { type: "password", name: "password", autocomplete: "current-password", required: !0, "aria-label": c("Password") }), u = g("div", { "aria-live": "polite" }), m = g("button", { type: "submit", class: "primary" }, c("Unlock"));
    he(e, [
      g("h2", {}, c("Unlock {vault}", { vault: e })),
      z(c("The password and the vault's keys stay in this browser tab: the server only sends the encrypted files.")),
      g("form", {
        class: "cryptomator-unlock",
        name: "cryptomator-unlock",
        method: "post",
        action: "#",
        autocomplete: "on",
        onsubmit: async (v) => {
          v.preventDefault(), m.disabled = !0, u.replaceChildren(z(c("Unlocking …"))), await new Promise((x) => setTimeout(x, 30));
          try {
            await n(p.value), p.value = "", d = !0, q(), s(!0);
          } catch (x) {
            m.disabled = !1, u.replaceChildren(z(x.message, "error")), p.select();
          }
        }
      }, [
        g("label", {}, [c("Vault"), o]),
        g("label", {}, [c("Password"), p]),
        m,
        g("button", { type: "button", onclick: q }, c("Cancel"))
      ]),
      u
    ], () => {
      p.value = "", d || s(!1);
    }), p.focus();
  });
}
const ea = ["png", "jpg", "jpeg", "gif", "webp", "avif", "bmp", "svg"], yn = {
  mp4: "video/mp4",
  m4v: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
  ogv: "video/ogg",
  mkv: "video/x-matroska",
  "3gp": "video/3gpp"
}, gn = {
  mp3: "audio/mpeg",
  m4a: "audio/mp4",
  m4b: "audio/mp4",
  aac: "audio/aac",
  ogg: "audio/ogg",
  oga: "audio/ogg",
  opus: "audio/ogg",
  weba: "audio/webm",
  wav: "audio/wav",
  flac: "audio/flac"
}, ta = [
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
function na(e) {
  return Wn(e).kind !== "none";
}
function Wn(e) {
  const n = (/\.([^.]+)$/.exec(e)?.[1] ?? "").toLowerCase();
  return ea.includes(n) ? { kind: "image", type: n === "svg" ? "image/svg+xml" : "image/" + (n === "jpg" ? "jpeg" : n) } : n === "pdf" ? { kind: "pdf", type: "application/pdf" } : n in yn ? { kind: "video", type: yn[n] } : n in gn ? { kind: "audio", type: gn[n] } : ta.includes(n) ? { kind: "text", type: "text/plain" } : n === "docx" ? { kind: "docx" } : ["pptx", "odp", "odt"].includes(n) ? { kind: n } : ["md", "markdown"].includes(n) ? { kind: "markdown" } : n === "zip" ? { kind: "zip" } : ["heic", "heif"].includes(n) ? { kind: "heic" } : ["xlsx", "xls", "ods"].includes(n) ? { kind: "sheet" } : { kind: "none" };
}
const jn = {
  docx: async (e) => (await import("./cryptomator_vaults-documents-BmbF22j6.mjs")).docxPage(e),
  sheet: async (e) => (await import("./cryptomator_vaults-documents-BmbF22j6.mjs")).sheetPage(e),
  pptx: async (e) => (await import("./cryptomator_vaults-office-BeiGiX41.mjs")).pptxPage(e),
  odp: async (e) => (await import("./cryptomator_vaults-office-BeiGiX41.mjs")).odpPage(e),
  odt: async (e) => (await import("./cryptomator_vaults-office-BeiGiX41.mjs")).odtPage(e),
  markdown: async (e) => (await import("./cryptomator_vaults-previews-CexgEx4s.mjs")).markdownPage(e),
  zip: async (e) => (await import("./cryptomator_vaults-previews-CexgEx4s.mjs")).zipPage(e)
};
function ra(e) {
  return e in jn || e === "heic";
}
async function aa(e, n, r) {
  if (e.kind === "heic") {
    const d = await (await import("./cryptomator_vaults-previews-CexgEx4s.mjs")).heicToPng(n);
    return g("img", { class: "cryptomator-preview", src: Re(d, "image/png"), alt: r });
  }
  const s = await jn[e.kind](n);
  return g("iframe", { class: "cryptomator-preview cryptomator-preview--frame cryptomator-preview--document", sandbox: "", referrerpolicy: "no-referrer", title: r, srcdoc: s });
}
function oa(e, n, r) {
  switch (e.kind) {
    case "image":
      return g("img", { class: "cryptomator-preview", src: Re(n, e.type), alt: r });
    case "pdf":
      return g("iframe", { class: "cryptomator-preview cryptomator-preview--frame", src: Re(n, e.type), title: r });
    case "video":
      return g("video", { class: "cryptomator-preview", src: Re(n, e.type), controls: !0 });
    case "audio":
      return g("audio", { class: "cryptomator-preview", src: Re(n, e.type), controls: !0 });
    case "text":
      return g("pre", { class: "cryptomator-preview cryptomator-preview--text" }, new TextDecoder("utf-8").decode(n));
    default:
      return z(c("No preview for this file. Download it to open it."));
  }
}
async function ia(e, n, r, s, d) {
  const o = Wn(e);
  if (d && $r.includes(o.kind) && await Lt())
    return sa(e, n, o, d, s);
  const p = o.kind !== "none" && n <= (o.kind === "text" ? Xr : Jr);
  if (!p && n > Kn && !window.confirm(c("This file is {size}. Your browser holds it twice while decrypting. Continue?", { size: Ke(n) })))
    return;
  const u = g("progress", { max: 1, value: 0 }), m = g("div", { class: "cryptomator-dialog__body" }, [z(c("Decrypting …")), u]), v = g("button", { type: "button", disabled: !0 }, c("Download")), x = he(e, [
    g("div", { class: "cryptomator-dialog__head" }, [
      g("h2", {}, e),
      g("span", { class: "cryptomator-dialog__meta" }, Ke(n)),
      v,
      g("button", { type: "button", class: "cryptomator-dialog__close", onclick: q }, c("Close"))
    ]),
    m
  ]);
  x.querySelector(".cryptomator-dialog__close").focus();
  try {
    const A = await r((C, M) => {
      u.value = 0.5 + C / M / 2;
    }, (C, M) => {
      u.value = C / M / 2;
    });
    if (ue?.dialog !== x)
      return;
    if (v.disabled = !1, v.addEventListener("click", () => Bn(e, A)), !p)
      m.replaceChildren(z(c("No preview for this file. Download it to open it.")));
    else if (ra(o.kind)) {
      m.replaceChildren(z(c("Preparing the preview …")));
      try {
        const C = await aa(o, A, e);
        ue?.dialog === x && m.replaceChildren(C);
      } catch (C) {
        ue?.dialog === x && m.replaceChildren(z(c("This document cannot be previewed: {detail}. Download it to open it.", { detail: C.message }), "error"));
      }
    } else
      m.replaceChildren(oa(o, A, e));
  } catch (A) {
    ue?.dialog === x && m.replaceChildren(z(s(A), "error"));
  }
}
async function sa(e, n, r, s, d) {
  let o = null;
  const p = g("div", { class: "cryptomator-dialog__body" }, z(c("Decrypting …"))), u = g("button", { type: "button", disabled: !0 }, c("Download")), m = he(e, [
    g("div", { class: "cryptomator-dialog__head" }, [
      g("h2", {}, e),
      g("span", { class: "cryptomator-dialog__meta" }, Ke(n)),
      u,
      g("button", { type: "button", class: "cryptomator-dialog__close", onclick: q }, c("Close"))
    ]),
    p
  ], () => o && qe(o.id));
  m.querySelector(".cryptomator-dialog__close").focus();
  try {
    const v = await s();
    if (ue?.dialog !== m)
      return;
    if (o = Hn(v, e, r.type, r.kind), u.disabled = !1, u.addEventListener("click", () => Vn(v, e)), r.kind === "pdf") {
      p.replaceChildren(g("iframe", { class: "cryptomator-preview cryptomator-preview--frame", src: o.url, title: e }));
      return;
    }
    const x = g("div", { "aria-live": "polite" }), A = g("iframe", {
      class: "cryptomator-preview cryptomator-preview--frame cryptomator-preview--stream cryptomator-preview--" + r.kind,
      src: o.frame,
      title: e,
      allow: "autoplay; fullscreen",
      allowfullscreen: !0,
      onload: () => ca(A, r.kind, x)
    });
    p.replaceChildren(x, A);
  } catch (v) {
    ue?.dialog === m && p.replaceChildren(z(d(v), "error"));
  }
}
function ca(e, n, r) {
  const s = e.contentDocument?.querySelector(n);
  if (!s)
    return;
  const d = () => r.replaceChildren(z(c("Your browser cannot play this file. Download it to open it."), "error"));
  if (s.addEventListener("error", d), s.error && d(), n === "video") {
    const o = () => {
      s.videoWidth === 0 && !s.error && r.replaceChildren(z(c("Your browser plays only the sound of this video. Download it to watch it.")));
    };
    s.readyState >= 1 ? o() : s.addEventListener("loadedmetadata", o, { once: !0 });
  }
}
function qn(e, n, r, { initial: s = "", action: d = c("Create") } = {}) {
  return new Promise((o) => {
    let p = !1;
    const u = g("input", { type: "text", required: !0, "aria-label": n, autocomplete: "off" });
    u.value = s;
    const m = g("div", { "aria-live": "polite" });
    he(e, [
      g("h2", {}, e),
      g("form", {
        class: "cryptomator-unlock",
        onsubmit: (x) => {
          x.preventDefault();
          const A = r(u.value);
          if (A) {
            m.replaceChildren(z(A, "error"));
            return;
          }
          p = !0;
          const C = u.value;
          q(), o(C);
        }
      }, [
        g("label", {}, [n, u]),
        g("button", { type: "submit", class: "primary" }, d),
        g("button", { type: "button", onclick: q }, c("Cancel"))
      ]),
      m
    ], () => {
      p || o(null);
    }), u.focus();
    const v = s.lastIndexOf(".");
    u.setSelectionRange(0, v > 0 ? v : s.length);
  });
}
function la(e, n, r) {
  return new Promise((s) => {
    let d = !1;
    he(e, [
      g("h2", {}, e),
      z(n),
      g("div", { class: "cryptomator-choices" }, [
        g("button", { type: "button", class: "error primary", onclick: () => {
          d = !0, q();
        } }, r),
        g("button", { type: "button", onclick: q }, c("Cancel"))
      ])
    ], () => s(d)), document.querySelector(".cryptomator-dialog button:last-child")?.focus();
  });
}
function da(e, n, r, s, d) {
  return new Promise((o) => {
    let p = null, u = [{ name: n, dirId: "" }];
    const m = g("ol", { class: "cryptomator-crumbs" }), v = g("ul", { class: "cryptomator-folders" }), x = g("button", { type: "button", class: "primary", onclick: () => {
      p = { dirId: u[u.length - 1].dirId, ancestors: u.map((C) => C.dirId) }, q();
    } }, d), A = async () => {
      m.replaceChildren(...u.map((C, M) => g("li", {}, M === u.length - 1 ? g("span", { "aria-current": "page" }, C.name) : g("button", { type: "button", onclick: () => {
        u = u.slice(0, M + 1), A();
      } }, C.name)))), v.replaceChildren(z(c("Loading …")));
      try {
        const C = (await r(u[u.length - 1].dirId)).sort((M, D) => M.name.localeCompare(D.name));
        v.replaceChildren(...C.length ? C.map((M) => g("li", {}, g("button", {
          type: "button",
          class: "cryptomator-folders__item",
          disabled: s.has(M.dirId),
          onclick: () => {
            u = [...u, M], A();
          }
        }, M.name))) : [z(c("No folders in here."))]);
      } catch (C) {
        v.replaceChildren(z(C.message, "error"));
      }
    };
    he(e, [
      g("h2", {}, e),
      g("nav", {}, m),
      g("div", { class: "cryptomator-dialog__body" }, v),
      g("div", { class: "cryptomator-choices" }, [x, g("button", { type: "button", onclick: q }, c("Cancel"))])
    ], () => o(p)), A();
  });
}
function Gn(e) {
  const n = g("ul", { class: "cryptomator-uploads" }), r = g("progress", { max: 1, value: 0 }), s = g("div", { "aria-live": "polite" }), d = g("div", { class: "cryptomator-question", hidden: !0 });
  let o = !1;
  const p = g("button", { type: "button", onclick: () => {
    o = !0, p.disabled = !0, p.textContent = c("Stopping after this file …");
  } }, c("Stop")), u = g("button", { type: "button", class: "primary", hidden: !0, onclick: q }, c("Close"));
  return he(e, [
    g("div", { class: "cryptomator-dialog__head" }, [g("h2", {}, e), p, u]),
    r,
    d,
    g("div", { class: "cryptomator-dialog__body" }, n),
    s
  ]), {
    get stopped() {
      return o;
    },
    file(m) {
      const v = g("span", { class: "cryptomator-dialog__meta" }, c("Waiting")), x = g("progress", { max: 1, value: 0 });
      return n.append(g("li", {}, [g("span", { class: "cryptomator-uploads__name" }, m), v, x])), {
        phase(A, C) {
          v.textContent = A, x.value = C;
        },
        done(A, C) {
          v.textContent = A, v.classList.toggle("cryptomator-notice--error", !!C), x.value = 1;
        }
      };
    },
    /**
     * What to do with a taken name: 'replace', 'skip', 'replace-all', 'skip-all' or
     * 'cancel'; text and cancel tell what replacing does and what stops.
     */
    ask(m, v, { text: x, cancel: A } = {}) {
      return new Promise((C) => {
        const M = (D) => () => {
          d.hidden = !0, d.replaceChildren(), C(D);
        };
        d.replaceChildren(
          g("h3", {}, c("“{name}” already exists", { name: m })),
          z(x || c("Replace the file in the vault with the one you chose? The vault keeps no copy of the old one; Nextcloud's versions keep its encrypted file.")),
          g("div", { class: "cryptomator-choices" }, [
            g("button", { type: "button", class: "primary", onclick: M("replace") }, c("Replace")),
            g("button", { type: "button", onclick: M("skip") }, c("Skip")),
            v > 1 ? g("button", { type: "button", onclick: M("replace-all") }, c("Replace all")) : null,
            v > 1 ? g("button", { type: "button", onclick: M("skip-all") }, c("Skip all")) : null,
            g("button", { type: "button", onclick: M("cancel") }, A || c("Cancel upload"))
          ])
        ), d.hidden = !1, d.querySelector("button").focus();
      });
    },
    progress(m) {
      r.value = m;
    },
    finish(m, v) {
      r.value = 1, p.hidden = !0, u.hidden = !1, s.replaceChildren(z(m, v ? "error" : void 0)), u.focus();
    }
  };
}
function Ge({ title: e, intro: n, fields: r, action: s, working: d, run: o }) {
  return new Promise((p) => {
    let u = null;
    const m = {}, v = g("div", { "aria-live": "polite" }), x = g("button", { type: "submit", class: "primary" }, s), A = r.map((C) => {
      const M = C.type === "textarea" ? g("textarea", { name: C.name, rows: 4, required: !0, spellcheck: "false", autocomplete: "off", class: "cryptomator-form__words" }) : g("input", {
        type: C.type ?? "text",
        name: C.name,
        autocomplete: C.autocomplete ?? "off",
        required: !C.readonly && !C.optional,
        readonly: C.readonly || null,
        class: C.account ? "cryptomator-unlock__account" : null
      });
      return M.value = C.value ?? "", m[C.name] = M, g("label", {}, [C.label, M]);
    });
    he(e, [
      g("h2", {}, e),
      ...n ? [].concat(n).map((C) => z(C)) : [],
      g("form", {
        class: "cryptomator-unlock cryptomator-form",
        method: "post",
        action: "#",
        autocomplete: "on",
        onsubmit: async (C) => {
          C.preventDefault(), x.disabled = !0, v.replaceChildren(z(d ?? c("Working …"))), await new Promise((M) => setTimeout(M, 30));
          try {
            u = await o(Object.fromEntries(Object.entries(m).map(([M, D]) => [M, D.value]))), q();
          } catch (M) {
            x.disabled = !1, v.replaceChildren(z(M.message, "error"));
          }
        }
      }, [...A, g("div", { class: "cryptomator-choices" }, [x, g("button", { type: "button", onclick: q }, c("Cancel"))])]),
      v
    ], () => {
      for (const C of Object.values(m))
        (C.type === "password" || C.tagName === "TEXTAREA") && (C.value = "");
      p(u);
    }), Object.values(m).find((C) => !C.readOnly)?.focus();
  });
}
function Yn(e, n, { created: r = !1 } = {}) {
  return new Promise((s) => {
    const d = g("div", { class: "cryptomator-recovery-key", tabindex: "0" }, n), o = g("span", { class: "cryptomator-dialog__meta", "aria-live": "polite" });
    he(c("Recovery key"), [
      g("h2", {}, r ? c("{vault} is ready", { vault: e }) : c("Recovery key of {vault}", { vault: e })),
      z(c("With this recovery key you can set a new password if you forget the one you have, here or in Cryptomator. Anyone who has it can open the vault: keep it on paper or in your password manager, not in this cloud.")),
      d,
      g("div", { class: "cryptomator-choices" }, [
        g("button", { type: "button", onclick: async () => {
          try {
            await navigator.clipboard.writeText(n), o.textContent = c("Copied");
          } catch {
            o.textContent = c("Copying is not allowed here: select the words and copy them.");
          }
        } }, c("Copy")),
        o,
        g("button", { type: "button", class: "primary", onclick: q }, c("Done"))
      ])
    ], () => {
      d.textContent = "", s();
    }), d.focus();
  });
}
function ua(e, { check: n, describe: r, repair: s }) {
  const d = g("div", { class: "cryptomator-dialog__body" }), o = g("div", { "aria-live": "polite" }), p = g("progress", { max: 1, value: 0 }), u = { CRITICAL: c("Damaged"), WARN: c("Needs repair"), INFO: c("Note") }, m = async () => {
    d.replaceChildren(), p.hidden = !1, p.value = 0, o.replaceChildren(z(c("Checking the vault …")));
    let v;
    try {
      v = await n((C, M) => {
        p.value = M ? C / M : 1;
      });
    } catch (C) {
      p.hidden = !0, o.replaceChildren(z(C.message, "error"));
      return;
    }
    if (p.hidden = !0, v.length === 0) {
      o.replaceChildren(z(c("The vault is healthy: the check found nothing to repair.")));
      return;
    }
    d.append(g("ul", { class: "cryptomator-findings" }, v.map((C) => g("li", {}, [
      g("span", { class: "cryptomator-findings__severity cryptomator-findings__severity--" + C.severity.toLowerCase() }, u[C.severity]),
      g("span", {}, r(C)),
      g("code", { class: "cryptomator-dialog__meta" }, C.path)
    ]))));
    const x = v.filter((C) => C.fixable), A = [];
    x.length && A.push(g("button", { type: "button", class: "primary", onclick: async (C) => {
      C.target.disabled = !0, o.replaceChildren(z(c("Repairing …")));
      try {
        await s(x);
      } catch (M) {
        o.replaceChildren(z(M.message, "error"));
        return;
      }
      await m();
    } }, c("Repair {count}", { count: x.length }))), o.replaceChildren(
      z(x.length === v.length ? c("Each of these can be repaired, as Cryptomator's health check repairs it.") : c("{count} of these can be repaired, as Cryptomator's health check repairs them; the others need Cryptomator or a backup.", { count: x.length })),
      g("div", { class: "cryptomator-choices" }, A)
    );
  };
  he(c("Health check"), [
    g("div", { class: "cryptomator-dialog__head" }, [
      g("h2", {}, c("Health check of {vault}", { vault: e })),
      g("button", { type: "button", onclick: q }, c("Close"))
    ]),
    p,
    d,
    o
  ]), m();
}
const { VaultError: X } = zn, At = "DAV:", ha = "http://owncloud.org/ns", Et = "http://nextcloud.org/ns", vn = '<?xml version="1.0"?><d:propfind xmlns:d="DAV:" xmlns:oc="http://owncloud.org/ns" xmlns:nc="http://nextcloud.org/ns"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getetag/><oc:permissions/><nc:upload_time/></d:prop></d:propfind>', pa = 20 * 1024 * 1024, bn = 10 * 1024 * 1024;
function fa() {
  return window.OC && window.OC.requestToken || document.head.dataset.requesttoken || "";
}
function ie(e) {
  return { requesttoken: fa(), "X-Requested-With": "XMLHttpRequest", ...e || {} };
}
function ve() {
  return Dr()?.uid ?? "";
}
function at(e) {
  return e.split("/").filter((n) => n !== "").map(encodeURIComponent).join("/");
}
function ma(e) {
  const n = at(e);
  return lt("dav") + "/files/" + encodeURIComponent(ve()) + "/" + (n ? n + "/" : "");
}
function Be(e) {
  const n = new DOMParser().parseFromString(e, "application/xml");
  return Array.from(n.getElementsByTagNameNS(At, "response")).map((r) => {
    const s = (u, m = At) => r.getElementsByTagNameNS(m, u)[0], d = s("getcontentlength"), o = s("getlastmodified"), p = Number(s("upload_time", Et)?.textContent) || 0;
    return {
      href: s("href").textContent,
      isDir: r.getElementsByTagNameNS(At, "collection").length > 0,
      size: d ? Number(d.textContent) : 0,
      mtime: o ? new Date(o.textContent) : void 0,
      uploadTime: p ? new Date(p * 1e3) : void 0,
      etag: s("getetag")?.textContent || void 0,
      permissions: s("permissions", ha)?.textContent ?? "",
      originalLocation: s("trashbin-original-location", Et)?.textContent,
      deletionTime: Number(s("trashbin-deletion-time", Et)?.textContent) || 0
    };
  });
}
function wa(e) {
  const n = e.replace(/\/+$/, "").split("/");
  return decodeURIComponent(n[n.length - 1]);
}
function ye(e, n, r) {
  return e === 0 ? new X("network", (r ? r + ": " : "") + "redirected (signed out?)") : e === 404 ? new X("not-found", n) : e === 412 || e === 405 ? new X("exists", n) : e === 507 ? new X("quota", n) : new X("network", (r ? r + ": " : "") + "HTTP " + e);
}
function De(e, n) {
  return e >= 200 && e < 300 && !n;
}
function kn(e, n, r, s, d) {
  return new Promise((o, p) => {
    const u = new XMLHttpRequest();
    u.open(e, n);
    for (const [m, v] of Object.entries(ie(r)))
      u.setRequestHeader(m, v);
    d && u.upload.addEventListener("progress", (m) => d(m.loaded, m.total)), u.addEventListener("load", () => o(new URL(u.responseURL, n).href === new URL(n, window.location.href).href ? u.status : 0)), u.addEventListener("error", () => p(new X("network", e + " failed"))), u.addEventListener("abort", () => p(new X("network", e + " aborted"))), u.send(s ?? null);
  });
}
async function He(e, n, r, s, d = []) {
  const o = await fetch(n, { method: e, headers: ie(r), credentials: "same-origin" });
  if (!De(o.status, o.redirected) && !d.includes(o.status))
    throw ye(o.redirected ? 0 : o.status, s, e);
  return o;
}
function le(e) {
  const n = ma(e), r = (o) => n + at(o);
  async function s(o, p, u, m, v) {
    const x = lt("dav") + "/uploads/" + encodeURIComponent(ve()) + "/cryptomator-vaults-" + crypto.randomUUID(), A = new URL(r(o), window.location.href).href, C = { Destination: A, "OC-Total-Length": String(p) };
    await He("MKCOL", x, { Destination: A }, o);
    try {
      let M = 0, D = 1;
      for await (const G of u) {
        const V = await kn(
          "PUT",
          x + "/" + String(D).padStart(5, "0"),
          C,
          G,
          (L) => v?.(M + L, p)
        );
        if (!De(V, !1))
          throw ye(V, o, "PUT (part " + D + ")");
        M += G.length, D++;
      }
      const j = await fetch(x + "/.file", {
        method: "MOVE",
        headers: ie({ ...C, Overwrite: m ? "F" : "T" }),
        credentials: "same-origin"
      });
      if (!De(j.status, j.redirected))
        throw ye(j.redirected ? 0 : j.status, o, "MOVE (assembling the parts)");
    } catch (M) {
      throw await fetch(x, { method: "DELETE", headers: ie(), credentials: "same-origin" }).catch(() => {
      }), M;
    }
  }
  function* d(o) {
    for (let p = 0; p < o.length; p += bn)
      yield o.subarray(p, Math.min(p + bn, o.length));
  }
  return {
    async read(o, p) {
      const u = await fetch(n + at(o), { headers: ie(), credentials: "same-origin" });
      if (u.status === 404)
        throw new X("not-found", o);
      if (!u.ok)
        throw new X("network", "GET: HTTP " + u.status);
      const m = Number(u.headers.get("Content-Length")) || 0;
      if (!p || !u.body || m === 0)
        return new Uint8Array(await u.arrayBuffer());
      const v = new Uint8Array(m), x = u.body.getReader();
      let A = 0;
      for (; ; ) {
        const { done: C, value: M } = await x.read();
        if (C)
          break;
        v.set(M, A), A += M.length, p(A, m);
      }
      return v.subarray(0, A);
    },
    async stat(o) {
      const p = await fetch(r(o), {
        method: "PROPFIND",
        headers: ie({ Depth: "0", "Content-Type": "application/xml; charset=utf-8" }),
        credentials: "same-origin",
        body: vn
      });
      if (p.status === 404)
        return null;
      if (p.status !== 207)
        throw ye(p.status, o, "PROPFIND");
      const [u] = Be(await p.text());
      return { isDir: u.isDir, size: u.size, etag: u.etag, permissions: u.permissions };
    },
    /** Stores a file whole; create: refused (VaultError 'exists') if the name is taken. */
    async write(o, p, { create: u = !1, onProgress: m } = {}) {
      if (p.length >= pa)
        return s(o, p.length, d(p), u, m);
      const v = await kn("PUT", r(o), u ? { "If-None-Match": "*" } : {}, p, m);
      if (!De(v, !1))
        throw ye(v, o, "PUT");
    },
    /** A file too large to hold, from its parts in turn (chunked upload); complete or absent. */
    async writeParts(o, p, u, { create: m = !1, onProgress: v } = {}) {
      return s(o, p, u, m, v);
    },
    /** Bytes start to end (exclusive) of a stored file. */
    async readRange(o, p, u) {
      if (u <= p)
        return new Uint8Array(0);
      const m = await fetch(r(o), {
        headers: ie({ Range: "bytes=" + p + "-" + (u - 1) }),
        credentials: "same-origin"
      });
      if (m.status === 404)
        throw new X("not-found", o);
      if (m.status === 206)
        return new Uint8Array(await m.arrayBuffer());
      if (m.status === 200)
        return new Uint8Array(await m.arrayBuffer()).slice(p, u);
      throw new X("network", "GET (range): HTTP " + m.status);
    },
    async mkdir(o, { existsOk: p = !1 } = {}) {
      const u = await fetch(r(o), { method: "MKCOL", headers: ie(), credentials: "same-origin" });
      if (!(De(u.status, u.redirected) || u.status === 405 && p))
        throw ye(u.status, o, "MKCOL");
    },
    /** Moves in one step; refused (VaultError 'exists') if the target is taken, unless overwrite. */
    async move(o, p, { overwrite: u = !1 } = {}) {
      await He("MOVE", r(o), { Destination: new URL(r(p), window.location.href).href, Overwrite: u ? "T" : "F" }, p);
    },
    /** Copies on the server; refused (VaultError 'exists') if the target is taken. */
    async copy(o, p) {
      await He("COPY", r(o), { Destination: new URL(r(p), window.location.href).href, Overwrite: "F" }, p);
    },
    async remove(o) {
      await He("DELETE", r(o), {}, o, [404]);
    },
    /**
     * Deletes a file or folder only as it was (its ETag): VaultError 'changed' if it
     * changed meanwhile (a folder: anything inside it), 'not-found' if it is gone.
     * A file's DELETE carries If-Match; Nextcloud refuses that on folders, so a
     * folder's ETag is compared just before.
     */
    async removeUnchanged(o, p, { isDir: u = !1 } = {}) {
      if (u) {
        const v = await this.stat(o);
        if (v === null)
          throw new X("not-found", o);
        if (v.etag !== p)
          throw new X("changed", o);
      }
      const m = await fetch(r(o), { method: "DELETE", headers: ie(u ? {} : { "If-Match": p }), credentials: "same-origin" });
      if (m.status === 412)
        throw new X("changed", o);
      if (!De(m.status, m.redirected))
        throw ye(m.redirected ? 0 : m.status, o, "DELETE");
    },
    async list(o) {
      const p = await fetch(n + (o ? at(o) + "/" : ""), {
        method: "PROPFIND",
        headers: ie({ Depth: "1", "Content-Type": "application/xml; charset=utf-8" }),
        credentials: "same-origin",
        body: vn
      });
      if (p.status === 404)
        throw new X("not-found", o);
      if (!p.ok)
        throw new X("network", "PROPFIND: HTTP " + p.status);
      return Be(await p.text()).slice(1).map((u) => ({ name: wa(u.href), isDir: u.isDir, size: u.size, mtime: u.mtime, uploadTime: u.uploadTime, etag: u.etag, permissions: u.permissions }));
    }
  };
}
async function Jn(e) {
  const n = ve(), r = (o) => o.replace(/&/g, "&amp;").replace(/</g, "&lt;"), s = await fetch(lt("dav") + "/", {
    method: "SEARCH",
    headers: ie({ "Content-Type": "text/xml; charset=utf-8" }),
    credentials: "same-origin",
    body: '<?xml version="1.0" encoding="UTF-8"?><d:searchrequest xmlns:d="DAV:"><d:basicsearch><d:select><d:prop><d:displayname/></d:prop></d:select><d:from><d:scope><d:href>/files/' + r(n) + "</d:href><d:depth>infinity</d:depth></d:scope></d:from><d:where><d:like><d:prop><d:displayname/></d:prop><d:literal>" + r(e) + "</d:literal></d:like></d:where></d:basicsearch></d:searchrequest>"
  });
  if (!s.ok)
    throw new Error("HTTP " + s.status);
  const d = "/files/" + n + "/";
  return Be(await s.text()).map((o) => decodeURIComponent(o.href)).filter((o) => o.endsWith("/" + e) && o.includes(d)).map((o) => "/" + o.slice(o.indexOf(d) + d.length, -("/" + e).length)).map((o) => o.replace(/\/+$/, "") || "/").sort((o, p) => o.localeCompare(p));
}
function ya() {
  return Jn("vault.cryptomator");
}
function ga(e) {
  return Jn(e);
}
async function va(e, n) {
  const r = [];
  for (const s of n) {
    const d = s.replace(/^\/+|\/+$/g, ""), o = d.split("/").pop(), p = await e.stat(d);
    if (p === null)
      throw new X("not-found", d);
    const u = { path: d, name: o, isDir: p.isDir, etag: p.etag, permissions: p.permissions, files: [], folders: [] };
    if (!p.isDir)
      u.files.push({ path: d, name: o, size: p.size, etag: p.etag, dirs: [] });
    else {
      const m = async (v, x) => {
        u.folders.push(x);
        const A = await e.list(v);
        if (A.some((C) => !C.isDir && C.name === "vault.cryptomator"))
          throw new X("contains-vault", v);
        for (const C of A) {
          const M = v + "/" + C.name;
          C.isDir ? await m(M, [...x, C.name]) : u.files.push({ path: M, name: C.name, size: C.size, etag: C.etag, dirs: x });
        }
      };
      await m(d, [o]);
    }
    r.push(u);
  }
  return r;
}
async function ba(e) {
  return (await Rt([e])).has(e.replace(/^\/+|\/+$/g, ""));
}
async function Rt(e, { onlyEmpty: n = !1 } = {}) {
  const r = e.map((m) => m.replace(/^\/+|\/+$/g, "")), s = lt("dav") + "/trashbin/" + encodeURIComponent(ve()) + "/trash/", d = (m) => fetch(m, {
    method: "PROPFIND",
    headers: ie({ Depth: "1", "Content-Type": "application/xml; charset=utf-8" }),
    credentials: "same-origin",
    body: '<?xml version="1.0"?><d:propfind xmlns:d="DAV:" xmlns:nc="http://nextcloud.org/ns"><d:prop><d:resourcetype/><nc:trashbin-original-location/><nc:trashbin-deletion-time/></d:prop></d:propfind>'
  }), o = await d(s);
  if (o.status === 404 || o.status === 405)
    return new Set(r);
  if (o.status !== 207)
    throw ye(o.status, r[0] ?? "", "PROPFIND (deleted files)");
  const p = Be(await o.text()).slice(1), u = /* @__PURE__ */ new Set();
  for (const m of r) {
    const [v] = p.filter((A) => A.originalLocation === m).sort((A, C) => C.deletionTime - A.deletionTime);
    if (!v)
      continue;
    const x = new URL(v.href, window.location.href).href;
    if (n && v.isDir) {
      const A = await d(x);
      if (A.status !== 207 || Be(await A.text()).length > 1)
        continue;
    }
    await He("DELETE", x, {}, m, [404]), u.add(m);
  }
  return u;
}
const Fe = ".cryptomator-inbox.json", Xn = 1, ka = 64 * 1024, xa = 120 * 1e3;
function Ae(e) {
  if (typeof e != "string")
    return null;
  const n = e.normalize("NFC").split("/").filter((r) => r !== "");
  return n.some((r) => r === "." || r === "..") ? null : "/" + n.join("/");
}
function Ft(e) {
  return e.split("/").filter(Boolean);
}
function it(e, n) {
  return e === n || n === "/" || e.startsWith(n + "/");
}
function Ca(e, n) {
  let r;
  try {
    r = JSON.parse(e);
  } catch {
    return { problem: "invalid" };
  }
  if (r === null || typeof r != "object" || Array.isArray(r))
    return { problem: "invalid" };
  const { version: s } = r;
  if (!Number.isInteger(s) || s < 1)
    return { problem: "invalid" };
  const d = Ae(r.vault);
  if (s > Xn)
    return { problem: "version", version: s, vault: d, folder: n };
  const o = r.target === void 0 ? "/" : Ae(r.target);
  return d === null || o === null || r.from !== void 0 && typeof r.from != "string" ? { problem: "invalid" } : it(n, d) || it(d, n) ? { problem: "loop", vault: d, folder: n } : { inbox: { folder: n, vault: d, target: o, from: (r.from ?? "").trim() } };
}
function Aa({ vault: e, target: n, from: r }) {
  const s = { version: Xn, vault: e, target: n };
  return r && (s.from = r), JSON.stringify(s, null, "	") + `
`;
}
function Ea(e, n = Date.now()) {
  const r = [e.mtime, e.uploadTime].filter((s) => s instanceof Date && !Number.isNaN(s.getTime()));
  return r.length === 0 ? !1 : n - Math.max(...r.map((s) => s.getTime())) >= xa;
}
function Sa(e, n) {
  if (n < 2)
    return e;
  const r = e.lastIndexOf(".");
  return r > 0 ? e.slice(0, r) + " (" + n + ")" + e.slice(r) : e + " (" + n + ")";
}
async function Ma(e, n, r = Date.now()) {
  const s = e.folder.replace(/^\/+/, ""), d = Ft(e.target), o = { ready: [], recent: [], skipped: [], folders: [] }, p = async (u) => {
    const m = [s, ...u].filter(Boolean).join("/"), v = await n(m);
    if (u.length > 0 && v.some((x) => !x.isDir && (x.name === Fe || x.name === "vault.cryptomator")))
      return o.skipped.push(u), !1;
    for (const x of v) {
      const A = m ? m + "/" + x.name : x.name;
      if (x.isDir)
        await p([...u, x.name]) && o.folders.push([...u, x.name]);
      else {
        if (u.length === 0 && x.name === Fe)
          continue;
        Ea(x, r) ? o.ready.push({ path: A, name: x.name, size: x.size, etag: x.etag, permissions: x.permissions ?? "", inner: u, dirs: [...d, ...u] }) : o.recent.push({ path: A, name: x.name });
      }
    }
    return !0;
  };
  return await p([]), o;
}
const { Vault: Ye, VaultError: Ve, checkName: Ut } = zn;
let St = null;
function Pe() {
  return St || (document.head.append(g("link", { rel: "stylesheet", href: Fn("cryptomator_vaults", "css", "cryptomator_vaults-files.css") })), St = import("./cryptomator_vaults-dialogs-BvyC8ZNZ.mjs")), St;
}
function W(e) {
  Pe().then(({ showError: n }) => n(e));
}
function ze(e) {
  Pe().then(({ showInfo: n }) => n(e));
}
const Ht = "cryptomator-vaults", Je = "/cryptomator-vaults", Vt = window.location.origin + "/apps/cryptomator_vaults" + Je, Ta = Rr("cryptomator_vaults", "file.svg"), Ot = 15, $n = "cryptomator_vaults.added", Kt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 3h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-1v1h-3v-1H8v1H5v-1H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v13h16V5zm8 2.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5.5 8h1.5v7H5.5z"/></svg>', Ia = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 8a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/></svg>', Na = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>', Zn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9V6zm9 14H6V10h12v10z"/></svg>', Qn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>', er = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"/></svg>', Da = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.21a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>', Ra = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-6 12v-3h-4v-4h4V8l5 5-5 5z"/></svg>', Fa = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>', Oa = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6a5 5 0 0 0-9.9-1l1.95.45A3 3 0 0 1 15 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm0 12H6V10h12v10z"/></svg>', _a = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4h-2v4H6V4h7v5h5v1h2V8l-6-6H6zm12 10v3h-4v2h4v3l4-4-4-4z"/></svg>', Bt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v6h2V4h7v5h5v11H6v-4H4v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM10 11v3H2v2h8v3l4-4-4-4z"/></svg>', Pa = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2zm5 9h-2v2h-2v-2H9v-2h2V9h2v2h2v2z"/></svg>', Z = /* @__PURE__ */ new Map();
let Mt = null, We = null, se = { kind: "vaults" };
async function _t(e, n) {
  const r = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(e)));
  return Array.from(r, (s) => s.toString(16).padStart(2, "0")).join("").slice(0, n);
}
const za = "r000000000001", tr = 2 ** 52;
function nr(e) {
  return tr + parseInt(e.slice(1, 13), 16);
}
function rr() {
  try {
    const e = JSON.parse(window.localStorage.getItem($n) || "[]");
    return Array.isArray(e) ? e.filter((n) => typeof n == "string") : [];
  } catch {
    return [];
  }
}
function ar(e) {
  try {
    window.localStorage.setItem($n, JSON.stringify([.../* @__PURE__ */ new Set([e, ...rr()])]));
  } catch {
  }
}
function La(e) {
  return e.split("/").filter(Boolean).pop() || c("All files");
}
async function Wt(e) {
  const n = "v" + await _t("vault:" + e, 12);
  return Z.has(n) || Z.set(n, { seg: n, folder: e, name: La(e), vault: null, dirs: /* @__PURE__ */ new Map(), entries: /* @__PURE__ */ new Map(), nodes: /* @__PURE__ */ new Set() }), Z.get(n);
}
function dt() {
  return Mt || (Mt = (async () => {
    let e = [];
    try {
      e = await ya();
    } catch (n) {
      W(c("The search for vaults failed: {detail}", { detail: n.message }));
    }
    for (const n of [.../* @__PURE__ */ new Set([...e, ...rr()])])
      await Wt(n);
  })()), Mt;
}
function Ce(e, n, r, s, d = !0) {
  const o = e.split("/").filter(Boolean).pop() || za, p = new _n({
    id: nr(o),
    source: Vt + e,
    root: Je,
    owner: ve(),
    displayname: n,
    permissions: Pt.READ,
    mtime: s?.mtime,
    attributes: { cryptomatorVault: r?.seg ?? null, ...s?.attributes }
  });
  return d && r?.nodes.add(p), p;
}
function Ua(e, n, r) {
  const s = e.split("/").pop(), d = new Lr({
    id: nr(s),
    source: Vt + e,
    root: Je,
    owner: ve(),
    displayname: n.name,
    mime: "application/octet-stream",
    size: n.size ?? 0,
    mtime: n.mtime,
    permissions: Pt.READ,
    attributes: { "has-preview": !0, previewUrl: Ta, cryptomatorVault: r.seg, cryptomatorType: n.type }
  });
  return r.nodes.add(d), d;
}
function H(e) {
  switch (e?.code) {
    case "exists":
    case "exists-other":
      return c("“{name}” already exists in this folder.", { name: e.message });
    case "invalid-name":
      return c("“{name}” cannot be a name in a vault.", { name: e.message });
    case "quota":
      return c("Your storage is full.");
    case "read-only":
      return c("This vault cannot be written to.");
    case "invalid-move":
      return c("A folder cannot be moved into itself or into a folder inside it.");
    case "wrong-password":
      return c("Wrong password.");
    case "unsupported-format":
      return c("This vault has a format the app cannot read (only vault format 8, Cryptomator 1.6 and later).");
    case "unsupported-key":
      return c("This vault keeps its key on a Cryptomator Hub, which the app does not support.");
    case "not-found":
      return c("There is no Cryptomator vault in this folder.");
    case "corrupt":
      return c("The vault is damaged: {detail}", { detail: e.message });
    case "locked":
      return c("The vault is locked.");
    case "invalid-recovery-key":
      return c("This is not the vault's recovery key: {detail}.", { detail: e.message });
    case "changed":
      return c("“{name}” changed meanwhile: it was kept, and the vault may not hold its latest state.", { name: e.message.split("/").pop() });
    case "contains-vault":
      return c("“{name}” holds a Cryptomator vault, which cannot go into a vault.", { name: e.message.split("/").pop() });
    default:
      return c("Something went wrong: {detail}", { detail: e?.message || String(e) });
  }
}
function Oe(e) {
  window.OCP.Files.Router.goToRoute(null, { view: Ht }, { dir: e });
}
function jt() {
  return window.OCP?.Files?.Router?.query?.dir || "/";
}
async function qt(e) {
  if (e.vault?.unlocked)
    return !0;
  try {
    e.vault = e.vault || await Ye.open(le(e.folder));
  } catch (r) {
    return W(H(r)), !1;
  }
  const n = await Qr(e.name, async (r) => {
    try {
      await e.vault.unlock(r);
    } catch (s) {
      throw new Error(H(s));
    }
  }, e.folder);
  return n && (ht(), Lt(), e.vault.removeLeftovers().catch(() => {
  }), oo(e)), n;
}
async function xn() {
  se = { kind: "vaults" };
  const e = Ce("/", c("Vaults"), null), n = [...Z.values()].sort((r, s) => r.name.localeCompare(s.name)).map((r) => Ce("/" + r.seg, r.name, r, { attributes: { cryptomatorVaultRoot: !0, cryptomatorFolder: r.folder } }, !1));
  return { folder: e, contents: n };
}
const Le = window.isSecureContext && !!window.crypto?.subtle;
async function Ha(e) {
  if (Jt(), !Le)
    return se = { kind: "insecure" }, { folder: new _n({ id: tr + 1, source: Vt + "/", root: Je, owner: ve(), permissions: Pt.READ }), contents: [] };
  await dt();
  const n = e.split("/").filter(Boolean);
  if (n.length === 0)
    return xn();
  const r = Z.get(n[0]);
  if (!r)
    return Oe("/"), xn();
  if (!r.vault?.unlocked && !await qt(r))
    return se = { kind: "locked", vault: r }, { folder: Ce(e, r.name, r, { attributes: { cryptomatorVaultRoot: n.length === 1 } }, !1), contents: [] };
  let s = "", d = r.name;
  if (n.length > 1) {
    const u = r.dirs.get(n[n.length - 1]);
    if (!u)
      return Oe("/" + r.seg), { folder: Ce(e, r.name, r), contents: [] };
    s = u.dirId, d = u.name;
  }
  const o = await r.vault.list(s), p = [];
  for (const u of o)
    if (u.type === "dir") {
      const m = "d" + await _t(r.seg + ":dir:" + u.dirId, 12);
      r.dirs.set(m, { dirId: u.dirId, name: u.name }), p.push(Ce(e + "/" + m, u.name, r, { mtime: u.mtime }));
    } else {
      const m = "f" + await _t(r.seg + ":file:" + u.path, 12);
      r.entries.set(m, u), p.push(Ua(e + "/" + m, u, r));
    }
  return se = { kind: "folder", vault: r, dirId: s, path: e }, { folder: Ce(e, d, r, void 0, n.length > 1), contents: p };
}
function Va(e) {
  if (e)
    if (e.replaceChildren(), e.classList.add("cryptomator-empty"), se.kind === "insecure")
      e.append(z(c("Vaults can only be opened over HTTPS: the browser provides its encryption only there."), "error"));
    else if (se.kind === "locked") {
      const n = se.vault;
      e.append(
        g("h2", {}, c("{vault} is locked", { vault: n.name })),
        z(c("Its files are decrypted in this browser tab once you enter its password.")),
        g("button", {
          type: "button",
          class: "primary",
          onclick: async () => {
            await qt(n) && Ue(n.name);
          }
        }, c("Unlock"))
      );
    } else se.kind === "folder" ? e.append(g("h2", {}, c("This folder is empty."))) : e.append(
      g("h2", {}, c("No vaults found")),
      z(c("Vaults in your files appear here. Open a vault's folder to add one.")),
      g("button", { type: "button", class: "primary", onclick: or }, c("Open a vault folder …"))
    );
}
function Ue(e) {
  Pn("files:node:updated", Ce(jt(), e, null));
}
function ut(e) {
  if (e.vault?.unlocked) {
    if (ee && se.vault === e) {
      ze(c("The vault locks when the change being made has finished."));
      const n = setInterval(() => {
        ee || (clearInterval(n), ut(e));
      }, 500);
      return;
    }
    e.vault.lock();
    for (const n of e.nodes)
      Pn("files:node:deleted", n);
    e.nodes.clear(), e.dirs.clear(), e.entries.clear(), e.inbox = null, Zr(), Ee(de?.folder), jt().startsWith("/" + e.seg) && Oe("/"), [...Z.values()].some((n) => n.vault?.unlocked) || (clearTimeout(We), We = null);
  }
}
function Gt(e) {
  let n = !1;
  for (const r of Z.values())
    r.vault?.unlocked && (ut(r), n = !0);
  n && e && ze(e);
}
function ht() {
  clearTimeout(We), We = setTimeout(
    () => Gt(c("Locked after {minutes} minutes without use.", { minutes: Ot })),
    Ot * 60 * 1e3
  );
}
function Ka() {
  We !== null && ht();
}
async function Yt(e) {
  try {
    await Ye.open(le(e));
  } catch (r) {
    W(H(r));
    return;
  }
  ar(e), await dt();
  const n = await Wt(e);
  Oe("/" + n.seg);
}
async function or() {
  let e;
  try {
    const { getFilePickerBuilder: r } = await Pe();
    e = await r(c("Choose a vault")).startAt("/").setMultiSelect(!1).allowDirectories(!0).setFilter((s) => s.type === ce.Folder || s.basename === "vault.cryptomator").addButton({ label: c("Open vault"), variant: "primary", callback: () => {
    } }).build().pick();
  } catch {
    return;
  }
  const n = "/" + String(e).replace(/^\/+|\/+$/g, "");
  await Yt(n.endsWith("/vault.cryptomator") ? n.slice(0, -18) || "/" : n);
}
function te(e) {
  return e?.id === Ht;
}
const Ba = /* @__PURE__ */ new Set([
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
]), Cn = /* @__PURE__ */ new WeakSet();
let An = 0;
function Jt() {
  const e = zr();
  if (e.length !== An) {
    An = e.length;
    for (const n of e) {
      if (Ba.has(n.id) || Cn.has(n))
        continue;
      const r = n.enabled;
      try {
        Object.defineProperty(n, "enabled", {
          configurable: !0,
          enumerable: !0,
          writable: !0,
          value: (s) => !te(s?.view) && !(s?.nodes ?? []).some((d) => d?.root === Je) && (r ? r.call(n, s) : !0)
        }), Cn.add(n);
      } catch {
      }
    }
  }
}
function ir(e) {
  const n = Z.get(e.attributes?.cryptomatorVault), r = n?.entries.get(e.basename);
  return { vault: n, entry: r };
}
me({
  id: "cryptomator-vaults-open",
  displayName: ({ nodes: e }) => e[0]?.type === ce.Folder ? c("Open") : c("View"),
  iconSvgInline: () => Ia,
  enabled: ({ nodes: e, view: n }) => (Jt(), te(n) && e.length === 1),
  async exec({ nodes: e }) {
    const n = e[0];
    if (n.type === ce.Folder)
      return Oe(n.path), null;
    const { vault: r, entry: s } = ir(n);
    return !r?.vault?.unlocked || !s ? (W(c("The vault is locked.")), null) : (s.type === "link" ? ze(c("A link to {target}", { target: s.target })) : s.type === "broken" ? W(c("This entry cannot be read: {detail}", { detail: s.error })) : s.size >= _e && !na(s.name) ? await sr(r, s) : await ia(
      s.name,
      s.size,
      (d, o) => r.vault.readFile(s, d, o),
      H,
      () => r.vault.openFile(s)
    ), null);
  },
  default: Fr.DEFAULT,
  order: -1e3
});
async function sr(e, n) {
  if (n.size >= _e && typeof window.showSaveFilePicker == "function") {
    let r;
    try {
      r = await (await window.showSaveFilePicker({ suggestedName: n.name })).createWritable();
    } catch {
      return;
    }
    try {
      await e.vault.readFileStream(n, (s) => r.write(s)), await r.close();
    } catch (s) {
      await r.abort().catch(() => {
      }), W(H(s));
    }
    return;
  }
  if (n.size >= _e && await Lt()) {
    try {
      Vn(await e.vault.openFile(n), n.name);
    } catch (r) {
      W(H(r));
    }
    return;
  }
  if (!(n.size > Kn && !window.confirm(c("This file is {size}. Your browser holds it twice while decrypting. Continue?", { size: Ke(n.size) }))))
    try {
      Bn(n.name, await e.vault.readFile(n));
    } catch (r) {
      W(H(r));
    }
}
async function En(e) {
  const { vault: n, entry: r } = ir(e);
  return !n?.vault?.unlocked || !r ? (W(c("The vault is locked.")), null) : (await sr(n, r), null);
}
me({
  id: "cryptomator-vaults-download",
  displayName: () => c("Download"),
  iconSvgInline: () => Na,
  enabled: ({ nodes: e, view: n }) => te(n) && e.length > 0 && e.every((r) => r.type === ce.File && r.attributes?.cryptomatorType === "file"),
  exec: ({ nodes: e }) => En(e[0]),
  async execBatch({ nodes: e }) {
    const n = [];
    for (const r of e)
      n.push(await En(r));
    return n;
  },
  order: -900
});
me({
  id: "cryptomator-vaults-lock",
  displayName: () => c("Lock"),
  iconSvgInline: () => Zn,
  enabled: ({ nodes: e, view: n }) => te(n) && e.length === 1 && e[0].attributes?.cryptomatorVaultRoot === !0 && Z.get(e[0].attributes.cryptomatorVault)?.vault?.unlocked === !0,
  async exec({ nodes: e }) {
    return ut(Z.get(e[0].attributes.cryptomatorVault)), null;
  },
  order: -800
});
me({
  id: "cryptomator-vaults-open-vault",
  displayName: () => c("Open vault"),
  iconSvgInline: () => Kt,
  enabled: ({ nodes: e, view: n }) => n?.id === "files" && e.length === 1 && e[0].root?.startsWith("/files/") && (e[0].basename === "vault.cryptomator" || e[0].type === ce.Folder && [...Z.values()].some((r) => r.folder === e[0].path)),
  async exec({ nodes: e }) {
    const n = e[0];
    return await Yt(n.type === ce.Folder ? n.path : n.dirname), null;
  },
  order: 50
});
const pt = /* @__PURE__ */ new Set();
let xe = null;
function Wa(e) {
  return pt.has(e) || [...Z.values()].some((n) => n.folder === e);
}
function st(e) {
  if (!xe)
    return;
  xe.folder = e;
  const n = e?.path;
  if (!n || !Wa(n)) {
    xe.el.replaceChildren();
    return;
  }
  xe.el.replaceChildren(g("div", { class: "cryptomator-banner", role: "note" }, [
    g("span", { class: "cryptomator-banner__icon", "aria-hidden": "true" }),
    g(
      "span",
      { class: "cryptomator-banner__text" },
      c("This folder is a Cryptomator vault: its files are encrypted. Open it to see them, decrypted in this browser.")
    ),
    g("button", { type: "button", class: "primary", onclick: () => Yt(n) }, c("Open vault"))
  ])), xe.el.querySelector(".cryptomator-banner__icon").innerHTML = Kt;
}
let de = null;
function Ee(e) {
  if (!de)
    return;
  de.folder = e;
  const n = Z.get(e?.attributes?.cryptomatorVault);
  if (!n?.vault?.unlocked) {
    de.el.replaceChildren();
    return;
  }
  de.el.replaceChildren(g("div", { class: "cryptomator-banner cryptomator-banner--unlocked", role: "status" }, [
    g("span", { class: "cryptomator-banner__icon", "aria-hidden": "true" }),
    g(
      "span",
      { class: "cryptomator-banner__text" },
      c("{vault} is unlocked in this browser. It locks after {minutes} minutes without use.", { vault: n.name, minutes: Ot })
    ),
    g("button", { type: "button", class: "cryptomator-banner__lock", onclick: () => ut(n) }, c("Lock"))
  ]), ...ao(n)), de.el.querySelector(".cryptomator-banner__icon").innerHTML = Oa;
}
On({
  id: "cryptomator-vaults-unlocked",
  order: 4,
  enabled: (e, n) => Le && te(n),
  render(e, n) {
    de = { el: e, folder: n }, Ee(n);
  },
  updated(e) {
    Ee(e);
  }
});
On({
  id: "cryptomator-vaults-banner",
  order: 5,
  enabled: (e, n) => Le && n?.id === "files",
  render(e, n) {
    xe = { el: e, folder: n }, st(n);
  },
  updated(e) {
    st(e);
  }
});
Or("files:list:updated", ({ view: e, folder: n, contents: r }) => {
  e?.id !== "files" || !n?.path || ((r || []).some((s) => s.type === ce.File && s.basename === "vault.cryptomator") && pt.add(n.path), st(n));
});
function ne() {
  const e = se.kind === "folder" ? se : null;
  return e?.vault?.vault?.unlocked && jt() === e.path ? e : null;
}
let ee = !1;
const _e = 16 * 1024 * 1024, ja = 1e3;
function Xt(e, n) {
  const r = {
    size: e.size,
    read: async (s, d) => new Uint8Array(await e.slice(s, d).arrayBuffer()),
    all: async () => new Uint8Array(await e.arrayBuffer())
  };
  return { name: e.name, size: e.size, dirs: n, source: r };
}
function cr(e, n) {
  const r = {
    size: n.size,
    read: (s, d) => e.readRange(n.path, s, d),
    all: () => e.read(n.path),
    remote: !0
  };
  return { name: n.name, size: n.size, dirs: n.dirs, source: r, origin: n };
}
async function je(e, n = [], r = {}) {
  const s = r.into ?? ne();
  if (!s || e.length === 0 && n.length === 0)
    return;
  if (ee) {
    W(c("Another change to the vault is still running."));
    return;
  }
  ee = !0;
  const { vault: d } = s.vault, o = Gn(r.title || c("Uploading to {vault}", { vault: s.vault.name }));
  let p = null, u = 0;
  const m = [], v = [];
  let x = "";
  const A = /* @__PURE__ */ new Map([["", s.dirId]]), C = async (M) => {
    let D = "";
    for (const j of M) {
      const G = D ? D + "/" + j : j;
      A.has(G) || A.set(G, (await d.ensureDirectory(A.get(D), j)).dirId), D = G;
    }
    return A.get(D);
  };
  try {
    for (const M of n)
      try {
        await C(M);
      } catch (D) {
        v.push(M.join("/")), o.file(M.join("/") + "/").done(H(D), !0);
      }
    for (const [M, D] of e.entries()) {
      const { dirs: j } = D, G = [...j, D.name].join("/"), V = o.file(G);
      if (o.stopped) {
        V.done(c("Not uploaded"));
        continue;
      }
      let L = p === "replace-all", K = D.name;
      const ae = async () => {
        const B = await C(j), J = { encrypt: c("Encrypting"), upload: c("Uploading"), verify: c("Checking") }, Q = D.size >= _e, be = Q ? { upload: [0, 0.7], verify: [0.7, 0.3] } : { encrypt: [0, 0.2], upload: [0.2, 0.6], verify: [0.8, 0.2] }, pe = (F, fe, oe) => {
          const [we, wt] = be[F];
          V.phase(F === "upload" && Q ? c("Encrypting and uploading") : J[F], we + wt * (oe ? fe / oe : 1));
        };
        let $ = null;
        Q || (D.source.remote && V.phase(c("Reading"), 0), $ = await D.source.all());
        for (let F = 1; ; F++) {
          K = r.keepBoth ? Sa(D.name, F) : D.name;
          try {
            Q ? await d.writeFileStream(B, K, D.source, { replace: L, onProgress: pe }) : await d.writeFile(B, K, $, { replace: L, onProgress: pe });
            break;
          } catch (fe) {
            if (!r.keepBoth || !["exists", "exists-other"].includes(fe?.code) || F >= ja)
              throw fe;
          }
        }
        await r.check?.(D);
      };
      try {
        try {
          await ae();
        } catch (B) {
          if (B?.code !== "exists" || p === "skip-all" || r.keepBoth)
            throw B;
          const J = p === "replace-all" ? "replace" : await o.ask(G, e.length);
          if (J === "cancel") {
            V.done(c("Not uploaded"));
            break;
          }
          if (J.endsWith("-all") && (p = J), J.startsWith("skip")) {
            V.done(c("Skipped"));
            continue;
          }
          L = !0, await ae();
        }
        u++, m.push(D), V.done(K === D.name ? r.written || c("Uploaded and checked") : c("Encrypted and checked as “{name}”", { name: K }));
      } catch (B) {
        B?.code === "exists" && p === "skip-all" ? V.done(c("Skipped")) : (v.push(G), V.done(H(B), !0));
      }
      o.progress((M + 1) / e.length);
    }
    r.after && (x = await r.after(m, o));
  } finally {
    ee = !1, o.finish((v.length ? c("{written} uploaded, {failed} failed. The vault is unchanged where an upload failed.", { written: u, failed: v.length }) : c("{written} uploaded and checked.", { written: u })) + (x ? " " + x : ""), v.length > 0), Ue(s.vault.name);
  }
}
function lr(e = !1) {
  const n = g("input", { type: "file", multiple: !0, hidden: !0, webkitdirectory: e || null });
  n.addEventListener("change", () => {
    const r = [...n.files].map((s) => Xt(s, (s.webkitRelativePath || s.name).split("/").slice(0, -1)));
    n.remove(), je(r);
  }), document.body.append(n), n.click();
}
async function qa(e) {
  const n = [], r = [], s = async (d, o) => {
    if (d.isFile)
      n.push(Xt(await new Promise((p, u) => d.file(p, u)), o));
    else if (d.isDirectory) {
      const p = [...o, d.name];
      r.push(p);
      const u = d.createReader();
      for (; ; ) {
        const m = await new Promise((v, x) => u.readEntries(v, x));
        if (m.length === 0)
          break;
        for (const v of m)
          await s(v, p);
      }
    }
  };
  for (const d of e)
    await s(d, []);
  return { files: n, folders: r };
}
async function Ga() {
  const e = ne();
  if (!e)
    return;
  const n = await qn(c("New folder"), c("Folder name"), (r) => {
    try {
      return Ut(r), null;
    } catch (s) {
      return H(s);
    }
  });
  if (n !== null)
    try {
      await e.vault.vault.createDirectory(e.dirId, n), Ue(e.vault.name);
    } catch (r) {
      W(H(r));
    }
}
async function $t(e, n) {
  if (ee) {
    W(c("Another change to the vault is still running."));
    return;
  }
  ee = !0;
  try {
    await n();
  } finally {
    ee = !1, Ue(e.vault.name);
  }
}
function ft(e, n) {
  return e?.code === "not-found" ? c("“{name}” is no longer there.", { name: n }) : H(e);
}
function mt(e, n) {
  const r = te(n) ? ne() : null;
  return r !== null && e.length > 0 && e.every((s) => s.attributes?.cryptomatorVault === r.vault.seg);
}
async function Ya(e) {
  const n = ne(), r = e.displayname, s = await qn(c("Rename"), c("New name"), (d) => {
    try {
      return Ut(d), null;
    } catch (o) {
      return H(o);
    }
  }, { initial: r, action: c("Rename") });
  s === null || s.normalize("NFC") === r || await $t(n, async () => {
    try {
      await n.vault.vault.moveEntry(n.dirId, r, n.dirId, s);
    } catch (d) {
      W(ft(d, r));
    }
  });
}
async function Sn(e) {
  const n = ne(), { vault: r } = n.vault, s = new Set(e.filter((o) => o.type === ce.Folder).map((o) => n.vault.dirs.get(o.basename)?.dirId).filter(Boolean)), d = await da(
    e.length === 1 ? c("Move “{name}” to …", { name: e[0].displayname }) : c("Move {count} items to …", { count: e.length }),
    n.vault.name,
    async (o) => (await r.list(o)).filter((p) => p.type === "dir").map((p) => ({ name: p.name, dirId: p.dirId })),
    s,
    c("Move here")
  );
  d === null || d.dirId === n.dirId || await $t(n, async () => {
    const o = [];
    for (const p of e)
      try {
        await r.moveEntry(n.dirId, p.displayname, d.dirId, void 0, { ancestors: d.ancestors });
      } catch (u) {
        o.push(p.displayname + ": " + ft(u, p.displayname));
      }
    o.length && W(o.join(`
`));
  });
}
async function Mn(e) {
  const n = ne(), r = e.filter((o) => o.type === ce.Folder).length, s = e.length === 1 ? c("Delete “{name}”?", { name: e[0].displayname }) : c("Delete {count} items?", { count: e.length }), d = (r ? c("Folders are deleted with everything in them.") + " " : "") + c("The encrypted files go to Nextcloud's deleted files.");
  await la(s, d, c("Delete")) && await $t(n, async () => {
    const o = [];
    for (const p of e)
      try {
        await n.vault.vault.removeEntry(n.dirId, p.displayname);
      } catch (u) {
        o.push(p.displayname + ": " + ft(u, p.displayname));
      }
    o.length && W(o.join(`
`));
  });
}
const Tt = 10 * 1024 * 1024;
function Se(e) {
  return [...pt, ...[...Z.values()].map((r) => r.folder)].some((r) => e === r || e.startsWith(r.replace(/\/+$/, "") + "/"));
}
function Tn(e) {
  const n = new Uint8Array(e.reduce((s, d) => s + d.length, 0));
  let r = 0;
  for (const s of e)
    n.set(s, r), r += s.length;
  return n;
}
async function* Ja(e, n) {
  let r = [], s = 0;
  for await (const d of e)
    for (r.push(d), s += d.length; s >= n; ) {
      const o = Tn(r);
      yield o.subarray(0, n), r = s > n ? [o.subarray(n)] : [], s -= n;
    }
  s > 0 && (yield Tn(r));
}
async function tt(e) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", e));
}
function In(e, n) {
  return e.length === n.length && e.every((r, s) => r === n[s]);
}
function Xa(e) {
  const n = Z.get(e.attributes?.cryptomatorVault);
  if (e.type === ce.Folder) {
    const r = n?.dirs.get(e.basename);
    return r ? { type: "dir", name: r.name, dirId: r.dirId } : null;
  }
  return n?.entries.get(e.basename) ?? null;
}
async function $a() {
  const e = ne();
  if (!e)
    return;
  let n = null, r;
  try {
    const { getFilePickerBuilder: o } = await Pe();
    r = await o(c("Copy or move into the vault")).setMultiSelect(!0).allowDirectories(!0).setFilter((p) => !Se(p.path)).setButtonFactory((p) => [
      { label: c("Copy into the vault"), variant: "secondary", disabled: p.length === 0, callback: () => {
        n = "copy";
      } },
      { label: c("Move into the vault"), variant: "primary", disabled: p.length === 0, callback: () => {
        n = "move";
      } }
    ]).build().pick();
  } catch {
    return;
  }
  if (r = [].concat(r || []), n === null || r.length === 0)
    return;
  const s = le("");
  let d;
  try {
    d = await va(s, r);
  } catch (o) {
    W(H(o));
    return;
  }
  await je(d.flatMap((o) => o.files.map((p) => cr(s, p))), d.flatMap((o) => o.folders), {
    title: n === "move" ? c("Moving into {vault}", { vault: e.vault.name }) : c("Copying into {vault}", { vault: e.vault.name }),
    written: c("Encrypted and checked"),
    // A file that changed while it was read may be in the vault half old, half new.
    async check(o) {
      if ((await s.stat(o.origin.path))?.etag !== o.origin.etag)
        throw new Ve("changed", o.origin.path);
    },
    after: n === "move" ? (o, p) => Za(s, d, o, p) : void 0
  });
}
async function Za(e, n, r, s) {
  const d = new Set(r.map((p) => p.origin));
  let o = 0;
  for (const p of n) {
    const u = s.file(p.isDir ? p.name + "/" : p.name);
    if (!p.files.every((m) => d.has(m))) {
      u.done(c("Original kept: not all of it is in the vault"), !0);
      continue;
    }
    if (!p.permissions.includes("D") || p.permissions.includes("S")) {
      u.done(c("Original kept: it is shared with you"), !0);
      continue;
    }
    try {
      await e.removeUnchanged(p.path, p.etag, { isDir: p.isDir }), o++, u.done(await ba(p.path) ? c("Original deleted for good") : c("Original deleted; it may still be in the deleted files"));
    } catch (m) {
      u.done(H(m), !0);
    }
  }
  return o ? c("Originals deleted for good: {removed}.", { removed: o }) : "";
}
async function Nn(e, n, r, s, d, o) {
  if (r.size < _e) {
    o("decrypt", 0, 1);
    const m = await e.readFile(r);
    if (await n.write(s, m, { create: !d, onProgress: (v, x) => o("upload", v, x) }), o("verify", 0, 1), !In(await tt(await n.read(s)), await tt(m)))
      throw new Ve("network", "the stored copy differs from the decrypted file");
    return;
  }
  const p = [];
  async function* u(m) {
    for await (const v of m)
      p.push(await tt(v)), yield v;
  }
  if (await n.writeParts(
    s,
    r.size,
    u(Ja(e.decryptedPieces(r), Tt)),
    { create: !d, onProgress: (m, v) => o("upload", m, v) }
  ), (await n.stat(s))?.size !== r.size)
    throw new Ve("network", "the stored copy has another size than the decrypted file");
  for (const [m, v] of p.entries()) {
    const x = m * Tt;
    if (!In(await tt(await n.readRange(s, x, Math.min(x + Tt, r.size))), v))
      throw new Ve("network", "the stored copy differs from the decrypted file");
    o("verify", m + 1, p.length);
  }
}
async function Dn(e) {
  const n = ne();
  if (!n)
    return;
  let r = null, s = null;
  try {
    const { getFilePickerBuilder: D } = await Pe();
    await D(e.length === 1 ? c("Export “{name}” decrypted to …", { name: e[0].displayname }) : c("Export {count} items decrypted to …", { count: e.length })).setMultiSelect(!1).allowDirectories(!0).setMimeTypeFilter(["httpd/unix-directory"]).setFilter((j) => j.type === ce.Folder && !Se(j.path)).setButtonFactory((j, G) => [
      { label: c("Copy here"), variant: "secondary", callback: () => {
        r = "copy", s = G;
      } },
      { label: c("Move here"), variant: "primary", callback: () => {
        r = "move", s = G;
      } }
    ]).build().pick();
  } catch {
  }
  if (r === null || s === null)
    return;
  if (Se(s)) {
    W(c("Choose a folder outside the vault."));
    return;
  }
  if (ee) {
    W(c("Another change to the vault is still running."));
    return;
  }
  ee = !0;
  const { vault: d } = n.vault, o = le(""), p = (...D) => [s.replace(/^\/+|\/+$/g, ""), ...D].filter(Boolean).join("/"), u = Gn(r === "move" ? c("Moving out of {vault}", { vault: n.vault.name }) : c("Exporting from {vault}", { vault: n.vault.name })), m = { text: c("Replace the file in your files with the one from the vault? Nextcloud keeps the old one among its versions."), cancel: c("Cancel") };
  let v = null, x = 0, A = 0, C = !1;
  const M = [];
  try {
    const D = [];
    for (const V of e) {
      const L = Xa(V), K = { name: V.displayname, files: [], folders: [], complete: L !== null }, ae = async (B, J) => {
        K.folders.push(J);
        for (const Q of await d.list(B))
          Q.type === "dir" ? await ae(Q.dirId, [...J, Q.name]) : Q.type === "file" ? K.files.push({ entry: Q, dirs: J }) : K.complete = !1;
      };
      L?.type === "dir" ? await ae(L.dirId, [L.name]) : L?.type === "file" ? K.files.push({ entry: L, dirs: [] }) : K.complete = !1, D.push(K);
    }
    const j = D.reduce((V, L) => V + L.files.length, 0);
    let G = 0;
    for (const V of D) {
      for (const L of V.folders)
        try {
          await o.mkdir(p(...L), { existsOk: !0 });
        } catch (K) {
          V.complete = !1, M.push(L.join("/")), u.file(L.join("/") + "/").done(H(K), !0);
        }
      for (const { entry: L, dirs: K } of V.files) {
        const ae = [...K, L.name].join("/"), B = u.file(ae);
        if (G++, u.stopped || C) {
          V.complete = !1, B.done(c("Not exported"));
          continue;
        }
        const J = { decrypt: c("Decrypting"), upload: L.size >= _e ? c("Decrypting and uploading") : c("Uploading"), verify: c("Checking") }, Q = { decrypt: [0, 0.2], upload: [0.2, 0.6], verify: [0.8, 0.2] }, be = ($, F, fe) => B.phase(J[$], Q[$][0] + Q[$][1] * (fe ? F / fe : 1));
        let pe = v === "replace-all";
        try {
          try {
            await Nn(d, o, L, p(...K, L.name), pe, be);
          } catch ($) {
            if ($?.code !== "exists" || v === "skip-all")
              throw $;
            const F = v === "replace-all" ? "replace" : await u.ask(ae, j, m);
            if (F === "cancel")
              throw C = !0, Object.assign(new Error("cancelled"), { cancelled: !0 });
            if (F.endsWith("-all") && (v = F), F.startsWith("skip"))
              throw Object.assign(new Error("skipped"), { skipped: !0 });
            pe = !0, await Nn(d, o, L, p(...K, L.name), pe, be);
          }
          x++, B.done(c("Exported and checked"));
        } catch ($) {
          if (V.complete = !1, $?.cancelled) {
            B.done(c("Not exported"));
            continue;
          }
          $?.skipped || $?.code === "exists" && v === "skip-all" ? B.done(c("Skipped")) : (M.push(ae), B.done(H($), !0));
        }
        u.progress(G / Math.max(j, 1));
      }
      if (r === "move") {
        const L = u.file(c("“{name}” in the vault", { name: V.name }));
        if (!V.complete) {
          L.done(c("Kept in the vault: not all of it was exported"), !0);
          continue;
        }
        try {
          await d.removeEntry(n.dirId, V.name), A++, L.done(c("Removed from the vault"));
        } catch (K) {
          L.done(ft(K, V.name), !0);
        }
      }
    }
  } catch (D) {
    M.push(""), W(H(D));
  } finally {
    ee = !1;
    const D = M.length ? c("{written} exported, {failed} failed.", { written: x, failed: M.length }) : c("{written} exported and checked.", { written: x });
    u.finish(D + (A ? " " + c("{removed} removed from the vault.", { removed: A }) : ""), M.length > 0), Ue(n.vault.name);
  }
}
me({
  id: "cryptomator-vaults-rename",
  displayName: () => c("Rename"),
  iconSvgInline: () => Da,
  enabled: ({ nodes: e, view: n }) => mt(e, n) && e.length === 1,
  async exec({ nodes: e }) {
    return await Ya(e[0]), null;
  },
  order: -700
});
me({
  id: "cryptomator-vaults-move",
  displayName: () => c("Move …"),
  iconSvgInline: () => Ra,
  enabled: ({ nodes: e, view: n }) => mt(e, n),
  async exec({ nodes: e }) {
    return await Sn(e), null;
  },
  async execBatch({ nodes: e }) {
    return await Sn(e), e.map(() => null);
  },
  order: -690
});
me({
  id: "cryptomator-vaults-export",
  displayName: () => c("Export to your files …"),
  iconSvgInline: () => _a,
  enabled: ({ nodes: e, view: n }) => mt(e, n),
  async exec({ nodes: e }) {
    return await Dn(e), null;
  },
  async execBatch({ nodes: e }) {
    return await Dn(e), e.map(() => null);
  },
  order: -680
});
me({
  id: "cryptomator-vaults-delete",
  displayName: () => c("Delete"),
  iconSvgInline: () => Fa,
  enabled: ({ nodes: e, view: n }) => mt(e, n),
  async exec({ nodes: e }) {
    return await Mn(e), null;
  },
  async execBatch({ nodes: e }) {
    return await Mn(e), e.map(() => null);
  },
  destructive: !0,
  order: 100
});
Me({
  id: "cryptomator-vaults-upload",
  displayName: () => c("Upload files …"),
  iconSvgInline: () => Qn,
  order: -2,
  enabled: ({ view: e }) => te(e) && ne() !== null,
  exec: async () => (lr(), null)
});
Me({
  id: "cryptomator-vaults-upload-folder",
  displayName: () => c("Upload folder …"),
  iconSvgInline: () => Qn,
  order: -1.5,
  enabled: ({ view: e }) => te(e) && ne() !== null,
  exec: async () => (lr(!0), null)
});
Me({
  id: "cryptomator-vaults-import",
  displayName: () => c("Add from your files …"),
  iconSvgInline: () => Bt,
  order: -1.2,
  enabled: ({ view: e }) => te(e) && ne() !== null,
  exec: async () => (await $a(), null)
});
Me({
  id: "cryptomator-vaults-new-folder",
  displayName: () => c("New folder …"),
  iconSvgInline: () => er,
  order: -1,
  enabled: ({ view: e }) => te(e) && ne() !== null,
  exec: async () => (await Ga(), null)
});
function Qa(e) {
  ne() && e.dataTransfer?.types?.includes("Files") && (e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy");
}
function eo(e) {
  if (!ne() || !e.dataTransfer?.files?.length)
    return;
  e.preventDefault(), e.stopPropagation();
  const n = [...e.dataTransfer.items || []].map((r) => r.webkitGetAsEntry?.()).filter(Boolean);
  if (n.length === 0) {
    je([...e.dataTransfer.files].map((r) => Xt(r, [])));
    return;
  }
  qa(n).then(({ files: r, folders: s }) => je(r, s), (r) => W(H(r)));
}
window.addEventListener("dragover", Qa, !0);
window.addEventListener("drop", eo, !0);
const to = 600 * 1e3, no = "cryptomator_vaults.inbox-auto";
let Ne = null;
function dr(e = !1) {
  if (e || !Ne || Date.now() - Ne.at > to) {
    const n = (async () => {
      const r = le(""), s = [];
      for (const d of (await ga(Fe)).map(Ae))
        try {
          const o = await r.read(d.slice(1) + "/" + Fe);
          s.push({ folder: d, ...o.length > ka ? { problem: "invalid" } : Ca(new TextDecoder().decode(o), d) });
        } catch {
        }
      return s;
    })();
    Ne = { at: Date.now(), promise: n }, n.catch(() => {
      Ne?.promise === n && (Ne = null);
    });
  }
  return Ne.promise;
}
function ur() {
  return no + "." + ve();
}
function hr() {
  try {
    const e = JSON.parse(window.localStorage.getItem(ur()) || "[]");
    return Array.isArray(e) ? e.filter((n) => typeof n == "string") : [];
  } catch {
    return [];
  }
}
function pr(e) {
  return hr().includes(e.folder);
}
function ro(e, n) {
  try {
    const r = hr().filter((s) => s !== e.folder);
    window.localStorage.setItem(ur(), JSON.stringify(n ? [...r, e.folder] : r));
  } catch {
  }
}
async function ct(e) {
  const n = [], r = [], s = le(""), d = Ae(e.folder);
  let o;
  try {
    o = (await dr()).filter((u) => (u.inbox?.vault ?? u.vault) === d);
  } catch (u) {
    return e.inbox = { items: n, problems: [c("The search for inboxes failed: {detail}", { detail: u.message })] }, e.inbox;
  }
  let p = null;
  for (const u of o) {
    const m = u.folder;
    if (u.problem === "version") {
      r.push(c("The inbox “{inbox}” needs a newer version of this app; it is left alone.", { inbox: m }));
      continue;
    }
    if (u.problem === "loop" || Se(m)) {
      r.push(c("The inbox “{inbox}” is left alone: it is a vault's folder, inside one or holds one.", { inbox: m }));
      continue;
    }
    if (u.inbox)
      try {
        if (p === null) {
          const x = (await s.stat(d.slice(1)))?.permissions ?? "";
          p = x.includes("C") && x.includes("K");
        }
        if (!p) {
          r.push(c("The inbox “{inbox}” is left alone: you cannot write to this vault.", { inbox: m }));
          continue;
        }
        const v = await s.stat(m.slice(1));
        if (v === null || !v.isDir)
          continue;
        if (v.permissions.includes("S")) {
          r.push(c("The inbox “{inbox}” is left alone: it is shared with you, and its files are not yours to delete.", { inbox: m }));
          continue;
        }
        n.push({ inbox: u.inbox, plan: await Ma(u.inbox, (x) => s.list(x)) });
      } catch (v) {
        r.push(c("The inbox “{inbox}” cannot be read: {detail}", { inbox: m, detail: H(v) }));
      }
  }
  return e.inbox = { items: n, problems: r }, e.inbox;
}
function ao(e) {
  const r = (e.inbox?.items ?? []).filter((d) => d.plan.ready.length > 0), s = (e.inbox?.problems ?? []).map((d) => g(
    "div",
    { class: "cryptomator-banner cryptomator-banner--inbox", role: "note" },
    g("span", { class: "cryptomator-banner__text cryptomator-notice--error" }, d)
  ));
  for (const d of r) {
    const { inbox: o, plan: p } = d, u = p.ready.length, m = { from: o.from, inbox: o.folder, size: Ke(p.ready.reduce((x, A) => x + A.size, 0)) }, v = (o.from ? Ct("%n file from {from} is waiting in “{inbox}” ({size}).", "%n files from {from} are waiting in “{inbox}” ({size}).", u, m) : Ct("%n file is waiting in “{inbox}” ({size}).", "%n files are waiting in “{inbox}” ({size}).", u, m)) + (p.recent.length ? " " + Ct("%n more is still being written and comes next time.", "%n more are still being written and come next time.", p.recent.length) : "");
    s.push(g("div", { class: "cryptomator-banner cryptomator-banner--inbox", role: "status" }, [
      g("span", { class: "cryptomator-banner__icon", "aria-hidden": "true" }),
      g("span", { class: "cryptomator-banner__text" }, v),
      g("button", { type: "button", class: "primary", onclick: () => fr(e, [d]) }, c("Move into the vault"))
    ])), s[s.length - 1].querySelector(".cryptomator-banner__icon").innerHTML = Bt;
  }
  if (r.length > 0) {
    const d = g("input", { type: "checkbox", checked: pr(e), onchange: () => ro(e, d.checked) });
    s.push(g("label", { class: "cryptomator-inbox-auto" }, [d, c("Move files from inboxes automatically when I unlock")]));
  }
  return s;
}
async function oo(e) {
  try {
    await ct(e);
  } catch {
    return;
  }
  Ee(de?.folder), pr(e) && e.inbox.items.some((n) => n.plan.ready.length > 0) && await fr(e, e.inbox.items);
}
async function fr(e, n) {
  if (!e.vault?.unlocked)
    return;
  if (ee) {
    W(c("Another change to the vault is still running."));
    return;
  }
  const r = new Set(n.map((o) => o.inbox.folder)), s = (await ct(e)).items.filter((o) => r.has(o.inbox.folder) && o.plan.ready.length > 0);
  if (Ee(de?.folder), s.length === 0)
    return;
  const d = le("");
  await je(s.flatMap((o) => o.plan.ready.map((p) => cr(d, p))), [], {
    into: { vault: e, dirId: "" },
    keepBoth: !0,
    title: c("Moving from inboxes into {vault}", { vault: e.name }),
    written: c("Encrypted and checked"),
    // A file that changed while it was read may be in the vault half old, half new.
    async check(o) {
      if ((await d.stat(o.origin.path))?.etag !== o.origin.etag)
        throw new Ve("changed", o.origin.path);
    },
    after: (o, p) => io(d, s, o, p)
  }), await ct(e).catch(() => {
  }), Ee(de?.folder);
}
async function io(e, n, r, s) {
  const d = [];
  for (const m of r.map((v) => v.origin)) {
    if (!m.permissions.includes("D")) {
      s.file(m.path).done(c("Plain copy kept: you cannot delete it"), !0);
      continue;
    }
    try {
      await e.removeUnchanged(m.path, m.etag), d.push(m.path);
    } catch (v) {
      s.file(m.path).done(H(v), !0);
    }
  }
  const o = [];
  for (const m of n)
    for (const v of m.plan.folders) {
      const x = [m.inbox.folder.slice(1), ...v].join("/");
      if (d.some((A) => A.startsWith(x + "/")))
        try {
          (await e.list(x)).length === 0 && (await e.remove(x), o.push(x));
        } catch {
        }
    }
  let p = /* @__PURE__ */ new Set();
  try {
    p = await Rt(d), await Rt(o, { onlyEmpty: !0 });
  } catch (m) {
    s.file(c("Deleted files")).done(H(m), !0);
  }
  const u = d.length - p.size;
  return (d.length ? c("Plain copies deleted for good: {removed}.", { removed: p.size }) : "") + (u ? " " + c("{count} of them may still be in the deleted files.", { count: u }) : "");
}
async function so(e) {
  const n = Ae(e.folder), r = Ft(n).slice(0, -1), s = await Ge({
    title: c("Make an inbox for {vault}", { vault: e.name }),
    intro: [
      c("Files put into an inbox, by you or by an app such as Harvester, are offered for the vault when you unlock it, and moved into it encrypted. Until then they are ordinary files on the server."),
      c("The folder in the vault the files go to is written unencrypted into the inbox's marker file, {marker}.", { marker: Fe })
    ],
    fields: [
      { name: "folder", label: c("Inbox folder"), value: "/" + [...r, c("{vault} inbox", { vault: e.name })].join("/") },
      { name: "target", label: c("Folder in the vault"), value: "/" },
      { name: "from", label: c("Filled by (optional)"), value: "", optional: !0 }
    ],
    action: c("Make the inbox"),
    working: c("Making the inbox …"),
    async run({ folder: d, target: o, from: p }) {
      const u = Ae(d), m = Ae(o);
      if (u === null || u === "/")
        throw new Error(c("“{name}” cannot be a folder's name.", { name: d }));
      if (m === null)
        throw new Error(c("“{name}” cannot be a name in a vault.", { name: o }));
      for (const A of Ft(m))
        try {
          Ut(A);
        } catch (C) {
          throw new Error(H(C));
        }
      if (it(u, n) || it(n, u) || Se(u))
        throw new Error(c("An inbox cannot be a vault's folder, inside one or hold one."));
      const v = le(""), x = await v.stat(u.slice(1));
      if (x === null)
        try {
          await v.mkdir(u.slice(1));
        } catch (A) {
          throw new Error(c("“{folder}” could not be created: {detail}", { folder: u, detail: A.message }));
        }
      else if (!x.isDir)
        throw new Error(c("“{folder}” is a file.", { folder: u }));
      try {
        await v.write(u.slice(1) + "/" + Fe, new TextEncoder().encode(Aa({ vault: n, target: m, from: p.trim() })), { create: !0 });
      } catch (A) {
        throw new Error(A?.code === "exists" ? c("“{folder}” is an inbox already.", { folder: u }) : H(A));
      }
      return u;
    }
  });
  s && (await dr(!0).catch(() => {
  }), e.vault?.unlocked && (await ct(e).catch(() => {
  }), Ee(de?.folder)), ze(c("“{folder}” is an inbox of {vault} now.", { folder: s, vault: e.name })));
}
const Rn = 8, It = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm5.65-4A6 6 0 1 0 12.65 14H17v4h4v-4h2v-4H12.65z"/></svg>', co = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 0 1 7.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 3 5.5 5.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35zM11 7v3H8v2h3v3h2v-3h3v-2h-3V7h-2z"/></svg>';
function Zt() {
  return import("./cryptomator_vaults-recovery-words-CHlfZTyo.mjs").then((e) => e.default.split(`
`));
}
function Qt(e, n) {
  if (e.length < Rn)
    throw new Error(c("The password needs at least {count} characters.", { count: Rn }));
  if (e !== n)
    throw new Error(c("The two passwords differ."));
}
function lo(e) {
  switch (e.kind) {
    case "MissingDirIdBackup":
      return c("A folder's spare copy of its ID is missing. Repairing writes it.");
    case "MissingContentDir":
      return c("A folder's contents are missing; it cannot be opened. Repairing creates it anew, empty.");
    case "OrphanContentDir":
      return c("Encrypted files that no folder leads to. Repairing moves them into the folder LOST+FOUND.");
    case "LooseDirFile":
      return c("A stray folder file outside any folder. Repairing removes it.");
    case "EmptyDirFile":
      return c("A folder whose file is empty; it cannot be opened. Repairing removes the broken entry.");
    case "UnknownType":
      return e.fixable ? c("An empty entry that is neither file, folder nor link. Repairing removes it.") : c("An entry that is neither file, folder nor link, and not empty. Look at it in Cryptomator.");
    case "AmbiguousType":
      return c("An entry that is several kinds at once. Look at it in Cryptomator.");
    case "LongShortNamesMismatch":
      return c("An entry with a long name, stored under the wrong short name. Repairing renames it.");
    case "TrailingBytesInNameFile":
      return c("A long name with stray bytes after it. Repairing removes them.");
    case "MissingLongName":
    case "NotDecodableLongName":
    case "ObeseNameFile":
      return c("An entry whose long name is missing or damaged. Look at it in Cryptomator.");
    case "ObeseDirFile":
    case "DirIdCollision":
      return c("A folder whose ID is damaged or used twice. Look at it in Cryptomator.");
    default:
      return e.kind;
  }
}
async function uo() {
  let e = null;
  try {
    const { getFilePickerBuilder: d } = await Pe();
    await d(c("Where should the new vault go?")).startAt("/").setMultiSelect(!1).allowDirectories(!0).setMimeTypeFilter(["httpd/unix-directory"]).setFilter((o) => o.type === ce.Folder && !Se(o.path)).setButtonFactory((o, p) => [{ label: c("Create the vault here"), variant: "primary", callback: () => {
      e = p;
    } }]).build().pick();
  } catch {
  }
  if (e === null)
    return;
  if (Se(e)) {
    W(c("A vault cannot be inside a vault."));
    return;
  }
  const n = le(""), r = await Ge({
    title: c("New vault"),
    intro: [c("The vault is a folder of encrypted files, which Cryptomator opens too. Its password cannot be recovered without the recovery key shown next.")],
    fields: [
      { name: "place", label: c("In"), value: e, readonly: !0 },
      { name: "name", label: c("Name"), value: c("Vault") },
      { name: "password", label: c("Password"), type: "password", autocomplete: "new-password" },
      { name: "repeated", label: c("Password again"), type: "password", autocomplete: "new-password" }
    ],
    action: c("Create"),
    working: c("Creating the vault …"),
    async run({ name: d, password: o, repeated: p }) {
      const u = d.trim();
      if (!u || u === "." || u === ".." || /[/\\]/.test(u))
        throw new Error(c("“{name}” cannot be a folder's name.", { name: u }));
      Qt(o, p);
      const m = (e.replace(/\/+$/, "") + "/" + u).replace(/^\/*/, "/");
      try {
        await n.mkdir(m.slice(1));
      } catch (x) {
        throw new Error(x?.code === "exists" ? c("A folder “{name}” is there already.", { name: u }) : H(x));
      }
      let v;
      try {
        v = await Ye.create(le(m), o);
      } catch (x) {
        throw await n.remove(m.slice(1)).catch(() => {
        }), new Error(H(x));
      }
      return { folder: m, vault: v, key: await v.recoveryKey(o, await Zt()) };
    }
  });
  if (!r)
    return;
  ar(r.folder), pt.add(r.folder), await dt();
  const s = await Wt(r.folder);
  s.vault = r.vault, ht(), await Yn(s.name, r.key, { created: !0 }), Oe("/" + s.seg);
}
async function mr(e) {
  return e.vault ?? await Ye.open(le(e.folder));
}
async function ho(e) {
  await Ge({
    title: c("Change the password of {vault}", { vault: e.name }),
    intro: [c("The files stay as they are; only the vault's key file gets the new password. Cryptomator on your other devices then needs the new one, too.")],
    fields: [
      { name: "account", label: c("Vault"), value: e.folder, readonly: !0, account: !0, autocomplete: "username" },
      { name: "old", label: c("Current password"), type: "password", autocomplete: "current-password" },
      { name: "password", label: c("New password"), type: "password", autocomplete: "new-password" },
      { name: "repeated", label: c("New password again"), type: "password", autocomplete: "new-password" }
    ],
    action: c("Change password"),
    working: c("Changing the password …"),
    async run({ old: r, password: s, repeated: d }) {
      Qt(s, d);
      try {
        const o = await mr(e);
        await o.changePassword(r, s), e.vault = o;
      } catch (o) {
        throw new Error(H(o));
      }
      return !0;
    }
  }) && ze(c("The password of {vault} is changed.", { vault: e.name }));
}
async function po(e) {
  const n = await Ge({
    title: c("Recovery key of {vault}", { vault: e.name }),
    intro: [c("Enter the vault's password to see its recovery key.")],
    fields: [
      { name: "account", label: c("Vault"), value: e.folder, readonly: !0, account: !0, autocomplete: "username" },
      { name: "password", label: c("Password"), type: "password", autocomplete: "current-password" }
    ],
    action: c("Show"),
    working: c("Unlocking …"),
    async run({ password: r }) {
      try {
        return await (await mr(e)).recoveryKey(r, await Zt());
      } catch (s) {
        throw new Error(H(s));
      }
    }
  });
  n && await Yn(e.name, n);
}
async function fo(e) {
  const n = await Ge({
    title: c("Reset the password of {vault}", { vault: e.name }),
    intro: [c("With the vault's recovery key (the words from Cryptomator or from this app) it gets a new password. The files stay as they are.")],
    fields: [
      { name: "account", label: c("Vault"), value: e.folder, readonly: !0, account: !0, autocomplete: "username" },
      { name: "key", label: c("Recovery key"), type: "textarea" },
      { name: "password", label: c("New password"), type: "password", autocomplete: "new-password" },
      { name: "repeated", label: c("New password again"), type: "password", autocomplete: "new-password" }
    ],
    action: c("Set the new password"),
    working: c("Setting the new password …"),
    async run({ key: r, password: s, repeated: d }) {
      Qt(s, d);
      try {
        return await Ye.resetPassword(le(e.folder), r, s, await Zt());
      } catch (o) {
        throw new Error(H(o));
      }
    }
  });
  n && (e.vault = n, ht(), ze(c("{vault} has a new password and is unlocked.", { vault: e.name })));
}
async function mo(e) {
  !e.vault?.unlocked && !await qt(e) || ua(e.name, {
    check: (n) => e.vault.checkHealth(n),
    describe: lo,
    async repair(n) {
      if (ee)
        throw new Error(c("Another change to the vault is still running."));
      ee = !0;
      try {
        for (const r of n)
          await e.vault.repair(r);
      } catch (r) {
        throw new Error(H(r));
      } finally {
        ee = !1, Ue(e.name);
      }
    }
  });
}
const wo = (e) => Z.get(e[0].attributes.cryptomatorVault), yo = ({ nodes: e, view: n }) => Le && te(n) && e.length === 1 && e[0].attributes?.cryptomatorVaultRoot === !0;
for (const [e, n, r, s, d] of [
  ["cryptomator-vaults-change-password", () => c("Change password …"), It, ho, -790],
  ["cryptomator-vaults-recovery-key", () => c("Show recovery key …"), It, po, -780],
  ["cryptomator-vaults-reset-password", () => c("Reset password with recovery key …"), It, fo, -770],
  ["cryptomator-vaults-health", () => c("Check health …"), co, mo, -760],
  ["cryptomator-vaults-make-inbox", () => c("Make an inbox for this vault …"), Bt, so, -750]
])
  me({
    id: e,
    displayName: n,
    iconSvgInline: () => r,
    enabled: yo,
    async exec({ nodes: o }) {
      return await s(wo(o)), null;
    },
    order: d
  });
Me({
  id: "cryptomator-vaults-new",
  displayName: () => c("New vault …"),
  iconSvgInline: () => er,
  order: -0.5,
  enabled: ({ view: e }) => Le && te(e) && se.kind === "vaults",
  exec: async () => (await uo(), null)
});
Me({
  id: "cryptomator-vaults-add",
  displayName: () => c("Open a vault folder …"),
  iconSvgInline: () => Pa,
  order: 0,
  enabled: ({ view: e }) => te(e),
  exec: async () => (await or(), null)
});
Me({
  id: "cryptomator-vaults-lock-all",
  displayName: () => c("Lock all vaults"),
  iconSvgInline: () => Zn,
  order: 1,
  enabled: ({ view: e }) => te(e) && [...Z.values()].some((n) => n.vault?.unlocked),
  exec: async () => (Gt(), null)
});
_r().register(new Pr({
  id: Ht,
  name: c("Vaults"),
  caption: c("Cryptomator vaults, unlocked in this browser"),
  emptyTitle: c("No vaults found"),
  emptyCaption: c("Vaults in your files appear here. Open a vault's folder to add one."),
  emptyView: Va,
  icon: Kt,
  order: 90,
  getContents: Ha
}));
Jt();
for (const e of ["pointerdown", "keydown", "wheel", "touchstart"])
  document.addEventListener(e, Ka, { passive: !0 });
window.addEventListener("pagehide", () => {
  q(), Gt();
});
Le && dt().then(() => st(xe?.folder));
export {
  Ht as VIEW_ID
};
