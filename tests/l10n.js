// SPDX-License-Identifier: AGPL-3.0-or-later
//
// node tests/l10n.js: every string the page translates (t('…') in js/main.js) is
// in every translation, and the .js and .json of a language agree.

'use strict'

const fs = require('node:fs')
const path = require('node:path')

const app = path.join(__dirname, '..', 'app', 'cryptomator_vaults')
const source = fs.readFileSync(path.join(app, 'js', 'main.js'), 'utf8')
const wanted = new Set()
for (const match of source.matchAll(/\bt\('((?:[^'\\]|\\.)*)'/g)) {
	wanted.add(match[1].replace(/\\'/g, "'"))
}
let failed = false
for (const file of fs.readdirSync(path.join(app, 'l10n')).filter((name) => name.endsWith('.json'))) {
	const json = JSON.parse(fs.readFileSync(path.join(app, 'l10n', file), 'utf8')).translations
	let registered = null
	global.OC = { L10N: { register: (_app, table) => { registered = table } } }
	require(path.join(app, 'l10n', file.replace(/\.json$/, '.js')))
	const missing = [...wanted].filter((text) => !(text in json))
	if (missing.length) {
		failed = true
		console.error(`${file}: missing ${missing.map((text) => JSON.stringify(text)).join(', ')}`)
	}
	if (JSON.stringify(registered) !== JSON.stringify(json)) {
		failed = true
		console.error(`${file}: the .js differs from the .json`)
	}
}
console.log(`${wanted.size} strings checked`)
process.exit(failed ? 1 : 0)
