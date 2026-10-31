// SPDX-License-Identifier: AGPL-3.0-or-later
//
// The page in a real browser against a real Nextcloud with the test vault in
// /Vault (README.md, "Tests"): finds it, refuses a wrong password, unlocks,
// browses, previews and downloads as Cryptomator wrote the files, locks, and
// never sends the password to the server.
//
//   NC_URL=http://localhost NC_USER=admin NC_PASSWORD=... node tests/e2e/check.mjs

import { chromium } from 'playwright'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'

const base = process.env.NC_URL
const manifest = JSON.parse(readFileSync(new URL('../fixtures/vault-gcm.json', import.meta.url)))
const PASSWORD = manifest.password
const shots = process.env.SCREENSHOTS || ''

// Web Crypto needs a secure origin: HTTPS, or the test Nextcloud at http://localhost.
const browser = await chromium.launch()
const page = await browser.newPage({ acceptDownloads: true, viewport: { width: 1100, height: 800 } })
const problems = []
const sent = []
// A link's folder has no dir.c9r: the page asks for it (one request per folder, not two)
// and the browser logs the 404.
page.on('console', (message) => {
	if (message.type() === 'error' && !/dir\.c9r/.test(message.location().url)) problems.push('console: ' + message.text())
})
page.on('pageerror', (error) => problems.push('page error: ' + error.message))
page.on('request', (request) => sent.push(request.url() + '\n' + (request.postData() || '')))

const step = (text) => console.log('·', text)
// An entry by its exact name (a link's line also shows its target's name).
const entry = (name) => page.locator('.cryptomator-entry').filter({
	has: page.locator('.cryptomator-entry__name', { hasText: new RegExp('^' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$') }),
})
process.on('uncaughtException', async (error) => {
	console.error(error.message.split('\n')[0], '\nproblems:', problems)
	if (shots) await page.screenshot({ path: shots + '/failure.png', fullPage: true }).catch(() => {})
	process.exit(1)
})

step('sign in')
await page.goto(base + '/login')
await page.fill('#user', process.env.NC_USER)
await page.fill('#password', process.env.NC_PASSWORD)
await page.click('button[type=submit]')
await page.waitForURL(/apps/)
sent.length = 0
problems.length = 0

step('the vault is found in the files')
await page.goto(base + '/index.php/apps/cryptomator_vaults/')
await page.locator('.cryptomator-vault', { hasText: '/Vault' }).first().click()

step('a wrong password is refused')
await page.fill('.cryptomator-unlock input[type=password]', 'not the password')
await page.click('.cryptomator-unlock button[type=submit]')
await page.getByText('Wrong password.').waitFor()

step('the right one unlocks')
await page.fill('.cryptomator-unlock input[type=password]', PASSWORD)
await page.click('.cryptomator-unlock button[type=submit]')
await page.locator('.cryptomator-entries').waitFor()
const names = await page.locator('.cryptomator-entry__name').allTextContents()
for (const name of Object.keys(manifest.entries).filter((path) => !path.includes('/'))) {
	assert.ok(names.includes(name), `root lists ${name}: ${names.join(', ')}`)
}
if (shots) await page.screenshot({ path: shots + '/folder.png', fullPage: true })

step('a text file is previewed')
await entry('hello.txt').click()
assert.equal(await page.locator('.cryptomator-preview--text').textContent(), 'Hello, vault!\n')
if (shots) await page.screenshot({ path: shots + '/preview.png' })
await page.click('.cryptomator-viewer__close')

step('folders open, and the trail leads back')
await entry('Docs & Stuff').click()
await entry('inner').click()
await entry('deep.txt').click()
assert.equal(await page.locator('.cryptomator-preview--text').textContent(), 'nested\n')
await page.click('.cryptomator-viewer__close')
await page.locator('.cryptomator-crumbs button').first().click()
await entry('chunks.bin').waitFor()

step('a download is the file Cryptomator wrote')
await entry('chunks.bin').click()
const [download] = await Promise.all([page.waitForEvent('download'), page.locator('.cryptomator-viewer button', { hasText: 'Download' }).click()])
const chunks = []
for await (const chunk of await download.createReadStream()) chunks.push(chunk)
assert.equal(createHash('sha256').update(Buffer.concat(chunks)).digest('hex'), manifest.entries['chunks.bin'].sha256)
await page.click('.cryptomator-viewer__close')

step('Lock forgets the vault')
await page.click('.cryptomator-lock')
await page.getByText('The vault is locked.').waitFor()
assert.equal(await page.locator('.cryptomator-entries').count(), 0)

step('the password never left the browser')
const leaks = sent.filter((entry) => entry.includes(PASSWORD) || entry.includes(encodeURIComponent(PASSWORD)))
assert.deepEqual(leaks, [], 'requests with the password')
assert.ok(sent.some((entry) => entry.includes('/remote.php/dav/')), 'the files came over WebDAV')

await browser.close()
assert.deepEqual(problems, [], 'errors in the page')
console.log(`ok: ${sent.length} requests, none with the password`)
