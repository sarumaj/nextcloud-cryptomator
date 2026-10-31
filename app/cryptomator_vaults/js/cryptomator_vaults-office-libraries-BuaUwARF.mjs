import { J as Sc } from "./cryptomator_vaults-zip-CUMurq2b.mjs";
var Ze;
(function(e) {
  e.OfficeDocument = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument", e.FontTable = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable", e.Image = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", e.Numbering = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering", e.Styles = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles", e.StylesWithEffects = "http://schemas.microsoft.com/office/2007/relationships/stylesWithEffects", e.Theme = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme", e.Settings = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings", e.WebSettings = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/webSettings", e.Hyperlink = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", e.Footnotes = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes", e.Endnotes = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes", e.Footer = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer", e.Header = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header", e.ExtendedProperties = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties", e.CoreProperties = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties", e.CustomProperties = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/custom-properties", e.Comments = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments", e.CommentsExtended = "http://schemas.microsoft.com/office/2011/relationships/commentsExtended", e.AltChunk = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/aFChunk";
})(Ze || (Ze = {}));
function yc(e, t) {
  return t.elements(e).map((r) => ({
    id: t.attr(r, "Id"),
    type: t.attr(r, "Type"),
    target: t.attr(r, "Target"),
    targetMode: t.attr(r, "TargetMode")
  }));
}
function Cc(e) {
  return e?.replace(/[ .]+/g, "-").replace(/[&]+/g, "and").toLowerCase();
}
function Sn(e) {
  return /^[^"'].*\s.*[^"']$/.test(e) ? `'${e}'` : e;
}
function Va(e) {
  let t = e.lastIndexOf("/") + 1, r = t == 0 ? "" : e.substring(0, t), a = t == 0 ? e : e.substring(t);
  return [r, a];
}
function xn(e, t) {
  try {
    const r = "http://docx/";
    return new URL(e, r + t).toString().substring(r.length);
  } catch {
    return `${t}${e}`;
  }
}
function lt(e, t) {
  return e.reduce((r, a) => (r[t(a)] = a, r), {});
}
function bc(e) {
  return new Promise((t, r) => {
    const a = new FileReader();
    a.onloadend = () => t(a.result), a.onerror = () => r(), a.readAsDataURL(e);
  });
}
function pn(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function yn(e) {
  return typeof e == "string" || e instanceof String;
}
function Ga(e, ...t) {
  if (!t.length)
    return e;
  const r = t.shift();
  if (pn(e) && pn(r))
    for (const a in r)
      if (pn(r[a])) {
        const n = e[a] ?? (e[a] = {});
        Ga(n, r[a]);
      } else
        e[a] = r[a];
  return Ga(e, ...t);
}
function Jt(e) {
  return Array.isArray(e) ? e : [e];
}
function Pc(e, t, r) {
  return t > e ? t : r < e ? r : e;
}
const k0 = {
  wordml: "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
}, ar = {
  Dxa: { mul: 0.05, unit: "pt" },
  Emu: { mul: 1 / 12700, unit: "pt" },
  FontSize: { mul: 0.5, unit: "pt" },
  Border: { mul: 0.125, unit: "pt", min: 0.25, max: 12 },
  Point: { mul: 1, unit: "pt" },
  Percent: { mul: 0.02, unit: "%" }
};
function _0(e, t = ar.Dxa) {
  if (e == null || /.+(p[xt]|[%])$/.test(e))
    return e;
  var r = parseInt(e) * t.mul;
  return t.min && t.max && (r = Pc(r, t.min, t.max)), `${r.toFixed(2)}${t.unit}`;
}
function Nc(e, t = !1) {
  switch (e) {
    case "1":
      return !0;
    case "0":
      return !1;
    case "on":
      return !0;
    case "off":
      return !1;
    case "true":
      return !0;
    case "false":
      return !1;
    default:
      return t;
  }
}
function E0(e, t, r) {
  if (e.namespaceURI != k0.wordml)
    return !1;
  switch (e.localName) {
    case "color":
      t.color = r.attr(e, "val");
      break;
    case "sz":
      t.fontSize = r.lengthAttr(e, "val", ar.FontSize);
      break;
    default:
      return !1;
  }
  return !0;
}
function Dc(e, t = !1) {
  t && (e = e.replace(/<[?].*[?]>/, "")), e = Ic(e);
  const r = new DOMParser().parseFromString(e, "application/xml"), a = Rc(r);
  if (a)
    throw new Error(a);
  return r;
}
function Rc(e) {
  return e.getElementsByTagName("parsererror")[0]?.textContent;
}
function Ic(e) {
  return e.charCodeAt(0) === 65279 ? e.substring(1) : e;
}
function Oc(e) {
  return new XMLSerializer().serializeToString(e);
}
class w0 {
  elements(t, r = null) {
    const a = [];
    for (let n = 0, s = t.childNodes.length; n < s; n++) {
      let i = t.childNodes.item(n);
      i.nodeType == Node.ELEMENT_NODE && (r == null || i.localName == r) && a.push(i);
    }
    return a;
  }
  element(t, r) {
    for (let a = 0, n = t.childNodes.length; a < n; a++) {
      let s = t.childNodes.item(a);
      if (s.nodeType == 1 && s.localName == r)
        return s;
    }
    return null;
  }
  elementAttr(t, r, a) {
    var n = this.element(t, r);
    return n ? this.attr(n, a) : void 0;
  }
  attrs(t) {
    return Array.from(t.attributes);
  }
  attr(t, r) {
    for (let a = 0, n = t.attributes.length; a < n; a++) {
      let s = t.attributes.item(a);
      if (s.localName == r)
        return s.value;
    }
    return null;
  }
  intAttr(t, r, a = null) {
    var n = this.attr(t, r);
    return n ? parseInt(n) : a;
  }
  hexAttr(t, r, a = null) {
    var n = this.attr(t, r);
    return n ? parseInt(n, 16) : a;
  }
  floatAttr(t, r, a = null) {
    var n = this.attr(t, r);
    return n ? parseFloat(n) : a;
  }
  boolAttr(t, r, a = null) {
    return Nc(this.attr(t, r), a);
  }
  lengthAttr(t, r, a = ar.Dxa) {
    return _0(this.attr(t, r), a);
  }
}
const D = new w0();
class Br {
  constructor(t, r) {
    this._package = t, this.path = r;
  }
  async load() {
    this.rels = await this._package.loadRelationships(this.path);
    const t = await this._package.load(this.path), r = this._package.parseXmlDocument(t);
    this._package.options.keepOrigin && (this._xmlDocument = r), this.parseXml(r.firstElementChild);
  }
  save() {
    this._package.update(this.path, Oc(this._xmlDocument));
  }
  parseXml(t) {
  }
}
const Mc = {
  embedRegular: "regular",
  embedBold: "bold",
  embedItalic: "italic",
  embedBoldItalic: "boldItalic"
};
function Lc(e, t) {
  return t.elements(e).map((r) => Bc(r, t));
}
function Bc(e, t) {
  let r = {
    name: t.attr(e, "name"),
    embedFontRefs: []
  };
  for (let a of t.elements(e))
    switch (a.localName) {
      case "family":
        r.family = t.attr(a, "val");
        break;
      case "altName":
        r.altName = t.attr(a, "val");
        break;
      case "embedRegular":
      case "embedBold":
      case "embedItalic":
      case "embedBoldItalic":
        r.embedFontRefs.push(Uc(a, t));
        break;
    }
  return r;
}
function Uc(e, t) {
  return {
    id: t.attr(e, "id"),
    key: t.attr(e, "fontKey"),
    type: Mc[e.localName]
  };
}
class Hc extends Br {
  parseXml(t) {
    this.fonts = Lc(t, this._package.xmlParser);
  }
}
function Wc(e, t) {
  return t.elements(e).map((r) => ({
    extension: t.attr(r, "Extension"),
    partName: t.attr(r, "PartName"),
    contentType: t.attr(r, "ContentType")
  }));
}
class On {
  constructor(t, r) {
    this._zip = t, this.options = r, this.xmlParser = new w0();
  }
  get(t) {
    const r = Vc(t);
    return this._zip.files[r] ?? this._zip.files[r.replace(/\//g, "\\")];
  }
  update(t, r) {
    this._zip.file(t, r);
  }
  static async load(t, r) {
    const a = await Sc.loadAsync(t);
    return new On(a, r);
  }
  save(t = "blob") {
    return this._zip.generateAsync({ type: t });
  }
  load(t, r = "string") {
    return this.get(t)?.async(r) ?? Promise.resolve(null);
  }
  async loadRelationships(t = null) {
    let r = "_rels/.rels";
    if (t != null) {
      const [n, s] = Va(t);
      r = `${n}_rels/${s}.rels`;
    }
    const a = await this.load(r);
    return a ? yc(this.parseXmlDocument(a).firstElementChild, this.xmlParser) : null;
  }
  async loadContentTypes() {
    const t = await this.load("[Content_Types].xml");
    return t ? Wc(this.parseXmlDocument(t).firstElementChild, this.xmlParser) : [];
  }
  parseXmlDocument(t) {
    return Dc(t, this.options.trimXmlDeclaration);
  }
}
function Vc(e) {
  return e.startsWith("/") ? e.substr(1) : e;
}
class $c extends Br {
  constructor(t, r, a) {
    super(t, r), this._documentParser = a;
  }
  parseXml(t) {
    this.body = this._documentParser.parseDocumentFile(t);
  }
}
function Na(e, t) {
  return {
    type: t.attr(e, "val"),
    color: t.attr(e, "color"),
    size: t.lengthAttr(e, "sz", ar.Border),
    offset: t.lengthAttr(e, "space", ar.Point),
    frame: t.boolAttr(e, "frame"),
    shadow: t.boolAttr(e, "shadow")
  };
}
function Gc(e, t) {
  var r = {};
  for (let a of t.elements(e))
    switch (a.localName) {
      case "left":
        r.left = Na(a, t);
        break;
      case "top":
        r.top = Na(a, t);
        break;
      case "right":
        r.right = Na(a, t);
        break;
      case "bottom":
        r.bottom = Na(a, t);
        break;
    }
  return r;
}
var ls;
(function(e) {
  e.Continuous = "continuous", e.NextPage = "nextPage", e.NextColumn = "nextColumn", e.EvenPage = "evenPage", e.OddPage = "oddPage";
})(ls || (ls = {}));
function T0(e, t = D) {
  var r = {};
  for (let a of t.elements(e))
    switch (a.localName) {
      case "pgSz":
        r.pageSize = {
          width: t.lengthAttr(a, "w"),
          height: t.lengthAttr(a, "h"),
          orientation: t.attr(a, "orient")
        };
        break;
      case "type":
        r.type = t.attr(a, "val");
        break;
      case "pgMar":
        r.pageMargins = {
          left: t.lengthAttr(a, "left"),
          right: t.lengthAttr(a, "right"),
          top: t.lengthAttr(a, "top"),
          bottom: t.lengthAttr(a, "bottom"),
          header: t.lengthAttr(a, "header"),
          footer: t.lengthAttr(a, "footer"),
          gutter: t.lengthAttr(a, "gutter")
        };
        break;
      case "cols":
        r.columns = Xc(a, t);
        break;
      case "headerReference":
        (r.headerRefs ?? (r.headerRefs = [])).push(hs(a, t));
        break;
      case "footerReference":
        (r.footerRefs ?? (r.footerRefs = [])).push(hs(a, t));
        break;
      case "titlePg":
        r.titlePage = t.boolAttr(a, "val", !0);
        break;
      case "pgBorders":
        r.pageBorders = Gc(a, t);
        break;
      case "pgNumType":
        r.pageNumber = zc(a, t);
        break;
    }
  return r;
}
function Xc(e, t) {
  return {
    numberOfColumns: t.intAttr(e, "num"),
    space: t.lengthAttr(e, "space"),
    separator: t.boolAttr(e, "sep"),
    equalWidth: t.boolAttr(e, "equalWidth", !0),
    columns: t.elements(e, "col").map((r) => ({
      width: t.lengthAttr(r, "w"),
      space: t.lengthAttr(r, "space")
    }))
  };
}
function zc(e, t) {
  return {
    chapSep: t.attr(e, "chapSep"),
    chapStyle: t.attr(e, "chapStyle"),
    format: t.attr(e, "fmt"),
    start: t.intAttr(e, "start")
  };
}
function hs(e, t) {
  return {
    id: t.attr(e, "id"),
    type: t.attr(e, "type")
  };
}
function Kc(e, t) {
  return {
    before: t.lengthAttr(e, "before"),
    after: t.lengthAttr(e, "after"),
    line: t.intAttr(e, "line"),
    lineRule: t.attr(e, "lineRule")
  };
}
function Mn(e, t) {
  let r = {};
  for (let a of t.elements(e))
    jc(a, r, t);
  return r;
}
function jc(e, t, r) {
  return !!E0(e, t, r);
}
function A0(e, t) {
  let r = {};
  for (let a of t.elements(e))
    F0(a, r, t);
  return r;
}
function F0(e, t, r) {
  if (e.namespaceURI != k0.wordml)
    return !1;
  if (E0(e, t, r))
    return !0;
  switch (e.localName) {
    case "tabs":
      t.tabs = Yc(e, r);
      break;
    case "sectPr":
      t.sectionProps = T0(e, r);
      break;
    case "numPr":
      t.numbering = Jc(e, r);
      break;
    case "spacing":
      return t.lineSpacing = Kc(e, r), !1;
    case "textAlignment":
      return t.textAlignment = r.attr(e, "val"), !1;
    case "keepLines":
      t.keepLines = r.boolAttr(e, "val", !0);
      break;
    case "keepNext":
      t.keepNext = r.boolAttr(e, "val", !0);
      break;
    case "pageBreakBefore":
      t.pageBreakBefore = r.boolAttr(e, "val", !0);
      break;
    case "outlineLvl":
      t.outlineLevel = r.intAttr(e, "val");
      break;
    case "pStyle":
      t.styleName = r.attr(e, "val");
      break;
    case "rPr":
      t.runProps = Mn(e, r);
      break;
    default:
      return !1;
  }
  return !0;
}
function Yc(e, t) {
  return t.elements(e, "tab").map((r) => ({
    position: t.lengthAttr(r, "pos"),
    leader: t.attr(r, "leader"),
    style: t.attr(r, "val")
  }));
}
function Jc(e, t) {
  var r = {};
  for (let a of t.elements(e))
    switch (a.localName) {
      case "numId":
        r.id = t.attr(a, "val");
        break;
      case "ilvl":
        r.level = t.intAttr(a, "val");
        break;
    }
  return r;
}
function Zc(e, t) {
  let r = {
    numberings: [],
    abstractNumberings: [],
    bulletPictures: []
  };
  for (let a of t.elements(e))
    switch (a.localName) {
      case "num":
        r.numberings.push(qc(a, t));
        break;
      case "abstractNum":
        r.abstractNumberings.push(Qc(a, t));
        break;
      case "numPicBullet":
        r.bulletPictures.push(rf(a, t));
        break;
    }
  return r;
}
function qc(e, t) {
  let r = {
    id: t.attr(e, "numId"),
    overrides: []
  };
  for (let a of t.elements(e))
    switch (a.localName) {
      case "abstractNumId":
        r.abstractId = t.attr(a, "val");
        break;
      case "lvlOverride":
        r.overrides.push(ef(a, t));
        break;
    }
  return r;
}
function Qc(e, t) {
  let r = {
    id: t.attr(e, "abstractNumId"),
    levels: []
  };
  for (let a of t.elements(e))
    switch (a.localName) {
      case "name":
        r.name = t.attr(a, "val");
        break;
      case "multiLevelType":
        r.multiLevelType = t.attr(a, "val");
        break;
      case "numStyleLink":
        r.numberingStyleLink = t.attr(a, "val");
        break;
      case "styleLink":
        r.styleLink = t.attr(a, "val");
        break;
      case "lvl":
        r.levels.push(S0(a, t));
        break;
    }
  return r;
}
function S0(e, t) {
  let r = {
    level: t.intAttr(e, "ilvl")
  };
  for (let a of t.elements(e))
    switch (a.localName) {
      case "start":
        r.start = t.attr(a, "val");
        break;
      case "lvlRestart":
        r.restart = t.intAttr(a, "val");
        break;
      case "numFmt":
        r.format = t.attr(a, "val");
        break;
      case "lvlText":
        r.text = t.attr(a, "val");
        break;
      case "lvlJc":
        r.justification = t.attr(a, "val");
        break;
      case "lvlPicBulletId":
        r.bulletPictureId = t.attr(a, "val");
        break;
      case "pStyle":
        r.paragraphStyle = t.attr(a, "val");
        break;
      case "pPr":
        r.paragraphProps = A0(a, t);
        break;
      case "rPr":
        r.runProps = Mn(a, t);
        break;
    }
  return r;
}
function ef(e, t) {
  let r = {
    level: t.intAttr(e, "ilvl")
  };
  for (let a of t.elements(e))
    switch (a.localName) {
      case "startOverride":
        r.start = t.intAttr(a, "val");
        break;
      case "lvl":
        r.numberingLevel = S0(a, t);
        break;
    }
  return r;
}
function rf(e, t) {
  var r = t.element(e, "pict"), a = r && t.element(r, "shape"), n = a && t.element(a, "imagedata");
  return n ? {
    id: t.attr(e, "numPicBulletId"),
    referenceId: t.attr(n, "id"),
    style: t.attr(a, "style")
  } : null;
}
class tf extends Br {
  constructor(t, r, a) {
    super(t, r), this._documentParser = a;
  }
  parseXml(t) {
    Object.assign(this, Zc(t, this._package.xmlParser)), this.domNumberings = this._documentParser.parseNumberingFile(t);
  }
}
class af extends Br {
  constructor(t, r, a) {
    super(t, r), this._documentParser = a;
  }
  parseXml(t) {
    this.styles = this._documentParser.parseStylesFile(t);
  }
}
var z;
(function(e) {
  e.Document = "document", e.Paragraph = "paragraph", e.Run = "run", e.Break = "break", e.NoBreakHyphen = "noBreakHyphen", e.Table = "table", e.Row = "row", e.Cell = "cell", e.Hyperlink = "hyperlink", e.SmartTag = "smartTag", e.Drawing = "drawing", e.Image = "image", e.Text = "text", e.Tab = "tab", e.Symbol = "symbol", e.BookmarkStart = "bookmarkStart", e.BookmarkEnd = "bookmarkEnd", e.Footer = "footer", e.Header = "header", e.FootnoteReference = "footnoteReference", e.EndnoteReference = "endnoteReference", e.Footnote = "footnote", e.Endnote = "endnote", e.SimpleField = "simpleField", e.ComplexField = "complexField", e.Instruction = "instruction", e.VmlPicture = "vmlPicture", e.MmlMath = "mmlMath", e.MmlMathParagraph = "mmlMathParagraph", e.MmlFraction = "mmlFraction", e.MmlFunction = "mmlFunction", e.MmlFunctionName = "mmlFunctionName", e.MmlNumerator = "mmlNumerator", e.MmlDenominator = "mmlDenominator", e.MmlRadical = "mmlRadical", e.MmlBase = "mmlBase", e.MmlDegree = "mmlDegree", e.MmlSuperscript = "mmlSuperscript", e.MmlSubscript = "mmlSubscript", e.MmlPreSubSuper = "mmlPreSubSuper", e.MmlSubArgument = "mmlSubArgument", e.MmlSuperArgument = "mmlSuperArgument", e.MmlNary = "mmlNary", e.MmlDelimiter = "mmlDelimiter", e.MmlRun = "mmlRun", e.MmlEquationArray = "mmlEquationArray", e.MmlLimit = "mmlLimit", e.MmlLimitLower = "mmlLimitLower", e.MmlMatrix = "mmlMatrix", e.MmlMatrixRow = "mmlMatrixRow", e.MmlBox = "mmlBox", e.MmlBar = "mmlBar", e.MmlGroupChar = "mmlGroupChar", e.VmlElement = "vmlElement", e.Inserted = "inserted", e.Deleted = "deleted", e.DeletedText = "deletedText", e.Comment = "comment", e.CommentReference = "commentReference", e.CommentRangeStart = "commentRangeStart", e.CommentRangeEnd = "commentRangeEnd", e.AltChunk = "altChunk";
})(z || (z = {}));
class Nt {
  constructor() {
    this.children = [], this.cssStyle = {};
  }
}
class nf extends Nt {
  constructor() {
    super(...arguments), this.type = z.Header;
  }
}
class sf extends Nt {
  constructor() {
    super(...arguments), this.type = z.Footer;
  }
}
class y0 extends Br {
  constructor(t, r, a) {
    super(t, r), this._documentParser = a;
  }
  parseXml(t) {
    this.rootElement = this.createRootElement(), this.rootElement.children = this._documentParser.parseBodyElements(t);
  }
}
class cf extends y0 {
  createRootElement() {
    return new nf();
  }
}
class ff extends y0 {
  createRootElement() {
    return new sf();
  }
}
function of(e, t) {
  const r = {};
  for (let a of t.elements(e))
    switch (a.localName) {
      case "Template":
        r.template = a.textContent;
        break;
      case "Pages":
        r.pages = Zt(a.textContent);
        break;
      case "Words":
        r.words = Zt(a.textContent);
        break;
      case "Characters":
        r.characters = Zt(a.textContent);
        break;
      case "Application":
        r.application = a.textContent;
        break;
      case "Lines":
        r.lines = Zt(a.textContent);
        break;
      case "Paragraphs":
        r.paragraphs = Zt(a.textContent);
        break;
      case "Company":
        r.company = a.textContent;
        break;
      case "AppVersion":
        r.appVersion = a.textContent;
        break;
    }
  return r;
}
function Zt(e) {
  if (!(typeof e > "u"))
    return parseInt(e);
}
class lf extends Br {
  parseXml(t) {
    this.props = of(t, this._package.xmlParser);
  }
}
function hf(e, t) {
  const r = {};
  for (let a of t.elements(e))
    switch (a.localName) {
      case "title":
        r.title = a.textContent;
        break;
      case "description":
        r.description = a.textContent;
        break;
      case "subject":
        r.subject = a.textContent;
        break;
      case "creator":
        r.creator = a.textContent;
        break;
      case "keywords":
        r.keywords = a.textContent;
        break;
      case "language":
        r.language = a.textContent;
        break;
      case "lastModifiedBy":
        r.lastModifiedBy = a.textContent;
        break;
      case "revision":
        a.textContent && (r.revision = parseInt(a.textContent));
        break;
    }
  return r;
}
class uf extends Br {
  parseXml(t) {
    this.props = hf(t, this._package.xmlParser);
  }
}
class df {
}
function xf(e, t) {
  var r = new df(), a = t.element(e, "themeElements");
  for (let n of t.elements(a))
    switch (n.localName) {
      case "clrScheme":
        r.colorScheme = pf(n, t);
        break;
      case "fontScheme":
        r.fontScheme = mf(n, t);
        break;
    }
  return r;
}
function pf(e, t) {
  var r = {
    name: t.attr(e, "name"),
    colors: {}
  };
  for (let s of t.elements(e)) {
    var a = t.element(s, "srgbClr"), n = t.element(s, "sysClr");
    a ? r.colors[s.localName] = t.attr(a, "val") : n && (r.colors[s.localName] = t.attr(n, "lastClr"));
  }
  return r;
}
function mf(e, t) {
  var r = {
    name: t.attr(e, "name")
  };
  for (let a of t.elements(e))
    switch (a.localName) {
      case "majorFont":
        r.majorFont = us(a, t);
        break;
      case "minorFont":
        r.minorFont = us(a, t);
        break;
    }
  return r;
}
function us(e, t) {
  return {
    latinTypeface: t.elementAttr(e, "latin", "typeface"),
    eaTypeface: t.elementAttr(e, "ea", "typeface"),
    csTypeface: t.elementAttr(e, "cs", "typeface")
  };
}
class gf extends Br {
  constructor(t, r) {
    super(t, r);
  }
  parseXml(t) {
    this.theme = xf(t, this._package.xmlParser);
  }
}
class C0 {
}
class vf extends C0 {
  constructor() {
    super(...arguments), this.type = z.Footnote;
  }
}
class kf extends C0 {
  constructor() {
    super(...arguments), this.type = z.Endnote;
  }
}
class b0 extends Br {
  constructor(t, r, a) {
    super(t, r), this._documentParser = a;
  }
}
class _f extends b0 {
  constructor(t, r, a) {
    super(t, r, a);
  }
  parseXml(t) {
    this.notes = this._documentParser.parseNotes(t, "footnote", vf);
  }
}
class Ef extends b0 {
  constructor(t, r, a) {
    super(t, r, a);
  }
  parseXml(t) {
    this.notes = this._documentParser.parseNotes(t, "endnote", kf);
  }
}
function wf(e, t) {
  var r = {};
  for (let a of t.elements(e))
    switch (a.localName) {
      case "defaultTabStop":
        r.defaultTabStop = t.lengthAttr(a, "val");
        break;
      case "footnotePr":
        r.footnoteProps = ds(a, t);
        break;
      case "endnotePr":
        r.endnoteProps = ds(a, t);
        break;
      case "autoHyphenation":
        r.autoHyphenation = t.boolAttr(a, "val");
        break;
      case "evenAndOddHeaders":
        r.evenAndOddHeaders = t.boolAttr(a, "val", !0);
        break;
    }
  return r;
}
function ds(e, t) {
  var r = {
    defaultNoteIds: []
  };
  for (let a of t.elements(e))
    switch (a.localName) {
      case "numFmt":
        r.nummeringFormat = t.attr(a, "val");
        break;
      case "footnote":
      case "endnote":
        r.defaultNoteIds.push(t.attr(a, "id"));
        break;
    }
  return r;
}
class Tf extends Br {
  constructor(t, r) {
    super(t, r);
  }
  parseXml(t) {
    this.settings = wf(t, this._package.xmlParser);
  }
}
function Af(e, t) {
  return t.elements(e, "property").map((r) => {
    const a = r.firstChild;
    return {
      formatId: t.attr(r, "fmtid"),
      name: t.attr(r, "name"),
      type: a.nodeName,
      value: a.textContent
    };
  });
}
class Ff extends Br {
  parseXml(t) {
    this.props = Af(t, this._package.xmlParser);
  }
}
class Sf extends Br {
  constructor(t, r, a) {
    super(t, r), this._documentParser = a;
  }
  parseXml(t) {
    this.comments = this._documentParser.parseComments(t), this.commentMap = lt(this.comments, (r) => r.id);
  }
}
class yf extends Br {
  constructor(t, r) {
    super(t, r), this.comments = [];
  }
  parseXml(t) {
    const r = this._package.xmlParser;
    for (let a of r.elements(t, "commentEx"))
      this.comments.push({
        paraId: r.attr(a, "paraId"),
        paraIdParent: r.attr(a, "paraIdParent"),
        done: r.boolAttr(a, "done")
      });
    this.commentMap = lt(this.comments, (a) => a.paraId);
  }
}
const Cf = [
  { type: Ze.OfficeDocument, target: "word/document.xml" },
  { type: Ze.ExtendedProperties, target: "docProps/app.xml" },
  { type: Ze.CoreProperties, target: "docProps/core.xml" },
  { type: Ze.CustomProperties, target: "docProps/custom.xml" }
];
class Ln {
  constructor() {
    this.parts = [], this.partsMap = {}, this.contentTypes = [];
  }
  static async load(t, r, a) {
    var n = new Ln();
    return n._options = a, n._parser = r, n._package = await On.load(t, a), n.rels = await n._package.loadRelationships(), n.contentTypes = await n._package.loadContentTypes(), await Promise.all(Cf.map((s) => {
      const i = n.rels.find((c) => c.type === s.type) ?? s;
      return n.loadRelationshipPart(i.target, i.type);
    })), n;
  }
  save(t = "blob") {
    return this._package.save(t);
  }
  async loadRelationshipPart(t, r) {
    if (this.partsMap[t])
      return this.partsMap[t];
    if (!this._package.get(t))
      return null;
    let a = null;
    switch (r) {
      case Ze.OfficeDocument:
        this.documentPart = a = new $c(this._package, t, this._parser);
        break;
      case Ze.FontTable:
        this.fontTablePart = a = new Hc(this._package, t);
        break;
      case Ze.Numbering:
        this.numberingPart = a = new tf(this._package, t, this._parser);
        break;
      case Ze.Styles:
        this.stylesPart = a = new af(this._package, t, this._parser);
        break;
      case Ze.Theme:
        this.themePart = a = new gf(this._package, t);
        break;
      case Ze.Footnotes:
        this.footnotesPart = a = new _f(this._package, t, this._parser);
        break;
      case Ze.Endnotes:
        this.endnotesPart = a = new Ef(this._package, t, this._parser);
        break;
      case Ze.Footer:
        a = new ff(this._package, t, this._parser);
        break;
      case Ze.Header:
        a = new cf(this._package, t, this._parser);
        break;
      case Ze.CoreProperties:
        this.corePropsPart = a = new uf(this._package, t);
        break;
      case Ze.ExtendedProperties:
        this.extendedPropsPart = a = new lf(this._package, t);
        break;
      case Ze.CustomProperties:
        a = new Ff(this._package, t);
        break;
      case Ze.Settings:
        this.settingsPart = a = new Tf(this._package, t);
        break;
      case Ze.Comments:
        this.commentsPart = a = new Sf(this._package, t, this._parser);
        break;
      case Ze.CommentsExtended:
        this.commentsExtendedPart = a = new yf(this._package, t);
        break;
    }
    if (a == null)
      return Promise.resolve(null);
    if (this.partsMap[t] = a, this.parts.push(a), await a.load(), a.rels?.length > 0) {
      const [n] = Va(a.path);
      await Promise.all(a.rels.map((s) => this.loadRelationshipPart(xn(s.target, n), s.type)));
    }
    return a;
  }
  async loadDocumentImage(t, r) {
    const a = this.getPathById(r ?? this.documentPart, t);
    return a ? this.blobToURL(await this._package.load(a, "blob"), a) : null;
  }
  async loadNumberingImage(t) {
    const r = this.getPathById(this.numberingPart, t);
    return r ? this.blobToURL(await this._package.load(r, "blob"), r) : null;
  }
  async loadFont(t, r) {
    const a = this.getPathById(this.fontTablePart, t);
    if (!a)
      return null;
    const n = await this._package.load(a, "uint8array");
    return n && this.blobToURL(new Blob([bf(n, r)]), a);
  }
  async loadAltChunk(t, r) {
    const a = this.getPathById(r ?? this.documentPart, t);
    return a ? this._package.load(a, "string") : Promise.resolve(null);
  }
  blobToURL(t, r) {
    if (!t)
      return null;
    if (r) {
      const a = this.contentTypes.find((n) => n.partName === r || n.extension && r.endsWith(`.${n.extension}`));
      t = a ? new Blob([t], { type: a.contentType }) : t;
    }
    return this._options.useBase64URL ? bc(t) : URL.createObjectURL(t);
  }
  findPartByRelId(t, r = null) {
    var a = (r.rels ?? this.rels).find((s) => s.id == t);
    const n = r ? Va(r.path)[0] : "";
    return a ? this.partsMap[xn(a.target, n)] : null;
  }
  getPathById(t, r) {
    const a = t.rels.find((s) => s.id == r), [n] = Va(t.path);
    return a ? xn(a.target, n) : null;
  }
}
function bf(e, t) {
  const a = t.replace(/{|}|-/g, ""), n = new Array(16);
  for (let s = 0; s < 16; s++)
    n[16 - s - 1] = parseInt(a.substring(s * 2, s * 2 + 2), 16);
  for (let s = 0; s < 32; s++)
    e[s] = e[s] ^ n[s % 16];
  return e;
}
function Pf(e, t) {
  return {
    type: z.BookmarkStart,
    id: t.attr(e, "id"),
    name: t.attr(e, "name"),
    colFirst: t.intAttr(e, "colFirst"),
    colLast: t.intAttr(e, "colLast")
  };
}
function Nf(e, t) {
  return {
    type: z.BookmarkEnd,
    id: t.attr(e, "id")
  };
}
class Df extends Nt {
  constructor() {
    super(...arguments), this.type = z.VmlElement, this.attrs = {};
  }
}
function P0(e, t) {
  var r = new Df();
  switch (e.localName) {
    case "rect":
      r.tagName = "rect", Object.assign(r.attrs, { width: "100%", height: "100%" });
      break;
    case "oval":
      r.tagName = "ellipse", Object.assign(r.attrs, { cx: "50%", cy: "50%", rx: "50%", ry: "50%" });
      break;
    case "line":
      r.tagName = "line";
      break;
    case "shape":
      r.tagName = "g";
      break;
    case "textbox":
      r.tagName = "foreignObject", Object.assign(r.attrs, { width: "100%", height: "100%" });
      break;
    default:
      return null;
  }
  for (const a of D.attrs(e))
    switch (a.localName) {
      case "style":
        r.cssStyleText = a.value;
        break;
      case "fillcolor":
        r.attrs.fill = a.value;
        break;
      case "from":
        const [n, s] = xs(a.value);
        Object.assign(r.attrs, { x1: n, y1: s });
        break;
      case "to":
        const [i, c] = xs(a.value);
        Object.assign(r.attrs, { x2: i, y2: c });
        break;
    }
  for (const a of D.elements(e))
    switch (a.localName) {
      case "stroke":
        Object.assign(r.attrs, Rf(a));
        break;
      case "fill":
        Object.assign(r.attrs, If());
        break;
      case "imagedata":
        r.tagName = "image", Object.assign(r.attrs, { width: "100%", height: "100%" }), r.imageHref = {
          id: D.attr(a, "id"),
          title: D.attr(a, "title")
        };
        break;
      case "txbxContent":
        r.children.push(...t.parseBodyElements(a));
        break;
      default:
        const n = P0(a, t);
        n && r.children.push(n);
        break;
    }
  return r;
}
function Rf(e) {
  return {
    stroke: D.attr(e, "color"),
    "stroke-width": D.lengthAttr(e, "weight", ar.Emu) ?? "1px"
  };
}
function If(e) {
  return {};
}
function xs(e) {
  return e.split(",");
}
class Of extends Nt {
  constructor() {
    super(...arguments), this.type = z.Comment;
  }
}
class Mf extends Nt {
  constructor(t) {
    super(), this.id = t, this.type = z.CommentReference;
  }
}
class Lf extends Nt {
  constructor(t) {
    super(), this.id = t, this.type = z.CommentRangeStart;
  }
}
class Bf extends Nt {
  constructor(t) {
    super(), this.id = t, this.type = z.CommentRangeEnd;
  }
}
var $a = {
  shd: "inherit",
  color: "black",
  borderColor: "black",
  highlight: "transparent"
};
const Uf = [], ps = {
  oMath: z.MmlMath,
  oMathPara: z.MmlMathParagraph,
  f: z.MmlFraction,
  func: z.MmlFunction,
  fName: z.MmlFunctionName,
  num: z.MmlNumerator,
  den: z.MmlDenominator,
  rad: z.MmlRadical,
  deg: z.MmlDegree,
  e: z.MmlBase,
  sSup: z.MmlSuperscript,
  sSub: z.MmlSubscript,
  sPre: z.MmlPreSubSuper,
  sup: z.MmlSuperArgument,
  sub: z.MmlSubArgument,
  d: z.MmlDelimiter,
  nary: z.MmlNary,
  eqArr: z.MmlEquationArray,
  lim: z.MmlLimit,
  limLow: z.MmlLimitLower,
  m: z.MmlMatrix,
  mr: z.MmlMatrixRow,
  box: z.MmlBox,
  bar: z.MmlBar,
  groupChr: z.MmlGroupChar
};
class Hf {
  constructor(t) {
    this.options = {
      ignoreWidth: !1,
      debug: !1,
      ...t
    };
  }
  parseNotes(t, r, a) {
    var n = [];
    for (let s of D.elements(t, r)) {
      const i = new a();
      i.id = D.attr(s, "id"), i.noteType = D.attr(s, "type"), i.children = this.parseBodyElements(s), n.push(i);
    }
    return n;
  }
  parseComments(t) {
    var r = [];
    for (let a of D.elements(t, "comment")) {
      const n = new Of();
      n.id = D.attr(a, "id"), n.author = D.attr(a, "author"), n.initials = D.attr(a, "initials"), n.date = D.attr(a, "date"), n.children = this.parseBodyElements(a), r.push(n);
    }
    return r;
  }
  parseDocumentFile(t) {
    var r = D.element(t, "body"), a = D.element(t, "background"), n = D.element(r, "sectPr");
    return {
      type: z.Document,
      children: this.parseBodyElements(r),
      props: n ? T0(n, D) : {},
      cssStyle: a ? this.parseBackground(a) : {}
    };
  }
  parseBackground(t) {
    var r = {}, a = Lt.colorAttr(t, "color");
    return a && (r["background-color"] = a), r;
  }
  parseBodyElements(t) {
    var r = [];
    for (const a of D.elements(t))
      switch (a.localName) {
        case "p":
          r.push(this.parseParagraph(a));
          break;
        case "altChunk":
          r.push(this.parseAltChunk(a));
          break;
        case "tbl":
          r.push(this.parseTable(a));
          break;
        case "sdt":
          r.push(...this.parseSdt(a, (n) => this.parseBodyElements(n)));
          break;
      }
    return r;
  }
  parseStylesFile(t) {
    var r = [];
    for (const a of D.elements(t))
      switch (a.localName) {
        case "style":
          r.push(this.parseStyle(a));
          break;
        case "docDefaults":
          r.push(this.parseDefaultStyles(a));
          break;
      }
    return r;
  }
  parseDefaultStyles(t) {
    var r = {
      id: null,
      name: null,
      target: null,
      basedOn: null,
      styles: []
    };
    for (const s of D.elements(t))
      switch (s.localName) {
        case "rPrDefault":
          var a = D.element(s, "rPr");
          a && r.styles.push({
            target: "span",
            values: this.parseDefaultProperties(a, {})
          });
          break;
        case "pPrDefault":
          var n = D.element(s, "pPr");
          n && r.styles.push({
            target: "p",
            values: this.parseDefaultProperties(n, {})
          });
          break;
      }
    return r;
  }
  parseStyle(t) {
    var r = {
      id: D.attr(t, "styleId"),
      isDefault: D.boolAttr(t, "default"),
      name: null,
      target: null,
      basedOn: null,
      styles: [],
      linked: null
    };
    switch (D.attr(t, "type")) {
      case "paragraph":
        r.target = "p";
        break;
      case "table":
        r.target = "table";
        break;
      case "character":
        r.target = "span";
        break;
    }
    for (const a of D.elements(t))
      switch (a.localName) {
        case "basedOn":
          r.basedOn = D.attr(a, "val");
          break;
        case "name":
          r.name = D.attr(a, "val");
          break;
        case "link":
          r.linked = D.attr(a, "val");
          break;
        case "next":
          r.next = D.attr(a, "val");
          break;
        case "aliases":
          r.aliases = D.attr(a, "val").split(",");
          break;
        case "pPr":
          r.styles.push({
            target: "p",
            values: this.parseDefaultProperties(a, {})
          }), r.paragraphProps = A0(a, D);
          break;
        case "rPr":
          r.styles.push({
            target: "span",
            values: this.parseDefaultProperties(a, {})
          }), r.runProps = Mn(a, D);
          break;
        case "tblPr":
        case "tcPr":
          r.styles.push({
            target: "td",
            values: this.parseDefaultProperties(a, {})
          });
          break;
        case "tblStylePr":
          for (let n of this.parseTableStyle(a))
            r.styles.push(n);
          break;
        case "rsid":
        case "qFormat":
        case "hidden":
        case "semiHidden":
        case "unhideWhenUsed":
        case "autoRedefine":
        case "uiPriority":
          break;
        default:
          this.options.debug && console.warn(`DOCX: Unknown style element: ${a.localName}`);
      }
    return r;
  }
  parseTableStyle(t) {
    var r = [], a = D.attr(t, "type"), n = "", s = "";
    switch (a) {
      case "firstRow":
        s = ".first-row", n = "tr.first-row td";
        break;
      case "lastRow":
        s = ".last-row", n = "tr.last-row td";
        break;
      case "firstCol":
        s = ".first-col", n = "td.first-col";
        break;
      case "lastCol":
        s = ".last-col", n = "td.last-col";
        break;
      case "band1Vert":
        s = ":not(.no-vband)", n = "td.odd-col";
        break;
      case "band2Vert":
        s = ":not(.no-vband)", n = "td.even-col";
        break;
      case "band1Horz":
        s = ":not(.no-hband)", n = "tr.odd-row";
        break;
      case "band2Horz":
        s = ":not(.no-hband)", n = "tr.even-row";
        break;
      default:
        return [];
    }
    for (const i of D.elements(t))
      switch (i.localName) {
        case "pPr":
          r.push({
            target: `${n} p`,
            mod: s,
            values: this.parseDefaultProperties(i, {})
          });
          break;
        case "rPr":
          r.push({
            target: `${n} span`,
            mod: s,
            values: this.parseDefaultProperties(i, {})
          });
          break;
        case "tblPr":
        case "tcPr":
          r.push({
            target: n,
            mod: s,
            values: this.parseDefaultProperties(i, {})
          });
          break;
      }
    return r;
  }
  parseNumberingFile(t) {
    const r = [], a = [], n = [];
    for (const s of D.elements(t))
      switch (s.localName) {
        case "abstractNum":
          r.push(...this.parseAbstractNumbering(s, n));
          break;
        case "numPicBullet":
          n.push(this.parseNumberingPicBullet(s));
          break;
        case "num":
          a.push({
            numId: D.attr(s, "numId"),
            abstractNumId: D.elementAttr(s, "abstractNumId", "val")
          });
          break;
      }
    return a.flatMap((s) => r.filter((i) => s.abstractNumId == i.id).map((i) => ({ ...i, id: s.numId })));
  }
  parseNumberingPicBullet(t) {
    var r = D.element(t, "pict"), a = r && D.element(r, "shape"), n = a && D.element(a, "imagedata");
    return n ? {
      id: D.intAttr(t, "numPicBulletId"),
      src: D.attr(n, "id"),
      style: D.attr(a, "style")
    } : null;
  }
  parseAbstractNumbering(t, r) {
    var a = [], n = D.attr(t, "abstractNumId");
    for (const s of D.elements(t))
      s.localName === "lvl" && a.push(this.parseNumberingLevel(n, s, r));
    return a;
  }
  parseNumberingLevel(t, r, a) {
    var n = {
      id: t,
      level: D.intAttr(r, "ilvl"),
      start: 1,
      pStyleName: void 0,
      pStyle: {},
      rStyle: {},
      suff: "tab"
    };
    for (const i of D.elements(r))
      switch (i.localName) {
        case "start":
          n.start = D.intAttr(i, "val");
          break;
        case "pPr":
          this.parseDefaultProperties(i, n.pStyle);
          break;
        case "rPr":
          this.parseDefaultProperties(i, n.rStyle);
          break;
        case "lvlPicBulletId":
          var s = D.intAttr(i, "val");
          n.bullet = a.find((c) => c?.id == s);
          break;
        case "lvlText":
          n.levelText = D.attr(i, "val");
          break;
        case "pStyle":
          n.pStyleName = D.attr(i, "val");
          break;
        case "numFmt":
          n.format = D.attr(i, "val");
          break;
        case "suff":
          n.suff = D.attr(i, "val");
          break;
      }
    return n;
  }
  parseSdt(t, r) {
    const a = D.element(t, "sdtContent");
    return a ? r(a) : [];
  }
  parseChange(t, r, a) {
    return {
      type: t,
      children: a(r)?.children ?? [],
      id: D.attr(r, "id"),
      author: D.attr(r, "author"),
      date: D.attr(r, "date")
    };
  }
  parseAltChunk(t) {
    return { type: z.AltChunk, children: [], id: D.attr(t, "id") };
  }
  parseParagraph(t) {
    var r = { type: z.Paragraph, children: [] };
    for (let a of D.elements(t))
      switch (a.localName) {
        case "pPr":
          this.parseParagraphProperties(a, r);
          break;
        case "r":
          r.children.push(this.parseRun(a, r));
          break;
        case "hyperlink":
          r.children.push(this.parseHyperlink(a, r));
          break;
        case "smartTag":
          r.children.push(this.parseSmartTag(a, r));
          break;
        case "bookmarkStart":
          r.children.push(Pf(a, D));
          break;
        case "bookmarkEnd":
          r.children.push(Nf(a, D));
          break;
        case "commentRangeStart":
          r.children.push(new Lf(D.attr(a, "id")));
          break;
        case "commentRangeEnd":
          r.children.push(new Bf(D.attr(a, "id")));
          break;
        case "oMath":
        case "oMathPara":
          r.children.push(this.parseMathElement(a));
          break;
        case "sdt":
          r.children.push(...this.parseSdt(a, (n) => this.parseParagraph(n).children));
          break;
        case "ins":
          r.children.push(this.parseChange(z.Inserted, a, (n) => this.parseParagraph(n)));
          break;
        case "del":
          r.children.push(this.parseChange(z.Deleted, a, (n) => this.parseParagraph(n)));
          break;
      }
    return r;
  }
  parseParagraphProperties(t, r) {
    this.parseDefaultProperties(t, r.cssStyle = {}, null, (a) => {
      if (F0(a, r, D))
        return !0;
      switch (a.localName) {
        case "pStyle":
          r.styleName = D.attr(a, "val");
          break;
        case "cnfStyle":
          r.className = Ge.classNameOfCnfStyle(a);
          break;
        case "framePr":
          this.parseFrame(a, r);
          break;
        case "rPr":
          break;
        default:
          return !1;
      }
      return !0;
    });
  }
  parseFrame(t, r) {
    var a = D.attr(t, "dropCap");
    a == "drop" && (r.cssStyle.float = "left");
  }
  parseHyperlink(t, r) {
    var a = { type: z.Hyperlink, parent: r, children: [] };
    a.anchor = D.attr(t, "anchor"), a.id = D.attr(t, "id");
    for (const n of D.elements(t))
      n.localName === "r" && a.children.push(this.parseRun(n, a));
    return a;
  }
  parseSmartTag(t, r) {
    var a = { type: z.SmartTag, parent: r, children: [] }, n = D.attr(t, "uri"), s = D.attr(t, "element");
    n && (a.uri = n), s && (a.element = s);
    for (const i of D.elements(t))
      switch (i.localName) {
        case "r":
          a.children.push(this.parseRun(i, a));
          break;
        case "smartTag":
          a.children.push(this.parseSmartTag(i, a));
          break;
      }
    return a;
  }
  parseRun(t, r) {
    var a = { type: z.Run, parent: r, children: [] };
    for (let n of D.elements(t))
      switch (n = this.checkAlternateContent(n), n?.localName) {
        case "t":
          a.children.push({
            type: z.Text,
            text: n.textContent
          });
          break;
        case "delText":
          a.children.push({
            type: z.DeletedText,
            text: n.textContent
          });
          break;
        case "commentReference":
          a.children.push(new Mf(D.attr(n, "id")));
          break;
        case "fldSimple":
          a.children.push({
            type: z.SimpleField,
            instruction: D.attr(n, "instr"),
            lock: D.boolAttr(n, "lock", !1),
            dirty: D.boolAttr(n, "dirty", !1)
          });
          break;
        case "instrText":
          a.fieldRun = !0, a.children.push({
            type: z.Instruction,
            text: n.textContent
          });
          break;
        case "fldChar":
          a.fieldRun = !0, a.children.push({
            type: z.ComplexField,
            charType: D.attr(n, "fldCharType"),
            lock: D.boolAttr(n, "lock", !1),
            dirty: D.boolAttr(n, "dirty", !1)
          });
          break;
        case "noBreakHyphen":
          a.children.push({ type: z.NoBreakHyphen });
          break;
        case "br":
          a.children.push({
            type: z.Break,
            break: D.attr(n, "type") || "textWrapping"
          });
          break;
        case "lastRenderedPageBreak":
          a.children.push({
            type: z.Break,
            break: "lastRenderedPageBreak"
          });
          break;
        case "sym":
          a.children.push({
            type: z.Symbol,
            font: Sn(D.attr(n, "font")),
            char: D.hexAttr(n, "char")
          });
          break;
        case "tab":
          a.children.push({ type: z.Tab });
          break;
        case "footnoteReference":
          a.children.push({
            type: z.FootnoteReference,
            id: D.attr(n, "id")
          });
          break;
        case "endnoteReference":
          a.children.push({
            type: z.EndnoteReference,
            id: D.attr(n, "id")
          });
          break;
        case "drawing":
          let s = this.parseDrawing(n);
          s && a.children.push(s);
          break;
        case "pict":
          a.children.push(this.parseVmlPicture(n));
          break;
        case "rPr":
          this.parseRunProperties(n, a);
          break;
      }
    return a;
  }
  parseMathElement(t) {
    const r = `${t.localName}Pr`, a = { type: ps[t.localName], children: [] };
    for (const s of D.elements(t))
      if (ps[s.localName])
        a.children.push(this.parseMathElement(s));
      else if (s.localName == "r") {
        var n = this.parseRun(s);
        n.type = z.MmlRun, a.children.push(n);
      } else s.localName == r && (a.props = this.parseMathProperies(s));
    return a;
  }
  parseMathProperies(t) {
    const r = {};
    for (const a of D.elements(t))
      switch (a.localName) {
        case "chr":
          r.char = D.attr(a, "val");
          break;
        case "vertJc":
          r.verticalJustification = D.attr(a, "val");
          break;
        case "pos":
          r.position = D.attr(a, "val");
          break;
        case "degHide":
          r.hideDegree = D.boolAttr(a, "val");
          break;
        case "begChr":
          r.beginChar = D.attr(a, "val");
          break;
        case "endChr":
          r.endChar = D.attr(a, "val");
          break;
      }
    return r;
  }
  parseRunProperties(t, r) {
    this.parseDefaultProperties(t, r.cssStyle = {}, null, (a) => {
      switch (a.localName) {
        case "rStyle":
          r.styleName = D.attr(a, "val");
          break;
        case "vertAlign":
          r.verticalAlign = Ge.valueOfVertAlign(a, !0);
          break;
        default:
          return !1;
      }
      return !0;
    });
  }
  parseVmlPicture(t) {
    const r = { type: z.VmlPicture, children: [] };
    for (const a of D.elements(t)) {
      const n = P0(a, this);
      n && r.children.push(n);
    }
    return r;
  }
  checkAlternateContent(t) {
    if (t.localName != "AlternateContent")
      return t;
    var r = D.element(t, "Choice");
    if (r) {
      var a = D.attr(r, "Requires"), n = t.lookupNamespaceURI(a);
      if (Uf.includes(n))
        return r.firstElementChild;
    }
    return D.element(t, "Fallback")?.firstElementChild;
  }
  parseDrawing(t) {
    for (var r of D.elements(t))
      switch (r.localName) {
        case "inline":
        case "anchor":
          return this.parseDrawingWrapper(r);
      }
  }
  parseDrawingWrapper(t) {
    var r = { type: z.Drawing, children: [], cssStyle: {} }, a = t.localName == "anchor";
    let n = null, s = D.boolAttr(t, "simplePos");
    D.boolAttr(t, "behindDoc");
    let i = { relative: "page", align: "left", offset: "0" }, c = { relative: "page", align: "top", offset: "0" };
    for (var f of D.elements(t))
      switch (f.localName) {
        case "simplePos":
          s && (i.offset = D.lengthAttr(f, "x", ar.Emu), c.offset = D.lengthAttr(f, "y", ar.Emu));
          break;
        case "extent":
          r.cssStyle.width = D.lengthAttr(f, "cx", ar.Emu), r.cssStyle.height = D.lengthAttr(f, "cy", ar.Emu);
          break;
        case "positionH":
        case "positionV":
          if (!s) {
            let u = f.localName == "positionH" ? i : c;
            var o = D.element(f, "align"), l = D.element(f, "posOffset");
            u.relative = D.attr(f, "relativeFrom") ?? u.relative, o && (u.align = o.textContent), l && (u.offset = _0(l.textContent, ar.Emu));
          }
          break;
        case "wrapTopAndBottom":
          n = "wrapTopAndBottom";
          break;
        case "wrapNone":
          n = "wrapNone";
          break;
        case "graphic":
          var p = this.parseGraphic(f);
          p && r.children.push(p);
          break;
      }
    return n == "wrapTopAndBottom" ? (r.cssStyle.display = "block", i.align && (r.cssStyle["text-align"] = i.align, r.cssStyle.width = "100%")) : n == "wrapNone" ? (r.cssStyle.display = "block", r.cssStyle.position = "relative", r.cssStyle.width = "0px", r.cssStyle.height = "0px", i.offset && (r.cssStyle.left = i.offset), c.offset && (r.cssStyle.top = c.offset)) : a && (i.align == "left" || i.align == "right") && (r.cssStyle.float = i.align), r;
  }
  parseGraphic(t) {
    var r = D.element(t, "graphicData");
    for (let a of D.elements(r))
      if (a.localName === "pic")
        return this.parsePicture(a);
    return null;
  }
  parsePicture(t) {
    var r = { type: z.Image, src: "", cssStyle: {} }, a = D.element(t, "blipFill"), n = D.element(a, "blip"), s = D.element(a, "srcRect");
    r.src = D.attr(n, "embed"), s && (r.srcRect = [
      D.intAttr(s, "l", 0) / 1e5,
      D.intAttr(s, "t", 0) / 1e5,
      D.intAttr(s, "r", 0) / 1e5,
      D.intAttr(s, "b", 0) / 1e5
    ]);
    var i = D.element(t, "spPr"), c = D.element(i, "xfrm");
    if (r.cssStyle.position = "relative", c) {
      r.rotation = D.intAttr(c, "rot", 0) / 6e4;
      for (var f of D.elements(c))
        switch (f.localName) {
          case "ext":
            r.cssStyle.width = D.lengthAttr(f, "cx", ar.Emu), r.cssStyle.height = D.lengthAttr(f, "cy", ar.Emu);
            break;
          case "off":
            r.cssStyle.left = D.lengthAttr(f, "x", ar.Emu), r.cssStyle.top = D.lengthAttr(f, "y", ar.Emu);
            break;
        }
    }
    return r;
  }
  parseTable(t) {
    var r = { type: z.Table, children: [] };
    for (const a of D.elements(t))
      switch (a.localName) {
        case "tr":
          r.children.push(this.parseTableRow(a));
          break;
        case "tblGrid":
          r.columns = this.parseTableColumns(a);
          break;
        case "tblPr":
          this.parseTableProperties(a, r);
          break;
      }
    return r;
  }
  parseTableColumns(t) {
    var r = [];
    for (const a of D.elements(t))
      a.localName === "gridCol" && r.push({ width: D.lengthAttr(a, "w") });
    return r;
  }
  parseTableProperties(t, r) {
    switch (r.cssStyle = {}, r.cellStyle = {}, this.parseDefaultProperties(t, r.cssStyle, r.cellStyle, (a) => {
      switch (a.localName) {
        case "tblStyle":
          r.styleName = D.attr(a, "val");
          break;
        case "tblLook":
          r.className = Ge.classNameOftblLook(a);
          break;
        case "tblpPr":
          this.parseTablePosition(a, r);
          break;
        case "tblStyleColBandSize":
          r.colBandSize = D.intAttr(a, "val");
          break;
        case "tblStyleRowBandSize":
          r.rowBandSize = D.intAttr(a, "val");
          break;
        case "hidden":
          r.cssStyle.display = "none";
          break;
        default:
          return !1;
      }
      return !0;
    }), r.cssStyle["text-align"]) {
      case "center":
        delete r.cssStyle["text-align"], r.cssStyle["margin-left"] = "auto", r.cssStyle["margin-right"] = "auto";
        break;
      case "right":
        delete r.cssStyle["text-align"], r.cssStyle["margin-left"] = "auto";
        break;
    }
  }
  parseTablePosition(t, r) {
    var a = D.lengthAttr(t, "topFromText"), n = D.lengthAttr(t, "bottomFromText"), s = D.lengthAttr(t, "rightFromText"), i = D.lengthAttr(t, "leftFromText");
    r.cssStyle.float = "left", r.cssStyle["margin-bottom"] = Ge.addSize(r.cssStyle["margin-bottom"], n), r.cssStyle["margin-left"] = Ge.addSize(r.cssStyle["margin-left"], i), r.cssStyle["margin-right"] = Ge.addSize(r.cssStyle["margin-right"], s), r.cssStyle["margin-top"] = Ge.addSize(r.cssStyle["margin-top"], a);
  }
  parseTableRow(t) {
    var r = { type: z.Row, children: [] };
    for (const a of D.elements(t))
      switch (a.localName) {
        case "tc":
          r.children.push(this.parseTableCell(a));
          break;
        case "trPr":
        case "tblPrEx":
          this.parseTableRowProperties(a, r);
          break;
      }
    return r;
  }
  parseTableRowProperties(t, r) {
    r.cssStyle = this.parseDefaultProperties(t, {}, null, (a) => {
      switch (a.localName) {
        case "cnfStyle":
          r.className = Ge.classNameOfCnfStyle(a);
          break;
        case "tblHeader":
          r.isHeader = D.boolAttr(a, "val");
          break;
        case "gridBefore":
          r.gridBefore = D.intAttr(a, "val");
          break;
        case "gridAfter":
          r.gridAfter = D.intAttr(a, "val");
          break;
        default:
          return !1;
      }
      return !0;
    });
  }
  parseTableCell(t) {
    var r = { type: z.Cell, children: [] };
    for (const a of D.elements(t))
      switch (a.localName) {
        case "tbl":
          r.children.push(this.parseTable(a));
          break;
        case "p":
          r.children.push(this.parseParagraph(a));
          break;
        case "tcPr":
          this.parseTableCellProperties(a, r);
          break;
      }
    return r;
  }
  parseTableCellProperties(t, r) {
    r.cssStyle = this.parseDefaultProperties(t, {}, null, (a) => {
      switch (a.localName) {
        case "gridSpan":
          r.span = D.intAttr(a, "val", null);
          break;
        case "vMerge":
          r.verticalMerge = D.attr(a, "val") ?? "continue";
          break;
        case "cnfStyle":
          r.className = Ge.classNameOfCnfStyle(a);
          break;
        default:
          return !1;
      }
      return !0;
    }), this.parseTableCellVerticalText(t, r);
  }
  parseTableCellVerticalText(t, r) {
    const a = {
      btLr: {
        writingMode: "vertical-rl",
        transform: "rotate(180deg)"
      },
      lrTb: {
        writingMode: "vertical-lr",
        transform: "none"
      },
      tbRl: {
        writingMode: "vertical-rl",
        transform: "none"
      }
    };
    for (const n of D.elements(t))
      if (n.localName === "textDirection") {
        const s = D.attr(n, "val"), i = a[s] || { writingMode: "horizontal-tb" };
        r.cssStyle["writing-mode"] = i.writingMode, r.cssStyle.transform = i.transform;
      }
  }
  parseDefaultProperties(t, r = null, a = null, n = null) {
    r = r || {};
    for (const s of D.elements(t))
      if (!n?.(s))
        switch (s.localName) {
          case "jc":
            r["text-align"] = Ge.valueOfJc(s);
            break;
          case "textAlignment":
            r["vertical-align"] = Ge.valueOfTextAlignment(s);
            break;
          case "color":
            r.color = Lt.colorAttr(s, "val", null, $a.color);
            break;
          case "sz":
            r["font-size"] = r["min-height"] = D.lengthAttr(s, "val", ar.FontSize);
            break;
          case "shd":
            r["background-color"] = Lt.colorAttr(s, "fill", null, $a.shd);
            break;
          case "highlight":
            r["background-color"] = Lt.colorAttr(s, "val", null, $a.highlight);
            break;
          case "vertAlign":
            break;
          case "position":
            r.verticalAlign = D.lengthAttr(s, "val", ar.FontSize);
            break;
          case "tcW":
            if (this.options.ignoreWidth)
              break;
          case "tblW":
            r.width = Ge.valueOfSize(s, "w");
            break;
          case "trHeight":
            this.parseTrHeight(s, r);
            break;
          case "strike":
            r["text-decoration"] = D.boolAttr(s, "val", !0) ? "line-through" : "none";
            break;
          case "b":
            r["font-weight"] = D.boolAttr(s, "val", !0) ? "bold" : "normal";
            break;
          case "i":
            r["font-style"] = D.boolAttr(s, "val", !0) ? "italic" : "normal";
            break;
          case "caps":
            r["text-transform"] = D.boolAttr(s, "val", !0) ? "uppercase" : "none";
            break;
          case "smallCaps":
            r["font-variant"] = D.boolAttr(s, "val", !0) ? "small-caps" : "none";
            break;
          case "u":
            this.parseUnderline(s, r);
            break;
          case "ind":
          case "tblInd":
            this.parseIndentation(s, r);
            break;
          case "rFonts":
            this.parseFont(s, r);
            break;
          case "tblBorders":
            this.parseBorderProperties(s, a || r);
            break;
          case "tblCellSpacing":
            r["border-spacing"] = Ge.valueOfMargin(s), r["border-collapse"] = "separate";
            break;
          case "pBdr":
            this.parseBorderProperties(s, r);
            break;
          case "bdr":
            r.border = Ge.valueOfBorder(s);
            break;
          case "tcBorders":
            this.parseBorderProperties(s, r);
            break;
          case "vanish":
            D.boolAttr(s, "val", !0) && (r.display = "none");
            break;
          case "kern":
            break;
          case "noWrap":
            break;
          case "tblCellMar":
          case "tcMar":
            this.parseMarginProperties(s, a || r);
            break;
          case "tblLayout":
            r["table-layout"] = Ge.valueOfTblLayout(s);
            break;
          case "vAlign":
            r["vertical-align"] = Ge.valueOfTextAlignment(s);
            break;
          case "spacing":
            t.localName == "pPr" && this.parseSpacing(s, r);
            break;
          case "wordWrap":
            D.boolAttr(s, "val") && (r["overflow-wrap"] = "break-word");
            break;
          case "suppressAutoHyphens":
            r.hyphens = D.boolAttr(s, "val", !0) ? "none" : "auto";
            break;
          case "lang":
            r.$lang = D.attr(s, "val");
            break;
          case "rtl":
          case "bidi":
            D.boolAttr(s, "val", !0) && (r.direction = "rtl");
            break;
          case "bCs":
          case "iCs":
          case "szCs":
          case "tabs":
          case "outlineLvl":
          case "contextualSpacing":
          case "tblStyleColBandSize":
          case "tblStyleRowBandSize":
          case "webHidden":
          case "pageBreakBefore":
          case "suppressLineNumbers":
          case "keepLines":
          case "keepNext":
          case "widowControl":
          case "noProof":
            break;
          default:
            this.options.debug && console.warn(`DOCX: Unknown document element: ${t.localName}.${s.localName}`);
            break;
        }
    return r;
  }
  parseUnderline(t, r) {
    var a = D.attr(t, "val");
    if (a != null) {
      switch (a) {
        case "dash":
        case "dashDotDotHeavy":
        case "dashDotHeavy":
        case "dashedHeavy":
        case "dashLong":
        case "dashLongHeavy":
        case "dotDash":
        case "dotDotDash":
          r["text-decoration"] = "underline dashed";
          break;
        case "dotted":
        case "dottedHeavy":
          r["text-decoration"] = "underline dotted";
          break;
        case "double":
          r["text-decoration"] = "underline double";
          break;
        case "single":
        case "thick":
          r["text-decoration"] = "underline";
          break;
        case "wave":
        case "wavyDouble":
        case "wavyHeavy":
          r["text-decoration"] = "underline wavy";
          break;
        case "words":
          r["text-decoration"] = "underline";
          break;
        case "none":
          r["text-decoration"] = "none";
          break;
      }
      var n = Lt.colorAttr(t, "color");
      n && (r["text-decoration-color"] = n);
    }
  }
  parseFont(t, r) {
    var a = D.attr(t, "ascii"), n = Ge.themeValue(t, "asciiTheme"), s = D.attr(t, "eastAsia"), i = [a, n, s].filter((c) => c).map((c) => Sn(c));
    i.length > 0 && (r["font-family"] = [...new Set(i)].join(", "));
  }
  parseIndentation(t, r) {
    var a = D.lengthAttr(t, "firstLine"), n = D.lengthAttr(t, "hanging"), s = D.lengthAttr(t, "left"), i = D.lengthAttr(t, "start"), c = D.lengthAttr(t, "right"), f = D.lengthAttr(t, "end");
    a && (r["text-indent"] = a), n && (r["text-indent"] = `-${n}`), (s || i) && (r["margin-inline-start"] = s || i), (c || f) && (r["margin-inline-end"] = c || f);
  }
  parseSpacing(t, r) {
    var a = D.lengthAttr(t, "before"), n = D.lengthAttr(t, "after"), s = D.intAttr(t, "line", null), i = D.attr(t, "lineRule");
    if (a && (r["margin-top"] = a), n && (r["margin-bottom"] = n), s !== null)
      switch (i) {
        case "auto":
          r["line-height"] = `${(s / 240).toFixed(2)}`;
          break;
        case "atLeast":
          r["line-height"] = `calc(100% + ${s / 20}pt)`;
          break;
        default:
          r["line-height"] = r["min-height"] = `${s / 20}pt`;
          break;
      }
  }
  parseMarginProperties(t, r) {
    for (const a of D.elements(t))
      switch (a.localName) {
        case "left":
          r["padding-left"] = Ge.valueOfMargin(a);
          break;
        case "right":
          r["padding-right"] = Ge.valueOfMargin(a);
          break;
        case "top":
          r["padding-top"] = Ge.valueOfMargin(a);
          break;
        case "bottom":
          r["padding-bottom"] = Ge.valueOfMargin(a);
          break;
      }
  }
  parseTrHeight(t, r) {
    D.attr(t, "hRule"), r.height = D.lengthAttr(t, "val");
  }
  parseBorderProperties(t, r) {
    for (const a of D.elements(t))
      switch (a.localName) {
        case "start":
        case "left":
          r["border-left"] = Ge.valueOfBorder(a);
          break;
        case "end":
        case "right":
          r["border-right"] = Ge.valueOfBorder(a);
          break;
        case "top":
          r["border-top"] = Ge.valueOfBorder(a);
          break;
        case "bottom":
          r["border-bottom"] = Ge.valueOfBorder(a);
          break;
      }
  }
}
const Wf = ["black", "blue", "cyan", "darkBlue", "darkCyan", "darkGray", "darkGreen", "darkMagenta", "darkRed", "darkYellow", "green", "lightGray", "magenta", "none", "red", "white", "yellow"];
class Lt {
  static colorAttr(t, r, a = null, n = "black") {
    var s = D.attr(t, r);
    if (s)
      return s == "auto" ? n : Wf.includes(s) ? s : `#${s}`;
    var i = D.attr(t, "themeColor");
    return i ? `var(--docx-${i}-color)` : a;
  }
}
class Ge {
  static themeValue(t, r) {
    var a = D.attr(t, r);
    return a ? `var(--docx-${a}-font)` : null;
  }
  static valueOfSize(t, r) {
    var a = ar.Dxa;
    switch (D.attr(t, "type")) {
      case "dxa":
        break;
      case "pct":
        a = ar.Percent;
        break;
      case "auto":
        return "auto";
    }
    return D.lengthAttr(t, r, a);
  }
  static valueOfMargin(t) {
    return D.lengthAttr(t, "w");
  }
  static valueOfBorder(t) {
    var r = Ge.parseBorderType(D.attr(t, "val"));
    if (r == "none")
      return "none";
    var a = Lt.colorAttr(t, "color"), n = D.lengthAttr(t, "sz", ar.Border);
    return `${n} ${r} ${a == "auto" ? $a.borderColor : a}`;
  }
  static parseBorderType(t) {
    switch (t) {
      case "single":
        return "solid";
      case "dashDotStroked":
        return "solid";
      case "dashed":
        return "dashed";
      case "dashSmallGap":
        return "dashed";
      case "dotDash":
        return "dotted";
      case "dotDotDash":
        return "dotted";
      case "dotted":
        return "dotted";
      case "double":
        return "double";
      case "doubleWave":
        return "double";
      case "inset":
        return "inset";
      case "nil":
        return "none";
      case "none":
        return "none";
      case "outset":
        return "outset";
      case "thick":
        return "solid";
      case "thickThinLargeGap":
        return "solid";
      case "thickThinMediumGap":
        return "solid";
      case "thickThinSmallGap":
        return "solid";
      case "thinThickLargeGap":
        return "solid";
      case "thinThickMediumGap":
        return "solid";
      case "thinThickSmallGap":
        return "solid";
      case "thinThickThinLargeGap":
        return "solid";
      case "thinThickThinMediumGap":
        return "solid";
      case "thinThickThinSmallGap":
        return "solid";
      case "threeDEmboss":
        return "solid";
      case "threeDEngrave":
        return "solid";
      case "triple":
        return "double";
      case "wave":
        return "solid";
    }
    return "solid";
  }
  static valueOfTblLayout(t) {
    var r = D.attr(t, "val");
    return r == "fixed" ? "fixed" : "auto";
  }
  static classNameOfCnfStyle(t) {
    const r = D.attr(t, "val"), a = [
      "first-row",
      "last-row",
      "first-col",
      "last-col",
      "odd-col",
      "even-col",
      "odd-row",
      "even-row",
      "ne-cell",
      "nw-cell",
      "se-cell",
      "sw-cell"
    ];
    if (r)
      return a.filter((s, i) => r[i] == "1").join(" ");
    const n = [
      "firstRow",
      "lastRow",
      "firstColumn",
      "lastColumn",
      "oddVBand",
      "evenVBand",
      "oddHBand",
      "evenHBand",
      "firstRowLastColumn",
      "firstRowFirstColumn",
      "lastRowLastColumn",
      "lastRowFirstColumn"
    ];
    return a.filter((s, i) => D.boolAttr(t, n[i])).join(" ");
  }
  static valueOfJc(t) {
    var r = D.attr(t, "val");
    switch (r) {
      case "start":
      case "left":
        return "left";
      case "center":
        return "center";
      case "end":
      case "right":
        return "right";
      case "both":
        return "justify";
    }
    return r;
  }
  static valueOfVertAlign(t, r = !1) {
    var a = D.attr(t, "val");
    switch (a) {
      case "subscript":
        return "sub";
      case "superscript":
        return r ? "sup" : "super";
    }
    return r ? null : a;
  }
  static valueOfTextAlignment(t) {
    var r = D.attr(t, "val");
    switch (r) {
      case "auto":
      case "baseline":
        return "baseline";
      case "top":
        return "top";
      case "center":
        return "middle";
      case "bottom":
        return "bottom";
    }
    return r;
  }
  static addSize(t, r) {
    return t == null ? r : r == null ? t : `calc(${t} + ${r})`;
  }
  static classNameOftblLook(t) {
    const r = D.hexAttr(t, "val", 0);
    let a = "";
    return (D.boolAttr(t, "firstRow") || r & 32) && (a += " first-row"), (D.boolAttr(t, "lastRow") || r & 64) && (a += " last-row"), (D.boolAttr(t, "firstColumn") || r & 128) && (a += " first-col"), (D.boolAttr(t, "lastColumn") || r & 256) && (a += " last-col"), (D.boolAttr(t, "noHBand") || r & 512) && (a += " no-hband"), (D.boolAttr(t, "noVBand") || r & 1024) && (a += " no-vband"), a.trim();
  }
}
const ms = { pos: 0, leader: "none", style: "left" }, Vf = 50;
function $f(e = document.body) {
  const t = document.createElement("div");
  t.style.width = "100pt", e.appendChild(t);
  const r = 100 / t.offsetWidth;
  return e.removeChild(t), r;
}
function Gf(e, t, r, a = 72 / 96) {
  const n = e.closest("p"), s = e.getBoundingClientRect(), i = n.getBoundingClientRect(), c = getComputedStyle(n), f = t?.length > 0 ? t.map((_) => ({
    pos: gs(_.position),
    leader: _.leader,
    style: _.style
  })).sort((_, g) => _.pos - g.pos) : [ms], o = f[f.length - 1], l = i.width * a, p = gs(r);
  let u = o.pos + p;
  if (u < l)
    for (; u < l && f.length < Vf; u += p)
      f.push({ ...ms, pos: u });
  const h = parseFloat(c.marginLeft), m = i.left + h, k = (s.left - m) * a, x = f.find((_) => _.style != "clear" && _.pos > k);
  if (x == null)
    return;
  let d = 1;
  if (x.style == "right" || x.style == "center") {
    const _ = Array.from(n.querySelectorAll(`.${e.className}`)), g = _.indexOf(e) + 1, C = document.createRange();
    C.setStart(e, 1), g < _.length ? C.setEndBefore(_[g]) : C.setEndAfter(n);
    const O = x.style == "center" ? 0.5 : 1, U = C.getBoundingClientRect(), P = U.left + O * U.width - (i.left - h);
    d = x.pos - P * a;
  } else
    d = x.pos - k;
  switch (e.innerHTML = "&nbsp;", e.style.textDecoration = "inherit", e.style.wordSpacing = `${d.toFixed(0)}pt`, x.leader) {
    case "dot":
    case "middleDot":
      e.style.textDecoration = "underline", e.style.textDecorationStyle = "dotted";
      break;
    case "hyphen":
    case "heavy":
    case "underscore":
      e.style.textDecoration = "underline";
      break;
  }
}
function gs(e) {
  return parseFloat(e);
}
var Ue;
(function(e) {
  e.html = "http://www.w3.org/1999/xhtml", e.svg = "http://www.w3.org/2000/svg", e.mathML = "http://www.w3.org/1998/Math/MathML";
})(Ue || (Ue = {}));
function da(e) {
  if (yn(e))
    return document.createTextNode(e);
  if (e instanceof Node)
    return e;
  const { ns: t, tagName: r, className: a, style: n, children: s, ...i } = e;
  if (r === "#fragment") {
    const f = document.createDocumentFragment();
    return s && s.forEach((o) => f.appendChild(da(o))), f;
  }
  if (r === "#comment")
    return document.createComment(s ? s[0] : "");
  const c = t ? document.createElementNS(t, r) : document.createElement(r);
  if (a && c.setAttribute("class", a), n && (yn(n) ? c.setAttribute("style", n) : Object.assign(c.style, n)), i)
    for (const [f, o] of Object.entries(i))
      o !== void 0 && (c[f] = o);
  return s && s.forEach((f) => c.appendChild(da(f))), c;
}
function Xf(...e) {
  return e.filter(Boolean).join(" ");
}
class zf {
  constructor() {
    this.className = "docx", this.styleMap = {}, this.currentPart = null, this.tableVerticalMerges = [], this.currentVerticalMerge = null, this.tableCellPositions = [], this.currentCellPosition = null, this.footnoteMap = {}, this.endnoteMap = {}, this.currentEndnoteIds = [], this.usedHederFooterParts = [], this.currentTabs = [], this.commentMap = {}, this.tasks = [], this.postRenderTasks = [], this.h = da;
  }
  async render(t, r) {
    this.document = t, this.options = r, this.className = r.className, this.rootSelector = r.inWrapper ? `.${this.className}-wrapper` : ":root", this.h = r.h ?? da, this.styleMap = null, this.tasks = [], this.options.renderComments && globalThis.Highlight && (this.commentHighlight = new Highlight());
    const a = [...this.renderDefaultStyle()];
    t.themePart && a.push(...this.renderTheme(t.themePart)), t.stylesPart != null && (this.styleMap = this.processStyles(t.stylesPart.styles), a.push(...this.renderStyles(t.stylesPart.styles))), t.numberingPart && (this.prodessNumberings(t.numberingPart.domNumberings), a.push(...await this.renderNumbering(t.numberingPart.domNumberings))), t.footnotesPart && (this.footnoteMap = lt(t.footnotesPart.notes, (s) => s.id)), t.endnotesPart && (this.endnoteMap = lt(t.endnotesPart.notes, (s) => s.id)), t.settingsPart && (this.defaultTabSize = t.settingsPart.settings?.defaultTabStop), !r.ignoreFonts && t.fontTablePart && a.push(...await this.renderFontTable(t.fontTablePart));
    var n = this.renderSections(t.documentPart.body);
    return this.options.inWrapper ? a.push(this.renderWrapper(n)) : a.push(...n), this.commentHighlight && r.renderComments && CSS.highlights.set(`${this.className}-comments`, this.commentHighlight), this.postRenderTasks.forEach((s) => s()), await Promise.allSettled(this.tasks), this.refreshTabStops(), a;
  }
  renderTheme(t) {
    const r = {}, a = t.theme?.fontScheme;
    a && (a.majorFont && (r["--docx-majorHAnsi-font"] = a.majorFont.latinTypeface), a.minorFont && (r["--docx-minorHAnsi-font"] = a.minorFont.latinTypeface));
    const n = t.theme?.colorScheme;
    if (n)
      for (let [i, c] of Object.entries(n.colors))
        r[`--docx-${i}-color`] = `#${c}`;
    const s = this.styleToString(`.${this.className}`, r);
    return [
      this.h({ tagName: "#comment", children: ["docxjs document theme values"] }),
      this.h({ tagName: "style", children: [s] })
    ];
  }
  async renderFontTable(t) {
    const r = [];
    for (let a of t.fonts)
      for (let n of a.embedFontRefs)
        try {
          const s = await this.document.loadFont(n.id, n.key), i = {
            "font-family": Sn(a.name),
            src: `url(${s})`
          };
          (n.type == "bold" || n.type == "boldItalic") && (i["font-weight"] = "bold"), (n.type == "italic" || n.type == "boldItalic") && (i["font-style"] = "italic"), r.push(this.h({ tagName: "#comment", children: [`docxjs ${a.name} font`] })), r.push(this.h({ tagName: "style", children: [this.styleToString("@font-face", i)] }));
        } catch {
          this.options.debug && console.warn(`Can't load font with id ${n.id} and key ${n.key}`);
        }
    return r;
  }
  processStyleName(t) {
    return t ? `${this.className}_${Cc(t)}` : this.className;
  }
  processStyles(t) {
    const r = lt(t.filter((n) => n.id != null), (n) => n.id);
    for (const n of t.filter((s) => s.basedOn)) {
      var a = r[n.basedOn];
      if (a) {
        n.paragraphProps = Ga(n.paragraphProps, a.paragraphProps), n.runProps = Ga(n.runProps, a.runProps);
        for (const s of a.styles) {
          const i = n.styles.find((c) => c.target == s.target);
          i ? this.copyStyleProperties(s.values, i.values) : n.styles.push({ ...s, values: { ...s.values } });
        }
      } else this.options.debug && console.warn(`Can't find base style ${n.basedOn}`);
    }
    for (let n of t)
      n.cssName = this.processStyleName(n.id);
    return r;
  }
  prodessNumberings(t) {
    for (let r of t.filter((a) => a.pStyleName)) {
      const a = this.findStyle(r.pStyleName);
      a?.paragraphProps?.numbering && (a.paragraphProps.numbering.level = r.level);
    }
  }
  processElement(t) {
    if (t.children)
      for (var r of t.children)
        r.parent = t, r.type == z.Table ? this.processTable(r) : this.processElement(r);
  }
  processTable(t) {
    for (var r of t.children)
      for (var a of r.children)
        a.cssStyle = this.copyStyleProperties(t.cellStyle, a.cssStyle, [
          "border-left",
          "border-right",
          "border-top",
          "border-bottom",
          "padding-left",
          "padding-right",
          "padding-top",
          "padding-bottom"
        ]), this.processElement(a);
  }
  copyStyleProperties(t, r, a = null) {
    if (!t)
      return r;
    r == null && (r = {}), a == null && (a = Object.getOwnPropertyNames(t));
    for (var n of a)
      t.hasOwnProperty(n) && !r.hasOwnProperty(n) && (r[n] = t[n]);
    return r;
  }
  createPageElement(t, r, a) {
    const n = { ...a };
    return r && (r.pageMargins && (n.paddingLeft = r.pageMargins.left, n.paddingRight = r.pageMargins.right, n.paddingTop = r.pageMargins.top, n.paddingBottom = r.pageMargins.bottom), r.pageSize && (this.options.ignoreWidth || (n.width = r.pageSize.width), this.options.ignoreHeight || (n.minHeight = r.pageSize.height))), this.h({ tagName: "section", className: t, style: n });
  }
  createSectionContent(t) {
    const r = {};
    return t.columns && t.columns.numberOfColumns && (r.columnCount = `${t.columns.numberOfColumns}`, r.columnGap = t.columns.space, t.columns.separator && (r.columnRule = "1px solid black")), this.h({ tagName: "article", style: r });
  }
  renderSections(t) {
    const r = [];
    this.processElement(t);
    const a = this.splitBySection(t.children, t.props), n = this.groupByPageBreaks(a);
    let s = null;
    for (let c = 0, f = n.length; c < f; c++) {
      this.currentFootnoteIds = [];
      let l = n[c][0].sectProps;
      const p = this.createPageElement(this.className, l, t.cssStyle);
      this.options.renderHeaders && this.renderHeaderFooter(l.headerRefs, l, r.length, s != l, p);
      for (const u of n[c]) {
        var i = this.createSectionContent(u.sectProps);
        this.renderElements(u.elements, i), p.appendChild(i), l = u.sectProps;
      }
      if (this.options.renderFootnotes) {
        const u = this.renderNotes(this.currentFootnoteIds, this.footnoteMap);
        u && p.appendChild(u);
      }
      if (this.options.renderEndnotes && c == f - 1) {
        const u = this.renderNotes(this.currentEndnoteIds, this.endnoteMap);
        u && p.appendChild(u);
      }
      this.options.renderFooters && this.renderHeaderFooter(l.footerRefs, l, r.length, s != l, p), r.push(p), s = l;
    }
    return r;
  }
  renderHeaderFooter(t, r, a, n, s) {
    if (!t)
      return;
    const i = this.document.settingsPart?.settings?.evenAndOddHeaders ?? !1;
    var c = (r.titlePage && n ? t.find((o) => o.type == "first") : null) ?? (a % 2 == 1 && i ? t.find((o) => o.type == "even") : null) ?? t.find((o) => o.type == "default"), f = c && this.document.findPartByRelId(c.id, this.document.documentPart);
    if (f) {
      this.currentPart = f, this.usedHederFooterParts.includes(f.path) || (this.processElement(f.rootElement), this.usedHederFooterParts.push(f.path));
      const [o] = this.renderElements([f.rootElement], s);
      r?.pageMargins && (f.rootElement.type === z.Header ? (o.style.marginTop = `calc(${r.pageMargins.header} - ${r.pageMargins.top})`, o.style.minHeight = `calc(${r.pageMargins.top} - ${r.pageMargins.header})`) : f.rootElement.type === z.Footer && (o.style.marginBottom = `calc(${r.pageMargins.footer} - ${r.pageMargins.bottom})`, o.style.minHeight = `calc(${r.pageMargins.bottom} - ${r.pageMargins.footer})`)), this.currentPart = null;
    }
  }
  isPageBreakElement(t) {
    return t.type != z.Break ? !1 : t.break == "lastRenderedPageBreak" ? !this.options.ignoreLastRenderedPageBreak : t.break == "page";
  }
  isPageBreakSection(t, r) {
    return !t || !r ? !1 : t.pageSize?.orientation != r.pageSize?.orientation || t.pageSize?.width != r.pageSize?.width || t.pageSize?.height != r.pageSize?.height;
  }
  splitBySection(t, r) {
    var a = { sectProps: null, elements: [], pageBreak: !1 }, n = [a];
    for (let p of t) {
      if (p.type == z.Paragraph) {
        const u = p, h = this.findStyle(u.styleName);
        (u.pageBreakBefore || h?.paragraphProps?.pageBreakBefore) && (a.sectProps = s, a.pageBreak = !0, a = { sectProps: null, elements: [], pageBreak: !1 }, n.push(a));
      }
      if (a.elements.push(p), p.type == z.Paragraph) {
        const u = p;
        var s = u.sectionProps, i = -1, c = -1;
        if (this.options.breakPages && u.children && (i = u.children.findIndex((h) => (c = h.children?.findIndex(this.isPageBreakElement.bind(this)) ?? -1, c != -1))), (s || i != -1) && (a.sectProps = s, a.pageBreak = i != -1, a = { sectProps: null, elements: [], pageBreak: !1 }, n.push(a)), i != -1) {
          let h = u.children[i], m = c < h.children.length - 1;
          if (i < u.children.length - 1 || m) {
            var f = p.children, o = { ...p, children: f.slice(i) };
            if (p.children = f.slice(0, i), a.elements.push(o), m) {
              let k = h.children, x = { ...h, children: k.slice(0, c) };
              p.children.push(x), h.children = k.slice(c);
            }
          }
        }
      }
    }
    let l = null;
    for (let p = n.length - 1; p >= 0; p--)
      n[p].sectProps == null ? n[p].sectProps = l ?? r : l = n[p].sectProps;
    return n;
  }
  groupByPageBreaks(t) {
    let r = [], a;
    const n = [r];
    for (let s of t)
      r.push(s), (this.options.ignoreLastRenderedPageBreak || s.pageBreak || this.isPageBreakSection(a, s.sectProps)) && n.push(r = []), a = s.sectProps;
    return n.filter((s) => s.length > 0);
  }
  renderWrapper(t) {
    return this.h({ tagName: "div", className: `${this.className}-wrapper`, children: t });
  }
  renderDefaultStyle() {
    var t = this.className, r = `
.${t}-wrapper { background: gray; padding: 30px; padding-bottom: 0px; display: flex; flex-flow: column; align-items: center; } 
.${t}-wrapper>section.${t} { background: white; box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); margin-bottom: 30px; }`;
    this.options.hideWrapperOnPrint && (r = `@media not print { ${r} }`);
    var a = `${r}
.${t} { color: black; hyphens: auto; text-underline-position: from-font; }
section.${t} { box-sizing: border-box; display: flex; flex-flow: column nowrap; position: relative; overflow: hidden; }
section.${t}>article { margin-bottom: auto; z-index: 1; }
section.${t}>footer { z-index: 1; }
.${t} table { border-collapse: collapse; }
.${t} table td, .${t} table th { vertical-align: top; }
.${t} p { margin: 0pt; min-height: 1em; }
.${t} span { white-space: pre-wrap; overflow-wrap: break-word; }
.${t} a { color: inherit; text-decoration: inherit; }
.${t} svg { fill: transparent; }
`;
    return this.options.renderComments && (a += `
.${t}-comment-ref { cursor: default; }
.${t}-comment-popover { display: none; z-index: 1000; padding: 0.5rem; background: white; position: absolute; box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.25); width: 30ch; }
.${t}-comment-ref:hover~.${t}-comment-popover { display: block; }
.${t}-comment-author,.${t}-comment-date { font-size: 0.875rem; color: #888; }
`), [
      this.h({ tagName: "#comment", children: ["docxjs library predefined styles"] }),
      this.h({ tagName: "style", children: [a] })
    ];
  }
  async renderNumbering(t) {
    var r = "", a = [];
    for (var n of t) {
      var s = `p.${this.numberingClass(n.id, n.level)}`, i = "none";
      if (n.bullet) {
        let c = `--${this.className}-${n.bullet.src}`.toLowerCase();
        r += this.styleToString(`${s}:before`, {
          content: "' '",
          display: "inline-block",
          background: `var(${c})`
        }, n.bullet.style);
        try {
          const f = await this.document.loadNumberingImage(n.bullet.src);
          r += `${this.rootSelector} { ${c}: url(${f}) }`;
        } catch {
          this.options.debug && console.warn(`Can't load numbering image with src ${n.bullet.src}`);
        }
      } else if (n.levelText) {
        let c = this.numberingCounter(n.id, n.level);
        const f = c + " " + (n.start - 1);
        n.level > 0 && (r += this.styleToString(`p.${this.numberingClass(n.id, n.level - 1)}`, {
          "counter-set": f
        })), a.push(f), r += this.styleToString(`${s}:before`, {
          content: this.levelTextToContent(n.levelText, n.suff, n.id, this.numFormatToCssValue(n.format)),
          "counter-increment": c,
          ...n.rStyle
        });
      } else
        i = this.numFormatToCssValue(n.format);
      r += this.styleToString(s, {
        display: "list-item",
        "list-style-position": "inside",
        "list-style-type": i,
        ...n.pStyle
      });
    }
    return a.length > 0 && (r += this.styleToString(this.rootSelector, {
      "counter-reset": a.join(" ")
    })), [
      this.h({ tagName: "#comment", children: ["docxjs document numbering styles"] }),
      this.h({ tagName: "style", children: [r] })
    ];
  }
  renderStyles(t) {
    var r = "";
    const a = this.styleMap, n = lt(t.filter((f) => f.isDefault), (f) => f.target);
    for (const f of t) {
      var s = f.styles;
      if (f.linked) {
        var i = f.linked && a[f.linked];
        i ? s = s.concat(i.styles) : this.options.debug && console.warn(`Can't find linked style ${f.linked}`);
      }
      for (const o of s) {
        var c = `${f.target ?? ""}.${f.cssName}`;
        f.target != o.target && (c += ` ${o.target}`), n[f.target] == f && (c = `.${this.className} ${f.target}, ` + c), r += this.styleToString(c, o.values);
      }
    }
    return [
      this.h({ tagName: "#comment", children: ["docxjs document styles"] }),
      this.h({ tagName: "style", children: [r] })
    ];
  }
  renderNotes(t, r) {
    var a = t.map((n) => r[n]).filter((n) => n);
    if (a.length > 0)
      return this.h({ tagName: "ol", children: this.renderElements(a) });
  }
  renderElement(t) {
    switch (t.type) {
      case z.Paragraph:
        return this.renderParagraph(t);
      case z.BookmarkStart:
        return this.renderBookmarkStart(t);
      case z.BookmarkEnd:
        return null;
      case z.Run:
        return this.renderRun(t);
      case z.Table:
        return this.renderTable(t);
      case z.Row:
        return this.renderTableRow(t);
      case z.Cell:
        return this.renderTableCell(t);
      case z.Hyperlink:
        return this.renderHyperlink(t);
      case z.SmartTag:
        return this.renderSmartTag(t);
      case z.Drawing:
        return this.renderDrawing(t);
      case z.Image:
        return this.renderImage(t);
      case z.Text:
        return this.renderText(t);
      case z.Text:
        return this.renderText(t);
      case z.DeletedText:
        return this.renderDeletedText(t);
      case z.Tab:
        return this.renderTab(t);
      case z.Symbol:
        return this.renderSymbol(t);
      case z.Break:
        return this.renderBreak(t);
      case z.Footer:
        return this.renderContainer(t, "footer");
      case z.Header:
        return this.renderContainer(t, "header");
      case z.Footnote:
      case z.Endnote:
        return this.renderContainer(t, "li");
      case z.FootnoteReference:
        return this.renderFootnoteReference(t);
      case z.EndnoteReference:
        return this.renderEndnoteReference(t);
      case z.NoBreakHyphen:
        return this.h({ tagName: "wbr" });
      case z.VmlPicture:
        return this.renderVmlPicture(t);
      case z.VmlElement:
        return this.renderVmlElement(t);
      case z.MmlMath:
        return this.renderContainerNS(t, Ue.mathML, "math", { xmlns: Ue.mathML });
      case z.MmlMathParagraph:
        return this.renderContainer(t, "span");
      case z.MmlFraction:
        return this.renderContainerNS(t, Ue.mathML, "mfrac");
      case z.MmlBase:
        return this.renderContainerNS(t, Ue.mathML, t.parent.type == z.MmlMatrixRow ? "mtd" : "mrow");
      case z.MmlNumerator:
      case z.MmlDenominator:
      case z.MmlFunction:
      case z.MmlLimit:
      case z.MmlBox:
        return this.renderContainerNS(t, Ue.mathML, "mrow");
      case z.MmlGroupChar:
        return this.renderMmlGroupChar(t);
      case z.MmlLimitLower:
        return this.renderContainerNS(t, Ue.mathML, "munder");
      case z.MmlMatrix:
        return this.renderContainerNS(t, Ue.mathML, "mtable");
      case z.MmlMatrixRow:
        return this.renderContainerNS(t, Ue.mathML, "mtr");
      case z.MmlRadical:
        return this.renderMmlRadical(t);
      case z.MmlSuperscript:
        return this.renderContainerNS(t, Ue.mathML, "msup");
      case z.MmlSubscript:
        return this.renderContainerNS(t, Ue.mathML, "msub");
      case z.MmlDegree:
      case z.MmlSuperArgument:
      case z.MmlSubArgument:
        return this.renderContainerNS(t, Ue.mathML, "mn");
      case z.MmlFunctionName:
        return this.renderContainerNS(t, Ue.mathML, "ms");
      case z.MmlDelimiter:
        return this.renderMmlDelimiter(t);
      case z.MmlRun:
        return this.renderMmlRun(t);
      case z.MmlNary:
        return this.renderMmlNary(t);
      case z.MmlPreSubSuper:
        return this.renderMmlPreSubSuper(t);
      case z.MmlBar:
        return this.renderMmlBar(t);
      case z.MmlEquationArray:
        return this.renderMllList(t);
      case z.Inserted:
        return this.renderInserted(t);
      case z.Deleted:
        return this.renderDeleted(t);
      case z.CommentRangeStart:
        return this.renderCommentRangeStart(t);
      case z.CommentRangeEnd:
        return this.renderCommentRangeEnd(t);
      case z.CommentReference:
        return this.renderCommentReference(t);
      case z.AltChunk:
        return this.renderAltChunk(t);
    }
    return null;
  }
  renderElements(t, r) {
    if (t == null)
      return null;
    var a = t.flatMap((n) => this.renderElement(n)).filter((n) => n != null);
    return r && a.forEach((n) => r.appendChild(yn(n) ? document.createTextNode(n) : n)), a;
  }
  renderContainer(t, r, a) {
    return this.h({ tagName: r, children: this.renderElements(t.children), ...a });
  }
  renderContainerNS(t, r, a, n) {
    return this.h({ ns: r, tagName: a, children: this.renderElements(t.children), ...n });
  }
  renderParagraph(t) {
    var r = this.toHTML(t, Ue.html, "p");
    const a = this.findStyle(t.styleName);
    t.tabs ?? (t.tabs = a?.paragraphProps?.tabs);
    const n = t.numbering ?? a?.paragraphProps?.numbering;
    return n && r.classList.add(this.numberingClass(n.id, n.level)), r;
  }
  renderHyperlink(t) {
    const r = this.toH(t, Ue.html, "a");
    if (r.href = "", t.id) {
      const a = this.document.documentPart.rels.find((n) => n.id == t.id && n.targetMode === "External");
      r.href = a?.target ?? r.href;
    }
    return t.anchor && (r.href += `#${t.anchor}`), this.h(r);
  }
  renderSmartTag(t) {
    return this.renderContainer(t, "span");
  }
  renderCommentRangeStart(t) {
    if (!this.options.renderComments)
      return null;
    const r = new Range();
    this.commentHighlight?.add(r);
    const a = this.h({ tagName: "#comment", children: [`start of comment #${t.id}`] });
    return this.later(() => r.setStart(a, 0)), this.commentMap[t.id] = r, a;
  }
  renderCommentRangeEnd(t) {
    if (!this.options.renderComments)
      return null;
    const r = this.commentMap[t.id], a = this.h({ tagName: "#comment", children: [`end of comment #${t.id}`] });
    return this.later(() => r?.setEnd(a, 0)), a;
  }
  renderCommentReference(t) {
    if (!this.options.renderComments)
      return null;
    var r = this.document.commentsPart?.commentMap[t.id];
    if (!r)
      return null;
    const a = this.h({ tagName: "span", className: `${this.className}-comment-ref`, children: ["💬"] }), n = this.h({
      tagName: "div",
      className: `${this.className}-comment-popover`,
      children: [
        this.h({ tagName: "div", className: `${this.className}-comment-author`, children: [r.author] }),
        this.h({ tagName: "div", className: `${this.className}-comment-date`, children: [new Date(r.date).toLocaleString()] }),
        ...this.renderElements(r.children)
      ]
    });
    return this.h({ tagName: "#fragment", children: [
      this.h({ tagName: "#comment", children: [`comment #${r.id} by ${r.author} on ${r.date}`] }),
      a,
      n
    ] });
  }
  renderAltChunk(t) {
    if (!this.options.renderAltChunks)
      return null;
    var r = this.h({ tagName: "iframe" });
    return this.tasks.push(this.document.loadAltChunk(t.id, this.currentPart).then((a) => {
      r.srcdoc = a;
    })), r;
  }
  renderDrawing(t) {
    var r = this.toHTML(t, Ue.html, "div");
    return r.style.display = "inline-block", r.style.position = "relative", r.style.textIndent = "0px", r;
  }
  renderImage(t) {
    let r = this.toHTML(t, Ue.html, "img", []), a = t.cssStyle?.transform;
    if (t.srcRect && t.srcRect.some((f) => f != 0)) {
      var [n, s, i, c] = t.srcRect;
      a = `scale(${1 / (1 - n - i)}, ${1 / (1 - s - c)})`, r.style["clip-path"] = `rect(${(100 * s).toFixed(2)}% ${(100 * (1 - i)).toFixed(2)}% ${(100 * (1 - c)).toFixed(2)}% ${(100 * n).toFixed(2)}%)`;
    }
    return t.rotation && (a = `rotate(${t.rotation}deg) ${a ?? ""}`), r.style.transform = a?.trim(), this.document && this.tasks.push(this.document.loadDocumentImage(t.src, this.currentPart).then((f) => {
      r.src = f;
    })), r;
  }
  renderText(t) {
    return this.h(t.text);
  }
  renderDeletedText(t) {
    return this.options.renderChanges ? this.renderText(t) : null;
  }
  renderBreak(t) {
    return t.break == "textWrapping" ? this.h({ tagName: "br" }) : null;
  }
  renderInserted(t) {
    return this.options.renderChanges ? this.renderChange(t, "ins") : this.renderElements(t.children);
  }
  renderDeleted(t) {
    return this.options.renderChanges ? this.renderChange(t, "del") : null;
  }
  renderChange(t, r) {
    return this.renderContainer(t, r, {
      dateTime: t.date
    });
  }
  renderSymbol(t) {
    return this.h({ tagName: "span", children: [String.fromCharCode(t.char)], style: { fontFamily: t.font } });
  }
  renderFootnoteReference(t) {
    return this.currentFootnoteIds.push(t.id), this.h({ tagName: "sup", children: [`${this.currentFootnoteIds.length}`] });
  }
  renderEndnoteReference(t) {
    return this.currentEndnoteIds.push(t.id), this.h({ tagName: "sup", children: [`${this.currentEndnoteIds.length}`] });
  }
  renderTab(t) {
    var r = this.h({ tagName: "span", children: [" "] });
    if (this.options.experimental) {
      r.className = this.tabStopClass();
      var a = Kf(t, z.Paragraph)?.tabs;
      this.currentTabs.push({ stops: a, span: r });
    }
    return r;
  }
  renderBookmarkStart(t) {
    return this.h({ tagName: "span", id: t.name });
  }
  renderRun(t) {
    if (t.fieldRun)
      return null;
    let r = this.renderElements(t.children);
    t.verticalAlign && (r = [this.h({ tagName: t.verticalAlign, children: this.renderElements(t.children) })]);
    const a = this.toHTML(t, Ue.html, "span", r);
    return t.id && (a.id = t.id), a;
  }
  renderTable(t) {
    this.tableCellPositions.push(this.currentCellPosition), this.tableVerticalMerges.push(this.currentVerticalMerge), this.currentVerticalMerge = {}, this.currentCellPosition = { col: 0, row: 0 };
    const r = [];
    return t.columns && r.push(this.renderTableColumns(t.columns)), r.push(...this.renderElements(t.children)), this.currentVerticalMerge = this.tableVerticalMerges.pop(), this.currentCellPosition = this.tableCellPositions.pop(), this.toHTML(t, Ue.html, "table", r);
  }
  renderTableColumns(t) {
    const r = t.map((a) => this.h({ tagName: "col", style: { width: a.width } }));
    return this.h({ tagName: "colgroup", children: r });
  }
  renderTableRow(t) {
    this.currentCellPosition.col = 0;
    const r = [];
    return t.gridBefore && r.push(this.renderTableCellPlaceholder(t.gridBefore)), r.push(...this.renderElements(t.children)), t.gridAfter && r.push(this.renderTableCellPlaceholder(t.gridAfter)), this.currentCellPosition.row++, this.toHTML(t, Ue.html, "tr", r);
  }
  renderTableCellPlaceholder(t) {
    return this.h({ tagName: "td", colSpan: t, style: { border: "none" } });
  }
  renderTableCell(t) {
    let r = this.toHTML(t, Ue.html, "td");
    const a = this.currentCellPosition.col;
    return t.verticalMerge ? t.verticalMerge == "restart" ? (this.currentVerticalMerge[a] = r, r.rowSpan = 1) : this.currentVerticalMerge[a] && (this.currentVerticalMerge[a].rowSpan += 1, r.style.display = "none") : this.currentVerticalMerge[a] = null, t.span && (r.colSpan = t.span), this.currentCellPosition.col += r.colSpan, r;
  }
  renderVmlPicture(t) {
    return this.renderContainer(t, "div");
  }
  renderVmlElement(t) {
    var r = this.h({ ns: Ue.svg, tagName: "svg", style: t.cssStyleText });
    const a = this.renderVmlChildElement(t);
    return t.imageHref?.id && this.tasks.push(this.document?.loadDocumentImage(t.imageHref.id, this.currentPart).then((n) => a.setAttribute("href", n))), r.appendChild(a), requestAnimationFrame(() => {
      const n = r.firstElementChild.getBBox();
      r.setAttribute("width", `${Math.ceil(n.x + n.width)}`), r.setAttribute("height", `${Math.ceil(n.y + n.height)}`);
    }), r;
  }
  renderVmlChildElement(t) {
    const r = this.createSvgElement(t.tagName);
    Object.entries(t.attrs).forEach(([a, n]) => r.setAttribute(a, n));
    for (let a of t.children)
      a.type == z.VmlElement ? r.appendChild(this.renderVmlChildElement(a)) : r.appendChild(...Jt(this.renderElement(a)));
    return r;
  }
  renderMmlRadical(t) {
    const r = t.children.find((n) => n.type == z.MmlBase);
    if (t.props?.hideDegree)
      return this.createMathMLElement("msqrt", null, this.renderElements([r]));
    const a = t.children.find((n) => n.type == z.MmlDegree);
    return this.createMathMLElement("mroot", null, this.renderElements([r, a]));
  }
  renderMmlDelimiter(t) {
    const r = [];
    return r.push(this.createMathMLElement("mo", null, [t.props.beginChar ?? "("])), r.push(...this.renderElements(t.children)), r.push(this.createMathMLElement("mo", null, [t.props.endChar ?? ")"])), this.createMathMLElement("mrow", null, r);
  }
  renderMmlNary(t) {
    const r = [], a = lt(t.children, (o) => o.type), n = a[z.MmlSuperArgument], s = a[z.MmlSubArgument], i = n ? this.createMathMLElement("mo", null, Jt(this.renderElement(n))) : null, c = s ? this.createMathMLElement("mo", null, Jt(this.renderElement(s))) : null, f = this.createMathMLElement("mo", null, [t.props?.char ?? "∫"]);
    return i || c ? r.push(this.createMathMLElement("munderover", null, [f, c, i])) : i ? r.push(this.createMathMLElement("mover", null, [f, i])) : c ? r.push(this.createMathMLElement("munder", null, [f, c])) : r.push(f), r.push(...this.renderElements(a[z.MmlBase].children)), this.createMathMLElement("mrow", null, r);
  }
  renderMmlPreSubSuper(t) {
    const r = [], a = lt(t.children, (o) => o.type), n = a[z.MmlSuperArgument], s = a[z.MmlSubArgument], i = n ? this.createMathMLElement("mo", null, Jt(this.renderElement(n))) : null, c = s ? this.createMathMLElement("mo", null, Jt(this.renderElement(s))) : null, f = this.createMathMLElement("mo", null);
    return r.push(this.createMathMLElement("msubsup", null, [f, c, i])), r.push(...this.renderElements(a[z.MmlBase].children)), this.createMathMLElement("mrow", null, r);
  }
  renderMmlGroupChar(t) {
    const r = t.props.verticalJustification === "bot" ? "mover" : "munder", a = this.renderContainerNS(t, Ue.mathML, r);
    return t.props.char && a.appendChild(this.createMathMLElement("mo", null, [t.props.char])), a;
  }
  renderMmlBar(t) {
    const r = {};
    switch (t.props.position) {
      case "top":
        r.textDecoration = "overline";
        break;
      case "bottom":
        r.textDecoration = "underline";
        break;
    }
    return this.renderContainerNS(t, Ue.mathML, "mrow", { style: r });
  }
  renderMmlRun(t) {
    return this.toHTML(t, Ue.mathML, "ms");
  }
  renderMllList(t) {
    const r = this.renderElements(t.children).map((a) => this.createMathMLElement("mtr", null, [
      this.createMathMLElement("mtd", null, [a])
    ]));
    return this.toHTML(t, Ue.mathML, "mtable", r);
  }
  toH(t, r, a, n = null) {
    const { $lang: s, ...i } = t.cssStyle ?? {}, c = Xf(t.className, t.styleName && this.processStyleName(t.styleName));
    return { ns: r, tagName: a, className: c, lang: s, style: i, children: n ?? this.renderElements(t.children) };
  }
  toHTML(t, r, a, n = null) {
    return this.h(this.toH(t, r, a, n));
  }
  findStyle(t) {
    return t && this.styleMap?.[t];
  }
  numberingClass(t, r) {
    return `${this.className}-num-${t}-${r}`;
  }
  tabStopClass() {
    return `${this.className}-tab-stop`;
  }
  styleToString(t, r, a = null) {
    let n = `${t} {\r
`;
    for (const s in r)
      s.startsWith("$") || (n += `  ${s}: ${r[s]};\r
`);
    return a && (n += a), n + `}\r
`;
  }
  numberingCounter(t, r) {
    return `${this.className}-num-${t}-${r}`;
  }
  levelTextToContent(t, r, a, n) {
    const s = {
      tab: "\\9",
      space: "\\a0"
    };
    var i = t.replace(/%\d*/g, (c) => {
      let f = parseInt(c.substring(1), 10) - 1;
      return `"counter(${this.numberingCounter(a, f)}, ${n})"`;
    });
    return `"${i}${s[r] ?? ""}"`;
  }
  numFormatToCssValue(t) {
    var r = {
      none: "none",
      bullet: "disc",
      decimal: "decimal",
      lowerLetter: "lower-alpha",
      upperLetter: "upper-alpha",
      lowerRoman: "lower-roman",
      upperRoman: "upper-roman",
      decimalZero: "decimal-leading-zero",
      aiueo: "katakana",
      aiueoFullWidth: "katakana",
      chineseCounting: "simp-chinese-informal",
      chineseCountingThousand: "simp-chinese-informal",
      chineseLegalSimplified: "simp-chinese-formal",
      chosung: "hangul-consonant",
      ideographDigital: "cjk-ideographic",
      ideographTraditional: "cjk-heavenly-stem",
      ideographLegalTraditional: "trad-chinese-formal",
      ideographZodiac: "cjk-earthly-branch",
      iroha: "katakana-iroha",
      irohaFullWidth: "katakana-iroha",
      japaneseCounting: "japanese-informal",
      japaneseDigitalTenThousand: "cjk-decimal",
      japaneseLegal: "japanese-formal",
      thaiNumbers: "thai",
      koreanCounting: "korean-hangul-formal",
      koreanDigital: "korean-hangul-formal",
      koreanDigital2: "korean-hanja-informal",
      hebrew1: "hebrew",
      hebrew2: "hebrew",
      hindiNumbers: "devanagari",
      ganada: "hangul",
      taiwaneseCounting: "cjk-ideographic",
      taiwaneseCountingThousand: "cjk-ideographic",
      taiwaneseDigital: "cjk-decimal"
    };
    return r[t] ?? t;
  }
  refreshTabStops() {
    this.options.experimental && setTimeout(() => {
      const t = $f();
      for (let r of this.currentTabs)
        Gf(r.span, r.stops, this.defaultTabSize, t);
    }, 500);
  }
  createElementNS(t, r, a, n) {
    return this.h({ ns: t, tagName: r, children: n, ...a });
  }
  createElement(t, r, a) {
    return this.createElementNS(Ue.html, t, r, a);
  }
  createMathMLElement(t, r, a) {
    return this.createElementNS(Ue.mathML, t, r, a);
  }
  createSvgElement(t, r, a) {
    return this.createElementNS(Ue.svg, t, r, a);
  }
  later(t) {
    this.postRenderTasks.push(t);
  }
}
function Kf(e, t) {
  for (var r = e.parent; r != null && r.type != t; )
    r = r.parent;
  return r;
}
const N0 = {
  ignoreHeight: !1,
  ignoreWidth: !1,
  ignoreFonts: !1,
  breakPages: !0,
  debug: !1,
  experimental: !1,
  className: "docx",
  inWrapper: !0,
  hideWrapperOnPrint: !1,
  trimXmlDeclaration: !0,
  ignoreLastRenderedPageBreak: !0,
  renderHeaders: !0,
  renderFooters: !0,
  renderFootnotes: !0,
  renderEndnotes: !0,
  useBase64URL: !1,
  renderChanges: !1,
  renderComments: !1,
  renderAltChunks: !0,
  h: da
};
function jf(e, t) {
  const r = { ...N0, ...t };
  return Ln.load(e, new Hf(r), r);
}
async function Yf(e, t) {
  const r = { ...N0, ...t };
  return await new zf().render(e, r);
}
async function lg(e, t, r, a) {
  const n = await jf(e, a), s = await Yf(n, a);
  r ?? (r = t), r.innerHTML = "", t.innerHTML = "";
  for (let i of s)
    (i.nodeName === "STYLE" ? r : t).appendChild(i);
  return n;
}
var Vr = 1200, Jf = [874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1e4], Bn = {
  0: 1252,
  /* ANSI */
  1: 65001,
  /* DEFAULT */
  2: 65001,
  /* SYMBOL */
  77: 1e4,
  /* MAC */
  128: 932,
  /* SHIFTJIS */
  129: 949,
  /* HANGUL */
  130: 1361,
  /* JOHAB */
  134: 936,
  /* GB2312 */
  136: 950,
  /* CHINESEBIG5 */
  161: 1253,
  /* GREEK */
  162: 1254,
  /* TURKISH */
  163: 1258,
  /* VIETNAMESE */
  177: 1255,
  /* HEBREW */
  178: 1256,
  /* ARABIC */
  186: 1257,
  /* BALTIC */
  204: 1251,
  /* RUSSIAN */
  222: 874,
  /* THAI */
  238: 1250,
  /* EASTEUROPE */
  255: 1252,
  /* OEM */
  69: 6969
  /* MISC */
}, Un = function(e) {
  Jf.indexOf(e) != -1 && (Bn[0] = e);
};
function Zf() {
  Un(1252);
}
var jr = function(e) {
  Vr = e, Un(e);
};
function D0() {
  jr(1200), Zf();
}
function vs(e) {
  for (var t = [], r = 0, a = e.length; r < a; ++r) t[r] = e.charCodeAt(r);
  return t;
}
function R0(e) {
  for (var t = [], r = 0; r < e.length >> 1; ++r) t[r] = String.fromCharCode(e.charCodeAt(2 * r) + (e.charCodeAt(2 * r + 1) << 8));
  return t.join("");
}
function qf(e) {
  for (var t = [], r = 0; r < e.length >> 1; ++r) t[r] = String.fromCharCode(e[2 * r] + (e[2 * r + 1] << 8));
  return t.join("");
}
function I0(e) {
  for (var t = [], r = 0; r < e.length >> 1; ++r) t[r] = String.fromCharCode(e.charCodeAt(2 * r + 1) + (e.charCodeAt(2 * r) << 8));
  return t.join("");
}
var qt = function(e) {
  var t = e.charCodeAt(0), r = e.charCodeAt(1);
  return t == 255 && r == 254 ? R0(e.slice(2)) : t == 254 && r == 255 ? I0(e.slice(2)) : t == 65279 ? e.slice(1) : e;
}, Da = function(t) {
  return String.fromCharCode(t);
}, ks = function(t) {
  return String.fromCharCode(t);
}, Qf = null, ut = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function _s(e) {
  for (var t = "", r = 0, a = 0, n = 0, s = 0, i = 0, c = 0, f = 0, o = 0; o < e.length; )
    r = e.charCodeAt(o++), s = r >> 2, a = e.charCodeAt(o++), i = (r & 3) << 4 | a >> 4, n = e.charCodeAt(o++), c = (a & 15) << 2 | n >> 6, f = n & 63, isNaN(a) ? c = f = 64 : isNaN(n) && (f = 64), t += ut.charAt(s) + ut.charAt(i) + ut.charAt(c) + ut.charAt(f);
  return t;
}
function Mr(e) {
  var t = "", r = 0, a = 0, n = 0, s = 0, i = 0, c = 0, f = 0;
  if (e.slice(0, 5) == "data:") {
    var o = e.slice(0, 1024).indexOf(";base64,");
    o > -1 && (e = e.slice(o + 8));
  }
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var o = 0; o < e.length; )
    s = ut.indexOf(e.charAt(o++)), i = ut.indexOf(e.charAt(o++)), r = s << 2 | i >> 4, t += String.fromCharCode(r), c = ut.indexOf(e.charAt(o++)), a = (i & 15) << 4 | c >> 2, c !== 64 && (t += String.fromCharCode(a)), f = ut.indexOf(e.charAt(o++)), n = (c & 3) << 6 | f, f !== 64 && (t += String.fromCharCode(n));
  return t;
}
var Ce = /* @__PURE__ */ (function() {
  return typeof Buffer < "u" && typeof process < "u" && typeof process.versions < "u" && !!process.versions.node;
})(), gt = /* @__PURE__ */ (function() {
  if (typeof Buffer < "u") {
    var e = !Buffer.from;
    if (!e) try {
      Buffer.from("foo", "utf8");
    } catch {
      e = !0;
    }
    return e ? function(t, r) {
      return r ? new Buffer(t, r) : new Buffer(t);
    } : Buffer.from.bind(Buffer);
  }
  return function() {
  };
})(), xa = /* @__PURE__ */ (function() {
  if (typeof Buffer > "u") return !1;
  var e = gt([65, 0]);
  if (!e) return !1;
  var t = e.toString("utf16le");
  return t.length == 1;
})();
function xt(e) {
  return Ce ? Buffer.alloc ? Buffer.alloc(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
function Es(e) {
  return Ce ? Buffer.allocUnsafe ? Buffer.allocUnsafe(e) : new Buffer(e) : typeof Uint8Array < "u" ? new Uint8Array(e) : new Array(e);
}
var Rr = function(t) {
  return Ce ? gt(t, "binary") : t.split("").map(function(r) {
    return r.charCodeAt(0) & 255;
  });
};
function ct(e) {
  if (Array.isArray(e)) return e.map(function(a) {
    return String.fromCharCode(a);
  }).join("");
  for (var t = [], r = 0; r < e.length; ++r) t[r] = String.fromCharCode(e[r]);
  return t.join("");
}
function Hn(e) {
  if (typeof ArrayBuffer > "u") throw new Error("Unsupported");
  if (e instanceof ArrayBuffer) return Hn(new Uint8Array(e));
  for (var t = new Array(e.length), r = 0; r < e.length; ++r) t[r] = e[r];
  return t;
}
var ht = Ce ? function(e) {
  return Buffer.concat(e.map(function(t) {
    return Buffer.isBuffer(t) ? t : gt(t);
  }));
} : function(e) {
  if (typeof Uint8Array < "u") {
    var t = 0, r = 0;
    for (t = 0; t < e.length; ++t) r += e[t].length;
    var a = new Uint8Array(r), n = 0;
    for (t = 0, r = 0; t < e.length; r += n, ++t)
      n = e[t].length, e[t] instanceof Uint8Array ? a.set(e[t], r) : typeof e[t] == "string" ? a.set(new Uint8Array(Rr(e[t])), r) : a.set(new Uint8Array(e[t]), r);
    return a;
  }
  return [].concat.apply([], e.map(function(s) {
    return Array.isArray(s) ? s : [].slice.call(s);
  }));
};
function eo(e) {
  for (var t = [], r = 0, a = e.length + 250, n = xt(e.length + 255), s = 0; s < e.length; ++s) {
    var i = e.charCodeAt(s);
    if (i < 128) n[r++] = i;
    else if (i < 2048)
      n[r++] = 192 | i >> 6 & 31, n[r++] = 128 | i & 63;
    else if (i >= 55296 && i < 57344) {
      i = (i & 1023) + 64;
      var c = e.charCodeAt(++s) & 1023;
      n[r++] = 240 | i >> 8 & 7, n[r++] = 128 | i >> 2 & 63, n[r++] = 128 | c >> 6 & 15 | (i & 3) << 4, n[r++] = 128 | c & 63;
    } else
      n[r++] = 224 | i >> 12 & 15, n[r++] = 128 | i >> 6 & 63, n[r++] = 128 | i & 63;
    r > a && (t.push(n.slice(0, r)), r = 0, n = xt(65535), a = 65530);
  }
  return t.push(n.slice(0, r)), ht(t);
}
var br = /\u0000/g, Qt = /[\u0001-\u0006]/g;
function Wt(e) {
  for (var t = "", r = e.length - 1; r >= 0; ) t += e.charAt(r--);
  return t;
}
function Yr(e, t) {
  var r = "" + e;
  return r.length >= t ? r : De("0", t - r.length) + r;
}
function Wn(e, t) {
  var r = "" + e;
  return r.length >= t ? r : De(" ", t - r.length) + r;
}
function Xa(e, t) {
  var r = "" + e;
  return r.length >= t ? r : r + De(" ", t - r.length);
}
function ro(e, t) {
  var r = "" + Math.round(e);
  return r.length >= t ? r : De("0", t - r.length) + r;
}
function to(e, t) {
  var r = "" + e;
  return r.length >= t ? r : De("0", t - r.length) + r;
}
var ws = /* @__PURE__ */ Math.pow(2, 32);
function Mt(e, t) {
  if (e > ws || e < -ws) return ro(e, t);
  var r = Math.round(e);
  return to(r, t);
}
function za(e, t) {
  return t = t || 0, e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108;
}
var Ts = [
  ["Sun", "Sunday"],
  ["Mon", "Monday"],
  ["Tue", "Tuesday"],
  ["Wed", "Wednesday"],
  ["Thu", "Thursday"],
  ["Fri", "Friday"],
  ["Sat", "Saturday"]
], mn = [
  ["J", "Jan", "January"],
  ["F", "Feb", "February"],
  ["M", "Mar", "March"],
  ["A", "Apr", "April"],
  ["M", "May", "May"],
  ["J", "Jun", "June"],
  ["J", "Jul", "July"],
  ["A", "Aug", "August"],
  ["S", "Sep", "September"],
  ["O", "Oct", "October"],
  ["N", "Nov", "November"],
  ["D", "Dec", "December"]
];
function ao(e) {
  return e || (e = {}), e[0] = "General", e[1] = "0", e[2] = "0.00", e[3] = "#,##0", e[4] = "#,##0.00", e[9] = "0%", e[10] = "0.00%", e[11] = "0.00E+00", e[12] = "# ?/?", e[13] = "# ??/??", e[14] = "m/d/yy", e[15] = "d-mmm-yy", e[16] = "d-mmm", e[17] = "mmm-yy", e[18] = "h:mm AM/PM", e[19] = "h:mm:ss AM/PM", e[20] = "h:mm", e[21] = "h:mm:ss", e[22] = "m/d/yy h:mm", e[37] = "#,##0 ;(#,##0)", e[38] = "#,##0 ;[Red](#,##0)", e[39] = "#,##0.00;(#,##0.00)", e[40] = "#,##0.00;[Red](#,##0.00)", e[45] = "mm:ss", e[46] = "[h]:mm:ss", e[47] = "mmss.0", e[48] = "##0.0E+0", e[49] = "@", e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "', e;
}
var _e = {
  0: "General",
  1: "0",
  2: "0.00",
  3: "#,##0",
  4: "#,##0.00",
  9: "0%",
  10: "0.00%",
  11: "0.00E+00",
  12: "# ?/?",
  13: "# ??/??",
  14: "m/d/yy",
  15: "d-mmm-yy",
  16: "d-mmm",
  17: "mmm-yy",
  18: "h:mm AM/PM",
  19: "h:mm:ss AM/PM",
  20: "h:mm",
  21: "h:mm:ss",
  22: "m/d/yy h:mm",
  37: "#,##0 ;(#,##0)",
  38: "#,##0 ;[Red](#,##0)",
  39: "#,##0.00;(#,##0.00)",
  40: "#,##0.00;[Red](#,##0.00)",
  45: "mm:ss",
  46: "[h]:mm:ss",
  47: "mmss.0",
  48: "##0.0E+0",
  49: "@",
  56: '"上午/下午 "hh"時"mm"分"ss"秒 "'
}, As = {
  5: 37,
  6: 38,
  7: 39,
  8: 40,
  //  5 -> 37 ...  8 -> 40
  23: 0,
  24: 0,
  25: 0,
  26: 0,
  // 23 ->  0 ... 26 ->  0
  27: 14,
  28: 14,
  29: 14,
  30: 14,
  31: 14,
  // 27 -> 14 ... 31 -> 14
  50: 14,
  51: 14,
  52: 14,
  53: 14,
  54: 14,
  // 50 -> 14 ... 58 -> 14
  55: 14,
  56: 14,
  57: 14,
  58: 14,
  59: 1,
  60: 2,
  61: 3,
  62: 4,
  // 59 ->  1 ... 62 ->  4
  67: 9,
  68: 10,
  // 67 ->  9 ... 68 -> 10
  69: 12,
  70: 13,
  71: 14,
  // 69 -> 12 ... 71 -> 14
  72: 14,
  73: 15,
  74: 16,
  75: 17,
  // 72 -> 14 ... 75 -> 17
  76: 20,
  77: 21,
  78: 22,
  // 76 -> 20 ... 78 -> 22
  79: 45,
  80: 46,
  81: 47,
  // 79 -> 45 ... 81 -> 47
  82: 0
  // 82 ->  0 ... 65536 -> 0 (omitted)
}, no = {
  //  5 -- Currency,   0 decimal, black negative
  5: '"$"#,##0_);\\("$"#,##0\\)',
  63: '"$"#,##0_);\\("$"#,##0\\)',
  //  6 -- Currency,   0 decimal, red   negative
  6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  //  7 -- Currency,   2 decimal, black negative
  7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  //  8 -- Currency,   2 decimal, red   negative
  8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  // 41 -- Accounting, 0 decimal, No Symbol
  41: '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)',
  // 42 -- Accounting, 0 decimal, $  Symbol
  42: '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)',
  // 43 -- Accounting, 2 decimal, No Symbol
  43: '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)',
  // 44 -- Accounting, 2 decimal, $  Symbol
  44: '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)'
};
function Ka(e, t, r) {
  for (var a = e < 0 ? -1 : 1, n = e * a, s = 0, i = 1, c = 0, f = 1, o = 0, l = 0, p = Math.floor(n); o < t && (p = Math.floor(n), c = p * i + s, l = p * o + f, !(n - p < 5e-8)); )
    n = 1 / (n - p), s = i, i = c, f = o, o = l;
  if (l > t && (o > t ? (l = f, c = s) : (l = o, c = i)), !r) return [0, a * c, l];
  var u = Math.floor(a * c / l);
  return [u, a * c - u * l, l];
}
function so(e) {
  var t = e.toPrecision(16);
  if (t.indexOf("e") > -1) {
    var r = t.slice(0, t.indexOf("e"));
    return r = r.indexOf(".") > -1 ? r.slice(0, r.slice(0, 2) == "0." ? 17 : 16) : r.slice(0, 15) + De("0", r.length - 15), r + t.slice(t.indexOf("e"));
  }
  var a = t.indexOf(".") > -1 ? t.slice(0, t.slice(0, 2) == "0." ? 17 : 16) : t.slice(0, 15) + De("0", t.length - 15);
  return Number(a);
}
function tt(e, t, r) {
  if (e > 2958465 || e < 0) return null;
  e = so(e);
  var a = e | 0, n = Math.floor(86400 * (e - a)), s = 0, i = [], c = { D: a, T: n, u: 86400 * (e - a) - n, y: 0, m: 0, d: 0, H: 0, M: 0, S: 0, q: 0 };
  if (Math.abs(c.u) < 1e-6 && (c.u = 0), t && t.date1904 && (a += 1462), c.u > 0.9999 && (c.u = 0, ++n == 86400 && (c.T = n = 0, ++a, ++c.D)), a === 60)
    i = r ? [1317, 10, 29] : [1900, 2, 29], s = 3;
  else if (a === 0)
    i = r ? [1317, 8, 29] : [1900, 1, 0], s = 6;
  else {
    a > 60 && --a;
    var f = new Date(1900, 0, 1);
    f.setDate(f.getDate() + a - 1), i = [f.getFullYear(), f.getMonth() + 1, f.getDate()], s = f.getDay(), a < 60 && (s = (s + 6) % 7), r && (s = oo(f, i));
  }
  return c.y = i[0], c.m = i[1], c.d = i[2], c.S = n % 60, n = Math.floor(n / 60), c.M = n % 60, n = Math.floor(n / 60), c.H = n, c.q = s, c;
}
function Vn(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function io(e) {
  return e.indexOf("E") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E").replace(/(E[+-])(\d)$/, "$10$2");
}
function co(e) {
  var t = e < 0 ? 12 : 11, r = Vn(e.toFixed(12));
  return r.length <= t || (r = e.toPrecision(10), r.length <= t) ? r : e.toExponential(5);
}
function fo(e) {
  var t = Vn(e.toFixed(11));
  return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0" ? e.toPrecision(6) : t;
}
function pa(e) {
  if (!isFinite(e)) return isNaN(e) ? "#NUM!" : "#DIV/0!";
  var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E), r;
  return t >= -4 && t <= -1 ? r = e.toPrecision(10 + t) : Math.abs(t) <= 9 ? r = co(e) : t === 10 ? r = e.toFixed(10).substr(0, 12) : r = fo(e), Vn(io(r.toUpperCase()));
}
function yt(e, t) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : pa(e);
    case "undefined":
      return "";
    case "object":
      if (e == null) return "";
      if (e instanceof Date) return Lr(14, fr(e, t && t.date1904), t);
  }
  throw new Error("unsupported value in General format: " + e);
}
function oo(e, t) {
  t[0] -= 581;
  var r = e.getDay();
  return e < 60 && (r = (r + 6) % 7), r;
}
function lo(e, t, r, a) {
  var n = "", s = 0, i = 0, c = r.y, f, o = 0;
  switch (e) {
    case 98:
      c = r.y + 543;
    /* falls through */
    case 121:
      switch (t.length) {
        case 1:
        case 2:
          f = c % 100, o = 2;
          break;
        default:
          f = c % 1e4, o = 4;
          break;
      }
      break;
    case 109:
      switch (t.length) {
        case 1:
        case 2:
          f = r.m, o = t.length;
          break;
        case 3:
          return mn[r.m - 1][1];
        case 5:
          return mn[r.m - 1][0];
        default:
          return mn[r.m - 1][2];
      }
      break;
    case 100:
      switch (t.length) {
        case 1:
        case 2:
          f = r.d, o = t.length;
          break;
        case 3:
          return Ts[r.q][0];
        default:
          return Ts[r.q][1];
      }
      break;
    case 104:
      switch (t.length) {
        case 1:
        case 2:
          f = 1 + (r.H + 11) % 12, o = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 72:
      switch (t.length) {
        case 1:
        case 2:
          f = r.H, o = t.length;
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 77:
      switch (t.length) {
        case 1:
        case 2:
          f = r.M, o = t.length;
          break;
        default:
          throw "bad minute format: " + t;
      }
      break;
    case 115:
      if (t != "s" && t != "ss" && t != ".0" && t != ".00" && t != ".000") throw "bad second format: " + t;
      return r.u === 0 && (t == "s" || t == "ss") ? Yr(r.S, t.length) : (a >= 2 ? i = a === 3 ? 1e3 : 100 : i = a === 1 ? 10 : 1, s = Math.round(i * (r.S + r.u)), s >= 60 * i && (s = 0), t === "s" ? s === 0 ? "0" : "" + s / i : (n = Yr(s, 2 + a), t === "ss" ? n.substr(0, 2) : "." + n.substr(2, t.length - 1)));
    case 90:
      switch (t) {
        case "[h]":
        case "[hh]":
          f = r.D * 24 + r.H;
          break;
        case "[m]":
        case "[mm]":
          f = (r.D * 24 + r.H) * 60 + r.M;
          break;
        case "[s]":
        case "[ss]":
          f = ((r.D * 24 + r.H) * 60 + r.M) * 60 + (a == 0 ? Math.round(r.S + r.u) : r.S);
          break;
        default:
          throw "bad abstime format: " + t;
      }
      o = t.length === 3 ? 1 : 2;
      break;
    case 101:
      f = c, o = 1;
      break;
  }
  var l = o > 0 ? Yr(f, o) : "";
  return l;
}
function at(e) {
  var t = 3;
  if (e.length <= t) return e;
  for (var r = e.length % t, a = e.substr(0, r); r != e.length; r += t) a += (a.length > 0 ? "," : "") + e.substr(r, t);
  return a;
}
var O0 = /%/g;
function ho(e, t, r) {
  var a = t.replace(O0, ""), n = t.length - a.length;
  return st(e, a, r * Math.pow(10, 2 * n)) + De("%", n);
}
function uo(e, t, r) {
  for (var a = t.length - 1; t.charCodeAt(a - 1) === 44; ) --a;
  return st(e, t.substr(0, a), r / Math.pow(10, 3 * (t.length - a)));
}
function M0(e, t) {
  var r, a = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + M0(e, -t);
    var n = e.indexOf(".");
    n === -1 && (n = e.indexOf("E"));
    var s = Math.floor(Math.log(t) * Math.LOG10E) % n;
    if (s < 0 && (s += n), r = (t / Math.pow(10, s)).toPrecision(a + 1 + (n + s) % n), r.indexOf("e") === -1) {
      var i = Math.floor(Math.log(t) * Math.LOG10E);
      for (r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (i - r.length + s) : r += "E+" + (i - s); r.substr(0, 2) === "0."; )
        r = r.charAt(0) + r.substr(2, n) + "." + r.substr(2 + n), r = r.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.");
      r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(c, f, o, l) {
      return f + o + l.substr(0, (n + s) % n) + "." + l.substr(s) + "E";
    });
  } else r = t.toExponential(a);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
var L0 = /# (\?+)( ?)\/( ?)(\d+)/;
function xo(e, t, r) {
  var a = parseInt(e[4], 10), n = Math.round(t * a), s = Math.floor(n / a), i = n - s * a, c = a;
  return r + (s === 0 ? "" : "" + s) + " " + (i === 0 ? De(" ", e[1].length + 1 + e[4].length) : Wn(i, e[1].length) + e[2] + "/" + e[3] + Yr(c, e[4].length));
}
function po(e, t, r) {
  return r + (t === 0 ? "" : "" + t) + De(" ", e[1].length + 2 + e[4].length);
}
var B0 = /^#*0*\.([0#]+)/, U0 = /\)[^)]*[0#]/, H0 = /\(###\) ###\\?-####/;
function Ar(e) {
  for (var t = "", r, a = 0; a != e.length; ++a) switch (r = e.charCodeAt(a)) {
    case 35:
      break;
    case 63:
      t += " ";
      break;
    case 48:
      t += "0";
      break;
    default:
      t += String.fromCharCode(r);
  }
  return t;
}
function Fs(e, t) {
  var r = Math.pow(10, t);
  return "" + Math.round(e * r) / r;
}
function Ss(e, t) {
  var r = e - Math.floor(e), a = Math.pow(10, t);
  return t < ("" + Math.round(r * a)).length ? 0 : Math.round(r * a);
}
function mo(e, t) {
  return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length ? 1 : 0;
}
function go(e) {
  return e < 2147483647 && e > -2147483648 ? "" + (e >= 0 ? e | 0 : e - 1 | 0) : "" + Math.floor(e);
}
function Hr(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(U0)) {
    var a = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? Hr("n", a, r) : "(" + Hr("n", a, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return uo(e, t, r);
  if (t.indexOf("%") !== -1) return ho(e, t, r);
  if (t.indexOf("E") !== -1) return M0(t, r);
  if (t.charCodeAt(0) === 36) return "$" + Hr(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var n, s, i, c, f = Math.abs(r), o = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return o + Mt(f, t.length);
  if (t.match(/^[#?]+$/))
    return n = Mt(r, 0), n === "0" && (n = ""), n.length > t.length ? n : Ar(t.substr(0, t.length - n.length)) + n;
  if (s = t.match(L0)) return xo(s, f, o);
  if (t.match(/^#+0+$/)) return o + Mt(f, t.length - t.indexOf("0"));
  if (s = t.match(B0))
    return n = Fs(r, s[1].length).replace(/^([^\.]+)$/, "$1." + Ar(s[1])).replace(/\.$/, "." + Ar(s[1])).replace(/\.(\d*)$/, function(m, k) {
      return "." + k + De("0", Ar(
        /*::(*/
        s[1]
      ).length - k.length);
    }), t.indexOf("0.") !== -1 ? n : n.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), s = t.match(/^(0*)\.(#*)$/))
    return o + Fs(f, s[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, s[1].length ? "0." : ".");
  if (s = t.match(/^#{1,3},##0(\.?)$/)) return o + at(Mt(f, 0));
  if (s = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + Hr(e, t, -r) : at("" + (Math.floor(r) + mo(r, s[1].length))) + "." + Yr(Ss(r, s[1].length), s[1].length);
  if (s = t.match(/^#,#*,#0/)) return Hr(e, t.replace(/^#,#*,/, ""), r);
  if (s = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return n = Wt(Hr(e, t.replace(/[\\-]/g, ""), r)), i = 0, Wt(Wt(t.replace(/\\/g, "")).replace(/[0#]/g, function(m) {
      return i < n.length ? n.charAt(i++) : m === "0" ? "0" : "";
    }));
  if (t.match(H0))
    return n = Hr(e, "##########", r), "(" + n.substr(0, 3) + ") " + n.substr(3, 3) + "-" + n.substr(6);
  var l = "";
  if (s = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return i = Math.min(
      /*::String(*/
      s[4].length,
      7
    ), c = Ka(f, Math.pow(10, i) - 1, !1), n = "" + o, l = st(
      "n",
      /*::String(*/
      s[1],
      c[1]
    ), l.charAt(l.length - 1) == " " && (l = l.substr(0, l.length - 1) + "0"), n += l + /*::String(*/
    s[2] + "/" + /*::String(*/
    s[3], l = Xa(c[2], i), l.length < s[4].length && (l = Ar(s[4].substr(s[4].length - l.length)) + l), n += l, n;
  if (s = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return i = Math.min(Math.max(s[1].length, s[4].length), 7), c = Ka(f, Math.pow(10, i) - 1, !0), o + (c[0] || (c[1] ? "" : "0")) + " " + (c[1] ? Wn(c[1], i) + s[2] + "/" + s[3] + Xa(c[2], i) : De(" ", 2 * i + 1 + s[2].length + s[3].length));
  if (s = t.match(/^[#0?]+$/))
    return n = Mt(r, 0), t.length <= n.length ? n : Ar(t.substr(0, t.length - n.length)) + n;
  if (s = t.match(/^([#0?]+)\.([#0]+)$/)) {
    n = "" + r.toFixed(Math.min(s[2].length, 10)).replace(/([^0])0+$/, "$1"), i = n.indexOf(".");
    var p = t.indexOf(".") - i, u = t.length - n.length - p;
    return Ar(t.substr(0, p) + n + t.substr(t.length - u));
  }
  if (s = t.match(/^00,000\.([#0]*0)$/))
    return i = Ss(r, s[1].length), r < 0 ? "-" + Hr(e, t, -r) : at(go(r)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(m) {
      return "00," + (m.length < 3 ? Yr(0, 3 - m.length) : "") + m;
    }) + "." + Yr(i, s[1].length);
  switch (t) {
    case "###,##0.00":
      return Hr(e, "#,##0.00", r);
    case "###,###":
    case "##,###":
    case "#,###":
      var h = at(Mt(f, 0));
      return h !== "0" ? o + h : "";
    case "###,###.00":
      return Hr(e, "###,##0.00", r).replace(/^0\./, ".");
    case "#,###.00":
      return Hr(e, "#,##0.00", r).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + t + "|");
}
function vo(e, t, r) {
  for (var a = t.length - 1; t.charCodeAt(a - 1) === 44; ) --a;
  return st(e, t.substr(0, a), r / Math.pow(10, 3 * (t.length - a)));
}
function ko(e, t, r) {
  var a = t.replace(O0, ""), n = t.length - a.length;
  return st(e, a, r * Math.pow(10, 2 * n)) + De("%", n);
}
function W0(e, t) {
  var r, a = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + W0(e, -t);
    var n = e.indexOf(".");
    n === -1 && (n = e.indexOf("E"));
    var s = Math.floor(Math.log(t) * Math.LOG10E) % n;
    if (s < 0 && (s += n), r = (t / Math.pow(10, s)).toPrecision(a + 1 + (n + s) % n), !r.match(/[Ee]/)) {
      var i = Math.floor(Math.log(t) * Math.LOG10E);
      r.indexOf(".") === -1 ? r = r.charAt(0) + "." + r.substr(1) + "E+" + (i - r.length + s) : r += "E+" + (i - s), r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function(c, f, o, l) {
      return f + o + l.substr(0, (n + s) % n) + "." + l.substr(s) + "E";
    });
  } else r = t.toExponential(a);
  return e.match(/E\+00$/) && r.match(/e[+-]\d$/) && (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)), e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")), r.replace("e", "E");
}
function Qr(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(U0)) {
    var a = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? Qr("n", a, r) : "(" + Qr("n", a, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return vo(e, t, r);
  if (t.indexOf("%") !== -1) return ko(e, t, r);
  if (t.indexOf("E") !== -1) return W0(t, r);
  if (t.charCodeAt(0) === 36) return "$" + Qr(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var n, s, i, c, f = Math.abs(r), o = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return o + Yr(f, t.length);
  if (t.match(/^[#?]+$/))
    return n = "" + r, r === 0 && (n = ""), n.length > t.length ? n : Ar(t.substr(0, t.length - n.length)) + n;
  if (s = t.match(L0)) return po(s, f, o);
  if (t.match(/^#+0+$/)) return o + Yr(f, t.length - t.indexOf("0"));
  if (s = t.match(B0))
    return n = ("" + r).replace(/^([^\.]+)$/, "$1." + Ar(s[1])).replace(/\.$/, "." + Ar(s[1])), n = n.replace(/\.(\d*)$/, function(m, k) {
      return "." + k + De("0", Ar(s[1]).length - k.length);
    }), t.indexOf("0.") !== -1 ? n : n.replace(/^0\./, ".");
  if (t = t.replace(/^#+([0.])/, "$1"), s = t.match(/^(0*)\.(#*)$/))
    return o + ("" + f).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, s[1].length ? "0." : ".");
  if (s = t.match(/^#{1,3},##0(\.?)$/)) return o + at("" + f);
  if (s = t.match(/^#,##0\.([#0]*0)$/))
    return r < 0 ? "-" + Qr(e, t, -r) : at("" + r) + "." + De("0", s[1].length);
  if (s = t.match(/^#,#*,#0/)) return Qr(e, t.replace(/^#,#*,/, ""), r);
  if (s = t.match(/^([0#]+)(\\?-([0#]+))+$/))
    return n = Wt(Qr(e, t.replace(/[\\-]/g, ""), r)), i = 0, Wt(Wt(t.replace(/\\/g, "")).replace(/[0#]/g, function(m) {
      return i < n.length ? n.charAt(i++) : m === "0" ? "0" : "";
    }));
  if (t.match(H0))
    return n = Qr(e, "##########", r), "(" + n.substr(0, 3) + ") " + n.substr(3, 3) + "-" + n.substr(6);
  var l = "";
  if (s = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/))
    return i = Math.min(
      /*::String(*/
      s[4].length,
      7
    ), c = Ka(f, Math.pow(10, i) - 1, !1), n = "" + o, l = st(
      "n",
      /*::String(*/
      s[1],
      c[1]
    ), l.charAt(l.length - 1) == " " && (l = l.substr(0, l.length - 1) + "0"), n += l + /*::String(*/
    s[2] + "/" + /*::String(*/
    s[3], l = Xa(c[2], i), l.length < s[4].length && (l = Ar(s[4].substr(s[4].length - l.length)) + l), n += l, n;
  if (s = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/))
    return i = Math.min(Math.max(s[1].length, s[4].length), 7), c = Ka(f, Math.pow(10, i) - 1, !0), o + (c[0] || (c[1] ? "" : "0")) + " " + (c[1] ? Wn(c[1], i) + s[2] + "/" + s[3] + Xa(c[2], i) : De(" ", 2 * i + 1 + s[2].length + s[3].length));
  if (s = t.match(/^[#0?]+$/))
    return n = "" + r, t.length <= n.length ? n : Ar(t.substr(0, t.length - n.length)) + n;
  if (s = t.match(/^([#0]+)\.([#0]+)$/)) {
    n = "" + r.toFixed(Math.min(s[2].length, 10)).replace(/([^0])0+$/, "$1"), i = n.indexOf(".");
    var p = t.indexOf(".") - i, u = t.length - n.length - p;
    return Ar(t.substr(0, p) + n + t.substr(t.length - u));
  }
  if (s = t.match(/^00,000\.([#0]*0)$/))
    return r < 0 ? "-" + Qr(e, t, -r) : at("" + r).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function(m) {
      return "00," + (m.length < 3 ? Yr(0, 3 - m.length) : "") + m;
    }) + "." + Yr(0, s[1].length);
  switch (t) {
    case "###,###":
    case "##,###":
    case "#,###":
      var h = at("" + f);
      return h !== "0" ? o + h : "";
    default:
      if (t.match(/\.[0#?]*$/)) return Qr(e, t.slice(0, t.lastIndexOf(".")), r) + Ar(t.slice(t.lastIndexOf(".")));
  }
  throw new Error("unsupported format |" + t + "|");
}
function st(e, t, r) {
  return (r | 0) === r ? Qr(e, t, r) : Hr(e, t, r);
}
function _o(e) {
  for (var t = [], r = !1, a = 0, n = 0; a < e.length; ++a) switch (
    /*cc=*/
    e.charCodeAt(a)
  ) {
    case 34:
      r = !r;
      break;
    case 95:
    case 42:
    case 92:
      ++a;
      break;
    case 59:
      t[t.length] = e.substr(n, a - n), n = a + 1;
  }
  if (t[t.length] = e.substr(n), r === !0) throw new Error("Format |" + e + "| unterminated string ");
  return t;
}
var V0 = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function Jr(e) {
  for (var t = 0, r = "", a = ""; t < e.length; )
    switch (r = e.charAt(t)) {
      case "G":
        za(e, t) && (t += 6), t++;
        break;
      case '"':
        for (
          ;
          /*cc=*/
          e.charCodeAt(++t) !== 34 && t < e.length;
        )
          ;
        ++t;
        break;
      case "\\":
        t += 2;
        break;
      case "_":
        t += 2;
        break;
      case "@":
        ++t;
        break;
      case "B":
      case "b":
        if (e.charAt(t + 1) === "1" || e.charAt(t + 1) === "2") return !0;
      /* falls through */
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
      /* falls through */
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        return !0;
      case "A":
      case "a":
      case "上":
        if (e.substr(t, 3).toUpperCase() === "A/P" || e.substr(t, 5).toUpperCase() === "AM/PM" || e.substr(t, 5).toUpperCase() === "上午/下午") return !0;
        ++t;
        break;
      case "[":
        for (a = r; e.charAt(t++) !== "]" && t < e.length; ) a += e.charAt(t);
        if (a.match(V0)) return !0;
        break;
      case ".":
      /* falls through */
      case "0":
      case "#":
        for (; t < e.length && ("0#?.,E+-%".indexOf(r = e.charAt(++t)) > -1 || r == "\\" && e.charAt(t + 1) == "-" && "0#".indexOf(e.charAt(t + 2)) > -1); )
          ;
        break;
      case "?":
        for (; e.charAt(++t) === r; )
          ;
        break;
      case "*":
        ++t, (e.charAt(t) == " " || e.charAt(t) == "*") && ++t;
        break;
      case "(":
      case ")":
        ++t;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (; t < e.length && "0123456789".indexOf(e.charAt(++t)) > -1; )
          ;
        break;
      case " ":
        ++t;
        break;
      default:
        ++t;
        break;
    }
  return !1;
}
function Eo(e, t, r, a) {
  for (var n = [], s = "", i = 0, c = "", f = "t", o, l, p, u = "H"; i < e.length; )
    switch (c = e.charAt(i)) {
      case "G":
        if (!za(e, i)) throw new Error("unrecognized character " + c + " in " + e);
        n[n.length] = { t: "G", v: "General" }, i += 7;
        break;
      case '"':
        for (s = ""; (p = e.charCodeAt(++i)) !== 34 && i < e.length; ) s += String.fromCharCode(p);
        n[n.length] = { t: "t", v: s }, ++i;
        break;
      case "\\":
        var h = e.charAt(++i), m = h === "(" || h === ")" ? h : "t";
        n[n.length] = { t: m, v: h }, ++i;
        break;
      case "_":
        n[n.length] = { t: "t", v: " " }, i += 2;
        break;
      case "@":
        n[n.length] = { t: "T", v: t }, ++i;
        break;
      case "B":
      case "b":
        if (e.charAt(i + 1) === "1" || e.charAt(i + 1) === "2") {
          if (o == null && (o = tt(t, r, e.charAt(i + 1) === "2"), o == null))
            return "";
          n[n.length] = { t: "X", v: e.substr(i, 2) }, f = c, i += 2;
          break;
        }
      /* falls through */
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
        c = c.toLowerCase();
      /* falls through */
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        if (t < 0 || o == null && (o = tt(t, r), o == null))
          return "";
        for (s = c; ++i < e.length && e.charAt(i).toLowerCase() === c; ) s += c;
        c === "m" && f.toLowerCase() === "h" && (c = "M"), c === "h" && (c = u), n[n.length] = { t: c, v: s }, f = c;
        break;
      case "A":
      case "a":
      case "上":
        var k = { t: c, v: c };
        if (o == null && (o = tt(t, r)), e.substr(i, 3).toUpperCase() === "A/P" ? (o != null && (k.v = o.H >= 12 ? e.charAt(i + 2) : c), k.t = "T", u = "h", i += 3) : e.substr(i, 5).toUpperCase() === "AM/PM" ? (o != null && (k.v = o.H >= 12 ? "PM" : "AM"), k.t = "T", i += 5, u = "h") : e.substr(i, 5).toUpperCase() === "上午/下午" ? (o != null && (k.v = o.H >= 12 ? "下午" : "上午"), k.t = "T", i += 5, u = "h") : (k.t = "t", ++i), o == null && k.t === "T") return "";
        n[n.length] = k, f = c;
        break;
      case "[":
        for (s = c; e.charAt(i++) !== "]" && i < e.length; ) s += e.charAt(i);
        if (s.slice(-1) !== "]") throw 'unterminated "[" block: |' + s + "|";
        if (s.match(V0)) {
          if (o == null && (o = tt(t, r), o == null))
            return "";
          n[n.length] = { t: "Z", v: s.toLowerCase() }, f = s.charAt(1);
        } else s.indexOf("$") > -1 && (s = (s.match(/\$([^-\[\]]*)/) || [])[1] || "$", Jr(e) || (n[n.length] = { t: "t", v: s }));
        break;
      /* Numbers */
      case ".":
        if (o != null) {
          for (s = c; ++i < e.length && (c = e.charAt(i)) === "0"; ) s += c;
          n[n.length] = { t: "s", v: s };
          break;
        }
      /* falls through */
      case "0":
      case "#":
        for (s = c; ++i < e.length && "0#?.,E+-%".indexOf(c = e.charAt(i)) > -1; ) s += c;
        n[n.length] = { t: "n", v: s };
        break;
      case "?":
        for (s = c; e.charAt(++i) === c; ) s += c;
        n[n.length] = { t: c, v: s }, f = c;
        break;
      case "*":
        ++i, (e.charAt(i) == " " || e.charAt(i) == "*") && ++i;
        break;
      // **
      case "(":
      case ")":
        n[n.length] = { t: a === 1 ? "t" : c, v: c }, ++i;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (s = c; i < e.length && "0123456789".indexOf(e.charAt(++i)) > -1; ) s += e.charAt(i);
        n[n.length] = { t: "D", v: s };
        break;
      case " ":
        n[n.length] = { t: c, v: c }, ++i;
        break;
      case "$":
        n[n.length] = { t: "t", v: "$" }, ++i;
        break;
      default:
        if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(c) === -1) throw new Error("unrecognized character " + c + " in " + e);
        n[n.length] = { t: "t", v: c }, ++i;
        break;
    }
  var x = 0, d = 0, _;
  for (i = n.length - 1, f = "t"; i >= 0; --i)
    switch (n[i].t) {
      case "h":
      case "H":
        n[i].t = u, f = "h", x < 1 && (x = 1);
        break;
      case "s":
        (_ = n[i].v.match(/\.0+$/)) && (d = Math.max(d, _[0].length - 1), x = 4), x < 3 && (x = 3);
      /* falls through */
      case "d":
      case "y":
      case "e":
        f = n[i].t;
        break;
      case "M":
        f = n[i].t, x < 2 && (x = 2);
        break;
      case "m":
        f === "s" && (n[i].t = "M", x < 2 && (x = 2));
        break;
      case "X":
        break;
      case "Z":
        x < 1 && n[i].v.match(/[Hh]/) && (x = 1), x < 2 && n[i].v.match(/[Mm]/) && (x = 2), x < 3 && n[i].v.match(/[Ss]/) && (x = 3);
    }
  var g;
  switch (x) {
    case 0:
      break;
    case 1:
    case 2:
    case 3:
      o.u >= 0.5 && (o.u = 0, ++o.S), o.S >= 60 && (o.S = 0, ++o.M), o.M >= 60 && (o.M = 0, ++o.H), o.H >= 24 && (o.H = 0, ++o.D, g = tt(o.D), g.u = o.u, g.S = o.S, g.M = o.M, g.H = o.H, o = g);
      break;
    case 4:
      switch (d) {
        case 1:
          o.u = Math.round(o.u * 10) / 10;
          break;
        case 2:
          o.u = Math.round(o.u * 100) / 100;
          break;
        case 3:
          o.u = Math.round(o.u * 1e3) / 1e3;
          break;
      }
      o.u >= 1 && (o.u = 0, ++o.S), o.S >= 60 && (o.S = 0, ++o.M), o.M >= 60 && (o.M = 0, ++o.H), o.H >= 24 && (o.H = 0, ++o.D, g = tt(o.D), g.u = o.u, g.S = o.S, g.M = o.M, g.H = o.H, o = g);
      break;
  }
  var C = "", O;
  for (i = 0; i < n.length; ++i)
    switch (n[i].t) {
      case "t":
      case "T":
      case " ":
      case "D":
        break;
      case "X":
        n[i].v = "", n[i].t = ";";
        break;
      case "d":
      case "m":
      case "y":
      case "h":
      case "H":
      case "M":
      case "s":
      case "e":
      case "b":
      case "Z":
        n[i].v = lo(n[i].t.charCodeAt(0), n[i].v, o, d), n[i].t = "t";
        break;
      case "n":
      case "?":
        for (O = i + 1; n[O] != null && ((c = n[O].t) === "?" || c === "D" || (c === " " || c === "t") && n[O + 1] != null && (n[O + 1].t === "?" || n[O + 1].t === "t" && n[O + 1].v === "/") || n[i].t === "(" && (c === " " || c === "n" || c === ")") || c === "t" && (n[O].v === "/" || n[O].v === " " && n[O + 1] != null && n[O + 1].t == "?")); )
          n[i].v += n[O].v, n[O] = { v: "", t: ";" }, ++O;
        C += n[i].v, i = O - 1;
        break;
      case "G":
        n[i].t = "t", n[i].v = yt(t, r);
        break;
    }
  var U = "", P, I;
  if (C.length > 0) {
    C.charCodeAt(0) == 40 ? (P = t < 0 && C.charCodeAt(0) === 45 ? -t : t, I = st("n", C, P)) : (P = t < 0 && a > 1 ? -t : t, I = st("n", C, P), P < 0 && n[0] && n[0].t == "t" && (I = I.substr(1), n[0].v = "-" + n[0].v)), O = I.length - 1;
    var N = n.length;
    for (i = 0; i < n.length; ++i) if (n[i] != null && n[i].t != "t" && n[i].v.indexOf(".") > -1) {
      N = i;
      break;
    }
    var B = n.length;
    if (N === n.length && I.indexOf("E") === -1) {
      for (i = n.length - 1; i >= 0; --i)
        n[i] == null || "n?".indexOf(n[i].t) === -1 || (O >= n[i].v.length - 1 ? (O -= n[i].v.length, n[i].v = I.substr(O + 1, n[i].v.length)) : O < 0 ? n[i].v = "" : (n[i].v = I.substr(0, O + 1), O = -1), n[i].t = "t", B = i);
      O >= 0 && B < n.length && (n[B].v = I.substr(0, O + 1) + n[B].v);
    } else if (N !== n.length && I.indexOf("E") === -1) {
      for (O = I.indexOf(".") - 1, i = N; i >= 0; --i)
        if (!(n[i] == null || "n?".indexOf(n[i].t) === -1)) {
          for (l = n[i].v.indexOf(".") > -1 && i === N ? n[i].v.indexOf(".") - 1 : n[i].v.length - 1, U = n[i].v.substr(l + 1); l >= 0; --l)
            O >= 0 && (n[i].v.charAt(l) === "0" || n[i].v.charAt(l) === "#") && (U = I.charAt(O--) + U);
          n[i].v = U, n[i].t = "t", B = i;
        }
      for (O >= 0 && B < n.length && (n[B].v = I.substr(0, O + 1) + n[B].v), O = I.indexOf(".") + 1, i = N; i < n.length; ++i)
        if (!(n[i] == null || "n?(".indexOf(n[i].t) === -1 && i !== N)) {
          for (l = n[i].v.indexOf(".") > -1 && i === N ? n[i].v.indexOf(".") + 1 : 0, U = n[i].v.substr(0, l); l < n[i].v.length; ++l)
            O < I.length && (U += I.charAt(O++));
          n[i].v = U, n[i].t = "t", B = i;
        }
    }
  }
  for (i = 0; i < n.length; ++i) n[i] != null && "n?".indexOf(n[i].t) > -1 && (P = a > 1 && t < 0 && i > 0 && n[i - 1].v === "-" ? -t : t, n[i].v = st(n[i].t, n[i].v, P), n[i].t = "t");
  var M = "";
  for (i = 0; i !== n.length; ++i) n[i] != null && (M += n[i].v);
  return M;
}
var ys = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function Cs(e, t) {
  if (t == null) return !1;
  var r = parseFloat(t[2]);
  switch (t[1]) {
    case "=":
      if (e == r) return !0;
      break;
    case ">":
      if (e > r) return !0;
      break;
    case "<":
      if (e < r) return !0;
      break;
    case "<>":
      if (e != r) return !0;
      break;
    case ">=":
      if (e >= r) return !0;
      break;
    case "<=":
      if (e <= r) return !0;
      break;
  }
  return !1;
}
function wo(e, t) {
  var r = _o(e), a = r.length, n = r[a - 1].indexOf("@");
  if (a < 4 && n > -1 && --a, r.length > 4) throw new Error("cannot find right format for |" + r.join("|") + "|");
  if (typeof t != "number") return [4, r.length === 4 || n > -1 ? r[r.length - 1] : "@"];
  switch (typeof t == "number" && !isFinite(t) && (t = 0), r.length) {
    case 1:
      r = n > -1 ? ["General", "General", "General", r[0]] : [r[0], r[0], r[0], "@"];
      break;
    case 2:
      r = n > -1 ? [r[0], r[0], r[0], r[1]] : [r[0], r[1], r[0], "@"];
      break;
    case 3:
      r = n > -1 ? [r[0], r[1], r[0], r[2]] : [r[0], r[1], r[2], "@"];
      break;
  }
  var s = t > 0 ? r[0] : t < 0 ? r[1] : r[2];
  if (r[0].indexOf("[") === -1 && r[1].indexOf("[") === -1) return [a, s];
  if (r[0].match(/\[[=<>]/) != null || r[1].match(/\[[=<>]/) != null) {
    var i = r[0].match(ys), c = r[1].match(ys);
    return Cs(t, i) ? [a, r[0]] : Cs(t, c) ? [a, r[1]] : [a, r[i != null && c != null ? 2 : 1]];
  }
  return [a, s];
}
function Lr(e, t, r) {
  r == null && (r = {});
  var a = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && r.dateNF ? a = r.dateNF : a = e;
      break;
    case "number":
      e == 14 && r.dateNF ? a = r.dateNF : a = (r.table != null ? r.table : _e)[e], a == null && (a = r.table && r.table[As[e]] || _e[As[e]]), a == null && (a = no[e] || "General");
      break;
  }
  if (za(a, 0)) return yt(t, r);
  t instanceof Date && (t = fr(t, r.date1904));
  var n = wo(a, t);
  if (za(n[1])) return yt(t, r);
  if (t === !0) t = "TRUE";
  else if (t === !1) t = "FALSE";
  else {
    if (t === "" || t == null) return "";
    if (isNaN(t) && n[1].indexOf("0") > -1) return "#NUM!";
    if (!isFinite(t) && n[1].indexOf("0") > -1) return "#DIV/0!";
  }
  return Eo(n[1], t, r, n[0]);
}
function To(e, t) {
  if (typeof t != "number") {
    t = +t || -1;
    for (var r = 0; r < 392; ++r) {
      if (_e[r] == null) {
        t < 0 && (t = r);
        continue;
      }
      if (_e[r] == e) {
        t = r;
        break;
      }
    }
    t < 0 && (t = 391);
  }
  return _e[t] = e, t;
}
function $0() {
  _e = ao();
}
var Ao = {
  5: '"$"#,##0_);\\("$"#,##0\\)',
  6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  23: "General",
  24: "General",
  25: "General",
  26: "General",
  27: "m/d/yy",
  28: "m/d/yy",
  29: "m/d/yy",
  30: "m/d/yy",
  31: "m/d/yy",
  32: "h:mm:ss",
  33: "h:mm:ss",
  34: "h:mm:ss",
  35: "h:mm:ss",
  36: "m/d/yy",
  41: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
  42: '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)',
  43: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',
  44: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
  50: "m/d/yy",
  51: "m/d/yy",
  52: "m/d/yy",
  53: "m/d/yy",
  54: "m/d/yy",
  55: "m/d/yy",
  56: "m/d/yy",
  57: "m/d/yy",
  58: "m/d/yy",
  59: "0",
  60: "0.00",
  61: "#,##0",
  62: "#,##0.00",
  63: '"$"#,##0_);\\("$"#,##0\\)',
  64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
  65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
  66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
  67: "0%",
  68: "0.00%",
  69: "# ?/?",
  70: "# ??/??",
  71: "m/d/yy",
  72: "m/d/yy",
  73: "d-mmm-yy",
  74: "d-mmm",
  75: "mmm-yy",
  76: "h:mm",
  77: "h:mm:ss",
  78: "m/d/yy h:mm",
  79: "mm:ss",
  80: "[h]:mm:ss",
  81: "mmss.0"
}, ja = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function Fo(e) {
  var t = typeof e == "number" ? _e[e] : e;
  return t = t.replace(ja, "(\\d+)"), ja.lastIndex = 0, new RegExp("^" + t + "$");
}
function So(e, t, r) {
  var a = -1, n = -1, s = -1, i = -1, c = -1, f = -1;
  (t.match(ja) || []).forEach(function(p, u) {
    var h = parseInt(r[u + 1], 10);
    switch (p.toLowerCase().charAt(0)) {
      case "y":
        a = h;
        break;
      case "d":
        s = h;
        break;
      case "h":
        i = h;
        break;
      case "s":
        f = h;
        break;
      case "m":
        i >= 0 ? c = h : n = h;
        break;
    }
  }), ja.lastIndex = 0, f >= 0 && c == -1 && n >= 0 && (c = n, n = -1);
  var o = ("" + (a >= 0 ? a : (/* @__PURE__ */ new Date()).getFullYear())).slice(-4) + "-" + ("00" + (n >= 1 ? n : 1)).slice(-2) + "-" + ("00" + (s >= 1 ? s : 1)).slice(-2);
  o.length == 7 && (o = "0" + o), o.length == 8 && (o = "20" + o);
  var l = ("00" + (i >= 0 ? i : 0)).slice(-2) + ":" + ("00" + (c >= 0 ? c : 0)).slice(-2) + ":" + ("00" + (f >= 0 ? f : 0)).slice(-2);
  return i == -1 && c == -1 && f == -1 ? o : a == -1 && n == -1 && s == -1 ? l : o + "T" + l;
}
var yo = {
  "d.m": "d\\.m"
  // Issue #2571 Google Sheets writes invalid format 'd.m', correct format is 'd"."m' or 'd\\.m'
};
function Tt(e, t) {
  return To(yo[e] || e, t);
}
var bs = /* @__PURE__ */ (function() {
  var e = {};
  e.version = "1.2.0";
  function t() {
    for (var P = 0, I = new Array(256), N = 0; N != 256; ++N)
      P = N, P = P & 1 ? -306674912 ^ P >>> 1 : P >>> 1, P = P & 1 ? -306674912 ^ P >>> 1 : P >>> 1, P = P & 1 ? -306674912 ^ P >>> 1 : P >>> 1, P = P & 1 ? -306674912 ^ P >>> 1 : P >>> 1, P = P & 1 ? -306674912 ^ P >>> 1 : P >>> 1, P = P & 1 ? -306674912 ^ P >>> 1 : P >>> 1, P = P & 1 ? -306674912 ^ P >>> 1 : P >>> 1, P = P & 1 ? -306674912 ^ P >>> 1 : P >>> 1, I[N] = P;
    return typeof Int32Array < "u" ? new Int32Array(I) : I;
  }
  var r = t();
  function a(P) {
    var I = 0, N = 0, B = 0, M = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
    for (B = 0; B != 256; ++B) M[B] = P[B];
    for (B = 0; B != 256; ++B)
      for (N = P[B], I = 256 + B; I < 4096; I += 256) N = M[I] = N >>> 8 ^ P[N & 255];
    var X = [];
    for (B = 1; B != 16; ++B) X[B - 1] = typeof Int32Array < "u" && typeof M.subarray == "function" ? M.subarray(B * 256, B * 256 + 256) : M.slice(B * 256, B * 256 + 256);
    return X;
  }
  var n = a(r), s = n[0], i = n[1], c = n[2], f = n[3], o = n[4], l = n[5], p = n[6], u = n[7], h = n[8], m = n[9], k = n[10], x = n[11], d = n[12], _ = n[13], g = n[14];
  function C(P, I) {
    for (var N = I ^ -1, B = 0, M = P.length; B < M; ) N = N >>> 8 ^ r[(N ^ P.charCodeAt(B++)) & 255];
    return ~N;
  }
  function O(P, I) {
    for (var N = I ^ -1, B = P.length - 15, M = 0; M < B; ) N = g[P[M++] ^ N & 255] ^ _[P[M++] ^ N >> 8 & 255] ^ d[P[M++] ^ N >> 16 & 255] ^ x[P[M++] ^ N >>> 24] ^ k[P[M++]] ^ m[P[M++]] ^ h[P[M++]] ^ u[P[M++]] ^ p[P[M++]] ^ l[P[M++]] ^ o[P[M++]] ^ f[P[M++]] ^ c[P[M++]] ^ i[P[M++]] ^ s[P[M++]] ^ r[P[M++]];
    for (B += 15; M < B; ) N = N >>> 8 ^ r[(N ^ P[M++]) & 255];
    return ~N;
  }
  function U(P, I) {
    for (var N = I ^ -1, B = 0, M = P.length, X = 0, j = 0; B < M; )
      X = P.charCodeAt(B++), X < 128 ? N = N >>> 8 ^ r[(N ^ X) & 255] : X < 2048 ? (N = N >>> 8 ^ r[(N ^ (192 | X >> 6 & 31)) & 255], N = N >>> 8 ^ r[(N ^ (128 | X & 63)) & 255]) : X >= 55296 && X < 57344 ? (X = (X & 1023) + 64, j = P.charCodeAt(B++) & 1023, N = N >>> 8 ^ r[(N ^ (240 | X >> 8 & 7)) & 255], N = N >>> 8 ^ r[(N ^ (128 | X >> 2 & 63)) & 255], N = N >>> 8 ^ r[(N ^ (128 | j >> 6 & 15 | (X & 3) << 4)) & 255], N = N >>> 8 ^ r[(N ^ (128 | j & 63)) & 255]) : (N = N >>> 8 ^ r[(N ^ (224 | X >> 12 & 15)) & 255], N = N >>> 8 ^ r[(N ^ (128 | X >> 6 & 63)) & 255], N = N >>> 8 ^ r[(N ^ (128 | X & 63)) & 255]);
    return ~N;
  }
  return e.table = r, e.bstr = C, e.buf = O, e.str = U, e;
})(), Re = /* @__PURE__ */ (function() {
  var t = (
    /*::(*/
    {}
  );
  t.version = "1.2.2";
  function r(v, F) {
    for (var E = v.split("/"), w = F.split("/"), A = 0, y = 0, W = Math.min(E.length, w.length); A < W; ++A) {
      if (y = E[A].length - w[A].length) return y;
      if (E[A] != w[A]) return E[A] < w[A] ? -1 : 1;
    }
    return E.length - w.length;
  }
  function a(v) {
    if (v.charAt(v.length - 1) == "/") return v.slice(0, -1).indexOf("/") === -1 ? v : a(v.slice(0, -1));
    var F = v.lastIndexOf("/");
    return F === -1 ? v : v.slice(0, F + 1);
  }
  function n(v) {
    if (v.charAt(v.length - 1) == "/") return n(v.slice(0, -1));
    var F = v.lastIndexOf("/");
    return F === -1 ? v : v.slice(F + 1);
  }
  function s(v, F) {
    typeof F == "string" && (F = new Date(F));
    var E = F.getHours();
    E = E << 6 | F.getMinutes(), E = E << 5 | F.getSeconds() >>> 1, v.write_shift(2, E);
    var w = F.getFullYear() - 1980;
    w = w << 4 | F.getMonth() + 1, w = w << 5 | F.getDate(), v.write_shift(2, w);
  }
  function i(v) {
    var F = v.read_shift(2) & 65535, E = v.read_shift(2) & 65535, w = /* @__PURE__ */ new Date(), A = E & 31;
    E >>>= 5;
    var y = E & 15;
    E >>>= 4, w.setMilliseconds(0), w.setFullYear(E + 1980), w.setMonth(y - 1), w.setDate(A);
    var W = F & 31;
    F >>>= 5;
    var Y = F & 63;
    return F >>>= 6, w.setHours(F), w.setMinutes(Y), w.setSeconds(W << 1), w;
  }
  function c(v) {
    cr(v, 0);
    for (var F = (
      /*::(*/
      {}
    ), E = 0; v.l <= v.length - 4; ) {
      var w = v.read_shift(2), A = v.read_shift(2), y = v.l + A, W = {};
      switch (w) {
        /* UNIX-style Timestamps */
        case 21589:
          E = v.read_shift(1), E & 1 && (W.mtime = v.read_shift(4)), A > 5 && (E & 2 && (W.atime = v.read_shift(4)), E & 4 && (W.ctime = v.read_shift(4))), W.mtime && (W.mt = new Date(W.mtime * 1e3));
          break;
        /* ZIP64 Extended Information Field */
        case 1:
          {
            var Y = v.read_shift(4), H = v.read_shift(4);
            W.usz = H * Math.pow(2, 32) + Y, Y = v.read_shift(4), H = v.read_shift(4), W.csz = H * Math.pow(2, 32) + Y;
          }
          break;
      }
      v.l = y, F[w] = W;
    }
    return F;
  }
  var f;
  function o() {
    return f || (f = Co);
  }
  function l(v, F) {
    if (v[0] == 80 && v[1] == 75) return os(v, F);
    if ((v[0] | 32) == 109 && (v[1] | 32) == 105) return _c(v, F);
    if (v.length < 512) throw new Error("CFB file size " + v.length + " < 512");
    var E = 3, w = 512, A = 0, y = 0, W = 0, Y = 0, H = 0, V = [], G = (
      /*::(*/
      v.slice(0, 512)
    );
    cr(G, 0);
    var Q = p(G);
    switch (E = Q[0], E) {
      case 3:
        w = 512;
        break;
      case 4:
        w = 4096;
        break;
      case 0:
        if (Q[1] == 0) return os(v, F);
      /* falls through */
      default:
        throw new Error("Major Version: Expected 3 or 4 saw " + E);
    }
    w !== 512 && (G = /*::(*/
    v.slice(0, w), cr(
      G,
      28
      /* blob.l */
    ));
    var te = v.slice(0, w);
    u(G, E);
    var he = G.read_shift(4, "i");
    if (E === 3 && he !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + he);
    G.l += 4, W = G.read_shift(4, "i"), G.l += 4, G.chk("00100000", "Mini Stream Cutoff Size: "), Y = G.read_shift(4, "i"), A = G.read_shift(4, "i"), H = G.read_shift(4, "i"), y = G.read_shift(4, "i");
    for (var ee = -1, ne = 0; ne < 109 && (ee = G.read_shift(4, "i"), !(ee < 0)); ++ne)
      V[ne] = ee;
    var Fe = h(v, w);
    x(H, y, Fe, w, V);
    var ze = _(Fe, W, V, w);
    W < ze.length && (ze[W].name = "!Directory"), A > 0 && Y !== j && (ze[Y].name = "!MiniFAT"), ze[V[0]].name = "!FAT", ze.fat_addrs = V, ze.ssz = w;
    var Ke = {}, mr = [], Kt = [], jt = [];
    g(W, ze, Fe, mr, A, Ke, Kt, Y), m(Kt, jt, mr), mr.shift();
    var Yt = {
      FileIndex: Kt,
      FullPaths: jt
    };
    return F && F.raw && (Yt.raw = { header: te, sectors: Fe }), Yt;
  }
  function p(v) {
    if (v[v.l] == 80 && v[v.l + 1] == 75) return [0, 0];
    v.chk(oe, "Header Signature: "), v.l += 16;
    var F = v.read_shift(2, "u");
    return [v.read_shift(2, "u"), F];
  }
  function u(v, F) {
    var E = 9;
    switch (v.l += 2, E = v.read_shift(2)) {
      case 9:
        if (F != 3) throw new Error("Sector Shift: Expected 9 saw " + E);
        break;
      case 12:
        if (F != 4) throw new Error("Sector Shift: Expected 12 saw " + E);
        break;
      default:
        throw new Error("Sector Shift: Expected 9 or 12 saw " + E);
    }
    v.chk("0600", "Mini Sector Shift: "), v.chk("000000000000", "Reserved: ");
  }
  function h(v, F) {
    for (var E = Math.ceil(v.length / F) - 1, w = [], A = 1; A < E; ++A) w[A - 1] = v.slice(A * F, (A + 1) * F);
    return w[E - 1] = v.slice(E * F), w;
  }
  function m(v, F, E) {
    for (var w = 0, A = 0, y = 0, W = 0, Y = 0, H = E.length, V = [], G = []; w < H; ++w)
      V[w] = G[w] = w, F[w] = E[w];
    for (; Y < G.length; ++Y)
      w = G[Y], A = v[w].L, y = v[w].R, W = v[w].C, V[w] === w && (A !== -1 && V[A] !== A && (V[w] = V[A]), y !== -1 && V[y] !== y && (V[w] = V[y])), W !== -1 && (V[W] = w), A !== -1 && w != V[w] && (V[A] = V[w], G.lastIndexOf(A) < Y && G.push(A)), y !== -1 && w != V[w] && (V[y] = V[w], G.lastIndexOf(y) < Y && G.push(y));
    for (w = 1; w < H; ++w) V[w] === w && (y !== -1 && V[y] !== y ? V[w] = V[y] : A !== -1 && V[A] !== A && (V[w] = V[A]));
    for (w = 1; w < H; ++w)
      if (v[w].type !== 0) {
        if (Y = w, Y != V[Y]) do
          Y = V[Y], F[w] = F[Y] + "/" + F[w];
        while (Y !== 0 && V[Y] !== -1 && Y != V[Y]);
        V[w] = -1;
      }
    for (F[0] += "/", w = 1; w < H; ++w)
      v[w].type !== 2 && (F[w] += "/");
  }
  function k(v, F, E) {
    for (var w = v.start, A = v.size, y = [], W = w; E && A > 0 && W >= 0; )
      y.push(F.slice(W * X, W * X + X)), A -= X, W = wt(E, W * 4);
    return y.length === 0 ? sr(0) : ht(y).slice(0, v.size);
  }
  function x(v, F, E, w, A) {
    var y = j;
    if (v === j) {
      if (F !== 0) throw new Error("DIFAT chain shorter than expected");
    } else if (v !== -1) {
      var W = E[v], Y = (w >>> 2) - 1;
      if (!W) return;
      for (var H = 0; H < Y && (y = wt(W, H * 4)) !== j; ++H)
        A.push(y);
      F >= 1 && x(wt(W, w - 4), F - 1, E, w, A);
    }
  }
  function d(v, F, E, w, A) {
    var y = [], W = [];
    A || (A = []);
    var Y = w - 1, H = 0, V = 0;
    for (H = F; H >= 0; ) {
      A[H] = !0, y[y.length] = H, W.push(v[H]);
      var G = E[Math.floor(H * 4 / w)];
      if (V = H * 4 & Y, w < 4 + V) throw new Error("FAT boundary crossed: " + H + " 4 " + w);
      if (!v[G]) break;
      H = wt(v[G], V);
    }
    return { nodes: y, data: Ls([W]) };
  }
  function _(v, F, E, w) {
    var A = v.length, y = [], W = [], Y = [], H = [], V = w - 1, G = 0, Q = 0, te = 0, he = 0;
    for (G = 0; G < A; ++G)
      if (Y = [], te = G + F, te >= A && (te -= A), !W[te]) {
        H = [];
        var ee = [];
        for (Q = te; Q >= 0; ) {
          ee[Q] = !0, W[Q] = !0, Y[Y.length] = Q, H.push(v[Q]);
          var ne = E[Math.floor(Q * 4 / w)];
          if (he = Q * 4 & V, w < 4 + he) throw new Error("FAT boundary crossed: " + Q + " 4 " + w);
          if (!v[ne] || (Q = wt(v[ne], he), ee[Q])) break;
        }
        y[te] = { nodes: Y, data: Ls([H]) };
      }
    return y;
  }
  function g(v, F, E, w, A, y, W, Y) {
    for (var H = 0, V = w.length ? 2 : 0, G = F[v].data, Q = 0, te = 0, he; Q < G.length; Q += 128) {
      var ee = (
        /*::(*/
        G.slice(Q, Q + 128)
      );
      cr(ee, 64), te = ee.read_shift(2), he = Kn(ee, 0, te - V), w.push(he);
      var ne = {
        name: he,
        type: ee.read_shift(1),
        color: ee.read_shift(1),
        L: ee.read_shift(4, "i"),
        R: ee.read_shift(4, "i"),
        C: ee.read_shift(4, "i"),
        clsid: ee.read_shift(16),
        state: ee.read_shift(4, "i"),
        start: 0,
        size: 0
      }, Fe = ee.read_shift(2) + ee.read_shift(2) + ee.read_shift(2) + ee.read_shift(2);
      Fe !== 0 && (ne.ct = C(ee, ee.l - 8));
      var ze = ee.read_shift(2) + ee.read_shift(2) + ee.read_shift(2) + ee.read_shift(2);
      ze !== 0 && (ne.mt = C(ee, ee.l - 8)), ne.start = ee.read_shift(4, "i"), ne.size = ee.read_shift(4, "i"), ne.size < 0 && ne.start < 0 && (ne.size = ne.type = 0, ne.start = j, ne.name = ""), ne.type === 5 ? (H = ne.start, A > 0 && H !== j && (F[H].name = "!StreamData")) : ne.size >= 4096 ? (ne.storage = "fat", F[ne.start] === void 0 && (F[ne.start] = d(E, ne.start, F.fat_addrs, F.ssz)), F[ne.start].name = ne.name, ne.content = F[ne.start].data.slice(0, ne.size)) : (ne.storage = "minifat", ne.size < 0 ? ne.size = 0 : H !== j && ne.start !== j && F[H] && (ne.content = k(ne, F[H].data, (F[Y] || {}).data))), ne.content && cr(ne.content, 0), y[he] = ne, W.push(ne);
    }
  }
  function C(v, F) {
    return new Date((Ir(v, F + 4) / 1e7 * Math.pow(2, 32) + Ir(v, F) / 1e7 - 11644473600) * 1e3);
  }
  function O(v, F) {
    return o(), l(f.readFileSync(v), F);
  }
  function U(v, F) {
    var E = F && F.type;
    switch (E || Ce && Buffer.isBuffer(v) && (E = "buffer"), E || "base64") {
      case "file":
        return O(v, F);
      case "base64":
        return l(Rr(Mr(v)), F);
      case "binary":
        return l(Rr(v), F);
    }
    return l(
      /*::typeof blob == 'string' ? new Buffer(blob, 'utf-8') : */
      v,
      F
    );
  }
  function P(v, F) {
    var E = F || {}, w = E.root || "Root Entry";
    if (v.FullPaths || (v.FullPaths = []), v.FileIndex || (v.FileIndex = []), v.FullPaths.length !== v.FileIndex.length) throw new Error("inconsistent CFB structure");
    v.FullPaths.length === 0 && (v.FullPaths[0] = w + "/", v.FileIndex[0] = { name: w, type: 5 }), E.CLSID && (v.FileIndex[0].clsid = E.CLSID), I(v);
  }
  function I(v) {
    var F = "\u0001Sh33tJ5";
    if (!Re.find(v, "/" + F)) {
      var E = sr(4);
      E[0] = 55, E[1] = E[3] = 50, E[2] = 54, v.FileIndex.push({ name: F, type: 2, content: E, size: 4, L: 69, R: 69, C: 69 }), v.FullPaths.push(v.FullPaths[0] + F), N(v);
    }
  }
  function N(v, F) {
    P(v);
    for (var E = !1, w = !1, A = v.FullPaths.length - 1; A >= 0; --A) {
      var y = v.FileIndex[A];
      switch (y.type) {
        case 0:
          w ? E = !0 : (v.FileIndex.pop(), v.FullPaths.pop());
          break;
        case 1:
        case 2:
        case 5:
          w = !0, isNaN(y.R * y.L * y.C) && (E = !0), y.R > -1 && y.L > -1 && y.R == y.L && (E = !0);
          break;
        default:
          E = !0;
          break;
      }
    }
    if (!(!E && !F)) {
      var W = new Date(1987, 1, 19), Y = 0, H = Object.create ? /* @__PURE__ */ Object.create(null) : {}, V = [];
      for (A = 0; A < v.FullPaths.length; ++A)
        H[v.FullPaths[A]] = !0, v.FileIndex[A].type !== 0 && V.push([v.FullPaths[A], v.FileIndex[A]]);
      for (A = 0; A < V.length; ++A) {
        var G = a(V[A][0]);
        for (w = H[G]; !w; ) {
          for (; a(G) && !H[a(G)]; ) G = a(G);
          V.push([G, {
            name: n(G).replace("/", ""),
            type: 1,
            clsid: xe,
            ct: W,
            mt: W,
            content: null
          }]), H[G] = !0, G = a(V[A][0]), w = H[G];
        }
      }
      for (V.sort(function(he, ee) {
        return r(he[0], ee[0]);
      }), v.FullPaths = [], v.FileIndex = [], A = 0; A < V.length; ++A)
        v.FullPaths[A] = V[A][0], v.FileIndex[A] = V[A][1];
      for (A = 0; A < V.length; ++A) {
        var Q = v.FileIndex[A], te = v.FullPaths[A];
        if (Q.name = n(te).replace("/", ""), Q.L = Q.R = Q.C = -(Q.color = 1), Q.size = Q.content ? Q.content.length : 0, Q.start = 0, Q.clsid = Q.clsid || xe, A === 0)
          Q.C = V.length > 1 ? 1 : -1, Q.size = 0, Q.type = 5;
        else if (te.slice(-1) == "/") {
          for (Y = A + 1; Y < V.length && a(v.FullPaths[Y]) != te; ++Y) ;
          for (Q.C = Y >= V.length ? -1 : Y, Y = A + 1; Y < V.length && a(v.FullPaths[Y]) != a(te); ++Y) ;
          Q.R = Y >= V.length ? -1 : Y, Q.type = 1;
        } else
          a(v.FullPaths[A + 1] || "") == a(te) && (Q.R = A + 1), Q.type = 2;
      }
    }
  }
  function B(v, F) {
    var E = F || {};
    if (E.fileType == "mad") return Ec(v, E);
    if (N(v), E.fileType === "zip")
      return xc(v, E);
    var w = (function(he) {
      for (var ee = 0, ne = 0, Fe = 0; Fe < he.FileIndex.length; ++Fe) {
        var ze = he.FileIndex[Fe];
        if (ze.content) {
          var Ke = ze.content.length;
          Ke > 0 && (Ke < 4096 ? ee += Ke + 63 >> 6 : ne += Ke + 511 >> 9);
        }
      }
      for (var mr = he.FullPaths.length + 3 >> 2, Kt = ee + 7 >> 3, jt = ee + 127 >> 7, Yt = Kt + ne + mr + jt, _t = Yt + 127 >> 7, dn = _t <= 109 ? 0 : Math.ceil((_t - 109) / 127); Yt + _t + dn + 127 >> 7 > _t; ) dn = ++_t <= 109 ? 0 : Math.ceil((_t - 109) / 127);
      var rt = [1, dn, _t, jt, mr, ne, ee, 0];
      return he.FileIndex[0].size = ee << 6, rt[7] = (he.FileIndex[0].start = rt[0] + rt[1] + rt[2] + rt[3] + rt[4] + rt[5]) + (rt[6] + 7 >> 3), rt;
    })(v), A = sr(w[7] << 9), y = 0, W = 0;
    {
      for (y = 0; y < 8; ++y) A.write_shift(1, Z[y]);
      for (y = 0; y < 8; ++y) A.write_shift(2, 0);
      for (A.write_shift(2, 62), A.write_shift(2, 3), A.write_shift(2, 65534), A.write_shift(2, 9), A.write_shift(2, 6), y = 0; y < 3; ++y) A.write_shift(2, 0);
      for (A.write_shift(4, 0), A.write_shift(4, w[2]), A.write_shift(4, w[0] + w[1] + w[2] + w[3] - 1), A.write_shift(4, 0), A.write_shift(4, 4096), A.write_shift(4, w[3] ? w[0] + w[1] + w[2] - 1 : j), A.write_shift(4, w[3]), A.write_shift(-4, w[1] ? w[0] - 1 : j), A.write_shift(4, w[1]), y = 0; y < 109; ++y) A.write_shift(-4, y < w[2] ? w[1] + y : -1);
    }
    if (w[1])
      for (W = 0; W < w[1]; ++W) {
        for (; y < 236 + W * 127; ++y) A.write_shift(-4, y < w[2] ? w[1] + y : -1);
        A.write_shift(-4, W === w[1] - 1 ? j : W + 1);
      }
    var Y = function(he) {
      for (W += he; y < W - 1; ++y) A.write_shift(-4, y + 1);
      he && (++y, A.write_shift(-4, j));
    };
    for (W = y = 0, W += w[1]; y < W; ++y) A.write_shift(-4, q.DIFSECT);
    for (W += w[2]; y < W; ++y) A.write_shift(-4, q.FATSECT);
    Y(w[3]), Y(w[4]);
    for (var H = 0, V = 0, G = v.FileIndex[0]; H < v.FileIndex.length; ++H)
      G = v.FileIndex[H], G.content && (V = G.content.length, !(V < 4096) && (G.start = W, Y(V + 511 >> 9)));
    for (Y(w[6] + 7 >> 3); A.l & 511; ) A.write_shift(-4, q.ENDOFCHAIN);
    for (W = y = 0, H = 0; H < v.FileIndex.length; ++H)
      G = v.FileIndex[H], G.content && (V = G.content.length, !(!V || V >= 4096) && (G.start = W, Y(V + 63 >> 6)));
    for (; A.l & 511; ) A.write_shift(-4, q.ENDOFCHAIN);
    for (y = 0; y < w[4] << 2; ++y) {
      var Q = v.FullPaths[y];
      if (!Q || Q.length === 0) {
        for (H = 0; H < 17; ++H) A.write_shift(4, 0);
        for (H = 0; H < 3; ++H) A.write_shift(4, -1);
        for (H = 0; H < 12; ++H) A.write_shift(4, 0);
        continue;
      }
      G = v.FileIndex[y], y === 0 && (G.start = G.size ? G.start - 1 : j);
      var te = y === 0 && E.root || G.name;
      if (te.length > 31 && (console.error("Name " + te + " will be truncated to " + te.slice(0, 31)), te = te.slice(0, 31)), V = 2 * (te.length + 1), A.write_shift(64, te, "utf16le"), A.write_shift(2, V), A.write_shift(1, G.type), A.write_shift(1, G.color), A.write_shift(-4, G.L), A.write_shift(-4, G.R), A.write_shift(-4, G.C), G.clsid) A.write_shift(16, G.clsid, "hex");
      else for (H = 0; H < 4; ++H) A.write_shift(4, 0);
      A.write_shift(4, G.state || 0), A.write_shift(4, 0), A.write_shift(4, 0), A.write_shift(4, 0), A.write_shift(4, 0), A.write_shift(4, G.start), A.write_shift(4, G.size), A.write_shift(4, 0);
    }
    for (y = 1; y < v.FileIndex.length; ++y)
      if (G = v.FileIndex[y], G.size >= 4096)
        if (A.l = G.start + 1 << 9, Ce && Buffer.isBuffer(G.content))
          G.content.copy(A, A.l, 0, G.size), A.l += G.size + 511 & -512;
        else {
          for (H = 0; H < G.size; ++H) A.write_shift(1, G.content[H]);
          for (; H & 511; ++H) A.write_shift(1, 0);
        }
    for (y = 1; y < v.FileIndex.length; ++y)
      if (G = v.FileIndex[y], G.size > 0 && G.size < 4096)
        if (Ce && Buffer.isBuffer(G.content))
          G.content.copy(A, A.l, 0, G.size), A.l += G.size + 63 & -64;
        else {
          for (H = 0; H < G.size; ++H) A.write_shift(1, G.content[H]);
          for (; H & 63; ++H) A.write_shift(1, 0);
        }
    if (Ce)
      A.l = A.length;
    else
      for (; A.l < A.length; ) A.write_shift(1, 0);
    return A;
  }
  function M(v, F) {
    var E = v.FullPaths.map(function(H) {
      return H.toUpperCase();
    }), w = E.map(function(H) {
      var V = H.split("/");
      return V[V.length - (H.slice(-1) == "/" ? 2 : 1)];
    }), A = !1;
    F.charCodeAt(0) === 47 ? (A = !0, F = E[0].slice(0, -1) + F) : A = F.indexOf("/") !== -1;
    var y = F.toUpperCase(), W = A === !0 ? E.indexOf(y) : w.indexOf(y);
    if (W !== -1) return v.FileIndex[W];
    var Y = !y.match(Qt);
    for (y = y.replace(br, ""), Y && (y = y.replace(Qt, "!")), W = 0; W < E.length; ++W)
      if ((Y ? E[W].replace(Qt, "!") : E[W]).replace(br, "") == y || (Y ? w[W].replace(Qt, "!") : w[W]).replace(br, "") == y) return v.FileIndex[W];
    return null;
  }
  var X = 64, j = -2, oe = "d0cf11e0a1b11ae1", Z = [208, 207, 17, 224, 161, 177, 26, 225], xe = "00000000000000000000000000000000", q = {
    /* 2.1 Compund File Sector Numbers and Types */
    MAXREGSECT: -6,
    DIFSECT: -4,
    FATSECT: -3,
    ENDOFCHAIN: j,
    FREESECT: -1,
    /* 2.2 Compound File Header */
    HEADER_SIGNATURE: oe,
    HEADER_MINOR_VERSION: "3e00",
    MAXREGSID: -6,
    NOSTREAM: -1,
    HEADER_CLSID: xe,
    /* 2.6.1 Compound File Directory Entry */
    EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
  };
  function ie(v, F, E) {
    o();
    var w = B(v, E);
    f.writeFileSync(F, w);
  }
  function ve(v) {
    for (var F = new Array(v.length), E = 0; E < v.length; ++E) F[E] = String.fromCharCode(v[E]);
    return F.join("");
  }
  function K(v, F) {
    var E = B(v, F);
    switch (F && F.type || "buffer") {
      case "file":
        return o(), f.writeFileSync(F.filename, E), E;
      case "binary":
        return typeof E == "string" ? E : ve(E);
      case "base64":
        return _s(typeof E == "string" ? E : ve(E));
      case "buffer":
        if (Ce) return Buffer.isBuffer(E) ? E : gt(E);
      /* falls through */
      case "array":
        return typeof E == "string" ? Rr(E) : E;
    }
    return E;
  }
  var we;
  function Ee(v) {
    try {
      var F = v.InflateRaw, E = new F();
      if (E._processChunk(new Uint8Array([3, 0]), E._finishFlushFlag), E.bytesRead) we = v;
      else throw new Error("zlib does not expose bytesRead");
    } catch (w) {
      console.error("cannot use native zlib: " + (w.message || w));
    }
  }
  function me(v, F) {
    if (!we) return cs(v, F);
    var E = we.InflateRaw, w = new E(), A = w._processChunk(v.slice(v.l), w._finishFlushFlag);
    return v.l += w.bytesRead, A;
  }
  function le(v) {
    return we ? we.deflateRawSync(v) : yr(v);
  }
  var Ae = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], ke = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258], Se = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  function S(v) {
    var F = (v << 1 | v << 11) & 139536 | (v << 5 | v << 15) & 558144;
    return (F >> 16 | F >> 8 | F) & 255;
  }
  for (var L = typeof Uint8Array < "u", R = L ? new Uint8Array(256) : [], b = 0; b < 256; ++b) R[b] = S(b);
  function J(v, F) {
    var E = R[v & 255];
    return F <= 8 ? E >>> 8 - F : (E = E << 8 | R[v >> 8 & 255], F <= 16 ? E >>> 16 - F : (E = E << 8 | R[v >> 16 & 255], E >>> 24 - F));
  }
  function T(v, F) {
    var E = F & 7, w = F >>> 3;
    return (v[w] | (E <= 6 ? 0 : v[w + 1] << 8)) >>> E & 3;
  }
  function se(v, F) {
    var E = F & 7, w = F >>> 3;
    return (v[w] | (E <= 5 ? 0 : v[w + 1] << 8)) >>> E & 7;
  }
  function ce(v, F) {
    var E = F & 7, w = F >>> 3;
    return (v[w] | (E <= 4 ? 0 : v[w + 1] << 8)) >>> E & 15;
  }
  function re(v, F) {
    var E = F & 7, w = F >>> 3;
    return (v[w] | (E <= 3 ? 0 : v[w + 1] << 8)) >>> E & 31;
  }
  function ge(v, F) {
    var E = F & 7, w = F >>> 3;
    return (v[w] | (E <= 1 ? 0 : v[w + 1] << 8)) >>> E & 127;
  }
  function pe(v, F, E) {
    var w = F & 7, A = F >>> 3, y = (1 << E) - 1, W = v[A] >>> w;
    return E < 8 - w || (W |= v[A + 1] << 8 - w, E < 16 - w) || (W |= v[A + 2] << 16 - w, E < 24 - w) || (W |= v[A + 3] << 24 - w), W & y;
  }
  function Te(v, F, E) {
    var w = F & 7, A = F >>> 3;
    return w <= 5 ? v[A] |= (E & 7) << w : (v[A] |= E << w & 255, v[A + 1] = (E & 7) >> 8 - w), F + 3;
  }
  function Be(v, F, E) {
    var w = F & 7, A = F >>> 3;
    return E = (E & 1) << w, v[A] |= E, F + 1;
  }
  function $e(v, F, E) {
    var w = F & 7, A = F >>> 3;
    return E <<= w, v[A] |= E & 255, E >>>= 8, v[A + 1] = E, F + 8;
  }
  function je(v, F, E) {
    var w = F & 7, A = F >>> 3;
    return E <<= w, v[A] |= E & 255, E >>>= 8, v[A + 1] = E & 255, v[A + 2] = E >>> 8, F + 16;
  }
  function de(v, F) {
    var E = v.length, w = 2 * E > F ? 2 * E : F + 5, A = 0;
    if (E >= F) return v;
    if (Ce) {
      var y = Es(w);
      if (v.copy) v.copy(y);
      else for (; A < v.length; ++A) y[A] = v[A];
      return y;
    } else if (L) {
      var W = new Uint8Array(w);
      if (W.set) W.set(v);
      else for (; A < E; ++A) W[A] = v[A];
      return W;
    }
    return v.length = w, v;
  }
  function Ne(v) {
    for (var F = new Array(v), E = 0; E < v; ++E) F[E] = 0;
    return F;
  }
  function ae(v, F, E) {
    var w = 1, A = 0, y = 0, W = 0, Y = 0, H = v.length, V = L ? new Uint16Array(32) : Ne(32);
    for (y = 0; y < 32; ++y) V[y] = 0;
    for (y = H; y < E; ++y) v[y] = 0;
    H = v.length;
    var G = L ? new Uint16Array(H) : Ne(H);
    for (y = 0; y < H; ++y)
      V[A = v[y]]++, w < A && (w = A), G[y] = 0;
    for (V[0] = 0, y = 1; y <= w; ++y) V[y + 16] = Y = Y + V[y - 1] << 1;
    for (y = 0; y < H; ++y)
      Y = v[y], Y != 0 && (G[y] = V[Y + 16]++);
    var Q = 0;
    for (y = 0; y < H; ++y)
      if (Q = v[y], Q != 0)
        for (Y = J(G[y], w) >> w - Q, W = (1 << w + 4 - Q) - 1; W >= 0; --W)
          F[Y | W << Q] = Q & 15 | y << 4;
    return w;
  }
  var Nr = L ? new Uint16Array(512) : Ne(512), Tr = L ? new Uint16Array(32) : Ne(32);
  if (!L) {
    for (var Xe = 0; Xe < 512; ++Xe) Nr[Xe] = 0;
    for (Xe = 0; Xe < 32; ++Xe) Tr[Xe] = 0;
  }
  (function() {
    for (var v = [], F = 0; F < 32; F++) v.push(5);
    ae(v, Tr, 32);
    var E = [];
    for (F = 0; F <= 143; F++) E.push(8);
    for (; F <= 255; F++) E.push(9);
    for (; F <= 279; F++) E.push(7);
    for (; F <= 287; F++) E.push(8);
    ae(E, Nr, 288);
  })();
  var zr = /* @__PURE__ */ (function() {
    for (var F = L ? new Uint8Array(32768) : [], E = 0, w = 0; E < Se.length - 1; ++E)
      for (; w < Se[E + 1]; ++w) F[w] = E;
    for (; w < 32768; ++w) F[w] = 29;
    var A = L ? new Uint8Array(259) : [];
    for (E = 0, w = 0; E < ke.length - 1; ++E)
      for (; w < ke[E + 1]; ++w) A[w] = E;
    function y(Y, H) {
      for (var V = 0; V < Y.length; ) {
        var G = Math.min(65535, Y.length - V), Q = V + G == Y.length;
        for (H.write_shift(1, +Q), H.write_shift(2, G), H.write_shift(2, ~G & 65535); G-- > 0; ) H[H.l++] = Y[V++];
      }
      return H.l;
    }
    function W(Y, H) {
      for (var V = 0, G = 0, Q = L ? new Uint16Array(32768) : []; G < Y.length; ) {
        var te = (
          /* data.length - boff; */
          Math.min(65535, Y.length - G)
        );
        if (te < 10) {
          for (V = Te(H, V, +(G + te == Y.length)), V & 7 && (V += 8 - (V & 7)), H.l = V / 8 | 0, H.write_shift(2, te), H.write_shift(2, ~te & 65535); te-- > 0; ) H[H.l++] = Y[G++];
          V = H.l * 8;
          continue;
        }
        V = Te(H, V, +(G + te == Y.length) + 2);
        for (var he = 0; te-- > 0; ) {
          var ee = Y[G];
          he = (he << 5 ^ ee) & 32767;
          var ne = -1, Fe = 0;
          if ((ne = Q[he]) && (ne |= G & -32768, ne > G && (ne -= 32768), ne < G))
            for (; Y[ne + Fe] == Y[G + Fe] && Fe < 250; ) ++Fe;
          if (Fe > 2) {
            ee = A[Fe], ee <= 22 ? V = $e(H, V, R[ee + 1] >> 1) - 1 : ($e(H, V, 3), V += 5, $e(H, V, R[ee - 23] >> 5), V += 3);
            var ze = ee < 8 ? 0 : ee - 4 >> 2;
            ze > 0 && (je(H, V, Fe - ke[ee]), V += ze), ee = F[G - ne], V = $e(H, V, R[ee] >> 3), V -= 3;
            var Ke = ee < 4 ? 0 : ee - 2 >> 1;
            Ke > 0 && (je(H, V, G - ne - Se[ee]), V += Ke);
            for (var mr = 0; mr < Fe; ++mr)
              Q[he] = G & 32767, he = (he << 5 ^ Y[G]) & 32767, ++G;
            te -= Fe - 1;
          } else
            ee <= 143 ? ee = ee + 48 : V = Be(H, V, 1), V = $e(H, V, R[ee]), Q[he] = G & 32767, ++G;
        }
        V = $e(H, V, 0) - 1;
      }
      return H.l = (V + 7) / 8 | 0, H.l;
    }
    return function(H, V) {
      return H.length < 8 ? y(H, V) : W(H, V);
    };
  })();
  function yr(v) {
    var F = sr(50 + Math.floor(v.length * 1.1)), E = zr(v, F);
    return F.slice(0, E);
  }
  var fe = L ? new Uint16Array(32768) : Ne(32768), Le = L ? new Uint16Array(32768) : Ne(32768), Qe = L ? new Uint16Array(128) : Ne(128), er = 1, et = 1;
  function kt(v, F) {
    var E = re(v, F) + 257;
    F += 5;
    var w = re(v, F) + 1;
    F += 5;
    var A = ce(v, F) + 4;
    F += 4;
    for (var y = 0, W = L ? new Uint8Array(19) : Ne(19), Y = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], H = 1, V = L ? new Uint8Array(8) : Ne(8), G = L ? new Uint8Array(8) : Ne(8), Q = W.length, te = 0; te < A; ++te)
      W[Ae[te]] = y = se(v, F), H < y && (H = y), V[y]++, F += 3;
    var he = 0;
    for (V[0] = 0, te = 1; te <= H; ++te) G[te] = he = he + V[te - 1] << 1;
    for (te = 0; te < Q; ++te) (he = W[te]) != 0 && (Y[te] = G[he]++);
    var ee = 0;
    for (te = 0; te < Q; ++te)
      if (ee = W[te], ee != 0) {
        he = R[Y[te]] >> 8 - ee;
        for (var ne = (1 << 7 - ee) - 1; ne >= 0; --ne) Qe[he | ne << ee] = ee & 7 | te << 3;
      }
    var Fe = [];
    for (H = 1; Fe.length < E + w; )
      switch (he = Qe[ge(v, F)], F += he & 7, he >>>= 3) {
        case 16:
          for (y = 3 + T(v, F), F += 2, he = Fe[Fe.length - 1]; y-- > 0; ) Fe.push(he);
          break;
        case 17:
          for (y = 3 + se(v, F), F += 3; y-- > 0; ) Fe.push(0);
          break;
        case 18:
          for (y = 11 + ge(v, F), F += 7; y-- > 0; ) Fe.push(0);
          break;
        default:
          Fe.push(he), H < he && (H = he);
          break;
      }
    var ze = Fe.slice(0, E), Ke = Fe.slice(E);
    for (te = E; te < 286; ++te) ze[te] = 0;
    for (te = w; te < 30; ++te) Ke[te] = 0;
    return er = ae(ze, fe, 286), et = ae(Ke, Le, 30), F;
  }
  function ba(v, F) {
    if (v[0] == 3 && !(v[1] & 3))
      return [xt(F), 2];
    for (var E = 0, w = 0, A = Es(F || 1 << 18), y = 0, W = A.length >>> 0, Y = 0, H = 0; (w & 1) == 0; ) {
      if (w = se(v, E), E += 3, w >>> 1)
        w >> 1 == 1 ? (Y = 9, H = 5) : (E = kt(v, E), Y = er, H = et);
      else {
        E & 7 && (E += 8 - (E & 7));
        var V = v[E >>> 3] | v[(E >>> 3) + 1] << 8;
        if (E += 32, V > 0)
          for (!F && W < y + V && (A = de(A, y + V), W = A.length); V-- > 0; )
            A[y++] = v[E >>> 3], E += 8;
        continue;
      }
      for (; ; ) {
        !F && W < y + 32767 && (A = de(A, y + 32767), W = A.length);
        var G = pe(v, E, Y), Q = w >>> 1 == 1 ? Nr[G] : fe[G];
        if (E += Q & 15, Q >>>= 4, (Q >>> 8 & 255) === 0) A[y++] = Q;
        else {
          if (Q == 256) break;
          Q -= 257;
          var te = Q < 8 ? 0 : Q - 4 >> 2;
          te > 5 && (te = 0);
          var he = y + ke[Q];
          te > 0 && (he += pe(v, E, te), E += te), G = pe(v, E, H), Q = w >>> 1 == 1 ? Tr[G] : Le[G], E += Q & 15, Q >>>= 4;
          var ee = Q < 4 ? 0 : Q - 2 >> 1, ne = Se[Q];
          for (ee > 0 && (ne += pe(v, E, ee), E += ee), !F && W < he && (A = de(A, he + 100), W = A.length); y < he; )
            A[y] = A[y - ne], ++y;
        }
      }
    }
    return F ? [A, E + 7 >>> 3] : [A.slice(0, y), E + 7 >>> 3];
  }
  function cs(v, F) {
    var E = v.slice(v.l || 0), w = ba(E, F);
    return v.l += w[1], w[0];
  }
  function fs(v, F) {
    if (v)
      typeof console < "u" && console.error(F);
    else throw new Error(F);
  }
  function os(v, F) {
    var E = (
      /*::(*/
      v
    );
    cr(E, 0);
    var w = [], A = [], y = {
      FileIndex: w,
      FullPaths: A
    };
    P(y, { root: F.root });
    for (var W = E.length - 4; (E[W] != 80 || E[W + 1] != 75 || E[W + 2] != 5 || E[W + 3] != 6) && W >= 0; ) --W;
    E.l = W + 4, E.l += 4;
    var Y = E.read_shift(2);
    E.l += 6;
    var H = E.read_shift(4);
    for (E.l = H, W = 0; W < Y; ++W) {
      E.l += 20;
      var V = E.read_shift(4), G = E.read_shift(4), Q = E.read_shift(2), te = E.read_shift(2), he = E.read_shift(2);
      E.l += 8;
      var ee = E.read_shift(4), ne = c(
        /*::(*/
        E.slice(E.l + Q, E.l + Q + te)
        /*:: :any)*/
      );
      E.l += Q + te + he;
      var Fe = E.l;
      E.l = ee + 4, ne && ne[1] && ((ne[1] || {}).usz && (G = ne[1].usz), (ne[1] || {}).csz && (V = ne[1].csz)), dc(E, V, G, y, ne), E.l = Fe;
    }
    return y;
  }
  function dc(v, F, E, w, A) {
    v.l += 2;
    var y = v.read_shift(2), W = v.read_shift(2), Y = i(v);
    if (y & 8257) throw new Error("Unsupported ZIP encryption");
    for (var H = v.read_shift(4), V = v.read_shift(4), G = v.read_shift(4), Q = v.read_shift(2), te = v.read_shift(2), he = "", ee = 0; ee < Q; ++ee) he += String.fromCharCode(v[v.l++]);
    if (te) {
      var ne = c(
        /*::(*/
        v.slice(v.l, v.l + te)
        /*:: :any)*/
      );
      (ne[21589] || {}).mt && (Y = ne[21589].mt), (ne[1] || {}).usz && (G = ne[1].usz), (ne[1] || {}).csz && (V = ne[1].csz), A && ((A[21589] || {}).mt && (Y = A[21589].mt), (A[1] || {}).usz && (G = A[1].usz), (A[1] || {}).csz && (V = A[1].csz));
    }
    v.l += te;
    var Fe = v.slice(v.l, v.l + V);
    switch (W) {
      case 8:
        Fe = me(v, G);
        break;
      case 0:
        v.l += V;
        break;
      // TODO: scan for magic number
      default:
        throw new Error("Unsupported ZIP Compression method " + W);
    }
    var ze = !1;
    y & 8 && (H = v.read_shift(4), H == 134695760 && (H = v.read_shift(4), ze = !0), V = v.read_shift(4), G = v.read_shift(4)), V != F && fs(ze, "Bad compressed size: " + F + " != " + V), G != E && fs(ze, "Bad uncompressed size: " + E + " != " + G), un(w, he, Fe, { unsafe: !0, mt: Y });
  }
  function xc(v, F) {
    var E = F || {}, w = [], A = [], y = sr(1), W = E.compression ? 8 : 0, Y = 0, H = 0, V = 0, G = 0, Q = 0, te = v.FullPaths[0], he = te, ee = v.FileIndex[0], ne = [], Fe = 0;
    for (H = 1; H < v.FullPaths.length; ++H)
      if (he = v.FullPaths[H].slice(te.length), ee = v.FileIndex[H], !(!ee.size || !ee.content || Array.isArray(ee.content) && ee.content.length == 0 || he == "\u0001Sh33tJ5")) {
        var ze = G, Ke = sr(he.length);
        for (V = 0; V < he.length; ++V) Ke.write_shift(1, he.charCodeAt(V) & 127);
        Ke = Ke.slice(0, Ke.l), ne[Q] = typeof ee.content == "string" ? bs.bstr(ee.content, 0) : bs.buf(
          /*::((*/
          ee.content,
          0
        );
        var mr = typeof ee.content == "string" ? Rr(ee.content) : ee.content;
        W == 8 && (mr = le(mr)), y = sr(30), y.write_shift(4, 67324752), y.write_shift(2, 20), y.write_shift(2, Y), y.write_shift(2, W), ee.mt ? s(y, ee.mt) : y.write_shift(4, 0), y.write_shift(-4, ne[Q]), y.write_shift(4, mr.length), y.write_shift(
          4,
          /*::(*/
          ee.content.length
        ), y.write_shift(2, Ke.length), y.write_shift(2, 0), G += y.length, w.push(y), G += Ke.length, w.push(Ke), G += mr.length, w.push(mr), y = sr(46), y.write_shift(4, 33639248), y.write_shift(2, 0), y.write_shift(2, 20), y.write_shift(2, Y), y.write_shift(2, W), y.write_shift(4, 0), y.write_shift(-4, ne[Q]), y.write_shift(4, mr.length), y.write_shift(
          4,
          /*::(*/
          ee.content.length
        ), y.write_shift(2, Ke.length), y.write_shift(2, 0), y.write_shift(2, 0), y.write_shift(2, 0), y.write_shift(2, 0), y.write_shift(4, 0), y.write_shift(4, ze), Fe += y.l, A.push(y), Fe += Ke.length, A.push(Ke), ++Q;
      }
    return y = sr(22), y.write_shift(4, 101010256), y.write_shift(2, 0), y.write_shift(2, 0), y.write_shift(2, Q), y.write_shift(2, Q), y.write_shift(4, Fe), y.write_shift(4, G), y.write_shift(2, 0), ht([ht(w), ht(A), y]);
  }
  var Pa = {
    htm: "text/html",
    xml: "text/xml",
    gif: "image/gif",
    jpg: "image/jpeg",
    png: "image/png",
    mso: "application/x-mso",
    thmx: "application/vnd.ms-officetheme",
    sh33tj5: "application/octet-stream"
  };
  function pc(v, F) {
    if (v.ctype) return v.ctype;
    var E = v.name || "", w = E.match(/\.([^\.]+)$/);
    return w && Pa[w[1]] || F && (w = (E = F).match(/[\.\\]([^\.\\])+$/), w && Pa[w[1]]) ? Pa[w[1]] : "application/octet-stream";
  }
  function mc(v) {
    for (var F = _s(v), E = [], w = 0; w < F.length; w += 76) E.push(F.slice(w, w + 76));
    return E.join(`\r
`) + `\r
`;
  }
  function gc(v) {
    var F = v.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(V) {
      var G = V.charCodeAt(0).toString(16).toUpperCase();
      return "=" + (G.length == 1 ? "0" + G : G);
    });
    F = F.replace(/ $/mg, "=20").replace(/\t$/mg, "=09"), F.charAt(0) == `
` && (F = "=0D" + F.slice(1)), F = F.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, `
=0A`).replace(/([^\r\n])\n/mg, "$1=0A");
    for (var E = [], w = F.split(`\r
`), A = 0; A < w.length; ++A) {
      var y = w[A];
      if (y.length == 0) {
        E.push("");
        continue;
      }
      for (var W = 0; W < y.length; ) {
        var Y = 76, H = y.slice(W, W + Y);
        H.charAt(Y - 1) == "=" ? Y-- : H.charAt(Y - 2) == "=" ? Y -= 2 : H.charAt(Y - 3) == "=" && (Y -= 3), H = y.slice(W, W + Y), W += Y, W < y.length && (H += "="), E.push(H);
      }
    }
    return E.join(`\r
`);
  }
  function vc(v) {
    for (var F = [], E = 0; E < v.length; ++E) {
      for (var w = v[E]; E <= v.length && w.charAt(w.length - 1) == "="; ) w = w.slice(0, w.length - 1) + v[++E];
      F.push(w);
    }
    for (var A = 0; A < F.length; ++A) F[A] = F[A].replace(/[=][0-9A-Fa-f]{2}/g, function(y) {
      return String.fromCharCode(parseInt(y.slice(1), 16));
    });
    return Rr(F.join(`\r
`));
  }
  function kc(v, F, E) {
    for (var w = "", A = "", y = "", W, Y = 0; Y < 10; ++Y) {
      var H = F[Y];
      if (!H || H.match(/^\s*$/)) break;
      var V = H.match(/^([^:]*?):\s*([^\s].*)$/);
      if (V) switch (V[1].toLowerCase()) {
        case "content-location":
          w = V[2].trim();
          break;
        case "content-type":
          y = V[2].trim();
          break;
        case "content-transfer-encoding":
          A = V[2].trim();
          break;
      }
    }
    switch (++Y, A.toLowerCase()) {
      case "base64":
        W = Rr(Mr(F.slice(Y).join("")));
        break;
      case "quoted-printable":
        W = vc(F.slice(Y));
        break;
      default:
        throw new Error("Unsupported Content-Transfer-Encoding " + A);
    }
    var G = un(v, w.slice(E.length), W, { unsafe: !0 });
    y && (G.ctype = y);
  }
  function _c(v, F) {
    if (ve(v.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
    var E = F && F.root || "", w = (Ce && Buffer.isBuffer(v) ? v.toString("binary") : ve(v)).split(`\r
`), A = 0, y = "";
    for (A = 0; A < w.length; ++A)
      if (y = w[A], !!/^Content-Location:/i.test(y) && (y = y.slice(y.indexOf("file")), E || (E = y.slice(0, y.lastIndexOf("/") + 1)), y.slice(0, E.length) != E))
        for (; E.length > 0 && (E = E.slice(0, E.length - 1), E = E.slice(0, E.lastIndexOf("/") + 1), y.slice(0, E.length) != E); )
          ;
    var W = (w[1] || "").match(/boundary="(.*?)"/);
    if (!W) throw new Error("MAD cannot find boundary");
    var Y = "--" + (W[1] || ""), H = [], V = [], G = {
      FileIndex: H,
      FullPaths: V
    };
    P(G);
    var Q, te = 0;
    for (A = 0; A < w.length; ++A) {
      var he = w[A];
      he !== Y && he !== Y + "--" || (te++ && kc(G, w.slice(Q, A), E), Q = A);
    }
    return G;
  }
  function Ec(v, F) {
    var E = F || {}, w = E.boundary || "SheetJS";
    w = "------=" + w;
    for (var A = [
      "MIME-Version: 1.0",
      'Content-Type: multipart/related; boundary="' + w.slice(2) + '"',
      "",
      "",
      ""
    ], y = v.FullPaths[0], W = y, Y = v.FileIndex[0], H = 1; H < v.FullPaths.length; ++H)
      if (W = v.FullPaths[H].slice(y.length), Y = v.FileIndex[H], !(!Y.size || !Y.content || W == "\u0001Sh33tJ5")) {
        W = W.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(Fe) {
          return "_x" + Fe.charCodeAt(0).toString(16) + "_";
        }).replace(/[\u0080-\uFFFF]/g, function(Fe) {
          return "_u" + Fe.charCodeAt(0).toString(16) + "_";
        });
        for (var V = Y.content, G = Ce && Buffer.isBuffer(V) ? V.toString("binary") : ve(V), Q = 0, te = Math.min(1024, G.length), he = 0, ee = 0; ee <= te; ++ee) (he = G.charCodeAt(ee)) >= 32 && he < 128 && ++Q;
        var ne = Q >= te * 4 / 5;
        A.push(w), A.push("Content-Location: " + (E.root || "file:///C:/SheetJS/") + W), A.push("Content-Transfer-Encoding: " + (ne ? "quoted-printable" : "base64")), A.push("Content-Type: " + pc(Y, W)), A.push(""), A.push(ne ? gc(G) : mc(G));
      }
    return A.push(w + `--\r
`), A.join(`\r
`);
  }
  function wc(v) {
    var F = {};
    return P(F, v), F;
  }
  function un(v, F, E, w) {
    var A = w && w.unsafe;
    A || P(v);
    var y = !A && Re.find(v, F);
    if (!y) {
      var W = v.FullPaths[0];
      F.slice(0, W.length) == W ? W = F : (W.slice(-1) != "/" && (W += "/"), W = (W + F).replace("//", "/")), y = { name: n(F), type: 2 }, v.FileIndex.push(y), v.FullPaths.push(W), A || Re.utils.cfb_gc(v);
    }
    return y.content = E, y.size = E ? E.length : 0, w && (w.CLSID && (y.clsid = w.CLSID), w.mt && (y.mt = w.mt), w.ct && (y.ct = w.ct)), y;
  }
  function Tc(v, F) {
    P(v);
    var E = Re.find(v, F);
    if (E) {
      for (var w = 0; w < v.FileIndex.length; ++w) if (v.FileIndex[w] == E)
        return v.FileIndex.splice(w, 1), v.FullPaths.splice(w, 1), !0;
    }
    return !1;
  }
  function Ac(v, F, E) {
    P(v);
    var w = Re.find(v, F);
    if (w) {
      for (var A = 0; A < v.FileIndex.length; ++A) if (v.FileIndex[A] == w)
        return v.FileIndex[A].name = n(E), v.FullPaths[A] = E, !0;
    }
    return !1;
  }
  function Fc(v) {
    N(v, !0);
  }
  return t.find = M, t.read = U, t.parse = l, t.write = K, t.writeFile = ie, t.utils = {
    cfb_new: wc,
    cfb_add: un,
    cfb_del: Tc,
    cfb_mov: Ac,
    cfb_gc: Fc,
    ReadShift: ta,
    CheckField: di,
    prep_blob: cr,
    bconcat: ht,
    use_zlib: Ee,
    _deflateRaw: yr,
    _inflateRaw: cs,
    consts: q
  }, t;
})(), Co;
function bo(e) {
  if (typeof Deno < "u") return Deno.readFileSync(e);
  if (typeof $ < "u" && typeof File < "u" && typeof Folder < "u") try {
    var t = File(e);
    t.open("r"), t.encoding = "binary";
    var r = t.read();
    return t.close(), r;
  } catch (a) {
    if (!a.message || a.message.indexOf("onstruct") == -1) throw a;
  }
  throw new Error("Cannot access file " + e);
}
function $r(e) {
  for (var t = Object.keys(e), r = [], a = 0; a < t.length; ++a) Object.prototype.hasOwnProperty.call(e, t[a]) && r.push(t[a]);
  return r;
}
function $n(e) {
  for (var t = [], r = $r(e), a = 0; a !== r.length; ++a) t[e[r[a]]] = r[a];
  return t;
}
var G0 = /* @__PURE__ */ Date.UTC(1899, 11, 30, 0, 0, 0), Po = /* @__PURE__ */ Date.UTC(1899, 11, 31, 0, 0, 0), No = /* @__PURE__ */ Date.UTC(1904, 0, 1, 0, 0, 0);
function fr(e, t) {
  var r = /* @__PURE__ */ e.getTime(), a = (r - G0) / (1440 * 60 * 1e3);
  return t ? (a -= 1462, a < -1402 ? a - 1 : a) : a < 60 ? a - 1 : a;
}
function dt(e) {
  if (e >= 60 && e < 61) return e;
  var t = /* @__PURE__ */ new Date();
  return t.setTime((e > 60 ? e : e + 1) * 24 * 60 * 60 * 1e3 + G0), t;
}
function Do(e) {
  var t = 0, r = 0, a = !1, n = e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);
  if (!n) throw new Error("|" + e + "| is not an ISO8601 Duration");
  for (var s = 1; s != n.length; ++s)
    if (n[s]) {
      switch (r = 1, s > 3 && (a = !0), n[s].slice(n[s].length - 1)) {
        case "Y":
          throw new Error("Unsupported ISO Duration Field: " + n[s].slice(n[s].length - 1));
        case "D":
          r *= 24;
        /* falls through */
        case "H":
          r *= 60;
        /* falls through */
        case "M":
          if (a) r *= 60;
          else throw new Error("Unsupported ISO Duration Field: M");
      }
      t += r * parseInt(n[s], 10);
    }
  return t;
}
var Ro = /^(\d+):(\d+)(:\d+)?(\.\d+)?$/, Io = /^(\d+)-(\d+)-(\d+)$/, X0 = /^(\d+)-(\d+)-(\d+)[T ](\d+):(\d+)(:\d+)?(\.\d+)?$/;
function xr(e, t) {
  if (e instanceof Date) return e;
  var r = e.match(Ro);
  if (r) return new Date((t ? No : Po) + ((parseInt(r[1], 10) * 60 + parseInt(r[2], 10)) * 60 + (r[3] ? parseInt(r[3].slice(1), 10) : 0)) * 1e3 + (r[4] ? parseInt((r[4] + "000").slice(1, 4), 10) : 0));
  if (r = e.match(Io), r) return new Date(Date.UTC(+r[1], +r[2] - 1, +r[3], 0, 0, 0, 0));
  if (r = e.match(X0), r) return new Date(Date.UTC(+r[1], +r[2] - 1, +r[3], +r[4], +r[5], r[6] && parseInt(r[6].slice(1), 10) || 0, r[7] && parseInt((r[7] + "0000").slice(1, 4), 10) || 0));
  var a = new Date(e);
  return a;
}
function Ct(e, t) {
  if (Ce && Buffer.isBuffer(e)) {
    if (t && xa) {
      if (e[0] == 255 && e[1] == 254) return ea(e.slice(2).toString("utf16le"));
      if (e[1] == 254 && e[2] == 255) return ea(I0(e.slice(2).toString("binary")));
    }
    return e.toString("binary");
  }
  if (typeof TextDecoder < "u") try {
    if (t) {
      if (e[0] == 255 && e[1] == 254) return ea(new TextDecoder("utf-16le").decode(e.slice(2)));
      if (e[0] == 254 && e[1] == 255) return ea(new TextDecoder("utf-16be").decode(e.slice(2)));
    }
    var r = {
      "€": "",
      "‚": "",
      ƒ: "",
      "„": "",
      "…": "",
      "†": "",
      "‡": "",
      "ˆ": "",
      "‰": "",
      Š: "",
      "‹": "",
      Œ: "",
      Ž: "",
      "‘": "",
      "’": "",
      "“": "",
      "”": "",
      "•": "",
      "–": "",
      "—": "",
      "˜": "",
      "™": "",
      š: "",
      "›": "",
      œ: "",
      ž: "",
      Ÿ: ""
    };
    return Array.isArray(e) && (e = new Uint8Array(e)), new TextDecoder("latin1").decode(e).replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g, function(s) {
      return r[s] || s;
    });
  } catch {
  }
  var a = [], n = 0;
  try {
    for (n = 0; n < e.length - 65536; n += 65536) a.push(String.fromCharCode.apply(0, e.slice(n, n + 65536)));
    a.push(String.fromCharCode.apply(0, e.slice(n)));
  } catch {
    try {
      for (; n < e.length - 16384; n += 16384) a.push(String.fromCharCode.apply(0, e.slice(n, n + 16384)));
      a.push(String.fromCharCode.apply(0, e.slice(n)));
    } catch {
      for (; n != e.length; ++n) a.push(String.fromCharCode(e[n]));
    }
  }
  return a.join("");
}
function ir(e) {
  if (typeof JSON < "u" && !Array.isArray(e)) return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null) return e;
  if (e instanceof Date) return new Date(e.getTime());
  var t = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = ir(e[r]));
  return t;
}
function De(e, t) {
  for (var r = ""; r.length < t; ) r += e;
  return r;
}
function Or(e) {
  var t = Number(e);
  if (!isNaN(t)) return isFinite(t) ? t : NaN;
  if (!/\d/.test(e)) return t;
  var r = 1, a = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function() {
    return r *= 100, "";
  });
  return !isNaN(t = Number(a)) || (a = a.replace(/[(]([^()]*)[)]/, function(n, s) {
    return r = -r, s;
  }), !isNaN(t = Number(a))) ? t / r : t;
}
var Oo = /^(0?\d|1[0-2])(?:|:([0-5]?\d)(?:|(\.\d+)(?:|:([0-5]?\d))|:([0-5]?\d)(|\.\d+)))\s+([ap])m?$/, Mo = /^([01]?\d|2[0-3])(?:|:([0-5]?\d)(?:|(\.\d+)(?:|:([0-5]?\d))|:([0-5]?\d)(|\.\d+)))$/, Lo = /^(\d+)-(\d+)-(\d+)[T ](\d+):(\d+)(:\d+)(\.\d+)?[Z]?$/, Bo = (/* @__PURE__ */ new Date("6/9/69 00:00 UTC")).valueOf() == -177984e5;
function Uo(e) {
  return e[2] ? e[3] ? e[4] ? new Date(Date.UTC(1899, 11, 31, +e[1] % 12 + (e[7] == "p" ? 12 : 0), +e[2], +e[4], parseFloat(e[3]) * 1e3)) : new Date(Date.UTC(1899, 11, 31, e[7] == "p" ? 12 : 0, +e[1], +e[2], parseFloat(e[3]) * 1e3)) : e[5] ? new Date(Date.UTC(1899, 11, 31, +e[1] % 12 + (e[7] == "p" ? 12 : 0), +e[2], +e[5], e[6] ? parseFloat(e[6]) * 1e3 : 0)) : new Date(Date.UTC(1899, 11, 31, +e[1] % 12 + (e[7] == "p" ? 12 : 0), +e[2], 0, 0)) : new Date(Date.UTC(1899, 11, 31, +e[1] % 12 + (e[7] == "p" ? 12 : 0), 0, 0, 0));
}
function Ho(e) {
  return e[2] ? e[3] ? e[4] ? new Date(Date.UTC(1899, 11, 31, +e[1], +e[2], +e[4], parseFloat(e[3]) * 1e3)) : new Date(Date.UTC(1899, 11, 31, 0, +e[1], +e[2], parseFloat(e[3]) * 1e3)) : e[5] ? new Date(Date.UTC(1899, 11, 31, +e[1], +e[2], +e[5], e[6] ? parseFloat(e[6]) * 1e3 : 0)) : new Date(Date.UTC(1899, 11, 31, +e[1], +e[2], 0, 0)) : new Date(Date.UTC(1899, 11, 31, +e[1], 0, 0, 0));
}
var Wo = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
function ma(e) {
  if (Lo.test(e)) return e.indexOf("Z") == -1 ? an(new Date(e)) : new Date(e);
  var t = e.toLowerCase(), r = t.replace(/\s+/g, " ").trim(), a = r.match(Oo);
  if (a) return Uo(a);
  if (a = r.match(Mo), a) return Ho(a);
  if (a = r.match(X0), a) return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], a[6] && parseInt(a[6].slice(1), 10) || 0, a[7] && parseInt((a[7] + "0000").slice(1, 4), 10) || 0));
  var n = new Date(Bo && e.indexOf("UTC") == -1 ? e + " UTC" : e), s = /* @__PURE__ */ new Date(NaN), i = n.getYear();
  n.getMonth();
  var c = n.getDate();
  if (isNaN(c)) return s;
  if (t.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (t = t.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, ""), t.length > 3 && Wo.indexOf(t) == -1) return s;
  } else if (t.replace(/[ap]m?/, "").match(/[a-z]/)) return s;
  return i < 0 || i > 8099 || e.match(/[^-0-9:,\/\\\ ]/) ? s : n;
}
var Vo = /* @__PURE__ */ (function() {
  var e = "abacaba".split(/(:?b)/i).length == 5;
  return function(r, a, n) {
    if (e || typeof a == "string") return r.split(a);
    for (var s = r.split(a), i = [s[0]], c = 1; c < s.length; ++c)
      i.push(n), i.push(s[c]);
    return i;
  };
})();
function bt(e) {
  return new Date(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds());
}
function an(e) {
  return new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()));
}
function Gn(e) {
  var t = e.slice(0, 1024), r = t.indexOf("<!DOCTYPE");
  if (r == -1) return e;
  var a = e.match(/<[\w]/);
  return a ? e.slice(0, r) + e.slice(a.index) : e;
}
function Xn(e, t, r) {
  for (var a = [], n = e.indexOf(t); n > -1; ) {
    var s = e.indexOf(r, n + t.length);
    if (s == -1) break;
    a.push(e.slice(n, s + r.length)), n = e.indexOf(t, s + r.length);
  }
  return a.length > 0 ? a : null;
}
function wa(e, t, r) {
  var a = [], n = 0, s = e.indexOf(t);
  if (s == -1) return e;
  for (; s > -1; ) {
    a.push(e.slice(n, s));
    var i = e.indexOf(r, s + t.length);
    if (i == -1) break;
    (s = e.indexOf(t, n = i + r.length)) == -1 && a.push(e.slice(n));
  }
  return a.join("");
}
var $o = { " ": 1, "	": 1, "\r": 1, "\n": 1, ">": 1 };
function At(e, t) {
  for (var r = e.indexOf("<" + t), a = t.length + 1, n = e.length; r >= 0 && r <= n - a && !$o[e.charAt(r + a)]; ) r = e.indexOf("<" + t, r + 1);
  if (r === -1) return null;
  var s = e.indexOf(">", r + t.length);
  if (s === -1) return null;
  var i = "</" + t + ">", c = e.indexOf(i, s);
  return c == -1 ? null : [e.slice(r, c + i.length), e.slice(s + 1, c)];
}
var hr = /* @__PURE__ */ (function() {
  var e = {};
  return function(r, a) {
    var n = e[a];
    n || (e[a] = n = [
      new RegExp("<(?:\\w+:)?" + a + "\\b[^<>]*>", "g"),
      new RegExp("</(?:\\w+:)?" + a + ">", "g")
    ]), n[0].lastIndex = n[1].lastIndex = 0;
    var s = n[0].exec(r);
    if (!s) return null;
    var i = s.index, c = n[0].lastIndex;
    if (n[1].lastIndex = n[0].lastIndex, s = n[1].exec(r), !s) return null;
    var f = s.index, o = n[1].lastIndex;
    return [r.slice(i, o), r.slice(c, f)];
  };
})(), z0 = /* @__PURE__ */ (function() {
  var e = {};
  return function(r, a) {
    var n = [], s = e[a];
    s || (e[a] = s = [
      new RegExp("<(?:\\w+:)?" + a + "\\b[^<>]*>", "g"),
      new RegExp("</(?:\\w+:)?" + a + ">", "g")
    ]), s[0].lastIndex = s[1].lastIndex = 0;
    for (var i; i = s[0].exec(r); ) {
      var c = i.index;
      if (s[1].lastIndex = s[0].lastIndex, i = s[1].exec(r), !i) return null;
      var f = s[1].lastIndex;
      n.push(r.slice(c, f)), s[0].lastIndex = s[1].lastIndex;
    }
    return n.length == 0 ? null : n;
  };
})(), Go = /* @__PURE__ */ (function() {
  var e = {};
  return function(r, a) {
    var n = [], s = e[a];
    s || (e[a] = s = [
      new RegExp("<(?:\\w+:)?" + a + "\\b[^<>]*>", "g"),
      new RegExp("</(?:\\w+:)?" + a + ">", "g")
    ]), s[0].lastIndex = s[1].lastIndex = 0;
    for (var i, c = 0, f = 0; i = s[0].exec(r); ) {
      if (c = i.index, n.push(r.slice(f, c)), f = c, s[1].lastIndex = s[0].lastIndex, i = s[1].exec(r), !i) return null;
      f = s[1].lastIndex, s[0].lastIndex = s[1].lastIndex;
    }
    return n.push(r.slice(f)), n.length == 0 ? "" : n.join("");
  };
})(), Xo = /* @__PURE__ */ (function() {
  var e = {};
  return function(r, a) {
    var n = [], s = e[a];
    s || (e[a] = s = [
      new RegExp("<" + a + "\\b[^<>]*>", "ig"),
      new RegExp("</" + a + ">", "ig")
    ]), s[0].lastIndex = s[1].lastIndex = 0;
    for (var i; i = s[0].exec(r); ) {
      var c = i.index;
      if (s[1].lastIndex = s[0].lastIndex, i = s[1].exec(r), !i) return null;
      var f = s[1].lastIndex;
      n.push(r.slice(c, f)), s[0].lastIndex = s[1].lastIndex;
    }
    return n.length == 0 ? null : n;
  };
})();
function K0(e) {
  return e ? e.content && e.type ? Ct(e.content, !0) : e.data ? qt(e.data) : e.asNodeBuffer && Ce ? qt(e.asNodeBuffer().toString("binary")) : e.asBinary ? qt(e.asBinary()) : e._data && e._data.getContent ? qt(Ct(Array.prototype.slice.call(e._data.getContent(), 0))) : null : null;
}
function j0(e) {
  if (!e) return null;
  if (e.data) return vs(e.data);
  if (e.asNodeBuffer && Ce) return e.asNodeBuffer();
  if (e._data && e._data.getContent) {
    var t = e._data.getContent();
    return typeof t == "string" ? vs(t) : Array.prototype.slice.call(t);
  }
  return e.content && e.type ? e.content : null;
}
function zo(e) {
  return e && e.name.slice(-4) === ".bin" ? j0(e) : K0(e);
}
function Wr(e, t) {
  for (var r = e.FullPaths || $r(e.files), a = t.toLowerCase().replace(/[\/]/g, "\\"), n = a.replace(/\\/g, "/"), s = 0; s < r.length; ++s) {
    var i = r[s].replace(/^Root Entry[\/]/, "").toLowerCase();
    if (a == i || n == i) return e.files ? e.files[r[s]] : e.FileIndex[s];
  }
  return null;
}
function zn(e, t) {
  var r = Wr(e, t);
  if (r == null) throw new Error("Cannot find file " + t + " in zip");
  return r;
}
function tr(e, t, r) {
  if (!r) return zo(zn(e, t));
  if (!t) return null;
  try {
    return tr(e, t);
  } catch {
    return null;
  }
}
function Sr(e, t, r) {
  if (!r) return K0(zn(e, t));
  if (!t) return null;
  try {
    return Sr(e, t);
  } catch {
    return null;
  }
}
function Ko(e, t, r) {
  return j0(zn(e, t));
}
function Ps(e) {
  for (var t = e.FullPaths || $r(e.files), r = [], a = 0; a < t.length; ++a) t[a].slice(-1) != "/" && r.push(t[a].replace(/^Root Entry[\/]/, ""));
  return r.sort();
}
function jo(e, t, r) {
  if (e.FullPaths) {
    if (Array.isArray(r) && typeof r[0] == "string" && (r = r.join("")), typeof r == "string") {
      var a;
      return Ce ? a = gt(r) : a = eo(r), Re.utils.cfb_add(e, t, a);
    }
    Re.utils.cfb_add(e, t, r);
  } else e.file(t, r);
}
function Y0(e, t) {
  switch (t.type) {
    case "base64":
      return Re.read(e, { type: "base64" });
    case "binary":
      return Re.read(e, { type: "binary" });
    case "buffer":
    case "array":
      return Re.read(e, { type: "buffer" });
  }
  throw new Error("Unrecognized type " + t.type);
}
function Ut(e, t) {
  if (e.charAt(0) == "/") return e.slice(1);
  var r = t.split("/");
  t.slice(-1) != "/" && r.pop();
  for (var a = e.split("/"); a.length !== 0; ) {
    var n = a.shift();
    n === ".." ? r.pop() : n !== "." && r.push(n);
  }
  return r.join("/");
}
var J0 = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`, Z0 = /\s([^"\s?>\/]+)\s*=\s*((?:")([^"]*)(?:")|(?:')([^']*)(?:')|([^'">\s]+))/g, Ns = /<[\/\?]?[a-zA-Z0-9:_-]+(?:\s+[^"\s?<>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'"<>\s=]+))*\s*[\/\?]?>/mg, Yo = /<[^<>]*>/g, pr = /* @__PURE__ */ J0.match(Ns) ? Ns : Yo, Jo = /<\w*:/, Zo = /<(\/?)\w+:/;
function ue(e, t, r) {
  for (var a = {}, n = 0, s = 0; n !== e.length && !((s = e.charCodeAt(n)) === 32 || s === 10 || s === 13); ++n) ;
  if (t || (a[0] = e.slice(0, n)), n === e.length) return a;
  var i = e.match(Z0), c = 0, f = "", o = 0, l = "", p = "", u = 1;
  if (i) for (o = 0; o != i.length; ++o) {
    for (p = i[o].slice(1), s = 0; s != p.length && p.charCodeAt(s) !== 61; ++s) ;
    for (l = p.slice(0, s).trim(); p.charCodeAt(s + 1) == 32; ) ++s;
    for (u = (n = p.charCodeAt(s + 1)) == 34 || n == 39 ? 1 : 0, f = p.slice(s + 1 + u, p.length - u), c = 0; c != l.length && l.charCodeAt(c) !== 58; ++c) ;
    if (c === l.length)
      l.indexOf("_") > 0 && (l = l.slice(0, l.indexOf("_"))), a[l] = f, a[l.toLowerCase()] = f;
    else {
      var h = (c === 5 && l.slice(0, 5) === "xmlns" ? "xmlns" : "") + l.slice(c + 1);
      if (a[h] && l.slice(c - 3, c) == "ext") continue;
      a[h] = f, a[h.toLowerCase()] = f;
    }
  }
  return a;
}
function qo(e, t, r) {
  for (var a = {}, n = 0, s = 0; n !== e.length && !((s = e.charCodeAt(n)) === 32 || s === 10 || s === 13); ++n) ;
  if (n === e.length) return a;
  var i = e.match(Z0), c = "", f = 0, o = "", l = "", p = 1;
  if (i) for (f = 0; f != i.length; ++f) {
    for (l = i[f].slice(1), s = 0; s != l.length && l.charCodeAt(s) !== 61; ++s) ;
    for (o = l.slice(0, s).trim(); l.charCodeAt(s + 1) == 32; ) ++s;
    p = (n = l.charCodeAt(s + 1)) == 34 || n == 39 ? 1 : 0, c = l.slice(s + 1 + p, l.length - p), o.indexOf("_") > 0 && (o = o.slice(0, o.indexOf("_"))), a[o] = c, a[o.toLowerCase()] = c;
  }
  return a;
}
function Gr(e) {
  return e.replace(Zo, "<$1");
}
var q0 = {
  "&quot;": '"',
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&amp;": "&"
}, Qo = /* @__PURE__ */ $n(q0), be = /* @__PURE__ */ (function() {
  var e = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/ig, t = /_x([\da-fA-F]{4})_/ig;
  function r(a) {
    var n = a + "", s = n.indexOf("<![CDATA[");
    if (s == -1) return n.replace(e, function(c, f) {
      return q0[c] || String.fromCharCode(parseInt(f, c.indexOf("x") > -1 ? 16 : 10)) || c;
    }).replace(t, function(c, f) {
      return String.fromCharCode(parseInt(f, 16));
    });
    var i = n.indexOf("]]>");
    return r(n.slice(0, s)) + n.slice(s + 9, i) + r(n.slice(i + 3));
  }
  return function(n, s) {
    var i = r(n);
    return s ? i.replace(/\r\n/g, `
`) : i;
  };
})(), el = /[&<>'"]/g, rl = /[\u0000-\u001f]/g;
function ra(e) {
  var t = e + "";
  return t.replace(el, function(r) {
    return Qo[r];
  }).replace(/\n/g, "<br/>").replace(rl, function(r) {
    return "&#x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + ";";
  });
}
var Ds = /* @__PURE__ */ (function() {
  var e = /&#(\d+);/g;
  function t(r, a) {
    return String.fromCharCode(parseInt(a, 10));
  }
  return function(a) {
    return a.replace(e, t);
  };
})();
function He(e) {
  switch (e) {
    case 1:
    case !0:
    case "1":
    case "true":
      return !0;
    case 0:
    case !1:
    case "0":
    case "false":
      return !1;
  }
  return !1;
}
function gn(e) {
  for (var t = "", r = 0, a = 0, n = 0, s = 0, i = 0, c = 0; r < e.length; ) {
    if (a = e.charCodeAt(r++), a < 128) {
      t += String.fromCharCode(a);
      continue;
    }
    if (n = e.charCodeAt(r++), a > 191 && a < 224) {
      i = (a & 31) << 6, i |= n & 63, t += String.fromCharCode(i);
      continue;
    }
    if (s = e.charCodeAt(r++), a < 240) {
      t += String.fromCharCode((a & 15) << 12 | (n & 63) << 6 | s & 63);
      continue;
    }
    i = e.charCodeAt(r++), c = ((a & 7) << 18 | (n & 63) << 12 | (s & 63) << 6 | i & 63) - 65536, t += String.fromCharCode(55296 + (c >>> 10 & 1023)), t += String.fromCharCode(56320 + (c & 1023));
  }
  return t;
}
function Rs(e) {
  var t = xt(2 * e.length), r, a, n = 1, s = 0, i = 0, c;
  for (a = 0; a < e.length; a += n)
    n = 1, (c = e.charCodeAt(a)) < 128 ? r = c : c < 224 ? (r = (c & 31) * 64 + (e.charCodeAt(a + 1) & 63), n = 2) : c < 240 ? (r = (c & 15) * 4096 + (e.charCodeAt(a + 1) & 63) * 64 + (e.charCodeAt(a + 2) & 63), n = 3) : (n = 4, r = (c & 7) * 262144 + (e.charCodeAt(a + 1) & 63) * 4096 + (e.charCodeAt(a + 2) & 63) * 64 + (e.charCodeAt(a + 3) & 63), r -= 65536, i = 55296 + (r >>> 10 & 1023), r = 56320 + (r & 1023)), i !== 0 && (t[s++] = i & 255, t[s++] = i >>> 8, i = 0), t[s++] = r % 256, t[s++] = r >>> 8;
  return t.slice(0, s).toString("ucs2");
}
function Is(e) {
  return gt(e, "binary").toString("utf8");
}
var Ra = "foo bar bazâð£", Ve = Ce && (/* @__PURE__ */ Is(Ra) == /* @__PURE__ */ gn(Ra) && Is || /* @__PURE__ */ Rs(Ra) == /* @__PURE__ */ gn(Ra) && Rs) || gn, ea = Ce ? function(e) {
  return gt(e, "utf8").toString("binary");
} : function(e) {
  for (var t = [], r = 0, a = 0, n = 0; r < e.length; )
    switch (a = e.charCodeAt(r++), !0) {
      case a < 128:
        t.push(String.fromCharCode(a));
        break;
      case a < 2048:
        t.push(String.fromCharCode(192 + (a >> 6))), t.push(String.fromCharCode(128 + (a & 63)));
        break;
      case (a >= 55296 && a < 57344):
        a -= 55296, n = e.charCodeAt(r++) - 56320 + (a << 10), t.push(String.fromCharCode(240 + (n >> 18 & 7))), t.push(String.fromCharCode(144 + (n >> 12 & 63))), t.push(String.fromCharCode(128 + (n >> 6 & 63))), t.push(String.fromCharCode(128 + (n & 63)));
        break;
      default:
        t.push(String.fromCharCode(224 + (a >> 12))), t.push(String.fromCharCode(128 + (a >> 6 & 63))), t.push(String.fromCharCode(128 + (a & 63)));
    }
  return t.join("");
}, Q0 = /* @__PURE__ */ (function() {
  var e = [
    ["nbsp", " "],
    ["middot", "·"],
    ["quot", '"'],
    ["apos", "'"],
    ["gt", ">"],
    ["lt", "<"],
    ["amp", "&"]
  ].map(function(t) {
    return [new RegExp("&" + t[0] + ";", "ig"), t[1]];
  });
  return function(r) {
    for (var a = r.replace(/^[\t\n\r ]+/, "").replace(/(^|[^\t\n\r ])[\t\n\r ]+$/, "$1").replace(/>\s+/g, ">").replace(/\b\s+</g, "<").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, `
`).replace(/<[^<>]*>/g, ""), n = 0; n < e.length; ++n) a = a.replace(e[n][0], e[n][1]);
    return a;
  };
})(), tl = /<\/?(?:vt:)?variant>/g, al = /<(?:vt:)([^<"'>]*)>([\s\S]*)</;
function Os(e, t) {
  var r = ue(e), a = z0(e, r.baseType) || [], n = [];
  if (a.length != r.size) {
    if (t.WTF) throw new Error("unexpected vector length " + a.length + " != " + r.size);
    return n;
  }
  return a.forEach(function(s) {
    var i = s.replace(tl, "").match(al);
    i && n.push({ v: Ve(i[2]), t: i[1] });
  }), n;
}
var nl = /(^\s|\s$|\n)/;
function sl(e) {
  return $r(e).map(function(t) {
    return " " + t + '="' + e[t] + '"';
  }).join("");
}
function il(e, t, r) {
  return "<" + e + (r != null ? sl(r) : "") + (t != null ? (t.match(nl) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">";
}
function nn(e) {
  if (Ce && /*::typeof Buffer !== "undefined" && d != null && d instanceof Buffer &&*/
  Buffer.isBuffer(e)) return e.toString("utf8");
  if (typeof e == "string") return e;
  if (typeof Uint8Array < "u" && e instanceof Uint8Array) return Ve(ct(Hn(e)));
  throw new Error("Bad input format: expected Buffer or string");
}
var nr = /<([\/]?)([^\s?><!\/:"]*:|)([^\s?<>:\/"]+)(?:\s+[^<>=?"'\s]+="[^"]*?")*\s*[\/]?>/mg, cl = {
  CT: "http://schemas.openxmlformats.org/package/2006/content-types"
}, fl = [
  "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  "http://purl.oclc.org/ooxml/spreadsheetml/main",
  "http://schemas.microsoft.com/office/excel/2006/main",
  "http://schemas.microsoft.com/office/excel/2006/2"
];
function ol(e, t) {
  for (var r = 1 - 2 * (e[t + 7] >>> 7), a = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15), n = e[t + 6] & 15, s = 5; s >= 0; --s) n = n * 256 + e[t + s];
  return a == 2047 ? n == 0 ? r * (1 / 0) : NaN : (a == 0 ? a = -1022 : (a -= 1023, n += Math.pow(2, 52)), r * Math.pow(2, a - 52) * n);
}
function ll(e, t, r) {
  var a = (t < 0 || 1 / t == -1 / 0 ? 1 : 0) << 7, n = 0, s = 0, i = a ? -t : t;
  isFinite(i) ? i == 0 ? n = s = 0 : (n = Math.floor(Math.log(i) / Math.LN2), s = i * Math.pow(2, 52 - n), n <= -1023 && (!isFinite(s) || s < Math.pow(2, 52)) ? n = -1022 : (s -= Math.pow(2, 52), n += 1023)) : (n = 2047, s = isNaN(t) ? 26985 : 0);
  for (var c = 0; c <= 5; ++c, s /= 256) e[r + c] = s & 255;
  e[r + 6] = (n & 15) << 4 | s & 15, e[r + 7] = n >> 4 | a;
}
var Ms = function(e) {
  for (var t = [], r = 10240, a = 0; a < e[0].length; ++a) if (e[0][a]) for (var n = 0, s = e[0][a].length; n < s; n += r) t.push.apply(t, e[0][a].slice(n, n + r));
  return t;
}, Ls = Ce ? function(e) {
  return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0].map(function(t) {
    return Buffer.isBuffer(t) ? t : gt(t);
  })) : Ms(e);
} : Ms, Bs = function(e, t, r) {
  for (var a = [], n = t; n < r; n += 2) a.push(String.fromCharCode(nt(e, n)));
  return a.join("").replace(br, "");
}, Kn = Ce ? function(e, t, r) {
  return !Buffer.isBuffer(e) || !xa ? Bs(e, t, r) : e.toString("utf16le", t, r).replace(br, "");
} : Bs, Us = function(e, t, r) {
  for (var a = [], n = t; n < t + r; ++n) a.push(("0" + e[n].toString(16)).slice(-2));
  return a.join("");
}, ei = Ce ? function(e, t, r) {
  return Buffer.isBuffer(e) ? e.toString("hex", t, t + r) : Us(e, t, r);
} : Us, Hs = function(e, t, r) {
  for (var a = [], n = t; n < r; n++) a.push(String.fromCharCode(Bt(e, n)));
  return a.join("");
}, Ta = Ce ? function(t, r, a) {
  return Buffer.isBuffer(t) ? t.toString("utf8", r, a) : Hs(t, r, a);
} : Hs, ri = function(e, t) {
  var r = Ir(e, t);
  return r > 0 ? Ta(e, t + 4, t + 4 + r - 1) : "";
}, ti = ri, ai = function(e, t) {
  var r = Ir(e, t);
  return r > 0 ? Ta(e, t + 4, t + 4 + r - 1) : "";
}, ni = ai, si = function(e, t) {
  var r = 2 * Ir(e, t);
  return r > 0 ? Ta(e, t + 4, t + 4 + r - 1) : "";
}, ii = si, ci = function(t, r) {
  var a = Ir(t, r);
  return a > 0 ? Kn(t, r + 4, r + 4 + a) : "";
}, fi = ci, oi = function(e, t) {
  var r = Ir(e, t);
  return r > 0 ? Ta(e, t + 4, t + 4 + r) : "";
}, li = oi, hi = function(e, t) {
  return ol(e, t);
}, Ya = hi, ui = function(t) {
  return Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
};
Ce && (ti = function(t, r) {
  if (!Buffer.isBuffer(t)) return ri(t, r);
  var a = t.readUInt32LE(r);
  return a > 0 ? t.toString("utf8", r + 4, r + 4 + a - 1) : "";
}, ni = function(t, r) {
  if (!Buffer.isBuffer(t)) return ai(t, r);
  var a = t.readUInt32LE(r);
  return a > 0 ? t.toString("utf8", r + 4, r + 4 + a - 1) : "";
}, ii = function(t, r) {
  if (!Buffer.isBuffer(t) || !xa) return si(t, r);
  var a = 2 * t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + a - 1);
}, fi = function(t, r) {
  if (!Buffer.isBuffer(t) || !xa) return ci(t, r);
  var a = t.readUInt32LE(r);
  return t.toString("utf16le", r + 4, r + 4 + a);
}, li = function(t, r) {
  if (!Buffer.isBuffer(t)) return oi(t, r);
  var a = t.readUInt32LE(r);
  return t.toString("utf8", r + 4, r + 4 + a);
}, Ya = function(t, r) {
  return Buffer.isBuffer(t) ? t.readDoubleLE(r) : hi(t, r);
}, ui = function(t) {
  return Buffer.isBuffer(t) || Array.isArray(t) || typeof Uint8Array < "u" && t instanceof Uint8Array;
});
var Bt = function(e, t) {
  return e[t];
}, nt = function(e, t) {
  return e[t + 1] * 256 + e[t];
}, hl = function(e, t) {
  var r = e[t + 1] * 256 + e[t];
  return r < 32768 ? r : (65535 - r + 1) * -1;
}, Ir = function(e, t) {
  return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
}, wt = function(e, t) {
  return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t];
}, ul = function(e, t) {
  return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3];
};
function ta(e, t) {
  var r = "", a, n, s = [], i, c, f, o;
  switch (t) {
    case "dbcs":
      if (o = this.l, Ce && Buffer.isBuffer(this) && xa) r = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else for (f = 0; f < e; ++f)
        r += String.fromCharCode(nt(this, o)), o += 2;
      e *= 2;
      break;
    case "utf8":
      r = Ta(this, this.l, this.l + e);
      break;
    case "utf16le":
      e *= 2, r = Kn(this, this.l, this.l + e);
      break;
    case "wstr":
      return ta.call(this, e, "dbcs");
    /* [MS-OLEDS] 2.1.4 LengthPrefixedAnsiString */
    case "lpstr-ansi":
      r = ti(this, this.l), e = 4 + Ir(this, this.l);
      break;
    case "lpstr-cp":
      r = ni(this, this.l), e = 4 + Ir(this, this.l);
      break;
    /* [MS-OLEDS] 2.1.5 LengthPrefixedUnicodeString */
    case "lpwstr":
      r = ii(this, this.l), e = 4 + 2 * Ir(this, this.l);
      break;
    /* [MS-OFFCRYPTO] 2.1.2 Length-Prefixed Padded Unicode String (UNICODE-LP-P4) */
    case "lpp4":
      e = 4 + Ir(this, this.l), r = fi(this, this.l), e & 2 && (e += 2);
      break;
    /* [MS-OFFCRYPTO] 2.1.3 Length-Prefixed UTF-8 String (UTF-8-LP-P4) */
    case "8lpp4":
      e = 4 + Ir(this, this.l), r = li(this, this.l), e & 3 && (e += 4 - (e & 3));
      break;
    case "cstr":
      for (e = 0, r = ""; (i = Bt(this, this.l + e++)) !== 0; ) s.push(Da(i));
      r = s.join("");
      break;
    case "_wstr":
      for (e = 0, r = ""; (i = nt(this, this.l + e)) !== 0; )
        s.push(Da(i)), e += 2;
      e += 2, r = s.join("");
      break;
    /* sbcs and dbcs support continue records in the SST way TODO codepages */
    case "dbcs-cont":
      for (r = "", o = this.l, f = 0; f < e; ++f) {
        if (this.lens && this.lens.indexOf(o) !== -1)
          return i = Bt(this, o), this.l = o + 1, c = ta.call(this, e - f, i ? "dbcs-cont" : "sbcs-cont"), s.join("") + c;
        s.push(Da(nt(this, o))), o += 2;
      }
      r = s.join(""), e *= 2;
      break;
    case "cpstr":
    /* falls through */
    case "sbcs-cont":
      for (r = "", o = this.l, f = 0; f != e; ++f) {
        if (this.lens && this.lens.indexOf(o) !== -1)
          return i = Bt(this, o), this.l = o + 1, c = ta.call(this, e - f, i ? "dbcs-cont" : "sbcs-cont"), s.join("") + c;
        s.push(Da(Bt(this, o))), o += 1;
      }
      r = s.join("");
      break;
    default:
      switch (e) {
        case 1:
          return a = Bt(this, this.l), this.l++, a;
        case 2:
          return a = (t === "i" ? hl : nt)(this, this.l), this.l += 2, a;
        case 4:
        case -4:
          return t === "i" || (this[this.l + 3] & 128) === 0 ? (a = (e > 0 ? wt : ul)(this, this.l), this.l += 4, a) : (n = Ir(this, this.l), this.l += 4, n);
        case 8:
        case -8:
          if (t === "f")
            return e == 8 ? n = Ya(this, this.l) : n = Ya([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0), this.l += 8, n;
          e = 8;
        /* falls through */
        case 16:
          r = ei(this, this.l, e);
          break;
      }
  }
  return this.l += e, r;
}
var dl = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255, e[r + 2] = t >>> 16 & 255, e[r + 3] = t >>> 24 & 255;
}, xl = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >> 8 & 255, e[r + 2] = t >> 16 & 255, e[r + 3] = t >> 24 & 255;
}, pl = function(e, t, r) {
  e[r] = t & 255, e[r + 1] = t >>> 8 & 255;
};
function ml(e, t, r) {
  var a = 0, n = 0;
  if (r === "dbcs") {
    for (n = 0; n != t.length; ++n) pl(this, t.charCodeAt(n), this.l + 2 * n);
    a = 2 * t.length;
  } else if (r === "sbcs" || r == "cpstr") {
    for (t = t.replace(/[^\x00-\x7F]/g, "_"), n = 0; n != t.length; ++n) this[this.l + n] = t.charCodeAt(n) & 255;
    a = t.length;
  } else if (r === "hex") {
    for (; n < e; ++n)
      this[this.l++] = parseInt(t.slice(2 * n, 2 * n + 2), 16) || 0;
    return this;
  } else if (r === "utf16le") {
    var s = Math.min(this.l + e, this.length);
    for (n = 0; n < Math.min(t.length, e); ++n) {
      var i = t.charCodeAt(n);
      this[this.l++] = i & 255, this[this.l++] = i >> 8;
    }
    for (; this.l < s; ) this[this.l++] = 0;
    return this;
  } else switch (e) {
    case 1:
      a = 1, this[this.l] = t & 255;
      break;
    case 2:
      a = 2, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255;
      break;
    case 3:
      a = 3, this[this.l] = t & 255, t >>>= 8, this[this.l + 1] = t & 255, t >>>= 8, this[this.l + 2] = t & 255;
      break;
    case 4:
      a = 4, dl(this, t, this.l);
      break;
    case 8:
      if (a = 8, r === "f") {
        ll(this, t, this.l);
        break;
      }
    /* falls through */
    case 16:
      break;
    case -4:
      a = 4, xl(this, t, this.l);
      break;
  }
  return this.l += a, this;
}
function di(e, t) {
  var r = ei(this, this.l, e.length >> 1);
  if (r !== e) throw new Error(t + "Expected " + e + " saw " + r);
  this.l += e.length >> 1;
}
function cr(e, t) {
  e.l = t, e.read_shift = /*::(*/
  ta, e.chk = di, e.write_shift = ml;
}
function wr(e, t) {
  e.l += t;
}
function sr(e) {
  var t = xt(e);
  return cr(t, 0), t;
}
function ft(e, t, r) {
  if (e) {
    var a, n, s;
    cr(e, e.l || 0);
    for (var i = e.length, c = 0, f = 0; e.l < i; ) {
      c = e.read_shift(1), c & 128 && (c = (c & 127) + ((e.read_shift(1) & 127) << 7));
      var o = rn[c] || rn[65535];
      for (a = e.read_shift(1), s = a & 127, n = 1; n < 4 && a & 128; ++n) s += ((a = e.read_shift(1)) & 127) << 7 * n;
      f = e.l + s;
      var l = o.f && o.f(e, s, r);
      if (e.l = f, t(l, o, c)) return;
    }
  }
}
function Cn() {
  var e = [], t = Ce ? 16384 : 2048;
  Ce && sr(t).copy;
  var r = function(l) {
    var p = sr(l);
    return cr(p, 0), p;
  }, a = r(t), n = function() {
    a && (a.l && (a.length > a.l && (a = a.slice(0, a.l), a.l = a.length), a.length > 0 && e.push(a)), a = null);
  }, s = function(l) {
    return a && l < a.length - a.l ? a : (n(), a = r(Math.max(l + 1, t)));
  }, i = function() {
    return n(), ht(e);
  }, c = function() {
    return n(), e;
  }, f = function(l) {
    n(), a = l, a.l == null && (a.l = a.length), s(t);
  };
  return { next: s, push: f, end: i, _bufs: e, end2: c };
}
function aa(e, t, r) {
  var a = ir(e);
  if (t.s ? (a.cRel && (a.c += t.s.c), a.rRel && (a.r += t.s.r)) : (a.cRel && (a.c += t.c), a.rRel && (a.r += t.r)), !r || r.biff < 12) {
    for (; a.c >= 256; ) a.c -= 256;
    for (; a.r >= 65536; ) a.r -= 65536;
  }
  return a;
}
function Ws(e, t, r) {
  var a = ir(e);
  return a.s = aa(a.s, t.s, r), a.e = aa(a.e, t.s, r), a;
}
function na(e, t) {
  if (e.cRel && e.c < 0)
    for (e = ir(e); e.c < 0; ) e.c += t > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = ir(e); e.r < 0; ) e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
  var r = Oe(e);
  return !e.cRel && e.cRel != null && (r = kl(r)), !e.rRel && e.rRel != null && (r = gl(r)), r;
}
function vn(e, t) {
  return e.s.r == 0 && !e.s.rRel && e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel ? (e.s.cRel ? "" : "$") + Me(e.s.c) + ":" + (e.e.cRel ? "" : "$") + Me(e.e.c) : e.s.c == 0 && !e.s.cRel && e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel ? (e.s.rRel ? "" : "$") + We(e.s.r) + ":" + (e.e.rRel ? "" : "$") + We(e.e.r) : na(e.s, t.biff) + ":" + na(e.e, t.biff);
}
function jn(e) {
  return parseInt(vl(e), 10) - 1;
}
function We(e) {
  return "" + (e + 1);
}
function gl(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function vl(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function Yn(e) {
  for (var t = _l(e), r = 0, a = 0; a !== t.length; ++a) r = 26 * r + t.charCodeAt(a) - 64;
  return r - 1;
}
function Me(e) {
  if (e < 0) throw new Error("invalid column " + e);
  var t = "";
  for (++e; e; e = Math.floor((e - 1) / 26)) t = String.fromCharCode((e - 1) % 26 + 65) + t;
  return t;
}
function kl(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function _l(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function El(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function _r(e) {
  for (var t = 0, r = 0, a = 0; a < e.length; ++a) {
    var n = e.charCodeAt(a);
    n >= 48 && n <= 57 ? t = 10 * t + (n - 48) : n >= 65 && n <= 90 && (r = 26 * r + (n - 64));
  }
  return { c: r - 1, r: t - 1 };
}
function Oe(e) {
  for (var t = e.c + 1, r = ""; t; t = (t - 1) / 26 | 0) r = String.fromCharCode((t - 1) % 26 + 65) + r;
  return r + (e.r + 1);
}
function Dt(e) {
  var t = e.indexOf(":");
  return t == -1 ? { s: _r(e), e: _r(e) } : { s: _r(e.slice(0, t)), e: _r(e.slice(t + 1)) };
}
function Pe(e, t) {
  return typeof t > "u" || typeof t == "number" ? Pe(e.s, e.e) : (typeof e != "string" && (e = Oe(e)), typeof t != "string" && (t = Oe(t)), e == t ? e : e + ":" + t);
}
function wl(e, t) {
  if (!e && !(t && t.biff <= 5 && t.biff >= 2)) throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e.replace(/'/g, "''") + "'" : e;
}
function qe(e) {
  var t = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } }, r = 0, a = 0, n = 0, s = e.length;
  for (r = 0; a < s && !((n = e.charCodeAt(a) - 64) < 1 || n > 26); ++a)
    r = 26 * r + n;
  for (t.s.c = --r, r = 0; a < s && !((n = e.charCodeAt(a) - 48) < 0 || n > 9); ++a)
    r = 10 * r + n;
  if (t.s.r = --r, a === s || n != 10)
    return t.e.c = t.s.c, t.e.r = t.s.r, t;
  for (++a, r = 0; a != s && !((n = e.charCodeAt(a) - 64) < 1 || n > 26); ++a)
    r = 26 * r + n;
  for (t.e.c = --r, r = 0; a != s && !((n = e.charCodeAt(a) - 48) < 0 || n > 9); ++a)
    r = 10 * r + n;
  return t.e.r = --r, t;
}
function Vs(e, t) {
  var r = e.t == "d" && t instanceof Date;
  if (e.z != null) try {
    return e.w = Lr(e.z, r ? fr(t) : t);
  } catch {
  }
  try {
    return e.w = Lr((e.XF || {}).numFmtId || (r ? 14 : 0), r ? fr(t) : t);
  } catch {
    return "" + t;
  }
}
function pt(e, t, r) {
  return e == null || e.t == null || e.t == "z" ? "" : e.w !== void 0 ? e.w : (e.t == "d" && !e.z && r && r.dateNF && (e.z = r.dateNF), e.t == "e" ? Pr[e.v] || e.v : t == null ? Vs(e, e.v) : Vs(e, t));
}
function vt(e, t) {
  var r = t && t.sheet ? t.sheet : "Sheet1", a = {};
  return a[r] = e, { SheetNames: [r], Sheets: a };
}
function Tl(e) {
  var t = {}, r = e || {};
  return r.dense && (t["!data"] = []), t;
}
function xi(e, t, r) {
  var a = r || {}, n = e ? e["!data"] != null : a.dense, s = e || (n ? { "!data": [] } : {});
  n && !s["!data"] && (s["!data"] = []);
  var i = 0, c = 0;
  if (s && a.origin != null)
    if (typeof a.origin == "number") i = a.origin;
    else {
      var f = typeof a.origin == "string" ? _r(a.origin) : a.origin;
      i = f.r, c = f.c;
    }
  var o = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (s["!ref"]) {
    var l = qe(s["!ref"]);
    o.s.c = l.s.c, o.s.r = l.s.r, o.e.c = Math.max(o.e.c, l.e.c), o.e.r = Math.max(o.e.r, l.e.r), i == -1 && (o.e.r = i = s["!ref"] ? l.e.r + 1 : 0);
  } else
    o.s.c = o.e.c = o.s.r = o.e.r = 0;
  for (var p = [], u = !1, h = 0; h != t.length; ++h)
    if (t[h]) {
      if (!Array.isArray(t[h])) throw new Error("aoa_to_sheet expects an array of arrays");
      var m = i + h;
      n && (s["!data"][m] || (s["!data"][m] = []), p = s["!data"][m]);
      for (var k = t[h], x = 0; x != k.length; ++x)
        if (!(typeof k[x] > "u")) {
          var d = { v: k[x], t: "" }, _ = c + x;
          if (o.s.r > m && (o.s.r = m), o.s.c > _ && (o.s.c = _), o.e.r < m && (o.e.r = m), o.e.c < _ && (o.e.c = _), u = !0, k[x] && typeof k[x] == "object" && !Array.isArray(k[x]) && !(k[x] instanceof Date)) d = k[x];
          else if (Array.isArray(d.v) && (d.f = k[x][1], d.v = d.v[0]), d.v === null)
            if (d.f) d.t = "n";
            else if (a.nullError)
              d.t = "e", d.v = 0;
            else if (a.sheetStubs) d.t = "z";
            else continue;
          else typeof d.v == "number" ? isFinite(d.v) ? d.t = "n" : isNaN(d.v) ? (d.t = "e", d.v = 15) : (d.t = "e", d.v = 7) : typeof d.v == "boolean" ? d.t = "b" : d.v instanceof Date ? (d.z = a.dateNF || _e[14], a.UTC || (d.v = an(d.v)), a.cellDates ? (d.t = "d", d.w = Lr(d.z, fr(d.v, a.date1904))) : (d.t = "n", d.v = fr(d.v, a.date1904), d.w = Lr(d.z, d.v))) : d.t = "s";
          if (n)
            p[_] && p[_].z && (d.z = p[_].z), p[_] = d;
          else {
            var g = Me(_) + (m + 1);
            s[g] && s[g].z && (d.z = s[g].z), s[g] = d;
          }
        }
    }
  return u && o.s.c < 104e5 && (s["!ref"] = Pe(o)), s;
}
function zt(e, t) {
  return xi(null, e, t);
}
function Al(e) {
  return e.read_shift(4, "i");
}
function Er(e) {
  var t = e.read_shift(4);
  return t === 0 ? "" : e.read_shift(t, "dbcs");
}
function Fl(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function Jn(e, t) {
  var r = e.l, a = e.read_shift(1), n = Er(e), s = [], i = { t: n, h: n };
  if ((a & 1) !== 0) {
    for (var c = e.read_shift(4), f = 0; f != c; ++f) s.push(Fl(e));
    i.r = s;
  } else i.r = [{ ich: 0, ifnt: 0 }];
  return e.l = r + t, i;
}
var Sl = Jn;
function Xr(e) {
  var t = e.read_shift(4), r = e.read_shift(2);
  return r += e.read_shift(1) << 16, e.l++, { c: t, iStyleRef: r };
}
function Rt(e) {
  var t = e.read_shift(2);
  return t += e.read_shift(1) << 16, e.l++, { c: -1, iStyleRef: t };
}
var yl = Er;
function sn(e) {
  var t = e.read_shift(4);
  return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}
var Cl = Er, bn = sn;
function cn(e) {
  var t = e.slice(e.l, e.l + 4), r = t[0] & 1, a = t[0] & 2;
  e.l += 4;
  var n = a === 0 ? Ya([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : wt(t, 0) >> 2;
  return r ? n / 100 : n;
}
function pi(e) {
  var t = { s: {}, e: {} };
  return t.s.r = e.read_shift(4), t.e.r = e.read_shift(4), t.s.c = e.read_shift(4), t.e.c = e.read_shift(4), t;
}
var It = pi;
function kr(e) {
  if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function bl(e) {
  var t = {}, r = e.read_shift(1), a = r >>> 1, n = e.read_shift(1), s = e.read_shift(2, "i"), i = e.read_shift(1), c = e.read_shift(1), f = e.read_shift(1);
  switch (e.l++, a) {
    case 0:
      t.auto = 1;
      break;
    case 1:
      t.index = n;
      var o = Ft[n];
      o && (t.rgb = va(o));
      break;
    case 2:
      t.rgb = va([i, c, f]);
      break;
    case 3:
      t.theme = n;
      break;
  }
  return s != 0 && (t.tint = s > 0 ? s / 32767 : s / 32768), t;
}
function Pl(e) {
  var t = e.read_shift(1);
  e.l++;
  var r = {
    fBold: t & 1,
    fItalic: t & 2,
    fUnderline: t & 4,
    fStrikeout: t & 8,
    fOutline: t & 16,
    fShadow: t & 32,
    fCondense: t & 64,
    fExtend: t & 128
  };
  return r;
}
function mi(e, t) {
  var r = { 2: "BITMAP", 3: "METAFILEPICT", 8: "DIB", 14: "ENHMETAFILE" }, a = e.read_shift(4);
  switch (a) {
    case 0:
      return "";
    case 4294967295:
    case 4294967294:
      return r[e.read_shift(4)] || "";
  }
  if (a > 400) throw new Error("Unsupported Clipboard: " + a.toString(16));
  return e.l -= 4, e.read_shift(0, t == 1 ? "lpstr" : "lpwstr");
}
function Nl(e) {
  return mi(e, 1);
}
function Dl(e) {
  return mi(e, 2);
}
var Zn = 2, Cr = 3, Ia = 11, $s = 12, Ja = 19, Oa = 64, Rl = 65, Il = 71, Ol = 4108, Ml = 4126, or = 80, gi = 81, Ll = [or, gi], Bl = {
  1: { n: "CodePage", t: Zn },
  2: { n: "Category", t: or },
  3: { n: "PresentationFormat", t: or },
  4: { n: "ByteCount", t: Cr },
  5: { n: "LineCount", t: Cr },
  6: { n: "ParagraphCount", t: Cr },
  7: { n: "SlideCount", t: Cr },
  8: { n: "NoteCount", t: Cr },
  9: { n: "HiddenCount", t: Cr },
  10: { n: "MultimediaClipCount", t: Cr },
  11: { n: "ScaleCrop", t: Ia },
  12: {
    n: "HeadingPairs",
    t: Ol
    /* VT_VECTOR | VT_VARIANT */
  },
  13: {
    n: "TitlesOfParts",
    t: Ml
    /* VT_VECTOR | VT_LPSTR */
  },
  14: { n: "Manager", t: or },
  15: { n: "Company", t: or },
  16: { n: "LinksUpToDate", t: Ia },
  17: { n: "CharacterCount", t: Cr },
  19: { n: "SharedDoc", t: Ia },
  22: { n: "HyperlinksChanged", t: Ia },
  23: { n: "AppVersion", t: Cr, p: "version" },
  24: { n: "DigSig", t: Rl },
  26: { n: "ContentType", t: or },
  27: { n: "ContentStatus", t: or },
  28: { n: "Language", t: or },
  29: { n: "Version", t: or },
  255: {},
  /* [MS-OLEPS] 2.18 */
  2147483648: { n: "Locale", t: Ja },
  2147483651: { n: "Behavior", t: Ja },
  1919054434: {}
}, Ul = {
  1: { n: "CodePage", t: Zn },
  2: { n: "Title", t: or },
  3: { n: "Subject", t: or },
  4: { n: "Author", t: or },
  5: { n: "Keywords", t: or },
  6: { n: "Comments", t: or },
  7: { n: "Template", t: or },
  8: { n: "LastAuthor", t: or },
  9: { n: "RevNumber", t: or },
  10: { n: "EditTime", t: Oa },
  11: { n: "LastPrinted", t: Oa },
  12: { n: "CreatedDate", t: Oa },
  13: { n: "ModifiedDate", t: Oa },
  14: { n: "PageCount", t: Cr },
  15: { n: "WordCount", t: Cr },
  16: { n: "CharCount", t: Cr },
  17: { n: "Thumbnail", t: Il },
  18: { n: "Application", t: or },
  19: { n: "DocSecurity", t: Cr },
  255: {},
  /* [MS-OLEPS] 2.18 */
  2147483648: { n: "Locale", t: Ja },
  2147483651: { n: "Behavior", t: Ja },
  1919054434: {}
}, Gs = {
  1: "US",
  // United States
  2: "CA",
  // Canada
  3: "",
  // Latin America (except Brazil)
  7: "RU",
  // Russia
  20: "EG",
  // Egypt
  30: "GR",
  // Greece
  31: "NL",
  // Netherlands
  32: "BE",
  // Belgium
  33: "FR",
  // France
  34: "ES",
  // Spain
  36: "HU",
  // Hungary
  39: "IT",
  // Italy
  41: "CH",
  // Switzerland
  43: "AT",
  // Austria
  44: "GB",
  // United Kingdom
  45: "DK",
  // Denmark
  46: "SE",
  // Sweden
  47: "NO",
  // Norway
  48: "PL",
  // Poland
  49: "DE",
  // Germany
  52: "MX",
  // Mexico
  55: "BR",
  // Brazil
  61: "AU",
  // Australia
  64: "NZ",
  // New Zealand
  66: "TH",
  // Thailand
  81: "JP",
  // Japan
  82: "KR",
  // Korea
  84: "VN",
  // Viet Nam
  86: "CN",
  // China
  90: "TR",
  // Turkey
  105: "JS",
  // Ramastan
  213: "DZ",
  // Algeria
  216: "MA",
  // Morocco
  218: "LY",
  // Libya
  351: "PT",
  // Portugal
  354: "IS",
  // Iceland
  358: "FI",
  // Finland
  420: "CZ",
  // Czech Republic
  886: "TW",
  // Taiwan
  961: "LB",
  // Lebanon
  962: "JO",
  // Jordan
  963: "SY",
  // Syria
  964: "IQ",
  // Iraq
  965: "KW",
  // Kuwait
  966: "SA",
  // Saudi Arabia
  971: "AE",
  // United Arab Emirates
  972: "IL",
  // Israel
  974: "QA",
  // Qatar
  981: "IR",
  // Iran
  65535: "US"
  // United States
}, Hl = [
  null,
  "solid",
  "mediumGray",
  "darkGray",
  "lightGray",
  "darkHorizontal",
  "darkVertical",
  "darkDown",
  "darkUp",
  "darkGrid",
  "darkTrellis",
  "lightHorizontal",
  "lightVertical",
  "lightDown",
  "lightUp",
  "lightGrid",
  "lightTrellis",
  "gray125",
  "gray0625"
];
function Wl(e) {
  return e.map(function(t) {
    return [t >> 16 & 255, t >> 8 & 255, t & 255];
  });
}
var Vl = /* @__PURE__ */ Wl([
  /* Color Constants */
  0,
  16777215,
  16711680,
  65280,
  255,
  16776960,
  16711935,
  65535,
  /* Overridable Defaults */
  0,
  16777215,
  16711680,
  65280,
  255,
  16776960,
  16711935,
  65535,
  8388608,
  32768,
  128,
  8421376,
  8388736,
  32896,
  12632256,
  8421504,
  10066431,
  10040166,
  16777164,
  13434879,
  6684774,
  16744576,
  26316,
  13421823,
  128,
  16711935,
  16776960,
  65535,
  8388736,
  8388608,
  32896,
  255,
  52479,
  13434879,
  13434828,
  16777113,
  10079487,
  16751052,
  13408767,
  16764057,
  3368703,
  3394764,
  10079232,
  16763904,
  16750848,
  16737792,
  6710937,
  9868950,
  13158,
  3381606,
  13056,
  3355392,
  10040064,
  10040166,
  3355545,
  3355443,
  /* Other entries to appease BIFF8/12 */
  0,
  /* 0x40 icvForeground ?? */
  16777215,
  /* 0x41 icvBackground ?? */
  0,
  /* 0x42 icvFrame ?? */
  0,
  /* 0x43 icv3D ?? */
  0,
  /* 0x44 icv3DText ?? */
  0,
  /* 0x45 icv3DHilite ?? */
  0,
  /* 0x46 icv3DShadow ?? */
  0,
  /* 0x47 icvHilite ?? */
  0,
  /* 0x48 icvCtlText ?? */
  0,
  /* 0x49 icvCtlScrl ?? */
  0,
  /* 0x4A icvCtlInv ?? */
  0,
  /* 0x4B icvCtlBody ?? */
  0,
  /* 0x4C icvCtlFrame ?? */
  0,
  /* 0x4D icvCtlFore ?? */
  0,
  /* 0x4E icvCtlBack ?? */
  0,
  /* 0x4F icvCtlNeutral */
  0,
  /* 0x50 icvInfoBk ?? */
  0
  /* 0x51 icvInfoText ?? */
]), Ft = /* @__PURE__ */ ir(Vl), Pr = {
  0: "#NULL!",
  7: "#DIV/0!",
  15: "#VALUE!",
  23: "#REF!",
  29: "#NAME?",
  36: "#NUM!",
  42: "#N/A",
  43: "#GETTING_DATA",
  255: "#WTF?"
}, ur = {
  "#NULL!": 0,
  "#DIV/0!": 7,
  "#VALUE!": 15,
  "#REF!": 23,
  "#NAME?": 29,
  "#NUM!": 36,
  "#N/A": 42,
  "#GETTING_DATA": 43,
  "#WTF?": 255
}, vi = [
  "_xlnm.Consolidate_Area",
  "_xlnm.Auto_Open",
  "_xlnm.Auto_Close",
  "_xlnm.Extract",
  "_xlnm.Database",
  "_xlnm.Criteria",
  "_xlnm.Print_Area",
  "_xlnm.Print_Titles",
  "_xlnm.Recorder",
  "_xlnm.Data_Form",
  "_xlnm.Auto_Activate",
  "_xlnm.Auto_Deactivate",
  "_xlnm.Sheet_Title",
  "_xlnm._FilterDatabase"
], Xs = {
  /* Workbook */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.macroEnabled.main+xml": "workbooks",
  "application/vnd.ms-excel.sheet.binary.macroEnabled.main": "workbooks",
  "application/vnd.ms-excel.addin.macroEnabled.main+xml": "workbooks",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": "workbooks",
  /* Worksheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": "sheets",
  "application/vnd.ms-excel.worksheet": "sheets",
  "application/vnd.ms-excel.binIndexWs": "TODO",
  /* Binary Index */
  /* Chartsheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": "charts",
  "application/vnd.ms-excel.chartsheet": "charts",
  /* Macrosheet */
  "application/vnd.ms-excel.macrosheet+xml": "macros",
  "application/vnd.ms-excel.macrosheet": "macros",
  "application/vnd.ms-excel.intlmacrosheet": "TODO",
  "application/vnd.ms-excel.binIndexMs": "TODO",
  /* Binary Index */
  /* Dialogsheet */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": "dialogs",
  "application/vnd.ms-excel.dialogsheet": "dialogs",
  /* Shared Strings */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml": "strs",
  "application/vnd.ms-excel.sharedStrings": "strs",
  /* Styles */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": "styles",
  "application/vnd.ms-excel.styles": "styles",
  /* File Properties */
  "application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
  /* Custom Data Properties */
  "application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
  /* Comments */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": "comments",
  "application/vnd.ms-excel.comments": "comments",
  "application/vnd.ms-excel.threadedcomments+xml": "threadedcomments",
  "application/vnd.ms-excel.person+xml": "people",
  /* Metadata (Stock/Geography and Dynamic Array) */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "metadata",
  "application/vnd.ms-excel.sheetMetadata": "metadata",
  /* PivotTable */
  "application/vnd.ms-excel.pivotTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "TODO",
  /* Chart Objects */
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
  /* Chart Colors */
  "application/vnd.ms-office.chartcolorstyle+xml": "TODO",
  /* Chart Style */
  "application/vnd.ms-office.chartstyle+xml": "TODO",
  /* Chart Advanced */
  "application/vnd.ms-office.chartex+xml": "TODO",
  /* Calculation Chain */
  "application/vnd.ms-excel.calcChain": "calcchains",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
  /* Printer Settings */
  "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
  /* ActiveX */
  "application/vnd.ms-office.activeX": "TODO",
  "application/vnd.ms-office.activeX+xml": "TODO",
  /* Custom Toolbars */
  "application/vnd.ms-excel.attachedToolbars": "TODO",
  /* External Data Connections */
  "application/vnd.ms-excel.connections": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "TODO",
  /* External Links */
  "application/vnd.ms-excel.externalLink": "links",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
  /* PivotCache */
  "application/vnd.ms-excel.pivotCacheDefinition": "TODO",
  "application/vnd.ms-excel.pivotCacheRecords": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "TODO",
  /* Query Table */
  "application/vnd.ms-excel.queryTable": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
  /* Shared Workbook */
  "application/vnd.ms-excel.userNames": "TODO",
  "application/vnd.ms-excel.revisionHeaders": "TODO",
  "application/vnd.ms-excel.revisionLog": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
  /* Single Cell Table */
  "application/vnd.ms-excel.tableSingleCells": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
  /* Slicer */
  "application/vnd.ms-excel.slicer": "TODO",
  "application/vnd.ms-excel.slicerCache": "TODO",
  "application/vnd.ms-excel.slicer+xml": "TODO",
  "application/vnd.ms-excel.slicerCache+xml": "TODO",
  /* Sort Map */
  "application/vnd.ms-excel.wsSortMap": "TODO",
  /* Table */
  "application/vnd.ms-excel.table": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "TODO",
  /* Themes */
  "application/vnd.openxmlformats-officedocument.theme+xml": "themes",
  /* Theme Override */
  "application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
  /* Timeline */
  "application/vnd.ms-excel.Timeline+xml": "TODO",
  /* verify */
  "application/vnd.ms-excel.TimelineCache+xml": "TODO",
  /* verify */
  /* VBA */
  "application/vnd.ms-office.vbaProject": "vba",
  "application/vnd.ms-office.vbaProjectSignature": "TODO",
  /* Volatile Dependencies */
  "application/vnd.ms-office.volatileDependencies": "TODO",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
  /* Control Properties */
  "application/vnd.ms-excel.controlproperties+xml": "TODO",
  /* Data Model */
  "application/vnd.openxmlformats-officedocument.model+data": "TODO",
  /* Survey */
  "application/vnd.ms-excel.Survey+xml": "TODO",
  /* Drawing */
  "application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
  "application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
  /* VML */
  "application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
  "application/vnd.openxmlformats-package.relationships+xml": "rels",
  "application/vnd.openxmlformats-officedocument.oleObject": "TODO",
  /* Image */
  "image/png": "TODO",
  sheet: "js"
};
function $l() {
  return {
    workbooks: [],
    sheets: [],
    charts: [],
    dialogs: [],
    macros: [],
    rels: [],
    strs: [],
    comments: [],
    threadedcomments: [],
    links: [],
    coreprops: [],
    extprops: [],
    custprops: [],
    themes: [],
    styles: [],
    calcchains: [],
    vba: [],
    drawings: [],
    metadata: [],
    people: [],
    TODO: [],
    xmlns: ""
  };
}
function Gl(e) {
  var t = $l();
  if (!e || !e.match) return t;
  var r = {};
  if ((e.match(pr) || []).forEach(function(a) {
    var n = ue(a);
    switch (n[0].replace(Jo, "<")) {
      case "<?xml":
        break;
      case "<Types":
        t.xmlns = n["xmlns" + (n[0].match(/<(\w+):/) || ["", ""])[1]];
        break;
      case "<Default":
        r[n.Extension.toLowerCase()] = n.ContentType;
        break;
      case "<Override":
        t[Xs[n.ContentType]] !== void 0 && t[Xs[n.ContentType]].push(n.PartName);
        break;
    }
  }), t.xmlns !== cl.CT) throw new Error("Unknown Namespace: " + t.xmlns);
  return t.calcchain = t.calcchains.length > 0 ? t.calcchains[0] : "", t.sst = t.strs.length > 0 ? t.strs[0] : "", t.style = t.styles.length > 0 ? t.styles[0] : "", t.defaults = r, delete t.calcchains, t;
}
var Ht = {
  WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
  VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
  XPATH: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",
  XMISS: "http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",
  XLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink",
  CXML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml",
  CXMLP: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps",
  CMNT: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
  CORE_PROPS: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
  EXT_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
  CUST_PROPS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",
  SST: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
  STY: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
  THEME: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
  CHART: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",
  CHARTEX: "http://schemas.microsoft.com/office/2014/relationships/chartEx",
  CS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet",
  WS: [
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
    "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"
  ],
  DS: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet",
  MS: "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet",
  IMG: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image",
  DRAW: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
  XLMETA: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata",
  TCMNT: "http://schemas.microsoft.com/office/2017/10/relationships/threadedComment",
  PEOPLE: "http://schemas.microsoft.com/office/2017/10/relationships/person",
  CONN: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/connections",
  VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
};
function Pn(e) {
  var t = e.lastIndexOf("/");
  return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}
function sa(e, t) {
  var r = { "!id": {} };
  if (!e) return r;
  t.charAt(0) !== "/" && (t = "/" + t);
  var a = {};
  return (e.match(pr) || []).forEach(function(n) {
    var s = ue(n);
    if (s[0] === "<Relationship") {
      var i = {};
      i.Type = s.Type, i.Target = be(s.Target), i.Id = s.Id, s.TargetMode && (i.TargetMode = s.TargetMode);
      var c = s.TargetMode === "External" ? s.Target : Ut(s.Target, t);
      r[c] = i, a[s.Id] = i;
    }
  }), r["!id"] = a, r;
}
var Xl = "application/vnd.oasis.opendocument.spreadsheet";
function zl(e, t) {
  for (var r = nn(e), a, n; a = nr.exec(r); )
    switch (a[3]) {
      case "manifest":
        break;
      case "file-entry":
        if (n = ue(a[0], !1), n.path == "/" && n.type !== Xl)
          throw new Error("This OpenDocument is not a spreadsheet");
        break;
      case "encryption-data":
      case "algorithm":
      case "start-key-generation":
      case "key-derivation":
        throw new Error("Unsupported ODS Encryption");
      default:
        if (t && t.WTF)
          throw a;
    }
}
var zs = [
  ["cp:category", "Category"],
  ["cp:contentStatus", "ContentStatus"],
  ["cp:keywords", "Keywords"],
  ["cp:lastModifiedBy", "LastAuthor"],
  ["cp:lastPrinted", "LastPrinted"],
  ["cp:revision", "RevNumber"],
  ["cp:version", "Version"],
  ["dc:creator", "Author"],
  ["dc:description", "Comments"],
  ["dc:identifier", "Identifier"],
  ["dc:language", "Language"],
  ["dc:subject", "Subject"],
  ["dc:title", "Title"],
  ["dcterms:created", "CreatedDate", "date"],
  ["dcterms:modified", "ModifiedDate", "date"]
];
function ki(e) {
  var t = {};
  e = Ve(e);
  for (var r = 0; r < zs.length; ++r) {
    var a = zs[r], n = At(e, a[0]);
    n != null && n.length > 0 && (t[a[1]] = be(n[1])), a[2] === "date" && t[a[1]] && (t[a[1]] = xr(t[a[1]]));
  }
  return t;
}
var Kl = [
  ["Application", "Application", "string"],
  ["AppVersion", "AppVersion", "string"],
  ["Company", "Company", "string"],
  ["DocSecurity", "DocSecurity", "string"],
  ["Manager", "Manager", "string"],
  ["HyperlinksChanged", "HyperlinksChanged", "bool"],
  ["SharedDoc", "SharedDoc", "bool"],
  ["LinksUpToDate", "LinksUpToDate", "bool"],
  ["ScaleCrop", "ScaleCrop", "bool"],
  ["HeadingPairs", "HeadingPairs", "raw"],
  ["TitlesOfParts", "TitlesOfParts", "raw"]
];
function _i(e, t, r, a) {
  var n = [];
  if (typeof e == "string") n = Os(e, a);
  else for (var s = 0; s < e.length; ++s) n = n.concat(e[s].map(function(l) {
    return { v: l };
  }));
  var i = typeof t == "string" ? Os(t, a).map(function(l) {
    return l.v;
  }) : t, c = 0, f = 0;
  if (i.length > 0) for (var o = 0; o !== n.length; o += 2) {
    switch (f = +n[o + 1].v, n[o].v) {
      case "Worksheets":
      case "工作表":
      case "Листы":
      case "أوراق العمل":
      case "ワークシート":
      case "גליונות עבודה":
      case "Arbeitsblätter":
      case "Çalışma Sayfaları":
      case "Feuilles de calcul":
      case "Fogli di lavoro":
      case "Folhas de cálculo":
      case "Planilhas":
      case "Regneark":
      case "Hojas de cálculo":
      case "Werkbladen":
        r.Worksheets = f, r.SheetNames = i.slice(c, c + f);
        break;
      case "Named Ranges":
      case "Rangos con nombre":
      case "名前付き一覧":
      case "Benannte Bereiche":
      case "Navngivne områder":
        r.NamedRanges = f, r.DefinedNames = i.slice(c, c + f);
        break;
      case "Charts":
      case "Diagramme":
        r.Chartsheets = f, r.ChartNames = i.slice(c, c + f);
        break;
    }
    c += f;
  }
}
function jl(e, t, r) {
  var a = {};
  return t || (t = {}), e = Ve(e), Kl.forEach(function(n) {
    var s = (hr(e, n[0]) || [])[1];
    switch (n[2]) {
      case "string":
        s && (t[n[1]] = be(s));
        break;
      case "bool":
        t[n[1]] = s === "true";
        break;
      case "raw":
        var i = At(e, n[0]);
        i && i.length > 0 && (a[n[1]] = i[1]);
        break;
    }
  }), a.HeadingPairs && a.TitlesOfParts && _i(a.HeadingPairs, a.TitlesOfParts, t, r), t;
}
var Yl = /<[^<>]+>[^<]*/g;
function Jl(e, t) {
  var r = {}, a = "", n = e.match(Yl);
  if (n) for (var s = 0; s != n.length; ++s) {
    var i = n[s], c = ue(i);
    switch (Gr(c[0])) {
      case "<?xml":
        break;
      case "<Properties":
        break;
      case "<property":
        a = be(c.name);
        break;
      case "</property>":
        a = null;
        break;
      default:
        if (i.indexOf("<vt:") === 0) {
          var f = i.split(">"), o = f[0].slice(4), l = f[1];
          switch (o) {
            case "lpstr":
            case "bstr":
            case "lpwstr":
              r[a] = be(l);
              break;
            case "bool":
              r[a] = He(l);
              break;
            case "i1":
            case "i2":
            case "i4":
            case "i8":
            case "int":
            case "uint":
              r[a] = parseInt(l, 10);
              break;
            case "r4":
            case "r8":
            case "decimal":
              r[a] = parseFloat(l);
              break;
            case "filetime":
            case "date":
              r[a] = xr(l);
              break;
            case "cy":
            case "error":
              r[a] = be(l);
              break;
            default:
              if (o.slice(-1) == "/") break;
              t.WTF && typeof console < "u" && console.warn("Unexpected", i, o, f);
          }
        } else if (i.slice(0, 2) !== "</") {
          if (t.WTF) throw new Error(i);
        }
    }
  }
  return r;
}
var Zl = {
  Title: "Title",
  Subject: "Subject",
  Author: "Author",
  Keywords: "Keywords",
  Comments: "Description",
  LastAuthor: "LastAuthor",
  RevNumber: "Revision",
  Application: "AppName",
  /* TotalTime: 'TotalTime', */
  LastPrinted: "LastPrinted",
  CreatedDate: "Created",
  ModifiedDate: "LastSaved",
  /* Pages */
  /* Words */
  /* Characters */
  Category: "Category",
  /* PresentationFormat */
  Manager: "Manager",
  Company: "Company",
  /* Guid */
  /* HyperlinkBase */
  /* Bytes */
  /* Lines */
  /* Paragraphs */
  /* CharactersWithSpaces */
  AppVersion: "Version",
  ContentStatus: "ContentStatus",
  /* NOTE: missing from schema */
  Identifier: "Identifier",
  /* NOTE: missing from schema */
  Language: "Language"
  /* NOTE: missing from schema */
}, kn;
function ql(e, t, r) {
  kn || (kn = $n(Zl)), t = kn[t] || t, e[t] = r;
}
function qn(e) {
  var t = e.read_shift(4), r = e.read_shift(4);
  return new Date((r / 1e7 * Math.pow(2, 32) + t / 1e7 - 11644473600) * 1e3).toISOString().replace(/\.000/, "");
}
function Ql(e, t, r) {
  var a = e.l, n = e.read_shift(0, "lpstr-cp");
  if (r) for (; e.l - a & 3; ) ++e.l;
  return n;
}
function eh(e, t, r) {
  var a = e.read_shift(0, "lpwstr");
  return a;
}
function Ei(e, t, r) {
  return t === 31 ? eh(e) : Ql(e, t, r);
}
function ia(e, t, r) {
  return Ei(e, t, r === !1 ? 0 : 4);
}
function rh(e, t) {
  if (!t) throw new Error("VtUnalignedString must have positive length");
  return Ei(e, t, 0);
}
function th(e) {
  for (var t = e.read_shift(4), r = [], a = 0; a != t; ++a) {
    var n = e.l;
    r[a] = e.read_shift(0, "lpwstr").replace(br, ""), e.l - n & 2 && (e.l += 2);
  }
  return r;
}
function ah(e) {
  for (var t = e.read_shift(4), r = [], a = 0; a != t; ++a) r[a] = e.read_shift(0, "lpstr-cp").replace(br, "");
  return r;
}
function nh(e) {
  var t = e.l, r = Za(e, gi);
  e[e.l] == 0 && e[e.l + 1] == 0 && e.l - t & 2 && (e.l += 2);
  var a = Za(e, Cr);
  return [r, a];
}
function sh(e) {
  for (var t = e.read_shift(4), r = [], a = 0; a < t / 2; ++a) r.push(nh(e));
  return r;
}
function Ks(e, t) {
  for (var r = e.read_shift(4), a = {}, n = 0; n != r; ++n) {
    var s = e.read_shift(4), i = e.read_shift(4);
    a[s] = e.read_shift(i, t === 1200 ? "utf16le" : "utf8").replace(br, "").replace(Qt, "!"), t === 1200 && i % 2 && (e.l += 2);
  }
  return e.l & 3 && (e.l = e.l >> 3 << 2), a;
}
function wi(e) {
  var t = e.read_shift(4), r = e.slice(e.l, e.l + t);
  return e.l += t, (t & 3) > 0 && (e.l += 4 - (t & 3) & 3), r;
}
function ih(e) {
  var t = {};
  return t.Size = e.read_shift(4), e.l += t.Size + 3 - (t.Size - 1) % 4, t;
}
function Za(e, t, r) {
  var a = e.read_shift(2), n, s = r || {};
  if (e.l += 2, t !== $s && a !== t && Ll.indexOf(t) === -1 && !((t & 65534) == 4126 && (a & 65534) == 4126))
    throw new Error("Expected type " + t + " saw " + a);
  switch (t === $s ? a : t) {
    case 2:
      return n = e.read_shift(2, "i"), s.raw || (e.l += 2), n;
    case 3:
      return n = e.read_shift(4, "i"), n;
    case 11:
      return e.read_shift(4) !== 0;
    case 19:
      return n = e.read_shift(4), n;
    case 30:
      e.l += 4, val = ia(e, e[e.l - 4]).replace(/(^|[^\u0000])\u0000+$/, "$1");
      break;
    case 31:
      e.l += 4, val = ia(e, e[e.l - 4]).replace(/(^|[^\u0000])\u0000+$/, "$1");
      break;
    case 64:
      return qn(e);
    case 65:
      return wi(e);
    case 71:
      return ih(e);
    case 80:
      return ia(e, a, !s.raw).replace(br, "");
    case 81:
      return rh(
        e,
        a
        /*, 4*/
      ).replace(br, "");
    case 4108:
      return sh(e);
    case 4126:
    case 4127:
      return a == 4127 ? th(e) : ah(e);
    default:
      throw new Error("TypedPropertyValue unrecognized type " + t + " " + a);
  }
}
function js(e, t) {
  var r = e.l, a = e.read_shift(4), n = e.read_shift(4), s = [], i = 0, c = 0, f = -1, o = {};
  for (i = 0; i != n; ++i) {
    var l = e.read_shift(4), p = e.read_shift(4);
    s[i] = [l, p + r];
  }
  s.sort(function(_, g) {
    return _[1] - g[1];
  });
  var u = {};
  for (i = 0; i != n; ++i) {
    if (e.l !== s[i][1]) {
      var h = !0;
      if (i > 0 && t) switch (t[s[i - 1][0]].t) {
        case 2:
          e.l + 2 === s[i][1] && (e.l += 2, h = !1);
          break;
        case 80:
          e.l <= s[i][1] && (e.l = s[i][1], h = !1);
          break;
        case 4108:
          e.l <= s[i][1] && (e.l = s[i][1], h = !1);
          break;
      }
      if ((!t || i == 0) && e.l <= s[i][1] && (h = !1, e.l = s[i][1]), h) throw new Error("Read Error: Expected address " + s[i][1] + " at " + e.l + " :" + i);
    }
    if (t) {
      if (s[i][0] == 0 && s.length > i + 1 && s[i][1] == s[i + 1][1]) continue;
      var m = t[s[i][0]];
      if (u[m.n] = Za(e, m.t, { raw: !0 }), m.p === "version" && (u[m.n] = String(u[m.n] >> 16) + "." + ("0000" + String(u[m.n] & 65535)).slice(-4)), m.n == "CodePage") switch (u[m.n]) {
        case 0:
          u[m.n] = 1252;
        /* falls through */
        case 874:
        case 932:
        case 936:
        case 949:
        case 950:
        case 1250:
        case 1251:
        case 1253:
        case 1254:
        case 1255:
        case 1256:
        case 1257:
        case 1258:
        case 1e4:
        case 1200:
        case 1201:
        case 1252:
        case 65e3:
        case -536:
        case 65001:
        case -535:
          jr(c = u[m.n] >>> 0 & 65535);
          break;
        default:
          throw new Error("Unsupported CodePage: " + u[m.n]);
      }
    } else if (s[i][0] === 1) {
      if (c = u.CodePage = Za(e, Zn), jr(c), f !== -1) {
        var k = e.l;
        e.l = s[f][1], o = Ks(e, c), e.l = k;
      }
    } else if (s[i][0] === 0) {
      if (c === 0) {
        f = i, e.l = s[i + 1][1];
        continue;
      }
      o = Ks(e, c);
    } else {
      var x = o[s[i][0]], d;
      switch (e[e.l]) {
        case 65:
          e.l += 4, d = wi(e);
          break;
        case 30:
          e.l += 4, d = ia(e, e[e.l - 4]).replace(/(^|[^\u0000])\u0000+$/, "$1");
          break;
        case 31:
          e.l += 4, d = ia(e, e[e.l - 4]).replace(/(^|[^\u0000])\u0000+$/, "$1");
          break;
        case 3:
          e.l += 4, d = e.read_shift(4, "i");
          break;
        case 19:
          e.l += 4, d = e.read_shift(4);
          break;
        case 5:
          e.l += 4, d = e.read_shift(8, "f");
          break;
        case 11:
          e.l += 4, d = Je(e, 4);
          break;
        case 64:
          e.l += 4, d = xr(qn(e));
          break;
        default:
          throw new Error("unparsed value: " + e[e.l]);
      }
      u[x] = d;
    }
  }
  return e.l = r + a, u;
}
function Ys(e, t, r) {
  var a = e.content;
  if (!a) return {};
  cr(a, 0);
  var n, s, i, c, f = 0;
  a.chk("feff", "Byte Order: "), a.read_shift(2);
  var o = a.read_shift(4), l = a.read_shift(16);
  if (l !== Re.utils.consts.HEADER_CLSID && l !== r) throw new Error("Bad PropertySet CLSID " + l);
  if (n = a.read_shift(4), n !== 1 && n !== 2) throw new Error("Unrecognized #Sets: " + n);
  if (s = a.read_shift(16), c = a.read_shift(4), n === 1 && c !== a.l) throw new Error("Length mismatch: " + c + " !== " + a.l);
  n === 2 && (i = a.read_shift(16), f = a.read_shift(4));
  var p = js(a, t), u = { SystemIdentifier: o };
  for (var h in p) u[h] = p[h];
  if (u.FMTID = s, n === 1) return u;
  if (f - a.l == 2 && (a.l += 2), a.l !== f) throw new Error("Length mismatch 2: " + a.l + " !== " + f);
  var m;
  try {
    m = js(a, null);
  } catch {
  }
  for (h in m) u[h] = m[h];
  return u.FMTID = [s, i], u;
}
function ot(e, t) {
  return e.read_shift(t), null;
}
function ch(e, t, r) {
  for (var a = [], n = e.l + t; e.l < n; ) a.push(r(e, n - e.l));
  if (n !== e.l) throw new Error("Slurp error");
  return a;
}
function Je(e, t) {
  return e.read_shift(t) === 1;
}
function Ye(e) {
  return e.read_shift(2, "u");
}
function Ti(e, t) {
  return ch(e, t, Ye);
}
function Ai(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return r === 1 ? t : t === 1;
}
function Gt(e, t, r) {
  var a = e.read_shift(r && r.biff >= 12 ? 2 : 1), n = "sbcs-cont", s = Vr;
  if (r && r.biff >= 8 && (Vr = 1200), !r || r.biff == 8) {
    var i = e.read_shift(1);
    i && (n = "dbcs-cont");
  } else r.biff == 12 && (n = "wstr");
  r.biff >= 2 && r.biff <= 5 && (n = "cpstr");
  var c = a ? e.read_shift(a, n) : "";
  return Vr = s, c;
}
function fh(e) {
  var t = Vr;
  Vr = 1200;
  var r = e.read_shift(2), a = e.read_shift(1), n = a & 4, s = a & 8, i = 1 + (a & 1), c = 0, f, o = {};
  s && (c = e.read_shift(2)), n && (f = e.read_shift(4));
  var l = i == 2 ? "dbcs-cont" : "sbcs-cont", p = r === 0 ? "" : e.read_shift(r, l);
  return s && (e.l += 4 * c), n && (e.l += f), o.t = p, s || (o.raw = "<t>" + o.t + "</t>", o.r = o.t), Vr = t, o;
}
function Pt(e, t, r) {
  var a;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return e.read_shift(t, "cpstr");
    if (r.biff >= 12) return e.read_shift(t, "dbcs-cont");
  }
  var n = e.read_shift(1);
  return n === 0 ? a = e.read_shift(t, "sbcs-cont") : a = e.read_shift(t, "dbcs-cont"), a;
}
function Aa(e, t, r) {
  var a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return a === 0 ? (e.l++, "") : Pt(e, a, r);
}
function Ot(e, t, r) {
  if (r.biff > 5) return Aa(e, t, r);
  var a = e.read_shift(1);
  return a === 0 ? (e.l++, "") : e.read_shift(a, r.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function oh(e) {
  var t = e.read_shift(1);
  e.l++;
  var r = e.read_shift(2);
  return e.l += 2, [t, r];
}
function lh(e) {
  var t = e.read_shift(4), r = e.l, a = !1;
  t > 24 && (e.l += t - 24, e.read_shift(16) === "795881f43b1d7f48af2c825dc4852763" && (a = !0), e.l = r);
  var n = e.read_shift((a ? t - 24 : t) >> 1, "utf16le").replace(br, "");
  return a && (e.l += 24), n;
}
function hh(e) {
  for (var t = e.read_shift(2), r = ""; t-- > 0; ) r += "../";
  var a = e.read_shift(0, "lpstr-ansi");
  if (e.l += 2, e.read_shift(2) != 57005) throw new Error("Bad FileMoniker");
  var n = e.read_shift(4);
  if (n === 0) return r + a.replace(/\\/g, "/");
  var s = e.read_shift(4);
  if (e.read_shift(2) != 3) throw new Error("Bad FileMoniker");
  var i = e.read_shift(s >> 1, "utf16le").replace(br, "");
  return r + i;
}
function uh(e, t) {
  var r = e.read_shift(16);
  switch (r) {
    case "e0c9ea79f9bace118c8200aa004ba90b":
      return lh(e);
    case "0303000000000000c000000000000046":
      return hh(e);
    default:
      throw new Error("Unsupported Moniker " + r);
  }
}
function Ma(e) {
  var t = e.read_shift(4), r = t > 0 ? e.read_shift(t, "utf16le").replace(br, "") : "";
  return r;
}
function dh(e, t) {
  var r = e.l + t, a = e.read_shift(4);
  if (a !== 2) throw new Error("Unrecognized streamVersion: " + a);
  var n = e.read_shift(2);
  e.l += 2;
  var s, i, c, f, o = "", l, p;
  n & 16 && (s = Ma(e, r - e.l)), n & 128 && (i = Ma(e, r - e.l)), (n & 257) === 257 && (c = Ma(e, r - e.l)), (n & 257) === 1 && (f = uh(e, r - e.l)), n & 8 && (o = Ma(e, r - e.l)), n & 32 && (l = e.read_shift(16)), n & 64 && (p = qn(
    e
    /*, 8*/
  )), e.l = r;
  var u = i || c || f || "";
  u && o && (u += "#" + o), u || (u = "#" + o), n & 2 && u.charAt(0) == "/" && u.charAt(1) != "/" && (u = "file://" + u);
  var h = { Target: u };
  return l && (h.guid = l), p && (h.time = p), s && (h.Tooltip = s), h;
}
function Fi(e) {
  var t = e.read_shift(1), r = e.read_shift(1), a = e.read_shift(1), n = e.read_shift(1);
  return [t, r, a, n];
}
function Si(e, t) {
  var r = Fi(e);
  return r[3] = 0, r;
}
function Zr(e, t, r) {
  var a = e.read_shift(2), n = e.read_shift(2), s = { r: a, c: n, ixfe: 0 };
  if (r && r.biff == 2 || t == 7) {
    var i = e.read_shift(1);
    s.ixfe = i & 63, e.l += 2;
  } else s.ixfe = e.read_shift(2);
  return s;
}
function xh(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return e.l += 8, { type: t, flags: r };
}
function ph(e, t, r) {
  return t === 0 ? "" : Ot(e, t, r);
}
function mh(e, t, r) {
  var a = r.biff > 8 ? 4 : 2, n = e.read_shift(a), s = e.read_shift(a, "i"), i = e.read_shift(a, "i");
  return [n, s, i];
}
function yi(e) {
  var t = e.read_shift(2), r = cn(e);
  return [t, r];
}
function gh(e, t, r) {
  e.l += 4, t -= 4;
  var a = e.l + t, n = Gt(e, t, r), s = e.read_shift(2);
  if (a -= e.l, s !== a) throw new Error("Malformed AddinUdf: padding = " + a + " != " + s);
  return e.l += s, n;
}
function fn(e) {
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(2), n = e.read_shift(2);
  return { s: { c: a, r: t }, e: { c: n, r } };
}
function Ci(e) {
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(1), n = e.read_shift(1);
  return { s: { c: a, r: t }, e: { c: n, r } };
}
var vh = Ci;
function bi(e) {
  e.l += 4;
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(2);
  return e.l += 12, [r, t, a];
}
function kh(e) {
  var t = {};
  return e.l += 4, e.l += 16, t.fSharedNote = e.read_shift(2), e.l += 4, t;
}
function _h(e) {
  var t = {};
  return e.l += 4, e.cf = e.read_shift(2), t;
}
function gr(e) {
  e.l += 2, e.l += e.read_shift(2);
}
var Eh = {
  0: gr,
  /* FtEnd */
  4: gr,
  /* FtMacro */
  5: gr,
  /* FtButton */
  6: gr,
  /* FtGmo */
  7: _h,
  /* FtCf */
  8: gr,
  /* FtPioGrbit */
  9: gr,
  /* FtPictFmla */
  10: gr,
  /* FtCbls */
  11: gr,
  /* FtRbo */
  12: gr,
  /* FtSbs */
  13: kh,
  /* FtNts */
  14: gr,
  /* FtSbsFmla */
  15: gr,
  /* FtGboData */
  16: gr,
  /* FtEdoData */
  17: gr,
  /* FtRboData */
  18: gr,
  /* FtCblsData */
  19: gr,
  /* FtLbsData */
  20: gr,
  /* FtCblsFmla */
  21: bi
};
function wh(e, t) {
  for (var r = e.l + t, a = []; e.l < r; ) {
    var n = e.read_shift(2);
    e.l -= 2;
    try {
      a[n] = Eh[n](e, r - e.l);
    } catch {
      return e.l = r, a;
    }
  }
  return e.l != r && (e.l = r), a;
}
function La(e, t) {
  var r = { BIFFVer: 0, dt: 0 };
  switch (r.BIFFVer = e.read_shift(2), t -= 2, t >= 2 && (r.dt = e.read_shift(2), e.l -= 2), r.BIFFVer) {
    case 1536:
    /* BIFF8 */
    case 1280:
    /* BIFF5 */
    case 1024:
    /* BIFF4 */
    case 768:
    /* BIFF3 */
    case 512:
    /* BIFF2 */
    case 2:
    case 7:
      break;
    default:
      if (t > 6) throw new Error("Unexpected BIFF Ver " + r.BIFFVer);
  }
  return e.read_shift(t), r;
}
function Th(e, t) {
  return t === 0 || e.read_shift(2), 1200;
}
function Ah(e, t, r) {
  if (r.enc)
    return e.l += t, "";
  var a = e.l, n = Ot(e, 0, r);
  return e.read_shift(t + a - e.l), n;
}
function Fh(e, t, r) {
  var a = r && r.biff == 8 || t == 2 ? e.read_shift(2) : (e.l += t, 0);
  return { fDialog: a & 16, fBelow: a & 64, fRight: a & 128 };
}
function Sh(e, t, r) {
  var a = "";
  if (r.biff == 4)
    return a = Gt(e, 0, r), a.length === 0 && (a = "Sheet1"), { name: a };
  var n = e.read_shift(4), s = e.read_shift(1) & 3, i = e.read_shift(1);
  switch (i) {
    case 0:
      i = "Worksheet";
      break;
    case 1:
      i = "Macrosheet";
      break;
    case 2:
      i = "Chartsheet";
      break;
    case 6:
      i = "VBAModule";
      break;
  }
  return a = Gt(e, 0, r), a.length === 0 && (a = "Sheet1"), { pos: n, hs: s, dt: i, name: a };
}
function yh(e, t) {
  for (var r = e.l + t, a = e.read_shift(4), n = e.read_shift(4), s = [], i = 0; i != n && e.l < r; ++i)
    s.push(fh(e));
  return s.Count = a, s.Unique = n, s;
}
function Ch(e, t) {
  var r = {};
  return r.dsst = e.read_shift(2), e.l += t - 2, r;
}
function bh(e) {
  var t = {};
  t.r = e.read_shift(2), t.c = e.read_shift(2), t.cnt = e.read_shift(2) - t.c;
  var r = e.read_shift(2);
  e.l += 4;
  var a = e.read_shift(1);
  return e.l += 3, a & 7 && (t.level = a & 7), a & 32 && (t.hidden = !0), a & 64 && (t.hpt = r / 20), t;
}
function Ph(e) {
  var t = xh(e);
  if (t.type != 2211) throw new Error("Invalid Future Record " + t.type);
  var r = e.read_shift(4);
  return r !== 0;
}
function Nh(e) {
  return e.read_shift(2), e.read_shift(4);
}
function Js(e, t, r) {
  var a = 0;
  r && r.biff == 2 || (a = e.read_shift(2));
  var n = e.read_shift(2);
  r && r.biff == 2 && (a = 1 - (n >> 15), n &= 32767);
  var s = { Unsynced: a & 1, DyZero: (a & 2) >> 1, ExAsc: (a & 4) >> 2, ExDsc: (a & 8) >> 3 };
  return [s, n];
}
function Dh(e) {
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(2), n = e.read_shift(2), s = e.read_shift(2), i = e.read_shift(2), c = e.read_shift(2), f = e.read_shift(2), o = e.read_shift(2);
  return {
    Pos: [t, r],
    Dim: [a, n],
    Flags: s,
    CurTab: i,
    FirstTab: c,
    Selected: f,
    TabRatio: o
  };
}
function Rh(e, t, r) {
  if (r && r.biff >= 2 && r.biff < 5) return {};
  var a = e.read_shift(2);
  return { RTL: a & 64 };
}
function Ih() {
}
function Oh(e, t, r) {
  var a = {
    dyHeight: e.read_shift(2),
    fl: e.read_shift(2)
  };
  switch (r && r.biff || 8) {
    case 2:
      break;
    case 3:
    case 4:
      e.l += 2;
      break;
    default:
      e.l += 10;
      break;
  }
  return a.name = Gt(e, 0, r), a;
}
function Mh(e, t, r) {
  var a = Zr(e, t, r);
  return a.isst = e.read_shift(4), a;
}
function Lh(e, t, r) {
  r.biffguess && r.biff == 2 && (r.biff = 5);
  var a = e.l + t, n = Zr(e, t, r), s = Aa(e, a - e.l, r);
  return n.val = s, n;
}
function Bh(e, t, r) {
  var a = e.read_shift(2), n = Ot(e, 0, r);
  return [a, n];
}
var Uh = Ot;
function Zs(e, t, r) {
  var a = e.l + t, n = r.biff == 8 || !r.biff ? 4 : 2, s = e.read_shift(n), i = e.read_shift(n), c = e.read_shift(2), f = e.read_shift(2);
  return e.l = a, { s: { r: s, c }, e: { r: i, c: f } };
}
function Hh(e) {
  var t = e.read_shift(2), r = e.read_shift(2), a = yi(e);
  return { r: t, c: r, ixfe: a[0], rknum: a[1] };
}
function Wh(e, t) {
  for (var r = e.l + t - 2, a = e.read_shift(2), n = e.read_shift(2), s = []; e.l < r; ) s.push(yi(e));
  if (e.l !== r) throw new Error("MulRK read error");
  var i = e.read_shift(2);
  if (s.length != i - n + 1) throw new Error("MulRK length mismatch");
  return { r: a, c: n, C: i, rkrec: s };
}
function Vh(e, t) {
  for (var r = e.l + t - 2, a = e.read_shift(2), n = e.read_shift(2), s = []; e.l < r; ) s.push(e.read_shift(2));
  if (e.l !== r) throw new Error("MulBlank read error");
  var i = e.read_shift(2);
  if (s.length != i - n + 1) throw new Error("MulBlank length mismatch");
  return { r: a, c: n, C: i, ixfe: s };
}
function $h(e, t, r, a) {
  var n = {}, s = e.read_shift(4), i = e.read_shift(4), c = e.read_shift(4), f = e.read_shift(2);
  return n.patternType = Hl[c >> 26], a.cellStyles && (n.alc = s & 7, n.fWrap = s >> 3 & 1, n.alcV = s >> 4 & 7, n.fJustLast = s >> 7 & 1, n.trot = s >> 8 & 255, n.cIndent = s >> 16 & 15, n.fShrinkToFit = s >> 20 & 1, n.iReadOrder = s >> 22 & 2, n.fAtrNum = s >> 26 & 1, n.fAtrFnt = s >> 27 & 1, n.fAtrAlc = s >> 28 & 1, n.fAtrBdr = s >> 29 & 1, n.fAtrPat = s >> 30 & 1, n.fAtrProt = s >> 31 & 1, n.dgLeft = i & 15, n.dgRight = i >> 4 & 15, n.dgTop = i >> 8 & 15, n.dgBottom = i >> 12 & 15, n.icvLeft = i >> 16 & 127, n.icvRight = i >> 23 & 127, n.grbitDiag = i >> 30 & 3, n.icvTop = c & 127, n.icvBottom = c >> 7 & 127, n.icvDiag = c >> 14 & 127, n.dgDiag = c >> 21 & 15, n.icvFore = f & 127, n.icvBack = f >> 7 & 127, n.fsxButton = f >> 14 & 1), n;
}
function Gh(e, t, r) {
  var a = {};
  return a.ifnt = e.read_shift(2), a.numFmtId = e.read_shift(2), a.flags = e.read_shift(2), a.fStyle = a.flags >> 2 & 1, t -= 6, a.data = $h(e, t, a.fStyle, r), a;
}
function Xh(e) {
  var t = {};
  return t.ifnt = e.read_shift(1), e.l++, t.flags = e.read_shift(1), t.numFmtId = t.flags & 63, t.flags >>= 6, t.fStyle = 0, t.data = {}, t;
}
function zh(e) {
  var t = {};
  return t.ifnt = e.read_shift(1), t.numFmtId = e.read_shift(1), t.flags = e.read_shift(2), t.fStyle = t.flags >> 2 & 1, t.data = {}, t;
}
function Kh(e) {
  var t = {};
  return t.ifnt = e.read_shift(1), t.numFmtId = e.read_shift(1), t.flags = e.read_shift(2), t.fStyle = t.flags >> 2 & 1, t.data = {}, t;
}
function jh(e) {
  e.l += 4;
  var t = [e.read_shift(2), e.read_shift(2)];
  if (t[0] !== 0 && t[0]--, t[1] !== 0 && t[1]--, t[0] > 7 || t[1] > 7) throw new Error("Bad Gutters: " + t.join("|"));
  return t;
}
function Yh(e, t, r) {
  var a = Zr(e, 6, r), n = Ai(e);
  return a.val = n, a.t = n === !0 || n === !1 ? "b" : "e", a;
}
function Jh(e, t, r) {
  r.biffguess && r.biff == 2 && (r.biff = 5);
  var a = Zr(e, 6, r), n = kr(e);
  return a.val = n, a;
}
var qs = ph;
function Zh(e, t, r) {
  var a = e.l + t, n = e.read_shift(2), s = e.read_shift(2);
  if (r.sbcch = s, s == 1025 || s == 14849) return [s, n];
  if (s < 1 || s > 255) throw new Error("Unexpected SupBook type: " + s);
  for (var i = Pt(e, s), c = []; a > e.l; ) c.push(Aa(e));
  return [s, n, i, c];
}
function Qs(e, t, r) {
  var a = e.read_shift(2), n, s = {
    fBuiltIn: a & 1,
    fWantAdvise: a >>> 1 & 1,
    fWantPict: a >>> 2 & 1,
    fOle: a >>> 3 & 1,
    fOleLink: a >>> 4 & 1,
    cf: a >>> 5 & 1023,
    fIcon: a >>> 15 & 1
  };
  return r.sbcch === 14849 && (n = gh(e, t - 2, r)), s.body = n || e.read_shift(t - 2), typeof n == "string" && (s.Name = n), s;
}
function e0(e, t, r) {
  var a = e.l + t, n = e.read_shift(2), s = e.read_shift(1), i = e.read_shift(1), c = e.read_shift(r && r.biff == 2 ? 1 : 2), f = 0;
  (!r || r.biff >= 5) && (r.biff != 5 && (e.l += 2), f = e.read_shift(2), r.biff == 5 && (e.l += 2), e.l += 4);
  var o = Pt(e, i, r);
  n & 32 && (o = vi[o.charCodeAt(0)]);
  var l = a - e.l;
  r && r.biff == 2 && --l;
  var p = a == e.l || c === 0 || !(l > 0) ? [] : Sx(e, l, r, c);
  return {
    chKey: s,
    Name: o,
    itab: f,
    rgce: p
  };
}
function Pi(e, t, r) {
  if (r.biff < 8 || !(r.biff > 8) && t == e[e.l] + (e[e.l + 1] == 3 ? 1 : 0) + 1) return r0(e, t, r);
  for (var a = [], n = e.l + t, s = e.read_shift(r.biff > 8 ? 4 : 2); s-- !== 0; ) a.push(mh(e, r.biff > 8 ? 12 : 6, r));
  if (e.l != n) throw new Error("Bad ExternSheet: " + e.l + " != " + n);
  return a;
}
function r0(e, t, r) {
  e[e.l + 1] == 3 && e[e.l]++;
  var a = Gt(e, t, r);
  return a.charCodeAt(0) == 3 ? a.slice(1) : a;
}
function qh(e, t, r) {
  if (r.biff < 8) {
    e.l += t;
    return;
  }
  var a = e.read_shift(2), n = e.read_shift(2), s = Pt(e, a, r), i = Pt(e, n, r);
  return [s, i];
}
function Qh(e, t, r) {
  var a = Ci(e);
  e.l++;
  var n = e.read_shift(1);
  return t -= 8, [yx(e, t, r), n, a];
}
function t0(e, t, r) {
  var a = vh(e);
  switch (r.biff) {
    case 2:
      e.l++, t -= 7;
      break;
    case 3:
    case 4:
      e.l += 2, t -= 8;
      break;
    default:
      e.l += 6, t -= 12;
  }
  return [a, Ax(e, t, r)];
}
function eu(e) {
  var t = e.read_shift(4) !== 0, r = e.read_shift(4) !== 0, a = e.read_shift(4);
  return [t, r, a];
}
function ru(e, t, r) {
  var a = e.read_shift(2), n = e.read_shift(2), s = e.read_shift(2), i = e.read_shift(2), c = Ot(e, 0, r);
  return [{ r: a, c: n }, c, i, s];
}
function tu(e, t, r) {
  if (r && r.biff < 8) {
    var a = e.read_shift(2), n = e.read_shift(2);
    if (a == 65535 || a == -1) return;
    var s = e.read_shift(2), i = e.read_shift(Math.min(s, 2048), "cpstr");
    return [{ r: a, c: n }, i];
  }
  return ru(e, t, r);
}
function au(e, t) {
  for (var r = [], a = e.read_shift(2); a--; ) r.push(fn(e));
  return r;
}
function nu(e, t, r) {
  if (r && r.biff < 8) return iu(e, t, r);
  var a = bi(e), n = wh(e, t - 22, a[1]);
  return { cmo: a, ft: n };
}
var su = {
  8: function(e, t) {
    var r = e.l + t;
    e.l += 10;
    var a = e.read_shift(2);
    e.l += 4, e.l += 2, e.l += 2, e.l += 2, e.l += 4;
    var n = e.read_shift(1);
    return e.l += n, e.l = r, { fmt: a };
  }
};
function iu(e, t, r) {
  e.l += 4;
  var a = e.read_shift(2), n = e.read_shift(2), s = e.read_shift(2);
  e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 2, e.l += 6, t -= 36;
  var i = [];
  return i.push((su[a] || wr)(e, t, r)), { cmo: [n, a, s], ft: i };
}
function cu(e, t, r) {
  var a = e.l, n = "";
  try {
    e.l += 4;
    var s = (r.lastobj || { cmo: [0, 0] }).cmo[1], i;
    [0, 5, 7, 11, 12, 14].indexOf(s) == -1 ? e.l += 6 : i = oh(e, 6, r);
    var c = e.read_shift(2);
    e.read_shift(2), Ye(e, 2);
    var f = e.read_shift(2);
    e.l += f;
    for (var o = 1; o < e.lens.length - 1; ++o) {
      if (e.l - a != e.lens[o]) throw new Error("TxO: bad continue record");
      var l = e[e.l], p = Pt(e, e.lens[o + 1] - e.lens[o] - 1);
      if (n += p, n.length >= (l ? c : 2 * c)) break;
    }
    if (n.length !== c && n.length !== c * 2)
      throw new Error("cchText: " + c + " != " + n.length);
    return e.l = a + t, { t: n };
  } catch {
    return e.l = a + t, { t: n };
  }
}
function fu(e, t) {
  var r = fn(e);
  e.l += 16;
  var a = dh(e, t - 24);
  return [r, a];
}
function ou(e, t) {
  e.read_shift(2);
  var r = fn(e), a = e.read_shift((t - 10) / 2, "dbcs-cont");
  return a = a.replace(br, ""), [r, a];
}
function lu(e) {
  var t = [0, 0], r;
  return r = e.read_shift(2), t[0] = Gs[r] || r, r = e.read_shift(2), t[1] = Gs[r] || r, t;
}
function hu(e) {
  for (var t = e.read_shift(2), r = []; t-- > 0; ) r.push(Si(e));
  return r;
}
function uu(e) {
  for (var t = e.read_shift(2), r = []; t-- > 0; ) r.push(Si(e));
  return r;
}
function du(e) {
  e.l += 2;
  var t = { cxfs: 0, crc: 0 };
  return t.cxfs = e.read_shift(2), t.crc = e.read_shift(4), t;
}
function Ni(e, t, r) {
  if (!r.cellStyles) return wr(e, t);
  var a = r && r.biff >= 12 ? 4 : 2, n = e.read_shift(a), s = e.read_shift(a), i = e.read_shift(a), c = e.read_shift(a), f = e.read_shift(2);
  a == 2 && (e.l += 2);
  var o = { s: n, e: s, w: i, ixfe: c, flags: f };
  return (r.biff >= 5 || !r.biff) && (o.level = f >> 8 & 7), o;
}
function xu(e, t) {
  var r = {};
  return t < 32 || (e.l += 16, r.header = kr(e), r.footer = kr(e), e.l += 2), r;
}
function pu(e, t, r) {
  var a = { area: !1 };
  if (r.biff != 5)
    return e.l += t, a;
  var n = e.read_shift(1);
  return e.l += 3, n & 16 && (a.area = !0), a;
}
var mu = Zr, gu = Ti, vu = Aa;
function ku(e) {
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(4), n = { fmt: t, env: r, len: a, data: e.slice(e.l, e.l + a) };
  return e.l += a, n;
}
function _u(e, t, r) {
  r.biffguess && r.biff == 5 && (r.biff = 2);
  var a = Zr(e, 7, r), n = Ot(e, t - 7, r);
  return a.t = "str", a.val = n, a;
}
function Eu(e, t, r) {
  var a = Zr(e, 7, r), n = kr(e);
  return a.t = "n", a.val = n, a;
}
function wu(e, t, r) {
  var a = Zr(e, 7, r), n = e.read_shift(2);
  return a.t = "n", a.val = n, a;
}
function Tu(e) {
  var t = e.read_shift(1);
  return t === 0 ? (e.l++, "") : e.read_shift(t, "sbcs-cont");
}
function Au(e, t, r) {
  var a = e.l + 7, n = Zr(e, 6, r);
  e.l = a;
  var s = Ai(e);
  return n.val = s, n.t = s === !0 || s === !1 ? "b" : "e", n;
}
function Fu(e, t) {
  e.l += 6, e.l += 2, e.l += 1, e.l += 3, e.l += 1, e.l += t - 13;
}
function Su(e, t, r) {
  var a = e.l + t, n = Zr(e, 6, r), s = e.read_shift(2), i = Pt(e, s, r);
  return e.l = a, n.t = "str", n.val = i, n;
}
function yu(e) {
  var t = e.read_shift(4), r = e.read_shift(1), a = e.read_shift(r, "sbcs");
  return a.length === 0 && (a = "Sheet1"), { flags: t, name: a };
}
var Cu = [2, 3, 48, 49, 131, 139, 140, 245], a0 = /* @__PURE__ */ (function() {
  var e = {
    /* Code Pages Supported by Visual FoxPro */
    1: 437,
    2: 850,
    3: 1252,
    4: 1e4,
    100: 852,
    101: 866,
    102: 865,
    103: 861,
    104: 895,
    105: 620,
    106: 737,
    107: 857,
    120: 950,
    121: 949,
    122: 936,
    123: 932,
    124: 874,
    125: 1255,
    126: 1256,
    150: 10007,
    151: 10029,
    152: 10006,
    200: 1250,
    201: 1251,
    202: 1254,
    203: 1253,
    /* shapefile DBF extension */
    0: 20127,
    8: 865,
    9: 437,
    10: 850,
    11: 437,
    13: 437,
    14: 850,
    15: 437,
    16: 850,
    17: 437,
    18: 850,
    19: 932,
    20: 850,
    21: 437,
    22: 850,
    23: 865,
    24: 437,
    25: 437,
    26: 850,
    27: 437,
    28: 863,
    29: 850,
    31: 852,
    34: 852,
    35: 852,
    36: 860,
    37: 850,
    38: 866,
    55: 850,
    64: 852,
    77: 936,
    78: 949,
    79: 950,
    80: 874,
    87: 1252,
    88: 1252,
    89: 1252,
    108: 863,
    134: 737,
    135: 852,
    136: 857,
    204: 1257,
    255: 16969
  }, t = $n({
    1: 437,
    2: 850,
    3: 1252,
    4: 1e4,
    100: 852,
    101: 866,
    102: 865,
    103: 861,
    104: 895,
    105: 620,
    106: 737,
    107: 857,
    120: 950,
    121: 949,
    122: 936,
    123: 932,
    124: 874,
    125: 1255,
    126: 1256,
    150: 10007,
    151: 10029,
    152: 10006,
    200: 1250,
    201: 1251,
    202: 1254,
    203: 1253,
    0: 20127
  });
  function r(c, f) {
    var o = [], l = xt(1);
    switch (f.type) {
      case "base64":
        l = Rr(Mr(c));
        break;
      case "binary":
        l = Rr(c);
        break;
      case "buffer":
      case "array":
        l = c;
        break;
    }
    cr(l, 0);
    var p = l.read_shift(1), u = !!(p & 136), h = !1, m = !1;
    switch (p) {
      case 2:
        break;
      // dBASE II
      case 3:
        break;
      // dBASE III
      case 48:
        h = !0, u = !0;
        break;
      // VFP
      case 49:
        h = !0, u = !0;
        break;
      // VFP with autoincrement
      // 0x43 dBASE IV SQL table files
      // 0x63 dBASE IV SQL system files
      case 131:
        break;
      // dBASE III with memo
      case 139:
        break;
      // dBASE IV with memo
      case 140:
        m = !0;
        break;
      // dBASE Level 7 with memo
      // case 0xCB dBASE IV SQL table files with memo
      case 245:
        break;
      // FoxPro 2.x with memo
      // case 0xFB FoxBASE
      default:
        throw new Error("DBF Unsupported Version: " + p.toString(16));
    }
    var k = 0, x = 521;
    p == 2 && (k = l.read_shift(2)), l.l += 3, p != 2 && (k = l.read_shift(4)), k > 1048576 && (k = 1e6), p != 2 && (x = l.read_shift(2));
    var d = l.read_shift(2);
    f.codepage, p != 2 && (l.l += 16, l.read_shift(1), l[l.l] !== 0 && e[l[l.l]], l.l += 1, l.l += 2), m && (l.l += 36);
    for (var _ = [], g = {}, C = Math.min(l.length, p == 2 ? 521 : x - 10 - (h ? 264 : 0)), O = m ? 32 : 11; l.l < C && l[l.l] != 13; )
      switch (g = {}, g.name = ct(l.slice(l.l, l.l + O)).replace(/[\u0000\r\n][\S\s]*$/g, ""), l.l += O, g.type = String.fromCharCode(l.read_shift(1)), p != 2 && !m && (g.offset = l.read_shift(4)), g.len = l.read_shift(1), p == 2 && (g.offset = l.read_shift(2)), g.dec = l.read_shift(1), g.name.length && _.push(g), p != 2 && (l.l += m ? 13 : 14), g.type) {
        case "B":
          (!h || g.len != 8) && f.WTF && console.log("Skipping " + g.name + ":" + g.type);
          break;
        case "G":
        // General (FoxPro and dBASE L7)
        case "P":
          f.WTF && console.log("Skipping " + g.name + ":" + g.type);
          break;
        case "+":
        // Autoincrement (dBASE L7 only)
        case "0":
        // _NullFlags (VFP only)
        case "@":
        // Timestamp (dBASE L7 only)
        case "C":
        // Character (dBASE II)
        case "D":
        // Date (dBASE III)
        case "F":
        // Float (dBASE IV)
        case "I":
        // Long (VFP and dBASE L7)
        case "L":
        // Logical (dBASE II)
        case "M":
        // Memo (dBASE III)
        case "N":
        // Number (dBASE II)
        case "O":
        // Double (dBASE L7 only)
        case "T":
        // Datetime (VFP only)
        case "Y":
          break;
        default:
          throw new Error("Unknown Field Type: " + g.type);
      }
    if (l[l.l] !== 13 && (l.l = x - 1), l.read_shift(1) !== 13) throw new Error("DBF Terminator not found " + l.l + " " + l[l.l]);
    l.l = x;
    var U = 0, P = 0;
    for (o[0] = [], P = 0; P != _.length; ++P) o[0][P] = _[P].name;
    for (; k-- > 0; ) {
      if (l[l.l] === 42) {
        l.l += d;
        continue;
      }
      for (++l.l, o[++U] = [], P = 0, P = 0; P != _.length; ++P) {
        var I = l.slice(l.l, l.l + _[P].len);
        l.l += _[P].len, cr(I, 0);
        var N = ct(I);
        switch (_[P].type) {
          case "C":
            N.trim().length && (o[U][P] = N.replace(/([^\s])\s+$/, "$1"));
            break;
          case "D":
            N.length === 8 ? (o[U][P] = new Date(Date.UTC(+N.slice(0, 4), +N.slice(4, 6) - 1, +N.slice(6, 8), 0, 0, 0, 0)), f && f.UTC || (o[U][P] = bt(o[U][P]))) : o[U][P] = N;
            break;
          case "F":
            o[U][P] = parseFloat(N.trim());
            break;
          case "+":
          case "I":
            o[U][P] = m ? I.read_shift(-4, "i") ^ 2147483648 : I.read_shift(4, "i");
            break;
          case "L":
            switch (N.trim().toUpperCase()) {
              case "Y":
              case "T":
                o[U][P] = !0;
                break;
              case "N":
              case "F":
                o[U][P] = !1;
                break;
              case "":
              case "\0":
              case "?":
                break;
              default:
                throw new Error("DBF Unrecognized L:|" + N + "|");
            }
            break;
          case "M":
            if (!u) throw new Error("DBF Unexpected MEMO for type " + p.toString(16));
            o[U][P] = "##MEMO##" + (m ? parseInt(N.trim(), 10) : I.read_shift(4));
            break;
          case "N":
            N = N.replace(/\u0000/g, "").trim(), N && N != "." && (o[U][P] = +N || 0);
            break;
          case "@":
            o[U][P] = new Date(I.read_shift(-8, "f") - 621356832e5);
            break;
          case "T":
            {
              var B = I.read_shift(4), M = I.read_shift(4);
              if (B == 0 && M == 0) break;
              o[U][P] = new Date((B - 2440588) * 864e5 + M), f && f.UTC || (o[U][P] = bt(o[U][P]));
            }
            break;
          case "Y":
            o[U][P] = I.read_shift(4, "i") / 1e4 + I.read_shift(4, "i") / 1e4 * Math.pow(2, 32);
            break;
          case "O":
            o[U][P] = -I.read_shift(-8, "f");
            break;
          case "B":
            if (h && _[P].len == 8) {
              o[U][P] = I.read_shift(8, "f");
              break;
            }
          /* falls through */
          case "G":
          case "P":
            I.l += _[P].len;
            break;
          case "0":
            if (_[P].name === "_NullFlags") break;
          /* falls through */
          default:
            throw new Error("DBF Unsupported data type " + _[P].type);
        }
      }
    }
    if (p != 2 && l.l < l.length && l[l.l++] != 26) throw new Error("DBF EOF Marker missing " + (l.l - 1) + " of " + l.length + " " + l[l.l - 1].toString(16));
    return f && f.sheetRows && (o = o.slice(0, f.sheetRows)), f.DBF = _, o;
  }
  function a(c, f) {
    var o = f || {};
    o.dateNF || (o.dateNF = "yyyymmdd");
    var l = zt(r(c, o), o);
    return l["!cols"] = o.DBF.map(function(p) {
      return {
        wch: p.len,
        DBF: p
      };
    }), delete o.DBF, l;
  }
  function n(c, f) {
    try {
      var o = vt(a(c, f), f);
      return o.bookType = "dbf", o;
    } catch (l) {
      if (f && f.WTF) throw l;
    }
    return { SheetNames: [], Sheets: {} };
  }
  var s = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
  function i(c, f) {
    if (!c["!ref"]) throw new Error("Cannot export empty sheet to DBF");
    var o = f || {}, l = Vr;
    if (+o.codepage >= 0 && jr(+o.codepage), o.type == "string") throw new Error("Cannot write DBF to JS string");
    var p = Cn(), u = In(c, { header: 1, raw: !0, cellDates: !0 }), h = u[0], m = u.slice(1), k = c["!cols"] || [], x = 0, d = 0, _ = 0, g = 1;
    for (x = 0; x < h.length; ++x) {
      if (((k[x] || {}).DBF || {}).name) {
        h[x] = k[x].DBF.name, ++_;
        continue;
      }
      if (h[x] != null) {
        if (++_, typeof h[x] == "number" && (h[x] = h[x].toString(10)), typeof h[x] != "string") throw new Error("DBF Invalid column name " + h[x] + " |" + typeof h[x] + "|");
        if (h.indexOf(h[x]) !== x) {
          for (d = 0; d < 1024; ++d)
            if (h.indexOf(h[x] + "_" + d) == -1) {
              h[x] += "_" + d;
              break;
            }
        }
      }
    }
    var C = qe(c["!ref"]), O = [], U = [], P = [];
    for (x = 0; x <= C.e.c - C.s.c; ++x) {
      var I = "", N = "", B = 0, M = [];
      for (d = 0; d < m.length; ++d)
        m[d][x] != null && M.push(m[d][x]);
      if (M.length == 0 || h[x] == null) {
        O[x] = "?";
        continue;
      }
      for (d = 0; d < M.length; ++d) {
        switch (typeof M[d]) {
          /* TODO: check if L2 compat is desired */
          case "number":
            N = "B";
            break;
          case "string":
            N = "C";
            break;
          case "boolean":
            N = "L";
            break;
          case "object":
            N = M[d] instanceof Date ? "D" : "C";
            break;
          default:
            N = "C";
        }
        B = Math.max(B, String(M[d]).length), I = I && I != N ? "C" : N;
      }
      B > 250 && (B = 250), N = ((k[x] || {}).DBF || {}).type, N == "C" && k[x].DBF.len > B && (B = k[x].DBF.len), I == "B" && N == "N" && (I = "N", P[x] = k[x].DBF.dec, B = k[x].DBF.len), U[x] = I == "C" || N == "N" ? B : s[I] || 0, g += U[x], O[x] = I;
    }
    var X = p.next(32);
    for (X.write_shift(4, 318902576), X.write_shift(4, m.length), X.write_shift(2, 296 + 32 * _), X.write_shift(2, g), x = 0; x < 4; ++x) X.write_shift(4, 0);
    var j = +t[
      /*::String(*/
      Vr
      /*::)*/
    ] || 3;
    for (X.write_shift(4, 0 | j << 8), e[j] != +o.codepage && (o.codepage && console.error("DBF Unsupported codepage " + Vr + ", using 1252"), Vr = 1252), x = 0, d = 0; x < h.length; ++x)
      if (h[x] != null) {
        var oe = p.next(32), Z = (h[x].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
        oe.write_shift(1, Z, "sbcs"), oe.write_shift(1, O[x] == "?" ? "C" : O[x], "sbcs"), oe.write_shift(4, d), oe.write_shift(1, U[x] || s[O[x]] || 0), oe.write_shift(1, P[x] || 0), oe.write_shift(1, 2), oe.write_shift(4, 0), oe.write_shift(1, 0), oe.write_shift(4, 0), oe.write_shift(4, 0), d += U[x] || s[O[x]] || 0;
      }
    var xe = p.next(264);
    for (xe.write_shift(4, 13), x = 0; x < 65; ++x) xe.write_shift(4, 0);
    for (x = 0; x < m.length; ++x) {
      var q = p.next(g);
      for (q.write_shift(1, 0), d = 0; d < h.length; ++d)
        if (h[d] != null)
          switch (O[d]) {
            case "L":
              q.write_shift(1, m[x][d] == null ? 63 : m[x][d] ? 84 : 70);
              break;
            case "B":
              q.write_shift(8, m[x][d] || 0, "f");
              break;
            case "N":
              var ie = "0";
              for (typeof m[x][d] == "number" && (ie = m[x][d].toFixed(P[d] || 0)), ie.length > U[d] && (ie = ie.slice(0, U[d])), _ = 0; _ < U[d] - ie.length; ++_) q.write_shift(1, 32);
              q.write_shift(1, ie, "sbcs");
              break;
            case "D":
              m[x][d] ? (q.write_shift(4, ("0000" + m[x][d].getFullYear()).slice(-4), "sbcs"), q.write_shift(2, ("00" + (m[x][d].getMonth() + 1)).slice(-2), "sbcs"), q.write_shift(2, ("00" + m[x][d].getDate()).slice(-2), "sbcs")) : q.write_shift(8, "00000000", "sbcs");
              break;
            case "C":
              var ve = q.l, K = String(m[x][d] != null ? m[x][d] : "").slice(0, U[d]);
              for (q.write_shift(1, K, "cpstr"), ve += U[d] - q.l, _ = 0; _ < ve; ++_) q.write_shift(1, 32);
              break;
          }
    }
    return Vr = l, p.next(1).write_shift(1, 26), p.end();
  }
  return {
    to_workbook: n,
    to_sheet: a,
    from_sheet: i
  };
})(), bu = /* @__PURE__ */ (function() {
  var e = {
    AA: "À",
    BA: "Á",
    CA: "Â",
    DA: 195,
    HA: "Ä",
    JA: 197,
    AE: "È",
    BE: "É",
    CE: "Ê",
    HE: "Ë",
    AI: "Ì",
    BI: "Í",
    CI: "Î",
    HI: "Ï",
    AO: "Ò",
    BO: "Ó",
    CO: "Ô",
    DO: 213,
    HO: "Ö",
    AU: "Ù",
    BU: "Ú",
    CU: "Û",
    HU: "Ü",
    Aa: "à",
    Ba: "á",
    Ca: "â",
    Da: 227,
    Ha: "ä",
    Ja: 229,
    Ae: "è",
    Be: "é",
    Ce: "ê",
    He: "ë",
    Ai: "ì",
    Bi: "í",
    Ci: "î",
    Hi: "ï",
    Ao: "ò",
    Bo: "ó",
    Co: "ô",
    Do: 245,
    Ho: "ö",
    Au: "ù",
    Bu: "ú",
    Cu: "û",
    Hu: "ü",
    KC: "Ç",
    Kc: "ç",
    q: "æ",
    z: "œ",
    a: "Æ",
    j: "Œ",
    DN: 209,
    Dn: 241,
    Hy: 255,
    S: 169,
    c: 170,
    R: 174,
    "B ": 180,
    0: 176,
    1: 177,
    2: 178,
    3: 179,
    5: 181,
    6: 182,
    7: 183,
    Q: 185,
    k: 186,
    b: 208,
    i: 216,
    l: 222,
    s: 240,
    y: 248,
    "!": 161,
    '"': 162,
    "#": 163,
    "(": 164,
    "%": 165,
    "'": 167,
    "H ": 168,
    "+": 171,
    ";": 187,
    "<": 188,
    "=": 189,
    ">": 190,
    "?": 191,
    "{": 223
  }, t = new RegExp("\x1BN(" + $r(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1").replace("{", "\\{") + "|\\|)", "gm");
  try {
    t = new RegExp("\x1BN(" + $r(e).join("|").replace(/\|\|\|/, "|\\||").replace(/([?()+])/g, "\\$1") + "|\\|)", "gm");
  } catch {
  }
  var r = function(h, m) {
    var k = e[m];
    return typeof k == "number" ? ks(k) : k;
  }, a = function(h, m, k) {
    var x = m.charCodeAt(0) - 32 << 4 | k.charCodeAt(0) - 48;
    return x == 59 ? h : ks(x);
  };
  e["|"] = 254;
  var n = function(h) {
    return h.replace(/\n/g, "\x1B :").replace(/\r/g, "\x1B =");
  };
  function s(h, m) {
    switch (m.type) {
      case "base64":
        return i(Mr(h), m);
      case "binary":
        return i(h, m);
      case "buffer":
        return i(Ce && Buffer.isBuffer(h) ? h.toString("binary") : ct(h), m);
      case "array":
        return i(Ct(h), m);
    }
    throw new Error("Unrecognized type " + m.type);
  }
  function i(h, m) {
    var k = h.split(/[\n\r]+/), x = -1, d = -1, _ = 0, g = 0, C = [], O = [], U = null, P = {}, I = [], N = [], B = [], M = 0, X, j = { Workbook: { WBProps: {}, Names: [] } };
    for (+m.codepage >= 0 && jr(+m.codepage); _ !== k.length; ++_) {
      M = 0;
      var oe = k[_].trim().replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, a).replace(t, r), Z = oe.replace(/;;/g, "\0").split(";").map(function(b) {
        return b.replace(/\u0000/g, ";");
      }), xe = Z[0], q;
      if (oe.length > 0) switch (xe) {
        case "ID":
          break;
        /* header */
        case "E":
          break;
        /* EOF */
        case "B":
          break;
        /* dimensions */
        case "O":
          for (g = 1; g < Z.length; ++g) switch (Z[g].charAt(0)) {
            case "V":
              {
                var ie = parseInt(Z[g].slice(1), 10);
                ie >= 1 && ie <= 4 && (j.Workbook.WBProps.date1904 = !0);
              }
              break;
          }
          break;
        case "W":
          break;
        /* window */
        case "P":
          Z[1].charAt(0) === "P" && O.push(oe.slice(3).replace(/;;/g, ";"));
          break;
        case "NN":
          {
            var ve = { Sheet: 0 };
            for (g = 1; g < Z.length; ++g) switch (Z[g].charAt(0)) {
              case "N":
                ve.Name = Z[g].slice(1);
                break;
              case "E":
                ve.Ref = (m && m.sheet || "Sheet1") + "!" + St(Z[g].slice(1));
                break;
            }
            j.Workbook.Names.push(ve);
          }
          break;
        // case 'NE': // ??
        // case 'NU': // ??
        case "C":
          var K = !1, we = !1, Ee = !1, me = !1, le = -1, Ae = -1, ke = "", Se = "z", S = "";
          for (g = 1; g < Z.length; ++g) switch (Z[g].charAt(0)) {
            case "A":
              S = Z[g].slice(1);
              break;
            // TODO: comment
            case "X":
              d = parseInt(Z[g].slice(1), 10) - 1, we = !0;
              break;
            case "Y":
              for (x = parseInt(Z[g].slice(1), 10) - 1, we || (d = 0), X = C.length; X <= x; ++X) C[X] = [];
              break;
            case "K":
              q = Z[g].slice(1), q.charAt(0) === '"' ? (q = q.slice(1, q.length - 1), Se = "s") : q === "TRUE" || q === "FALSE" ? (q = q === "TRUE", Se = "b") : q.charAt(0) == "#" && ur[q] != null ? (Se = "e", q = ur[q]) : isNaN(Or(q)) || (q = Or(q), Se = "n", U !== null && Jr(U) && m.cellDates && (q = dt(j.Workbook.WBProps.date1904 ? q + 1462 : q), Se = typeof q == "number" ? "n" : "d")), K = !0;
              break;
            case "E":
              me = !0, ke = St(Z[g].slice(1), { r: x, c: d });
              break;
            case "S":
              Ee = !0;
              break;
            case "G":
              break;
            // unknown
            case "R":
              le = parseInt(Z[g].slice(1), 10) - 1;
              break;
            case "C":
              Ae = parseInt(Z[g].slice(1), 10) - 1;
              break;
            // case 'P': // ??
            // case 'D': // ??
            default:
              if (m && m.WTF) throw new Error("SYLK bad record " + oe);
          }
          if (K && (C[x][d] ? (C[x][d].t = Se, C[x][d].v = q) : C[x][d] = { t: Se, v: q }, U && (C[x][d].z = U), m.cellText !== !1 && U && (C[x][d].w = Lr(C[x][d].z, C[x][d].v, { date1904: j.Workbook.WBProps.date1904 })), U = null), Ee) {
            if (me) throw new Error("SYLK shared formula cannot have own formula");
            var L = le > -1 && C[le][Ae];
            if (!L || !L[1]) throw new Error("SYLK shared formula cannot find base");
            ke = Hi(L[1], { r: x - le, c: d - Ae });
          }
          ke && (C[x][d] ? C[x][d].f = ke : C[x][d] = { t: "n", f: ke }), S && (C[x][d] || (C[x][d] = { t: "z" }), C[x][d].c = [{ a: "SheetJSYLK", t: S }]);
          break;
        case "F":
          var R = 0;
          for (g = 1; g < Z.length; ++g) switch (Z[g].charAt(0)) {
            case "X":
              d = parseInt(Z[g].slice(1), 10) - 1, ++R;
              break;
            case "Y":
              for (x = parseInt(Z[g].slice(1), 10) - 1, X = C.length; X <= x; ++X) C[X] = [];
              break;
            case "M":
              M = parseInt(Z[g].slice(1), 10) / 20;
              break;
            case "F":
              break;
            /* ??? */
            case "G":
              break;
            /* hide grid */
            case "P":
              U = O[parseInt(Z[g].slice(1), 10)];
              break;
            case "S":
              break;
            /* cell style */
            case "D":
              break;
            /* column */
            case "N":
              break;
            /* font */
            case "W":
              for (B = Z[g].slice(1).split(" "), X = parseInt(B[0], 10); X <= parseInt(B[1], 10); ++X)
                M = parseInt(B[2], 10), N[X - 1] = M === 0 ? { hidden: !0 } : { wch: M };
              break;
            case "C":
              d = parseInt(Z[g].slice(1), 10) - 1, N[d] || (N[d] = {});
              break;
            case "R":
              x = parseInt(Z[g].slice(1), 10) - 1, I[x] || (I[x] = {}), M > 0 ? (I[x].hpt = M, I[x].hpx = ka(M)) : M === 0 && (I[x].hidden = !0);
              break;
            // case 'K': // ??
            // case 'E': // ??
            default:
              if (m && m.WTF) throw new Error("SYLK bad record " + oe);
          }
          R < 1 && (U = null);
          break;
        default:
          if (m && m.WTF) throw new Error("SYLK bad record " + oe);
      }
    }
    return I.length > 0 && (P["!rows"] = I), N.length > 0 && (P["!cols"] = N), N.forEach(function(b) {
      Xt(b);
    }), m && m.sheetRows && (C = C.slice(0, m.sheetRows)), [C, P, j];
  }
  function c(h, m) {
    var k = s(h, m), x = k[0], d = k[1], _ = k[2], g = ir(m);
    g.date1904 = (((_ || {}).Workbook || {}).WBProps || {}).date1904;
    var C = zt(x, g);
    $r(d).forEach(function(U) {
      C[U] = d[U];
    });
    var O = vt(C, m);
    return $r(_).forEach(function(U) {
      O[U] = _[U];
    }), O.bookType = "sylk", O;
  }
  function f(h, m, k, x, d, _) {
    var g = "C;Y" + (k + 1) + ";X" + (x + 1) + ";K";
    switch (h.t) {
      case "n":
        g += isFinite(h.v) ? h.v || 0 : Pr[isNaN(h.v) ? 36 : 7], h.f && !h.F && (g += ";E" + od(h.f, { r: k, c: x }));
        break;
      case "b":
        g += h.v ? "TRUE" : "FALSE";
        break;
      case "e":
        g += h.w || Pr[h.v] || h.v;
        break;
      case "d":
        g += fr(xr(h.v, _), _);
        break;
      case "s":
        g += '"' + (h.v == null ? "" : String(h.v)).replace(/"/g, "").replace(/;/g, ";;") + '"';
        break;
    }
    return g;
  }
  function o(h, m, k) {
    var x = "C;Y" + (m + 1) + ";X" + (k + 1) + ";A";
    return x += n(h.map(function(d) {
      return d.t;
    }).join("")), x;
  }
  function l(h, m) {
    m.forEach(function(k, x) {
      var d = "F;W" + (x + 1) + " " + (x + 1) + " ";
      k.hidden ? d += "0" : (typeof k.width == "number" && !k.wpx && (k.wpx = Qa(k.width)), typeof k.wpx == "number" && !k.wch && (k.wch = en(k.wpx)), typeof k.wch == "number" && (d += Math.round(k.wch))), d.charAt(d.length - 1) != " " && h.push(d);
    });
  }
  function p(h, m) {
    m.forEach(function(k, x) {
      var d = "F;";
      k.hidden ? d += "M0;" : k.hpt ? d += "M" + 20 * k.hpt + ";" : k.hpx && (d += "M" + 20 * Bi(k.hpx) + ";"), d.length > 2 && h.push(d + "R" + (x + 1));
    });
  }
  function u(h, m, k) {
    m || (m = {}), m._formats = ["General"];
    var x = ["ID;PSheetJS;N;E"], d = [], _ = qe(h["!ref"] || "A1"), g, C = h["!data"] != null, O = `\r
`, U = (((k || {}).Workbook || {}).WBProps || {}).date1904, P = "General";
    x.push("P;PGeneral");
    var I = _.s.r, N = _.s.c, B = [];
    if (h["!ref"]) {
      for (I = _.s.r; I <= _.e.r; ++I)
        if (!(C && !h["!data"][I])) {
          for (B = [], N = _.s.c; N <= _.e.c; ++N)
            g = C ? h["!data"][I][N] : h[Me(N) + We(I)], !(!g || !g.c) && B.push(o(g.c, I, N));
          B.length && d.push(B.join(O));
        }
    }
    if (h["!ref"]) {
      for (I = _.s.r; I <= _.e.r; ++I)
        if (!(C && !h["!data"][I])) {
          for (B = [], N = _.s.c; N <= _.e.c; ++N)
            if (g = C ? h["!data"][I][N] : h[Me(N) + We(I)], !(!g || g.v == null && (!g.f || g.F))) {
              if ((g.z || (g.t == "d" ? _e[14] : "General")) != P) {
                var M = m._formats.indexOf(g.z);
                M == -1 && (m._formats.push(g.z), M = m._formats.length - 1, x.push("P;P" + g.z.replace(/;/g, ";;"))), B.push("F;P" + M + ";Y" + (I + 1) + ";X" + (N + 1));
              }
              B.push(f(g, h, I, N, m, U));
            }
          d.push(B.join(O));
        }
    }
    return x.push("F;P0;DG0G8;M255"), h["!cols"] && l(x, h["!cols"]), h["!rows"] && p(x, h["!rows"]), h["!ref"] && x.push("B;Y" + (_.e.r - _.s.r + 1) + ";X" + (_.e.c - _.s.c + 1) + ";D" + [_.s.c, _.s.r, _.e.c, _.e.r].join(" ")), x.push("O;L;D;B" + (U ? ";V4" : "") + ";K47;G100 0.001"), delete m._formats, x.join(O) + O + d.join(O) + O + "E" + O;
  }
  return {
    to_workbook: c,
    from_sheet: u
  };
})(), Pu = /* @__PURE__ */ (function() {
  function e(c, f) {
    switch (f.type) {
      case "base64":
        return t(Mr(c), f);
      case "binary":
        return t(c, f);
      case "buffer":
        return t(Ce && Buffer.isBuffer(c) ? c.toString("binary") : ct(c), f);
      case "array":
        return t(Ct(c), f);
    }
    throw new Error("Unrecognized type " + f.type);
  }
  function t(c, f) {
    for (var o = c.split(`
`), l = -1, p = -1, u = 0, h = []; u !== o.length; ++u) {
      if (o[u].trim() === "BOT") {
        h[++l] = [], p = 0;
        continue;
      }
      if (!(l < 0)) {
        var m = o[u].trim().split(","), k = m[0], x = m[1];
        ++u;
        for (var d = o[u] || ""; (d.match(/["]/g) || []).length & 1 && u < o.length - 1; ) d += `
` + o[++u];
        switch (d = d.trim(), +k) {
          case -1:
            if (d === "BOT") {
              h[++l] = [], p = 0;
              continue;
            } else if (d !== "EOD") throw new Error("Unrecognized DIF special command " + d);
            break;
          case 0:
            d === "TRUE" ? h[l][p] = !0 : d === "FALSE" ? h[l][p] = !1 : isNaN(Or(x)) ? isNaN(ma(x).getDate()) ? h[l][p] = x : (h[l][p] = xr(x), f && f.UTC || (h[l][p] = bt(h[l][p]))) : h[l][p] = Or(x), ++p;
            break;
          case 1:
            d = d.slice(1, d.length - 1), d = d.replace(/""/g, '"'), d && d.match(/^=".*"$/) && (d = d.slice(2, -1)), h[l][p++] = d !== "" ? d : null;
            break;
        }
        if (d === "EOD") break;
      }
    }
    return f && f.sheetRows && (h = h.slice(0, f.sheetRows)), h;
  }
  function r(c, f) {
    return zt(e(c, f), f);
  }
  function a(c, f) {
    var o = vt(r(c, f), f);
    return o.bookType = "dif", o;
  }
  function n(c, f) {
    return "0," + String(c) + `\r
` + f;
  }
  function s(c) {
    return `1,0\r
"` + c.replace(/"/g, '""') + '"';
  }
  function i(c) {
    if (!c["!ref"]) throw new Error("Cannot export empty sheet to DIF");
    for (var f = qe(c["!ref"]), o = c["!data"] != null, l = [
      `TABLE\r
0,1\r
"sheetjs"\r
`,
      `VECTORS\r
0,` + (f.e.r - f.s.r + 1) + `\r
""\r
`,
      `TUPLES\r
0,` + (f.e.c - f.s.c + 1) + `\r
""\r
`,
      `DATA\r
0,0\r
""\r
`
    ], p = f.s.r; p <= f.e.r; ++p) {
      for (var u = o ? c["!data"][p] : [], h = `-1,0\r
BOT\r
`, m = f.s.c; m <= f.e.c; ++m) {
        var k = o ? u && u[m] : c[Oe({ r: p, c: m })];
        if (k == null) {
          h += `1,0\r
""\r
`;
          continue;
        }
        switch (k.t) {
          case "n":
            k.w != null ? h += "0," + k.w + `\r
V` : k.v != null ? h += n(k.v, "V") : k.f != null && !k.F ? h += s("=" + k.f) : h += `1,0\r
""`;
            break;
          case "b":
            h += k.v ? n(1, "TRUE") : n(0, "FALSE");
            break;
          case "s":
            h += s(isNaN(+k.v) ? k.v : '="' + k.v + '"');
            break;
          case "d":
            k.w || (k.w = Lr(k.z || _e[14], fr(xr(k.v)))), h += n(k.w, "V");
            break;
          default:
            h += `1,0\r
""`;
        }
        h += `\r
`;
      }
      l.push(h);
    }
    return l.join("") + `-1,0\r
EOD`;
  }
  return {
    to_workbook: a,
    to_sheet: r,
    from_sheet: i
  };
})(), Nu = /* @__PURE__ */ (function() {
  function e(p) {
    return p.replace(/\\b/g, "\\").replace(/\\c/g, ":").replace(/\\n/g, `
`);
  }
  function t(p) {
    return p.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
  }
  function r(p, u) {
    for (var h = p.split(`
`), m = -1, k = -1, x = 0, d = []; x !== h.length; ++x) {
      var _ = h[x].trim().split(":");
      if (_[0] === "cell") {
        var g = _r(_[1]);
        if (d.length <= g.r) for (m = d.length; m <= g.r; ++m) d[m] || (d[m] = []);
        switch (m = g.r, k = g.c, _[2]) {
          case "t":
            d[m][k] = e(_[3]);
            break;
          case "v":
            d[m][k] = +_[3];
            break;
          case "vtf":
            var C = _[_.length - 1];
          /* falls through */
          case "vtc":
            _[3] === "nl" ? d[m][k] = !!+_[4] : d[m][k] = _[_.length - 1].charAt(0) == "#" ? { t: "e", v: ur[_[_.length - 1]] } : +_[4], _[2] == "vtf" && (d[m][k] = [d[m][k], C]);
        }
      }
    }
    return u && u.sheetRows && (d = d.slice(0, u.sheetRows)), d;
  }
  function a(p, u) {
    return zt(r(p, u), u);
  }
  function n(p, u) {
    return vt(a(p, u), u);
  }
  var s = [
    "socialcalc:version:1.5",
    "MIME-Version: 1.0",
    "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave"
  ].join(`
`), i = [
    "--SocialCalcSpreadsheetControlSave",
    "Content-type: text/plain; charset=UTF-8"
  ].join(`
`) + `
`, c = [
    "# SocialCalc Spreadsheet Control Save",
    "part:sheet"
  ].join(`
`), f = "--SocialCalcSpreadsheetControlSave--";
  function o(p) {
    if (!p || !p["!ref"]) return "";
    for (var u = [], h = [], m, k = "", x = Dt(p["!ref"]), d = p["!data"] != null, _ = x.s.r; _ <= x.e.r; ++_)
      for (var g = x.s.c; g <= x.e.c; ++g)
        if (k = Oe({ r: _, c: g }), m = d ? (p["!data"][_] || [])[g] : p[k], !(!m || m.v == null || m.t === "z")) {
          switch (h = ["cell", k, "t"], m.t) {
            case "s":
              h.push(t(m.v));
              break;
            case "b":
              h[2] = "vt" + (m.f ? "f" : "c"), h[3] = "nl", h[4] = m.v ? "1" : "0", h[5] = t(m.f || (m.v ? "TRUE" : "FALSE"));
              break;
            case "d":
              var C = fr(xr(m.v));
              h[2] = "vtc", h[3] = "nd", h[4] = "" + C, h[5] = m.w || Lr(m.z || _e[14], C);
              break;
            case "n":
              isFinite(m.v) ? m.f ? (h[2] = "vtf", h[3] = "n", h[4] = m.v, h[5] = t(m.f)) : (h[2] = "v", h[3] = m.v) : (h[2] = "vt" + (m.f ? "f" : "c"), h[3] = "e" + Pr[isNaN(m.v) ? 36 : 7], h[4] = "0", h[5] = m.f || h[3].slice(1), h[6] = "e", h[7] = h[3].slice(1));
              break;
            case "e":
              continue;
          }
          u.push(h.join(":"));
        }
    return u.push("sheet:c:" + (x.e.c - x.s.c + 1) + ":r:" + (x.e.r - x.s.r + 1) + ":tvf:1"), u.push("valueformat:1:text-wiki"), u.join(`
`);
  }
  function l(p) {
    return [s, i, c, i, o(p), f].join(`
`);
  }
  return {
    to_workbook: n,
    to_sheet: a,
    from_sheet: l
  };
})(), ga = /* @__PURE__ */ (function() {
  function e(l, p, u, h, m) {
    m.raw ? p[u][h] = l : l === "" || (l === "TRUE" ? p[u][h] = !0 : l === "FALSE" ? p[u][h] = !1 : isNaN(Or(l)) ? isNaN(ma(l).getDate()) ? l.charCodeAt(0) == 35 && ur[l] != null ? p[u][h] = { t: "e", v: ur[l], w: l } : p[u][h] = l : p[u][h] = xr(l) : p[u][h] = Or(l));
  }
  function t(l, p) {
    var u = p || {}, h = [];
    if (!l || l.length === 0) return h;
    for (var m = l.split(/[\r\n]/), k = m.length - 1; k >= 0 && m[k].length === 0; ) --k;
    for (var x = 10, d = 0, _ = 0; _ <= k; ++_)
      d = m[_].indexOf(" "), d == -1 ? d = m[_].length : d++, x = Math.max(x, d);
    for (_ = 0; _ <= k; ++_) {
      h[_] = [];
      var g = 0;
      for (e(m[_].slice(0, x).trim(), h, _, g, u), g = 1; g <= (m[_].length - x) / 10 + 1; ++g)
        e(m[_].slice(x + (g - 1) * 10, x + g * 10).trim(), h, _, g, u);
    }
    return u.sheetRows && (h = h.slice(0, u.sheetRows)), h;
  }
  var r = {
    44: ",",
    9: "	",
    59: ";",
    124: "|"
  }, a = {
    44: 3,
    9: 2,
    59: 1,
    124: 0
  };
  function n(l) {
    for (var p = {}, u = !1, h = 0, m = 0; h < l.length; ++h)
      (m = l.charCodeAt(h)) == 34 ? u = !u : !u && m in r && (p[m] = (p[m] || 0) + 1);
    m = [];
    for (h in p) Object.prototype.hasOwnProperty.call(p, h) && m.push([p[h], h]);
    if (!m.length) {
      p = a;
      for (h in p) Object.prototype.hasOwnProperty.call(p, h) && m.push([p[h], h]);
    }
    return m.sort(function(k, x) {
      return k[0] - x[0] || a[k[1]] - a[x[1]];
    }), r[m.pop()[1]] || 44;
  }
  function s(l, p) {
    var u = p || {}, h = "", m = {};
    u.dense && (m["!data"] = []);
    var k = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    l.slice(0, 4) == "sep=" ? l.charCodeAt(5) == 13 && l.charCodeAt(6) == 10 ? (h = l.charAt(4), l = l.slice(7)) : l.charCodeAt(5) == 13 || l.charCodeAt(5) == 10 ? (h = l.charAt(4), l = l.slice(6)) : h = n(l.slice(0, 1024)) : u && u.FS ? h = u.FS : h = n(l.slice(0, 1024));
    var x = 0, d = 0, _ = 0, g = 0, C = 0, O = h.charCodeAt(0), U = !1, P = 0, I = l.charCodeAt(0), N = u.dateNF != null ? Fo(u.dateNF) : null;
    function B() {
      var M = l.slice(g, C);
      M.slice(-1) == "\r" && (M = M.slice(0, -1));
      var X = {};
      if (M.charAt(0) == '"' && M.charAt(M.length - 1) == '"' && (M = M.slice(1, -1).replace(/""/g, '"')), u.cellText !== !1 && (X.w = M), M.length === 0) X.t = "z";
      else if (u.raw)
        X.t = "s", X.v = M;
      else if (M.trim().length === 0)
        X.t = "s", X.v = M;
      else if (M.charCodeAt(0) == 61)
        M.charCodeAt(1) == 34 && M.charCodeAt(M.length - 1) == 34 ? (X.t = "s", X.v = M.slice(2, -1).replace(/""/g, '"')) : ld(M) ? (X.t = "s", X.f = M.slice(1), X.v = M) : (X.t = "s", X.v = M);
      else if (M == "TRUE")
        X.t = "b", X.v = !0;
      else if (M == "FALSE")
        X.t = "b", X.v = !1;
      else if (!isNaN(_ = Or(M)))
        X.t = "n", X.v = _;
      else if (!isNaN((_ = ma(M)).getDate()) || N && M.match(N)) {
        if (X.z = u.dateNF || _e[14], N && M.match(N)) {
          var j = So(M, u.dateNF, M.match(N) || []);
          _ = xr(j), u && u.UTC === !1 && (_ = bt(_));
        } else u && u.UTC === !1 ? _ = bt(_) : u.cellText !== !1 && u.dateNF && (X.w = Lr(X.z, _));
        u.cellDates ? (X.t = "d", X.v = _) : (X.t = "n", X.v = fr(_)), u.cellNF || delete X.z;
      } else M.charCodeAt(0) == 35 && ur[M] != null ? (X.t = "e", X.w = M, X.v = ur[M]) : (X.t = "s", X.v = M);
      if (X.t == "z" || (u.dense ? (m["!data"][x] || (m["!data"][x] = []), m["!data"][x][d] = X) : m[Oe({ c: d, r: x })] = X), g = C + 1, I = l.charCodeAt(g), k.e.c < d && (k.e.c = d), k.e.r < x && (k.e.r = x), P == O) ++d;
      else if (d = 0, ++x, u.sheetRows && u.sheetRows <= x) return !0;
    }
    e: for (; C < l.length; ++C) switch (P = l.charCodeAt(C)) {
      case 34:
        I === 34 && (U = !U);
        break;
      case 13:
        if (U) break;
        l.charCodeAt(C + 1) == 10 && ++C;
      /* falls through */
      case O:
      case 10:
        if (!U && B()) break e;
        break;
    }
    return C - g > 0 && B(), m["!ref"] = Pe(k), m;
  }
  function i(l, p) {
    return !(p && p.PRN) || p.FS || l.slice(0, 4) == "sep=" || l.indexOf("	") >= 0 || l.indexOf(",") >= 0 || l.indexOf(";") >= 0 ? s(l, p) : zt(t(l, p), p);
  }
  function c(l, p) {
    var u = "", h = p.type == "string" ? [0, 0, 0, 0] : ss(l, p);
    switch (p.type) {
      case "base64":
        u = Mr(l);
        break;
      case "binary":
        u = l;
        break;
      case "buffer":
        p.codepage == 65001 ? u = l.toString("utf8") : (p.codepage, u = Ce && Buffer.isBuffer(l) ? l.toString("binary") : ct(l));
        break;
      case "array":
        u = Ct(l);
        break;
      case "string":
        u = l;
        break;
      default:
        throw new Error("Unrecognized type " + p.type);
    }
    return h[0] == 239 && h[1] == 187 && h[2] == 191 ? u = Ve(u.slice(3)) : p.type != "string" && p.type != "buffer" && p.codepage == 65001 ? u = Ve(u) : p.type == "binary", u.slice(0, 19) == "socialcalc:version:" ? Nu.to_sheet(p.type == "string" ? u : Ve(u), p) : i(u, p);
  }
  function f(l, p) {
    return vt(c(l, p), p);
  }
  function o(l) {
    var p = [];
    if (!l["!ref"]) return "";
    for (var u = qe(l["!ref"]), h, m = l["!data"] != null, k = u.s.r; k <= u.e.r; ++k) {
      for (var x = [], d = u.s.c; d <= u.e.c; ++d) {
        var _ = Oe({ r: k, c: d });
        if (h = m ? (l["!data"][k] || [])[d] : l[_], !h || h.v == null) {
          x.push("          ");
          continue;
        }
        for (var g = (h.w || (pt(h), h.w) || "").slice(0, 10); g.length < 10; ) g += " ";
        x.push(g + (d === 0 ? " " : ""));
      }
      p.push(x.join(""));
    }
    return p.join(`
`);
  }
  return {
    to_workbook: f,
    to_sheet: c,
    from_sheet: o
  };
})();
function Du(e, t) {
  var r = t || {}, a = !!r.WTF;
  r.WTF = !0;
  try {
    var n = bu.to_workbook(e, r);
    return r.WTF = a, n;
  } catch (s) {
    if (r.WTF = a, s.message.indexOf("SYLK bad record ID") == -1 && a) throw s;
    return ga.to_workbook(e, t);
  }
}
var ca = /* @__PURE__ */ (function() {
  function e(S, L, R) {
    if (S) {
      cr(S, S.l || 0);
      for (var b = R.Enum || me; S.l < S.length; ) {
        var J = S.read_shift(2), T = b[J] || b[65535], se = S.read_shift(2), ce = S.l + se, re = T.f && T.f(S, se, R);
        if (S.l = ce, L(re, T, J)) return;
      }
    }
  }
  function t(S, L) {
    switch (L.type) {
      case "base64":
        return a(Rr(Mr(S)), L);
      case "binary":
        return a(Rr(S), L);
      case "buffer":
      case "array":
        return a(S, L);
    }
    throw "Unsupported type " + L.type;
  }
  var r = [
    "mmmm",
    "dd-mmm-yyyy",
    "dd-mmm",
    "mmm-yyyy",
    "@",
    // "text"?
    "mm/dd",
    "hh:mm:ss AM/PM",
    // 7
    "hh:mm AM/PM",
    "mm/dd/yyyy",
    "mm/dd",
    "hh:mm:ss",
    "hh:mm"
    // 12
  ];
  function a(S, L) {
    if (!S) return S;
    var R = L || {}, b = {}, J = "Sheet1", T = "", se = 0, ce = {}, re = [], ge = [], pe = [];
    R.dense && (pe = b["!data"] = []);
    var Te = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, Be = R.sheetRows || 0, $e = {};
    if (S[4] == 81 && S[5] == 80 && S[6] == 87) return Se(S, L);
    if (S[2] == 0 && (S[3] == 8 || S[3] == 9) && S.length >= 16 && S[14] == 5 && S[15] === 108)
      throw new Error("Unsupported Works 3 for Mac file");
    if (S[2] == 2)
      R.Enum = me, e(S, function(ae, Nr, Tr) {
        switch (Tr) {
          case 0:
            R.vers = ae, ae >= 4096 && (R.qpro = !0);
            break;
          case 255:
            R.vers = ae, R.works = !0;
            break;
          case 6:
            Te = ae;
            break;
          /* RANGE */
          case 204:
            ae && (T = ae);
            break;
          /* SHEETNAMECS */
          case 222:
            T = ae;
            break;
          /* SHEETNAMELP */
          case 15:
          /* LABEL */
          case 51:
            (!R.qpro && !R.works || Tr == 51) && ae[1].v.charCodeAt(0) < 48 && (ae[1].v = ae[1].v.slice(1)), (R.works || R.works2) && (ae[1].v = ae[1].v.replace(/\r\n/g, `
`));
          /* falls through */
          case 13:
          /* INTEGER */
          case 14:
          /* NUMBER */
          case 16:
            (ae[2] & 112) == 112 && (ae[2] & 15) > 1 && (ae[2] & 15) < 15 && (ae[1].z = R.dateNF || r[(ae[2] & 15) - 1] || _e[14], R.cellDates && (ae[1].v = dt(ae[1].v), ae[1].t = typeof ae[1].v == "number" ? "n" : "d")), R.qpro && ae[3] > se && (b["!ref"] = Pe(Te), ce[J] = b, re.push(J), b = {}, R.dense && (pe = b["!data"] = []), Te = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, se = ae[3], J = T || "Sheet" + (se + 1), T = "");
            var Xe = R.dense ? (pe[ae[0].r] || [])[ae[0].c] : b[Oe(ae[0])];
            if (Xe) {
              Xe.t = ae[1].t, Xe.v = ae[1].v, ae[1].z != null && (Xe.z = ae[1].z), ae[1].f != null && (Xe.f = ae[1].f), $e = Xe;
              break;
            }
            R.dense ? (pe[ae[0].r] || (pe[ae[0].r] = []), pe[ae[0].r][ae[0].c] = ae[1]) : b[Oe(ae[0])] = ae[1], $e = ae[1];
            break;
          case 21509:
            R.works2 = !0;
            break;
          case 21506:
            ae == 5281 && ($e.z = "hh:mm:ss", R.cellDates && $e.t == "n" && ($e.v = dt($e.v), $e.t = typeof $e.v == "number" ? "n" : "d"));
            break;
        }
      }, R);
    else if (S[2] == 26 || S[2] == 14)
      R.Enum = le, S[2] == 14 && (R.qpro = !0, S.l = 0), e(S, function(ae, Nr, Tr) {
        switch (Tr) {
          case 204:
            J = ae;
            break;
          /* SHEETNAMECS */
          case 22:
            ae[1].v.charCodeAt(0) < 48 && (ae[1].v = ae[1].v.slice(1)), ae[1].v = ae[1].v.replace(/\x0F./g, function(Xe) {
              return String.fromCharCode(Xe.charCodeAt(1) - 32);
            }).replace(/\r\n/g, `
`);
          /* falls through */
          case 23:
          /* NUMBER17 */
          case 24:
          /* NUMBER18 */
          case 25:
          /* FORMULA19 */
          case 37:
          /* NUMBER25 */
          case 39:
          /* NUMBER27 */
          case 40:
            if (ae[3] > se && (b["!ref"] = Pe(Te), ce[J] = b, re.push(J), b = {}, R.dense && (pe = b["!data"] = []), Te = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, se = ae[3], J = "Sheet" + (se + 1)), Be > 0 && ae[0].r >= Be) break;
            R.dense ? (pe[ae[0].r] || (pe[ae[0].r] = []), pe[ae[0].r][ae[0].c] = ae[1]) : b[Oe(ae[0])] = ae[1], Te.e.c < ae[0].c && (Te.e.c = ae[0].c), Te.e.r < ae[0].r && (Te.e.r = ae[0].r);
            break;
          case 27:
            ae[14e3] && (ge[ae[14e3][0]] = ae[14e3][1]);
            break;
          case 1537:
            ge[ae[0]] = ae[1], ae[0] == se && (J = ae[1]);
            break;
        }
      }, R);
    else throw new Error("Unrecognized LOTUS BOF " + S[2]);
    if (b["!ref"] = Pe(Te), ce[T || J] = b, re.push(T || J), !ge.length) return { SheetNames: re, Sheets: ce };
    for (var je = {}, de = [], Ne = 0; Ne < ge.length; ++Ne) ce[re[Ne]] ? (de.push(ge[Ne] || re[Ne]), je[ge[Ne]] = ce[ge[Ne]] || ce[re[Ne]]) : (de.push(ge[Ne]), je[ge[Ne]] = { "!ref": "A1" });
    return { SheetNames: de, Sheets: je };
  }
  function n(S, L) {
    var R = L || {};
    if (+R.codepage >= 0 && jr(+R.codepage), R.type == "string") throw new Error("Cannot write WK1 to JS string");
    var b = Cn();
    if (!S["!ref"]) throw new Error("Cannot export empty sheet to WK1");
    var J = qe(S["!ref"]), T = S["!data"] != null, se = [];
    Dr(b, 0, i(1030)), Dr(b, 6, o(J));
    for (var ce = Math.min(J.e.r, 8191), re = J.s.c; re <= J.e.c; ++re) se[re] = Me(re);
    for (var ge = J.s.r; ge <= ce; ++ge) {
      var pe = We(ge);
      for (re = J.s.c; re <= J.e.c; ++re) {
        var Te = T ? (S["!data"][ge] || [])[re] : S[se[re] + pe];
        if (!(!Te || Te.t == "z"))
          switch (Te.t) {
            case "n":
              (Te.v | 0) == Te.v && Te.v >= -32768 && Te.v <= 32767 ? Dr(b, 13, x(ge, re, Te)) : Dr(b, 14, _(ge, re, Te));
              break;
            case "d":
              var Be = fr(Te.v);
              (Be | 0) == Be && Be >= -32768 && Be <= 32767 ? Dr(b, 13, x(ge, re, { v: Be, z: Te.z || _e[14] })) : Dr(b, 14, _(ge, re, { v: Be, z: Te.z || _e[14] }));
              break;
            default:
              var $e = pt(Te);
              Dr(b, 15, h(ge, re, $e.slice(0, 239)));
          }
      }
    }
    return Dr(b, 1), b.end();
  }
  function s(S, L) {
    var R = L || {};
    if (+R.codepage >= 0 && jr(+R.codepage), R.type == "string") throw new Error("Cannot write WK3 to JS string");
    var b = Cn();
    Dr(b, 0, c(S));
    for (var J = 0, T = 0; J < S.SheetNames.length; ++J) (S.Sheets[S.SheetNames[J]] || {})["!ref"] && Dr(b, 27, Ee(S.SheetNames[J], T++));
    var se = 0;
    for (J = 0; J < S.SheetNames.length; ++J) {
      var ce = S.Sheets[S.SheetNames[J]];
      if (!(!ce || !ce["!ref"])) {
        for (var re = qe(ce["!ref"]), ge = ce["!data"] != null, pe = [], Te = Math.min(re.e.r, 8191), Be = re.s.r; Be <= Te; ++Be)
          for (var $e = We(Be), je = re.s.c; je <= re.e.c; ++je) {
            Be === re.s.r && (pe[je] = Me(je));
            var de = pe[je] + $e, Ne = ge ? (ce["!data"][Be] || [])[je] : ce[de];
            if (!(!Ne || Ne.t == "z"))
              if (Ne.t == "n")
                Dr(b, 23, j(Be, je, se, Ne.v));
              else {
                var ae = pt(Ne);
                Dr(b, 22, B(Be, je, se, ae.slice(0, 239)));
              }
          }
        ++se;
      }
    }
    return Dr(b, 1), b.end();
  }
  function i(S) {
    var L = sr(2);
    return L.write_shift(2, S), L;
  }
  function c(S) {
    var L = sr(26);
    L.write_shift(2, 4096), L.write_shift(2, 4), L.write_shift(4, 0);
    for (var R = 0, b = 0, J = 0, T = 0; T < S.SheetNames.length; ++T) {
      var se = S.SheetNames[T], ce = S.Sheets[se];
      if (!(!ce || !ce["!ref"])) {
        ++J;
        var re = Dt(ce["!ref"]);
        R < re.e.r && (R = re.e.r), b < re.e.c && (b = re.e.c);
      }
    }
    return R > 8191 && (R = 8191), L.write_shift(2, R), L.write_shift(1, J), L.write_shift(1, b), L.write_shift(2, 0), L.write_shift(2, 0), L.write_shift(1, 1), L.write_shift(1, 2), L.write_shift(4, 0), L.write_shift(4, 0), L;
  }
  function f(S, L, R) {
    var b = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    return L == 8 && R.qpro ? (b.s.c = S.read_shift(1), S.l++, b.s.r = S.read_shift(2), b.e.c = S.read_shift(1), S.l++, b.e.r = S.read_shift(2), b) : (b.s.c = S.read_shift(2), b.s.r = S.read_shift(2), L == 12 && R.qpro && (S.l += 2), b.e.c = S.read_shift(2), b.e.r = S.read_shift(2), L == 12 && R.qpro && (S.l += 2), b.s.c == 65535 && (b.s.c = b.e.c = b.s.r = b.e.r = 0), b);
  }
  function o(S) {
    var L = sr(8);
    return L.write_shift(2, S.s.c), L.write_shift(2, S.s.r), L.write_shift(2, S.e.c), L.write_shift(2, S.e.r), L;
  }
  function l(S, L, R) {
    var b = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
    return R.qpro && R.vers != 20768 ? (b[0].c = S.read_shift(1), b[3] = S.read_shift(1), b[0].r = S.read_shift(2), S.l += 2) : R.works ? (b[0].c = S.read_shift(2), b[0].r = S.read_shift(2), b[2] = S.read_shift(2)) : (b[2] = S.read_shift(1), b[0].c = S.read_shift(2), b[0].r = S.read_shift(2)), b;
  }
  function p(S) {
    return S.z && Jr(S.z) ? 240 | (r.indexOf(S.z) + 1 || 2) : 255;
  }
  function u(S, L, R) {
    var b = S.l + L, J = l(S, L, R);
    if (J[1].t = "s", (R.vers & 65534) == 20768) {
      S.l++;
      var T = S.read_shift(1);
      return J[1].v = S.read_shift(T, "utf8"), J;
    }
    return R.qpro && S.l++, J[1].v = S.read_shift(b - S.l, "cstr"), J;
  }
  function h(S, L, R) {
    var b = sr(7 + R.length);
    b.write_shift(1, 255), b.write_shift(2, L), b.write_shift(2, S), b.write_shift(1, 39);
    for (var J = 0; J < b.length; ++J) {
      var T = R.charCodeAt(J);
      b.write_shift(1, T >= 128 ? 95 : T);
    }
    return b.write_shift(1, 0), b;
  }
  function m(S, L, R) {
    var b = S.l + L, J = l(S, L, R);
    if (J[1].t = "s", R.vers == 20768) {
      var T = S.read_shift(1);
      return J[1].v = S.read_shift(T, "utf8"), J;
    }
    return J[1].v = S.read_shift(b - S.l, "cstr"), J;
  }
  function k(S, L, R) {
    var b = l(S, L, R);
    return b[1].v = S.read_shift(2, "i"), b;
  }
  function x(S, L, R) {
    var b = sr(7);
    return b.write_shift(1, p(R)), b.write_shift(2, L), b.write_shift(2, S), b.write_shift(2, R.v, "i"), b;
  }
  function d(S, L, R) {
    var b = l(S, L, R);
    return b[1].v = S.read_shift(8, "f"), b;
  }
  function _(S, L, R) {
    var b = sr(13);
    return b.write_shift(1, p(R)), b.write_shift(2, L), b.write_shift(2, S), b.write_shift(8, R.v, "f"), b;
  }
  function g(S, L, R) {
    var b = S.l + L, J = l(S, L, R);
    if (J[1].v = S.read_shift(8, "f"), R.qpro) S.l = b;
    else {
      var T = S.read_shift(2);
      P(S.slice(S.l, S.l + T), J), S.l += T;
    }
    return J;
  }
  function C(S, L, R) {
    var b = L & 32768;
    return L &= -32769, L = (b ? S : 0) + (L >= 8192 ? L - 16384 : L), (b ? "" : "$") + (R ? Me(L) : We(L));
  }
  var O = {
    31: ["NA", 0],
    // 0x20: ["ERR", 0],
    33: ["ABS", 1],
    34: ["TRUNC", 1],
    35: ["SQRT", 1],
    36: ["LOG", 1],
    37: ["LN", 1],
    38: ["PI", 0],
    39: ["SIN", 1],
    40: ["COS", 1],
    41: ["TAN", 1],
    42: ["ATAN2", 2],
    43: ["ATAN", 1],
    44: ["ASIN", 1],
    45: ["ACOS", 1],
    46: ["EXP", 1],
    47: ["MOD", 2],
    // 0x30
    49: ["ISNA", 1],
    50: ["ISERR", 1],
    51: ["FALSE", 0],
    52: ["TRUE", 0],
    53: ["RAND", 0],
    54: ["DATE", 3],
    // 0x37 NOW
    // 0x38 PMT
    // 0x39 PV
    // 0x3A FV
    // 0x3B IF
    // 0x3C DAY
    // 0x3D MONTH
    // 0x3E YEAR
    63: ["ROUND", 2],
    64: ["TIME", 3],
    // 0x41 HOUR
    // 0x42 MINUTE
    // 0x43 SECOND
    68: ["ISNUMBER", 1],
    69: ["ISTEXT", 1],
    70: ["LEN", 1],
    71: ["VALUE", 1],
    // 0x48: ["FIXED", ?? 1],
    73: ["MID", 3],
    74: ["CHAR", 1],
    // 0x4B
    // 0x4C FIND
    // 0x4D DATEVALUE
    // 0x4E TIMEVALUE
    // 0x4F CELL
    80: ["SUM", 69],
    81: ["AVERAGEA", 69],
    82: ["COUNTA", 69],
    83: ["MINA", 69],
    84: ["MAXA", 69],
    // 0x55 VLOOKUP
    // 0x56 NPV
    // 0x57 VAR
    // 0x58 STD
    // 0x59 IRR
    // 0x5A HLOOKUP
    // 0x5B DSUM
    // 0x5C DAVERAGE
    // 0x5D DCOUNTA
    // 0x5E DMIN
    // 0x5F DMAX
    // 0x60 DVARP
    // 0x61 DSTDEVP
    // 0x62 INDEX
    // 0x63 COLS
    // 0x64 ROWS
    // 0x65 REPEAT
    102: ["UPPER", 1],
    103: ["LOWER", 1],
    // 0x68 LEFT
    // 0x69 RIGHT
    // 0x6A REPLACE
    107: ["PROPER", 1],
    // 0x6C CELL
    109: ["TRIM", 1],
    // 0x6E CLEAN
    111: ["T", 1]
    // 0x70 V
  }, U = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "",
    "+",
    "-",
    "*",
    "/",
    "^",
    "=",
    "<>",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "<=",
    ">=",
    "<",
    ">",
    "",
    "",
    "",
    "",
    // eslint-disable-line no-mixed-spaces-and-tabs
    "&",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
    // eslint-disable-line no-mixed-spaces-and-tabs
  ];
  function P(S, L) {
    cr(S, 0);
    for (var R = [], b = 0, J = "", T = "", se = "", ce = ""; S.l < S.length; ) {
      var re = S[S.l++];
      switch (re) {
        case 0:
          R.push(S.read_shift(8, "f"));
          break;
        case 1:
          T = C(L[0].c, S.read_shift(2), !0), J = C(L[0].r, S.read_shift(2), !1), R.push(T + J);
          break;
        case 2:
          {
            var ge = C(L[0].c, S.read_shift(2), !0), pe = C(L[0].r, S.read_shift(2), !1);
            T = C(L[0].c, S.read_shift(2), !0), J = C(L[0].r, S.read_shift(2), !1), R.push(ge + pe + ":" + T + J);
          }
          break;
        case 3:
          if (S.l < S.length) {
            console.error("WK1 premature formula end");
            return;
          }
          break;
        case 4:
          R.push("(" + R.pop() + ")");
          break;
        case 5:
          R.push(S.read_shift(2));
          break;
        case 6:
          {
            for (var Te = ""; re = S[S.l++]; ) Te += String.fromCharCode(re);
            R.push('"' + Te.replace(/"/g, '""') + '"');
          }
          break;
        case 8:
          R.push("-" + R.pop());
          break;
        case 23:
          R.push("+" + R.pop());
          break;
        case 22:
          R.push("NOT(" + R.pop() + ")");
          break;
        case 20:
        case 21:
          ce = R.pop(), se = R.pop(), R.push(["AND", "OR"][re - 20] + "(" + se + "," + ce + ")");
          break;
        default:
          if (re < 32 && U[re])
            ce = R.pop(), se = R.pop(), R.push(se + U[re] + ce);
          else if (O[re]) {
            if (b = O[re][1], b == 69 && (b = S[S.l++]), b > R.length) {
              console.error("WK1 bad formula parse 0x" + re.toString(16) + ":|" + R.join("|") + "|");
              return;
            }
            var Be = R.slice(-b);
            R.length -= b, R.push(O[re][0] + "(" + Be.join(",") + ")");
          } else return re <= 7 ? console.error("WK1 invalid opcode " + re.toString(16)) : re <= 24 ? console.error("WK1 unsupported op " + re.toString(16)) : re <= 30 ? console.error("WK1 invalid opcode " + re.toString(16)) : re <= 115 ? console.error("WK1 unsupported function opcode " + re.toString(16)) : console.error("WK1 unrecognized opcode " + re.toString(16));
      }
    }
    R.length == 1 ? L[1].f = "" + R[0] : console.error("WK1 bad formula parse |" + R.join("|") + "|");
  }
  function I(S) {
    var L = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
    return L[0].r = S.read_shift(2), L[3] = S[S.l++], L[0].c = S[S.l++], L;
  }
  function N(S, L) {
    var R = I(S);
    return R[1].t = "s", R[1].v = S.read_shift(L - 4, "cstr"), R;
  }
  function B(S, L, R, b) {
    var J = sr(6 + b.length);
    J.write_shift(2, S), J.write_shift(1, R), J.write_shift(1, L), J.write_shift(1, 39);
    for (var T = 0; T < b.length; ++T) {
      var se = b.charCodeAt(T);
      J.write_shift(1, se >= 128 ? 95 : se);
    }
    return J.write_shift(1, 0), J;
  }
  function M(S, L) {
    var R = I(S);
    R[1].v = S.read_shift(2);
    var b = R[1].v >> 1;
    if (R[1].v & 1)
      switch (b & 7) {
        case 0:
          b = (b >> 3) * 5e3;
          break;
        case 1:
          b = (b >> 3) * 500;
          break;
        case 2:
          b = (b >> 3) / 20;
          break;
        case 3:
          b = (b >> 3) / 200;
          break;
        case 4:
          b = (b >> 3) / 2e3;
          break;
        case 5:
          b = (b >> 3) / 2e4;
          break;
        case 6:
          b = (b >> 3) / 16;
          break;
        case 7:
          b = (b >> 3) / 64;
          break;
      }
    return R[1].v = b, R;
  }
  function X(S, L) {
    var R = I(S), b = S.read_shift(4), J = S.read_shift(4), T = S.read_shift(2);
    if (T == 65535)
      return b === 0 && J === 3221225472 ? (R[1].t = "e", R[1].v = 15) : b === 0 && J === 3489660928 ? (R[1].t = "e", R[1].v = 42) : R[1].v = 0, R;
    var se = T & 32768;
    return T = (T & 32767) - 16446, R[1].v = (1 - se * 2) * (J * Math.pow(2, T + 32) + b * Math.pow(2, T)), R;
  }
  function j(S, L, R, b) {
    var J = sr(14);
    if (J.write_shift(2, S), J.write_shift(1, R), J.write_shift(1, L), b == 0)
      return J.write_shift(4, 0), J.write_shift(4, 0), J.write_shift(2, 65535), J;
    var T = 0, se = 0, ce = 0, re = 0;
    return b < 0 && (T = 1, b = -b), se = Math.log2(b) | 0, b /= Math.pow(2, se - 31), re = b >>> 0, (re & 2147483648) == 0 && (b /= 2, ++se, re = b >>> 0), b -= re, re |= 2147483648, re >>>= 0, b *= Math.pow(2, 32), ce = b >>> 0, J.write_shift(4, ce), J.write_shift(4, re), se += 16383 + (T ? 32768 : 0), J.write_shift(2, se), J;
  }
  function oe(S, L) {
    var R = X(S);
    return S.l += L - 14, R;
  }
  function Z(S, L) {
    var R = I(S), b = S.read_shift(4);
    return R[1].v = b >> 6, R;
  }
  function xe(S, L) {
    var R = I(S), b = S.read_shift(8, "f");
    return R[1].v = b, R;
  }
  function q(S, L) {
    var R = xe(S);
    return S.l += L - 12, R;
  }
  function ie(S, L) {
    return S[S.l + L - 1] == 0 ? S.read_shift(L, "cstr") : "";
  }
  function ve(S, L) {
    var R = S[S.l++];
    R > L - 1 && (R = L - 1);
    for (var b = ""; b.length < R; ) b += String.fromCharCode(S[S.l++]);
    return b;
  }
  function K(S, L, R) {
    if (!(!R.qpro || L < 21)) {
      var b = S.read_shift(1);
      S.l += 17, S.l += 1, S.l += 2;
      var J = S.read_shift(L - 21, "cstr");
      return [b, J];
    }
  }
  function we(S, L) {
    for (var R = {}, b = S.l + L; S.l < b; ) {
      var J = S.read_shift(2);
      if (J == 14e3) {
        for (R[J] = [0, ""], R[J][0] = S.read_shift(2); S[S.l]; )
          R[J][1] += String.fromCharCode(S[S.l]), S.l++;
        S.l++;
      }
    }
    return R;
  }
  function Ee(S, L) {
    var R = sr(5 + S.length);
    R.write_shift(2, 14e3), R.write_shift(2, L);
    for (var b = 0; b < S.length; ++b) {
      var J = S.charCodeAt(b);
      R[R.l++] = J > 127 ? 95 : J;
    }
    return R[R.l++] = 0, R;
  }
  var me = {
    0: { n: "BOF", f: Ye },
    1: { n: "EOF" },
    2: { n: "CALCMODE" },
    3: { n: "CALCORDER" },
    4: { n: "SPLIT" },
    5: { n: "SYNC" },
    6: { n: "RANGE", f },
    7: { n: "WINDOW1" },
    8: { n: "COLW1" },
    9: { n: "WINTWO" },
    10: { n: "COLW2" },
    11: { n: "NAME" },
    12: { n: "BLANK" },
    13: { n: "INTEGER", f: k },
    14: { n: "NUMBER", f: d },
    15: { n: "LABEL", f: u },
    16: { n: "FORMULA", f: g },
    24: { n: "TABLE" },
    25: { n: "ORANGE" },
    26: { n: "PRANGE" },
    27: { n: "SRANGE" },
    28: { n: "FRANGE" },
    29: { n: "KRANGE1" },
    32: { n: "HRANGE" },
    35: { n: "KRANGE2" },
    36: { n: "PROTEC" },
    37: { n: "FOOTER" },
    38: { n: "HEADER" },
    39: { n: "SETUP" },
    40: { n: "MARGINS" },
    41: { n: "LABELFMT" },
    42: { n: "TITLES" },
    43: { n: "SHEETJS" },
    45: { n: "GRAPH" },
    46: { n: "NGRAPH" },
    47: { n: "CALCCOUNT" },
    48: { n: "UNFORMATTED" },
    49: { n: "CURSORW12" },
    50: { n: "WINDOW" },
    51: { n: "STRING", f: m },
    55: { n: "PASSWORD" },
    56: { n: "LOCKED" },
    60: { n: "QUERY" },
    61: { n: "QUERYNAME" },
    62: { n: "PRINT" },
    63: { n: "PRINTNAME" },
    64: { n: "GRAPH2" },
    65: { n: "GRAPHNAME" },
    66: { n: "ZOOM" },
    67: { n: "SYMSPLIT" },
    68: { n: "NSROWS" },
    69: { n: "NSCOLS" },
    70: { n: "RULER" },
    71: { n: "NNAME" },
    72: { n: "ACOMM" },
    73: { n: "AMACRO" },
    74: { n: "PARSE" },
    // 0x0064
    102: { n: "PRANGES??" },
    103: { n: "RRANGES??" },
    104: { n: "FNAME??" },
    105: { n: "MRANGES??" },
    // 0x0096
    // 0x0099
    // 0x009A
    // 0x009B
    // 0x009C
    // 0x00C0
    // 0x00C7
    // 0x00C9
    204: { n: "SHEETNAMECS", f: ie },
    // 0x00CD
    222: { n: "SHEETNAMELP", f: ve },
    255: { n: "BOF", f: Ye },
    21506: { n: "WKSNF", f: Ye },
    65535: { n: "" }
  }, le = {
    0: { n: "BOF" },
    1: { n: "EOF" },
    2: { n: "PASSWORD" },
    3: { n: "CALCSET" },
    4: { n: "WINDOWSET" },
    5: { n: "SHEETCELLPTR" },
    6: { n: "SHEETLAYOUT" },
    7: { n: "COLUMNWIDTH" },
    8: { n: "HIDDENCOLUMN" },
    9: { n: "USERRANGE" },
    10: { n: "SYSTEMRANGE" },
    11: { n: "ZEROFORCE" },
    12: { n: "SORTKEYDIR" },
    13: { n: "FILESEAL" },
    14: { n: "DATAFILLNUMS" },
    15: { n: "PRINTMAIN" },
    16: { n: "PRINTSTRING" },
    17: { n: "GRAPHMAIN" },
    18: { n: "GRAPHSTRING" },
    19: { n: "??" },
    20: { n: "ERRCELL" },
    21: { n: "NACELL" },
    22: { n: "LABEL16", f: N },
    23: { n: "NUMBER17", f: X },
    24: { n: "NUMBER18", f: M },
    25: { n: "FORMULA19", f: oe },
    26: { n: "FORMULA1A" },
    27: { n: "XFORMAT", f: we },
    28: { n: "DTLABELMISC" },
    29: { n: "DTLABELCELL" },
    30: { n: "GRAPHWINDOW" },
    31: { n: "CPA" },
    32: { n: "LPLAUTO" },
    33: { n: "QUERY" },
    34: { n: "HIDDENSHEET" },
    35: { n: "??" },
    37: { n: "NUMBER25", f: Z },
    38: { n: "??" },
    39: { n: "NUMBER27", f: xe },
    40: { n: "FORMULA28", f: q },
    142: { n: "??" },
    147: { n: "??" },
    150: { n: "??" },
    151: { n: "??" },
    152: { n: "??" },
    153: { n: "??" },
    154: { n: "??" },
    155: { n: "??" },
    156: { n: "??" },
    163: { n: "??" },
    174: { n: "??" },
    175: { n: "??" },
    176: { n: "??" },
    177: { n: "??" },
    184: { n: "??" },
    185: { n: "??" },
    186: { n: "??" },
    187: { n: "??" },
    188: { n: "??" },
    195: { n: "??" },
    201: { n: "??" },
    204: { n: "SHEETNAMECS", f: ie },
    205: { n: "??" },
    206: { n: "??" },
    207: { n: "??" },
    208: { n: "??" },
    256: { n: "??" },
    259: { n: "??" },
    260: { n: "??" },
    261: { n: "??" },
    262: { n: "??" },
    263: { n: "??" },
    265: { n: "??" },
    266: { n: "??" },
    267: { n: "??" },
    268: { n: "??" },
    270: { n: "??" },
    271: { n: "??" },
    384: { n: "??" },
    389: { n: "??" },
    390: { n: "??" },
    393: { n: "??" },
    396: { n: "??" },
    512: { n: "??" },
    514: { n: "??" },
    513: { n: "??" },
    516: { n: "??" },
    517: { n: "??" },
    640: { n: "??" },
    641: { n: "??" },
    642: { n: "??" },
    643: { n: "??" },
    644: { n: "??" },
    645: { n: "??" },
    646: { n: "??" },
    647: { n: "??" },
    648: { n: "??" },
    658: { n: "??" },
    659: { n: "??" },
    660: { n: "??" },
    661: { n: "??" },
    662: { n: "??" },
    665: { n: "??" },
    666: { n: "??" },
    768: { n: "??" },
    772: { n: "??" },
    1537: { n: "SHEETINFOQP", f: K },
    1600: { n: "??" },
    1602: { n: "??" },
    1793: { n: "??" },
    1794: { n: "??" },
    1795: { n: "??" },
    1796: { n: "??" },
    1920: { n: "??" },
    2048: { n: "??" },
    2049: { n: "??" },
    2052: { n: "??" },
    2688: { n: "??" },
    10998: { n: "??" },
    12849: { n: "??" },
    28233: { n: "??" },
    28484: { n: "??" },
    65535: { n: "" }
  }, Ae = {
    5: "dd-mmm-yy",
    6: "dd-mmm",
    7: "mmm-yy",
    8: "mm/dd/yy",
    // Long Date Intl
    10: "hh:mm:ss AM/PM",
    11: "hh:mm AM/PM",
    14: "dd-mmm-yyyy",
    15: "mmm-yyyy",
    /* It is suspected that the the low nybble specifies decimal places */
    34: "0.00",
    50: "0.00;[Red]0.00",
    66: "0.00;(0.00)",
    82: "0.00;[Red](0.00)",
    162: '"$"#,##0.00;\\("$"#,##0.00\\)',
    288: "0%",
    304: "0E+00",
    320: "# ?/?"
  };
  function ke(S) {
    var L = S.read_shift(2), R = S.read_shift(1);
    if (R != 0) throw "unsupported QPW string type " + R.toString(16);
    return S.read_shift(L, "sbcs-cont");
  }
  function Se(S, L) {
    cr(S, 0);
    var R = L || {}, b = {};
    R.dense && (b["!data"] = []);
    var J = [], T = "", se = { s: { r: -1, c: -1 }, e: { r: -1, c: -1 } }, ce = 0, re = 0, ge = 0, pe = 0, Te = { SheetNames: [], Sheets: {} }, Be = [];
    e: for (; S.l < S.length; ) {
      var $e = S.read_shift(2), je = S.read_shift(2), de = S.slice(S.l, S.l + je);
      switch (cr(de, 0), $e) {
        case 1:
          if (de.read_shift(4) != 962023505) throw "Bad QPW9 BOF!";
          break;
        case 2:
          break e;
        case 8:
          break;
        // TODO: this is tied to custom number formats
        case 10:
          for (var Ne = de.read_shift(4), ae = (de.length - de.l) / Ne | 0, Nr = 0; Nr < Ne; ++Nr) {
            var Tr = de.l + ae, Xe = {};
            de.l += 2, Xe.numFmtId = de.read_shift(2), Ae[Xe.numFmtId] && (Xe.z = Ae[Xe.numFmtId]), de.l = Tr, Be.push(Xe);
          }
          break;
        /* TODO: The behavior here should be consistent with Numbers: QP Notebook ~ .TN.SheetArchive, QP Sheet ~ .TST.TableModelArchive */
        case 1025:
          break;
        case 1026:
          break;
        case 1031:
          for (de.l += 12; de.l < de.length; )
            ce = de.read_shift(2), re = de.read_shift(1), J.push(de.read_shift(ce, "cstr"));
          break;
        case 1032:
          break;
        case 1537:
          {
            var zr = de.read_shift(2);
            b = {}, R.dense && (b["!data"] = []), se.s.c = de.read_shift(2), se.e.c = de.read_shift(2), se.s.r = de.read_shift(4), se.e.r = de.read_shift(4), de.l += 4, de.l + 2 < de.length && (ce = de.read_shift(2), re = de.read_shift(1), T = ce == 0 ? "" : de.read_shift(ce, "cstr")), T || (T = Me(zr));
          }
          break;
        case 1538:
          {
            if (se.s.c > 255 || se.s.r > 999999) break;
            se.e.c < se.s.c && (se.e.c = se.s.c), se.e.r < se.s.r && (se.e.r = se.s.r), b["!ref"] = Pe(se), Ca(Te, b, T);
          }
          break;
        case 2561:
          ge = de.read_shift(2), se.e.c < ge && (se.e.c = ge), se.s.c > ge && (se.s.c = ge), pe = de.read_shift(4), se.s.r > pe && (se.s.r = pe), pe = de.read_shift(4), se.e.r < pe && (se.e.r = pe);
          break;
        case 3073:
          {
            pe = de.read_shift(4), ce = de.read_shift(4), se.s.r > pe && (se.s.r = pe), se.e.r < pe + ce - 1 && (se.e.r = pe + ce - 1);
            for (var yr = Me(ge); de.l < de.length; ) {
              var fe = { t: "z" }, Le = de.read_shift(1), Qe = -1;
              Le & 128 && (Qe = de.read_shift(2));
              var er = Le & 64 ? de.read_shift(2) - 1 : 0;
              switch (Le & 31) {
                case 0:
                  break;
                case 1:
                  break;
                case 2:
                  fe = { t: "n", v: de.read_shift(2) };
                  break;
                case 3:
                  fe = { t: "n", v: de.read_shift(2, "i") };
                  break;
                case 4:
                  fe = { t: "n", v: cn(de) };
                  break;
                case 5:
                  fe = { t: "n", v: de.read_shift(8, "f") };
                  break;
                case 7:
                  fe = { t: "s", v: J[re = de.read_shift(4) - 1] };
                  break;
                case 8:
                  fe = { t: "n", v: de.read_shift(8, "f") }, de.l += 2, de.l += 4, isNaN(fe.v) && (fe = { t: "e", v: 15 });
                  break;
                default:
                  throw "Unrecognized QPW cell type " + (Le & 31);
              }
              Qe != -1 && (Be[Qe - 1] || {}).z && (fe.z = Be[Qe - 1].z);
              var et = 0;
              if (Le & 32) switch (Le & 31) {
                case 2:
                  et = de.read_shift(2);
                  break;
                case 3:
                  et = de.read_shift(2, "i");
                  break;
                case 7:
                  et = de.read_shift(2);
                  break;
                default:
                  throw "Unsupported delta for QPW cell type " + (Le & 31);
              }
              if (!(!R.sheetStubs && fe.t == "z")) {
                var kt = ir(fe);
                fe.t == "n" && fe.z && Jr(fe.z) && R.cellDates && (kt.v = dt(fe.v), kt.t = typeof kt.v == "number" ? "n" : "d"), b["!data"] != null ? (b["!data"][pe] || (b["!data"][pe] = []), b["!data"][pe][ge] = kt) : b[yr + We(pe)] = kt;
              }
              for (++pe, --ce; er-- > 0 && ce >= 0; ) {
                if (Le & 32) switch (Le & 31) {
                  case 2:
                    fe = { t: "n", v: fe.v + et & 65535 };
                    break;
                  case 3:
                    fe = { t: "n", v: fe.v + et & 65535 }, fe.v > 32767 && (fe.v -= 65536);
                    break;
                  case 7:
                    fe = { t: "s", v: J[re = re + et >>> 0] };
                    break;
                  default:
                    throw "Cannot apply delta for QPW cell type " + (Le & 31);
                }
                else switch (Le & 31) {
                  case 1:
                    fe = { t: "z" };
                    break;
                  case 2:
                    fe = { t: "n", v: de.read_shift(2) };
                    break;
                  case 7:
                    fe = { t: "s", v: J[re = de.read_shift(4) - 1] };
                    break;
                  default:
                    throw "Cannot apply repeat for QPW cell type " + (Le & 31);
                }
                !R.sheetStubs && fe.t == "z" || (b["!data"] != null ? (b["!data"][pe] || (b["!data"][pe] = []), b["!data"][pe][ge] = fe) : b[yr + We(pe)] = fe), ++pe, --ce;
              }
            }
          }
          break;
        case 3074:
          {
            ge = de.read_shift(2), pe = de.read_shift(4);
            var ba = ke(de);
            b["!data"] != null ? (b["!data"][pe] || (b["!data"][pe] = []), b["!data"][pe][ge] = { t: "s", v: ba }) : b[Me(ge) + We(pe)] = { t: "s", v: ba };
          }
          break;
      }
      S.l += je;
    }
    return Te;
  }
  return {
    sheet_to_wk1: n,
    book_to_wk3: s,
    to_workbook: t
  };
})();
function Ru(e) {
  var t = {}, r = e.match(pr), a = 0, n = !1;
  if (r) for (; a != r.length; ++a) {
    var s = ue(r[a]);
    switch (s[0].replace(/<\w*:/g, "<")) {
      /* 18.8.12 condense CT_BooleanProperty */
      /* ** not required . */
      case "<condense":
        break;
      /* 18.8.17 extend CT_BooleanProperty */
      /* ** not required . */
      case "<extend":
        break;
      /* 18.8.36 shadow CT_BooleanProperty */
      /* ** not required . */
      case "<shadow":
        if (!s.val) break;
      /* falls through */
      case "<shadow>":
      case "<shadow/>":
        t.shadow = 1;
        break;
      case "</shadow>":
        break;
      /* 18.4.1 charset CT_IntProperty TODO */
      case "<charset":
        if (s.val == "1") break;
        t.cp = Bn[parseInt(s.val, 10)];
        break;
      /* 18.4.2 outline CT_BooleanProperty TODO */
      case "<outline":
        if (!s.val) break;
      /* falls through */
      case "<outline>":
      case "<outline/>":
        t.outline = 1;
        break;
      case "</outline>":
        break;
      /* 18.4.5 rFont CT_FontName */
      case "<rFont":
        t.name = s.val;
        break;
      /* 18.4.11 sz CT_FontSize */
      case "<sz":
        t.sz = s.val;
        break;
      /* 18.4.10 strike CT_BooleanProperty */
      case "<strike":
        if (!s.val) break;
      /* falls through */
      case "<strike>":
      case "<strike/>":
        t.strike = 1;
        break;
      case "</strike>":
        break;
      /* 18.4.13 u CT_UnderlineProperty */
      case "<u":
        if (!s.val) break;
        switch (s.val) {
          case "double":
            t.uval = "double";
            break;
          case "singleAccounting":
            t.uval = "single-accounting";
            break;
          case "doubleAccounting":
            t.uval = "double-accounting";
            break;
        }
      /* falls through */
      case "<u>":
      case "<u/>":
        t.u = 1;
        break;
      case "</u>":
        break;
      /* 18.8.2 b */
      case "<b":
        if (s.val == "0") break;
      /* falls through */
      case "<b>":
      case "<b/>":
        t.b = 1;
        break;
      case "</b>":
        break;
      /* 18.8.26 i */
      case "<i":
        if (s.val == "0") break;
      /* falls through */
      case "<i>":
      case "<i/>":
        t.i = 1;
        break;
      case "</i>":
        break;
      /* 18.3.1.15 color CT_Color TODO: tint, theme, auto, indexed */
      case "<color":
        s.rgb && (t.color = s.rgb.slice(2, 8));
        break;
      case "<color>":
      case "<color/>":
      case "</color>":
        break;
      /* 18.8.18 family ST_FontFamily */
      case "<family":
        t.family = s.val;
        break;
      case "<family>":
      case "<family/>":
      case "</family>":
        break;
      /* 18.4.14 vertAlign CT_VerticalAlignFontProperty TODO */
      case "<vertAlign":
        t.valign = s.val;
        break;
      case "<vertAlign>":
      case "<vertAlign/>":
      case "</vertAlign>":
        break;
      /* 18.8.35 scheme CT_FontScheme TODO */
      case "<scheme":
        break;
      case "<scheme>":
      case "<scheme/>":
      case "</scheme>":
        break;
      /* 18.2.10 extLst CT_ExtensionList ? */
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        n = !0;
        break;
      case "</ext>":
        n = !1;
        break;
      default:
        if (s[0].charCodeAt(1) !== 47 && !n) throw new Error("Unrecognized rich format " + s[0]);
    }
  }
  return t;
}
var Iu = /* @__PURE__ */ (function() {
  function e(a) {
    var n = hr(a, "t");
    if (!n) return { t: "s", v: "" };
    var s = { t: "s", v: be(n[1]) }, i = hr(a, "rPr");
    return i && (s.s = Ru(i[1])), s;
  }
  var t = /<(?:\w+:)?r>/g, r = /<\/(?:\w+:)?r>/;
  return function(n) {
    return n.replace(t, "").split(r).map(e).filter(function(s) {
      return s.v;
    });
  };
})(), Ou = /* @__PURE__ */ (function() {
  var t = /(\r\n|\n)/g;
  function r(n, s, i) {
    var c = [];
    n.u && c.push("text-decoration: underline;"), n.uval && c.push("text-underline-style:" + n.uval + ";"), n.sz && c.push("font-size:" + n.sz + "pt;"), n.outline && c.push("text-effect: outline;"), n.shadow && c.push("text-shadow: auto;"), s.push('<span style="' + c.join("") + '">'), n.b && (s.push("<b>"), i.push("</b>")), n.i && (s.push("<i>"), i.push("</i>")), n.strike && (s.push("<s>"), i.push("</s>"));
    var f = n.valign || "";
    return f == "superscript" || f == "super" ? f = "sup" : f == "subscript" && (f = "sub"), f != "" && (s.push("<" + f + ">"), i.push("</" + f + ">")), i.push("</span>"), n;
  }
  function a(n) {
    var s = [[], n.v, []];
    return n.v ? (n.s && r(n.s, s[0], s[2]), s[0].join("") + s[1].replace(t, "<br/>") + s[2].join("")) : "";
  }
  return function(s) {
    return s.map(a).join("");
  };
})(), Mu = /<(?:\w+:)?t\b[^<>]*>([^<]*)<\/(?:\w+:)?t>/g, Lu = /<(?:\w+:)?r\b[^<>]*>/;
function Qn(e, t) {
  var r = t ? t.cellHTML : !0, a = {};
  return e ? (e.match(/^\s*<(?:\w+:)?t[^>]*>/) ? (a.t = be(Ve(e.slice(e.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] || ""), !0), a.r = Ve(e), r && (a.h = ra(a.t))) : (
    /*y = */
    e.match(Lu) && (a.r = Ve(e), a.t = be(Ve((Go(e, "rPh").match(Mu) || []).join("").replace(pr, "")), !0), r && (a.h = Ou(Iu(a.r))))
  ), a) : { t: "" };
}
var Bu = /<(?:\w+:)?(?:si|sstItem)>/g, Uu = /<\/(?:\w+:)?(?:si|sstItem)>/;
function Hu(e, t) {
  var r = [], a = "";
  if (!e) return r;
  var n = hr(e, "sst");
  if (n) {
    a = n[1].replace(Bu, "").split(Uu);
    for (var s = 0; s != a.length; ++s) {
      var i = Qn(a[s].trim(), t);
      i != null && (r[r.length] = i);
    }
    n = ue(n[0].slice(0, n[0].indexOf(">"))), r.Count = n.count, r.Unique = n.uniqueCount;
  }
  return r;
}
function Wu(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function Vu(e, t) {
  var r = [], a = !1;
  return ft(e, function(s, i, c) {
    switch (c) {
      case 159:
        r.Count = s[0], r.Unique = s[1];
        break;
      case 19:
        r.push(s);
        break;
      case 160:
        return !0;
      case 35:
        a = !0;
        break;
      case 36:
        a = !1;
        break;
      default:
        if (i.T, !a || t.WTF) throw new Error("Unexpected record 0x" + c.toString(16));
    }
  }), r;
}
function Di(e) {
  for (var t = [], r = e.split(""), a = 0; a < r.length; ++a) t[a] = r[a].charCodeAt(0);
  return t;
}
function it(e, t) {
  var r = {};
  return r.Major = e.read_shift(2), r.Minor = e.read_shift(2), t >= 4 && (e.l += t - 4), r;
}
function $u(e) {
  var t = {};
  return t.id = e.read_shift(0, "lpp4"), t.R = it(e, 4), t.U = it(e, 4), t.W = it(e, 4), t;
}
function Gu(e) {
  for (var t = e.read_shift(4), r = e.l + t - 4, a = {}, n = e.read_shift(4), s = []; n-- > 0; ) s.push({ t: e.read_shift(4), v: e.read_shift(0, "lpp4") });
  if (a.name = e.read_shift(0, "lpp4"), a.comps = s, e.l != r) throw new Error("Bad DataSpaceMapEntry: " + e.l + " != " + r);
  return a;
}
function Xu(e) {
  var t = [];
  e.l += 4;
  for (var r = e.read_shift(4); r-- > 0; ) t.push(Gu(e));
  return t;
}
function zu(e) {
  var t = [];
  e.l += 4;
  for (var r = e.read_shift(4); r-- > 0; ) t.push(e.read_shift(0, "lpp4"));
  return t;
}
function Ku(e) {
  var t = {};
  return e.read_shift(4), e.l += 4, t.id = e.read_shift(0, "lpp4"), t.name = e.read_shift(0, "lpp4"), t.R = it(e, 4), t.U = it(e, 4), t.W = it(e, 4), t;
}
function ju(e) {
  var t = Ku(e);
  if (t.ename = e.read_shift(0, "8lpp4"), t.blksz = e.read_shift(4), t.cmode = e.read_shift(4), e.read_shift(4) != 4) throw new Error("Bad !Primary record");
  return t;
}
function Ri(e, t) {
  var r = e.l + t, a = {};
  a.Flags = e.read_shift(4) & 63, e.l += 4, a.AlgID = e.read_shift(4);
  var n = !1;
  switch (a.AlgID) {
    case 26126:
    case 26127:
    case 26128:
      n = a.Flags == 36;
      break;
    case 26625:
      n = a.Flags == 4;
      break;
    case 0:
      n = a.Flags == 16 || a.Flags == 4 || a.Flags == 36;
      break;
    default:
      throw "Unrecognized encryption algorithm: " + a.AlgID;
  }
  if (!n) throw new Error("Encryption Flags/AlgID mismatch");
  return a.AlgIDHash = e.read_shift(4), a.KeySize = e.read_shift(4), a.ProviderType = e.read_shift(4), e.l += 8, a.CSPName = e.read_shift(r - e.l >> 1, "utf16le"), e.l = r, a;
}
function Ii(e, t) {
  var r = {}, a = e.l + t;
  return e.l += 4, r.Salt = e.slice(e.l, e.l + 16), e.l += 16, r.Verifier = e.slice(e.l, e.l + 16), e.l += 16, e.read_shift(4), r.VerifierHash = e.slice(e.l, a), e.l = a, r;
}
function Yu(e) {
  var t = it(e);
  switch (t.Minor) {
    case 2:
      return [t.Minor, Ju(e)];
    case 3:
      return [t.Minor, Zu()];
    case 4:
      return [t.Minor, qu(e)];
  }
  throw new Error("ECMA-376 Encrypted file unrecognized Version: " + t.Minor);
}
function Ju(e) {
  var t = e.read_shift(4);
  if ((t & 63) != 36) throw new Error("EncryptionInfo mismatch");
  var r = e.read_shift(4), a = Ri(e, r), n = Ii(e, e.length - e.l);
  return { t: "Std", h: a, v: n };
}
function Zu() {
  throw new Error("File is password-protected: ECMA-376 Extensible");
}
function qu(e) {
  var t = ["saltSize", "blockSize", "keyBits", "hashSize", "cipherAlgorithm", "cipherChaining", "hashAlgorithm", "saltValue"];
  e.l += 4;
  var r = e.read_shift(e.length - e.l, "utf8"), a = {};
  return r.replace(pr, function(s) {
    var i = ue(s);
    switch (Gr(i[0])) {
      case "<?xml":
        break;
      case "<encryption":
      case "</encryption>":
        break;
      case "<keyData":
        t.forEach(function(c) {
          a[c] = i[c];
        });
        break;
      case "<dataIntegrity":
        a.encryptedHmacKey = i.encryptedHmacKey, a.encryptedHmacValue = i.encryptedHmacValue;
        break;
      case "<keyEncryptors>":
      case "<keyEncryptors":
        a.encs = [];
        break;
      case "</keyEncryptors>":
        break;
      case "<keyEncryptor":
        a.uri = i.uri;
        break;
      case "</keyEncryptor>":
        break;
      case "<encryptedKey":
        a.encs.push(i);
        break;
      default:
        throw i[0];
    }
  }), a;
}
function Qu(e, t) {
  var r = {}, a = r.EncryptionVersionInfo = it(e, 4);
  if (t -= 4, a.Minor != 2) throw new Error("unrecognized minor version code: " + a.Minor);
  if (a.Major > 4 || a.Major < 2) throw new Error("unrecognized major version code: " + a.Major);
  r.Flags = e.read_shift(4), t -= 4;
  var n = e.read_shift(4);
  return t -= 4, r.EncryptionHeader = Ri(e, n), t -= n, r.EncryptionVerifier = Ii(e, t), r;
}
function e1(e) {
  var t = {}, r = t.EncryptionVersionInfo = it(e, 4);
  if (r.Major != 1 || r.Minor != 1) throw "unrecognized version code " + r.Major + " : " + r.Minor;
  return t.Salt = e.read_shift(16), t.EncryptedVerifier = e.read_shift(16), t.EncryptedVerifierHash = e.read_shift(16), t;
}
function r1(e) {
  var t = 0, r, a = Di(e), n = a.length + 1, s, i, c, f, o;
  for (r = xt(n), r[0] = a.length, s = 1; s != n; ++s) r[s] = a[s - 1];
  for (s = n - 1; s >= 0; --s)
    i = r[s], c = (t & 16384) === 0 ? 0 : 1, f = t << 1 & 32767, o = c | f, t = o ^ i;
  return t ^ 52811;
}
var Oi = /* @__PURE__ */ (function() {
  var e = [187, 255, 255, 186, 255, 255, 185, 128, 0, 190, 15, 0, 191, 15, 0], t = [57840, 7439, 52380, 33984, 4364, 3600, 61902, 12606, 6258, 57657, 54287, 34041, 10252, 43370, 20163], r = [44796, 19929, 39858, 10053, 20106, 40212, 10761, 31585, 63170, 64933, 60267, 50935, 40399, 11199, 17763, 35526, 1453, 2906, 5812, 11624, 23248, 885, 1770, 3540, 7080, 14160, 28320, 56640, 55369, 41139, 20807, 41614, 21821, 43642, 17621, 28485, 56970, 44341, 19019, 38038, 14605, 29210, 60195, 50791, 40175, 10751, 21502, 43004, 24537, 18387, 36774, 3949, 7898, 15796, 31592, 63184, 47201, 24803, 49606, 37805, 14203, 28406, 56812, 17824, 35648, 1697, 3394, 6788, 13576, 27152, 43601, 17539, 35078, 557, 1114, 2228, 4456, 30388, 60776, 51953, 34243, 7079, 14158, 28316, 14128, 28256, 56512, 43425, 17251, 34502, 7597, 13105, 26210, 52420, 35241, 883, 1766, 3532, 4129, 8258, 16516, 33032, 4657, 9314, 18628], a = function(i) {
    return (i / 2 | i * 128) & 255;
  }, n = function(i, c) {
    return a(i ^ c);
  }, s = function(i) {
    for (var c = t[i.length - 1], f = 104, o = i.length - 1; o >= 0; --o)
      for (var l = i[o], p = 0; p != 7; ++p)
        l & 64 && (c ^= r[f]), l *= 2, --f;
    return c;
  };
  return function(i) {
    for (var c = Di(i), f = s(c), o = c.length, l = xt(16), p = 0; p != 16; ++p) l[p] = 0;
    var u, h, m;
    for ((o & 1) === 1 && (u = f >> 8, l[o] = n(e[0], u), --o, u = f & 255, h = c[c.length - 1], l[o] = n(h, u)); o > 0; )
      --o, u = f >> 8, l[o] = n(c[o], u), --o, u = f & 255, l[o] = n(c[o], u);
    for (o = 15, m = 15 - c.length; m > 0; )
      u = f >> 8, l[o] = n(e[m], u), --o, --m, u = f & 255, l[o] = n(c[o], u), --o, --m;
    return l;
  };
})(), t1 = function(e, t, r, a, n) {
  n || (n = t), a || (a = Oi(e));
  var s, i;
  for (s = 0; s != t.length; ++s)
    i = t[s], i ^= a[r], i = (i >> 5 | i << 3) & 255, n[s] = i, ++r;
  return [n, r, a];
}, a1 = function(e) {
  var t = 0, r = Oi(e);
  return function(a) {
    var n = t1("", a, t, r);
    return t = n[1], n[0];
  };
};
function n1(e, t, r, a) {
  var n = { key: Ye(e), verificationBytes: Ye(e) };
  return r.password && (n.verifier = r1(r.password)), a.valid = n.verificationBytes === n.verifier, a.valid && (a.insitu = a1(r.password)), n;
}
function s1(e, t, r) {
  var a = r || {};
  return a.Info = e.read_shift(2), e.l -= 2, a.Info === 1 ? a.Data = e1(e) : a.Data = Qu(e, t), a;
}
function i1(e, t, r) {
  var a = { Type: r.biff >= 8 ? e.read_shift(2) : 0 };
  return a.Type ? s1(e, t - 2, a) : n1(e, r.biff >= 8 ? t : t - 2, r, a), a;
}
function c1(e, t) {
  switch (t.type) {
    case "base64":
      return Ba(Mr(e), t);
    case "binary":
      return Ba(e, t);
    case "buffer":
      return Ba(Ce && Buffer.isBuffer(e) ? e.toString("binary") : ct(e), t);
    case "array":
      return Ba(Ct(e), t);
  }
  throw new Error("Unrecognized type " + t.type);
}
function Ba(e, t) {
  var r = t || {}, a = {}, n = r.dense;
  n && (a["!data"] = []);
  var s = Xn(e, "\\trowd", "\\row");
  if (!s)
    throw new Error("RTF missing table");
  var i = { s: { c: 0, r: 0 }, e: { c: 0, r: s.length - 1 } }, c = [];
  return s.forEach(function(f, o) {
    n && (c = a["!data"][o] = []);
    for (var l = /\\[\w\-]+\b/g, p = 0, u, h = -1, m = []; (u = l.exec(f)) != null; ) {
      var k = f.slice(p, l.lastIndex - u[0].length);
      switch (k.charCodeAt(0) == 32 && (k = k.slice(1)), k.length && m.push(k), u[0]) {
        case "\\cell":
          if (++h, m.length) {
            var x = { v: m.join(""), t: "s" };
            x.v == "TRUE" || x.v == "FALSE" ? (x.v = x.v == "TRUE", x.t = "b") : isNaN(Or(x.v)) ? ur[x.v] != null && (x.t = "e", x.w = x.v, x.v = ur[x.v]) : (x.t = "n", r.cellText !== !1 && (x.w = x.v), x.v = Or(x.v)), n ? c[h] = x : a[Oe({ r: o, c: h })] = x;
          }
          m = [];
          break;
        case "\\par":
          m.push(`
`);
          break;
      }
      p = l.lastIndex;
    }
    h > i.e.c && (i.e.c = h);
  }), a["!ref"] = Pe(i), a;
}
function f1(e, t) {
  var r = vt(c1(e, t), t);
  return r.bookType = "rtf", r;
}
function o1(e) {
  var t = e.slice(e[0] === "#" ? 1 : 0).slice(0, 6);
  return [parseInt(t.slice(0, 2), 16), parseInt(t.slice(2, 4), 16), parseInt(t.slice(4, 6), 16)];
}
function va(e) {
  for (var t = 0, r = 1; t != 3; ++t) r = r * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
  return r.toString(16).toUpperCase().slice(1);
}
function l1(e) {
  var t = e[0] / 255, r = e[1] / 255, a = e[2] / 255, n = Math.max(t, r, a), s = Math.min(t, r, a), i = n - s;
  if (i === 0) return [0, 0, t];
  var c = 0, f = 0, o = n + s;
  switch (f = i / (o > 1 ? 2 - o : o), n) {
    case t:
      c = ((r - a) / i + 6) % 6;
      break;
    case r:
      c = (a - t) / i + 2;
      break;
    case a:
      c = (t - r) / i + 4;
      break;
  }
  return [c / 6, f, o / 2];
}
function h1(e) {
  var t = e[0], r = e[1], a = e[2], n = r * 2 * (a < 0.5 ? a : 1 - a), s = a - n / 2, i = [s, s, s], c = 6 * t, f;
  if (r !== 0) switch (c | 0) {
    case 0:
    case 6:
      f = n * c, i[0] += n, i[1] += f;
      break;
    case 1:
      f = n * (2 - c), i[0] += f, i[1] += n;
      break;
    case 2:
      f = n * (c - 2), i[1] += n, i[2] += f;
      break;
    case 3:
      f = n * (4 - c), i[1] += f, i[2] += n;
      break;
    case 4:
      f = n * (c - 4), i[2] += n, i[0] += f;
      break;
    case 5:
      f = n * (6 - c), i[2] += f, i[0] += n;
      break;
  }
  for (var o = 0; o != 3; ++o) i[o] = Math.round(i[o] * 255);
  return i;
}
function qa(e, t) {
  if (t === 0) return e;
  var r = l1(o1(e));
  return t < 0 ? r[2] = r[2] * (1 + t) : r[2] = 1 - (1 - r[2]) * (1 - t), va(h1(r));
}
var Mi = 6, u1 = 15, d1 = 1, Fr = Mi;
function Qa(e) {
  return Math.floor((e + Math.round(128 / Fr) / 256) * Fr);
}
function en(e) {
  return Math.floor((e - 5) / Fr * 100 + 0.5) / 100;
}
function Nn(e) {
  return Math.round((e * Fr + 5) / Fr * 256) / 256;
}
function _n(e) {
  return Nn(en(Qa(e)));
}
function es(e) {
  var t = Math.abs(e - _n(e)), r = Fr;
  if (t > 5e-3) for (Fr = d1; Fr < u1; ++Fr) Math.abs(e - _n(e)) <= t && (t = Math.abs(e - _n(e)), r = Fr);
  Fr = r;
}
function Xt(e) {
  e.width ? (e.wpx = Qa(e.width), e.wch = en(e.wpx), e.MDW = Fr) : e.wpx ? (e.wch = en(e.wpx), e.width = Nn(e.wch), e.MDW = Fr) : typeof e.wch == "number" && (e.width = Nn(e.wch), e.wpx = Qa(e.width), e.MDW = Fr), e.customWidth && delete e.customWidth;
}
var x1 = 96, Li = x1;
function Bi(e) {
  return e * 96 / Li;
}
function ka(e) {
  return e * Li / 96;
}
var p1 = {
  None: "none",
  Solid: "solid",
  Gray50: "mediumGray",
  Gray75: "darkGray",
  Gray25: "lightGray",
  HorzStripe: "darkHorizontal",
  VertStripe: "darkVertical",
  ReverseDiagStripe: "darkDown",
  DiagStripe: "darkUp",
  DiagCross: "darkGrid",
  ThickDiagCross: "darkTrellis",
  ThinHorzStripe: "lightHorizontal",
  ThinVertStripe: "lightVertical",
  ThinReverseDiagStripe: "lightDown",
  ThinHorzCross: "lightGrid"
};
function m1(e, t, r, a) {
  t.Borders = [];
  var n = {}, s = !1;
  (e.match(pr) || []).forEach(function(i) {
    var c = ue(i);
    switch (Gr(c[0])) {
      case "<borders":
      case "<borders>":
      case "</borders>":
        break;
      /* 18.8.4 border CT_Border */
      case "<border":
      case "<border>":
      case "<border/>":
        n = /*::(*/
        {}, c.diagonalUp && (n.diagonalUp = He(c.diagonalUp)), c.diagonalDown && (n.diagonalDown = He(c.diagonalDown)), t.Borders.push(n);
        break;
      case "</border>":
        break;
      /* note: not in spec, appears to be CT_BorderPr */
      case "<left/>":
        break;
      case "<left":
      case "<left>":
        break;
      case "</left>":
        break;
      /* note: not in spec, appears to be CT_BorderPr */
      case "<right/>":
        break;
      case "<right":
      case "<right>":
        break;
      case "</right>":
        break;
      /* 18.8.43 top CT_BorderPr */
      case "<top/>":
        break;
      case "<top":
      case "<top>":
        break;
      case "</top>":
        break;
      /* 18.8.6 bottom CT_BorderPr */
      case "<bottom/>":
        break;
      case "<bottom":
      case "<bottom>":
        break;
      case "</bottom>":
        break;
      /* 18.8.13 diagonal CT_BorderPr */
      case "<diagonal":
      case "<diagonal>":
      case "<diagonal/>":
        break;
      case "</diagonal>":
        break;
      /* 18.8.25 horizontal CT_BorderPr */
      case "<horizontal":
      case "<horizontal>":
      case "<horizontal/>":
        break;
      case "</horizontal>":
        break;
      /* 18.8.44 vertical CT_BorderPr */
      case "<vertical":
      case "<vertical>":
      case "<vertical/>":
        break;
      case "</vertical>":
        break;
      /* 18.8.37 start CT_BorderPr */
      case "<start":
      case "<start>":
      case "<start/>":
        break;
      case "</start>":
        break;
      /* 18.8.16 end CT_BorderPr */
      case "<end":
      case "<end>":
      case "<end/>":
        break;
      case "</end>":
        break;
      /* 18.8.? color CT_Color */
      case "<color":
      case "<color>":
        break;
      case "<color/>":
      case "</color>":
        break;
      /* 18.2.10 extLst CT_ExtensionList ? */
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        s = !0;
        break;
      case "</ext>":
        s = !1;
        break;
      default:
        if (a && a.WTF && !s)
          throw new Error("unrecognized " + c[0] + " in borders");
    }
  });
}
function g1(e, t, r, a) {
  t.Fills = [];
  var n = {}, s = !1;
  (e.match(pr) || []).forEach(function(i) {
    var c = ue(i);
    switch (Gr(c[0])) {
      case "<fills":
      case "<fills>":
      case "</fills>":
        break;
      /* 18.8.20 fill CT_Fill */
      case "<fill>":
      case "<fill":
      case "<fill/>":
        n = {}, t.Fills.push(n);
        break;
      case "</fill>":
        break;
      /* 18.8.24 gradientFill CT_GradientFill */
      case "<gradientFill>":
        break;
      case "<gradientFill":
      case "</gradientFill>":
        t.Fills.push(n), n = {};
        break;
      /* 18.8.32 patternFill CT_PatternFill */
      case "<patternFill":
      case "<patternFill>":
        c.patternType && (n.patternType = c.patternType);
        break;
      case "<patternFill/>":
      case "</patternFill>":
        break;
      /* 18.8.3 bgColor CT_Color */
      case "<bgColor":
        n.bgColor || (n.bgColor = {}), c.indexed && (n.bgColor.indexed = parseInt(c.indexed, 10)), c.theme && (n.bgColor.theme = parseInt(c.theme, 10)), c.tint && (n.bgColor.tint = parseFloat(c.tint)), c.rgb && (n.bgColor.rgb = c.rgb.slice(-6));
        break;
      case "<bgColor/>":
      case "</bgColor>":
        break;
      /* 18.8.19 fgColor CT_Color */
      case "<fgColor":
        n.fgColor || (n.fgColor = {}), c.theme && (n.fgColor.theme = parseInt(c.theme, 10)), c.tint && (n.fgColor.tint = parseFloat(c.tint)), c.rgb != null && (n.fgColor.rgb = c.rgb.slice(-6));
        break;
      case "<fgColor/>":
      case "</fgColor>":
        break;
      /* 18.8.38 stop CT_GradientStop */
      case "<stop":
      case "<stop/>":
        break;
      case "</stop>":
        break;
      /* 18.8.? color CT_Color */
      case "<color":
      case "<color/>":
        break;
      case "</color>":
        break;
      /* 18.2.10 extLst CT_ExtensionList ? */
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        s = !0;
        break;
      case "</ext>":
        s = !1;
        break;
      default:
        if (a && a.WTF && !s)
          throw new Error("unrecognized " + c[0] + " in fills");
    }
  });
}
function v1(e, t, r, a) {
  t.Fonts = [];
  var n = {}, s = !1;
  (e.match(pr) || []).forEach(function(i) {
    var c = ue(i);
    switch (Gr(c[0])) {
      case "<fonts":
      case "<fonts>":
      case "</fonts>":
        break;
      /* 18.8.22 font CT_Font */
      case "<font":
      case "<font>":
        break;
      case "</font>":
      case "<font/>":
        t.Fonts.push(n), n = {};
        break;
      /* 18.8.29 name CT_FontName */
      case "<name":
        c.val && (n.name = Ve(c.val));
        break;
      case "<name/>":
      case "</name>":
        break;
      /* 18.8.2  b CT_BooleanProperty */
      case "<b":
        n.bold = c.val ? He(c.val) : 1;
        break;
      case "<b/>":
        n.bold = 1;
        break;
      case "</b>":
      case "</b":
        break;
      /* 18.8.26 i CT_BooleanProperty */
      case "<i":
        n.italic = c.val ? He(c.val) : 1;
        break;
      case "<i/>":
        n.italic = 1;
        break;
      case "</i>":
      case "</i":
        break;
      /* 18.4.13 u CT_UnderlineProperty */
      case "<u":
        switch (c.val) {
          case "none":
            n.underline = 0;
            break;
          case "single":
            n.underline = 1;
            break;
          case "double":
            n.underline = 2;
            break;
          case "singleAccounting":
            n.underline = 33;
            break;
          case "doubleAccounting":
            n.underline = 34;
            break;
        }
        break;
      case "<u/>":
        n.underline = 1;
        break;
      case "</u>":
      case "</u":
        break;
      /* 18.4.10 strike CT_BooleanProperty */
      case "<strike":
        n.strike = c.val ? He(c.val) : 1;
        break;
      case "<strike/>":
        n.strike = 1;
        break;
      case "</strike>":
      case "</strike":
        break;
      /* 18.4.2  outline CT_BooleanProperty */
      case "<outline":
        n.outline = c.val ? He(c.val) : 1;
        break;
      case "<outline/>":
        n.outline = 1;
        break;
      case "</outline>":
      case "</outline":
        break;
      /* 18.8.36 shadow CT_BooleanProperty */
      case "<shadow":
        n.shadow = c.val ? He(c.val) : 1;
        break;
      case "<shadow/>":
        n.shadow = 1;
        break;
      case "</shadow>":
      case "</shadow":
        break;
      /* 18.8.12 condense CT_BooleanProperty */
      case "<condense":
        n.condense = c.val ? He(c.val) : 1;
        break;
      case "<condense/>":
        n.condense = 1;
        break;
      case "</condense>":
      case "</condense":
        break;
      /* 18.8.17 extend CT_BooleanProperty */
      case "<extend":
        n.extend = c.val ? He(c.val) : 1;
        break;
      case "<extend/>":
        n.extend = 1;
        break;
      case "</extend>":
      case "</extend":
        break;
      /* 18.4.11 sz CT_FontSize */
      case "<sz":
        c.val && (n.sz = +c.val);
        break;
      case "<sz/>":
      case "</sz>":
      case "</sz":
        break;
      /* 18.4.14 vertAlign CT_VerticalAlignFontProperty */
      case "<vertAlign":
        c.val && (n.vertAlign = c.val);
        break;
      case "<vertAlign/>":
      case "</vertAlign>":
      case "</vertAlign":
        break;
      /* 18.8.18 family CT_FontFamily */
      case "<family":
        c.val && (n.family = parseInt(c.val, 10));
        break;
      case "<family/>":
      case "</family>":
      case "</family":
        break;
      /* 18.8.35 scheme CT_FontScheme */
      case "<scheme":
        c.val && (n.scheme = c.val);
        break;
      case "<scheme/>":
      case "</scheme>":
      case "</scheme":
        break;
      /* 18.4.1 charset CT_IntProperty */
      case "<charset":
        if (c.val == "1") break;
        c.codepage = Bn[parseInt(c.val, 10)];
        break;
      case "<charset/>":
      case "</charset>":
      case "</charset":
        break;
      /* 18.?.? color CT_Color */
      case "<color":
        if (n.color || (n.color = {}), c.auto && (n.color.auto = He(c.auto)), c.rgb) n.color.rgb = c.rgb.slice(-6);
        else if (c.indexed) {
          n.color.index = parseInt(c.indexed, 10);
          var f = Ft[n.color.index];
          n.color.index == 81 && (f = Ft[1]), f || (f = Ft[1]), n.color.rgb = f[0].toString(16) + f[1].toString(16) + f[2].toString(16);
        } else c.theme && (n.color.theme = parseInt(c.theme, 10), c.tint && (n.color.tint = parseFloat(c.tint)), c.theme && r.themeElements && r.themeElements.clrScheme && (n.color.rgb = qa(r.themeElements.clrScheme[n.color.theme].rgb, n.color.tint || 0)));
        break;
      case "<color/>":
      case "</color>":
      case "</color":
        break;
      /* note: sometimes mc:AlternateContent appears bare */
      case "<AlternateContent":
        s = !0;
        break;
      case "</AlternateContent>":
      case "</AlternateContent":
        s = !1;
        break;
      /* 18.2.10 extLst CT_ExtensionList ? */
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        s = !0;
        break;
      case "</ext>":
        s = !1;
        break;
      default:
        if (a && a.WTF && !s)
          throw new Error("unrecognized " + c[0] + " in fonts");
    }
  });
}
function k1(e, t, r) {
  t.NumberFmt = [];
  for (var a = $r(_e), n = 0; n < a.length; ++n) t.NumberFmt[a[n]] = _e[a[n]];
  var s = e.match(pr);
  if (s)
    for (n = 0; n < s.length; ++n) {
      var i = ue(s[n]);
      switch (Gr(i[0])) {
        case "<numFmts":
        case "</numFmts>":
        case "<numFmts/>":
        case "<numFmts>":
          break;
        case "<numFmt":
          {
            var c = be(Ve(i.formatCode)), f = parseInt(i.numFmtId, 10);
            if (t.NumberFmt[f] = c, f > 0) {
              if (f > 392) {
                for (f = 392; f > 60 && t.NumberFmt[f] != null; --f) ;
                t.NumberFmt[f] = c;
              }
              Tt(c, f);
            }
          }
          break;
        case "</numFmt>":
          break;
        default:
          if (r.WTF) throw new Error("unrecognized " + i[0] + " in numFmts");
      }
    }
}
var Ua = ["numFmtId", "fillId", "fontId", "borderId", "xfId"], Ha = ["applyAlignment", "applyBorder", "applyFill", "applyFont", "applyNumberFormat", "applyProtection", "pivotButton", "quotePrefix"];
function _1(e, t, r) {
  t.CellXf = [];
  var a, n = !1;
  (e.match(pr) || []).forEach(function(s) {
    var i = ue(s), c = 0;
    switch (Gr(i[0])) {
      case "<cellXfs":
      case "<cellXfs>":
      case "<cellXfs/>":
      case "</cellXfs>":
        break;
      /* 18.8.45 xf CT_Xf */
      case "<xf":
      case "<xf/>":
      case "<xf>":
        for (a = i, delete a[0], c = 0; c < Ua.length; ++c) a[Ua[c]] && (a[Ua[c]] = parseInt(a[Ua[c]], 10));
        for (c = 0; c < Ha.length; ++c) a[Ha[c]] && (a[Ha[c]] = He(a[Ha[c]]));
        if (t.NumberFmt && a.numFmtId > 392) {
          for (c = 392; c > 60; --c) if (t.NumberFmt[a.numFmtId] == t.NumberFmt[c]) {
            a.numFmtId = c;
            break;
          }
        }
        t.CellXf.push(a);
        break;
      case "</xf>":
        break;
      /* 18.8.1 alignment CT_CellAlignment */
      case "<alignment":
      case "<alignment/>":
      case "<alignment>":
        var f = {};
        i.vertical && (f.vertical = i.vertical), i.horizontal && (f.horizontal = i.horizontal), i.textRotation != null && (f.textRotation = i.textRotation), i.indent && (f.indent = i.indent), i.wrapText && (f.wrapText = He(i.wrapText)), a.alignment = f;
        break;
      case "</alignment>":
        break;
      /* 18.8.33 protection CT_CellProtection */
      case "<protection":
      case "<protection>":
        break;
      case "</protection>":
      case "<protection/>":
        break;
      /* note: sometimes mc:AlternateContent appears bare */
      case "<AlternateContent":
      case "<AlternateContent>":
        n = !0;
        break;
      case "</AlternateContent>":
        n = !1;
        break;
      /* 18.2.10 extLst CT_ExtensionList ? */
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
        break;
      case "<ext":
        n = !0;
        break;
      case "</ext>":
        n = !1;
        break;
      default:
        if (r && r.WTF && !n)
          throw new Error("unrecognized " + i[0] + " in cellXfs");
    }
  });
}
var E1 = /* @__PURE__ */ (function() {
  return function(r, a, n) {
    var s = {};
    if (!r) return s;
    r = Gn(wa(r, "<!--", "-->"));
    var i;
    return (i = hr(r, "numFmts")) && k1(i[0], s, n), (i = hr(r, "fonts")) && v1(i[0], s, a, n), (i = hr(r, "fills")) && g1(i[0], s, a, n), (i = hr(r, "borders")) && m1(i[0], s, a, n), (i = hr(r, "cellXfs")) && _1(i[0], s, n), s;
  };
})();
function w1(e, t) {
  var r = e.read_shift(2), a = Er(e);
  return [r, a];
}
function T1(e, t, r) {
  var a = {};
  a.sz = e.read_shift(2) / 20;
  var n = Pl(e);
  n.fItalic && (a.italic = 1), n.fCondense && (a.condense = 1), n.fExtend && (a.extend = 1), n.fShadow && (a.shadow = 1), n.fOutline && (a.outline = 1), n.fStrikeout && (a.strike = 1);
  var s = e.read_shift(2);
  switch (s === 700 && (a.bold = 1), e.read_shift(2)) {
    /* case 0: out.vertAlign = "baseline"; break; */
    case 1:
      a.vertAlign = "superscript";
      break;
    case 2:
      a.vertAlign = "subscript";
      break;
  }
  var i = e.read_shift(1);
  i != 0 && (a.underline = i);
  var c = e.read_shift(1);
  c > 0 && (a.family = c);
  var f = e.read_shift(1);
  switch (f > 0 && (a.charset = f), e.l++, a.color = bl(e), e.read_shift(1)) {
    /* case 0: out.scheme = "none": break; */
    case 1:
      a.scheme = "major";
      break;
    case 2:
      a.scheme = "minor";
      break;
  }
  return a.name = Er(e), a;
}
var A1 = wr;
function F1(e, t) {
  var r = e.l + t, a = e.read_shift(2), n = e.read_shift(2);
  return e.l = r, { ixfe: a, numFmtId: n };
}
var S1 = wr;
function y1(e, t, r) {
  var a = {};
  a.NumberFmt = [];
  for (var n in _e) a.NumberFmt[n] = _e[n];
  a.CellXf = [], a.Fonts = [];
  var s = [], i = !1;
  return ft(e, function(f, o, l) {
    switch (l) {
      case 44:
        a.NumberFmt[f[0]] = f[1], Tt(f[1], f[0]);
        break;
      case 43:
        a.Fonts.push(f), f.color.theme != null && t && t.themeElements && t.themeElements.clrScheme && (f.color.rgb = qa(t.themeElements.clrScheme[f.color.theme].rgb, f.color.tint || 0));
        break;
      case 1025:
        break;
      case 45:
        break;
      case 46:
        break;
      case 47:
        s[s.length - 1] == 617 && a.CellXf.push(f);
        break;
      case 48:
      /* BrtStyle */
      case 507:
      /* BrtDXF */
      case 572:
      /* BrtMRUColor */
      case 475:
        break;
      case 1171:
      /* BrtDXF14 */
      case 2102:
      /* BrtDXF15 */
      case 1130:
      /* BrtSlicerStyleElement */
      case 512:
      /* BrtTableStyleElement */
      case 2095:
      /* BrtTimelineStyleElement */
      case 3072:
        break;
      case 35:
        i = !0;
        break;
      case 36:
        i = !1;
        break;
      case 37:
        s.push(l), i = !0;
        break;
      case 38:
        s.pop(), i = !1;
        break;
      default:
        if (o.T > 0) s.push(l);
        else if (o.T < 0) s.pop();
        else if (!i || r.WTF && s[s.length - 1] != 37) throw new Error("Unexpected record 0x" + l.toString(16));
    }
  }), a;
}
var C1 = [
  "</a:lt1>",
  "</a:dk1>",
  "</a:lt2>",
  "</a:dk2>",
  "</a:accent1>",
  "</a:accent2>",
  "</a:accent3>",
  "</a:accent4>",
  "</a:accent5>",
  "</a:accent6>",
  "</a:hlink>",
  "</a:folHlink>"
];
function b1(e, t, r) {
  t.themeElements.clrScheme = [];
  var a = {};
  (e[0].match(pr) || []).forEach(function(n) {
    var s = ue(n);
    switch (s[0]) {
      /* 20.1.6.2 clrScheme (Color Scheme) CT_ColorScheme */
      case "<a:clrScheme":
      case "</a:clrScheme>":
        break;
      /* 20.1.2.3.32 srgbClr CT_SRgbColor */
      case "<a:srgbClr":
        a.rgb = s.val;
        break;
      case "</a:srgbClr>":
        break;
      /* 20.1.2.3.33 sysClr CT_SystemColor */
      case "<a:sysClr":
        a.rgb = s.lastClr;
        break;
      case "</a:sysClr>":
        break;
      /* 20.1.4.1.1 accent1 (Accent 1) */
      /* 20.1.4.1.2 accent2 (Accent 2) */
      /* 20.1.4.1.3 accent3 (Accent 3) */
      /* 20.1.4.1.4 accent4 (Accent 4) */
      /* 20.1.4.1.5 accent5 (Accent 5) */
      /* 20.1.4.1.6 accent6 (Accent 6) */
      /* 20.1.4.1.9 dk1 (Dark 1) */
      /* 20.1.4.1.10 dk2 (Dark 2) */
      /* 20.1.4.1.15 folHlink (Followed Hyperlink) */
      /* 20.1.4.1.19 hlink (Hyperlink) */
      /* 20.1.4.1.22 lt1 (Light 1) */
      /* 20.1.4.1.23 lt2 (Light 2) */
      case "</a:dk1>":
      case "</a:lt1>":
      case "<a:dk1>":
      case "<a:lt1>":
      case "<a:dk2>":
      case "</a:dk2>":
      case "<a:lt2>":
      case "</a:lt2>":
      case "<a:accent1>":
      case "</a:accent1>":
      case "<a:accent2>":
      case "</a:accent2>":
      case "<a:accent3>":
      case "</a:accent3>":
      case "<a:accent4>":
      case "</a:accent4>":
      case "<a:accent5>":
      case "</a:accent5>":
      case "<a:accent6>":
      case "</a:accent6>":
      case "<a:hlink>":
      case "</a:hlink>":
      case "<a:folHlink>":
      case "</a:folHlink>":
        s[0].charAt(1) === "/" ? (t.themeElements.clrScheme[C1.indexOf(s[0])] = a, a = {}) : a.name = s[0].slice(3, s[0].length - 1);
        break;
      default:
        if (r && r.WTF) throw new Error("Unrecognized " + s[0] + " in clrScheme");
    }
  });
}
function P1(e, t, r) {
  t.themeElements = {};
  var a;
  if (!(a = At(e, "a:clrScheme"))) throw new Error("clrScheme not found in themeElements");
  if (b1(a, t, r), !(a = At(e, "a:fontScheme"))) throw new Error("fontScheme not found in themeElements");
  if (!(a = At(e, "a:fmtScheme"))) throw new Error("fmtScheme not found in themeElements");
}
function Ui(e, t) {
  (!e || e.length === 0) && (e = N1());
  var r, a = {};
  if (!(r = At(e, "a:themeElements"))) throw new Error("themeElements not found in theme");
  return P1(r[0], a, t), a.raw = e, a;
}
function N1(e, t) {
  var r = [J0];
  return r[r.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">', r[r.length] = "<a:themeElements>", r[r.length] = '<a:clrScheme name="Office">', r[r.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>', r[r.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>', r[r.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>', r[r.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>', r[r.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>', r[r.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>', r[r.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>', r[r.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>', r[r.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>', r[r.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>', r[r.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>', r[r.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>', r[r.length] = "</a:clrScheme>", r[r.length] = '<a:fontScheme name="Office">', r[r.length] = "<a:majorFont>", r[r.length] = '<a:latin typeface="Cambria"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Hebr" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="MoolBoran"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Times New Roman"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:majorFont>", r[r.length] = "<a:minorFont>", r[r.length] = '<a:latin typeface="Calibri"/>', r[r.length] = '<a:ea typeface=""/>', r[r.length] = '<a:cs typeface=""/>', r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>', r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>', r[r.length] = '<a:font script="Hans" typeface="宋体"/>', r[r.length] = '<a:font script="Hant" typeface="新細明體"/>', r[r.length] = '<a:font script="Arab" typeface="Arial"/>', r[r.length] = '<a:font script="Hebr" typeface="Arial"/>', r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>', r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>', r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>', r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>', r[r.length] = '<a:font script="Khmr" typeface="DaunPenh"/>', r[r.length] = '<a:font script="Knda" typeface="Tunga"/>', r[r.length] = '<a:font script="Guru" typeface="Raavi"/>', r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>', r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>', r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>', r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>', r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>', r[r.length] = '<a:font script="Deva" typeface="Mangal"/>', r[r.length] = '<a:font script="Telu" typeface="Gautami"/>', r[r.length] = '<a:font script="Taml" typeface="Latha"/>', r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>', r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>', r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>', r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>', r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>', r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>', r[r.length] = '<a:font script="Viet" typeface="Arial"/>', r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>', r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>', r[r.length] = "</a:minorFont>", r[r.length] = "</a:fontScheme>", r[r.length] = '<a:fmtScheme name="Office">', r[r.length] = "<a:fillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="1"/>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:lin ang="16200000" scaled="0"/>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:fillStyleLst>", r[r.length] = "<a:lnStyleLst>", r[r.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>', r[r.length] = "</a:lnStyleLst>", r[r.length] = "<a:effectStyleLst>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = "</a:effectStyle>", r[r.length] = "<a:effectStyle>", r[r.length] = "<a:effectLst>", r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>', r[r.length] = "</a:effectLst>", r[r.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>', r[r.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>', r[r.length] = "</a:effectStyle>", r[r.length] = "</a:effectStyleLst>", r[r.length] = "<a:bgFillStyleLst>", r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>', r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = '<a:gradFill rotWithShape="1">', r[r.length] = "<a:gsLst>", r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>', r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>', r[r.length] = "</a:gsLst>", r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>', r[r.length] = "</a:gradFill>", r[r.length] = "</a:bgFillStyleLst>", r[r.length] = "</a:fmtScheme>", r[r.length] = "</a:themeElements>", r[r.length] = "<a:objectDefaults>", r[r.length] = "<a:spDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>', r[r.length] = "</a:spDef>", r[r.length] = "<a:lnDef>", r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>', r[r.length] = "</a:lnDef>", r[r.length] = "</a:objectDefaults>", r[r.length] = "<a:extraClrSchemeLst/>", r[r.length] = "</a:theme>", r.join("");
}
function D1(e, t, r) {
  var a = e.l + t, n = e.read_shift(4);
  if (n !== 124226) {
    if (!r.cellStyles) {
      e.l = a;
      return;
    }
    var s = e.slice(e.l);
    e.l = a;
    var i;
    try {
      i = Y0(s, { type: "array" });
    } catch {
      return;
    }
    var c = Sr(i, "theme/theme/theme1.xml", !0);
    if (c)
      return Ui(c, r);
  }
}
function R1(e) {
  return e.read_shift(4);
}
function I1(e) {
  var t = {};
  switch (t.xclrType = e.read_shift(2), t.nTintShade = e.read_shift(2), t.xclrType) {
    case 0:
      e.l += 4;
      break;
    case 1:
      t.xclrValue = O1(e, 4);
      break;
    case 2:
      t.xclrValue = Fi(e);
      break;
    case 3:
      t.xclrValue = R1(e);
      break;
    case 4:
      e.l += 4;
      break;
  }
  return e.l += 8, t;
}
function O1(e, t) {
  return wr(e, t);
}
function M1(e, t) {
  return wr(e, t);
}
function L1(e) {
  var t = e.read_shift(2), r = e.read_shift(2) - 4, a = [t];
  switch (t) {
    case 4:
    case 5:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 13:
      a[1] = I1(e);
      break;
    case 6:
      a[1] = M1(e, r);
      break;
    case 14:
    case 15:
      a[1] = e.read_shift(r === 1 ? 1 : 2);
      break;
    default:
      throw new Error("Unrecognized ExtProp type: " + t + " " + r);
  }
  return a;
}
function B1(e, t) {
  var r = e.l + t;
  e.l += 2;
  var a = e.read_shift(2);
  e.l += 2;
  for (var n = e.read_shift(2), s = []; n-- > 0; ) s.push(L1(e, r - e.l));
  return { ixfe: a, ext: s };
}
function U1(e, t) {
  t.forEach(function(r) {
    r[0];
  });
}
function H1(e, t) {
  return {
    flags: e.read_shift(4),
    version: e.read_shift(4),
    name: Er(e)
  };
}
function W1(e) {
  for (var t = [], r = e.read_shift(4); r-- > 0; )
    t.push([e.read_shift(4), e.read_shift(4)]);
  return t;
}
function V1(e) {
  return e.l += 4, e.read_shift(4) != 0;
}
function $1(e, t, r) {
  var a = { Types: [], Cell: [], Value: [] }, n = r || {}, s = [], i = !1, c = 2;
  return ft(e, function(f, o, l) {
    switch (l) {
      case 335:
        a.Types.push({ name: f.name });
        break;
      case 51:
        f.forEach(function(p) {
          c == 1 ? a.Cell.push({ type: a.Types[p[0] - 1].name, index: p[1] }) : c == 0 && a.Value.push({ type: a.Types[p[0] - 1].name, index: p[1] });
        });
        break;
      case 337:
        c = f ? 1 : 0;
        break;
      case 338:
        c = 2;
        break;
      case 35:
        s.push(l), i = !0;
        break;
      case 36:
        s.pop(), i = !1;
        break;
      default:
        if (!o.T) {
          if (!i || n.WTF && s[s.length - 1] != 35)
            throw new Error("Unexpected record 0x" + l.toString(16));
        }
    }
  }), a;
}
function G1(e, t, r) {
  var a = { Types: [], Cell: [], Value: [] };
  if (!e)
    return a;
  var n = !1, s = 2, i;
  return e.replace(pr, function(c) {
    var f = ue(c);
    switch (Gr(f[0])) {
      case "<?xml":
        break;
      case "<metadata":
      case "</metadata>":
        break;
      case "<metadataTypes":
      case "</metadataTypes>":
        break;
      case "<metadataType":
        a.Types.push({ name: f.name });
        break;
      case "</metadataType>":
        break;
      case "<futureMetadata":
        for (var o = 0; o < a.Types.length; ++o)
          a.Types[o].name == f.name && (i = a.Types[o]);
        break;
      case "</futureMetadata>":
        break;
      case "<bk>":
        break;
      case "</bk>":
        break;
      case "<rc":
        s == 1 ? a.Cell.push({ type: a.Types[f.t - 1].name, index: +f.v }) : s == 0 && a.Value.push({ type: a.Types[f.t - 1].name, index: +f.v });
        break;
      case "</rc>":
        break;
      case "<cellMetadata":
        s = 1;
        break;
      case "</cellMetadata>":
        s = 2;
        break;
      case "<valueMetadata":
        s = 0;
        break;
      case "</valueMetadata>":
        s = 2;
        break;
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      case "<ext":
        n = !0;
        break;
      case "</ext>":
        n = !1;
        break;
      case "<rvb":
        if (!i)
          break;
        i.offsets || (i.offsets = []), i.offsets.push(+f.i);
        break;
      default:
        if (!n && r?.WTF)
          throw new Error("unrecognized " + f[0] + " in metadata");
    }
    return c;
  }), a;
}
function X1(e) {
  var t = [];
  if (!e) return t;
  var r = 1;
  return (e.match(pr) || []).forEach(function(a) {
    var n = ue(a);
    switch (n[0]) {
      case "<?xml":
        break;
      /* 18.6.2  calcChain CT_CalcChain 1 */
      case "<calcChain":
      case "<calcChain>":
      case "</calcChain>":
        break;
      /* 18.6.1  c CT_CalcCell 1 */
      case "<c":
        delete n[0], n.i ? r = n.i : n.i = r, t.push(n);
        break;
    }
  }), t;
}
function z1(e) {
  var t = {};
  t.i = e.read_shift(4);
  var r = {};
  r.r = e.read_shift(4), r.c = e.read_shift(4), t.r = Oe(r);
  var a = e.read_shift(1);
  return a & 2 && (t.l = "1"), a & 8 && (t.a = "1"), t;
}
function K1(e, t, r) {
  var a = [];
  return ft(e, function(s, i, c) {
    switch (c) {
      case 63:
        a.push(s);
        break;
      default:
        if (!i.T) throw new Error("Unexpected record 0x" + c.toString(16));
    }
  }), a;
}
function j1(e, t, r, a) {
  if (!e) return e;
  var n = a || {}, s = !1;
  ft(e, function(c, f, o) {
    switch (o) {
      case 359:
      /* 'BrtSupTabs' */
      case 363:
      /* 'BrtExternTableStart' */
      case 364:
      /* 'BrtExternTableEnd' */
      case 366:
      /* 'BrtExternRowHdr' */
      case 367:
      /* 'BrtExternCellBlank' */
      case 368:
      /* 'BrtExternCellReal' */
      case 369:
      /* 'BrtExternCellBool' */
      case 370:
      /* 'BrtExternCellError' */
      case 371:
      /* 'BrtExternCellString' */
      case 472:
      /* 'BrtExternValueMeta' */
      case 577:
      /* 'BrtSupNameStart' */
      case 578:
      /* 'BrtSupNameValueStart' */
      case 579:
      /* 'BrtSupNameValueEnd' */
      case 580:
      /* 'BrtSupNameNum' */
      case 581:
      /* 'BrtSupNameErr' */
      case 582:
      /* 'BrtSupNameSt' */
      case 583:
      /* 'BrtSupNameNil' */
      case 584:
      /* 'BrtSupNameBool' */
      case 585:
      /* 'BrtSupNameFmla' */
      case 586:
      /* 'BrtSupNameBits' */
      case 587:
        break;
      case 35:
        s = !0;
        break;
      case 36:
        s = !1;
        break;
      default:
        if (!f.T) {
          if (!s || n.WTF) throw new Error("Unexpected record 0x" + o.toString(16));
        }
    }
  }, n);
}
function Y1(e, t) {
  if (!e) return "??";
  var r = (e.match(/<c:chart [^<>]*r:id="([^<>"]*)"/) || ["", ""])[1];
  return t["!id"][r].Target;
}
function J1(e, t, r) {
  var a = 0;
  (z0(e, "shape") || []).forEach(function(n) {
    var s = "", i = !0, c = -1, f = -1, o = -1;
    if (n.replace(pr, function(p, u) {
      var h = ue(p);
      switch (Gr(h[0])) {
        case "<ClientData":
          h.ObjectType && (s = h.ObjectType);
          break;
        case "<Visible":
        case "<Visible/>":
          i = !1;
          break;
        case "<Row":
        case "<Row>":
          c = u + p.length;
          break;
        case "</Row>":
          f = +n.slice(c, u).trim();
          break;
        case "<Column":
        case "<Column>":
          c = u + p.length;
          break;
        case "</Column>":
          o = +n.slice(c, u).trim();
          break;
      }
      return "";
    }), s === "Note") {
      var l = Ea(t, f >= 0 && o >= 0 ? Oe({ r: f, c: o }) : r[a].ref);
      l.c && (l.c.hidden = i), ++a;
    }
  });
}
function n0(e, t, r, a) {
  var n = e["!data"] != null, s;
  t.forEach(function(i) {
    var c = _r(i.ref);
    if (!(c.r < 0 || c.c < 0)) {
      if (n ? (e["!data"][c.r] || (e["!data"][c.r] = []), s = e["!data"][c.r][c.c]) : s = e[i.ref], !s) {
        s = { t: "z" }, n ? e["!data"][c.r][c.c] = s : e[i.ref] = s;
        var f = qe(e["!ref"] || "BDWGO1000001:A1");
        f.s.r > c.r && (f.s.r = c.r), f.e.r < c.r && (f.e.r = c.r), f.s.c > c.c && (f.s.c = c.c), f.e.c < c.c && (f.e.c = c.c);
        var o = Pe(f);
        e["!ref"] = o;
      }
      s.c || (s.c = []);
      var l = { a: i.author, t: i.t, r: i.r, T: r };
      i.h && (l.h = i.h);
      for (var p = s.c.length - 1; p >= 0; --p) {
        if (!r && s.c[p].T) return;
        r && !s.c[p].T && s.c.splice(p, 1);
      }
      if (r && a) {
        for (p = 0; p < a.length; ++p)
          if (l.a == a[p].id) {
            l.a = a[p].name || l.a;
            break;
          }
      }
      s.c.push(l);
    }
  });
}
function Z1(e, t) {
  if (e.match(/<(?:\w+:)?comments *\/>/)) return [];
  var r = [], a = [], n = hr(e, "authors");
  n && n[1] && n[1].split(/<\/\w*:?author>/).forEach(function(i) {
    if (!(i === "" || i.trim() === "")) {
      var c = i.match(/<(?:\w+:)?author[^<>]*>(.*)/);
      c && r.push(c[1]);
    }
  });
  var s = hr(e, "commentList");
  return s && s[1] && s[1].split(/<\/\w*:?comment>/).forEach(function(i) {
    if (!(i === "" || i.trim() === "")) {
      var c = i.match(/<(?:\w+:)?comment[^<>]*>/);
      if (c) {
        var f = ue(c[0]), o = { author: f.authorId && r[f.authorId] || "sheetjsghost", ref: f.ref, guid: f.guid }, l = _r(f.ref);
        if (!(t.sheetRows && t.sheetRows <= l.r)) {
          var p = hr(i, "text"), u = !!p && !!p[1] && Qn(p[1]) || { r: "", t: "", h: "" };
          o.r = u.r, u.r == "<t></t>" && (u.t = u.h = ""), o.t = (u.t || "").replace(/\r\n/g, `
`).replace(/\r/g, `
`), t.cellHTML && (o.h = u.h), a.push(o);
        }
      }
    }
  }), a;
}
function q1(e, t) {
  var r = [], a = !1, n = {}, s = 0;
  return e.replace(pr, function(c, f) {
    var o = ue(c);
    switch (Gr(o[0])) {
      case "<?xml":
        break;
      /* 2.6.207 ThreadedComments CT_ThreadedComments */
      case "<ThreadedComments":
        break;
      case "</ThreadedComments>":
        break;
      /* 2.6.205 threadedComment CT_ThreadedComment */
      case "<threadedComment":
        n = { author: o.personId, guid: o.id, ref: o.ref, T: 1 };
        break;
      case "</threadedComment>":
        n.t != null && r.push(n);
        break;
      case "<text>":
      case "<text":
        s = f + c.length;
        break;
      case "</text>":
        n.t = e.slice(s, f).replace(/\r\n/g, `
`).replace(/\r/g, `
`);
        break;
      /* 2.6.206 mentions CT_ThreadedCommentMentions TODO */
      case "<mentions":
      case "<mentions>":
        a = !0;
        break;
      case "</mentions>":
        a = !1;
        break;
      /* 2.6.202 mention CT_Mention TODO */
      /* 18.2.10 extLst CT_ExtensionList ? */
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      /* 18.2.7  ext CT_Extension + */
      case "<ext":
        a = !0;
        break;
      case "</ext>":
        a = !1;
        break;
      default:
        if (!a && t.WTF) throw new Error("unrecognized " + o[0] + " in threaded comments");
    }
    return c;
  }), r;
}
function Q1(e, t) {
  var r = [], a = !1;
  return e.replace(pr, function(s) {
    var i = ue(s);
    switch (Gr(i[0])) {
      case "<?xml":
        break;
      /* 2.4.85 personList CT_PersonList */
      case "<personList":
        break;
      case "</personList>":
        break;
      /* 2.6.203 person CT_Person TODO: providers */
      case "<person":
        r.push({ name: i.displayname, id: i.id });
        break;
      case "</person>":
        break;
      /* 18.2.10 extLst CT_ExtensionList ? */
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      /* 18.2.7  ext CT_Extension + */
      case "<ext":
        a = !0;
        break;
      case "</ext>":
        a = !1;
        break;
      default:
        if (!a && t.WTF) throw new Error("unrecognized " + i[0] + " in threaded comments");
    }
    return s;
  }), r;
}
function ed(e) {
  var t = {};
  t.iauthor = e.read_shift(4);
  var r = It(e);
  return t.rfx = r.s, t.ref = Oe(r.s), e.l += 16, t;
}
var rd = Er;
function td(e, t) {
  var r = [], a = [], n = {}, s = !1;
  return ft(e, function(c, f, o) {
    switch (o) {
      case 632:
        a.push(c);
        break;
      case 635:
        n = c;
        break;
      case 637:
        n.t = c.t, n.h = c.h, n.r = c.r;
        break;
      case 636:
        if (n.author = a[n.iauthor], delete n.iauthor, t.sheetRows && n.rfx && t.sheetRows <= n.rfx.r) break;
        n.t || (n.t = ""), delete n.rfx, r.push(n);
        break;
      case 3072:
        break;
      case 35:
        s = !0;
        break;
      case 36:
        s = !1;
        break;
      case 37:
        break;
      case 38:
        break;
      default:
        if (!f.T) {
          if (!s || t.WTF) throw new Error("Unexpected record 0x" + o.toString(16));
        }
    }
  }), r;
}
var ad = "application/vnd.ms-office.vbaProject";
function nd(e) {
  var t = Re.utils.cfb_new({ root: "R" });
  return e.FullPaths.forEach(function(r, a) {
    if (!(r.slice(-1) === "/" || !r.match(/_VBA_PROJECT_CUR/))) {
      var n = r.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
      Re.utils.cfb_add(t, n, e.FileIndex[a].content);
    }
  }), Re.write(t);
}
function sd() {
  return { "!type": "dialog" };
}
function id() {
  return { "!type": "dialog" };
}
function cd() {
  return { "!type": "macro" };
}
function fd() {
  return { "!type": "macro" };
}
var St = /* @__PURE__ */ (function() {
  var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g, t = { r: 0, c: 0 };
  function r(a, n, s, i) {
    var c = !1, f = !1;
    s.length == 0 ? f = !0 : s.charAt(0) == "[" && (f = !0, s = s.slice(1, -1)), i.length == 0 ? c = !0 : i.charAt(0) == "[" && (c = !0, i = i.slice(1, -1));
    var o = s.length > 0 ? parseInt(s, 10) | 0 : 0, l = i.length > 0 ? parseInt(i, 10) | 0 : 0;
    return c ? l += t.c : --l, f ? o += t.r : --o, n + (c ? "" : "$") + Me(l) + (f ? "" : "$") + We(o);
  }
  return function(n, s) {
    return t = s, n.replace(e, r);
  };
})(), rs = /(^|[^._A-Z0-9])(\$?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])(\$?)(\d{1,7})(?![_.\(A-Za-z0-9])/g;
try {
  rs = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g;
} catch {
}
var od = /* @__PURE__ */ (function() {
  return function(t, r) {
    return t.replace(rs, function(a, n, s, i, c, f) {
      var o = Yn(i) - (s ? 0 : r.c), l = jn(f) - (c ? 0 : r.r), p = c == "$" ? l + 1 : l == 0 ? "" : "[" + l + "]", u = s == "$" ? o + 1 : o == 0 ? "" : "[" + o + "]";
      return n + "R" + p + "C" + u;
    });
  };
})();
function Hi(e, t) {
  return e.replace(rs, function(r, a, n, s, i, c) {
    return a + (n == "$" ? n + s : Me(Yn(s) + t.c)) + (i == "$" ? i + c : We(jn(c) + t.r));
  });
}
function s0(e, t, r) {
  var a = Dt(t), n = a.s, s = _r(r), i = { r: s.r - n.r, c: s.c - n.c };
  return Hi(e, i);
}
function ld(e) {
  return e.length != 1;
}
function i0(e) {
  return e.replace(/_xlfn\./g, "");
}
function rr(e) {
  e.l += 1;
}
function mt(e, t) {
  var r = e.read_shift(2);
  return [r & 16383, r >> 14 & 1, r >> 15 & 1];
}
function Wi(e, t, r) {
  var a = 2;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return Vi(e);
    r.biff == 12 && (a = 4);
  }
  var n = e.read_shift(a), s = e.read_shift(a), i = mt(e), c = mt(e);
  return { s: { r: n, c: i[0], cRel: i[1], rRel: i[2] }, e: { r: s, c: c[0], cRel: c[1], rRel: c[2] } };
}
function Vi(e) {
  var t = mt(e), r = mt(e), a = e.read_shift(1), n = e.read_shift(1);
  return { s: { r: t[0], c: a, cRel: t[1], rRel: t[2] }, e: { r: r[0], c: n, cRel: r[1], rRel: r[2] } };
}
function hd(e, t, r) {
  if (r.biff < 8) return Vi(e);
  var a = e.read_shift(r.biff == 12 ? 4 : 2), n = e.read_shift(r.biff == 12 ? 4 : 2), s = mt(e), i = mt(e);
  return { s: { r: a, c: s[0], cRel: s[1], rRel: s[2] }, e: { r: n, c: i[0], cRel: i[1], rRel: i[2] } };
}
function $i(e, t, r) {
  if (r && r.biff >= 2 && r.biff <= 5) return ud(e);
  var a = e.read_shift(r && r.biff == 12 ? 4 : 2), n = mt(e);
  return { r: a, c: n[0], cRel: n[1], rRel: n[2] };
}
function ud(e) {
  var t = mt(e), r = e.read_shift(1);
  return { r: t[0], c: r, cRel: t[1], rRel: t[2] };
}
function dd(e) {
  var t = e.read_shift(2), r = e.read_shift(2);
  return { r: t, c: r & 255, fQuoted: !!(r & 16384), cRel: r >> 15, rRel: r >> 15 };
}
function xd(e, t, r) {
  var a = r && r.biff ? r.biff : 8;
  if (a >= 2 && a <= 5) return pd(e);
  var n = e.read_shift(a >= 12 ? 4 : 2), s = e.read_shift(2), i = (s & 16384) >> 14, c = (s & 32768) >> 15;
  if (s &= 16383, c == 1) for (; n > 524287; ) n -= 1048576;
  if (i == 1) for (; s > 8191; ) s = s - 16384;
  return { r: n, c: s, cRel: i, rRel: c };
}
function pd(e) {
  var t = e.read_shift(2), r = e.read_shift(1), a = (t & 32768) >> 15, n = (t & 16384) >> 14;
  return t &= 16383, a == 1 && t >= 8192 && (t = t - 16384), n == 1 && r >= 128 && (r = r - 256), { r: t, c: r, cRel: n, rRel: a };
}
function md(e, t, r) {
  var a = (e[e.l++] & 96) >> 5, n = Wi(e, r.biff >= 2 && r.biff <= 5 ? 6 : 8, r);
  return [a, n];
}
function gd(e, t, r) {
  var a = (e[e.l++] & 96) >> 5, n = e.read_shift(2, "i"), s = 8;
  if (r) switch (r.biff) {
    case 5:
      e.l += 12, s = 6;
      break;
    case 12:
      s = 12;
      break;
  }
  var i = Wi(e, s, r);
  return [a, n, i];
}
function vd(e, t, r) {
  var a = (e[e.l++] & 96) >> 5;
  return e.l += r && r.biff > 8 ? 12 : r.biff < 8 ? 6 : 8, [a];
}
function kd(e, t, r) {
  var a = (e[e.l++] & 96) >> 5, n = e.read_shift(2), s = 8;
  if (r) switch (r.biff) {
    case 5:
      e.l += 12, s = 6;
      break;
    case 12:
      s = 12;
      break;
  }
  return e.l += s, [a, n];
}
function _d(e, t, r) {
  var a = (e[e.l++] & 96) >> 5, n = hd(e, t - 1, r);
  return [a, n];
}
function Ed(e, t, r) {
  var a = (e[e.l++] & 96) >> 5;
  return e.l += r.biff == 2 ? 6 : r.biff == 12 ? 14 : 7, [a];
}
function c0(e) {
  var t = e[e.l + 1] & 1, r = 1;
  return e.l += 4, [t, r];
}
function wd(e, t, r) {
  e.l += 2;
  for (var a = e.read_shift(r && r.biff == 2 ? 1 : 2), n = [], s = 0; s <= a; ++s) n.push(e.read_shift(r && r.biff == 2 ? 1 : 2));
  return n;
}
function Td(e, t, r) {
  var a = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [a, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function Ad(e, t, r) {
  var a = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [a, e.read_shift(r && r.biff == 2 ? 1 : 2)];
}
function Fd(e) {
  var t = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += 2, [t, e.read_shift(2)];
}
function Sd(e, t, r) {
  var a = e[e.l + 1] & 255 ? 1 : 0;
  return e.l += r && r.biff == 2 ? 3 : 4, [a];
}
function Gi(e) {
  var t = e.read_shift(1), r = e.read_shift(1);
  return [t, r];
}
function yd(e) {
  return e.read_shift(2), Gi(e);
}
function Cd(e) {
  return e.read_shift(2), Gi(e);
}
function bd(e, t, r) {
  var a = (e[e.l] & 96) >> 5;
  e.l += 1;
  var n = $i(e, 0, r);
  return [a, n];
}
function Pd(e, t, r) {
  var a = (e[e.l] & 96) >> 5;
  e.l += 1;
  var n = xd(e, 0, r);
  return [a, n];
}
function Nd(e, t, r) {
  var a = (e[e.l] & 96) >> 5;
  e.l += 1;
  var n = e.read_shift(2);
  r && r.biff == 5 && (e.l += 12);
  var s = $i(e, 0, r);
  return [a, n, s];
}
function Dd(e, t, r) {
  var a = (e[e.l] & 96) >> 5;
  e.l += 1;
  var n = e.read_shift(r && r.biff <= 3 ? 1 : 2);
  return [Rx[n], Ki[n], a];
}
function Rd(e, t, r) {
  var a = e[e.l++], n = e.read_shift(1), s = r && r.biff <= 3 ? [a == 88 ? -1 : 0, e.read_shift(1)] : Id(e);
  return [n, (s[0] === 0 ? Ki : Dx)[s[1]]];
}
function Id(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function Od(e, t, r) {
  e.l += r && r.biff == 2 ? 3 : 4;
}
function Md(e, t, r) {
  if (e.l++, r && r.biff == 12) return [e.read_shift(4, "i"), 0];
  var a = e.read_shift(2), n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [a, n];
}
function Ld(e) {
  return e.l++, Pr[e.read_shift(1)];
}
function Bd(e) {
  return e.l++, e.read_shift(2);
}
function Ud(e) {
  return e.l++, e.read_shift(1) !== 0;
}
function Hd(e) {
  return e.l++, kr(e);
}
function Wd(e, t, r) {
  return e.l++, Gt(e, t - 1, r);
}
function Vd(e, t) {
  var r = [e.read_shift(1)];
  if (t == 12) switch (r[0]) {
    case 2:
      r[0] = 4;
      break;
    /* SerBool */
    case 4:
      r[0] = 16;
      break;
    /* SerErr */
    case 0:
      r[0] = 1;
      break;
    /* SerNum */
    case 1:
      r[0] = 2;
      break;
  }
  switch (r[0]) {
    case 4:
      r[1] = Je(e, 1) ? "TRUE" : "FALSE", t != 12 && (e.l += 7);
      break;
    case 37:
    /* appears to be an alias */
    case 16:
      r[1] = Pr[e[e.l]], e.l += t == 12 ? 4 : 8;
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      r[1] = kr(e);
      break;
    case 2:
      r[1] = Ot(e, 0, { biff: t > 0 && t < 8 ? 2 : t });
      break;
    default:
      throw new Error("Bad SerAr: " + r[0]);
  }
  return r;
}
function $d(e, t, r) {
  for (var a = e.read_shift(r.biff == 12 ? 4 : 2), n = [], s = 0; s != a; ++s) n.push((r.biff == 12 ? It : fn)(e));
  return n;
}
function Gd(e, t, r) {
  var a = 0, n = 0;
  r.biff == 12 ? (a = e.read_shift(4), n = e.read_shift(4)) : (n = 1 + e.read_shift(1), a = 1 + e.read_shift(2)), r.biff >= 2 && r.biff < 8 && (--a, --n == 0 && (n = 256));
  for (var s = 0, i = []; s != a && (i[s] = []); ++s)
    for (var c = 0; c != n; ++c) i[s][c] = Vd(e, r.biff);
  return i;
}
function Xd(e, t, r) {
  var a = e.read_shift(1) >>> 5 & 3, n = !r || r.biff >= 8 ? 4 : 2, s = e.read_shift(n);
  switch (r.biff) {
    case 2:
      e.l += 5;
      break;
    case 3:
    case 4:
      e.l += 8;
      break;
    case 5:
      e.l += 12;
      break;
  }
  return [a, 0, s];
}
function zd(e, t, r) {
  if (r.biff == 5) return Kd(e);
  var a = e.read_shift(1) >>> 5 & 3, n = e.read_shift(2), s = e.read_shift(4);
  return [a, n, s];
}
function Kd(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2, "i");
  e.l += 8;
  var a = e.read_shift(2);
  return e.l += 12, [t, r, a];
}
function jd(e, t, r) {
  var a = e.read_shift(1) >>> 5 & 3;
  e.l += r && r.biff == 2 ? 3 : 4;
  var n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [a, n];
}
function Yd(e, t, r) {
  var a = e.read_shift(1) >>> 5 & 3, n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [a, n];
}
function Jd(e, t, r) {
  var a = e.read_shift(1) >>> 5 & 3;
  return e.l += 4, r.biff < 8 && e.l--, r.biff == 12 && (e.l += 2), [a];
}
function Zd(e, t, r) {
  var a = (e[e.l++] & 96) >> 5, n = e.read_shift(2), s = 4;
  if (r) switch (r.biff) {
    case 5:
      s = 15;
      break;
    case 12:
      s = 6;
      break;
  }
  return e.l += s, [a, n];
}
var qd = wr, Qd = wr, ex = wr;
function Fa(e, t, r) {
  return e.l += 2, [dd(e)];
}
function ts(e) {
  return e.l += 6, [];
}
var rx = Fa, tx = ts, ax = ts, nx = Fa;
function Xi(e) {
  return e.l += 2, [Ye(e), e.read_shift(2) & 1];
}
var sx = Fa, ix = Xi, cx = ts, fx = Fa, ox = Fa, lx = [
  "Data",
  "All",
  "Headers",
  "??",
  "?Data2",
  "??",
  "?DataHeaders",
  "??",
  "Totals",
  "??",
  "??",
  "??",
  "?DataTotals",
  "??",
  "??",
  "??",
  "?Current"
];
function hx(e) {
  e.l += 2;
  var t = e.read_shift(2), r = e.read_shift(2), a = e.read_shift(4), n = e.read_shift(2), s = e.read_shift(2), i = lx[r >> 2 & 31];
  return { ixti: t, coltype: r & 3, rt: i, idx: a, c: n, C: s };
}
function ux(e) {
  return e.l += 2, [e.read_shift(4)];
}
function dx(e, t, r) {
  return e.l += 5, e.l += 2, e.l += r.biff == 2 ? 1 : 4, ["PTGSHEET"];
}
function xx(e, t, r) {
  return e.l += r.biff == 2 ? 4 : 5, ["PTGENDSHEET"];
}
function px(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function mx(e) {
  var t = e.read_shift(1) >>> 5 & 3, r = e.read_shift(2);
  return [t, r];
}
function gx(e) {
  return e.l += 4, [0, 0];
}
var f0 = {
  1: { n: "PtgExp", f: Md },
  2: { n: "PtgTbl", f: ex },
  3: { n: "PtgAdd", f: rr },
  4: { n: "PtgSub", f: rr },
  5: { n: "PtgMul", f: rr },
  6: { n: "PtgDiv", f: rr },
  7: { n: "PtgPower", f: rr },
  8: { n: "PtgConcat", f: rr },
  9: { n: "PtgLt", f: rr },
  10: { n: "PtgLe", f: rr },
  11: { n: "PtgEq", f: rr },
  12: { n: "PtgGe", f: rr },
  13: { n: "PtgGt", f: rr },
  14: { n: "PtgNe", f: rr },
  15: { n: "PtgIsect", f: rr },
  16: { n: "PtgUnion", f: rr },
  17: { n: "PtgRange", f: rr },
  18: { n: "PtgUplus", f: rr },
  19: { n: "PtgUminus", f: rr },
  20: { n: "PtgPercent", f: rr },
  21: { n: "PtgParen", f: rr },
  22: { n: "PtgMissArg", f: rr },
  23: { n: "PtgStr", f: Wd },
  26: { n: "PtgSheet", f: dx },
  27: { n: "PtgEndSheet", f: xx },
  28: { n: "PtgErr", f: Ld },
  29: { n: "PtgBool", f: Ud },
  30: { n: "PtgInt", f: Bd },
  31: { n: "PtgNum", f: Hd },
  32: { n: "PtgArray", f: Ed },
  33: { n: "PtgFunc", f: Dd },
  34: { n: "PtgFuncVar", f: Rd },
  35: { n: "PtgName", f: Xd },
  36: { n: "PtgRef", f: bd },
  37: { n: "PtgArea", f: md },
  38: { n: "PtgMemArea", f: jd },
  39: { n: "PtgMemErr", f: qd },
  40: { n: "PtgMemNoMem", f: Qd },
  41: { n: "PtgMemFunc", f: Yd },
  42: { n: "PtgRefErr", f: Jd },
  43: { n: "PtgAreaErr", f: vd },
  44: { n: "PtgRefN", f: Pd },
  45: { n: "PtgAreaN", f: _d },
  46: { n: "PtgMemAreaN", f: px },
  47: { n: "PtgMemNoMemN", f: mx },
  57: { n: "PtgNameX", f: zd },
  58: { n: "PtgRef3d", f: Nd },
  59: { n: "PtgArea3d", f: gd },
  60: { n: "PtgRefErr3d", f: Zd },
  61: { n: "PtgAreaErr3d", f: kd },
  255: {}
}, vx = {
  64: 32,
  96: 32,
  65: 33,
  97: 33,
  66: 34,
  98: 34,
  67: 35,
  99: 35,
  68: 36,
  100: 36,
  69: 37,
  101: 37,
  70: 38,
  102: 38,
  71: 39,
  103: 39,
  72: 40,
  104: 40,
  73: 41,
  105: 41,
  74: 42,
  106: 42,
  75: 43,
  107: 43,
  76: 44,
  108: 44,
  77: 45,
  109: 45,
  78: 46,
  110: 46,
  79: 47,
  111: 47,
  88: 34,
  120: 34,
  89: 57,
  121: 57,
  90: 58,
  122: 58,
  91: 59,
  123: 59,
  92: 60,
  124: 60,
  93: 61,
  125: 61
}, kx = {
  1: { n: "PtgElfLel", f: Xi },
  2: { n: "PtgElfRw", f: fx },
  3: { n: "PtgElfCol", f: rx },
  6: { n: "PtgElfRwV", f: ox },
  7: { n: "PtgElfColV", f: nx },
  10: { n: "PtgElfRadical", f: sx },
  11: { n: "PtgElfRadicalS", f: cx },
  13: { n: "PtgElfColS", f: tx },
  15: { n: "PtgElfColSV", f: ax },
  16: { n: "PtgElfRadicalLel", f: ix },
  25: { n: "PtgList", f: hx },
  29: { n: "PtgSxName", f: ux },
  255: {}
}, _x = {
  0: { n: "PtgAttrNoop", f: gx },
  1: { n: "PtgAttrSemi", f: Sd },
  2: { n: "PtgAttrIf", f: Ad },
  4: { n: "PtgAttrChoose", f: wd },
  8: { n: "PtgAttrGoto", f: Td },
  16: { n: "PtgAttrSum", f: Od },
  32: { n: "PtgAttrBaxcel", f: c0 },
  33: { n: "PtgAttrBaxcel", f: c0 },
  64: { n: "PtgAttrSpace", f: yd },
  65: { n: "PtgAttrSpaceSemi", f: Cd },
  128: { n: "PtgAttrIfError", f: Fd },
  255: {}
};
function Sa(e, t, r, a) {
  if (a.biff < 8) return wr(e, t);
  for (var n = e.l + t, s = [], i = 0; i !== r.length; ++i)
    switch (r[i][0]) {
      case "PtgArray":
        r[i][1] = Gd(e, 0, a), s.push(r[i][1]);
        break;
      case "PtgMemArea":
        r[i][2] = $d(e, r[i][1], a), s.push(r[i][2]);
        break;
      case "PtgExp":
        a && a.biff == 12 && (r[i][1][1] = e.read_shift(4), s.push(r[i][1]));
        break;
      case "PtgList":
      /* TODO: PtgList -> PtgExtraList */
      case "PtgElfRadicalS":
      /* TODO: PtgElfRadicalS -> PtgExtraElf */
      case "PtgElfColS":
      /* TODO: PtgElfColS -> PtgExtraElf */
      case "PtgElfColSV":
        throw "Unsupported " + r[i][0];
    }
  return t = n - e.l, t !== 0 && s.push(wr(e, t)), s;
}
function ya(e, t, r) {
  for (var a = e.l + t, n, s, i = []; a != e.l; )
    t = a - e.l, s = e[e.l], n = f0[s] || f0[vx[s]], (s === 24 || s === 25) && (n = (s === 24 ? kx : _x)[e[e.l + 1]]), !n || !n.f ? wr(e, t) : i.push([n.n, n.f(e, t, r)]);
  return i;
}
function Ex(e) {
  for (var t = [], r = 0; r < e.length; ++r) {
    for (var a = e[r], n = [], s = 0; s < a.length; ++s) {
      var i = a[s];
      i ? i[0] === 2 ? n.push('"' + i[1].replace(/"/g, '""') + '"') : n.push(i[1]) : n.push("");
    }
    t.push(n.join(","));
  }
  return t.join(";");
}
var wx = {
  PtgAdd: "+",
  PtgConcat: "&",
  PtgDiv: "/",
  PtgEq: "=",
  PtgGe: ">=",
  PtgGt: ">",
  PtgLe: "<=",
  PtgLt: "<",
  PtgMul: "*",
  PtgNe: "<>",
  PtgPower: "^",
  PtgSub: "-"
};
function Tx(e, t) {
  var r = e.lastIndexOf("!"), a = t.lastIndexOf("!");
  return r == -1 && a == -1 ? e + ":" + t : r > 0 && a > 0 && e.slice(0, r).toLowerCase() == t.slice(0, a).toLowerCase() ? e + ":" + t.slice(a + 1) : (console.error("Cannot hydrate range", e, t), e + ":" + t);
}
function zi(e, t, r) {
  if (!e) return "SH33TJSERR0";
  if (r.biff > 8 && (!e.XTI || !e.XTI[t])) return e.SheetNames[t];
  if (!e.XTI) return "SH33TJSERR6";
  var a = e.XTI[t];
  if (r.biff < 8)
    return t > 1e4 && (t -= 65536), t < 0 && (t = -t), t == 0 ? "" : e.XTI[t - 1];
  if (!a) return "SH33TJSERR1";
  var n = "";
  if (r.biff > 8) switch (e[a[0]][0]) {
    case 357:
      return n = a[1] == -1 ? "#REF" : e.SheetNames[a[1]], a[1] == a[2] ? n : n + ":" + e.SheetNames[a[2]];
    case 358:
      return r.SID != null ? e.SheetNames[r.SID] : "SH33TJSSAME" + e[a[0]][0];
    /* 'BrtSupBookSrc' */
    /* falls through */
    default:
      return "SH33TJSSRC" + e[a[0]][0];
  }
  switch (e[a[0]][0][0]) {
    case 1025:
      return n = a[1] == -1 ? "#REF" : e.SheetNames[a[1]] || "SH33TJSERR3", a[1] == a[2] ? n : n + ":" + e.SheetNames[a[2]];
    case 14849:
      return e[a[0]].slice(1).map(function(s) {
        return s.Name;
      }).join(";;");
    //return "SH33TJSERR8";
    default:
      return e[a[0]][0][3] ? (n = a[1] == -1 ? "#REF" : e[a[0]][0][3][a[1]] || "SH33TJSERR4", a[1] == a[2] ? n : n + ":" + e[a[0]][0][3][a[2]]) : "SH33TJSERR2";
  }
}
function o0(e, t, r) {
  var a = zi(e, t, r);
  return a == "#REF" ? a : wl(a, r);
}
function vr(e, t, r, a, n) {
  var s = n && n.biff || 8, i = (
    /*range != null ? range :*/
    { s: { c: 0, r: 0 } }
  ), c = [], f, o, l, p = 0, u = 0, h, m = "";
  if (!e[0] || !e[0][0]) return "";
  for (var k = -1, x = "", d = 0, _ = e[0].length; d < _; ++d) {
    var g = e[0][d];
    switch (g[0]) {
      case "PtgUminus":
        c.push("-" + c.pop());
        break;
      case "PtgUplus":
        c.push("+" + c.pop());
        break;
      case "PtgPercent":
        c.push(c.pop() + "%");
        break;
      case "PtgAdd":
      /* [MS-XLS] 2.5.198.26 */
      case "PtgConcat":
      /* [MS-XLS] 2.5.198.43 */
      case "PtgDiv":
      /* [MS-XLS] 2.5.198.45 */
      case "PtgEq":
      /* [MS-XLS] 2.5.198.56 */
      case "PtgGe":
      /* [MS-XLS] 2.5.198.64 */
      case "PtgGt":
      /* [MS-XLS] 2.5.198.65 */
      case "PtgLe":
      /* [MS-XLS] 2.5.198.68 */
      case "PtgLt":
      /* [MS-XLS] 2.5.198.69 */
      case "PtgMul":
      /* [MS-XLS] 2.5.198.75 */
      case "PtgNe":
      /* [MS-XLS] 2.5.198.78 */
      case "PtgPower":
      /* [MS-XLS] 2.5.198.82 */
      case "PtgSub":
        if (f = c.pop(), o = c.pop(), k >= 0) {
          switch (e[0][k][1][0]) {
            case 0:
              x = De(" ", e[0][k][1][1]);
              break;
            case 1:
              x = De("\r", e[0][k][1][1]);
              break;
            default:
              if (x = "", n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][k][1][0]);
          }
          o = o + x, k = -1;
        }
        c.push(o + wx[g[0]] + f);
        break;
      case "PtgIsect":
        f = c.pop(), o = c.pop(), c.push(o + " " + f);
        break;
      case "PtgUnion":
        f = c.pop(), o = c.pop(), c.push(o + "," + f);
        break;
      case "PtgRange":
        f = c.pop(), o = c.pop(), c.push(Tx(o, f));
        break;
      case "PtgAttrChoose":
        break;
      case "PtgAttrGoto":
        break;
      case "PtgAttrIf":
        break;
      case "PtgAttrIfError":
        break;
      case "PtgRef":
        l = aa(g[1][1], i, n), c.push(na(l, s));
        break;
      case "PtgRefN":
        l = r ? aa(g[1][1], r, n) : g[1][1], c.push(na(l, s));
        break;
      case "PtgRef3d":
        p = /*::Number(*/
        g[1][1], l = aa(g[1][2], i, n), m = o0(a, p, n), c.push(m + "!" + na(l, s));
        break;
      case "PtgFunc":
      /* [MS-XLS] 2.5.198.62 */
      case "PtgFuncVar":
        var C = g[1][0], O = g[1][1];
        C || (C = 0), C &= 127;
        var U = C == 0 ? [] : c.slice(-C);
        c.length -= C, O === "User" && (O = U.shift()), c.push(O + "(" + U.join(",") + ")");
        break;
      case "PtgBool":
        c.push(g[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        c.push(
          /*::String(*/
          g[1]
          /*::)*/
        );
        break;
      case "PtgNum":
        c.push(String(g[1]));
        break;
      case "PtgStr":
        c.push('"' + g[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        c.push(
          /*::String(*/
          g[1]
          /*::)*/
        );
        break;
      case "PtgAreaN":
        h = Ws(g[1][1], r ? { s: r } : i, n), c.push(vn(h, n));
        break;
      case "PtgArea":
        h = Ws(g[1][1], i, n), c.push(vn(h, n));
        break;
      case "PtgArea3d":
        p = /*::Number(*/
        g[1][1], h = g[1][2], m = o0(a, p, n), c.push(m + "!" + vn(h, n));
        break;
      case "PtgAttrSum":
        c.push("SUM(" + c.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      /* [MS-XLS] 2.5.198.33 */
      case "PtgAttrSemi":
        break;
      case "PtgName":
        u = g[1][2];
        var P = (a.names || [])[u - 1] || (a[0] || [])[u], I = P ? P.Name : "SH33TJSNAME" + String(u);
        I && I.slice(0, 6) == "_xlfn." && !n.xlfn && (I = I.slice(6)), c.push(I);
        break;
      case "PtgNameX":
        var N = g[1][1];
        u = g[1][2];
        var B;
        if (n.biff <= 5)
          N < 0 && (N = -N), a[N] && (B = a[N][u]);
        else {
          var M = "";
          if (((a[N] || [])[0] || [])[0] == 14849 || (((a[N] || [])[0] || [])[0] == 1025 ? a[N][u] && a[N][u].itab > 0 && (M = a.SheetNames[a[N][u].itab - 1] + "!") : M = a.SheetNames[u - 1] + "!"), a[N] && a[N][u]) M += a[N][u].Name;
          else if (a[0] && a[0][u]) M += a[0][u].Name;
          else {
            var X = (zi(a, N, n) || "").split(";;");
            X[u - 1] ? M = X[u - 1] : M += "SH33TJSERRX";
          }
          c.push(M);
          break;
        }
        B || (B = { Name: "SH33TJSERRY" }), c.push(B.Name);
        break;
      case "PtgParen":
        var j = "(", oe = ")";
        if (k >= 0) {
          switch (x = "", e[0][k][1][0]) {
            // $FlowIgnore
            case 2:
              j = De(" ", e[0][k][1][1]) + j;
              break;
            // $FlowIgnore
            case 3:
              j = De("\r", e[0][k][1][1]) + j;
              break;
            // $FlowIgnore
            case 4:
              oe = De(" ", e[0][k][1][1]) + oe;
              break;
            // $FlowIgnore
            case 5:
              oe = De("\r", e[0][k][1][1]) + oe;
              break;
            default:
              if (n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + e[0][k][1][0]);
          }
          k = -1;
        }
        c.push(j + c.pop() + oe);
        break;
      case "PtgRefErr":
        c.push("#REF!");
        break;
      case "PtgRefErr3d":
        c.push("#REF!");
        break;
      case "PtgExp":
        l = { c: g[1][1], r: g[1][0] };
        var Z = { c: r.c, r: r.r };
        if (a.sharedf[Oe(l)]) {
          var xe = a.sharedf[Oe(l)];
          c.push(vr(xe, i, Z, a, n));
        } else {
          var q = !1;
          for (f = 0; f != a.arrayf.length; ++f)
            if (o = a.arrayf[f], !(l.c < o[0].s.c || l.c > o[0].e.c) && !(l.r < o[0].s.r || l.r > o[0].e.r)) {
              c.push(vr(o[1], i, Z, a, n)), q = !0;
              break;
            }
          q || c.push(
            /*::String(*/
            g[1]
            /*::)*/
          );
        }
        break;
      case "PtgArray":
        c.push("{" + Ex(
          /*::(*/
          g[1]
          /*:: :any)*/
        ) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      /* [MS-XLS] 2.5.198.38 */
      case "PtgAttrSpaceSemi":
        k = d;
        break;
      case "PtgTbl":
        break;
      case "PtgMemErr":
        break;
      case "PtgMissArg":
        c.push("");
        break;
      case "PtgAreaErr":
        c.push("#REF!");
        break;
      case "PtgAreaErr3d":
        c.push("#REF!");
        break;
      case "PtgList":
        c.push("Table" + g[1].idx + "[#" + g[1].rt + "]");
        break;
      case "PtgMemAreaN":
      case "PtgMemNoMemN":
      case "PtgAttrNoop":
      case "PtgSheet":
      case "PtgEndSheet":
        break;
      case "PtgMemFunc":
        break;
      case "PtgMemNoMem":
        break;
      case "PtgElfCol":
      /* [MS-XLS] 2.5.198.46 */
      case "PtgElfColS":
      /* [MS-XLS] 2.5.198.47 */
      case "PtgElfColSV":
      /* [MS-XLS] 2.5.198.48 */
      case "PtgElfColV":
      /* [MS-XLS] 2.5.198.49 */
      case "PtgElfLel":
      /* [MS-XLS] 2.5.198.50 */
      case "PtgElfRadical":
      /* [MS-XLS] 2.5.198.51 */
      case "PtgElfRadicalLel":
      /* [MS-XLS] 2.5.198.52 */
      case "PtgElfRadicalS":
      /* [MS-XLS] 2.5.198.53 */
      case "PtgElfRw":
      /* [MS-XLS] 2.5.198.54 */
      case "PtgElfRwV":
        throw new Error("Unsupported ELFs");
      case "PtgSxName":
        throw new Error("Unrecognized Formula Token: " + String(g));
      default:
        throw new Error("Unrecognized Formula Token: " + String(g));
    }
    var ie = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (n.biff != 3 && k >= 0 && ie.indexOf(e[0][d][0]) == -1) {
      g = e[0][k];
      var ve = !0;
      switch (g[1][0]) {
        /* note: some bad XLSB files omit the PtgParen */
        case 4:
          ve = !1;
        /* falls through */
        case 0:
          x = De(" ", g[1][1]);
          break;
        case 5:
          ve = !1;
        /* falls through */
        case 1:
          x = De("\r", g[1][1]);
          break;
        default:
          if (x = "", n.WTF) throw new Error("Unexpected PtgAttrSpaceType " + g[1][0]);
      }
      c.push((ve ? x : "") + c.pop() + (ve ? "" : x)), k = -1;
    }
  }
  if (c.length > 1 && n.WTF) throw new Error("bad formula stack");
  return c[0] == "TRUE" ? !0 : c[0] == "FALSE" ? !1 : c[0];
}
function Ax(e, t, r) {
  var a = e.l + t, n = r.biff == 2 ? 1 : 2, s, i = e.read_shift(n);
  if (i == 65535) return [[], wr(e, t - 2)];
  var c = ya(e, i, r);
  return t !== i + n && (s = Sa(e, t - i - n, c, r)), e.l = a, [c, s];
}
function Fx(e, t, r) {
  var a = e.l + t, n = r.biff == 2 ? 1 : 2, s, i = e.read_shift(n);
  if (i == 65535) return [[], wr(e, t - 2)];
  var c = ya(e, i, r);
  return t !== i + n && (s = Sa(e, t - i - n, c, r)), e.l = a, [c, s];
}
function Sx(e, t, r, a) {
  var n = e.l + t, s = ya(e, a, r), i;
  return n !== e.l && (i = Sa(e, n - e.l, s, r)), [s, i];
}
function yx(e, t, r) {
  var a = e.l + t, n, s = e.read_shift(2), i = ya(e, s, r);
  return s == 65535 ? [[], wr(e, t - 2)] : (t !== s + 2 && (n = Sa(e, a - s - 2, i, r)), [i, n]);
}
function Cx(e) {
  var t;
  if (nt(e, e.l + 6) !== 65535) return [kr(e), "n"];
  switch (e[e.l]) {
    case 0:
      return e.l += 8, ["String", "s"];
    case 1:
      return t = e[e.l + 2] === 1, e.l += 8, [t, "b"];
    case 2:
      return t = e[e.l + 2], e.l += 8, [t, "e"];
    case 3:
      return e.l += 8, ["", "s"];
  }
  return [];
}
function En(e, t, r) {
  var a = e.l + t, n = Zr(e, 6, r), s = Cx(e), i = e.read_shift(1);
  r.biff != 2 && (e.read_shift(1), r.biff >= 5 && e.read_shift(4));
  var c = Fx(e, a - e.l, r);
  return { cell: n, val: s[0], formula: c, shared: i >> 3 & 1, tt: s[1] };
}
function on(e, t, r) {
  var a = e.read_shift(4), n = ya(e, a, r), s = e.read_shift(4), i = s > 0 ? Sa(e, s, n, r) : null;
  return [n, i];
}
var bx = on, ln = on, Px = on, Nx = on, Dx = {
  0: "BEEP",
  1: "OPEN",
  2: "OPEN.LINKS",
  3: "CLOSE.ALL",
  4: "SAVE",
  5: "SAVE.AS",
  6: "FILE.DELETE",
  7: "PAGE.SETUP",
  8: "PRINT",
  9: "PRINTER.SETUP",
  10: "QUIT",
  11: "NEW.WINDOW",
  12: "ARRANGE.ALL",
  13: "WINDOW.SIZE",
  14: "WINDOW.MOVE",
  15: "FULL",
  16: "CLOSE",
  17: "RUN",
  22: "SET.PRINT.AREA",
  23: "SET.PRINT.TITLES",
  24: "SET.PAGE.BREAK",
  25: "REMOVE.PAGE.BREAK",
  26: "FONT",
  27: "DISPLAY",
  28: "PROTECT.DOCUMENT",
  29: "PRECISION",
  30: "A1.R1C1",
  31: "CALCULATE.NOW",
  32: "CALCULATION",
  34: "DATA.FIND",
  35: "EXTRACT",
  36: "DATA.DELETE",
  37: "SET.DATABASE",
  38: "SET.CRITERIA",
  39: "SORT",
  40: "DATA.SERIES",
  41: "TABLE",
  42: "FORMAT.NUMBER",
  43: "ALIGNMENT",
  44: "STYLE",
  45: "BORDER",
  46: "CELL.PROTECTION",
  47: "COLUMN.WIDTH",
  48: "UNDO",
  49: "CUT",
  50: "COPY",
  51: "PASTE",
  52: "CLEAR",
  53: "PASTE.SPECIAL",
  54: "EDIT.DELETE",
  55: "INSERT",
  56: "FILL.RIGHT",
  57: "FILL.DOWN",
  61: "DEFINE.NAME",
  62: "CREATE.NAMES",
  63: "FORMULA.GOTO",
  64: "FORMULA.FIND",
  65: "SELECT.LAST.CELL",
  66: "SHOW.ACTIVE.CELL",
  67: "GALLERY.AREA",
  68: "GALLERY.BAR",
  69: "GALLERY.COLUMN",
  70: "GALLERY.LINE",
  71: "GALLERY.PIE",
  72: "GALLERY.SCATTER",
  73: "COMBINATION",
  74: "PREFERRED",
  75: "ADD.OVERLAY",
  76: "GRIDLINES",
  77: "SET.PREFERRED",
  78: "AXES",
  79: "LEGEND",
  80: "ATTACH.TEXT",
  81: "ADD.ARROW",
  82: "SELECT.CHART",
  83: "SELECT.PLOT.AREA",
  84: "PATTERNS",
  85: "MAIN.CHART",
  86: "OVERLAY",
  87: "SCALE",
  88: "FORMAT.LEGEND",
  89: "FORMAT.TEXT",
  90: "EDIT.REPEAT",
  91: "PARSE",
  92: "JUSTIFY",
  93: "HIDE",
  94: "UNHIDE",
  95: "WORKSPACE",
  96: "FORMULA",
  97: "FORMULA.FILL",
  98: "FORMULA.ARRAY",
  99: "DATA.FIND.NEXT",
  100: "DATA.FIND.PREV",
  101: "FORMULA.FIND.NEXT",
  102: "FORMULA.FIND.PREV",
  103: "ACTIVATE",
  104: "ACTIVATE.NEXT",
  105: "ACTIVATE.PREV",
  106: "UNLOCKED.NEXT",
  107: "UNLOCKED.PREV",
  108: "COPY.PICTURE",
  109: "SELECT",
  110: "DELETE.NAME",
  111: "DELETE.FORMAT",
  112: "VLINE",
  113: "HLINE",
  114: "VPAGE",
  115: "HPAGE",
  116: "VSCROLL",
  117: "HSCROLL",
  118: "ALERT",
  119: "NEW",
  120: "CANCEL.COPY",
  121: "SHOW.CLIPBOARD",
  122: "MESSAGE",
  124: "PASTE.LINK",
  125: "APP.ACTIVATE",
  126: "DELETE.ARROW",
  127: "ROW.HEIGHT",
  128: "FORMAT.MOVE",
  129: "FORMAT.SIZE",
  130: "FORMULA.REPLACE",
  131: "SEND.KEYS",
  132: "SELECT.SPECIAL",
  133: "APPLY.NAMES",
  134: "REPLACE.FONT",
  135: "FREEZE.PANES",
  136: "SHOW.INFO",
  137: "SPLIT",
  138: "ON.WINDOW",
  139: "ON.DATA",
  140: "DISABLE.INPUT",
  142: "OUTLINE",
  143: "LIST.NAMES",
  144: "FILE.CLOSE",
  145: "SAVE.WORKBOOK",
  146: "DATA.FORM",
  147: "COPY.CHART",
  148: "ON.TIME",
  149: "WAIT",
  150: "FORMAT.FONT",
  151: "FILL.UP",
  152: "FILL.LEFT",
  153: "DELETE.OVERLAY",
  155: "SHORT.MENUS",
  159: "SET.UPDATE.STATUS",
  161: "COLOR.PALETTE",
  162: "DELETE.STYLE",
  163: "WINDOW.RESTORE",
  164: "WINDOW.MAXIMIZE",
  166: "CHANGE.LINK",
  167: "CALCULATE.DOCUMENT",
  168: "ON.KEY",
  169: "APP.RESTORE",
  170: "APP.MOVE",
  171: "APP.SIZE",
  172: "APP.MINIMIZE",
  173: "APP.MAXIMIZE",
  174: "BRING.TO.FRONT",
  175: "SEND.TO.BACK",
  185: "MAIN.CHART.TYPE",
  186: "OVERLAY.CHART.TYPE",
  187: "SELECT.END",
  188: "OPEN.MAIL",
  189: "SEND.MAIL",
  190: "STANDARD.FONT",
  191: "CONSOLIDATE",
  192: "SORT.SPECIAL",
  193: "GALLERY.3D.AREA",
  194: "GALLERY.3D.COLUMN",
  195: "GALLERY.3D.LINE",
  196: "GALLERY.3D.PIE",
  197: "VIEW.3D",
  198: "GOAL.SEEK",
  199: "WORKGROUP",
  200: "FILL.GROUP",
  201: "UPDATE.LINK",
  202: "PROMOTE",
  203: "DEMOTE",
  204: "SHOW.DETAIL",
  206: "UNGROUP",
  207: "OBJECT.PROPERTIES",
  208: "SAVE.NEW.OBJECT",
  209: "SHARE",
  210: "SHARE.NAME",
  211: "DUPLICATE",
  212: "APPLY.STYLE",
  213: "ASSIGN.TO.OBJECT",
  214: "OBJECT.PROTECTION",
  215: "HIDE.OBJECT",
  216: "SET.EXTRACT",
  217: "CREATE.PUBLISHER",
  218: "SUBSCRIBE.TO",
  219: "ATTRIBUTES",
  220: "SHOW.TOOLBAR",
  222: "PRINT.PREVIEW",
  223: "EDIT.COLOR",
  224: "SHOW.LEVELS",
  225: "FORMAT.MAIN",
  226: "FORMAT.OVERLAY",
  227: "ON.RECALC",
  228: "EDIT.SERIES",
  229: "DEFINE.STYLE",
  240: "LINE.PRINT",
  243: "ENTER.DATA",
  249: "GALLERY.RADAR",
  250: "MERGE.STYLES",
  251: "EDITION.OPTIONS",
  252: "PASTE.PICTURE",
  253: "PASTE.PICTURE.LINK",
  254: "SPELLING",
  256: "ZOOM",
  259: "INSERT.OBJECT",
  260: "WINDOW.MINIMIZE",
  265: "SOUND.NOTE",
  266: "SOUND.PLAY",
  267: "FORMAT.SHAPE",
  268: "EXTEND.POLYGON",
  269: "FORMAT.AUTO",
  272: "GALLERY.3D.BAR",
  273: "GALLERY.3D.SURFACE",
  274: "FILL.AUTO",
  276: "CUSTOMIZE.TOOLBAR",
  277: "ADD.TOOL",
  278: "EDIT.OBJECT",
  279: "ON.DOUBLECLICK",
  280: "ON.ENTRY",
  281: "WORKBOOK.ADD",
  282: "WORKBOOK.MOVE",
  283: "WORKBOOK.COPY",
  284: "WORKBOOK.OPTIONS",
  285: "SAVE.WORKSPACE",
  288: "CHART.WIZARD",
  289: "DELETE.TOOL",
  290: "MOVE.TOOL",
  291: "WORKBOOK.SELECT",
  292: "WORKBOOK.ACTIVATE",
  293: "ASSIGN.TO.TOOL",
  295: "COPY.TOOL",
  296: "RESET.TOOL",
  297: "CONSTRAIN.NUMERIC",
  298: "PASTE.TOOL",
  302: "WORKBOOK.NEW",
  305: "SCENARIO.CELLS",
  306: "SCENARIO.DELETE",
  307: "SCENARIO.ADD",
  308: "SCENARIO.EDIT",
  309: "SCENARIO.SHOW",
  310: "SCENARIO.SHOW.NEXT",
  311: "SCENARIO.SUMMARY",
  312: "PIVOT.TABLE.WIZARD",
  313: "PIVOT.FIELD.PROPERTIES",
  314: "PIVOT.FIELD",
  315: "PIVOT.ITEM",
  316: "PIVOT.ADD.FIELDS",
  318: "OPTIONS.CALCULATION",
  319: "OPTIONS.EDIT",
  320: "OPTIONS.VIEW",
  321: "ADDIN.MANAGER",
  322: "MENU.EDITOR",
  323: "ATTACH.TOOLBARS",
  324: "VBAActivate",
  325: "OPTIONS.CHART",
  328: "VBA.INSERT.FILE",
  330: "VBA.PROCEDURE.DEFINITION",
  336: "ROUTING.SLIP",
  338: "ROUTE.DOCUMENT",
  339: "MAIL.LOGON",
  342: "INSERT.PICTURE",
  343: "EDIT.TOOL",
  344: "GALLERY.DOUGHNUT",
  350: "CHART.TREND",
  352: "PIVOT.ITEM.PROPERTIES",
  354: "WORKBOOK.INSERT",
  355: "OPTIONS.TRANSITION",
  356: "OPTIONS.GENERAL",
  370: "FILTER.ADVANCED",
  373: "MAIL.ADD.MAILER",
  374: "MAIL.DELETE.MAILER",
  375: "MAIL.REPLY",
  376: "MAIL.REPLY.ALL",
  377: "MAIL.FORWARD",
  378: "MAIL.NEXT.LETTER",
  379: "DATA.LABEL",
  380: "INSERT.TITLE",
  381: "FONT.PROPERTIES",
  382: "MACRO.OPTIONS",
  383: "WORKBOOK.HIDE",
  384: "WORKBOOK.UNHIDE",
  385: "WORKBOOK.DELETE",
  386: "WORKBOOK.NAME",
  388: "GALLERY.CUSTOM",
  390: "ADD.CHART.AUTOFORMAT",
  391: "DELETE.CHART.AUTOFORMAT",
  392: "CHART.ADD.DATA",
  393: "AUTO.OUTLINE",
  394: "TAB.ORDER",
  395: "SHOW.DIALOG",
  396: "SELECT.ALL",
  397: "UNGROUP.SHEETS",
  398: "SUBTOTAL.CREATE",
  399: "SUBTOTAL.REMOVE",
  400: "RENAME.OBJECT",
  412: "WORKBOOK.SCROLL",
  413: "WORKBOOK.NEXT",
  414: "WORKBOOK.PREV",
  415: "WORKBOOK.TAB.SPLIT",
  416: "FULL.SCREEN",
  417: "WORKBOOK.PROTECT",
  420: "SCROLLBAR.PROPERTIES",
  421: "PIVOT.SHOW.PAGES",
  422: "TEXT.TO.COLUMNS",
  423: "FORMAT.CHARTTYPE",
  424: "LINK.FORMAT",
  425: "TRACER.DISPLAY",
  430: "TRACER.NAVIGATE",
  431: "TRACER.CLEAR",
  432: "TRACER.ERROR",
  433: "PIVOT.FIELD.GROUP",
  434: "PIVOT.FIELD.UNGROUP",
  435: "CHECKBOX.PROPERTIES",
  436: "LABEL.PROPERTIES",
  437: "LISTBOX.PROPERTIES",
  438: "EDITBOX.PROPERTIES",
  439: "PIVOT.REFRESH",
  440: "LINK.COMBO",
  441: "OPEN.TEXT",
  442: "HIDE.DIALOG",
  443: "SET.DIALOG.FOCUS",
  444: "ENABLE.OBJECT",
  445: "PUSHBUTTON.PROPERTIES",
  446: "SET.DIALOG.DEFAULT",
  447: "FILTER",
  448: "FILTER.SHOW.ALL",
  449: "CLEAR.OUTLINE",
  450: "FUNCTION.WIZARD",
  451: "ADD.LIST.ITEM",
  452: "SET.LIST.ITEM",
  453: "REMOVE.LIST.ITEM",
  454: "SELECT.LIST.ITEM",
  455: "SET.CONTROL.VALUE",
  456: "SAVE.COPY.AS",
  458: "OPTIONS.LISTS.ADD",
  459: "OPTIONS.LISTS.DELETE",
  460: "SERIES.AXES",
  461: "SERIES.X",
  462: "SERIES.Y",
  463: "ERRORBAR.X",
  464: "ERRORBAR.Y",
  465: "FORMAT.CHART",
  466: "SERIES.ORDER",
  467: "MAIL.LOGOFF",
  468: "CLEAR.ROUTING.SLIP",
  469: "APP.ACTIVATE.MICROSOFT",
  470: "MAIL.EDIT.MAILER",
  471: "ON.SHEET",
  472: "STANDARD.WIDTH",
  473: "SCENARIO.MERGE",
  474: "SUMMARY.INFO",
  475: "FIND.FILE",
  476: "ACTIVE.CELL.FONT",
  477: "ENABLE.TIPWIZARD",
  478: "VBA.MAKE.ADDIN",
  480: "INSERTDATATABLE",
  481: "WORKGROUP.OPTIONS",
  482: "MAIL.SEND.MAILER",
  485: "AUTOCORRECT",
  489: "POST.DOCUMENT",
  491: "PICKLIST",
  493: "VIEW.SHOW",
  494: "VIEW.DEFINE",
  495: "VIEW.DELETE",
  509: "SHEET.BACKGROUND",
  510: "INSERT.MAP.OBJECT",
  511: "OPTIONS.MENONO",
  517: "MSOCHECKS",
  518: "NORMAL",
  519: "LAYOUT",
  520: "RM.PRINT.AREA",
  521: "CLEAR.PRINT.AREA",
  522: "ADD.PRINT.AREA",
  523: "MOVE.BRK",
  545: "HIDECURR.NOTE",
  546: "HIDEALL.NOTES",
  547: "DELETE.NOTE",
  548: "TRAVERSE.NOTES",
  549: "ACTIVATE.NOTES",
  620: "PROTECT.REVISIONS",
  621: "UNPROTECT.REVISIONS",
  647: "OPTIONS.ME",
  653: "WEB.PUBLISH",
  667: "NEWWEBQUERY",
  673: "PIVOT.TABLE.CHART",
  753: "OPTIONS.SAVE",
  755: "OPTIONS.SPELL",
  808: "HIDEALL.INKANNOTS"
}, Ki = {
  0: "COUNT",
  1: "IF",
  2: "ISNA",
  3: "ISERROR",
  4: "SUM",
  5: "AVERAGE",
  6: "MIN",
  7: "MAX",
  8: "ROW",
  9: "COLUMN",
  10: "NA",
  11: "NPV",
  12: "STDEV",
  13: "DOLLAR",
  14: "FIXED",
  15: "SIN",
  16: "COS",
  17: "TAN",
  18: "ATAN",
  19: "PI",
  20: "SQRT",
  21: "EXP",
  22: "LN",
  23: "LOG10",
  24: "ABS",
  25: "INT",
  26: "SIGN",
  27: "ROUND",
  28: "LOOKUP",
  29: "INDEX",
  30: "REPT",
  31: "MID",
  32: "LEN",
  33: "VALUE",
  34: "TRUE",
  35: "FALSE",
  36: "AND",
  37: "OR",
  38: "NOT",
  39: "MOD",
  40: "DCOUNT",
  41: "DSUM",
  42: "DAVERAGE",
  43: "DMIN",
  44: "DMAX",
  45: "DSTDEV",
  46: "VAR",
  47: "DVAR",
  48: "TEXT",
  49: "LINEST",
  50: "TREND",
  51: "LOGEST",
  52: "GROWTH",
  53: "GOTO",
  54: "HALT",
  55: "RETURN",
  56: "PV",
  57: "FV",
  58: "NPER",
  59: "PMT",
  60: "RATE",
  61: "MIRR",
  62: "IRR",
  63: "RAND",
  64: "MATCH",
  65: "DATE",
  66: "TIME",
  67: "DAY",
  68: "MONTH",
  69: "YEAR",
  70: "WEEKDAY",
  71: "HOUR",
  72: "MINUTE",
  73: "SECOND",
  74: "NOW",
  75: "AREAS",
  76: "ROWS",
  77: "COLUMNS",
  78: "OFFSET",
  79: "ABSREF",
  80: "RELREF",
  81: "ARGUMENT",
  82: "SEARCH",
  83: "TRANSPOSE",
  84: "ERROR",
  85: "STEP",
  86: "TYPE",
  87: "ECHO",
  88: "SET.NAME",
  89: "CALLER",
  90: "DEREF",
  91: "WINDOWS",
  92: "SERIES",
  93: "DOCUMENTS",
  94: "ACTIVE.CELL",
  95: "SELECTION",
  96: "RESULT",
  97: "ATAN2",
  98: "ASIN",
  99: "ACOS",
  100: "CHOOSE",
  101: "HLOOKUP",
  102: "VLOOKUP",
  103: "LINKS",
  104: "INPUT",
  105: "ISREF",
  106: "GET.FORMULA",
  107: "GET.NAME",
  108: "SET.VALUE",
  109: "LOG",
  110: "EXEC",
  111: "CHAR",
  112: "LOWER",
  113: "UPPER",
  114: "PROPER",
  115: "LEFT",
  116: "RIGHT",
  117: "EXACT",
  118: "TRIM",
  119: "REPLACE",
  120: "SUBSTITUTE",
  121: "CODE",
  122: "NAMES",
  123: "DIRECTORY",
  124: "FIND",
  125: "CELL",
  126: "ISERR",
  127: "ISTEXT",
  128: "ISNUMBER",
  129: "ISBLANK",
  130: "T",
  131: "N",
  132: "FOPEN",
  133: "FCLOSE",
  134: "FSIZE",
  135: "FREADLN",
  136: "FREAD",
  137: "FWRITELN",
  138: "FWRITE",
  139: "FPOS",
  140: "DATEVALUE",
  141: "TIMEVALUE",
  142: "SLN",
  143: "SYD",
  144: "DDB",
  145: "GET.DEF",
  146: "REFTEXT",
  147: "TEXTREF",
  148: "INDIRECT",
  149: "REGISTER",
  150: "CALL",
  151: "ADD.BAR",
  152: "ADD.MENU",
  153: "ADD.COMMAND",
  154: "ENABLE.COMMAND",
  155: "CHECK.COMMAND",
  156: "RENAME.COMMAND",
  157: "SHOW.BAR",
  158: "DELETE.MENU",
  159: "DELETE.COMMAND",
  160: "GET.CHART.ITEM",
  161: "DIALOG.BOX",
  162: "CLEAN",
  163: "MDETERM",
  164: "MINVERSE",
  165: "MMULT",
  166: "FILES",
  167: "IPMT",
  168: "PPMT",
  169: "COUNTA",
  170: "CANCEL.KEY",
  171: "FOR",
  172: "WHILE",
  173: "BREAK",
  174: "NEXT",
  175: "INITIATE",
  176: "REQUEST",
  177: "POKE",
  178: "EXECUTE",
  179: "TERMINATE",
  180: "RESTART",
  181: "HELP",
  182: "GET.BAR",
  183: "PRODUCT",
  184: "FACT",
  185: "GET.CELL",
  186: "GET.WORKSPACE",
  187: "GET.WINDOW",
  188: "GET.DOCUMENT",
  189: "DPRODUCT",
  190: "ISNONTEXT",
  191: "GET.NOTE",
  192: "NOTE",
  193: "STDEVP",
  194: "VARP",
  195: "DSTDEVP",
  196: "DVARP",
  197: "TRUNC",
  198: "ISLOGICAL",
  199: "DCOUNTA",
  200: "DELETE.BAR",
  201: "UNREGISTER",
  204: "USDOLLAR",
  205: "FINDB",
  206: "SEARCHB",
  207: "REPLACEB",
  208: "LEFTB",
  209: "RIGHTB",
  210: "MIDB",
  211: "LENB",
  212: "ROUNDUP",
  213: "ROUNDDOWN",
  214: "ASC",
  215: "DBCS",
  216: "RANK",
  219: "ADDRESS",
  220: "DAYS360",
  221: "TODAY",
  222: "VDB",
  223: "ELSE",
  224: "ELSE.IF",
  225: "END.IF",
  226: "FOR.CELL",
  227: "MEDIAN",
  228: "SUMPRODUCT",
  229: "SINH",
  230: "COSH",
  231: "TANH",
  232: "ASINH",
  233: "ACOSH",
  234: "ATANH",
  235: "DGET",
  236: "CREATE.OBJECT",
  237: "VOLATILE",
  238: "LAST.ERROR",
  239: "CUSTOM.UNDO",
  240: "CUSTOM.REPEAT",
  241: "FORMULA.CONVERT",
  242: "GET.LINK.INFO",
  243: "TEXT.BOX",
  244: "INFO",
  245: "GROUP",
  246: "GET.OBJECT",
  247: "DB",
  248: "PAUSE",
  251: "RESUME",
  252: "FREQUENCY",
  253: "ADD.TOOLBAR",
  254: "DELETE.TOOLBAR",
  255: "User",
  256: "RESET.TOOLBAR",
  257: "EVALUATE",
  258: "GET.TOOLBAR",
  259: "GET.TOOL",
  260: "SPELLING.CHECK",
  261: "ERROR.TYPE",
  262: "APP.TITLE",
  263: "WINDOW.TITLE",
  264: "SAVE.TOOLBAR",
  265: "ENABLE.TOOL",
  266: "PRESS.TOOL",
  267: "REGISTER.ID",
  268: "GET.WORKBOOK",
  269: "AVEDEV",
  270: "BETADIST",
  271: "GAMMALN",
  272: "BETAINV",
  273: "BINOMDIST",
  274: "CHIDIST",
  275: "CHIINV",
  276: "COMBIN",
  277: "CONFIDENCE",
  278: "CRITBINOM",
  279: "EVEN",
  280: "EXPONDIST",
  281: "FDIST",
  282: "FINV",
  283: "FISHER",
  284: "FISHERINV",
  285: "FLOOR",
  286: "GAMMADIST",
  287: "GAMMAINV",
  288: "CEILING",
  289: "HYPGEOMDIST",
  290: "LOGNORMDIST",
  291: "LOGINV",
  292: "NEGBINOMDIST",
  293: "NORMDIST",
  294: "NORMSDIST",
  295: "NORMINV",
  296: "NORMSINV",
  297: "STANDARDIZE",
  298: "ODD",
  299: "PERMUT",
  300: "POISSON",
  301: "TDIST",
  302: "WEIBULL",
  303: "SUMXMY2",
  304: "SUMX2MY2",
  305: "SUMX2PY2",
  306: "CHITEST",
  307: "CORREL",
  308: "COVAR",
  309: "FORECAST",
  310: "FTEST",
  311: "INTERCEPT",
  312: "PEARSON",
  313: "RSQ",
  314: "STEYX",
  315: "SLOPE",
  316: "TTEST",
  317: "PROB",
  318: "DEVSQ",
  319: "GEOMEAN",
  320: "HARMEAN",
  321: "SUMSQ",
  322: "KURT",
  323: "SKEW",
  324: "ZTEST",
  325: "LARGE",
  326: "SMALL",
  327: "QUARTILE",
  328: "PERCENTILE",
  329: "PERCENTRANK",
  330: "MODE",
  331: "TRIMMEAN",
  332: "TINV",
  334: "MOVIE.COMMAND",
  335: "GET.MOVIE",
  336: "CONCATENATE",
  337: "POWER",
  338: "PIVOT.ADD.DATA",
  339: "GET.PIVOT.TABLE",
  340: "GET.PIVOT.FIELD",
  341: "GET.PIVOT.ITEM",
  342: "RADIANS",
  343: "DEGREES",
  344: "SUBTOTAL",
  345: "SUMIF",
  346: "COUNTIF",
  347: "COUNTBLANK",
  348: "SCENARIO.GET",
  349: "OPTIONS.LISTS.GET",
  350: "ISPMT",
  351: "DATEDIF",
  352: "DATESTRING",
  353: "NUMBERSTRING",
  354: "ROMAN",
  355: "OPEN.DIALOG",
  356: "SAVE.DIALOG",
  357: "VIEW.GET",
  358: "GETPIVOTDATA",
  359: "HYPERLINK",
  360: "PHONETIC",
  361: "AVERAGEA",
  362: "MAXA",
  363: "MINA",
  364: "STDEVPA",
  365: "VARPA",
  366: "STDEVA",
  367: "VARA",
  368: "BAHTTEXT",
  369: "THAIDAYOFWEEK",
  370: "THAIDIGIT",
  371: "THAIMONTHOFYEAR",
  372: "THAINUMSOUND",
  373: "THAINUMSTRING",
  374: "THAISTRINGLENGTH",
  375: "ISTHAIDIGIT",
  376: "ROUNDBAHTDOWN",
  377: "ROUNDBAHTUP",
  378: "THAIYEAR",
  379: "RTD",
  380: "CUBEVALUE",
  381: "CUBEMEMBER",
  382: "CUBEMEMBERPROPERTY",
  383: "CUBERANKEDMEMBER",
  384: "HEX2BIN",
  385: "HEX2DEC",
  386: "HEX2OCT",
  387: "DEC2BIN",
  388: "DEC2HEX",
  389: "DEC2OCT",
  390: "OCT2BIN",
  391: "OCT2HEX",
  392: "OCT2DEC",
  393: "BIN2DEC",
  394: "BIN2OCT",
  395: "BIN2HEX",
  396: "IMSUB",
  397: "IMDIV",
  398: "IMPOWER",
  399: "IMABS",
  400: "IMSQRT",
  401: "IMLN",
  402: "IMLOG2",
  403: "IMLOG10",
  404: "IMSIN",
  405: "IMCOS",
  406: "IMEXP",
  407: "IMARGUMENT",
  408: "IMCONJUGATE",
  409: "IMAGINARY",
  410: "IMREAL",
  411: "COMPLEX",
  412: "IMSUM",
  413: "IMPRODUCT",
  414: "SERIESSUM",
  415: "FACTDOUBLE",
  416: "SQRTPI",
  417: "QUOTIENT",
  418: "DELTA",
  419: "GESTEP",
  420: "ISEVEN",
  421: "ISODD",
  422: "MROUND",
  423: "ERF",
  424: "ERFC",
  425: "BESSELJ",
  426: "BESSELK",
  427: "BESSELY",
  428: "BESSELI",
  429: "XIRR",
  430: "XNPV",
  431: "PRICEMAT",
  432: "YIELDMAT",
  433: "INTRATE",
  434: "RECEIVED",
  435: "DISC",
  436: "PRICEDISC",
  437: "YIELDDISC",
  438: "TBILLEQ",
  439: "TBILLPRICE",
  440: "TBILLYIELD",
  441: "PRICE",
  442: "YIELD",
  443: "DOLLARDE",
  444: "DOLLARFR",
  445: "NOMINAL",
  446: "EFFECT",
  447: "CUMPRINC",
  448: "CUMIPMT",
  449: "EDATE",
  450: "EOMONTH",
  451: "YEARFRAC",
  452: "COUPDAYBS",
  453: "COUPDAYS",
  454: "COUPDAYSNC",
  455: "COUPNCD",
  456: "COUPNUM",
  457: "COUPPCD",
  458: "DURATION",
  459: "MDURATION",
  460: "ODDLPRICE",
  461: "ODDLYIELD",
  462: "ODDFPRICE",
  463: "ODDFYIELD",
  464: "RANDBETWEEN",
  465: "WEEKNUM",
  466: "AMORDEGRC",
  467: "AMORLINC",
  468: "CONVERT",
  724: "SHEETJS",
  469: "ACCRINT",
  470: "ACCRINTM",
  471: "WORKDAY",
  472: "NETWORKDAYS",
  473: "GCD",
  474: "MULTINOMIAL",
  475: "LCM",
  476: "FVSCHEDULE",
  477: "CUBEKPIMEMBER",
  478: "CUBESET",
  479: "CUBESETCOUNT",
  480: "IFERROR",
  481: "COUNTIFS",
  482: "SUMIFS",
  483: "AVERAGEIF",
  484: "AVERAGEIFS"
}, Rx = {
  2: 1,
  3: 1,
  10: 0,
  15: 1,
  16: 1,
  17: 1,
  18: 1,
  19: 0,
  20: 1,
  21: 1,
  22: 1,
  23: 1,
  24: 1,
  25: 1,
  26: 1,
  27: 2,
  30: 2,
  31: 3,
  32: 1,
  33: 1,
  34: 0,
  35: 0,
  38: 1,
  39: 2,
  40: 3,
  41: 3,
  42: 3,
  43: 3,
  44: 3,
  45: 3,
  47: 3,
  48: 2,
  53: 1,
  61: 3,
  63: 0,
  65: 3,
  66: 3,
  67: 1,
  68: 1,
  69: 1,
  70: 1,
  71: 1,
  72: 1,
  73: 1,
  74: 0,
  75: 1,
  76: 1,
  77: 1,
  79: 2,
  80: 2,
  83: 1,
  85: 0,
  86: 1,
  89: 0,
  90: 1,
  94: 0,
  95: 0,
  97: 2,
  98: 1,
  99: 1,
  101: 3,
  102: 3,
  105: 1,
  106: 1,
  108: 2,
  111: 1,
  112: 1,
  113: 1,
  114: 1,
  117: 2,
  118: 1,
  119: 4,
  121: 1,
  126: 1,
  127: 1,
  128: 1,
  129: 1,
  130: 1,
  131: 1,
  133: 1,
  134: 1,
  135: 1,
  136: 2,
  137: 2,
  138: 2,
  140: 1,
  141: 1,
  142: 3,
  143: 4,
  144: 4,
  161: 1,
  162: 1,
  163: 1,
  164: 1,
  165: 2,
  172: 1,
  175: 2,
  176: 2,
  177: 3,
  178: 2,
  179: 1,
  184: 1,
  186: 1,
  189: 3,
  190: 1,
  195: 3,
  196: 3,
  197: 1,
  198: 1,
  199: 3,
  201: 1,
  207: 4,
  210: 3,
  211: 1,
  212: 2,
  213: 2,
  214: 1,
  215: 1,
  225: 0,
  229: 1,
  230: 1,
  231: 1,
  232: 1,
  233: 1,
  234: 1,
  235: 3,
  244: 1,
  247: 4,
  252: 2,
  257: 1,
  261: 1,
  271: 1,
  273: 4,
  274: 2,
  275: 2,
  276: 2,
  277: 3,
  278: 3,
  279: 1,
  280: 3,
  281: 3,
  282: 3,
  283: 1,
  284: 1,
  285: 2,
  286: 4,
  287: 3,
  288: 2,
  289: 4,
  290: 3,
  291: 3,
  292: 3,
  293: 4,
  294: 1,
  295: 3,
  296: 1,
  297: 3,
  298: 1,
  299: 2,
  300: 3,
  301: 3,
  302: 4,
  303: 2,
  304: 2,
  305: 2,
  306: 2,
  307: 2,
  308: 2,
  309: 3,
  310: 2,
  311: 2,
  312: 2,
  313: 2,
  314: 2,
  315: 2,
  316: 4,
  325: 2,
  326: 2,
  327: 2,
  328: 2,
  331: 2,
  332: 2,
  337: 2,
  342: 1,
  343: 1,
  346: 2,
  347: 1,
  350: 4,
  351: 3,
  352: 1,
  353: 2,
  360: 1,
  368: 1,
  369: 1,
  370: 1,
  371: 1,
  372: 1,
  373: 1,
  374: 1,
  375: 1,
  376: 1,
  377: 1,
  378: 1,
  382: 3,
  385: 1,
  392: 1,
  393: 1,
  396: 2,
  397: 2,
  398: 2,
  399: 1,
  400: 1,
  401: 1,
  402: 1,
  403: 1,
  404: 1,
  405: 1,
  406: 1,
  407: 1,
  408: 1,
  409: 1,
  410: 1,
  414: 4,
  415: 1,
  416: 1,
  417: 2,
  420: 1,
  421: 1,
  422: 2,
  424: 1,
  425: 2,
  426: 2,
  427: 2,
  428: 2,
  430: 3,
  438: 3,
  439: 3,
  440: 3,
  443: 2,
  444: 2,
  445: 2,
  446: 2,
  447: 6,
  448: 6,
  449: 2,
  450: 2,
  464: 2,
  468: 3,
  476: 2,
  479: 1,
  480: 2,
  65535: 0
};
function l0(e) {
  return e.slice(0, 3) == "of:" && (e = e.slice(3)), e.charCodeAt(0) == 61 && (e = e.slice(1), e.charCodeAt(0) == 61 && (e = e.slice(1))), e = e.replace(/COM\.MICROSOFT\./g, ""), e = e.replace(/\[((?:\.[A-Z]+[0-9]+)(?::\.[A-Z]+[0-9]+)?)\]/g, function(t, r) {
    return r.replace(/\./g, "");
  }), e = e.replace(/\$'([^']|'')+'/g, function(t) {
    return t.slice(1);
  }), e = e.replace(/\$([^\]\. #$]+)/g, function(t, r) {
    return r.match(/^([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])?(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})?$/) ? t : r;
  }), e = e.replace(/\[.(#[A-Z]*[?!])\]/g, "$1"), e.replace(/[;~]/g, ",").replace(/\|/g, ";");
}
function wn(e) {
  e = e.replace(/\$'([^']|'')+'/g, function(a) {
    return a.slice(1);
  }), e = e.replace(/\$([^\]\. #$]+)/g, function(a, n) {
    return n.match(/^([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])?(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})?$/) ? a : n;
  });
  var t = e.split(":"), r = t[0].split(".")[0];
  return [r, t[0].split(".")[1] + (t.length > 1 ? ":" + (t[1].split(".")[1] || t[1].split(".")[0]) : "")];
}
var fa = {}, Vt = {};
function oa(e, t) {
  if (e) {
    var r = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    t == "xlml" && (r = [1, 1, 1, 1, 0.5, 0.5]), e.left == null && (e.left = r[0]), e.right == null && (e.right = r[1]), e.top == null && (e.top = r[2]), e.bottom == null && (e.bottom = r[3]), e.header == null && (e.header = r[4]), e.footer == null && (e.footer = r[5]);
  }
}
function ji(e, t, r, a, n, s, i) {
  try {
    a.cellNF && (e.z = _e[t]);
  } catch (f) {
    if (a.WTF) throw f;
  }
  if (!(e.t === "z" && !a.cellStyles)) {
    if (e.t === "d" && typeof e.v == "string" && (e.v = xr(e.v)), (!a || a.cellText !== !1) && e.t !== "z") try {
      if (_e[t] == null && Tt(Ao[t] || "General", t), e.t === "e") e.w = e.w || Pr[e.v];
      else if (t === 0)
        if (e.t === "n")
          (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = pa(e.v);
        else if (e.t === "d") {
          var c = fr(e.v, !!i);
          (c | 0) === c ? e.w = c.toString(10) : e.w = pa(c);
        } else {
          if (e.v === void 0) return "";
          e.w = yt(e.v, Vt);
        }
      else e.t === "d" ? e.w = Lr(t, fr(e.v, !!i), Vt) : e.w = Lr(t, e.v, Vt);
    } catch (f) {
      if (a.WTF) throw f;
    }
    if (a.cellStyles && r != null)
      try {
        e.s = s.Fills[r], e.s.fgColor && e.s.fgColor.theme && !e.s.fgColor.rgb && (e.s.fgColor.rgb = qa(n.themeElements.clrScheme[e.s.fgColor.theme].rgb, e.s.fgColor.tint || 0), a.WTF && (e.s.fgColor.raw_rgb = n.themeElements.clrScheme[e.s.fgColor.theme].rgb)), e.s.bgColor && e.s.bgColor.theme && (e.s.bgColor.rgb = qa(n.themeElements.clrScheme[e.s.bgColor.theme].rgb, e.s.bgColor.tint || 0), a.WTF && (e.s.bgColor.raw_rgb = n.themeElements.clrScheme[e.s.bgColor.theme].rgb));
      } catch (f) {
        if (a.WTF && s.Fills) throw f;
      }
  }
}
function Ix(e, t) {
  var r = qe(t);
  r.s.r <= r.e.r && r.s.c <= r.e.c && r.s.r >= 0 && r.s.c >= 0 && (e["!ref"] = Pe(r));
}
var Ox = /<(?:\w+:)?mergeCell ref=["'][A-Z0-9:]+['"]\s*[\/]?>/g, Mx = /<(?:\w+:)?hyperlink [^<>]*>/mg, Lx = /"(\w*:\w*)"/, Bx = /<(?:\w+:)?col\b[^<>]*[\/]?>/g, Ux = /<(?:\w+:)?autoFilter[^>]*/g, Hx = /<(?:\w+:)?pageMargins[^<>]*\/>/g, Yi = /<(?:\w+:)?sheetPr\b[^<>]*?\/>/;
function Wx(e, t, r, a, n, s, i) {
  if (!e) return e;
  a || (a = { "!id": {} });
  var c = {};
  t.dense && (c["!data"] = []);
  var f = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, o = "", l = "", p = hr(e, "sheetData");
  p ? (o = e.slice(0, p.index), l = e.slice(p.index + p[0].length)) : o = l = e;
  var u = o.match(Yi);
  u ? as(u[0], c, n, r) : (u = hr(o, "sheetPr")) && Vx(u[0], u[1] || "", c, n, r);
  var h = (o.match(/<(?:\w*:)?dimension/) || { index: -1 }).index;
  if (h > 0) {
    var m = o.slice(h, h + 50).match(Lx);
    m && !(t && t.nodim) && Ix(c, m[1]);
  }
  var k = hr(o, "sheetViews");
  k && k[1] && jx(k[1], n);
  var x = [];
  if (t.cellStyles) {
    var d = o.match(Bx);
    d && Xx(x, d);
  }
  p && Yx(p[1], c, t, f, s, i, n);
  var _ = l.match(Ux);
  _ && (c["!autofilter"] = zx(_[0]));
  var g = [], C = l.match(Ox);
  if (C) for (h = 0; h != C.length; ++h)
    g[h] = qe(C[h].slice(C[h].indexOf("=") + 2));
  var O = l.match(Mx);
  O && $x(c, O, a);
  var U = l.match(Hx);
  U && (c["!margins"] = Gx(ue(U[0])));
  var P;
  if ((P = l.match(/legacyDrawing r:id="(.*?)"/)) && (c["!legrel"] = P[1]), t && t.nodim && (f.s.c = f.s.r = 0), !c["!ref"] && f.e.c >= f.s.c && f.e.r >= f.s.r && (c["!ref"] = Pe(f)), t.sheetRows > 0 && c["!ref"]) {
    var I = qe(c["!ref"]);
    t.sheetRows <= +I.e.r && (I.e.r = t.sheetRows - 1, I.e.r > f.e.r && (I.e.r = f.e.r), I.e.r < I.s.r && (I.s.r = I.e.r), I.e.c > f.e.c && (I.e.c = f.e.c), I.e.c < I.s.c && (I.s.c = I.e.c), c["!fullref"] = c["!ref"], c["!ref"] = Pe(I));
  }
  return x.length > 0 && (c["!cols"] = x), g.length > 0 && (c["!merges"] = g), a["!id"][c["!legrel"]] && (c["!legdrawel"] = a["!id"][c["!legrel"]]), c;
}
function as(e, t, r, a) {
  var n = ue(e);
  r.Sheets[a] || (r.Sheets[a] = {}), n.codeName && (r.Sheets[a].CodeName = be(Ve(n.codeName)));
}
function Vx(e, t, r, a, n) {
  as(e.slice(0, e.indexOf(">")), r, a, n);
}
function $x(e, t, r) {
  for (var a = e["!data"] != null, n = 0; n != t.length; ++n) {
    var s = ue(Ve(t[n]), !0);
    if (!s.ref) return;
    var i = ((r || {})["!id"] || [])[s.id];
    i ? (s.Target = i.Target, s.location && (s.Target += "#" + be(s.location))) : (s.Target = "#" + be(s.location), i = { Target: s.Target, TargetMode: "Internal" }), s.Rel = i, s.tooltip && (s.Tooltip = s.tooltip, delete s.tooltip);
    for (var c = qe(s.ref), f = c.s.r; f <= c.e.r; ++f) for (var o = c.s.c; o <= c.e.c; ++o) {
      var l = Me(o) + We(f);
      a ? (e["!data"][f] || (e["!data"][f] = []), e["!data"][f][o] || (e["!data"][f][o] = { t: "z", v: void 0 }), e["!data"][f][o].l = s) : (e[l] || (e[l] = { t: "z", v: void 0 }), e[l].l = s);
    }
  }
}
function Gx(e) {
  var t = {};
  return ["left", "right", "top", "bottom", "header", "footer"].forEach(function(r) {
    e[r] && (t[r] = parseFloat(e[r]));
  }), t;
}
function Xx(e, t) {
  for (var r = !1, a = 0; a != t.length; ++a) {
    var n = ue(t[a], !0);
    n.hidden && (n.hidden = He(n.hidden));
    var s = parseInt(n.min, 10) - 1, i = parseInt(n.max, 10) - 1;
    for (n.outlineLevel && (n.level = +n.outlineLevel || 0), delete n.min, delete n.max, n.width = +n.width, !r && n.width && (r = !0, es(n.width)), Xt(n); s <= i; ) e[s++] = ir(n);
  }
}
function zx(e) {
  var t = { ref: (e.match(/ref="([^"]*)"/) || [])[1] };
  return t;
}
var Kx = /<(?:\w:)?sheetView(?:[^<>a-z][^<>]*)?\/?>/g;
function jx(e, t) {
  t.Views || (t.Views = [{}]), (e.match(Kx) || []).forEach(function(r, a) {
    var n = ue(r);
    t.Views[a] || (t.Views[a] = {}), +n.zoomScale && (t.Views[a].zoom = +n.zoomScale), n.rightToLeft && He(n.rightToLeft) && (t.Views[a].RTL = !0);
  });
}
var Yx = /* @__PURE__ */ (function() {
  var e = /<(?:\w+:)?c[ \/>]/, t = /<\/(?:\w+:)?row>/, r = /r=["']([^"']*)["']/, a = /ref=["']([^"']*)["']/;
  return function(s, i, c, f, o, l, p) {
    for (var u = 0, h = "", m = [], k = [], x = 0, d = 0, _ = 0, g = "", C, O, U = 0, P = 0, I, N, B = 0, M = 0, X = Array.isArray(l.CellXf), j, oe = [], Z = [], xe = i["!data"] != null, q = [], ie = {}, ve = !1, K = !!c.sheetStubs, we = !!((p || {}).WBProps || {}).date1904, Ee = s.split(t), me = 0, le = Ee.length; me != le; ++me) {
      h = Ee[me].trim();
      var Ae = h.length;
      if (Ae !== 0) {
        var ke = 0;
        e: for (u = 0; u < Ae; ++u) switch (
          /*x.charCodeAt(ri)*/
          h[u]
        ) {
          case ">":
            if (
              /*x.charCodeAt(ri-1) != 47*/
              h[u - 1] != "/"
            ) {
              ++u;
              break e;
            }
            if (c && c.cellStyles) {
              if (O = ue(h.slice(ke, u), !0), U = O.r != null ? parseInt(O.r, 10) : U + 1, P = -1, c.sheetRows && c.sheetRows < U) continue;
              ie = {}, ve = !1, O.ht && (ve = !0, ie.hpt = parseFloat(O.ht), ie.hpx = ka(ie.hpt)), O.hidden && He(O.hidden) && (ve = !0, ie.hidden = !0), O.outlineLevel != null && (ve = !0, ie.level = +O.outlineLevel), ve && (q[U - 1] = ie);
            }
            break;
          case "<":
            ke = u;
            break;
        }
        if (ke >= u) break;
        if (O = ue(h.slice(ke, u), !0), U = O.r != null ? parseInt(O.r, 10) : U + 1, P = -1, !(c.sheetRows && c.sheetRows < U)) {
          c.nodim || (f.s.r > U - 1 && (f.s.r = U - 1), f.e.r < U - 1 && (f.e.r = U - 1)), c && c.cellStyles && (ie = {}, ve = !1, O.ht && (ve = !0, ie.hpt = parseFloat(O.ht), ie.hpx = ka(ie.hpt)), O.hidden && He(O.hidden) && (ve = !0, ie.hidden = !0), O.outlineLevel != null && (ve = !0, ie.level = +O.outlineLevel), ve && (q[U - 1] = ie)), m = h.slice(u).split(e);
          for (var Se = 0; Se != m.length && m[Se].trim().charAt(0) == "<"; ++Se) ;
          for (m = m.slice(Se), u = 0; u != m.length; ++u)
            if (h = m[u].trim(), h.length !== 0) {
              if (k = h.match(r), x = u, d = 0, _ = 0, h = "<c " + (h.slice(0, 1) == "<" ? ">" : "") + h, k != null && k.length === 2) {
                for (x = 0, g = k[1], d = 0; d != g.length && !((_ = g.charCodeAt(d) - 64) < 1 || _ > 26); ++d)
                  x = 26 * x + _;
                --x, P = x;
              } else ++P;
              for (d = 0; d != h.length && h.charCodeAt(d) !== 62; ++d) ;
              if (++d, O = ue(h.slice(0, d), !0), O.r || (O.r = Oe({ r: U - 1, c: P })), g = h.slice(d), C = { t: "" }, (k = hr(g, "v")) != null && /*::cref != null && */
              k[1] !== "" && (C.v = be(k[1])), c.cellFormula) {
                if ((k = hr(g, "f")) != null) {
                  if (k[1] == "")
                    /*::cref != null && cref[0] != null && */
                    k[0].indexOf('t="shared"') > -1 && (N = ue(k[0]), Z[N.si] && (C.f = s0(Z[N.si][1], Z[N.si][2], O.r)));
                  else if (C.f = be(Ve(k[1]), !0), c.xlfn || (C.f = i0(C.f)), /*::cref != null && cref[0] != null && */
                  k[0].indexOf('t="array"') > -1)
                    C.F = (g.match(a) || [])[1], C.F.indexOf(":") > -1 && oe.push([qe(C.F), C.F]);
                  else if (
                    /*::cref != null && cref[0] != null && */
                    k[0].indexOf('t="shared"') > -1
                  ) {
                    N = ue(k[0]);
                    var S = be(Ve(k[1]));
                    c.xlfn || (S = i0(S)), Z[parseInt(N.si, 10)] = [N, S, O.r];
                  }
                } else (k = g.match(/<f[^<>]*\/>/)) && (N = ue(k[0]), Z[N.si] && (C.f = s0(Z[N.si][1], Z[N.si][2], O.r)));
                var L = _r(O.r);
                for (d = 0; d < oe.length; ++d)
                  L.r >= oe[d][0].s.r && L.r <= oe[d][0].e.r && L.c >= oe[d][0].s.c && L.c <= oe[d][0].e.c && (C.F = oe[d][1]);
              }
              if (O.t == null && C.v === void 0)
                if (C.f || C.F)
                  C.v = 0, C.t = "n";
                else if (K) C.t = "z";
                else continue;
              else C.t = O.t || "n";
              switch (f.s.c > P && (f.s.c = P), f.e.c < P && (f.e.c = P), C.t) {
                case "n":
                  if (C.v == "" || C.v == null) {
                    if (!K) continue;
                    C.t = "z";
                  } else C.v = parseFloat(C.v);
                  break;
                case "s":
                  if (typeof C.v > "u") {
                    if (!K) continue;
                    C.t = "z";
                  } else
                    I = fa[parseInt(C.v, 10)], C.v = I.t, C.r = I.r, c.cellHTML && (C.h = I.h);
                  break;
                case "str":
                  C.t = "s", C.v = C.v != null ? be(Ve(C.v), !0) : "", c.cellHTML && (C.h = ra(C.v));
                  break;
                case "inlineStr":
                  k = hr(g, "is"), C.t = "s", k != null && (I = Qn(k[1])) ? (C.v = I.t, c.cellHTML && (C.h = I.h)) : C.v = "";
                  break;
                case "b":
                  C.v = He(C.v);
                  break;
                case "d":
                  c.cellDates ? C.v = xr(C.v, we) : (C.v = fr(xr(C.v, we), we), C.t = "n");
                  break;
                /* error string in .w, number in .v */
                case "e":
                  (!c || c.cellText !== !1) && (C.w = C.v), C.v = ur[C.v];
                  break;
              }
              if (B = M = 0, j = null, X && O.s !== void 0 && (j = l.CellXf[O.s], j != null && (j.numFmtId != null && (B = j.numFmtId), c.cellStyles && j.fillId != null && (M = j.fillId))), ji(C, B, M, c, o, l, we), c.cellDates && X && C.t == "n" && Jr(_e[B]) && (C.v = dt(C.v + (we ? 1462 : 0)), C.t = typeof C.v == "number" ? "n" : "d"), O.cm && c.xlmeta) {
                var R = (c.xlmeta.Cell || [])[+O.cm - 1];
                R && R.type == "XLDAPR" && (C.D = !0);
              }
              var b;
              c.nodim && (b = _r(O.r), f.s.r > b.r && (f.s.r = b.r), f.e.r < b.r && (f.e.r = b.r)), xe ? (b = _r(O.r), i["!data"][b.r] || (i["!data"][b.r] = []), i["!data"][b.r][b.c] = C) : i[O.r] = C;
            }
        }
      }
    }
    q.length > 0 && (i["!rows"] = q);
  };
})();
function Jx(e, t) {
  var r = {}, a = e.l + t;
  r.r = e.read_shift(4), e.l += 4;
  var n = e.read_shift(2);
  e.l += 1;
  var s = e.read_shift(1);
  return e.l = a, s & 7 && (r.level = s & 7), s & 16 && (r.hidden = !0), s & 32 && (r.hpt = n / 20), r;
}
var Zx = It;
function qx() {
}
function Qx(e, t) {
  var r = {}, a = e[e.l];
  return ++e.l, r.above = !(a & 64), r.left = !(a & 128), e.l += 18, r.name = yl(e), r;
}
function ep(e) {
  var t = Xr(e);
  return [t];
}
function rp(e) {
  var t = Rt(e);
  return [t];
}
function tp(e) {
  var t = Xr(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function ap(e) {
  var t = Rt(e), r = e.read_shift(1);
  return [t, r, "b"];
}
function np(e) {
  var t = Xr(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function sp(e) {
  var t = Rt(e), r = e.read_shift(1);
  return [t, r, "e"];
}
function ip(e) {
  var t = Xr(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function cp(e) {
  var t = Rt(e), r = e.read_shift(4);
  return [t, r, "s"];
}
function fp(e) {
  var t = Xr(e), r = kr(e);
  return [t, r, "n"];
}
function Ji(e) {
  var t = Rt(e), r = kr(e);
  return [t, r, "n"];
}
function op(e) {
  var t = Xr(e), r = cn(e);
  return [t, r, "n"];
}
function lp(e) {
  var t = Rt(e), r = cn(e);
  return [t, r, "n"];
}
function hp(e) {
  var t = Xr(e), r = Jn(e);
  return [t, r, "is"];
}
function up(e) {
  var t = Xr(e), r = Er(e);
  return [t, r, "str"];
}
function dp(e) {
  var t = Rt(e), r = Er(e);
  return [t, r, "str"];
}
function xp(e, t, r) {
  var a = e.l + t, n = Xr(e);
  n.r = r["!row"];
  var s = e.read_shift(1), i = [n, s, "b"];
  if (r.cellFormula) {
    e.l += 2;
    var c = ln(e, a - e.l, r);
    i[3] = vr(c, null, n, r.supbooks, r);
  } else e.l = a;
  return i;
}
function pp(e, t, r) {
  var a = e.l + t, n = Xr(e);
  n.r = r["!row"];
  var s = e.read_shift(1), i = [n, s, "e"];
  if (r.cellFormula) {
    e.l += 2;
    var c = ln(e, a - e.l, r);
    i[3] = vr(c, null, n, r.supbooks, r);
  } else e.l = a;
  return i;
}
function mp(e, t, r) {
  var a = e.l + t, n = Xr(e);
  n.r = r["!row"];
  var s = kr(e), i = [n, s, "n"];
  if (r.cellFormula) {
    e.l += 2;
    var c = ln(e, a - e.l, r);
    i[3] = vr(c, null, n, r.supbooks, r);
  } else e.l = a;
  return i;
}
function gp(e, t, r) {
  var a = e.l + t, n = Xr(e);
  n.r = r["!row"];
  var s = Er(e), i = [n, s, "str"];
  if (r.cellFormula) {
    e.l += 2;
    var c = ln(e, a - e.l, r);
    i[3] = vr(c, null, n, r.supbooks, r);
  } else e.l = a;
  return i;
}
var vp = It;
function kp(e, t) {
  var r = e.l + t, a = It(e), n = sn(e), s = Er(e), i = Er(e), c = Er(e);
  e.l = r;
  var f = { rfx: a, relId: n, loc: s, display: c };
  return i && (f.Tooltip = i), f;
}
function _p() {
}
function Ep(e, t, r) {
  var a = e.l + t, n = pi(e), s = e.read_shift(1), i = [n];
  if (i[2] = s, r.cellFormula) {
    var c = bx(e, a - e.l, r);
    i[1] = c;
  } else e.l = a;
  return i;
}
function wp(e, t, r) {
  var a = e.l + t, n = It(e), s = [n];
  if (r.cellFormula) {
    var i = Nx(e, a - e.l, r);
    s[1] = i, e.l = a;
  } else e.l = a;
  return s;
}
var Tp = ["left", "right", "top", "bottom", "header", "footer"];
function Ap(e) {
  var t = {};
  return Tp.forEach(function(r) {
    t[r] = kr(e);
  }), t;
}
function Fp(e) {
  var t = e.read_shift(2);
  return e.l += 28, { RTL: t & 32 };
}
function Sp() {
}
function yp() {
}
function Cp(e, t, r, a, n, s, i) {
  if (!e) return e;
  var c = t || {};
  a || (a = { "!id": {} });
  var f = {};
  c.dense && (f["!data"] = []);
  var o, l = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, p = !1, u = !1, h, m, k, x, d, _, g, C, O, U = [];
  c.biff = 12, c["!row"] = 0;
  var P = 0, I = !1, N = [], B = {}, M = c.supbooks || /*::(*/
  n.supbooks || [[]];
  if (M.sharedf = B, M.arrayf = N, M.SheetNames = n.SheetNames || n.Sheets.map(function(ve) {
    return ve.name;
  }), !c.supbooks && (c.supbooks = M, n.Names))
    for (var X = 0; X < n.Names.length; ++X) M[0][X + 1] = n.Names[X];
  var j = [], oe = [], Z = !1;
  rn[16] = { n: "BrtShortReal", f: Ji };
  var xe, q = 1462 * +!!((n || {}).WBProps || {}).date1904;
  if (ft(e, function(K, we, Ee) {
    if (!u)
      switch (Ee) {
        case 148:
          o = K;
          break;
        case 0:
          h = K, c.sheetRows && c.sheetRows <= h.r && (u = !0), C = We(x = h.r), c["!row"] = h.r, (K.hidden || K.hpt || K.level != null) && (K.hpt && (K.hpx = ka(K.hpt)), oe[K.r] = K);
          break;
        case 2:
        /* 'BrtCellRk' */
        case 3:
        /* 'BrtCellError' */
        case 4:
        /* 'BrtCellBool' */
        case 5:
        /* 'BrtCellReal' */
        case 6:
        /* 'BrtCellSt' */
        case 7:
        /* 'BrtCellIsst' */
        case 8:
        /* 'BrtFmlaString' */
        case 9:
        /* 'BrtFmlaNum' */
        case 10:
        /* 'BrtFmlaBool' */
        case 11:
        /* 'BrtFmlaError' */
        case 13:
        /* 'BrtShortRk' */
        case 14:
        /* 'BrtShortError' */
        case 15:
        /* 'BrtShortBool' */
        case 16:
        /* 'BrtShortReal' */
        case 17:
        /* 'BrtShortSt' */
        case 18:
        /* 'BrtShortIsst' */
        case 62:
          switch (m = { t: K[2] }, K[2]) {
            case "n":
              m.v = K[1];
              break;
            case "s":
              g = fa[K[1]], m.v = g.t, m.r = g.r;
              break;
            case "b":
              m.v = !!K[1];
              break;
            case "e":
              m.v = K[1], c.cellText !== !1 && (m.w = Pr[m.v]);
              break;
            case "str":
              m.t = "s", m.v = K[1];
              break;
            case "is":
              m.t = "s", m.v = K[1].t;
              break;
          }
          if ((k = i.CellXf[K[0].iStyleRef]) && ji(m, k.numFmtId, null, c, s, i, q > 0), d = K[0].c == -1 ? d + 1 : K[0].c, c.dense ? (f["!data"][x] || (f["!data"][x] = []), f["!data"][x][d] = m) : f[Me(d) + C] = m, c.cellFormula) {
            for (I = !1, P = 0; P < N.length; ++P) {
              var me = N[P];
              h.r >= me[0].s.r && h.r <= me[0].e.r && d >= me[0].s.c && d <= me[0].e.c && (m.F = Pe(me[0]), I = !0);
            }
            !I && K.length > 3 && (m.f = K[3]);
          }
          if (l.s.r > h.r && (l.s.r = h.r), l.s.c > d && (l.s.c = d), l.e.r < h.r && (l.e.r = h.r), l.e.c < d && (l.e.c = d), c.cellDates && k && m.t == "n" && Jr(_e[k.numFmtId])) {
            var le = tt(m.v + q);
            le && (m.t = "d", m.v = new Date(Date.UTC(le.y, le.m - 1, le.d, le.H, le.M, le.S, le.u)));
          }
          xe && (xe.type == "XLDAPR" && (m.D = !0), xe = void 0);
          break;
        case 1:
        /* 'BrtCellBlank' */
        case 12:
          if (!c.sheetStubs || p) break;
          m = { t: "z", v: void 0 }, d = K[0].c == -1 ? d + 1 : K[0].c, c.dense ? (f["!data"][x] || (f["!data"][x] = []), f["!data"][x][d] = m) : f[Me(d) + C] = m, l.s.r > h.r && (l.s.r = h.r), l.s.c > d && (l.s.c = d), l.e.r < h.r && (l.e.r = h.r), l.e.c < d && (l.e.c = d), xe && (xe.type == "XLDAPR" && (m.D = !0), xe = void 0);
          break;
        case 176:
          U.push(K);
          break;
        case 49:
          xe = ((c.xlmeta || {}).Cell || [])[K - 1];
          break;
        case 494:
          var Ae = a["!id"][K.relId];
          for (Ae ? (K.Target = Ae.Target, K.loc && (K.Target += "#" + K.loc), K.Rel = Ae) : K.relId == "" && (K.Target = "#" + K.loc), x = K.rfx.s.r; x <= K.rfx.e.r; ++x) for (d = K.rfx.s.c; d <= K.rfx.e.c; ++d)
            c.dense ? (f["!data"][x] || (f["!data"][x] = []), f["!data"][x][d] || (f["!data"][x][d] = { t: "z", v: void 0 }), f["!data"][x][d].l = K) : (_ = Me(d) + We(x), f[_] || (f[_] = { t: "z", v: void 0 }), f[_].l = K);
          break;
        case 426:
          if (!c.cellFormula) break;
          N.push(K), O = c.dense ? f["!data"][x][d] : f[Me(d) + C], O.f = vr(K[1], l, { r: h.r, c: d }, M, c), O.F = Pe(K[0]);
          break;
        case 427:
          if (!c.cellFormula) break;
          B[Oe(K[0].s)] = K[1], O = c.dense ? f["!data"][x][d] : f[Me(d) + C], O.f = vr(K[1], l, { r: h.r, c: d }, M, c);
          break;
        /* identical to 'ColInfo' in XLS */
        case 60:
          if (!c.cellStyles) break;
          for (; K.e >= K.s; )
            j[K.e--] = { width: K.w / 256, hidden: !!(K.flags & 1), level: K.level }, Z || (Z = !0, es(K.w / 256)), Xt(j[K.e + 1]);
          break;
        case 551:
          K && (f["!legrel"] = K);
          break;
        case 161:
          f["!autofilter"] = { ref: Pe(K) };
          break;
        case 476:
          f["!margins"] = K;
          break;
        case 147:
          n.Sheets[r] || (n.Sheets[r] = {}), K.name && (n.Sheets[r].CodeName = K.name), (K.above || K.left) && (f["!outline"] = { above: K.above, left: K.left });
          break;
        case 137:
          n.Views || (n.Views = [{}]), n.Views[0] || (n.Views[0] = {}), K.RTL && (n.Views[0].RTL = !0);
          break;
        case 485:
          break;
        case 64:
        /* 'BrtDVal' */
        case 1053:
          break;
        case 151:
          break;
        case 152:
        /* 'BrtSel' */
        case 175:
        /* 'BrtAFilterDateGroupItem' */
        case 644:
        /* 'BrtActiveX' */
        case 625:
        /* 'BrtBigName' */
        case 562:
        /* 'BrtBkHim' */
        case 396:
        /* 'BrtBrk' */
        case 1112:
        /* 'BrtCFIcon' */
        case 1146:
        /* 'BrtCFRuleExt' */
        case 471:
        /* 'BrtCFVO' */
        case 1050:
        /* 'BrtCFVO14' */
        case 649:
        /* 'BrtCellIgnoreEC' */
        case 1105:
        /* 'BrtCellIgnoreEC14' */
        case 589:
        /* 'BrtCellSmartTagProperty' */
        case 607:
        /* 'BrtCellWatch' */
        case 564:
        /* 'BrtColor' */
        case 1055:
        /* 'BrtColor14' */
        case 168:
        /* 'BrtColorFilter' */
        case 174:
        /* 'BrtCustomFilter' */
        case 1180:
        /* 'BrtCustomFilter14' */
        case 499:
        /* 'BrtDRef' */
        case 507:
        /* 'BrtDXF' */
        case 550:
        /* 'BrtDrawing' */
        case 171:
        /* 'BrtDynamicFilter' */
        case 167:
        /* 'BrtFilter' */
        case 1177:
        /* 'BrtFilter14' */
        case 169:
        /* 'BrtIconFilter' */
        case 1181:
        /* 'BrtIconFilter14' */
        case 552:
        /* 'BrtLegacyDrawingHF' */
        case 661:
        /* 'BrtListPart' */
        case 639:
        /* 'BrtOleObject' */
        case 478:
        /* 'BrtPageSetup' */
        case 537:
        /* 'BrtPhoneticInfo' */
        case 477:
        /* 'BrtPrintOptions' */
        case 536:
        /* 'BrtRangeProtection' */
        case 1103:
        /* 'BrtRangeProtection14' */
        case 680:
        /* 'BrtRangeProtectionIso' */
        case 1104:
        /* 'BrtRangeProtectionIso14' */
        case 1024:
        /* 'BrtRwDescent' */
        case 663:
        /* 'BrtSheetCalcProp' */
        case 535:
        /* 'BrtSheetProtection' */
        case 678:
        /* 'BrtSheetProtectionIso' */
        case 504:
        /* 'BrtSlc' */
        case 1043:
        /* 'BrtSparkline' */
        case 428:
        /* 'BrtTable' */
        case 170:
        /* 'BrtTop10Filter' */
        case 3072:
        /* 'BrtUid' */
        case 50:
        /* 'BrtValueMeta' */
        case 2070:
        /* 'BrtWebExtension' */
        case 1045:
          break;
        case 35:
          p = !0;
          break;
        case 36:
          p = !1;
          break;
        case 37:
          p = !0;
          break;
        case 38:
          p = !1;
          break;
        default:
          if (!we.T) {
            if (!p || c.WTF) throw new Error("Unexpected record 0x" + Ee.toString(16));
          }
      }
  }, c), delete c.supbooks, delete c["!row"], !f["!ref"] && (l.s.r < 2e6 || o && (o.e.r > 0 || o.e.c > 0 || o.s.r > 0 || o.s.c > 0)) && (f["!ref"] = Pe(o || l)), c.sheetRows && f["!ref"]) {
    var ie = qe(f["!ref"]);
    c.sheetRows <= +ie.e.r && (ie.e.r = c.sheetRows - 1, ie.e.r > l.e.r && (ie.e.r = l.e.r), ie.e.r < ie.s.r && (ie.s.r = ie.e.r), ie.e.c > l.e.c && (ie.e.c = l.e.c), ie.e.c < ie.s.c && (ie.s.c = ie.e.c), f["!fullref"] = f["!ref"], f["!ref"] = Pe(ie));
  }
  return U.length > 0 && (f["!merges"] = U), j.length > 0 && (f["!cols"] = j), oe.length > 0 && (f["!rows"] = oe), a["!id"][f["!legrel"]] && (f["!legdrawel"] = a["!id"][f["!legrel"]]), f;
}
function bp(e) {
  var t = [], r = e.match(/^<c:numCache>/), a;
  (e.match(/<c:pt idx="(\d*)"[^<>\/]*><c:v>([^<])<\/c:v><\/c:pt>/mg) || []).forEach(function(s) {
    var i = s.match(/<c:pt idx="(\d*)"[^<>\/]*><c:v>([^<]*)<\/c:v><\/c:pt>/);
    i && (t[+i[1]] = r ? +i[2] : i[2]);
  });
  var n = be((At(e, "c:formatCode") || ["", "General"])[1]);
  return (Xn(e, "<c:f>", "</c:f>") || []).forEach(function(s) {
    a = s.replace(/<[^<>]*>/g, "");
  }), [t, n, a];
}
function Pp(e, t, r, a, n, s) {
  var i = s || { "!type": "chart" };
  if (!e) return s;
  var c = 0, f = 0, o = "A", l = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } };
  return (Xn(e, "<c:numCache>", "</c:numCache>") || []).forEach(function(p) {
    var u = bp(p);
    l.s.r = l.s.c = 0, l.e.c = c, o = Me(c), u[0].forEach(function(h, m) {
      i["!data"] ? (i["!data"][m] || (i["!data"][m] = []), i["!data"][m][c] = { t: "n", v: h, z: u[1] }) : i[o + We(m)] = { t: "n", v: h, z: u[1] }, f = m;
    }), l.e.r < f && (l.e.r = f), ++c;
  }), c > 0 && (i["!ref"] = Pe(l)), i;
}
function Np(e, t, r, a, n) {
  if (!e) return e;
  a || (a = { "!id": {} });
  var s = { "!type": "chart", "!drawel": null, "!rel": "" }, i, c = e.match(Yi);
  return c && as(c[0], s, n, r), (i = e.match(/drawing r:id="(.*?)"/)) && (s["!rel"] = i[1]), a["!id"][s["!rel"]] && (s["!drawel"] = a["!id"][s["!rel"]]), s;
}
function Dp(e, t) {
  e.l += 10;
  var r = Er(e);
  return { name: r };
}
function Rp(e, t, r, a, n) {
  if (!e) return e;
  a || (a = { "!id": {} });
  var s = { "!type": "chart", "!drawel": null, "!rel": "" }, i = !1;
  return ft(e, function(f, o, l) {
    switch (l) {
      case 550:
        s["!rel"] = f;
        break;
      case 651:
        n.Sheets[r] || (n.Sheets[r] = {}), f.name && (n.Sheets[r].CodeName = f.name);
        break;
      case 562:
      /* 'BrtBkHim' */
      case 652:
      /* 'BrtCsPageSetup' */
      case 669:
      /* 'BrtCsProtection' */
      case 679:
      /* 'BrtCsProtectionIso' */
      case 551:
      /* 'BrtLegacyDrawing' */
      case 552:
      /* 'BrtLegacyDrawingHF' */
      case 476:
      /* 'BrtMargins' */
      case 3072:
        break;
      case 35:
        i = !0;
        break;
      case 36:
        i = !1;
        break;
      case 37:
        break;
      case 38:
        break;
      default:
        if (!(o.T > 0)) {
          if (!(o.T < 0)) {
            if (!i || t.WTF) throw new Error("Unexpected record 0x" + l.toString(16));
          }
        }
    }
  }, t), a["!id"][s["!rel"]] && (s["!drawel"] = a["!id"][s["!rel"]]), s;
}
var Zi = [
  ["allowRefreshQuery", !1, "bool"],
  ["autoCompressPictures", !0, "bool"],
  ["backupFile", !1, "bool"],
  ["checkCompatibility", !1, "bool"],
  ["CodeName", ""],
  ["date1904", !1, "bool"],
  ["defaultThemeVersion", 0, "int"],
  ["filterPrivacy", !1, "bool"],
  ["hidePivotFieldList", !1, "bool"],
  ["promptedSolutions", !1, "bool"],
  ["publishItems", !1, "bool"],
  ["refreshAllConnections", !1, "bool"],
  ["saveExternalLinkValues", !0, "bool"],
  ["showBorderUnselectedTables", !0, "bool"],
  ["showInkAnnotation", !0, "bool"],
  ["showObjects", "all"],
  ["showPivotChartFilter", !1, "bool"],
  ["updateLinks", "userSet"]
], Ip = [
  ["activeTab", 0, "int"],
  ["autoFilterDateGrouping", !0, "bool"],
  ["firstSheet", 0, "int"],
  ["minimized", !1, "bool"],
  ["showHorizontalScroll", !0, "bool"],
  ["showSheetTabs", !0, "bool"],
  ["showVerticalScroll", !0, "bool"],
  ["tabRatio", 600, "int"],
  ["visibility", "visible"]
  //window{Height,Width}, {x,y}Window
], Op = [
  //['state', 'visible']
], Mp = [
  ["calcCompleted", "true"],
  ["calcMode", "auto"],
  ["calcOnSave", "true"],
  ["concurrentCalc", "true"],
  ["fullCalcOnLoad", "false"],
  ["fullPrecision", "true"],
  ["iterate", "false"],
  ["iterateCount", "100"],
  ["iterateDelta", "0.001"],
  ["refMode", "A1"]
];
function h0(e, t) {
  for (var r = 0; r != e.length; ++r)
    for (var a = e[r], n = 0; n != t.length; ++n) {
      var s = t[n];
      if (a[s[0]] == null) a[s[0]] = s[1];
      else switch (s[2]) {
        case "bool":
          typeof a[s[0]] == "string" && (a[s[0]] = He(a[s[0]]));
          break;
        case "int":
          typeof a[s[0]] == "string" && (a[s[0]] = parseInt(a[s[0]], 10));
          break;
      }
    }
}
function u0(e, t) {
  for (var r = 0; r != t.length; ++r) {
    var a = t[r];
    if (e[a[0]] == null) e[a[0]] = a[1];
    else switch (a[2]) {
      case "bool":
        typeof e[a[0]] == "string" && (e[a[0]] = He(e[a[0]]));
        break;
      case "int":
        typeof e[a[0]] == "string" && (e[a[0]] = parseInt(e[a[0]], 10));
        break;
    }
  }
}
function qi(e) {
  u0(e.WBProps, Zi), u0(e.CalcPr, Mp), h0(e.WBView, Ip), h0(e.Sheets, Op), Vt.date1904 = He(e.WBProps.date1904);
}
var Lp = /* @__PURE__ */ ":][*?/\\".split("");
function Bp(e, t) {
  try {
    if (e == "") throw new Error("Sheet name cannot be blank");
    if (e.length > 31) throw new Error("Sheet name cannot exceed 31 chars");
    if (e.charCodeAt(0) == 39 || e.charCodeAt(e.length - 1) == 39) throw new Error("Sheet name cannot start or end with apostrophe (')");
    if (e.toLowerCase() == "history") throw new Error("Sheet name cannot be 'History'");
    Lp.forEach(function(r) {
      if (e.indexOf(r) != -1)
        throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
    });
  } catch (r) {
    throw r;
  }
  return !0;
}
var Up = /<\w+:workbook/;
function Hp(e, t) {
  if (!e) throw new Error("Could not find file");
  var r = (
    /*::(*/
    { AppVersion: {}, WBProps: {}, WBView: [], Sheets: [], CalcPr: {}, Names: [], xmlns: "" }
  ), a = !1, n = "xmlns", s = {}, i = 0;
  if (e.replace(pr, function(f, o) {
    var l = ue(f);
    switch (Gr(l[0])) {
      case "<?xml":
        break;
      /* 18.2.27 workbook CT_Workbook 1 */
      case "<workbook":
        f.match(Up) && (n = "xmlns" + f.match(/<(\w+):/)[1]), r.xmlns = l[n];
        break;
      case "</workbook>":
        break;
      /* 18.2.13 fileVersion CT_FileVersion ? */
      case "<fileVersion":
        delete l[0], r.AppVersion = l;
        break;
      case "<fileVersion/>":
      case "</fileVersion>":
        break;
      /* 18.2.12 fileSharing CT_FileSharing ? */
      case "<fileSharing":
        break;
      case "<fileSharing/>":
        break;
      /* 18.2.28 workbookPr CT_WorkbookPr ? */
      case "<workbookPr":
      case "<workbookPr/>":
        Zi.forEach(function(p) {
          if (l[p[0]] != null)
            switch (p[2]) {
              case "bool":
                r.WBProps[p[0]] = He(l[p[0]]);
                break;
              case "int":
                r.WBProps[p[0]] = parseInt(l[p[0]], 10);
                break;
              default:
                r.WBProps[p[0]] = l[p[0]];
            }
        }), l.codeName && (r.WBProps.CodeName = Ve(l.codeName));
        break;
      case "</workbookPr>":
        break;
      /* 18.2.29 workbookProtection CT_WorkbookProtection ? */
      case "<workbookProtection":
        break;
      case "<workbookProtection/>":
        break;
      /* 18.2.1  bookViews CT_BookViews ? */
      case "<bookViews":
      case "<bookViews>":
      case "</bookViews>":
        break;
      /* 18.2.30   workbookView CT_BookView + */
      case "<workbookView":
      case "<workbookView/>":
        delete l[0], r.WBView.push(l);
        break;
      case "</workbookView>":
        break;
      /* 18.2.20 sheets CT_Sheets 1 */
      case "<sheets":
      case "<sheets>":
      case "</sheets>":
        break;
      // aggregate sheet
      /* 18.2.19   sheet CT_Sheet + */
      case "<sheet":
        switch (l.state) {
          case "hidden":
            l.Hidden = 1;
            break;
          case "veryHidden":
            l.Hidden = 2;
            break;
          default:
            l.Hidden = 0;
        }
        delete l.state, l.name = be(Ve(l.name)), delete l[0], r.Sheets.push(l);
        break;
      case "</sheet>":
        break;
      /* 18.2.15 functionGroups CT_FunctionGroups ? */
      case "<functionGroups":
      case "<functionGroups/>":
        break;
      /* 18.2.14   functionGroup CT_FunctionGroup + */
      case "<functionGroup":
        break;
      /* 18.2.9  externalReferences CT_ExternalReferences ? */
      case "<externalReferences":
      case "</externalReferences>":
      case "<externalReferences>":
        break;
      /* 18.2.8    externalReference CT_ExternalReference + */
      case "<externalReference":
        break;
      /* 18.2.6  definedNames CT_DefinedNames ? */
      case "<definedNames/>":
        break;
      case "<definedNames>":
      case "<definedNames":
        a = !0;
        break;
      case "</definedNames>":
        a = !1;
        break;
      /* 18.2.5    definedName CT_DefinedName + */
      case "<definedName":
        s = {}, s.Name = Ve(l.name), l.comment && (s.Comment = l.comment), l.localSheetId && (s.Sheet = +l.localSheetId), He(l.hidden || "0") && (s.Hidden = !0), i = o + f.length;
        break;
      case "</definedName>":
        s.Ref = be(Ve(e.slice(i, o))), r.Names.push(s);
        break;
      case "<definedName/>":
        break;
      /* 18.2.2  calcPr CT_CalcPr ? */
      case "<calcPr":
        delete l[0], r.CalcPr = l;
        break;
      case "<calcPr/>":
        delete l[0], r.CalcPr = l;
        break;
      case "</calcPr>":
        break;
      /* 18.2.16 oleSize CT_OleSize ? (ref required) */
      case "<oleSize":
        break;
      /* 18.2.4  customWorkbookViews CT_CustomWorkbookViews ? */
      case "<customWorkbookViews>":
      case "</customWorkbookViews>":
      case "<customWorkbookViews":
        break;
      /* 18.2.3  customWorkbookView CT_CustomWorkbookView + */
      case "<customWorkbookView":
      case "</customWorkbookView>":
        break;
      /* 18.2.18 pivotCaches CT_PivotCaches ? */
      case "<pivotCaches>":
      case "</pivotCaches>":
      case "<pivotCaches":
        break;
      /* 18.2.17 pivotCache CT_PivotCache ? */
      case "<pivotCache":
        break;
      /* 18.2.21 smartTagPr CT_SmartTagPr ? */
      case "<smartTagPr":
      case "<smartTagPr/>":
        break;
      /* 18.2.23 smartTagTypes CT_SmartTagTypes ? */
      case "<smartTagTypes":
      case "<smartTagTypes>":
      case "</smartTagTypes>":
        break;
      /* 18.2.22 smartTagType CT_SmartTagType ? */
      case "<smartTagType":
        break;
      /* 18.2.24 webPublishing CT_WebPublishing ? */
      case "<webPublishing":
      case "<webPublishing/>":
        break;
      /* 18.2.11 fileRecoveryPr CT_FileRecoveryPr ? */
      case "<fileRecoveryPr":
      case "<fileRecoveryPr/>":
        break;
      /* 18.2.26 webPublishObjects CT_WebPublishObjects ? */
      case "<webPublishObjects>":
      case "<webPublishObjects":
      case "</webPublishObjects>":
        break;
      /* 18.2.25 webPublishObject CT_WebPublishObject ? */
      case "<webPublishObject":
        break;
      /* 18.2.10 extLst CT_ExtensionList ? */
      case "<extLst":
      case "<extLst>":
      case "</extLst>":
      case "<extLst/>":
        break;
      /* 18.2.7  ext CT_Extension + */
      case "<ext":
        a = !0;
        break;
      //TODO: check with versions of excel
      case "</ext>":
        a = !1;
        break;
      /* Others */
      case "<ArchID":
        break;
      case "<AlternateContent":
      case "<AlternateContent>":
        a = !0;
        break;
      case "</AlternateContent>":
        a = !1;
        break;
      /* TODO */
      case "<revisionPtr":
        break;
      default:
        if (!a && t.WTF) throw new Error("unrecognized " + l[0] + " in workbook");
    }
    return f;
  }), fl.indexOf(r.xmlns) === -1) throw new Error("Unknown Namespace: " + r.xmlns);
  return qi(r), r;
}
function Wp(e, t) {
  var r = {};
  return r.Hidden = e.read_shift(4), r.iTabID = e.read_shift(4), r.strRelID = bn(e), r.name = Er(e), r;
}
function Vp(e, t) {
  var r = {}, a = e.read_shift(4);
  r.defaultThemeVersion = e.read_shift(4);
  var n = t > 8 ? Er(e) : "";
  return n.length > 0 && (r.CodeName = n), r.autoCompressPictures = !!(a & 65536), r.backupFile = !!(a & 64), r.checkCompatibility = !!(a & 4096), r.date1904 = !!(a & 1), r.filterPrivacy = !!(a & 8), r.hidePivotFieldList = !!(a & 1024), r.promptedSolutions = !!(a & 16), r.publishItems = !!(a & 2048), r.refreshAllConnections = !!(a & 262144), r.saveExternalLinkValues = !!(a & 128), r.showBorderUnselectedTables = !!(a & 4), r.showInkAnnotation = !!(a & 32), r.showObjects = ["all", "placeholders", "none"][a >> 13 & 3], r.showPivotChartFilter = !!(a & 32768), r.updateLinks = ["userSet", "never", "always"][a >> 8 & 3], r;
}
function $p(e, t) {
  var r = {};
  return e.read_shift(4), r.ArchID = e.read_shift(4), e.l += t - 8, r;
}
function Gp(e, t, r) {
  var a = e.l + t, n = e.read_shift(4);
  e.l += 1;
  var s = e.read_shift(4), i = Cl(e), c, f = "";
  try {
    c = Px(e, 0, r);
    try {
      f = sn(e);
    } catch {
    }
  } catch {
    console.error("Could not parse defined name " + i);
  }
  n & 32 && (i = "_xlnm." + i), e.l = a;
  var o = { Name: i, Ptg: c, Flags: n };
  return s < 268435455 && (o.Sheet = s), f && (o.Comment = f), o;
}
function Xp(e, t) {
  var r = { AppVersion: {}, WBProps: {}, WBView: [], Sheets: [], CalcPr: {}, xmlns: "" }, a = [], n = !1;
  t || (t = {}), t.biff = 12;
  var s = [], i = [[]];
  return i.SheetNames = [], i.XTI = [], rn[16] = { n: "BrtFRTArchID$", f: $p }, ft(e, function(f, o, l) {
    switch (l) {
      case 156:
        i.SheetNames.push(f.name), r.Sheets.push(f);
        break;
      case 153:
        r.WBProps = f;
        break;
      case 39:
        f.Sheet != null && (t.SID = f.Sheet), f.Ref = f.Ptg ? vr(f.Ptg, null, null, i, t) : "#REF!", delete t.SID, delete f.Ptg, s.push(f);
        break;
      case 1036:
        break;
      case 357:
      /* 'BrtSupSelf' */
      case 358:
      /* 'BrtSupSame' */
      case 355:
      /* 'BrtSupBookSrc' */
      case 667:
        i[0].length ? i.push([l, f]) : i[0] = [l, f], i[i.length - 1].XTI = [];
        break;
      case 362:
        i.length === 0 && (i[0] = [], i[0].XTI = []), i[i.length - 1].XTI = i[i.length - 1].XTI.concat(f), i.XTI = i.XTI.concat(f);
        break;
      case 361:
        break;
      case 2071:
      /* 'BrtAbsPath15' */
      case 158:
      /* 'BrtBookView' */
      case 143:
      /* 'BrtBeginBundleShs' */
      case 664:
      /* 'BrtBeginFnGroup' */
      case 353:
        break;
      /* case 'BrtModelTimeGroupingCalcCol' */
      case 3072:
      /* 'BrtUid' */
      case 3073:
      /* 'BrtRevisionPtr' */
      case 534:
      /* 'BrtBookProtection' */
      case 677:
      /* 'BrtBookProtectionIso' */
      case 157:
      /* 'BrtCalcProp' */
      case 610:
      /* 'BrtCrashRecErr' */
      case 2050:
      /* 'BrtDecoupledPivotCacheID' */
      case 155:
      /* 'BrtFileRecover' */
      case 548:
      /* 'BrtFileSharing' */
      case 676:
      /* 'BrtFileSharingIso' */
      case 128:
      /* 'BrtFileVersion' */
      case 665:
      /* 'BrtFnGroup' */
      case 2128:
      /* 'BrtModelRelationship' */
      case 2125:
      /* 'BrtModelTable' */
      case 549:
      /* 'BrtOleSize' */
      case 2053:
      /* 'BrtPivotTableRef' */
      case 596:
      /* 'BrtSmartTagType' */
      case 2076:
      /* 'BrtTableSlicerCacheID' */
      case 2075:
      /* 'BrtTableSlicerCacheIDs' */
      case 2082:
      /* 'BrtTimelineCachePivotCacheID' */
      case 397:
      /* 'BrtUserBookView' */
      case 154:
      /* 'BrtWbFactoid' */
      case 1117:
      /* 'BrtWbProp14' */
      case 553:
      /* 'BrtWebOpt' */
      case 2091:
        break;
      case 35:
        a.push(l), n = !0;
        break;
      case 36:
        a.pop(), n = !1;
        break;
      case 37:
        a.push(l), n = !0;
        break;
      case 38:
        a.pop(), n = !1;
        break;
      case 16:
        break;
      default:
        if (!o.T) {
          if (!n || t.WTF && a[a.length - 1] != 37 && a[a.length - 1] != 35) throw new Error("Unexpected record 0x" + l.toString(16));
        }
    }
  }, t), qi(r), r.Names = s, r.supbooks = i, r;
}
function zp(e, t, r) {
  return t.slice(-4) === ".bin" ? Xp(e, r) : Hp(e, r);
}
function Kp(e, t, r, a, n, s, i, c) {
  return t.slice(-4) === ".bin" ? Cp(e, a, r, n, s, i, c) : Wx(e, a, r, n, s, i, c);
}
function jp(e, t, r, a, n, s, i, c) {
  return t.slice(-4) === ".bin" ? Rp(e, a, r, n, s) : Np(e, a, r, n, s);
}
function Yp(e, t, r, a, n, s, i, c) {
  return t.slice(-4) === ".bin" ? cd() : fd();
}
function Jp(e, t, r, a, n, s, i, c) {
  return t.slice(-4) === ".bin" ? sd() : id();
}
function Zp(e, t, r, a) {
  return t.slice(-4) === ".bin" ? y1(e, r, a) : E1(e, r, a);
}
function qp(e, t, r) {
  return t.slice(-4) === ".bin" ? Vu(e, r) : Hu(e, r);
}
function Qp(e, t, r) {
  return t.slice(-4) === ".bin" ? td(e, r) : Z1(e, r);
}
function em(e, t, r) {
  return t.slice(-4) === ".bin" ? K1(e) : X1(e);
}
function rm(e, t, r, a) {
  return r.slice(-4) === ".bin" ? j1(e, t, r, a) : void 0;
}
function tm(e, t, r) {
  return t.slice(-4) === ".bin" ? $1(e, t, r) : G1(e, t, r);
}
var Qi = /\b((?:\w+:)?[\w]+)=((?:")([^"]*)(?:")|(?:')([^']*)(?:'))/g, ec = /\b((?:\w+:)?[\w]+)=((?:")(?:[^"]*)(?:")|(?:')(?:[^']*)(?:'))/;
function Kr(e, t) {
  var r = e.split(/\s+/), a = [];
  if (a[0] = r[0], r.length === 1) return a;
  var n = e.match(Qi), s, i, c, f;
  if (n) for (f = 0; f != n.length; ++f)
    s = n[f].match(ec), (i = s[1].indexOf(":")) === -1 ? a[s[1]] = s[2].slice(1, s[2].length - 1) : (s[1].slice(0, 6) === "xmlns:" ? c = "xmlns" + s[1].slice(6) : c = s[1].slice(i + 1), a[c] = s[2].slice(1, s[2].length - 1));
  return a;
}
function am(e) {
  var t = e.split(/\s+/), r = {};
  if (t.length === 1) return r;
  var a = e.match(Qi), n, s, i, c;
  if (a) for (c = 0; c != a.length; ++c)
    n = a[c].match(ec), (s = n[1].indexOf(":")) === -1 ? r[n[1]] = n[2].slice(1, n[2].length - 1) : (n[1].slice(0, 6) === "xmlns:" ? i = "xmlns" + n[1].slice(6) : i = n[1].slice(s + 1), r[i] = n[2].slice(1, n[2].length - 1));
  return r;
}
var la;
function nm(e, t, r) {
  var a = la[e] || be(e);
  return a === "General" ? yt(t) : Lr(a, t, { date1904: !!r });
}
function sm(e, t, r, a) {
  var n = a;
  switch ((r[0].match(/dt:dt="([\w.]+)"/) || ["", ""])[1]) {
    case "boolean":
      n = He(a);
      break;
    case "i2":
    case "int":
      n = parseInt(a, 10);
      break;
    case "r4":
    case "float":
      n = parseFloat(a);
      break;
    case "date":
    case "dateTime.tz":
      n = xr(a);
      break;
    case "i8":
    case "string":
    case "fixed":
    case "uuid":
    case "bin.base64":
      break;
    default:
      throw new Error("bad custprop:" + r[0]);
  }
  e[be(t)] = n;
}
function im(e, t, r, a) {
  if (e.t !== "z") {
    if (!r || r.cellText !== !1) try {
      e.t === "e" ? e.w = e.w || Pr[e.v] : t === "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = pa(e.v) : e.w = yt(e.v) : e.w = nm(t || "General", e.v, a);
    } catch (i) {
      if (r.WTF) throw i;
    }
    try {
      var n = la[t] || t || "General";
      if (r.cellNF && (e.z = n), r.cellDates && e.t == "n" && Jr(n)) {
        var s = tt(e.v + (a ? 1462 : 0));
        s && (e.t = "d", e.v = new Date(Date.UTC(s.y, s.m - 1, s.d, s.H, s.M, s.S, s.u)));
      }
    } catch (i) {
      if (r.WTF) throw i;
    }
  }
}
function cm(e, t, r) {
  if (r.cellStyles && t.Interior) {
    var a = t.Interior;
    a.Pattern && (a.patternType = p1[a.Pattern] || a.Pattern);
  }
  e[t.ID] = t;
}
function fm(e, t, r, a, n, s, i, c, f, o, l) {
  var p = "General", u = a.StyleID, h = {};
  o = o || {};
  var m = [], k = 0;
  for (u === void 0 && c && (u = c.StyleID), u === void 0 && i && (u = i.StyleID); s[u] !== void 0; ) {
    var x = s[u];
    if (x.nf && (p = x.nf), x.Interior && m.push(x.Interior), !x.Parent) break;
    u = x.Parent;
  }
  switch (r.Type) {
    case "Boolean":
      a.t = "b", a.v = He(e);
      break;
    case "String":
      a.t = "s", a.r = Ds(be(e)), a.v = e.indexOf("<") > -1 ? be(t || e).replace(/<[^<>]*>/g, "") : a.r;
      break;
    case "DateTime":
      e.slice(-1) != "Z" && (e += "Z"), a.v = fr(xr(e, l), l), a.v !== a.v && (a.v = be(e)), (!p || p == "General") && (p = "yyyy-mm-dd");
    /* falls through */
    case "Number":
      a.v === void 0 && (a.v = +e), a.t || (a.t = "n");
      break;
    case "Error":
      a.t = "e", a.v = ur[e], o.cellText !== !1 && (a.w = e);
      break;
    default:
      e == "" && t == "" ? a.t = "z" : (a.t = "s", a.v = Ds(t || e));
      break;
  }
  if (im(a, p, o, l), o.cellFormula !== !1)
    if (a.Formula) {
      var d = be(a.Formula);
      d.charCodeAt(0) == 61 && (d = d.slice(1)), a.f = St(d, n), delete a.Formula, a.ArrayRange == "RC" ? a.F = St("RC:RC", n) : a.ArrayRange && (a.F = St(a.ArrayRange, n), f.push([qe(a.F), a.F]));
    } else
      for (k = 0; k < f.length; ++k)
        n.r >= f[k][0].s.r && n.r <= f[k][0].e.r && n.c >= f[k][0].s.c && n.c <= f[k][0].e.c && (a.F = f[k][1]);
  o.cellStyles && (m.forEach(function(_) {
    !h.patternType && _.patternType && (h.patternType = _.patternType);
  }), a.s = h), a.StyleID !== void 0 && (a.ixfe = a.StyleID);
}
function om(e) {
  return vi.indexOf("_xlnm." + e) > -1 ? "_xlnm." + e : e;
}
function lm(e) {
  e.t = e.v || "", e.t = e.t.replace(/\r\n/g, `
`).replace(/\r/g, `
`), e.v = e.w = e.ixfe = void 0;
}
function Tn(e, t) {
  var r = t || {};
  $0();
  var a = qt(nn(e));
  (r.type == "binary" || r.type == "array" || r.type == "base64") && (a = Ve(a));
  var n = a.slice(0, 1024).toLowerCase(), s = !1;
  if (n = n.replace(/".*?"/g, ""), (n.indexOf(">") & 1023) > Math.min(n.indexOf(",") & 1023, n.indexOf(";") & 1023)) {
    var i = ir(r);
    return i.type = "string", ga.to_workbook(a, i);
  }
  if (n.indexOf("<?xml") == -1 && ["html", "table", "head", "meta", "script", "style", "div"].forEach(function(pe) {
    n.indexOf("<" + pe) >= 0 && (s = !0);
  }), s) return km(a, r);
  la = {
    "General Number": "General",
    "General Date": _e[22],
    "Long Date": "dddd, mmmm dd, yyyy",
    "Medium Date": _e[15],
    "Short Date": _e[14],
    "Long Time": _e[19],
    "Medium Time": _e[18],
    "Short Time": _e[20],
    Currency: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    Fixed: _e[2],
    Standard: _e[4],
    Percent: _e[10],
    Scientific: _e[11],
    "Yes/No": '"Yes";"Yes";"No";@',
    "True/False": '"True";"True";"False";@',
    "On/Off": '"Yes";"Yes";"No";@'
  };
  var c, f = [], o, l = {}, p = [], u = {}, h = "";
  r.dense && (u["!data"] = []);
  var m = {}, k = {}, x = Kr('<Data ss:Type="String">'), d = 0, _ = 0, g = 0, C = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, O = {}, U = {}, P = "", I = 0, N = [], B = {}, M = {}, X = 0, j = [], oe = [], Z = {}, xe = [], q, ie = !1, ve = [], K = [], we = {}, Ee = 0, me = 0, le = { Sheets: [], WBProps: { date1904: !1 } }, Ae = {};
  nr.lastIndex = 0, a = wa(a, "<!--", "-->");
  for (var ke = ""; c = nr.exec(a); ) switch (c[3] = (ke = c[3]).toLowerCase()) {
    case "data":
      if (ke == "data") {
        if (c[1] === "/") {
          if ((o = f.pop())[0] !== c[3]) throw new Error("Bad state: " + o.join("|"));
        } else c[0].charAt(c[0].length - 2) !== "/" && f.push([c[3], !0]);
        break;
      }
      if (f[f.length - 1][1]) break;
      c[1] === "/" ? fm(a.slice(d, c.index), P, x, f[f.length - 1][0] == /*"Comment"*/
      "comment" ? Z : m, { c: _, r: g }, O, xe[_], k, ve, r, le.WBProps.date1904) : (P = "", x = Kr(c[0]), d = c.index + c[0].length);
      break;
    case "cell":
      if (c[1] === "/")
        if (oe.length > 0 && (m.c = oe), (!r.sheetRows || r.sheetRows > g) && m.v !== void 0 && (r.dense ? (u["!data"][g] || (u["!data"][g] = []), u["!data"][g][_] = m) : u[Me(_) + We(g)] = m), m.HRef && (m.l = { Target: be(m.HRef) }, m.HRefScreenTip && (m.l.Tooltip = m.HRefScreenTip), delete m.HRef, delete m.HRefScreenTip), (m.MergeAcross || m.MergeDown) && (Ee = _ + (parseInt(m.MergeAcross, 10) | 0), me = g + (parseInt(m.MergeDown, 10) | 0), (Ee > _ || me > g) && N.push({ s: { c: _, r: g }, e: { c: Ee, r: me } })), !r.sheetStubs)
          m.MergeAcross ? _ = Ee + 1 : ++_;
        else if (m.MergeAcross || m.MergeDown) {
          for (var Se = _; Se <= Ee; ++Se)
            for (var S = g; S <= me; ++S)
              (Se > _ || S > g) && (r.dense ? (u["!data"][S] || (u["!data"][S] = []), u["!data"][S][Se] = { t: "z" }) : u[Me(Se) + We(S)] = { t: "z" });
          _ = Ee + 1;
        } else ++_;
      else
        m = am(c[0]), m.Index && (_ = +m.Index - 1), _ < C.s.c && (C.s.c = _), _ > C.e.c && (C.e.c = _), c[0].slice(-2) === "/>" && ++_, oe = [];
      break;
    case "row":
      c[1] === "/" || c[0].slice(-2) === "/>" ? (g < C.s.r && (C.s.r = g), g > C.e.r && (C.e.r = g), c[0].slice(-2) === "/>" && (k = Kr(c[0]), k.Index && (g = +k.Index - 1)), _ = 0, ++g) : (k = Kr(c[0]), k.Index && (g = +k.Index - 1), we = {}, (k.AutoFitHeight == "0" || k.Height) && (we.hpx = parseInt(k.Height, 10), we.hpt = Bi(we.hpx), K[g] = we), k.Hidden == "1" && (we.hidden = !0, K[g] = we));
      break;
    case "worksheet":
      if (c[1] === "/") {
        if ((o = f.pop())[0] !== c[3]) throw new Error("Bad state: " + o.join("|"));
        p.push(h), C.s.r <= C.e.r && C.s.c <= C.e.c && (u["!ref"] = Pe(C), r.sheetRows && r.sheetRows <= C.e.r && (u["!fullref"] = u["!ref"], C.e.r = r.sheetRows - 1, u["!ref"] = Pe(C))), N.length && (u["!merges"] = N), xe.length > 0 && (u["!cols"] = xe), K.length > 0 && (u["!rows"] = K), l[h] = u;
      } else
        C = { s: { r: 2e6, c: 2e6 }, e: { r: 0, c: 0 } }, g = _ = 0, f.push([c[3], !1]), o = Kr(c[0]), h = be(o.Name), u = {}, r.dense && (u["!data"] = []), N = [], ve = [], K = [], Ae = { name: h, Hidden: 0 }, le.Sheets.push(Ae);
      break;
    case "table":
      if (c[1] === "/") {
        if ((o = f.pop())[0] !== c[3]) throw new Error("Bad state: " + o.join("|"));
      } else {
        if (c[0].slice(-2) == "/>") break;
        f.push([c[3], !1]), xe = [], ie = !1;
      }
      break;
    case "style":
      c[1] === "/" ? cm(O, U, r) : U = Kr(c[0]);
      break;
    case "numberformat":
      U.nf = be(Kr(c[0]).Format || "General"), la[U.nf] && (U.nf = la[U.nf]);
      for (var L = 0; L != 392 && _e[L] != U.nf; ++L) ;
      if (L == 392) {
        for (L = 57; L != 392; ++L) if (_e[L] == null) {
          Tt(U.nf, L);
          break;
        }
      }
      break;
    case "column":
      if (f[f.length - 1][0] !== /*'Table'*/
      "table" || c[1] === "/") break;
      if (q = Kr(c[0]), q.Hidden && (q.hidden = !0, delete q.Hidden), q.Width && (q.wpx = parseInt(q.Width, 10)), !ie && q.wpx > 10) {
        ie = !0, Fr = Mi;
        for (var R = 0; R < xe.length; ++R) xe[R] && Xt(xe[R]);
      }
      ie && Xt(q), xe[q.Index - 1 || xe.length] = q;
      for (var b = 0; b < +q.Span; ++b) xe[xe.length] = ir(q);
      break;
    case "namedrange":
      if (c[1] === "/") break;
      le.Names || (le.Names = []);
      var J = ue(c[0]), T = {
        Name: om(J.Name),
        Ref: St(J.RefersTo.slice(1), { r: 0, c: 0 })
      };
      le.Sheets.length > 0 && (T.Sheet = le.Sheets.length - 1), le.Names.push(T);
      break;
    case "namedcell":
      break;
    case "b":
      break;
    case "i":
      break;
    case "u":
      break;
    case "s":
      break;
    case "em":
      break;
    case "h2":
      break;
    case "h3":
      break;
    case "sub":
      break;
    case "sup":
      break;
    case "span":
      break;
    case "alignment":
      break;
    case "borders":
      break;
    case "border":
      break;
    case "font":
      if (c[0].slice(-2) === "/>") break;
      c[1] === "/" ? P += a.slice(I, c.index) : I = c.index + c[0].length;
      break;
    case "interior":
      if (!r.cellStyles) break;
      U.Interior = Kr(c[0]);
      break;
    case "protection":
      break;
    case "author":
    case "title":
    case "description":
    case "created":
    case "keywords":
    case "subject":
    case "category":
    case "company":
    case "lastauthor":
    case "lastsaved":
    case "lastprinted":
    case "version":
    case "revision":
    case "totaltime":
    case "hyperlinkbase":
    case "manager":
    case "contentstatus":
    case "identifier":
    case "language":
    case "appname":
      if (c[0].slice(-2) === "/>") break;
      c[1] === "/" ? ql(B, ke, a.slice(X, c.index)) : X = c.index + c[0].length;
      break;
    case "paragraphs":
      break;
    case "styles":
    case "workbook":
      if (c[1] === "/") {
        if ((o = f.pop())[0] !== c[3]) throw new Error("Bad state: " + o.join("|"));
      } else f.push([c[3], !1]);
      break;
    case "comment":
      if (c[1] === "/") {
        if ((o = f.pop())[0] !== c[3]) throw new Error("Bad state: " + o.join("|"));
        lm(Z), oe.push(Z);
      } else
        f.push([c[3], !1]), o = Kr(c[0]), He(o.ShowAlways || "0") || (oe.hidden = !0), Z = { a: o.Author };
      break;
    case "autofilter":
      if (c[1] === "/") {
        if ((o = f.pop())[0] !== c[3]) throw new Error("Bad state: " + o.join("|"));
      } else if (c[0].charAt(c[0].length - 2) !== "/") {
        var se = Kr(c[0]);
        u["!autofilter"] = { ref: St(se.Range).replace(/\$/g, "") }, f.push([c[3], !0]);
      }
      break;
    case "name":
      break;
    case "datavalidation":
      if (c[1] === "/") {
        if ((o = f.pop())[0] !== c[3]) throw new Error("Bad state: " + o.join("|"));
      } else
        c[0].charAt(c[0].length - 2) !== "/" && f.push([c[3], !0]);
      break;
    case "pixelsperinch":
      break;
    case "componentoptions":
    case "documentproperties":
    case "customdocumentproperties":
    case "officedocumentsettings":
    case "pivottable":
    case "pivotcache":
    case "names":
    case "mapinfo":
    case "pagebreaks":
    case "querytable":
    case "sorting":
    case "schema":
    //case 'data' /*case 'data'*/:
    case "conditionalformatting":
    case "smarttagtype":
    case "smarttags":
    case "excelworkbook":
    case "workbookoptions":
    case "worksheetoptions":
      if (c[1] === "/") {
        if ((o = f.pop())[0] !== c[3]) throw new Error("Bad state: " + o.join("|"));
      } else c[0].charAt(c[0].length - 2) !== "/" && f.push([c[3], !0]);
      break;
    case "null":
      break;
    default:
      if (f.length == 0 && c[3] == "document" || f.length == 0 && c[3] == "uof") return g0(a, r);
      var ce = !0;
      switch (f[f.length - 1][0]) {
        /* OfficeDocumentSettings */
        case "officedocumentsettings":
          switch (c[3]) {
            case "allowpng":
              break;
            case "removepersonalinformation":
              break;
            case "downloadcomponents":
              break;
            case "locationofcomponents":
              break;
            case "colors":
              break;
            case "color":
              break;
            case "index":
              break;
            case "rgb":
              break;
            case "targetscreensize":
              break;
            case "readonlyrecommended":
              break;
            default:
              ce = !1;
          }
          break;
        /* ComponentOptions */
        case "componentoptions":
          switch (c[3]) {
            case "toolbar":
              break;
            case "hideofficelogo":
              break;
            case "spreadsheetautofit":
              break;
            case "label":
              break;
            case "caption":
              break;
            case "maxheight":
              break;
            case "maxwidth":
              break;
            case "nextsheetnumber":
              break;
            default:
              ce = !1;
          }
          break;
        /* ExcelWorkbook */
        case "excelworkbook":
          switch (c[3]) {
            case "date1904":
              le.WBProps.date1904 = !0;
              break;
            case "hidehorizontalscrollbar":
              break;
            case "hideverticalscrollbar":
              break;
            case "hideworkbooktabs":
              break;
            case "windowheight":
              break;
            case "windowwidth":
              break;
            case "windowtopx":
              break;
            case "windowtopy":
              break;
            case "tabratio":
              break;
            case "protectstructure":
              break;
            case "protectwindow":
              break;
            case "protectwindows":
              break;
            case "activesheet":
              break;
            case "displayinknotes":
              break;
            case "firstvisiblesheet":
              break;
            case "supbook":
              break;
            case "sheetname":
              break;
            case "sheetindex":
              break;
            case "sheetindexfirst":
              break;
            case "sheetindexlast":
              break;
            case "dll":
              break;
            case "acceptlabelsinformulas":
              break;
            case "donotsavelinkvalues":
              break;
            case "iteration":
              break;
            case "maxiterations":
              break;
            case "maxchange":
              break;
            case "path":
              break;
            case "xct":
              break;
            case "count":
              break;
            case "selectedsheets":
              break;
            case "calculation":
              break;
            case "uncalced":
              break;
            case "startupprompt":
              break;
            case "crn":
              break;
            case "externname":
              break;
            case "formula":
              break;
            case "colfirst":
              break;
            case "collast":
              break;
            case "wantadvise":
              break;
            case "boolean":
              break;
            case "error":
              break;
            case "text":
              break;
            case "ole":
              break;
            case "noautorecover":
              break;
            case "publishobjects":
              break;
            case "donotcalculatebeforesave":
              break;
            case "number":
              break;
            case "refmoder1c1":
              break;
            case "embedsavesmarttags":
              break;
            default:
              ce = !1;
          }
          break;
        /* WorkbookOptions */
        case "workbookoptions":
          switch (c[3]) {
            case "owcversion":
              break;
            case "height":
              break;
            case "width":
              break;
            default:
              ce = !1;
          }
          break;
        /* WorksheetOptions */
        case "worksheetoptions":
          switch (c[3]) {
            case "visible":
              if (c[0].slice(-2) !== "/>") if (c[1] === "/") switch (a.slice(X, c.index)) {
                case "SheetHidden":
                  Ae.Hidden = 1;
                  break;
                case "SheetVeryHidden":
                  Ae.Hidden = 2;
                  break;
              }
              else X = c.index + c[0].length;
              break;
            case "header":
              u["!margins"] || oa(u["!margins"] = {}, "xlml"), isNaN(+ue(c[0]).Margin) || (u["!margins"].header = +ue(c[0]).Margin);
              break;
            case "footer":
              u["!margins"] || oa(u["!margins"] = {}, "xlml"), isNaN(+ue(c[0]).Margin) || (u["!margins"].footer = +ue(c[0]).Margin);
              break;
            case "pagemargins":
              var re = ue(c[0]);
              u["!margins"] || oa(u["!margins"] = {}, "xlml"), isNaN(+re.Top) || (u["!margins"].top = +re.Top), isNaN(+re.Left) || (u["!margins"].left = +re.Left), isNaN(+re.Right) || (u["!margins"].right = +re.Right), isNaN(+re.Bottom) || (u["!margins"].bottom = +re.Bottom);
              break;
            case "displayrighttoleft":
              le.Views || (le.Views = []), le.Views[0] || (le.Views[0] = {}), le.Views[0].RTL = !0;
              break;
            case "freezepanes":
              break;
            case "frozennosplit":
              break;
            case "splithorizontal":
            case "splitvertical":
              break;
            case "donotdisplaygridlines":
              break;
            case "activerow":
              break;
            case "activecol":
              break;
            case "toprowbottompane":
              break;
            case "leftcolumnrightpane":
              break;
            case "unsynced":
              break;
            case "print":
              break;
            case "printerrors":
              break;
            case "panes":
              break;
            case "scale":
              break;
            case "pane":
              break;
            case "number":
              break;
            case "layout":
              break;
            case "pagesetup":
              break;
            case "selected":
              break;
            case "protectobjects":
              break;
            case "enableselection":
              break;
            case "protectscenarios":
              break;
            case "validprinterinfo":
              break;
            case "horizontalresolution":
              break;
            case "verticalresolution":
              break;
            case "numberofcopies":
              break;
            case "activepane":
              break;
            case "toprowvisible":
              break;
            case "leftcolumnvisible":
              break;
            case "fittopage":
              break;
            case "rangeselection":
              break;
            case "papersizeindex":
              break;
            case "pagelayoutzoom":
              break;
            case "pagebreakzoom":
              break;
            case "filteron":
              break;
            case "fitwidth":
              break;
            case "fitheight":
              break;
            case "commentslayout":
              break;
            case "zoom":
              break;
            case "lefttoright":
              break;
            case "gridlines":
              break;
            case "allowsort":
              break;
            case "allowfilter":
              break;
            case "allowinsertrows":
              break;
            case "allowdeleterows":
              break;
            case "allowinsertcols":
              break;
            case "allowdeletecols":
              break;
            case "allowinserthyperlinks":
              break;
            case "allowformatcells":
              break;
            case "allowsizecols":
              break;
            case "allowsizerows":
              break;
            case "nosummaryrowsbelowdetail":
              u["!outline"] || (u["!outline"] = {}), u["!outline"].above = !0;
              break;
            case "tabcolorindex":
              break;
            case "donotdisplayheadings":
              break;
            case "showpagelayoutzoom":
              break;
            case "nosummarycolumnsrightdetail":
              u["!outline"] || (u["!outline"] = {}), u["!outline"].left = !0;
              break;
            case "blackandwhite":
              break;
            case "donotdisplayzeros":
              break;
            case "displaypagebreak":
              break;
            case "rowcolheadings":
              break;
            case "donotdisplayoutline":
              break;
            case "noorientation":
              break;
            case "allowusepivottables":
              break;
            case "zeroheight":
              break;
            case "viewablerange":
              break;
            case "selection":
              break;
            case "protectcontents":
              break;
            default:
              ce = !1;
          }
          break;
        /* PivotTable */
        case "pivottable":
        case "pivotcache":
          switch (c[3]) {
            case "immediateitemsondrop":
              break;
            case "showpagemultipleitemlabel":
              break;
            case "compactrowindent":
              break;
            case "location":
              break;
            case "pivotfield":
              break;
            case "orientation":
              break;
            case "layoutform":
              break;
            case "layoutsubtotallocation":
              break;
            case "layoutcompactrow":
              break;
            case "position":
              break;
            case "pivotitem":
              break;
            case "datatype":
              break;
            case "datafield":
              break;
            case "sourcename":
              break;
            case "parentfield":
              break;
            case "ptlineitems":
              break;
            case "ptlineitem":
              break;
            case "countofsameitems":
              break;
            case "item":
              break;
            case "itemtype":
              break;
            case "ptsource":
              break;
            case "cacheindex":
              break;
            case "consolidationreference":
              break;
            case "filename":
              break;
            case "reference":
              break;
            case "nocolumngrand":
              break;
            case "norowgrand":
              break;
            case "blanklineafteritems":
              break;
            case "hidden":
              break;
            case "subtotal":
              break;
            case "basefield":
              break;
            case "mapchilditems":
              break;
            case "function":
              break;
            case "refreshonfileopen":
              break;
            case "printsettitles":
              break;
            case "mergelabels":
              break;
            case "defaultversion":
              break;
            case "refreshname":
              break;
            case "refreshdate":
              break;
            case "refreshdatecopy":
              break;
            case "versionlastrefresh":
              break;
            case "versionlastupdate":
              break;
            case "versionupdateablemin":
              break;
            case "versionrefreshablemin":
              break;
            case "calculation":
              break;
            default:
              ce = !1;
          }
          break;
        /* PageBreaks */
        case "pagebreaks":
          switch (c[3]) {
            case "colbreaks":
              break;
            case "colbreak":
              break;
            case "rowbreaks":
              break;
            case "rowbreak":
              break;
            case "colstart":
              break;
            case "colend":
              break;
            case "rowend":
              break;
            default:
              ce = !1;
          }
          break;
        /* AutoFilter */
        case "autofilter":
          switch (c[3]) {
            case "autofiltercolumn":
              break;
            case "autofiltercondition":
              break;
            case "autofilterand":
              break;
            case "autofilteror":
              break;
            default:
              ce = !1;
          }
          break;
        /* QueryTable */
        case "querytable":
          switch (c[3]) {
            case "id":
              break;
            case "autoformatfont":
              break;
            case "autoformatpattern":
              break;
            case "querysource":
              break;
            case "querytype":
              break;
            case "enableredirections":
              break;
            case "refreshedinxl9":
              break;
            case "urlstring":
              break;
            case "htmltables":
              break;
            case "connection":
              break;
            case "commandtext":
              break;
            case "refreshinfo":
              break;
            case "notitles":
              break;
            case "nextid":
              break;
            case "columninfo":
              break;
            case "overwritecells":
              break;
            case "donotpromptforfile":
              break;
            case "textwizardsettings":
              break;
            case "source":
              break;
            case "number":
              break;
            case "decimal":
              break;
            case "thousandseparator":
              break;
            case "trailingminusnumbers":
              break;
            case "formatsettings":
              break;
            case "fieldtype":
              break;
            case "delimiters":
              break;
            case "tab":
              break;
            case "comma":
              break;
            case "autoformatname":
              break;
            case "versionlastedit":
              break;
            case "versionlastrefresh":
              break;
            default:
              ce = !1;
          }
          break;
        case "datavalidation":
          switch (c[3]) {
            case "range":
              break;
            case "type":
              break;
            case "min":
              break;
            case "max":
              break;
            case "sort":
              break;
            case "descending":
              break;
            case "order":
              break;
            case "casesensitive":
              break;
            case "value":
              break;
            case "errorstyle":
              break;
            case "errormessage":
              break;
            case "errortitle":
              break;
            case "inputmessage":
              break;
            case "inputtitle":
              break;
            case "combohide":
              break;
            case "inputhide":
              break;
            case "condition":
              break;
            case "qualifier":
              break;
            case "useblank":
              break;
            case "value1":
              break;
            case "value2":
              break;
            case "format":
              break;
            case "cellrangelist":
              break;
            default:
              ce = !1;
          }
          break;
        case "sorting":
        case "conditionalformatting":
          switch (c[3]) {
            case "range":
              break;
            case "type":
              break;
            case "min":
              break;
            case "max":
              break;
            case "sort":
              break;
            case "descending":
              break;
            case "order":
              break;
            case "casesensitive":
              break;
            case "value":
              break;
            case "errorstyle":
              break;
            case "errormessage":
              break;
            case "errortitle":
              break;
            case "cellrangelist":
              break;
            case "inputmessage":
              break;
            case "inputtitle":
              break;
            case "combohide":
              break;
            case "inputhide":
              break;
            case "condition":
              break;
            case "qualifier":
              break;
            case "useblank":
              break;
            case "value1":
              break;
            case "value2":
              break;
            case "format":
              break;
            default:
              ce = !1;
          }
          break;
        /* MapInfo (schema) */
        case "mapinfo":
        case "schema":
        case "data":
          switch (c[3]) {
            case "map":
              break;
            case "entry":
              break;
            case "range":
              break;
            case "xpath":
              break;
            case "field":
              break;
            case "xsdtype":
              break;
            case "filteron":
              break;
            case "aggregate":
              break;
            case "elementtype":
              break;
            case "attributetype":
              break;
            /* These are from xsd (XML Schema Definition) */
            case "schema":
            case "element":
            case "complextype":
            case "datatype":
            case "all":
            case "attribute":
            case "extends":
              break;
            case "row":
              break;
            default:
              ce = !1;
          }
          break;
        /* SmartTags (can be anything) */
        case "smarttags":
          break;
        default:
          ce = !1;
          break;
      }
      if (ce || c[3].match(/!\[CDATA/)) break;
      if (!f[f.length - 1][1]) throw "Unrecognized tag: " + c[3] + "|" + f.join("|");
      if (f[f.length - 1][0] === /*'CustomDocumentProperties'*/
      "customdocumentproperties") {
        if (c[0].slice(-2) === "/>") break;
        c[1] === "/" ? sm(M, ke, j, a.slice(X, c.index)) : (j = c, X = c.index + c[0].length);
        break;
      }
      if (r.WTF) throw "Unrecognized tag: " + c[3] + "|" + f.join("|");
  }
  var ge = {};
  return !r.bookSheets && !r.bookProps && (ge.Sheets = l), ge.SheetNames = p, ge.Workbook = le, ge.SSF = ir(_e), ge.Props = B, ge.Custprops = M, ge.bookType = "xlml", ge;
}
function Dn(e, t) {
  switch (ns(t = t || {}), t.type || "base64") {
    case "base64":
      return Tn(Mr(e), t);
    case "binary":
    case "buffer":
    case "file":
      return Tn(e, t);
    case "array":
      return Tn(ct(e), t);
  }
}
function hm(e) {
  var t = {}, r = e.content;
  if (r.l = 28, t.AnsiUserType = r.read_shift(0, "lpstr-ansi"), t.AnsiClipboardFormat = Nl(r), r.length - r.l <= 4) return t;
  var a = r.read_shift(4);
  if (a == 0 || a > 40 || (r.l -= 4, t.Reserved1 = r.read_shift(0, "lpstr-ansi"), r.length - r.l <= 4) || (a = r.read_shift(4), a !== 1907505652) || (t.UnicodeClipboardFormat = Dl(r), a = r.read_shift(4), a == 0 || a > 40)) return t;
  r.l -= 4, t.Reserved2 = r.read_shift(0, "lpwstr");
}
var um = [60, 1084, 2066, 2165, 2175];
function dm(e, t, r, a, n) {
  var s = a, i = [], c = r.slice(r.l, r.l + s);
  if (n && n.enc && n.enc.insitu && c.length > 0) switch (e) {
    case 9:
    case 521:
    case 1033:
    case 2057:
    case 47:
    case 405:
    case 225:
    case 406:
    case 312:
    case 404:
    case 10:
      break;
    case 133:
      break;
    default:
      n.enc.insitu(c);
  }
  i.push(c), r.l += s;
  for (var f = nt(r, r.l), o = Rn[f], l = 0; o != null && um.indexOf(f) > -1; )
    s = nt(r, r.l + 2), l = r.l + 4, f == 2066 ? l += 4 : (f == 2165 || f == 2175) && (l += 12), c = r.slice(l, r.l + 4 + s), i.push(c), r.l += 4 + s, o = Rn[f = nt(r, r.l)];
  var p = ht(i);
  cr(p, 0);
  var u = 0;
  p.lens = [];
  for (var h = 0; h < i.length; ++h)
    p.lens.push(u), u += i[h].length;
  if (p.length < a) throw "XLS Record 0x" + e.toString(16) + " Truncated: " + p.length + " < " + a;
  return t.f(p, p.length, n);
}
function qr(e, t, r) {
  if (e.t !== "z" && e.XF) {
    var a = 0;
    try {
      a = e.z || e.XF.numFmtId || 0, t.cellNF && e.z == null && (e.z = _e[a]);
    } catch (s) {
      if (t.WTF) throw s;
    }
    if (!t || t.cellText !== !1) try {
      e.t === "e" ? e.w = e.w || Pr[e.v] : a === 0 || a == "General" ? e.t === "n" ? (e.v | 0) === e.v ? e.w = e.v.toString(10) : e.w = pa(e.v) : e.w = yt(e.v) : e.w = Lr(a, e.v, { date1904: !!r, dateNF: t && t.dateNF });
    } catch (s) {
      if (t.WTF) throw s;
    }
    if (t.cellDates && a && e.t == "n" && Jr(_e[a] || String(a))) {
      var n = tt(e.v + (r ? 1462 : 0));
      n && (e.t = "d", e.v = new Date(Date.UTC(n.y, n.m - 1, n.d, n.H, n.M, n.S, n.u)));
    }
  }
}
function Wa(e, t, r) {
  return { v: e, ixfe: t, t: r };
}
function xm(e, t) {
  var r = { opts: {} }, a = {}, n = {};
  t.dense && (n["!data"] = []);
  var s = {}, i = {}, c = null, f = [], o = "", l = {}, p, u = "", h, m, k, x, d = {}, _ = [], g, C, O = [], U = [], P = { Sheets: [], WBProps: { date1904: !1 }, Views: [{}] }, I = {}, N = !1, B = function(fe) {
    return fe < 8 ? Ft[fe] : fe < 64 && U[fe - 8] || Ft[fe];
  }, M = function(fe, Le) {
    var Qe = fe.XF.data;
    if (!(!Qe || !Qe.patternType || !Le || !Le.cellStyles)) {
      fe.s = {}, fe.s.patternType = Qe.patternType;
      var er;
      (er = va(B(Qe.icvFore))) && (fe.s.fgColor = { rgb: er }), (er = va(B(Qe.icvBack))) && (fe.s.bgColor = { rgb: er });
    }
  }, X = function(fe, Le, Qe) {
    if (!(!N && Ee > 1) && !(Qe.sheetRows && fe.r >= Qe.sheetRows)) {
      if (Qe.cellStyles && Le.XF && Le.XF.data && M(Le, Qe), delete Le.ixfe, delete Le.XF, p = fe, u = Oe(fe), (!i || !i.s || !i.e) && (i = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }), fe.r < i.s.r && (i.s.r = fe.r), fe.c < i.s.c && (i.s.c = fe.c), fe.r + 1 > i.e.r && (i.e.r = fe.r + 1), fe.c + 1 > i.e.c && (i.e.c = fe.c + 1), Qe.cellFormula && Le.f) {
        for (var er = 0; er < _.length; ++er)
          if (!(_[er][0].s.c > fe.c || _[er][0].s.r > fe.r) && !(_[er][0].e.c < fe.c || _[er][0].e.r < fe.r)) {
            Le.F = Pe(_[er][0]), (_[er][0].s.c != fe.c || _[er][0].s.r != fe.r) && delete Le.f, Le.f && (Le.f = "" + vr(_[er][1], i, fe, K, j));
            break;
          }
      }
      Qe.dense ? (n["!data"][fe.r] || (n["!data"][fe.r] = []), n["!data"][fe.r][fe.c] = Le) : n[u] = Le;
    }
  }, j = {
    enc: !1,
    // encrypted
    sbcch: 0,
    // cch in the preceding SupBook
    snames: [],
    // sheetnames
    sharedf: d,
    // shared formulae by address
    arrayf: _,
    // array formulae array
    rrtabid: [],
    // RRTabId
    lastuser: "",
    // Last User from WriteAccess
    biff: 8,
    // BIFF version
    codepage: 0,
    // CP from CodePage record
    winlocked: 0,
    // fLockWn from WinProtect
    cellStyles: !!t && !!t.cellStyles,
    WTF: !!t && !!t.wtf
  };
  t.password && (j.password = t.password);
  var oe, Z = [], xe = [], q = [], ie = [], ve = !1, K = [];
  K.SheetNames = j.snames, K.sharedf = j.sharedf, K.arrayf = j.arrayf, K.names = [], K.XTI = [];
  var we = 0, Ee = 0, me = 0, le = [], Ae = [], ke;
  j.codepage = 1200, jr(1200);
  for (var Se = !1; e.l < e.length - 1; ) {
    var S = e.l, L = e.read_shift(2);
    if (L === 0 && we === 10) break;
    var R = e.l === e.length ? 0 : e.read_shift(2), b = Rn[L];
    if (Ee == 0 && [9, 521, 1033, 2057].indexOf(L) == -1) break;
    if (b && b.f) {
      if (t.bookSheets && we === 133 && L !== 133)
        break;
      if (we = L, b.r === 2 || b.r == 12) {
        var J = e.read_shift(2);
        if (R -= 2, !j.enc && J !== L && ((J & 255) << 8 | J >> 8) !== L) throw new Error("rt mismatch: " + J + "!=" + L);
        b.r == 12 && (e.l += 10, R -= 10);
      }
      var T = {};
      if (L === 10 ? T = /*::(*/
      b.f(e, R, j) : T = /*::(*/
      dm(L, b, e, R, j), Ee == 0 && [9, 521, 1033, 2057].indexOf(we) === -1) continue;
      switch (L) {
        case 34:
          r.opts.Date1904 = P.WBProps.date1904 = T;
          break;
        case 134:
          r.opts.WriteProtect = !0;
          break;
        case 47:
          if (j.enc || (e.l = 0), j.enc = T, !t.password) throw new Error("File is password-protected");
          if (T.valid == null) throw new Error("Encryption scheme unsupported");
          if (!T.valid) throw new Error("Password is incorrect");
          break;
        case 92:
          j.lastuser = T;
          break;
        case 66:
          var se = Number(T);
          switch (se) {
            case 21010:
              se = 1200;
              break;
            case 32768:
              se = 1e4;
              break;
            case 32769:
              se = 1252;
              break;
          }
          jr(j.codepage = se), Se = !0;
          break;
        case 317:
          j.rrtabid = T;
          break;
        case 25:
          j.winlocked = T;
          break;
        case 439:
          r.opts.RefreshAll = T;
          break;
        case 12:
          r.opts.CalcCount = T;
          break;
        case 16:
          r.opts.CalcDelta = T;
          break;
        case 17:
          r.opts.CalcIter = T;
          break;
        case 13:
          r.opts.CalcMode = T;
          break;
        case 14:
          r.opts.CalcPrecision = T;
          break;
        case 95:
          r.opts.CalcSaveRecalc = T;
          break;
        case 15:
          j.CalcRefMode = T;
          break;
        // TODO: implement R1C1
        case 2211:
          r.opts.FullCalc = T;
          break;
        case 129:
          T.fDialog && (n["!type"] = "dialog"), T.fBelow || ((n["!outline"] || (n["!outline"] = {})).above = !0), T.fRight || ((n["!outline"] || (n["!outline"] = {})).left = !0);
          break;
        // TODO
        case 67:
        /* BIFF2XF */
        case 579:
        /* BIFF3XF */
        case 1091:
        /* BIFF4XF */
        case 224:
          O.push(T);
          break;
        case 430:
          K.push([T]), K[K.length - 1].XTI = [];
          break;
        case 35:
        case 547:
          K[K.length - 1].push(T);
          break;
        case 24:
        case 536:
          ke = {
            Name: T.Name,
            Ref: vr(T.rgce, i, null, K, j)
          }, T.itab > 0 && (ke.Sheet = T.itab - 1), K.names.push(ke), K[0] || (K[0] = [], K[0].XTI = []), K[K.length - 1].push(T), T.Name == "_xlnm._FilterDatabase" && T.itab > 0 && T.rgce && T.rgce[0] && T.rgce[0][0] && T.rgce[0][0][0] == "PtgArea3d" && (Ae[T.itab - 1] = { ref: Pe(T.rgce[0][0][1][2]) });
          break;
        case 22:
          j.ExternCount = T;
          break;
        case 23:
          K.length == 0 && (K[0] = [], K[0].XTI = []), K[K.length - 1].XTI = K[K.length - 1].XTI.concat(T), K.XTI = K.XTI.concat(T);
          break;
        case 2196:
          if (j.biff < 8) break;
          ke != null && (ke.Comment = T[1]);
          break;
        case 18:
          n["!protect"] = T;
          break;
        /* for sheet or book */
        case 19:
          T !== 0 && j.WTF && console.error("Password verifier: " + T);
          break;
        case 133:
          s[j.biff == 4 ? j.snames.length : T.pos] = T, j.snames.push(T.name);
          break;
        case 10:
          {
            if (--Ee ? !N : N) break;
            if (i.e) {
              if (i.e.r > 0 && i.e.c > 0) {
                if (i.e.r--, i.e.c--, n["!ref"] = Pe(i), t.sheetRows && t.sheetRows <= i.e.r) {
                  var ce = i.e.r;
                  i.e.r = t.sheetRows - 1, n["!fullref"] = n["!ref"], n["!ref"] = Pe(i), i.e.r = ce;
                }
                i.e.r++, i.e.c++;
              }
              Z.length > 0 && (n["!merges"] = Z), xe.length > 0 && (n["!objects"] = xe), q.length > 0 && (n["!cols"] = q), ie.length > 0 && (n["!rows"] = ie), P.Sheets.push(I);
            }
            o === "" ? l = n : a[o] = n, n = {}, t.dense && (n["!data"] = []);
          }
          break;
        case 9:
        case 521:
        case 1033:
        case 2057:
          {
            if (j.biff === 8 && (j.biff = {
              9: 2,
              521: 3,
              1033: 4
            }[L] || {
              512: 2,
              768: 3,
              1024: 4,
              1280: 5,
              1536: 8,
              2: 2,
              7: 2
            }[T.BIFFVer] || 8), j.biffguess = T.BIFFVer == 0, T.BIFFVer == 0 && T.dt == 4096 && (j.biff = 5, Se = !0, jr(j.codepage = 28591)), j.biff == 4 && T.dt & 256 && (N = !0), j.biff == 8 && T.BIFFVer == 0 && T.dt == 16 && (j.biff = 2), Ee++ && !N) break;
            if (n = {}, t.dense && (n["!data"] = []), j.biff < 8 && !Se && (Se = !0, jr(j.codepage = t.codepage || 1252)), j.biff == 4 && N)
              o = (s[j.snames.indexOf(o) + 1] || { name: "" }).name;
            else if (j.biff < 5 || T.BIFFVer == 0 && T.dt == 4096) {
              o === "" && (o = "Sheet1"), i = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
              var re = { pos: e.l - R, name: o };
              s[re.pos] = re, j.snames.push(o);
            } else o = (s[S] || { name: "" }).name;
            T.dt == 32 && (n["!type"] = "chart"), T.dt == 64 && (n["!type"] = "macro"), Z = [], xe = [], j.arrayf = _ = [], q = [], ie = [], ve = !1, I = { Hidden: (s[S] || { hs: 0 }).hs, name: o };
          }
          break;
        case 515:
        case 3:
        case 2:
          n["!type"] == "chart" && (t.dense ? (n["!data"][T.r] || [])[T.c] : n[Me(T.c) + We(T.r)]) && ++T.c, g = { ixfe: T.ixfe, XF: O[T.ixfe] || {}, v: T.val, t: "n" }, me > 0 && (g.z = g.XF && g.XF.numFmtId && le[g.XF.numFmtId] || le[g.ixfe >> 8 & 63]), qr(g, t, r.opts.Date1904), X({ c: T.c, r: T.r }, g, t);
          break;
        case 5:
        case 517:
          g = { ixfe: T.ixfe, XF: O[T.ixfe], v: T.val, t: T.t }, me > 0 && (g.z = g.XF && g.XF.numFmtId && le[g.XF.numFmtId] || le[g.ixfe >> 8 & 63]), qr(g, t, r.opts.Date1904), X({ c: T.c, r: T.r }, g, t);
          break;
        case 638:
          g = { ixfe: T.ixfe, XF: O[T.ixfe], v: T.rknum, t: "n" }, me > 0 && (g.z = g.XF && g.XF.numFmtId && le[g.XF.numFmtId] || le[g.ixfe >> 8 & 63]), qr(g, t, r.opts.Date1904), X({ c: T.c, r: T.r }, g, t);
          break;
        case 189:
          for (var ge = T.c; ge <= T.C; ++ge) {
            var pe = T.rkrec[ge - T.c][0];
            g = { ixfe: pe, XF: O[pe], v: T.rkrec[ge - T.c][1], t: "n" }, me > 0 && (g.z = g.XF && g.XF.numFmtId && le[g.XF.numFmtId] || le[g.ixfe >> 8 & 63]), qr(g, t, r.opts.Date1904), X({ c: ge, r: T.r }, g, t);
          }
          break;
        case 6:
        case 518:
        case 1030:
          {
            if (T.val == "String") {
              c = T;
              break;
            }
            if (g = Wa(T.val, T.cell.ixfe, T.tt), g.XF = O[g.ixfe], t.cellFormula) {
              var Te = T.formula;
              if (Te && Te[0] && Te[0][0] && Te[0][0][0] == "PtgExp") {
                var Be = Te[0][0][1][0], $e = Te[0][0][1][1], je = Oe({ r: Be, c: $e });
                d[je] ? g.f = "" + vr(T.formula, i, T.cell, K, j) : g.F = ((t.dense ? (n["!data"][Be] || [])[$e] : n[je]) || {}).F;
              } else g.f = "" + vr(T.formula, i, T.cell, K, j);
            }
            me > 0 && (g.z = g.XF && g.XF.numFmtId && le[g.XF.numFmtId] || le[g.ixfe >> 8 & 63]), qr(g, t, r.opts.Date1904), X(T.cell, g, t), c = T;
          }
          break;
        case 7:
        case 519:
          if (c)
            c.val = T, g = Wa(T, c.cell.ixfe, "s"), g.XF = O[g.ixfe], t.cellFormula && (g.f = "" + vr(c.formula, i, c.cell, K, j)), me > 0 && (g.z = g.XF && g.XF.numFmtId && le[g.XF.numFmtId] || le[g.ixfe >> 8 & 63]), qr(g, t, r.opts.Date1904), X(c.cell, g, t), c = null;
          else throw new Error("String record expects Formula");
          break;
        case 33:
        case 545:
          {
            _.push(T);
            var de = Oe(T[0].s);
            if (h = t.dense ? (n["!data"][T[0].s.r] || [])[T[0].s.c] : n[de], t.cellFormula && h) {
              if (!c || !de || !h) break;
              h.f = "" + vr(T[1], i, T[0], K, j), h.F = Pe(T[0]);
            }
          }
          break;
        case 1212:
          {
            if (!t.cellFormula) break;
            if (u) {
              if (!c) break;
              d[Oe(c.cell)] = T[0], h = t.dense ? (n["!data"][c.cell.r] || [])[c.cell.c] : n[Oe(c.cell)], (h || {}).f = "" + vr(T[0], i, p, K, j);
            }
          }
          break;
        case 253:
          g = Wa(f[T.isst].t, T.ixfe, "s"), f[T.isst].h && (g.h = f[T.isst].h), g.XF = O[g.ixfe], me > 0 && (g.z = g.XF && g.XF.numFmtId && le[g.XF.numFmtId] || le[g.ixfe >> 8 & 63]), qr(g, t, r.opts.Date1904), X({ c: T.c, r: T.r }, g, t);
          break;
        case 513:
          t.sheetStubs && (g = { ixfe: T.ixfe, XF: O[T.ixfe], t: "z" }, me > 0 && (g.z = g.XF && g.XF.numFmtId && le[g.XF.numFmtId] || le[g.ixfe >> 8 & 63]), qr(g, t, r.opts.Date1904), X({ c: T.c, r: T.r }, g, t));
          break;
        case 190:
          if (t.sheetStubs)
            for (var Ne = T.c; Ne <= T.C; ++Ne) {
              var ae = T.ixfe[Ne - T.c];
              g = { ixfe: ae, XF: O[ae], t: "z" }, me > 0 && (g.z = g.XF && g.XF.numFmtId && le[g.XF.numFmtId] || le[g.ixfe >> 8 & 63]), qr(g, t, r.opts.Date1904), X({ c: Ne, r: T.r }, g, t);
            }
          break;
        case 214:
        case 516:
        case 4:
          g = Wa(T.val, T.ixfe, "s"), g.XF = O[g.ixfe], me > 0 && (g.z = g.XF && g.XF.numFmtId && le[g.XF.numFmtId] || le[g.ixfe >> 8 & 63]), qr(g, t, r.opts.Date1904), X({ c: T.c, r: T.r }, g, t);
          break;
        case 0:
        case 512:
          Ee === 1 && (i = T);
          break;
        case 252:
          f = T;
          break;
        case 1054:
          if (j.biff >= 3 && j.biff <= 4) {
            le[me++] = T[1];
            for (var Nr = 0; Nr < me + 163 && _e[Nr] != T[1]; ++Nr) ;
            Nr >= 163 && Tt(T[1], me + 163);
          } else Tt(T[1], T[0]);
          break;
        case 30:
          {
            le[me++] = T;
            for (var Tr = 0; Tr < me + 163 && _e[Tr] != T; ++Tr) ;
            Tr >= 163 && Tt(T, me + 163);
          }
          break;
        case 229:
          Z = Z.concat(T);
          break;
        case 93:
          xe[T.cmo[0]] = j.lastobj = T;
          break;
        case 438:
          j.lastobj.TxO = T;
          break;
        case 127:
          j.lastobj.ImData = T;
          break;
        case 440:
          for (x = T[0].s.r; x <= T[0].e.r; ++x)
            for (k = T[0].s.c; k <= T[0].e.c; ++k)
              h = t.dense ? (n["!data"][x] || [])[k] : n[Oe({ c: k, r: x })], h && (h.l = T[1]);
          break;
        case 2048:
          for (x = T[0].s.r; x <= T[0].e.r; ++x)
            for (k = T[0].s.c; k <= T[0].e.c; ++k)
              h = t.dense ? (n["!data"][x] || [])[k] : n[Oe({ c: k, r: x })], h && h.l && (h.l.Tooltip = T[1]);
          break;
        case 28:
          {
            if (h = t.dense ? (n["!data"][T[0].r] || [])[T[0].c] : n[Oe(T[0])], h || (t.dense ? (n["!data"][T[0].r] || (n["!data"][T[0].r] = []), h = n["!data"][T[0].r][T[0].c] = { t: "z" }) : h = n[Oe(T[0])] = { t: "z" }, i.e.r = Math.max(i.e.r, T[0].r), i.s.r = Math.min(i.s.r, T[0].r), i.e.c = Math.max(i.e.c, T[0].c), i.s.c = Math.min(i.s.c, T[0].c)), h.c || (h.c = []), j.biff <= 5 && j.biff >= 2) m = { a: "SheetJ5", t: T[1] };
            else {
              var Xe = xe[T[2]];
              m = { a: T[1], t: Xe.TxO.t }, T[3] != null && !(T[3] & 2) && (h.c.hidden = !0);
            }
            h.c.push(m);
          }
          break;
        case 2173:
          U1(O[T.ixfe], T.ext);
          break;
        case 125:
          {
            if (!j.cellStyles) break;
            for (; T.e >= T.s; )
              q[T.e--] = { width: T.w / 256, level: T.level || 0, hidden: !!(T.flags & 1) }, ve || (ve = !0, es(T.w / 256)), Xt(q[T.e + 1]);
          }
          break;
        case 520:
          {
            var zr = {};
            T.level != null && (ie[T.r] = zr, zr.level = T.level), T.hidden && (ie[T.r] = zr, zr.hidden = !0), T.hpt && (ie[T.r] = zr, zr.hpt = T.hpt, zr.hpx = ka(T.hpt));
          }
          break;
        case 38:
        case 39:
        case 40:
        case 41:
          n["!margins"] || oa(n["!margins"] = {}), n["!margins"][{ 38: "left", 39: "right", 40: "top", 41: "bottom" }[L]] = T;
          break;
        case 161:
          n["!margins"] || oa(n["!margins"] = {}), n["!margins"].header = T.header, n["!margins"].footer = T.footer;
          break;
        case 574:
          T.RTL && (P.Views[0].RTL = !0);
          break;
        case 146:
          U = T;
          break;
        case 2198:
          oe = T;
          break;
        case 140:
          C = T;
          break;
        case 442:
          o ? I.CodeName = T || I.name : P.WBProps.CodeName = T || "ThisWorkbook";
          break;
      }
    } else
      b || console.error("Missing Info for XLS Record 0x" + L.toString(16)), e.l += R;
  }
  return r.SheetNames = $r(s).sort(function(yr, fe) {
    return Number(yr) - Number(fe);
  }).map(function(yr) {
    return s[yr].name;
  }), t.bookSheets || (r.Sheets = a), !r.SheetNames.length && l["!ref"] ? (r.SheetNames.push("Sheet1"), r.Sheets && (r.Sheets.Sheet1 = l)) : r.Preamble = l, r.Sheets && Ae.forEach(function(yr, fe) {
    r.Sheets[r.SheetNames[fe]]["!autofilter"] = yr;
  }), r.Strings = f, r.SSF = ir(_e), j.enc && (r.Encryption = j.enc), oe && (r.Themes = oe), r.Metadata = {}, C !== void 0 && (r.Metadata.Country = C), K.names.length > 0 && (P.Names = K.names), r.Workbook = P, r;
}
var d0 = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae"
};
function pm(e, t, r) {
  var a = Re.find(e, "/!DocumentSummaryInformation");
  if (a && a.size > 0) try {
    var n = Ys(a, Bl, d0.DSI);
    for (var s in n) t[s] = n[s];
  } catch (o) {
    if (r.WTF) throw o;
  }
  var i = Re.find(e, "/!SummaryInformation");
  if (i && i.size > 0) try {
    var c = Ys(i, Ul, d0.SI);
    for (var f in c) t[f] == null && (t[f] = c[f]);
  } catch (o) {
    if (r.WTF) throw o;
  }
  t.HeadingPairs && t.TitlesOfParts && (_i(t.HeadingPairs, t.TitlesOfParts, t, r), delete t.HeadingPairs, delete t.TitlesOfParts);
}
function rc(e, t) {
  t || (t = {}), ns(t), D0(), t.codepage && Un(t.codepage);
  var r, a;
  if (e.FullPaths) {
    if (Re.find(e, "/encryption")) throw new Error("File is password-protected");
    r = Re.find(e, "!CompObj"), a = Re.find(e, "/Workbook") || Re.find(e, "/Book");
  } else {
    switch (t.type) {
      case "base64":
        e = Rr(Mr(e));
        break;
      case "binary":
        e = Rr(e);
        break;
      case "buffer":
        break;
      case "array":
        Array.isArray(e) || (e = Array.prototype.slice.call(e));
        break;
    }
    cr(e, 0), a = { content: e };
  }
  var n, s;
  if (r && hm(r), t.bookProps && !t.bookSheets) n = {};
  else {
    var i = Ce ? "buffer" : "array";
    if (a && a.content) n = xm(a.content, t);
    else if ((s = Re.find(e, "PerfectOffice_MAIN")) && s.content) n = ca.to_workbook(s.content, (t.type = i, t));
    else if ((s = Re.find(e, "NativeContent_MAIN")) && s.content) n = ca.to_workbook(s.content, (t.type = i, t));
    else throw (s = Re.find(e, "MN0")) && s.content ? new Error("Unsupported Works 4 for Mac file") : new Error("Cannot find Workbook stream");
    t.bookVBA && e.FullPaths && Re.find(e, "/_VBA_PROJECT_CUR/VBA/dir") && (n.vbaraw = nd(e));
  }
  var c = {};
  return e.FullPaths && pm(
    /*::((*/
    e,
    c,
    t
  ), n.Props = n.Custprops = c, t.bookFiles && (n.cfb = e), n;
}
var rn = {
  0: {
    /* n:"BrtRowHdr", */
    f: Jx
  },
  1: {
    /* n:"BrtCellBlank", */
    f: ep
  },
  2: {
    /* n:"BrtCellRk", */
    f: op
  },
  3: {
    /* n:"BrtCellError", */
    f: np
  },
  4: {
    /* n:"BrtCellBool", */
    f: tp
  },
  5: {
    /* n:"BrtCellReal", */
    f: fp
  },
  6: {
    /* n:"BrtCellSt", */
    f: up
  },
  7: {
    /* n:"BrtCellIsst", */
    f: ip
  },
  8: {
    /* n:"BrtFmlaString", */
    f: gp
  },
  9: {
    /* n:"BrtFmlaNum", */
    f: mp
  },
  10: {
    /* n:"BrtFmlaBool", */
    f: xp
  },
  11: {
    /* n:"BrtFmlaError", */
    f: pp
  },
  12: {
    /* n:"BrtShortBlank", */
    f: rp
  },
  13: {
    /* n:"BrtShortRk", */
    f: lp
  },
  14: {
    /* n:"BrtShortError", */
    f: sp
  },
  15: {
    /* n:"BrtShortBool", */
    f: ap
  },
  16: {
    /* n:"BrtShortReal", */
    f: Ji
  },
  17: {
    /* n:"BrtShortSt", */
    f: dp
  },
  18: {
    /* n:"BrtShortIsst", */
    f: cp
  },
  19: {
    /* n:"BrtSSTItem", */
    f: Jn
  },
  20: {
    /* n:"BrtPCDIMissing" */
  },
  21: {
    /* n:"BrtPCDINumber" */
  },
  22: {
    /* n:"BrtPCDIBoolean" */
  },
  23: {
    /* n:"BrtPCDIError" */
  },
  24: {
    /* n:"BrtPCDIString" */
  },
  25: {
    /* n:"BrtPCDIDatetime" */
  },
  26: {
    /* n:"BrtPCDIIndex" */
  },
  27: {
    /* n:"BrtPCDIAMissing" */
  },
  28: {
    /* n:"BrtPCDIANumber" */
  },
  29: {
    /* n:"BrtPCDIABoolean" */
  },
  30: {
    /* n:"BrtPCDIAError" */
  },
  31: {
    /* n:"BrtPCDIAString" */
  },
  32: {
    /* n:"BrtPCDIADatetime" */
  },
  33: {
    /* n:"BrtPCRRecord" */
  },
  34: {
    /* n:"BrtPCRRecordDt" */
  },
  35: {
    /* n:"BrtFRTBegin", */
    T: 1
  },
  36: {
    /* n:"BrtFRTEnd", */
    T: -1
  },
  37: {
    /* n:"BrtACBegin", */
    T: 1
  },
  38: {
    /* n:"BrtACEnd", */
    T: -1
  },
  39: {
    /* n:"BrtName", */
    f: Gp
  },
  40: {
    /* n:"BrtIndexRowBlock" */
  },
  42: {
    /* n:"BrtIndexBlock" */
  },
  43: {
    /* n:"BrtFont", */
    f: T1
  },
  44: {
    /* n:"BrtFmt", */
    f: w1
  },
  45: {
    /* n:"BrtFill", */
    f: A1
  },
  46: {
    /* n:"BrtBorder", */
    f: S1
  },
  47: {
    /* n:"BrtXF", */
    f: F1
  },
  48: {
    /* n:"BrtStyle" */
  },
  49: {
    /* n:"BrtCellMeta", */
    f: Al
  },
  50: {
    /* n:"BrtValueMeta" */
  },
  51: {
    /* n:"BrtMdb" */
    f: W1
  },
  52: {
    /* n:"BrtBeginFmd", */
    T: 1
  },
  53: {
    /* n:"BrtEndFmd", */
    T: -1
  },
  54: {
    /* n:"BrtBeginMdx", */
    T: 1
  },
  55: {
    /* n:"BrtEndMdx", */
    T: -1
  },
  56: {
    /* n:"BrtBeginMdxTuple", */
    T: 1
  },
  57: {
    /* n:"BrtEndMdxTuple", */
    T: -1
  },
  58: {
    /* n:"BrtMdxMbrIstr" */
  },
  59: {
    /* n:"BrtStr" */
  },
  60: {
    /* n:"BrtColInfo", */
    f: Ni
  },
  62: {
    /* n:"BrtCellRString", */
    f: hp
  },
  63: {
    /* n:"BrtCalcChainItem$", */
    f: z1
  },
  64: {
    /* n:"BrtDVal", */
    f: Sp
  },
  65: {
    /* n:"BrtSxvcellNum" */
  },
  66: {
    /* n:"BrtSxvcellStr" */
  },
  67: {
    /* n:"BrtSxvcellBool" */
  },
  68: {
    /* n:"BrtSxvcellErr" */
  },
  69: {
    /* n:"BrtSxvcellDate" */
  },
  70: {
    /* n:"BrtSxvcellNil" */
  },
  128: {
    /* n:"BrtFileVersion" */
  },
  129: {
    /* n:"BrtBeginSheet", */
    T: 1
  },
  130: {
    /* n:"BrtEndSheet", */
    T: -1
  },
  131: {
    /* n:"BrtBeginBook", */
    T: 1,
    f: wr,
    p: 0
  },
  132: {
    /* n:"BrtEndBook", */
    T: -1
  },
  133: {
    /* n:"BrtBeginWsViews", */
    T: 1
  },
  134: {
    /* n:"BrtEndWsViews", */
    T: -1
  },
  135: {
    /* n:"BrtBeginBookViews", */
    T: 1
  },
  136: {
    /* n:"BrtEndBookViews", */
    T: -1
  },
  137: {
    /* n:"BrtBeginWsView", */
    T: 1,
    f: Fp
  },
  138: {
    /* n:"BrtEndWsView", */
    T: -1
  },
  139: {
    /* n:"BrtBeginCsViews", */
    T: 1
  },
  140: {
    /* n:"BrtEndCsViews", */
    T: -1
  },
  141: {
    /* n:"BrtBeginCsView", */
    T: 1
  },
  142: {
    /* n:"BrtEndCsView", */
    T: -1
  },
  143: {
    /* n:"BrtBeginBundleShs", */
    T: 1
  },
  144: {
    /* n:"BrtEndBundleShs", */
    T: -1
  },
  145: {
    /* n:"BrtBeginSheetData", */
    T: 1
  },
  146: {
    /* n:"BrtEndSheetData", */
    T: -1
  },
  147: {
    /* n:"BrtWsProp", */
    f: Qx
  },
  148: {
    /* n:"BrtWsDim", */
    f: Zx,
    p: 16
  },
  151: {
    /* n:"BrtPane", */
    f: _p
  },
  152: {
    /* n:"BrtSel" */
  },
  153: {
    /* n:"BrtWbProp", */
    f: Vp
  },
  154: {
    /* n:"BrtWbFactoid" */
  },
  155: {
    /* n:"BrtFileRecover" */
  },
  156: {
    /* n:"BrtBundleSh", */
    f: Wp
  },
  157: {
    /* n:"BrtCalcProp" */
  },
  158: {
    /* n:"BrtBookView" */
  },
  159: {
    /* n:"BrtBeginSst", */
    T: 1,
    f: Wu
  },
  160: {
    /* n:"BrtEndSst", */
    T: -1
  },
  161: {
    /* n:"BrtBeginAFilter", */
    T: 1,
    f: It
  },
  162: {
    /* n:"BrtEndAFilter", */
    T: -1
  },
  163: {
    /* n:"BrtBeginFilterColumn", */
    T: 1
  },
  164: {
    /* n:"BrtEndFilterColumn", */
    T: -1
  },
  165: {
    /* n:"BrtBeginFilters", */
    T: 1
  },
  166: {
    /* n:"BrtEndFilters", */
    T: -1
  },
  167: {
    /* n:"BrtFilter" */
  },
  168: {
    /* n:"BrtColorFilter" */
  },
  169: {
    /* n:"BrtIconFilter" */
  },
  170: {
    /* n:"BrtTop10Filter" */
  },
  171: {
    /* n:"BrtDynamicFilter" */
  },
  172: {
    /* n:"BrtBeginCustomFilters", */
    T: 1
  },
  173: {
    /* n:"BrtEndCustomFilters", */
    T: -1
  },
  174: {
    /* n:"BrtCustomFilter" */
  },
  175: {
    /* n:"BrtAFilterDateGroupItem" */
  },
  176: {
    /* n:"BrtMergeCell", */
    f: vp
  },
  177: {
    /* n:"BrtBeginMergeCells", */
    T: 1
  },
  178: {
    /* n:"BrtEndMergeCells", */
    T: -1
  },
  179: {
    /* n:"BrtBeginPivotCacheDef", */
    T: 1
  },
  180: {
    /* n:"BrtEndPivotCacheDef", */
    T: -1
  },
  181: {
    /* n:"BrtBeginPCDFields", */
    T: 1
  },
  182: {
    /* n:"BrtEndPCDFields", */
    T: -1
  },
  183: {
    /* n:"BrtBeginPCDField", */
    T: 1
  },
  184: {
    /* n:"BrtEndPCDField", */
    T: -1
  },
  185: {
    /* n:"BrtBeginPCDSource", */
    T: 1
  },
  186: {
    /* n:"BrtEndPCDSource", */
    T: -1
  },
  187: {
    /* n:"BrtBeginPCDSRange", */
    T: 1
  },
  188: {
    /* n:"BrtEndPCDSRange", */
    T: -1
  },
  189: {
    /* n:"BrtBeginPCDFAtbl", */
    T: 1
  },
  190: {
    /* n:"BrtEndPCDFAtbl", */
    T: -1
  },
  191: {
    /* n:"BrtBeginPCDIRun", */
    T: 1
  },
  192: {
    /* n:"BrtEndPCDIRun", */
    T: -1
  },
  193: {
    /* n:"BrtBeginPivotCacheRecords", */
    T: 1
  },
  194: {
    /* n:"BrtEndPivotCacheRecords", */
    T: -1
  },
  195: {
    /* n:"BrtBeginPCDHierarchies", */
    T: 1
  },
  196: {
    /* n:"BrtEndPCDHierarchies", */
    T: -1
  },
  197: {
    /* n:"BrtBeginPCDHierarchy", */
    T: 1
  },
  198: {
    /* n:"BrtEndPCDHierarchy", */
    T: -1
  },
  199: {
    /* n:"BrtBeginPCDHFieldsUsage", */
    T: 1
  },
  200: {
    /* n:"BrtEndPCDHFieldsUsage", */
    T: -1
  },
  201: {
    /* n:"BrtBeginExtConnection", */
    T: 1
  },
  202: {
    /* n:"BrtEndExtConnection", */
    T: -1
  },
  203: {
    /* n:"BrtBeginECDbProps", */
    T: 1
  },
  204: {
    /* n:"BrtEndECDbProps", */
    T: -1
  },
  205: {
    /* n:"BrtBeginECOlapProps", */
    T: 1
  },
  206: {
    /* n:"BrtEndECOlapProps", */
    T: -1
  },
  207: {
    /* n:"BrtBeginPCDSConsol", */
    T: 1
  },
  208: {
    /* n:"BrtEndPCDSConsol", */
    T: -1
  },
  209: {
    /* n:"BrtBeginPCDSCPages", */
    T: 1
  },
  210: {
    /* n:"BrtEndPCDSCPages", */
    T: -1
  },
  211: {
    /* n:"BrtBeginPCDSCPage", */
    T: 1
  },
  212: {
    /* n:"BrtEndPCDSCPage", */
    T: -1
  },
  213: {
    /* n:"BrtBeginPCDSCPItem", */
    T: 1
  },
  214: {
    /* n:"BrtEndPCDSCPItem", */
    T: -1
  },
  215: {
    /* n:"BrtBeginPCDSCSets", */
    T: 1
  },
  216: {
    /* n:"BrtEndPCDSCSets", */
    T: -1
  },
  217: {
    /* n:"BrtBeginPCDSCSet", */
    T: 1
  },
  218: {
    /* n:"BrtEndPCDSCSet", */
    T: -1
  },
  219: {
    /* n:"BrtBeginPCDFGroup", */
    T: 1
  },
  220: {
    /* n:"BrtEndPCDFGroup", */
    T: -1
  },
  221: {
    /* n:"BrtBeginPCDFGItems", */
    T: 1
  },
  222: {
    /* n:"BrtEndPCDFGItems", */
    T: -1
  },
  223: {
    /* n:"BrtBeginPCDFGRange", */
    T: 1
  },
  224: {
    /* n:"BrtEndPCDFGRange", */
    T: -1
  },
  225: {
    /* n:"BrtBeginPCDFGDiscrete", */
    T: 1
  },
  226: {
    /* n:"BrtEndPCDFGDiscrete", */
    T: -1
  },
  227: {
    /* n:"BrtBeginPCDSDTupleCache", */
    T: 1
  },
  228: {
    /* n:"BrtEndPCDSDTupleCache", */
    T: -1
  },
  229: {
    /* n:"BrtBeginPCDSDTCEntries", */
    T: 1
  },
  230: {
    /* n:"BrtEndPCDSDTCEntries", */
    T: -1
  },
  231: {
    /* n:"BrtBeginPCDSDTCEMembers", */
    T: 1
  },
  232: {
    /* n:"BrtEndPCDSDTCEMembers", */
    T: -1
  },
  233: {
    /* n:"BrtBeginPCDSDTCEMember", */
    T: 1
  },
  234: {
    /* n:"BrtEndPCDSDTCEMember", */
    T: -1
  },
  235: {
    /* n:"BrtBeginPCDSDTCQueries", */
    T: 1
  },
  236: {
    /* n:"BrtEndPCDSDTCQueries", */
    T: -1
  },
  237: {
    /* n:"BrtBeginPCDSDTCQuery", */
    T: 1
  },
  238: {
    /* n:"BrtEndPCDSDTCQuery", */
    T: -1
  },
  239: {
    /* n:"BrtBeginPCDSDTCSets", */
    T: 1
  },
  240: {
    /* n:"BrtEndPCDSDTCSets", */
    T: -1
  },
  241: {
    /* n:"BrtBeginPCDSDTCSet", */
    T: 1
  },
  242: {
    /* n:"BrtEndPCDSDTCSet", */
    T: -1
  },
  243: {
    /* n:"BrtBeginPCDCalcItems", */
    T: 1
  },
  244: {
    /* n:"BrtEndPCDCalcItems", */
    T: -1
  },
  245: {
    /* n:"BrtBeginPCDCalcItem", */
    T: 1
  },
  246: {
    /* n:"BrtEndPCDCalcItem", */
    T: -1
  },
  247: {
    /* n:"BrtBeginPRule", */
    T: 1
  },
  248: {
    /* n:"BrtEndPRule", */
    T: -1
  },
  249: {
    /* n:"BrtBeginPRFilters", */
    T: 1
  },
  250: {
    /* n:"BrtEndPRFilters", */
    T: -1
  },
  251: {
    /* n:"BrtBeginPRFilter", */
    T: 1
  },
  252: {
    /* n:"BrtEndPRFilter", */
    T: -1
  },
  253: {
    /* n:"BrtBeginPNames", */
    T: 1
  },
  254: {
    /* n:"BrtEndPNames", */
    T: -1
  },
  255: {
    /* n:"BrtBeginPName", */
    T: 1
  },
  256: {
    /* n:"BrtEndPName", */
    T: -1
  },
  257: {
    /* n:"BrtBeginPNPairs", */
    T: 1
  },
  258: {
    /* n:"BrtEndPNPairs", */
    T: -1
  },
  259: {
    /* n:"BrtBeginPNPair", */
    T: 1
  },
  260: {
    /* n:"BrtEndPNPair", */
    T: -1
  },
  261: {
    /* n:"BrtBeginECWebProps", */
    T: 1
  },
  262: {
    /* n:"BrtEndECWebProps", */
    T: -1
  },
  263: {
    /* n:"BrtBeginEcWpTables", */
    T: 1
  },
  264: {
    /* n:"BrtEndECWPTables", */
    T: -1
  },
  265: {
    /* n:"BrtBeginECParams", */
    T: 1
  },
  266: {
    /* n:"BrtEndECParams", */
    T: -1
  },
  267: {
    /* n:"BrtBeginECParam", */
    T: 1
  },
  268: {
    /* n:"BrtEndECParam", */
    T: -1
  },
  269: {
    /* n:"BrtBeginPCDKPIs", */
    T: 1
  },
  270: {
    /* n:"BrtEndPCDKPIs", */
    T: -1
  },
  271: {
    /* n:"BrtBeginPCDKPI", */
    T: 1
  },
  272: {
    /* n:"BrtEndPCDKPI", */
    T: -1
  },
  273: {
    /* n:"BrtBeginDims", */
    T: 1
  },
  274: {
    /* n:"BrtEndDims", */
    T: -1
  },
  275: {
    /* n:"BrtBeginDim", */
    T: 1
  },
  276: {
    /* n:"BrtEndDim", */
    T: -1
  },
  277: {
    /* n:"BrtIndexPartEnd" */
  },
  278: {
    /* n:"BrtBeginStyleSheet", */
    T: 1
  },
  279: {
    /* n:"BrtEndStyleSheet", */
    T: -1
  },
  280: {
    /* n:"BrtBeginSXView", */
    T: 1
  },
  281: {
    /* n:"BrtEndSXVI", */
    T: -1
  },
  282: {
    /* n:"BrtBeginSXVI", */
    T: 1
  },
  283: {
    /* n:"BrtBeginSXVIs", */
    T: 1
  },
  284: {
    /* n:"BrtEndSXVIs", */
    T: -1
  },
  285: {
    /* n:"BrtBeginSXVD", */
    T: 1
  },
  286: {
    /* n:"BrtEndSXVD", */
    T: -1
  },
  287: {
    /* n:"BrtBeginSXVDs", */
    T: 1
  },
  288: {
    /* n:"BrtEndSXVDs", */
    T: -1
  },
  289: {
    /* n:"BrtBeginSXPI", */
    T: 1
  },
  290: {
    /* n:"BrtEndSXPI", */
    T: -1
  },
  291: {
    /* n:"BrtBeginSXPIs", */
    T: 1
  },
  292: {
    /* n:"BrtEndSXPIs", */
    T: -1
  },
  293: {
    /* n:"BrtBeginSXDI", */
    T: 1
  },
  294: {
    /* n:"BrtEndSXDI", */
    T: -1
  },
  295: {
    /* n:"BrtBeginSXDIs", */
    T: 1
  },
  296: {
    /* n:"BrtEndSXDIs", */
    T: -1
  },
  297: {
    /* n:"BrtBeginSXLI", */
    T: 1
  },
  298: {
    /* n:"BrtEndSXLI", */
    T: -1
  },
  299: {
    /* n:"BrtBeginSXLIRws", */
    T: 1
  },
  300: {
    /* n:"BrtEndSXLIRws", */
    T: -1
  },
  301: {
    /* n:"BrtBeginSXLICols", */
    T: 1
  },
  302: {
    /* n:"BrtEndSXLICols", */
    T: -1
  },
  303: {
    /* n:"BrtBeginSXFormat", */
    T: 1
  },
  304: {
    /* n:"BrtEndSXFormat", */
    T: -1
  },
  305: {
    /* n:"BrtBeginSXFormats", */
    T: 1
  },
  306: {
    /* n:"BrtEndSxFormats", */
    T: -1
  },
  307: {
    /* n:"BrtBeginSxSelect", */
    T: 1
  },
  308: {
    /* n:"BrtEndSxSelect", */
    T: -1
  },
  309: {
    /* n:"BrtBeginISXVDRws", */
    T: 1
  },
  310: {
    /* n:"BrtEndISXVDRws", */
    T: -1
  },
  311: {
    /* n:"BrtBeginISXVDCols", */
    T: 1
  },
  312: {
    /* n:"BrtEndISXVDCols", */
    T: -1
  },
  313: {
    /* n:"BrtEndSXLocation", */
    T: -1
  },
  314: {
    /* n:"BrtBeginSXLocation", */
    T: 1
  },
  315: {
    /* n:"BrtEndSXView", */
    T: -1
  },
  316: {
    /* n:"BrtBeginSXTHs", */
    T: 1
  },
  317: {
    /* n:"BrtEndSXTHs", */
    T: -1
  },
  318: {
    /* n:"BrtBeginSXTH", */
    T: 1
  },
  319: {
    /* n:"BrtEndSXTH", */
    T: -1
  },
  320: {
    /* n:"BrtBeginISXTHRws", */
    T: 1
  },
  321: {
    /* n:"BrtEndISXTHRws", */
    T: -1
  },
  322: {
    /* n:"BrtBeginISXTHCols", */
    T: 1
  },
  323: {
    /* n:"BrtEndISXTHCols", */
    T: -1
  },
  324: {
    /* n:"BrtBeginSXTDMPS", */
    T: 1
  },
  325: {
    /* n:"BrtEndSXTDMPs", */
    T: -1
  },
  326: {
    /* n:"BrtBeginSXTDMP", */
    T: 1
  },
  327: {
    /* n:"BrtEndSXTDMP", */
    T: -1
  },
  328: {
    /* n:"BrtBeginSXTHItems", */
    T: 1
  },
  329: {
    /* n:"BrtEndSXTHItems", */
    T: -1
  },
  330: {
    /* n:"BrtBeginSXTHItem", */
    T: 1
  },
  331: {
    /* n:"BrtEndSXTHItem", */
    T: -1
  },
  332: {
    /* n:"BrtBeginMetadata", */
    T: 1
  },
  333: {
    /* n:"BrtEndMetadata", */
    T: -1
  },
  334: {
    /* n:"BrtBeginEsmdtinfo", */
    T: 1
  },
  335: {
    /* n:"BrtMdtinfo", */
    f: H1
  },
  336: {
    /* n:"BrtEndEsmdtinfo", */
    T: -1
  },
  337: {
    /* n:"BrtBeginEsmdb", */
    f: V1,
    T: 1
  },
  338: {
    /* n:"BrtEndEsmdb", */
    T: -1
  },
  339: {
    /* n:"BrtBeginEsfmd", */
    T: 1
  },
  340: {
    /* n:"BrtEndEsfmd", */
    T: -1
  },
  341: {
    /* n:"BrtBeginSingleCells", */
    T: 1
  },
  342: {
    /* n:"BrtEndSingleCells", */
    T: -1
  },
  343: {
    /* n:"BrtBeginList", */
    T: 1
  },
  344: {
    /* n:"BrtEndList", */
    T: -1
  },
  345: {
    /* n:"BrtBeginListCols", */
    T: 1
  },
  346: {
    /* n:"BrtEndListCols", */
    T: -1
  },
  347: {
    /* n:"BrtBeginListCol", */
    T: 1
  },
  348: {
    /* n:"BrtEndListCol", */
    T: -1
  },
  349: {
    /* n:"BrtBeginListXmlCPr", */
    T: 1
  },
  350: {
    /* n:"BrtEndListXmlCPr", */
    T: -1
  },
  351: {
    /* n:"BrtListCCFmla" */
  },
  352: {
    /* n:"BrtListTrFmla" */
  },
  353: {
    /* n:"BrtBeginExternals", */
    T: 1
  },
  354: {
    /* n:"BrtEndExternals", */
    T: -1
  },
  355: {
    /* n:"BrtSupBookSrc", */
    f: bn
  },
  357: {
    /* n:"BrtSupSelf" */
  },
  358: {
    /* n:"BrtSupSame" */
  },
  359: {
    /* n:"BrtSupTabs" */
  },
  360: {
    /* n:"BrtBeginSupBook", */
    T: 1
  },
  361: {
    /* n:"BrtPlaceholderName" */
  },
  362: {
    /* n:"BrtExternSheet", */
    f: Pi
  },
  363: {
    /* n:"BrtExternTableStart" */
  },
  364: {
    /* n:"BrtExternTableEnd" */
  },
  366: {
    /* n:"BrtExternRowHdr" */
  },
  367: {
    /* n:"BrtExternCellBlank" */
  },
  368: {
    /* n:"BrtExternCellReal" */
  },
  369: {
    /* n:"BrtExternCellBool" */
  },
  370: {
    /* n:"BrtExternCellError" */
  },
  371: {
    /* n:"BrtExternCellString" */
  },
  372: {
    /* n:"BrtBeginEsmdx", */
    T: 1
  },
  373: {
    /* n:"BrtEndEsmdx", */
    T: -1
  },
  374: {
    /* n:"BrtBeginMdxSet", */
    T: 1
  },
  375: {
    /* n:"BrtEndMdxSet", */
    T: -1
  },
  376: {
    /* n:"BrtBeginMdxMbrProp", */
    T: 1
  },
  377: {
    /* n:"BrtEndMdxMbrProp", */
    T: -1
  },
  378: {
    /* n:"BrtBeginMdxKPI", */
    T: 1
  },
  379: {
    /* n:"BrtEndMdxKPI", */
    T: -1
  },
  380: {
    /* n:"BrtBeginEsstr", */
    T: 1
  },
  381: {
    /* n:"BrtEndEsstr", */
    T: -1
  },
  382: {
    /* n:"BrtBeginPRFItem", */
    T: 1
  },
  383: {
    /* n:"BrtEndPRFItem", */
    T: -1
  },
  384: {
    /* n:"BrtBeginPivotCacheIDs", */
    T: 1
  },
  385: {
    /* n:"BrtEndPivotCacheIDs", */
    T: -1
  },
  386: {
    /* n:"BrtBeginPivotCacheID", */
    T: 1
  },
  387: {
    /* n:"BrtEndPivotCacheID", */
    T: -1
  },
  388: {
    /* n:"BrtBeginISXVIs", */
    T: 1
  },
  389: {
    /* n:"BrtEndISXVIs", */
    T: -1
  },
  390: {
    /* n:"BrtBeginColInfos", */
    T: 1
  },
  391: {
    /* n:"BrtEndColInfos", */
    T: -1
  },
  392: {
    /* n:"BrtBeginRwBrk", */
    T: 1
  },
  393: {
    /* n:"BrtEndRwBrk", */
    T: -1
  },
  394: {
    /* n:"BrtBeginColBrk", */
    T: 1
  },
  395: {
    /* n:"BrtEndColBrk", */
    T: -1
  },
  396: {
    /* n:"BrtBrk" */
  },
  397: {
    /* n:"BrtUserBookView" */
  },
  398: {
    /* n:"BrtInfo" */
  },
  399: {
    /* n:"BrtCUsr" */
  },
  400: {
    /* n:"BrtUsr" */
  },
  401: {
    /* n:"BrtBeginUsers", */
    T: 1
  },
  403: {
    /* n:"BrtEOF" */
  },
  404: {
    /* n:"BrtUCR" */
  },
  405: {
    /* n:"BrtRRInsDel" */
  },
  406: {
    /* n:"BrtRREndInsDel" */
  },
  407: {
    /* n:"BrtRRMove" */
  },
  408: {
    /* n:"BrtRREndMove" */
  },
  409: {
    /* n:"BrtRRChgCell" */
  },
  410: {
    /* n:"BrtRREndChgCell" */
  },
  411: {
    /* n:"BrtRRHeader" */
  },
  412: {
    /* n:"BrtRRUserView" */
  },
  413: {
    /* n:"BrtRRRenSheet" */
  },
  414: {
    /* n:"BrtRRInsertSh" */
  },
  415: {
    /* n:"BrtRRDefName" */
  },
  416: {
    /* n:"BrtRRNote" */
  },
  417: {
    /* n:"BrtRRConflict" */
  },
  418: {
    /* n:"BrtRRTQSIF" */
  },
  419: {
    /* n:"BrtRRFormat" */
  },
  420: {
    /* n:"BrtRREndFormat" */
  },
  421: {
    /* n:"BrtRRAutoFmt" */
  },
  422: {
    /* n:"BrtBeginUserShViews", */
    T: 1
  },
  423: {
    /* n:"BrtBeginUserShView", */
    T: 1
  },
  424: {
    /* n:"BrtEndUserShView", */
    T: -1
  },
  425: {
    /* n:"BrtEndUserShViews", */
    T: -1
  },
  426: {
    /* n:"BrtArrFmla", */
    f: Ep
  },
  427: {
    /* n:"BrtShrFmla", */
    f: wp
  },
  428: {
    /* n:"BrtTable" */
  },
  429: {
    /* n:"BrtBeginExtConnections", */
    T: 1
  },
  430: {
    /* n:"BrtEndExtConnections", */
    T: -1
  },
  431: {
    /* n:"BrtBeginPCDCalcMems", */
    T: 1
  },
  432: {
    /* n:"BrtEndPCDCalcMems", */
    T: -1
  },
  433: {
    /* n:"BrtBeginPCDCalcMem", */
    T: 1
  },
  434: {
    /* n:"BrtEndPCDCalcMem", */
    T: -1
  },
  435: {
    /* n:"BrtBeginPCDHGLevels", */
    T: 1
  },
  436: {
    /* n:"BrtEndPCDHGLevels", */
    T: -1
  },
  437: {
    /* n:"BrtBeginPCDHGLevel", */
    T: 1
  },
  438: {
    /* n:"BrtEndPCDHGLevel", */
    T: -1
  },
  439: {
    /* n:"BrtBeginPCDHGLGroups", */
    T: 1
  },
  440: {
    /* n:"BrtEndPCDHGLGroups", */
    T: -1
  },
  441: {
    /* n:"BrtBeginPCDHGLGroup", */
    T: 1
  },
  442: {
    /* n:"BrtEndPCDHGLGroup", */
    T: -1
  },
  443: {
    /* n:"BrtBeginPCDHGLGMembers", */
    T: 1
  },
  444: {
    /* n:"BrtEndPCDHGLGMembers", */
    T: -1
  },
  445: {
    /* n:"BrtBeginPCDHGLGMember", */
    T: 1
  },
  446: {
    /* n:"BrtEndPCDHGLGMember", */
    T: -1
  },
  447: {
    /* n:"BrtBeginQSI", */
    T: 1
  },
  448: {
    /* n:"BrtEndQSI", */
    T: -1
  },
  449: {
    /* n:"BrtBeginQSIR", */
    T: 1
  },
  450: {
    /* n:"BrtEndQSIR", */
    T: -1
  },
  451: {
    /* n:"BrtBeginDeletedNames", */
    T: 1
  },
  452: {
    /* n:"BrtEndDeletedNames", */
    T: -1
  },
  453: {
    /* n:"BrtBeginDeletedName", */
    T: 1
  },
  454: {
    /* n:"BrtEndDeletedName", */
    T: -1
  },
  455: {
    /* n:"BrtBeginQSIFs", */
    T: 1
  },
  456: {
    /* n:"BrtEndQSIFs", */
    T: -1
  },
  457: {
    /* n:"BrtBeginQSIF", */
    T: 1
  },
  458: {
    /* n:"BrtEndQSIF", */
    T: -1
  },
  459: {
    /* n:"BrtBeginAutoSortScope", */
    T: 1
  },
  460: {
    /* n:"BrtEndAutoSortScope", */
    T: -1
  },
  461: {
    /* n:"BrtBeginConditionalFormatting", */
    T: 1
  },
  462: {
    /* n:"BrtEndConditionalFormatting", */
    T: -1
  },
  463: {
    /* n:"BrtBeginCFRule", */
    T: 1
  },
  464: {
    /* n:"BrtEndCFRule", */
    T: -1
  },
  465: {
    /* n:"BrtBeginIconSet", */
    T: 1
  },
  466: {
    /* n:"BrtEndIconSet", */
    T: -1
  },
  467: {
    /* n:"BrtBeginDatabar", */
    T: 1
  },
  468: {
    /* n:"BrtEndDatabar", */
    T: -1
  },
  469: {
    /* n:"BrtBeginColorScale", */
    T: 1
  },
  470: {
    /* n:"BrtEndColorScale", */
    T: -1
  },
  471: {
    /* n:"BrtCFVO" */
  },
  472: {
    /* n:"BrtExternValueMeta" */
  },
  473: {
    /* n:"BrtBeginColorPalette", */
    T: 1
  },
  474: {
    /* n:"BrtEndColorPalette", */
    T: -1
  },
  475: {
    /* n:"BrtIndexedColor" */
  },
  476: {
    /* n:"BrtMargins", */
    f: Ap
  },
  477: {
    /* n:"BrtPrintOptions" */
  },
  478: {
    /* n:"BrtPageSetup" */
  },
  479: {
    /* n:"BrtBeginHeaderFooter", */
    T: 1
  },
  480: {
    /* n:"BrtEndHeaderFooter", */
    T: -1
  },
  481: {
    /* n:"BrtBeginSXCrtFormat", */
    T: 1
  },
  482: {
    /* n:"BrtEndSXCrtFormat", */
    T: -1
  },
  483: {
    /* n:"BrtBeginSXCrtFormats", */
    T: 1
  },
  484: {
    /* n:"BrtEndSXCrtFormats", */
    T: -1
  },
  485: {
    /* n:"BrtWsFmtInfo", */
    f: qx
  },
  486: {
    /* n:"BrtBeginMgs", */
    T: 1
  },
  487: {
    /* n:"BrtEndMGs", */
    T: -1
  },
  488: {
    /* n:"BrtBeginMGMaps", */
    T: 1
  },
  489: {
    /* n:"BrtEndMGMaps", */
    T: -1
  },
  490: {
    /* n:"BrtBeginMG", */
    T: 1
  },
  491: {
    /* n:"BrtEndMG", */
    T: -1
  },
  492: {
    /* n:"BrtBeginMap", */
    T: 1
  },
  493: {
    /* n:"BrtEndMap", */
    T: -1
  },
  494: {
    /* n:"BrtHLink", */
    f: kp
  },
  495: {
    /* n:"BrtBeginDCon", */
    T: 1
  },
  496: {
    /* n:"BrtEndDCon", */
    T: -1
  },
  497: {
    /* n:"BrtBeginDRefs", */
    T: 1
  },
  498: {
    /* n:"BrtEndDRefs", */
    T: -1
  },
  499: {
    /* n:"BrtDRef" */
  },
  500: {
    /* n:"BrtBeginScenMan", */
    T: 1
  },
  501: {
    /* n:"BrtEndScenMan", */
    T: -1
  },
  502: {
    /* n:"BrtBeginSct", */
    T: 1
  },
  503: {
    /* n:"BrtEndSct", */
    T: -1
  },
  504: {
    /* n:"BrtSlc" */
  },
  505: {
    /* n:"BrtBeginDXFs", */
    T: 1
  },
  506: {
    /* n:"BrtEndDXFs", */
    T: -1
  },
  507: {
    /* n:"BrtDXF" */
  },
  508: {
    /* n:"BrtBeginTableStyles", */
    T: 1
  },
  509: {
    /* n:"BrtEndTableStyles", */
    T: -1
  },
  510: {
    /* n:"BrtBeginTableStyle", */
    T: 1
  },
  511: {
    /* n:"BrtEndTableStyle", */
    T: -1
  },
  512: {
    /* n:"BrtTableStyleElement" */
  },
  513: {
    /* n:"BrtTableStyleClient" */
  },
  514: {
    /* n:"BrtBeginVolDeps", */
    T: 1
  },
  515: {
    /* n:"BrtEndVolDeps", */
    T: -1
  },
  516: {
    /* n:"BrtBeginVolType", */
    T: 1
  },
  517: {
    /* n:"BrtEndVolType", */
    T: -1
  },
  518: {
    /* n:"BrtBeginVolMain", */
    T: 1
  },
  519: {
    /* n:"BrtEndVolMain", */
    T: -1
  },
  520: {
    /* n:"BrtBeginVolTopic", */
    T: 1
  },
  521: {
    /* n:"BrtEndVolTopic", */
    T: -1
  },
  522: {
    /* n:"BrtVolSubtopic" */
  },
  523: {
    /* n:"BrtVolRef" */
  },
  524: {
    /* n:"BrtVolNum" */
  },
  525: {
    /* n:"BrtVolErr" */
  },
  526: {
    /* n:"BrtVolStr" */
  },
  527: {
    /* n:"BrtVolBool" */
  },
  528: {
    /* n:"BrtBeginCalcChain$", */
    T: 1
  },
  529: {
    /* n:"BrtEndCalcChain$", */
    T: -1
  },
  530: {
    /* n:"BrtBeginSortState", */
    T: 1
  },
  531: {
    /* n:"BrtEndSortState", */
    T: -1
  },
  532: {
    /* n:"BrtBeginSortCond", */
    T: 1
  },
  533: {
    /* n:"BrtEndSortCond", */
    T: -1
  },
  534: {
    /* n:"BrtBookProtection" */
  },
  535: {
    /* n:"BrtSheetProtection" */
  },
  536: {
    /* n:"BrtRangeProtection" */
  },
  537: {
    /* n:"BrtPhoneticInfo" */
  },
  538: {
    /* n:"BrtBeginECTxtWiz", */
    T: 1
  },
  539: {
    /* n:"BrtEndECTxtWiz", */
    T: -1
  },
  540: {
    /* n:"BrtBeginECTWFldInfoLst", */
    T: 1
  },
  541: {
    /* n:"BrtEndECTWFldInfoLst", */
    T: -1
  },
  542: {
    /* n:"BrtBeginECTwFldInfo", */
    T: 1
  },
  548: {
    /* n:"BrtFileSharing" */
  },
  549: {
    /* n:"BrtOleSize" */
  },
  550: {
    /* n:"BrtDrawing", */
    f: bn
  },
  551: {
    /* n:"BrtLegacyDrawing", */
    f: sn
  },
  552: {
    /* n:"BrtLegacyDrawingHF" */
  },
  553: {
    /* n:"BrtWebOpt" */
  },
  554: {
    /* n:"BrtBeginWebPubItems", */
    T: 1
  },
  555: {
    /* n:"BrtEndWebPubItems", */
    T: -1
  },
  556: {
    /* n:"BrtBeginWebPubItem", */
    T: 1
  },
  557: {
    /* n:"BrtEndWebPubItem", */
    T: -1
  },
  558: {
    /* n:"BrtBeginSXCondFmt", */
    T: 1
  },
  559: {
    /* n:"BrtEndSXCondFmt", */
    T: -1
  },
  560: {
    /* n:"BrtBeginSXCondFmts", */
    T: 1
  },
  561: {
    /* n:"BrtEndSXCondFmts", */
    T: -1
  },
  562: {
    /* n:"BrtBkHim" */
  },
  564: {
    /* n:"BrtColor" */
  },
  565: {
    /* n:"BrtBeginIndexedColors", */
    T: 1
  },
  566: {
    /* n:"BrtEndIndexedColors", */
    T: -1
  },
  569: {
    /* n:"BrtBeginMRUColors", */
    T: 1
  },
  570: {
    /* n:"BrtEndMRUColors", */
    T: -1
  },
  572: {
    /* n:"BrtMRUColor" */
  },
  573: {
    /* n:"BrtBeginDVals", */
    T: 1
  },
  574: {
    /* n:"BrtEndDVals", */
    T: -1
  },
  577: {
    /* n:"BrtSupNameStart" */
  },
  578: {
    /* n:"BrtSupNameValueStart" */
  },
  579: {
    /* n:"BrtSupNameValueEnd" */
  },
  580: {
    /* n:"BrtSupNameNum" */
  },
  581: {
    /* n:"BrtSupNameErr" */
  },
  582: {
    /* n:"BrtSupNameSt" */
  },
  583: {
    /* n:"BrtSupNameNil" */
  },
  584: {
    /* n:"BrtSupNameBool" */
  },
  585: {
    /* n:"BrtSupNameFmla" */
  },
  586: {
    /* n:"BrtSupNameBits" */
  },
  587: {
    /* n:"BrtSupNameEnd" */
  },
  588: {
    /* n:"BrtEndSupBook", */
    T: -1
  },
  589: {
    /* n:"BrtCellSmartTagProperty" */
  },
  590: {
    /* n:"BrtBeginCellSmartTag", */
    T: 1
  },
  591: {
    /* n:"BrtEndCellSmartTag", */
    T: -1
  },
  592: {
    /* n:"BrtBeginCellSmartTags", */
    T: 1
  },
  593: {
    /* n:"BrtEndCellSmartTags", */
    T: -1
  },
  594: {
    /* n:"BrtBeginSmartTags", */
    T: 1
  },
  595: {
    /* n:"BrtEndSmartTags", */
    T: -1
  },
  596: {
    /* n:"BrtSmartTagType" */
  },
  597: {
    /* n:"BrtBeginSmartTagTypes", */
    T: 1
  },
  598: {
    /* n:"BrtEndSmartTagTypes", */
    T: -1
  },
  599: {
    /* n:"BrtBeginSXFilters", */
    T: 1
  },
  600: {
    /* n:"BrtEndSXFilters", */
    T: -1
  },
  601: {
    /* n:"BrtBeginSXFILTER", */
    T: 1
  },
  602: {
    /* n:"BrtEndSXFilter", */
    T: -1
  },
  603: {
    /* n:"BrtBeginFills", */
    T: 1
  },
  604: {
    /* n:"BrtEndFills", */
    T: -1
  },
  605: {
    /* n:"BrtBeginCellWatches", */
    T: 1
  },
  606: {
    /* n:"BrtEndCellWatches", */
    T: -1
  },
  607: {
    /* n:"BrtCellWatch" */
  },
  608: {
    /* n:"BrtBeginCRErrs", */
    T: 1
  },
  609: {
    /* n:"BrtEndCRErrs", */
    T: -1
  },
  610: {
    /* n:"BrtCrashRecErr" */
  },
  611: {
    /* n:"BrtBeginFonts", */
    T: 1
  },
  612: {
    /* n:"BrtEndFonts", */
    T: -1
  },
  613: {
    /* n:"BrtBeginBorders", */
    T: 1
  },
  614: {
    /* n:"BrtEndBorders", */
    T: -1
  },
  615: {
    /* n:"BrtBeginFmts", */
    T: 1
  },
  616: {
    /* n:"BrtEndFmts", */
    T: -1
  },
  617: {
    /* n:"BrtBeginCellXFs", */
    T: 1
  },
  618: {
    /* n:"BrtEndCellXFs", */
    T: -1
  },
  619: {
    /* n:"BrtBeginStyles", */
    T: 1
  },
  620: {
    /* n:"BrtEndStyles", */
    T: -1
  },
  625: {
    /* n:"BrtBigName" */
  },
  626: {
    /* n:"BrtBeginCellStyleXFs", */
    T: 1
  },
  627: {
    /* n:"BrtEndCellStyleXFs", */
    T: -1
  },
  628: {
    /* n:"BrtBeginComments", */
    T: 1
  },
  629: {
    /* n:"BrtEndComments", */
    T: -1
  },
  630: {
    /* n:"BrtBeginCommentAuthors", */
    T: 1
  },
  631: {
    /* n:"BrtEndCommentAuthors", */
    T: -1
  },
  632: {
    /* n:"BrtCommentAuthor", */
    f: rd
  },
  633: {
    /* n:"BrtBeginCommentList", */
    T: 1
  },
  634: {
    /* n:"BrtEndCommentList", */
    T: -1
  },
  635: {
    /* n:"BrtBeginComment", */
    T: 1,
    f: ed
  },
  636: {
    /* n:"BrtEndComment", */
    T: -1
  },
  637: {
    /* n:"BrtCommentText", */
    f: Sl
  },
  638: {
    /* n:"BrtBeginOleObjects", */
    T: 1
  },
  639: {
    /* n:"BrtOleObject" */
  },
  640: {
    /* n:"BrtEndOleObjects", */
    T: -1
  },
  641: {
    /* n:"BrtBeginSxrules", */
    T: 1
  },
  642: {
    /* n:"BrtEndSxRules", */
    T: -1
  },
  643: {
    /* n:"BrtBeginActiveXControls", */
    T: 1
  },
  644: {
    /* n:"BrtActiveX" */
  },
  645: {
    /* n:"BrtEndActiveXControls", */
    T: -1
  },
  646: {
    /* n:"BrtBeginPCDSDTCEMembersSortBy", */
    T: 1
  },
  648: {
    /* n:"BrtBeginCellIgnoreECs", */
    T: 1
  },
  649: {
    /* n:"BrtCellIgnoreEC" */
  },
  650: {
    /* n:"BrtEndCellIgnoreECs", */
    T: -1
  },
  651: {
    /* n:"BrtCsProp", */
    f: Dp
  },
  652: {
    /* n:"BrtCsPageSetup" */
  },
  653: {
    /* n:"BrtBeginUserCsViews", */
    T: 1
  },
  654: {
    /* n:"BrtEndUserCsViews", */
    T: -1
  },
  655: {
    /* n:"BrtBeginUserCsView", */
    T: 1
  },
  656: {
    /* n:"BrtEndUserCsView", */
    T: -1
  },
  657: {
    /* n:"BrtBeginPcdSFCIEntries", */
    T: 1
  },
  658: {
    /* n:"BrtEndPCDSFCIEntries", */
    T: -1
  },
  659: {
    /* n:"BrtPCDSFCIEntry" */
  },
  660: {
    /* n:"BrtBeginListParts", */
    T: 1
  },
  661: {
    /* n:"BrtListPart" */
  },
  662: {
    /* n:"BrtEndListParts", */
    T: -1
  },
  663: {
    /* n:"BrtSheetCalcProp" */
  },
  664: {
    /* n:"BrtBeginFnGroup", */
    T: 1
  },
  665: {
    /* n:"BrtFnGroup" */
  },
  666: {
    /* n:"BrtEndFnGroup", */
    T: -1
  },
  667: {
    /* n:"BrtSupAddin" */
  },
  668: {
    /* n:"BrtSXTDMPOrder" */
  },
  669: {
    /* n:"BrtCsProtection" */
  },
  671: {
    /* n:"BrtBeginWsSortMap", */
    T: 1
  },
  672: {
    /* n:"BrtEndWsSortMap", */
    T: -1
  },
  673: {
    /* n:"BrtBeginRRSort", */
    T: 1
  },
  674: {
    /* n:"BrtEndRRSort", */
    T: -1
  },
  675: {
    /* n:"BrtRRSortItem" */
  },
  676: {
    /* n:"BrtFileSharingIso" */
  },
  677: {
    /* n:"BrtBookProtectionIso" */
  },
  678: {
    /* n:"BrtSheetProtectionIso" */
  },
  679: {
    /* n:"BrtCsProtectionIso" */
  },
  680: {
    /* n:"BrtRangeProtectionIso" */
  },
  681: {
    /* n:"BrtDValList" */
  },
  1024: {
    /* n:"BrtRwDescent" */
  },
  1025: {
    /* n:"BrtKnownFonts" */
  },
  1026: {
    /* n:"BrtBeginSXTupleSet", */
    T: 1
  },
  1027: {
    /* n:"BrtEndSXTupleSet", */
    T: -1
  },
  1028: {
    /* n:"BrtBeginSXTupleSetHeader", */
    T: 1
  },
  1029: {
    /* n:"BrtEndSXTupleSetHeader", */
    T: -1
  },
  1030: {
    /* n:"BrtSXTupleSetHeaderItem" */
  },
  1031: {
    /* n:"BrtBeginSXTupleSetData", */
    T: 1
  },
  1032: {
    /* n:"BrtEndSXTupleSetData", */
    T: -1
  },
  1033: {
    /* n:"BrtBeginSXTupleSetRow", */
    T: 1
  },
  1034: {
    /* n:"BrtEndSXTupleSetRow", */
    T: -1
  },
  1035: {
    /* n:"BrtSXTupleSetRowItem" */
  },
  1036: {
    /* n:"BrtNameExt" */
  },
  1037: {
    /* n:"BrtPCDH14" */
  },
  1038: {
    /* n:"BrtBeginPCDCalcMem14", */
    T: 1
  },
  1039: {
    /* n:"BrtEndPCDCalcMem14", */
    T: -1
  },
  1040: {
    /* n:"BrtSXTH14" */
  },
  1041: {
    /* n:"BrtBeginSparklineGroup", */
    T: 1
  },
  1042: {
    /* n:"BrtEndSparklineGroup", */
    T: -1
  },
  1043: {
    /* n:"BrtSparkline" */
  },
  1044: {
    /* n:"BrtSXDI14" */
  },
  1045: {
    /* n:"BrtWsFmtInfoEx14" */
  },
  1046: {
    /* n:"BrtBeginConditionalFormatting14", */
    T: 1
  },
  1047: {
    /* n:"BrtEndConditionalFormatting14", */
    T: -1
  },
  1048: {
    /* n:"BrtBeginCFRule14", */
    T: 1
  },
  1049: {
    /* n:"BrtEndCFRule14", */
    T: -1
  },
  1050: {
    /* n:"BrtCFVO14" */
  },
  1051: {
    /* n:"BrtBeginDatabar14", */
    T: 1
  },
  1052: {
    /* n:"BrtBeginIconSet14", */
    T: 1
  },
  1053: {
    /* n:"BrtDVal14", */
    f: yp
  },
  1054: {
    /* n:"BrtBeginDVals14", */
    T: 1
  },
  1055: {
    /* n:"BrtColor14" */
  },
  1056: {
    /* n:"BrtBeginSparklines", */
    T: 1
  },
  1057: {
    /* n:"BrtEndSparklines", */
    T: -1
  },
  1058: {
    /* n:"BrtBeginSparklineGroups", */
    T: 1
  },
  1059: {
    /* n:"BrtEndSparklineGroups", */
    T: -1
  },
  1061: {
    /* n:"BrtSXVD14" */
  },
  1062: {
    /* n:"BrtBeginSXView14", */
    T: 1
  },
  1063: {
    /* n:"BrtEndSXView14", */
    T: -1
  },
  1064: {
    /* n:"BrtBeginSXView16", */
    T: 1
  },
  1065: {
    /* n:"BrtEndSXView16", */
    T: -1
  },
  1066: {
    /* n:"BrtBeginPCD14", */
    T: 1
  },
  1067: {
    /* n:"BrtEndPCD14", */
    T: -1
  },
  1068: {
    /* n:"BrtBeginExtConn14", */
    T: 1
  },
  1069: {
    /* n:"BrtEndExtConn14", */
    T: -1
  },
  1070: {
    /* n:"BrtBeginSlicerCacheIDs", */
    T: 1
  },
  1071: {
    /* n:"BrtEndSlicerCacheIDs", */
    T: -1
  },
  1072: {
    /* n:"BrtBeginSlicerCacheID", */
    T: 1
  },
  1073: {
    /* n:"BrtEndSlicerCacheID", */
    T: -1
  },
  1075: {
    /* n:"BrtBeginSlicerCache", */
    T: 1
  },
  1076: {
    /* n:"BrtEndSlicerCache", */
    T: -1
  },
  1077: {
    /* n:"BrtBeginSlicerCacheDef", */
    T: 1
  },
  1078: {
    /* n:"BrtEndSlicerCacheDef", */
    T: -1
  },
  1079: {
    /* n:"BrtBeginSlicersEx", */
    T: 1
  },
  1080: {
    /* n:"BrtEndSlicersEx", */
    T: -1
  },
  1081: {
    /* n:"BrtBeginSlicerEx", */
    T: 1
  },
  1082: {
    /* n:"BrtEndSlicerEx", */
    T: -1
  },
  1083: {
    /* n:"BrtBeginSlicer", */
    T: 1
  },
  1084: {
    /* n:"BrtEndSlicer", */
    T: -1
  },
  1085: {
    /* n:"BrtSlicerCachePivotTables" */
  },
  1086: {
    /* n:"BrtBeginSlicerCacheOlapImpl", */
    T: 1
  },
  1087: {
    /* n:"BrtEndSlicerCacheOlapImpl", */
    T: -1
  },
  1088: {
    /* n:"BrtBeginSlicerCacheLevelsData", */
    T: 1
  },
  1089: {
    /* n:"BrtEndSlicerCacheLevelsData", */
    T: -1
  },
  1090: {
    /* n:"BrtBeginSlicerCacheLevelData", */
    T: 1
  },
  1091: {
    /* n:"BrtEndSlicerCacheLevelData", */
    T: -1
  },
  1092: {
    /* n:"BrtBeginSlicerCacheSiRanges", */
    T: 1
  },
  1093: {
    /* n:"BrtEndSlicerCacheSiRanges", */
    T: -1
  },
  1094: {
    /* n:"BrtBeginSlicerCacheSiRange", */
    T: 1
  },
  1095: {
    /* n:"BrtEndSlicerCacheSiRange", */
    T: -1
  },
  1096: {
    /* n:"BrtSlicerCacheOlapItem" */
  },
  1097: {
    /* n:"BrtBeginSlicerCacheSelections", */
    T: 1
  },
  1098: {
    /* n:"BrtSlicerCacheSelection" */
  },
  1099: {
    /* n:"BrtEndSlicerCacheSelections", */
    T: -1
  },
  1100: {
    /* n:"BrtBeginSlicerCacheNative", */
    T: 1
  },
  1101: {
    /* n:"BrtEndSlicerCacheNative", */
    T: -1
  },
  1102: {
    /* n:"BrtSlicerCacheNativeItem" */
  },
  1103: {
    /* n:"BrtRangeProtection14" */
  },
  1104: {
    /* n:"BrtRangeProtectionIso14" */
  },
  1105: {
    /* n:"BrtCellIgnoreEC14" */
  },
  1111: {
    /* n:"BrtList14" */
  },
  1112: {
    /* n:"BrtCFIcon" */
  },
  1113: {
    /* n:"BrtBeginSlicerCachesPivotCacheIDs", */
    T: 1
  },
  1114: {
    /* n:"BrtEndSlicerCachesPivotCacheIDs", */
    T: -1
  },
  1115: {
    /* n:"BrtBeginSlicers", */
    T: 1
  },
  1116: {
    /* n:"BrtEndSlicers", */
    T: -1
  },
  1117: {
    /* n:"BrtWbProp14" */
  },
  1118: {
    /* n:"BrtBeginSXEdit", */
    T: 1
  },
  1119: {
    /* n:"BrtEndSXEdit", */
    T: -1
  },
  1120: {
    /* n:"BrtBeginSXEdits", */
    T: 1
  },
  1121: {
    /* n:"BrtEndSXEdits", */
    T: -1
  },
  1122: {
    /* n:"BrtBeginSXChange", */
    T: 1
  },
  1123: {
    /* n:"BrtEndSXChange", */
    T: -1
  },
  1124: {
    /* n:"BrtBeginSXChanges", */
    T: 1
  },
  1125: {
    /* n:"BrtEndSXChanges", */
    T: -1
  },
  1126: {
    /* n:"BrtSXTupleItems" */
  },
  1128: {
    /* n:"BrtBeginSlicerStyle", */
    T: 1
  },
  1129: {
    /* n:"BrtEndSlicerStyle", */
    T: -1
  },
  1130: {
    /* n:"BrtSlicerStyleElement" */
  },
  1131: {
    /* n:"BrtBeginStyleSheetExt14", */
    T: 1
  },
  1132: {
    /* n:"BrtEndStyleSheetExt14", */
    T: -1
  },
  1133: {
    /* n:"BrtBeginSlicerCachesPivotCacheID", */
    T: 1
  },
  1134: {
    /* n:"BrtEndSlicerCachesPivotCacheID", */
    T: -1
  },
  1135: {
    /* n:"BrtBeginConditionalFormattings", */
    T: 1
  },
  1136: {
    /* n:"BrtEndConditionalFormattings", */
    T: -1
  },
  1137: {
    /* n:"BrtBeginPCDCalcMemExt", */
    T: 1
  },
  1138: {
    /* n:"BrtEndPCDCalcMemExt", */
    T: -1
  },
  1139: {
    /* n:"BrtBeginPCDCalcMemsExt", */
    T: 1
  },
  1140: {
    /* n:"BrtEndPCDCalcMemsExt", */
    T: -1
  },
  1141: {
    /* n:"BrtPCDField14" */
  },
  1142: {
    /* n:"BrtBeginSlicerStyles", */
    T: 1
  },
  1143: {
    /* n:"BrtEndSlicerStyles", */
    T: -1
  },
  1144: {
    /* n:"BrtBeginSlicerStyleElements", */
    T: 1
  },
  1145: {
    /* n:"BrtEndSlicerStyleElements", */
    T: -1
  },
  1146: {
    /* n:"BrtCFRuleExt" */
  },
  1147: {
    /* n:"BrtBeginSXCondFmt14", */
    T: 1
  },
  1148: {
    /* n:"BrtEndSXCondFmt14", */
    T: -1
  },
  1149: {
    /* n:"BrtBeginSXCondFmts14", */
    T: 1
  },
  1150: {
    /* n:"BrtEndSXCondFmts14", */
    T: -1
  },
  1152: {
    /* n:"BrtBeginSortCond14", */
    T: 1
  },
  1153: {
    /* n:"BrtEndSortCond14", */
    T: -1
  },
  1154: {
    /* n:"BrtEndDVals14", */
    T: -1
  },
  1155: {
    /* n:"BrtEndIconSet14", */
    T: -1
  },
  1156: {
    /* n:"BrtEndDatabar14", */
    T: -1
  },
  1157: {
    /* n:"BrtBeginColorScale14", */
    T: 1
  },
  1158: {
    /* n:"BrtEndColorScale14", */
    T: -1
  },
  1159: {
    /* n:"BrtBeginSxrules14", */
    T: 1
  },
  1160: {
    /* n:"BrtEndSxrules14", */
    T: -1
  },
  1161: {
    /* n:"BrtBeginPRule14", */
    T: 1
  },
  1162: {
    /* n:"BrtEndPRule14", */
    T: -1
  },
  1163: {
    /* n:"BrtBeginPRFilters14", */
    T: 1
  },
  1164: {
    /* n:"BrtEndPRFilters14", */
    T: -1
  },
  1165: {
    /* n:"BrtBeginPRFilter14", */
    T: 1
  },
  1166: {
    /* n:"BrtEndPRFilter14", */
    T: -1
  },
  1167: {
    /* n:"BrtBeginPRFItem14", */
    T: 1
  },
  1168: {
    /* n:"BrtEndPRFItem14", */
    T: -1
  },
  1169: {
    /* n:"BrtBeginCellIgnoreECs14", */
    T: 1
  },
  1170: {
    /* n:"BrtEndCellIgnoreECs14", */
    T: -1
  },
  1171: {
    /* n:"BrtDxf14" */
  },
  1172: {
    /* n:"BrtBeginDxF14s", */
    T: 1
  },
  1173: {
    /* n:"BrtEndDxf14s", */
    T: -1
  },
  1177: {
    /* n:"BrtFilter14" */
  },
  1178: {
    /* n:"BrtBeginCustomFilters14", */
    T: 1
  },
  1180: {
    /* n:"BrtCustomFilter14" */
  },
  1181: {
    /* n:"BrtIconFilter14" */
  },
  1182: {
    /* n:"BrtPivotCacheConnectionName" */
  },
  2048: {
    /* n:"BrtBeginDecoupledPivotCacheIDs", */
    T: 1
  },
  2049: {
    /* n:"BrtEndDecoupledPivotCacheIDs", */
    T: -1
  },
  2050: {
    /* n:"BrtDecoupledPivotCacheID" */
  },
  2051: {
    /* n:"BrtBeginPivotTableRefs", */
    T: 1
  },
  2052: {
    /* n:"BrtEndPivotTableRefs", */
    T: -1
  },
  2053: {
    /* n:"BrtPivotTableRef" */
  },
  2054: {
    /* n:"BrtSlicerCacheBookPivotTables" */
  },
  2055: {
    /* n:"BrtBeginSxvcells", */
    T: 1
  },
  2056: {
    /* n:"BrtEndSxvcells", */
    T: -1
  },
  2057: {
    /* n:"BrtBeginSxRow", */
    T: 1
  },
  2058: {
    /* n:"BrtEndSxRow", */
    T: -1
  },
  2060: {
    /* n:"BrtPcdCalcMem15" */
  },
  2067: {
    /* n:"BrtQsi15" */
  },
  2068: {
    /* n:"BrtBeginWebExtensions", */
    T: 1
  },
  2069: {
    /* n:"BrtEndWebExtensions", */
    T: -1
  },
  2070: {
    /* n:"BrtWebExtension" */
  },
  2071: {
    /* n:"BrtAbsPath15" */
  },
  2072: {
    /* n:"BrtBeginPivotTableUISettings", */
    T: 1
  },
  2073: {
    /* n:"BrtEndPivotTableUISettings", */
    T: -1
  },
  2075: {
    /* n:"BrtTableSlicerCacheIDs" */
  },
  2076: {
    /* n:"BrtTableSlicerCacheID" */
  },
  2077: {
    /* n:"BrtBeginTableSlicerCache", */
    T: 1
  },
  2078: {
    /* n:"BrtEndTableSlicerCache", */
    T: -1
  },
  2079: {
    /* n:"BrtSxFilter15" */
  },
  2080: {
    /* n:"BrtBeginTimelineCachePivotCacheIDs", */
    T: 1
  },
  2081: {
    /* n:"BrtEndTimelineCachePivotCacheIDs", */
    T: -1
  },
  2082: {
    /* n:"BrtTimelineCachePivotCacheID" */
  },
  2083: {
    /* n:"BrtBeginTimelineCacheIDs", */
    T: 1
  },
  2084: {
    /* n:"BrtEndTimelineCacheIDs", */
    T: -1
  },
  2085: {
    /* n:"BrtBeginTimelineCacheID", */
    T: 1
  },
  2086: {
    /* n:"BrtEndTimelineCacheID", */
    T: -1
  },
  2087: {
    /* n:"BrtBeginTimelinesEx", */
    T: 1
  },
  2088: {
    /* n:"BrtEndTimelinesEx", */
    T: -1
  },
  2089: {
    /* n:"BrtBeginTimelineEx", */
    T: 1
  },
  2090: {
    /* n:"BrtEndTimelineEx", */
    T: -1
  },
  2091: {
    /* n:"BrtWorkBookPr15" */
  },
  2092: {
    /* n:"BrtPCDH15" */
  },
  2093: {
    /* n:"BrtBeginTimelineStyle", */
    T: 1
  },
  2094: {
    /* n:"BrtEndTimelineStyle", */
    T: -1
  },
  2095: {
    /* n:"BrtTimelineStyleElement" */
  },
  2096: {
    /* n:"BrtBeginTimelineStylesheetExt15", */
    T: 1
  },
  2097: {
    /* n:"BrtEndTimelineStylesheetExt15", */
    T: -1
  },
  2098: {
    /* n:"BrtBeginTimelineStyles", */
    T: 1
  },
  2099: {
    /* n:"BrtEndTimelineStyles", */
    T: -1
  },
  2100: {
    /* n:"BrtBeginTimelineStyleElements", */
    T: 1
  },
  2101: {
    /* n:"BrtEndTimelineStyleElements", */
    T: -1
  },
  2102: {
    /* n:"BrtDxf15" */
  },
  2103: {
    /* n:"BrtBeginDxfs15", */
    T: 1
  },
  2104: {
    /* n:"BrtEndDxfs15", */
    T: -1
  },
  2105: {
    /* n:"BrtSlicerCacheHideItemsWithNoData" */
  },
  2106: {
    /* n:"BrtBeginItemUniqueNames", */
    T: 1
  },
  2107: {
    /* n:"BrtEndItemUniqueNames", */
    T: -1
  },
  2108: {
    /* n:"BrtItemUniqueName" */
  },
  2109: {
    /* n:"BrtBeginExtConn15", */
    T: 1
  },
  2110: {
    /* n:"BrtEndExtConn15", */
    T: -1
  },
  2111: {
    /* n:"BrtBeginOledbPr15", */
    T: 1
  },
  2112: {
    /* n:"BrtEndOledbPr15", */
    T: -1
  },
  2113: {
    /* n:"BrtBeginDataFeedPr15", */
    T: 1
  },
  2114: {
    /* n:"BrtEndDataFeedPr15", */
    T: -1
  },
  2115: {
    /* n:"BrtTextPr15" */
  },
  2116: {
    /* n:"BrtRangePr15" */
  },
  2117: {
    /* n:"BrtDbCommand15" */
  },
  2118: {
    /* n:"BrtBeginDbTables15", */
    T: 1
  },
  2119: {
    /* n:"BrtEndDbTables15", */
    T: -1
  },
  2120: {
    /* n:"BrtDbTable15" */
  },
  2121: {
    /* n:"BrtBeginDataModel", */
    T: 1
  },
  2122: {
    /* n:"BrtEndDataModel", */
    T: -1
  },
  2123: {
    /* n:"BrtBeginModelTables", */
    T: 1
  },
  2124: {
    /* n:"BrtEndModelTables", */
    T: -1
  },
  2125: {
    /* n:"BrtModelTable" */
  },
  2126: {
    /* n:"BrtBeginModelRelationships", */
    T: 1
  },
  2127: {
    /* n:"BrtEndModelRelationships", */
    T: -1
  },
  2128: {
    /* n:"BrtModelRelationship" */
  },
  2129: {
    /* n:"BrtBeginECTxtWiz15", */
    T: 1
  },
  2130: {
    /* n:"BrtEndECTxtWiz15", */
    T: -1
  },
  2131: {
    /* n:"BrtBeginECTWFldInfoLst15", */
    T: 1
  },
  2132: {
    /* n:"BrtEndECTWFldInfoLst15", */
    T: -1
  },
  2133: {
    /* n:"BrtBeginECTWFldInfo15", */
    T: 1
  },
  2134: {
    /* n:"BrtFieldListActiveItem" */
  },
  2135: {
    /* n:"BrtPivotCacheIdVersion" */
  },
  2136: {
    /* n:"BrtSXDI15" */
  },
  2137: {
    /* n:"BrtBeginModelTimeGroupings", */
    T: 1
  },
  2138: {
    /* n:"BrtEndModelTimeGroupings", */
    T: -1
  },
  2139: {
    /* n:"BrtBeginModelTimeGrouping", */
    T: 1
  },
  2140: {
    /* n:"BrtEndModelTimeGrouping", */
    T: -1
  },
  2141: {
    /* n:"BrtModelTimeGroupingCalcCol" */
  },
  3072: {
    /* n:"BrtUid" */
  },
  3073: {
    /* n:"BrtRevisionPtr" */
  },
  4096: {
    /* n:"BrtBeginDynamicArrayPr", */
    T: 1
  },
  4097: {
    /* n:"BrtEndDynamicArrayPr", */
    T: -1
  },
  5002: {
    /* n:"BrtBeginRichValueBlock", */
    T: 1
  },
  5003: {
    /* n:"BrtEndRichValueBlock", */
    T: -1
  },
  5081: {
    /* n:"BrtBeginRichFilters", */
    T: 1
  },
  5082: {
    /* n:"BrtEndRichFilters", */
    T: -1
  },
  5083: {
    /* n:"BrtRichFilter" */
  },
  5084: {
    /* n:"BrtBeginRichFilterColumn", */
    T: 1
  },
  5085: {
    /* n:"BrtEndRichFilterColumn", */
    T: -1
  },
  5086: {
    /* n:"BrtBeginCustomRichFilters", */
    T: 1
  },
  5087: {
    /* n:"BrtEndCustomRichFilters", */
    T: -1
  },
  5088: {
    /* n:"BrtCustomRichFilter" */
  },
  5089: {
    /* n:"BrtTop10RichFilter" */
  },
  5090: {
    /* n:"BrtDynamicRichFilter" */
  },
  5092: {
    /* n:"BrtBeginRichSortCondition", */
    T: 1
  },
  5093: {
    /* n:"BrtEndRichSortCondition", */
    T: -1
  },
  5094: {
    /* n:"BrtRichFilterDateGroupItem" */
  },
  5095: {
    /* n:"BrtBeginCalcFeatures", */
    T: 1
  },
  5096: {
    /* n:"BrtEndCalcFeatures", */
    T: -1
  },
  5097: {
    /* n:"BrtCalcFeature" */
  },
  5099: {
    /* n:"BrtExternalLinksPr" */
  },
  65535: { n: "" }
}, Rn = {
  /* [MS-XLS] 2.3 Record Enumeration 2021-08-17 */
  6: {
    /* n:"Formula", */
    f: En
  },
  10: {
    /* n:"EOF", */
    f: ot
  },
  12: {
    /* n:"CalcCount", */
    f: Ye
  },
  //
  13: {
    /* n:"CalcMode", */
    f: Ye
  },
  //
  14: {
    /* n:"CalcPrecision", */
    f: Je
  },
  //
  15: {
    /* n:"CalcRefMode", */
    f: Je
  },
  //
  16: {
    /* n:"CalcDelta", */
    f: kr
  },
  //
  17: {
    /* n:"CalcIter", */
    f: Je
  },
  //
  18: {
    /* n:"Protect", */
    f: Je
  },
  19: {
    /* n:"Password", */
    f: Ye
  },
  20: {
    /* n:"Header", */
    f: qs
  },
  21: {
    /* n:"Footer", */
    f: qs
  },
  23: {
    /* n:"ExternSheet", */
    f: Pi
  },
  24: {
    /* n:"Lbl", */
    f: e0
  },
  25: {
    /* n:"WinProtect", */
    f: Je
  },
  26: {
    /* n:"VerticalPageBreaks", */
  },
  27: {
    /* n:"HorizontalPageBreaks", */
  },
  28: {
    /* n:"Note", */
    f: tu
  },
  29: {
    /* n:"Selection", */
  },
  34: {
    /* n:"Date1904", */
    f: Je
  },
  35: {
    /* n:"ExternName", */
    f: Qs
  },
  38: {
    /* n:"LeftMargin", */
    f: kr
  },
  // *
  39: {
    /* n:"RightMargin", */
    f: kr
  },
  // *
  40: {
    /* n:"TopMargin", */
    f: kr
  },
  // *
  41: {
    /* n:"BottomMargin", */
    f: kr
  },
  // *
  42: {
    /* n:"PrintRowCol", */
    f: Je
  },
  43: {
    /* n:"PrintGrid", */
    f: Je
  },
  47: {
    /* n:"FilePass", */
    f: i1
  },
  49: {
    /* n:"Font", */
    f: Oh
  },
  51: {
    /* n:"PrintSize", */
    f: Ye
  },
  60: {
    /* n:"Continue", */
  },
  61: {
    /* n:"Window1", */
    f: Dh
  },
  64: {
    /* n:"Backup", */
    f: Je
  },
  65: {
    /* n:"Pane", */
    f: Ih
  },
  66: {
    /* n:"CodePage", */
    f: Ye
  },
  77: {
    /* n:"Pls", */
  },
  80: {
    /* n:"DCon", */
  },
  81: {
    /* n:"DConRef", */
  },
  82: {
    /* n:"DConName", */
  },
  85: {
    /* n:"DefColWidth", */
    f: Ye
  },
  89: {
    /* n:"XCT", */
  },
  90: {
    /* n:"CRN", */
  },
  91: {
    /* n:"FileSharing", */
  },
  92: {
    /* n:"WriteAccess", */
    f: Ah
  },
  93: {
    /* n:"Obj", */
    f: nu
  },
  94: {
    /* n:"Uncalced", */
  },
  95: {
    /* n:"CalcSaveRecalc", */
    f: Je
  },
  //
  96: {
    /* n:"Template", */
  },
  97: {
    /* n:"Intl", */
  },
  99: {
    /* n:"ObjProtect", */
    f: Je
  },
  125: {
    /* n:"ColInfo", */
    f: Ni
  },
  128: {
    /* n:"Guts", */
    f: jh
  },
  129: {
    /* n:"WsBool", */
    f: Fh
  },
  130: {
    /* n:"GridSet", */
    f: Ye
  },
  131: {
    /* n:"HCenter", */
    f: Je
  },
  132: {
    /* n:"VCenter", */
    f: Je
  },
  133: {
    /* n:"BoundSheet8", */
    f: Sh
  },
  134: {
    /* n:"WriteProtect", */
  },
  140: {
    /* n:"Country", */
    f: lu
  },
  141: {
    /* n:"HideObj", */
    f: Ye
  },
  144: {
    /* n:"Sort", */
  },
  146: {
    /* n:"Palette", */
    f: uu
  },
  151: {
    /* n:"Sync", */
  },
  152: {
    /* n:"LPr", */
  },
  153: {
    /* n:"DxGCol", */
  },
  154: {
    /* n:"FnGroupName", */
  },
  155: {
    /* n:"FilterMode", */
  },
  156: {
    /* n:"BuiltInFnGroupCount", */
    f: Ye
  },
  157: {
    /* n:"AutoFilterInfo", */
  },
  158: {
    /* n:"AutoFilter", */
  },
  160: {
    /* n:"Scl", */
    f: gu
  },
  161: {
    /* n:"Setup", */
    f: xu
  },
  174: {
    /* n:"ScenMan", */
  },
  175: {
    /* n:"SCENARIO", */
  },
  176: {
    /* n:"SxView", */
  },
  177: {
    /* n:"Sxvd", */
  },
  178: {
    /* n:"SXVI", */
  },
  180: {
    /* n:"SxIvd", */
  },
  181: {
    /* n:"SXLI", */
  },
  182: {
    /* n:"SXPI", */
  },
  184: {
    /* n:"DocRoute", */
  },
  185: {
    /* n:"RecipName", */
  },
  189: {
    /* n:"MulRk", */
    f: Wh
  },
  190: {
    /* n:"MulBlank", */
    f: Vh
  },
  193: {
    /* n:"Mms", */
    f: ot
  },
  197: {
    /* n:"SXDI", */
  },
  198: {
    /* n:"SXDB", */
  },
  199: {
    /* n:"SXFDB", */
  },
  200: {
    /* n:"SXDBB", */
  },
  201: {
    /* n:"SXNum", */
  },
  202: {
    /* n:"SxBool", */
    f: Je
  },
  203: {
    /* n:"SxErr", */
  },
  204: {
    /* n:"SXInt", */
  },
  205: {
    /* n:"SXString", */
  },
  206: {
    /* n:"SXDtr", */
  },
  207: {
    /* n:"SxNil", */
  },
  208: {
    /* n:"SXTbl", */
  },
  209: {
    /* n:"SXTBRGIITM", */
  },
  210: {
    /* n:"SxTbpg", */
  },
  211: {
    /* n:"ObProj", */
  },
  213: {
    /* n:"SXStreamID", */
  },
  215: {
    /* n:"DBCell", */
  },
  216: {
    /* n:"SXRng", */
  },
  217: {
    /* n:"SxIsxoper", */
  },
  218: {
    /* n:"BookBool", */
    f: Ye
  },
  220: {
    /* n:"DbOrParamQry", */
  },
  221: {
    /* n:"ScenarioProtect", */
    f: Je
  },
  222: {
    /* n:"OleObjectSize", */
  },
  224: {
    /* n:"XF", */
    f: Gh
  },
  225: {
    /* n:"InterfaceHdr", */
    f: Th
  },
  226: {
    /* n:"InterfaceEnd", */
    f: ot
  },
  227: {
    /* n:"SXVS", */
  },
  229: {
    /* n:"MergeCells", */
    f: au
  },
  233: {
    /* n:"BkHim", */
  },
  235: {
    /* n:"MsoDrawingGroup", */
  },
  236: {
    /* n:"MsoDrawing", */
  },
  237: {
    /* n:"MsoDrawingSelection", */
  },
  239: {
    /* n:"PhoneticInfo", */
  },
  240: {
    /* n:"SxRule", */
  },
  241: {
    /* n:"SXEx", */
  },
  242: {
    /* n:"SxFilt", */
  },
  244: {
    /* n:"SxDXF", */
  },
  245: {
    /* n:"SxItm", */
  },
  246: {
    /* n:"SxName", */
  },
  247: {
    /* n:"SxSelect", */
  },
  248: {
    /* n:"SXPair", */
  },
  249: {
    /* n:"SxFmla", */
  },
  251: {
    /* n:"SxFormat", */
  },
  252: {
    /* n:"SST", */
    f: yh
  },
  253: {
    /* n:"LabelSst", */
    f: Mh
  },
  255: {
    /* n:"ExtSST", */
    f: Ch
  },
  256: {
    /* n:"SXVDEx", */
  },
  259: {
    /* n:"SXFormula", */
  },
  290: {
    /* n:"SXDBEx", */
  },
  311: {
    /* n:"RRDInsDel", */
  },
  312: {
    /* n:"RRDHead", */
  },
  315: {
    /* n:"RRDChgCell", */
  },
  317: {
    /* n:"RRTabId", */
    f: Ti
  },
  318: {
    /* n:"RRDRenSheet", */
  },
  319: {
    /* n:"RRSort", */
  },
  320: {
    /* n:"RRDMove", */
  },
  330: {
    /* n:"RRFormat", */
  },
  331: {
    /* n:"RRAutoFmt", */
  },
  333: {
    /* n:"RRInsertSh", */
  },
  334: {
    /* n:"RRDMoveBegin", */
  },
  335: {
    /* n:"RRDMoveEnd", */
  },
  336: {
    /* n:"RRDInsDelBegin", */
  },
  337: {
    /* n:"RRDInsDelEnd", */
  },
  338: {
    /* n:"RRDConflict", */
  },
  339: {
    /* n:"RRDDefName", */
  },
  340: {
    /* n:"RRDRstEtxp", */
  },
  351: {
    /* n:"LRng", */
  },
  352: {
    /* n:"UsesELFs", */
    f: Je
  },
  353: {
    /* n:"DSF", */
    f: ot
  },
  401: {
    /* n:"CUsr", */
  },
  402: {
    /* n:"CbUsr", */
  },
  403: {
    /* n:"UsrInfo", */
  },
  404: {
    /* n:"UsrExcl", */
  },
  405: {
    /* n:"FileLock", */
  },
  406: {
    /* n:"RRDInfo", */
  },
  407: {
    /* n:"BCUsrs", */
  },
  408: {
    /* n:"UsrChk", */
  },
  425: {
    /* n:"UserBView", */
  },
  426: {
    /* n:"UserSViewBegin", */
  },
  427: {
    /* n:"UserSViewEnd", */
  },
  428: {
    /* n:"RRDUserView", */
  },
  429: {
    /* n:"Qsi", */
  },
  430: {
    /* n:"SupBook", */
    f: Zh
  },
  431: {
    /* n:"Prot4Rev", */
    f: Je
  },
  432: {
    /* n:"CondFmt", */
  },
  433: {
    /* n:"CF", */
  },
  434: {
    /* n:"DVal", */
  },
  437: {
    /* n:"DConBin", */
  },
  438: {
    /* n:"TxO", */
    f: cu
  },
  439: {
    /* n:"RefreshAll", */
    f: Je
  },
  //
  440: {
    /* n:"HLink", */
    f: fu
  },
  441: {
    /* n:"Lel", */
  },
  442: {
    /* n:"CodeName", */
    f: Aa
  },
  443: {
    /* n:"SXFDBType", */
  },
  444: {
    /* n:"Prot4RevPass", */
    f: Ye
  },
  445: {
    /* n:"ObNoMacros", */
  },
  446: {
    /* n:"Dv", */
  },
  448: {
    /* n:"Excel9File", */
    f: ot
  },
  449: {
    /* n:"RecalcId", */
    f: Nh,
    r: 2
  },
  450: {
    /* n:"EntExU2", */
    f: ot
  },
  512: {
    /* n:"Dimensions", */
    f: Zs
  },
  513: {
    /* n:"Blank", */
    f: mu
  },
  515: {
    /* n:"Number", */
    f: Jh
  },
  516: {
    /* n:"Label", */
    f: Lh
  },
  517: {
    /* n:"BoolErr", */
    f: Yh
  },
  519: {
    /* n:"String", */
    f: vu
  },
  520: {
    /* n:"Row", */
    f: bh
  },
  523: {
    /* n:"Index", */
  },
  545: {
    /* n:"Array", */
    f: t0
  },
  549: {
    /* n:"DefaultRowHeight", */
    f: Js
  },
  566: {
    /* n:"Table", */
  },
  574: {
    /* n:"Window2", */
    f: Rh
  },
  638: {
    /* n:"RK", */
    f: Hh
  },
  659: {
    /* n:"Style", */
  },
  1048: {
    /* n:"BigName", */
  },
  1054: {
    /* n:"Format", */
    f: Bh
  },
  1084: {
    /* n:"ContinueBigName", */
  },
  1212: {
    /* n:"ShrFmla", */
    f: Qh
  },
  2048: {
    /* n:"HLinkTooltip", */
    f: ou
  },
  2049: {
    /* n:"WebPub", */
  },
  2050: {
    /* n:"QsiSXTag", */
  },
  2051: {
    /* n:"DBQueryExt", */
  },
  2052: {
    /* n:"ExtString", */
  },
  2053: {
    /* n:"TxtQry", */
  },
  2054: {
    /* n:"Qsir", */
  },
  2055: {
    /* n:"Qsif", */
  },
  2056: {
    /* n:"RRDTQSIF", */
  },
  2057: {
    /* n:"BOF", */
    f: La
  },
  2058: {
    /* n:"OleDbConn", */
  },
  2059: {
    /* n:"WOpt", */
  },
  2060: {
    /* n:"SXViewEx", */
  },
  2061: {
    /* n:"SXTH", */
  },
  2062: {
    /* n:"SXPIEx", */
  },
  2063: {
    /* n:"SXVDTEx", */
  },
  2064: {
    /* n:"SXViewEx9", */
  },
  2066: {
    /* n:"ContinueFrt", */
  },
  2067: {
    /* n:"RealTimeData", */
  },
  2128: {
    /* n:"ChartFrtInfo", */
  },
  2129: {
    /* n:"FrtWrapper", */
  },
  2130: {
    /* n:"StartBlock", */
  },
  2131: {
    /* n:"EndBlock", */
  },
  2132: {
    /* n:"StartObject", */
  },
  2133: {
    /* n:"EndObject", */
  },
  2134: {
    /* n:"CatLab", */
  },
  2135: {
    /* n:"YMult", */
  },
  2136: {
    /* n:"SXViewLink", */
  },
  2137: {
    /* n:"PivotChartBits", */
  },
  2138: {
    /* n:"FrtFontList", */
  },
  2146: {
    /* n:"SheetExt", */
  },
  2147: {
    /* n:"BookExt", */
    r: 12
  },
  2148: {
    /* n:"SXAddl", */
  },
  2149: {
    /* n:"CrErr", */
  },
  2150: {
    /* n:"HFPicture", */
  },
  2151: {
    /* n:"FeatHdr", */
    f: ot
  },
  2152: {
    /* n:"Feat", */
  },
  2154: {
    /* n:"DataLabExt", */
  },
  2155: {
    /* n:"DataLabExtContents", */
  },
  2156: {
    /* n:"CellWatch", */
  },
  2161: {
    /* n:"FeatHdr11", */
  },
  2162: {
    /* n:"Feature11", */
  },
  2164: {
    /* n:"DropDownObjIds", */
  },
  2165: {
    /* n:"ContinueFrt11", */
  },
  2166: {
    /* n:"DConn", */
  },
  2167: {
    /* n:"List12", */
  },
  2168: {
    /* n:"Feature12", */
  },
  2169: {
    /* n:"CondFmt12", */
  },
  2170: {
    /* n:"CF12", */
  },
  2171: {
    /* n:"CFEx", */
  },
  2172: {
    /* n:"XFCRC", */
    f: du,
    r: 12
  },
  2173: {
    /* n:"XFExt", */
    f: B1,
    r: 12
  },
  2174: {
    /* n:"AutoFilter12", */
  },
  2175: {
    /* n:"ContinueFrt12", */
  },
  2180: {
    /* n:"MDTInfo", */
  },
  2181: {
    /* n:"MDXStr", */
  },
  2182: {
    /* n:"MDXTuple", */
  },
  2183: {
    /* n:"MDXSet", */
  },
  2184: {
    /* n:"MDXProp", */
  },
  2185: {
    /* n:"MDXKPI", */
  },
  2186: {
    /* n:"MDB", */
  },
  2187: {
    /* n:"PLV", */
  },
  2188: {
    /* n:"Compat12", */
    f: Je,
    r: 12
  },
  2189: {
    /* n:"DXF", */
  },
  2190: {
    /* n:"TableStyles", */
    r: 12
  },
  2191: {
    /* n:"TableStyle", */
  },
  2192: {
    /* n:"TableStyleElement", */
  },
  2194: {
    /* n:"StyleExt", */
  },
  2195: {
    /* n:"NamePublish", */
  },
  2196: {
    /* n:"NameCmt", */
    f: qh,
    r: 12
  },
  2197: {
    /* n:"SortData", */
  },
  2198: {
    /* n:"Theme", */
    f: D1,
    r: 12
  },
  2199: {
    /* n:"GUIDTypeLib", */
  },
  2200: {
    /* n:"FnGrp12", */
  },
  2201: {
    /* n:"NameFnGrp12", */
  },
  2202: {
    /* n:"MTRSettings", */
    f: eu,
    r: 12
  },
  2203: {
    /* n:"CompressPictures", */
    f: ot
  },
  2204: {
    /* n:"HeaderFooter", */
  },
  2205: {
    /* n:"CrtLayout12", */
  },
  2206: {
    /* n:"CrtMlFrt", */
  },
  2207: {
    /* n:"CrtMlFrtContinue", */
  },
  2211: {
    /* n:"ForceFullCalculation", */
    f: Ph
  },
  2212: {
    /* n:"ShapePropsStream", */
  },
  2213: {
    /* n:"TextPropsStream", */
  },
  2214: {
    /* n:"RichTextStream", */
  },
  2215: {
    /* n:"CrtLayout12A", */
  },
  4097: {
    /* n:"Units", */
  },
  4098: {
    /* n:"Chart", */
  },
  4099: {
    /* n:"Series", */
  },
  4102: {
    /* n:"DataFormat", */
  },
  4103: {
    /* n:"LineFormat", */
  },
  4105: {
    /* n:"MarkerFormat", */
  },
  4106: {
    /* n:"AreaFormat", */
  },
  4107: {
    /* n:"PieFormat", */
  },
  4108: {
    /* n:"AttachedLabel", */
  },
  4109: {
    /* n:"SeriesText", */
  },
  4116: {
    /* n:"ChartFormat", */
  },
  4117: {
    /* n:"Legend", */
  },
  4118: {
    /* n:"SeriesList", */
  },
  4119: {
    /* n:"Bar", */
  },
  4120: {
    /* n:"Line", */
  },
  4121: {
    /* n:"Pie", */
  },
  4122: {
    /* n:"Area", */
  },
  4123: {
    /* n:"Scatter", */
  },
  4124: {
    /* n:"CrtLine", */
  },
  4125: {
    /* n:"Axis", */
  },
  4126: {
    /* n:"Tick", */
  },
  4127: {
    /* n:"ValueRange", */
  },
  4128: {
    /* n:"CatSerRange", */
  },
  4129: {
    /* n:"AxisLine", */
  },
  4130: {
    /* n:"CrtLink", */
  },
  4132: {
    /* n:"DefaultText", */
  },
  4133: {
    /* n:"Text", */
  },
  4134: {
    /* n:"FontX", */
    f: Ye
  },
  4135: {
    /* n:"ObjectLink", */
  },
  4146: {
    /* n:"Frame", */
  },
  4147: {
    /* n:"Begin", */
  },
  4148: {
    /* n:"End", */
  },
  4149: {
    /* n:"PlotArea", */
  },
  4154: {
    /* n:"Chart3d", */
  },
  4156: {
    /* n:"PicF", */
  },
  4157: {
    /* n:"DropBar", */
  },
  4158: {
    /* n:"Radar", */
  },
  4159: {
    /* n:"Surf", */
  },
  4160: {
    /* n:"RadarArea", */
  },
  4161: {
    /* n:"AxisParent", */
  },
  4163: {
    /* n:"LegendException", */
  },
  4164: {
    /* n:"ShtProps", */
    f: pu
  },
  4165: {
    /* n:"SerToCrt", */
  },
  4166: {
    /* n:"AxesUsed", */
  },
  4168: {
    /* n:"SBaseRef", */
  },
  4170: {
    /* n:"SerParent", */
  },
  4171: {
    /* n:"SerAuxTrend", */
  },
  4174: {
    /* n:"IFmtRecord", */
  },
  4175: {
    /* n:"Pos", */
  },
  4176: {
    /* n:"AlRuns", */
  },
  4177: {
    /* n:"BRAI", */
  },
  4187: {
    /* n:"SerAuxErrBar", */
  },
  4188: {
    /* n:"ClrtClient", */
    f: hu
  },
  4189: {
    /* n:"SerFmt", */
  },
  4191: {
    /* n:"Chart3DBarShape", */
  },
  4192: {
    /* n:"Fbi", */
  },
  4193: {
    /* n:"BopPop", */
  },
  4194: {
    /* n:"AxcExt", */
  },
  4195: {
    /* n:"Dat", */
  },
  4196: {
    /* n:"PlotGrowth", */
  },
  4197: {
    /* n:"SIIndex", */
  },
  4198: {
    /* n:"GelFrame", */
  },
  4199: {
    /* n:"BopPopCustom", */
  },
  4200: {
    /* n:"Fbi2", */
  },
  0: {
    /* n:"Dimensions", */
    f: Zs
  },
  1: {
    /* n:"BIFF2BLANK", */
  },
  2: {
    /* n:"BIFF2INT", */
    f: wu
  },
  3: {
    /* n:"BIFF2NUM", */
    f: Eu
  },
  4: {
    /* n:"BIFF2STR", */
    f: _u
  },
  5: {
    /* n:"BIFF2BOOLERR", */
    f: Au
  },
  7: {
    /* n:"String", */
    f: Tu
  },
  8: {
    /* n:"BIFF2ROW", */
  },
  9: {
    /* n:"BOF", */
    f: La
  },
  11: {
    /* n:"Index", */
  },
  22: {
    /* n:"ExternCount", */
    f: Ye
  },
  30: {
    /* n:"BIFF2FORMAT", */
    f: Uh
  },
  31: {
    /* n:"BIFF2FMTCNT", */
  },
  /* 16-bit cnt of BIFF2FORMAT records */
  32: {
    /* n:"BIFF2COLINFO", */
  },
  33: {
    /* n:"Array", */
    f: t0
  },
  36: {
    /* n:"COLWIDTH", */
  },
  37: {
    /* n:"DefaultRowHeight", */
    f: Js
  },
  // 0x002c ??
  // 0x002d ??
  // 0x002e ??
  // 0x0030 FONTCOUNT: number of fonts
  50: {
    /* n:"BIFF2FONTXTRA", */
    f: Fu
  },
  // 0x0035: INFOOPTS
  // 0x0036: TABLE (BIFF2 only)
  // 0x0037: TABLE2 (BIFF2 only)
  // 0x0038: WNDESK
  // 0x0039 ??
  // 0x003a: BEGINPREF
  // 0x003b: ENDPREF
  62: {
    /* n:"BIFF2WINDOW2", */
  },
  // 0x003f ??
  // 0x0046: SHOWSCROLL
  // 0x0047: SHOWFORMULA
  // 0x0048: STATUSBAR
  // 0x0049: SHORTMENUS
  // 0x004A:
  // 0x004B:
  // 0x004C:
  // 0x004E:
  // 0x004F:
  // 0x0058: TOOLBAR (BIFF3)
  /* - - - */
  52: {
    /* n:"DDEObjName", */
  },
  67: {
    /* n:"BIFF2XF", */
    f: Xh
  },
  68: {
    /* n:"BIFF2XFINDEX", */
    f: Ye
  },
  69: {
    /* n:"BIFF2FONTCLR", */
  },
  86: {
    /* n:"BIFF4FMTCNT", */
  },
  /* 16-bit cnt, similar to BIFF2 */
  126: {
    /* n:"RK", */
  },
  /* Not necessarily same as 0x027e */
  127: {
    /* n:"ImData", */
    f: ku
  },
  135: {
    /* n:"Addin", */
  },
  136: {
    /* n:"Edg", */
  },
  137: {
    /* n:"Pub", */
  },
  // 0x8A
  // 0x8B LH: alternate menu key flag (BIFF3/4)
  // 0x8E
  143: {
    /* n:"BIFF4SheetInfo", */
    f: yu
  },
  145: {
    /* n:"Sub", */
  },
  // 0x93 STYLE
  148: {
    /* n:"LHRecord", */
  },
  149: {
    /* n:"LHNGraph", */
  },
  150: {
    /* n:"Sound", */
  },
  // 0xA2 FNPROTO: function prototypes (BIFF4)
  // 0xA3
  // 0xA8
  169: {
    /* n:"CoordList", */
  },
  171: {
    /* n:"GCW", */
  },
  188: {
    /* n:"ShrFmla", */
  },
  /* Not necessarily same as 0x04bc */
  191: {
    /* n:"ToolbarHdr", */
  },
  192: {
    /* n:"ToolbarEnd", */
  },
  194: {
    /* n:"AddMenu", */
  },
  195: {
    /* n:"DelMenu", */
  },
  214: {
    /* n:"RString", */
    f: Su
  },
  223: {
    /* n:"UDDesc", */
  },
  234: {
    /* n:"TabIdConf", */
  },
  354: {
    /* n:"XL5Modify", */
  },
  421: {
    /* n:"FileSharing2", */
  },
  518: {
    /* n:"Formula", */
    f: En
  },
  521: {
    /* n:"BOF", */
    f: La
  },
  536: {
    /* n:"Lbl", */
    f: e0
  },
  547: {
    /* n:"ExternName", */
    f: Qs
  },
  561: {
    /* n:"Font", */
  },
  579: {
    /* n:"BIFF3XF", */
    f: zh
  },
  1030: {
    /* n:"Formula", */
    f: En
  },
  1033: {
    /* n:"BOF", */
    f: La
  },
  1091: {
    /* n:"BIFF4XF", */
    f: Kh
  },
  2157: {
    /* n:"FeatInfo", */
  },
  2163: {
    /* n:"FeatInfo11", */
  },
  2177: {
    /* n:"SXAddl12", */
  },
  2240: {
    /* n:"AutoWebPub", */
  },
  2241: {
    /* n:"ListObj", */
  },
  2242: {
    /* n:"ListField", */
  },
  2243: {
    /* n:"ListDV", */
  },
  2244: {
    /* n:"ListCondFmt", */
  },
  2245: {
    /* n:"ListCF", */
  },
  2246: {
    /* n:"FMQry", */
  },
  2247: {
    /* n:"FMSQry", */
  },
  2248: {
    /* n:"PLV", */
  },
  2249: {
    /* n:"LnExt", */
  },
  2250: {
    /* n:"MkrExt", */
  },
  2251: {
    /* n:"CrtCoopt", */
  },
  2262: {
    /* n:"FRTArchId$", */
    r: 12
  },
  /* --- multiplan 4 records --- */
  101: {
    /* n:"", */
  },
  // one per window
  102: {
    /* n:"", */
  },
  // calc settings
  105: {
    /* n:"", */
  },
  // print header
  106: {
    /* n:"", */
  },
  // print footer
  107: {
    /* n:"", */
  },
  // print settings
  109: {
    /* n:"", */
  },
  // one per window
  112: {
    /* n:"", */
  },
  // includes default col width
  114: {
    /* n:"", */
  },
  // includes selected cell
  29282: {}
};
function Dr(e, t, r, a) {
  var n = t;
  if (!isNaN(n)) {
    var s = (r || []).length || 0, i = e.next(4);
    i.write_shift(2, n), i.write_shift(2, s), /*:: len != null &&*/
    s > 0 && ui(r) && e.push(r);
  }
}
function x0(e, t) {
  var r = t || {}, a = r.dense != null ? r.dense : Qf, n = {};
  a && (n["!data"] = []), e = wa(e, "<!--", "-->");
  var s = e.match(/<table/i);
  if (!s) throw new Error("Invalid HTML: could not find <table>");
  var i = e.match(/<\/table/i), c = s.index, f = i && i.index || e.length, o = Vo(e.slice(c, f), /(:?<tr[^<>]*>)/i, "<tr>"), l = -1, p = 0, u = 0, h = 0, m = { s: { r: 1e7, c: 1e7 }, e: { r: 0, c: 0 } }, k = [];
  for (c = 0; c < o.length; ++c) {
    var x = o[c].trim(), d = x.slice(0, 3).toLowerCase();
    if (d == "<tr") {
      if (++l, r.sheetRows && r.sheetRows <= l) {
        --l;
        break;
      }
      p = 0;
      continue;
    }
    if (!(d != "<td" && d != "<th")) {
      var _ = x.split(/<\/t[dh]>/i);
      for (f = 0; f < _.length; ++f) {
        var g = _[f].trim();
        if (g.match(/<t[dh]/i)) {
          for (var C = g, O = 0; C.charAt(0) == "<" && (O = C.indexOf(">")) > -1; ) C = C.slice(O + 1);
          for (var U = 0; U < k.length; ++U) {
            var P = k[U];
            P.s.c == p && P.s.r < l && l <= P.e.r && (p = P.e.c + 1, U = -1);
          }
          var I = ue(g.slice(0, g.indexOf(">")));
          h = I.colspan ? +I.colspan : 1, ((u = +I.rowspan) > 1 || h > 1) && k.push({ s: { r: l, c: p }, e: { r: l + (u || 1) - 1, c: p + h - 1 } });
          var N = I.t || I["data-t"] || "";
          if (!C.length) {
            p += h;
            continue;
          }
          if (C = Q0(C), m.s.r > l && (m.s.r = l), m.e.r < l && (m.e.r = l), m.s.c > p && (m.s.c = p), m.e.c < p && (m.e.c = p), !C.length) {
            p += h;
            continue;
          }
          var B = { t: "s", v: C };
          r.raw || !C.trim().length || N == "s" || (C === "TRUE" ? B = { t: "b", v: !0 } : C === "FALSE" ? B = { t: "b", v: !1 } : isNaN(Or(C)) ? isNaN(ma(C).getDate()) ? C.charCodeAt(0) == 35 && ur[C] != null && (B.t = "e", B.w = C, B.v = ur[C]) : (B = { t: "d", v: xr(C) }, r.UTC === !1 && (B.v = bt(B.v)), r.cellDates || (B = { t: "n", v: fr(B.v) }), B.z = r.dateNF || _e[14]) : B = { t: "n", v: Or(C) }), B.cellText !== !1 && (B.w = C), a ? (n["!data"][l] || (n["!data"][l] = []), n["!data"][l][p] = B) : n[Oe({ r: l, c: p })] = B, p += h;
        }
      }
    }
  }
  return n["!ref"] = Pe(m), k.length && (n["!merges"] = k), n;
}
function mm(e, t, r, a) {
  for (var n = e["!merges"] || [], s = [], i = {}, c = e["!data"] != null, f = t.s.c; f <= t.e.c; ++f) {
    for (var o = 0, l = 0, p = 0; p < n.length; ++p)
      if (!(n[p].s.r > r || n[p].s.c > f) && !(n[p].e.r < r || n[p].e.c < f)) {
        if (n[p].s.r < r || n[p].s.c < f) {
          o = -1;
          break;
        }
        o = n[p].e.r - n[p].s.r + 1, l = n[p].e.c - n[p].s.c + 1;
        break;
      }
    if (!(o < 0)) {
      var u = Me(f) + We(r), h = c ? (e["!data"][r] || [])[f] : e[u];
      h && h.t == "n" && h.v != null && !isFinite(h.v) && (isNaN(h.v) ? h = { t: "e", v: 36, w: Pr[36] } : h = { t: "e", v: 7, w: Pr[7] });
      var m = h && h.v != null && (h.h || ra(h.w || (pt(h), h.w) || "")) || "";
      i = {}, o > 1 && (i.rowspan = o), l > 1 && (i.colspan = l), a.editable ? m = '<span contenteditable="true">' + m + "</span>" : h && (i["data-t"] = h && h.t || "z", h.v != null && (i["data-v"] = ra(h.v instanceof Date ? h.v.toISOString() : h.v)), h.z != null && (i["data-z"] = h.z), h.l && (h.l.Target || "#").charAt(0) != "#" && (m = '<a href="' + ra(h.l.Target) + '">' + m + "</a>")), i.id = (a.id || "sjs") + "-" + u, s.push(il("td", m, i));
    }
  }
  var k = "<tr>";
  return k + s.join("") + "</tr>";
}
var gm = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>', vm = "</body></html>";
function km(e, t) {
  var r = Xo(e, "table");
  if (!r || r.length == 0) throw new Error("Invalid HTML: could not find <table>");
  if (r.length == 1) {
    var a = vt(x0(r[0], t), t);
    return a.bookType = "html", a;
  }
  var n = is();
  return r.forEach(function(s, i) {
    Ca(n, x0(s, t), "Sheet" + (i + 1));
  }), n.bookType = "html", n;
}
function _m(e, t, r) {
  var a = [];
  return a.join("") + "<table" + (r && r.id ? ' id="' + r.id + '"' : "") + ">";
}
function Em(e, t) {
  var r = t || {}, a = r.header != null ? r.header : gm, n = r.footer != null ? r.footer : vm, s = [a], i = Dt(e["!ref"] || "A1");
  if (s.push(_m(e, i, r)), e["!ref"]) for (var c = i.s.r; c <= i.e.r; ++c) s.push(mm(e, i, c, r));
  return s.push("</table>" + n), s.join("");
}
function tc(e, t, r) {
  var a = t.rows;
  if (!a)
    throw "Unsupported origin when " + t.tagName + " is not a TABLE";
  var n = r || {}, s = e["!data"] != null, i = 0, c = 0;
  if (n.origin != null)
    if (typeof n.origin == "number") i = n.origin;
    else {
      var f = typeof n.origin == "string" ? _r(n.origin) : n.origin;
      i = f.r, c = f.c;
    }
  var o = Math.min(n.sheetRows || 1e7, a.length), l = { s: { r: 0, c: 0 }, e: { r: i, c } };
  if (e["!ref"]) {
    var p = Dt(e["!ref"]);
    l.s.r = Math.min(l.s.r, p.s.r), l.s.c = Math.min(l.s.c, p.s.c), l.e.r = Math.max(l.e.r, p.e.r), l.e.c = Math.max(l.e.c, p.e.c), i == -1 && (l.e.r = i = p.e.r + 1);
  }
  var u = [], h = 0, m = e["!rows"] || (e["!rows"] = []), k = 0, x = 0, d = 0, _ = 0, g = 0, C = 0;
  for (e["!cols"] || (e["!cols"] = []); k < a.length && x < o; ++k) {
    var O = a[k];
    if (p0(O)) {
      if (n.display) continue;
      m[x] = { hidden: !0 };
    }
    var U = O.cells;
    for (d = _ = 0; d < U.length; ++d) {
      var P = U[d];
      if (!(n.display && p0(P))) {
        var I = P.hasAttribute("data-v") ? P.getAttribute("data-v") : P.hasAttribute("v") ? P.getAttribute("v") : Q0(P.innerHTML), N = P.getAttribute("data-z") || P.getAttribute("z");
        for (h = 0; h < u.length; ++h) {
          var B = u[h];
          B.s.c == _ + c && B.s.r < x + i && x + i <= B.e.r && (_ = B.e.c + 1 - c, h = -1);
        }
        C = +P.getAttribute("colspan") || 1, ((g = +P.getAttribute("rowspan") || 1) > 1 || C > 1) && u.push({ s: { r: x + i, c: _ + c }, e: { r: x + i + (g || 1) - 1, c: _ + c + (C || 1) - 1 } });
        var M = { t: "s", v: I }, X = P.getAttribute("data-t") || P.getAttribute("t") || "";
        I != null && (I.length == 0 ? M.t = X || "z" : n.raw || I.trim().length == 0 || X == "s" || (X == "e" && Pr[+I] ? M = { t: "e", v: +I, w: Pr[+I] } : I === "TRUE" ? M = { t: "b", v: !0 } : I === "FALSE" ? M = { t: "b", v: !1 } : isNaN(Or(I)) ? isNaN(ma(I).getDate()) ? I.charCodeAt(0) == 35 && ur[I] != null && (M = { t: "e", v: ur[I], w: I }) : (M = { t: "d", v: xr(I) }, n.UTC && (M.v = an(M.v)), n.cellDates || (M = { t: "n", v: fr(M.v) }), M.z = n.dateNF || _e[14]) : M = { t: "n", v: Or(I) })), M.z === void 0 && N != null && (M.z = N);
        var j = "", oe = P.getElementsByTagName("A");
        if (oe && oe.length) for (var Z = 0; Z < oe.length && !(oe[Z].hasAttribute("href") && (j = oe[Z].getAttribute("href"), j.charAt(0) != "#")); ++Z) ;
        j && j.charAt(0) != "#" && j.slice(0, 11).toLowerCase() != "javascript:" && (M.l = { Target: j }), s ? (e["!data"][x + i] || (e["!data"][x + i] = []), e["!data"][x + i][_ + c] = M) : e[Oe({ c: _ + c, r: x + i })] = M, l.e.c < _ + c && (l.e.c = _ + c), _ += C;
      }
    }
    ++x;
  }
  return u.length && (e["!merges"] = (e["!merges"] || []).concat(u)), l.e.r = Math.max(l.e.r, x - 1 + i), e["!ref"] = Pe(l), x >= o && (e["!fullref"] = Pe((l.e.r = a.length - k + x - 1 + i, l))), e;
}
function ac(e, t) {
  var r = t || {}, a = {};
  return r.dense && (a["!data"] = []), tc(a, e, t);
}
function wm(e, t) {
  var r = vt(ac(e, t), t);
  return r;
}
function p0(e) {
  var t = "", r = Tm(e);
  return r && (t = r(e).getPropertyValue("display")), t || (t = e.style && e.style.display), t === "none";
}
function Tm(e) {
  return e.ownerDocument.defaultView && typeof e.ownerDocument.defaultView.getComputedStyle == "function" ? e.ownerDocument.defaultView.getComputedStyle : typeof getComputedStyle == "function" ? getComputedStyle : null;
}
function Am(e) {
  var t = e.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(/<text:s text:c="(\d+)"\/>/g, function(a, n) {
    return Array(parseInt(n, 10) + 1).join(" ");
  }).replace(/<text:tab[^<>]*\/>/g, "	").replace(/<text:line-break\/>/g, `
`), r = be(t.replace(/<[^<>]*>/g, ""));
  return [r];
}
function nc(e, t, r) {
  var a = r || {}, n = nn(e);
  nr.lastIndex = 0, n = Gn(wa(n, "<!--", "-->"));
  for (var s, i, c = "", f = "", o, l = 0, p = -1, u = ""; s = nr.exec(n); )
    switch (s[3] = s[3].replace(/_[\s\S]*$/, "")) {
      /* Number Format Definitions */
      case "number-style":
      // <number:number-style> 16.29.2
      case "currency-style":
      // <number:currency-style> 16.29.8
      case "percentage-style":
      // <number:percentage-style> 16.29.10
      case "date-style":
      // <number:date-style> 16.29.11
      case "time-style":
      // <number:time-style> 16.29.19
      case "text-style":
        s[1] === "/" ? (i["truncate-on-overflow"] == "false" && (c.match(/h/) ? c = c.replace(/h+/, "[$&]") : c.match(/m/) ? c = c.replace(/m+/, "[$&]") : c.match(/s/) && (c = c.replace(/s+/, "[$&]"))), a[i.name] = c, c = "") : s[0].charAt(s[0].length - 2) !== "/" && (c = "", i = ue(s[0], !1));
        break;
      // LibreOffice bug https://bugs.documentfoundation.org/show_bug.cgi?id=149484
      case "boolean-style":
        s[1] === "/" ? (a[i.name] = "General", c = "") : s[0].charAt(s[0].length - 2) !== "/" && (c = "", i = ue(s[0], !1));
        break;
      /* Number Format Elements */
      case "boolean":
        c += "General";
        break;
      case "text":
        s[1] === "/" ? (u = n.slice(p, nr.lastIndex - s[0].length), u == "%" && i[0] == "<number:percentage-style" ? c += "%" : c += '"' + u.replace(/"/g, '""') + '"') : s[0].charAt(s[0].length - 2) !== "/" && (p = nr.lastIndex);
        break;
      case "day":
        switch (o = ue(s[0], !1), o.style) {
          case "short":
            c += "d";
            break;
          case "long":
            c += "dd";
            break;
          default:
            c += "dd";
            break;
        }
        break;
      case "day-of-week":
        switch (o = ue(s[0], !1), o.style) {
          case "short":
            c += "ddd";
            break;
          case "long":
            c += "dddd";
            break;
          default:
            c += "ddd";
            break;
        }
        break;
      case "era":
        switch (o = ue(s[0], !1), o.style) {
          case "short":
            c += "ee";
            break;
          case "long":
            c += "eeee";
            break;
          default:
            c += "eeee";
            break;
        }
        break;
      case "hours":
        switch (o = ue(s[0], !1), o.style) {
          case "short":
            c += "h";
            break;
          case "long":
            c += "hh";
            break;
          default:
            c += "hh";
            break;
        }
        break;
      case "minutes":
        switch (o = ue(s[0], !1), o.style) {
          case "short":
            c += "m";
            break;
          case "long":
            c += "mm";
            break;
          default:
            c += "mm";
            break;
        }
        break;
      case "month":
        switch (o = ue(s[0], !1), o.textual && (c += "mm"), o.style) {
          case "short":
            c += "m";
            break;
          case "long":
            c += "mm";
            break;
          default:
            c += "m";
            break;
        }
        break;
      case "seconds":
        {
          switch (o = ue(s[0], !1), o.style) {
            case "short":
              c += "s";
              break;
            case "long":
              c += "ss";
              break;
            default:
              c += "ss";
              break;
          }
          o["decimal-places"] && (c += "." + De("0", +o["decimal-places"]));
        }
        break;
      case "year":
        switch (o = ue(s[0], !1), o.style) {
          case "short":
            c += "yy";
            break;
          case "long":
            c += "yyyy";
            break;
          default:
            c += "yy";
            break;
        }
        break;
      case "am-pm":
        c += "AM/PM";
        break;
      case "week-of-year":
      // <number:week-of-year> 16.29.17
      case "quarter":
        console.error("Excel does not support ODS format token " + s[3]);
        break;
      case "fill-character":
        s[1] === "/" ? (u = n.slice(p, nr.lastIndex - s[0].length), c += '"' + u.replace(/"/g, '""') + '"*') : s[0].charAt(s[0].length - 2) !== "/" && (p = nr.lastIndex);
        break;
      case "scientific-number":
        o = ue(s[0], !1), c += "0." + De("0", +o["min-decimal-places"] || +o["decimal-places"] || 2) + De("?", +o["decimal-places"] - +o["min-decimal-places"] || 0) + "E" + (He(o["forced-exponent-sign"]) ? "+" : "") + De("0", +o["min-exponent-digits"] || 2);
        break;
      case "fraction":
        o = ue(s[0], !1), +o["min-integer-digits"] ? c += De("0", +o["min-integer-digits"]) : c += "#", c += " ", c += De("?", +o["min-numerator-digits"] || 1), c += "/", +o["denominator-value"] ? c += o["denominator-value"] : c += De("?", +o["min-denominator-digits"] || 1);
        break;
      case "currency-symbol":
        s[1] === "/" ? c += '"' + n.slice(p, nr.lastIndex - s[0].length).replace(/"/g, '""') + '"' : s[0].charAt(s[0].length - 2) !== "/" ? p = nr.lastIndex : c += "$";
        break;
      case "text-properties":
        switch (o = ue(s[0], !1), (o.color || "").toLowerCase().replace("#", "")) {
          case "ff0000":
          case "red":
            c = "[Red]" + c;
            break;
        }
        break;
      case "text-content":
        c += "@";
        break;
      case "map":
        o = ue(s[0], !1), be(o.condition) == "value()>=0" ? c = a[o["apply-style-name"]] + ";" + c : console.error("ODS number format may be incorrect: " + o.condition);
        break;
      case "number":
        if (s[1] === "/") break;
        o = ue(s[0], !1), f = "", f += De("0", +o["min-integer-digits"] || 1), He(o.grouping) && (f = at(De("#", Math.max(0, 4 - f.length)) + f)), (+o["min-decimal-places"] || +o["decimal-places"]) && (f += "."), +o["min-decimal-places"] && (f += De("0", +o["min-decimal-places"] || 1)), +o["decimal-places"] - (+o["min-decimal-places"] || 0) && (f += De("0", +o["decimal-places"] - (+o["min-decimal-places"] || 0))), c += f;
        break;
      case "embedded-text":
        s[1] === "/" ? l == 0 ? c += '"' + n.slice(p, nr.lastIndex - s[0].length).replace(/"/g, '""') + '"' : c = c.slice(0, l) + '"' + n.slice(p, nr.lastIndex - s[0].length).replace(/"/g, '""') + '"' + c.slice(l) : s[0].charAt(s[0].length - 2) !== "/" && (p = nr.lastIndex, l = -+ue(s[0], !1).position || 0);
        break;
    }
  return a;
}
function sc(e, t, r) {
  var a = t || {}, n = nn(e), s = [], i, c, f, o = "", l = 0, p, u, h = {}, m = [], k = {};
  a.dense && (k["!data"] = []);
  var x, d, _ = { value: "" }, g = {}, C = "", O = 0, U = "", P = 0, I = [], N = [], B = -1, M = -1, X = { s: { r: 1e6, c: 1e7 }, e: { r: 0, c: 0 } }, j = 0, oe = r || {}, Z = {}, xe = [], q = {}, ie = 0, ve = 0, K = [], we = 1, Ee = 1, me = [], le = { Names: [], WBProps: {} }, Ae = {}, ke = ["", ""], Se = [], S = {}, L = "", R = 0, b = !1, J = !1, T = 0;
  for (nr.lastIndex = 0, n = Gn(wa(n, "<!--", "-->")); x = nr.exec(n); ) switch (x[3] = x[3].replace(/_[\s\S]*$/, "")) {
    case "table":
    case "工作表":
      x[1] === "/" ? (X.e.c >= X.s.c && X.e.r >= X.s.r ? k["!ref"] = Pe(X) : k["!ref"] = "A1:A1", a.sheetRows > 0 && a.sheetRows <= X.e.r && (k["!fullref"] = k["!ref"], X.e.r = a.sheetRows - 1, k["!ref"] = Pe(X)), xe.length && (k["!merges"] = xe), K.length && (k["!rows"] = K), p.name = p.名称 || p.name, typeof JSON < "u" && JSON.stringify(p), m.push(p.name), h[p.name] = k, J = !1) : x[0].charAt(x[0].length - 2) !== "/" && (p = ue(x[0], !1), B = M = -1, X.s.r = X.s.c = 1e7, X.e.r = X.e.c = 0, k = {}, a.dense && (k["!data"] = []), xe = [], K = [], J = !0);
      break;
    case "table-row-group":
      x[1] === "/" ? --j : ++j;
      break;
    case "table-row":
    case "行":
      if (x[1] === "/") {
        B += we, we = 1;
        break;
      }
      if (u = ue(x[0], !1), u.行号 ? B = u.行号 - 1 : B == -1 && (B = 0), we = +u["number-rows-repeated"] || 1, we < 10) for (T = 0; T < we; ++T) j > 0 && (K[B + T] = { level: j });
      M = -1;
      break;
    case "covered-table-cell":
      if (x[1] !== "/")
        if (++M, _ = ue(x[0], !1), Ee = parseInt(_["number-columns-repeated"] || "1", 10) || 1, a.sheetStubs) {
          for (; Ee-- > 0; )
            a.dense ? (k["!data"][B] || (k["!data"][B] = []), k["!data"][B][M] = { t: "z" }) : k[Oe({ r: B, c: M })] = { t: "z" }, ++M;
          --M;
        } else M += Ee - 1;
      C = "", I = [];
      break;
    /* stub */
    case "table-cell":
    case "数据":
      if (x[0].charAt(x[0].length - 2) === "/")
        ++M, _ = ue(x[0], !1), Ee = parseInt(_["number-columns-repeated"] || "1", 10) || 1, d = {
          t: "z",
          v: null
          /*:: , z:null, w:"",c:[]*/
        }, _.formula && a.cellFormula != !1 && (d.f = l0(be(_.formula))), _["style-name"] && Z[_["style-name"]] && (d.z = Z[_["style-name"]]), (_.数据类型 || _["value-type"]) == "string" && (d.t = "s", d.v = be(_["string-value"] || ""), a.dense ? (k["!data"][B] || (k["!data"][B] = []), k["!data"][B][M] = d) : k[Me(M) + We(B)] = d), M += Ee - 1;
      else if (x[1] !== "/") {
        ++M, C = U = "", O = P = 0, I = [], N = [], Ee = 1;
        var se = we ? B + we - 1 : B;
        if (M > X.e.c && (X.e.c = M), M < X.s.c && (X.s.c = M), B < X.s.r && (X.s.r = B), se > X.e.r && (X.e.r = se), _ = ue(x[0], !1), g = qo(x[0]), Se = [], S = {}, d = {
          t: _.数据类型 || _["value-type"],
          v: null
          /*:: , z:null, w:"",c:[]*/
        }, _["style-name"] && Z[_["style-name"]] && (d.z = Z[_["style-name"]]), a.cellFormula)
          if (_.formula && (_.formula = be(_.formula)), _["number-matrix-columns-spanned"] && _["number-matrix-rows-spanned"] && (ie = parseInt(_["number-matrix-rows-spanned"], 10) || 0, ve = parseInt(_["number-matrix-columns-spanned"], 10) || 0, q = { s: { r: B, c: M }, e: { r: B + ie - 1, c: M + ve - 1 } }, d.F = Pe(q), me.push([q, d.F])), _.formula) d.f = l0(_.formula);
          else for (T = 0; T < me.length; ++T)
            B >= me[T][0].s.r && B <= me[T][0].e.r && M >= me[T][0].s.c && M <= me[T][0].e.c && (d.F = me[T][1]);
        switch ((_["number-columns-spanned"] || _["number-rows-spanned"]) && (ie = parseInt(_["number-rows-spanned"] || "1", 10) || 1, ve = parseInt(_["number-columns-spanned"] || "1", 10) || 1, ie * ve > 1 && (q = { s: { r: B, c: M }, e: { r: B + ie - 1, c: M + ve - 1 } }, xe.push(q))), _["number-columns-repeated"] && (Ee = parseInt(_["number-columns-repeated"], 10)), d.t) {
          case "boolean":
            d.t = "b", d.v = He(_["boolean-value"]) || +_["boolean-value"] >= 1;
            break;
          case "float":
            d.t = "n", d.v = parseFloat(_.value), a.cellDates && d.z && Jr(d.z) && (d.v = dt(d.v + (le.WBProps.date1904 ? 1462 : 0)), d.t = typeof d.v == "number" ? "n" : "d");
            break;
          case "percentage":
            d.t = "n", d.v = parseFloat(_.value);
            break;
          case "currency":
            d.t = "n", d.v = parseFloat(_.value);
            break;
          case "date":
            d.t = "d", d.v = xr(_["date-value"], le.WBProps.date1904), a.cellDates || (d.t = "n", d.v = fr(d.v, le.WBProps.date1904)), d.z || (d.z = "m/d/yy");
            break;
          /* NOTE: for `time`, Excel ODS export incorrectly uses durations relative to 1900 epoch even if 1904 is specified */
          case "time":
            d.t = "n", d.v = Do(_["time-value"]) / 86400, a.cellDates && (d.v = dt(d.v), d.t = typeof d.v == "number" ? "n" : "d"), d.z || (d.z = "HH:MM:SS");
            break;
          case "number":
            d.t = "n", d.v = parseFloat(_.数据数值);
            break;
          default:
            if (d.t === "string" || d.t === "text" || !d.t)
              d.t = "s", _["string-value"] != null && (C = be(_["string-value"]), I = []);
            else throw new Error("Unsupported value type " + d.t);
        }
      } else {
        if (b = !1, g["calcext:value-type"] == "error" && ur[C] != null && (d.t = "e", d.w = C, d.v = ur[C]), d.t === "s" && (d.v = C || "", I.length && (d.R = I), b = O == 0), Ae.Target && (d.l = Ae), Se.length > 0 && (d.c = Se, Se = []), C && a.cellText !== !1 && (d.w = C), b && (d.t = "z", delete d.v), (!b || a.sheetStubs) && !(a.sheetRows && a.sheetRows <= B))
          for (var ce = 0; ce < we; ++ce) {
            if (Ee = parseInt(_["number-columns-repeated"] || "1", 10), a.dense)
              for (k["!data"][B + ce] || (k["!data"][B + ce] = []), k["!data"][B + ce][M] = ce == 0 ? d : ir(d); --Ee > 0; ) k["!data"][B + ce][M + Ee] = ir(d);
            else
              for (k[Oe({ r: B + ce, c: M })] = d; --Ee > 0; ) k[Oe({ r: B + ce, c: M + Ee })] = ir(d);
            X.e.c <= M && (X.e.c = M);
          }
        Ee = parseInt(_["number-columns-repeated"] || "1", 10), M += Ee - 1, Ee = 0, d = {
          /*:: t:"", v:null, z:null, w:"",c:[]*/
        }, C = "", I = [];
      }
      Ae = {};
      break;
    // 9.1.4 <table:table-cell>
    /* pure state */
    case "document":
    // TODO: <office:document> is the root for FODS
    case "document-content":
    case "电子表格文档":
    // 3.1.3.2 <office:document-content>
    case "spreadsheet":
    case "主体":
    // 3.7 <office:spreadsheet>
    case "scripts":
    // 3.12 <office:scripts>
    case "styles":
    // TODO <office:styles>
    case "font-face-decls":
    // 3.14 <office:font-face-decls>
    case "master-styles":
      if (x[1] === "/") {
        if ((i = s.pop())[0] !== x[3]) throw "Bad state: " + i;
      } else x[0].charAt(x[0].length - 2) !== "/" && s.push([x[3], !0]);
      break;
    case "annotation":
      if (x[1] === "/") {
        if ((i = s.pop())[0] !== x[3]) throw "Bad state: " + i;
        S.t = C, I.length && (S.R = I), S.a = L, Se.push(S), C = U, O = P, I = N;
      } else if (x[0].charAt(x[0].length - 2) !== "/") {
        s.push([x[3], !1]);
        var re = ue(x[0], !0);
        re.display && He(re.display) || (Se.hidden = !0), U = C, P = O, N = I, C = "", O = 0, I = [];
      }
      L = "", R = 0;
      break;
    case "creator":
      x[1] === "/" ? L = n.slice(R, x.index) : R = x.index + x[0].length;
      break;
    /* ignore state */
    case "meta":
    case "元数据":
    // TODO: <office:meta> <uof:元数据> FODS/UOF
    case "settings":
    // TODO: <office:settings>
    case "config-item-set":
    // TODO: <office:config-item-set>
    case "config-item-map-indexed":
    // TODO: <office:config-item-map-indexed>
    case "config-item-map-entry":
    // TODO: <office:config-item-map-entry>
    case "config-item-map-named":
    // TODO: <office:config-item-map-entry>
    case "shapes":
    // 9.2.8 <table:shapes>
    case "frame":
    // 10.4.2 <draw:frame>
    case "text-box":
    // 10.4.3 <draw:text-box>
    case "image":
    // 10.4.4 <draw:image>
    case "data-pilot-tables":
    // 9.6.2 <table:data-pilot-tables>
    case "list-style":
    // 16.30 <text:list-style>
    case "form":
    // 13.13 <form:form>
    case "dde-links":
    // 9.8 <table:dde-links>
    case "event-listeners":
    // TODO
    case "chart":
      if (x[1] === "/") {
        if ((i = s.pop())[0] !== x[3]) throw "Bad state: " + i;
      } else x[0].charAt(x[0].length - 2) !== "/" && s.push([x[3], !1]);
      C = "", O = 0, I = [];
      break;
    case "scientific-number":
    // <number:scientific-number>
    case "currency-symbol":
    // <number:currency-symbol>
    case "fill-character":
      break;
    case "text-style":
    // 16.27.25 <number:text-style>
    case "boolean-style":
    // 16.27.23 <number:boolean-style>
    case "number-style":
    // 16.27.2 <number:number-style>
    case "currency-style":
    // 16.29.8 <number:currency-style>
    case "percentage-style":
    // 16.27.9 <number:percentage-style>
    case "date-style":
    // 16.27.10 <number:date-style>
    case "time-style":
      if (x[1] === "/") {
        var ge = nr.lastIndex;
        nc(n.slice(f, nr.lastIndex), t, oe), nr.lastIndex = ge;
      } else x[0].charAt(x[0].length - 2) !== "/" && (f = nr.lastIndex - x[0].length);
      break;
    case "script":
      break;
    // 3.13 <office:script>
    case "libraries":
      break;
    // TODO: <ooo:libraries>
    case "automatic-styles":
      break;
    // 3.15.3 <office:automatic-styles>
    case "default-style":
    // TODO: <style:default-style>
    case "page-layout":
      break;
    // TODO: <style:page-layout>
    case "style":
      {
        var pe = ue(x[0], !1);
        pe.family == "table-cell" && oe[pe["data-style-name"]] && (Z[pe.name] = oe[pe["data-style-name"]]);
      }
      break;
    case "map":
      break;
    // 16.3 <style:map>
    case "font-face":
      break;
    // 16.21 <style:font-face>
    case "paragraph-properties":
      break;
    // 17.6 <style:paragraph-properties>
    case "table-properties":
      break;
    // 17.15 <style:table-properties>
    case "table-column-properties":
      break;
    // 17.16 <style:table-column-properties>
    case "table-row-properties":
      break;
    // 17.17 <style:table-row-properties>
    case "table-cell-properties":
      break;
    // 17.18 <style:table-cell-properties>
    case "number":
      break;
    case "fraction":
      break;
    // TODO 16.27.6 <number:fraction>
    case "day":
    // 16.27.11 <number:day>
    case "month":
    // 16.27.12 <number:month>
    case "year":
    // 16.27.13 <number:year>
    case "era":
    // 16.27.14 <number:era>
    case "day-of-week":
    // 16.27.15 <number:day-of-week>
    case "week-of-year":
    // 16.27.16 <number:week-of-year>
    case "quarter":
    // 16.27.17 <number:quarter>
    case "hours":
    // 16.27.19 <number:hours>
    case "minutes":
    // 16.27.20 <number:minutes>
    case "seconds":
    // 16.27.21 <number:seconds>
    case "am-pm":
      break;
    case "boolean":
      break;
    // 16.27.24 <number:boolean>
    case "text":
      if (x[0].slice(-2) === "/>") break;
      if (x[1] === "/") switch (s[s.length - 1][0]) {
        case "number-style":
        case "date-style":
        case "time-style":
          o += n.slice(l, x.index);
          break;
      }
      else l = x.index + x[0].length;
      break;
    case "named-range":
      c = ue(x[0], !1), ke = wn(c["cell-range-address"]);
      var Te = { Name: c.name, Ref: ke[0] + "!" + ke[1] };
      J && (Te.Sheet = m.length), le.Names.push(Te);
      break;
    case "text-content":
      break;
    // 16.27.27 <number:text-content>
    case "text-properties":
      break;
    // 16.27.27 <style:text-properties>
    case "embedded-text":
      break;
    // 16.27.4 <number:embedded-text>
    case "body":
    case "电子表格":
      break;
    // 3.3 16.9.6 19.726.3
    case "forms":
      break;
    // 12.25.2 13.2
    case "table-column":
      break;
    // 9.1.6 <table:table-column>
    case "table-header-rows":
      break;
    // 9.1.7 <table:table-header-rows>
    case "table-rows":
      break;
    // 9.1.12 <table:table-rows>
    /* TODO: outline levels */
    case "table-column-group":
      break;
    // 9.1.10 <table:table-column-group>
    case "table-header-columns":
      break;
    // 9.1.11 <table:table-header-columns>
    case "table-columns":
      break;
    // 9.1.12 <table:table-columns>
    case "null-date":
      c = ue(x[0], !1), c["date-value"] === "1904-01-01" && (le.WBProps.date1904 = !0);
      break;
    case "graphic-properties":
      break;
    // 17.21 <style:graphic-properties>
    case "calculation-settings":
      break;
    // 9.4.1 <table:calculation-settings>
    case "named-expressions":
      break;
    // 9.4.11 <table:named-expressions>
    case "label-range":
      break;
    // 9.4.9 <table:label-range>
    case "label-ranges":
      break;
    // 9.4.10 <table:label-ranges>
    case "named-expression":
      break;
    // 9.4.13 <table:named-expression>
    case "sort":
      break;
    // 9.4.19 <table:sort>
    case "sort-by":
      break;
    // 9.4.20 <table:sort-by>
    case "sort-groups":
      break;
    // 9.4.22 <table:sort-groups>
    case "tab":
      break;
    // 6.1.4 <text:tab>
    case "line-break":
      break;
    // 6.1.5 <text:line-break>
    case "span":
      break;
    // 6.1.7 <text:span>
    case "p":
    case "文本串":
      if (["master-styles"].indexOf(s[s.length - 1][0]) > -1) break;
      if (x[1] === "/" && (!_ || !_["string-value"])) {
        var Be = Am(n.slice(O, x.index));
        C = (C.length > 0 ? C + `
` : "") + Be[0];
      } else x[0].slice(-2) == "/>" ? C += `
` : (ue(x[0], !1), O = x.index + x[0].length);
      break;
    // <text:p>
    case "s":
      break;
    // <text:s>
    case "database-range":
      if (x[1] === "/") break;
      try {
        ke = wn(ue(x[0])["target-range-address"]), h[ke[0]]["!autofilter"] = { ref: ke[1] };
      } catch {
      }
      break;
    case "date":
      break;
    // <*:date>
    case "object":
      break;
    // 10.4.6.2 <draw:object>
    case "title":
    case "标题":
      break;
    // <*:title> OR <uof:标题>
    case "desc":
      break;
    // <*:desc>
    case "binary-data":
      break;
    // 10.4.5 TODO: b64 blob
    /* 9.2 Advanced Tables */
    case "table-source":
      break;
    // 9.2.6
    case "scenario":
      break;
    // 9.2.6
    case "iteration":
      break;
    // 9.4.3 <table:iteration>
    case "content-validations":
      break;
    // 9.4.4 <table:
    case "content-validation":
      break;
    // 9.4.5 <table:
    case "help-message":
      break;
    // 9.4.6 <table:
    case "error-message":
      break;
    // 9.4.7 <table:
    case "database-ranges":
      break;
    // 9.4.14 <table:database-ranges>
    /* 9.5 Filters */
    case "filter":
      break;
    // 9.5.2 <table:filter>
    case "filter-and":
      break;
    // 9.5.3 <table:filter-and>
    case "filter-or":
      break;
    // 9.5.4 <table:filter-or>
    case "filter-condition":
      break;
    // 9.5.5 <table:filter-condition>
    case "filter-set-item":
      break;
    // 9.5.6 <table:filter-condition>
    case "list-level-style-bullet":
      break;
    // 16.31 <text:
    case "list-level-style-number":
      break;
    // 16.32 <text:
    case "list-level-properties":
      break;
    // 17.19 <style:
    /* 7.3 Document Fields */
    case "sender-firstname":
    // 7.3.6.2
    case "sender-lastname":
    // 7.3.6.3
    case "sender-initials":
    // 7.3.6.4
    case "sender-title":
    // 7.3.6.5
    case "sender-position":
    // 7.3.6.6
    case "sender-email":
    // 7.3.6.7
    case "sender-phone-private":
    // 7.3.6.8
    case "sender-fax":
    // 7.3.6.9
    case "sender-company":
    // 7.3.6.10
    case "sender-phone-work":
    // 7.3.6.11
    case "sender-street":
    // 7.3.6.12
    case "sender-city":
    // 7.3.6.13
    case "sender-postal-code":
    // 7.3.6.14
    case "sender-country":
    // 7.3.6.15
    case "sender-state-or-province":
    // 7.3.6.16
    case "author-name":
    // 7.3.7.1
    case "author-initials":
    // 7.3.7.2
    case "chapter":
    // 7.3.8
    case "file-name":
    // 7.3.9
    case "template-name":
    // 7.3.9
    case "sheet-name":
      break;
    case "event-listener":
      break;
    /* TODO: FODS Properties */
    case "initial-creator":
    case "creation-date":
    case "print-date":
    case "generator":
    case "document-statistic":
    case "user-defined":
    case "editing-duration":
    case "editing-cycles":
      break;
    /* TODO: FODS Config */
    case "config-item":
      break;
    /* TODO: style tokens */
    case "page-number":
      break;
    // TODO <text:page-number>
    case "page-count":
      break;
    // TODO <text:page-count>
    case "time":
      break;
    // TODO <text:time>
    /* 9.3 Advanced Table Cells */
    case "cell-range-source":
      break;
    // 9.3.1 <table:
    case "detective":
      break;
    // 9.3.2 <table:
    case "operation":
      break;
    // 9.3.3 <table:
    case "highlighted-range":
      break;
    // 9.3.4 <table:
    /* 9.6 Data Pilot Tables <table: */
    case "data-pilot-table":
    // 9.6.3
    case "source-cell-range":
    // 9.6.5
    case "source-service":
    // 9.6.6
    case "data-pilot-field":
    // 9.6.7
    case "data-pilot-level":
    // 9.6.8
    case "data-pilot-subtotals":
    // 9.6.9
    case "data-pilot-subtotal":
    // 9.6.10
    case "data-pilot-members":
    // 9.6.11
    case "data-pilot-member":
    // 9.6.12
    case "data-pilot-display-info":
    // 9.6.13
    case "data-pilot-sort-info":
    // 9.6.14
    case "data-pilot-layout-info":
    // 9.6.15
    case "data-pilot-field-reference":
    // 9.6.16
    case "data-pilot-groups":
    // 9.6.17
    case "data-pilot-group":
    // 9.6.18
    case "data-pilot-group-member":
      break;
    /* 10.3 Drawing Shapes */
    case "rect":
      break;
    /* 14.6 DDE Connections */
    case "dde-connection-decls":
    // 14.6.2 <text:
    case "dde-connection-decl":
    // 14.6.3 <text:
    case "dde-link":
    // 14.6.4 <table:
    case "dde-source":
      break;
    case "properties":
      break;
    // 13.7 <form:properties>
    case "property":
      break;
    // 13.8 <form:property>
    case "a":
      if (x[1] !== "/") {
        if (Ae = ue(x[0], !1), !Ae.href) break;
        Ae.Target = be(Ae.href), delete Ae.href, Ae.Target.charAt(0) == "#" && Ae.Target.indexOf(".") > -1 ? (ke = wn(Ae.Target.slice(1)), Ae.Target = "#" + ke[0] + "!" + ke[1]) : Ae.Target.match(/^\.\.[\\\/]/) && (Ae.Target = Ae.Target.slice(3));
      }
      break;
    /* non-standard */
    case "table-protection":
      break;
    case "data-pilot-grand-total":
      break;
    // <table:
    case "office-document-common-attrs":
      break;
    // bare
    default:
      switch (x[2]) {
        case "dc:":
        // TODO: properties
        case "calcext:":
        // ignore undocumented extensions
        case "loext:":
        // ignore undocumented extensions
        case "ooo:":
        // ignore undocumented extensions
        case "chartooo:":
        // ignore undocumented extensions
        case "draw:":
        // TODO: drawing
        case "style:":
        // TODO: styles
        case "chart:":
        // TODO: charts
        case "form:":
        // TODO: forms
        case "uof:":
        // TODO: uof
        case "表:":
        // TODO: uof
        case "字:":
          break;
        default:
          if (a.WTF) throw new Error(x);
      }
  }
  var $e = {
    Sheets: h,
    SheetNames: m,
    Workbook: le
  };
  return a.bookSheets && delete /*::(*/
  $e.Sheets, $e;
}
function m0(e, t) {
  t = t || {}, Wr(e, "META-INF/manifest.xml") && zl(tr(e, "META-INF/manifest.xml"), t);
  var r = Sr(e, "styles.xml"), a = r && nc(Ve(r)), n = Sr(e, "content.xml");
  if (!n) throw new Error("Missing content.xml in ODS / UOF file");
  var s = sc(Ve(n), t, a);
  return Wr(e, "meta.xml") && (s.Props = ki(tr(e, "meta.xml"))), s.bookType = "ods", s;
}
function g0(e, t) {
  var r = sc(e, t);
  return r.bookType = "fods", r;
}
var dr = (function() {
  try {
    return typeof Uint8Array > "u" || typeof Uint8Array.prototype.subarray > "u" ? "slice" : typeof Buffer < "u" ? typeof Buffer.prototype.subarray > "u" ? "slice" : (typeof Buffer.from == "function" ? Buffer.from([72, 62]) : new Buffer([72, 62])) instanceof Uint8Array ? "subarray" : "slice" : "subarray";
  } catch {
    return "slice";
  }
})();
function _a(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function $t(e) {
  return typeof TextDecoder < "u" ? new TextDecoder().decode(e) : Ve(ct(e));
}
function ic(e) {
  for (var t = 0, r = 0; r < e.length; ++r)
    t += e[r].length;
  var a = new Uint8Array(t), n = 0;
  for (r = 0; r < e.length; ++r) {
    var s = e[r], i = s.length;
    if (i < 250)
      for (var c = 0; c < i; ++c)
        a[n++] = s[c];
    else
      a.set(s, n), n += i;
  }
  return a;
}
function ha(e) {
  return e -= e >> 1 & 1431655765, e = (e & 858993459) + (e >> 2 & 858993459), (e + (e >> 4) & 252645135) * 16843009 >>> 24;
}
function Fm(e, t) {
  for (var r = (e[t + 15] & 127) << 7 | e[t + 14] >> 1, a = e[t + 14] & 1, n = t + 13; n >= t; --n)
    a = a * 256 + e[n];
  return (e[t + 15] & 128 ? -a : a) * Math.pow(10, r - 6176);
}
function tn(e, t) {
  var r = t.l, a = e[r] & 127;
  e:
    if (e[r++] >= 128 && (a |= (e[r] & 127) << 7, e[r++] < 128 || (a |= (e[r] & 127) << 14, e[r++] < 128) || (a |= (e[r] & 127) << 21, e[r++] < 128) || (a += (e[r] & 127) * Math.pow(2, 28), ++r, e[r++] < 128) || (a += (e[r] & 127) * Math.pow(2, 35), ++r, e[r++] < 128) || (a += (e[r] & 127) * Math.pow(2, 42), ++r, e[r++] < 128)))
      break e;
  return t.l = r, a;
}
function Ie(e) {
  var t = 0, r = e[t] & 127;
  return e[t++] < 128 || (r |= (e[t] & 127) << 7, e[t++] < 128) || (r |= (e[t] & 127) << 14, e[t++] < 128) || (r |= (e[t] & 127) << 21, e[t++] < 128) || (r |= (e[t] & 15) << 28), r;
}
function ye(e) {
  for (var t = [], r = { l: 0 }; r.l < e.length; ) {
    var a = r.l, n = tn(e, r), s = n & 7;
    n = n / 8 | 0;
    var i, c = r.l;
    switch (s) {
      case 0:
        {
          for (; e[c++] >= 128; )
            ;
          i = e[dr](r.l, c), r.l = c;
        }
        break;
      case 1:
        i = e[dr](c, c + 8), r.l = c + 8;
        break;
      case 2:
        {
          var f = tn(e, r);
          i = e[dr](r.l, r.l + f), r.l += f;
        }
        break;
      case 5:
        i = e[dr](c, c + 4), r.l = c + 4;
        break;
      default:
        throw new Error("PB Type ".concat(s, " for Field ").concat(n, " at offset ").concat(a));
    }
    var o = { data: i, type: s };
    t[n] == null && (t[n] = []), t[n].push(o);
  }
  return t;
}
function hn(e, t) {
  return e?.map(function(r) {
    return t(r.data);
  }) || [];
}
function Sm(e) {
  for (var t, r = [], a = { l: 0 }; a.l < e.length; ) {
    var n = tn(e, a), s = ye(e[dr](a.l, a.l + n));
    a.l += n;
    var i = {
      id: Ie(s[1][0].data),
      messages: []
    };
    s[2].forEach(function(c) {
      var f = ye(c.data), o = Ie(f[3][0].data);
      i.messages.push({
        meta: f,
        data: e[dr](a.l, a.l + o)
      }), a.l += o;
    }), (t = s[3]) != null && t[0] && (i.merge = Ie(s[3][0].data) >>> 0 > 0), r.push(i);
  }
  return r;
}
function ym(e, t) {
  if (e != 0)
    throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var r = { l: 0 }, a = tn(t, r), n = [], s = r.l; s < t.length; ) {
    var i = t[s] & 3;
    if (i == 0) {
      var c = t[s++] >> 2;
      if (c < 60)
        ++c;
      else {
        var f = c - 59;
        c = t[s], f > 1 && (c |= t[s + 1] << 8), f > 2 && (c |= t[s + 2] << 16), f > 3 && (c |= t[s + 3] << 24), c >>>= 0, c++, s += f;
      }
      n.push(t[dr](s, s + c)), s += c;
      continue;
    } else {
      var o = 0, l = 0;
      if (i == 1 ? (l = (t[s] >> 2 & 7) + 4, o = (t[s++] & 224) << 3, o |= t[s++]) : (l = (t[s++] >> 2) + 1, i == 2 ? (o = t[s] | t[s + 1] << 8, s += 2) : (o = (t[s] | t[s + 1] << 8 | t[s + 2] << 16 | t[s + 3] << 24) >>> 0, s += 4)), o == 0)
        throw new Error("Invalid offset 0");
      for (var p = n.length - 1, u = o; p >= 0 && u >= n[p].length; )
        u -= n[p].length, --p;
      if (p < 0)
        if (u == 0)
          u = n[p = 0].length;
        else
          throw new Error("Invalid offset beyond length");
      if (l < u)
        n.push(n[p][dr](n[p].length - u, n[p].length - u + l));
      else {
        for (u > 0 && (n.push(n[p][dr](n[p].length - u)), l -= u), ++p; l >= n[p].length; )
          n.push(n[p]), l -= n[p].length, ++p;
        l && n.push(n[p][dr](0, l));
      }
      n.length > 25 && (n = [ic(n)]);
    }
  }
  for (var h = 0, m = 0; m < n.length; ++m)
    h += n[m].length;
  if (h != a)
    throw new Error("Unexpected length: ".concat(h, " != ").concat(a));
  return n;
}
function Cm(e) {
  Array.isArray(e) && (e = new Uint8Array(e));
  for (var t = [], r = 0; r < e.length; ) {
    var a = e[r++], n = e[r] | e[r + 1] << 8 | e[r + 2] << 16;
    r += 3, t.push.apply(t, ym(a, e[dr](r, r + n))), r += n;
  }
  if (r !== e.length)
    throw new Error("data is not a valid framed stream!");
  return t.length == 1 ? t[0] : ic(t);
}
var bm = function() {
  return { sst: [], rsst: [], ofmt: [], nfmt: [], fmla: [], ferr: [], cmnt: [] };
};
function cc(e, t, r, a, n) {
  var s, i, c, f, o = t & 255, l = t >> 8, p = l >= 5 ? n : a;
  e:
    if (r & (l > 4 ? 8 : 4) && e.t == "n" && o == 7) {
      var u = (s = p[7]) != null && s[0] ? Ie(p[7][0].data) : -1;
      if (u == -1)
        break e;
      var h = (i = p[15]) != null && i[0] ? Ie(p[15][0].data) : -1, m = (c = p[16]) != null && c[0] ? Ie(p[16][0].data) : -1, k = (f = p[40]) != null && f[0] ? Ie(p[40][0].data) : -1, x = e.v, d = x;
      r:
        if (k) {
          if (x == 0) {
            h = m = 2;
            break r;
          }
          x >= 604800 ? h = 1 : x >= 86400 ? h = 2 : x >= 3600 ? h = 4 : x >= 60 ? h = 8 : x >= 1 ? h = 16 : h = 32, Math.floor(x) != x ? m = 32 : x % 60 ? m = 16 : x % 3600 ? m = 8 : x % 86400 ? m = 4 : x % 604800 && (m = 2), m < h && (m = h);
        }
      if (h == -1 || m == -1)
        break e;
      var _ = [], g = [];
      h == 1 && (d = x / 604800, m == 1 ? g.push('d"d"') : (d |= 0, x -= 604800 * d), _.push(d + (u == 2 ? " week" + (d == 1 ? "" : "s") : u == 1 ? "w" : ""))), h <= 2 && m >= 2 && (d = x / 86400, m > 2 && (d |= 0, x -= 86400 * d), g.push('d"d"'), _.push(d + (u == 2 ? " day" + (d == 1 ? "" : "s") : u == 1 ? "d" : ""))), h <= 4 && m >= 4 && (d = x / 3600, m > 4 && (d |= 0, x -= 3600 * d), g.push((h >= 4 ? "[h]" : "h") + '"h"'), _.push(d + (u == 2 ? " hour" + (d == 1 ? "" : "s") : u == 1 ? "h" : ""))), h <= 8 && m >= 8 && (d = x / 60, m > 8 && (d |= 0, x -= 60 * d), g.push((h >= 8 ? "[m]" : "m") + '"m"'), u == 0 ? _.push((h == 8 && m == 8 || d >= 10 ? "" : "0") + d) : _.push(d + (u == 2 ? " minute" + (d == 1 ? "" : "s") : u == 1 ? "m" : ""))), h <= 16 && m >= 16 && (d = x, m > 16 && (d |= 0, x -= d), g.push((h >= 16 ? "[s]" : "s") + '"s"'), u == 0 ? _.push((m == 16 && h == 16 || d >= 10 ? "" : "0") + d) : _.push(d + (u == 2 ? " second" + (d == 1 ? "" : "s") : u == 1 ? "s" : ""))), m >= 32 && (d = Math.round(1e3 * x), h < 32 && g.push('.000"ms"'), u == 0 ? _.push((d >= 100 ? "" : d >= 10 ? "0" : "00") + d) : _.push(d + (u == 2 ? " millisecond" + (d == 1 ? "" : "s") : u == 1 ? "ms" : ""))), e.w = _.join(u == 0 ? ":" : " "), e.z = g.join(u == 0 ? '":"' : " "), u == 0 && (e.w = e.w.replace(/:(\d\d\d)$/, ".$1"));
    }
}
function Pm(e, t, r, a) {
  var n = _a(e), s = n.getUint32(4, !0), i = -1, c = -1, f = -1, o = NaN, l = 0, p = new Date(Date.UTC(2001, 0, 1)), u = r > 1 ? 12 : 8;
  s & 2 && (f = n.getUint32(u, !0), u += 4), u += ha(s & (r > 1 ? 3468 : 396)) * 4, s & 512 && (i = n.getUint32(u, !0), u += 4), u += ha(s & (r > 1 ? 12288 : 4096)) * 4, s & 16 && (c = n.getUint32(u, !0), u += 4), s & 32 && (o = n.getFloat64(u, !0), u += 8), s & 64 && (p.setTime(p.getTime() + (l = n.getFloat64(u, !0)) * 1e3), u += 8), r > 1 && (s = n.getUint32(8, !0) >>> 16, s & 255 && (f == -1 && (f = n.getUint32(u, !0)), u += 4));
  var h, m = e[r >= 4 ? 1 : 2];
  switch (m) {
    case 0:
      return;
    case 2:
      h = { t: "n", v: o };
      break;
    case 3:
      h = { t: "s", v: t.sst[c] };
      break;
    case 5:
      a?.cellDates ? h = { t: "d", v: p } : h = { t: "n", v: l / 86400 + 35430, z: _e[14] };
      break;
    case 6:
      h = { t: "b", v: o > 0 };
      break;
    case 7:
      h = { t: "n", v: o };
      break;
    case 8:
      h = { t: "e", v: 0 };
      break;
    case 9:
      if (i > -1) {
        var k = t.rsst[i];
        h = { t: "s", v: k.v }, k.l && (h.l = { Target: k.l });
      } else
        throw new Error("Unsupported cell type ".concat(e[dr](0, 4)));
      break;
    default:
      throw new Error("Unsupported cell type ".concat(e[dr](0, 4)));
  }
  return f > -1 && cc(h, m | r << 8, s, t.ofmt[f], t.nfmt[f]), m == 7 && (h.v /= 86400), h;
}
function Nm(e, t, r) {
  var a = _a(e);
  a.getUint32(4, !0);
  var n = a.getUint32(8, !0), s = 12, i = -1, c = -1, f = -1, o = NaN, l = NaN, p = 0, u = new Date(Date.UTC(2001, 0, 1));
  n & 1 && (o = Fm(e, s), s += 16), n & 2 && (l = a.getFloat64(s, !0), s += 8), n & 4 && (u.setTime(u.getTime() + (p = a.getFloat64(s, !0)) * 1e3), s += 8), n & 8 && (c = a.getUint32(s, !0), s += 4), n & 16 && (i = a.getUint32(s, !0), s += 4), s += ha(n & 480) * 4, n & 512 && (a.getUint32(s, !0), s += 4), s += ha(n & 1024) * 4, n & 2048 && (a.getUint32(s, !0), s += 4);
  var h, m = e[1];
  switch (m) {
    case 0:
      h = { t: "z" };
      break;
    case 2:
      h = { t: "n", v: o };
      break;
    case 3:
      h = { t: "s", v: t.sst[c] };
      break;
    case 5:
      r?.cellDates ? h = { t: "d", v: u } : h = { t: "n", v: p / 86400 + 35430, z: _e[14] };
      break;
    case 6:
      h = { t: "b", v: l > 0 };
      break;
    case 7:
      h = { t: "n", v: l };
      break;
    case 8:
      h = { t: "e", v: 0 };
      break;
    case 9:
      if (i > -1) {
        var k = t.rsst[i];
        h = { t: "s", v: k.v }, k.l && (h.l = { Target: k.l });
      } else
        throw new Error("Unsupported cell type ".concat(e[1], " : ").concat(n & 31, " : ").concat(e[dr](0, 4)));
      break;
    case 10:
      h = { t: "n", v: o };
      break;
    default:
      throw new Error("Unsupported cell type ".concat(e[1], " : ").concat(n & 31, " : ").concat(e[dr](0, 4)));
  }
  if (s += ha(n & 4096) * 4, n & 516096 && (f == -1 && (f = a.getUint32(s, !0)), s += 4), n & 524288) {
    var x = a.getUint32(s, !0);
    s += 4, t.cmnt[x] && (h.c = Om(t.cmnt[x]));
  }
  return f > -1 && cc(h, m | 1280, n >> 13, t.ofmt[f], t.nfmt[f]), m == 7 && (h.v /= 86400), h;
}
function Dm(e, t, r) {
  switch (e[0]) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
      return Pm(e, t, e[0], r);
    case 5:
      return Nm(e, t, r);
    default:
      throw new Error("Unsupported payload version ".concat(e[0]));
  }
}
function lr(e) {
  var t = ye(e);
  return Ie(t[1][0].data);
}
function Et(e, t) {
  var r = ye(t.data), a = Ie(r[1][0].data), n = r[3], s = [];
  return (n || []).forEach(function(i) {
    var c, f, o = ye(i.data);
    if (o[1]) {
      var l = Ie(o[1][0].data) >>> 0;
      switch (a) {
        case 1:
          s[l] = $t(o[3][0].data);
          break;
        case 8:
          {
            var p = e[lr(o[9][0].data)][0], u = ye(p.data), h = e[lr(u[1][0].data)][0], m = Ie(h.meta[1][0].data);
            if (m != 2001)
              throw new Error("2000 unexpected reference to ".concat(m));
            var k = ye(h.data), x = { v: k[3].map(function(g) {
              return $t(g.data);
            }).join("") };
            s[l] = x;
            e:
              if ((c = k?.[11]) != null && c[0]) {
                var d = (f = ye(k[11][0].data)) == null ? void 0 : f[1];
                if (!d)
                  break e;
                d.forEach(function(g) {
                  var C, O, U, P = ye(g.data);
                  if ((C = P[2]) != null && C[0]) {
                    var I = e[lr((O = P[2]) == null ? void 0 : O[0].data)][0], N = Ie(I.meta[1][0].data);
                    switch (N) {
                      case 2032:
                        var B = ye(I.data);
                        (U = B?.[2]) != null && U[0] && !x.l && (x.l = $t(B[2][0].data));
                        break;
                      case 2039:
                        break;
                      default:
                        console.log("unrecognized ObjectAttribute type ".concat(N));
                    }
                  }
                });
              }
          }
          break;
        case 2:
          s[l] = ye(o[6][0].data);
          break;
        case 3:
          s[l] = ye(o[5][0].data);
          break;
        case 10:
          {
            var _ = e[lr(o[10][0].data)][0];
            s[l] = fc(e, _.data);
          }
          break;
        default:
          throw a;
      }
    }
  }), s;
}
function Rm(e, t) {
  var r, a, n, s, i, c, f, o, l, p, u, h, m, k, x = ye(e), d = Ie(x[1][0].data) >>> 0, _ = Ie(x[2][0].data) >>> 0, g = ((a = (r = x[8]) == null ? void 0 : r[0]) == null ? void 0 : a.data) && Ie(x[8][0].data) > 0 || !1, C, O;
  if ((s = (n = x[7]) == null ? void 0 : n[0]) != null && s.data && t != 0)
    C = (c = (i = x[7]) == null ? void 0 : i[0]) == null ? void 0 : c.data, O = (o = (f = x[6]) == null ? void 0 : f[0]) == null ? void 0 : o.data;
  else if ((p = (l = x[4]) == null ? void 0 : l[0]) != null && p.data && t != 1)
    C = (h = (u = x[4]) == null ? void 0 : u[0]) == null ? void 0 : h.data, O = (k = (m = x[3]) == null ? void 0 : m[0]) == null ? void 0 : k.data;
  else
    throw "NUMBERS Tile missing ".concat(t, " cell storage");
  for (var U = g ? 4 : 1, P = _a(C), I = [], N = 0; N < C.length / 2; ++N) {
    var B = P.getUint16(N * 2, !0);
    B < 65535 && I.push([N, B]);
  }
  if (I.length != _)
    throw "Expected ".concat(_, " cells, found ").concat(I.length);
  var M = [];
  for (N = 0; N < I.length - 1; ++N)
    M[I[N][0]] = O[dr](I[N][1] * U, I[N + 1][1] * U);
  return I.length >= 1 && (M[I[I.length - 1][0]] = O[dr](I[I.length - 1][1] * U)), { R: d, cells: M };
}
function Im(e, t) {
  var r, a = ye(t.data), n = -1;
  (r = a?.[7]) != null && r[0] && (Ie(a[7][0].data) >>> 0 ? n = 1 : n = 0);
  var s = hn(a[5], function(i) {
    return Rm(i, n);
  });
  return {
    nrows: Ie(a[4][0].data) >>> 0,
    data: s.reduce(function(i, c) {
      return i[c.R] || (i[c.R] = []), c.cells.forEach(function(f, o) {
        if (i[c.R][o])
          throw new Error("Duplicate cell r=".concat(c.R, " c=").concat(o));
        i[c.R][o] = f;
      }), i;
    }, [])
  };
}
function fc(e, t) {
  var r, a, n, s, i, c, f, o, l, p, u = { t: "", a: "" }, h = ye(t);
  if ((a = (r = h?.[1]) == null ? void 0 : r[0]) != null && a.data && (u.t = $t((s = (n = h?.[1]) == null ? void 0 : n[0]) == null ? void 0 : s.data) || ""), (c = (i = h?.[3]) == null ? void 0 : i[0]) != null && c.data) {
    var m = e[lr((o = (f = h?.[3]) == null ? void 0 : f[0]) == null ? void 0 : o.data)][0], k = ye(m.data);
    (p = (l = k[1]) == null ? void 0 : l[0]) != null && p.data && (u.a = $t(k[1][0].data));
  }
  return h?.[4] && (u.replies = [], h[4].forEach(function(x) {
    var d = e[lr(x.data)][0];
    u.replies.push(fc(e, d.data));
  })), u;
}
function Om(e) {
  var t = [];
  return t.push({ t: e.t || "", a: e.a, T: e.replies && e.replies.length > 0 }), e.replies && e.replies.forEach(function(r) {
    t.push({ t: r.t || "", a: r.a, T: !0 });
  }), t;
}
function Mm(e, t, r, a) {
  var n, s, i, c, f, o, l, p, u, h, m, k, x, d, _ = ye(t.data), g = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } };
  if (g.e.r = (Ie(_[6][0].data) >>> 0) - 1, g.e.r < 0)
    throw new Error("Invalid row varint ".concat(_[6][0].data));
  if (g.e.c = (Ie(_[7][0].data) >>> 0) - 1, g.e.c < 0)
    throw new Error("Invalid col varint ".concat(_[7][0].data));
  r["!ref"] = Pe(g);
  var C = r["!data"] != null, O = r, U = ye(_[4][0].data), P = bm();
  (n = U[4]) != null && n[0] && (P.sst = Et(e, e[lr(U[4][0].data)][0])), (s = U[6]) != null && s[0] && (P.fmla = Et(e, e[lr(U[6][0].data)][0])), (i = U[11]) != null && i[0] && (P.ofmt = Et(e, e[lr(U[11][0].data)][0])), (c = U[12]) != null && c[0] && (P.ferr = Et(e, e[lr(U[12][0].data)][0])), (f = U[17]) != null && f[0] && (P.rsst = Et(e, e[lr(U[17][0].data)][0])), (o = U[19]) != null && o[0] && (P.cmnt = Et(e, e[lr(U[19][0].data)][0])), (l = U[22]) != null && l[0] && (P.nfmt = Et(e, e[lr(U[22][0].data)][0]));
  var I = ye(U[3][0].data), N = 0;
  if (!((p = U[9]) != null && p[0]))
    throw "NUMBERS file missing row tree";
  var B = ye(U[9][0].data)[1].map(function(Z) {
    return ye(Z.data);
  });
  if (B.forEach(function(Z) {
    N = Ie(Z[1][0].data);
    var xe = Ie(Z[2][0].data), q = I[1][xe];
    if (!q)
      throw "NUMBERS missing tile " + xe;
    var ie = ye(q.data), ve = e[lr(ie[2][0].data)][0], K = Ie(ve.meta[1][0].data);
    if (K != 6002)
      throw new Error("6001 unexpected reference to ".concat(K));
    var we = Im(e, ve);
    we.data.forEach(function(Ee, me) {
      Ee.forEach(function(le, Ae) {
        var ke = Dm(le, P, a);
        ke && (C ? (O["!data"][N + me] || (O["!data"][N + me] = []), O["!data"][N + me][Ae] = ke) : r[Me(Ae) + We(N + me)] = ke);
      });
    }), N += we.nrows;
  }), (u = U[13]) != null && u[0]) {
    var M = e[lr(U[13][0].data)][0], X = Ie(M.meta[1][0].data);
    if (X != 6144)
      throw new Error("Expected merge type 6144, found ".concat(X));
    r["!merges"] = (h = ye(M.data)) == null ? void 0 : h[1].map(function(Z) {
      var xe = ye(Z.data), q = _a(ye(xe[1][0].data)[1][0].data), ie = _a(ye(xe[2][0].data)[1][0].data);
      return {
        s: { r: q.getUint16(0, !0), c: q.getUint16(2, !0) },
        e: {
          r: q.getUint16(0, !0) + ie.getUint16(0, !0) - 1,
          c: q.getUint16(2, !0) + ie.getUint16(2, !0) - 1
        }
      };
    });
  }
  if (!((m = r["!merges"]) != null && m.length) && ((k = _[47]) != null && k[0])) {
    var j = ye(_[47][0].data);
    if ((x = j[2]) != null && x[0]) {
      var oe = ye(j[2][0].data);
      (d = oe[3]) != null && d[0] && (r["!merges"] = hn(oe[3], function(Z) {
        var xe, q, ie, ve, K, we = ye(Z), Ee = ye(we[2][0].data), me = ye(Ee[1][0].data);
        if ((xe = me[1]) != null && xe[0]) {
          var le = ye(me[1][0].data), Ae = Ie(le[1][0].data);
          if (Ae == 67) {
            var ke = ye(le[40][0].data);
            if (!(!((q = ke[3]) != null && q[0]) || !((ie = ke[4]) != null && ie[0]))) {
              var Se = ye(ke[3][0].data), S = ye(ke[4][0].data), L = Ie(Se[1][0].data), R = (ve = Se[2]) != null && ve[0] ? Ie(Se[2][0].data) : L, b = Ie(S[1][0].data), J = (K = S[2]) != null && K[0] ? Ie(S[2][0].data) : b;
              return { s: { r: b, c: L }, e: { r: J, c: R } };
            }
          }
        }
      }).filter(function(Z) {
        return Z != null;
      }));
    }
  }
}
function Lm(e, t, r) {
  var a = ye(t.data), n = { "!ref": "A1" };
  r?.dense && (n["!data"] = []);
  var s = e[lr(a[2][0].data)], i = Ie(s[0].meta[1][0].data);
  if (i != 6001)
    throw new Error("6000 unexpected reference to ".concat(i));
  return Mm(e, s[0], n, r), n;
}
function Bm(e, t, r) {
  var a, n = ye(t.data), s = {
    name: (a = n[1]) != null && a[0] ? $t(n[1][0].data) : "",
    sheets: []
  }, i = hn(n[2], lr);
  return i.forEach(function(c) {
    e[c].forEach(function(f) {
      var o = Ie(f.meta[1][0].data);
      o == 6e3 && s.sheets.push(Lm(e, f, r));
    });
  }), s;
}
function Um(e, t, r) {
  var a, n = is();
  n.Workbook = { WBProps: { date1904: !0 } };
  var s = ye(t.data);
  if ((a = s[2]) != null && a[0])
    throw new Error("Keynote presentations are not supported");
  var i = hn(s[1], lr);
  if (i.forEach(function(c) {
    e[c].forEach(function(f) {
      var o = Ie(f.meta[1][0].data);
      if (o == 2) {
        var l = Bm(e, f, r);
        l.sheets.forEach(function(p, u) {
          Ca(n, p, u == 0 ? l.name : l.name + "_" + u, !0);
        });
      }
    });
  }), n.SheetNames.length == 0)
    throw new Error("Empty NUMBERS file");
  return n.bookType = "numbers", n;
}
function An(e, t) {
  var r, a, n, s, i, c, f, o = {}, l = [];
  if (e.FullPaths.forEach(function(u) {
    if (u.match(/\.iwpv2/))
      throw new Error("Unsupported password protection");
  }), e.FileIndex.forEach(function(u) {
    if (u.name.match(/\.iwa$/) && u.content[0] == 0) {
      var h;
      try {
        h = Cm(u.content);
      } catch (k) {
        return console.log("?? " + u.content.length + " " + (k.message || k));
      }
      var m;
      try {
        m = Sm(h);
      } catch (k) {
        return console.log("## " + (k.message || k));
      }
      m.forEach(function(k) {
        o[k.id] = k.messages, l.push(k.id);
      });
    }
  }), !l.length)
    throw new Error("File has no messages");
  if ((n = (a = (r = o?.[1]) == null ? void 0 : r[0].meta) == null ? void 0 : a[1]) != null && n[0].data && Ie(o[1][0].meta[1][0].data) == 1e4)
    throw new Error("Pages documents are not supported");
  var p = ((f = (c = (i = (s = o?.[1]) == null ? void 0 : s[0]) == null ? void 0 : i.meta) == null ? void 0 : c[1]) == null ? void 0 : f[0].data) && Ie(o[1][0].meta[1][0].data) == 1 && o[1][0];
  if (p || l.forEach(function(u) {
    o[u].forEach(function(h) {
      var m = Ie(h.meta[1][0].data) >>> 0;
      if (m == 1)
        if (!p)
          p = h;
        else
          throw new Error("Document has multiple roots");
    });
  }), !p)
    throw new Error("Cannot find Document root");
  return Um(o, p, t);
}
function Hm(e) {
  return function(r) {
    for (var a = 0; a != e.length; ++a) {
      var n = e[a];
      r[n[0]] === void 0 && (r[n[0]] = n[1]), n[2] === "n" && (r[n[0]] = Number(r[n[0]]));
    }
  };
}
function ns(e) {
  Hm([
    ["cellNF", !1],
    /* emit cell number format string as .z */
    ["cellHTML", !0],
    /* emit html string as .h */
    ["cellFormula", !0],
    /* emit formulae as .f */
    ["cellStyles", !1],
    /* emits style/theme as .s */
    ["cellText", !0],
    /* emit formatted text as .w */
    ["cellDates", !1],
    /* emit date cells with type `d` */
    ["sheetStubs", !1],
    /* emit empty cells */
    ["sheetRows", 0, "n"],
    /* read n rows (0 = read all rows) */
    ["bookDeps", !1],
    /* parse calculation chains */
    ["bookSheets", !1],
    /* only try to get sheet names (no Sheets) */
    ["bookProps", !1],
    /* only try to get properties (no Sheets) */
    ["bookFiles", !1],
    /* include raw file structure (keys, files, cfb) */
    ["bookVBA", !1],
    /* include vba raw data (vbaraw) */
    ["password", ""],
    /* password */
    ["WTF", !1]
    /* WTF mode (throws errors) */
  ])(e);
}
function Wm(e) {
  return Ht.WS.indexOf(e) > -1 ? "sheet" : e == Ht.CS ? "chart" : e == Ht.DS ? "dialog" : e == Ht.MS ? "macro" : e && e.length ? e : "sheet";
}
function Vm(e, t) {
  if (!e) return 0;
  try {
    e = t.map(function(a) {
      return a.id || (a.id = a.strRelID), [a.name, e["!id"][a.id].Target, Wm(e["!id"][a.id].Type)];
    });
  } catch {
    return null;
  }
  return !e || e.length === 0 ? null : e;
}
function $m(e, t, r, a, n, s, i, c) {
  if (!(!e || !e["!legdrawel"])) {
    var f = Ut(e["!legdrawel"].Target, a), o = Sr(r, f, !0);
    o && J1(Ve(o), e, c || []);
  }
}
function Gm(e, t, r, a, n, s, i, c, f, o, l, p) {
  try {
    s[a] = sa(Sr(e, r, !0), t);
    var u = tr(e, t), h;
    switch (c) {
      case "sheet":
        h = Kp(u, t, n, f, s[a], o, l, p);
        break;
      case "chart":
        if (h = jp(u, t, n, f, s[a], o, l, p), !h || !h["!drawel"]) break;
        var m = Ut(h["!drawel"].Target, t), k = Pn(m), x = Y1(Sr(e, m, !0), sa(Sr(e, k, !0), m)), d = Ut(x, m), _ = Pn(d);
        h = Pp(Sr(e, d, !0), d, f, sa(Sr(e, _, !0), d), o, h);
        break;
      case "macro":
        h = Yp(u, t, n, f, s[a], o, l, p);
        break;
      case "dialog":
        h = Jp(u, t, n, f, s[a], o, l, p);
        break;
      default:
        throw new Error("Unrecognized sheet type " + c);
    }
    i[a] = h;
    var g = [], C = [];
    s && s[a] && $r(s[a]).forEach(function(O) {
      var U = "";
      if (s[a][O].Type == Ht.CMNT) {
        if (U = Ut(s[a][O].Target, t), g = Qp(tr(e, U, !0), U, f), !g || !g.length) return;
        n0(h, g, !1);
      }
      s[a][O].Type == Ht.TCMNT && (U = Ut(s[a][O].Target, t), C = C.concat(q1(tr(e, U, !0), f)));
    }), C && C.length && n0(h, C, !0, f.people || []), $m(h, c, e, t, n, f, o, g);
  } catch (O) {
    if (f.WTF) throw O;
  }
}
function Ur(e) {
  return e.charAt(0) == "/" ? e.slice(1) : e;
}
function Xm(e, t) {
  if ($0(), t = t || {}, ns(t), Wr(e, "META-INF/manifest.xml") || Wr(e, "objectdata.xml")) return m0(e, t);
  if (Wr(e, "Index/Document.iwa")) {
    if (typeof Uint8Array > "u") throw new Error("NUMBERS file parsing requires Uint8Array support");
    if (typeof An < "u") {
      if (e.FileIndex) return An(e, t);
      var r = Re.utils.cfb_new();
      return Ps(e).forEach(function(Z) {
        jo(r, Z, Ko(e, Z));
      }), An(r, t);
    }
    throw new Error("Unsupported NUMBERS file");
  }
  if (!Wr(e, "[Content_Types].xml")) {
    if (Wr(e, "index.xml.gz")) throw new Error("Unsupported NUMBERS 08 file");
    if (Wr(e, "index.xml")) throw new Error("Unsupported NUMBERS 09 file");
    var a = Re.find(e, "Index.zip");
    if (a)
      return t = ir(t), delete t.type, typeof a.content == "string" && (t.type = "binary"), typeof Bun < "u" && Buffer.isBuffer(a.content) ? ua(new Uint8Array(a.content), t) : ua(a.content, t);
    throw new Error("Unsupported ZIP file");
  }
  var n = Ps(e), s = Gl(Sr(e, "[Content_Types].xml")), i = !1, c, f;
  if (s.workbooks.length === 0 && (f = "xl/workbook.xml", tr(e, f, !0) && s.workbooks.push(f)), s.workbooks.length === 0) {
    if (f = "xl/workbook.bin", !tr(e, f, !0)) throw new Error("Could not find workbook");
    s.workbooks.push(f), i = !0;
  }
  s.workbooks[0].slice(-3) == "bin" && (i = !0);
  var o = {}, l = {};
  if (!t.bookSheets && !t.bookProps) {
    if (fa = [], s.sst) try {
      fa = qp(tr(e, Ur(s.sst)), s.sst, t);
    } catch (Z) {
      if (t.WTF) throw Z;
    }
    t.cellStyles && s.themes.length && (o = Ui(Sr(e, s.themes[0].replace(/^\//, ""), !0) || "", t)), s.style && (l = Zp(tr(e, Ur(s.style)), s.style, o, t));
  }
  s.links.map(function(Z) {
    try {
      var xe = sa(Sr(e, Pn(Ur(Z))), Z);
      return rm(tr(e, Ur(Z)), xe, Z, t);
    } catch {
    }
  });
  var p = zp(tr(e, Ur(s.workbooks[0])), s.workbooks[0], t), u = {}, h = "";
  s.coreprops.length && (h = tr(e, Ur(s.coreprops[0]), !0), h && (u = ki(h)), s.extprops.length !== 0 && (h = tr(e, Ur(s.extprops[0]), !0), h && jl(h, u, t)));
  var m = {};
  (!t.bookSheets || t.bookProps) && s.custprops.length !== 0 && (h = Sr(e, Ur(s.custprops[0]), !0), h && (m = Jl(h, t)));
  var k = {};
  if ((t.bookSheets || t.bookProps) && (p.Sheets ? c = p.Sheets.map(function(xe) {
    return xe.name;
  }) : u.Worksheets && u.SheetNames.length > 0 && (c = u.SheetNames), t.bookProps && (k.Props = u, k.Custprops = m), t.bookSheets && typeof c < "u" && (k.SheetNames = c), t.bookSheets ? k.SheetNames : t.bookProps))
    return k;
  c = {};
  var x = {};
  t.bookDeps && s.calcchain && (x = em(tr(e, Ur(s.calcchain)), s.calcchain));
  var d = 0, _ = {}, g, C;
  {
    var O = p.Sheets;
    u.Worksheets = O.length, u.SheetNames = [];
    for (var U = 0; U != O.length; ++U)
      u.SheetNames[U] = O[U].name;
  }
  var P = i ? "bin" : "xml", I = s.workbooks[0].lastIndexOf("/"), N = (s.workbooks[0].slice(0, I + 1) + "_rels/" + s.workbooks[0].slice(I + 1) + ".rels").replace(/^\//, "");
  Wr(e, N) || (N = "xl/_rels/workbook." + P + ".rels");
  var B = sa(Sr(e, N, !0), N.replace(/_rels.*/, "s5s"));
  (s.metadata || []).length >= 1 && (t.xlmeta = tm(tr(e, Ur(s.metadata[0])), s.metadata[0], t)), (s.people || []).length >= 1 && (t.people = Q1(tr(e, Ur(s.people[0])), t)), B && (B = Vm(B, p.Sheets));
  var M = tr(e, "xl/worksheets/sheet.xml", !0) ? 1 : 0;
  e: for (d = 0; d != u.Worksheets; ++d) {
    var X = "sheet";
    if (B && B[d] ? (g = "xl/" + B[d][1].replace(/[\/]?xl\//, ""), Wr(e, g) || (g = B[d][1]), Wr(e, g) || (g = N.replace(/_rels\/[\S\s]*$/, "") + B[d][1]), X = B[d][2]) : (g = "xl/worksheets/sheet" + (d + 1 - M) + "." + P, g = g.replace(/sheet0\./, "sheet.")), C = g.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels"), t && t.sheets != null) switch (typeof t.sheets) {
      case "number":
        if (d != t.sheets) continue e;
        break;
      case "string":
        if (u.SheetNames[d].toLowerCase() != t.sheets.toLowerCase()) continue e;
        break;
      default:
        if (Array.isArray && Array.isArray(t.sheets)) {
          for (var j = !1, oe = 0; oe != t.sheets.length; ++oe)
            typeof t.sheets[oe] == "number" && t.sheets[oe] == d && (j = 1), typeof t.sheets[oe] == "string" && t.sheets[oe].toLowerCase() == u.SheetNames[d].toLowerCase() && (j = 1);
          if (!j) continue e;
        }
    }
    Gm(e, g, C, u.SheetNames[d], d, _, c, X, t, p, o, l);
  }
  return k = {
    Directory: s,
    Workbook: p,
    Props: u,
    Custprops: m,
    Deps: x,
    Sheets: c,
    SheetNames: u.SheetNames,
    Strings: fa,
    Styles: l,
    Themes: o,
    SSF: ir(_e)
  }, t && t.bookFiles && (e.files ? (k.keys = n, k.files = e.files) : (k.keys = [], k.files = {}, e.FullPaths.forEach(function(Z, xe) {
    Z = Z.replace(/^Root Entry[\/]/, ""), k.keys.push(Z), k.files[Z] = e.FileIndex[xe];
  }))), t && t.bookVBA && (s.vba.length > 0 ? k.vbaraw = tr(e, Ur(s.vba[0]), !0) : s.defaults && s.defaults.bin === ad && (k.vbaraw = tr(e, "xl/vbaProject.bin", !0))), k.bookType = i ? "xlsb" : "xlsx", k;
}
function zm(e, t) {
  var r = t || {}, a = "Workbook", n = Re.find(e, a);
  try {
    if (a = "/!DataSpaces/Version", n = Re.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    if ($u(n.content), a = "/!DataSpaces/DataSpaceMap", n = Re.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    var s = Xu(n.content);
    if (s.length !== 1 || s[0].comps.length !== 1 || s[0].comps[0].t !== 0 || s[0].name !== "StrongEncryptionDataSpace" || s[0].comps[0].v !== "EncryptedPackage")
      throw new Error("ECMA-376 Encrypted file bad " + a);
    if (a = "/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace", n = Re.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    var i = zu(n.content);
    if (i.length != 1 || i[0] != "StrongEncryptionTransform")
      throw new Error("ECMA-376 Encrypted file bad " + a);
    if (a = "/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary", n = Re.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
    ju(n.content);
  } catch {
  }
  if (a = "/EncryptionInfo", n = Re.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
  var c = Yu(n.content);
  if (a = "/EncryptedPackage", n = Re.find(e, a), !n || !n.content) throw new Error("ECMA-376 Encrypted file missing " + a);
  if (c[0] == 4 && typeof decrypt_agile < "u") return decrypt_agile(c[1], n.content, r.password || "", r);
  if (c[0] == 2 && typeof decrypt_std76 < "u") return decrypt_std76(c[1], n.content, r.password || "", r);
  throw new Error("File is password-protected");
}
function ss(e, t) {
  var r = "";
  switch ((t || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      r = Mr(e.slice(0, 12));
      break;
    case "binary":
      r = e;
      break;
    case "array":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    default:
      throw new Error("Unrecognized type " + (t && t.type || "undefined"));
  }
  return [r.charCodeAt(0), r.charCodeAt(1), r.charCodeAt(2), r.charCodeAt(3), r.charCodeAt(4), r.charCodeAt(5), r.charCodeAt(6), r.charCodeAt(7)];
}
function Km(e, t) {
  return Re.find(e, "EncryptedPackage") ? zm(e, t) : rc(e, t);
}
function jm(e, t) {
  var r, a = e, n = t || {};
  return n.type || (n.type = Ce && Buffer.isBuffer(e) ? "buffer" : "base64"), r = Y0(a, n), Xm(r, n);
}
function oc(e, t) {
  var r = 0;
  e: for (; r < e.length; ) switch (e.charCodeAt(r)) {
    case 10:
    case 13:
    case 32:
      ++r;
      break;
    case 60:
      return Dn(e.slice(r), t);
    default:
      break e;
  }
  return ga.to_workbook(e, t);
}
function Ym(e, t) {
  var r = "", a = ss(e, t);
  switch (t.type) {
    case "base64":
      r = Mr(e);
      break;
    case "binary":
      r = e;
      break;
    case "buffer":
      r = e.toString("binary");
      break;
    case "array":
      r = Ct(e);
      break;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return a[0] == 239 && a[1] == 187 && a[2] == 191 && (r = Ve(r)), t.type = "binary", oc(r, t);
}
function Jm(e, t) {
  var r = e;
  return t.type == "base64" && (r = Mr(r)), typeof ArrayBuffer < "u" && e instanceof ArrayBuffer && (r = new Uint8Array(e)), r = Ce && Buffer.isBuffer(e) ? e.slice(2).toString("utf16le") : typeof Uint8Array < "u" && r instanceof Uint8Array ? typeof TextDecoder < "u" ? new TextDecoder("utf-16le").decode(r.slice(2)) : qf(r.slice(2)) : R0(r.slice(2)), t.type = "binary", oc(r, t);
}
function Zm(e) {
  return e.match(/[^\x00-\x7F]/) ? ea(e) : e;
}
function Fn(e, t, r, a) {
  return a ? (r.type = "string", ga.to_workbook(e, r)) : ga.to_workbook(t, r);
}
function ua(e, t) {
  D0();
  var r = t || {};
  if (r.codepage && console.error("Codepage tables are not loaded.  Non-ASCII characters may not give expected results"), typeof ArrayBuffer < "u" && e instanceof ArrayBuffer) return ua(new Uint8Array(e), (r = ir(r), r.type = "array", r));
  if (typeof Int8Array < "u" && e instanceof Int8Array) return ua(new Uint8Array(e.buffer, e.byteOffset, e.length), r);
  typeof Uint8Array < "u" && e instanceof Uint8Array && !r.type && (r.type = typeof Deno < "u" ? "buffer" : "array");
  var a = e, n = [0, 0, 0, 0], s = !1;
  if (r.cellStyles && (r.cellNF = !0, r.sheetStubs = !0), Vt = {}, r.dateNF && (Vt.dateNF = r.dateNF), r.type || (r.type = Ce && Buffer.isBuffer(e) ? "buffer" : "base64"), r.type == "file" && (r.type = Ce ? "buffer" : "binary", a = bo(e), typeof Uint8Array < "u" && !Ce && (r.type = "array")), r.type == "string" && (s = !0, r.type = "binary", r.codepage = 65001, a = Zm(e)), r.type == "array" && typeof Uint8Array < "u" && e instanceof Uint8Array && typeof ArrayBuffer < "u") {
    var i = new ArrayBuffer(3), c = new Uint8Array(i);
    if (c.foo = "bar", !c.foo)
      return r = ir(r), r.type = "array", ua(Hn(a), r);
  }
  switch ((n = ss(a, r))[0]) {
    case 208:
      if (n[1] === 207 && n[2] === 17 && n[3] === 224 && n[4] === 161 && n[5] === 177 && n[6] === 26 && n[7] === 225) return Km(Re.read(a, r), r);
      break;
    case 9:
      if (n[1] <= 8) return rc(a, r);
      break;
    case 60:
      return Dn(a, r);
    case 73:
      if (n[1] === 73 && n[2] === 42 && n[3] === 0) throw new Error("TIFF Image File is not a spreadsheet");
      if (n[1] === 68) return Du(a, r);
      break;
    case 84:
      if (n[1] === 65 && n[2] === 66 && n[3] === 76) return Pu.to_workbook(a, r);
      break;
    case 80:
      return n[1] === 75 && n[2] < 9 && n[3] < 9 ? jm(a, r) : Fn(e, a, r, s);
    case 239:
      return n[3] === 60 ? Dn(a, r) : Fn(e, a, r, s);
    case 255:
      if (n[1] === 254)
        return Jm(a, r);
      if (n[1] === 0 && n[2] === 2 && n[3] === 0) return ca.to_workbook(a, r);
      break;
    case 0:
      if (n[1] === 0 && (n[2] >= 2 && n[3] === 0 || n[2] === 0 && (n[3] === 8 || n[3] === 9)))
        return ca.to_workbook(a, r);
      break;
    case 3:
    case 131:
    case 139:
    case 140:
      return a0.to_workbook(a, r);
    case 123:
      if (n[1] === 92 && n[2] === 114 && n[3] === 116) return f1(a, r);
      break;
    case 10:
    case 13:
    case 32:
      return Ym(a, r);
    case 137:
      if (n[1] === 80 && n[2] === 78 && n[3] === 71) throw new Error("PNG Image File is not a spreadsheet");
      break;
    case 8:
      if (n[1] === 231) throw new Error("Unsupported Multiplan 1.x file!");
      break;
    case 12:
      if (n[1] === 236) throw new Error("Unsupported Multiplan 2.x file!");
      if (n[1] === 237) throw new Error("Unsupported Multiplan 3.x file!");
      break;
  }
  return Cu.indexOf(n[0]) > -1 && n[2] <= 12 && n[3] <= 31 ? a0.to_workbook(a, r) : Fn(e, a, r, s);
}
function qm(e, t, r, a, n, s, i) {
  var c = We(r), f = i.defval, o = i.raw || !Object.prototype.hasOwnProperty.call(i, "raw"), l = !0, p = e["!data"] != null, u = n === 1 ? [] : {};
  if (n !== 1)
    if (Object.defineProperty) try {
      Object.defineProperty(u, "__rowNum__", { value: r, enumerable: !1 });
    } catch {
      u.__rowNum__ = r;
    }
    else u.__rowNum__ = r;
  if (!p || e["!data"][r]) for (var h = t.s.c; h <= t.e.c; ++h) {
    var m = p ? (e["!data"][r] || [])[h] : e[a[h] + c];
    if (m == null || m.t === void 0) {
      if (f === void 0) continue;
      s[h] != null && (u[s[h]] = f);
      continue;
    }
    var k = m.v;
    switch (m.t) {
      case "z":
        if (k == null) break;
        continue;
      case "e":
        k = k == 0 ? null : void 0;
        break;
      case "s":
      case "b":
      case "n":
        if (!m.z || !Jr(m.z) || (k = dt(k), typeof k == "number")) break;
      /* falls through */
      case "d":
        i && (i.UTC || i.raw === !1) || (k = bt(new Date(k)));
        break;
      default:
        throw new Error("unrecognized type " + m.t);
    }
    if (s[h] != null) {
      if (k == null)
        if (m.t == "e" && k === null) u[s[h]] = null;
        else if (f !== void 0) u[s[h]] = f;
        else if (o && k === null) u[s[h]] = null;
        else continue;
      else
        u[s[h]] = (m.t === "n" && typeof i.rawNumbers == "boolean" ? i.rawNumbers : o) ? k : pt(m, k, i);
      k != null && (l = !1);
    }
  }
  return { row: u, isempty: l };
}
function In(e, t) {
  if (e == null || e["!ref"] == null) return [];
  var r = { t: "n", v: 0 }, a = 0, n = 1, s = [], i = 0, c = "", f = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, o = t || {}, l = o.range != null ? o.range : e["!ref"];
  switch (o.header === 1 ? a = 1 : o.header === "A" ? a = 2 : Array.isArray(o.header) ? a = 3 : o.header == null && (a = 0), typeof l) {
    case "string":
      f = qe(l);
      break;
    case "number":
      f = qe(e["!ref"]), f.s.r = l;
      break;
    default:
      f = l;
  }
  a > 0 && (n = 0);
  var p = We(f.s.r), u = [], h = [], m = 0, k = 0, x = e["!data"] != null, d = f.s.r, _ = 0, g = {};
  x && !e["!data"][d] && (e["!data"][d] = []);
  var C = o.skipHidden && e["!cols"] || [], O = o.skipHidden && e["!rows"] || [];
  for (_ = f.s.c; _ <= f.e.c; ++_)
    if (!(C[_] || {}).hidden)
      switch (u[_] = Me(_), r = x ? e["!data"][d][_] : e[u[_] + p], a) {
        case 1:
          s[_] = _ - f.s.c;
          break;
        case 2:
          s[_] = u[_];
          break;
        case 3:
          s[_] = o.header[_ - f.s.c];
          break;
        default:
          if (r == null && (r = { w: "__EMPTY", t: "s" }), c = i = pt(r, null, o), k = g[i] || 0, !k) g[i] = 1;
          else {
            do
              c = i + "_" + k++;
            while (g[c]);
            g[i] = k, g[c] = 1;
          }
          s[_] = c;
      }
  for (d = f.s.r + n; d <= f.e.r; ++d)
    if (!(O[d] || {}).hidden) {
      var U = qm(e, f, d, u, a, s, o);
      (U.isempty === !1 || (a === 1 ? o.blankrows !== !1 : o.blankrows)) && (h[m++] = U.row);
    }
  return h.length = m, h;
}
var v0 = /"/g;
function Qm(e, t, r, a, n, s, i, c, f) {
  for (var o = !0, l = [], p = "", u = We(r), h = e["!data"] != null, m = h && e["!data"][r] || [], k = t.s.c; k <= t.e.c; ++k)
    if (a[k]) {
      var x = h ? m[k] : e[a[k] + u];
      if (x == null) p = "";
      else if (x.v != null) {
        o = !1, p = "" + (f.rawNumbers && x.t == "n" ? x.v : pt(x, null, f));
        for (var d = 0, _ = 0; d !== p.length; ++d) if ((_ = p.charCodeAt(d)) === n || _ === s || _ === 34 || f.forceQuotes) {
          p = '"' + p.replace(v0, '""') + '"';
          break;
        }
        p == "ID" && c == 0 && l.length == 0 && (p = '"ID"');
      } else x.f != null && !x.F ? (o = !1, p = "=" + x.f, p.indexOf(",") >= 0 && (p = '"' + p.replace(v0, '""') + '"')) : p = "";
      l.push(p);
    }
  if (f.strip) for (; l[l.length - 1] === ""; ) --l.length;
  return f.blankrows === !1 && o ? null : l.join(i);
}
function lc(e, t) {
  var r = [], a = t ?? {};
  if (e == null || e["!ref"] == null) return "";
  for (var n = qe(e["!ref"]), s = a.FS !== void 0 ? a.FS : ",", i = s.charCodeAt(0), c = a.RS !== void 0 ? a.RS : `
`, f = c.charCodeAt(0), o = "", l = [], p = a.skipHidden && e["!cols"] || [], u = a.skipHidden && e["!rows"] || [], h = n.s.c; h <= n.e.c; ++h) (p[h] || {}).hidden || (l[h] = Me(h));
  for (var m = 0, k = n.s.r; k <= n.e.r; ++k)
    (u[k] || {}).hidden || (o = Qm(e, n, k, l, i, f, s, m, a), o != null && (o || a.blankrows !== !1) && r.push((m++ ? c : "") + o));
  return r.join("");
}
function eg(e, t) {
  t || (t = {}), t.FS = "	", t.RS = `
`;
  var r = lc(e, t);
  return r;
}
function rg(e, t) {
  var r = "", a, n = "";
  if (e == null || e["!ref"] == null) return [];
  var s = qe(e["!ref"]), i = "", c = [], f, o = [], l = e["!data"] != null;
  for (f = s.s.c; f <= s.e.c; ++f) c[f] = Me(f);
  for (var p = s.s.r; p <= s.e.r; ++p)
    for (i = We(p), f = s.s.c; f <= s.e.c; ++f)
      if (r = c[f] + i, a = l ? (e["!data"][p] || [])[f] : e[r], n = "", a !== void 0) {
        if (a.F != null) {
          if (r = a.F, !a.f) continue;
          n = a.f, r.indexOf(":") == -1 && (r = r + ":" + r);
        }
        if (a.f != null) n = a.f;
        else {
          if (t && t.values === !1) continue;
          if (a.t == "z") continue;
          if (a.t == "n" && a.v != null) n = "" + a.v;
          else if (a.t == "b") n = a.v ? "TRUE" : "FALSE";
          else if (a.w !== void 0) n = "'" + a.w;
          else {
            if (a.v === void 0) continue;
            a.t == "s" ? n = "'" + a.v : n = "" + a.v;
          }
        }
        o[o.length] = r + "=" + n;
      }
  return o;
}
function hc(e, t, r) {
  var a = r || {}, n = e ? e["!data"] != null : a.dense, s = +!a.skipHeader, i = e || {};
  !e && n && (i["!data"] = []);
  var c = 0, f = 0;
  if (i && a.origin != null)
    if (typeof a.origin == "number") c = a.origin;
    else {
      var o = typeof a.origin == "string" ? _r(a.origin) : a.origin;
      c = o.r, f = o.c;
    }
  var l = { s: { c: 0, r: 0 }, e: { c: f, r: c + t.length - 1 + s } };
  if (i["!ref"]) {
    var p = qe(i["!ref"]);
    l.e.c = Math.max(l.e.c, p.e.c), l.e.r = Math.max(l.e.r, p.e.r), c == -1 && (c = p.e.r + 1, l.e.r = c + t.length - 1 + s);
  } else
    c == -1 && (c = 0, l.e.r = t.length - 1 + s);
  var u = a.header || [], h = 0, m = [];
  t.forEach(function(x, d) {
    n && !i["!data"][c + d + s] && (i["!data"][c + d + s] = []), n && (m = i["!data"][c + d + s]), $r(x).forEach(function(_) {
      (h = u.indexOf(_)) == -1 && (u[h = u.length] = _);
      var g = x[_], C = "z", O = "", U = n ? "" : Me(f + h) + We(c + d + s), P = n ? m[f + h] : i[U];
      g && typeof g == "object" && !(g instanceof Date) ? n ? m[f + h] = g : i[U] = g : (typeof g == "number" ? C = "n" : typeof g == "boolean" ? C = "b" : typeof g == "string" ? C = "s" : g instanceof Date ? (C = "d", a.UTC || (g = an(g)), a.cellDates || (C = "n", g = fr(g)), O = P != null && P.z && Jr(P.z) ? P.z : a.dateNF || _e[14]) : g === null && a.nullError && (C = "e", g = 0), P ? (P.t = C, P.v = g, delete P.w, delete P.R, O && (P.z = O)) : n ? m[f + h] = P = { t: C, v: g } : i[U] = P = { t: C, v: g }, O && (P.z = O));
    });
  }), l.e.c = Math.max(l.e.c, f + u.length - 1);
  var k = We(c);
  if (n && !i["!data"][c] && (i["!data"][c] = []), s) for (h = 0; h < u.length; ++h)
    n ? i["!data"][c][h + f] = { t: "s", v: u[h] } : i[Me(h + f) + k] = { t: "s", v: u[h] };
  return i["!ref"] = Pe(l), i;
}
function tg(e, t) {
  return hc(null, e, t);
}
function Ea(e, t, r) {
  if (typeof t == "string") {
    if (e["!data"] != null) {
      var a = _r(t);
      return e["!data"][a.r] || (e["!data"][a.r] = []), e["!data"][a.r][a.c] || (e["!data"][a.r][a.c] = { t: "z" });
    }
    return e[t] || (e[t] = { t: "z" });
  }
  return typeof t != "number" ? Ea(e, Oe(t)) : Ea(e, Me(r || 0) + We(t));
}
function ag(e, t) {
  if (typeof t == "number") {
    if (t >= 0 && e.SheetNames.length > t) return t;
    throw new Error("Cannot find sheet # " + t);
  } else if (typeof t == "string") {
    var r = e.SheetNames.indexOf(t);
    if (r > -1) return r;
    throw new Error("Cannot find sheet name |" + t + "|");
  } else throw new Error("Cannot find sheet |" + t + "|");
}
function is(e, t) {
  var r = { SheetNames: [], Sheets: {} };
  return e && Ca(r, e, t || "Sheet1"), r;
}
function Ca(e, t, r, a) {
  var n = 1;
  if (!r) for (; n <= 65535 && e.SheetNames.indexOf(r = "Sheet" + n) != -1; ++n, r = void 0) ;
  if (!r || e.SheetNames.length >= 65535) throw new Error("Too many worksheets");
  if (a && e.SheetNames.indexOf(r) >= 0 && r.length < 32) {
    var s = r.match(/\d+$/);
    n = s && +s[0] || 0;
    var i = s && r.slice(0, s.index) || r;
    for (++n; n <= 65535 && e.SheetNames.indexOf(r = i + n) != -1; ++n) ;
  }
  if (Bp(r), e.SheetNames.indexOf(r) >= 0) throw new Error("Worksheet with name |" + r + "| already exists!");
  return e.SheetNames.push(r), e.Sheets[r] = t, r;
}
function ng(e, t, r) {
  e.Workbook || (e.Workbook = {}), e.Workbook.Sheets || (e.Workbook.Sheets = []);
  var a = ag(e, t);
  switch (e.Workbook.Sheets[a] || (e.Workbook.Sheets[a] = {}), r) {
    case 0:
    case 1:
    case 2:
      break;
    default:
      throw new Error("Bad sheet visibility setting " + r);
  }
  e.Workbook.Sheets[a].Hidden = r;
}
function sg(e, t) {
  return e.z = t, e;
}
function uc(e, t, r) {
  return t ? (e.l = { Target: t }, r && (e.l.Tooltip = r)) : delete e.l, e;
}
function ig(e, t, r) {
  return uc(e, "#" + t, r);
}
function cg(e, t, r) {
  e.c || (e.c = []), e.c.push({ t, a: r || "SheetJS" });
}
function fg(e, t, r, a) {
  for (var n = typeof t != "string" ? t : qe(t), s = typeof t == "string" ? t : Pe(t), i = n.s.r; i <= n.e.r; ++i) for (var c = n.s.c; c <= n.e.c; ++c) {
    var f = Ea(e, i, c);
    f.t = "n", f.F = s, delete f.v, i == n.s.r && c == n.s.c && (f.f = r, a && (f.D = !0));
  }
  var o = Dt(e["!ref"]);
  return o.s.r > n.s.r && (o.s.r = n.s.r), o.s.c > n.s.c && (o.s.c = n.s.c), o.e.r < n.e.r && (o.e.r = n.e.r), o.e.c < n.e.c && (o.e.c = n.e.c), e["!ref"] = Pe(o), e;
}
var hg = {
  encode_col: Me,
  encode_row: We,
  encode_cell: Oe,
  encode_range: Pe,
  decode_col: Yn,
  decode_row: jn,
  split_cell: El,
  decode_cell: _r,
  decode_range: Dt,
  format_cell: pt,
  sheet_new: Tl,
  sheet_add_aoa: xi,
  sheet_add_json: hc,
  sheet_add_dom: tc,
  aoa_to_sheet: zt,
  json_to_sheet: tg,
  table_to_sheet: ac,
  table_to_book: wm,
  sheet_to_csv: lc,
  sheet_to_txt: eg,
  sheet_to_json: In,
  sheet_to_html: Em,
  sheet_to_formulae: rg,
  sheet_to_row_object_array: In,
  sheet_get_cell: Ea,
  book_new: is,
  book_append_sheet: Ca,
  book_set_sheet_visibility: ng,
  cell_set_number_format: sg,
  cell_set_hyperlink: uc,
  cell_set_internal_link: ig,
  cell_add_comment: cg,
  sheet_set_array_formula: fg,
  consts: {
    SHEET_VISIBLE: 0,
    SHEET_HIDDEN: 1,
    SHEET_VERY_HIDDEN: 2
  }
};
export {
  lg as a,
  ua as r,
  hg as u
};
