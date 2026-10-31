// SPDX-License-Identifier: AGPL-3.0-or-later
//
// The integration in a real browser against a real Nextcloud with the test vault
// in /Vault (README.md, "Tests"): the view "Vaults" in Files finds it, refuses a
// wrong password, unlocks, browses in Files' own list, previews and downloads as
// Cryptomator wrote the files, creates a folder and uploads files (one in chunks,
// one replacing another), offers only its own actions on the vault's
// entries, opens a vault from the person's files (its notice, its menu) and with
// the file picker, and locks. Throughout, no
// request may carry what the server must not learn: the password, a decrypted
// name, a file's type (/core/mimeicon) or an entry's address.
//
//   NC_URL=http://localhost NC_USER=admin NC_PASSWORD=... node tests/e2e/check.mjs

import { chromium } from 'playwright'
import { createHash, randomBytes } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
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
const NAMES = [...new Set([...Object.keys(manifest.entries).flatMap((path) => path.split('/')), ...Object.keys(UPLOADS), 'Neuer Ordner ✓', 'inside new.txt'])]
const sha = (data) => createHash('sha256').update(data).digest('hex')
const OWN_ACTIONS = ['cryptomator-vaults-open', 'cryptomator-vaults-download', 'cryptomator-vaults-lock']

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

step('opening it asks for the password; a wrong one is refused')
await openName('Vault')
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

async function upload(files) {
	const [chooser] = await Promise.all([page.waitForEvent('filechooser'), listAction(/Upload files/)])
	await chooser.setFiles(Object.entries(files).map(([name, buffer]) => ({ name, mimeType: 'application/octet-stream', buffer })))
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
// For the check with Cryptomator's own library afterwards (README.md, "Tests").
if (process.env.EXPECTED_OUT) {
	writeFileSync(process.env.EXPECTED_OUT, JSON.stringify({
		...manifest.entries,
		'Notiz über ✓ Uploads.txt': { sha256: sha(REPLACED), size: REPLACED.length, type: 'file' },
		'big upload.bin': { sha256: sha(UPLOADS['big upload.bin']), size: UPLOADS['big upload.bin'].length, type: 'file' },
		'Neuer Ordner ✓': { type: 'dir' },
		'Neuer Ordner ✓/inside new.txt': { sha256: sha(NESTED), size: NESTED.length, type: 'file' },
	}))
}

step('Lock forgets the vault: opening it asks again')
await page.locator('[data-cy-files-navigation-item="cryptomator-vaults"] a').first().click()
await row('Vault').waitFor()
await row('Vault').waitFor()
const vaultActions = await rowActions('Vault')
assert.ok(vaultActions.includes('cryptomator-vaults-lock'), `lock offered: ${vaultActions}`)
await page.locator('[data-cy-files-list-row-action="cryptomator-vaults-lock"]:visible').click()
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
