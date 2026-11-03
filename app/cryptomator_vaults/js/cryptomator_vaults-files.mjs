import { g as ja, t as qa, v as Ga, x as $e, K as Ya, L as de, M as Xa, O as ca, s as $a, F as ie, Q as be, R as Ja, V as Za, z as la, P as gt, S as Qa, y as en, A as da, T as tn } from "./cryptomator_vaults-common-DyNnossx.mjs";
var We = { exports: {} }, an = We.exports, Wt;
function nn() {
  return Wt || (Wt = 1, (function(e) {
    (function(a, o) {
      e.exports ? e.exports = o(globalThis.crypto) : a.CryptomatorVault = o(a.crypto);
    })(typeof self < "u" ? self : an, function(a) {
      const o = a.subtle, l = new TextEncoder(), u = new TextDecoder("utf-8", { fatal: !0 });
      class i extends Error {
        constructor(t, r) {
          super(r || t), this.name = "VaultError", this.code = t;
        }
      }
      function h(g) {
        const t = g.replace(/-/g, "+").replace(/_/g, "/"), r = t + "=".repeat((4 - t.length % 4) % 4), n = atob(r), c = new Uint8Array(n.length);
        for (let d = 0; d < n.length; d++)
          c[d] = n.charCodeAt(d);
        return c;
      }
      function p(g, t) {
        let r = "";
        for (let c = 0; c < g.length; c++)
          r += String.fromCharCode(g[c]);
        const n = btoa(r).replace(/\+/g, "-").replace(/\//g, "_");
        return t ? n : n.replace(/=+$/, "");
      }
      function v(g) {
        let t = "";
        for (let r = 0; r < g.length; r++)
          t += String.fromCharCode(g[r]);
        return btoa(t);
      }
      const b = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
      function E(g) {
        let t = "", r = 0, n = 0;
        for (const c of g)
          for (r = r << 8 | c, n += 8; n >= 5; )
            t += b[r >>> n - 5 & 31], n -= 5;
        return n > 0 && (t += b[r << 5 - n & 31]), t;
      }
      function A(...g) {
        const t = new Uint8Array(g.reduce((n, c) => n + c.length, 0));
        let r = 0;
        for (const n of g)
          t.set(n, r), r += n.length;
        return t;
      }
      function C(g) {
        const t = new Uint8Array(8);
        return new DataView(t.buffer).setBigUint64(0, BigInt(g)), t;
      }
      function S(g, t) {
        if (g.length !== t.length)
          return !1;
        let r = 0;
        for (let n = 0; n < g.length; n++)
          r |= g[n] ^ t[n];
        return r === 0;
      }
      async function R(g, t, r) {
        const n = await o.importKey(
          "raw",
          g.length ? g : new Uint8Array(64),
          { name: "HMAC", hash: "SHA-256" },
          !1,
          ["sign"]
        ), c = new Uint8Array(r);
        for (let d = 1, f = 0; f < r; d++, f += 32) {
          const w = new Uint8Array([d >>> 24, d >>> 16 & 255, d >>> 8 & 255, d & 255]), m = new Uint8Array(await o.sign("HMAC", n, A(t, w)));
          c.set(m.subarray(0, Math.min(32, r - f)), f);
        }
        return c;
      }
      function B(g) {
        const t = g.slice(), r = (n, c) => n << c | n >>> 32 - c;
        for (let n = 0; n < 8; n += 2)
          t[4] ^= r(t[0] + t[12], 7), t[8] ^= r(t[4] + t[0], 9), t[12] ^= r(t[8] + t[4], 13), t[0] ^= r(t[12] + t[8], 18), t[9] ^= r(t[5] + t[1], 7), t[13] ^= r(t[9] + t[5], 9), t[1] ^= r(t[13] + t[9], 13), t[5] ^= r(t[1] + t[13], 18), t[14] ^= r(t[10] + t[6], 7), t[2] ^= r(t[14] + t[10], 9), t[6] ^= r(t[2] + t[14], 13), t[10] ^= r(t[6] + t[2], 18), t[3] ^= r(t[15] + t[11], 7), t[7] ^= r(t[3] + t[15], 9), t[11] ^= r(t[7] + t[3], 13), t[15] ^= r(t[11] + t[7], 18), t[1] ^= r(t[0] + t[3], 7), t[2] ^= r(t[1] + t[0], 9), t[3] ^= r(t[2] + t[1], 13), t[0] ^= r(t[3] + t[2], 18), t[6] ^= r(t[5] + t[4], 7), t[7] ^= r(t[6] + t[5], 9), t[4] ^= r(t[7] + t[6], 13), t[5] ^= r(t[4] + t[7], 18), t[11] ^= r(t[10] + t[9], 7), t[8] ^= r(t[11] + t[10], 9), t[9] ^= r(t[8] + t[11], 13), t[10] ^= r(t[9] + t[8], 18), t[12] ^= r(t[15] + t[14], 7), t[13] ^= r(t[12] + t[15], 9), t[14] ^= r(t[13] + t[12], 13), t[15] ^= r(t[14] + t[13], 18);
        for (let n = 0; n < 16; n++)
          g[n] = g[n] + t[n] | 0;
      }
      function j(g, t, r, n) {
        n.set(g.subarray((2 * r - 1) * 16, 2 * r * 16));
        for (let c = 0; c < 2 * r; c++) {
          for (let d = 0; d < 16; d++)
            n[d] ^= g[c * 16 + d];
          B(n), t.set(n, ((c & 1) * r + (c >> 1)) * 16);
        }
      }
      function U(g, t, r) {
        const n = 32 * r, c = new Int32Array(n * t), d = new Int32Array(g), f = new Int32Array(n), w = new Int32Array(16);
        for (let m = 0; m < t; m++)
          c.set(d, m * n), j(d, f, r, w), d.set(f);
        for (let m = 0; m < t; m++) {
          const x = d[(2 * r - 1) * 16] & t - 1;
          for (let k = 0; k < n; k++)
            d[k] ^= c[x * n + k];
          j(d, f, r, w), d.set(f);
        }
        return d;
      }
      function P(g) {
        const t = new DataView(g.buffer, g.byteOffset, g.byteLength), r = new Int32Array(g.length / 4);
        for (let n = 0; n < r.length; n++)
          r[n] = t.getInt32(n * 4, !0);
        return r;
      }
      function q(g, t) {
        const r = new DataView(t.buffer, t.byteOffset, t.byteLength);
        for (let n = 0; n < g.length; n++)
          r.setInt32(n * 4, g[n], !0);
      }
      async function Y(g, t, r, n, c, d) {
        if (r < 2 || (r & r - 1) !== 0)
          throw new i("corrupt", "scrypt cost is not a power of two");
        const f = 128 * n, w = await R(g, t, c * f);
        for (let m = 0; m < c; m++) {
          const x = w.subarray(m * f, (m + 1) * f);
          q(U(P(x), r, n), x);
        }
        return R(g, w, d);
      }
      function K(g) {
        const t = new Uint8Array(16);
        for (let r = 0; r < 15; r++)
          t[r] = (g[r] << 1 | g[r + 1] >>> 7) & 255;
        return t[15] = g[15] << 1 & 255, g[0] & 128 && (t[15] ^= 135), t;
      }
      function Z(g, t) {
        const r = new Uint8Array(g.length);
        for (let n = 0; n < g.length; n++)
          r[n] = g[n] ^ t[n];
        return r;
      }
      class ae {
        constructor(t) {
          this.key = t, this.subkeys = null;
        }
        async cbcLast(t) {
          return new Uint8Array(await o.encrypt({ name: "AES-CBC", iv: new Uint8Array(16) }, this.key, t)).subarray(t.length - 16, t.length);
        }
        async mac(t) {
          if (this.subkeys === null) {
            const w = await this.cbcLast(new Uint8Array(16)), m = K(w);
            this.subkeys = [m, K(m)];
          }
          const [r, n] = this.subkeys, c = Math.max(1, Math.ceil(t.length / 16)), d = new Uint8Array(c * 16);
          d.set(t);
          const f = d.subarray((c - 1) * 16);
          return t.length > 0 && t.length % 16 === 0 ? f.set(Z(f, r)) : (f[t.length - (c - 1) * 16] = 128, f.set(Z(f, n))), this.cbcLast(d);
        }
      }
      async function he(g, t, r) {
        let n = await g.mac(new Uint8Array(16));
        for (const d of t)
          n = Z(K(n), await g.mac(d));
        let c;
        if (r.length >= 16)
          c = r.slice(), c.set(Z(c.subarray(c.length - 16), n), c.length - 16);
        else {
          const d = new Uint8Array(16);
          d.set(r), d[r.length] = 128, c = Z(K(n), d);
        }
        return g.mac(c);
      }
      function ce(g) {
        const t = g.slice();
        return t[8] &= 127, t[12] &= 127, t;
      }
      class J {
        constructor(t, r) {
          this.cmac = t, this.ctrKey = r;
        }
        async encrypt(t, r) {
          const n = await he(this.cmac, r, t), c = await o.encrypt({ name: "AES-CTR", counter: ce(n), length: 128 }, this.ctrKey, t);
          return A(n, new Uint8Array(c));
        }
        async decrypt(t, r) {
          if (t.length < 16)
            throw new i("corrupt", "name too short");
          const n = t.subarray(0, 16), c = new Uint8Array(await o.decrypt(
            { name: "AES-CTR", counter: ce(n), length: 128 },
            this.ctrKey,
            t.subarray(16)
          ));
          if (!S(await he(this.cmac, r, c), n))
            throw new i("corrupt", "name does not authenticate");
          return c;
        }
      }
      const _ = 32 * 1024, ne = {
        SIV_GCM: { header: 68, nonce: 12, overhead: 28 },
        SIV_CTRMAC: { header: 88, nonce: 16, overhead: 48 }
      };
      function me(g, t) {
        const { header: r, overhead: n } = ne[g], c = t - r;
        if (c <= 0)
          return 0;
        const d = Math.floor(c / (_ + n)), f = c % (_ + n);
        return d * _ + Math.max(0, f - n);
      }
      const Da = /[a-zA-Z0-9\-_]{20}(?:[a-zA-Z0-9\-_]{4})*(?:[a-zA-Z0-9\-_]{4}|[a-zA-Z0-9\-_]{3}=|[a-zA-Z0-9\-_]{2}==)/g, Ft = 36, Oa = 10 * 1024, Pa = 28, Dt = "LOST+FOUND", Ue = "recovery";
      async function _a(g, t, r) {
        let n = 0;
        const c = async () => {
          for (; n < g.length; )
            await r(g[n++]);
        };
        await Promise.all(Array.from({ length: Math.min(t, g.length) }, c));
      }
      const La = 32767, rt = ".cryptomator-vaults-", Ua = 1440 * 60 * 1e3, za = 255;
      function xe(g) {
        return a.getRandomValues(new Uint8Array(g));
      }
      function ze() {
        return a.randomUUID();
      }
      async function Ve(g) {
        return new Uint8Array(await o.digest("SHA-256", g));
      }
      const Ot = 999, Va = 2 ** 15, Pt = 8, _t = 220, ot = "masterkeyfile:";
      async function Lt(g, t, r, n, c) {
        const d = await Y(l.encode(String(g).normalize("NFC")), t, r, n, 1, 32);
        try {
          return await o.importKey("raw", d, "AES-KW", !1, c);
        } finally {
          d.fill(0);
        }
      }
      async function He(g, t) {
        const r = await Lt(t, h(g.scryptSalt), g.scryptCostParam, g.scryptBlockSize, ["unwrapKey"]);
        try {
          const n = async (c) => new Uint8Array(await o.exportKey(
            "raw",
            await o.unwrapKey("raw", h(c), r, "AES-KW", { name: "HMAC", hash: "SHA-256" }, !0, ["sign"])
          ));
          return { encRaw: await n(g.primaryMasterKey), macRaw: await n(g.hmacMasterKey) };
        } catch {
          throw new i("wrong-password");
        }
      }
      async function it({ encRaw: g, macRaw: t }, r, n = Va) {
        const c = xe(8), d = await Lt(r, c, n, Pt, ["wrapKey"]), f = async (k) => new Uint8Array(await o.wrapKey(
          "raw",
          await o.importKey("raw", k, { name: "HMAC", hash: "SHA-256" }, !0, ["sign"]),
          d,
          "AES-KW"
        )), w = await o.importKey("raw", t, { name: "HMAC", hash: "SHA-256" }, !1, ["sign"]), m = new Uint8Array(4);
        new DataView(m.buffer).setInt32(0, Ot);
        const x = {
          version: Ot,
          scryptSalt: v(c),
          scryptCostParam: n,
          scryptBlockSize: Pt,
          primaryMasterKey: v(await f(g)),
          hmacMasterKey: v(await f(t)),
          versionMac: v(new Uint8Array(await o.sign("HMAC", w, m)))
        };
        return l.encode(JSON.stringify(x, null, 2));
      }
      async function Ha({ encRaw: g, macRaw: t }, r, n) {
        const c = (w) => p(l.encode(JSON.stringify(w)), !1), d = c({ kid: r, typ: "JWT", alg: "HS256" }) + "." + c({ jti: ze(), format: 8, cipherCombo: n, shorteningThreshold: _t }), f = await o.importKey("raw", A(g, t), { name: "HMAC", hash: "SHA-256" }, !1, ["sign"]);
        return d + "." + p(new Uint8Array(await o.sign("HMAC", f, l.encode(d))), !1);
      }
      async function Ut(g, { encRaw: t, macRaw: r }) {
        const n = await o.importKey("raw", A(t, r), { name: "HMAC", hash: "SHA-256" }, !1, ["verify"]);
        return o.verify("HMAC", n, g.signature, l.encode(g.signed));
      }
      const Ba = Array.from({ length: 256 }, (g, t) => {
        let r = t;
        for (let n = 0; n < 8; n++)
          r = r & 1 ? 3988292384 ^ r >>> 1 : r >>> 1;
        return r >>> 0;
      });
      function zt(g) {
        let t = 4294967295;
        for (const r of g)
          t = Ba[(t ^ r) & 255] ^ t >>> 8;
        return (t ^ 4294967295) >>> 0;
      }
      function Vt(g, t) {
        const r = zt(g), n = A(g, new Uint8Array([r & 255, r >>> 8 & 255])), c = [];
        for (let d = 0; d < n.length; d += 3)
          c.push(t[n[d] << 4 | n[d + 1] >> 4], t[(n[d + 1] & 15) << 8 | n[d + 2]]);
        return n.fill(0), c.join(" ");
      }
      function Ht(g, t) {
        const r = new Map(t.map((m, x) => [m, x])), n = String(g).trim().toLowerCase().split(/\s+/).filter(Boolean);
        if (n.length !== 44)
          throw new i("invalid-recovery-key", n.length + " words, not 44");
        const c = n.find((m) => !r.has(m));
        if (c)
          throw new i("invalid-recovery-key", '"' + c + '" is not a word of the list');
        const d = new Uint8Array(66);
        for (let m = 0; m < n.length; m += 2) {
          const x = r.get(n[m]), k = r.get(n[m + 1]);
          d.set([x >> 4, (x & 15) << 4 | k >> 8, k & 255], m / 2 * 3);
        }
        const f = d.slice(0, 64), w = zt(f);
        if (d[64] !== (w & 255) || d[65] !== (w >>> 8 & 255))
          throw new i("invalid-recovery-key", "its check sum does not match");
        return f;
      }
      async function Ka(g, t) {
        const r = await Ve(t);
        return g + "." + [...r.slice(0, 4)].map((n) => n.toString(16).padStart(2, "0").toUpperCase()).join("") + ".bkup";
      }
      async function Bt(g) {
        let t;
        try {
          t = Wa(u.decode(await g.read(Be)));
        } catch (f) {
          throw f instanceof i ? f : new i("unsupported-format", "vault.cryptomator unreadable: " + f.message);
        }
        const { header: r, payload: n } = t;
        if (n.format !== 8)
          throw new i("unsupported-format", "vault format " + n.format);
        if (!(n.cipherCombo in ne))
          throw new i("unsupported-format", "cipher combination " + n.cipherCombo);
        if (r.alg !== "HS256")
          throw new i("unsupported-format", "signature " + r.alg);
        const c = String(r.kid || "");
        if (!c.startsWith(ot))
          throw new i("unsupported-key", c);
        const d = c.slice(ot.length);
        if (!/^[^/\\]+$/.test(d))
          throw new i("unsupported-key", c);
        return { config: t, name: d };
      }
      function Ae(g) {
        const t = String(g).normalize("NFC");
        if (t === "" || t === "." || t === ".." || /[/\\\u0000-\u001f\u007f]/.test(t) || t.length > za)
          throw new i("invalid-name", t);
        return t;
      }
      const Be = "vault.cryptomator";
      function Wa(g) {
        const t = g.trim().split(".");
        if (t.length !== 3)
          throw new i("unsupported-format", "vault.cryptomator is not a JWT");
        const r = (n) => JSON.parse(u.decode(h(n)));
        return { header: r(t[0]), payload: r(t[1]), signed: t[0] + "." + t[1], signature: h(t[2]) };
      }
      function T(...g) {
        return g.filter((t) => t !== "").join("/");
      }
      class ye {
        constructor(t, r, n) {
          this.storage = t, this.config = r, this.masterkeyFile = n, this.keys = null;
        }
        /** Reads the vault's configuration and key file; checks the format before any password. */
        static async open(t) {
          const { config: r, name: n } = await Bt(t), c = JSON.parse(u.decode(await t.read(n))), d = new ye(t, r, c);
          return d.masterkeyName = n, d;
        }
        get scheme() {
          return this.config.payload.cipherCombo;
        }
        get unlocked() {
          return this.keys !== null;
        }
        /** Derives the keys from the password; a VaultError 'wrong-password' if it is not the vault's. */
        async unlock(t) {
          const r = await He(this.masterkeyFile, t);
          try {
            await this.useKeys(r);
          } finally {
            r.encRaw.fill(0), r.macRaw.fill(0);
          }
        }
        /** Takes raw keys into use (not kept raw); refused if the configuration is not signed with them. */
        async useKeys({ encRaw: t, macRaw: r }) {
          if (!await Ut(this.config, { encRaw: t, macRaw: r }))
            throw new i("corrupt", "vault.cryptomator is not signed with this key");
          const n = (c, d) => o.importKey("raw", c, d, !1, ["encrypt", "decrypt"]);
          this.keys = {
            gcm: await n(t, "AES-GCM"),
            ctr: await n(t, "AES-CTR"),
            mac: await o.importKey("raw", r, { name: "HMAC", hash: "SHA-256" }, !1, ["sign", "verify"])
          }, this.siv = new J(new ae(await n(r, "AES-CBC")), this.keys.ctr), this.dirPaths = /* @__PURE__ */ new Map();
        }
        /**
         * Creates a vault in an empty folder of the storage, as Cryptomator's desktop
         * app and cryptofs do: new keys, the key file, the configuration, the root
         * directory with its ID's backup (dirid.c9r). Opened again from the storage
         * and unlocked with the password before it is returned, unlocked.
         */
        static async create(t, r, { cipherCombo: n = "SIV_GCM" } = {}) {
          if (typeof t.write != "function")
            throw new i("read-only");
          if (!(n in ne))
            throw new i("unsupported-format", "cipher combination " + n);
          const c = "masterkey.cryptomator";
          for (const w of [Be, c, "d"])
            if (await t.stat(w))
              throw new i("exists-other", w);
          const d = { encRaw: xe(32), macRaw: xe(32) };
          try {
            await t.write(c, await it(d, r), { create: !0 }), await t.write(Be, l.encode(await Ha(d, ot + c, n)), { create: !0 });
            const w = await ye.open(t);
            await w.useKeys(d);
            const m = await w.dirPath("");
            await t.mkdir("d", { existsOk: !0 }), await t.mkdir(m.split("/").slice(0, 2).join("/"), { existsOk: !0 }), await t.mkdir(m, { existsOk: !0 }), await t.write(T(m, "dirid.c9r"), await w.encryptContents(new Uint8Array(0)), { create: !0 });
          } finally {
            d.encRaw.fill(0), d.macRaw.fill(0);
          }
          const f = await ye.open(t);
          return await f.unlock(r), f;
        }
        /**
         * Changes the password, as Cryptomator's desktop app does: the keys unwrapped
         * with the old one and wrapped with the new one (a new salt, the same scrypt
         * cost); the old key file kept beside as a backup (backupName). The new one
         * is read back and must give the same keys, else the old one is put back.
         * Nothing else changes: the files stay as they are encrypted.
         */
        async changePassword(t, r) {
          if (typeof this.storage.write != "function")
            throw new i("read-only");
          const n = this.masterkeyName, c = await this.storage.read(n), d = JSON.parse(u.decode(c)), f = await He(d, t);
          try {
            await this.replaceKeyFile(n, c, await it(f, r, d.scryptCostParam), f, r);
          } finally {
            f.encRaw.fill(0), f.macRaw.fill(0);
          }
        }
        /**
         * Puts a new key file in place of the old one (backed up beside it, if there
         * was one) and reads it back: it must give these keys with the password, else
         * the old file is put back (VaultError 'corrupt').
         */
        async replaceKeyFile(t, r, n, c, d) {
          r && await this.storage.write(await Ka(t, r), r), await this.storage.write(t, n, { create: !r });
          const f = JSON.parse(u.decode(await this.storage.read(t)));
          let w = null;
          try {
            w = await He(f, d);
          } catch {
          }
          const m = w !== null && S(w.encRaw, c.encRaw) && S(w.macRaw, c.macRaw);
          if (w?.encRaw.fill(0), w?.macRaw.fill(0), !m)
            throw r && await this.storage.write(t, r), new i("corrupt", "the new key file does not read back");
          this.masterkeyFile = f;
        }
        /** The vault's recovery key (encodeRecoveryKey), after its password. */
        async recoveryKey(t, r) {
          const n = await He(JSON.parse(u.decode(await this.storage.read(this.masterkeyName))), t), c = A(n.encRaw, n.macRaw);
          try {
            return Vt(c, r);
          } finally {
            c.fill(0), n.encRaw.fill(0), n.macRaw.fill(0);
          }
        }
        /**
         * A new password with the recovery key, as Cryptomator's desktop app sets one:
         * the keys from the recovery key, checked against the vault's configuration
         * (signed with them), a new key file (the old one, if any, backed up). Also
         * where the key file is lost. Returns the vault, unlocked.
         */
        static async resetPassword(t, r, n, c) {
          if (typeof t.write != "function")
            throw new i("read-only");
          const { config: d, name: f } = await Bt(t), w = Ht(r, c), m = { encRaw: w.slice(0, 32), macRaw: w.slice(32) };
          w.fill(0);
          try {
            if (!await Ut(d, m))
              throw new i("invalid-recovery-key", "it is not this vault's");
            const k = await t.read(f).catch((I) => {
              if (I?.code === "not-found")
                return null;
              throw I;
            }), N = new ye(t, d, null);
            N.masterkeyName = f, await N.replaceKeyFile(f, k, await it(m, n), m, n);
          } finally {
            m.encRaw.fill(0), m.macRaw.fill(0);
          }
          const x = await ye.open(t);
          return await x.unlock(n), x;
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
            const r = await this.siv.encrypt(l.encode(t), []), n = E(new Uint8Array(await o.digest("SHA-1", r)));
            this.dirPaths.set(t, T("d", n.slice(0, 2), n.slice(2)));
          }
          return this.dirPaths.get(t);
        }
        /**
         * The name in an entry's file name, found as cryptofs finds it (C9rDecryptor):
         * the first run of base64 in it that decrypts; where one does not, the run is
         * narrowed at its first and last '-' or '_' and tried again. {name, extracted}
         * or null.
         */
        async extractName(t, r, n = 0, c = t.length) {
          const d = new RegExp(Da.source, "g");
          d.lastIndex = n;
          const f = d.exec(t.slice(0, c));
          if (f === null)
            return null;
          const w = f[0];
          try {
            return { name: u.decode(await this.siv.decrypt(h(w), [l.encode(r)])), extracted: w };
          } catch {
            const m = w.search(/[-_]/);
            if (m === -1)
              return null;
            const x = Math.max(w.lastIndexOf("-"), w.lastIndexOf("_")), k = await this.extractName(t, r, f.index + Math.max(1, m), c);
            return k !== null ? k : this.extractName(t, r, n, f.index + w.length - Math.max(1, w.length - x));
          }
        }
        async decryptName(t, r) {
          const n = t.endsWith(".c9r") ? t.slice(0, -4) : t;
          try {
            return u.decode(await this.siv.decrypt(h(n), [l.encode(r)]));
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
        async list(t) {
          const r = await this.dirPath(t), n = await this.storage.list(r), c = await Promise.all(n.map((w) => this.describe(r, w, t))), d = c.filter((w) => w !== null && !w.conflict);
          for (const w of c.filter((m) => m?.conflict)) {
            const m = await this.resolveConflict(r, t, w);
            m !== null && d.push(m);
          }
          const f = await Promise.all(d.map(async (w) => w.type !== "dir" || await this.storage.stat?.(await this.dirPath(w.dirId)).then((m) => m !== null, () => !0) !== !1));
          return d.filter((w, m) => f[m]).sort((w, m) => (m.type === "dir") - (w.type === "dir") || w.name.localeCompare(m.name));
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
        async resolveConflict(t, r, n) {
          if (typeof this.storage.move != "function")
            return null;
          const c = n.found.extracted + ".c9r", d = T(t, c);
          try {
            try {
              return await this.storage.move(n.path, d), this.describe(t, { ...n.entry, name: c }, r);
            } catch (w) {
              if (w?.code !== "exists")
                throw w;
            }
            const f = await this.storage.stat(d);
            if (n.entry.isDir && f?.isDir) {
              const w = await this.compareTypeFile(n.path, d, "dir.c9r", Ft, !0);
              if (w.both)
                return w.same ? this.removeDuplicate(n.path) : this.renameConflict(t, r, n);
              const m = await this.compareTypeFile(n.path, d, "symlink.c9r", La, !1);
              if (m.both)
                return m.same ? this.removeDuplicate(n.path) : this.renameConflict(t, r, n);
              if (!((w.conflicting || m.conflicting) && (w.canonical || m.canonical)))
                return null;
            }
            return this.renameConflict(t, r, n);
          } catch {
            return null;
          }
        }
        async removeDuplicate(t) {
          return await this.storage.remove(t), null;
        }
        /** The first bytes of a folder entry's type file in both entries, compared. */
        async compareTypeFile(t, r, n, c, d) {
          const f = (I) => this.storage.read(T(I, n)).then((M) => M.subarray(0, c), (M) => {
            if (M?.code === "not-found")
              return new Uint8Array(0);
            throw M;
          }), [w, m] = await Promise.all([f(t), f(r)]), x = d ? c : 1, k = w.length >= x, N = m.length >= x;
          return { conflicting: k, canonical: N, both: k && N, same: k && N && S(w, m) };
        }
        /** Renames a conflict's copy as cryptofs does (renameConflictingFile). */
        async renameConflict(t, r, n) {
          const c = n.found.name, d = c.lastIndexOf("."), f = d > 0 ? c.slice(d) : "", w = d > 0 ? c.slice(0, d) : c, m = n.entry.name, x = m.indexOf(n.found.extracted) + n.found.extracted.length, k = m.slice(x, m.length - 4), N = this.config.payload.shorteningThreshold ?? 220, M = Math.trunc((N - 4) / 4) * 3 - 16 - f.length, F = k.slice(0, Math.min(k.length, Math.trunc(M / 2))), O = w.slice(0, Math.max(0, Math.min(w.length, M - Math.max(4, F.length)))), V = [O + F + f];
          for (let D = 1; D < 10; D++)
            V.push(O + " (" + D + ")" + f);
          for (const D of V) {
            const z = p(await this.siv.encrypt(l.encode(D), [l.encode(r)]), !0) + ".c9r", se = T(t, z);
            if (await this.storage.stat(se) === null)
              return await this.storage.move(n.path, se), this.describe(t, { ...n.entry, name: z }, r);
          }
          return null;
        }
        async describe(t, r, n) {
          const c = T(t, r.name), d = await this.describeEntry(t, r, n, c);
          return d !== null && r.mtime && !d.mtime && (d.mtime = r.mtime), d;
        }
        async describeEntry(t, r, n, c) {
          try {
            if (r.name.endsWith(".c9s") && r.isDir) {
              const w = await this.decryptName(u.decode(await this.storage.read(T(c, "name.c9s"))).trim(), n), m = await this.storage.list(c), x = m.find((k) => k.name === "contents.c9r");
              return x ? { name: w, type: "file", size: me(this.scheme, x.size), path: T(c, "contents.c9r"), mtime: x.mtime } : this.describeNode(w, c, m.map((k) => k.name));
            }
            if (!r.name.endsWith(".c9r"))
              return null;
            const d = await this.extractName(r.name.slice(0, -4), n);
            if (d === null)
              return null;
            if (r.name !== d.extracted + ".c9r")
              return r.name.startsWith(".") ? null : { conflict: !0, entry: r, found: d, path: c };
            const f = d.name;
            return r.isDir ? this.describeNode(f, c, null) : { name: f, type: "file", size: me(this.scheme, r.size), path: c };
          } catch (d) {
            return { name: r.name, type: "broken", error: d.message, path: c };
          }
        }
        // A folder <name>.c9r (or .c9s): a directory (dir.c9r, its ID) or a link (symlink.c9r).
        async describeNode(t, r, n) {
          const c = async (w) => {
            if (n !== null && !n.includes(w))
              return null;
            try {
              return await this.storage.read(T(r, w));
            } catch (m) {
              if (m instanceof i && m.code === "not-found")
                return null;
              throw m;
            }
          }, d = await c("dir.c9r");
          if (d !== null)
            return { name: t, type: "dir", dirId: u.decode(d).trim(), path: r };
          const f = await c("symlink.c9r");
          if (f !== null) {
            const w = u.decode(await this.decryptContents(f));
            return { name: t, type: "link", target: w, path: r };
          }
          throw new i("corrupt", "neither a directory nor a link");
        }
        /**
         * A file's decrypted contents: onProgress(done, total) after each chunk,
         * onDownload(done, total) while the storage reads it (if it reports that).
         */
        async readFile(t, r, n) {
          return this.decryptContents(await this.storage.read(t.path, n), r);
        }
        async decryptContents(t, r) {
          this.requireKeys();
          const n = ne[this.scheme];
          if (t.length === 0)
            return new Uint8Array(0);
          if (t.length < n.header)
            throw new i("corrupt", "file header too short");
          const c = t.subarray(0, n.header), d = c.subarray(0, n.nonce), f = await this.decryptHeader(c, d), w = t.subarray(n.header), m = _ + n.overhead, x = new Uint8Array(me(this.scheme, t.length));
          for (let k = 0, N = 0; N < w.length; k++, N += m) {
            const I = w.subarray(N, Math.min(N + m, w.length)), M = await this.decryptChunk(I, k, d, f);
            x.set(M, k * _), r && r(Math.min(N + m, w.length), w.length);
          }
          return x;
        }
        async decryptHeader(t, r) {
          let n;
          if (this.scheme === "SIV_GCM")
            try {
              n = new Uint8Array(await o.decrypt({ name: "AES-GCM", iv: r }, this.keys.gcm, t.subarray(12)));
            } catch {
              throw new i("corrupt", "file header does not authenticate");
            }
          else {
            const w = t.subarray(16, 56);
            if (!await o.verify("HMAC", this.keys.mac, t.subarray(56, 88), t.subarray(0, 56)))
              throw new i("corrupt", "file header does not authenticate");
            n = new Uint8Array(await o.decrypt({ name: "AES-CTR", counter: r, length: 128 }, this.keys.ctr, w));
          }
          const c = n.subarray(8, 40), d = this.scheme === "SIV_GCM" ? "AES-GCM" : "AES-CTR", f = await o.importKey("raw", c, d, !1, ["decrypt"]);
          return n.fill(0), f;
        }
        async decryptChunk(t, r, n, c) {
          try {
            if (this.scheme === "SIV_GCM") {
              const m = t.subarray(0, 12);
              return new Uint8Array(await o.decrypt(
                { name: "AES-GCM", iv: m, additionalData: A(C(r), n) },
                c,
                t.subarray(12)
              ));
            }
            const d = t.subarray(0, 16), f = t.subarray(16, t.length - 32), w = t.subarray(t.length - 32);
            if (!await o.verify("HMAC", this.keys.mac, w, A(n, C(r), d, f)))
              throw new Error("mac");
            return new Uint8Array(await o.decrypt({ name: "AES-CTR", counter: d, length: 128 }, c, f));
          } catch {
            throw new i("corrupt", "chunk " + r + " does not authenticate");
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
        async entryPath(t, r) {
          const n = await this.dirPath(t), c = p(await this.siv.encrypt(l.encode(r), [l.encode(t)]), !0) + ".c9r", d = this.config.payload.shorteningThreshold ?? 220;
          if (c.length > d) {
            const f = p(new Uint8Array(await o.digest("SHA-1", l.encode(c))), !0) + ".c9s";
            return { folder: n, path: T(n, f), long: !0, fullName: c };
          }
          return { folder: n, path: T(n, c), long: !1, fullName: c };
        }
        /** What is stored at an entry's place: null, 'file', 'dir', 'link' or 'unknown'. */
        async existing(t) {
          const r = await this.storage.stat(t.path);
          if (!r)
            return null;
          if (!r.isDir)
            return "file";
          const n = (await this.storage.list(t.path)).map((c) => c.name);
          return n.includes("contents.c9r") ? "file" : n.includes("dir.c9r") ? "dir" : n.includes("symlink.c9r") ? "link" : "unknown";
        }
        /**
         * The start of a file's encryption: a new content key and the header that
         * holds it; encryptChunk(number, plain) encrypts the file's chunks in turn.
         */
        async startEncryption() {
          this.requireKeys();
          const t = ne[this.scheme], r = this.scheme === "SIV_GCM", n = xe(t.nonce), c = xe(32), d = A(new Uint8Array(8).fill(255), c);
          let f;
          if (r)
            f = A(n, new Uint8Array(await o.encrypt({ name: "AES-GCM", iv: n }, this.keys.gcm, d)));
          else {
            const x = new Uint8Array(await o.encrypt({ name: "AES-CTR", counter: n, length: 128 }, this.keys.ctr, d)), k = new Uint8Array(await o.sign("HMAC", this.keys.mac, A(n, x)));
            f = A(n, x, k);
          }
          const w = await o.importKey("raw", c, r ? "AES-GCM" : "AES-CTR", !1, ["encrypt"]);
          d.fill(0), c.fill(0);
          const m = this.keys;
          return {
            header: f,
            async encryptChunk(x, k) {
              const N = xe(t.nonce);
              if (r)
                return A(N, new Uint8Array(await o.encrypt(
                  { name: "AES-GCM", iv: N, additionalData: A(C(x), n) },
                  w,
                  k
                )));
              const I = new Uint8Array(await o.encrypt({ name: "AES-CTR", counter: N, length: 128 }, w, k)), M = new Uint8Array(await o.sign("HMAC", m.mac, A(n, C(x), N, I)));
              return A(N, I, M);
            }
          };
        }
        /** The size of a file of this many bytes, encrypted. */
        encryptedSize(t) {
          const r = ne[this.scheme];
          return r.header + t + Math.ceil(t / _) * r.overhead;
        }
        /** A file's contents encrypted as Cryptomator does: a new content key, header, chunks. */
        async encryptContents(t, r) {
          const n = await this.startEncryption(), c = Math.ceil(t.length / _), d = new Uint8Array(this.encryptedSize(t.length));
          d.set(n.header);
          for (let f = 0, w = n.header.length; f < c; f++) {
            const m = await n.encryptChunk(f, t.subarray(f * _, Math.min((f + 1) * _, t.length)));
            d.set(m, w), w += m.length, r && r(f + 1, c);
          }
          return d;
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
        async *encryptedParts(t, r, n) {
          const c = await this.startEncryption(), d = 32 * _;
          let f = [c.header], w = c.header.length;
          for (let m = 0, x = 0; m < t.size; m += d) {
            const k = await t.read(m, Math.min(m + d, t.size));
            for (let N = 0; N < k.length; N += _, x++) {
              const I = await c.encryptChunk(x, k.subarray(N, Math.min(N + _, k.length)));
              f.push(I), w += I.length, w >= r && (yield A(...f), f = [], w = 0);
            }
            n?.(Math.min(m + d, t.size), t.size);
          }
          w > 0 && (yield A(...f));
        }
        /**
         * Compares a stored file with its source, in ranges: each chunk decrypted and
         * authenticated, its bytes equal to the source's.
         */
        async checkStoredStream(t, r, n) {
          const c = ne[this.scheme], d = this.encryptedSize(r.size), f = await this.storage.stat(t);
          if (!f || f.size !== d)
            throw new i("corrupt", "the stored file has " + (f?.size ?? "no") + " bytes, not " + d);
          const w = await this.storage.readRange(t, 0, c.header), m = w.subarray(0, c.nonce), x = await this.decryptHeader(w, m), k = _ + c.overhead, N = Math.ceil(r.size / _), I = 32;
          for (let M = 0; M < N; M += I) {
            const F = Math.min(M + I, N), O = c.header + M * k, V = await this.storage.readRange(t, O, Math.min(c.header + F * k, d)), D = await r.read(M * _, Math.min(F * _, r.size));
            for (let z = M; z < F; z++) {
              const se = (z - M) * k, le = await this.decryptChunk(V.subarray(se, Math.min(se + k, V.length)), z, m, x);
              if (!S(le, D.subarray((z - M) * _, (z - M) * _ + le.length)))
                throw new i("corrupt", "the stored file differs from the one written (chunk " + z + ")");
            }
            n?.(Math.min(F * _, r.size), r.size);
          }
        }
        /**
         * writeFile for a source read in pieces (see above). options: replace,
         * onProgress(phase, done, total) with the phases 'upload' and 'verify',
         * partSize (bytes per part handed to the storage).
         */
        async writeFileStream(t, r, n, c = {}) {
          this.requireWritable();
          const { replace: d = !1, onProgress: f, partSize: w = 10 * 1024 * 1024 } = c, m = (D) => (z, se) => f?.(D, z, se), x = Ae(r), k = await this.entryPath(t, x), N = await this.existing(k);
          if (N !== null && (N !== "file" || !d))
            throw new i(N === "file" ? "exists" : "exists-other", x);
          const I = this.encryptedSize(n.size), M = k.long ? T(k.path, "contents.c9r") : k.path, F = this.stagingPath(), O = k.long && N === null, V = O ? T(F, "contents.c9r") : F;
          try {
            O && (await this.storage.mkdir(F), await this.storage.write(T(F, "name.c9s"), l.encode(k.fullName), { create: !0 })), await this.storage.writeParts(V, I, this.encryptedParts(n, w, m("upload")), { create: !0 }), await this.checkStoredStream(V, n, m("verify")), O ? await this.storage.move(F, k.path) : await this.storage.move(F, M, { overwrite: N !== null });
          } catch (D) {
            throw await this.storage.remove(F).catch(() => {
            }), D;
          }
          return { name: x, path: M, size: n.size };
        }
        /**
         * A file's decrypted contents in pieces, for a file too large to hold:
         * onPiece(bytes) for each range of chunks in turn (awaited), each chunk
         * authenticated; onProgress(done, total).
         */
        async readFileStream(t, r, n) {
          for await (const c of this.decryptedPieces(t, n))
            await r(c);
        }
        /**
         * A file's decrypted contents in pieces of up to 64 chunks (2 MiB), in order,
         * each read in one range and checked: what readFileStream hands on, for a
         * reader that pulls (e.g. an upload in parts). Nothing for an empty file.
         */
        async *decryptedPieces(t, r) {
          this.requireKeys();
          const n = ne[this.scheme], c = await this.storage.stat(t.path);
          if (!c || c.size === 0)
            return;
          if (c.size < n.header)
            throw new i("corrupt", "file header too short");
          const d = await this.storage.readRange(t.path, 0, n.header), f = d.subarray(0, n.nonce), w = await this.decryptHeader(d, f), m = _ + n.overhead, x = me(this.scheme, c.size), k = Math.ceil((c.size - n.header) / m), N = 64;
          for (let I = 0; I < k; I += N) {
            const M = Math.min(I + N, k), F = await this.storage.readRange(t.path, n.header + I * m, Math.min(n.header + M * m, c.size)), O = [];
            for (let V = I; V < M; V++) {
              const D = (V - I) * m;
              O.push(await this.decryptChunk(F.subarray(D, Math.min(D + m, F.length)), V, f, w));
            }
            yield A(...O), r?.(Math.min(M * _, x), x);
          }
        }
        /**
         * A staging name in the vault's top folder, outside d/: Cryptomator passes it
         * by, and its health checks (which look at d/) do not report one a browser
         * left behind. Moving from there is still one rename on the server.
         */
        stagingPath() {
          return rt + ze() + ".tmp";
        }
        /**
         * Removes the staging files and folders that writes which never finished (a
         * browser closed midway) left in the vault's top folder, once they are older
         * than olderThan (milliseconds; LEFTOVER_AGE), so that a write still going on
         * elsewhere is left alone. Nothing for a vault that cannot be written. Returns
         * the names removed.
         */
        async removeLeftovers({ olderThan: t = Ua, now: r = Date.now() } = {}) {
          if (this.requireKeys(), typeof this.storage.write != "function")
            return [];
          const n = [];
          for (const c of await this.storage.list(""))
            c.name.startsWith(rt) && c.name.endsWith(".tmp") && c.mtime && r - c.mtime.getTime() >= t && (await this.storage.remove(c.name), n.push(c.name));
          return n;
        }
        /**
         * Puts an entry of several files (name -> bytes) together in a staging folder,
         * checks it (check(stagingFolder), if given) and moves it into
         * place in one step; refused if the place is taken meanwhile. The staging
         * folder goes on any failure.
         */
        async stageAndMove(t, r, n) {
          const c = this.stagingPath();
          await this.storage.mkdir(c);
          try {
            for (const [d, f] of Object.entries(r))
              await this.storage.write(T(c, d), f, { create: !0 });
            n && await n(c), await this.storage.move(c, t.path);
          } catch (d) {
            throw await this.storage.remove(c).catch(() => {
            }), d;
          }
        }
        /** Reads a stored file back and compares it with what was written. */
        async checkStored(t, r, n) {
          const c = await this.storage.read(t, n);
          let d;
          try {
            d = await this.decryptContents(c);
          } catch (f) {
            throw new i("corrupt", "the stored file does not decrypt: " + f.message);
          }
          if (!S(await Ve(d), r))
            throw new i("corrupt", "the stored file differs from the one written");
        }
        /**
         * Writes a file into a directory. options.replace allows replacing a file of
         * that name (never a folder); onProgress(phase, done, total) with the phases
         * 'encrypt', 'upload' and 'verify'. Returns {name, path, size}.
         */
        async writeFile(t, r, n, c = {}) {
          this.requireWritable();
          const { replace: d = !1, onProgress: f } = c, w = (O) => (V, D) => f?.(O, V, D), m = Ae(r), x = await this.entryPath(t, m), k = await this.existing(x);
          if (k !== null && (k !== "file" || !d))
            throw new i(k === "file" ? "exists" : "exists-other", m);
          const N = await Ve(n), I = await this.encryptContents(n, w("encrypt"));
          if (!S(await Ve(await this.decryptContents(I)), N))
            throw new i("corrupt", "the encryption does not read back");
          const M = x.long ? T(x.path, "contents.c9r") : x.path;
          if (x.long && k === null)
            return await this.stageAndMove(
              x,
              { "name.c9s": l.encode(x.fullName), "contents.c9r": I },
              (O) => this.checkStored(T(O, "contents.c9r"), N, w("verify"))
            ), { name: m, path: M, size: n.length };
          const F = this.stagingPath();
          try {
            await this.storage.write(F, I, { create: !0, onProgress: w("upload") }), await this.checkStored(F, N, w("verify")), await this.storage.move(F, M, { overwrite: k !== null });
          } catch (O) {
            throw await this.storage.remove(F).catch(() => {
            }), O;
          }
          return { name: m, path: M, size: n.length };
        }
        /** Creates a folder in a directory. Returns {name, dirId}. */
        async createDirectory(t, r) {
          this.requireWritable();
          const n = Ae(r), c = await this.entryPath(t, n);
          if (await this.existing(c) !== null)
            throw new i("exists-other", n);
          const d = ze(), f = await this.dirPath(d);
          await this.storage.mkdir(f.split("/").slice(0, 2).join("/"), { existsOk: !0 }), await this.storage.mkdir(f);
          try {
            await this.storage.write(T(f, "dirid.c9r"), await this.encryptContents(l.encode(d)), { create: !0 });
            const m = { "dir.c9r": l.encode(d) };
            c.long && (m["name.c9s"] = l.encode(c.fullName)), await this.stageAndMove(c, m);
          } catch (m) {
            throw await this.storage.remove(f).catch(() => {
            }), m;
          }
          const w = (await this.list(t)).find((m) => m.type === "dir" && m.dirId === d);
          if (!w || w.name !== n)
            throw new i("corrupt", "the new folder does not read back");
          return { name: n, dirId: d };
        }
        /**
         * The folder of this name in a directory: the one there (an upload of a folder
         * merges into it), or a new one. Refused where a file or link has the name.
         * Returns {name, dirId, created}.
         */
        async ensureDirectory(t, r) {
          this.requireWritable();
          const n = await this.findEntry(t, r);
          if (n === null)
            return { ...await this.createDirectory(t, r), created: !0 };
          if (n.kind !== "dir")
            throw new i("exists-other", n.name);
          return { name: n.name, dirId: await this.entryDirId(n), created: !1 };
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
        async findEntry(t, r) {
          const n = Ae(r), c = await this.entryPath(t, n), d = await this.existing(c);
          if (d === null)
            return null;
          if (d === "unknown")
            throw new i("corrupt", "the entry of " + n + " is neither file, folder nor link");
          return { ...c, name: n, kind: d };
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
        async moveEntry(t, r, n, c, d = {}) {
          this.requireWritable();
          const f = await this.findEntry(t, r);
          if (f === null)
            throw new i("not-found", String(r));
          const w = Ae(c ?? f.name);
          if (t === n && w === f.name)
            return { name: w };
          if (f.kind === "dir" && t !== n) {
            const x = d.ancestors;
            if (!Array.isArray(x) || x[x.length - 1] !== n)
              throw new i("invalid-move", "the target's ancestors are not known");
            const k = await this.entryDirId(f);
            if (x.includes(k))
              throw new i("invalid-move", f.name);
          }
          const m = await this.entryPath(n, w);
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
        async rebuildEntry(t, r) {
          const n = this.stagingPath(), c = { file: "contents.c9r", dir: "dir.c9r", link: "symlink.c9r" }[t.kind], d = t.long || t.kind !== "file" ? T(t.path, c) : t.path, f = r.long || t.kind !== "file" ? T(n, c) : n;
          try {
            if (f !== n && await this.storage.mkdir(n), await this.storage.copy(d, f), r.long && await this.storage.write(T(n, "name.c9s"), l.encode(r.fullName), { create: !0 }), t.kind !== "dir")
              await this.decryptContents(await this.storage.read(f));
            else if (u.decode(await this.storage.read(f)).trim() !== await this.entryDirId(t))
              throw new i("corrupt", "the copied folder entry differs");
            await this.storage.move(n, r.path);
          } catch (w) {
            throw await this.storage.remove(n).catch(() => {
            }), w;
          }
        }
        /** The IDs of a folder and of every folder below it. */
        async subtree(t) {
          const r = [t];
          for (const n of await this.list(t))
            if (n.type === "dir")
              r.push(...await this.subtree(n.dirId));
            else if (n.type === "broken" && n.path.endsWith(".c9r")) {
              const c = await this.storage.read(T(n.path, "dir.c9r")).then((d) => u.decode(d).trim(), () => null);
              c !== null && r.push(...await this.subtree(c));
            }
          return r;
        }
        /**
         * Deletes an entry: a file or link, or a folder with everything in it (its
         * entry first, so that all of it disappears at once; then the directories of
         * the folder and of every folder below it). Returns {name, folders}.
         */
        async removeEntry(t, r) {
          this.requireWritable();
          const n = await this.findEntry(t, r);
          if (n === null)
            throw new i("not-found", String(r));
          if (n.kind !== "dir")
            return await this.storage.remove(n.path), { name: n.name, folders: 0 };
          const c = await this.subtree(await this.entryDirId(n));
          await this.storage.remove(n.path);
          for (const d of c)
            await this.storage.remove(await this.dirPath(d));
          return { name: n.name, folders: c.length };
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
          const r = [], n = (k, N, I, M = {}) => r.push({ kind: k, severity: N, path: I, fixable: !1, ...M }), c = async (k) => {
            try {
              return await this.storage.list(k);
            } catch (N) {
              if (N?.code === "not-found")
                return [];
              throw N;
            }
          }, d = /* @__PURE__ */ new Map([["", null]]), f = /* @__PURE__ */ new Map(), w = [];
          for (const k of (await c("d")).filter((N) => N.isDir))
            for (const N of (await c("d/" + k.name)).filter((I) => I.isDir)) {
              const I = T("d", k.name, N.name), M = await c(I);
              f.set(I, M.some((F) => !F.isDir && F.name === "dirid.c9r"));
              for (const F of M)
                F.isDir ? w.push(T(I, F.name)) : F.name === "dir.c9r" && n("LooseDirFile", "INFO", T(I, F.name), { fixable: !0 });
            }
          let m = 0;
          await _a(w, 8, async (k) => {
            const N = k.split("/").pop(), I = N.endsWith(".c9r"), M = N.endsWith(".c9s"), F = await c(k), O = (D) => F.find((z) => !z.isDir && z.name === D), V = O("dir.c9r");
            if (V) {
              const D = T(k, "dir.c9r");
              if (!I && !M)
                n("LooseDirFile", "INFO", D, { fixable: !0 });
              else if (V.size > Ft)
                n("ObeseDirFile", "CRITICAL", D);
              else if (V.size === 0)
                n("EmptyDirFile", "CRITICAL", D, { fixable: !0 });
              else {
                const z = u.decode(await this.storage.read(D));
                d.has(z) ? n("DirIdCollision", "CRITICAL", D, { dirId: z, other: d.get(z) }) : d.set(z, D);
              }
            }
            if (I || M) {
              const D = [V && "DIRECTORY", O("symlink.c9r") && "SYMLINK", M && O("contents.c9r") && "FILE"].filter(Boolean);
              D.length === 0 ? n("UnknownType", "CRITICAL", k, { fixable: F.length === 0 }) : D.length > 1 && n("AmbiguousType", "CRITICAL", k, { types: D });
            }
            M && await this.checkShortened(k, O("name.c9s"), n), t?.(++m, w.length);
          });
          for (const [k, N] of d) {
            const I = await this.dirPath(k);
            f.has(I) ? (f.get(I) || n("MissingDirIdBackup", "INFO", I, { dirId: k, fixable: !0 }), f.delete(I)) : n("MissingContentDir", "WARN", N ?? I, { dirId: k, fixable: !0 });
          }
          for (const k of f.keys())
            n("OrphanContentDir", "WARN", k, { fixable: !0 });
          const x = { CRITICAL: 0, WARN: 1, INFO: 2 };
          return r.sort((k, N) => x[k.severity] - x[N.severity] || k.kind.localeCompare(N.kind) || k.path.localeCompare(N.path));
        }
        /** cryptofs' ShortenedNamesCheck for one .c9s directory. */
        async checkShortened(t, r, n) {
          const c = T(t, "name.c9s");
          if (!r) {
            n("MissingLongName", "CRITICAL", t);
            return;
          }
          if (r.size > Oa) {
            n("ObeseNameFile", "CRITICAL", c);
            return;
          }
          const d = u.decode(await this.storage.read(c)), f = d.indexOf(".c9r");
          if (f === -1 || !/^[A-Za-z0-9_-]*={0,2}$/.test(d.slice(0, f)) || d.slice(0, f).length % 4 !== 0) {
            n("NotDecodableLongName", "CRITICAL", c);
            return;
          }
          if (d.length > f + 4) {
            n("TrailingBytesInNameFile", "WARN", c, { longName: d, fixable: !0 });
            return;
          }
          const w = p(new Uint8Array(await o.digest("SHA-1", l.encode(d))), !0) + ".c9s";
          t.split("/").pop() !== w && n("LongShortNamesMismatch", "WARN", t, { expected: w, fixable: !0 });
        }
        /** Applies the repair cryptofs offers for a finding of checkHealth. */
        async repair(t) {
          this.requireWritable();
          const r = (n) => n.split("/").slice(0, -1).join("/");
          switch (t.kind) {
            case "LooseDirFile":
              await this.storage.remove(t.path);
              return;
            case "EmptyDirFile": {
              await this.storage.remove(t.path), (await this.storage.list(r(t.path))).length === 0 && await this.storage.remove(r(t.path));
              return;
            }
            case "MissingContentDir":
            case "MissingDirIdBackup": {
              const n = await this.dirPath(t.dirId);
              await this.storage.mkdir(r(n), { existsOk: !0 }), await this.storage.mkdir(n, { existsOk: !0 }), await this.storage.write(T(n, "dirid.c9r"), await this.encryptContents(l.encode(t.dirId)), { create: !0 });
              return;
            }
            case "LongShortNamesMismatch":
              await this.storage.move(t.path, T(r(t.path), t.expected));
              return;
            case "TrailingBytesInNameFile":
              await this.storage.write(t.path, l.encode(t.longName.slice(0, t.longName.indexOf(".c9r") + 4)));
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
          const r = await this.dirPath(""), n = T(r, await this.encryptedName(Dt, "")), c = T(n, "dir.c9r");
          if (await this.storage.stat(c)) {
            if (u.decode(await this.storage.read(c)) !== Ue)
              throw new i("exists-other", "/" + Dt);
          } else
            await this.storage.mkdir(n, { existsOk: !0 }), await this.storage.write(c, l.encode(Ue), { create: !0 });
          const d = await this.ensureContentDir(Ue);
          if (d === t)
            return;
          const f = T(d, await this.encryptedName(t.split("/").slice(1).join(""), Ue)), w = T(f, "dir.c9r");
          let m;
          await this.storage.stat(w) ? m = u.decode(await this.storage.read(w)) : (m = ze(), await this.storage.mkdir(f, { existsOk: !0 }), await this.storage.write(w, l.encode(m), { create: !0 }));
          const x = await this.ensureContentDir(m);
          let k = null;
          try {
            k = u.decode(await this.decryptContents(await this.storage.read(T(t, "dirid.c9r"))));
          } catch {
          }
          const N = Math.floor(Math.random() * 65536).toString(32), I = { file: 0, directory: 0, symlink: 0 }, M = "_withVeryLongName".repeat((((_t - 4) / 4 | 0) * 3 - 16) % 17 + 1), F = await this.storage.list(t);
          for (const O of F) {
            if (O.name.length < Pa || !(O.name.endsWith(".c9r") || O.name.endsWith(".c9s")))
              continue;
            const V = O.name.endsWith(".c9s"), D = T(t, O.name);
            let z = null;
            if (k !== null)
              try {
                const le = V ? u.decode(await this.storage.read(T(D, "name.c9s"))) : O.name;
                z = await this.decryptName(le, k);
              } catch {
              }
            if (z === null) {
              const le = O.isDir ? await this.storage.list(D) : [], Kt = le.some((st) => st.name === "dir.c9r") ? "directory" : le.some((st) => st.name === "symlink.c9r") ? "symlink" : "file";
              z = Kt + ++I[Kt] + "_" + N + (V ? M : "");
            }
            const se = await this.encryptedName(z, m);
            if (V) {
              const le = p(new Uint8Array(await o.digest("SHA-1", l.encode(se))), !0) + ".c9s";
              await this.storage.move(D, T(x, le)), await this.storage.write(T(x, le, "name.c9s"), l.encode(se));
            } else
              await this.storage.move(D, T(x, se));
          }
          await this.storage.remove(T(t, "dirid.c9r"));
          for (const O of await this.storage.list(t))
            await this.storage.move(T(t, O.name), T(x, O.name));
          await this.storage.remove(t);
        }
        /** An entry's encrypted name (.c9r) in a directory, not shortened. */
        async encryptedName(t, r) {
          return p(await this.siv.encrypt(l.encode(t), [l.encode(r)]), !0) + ".c9r";
        }
        /** A directory's folder in d/, made with its ID's backup where missing. */
        async ensureContentDir(t) {
          const r = await this.dirPath(t);
          return await this.storage.mkdir(r.split("/").slice(0, 2).join("/"), { existsOk: !0 }), await this.storage.mkdir(r, { existsOk: !0 }), await this.storage.stat(T(r, "dirid.c9r")) || await this.storage.write(T(r, "dirid.c9r"), await this.encryptContents(l.encode(t)), { create: !0 }), r;
        }
      }
      return { Vault: ye, VaultError: i, cleartextSize: me, checkName: Ae, scrypt: Y, Siv: J, Cmac: ae, base32Encode: E, base64UrlEncode: p, base64Decode: h, encodeRecoveryKey: Vt, decodeRecoveryKey: Ht, VAULT_CONFIG: Be, STAGING_PREFIX: rt };
    });
  })(We)), We.exports;
}
var rn = nn();
const ua = /* @__PURE__ */ ja(rn), on = "cryptomator_vaults";
function s(e, a) {
  return qa(on, e, a, void 0, { escape: !1 });
}
const sn = 100 * 1024 * 1024, cn = 5 * 1024 * 1024, ha = 1024 * 1024 * 1024, pt = /* @__PURE__ */ new Set();
function y(e, a, o) {
  const l = document.createElement(e);
  for (const [u, i] of Object.entries(a || {}))
    i == null || i === !1 || (u === "class" ? l.className = i : u.startsWith("on") ? l.addEventListener(u.slice(2), i) : l.setAttribute(u, i === !0 ? "" : i));
  for (const u of [].concat(o ?? []))
    u != null && u !== !1 && l.append(u instanceof Node ? u : document.createTextNode(String(u)));
  return l;
}
function ft(e) {
  if (window.OC?.Util?.humanFileSize)
    return window.OC.Util.humanFileSize(e);
  const a = ["B", "KB", "MB", "GB", "TB"];
  let o = e, l = 0;
  for (; o >= 1024 && l < a.length - 1; )
    o /= 1024, l++;
  return (l === 0 ? o : o.toFixed(1)) + " " + a[l];
}
function Se(e, a) {
  const o = URL.createObjectURL(new Blob([e], { type: a }));
  return pt.add(o), o;
}
function ln() {
  for (const e of pt)
    URL.revokeObjectURL(e);
  pt.clear(), G();
}
function pa(e, a) {
  const o = y("a", { href: Se(a, "application/octet-stream"), download: e });
  document.body.append(o), o.click(), o.remove();
}
let fe = null;
function G() {
  if (fe) {
    const { dialog: e, onClose: a } = fe;
    fe = null, e.remove(), a?.();
  }
}
function ue(e, a, o) {
  G();
  const l = y("div", {
    class: "cryptomator-dialog",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": e,
    onkeydown: (u) => {
      u.key === "Escape" && G();
    },
    onclick: (u) => {
      u.target === l && G();
    }
  }, y("div", { class: "cryptomator-dialog__panel" }, a));
  return fe = { dialog: l, onClose: o }, document.body.append(l), l;
}
function L(e, a) {
  return y("p", { class: "cryptomator-notice" + (a ? " cryptomator-notice--" + a : ""), role: a === "error" ? "alert" : null }, e);
}
function dn(e, a, o) {
  return new Promise((l) => {
    let u = !1;
    const i = y("input", {
      type: "text",
      name: "username",
      autocomplete: "username",
      readonly: !0,
      class: "cryptomator-unlock__account",
      "aria-label": s("Vault")
    });
    i.value = o;
    const h = y("input", { type: "password", name: "password", autocomplete: "current-password", required: !0, "aria-label": s("Password") }), p = y("div", { "aria-live": "polite" }), v = y("button", { type: "submit", class: "primary" }, s("Unlock"));
    ue(e, [
      y("h2", {}, s("Unlock {vault}", { vault: e })),
      L(s("The password and the vault's keys stay in this browser tab: the server only sends the encrypted files.")),
      y("form", {
        class: "cryptomator-unlock",
        name: "cryptomator-unlock",
        method: "post",
        action: "#",
        autocomplete: "on",
        onsubmit: async (b) => {
          b.preventDefault(), v.disabled = !0, p.replaceChildren(L(s("Unlocking …"))), await new Promise((E) => setTimeout(E, 30));
          try {
            await a(h.value), h.value = "", u = !0, G(), l(!0);
          } catch (E) {
            v.disabled = !1, p.replaceChildren(L(E.message, "error")), h.select();
          }
        }
      }, [
        y("label", {}, [s("Vault"), i]),
        y("label", {}, [s("Password"), h]),
        v,
        y("button", { type: "button", onclick: G }, s("Cancel"))
      ]),
      p
    ], () => {
      h.value = "", u || l(!1);
    }), h.focus();
  });
}
const un = ["png", "jpg", "jpeg", "gif", "webp", "avif", "bmp", "svg"], jt = { mp4: "video/mp4", m4v: "video/mp4", webm: "video/webm", mov: "video/quicktime", ogv: "video/ogg" }, qt = { mp3: "audio/mpeg", m4a: "audio/mp4", ogg: "audio/ogg", oga: "audio/ogg", opus: "audio/ogg", wav: "audio/wav", flac: "audio/flac" }, hn = [
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
function pn(e) {
  return fa(e).kind !== "none";
}
function fa(e) {
  const a = (/\.([^.]+)$/.exec(e)?.[1] ?? "").toLowerCase();
  return un.includes(a) ? { kind: "image", type: a === "svg" ? "image/svg+xml" : "image/" + (a === "jpg" ? "jpeg" : a) } : a === "pdf" ? { kind: "pdf", type: "application/pdf" } : a in jt ? { kind: "video", type: jt[a] } : a in qt ? { kind: "audio", type: qt[a] } : hn.includes(a) ? { kind: "text", type: "text/plain" } : a === "docx" ? { kind: "docx" } : ["pptx", "odp", "odt"].includes(a) ? { kind: a } : ["md", "markdown"].includes(a) ? { kind: "markdown" } : a === "zip" ? { kind: "zip" } : ["heic", "heif"].includes(a) ? { kind: "heic" } : ["xlsx", "xls", "ods"].includes(a) ? { kind: "sheet" } : { kind: "none" };
}
const wa = {
  docx: async (e) => (await import("./cryptomator_vaults-documents-DqUUeel0.mjs")).docxPage(e),
  sheet: async (e) => (await import("./cryptomator_vaults-documents-DqUUeel0.mjs")).sheetPage(e),
  pptx: async (e) => (await import("./cryptomator_vaults-office-DHvoruxl.mjs")).pptxPage(e),
  odp: async (e) => (await import("./cryptomator_vaults-office-DHvoruxl.mjs")).odpPage(e),
  odt: async (e) => (await import("./cryptomator_vaults-office-DHvoruxl.mjs")).odtPage(e),
  markdown: async (e) => (await import("./cryptomator_vaults-previews-9VMwwVCs.mjs")).markdownPage(e),
  zip: async (e) => (await import("./cryptomator_vaults-previews-9VMwwVCs.mjs")).zipPage(e)
};
function fn(e) {
  return e in wa || e === "heic";
}
async function wn(e, a, o) {
  if (e.kind === "heic") {
    const u = await (await import("./cryptomator_vaults-previews-9VMwwVCs.mjs")).heicToPng(a);
    return y("img", { class: "cryptomator-preview", src: Se(u, "image/png"), alt: o });
  }
  const l = await wa[e.kind](a);
  return y("iframe", { class: "cryptomator-preview cryptomator-preview--frame cryptomator-preview--document", sandbox: "", referrerpolicy: "no-referrer", title: o, srcdoc: l });
}
function mn(e, a, o) {
  switch (e.kind) {
    case "image":
      return y("img", { class: "cryptomator-preview", src: Se(a, e.type), alt: o });
    case "pdf":
      return y("iframe", { class: "cryptomator-preview cryptomator-preview--frame", src: Se(a, e.type), title: o });
    case "video":
      return y("video", { class: "cryptomator-preview", src: Se(a, e.type), controls: !0 });
    case "audio":
      return y("audio", { class: "cryptomator-preview", src: Se(a, e.type), controls: !0 });
    case "text":
      return y("pre", { class: "cryptomator-preview cryptomator-preview--text" }, new TextDecoder("utf-8").decode(a));
    default:
      return L(s("No preview for this file. Download it to open it."));
  }
}
async function yn(e, a, o, l) {
  const u = fa(e), i = u.kind !== "none" && a <= (u.kind === "text" ? cn : sn);
  if (!i && a > ha && !window.confirm(s("This file is {size}. Your browser holds it twice while decrypting. Continue?", { size: ft(a) })))
    return;
  const h = y("progress", { max: 1, value: 0 }), p = y("div", { class: "cryptomator-dialog__body" }, [L(s("Decrypting …")), h]), v = y("button", { type: "button", disabled: !0 }, s("Download")), b = ue(e, [
    y("div", { class: "cryptomator-dialog__head" }, [
      y("h2", {}, e),
      y("span", { class: "cryptomator-dialog__meta" }, ft(a)),
      v,
      y("button", { type: "button", class: "cryptomator-dialog__close", onclick: G }, s("Close"))
    ]),
    p
  ]);
  b.querySelector(".cryptomator-dialog__close").focus();
  try {
    const E = await o((A, C) => {
      h.value = 0.5 + A / C / 2;
    }, (A, C) => {
      h.value = A / C / 2;
    });
    if (fe?.dialog !== b)
      return;
    if (v.disabled = !1, v.addEventListener("click", () => pa(e, E)), !i)
      p.replaceChildren(L(s("No preview for this file. Download it to open it.")));
    else if (fn(u.kind)) {
      p.replaceChildren(L(s("Preparing the preview …")));
      try {
        const A = await wn(u, E, e);
        fe?.dialog === b && p.replaceChildren(A);
      } catch (A) {
        fe?.dialog === b && p.replaceChildren(L(s("This document cannot be previewed: {detail}. Download it to open it.", { detail: A.message }), "error"));
      }
    } else
      p.replaceChildren(mn(u, E, e));
  } catch (E) {
    fe?.dialog === b && p.replaceChildren(L(l(E), "error"));
  }
}
function ma(e, a, o, { initial: l = "", action: u = s("Create") } = {}) {
  return new Promise((i) => {
    let h = !1;
    const p = y("input", { type: "text", required: !0, "aria-label": a, autocomplete: "off" });
    p.value = l;
    const v = y("div", { "aria-live": "polite" });
    ue(e, [
      y("h2", {}, e),
      y("form", {
        class: "cryptomator-unlock",
        onsubmit: (E) => {
          E.preventDefault();
          const A = o(p.value);
          if (A) {
            v.replaceChildren(L(A, "error"));
            return;
          }
          h = !0;
          const C = p.value;
          G(), i(C);
        }
      }, [
        y("label", {}, [a, p]),
        y("button", { type: "submit", class: "primary" }, u),
        y("button", { type: "button", onclick: G }, s("Cancel"))
      ]),
      v
    ], () => {
      h || i(null);
    }), p.focus();
    const b = l.lastIndexOf(".");
    p.setSelectionRange(0, b > 0 ? b : l.length);
  });
}
function gn(e, a, o) {
  return new Promise((l) => {
    let u = !1;
    ue(e, [
      y("h2", {}, e),
      L(a),
      y("div", { class: "cryptomator-choices" }, [
        y("button", { type: "button", class: "error primary", onclick: () => {
          u = !0, G();
        } }, o),
        y("button", { type: "button", onclick: G }, s("Cancel"))
      ])
    ], () => l(u)), document.querySelector(".cryptomator-dialog button:last-child")?.focus();
  });
}
function vn(e, a, o, l, u) {
  return new Promise((i) => {
    let h = null, p = [{ name: a, dirId: "" }];
    const v = y("ol", { class: "cryptomator-crumbs" }), b = y("ul", { class: "cryptomator-folders" }), E = y("button", { type: "button", class: "primary", onclick: () => {
      h = { dirId: p[p.length - 1].dirId, ancestors: p.map((C) => C.dirId) }, G();
    } }, u), A = async () => {
      v.replaceChildren(...p.map((C, S) => y("li", {}, S === p.length - 1 ? y("span", { "aria-current": "page" }, C.name) : y("button", { type: "button", onclick: () => {
        p = p.slice(0, S + 1), A();
      } }, C.name)))), b.replaceChildren(L(s("Loading …")));
      try {
        const C = (await o(p[p.length - 1].dirId)).sort((S, R) => S.name.localeCompare(R.name));
        b.replaceChildren(...C.length ? C.map((S) => y("li", {}, y("button", {
          type: "button",
          class: "cryptomator-folders__item",
          disabled: l.has(S.dirId),
          onclick: () => {
            p = [...p, S], A();
          }
        }, S.name))) : [L(s("No folders in here."))]);
      } catch (C) {
        b.replaceChildren(L(C.message, "error"));
      }
    };
    ue(e, [
      y("h2", {}, e),
      y("nav", {}, v),
      y("div", { class: "cryptomator-dialog__body" }, b),
      y("div", { class: "cryptomator-choices" }, [E, y("button", { type: "button", onclick: G }, s("Cancel"))])
    ], () => i(h)), A();
  });
}
function ya(e) {
  const a = y("ul", { class: "cryptomator-uploads" }), o = y("progress", { max: 1, value: 0 }), l = y("div", { "aria-live": "polite" }), u = y("div", { class: "cryptomator-question", hidden: !0 });
  let i = !1;
  const h = y("button", { type: "button", onclick: () => {
    i = !0, h.disabled = !0, h.textContent = s("Stopping after this file …");
  } }, s("Stop")), p = y("button", { type: "button", class: "primary", hidden: !0, onclick: G }, s("Close"));
  return ue(e, [
    y("div", { class: "cryptomator-dialog__head" }, [y("h2", {}, e), h, p]),
    o,
    u,
    y("div", { class: "cryptomator-dialog__body" }, a),
    l
  ]), {
    get stopped() {
      return i;
    },
    file(v) {
      const b = y("span", { class: "cryptomator-dialog__meta" }, s("Waiting")), E = y("progress", { max: 1, value: 0 });
      return a.append(y("li", {}, [y("span", { class: "cryptomator-uploads__name" }, v), b, E])), {
        phase(A, C) {
          b.textContent = A, E.value = C;
        },
        done(A, C) {
          b.textContent = A, b.classList.toggle("cryptomator-notice--error", !!C), E.value = 1;
        }
      };
    },
    /**
     * What to do with a taken name: 'replace', 'skip', 'replace-all', 'skip-all' or
     * 'cancel'; text and cancel tell what replacing does and what stops.
     */
    ask(v, b, { text: E, cancel: A } = {}) {
      return new Promise((C) => {
        const S = (R) => () => {
          u.hidden = !0, u.replaceChildren(), C(R);
        };
        u.replaceChildren(
          y("h3", {}, s("“{name}” already exists", { name: v })),
          L(E || s("Replace the file in the vault with the one you chose? The vault keeps no copy of the old one; Nextcloud's versions keep its encrypted file.")),
          y("div", { class: "cryptomator-choices" }, [
            y("button", { type: "button", class: "primary", onclick: S("replace") }, s("Replace")),
            y("button", { type: "button", onclick: S("skip") }, s("Skip")),
            b > 1 ? y("button", { type: "button", onclick: S("replace-all") }, s("Replace all")) : null,
            b > 1 ? y("button", { type: "button", onclick: S("skip-all") }, s("Skip all")) : null,
            y("button", { type: "button", onclick: S("cancel") }, A || s("Cancel upload"))
          ])
        ), u.hidden = !1, u.querySelector("button").focus();
      });
    },
    progress(v) {
      o.value = v;
    },
    finish(v, b) {
      o.value = 1, h.hidden = !0, p.hidden = !1, l.replaceChildren(L(v, b ? "error" : void 0)), p.focus();
    }
  };
}
function Je({ title: e, intro: a, fields: o, action: l, working: u, run: i }) {
  return new Promise((h) => {
    let p = null;
    const v = {}, b = y("div", { "aria-live": "polite" }), E = y("button", { type: "submit", class: "primary" }, l), A = o.map((C) => {
      const S = C.type === "textarea" ? y("textarea", { name: C.name, rows: 4, required: !0, spellcheck: "false", autocomplete: "off", class: "cryptomator-form__words" }) : y("input", {
        type: C.type ?? "text",
        name: C.name,
        autocomplete: C.autocomplete ?? "off",
        required: !C.readonly,
        readonly: C.readonly || null,
        class: C.account ? "cryptomator-unlock__account" : null
      });
      return S.value = C.value ?? "", v[C.name] = S, y("label", {}, [C.label, S]);
    });
    ue(e, [
      y("h2", {}, e),
      ...a ? [].concat(a).map((C) => L(C)) : [],
      y("form", {
        class: "cryptomator-unlock cryptomator-form",
        method: "post",
        action: "#",
        autocomplete: "on",
        onsubmit: async (C) => {
          C.preventDefault(), E.disabled = !0, b.replaceChildren(L(u ?? s("Working …"))), await new Promise((S) => setTimeout(S, 30));
          try {
            p = await i(Object.fromEntries(Object.entries(v).map(([S, R]) => [S, R.value]))), G();
          } catch (S) {
            E.disabled = !1, b.replaceChildren(L(S.message, "error"));
          }
        }
      }, [...A, y("div", { class: "cryptomator-choices" }, [E, y("button", { type: "button", onclick: G }, s("Cancel"))])]),
      b
    ], () => {
      for (const C of Object.values(v))
        (C.type === "password" || C.tagName === "TEXTAREA") && (C.value = "");
      h(p);
    }), Object.values(v).find((C) => !C.readOnly)?.focus();
  });
}
function ga(e, a, { created: o = !1 } = {}) {
  return new Promise((l) => {
    const u = y("div", { class: "cryptomator-recovery-key", tabindex: "0" }, a), i = y("span", { class: "cryptomator-dialog__meta", "aria-live": "polite" });
    ue(s("Recovery key"), [
      y("h2", {}, o ? s("{vault} is ready", { vault: e }) : s("Recovery key of {vault}", { vault: e })),
      L(s("With this recovery key you can set a new password if you forget the one you have, here or in Cryptomator. Anyone who has it can open the vault: keep it on paper or in your password manager, not in this cloud.")),
      u,
      y("div", { class: "cryptomator-choices" }, [
        y("button", { type: "button", onclick: async () => {
          try {
            await navigator.clipboard.writeText(a), i.textContent = s("Copied");
          } catch {
            i.textContent = s("Copying is not allowed here: select the words and copy them.");
          }
        } }, s("Copy")),
        i,
        y("button", { type: "button", class: "primary", onclick: G }, s("Done"))
      ])
    ], () => {
      u.textContent = "", l();
    }), u.focus();
  });
}
function kn(e, { check: a, describe: o, repair: l }) {
  const u = y("div", { class: "cryptomator-dialog__body" }), i = y("div", { "aria-live": "polite" }), h = y("progress", { max: 1, value: 0 }), p = { CRITICAL: s("Damaged"), WARN: s("Needs repair"), INFO: s("Note") }, v = async () => {
    u.replaceChildren(), h.hidden = !1, h.value = 0, i.replaceChildren(L(s("Checking the vault …")));
    let b;
    try {
      b = await a((C, S) => {
        h.value = S ? C / S : 1;
      });
    } catch (C) {
      h.hidden = !0, i.replaceChildren(L(C.message, "error"));
      return;
    }
    if (h.hidden = !0, b.length === 0) {
      i.replaceChildren(L(s("The vault is healthy: the check found nothing to repair.")));
      return;
    }
    u.append(y("ul", { class: "cryptomator-findings" }, b.map((C) => y("li", {}, [
      y("span", { class: "cryptomator-findings__severity cryptomator-findings__severity--" + C.severity.toLowerCase() }, p[C.severity]),
      y("span", {}, o(C)),
      y("code", { class: "cryptomator-dialog__meta" }, C.path)
    ]))));
    const E = b.filter((C) => C.fixable), A = [];
    E.length && A.push(y("button", { type: "button", class: "primary", onclick: async (C) => {
      C.target.disabled = !0, i.replaceChildren(L(s("Repairing …")));
      try {
        await l(E);
      } catch (S) {
        i.replaceChildren(L(S.message, "error"));
        return;
      }
      await v();
    } }, s("Repair {count}", { count: E.length }))), i.replaceChildren(
      L(E.length === b.length ? s("Each of these can be repaired, as Cryptomator's health check repairs it.") : s("{count} of these can be repaired, as Cryptomator's health check repairs them; the others need Cryptomator or a backup.", { count: E.length })),
      y("div", { class: "cryptomator-choices" }, A)
    );
  };
  ue(s("Health check"), [
    y("div", { class: "cryptomator-dialog__head" }, [
      y("h2", {}, s("Health check of {vault}", { vault: e })),
      y("button", { type: "button", onclick: G }, s("Close"))
    ]),
    h,
    u,
    i
  ]), v();
}
const { VaultError: X } = ua, ct = "DAV:", bn = "http://owncloud.org/ns", Gt = "http://nextcloud.org/ns", Yt = '<?xml version="1.0"?><d:propfind xmlns:d="DAV:" xmlns:oc="http://owncloud.org/ns"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getetag/><oc:permissions/></d:prop></d:propfind>', Cn = 20 * 1024 * 1024, Xt = 10 * 1024 * 1024;
function xn() {
  return window.OC && window.OC.requestToken || document.head.dataset.requesttoken || "";
}
function re(e) {
  return { requesttoken: xn(), "X-Requested-With": "XMLHttpRequest", ...e || {} };
}
function Ce() {
  return Ga()?.uid ?? "";
}
function je(e) {
  return e.split("/").filter((a) => a !== "").map(encodeURIComponent).join("/");
}
function An(e) {
  const a = je(e);
  return $e("dav") + "/files/" + encodeURIComponent(Ce()) + "/" + (a ? a + "/" : "");
}
function Ge(e) {
  const a = new DOMParser().parseFromString(e, "application/xml");
  return Array.from(a.getElementsByTagNameNS(ct, "response")).map((o) => {
    const l = (h, p = ct) => o.getElementsByTagNameNS(p, h)[0], u = l("getcontentlength"), i = l("getlastmodified");
    return {
      href: l("href").textContent,
      isDir: o.getElementsByTagNameNS(ct, "collection").length > 0,
      size: u ? Number(u.textContent) : 0,
      mtime: i ? new Date(i.textContent) : void 0,
      etag: l("getetag")?.textContent || void 0,
      permissions: l("permissions", bn)?.textContent ?? "",
      originalLocation: l("trashbin-original-location", Gt)?.textContent,
      deletionTime: Number(l("trashbin-deletion-time", Gt)?.textContent) || 0
    };
  });
}
function En(e) {
  const a = e.replace(/\/+$/, "").split("/");
  return decodeURIComponent(a[a.length - 1]);
}
function pe(e, a, o) {
  return e === 0 ? new X("network", (o ? o + ": " : "") + "redirected (signed out?)") : e === 404 ? new X("not-found", a) : e === 412 || e === 405 ? new X("exists", a) : e === 507 ? new X("quota", a) : new X("network", (o ? o + ": " : "") + "HTTP " + e);
}
function Ee(e, a) {
  return e >= 200 && e < 300 && !a;
}
function $t(e, a, o, l, u) {
  return new Promise((i, h) => {
    const p = new XMLHttpRequest();
    p.open(e, a);
    for (const [v, b] of Object.entries(re(o)))
      p.setRequestHeader(v, b);
    u && p.upload.addEventListener("progress", (v) => u(v.loaded, v.total)), p.addEventListener("load", () => i(new URL(p.responseURL, a).href === new URL(a, window.location.href).href ? p.status : 0)), p.addEventListener("error", () => h(new X("network", e + " failed"))), p.addEventListener("abort", () => h(new X("network", e + " aborted"))), p.send(l ?? null);
  });
}
async function Re(e, a, o, l, u = []) {
  const i = await fetch(a, { method: e, headers: re(o), credentials: "same-origin" });
  if (!Ee(i.status, i.redirected) && !u.includes(i.status))
    throw pe(i.redirected ? 0 : i.status, l, e);
  return i;
}
function we(e) {
  const a = An(e), o = (i) => a + je(i);
  async function l(i, h, p, v, b) {
    const E = $e("dav") + "/uploads/" + encodeURIComponent(Ce()) + "/cryptomator-vaults-" + crypto.randomUUID(), A = new URL(o(i), window.location.href).href, C = { Destination: A, "OC-Total-Length": String(h) };
    await Re("MKCOL", E, { Destination: A }, i);
    try {
      let S = 0, R = 1;
      for await (const j of p) {
        const U = await $t(
          "PUT",
          E + "/" + String(R).padStart(5, "0"),
          C,
          j,
          (P) => b?.(S + P, h)
        );
        if (!Ee(U, !1))
          throw pe(U, i, "PUT (part " + R + ")");
        S += j.length, R++;
      }
      const B = await fetch(E + "/.file", {
        method: "MOVE",
        headers: re({ ...C, Overwrite: v ? "F" : "T" }),
        credentials: "same-origin"
      });
      if (!Ee(B.status, B.redirected))
        throw pe(B.redirected ? 0 : B.status, i, "MOVE (assembling the parts)");
    } catch (S) {
      throw await fetch(E, { method: "DELETE", headers: re(), credentials: "same-origin" }).catch(() => {
      }), S;
    }
  }
  function* u(i) {
    for (let h = 0; h < i.length; h += Xt)
      yield i.subarray(h, Math.min(h + Xt, i.length));
  }
  return {
    async read(i, h) {
      const p = await fetch(a + je(i), { headers: re(), credentials: "same-origin" });
      if (p.status === 404)
        throw new X("not-found", i);
      if (!p.ok)
        throw new X("network", "GET: HTTP " + p.status);
      const v = Number(p.headers.get("Content-Length")) || 0;
      if (!h || !p.body || v === 0)
        return new Uint8Array(await p.arrayBuffer());
      const b = new Uint8Array(v), E = p.body.getReader();
      let A = 0;
      for (; ; ) {
        const { done: C, value: S } = await E.read();
        if (C)
          break;
        b.set(S, A), A += S.length, h(A, v);
      }
      return b.subarray(0, A);
    },
    async stat(i) {
      const h = await fetch(o(i), {
        method: "PROPFIND",
        headers: re({ Depth: "0", "Content-Type": "application/xml; charset=utf-8" }),
        credentials: "same-origin",
        body: Yt
      });
      if (h.status === 404)
        return null;
      if (h.status !== 207)
        throw pe(h.status, i, "PROPFIND");
      const [p] = Ge(await h.text());
      return { isDir: p.isDir, size: p.size, etag: p.etag, permissions: p.permissions };
    },
    /** Stores a file whole; create: refused (VaultError 'exists') if the name is taken. */
    async write(i, h, { create: p = !1, onProgress: v } = {}) {
      if (h.length >= Cn)
        return l(i, h.length, u(h), p, v);
      const b = await $t("PUT", o(i), p ? { "If-None-Match": "*" } : {}, h, v);
      if (!Ee(b, !1))
        throw pe(b, i, "PUT");
    },
    /** A file too large to hold, from its parts in turn (chunked upload); complete or absent. */
    async writeParts(i, h, p, { create: v = !1, onProgress: b } = {}) {
      return l(i, h, p, v, b);
    },
    /** Bytes start to end (exclusive) of a stored file. */
    async readRange(i, h, p) {
      if (p <= h)
        return new Uint8Array(0);
      const v = await fetch(o(i), {
        headers: re({ Range: "bytes=" + h + "-" + (p - 1) }),
        credentials: "same-origin"
      });
      if (v.status === 404)
        throw new X("not-found", i);
      if (v.status === 206)
        return new Uint8Array(await v.arrayBuffer());
      if (v.status === 200)
        return new Uint8Array(await v.arrayBuffer()).slice(h, p);
      throw new X("network", "GET (range): HTTP " + v.status);
    },
    async mkdir(i, { existsOk: h = !1 } = {}) {
      const p = await fetch(o(i), { method: "MKCOL", headers: re(), credentials: "same-origin" });
      if (!(Ee(p.status, p.redirected) || p.status === 405 && h))
        throw pe(p.status, i, "MKCOL");
    },
    /** Moves in one step; refused (VaultError 'exists') if the target is taken, unless overwrite. */
    async move(i, h, { overwrite: p = !1 } = {}) {
      await Re("MOVE", o(i), { Destination: new URL(o(h), window.location.href).href, Overwrite: p ? "T" : "F" }, h);
    },
    /** Copies on the server; refused (VaultError 'exists') if the target is taken. */
    async copy(i, h) {
      await Re("COPY", o(i), { Destination: new URL(o(h), window.location.href).href, Overwrite: "F" }, h);
    },
    async remove(i) {
      await Re("DELETE", o(i), {}, i, [404]);
    },
    /**
     * Deletes a file or folder only as it was (its ETag): VaultError 'changed' if it
     * changed meanwhile (a folder: anything inside it), 'not-found' if it is gone.
     * A file's DELETE carries If-Match; Nextcloud refuses that on folders, so a
     * folder's ETag is compared just before.
     */
    async removeUnchanged(i, h, { isDir: p = !1 } = {}) {
      if (p) {
        const b = await this.stat(i);
        if (b === null)
          throw new X("not-found", i);
        if (b.etag !== h)
          throw new X("changed", i);
      }
      const v = await fetch(o(i), { method: "DELETE", headers: re(p ? {} : { "If-Match": h }), credentials: "same-origin" });
      if (v.status === 412)
        throw new X("changed", i);
      if (!Ee(v.status, v.redirected))
        throw pe(v.redirected ? 0 : v.status, i, "DELETE");
    },
    async list(i) {
      const h = await fetch(a + (i ? je(i) + "/" : ""), {
        method: "PROPFIND",
        headers: re({ Depth: "1", "Content-Type": "application/xml; charset=utf-8" }),
        credentials: "same-origin",
        body: Yt
      });
      if (h.status === 404)
        throw new X("not-found", i);
      if (!h.ok)
        throw new X("network", "PROPFIND: HTTP " + h.status);
      return Ge(await h.text()).slice(1).map((p) => ({ name: En(p.href), isDir: p.isDir, size: p.size, mtime: p.mtime, etag: p.etag, permissions: p.permissions }));
    }
  };
}
async function Sn() {
  const e = Ce(), a = (u) => u.replace(/&/g, "&amp;").replace(/</g, "&lt;"), o = await fetch($e("dav") + "/", {
    method: "SEARCH",
    headers: re({ "Content-Type": "text/xml; charset=utf-8" }),
    credentials: "same-origin",
    body: '<?xml version="1.0" encoding="UTF-8"?><d:searchrequest xmlns:d="DAV:"><d:basicsearch><d:select><d:prop><d:displayname/></d:prop></d:select><d:from><d:scope><d:href>/files/' + a(e) + "</d:href><d:depth>infinity</d:depth></d:scope></d:from><d:where><d:like><d:prop><d:displayname/></d:prop><d:literal>vault.cryptomator</d:literal></d:like></d:where></d:basicsearch></d:searchrequest>"
  });
  if (!o.ok)
    throw new Error("HTTP " + o.status);
  const l = "/files/" + e + "/";
  return Ge(await o.text()).map((u) => decodeURIComponent(u.href)).filter((u) => u.endsWith("/vault.cryptomator") && u.includes(l)).map((u) => "/" + u.slice(u.indexOf(l) + l.length, -18)).map((u) => u.replace(/\/+$/, "") || "/").sort((u, i) => u.localeCompare(i));
}
async function Nn(e, a) {
  const o = [];
  for (const l of a) {
    const u = l.replace(/^\/+|\/+$/g, ""), i = u.split("/").pop(), h = await e.stat(u);
    if (h === null)
      throw new X("not-found", u);
    const p = { path: u, name: i, isDir: h.isDir, etag: h.etag, permissions: h.permissions, files: [], folders: [] };
    if (!h.isDir)
      p.files.push({ path: u, name: i, size: h.size, etag: h.etag, dirs: [] });
    else {
      const v = async (b, E) => {
        p.folders.push(E);
        const A = await e.list(b);
        if (A.some((C) => !C.isDir && C.name === "vault.cryptomator"))
          throw new X("contains-vault", b);
        for (const C of A) {
          const S = b + "/" + C.name;
          C.isDir ? await v(S, [...E, C.name]) : p.files.push({ path: S, name: C.name, size: C.size, etag: C.etag, dirs: E });
        }
      };
      await v(u, [i]);
    }
    o.push(p);
  }
  return o;
}
async function In(e) {
  const a = $e("dav") + "/trashbin/" + encodeURIComponent(Ce()) + "/trash/", o = await fetch(a, {
    method: "PROPFIND",
    headers: re({ Depth: "1", "Content-Type": "application/xml; charset=utf-8" }),
    credentials: "same-origin",
    body: '<?xml version="1.0"?><d:propfind xmlns:d="DAV:" xmlns:nc="http://nextcloud.org/ns"><d:prop><nc:trashbin-original-location/><nc:trashbin-deletion-time/></d:prop></d:propfind>'
  });
  if (o.status === 404 || o.status === 405)
    return !0;
  if (o.status !== 207)
    throw pe(o.status, e, "PROPFIND (deleted files)");
  const l = e.replace(/^\/+|\/+$/g, ""), [u] = Ge(await o.text()).slice(1).filter((i) => i.originalLocation === l).sort((i, h) => h.deletionTime - i.deletionTime);
  return u ? (await Re("DELETE", new URL(u.href, window.location.href).href, {}, e, [404]), !0) : !1;
}
const { Vault: Oe, VaultError: qe, checkName: va } = ua;
let lt = null;
function Ie() {
  return lt || (document.head.append(y("link", { rel: "stylesheet", href: tn("cryptomator_vaults", "css", "cryptomator_vaults-files.css") })), lt = import("./cryptomator_vaults-dialogs-h5ro9skc.mjs")), lt;
}
function W(e) {
  Ie().then(({ showError: a }) => a(e));
}
function Pe(e) {
  Ie().then(({ showInfo: a }) => a(e));
}
const vt = "cryptomator-vaults", _e = "/cryptomator-vaults", kt = window.location.origin + "/apps/cryptomator_vaults" + _e, Tn = Ya("cryptomator_vaults", "file.svg"), wt = 15, ka = "cryptomator_vaults.added", bt = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 3h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-1v1h-3v-1H8v1H5v-1H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v13h16V5zm8 2.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5.5 8h1.5v7H5.5z"/></svg>', Mn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 8a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/></svg>', Rn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z"/></svg>', ba = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9V6zm9 14H6V10h12v10z"/></svg>', Ca = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>', xa = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z"/></svg>', Fn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.21a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>', Dn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-6 12v-3h-4v-4h4V8l5 5-5 5z"/></svg>', On = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>', Pn = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6a5 5 0 0 0-9.9-1l1.95.45A3 3 0 0 1 15 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm0 12H6V10h12v10z"/></svg>', _n = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4h-2v4H6V4h7v5h5v1h2V8l-6-6H6zm12 10v3h-4v2h4v3l4-4-4-4z"/></svg>', Ln = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v6h2V4h7v5h5v11H6v-4H4v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM10 11v3H2v2h8v3l4-4-4-4z"/></svg>', Un = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2zm5 9h-2v2h-2v-2H9v-2h2V9h2v2h2v2z"/></svg>', $ = /* @__PURE__ */ new Map();
let dt = null, Fe = null, oe = { kind: "vaults" };
async function mt(e, a) {
  const o = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(e)));
  return Array.from(o, (l) => l.toString(16).padStart(2, "0")).join("").slice(0, a);
}
const zn = "r000000000001", Aa = 2 ** 52;
function Ea(e) {
  return Aa + parseInt(e.slice(1, 13), 16);
}
function Sa() {
  try {
    const e = JSON.parse(window.localStorage.getItem(ka) || "[]");
    return Array.isArray(e) ? e.filter((a) => typeof a == "string") : [];
  } catch {
    return [];
  }
}
function Na(e) {
  try {
    window.localStorage.setItem(ka, JSON.stringify([.../* @__PURE__ */ new Set([e, ...Sa()])]));
  } catch {
  }
}
function Vn(e) {
  return e.split("/").filter(Boolean).pop() || s("All files");
}
async function Ct(e) {
  const a = "v" + await mt("vault:" + e, 12);
  return $.has(a) || $.set(a, { seg: a, folder: e, name: Vn(e), vault: null, dirs: /* @__PURE__ */ new Map(), entries: /* @__PURE__ */ new Map(), nodes: /* @__PURE__ */ new Set() }), $.get(a);
}
function Ze() {
  return dt || (dt = (async () => {
    let e = [];
    try {
      e = await Sn();
    } catch (a) {
      W(s("The search for vaults failed: {detail}", { detail: a.message }));
    }
    for (const a of [.../* @__PURE__ */ new Set([...e, ...Sa()])])
      await Ct(a);
  })()), dt;
}
function ke(e, a, o, l, u = !0) {
  const i = e.split("/").filter(Boolean).pop() || zn, h = new la({
    id: Ea(i),
    source: kt + e,
    root: _e,
    owner: Ce(),
    displayname: a,
    permissions: gt.READ,
    mtime: l?.mtime,
    attributes: { cryptomatorVault: o?.seg ?? null, ...l?.attributes }
  });
  return u && o?.nodes.add(h), h;
}
function Hn(e, a, o) {
  const l = e.split("/").pop(), u = new en({
    id: Ea(l),
    source: kt + e,
    root: _e,
    owner: Ce(),
    displayname: a.name,
    mime: "application/octet-stream",
    size: a.size ?? 0,
    mtime: a.mtime,
    permissions: gt.READ,
    attributes: { "has-preview": !0, previewUrl: Tn, cryptomatorVault: o.seg, cryptomatorType: a.type }
  });
  return o.nodes.add(u), u;
}
function H(e) {
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
function Ne(e) {
  window.OCP.Files.Router.goToRoute(null, { view: vt }, { dir: e });
}
function xt() {
  return window.OCP?.Files?.Router?.query?.dir || "/";
}
async function At(e) {
  if (e.vault?.unlocked)
    return !0;
  try {
    e.vault = e.vault || await Oe.open(we(e.folder));
  } catch (o) {
    return W(H(o)), !1;
  }
  const a = await dn(e.name, async (o) => {
    try {
      await e.vault.unlock(o);
    } catch (l) {
      throw new Error(H(l));
    }
  }, e.folder);
  return a && (et(), e.vault.removeLeftovers().catch(() => {
  })), a;
}
async function Jt() {
  oe = { kind: "vaults" };
  const e = ke("/", s("Vaults"), null), a = [...$.values()].sort((o, l) => o.name.localeCompare(l.name)).map((o) => ke("/" + o.seg, o.name, o, { attributes: { cryptomatorVaultRoot: !0, cryptomatorFolder: o.folder } }, !1));
  return { folder: e, contents: a };
}
const Te = window.isSecureContext && !!window.crypto?.subtle;
async function Bn(e) {
  if (Nt(), !Te)
    return oe = { kind: "insecure" }, { folder: new la({ id: Aa + 1, source: kt + "/", root: _e, owner: Ce(), permissions: gt.READ }), contents: [] };
  await Ze();
  const a = e.split("/").filter(Boolean);
  if (a.length === 0)
    return Jt();
  const o = $.get(a[0]);
  if (!o)
    return Ne("/"), Jt();
  if (!o.vault?.unlocked && !await At(o))
    return oe = { kind: "locked", vault: o }, { folder: ke(e, o.name, o, { attributes: { cryptomatorVaultRoot: a.length === 1 } }, !1), contents: [] };
  let l = "", u = o.name;
  if (a.length > 1) {
    const p = o.dirs.get(a[a.length - 1]);
    if (!p)
      return Ne("/" + o.seg), { folder: ke(e, o.name, o), contents: [] };
    l = p.dirId, u = p.name;
  }
  const i = await o.vault.list(l), h = [];
  for (const p of i)
    if (p.type === "dir") {
      const v = "d" + await mt(o.seg + ":dir:" + p.dirId, 12);
      o.dirs.set(v, { dirId: p.dirId, name: p.name }), h.push(ke(e + "/" + v, p.name, o, { mtime: p.mtime }));
    } else {
      const v = "f" + await mt(o.seg + ":file:" + p.path, 12);
      o.entries.set(v, p), h.push(Hn(e + "/" + v, p, o));
    }
  return oe = { kind: "folder", vault: o, dirId: l, path: e }, { folder: ke(e, u, o, void 0, a.length > 1), contents: h };
}
function Kn(e) {
  if (e)
    if (e.replaceChildren(), e.classList.add("cryptomator-empty"), oe.kind === "insecure")
      e.append(L(s("Vaults can only be opened over HTTPS: the browser provides its encryption only there."), "error"));
    else if (oe.kind === "locked") {
      const a = oe.vault;
      e.append(
        y("h2", {}, s("{vault} is locked", { vault: a.name })),
        L(s("Its files are decrypted in this browser tab once you enter its password.")),
        y("button", {
          type: "button",
          class: "primary",
          onclick: async () => {
            await At(a) && Me(a.name);
          }
        }, s("Unlock"))
      );
    } else oe.kind === "folder" ? e.append(y("h2", {}, s("This folder is empty."))) : e.append(
      y("h2", {}, s("No vaults found")),
      L(s("Vaults in your files appear here. Open a vault's folder to add one.")),
      y("button", { type: "button", class: "primary", onclick: Ia }, s("Open a vault folder …"))
    );
}
function Me(e) {
  da("files:node:updated", ke(xt(), e, null));
}
function Qe(e) {
  if (e.vault?.unlocked) {
    if (Q && oe.vault === e) {
      Pe(s("The vault locks when the change being made has finished."));
      const a = setInterval(() => {
        Q || (clearInterval(a), Qe(e));
      }, 500);
      return;
    }
    e.vault.lock();
    for (const a of e.nodes)
      da("files:node:deleted", a);
    e.nodes.clear(), e.dirs.clear(), e.entries.clear(), ln(), yt(ve?.folder), xt().startsWith("/" + e.seg) && Ne("/"), [...$.values()].some((a) => a.vault?.unlocked) || (clearTimeout(Fe), Fe = null);
  }
}
function Et(e) {
  let a = !1;
  for (const o of $.values())
    o.vault?.unlocked && (Qe(o), a = !0);
  a && e && Pe(e);
}
function et() {
  clearTimeout(Fe), Fe = setTimeout(
    () => Et(s("Locked after {minutes} minutes without use.", { minutes: wt })),
    wt * 60 * 1e3
  );
}
function Wn() {
  Fe !== null && et();
}
async function St(e) {
  try {
    await Oe.open(we(e));
  } catch (o) {
    W(H(o));
    return;
  }
  Na(e), await Ze();
  const a = await Ct(e);
  Ne("/" + a.seg);
}
async function Ia() {
  let e;
  try {
    const { getFilePickerBuilder: o } = await Ie();
    e = await o(s("Choose a vault")).startAt("/").setMultiSelect(!1).allowDirectories(!0).setFilter((l) => l.type === ie.Folder || l.basename === "vault.cryptomator").addButton({ label: s("Open vault"), variant: "primary", callback: () => {
    } }).build().pick();
  } catch {
    return;
  }
  const a = "/" + String(e).replace(/^\/+|\/+$/g, "");
  await St(a.endsWith("/vault.cryptomator") ? a.slice(0, -18) || "/" : a);
}
function ee(e) {
  return e?.id === vt;
}
const jn = /* @__PURE__ */ new Set([
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
  "cryptomator-vaults-health"
]), Zt = /* @__PURE__ */ new WeakSet();
let Qt = 0;
function Nt() {
  const e = Qa();
  if (e.length !== Qt) {
    Qt = e.length;
    for (const a of e) {
      if (jn.has(a.id) || Zt.has(a))
        continue;
      const o = a.enabled;
      try {
        Object.defineProperty(a, "enabled", {
          configurable: !0,
          enumerable: !0,
          writable: !0,
          value: (l) => !ee(l?.view) && !(l?.nodes ?? []).some((u) => u?.root === _e) && (o ? o.call(a, l) : !0)
        }), Zt.add(a);
      } catch {
      }
    }
  }
}
function Ta(e) {
  const a = $.get(e.attributes?.cryptomatorVault), o = a?.entries.get(e.basename);
  return { vault: a, entry: o };
}
de({
  id: "cryptomator-vaults-open",
  displayName: ({ nodes: e }) => e[0]?.type === ie.Folder ? s("Open") : s("View"),
  iconSvgInline: () => Mn,
  enabled: ({ nodes: e, view: a }) => (Nt(), ee(a) && e.length === 1),
  async exec({ nodes: e }) {
    const a = e[0];
    if (a.type === ie.Folder)
      return Ne(a.path), null;
    const { vault: o, entry: l } = Ta(a);
    return !o?.vault?.unlocked || !l ? (W(s("The vault is locked.")), null) : (l.type === "link" ? Pe(s("A link to {target}", { target: l.target })) : l.type === "broken" ? W(s("This entry cannot be read: {detail}", { detail: l.error })) : l.size >= Le && !pn(l.name) ? await Ma(o, l) : await yn(l.name, l.size, (u, i) => o.vault.readFile(l, u, i), H), null);
  },
  default: Xa.DEFAULT,
  order: -1e3
});
async function Ma(e, a) {
  if (a.size >= Le && typeof window.showSaveFilePicker == "function") {
    let o;
    try {
      o = await (await window.showSaveFilePicker({ suggestedName: a.name })).createWritable();
    } catch {
      return;
    }
    try {
      await e.vault.readFileStream(a, (l) => o.write(l)), await o.close();
    } catch (l) {
      await o.abort().catch(() => {
      }), W(H(l));
    }
    return;
  }
  if (!(a.size > ha && !window.confirm(s("This file is {size}. Your browser holds it twice while decrypting. Continue?", { size: ft(a.size) }))))
    try {
      pa(a.name, await e.vault.readFile(a));
    } catch (o) {
      W(H(o));
    }
}
async function ea(e) {
  const { vault: a, entry: o } = Ta(e);
  return !a?.vault?.unlocked || !o ? (W(s("The vault is locked.")), null) : (await Ma(a, o), null);
}
de({
  id: "cryptomator-vaults-download",
  displayName: () => s("Download"),
  iconSvgInline: () => Rn,
  enabled: ({ nodes: e, view: a }) => ee(a) && e.length > 0 && e.every((o) => o.type === ie.File && o.attributes?.cryptomatorType === "file"),
  exec: ({ nodes: e }) => ea(e[0]),
  async execBatch({ nodes: e }) {
    const a = [];
    for (const o of e)
      a.push(await ea(o));
    return a;
  },
  order: -900
});
de({
  id: "cryptomator-vaults-lock",
  displayName: () => s("Lock"),
  iconSvgInline: () => ba,
  enabled: ({ nodes: e, view: a }) => ee(a) && e.length === 1 && e[0].attributes?.cryptomatorVaultRoot === !0 && $.get(e[0].attributes.cryptomatorVault)?.vault?.unlocked === !0,
  async exec({ nodes: e }) {
    return Qe($.get(e[0].attributes.cryptomatorVault)), null;
  },
  order: -800
});
de({
  id: "cryptomator-vaults-open-vault",
  displayName: () => s("Open vault"),
  iconSvgInline: () => bt,
  enabled: ({ nodes: e, view: a }) => a?.id === "files" && e.length === 1 && e[0].root?.startsWith("/files/") && (e[0].basename === "vault.cryptomator" || e[0].type === ie.Folder && [...$.values()].some((o) => o.folder === e[0].path)),
  async exec({ nodes: e }) {
    const a = e[0];
    return await St(a.type === ie.Folder ? a.path : a.dirname), null;
  },
  order: 50
});
const tt = /* @__PURE__ */ new Set();
let ge = null;
function qn(e) {
  return tt.has(e) || [...$.values()].some((a) => a.folder === e);
}
function Ye(e) {
  if (!ge)
    return;
  ge.folder = e;
  const a = e?.path;
  if (!a || !qn(a)) {
    ge.el.replaceChildren();
    return;
  }
  ge.el.replaceChildren(y("div", { class: "cryptomator-banner", role: "note" }, [
    y("span", { class: "cryptomator-banner__icon", "aria-hidden": "true" }),
    y(
      "span",
      { class: "cryptomator-banner__text" },
      s("This folder is a Cryptomator vault: its files are encrypted. Open it to see them, decrypted in this browser.")
    ),
    y("button", { type: "button", class: "primary", onclick: () => St(a) }, s("Open vault"))
  ])), ge.el.querySelector(".cryptomator-banner__icon").innerHTML = bt;
}
let ve = null;
function yt(e) {
  if (!ve)
    return;
  ve.folder = e;
  const a = $.get(e?.attributes?.cryptomatorVault);
  if (!a?.vault?.unlocked) {
    ve.el.replaceChildren();
    return;
  }
  ve.el.replaceChildren(y("div", { class: "cryptomator-banner cryptomator-banner--unlocked", role: "status" }, [
    y("span", { class: "cryptomator-banner__icon", "aria-hidden": "true" }),
    y(
      "span",
      { class: "cryptomator-banner__text" },
      s("{vault} is unlocked in this browser. It locks after {minutes} minutes without use.", { vault: a.name, minutes: wt })
    ),
    y("button", { type: "button", class: "cryptomator-banner__lock", onclick: () => Qe(a) }, s("Lock"))
  ])), ve.el.querySelector(".cryptomator-banner__icon").innerHTML = Pn;
}
ca({
  id: "cryptomator-vaults-unlocked",
  order: 4,
  enabled: (e, a) => Te && ee(a),
  render(e, a) {
    ve = { el: e, folder: a }, yt(a);
  },
  updated(e) {
    yt(e);
  }
});
ca({
  id: "cryptomator-vaults-banner",
  order: 5,
  enabled: (e, a) => Te && a?.id === "files",
  render(e, a) {
    ge = { el: e, folder: a }, Ye(a);
  },
  updated(e) {
    Ye(e);
  }
});
$a("files:list:updated", ({ view: e, folder: a, contents: o }) => {
  e?.id !== "files" || !a?.path || ((o || []).some((l) => l.type === ie.File && l.basename === "vault.cryptomator") && tt.add(a.path), Ye(a));
});
function te() {
  const e = oe.kind === "folder" ? oe : null;
  return e?.vault?.vault?.unlocked && xt() === e.path ? e : null;
}
let Q = !1;
const Le = 16 * 1024 * 1024;
function It(e, a) {
  const o = {
    size: e.size,
    read: async (l, u) => new Uint8Array(await e.slice(l, u).arrayBuffer()),
    all: async () => new Uint8Array(await e.arrayBuffer())
  };
  return { name: e.name, size: e.size, dirs: a, source: o };
}
function Gn(e, a) {
  const o = {
    size: a.size,
    read: (l, u) => e.readRange(a.path, l, u),
    all: () => e.read(a.path),
    remote: !0
  };
  return { name: a.name, size: a.size, dirs: a.dirs, source: o, origin: a };
}
async function Xe(e, a = [], o = {}) {
  const l = te();
  if (!l || e.length === 0 && a.length === 0)
    return;
  if (Q) {
    W(s("Another change to the vault is still running."));
    return;
  }
  Q = !0;
  const { vault: u } = l.vault, i = ya(o.title || s("Uploading to {vault}", { vault: l.vault.name }));
  let h = null, p = 0;
  const v = [], b = [];
  let E = "";
  const A = /* @__PURE__ */ new Map([["", l.dirId]]), C = async (S) => {
    let R = "";
    for (const B of S) {
      const j = R ? R + "/" + B : B;
      A.has(j) || A.set(j, (await u.ensureDirectory(A.get(R), B)).dirId), R = j;
    }
    return A.get(R);
  };
  try {
    for (const S of a)
      try {
        await C(S);
      } catch (R) {
        b.push(S.join("/")), i.file(S.join("/") + "/").done(H(R), !0);
      }
    for (const [S, R] of e.entries()) {
      const { dirs: B } = R, j = [...B, R.name].join("/"), U = i.file(j);
      if (i.stopped) {
        U.done(s("Not uploaded"));
        continue;
      }
      let P = h === "replace-all";
      const q = async () => {
        const Y = await C(B), K = { encrypt: s("Encrypting"), upload: s("Uploading"), verify: s("Checking") }, Z = R.size >= Le, ae = Z ? { upload: [0, 0.7], verify: [0.7, 0.3] } : { encrypt: [0, 0.2], upload: [0.2, 0.6], verify: [0.8, 0.2] }, he = (ce, J, _) => {
          const [ne, me] = ae[ce];
          U.phase(ce === "upload" && Z ? s("Encrypting and uploading") : K[ce], ne + me * (_ ? J / _ : 1));
        };
        Z ? await u.writeFileStream(Y, R.name, R.source, { replace: P, onProgress: he }) : (R.source.remote && U.phase(s("Reading"), 0), await u.writeFile(Y, R.name, await R.source.all(), { replace: P, onProgress: he })), await o.check?.(R);
      };
      try {
        try {
          await q();
        } catch (Y) {
          if (Y?.code !== "exists" || h === "skip-all")
            throw Y;
          const K = h === "replace-all" ? "replace" : await i.ask(j, e.length);
          if (K === "cancel") {
            U.done(s("Not uploaded"));
            break;
          }
          if (K.endsWith("-all") && (h = K), K.startsWith("skip")) {
            U.done(s("Skipped"));
            continue;
          }
          P = !0, await q();
        }
        p++, v.push(R), U.done(o.written || s("Uploaded and checked"));
      } catch (Y) {
        Y?.code === "exists" && h === "skip-all" ? U.done(s("Skipped")) : (b.push(j), U.done(H(Y), !0));
      }
      i.progress((S + 1) / e.length);
    }
    o.after && (E = await o.after(v, i));
  } finally {
    Q = !1, i.finish((b.length ? s("{written} uploaded, {failed} failed. The vault is unchanged where an upload failed.", { written: p, failed: b.length }) : s("{written} uploaded and checked.", { written: p })) + (E ? " " + E : ""), b.length > 0), Me(l.vault.name);
  }
}
function Ra(e = !1) {
  const a = y("input", { type: "file", multiple: !0, hidden: !0, webkitdirectory: e || null });
  a.addEventListener("change", () => {
    const o = [...a.files].map((l) => It(l, (l.webkitRelativePath || l.name).split("/").slice(0, -1)));
    a.remove(), Xe(o);
  }), document.body.append(a), a.click();
}
async function Yn(e) {
  const a = [], o = [], l = async (u, i) => {
    if (u.isFile)
      a.push(It(await new Promise((h, p) => u.file(h, p)), i));
    else if (u.isDirectory) {
      const h = [...i, u.name];
      o.push(h);
      const p = u.createReader();
      for (; ; ) {
        const v = await new Promise((b, E) => p.readEntries(b, E));
        if (v.length === 0)
          break;
        for (const b of v)
          await l(b, h);
      }
    }
  };
  for (const u of e)
    await l(u, []);
  return { files: a, folders: o };
}
async function Xn() {
  const e = te();
  if (!e)
    return;
  const a = await ma(s("New folder"), s("Folder name"), (o) => {
    try {
      return va(o), null;
    } catch (l) {
      return H(l);
    }
  });
  if (a !== null)
    try {
      await e.vault.vault.createDirectory(e.dirId, a), Me(e.vault.name);
    } catch (o) {
      W(H(o));
    }
}
async function Tt(e, a) {
  if (Q) {
    W(s("Another change to the vault is still running."));
    return;
  }
  Q = !0;
  try {
    await a();
  } finally {
    Q = !1, Me(e.vault.name);
  }
}
function at(e, a) {
  return e?.code === "not-found" ? s("“{name}” is no longer there.", { name: a }) : H(e);
}
function nt(e, a) {
  const o = ee(a) ? te() : null;
  return o !== null && e.length > 0 && e.every((l) => l.attributes?.cryptomatorVault === o.vault.seg);
}
async function $n(e) {
  const a = te(), o = e.displayname, l = await ma(s("Rename"), s("New name"), (u) => {
    try {
      return va(u), null;
    } catch (i) {
      return H(i);
    }
  }, { initial: o, action: s("Rename") });
  l === null || l.normalize("NFC") === o || await Tt(a, async () => {
    try {
      await a.vault.vault.moveEntry(a.dirId, o, a.dirId, l);
    } catch (u) {
      W(at(u, o));
    }
  });
}
async function ta(e) {
  const a = te(), { vault: o } = a.vault, l = new Set(e.filter((i) => i.type === ie.Folder).map((i) => a.vault.dirs.get(i.basename)?.dirId).filter(Boolean)), u = await vn(
    e.length === 1 ? s("Move “{name}” to …", { name: e[0].displayname }) : s("Move {count} items to …", { count: e.length }),
    a.vault.name,
    async (i) => (await o.list(i)).filter((h) => h.type === "dir").map((h) => ({ name: h.name, dirId: h.dirId })),
    l,
    s("Move here")
  );
  u === null || u.dirId === a.dirId || await Tt(a, async () => {
    const i = [];
    for (const h of e)
      try {
        await o.moveEntry(a.dirId, h.displayname, u.dirId, void 0, { ancestors: u.ancestors });
      } catch (p) {
        i.push(h.displayname + ": " + at(p, h.displayname));
      }
    i.length && W(i.join(`
`));
  });
}
async function aa(e) {
  const a = te(), o = e.filter((i) => i.type === ie.Folder).length, l = e.length === 1 ? s("Delete “{name}”?", { name: e[0].displayname }) : s("Delete {count} items?", { count: e.length }), u = (o ? s("Folders are deleted with everything in them.") + " " : "") + s("The encrypted files go to Nextcloud's deleted files.");
  await gn(l, u, s("Delete")) && await Tt(a, async () => {
    const i = [];
    for (const h of e)
      try {
        await a.vault.vault.removeEntry(a.dirId, h.displayname);
      } catch (p) {
        i.push(h.displayname + ": " + at(p, h.displayname));
      }
    i.length && W(i.join(`
`));
  });
}
const ut = 10 * 1024 * 1024;
function De(e) {
  return [...tt, ...[...$.values()].map((o) => o.folder)].some((o) => e === o || e.startsWith(o.replace(/\/+$/, "") + "/"));
}
function na(e) {
  const a = new Uint8Array(e.reduce((l, u) => l + u.length, 0));
  let o = 0;
  for (const l of e)
    a.set(l, o), o += l.length;
  return a;
}
async function* Jn(e, a) {
  let o = [], l = 0;
  for await (const u of e)
    for (o.push(u), l += u.length; l >= a; ) {
      const i = na(o);
      yield i.subarray(0, a), o = l > a ? [i.subarray(a)] : [], l -= a;
    }
  l > 0 && (yield na(o));
}
async function Ke(e) {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", e));
}
function ra(e, a) {
  return e.length === a.length && e.every((o, l) => o === a[l]);
}
function Zn(e) {
  const a = $.get(e.attributes?.cryptomatorVault);
  if (e.type === ie.Folder) {
    const o = a?.dirs.get(e.basename);
    return o ? { type: "dir", name: o.name, dirId: o.dirId } : null;
  }
  return a?.entries.get(e.basename) ?? null;
}
async function Qn() {
  const e = te();
  if (!e)
    return;
  let a = null, o;
  try {
    const { getFilePickerBuilder: i } = await Ie();
    o = await i(s("Copy or move into the vault")).setMultiSelect(!0).allowDirectories(!0).setFilter((h) => !De(h.path)).setButtonFactory((h) => [
      { label: s("Copy into the vault"), variant: "secondary", disabled: h.length === 0, callback: () => {
        a = "copy";
      } },
      { label: s("Move into the vault"), variant: "primary", disabled: h.length === 0, callback: () => {
        a = "move";
      } }
    ]).build().pick();
  } catch {
    return;
  }
  if (o = [].concat(o || []), a === null || o.length === 0)
    return;
  const l = we("");
  let u;
  try {
    u = await Nn(l, o);
  } catch (i) {
    W(H(i));
    return;
  }
  await Xe(u.flatMap((i) => i.files.map((h) => Gn(l, h))), u.flatMap((i) => i.folders), {
    title: a === "move" ? s("Moving into {vault}", { vault: e.vault.name }) : s("Copying into {vault}", { vault: e.vault.name }),
    written: s("Encrypted and checked"),
    // A file that changed while it was read may be in the vault half old, half new.
    async check(i) {
      if ((await l.stat(i.origin.path))?.etag !== i.origin.etag)
        throw new qe("changed", i.origin.path);
    },
    after: a === "move" ? (i, h) => er(l, u, i, h) : void 0
  });
}
async function er(e, a, o, l) {
  const u = new Set(o.map((h) => h.origin));
  let i = 0;
  for (const h of a) {
    const p = l.file(h.isDir ? h.name + "/" : h.name);
    if (!h.files.every((v) => u.has(v))) {
      p.done(s("Original kept: not all of it is in the vault"), !0);
      continue;
    }
    if (!h.permissions.includes("D") || h.permissions.includes("S")) {
      p.done(s("Original kept: it is shared with you"), !0);
      continue;
    }
    try {
      await e.removeUnchanged(h.path, h.etag, { isDir: h.isDir }), i++, p.done(await In(h.path) ? s("Original deleted for good") : s("Original deleted; it may still be in the deleted files"));
    } catch (v) {
      p.done(H(v), !0);
    }
  }
  return i ? s("Originals deleted for good: {removed}.", { removed: i }) : "";
}
async function oa(e, a, o, l, u, i) {
  if (o.size < Le) {
    i("decrypt", 0, 1);
    const v = await e.readFile(o);
    if (await a.write(l, v, { create: !u, onProgress: (b, E) => i("upload", b, E) }), i("verify", 0, 1), !ra(await Ke(await a.read(l)), await Ke(v)))
      throw new qe("network", "the stored copy differs from the decrypted file");
    return;
  }
  const h = [];
  async function* p(v) {
    for await (const b of v)
      h.push(await Ke(b)), yield b;
  }
  if (await a.writeParts(
    l,
    o.size,
    p(Jn(e.decryptedPieces(o), ut)),
    { create: !u, onProgress: (v, b) => i("upload", v, b) }
  ), (await a.stat(l))?.size !== o.size)
    throw new qe("network", "the stored copy has another size than the decrypted file");
  for (const [v, b] of h.entries()) {
    const E = v * ut;
    if (!ra(await Ke(await a.readRange(l, E, Math.min(E + ut, o.size))), b))
      throw new qe("network", "the stored copy differs from the decrypted file");
    i("verify", v + 1, h.length);
  }
}
async function ia(e) {
  const a = te();
  if (!a)
    return;
  let o = null, l = null;
  try {
    const { getFilePickerBuilder: R } = await Ie();
    await R(e.length === 1 ? s("Export “{name}” decrypted to …", { name: e[0].displayname }) : s("Export {count} items decrypted to …", { count: e.length })).setMultiSelect(!1).allowDirectories(!0).setMimeTypeFilter(["httpd/unix-directory"]).setFilter((B) => B.type === ie.Folder && !De(B.path)).setButtonFactory((B, j) => [
      { label: s("Copy here"), variant: "secondary", callback: () => {
        o = "copy", l = j;
      } },
      { label: s("Move here"), variant: "primary", callback: () => {
        o = "move", l = j;
      } }
    ]).build().pick();
  } catch {
  }
  if (o === null || l === null)
    return;
  if (De(l)) {
    W(s("Choose a folder outside the vault."));
    return;
  }
  if (Q) {
    W(s("Another change to the vault is still running."));
    return;
  }
  Q = !0;
  const { vault: u } = a.vault, i = we(""), h = (...R) => [l.replace(/^\/+|\/+$/g, ""), ...R].filter(Boolean).join("/"), p = ya(o === "move" ? s("Moving out of {vault}", { vault: a.vault.name }) : s("Exporting from {vault}", { vault: a.vault.name })), v = { text: s("Replace the file in your files with the one from the vault? Nextcloud keeps the old one among its versions."), cancel: s("Cancel") };
  let b = null, E = 0, A = 0, C = !1;
  const S = [];
  try {
    const R = [];
    for (const U of e) {
      const P = Zn(U), q = { name: U.displayname, files: [], folders: [], complete: P !== null }, Y = async (K, Z) => {
        q.folders.push(Z);
        for (const ae of await u.list(K))
          ae.type === "dir" ? await Y(ae.dirId, [...Z, ae.name]) : ae.type === "file" ? q.files.push({ entry: ae, dirs: Z }) : q.complete = !1;
      };
      P?.type === "dir" ? await Y(P.dirId, [P.name]) : P?.type === "file" ? q.files.push({ entry: P, dirs: [] }) : q.complete = !1, R.push(q);
    }
    const B = R.reduce((U, P) => U + P.files.length, 0);
    let j = 0;
    for (const U of R) {
      for (const P of U.folders)
        try {
          await i.mkdir(h(...P), { existsOk: !0 });
        } catch (q) {
          U.complete = !1, S.push(P.join("/")), p.file(P.join("/") + "/").done(H(q), !0);
        }
      for (const { entry: P, dirs: q } of U.files) {
        const Y = [...q, P.name].join("/"), K = p.file(Y);
        if (j++, p.stopped || C) {
          U.complete = !1, K.done(s("Not exported"));
          continue;
        }
        const Z = { decrypt: s("Decrypting"), upload: P.size >= Le ? s("Decrypting and uploading") : s("Uploading"), verify: s("Checking") }, ae = { decrypt: [0, 0.2], upload: [0.2, 0.6], verify: [0.8, 0.2] }, he = (J, _, ne) => K.phase(Z[J], ae[J][0] + ae[J][1] * (ne ? _ / ne : 1));
        let ce = b === "replace-all";
        try {
          try {
            await oa(u, i, P, h(...q, P.name), ce, he);
          } catch (J) {
            if (J?.code !== "exists" || b === "skip-all")
              throw J;
            const _ = b === "replace-all" ? "replace" : await p.ask(Y, B, v);
            if (_ === "cancel")
              throw C = !0, Object.assign(new Error("cancelled"), { cancelled: !0 });
            if (_.endsWith("-all") && (b = _), _.startsWith("skip"))
              throw Object.assign(new Error("skipped"), { skipped: !0 });
            ce = !0, await oa(u, i, P, h(...q, P.name), ce, he);
          }
          E++, K.done(s("Exported and checked"));
        } catch (J) {
          if (U.complete = !1, J?.cancelled) {
            K.done(s("Not exported"));
            continue;
          }
          J?.skipped || J?.code === "exists" && b === "skip-all" ? K.done(s("Skipped")) : (S.push(Y), K.done(H(J), !0));
        }
        p.progress(j / Math.max(B, 1));
      }
      if (o === "move") {
        const P = p.file(s("“{name}” in the vault", { name: U.name }));
        if (!U.complete) {
          P.done(s("Kept in the vault: not all of it was exported"), !0);
          continue;
        }
        try {
          await u.removeEntry(a.dirId, U.name), A++, P.done(s("Removed from the vault"));
        } catch (q) {
          P.done(at(q, U.name), !0);
        }
      }
    }
  } catch (R) {
    S.push(""), W(H(R));
  } finally {
    Q = !1;
    const R = S.length ? s("{written} exported, {failed} failed.", { written: E, failed: S.length }) : s("{written} exported and checked.", { written: E });
    p.finish(R + (A ? " " + s("{removed} removed from the vault.", { removed: A }) : ""), S.length > 0), Me(a.vault.name);
  }
}
de({
  id: "cryptomator-vaults-rename",
  displayName: () => s("Rename"),
  iconSvgInline: () => Fn,
  enabled: ({ nodes: e, view: a }) => nt(e, a) && e.length === 1,
  async exec({ nodes: e }) {
    return await $n(e[0]), null;
  },
  order: -700
});
de({
  id: "cryptomator-vaults-move",
  displayName: () => s("Move …"),
  iconSvgInline: () => Dn,
  enabled: ({ nodes: e, view: a }) => nt(e, a),
  async exec({ nodes: e }) {
    return await ta(e), null;
  },
  async execBatch({ nodes: e }) {
    return await ta(e), e.map(() => null);
  },
  order: -690
});
de({
  id: "cryptomator-vaults-export",
  displayName: () => s("Export to your files …"),
  iconSvgInline: () => _n,
  enabled: ({ nodes: e, view: a }) => nt(e, a),
  async exec({ nodes: e }) {
    return await ia(e), null;
  },
  async execBatch({ nodes: e }) {
    return await ia(e), e.map(() => null);
  },
  order: -680
});
de({
  id: "cryptomator-vaults-delete",
  displayName: () => s("Delete"),
  iconSvgInline: () => On,
  enabled: ({ nodes: e, view: a }) => nt(e, a),
  async exec({ nodes: e }) {
    return await aa(e), null;
  },
  async execBatch({ nodes: e }) {
    return await aa(e), e.map(() => null);
  },
  destructive: !0,
  order: 100
});
be({
  id: "cryptomator-vaults-upload",
  displayName: () => s("Upload files …"),
  iconSvgInline: () => Ca,
  order: -2,
  enabled: ({ view: e }) => ee(e) && te() !== null,
  exec: async () => (Ra(), null)
});
be({
  id: "cryptomator-vaults-upload-folder",
  displayName: () => s("Upload folder …"),
  iconSvgInline: () => Ca,
  order: -1.5,
  enabled: ({ view: e }) => ee(e) && te() !== null,
  exec: async () => (Ra(!0), null)
});
be({
  id: "cryptomator-vaults-import",
  displayName: () => s("Add from your files …"),
  iconSvgInline: () => Ln,
  order: -1.2,
  enabled: ({ view: e }) => ee(e) && te() !== null,
  exec: async () => (await Qn(), null)
});
be({
  id: "cryptomator-vaults-new-folder",
  displayName: () => s("New folder …"),
  iconSvgInline: () => xa,
  order: -1,
  enabled: ({ view: e }) => ee(e) && te() !== null,
  exec: async () => (await Xn(), null)
});
function tr(e) {
  te() && e.dataTransfer?.types?.includes("Files") && (e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy");
}
function ar(e) {
  if (!te() || !e.dataTransfer?.files?.length)
    return;
  e.preventDefault(), e.stopPropagation();
  const a = [...e.dataTransfer.items || []].map((o) => o.webkitGetAsEntry?.()).filter(Boolean);
  if (a.length === 0) {
    Xe([...e.dataTransfer.files].map((o) => It(o, [])));
    return;
  }
  Yn(a).then(({ files: o, folders: l }) => Xe(o, l), (o) => W(H(o)));
}
window.addEventListener("dragover", tr, !0);
window.addEventListener("drop", ar, !0);
const sa = 8, ht = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm5.65-4A6 6 0 1 0 12.65 14H17v4h4v-4h2v-4H12.65z"/></svg>', nr = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 0 1 7.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 3 5.5 5.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35zM11 7v3H8v2h3v3h2v-3h3v-2h-3V7h-2z"/></svg>';
function Mt() {
  return import("./cryptomator_vaults-recovery-words-CHlfZTyo.mjs").then((e) => e.default.split(`
`));
}
function Rt(e, a) {
  if (e.length < sa)
    throw new Error(s("The password needs at least {count} characters.", { count: sa }));
  if (e !== a)
    throw new Error(s("The two passwords differ."));
}
function rr(e) {
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
async function or() {
  let e = null;
  try {
    const { getFilePickerBuilder: u } = await Ie();
    await u(s("Where should the new vault go?")).startAt("/").setMultiSelect(!1).allowDirectories(!0).setMimeTypeFilter(["httpd/unix-directory"]).setFilter((i) => i.type === ie.Folder && !De(i.path)).setButtonFactory((i, h) => [{ label: s("Create the vault here"), variant: "primary", callback: () => {
      e = h;
    } }]).build().pick();
  } catch {
  }
  if (e === null)
    return;
  if (De(e)) {
    W(s("A vault cannot be inside a vault."));
    return;
  }
  const a = we(""), o = await Je({
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
    async run({ name: u, password: i, repeated: h }) {
      const p = u.trim();
      if (!p || p === "." || p === ".." || /[/\\]/.test(p))
        throw new Error(s("“{name}” cannot be a folder's name.", { name: p }));
      Rt(i, h);
      const v = (e.replace(/\/+$/, "") + "/" + p).replace(/^\/*/, "/");
      try {
        await a.mkdir(v.slice(1));
      } catch (E) {
        throw new Error(E?.code === "exists" ? s("A folder “{name}” is there already.", { name: p }) : H(E));
      }
      let b;
      try {
        b = await Oe.create(we(v), i);
      } catch (E) {
        throw await a.remove(v.slice(1)).catch(() => {
        }), new Error(H(E));
      }
      return { folder: v, vault: b, key: await b.recoveryKey(i, await Mt()) };
    }
  });
  if (!o)
    return;
  Na(o.folder), tt.add(o.folder), await Ze();
  const l = await Ct(o.folder);
  l.vault = o.vault, et(), await ga(l.name, o.key, { created: !0 }), Ne("/" + l.seg);
}
async function Fa(e) {
  return e.vault ?? await Oe.open(we(e.folder));
}
async function ir(e) {
  await Je({
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
    async run({ old: o, password: l, repeated: u }) {
      Rt(l, u);
      try {
        const i = await Fa(e);
        await i.changePassword(o, l), e.vault = i;
      } catch (i) {
        throw new Error(H(i));
      }
      return !0;
    }
  }) && Pe(s("The password of {vault} is changed.", { vault: e.name }));
}
async function sr(e) {
  const a = await Je({
    title: s("Recovery key of {vault}", { vault: e.name }),
    intro: [s("Enter the vault's password to see its recovery key.")],
    fields: [
      { name: "account", label: s("Vault"), value: e.folder, readonly: !0, account: !0, autocomplete: "username" },
      { name: "password", label: s("Password"), type: "password", autocomplete: "current-password" }
    ],
    action: s("Show"),
    working: s("Unlocking …"),
    async run({ password: o }) {
      try {
        return await (await Fa(e)).recoveryKey(o, await Mt());
      } catch (l) {
        throw new Error(H(l));
      }
    }
  });
  a && await ga(e.name, a);
}
async function cr(e) {
  const a = await Je({
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
    async run({ key: o, password: l, repeated: u }) {
      Rt(l, u);
      try {
        return await Oe.resetPassword(we(e.folder), o, l, await Mt());
      } catch (i) {
        throw new Error(H(i));
      }
    }
  });
  a && (e.vault = a, et(), Pe(s("{vault} has a new password and is unlocked.", { vault: e.name })));
}
async function lr(e) {
  !e.vault?.unlocked && !await At(e) || kn(e.name, {
    check: (a) => e.vault.checkHealth(a),
    describe: rr,
    async repair(a) {
      if (Q)
        throw new Error(s("Another change to the vault is still running."));
      Q = !0;
      try {
        for (const o of a)
          await e.vault.repair(o);
      } catch (o) {
        throw new Error(H(o));
      } finally {
        Q = !1, Me(e.name);
      }
    }
  });
}
const dr = (e) => $.get(e[0].attributes.cryptomatorVault), ur = ({ nodes: e, view: a }) => Te && ee(a) && e.length === 1 && e[0].attributes?.cryptomatorVaultRoot === !0;
for (const [e, a, o, l, u] of [
  ["cryptomator-vaults-change-password", () => s("Change password …"), ht, ir, -790],
  ["cryptomator-vaults-recovery-key", () => s("Show recovery key …"), ht, sr, -780],
  ["cryptomator-vaults-reset-password", () => s("Reset password with recovery key …"), ht, cr, -770],
  ["cryptomator-vaults-health", () => s("Check health …"), nr, lr, -760]
])
  de({
    id: e,
    displayName: a,
    iconSvgInline: () => o,
    enabled: ur,
    async exec({ nodes: i }) {
      return await l(dr(i)), null;
    },
    order: u
  });
be({
  id: "cryptomator-vaults-new",
  displayName: () => s("New vault …"),
  iconSvgInline: () => xa,
  order: -0.5,
  enabled: ({ view: e }) => Te && ee(e) && oe.kind === "vaults",
  exec: async () => (await or(), null)
});
be({
  id: "cryptomator-vaults-add",
  displayName: () => s("Open a vault folder …"),
  iconSvgInline: () => Un,
  order: 0,
  enabled: ({ view: e }) => ee(e),
  exec: async () => (await Ia(), null)
});
be({
  id: "cryptomator-vaults-lock-all",
  displayName: () => s("Lock all vaults"),
  iconSvgInline: () => ba,
  order: 1,
  enabled: ({ view: e }) => ee(e) && [...$.values()].some((a) => a.vault?.unlocked),
  exec: async () => (Et(), null)
});
Ja().register(new Za({
  id: vt,
  name: s("Vaults"),
  caption: s("Cryptomator vaults, unlocked in this browser"),
  emptyTitle: s("No vaults found"),
  emptyCaption: s("Vaults in your files appear here. Open a vault's folder to add one."),
  emptyView: Kn,
  icon: bt,
  order: 90,
  getContents: Bn
}));
Nt();
for (const e of ["pointerdown", "keydown", "wheel", "touchstart"])
  document.addEventListener(e, Wn, { passive: !0 });
window.addEventListener("pagehide", () => {
  G(), Et();
});
Te && Ze().then(() => Ye(ge?.folder));
export {
  vt as VIEW_ID
};
