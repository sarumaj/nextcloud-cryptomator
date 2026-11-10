import { i as e, t } from "./cryptomator_vaults-rolldown-runtime-CwxnZyOB.mjs";
import { B as n, D as r, E as i, G as a, H as o, L as s, M as c, O as l, R as u, V as d, a as f, d as p, i as m, k as h, n as g, t as _, v as ee, x as te, y as ne } from "./cryptomator_vaults-common-B41zt4nR.mjs";
// src/l10n.js
var v = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t, n) => {
	(function(e, n) {
		typeof t == "object" && t.exports ? t.exports = n(globalThis.crypto) : e.CryptomatorVault = n(e.crypto);
	})(typeof self < "u" ? self : n, function(e) {
		let t = e.subtle, n = new TextEncoder(), r = new TextDecoder("utf-8", { fatal: !0 });
		class i extends Error {
			constructor(e, t) {
				super(t || e), this.name = "VaultError", this.code = e;
			}
		}
		function a(e) {
			let t = e.replace(/-/g, "+").replace(/_/g, "/"), n = t + "=".repeat((4 - t.length % 4) % 4), r = atob(n), i = new Uint8Array(r.length);
			for (let e = 0; e < r.length; e++) i[e] = r.charCodeAt(e);
			return i;
		}
		function o(e, t) {
			let n = "";
			for (let t = 0; t < e.length; t++) n += String.fromCharCode(e[t]);
			let r = btoa(n).replace(/\+/g, "-").replace(/\//g, "_");
			return t ? r : r.replace(/=+$/, "");
		}
		function s(e) {
			let t = "";
			for (let n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
			return btoa(t);
		}
		let c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
		function l(e) {
			let t = "", n = 0, r = 0;
			for (let i of e) for (n = n << 8 | i, r += 8; r >= 5;) t += c[n >>> r - 5 & 31], r -= 5;
			return r > 0 && (t += c[n << 5 - r & 31]), t;
		}
		function u(...e) {
			let t = new Uint8Array(e.reduce((e, t) => e + t.length, 0)), n = 0;
			for (let r of e) t.set(r, n), n += r.length;
			return t;
		}
		function d(e) {
			let t = /* @__PURE__ */ new Uint8Array(8);
			return new DataView(t.buffer).setBigUint64(0, BigInt(e)), t;
		}
		function f(e, t) {
			if (e.length !== t.length) return !1;
			let n = 0;
			for (let r = 0; r < e.length; r++) n |= e[r] ^ t[r];
			return n === 0;
		}
		async function p(e, n, r) {
			let i = await t.importKey("raw", e.length ? e : /* @__PURE__ */ new Uint8Array(64), {
				name: "HMAC",
				hash: "SHA-256"
			}, !1, ["sign"]), a = new Uint8Array(r);
			for (let e = 1, o = 0; o < r; e++, o += 32) {
				let s = new Uint8Array([
					e >>> 24,
					e >>> 16 & 255,
					e >>> 8 & 255,
					e & 255
				]), c = new Uint8Array(await t.sign("HMAC", i, u(n, s)));
				a.set(c.subarray(0, Math.min(32, r - o)), o);
			}
			return a;
		}
		function m(e) {
			let t = e.slice(), n = (e, t) => e << t | e >>> 32 - t;
			for (let e = 0; e < 8; e += 2) t[4] ^= n(t[0] + t[12], 7), t[8] ^= n(t[4] + t[0], 9), t[12] ^= n(t[8] + t[4], 13), t[0] ^= n(t[12] + t[8], 18), t[9] ^= n(t[5] + t[1], 7), t[13] ^= n(t[9] + t[5], 9), t[1] ^= n(t[13] + t[9], 13), t[5] ^= n(t[1] + t[13], 18), t[14] ^= n(t[10] + t[6], 7), t[2] ^= n(t[14] + t[10], 9), t[6] ^= n(t[2] + t[14], 13), t[10] ^= n(t[6] + t[2], 18), t[3] ^= n(t[15] + t[11], 7), t[7] ^= n(t[3] + t[15], 9), t[11] ^= n(t[7] + t[3], 13), t[15] ^= n(t[11] + t[7], 18), t[1] ^= n(t[0] + t[3], 7), t[2] ^= n(t[1] + t[0], 9), t[3] ^= n(t[2] + t[1], 13), t[0] ^= n(t[3] + t[2], 18), t[6] ^= n(t[5] + t[4], 7), t[7] ^= n(t[6] + t[5], 9), t[4] ^= n(t[7] + t[6], 13), t[5] ^= n(t[4] + t[7], 18), t[11] ^= n(t[10] + t[9], 7), t[8] ^= n(t[11] + t[10], 9), t[9] ^= n(t[8] + t[11], 13), t[10] ^= n(t[9] + t[8], 18), t[12] ^= n(t[15] + t[14], 7), t[13] ^= n(t[12] + t[15], 9), t[14] ^= n(t[13] + t[12], 13), t[15] ^= n(t[14] + t[13], 18);
			for (let n = 0; n < 16; n++) e[n] = e[n] + t[n] | 0;
		}
		function h(e, t, n, r) {
			r.set(e.subarray((2 * n - 1) * 16, 2 * n * 16));
			for (let i = 0; i < 2 * n; i++) {
				for (let t = 0; t < 16; t++) r[t] ^= e[i * 16 + t];
				m(r), t.set(r, ((i & 1) * n + (i >> 1)) * 16);
			}
		}
		function g(e, t, n) {
			let r = 32 * n, i = new Int32Array(r * t), a = new Int32Array(e), o = new Int32Array(r), s = /* @__PURE__ */ new Int32Array(16);
			for (let e = 0; e < t; e++) i.set(a, e * r), h(a, o, n, s), a.set(o);
			for (let e = 0; e < t; e++) {
				let e = a[(2 * n - 1) * 16] & t - 1;
				for (let t = 0; t < r; t++) a[t] ^= i[e * r + t];
				h(a, o, n, s), a.set(o);
			}
			return a;
		}
		function _(e) {
			let t = new DataView(e.buffer, e.byteOffset, e.byteLength), n = new Int32Array(e.length / 4);
			for (let e = 0; e < n.length; e++) n[e] = t.getInt32(e * 4, !0);
			return n;
		}
		function ee(e, t) {
			let n = new DataView(t.buffer, t.byteOffset, t.byteLength);
			for (let t = 0; t < e.length; t++) n.setInt32(t * 4, e[t], !0);
		}
		async function te(e, t, n, r, a, o) {
			if (n < 2 || n & n - 1) throw new i("corrupt", "scrypt cost is not a power of two");
			let s = 128 * r, c = await p(e, t, a * s);
			for (let e = 0; e < a; e++) {
				let t = c.subarray(e * s, (e + 1) * s);
				ee(g(_(t), n, r), t);
			}
			return p(e, c, o);
		}
		function ne(e) {
			let t = /* @__PURE__ */ new Uint8Array(16);
			for (let n = 0; n < 15; n++) t[n] = (e[n] << 1 | e[n + 1] >>> 7) & 255;
			return t[15] = e[15] << 1 & 255, e[0] & 128 && (t[15] ^= 135), t;
		}
		function v(e, t) {
			let n = new Uint8Array(e.length);
			for (let r = 0; r < e.length; r++) n[r] = e[r] ^ t[r];
			return n;
		}
		class re {
			constructor(e) {
				this.key = e, this.subkeys = null;
			}
			async cbcLast(e) {
				return new Uint8Array(await t.encrypt({
					name: "AES-CBC",
					iv: /* @__PURE__ */ new Uint8Array(16)
				}, this.key, e)).subarray(e.length - 16, e.length);
			}
			async mac(e) {
				if (this.subkeys === null) {
					let e = ne(await this.cbcLast(/* @__PURE__ */ new Uint8Array(16)));
					this.subkeys = [e, ne(e)];
				}
				let [t, n] = this.subkeys, r = Math.max(1, Math.ceil(e.length / 16)), i = new Uint8Array(r * 16);
				i.set(e);
				let a = i.subarray((r - 1) * 16);
				return e.length > 0 && e.length % 16 == 0 ? a.set(v(a, t)) : (a[e.length - (r - 1) * 16] = 128, a.set(v(a, n))), this.cbcLast(i);
			}
		}
		async function y(e, t, n) {
			let r = await e.mac(/* @__PURE__ */ new Uint8Array(16));
			for (let n of t) r = v(ne(r), await e.mac(n));
			let i;
			if (n.length >= 16) i = n.slice(), i.set(v(i.subarray(i.length - 16), r), i.length - 16);
			else {
				let e = /* @__PURE__ */ new Uint8Array(16);
				e.set(n), e[n.length] = 128, i = v(ne(r), e);
			}
			return e.mac(i);
		}
		function ie(e) {
			let t = e.slice();
			return t[8] &= 127, t[12] &= 127, t;
		}
		class ae {
			constructor(e, t) {
				this.cmac = e, this.ctrKey = t;
			}
			async encrypt(e, n) {
				let r = await y(this.cmac, n, e), i = await t.encrypt({
					name: "AES-CTR",
					counter: ie(r),
					length: 128
				}, this.ctrKey, e);
				return u(r, new Uint8Array(i));
			}
			async decrypt(e, n) {
				if (e.length < 16) throw new i("corrupt", "name too short");
				let r = e.subarray(0, 16), a = new Uint8Array(await t.decrypt({
					name: "AES-CTR",
					counter: ie(r),
					length: 128
				}, this.ctrKey, e.subarray(16)));
				if (!f(await y(this.cmac, n, a), r)) throw new i("corrupt", "name does not authenticate");
				return a;
			}
		}
		let b = 32768, x = {
			SIV_GCM: {
				header: 68,
				nonce: 12,
				overhead: 28
			},
			SIV_CTRMAC: {
				header: 88,
				nonce: 16,
				overhead: 48
			}
		};
		function S(e, t) {
			let { header: n, overhead: r } = x[e], i = t - n;
			if (i <= 0) return 0;
			let a = Math.floor(i / (b + r)), o = i % (b + r);
			return a * b + Math.max(0, o - r);
		}
		let oe = /[a-zA-Z0-9\-_]{20}(?:[a-zA-Z0-9\-_]{4})*(?:[a-zA-Z0-9\-_]{4}|[a-zA-Z0-9\-_]{3}=|[a-zA-Z0-9\-_]{2}==)/g, C = "recovery";
		async function se(e, t, n) {
			let r = 0;
			await Promise.all(Array.from({ length: Math.min(t, e.length) }, async () => {
				for (; r < e.length;) await n(e[r++]);
			}));
		}
		let w = ".cryptomator-vaults-";
		function T(t) {
			return e.getRandomValues(new Uint8Array(t));
		}
		function E() {
			return e.randomUUID();
		}
		async function ce(e) {
			return new Uint8Array(await t.digest("SHA-256", e));
		}
		let le = {
			HS256: "SHA-256",
			HS384: "SHA-384",
			HS512: "SHA-512"
		}, ue = 2 ** 15, de = "masterkeyfile:";
		async function fe(e, r, i, a, o) {
			let s = await te(n.encode(String(e).normalize("NFC")), r, i, a, 1, 32);
			try {
				return await t.importKey("raw", s, "AES-KW", !1, o);
			} finally {
				s.fill(0);
			}
		}
		async function pe(e, n) {
			if (e.version !== 999) throw new i("unsupported-format", "key file version " + e.version);
			let r = await fe(n, a(e.scryptSalt), e.scryptCostParam, e.scryptBlockSize, ["unwrapKey"]), o;
			try {
				let n = async (e) => new Uint8Array(await t.exportKey("raw", await t.unwrapKey("raw", a(e), r, "AES-KW", {
					name: "HMAC",
					hash: "SHA-256"
				}, !0, ["sign"])));
				o = {
					encRaw: await n(e.primaryMasterKey),
					macRaw: await n(e.hmacMasterKey)
				};
			} catch {
				throw new i("wrong-password");
			}
			if (!await he(o.macRaw, e)) throw o.encRaw.fill(0), o.macRaw.fill(0), new i("corrupt", "the key file's version does not authenticate");
			return o;
		}
		function me(e) {
			let t = /* @__PURE__ */ new Uint8Array(4);
			return new DataView(t.buffer).setInt32(0, e), t;
		}
		async function he(e, n) {
			let r;
			try {
				r = a(String(n.versionMac ?? ""));
			} catch {
				return !1;
			}
			let i = await t.importKey("raw", e, {
				name: "HMAC",
				hash: "SHA-256"
			}, !1, ["verify"]);
			return t.verify("HMAC", i, r, me(n.version));
		}
		async function ge({ encRaw: e, macRaw: r }, i, a = ue) {
			let o = T(8), c = await fe(i, o, a, 8, ["wrapKey"]), l = async (e) => new Uint8Array(await t.wrapKey("raw", await t.importKey("raw", e, {
				name: "HMAC",
				hash: "SHA-256"
			}, !0, ["sign"]), c, "AES-KW")), u = await t.importKey("raw", r, {
				name: "HMAC",
				hash: "SHA-256"
			}, !1, ["sign"]), d = {
				version: 999,
				scryptSalt: s(o),
				scryptCostParam: a,
				scryptBlockSize: 8,
				primaryMasterKey: s(await l(e)),
				hmacMasterKey: s(await l(r)),
				versionMac: s(new Uint8Array(await t.sign("HMAC", u, me(999))))
			};
			return n.encode(JSON.stringify(d, null, 2));
		}
		async function _e({ encRaw: e, macRaw: r }, i, a) {
			let s = (e) => o(n.encode(JSON.stringify(e)), !1), c = s({
				kid: i,
				typ: "JWT",
				alg: "HS256"
			}) + "." + s({
				jti: E(),
				format: 8,
				cipherCombo: a,
				shorteningThreshold: 220
			}), l = await t.importKey("raw", u(e, r), {
				name: "HMAC",
				hash: "SHA-256"
			}, !1, ["sign"]);
			return c + "." + o(new Uint8Array(await t.sign("HMAC", l, n.encode(c))), !1);
		}
		async function ve(e, { encRaw: r, macRaw: i }) {
			let a = Object.hasOwn(le, e.header.alg) ? le[e.header.alg] : null;
			if (a === null) return !1;
			let o = await t.importKey("raw", u(r, i), {
				name: "HMAC",
				hash: a
			}, !1, ["verify"]);
			return t.verify("HMAC", o, e.signature, n.encode(e.signed));
		}
		let ye = Array.from({ length: 256 }, (e, t) => {
			let n = t;
			for (let e = 0; e < 8; e++) n = n & 1 ? 3988292384 ^ n >>> 1 : n >>> 1;
			return n >>> 0;
		});
		function be(e) {
			let t = 4294967295;
			for (let n of e) t = ye[(t ^ n) & 255] ^ t >>> 8;
			return (t ^ 4294967295) >>> 0;
		}
		function xe(e, t) {
			let n = be(e), r = u(e, new Uint8Array([n & 255, n >>> 8 & 255])), i = [];
			for (let e = 0; e < r.length; e += 3) i.push(t[r[e] << 4 | r[e + 1] >> 4], t[(r[e + 1] & 15) << 8 | r[e + 2]]);
			return r.fill(0), i.join(" ");
		}
		function D(e, t) {
			let n = new Map(t.map((e, t) => [e, t])), r = String(e).trim().toLowerCase().split(/\s+/).filter(Boolean);
			if (r.length !== 44) throw new i("invalid-recovery-key", r.length + " words, not 44");
			let a = r.find((e) => !n.has(e));
			if (a) throw new i("invalid-recovery-key", "\"" + a + "\" is not a word of the list");
			let o = /* @__PURE__ */ new Uint8Array(66);
			for (let e = 0; e < r.length; e += 2) {
				let t = n.get(r[e]), i = n.get(r[e + 1]);
				o.set([
					t >> 4,
					(t & 15) << 4 | i >> 8,
					i & 255
				], e / 2 * 3);
			}
			let s = o.slice(0, 64), c = be(s);
			if (o[64] !== (c & 255) || o[65] !== (c >>> 8 & 255)) throw new i("invalid-recovery-key", "its check sum does not match");
			return s;
		}
		async function Se(e, t) {
			let n = await ce(t);
			return e + "." + [...n.slice(0, 4)].map((e) => e.toString(16).padStart(2, "0").toUpperCase()).join("") + ".bkup";
		}
		async function O(e) {
			let t;
			try {
				t = A(r.decode(await e.read(Ce)));
			} catch (e) {
				throw e instanceof i ? e : new i("unsupported-format", "vault.cryptomator unreadable: " + e.message);
			}
			let { header: n, payload: a } = t;
			if (a.format !== 8) throw new i("unsupported-format", "vault format " + a.format);
			if (!(a.cipherCombo in x)) throw new i("unsupported-format", "cipher combination " + a.cipherCombo);
			if (!Object.hasOwn(le, n.alg)) throw new i("unsupported-format", "signature " + n.alg);
			let o = String(n.kid || "");
			if (!o.startsWith(de)) throw new i("unsupported-key", o);
			let s = o.slice(14);
			if (!/^[^/\\]+$/.test(s)) throw new i("unsupported-key", o);
			return {
				config: t,
				name: s
			};
		}
		function k(e) {
			let t = String(e).normalize("NFC");
			if (t === "" || t === "." || t === ".." || /[/\\\u0000-\u001f\u007f]/.test(t) || t.length > 255) throw new i("invalid-name", t);
			return t;
		}
		let Ce = "vault.cryptomator";
		function A(e) {
			let t = e.trim().split(".");
			if (t.length !== 3) throw new i("unsupported-format", "vault.cryptomator is not a JWT");
			let n = (e) => JSON.parse(r.decode(a(e)));
			return {
				header: n(t[0]),
				payload: n(t[1]),
				signed: t[0] + "." + t[1],
				signature: a(t[2])
			};
		}
		function j(...e) {
			return e.filter((e) => e !== "").join("/");
		}
		class M {
			constructor(e, t, n) {
				this.storage = e, this.config = t, this.masterkeyFile = n, this.keys = null;
			}
			static async open(e) {
				let { config: t, name: n } = await O(e), i = JSON.parse(r.decode(await e.read(n))), a = new M(e, t, i);
				return a.masterkeyName = n, a;
			}
			get scheme() {
				return this.config.payload.cipherCombo;
			}
			get unlocked() {
				return this.keys !== null;
			}
			async unlock(e) {
				let t = await pe(this.masterkeyFile, e);
				try {
					await this.useKeys(t);
				} finally {
					t.encRaw.fill(0), t.macRaw.fill(0);
				}
			}
			async useKeys({ encRaw: e, macRaw: n }) {
				if (!await ve(this.config, {
					encRaw: e,
					macRaw: n
				})) throw new i("corrupt", "vault.cryptomator is not signed with this key");
				let r = (e, n) => t.importKey("raw", e, n, !1, ["encrypt", "decrypt"]);
				this.keys = {
					gcm: await r(e, "AES-GCM"),
					ctr: await r(e, "AES-CTR"),
					mac: await t.importKey("raw", n, {
						name: "HMAC",
						hash: "SHA-256"
					}, !1, ["sign", "verify"])
				}, this.siv = new ae(new re(await r(n, "AES-CBC")), this.keys.ctr), this.dirPaths = /* @__PURE__ */ new Map();
			}
			static async create(e, t, { cipherCombo: r = "SIV_GCM" } = {}) {
				if (typeof e.write != "function") throw new i("read-only");
				if (!(r in x)) throw new i("unsupported-format", "cipher combination " + r);
				let a = "masterkey.cryptomator";
				for (let t of [
					Ce,
					a,
					"d"
				]) if (await e.stat(t)) throw new i("exists-other", t);
				let o = {
					encRaw: T(32),
					macRaw: T(32)
				};
				try {
					await e.write(a, await ge(o, t), { create: !0 }), await e.write(Ce, n.encode(await _e(o, de + a, r)), { create: !0 });
					let i = await M.open(e);
					await i.useKeys(o);
					let s = await i.dirPath("");
					await e.mkdir("d", { existsOk: !0 }), await e.mkdir(s.split("/").slice(0, 2).join("/"), { existsOk: !0 }), await e.mkdir(s, { existsOk: !0 }), await e.write(j(s, "dirid.c9r"), await i.encryptContents(/* @__PURE__ */ new Uint8Array()), { create: !0 });
				} finally {
					o.encRaw.fill(0), o.macRaw.fill(0);
				}
				let s = await M.open(e);
				return await s.unlock(t), s;
			}
			async changePassword(e, t) {
				if (typeof this.storage.write != "function") throw new i("read-only");
				let n = this.masterkeyName, a = await this.storage.read(n), o = JSON.parse(r.decode(a)), s = await pe(o, e);
				try {
					await this.replaceKeyFile(n, a, await ge(s, t, o.scryptCostParam), s, t);
				} finally {
					s.encRaw.fill(0), s.macRaw.fill(0);
				}
			}
			async replaceKeyFile(e, t, n, a, o) {
				t && await this.storage.write(await Se(e, t), t), await this.storage.write(e, n, { create: !t });
				let s = JSON.parse(r.decode(await this.storage.read(e))), c = null;
				try {
					c = await pe(s, o);
				} catch {}
				let l = c !== null && f(c.encRaw, a.encRaw) && f(c.macRaw, a.macRaw);
				if (c?.encRaw.fill(0), c?.macRaw.fill(0), !l) throw t && await this.storage.write(e, t), new i("corrupt", "the new key file does not read back");
				this.masterkeyFile = s;
			}
			async recoveryKey(e, t) {
				let n = await pe(JSON.parse(r.decode(await this.storage.read(this.masterkeyName))), e), i = u(n.encRaw, n.macRaw);
				try {
					return xe(i, t);
				} finally {
					i.fill(0), n.encRaw.fill(0), n.macRaw.fill(0);
				}
			}
			static async resetPassword(e, t, n, r) {
				if (typeof e.write != "function") throw new i("read-only");
				let { config: a, name: o } = await O(e), s = D(t, r), c = {
					encRaw: s.slice(0, 32),
					macRaw: s.slice(32)
				};
				s.fill(0);
				try {
					if (!await ve(a, c)) throw new i("invalid-recovery-key", "it is not this vault's");
					let t = await e.read(o).catch((e) => {
						if (e?.code === "not-found") return null;
						throw e;
					}), r = new M(e, a, null);
					r.masterkeyName = o, await r.replaceKeyFile(o, t, await ge(c, n), c, n);
				} finally {
					c.encRaw.fill(0), c.macRaw.fill(0);
				}
				let l = await M.open(e);
				return await l.unlock(n), l;
			}
			lock() {
				this.keys = null, this.siv = null, this.dirPaths = null;
			}
			requireKeys() {
				if (!this.keys) throw new i("locked");
			}
			async dirPath(e) {
				if (this.requireKeys(), !this.dirPaths.has(e)) {
					let r = await this.siv.encrypt(n.encode(e), []), i = l(new Uint8Array(await t.digest("SHA-1", r)));
					this.dirPaths.set(e, j("d", i.slice(0, 2), i.slice(2)));
				}
				return this.dirPaths.get(e);
			}
			async extractName(e, t, i = 0, o = e.length) {
				let s = new RegExp(oe.source, "g");
				s.lastIndex = i;
				let c = s.exec(e.slice(0, o));
				if (c === null) return null;
				let l = c[0];
				try {
					return {
						name: r.decode(await this.siv.decrypt(a(l), [n.encode(t)])),
						extracted: l
					};
				} catch {
					let n = l.search(/[-_]/);
					if (n === -1) return null;
					let r = Math.max(l.lastIndexOf("-"), l.lastIndexOf("_")), a = await this.extractName(e, t, c.index + Math.max(1, n), o);
					return a === null ? this.extractName(e, t, i, c.index + l.length - Math.max(1, l.length - r)) : a;
				}
			}
			async decryptName(e, t) {
				let o = e.endsWith(".c9r") ? e.slice(0, -4) : e;
				try {
					return r.decode(await this.siv.decrypt(a(o), [n.encode(t)]));
				} catch (e) {
					throw e instanceof i ? e : new i("corrupt", "name not decryptable");
				}
			}
			async list(e) {
				let t = await this.dirPath(e), n = await this.storage.list(t), r = await Promise.all(n.map((n) => this.describe(t, n, e))), i = r.filter((e) => e !== null && !e.conflict);
				for (let n of r.filter((e) => e?.conflict)) {
					let r = await this.resolveConflict(t, e, n);
					r !== null && i.push(r);
				}
				let a = await Promise.all(i.map(async (e) => e.type !== "dir" || await this.storage.stat?.(await this.dirPath(e.dirId)).then((e) => e !== null, () => !0) !== !1));
				return i.filter((e, t) => a[t]).sort((e, t) => (t.type === "dir") - (e.type === "dir") || e.name.localeCompare(t.name));
			}
			async resolveConflict(e, t, n) {
				if (typeof this.storage.move != "function") return null;
				let r = n.found.extracted + ".c9r", i = j(e, r);
				try {
					try {
						return await this.storage.move(n.path, i), this.describe(e, {
							...n.entry,
							name: r
						}, t);
					} catch (e) {
						if (e?.code !== "exists") throw e;
					}
					let a = await this.storage.stat(i);
					if (n.entry.isDir && a?.isDir) {
						let r = await this.compareTypeFile(n.path, i, "dir.c9r", 36, !0);
						if (r.both) return r.same ? this.removeDuplicate(n.path) : this.renameConflict(e, t, n);
						let a = await this.compareTypeFile(n.path, i, "symlink.c9r", 32767, !1);
						if (a.both) return a.same ? this.removeDuplicate(n.path) : this.renameConflict(e, t, n);
						if (!r.conflicting && !a.conflicting || !r.canonical && !a.canonical) return null;
					}
					return this.renameConflict(e, t, n);
				} catch {
					return null;
				}
			}
			async removeDuplicate(e) {
				return await this.storage.remove(e), null;
			}
			async compareTypeFile(e, t, n, r, i) {
				let a = (e) => this.storage.read(j(e, n)).then((e) => e.subarray(0, r), (e) => {
					if (e?.code === "not-found") return /* @__PURE__ */ new Uint8Array();
					throw e;
				}), [o, s] = await Promise.all([a(e), a(t)]), c = i ? r : 1, l = o.length >= c, u = s.length >= c;
				return {
					conflicting: l,
					canonical: u,
					both: l && u,
					same: l && u && f(o, s)
				};
			}
			async renameConflict(e, t, r) {
				let i = r.found.name, a = i.lastIndexOf("."), s = a > 0 ? i.slice(a) : "", c = a > 0 ? i.slice(0, a) : i, l = r.entry.name, u = l.indexOf(r.found.extracted) + r.found.extracted.length, d = l.slice(u, l.length - 4), f = this.config.payload.shorteningThreshold ?? 220, p = Math.trunc((f - 4) / 4) * 3 - 16 - s.length, m = d.slice(0, Math.min(d.length, Math.trunc(p / 2))), h = c.slice(0, Math.max(0, Math.min(c.length, p - Math.max(4, m.length)))), g = [h + m + s];
				for (let e = 1; e < 10; e++) g.push(h + " (" + e + ")" + s);
				for (let i of g) {
					let a = o(await this.siv.encrypt(n.encode(i), [n.encode(t)]), !0) + ".c9r", s = j(e, a);
					if (await this.storage.stat(s) === null) return await this.storage.move(r.path, s), this.describe(e, {
						...r.entry,
						name: a
					}, t);
				}
				return null;
			}
			async describe(e, t, n) {
				let r = j(e, t.name), i = await this.describeEntry(e, t, n, r);
				return i !== null && t.mtime && !i.mtime && (i.mtime = t.mtime), i;
			}
			async describeEntry(e, t, n, i) {
				try {
					if (t.name.endsWith(".c9s") && t.isDir) {
						let e = await this.decryptName(r.decode(await this.storage.read(j(i, "name.c9s"))).trim(), n), t = await this.storage.list(i), a = t.find((e) => e.name === "contents.c9r");
						return a ? {
							name: e,
							type: "file",
							size: S(this.scheme, a.size),
							path: j(i, "contents.c9r"),
							mtime: a.mtime
						} : this.describeNode(e, i, t.map((e) => e.name));
					}
					if (!t.name.endsWith(".c9r")) return null;
					let e = await this.extractName(t.name.slice(0, -4), n);
					if (e === null) return null;
					if (t.name !== e.extracted + ".c9r") return t.name.startsWith(".") ? null : {
						conflict: !0,
						entry: t,
						found: e,
						path: i
					};
					let a = e.name;
					return t.isDir ? this.describeNode(a, i, null) : {
						name: a,
						type: "file",
						size: S(this.scheme, t.size),
						path: i
					};
				} catch (e) {
					return {
						name: t.name,
						type: "broken",
						error: e.message,
						path: i
					};
				}
			}
			async describeNode(e, t, n) {
				let a = async (e) => {
					if (n !== null && !n.includes(e)) return null;
					try {
						return await this.storage.read(j(t, e));
					} catch (e) {
						if (e instanceof i && e.code === "not-found") return null;
						throw e;
					}
				}, o = await a("dir.c9r");
				if (o !== null) return {
					name: e,
					type: "dir",
					dirId: r.decode(o).trim(),
					path: t
				};
				let s = await a("symlink.c9r");
				if (s !== null) return {
					name: e,
					type: "link",
					target: r.decode(await this.decryptContents(s)),
					path: t
				};
				throw new i("corrupt", "neither a directory nor a link");
			}
			async readFile(e, t, n) {
				return this.decryptContents(await this.storage.read(e.path, n), t);
			}
			async decryptContents(e, t) {
				this.requireKeys();
				let n = x[this.scheme];
				if (e.length === 0) return /* @__PURE__ */ new Uint8Array();
				if (e.length < n.header) throw new i("corrupt", "file header too short");
				let r = e.subarray(0, n.header), a = r.subarray(0, n.nonce), o = await this.decryptHeader(r, a), s = e.subarray(n.header), c = b + n.overhead, l = new Uint8Array(S(this.scheme, e.length));
				for (let e = 0, n = 0; n < s.length; e++, n += c) {
					let r = s.subarray(n, Math.min(n + c, s.length)), i = await this.decryptChunk(r, e, a, o);
					l.set(i, e * b), t && t(Math.min(n + c, s.length), s.length);
				}
				return l;
			}
			async decryptHeader(e, n) {
				let r;
				if (this.scheme === "SIV_GCM") try {
					r = new Uint8Array(await t.decrypt({
						name: "AES-GCM",
						iv: n
					}, this.keys.gcm, e.subarray(12)));
				} catch {
					throw new i("corrupt", "file header does not authenticate");
				}
				else {
					let a = e.subarray(16, 56);
					if (!await t.verify("HMAC", this.keys.mac, e.subarray(56, 88), e.subarray(0, 56))) throw new i("corrupt", "file header does not authenticate");
					r = new Uint8Array(await t.decrypt({
						name: "AES-CTR",
						counter: n,
						length: 128
					}, this.keys.ctr, a));
				}
				let a = r.subarray(8, 40), o = this.scheme === "SIV_GCM" ? "AES-GCM" : "AES-CTR", s = await t.importKey("raw", a, o, !1, ["decrypt"]);
				return r.fill(0), s;
			}
			async decryptChunk(e, n, r, a) {
				try {
					if (this.scheme === "SIV_GCM") {
						let i = e.subarray(0, 12);
						return new Uint8Array(await t.decrypt({
							name: "AES-GCM",
							iv: i,
							additionalData: u(d(n), r)
						}, a, e.subarray(12)));
					}
					let i = e.subarray(0, 16), o = e.subarray(16, e.length - 32), s = e.subarray(e.length - 32);
					if (!await t.verify("HMAC", this.keys.mac, s, u(r, d(n), i, o))) throw Error("mac");
					return new Uint8Array(await t.decrypt({
						name: "AES-CTR",
						counter: i,
						length: 128
					}, a, o));
				} catch {
					throw new i("corrupt", "chunk " + n + " does not authenticate");
				}
			}
			requireWritable() {
				if (this.requireKeys(), typeof this.storage.write != "function") throw new i("read-only");
			}
			async entryPath(e, r) {
				let i = await this.dirPath(e), a = o(await this.siv.encrypt(n.encode(r), [n.encode(e)]), !0) + ".c9r", s = this.config.payload.shorteningThreshold ?? 220;
				return a.length > s ? {
					folder: i,
					path: j(i, o(new Uint8Array(await t.digest("SHA-1", n.encode(a))), !0) + ".c9s"),
					long: !0,
					fullName: a
				} : {
					folder: i,
					path: j(i, a),
					long: !1,
					fullName: a
				};
			}
			async existing(e) {
				let t = await this.storage.stat(e.path);
				if (!t) return null;
				if (!t.isDir) return "file";
				let n = (await this.storage.list(e.path)).map((e) => e.name);
				return n.includes("contents.c9r") ? "file" : n.includes("dir.c9r") ? "dir" : n.includes("symlink.c9r") ? "link" : "unknown";
			}
			async startEncryption() {
				this.requireKeys();
				let e = x[this.scheme], n = this.scheme === "SIV_GCM", r = T(e.nonce), i = T(32), a = u((/* @__PURE__ */ new Uint8Array(8)).fill(255), i), o;
				if (n) o = u(r, new Uint8Array(await t.encrypt({
					name: "AES-GCM",
					iv: r
				}, this.keys.gcm, a)));
				else {
					let e = new Uint8Array(await t.encrypt({
						name: "AES-CTR",
						counter: r,
						length: 128
					}, this.keys.ctr, a));
					o = u(r, e, new Uint8Array(await t.sign("HMAC", this.keys.mac, u(r, e))));
				}
				let s = await t.importKey("raw", i, n ? "AES-GCM" : "AES-CTR", !1, ["encrypt"]);
				a.fill(0), i.fill(0);
				let c = this.keys;
				return {
					header: o,
					async encryptChunk(i, a) {
						let o = T(e.nonce);
						if (n) return u(o, new Uint8Array(await t.encrypt({
							name: "AES-GCM",
							iv: o,
							additionalData: u(d(i), r)
						}, s, a)));
						let l = new Uint8Array(await t.encrypt({
							name: "AES-CTR",
							counter: o,
							length: 128
						}, s, a));
						return u(o, l, new Uint8Array(await t.sign("HMAC", c.mac, u(r, d(i), o, l))));
					}
				};
			}
			encryptedSize(e) {
				let t = x[this.scheme];
				return t.header + e + Math.ceil(e / b) * t.overhead;
			}
			async encryptContents(e, t) {
				let n = await this.startEncryption(), r = Math.ceil(e.length / b), i = new Uint8Array(this.encryptedSize(e.length));
				i.set(n.header);
				for (let a = 0, o = n.header.length; a < r; a++) {
					let s = await n.encryptChunk(a, e.subarray(a * b, Math.min((a + 1) * b, e.length)));
					i.set(s, o), o += s.length, t && t(a + 1, r);
				}
				return i;
			}
			async *encryptedParts(e, t, n) {
				let r = await this.startEncryption(), i = 32 * b, a = [r.header], o = r.header.length;
				for (let s = 0, c = 0; s < e.size; s += i) {
					let l = await e.read(s, Math.min(s + i, e.size));
					for (let e = 0; e < l.length; e += b, c++) {
						let n = await r.encryptChunk(c, l.subarray(e, Math.min(e + b, l.length)));
						a.push(n), o += n.length, o >= t && (yield u(...a), a = [], o = 0);
					}
					n?.(Math.min(s + i, e.size), e.size);
				}
				o > 0 && (yield u(...a));
			}
			async checkStoredStream(e, t, n) {
				let r = x[this.scheme], a = this.encryptedSize(t.size), o = await this.storage.stat(e);
				if (!o || o.size !== a) throw new i("corrupt", "the stored file has " + (o?.size ?? "no") + " bytes, not " + a);
				let s = await this.storage.readRange(e, 0, r.header), c = s.subarray(0, r.nonce), l = await this.decryptHeader(s, c), u = b + r.overhead, d = Math.ceil(t.size / b);
				for (let o = 0; o < d; o += 32) {
					let s = Math.min(o + 32, d), p = r.header + o * u, m = await this.storage.readRange(e, p, Math.min(r.header + s * u, a)), h = await t.read(o * b, Math.min(s * b, t.size));
					for (let e = o; e < s; e++) {
						let t = (e - o) * u, n = await this.decryptChunk(m.subarray(t, Math.min(t + u, m.length)), e, c, l);
						if (!f(n, h.subarray((e - o) * b, (e - o) * b + n.length))) throw new i("corrupt", "the stored file differs from the one written (chunk " + e + ")");
					}
					n?.(Math.min(s * b, t.size), t.size);
				}
			}
			async writeFileStream(e, t, r, a = {}) {
				this.requireWritable();
				let { replace: o = !1, onProgress: s, partSize: c = 10485760 } = a, l = (e) => (t, n) => s?.(e, t, n), u = k(t), d = await this.entryPath(e, u), f = await this.existing(d);
				if (f !== null && (f !== "file" || !o)) throw new i(f === "file" ? "exists" : "exists-other", u);
				let p = this.encryptedSize(r.size), m = d.long ? j(d.path, "contents.c9r") : d.path, h = this.stagingPath(), g = d.long && f === null, _ = g ? j(h, "contents.c9r") : h;
				try {
					g && (await this.storage.mkdir(h), await this.storage.write(j(h, "name.c9s"), n.encode(d.fullName), { create: !0 })), await this.storage.writeParts(_, p, this.encryptedParts(r, c, l("upload")), { create: !0 }), await this.checkStoredStream(_, r, l("verify")), g ? await this.storage.move(h, d.path) : await this.storage.move(h, m, { overwrite: f !== null });
				} catch (e) {
					throw await this.storage.remove(h).catch(() => {}), e;
				}
				return {
					name: u,
					path: m,
					size: r.size
				};
			}
			async readFileStream(e, t, n) {
				for await (let r of this.decryptedPieces(e, n)) await t(r);
			}
			async *decryptedPieces(e, t) {
				this.requireKeys();
				let n = x[this.scheme], r = await this.storage.stat(e.path);
				if (!r || r.size === 0) return;
				if (r.size < n.header) throw new i("corrupt", "file header too short");
				let a = await this.storage.readRange(e.path, 0, n.header), o = a.subarray(0, n.nonce), s = await this.decryptHeader(a, o), c = b + n.overhead, l = S(this.scheme, r.size), d = Math.ceil((r.size - n.header) / c);
				for (let i = 0; i < d; i += 64) {
					let a = Math.min(i + 64, d), f = await this.storage.readRange(e.path, n.header + i * c, Math.min(n.header + a * c, r.size)), p = [];
					for (let e = i; e < a; e++) {
						let t = (e - i) * c;
						p.push(await this.decryptChunk(f.subarray(t, Math.min(t + c, f.length)), e, o, s));
					}
					yield u(...p), t?.(Math.min(a * b, l), l);
				}
			}
			async openFile(e) {
				this.requireKeys();
				let t = x[this.scheme], n = await this.storage.stat(e.path);
				if (!n) throw new i("not-found", e.path);
				if (n.size > 0 && n.size < t.header) throw new i("corrupt", "file header too short");
				let r = S(this.scheme, n.size), a = b + t.overhead, o = /* @__PURE__ */ new Map(), s = (e, t) => {
					o.delete(e), o.set(e, t);
				}, c = null, l = () => (c ??= this.storage.readRange(e.path, 0, t.header).then(async (e) => {
					let n = e.subarray(0, t.nonce);
					return {
						nonce: n,
						contentKey: await this.decryptHeader(e, n)
					};
				}), c.catch(() => {
					c = null;
				}), c);
				return {
					size: r,
					read: async (i, c) => {
						if (i = Math.max(0, i), c = Math.min(c, r), c <= i) return /* @__PURE__ */ new Uint8Array();
						let u = Math.floor(i / b), d = Math.ceil(c / b), f = u;
						for (; f < d && o.has(f);) s(f, o.get(f)), f++;
						if (f < d) {
							let { nonce: r, contentKey: i } = await l(), o = await this.storage.readRange(e.path, t.header + f * a, Math.min(t.header + d * a, n.size));
							for (let e = f; e < d; e++) {
								let t = (e - f) * a;
								s(e, await this.decryptChunk(o.subarray(t, Math.min(t + a, o.length)), e, r, i));
							}
						}
						let p = new Uint8Array(c - i);
						for (let e = u; e < d; e++) {
							let t = o.get(e), n = Math.max(i - e * b, 0), r = Math.min(c - e * b, t.length);
							p.set(t.subarray(n, r), e * b + n - i);
						}
						for (; o.size > 128;) o.delete(o.keys().next().value);
						return p;
					}
				};
			}
			stagingPath() {
				return w + E() + ".tmp";
			}
			async removeLeftovers({ olderThan: e = 864e5, now: t = Date.now() } = {}) {
				if (this.requireKeys(), typeof this.storage.write != "function") return [];
				let n = [];
				for (let r of await this.storage.list("")) r.name.startsWith(w) && r.name.endsWith(".tmp") && r.mtime && t - r.mtime.getTime() >= e && (await this.storage.remove(r.name), n.push(r.name));
				return n;
			}
			async stageAndMove(e, t, n) {
				let r = this.stagingPath();
				await this.storage.mkdir(r);
				try {
					for (let [e, n] of Object.entries(t)) await this.storage.write(j(r, e), n, { create: !0 });
					n && await n(r), await this.storage.move(r, e.path);
				} catch (e) {
					throw await this.storage.remove(r).catch(() => {}), e;
				}
			}
			async checkStored(e, t, n) {
				let r = await this.storage.read(e, n), a;
				try {
					a = await this.decryptContents(r);
				} catch (e) {
					throw new i("corrupt", "the stored file does not decrypt: " + e.message);
				}
				if (!f(await ce(a), t)) throw new i("corrupt", "the stored file differs from the one written");
			}
			async writeFile(e, t, r, a = {}) {
				this.requireWritable();
				let { replace: o = !1, onProgress: s } = a, c = (e) => (t, n) => s?.(e, t, n), l = k(t), u = await this.entryPath(e, l), d = await this.existing(u);
				if (d !== null && (d !== "file" || !o)) throw new i(d === "file" ? "exists" : "exists-other", l);
				let p = await ce(r), m = await this.encryptContents(r, c("encrypt"));
				if (!f(await ce(await this.decryptContents(m)), p)) throw new i("corrupt", "the encryption does not read back");
				let h = u.long ? j(u.path, "contents.c9r") : u.path;
				if (u.long && d === null) return await this.stageAndMove(u, {
					"name.c9s": n.encode(u.fullName),
					"contents.c9r": m
				}, (e) => this.checkStored(j(e, "contents.c9r"), p, c("verify"))), {
					name: l,
					path: h,
					size: r.length
				};
				let g = this.stagingPath();
				try {
					await this.storage.write(g, m, {
						create: !0,
						onProgress: c("upload")
					}), await this.checkStored(g, p, c("verify")), await this.storage.move(g, h, { overwrite: d !== null });
				} catch (e) {
					throw await this.storage.remove(g).catch(() => {}), e;
				}
				return {
					name: l,
					path: h,
					size: r.length
				};
			}
			async createDirectory(e, t) {
				this.requireWritable();
				let r = k(t), a = await this.entryPath(e, r);
				if (await this.existing(a) !== null) throw new i("exists-other", r);
				let o = E(), s = await this.dirPath(o);
				await this.storage.mkdir(s.split("/").slice(0, 2).join("/"), { existsOk: !0 }), await this.storage.mkdir(s);
				try {
					await this.storage.write(j(s, "dirid.c9r"), await this.encryptContents(n.encode(o)), { create: !0 });
					let e = { "dir.c9r": n.encode(o) };
					a.long && (e["name.c9s"] = n.encode(a.fullName)), await this.stageAndMove(a, e);
				} catch (e) {
					throw await this.storage.remove(s).catch(() => {}), e;
				}
				let c = (await this.list(e)).find((e) => e.type === "dir" && e.dirId === o);
				if (!c || c.name !== r) throw new i("corrupt", "the new folder does not read back");
				return {
					name: r,
					dirId: o
				};
			}
			async ensureDirectory(e, t) {
				this.requireWritable();
				let n = await this.findEntry(e, t);
				if (n === null) return {
					...await this.createDirectory(e, t),
					created: !0
				};
				if (n.kind !== "dir") throw new i("exists-other", n.name);
				return {
					name: n.name,
					dirId: await this.entryDirId(n),
					created: !1
				};
			}
			async findEntry(e, t) {
				let n = k(t), r = await this.entryPath(e, n), a = await this.existing(r);
				if (a === null) return null;
				if (a === "unknown") throw new i("corrupt", "the entry of " + n + " is neither file, folder nor link");
				return {
					...r,
					name: n,
					kind: a
				};
			}
			async entryDirId(e) {
				return r.decode(await this.storage.read(j(e.path, "dir.c9r"))).trim();
			}
			async moveEntry(e, t, n, r, a = {}) {
				this.requireWritable();
				let o = await this.findEntry(e, t);
				if (o === null) throw new i("not-found", String(t));
				let s = k(r ?? o.name);
				if (e === n && s === o.name) return { name: s };
				if (o.kind === "dir" && e !== n) {
					let e = a.ancestors;
					if (!Array.isArray(e) || e[e.length - 1] !== n) throw new i("invalid-move", "the target's ancestors are not known");
					let t = await this.entryDirId(o);
					if (e.includes(t)) throw new i("invalid-move", o.name);
				}
				let c = await this.entryPath(n, s);
				if (await this.existing(c) !== null) throw new i("exists-other", s);
				return !o.long && !c.long ? (await this.storage.move(o.path, c.path), { name: s }) : (await this.rebuildEntry(o, c), await this.storage.remove(o.path), { name: s });
			}
			async rebuildEntry(e, t) {
				let a = this.stagingPath(), o = {
					file: "contents.c9r",
					dir: "dir.c9r",
					link: "symlink.c9r"
				}[e.kind], s = e.long || e.kind !== "file" ? j(e.path, o) : e.path, c = t.long || e.kind !== "file" ? j(a, o) : a;
				try {
					if (c !== a && await this.storage.mkdir(a), await this.storage.copy(s, c), t.long && await this.storage.write(j(a, "name.c9s"), n.encode(t.fullName), { create: !0 }), e.kind !== "dir") await this.decryptContents(await this.storage.read(c));
					else if (r.decode(await this.storage.read(c)).trim() !== await this.entryDirId(e)) throw new i("corrupt", "the copied folder entry differs");
					await this.storage.move(a, t.path);
				} catch (e) {
					throw await this.storage.remove(a).catch(() => {}), e;
				}
			}
			async subtree(e) {
				let t = [e];
				for (let n of await this.list(e)) if (n.type === "dir") t.push(...await this.subtree(n.dirId));
				else if (n.type === "broken" && n.path.endsWith(".c9r")) {
					let e = await this.storage.read(j(n.path, "dir.c9r")).then((e) => r.decode(e).trim(), () => null);
					e !== null && t.push(...await this.subtree(e));
				}
				return t;
			}
			async removeEntry(e, t) {
				this.requireWritable();
				let n = await this.findEntry(e, t);
				if (n === null) throw new i("not-found", String(t));
				if (n.kind !== "dir") return await this.storage.remove(n.path), {
					name: n.name,
					folders: 0
				};
				let r = await this.subtree(await this.entryDirId(n));
				await this.storage.remove(n.path);
				for (let e of r) await this.storage.remove(await this.dirPath(e));
				return {
					name: n.name,
					folders: r.length
				};
			}
			async checkHealth(e) {
				this.requireKeys();
				let t = [], n = (e, n, r, i = {}) => t.push({
					kind: e,
					severity: n,
					path: r,
					fixable: !1,
					...i
				}), i = async (e) => {
					try {
						return await this.storage.list(e);
					} catch (e) {
						if (e?.code === "not-found") return [];
						throw e;
					}
				}, a = /* @__PURE__ */ new Map([["", null]]), o = /* @__PURE__ */ new Map(), s = [];
				for (let e of (await i("d")).filter((e) => e.isDir)) for (let t of (await i("d/" + e.name)).filter((e) => e.isDir)) {
					let r = j("d", e.name, t.name), a = await i(r);
					o.set(r, a.some((e) => !e.isDir && e.name === "dirid.c9r"));
					for (let e of a) e.isDir ? s.push(j(r, e.name)) : e.name === "dir.c9r" && n("LooseDirFile", "INFO", j(r, e.name), { fixable: !0 });
				}
				let c = 0;
				await se(s, 8, async (t) => {
					let o = t.split("/").pop(), l = o.endsWith(".c9r"), u = o.endsWith(".c9s"), d = await i(t), f = (e) => d.find((t) => !t.isDir && t.name === e), p = f("dir.c9r");
					if (p) {
						let e = j(t, "dir.c9r");
						if (!l && !u) n("LooseDirFile", "INFO", e, { fixable: !0 });
						else if (p.size > 36) n("ObeseDirFile", "CRITICAL", e);
						else if (p.size === 0) n("EmptyDirFile", "CRITICAL", e, { fixable: !0 });
						else {
							let t = r.decode(await this.storage.read(e));
							a.has(t) ? n("DirIdCollision", "CRITICAL", e, {
								dirId: t,
								other: a.get(t)
							}) : a.set(t, e);
						}
					}
					if (l || u) {
						let e = [
							p && "DIRECTORY",
							f("symlink.c9r") && "SYMLINK",
							u && f("contents.c9r") && "FILE"
						].filter(Boolean);
						e.length === 0 ? n("UnknownType", "CRITICAL", t, { fixable: d.length === 0 }) : e.length > 1 && n("AmbiguousType", "CRITICAL", t, { types: e });
					}
					u && await this.checkShortened(t, f("name.c9s"), n), e?.(++c, s.length);
				});
				for (let [e, t] of a) {
					let r = await this.dirPath(e);
					o.has(r) ? (o.get(r) || n("MissingDirIdBackup", "INFO", r, {
						dirId: e,
						fixable: !0
					}), o.delete(r)) : n("MissingContentDir", "WARN", t ?? r, {
						dirId: e,
						fixable: !0
					});
				}
				for (let e of o.keys()) n("OrphanContentDir", "WARN", e, { fixable: !0 });
				let l = {
					CRITICAL: 0,
					WARN: 1,
					INFO: 2
				};
				return t.sort((e, t) => l[e.severity] - l[t.severity] || e.kind.localeCompare(t.kind) || e.path.localeCompare(t.path));
			}
			async checkShortened(e, i, a) {
				let s = j(e, "name.c9s");
				if (!i) {
					a("MissingLongName", "CRITICAL", e);
					return;
				}
				if (i.size > 10240) {
					a("ObeseNameFile", "CRITICAL", s);
					return;
				}
				let c = r.decode(await this.storage.read(s)), l = c.indexOf(".c9r");
				if (l === -1 || !/^[A-Za-z0-9_-]*={0,2}$/.test(c.slice(0, l)) || c.slice(0, l).length % 4 != 0) {
					a("NotDecodableLongName", "CRITICAL", s);
					return;
				}
				if (c.length > l + 4) {
					a("TrailingBytesInNameFile", "WARN", s, {
						longName: c,
						fixable: !0
					});
					return;
				}
				let u = o(new Uint8Array(await t.digest("SHA-1", n.encode(c))), !0) + ".c9s";
				e.split("/").pop() !== u && a("LongShortNamesMismatch", "WARN", e, {
					expected: u,
					fixable: !0
				});
			}
			async repair(e) {
				this.requireWritable();
				let t = (e) => e.split("/").slice(0, -1).join("/");
				switch (e.kind) {
					case "LooseDirFile":
						await this.storage.remove(e.path);
						return;
					case "EmptyDirFile":
						await this.storage.remove(e.path), (await this.storage.list(t(e.path))).length === 0 && await this.storage.remove(t(e.path));
						return;
					case "MissingContentDir":
					case "MissingDirIdBackup": {
						let r = await this.dirPath(e.dirId);
						await this.storage.mkdir(t(r), { existsOk: !0 }), await this.storage.mkdir(r, { existsOk: !0 }), await this.storage.write(j(r, "dirid.c9r"), await this.encryptContents(n.encode(e.dirId)), { create: !0 });
						return;
					}
					case "LongShortNamesMismatch":
						await this.storage.move(e.path, j(t(e.path), e.expected));
						return;
					case "TrailingBytesInNameFile":
						await this.storage.write(e.path, n.encode(e.longName.slice(0, e.longName.indexOf(".c9r") + 4)));
						return;
					case "UnknownType":
						await this.storage.remove(e.path);
						return;
					case "OrphanContentDir":
						await this.adoptOrphan(e.path);
						return;
					default: throw new i("not-repairable", e.kind);
				}
			}
			async adoptOrphan(e) {
				let a = j(await this.dirPath(""), await this.encryptedName("LOST+FOUND", "")), s = j(a, "dir.c9r");
				if (await this.storage.stat(s)) {
					if (r.decode(await this.storage.read(s)) !== C) throw new i("exists-other", "/LOST+FOUND");
				} else await this.storage.mkdir(a, { existsOk: !0 }), await this.storage.write(s, n.encode(C), { create: !0 });
				let c = await this.ensureContentDir(C);
				if (c === e) return;
				let l = j(c, await this.encryptedName(e.split("/").slice(1).join(""), C)), u = j(l, "dir.c9r"), d;
				await this.storage.stat(u) ? d = r.decode(await this.storage.read(u)) : (d = E(), await this.storage.mkdir(l, { existsOk: !0 }), await this.storage.write(u, n.encode(d), { create: !0 }));
				let f = await this.ensureContentDir(d), p = null;
				try {
					p = r.decode(await this.decryptContents(await this.storage.read(j(e, "dirid.c9r"))));
				} catch {}
				let m = Math.floor(Math.random() * 65536).toString(32), h = {
					file: 0,
					directory: 0,
					symlink: 0
				}, g = "_withVeryLongName".repeat(11), _ = await this.storage.list(e);
				for (let i of _) {
					if (i.name.length < 28 || !(i.name.endsWith(".c9r") || i.name.endsWith(".c9s"))) continue;
					let a = i.name.endsWith(".c9s"), s = j(e, i.name), c = null;
					if (p !== null) try {
						let e = a ? r.decode(await this.storage.read(j(s, "name.c9s"))) : i.name;
						c = await this.decryptName(e, p);
					} catch {}
					if (c === null) {
						let e = i.isDir ? await this.storage.list(s) : [], t = e.some((e) => e.name === "dir.c9r") ? "directory" : e.some((e) => e.name === "symlink.c9r") ? "symlink" : "file";
						c = t + ++h[t] + "_" + m + (a ? g : "");
					}
					let l = await this.encryptedName(c, d);
					if (a) {
						let e = o(new Uint8Array(await t.digest("SHA-1", n.encode(l))), !0) + ".c9s";
						await this.storage.move(s, j(f, e)), await this.storage.write(j(f, e, "name.c9s"), n.encode(l));
					} else await this.storage.move(s, j(f, l));
				}
				await this.storage.remove(j(e, "dirid.c9r"));
				for (let t of await this.storage.list(e)) await this.storage.move(j(e, t.name), j(f, t.name));
				await this.storage.remove(e);
			}
			async encryptedName(e, t) {
				return o(await this.siv.encrypt(n.encode(e), [n.encode(t)]), !0) + ".c9r";
			}
			async ensureContentDir(e) {
				let t = await this.dirPath(e);
				return await this.storage.mkdir(t.split("/").slice(0, 2).join("/"), { existsOk: !0 }), await this.storage.mkdir(t, { existsOk: !0 }), await this.storage.stat(j(t, "dirid.c9r")) || await this.storage.write(j(t, "dirid.c9r"), await this.encryptContents(n.encode(e)), { create: !0 }), t;
			}
		}
		return {
			Vault: M,
			VaultError: i,
			cleartextSize: S,
			checkName: k,
			scrypt: te,
			Siv: ae,
			Cmac: re,
			base32Encode: l,
			base64UrlEncode: o,
			base64Decode: a,
			encodeRecoveryKey: xe,
			decodeRecoveryKey: D,
			VAULT_CONFIG: Ce,
			STAGING_PREFIX: w
		};
	});
})))()), re = "cryptomator_vaults";
function y(e, t) {
	return ee(re, e, t, void 0, { escape: !1 });
}
function ie(e, t, n, r) {
	return ne(re, e, t, n, r, { escape: !1 });
}
// src/stream.js
var ae = new URL(s("cryptomator_vaults", "js", "stream-worker.js"), window.location.href).href, b = new URL("stream/", ae).href, x = 1e4, S = 1e4, oe = 18e5, C = /* @__PURE__ */ new Map(), se = null, w = null, T = null;
function E() {
	return se ??= ce().catch(() => !1), se;
}
async function ce() {
	return !window.isSecureContext || !("serviceWorker" in navigator) ? !1 : (navigator.serviceWorker.addEventListener("message", pe), navigator.serviceWorker.startMessages(), w = await navigator.serviceWorker.register(ae, { scope: b }), await le(ue(w), x), le(de(), x));
}
var le = (e, t) => Promise.race([e, new Promise((e, n) => setTimeout(() => n(/* @__PURE__ */ Error("timeout")), t))]);
function ue(e) {
	if (e.active) return Promise.resolve();
	let t = e.installing || e.waiting;
	return new Promise((e, n) => {
		t.addEventListener("statechange", () => {
			t.state === "activated" ? e() : t.state === "redundant" && n(/* @__PURE__ */ Error("the stream worker did not start"));
		});
	});
}
function de() {
	return new Promise((e) => {
		let t = fe(b + "probe");
		t.addEventListener("load", () => {
			let n = !1;
			try {
				n = t.contentDocument?.documentElement?.getAttribute("data-cryptomator-stream") === "ok";
			} catch {}
			t.remove(), e(n);
		}), document.body.append(t);
	});
}
function fe(e) {
	let t = document.createElement("iframe");
	return t.hidden = !0, t.setAttribute("aria-hidden", "true"), t.src = e, t;
}
function pe(e) {
	let t = e.ports?.[0];
	if (e.data?.type !== "cryptomator-stream" || !t || e.source?.scriptURL !== ae) return;
	let n = C.get(e.data.id);
	n ? e.data.op === "info" ? t.postMessage({
		size: n.file.size,
		type: n.type,
		name: n.name,
		kind: n.kind
	}) : e.data.op === "read" && (n.read = Date.now(), n.file.read(e.data.start, e.data.end).then((r) => {
		t.postMessage({ bytes: r }, [r.buffer]), n.kind === "download" && e.data.end >= n.file.size && setTimeout(() => he(e.data.id), 6e4);
	}, (e) => t.postMessage({ error: e?.message || String(e) }))) : t.postMessage({ unknown: !0 });
}
function me(e, t, n, r) {
	let i = Array.from(crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(16)), (e) => e.toString(16).padStart(2, "0")).join("");
	return C.set(i, {
		file: e,
		name: t,
		type: n,
		kind: r,
		read: Date.now()
	}), T ??= setInterval(() => {
		let e = Date.now();
		for (let [t, n] of C) n.kind === "download" && e - n.read > oe && he(t);
		w?.active?.postMessage({ type: "cryptomator-keepalive" });
	}, S), {
		id: i,
		frame: b + i + "/frame",
		url: b + i + "/file"
	};
}
function he(e) {
	let t = C.get(e);
	C.delete(e), t?.frame?.remove(), C.size === 0 && T && (clearInterval(T), T = null);
}
function ge() {
	for (let e of [...C.keys()]) he(e);
}
function _e(e, t) {
	let { id: n, url: r } = me(e, t, "application/octet-stream", "download"), i = fe(r + "?download");
	C.get(n).frame = i, document.body.append(i), e.size === 0 && setTimeout(() => he(n), 6e4);
}
// src/dialogs.js
var ve = 104857600, ye = 5242880, be = [
	"video",
	"audio",
	"pdf"
], xe = /* @__PURE__ */ new Set();
function D(e, t, n) {
	let r = document.createElement(e);
	for (let [e, n] of Object.entries(t || {})) n != null && n !== !1 && (e === "class" ? r.className = n : e.startsWith("on") ? r.addEventListener(e.slice(2), n) : r.setAttribute(e, n === !0 ? "" : n));
	for (let e of [].concat(n ?? [])) e != null && e !== !1 && r.append(e instanceof Node ? e : document.createTextNode(String(e)));
	return r;
}
function Se(e) {
	if (window.OC?.Util?.humanFileSize) return window.OC.Util.humanFileSize(e);
	let t = [
		"B",
		"KB",
		"MB",
		"GB",
		"TB"
	], n = e, r = 0;
	for (; n >= 1024 && r < t.length - 1;) n /= 1024, r++;
	return (r === 0 ? n : n.toFixed(1)) + " " + t[r];
}
function O(e, t) {
	let n = URL.createObjectURL(new Blob([e], { type: t }));
	return xe.add(n), n;
}
function k() {
	for (let e of xe) URL.revokeObjectURL(e);
	xe.clear(), j(), ge();
}
function Ce(e, t) {
	let n = D("a", {
		href: O(t, "application/octet-stream"),
		download: e
	});
	document.body.append(n), n.click(), n.remove();
}
var A = null;
function j() {
	if (A) {
		let { dialog: e, onClose: t } = A;
		A = null, e.remove(), t?.();
	}
}
function M(e, t, n) {
	j();
	let r = D("div", {
		class: "cryptomator-dialog",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": e,
		onkeydown: (e) => {
			e.key === "Escape" && j();
		},
		onclick: (e) => {
			e.target === r && j();
		}
	}, D("div", { class: "cryptomator-dialog__panel" }, t));
	return A = {
		dialog: r,
		onClose: n
	}, document.body.append(r), r;
}
function N(e, t) {
	return D("p", {
		class: "cryptomator-notice" + (t ? " cryptomator-notice--" + t : ""),
		role: t === "error" ? "alert" : null
	}, e);
}
function we(e, t, n) {
	return new Promise((r) => {
		let i = !1, a = D("input", {
			type: "text",
			name: "username",
			autocomplete: "username",
			readonly: !0,
			class: "cryptomator-unlock__account",
			"aria-label": y("Vault")
		});
		a.value = n;
		let o = D("input", {
			type: "password",
			name: "password",
			autocomplete: "current-password",
			required: !0,
			"aria-label": y("Password")
		}), s = D("div", { "aria-live": "polite" }), c = D("button", {
			type: "submit",
			class: "primary"
		}, y("Unlock"));
		M(e, [
			D("h2", {}, y("Unlock {vault}", { vault: e })),
			N(y("The password and the vault's keys stay in this browser tab: the server only sends the encrypted files.")),
			D("form", {
				class: "cryptomator-unlock",
				name: "cryptomator-unlock",
				method: "post",
				action: "#",
				autocomplete: "on",
				onsubmit: async (e) => {
					e.preventDefault(), c.disabled = !0, s.replaceChildren(N(y("Unlocking …"))), await new Promise((e) => setTimeout(e, 30));
					try {
						await t(o.value), o.value = "", i = !0, j(), r(!0);
					} catch (e) {
						c.disabled = !1, s.replaceChildren(N(e.message, "error")), o.select();
					}
				}
			}, [
				D("label", {}, [y("Vault"), a]),
				D("label", {}, [y("Password"), o]),
				c,
				D("button", {
					type: "button",
					onclick: j
				}, y("Cancel"))
			]),
			s
		], () => {
			o.value = "", i || r(!1);
		}), o.focus();
	});
}
var Te = [
	"png",
	"jpg",
	"jpeg",
	"gif",
	"webp",
	"avif",
	"bmp",
	"svg"
], Ee = {
	mp4: "video/mp4",
	m4v: "video/mp4",
	webm: "video/webm",
	mov: "video/quicktime",
	ogv: "video/ogg",
	mkv: "video/x-matroska",
	"3gp": "video/3gpp"
}, De = {
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
}, Oe = /* @__PURE__ */ "txt.csv.tsv.json.log.xml.yml.yaml.ini.conf.cfg.toml.js.ts.py.sh.php.java.go.rs.c.h.css.html.htm.vcf.ics.tex".split(".");
function ke(e) {
	return Ae(e).kind !== "none";
}
function Ae(e) {
	let t = (/\.([^.]+)$/.exec(e)?.[1] ?? "").toLowerCase();
	return Te.includes(t) ? {
		kind: "image",
		type: t === "svg" ? "image/svg+xml" : "image/" + (t === "jpg" ? "jpeg" : t)
	} : t === "pdf" ? {
		kind: "pdf",
		type: "application/pdf"
	} : t in Ee ? {
		kind: "video",
		type: Ee[t]
	} : t in De ? {
		kind: "audio",
		type: De[t]
	} : Oe.includes(t) ? {
		kind: "text",
		type: "text/plain"
	} : t === "docx" ? { kind: "docx" } : [
		"pptx",
		"odp",
		"odt"
	].includes(t) ? { kind: t } : ["md", "markdown"].includes(t) ? { kind: "markdown" } : t === "zip" ? { kind: "zip" } : ["heic", "heif"].includes(t) ? { kind: "heic" } : [
		"xlsx",
		"xls",
		"ods"
	].includes(t) ? { kind: "sheet" } : { kind: "none" };
}
var je = {
	docx: async (e) => (await import("./cryptomator_vaults-documents-DnZ4HaxO.mjs")).docxPage(e),
	sheet: async (e) => (await import("./cryptomator_vaults-documents-DnZ4HaxO.mjs")).sheetPage(e),
	pptx: async (e) => (await import("./cryptomator_vaults-office-DCu7W88h.mjs")).pptxPage(e),
	odp: async (e) => (await import("./cryptomator_vaults-office-DCu7W88h.mjs")).odpPage(e),
	odt: async (e) => (await import("./cryptomator_vaults-office-DCu7W88h.mjs")).odtPage(e),
	markdown: async (e) => (await import("./cryptomator_vaults-previews-C8BtV61t.mjs")).markdownPage(e),
	zip: async (e) => (await import("./cryptomator_vaults-previews-C8BtV61t.mjs")).zipPage(e)
};
function Me(e) {
	return e in je || e === "heic";
}
async function Ne(e, t, n) {
	return e.kind === "heic" ? D("img", {
		class: "cryptomator-preview",
		src: O(await (await import("./cryptomator_vaults-previews-C8BtV61t.mjs")).heicToPng(t), "image/png"),
		alt: n
	}) : D("iframe", {
		class: "cryptomator-preview cryptomator-preview--frame cryptomator-preview--document",
		sandbox: "",
		referrerpolicy: "no-referrer",
		title: n,
		srcdoc: await je[e.kind](t)
	});
}
function Pe(e, t, n) {
	switch (e.kind) {
		case "image": return D("img", {
			class: "cryptomator-preview",
			src: O(t, e.type),
			alt: n
		});
		case "pdf": return D("iframe", {
			class: "cryptomator-preview cryptomator-preview--frame",
			src: O(t, e.type),
			title: n
		});
		case "video": return D("video", {
			class: "cryptomator-preview",
			src: O(t, e.type),
			controls: !0
		});
		case "audio": return D("audio", {
			class: "cryptomator-preview",
			src: O(t, e.type),
			controls: !0
		});
		case "text": return D("pre", { class: "cryptomator-preview cryptomator-preview--text" }, new TextDecoder("utf-8").decode(t));
		default: return N(y("No preview for this file. Download it to open it."));
	}
}
async function Fe(e, t, n, r, i) {
	let a = Ae(e);
	if (i && be.includes(a.kind) && await E()) return Ie(e, t, a, i, r);
	let o = a.kind !== "none" && t <= (a.kind === "text" ? ye : ve);
	if (!o && t > 1073741824 && !window.confirm(y("This file is {size}. Your browser holds it twice while decrypting. Continue?", { size: Se(t) }))) return;
	let s = D("progress", {
		max: 1,
		value: 0
	}), c = D("div", { class: "cryptomator-dialog__body" }, [N(y("Decrypting …")), s]), l = D("button", {
		type: "button",
		disabled: !0
	}, y("Download")), u = M(e, [D("div", { class: "cryptomator-dialog__head" }, [
		D("h2", {}, e),
		D("span", { class: "cryptomator-dialog__meta" }, Se(t)),
		l,
		D("button", {
			type: "button",
			class: "cryptomator-dialog__close",
			onclick: j
		}, y("Close"))
	]), c]);
	u.querySelector(".cryptomator-dialog__close").focus();
	try {
		let t = await n((e, t) => {
			s.value = .5 + e / t / 2;
		}, (e, t) => {
			s.value = e / t / 2;
		});
		if (A?.dialog !== u) return;
		if (l.disabled = !1, l.addEventListener("click", () => Ce(e, t)), !o) c.replaceChildren(N(y("No preview for this file. Download it to open it.")));
		else if (Me(a.kind)) {
			c.replaceChildren(N(y("Preparing the preview …")));
			try {
				let n = await Ne(a, t, e);
				A?.dialog === u && c.replaceChildren(n);
			} catch (e) {
				A?.dialog === u && c.replaceChildren(N(y("This document cannot be previewed: {detail}. Download it to open it.", { detail: e.message }), "error"));
			}
		} else c.replaceChildren(Pe(a, t, e));
	} catch (e) {
		A?.dialog === u && c.replaceChildren(N(r(e), "error"));
	}
}
async function Ie(e, t, n, r, i) {
	let a = null, o = D("div", { class: "cryptomator-dialog__body" }, N(y("Decrypting …"))), s = D("button", {
		type: "button",
		disabled: !0
	}, y("Download")), c = M(e, [D("div", { class: "cryptomator-dialog__head" }, [
		D("h2", {}, e),
		D("span", { class: "cryptomator-dialog__meta" }, Se(t)),
		s,
		D("button", {
			type: "button",
			class: "cryptomator-dialog__close",
			onclick: j
		}, y("Close"))
	]), o], () => a && he(a.id));
	c.querySelector(".cryptomator-dialog__close").focus();
	try {
		let t = await r();
		if (A?.dialog !== c) return;
		if (a = me(t, e, n.type, n.kind), s.disabled = !1, s.addEventListener("click", () => _e(t, e)), n.kind === "pdf") {
			o.replaceChildren(D("iframe", {
				class: "cryptomator-preview cryptomator-preview--frame",
				src: a.url,
				title: e
			}));
			return;
		}
		let i = D("div", { "aria-live": "polite" }), l = D("iframe", {
			class: "cryptomator-preview cryptomator-preview--frame cryptomator-preview--stream cryptomator-preview--" + n.kind,
			src: a.frame,
			title: e,
			allow: "autoplay; fullscreen",
			allowfullscreen: !0,
			onload: () => Le(l, n.kind, i)
		});
		o.replaceChildren(i, l);
	} catch (e) {
		A?.dialog === c && o.replaceChildren(N(i(e), "error"));
	}
}
function Le(e, t, n) {
	let r = e.contentDocument?.querySelector(t);
	if (!r) return;
	let i = () => n.replaceChildren(N(y("Your browser cannot play this file. Download it to open it."), "error"));
	if (r.addEventListener("error", i), r.error && i(), t === "video") {
		let e = () => {
			r.videoWidth === 0 && !r.error && n.replaceChildren(N(y("Your browser plays only the sound of this video. Download it to watch it.")));
		};
		r.readyState >= 1 ? e() : r.addEventListener("loadedmetadata", e, { once: !0 });
	}
}
function Re(e, t, n, { initial: r = "", action: i = y("Create") } = {}) {
	return new Promise((a) => {
		let o = !1, s = D("input", {
			type: "text",
			required: !0,
			"aria-label": t,
			autocomplete: "off"
		});
		s.value = r;
		let c = D("div", { "aria-live": "polite" });
		M(e, [
			D("h2", {}, e),
			D("form", {
				class: "cryptomator-unlock",
				onsubmit: (e) => {
					e.preventDefault();
					let t = n(s.value);
					if (t) {
						c.replaceChildren(N(t, "error"));
						return;
					}
					o = !0;
					let r = s.value;
					j(), a(r);
				}
			}, [
				D("label", {}, [t, s]),
				D("button", {
					type: "submit",
					class: "primary"
				}, i),
				D("button", {
					type: "button",
					onclick: j
				}, y("Cancel"))
			]),
			c
		], () => {
			o || a(null);
		}), s.focus();
		let l = r.lastIndexOf(".");
		s.setSelectionRange(0, l > 0 ? l : r.length);
	});
}
function ze(e, t, n) {
	return new Promise((r) => {
		let i = !1;
		M(e, [
			D("h2", {}, e),
			N(t),
			D("div", { class: "cryptomator-choices" }, [D("button", {
				type: "button",
				class: "error primary",
				onclick: () => {
					i = !0, j();
				}
			}, n), D("button", {
				type: "button",
				onclick: j
			}, y("Cancel"))])
		], () => r(i)), document.querySelector(".cryptomator-dialog button:last-child")?.focus();
	});
}
function Be(e, t, n, r, i) {
	return new Promise((a) => {
		let o = null, s = [{
			name: t,
			dirId: ""
		}], c = D("ol", { class: "cryptomator-crumbs" }), l = D("ul", { class: "cryptomator-folders" }), u = D("button", {
			type: "button",
			class: "primary",
			onclick: () => {
				o = {
					dirId: s[s.length - 1].dirId,
					ancestors: s.map((e) => e.dirId)
				}, j();
			}
		}, i), d = async () => {
			c.replaceChildren(...s.map((e, t) => D("li", {}, t === s.length - 1 ? D("span", { "aria-current": "page" }, e.name) : D("button", {
				type: "button",
				onclick: () => {
					s = s.slice(0, t + 1), d();
				}
			}, e.name)))), l.replaceChildren(N(y("Loading …")));
			try {
				let e = (await n(s[s.length - 1].dirId)).sort((e, t) => e.name.localeCompare(t.name));
				l.replaceChildren(...e.length ? e.map((e) => D("li", {}, D("button", {
					type: "button",
					class: "cryptomator-folders__item",
					disabled: r.has(e.dirId),
					onclick: () => {
						s = [...s, e], d();
					}
				}, e.name))) : [N(y("No folders in here."))]);
			} catch (e) {
				l.replaceChildren(N(e.message, "error"));
			}
		};
		M(e, [
			D("h2", {}, e),
			D("nav", {}, c),
			D("div", { class: "cryptomator-dialog__body" }, l),
			D("div", { class: "cryptomator-choices" }, [u, D("button", {
				type: "button",
				onclick: j
			}, y("Cancel"))])
		], () => a(o)), d();
	});
}
function Ve(e) {
	let t = D("ul", { class: "cryptomator-uploads" }), n = D("progress", {
		max: 1,
		value: 0
	}), r = D("div", { "aria-live": "polite" }), i = D("div", {
		class: "cryptomator-question",
		hidden: !0
	}), a = !1, o = D("button", {
		type: "button",
		onclick: () => {
			a = !0, o.disabled = !0, o.textContent = y("Stopping after this file …");
		}
	}, y("Stop")), s = D("button", {
		type: "button",
		class: "primary",
		hidden: !0,
		onclick: j
	}, y("Close"));
	return M(e, [
		D("div", { class: "cryptomator-dialog__head" }, [
			D("h2", {}, e),
			o,
			s
		]),
		n,
		i,
		D("div", { class: "cryptomator-dialog__body" }, t),
		r
	]), {
		get stopped() {
			return a;
		},
		file(e) {
			let n = D("span", { class: "cryptomator-dialog__meta" }, y("Waiting")), r = D("progress", {
				max: 1,
				value: 0
			});
			return t.append(D("li", {}, [
				D("span", { class: "cryptomator-uploads__name" }, e),
				n,
				r
			])), {
				phase(e, t) {
					n.textContent = e, r.value = t;
				},
				done(e, t) {
					n.textContent = e, n.classList.toggle("cryptomator-notice--error", !!t), r.value = 1;
				}
			};
		},
		ask(e, t, { text: n, cancel: r } = {}) {
			return new Promise((a) => {
				let o = (e) => () => {
					i.hidden = !0, i.replaceChildren(), a(e);
				};
				i.replaceChildren(D("h3", {}, y("“{name}” already exists", { name: e })), N(n || y("Replace the file in the vault with the one you chose? The vault keeps no copy of the old one; Nextcloud's versions keep its encrypted file.")), D("div", { class: "cryptomator-choices" }, [
					D("button", {
						type: "button",
						class: "primary",
						onclick: o("replace")
					}, y("Replace")),
					D("button", {
						type: "button",
						onclick: o("skip")
					}, y("Skip")),
					t > 1 ? D("button", {
						type: "button",
						onclick: o("replace-all")
					}, y("Replace all")) : null,
					t > 1 ? D("button", {
						type: "button",
						onclick: o("skip-all")
					}, y("Skip all")) : null,
					D("button", {
						type: "button",
						onclick: o("cancel")
					}, r || y("Cancel upload"))
				])), i.hidden = !1, i.querySelector("button").focus();
			});
		},
		progress(e) {
			n.value = e;
		},
		finish(e, t) {
			n.value = 1, o.hidden = !0, s.hidden = !1, r.replaceChildren(N(e, t ? "error" : void 0)), s.focus();
		}
	};
}
function He({ title: e, intro: t, fields: n, action: r, working: i, run: a }) {
	return new Promise((o) => {
		let s = null, c = {}, l = D("div", { "aria-live": "polite" }), u = D("button", {
			type: "submit",
			class: "primary"
		}, r), d = n.map((e) => {
			let t = e.type === "textarea" ? D("textarea", {
				name: e.name,
				rows: 4,
				required: !0,
				spellcheck: "false",
				autocomplete: "off",
				class: "cryptomator-form__words"
			}) : D("input", {
				type: e.type ?? "text",
				name: e.name,
				autocomplete: e.autocomplete ?? "off",
				required: !e.readonly && !e.optional,
				readonly: e.readonly || null,
				class: e.account ? "cryptomator-unlock__account" : null
			});
			return t.value = e.value ?? "", c[e.name] = t, D("label", {}, [e.label, t]);
		});
		M(e, [
			D("h2", {}, e),
			...t ? [].concat(t).map((e) => N(e)) : [],
			D("form", {
				class: "cryptomator-unlock cryptomator-form",
				method: "post",
				action: "#",
				autocomplete: "on",
				onsubmit: async (e) => {
					e.preventDefault(), u.disabled = !0, l.replaceChildren(N(i ?? y("Working …"))), await new Promise((e) => setTimeout(e, 30));
					try {
						s = await a(Object.fromEntries(Object.entries(c).map(([e, t]) => [e, t.value]))), j();
					} catch (e) {
						u.disabled = !1, l.replaceChildren(N(e.message, "error"));
					}
				}
			}, [...d, D("div", { class: "cryptomator-choices" }, [u, D("button", {
				type: "button",
				onclick: j
			}, y("Cancel"))])]),
			l
		], () => {
			for (let e of Object.values(c)) (e.type === "password" || e.tagName === "TEXTAREA") && (e.value = "");
			o(s);
		}), Object.values(c).find((e) => !e.readOnly)?.focus();
	});
}
function Ue(e, t, { created: n = !1 } = {}) {
	return new Promise((r) => {
		let i = D("div", {
			class: "cryptomator-recovery-key",
			tabindex: "0"
		}, t), a = D("span", {
			class: "cryptomator-dialog__meta",
			"aria-live": "polite"
		});
		M(y("Recovery key"), [
			D("h2", {}, y(n ? "{vault} is ready" : "Recovery key of {vault}", { vault: e })),
			N(y("With this recovery key you can set a new password if you forget the one you have, here or in Cryptomator. Anyone who has it can open the vault: keep it on paper or in your password manager, not in this cloud.")),
			i,
			D("div", { class: "cryptomator-choices" }, [
				D("button", {
					type: "button",
					onclick: async () => {
						try {
							await navigator.clipboard.writeText(t), a.textContent = y("Copied");
						} catch {
							a.textContent = y("Copying is not allowed here: select the words and copy them.");
						}
					}
				}, y("Copy")),
				a,
				D("button", {
					type: "button",
					class: "primary",
					onclick: j
				}, y("Done"))
			])
		], () => {
			i.textContent = "", r();
		}), i.focus();
	});
}
function We(e, { check: t, describe: n, repair: r }) {
	let i = D("div", { class: "cryptomator-dialog__body" }), a = D("div", { "aria-live": "polite" }), o = D("progress", {
		max: 1,
		value: 0
	}), s = {
		CRITICAL: y("Damaged"),
		WARN: y("Needs repair"),
		INFO: y("Note")
	}, c = async () => {
		i.replaceChildren(), o.hidden = !1, o.value = 0, a.replaceChildren(N(y("Checking the vault …")));
		let e;
		try {
			e = await t((e, t) => {
				o.value = t ? e / t : 1;
			});
		} catch (e) {
			o.hidden = !0, a.replaceChildren(N(e.message, "error"));
			return;
		}
		if (o.hidden = !0, e.length === 0) {
			a.replaceChildren(N(y("The vault is healthy: the check found nothing to repair.")));
			return;
		}
		i.append(D("ul", { class: "cryptomator-findings" }, e.map((e) => D("li", {}, [
			D("span", { class: "cryptomator-findings__severity cryptomator-findings__severity--" + e.severity.toLowerCase() }, s[e.severity]),
			D("span", {}, n(e)),
			D("code", { class: "cryptomator-dialog__meta" }, e.path)
		]))));
		let l = e.filter((e) => e.fixable), u = [];
		l.length && u.push(D("button", {
			type: "button",
			class: "primary",
			onclick: async (e) => {
				e.target.disabled = !0, a.replaceChildren(N(y("Repairing …")));
				try {
					await r(l);
				} catch (e) {
					a.replaceChildren(N(e.message, "error"));
					return;
				}
				await c();
			}
		}, y("Repair {count}", { count: l.length }))), a.replaceChildren(N(l.length === e.length ? y("Each of these can be repaired, as Cryptomator's health check repairs it.") : y("{count} of these can be repaired, as Cryptomator's health check repairs them; the others need Cryptomator or a backup.", { count: l.length })), D("div", { class: "cryptomator-choices" }, u));
	};
	M(y("Health check"), [
		D("div", { class: "cryptomator-dialog__head" }, [D("h2", {}, y("Health check of {vault}", { vault: e })), D("button", {
			type: "button",
			onclick: j
		}, y("Close"))]),
		o,
		i,
		a
	]), c();
}
// src/storage.js
var { VaultError: P } = v.default, Ge = "DAV:", Ke = "http://owncloud.org/ns", qe = "http://nextcloud.org/ns", Je = "<?xml version=\"1.0\"?><d:propfind xmlns:d=\"DAV:\" xmlns:oc=\"http://owncloud.org/ns\" xmlns:nc=\"http://nextcloud.org/ns\"><d:prop><d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getetag/><oc:permissions/><nc:upload_time/></d:prop></d:propfind>", Ye = 20971520, Xe = 10485760;
function Ze() {
	return window.OC && window.OC.requestToken || document.head.dataset.requesttoken || "";
}
function F(e) {
	return {
		requesttoken: Ze(),
		"X-Requested-With": "XMLHttpRequest",
		...e || {}
	};
}
function I() {
	return c()?.uid ?? "";
}
function Qe(e) {
	return e.split("/").filter((e) => e !== "").map(encodeURIComponent).join("/");
}
function $e(e) {
	let t = Qe(e);
	return u("dav") + "/files/" + encodeURIComponent(I()) + "/" + (t ? t + "/" : "");
}
function et(e) {
	let t = new DOMParser().parseFromString(e, "application/xml");
	return Array.from(t.getElementsByTagNameNS(Ge, "response")).map((e) => {
		let t = (t, n = Ge) => e.getElementsByTagNameNS(n, t)[0], n = t("getcontentlength"), r = t("getlastmodified"), i = Number(t("upload_time", qe)?.textContent) || 0;
		return {
			href: t("href").textContent,
			isDir: e.getElementsByTagNameNS(Ge, "collection").length > 0,
			size: n ? Number(n.textContent) : 0,
			mtime: r ? new Date(r.textContent) : void 0,
			uploadTime: i ? /* @__PURE__ */ new Date(i * 1e3) : void 0,
			etag: t("getetag")?.textContent || void 0,
			permissions: t("permissions", Ke)?.textContent ?? "",
			originalLocation: t("trashbin-original-location", qe)?.textContent,
			deletionTime: Number(t("trashbin-deletion-time", qe)?.textContent) || 0
		};
	});
}
function tt(e) {
	let t = e.replace(/\/+$/, "").split("/");
	return decodeURIComponent(t[t.length - 1]);
}
function L(e, t, n) {
	return e === 0 ? new P("network", (n ? n + ": " : "") + "redirected (signed out?)") : e === 404 ? new P("not-found", t) : e === 412 || e === 405 ? new P("exists", t) : e === 507 ? new P("quota", t) : new P("network", (n ? n + ": " : "") + "HTTP " + e);
}
function nt(e, t) {
	return e >= 200 && e < 300 && !t;
}
function rt(e, t, n, r, i) {
	return new Promise((a, o) => {
		let s = new XMLHttpRequest();
		s.open(e, t);
		for (let [e, t] of Object.entries(F(n))) s.setRequestHeader(e, t);
		i && s.upload.addEventListener("progress", (e) => i(e.loaded, e.total)), s.addEventListener("load", () => a(new URL(s.responseURL, t).href === new URL(t, window.location.href).href ? s.status : 0)), s.addEventListener("error", () => o(new P("network", e + " failed"))), s.addEventListener("abort", () => o(new P("network", e + " aborted"))), s.send(r ?? null);
	});
}
async function it(e, t, n, r, i = []) {
	let a = await fetch(t, {
		method: e,
		headers: F(n),
		credentials: "same-origin"
	});
	if (!nt(a.status, a.redirected) && !i.includes(a.status)) throw L(a.redirected ? 0 : a.status, r, e);
	return a;
}
function R(e) {
	let t = $e(e), n = (e) => t + Qe(e);
	async function r(e, t, r, i, a) {
		let o = u("dav") + "/uploads/" + encodeURIComponent(I()) + "/cryptomator-vaults-" + crypto.randomUUID(), s = new URL(n(e), window.location.href).href, c = {
			Destination: s,
			"OC-Total-Length": String(t)
		};
		await it("MKCOL", o, { Destination: s }, e);
		try {
			let n = 0, s = 1;
			for await (let i of r) {
				let r = await rt("PUT", o + "/" + String(s).padStart(5, "0"), c, i, (e) => a?.(n + e, t));
				if (!nt(r, !1)) throw L(r, e, "PUT (part " + s + ")");
				n += i.length, s++;
			}
			let l = await fetch(o + "/.file", {
				method: "MOVE",
				headers: F({
					...c,
					Overwrite: i ? "F" : "T"
				}),
				credentials: "same-origin"
			});
			if (!nt(l.status, l.redirected)) throw L(l.redirected ? 0 : l.status, e, "MOVE (assembling the parts)");
		} catch (e) {
			throw await fetch(o, {
				method: "DELETE",
				headers: F(),
				credentials: "same-origin"
			}).catch(() => {}), e;
		}
	}
	function* i(e) {
		for (let t = 0; t < e.length; t += Xe) yield e.subarray(t, Math.min(t + Xe, e.length));
	}
	return {
		async read(e, n) {
			let r = await fetch(t + Qe(e), {
				headers: F(),
				credentials: "same-origin"
			});
			if (r.status === 404) throw new P("not-found", e);
			if (!r.ok) throw new P("network", "GET: HTTP " + r.status);
			let i = Number(r.headers.get("Content-Length")) || 0;
			if (!n || !r.body || i === 0) return new Uint8Array(await r.arrayBuffer());
			let a = new Uint8Array(i), o = r.body.getReader(), s = 0;
			for (;;) {
				let { done: e, value: t } = await o.read();
				if (e) break;
				a.set(t, s), s += t.length, n(s, i);
			}
			return a.subarray(0, s);
		},
		async stat(e) {
			let t = await fetch(n(e), {
				method: "PROPFIND",
				headers: F({
					Depth: "0",
					"Content-Type": "application/xml; charset=utf-8"
				}),
				credentials: "same-origin",
				body: Je
			});
			if (t.status === 404) return null;
			if (t.status !== 207) throw L(t.status, e, "PROPFIND");
			let [r] = et(await t.text());
			return {
				isDir: r.isDir,
				size: r.size,
				etag: r.etag,
				permissions: r.permissions
			};
		},
		async write(e, t, { create: a = !1, onProgress: o } = {}) {
			if (t.length >= Ye) return r(e, t.length, i(t), a, o);
			let s = await rt("PUT", n(e), a ? { "If-None-Match": "*" } : {}, t, o);
			if (!nt(s, !1)) throw L(s, e, "PUT");
		},
		async writeParts(e, t, n, { create: i = !1, onProgress: a } = {}) {
			return r(e, t, n, i, a);
		},
		async readRange(e, t, r) {
			if (r <= t) return /* @__PURE__ */ new Uint8Array();
			let i = await fetch(n(e), {
				headers: F({ Range: "bytes=" + t + "-" + (r - 1) }),
				credentials: "same-origin"
			});
			if (i.status === 404) throw new P("not-found", e);
			if (i.status === 206) return new Uint8Array(await i.arrayBuffer());
			if (i.status === 200) return new Uint8Array(await i.arrayBuffer()).slice(t, r);
			throw new P("network", "GET (range): HTTP " + i.status);
		},
		async mkdir(e, { existsOk: t = !1 } = {}) {
			let r = await fetch(n(e), {
				method: "MKCOL",
				headers: F(),
				credentials: "same-origin"
			});
			if (!(nt(r.status, r.redirected) || r.status === 405 && t)) throw L(r.status, e, "MKCOL");
		},
		async move(e, t, { overwrite: r = !1 } = {}) {
			await it("MOVE", n(e), {
				Destination: new URL(n(t), window.location.href).href,
				Overwrite: r ? "T" : "F"
			}, t);
		},
		async copy(e, t) {
			await it("COPY", n(e), {
				Destination: new URL(n(t), window.location.href).href,
				Overwrite: "F"
			}, t);
		},
		async remove(e) {
			await it("DELETE", n(e), {}, e, [404]);
		},
		async removeUnchanged(e, t, { isDir: r = !1 } = {}) {
			if (r) {
				let n = await this.stat(e);
				if (n === null) throw new P("not-found", e);
				if (n.etag !== t) throw new P("changed", e);
			}
			let i = await fetch(n(e), {
				method: "DELETE",
				headers: F(r ? {} : { "If-Match": t }),
				credentials: "same-origin"
			});
			if (i.status === 412) throw new P("changed", e);
			if (!nt(i.status, i.redirected)) throw L(i.redirected ? 0 : i.status, e, "DELETE");
		},
		async list(e) {
			let n = await fetch(t + (e ? Qe(e) + "/" : ""), {
				method: "PROPFIND",
				headers: F({
					Depth: "1",
					"Content-Type": "application/xml; charset=utf-8"
				}),
				credentials: "same-origin",
				body: Je
			});
			if (n.status === 404) throw new P("not-found", e);
			if (!n.ok) throw new P("network", "PROPFIND: HTTP " + n.status);
			return et(await n.text()).slice(1).map((e) => ({
				name: tt(e.href),
				isDir: e.isDir,
				size: e.size,
				mtime: e.mtime,
				uploadTime: e.uploadTime,
				etag: e.etag,
				permissions: e.permissions
			}));
		}
	};
}
async function at(e) {
	let t = I(), n = (e) => e.replace(/&/g, "&amp;").replace(/</g, "&lt;"), r = await fetch(u("dav") + "/", {
		method: "SEARCH",
		headers: F({ "Content-Type": "text/xml; charset=utf-8" }),
		credentials: "same-origin",
		body: "<?xml version=\"1.0\" encoding=\"UTF-8\"?><d:searchrequest xmlns:d=\"DAV:\"><d:basicsearch><d:select><d:prop><d:displayname/></d:prop></d:select><d:from><d:scope><d:href>/files/" + n(t) + "</d:href><d:depth>infinity</d:depth></d:scope></d:from><d:where><d:like><d:prop><d:displayname/></d:prop><d:literal>" + n(e) + "</d:literal></d:like></d:where></d:basicsearch></d:searchrequest>"
	});
	if (!r.ok) throw Error("HTTP " + r.status);
	let i = "/files/" + t + "/";
	return et(await r.text()).map((e) => decodeURIComponent(e.href)).filter((t) => t.endsWith("/" + e) && t.includes(i)).map((t) => "/" + t.slice(t.indexOf(i) + i.length, -("/" + e).length)).map((e) => e.replace(/\/+$/, "") || "/").sort((e, t) => e.localeCompare(t));
}
function ot() {
	return at("vault.cryptomator");
}
function st(e) {
	return at(e);
}
async function ct(e, t) {
	let n = [];
	for (let r of t) {
		let t = r.replace(/^\/+|\/+$/g, ""), i = t.split("/").pop(), a = await e.stat(t);
		if (a === null) throw new P("not-found", t);
		let o = {
			path: t,
			name: i,
			isDir: a.isDir,
			etag: a.etag,
			permissions: a.permissions,
			files: [],
			folders: []
		};
		if (!a.isDir) o.files.push({
			path: t,
			name: i,
			size: a.size,
			etag: a.etag,
			dirs: []
		});
		else {
			let n = async (t, r) => {
				o.folders.push(r);
				let i = await e.list(t);
				if (i.some((e) => !e.isDir && e.name === "vault.cryptomator")) throw new P("contains-vault", t);
				for (let e of i) {
					let i = t + "/" + e.name;
					e.isDir ? await n(i, [...r, e.name]) : o.files.push({
						path: i,
						name: e.name,
						size: e.size,
						etag: e.etag,
						dirs: r
					});
				}
			};
			await n(t, [i]);
		}
		n.push(o);
	}
	return n;
}
async function lt(e) {
	return (await ut([e])).has(e.replace(/^\/+|\/+$/g, ""));
}
async function ut(e, { onlyEmpty: t = !1 } = {}) {
	let n = e.map((e) => e.replace(/^\/+|\/+$/g, "")), r = u("dav") + "/trashbin/" + encodeURIComponent(I()) + "/trash/", i = (e) => fetch(e, {
		method: "PROPFIND",
		headers: F({
			Depth: "1",
			"Content-Type": "application/xml; charset=utf-8"
		}),
		credentials: "same-origin",
		body: "<?xml version=\"1.0\"?><d:propfind xmlns:d=\"DAV:\" xmlns:nc=\"http://nextcloud.org/ns\"><d:prop><d:resourcetype/><nc:trashbin-original-location/><nc:trashbin-deletion-time/></d:prop></d:propfind>"
	}), a = await i(r);
	if (a.status === 404 || a.status === 405) return new Set(n);
	if (a.status !== 207) throw L(a.status, n[0] ?? "", "PROPFIND (deleted files)");
	let o = et(await a.text()).slice(1), s = /* @__PURE__ */ new Set();
	for (let e of n) {
		let [n] = o.filter((t) => t.originalLocation === e).sort((e, t) => t.deletionTime - e.deletionTime);
		if (!n) continue;
		let r = new URL(n.href, window.location.href).href;
		if (t && n.isDir) {
			let e = await i(r);
			if (e.status !== 207 || et(await e.text()).length > 1) continue;
		}
		await it("DELETE", r, {}, e, [404]), s.add(e);
	}
	return s;
}
// src/inbox.mjs
var dt = ".cryptomator-inbox.json", ft = 12e4;
function z(e) {
	if (typeof e != "string") return null;
	let t = e.normalize("NFC").split("/").filter((e) => e !== "");
	return t.some((e) => e === "." || e === "..") ? null : "/" + t.join("/");
}
function pt(e) {
	return e.split("/").filter(Boolean);
}
function mt(e, t) {
	return e === t || t === "/" || e.startsWith(t + "/");
}
function ht(e, t) {
	let n;
	try {
		n = JSON.parse(e);
	} catch {
		return { problem: "invalid" };
	}
	if (typeof n != "object" || !n || Array.isArray(n)) return { problem: "invalid" };
	let { version: r } = n;
	if (!Number.isInteger(r) || r < 1) return { problem: "invalid" };
	let i = z(n.vault);
	if (r > 1) return {
		problem: "version",
		version: r,
		vault: i,
		folder: t
	};
	let a = n.target === void 0 ? "/" : z(n.target);
	return i === null || a === null || n.from !== void 0 && typeof n.from != "string" ? { problem: "invalid" } : mt(t, i) || mt(i, t) ? {
		problem: "loop",
		vault: i,
		folder: t
	} : { inbox: {
		folder: t,
		vault: i,
		target: a,
		from: (n.from ?? "").trim()
	} };
}
function gt({ vault: e, target: t, from: n }) {
	let r = {
		version: 1,
		vault: e,
		target: t
	};
	return n && (r.from = n), JSON.stringify(r, null, "	") + "\n";
}
function _t(e, t = Date.now()) {
	let n = [e.mtime, e.uploadTime].filter((e) => e instanceof Date && !Number.isNaN(e.getTime()));
	return n.length !== 0 && t - Math.max(...n.map((e) => e.getTime())) >= ft;
}
function vt(e, t) {
	if (t < 2) return e;
	let n = e.lastIndexOf(".");
	return n > 0 ? e.slice(0, n) + " (" + t + ")" + e.slice(n) : e + " (" + t + ")";
}
async function yt(e, t, n = Date.now()) {
	let r = e.folder.replace(/^\/+/, ""), i = pt(e.target), a = {
		ready: [],
		recent: [],
		skipped: [],
		folders: []
	}, o = async (e) => {
		let s = [r, ...e].filter(Boolean).join("/"), c = await t(s);
		if (e.length > 0 && c.some((e) => !e.isDir && (e.name === ".cryptomator-inbox.json" || e.name === "vault.cryptomator"))) return a.skipped.push(e), !1;
		for (let t of c) {
			let r = s ? s + "/" + t.name : t.name;
			if (t.isDir) await o([...e, t.name]) && a.folders.push([...e, t.name]);
			else if (e.length === 0 && t.name === ".cryptomator-inbox.json") continue;
			else _t(t, n) ? a.ready.push({
				path: r,
				name: t.name,
				size: t.size,
				etag: t.etag,
				permissions: t.permissions ?? "",
				inner: e,
				dirs: [...i, ...e]
			}) : a.recent.push({
				path: r,
				name: t.name
			});
		}
		return !0;
	};
	return await o([]), a;
}
// src/files.js
var { Vault: bt, VaultError: xt, checkName: St } = v.default, Ct = null;
function wt() {
	return Ct ||= (document.head.append(D("link", {
		rel: "stylesheet",
		href: s("cryptomator_vaults", "css", "cryptomator_vaults-files.css")
	})), import("./cryptomator_vaults-dialogs-h85zBqst.mjs").then((e) => e.t)), Ct;
}
function B(e) {
	wt().then(({ showError: t }) => t(e));
}
function Tt(e) {
	wt().then(({ showInfo: t }) => t(e));
}
var Et = "cryptomator-vaults", Dt = "/cryptomator-vaults", Ot = window.location.origin + "/apps/cryptomator_vaults/cryptomator-vaults", kt = n("cryptomator_vaults", "file.svg"), At = 15, jt = "cryptomator_vaults.added", Mt = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M4 3h16a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-1v1h-3v-1H8v1H5v-1H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v13h16V5zm8 2.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM5.5 8h1.5v7H5.5z\"/></svg>", Nt = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 8a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z\"/></svg>", Pt = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z\"/></svg>", Ft = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9V6zm9 14H6V10h12v10z\"/></svg>", It = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z\"/></svg>", Lt = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z\"/></svg>", Rt = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm17.71-10.21a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z\"/></svg>", zt = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-6 12v-3h-4v-4h4V8l5 5-5 5z\"/></svg>", Bt = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\"/></svg>", Vt = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6a5 5 0 0 0-9.9-1l1.95.45A3 3 0 0 1 15 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm0 12H6V10h12v10z\"/></svg>", Ht = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4h-2v4H6V4h7v5h5v1h2V8l-6-6H6zm12 10v3h-4v2h4v3l4-4-4-4z\"/></svg>", Ut = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M14 2H6a2 2 0 0 0-2 2v6h2V4h7v5h5v11H6v-4H4v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM10 11v3H2v2h8v3l4-4-4-4z\"/></svg>", Wt = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2zm5 9h-2v2h-2v-2H9v-2h2V9h2v2h2v2z\"/></svg>", V = /* @__PURE__ */ new Map(), Gt = null, Kt = null, H = { kind: "vaults" };
async function qt(e, t) {
	let n = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(e)));
	return Array.from(n, (e) => e.toString(16).padStart(2, "0")).join("").slice(0, t);
}
var Jt = "r000000000001", Yt = 2 ** 52;
function Xt(e) {
	return Yt + parseInt(e.slice(1, 13), 16);
}
function Zt() {
	try {
		let e = JSON.parse(window.localStorage.getItem(jt) || "[]");
		return Array.isArray(e) ? e.filter((e) => typeof e == "string") : [];
	} catch {
		return [];
	}
}
function Qt(e) {
	try {
		window.localStorage.setItem(jt, JSON.stringify([.../* @__PURE__ */ new Set([e, ...Zt()])]));
	} catch {}
}
function $t(e) {
	return e.split("/").filter(Boolean).pop() || y("All files");
}
async function en(e) {
	let t = "v" + await qt("vault:" + e, 12);
	return V.has(t) || V.set(t, {
		seg: t,
		folder: e,
		name: $t(e),
		vault: null,
		dirs: /* @__PURE__ */ new Map(),
		entries: /* @__PURE__ */ new Map(),
		nodes: /* @__PURE__ */ new Set()
	}), V.get(t);
}
function tn() {
	return Gt ||= (async () => {
		let e = [];
		try {
			e = await ot();
		} catch (e) {
			B(y("The search for vaults failed: {detail}", { detail: e.message }));
		}
		for (let t of [.../* @__PURE__ */ new Set([...e, ...Zt()])]) await en(t);
	})(), Gt;
}
function U(e, t, n, r, i = !0) {
	let o = e.split("/").filter(Boolean).pop() || Jt, s = new p({
		id: Xt(o),
		source: Ot + e,
		root: Dt,
		owner: I(),
		displayname: t,
		permissions: a.READ,
		mtime: r?.mtime,
		attributes: {
			cryptomatorVault: n?.seg ?? null,
			...r?.attributes
		}
	});
	return i && n?.nodes.add(s), s;
}
function nn(e, t, n) {
	let r = e.split("/").pop(), i = new te({
		id: Xt(r),
		source: Ot + e,
		root: Dt,
		owner: I(),
		displayname: t.name,
		mime: "application/octet-stream",
		size: t.size ?? 0,
		mtime: t.mtime,
		permissions: a.READ,
		attributes: {
			"has-preview": !0,
			previewUrl: kt,
			cryptomatorVault: n.seg,
			cryptomatorType: t.type
		}
	});
	return n.nodes.add(i), i;
}
function W(e) {
	switch (e?.code) {
		case "exists":
		case "exists-other": return y("“{name}” already exists in this folder.", { name: e.message });
		case "invalid-name": return y("“{name}” cannot be a name in a vault.", { name: e.message });
		case "quota": return y("Your storage is full.");
		case "read-only": return y("This vault cannot be written to.");
		case "invalid-move": return y("A folder cannot be moved into itself or into a folder inside it.");
		case "wrong-password": return y("Wrong password.");
		case "unsupported-format": return y("This vault has a format the app cannot read (only vault format 8, Cryptomator 1.6 and later).");
		case "unsupported-key": return y("This vault keeps its key on a Cryptomator Hub, which the app does not support.");
		case "not-found": return y("There is no Cryptomator vault in this folder.");
		case "corrupt": return y("The vault is damaged: {detail}", { detail: e.message });
		case "locked": return y("The vault is locked.");
		case "invalid-recovery-key": return y("This is not the vault's recovery key: {detail}.", { detail: e.message });
		case "changed": return y("“{name}” changed meanwhile: it was kept, and the vault may not hold its latest state.", { name: e.message.split("/").pop() });
		case "contains-vault": return y("“{name}” holds a Cryptomator vault, which cannot go into a vault.", { name: e.message.split("/").pop() });
		default: return y("Something went wrong: {detail}", { detail: e?.message || String(e) });
	}
}
function rn(e) {
	window.OCP.Files.Router.goToRoute(null, { view: Et }, { dir: e });
}
function an() {
	return window.OCP?.Files?.Router?.query?.dir || "/";
}
async function on(e) {
	if (e.vault?.unlocked) return !0;
	try {
		e.vault = e.vault || await bt.open(R(e.folder));
	} catch (e) {
		return B(W(e)), !1;
	}
	let t = await we(e.name, async (t) => {
		try {
			await e.vault.unlock(t);
		} catch (e) {
			throw Error(W(e));
		}
	}, e.folder);
	return t && (mn(), E(), e.vault.removeLeftovers().catch(() => {}), sr(e)), t;
}
async function sn() {
	return H = { kind: "vaults" }, {
		folder: U("/", y("Vaults"), null),
		contents: [...V.values()].sort((e, t) => e.name.localeCompare(t.name)).map((e) => U("/" + e.seg, e.name, e, { attributes: {
			cryptomatorVaultRoot: !0,
			cryptomatorFolder: e.folder
		} }, !1))
	};
}
var cn = window.isSecureContext && !!window.crypto?.subtle;
async function ln(e) {
	if (xn(), !cn) return H = { kind: "insecure" }, {
		folder: new p({
			id: Yt + 1,
			source: Ot + "/",
			root: Dt,
			owner: I(),
			permissions: a.READ
		}),
		contents: []
	};
	await tn();
	let t = e.split("/").filter(Boolean);
	if (t.length === 0) return sn();
	let n = V.get(t[0]);
	if (!n) return rn("/"), sn();
	if (!n.vault?.unlocked && !await on(n)) return H = {
		kind: "locked",
		vault: n
	}, {
		folder: U(e, n.name, n, { attributes: { cryptomatorVaultRoot: t.length === 1 } }, !1),
		contents: []
	};
	let r = "", i = n.name;
	if (t.length > 1) {
		let a = n.dirs.get(t[t.length - 1]);
		if (!a) return rn("/" + n.seg), {
			folder: U(e, n.name, n),
			contents: []
		};
		r = a.dirId, i = a.name;
	}
	let o = await n.vault.list(r), s = [];
	for (let t of o) if (t.type === "dir") {
		let r = "d" + await qt(n.seg + ":dir:" + t.dirId, 12);
		n.dirs.set(r, {
			dirId: t.dirId,
			name: t.name
		}), s.push(U(e + "/" + r, t.name, n, { mtime: t.mtime }));
	} else {
		let r = "f" + await qt(n.seg + ":file:" + t.path, 12);
		n.entries.set(r, t), s.push(nn(e + "/" + r, t, n));
	}
	return H = {
		kind: "folder",
		vault: n,
		dirId: r,
		path: e
	}, {
		folder: U(e, i, n, void 0, t.length > 1),
		contents: s
	};
}
function un(e) {
	if (e) {
		if (e.replaceChildren(), e.classList.add("cryptomator-empty"), H.kind === "insecure") e.append(N(y("Vaults can only be opened over HTTPS: the browser provides its encryption only there."), "error"));
		else if (H.kind === "locked") {
			let t = H.vault;
			e.append(D("h2", {}, y("{vault} is locked", { vault: t.name })), N(y("Its files are decrypted in this browser tab once you enter its password.")), D("button", {
				type: "button",
				class: "primary",
				onclick: async () => {
					await on(t) && dn(t.name);
				}
			}, y("Unlock")));
		} else H.kind === "folder" ? e.append(D("h2", {}, y("This folder is empty."))) : e.append(D("h2", {}, y("No vaults found")), N(y("Vaults in your files appear here. Open a vault's folder to add one.")), D("button", {
			type: "button",
			class: "primary",
			onclick: _n
		}, y("Open a vault folder …")));
	}
}
function dn(e) {
	d("files:node:updated", U(an(), e, null));
}
function fn(e) {
	if (e.vault?.unlocked) {
		if (X && H.vault === e) {
			Tt(y("The vault locks when the change being made has finished."));
			let t = setInterval(() => {
				X || (clearInterval(t), fn(e));
			}, 500);
		} else {
			e.vault.lock();
			for (let t of e.nodes) d("files:node:deleted", t);
			e.nodes.clear(), e.dirs.clear(), e.entries.clear(), e.inbox = null, k(), J(q?.folder), an().startsWith("/" + e.seg) && rn("/"), [...V.values()].some((e) => e.vault?.unlocked) || (clearTimeout(Kt), Kt = null);
		}
	}
}
function pn(e) {
	let t = !1;
	for (let e of V.values()) e.vault?.unlocked && (fn(e), t = !0);
	t && e && Tt(e);
}
function mn() {
	clearTimeout(Kt), Kt = setTimeout(() => pn(y("Locked after {minutes} minutes without use.", { minutes: At })), 9e5);
}
function hn() {
	Kt !== null && mn();
}
async function gn(e) {
	try {
		await bt.open(R(e));
	} catch (e) {
		B(W(e));
		return;
	}
	Qt(e), await tn(), rn("/" + (await en(e)).seg);
}
async function _n() {
	let e;
	try {
		let { getFilePickerBuilder: t } = await wt();
		e = await t(y("Choose a vault")).startAt("/").setMultiSelect(!1).allowDirectories(!0).setFilter((e) => e.type === i.Folder || e.basename === "vault.cryptomator").addButton({
			label: y("Open vault"),
			variant: "primary",
			callback: () => {}
		}).build().pick();
	} catch {
		return;
	}
	let t = "/" + String(e).replace(/^\/+|\/+$/g, "");
	await gn(t.endsWith("/vault.cryptomator") ? t.slice(0, -18) || "/" : t);
}
function G(e) {
	return e?.id === Et;
}
var vn = /* @__PURE__ */ new Set([
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
]), yn = /* @__PURE__ */ new WeakSet(), bn = 0;
function xn() {
	let e = l();
	if (e.length !== bn) {
		bn = e.length;
		for (let t of e) {
			if (vn.has(t.id) || yn.has(t)) continue;
			let e = t.enabled;
			try {
				Object.defineProperty(t, "enabled", {
					configurable: !0,
					enumerable: !0,
					writable: !0,
					value: (n) => !G(n?.view) && !(n?.nodes ?? []).some((e) => e?.root === Dt) && (!e || e.call(t, n))
				}), yn.add(t);
			} catch {}
		}
	}
}
function Sn(e) {
	let t = V.get(e.attributes?.cryptomatorVault);
	return {
		vault: t,
		entry: t?.entries.get(e.basename)
	};
}
h({
	id: "cryptomator-vaults-open",
	displayName: ({ nodes: e }) => e[0]?.type === i.Folder ? y("Open") : y("View"),
	iconSvgInline: () => Nt,
	enabled: ({ nodes: e, view: t }) => (xn(), G(t) && e.length === 1),
	async exec({ nodes: e }) {
		let t = e[0];
		if (t.type === i.Folder) return rn(t.path), null;
		let { vault: n, entry: r } = Sn(t);
		return !n?.vault?.unlocked || !r ? (B(y("The vault is locked.")), null) : (r.type === "link" ? Tt(y("A link to {target}", { target: r.target })) : r.type === "broken" ? B(y("This entry cannot be read: {detail}", { detail: r.error })) : r.size >= Z && !ke(r.name) ? await Cn(n, r) : await Fe(r.name, r.size, (e, t) => n.vault.readFile(r, e, t), W, () => n.vault.openFile(r)), null);
	},
	default: r.DEFAULT,
	order: -1e3
});
async function Cn(e, t) {
	if (t.size >= Z && typeof window.showSaveFilePicker == "function") {
		let n;
		try {
			n = await (await window.showSaveFilePicker({ suggestedName: t.name })).createWritable();
		} catch {
			return;
		}
		try {
			await e.vault.readFileStream(t, (e) => n.write(e)), await n.close();
		} catch (e) {
			await n.abort().catch(() => {}), B(W(e));
		}
	} else if (t.size >= Z && await E()) try {
		_e(await e.vault.openFile(t), t.name);
	} catch (e) {
		B(W(e));
	}
	else if (!(t.size > 1073741824 && !window.confirm(y("This file is {size}. Your browser holds it twice while decrypting. Continue?", { size: Se(t.size) })))) try {
		Ce(t.name, await e.vault.readFile(t));
	} catch (e) {
		B(W(e));
	}
}
async function wn(e) {
	let { vault: t, entry: n } = Sn(e);
	return !t?.vault?.unlocked || !n ? (B(y("The vault is locked.")), null) : (await Cn(t, n), null);
}
h({
	id: "cryptomator-vaults-download",
	displayName: () => y("Download"),
	iconSvgInline: () => Pt,
	enabled: ({ nodes: e, view: t }) => G(t) && e.length > 0 && e.every((e) => e.type === i.File && e.attributes?.cryptomatorType === "file"),
	exec: ({ nodes: e }) => wn(e[0]),
	async execBatch({ nodes: e }) {
		let t = [];
		for (let n of e) t.push(await wn(n));
		return t;
	},
	order: -900
}), h({
	id: "cryptomator-vaults-lock",
	displayName: () => y("Lock"),
	iconSvgInline: () => Ft,
	enabled: ({ nodes: e, view: t }) => G(t) && e.length === 1 && e[0].attributes?.cryptomatorVaultRoot === !0 && V.get(e[0].attributes.cryptomatorVault)?.vault?.unlocked === !0,
	async exec({ nodes: e }) {
		return fn(V.get(e[0].attributes.cryptomatorVault)), null;
	},
	order: -800
}), h({
	id: "cryptomator-vaults-open-vault",
	displayName: () => y("Open vault"),
	iconSvgInline: () => Mt,
	enabled: ({ nodes: e, view: t }) => t?.id === "files" && e.length === 1 && e[0].root?.startsWith("/files/") && (e[0].basename === "vault.cryptomator" || e[0].type === i.Folder && [...V.values()].some((t) => t.folder === e[0].path)),
	async exec({ nodes: e }) {
		let t = e[0];
		return await gn(t.type === i.Folder ? t.path : t.dirname), null;
	},
	order: 50
});
var Tn = /* @__PURE__ */ new Set(), K = null;
function En(e) {
	return Tn.has(e) || [...V.values()].some((t) => t.folder === e);
}
function Dn(e) {
	if (!K) return;
	K.folder = e;
	let t = e?.path;
	!t || !En(t) ? K.el.replaceChildren() : (K.el.replaceChildren(D("div", {
		class: "cryptomator-banner",
		role: "note"
	}, [
		D("span", {
			class: "cryptomator-banner__icon",
			"aria-hidden": "true"
		}),
		D("span", { class: "cryptomator-banner__text" }, y("This folder is a Cryptomator vault: its files are encrypted. Open it to see them, decrypted in this browser.")),
		D("button", {
			type: "button",
			class: "primary",
			onclick: () => gn(t)
		}, y("Open vault"))
	])), K.el.querySelector(".cryptomator-banner__icon").innerHTML = Mt);
}
var q = null;
function J(e) {
	if (!q) return;
	q.folder = e;
	let t = V.get(e?.attributes?.cryptomatorVault);
	t?.vault?.unlocked ? (q.el.replaceChildren(D("div", {
		class: "cryptomator-banner cryptomator-banner--unlocked",
		role: "status"
	}, [
		D("span", {
			class: "cryptomator-banner__icon",
			"aria-hidden": "true"
		}),
		D("span", { class: "cryptomator-banner__text" }, y("{vault} is unlocked in this browser. It locks after {minutes} minutes without use.", {
			vault: t.name,
			minutes: At
		})),
		D("button", {
			type: "button",
			class: "cryptomator-banner__lock",
			onclick: () => fn(t)
		}, y("Lock"))
	]), ...or(t)), q.el.querySelector(".cryptomator-banner__icon").innerHTML = Vt) : q.el.replaceChildren();
}
_({
	id: "cryptomator-vaults-unlocked",
	order: 4,
	enabled: (e, t) => cn && G(t),
	render(e, t) {
		q = {
			el: e,
			folder: t
		}, J(t);
	},
	updated(e) {
		J(e);
	}
}), _({
	id: "cryptomator-vaults-banner",
	order: 5,
	enabled: (e, t) => cn && t?.id === "files",
	render(e, t) {
		K = {
			el: e,
			folder: t
		}, Dn(t);
	},
	updated(e) {
		Dn(e);
	}
}), o("files:list:updated", ({ view: e, folder: t, contents: n }) => {
	e?.id === "files" && t?.path && ((n || []).some((e) => e.type === i.File && e.basename === "vault.cryptomator") && Tn.add(t.path), Dn(t));
});
function Y() {
	let e = H.kind === "folder" ? H : null;
	return e?.vault?.vault?.unlocked && an() === e.path ? e : null;
}
var X = !1, Z = 16777216, On = 1e3;
function kn(e, t) {
	let n = {
		size: e.size,
		read: async (t, n) => new Uint8Array(await e.slice(t, n).arrayBuffer()),
		all: async () => new Uint8Array(await e.arrayBuffer())
	};
	return {
		name: e.name,
		size: e.size,
		dirs: t,
		source: n
	};
}
function An(e, t) {
	let n = {
		size: t.size,
		read: (n, r) => e.readRange(t.path, n, r),
		all: () => e.read(t.path),
		remote: !0
	};
	return {
		name: t.name,
		size: t.size,
		dirs: t.dirs,
		source: n,
		origin: t
	};
}
async function jn(e, t = [], n = {}) {
	let r = n.into ?? Y();
	if (!r || e.length === 0 && t.length === 0) return;
	if (X) {
		B(y("Another change to the vault is still running."));
		return;
	}
	X = !0;
	let { vault: i } = r.vault, a = Ve(n.title || y("Uploading to {vault}", { vault: r.vault.name })), o = null, s = 0, c = [], l = [], u = "", d = /* @__PURE__ */ new Map([["", r.dirId]]), f = async (e) => {
		let t = "";
		for (let n of e) {
			let e = t ? t + "/" + n : n;
			d.has(e) || d.set(e, (await i.ensureDirectory(d.get(t), n)).dirId), t = e;
		}
		return d.get(t);
	};
	try {
		for (let e of t) try {
			await f(e);
		} catch (t) {
			l.push(e.join("/")), a.file(e.join("/") + "/").done(W(t), !0);
		}
		for (let [t, r] of e.entries()) {
			let { dirs: u } = r, d = [...u, r.name].join("/"), p = a.file(d);
			if (a.stopped) {
				p.done(y("Not uploaded"));
				continue;
			}
			let m = o === "replace-all", h = r.name, g = async () => {
				let e = await f(u), t = {
					encrypt: y("Encrypting"),
					upload: y("Uploading"),
					verify: y("Checking")
				}, a = r.size >= Z, o = a ? {
					upload: [0, .7],
					verify: [.7, .3]
				} : {
					encrypt: [0, .2],
					upload: [.2, .6],
					verify: [.8, .2]
				}, s = (e, n, r) => {
					let [i, s] = o[e];
					p.phase(e === "upload" && a ? y("Encrypting and uploading") : t[e], i + s * (r ? n / r : 1));
				}, c = null;
				a || (r.source.remote && p.phase(y("Reading"), 0), c = await r.source.all());
				for (let t = 1;; t++) {
					h = n.keepBoth ? vt(r.name, t) : r.name;
					try {
						a ? await i.writeFileStream(e, h, r.source, {
							replace: m,
							onProgress: s
						}) : await i.writeFile(e, h, c, {
							replace: m,
							onProgress: s
						});
						break;
					} catch (e) {
						if (!n.keepBoth || !["exists", "exists-other"].includes(e?.code) || t >= On) throw e;
					}
				}
				await n.check?.(r);
			};
			try {
				try {
					await g();
				} catch (t) {
					if (t?.code !== "exists" || o === "skip-all" || n.keepBoth) throw t;
					let r = o === "replace-all" ? "replace" : await a.ask(d, e.length);
					if (r === "cancel") {
						p.done(y("Not uploaded"));
						break;
					}
					if (r.endsWith("-all") && (o = r), r.startsWith("skip")) {
						p.done(y("Skipped"));
						continue;
					}
					m = !0, await g();
				}
				s++, c.push(r), p.done(h === r.name ? n.written || y("Uploaded and checked") : y("Encrypted and checked as “{name}”", { name: h }));
			} catch (e) {
				e?.code === "exists" && o === "skip-all" ? p.done(y("Skipped")) : (l.push(d), p.done(W(e), !0));
			}
			a.progress((t + 1) / e.length);
		}
		n.after && (u = await n.after(c, a));
	} finally {
		X = !1, a.finish((l.length ? y("{written} uploaded, {failed} failed. The vault is unchanged where an upload failed.", {
			written: s,
			failed: l.length
		}) : y("{written} uploaded and checked.", { written: s })) + (u ? " " + u : ""), l.length > 0), dn(r.vault.name);
	}
}
function Mn(e = !1) {
	let t = D("input", {
		type: "file",
		multiple: !0,
		hidden: !0,
		webkitdirectory: e || null
	});
	t.addEventListener("change", () => {
		let e = [...t.files].map((e) => kn(e, (e.webkitRelativePath || e.name).split("/").slice(0, -1)));
		t.remove(), jn(e);
	}), document.body.append(t), t.click();
}
async function Nn(e) {
	let t = [], n = [], r = async (e, i) => {
		if (e.isFile) t.push(kn(await new Promise((t, n) => e.file(t, n)), i));
		else if (e.isDirectory) {
			let t = [...i, e.name];
			n.push(t);
			let a = e.createReader();
			for (;;) {
				let e = await new Promise((e, t) => a.readEntries(e, t));
				if (e.length === 0) break;
				for (let n of e) await r(n, t);
			}
		}
	};
	for (let t of e) await r(t, []);
	return {
		files: t,
		folders: n
	};
}
async function Pn() {
	let e = Y();
	if (!e) return;
	let t = await Re(y("New folder"), y("Folder name"), (e) => {
		try {
			return St(e), null;
		} catch (e) {
			return W(e);
		}
	});
	if (t !== null) try {
		await e.vault.vault.createDirectory(e.dirId, t), dn(e.vault.name);
	} catch (e) {
		B(W(e));
	}
}
async function Fn(e, t) {
	if (X) B(y("Another change to the vault is still running."));
	else {
		X = !0;
		try {
			await t();
		} finally {
			X = !1, dn(e.vault.name);
		}
	}
}
function In(e, t) {
	return e?.code === "not-found" ? y("“{name}” is no longer there.", { name: t }) : W(e);
}
function Ln(e, t) {
	let n = G(t) ? Y() : null;
	return n !== null && e.length > 0 && e.every((e) => e.attributes?.cryptomatorVault === n.vault.seg);
}
async function Rn(e) {
	let t = Y(), n = e.displayname, r = await Re(y("Rename"), y("New name"), (e) => {
		try {
			return St(e), null;
		} catch (e) {
			return W(e);
		}
	}, {
		initial: n,
		action: y("Rename")
	});
	r !== null && r.normalize("NFC") !== n && await Fn(t, async () => {
		try {
			await t.vault.vault.moveEntry(t.dirId, n, t.dirId, r);
		} catch (e) {
			B(In(e, n));
		}
	});
}
async function zn(e) {
	let t = Y(), { vault: n } = t.vault, r = new Set(e.filter((e) => e.type === i.Folder).map((e) => t.vault.dirs.get(e.basename)?.dirId).filter(Boolean)), a = await Be(e.length === 1 ? y("Move “{name}” to …", { name: e[0].displayname }) : y("Move {count} items to …", { count: e.length }), t.vault.name, async (e) => (await n.list(e)).filter((e) => e.type === "dir").map((e) => ({
		name: e.name,
		dirId: e.dirId
	})), r, y("Move here"));
	a !== null && a.dirId !== t.dirId && await Fn(t, async () => {
		let r = [];
		for (let i of e) try {
			await n.moveEntry(t.dirId, i.displayname, a.dirId, void 0, { ancestors: a.ancestors });
		} catch (e) {
			r.push(i.displayname + ": " + In(e, i.displayname));
		}
		r.length && B(r.join("\n"));
	});
}
async function Bn(e) {
	let t = Y(), n = e.filter((e) => e.type === i.Folder).length;
	await ze(e.length === 1 ? y("Delete “{name}”?", { name: e[0].displayname }) : y("Delete {count} items?", { count: e.length }), (n ? y("Folders are deleted with everything in them.") + " " : "") + y("The encrypted files go to Nextcloud's deleted files."), y("Delete")) && await Fn(t, async () => {
		let n = [];
		for (let r of e) try {
			await t.vault.vault.removeEntry(t.dirId, r.displayname);
		} catch (e) {
			n.push(r.displayname + ": " + In(e, r.displayname));
		}
		n.length && B(n.join("\n"));
	});
}
var Vn = 10485760;
function Q(e) {
	return [...Tn, ...[...V.values()].map((e) => e.folder)].some((t) => e === t || e.startsWith(t.replace(/\/+$/, "") + "/"));
}
function Hn(e) {
	let t = new Uint8Array(e.reduce((e, t) => e + t.length, 0)), n = 0;
	for (let r of e) t.set(r, n), n += r.length;
	return t;
}
async function* Un(e, t) {
	let n = [], r = 0;
	for await (let i of e) for (n.push(i), r += i.length; r >= t;) {
		let e = Hn(n);
		yield e.subarray(0, t), n = r > t ? [e.subarray(t)] : [], r -= t;
	}
	r > 0 && (yield Hn(n));
}
async function Wn(e) {
	return new Uint8Array(await crypto.subtle.digest("SHA-256", e));
}
function Gn(e, t) {
	return e.length === t.length && e.every((e, n) => e === t[n]);
}
function Kn(e) {
	let t = V.get(e.attributes?.cryptomatorVault);
	if (e.type === i.Folder) {
		let n = t?.dirs.get(e.basename);
		return n ? {
			type: "dir",
			name: n.name,
			dirId: n.dirId
		} : null;
	}
	return t?.entries.get(e.basename) ?? null;
}
async function qn() {
	let e = Y();
	if (!e) return;
	let t = null, n;
	try {
		let { getFilePickerBuilder: e } = await wt();
		n = await e(y("Copy or move into the vault")).setMultiSelect(!0).allowDirectories(!0).setFilter((e) => !Q(e.path)).setButtonFactory((e) => [{
			label: y("Copy into the vault"),
			variant: "secondary",
			disabled: e.length === 0,
			callback: () => {
				t = "copy";
			}
		}, {
			label: y("Move into the vault"),
			variant: "primary",
			disabled: e.length === 0,
			callback: () => {
				t = "move";
			}
		}]).build().pick();
	} catch {
		return;
	}
	if (n = [].concat(n || []), t === null || n.length === 0) return;
	let r = R(""), i;
	try {
		i = await ct(r, n);
	} catch (e) {
		B(W(e));
		return;
	}
	await jn(i.flatMap((e) => e.files.map((e) => An(r, e))), i.flatMap((e) => e.folders), {
		title: y(t === "move" ? "Moving into {vault}" : "Copying into {vault}", { vault: e.vault.name }),
		written: y("Encrypted and checked"),
		async check(e) {
			if ((await r.stat(e.origin.path))?.etag !== e.origin.etag) throw new xt("changed", e.origin.path);
		},
		after: t === "move" ? (e, t) => Jn(r, i, e, t) : void 0
	});
}
async function Jn(e, t, n, r) {
	let i = new Set(n.map((e) => e.origin)), a = 0;
	for (let n of t) {
		let t = r.file(n.isDir ? n.name + "/" : n.name);
		if (!n.files.every((e) => i.has(e))) t.done(y("Original kept: not all of it is in the vault"), !0);
		else if (!n.permissions.includes("D") || n.permissions.includes("S")) t.done(y("Original kept: it is shared with you"), !0);
		else try {
			await e.removeUnchanged(n.path, n.etag, { isDir: n.isDir }), a++, t.done(await lt(n.path) ? y("Original deleted for good") : y("Original deleted; it may still be in the deleted files"));
		} catch (e) {
			t.done(W(e), !0);
		}
	}
	return a ? y("Originals deleted for good: {removed}.", { removed: a }) : "";
}
async function Yn(e, t, n, r, i, a) {
	if (n.size < Z) {
		a("decrypt", 0, 1);
		let o = await e.readFile(n);
		if (await t.write(r, o, {
			create: !i,
			onProgress: (e, t) => a("upload", e, t)
		}), a("verify", 0, 1), !Gn(await Wn(await t.read(r)), await Wn(o))) throw new xt("network", "the stored copy differs from the decrypted file");
		return;
	}
	let o = [];
	async function* s(e) {
		for await (let t of e) o.push(await Wn(t)), yield t;
	}
	if (await t.writeParts(r, n.size, s(Un(e.decryptedPieces(n), Vn)), {
		create: !i,
		onProgress: (e, t) => a("upload", e, t)
	}), (await t.stat(r))?.size !== n.size) throw new xt("network", "the stored copy has another size than the decrypted file");
	for (let [e, i] of o.entries()) {
		let s = e * Vn;
		if (!Gn(await Wn(await t.readRange(r, s, Math.min(s + Vn, n.size))), i)) throw new xt("network", "the stored copy differs from the decrypted file");
		a("verify", e + 1, o.length);
	}
}
async function Xn(e) {
	let t = Y();
	if (!t) return;
	let n = null, r = null;
	try {
		let { getFilePickerBuilder: t } = await wt();
		await t(e.length === 1 ? y("Export “{name}” decrypted to …", { name: e[0].displayname }) : y("Export {count} items decrypted to …", { count: e.length })).setMultiSelect(!1).allowDirectories(!0).setMimeTypeFilter(["httpd/unix-directory"]).setFilter((e) => e.type === i.Folder && !Q(e.path)).setButtonFactory((e, t) => [{
			label: y("Copy here"),
			variant: "secondary",
			callback: () => {
				n = "copy", r = t;
			}
		}, {
			label: y("Move here"),
			variant: "primary",
			callback: () => {
				n = "move", r = t;
			}
		}]).build().pick();
	} catch {}
	if (n === null || r === null) return;
	if (Q(r)) {
		B(y("Choose a folder outside the vault."));
		return;
	}
	if (X) {
		B(y("Another change to the vault is still running."));
		return;
	}
	X = !0;
	let { vault: a } = t.vault, o = R(""), s = (...e) => [r.replace(/^\/+|\/+$/g, ""), ...e].filter(Boolean).join("/"), c = Ve(y(n === "move" ? "Moving out of {vault}" : "Exporting from {vault}", { vault: t.vault.name })), l = {
		text: y("Replace the file in your files with the one from the vault? Nextcloud keeps the old one among its versions."),
		cancel: y("Cancel")
	}, u = null, d = 0, f = 0, p = !1, m = [];
	try {
		let r = [];
		for (let t of e) {
			let e = Kn(t), n = {
				name: t.displayname,
				files: [],
				folders: [],
				complete: e !== null
			}, i = async (e, t) => {
				n.folders.push(t);
				for (let r of await a.list(e)) r.type === "dir" ? await i(r.dirId, [...t, r.name]) : r.type === "file" ? n.files.push({
					entry: r,
					dirs: t
				}) : n.complete = !1;
			};
			e?.type === "dir" ? await i(e.dirId, [e.name]) : e?.type === "file" ? n.files.push({
				entry: e,
				dirs: []
			}) : n.complete = !1, r.push(n);
		}
		let i = r.reduce((e, t) => e + t.files.length, 0), h = 0;
		for (let e of r) {
			for (let t of e.folders) try {
				await o.mkdir(s(...t), { existsOk: !0 });
			} catch (n) {
				e.complete = !1, m.push(t.join("/")), c.file(t.join("/") + "/").done(W(n), !0);
			}
			for (let { entry: t, dirs: n } of e.files) {
				let r = [...n, t.name].join("/"), f = c.file(r);
				if (h++, c.stopped || p) {
					e.complete = !1, f.done(y("Not exported"));
					continue;
				}
				let g = {
					decrypt: y("Decrypting"),
					upload: t.size >= Z ? y("Decrypting and uploading") : y("Uploading"),
					verify: y("Checking")
				}, _ = {
					decrypt: [0, .2],
					upload: [.2, .6],
					verify: [.8, .2]
				}, ee = (e, t, n) => f.phase(g[e], _[e][0] + _[e][1] * (n ? t / n : 1)), te = u === "replace-all";
				try {
					try {
						await Yn(a, o, t, s(...n, t.name), te, ee);
					} catch (e) {
						if (e?.code !== "exists" || u === "skip-all") throw e;
						let d = u === "replace-all" ? "replace" : await c.ask(r, i, l);
						if (d === "cancel") throw p = !0, Object.assign(/* @__PURE__ */ Error("cancelled"), { cancelled: !0 });
						if (d.endsWith("-all") && (u = d), d.startsWith("skip")) throw Object.assign(/* @__PURE__ */ Error("skipped"), { skipped: !0 });
						te = !0, await Yn(a, o, t, s(...n, t.name), te, ee);
					}
					d++, f.done(y("Exported and checked"));
				} catch (t) {
					if (e.complete = !1, t?.cancelled) {
						f.done(y("Not exported"));
						continue;
					}
					t?.skipped || t?.code === "exists" && u === "skip-all" ? f.done(y("Skipped")) : (m.push(r), f.done(W(t), !0));
				}
				c.progress(h / Math.max(i, 1));
			}
			if (n === "move") {
				let n = c.file(y("“{name}” in the vault", { name: e.name }));
				if (!e.complete) {
					n.done(y("Kept in the vault: not all of it was exported"), !0);
					continue;
				}
				try {
					await a.removeEntry(t.dirId, e.name), f++, n.done(y("Removed from the vault"));
				} catch (t) {
					n.done(In(t, e.name), !0);
				}
			}
		}
	} catch (e) {
		m.push(""), B(W(e));
	} finally {
		X = !1;
		let e = m.length ? y("{written} exported, {failed} failed.", {
			written: d,
			failed: m.length
		}) : y("{written} exported and checked.", { written: d });
		c.finish(e + (f ? " " + y("{removed} removed from the vault.", { removed: f }) : ""), m.length > 0), dn(t.vault.name);
	}
}
h({
	id: "cryptomator-vaults-rename",
	displayName: () => y("Rename"),
	iconSvgInline: () => Rt,
	enabled: ({ nodes: e, view: t }) => Ln(e, t) && e.length === 1,
	async exec({ nodes: e }) {
		return await Rn(e[0]), null;
	},
	order: -700
}), h({
	id: "cryptomator-vaults-move",
	displayName: () => y("Move …"),
	iconSvgInline: () => zt,
	enabled: ({ nodes: e, view: t }) => Ln(e, t),
	async exec({ nodes: e }) {
		return await zn(e), null;
	},
	async execBatch({ nodes: e }) {
		return await zn(e), e.map(() => null);
	},
	order: -690
}), h({
	id: "cryptomator-vaults-export",
	displayName: () => y("Export to your files …"),
	iconSvgInline: () => Ht,
	enabled: ({ nodes: e, view: t }) => Ln(e, t),
	async exec({ nodes: e }) {
		return await Xn(e), null;
	},
	async execBatch({ nodes: e }) {
		return await Xn(e), e.map(() => null);
	},
	order: -680
}), h({
	id: "cryptomator-vaults-delete",
	displayName: () => y("Delete"),
	iconSvgInline: () => Bt,
	enabled: ({ nodes: e, view: t }) => Ln(e, t),
	async exec({ nodes: e }) {
		return await Bn(e), null;
	},
	async execBatch({ nodes: e }) {
		return await Bn(e), e.map(() => null);
	},
	destructive: !0,
	order: 100
}), g({
	id: "cryptomator-vaults-upload",
	displayName: () => y("Upload files …"),
	iconSvgInline: () => It,
	order: -2,
	enabled: ({ view: e }) => G(e) && Y() !== null,
	exec: async () => (Mn(), null)
}), g({
	id: "cryptomator-vaults-upload-folder",
	displayName: () => y("Upload folder …"),
	iconSvgInline: () => It,
	order: -1.5,
	enabled: ({ view: e }) => G(e) && Y() !== null,
	exec: async () => (Mn(!0), null)
}), g({
	id: "cryptomator-vaults-import",
	displayName: () => y("Add from your files …"),
	iconSvgInline: () => Ut,
	order: -1.2,
	enabled: ({ view: e }) => G(e) && Y() !== null,
	exec: async () => (await qn(), null)
}), g({
	id: "cryptomator-vaults-new-folder",
	displayName: () => y("New folder …"),
	iconSvgInline: () => Lt,
	order: -1,
	enabled: ({ view: e }) => G(e) && Y() !== null,
	exec: async () => (await Pn(), null)
});
function Zn(e) {
	Y() && e.dataTransfer?.types?.includes("Files") && (e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy");
}
function Qn(e) {
	if (!Y() || !e.dataTransfer?.files?.length) return;
	e.preventDefault(), e.stopPropagation();
	let t = [...e.dataTransfer.items || []].map((e) => e.webkitGetAsEntry?.()).filter(Boolean);
	t.length === 0 ? jn([...e.dataTransfer.files].map((e) => kn(e, []))) : Nn(t).then(({ files: e, folders: t }) => jn(e, t), (e) => B(W(e)));
}
window.addEventListener("dragover", Zn, !0), window.addEventListener("drop", Qn, !0);
var $n = 6e5, $ = null;
function er(e = !1) {
	if (e || !$ || Date.now() - $.at > $n) {
		let e = (async () => {
			let e = R(""), t = [];
			for (let n of (await st(dt)).map(z)) try {
				let r = await e.read(n.slice(1) + "/" + dt);
				t.push({
					folder: n,
					...r.length > 65536 ? { problem: "invalid" } : ht(new TextDecoder().decode(r), n)
				});
			} catch {}
			return t;
		})();
		$ = {
			at: Date.now(),
			promise: e
		}, e.catch(() => {
			$?.promise === e && ($ = null);
		});
	}
	return $.promise;
}
function tr() {
	return "cryptomator_vaults.inbox-auto." + I();
}
function nr() {
	try {
		let e = JSON.parse(window.localStorage.getItem(tr()) || "[]");
		return Array.isArray(e) ? e.filter((e) => typeof e == "string") : [];
	} catch {
		return [];
	}
}
function rr(e) {
	return nr().includes(e.folder);
}
function ir(e, t) {
	try {
		let n = nr().filter((t) => t !== e.folder);
		window.localStorage.setItem(tr(), JSON.stringify(t ? [...n, e.folder] : n));
	} catch {}
}
async function ar(e) {
	let t = [], n = [], r = R(""), i = z(e.folder), a;
	try {
		a = (await er()).filter((e) => (e.inbox?.vault ?? e.vault) === i);
	} catch (n) {
		return e.inbox = {
			items: t,
			problems: [y("The search for inboxes failed: {detail}", { detail: n.message })]
		}, e.inbox;
	}
	let o = null;
	for (let e of a) {
		let a = e.folder;
		if (e.problem === "version") n.push(y("The inbox “{inbox}” needs a newer version of this app; it is left alone.", { inbox: a }));
		else if (e.problem === "loop" || Q(a)) n.push(y("The inbox “{inbox}” is left alone: it is a vault's folder, inside one or holds one.", { inbox: a }));
		else if (e.inbox) try {
			if (o === null) {
				let e = (await r.stat(i.slice(1)))?.permissions ?? "";
				o = e.includes("C") && e.includes("K");
			}
			if (!o) {
				n.push(y("The inbox “{inbox}” is left alone: you cannot write to this vault.", { inbox: a }));
				continue;
			}
			let s = await r.stat(a.slice(1));
			if (s === null || !s.isDir) continue;
			if (s.permissions.includes("S")) {
				n.push(y("The inbox “{inbox}” is left alone: it is shared with you, and its files are not yours to delete.", { inbox: a }));
				continue;
			}
			t.push({
				inbox: e.inbox,
				plan: await yt(e.inbox, (e) => r.list(e))
			});
		} catch (e) {
			n.push(y("The inbox “{inbox}” cannot be read: {detail}", {
				inbox: a,
				detail: W(e)
			}));
		}
	}
	return e.inbox = {
		items: t,
		problems: n
	}, e.inbox;
}
function or(e) {
	let t = (e.inbox?.items ?? []).filter((e) => e.plan.ready.length > 0), n = (e.inbox?.problems ?? []).map((e) => D("div", {
		class: "cryptomator-banner cryptomator-banner--inbox",
		role: "note"
	}, D("span", { class: "cryptomator-banner__text cryptomator-notice--error" }, e)));
	for (let r of t) {
		let { inbox: t, plan: i } = r, a = i.ready.length, o = {
			from: t.from,
			inbox: t.folder,
			size: Se(i.ready.reduce((e, t) => e + t.size, 0))
		}, s = (t.from ? ie("%n file from {from} is waiting in “{inbox}” ({size}).", "%n files from {from} are waiting in “{inbox}” ({size}).", a, o) : ie("%n file is waiting in “{inbox}” ({size}).", "%n files are waiting in “{inbox}” ({size}).", a, o)) + (i.recent.length ? " " + ie("%n more is still being written and comes next time.", "%n more are still being written and come next time.", i.recent.length) : "");
		n.push(D("div", {
			class: "cryptomator-banner cryptomator-banner--inbox",
			role: "status"
		}, [
			D("span", {
				class: "cryptomator-banner__icon",
				"aria-hidden": "true"
			}),
			D("span", { class: "cryptomator-banner__text" }, s),
			D("button", {
				type: "button",
				class: "primary",
				onclick: () => cr(e, [r])
			}, y("Move into the vault"))
		])), n[n.length - 1].querySelector(".cryptomator-banner__icon").innerHTML = Ut;
	}
	if (t.length > 0) {
		let t = D("input", {
			type: "checkbox",
			checked: rr(e),
			onchange: () => ir(e, t.checked)
		});
		n.push(D("label", { class: "cryptomator-inbox-auto" }, [t, y("Move files from inboxes automatically when I unlock")]));
	}
	return n;
}
async function sr(e) {
	try {
		await ar(e);
	} catch {
		return;
	}
	J(q?.folder), rr(e) && e.inbox.items.some((e) => e.plan.ready.length > 0) && await cr(e, e.inbox.items);
}
async function cr(e, t) {
	if (!e.vault?.unlocked) return;
	if (X) {
		B(y("Another change to the vault is still running."));
		return;
	}
	let n = new Set(t.map((e) => e.inbox.folder)), r = (await ar(e)).items.filter((e) => n.has(e.inbox.folder) && e.plan.ready.length > 0);
	if (J(q?.folder), r.length === 0) return;
	let i = R("");
	await jn(r.flatMap((e) => e.plan.ready.map((e) => An(i, e))), [], {
		into: {
			vault: e,
			dirId: ""
		},
		keepBoth: !0,
		title: y("Moving from inboxes into {vault}", { vault: e.name }),
		written: y("Encrypted and checked"),
		async check(e) {
			if ((await i.stat(e.origin.path))?.etag !== e.origin.etag) throw new xt("changed", e.origin.path);
		},
		after: (e, t) => lr(i, r, e, t)
	}), await ar(e).catch(() => {}), J(q?.folder);
}
async function lr(e, t, n, r) {
	let i = [];
	for (let t of n.map((e) => e.origin)) if (!t.permissions.includes("D")) r.file(t.path).done(y("Plain copy kept: you cannot delete it"), !0);
	else try {
		await e.removeUnchanged(t.path, t.etag), i.push(t.path);
	} catch (e) {
		r.file(t.path).done(W(e), !0);
	}
	let a = [];
	for (let n of t) for (let t of n.plan.folders) {
		let r = [n.inbox.folder.slice(1), ...t].join("/");
		if (i.some((e) => e.startsWith(r + "/"))) try {
			(await e.list(r)).length === 0 && (await e.remove(r), a.push(r));
		} catch {}
	}
	let o = /* @__PURE__ */ new Set();
	try {
		o = await ut(i), await ut(a, { onlyEmpty: !0 });
	} catch (e) {
		r.file(y("Deleted files")).done(W(e), !0);
	}
	let s = i.length - o.size;
	return (i.length ? y("Plain copies deleted for good: {removed}.", { removed: o.size }) : "") + (s ? " " + y("{count} of them may still be in the deleted files.", { count: s }) : "");
}
async function ur(e) {
	let t = z(e.folder), n = pt(t).slice(0, -1), r = await He({
		title: y("Make an inbox for {vault}", { vault: e.name }),
		intro: [y("Files put into an inbox, by you or by an app such as Harvester, are offered for the vault when you unlock it, and moved into it encrypted. Until then they are ordinary files on the server."), y("The folder in the vault the files go to is written unencrypted into the inbox's marker file, {marker}.", { marker: dt })],
		fields: [
			{
				name: "folder",
				label: y("Inbox folder"),
				value: "/" + [...n, y("{vault} inbox", { vault: e.name })].join("/")
			},
			{
				name: "target",
				label: y("Folder in the vault"),
				value: "/"
			},
			{
				name: "from",
				label: y("Filled by (optional)"),
				value: "",
				optional: !0
			}
		],
		action: y("Make the inbox"),
		working: y("Making the inbox …"),
		async run({ folder: e, target: n, from: r }) {
			let i = z(e), a = z(n);
			if (i === null || i === "/") throw Error(y("“{name}” cannot be a folder's name.", { name: e }));
			if (a === null) throw Error(y("“{name}” cannot be a name in a vault.", { name: n }));
			for (let e of pt(a)) try {
				St(e);
			} catch (e) {
				throw Error(W(e));
			}
			if (mt(i, t) || mt(t, i) || Q(i)) throw Error(y("An inbox cannot be a vault's folder, inside one or hold one."));
			let o = R(""), s = await o.stat(i.slice(1));
			if (s === null) try {
				await o.mkdir(i.slice(1));
			} catch (e) {
				throw Error(y("“{folder}” could not be created: {detail}", {
					folder: i,
					detail: e.message
				}));
			}
			else if (!s.isDir) throw Error(y("“{folder}” is a file.", { folder: i }));
			try {
				await o.write(i.slice(1) + "/" + dt, new TextEncoder().encode(gt({
					vault: t,
					target: a,
					from: r.trim()
				})), { create: !0 });
			} catch (e) {
				throw Error(e?.code === "exists" ? y("“{folder}” is an inbox already.", { folder: i }) : W(e));
			}
			return i;
		}
	});
	r && (await er(!0).catch(() => {}), e.vault?.unlocked && (await ar(e).catch(() => {}), J(q?.folder)), Tt(y("“{folder}” is an inbox of {vault} now.", {
		folder: r,
		vault: e.name
	})));
}
var dr = 8, fr = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M7 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm5.65-4A6 6 0 1 0 12.65 14H17v4h4v-4h2v-4H12.65z\"/></svg>", pr = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5A5.5 5.5 0 0 1 7.5 3c1.74 0 3.41.81 4.5 2.09A6 6 0 0 1 16.5 3 5.5 5.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35zM11 7v3H8v2h3v3h2v-3h3v-2h-3V7h-2z\"/></svg>";
function mr() {
	return import("./cryptomator_vaults-recovery-words-DqCVkwRb.mjs").then((e) => e.default.split("\n"));
}
function hr(e, t) {
	if (e.length < dr) throw Error(y("The password needs at least {count} characters.", { count: dr }));
	if (e !== t) throw Error(y("The two passwords differ."));
}
function gr(e) {
	switch (e.kind) {
		case "MissingDirIdBackup": return y("A folder's spare copy of its ID is missing. Repairing writes it.");
		case "MissingContentDir": return y("A folder's contents are missing; it cannot be opened. Repairing creates it anew, empty.");
		case "OrphanContentDir": return y("Encrypted files that no folder leads to. Repairing moves them into the folder LOST+FOUND.");
		case "LooseDirFile": return y("A stray folder file outside any folder. Repairing removes it.");
		case "EmptyDirFile": return y("A folder whose file is empty; it cannot be opened. Repairing removes the broken entry.");
		case "UnknownType": return e.fixable ? y("An empty entry that is neither file, folder nor link. Repairing removes it.") : y("An entry that is neither file, folder nor link, and not empty. Look at it in Cryptomator.");
		case "AmbiguousType": return y("An entry that is several kinds at once. Look at it in Cryptomator.");
		case "LongShortNamesMismatch": return y("An entry with a long name, stored under the wrong short name. Repairing renames it.");
		case "TrailingBytesInNameFile": return y("A long name with stray bytes after it. Repairing removes them.");
		case "MissingLongName":
		case "NotDecodableLongName":
		case "ObeseNameFile": return y("An entry whose long name is missing or damaged. Look at it in Cryptomator.");
		case "ObeseDirFile":
		case "DirIdCollision": return y("A folder whose ID is damaged or used twice. Look at it in Cryptomator.");
		default: return e.kind;
	}
}
async function _r() {
	let e = null;
	try {
		let { getFilePickerBuilder: t } = await wt();
		await t(y("Where should the new vault go?")).startAt("/").setMultiSelect(!1).allowDirectories(!0).setMimeTypeFilter(["httpd/unix-directory"]).setFilter((e) => e.type === i.Folder && !Q(e.path)).setButtonFactory((t, n) => [{
			label: y("Create the vault here"),
			variant: "primary",
			callback: () => {
				e = n;
			}
		}]).build().pick();
	} catch {}
	if (e === null) return;
	if (Q(e)) {
		B(y("A vault cannot be inside a vault."));
		return;
	}
	let t = R(""), n = await He({
		title: y("New vault"),
		intro: [y("The vault is a folder of encrypted files, which Cryptomator opens too. Its password cannot be recovered without the recovery key shown next.")],
		fields: [
			{
				name: "place",
				label: y("In"),
				value: e,
				readonly: !0
			},
			{
				name: "name",
				label: y("Name"),
				value: y("Vault")
			},
			{
				name: "password",
				label: y("Password"),
				type: "password",
				autocomplete: "new-password"
			},
			{
				name: "repeated",
				label: y("Password again"),
				type: "password",
				autocomplete: "new-password"
			}
		],
		action: y("Create"),
		working: y("Creating the vault …"),
		async run({ name: n, password: r, repeated: i }) {
			let a = n.trim();
			if (!a || a === "." || a === ".." || /[/\\]/.test(a)) throw Error(y("“{name}” cannot be a folder's name.", { name: a }));
			hr(r, i);
			let o = (e.replace(/\/+$/, "") + "/" + a).replace(/^\/*/, "/");
			try {
				await t.mkdir(o.slice(1));
			} catch (e) {
				throw Error(e?.code === "exists" ? y("A folder “{name}” is there already.", { name: a }) : W(e));
			}
			let s;
			try {
				s = await bt.create(R(o), r);
			} catch (e) {
				throw await t.remove(o.slice(1)).catch(() => {}), Error(W(e));
			}
			return {
				folder: o,
				vault: s,
				key: await s.recoveryKey(r, await mr())
			};
		}
	});
	if (!n) return;
	Qt(n.folder), Tn.add(n.folder), await tn();
	let r = await en(n.folder);
	r.vault = n.vault, mn(), await Ue(r.name, n.key, { created: !0 }), rn("/" + r.seg);
}
async function vr(e) {
	return e.vault ?? await bt.open(R(e.folder));
}
async function yr(e) {
	await He({
		title: y("Change the password of {vault}", { vault: e.name }),
		intro: [y("The files stay as they are; only the vault's key file gets the new password. Cryptomator on your other devices then needs the new one, too.")],
		fields: [
			{
				name: "account",
				label: y("Vault"),
				value: e.folder,
				readonly: !0,
				account: !0,
				autocomplete: "username"
			},
			{
				name: "old",
				label: y("Current password"),
				type: "password",
				autocomplete: "current-password"
			},
			{
				name: "password",
				label: y("New password"),
				type: "password",
				autocomplete: "new-password"
			},
			{
				name: "repeated",
				label: y("New password again"),
				type: "password",
				autocomplete: "new-password"
			}
		],
		action: y("Change password"),
		working: y("Changing the password …"),
		async run({ old: t, password: n, repeated: r }) {
			hr(n, r);
			try {
				let r = await vr(e);
				await r.changePassword(t, n), e.vault = r;
			} catch (e) {
				throw Error(W(e));
			}
			return !0;
		}
	}) && Tt(y("The password of {vault} is changed.", { vault: e.name }));
}
async function br(e) {
	let t = await He({
		title: y("Recovery key of {vault}", { vault: e.name }),
		intro: [y("Enter the vault's password to see its recovery key.")],
		fields: [{
			name: "account",
			label: y("Vault"),
			value: e.folder,
			readonly: !0,
			account: !0,
			autocomplete: "username"
		}, {
			name: "password",
			label: y("Password"),
			type: "password",
			autocomplete: "current-password"
		}],
		action: y("Show"),
		working: y("Unlocking …"),
		async run({ password: t }) {
			try {
				return await (await vr(e)).recoveryKey(t, await mr());
			} catch (e) {
				throw Error(W(e));
			}
		}
	});
	t && await Ue(e.name, t);
}
async function xr(e) {
	let t = await He({
		title: y("Reset the password of {vault}", { vault: e.name }),
		intro: [y("With the vault's recovery key (the words from Cryptomator or from this app) it gets a new password. The files stay as they are.")],
		fields: [
			{
				name: "account",
				label: y("Vault"),
				value: e.folder,
				readonly: !0,
				account: !0,
				autocomplete: "username"
			},
			{
				name: "key",
				label: y("Recovery key"),
				type: "textarea"
			},
			{
				name: "password",
				label: y("New password"),
				type: "password",
				autocomplete: "new-password"
			},
			{
				name: "repeated",
				label: y("New password again"),
				type: "password",
				autocomplete: "new-password"
			}
		],
		action: y("Set the new password"),
		working: y("Setting the new password …"),
		async run({ key: t, password: n, repeated: r }) {
			hr(n, r);
			try {
				return await bt.resetPassword(R(e.folder), t, n, await mr());
			} catch (e) {
				throw Error(W(e));
			}
		}
	});
	t && (e.vault = t, mn(), Tt(y("{vault} has a new password and is unlocked.", { vault: e.name })));
}
async function Sr(e) {
	(e.vault?.unlocked || await on(e)) && We(e.name, {
		check: (t) => e.vault.checkHealth(t),
		describe: gr,
		async repair(t) {
			if (X) throw Error(y("Another change to the vault is still running."));
			X = !0;
			try {
				for (let n of t) await e.vault.repair(n);
			} catch (e) {
				throw Error(W(e));
			} finally {
				X = !1, dn(e.name);
			}
		}
	});
}
var Cr = (e) => V.get(e[0].attributes.cryptomatorVault), wr = ({ nodes: e, view: t }) => cn && G(t) && e.length === 1 && e[0].attributes?.cryptomatorVaultRoot === !0;
for (let [e, t, n, r, i] of [
	[
		"cryptomator-vaults-change-password",
		() => y("Change password …"),
		fr,
		yr,
		-790
	],
	[
		"cryptomator-vaults-recovery-key",
		() => y("Show recovery key …"),
		fr,
		br,
		-780
	],
	[
		"cryptomator-vaults-reset-password",
		() => y("Reset password with recovery key …"),
		fr,
		xr,
		-770
	],
	[
		"cryptomator-vaults-health",
		() => y("Check health …"),
		pr,
		Sr,
		-760
	],
	[
		"cryptomator-vaults-make-inbox",
		() => y("Make an inbox for this vault …"),
		Ut,
		ur,
		-750
	]
]) h({
	id: e,
	displayName: t,
	iconSvgInline: () => n,
	enabled: wr,
	async exec({ nodes: e }) {
		return await r(Cr(e)), null;
	},
	order: i
});
g({
	id: "cryptomator-vaults-new",
	displayName: () => y("New vault …"),
	iconSvgInline: () => Lt,
	order: -.5,
	enabled: ({ view: e }) => cn && G(e) && H.kind === "vaults",
	exec: async () => (await _r(), null)
}), g({
	id: "cryptomator-vaults-add",
	displayName: () => y("Open a vault folder …"),
	iconSvgInline: () => Wt,
	order: 0,
	enabled: ({ view: e }) => G(e),
	exec: async () => (await _n(), null)
}), g({
	id: "cryptomator-vaults-lock-all",
	displayName: () => y("Lock all vaults"),
	iconSvgInline: () => Ft,
	order: 1,
	enabled: ({ view: e }) => G(e) && [...V.values()].some((e) => e.vault?.unlocked),
	exec: async () => (pn(), null)
}), m().register(new f({
	id: Et,
	name: y("Vaults"),
	caption: y("Cryptomator vaults, unlocked in this browser"),
	emptyTitle: y("No vaults found"),
	emptyCaption: y("Vaults in your files appear here. Open a vault's folder to add one."),
	emptyView: un,
	icon: Mt,
	order: 90,
	getContents: ln
})), xn();
for (let e of [
	"pointerdown",
	"keydown",
	"wheel",
	"touchstart"
]) document.addEventListener(e, hn, { passive: !0 });
window.addEventListener("pagehide", () => {
	j(), pn();
}), cn && tn().then(() => Dn(K?.folder));
export { Et as VIEW_ID };
