const vt = Object.freeze({
  /**
   * No permissions granted
   */
  NONE: 0,
  /**
   * Can read the file content
   */
  READ: 1,
  /**
   * Can modify the file itself (move, rename, etc)
   */
  UPDATE: 2,
  /**
   * Can create new files/folders inside a folder
   */
  CREATE: 4,
  /**
   * Can change the file content
   */
  WRITE: 4,
  /**
   * Can delete the node
   */
  DELETE: 8,
  /**
   * Can share the node
   */
  SHARE: 16,
  /**
   * All permissions are granted
   */
  ALL: 31
});
function te(e, t, o) {
  if (typeof e[t] < "u")
    if (o === "array") {
      if (!Array.isArray(e[t]))
        throw new Error(`View ${t} must be an array`);
    } else {
      if (typeof e[t] !== o)
        throw new Error(`View ${t} must be a ${o}`);
      if (o === "object" && (e[t] === null || Array.isArray(e[t])))
        throw new Error(`View ${t} must be an object`);
    }
}
function wr(e) {
  if (typeof e != "object" || e === null)
    throw new Error("View column must be an object");
  if (!e.id || typeof e.id != "string")
    throw new Error("A column id is required");
  if (!e.title || typeof e.title != "string")
    throw new Error("A column title is required");
  if (!e.render || typeof e.render != "function")
    throw new Error("A render function is required");
  te(e, "sort", "function"), te(e, "summary", "function");
}
window._nc_files_scope ??= {};
window._nc_files_scope.v4_0 ??= {};
const ne = window._nc_files_scope.v4_0;
var es = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ot(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Ar(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var t = e.default;
  if (typeof t == "function") {
    var o = function c() {
      var f = !1;
      try {
        f = this instanceof c;
      } catch {
      }
      return f ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    o.prototype = t.prototype;
  } else o = {};
  return Object.defineProperty(o, "__esModule", { value: !0 }), Object.keys(e).forEach(function(c) {
    var f = Object.getOwnPropertyDescriptor(e, c);
    Object.defineProperty(o, c, f.get ? f : {
      enumerable: !0,
      get: function() {
        return e[c];
      }
    });
  }), o;
}
var Jt, ti;
function Fi() {
  return ti || (ti = 1, Jt = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {
  }), Jt;
}
var en, ni;
function Ui() {
  if (ni) return en;
  ni = 1;
  const e = "2.0.0", t = 256, o = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, c = 16, f = t - 6;
  return en = {
    MAX_LENGTH: t,
    MAX_SAFE_COMPONENT_LENGTH: c,
    MAX_SAFE_BUILD_LENGTH: f,
    MAX_SAFE_INTEGER: o,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: e,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, en;
}
var yt = { exports: {} }, ii;
function yr() {
  return ii || (ii = 1, (function(e, t) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: o,
      MAX_SAFE_BUILD_LENGTH: c,
      MAX_LENGTH: f
    } = Ui(), g = Fi();
    t = e.exports = {};
    const T = t.re = [], y = t.safeRe = [], m = t.src = [], v = t.safeSrc = [], u = t.t = {};
    let _ = 0;
    const I = "[a-zA-Z0-9-]", O = [
      ["\\s", 1],
      ["\\d", f],
      [I, c]
    ], x = (q) => {
      for (const [U, Z] of O)
        q = q.split(`${U}*`).join(`${U}{0,${Z}}`).split(`${U}+`).join(`${U}{1,${Z}}`);
      return q;
    }, w = (q, U, Z) => {
      const pe = x(U), $ = _++;
      g(q, $, U), u[q] = $, m[$] = U, v[$] = pe, T[$] = new RegExp(U, Z ? "g" : void 0), y[$] = new RegExp(pe, Z ? "g" : void 0);
    };
    w("NUMERICIDENTIFIER", "0|[1-9]\\d*"), w("NUMERICIDENTIFIERLOOSE", "\\d+"), w("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${I}*`), w("MAINVERSION", `(${m[u.NUMERICIDENTIFIER]})\\.(${m[u.NUMERICIDENTIFIER]})\\.(${m[u.NUMERICIDENTIFIER]})`), w("MAINVERSIONLOOSE", `(${m[u.NUMERICIDENTIFIERLOOSE]})\\.(${m[u.NUMERICIDENTIFIERLOOSE]})\\.(${m[u.NUMERICIDENTIFIERLOOSE]})`), w("PRERELEASEIDENTIFIER", `(?:${m[u.NONNUMERICIDENTIFIER]}|${m[u.NUMERICIDENTIFIER]})`), w("PRERELEASEIDENTIFIERLOOSE", `(?:${m[u.NONNUMERICIDENTIFIER]}|${m[u.NUMERICIDENTIFIERLOOSE]})`), w("PRERELEASE", `(?:-(${m[u.PRERELEASEIDENTIFIER]}(?:\\.${m[u.PRERELEASEIDENTIFIER]})*))`), w("PRERELEASELOOSE", `(?:-?(${m[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${m[u.PRERELEASEIDENTIFIERLOOSE]})*))`), w("BUILDIDENTIFIER", `${I}+`), w("BUILD", `(?:\\+(${m[u.BUILDIDENTIFIER]}(?:\\.${m[u.BUILDIDENTIFIER]})*))`), w("FULLPLAIN", `v?${m[u.MAINVERSION]}${m[u.PRERELEASE]}?${m[u.BUILD]}?`), w("FULL", `^${m[u.FULLPLAIN]}$`), w("LOOSEPLAIN", `[v=\\s]*${m[u.MAINVERSIONLOOSE]}${m[u.PRERELEASELOOSE]}?${m[u.BUILD]}?`), w("LOOSE", `^${m[u.LOOSEPLAIN]}$`), w("GTLT", "((?:<|>)?=?)"), w("XRANGEIDENTIFIERLOOSE", `${m[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), w("XRANGEIDENTIFIER", `${m[u.NUMERICIDENTIFIER]}|x|X|\\*`), w("XRANGEPLAIN", `[v=\\s]*(${m[u.XRANGEIDENTIFIER]})(?:\\.(${m[u.XRANGEIDENTIFIER]})(?:\\.(${m[u.XRANGEIDENTIFIER]})(?:${m[u.PRERELEASE]})?${m[u.BUILD]}?)?)?`), w("XRANGEPLAINLOOSE", `[v=\\s]*(${m[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${m[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${m[u.XRANGEIDENTIFIERLOOSE]})(?:${m[u.PRERELEASELOOSE]})?${m[u.BUILD]}?)?)?`), w("XRANGE", `^${m[u.GTLT]}\\s*${m[u.XRANGEPLAIN]}$`), w("XRANGELOOSE", `^${m[u.GTLT]}\\s*${m[u.XRANGEPLAINLOOSE]}$`), w("COERCEPLAIN", `(^|[^\\d])(\\d{1,${o}})(?:\\.(\\d{1,${o}}))?(?:\\.(\\d{1,${o}}))?`), w("COERCE", `${m[u.COERCEPLAIN]}(?:$|[^\\d])`), w("COERCEFULL", m[u.COERCEPLAIN] + `(?:${m[u.PRERELEASE]})?(?:${m[u.BUILD]})?(?:$|[^\\d])`), w("COERCERTL", m[u.COERCE], !0), w("COERCERTLFULL", m[u.COERCEFULL], !0), w("LONETILDE", "(?:~>?)"), w("TILDETRIM", `(\\s*)${m[u.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", w("TILDE", `^${m[u.LONETILDE]}${m[u.XRANGEPLAIN]}$`), w("TILDELOOSE", `^${m[u.LONETILDE]}${m[u.XRANGEPLAINLOOSE]}$`), w("LONECARET", "(?:\\^)"), w("CARETTRIM", `(\\s*)${m[u.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", w("CARET", `^${m[u.LONECARET]}${m[u.XRANGEPLAIN]}$`), w("CARETLOOSE", `^${m[u.LONECARET]}${m[u.XRANGEPLAINLOOSE]}$`), w("COMPARATORLOOSE", `^${m[u.GTLT]}\\s*(${m[u.LOOSEPLAIN]})$|^$`), w("COMPARATOR", `^${m[u.GTLT]}\\s*(${m[u.FULLPLAIN]})$|^$`), w("COMPARATORTRIM", `(\\s*)${m[u.GTLT]}\\s*(${m[u.LOOSEPLAIN]}|${m[u.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", w("HYPHENRANGE", `^\\s*(${m[u.XRANGEPLAIN]})\\s+-\\s+(${m[u.XRANGEPLAIN]})\\s*$`), w("HYPHENRANGELOOSE", `^\\s*(${m[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${m[u.XRANGEPLAINLOOSE]})\\s*$`), w("STAR", "(<|>)?=?\\s*\\*"), w("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), w("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(yt, yt.exports)), yt.exports;
}
var tn, ri;
function br() {
  if (ri) return tn;
  ri = 1;
  const e = Object.freeze({ loose: !0 }), t = Object.freeze({});
  return tn = (c) => c ? typeof c != "object" ? e : c : t, tn;
}
var nn, oi;
function Ir() {
  if (oi) return nn;
  oi = 1;
  const e = /^[0-9]+$/, t = (c, f) => {
    if (typeof c == "number" && typeof f == "number")
      return c === f ? 0 : c < f ? -1 : 1;
    const g = e.test(c), T = e.test(f);
    return g && T && (c = +c, f = +f), c === f ? 0 : g && !T ? -1 : T && !g ? 1 : c < f ? -1 : 1;
  };
  return nn = {
    compareIdentifiers: t,
    rcompareIdentifiers: (c, f) => t(f, c)
  }, nn;
}
var rn, si;
function ki() {
  if (si) return rn;
  si = 1;
  const e = Fi(), { MAX_LENGTH: t, MAX_SAFE_INTEGER: o } = Ui(), { safeRe: c, t: f } = yr(), g = br(), { compareIdentifiers: T } = Ir(), y = (v, u) => {
    const _ = u.split(".");
    if (_.length > v.length)
      return !1;
    for (let I = 0; I < _.length; I++)
      if (T(v[I], _[I]) !== 0)
        return !1;
    return !0;
  };
  class m {
    constructor(u, _) {
      if (_ = g(_), u instanceof m) {
        if (u.loose === !!_.loose && u.includePrerelease === !!_.includePrerelease)
          return u;
        u = u.version;
      } else if (typeof u != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof u}".`);
      if (u.length > t)
        throw new TypeError(
          `version is longer than ${t} characters`
        );
      e("SemVer", u, _), this.options = _, this.loose = !!_.loose, this.includePrerelease = !!_.includePrerelease;
      const I = u.trim().match(_.loose ? c[f.LOOSE] : c[f.FULL]);
      if (!I)
        throw new TypeError(`Invalid Version: ${u}`);
      if (this.raw = u, this.major = +I[1], this.minor = +I[2], this.patch = +I[3], this.major > o || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > o || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > o || this.patch < 0)
        throw new TypeError("Invalid patch version");
      I[4] ? this.prerelease = I[4].split(".").map((O) => {
        if (/^[0-9]+$/.test(O)) {
          const x = +O;
          if (x >= 0 && x < o)
            return x;
        }
        return O;
      }) : this.prerelease = [], this.build = I[5] ? I[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(u) {
      if (e("SemVer.compare", this.version, this.options, u), !(u instanceof m)) {
        if (typeof u == "string" && u === this.version)
          return 0;
        u = new m(u, this.options);
      }
      return u.version === this.version ? 0 : this.compareMain(u) || this.comparePre(u);
    }
    compareMain(u) {
      return u instanceof m || (u = new m(u, this.options)), this.major < u.major ? -1 : this.major > u.major ? 1 : this.minor < u.minor ? -1 : this.minor > u.minor ? 1 : this.patch < u.patch ? -1 : this.patch > u.patch ? 1 : 0;
    }
    comparePre(u) {
      if (u instanceof m || (u = new m(u, this.options)), this.prerelease.length && !u.prerelease.length)
        return -1;
      if (!this.prerelease.length && u.prerelease.length)
        return 1;
      if (!this.prerelease.length && !u.prerelease.length)
        return 0;
      let _ = 0;
      do {
        const I = this.prerelease[_], O = u.prerelease[_];
        if (e("prerelease compare", _, I, O), I === void 0 && O === void 0)
          return 0;
        if (O === void 0)
          return 1;
        if (I === void 0)
          return -1;
        if (I === O)
          continue;
        return T(I, O);
      } while (++_);
    }
    compareBuild(u) {
      u instanceof m || (u = new m(u, this.options));
      let _ = 0;
      do {
        const I = this.build[_], O = u.build[_];
        if (e("build compare", _, I, O), I === void 0 && O === void 0)
          return 0;
        if (O === void 0)
          return 1;
        if (I === void 0)
          return -1;
        if (I === O)
          continue;
        return T(I, O);
      } while (++_);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(u, _, I) {
      if (u.startsWith("pre")) {
        if (!_ && I === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (_) {
          const O = `-${_}`.match(this.options.loose ? c[f.PRERELEASELOOSE] : c[f.PRERELEASE]);
          if (!O || O[1] !== _)
            throw new Error(`invalid identifier: ${_}`);
        }
      }
      switch (u) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", _, I);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", _, I);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", _, I), this.inc("pre", _, I);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", _, I), this.inc("pre", _, I);
          break;
        case "release":
          if (this.prerelease.length === 0)
            throw new Error(`version ${this.raw} is not a prerelease`);
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
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const O = Number(I) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [O];
          else {
            let x = this.prerelease.length;
            for (; --x >= 0; )
              typeof this.prerelease[x] == "number" && (this.prerelease[x]++, x = -2);
            if (x === -1) {
              if (_ === this.prerelease.join(".") && I === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(O);
            }
          }
          if (_) {
            let x = [_, O];
            if (I === !1 && (x = [_]), y(this.prerelease, _)) {
              const w = this.prerelease[_.split(".").length];
              isNaN(w) && (this.prerelease = x);
            } else
              this.prerelease = x;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${u}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return rn = m, rn;
}
var on, ai;
function Nr() {
  if (ai) return on;
  ai = 1;
  const e = ki();
  return on = (o, c) => new e(o, c).major, on;
}
var vr = Nr();
const ci = /* @__PURE__ */ Ot(vr);
var sn, li;
function Sr() {
  if (li) return sn;
  li = 1;
  const e = ki();
  return sn = (o, c, f = !1) => {
    if (o instanceof e)
      return o;
    try {
      return new e(o, c);
    } catch (g) {
      if (!f)
        return null;
      throw g;
    }
  }, sn;
}
var an, ui;
function Or() {
  if (ui) return an;
  ui = 1;
  const e = Sr();
  return an = (o, c) => {
    const f = e(o, c);
    return f ? f.version : null;
  }, an;
}
var Rr = Or();
const Dr = /* @__PURE__ */ Ot(Rr);
class Lr {
  bus;
  constructor(t) {
    typeof t.getVersion != "function" || !Dr(t.getVersion()) ? console.warn("Proxying an event bus with an unknown or invalid version") : ci(t.getVersion()) !== ci(this.getVersion()) && console.warn(
      "Proxying an event bus of version " + t.getVersion() + " with " + this.getVersion()
    ), this.bus = t;
  }
  getVersion() {
    return "3.3.3";
  }
  subscribe(t, o) {
    this.bus.subscribe(t, o);
  }
  unsubscribe(t, o) {
    this.bus.unsubscribe(t, o);
  }
  emit(t, ...o) {
    this.bus.emit(t, ...o);
  }
}
class Cr {
  handlers = /* @__PURE__ */ new Map();
  getVersion() {
    return "3.3.3";
  }
  subscribe(t, o) {
    this.handlers.set(
      t,
      (this.handlers.get(t) || []).concat(
        o
      )
    );
  }
  unsubscribe(t, o) {
    this.handlers.set(
      t,
      (this.handlers.get(t) || []).filter((c) => c !== o)
    );
  }
  emit(t, ...o) {
    (this.handlers.get(t) || []).forEach((f) => {
      try {
        f(o[0]);
      } catch (g) {
        console.error("could not invoke event listener", g);
      }
    });
  }
}
let it = null;
function Nn() {
  return it !== null ? it : typeof window > "u" ? new Proxy({}, {
    get: () => () => console.error(
      "Window not available, EventBus can not be established!"
    )
  }) : (window.OC?._eventBus && typeof window._nc_event_bus > "u" && (console.warn(
    "found old event bus instance at OC._eventBus. Update your version!"
  ), window._nc_event_bus = window.OC._eventBus), typeof window?._nc_event_bus < "u" ? it = new Lr(window._nc_event_bus) : it = window._nc_event_bus = new Cr(), it);
}
function vn(e, t) {
  Nn().subscribe(e, t);
}
function xr(e, t) {
  Nn().unsubscribe(e, t);
}
function $i(e, ...t) {
  Nn().emit(e, ...t);
}
const Mr = (e) => "/remote.php/" + e;
function ts(e, t) {
  return Bi(t), Fr() + Mr(e);
}
function fi(e, t, o) {
  const c = { escape: !0 }, f = function(g, T) {
    return T = T || {}, g.replace(/{([^{}]*)}/g, function(y, m) {
      const v = T[m];
      return c.escape ? encodeURIComponent(typeof v == "string" || typeof v == "number" ? v.toString() : y) : typeof v == "string" || typeof v == "number" ? v.toString() : y;
    });
  };
  return e.charAt(0) !== "/" && (e = "/" + e), f(e, t || {});
}
function Pr(e, t, o) {
  const c = { noRewrite: !1 };
  Bi(c);
  const f = Sn();
  return !c.noRewrite && typeof window < "u" && window.OC?.config?.modRewriteWorking === !0 ? f + fi(e, t) : f + "/index.php" + fi(e, t);
}
function ns(e, t) {
  return t.includes(".") ? di(e, "img", t) : di(e, "img", `${t}.svg`);
}
function di(e, t, o) {
  Rt();
  const c = window.OC?.coreApps?.includes(e) ?? !1, f = o.slice(-3) === "php";
  let g = Sn();
  return f && !c ? (g += `/index.php/apps/${e}`, t && (g += `/${encodeURI(t)}`), o !== "index.php" && (g += `/${o}`)) : !f && !c ? (g = Ur(e), t && (g += `/${t}/`), g.at(-1) !== "/" && (g += "/"), g += o) : (g += `/${e}`, t && (g += `/${t}`), g += `/${o}`), g;
}
function Fr() {
  return Rt(), window.location.protocol + "//" + window.location.host + Sn();
}
function Sn() {
  Rt();
  let e = window._oc_webroot;
  if (typeof e > "u") {
    e = location.pathname;
    const t = e.indexOf("/index.php/");
    if (t !== -1)
      e = e.slice(0, t);
    else {
      const o = e.indexOf("/", 1);
      e = e.slice(0, o > 0 ? o : void 0);
    }
  }
  return e;
}
function Ur(e) {
  return Rt(), (window._oc_appswebroots ?? {})[e] ?? "";
}
function Rt() {
  if (typeof window > "u")
    throw new Error("This function is only available in a DOM environment");
}
function Bi(e) {
  if (typeof window > "u" && !e?.baseURL)
    throw new Error("This function requires baseURL option to be provided in non-DOM environments");
}
class St {
  static GLOBAL_SCOPE_VOLATILE = "nextcloud_vol";
  static GLOBAL_SCOPE_PERSISTENT = "nextcloud_per";
  scope;
  wrapped;
  constructor(t, o, c) {
    this.scope = `${c ? St.GLOBAL_SCOPE_PERSISTENT : St.GLOBAL_SCOPE_VOLATILE}_${btoa(t)}_`, this.wrapped = o;
  }
  scopeKey(t) {
    return `${this.scope}${t}`;
  }
  setItem(t, o) {
    this.wrapped.setItem(this.scopeKey(t), o);
  }
  getItem(t) {
    return this.wrapped.getItem(this.scopeKey(t));
  }
  removeItem(t) {
    this.wrapped.removeItem(this.scopeKey(t));
  }
  clear() {
    Object.keys(this.wrapped).filter((t) => t.startsWith(this.scope)).map(this.wrapped.removeItem.bind(this.wrapped));
  }
}
class kr {
  appId;
  persisted = !1;
  clearedOnLogout = !1;
  constructor(t) {
    this.appId = t;
  }
  persist(t = !0) {
    return this.persisted = t, this;
  }
  clearOnLogout(t = !0) {
    return this.clearedOnLogout = t, this;
  }
  build() {
    return new St(this.appId, this.persisted ? window.localStorage : window.sessionStorage, !this.clearedOnLogout);
  }
}
function $r(e) {
  return new kr(e);
}
Br();
function is() {
  return globalThis._nc_auth_requestToken ? globalThis._nc_auth_requestToken : globalThis.document ? document.head.dataset.requesttoken ?? null : null;
}
function Gi(e) {
  if (!e || typeof e != "string")
    throw new Error("Invalid CSRF token given", { cause: { token: e } });
  globalThis._nc_auth_requestToken !== e && (globalThis._nc_auth_requestToken = e, globalThis.document && (document.head.dataset.requesttoken = e), $i("csrf-token-update", { token: e, _internal: !0 }));
}
async function rs() {
  const e = Pr("/csrftoken"), t = await fetch(e);
  if (!t.ok)
    throw new Error("Could not fetch CSRF token from API", { cause: t });
  try {
    const { token: o } = await t.json();
    return Gi(o), o;
  } catch (o) {
    throw new Error("Could not parse CSRF token from API response", { cause: o });
  }
}
function os(e) {
  const t = async ({ token: o }) => {
    try {
      e(o);
    } catch (c) {
      console.error("Error updating CSRF token observer", c);
    }
  };
  return vn("csrf-token-update", t), () => xr("csrf-token-update", t);
}
function Br() {
  vn("csrf-token-update", ({ token: e, _internal: t }) => {
    t || Gi(e);
  });
}
const Ge = $r("public").persist().build();
class Gr {
  _displayName;
  uid;
  isAdmin;
  constructor() {
    Ge.getItem("guestUid") || Ge.setItem("guestUid", mi()), this._displayName = Ge.getItem("guestNickname") || "", this.uid = Ge.getItem("guestUid") || mi(), this.isAdmin = !1, vn("user:info:changed", (t) => {
      this._displayName = t.displayName, Ge.setItem("guestNickname", t.displayName || "");
    });
  }
  get displayName() {
    return this._displayName;
  }
  set displayName(t) {
    this._displayName = t, Ge.setItem("guestNickname", t), $i("user:info:changed", this);
  }
}
let cn;
function zr() {
  return cn || (cn = new Gr()), cn;
}
function ss(e) {
  if (!e || e.trim().length === 0)
    throw new Error("Nickname cannot be empty");
  zr().displayName = e;
}
function mi() {
  return globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
    const t = Math.random() * 16 | 0;
    return (e === "x" ? t : t & 3 | 8).toString(16);
  });
}
let ze;
function pi(e, t) {
  return e ? e.getAttribute(t) : null;
}
function jr() {
  if (ze !== void 0)
    return ze;
  const e = document?.getElementsByTagName("head")[0];
  if (!e)
    return null;
  const t = pi(e, "data-user");
  return t === null ? (ze = null, ze) : (ze = {
    uid: t,
    displayName: pi(e, "data-user-displayname"),
    isAdmin: !!window._oc_isadmin
  }, ze);
}
var H = /* @__PURE__ */ ((e) => (e[e.Debug = 0] = "Debug", e[e.Info = 1] = "Info", e[e.Warn = 2] = "Warn", e[e.Error = 3] = "Error", e[e.Fatal = 4] = "Fatal", e))(H || {});
class Vr {
  context;
  constructor(t) {
    this.context = t || {};
  }
  formatMessage(t, o, c) {
    let f = "[" + H[o].toUpperCase() + "] ";
    return c && c.app && (f += c.app + ": "), typeof t == "string" ? f + t : (f += `Unexpected ${t.name}`, t.message && (f += ` "${t.message}"`), o === H.Debug && t.stack && (f += `

Stack trace:
${t.stack}`), f);
  }
  log(t, o, c) {
    if (!(typeof this.context?.level == "number" && t < this.context?.level))
      switch (typeof o == "object" && c?.error === void 0 && (c.error = o), t) {
        case H.Debug:
          console.debug(this.formatMessage(o, H.Debug, c), c);
          break;
        case H.Info:
          console.info(this.formatMessage(o, H.Info, c), c);
          break;
        case H.Warn:
          console.warn(this.formatMessage(o, H.Warn, c), c);
          break;
        case H.Error:
          console.error(this.formatMessage(o, H.Error, c), c);
          break;
        case H.Fatal:
        default:
          console.error(this.formatMessage(o, H.Fatal, c), c);
          break;
      }
  }
  debug(t, o) {
    this.log(H.Debug, t, Object.assign({}, this.context, o));
  }
  info(t, o) {
    this.log(H.Info, t, Object.assign({}, this.context, o));
  }
  warn(t, o) {
    this.log(H.Warn, t, Object.assign({}, this.context, o));
  }
  error(t, o) {
    this.log(H.Error, t, Object.assign({}, this.context, o));
  }
  fatal(t, o) {
    this.log(H.Fatal, t, Object.assign({}, this.context, o));
  }
}
function Hr(e) {
  return new Vr(e);
}
class Xr {
  context;
  factory;
  constructor(t) {
    this.context = {}, this.factory = t;
  }
  /**
   * Set the app name within the logging context
   *
   * @param appId App name
   */
  setApp(t) {
    return this.context.app = t, this;
  }
  /**
   * Set the logging level within the logging context
   *
   * @param level Logging level
   */
  setLogLevel(t) {
    return this.context.level = t, this;
  }
  /* eslint-disable jsdoc/no-undefined-types */
  /**
   * Set the user id within the logging context
   * @param uid User ID
   * @see {@link detectUser}
   */
  /* eslint-enable jsdoc/no-undefined-types */
  setUid(t) {
    return this.context.uid = t, this;
  }
  /**
   * Detect the currently logged in user and set the user id within the logging context
   */
  detectUser() {
    const t = jr();
    return t !== null && (this.context.uid = t.uid), this;
  }
  /**
   * Detect and use logging level configured in nextcloud config
   */
  detectLogLevel() {
    const t = this, o = () => {
      document.readyState === "complete" || document.readyState === "interactive" ? (t.context.level = window._oc_config?.loglevel ?? H.Warn, window._oc_debug && (t.context.level = H.Debug), document.removeEventListener("readystatechange", o)) : document.addEventListener("readystatechange", o);
    };
    return o(), this;
  }
  /** Build a logger using the logging context and factory */
  build() {
    return this.context.level === void 0 && this.detectLogLevel(), this.factory(this.context);
  }
}
function qr() {
  return new Xr(Hr);
}
const On = qr().setApp("@nextcloud/files").detectUser().build();
var zi = class extends EventTarget {
  dispatchTypedEvent(e, t) {
    return super.dispatchEvent(t);
  }
};
class Wr extends zi {
}
function Rn() {
  return ne.registry ??= new Wr(), ne.registry;
}
const Yr = Object.freeze({
  DEFAULT: "default",
  HIDDEN: "hidden"
});
function as(e) {
  if (Kr(e), ne.fileActions ??= /* @__PURE__ */ new Map(), ne.fileActions.has(e.id)) {
    On.error(`FileAction ${e.id} already registered`, { action: e });
    return;
  }
  ne.fileActions.set(e.id, e), Rn().dispatchTypedEvent("register:action", new CustomEvent("register:action", { detail: e }));
}
function cs() {
  return ne.fileActions ? [...ne.fileActions.values()] : [];
}
function Kr(e) {
  if (!e.id || typeof e.id != "string")
    throw new Error("Invalid id");
  if (!e.displayName || typeof e.displayName != "function")
    throw new Error("Invalid displayName function");
  if ("title" in e && typeof e.title != "function")
    throw new Error("Invalid title function");
  if (!e.iconSvgInline || typeof e.iconSvgInline != "function")
    throw new Error("Invalid iconSvgInline function");
  if (!e.exec || typeof e.exec != "function")
    throw new Error("Invalid exec function");
  if ("enabled" in e && typeof e.enabled != "function")
    throw new Error("Invalid enabled function");
  if ("execBatch" in e && typeof e.execBatch != "function")
    throw new Error("Invalid execBatch function");
  if ("order" in e && typeof e.order != "number")
    throw new Error("Invalid order");
  if (e.destructive !== void 0 && typeof e.destructive != "boolean")
    throw new Error("Invalid destructive flag");
  if ("parent" in e && typeof e.parent != "string")
    throw new Error("Invalid parent");
  if (e.default && !Object.values(Yr).includes(e.default))
    throw new Error("Invalid default");
  if ("inline" in e && typeof e.inline != "function")
    throw new Error("Invalid inline function");
  if ("renderInline" in e && typeof e.renderInline != "function")
    throw new Error("Invalid renderInline function");
  if ("hotkey" in e && e.hotkey !== void 0) {
    if (typeof e.hotkey != "object")
      throw new Error("Invalid hotkey configuration");
    if (typeof e.hotkey.key != "string" || !e.hotkey.key)
      throw new Error("Missing or invalid hotkey key");
    if (typeof e.hotkey.description != "string" || !e.hotkey.description)
      throw new Error("Missing or invalid hotkey description");
  }
}
const Dn = Object.freeze({
  Folder: "folder",
  File: "file"
});
function hi(e) {
  return e && e.split("/").map(encodeURIComponent).join("/");
}
function ji(e, t) {
  return e = e.replace(/\\/g, "/").replace(/\/+$/g, "").replace(/.*\//, ""), e;
}
function Ei(e) {
  e = e.replaceAll(/\\/g, "/");
  const t = e.split("/");
  return t.length <= 1 ? "." : (t.pop(), t.length === 1 && t[0] === "" ? "/" : t.join("/"));
}
function Qr(e) {
  const t = ji(e), o = t.lastIndexOf(".");
  return o > 0 ? t.substring(o) : "";
}
function Zr(...e) {
  if (arguments.length < 1)
    return "";
  const t = e.filter((m) => m.length > 0);
  if (t.length < 1)
    return "";
  const o = t[t.length - 1], c = t[0].charAt(0) === "/", f = o.charAt(o.length - 1) === "/", g = t.reduce((m, v) => m.concat(v.split("/")), []);
  let T = !c;
  const y = g.reduce((m, v) => v === "" ? m : T ? (T = !1, m + v) : m + "/" + v, "");
  return f ? y + "/" : y;
}
const Jr = Object.freeze({
  /** This is a new node and it doesn't exists on the filesystem yet */
  NEW: "new",
  /** This node has failed and is unavailable  */
  FAILED: "failed",
  /** This node is currently loading or have an operation in progress */
  LOADING: "loading",
  /** This node is locked and cannot be modified */
  LOCKED: "locked"
});
function Vi(e, t) {
  return e.match(t) !== null;
}
function be(e, t) {
  if (e.id && typeof e.id != "number" && typeof e.id != "string")
    throw new Error("Invalid id type of value");
  if (!e.source)
    throw new Error("Missing mandatory source");
  try {
    new URL(e.source);
  } catch {
    throw new Error("Invalid source format, source must be a valid URL");
  }
  if (!e.source.startsWith("http"))
    throw new Error("Invalid source format, only http(s) is supported");
  if (!e.root)
    throw new Error("Missing mandatory root");
  if (typeof e.root != "string")
    throw new Error("Invalid root type");
  if (!e.root.startsWith("/"))
    throw new Error("Root must start with a leading slash");
  if (!e.source.includes(e.root))
    throw new Error("Root must be part of the source");
  if (Vi(e.source, t)) {
    const o = e.source.match(t)[0];
    if (!e.source.includes(Zr(o, e.root)))
      throw new Error("The root must be relative to the service. e.g /files/emma");
  }
  if (e.displayname && typeof e.displayname != "string")
    throw new Error("Invalid displayname type");
  if (e.mtime && !(e.mtime instanceof Date))
    throw new Error("Invalid mtime type");
  if (e.crtime && !(e.crtime instanceof Date))
    throw new Error("Invalid crtime type");
  if (!e.mime || typeof e.mime != "string" || !e.mime.match(/^[-\w.]+\/[-+\w.]+$/gi))
    throw new Error("Missing or invalid mandatory mime");
  if ("size" in e && typeof e.size != "number" && e.size !== void 0)
    throw new Error("Invalid size type");
  if ("permissions" in e && e.permissions !== void 0 && !(typeof e.permissions == "number" && e.permissions >= vt.NONE && e.permissions <= vt.ALL))
    throw new Error("Invalid permissions");
  if (e.owner && e.owner !== null && typeof e.owner != "string")
    throw new Error("Invalid owner type");
  if (e.attributes && typeof e.attributes != "object")
    throw new Error("Invalid attributes type");
  if (e.status && !Object.values(Jr).includes(e.status))
    throw new Error("Status must be a valid NodeStatus");
}
function eo(e) {
  e.mtime && typeof e.mtime == "string" && !isNaN(Date.parse(e.mtime)) && JSON.stringify(new Date(e.mtime)) === JSON.stringify(e.mtime) && (e.mtime = new Date(e.mtime)), e.crtime && typeof e.crtime == "string" && !isNaN(Date.parse(e.crtime)) && JSON.stringify(new Date(e.crtime)) === JSON.stringify(e.crtime) && (e.crtime = new Date(e.crtime));
}
function to(e) {
  if (e instanceof RegExp)
    return e;
  const t = e.match(/(\/?)(.+)\1([a-z]*)/i);
  if (!t)
    throw new Error("Invalid regular expression format.");
  const o = Array.from(new Set(t[3])).filter((c) => "gimsuy".includes(c)).join("");
  return new RegExp(t[2], o);
}
class Dt {
  _attributes;
  _data;
  _knownDavService = /(remote|public)\.php\/(web)?dav/i;
  readonlyAttributes = Object.entries(Object.getOwnPropertyDescriptors(Dt.prototype)).filter((t) => typeof t[1].get == "function" && t[0] !== "__proto__").map((t) => t[0]);
  handler = {
    set: (t, o, c) => this.readonlyAttributes.includes(o) ? !1 : Reflect.set(t, o, c),
    deleteProperty: (t, o) => this.readonlyAttributes.includes(o) ? !1 : Reflect.deleteProperty(t, o)
  };
  constructor(...[t, o]) {
    t.mime || (t.mime = "application/octet-stream"), eo(t), o = to(o || this._knownDavService), be(t, o), this._data = {
      ...t,
      attributes: {}
    }, this._attributes = new Proxy(this._data.attributes, this.handler), this.update(t.attributes ?? {}), o && (this._knownDavService = o);
  }
  /**
   * Get the source url to this object
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get source() {
    return this._data.source.replace(/\/$/i, "");
  }
  /**
   * Get the encoded source url to this object for requests purposes
   */
  get encodedSource() {
    const { origin: t } = new URL(this.source);
    return t + hi(this.source.slice(t.length));
  }
  /**
   * Get this object name
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get basename() {
    return ji(this.source);
  }
  /**
   * The nodes displayname
   * By default the display name and the `basename` are identical,
   * but it is possible to have a different name. This happens
   * on the files app for example for shared folders.
   */
  get displayname() {
    return this._data.displayname || this.basename;
  }
  /**
   * Set the displayname
   */
  set displayname(t) {
    be({ ...this._data, displayname: t }, this._knownDavService), this._data.displayname = t;
  }
  /**
   * Get this object's extension
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get extension() {
    return Qr(this.source);
  }
  /**
   * Get the directory path leading to this object
   * Will use the relative path to root if available
   *
   * There is no setter as the source is not meant to be changed manually.
   * You can use the rename or move method to change the source.
   */
  get dirname() {
    return Ei(this.path);
  }
  /**
   * Get the file mime
   */
  get mime() {
    return this._data.mime || "application/octet-stream";
  }
  /**
   * Set the file mime
   * Removing the mime type will set it to `application/octet-stream`
   */
  set mime(t) {
    t ??= "application/octet-stream", be({ ...this._data, mime: t }, this._knownDavService), this._data.mime = t;
  }
  /**
   * Get the file modification time
   */
  get mtime() {
    return this._data.mtime;
  }
  /**
   * Set the file modification time
   */
  set mtime(t) {
    be({ ...this._data, mtime: t }, this._knownDavService), this._data.mtime = t;
  }
  /**
   * Get the file creation time
   * There is no setter as the creation time is not meant to be changed
   */
  get crtime() {
    return this._data.crtime;
  }
  /**
   * Get the file size
   */
  get size() {
    return this._data.size;
  }
  /**
   * Set the file size
   */
  set size(t) {
    be({ ...this._data, size: t }, this._knownDavService), this.updateMtime(), this._data.size = t;
  }
  /**
   * Get the file attribute
   * This contains all additional attributes not provided by the Node class
   */
  get attributes() {
    return this._attributes;
  }
  /**
   * Get the file permissions
   */
  get permissions() {
    return this.owner === null && !this.isDavResource ? vt.READ : this._data.permissions !== void 0 ? this._data.permissions : vt.NONE;
  }
  /**
   * Set the file permissions
   */
  set permissions(t) {
    be({ ...this._data, permissions: t }, this._knownDavService), this.updateMtime(), this._data.permissions = t;
  }
  /**
   * Get the file owner
   * There is no setter as the owner is not meant to be changed
   */
  get owner() {
    return this.isDavResource ? this._data.owner : null;
  }
  /**
   * Is this a dav-related resource ?
   */
  get isDavResource() {
    return Vi(this.source, this._knownDavService);
  }
  /**
   * Get the dav root of this object
   * There is no setter as the root is not meant to be changed
   */
  get root() {
    return this._data.root.replace(/^(.+)\/$/, "$1");
  }
  /**
   * Get the absolute path of this object relative to the root
   */
  get path() {
    const t = this.source.indexOf("://"), o = this.source.slice(0, t), c = this.source.slice(t + 3), f = c.indexOf("/"), g = c.slice(0, f), T = c.slice(f), y = `${o}://${g}${hi(T)}`, m = new URL(y);
    let v = decodeURIComponent(m.pathname);
    this.isDavResource && (v = v.split(this._knownDavService).pop());
    const u = v.indexOf(this.root), _ = this.root.replace(/\/$/, "");
    return v.slice(u + _.length) || "/";
  }
  /**
   * Get the nodes file id if defined.
   * There is no setter as the fileid is not meant to be changed.
   *
   * @deprecated Nextcloud is migrating to snowflake ids which are strings. Use the `id` attribute instead.
   */
  get fileid() {
    return typeof this._data?.id == "number" ? this._data.id : void 0;
  }
  /**
   * Get the nodes id - if defined.
   *
   * Note: As Nextcloud is migrating to snowflake ids the id has to be a string,
   * due to limitations of the JavaScript number type (snowflake ids are 64bit JavaScript numbers can only accurately represent integers up to 53 bit).
   */
  get id() {
    if (!(typeof this._data?.id > "u" || typeof this._data.id == "number" && this._data.id < 0))
      return String(this._data.id);
  }
  /**
   * Get the node status.
   */
  get status() {
    return this._data?.status;
  }
  /**
   * Set the node status.
   */
  set status(t) {
    be({ ...this._data, status: t }, this._knownDavService), this._data.status = t;
  }
  /**
   * Move the node to a new destination
   *
   * @param destination the new source.
   * e.g. https://cloud.domain.com/remote.php/dav/files/emma/Photos/picture.jpg
   */
  move(t) {
    be({ ...this._data, source: t }, this._knownDavService);
    const o = this.basename;
    this._data.source = t, this.displayname === o && this.basename !== o && (this.displayname = this.basename);
  }
  /**
   * Rename the node
   * This aliases the move method for easier usage
   *
   * @param basename The new name of the node
   */
  rename(t) {
    if (t.includes("/"))
      throw new Error("Invalid basename");
    this.move(Ei(this.source) + "/" + t);
  }
  /**
   * Update the mtime if exists
   */
  updateMtime() {
    this._data.mtime && (this._data.mtime = /* @__PURE__ */ new Date());
  }
  /**
   * Update the attributes of the node
   * Warning, updating attributes will NOT automatically update the mtime.
   *
   * @param attributes The new attributes to update on the Node attributes
   */
  update(t) {
    for (const [o, c] of Object.entries(t))
      try {
        c === void 0 ? delete this.attributes[o] : this.attributes[o] = c;
      } catch (f) {
        if (f instanceof TypeError)
          continue;
        throw f;
      }
  }
  /**
   * Returns a clone of the node
   */
  clone() {
    return new this.constructor(structuredClone(this._data), this._knownDavService);
  }
  /**
   * JSON representation of the node
   */
  toJSON() {
    return JSON.stringify([structuredClone(this._data), this._knownDavService.toString()]);
  }
}
class ls extends Dt {
  constructor(...[t, o]) {
    super(t, o);
  }
  get type() {
    return Dn.File;
  }
}
function gi(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var o = 0, c = Array(t); o < t; o++) c[o] = e[o];
  return c;
}
function no(e) {
  if (Array.isArray(e)) return e;
}
function io(e, t) {
  var o = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (o != null) {
    var c, f, g, T, y = [], m = !0, v = !1;
    try {
      if (g = (o = o.call(e)).next, t !== 0) for (; !(m = (c = g.call(o)).done) && (y.push(c.value), y.length !== t); m = !0) ;
    } catch (u) {
      v = !0, f = u;
    } finally {
      try {
        if (!m && o.return != null && (T = o.return(), Object(T) !== T)) return;
      } finally {
        if (v) throw f;
      }
    }
    return y;
  }
}
function ro() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function oo(e, t) {
  return no(e) || io(e, t) || so(e, t) || ro();
}
function so(e, t) {
  if (e) {
    if (typeof e == "string") return gi(e, t);
    var o = {}.toString.call(e).slice(8, -1);
    return o === "Object" && e.constructor && (o = e.constructor.name), o === "Map" || o === "Set" ? Array.from(e) : o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? gi(e, t) : void 0;
  }
}
const Hi = Object.entries, Ti = Object.setPrototypeOf, ao = Object.isFrozen, Xi = Object.getPrototypeOf, qi = Object.getOwnPropertyDescriptor;
let W = Object.freeze, Q = Object.seal, je = Object.create, Wi = typeof Reflect < "u" && Reflect, bn = Wi.apply, In = Wi.construct;
W || (W = function(t) {
  return t;
});
Q || (Q = function(t) {
  return t;
});
bn || (bn = function(t, o) {
  for (var c = arguments.length, f = new Array(c > 2 ? c - 2 : 0), g = 2; g < c; g++) f[g - 2] = arguments[g];
  return t.apply(o, f);
});
In || (In = function(t) {
  for (var o = arguments.length, c = new Array(o > 1 ? o - 1 : 0), f = 1; f < o; f++) c[f - 1] = arguments[f];
  return new t(...c);
});
const _e = k(Array.prototype.forEach), co = k(Array.prototype.lastIndexOf), _i = k(Array.prototype.pop), rt = k(Array.prototype.push), lo = k(Array.prototype.slice), uo = k(Array.prototype.splice), Ve = Array.isArray, ln = Yi(Set), un = k(Set.prototype.add), ot = k(Set.prototype.has), Ce = k(String.prototype.toLowerCase), fn = k(String.prototype.toString), wi = k(String.prototype.match), st = k(String.prototype.replace), Ai = k(String.prototype.indexOf), fo = k(String.prototype.trim), mo = k(Number.prototype.toString), po = k(Boolean.prototype.toString), yi = typeof BigInt > "u" ? null : k(BigInt.prototype.toString), bi = typeof Symbol > "u" ? null : k(Symbol.prototype.toString), se = k(Object.prototype.hasOwnProperty), at = k(Object.prototype.toString), K = k(RegExp.prototype.test), we = Yi(TypeError);
function k(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var o = arguments.length, c = new Array(o > 1 ? o - 1 : 0), f = 1; f < o; f++) c[f - 1] = arguments[f];
    return bn(e, t, c);
  };
}
function Yi(e) {
  return function() {
    for (var t = arguments.length, o = new Array(t), c = 0; c < t; c++) o[c] = arguments[c];
    return In(e, o);
  };
}
function L(e, t) {
  let o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Ce;
  if (Ti && Ti(e, null), !Ve(t)) return e;
  let c = t.length;
  for (; c--; ) {
    let f = t[c];
    if (typeof f == "string") {
      const g = o(f);
      g !== f && (ao(t) || (t[c] = g), f = g);
    }
    e[f] = !0;
  }
  return e;
}
function ho(e) {
  for (let t = 0; t < e.length; t++) se(e, t) || (e[t] = null);
  return e;
}
function ce(e) {
  const t = je(null);
  for (const c of Hi(e)) {
    var o = oo(c, 2);
    const f = o[0], g = o[1];
    se(e, f) && (Ve(g) ? t[f] = ho(g) : g && typeof g == "object" && g.constructor === Object ? t[f] = ce(g) : t[f] = g);
  }
  return t;
}
function Eo(e) {
  switch (typeof e) {
    case "string":
      return e;
    case "number":
      return mo(e);
    case "boolean":
      return po(e);
    case "bigint":
      return yi ? yi(e) : "0";
    case "symbol":
      return bi ? bi(e) : "Symbol()";
    case "undefined":
      return at(e);
    case "function":
    case "object": {
      if (e === null) return at(e);
      const t = e, o = me(t, "toString");
      if (typeof o == "function") {
        const c = o(t);
        return typeof c == "string" ? c : at(c);
      }
      return at(e);
    }
    default:
      return at(e);
  }
}
function me(e, t) {
  for (; e !== null; ) {
    const c = qi(e, t);
    if (c) {
      if (c.get) return k(c.get);
      if (typeof c.value == "function") return k(c.value);
    }
    e = Xi(e);
  }
  function o() {
    return null;
  }
  return o;
}
function go(e, t) {
  for (; e !== null; ) {
    const o = qi(e, t);
    if (o) return o.get ? k(o.get) : null;
    e = Xi(e);
  }
  return null;
}
function To(e) {
  try {
    return K(e, ""), !0;
  } catch {
    return !1;
  }
}
const Ii = W([
  "a",
  "abbr",
  "acronym",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "bdi",
  "bdo",
  "big",
  "blink",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "center",
  "cite",
  "code",
  "col",
  "colgroup",
  "content",
  "data",
  "datalist",
  "dd",
  "decorator",
  "del",
  "details",
  "dfn",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "element",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "font",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meter",
  "nav",
  "nobr",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "search",
  "section",
  "select",
  "shadow",
  "slot",
  "small",
  "source",
  "spacer",
  "span",
  "strike",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "track",
  "tt",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
]), dn = W([
  "svg",
  "a",
  "altglyph",
  "altglyphdef",
  "altglyphitem",
  "animatecolor",
  "animatemotion",
  "animatetransform",
  "circle",
  "clippath",
  "defs",
  "desc",
  "ellipse",
  "enterkeyhint",
  "exportparts",
  "filter",
  "font",
  "g",
  "glyph",
  "glyphref",
  "hkern",
  "image",
  "inputmode",
  "line",
  "lineargradient",
  "marker",
  "mask",
  "metadata",
  "mpath",
  "part",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialgradient",
  "rect",
  "stop",
  "style",
  "switch",
  "symbol",
  "text",
  "textpath",
  "title",
  "tref",
  "tspan",
  "view",
  "vkern"
]), mn = W([
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
]), _o = W([
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
]), pn = W([
  "math",
  "menclose",
  "merror",
  "mfenced",
  "mfrac",
  "mglyph",
  "mi",
  "mlabeledtr",
  "mmultiscripts",
  "mn",
  "mo",
  "mover",
  "mpadded",
  "mphantom",
  "mroot",
  "mrow",
  "ms",
  "mspace",
  "msqrt",
  "mstyle",
  "msub",
  "msup",
  "msubsup",
  "mtable",
  "mtd",
  "mtext",
  "mtr",
  "munder",
  "munderover",
  "mprescripts"
]), wo = W([
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
]), Ni = W(["#text"]), vi = W([
  "accept",
  "action",
  "align",
  "alt",
  "autocapitalize",
  "autocomplete",
  "autopictureinpicture",
  "autoplay",
  "background",
  "bgcolor",
  "border",
  "capture",
  "cellpadding",
  "cellspacing",
  "checked",
  "cite",
  "class",
  "clear",
  "color",
  "cols",
  "colspan",
  "command",
  "commandfor",
  "controls",
  "controlslist",
  "coords",
  "crossorigin",
  "datetime",
  "decoding",
  "default",
  "dir",
  "disabled",
  "disablepictureinpicture",
  "disableremoteplayback",
  "download",
  "draggable",
  "enctype",
  "enterkeyhint",
  "exportparts",
  "face",
  "for",
  "headers",
  "height",
  "hidden",
  "high",
  "href",
  "hreflang",
  "id",
  "inert",
  "inputmode",
  "integrity",
  "ismap",
  "kind",
  "label",
  "lang",
  "list",
  "loading",
  "loop",
  "low",
  "max",
  "maxlength",
  "media",
  "method",
  "min",
  "minlength",
  "multiple",
  "muted",
  "name",
  "nonce",
  "noshade",
  "novalidate",
  "nowrap",
  "open",
  "optimum",
  "part",
  "pattern",
  "placeholder",
  "playsinline",
  "popover",
  "popovertarget",
  "popovertargetaction",
  "poster",
  "preload",
  "pubdate",
  "radiogroup",
  "readonly",
  "rel",
  "required",
  "rev",
  "reversed",
  "role",
  "rows",
  "rowspan",
  "spellcheck",
  "scope",
  "selected",
  "shape",
  "size",
  "sizes",
  "slot",
  "span",
  "srclang",
  "start",
  "src",
  "srcset",
  "step",
  "style",
  "summary",
  "tabindex",
  "title",
  "translate",
  "type",
  "usemap",
  "valign",
  "value",
  "width",
  "wrap",
  "xmlns"
]), hn = W([
  "accent-height",
  "accumulate",
  "additive",
  "alignment-baseline",
  "amplitude",
  "ascent",
  "attributename",
  "attributetype",
  "azimuth",
  "basefrequency",
  "baseline-shift",
  "begin",
  "bias",
  "by",
  "class",
  "clip",
  "clippathunits",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "cx",
  "cy",
  "d",
  "dx",
  "dy",
  "diffuseconstant",
  "direction",
  "display",
  "divisor",
  "dominant-baseline",
  "dur",
  "edgemode",
  "elevation",
  "end",
  "exponent",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "filterunits",
  "flood-color",
  "flood-opacity",
  "font-family",
  "font-size",
  "font-size-adjust",
  "font-stretch",
  "font-style",
  "font-variant",
  "font-weight",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyph-name",
  "glyphref",
  "gradientunits",
  "gradienttransform",
  "height",
  "href",
  "id",
  "image-rendering",
  "in",
  "in2",
  "intercept",
  "k",
  "k1",
  "k2",
  "k3",
  "k4",
  "kerning",
  "keypoints",
  "keysplines",
  "keytimes",
  "lang",
  "lengthadjust",
  "letter-spacing",
  "kernelmatrix",
  "kernelunitlength",
  "lighting-color",
  "local",
  "marker-end",
  "marker-mid",
  "marker-start",
  "markerheight",
  "markerunits",
  "markerwidth",
  "maskcontentunits",
  "maskunits",
  "max",
  "mask",
  "mask-type",
  "media",
  "method",
  "mode",
  "min",
  "name",
  "numoctaves",
  "offset",
  "operator",
  "opacity",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "paint-order",
  "path",
  "pathlength",
  "patterncontentunits",
  "patterntransform",
  "patternunits",
  "pointer-events",
  "points",
  "preservealpha",
  "preserveaspectratio",
  "primitiveunits",
  "r",
  "rx",
  "ry",
  "radius",
  "refx",
  "refy",
  "repeatcount",
  "repeatdur",
  "restart",
  "result",
  "rotate",
  "scale",
  "seed",
  "shape-rendering",
  "slope",
  "specularconstant",
  "specularexponent",
  "spreadmethod",
  "startoffset",
  "stddeviation",
  "stitchtiles",
  "stop-color",
  "stop-opacity",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke",
  "stroke-width",
  "style",
  "surfacescale",
  "systemlanguage",
  "tabindex",
  "tablevalues",
  "targetx",
  "targety",
  "transform",
  "transform-origin",
  "text-anchor",
  "text-decoration",
  "text-orientation",
  "text-rendering",
  "textlength",
  "type",
  "u1",
  "u2",
  "unicode",
  "values",
  "vector-effect",
  "viewbox",
  "visibility",
  "version",
  "vert-adv-y",
  "vert-origin-x",
  "vert-origin-y",
  "width",
  "word-spacing",
  "wrap",
  "writing-mode",
  "xchannelselector",
  "ychannelselector",
  "x",
  "x1",
  "x2",
  "xmlns",
  "y",
  "y1",
  "y2",
  "z",
  "zoomandpan"
]), Si = W([
  "accent",
  "accentunder",
  "align",
  "bevelled",
  "close",
  "columnalign",
  "columnlines",
  "columnspacing",
  "columnspan",
  "denomalign",
  "depth",
  "dir",
  "display",
  "displaystyle",
  "encoding",
  "fence",
  "frame",
  "height",
  "href",
  "id",
  "largeop",
  "length",
  "linethickness",
  "lquote",
  "lspace",
  "mathbackground",
  "mathcolor",
  "mathsize",
  "mathvariant",
  "maxsize",
  "minsize",
  "movablelimits",
  "notation",
  "numalign",
  "open",
  "rowalign",
  "rowlines",
  "rowspacing",
  "rowspan",
  "rspace",
  "rquote",
  "scriptlevel",
  "scriptminsize",
  "scriptsizemultiplier",
  "selection",
  "separator",
  "separators",
  "stretchy",
  "subscriptshift",
  "supscriptshift",
  "symmetric",
  "voffset",
  "width",
  "xmlns"
]), bt = W([
  "xlink:href",
  "xml:id",
  "xlink:title",
  "xml:space",
  "xmlns:xlink"
]), Ao = Q(/{{[\w\W]*|^[\w\W]*}}/g), yo = Q(/<%[\w\W]*|^[\w\W]*%>/g), bo = Q(/\${[\w\W]*/g), Io = Q(/^data-[\-\w.\u00B7-\uFFFF]+$/), No = Q(/^aria-[\-\w]+$/), Oi = Q(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i), vo = Q(/^(?:\w+script|data):/i), So = Q(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g), Oo = Q(/^html$/i), Ro = Q(/^[a-z][.\w]*(-[.\w]+)+$/i), En = Q(/<[/\w!]/g), Ri = Q(/<[/\w]/g), Do = Q(/<\/no(script|embed|frames)/i), Di = Q(/\/>/i), V = {
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
}, Lo = W(L({}, [
  "style",
  "script",
  "xmp",
  "iframe",
  "noembed",
  "noframes",
  "plaintext",
  "noscript"
])), Co = function() {
  return typeof window > "u" ? null : window;
}, xo = function(t, o) {
  if (typeof t != "object" || typeof t.createPolicy != "function") return null;
  let c = null;
  const f = "data-tt-policy-suffix";
  o && o.hasAttribute(f) && (c = o.getAttribute(f));
  const g = "dompurify" + (c ? "#" + c : "");
  try {
    return t.createPolicy(g, {
      createHTML(T) {
        return T;
      },
      createScriptURL(T) {
        return T;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + g + " could not be created."), null;
  }
}, Li = function() {
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
}, Ie = function(t, o, c, f) {
  return se(t, o) && Ve(t[o]) ? L(f.base ? ce(f.base) : {}, t[o], f.transform) : c;
}, gn = function(t, o, c) {
  const f = se(t, o) ? t[o] : void 0;
  return f && typeof f == "object" ? ce(f) : c();
};
function Ki() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Co();
  const t = (E) => Ki(E);
  if (t.version = "3.4.17", t.removed = [], !e || !e.document || e.document.nodeType !== V.document || !e.Element)
    return t.isSupported = !1, t;
  let o = e.document;
  const c = o, f = c.currentScript;
  e.DocumentFragment;
  const g = e.HTMLTemplateElement, T = e.Node, y = e.Element, m = e.NodeFilter;
  e.NamedNodeMap === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
  const v = e.DOMParser, u = e.trustedTypes, _ = y.prototype, I = me(_, "cloneNode"), O = me(_, "remove"), x = me(_, "removeAttributeNode"), w = me(_, "nextSibling"), q = me(_, "childNodes"), U = me(_, "parentNode"), Z = me(_, "shadowRoot"), pe = me(_, "attributes"), $ = T && T.prototype ? me(T.prototype, "nodeType") : null, B = T && T.prototype ? me(T.prototype, "nodeName") : null, Te = T && T.prototype ? me(T.prototype, "ownerDocument") : null, ie = function(r) {
    return $ ? $(r) : r.nodeType;
  }, J = function(r) {
    return B ? B(r) : r.nodeName;
  }, lt = go(_, "namespaceURI"), l = function(r) {
    return lt ? lt(r) : r.namespaceURI;
  };
  if (typeof g == "function") {
    const E = o.createElement("template");
    E.content && E.content.ownerDocument && (o = E.content.ownerDocument);
  }
  let Y, ae = "", Xe, qe = !1, Ne = 0;
  const ut = function() {
    if (Ne > 0) throw we('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
  }, M = function(r) {
    ut(), Ne++;
    try {
      return Y.createHTML(r);
    } finally {
      Ne--;
    }
  }, ve = function(r) {
    ut(), Ne++;
    try {
      return Y.createScriptURL(r);
    } finally {
      Ne--;
    }
  }, ft = function() {
    return qe || (Xe = xo(u, f), qe = !0), Xe;
  }, le = o, xe = le.implementation, C = le.createNodeIterator, Lt = le.createDocumentFragment, We = le.getElementsByTagName, Ye = c.importNode;
  let R = Li();
  t.isSupported = typeof Hi == "function" && typeof U == "function" && xe && xe.createHTMLDocument !== void 0;
  const Ke = Ao, Ct = yo, xt = bo, dt = Io, Qe = No, Mt = vo, i = So, n = Ro;
  let d = Oi, s = null;
  const D = L({}, [
    ...Ii,
    ...dn,
    ...mn,
    ...pn,
    ...Ni
  ]);
  let N = null;
  const G = L({}, [
    ...vi,
    ...hn,
    ...Si,
    ...bt
  ]);
  let F = Object.seal(je(null, {
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
  })), j = null, ue = null;
  const P = Object.seal(je(null, {
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
  }));
  let fe = !0, Ze = !0, Je = !1, Se = !0, de = !1, Oe = !0, Re = !1, Pt = !1, mt = null, pt = null, Ft = !1, Me = !1, ht = !1, Et = !1, Ln = !0, Cn = !1;
  const xn = "user-content-";
  let Ut = !0, kt = !1, De = null, Pe = {}, Le = null;
  const Mn = L({}, [
    "annotation-xml",
    "audio",
    "colgroup",
    "desc",
    "foreignobject",
    "head",
    "iframe",
    "math",
    "mi",
    "mn",
    "mo",
    "ms",
    "mtext",
    "noembed",
    "noframes",
    "noscript",
    "plaintext",
    "script",
    "selectedcontent",
    "style",
    "svg",
    "template",
    "thead",
    "title",
    "video",
    "xmp"
  ]);
  let Pn = null;
  const Fn = L({}, [
    "audio",
    "video",
    "img",
    "source",
    "image",
    "track"
  ]);
  let Un = null;
  const kn = L({}, [
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
  ]), gt = "http://www.w3.org/1998/Math/MathML", Tt = "http://www.w3.org/2000/svg", Ee = "http://www.w3.org/1999/xhtml";
  let Fe = Ee, $t = !1, Bt = null;
  const er = L({}, [
    gt,
    Tt,
    Ee
  ], fn), $n = W([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext"
  ]);
  let Gt = L({}, $n);
  const Bn = W(["annotation-xml"]);
  let zt = L({}, Bn);
  const tr = L({}, [
    "title",
    "style",
    "font",
    "a",
    "script"
  ]);
  let et = null;
  const nr = ["application/xhtml+xml", "text/html"], ir = "text/html";
  let z = null, Ue = null;
  const rr = o.createElement("form"), Gn = function(r) {
    return r instanceof RegExp || r instanceof Function;
  }, jt = function() {
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (Ue && Ue === r) return;
    (!r || typeof r != "object") && (r = {}), r = ce(r), et = nr.indexOf(r.PARSER_MEDIA_TYPE) === -1 ? ir : r.PARSER_MEDIA_TYPE, z = et === "application/xhtml+xml" ? fn : Ce, s = Ie(r, "ALLOWED_TAGS", D, { transform: z }), N = Ie(r, "ALLOWED_ATTR", G, { transform: z }), Bt = Ie(r, "ALLOWED_NAMESPACES", er, { transform: fn }), Un = Ie(r, "ADD_URI_SAFE_ATTR", kn, {
      transform: z,
      base: kn
    }), Pn = Ie(r, "ADD_DATA_URI_TAGS", Fn, {
      transform: z,
      base: Fn
    }), Le = Ie(r, "FORBID_CONTENTS", Mn, { transform: z }), j = Ie(r, "FORBID_TAGS", ce({}), { transform: z }), ue = Ie(r, "FORBID_ATTR", ce({}), { transform: z }), Pe = se(r, "USE_PROFILES") ? r.USE_PROFILES && typeof r.USE_PROFILES == "object" ? ce(r.USE_PROFILES) : r.USE_PROFILES : !1, fe = r.ALLOW_ARIA_ATTR !== !1, Ze = r.ALLOW_DATA_ATTR !== !1, Je = r.ALLOW_UNKNOWN_PROTOCOLS || !1, Se = r.ALLOW_SELF_CLOSE_IN_ATTR !== !1, de = r.SAFE_FOR_TEMPLATES || !1, Oe = r.SAFE_FOR_XML !== !1, Re = r.WHOLE_DOCUMENT || !1, Me = r.RETURN_DOM || !1, ht = r.RETURN_DOM_FRAGMENT || !1, Et = r.RETURN_TRUSTED_TYPE || !1, Ft = r.FORCE_BODY || !1, Ln = r.SANITIZE_DOM !== !1, Cn = r.SANITIZE_NAMED_PROPS || !1, Ut = r.KEEP_CONTENT !== !1, kt = r.IN_PLACE || !1, d = To(r.ALLOWED_URI_REGEXP) ? r.ALLOWED_URI_REGEXP : Oi, Fe = typeof r.NAMESPACE == "string" ? r.NAMESPACE : Ee, Gt = gn(r, "MATHML_TEXT_INTEGRATION_POINTS", () => L({}, $n)), zt = gn(r, "HTML_INTEGRATION_POINTS", () => L({}, Bn));
    const a = gn(r, "CUSTOM_ELEMENT_HANDLING", () => je(null));
    if (F = je(null), se(a, "tagNameCheck") && Gn(a.tagNameCheck) && (F.tagNameCheck = a.tagNameCheck), se(a, "attributeNameCheck") && Gn(a.attributeNameCheck) && (F.attributeNameCheck = a.attributeNameCheck), se(a, "allowCustomizedBuiltInElements") && typeof a.allowCustomizedBuiltInElements == "boolean" && (F.allowCustomizedBuiltInElements = a.allowCustomizedBuiltInElements), Q(F), de && (Ze = !1), ht && (Me = !0), Pe && (s = L({}, Ni), N = je(null), Pe.html === !0 && (L(s, Ii), L(N, vi)), Pe.svg === !0 && (L(s, dn), L(N, hn), L(N, bt)), Pe.svgFilters === !0 && (L(s, mn), L(N, hn), L(N, bt)), Pe.mathMl === !0 && (L(s, pn), L(N, Si), L(N, bt))), P.tagCheck = null, P.attributeCheck = null, se(r, "ADD_TAGS") && (typeof r.ADD_TAGS == "function" ? P.tagCheck = r.ADD_TAGS : Ve(r.ADD_TAGS) && (s === D && (s = ce(s)), L(s, r.ADD_TAGS, z))), se(r, "ADD_ATTR") && (typeof r.ADD_ATTR == "function" ? P.attributeCheck = r.ADD_ATTR : Ve(r.ADD_ATTR) && (N === G && (N = ce(N)), L(N, r.ADD_ATTR, z))), se(r, "ADD_FORBID_CONTENTS") && Ve(r.ADD_FORBID_CONTENTS) && (Le === Mn && (Le = ce(Le)), L(Le, r.ADD_FORBID_CONTENTS, z)), Ut && (s["#text"] = !0), Re && L(s, [
      "html",
      "head",
      "body"
    ]), s.table && (L(s, ["tbody"]), delete j.tbody), r.TRUSTED_TYPES_POLICY) {
      if (typeof r.TRUSTED_TYPES_POLICY.createHTML != "function") throw we('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof r.TRUSTED_TYPES_POLICY.createScriptURL != "function") throw we('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      const p = Y;
      Y = r.TRUSTED_TYPES_POLICY;
      try {
        ae = M("");
      } catch (h) {
        throw Y = p, h;
      }
    } else r.TRUSTED_TYPES_POLICY === null ? (Y = void 0, ae = "") : (Y === void 0 && (Y = ft()), Y && typeof ae == "string" && (ae = M("")));
    W && W(r), Ue = r;
  }, zn = L({}, [
    ...dn,
    ...mn,
    ..._o
  ]), jn = L({}, [...pn, ...wo]), or = function(r, a, p) {
    return a.namespaceURI === Ee ? r === "svg" : a.namespaceURI === gt ? r === "svg" && (p === "annotation-xml" || Gt[p]) : !!zn[r];
  }, sr = function(r, a, p) {
    return a.namespaceURI === Ee ? r === "math" : a.namespaceURI === Tt ? r === "math" && zt[p] : !!jn[r];
  }, ar = function(r, a, p) {
    return a.namespaceURI === Tt && !zt[p] || a.namespaceURI === gt && !Gt[p] ? !1 : !jn[r] && (tr[r] || !zn[r]);
  }, cr = function(r) {
    const a = l(r), p = Ce(J(r)), h = U(r);
    let A, b;
    return h && ie(h) === V.element ? (A = { namespaceURI: l(h) }, b = Ce(J(h))) : (A = { namespaceURI: Fe }, b = "template"), Bt[a] ? a === Tt ? or(p, A, b) : a === gt ? sr(p, A, b) : a === Ee ? ar(p, A, b) : !!(et === "application/xhtml+xml" && Bt[a]) : !1;
  }, Ae = function(r) {
    rt(t.removed, { element: r });
    try {
      U(r).removeChild(r);
    } catch {
      if (O(r), !U(r)) throw we("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
    }
  }, Vn = function(r, a, p) {
    try {
      x(r, a);
    } catch {
      try {
        r.removeAttribute(p);
      } catch {
      }
    }
  }, Vt = function(r) {
    Xt(r);
    const a = q(r);
    a && _e(lo(a), (h) => {
      try {
        O(h);
      } catch {
      }
    });
    const p = ie(r) === V.element ? pe(r) : null;
    if (p) for (let h = p.length - 1; h >= 0; --h) {
      const A = p[h], b = A && A.name;
      typeof b == "string" && Vn(r, A, b);
    }
  }, ke = function(r, a, p) {
    if (!p) try {
      p = a.getAttributeNode(r);
    } catch {
      p = null;
    }
    rt(t.removed, {
      attribute: p || null,
      from: a
    });
    try {
      p ? x(a, p) : a.removeAttribute(r);
    } catch {
      try {
        a.removeAttribute(r);
      } catch {
      }
    }
    if (r === "is")
      if (Me || ht) try {
        Ae(a);
      } catch {
      }
      else try {
        a.setAttribute(r, "");
      } catch {
      }
  }, Hn = function(r) {
    const a = pe(r);
    if (a)
      for (let p = a.length - 1; p >= 0; --p) {
        const h = a[p], A = h && h.name;
        typeof A != "string" || N[z(A)] || Vn(r, h, A);
      }
  }, Ht = function(r, a) {
    let p = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
    const h = [r];
    for (; h.length > 0; ) {
      const A = h.pop();
      if (a(A) === !1) continue;
      if (p && ie(A) === V.element) {
        const S = Z(A);
        ye(S) && h.push(S);
      }
      const b = q(A);
      if (b) for (let S = b.length - 1; S >= 0; --S) h.push(b[S]);
    }
  }, Xt = function(r) {
    Ht(r, (a) => {
      ie(a) === V.element && Hn(a);
    });
  }, qt = function(r) {
    const a = [];
    return Ht(r, (p) => {
      a.push(p);
    }, !0), a;
  }, lr = function(r, a) {
    const p = ln();
    _e(qt(r), (h) => {
      ie(h) === V.element && un(p, h);
    }), _e(a, (h) => {
      ie(h) === V.element && !ot(p, h) && Hn(h);
    });
  }, Xn = function(r, a) {
    let p = !1;
    return _e(t.removed, (h) => {
      h.element && (p = p || h.element === r, Xt(h.element));
    }), lr(r, a), p;
  }, ur = 8, fr = function(r, a) {
    const p = De;
    let h = null;
    const A = () => (h || (h = ln(), _e(a, (b) => {
      un(h, b);
    })), h);
    for (let b = 0; ; b++) {
      const S = qt(r), X = [r];
      let ge = !1;
      if (_e(S, (ee) => {
        ie(ee) === V.documentFragment ? rt(X, ee) : !ge && !ot(p, ee) && (ge = ot(A(), ee));
      }), !ge) return;
      if (b >= ur) throw we("the tree kept changing during in-place sanitization; refusing to return it");
      _e(X, (ee, re) => {
        dr(ee, re > 0, r, A());
      });
    }
  }, dr = function(r, a, p, h) {
    const A = Wt(r);
    let b;
    for (; b = A.nextNode(); )
      !ot(h, b) || ot(De, b) || (a && he(R.uponSanitizeShadowNode, b, null), Kt(b, p), Qt(b, p), ye(b.content) && nt(b.content));
  }, mr = function(r) {
    De && un(De, r);
  }, qn = function(r, a) {
    return Oe ? r === "patchsrc" ? !0 : r === "for" && a !== "label" && a !== "output" : !1;
  }, pr = function(r) {
    Oe && Ht(r, (a) => {
      const p = ie(a);
      if (p === V.processingInstruction || p === V.comment && K(Ri, a.data)) {
        try {
          O(a);
        } catch {
        }
        return !1;
      }
      if (p === V.element) {
        const h = a, A = z(J(a));
        try {
          h.hasAttribute && h.hasAttribute("patchsrc") && h.removeAttribute("patchsrc"), h.hasAttribute && h.hasAttribute("for") && qn("for", A) && h.removeAttribute("for");
        } catch {
        }
      }
      return !0;
    });
  }, Wn = function(r) {
    let a = null, p = null;
    if (Ft) r = "<remove></remove>" + r;
    else {
      const b = wi(r, /^[\r\n\t ]+/);
      p = b && b[0];
    }
    et === "application/xhtml+xml" && Fe === Ee && (r = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + r + "</body></html>");
    const h = Y ? M(r) : r;
    if (Fe === Ee) try {
      a = new v().parseFromString(h, et);
    } catch {
    }
    if (!a || !a.documentElement) {
      a = xe.createDocument(Fe, "template", null);
      try {
        a.documentElement.innerHTML = $t ? ae : h;
      } catch {
      }
    }
    const A = a.body || a.documentElement;
    return r && p && A.insertBefore(o.createTextNode(p), A.childNodes[0] || null), Fe === Ee ? We.call(a, Re ? "html" : "body")[0] : Re ? a.documentElement : A;
  }, Wt = function(r) {
    const a = Te ? Te(r) : r.ownerDocument;
    return C.call(a || r, r, m.SHOW_ELEMENT | m.SHOW_COMMENT | m.SHOW_TEXT | m.SHOW_PROCESSING_INSTRUCTION | m.SHOW_CDATA_SECTION, null);
  }, _t = function(r) {
    return r = st(r, Ke, " "), r = st(r, Ct, " "), r = st(r, xt, " "), r;
  }, Yt = function(r) {
    var a;
    Yn(r);
    const p = (a = r.querySelectorAll) === null || a === void 0 ? void 0 : a.call(r, "template");
    p && _e(p, (h) => {
      ye(h.content) && Yt(h.content);
    });
  }, Yn = function(r) {
    r.normalize();
    const a = Te ? Te(r) : r.ownerDocument, p = C.call(a || r, r, m.SHOW_TEXT | m.SHOW_COMMENT | m.SHOW_CDATA_SECTION | m.SHOW_PROCESSING_INSTRUCTION, null);
    let h = p.nextNode();
    for (; h; )
      h.data = _t(h.data), h = p.nextNode();
  }, wt = function(r) {
    const a = B ? B(r) : null;
    return typeof a != "string" || z(a) !== "form" ? !1 : typeof r.nodeName != "string" || typeof r.textContent != "string" || typeof r.removeChild != "function" || r.attributes !== pe(r) || typeof r.removeAttribute != "function" || typeof r.removeAttributeNode != "function" || typeof r.getAttributeNode != "function" || typeof r.setAttribute != "function" || typeof r.namespaceURI != "string" || typeof r.insertBefore != "function" || typeof r.hasChildNodes != "function" || r.nodeType !== $(r) || r.childNodes !== q(r);
  }, ye = function(r) {
    if (!$ || typeof r != "object" || r === null) return !1;
    try {
      return $(r) === V.documentFragment;
    } catch {
      return !1;
    }
  }, tt = function(r) {
    if (!$ || typeof r != "object" || r === null) return !1;
    try {
      return typeof $(r) == "number";
    } catch {
      return !1;
    }
  };
  function he(E, r, a) {
    E.length !== 0 && _e(E, (p) => {
      p.call(t, r, a, Ue);
    });
  }
  const hr = function(r, a) {
    return !!(Oe && r.hasChildNodes() && !tt(r.firstElementChild) && K(En, r.textContent) && K(En, r.innerHTML) || Oe && Lo[a] && ie(r) === V.element && l(r) === Ee && (tt(r.firstElementChild) || typeof r.textContent == "string" && K(En, r.textContent)) || r.nodeType === V.processingInstruction || Oe && r.nodeType === V.comment && K(Ri, r.data));
  }, At = function(r, a) {
    if (r instanceof RegExp) return K(r, a);
    if (r instanceof Function) {
      for (var p = arguments.length, h = new Array(p > 2 ? p - 2 : 0), A = 2; A < p; A++) h[A - 2] = arguments[A];
      return !!r(a, ...h);
    }
    return !1;
  }, Er = function(r, a, p) {
    if (!j[a] && Zn(a) && At(F.tagNameCheck, a)) return !1;
    if (Ut && !Le[a] && !Le[Ce(a)]) {
      const h = U(r), A = q(r);
      if (A && h) {
        const b = A.length;
        for (let S = b - 1; S >= 0; --S) {
          const X = r === p ? I(A[S], !0) : A[S];
          h.insertBefore(X, w(r));
        }
      }
    }
    return Ae(r), !0;
  }, Kn = function(r, a, p, h) {
    return r.length === 0 ? a : a === p || a === h ? ce(a) : a;
  }, $e = function(r, a) {
    return r === a || U(r) !== null ? !1 : (kt && Xt(r), !0);
  }, Kt = function(r, a) {
    if (mr(r), he(R.beforeSanitizeElements, r, null), $e(r, a)) return !0;
    if (wt(r))
      return Ae(r), !0;
    const p = z(J(r));
    if (s = Kn(R.uponSanitizeElement, s, D, mt), he(R.uponSanitizeElement, r, {
      tagName: p,
      allowedTags: s
    }), $e(r, a)) return !0;
    if (hr(r, p))
      return Ae(r), !0;
    if (j[p] || !(P.tagCheck instanceof Function && P.tagCheck(p)) && !s[p]) {
      const h = Er(r, p, a);
      return h === !1 && (he(R.afterSanitizeElements, r, null), $e(r, a)) ? !0 : h;
    }
    if (ie(r) === V.element && !cr(r) || (p === "noscript" || p === "noembed" || p === "noframes") && K(Do, r.innerHTML))
      return Ae(r), !0;
    if (de && r.nodeType === V.text) {
      const h = _t(r.textContent);
      r.textContent !== h && (rt(t.removed, { element: r.cloneNode() }), r.textContent = h);
    }
    return he(R.afterSanitizeElements, r, null), $e(r, a);
  }, Qn = function(r, a, p) {
    if (ue[a] || qn(a, r) || Ln && (a === "id" || a === "name") && (p in o || p in rr)) return !1;
    const h = N[a] || P.attributeCheck instanceof Function && P.attributeCheck(a, r);
    return Ze && K(dt, a) || fe && K(Qe, a) ? !0 : h ? Un[a] || K(d, st(p, i, "")) || (a === "src" || a === "xlink:href" || a === "href") && r !== "script" && Ai(p, "data:") === 0 && Pn[r] || Je && !K(Mt, st(p, i, "")) ? !0 : !p : Zn(r) && At(F.tagNameCheck, r) && At(F.attributeNameCheck, a, r) || a === "is" && F.allowCustomizedBuiltInElements && At(F.tagNameCheck, p);
  }, gr = L({}, [
    "annotation-xml",
    "color-profile",
    "font-face",
    "font-face-format",
    "font-face-name",
    "font-face-src",
    "font-face-uri",
    "missing-glyph"
  ]), Zn = function(r) {
    return !gr[Ce(r)] && K(n, r);
  }, Tr = function(r, a, p, h) {
    if (Y && typeof u == "object" && typeof u.getAttributeType == "function" && !p) switch (u.getAttributeType(r, a)) {
      case "TrustedHTML":
        return M(h);
      case "TrustedScriptURL":
        return ve(h);
    }
    return h;
  }, _r = function(r, a, p, h) {
    try {
      return p ? r.setAttributeNS(p, a, h) : r.setAttribute(a, h), wt(r) ? (Ae(r), !1) : !0;
    } catch {
      return ke(a, r), !1;
    }
  }, Jn = function(r, a) {
    return Oe && K(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, a) ? !0 : Ce(r) === "attributename" && wi(a, "href") !== null;
  }, Qt = function(r, a) {
    if (he(R.beforeSanitizeAttributes, r, null), $e(r, a)) return;
    const p = r.attributes;
    if (!p || wt(r)) return;
    N = Kn(R.uponSanitizeAttribute, N, G, pt);
    const h = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: N,
      forceKeepAttr: void 0
    };
    let A = p.length;
    const b = z(r.nodeName);
    for (; A--; ) {
      const S = p[A], X = S.name, ge = S.namespaceURI, ee = S.value, re = z(X), Be = ee;
      let oe = X === "value" ? Be : fo(Be), ei = !1;
      if (h.attrName = re, h.attrValue = oe, h.keepAttr = !0, h.forceKeepAttr = void 0, he(R.uponSanitizeAttribute, r, h), oe = h.attrValue, Cn && (re === "id" || re === "name") && Ai(oe, xn) !== 0 && (ke(X, r, S), oe = xn + oe, ei = !0), Jn(X, oe)) {
        ke(X, r, S);
        continue;
      }
      if (!h.forceKeepAttr) {
        if (!h.keepAttr) {
          ke(X, r, S);
          continue;
        }
        if (!Se && K(Di, oe)) {
          ke(X, r, S);
          continue;
        }
        if (de && (oe = _t(oe)), !Qn(b, re, oe)) {
          ke(X, r, S);
          continue;
        }
        oe = Tr(b, re, ge, oe), oe !== Be && _r(r, X, ge, oe) && ei && _i(t.removed);
      }
    }
    he(R.afterSanitizeAttributes, r, null), $e(r, a);
  }, nt = function(r) {
    let a = null;
    const p = Wt(r);
    for (he(R.beforeSanitizeShadowDOM, r, null); a = p.nextNode(); )
      if (he(R.uponSanitizeShadowNode, a, null), Kt(a, r), Qt(a, r), ye(a.content) && nt(a.content), ie(a) === V.element) {
        const h = Z(a);
        ye(h) && (Zt(h), nt(h));
      }
    de && Yn(r), he(R.afterSanitizeShadowDOM, r, null);
  }, Zt = function(r) {
    const a = [{
      node: r,
      shadow: null
    }];
    for (; a.length > 0; ) {
      const p = a.pop();
      if (p.shadow) {
        nt(p.shadow);
        continue;
      }
      const h = p.node, A = ie(h) === V.element, b = q(h);
      if (b) for (let S = b.length - 1; S >= 0; --S) a.push({
        node: b[S],
        shadow: null
      });
      if (A) {
        const S = B ? B(h) : null;
        if (typeof S == "string" && z(S) === "template") {
          const X = h.content;
          ye(X) && a.push({
            node: X,
            shadow: null
          });
        }
      }
      if (A) {
        const S = Z(h);
        ye(S) && a.push({
          node: null,
          shadow: S
        }, {
          node: S,
          shadow: null
        });
      }
    }
  };
  return t.sanitize = function(E) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, a = null, p = null, h = null, A = null;
    if ($t = !E, $t && (E = "<!-->"), typeof E != "string" && !tt(E) && (E = Eo(E), typeof E != "string"))
      throw we("dirty is not a string, aborting");
    if (!t.isSupported) return E;
    Pt ? (s = mt, N = pt) : jt(r), (R.uponSanitizeElement.length > 0 || R.uponSanitizeAttribute.length > 0) && (s = ce(s)), R.uponSanitizeAttribute.length > 0 && (N = ce(N)), t.removed = [];
    const b = kt && typeof E != "string" && tt(E);
    let S = [];
    const X = De;
    if (b) {
      pr(E);
      const re = J(E);
      if (typeof re == "string") {
        const Be = z(re);
        if (!s[Be] || j[Be])
          throw Vt(E), we("root node is forbidden and cannot be sanitized in-place");
      }
      if (wt(E))
        throw Vt(E), we("root node is clobbered and cannot be sanitized in-place");
      S = qt(E), De = ln();
    } else if (tt(E))
      a = Wn("<!---->"), p = a.ownerDocument.importNode(E, !0), p.nodeType === V.element && p.nodeName === "BODY" || p.nodeName === "HTML" ? a = p : a.appendChild(p), Zt(a);
    else {
      if (!Me && !de && !Re && E.indexOf("<") === -1) return Y && Et ? M(E) : E;
      if (a = Wn(E), !a) return Me ? null : Et ? ae : "";
    }
    a && Ft && Ae(a.firstChild);
    const ge = b ? E : a;
    try {
      b && Zt(E);
      const re = Wt(ge);
      for (; h = re.nextNode(); )
        Kt(h, ge), Qt(h, ge), ye(h.content) && nt(h.content);
      b && fr(E, S);
    } catch (re) {
      throw b && (Vt(E), Xn(E, S)), re;
    } finally {
      De = X;
    }
    if (b) {
      if (Xn(E, S)) throw we("a node selected for removal could not be safely returned; refusing to sanitize in place");
      return de && Yt(E), E;
    }
    if (Me) {
      if (de && Yt(a), ht)
        for (A = Lt.call(a.ownerDocument); a.firstChild; ) A.appendChild(a.firstChild);
      else A = a;
      return (N.shadowroot || N.shadowrootmode) && (A = Ye.call(c, A, !0)), A;
    }
    let ee = Re ? a.outerHTML : a.innerHTML;
    return Re && s["!doctype"] && a.ownerDocument && a.ownerDocument.doctype && a.ownerDocument.doctype.name && K(Oo, a.ownerDocument.doctype.name) && (ee = "<!DOCTYPE " + a.ownerDocument.doctype.name + `>
` + ee), de && (ee = _t(ee)), Y && Et ? M(ee) : ee;
  }, t.setConfig = function() {
    let E = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    jt(E), Pt = !0, mt = s, pt = N;
  }, t.clearConfig = function() {
    Ue = null, Pt = !1, mt = null, pt = null, Y = Xe, ae = "";
  }, t.isValidAttribute = function(E, r, a) {
    Ue || jt({});
    const p = z(E), h = z(r);
    return typeof a == "string" && (Jn(r, a) || !Se && K(Di, a)) ? !1 : Qn(p, h, a);
  }, t.addHook = function(E, r) {
    typeof r == "function" && se(R, E) && rt(R[E], r);
  }, t.removeHook = function(E, r) {
    if (se(R, E)) {
      if (r !== void 0) {
        const a = co(R[E], r);
        return a === -1 ? void 0 : uo(R[E], a, 1)[0];
      }
      return _i(R[E]);
    }
  }, t.removeHooks = function(E) {
    se(R, E) && (R[E] = []);
  }, t.removeAllHooks = function() {
    R = Li();
  }, t;
}
var Mo = Ki();
var Tn, Ci;
function Po() {
  if (Ci) return Tn;
  Ci = 1;
  var e = /["'&<>]/;
  Tn = t;
  function t(o) {
    var c = "" + o, f = e.exec(c);
    if (!f)
      return c;
    var g, T = "", y = 0, m = 0;
    for (y = f.index; y < c.length; y++) {
      switch (c.charCodeAt(y)) {
        case 34:
          g = "&quot;";
          break;
        case 38:
          g = "&amp;";
          break;
        case 39:
          g = "&#39;";
          break;
        case 60:
          g = "&lt;";
          break;
        case 62:
          g = "&gt;";
          break;
        default:
          continue;
      }
      m !== y && (T += c.substring(m, y)), m = y + 1, T += g;
    }
    return m !== y ? T + c.substring(m, y) : T;
  }
  return Tn;
}
var Fo = Po();
const xi = /* @__PURE__ */ Ot(Fo);
function Uo() {
  return globalThis._nc_l10n_locale;
}
function Qi() {
  return Uo().replaceAll(/_/g, "-");
}
function He() {
  return globalThis._nc_l10n_language;
}
function us(e) {
  const t = He();
  return [
    "ae",
    // Avestan
    "ar",
    // 'العربية', Arabic
    "arc",
    // Aramaic
    "arz",
    // 'مصرى', Egyptian
    "bcc",
    // 'بلوچی مکرانی', Southern Balochi
    "bqi",
    // 'بختياري', Bakthiari
    "ckb",
    // 'Soranî / کوردی', Sorani
    "dv",
    // Dhivehi
    "fa",
    // 'فارسی', Persian
    "glk",
    // 'گیلکی', Gilaki
    "ha",
    // 'هَوُسَ', Hausa
    "he",
    // 'עברית', Hebrew
    "khw",
    // 'کھوار', Khowar
    "ks",
    // 'कॉशुर / کٲشُر', Kashmiri
    "ku",
    // 'Kurdî / كوردی', Kurdish
    "mzn",
    // 'مازِرونی', Mazanderani
    "nqo",
    // 'ߒߞߏ', N’Ko
    "pnb",
    // 'پنجابی', Western Punjabi
    "ps",
    // 'پښتو', Pashto,
    "sd",
    // 'سنڌي', Sindhi
    "ug",
    // 'Uyghurche / ئۇيغۇرچە', Uyghur
    "ur",
    // 'اردو', Urdu
    "ur-PK",
    // 'اردو', Urdu (nextcloud BCP47 variant)
    "uz-AF",
    // 'اوزبیکی', Uzbek Afghan
    "yi"
    // 'ייִדיש', Yiddish
  ].includes(t);
}
globalThis._nc_l10n_locale ??= typeof document < "u" && document.documentElement.dataset.locale || Intl.DateTimeFormat().resolvedOptions().locale.replaceAll(/-/g, "_");
globalThis._nc_l10n_language ??= typeof document < "u" && document.documentElement.lang || (globalThis.navigator?.language ?? "en");
function Zi(e) {
  return {
    translations: globalThis._oc_l10n_registry_translations[e] ?? {},
    pluralFunction: globalThis._oc_l10n_registry_plural_functions[e] ?? ((t) => t)
  };
}
globalThis._oc_l10n_registry_translations ??= {};
globalThis._oc_l10n_registry_plural_functions ??= {};
function _n(e, t, o, c, f) {
  const g = typeof o == "object" ? o : void 0, T = typeof c == "number" ? c : typeof o == "number" ? o : void 0, y = {
    // defaults
    escape: !0,
    sanitize: !0,
    // overwrite with user config
    ...typeof f == "object" ? f : typeof c == "object" ? c : {}
  }, m = (w) => w, v = (y.sanitize ? Mo.sanitize : m) || m, u = y.escape ? xi : m, _ = (w) => typeof w == "string" || typeof w == "number", I = (w, q, U) => w.replace(/%n/g, "" + U).replace(/{([^{}]*)}/g, (Z, pe) => {
    if (q === void 0 || !(pe in q))
      return u(Z);
    const $ = q[pe];
    return _($) ? u(`${$}`) : typeof $ == "object" && _($.value) ? ($.escape !== !1 ? xi : m)(`${$.value}`) : u(Z);
  });
  let x = (f?.bundle ?? Zi(e)).translations[t] || t;
  return x = Array.isArray(x) ? x[0] : x, v(typeof g == "object" || T !== void 0 ? I(
    x,
    g,
    T
  ) : x);
}
function fs(e, t, o, c, f, g) {
  const T = "_" + t + "_::_" + o + "_", y = g?.bundle ?? Zi(e), m = y.translations[T];
  if (typeof m < "u") {
    const v = m;
    if (Array.isArray(v)) {
      const u = y.pluralFunction(c);
      return _n(e, v[u], f, c, g);
    }
  }
  return c === 1 ? _n(e, t, f, c, g) : _n(e, o, f, c, g);
}
function ds(e, t = He()) {
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
    case "zh":
      return 0;
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
    case "zu":
      return e === 1 ? 0 : 1;
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
    case "wa":
      return e === 0 || e === 1 ? 0 : 1;
    case "be":
    case "bs":
    case "hr":
    case "ru":
    case "sh":
    case "sr":
    case "uk":
      return e % 10 === 1 && e % 100 !== 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
    case "cs":
    case "sk":
      return e === 1 ? 0 : e >= 2 && e <= 4 ? 1 : 2;
    case "ga":
      return e === 1 ? 0 : e === 2 ? 1 : 2;
    case "lt":
      return e % 10 === 1 && e % 100 !== 11 ? 0 : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
    case "sl":
      return e % 100 === 1 ? 0 : e % 100 === 2 ? 1 : e % 100 === 3 || e % 100 === 4 ? 2 : 3;
    case "mk":
      return e % 10 === 1 ? 0 : 1;
    case "mt":
      return e === 1 ? 0 : e === 0 || e % 100 > 1 && e % 100 < 11 ? 1 : e % 100 > 10 && e % 100 < 20 ? 2 : 3;
    case "lv":
      return e === 0 ? 0 : e % 10 === 1 && e % 100 !== 11 ? 1 : 2;
    case "pl":
      return e === 1 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 12 || e % 100 > 14) ? 1 : 2;
    case "cy":
      return e === 1 ? 0 : e === 2 ? 1 : e === 8 || e === 11 ? 2 : 3;
    case "ro":
      return e === 1 ? 0 : e === 0 || e % 100 > 0 && e % 100 < 20 ? 1 : 2;
    case "ar":
      return e === 0 ? 0 : e === 1 ? 1 : e === 2 ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 && e % 100 <= 99 ? 4 : 5;
    default:
      return 0;
  }
}
function ms(e = Date.now(), t = {}) {
  const o = {
    ignoreSeconds: !1,
    language: He(),
    relativeTime: "long",
    ...t
  }, c = new Date(e), f = new Intl.RelativeTimeFormat([o.language, He()], { numeric: "auto", style: o.relativeTime }), T = (c.getTime() - Date.now()) / 1e3;
  if (Math.abs(T) < 59.5)
    return o.ignoreSeconds || f.format(Math.round(T), "second");
  const y = T / 60;
  if (Math.abs(y) <= 59)
    return f.format(Math.round(y), "minute");
  const m = y / 60;
  if (Math.abs(m) < 23.5)
    return f.format(Math.round(m), "hour");
  const v = m / 24;
  if (Math.abs(v) < 6.5)
    return f.format(Math.round(v), "day");
  if (Math.abs(v) < 27.5) {
    const O = v / 7;
    return f.format(Math.round(O), "week");
  }
  const u = v / 30, _ = Math.abs(u) < 11 ? { month: o.relativeTime, day: "numeric" } : { year: o.relativeTime === "narrow" ? "2-digit" : "numeric", month: o.relativeTime };
  return new Intl.DateTimeFormat([o.language, He()], _).format(c);
}
function Mi(e) {
  return e instanceof Date ? e.toISOString() : String(e);
}
function ko(e, t, o) {
  t = t ?? [(g) => g], o = o ?? [];
  const c = t.map((g, T) => (o[T] ?? "asc") === "asc" ? 1 : -1), f = Intl.Collator(
    [He(), Qi()],
    {
      // handle 10 as ten and not as one-zero
      numeric: !0,
      usage: "sort"
    }
  );
  return [...e].sort((g, T) => {
    for (const [y, m] of t.entries()) {
      const v = f.compare(Mi(m(g)), Mi(m(T)));
      if (v !== 0)
        return v * c[y];
    }
    return 0;
  });
}
const ct = Object.freeze({
  Name: "basename",
  Modified: "mtime",
  Size: "size"
});
function ps(e, t = {}) {
  const o = {
    // Default to sort by name
    sortingMode: ct.Name,
    // Default to sort ascending
    sortingOrder: "asc",
    ...t
  };
  function c(T) {
    const y = T.displayname || T.attributes?.displayname || T.basename || "";
    return T.type === Dn.Folder ? y : y.lastIndexOf(".") > 0 ? y.slice(0, y.lastIndexOf(".")) : y;
  }
  const f = [
    // 1: Sort favorites first if enabled
    ...o.sortFavoritesFirst ? [(T) => T.attributes?.favorite !== 1] : [],
    // 2: Sort folders first if sorting by name
    ...o.sortFoldersFirst ? [(T) => T.type !== "folder"] : [],
    // 3: Use sorting mode if NOT basename (to be able to use display name too)
    ...o.sortingMode !== ct.Name ? [(T) => T[o.sortingMode] ?? T.attributes[o.sortingMode]] : [],
    // 4: Use display name if available, fallback to name
    (T) => c(T),
    // 5: Finally, use basename if all previous sorting methods failed
    (T) => T.basename
  ], g = [
    // (for 1): always sort favorites before normal files
    ...o.sortFavoritesFirst ? ["asc"] : [],
    // (for 2): always sort folders before files
    ...o.sortFoldersFirst ? ["asc"] : [],
    // (for 3): Reverse if sorting by mtime as mtime higher means edited more recent -> lower
    ...o.sortingMode === ct.Modified ? [o.sortingOrder === "asc" ? "desc" : "asc"] : [],
    // (also for 3 so make sure not to conflict with 2 and 3)
    ...o.sortingMode !== ct.Modified && o.sortingMode !== ct.Name ? [o.sortingOrder] : [],
    // for 4: use configured sorting direction
    o.sortingOrder,
    // for 5: use configured sorting direction
    o.sortingOrder
  ];
  return ko(e, f, g);
}
class hs extends Dt {
  constructor(...[t, o]) {
    super({
      ...t,
      mime: "httpd/unix-directory"
    }, o);
  }
  get type() {
    return Dn.Folder;
  }
  get extension() {
    return null;
  }
  get mime() {
    return "httpd/unix-directory";
  }
}
function $o(e, t, o) {
  const c = `#initial-state-${e}-${t}`;
  if (window._nc_initial_state?.has(c))
    return window._nc_initial_state.get(c);
  window._nc_initial_state || (window._nc_initial_state = /* @__PURE__ */ new Map());
  const f = document.querySelector(c);
  if (f === null) {
    if (o !== void 0)
      return o;
    throw new Error(`Could not find initial state ${t} of ${e}`);
  }
  try {
    const g = JSON.parse(atob(f.value));
    return window._nc_initial_state.set(c, g), g;
  } catch (g) {
    if (console.error("[@nextcloud/initial-state] Could not parse initial state", { key: t, app: e, error: g }), o !== void 0)
      return o;
    throw new Error(`Could not parse initial state ${t} of ${e}`, { cause: g });
  }
}
function Bo() {
  try {
    return $o("core", "capabilities");
  } catch {
    return console.debug("Could not find capabilities initial state fall back to _oc_capabilities"), "_oc_capabilities" in window ? window._oc_capabilities : {};
  }
}
const It = Object.freeze({
  ReservedName: "reserved name",
  Character: "character",
  Extension: "extension"
});
class Nt extends Error {
  constructor(t) {
    super(`Invalid ${t.reason} '${t.segment}' in filename '${t.filename}'`, { cause: t });
  }
  /**
   * The filename that was validated
   */
  get filename() {
    return this.cause.filename;
  }
  /**
   * Reason why the validation failed
   */
  get reason() {
    return this.cause.reason;
  }
  /**
   * Part of the filename that caused this error
   */
  get segment() {
    return this.cause.segment;
  }
}
function Es(e) {
  const t = Bo().files, o = t.forbidden_filename_characters ?? ["/", "\\"];
  for (const m of o)
    if (e.includes(m))
      throw new Nt({ segment: m, reason: It.Character, filename: e });
  if (e = e.toLocaleLowerCase(), (t.forbidden_filenames ?? [".htaccess"]).includes(e))
    throw new Nt({ filename: e, segment: e, reason: It.ReservedName });
  const f = e.indexOf(".", 1), g = e.substring(0, f === -1 ? void 0 : f);
  if ((t.forbidden_filename_basenames ?? []).includes(g))
    throw new Nt({ filename: e, segment: g, reason: It.ReservedName });
  const y = t.forbidden_filename_extensions ?? [];
  for (const m of y)
    if (e.length > m.length && e.endsWith(m))
      throw new Nt({ segment: m, reason: It.Extension, filename: e });
}
var wn = {};
const Go = {}, zo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Go
}, Symbol.toStringTag, { value: "Module" })), jo = /* @__PURE__ */ Ar(zo);
var Pi;
function Vo() {
  return Pi || (Pi = 1, (function(e) {
    (function(t) {
      t.parser = function(i, n) {
        return new c(i, n);
      }, t.SAXParser = c, t.SAXStream = _, t.createStream = v, t.MAX_BUFFER_LENGTH = 64 * 1024;
      var o = [
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
      t.EVENTS = [
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
      function c(i, n) {
        if (!(this instanceof c))
          return new c(i, n);
        var d = this;
        g(d), d.q = d.c = "", d.bufferCheckPosition = t.MAX_BUFFER_LENGTH, d.encoding = null, d.opt = n || {}, d.opt.lowercase = d.opt.lowercase || d.opt.lowercasetags, d.looseCase = d.opt.lowercase ? "toLowerCase" : "toUpperCase", d.opt.maxEntityCount = d.opt.maxEntityCount || 512, d.opt.maxEntityDepth = d.opt.maxEntityDepth || 4, d.entityCount = d.entityDepth = 0, d.tags = [], d.closed = d.closedRoot = d.sawRoot = !1, d.tag = d.error = null, d.strict = !!i, d.noscript = !!(i || d.opt.noscript), d.state = l.BEGIN, d.strictEntities = d.opt.strictEntities, d.ENTITIES = d.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), d.attribList = [], d.opt.xmlns && (d.ns = Object.create(q)), d.opt.unquotedAttributeValues === void 0 && (d.opt.unquotedAttributeValues = !i), d.trackPosition = d.opt.position !== !1, d.trackPosition && (d.position = d.line = d.column = 0), ae(d, "onready");
      }
      Object.create || (Object.create = function(i) {
        function n() {
        }
        n.prototype = i;
        var d = new n();
        return d;
      }), Object.keys || (Object.keys = function(i) {
        var n = [];
        for (var d in i) i.hasOwnProperty(d) && n.push(d);
        return n;
      });
      function f(i) {
        for (var n = Math.max(t.MAX_BUFFER_LENGTH, 10), d = 0, s = 0, D = o.length; s < D; s++) {
          var N = i[o[s]].length;
          if (N > n)
            switch (o[s]) {
              case "textNode":
                ve(i);
                break;
              case "cdata":
                M(i, "oncdata", i.cdata), i.cdata = "";
                break;
              case "script":
                M(i, "onscript", i.script), i.script = "";
                break;
              default:
                le(i, "Max buffer length exceeded: " + o[s]);
            }
          d = Math.max(d, N);
        }
        var G = t.MAX_BUFFER_LENGTH - d;
        i.bufferCheckPosition = G + i.position;
      }
      function g(i) {
        for (var n = 0, d = o.length; n < d; n++)
          i[o[n]] = "";
      }
      function T(i) {
        ve(i), i.cdata !== "" && (M(i, "oncdata", i.cdata), i.cdata = ""), i.script !== "" && (M(i, "onscript", i.script), i.script = "");
      }
      c.prototype = {
        end: function() {
          xe(this);
        },
        write: Mt,
        resume: function() {
          return this.error = null, this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          T(this);
        }
      };
      var y;
      try {
        y = jo.Stream;
      } catch {
        y = function() {
        };
      }
      y || (y = function() {
      });
      var m = t.EVENTS.filter(function(i) {
        return i !== "error" && i !== "end";
      });
      function v(i, n) {
        return new _(i, n);
      }
      function u(i, n) {
        if (i.length >= 2) {
          if (i[0] === 255 && i[1] === 254)
            return "utf-16le";
          if (i[0] === 254 && i[1] === 255)
            return "utf-16be";
        }
        return i.length >= 3 && i[0] === 239 && i[1] === 187 && i[2] === 191 ? "utf8" : i.length >= 4 ? i[0] === 60 && i[1] === 0 && i[2] === 63 && i[3] === 0 ? "utf-16le" : i[0] === 0 && i[1] === 60 && i[2] === 0 && i[3] === 63 ? "utf-16be" : "utf8" : n ? "utf8" : null;
      }
      function _(i, n) {
        if (!(this instanceof _))
          return new _(i, n);
        y.apply(this), this._parser = new c(i, n), this.writable = !0, this.readable = !0;
        var d = this;
        this._parser.onend = function() {
          d.emit("end");
        }, this._parser.onerror = function(s) {
          d.emit("error", s), d._parser.error = null;
        }, this._decoder = null, this._decoderBuffer = null, m.forEach(function(s) {
          Object.defineProperty(d, "on" + s, {
            get: function() {
              return d._parser["on" + s];
            },
            set: function(D) {
              if (!D)
                return d.removeAllListeners(s), d._parser["on" + s] = D, D;
              d.on(s, D);
            },
            enumerable: !0,
            configurable: !1
          });
        });
      }
      _.prototype = Object.create(y.prototype, {
        constructor: {
          value: _
        }
      }), _.prototype._decodeBuffer = function(i, n) {
        if (this._decoderBuffer && (i = Buffer.concat([this._decoderBuffer, i]), this._decoderBuffer = null), !this._decoder) {
          var d = u(i, n);
          if (!d)
            return this._decoderBuffer = i, "";
          this._parser.encoding = d, this._decoder = new TextDecoder(d);
        }
        return this._decoder.decode(i, { stream: !n });
      }, _.prototype.write = function(i) {
        if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(i))
          i = this._decodeBuffer(i, !1);
        else if (this._decoderBuffer) {
          var n = this._decodeBuffer(Buffer.alloc(0), !0);
          n && (this._parser.write(n), this.emit("data", n));
        }
        return this._parser.write(i.toString()), this.emit("data", i), !0;
      }, _.prototype.end = function(i) {
        if (i && i.length && this.write(i), this._decoderBuffer) {
          var n = this._decodeBuffer(Buffer.alloc(0), !0);
          n && (this._parser.write(n), this.emit("data", n));
        } else if (this._decoder) {
          var d = this._decoder.decode();
          d && (this._parser.write(d), this.emit("data", d));
        }
        return this._parser.end(), !0;
      }, _.prototype.on = function(i, n) {
        var d = this;
        return !d._parser["on" + i] && m.indexOf(i) !== -1 && (d._parser["on" + i] = function() {
          var s = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          s.splice(0, 0, i), d.emit.apply(d, s);
        }), y.prototype.on.call(d, i, n);
      };
      var I = /^\[CDATA\[$/i, O = /^DOCTYPE$/i, x = "http://www.w3.org/XML/1998/namespace", w = "http://www.w3.org/2000/xmlns/", q = { xml: x, xmlns: w }, U = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, Z = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, pe = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, $ = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function B(i) {
        return i === " " || i === `
` || i === "\r" || i === "	";
      }
      function Te(i) {
        return i === '"' || i === "'";
      }
      function ie(i) {
        return i === ">" || B(i);
      }
      function J(i, n) {
        return i.test(n);
      }
      function lt(i, n) {
        return !J(i, n);
      }
      var l = 0;
      t.STATE = {
        BEGIN: l++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: l++,
        // leading whitespace
        TEXT: l++,
        // general stuff
        TEXT_ENTITY: l++,
        // &amp and such.
        OPEN_WAKA: l++,
        // <
        SGML_DECL: l++,
        // <!BLARG
        SGML_DECL_QUOTED: l++,
        // <!BLARG foo "bar
        DOCTYPE: l++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: l++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: l++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: l++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: l++,
        // <!-
        COMMENT: l++,
        // <!--
        COMMENT_ENDING: l++,
        // <!-- blah -
        COMMENT_ENDED: l++,
        // <!-- blah --
        CDATA: l++,
        // <![CDATA[ something
        CDATA_ENDING: l++,
        // ]
        CDATA_ENDING_2: l++,
        // ]]
        PROC_INST: l++,
        // <?hi
        PROC_INST_BODY: l++,
        // <?hi there
        PROC_INST_ENDING: l++,
        // <?hi "there" ?
        OPEN_TAG: l++,
        // <strong
        OPEN_TAG_SLASH: l++,
        // <strong /
        ATTRIB: l++,
        // <a
        ATTRIB_NAME: l++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: l++,
        // <a foo _
        ATTRIB_VALUE: l++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: l++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: l++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: l++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: l++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: l++,
        // <foo bar=&quot
        CLOSE_TAG: l++,
        // </a
        CLOSE_TAG_SAW_WHITE: l++,
        // </a   >
        SCRIPT: l++,
        // <script> ...
        SCRIPT_ENDING: l++
        // <script> ... <
      }, t.XML_ENTITIES = Object.assign(/* @__PURE__ */ Object.create(null), {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }), t.ENTITIES = Object.assign(/* @__PURE__ */ Object.create(null), {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
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
      }), Object.keys(t.ENTITIES).forEach(function(i) {
        var n = t.ENTITIES[i], d = typeof n == "number" ? String.fromCharCode(n) : n;
        t.ENTITIES[i] = d;
      });
      for (var Y in t.STATE)
        t.STATE[t.STATE[Y]] = Y;
      l = t.STATE;
      function ae(i, n, d) {
        i[n] && i[n](d);
      }
      function Xe(i) {
        var n = i && i.match(/(?:^|\s)encoding\s*=\s*(['"])([^'"]+)\1/i);
        return n ? n[2] : null;
      }
      function qe(i) {
        return i ? i.toLowerCase().replace(/[^a-z0-9]/g, "") : null;
      }
      function Ne(i, n) {
        const d = qe(i), s = qe(n);
        return !d || !s ? !0 : s === "utf16" ? d === "utf16le" || d === "utf16be" : d === s;
      }
      function ut(i, n) {
        if (!(!i.strict || !i.encoding || !n || n.name !== "xml")) {
          var d = Xe(n.body);
          d && !Ne(i.encoding, d) && C(
            i,
            "XML declaration encoding " + d + " does not match detected stream encoding " + i.encoding.toUpperCase()
          );
        }
      }
      function M(i, n, d) {
        i.textNode && ve(i), ae(i, n, d);
      }
      function ve(i) {
        i.textNode = ft(i.opt, i.textNode), i.textNode && ae(i, "ontext", i.textNode), i.textNode = "";
      }
      function ft(i, n) {
        return i.trim && (n = n.trim()), i.normalize && (n = n.replace(/\s+/g, " ")), n;
      }
      function le(i, n) {
        return ve(i), i.trackPosition && (n += `
Line: ` + i.line + `
Column: ` + i.column + `
Char: ` + i.c), n = new Error(n), i.error = n, ae(i, "onerror", n), i;
      }
      function xe(i) {
        return i.sawRoot && !i.closedRoot && C(i, "Unclosed root tag"), i.state !== l.BEGIN && i.state !== l.BEGIN_WHITESPACE && i.state !== l.TEXT && le(i, "Unexpected end"), ve(i), i.c = "", i.closed = !0, ae(i, "onend"), c.call(i, i.strict, i.opt), i;
      }
      function C(i, n) {
        if (typeof i != "object" || !(i instanceof c))
          throw new Error("bad call to strictFail");
        i.strict && le(i, n);
      }
      function Lt(i) {
        i.strict || (i.tagName = i.tagName[i.looseCase]());
        var n = i.tags[i.tags.length - 1] || i, d = i.tag = { name: i.tagName, attributes: {} };
        i.opt.xmlns && (d.ns = n.ns), i.attribList.length = 0, M(i, "onopentagstart", d);
      }
      function We(i, n) {
        var d = i.indexOf(":"), s = d < 0 ? ["", i] : i.split(":"), D = s[0], N = s[1];
        return n && i === "xmlns" && (D = "xmlns", N = ""), { prefix: D, local: N };
      }
      function Ye(i) {
        if (i.strict || (i.attribName = i.attribName[i.looseCase]()), i.attribList.indexOf(i.attribName) !== -1 || i.tag.attributes.hasOwnProperty(i.attribName)) {
          i.attribName = i.attribValue = "";
          return;
        }
        if (i.opt.xmlns) {
          var n = We(i.attribName, !0), d = n.prefix, s = n.local;
          if (d === "xmlns")
            if (s === "xml" && i.attribValue !== x)
              C(
                i,
                "xml: prefix must be bound to " + x + `
Actual: ` + i.attribValue
              );
            else if (s === "xmlns" && i.attribValue !== w)
              C(
                i,
                "xmlns: prefix must be bound to " + w + `
Actual: ` + i.attribValue
              );
            else {
              var D = i.tag, N = i.tags[i.tags.length - 1] || i;
              D.ns === N.ns && (D.ns = Object.create(N.ns)), D.ns[s] = i.attribValue;
            }
          i.attribList.push([i.attribName, i.attribValue]);
        } else
          i.tag.attributes[i.attribName] = i.attribValue, M(i, "onattribute", {
            name: i.attribName,
            value: i.attribValue
          });
        i.attribName = i.attribValue = "";
      }
      function R(i, n) {
        if (i.opt.xmlns) {
          var d = i.tag, s = We(i.tagName);
          d.prefix = s.prefix, d.local = s.local, d.uri = d.ns[s.prefix] || "", d.prefix && !d.uri && (C(
            i,
            "Unbound namespace prefix: " + JSON.stringify(i.tagName)
          ), d.uri = s.prefix);
          var D = i.tags[i.tags.length - 1] || i;
          d.ns && D.ns !== d.ns && Object.keys(d.ns).forEach(function(de) {
            M(i, "onopennamespace", {
              prefix: de,
              uri: d.ns[de]
            });
          });
          for (var N = 0, G = i.attribList.length; N < G; N++) {
            var F = i.attribList[N], j = F[0], ue = F[1], P = We(j, !0), fe = P.prefix, Ze = P.local, Je = fe === "" ? "" : d.ns[fe] || "", Se = {
              name: j,
              value: ue,
              prefix: fe,
              local: Ze,
              uri: Je
            };
            fe && fe !== "xmlns" && !Je && (C(
              i,
              "Unbound namespace prefix: " + JSON.stringify(fe)
            ), Se.uri = fe), i.tag.attributes[j] = Se, M(i, "onattribute", Se);
          }
          i.attribList.length = 0;
        }
        i.tag.isSelfClosing = !!n, i.sawRoot = !0, i.tags.push(i.tag), M(i, "onopentag", i.tag), n || (!i.noscript && i.tagName.toLowerCase() === "script" ? i.state = l.SCRIPT : i.state = l.TEXT, i.tag = null, i.tagName = ""), i.attribName = i.attribValue = "", i.attribList.length = 0;
      }
      function Ke(i) {
        if (!i.tagName) {
          C(i, "Weird empty close tag."), i.textNode += "</>", i.state = l.TEXT;
          return;
        }
        if (i.script) {
          if (i.tagName !== "script") {
            i.script += "</" + i.tagName + ">", i.tagName = "", i.state = l.SCRIPT;
            return;
          }
          M(i, "onscript", i.script), i.script = "";
        }
        var n = i.tags.length, d = i.tagName;
        i.strict || (d = d[i.looseCase]());
        for (var s = d; n--; ) {
          var D = i.tags[n];
          if (D.name !== s)
            C(i, "Unexpected close tag");
          else
            break;
        }
        if (n < 0) {
          C(i, "Unmatched closing tag: " + i.tagName), i.textNode += "</" + i.tagName + ">", i.state = l.TEXT;
          return;
        }
        i.tagName = d;
        for (var N = i.tags.length; N-- > n; ) {
          var G = i.tag = i.tags.pop();
          i.tagName = i.tag.name, M(i, "onclosetag", i.tagName);
          var F = {};
          for (var j in G.ns)
            F[j] = G.ns[j];
          var ue = i.tags[i.tags.length - 1] || i;
          i.opt.xmlns && G.ns !== ue.ns && Object.keys(G.ns).forEach(function(P) {
            var fe = G.ns[P];
            M(i, "onclosenamespace", { prefix: P, uri: fe });
          });
        }
        n === 0 && (i.closedRoot = !0), i.tagName = i.attribValue = i.attribName = "", i.attribList.length = 0, i.state = l.TEXT;
      }
      function Ct(i) {
        var n = i.entity, d = n.toLowerCase(), s, D = "";
        return i.ENTITIES[n] ? i.ENTITIES[n] : i.ENTITIES[d] ? i.ENTITIES[d] : (n = d, n.charAt(0) === "#" && (n.charAt(1) === "x" ? (n = n.slice(2), s = parseInt(n, 16), D = s.toString(16)) : (n = n.slice(1), s = parseInt(n, 10), D = s.toString(10))), n = n.replace(/^0+/, ""), isNaN(s) || D.toLowerCase() !== n || s < 0 || s > 1114111 || !xt(s) ? (C(i, "Invalid character entity"), "&" + i.entity + ";") : String.fromCodePoint(s));
      }
      function xt(i) {
        return i === 9 || i === 10 || i === 13 || i >= 32 && i <= 55295 || i >= 57344 && i <= 65533 || i >= 65536 && i <= 1114111;
      }
      function dt(i, n) {
        n === "<" ? (i.state = l.OPEN_WAKA, i.startTagPosition = i.position) : B(n) || (C(i, "Non-whitespace before first tag."), i.textNode = n, i.state = l.TEXT);
      }
      function Qe(i, n) {
        var d = "";
        return n < i.length && (d = i.charAt(n)), d;
      }
      function Mt(i) {
        var n = this;
        if (this.error)
          throw this.error;
        if (n.closed)
          return le(
            n,
            "Cannot write after close. Assign an onready handler."
          );
        if (i === null)
          return xe(n);
        typeof i == "object" && (i = i.toString());
        for (var d = 0, s = ""; s = Qe(i, d++), n.c = s, !!s; )
          switch (n.trackPosition && (n.position++, s === `
` ? (n.line++, n.column = 0) : n.column++), n.state) {
            case l.BEGIN:
              if (n.state = l.BEGIN_WHITESPACE, s === "\uFEFF")
                continue;
              dt(n, s);
              continue;
            case l.BEGIN_WHITESPACE:
              dt(n, s);
              continue;
            case l.TEXT:
              if (n.sawRoot && !n.closedRoot) {
                for (var N = d - 1; s && s !== "<" && s !== "&"; )
                  s = Qe(i, d++), s && n.trackPosition && (n.position++, s === `
` ? (n.line++, n.column = 0) : n.column++);
                n.textNode += i.substring(N, d - 1);
              }
              s === "<" && !(n.sawRoot && n.closedRoot && !n.strict) ? (n.state = l.OPEN_WAKA, n.startTagPosition = n.position) : (!B(s) && (!n.sawRoot || n.closedRoot) && C(n, "Text data outside of root node."), s === "&" ? n.state = l.TEXT_ENTITY : n.textNode += s);
              continue;
            case l.SCRIPT:
              s === "<" ? n.state = l.SCRIPT_ENDING : n.script += s;
              continue;
            case l.SCRIPT_ENDING:
              s === "/" ? n.state = l.CLOSE_TAG : (n.script += "<" + s, n.state = l.SCRIPT);
              continue;
            case l.OPEN_WAKA:
              if (s === "!")
                n.state = l.SGML_DECL, n.sgmlDecl = "";
              else if (!B(s)) if (J(U, s))
                n.state = l.OPEN_TAG, n.tagName = s;
              else if (s === "/")
                n.state = l.CLOSE_TAG, n.tagName = "";
              else if (s === "?")
                n.state = l.PROC_INST, n.procInstName = n.procInstBody = "";
              else {
                if (C(n, "Unencoded <"), n.startTagPosition + 1 < n.position) {
                  var D = n.position - n.startTagPosition;
                  s = new Array(D).join(" ") + s;
                }
                n.textNode += "<" + s, n.state = l.TEXT;
              }
              continue;
            case l.SGML_DECL:
              if (n.sgmlDecl + s === "--") {
                n.state = l.COMMENT, n.comment = "", n.sgmlDecl = "";
                continue;
              }
              n.doctype && n.doctype !== !0 && n.sgmlDecl ? (n.state = l.DOCTYPE_DTD, n.doctype += "<!" + n.sgmlDecl + s, n.sgmlDecl = "") : I.test(n.sgmlDecl + s) ? (M(n, "onopencdata"), n.state = l.CDATA, n.sgmlDecl = "", n.cdata = "") : O.test(n.sgmlDecl + s) ? (n.state = l.DOCTYPE, (n.doctype || n.sawRoot) && C(
                n,
                "Inappropriately located doctype declaration"
              ), n.doctype = "", n.sgmlDecl = "") : s === ">" ? (M(n, "onsgmldeclaration", n.sgmlDecl), n.sgmlDecl = "", n.state = l.TEXT) : (Te(s) && (n.state = l.SGML_DECL_QUOTED), n.sgmlDecl += s);
              continue;
            case l.SGML_DECL_QUOTED:
              s === n.q && (n.state = l.SGML_DECL, n.q = ""), n.sgmlDecl += s;
              continue;
            case l.DOCTYPE:
              s === ">" ? (n.state = l.TEXT, M(n, "ondoctype", n.doctype), n.doctype = !0) : (n.doctype += s, s === "[" ? n.state = l.DOCTYPE_DTD : Te(s) && (n.state = l.DOCTYPE_QUOTED, n.q = s));
              continue;
            case l.DOCTYPE_QUOTED:
              n.doctype += s, s === n.q && (n.q = "", n.state = l.DOCTYPE);
              continue;
            case l.DOCTYPE_DTD:
              s === "]" ? (n.doctype += s, n.state = l.DOCTYPE) : s === "<" ? (n.state = l.OPEN_WAKA, n.startTagPosition = n.position) : Te(s) ? (n.doctype += s, n.state = l.DOCTYPE_DTD_QUOTED, n.q = s) : n.doctype += s;
              continue;
            case l.DOCTYPE_DTD_QUOTED:
              n.doctype += s, s === n.q && (n.state = l.DOCTYPE_DTD, n.q = "");
              continue;
            case l.COMMENT:
              s === "-" ? n.state = l.COMMENT_ENDING : n.comment += s;
              continue;
            case l.COMMENT_ENDING:
              s === "-" ? (n.state = l.COMMENT_ENDED, n.comment = ft(n.opt, n.comment), n.comment && M(n, "oncomment", n.comment), n.comment = "") : (n.comment += "-" + s, n.state = l.COMMENT);
              continue;
            case l.COMMENT_ENDED:
              s !== ">" ? (C(n, "Malformed comment"), n.comment += "--" + s, n.state = l.COMMENT) : n.doctype && n.doctype !== !0 ? n.state = l.DOCTYPE_DTD : n.state = l.TEXT;
              continue;
            case l.CDATA:
              for (var N = d - 1; s && s !== "]"; )
                s = Qe(i, d++), s && n.trackPosition && (n.position++, s === `
` ? (n.line++, n.column = 0) : n.column++);
              n.cdata += i.substring(N, d - 1), s === "]" && (n.state = l.CDATA_ENDING);
              continue;
            case l.CDATA_ENDING:
              s === "]" ? n.state = l.CDATA_ENDING_2 : (n.cdata += "]" + s, n.state = l.CDATA);
              continue;
            case l.CDATA_ENDING_2:
              s === ">" ? (n.cdata && M(n, "oncdata", n.cdata), M(n, "onclosecdata"), n.cdata = "", n.state = l.TEXT) : s === "]" ? n.cdata += "]" : (n.cdata += "]]" + s, n.state = l.CDATA);
              continue;
            case l.PROC_INST:
              s === "?" ? n.state = l.PROC_INST_ENDING : B(s) ? n.state = l.PROC_INST_BODY : n.procInstName += s;
              continue;
            case l.PROC_INST_BODY:
              if (!n.procInstBody && B(s))
                continue;
              s === "?" ? n.state = l.PROC_INST_ENDING : n.procInstBody += s;
              continue;
            case l.PROC_INST_ENDING:
              if (s === ">") {
                const ue = {
                  name: n.procInstName,
                  body: n.procInstBody
                };
                ut(n, ue), M(n, "onprocessinginstruction", ue), n.procInstName = n.procInstBody = "", n.state = l.TEXT;
              } else
                n.procInstBody += "?" + s, n.state = l.PROC_INST_BODY;
              continue;
            case l.OPEN_TAG:
              J(Z, s) ? n.tagName += s : (Lt(n), s === ">" ? R(n) : s === "/" ? n.state = l.OPEN_TAG_SLASH : (B(s) || C(n, "Invalid character in tag name"), n.state = l.ATTRIB));
              continue;
            case l.OPEN_TAG_SLASH:
              s === ">" ? (R(n, !0), Ke(n)) : (C(
                n,
                "Forward-slash in opening tag not followed by >"
              ), n.state = l.ATTRIB);
              continue;
            case l.ATTRIB:
              if (B(s))
                continue;
              s === ">" ? R(n) : s === "/" ? n.state = l.OPEN_TAG_SLASH : J(U, s) ? (n.attribName = s, n.attribValue = "", n.state = l.ATTRIB_NAME) : C(n, "Invalid attribute name");
              continue;
            case l.ATTRIB_NAME:
              s === "=" ? n.state = l.ATTRIB_VALUE : s === ">" ? (C(n, "Attribute without value"), n.attribValue = n.attribName, Ye(n), R(n)) : B(s) ? n.state = l.ATTRIB_NAME_SAW_WHITE : J(Z, s) ? n.attribName += s : C(n, "Invalid attribute name");
              continue;
            case l.ATTRIB_NAME_SAW_WHITE:
              if (s === "=")
                n.state = l.ATTRIB_VALUE;
              else {
                if (B(s))
                  continue;
                C(n, "Attribute without value"), n.tag.attributes[n.attribName] = "", n.attribValue = "", M(n, "onattribute", {
                  name: n.attribName,
                  value: ""
                }), n.attribName = "", s === ">" ? R(n) : J(U, s) ? (n.attribName = s, n.state = l.ATTRIB_NAME) : (C(n, "Invalid attribute name"), n.state = l.ATTRIB);
              }
              continue;
            case l.ATTRIB_VALUE:
              if (B(s))
                continue;
              Te(s) ? (n.q = s, n.state = l.ATTRIB_VALUE_QUOTED) : (n.opt.unquotedAttributeValues || le(n, "Unquoted attribute value"), n.state = l.ATTRIB_VALUE_UNQUOTED, n.attribValue = s);
              continue;
            case l.ATTRIB_VALUE_QUOTED:
              if (s !== n.q) {
                s === "&" ? n.state = l.ATTRIB_VALUE_ENTITY_Q : n.attribValue += s;
                continue;
              }
              Ye(n), n.q = "", n.state = l.ATTRIB_VALUE_CLOSED;
              continue;
            case l.ATTRIB_VALUE_CLOSED:
              B(s) ? n.state = l.ATTRIB : s === ">" ? R(n) : s === "/" ? n.state = l.OPEN_TAG_SLASH : J(U, s) ? (C(n, "No whitespace between attributes"), n.attribName = s, n.attribValue = "", n.state = l.ATTRIB_NAME) : C(n, "Invalid attribute name");
              continue;
            case l.ATTRIB_VALUE_UNQUOTED:
              if (!ie(s)) {
                s === "&" ? n.state = l.ATTRIB_VALUE_ENTITY_U : n.attribValue += s;
                continue;
              }
              Ye(n), s === ">" ? R(n) : n.state = l.ATTRIB;
              continue;
            case l.CLOSE_TAG:
              if (n.tagName)
                s === ">" ? Ke(n) : J(Z, s) ? n.tagName += s : n.script ? (n.script += "</" + n.tagName + s, n.tagName = "", n.state = l.SCRIPT) : (B(s) || C(n, "Invalid tagname in closing tag"), n.state = l.CLOSE_TAG_SAW_WHITE);
              else {
                if (B(s))
                  continue;
                lt(U, s) ? n.script ? (n.script += "</" + s, n.state = l.SCRIPT) : C(n, "Invalid tagname in closing tag.") : n.tagName = s;
              }
              continue;
            case l.CLOSE_TAG_SAW_WHITE:
              if (B(s))
                continue;
              s === ">" ? Ke(n) : C(n, "Invalid characters in closing tag");
              continue;
            case l.TEXT_ENTITY:
            case l.ATTRIB_VALUE_ENTITY_Q:
            case l.ATTRIB_VALUE_ENTITY_U:
              var G, F;
              switch (n.state) {
                case l.TEXT_ENTITY:
                  G = l.TEXT, F = "textNode";
                  break;
                case l.ATTRIB_VALUE_ENTITY_Q:
                  G = l.ATTRIB_VALUE_QUOTED, F = "attribValue";
                  break;
                case l.ATTRIB_VALUE_ENTITY_U:
                  G = l.ATTRIB_VALUE_UNQUOTED, F = "attribValue";
                  break;
              }
              if (s === ";") {
                var j = Ct(n);
                n.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(j) ? ((n.entityCount += 1) > n.opt.maxEntityCount && le(
                  n,
                  "Parsed entity count exceeds max entity count"
                ), (n.entityDepth += 1) > n.opt.maxEntityDepth && le(
                  n,
                  "Parsed entity depth exceeds max entity depth"
                ), n.entity = "", n.state = G, n.write(j), n.entityDepth -= 1) : (n[F] += j, n.entity = "", n.state = G);
              } else J(n.entity.length ? $ : pe, s) ? n.entity += s : (C(n, "Invalid character in entity name"), n[F] += "&" + n.entity + s, n.entity = "", n.state = G);
              continue;
            default:
              throw new Error(n, "Unknown state: " + n.state);
          }
        return n.position >= n.bufferCheckPosition && f(n), n;
      }
      String.fromCodePoint || (function() {
        var i = String.fromCharCode, n = Math.floor, d = function() {
          var s = 16384, D = [], N, G, F = -1, j = arguments.length;
          if (!j)
            return "";
          for (var ue = ""; ++F < j; ) {
            var P = Number(arguments[F]);
            if (!isFinite(P) || // `NaN`, `+Infinity`, or `-Infinity`
            P < 0 || // not a valid Unicode code point
            P > 1114111 || // not a valid Unicode code point
            n(P) !== P)
              throw RangeError("Invalid code point: " + P);
            P <= 65535 ? D.push(P) : (P -= 65536, N = (P >> 10) + 55296, G = P % 1024 + 56320, D.push(N, G)), (F + 1 === j || D.length > s) && (ue += i.apply(null, D), D.length = 0);
          }
          return ue;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: d,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = d;
      })();
    })(e);
  })(wn)), wn;
}
var Ho = Vo();
const Xo = /* @__PURE__ */ Ot(Ho), qo = {
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
}, Wo = {
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
};
class Yo {
  constructor(t) {
    this.options = t ?? {}, this.firstTag = !0, this.onEnd = !1, this.parser = Xo.parser(!0, { xmlns: !0 }), this.nesting = 0, this.parser.onerror = (o) => {
      o.message.startsWith("Invalid character entity") || (this.fileType = void 0, this.onEnd = !0);
    }, this.parser.onopentag = (o) => {
      ++this.nesting, !(!this.firstTag || this.onEnd) && (this.firstTag = !1, o.uri ? this.fileType = qo[o.uri] : o.name && (this.fileType = Wo[o.name.toLowerCase()]), this.fileType && !this.options.fullScan && (this.onEnd = !0));
    }, this.parser.onclosetag = () => {
      --this.nesting;
    };
  }
  write(t) {
    this.parser.write(t);
  }
  close() {
    this.parser.close(), this.onEnd = !0;
  }
  isValid() {
    return this.nesting === 0;
  }
}
function Ko(e, { validate: t = !0 } = {}) {
  if (typeof e != "string")
    throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``);
  if (e = e.trim(), e.length === 0)
    return !1;
  const o = new Yo({ fullScan: t });
  if (t) {
    if (o.write(e), !o.isValid())
      return !1;
  } else {
    let f = 0;
    for (; e.length > f && !o.onEnd; )
      o.write(e.slice(f, Math.min(f + 128, e.length))), f += 128;
  }
  return o.fileType?.ext === "svg";
}
class gs {
  _view;
  constructor(t) {
    Ji(t), this._view = t;
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
  set icon(t) {
    this._view.icon = t;
  }
  get order() {
    return this._view.order;
  }
  set order(t) {
    this._view.order = t;
  }
  get params() {
    return this._view.params;
  }
  set params(t) {
    this._view.params = t;
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
  set expanded(t) {
    this._view.expanded = t;
  }
  get defaultSortKey() {
    return this._view.defaultSortKey;
  }
  get loadChildViews() {
    return this._view.loadChildViews;
  }
}
function Ji(e) {
  if (!e.icon || typeof e.icon != "string" || !Ko(e.icon))
    throw new Error("View icon is required and must be a valid svg string");
  if (!e.id || typeof e.id != "string")
    throw new Error("View id is required and must be a string");
  if (!e.getContents || typeof e.getContents != "function")
    throw new Error("View getContents is required and must be a function");
  if (!e.name || typeof e.name != "string")
    throw new Error("View name is required and must be a string");
  if (te(e, "caption", "string"), te(e, "columns", "array"), te(e, "defaultSortKey", "string"), te(e, "emptyCaption", "string"), te(e, "emptyTitle", "string"), te(e, "emptyView", "function"), te(e, "expanded", "boolean"), te(e, "hidden", "boolean"), te(e, "loadChildViews", "function"), te(e, "order", "number"), te(e, "params", "object"), te(e, "parent", "string"), te(e, "sticky", "boolean"), e.columns && (e.columns.forEach(wr), e.columns.reduce((o, c) => o.add(c.id), /* @__PURE__ */ new Set()).size !== e.columns.length))
    throw new Error("View columns must have unique ids");
}
class Qo extends zi {
  _views = [];
  _currentView = null;
  /**
   * Register a new view on the navigation
   *
   * @param views The views to register
   * @throws {Error} if a view with the same id is already registered
   * @throws {Error} if the registered view is invalid
   */
  register(...t) {
    for (const o of t) {
      if (this._views.find((c) => c.id === o.id))
        throw new Error(`IView id ${o.id} is already registered`);
      Ji(o);
    }
    this._views.push(...t), this.dispatchTypedEvent("update", new CustomEvent("update"));
  }
  /**
   * Remove a registered view
   *
   * @param id The id of the view to remove
   */
  remove(t) {
    const o = this._views.findIndex((c) => c.id === t);
    o !== -1 && (this._views.splice(o, 1), this.dispatchTypedEvent("update", new CustomEvent("update")));
  }
  /**
   * Set the currently active view
   *
   * @param id - The id of the view to set as active
   * @throws {Error} If no view with the given id was registered
   * @fires UpdateActiveViewEvent
   */
  setActive(t) {
    if (t === null)
      this._currentView = null;
    else {
      const c = this._views.find(({ id: f }) => f === t);
      if (!c)
        throw new Error(`No view with ${t} registered`);
      this._currentView = c;
    }
    const o = new CustomEvent("updateActive", { detail: this._currentView });
    this.dispatchTypedEvent("updateActive", o);
  }
  /**
   * The currently active files view
   */
  get active() {
    return this._currentView;
  }
  /**
   * All registered views
   */
  get views() {
    return this._views;
  }
}
function Ts() {
  return ne.navigation ??= new Qo(), ne.navigation;
}
const An = ["B", "KB", "MB", "GB", "TB", "PB"], yn = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
function _s(e, t = !1, o = !1, c = !1) {
  o = o && !c, typeof e == "string" && (e = Number(e));
  let f = e > 0 ? Math.floor(Math.log(e) / Math.log(c ? 1e3 : 1024)) : 0;
  f = Math.min((o ? yn.length : An.length) - 1, f);
  const g = o ? yn[f] : An[f];
  let T = (e / Math.pow(c ? 1e3 : 1024, f)).toFixed(1);
  return t === !0 && f === 0 ? (T !== "0.0" ? "< 1 " : "0 ") + (o ? yn[1] : An[1]) : (f < 2 ? T = parseFloat(T).toFixed(0) : T = parseFloat(T).toLocaleString(Qi()), T + " " + g);
}
function ws(e) {
  if (Zo(e), ne.fileListActions ??= /* @__PURE__ */ new Map(), ne.fileListActions.has(e.id)) {
    On.error(`FileListAction with id "${e.id}" is already registered`, { action: e });
    return;
  }
  ne.fileListActions.set(e.id, e), Rn().dispatchTypedEvent("register:listAction", new CustomEvent("register:listAction", { detail: e }));
}
function Zo(e) {
  if (!e.id || typeof e.id != "string")
    throw new Error("Invalid id");
  if (!e.displayName || typeof e.displayName != "function")
    throw new Error("Invalid displayName function");
  if ("iconSvgInline" in e && typeof e.iconSvgInline != "function")
    throw new Error("Invalid iconSvgInline function");
  if ("order" in e && typeof e.order != "number")
    throw new Error("Invalid order");
  if ("enabled" in e && typeof e.enabled != "function")
    throw new Error("Invalid enabled function");
  if (!e.exec || typeof e.exec != "function")
    throw new Error("Invalid exec function");
}
function As(e) {
  if (Jo(e), ne.fileListHeaders ??= /* @__PURE__ */ new Map(), ne.fileListHeaders.has(e.id)) {
    On.error(`Header ${e.id} already registered`, { header: e });
    return;
  }
  ne.fileListHeaders.set(e.id, e), Rn().dispatchTypedEvent("register:listHeader", new CustomEvent("register:listHeader", { detail: e }));
}
function Jo(e) {
  if (!e.id || !e.render || !e.updated)
    throw new Error("Invalid header: id, render and updated are required");
  if (typeof e.id != "string")
    throw new Error("Invalid id property");
  if (e.enabled !== void 0 && typeof e.enabled != "function")
    throw new Error("Invalid enabled property");
  if (e.render && typeof e.render != "function")
    throw new Error("Invalid render property");
  if (e.updated && typeof e.updated != "function")
    throw new Error("Invalid updated property");
}
export {
  $i as A,
  Es as B,
  It as C,
  ps as D,
  Zr as E,
  Dn as F,
  Qr as G,
  $r as H,
  Nt as I,
  ss as J,
  ns as K,
  as as L,
  Yr as M,
  Jr as N,
  As as O,
  vt as P,
  ws as Q,
  Ts as R,
  cs as S,
  di as T,
  gs as V,
  He as a,
  ds as b,
  es as c,
  fs as d,
  Bo as e,
  qr as f,
  Ot as g,
  Qi as h,
  us as i,
  ms as j,
  ji as k,
  Pr as l,
  _s as m,
  is as n,
  os as o,
  Mo as p,
  rs as q,
  $o as r,
  vn as s,
  _n as t,
  xr as u,
  jr as v,
  ne as w,
  ts as x,
  ls as y,
  hs as z
};
