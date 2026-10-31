// SPDX-License-Identifier: AGPL-3.0-or-later
//
// npm run notice: NOTICE.md, the third-party packages in the build (js/*.mjs) with
// their versions and licences, read from a build with source maps (made in a
// temporary folder; the committed build is not touched). CI checks it is current.

'use strict'

const { execFileSync } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const root = path.join(__dirname, '..')
const out = fs.mkdtempSync(path.join(os.tmpdir(), 'notice-'))
execFileSync(path.join(root, 'node_modules/.bin/vite'), ['build', '--sourcemap', '--outDir', out, '--logLevel', 'error'], { cwd: root, stdio: 'inherit' })
const packages = new Set()
for (const file of fs.readdirSync(path.join(out, 'js')).filter((name) => name.endsWith('.map'))) {
	for (const source of JSON.parse(fs.readFileSync(path.join(out, 'js', file), 'utf8')).sources) {
		const match = source.match(/node_modules\/((?:@[^/]+\/)?[^/]+)/)
		if (match) {
			packages.add(match[1])
		}
	}
}
fs.rmSync(out, { recursive: true })

const rows = [...packages].sort().map((name) => {
	const manifest = JSON.parse(fs.readFileSync(path.join(root, 'node_modules', name, 'package.json'), 'utf8'))
	const licence = typeof manifest.license === 'string' ? manifest.license : (manifest.license?.type ?? 'see the package')
	return [name, manifest.version, licence]
})
const width = [0, 1, 2].map((column) => Math.max(['Package', 'Version', 'Licence'][column].length, ...rows.map((row) => row[column].length)))
const line = (cells) => '| ' + cells.map((cell, column) => cell.padEnd(width[column])).join(' | ') + ' |'
const table = [line(['Package', 'Version', 'Licence']), '|' + width.map((size) => '-'.repeat(size + 2)).join('|') + '|', ...rows.map(line)]
fs.writeFileSync(path.join(root, 'NOTICE.md'), `# Third-party software in the app

The app's own code is licensed under the AGPL-3.0-or-later (LICENSE). Its scripts
(\`app/cryptomator_vaults/js/cryptomator_vaults-*.mjs\`, built from \`src/\` by \`npm run build\`)
contain these packages, under their own licences, all compatible with the AGPL-3.0-or-later.
Each package's licence text is in its source, at the version given, on npm. This list is made
by \`npm run notice\`.

${table.join('\n')}

The office previews use docx-preview and SheetJS (\`xlsx\`, from cdn.sheetjs.com). The vault
format is Cryptomator's, implemented here anew; Cryptomator's own libraries (cryptofs, cryptolib,
AGPL-3.0) are only used by the tests, which fetch them, and are not part of the app.

The recovery keys' word list (\`src/recovery-words.txt\`, built into the scripts) is Cryptomator's
own (\`src/main/resources/i18n/4096words_en.txt\` of cryptomator/cryptomator, GPL-3.0), so that a
recovery key made here works in Cryptomator and back; the GPL-3.0 and the AGPL-3.0 allow their
combination (section 13 of each).
`)
console.log(`NOTICE.md: ${rows.length} packages`)
