import { i as e, t } from "./cryptomator_vaults-rolldown-runtime-CwxnZyOB.mjs";
// node_modules/@nextcloud/files/dist/permissions.mjs
var n = Object.freeze({
	NONE: 0,
	READ: 1,
	UPDATE: 2,
	CREATE: 4,
	WRITE: 4,
	DELETE: 8,
	SHARE: 16,
	ALL: 31
});
// node_modules/@nextcloud/files/dist/utils/objectValidation.mjs
function r(e, t, n) {
	if (e[t] !== void 0) {
		if (n === "array") {
			if (!Array.isArray(e[t])) throw Error(`View ${t} must be an array`);
		} else if (typeof e[t] !== n) throw Error(`View ${t} must be a ${n}`);
		else if (n === "object" && (e[t] === null || Array.isArray(e[t]))) throw Error(`View ${t} must be an object`);
	}
}
// node_modules/@nextcloud/files/dist/ui/navigation/column.mjs
function i(e) {
	if (typeof e != "object" || !e) throw Error("View column must be an object");
	if (!e.id || typeof e.id != "string") throw Error("A column id is required");
	if (!e.title || typeof e.title != "string") throw Error("A column title is required");
	if (!e.render || typeof e.render != "function") throw Error("A render function is required");
	r(e, "sort", "function"), r(e, "summary", "function");
}
window._nc_files_scope ??= {}, window._nc_files_scope.v4_0 ??= {};
var a = window._nc_files_scope.v4_0, o = /* @__PURE__ */ t(((e, t) => {
	t.exports = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {};
})), s = /* @__PURE__ */ t(((e, t) => {
	t.exports = {
		MAX_LENGTH: 256,
		MAX_SAFE_COMPONENT_LENGTH: 16,
		MAX_SAFE_BUILD_LENGTH: 250,
		MAX_SAFE_INTEGER: 2 ** 53 - 1 || 
		/* istanbul ignore next */ 9007199254740991,
		RELEASE_TYPES: [
			"major",
			"premajor",
			"minor",
			"preminor",
			"patch",
			"prepatch",
			"prerelease"
		],
		SEMVER_SPEC_VERSION: "2.0.0",
		FLAG_INCLUDE_PRERELEASE: 1,
		FLAG_LOOSE: 2
	};
})), c = /* @__PURE__ */ t(((e, t) => {
	var { MAX_SAFE_COMPONENT_LENGTH: n, MAX_SAFE_BUILD_LENGTH: r, MAX_LENGTH: i } = s(), a = o();
	e = t.exports = {};
	var c = e.re = [], l = e.safeRe = [], u = e.src = [], d = e.safeSrc = [], f = e.t = {}, p = 0, m = "[a-zA-Z0-9-]", ee = [
		["\\s", 1],
		["\\d", i],
		[m, r]
	], h = (e) => {
		for (let [t, n] of ee) e = e.split(`${t}*`).join(`${t}{0,${n}}`).split(`${t}+`).join(`${t}{1,${n}}`);
		return e;
	}, g = (e, t, n) => {
		let r = h(t), i = p++;
		a(e, i, t), f[e] = i, u[i] = t, d[i] = r, c[i] = new RegExp(t, n ? "g" : void 0), l[i] = new RegExp(r, n ? "g" : void 0);
	};
	g("NUMERICIDENTIFIER", "0|[1-9]\\d*"), g("NUMERICIDENTIFIERLOOSE", "\\d+"), g("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${m}*`), g("MAINVERSION", `(${u[f.NUMERICIDENTIFIER]})\\.(${u[f.NUMERICIDENTIFIER]})\\.(${u[f.NUMERICIDENTIFIER]})`), g("MAINVERSIONLOOSE", `(${u[f.NUMERICIDENTIFIERLOOSE]})\\.(${u[f.NUMERICIDENTIFIERLOOSE]})\\.(${u[f.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASEIDENTIFIER", `(?:${u[f.NONNUMERICIDENTIFIER]}|${u[f.NUMERICIDENTIFIER]})`), g("PRERELEASEIDENTIFIERLOOSE", `(?:${u[f.NONNUMERICIDENTIFIER]}|${u[f.NUMERICIDENTIFIERLOOSE]})`), g("PRERELEASE", `(?:-(${u[f.PRERELEASEIDENTIFIER]}(?:\\.${u[f.PRERELEASEIDENTIFIER]})*))`), g("PRERELEASELOOSE", `(?:-?(${u[f.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${u[f.PRERELEASEIDENTIFIERLOOSE]})*))`), g("BUILDIDENTIFIER", `${m}+`), g("BUILD", `(?:\\+(${u[f.BUILDIDENTIFIER]}(?:\\.${u[f.BUILDIDENTIFIER]})*))`), g("FULLPLAIN", `v?${u[f.MAINVERSION]}${u[f.PRERELEASE]}?${u[f.BUILD]}?`), g("FULL", `^${u[f.FULLPLAIN]}$`), g("LOOSEPLAIN", `[v=\\s]*${u[f.MAINVERSIONLOOSE]}${u[f.PRERELEASELOOSE]}?${u[f.BUILD]}?`), g("LOOSE", `^${u[f.LOOSEPLAIN]}$`), g("GTLT", "((?:<|>)?=?)"), g("XRANGEIDENTIFIERLOOSE", `${u[f.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), g("XRANGEIDENTIFIER", `${u[f.NUMERICIDENTIFIER]}|x|X|\\*`), g("XRANGEPLAIN", `[v=\\s]*(${u[f.XRANGEIDENTIFIER]})(?:\\.(${u[f.XRANGEIDENTIFIER]})(?:\\.(${u[f.XRANGEIDENTIFIER]})(?:${u[f.PRERELEASE]})?${u[f.BUILD]}?)?)?`), g("XRANGEPLAINLOOSE", `[v=\\s]*(${u[f.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[f.XRANGEIDENTIFIERLOOSE]})(?:\\.(${u[f.XRANGEIDENTIFIERLOOSE]})(?:${u[f.PRERELEASELOOSE]})?${u[f.BUILD]}?)?)?`), g("XRANGE", `^${u[f.GTLT]}\\s*${u[f.XRANGEPLAIN]}$`), g("XRANGELOOSE", `^${u[f.GTLT]}\\s*${u[f.XRANGEPLAINLOOSE]}$`), g("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), g("COERCE", `${u[f.COERCEPLAIN]}(?:$|[^\\d])`), g("COERCEFULL", u[f.COERCEPLAIN] + `(?:${u[f.PRERELEASE]})?(?:${u[f.BUILD]})?(?:$|[^\\d])`), g("COERCERTL", u[f.COERCE], !0), g("COERCERTLFULL", u[f.COERCEFULL], !0), g("LONETILDE", "(?:~>?)"), g("TILDETRIM", `(\\s*)${u[f.LONETILDE]}\\s+`, !0), e.tildeTrimReplace = "$1~", g("TILDE", `^${u[f.LONETILDE]}${u[f.XRANGEPLAIN]}$`), g("TILDELOOSE", `^${u[f.LONETILDE]}${u[f.XRANGEPLAINLOOSE]}$`), g("LONECARET", "(?:\\^)"), g("CARETTRIM", `(\\s*)${u[f.LONECARET]}\\s+`, !0), e.caretTrimReplace = "$1^", g("CARET", `^${u[f.LONECARET]}${u[f.XRANGEPLAIN]}$`), g("CARETLOOSE", `^${u[f.LONECARET]}${u[f.XRANGEPLAINLOOSE]}$`), g("COMPARATORLOOSE", `^${u[f.GTLT]}\\s*(${u[f.LOOSEPLAIN]})$|^$`), g("COMPARATOR", `^${u[f.GTLT]}\\s*(${u[f.FULLPLAIN]})$|^$`), g("COMPARATORTRIM", `(\\s*)${u[f.GTLT]}\\s*(${u[f.LOOSEPLAIN]}|${u[f.XRANGEPLAIN]})`, !0), e.comparatorTrimReplace = "$1$2$3", g("HYPHENRANGE", `^\\s*(${u[f.XRANGEPLAIN]})\\s+-\\s+(${u[f.XRANGEPLAIN]})\\s*$`), g("HYPHENRANGELOOSE", `^\\s*(${u[f.XRANGEPLAINLOOSE]})\\s+-\\s+(${u[f.XRANGEPLAINLOOSE]})\\s*$`), g("STAR", "(<|>)?=?\\s*\\*"), g("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), g("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})), l = /* @__PURE__ */ t(((e, t) => {
	var n = Object.freeze({ loose: !0 }), r = Object.freeze({});
	t.exports = (e) => e ? typeof e == "object" ? e : n : r;
})), u = /* @__PURE__ */ t(((e, t) => {
	var n = /^[0-9]+$/, r = (e, t) => {
		if (typeof e == "number" && typeof t == "number") return e === t ? 0 : e < t ? -1 : 1;
		let r = n.test(e), i = n.test(t);
		return r && i && (e = +e, t = +t), e === t ? 0 : r && !i ? -1 : i && !r ? 1 : e < t ? -1 : 1;
	};
	t.exports = {
		compareIdentifiers: r,
		rcompareIdentifiers: (e, t) => r(t, e)
	};
})), d = /* @__PURE__ */ t(((e, t) => {
	var n = o(), { MAX_LENGTH: r, MAX_SAFE_INTEGER: i } = s(), { safeRe: a, t: d } = c(), f = l(), { compareIdentifiers: p } = u(), m = (e, t) => {
		let n = t.split(".");
		if (n.length > e.length) return !1;
		for (let t = 0; t < n.length; t++) if (p(e[t], n[t]) !== 0) return !1;
		return !0;
	};
	t.exports = class e {
		constructor(t, o) {
			if (o = f(o), t instanceof e) {
				if (t.loose === !!o.loose && t.includePrerelease === !!o.includePrerelease) return t;
				t = t.version;
			} else if (typeof t != "string") throw TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
			if (t.length > r) throw TypeError(`version is longer than ${r} characters`);
			n("SemVer", t, o), this.options = o, this.loose = !!o.loose, this.includePrerelease = !!o.includePrerelease;
			let s = t.trim().match(o.loose ? a[d.LOOSE] : a[d.FULL]);
			if (!s) throw TypeError(`Invalid Version: ${t}`);
			if (this.raw = t, this.major = +s[1], this.minor = +s[2], this.patch = +s[3], this.major > i || this.major < 0) throw TypeError("Invalid major version");
			if (this.minor > i || this.minor < 0) throw TypeError("Invalid minor version");
			if (this.patch > i || this.patch < 0) throw TypeError("Invalid patch version");
			this.prerelease = s[4] ? s[4].split(".").map((e) => {
				if (/^[0-9]+$/.test(e)) {
					let t = +e;
					if (t >= 0 && t < i) return t;
				}
				return e;
			}) : [], this.build = s[5] ? s[5].split(".") : [], this.format();
		}
		format() {
			return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
		}
		toString() {
			return this.version;
		}
		compare(t) {
			if (n("SemVer.compare", this.version, this.options, t), !(t instanceof e)) {
				if (typeof t == "string" && t === this.version) return 0;
				t = new e(t, this.options);
			}
			return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
		}
		compareMain(t) {
			return t instanceof e || (t = new e(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : +(this.patch > t.patch);
		}
		comparePre(t) {
			if (t instanceof e || (t = new e(t, this.options)), this.prerelease.length && !t.prerelease.length) return -1;
			if (!this.prerelease.length && t.prerelease.length) return 1;
			if (!this.prerelease.length && !t.prerelease.length) return 0;
			let r = 0;
			do {
				let e = this.prerelease[r], i = t.prerelease[r];
				if (n("prerelease compare", r, e, i), e === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (e === void 0) return -1;
				if (e !== i) return p(e, i);
			} while (++r);
		}
		compareBuild(t) {
			t instanceof e || (t = new e(t, this.options));
			let r = 0;
			do {
				let e = this.build[r], i = t.build[r];
				if (n("build compare", r, e, i), e === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (e === void 0) return -1;
				if (e !== i) return p(e, i);
			} while (++r);
		}
		inc(e, t, n) {
			if (e.startsWith("pre")) {
				if (!t && n === !1) throw Error("invalid increment argument: identifier is empty");
				if (t) {
					let e = `-${t}`.match(this.options.loose ? a[d.PRERELEASELOOSE] : a[d.PRERELEASE]);
					if (!e || e[1] !== t) throw Error(`invalid identifier: ${t}`);
				}
			}
			switch (e) {
				case "premajor":
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", t, n);
					break;
				case "preminor":
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t, n);
					break;
				case "prepatch":
					this.prerelease.length = 0, this.inc("patch", t, n), this.inc("pre", t, n);
					break;
				case "prerelease":
					this.prerelease.length === 0 && this.inc("patch", t, n), this.inc("pre", t, n);
					break;
				case "release":
					if (this.prerelease.length === 0) throw Error(`version ${this.raw} is not a prerelease`);
					this.prerelease.length = 0;
					break;
				case "major":
					(this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
					break;
				case "minor":
					(this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
					break;
				case "patch":
					this.prerelease.length === 0 && this.patch++, this.prerelease = [];
					break;
				case "pre": {
					let e = +!!Number(n);
					if (this.prerelease.length === 0) this.prerelease = [e];
					else {
						let r = this.prerelease.length;
						for (; --r >= 0;) typeof this.prerelease[r] == "number" && (this.prerelease[r]++, r = -2);
						if (r === -1) {
							if (t === this.prerelease.join(".") && n === !1) throw Error("invalid increment argument: identifier already exists");
							this.prerelease.push(e);
						}
					}
					if (t) {
						let r = [t, e];
						if (n === !1 && (r = [t]), m(this.prerelease, t)) {
							let e = this.prerelease[t.split(".").length];
							isNaN(e) && (this.prerelease = r);
						} else this.prerelease = r;
					}
					break;
				}
				default: throw Error(`invalid increment argument: ${e}`);
			}
			return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
		}
	};
})), f = /* @__PURE__ */ t(((e, t) => {
	var n = d();
	t.exports = (e, t) => new n(e, t).major;
})), p = /* @__PURE__ */ t(((e, t) => {
	var n = d();
	t.exports = (e, t, r = !1) => {
		if (e instanceof n) return e;
		try {
			return new n(e, t);
		} catch (e) {
			if (!r) return null;
			throw e;
		}
	};
})), m = /* @__PURE__ */ t(((e, t) => {
	var n = p();
	t.exports = (e, t) => {
		let r = n(e, t);
		return r ? r.version : null;
	};
})), ee = /* @__PURE__ */ e(f(), 1), h = /* @__PURE__ */ e(m(), 1), g = class {
	bus;
	constructor(e) {
		typeof e.getVersion != "function" || !(0, h.default)(e.getVersion()) ? console.warn("Proxying an event bus with an unknown or invalid version") : (0, ee.default)(e.getVersion()) !== (0, ee.default)(this.getVersion()) && console.warn("Proxying an event bus of version " + e.getVersion() + " with " + this.getVersion()), this.bus = e;
	}
	getVersion() {
		return "3.3.3";
	}
	subscribe(e, t) {
		this.bus.subscribe(e, t);
	}
	unsubscribe(e, t) {
		this.bus.unsubscribe(e, t);
	}
	emit(e, ...t) {
		this.bus.emit(e, ...t);
	}
}, te = class {
	handlers = /* @__PURE__ */ new Map();
	getVersion() {
		return "3.3.3";
	}
	subscribe(e, t) {
		this.handlers.set(e, (this.handlers.get(e) || []).concat(t));
	}
	unsubscribe(e, t) {
		this.handlers.set(e, (this.handlers.get(e) || []).filter((e) => e !== t));
	}
	emit(e, ...t) {
		(this.handlers.get(e) || []).forEach((e) => {
			try {
				e(t[0]);
			} catch (e) {
				console.error("could not invoke event listener", e);
			}
		});
	}
}, ne = null;
function _() {
	return ne === null ? typeof window > "u" ? new Proxy({}, { get: () => () => console.error("Window not available, EventBus can not be established!") }) : (window.OC?._eventBus && window._nc_event_bus === void 0 && (console.warn("found old event bus instance at OC._eventBus. Update your version!"), window._nc_event_bus = window.OC._eventBus), ne = window?._nc_event_bus === void 0 ? window._nc_event_bus = new te() : new g(window._nc_event_bus), ne) : ne;
}
function v(e, t) {
	_().subscribe(e, t);
}
function re(e, t) {
	_().unsubscribe(e, t);
}
function y(e, ...t) {
	_().emit(e, ...t);
}
// node_modules/@nextcloud/router/dist/index.mjs
var ie = (e) => "/remote.php/" + e;
function b(e, t) {
	return ce(t), (t?.baseURL ?? se()) + ie(e);
}
function ae(e, t, n) {
	let r = {
		escape: !0,
		...n || {}
	};
	return e.charAt(0) !== "/" && (e = "/" + e), function(e, t) {
		return t ||= {}, e.replace(/{([^{}]*)}/g, function(e, n) {
			let i = t[n];
			return r.escape ? encodeURIComponent(typeof i == "string" || typeof i == "number" ? i.toString() : e) : typeof i == "string" || typeof i == "number" ? i.toString() : e;
		});
	}(e, t || {});
}
function x(e, t, n) {
	let r = {
		noRewrite: !1,
		...n || {}
	};
	ce(r);
	let i = n?.baseURL ?? C();
	return !r.noRewrite && typeof window < "u" && window.OC?.config?.modRewriteWorking === !0 ? i + ae(e, t, n) : i + "/index.php" + ae(e, t, n);
}
function S(e, t) {
	return t.includes(".") ? oe(e, "img", t) : oe(e, "img", `${t}.svg`);
}
function oe(e, t, n) {
	T();
	let r = window.OC?.coreApps?.includes(e) ?? !1, i = n.slice(-3) === "php", a = C();
	return i && !r ? (a += `/index.php/apps/${e}`, t && (a += `/${encodeURI(t)}`), n !== "index.php" && (a += `/${n}`)) : !i && !r ? (a = w(e), t && (a += `/${t}/`), a.at(-1) !== "/" && (a += "/"), a += n) : ((e === "settings" || e === "core" || e === "search") && t === "ajax" && (a += "/index.php"), e && (a += `/${e}`), t && (a += `/${t}`), a += `/${n}`), a;
}
function se() {
	return T(), window.location.protocol + "//" + window.location.host + C();
}
function C() {
	T();
	let e = window._oc_webroot;
	if (e === void 0) {
		e = location.pathname;
		let t = e.indexOf("/index.php/");
		if (t !== -1) e = e.slice(0, t);
		else {
			let t = e.indexOf("/", 1);
			e = e.slice(0, t > 0 ? t : void 0);
		}
	}
	return e;
}
function w(e) {
	return T(), (window._oc_appswebroots ?? {})[e] ?? "";
}
function T() {
	if (typeof window > "u") throw Error("This function is only available in a DOM environment");
}
function ce(e) {
	if (typeof window > "u" && !e?.baseURL) throw Error("This function requires baseURL option to be provided in non-DOM environments");
}
// node_modules/@nextcloud/browser-storage/dist/ScopedStorage.js
var E = class e {
	static GLOBAL_SCOPE_VOLATILE = "nextcloud_vol";
	static GLOBAL_SCOPE_PERSISTENT = "nextcloud_per";
	scope;
	wrapped;
	constructor(t, n, r) {
		this.scope = `${r ? e.GLOBAL_SCOPE_PERSISTENT : e.GLOBAL_SCOPE_VOLATILE}_${btoa(t)}_`, this.wrapped = n;
	}
	scopeKey(e) {
		return `${this.scope}${e}`;
	}
	setItem(e, t) {
		this.wrapped.setItem(this.scopeKey(e), t);
	}
	getItem(e) {
		return this.wrapped.getItem(this.scopeKey(e));
	}
	removeItem(e) {
		this.wrapped.removeItem(this.scopeKey(e));
	}
	clear() {
		Object.keys(this.wrapped).filter((e) => e.startsWith(this.scope)).map(this.wrapped.removeItem.bind(this.wrapped));
	}
}, le = class {
	appId;
	persisted = !1;
	clearedOnLogout = !1;
	constructor(e) {
		this.appId = e;
	}
	persist(e = !0) {
		return this.persisted = e, this;
	}
	clearOnLogout(e = !0) {
		return this.clearedOnLogout = e, this;
	}
	build() {
		return new E(this.appId, this.persisted ? window.localStorage : window.sessionStorage, !this.clearedOnLogout);
	}
};
// node_modules/@nextcloud/browser-storage/dist/index.js
function D(e) {
	return new le(e);
}
// node_modules/@nextcloud/auth/dist/index.mjs
O();
function ue() {
	return globalThis._nc_auth_requestToken ? globalThis._nc_auth_requestToken : globalThis.document ? document.head.dataset.requesttoken ?? null : null;
}
function de(e) {
	if (!e || typeof e != "string") throw Error("Invalid CSRF token given", { cause: { token: e } });
	globalThis._nc_auth_requestToken !== e && (globalThis._nc_auth_requestToken = e, globalThis.document && (document.head.dataset.requesttoken = e), y("csrf-token-update", {
		token: e,
		_internal: !0
	}));
}
async function fe() {
	let e = x("/csrftoken"), t = await fetch(e);
	if (!t.ok) throw Error("Could not fetch CSRF token from API", { cause: t });
	try {
		let { token: e } = await t.json();
		return de(e), e;
	} catch (e) {
		throw Error("Could not parse CSRF token from API response", { cause: e });
	}
}
function pe(e) {
	let t = async ({ token: t }) => {
		try {
			e(t);
		} catch (e) {
			console.error("Error updating CSRF token observer", e);
		}
	};
	return v("csrf-token-update", t), () => re("csrf-token-update", t);
}
function O() {
	v("csrf-token-update", ({ token: e, _internal: t }) => {
		t || de(e);
	});
}
var me = D("public").persist().build(), he = class {
	_displayName;
	uid;
	isAdmin;
	constructor() {
		me.getItem("guestUid") || me.setItem("guestUid", ye()), this._displayName = me.getItem("guestNickname") || "", this.uid = me.getItem("guestUid") || ye(), this.isAdmin = !1, v("user:info:changed", (e) => {
			this._displayName = e.displayName, me.setItem("guestNickname", e.displayName || "");
		});
	}
	get displayName() {
		return this._displayName;
	}
	set displayName(e) {
		this._displayName = e, me.setItem("guestNickname", e), y("user:info:changed", this);
	}
}, ge;
function _e() {
	return ge ||= new he(), ge;
}
function ve(e) {
	if (!e || e.trim().length === 0) throw Error("Nickname cannot be empty");
	_e().displayName = e;
}
function ye() {
	return globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
		let t = Math.random() * 16 | 0;
		return (e === "x" ? t : t & 3 | 8).toString(16);
	});
}
var be;
function xe(e, t) {
	return e ? e.getAttribute(t) : null;
}
function Se() {
	if (be !== void 0) return be;
	let e = document?.getElementsByTagName("head")[0];
	if (!e) return null;
	let t = xe(e, "data-user");
	return t === null ? (be = null, be) : (be = {
		uid: t,
		displayName: xe(e, "data-user-displayname"),
		isAdmin: !!window._oc_isadmin
	}, be);
}
// node_modules/@nextcloud/logger/dist/index.mjs
var k = /* @__PURE__ */ ((e) => (e[e.Debug = 0] = "Debug", e[e.Info = 1] = "Info", e[e.Warn = 2] = "Warn", e[e.Error = 3] = "Error", e[e.Fatal = 4] = "Fatal", e))(k || {}), Ce = class {
	context;
	constructor(e) {
		this.context = e || {};
	}
	formatMessage(e, t, n) {
		let r = "[" + k[t].toUpperCase() + "] ";
		return n && n.app && (r += n.app + ": "), typeof e == "string" ? r + e : (r += `Unexpected ${e.name}`, e.message && (r += ` "${e.message}"`), t === k.Debug && e.stack && (r += `

Stack trace:
${e.stack}`), r);
	}
	log(e, t, n) {
		if (!(typeof this.context?.level == "number" && e < this.context?.level)) switch (typeof t == "object" && n?.error === void 0 && (n.error = t), e) {
			case k.Debug:
				console.debug(this.formatMessage(t, k.Debug, n), n);
				break;
			case k.Info:
				console.info(this.formatMessage(t, k.Info, n), n);
				break;
			case k.Warn:
				console.warn(this.formatMessage(t, k.Warn, n), n);
				break;
			case k.Error:
				console.error(this.formatMessage(t, k.Error, n), n);
				break;
			case k.Fatal:
			default: console.error(this.formatMessage(t, k.Fatal, n), n);
		}
	}
	debug(e, t) {
		this.log(k.Debug, e, Object.assign({}, this.context, t));
	}
	info(e, t) {
		this.log(k.Info, e, Object.assign({}, this.context, t));
	}
	warn(e, t) {
		this.log(k.Warn, e, Object.assign({}, this.context, t));
	}
	error(e, t) {
		this.log(k.Error, e, Object.assign({}, this.context, t));
	}
	fatal(e, t) {
		this.log(k.Fatal, e, Object.assign({}, this.context, t));
	}
};
function A(e) {
	return new Ce(e);
}
var we = class {
	context;
	factory;
	constructor(e) {
		this.context = {}, this.factory = e;
	}
	setApp(e) {
		return this.context.app = e, this;
	}
	setLogLevel(e) {
		return this.context.level = e, this;
	}
	setUid(e) {
		return this.context.uid = e, this;
	}
	detectUser() {
		let e = Se();
		return e !== null && (this.context.uid = e.uid), this;
	}
	detectLogLevel() {
		let e = this, t = () => {
			document.readyState === "complete" || document.readyState === "interactive" ? (e.context.level = window._oc_config?.loglevel ?? k.Warn, window._oc_debug && (e.context.level = k.Debug), document.removeEventListener("readystatechange", t)) : document.addEventListener("readystatechange", t);
		};
		return t(), this;
	}
	build() {
		return this.context.level === void 0 && this.detectLogLevel(), this.factory(this.context);
	}
};
function j() {
	return new we(A);
}
// node_modules/@nextcloud/files/dist/utils/logger.mjs
var Te = j().setApp("@nextcloud/files").detectUser().build(), Ee = class extends EventTarget {
	dispatchTypedEvent(e, t) {
		return super.dispatchEvent(t);
	}
}, M = class extends Ee {};
function De() {
	return a.registry ??= new M(), a.registry;
}
// node_modules/@nextcloud/files/dist/ui/actions/fileAction.mjs
var Oe = Object.freeze({
	DEFAULT: "default",
	HIDDEN: "hidden"
});
function ke(e) {
	N(e), a.fileActions ??= /* @__PURE__ */ new Map(), a.fileActions.has(e.id) ? Te.error(`FileAction ${e.id} already registered`, { action: e }) : (a.fileActions.set(e.id, e), De().dispatchTypedEvent("register:action", new CustomEvent("register:action", { detail: e })));
}
function Ae() {
	return a.fileActions ? [...a.fileActions.values()] : [];
}
function N(e) {
	if (!e.id || typeof e.id != "string") throw Error("Invalid id");
	if (!e.displayName || typeof e.displayName != "function") throw Error("Invalid displayName function");
	if ("title" in e && typeof e.title != "function") throw Error("Invalid title function");
	if (!e.iconSvgInline || typeof e.iconSvgInline != "function") throw Error("Invalid iconSvgInline function");
	if (!e.exec || typeof e.exec != "function") throw Error("Invalid exec function");
	if ("enabled" in e && typeof e.enabled != "function") throw Error("Invalid enabled function");
	if ("execBatch" in e && typeof e.execBatch != "function") throw Error("Invalid execBatch function");
	if ("order" in e && typeof e.order != "number") throw Error("Invalid order");
	if (e.destructive !== void 0 && typeof e.destructive != "boolean") throw Error("Invalid destructive flag");
	if ("parent" in e && typeof e.parent != "string") throw Error("Invalid parent");
	if (e.default && !Object.values(Oe).includes(e.default)) throw Error("Invalid default");
	if ("inline" in e && typeof e.inline != "function") throw Error("Invalid inline function");
	if ("renderInline" in e && typeof e.renderInline != "function") throw Error("Invalid renderInline function");
	if ("hotkey" in e && e.hotkey !== void 0) {
		if (typeof e.hotkey != "object") throw Error("Invalid hotkey configuration");
		if (typeof e.hotkey.key != "string" || !e.hotkey.key) throw Error("Missing or invalid hotkey key");
		if (typeof e.hotkey.description != "string" || !e.hotkey.description) throw Error("Missing or invalid hotkey description");
	}
}
// node_modules/@nextcloud/files/dist/node/fileType.mjs
var P = Object.freeze({
	Folder: "folder",
	File: "file"
});
// node_modules/@nextcloud/paths/dist/index.mjs
function F(e) {
	return e && e.split("/").map(encodeURIComponent).join("/");
}
function je(e, t) {
	return e = e.replace(/\\/g, "/").replace(/\/+$/g, "").replace(/.*\//, ""), t && t !== e && e.endsWith(t) ? e.substring(0, e.length - t.length) : e;
}
function Me(e) {
	e = e.replaceAll(/\\/g, "/");
	let t = e.split("/");
	return t.length <= 1 ? "." : (t.pop(), t.length === 1 && t[0] === "" ? "/" : t.join("/"));
}
function Ne(e) {
	let t = je(e), n = t.lastIndexOf(".");
	return n > 0 ? t.substring(n) : "";
}
function Pe(...e) {
	if (arguments.length < 1) return "";
	let t = e.filter((e) => e.length > 0);
	if (t.length < 1) return "";
	let n = t[t.length - 1], r = t[0].charAt(0) === "/", i = n.charAt(n.length - 1) === "/", a = t.reduce((e, t) => e.concat(t.split("/")), []), o = !r, s = a.reduce((e, t) => t === "" ? e : o ? (o = !1, e + t) : e + "/" + t, "");
	return i ? s + "/" : s;
}
// node_modules/@nextcloud/files/dist/node/nodeData.mjs
var Fe = Object.freeze({
	NEW: "new",
	FAILED: "failed",
	LOADING: "loading",
	LOCKED: "locked"
});
function Ie(e, t) {
	return e.match(t) !== null;
}
function I(e, t) {
	if (e.id && typeof e.id != "number" && typeof e.id != "string") throw Error("Invalid id type of value");
	if (!e.source) throw Error("Missing mandatory source");
	try {
		new URL(e.source);
	} catch {
		throw Error("Invalid source format, source must be a valid URL");
	}
	if (!e.source.startsWith("http")) throw Error("Invalid source format, only http(s) is supported");
	if (!e.root) throw Error("Missing mandatory root");
	if (typeof e.root != "string") throw Error("Invalid root type");
	if (!e.root.startsWith("/")) throw Error("Root must start with a leading slash");
	if (!e.source.includes(e.root)) throw Error("Root must be part of the source");
	if (Ie(e.source, t)) {
		let n = e.source.match(t)[0];
		if (!e.source.includes(Pe(n, e.root))) throw Error("The root must be relative to the service. e.g /files/emma");
	}
	if (e.displayname && typeof e.displayname != "string") throw Error("Invalid displayname type");
	if (e.mtime && !(e.mtime instanceof Date)) throw Error("Invalid mtime type");
	if (e.crtime && !(e.crtime instanceof Date)) throw Error("Invalid crtime type");
	if (!e.mime || typeof e.mime != "string" || !e.mime.match(/^[-\w.]+\/[-+\w.]+$/gi)) throw Error("Missing or invalid mandatory mime");
	if ("size" in e && typeof e.size != "number" && e.size !== void 0) throw Error("Invalid size type");
	if ("permissions" in e && e.permissions !== void 0 && !(typeof e.permissions == "number" && e.permissions >= n.NONE && e.permissions <= n.ALL)) throw Error("Invalid permissions");
	if (e.owner && e.owner !== null && typeof e.owner != "string") throw Error("Invalid owner type");
	if (e.attributes && typeof e.attributes != "object") throw Error("Invalid attributes type");
	if (e.status && !Object.values(Fe).includes(e.status)) throw Error("Status must be a valid NodeStatus");
}
function Le(e) {
	e.mtime && typeof e.mtime == "string" && !isNaN(Date.parse(e.mtime)) && JSON.stringify(new Date(e.mtime)) === JSON.stringify(e.mtime) && (e.mtime = new Date(e.mtime)), e.crtime && typeof e.crtime == "string" && !isNaN(Date.parse(e.crtime)) && JSON.stringify(new Date(e.crtime)) === JSON.stringify(e.crtime) && (e.crtime = new Date(e.crtime));
}
function Re(e) {
	if (e instanceof RegExp) return e;
	let t = e.match(/(\/?)(.+)\1([a-z]*)/i);
	if (!t) throw Error("Invalid regular expression format.");
	let n = Array.from(new Set(t[3])).filter((e) => "gimsuy".includes(e)).join("");
	return new RegExp(t[2], n);
}
// node_modules/@nextcloud/files/dist/node/node.mjs
var ze = class e {
	_attributes;
	_data;
	_knownDavService = /(remote|public)\.php\/(web)?dav/i;
	readonlyAttributes = Object.entries(Object.getOwnPropertyDescriptors(e.prototype)).filter((e) => typeof e[1].get == "function" && e[0] !== "__proto__").map((e) => e[0]);
	handler = {
		set: (e, t, n) => !this.readonlyAttributes.includes(t) && Reflect.set(e, t, n),
		deleteProperty: (e, t) => !this.readonlyAttributes.includes(t) && Reflect.deleteProperty(e, t)
	};
	constructor(...[e, t]) {
		e.mime ||= "application/octet-stream", Le(e), t = Re(t || this._knownDavService), I(e, t), this._data = {
			...e,
			attributes: {}
		}, this._attributes = new Proxy(this._data.attributes, this.handler), this.update(e.attributes ?? {}), t && (this._knownDavService = t);
	}
	get source() {
		return this._data.source.replace(/\/$/i, "");
	}
	get encodedSource() {
		let { origin: e } = new URL(this.source);
		return e + F(this.source.slice(e.length));
	}
	get basename() {
		return je(this.source);
	}
	get displayname() {
		return this._data.displayname || this.basename;
	}
	set displayname(e) {
		I({
			...this._data,
			displayname: e
		}, this._knownDavService), this._data.displayname = e;
	}
	get extension() {
		return Ne(this.source);
	}
	get dirname() {
		return Me(this.path);
	}
	get mime() {
		return this._data.mime || "application/octet-stream";
	}
	set mime(e) {
		e ??= "application/octet-stream", I({
			...this._data,
			mime: e
		}, this._knownDavService), this._data.mime = e;
	}
	get mtime() {
		return this._data.mtime;
	}
	set mtime(e) {
		I({
			...this._data,
			mtime: e
		}, this._knownDavService), this._data.mtime = e;
	}
	get crtime() {
		return this._data.crtime;
	}
	get size() {
		return this._data.size;
	}
	set size(e) {
		I({
			...this._data,
			size: e
		}, this._knownDavService), this.updateMtime(), this._data.size = e;
	}
	get attributes() {
		return this._attributes;
	}
	get permissions() {
		return this.owner === null && !this.isDavResource ? n.READ : this._data.permissions === void 0 ? n.NONE : this._data.permissions;
	}
	set permissions(e) {
		I({
			...this._data,
			permissions: e
		}, this._knownDavService), this.updateMtime(), this._data.permissions = e;
	}
	get owner() {
		return this.isDavResource ? this._data.owner : null;
	}
	get isDavResource() {
		return Ie(this.source, this._knownDavService);
	}
	get root() {
		return this._data.root.replace(/^(.+)\/$/, "$1");
	}
	get path() {
		let e = this.source.indexOf("://"), t = this.source.slice(0, e), n = this.source.slice(e + 3), r = n.indexOf("/"), i = `${t}://${n.slice(0, r)}${F(n.slice(r))}`, a = new URL(i), o = decodeURIComponent(a.pathname);
		this.isDavResource && (o = o.split(this._knownDavService).pop());
		let s = o.indexOf(this.root), c = this.root.replace(/\/$/, "");
		return o.slice(s + c.length) || "/";
	}
	get fileid() {
		return typeof this._data?.id == "number" ? this._data.id : void 0;
	}
	get id() {
		if (!(this._data?.id === void 0 || typeof this._data.id == "number" && this._data.id < 0)) return String(this._data.id);
	}
	get status() {
		return this._data?.status;
	}
	set status(e) {
		I({
			...this._data,
			status: e
		}, this._knownDavService), this._data.status = e;
	}
	move(e) {
		I({
			...this._data,
			source: e
		}, this._knownDavService);
		let t = this.basename;
		this._data.source = e, this.displayname === t && this.basename !== t && (this.displayname = this.basename);
	}
	rename(e) {
		if (e.includes("/")) throw Error("Invalid basename");
		this.move(Me(this.source) + "/" + e);
	}
	updateMtime() {
		this._data.mtime && (this._data.mtime = /* @__PURE__ */ new Date());
	}
	update(e) {
		for (let [t, n] of Object.entries(e)) try {
			n === void 0 ? delete this.attributes[t] : this.attributes[t] = n;
		} catch (e) {
			if (e instanceof TypeError) continue;
			throw e;
		}
	}
	clone() {
		return new this.constructor(structuredClone(this._data), this._knownDavService);
	}
	toJSON() {
		return JSON.stringify([structuredClone(this._data), this._knownDavService.toString()]);
	}
}, Be = class extends ze {
	constructor(...[e, t]) {
		super(e, t);
	}
	get type() {
		return P.File;
	}
};
// node_modules/dompurify/dist/purify.es.mjs
function Ve(e, t) {
	this.v = e, this.k = t;
}
function L(e, t) {
	(t == null || t > e.length) && (t = e.length);
	for (var n = 0, r = Array(t); n < t; n++) r[n] = e[n];
	return r;
}
function He(e) {
	if (Array.isArray(e)) return e;
}
function Ue(e, t) {
	var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
	if (n != null) {
		var r, i, a, o, s = [], c = !0, l = !1;
		try {
			if (a = (n = n.call(e)).next, t === 0) {
				if (Object(n) !== n) return;
				c = !1;
			} else for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0);
		} catch (e) {
			l = !0, i = e;
		} finally {
			try {
				if (!c && n.return != null && (o = n.return(), Object(o) !== o)) return;
			} finally {
				if (l) throw i;
			}
		}
		return s;
	}
}
function We() {
	throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function Ge(e, t) {
	return He(e) || Ue(e, t) || Ke(e, t) || We();
}
function Ke(e, t) {
	if (e) {
		if (typeof e == "string") return L(e, t);
		var n = {}.toString.call(e).slice(8, -1);
		return n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set" ? Array.from(e) : n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? L(e, t) : void 0;
	}
}
function qe(e) {
	var t, n;
	function r(t, n) {
		try {
			var a = e[t](n), o = a.value, s = o instanceof Ve;
			Promise.resolve(s ? o.v : o).then(function(n) {
				if (s) {
					var c = t === "return" && o.k ? t : "next";
					if (!o.k || n.done) return r(c, n);
					n = e[c](n).value;
				}
				i(!!a.done, n);
			}, function(e) {
				r("throw", e);
			});
		} catch (e) {
			i(2, e);
		}
	}
	function i(e, i) {
		e === 2 ? t.reject(i) : t.resolve({
			value: i,
			done: e
		}), (t = t.next) ? r(t.key, t.arg) : n = null;
	}
	this._invoke = function(e, i) {
		return new Promise(function(a, o) {
			var s = {
				key: e,
				arg: i,
				resolve: a,
				reject: o,
				next: null
			};
			n ? n = n.next = s : (t = n = s, r(e, i));
		});
	}, typeof e.return != "function" && (this.return = void 0);
}
qe.prototype[typeof Symbol == "function" && Symbol.asyncIterator || "@@asyncIterator"] = function() {
	return this;
}, qe.prototype.next = function(e) {
	return this._invoke("next", e);
}, qe.prototype.throw = function(e) {
	return this._invoke("throw", e);
}, qe.prototype.return = function(e) {
	return this._invoke("return", e);
};
var Je = Object.entries, Ye = Object.setPrototypeOf, Xe = Object.isFrozen, Ze = Object.getPrototypeOf, R = Object.getOwnPropertyDescriptor, z = Object.freeze, B = Object.seal, Qe = Object.create, $e = typeof Reflect < "u" && Reflect, et = $e.apply, tt = $e.construct;
z ||= function(e) {
	return e;
}, B ||= function(e) {
	return e;
}, et ||= function(e, t) {
	var n = [...arguments].slice(2);
	return e.apply(t, n);
}, tt ||= function(e) {
	return new e(...[...arguments].slice(1));
};
var V = G(Array.prototype.forEach);
Array.prototype.indexOf;
var nt = G(Array.prototype.lastIndexOf), rt = G(Array.prototype.pop), it = G(Array.prototype.push), at = G(Array.prototype.slice), ot = G(Array.prototype.splice), st = Array.isArray, ct = St(Set), lt = G(Set.prototype.add), ut = G(Set.prototype.has), dt = G(String.prototype.toLowerCase), ft = G(String.prototype.toString), pt = G(String.prototype.match), mt = G(String.prototype.replace), ht = G(String.prototype.indexOf), gt = G(String.prototype.trim), _t = G(Number.prototype.toString), vt = G(Boolean.prototype.toString), yt = typeof BigInt > "u" ? null : G(BigInt.prototype.toString), bt = typeof Symbol > "u" ? null : G(Symbol.prototype.toString), H = G(Object.prototype.hasOwnProperty), xt = G(Object.prototype.toString), U = G(RegExp.prototype.test), W = St(TypeError);
function G(e) {
	return function(t) {
		t instanceof RegExp && (t.lastIndex = 0);
		var n = [...arguments].slice(1);
		return et(e, t, n);
	};
}
function St(e) {
	return function() {
		return tt(e, [...arguments]);
	};
}
function K(e, t) {
	let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : dt;
	if (Ye && Ye(e, null), !st(t)) return e;
	let r = t.length;
	for (; r--;) {
		let i = t[r];
		if (typeof i == "string") {
			let e = n(i);
			e !== i && (Xe(t) || (t[r] = e), i = e);
		}
		e[i] = !0;
	}
	return e;
}
function Ct(e) {
	for (let t = 0; t < e.length; t++) H(e, t) || (e[t] = null);
	return e;
}
function q(e) {
	let t = Qe(null);
	for (let r of Je(e)) {
		var n = Ge(r, 2);
		let i = n[0], a = n[1];
		H(e, i) && (t[i] = st(a) ? Ct(a) : a && typeof a == "object" && a.constructor === Object ? q(a) : a);
	}
	return t;
}
function wt(e) {
	switch (typeof e) {
		case "string": return e;
		case "number": return _t(e);
		case "boolean": return vt(e);
		case "bigint": return yt ? yt(e) : "0";
		case "symbol": return bt ? bt(e) : "Symbol()";
		case "undefined": return xt(e);
		case "function":
		case "object": {
			if (e === null) return xt(e);
			let t = e, n = J(t, "toString");
			if (typeof n == "function") {
				let e = n(t);
				return typeof e == "string" ? e : xt(e);
			}
			return xt(e);
		}
		default: return xt(e);
	}
}
function J(e, t) {
	for (; e !== null;) {
		let n = R(e, t);
		if (n) {
			if (n.get) return G(n.get);
			if (typeof n.value == "function") return G(n.value);
		}
		e = Ze(e);
	}
	function n() {
		return null;
	}
	return n;
}
function Tt(e, t) {
	for (; e !== null;) {
		let n = R(e, t);
		if (n) return n.get ? G(n.get) : null;
		e = Ze(e);
	}
	return null;
}
function Et(e) {
	try {
		return U(e, ""), !0;
	} catch {
		return !1;
	}
}
var Dt = z(/* @__PURE__ */ "a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr".split(".")), Ot = z(/* @__PURE__ */ "svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern".split(".")), kt = z([
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence"
]), At = z([
	"animate",
	"color-profile",
	"cursor",
	"discard",
	"font-face",
	"font-face-format",
	"font-face-name",
	"font-face-src",
	"font-face-uri",
	"foreignobject",
	"hatch",
	"hatchpath",
	"mesh",
	"meshgradient",
	"meshpatch",
	"meshrow",
	"missing-glyph",
	"script",
	"set",
	"solidcolor",
	"unknown",
	"use"
]), jt = z(/* @__PURE__ */ "math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts".split(".")), Mt = z([
	"maction",
	"maligngroup",
	"malignmark",
	"mlongdiv",
	"mscarries",
	"mscarry",
	"msgroup",
	"mstack",
	"msline",
	"msrow",
	"semantics",
	"annotation",
	"annotation-xml",
	"mprescripts",
	"none"
]), Nt = z(["#text"]), Pt = z(/* @__PURE__ */ "accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns".split(".")), Ft = z(/* @__PURE__ */ "accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan".split(".")), It = z(/* @__PURE__ */ "accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns".split(".")), Lt = z([
	"xlink:href",
	"xml:id",
	"xlink:title",
	"xml:space",
	"xmlns:xlink"
]), Rt = B(/{{[\w\W]*|^[\w\W]*}}/g), zt = B(/<%[\w\W]*|^[\w\W]*%>/g), Bt = B(/\${[\w\W]*/g), Vt = B(/^data-[\-\w.\u00B7-\uFFFF]+$/), Ht = B(/^aria-[\-\w]+$/), Ut = B(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), Wt = B(/^(?:\w+script|data):/i), Gt = B(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), Kt = B(/^html$/i), qt = B(/^[a-z][.\w]*(-[.\w]+)+$/i), Jt = B(/<[/\w!]/g), Yt = B(/<[/\w]/g), Xt = B(/<\/no(script|embed|frames)/i), Zt = B(/\/>/i), Y = {
	element: 1,
	attribute: 2,
	text: 3,
	cdataSection: 4,
	entityReference: 5,
	entityNode: 6,
	processingInstruction: 7,
	comment: 8,
	document: 9,
	documentType: 10,
	documentFragment: 11,
	notation: 12
}, Qt = z(K({}, [
	"style",
	"script",
	"xmp",
	"iframe",
	"noembed",
	"noframes",
	"plaintext",
	"noscript"
])), $t = function() {
	return typeof window > "u" ? null : window;
}, en = function(e, t) {
	if (typeof e != "object" || typeof e.createPolicy != "function") return null;
	let n = null, r = "data-tt-policy-suffix";
	t && t.hasAttribute(r) && (n = t.getAttribute(r));
	let i = "dompurify" + (n ? "#" + n : "");
	try {
		return e.createPolicy(i, {
			createHTML(e) {
				return e;
			},
			createScriptURL(e) {
				return e;
			}
		});
	} catch {
		return console.warn("TrustedTypes policy " + i + " could not be created."), null;
	}
}, tn = function() {
	return {
		afterSanitizeAttributes: [],
		afterSanitizeElements: [],
		afterSanitizeShadowDOM: [],
		beforeSanitizeAttributes: [],
		beforeSanitizeElements: [],
		beforeSanitizeShadowDOM: [],
		uponSanitizeAttribute: [],
		uponSanitizeElement: [],
		uponSanitizeShadowNode: []
	};
}, nn = function(e, t, n, r) {
	return H(e, t) && st(e[t]) ? K(r.base ? q(r.base) : {}, e[t], r.transform) : n;
}, rn = function(e, t, n) {
	let r = H(e, t) ? e[t] : void 0;
	return r && typeof r == "object" ? q(r) : n();
};
function an() {
	let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : $t(), t = (e) => an(e);
	if (t.version = "3.4.17", t.removed = [], !e || !e.document || e.document.nodeType !== Y.document || !e.Element) return t.isSupported = !1, t;
	let n = e.document, r = n, i = r.currentScript;
	e.DocumentFragment;
	let a = e.HTMLTemplateElement, o = e.Node, s = e.Element, c = e.NodeFilter;
	e.NamedNodeMap === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
	let l = e.DOMParser, u = e.trustedTypes, d = s.prototype, f = J(d, "cloneNode"), p = J(d, "remove"), m = J(d, "removeAttributeNode"), ee = J(d, "nextSibling"), h = J(d, "childNodes"), g = J(d, "parentNode"), te = J(d, "shadowRoot"), ne = J(d, "attributes"), _ = o && o.prototype ? J(o.prototype, "nodeType") : null, v = o && o.prototype ? J(o.prototype, "nodeName") : null, re = o && o.prototype ? J(o.prototype, "ownerDocument") : null, y = function(e) {
		return _ ? _(e) : e.nodeType;
	}, ie = function(e) {
		return v ? v(e) : e.nodeName;
	}, b = Tt(d, "namespaceURI"), ae = function(e) {
		return b ? b(e) : e.namespaceURI;
	};
	if (typeof a == "function") {
		let e = n.createElement("template");
		e.content && e.content.ownerDocument && (n = e.content.ownerDocument);
	}
	let x, S = "", oe, se = !1, C = 0, w = function() {
		if (C > 0) throw W("A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the \"DOMPurify and Trusted Types\" section of the README.");
	}, T = function(e) {
		w(), C++;
		try {
			return x.createHTML(e);
		} finally {
			C--;
		}
	}, ce = function(e) {
		w(), C++;
		try {
			return x.createScriptURL(e);
		} finally {
			C--;
		}
	}, E = function() {
		return se ||= (oe = en(u, i), !0), oe;
	}, le = n, D = le.implementation, ue = le.createNodeIterator, de = le.createDocumentFragment, fe = le.getElementsByTagName, pe = r.importNode, O = tn();
	t.isSupported = typeof Je == "function" && typeof g == "function" && D && D.createHTMLDocument !== void 0;
	let me = Rt, he = zt, ge = Bt, _e = Vt, ve = Ht, ye = Wt, be = Gt, xe = qt, Se = Ut, k = null, Ce = K({}, [
		...Dt,
		...Ot,
		...kt,
		...jt,
		...Nt
	]), A = null, we = K({}, [
		...Pt,
		...Ft,
		...It,
		...Lt
	]), j = Object.seal(Qe(null, {
		tagNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeNameCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		allowCustomizedBuiltInElements: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: !1
		}
	})), Te = null, Ee = null, M = Object.seal(Qe(null, {
		tagCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		},
		attributeCheck: {
			writable: !0,
			configurable: !1,
			enumerable: !0,
			value: null
		}
	})), De = !0, Oe = !0, ke = !1, Ae = !0, N = !1, P = !0, F = !1, je = !1, Me = null, Ne = null, Pe = !1, Fe = !1, Ie = !1, I = !1, Le = !0, Re = !1, ze = "user-content-", Be = !0, Ve = !1, L = null, He = {}, Ue = null, We = K({}, /* @__PURE__ */ "annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp".split(".")), Ge = null, Ke = K({}, [
		"audio",
		"video",
		"img",
		"source",
		"image",
		"track"
	]), qe = null, Ye = K({}, [
		"alt",
		"class",
		"for",
		"id",
		"label",
		"name",
		"pattern",
		"placeholder",
		"role",
		"summary",
		"title",
		"value",
		"style",
		"xmlns"
	]), Xe = "http://www.w3.org/1998/Math/MathML", Ze = "http://www.w3.org/2000/svg", R = "http://www.w3.org/1999/xhtml", $e = R, et = !1, tt = null, _t = K({}, [
		Xe,
		Ze,
		R
	], ft), vt = z([
		"mi",
		"mo",
		"mn",
		"ms",
		"mtext"
	]), yt = K({}, vt), bt = z(["annotation-xml"]), xt = K({}, bt), G = K({}, [
		"title",
		"style",
		"font",
		"a",
		"script"
	]), St = null, Ct = ["application/xhtml+xml", "text/html"], X = null, on = null, sn = n.createElement("form"), cn = function(e) {
		return e instanceof RegExp || e instanceof Function;
	}, Z = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		if (on && on === e) return;
		e && typeof e == "object" || (e = {}), e = q(e), St = Ct.indexOf(e.PARSER_MEDIA_TYPE) === -1 ? "text/html" : e.PARSER_MEDIA_TYPE, X = St === "application/xhtml+xml" ? ft : dt, k = nn(e, "ALLOWED_TAGS", Ce, { transform: X }), A = nn(e, "ALLOWED_ATTR", we, { transform: X }), tt = nn(e, "ALLOWED_NAMESPACES", _t, { transform: ft }), qe = nn(e, "ADD_URI_SAFE_ATTR", Ye, {
			transform: X,
			base: Ye
		}), Ge = nn(e, "ADD_DATA_URI_TAGS", Ke, {
			transform: X,
			base: Ke
		}), Ue = nn(e, "FORBID_CONTENTS", We, { transform: X }), Te = nn(e, "FORBID_TAGS", q({}), { transform: X }), Ee = nn(e, "FORBID_ATTR", q({}), { transform: X }), He = H(e, "USE_PROFILES") ? e.USE_PROFILES && typeof e.USE_PROFILES == "object" ? q(e.USE_PROFILES) : e.USE_PROFILES : !1, De = e.ALLOW_ARIA_ATTR !== !1, Oe = e.ALLOW_DATA_ATTR !== !1, ke = e.ALLOW_UNKNOWN_PROTOCOLS || !1, Ae = e.ALLOW_SELF_CLOSE_IN_ATTR !== !1, N = e.SAFE_FOR_TEMPLATES || !1, P = e.SAFE_FOR_XML !== !1, F = e.WHOLE_DOCUMENT || !1, Fe = e.RETURN_DOM || !1, Ie = e.RETURN_DOM_FRAGMENT || !1, I = e.RETURN_TRUSTED_TYPE || !1, Pe = e.FORCE_BODY || !1, Le = e.SANITIZE_DOM !== !1, Re = e.SANITIZE_NAMED_PROPS || !1, Be = e.KEEP_CONTENT !== !1, Ve = e.IN_PLACE || !1, Se = Et(e.ALLOWED_URI_REGEXP) ? e.ALLOWED_URI_REGEXP : Ut, $e = typeof e.NAMESPACE == "string" ? e.NAMESPACE : R, yt = rn(e, "MATHML_TEXT_INTEGRATION_POINTS", () => K({}, vt)), xt = rn(e, "HTML_INTEGRATION_POINTS", () => K({}, bt));
		let t = rn(e, "CUSTOM_ELEMENT_HANDLING", () => Qe(null));
		if (j = Qe(null), H(t, "tagNameCheck") && cn(t.tagNameCheck) && (j.tagNameCheck = t.tagNameCheck), H(t, "attributeNameCheck") && cn(t.attributeNameCheck) && (j.attributeNameCheck = t.attributeNameCheck), H(t, "allowCustomizedBuiltInElements") && typeof t.allowCustomizedBuiltInElements == "boolean" && (j.allowCustomizedBuiltInElements = t.allowCustomizedBuiltInElements), B(j), N && (Oe = !1), Ie && (Fe = !0), He && (k = K({}, Nt), A = Qe(null), He.html === !0 && (K(k, Dt), K(A, Pt)), He.svg === !0 && (K(k, Ot), K(A, Ft), K(A, Lt)), He.svgFilters === !0 && (K(k, kt), K(A, Ft), K(A, Lt)), He.mathMl === !0 && (K(k, jt), K(A, It), K(A, Lt))), M.tagCheck = null, M.attributeCheck = null, H(e, "ADD_TAGS") && (typeof e.ADD_TAGS == "function" ? M.tagCheck = e.ADD_TAGS : st(e.ADD_TAGS) && (k === Ce && (k = q(k)), K(k, e.ADD_TAGS, X))), H(e, "ADD_ATTR") && (typeof e.ADD_ATTR == "function" ? M.attributeCheck = e.ADD_ATTR : st(e.ADD_ATTR) && (A === we && (A = q(A)), K(A, e.ADD_ATTR, X))), H(e, "ADD_FORBID_CONTENTS") && st(e.ADD_FORBID_CONTENTS) && (Ue === We && (Ue = q(Ue)), K(Ue, e.ADD_FORBID_CONTENTS, X)), Be && (k["#text"] = !0), F && K(k, [
			"html",
			"head",
			"body"
		]), k.table && (K(k, ["tbody"]), delete Te.tbody), e.TRUSTED_TYPES_POLICY) {
			if (typeof e.TRUSTED_TYPES_POLICY.createHTML != "function") throw W("TRUSTED_TYPES_POLICY configuration option must provide a \"createHTML\" hook.");
			if (typeof e.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw W("TRUSTED_TYPES_POLICY configuration option must provide a \"createScriptURL\" hook.");
			let t = x;
			x = e.TRUSTED_TYPES_POLICY;
			try {
				S = T("");
			} catch (e) {
				throw x = t, e;
			}
		} else e.TRUSTED_TYPES_POLICY === null ? (x = void 0, S = "") : (x === void 0 && (x = E()), x && typeof S == "string" && (S = T("")));
		z && z(e), on = e;
	}, ln = K({}, [
		...Ot,
		...kt,
		...At
	]), un = K({}, [...jt, ...Mt]), dn = function(e, t, n) {
		return t.namespaceURI === R ? e === "svg" : t.namespaceURI === Xe ? e === "svg" && (n === "annotation-xml" || yt[n]) : !!ln[e];
	}, fn = function(e, t, n) {
		return t.namespaceURI === R ? e === "math" : t.namespaceURI === Ze ? e === "math" && xt[n] : !!un[e];
	}, pn = function(e, t, n) {
		return t.namespaceURI === Ze && !xt[n] || t.namespaceURI === Xe && !yt[n] ? !1 : !un[e] && (G[e] || !ln[e]);
	}, mn = function(e) {
		let t = ae(e), n = dt(ie(e)), r = g(e), i, a;
		return r && y(r) === Y.element ? (i = { namespaceURI: ae(r) }, a = dt(ie(r))) : (i = { namespaceURI: $e }, a = "template"), tt[t] ? t === Ze ? dn(n, i, a) : t === Xe ? fn(n, i, a) : t === R ? pn(n, i, a) : !!(St === "application/xhtml+xml" && tt[t]) : !1;
	}, hn = function(e) {
		it(t.removed, { element: e });
		try {
			g(e).removeChild(e);
		} catch {
			if (p(e), !g(e)) throw W("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
		}
	}, gn = function(e, t, n) {
		try {
			m(e, t);
		} catch {
			try {
				e.removeAttribute(n);
			} catch {}
		}
	}, _n = function(e) {
		xn(e);
		let t = h(e);
		t && V(at(t), (e) => {
			try {
				p(e);
			} catch {}
		});
		let n = y(e) === Y.element ? ne(e) : null;
		if (n) for (let t = n.length - 1; t >= 0; --t) {
			let r = n[t], i = r && r.name;
			typeof i == "string" && gn(e, r, i);
		}
	}, vn = function(e, n, r) {
		if (!r) try {
			r = n.getAttributeNode(e);
		} catch {
			r = null;
		}
		it(t.removed, {
			attribute: r || null,
			from: n
		});
		try {
			r ? m(n, r) : n.removeAttribute(e);
		} catch {
			try {
				n.removeAttribute(e);
			} catch {}
		}
		if (e === "is") {
			if (Fe || Ie) try {
				hn(n);
			} catch {}
			else try {
				n.setAttribute(e, "");
			} catch {}
		}
	}, yn = function(e) {
		let t = ne(e);
		if (t) for (let n = t.length - 1; n >= 0; --n) {
			let r = t[n], i = r && r.name;
			typeof i != "string" || A[X(i)] || gn(e, r, i);
		}
	}, bn = function(e, t) {
		let n = arguments.length > 2 && arguments[2] !== void 0 && arguments[2], r = [e];
		for (; r.length > 0;) {
			let e = r.pop();
			if (t(e) === !1) continue;
			if (n && y(e) === Y.element) {
				let t = te(e);
				Q(t) && r.push(t);
			}
			let i = h(e);
			if (i) for (let e = i.length - 1; e >= 0; --e) r.push(i[e]);
		}
	}, xn = function(e) {
		bn(e, (e) => {
			y(e) === Y.element && yn(e);
		});
	}, Sn = function(e) {
		let t = [];
		return bn(e, (e) => {
			t.push(e);
		}, !0), t;
	}, Cn = function(e, t) {
		let n = ct();
		V(Sn(e), (e) => {
			y(e) === Y.element && lt(n, e);
		}), V(t, (e) => {
			y(e) === Y.element && !ut(n, e) && yn(e);
		});
	}, wn = function(e, n) {
		let r = !1;
		return V(t.removed, (t) => {
			t.element && (r ||= t.element === e, xn(t.element));
		}), Cn(e, n), r;
	}, Tn = function(e, t) {
		let n = L, r = null, i = () => (r || (r = ct(), V(t, (e) => {
			lt(r, e);
		})), r);
		for (let t = 0;; t++) {
			let r = Sn(e), a = [e], o = !1;
			if (V(r, (e) => {
				y(e) === Y.documentFragment ? it(a, e) : !o && !ut(n, e) && (o = ut(i(), e));
			}), !o) return;
			if (t >= 8) throw W("the tree kept changing during in-place sanitization; refusing to return it");
			V(a, (t, n) => {
				En(t, n > 0, e, i());
			});
		}
	}, En = function(e, t, n, r) {
		let i = jn(e), a;
		for (; a = i.nextNode();) ut(r, a) && !ut(L, a) && (t && $(O.uponSanitizeShadowNode, a, null), Hn(a, n), Yn(a, n), Q(a.content) && Xn(a.content));
	}, Dn = function(e) {
		L && lt(L, e);
	}, On = function(e, t) {
		return P ? e === "patchsrc" || e === "for" && t !== "label" && t !== "output" : !1;
	}, kn = function(e) {
		P && bn(e, (e) => {
			let t = y(e);
			if (t === Y.processingInstruction || t === Y.comment && U(Yt, e.data)) {
				try {
					p(e);
				} catch {}
				return !1;
			}
			if (t === Y.element) {
				let t = e, n = X(ie(e));
				try {
					t.hasAttribute && t.hasAttribute("patchsrc") && t.removeAttribute("patchsrc"), t.hasAttribute && t.hasAttribute("for") && On("for", n) && t.removeAttribute("for");
				} catch {}
			}
			return !0;
		});
	}, An = function(e) {
		let t = null, r = null;
		if (Pe) e = "<remove></remove>" + e;
		else {
			let t = pt(e, /^[\r\n\t ]+/);
			r = t && t[0];
		}
		St === "application/xhtml+xml" && $e === R && (e = "<html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head><body>" + e + "</body></html>");
		let i = x ? T(e) : e;
		if ($e === R) try {
			t = new l().parseFromString(i, St);
		} catch {}
		if (!t || !t.documentElement) {
			t = D.createDocument($e, "template", null);
			try {
				t.documentElement.innerHTML = et ? S : i;
			} catch {}
		}
		let a = t.body || t.documentElement;
		return e && r && a.insertBefore(n.createTextNode(r), a.childNodes[0] || null), $e === R ? fe.call(t, F ? "html" : "body")[0] : F ? t.documentElement : a;
	}, jn = function(e) {
		let t = re ? re(e) : e.ownerDocument;
		return ue.call(t || e, e, c.SHOW_ELEMENT | c.SHOW_COMMENT | c.SHOW_TEXT | c.SHOW_PROCESSING_INSTRUCTION | c.SHOW_CDATA_SECTION, null);
	}, Mn = function(e) {
		return e = mt(e, me, " "), e = mt(e, he, " "), e = mt(e, ge, " "), e;
	}, Nn = function(e) {
		Pn(e);
		let t = e.querySelectorAll?.call(e, "template");
		t && V(t, (e) => {
			Q(e.content) && Nn(e.content);
		});
	}, Pn = function(e) {
		e.normalize();
		let t = re ? re(e) : e.ownerDocument, n = ue.call(t || e, e, c.SHOW_TEXT | c.SHOW_COMMENT | c.SHOW_CDATA_SECTION | c.SHOW_PROCESSING_INSTRUCTION, null), r = n.nextNode();
		for (; r;) r.data = Mn(r.data), r = n.nextNode();
	}, Fn = function(e) {
		let t = v ? v(e) : null;
		return typeof t != "string" || X(t) !== "form" ? !1 : typeof e.nodeName != "string" || typeof e.textContent != "string" || typeof e.removeChild != "function" || e.attributes !== ne(e) || typeof e.removeAttribute != "function" || typeof e.removeAttributeNode != "function" || typeof e.getAttributeNode != "function" || typeof e.setAttribute != "function" || typeof e.namespaceURI != "string" || typeof e.insertBefore != "function" || typeof e.hasChildNodes != "function" || e.nodeType !== _(e) || e.childNodes !== h(e);
	}, Q = function(e) {
		if (!_ || typeof e != "object" || !e) return !1;
		try {
			return _(e) === Y.documentFragment;
		} catch {
			return !1;
		}
	}, In = function(e) {
		if (!_ || typeof e != "object" || !e) return !1;
		try {
			return typeof _(e) == "number";
		} catch {
			return !1;
		}
	};
	function $(e, n, r) {
		e.length !== 0 && V(e, (e) => {
			e.call(t, n, r, on);
		});
	}
	let Ln = function(e, t) {
		return !!(P && e.hasChildNodes() && !In(e.firstElementChild) && U(Jt, e.textContent) && U(Jt, e.innerHTML) || P && Qt[t] && y(e) === Y.element && ae(e) === R && (In(e.firstElementChild) || typeof e.textContent == "string" && U(Jt, e.textContent)) || e.nodeType === Y.processingInstruction || P && e.nodeType === Y.comment && U(Yt, e.data));
	}, Rn = function(e, t) {
		return e instanceof RegExp ? U(e, t) : e instanceof Function && !!e(t, ...[...arguments].slice(2));
	}, zn = function(e, t, n) {
		if (!Te[t] && Gn(t) && Rn(j.tagNameCheck, t)) return !1;
		if (Be && !Ue[t] && !Ue[dt(t)]) {
			let t = g(e), r = h(e);
			if (r && t) {
				let i = r.length;
				for (let a = i - 1; a >= 0; --a) {
					let i = e === n ? f(r[a], !0) : r[a];
					t.insertBefore(i, ee(e));
				}
			}
		}
		return hn(e), !0;
	}, Bn = function(e, t, n, r) {
		return e.length === 0 ? t : t === n || t === r ? q(t) : t;
	}, Vn = function(e, t) {
		return e === t || g(e) !== null ? !1 : (Ve && xn(e), !0);
	}, Hn = function(e, n) {
		if (Dn(e), $(O.beforeSanitizeElements, e, null), Vn(e, n)) return !0;
		if (Fn(e)) return hn(e), !0;
		let r = X(ie(e));
		if (k = Bn(O.uponSanitizeElement, k, Ce, Me), $(O.uponSanitizeElement, e, {
			tagName: r,
			allowedTags: k
		}), Vn(e, n)) return !0;
		if (Ln(e, r)) return hn(e), !0;
		if (Te[r] || !(M.tagCheck instanceof Function && M.tagCheck(r)) && !k[r]) {
			let t = zn(e, r, n);
			return t === !1 && ($(O.afterSanitizeElements, e, null), Vn(e, n)) ? !0 : t;
		}
		if (y(e) === Y.element && !mn(e) || (r === "noscript" || r === "noembed" || r === "noframes") && U(Xt, e.innerHTML)) return hn(e), !0;
		if (N && e.nodeType === Y.text) {
			let n = Mn(e.textContent);
			e.textContent !== n && (it(t.removed, { element: e.cloneNode() }), e.textContent = n);
		}
		return $(O.afterSanitizeElements, e, null), Vn(e, n);
	}, Un = function(e, t, r) {
		if (Ee[t] || On(t, e) || Le && (t === "id" || t === "name") && (r in n || r in sn)) return !1;
		let i = A[t] || M.attributeCheck instanceof Function && M.attributeCheck(t, e);
		return Oe && U(_e, t) || De && U(ve, t) ? !0 : i ? qe[t] || U(Se, mt(r, be, "")) || (t === "src" || t === "xlink:href" || t === "href") && e !== "script" && ht(r, "data:") === 0 && Ge[e] || ke && !U(ye, mt(r, be, "")) ? !0 : !r : Gn(e) && Rn(j.tagNameCheck, e) && Rn(j.attributeNameCheck, t, e) || t === "is" && j.allowCustomizedBuiltInElements && Rn(j.tagNameCheck, r);
	}, Wn = K({}, [
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-format",
		"font-face-name",
		"font-face-src",
		"font-face-uri",
		"missing-glyph"
	]), Gn = function(e) {
		return !Wn[dt(e)] && U(xe, e);
	}, Kn = function(e, t, n, r) {
		if (x && typeof u == "object" && typeof u.getAttributeType == "function" && !n) switch (u.getAttributeType(e, t)) {
			case "TrustedHTML": return T(r);
			case "TrustedScriptURL": return ce(r);
		}
		return r;
	}, qn = function(e, t, n, r) {
		try {
			return n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r), !Fn(e) || (hn(e), !1);
		} catch {
			return vn(t, e), !1;
		}
	}, Jn = function(e, t) {
		return P && U(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, t) ? !0 : dt(e) === "attributename" && pt(t, "href") !== null;
	}, Yn = function(e, n) {
		if ($(O.beforeSanitizeAttributes, e, null), Vn(e, n)) return;
		let r = e.attributes;
		if (!r || Fn(e)) return;
		A = Bn(O.uponSanitizeAttribute, A, we, Ne);
		let i = {
			attrName: "",
			attrValue: "",
			keepAttr: !0,
			allowedAttributes: A,
			forceKeepAttr: void 0
		}, a = r.length, o = X(e.nodeName);
		for (; a--;) {
			let n = r[a], s = n.name, c = n.namespaceURI, l = n.value, u = X(s), d = l, f = s === "value" ? d : gt(d), p = !1;
			i.attrName = u, i.attrValue = f, i.keepAttr = !0, i.forceKeepAttr = void 0, $(O.uponSanitizeAttribute, e, i), f = i.attrValue, Re && (u === "id" || u === "name") && ht(f, ze) !== 0 && (vn(s, e, n), f = ze + f, p = !0), Jn(s, f) ? vn(s, e, n) : i.forceKeepAttr || (i.keepAttr ? !Ae && U(Zt, f) ? vn(s, e, n) : (N && (f = Mn(f)), Un(o, u, f) ? (f = Kn(o, u, c, f), f !== d && qn(e, s, c, f) && p && rt(t.removed)) : vn(s, e, n)) : vn(s, e, n));
		}
		$(O.afterSanitizeAttributes, e, null), Vn(e, n);
	}, Xn = function(e) {
		let t = null, n = jn(e);
		for ($(O.beforeSanitizeShadowDOM, e, null); t = n.nextNode();) if ($(O.uponSanitizeShadowNode, t, null), Hn(t, e), Yn(t, e), Q(t.content) && Xn(t.content), y(t) === Y.element) {
			let e = te(t);
			Q(e) && (Zn(e), Xn(e));
		}
		N && Pn(e), $(O.afterSanitizeShadowDOM, e, null);
	}, Zn = function(e) {
		let t = [{
			node: e,
			shadow: null
		}];
		for (; t.length > 0;) {
			let e = t.pop();
			if (e.shadow) {
				Xn(e.shadow);
				continue;
			}
			let n = e.node, r = y(n) === Y.element, i = h(n);
			if (i) for (let e = i.length - 1; e >= 0; --e) t.push({
				node: i[e],
				shadow: null
			});
			if (r) {
				let e = v ? v(n) : null;
				if (typeof e == "string" && X(e) === "template") {
					let e = n.content;
					Q(e) && t.push({
						node: e,
						shadow: null
					});
				}
			}
			if (r) {
				let e = te(n);
				Q(e) && t.push({
					node: null,
					shadow: e
				}, {
					node: e,
					shadow: null
				});
			}
		}
	};
	return t.sanitize = function(e) {
		let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = null, a = null, o = null, s = null;
		if (et = !e, et && (e = "<!-->"), typeof e != "string" && !In(e) && (e = wt(e), typeof e != "string")) throw W("dirty is not a string, aborting");
		if (!t.isSupported) return e;
		je ? (k = Me, A = Ne) : Z(n), (O.uponSanitizeElement.length > 0 || O.uponSanitizeAttribute.length > 0) && (k = q(k)), O.uponSanitizeAttribute.length > 0 && (A = q(A)), t.removed = [];
		let c = Ve && typeof e != "string" && In(e), l = [], u = L;
		if (c) {
			kn(e);
			let t = ie(e);
			if (typeof t == "string") {
				let n = X(t);
				if (!k[n] || Te[n]) throw _n(e), W("root node is forbidden and cannot be sanitized in-place");
			}
			if (Fn(e)) throw _n(e), W("root node is clobbered and cannot be sanitized in-place");
			l = Sn(e), L = ct();
		} else if (In(e)) i = An("<!---->"), a = i.ownerDocument.importNode(e, !0), a.nodeType === Y.element && a.nodeName === "BODY" || a.nodeName === "HTML" ? i = a : i.appendChild(a), Zn(i);
		else {
			if (!Fe && !N && !F && e.indexOf("<") === -1) return x && I ? T(e) : e;
			if (i = An(e), !i) return Fe ? null : I ? S : "";
		}
		i && Pe && hn(i.firstChild);
		let d = c ? e : i;
		try {
			c && Zn(e);
			let t = jn(d);
			for (; o = t.nextNode();) Hn(o, d), Yn(o, d), Q(o.content) && Xn(o.content);
			c && Tn(e, l);
		} catch (t) {
			throw c && (_n(e), wn(e, l)), t;
		} finally {
			L = u;
		}
		if (c) {
			if (wn(e, l)) throw W("a node selected for removal could not be safely returned; refusing to sanitize in place");
			return N && Nn(e), e;
		}
		if (Fe) {
			if (N && Nn(i), Ie) for (s = de.call(i.ownerDocument); i.firstChild;) s.appendChild(i.firstChild);
			else s = i;
			return (A.shadowroot || A.shadowrootmode) && (s = pe.call(r, s, !0)), s;
		}
		let f = F ? i.outerHTML : i.innerHTML;
		return F && k["!doctype"] && i.ownerDocument && i.ownerDocument.doctype && i.ownerDocument.doctype.name && U(Kt, i.ownerDocument.doctype.name) && (f = "<!DOCTYPE " + i.ownerDocument.doctype.name + ">\n" + f), N && (f = Mn(f)), x && I ? T(f) : f;
	}, t.setConfig = function() {
		let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
		Z(e), je = !0, Me = k, Ne = A;
	}, t.clearConfig = function() {
		on = null, je = !1, Me = null, Ne = null, x = oe, S = "";
	}, t.isValidAttribute = function(e, t, n) {
		on || Z({});
		let r = X(e), i = X(t);
		return typeof n == "string" && (Jn(t, n) || !Ae && U(Zt, n)) ? !1 : Un(r, i, n);
	}, t.addHook = function(e, t) {
		typeof t == "function" && H(O, e) && it(O[e], t);
	}, t.removeHook = function(e, t) {
		if (H(O, e)) {
			if (t !== void 0) {
				let n = nt(O[e], t);
				return n === -1 ? void 0 : ot(O[e], n, 1)[0];
			}
			return rt(O[e]);
		}
	}, t.removeHooks = function(e) {
		H(O, e) && (O[e] = []);
	}, t.removeAllHooks = function() {
		O = tn();
	}, t;
}
var X = an(), on = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	var n = /["'&<>]/;
	t.exports = r;
	function r(e) {
		var t = "" + e, r = n.exec(t);
		if (!r) return t;
		var i, a = "", o = 0, s = 0;
		for (o = r.index; o < t.length; o++) {
			switch (t.charCodeAt(o)) {
				case 34:
					i = "&quot;";
					break;
				case 38:
					i = "&amp;";
					break;
				case 39:
					i = "&#39;";
					break;
				case 60:
					i = "&lt;";
					break;
				case 62:
					i = "&gt;";
					break;
				default: continue;
			}
			s !== o && (a += t.substring(s, o)), s = o + 1, a += i;
		}
		return s === o ? a : a + t.substring(s, o);
	}
})))(), 1);
function sn() {
	return globalThis._nc_l10n_locale;
}
function cn() {
	return sn().replaceAll(/_/g, "-");
}
function Z() {
	return globalThis._nc_l10n_language;
}
function ln(e) {
	let t = e || Z();
	return [
		"ae",
		"ar",
		"arc",
		"arz",
		"bcc",
		"bqi",
		"ckb",
		"dv",
		"fa",
		"glk",
		"ha",
		"he",
		"khw",
		"ks",
		"ku",
		"mzn",
		"nqo",
		"pnb",
		"ps",
		"sd",
		"ug",
		"ur",
		"ur-PK",
		"uz-AF",
		"yi"
	].includes(t);
}
globalThis._nc_l10n_locale ??= typeof document < "u" && document.documentElement.dataset.locale || Intl.DateTimeFormat().resolvedOptions().locale.replaceAll(/-/g, "_"), globalThis._nc_l10n_language ??= typeof document < "u" && document.documentElement.lang || (globalThis.navigator?.language ?? "en");
function un(e) {
	return {
		translations: globalThis._oc_l10n_registry_translations[e] ?? {},
		pluralFunction: globalThis._oc_l10n_registry_plural_functions[e] ?? ((e) => e)
	};
}
globalThis._oc_l10n_registry_translations ??= {}, globalThis._oc_l10n_registry_plural_functions ??= {};
function dn(e, t, n, r, i) {
	let a = typeof n == "object" ? n : void 0, o = typeof r == "number" ? r : typeof n == "number" ? n : void 0, s = {
		escape: !0,
		sanitize: !0,
		...typeof i == "object" ? i : typeof r == "object" ? r : {}
	}, c = (e) => e, l = (s.sanitize ? X.sanitize : c) || c, u = s.escape ? on.default : c, d = (e) => typeof e == "string" || typeof e == "number", f = (e, t, n) => e.replace(/%n/g, "" + n).replace(/{([^{}]*)}/g, (e, n) => {
		if (t === void 0 || !(n in t)) return u(e);
		let r = t[n];
		return d(r) ? u(`${r}`) : typeof r == "object" && d(r.value) ? (r.escape === !1 ? c : on.default)(`${r.value}`) : u(e);
	}), p = (i?.bundle ?? un(e)).translations[t] || t;
	return p = Array.isArray(p) ? p[0] : p, l(typeof a == "object" || o !== void 0 ? f(p, a, o) : p);
}
function fn(e, t, n, r, i, a) {
	let o = "_" + t + "_::_" + n + "_", s = a?.bundle ?? un(e), c = s.translations[o];
	if (c !== void 0) {
		let t = c;
		if (Array.isArray(t)) return dn(e, t[s.pluralFunction(r)], i, r, a);
	}
	return r === 1 ? dn(e, t, i, r, a) : dn(e, n, i, r, a);
}
function pn(e, t = Z()) {
	switch (t === "pt-BR" && (t = "xbr"), t.length > 3 && (t = t.substring(0, t.lastIndexOf("-"))), t) {
		case "az":
		case "bo":
		case "dz":
		case "id":
		case "ja":
		case "jv":
		case "ka":
		case "km":
		case "kn":
		case "ko":
		case "ms":
		case "th":
		case "tr":
		case "vi":
		case "zh": return 0;
		case "af":
		case "bn":
		case "bg":
		case "ca":
		case "da":
		case "de":
		case "el":
		case "en":
		case "eo":
		case "es":
		case "et":
		case "eu":
		case "fa":
		case "fi":
		case "fo":
		case "fur":
		case "fy":
		case "gl":
		case "gu":
		case "ha":
		case "he":
		case "hu":
		case "is":
		case "it":
		case "ku":
		case "lb":
		case "ml":
		case "mn":
		case "mr":
		case "nah":
		case "nb":
		case "ne":
		case "nl":
		case "nn":
		case "no":
		case "oc":
		case "om":
		case "or":
		case "pa":
		case "pap":
		case "ps":
		case "pt":
		case "so":
		case "sq":
		case "sv":
		case "sw":
		case "ta":
		case "te":
		case "tk":
		case "ur":
		case "zu": return e === 1 ? 0 : 1;
		case "am":
		case "bh":
		case "fil":
		case "fr":
		case "gun":
		case "hi":
		case "hy":
		case "ln":
		case "mg":
		case "nso":
		case "xbr":
		case "ti":
		case "wa": return e === 0 || e === 1 ? 0 : 1;
		case "be":
		case "bs":
		case "hr":
		case "ru":
		case "sh":
		case "sr":
		case "uk": return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
		case "cs":
		case "sk": return e === 1 ? 0 : e >= 2 && e <= 4 ? 1 : 2;
		case "ga": return e === 1 ? 0 : e === 2 ? 1 : 2;
		case "lt": return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
		case "sl": return e % 100 == 1 ? 0 : e % 100 == 2 ? 1 : e % 100 == 3 || e % 100 == 4 ? 2 : 3;
		case "mk": return e % 10 == 1 ? 0 : 1;
		case "mt": return e === 1 ? 0 : e === 0 || e % 100 > 1 && e % 100 < 11 ? 1 : e % 100 > 10 && e % 100 < 20 ? 2 : 3;
		case "lv": return e === 0 ? 0 : e % 10 == 1 && e % 100 != 11 ? 1 : 2;
		case "pl": return e === 1 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 12 || e % 100 > 14) ? 1 : 2;
		case "cy": return e === 1 ? 0 : e === 2 ? 1 : e === 8 || e === 11 ? 2 : 3;
		case "ro": return e === 1 ? 0 : e === 0 || e % 100 > 0 && e % 100 < 20 ? 1 : 2;
		case "ar": return e === 0 ? 0 : e === 1 ? 1 : e === 2 ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 && e % 100 <= 99 ? 4 : 5;
		default: return 0;
	}
}
// node_modules/@nextcloud/l10n/dist/index.mjs
function mn(e = Date.now(), t = {}) {
	let n = {
		ignoreSeconds: !1,
		language: Z(),
		relativeTime: "long",
		...t
	}, r = new Date(e), i = new Intl.RelativeTimeFormat([n.language, Z()], {
		numeric: "auto",
		style: n.relativeTime
	}), a = (r.getTime() - Date.now()) / 1e3;
	if (Math.abs(a) < 59.5) return n.ignoreSeconds || i.format(Math.round(a), "second");
	let o = a / 60;
	if (Math.abs(o) <= 59) return i.format(Math.round(o), "minute");
	let s = o / 60;
	if (Math.abs(s) < 23.5) return i.format(Math.round(s), "hour");
	let c = s / 24;
	if (Math.abs(c) < 6.5) return i.format(Math.round(c), "day");
	if (Math.abs(c) < 27.5) {
		let e = c / 7;
		return i.format(Math.round(e), "week");
	}
	let l = c / 30, u = Math.abs(l) < 11 ? {
		month: n.relativeTime,
		day: "numeric"
	} : {
		year: n.relativeTime === "narrow" ? "2-digit" : "numeric",
		month: n.relativeTime
	};
	return new Intl.DateTimeFormat([n.language, Z()], u).format(r);
}
// node_modules/@nextcloud/files/dist/utils/sorting.mjs
function hn(e) {
	return e instanceof Date ? e.toISOString() : String(e);
}
function gn(e, t, n) {
	t ??= [(e) => e], n ??= [];
	let r = t.map((e, t) => (n[t] ?? "asc") === "asc" ? 1 : -1), i = Intl.Collator([Z(), cn()], {
		numeric: !0,
		usage: "sort"
	});
	return [...e].sort((e, n) => {
		for (let [a, o] of t.entries()) {
			let t = i.compare(hn(o(e)), hn(o(n)));
			if (t !== 0) return t * r[a];
		}
		return 0;
	});
}
// node_modules/@nextcloud/files/dist/utils/fileSorting.mjs
var _n = Object.freeze({
	Name: "basename",
	Modified: "mtime",
	Size: "size"
});
function vn(e, t = {}) {
	let n = {
		sortingMode: _n.Name,
		sortingOrder: "asc",
		...t
	};
	function r(e) {
		let t = e.displayname || e.attributes?.displayname || e.basename || "";
		return e.type === P.Folder ? t : t.lastIndexOf(".") > 0 ? t.slice(0, t.lastIndexOf(".")) : t;
	}
	return gn(e, [
		...n.sortFavoritesFirst ? [(e) => e.attributes?.favorite !== 1] : [],
		...n.sortFoldersFirst ? [(e) => e.type !== "folder"] : [],
		...n.sortingMode === _n.Name ? [] : [(e) => e[n.sortingMode] ?? e.attributes[n.sortingMode]],
		(e) => r(e),
		(e) => e.basename
	], [
		...n.sortFavoritesFirst ? ["asc"] : [],
		...n.sortFoldersFirst ? ["asc"] : [],
		...n.sortingMode === _n.Modified ? [n.sortingOrder === "asc" ? "desc" : "asc"] : [],
		...n.sortingMode !== _n.Modified && n.sortingMode !== _n.Name ? [n.sortingOrder] : [],
		n.sortingOrder,
		n.sortingOrder
	]);
}
// node_modules/@nextcloud/files/dist/node/folder.mjs
var yn = class extends ze {
	constructor(...[e, t]) {
		super({
			...e,
			mime: "httpd/unix-directory"
		}, t);
	}
	get type() {
		return P.Folder;
	}
	get extension() {
		return null;
	}
	get mime() {
		return "httpd/unix-directory";
	}
};
// node_modules/@nextcloud/initial-state/dist/index.js
function bn(e, t, n) {
	let r = `#initial-state-${e}-${t}`;
	if (window._nc_initial_state?.has(r)) return window._nc_initial_state.get(r);
	window._nc_initial_state || (window._nc_initial_state = /* @__PURE__ */ new Map());
	let i = document.querySelector(r);
	if (i === null) {
		if (n !== void 0) return n;
		throw Error(`Could not find initial state ${t} of ${e}`);
	}
	try {
		let e = JSON.parse(atob(i.value));
		return window._nc_initial_state.set(r, e), e;
	} catch (r) {
		if (console.error("[@nextcloud/initial-state] Could not parse initial state", {
			key: t,
			app: e,
			error: r
		}), n !== void 0) return n;
		throw Error(`Could not parse initial state ${t} of ${e}`, { cause: r });
	}
}
// node_modules/@nextcloud/capabilities/dist/index.mjs
function xn() {
	try {
		return bn("core", "capabilities");
	} catch {
		return console.debug("Could not find capabilities initial state fall back to _oc_capabilities"), "_oc_capabilities" in window ? window._oc_capabilities : {};
	}
}
// node_modules/@nextcloud/files/dist/utils/filename-validation.mjs
var Sn = Object.freeze({
	ReservedName: "reserved name",
	Character: "character",
	Extension: "extension"
}), Cn = class extends Error {
	constructor(e) {
		super(`Invalid ${e.reason} '${e.segment}' in filename '${e.filename}'`, { cause: e });
	}
	get filename() {
		return this.cause.filename;
	}
	get reason() {
		return this.cause.reason;
	}
	get segment() {
		return this.cause.segment;
	}
};
function wn(e) {
	let t = xn().files, n = t.forbidden_filename_characters ?? ["/", "\\"];
	for (let t of n) if (e.includes(t)) throw new Cn({
		segment: t,
		reason: Sn.Character,
		filename: e
	});
	if (e = e.toLocaleLowerCase(), (t.forbidden_filenames ?? [".htaccess"]).includes(e)) throw new Cn({
		filename: e,
		segment: e,
		reason: Sn.ReservedName
	});
	let r = e.indexOf(".", 1), i = e.substring(0, r === -1 ? void 0 : r);
	if ((t.forbidden_filename_basenames ?? []).includes(i)) throw new Cn({
		filename: e,
		segment: i,
		reason: Sn.ReservedName
	});
	let a = t.forbidden_filename_extensions ?? [];
	for (let t of a) if (e.length > t.length && e.endsWith(t)) throw new Cn({
		segment: t,
		reason: Sn.Extension,
		filename: e
	});
}
// __vite-browser-external
var Tn = /* @__PURE__ */ t(((e, t) => {
	t.exports = {};
})), En = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t, n) => {
	(function(e) {
		e.parser = function(e, t) {
			return new n(e, t);
		}, e.SAXParser = n, e.SAXStream = u, e.createStream = c, e.MAX_BUFFER_LENGTH = 65536;
		var t = [
			"comment",
			"sgmlDecl",
			"textNode",
			"tagName",
			"doctype",
			"procInstName",
			"procInstBody",
			"entity",
			"attribName",
			"attribValue",
			"cdata",
			"script"
		];
		e.EVENTS = [
			"text",
			"processinginstruction",
			"sgmldeclaration",
			"doctype",
			"comment",
			"opentagstart",
			"attribute",
			"opentag",
			"closetag",
			"opencdata",
			"cdata",
			"closecdata",
			"error",
			"end",
			"ready",
			"script",
			"opennamespace",
			"closenamespace"
		];
		function n(t, r) {
			if (!(this instanceof n)) return new n(t, r);
			var a = this;
			i(a), a.q = a.c = "", a.bufferCheckPosition = e.MAX_BUFFER_LENGTH, a.encoding = null, a.opt = r || {}, a.opt.lowercase = a.opt.lowercase || a.opt.lowercasetags, a.looseCase = a.opt.lowercase ? "toLowerCase" : "toUpperCase", a.opt.maxEntityCount = a.opt.maxEntityCount || 512, a.opt.maxEntityDepth = a.opt.maxEntityDepth || 4, a.entityCount = a.entityDepth = 0, a.tags = [], a.closed = a.closedRoot = a.sawRoot = !1, a.tag = a.error = null, a.strict = !!t, a.noscript = !!(t || a.opt.noscript), a.state = b.BEGIN, a.strictEntities = a.opt.strictEntities, a.ENTITIES = a.strictEntities ? Object.create(e.XML_ENTITIES) : Object.create(e.ENTITIES), a.attribList = [], a.opt.xmlns && (a.ns = Object.create(ee)), a.opt.unquotedAttributeValues === void 0 && (a.opt.unquotedAttributeValues = !t), a.trackPosition = a.opt.position !== !1, a.trackPosition && (a.position = a.line = a.column = 0), x(a, "onready");
		}
		Object.create || (Object.create = function(e) {
			function t() {}
			return t.prototype = e, new t();
		}), Object.keys || (Object.keys = function(e) {
			var t = [];
			for (var n in e) e.hasOwnProperty(n) && t.push(n);
			return t;
		});
		function r(n) {
			for (var r = Math.max(e.MAX_BUFFER_LENGTH, 10), i = 0, a = 0, o = t.length; a < o; a++) {
				var s = n[t[a]].length;
				if (s > r) switch (t[a]) {
					case "textNode":
						T(n);
						break;
					case "cdata":
						w(n, "oncdata", n.cdata), n.cdata = "";
						break;
					case "script":
						w(n, "onscript", n.script), n.script = "";
						break;
					default: E(n, "Max buffer length exceeded: " + t[a]);
				}
				i = Math.max(i, s);
			}
			n.bufferCheckPosition = e.MAX_BUFFER_LENGTH - i + n.position;
		}
		function i(e) {
			for (var n = 0, r = t.length; n < r; n++) e[t[n]] = "";
		}
		function a(e) {
			T(e), e.cdata !== "" && (w(e, "oncdata", e.cdata), e.cdata = ""), e.script !== "" && (w(e, "onscript", e.script), e.script = "");
		}
		n.prototype = {
			end: function() {
				le(this);
			},
			write: ve,
			resume: function() {
				return this.error = null, this;
			},
			close: function() {
				return this.write(null);
			},
			flush: function() {
				a(this);
			}
		};
		var o;
		try {
			o = Tn().Stream;
		} catch {
			o = function() {};
		}
		o ||= function() {};
		var s = e.EVENTS.filter(function(e) {
			return e !== "error" && e !== "end";
		});
		function c(e, t) {
			return new u(e, t);
		}
		function l(e, t) {
			if (e.length >= 2) {
				if (e[0] === 255 && e[1] === 254) return "utf-16le";
				if (e[0] === 254 && e[1] === 255) return "utf-16be";
			}
			return e.length >= 3 && e[0] === 239 && e[1] === 187 && e[2] === 191 ? "utf8" : e.length >= 4 ? e[0] === 60 && e[1] === 0 && e[2] === 63 && e[3] === 0 ? "utf-16le" : e[0] === 0 && e[1] === 60 && e[2] === 0 && e[3] === 63 ? "utf-16be" : "utf8" : t ? "utf8" : null;
		}
		function u(e, t) {
			if (!(this instanceof u)) return new u(e, t);
			o.apply(this), this._parser = new n(e, t), this.writable = !0, this.readable = !0;
			var r = this;
			this._parser.onend = function() {
				r.emit("end");
			}, this._parser.onerror = function(e) {
				r.emit("error", e), r._parser.error = null;
			}, this._decoder = null, this._decoderBuffer = null, s.forEach(function(e) {
				Object.defineProperty(r, "on" + e, {
					get: function() {
						return r._parser["on" + e];
					},
					set: function(t) {
						if (!t) return r.removeAllListeners(e), r._parser["on" + e] = t, t;
						r.on(e, t);
					},
					enumerable: !0,
					configurable: !1
				});
			});
		}
		u.prototype = Object.create(o.prototype, { constructor: { value: u } }), u.prototype._decodeBuffer = function(e, t) {
			if (this._decoderBuffer &&= (e = Buffer.concat([this._decoderBuffer, e]), null), !this._decoder) {
				var n = l(e, t);
				if (!n) return this._decoderBuffer = e, "";
				this._parser.encoding = n, this._decoder = new TextDecoder(n);
			}
			return this._decoder.decode(e, { stream: !t });
		}, u.prototype.write = function(e) {
			if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(e)) e = this._decodeBuffer(e, !1);
			else if (this._decoderBuffer) {
				var t = this._decodeBuffer(Buffer.alloc(0), !0);
				t && (this._parser.write(t), this.emit("data", t));
			}
			return this._parser.write(e.toString()), this.emit("data", e), !0;
		}, u.prototype.end = function(e) {
			if (e && e.length && this.write(e), this._decoderBuffer) {
				var t = this._decodeBuffer(Buffer.alloc(0), !0);
				t && (this._parser.write(t), this.emit("data", t));
			} else if (this._decoder) {
				var n = this._decoder.decode();
				n && (this._parser.write(n), this.emit("data", n));
			}
			return this._parser.end(), !0;
		}, u.prototype.on = function(e, t) {
			var n = this;
			return !n._parser["on" + e] && s.indexOf(e) !== -1 && (n._parser["on" + e] = function() {
				var t = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
				t.splice(0, 0, e), n.emit.apply(n, t);
			}), o.prototype.on.call(n, e, t);
		};
		var d = /^\[CDATA\[$/i, f = /^DOCTYPE$/i, p = "http://www.w3.org/XML/1998/namespace", m = "http://www.w3.org/2000/xmlns/", ee = {
			xml: p,
			xmlns: m
		}, h = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, g = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, te = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, ne = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
		function _(e) {
			return e === " " || e === "\n" || e === "\r" || e === "	";
		}
		function v(e) {
			return e === "\"" || e === "'";
		}
		function re(e) {
			return e === ">" || _(e);
		}
		function y(e, t) {
			return e.test(t);
		}
		function ie(e, t) {
			return !y(e, t);
		}
		var b = 0;
		for (var ae in e.STATE = {
			BEGIN: b++,
			BEGIN_WHITESPACE: b++,
			TEXT: b++,
			TEXT_ENTITY: b++,
			OPEN_WAKA: b++,
			SGML_DECL: b++,
			SGML_DECL_QUOTED: b++,
			DOCTYPE: b++,
			DOCTYPE_QUOTED: b++,
			DOCTYPE_DTD: b++,
			DOCTYPE_DTD_QUOTED: b++,
			COMMENT_STARTING: b++,
			COMMENT: b++,
			COMMENT_ENDING: b++,
			COMMENT_ENDED: b++,
			CDATA: b++,
			CDATA_ENDING: b++,
			CDATA_ENDING_2: b++,
			PROC_INST: b++,
			PROC_INST_BODY: b++,
			PROC_INST_ENDING: b++,
			OPEN_TAG: b++,
			OPEN_TAG_SLASH: b++,
			ATTRIB: b++,
			ATTRIB_NAME: b++,
			ATTRIB_NAME_SAW_WHITE: b++,
			ATTRIB_VALUE: b++,
			ATTRIB_VALUE_QUOTED: b++,
			ATTRIB_VALUE_CLOSED: b++,
			ATTRIB_VALUE_UNQUOTED: b++,
			ATTRIB_VALUE_ENTITY_Q: b++,
			ATTRIB_VALUE_ENTITY_U: b++,
			CLOSE_TAG: b++,
			CLOSE_TAG_SAW_WHITE: b++,
			SCRIPT: b++,
			SCRIPT_ENDING: b++
		}, e.XML_ENTITIES = Object.assign(Object.create(null), {
			amp: "&",
			gt: ">",
			lt: "<",
			quot: "\"",
			apos: "'"
		}), e.ENTITIES = Object.assign(Object.create(null), {
			amp: "&",
			gt: ">",
			lt: "<",
			quot: "\"",
			apos: "'",
			AElig: 198,
			Aacute: 193,
			Acirc: 194,
			Agrave: 192,
			Aring: 197,
			Atilde: 195,
			Auml: 196,
			Ccedil: 199,
			ETH: 208,
			Eacute: 201,
			Ecirc: 202,
			Egrave: 200,
			Euml: 203,
			Iacute: 205,
			Icirc: 206,
			Igrave: 204,
			Iuml: 207,
			Ntilde: 209,
			Oacute: 211,
			Ocirc: 212,
			Ograve: 210,
			Oslash: 216,
			Otilde: 213,
			Ouml: 214,
			THORN: 222,
			Uacute: 218,
			Ucirc: 219,
			Ugrave: 217,
			Uuml: 220,
			Yacute: 221,
			aacute: 225,
			acirc: 226,
			aelig: 230,
			agrave: 224,
			aring: 229,
			atilde: 227,
			auml: 228,
			ccedil: 231,
			eacute: 233,
			ecirc: 234,
			egrave: 232,
			eth: 240,
			euml: 235,
			iacute: 237,
			icirc: 238,
			igrave: 236,
			iuml: 239,
			ntilde: 241,
			oacute: 243,
			ocirc: 244,
			ograve: 242,
			oslash: 248,
			otilde: 245,
			ouml: 246,
			szlig: 223,
			thorn: 254,
			uacute: 250,
			ucirc: 251,
			ugrave: 249,
			uuml: 252,
			yacute: 253,
			yuml: 255,
			copy: 169,
			reg: 174,
			nbsp: 160,
			iexcl: 161,
			cent: 162,
			pound: 163,
			curren: 164,
			yen: 165,
			brvbar: 166,
			sect: 167,
			uml: 168,
			ordf: 170,
			laquo: 171,
			not: 172,
			shy: 173,
			macr: 175,
			deg: 176,
			plusmn: 177,
			sup1: 185,
			sup2: 178,
			sup3: 179,
			acute: 180,
			micro: 181,
			para: 182,
			middot: 183,
			cedil: 184,
			ordm: 186,
			raquo: 187,
			frac14: 188,
			frac12: 189,
			frac34: 190,
			iquest: 191,
			times: 215,
			divide: 247,
			OElig: 338,
			oelig: 339,
			Scaron: 352,
			scaron: 353,
			Yuml: 376,
			fnof: 402,
			circ: 710,
			tilde: 732,
			Alpha: 913,
			Beta: 914,
			Gamma: 915,
			Delta: 916,
			Epsilon: 917,
			Zeta: 918,
			Eta: 919,
			Theta: 920,
			Iota: 921,
			Kappa: 922,
			Lambda: 923,
			Mu: 924,
			Nu: 925,
			Xi: 926,
			Omicron: 927,
			Pi: 928,
			Rho: 929,
			Sigma: 931,
			Tau: 932,
			Upsilon: 933,
			Phi: 934,
			Chi: 935,
			Psi: 936,
			Omega: 937,
			alpha: 945,
			beta: 946,
			gamma: 947,
			delta: 948,
			epsilon: 949,
			zeta: 950,
			eta: 951,
			theta: 952,
			iota: 953,
			kappa: 954,
			lambda: 955,
			mu: 956,
			nu: 957,
			xi: 958,
			omicron: 959,
			pi: 960,
			rho: 961,
			sigmaf: 962,
			sigma: 963,
			tau: 964,
			upsilon: 965,
			phi: 966,
			chi: 967,
			psi: 968,
			omega: 969,
			thetasym: 977,
			upsih: 978,
			piv: 982,
			ensp: 8194,
			emsp: 8195,
			thinsp: 8201,
			zwnj: 8204,
			zwj: 8205,
			lrm: 8206,
			rlm: 8207,
			ndash: 8211,
			mdash: 8212,
			lsquo: 8216,
			rsquo: 8217,
			sbquo: 8218,
			ldquo: 8220,
			rdquo: 8221,
			bdquo: 8222,
			dagger: 8224,
			Dagger: 8225,
			bull: 8226,
			hellip: 8230,
			permil: 8240,
			prime: 8242,
			Prime: 8243,
			lsaquo: 8249,
			rsaquo: 8250,
			oline: 8254,
			frasl: 8260,
			euro: 8364,
			image: 8465,
			weierp: 8472,
			real: 8476,
			trade: 8482,
			alefsym: 8501,
			larr: 8592,
			uarr: 8593,
			rarr: 8594,
			darr: 8595,
			harr: 8596,
			crarr: 8629,
			lArr: 8656,
			uArr: 8657,
			rArr: 8658,
			dArr: 8659,
			hArr: 8660,
			forall: 8704,
			part: 8706,
			exist: 8707,
			empty: 8709,
			nabla: 8711,
			isin: 8712,
			notin: 8713,
			ni: 8715,
			prod: 8719,
			sum: 8721,
			minus: 8722,
			lowast: 8727,
			radic: 8730,
			prop: 8733,
			infin: 8734,
			ang: 8736,
			and: 8743,
			or: 8744,
			cap: 8745,
			cup: 8746,
			int: 8747,
			there4: 8756,
			sim: 8764,
			cong: 8773,
			asymp: 8776,
			ne: 8800,
			equiv: 8801,
			le: 8804,
			ge: 8805,
			sub: 8834,
			sup: 8835,
			nsub: 8836,
			sube: 8838,
			supe: 8839,
			oplus: 8853,
			otimes: 8855,
			perp: 8869,
			sdot: 8901,
			lceil: 8968,
			rceil: 8969,
			lfloor: 8970,
			rfloor: 8971,
			lang: 9001,
			rang: 9002,
			loz: 9674,
			spades: 9824,
			clubs: 9827,
			hearts: 9829,
			diams: 9830
		}), Object.keys(e.ENTITIES).forEach(function(t) {
			var n = e.ENTITIES[t], r = typeof n == "number" ? String.fromCharCode(n) : n;
			e.ENTITIES[t] = r;
		}), e.STATE) e.STATE[e.STATE[ae]] = ae;
		b = e.STATE;
		function x(e, t, n) {
			e[t] && e[t](n);
		}
		function S(e) {
			var t = e && e.match(/(?:^|\s)encoding\s*=\s*(['"])([^'"]+)\1/i);
			return t ? t[2] : null;
		}
		function oe(e) {
			return e ? e.toLowerCase().replace(/[^a-z0-9]/g, "") : null;
		}
		function se(e, t) {
			let n = oe(e), r = oe(t);
			return !n || !r ? !0 : r === "utf16" ? n === "utf16le" || n === "utf16be" : n === r;
		}
		function C(e, t) {
			if (e.strict && e.encoding && t && t.name === "xml") {
				var n = S(t.body);
				n && !se(e.encoding, n) && D(e, "XML declaration encoding " + n + " does not match detected stream encoding " + e.encoding.toUpperCase());
			}
		}
		function w(e, t, n) {
			e.textNode && T(e), x(e, t, n);
		}
		function T(e) {
			e.textNode = ce(e.opt, e.textNode), e.textNode && x(e, "ontext", e.textNode), e.textNode = "";
		}
		function ce(e, t) {
			return e.trim && (t = t.trim()), e.normalize && (t = t.replace(/\s+/g, " ")), t;
		}
		function E(e, t) {
			return T(e), e.trackPosition && (t += "\nLine: " + e.line + "\nColumn: " + e.column + "\nChar: " + e.c), t = Error(t), e.error = t, x(e, "onerror", t), e;
		}
		function le(e) {
			return e.sawRoot && !e.closedRoot && D(e, "Unclosed root tag"), e.state !== b.BEGIN && e.state !== b.BEGIN_WHITESPACE && e.state !== b.TEXT && E(e, "Unexpected end"), T(e), e.c = "", e.closed = !0, x(e, "onend"), n.call(e, e.strict, e.opt), e;
		}
		function D(e, t) {
			if (typeof e != "object" || !(e instanceof n)) throw Error("bad call to strictFail");
			e.strict && E(e, t);
		}
		function ue(e) {
			e.strict || (e.tagName = e.tagName[e.looseCase]());
			var t = e.tags[e.tags.length - 1] || e, n = e.tag = {
				name: e.tagName,
				attributes: {}
			};
			e.opt.xmlns && (n.ns = t.ns), e.attribList.length = 0, w(e, "onopentagstart", n);
		}
		function de(e, t) {
			var n = e.indexOf(":") < 0 ? ["", e] : e.split(":"), r = n[0], i = n[1];
			return t && e === "xmlns" && (r = "xmlns", i = ""), {
				prefix: r,
				local: i
			};
		}
		function fe(e) {
			if (e.strict || (e.attribName = e.attribName[e.looseCase]()), e.attribList.indexOf(e.attribName) !== -1 || e.tag.attributes.hasOwnProperty(e.attribName)) e.attribName = e.attribValue = "";
			else {
				if (e.opt.xmlns) {
					var t = de(e.attribName, !0), n = t.prefix, r = t.local;
					if (n === "xmlns") {
						if (r === "xml" && e.attribValue !== p) D(e, "xml: prefix must be bound to " + p + "\nActual: " + e.attribValue);
						else if (r === "xmlns" && e.attribValue !== m) D(e, "xmlns: prefix must be bound to " + m + "\nActual: " + e.attribValue);
						else {
							var i = e.tag, a = e.tags[e.tags.length - 1] || e;
							i.ns === a.ns && (i.ns = Object.create(a.ns)), i.ns[r] = e.attribValue;
						}
					}
					e.attribList.push([e.attribName, e.attribValue]);
				} else e.tag.attributes[e.attribName] = e.attribValue, w(e, "onattribute", {
					name: e.attribName,
					value: e.attribValue
				});
				e.attribName = e.attribValue = "";
			}
		}
		function pe(e, t) {
			if (e.opt.xmlns) {
				var n = e.tag, r = de(e.tagName);
				n.prefix = r.prefix, n.local = r.local, n.uri = n.ns[r.prefix] || "", n.prefix && !n.uri && (D(e, "Unbound namespace prefix: " + JSON.stringify(e.tagName)), n.uri = r.prefix);
				var i = e.tags[e.tags.length - 1] || e;
				n.ns && i.ns !== n.ns && Object.keys(n.ns).forEach(function(t) {
					w(e, "onopennamespace", {
						prefix: t,
						uri: n.ns[t]
					});
				});
				for (var a = 0, o = e.attribList.length; a < o; a++) {
					var s = e.attribList[a], c = s[0], l = s[1], u = de(c, !0), d = u.prefix, f = u.local, p = d === "" ? "" : n.ns[d] || "", m = {
						name: c,
						value: l,
						prefix: d,
						local: f,
						uri: p
					};
					d && d !== "xmlns" && !p && (D(e, "Unbound namespace prefix: " + JSON.stringify(d)), m.uri = d), e.tag.attributes[c] = m, w(e, "onattribute", m);
				}
				e.attribList.length = 0;
			}
			e.tag.isSelfClosing = !!t, e.sawRoot = !0, e.tags.push(e.tag), w(e, "onopentag", e.tag), t || (e.state = !e.noscript && e.tagName.toLowerCase() === "script" ? b.SCRIPT : b.TEXT, e.tag = null, e.tagName = ""), e.attribName = e.attribValue = "", e.attribList.length = 0;
		}
		function O(e) {
			if (!e.tagName) D(e, "Weird empty close tag."), e.textNode += "</>", e.state = b.TEXT;
			else {
				if (e.script) {
					if (e.tagName !== "script") {
						e.script += "</" + e.tagName + ">", e.tagName = "", e.state = b.SCRIPT;
						return;
					}
					w(e, "onscript", e.script), e.script = "";
				}
				var t = e.tags.length, n = e.tagName;
				e.strict || (n = n[e.looseCase]());
				for (var r = n; t-- && e.tags[t].name !== r;) D(e, "Unexpected close tag");
				if (t < 0) D(e, "Unmatched closing tag: " + e.tagName), e.textNode += "</" + e.tagName + ">", e.state = b.TEXT;
				else {
					e.tagName = n;
					for (var i = e.tags.length; i-- > t;) {
						var a = e.tag = e.tags.pop();
						e.tagName = e.tag.name, w(e, "onclosetag", e.tagName);
						var o = {};
						for (var s in a.ns) o[s] = a.ns[s];
						var c = e.tags[e.tags.length - 1] || e;
						e.opt.xmlns && a.ns !== c.ns && Object.keys(a.ns).forEach(function(t) {
							var n = a.ns[t];
							w(e, "onclosenamespace", {
								prefix: t,
								uri: n
							});
						});
					}
					t === 0 && (e.closedRoot = !0), e.tagName = e.attribValue = e.attribName = "", e.attribList.length = 0, e.state = b.TEXT;
				}
			}
		}
		function me(e) {
			var t = e.entity, n = t.toLowerCase(), r, i = "";
			return e.ENTITIES[t] ? e.ENTITIES[t] : e.ENTITIES[n] ? e.ENTITIES[n] : (t = n, t.charAt(0) === "#" && (t.charAt(1) === "x" ? (t = t.slice(2), r = parseInt(t, 16), i = r.toString(16)) : (t = t.slice(1), r = parseInt(t, 10), i = r.toString(10))), t = t.replace(/^0+/, ""), isNaN(r) || i.toLowerCase() !== t || r < 0 || r > 1114111 || !he(r) ? (D(e, "Invalid character entity"), "&" + e.entity + ";") : String.fromCodePoint(r));
		}
		function he(e) {
			return e === 9 || e === 10 || e === 13 || e >= 32 && e <= 55295 || e >= 57344 && e <= 65533 || e >= 65536 && e <= 1114111;
		}
		function ge(e, t) {
			t === "<" ? (e.state = b.OPEN_WAKA, e.startTagPosition = e.position) : _(t) || (D(e, "Non-whitespace before first tag."), e.textNode = t, e.state = b.TEXT);
		}
		function _e(e, t) {
			var n = "";
			return t < e.length && (n = e.charAt(t)), n;
		}
		function ve(t) {
			var n = this;
			if (this.error) throw this.error;
			if (n.closed) return E(n, "Cannot write after close. Assign an onready handler.");
			if (t === null) return le(n);
			typeof t == "object" && (t = t.toString());
			for (var i = 0, a = ""; a = _e(t, i++), n.c = a, a;) switch (n.trackPosition && (n.position++, a === "\n" ? (n.line++, n.column = 0) : n.column++), n.state) {
				case b.BEGIN:
					if (n.state = b.BEGIN_WHITESPACE, a === "\ufeff") continue;
					ge(n, a);
					continue;
				case b.BEGIN_WHITESPACE:
					ge(n, a);
					continue;
				case b.TEXT:
					if (n.sawRoot && !n.closedRoot) {
						for (var o = i - 1; a && a !== "<" && a !== "&";) a = _e(t, i++), a && n.trackPosition && (n.position++, a === "\n" ? (n.line++, n.column = 0) : n.column++);
						n.textNode += t.substring(o, i - 1);
					}
					a === "<" && !(n.sawRoot && n.closedRoot && !n.strict) ? (n.state = b.OPEN_WAKA, n.startTagPosition = n.position) : (_(a) || n.sawRoot && !n.closedRoot || D(n, "Text data outside of root node."), a === "&" ? n.state = b.TEXT_ENTITY : n.textNode += a);
					continue;
				case b.SCRIPT:
					a === "<" ? n.state = b.SCRIPT_ENDING : n.script += a;
					continue;
				case b.SCRIPT_ENDING:
					a === "/" ? n.state = b.CLOSE_TAG : (n.script += "<" + a, n.state = b.SCRIPT);
					continue;
				case b.OPEN_WAKA:
					if (a === "!") n.state = b.SGML_DECL, n.sgmlDecl = "";
					else if (!_(a)) {
						if (y(h, a)) n.state = b.OPEN_TAG, n.tagName = a;
						else if (a === "/") n.state = b.CLOSE_TAG, n.tagName = "";
						else if (a === "?") n.state = b.PROC_INST, n.procInstName = n.procInstBody = "";
						else {
							if (D(n, "Unencoded <"), n.startTagPosition + 1 < n.position) {
								var s = n.position - n.startTagPosition;
								a = Array(s).join(" ") + a;
							}
							n.textNode += "<" + a, n.state = b.TEXT;
						}
					}
					continue;
				case b.SGML_DECL:
					if (n.sgmlDecl + a === "--") {
						n.state = b.COMMENT, n.comment = "", n.sgmlDecl = "";
						continue;
					}
					n.doctype && n.doctype !== !0 && n.sgmlDecl ? (n.state = b.DOCTYPE_DTD, n.doctype += "<!" + n.sgmlDecl + a, n.sgmlDecl = "") : d.test(n.sgmlDecl + a) ? (w(n, "onopencdata"), n.state = b.CDATA, n.sgmlDecl = "", n.cdata = "") : f.test(n.sgmlDecl + a) ? (n.state = b.DOCTYPE, (n.doctype || n.sawRoot) && D(n, "Inappropriately located doctype declaration"), n.doctype = "", n.sgmlDecl = "") : a === ">" ? (w(n, "onsgmldeclaration", n.sgmlDecl), n.sgmlDecl = "", n.state = b.TEXT) : (v(a) && (n.state = b.SGML_DECL_QUOTED), n.sgmlDecl += a);
					continue;
				case b.SGML_DECL_QUOTED:
					a === n.q && (n.state = b.SGML_DECL, n.q = ""), n.sgmlDecl += a;
					continue;
				case b.DOCTYPE:
					a === ">" ? (n.state = b.TEXT, w(n, "ondoctype", n.doctype), n.doctype = !0) : (n.doctype += a, a === "[" ? n.state = b.DOCTYPE_DTD : v(a) && (n.state = b.DOCTYPE_QUOTED, n.q = a));
					continue;
				case b.DOCTYPE_QUOTED:
					n.doctype += a, a === n.q && (n.q = "", n.state = b.DOCTYPE);
					continue;
				case b.DOCTYPE_DTD:
					a === "]" ? (n.doctype += a, n.state = b.DOCTYPE) : a === "<" ? (n.state = b.OPEN_WAKA, n.startTagPosition = n.position) : v(a) ? (n.doctype += a, n.state = b.DOCTYPE_DTD_QUOTED, n.q = a) : n.doctype += a;
					continue;
				case b.DOCTYPE_DTD_QUOTED:
					n.doctype += a, a === n.q && (n.state = b.DOCTYPE_DTD, n.q = "");
					continue;
				case b.COMMENT:
					a === "-" ? n.state = b.COMMENT_ENDING : n.comment += a;
					continue;
				case b.COMMENT_ENDING:
					a === "-" ? (n.state = b.COMMENT_ENDED, n.comment = ce(n.opt, n.comment), n.comment && w(n, "oncomment", n.comment), n.comment = "") : (n.comment += "-" + a, n.state = b.COMMENT);
					continue;
				case b.COMMENT_ENDED:
					a === ">" ? n.state = n.doctype && n.doctype !== !0 ? b.DOCTYPE_DTD : b.TEXT : (D(n, "Malformed comment"), n.comment += "--" + a, n.state = b.COMMENT);
					continue;
				case b.CDATA:
					for (var o = i - 1; a && a !== "]";) a = _e(t, i++), a && n.trackPosition && (n.position++, a === "\n" ? (n.line++, n.column = 0) : n.column++);
					n.cdata += t.substring(o, i - 1), a === "]" && (n.state = b.CDATA_ENDING);
					continue;
				case b.CDATA_ENDING:
					a === "]" ? n.state = b.CDATA_ENDING_2 : (n.cdata += "]" + a, n.state = b.CDATA);
					continue;
				case b.CDATA_ENDING_2:
					a === ">" ? (n.cdata && w(n, "oncdata", n.cdata), w(n, "onclosecdata"), n.cdata = "", n.state = b.TEXT) : a === "]" ? n.cdata += "]" : (n.cdata += "]]" + a, n.state = b.CDATA);
					continue;
				case b.PROC_INST:
					a === "?" ? n.state = b.PROC_INST_ENDING : _(a) ? n.state = b.PROC_INST_BODY : n.procInstName += a;
					continue;
				case b.PROC_INST_BODY:
					if (!n.procInstBody && _(a)) continue;
					a === "?" ? n.state = b.PROC_INST_ENDING : n.procInstBody += a;
					continue;
				case b.PROC_INST_ENDING:
					if (a === ">") {
						let e = {
							name: n.procInstName,
							body: n.procInstBody
						};
						C(n, e), w(n, "onprocessinginstruction", e), n.procInstName = n.procInstBody = "", n.state = b.TEXT;
					} else n.procInstBody += "?" + a, n.state = b.PROC_INST_BODY;
					continue;
				case b.OPEN_TAG:
					y(g, a) ? n.tagName += a : (ue(n), a === ">" ? pe(n) : a === "/" ? n.state = b.OPEN_TAG_SLASH : (_(a) || D(n, "Invalid character in tag name"), n.state = b.ATTRIB));
					continue;
				case b.OPEN_TAG_SLASH:
					a === ">" ? (pe(n, !0), O(n)) : (D(n, "Forward-slash in opening tag not followed by >"), n.state = b.ATTRIB);
					continue;
				case b.ATTRIB:
					if (_(a)) continue;
					a === ">" ? pe(n) : a === "/" ? n.state = b.OPEN_TAG_SLASH : y(h, a) ? (n.attribName = a, n.attribValue = "", n.state = b.ATTRIB_NAME) : D(n, "Invalid attribute name");
					continue;
				case b.ATTRIB_NAME:
					a === "=" ? n.state = b.ATTRIB_VALUE : a === ">" ? (D(n, "Attribute without value"), n.attribValue = n.attribName, fe(n), pe(n)) : _(a) ? n.state = b.ATTRIB_NAME_SAW_WHITE : y(g, a) ? n.attribName += a : D(n, "Invalid attribute name");
					continue;
				case b.ATTRIB_NAME_SAW_WHITE:
					if (a === "=") n.state = b.ATTRIB_VALUE;
					else if (_(a)) continue;
					else D(n, "Attribute without value"), n.tag.attributes[n.attribName] = "", n.attribValue = "", w(n, "onattribute", {
						name: n.attribName,
						value: ""
					}), n.attribName = "", a === ">" ? pe(n) : y(h, a) ? (n.attribName = a, n.state = b.ATTRIB_NAME) : (D(n, "Invalid attribute name"), n.state = b.ATTRIB);
					continue;
				case b.ATTRIB_VALUE:
					if (_(a)) continue;
					v(a) ? (n.q = a, n.state = b.ATTRIB_VALUE_QUOTED) : (n.opt.unquotedAttributeValues || E(n, "Unquoted attribute value"), n.state = b.ATTRIB_VALUE_UNQUOTED, n.attribValue = a);
					continue;
				case b.ATTRIB_VALUE_QUOTED:
					if (a !== n.q) {
						a === "&" ? n.state = b.ATTRIB_VALUE_ENTITY_Q : n.attribValue += a;
						continue;
					}
					fe(n), n.q = "", n.state = b.ATTRIB_VALUE_CLOSED;
					continue;
				case b.ATTRIB_VALUE_CLOSED:
					_(a) ? n.state = b.ATTRIB : a === ">" ? pe(n) : a === "/" ? n.state = b.OPEN_TAG_SLASH : y(h, a) ? (D(n, "No whitespace between attributes"), n.attribName = a, n.attribValue = "", n.state = b.ATTRIB_NAME) : D(n, "Invalid attribute name");
					continue;
				case b.ATTRIB_VALUE_UNQUOTED:
					if (!re(a)) {
						a === "&" ? n.state = b.ATTRIB_VALUE_ENTITY_U : n.attribValue += a;
						continue;
					}
					fe(n), a === ">" ? pe(n) : n.state = b.ATTRIB;
					continue;
				case b.CLOSE_TAG:
					if (n.tagName) a === ">" ? O(n) : y(g, a) ? n.tagName += a : n.script ? (n.script += "</" + n.tagName + a, n.tagName = "", n.state = b.SCRIPT) : (_(a) || D(n, "Invalid tagname in closing tag"), n.state = b.CLOSE_TAG_SAW_WHITE);
					else {
						if (_(a)) continue;
						ie(h, a) ? n.script ? (n.script += "</" + a, n.state = b.SCRIPT) : D(n, "Invalid tagname in closing tag.") : n.tagName = a;
					}
					continue;
				case b.CLOSE_TAG_SAW_WHITE:
					if (_(a)) continue;
					a === ">" ? O(n) : D(n, "Invalid characters in closing tag");
					continue;
				case b.TEXT_ENTITY:
				case b.ATTRIB_VALUE_ENTITY_Q:
				case b.ATTRIB_VALUE_ENTITY_U:
					var c, l;
					switch (n.state) {
						case b.TEXT_ENTITY:
							c = b.TEXT, l = "textNode";
							break;
						case b.ATTRIB_VALUE_ENTITY_Q:
							c = b.ATTRIB_VALUE_QUOTED, l = "attribValue";
							break;
						case b.ATTRIB_VALUE_ENTITY_U: c = b.ATTRIB_VALUE_UNQUOTED, l = "attribValue";
					}
					if (a === ";") {
						var u = me(n);
						n.opt.unparsedEntities && !Object.values(e.XML_ENTITIES).includes(u) ? ((n.entityCount += 1) > n.opt.maxEntityCount && E(n, "Parsed entity count exceeds max entity count"), (n.entityDepth += 1) > n.opt.maxEntityDepth && E(n, "Parsed entity depth exceeds max entity depth"), n.entity = "", n.state = c, n.write(u), --n.entityDepth) : (n[l] += u, n.entity = "", n.state = c);
					} else y(n.entity.length ? ne : te, a) ? n.entity += a : (D(n, "Invalid character in entity name"), n[l] += "&" + n.entity + a, n.entity = "", n.state = c);
					continue;
				default: throw Error(n, "Unknown state: " + n.state);
			}
			return n.position >= n.bufferCheckPosition && r(n), n;
		}
		/* istanbul ignore next */
		String.fromCodePoint || (function() {
			var e = String.fromCharCode, t = Math.floor, n = function() {
				var n = 16384, r = [], i, a, o = -1, s = arguments.length;
				if (!s) return "";
				for (var c = ""; ++o < s;) {
					var l = Number(arguments[o]);
					if (!isFinite(l) || l < 0 || l > 1114111 || t(l) !== l) throw RangeError("Invalid code point: " + l);
					l <= 65535 ? r.push(l) : (l -= 65536, i = (l >> 10) + 55296, a = l % 1024 + 56320, r.push(i, a)), (o + 1 === s || r.length > n) && (c += e.apply(null, r), r.length = 0);
				}
				return c;
			};
			/* istanbul ignore next */
			Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
				value: n,
				configurable: !0,
				writable: !0
			}) : String.fromCodePoint = n;
		})();
	})(e === void 0 ? n.sax = {} : e);
})))(), 1), Dn = {
	"http://www.w3.org/2000/svg": {
		ext: "svg",
		mime: "image/svg+xml"
	},
	"http://www.w3.org/1999/xhtml": {
		ext: "xhtml",
		mime: "application/xhtml+xml"
	},
	"http://www.opengis.net/kml/2.2": {
		ext: "kml",
		mime: "application/vnd.google-earth.kml+xml"
	},
	"http://www.opengis.net/gml": {
		ext: "gml",
		mime: "application/gml+xml"
	}
}, On = {
	rss: {
		ext: "rss",
		mime: "application/rss+xml"
	},
	"score-partwise": {
		ext: "musicxml",
		mime: "application/vnd.recordare.musicxml+xml"
	},
	svg: {
		ext: "svg",
		mime: "image/svg+xml"
	}
}, kn = class {
	constructor(e) {
		this.options = e ?? {}, this.firstTag = !0, this.onEnd = !1, this.parser = En.default.parser(!0, { xmlns: !0 }), this.nesting = 0, this.parser.onerror = (e) => {
			e.message.startsWith("Invalid character entity") || (this.fileType = void 0, this.onEnd = !0);
		}, this.parser.onopentag = (e) => {
			++this.nesting, this.firstTag && !this.onEnd && (this.firstTag = !1, e.uri ? this.fileType = Dn[e.uri] : e.name && (this.fileType = On[e.name.toLowerCase()]), this.fileType && !this.options.fullScan && (this.onEnd = !0));
		}, this.parser.onclosetag = () => {
			--this.nesting;
		};
	}
	write(e) {
		this.parser.write(e);
	}
	close() {
		this.parser.close(), this.onEnd = !0;
	}
	isValid() {
		return this.nesting === 0;
	}
};
// node_modules/is-svg/index.js
function An(e, { validate: t = !0 } = {}) {
	if (typeof e != "string") throw TypeError(`Expected a \`string\`, got \`${typeof e}\``);
	if (e = e.trim(), e.length === 0) return !1;
	let n = new kn({ fullScan: t });
	if (t) {
		if (n.write(e), !n.isValid()) return !1;
	} else {
		let t = 0;
		for (; e.length > t && !n.onEnd;) n.write(e.slice(t, Math.min(t + 128, e.length))), t += 128;
	}
	return n.fileType?.ext === "svg";
}
// node_modules/@nextcloud/files/dist/ui/navigation/view.mjs
var jn = class {
	_view;
	constructor(e) {
		Mn(e), this._view = e;
	}
	get id() {
		return this._view.id;
	}
	get name() {
		return this._view.name;
	}
	get caption() {
		return this._view.caption;
	}
	get emptyTitle() {
		return this._view.emptyTitle;
	}
	get emptyCaption() {
		return this._view.emptyCaption;
	}
	get getContents() {
		return this._view.getContents;
	}
	get hidden() {
		return this._view.hidden;
	}
	get icon() {
		return this._view.icon;
	}
	set icon(e) {
		this._view.icon = e;
	}
	get order() {
		return this._view.order;
	}
	set order(e) {
		this._view.order = e;
	}
	get params() {
		return this._view.params;
	}
	set params(e) {
		this._view.params = e;
	}
	get columns() {
		return this._view.columns;
	}
	get emptyView() {
		return this._view.emptyView;
	}
	get parent() {
		return this._view.parent;
	}
	get sticky() {
		return this._view.sticky;
	}
	get expanded() {
		return this._view.expanded;
	}
	set expanded(e) {
		this._view.expanded = e;
	}
	get defaultSortKey() {
		return this._view.defaultSortKey;
	}
	get loadChildViews() {
		return this._view.loadChildViews;
	}
};
function Mn(e) {
	if (!e.icon || typeof e.icon != "string" || !An(e.icon)) throw Error("View icon is required and must be a valid svg string");
	if (!e.id || typeof e.id != "string") throw Error("View id is required and must be a string");
	if (!e.getContents || typeof e.getContents != "function") throw Error("View getContents is required and must be a function");
	if (!e.name || typeof e.name != "string") throw Error("View name is required and must be a string");
	if (r(e, "caption", "string"), r(e, "columns", "array"), r(e, "defaultSortKey", "string"), r(e, "emptyCaption", "string"), r(e, "emptyTitle", "string"), r(e, "emptyView", "function"), r(e, "expanded", "boolean"), r(e, "hidden", "boolean"), r(e, "loadChildViews", "function"), r(e, "order", "number"), r(e, "params", "object"), r(e, "parent", "string"), r(e, "sticky", "boolean"), e.columns && (e.columns.forEach(i), e.columns.reduce((e, t) => e.add(t.id), /* @__PURE__ */ new Set()).size !== e.columns.length)) throw Error("View columns must have unique ids");
}
// node_modules/@nextcloud/files/dist/ui/navigation/navigation.mjs
var Nn = class extends Ee {
	_views = [];
	_currentView = null;
	register(...e) {
		for (let t of e) {
			if (this._views.find((e) => e.id === t.id)) throw Error(`IView id ${t.id} is already registered`);
			Mn(t);
		}
		this._views.push(...e), this.dispatchTypedEvent("update", new CustomEvent("update"));
	}
	remove(e) {
		let t = this._views.findIndex((t) => t.id === e);
		t !== -1 && (this._views.splice(t, 1), this.dispatchTypedEvent("update", new CustomEvent("update")));
	}
	setActive(e) {
		if (e === null) this._currentView = null;
		else {
			let t = this._views.find(({ id: t }) => t === e);
			if (!t) throw Error(`No view with ${e} registered`);
			this._currentView = t;
		}
		let t = new CustomEvent("updateActive", { detail: this._currentView });
		this.dispatchTypedEvent("updateActive", t);
	}
	get active() {
		return this._currentView;
	}
	get views() {
		return this._views;
	}
};
function Pn() {
	return a.navigation ??= new Nn(), a.navigation;
}
// node_modules/@nextcloud/files/dist/utils/fileSize.mjs
var Fn = [
	"B",
	"KB",
	"MB",
	"GB",
	"TB",
	"PB"
], Q = [
	"B",
	"KiB",
	"MiB",
	"GiB",
	"TiB",
	"PiB"
];
function In(e, t = !1, n = !1, r = !1) {
	n &&= !r, typeof e == "string" && (e = Number(e));
	let i = e > 0 ? Math.floor(Math.log(e) / Math.log(r ? 1e3 : 1024)) : 0;
	i = Math.min((n ? Q.length : Fn.length) - 1, i);
	let a = n ? Q[i] : Fn[i], o = (e / (r ? 1e3 : 1024) ** i).toFixed(1);
	return t === !0 && i === 0 ? (o === "0.0" ? "0 " : "< 1 ") + (n ? Q[1] : Fn[1]) : (o = i < 2 ? parseFloat(o).toFixed(0) : parseFloat(o).toLocaleString(cn()), o + " " + a);
}
// node_modules/@nextcloud/files/dist/ui/actions/fileListAction.mjs
function $(e) {
	Ln(e), a.fileListActions ??= /* @__PURE__ */ new Map(), a.fileListActions.has(e.id) ? Te.error(`FileListAction with id "${e.id}" is already registered`, { action: e }) : (a.fileListActions.set(e.id, e), De().dispatchTypedEvent("register:listAction", new CustomEvent("register:listAction", { detail: e })));
}
function Ln(e) {
	if (!e.id || typeof e.id != "string") throw Error("Invalid id");
	if (!e.displayName || typeof e.displayName != "function") throw Error("Invalid displayName function");
	if ("iconSvgInline" in e && typeof e.iconSvgInline != "function") throw Error("Invalid iconSvgInline function");
	if ("order" in e && typeof e.order != "number") throw Error("Invalid order");
	if ("enabled" in e && typeof e.enabled != "function") throw Error("Invalid enabled function");
	if (!e.exec || typeof e.exec != "function") throw Error("Invalid exec function");
}
// node_modules/@nextcloud/files/dist/ui/headers/listHeaders.mjs
function Rn(e) {
	zn(e), a.fileListHeaders ??= /* @__PURE__ */ new Map(), a.fileListHeaders.has(e.id) ? Te.error(`Header ${e.id} already registered`, { header: e }) : (a.fileListHeaders.set(e.id, e), De().dispatchTypedEvent("register:listHeader", new CustomEvent("register:listHeader", { detail: e })));
}
function zn(e) {
	if (!e.id || !e.render || !e.updated) throw Error("Invalid header: id, render and updated are required");
	if (typeof e.id != "string") throw Error("Invalid id property");
	if (e.enabled !== void 0 && typeof e.enabled != "function") throw Error("Invalid enabled property");
	if (e.render && typeof e.render != "function") throw Error("Invalid render property");
	if (e.updated && typeof e.updated != "function") throw Error("Invalid updated property");
}
export { j as A, S as B, je as C, Oe as D, P as E, ve as F, n as G, v as H, D as I, oe as L, Se as M, ue as N, Ae as O, pe as P, b as R, Fe as S, Pe as T, re as U, y as V, a as W, ln as _, jn as a, X as b, wn as c, yn as d, vn as f, pn as g, Z as h, Pn as i, fe as j, ke as k, xn as l, cn as m, $ as n, Cn as o, mn as p, In as r, Sn as s, Rn as t, bn as u, dn as v, Ne as w, Be as x, fn as y, x as z };
