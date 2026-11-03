function se() {
  return { async: !1, breaks: !1, extensions: null, gfm: !0, hooks: null, pedantic: !1, renderer: null, silent: !1, tokenizer: null, walkTokens: null };
}
var L = se();
function ye(r) {
  L = r;
}
var C = { exec: () => null };
function I(r) {
  let e = [];
  return (t) => {
    let s = Math.max(0, Math.min(3, t - 1)), n = e[s];
    return n || (n = r(s), e[s] = n), n;
  };
}
function h(r, e = "") {
  let t = typeof r == "string" ? r : r.source, s = { replace: (n, l) => {
    let a = typeof l == "string" ? l : l.source;
    return a = a.replace(w.caret, "$1"), t = t.replace(n, a), s;
  }, getRegex: () => new RegExp(t, e) };
  return s;
}
var Re = ((r = "") => {
  try {
    return !!new RegExp("(?<=1)(?<!1)" + r);
  } catch {
    return !1;
  }
})(), w = { codeRemoveIndent: /^(?: {0,3}\t| {1,4})/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, endingSpaceTabChar: /[ \t]$/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, leadingSpaceTab: /^[ \t]+/, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+)[ \t]*)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, blockquoteMarkerWhitespace: /^( {0,3}>)([ \t]+)/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\][ \t]+\S/, listReplaceTask: /^\[[ xX]\][ \t]+/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, numericCharacterReference: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/, numericCharacterReferenceOrAmpersand: /&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (r) => new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: I((r) => new RegExp(`^ {0,${r}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)), hrRegex: I((r) => new RegExp(`^ {0,${r}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)), fencesBeginRegex: I((r) => new RegExp(`^ {0,${r}}(?:\`\`\`|~~~)`)), headingBeginRegex: I((r) => new RegExp(`^ {0,${r}}#{1,6}(?:\\s|$)`)), pedanticHeadingBeginRegex: I((r) => new RegExp(`^ {0,${r}}#`)), htmlBeginRegex: I((r) => new RegExp(`^ {0,${r}}(?:</?(?:${N})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`, "i")), blockquoteBeginRegex: I((r) => new RegExp(`^ {0,${r}}>`)) }, Le = /^(?:[ \t]*(?:\n|$))+/, Be = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/, qe = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}(?:(?=`)\1`*|(?=~)\1~*) *(?=\n|$)|$)/, H = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/, ve = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/, le = / {0,3}(?:[*+-]|\d{1,9}[.)])/, Ae = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+)[ \t]*(?:\n+|$)/, Te = h(Ae).replace(/bull/g, le).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex(), Ze = h(Ae).replace(/bull/g, le).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}(?:\s|$)/).replace(/hr/g, / {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(), ie = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/, De = /^[^\n]+/, ae = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\\n]|\n(?![ \t]*\n))+/, Oe = h(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", ae).replace("title", /(?:"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\\n]|\n(?!\n))*'|\((?:\\[\s\S]|[^()\\])*\))/).getRegex(), Me = h(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g, le).getRegex(), N = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul", oe = /<!--(?:-?>|[\s\S]*?(?:-->|$))/, Qe = h("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?:[ \\t]+|\\n|/?>|$)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", oe).replace("tag", N).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(), ze = (r) => h(ie).replace("hr", H).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", r).replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", N).getRegex(), je = ze(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/), He = ze(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/), Ne = h(/^( {0,3}> ?(?:(?![ \t]*(?:\n|$))(paragraph)|[^\n]*)(?:\n|$))+/).replace("paragraph", He).getRegex(), ce = { blockquote: Ne, code: Be, def: Oe, fences: qe, heading: ve, hr: H, html: Qe, lheading: Te, list: Me, newline: Le, paragraph: je, table: C, text: De }, ge = h("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", H).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", N).getRegex(), Fe = { ...ce, lheading: Ze, table: ge, paragraph: h(ie).replace("hr", H).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ge).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html", " {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag", N).getRegex() }, Xe = { ...ce, html: h(`^ *(?:comment(?: *\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1>(?: *\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?>(?: *\\n{2,}|\\s*$))`).replace("comment", oe).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: C, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: h(ie).replace("hr", H).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", Te).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() }, Ge = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/, We = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/, _e = /^( {2,}|\\)\n(?!\s*$)[ \t]*/, Ue = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/, A = /[\p{P}\p{S}]/u, D = /[\s\p{P}\p{S}]/u, F = /[^\s\p{P}\p{S}]/u, Je = h(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, D).getRegex(), Ke = /[\p{Pi}\p{Ps}"']/u, Pe = /(?!~)[\p{P}\p{S}]/u, Ve = /(?!~)[\s\p{P}\p{S}]/u, Ye = /(?:[^\s\p{P}\p{S}]|~)/u, et = h(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", Re ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex(), Ie = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/, tt = h(Ie, "u").replace(/punct/g, A).getRegex(), rt = h(Ie, "u").replace(/punct/g, Pe).getRegex(), nt = /^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/, st = h(nt, "u").replace(/openQuote/g, Ke).replace(/punct/g, A).getRegex(), Ce = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)", lt = h(Ce, "gu").replace(/notPunctSpace/g, F).replace(/punctSpace/g, D).replace(/punct/g, A).getRegex(), it = h(Ce, "gu").replace(/notPunctSpace/g, Ye).replace(/punctSpace/g, Ve).replace(/punct/g, Pe).getRegex(), at = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)", ot = h(at, "gu").replace(/notPunctSpace/g, F).replace(/punctSpace/g, D).replace(/punct/g, A).getRegex(), ct = h("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, F).replace(/punctSpace/g, D).replace(/punct/g, A).getRegex(), pt = "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)", ht = h(pt, "gu").replace(/notPunctSpace/g, F).replace(/punctSpace/g, D).replace(/punct/g, A).getRegex(), ut = h(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, A).getRegex(), gt = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)", kt = h(gt, "gu").replace(/notPunctSpace/g, F).replace(/punctSpace/g, D).replace(/punct/g, A).getRegex(), ft = h(/\\(punct)/, "gu").replace(/punct/g, A).getRegex(), dt = h(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/, "gu").replace(/punct/g, A).getRegex(), xt = h(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(), bt = h(oe).replace("(?:-->|$)", "-->").getRegex(), mt = h("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", bt).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(), Ee = /\[(?:\\[\s\S]|[^\[\]\\])*\]/, K = h(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets", Ee).getRegex(), wt = h(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/).replace("label", K).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title", /"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|\((?:\\[\s\S]|[^)\\])*\)/).getRegex(), St = h(/^!?\[(label)\]\[(ref)\]/).replace("label", K).replace("ref", ae).getRegex(), $t = h(/^!?\[(ref)\](?:\[\])?/).replace("ref", ae).getRegex(), ke = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/, yt = h(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets", Ee).getRegex(), Rt = h("reflink|nolink(?!\\()", "g").replace("reflink", h(/^!?\[(label)\]\[(ref)\]/).replace("label", yt).replace("ref", ke).getRegex()).replace("nolink", h(/^!?\[(ref)\](?:\[\])?/).replace("ref", ke).getRegex()).getRegex(), fe = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/, At = /[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/, Tt = h(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g, At).getRegex(), pe = { _backpedal: C, anyPunctuation: ft, anyPunctuationOutsideCode: dt, autolink: xt, blockSkip: et, br: _e, code: We, del: C, delLDelim: C, delRDelim: C, emStrongLDelim: tt, emStrongRDelimAst: lt, emStrongRDelimUnd: ct, escape: Ge, link: wt, nolink: $t, punctuation: Je, reflink: St, reflinkSearch: Rt, tag: mt, text: Ue, url: C }, zt = { ...pe, emStrongLDelim: st, emStrongRDelimAst: ot, emStrongRDelimUnd: ht, link: h(/^!?\[(label)\]\((.*?)\)/).replace("label", K).getRegex(), reflink: h(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", K).getRegex() }, te = { ...pe, emStrongRDelimAst: it, emStrongLDelim: rt, delLDelim: ut, delRDelim: kt, url: h(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("emailProtocol", Tt).replace("protocol", fe).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: h(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|wwwStart|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace("protocol", fe).replace(/emailProtocol/g, /(?:mailto|xmpp):/).replace("wwwStart", Re ? "(?<![^\\s*_~(])www\\." : "www\\.").getRegex() }, _t = { ...te, br: h(_e).replace("{2,}", "*").getRegex(), text: h(te.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() }, U = { normal: ce, gfm: Fe, pedantic: Xe }, Q = { normal: pe, gfm: te, breaks: _t, pedantic: zt }, Pt = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, de = (r) => Pt[r];
function $(r, e) {
  if (e) {
    if (w.escapeTest.test(r)) return r.replace(w.escapeReplace, de);
  } else if (w.escapeTestNoEncode.test(r)) return r.replace(w.escapeReplaceNoEncode, de);
  return r;
}
function It(r) {
  return w.numericCharacterReference.test(r) ? r.replace(w.numericCharacterReferenceOrAmpersand, (e, t, s) => {
    if (t === void 0 && s === void 0) return "&amp;";
    let n = t === void 0 ? Number.parseInt(s, 16) : Number.parseInt(t, 10);
    return n === 0 || n > 1114111 || n >= 55296 && n <= 57343 ? "�" : n === 38 ? "&amp;" : String.fromCodePoint(n);
  }) : r;
}
function xe(r) {
  try {
    r = encodeURI(r).replace(w.percentDecode, "%");
  } catch {
    return null;
  }
  return r;
}
function be(r, e) {
  let t = r.replace(w.findPipe, (l, a, i) => {
    let p = !1, c = a;
    for (; --c >= 0 && i[c] === "\\"; ) p = !p;
    return p ? "|" : " |";
  }), s = t.split(w.splitPipe), n = 0;
  if (s[0].trim() || s.shift(), s.length > 0 && !s.at(-1)?.trim() && s.pop(), e) if (s.length > e) s.splice(e);
  else for (; s.length < e; ) s.push("");
  for (; n < s.length; n++) s[n] = s[n].trim().replace(w.slashPipe, "|");
  return s;
}
function z(r, e, t) {
  let s = r.length;
  if (s === 0) return "";
  let n = 0;
  for (; n < s && r.charAt(s - n - 1) === e; )
    n++;
  return r.slice(0, s - n);
}
function me(r) {
  let e = r.split(`
`), t = e.length - 1;
  for (; t >= 0 && w.blankLine.test(e[t]); ) t--;
  return e.length - t <= 2 ? r : e.slice(0, t + 1).join(`
`);
}
function V(r) {
  return r.trim().replace(w.multipleSpaceGlobal, " ").toLowerCase().toUpperCase().toLowerCase();
}
function we(r, e) {
  if (r.indexOf(e[0]) === -1 && r.indexOf(e[1]) === -1) return -1;
  let t = 0;
  for (let s = 0; s < r.length; s++) if (r[s] === "\\") s++;
  else if (r[s] === e[0]) t++;
  else if (r[s] === e[1] && (t--, t < 0)) return s;
  return t > 0 ? -2 : -1;
}
var Z = /* @__PURE__ */ new WeakMap();
function he(r) {
  let e = { "*": -1, _: -1 }, t = -1, s = r.length;
  for (let n = 0; n < s; n++) {
    let l = r[n];
    if (l !== "*" && l !== "_" && l !== "~") continue;
    let a = n === 0 ? `
` : r[n - 1], i = n + 1;
    for (; i < s && r[i] === l; ) i++;
    a !== " " && a !== "	" && a !== `
` && a !== "\r" && a !== "\f" && (l === "~" ? t = n : e[l] = n), n = i - 1;
  }
  return { maskedSrc: r, lastPossibleEmStrongCloserIndex: e, lastPossibleDelCloserIndex: t };
}
function Ct(r, e) {
  let t = he(e), s = Z.get(r);
  s ? s.push(t) : Z.set(r, [t]);
}
function Et(r) {
  let e = Z.get(r);
  e && (e.pop(), e.length === 0 && Z.delete(r));
}
function Lt(r, e, t) {
  let s = Z.get(r)?.at(-1);
  return s && s.maskedSrc === e ? s.lastPossibleEmStrongCloserIndex[t] : he(e).lastPossibleEmStrongCloserIndex[t];
}
function Bt(r, e) {
  let t = Z.get(r)?.at(-1);
  return t && t.maskedSrc === e ? t.lastPossibleDelCloserIndex : he(e).lastPossibleDelCloserIndex;
}
function J(r, e = 0) {
  let t = e, s = "";
  for (let n of r) if (n === "	") {
    let l = 4 - t % 4;
    s += " ".repeat(l), t += l;
  } else s += n, t++;
  return s;
}
function Se(r, e, t, s, n) {
  let l = e.href, a = e.title || null, i = r[1].replace(n.other.outputLinkReplace, "$1"), p = r[0].charAt(0) === "!", c = s.state.inLink, o = s.state.linkEmitted, u = s.state.inRawBlock;
  s.state.inLink = !0, s.state.linkEmitted = !1;
  let k = s.inlineTokens(i), g = s.state.linkEmitted;
  if (s.state.linkEmitted = o, s.state.inLink = c, !p) {
    if (g) {
      s.state.inRawBlock = u;
      return;
    }
    s.state.linkEmitted = !0;
  }
  return { type: p ? "image" : "link", raw: t, href: l, title: a, text: i, tokens: k };
}
function qt(r, e, t) {
  let s = r.match(t.other.indentCodeCompensation);
  if (s === null) return e;
  let n = s[1];
  return e.split(`
`).map((l) => {
    let a = l.match(t.other.beginningSpace);
    if (a === null) return l;
    let [i] = a;
    return l.slice(Math.min(i.length, n.length));
  }).join(`
`);
}
function $e(r, e, t, s) {
  if (!e.includes("<")) return !1;
  for (let n = 0; n < e.length; n++) {
    if (e[n] === "\\") {
      n++;
      continue;
    }
    if (e[n] === "`") {
      let i = s.inline.code.exec(e.slice(n));
      if (i) {
        n += i[0].length - 1;
        continue;
      }
    }
    if (e[n] !== "<") continue;
    let l = r.slice(t + n), a = s.inline.tag.exec(l) || s.inline.autolink.exec(l);
    if (a) {
      if (a[0].length > e.length - n) return !0;
      n += a[0].length - 1;
    }
  }
  return !1;
}
var v = class {
  options;
  rules;
  lexer;
  constructor(r) {
    this.options = r || L;
  }
  space(r) {
    let e = this.rules.block.newline.exec(r);
    if (e && e[0].length > 0) return { type: "space", raw: e[0] };
  }
  code(r) {
    let e = this.rules.block.code.exec(r);
    if (e) {
      let t = this.options.pedantic ? e[0] : me(e[0]), s = t.replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: t, codeBlockStyle: "indented", text: s };
    }
  }
  fences(r) {
    let e = this.rules.block.fences.exec(r);
    if (e) {
      let t = e[0], s = qt(t, e[3] || "", this.rules);
      return { type: "code", raw: t, lang: e[2] ? e[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : e[2], text: s };
    }
  }
  heading(r) {
    let e = this.rules.block.heading.exec(r);
    if (e) {
      let t = e[2].trim();
      if (this.rules.other.endingHash.test(t)) {
        let s = z(t, "#");
        (this.options.pedantic || !s || this.rules.other.endingSpaceTabChar.test(s)) && (t = s.trim());
      }
      return { type: "heading", raw: z(e[0], `
`), depth: e[1].length, text: t, tokens: this.lexer.inline(t) };
    }
  }
  hr(r) {
    let e = this.rules.block.hr.exec(r);
    if (e) return { type: "hr", raw: z(e[0], `
`) };
  }
  blockquote(r) {
    let e = this.rules.block.blockquote.exec(r);
    if (e) {
      let t = z(e[0], `
`).split(`
`), s = "", n = "", l = [];
      for (; t.length > 0; ) {
        let a = !1, i = [], p;
        for (p = 0; p < t.length; p++) if (this.rules.other.blockquoteStart.test(t[p])) i.push(t[p]), a = !0;
        else if (!a) i.push(t[p]);
        else break;
        t = t.slice(p);
        let c = i.join(`
`), o = c.replace(this.rules.other.blockquoteMarkerWhitespace, (g, x, b) => x + J(b, x.length)).replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        s = s ? `${s}
${c}` : c, n = n ? `${n}
${o}` : o;
        let u = this.lexer.state.top;
        if (this.lexer.state.top = !0, this.lexer.blockTokens(o, l, !0), this.lexer.state.top = u, t.length === 0) break;
        let k = l.at(-1);
        if (k?.type === "code" || k?.type === "heading" || k?.type === "hr" || k?.type === "html" || k?.type === "table") break;
        if (k?.type === "blockquote") {
          let g = k, x = t.join(`
`), b = g.raw + `
` + x.replace(this.rules.other.blockquoteSetextReplace2, ""), f = this.blockquote(b);
          l[l.length - 1] = f;
          let S = b.substring(f.raw.length).replace(/^\n/, ""), m = S ? S.split(`
`).length : 0, T = m ? t.slice(0, -m) : t;
          if (T.length > 0 && (s = `${s}
${T.join(`
`)}`), n = n.substring(0, n.length - g.text.length) + f.text, t = t.slice(T.length), t.length > 0 && this.rules.other.blockquoteStart.test(t[0])) continue;
          break;
        } else if (k?.type === "list") {
          let g = k, x = g.raw + `
` + t.join(`
`), b = this.list(x);
          l[l.length - 1] = b;
          let f = b.raw.length > g.raw.length ? x.slice(g.raw.length + 1, b.raw.length).split(`
`).length : 0;
          if (f > 0) {
            let S = t.slice(0, f).join(`
`);
            s = `${s}
${S}`, n = `${n}
${S}`;
          }
          t = t.slice(f);
          continue;
        }
      }
      return { type: "blockquote", raw: s, tokens: l, text: n };
    }
  }
  list(r) {
    let e = this.rules.block.list.exec(r);
    if (e) {
      let t = r, s = () => t.length - r.length, n = e[1].trim(), l = n.length > 1, a = { type: "list", raw: "", ordered: l, start: l ? +n.slice(0, -1) : "", loose: !1, items: [] };
      n = l ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = l ? n : "[*+-]");
      let i = this.rules.other.listItemRegex(n), p = !1;
      for (; r; ) {
        let o = !1, u = "";
        if (!(e = i.exec(r)) || this.rules.block.hr.test(r)) break;
        let k = s();
        r = r.substring(e[0].length);
        let g = e[2].split(`
`, 1)[0], x = e[1].length, b = this.options.pedantic ? J(g, x) : g.replace(this.rules.other.leadingSpaceTab, (B) => J(B, x)), f = r.split(`
`, 1)[0], S = !b.trim(), m = 0;
        if (this.options.pedantic ? (m = 2, u = b.trimStart()) : S ? m = x + 1 : (m = b.search(this.rules.other.nonSpaceChar), m = m > 4 ? 1 : m, u = b.slice(m), m += x), S && this.rules.other.blankLine.test(f) && (r = r.substring(f.length + 1), o = !0), !o) {
          let B = this.rules.other.nextBulletRegex(m), O = this.rules.other.hrRegex(m), X = this.rules.other.fencesBeginRegex(m), G = this.options.pedantic ? this.rules.other.pedanticHeadingBeginRegex(m) : this.rules.other.headingBeginRegex(m), P = this.rules.other.htmlBeginRegex(m), W = this.rules.other.blockquoteBeginRegex(m);
          for (; r; ) {
            let M = r.split(`
`, 1)[0], q;
            if (f = M, this.options.pedantic ? (f = f.replace(this.rules.other.listReplaceNesting, "  "), q = f) : q = f.replace(this.rules.other.leadingSpaceTab, (ee) => J(ee)), X.test(f) || G.test(f) || P.test(f) || W.test(f) || B.test(f) || O.test(f)) break;
            if (q.search(this.rules.other.nonSpaceChar) >= m || !f.trim()) u += `
` + q.slice(m);
            else {
              if (S || b.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || X.test(b) || G.test(b) || P.test(b) || O.test(b)) break;
              let ee = !this.options.pedantic && /^ {0,3}(?:=+|-+) *$/.test(f) && this.rules.block.lheading.test(`${b}
${f}`) ? `    ${q.replace(/^ {0,3}/, "")}` : f;
              u += `
` + ee;
            }
            S = !f.trim(), r = r.substring(M.length + 1), b = q.slice(m);
          }
        }
        let T = t.slice(k, s());
        a.loose || (p ? a.loose = !0 : this.rules.other.doubleBlankLine.test(T) && (p = !0)), a.items.push({ type: "list_item", raw: T, task: !!this.options.gfm && this.rules.other.listIsTask.test(u), loose: !1, text: u, tokens: [] });
      }
      let c = a.items.at(-1);
      if (c) c.raw = c.raw.trimEnd(), c.text = c.text.trimEnd();
      else return;
      a.raw = t.slice(0, s()).trimEnd();
      for (let o of a.items) if (this.lexer.state.top = !1, o.tokens = this.lexer.blockTokens(o.text, []), !a.loose) {
        let u = o.tokens.filter((g) => g.type === "space"), k = u.length > 0 && u.some((g) => this.rules.other.anyLine.test(g.raw));
        a.loose = k;
      }
      for (let o of a.items) {
        let u = o.tokens[0];
        if (o.task && (u?.type === "text" || u?.type === "paragraph")) {
          o.text = o.text.replace(this.rules.other.listReplaceTask, ""), u.raw = u.raw.replace(this.rules.other.listReplaceTask, ""), u.text = u.text.replace(this.rules.other.listReplaceTask, "");
          for (let g = this.lexer.inlineQueue.length - 1; g >= 0; g--) if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[g].src)) {
            this.lexer.inlineQueue[g].src = this.lexer.inlineQueue[g].src.replace(this.rules.other.listReplaceTask, "");
            break;
          }
          let k = this.rules.other.listTaskCheckbox.exec(o.raw);
          if (k) {
            let g = { type: "checkbox", raw: k[0] + " ", checked: k[0] !== "[ ]" };
            o.checked = g.checked, a.loose ? o.tokens[0] && ["paragraph", "text"].includes(o.tokens[0].type) && "tokens" in o.tokens[0] && o.tokens[0].tokens ? (o.tokens[0].raw = g.raw + o.tokens[0].raw, o.tokens[0].text = g.raw + o.tokens[0].text, o.tokens[0].tokens.unshift(g)) : o.tokens.unshift({ type: "paragraph", raw: g.raw, text: g.raw, tokens: [g] }) : o.tokens.unshift(g);
          }
        } else o.task && (o.task = !1);
      }
      if (a.loose) for (let o of a.items) {
        o.loose = !0;
        for (let u of o.tokens) u.type === "text" && (u.type = "paragraph");
      }
      return a;
    }
  }
  html(r) {
    let e = this.rules.block.html.exec(r);
    if (e) {
      let t = me(e[0]);
      return { type: "html", block: !0, raw: t, pre: e[1] === "pre" || e[1] === "script" || e[1] === "style", text: t };
    }
  }
  def(r) {
    let e = this.rules.block.def.exec(r);
    if (e) {
      if (!this.rules.other.startAngleBracket.test(e[2]) && we(e[2], "()") !== -1) return;
      let t = V(e[1]), s = e[2] ? e[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", n = e[3] ? e[3].substring(1, e[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : e[3];
      return { type: "def", tag: t, raw: z(e[0], `
`), href: s, title: n };
    }
  }
  table(r) {
    let e = this.rules.block.table.exec(r);
    if (!e || !this.rules.other.tableDelimiter.test(e[2])) return;
    let t = be(e[1]), s = e[2].replace(this.rules.other.tableAlignChars, "").split("|"), n = e[3]?.trim() ? e[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], l = { type: "table", raw: z(e[0], `
`), header: [], align: [], rows: [] };
    if (t.length === s.length) {
      for (let a of s) this.rules.other.tableAlignRight.test(a) ? l.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? l.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? l.align.push("left") : l.align.push(null);
      for (let a = 0; a < t.length; a++) l.header.push({ text: t[a], tokens: this.lexer.inline(t[a]), header: !0, align: l.align[a] });
      for (let a of n) l.rows.push(be(a, l.header.length).map((i, p) => ({ text: i, tokens: this.lexer.inline(i), header: !1, align: l.align[p] })));
      return l;
    }
  }
  lheading(r) {
    let e = this.rules.block.lheading.exec(r);
    if (e) {
      let t = e[1].trim();
      return { type: "heading", raw: z(e[0], `
`), depth: e[2].charAt(0) === "=" ? 1 : 2, text: t, tokens: this.lexer.inline(t) };
    }
  }
  paragraph(r) {
    let e = this.rules.block.paragraph.exec(r);
    if (e) {
      let t = e[1].charAt(e[1].length - 1) === `
` ? e[1].slice(0, -1) : e[1];
      return { type: "paragraph", raw: e[0], text: t, tokens: this.lexer.inline(t) };
    }
  }
  text(r) {
    let e = this.rules.block.text.exec(r);
    if (e) return { type: "text", raw: e[0], text: e[0], tokens: this.lexer.inline(e[0]) };
  }
  escape(r) {
    let e = this.rules.inline.escape.exec(r);
    if (e) return { type: "escape", raw: e[0], text: e[1] };
  }
  tag(r) {
    let e = this.rules.inline.tag.exec(r);
    if (e) return !this.lexer.state.inLink && this.rules.other.startATag.test(e[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && this.rules.other.endATag.test(e[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(e[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(e[0]) && (this.lexer.state.inRawBlock = !1), { type: "html", raw: e[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: !1, text: e[0] };
  }
  link(r) {
    if (this.lexer.state.linkParenPossible === !1) return;
    let e = this.rules.inline.link.exec(r);
    if (e) {
      let t = e[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && $e(r, e[1], t, this.rules)) return;
      let s = e[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(s)) {
        if (!this.rules.other.endAngleBracket.test(s)) return;
        let i = z(s.slice(0, -1), "\\");
        if ((s.length - i.length) % 2 === 0) return;
      } else {
        let i = we(e[2], "()");
        if (i === -2) return;
        if (i > -1) {
          let p = (e[0].indexOf("!") === 0 ? 5 : 4) + e[1].length + i;
          e[2] = e[2].substring(0, i), e[0] = e[0].substring(0, p).trim(), e[3] = "";
        }
      }
      let n = z(e[0].slice(0, -1), "\\");
      if ((e[0].length - n.length) % 2 === 0) return;
      let l = e[2], a = "";
      if (this.options.pedantic) {
        let i = this.rules.other.pedanticHrefTitle.exec(l);
        i && (l = i[1], a = i[3]);
      } else a = e[3] ? e[3].slice(1, -1) : "";
      return l = l.trim(), this.rules.other.startAngleBracket.test(l) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(s) ? l = l.slice(1) : l = l.slice(1, -1)), Se(e, { href: l && l.replace(this.rules.inline.anyPunctuation, "$1"), title: a && a.replace(this.rules.inline.anyPunctuation, "$1") }, e[0], this.lexer, this.rules);
    }
  }
  reflink(r, e) {
    let t;
    if ((t = this.rules.inline.reflink.exec(r)) || (t = this.rules.inline.nolink.exec(r))) {
      let s = t[0].charAt(0) === "!" ? 2 : 1;
      if (!this.options.pedantic && $e(r, t[1], s, this.rules)) return;
      let n = e[V(t[2] || t[1])];
      if (!n) {
        let l = t[0].charAt(0);
        return { type: "text", raw: l, text: l };
      }
      return Se(t, n, t[0], this.lexer, this.rules);
    }
  }
  emStrong(r, e, t = "") {
    let s = this.rules.inline.emStrongLDelim.exec(r);
    if (!s || !s[1] && !s[2] && !s[3] && !s[4]) return;
    let n = s[0][0], l = t === n, a = e.length - r.length, i = a;
    for (; !this.options.pedantic && i > 0 && e[i - 1] === n; ) i--;
    let p = [...e.slice(Math.max(0, i - 2), i)].at(-1) ?? "", c = p === "*" || p === "_" || !!this.rules.inline.punctuation.exec(p);
    i < a && (t = p);
    let o = i < a ? c : !!this.rules.inline.punctuation.exec(t);
    if (s[4] && t.match(this.rules.other.unicodeAlphaNumeric)) return;
    let u = s[1] || s[3] || "";
    if (!u || !t || o) {
      let k = [...s[0]].length - 1, g, x, b = k, f = 0, S = a - i + k, m = !this.options.pedantic && !!p.trim() && (!!u || n === "*" && !c);
      if (n !== "*" && n !== "_") return;
      let T = n === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd, B = Lt(this, e, n), O = e.length - r.length + k;
      if (B < O) return;
      e = e.slice(-1 * r.length + k);
      let X = B - O;
      for (T.lastIndex = 0; (s = T.exec(e)) !== null && !(s.index > X); ) {
        if (g = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !g) continue;
        if (x = [...g].length, s[3] || s[4]) {
          b += x;
          continue;
        } else if (s[5] || s[6] || m) {
          if (l && (s[5] || s[6])) break;
          if (S % 3 && !((S + x) % 3)) {
            f += x;
            continue;
          }
        }
        if (b -= x, b > 0) continue;
        x = Math.min(x, x + b + f);
        let G = [...s[0]][0].length, P = r.slice(0, k + s.index + G + x);
        if (Math.min(k, x) % 2) {
          let M = P.slice(1, -1);
          return { type: "em", raw: P, text: M, tokens: this.lexer.inlineTokens(M) };
        }
        let W = P.slice(2, -2);
        return { type: "strong", raw: P, text: W, tokens: this.lexer.inlineTokens(W) };
      }
    }
  }
  codespan(r) {
    let e = this.rules.inline.code.exec(r);
    if (e) {
      let t = e[2].replace(this.rules.other.newLineCharGlobal, " "), s = this.rules.other.nonSpaceChar.test(t), n = this.rules.other.startingSpaceChar.test(t) && this.rules.other.endingSpaceChar.test(t);
      return s && n && (t = t.substring(1, t.length - 1)), { type: "codespan", raw: e[0], text: t };
    }
  }
  br(r) {
    let e = this.rules.inline.br.exec(r);
    if (e) return { type: "br", raw: e[0] };
  }
  del(r, e, t = "") {
    let s = this.rules.inline.delLDelim.exec(r);
    if (s && (!s[1] || !t || this.rules.inline.punctuation.exec(t))) {
      let n = [...s[0]].length - 1, l, a, i = n, p = this.rules.inline.delRDelim, c = Bt(this, e), o = e.length - r.length + n;
      if (c < o) return;
      e = e.slice(-1 * r.length + n);
      let u = c - o;
      for (p.lastIndex = 0; (s = p.exec(e)) !== null && !(s.index > u); ) {
        if (l = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !l || (a = [...l].length, a !== n)) continue;
        if (s[3] || s[4]) {
          i += a;
          continue;
        }
        if (i -= a, i > 0) continue;
        a = Math.min(a, a + i);
        let k = [...s[0]][0].length, g = r.slice(0, n + s.index + k + a), x = g.slice(n, -n);
        return { type: "del", raw: g, text: x, tokens: this.lexer.inlineTokens(x) };
      }
    }
  }
  autolink(r) {
    let e = this.rules.inline.autolink.exec(r);
    if (e) {
      let t, s;
      return e[2] === "@" ? (t = e[1], s = "mailto:" + t) : (t = e[1], s = t), { type: "link", raw: e[0], text: t, href: s, autolink: !0, tokens: [{ type: "text", raw: t, text: t }] };
    }
  }
  url(r) {
    let e;
    if (e = this.rules.inline.url.exec(r)) {
      let t, s;
      if (e[2] === "@") t = e[0], s = "mailto:" + t;
      else {
        let n;
        do
          n = e[0], e[0] = this.rules.inline._backpedal.exec(e[0])?.[0] ?? "";
        while (n !== e[0]);
        t = e[0], e[1] === "www." ? s = "http://" + e[0] : s = e[0];
      }
      return { type: "link", raw: e[0], text: t, href: s, autolink: !0, tokens: [{ type: "text", raw: t, text: t }] };
    }
  }
  inlineText(r) {
    let e = this.rules.inline.text.exec(r);
    if (e) {
      let t = this.lexer.state.inRawBlock;
      return { type: "text", raw: e[0], text: t ? e[0] : It(e[0]), escaped: t };
    }
  }
}, y = class re {
  tokens;
  options;
  state;
  inlineQueue;
  tokenizer;
  constructor(e) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || L, this.options.tokenizer = this.options.tokenizer || new v(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: !1, inRawBlock: !1, linkEmitted: !1, linkParenPossible: !0, top: !0 };
    let t = { other: w, block: U.normal, inline: Q.normal };
    this.options.pedantic ? (t.block = U.pedantic, t.inline = Q.pedantic) : this.options.gfm && (t.block = U.gfm, this.options.breaks ? t.inline = Q.breaks : t.inline = Q.gfm), this.tokenizer.rules = t;
  }
  static get rules() {
    return { block: U, inline: Q };
  }
  static lex(e, t) {
    return new re(t).lex(e);
  }
  static lexInline(e, t) {
    return new re(t).inlineTokens(e);
  }
  lex(e) {
    e = e.replace(w.carriageReturn, `
`), this.blockTokens(e, this.tokens);
    for (let t = 0; t < this.inlineQueue.length; t++) {
      let s = this.inlineQueue[t];
      this.state.inRawBlock = !1, this.inlineTokens(s.src, s.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e, t = [], s = !1) {
    this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(w.tabCharGlobal, "    ").replace(w.spaceLine, ""));
    let n = 1 / 0;
    for (; e; ) {
      if (e.length < n) n = e.length;
      else {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
      let l;
      if (this.options.extensions?.block?.some((i) => (l = i.call({ lexer: this }, e, t)) ? (e = e.substring(l.raw.length), t.push(l), !0) : !1)) continue;
      if (l = this.tokenizer.space(e)) {
        e = e.substring(l.raw.length);
        let i = t.at(-1);
        l.raw.length === 1 && i !== void 0 ? i.raw += `
` : t.push(l);
        continue;
      }
      if (l = this.tokenizer.code(e)) {
        e = e.substring(l.raw.length);
        let i = t.at(-1);
        i?.type === "paragraph" || i?.type === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + l.raw, i.text += `
` + l.text, this.inlineQueue.at(-1).src = i.text) : t.push(l);
        continue;
      }
      if (l = this.tokenizer.fences(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.heading(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.hr(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.blockquote(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.list(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.html(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.def(e)) {
        e = e.substring(l.raw.length);
        let i = t.at(-1);
        i?.type === "paragraph" || i?.type === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + l.raw, i.text += `
` + l.raw, this.inlineQueue.at(-1).src = i.text) : (this.tokens.links[l.tag] || (this.tokens.links[l.tag] = { href: l.href, title: l.title }), t.push(l));
        continue;
      }
      if (l = this.tokenizer.table(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      if (l = this.tokenizer.lheading(e)) {
        e = e.substring(l.raw.length), t.push(l);
        continue;
      }
      let a = e;
      if (this.options.extensions?.startBlock) {
        let i = 1 / 0, p = e.slice(1), c;
        this.options.extensions.startBlock.forEach((o) => {
          c = o.call({ lexer: this }, p), typeof c == "number" && c >= 0 && (i = Math.min(i, c));
        }), i < 1 / 0 && i >= 0 && (a = e.substring(0, i + 1));
      }
      if (this.state.top && (l = this.tokenizer.paragraph(a))) {
        let i = t.at(-1);
        s && i?.type === "paragraph" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + l.raw, i.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = i.text) : t.push(l), s = a.length !== e.length, e = e.substring(l.raw.length);
        continue;
      }
      if (l = this.tokenizer.text(e)) {
        e = e.substring(l.raw.length);
        let i = t.at(-1);
        i?.type === "text" ? (i.raw += (i.raw.endsWith(`
`) ? "" : `
`) + l.raw, i.text += `
` + l.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = i.text) : t.push(l);
        continue;
      }
      if (e) {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
    }
    return this.state.top = !0, t;
  }
  inline(e, t = []) {
    return this.inlineQueue.push({ src: e, tokens: t }), t;
  }
  linkInText(e) {
    if (!e.includes("[")) return !1;
    let t = this.tokenizer.rules.inline.link;
    for (let s of e.matchAll(this.tokenizer.rules.inline.blockSkip)) if (t.test(s[0]) && e.charAt(s.index - 1) !== "!") return !0;
    for (let s of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)) {
      let n = s[0], l = n.lastIndexOf("[");
      if (!(n.charAt(0) === "!" || !Object.hasOwn(this.tokens.links, V(n.slice(l + 1, -1)))) && !(l > 1 && this.linkInText(n.slice(1, l - 1)))) return !0;
    }
    return !1;
  }
  inlineTokens(e, t = []) {
    this.tokenizer.lexer = this;
    let s = this.state.linkParenPossible;
    this.state.linkParenPossible = s && e.includes(")");
    try {
      return this.#e(e, t);
    } finally {
      this.state.linkParenPossible = s;
    }
  }
  #e(e, t) {
    let s = e.includes("*") || e.includes("_") || e.includes("~") || this.options.hooks?.emStrongMask || this.tokenizer.emStrong !== v.prototype.emStrong || this.tokenizer.del !== v.prototype.del ? this.#r(e) : e;
    Ct(this.tokenizer, s);
    try {
      return this.#t(e, s, t);
    } finally {
      Et(this.tokenizer);
    }
  }
  #t(e, t, s) {
    let n = !1, l = "", a = 1 / 0;
    for (; e; ) {
      if (e.length < a) a = e.length;
      else {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
      n || (l = ""), n = !1;
      let i;
      if (this.options.extensions?.inline?.some((c) => (i = c.call({ lexer: this }, e, s)) ? (e = e.substring(i.raw.length), s.push(i), !0) : !1)) continue;
      if (i = this.tokenizer.escape(e)) {
        e = e.substring(i.raw.length), s.push(i);
        continue;
      }
      if (i = this.tokenizer.tag(e)) {
        e = e.substring(i.raw.length), s.push(i);
        continue;
      }
      if (i = this.tokenizer.link(e)) {
        e = e.substring(i.raw.length), s.push(i);
        continue;
      }
      if (i = this.tokenizer.reflink(e, this.tokens.links)) {
        e = e.substring(i.raw.length);
        let c = s.at(-1);
        i.type === "text" && c?.type === "text" ? (c.raw += i.raw, c.text += i.text) : s.push(i);
        continue;
      }
      if (i = this.tokenizer.emStrong(e, t, l)) {
        e = e.substring(i.raw.length), s.push(i);
        continue;
      }
      if (i = this.tokenizer.codespan(e)) {
        e = e.substring(i.raw.length), s.push(i);
        continue;
      }
      if (i = this.tokenizer.br(e)) {
        e = e.substring(i.raw.length), s.push(i);
        continue;
      }
      if (i = this.tokenizer.del(e, t, l)) {
        e = e.substring(i.raw.length), s.push(i);
        continue;
      }
      if (i = this.tokenizer.autolink(e)) {
        e = e.substring(i.raw.length), s.push(i);
        continue;
      }
      if (!this.state.inLink && (i = this.tokenizer.url(e))) {
        e = e.substring(i.raw.length), s.push(i);
        continue;
      }
      let p = e;
      if (this.options.extensions?.startInline) {
        let c = 1 / 0, o = e.slice(1), u;
        this.options.extensions.startInline.forEach((k) => {
          u = k.call({ lexer: this }, o), typeof u == "number" && u >= 0 && (c = Math.min(c, u));
        }), c < 1 / 0 && c >= 0 && (p = e.substring(0, c + 1));
      }
      if (i = this.tokenizer.inlineText(p)) {
        e = e.substring(i.raw.length), i.raw.slice(-1) !== "_" && (l = i.raw.slice(-1)), n = !0;
        let c = s.at(-1);
        c?.type === "text" ? (c.raw += i.raw, c.text += i.text) : s.push(i);
        continue;
      }
      if (e) {
        this.infiniteLoopError(e.charCodeAt(0));
        break;
      }
    }
    return s;
  }
  #r(e) {
    let t = e;
    if (this.tokens.links && e.includes("[")) {
      let s = this.tokenizer.rules.inline.reflinkSearch, n = (l) => {
        let a = l.lastIndexOf("[");
        if (!Object.hasOwn(this.tokens.links, V(l.slice(a + 1, -1)))) return l;
        if (a > 1 && l.charAt(0) !== "!") {
          let i = l.slice(1, a - 1);
          if (this.linkInText(i)) return "[" + i.replace(s, n) + "][" + "a".repeat(l.length - a - 2) + "]";
        }
        return "[" + "a".repeat(l.length - 2) + "]";
      };
      t = t.replace(s, n);
    }
    return t = t.replace(this.tokenizer.rules.inline.anyPunctuationOutsideCode, (s, n, l) => l ? "+".repeat(s.length) : n ? n + s.slice(n.length, -n.length).replace(/`/g, "+") + n : s), t = t.replace(this.tokenizer.rules.inline.blockSkip, (s, n, l) => {
      let a = l ? l.length : 0;
      return s.slice(0, a) + "[" + "a".repeat(s.length - a - 2) + "]";
    }), t = this.options.hooks?.emStrongMask?.call({ lexer: this }, t) ?? t, t;
  }
  infiniteLoopError(e) {
    let t = "Infinite loop on byte: " + e;
    if (this.options.silent) console.error(t);
    else throw new Error(t);
  }
}, Y = class {
  options;
  parser;
  constructor(r) {
    this.options = r || L;
  }
  space(r) {
    return "";
  }
  code({ text: r, lang: e, escaped: t }) {
    let s = (e || "").match(w.notSpaceStart)?.[0], n = r ? r.replace(w.endingNewline, "") + `
` : "";
    return s ? '<pre><code class="language-' + $(s) + '">' + (t ? n : $(n, !0)) + `</code></pre>
` : "<pre><code>" + (t ? n : $(n, !0)) + `</code></pre>
`;
  }
  blockquote({ tokens: r }) {
    return `<blockquote>
${this.parser.parse(r)}</blockquote>
`;
  }
  html({ text: r }) {
    return r;
  }
  def(r) {
    return "";
  }
  heading({ tokens: r, depth: e }) {
    return `<h${e}>${this.parser.parseInline(r)}</h${e}>
`;
  }
  hr(r) {
    return `<hr>
`;
  }
  list(r) {
    let e = r.ordered, t = r.start, s = "";
    for (let a = 0; a < r.items.length; a++) {
      let i = r.items[a];
      s += this.listitem(i);
    }
    let n = e ? "ol" : "ul", l = e && t !== 1 ? ' start="' + t + '"' : "";
    return "<" + n + l + `>
` + s + "</" + n + `>
`;
  }
  listitem(r) {
    return `<li>${this.parser.parse(r.tokens)}</li>
`;
  }
  checkbox({ checked: r }) {
    return "<input " + (r ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
  }
  paragraph({ tokens: r }) {
    return `<p>${this.parser.parseInline(r)}</p>
`;
  }
  table(r) {
    let e = "", t = "";
    for (let n = 0; n < r.header.length; n++) t += this.tablecell(r.header[n]);
    e += this.tablerow({ text: t });
    let s = "";
    for (let n = 0; n < r.rows.length; n++) {
      let l = r.rows[n];
      t = "";
      for (let a = 0; a < l.length; a++) t += this.tablecell(l[a]);
      s += this.tablerow({ text: t });
    }
    return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + e + `</thead>
` + s + `</table>
`;
  }
  tablerow({ text: r }) {
    return `<tr>
${r}</tr>
`;
  }
  tablecell(r) {
    let e = this.parser.parseInline(r.tokens), t = r.header ? "th" : "td";
    return (r.align ? `<${t} align="${r.align}">` : `<${t}>`) + e + `</${t}>
`;
  }
  strong({ tokens: r }) {
    return `<strong>${this.parser.parseInline(r)}</strong>`;
  }
  em({ tokens: r }) {
    return `<em>${this.parser.parseInline(r)}</em>`;
  }
  codespan({ text: r }) {
    return `<code>${$(r, !0)}</code>`;
  }
  br(r) {
    return "<br>";
  }
  del({ tokens: r }) {
    return `<del>${this.parser.parseInline(r)}</del>`;
  }
  link({ href: r, title: e, text: t, tokens: s, autolink: n }) {
    let l = n ? $(t, !0) : this.parser.parseInline(s), a = xe(r);
    if (a === null) return l;
    r = $(a, n);
    let i = '<a href="' + r + '"';
    return e && (i += ' title="' + $(e) + '"'), i += ">" + l + "</a>", i;
  }
  image({ href: r, title: e, text: t, tokens: s }) {
    s && (t = this.parser.parseInline(s, this.parser.textRenderer));
    let n = xe(r);
    if (n === null) return $(t);
    r = n;
    let l = `<img src="${$(r)}" alt="${$(t)}"`;
    return e && (l += ` title="${$(e)}"`), l += ">", l;
  }
  text(r) {
    return "tokens" in r && r.tokens ? this.parser.parseInline(r.tokens) : "escaped" in r && r.escaped ? r.text : $(r.text);
  }
}, ue = class {
  parser;
  strong({ text: r, tokens: e }) {
    return e ? this.parser.parseInline(e, this) : r;
  }
  em({ text: r, tokens: e }) {
    return e ? this.parser.parseInline(e, this) : r;
  }
  codespan({ text: r }) {
    return r;
  }
  del({ text: r, tokens: e }) {
    return e ? this.parser.parseInline(e, this) : r;
  }
  html({ text: r }) {
    return r;
  }
  text({ text: r }) {
    return r;
  }
  link({ text: r, tokens: e }) {
    return e ? this.parser.parseInline(e, this) : r;
  }
  image({ text: r, tokens: e }) {
    return e ? this.parser.parseInline(e, this) : r;
  }
  br() {
    return "";
  }
  checkbox({ raw: r }) {
    return r;
  }
}, R = class ne {
  options;
  renderer;
  textRenderer;
  constructor(e) {
    this.options = e || L, this.options.renderer = this.options.renderer || new Y(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new ue(), this.textRenderer.parser = this;
  }
  static parse(e, t) {
    return new ne(t).parse(e);
  }
  static parseInline(e, t) {
    return new ne(t).parseInline(e);
  }
  parse(e) {
    this.renderer.parser = this;
    let t = "";
    for (let s = 0; s < e.length; s++) {
      let n = e[s];
      if (this.options.extensions?.renderers?.[n.type]) {
        let a = n, i = this.options.extensions.renderers[a.type].call({ parser: this }, a);
        if (i !== !1 || !["space", "hr", "heading", "code", "table", "blockquote", "list", "checkbox", "html", "def", "paragraph", "text"].includes(a.type)) {
          t += i || "";
          continue;
        }
      }
      let l = n;
      switch (l.type) {
        case "space": {
          t += this.renderer.space(l);
          break;
        }
        case "hr": {
          t += this.renderer.hr(l);
          break;
        }
        case "heading": {
          t += this.renderer.heading(l);
          break;
        }
        case "code": {
          t += this.renderer.code(l);
          break;
        }
        case "table": {
          t += this.renderer.table(l);
          break;
        }
        case "blockquote": {
          t += this.renderer.blockquote(l);
          break;
        }
        case "list": {
          t += this.renderer.list(l);
          break;
        }
        case "checkbox": {
          t += this.renderer.checkbox(l);
          break;
        }
        case "html": {
          t += this.renderer.html(l);
          break;
        }
        case "def": {
          t += this.renderer.def(l);
          break;
        }
        case "paragraph": {
          t += this.renderer.paragraph(l);
          break;
        }
        case "text": {
          t += this.renderer.text(l);
          break;
        }
        default: {
          let a = 'Token with "' + l.type + '" type was not found.';
          if (this.options.silent) return console.error(a), "";
          throw new Error(a);
        }
      }
    }
    return t;
  }
  parseInline(e, t = this.renderer) {
    this.renderer.parser = this;
    let s = "";
    for (let n = 0; n < e.length; n++) {
      let l = e[n];
      if (this.options.extensions?.renderers?.[l.type]) {
        let i = this.options.extensions.renderers[l.type].call({ parser: this }, l);
        if (i !== !1 || !["escape", "html", "link", "image", "checkbox", "strong", "em", "codespan", "br", "del", "text"].includes(l.type)) {
          s += i || "";
          continue;
        }
      }
      let a = l;
      switch (a.type) {
        case "escape": {
          s += t.text(a);
          break;
        }
        case "html": {
          s += t.html(a);
          break;
        }
        case "link": {
          s += t.link(a);
          break;
        }
        case "image": {
          s += t.image(a);
          break;
        }
        case "checkbox": {
          s += t.checkbox(a);
          break;
        }
        case "strong": {
          s += t.strong(a);
          break;
        }
        case "em": {
          s += t.em(a);
          break;
        }
        case "codespan": {
          s += t.codespan(a);
          break;
        }
        case "br": {
          s += t.br(a);
          break;
        }
        case "del": {
          s += t.del(a);
          break;
        }
        case "text": {
          s += t.text(a);
          break;
        }
        default: {
          let i = 'Token with "' + a.type + '" type was not found.';
          if (this.options.silent) return console.error(i), "";
          throw new Error(i);
        }
      }
    }
    return s;
  }
}, j = class {
  options;
  block;
  constructor(r) {
    this.options = r || L;
  }
  static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
  static passThroughHooksRespectAsync = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
  preprocess(r) {
    return r;
  }
  postprocess(r) {
    return r;
  }
  processAllTokens(r) {
    return r;
  }
  emStrongMask(r) {
    return r;
  }
  provideLexer(r = this.block) {
    return r ? y.lex : y.lexInline;
  }
  provideParser(r = this.block) {
    return r ? R.parse : R.parseInline;
  }
};
function _(r, e) {
  if (Array.isArray(e)) for (let t = 0; t < e.length; t++) r.push(e[t]);
  else r.push(e);
}
var vt = class {
  defaults = se();
  options = this.setOptions;
  parse = this.parseMarkdown(!0);
  parseInline = this.parseMarkdown(!1);
  Parser = R;
  Renderer = Y;
  TextRenderer = ue;
  Lexer = y;
  Tokenizer = v;
  Hooks = j;
  constructor(...r) {
    this.use(...r);
  }
  walkTokens(r, e) {
    let t = [];
    for (let s of r) switch (_(t, e.call(this, s)), s.type) {
      case "table": {
        let n = s;
        for (let l of n.header) _(t, this.walkTokens(l.tokens, e));
        for (let l of n.rows) for (let a of l) _(t, this.walkTokens(a.tokens, e));
        break;
      }
      case "list": {
        let n = s;
        _(t, this.walkTokens(n.items, e));
        break;
      }
      default: {
        let n = s;
        this.defaults.extensions?.childTokens?.[n.type] ? this.defaults.extensions.childTokens[n.type].forEach((l) => {
          let a = n[l].flat(1 / 0);
          _(t, this.walkTokens(a, e));
        }) : n.tokens && _(t, this.walkTokens(n.tokens, e));
      }
    }
    return t;
  }
  use(...r) {
    let e = this.defaults.extensions || { renderers: /* @__PURE__ */ Object.create(null), childTokens: /* @__PURE__ */ Object.create(null) };
    return r.forEach((t) => {
      let s = { ...t };
      if (s.async = this.defaults.async || s.async || !1, t.extensions && (t.extensions.forEach((n) => {
        if (!n.name) throw new Error("extension name required");
        if ("renderer" in n) {
          let l = e.renderers[n.name];
          l ? e.renderers[n.name] = function(...a) {
            let i = n.renderer.apply(this, a);
            return i === !1 && (i = l.apply(this, a)), i;
          } : e.renderers[n.name] = n.renderer;
        }
        if ("tokenizer" in n) {
          if (!n.level || n.level !== "block" && n.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let l = e[n.level];
          l ? l.unshift(n.tokenizer) : e[n.level] = [n.tokenizer], n.start && (n.level === "block" ? e.startBlock ? e.startBlock.push(n.start) : e.startBlock = [n.start] : n.level === "inline" && (e.startInline ? e.startInline.push(n.start) : e.startInline = [n.start]));
        }
        "childTokens" in n && n.childTokens && (e.childTokens[n.name] = n.childTokens);
      }), s.extensions = e), t.renderer) {
        let n = this.defaults.renderer || new Y(this.defaults);
        for (let l in t.renderer) {
          if (!(l in n)) throw new Error(`renderer '${l}' does not exist`);
          if (["options", "parser"].includes(l)) continue;
          let a = l, i = t.renderer[a], p = n[a];
          n[a] = (...c) => {
            let o = i.apply(n, c);
            return o === !1 && (o = p.apply(n, c)), o === !1 ? "" : o ?? "";
          };
        }
        s.renderer = n;
      }
      if (t.tokenizer) {
        let n = this.defaults.tokenizer || new v(this.defaults);
        for (let l in t.tokenizer) {
          if (!(l in n)) throw new Error(`tokenizer '${l}' does not exist`);
          if (["options", "rules", "lexer"].includes(l)) continue;
          let a = l, i = t.tokenizer[a], p = n[a];
          n[a] = (...c) => {
            let o = i.apply(n, c);
            return o === !1 && (o = p.apply(n, c)), o;
          };
        }
        s.tokenizer = n;
      }
      if (t.hooks) {
        let n = this.defaults.hooks || new j();
        for (let l in t.hooks) {
          if (!(l in n)) throw new Error(`hook '${l}' does not exist`);
          if (["options", "block"].includes(l)) continue;
          let a = l, i = t.hooks[a], p = n[a];
          j.passThroughHooks.has(l) ? n[a] = (c) => {
            if (n.options.async && j.passThroughHooksRespectAsync.has(l)) return (async () => {
              let u = await i.call(n, c);
              return p.call(n, u);
            })();
            let o = i.call(n, c);
            return p.call(n, o);
          } : n[a] = (...c) => {
            if (n.options.async) return (async () => {
              let u = await i.apply(n, c);
              return u === !1 && (u = await p.apply(n, c)), u;
            })();
            let o = i.apply(n, c);
            return o === !1 && (o = p.apply(n, c)), o;
          };
        }
        s.hooks = n;
      }
      if (t.walkTokens) {
        let n = this.defaults.walkTokens, l = t.walkTokens;
        s.walkTokens = function(a) {
          let i = [];
          return _(i, l.call(this, a)), n && _(i, n.call(this, a)), i;
        };
      }
      this.defaults = { ...this.defaults, ...s };
    }), this;
  }
  setOptions(r) {
    return this.defaults = { ...this.defaults, ...r }, this;
  }
  lexer(r, e) {
    return y.lex(r, e ?? this.defaults);
  }
  parser(r, e) {
    return R.parse(r, e ?? this.defaults);
  }
  parseMarkdown(r) {
    return (e, t) => {
      let s = { ...t }, n = { ...this.defaults, ...s }, l = this.onError(!!n.silent, !!n.async);
      if (this.defaults.async === !0 && s.async === !1) return l(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof e > "u" || e === null) return l(new Error("marked(): input parameter is undefined or null"));
      if (typeof e != "string") return l(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(e) + ", string expected"));
      if (n.hooks && (n.hooks.options = n, n.hooks.block = r), n.async) return (async () => {
        let a = n.hooks ? await n.hooks.preprocess(e) : e, i = await (n.hooks ? await n.hooks.provideLexer(r) : r ? y.lex : y.lexInline)(a, n), p = n.hooks ? await n.hooks.processAllTokens(i) : i;
        n.walkTokens && await Promise.all(this.walkTokens(p, n.walkTokens));
        let c = await (n.hooks ? await n.hooks.provideParser(r) : r ? R.parse : R.parseInline)(p, n);
        return n.hooks ? await n.hooks.postprocess(c) : c;
      })().catch(l);
      try {
        n.hooks && (e = n.hooks.preprocess(e));
        let a = (n.hooks ? n.hooks.provideLexer(r) : r ? y.lex : y.lexInline)(e, n);
        n.hooks && (a = n.hooks.processAllTokens(a)), n.walkTokens && this.walkTokens(a, n.walkTokens);
        let i = (n.hooks ? n.hooks.provideParser(r) : r ? R.parse : R.parseInline)(a, n);
        return n.hooks && (i = n.hooks.postprocess(i)), i;
      } catch (a) {
        return l(a);
      }
    };
  }
  onError(r, e) {
    return (t) => {
      if (t.message += `
Please report this to https://github.com/markedjs/marked.`, r) {
        let s = "<p>An error occurred:</p><pre>" + $(t.message + "", !0) + "</pre>";
        return e ? Promise.resolve(s) : s;
      }
      if (e) return Promise.reject(t);
      throw t;
    };
  }
}, E = new vt();
function d(r, e) {
  return E.parse(r, e);
}
d.options = d.setOptions = function(r) {
  return E.setOptions(r), d.defaults = E.defaults, ye(d.defaults), d;
};
d.getDefaults = se;
d.defaults = L;
function Zt(...r) {
  return E.use(...r), d.defaults = E.defaults, ye(d.defaults), d;
}
d.use = Zt;
d.walkTokens = function(r, e) {
  return E.walkTokens(r, e);
};
d.parseInline = E.parseInline;
d.Parser = R;
d.parser = R.parse;
d.Renderer = Y;
d.TextRenderer = ue;
d.Lexer = y;
d.lexer = y.lex;
d.Tokenizer = v;
d.Hooks = j;
d.parse = d;
d.options;
d.setOptions;
d.walkTokens;
d.parseInline;
R.parse;
y.lex;
export {
  j as Hooks,
  y as Lexer,
  vt as Marked,
  R as Parser,
  Y as Renderer,
  ue as TextRenderer,
  v as Tokenizer,
  L as defaults,
  se as getDefaults,
  d as marked,
  Zt as use
};
