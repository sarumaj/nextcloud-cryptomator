// SPDX-License-Identifier: AGPL-3.0-or-later
//
// node tests/l10n.js: every string the integration translates (t('…') and
// n('…', '…') in src/) and the app menu's entry are in every translation, a plural
// with as many forms as the language has, and the .js and .json of a language agree.

'use strict'

const fs = require('node:fs')
const path = require('node:path')

const app = path.join(__dirname, '..', 'app', 'cryptomator_vaults')
const src = path.join(__dirname, '..', 'src')
const source = fs.readdirSync(src).filter((name) => name.endsWith('.js'))
	.map((name) => fs.readFileSync(path.join(src, name), 'utf8')).join('\n')
// The app menu's entry (appinfo/info.xml) is translated with the app's strings.
const wanted = new Set(['Vaults'])
for (const match of source.matchAll(/\bt\('((?:[^'\\]|\\.)*)'/g)) {
	wanted.add(match[1].replace(/\\'/g, "'"))
}
// Plurals (n('…', '…', count)): Nextcloud's key for the pair, its forms in a list.
const plurals = new Set()
for (const match of source.matchAll(/\bn\('((?:[^'\\]|\\.)*)', '((?:[^'\\]|\\.)*)'/g)) {
	const key = '_' + match[1].replace(/\\'/g, "'") + '_::_' + match[2].replace(/\\'/g, "'") + '_'
	wanted.add(key)
	plurals.add(key)
}
let failed = false
for (const file of fs.readdirSync(path.join(app, 'l10n')).filter((name) => name.endsWith('.json'))) {
	const { translations: json, pluralForm } = JSON.parse(fs.readFileSync(path.join(app, 'l10n', file), 'utf8'))
	let registered = null
	global.OC = { L10N: { register: (_app, table) => { registered = table } } }
	require(path.join(app, 'l10n', file.replace(/\.json$/, '.js')))
	const missing = [...wanted].filter((text) => !(text in json))
	if (missing.length) {
		failed = true
		console.error(`${file}: missing ${missing.map((text) => JSON.stringify(text)).join(', ')}`)
	}
	const forms = Number(/nplurals=(\d+)/.exec(pluralForm || '')?.[1] || 2)
	for (const key of plurals) {
		if (key in json && (!Array.isArray(json[key]) || json[key].length !== forms)) {
			failed = true
			console.error(`${file}: ${JSON.stringify(key)} needs ${forms} forms`)
		}
	}
	if (JSON.stringify(registered) !== JSON.stringify(json)) {
		failed = true
		console.error(`${file}: the .js differs from the .json`)
	}
}
console.log(`${wanted.size} strings checked`)
process.exit(failed ? 1 : 0)
