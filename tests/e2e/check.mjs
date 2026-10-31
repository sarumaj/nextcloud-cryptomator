// SPDX-License-Identifier: AGPL-3.0-or-later
//
// The integration in a real browser against a real Nextcloud with the test vault
// in /Vault (README.md, "Tests"): the view "Vaults" in Files finds it, refuses a
// wrong password, unlocks, browses in Files' own list, previews and downloads as
// Cryptomator wrote the files, creates a folder and uploads files (one in chunks,
// one replacing another, a folder with a folder in it), previews office documents
// in a sandboxed frame, renames, moves and deletes, locks from the bar above, offers only its own actions on the vault's
// entries, opens a vault from the person's files (its notice, its menu) and with
// the file picker, and locks. Throughout, no
// request may carry what the server must not learn: the password, a decrypted
// name, a file's type (/core/mimeicon) or an entry's address.
//
//   NC_URL=http://localhost NC_USER=admin NC_PASSWORD=... [APP_REPO=<this repository>] node tests/e2e/check.mjs

import { chromium } from 'playwright'
import { createHash, randomBytes } from 'node:crypto'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

// Office files for the previews, made with the app's own libraries (its node_modules).
const require = createRequire(join(process.env.APP_REPO || new URL('../..', import.meta.url).pathname, 'package.json'))
const JSZip = require('jszip')
const XLSX = require('xlsx')
import assert from 'node:assert/strict'

const base = process.env.NC_URL
const manifest = JSON.parse(readFileSync(new URL('../fixtures/vault-gcm.json', import.meta.url)))
const PASSWORD = manifest.password
const shots = process.env.SCREENSHOTS || ''
// What is uploaded into the vault: names and contents the server must not see.
const MARKER = 'plaintext-marker-' + randomBytes(8).toString('hex')
const UPLOADS = {
	'Notiz über ✓ Uploads.txt': Buffer.from(MARKER + ' first\n'),
	'big upload.bin': Buffer.concat([Buffer.from(MARKER), randomBytes(25 * 1024 * 1024)]),
}
const REPLACED = Buffer.from(MARKER + ' replaced\n')
const NESTED = Buffer.from(MARKER + ' nested\n')
// Every decrypted name in the vault: none may reach the server.
const RENAMED = 'großer Upload ✓.bin'
const FOLDER = 'Ordner Upload ✓'
const FOLDER_FILES = { 'b.txt': Buffer.from(MARKER + ' b\n'), 'sub/a.txt': Buffer.from(MARKER + ' a\n') }
const DOCX = 'Bericht über Tresore.docx'
const XLSX_NAME = 'Tabelle Tresor.xlsx'
const MORE = { md: 'Notizen ✓.md', zip: 'Archiv.zip', heic: 'Foto.heic', pptx: 'Folien.pptx', odp: 'Folien.odp', odt: 'Brief.odt' }
const LONG_FOLDER = 'a-very-long-name-'.repeat(10) + 'end-folder'
const NAMES = [...new Set([...Object.keys(manifest.entries).flatMap((path) => path.split('/')), ...Object.keys(UPLOADS), 'Neuer Ordner ✓', 'inside new.txt', RENAMED,
	FOLDER, DOCX, XLSX_NAME, ...Object.values(MORE)])]

const PPTX_PARTS = (text) => ({
	'[Content_Types].xml': '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml"/><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/></Types>',
	'ppt/presentation.xml': '<?xml version="1.0" encoding="UTF-8"?><p:presentation xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><p:sldIdLst><p:sldId id="256" r:id="rId1"/></p:sldIdLst><p:sldSz cx="9144000" cy="5143500"/></p:presentation>',
	'ppt/_rels/presentation.xml.rels': '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide1.xml"/></Relationships>',
	'ppt/slides/slide1.xml': '<?xml version="1.0" encoding="UTF-8"?><p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><p:cSld><p:spTree>'
		+ '<p:sp><p:spPr><a:xfrm><a:off x="457200" y="457200"/><a:ext cx="8229600" cy="1143000"/></a:xfrm></p:spPr><p:txBody><a:p><a:r><a:rPr sz="3200" b="1"/><a:t>' + text + '</a:t></a:r></a:p></p:txBody></p:sp>'
		+ '</p:spTree></p:cSld></p:sld>',
})
const ODF_NS = 'xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:text="urn:oasis:names:tc:opendocument:xmlns:text:1.0" xmlns:draw="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0" xmlns:svg="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0"'
const ODT_PARTS = (text) => ({ mimetype: 'application/vnd.oasis.opendocument.text',
	'content.xml': '<?xml version="1.0" encoding="UTF-8"?><office:document-content ' + ODF_NS + '><office:body><office:text><text:h text:outline-level="1">Brief</text:h><text:p>' + text + '</text:p></office:text></office:body></office:document-content>' })
const ODP_PARTS = (text) => ({ mimetype: 'application/vnd.oasis.opendocument.presentation',
	'content.xml': '<?xml version="1.0" encoding="UTF-8"?><office:document-content ' + ODF_NS + '><office:body><office:presentation><draw:page>'
		+ '<draw:frame svg:x="2cm" svg:y="2cm" svg:width="20cm" svg:height="3cm"><draw:text-box><text:p>' + text + '</text:p></draw:text-box></draw:frame>'
		+ '</draw:page></office:presentation></office:body></office:document-content>' })

async function zipOf(parts) {
	const zip = new JSZip()
	for (const [name, content] of Object.entries(parts)) {
		zip.file(name, content)
	}
	return zip.generateAsync({ type: 'nodebuffer' })
}

async function makeDocx(text) {
	const zip = new JSZip()
	zip.file('[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
		+ '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>'
		+ '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>')
	zip.file('_rels/.rels', '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
		+ '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>')
	zip.file('word/document.xml', '<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
		+ '<w:body><w:p><w:r><w:t>' + text + '</w:t></w:r></w:p></w:body></w:document>')
	return zip.generateAsync({ type: 'nodebuffer' })
}

function makeXlsx(text) {
	const book = XLSX.utils.book_new()
	XLSX.utils.book_append_sheet(book, XLSX.utils.aoa_to_sheet([['Spalte', 'Wert'], [text, 42]]), 'Blatt 1')
	return XLSX.write(book, { type: 'buffer', bookType: 'xlsx' })
}
const sha = (data) => createHash('sha256').update(data).digest('hex')
const OWN_ACTIONS = ['cryptomator-vaults-open', 'cryptomator-vaults-download', 'cryptomator-vaults-lock',
	'cryptomator-vaults-rename', 'cryptomator-vaults-move', 'cryptomator-vaults-delete']

// Web Crypto needs a secure origin: HTTPS, or the test Nextcloud at http://localhost.
const browser = await chromium.launch()
const page = await browser.newPage({ acceptDownloads: true, viewport: { width: 1280, height: 800 } })
const problems = []
const sent = []
const consoleLines = []
page.on('pageerror', (error) => problems.push('page error: ' + error.message))
page.on('console', (message) => consoleLines.push(message.type() + ': ' + message.text()))
page.on('request', (request) => sent.push({ url: decodeURIComponent(request.url()), body: request.postDataBuffer() ?? Buffer.alloc(0) }))

const step = (text) => console.log('·', text)
process.on('uncaughtException', async (error) => {
	console.error(error.message.split('\n')[0], '\nproblems:', problems, '\nconsole:', consoleLines.filter((line) => /^(error|warning)/.test(line)).slice(-10))
	if (shots) await page.screenshot({ path: shots + '/failure.png', fullPage: true }).catch(() => {})
	process.exit(1)
})
// Files shows a name's extension in an element of its own, whitespace between.
const exact = (name) => {
	const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	const dot = name.lastIndexOf('.')
	const pattern = dot > 0 ? escape(name.slice(0, dot)) + '\\s*' + escape(name.slice(dot)) : escape(name)
	return new RegExp('^\\s*' + pattern + '\\s*$')
}
const row = (name) => page.locator('tr[data-cy-files-list-row]').filter({
	has: page.locator('.files-list__row-name-text', { hasText: exact(name) }),
})
const openName = (name) => row(name).locator('[data-cy-files-list-row-name-link]').click()
// The actions offered on an entry: those shown in its row and those of its menu.
async function rowActions(name) {
	const inline = await row(name).locator('[data-cy-files-list-row-action]:visible')
		.evaluateAll((items) => items.map((item) => item.getAttribute('data-cy-files-list-row-action')))
	await row(name).locator('[data-cy-files-list-row-actions] button[aria-haspopup]').last().click()
	const menu = page.locator('[role="menu"]:visible [data-cy-files-list-row-action]')
	await menu.first().waitFor()
	return [...inline, ...await menu.evaluateAll((items) => items.map((item) => item.getAttribute('data-cy-files-list-row-action')))]
}

step('sign in')
await page.goto(base + '/login')
await page.fill('#user', process.env.NC_USER)
await page.fill('#password', process.env.NC_PASSWORD)
await page.click('button[type=submit]')
await page.waitForURL(/apps/)
sent.length = 0

step('"Vaults" in the app menu leads to the view in Files, which lists the vault')
await page.goto(base + '/index.php/apps/cryptomator_vaults/')
await page.waitForURL(/apps\/files\/cryptomator-vaults/)
await row('Vault').waitFor()
if (shots) await page.screenshot({ path: shots + '/vaults.png' })

step('opening it asks for the password, in a form password managers know; a wrong one is refused')
await openName('Vault')
const account = page.locator('.cryptomator-dialog input[autocomplete=username]')
assert.equal(await account.inputValue(), '/Vault', 'the vault\'s folder as the user name')
assert.equal(await page.locator('.cryptomator-dialog input[type=password]').getAttribute('autocomplete'), 'current-password')
if (shots) await page.screenshot({ path: shots + '/unlock.png' })
await page.locator('.cryptomator-dialog input[type=password]').fill('not the password')
await page.locator('.cryptomator-dialog button[type=submit]').click()
await page.locator('.cryptomator-dialog .cryptomator-notice--error', { hasText: 'Wrong password.' }).waitFor()

step('the right one shows the vault in Files\' list')
await page.locator('.cryptomator-dialog input[type=password]').fill(PASSWORD)
await page.locator('.cryptomator-dialog button[type=submit]').click()
await row('hello.txt').waitFor()
const names = (await page.locator('.files-list__row-name-text').allTextContents()).map((name) => name.trim().replace(/\s+(\.[^.\s]+)$/, '$1'))
for (const name of Object.keys(manifest.entries).filter((path) => !path.includes('/'))) {
	assert.ok(names.includes(name), `lists ${name}: ${names.join(', ')}`)
}
if (shots) await page.screenshot({ path: shots + '/folder.png' })

step('only the vault\'s own actions are offered on its entries')
const fileActions = await rowActions('hello.txt')
await page.keyboard.press('Escape')
assert.deepEqual(fileActions.filter((id) => !OWN_ACTIONS.includes(id)), [], `actions on a file: ${fileActions}`)
assert.ok(fileActions.includes('cryptomator-vaults-download'), `download offered: ${fileActions}`)

step('a text file is previewed')
await openName('hello.txt')
assert.equal(await page.locator('.cryptomator-preview--text').textContent(), 'Hello, vault!\n')
if (shots) await page.screenshot({ path: shots + '/preview.png' })
await page.locator('.cryptomator-dialog__close').click()

step('folders open in Files, the breadcrumbs show their names, the address none')
await openName('Docs & Stuff')
await openName('inner')
await row('deep.txt').waitFor()
const crumbs = await page.locator('[data-cy-files-content-breadcrumbs]').textContent()
assert.ok(crumbs.includes('Docs & Stuff') && crumbs.includes('inner'), `breadcrumbs: ${crumbs}`)
const address = decodeURIComponent(page.url())
assert.ok(!NAMES.some((name) => address.includes(name)), `the address names nothing: ${address}`)
if (shots) await page.screenshot({ path: shots + '/nested.png' })
await openName('deep.txt')
assert.equal(await page.locator('.cryptomator-preview--text').textContent(), 'nested\n')
await page.locator('.cryptomator-dialog__close').click()

step('a download is the file Cryptomator wrote')
await page.goBack()
await page.goBack()
await row('chunks.bin').waitFor()
await rowActions('chunks.bin')
const [download] = await Promise.all([page.waitForEvent('download'), page.locator('[data-cy-files-list-row-action="cryptomator-vaults-download"]:visible').click()])
const chunks = []
for await (const chunk of await download.createReadStream()) chunks.push(chunk)
assert.equal(createHash('sha256').update(Buffer.concat(chunks)).digest('hex'), manifest.entries['chunks.bin'].sha256)

step('a new folder is created in the vault')
const listAction = async (name) => {
	const inline = page.getByRole('button', { name })
	if (await inline.count()) {
		return inline.first().click()
	}
	await page.locator('.files-list__header-actions button[aria-haspopup]').first().click()
	return page.getByRole('menuitem', { name }).click()
}
await listAction(/New folder/)
await page.locator('.cryptomator-dialog input[type=text]').fill('Neuer Ordner ✓')
await page.locator('.cryptomator-dialog button[type=submit]').click()
await row('Neuer Ordner ✓').waitFor()

// Files handed to the browser from disk: large buffers take long through the protocol.
async function upload(files) {
	const folder = join(tmpdir(), 'upload-' + randomBytes(4).toString('hex'))
	mkdirSync(folder, { recursive: true })
	const paths = Object.entries(files).map(([name, buffer]) => {
		writeFileSync(join(folder, name), buffer)
		return join(folder, name)
	})
	const [chooser] = await Promise.all([page.waitForEvent('filechooser'), listAction(/Upload files/)])
	await chooser.setFiles(paths, { timeout: 120000 })
}
const finished = () => page.locator('.cryptomator-dialog .cryptomator-notice').filter({ hasText: /uploaded/ }).last().waitFor({ timeout: 180000 })

step('files are uploaded, encrypted in the browser and checked (a large one in chunks)')
await upload(UPLOADS)
await finished()
const summary = await page.locator('.cryptomator-dialog .cryptomator-notice').last().textContent()
assert.match(summary, /2 uploaded and checked/, summary)
await page.locator('.cryptomator-dialog button', { hasText: 'Close' }).click()
await row('big upload.bin').waitFor()
await openName('Notiz über ✓ Uploads.txt')
assert.equal(await page.locator('.cryptomator-preview--text').textContent(), MARKER + ' first\n')
await page.locator('.cryptomator-dialog__close').click()

step('a taken name is replaced only when asked')
await upload({ 'Notiz über ✓ Uploads.txt': REPLACED })
await page.locator('.cryptomator-dialog button', { hasText: /^Replace$/ }).click()
await finished()
await page.locator('.cryptomator-dialog button', { hasText: 'Close' }).click()
await openName('Notiz über ✓ Uploads.txt')
assert.equal(await page.locator('.cryptomator-preview--text').textContent(), MARKER + ' replaced\n')
await page.locator('.cryptomator-dialog__close').click()

step('a file is uploaded into the new folder')
await openName('Neuer Ordner ✓')
await upload({ 'inside new.txt': NESTED })
await finished()
await page.locator('.cryptomator-dialog button', { hasText: 'Close' }).click()
await row('inside new.txt').waitFor()
step('an entry is renamed (back in the browser to the vault\'s top, still in Vaults)')
await page.goBack()
await row('big upload.bin').waitFor()
assert.match(page.url(), /\/apps\/files\/cryptomator-vaults(\/\d+)?\?dir=\/v[0-9a-f]+$/, `back stays in Vaults: ${page.url()}`)
await rowActions('big upload.bin')
await page.locator('[data-cy-files-list-row-action="cryptomator-vaults-rename"]:visible').click()
await page.locator('.cryptomator-dialog input[type=text]').fill(RENAMED)
await page.locator('.cryptomator-dialog button[type=submit]').click()
await row(RENAMED).waitFor()
assert.equal(await row('big upload.bin').count(), 0)

step('a folder is moved into another, the chooser offering neither it nor what is in it')
await rowActions('Docs & Stuff')
await page.locator('[data-cy-files-list-row-action="cryptomator-vaults-move"]:visible').click()
const chooser = page.locator('.cryptomator-dialog')
assert.ok(await chooser.locator('button.cryptomator-folders__item', { hasText: 'Docs & Stuff' }).isDisabled(), 'the folder being moved cannot be the target')
await chooser.locator('button.cryptomator-folders__item', { hasText: 'Neuer Ordner ✓' }).click()
await chooser.locator('.cryptomator-crumbs [aria-current]', { hasText: 'Neuer Ordner ✓' }).waitFor()
await chooser.getByRole('button', { name: 'Move here' }).click()
await row('Docs & Stuff').waitFor({ state: 'detached' })
await openName('Neuer Ordner ✓')
await openName('Docs & Stuff')
await openName('inner')
await openName('deep.txt')
assert.equal(await page.locator('.cryptomator-preview--text').textContent(), 'nested\n')
await page.locator('.cryptomator-dialog__close').click()
await page.goBack()
await page.goBack()
await page.goBack()
await row(RENAMED).waitFor()

step('a link and a folder with a file in it are deleted, after asking')
for (const name of ['link-to-hello', LONG_FOLDER]) {
	await rowActions(name)
	await page.locator('[data-cy-files-list-row-action="cryptomator-vaults-delete"]:visible').click()
	await page.locator('.cryptomator-dialog button', { hasText: /^Delete$/ }).click()
	await row(name).waitFor({ state: 'detached' })
}

step('a folder is uploaded with what is in it')
const folderOnDisk = join(tmpdir(), 'folder-upload')
rmSync(folderOnDisk, { recursive: true, force: true })
for (const [name, data] of Object.entries(FOLDER_FILES)) {
	mkdirSync(join(folderOnDisk, FOLDER, name, '..'), { recursive: true })
	writeFileSync(join(folderOnDisk, FOLDER, name), data)
}
{
	const [chooser] = await Promise.all([page.waitForEvent('filechooser'), listAction(/Upload folder/)])
	await chooser.setFiles(join(folderOnDisk, FOLDER))
}
await finished()
await page.locator('.cryptomator-dialog button', { hasText: 'Close' }).click()
await openName(FOLDER)
await row('b.txt').waitFor()
await openName('sub')
await openName('a.txt')
assert.equal(await page.locator('.cryptomator-preview--text').textContent(), MARKER + ' a\n')
await page.locator('.cryptomator-dialog__close').click()
await page.goBack()
await page.goBack()
await row(RENAMED).waitFor()

step('office documents are previewed in the browser, in a frame without scripts or network')
const DOCX_DATA = await makeDocx(MARKER + ' im Bericht')
const XLSX_DATA = makeXlsx(MARKER + ' in der Tabelle')
await upload({ [DOCX]: DOCX_DATA, [XLSX_NAME]: XLSX_DATA })
await finished()
await page.locator('.cryptomator-dialog button', { hasText: 'Close' }).click()
for (const [name, text] of [[DOCX, ' im Bericht'], [XLSX_NAME, ' in der Tabelle']]) {
	await openName(name)
	const frame = page.locator('iframe.cryptomator-preview--document')
	await frame.waitFor({ timeout: 60000 })
	assert.equal(await frame.getAttribute('sandbox'), '', 'no scripts, no origin of its own')
	await page.frameLocator('iframe.cryptomator-preview--document').locator('body', { hasText: MARKER + text }).waitFor()
	if (shots) await page.screenshot({ path: shots + '/preview-' + name.split('.').pop() + '.png' })
	await page.locator('.cryptomator-dialog__close').click()
}

step('Markdown, ZIP, HEIC, pptx, odp and odt are previewed in the browser too')
const MORE_DATA = {
	[MORE.md]: Buffer.from('# Notizen\n\n**' + MARKER + ' im Markdown** und [ein Link](https://example.com)\n'),
	[MORE.zip]: await zipOf({ ['innen/' + MARKER + '.txt']: 'x' }),
	[MORE.heic]: readFileSync(new URL('../fixtures/sample.heic', import.meta.url)),
	[MORE.pptx]: await zipOf(PPTX_PARTS(MARKER + ' auf der Folie')),
	[MORE.odp]: await zipOf(ODP_PARTS(MARKER + ' in Impress')),
	[MORE.odt]: await zipOf(ODT_PARTS(MARKER + ' im Brief')),
}
await upload(MORE_DATA)
await finished()
await page.locator('.cryptomator-dialog button', { hasText: 'Close' }).click()
const framed = page.frameLocator('iframe.cryptomator-preview--document')
for (const [name, text] of [[MORE.md, MARKER + ' im Markdown'], [MORE.zip, 'innen/' + MARKER + '.txt'], [MORE.pptx, MARKER + ' auf der Folie'],
	[MORE.odp, MARKER + ' in Impress'], [MORE.odt, MARKER + ' im Brief']]) {
	await openName(name)
	await page.locator('iframe.cryptomator-preview--document').waitFor({ timeout: 60000 })
	assert.equal(await page.locator('iframe.cryptomator-preview--document').getAttribute('sandbox'), '', name + ': sandboxed')
	await framed.locator('body', { hasText: text }).waitFor()
	assert.equal(await framed.locator('[href]').count(), 0, name + ': no links')
	if (shots) await page.screenshot({ path: shots + '/preview-' + name.split('.').pop() + '.png' })
	await page.locator('.cryptomator-dialog__close').click()
}
await openName(MORE.heic)
const picture = page.locator('.cryptomator-dialog img.cryptomator-preview')
await picture.waitFor({ timeout: 60000 })
assert.ok(await picture.evaluate((image) => image.decode().then(() => image.naturalWidth === 96 && image.naturalHeight === 64)), 'the HEIC picture decoded, 96 by 64')
await page.locator('.cryptomator-dialog__close').click()

// For the check with Cryptomator's own library afterwards (README.md, "Tests").
if (process.env.EXPECTED_OUT) {
	const expected = {}
	for (const [path, value] of Object.entries(manifest.entries)) {
		if (path === 'link-to-hello' || path.startsWith(LONG_FOLDER)) {
			continue
		}
		expected[path.startsWith('Docs & Stuff') ? 'Neuer Ordner ✓/' + path : path] = value
	}
	writeFileSync(process.env.EXPECTED_OUT, JSON.stringify({
		...expected,
		'Notiz über ✓ Uploads.txt': { sha256: sha(REPLACED), size: REPLACED.length, type: 'file' },
		[RENAMED]: { sha256: sha(UPLOADS['big upload.bin']), size: UPLOADS['big upload.bin'].length, type: 'file' },
		'Neuer Ordner ✓': { type: 'dir' },
		'Neuer Ordner ✓/inside new.txt': { sha256: sha(NESTED), size: NESTED.length, type: 'file' },
		[FOLDER]: { type: 'dir' },
		[FOLDER + '/sub']: { type: 'dir' },
		...Object.fromEntries(Object.entries(FOLDER_FILES).map(([name, data]) => [FOLDER + '/' + name, { sha256: sha(data), size: data.length, type: 'file' }])),
		[DOCX]: { sha256: sha(DOCX_DATA), size: DOCX_DATA.length, type: 'file' },
		[XLSX_NAME]: { sha256: sha(XLSX_DATA), size: XLSX_DATA.length, type: 'file' },
		...Object.fromEntries(Object.entries(MORE_DATA).map(([name, data]) => [name, { sha256: sha(data), size: data.length, type: 'file' }])),
	}))
}

step('an unlocked vault offers Lock in its menu and in the bar above its list; opening it again asks')
await page.locator('[data-cy-files-navigation-item="cryptomator-vaults"] a').first().click()
await row('Vault').waitFor()
const vaultActions = await rowActions('Vault')
assert.ok(vaultActions.includes('cryptomator-vaults-lock'), `lock offered: ${vaultActions}`)
await page.keyboard.press('Escape')
await openName('Vault')
await page.locator('.cryptomator-banner--unlocked').waitFor()
if (shots) await page.screenshot({ path: shots + '/lockbar.png' })
await page.locator('.cryptomator-banner--unlocked button', { hasText: 'Lock' }).click()
await row('Vault').waitFor()
assert.equal(await page.locator('.cryptomator-banner--unlocked').count(), 0)
await openName('Vault')
await page.locator('.cryptomator-dialog input[type=password]').waitFor()
await page.locator('.cryptomator-dialog button', { hasText: 'Cancel' }).click()
await page.getByText('Vault is locked').waitFor()
assert.equal(await row('hello.txt').count(), 0, 'no decrypted names after the lock')

step('the vault\'s folder in the person\'s files is recognised: a notice offers to open it')
await page.goto(base + '/index.php/apps/files/files?dir=/Vault')
await row('vault.cryptomator').waitFor()
await page.locator('.cryptomator-banner').waitFor()
if (shots) await page.screenshot({ path: shots + '/banner.png' })
await page.goto(base + '/index.php/apps/files/files?dir=/Vault/d')
await page.locator('tr[data-cy-files-list-row]').first().waitFor()
assert.equal(await page.locator('.cryptomator-banner').count(), 0, 'no notice outside a vault\'s folder')
await page.goBack()
await page.locator('.cryptomator-banner button').click()
await page.locator('.cryptomator-dialog input[type=password]').waitFor()
await page.locator('.cryptomator-dialog button', { hasText: 'Cancel' }).click()

step('"Open vault" on its vault.cryptomator in the person\'s files')
await page.goto(base + '/index.php/apps/files/files?dir=/Vault')
await row('vault.cryptomator').waitFor()
const plainActions = await rowActions('vault.cryptomator')
assert.ok(plainActions.includes('cryptomator-vaults-open-vault'), `open vault offered: ${plainActions}`)
await page.locator('[data-cy-files-list-row-action="cryptomator-vaults-open-vault"]:visible').click()
await page.locator('.cryptomator-dialog input[type=password]').fill(PASSWORD)
await page.locator('.cryptomator-dialog button[type=submit]').click()
await row('hello.txt').waitFor()

step('"Open a vault folder …" chooses one with Nextcloud\'s file picker')
await page.locator('[data-cy-files-navigation-item="cryptomator-vaults"] a').first().click()
await page.getByRole('button', { name: /Open a vault folder/ }).first().click()
const picker = page.getByRole('dialog', { name: /Choose a vault/ })
await picker.getByText('Vault', { exact: true }).first().click()
await picker.getByRole('button', { name: 'Open vault' }).click()
await row('hello.txt').waitFor()

step('nothing the server must not learn left the browser')
await browser.close()
const leaks = sent.filter(({ url, body }) => {
	const text = url + '\n' + body.toString('utf8')
	return text.includes(PASSWORD) || text.includes('/core/mimeicon') || text.includes('/apps/cryptomator_vaults/cryptomator-vaults')
		|| NAMES.some((name) => text.includes(name)) || body.includes(MARKER)
})
assert.deepEqual(leaks.map(({ url }) => url), [], 'requests the server must not see')
assert.ok(sent.some(({ url }) => url.includes('/remote.php/dav/files/')), 'the files came over WebDAV')
assert.deepEqual(problems, [], 'errors in the page')
console.log(`ok: ${sent.length} requests, none with the password, a decrypted name or content, a file type or an entry's address`)
