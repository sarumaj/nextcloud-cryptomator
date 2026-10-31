// SPDX-License-Identifier: AGPL-3.0-or-later
//
// node --test tests/write.test.js: writing into a copy of each test vault, read
// back by this reader, and what is refused. tests/compat.test.js has
// Cryptomator's own library read and check the same writes.

'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { randomBytes } = require('node:crypto')
const { Vault, checkName, STAGING_PREFIX } = require('../app/cryptomator_vaults/js/vault.js')
const { folderStorage } = require('./storage.js')

const { FIXTURES, copyVault, editSamples, orphans, sha, walk, writeSamples } = require('./samples.js')

test('names are stored as Cryptomator stores them, unusable ones refused', () => {
	assert.equal(checkName('Café'), 'Café')
	for (const bad of ['', '.', '..', 'a/b', 'a\\b', 'tab\there', 'x'.repeat(256)]) {
		assert.throws(() => checkName(bad), { code: 'invalid-name' }, JSON.stringify(bad))
	}
})

for (const name of ['vault-gcm', 'vault-ctrmac']) {
	const manifest = JSON.parse(fs.readFileSync(path.join(FIXTURES, name + '.json'), 'utf8'))

	test(`${name}: files and folders written read back, beside what was there`, async () => {
		const root = copyVault(name)
		const vault = await Vault.open(folderStorage(root, { writable: true }))
		await vault.unlock(manifest.password)
		const written = await writeSamples(vault)
		assert.deepEqual(await walk(vault), { ...manifest.entries, ...written })
		// No staging folder is left behind.
		const leftovers = fs.readdirSync(root, { recursive: true }).filter((item) => path.basename(item).startsWith(STAGING_PREFIX))
		assert.deepEqual(leftovers, [])
		fs.rmSync(root, { recursive: true })
	})

	test(`${name}: renamed, moved and deleted entries read back, nothing left behind`, async () => {
		const root = copyVault(name)
		const vault = await Vault.open(folderStorage(root, { writable: true }))
		await vault.unlock(manifest.password)
		const written = await writeSamples(vault)
		const expected = await editSamples(vault, { ...manifest.entries, ...written })
		assert.deepEqual(await walk(vault), expected)
		assert.deepEqual(await orphans(vault, root), [], 'directories no entry leads to')
		const leftovers = fs.readdirSync(root, { recursive: true }).filter((item) => path.basename(item).startsWith(STAGING_PREFIX))
		assert.deepEqual(leftovers, [])
		fs.rmSync(root, { recursive: true })
	})

	test(`${name}: nothing is replaced unless asked, a folder never`, async () => {
		const root = copyVault(name)
		const vault = await Vault.open(folderStorage(root, { writable: true }))
		await vault.unlock(manifest.password)
		await assert.rejects(vault.writeFile('', 'hello.txt', Buffer.from('x')), { code: 'exists' })
		await assert.rejects(vault.writeFile('', 'Docs & Stuff', Buffer.from('x'), { replace: true }), { code: 'exists-other' })
		await assert.rejects(vault.createDirectory('', 'hello.txt'), { code: 'exists-other' })
		await assert.rejects(vault.createDirectory('', 'Docs & Stuff'), { code: 'exists-other' })
		const replaced = Buffer.from('replaced\n')
		await vault.writeFile('', 'hello.txt', replaced, { replace: true })
		const entries = await walk(vault)
		assert.equal(entries['hello.txt'].sha256, sha(replaced))
		assert.deepEqual({ ...entries, 'hello.txt': manifest.entries['hello.txt'] }, manifest.entries)
		fs.rmSync(root, { recursive: true })
	})

	test(`${name}: a file the storage changes on the way never enters the vault`, async () => {
		const root = copyVault(name)
		const storage = folderStorage(root, { writable: true })
		const write = storage.write
		storage.write = async (relative, data, options) => {
			const changed = Uint8Array.from(data)
			if (changed.length > 100) {
				changed[changed.length - 20] ^= 1
			}
			return write(relative, changed, options)
		}
		const vault = await Vault.open(storage)
		await vault.unlock(manifest.password)
		await assert.rejects(vault.writeFile('', 'damaged.bin', randomBytes(5000)), { code: 'corrupt' })
		await assert.rejects(vault.writeFile('', 'long-'.repeat(40) + 'damaged.bin', randomBytes(5000)), { code: 'corrupt' })
		// A replacement that fails its check leaves the old file as it was.
		await assert.rejects(vault.writeFile('', 'chunks.bin', randomBytes(5000), { replace: true }), { code: 'corrupt' })
		assert.deepEqual(await walk(vault), manifest.entries)
		const leftovers = fs.readdirSync(root, { recursive: true }).filter((item) => path.basename(item).startsWith(STAGING_PREFIX))
		assert.deepEqual(leftovers, [])
		fs.rmSync(root, { recursive: true })
	})
}

