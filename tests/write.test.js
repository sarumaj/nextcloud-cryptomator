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

const { FIXTURES, PART_SIZE, copyVault, editSamples, makeConflicts, orphans, pieces, sha, walk, writeSamples } = require('./samples.js')

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

	test(`${name}: large files go in pieces: written, read back in pieces, replaced`, async () => {
		const root = copyVault(name)
		const vault = await Vault.open(folderStorage(root, { writable: true }))
		await vault.unlock(manifest.password)
		const data = randomBytes(2 * 1024 * 1024 + 4321)
		await vault.writeFileStream('', 'large.bin', pieces(data), { partSize: PART_SIZE })
		const entry = (await vault.list('')).find((item) => item.name === 'large.bin')
		assert.equal(entry.size, data.length)
		const read = []
		await vault.readFileStream(entry, (piece) => { read.push(Buffer.from(piece)) })
		assert.equal(sha(Buffer.concat(read)), sha(data))
		assert.ok(read.length > 1, 'handed over in pieces')
		await assert.rejects(vault.writeFileStream('', 'large.bin', pieces(data)), { code: 'exists' })
		const other = randomBytes(100000)
		await vault.writeFileStream('', 'large.bin', pieces(other), { replace: true, partSize: PART_SIZE })
		assert.equal(sha(await vault.readFile((await vault.list('')).find((item) => item.name === 'large.bin'))), sha(other))
		fs.rmSync(root, { recursive: true })
	})

	test(`${name}: a large file the storage changes on the way never enters the vault`, async () => {
		const root = copyVault(name)
		const storage = folderStorage(root, { writable: true })
		const writeParts = storage.writeParts
		storage.writeParts = (relative, total, parts, options) => writeParts(relative, total, (async function * () {
			let index = 0
			for await (const part of parts) {
				const changed = Uint8Array.from(part)
				if (index++ === 3) {
					changed[100] ^= 1
				}
				yield changed
			}
		})(), options)
		const vault = await Vault.open(storage)
		await vault.unlock(manifest.password)
		await assert.rejects(vault.writeFileStream('', 'large.bin', pieces(randomBytes(500000)), { partSize: PART_SIZE }), { code: 'corrupt' })
		await assert.rejects(vault.writeFileStream('', 'chunks.bin', pieces(randomBytes(500000)), { replace: true, partSize: PART_SIZE }), { code: 'corrupt' })
		assert.deepEqual(await walk(vault), manifest.entries)
		assert.deepEqual(fs.readdirSync(root, { recursive: true }).filter((item) => path.basename(item).startsWith(STAGING_PREFIX)), [])
		fs.rmSync(root, { recursive: true })
	})

	test(`${name}: sync conflicts are resolved as Cryptomator resolves them`, async () => {
		const root = copyVault(name)
		const vault = await Vault.open(folderStorage(root, { writable: true }))
		await vault.unlock(manifest.password)
		const expected = await makeConflicts(vault, root)
		const listed = await vault.list('')
		const names = listed.map((entry) => entry.name)
		for (const [entryName, type] of Object.entries(expected).filter(([key]) => key !== 'otherDirId')) {
			assert.equal(listed.find((entry) => entry.name === entryName)?.type, type, `${entryName} in ${names.join(', ')}`)
		}
		// The renamed folder is the other one, the identical copies are gone, the
		// hidden copy is left alone, and every name is there once.
		assert.equal(listed.find((entry) => entry.name === 'Docs & Stuff (2)').dirId, expected.otherDirId)
		assert.equal(new Set(names).size, names.length, `no name twice: ${names.join(', ')}`)
		const top = path.join(root, await vault.dirPath(''))
		const left = fs.readdirSync(top)
		assert.ok(left.some((file) => file.startsWith('.') && file.endsWith(' (1).c9r')), 'hidden copy kept')
		assert.ok(!left.some((file) => !file.startsWith('.') && / \(\d\)\.c9r$|conflict/.test(file)), `no copies left: ${left.join(', ')}`)
		// A second listing finds nothing more to do.
		assert.deepEqual((await vault.list('')).map((entry) => entry.name), names)
		assert.equal((await walk(vault))['hello (conflicted copy 2026-10-31 120000).txt'].sha256, manifest.entries['chunks.bin'].sha256)
		fs.rmSync(root, { recursive: true })
	})

	test(`${name}: a folder uploaded again merges into the one there`, async () => {
		const root = copyVault(name)
		const vault = await Vault.open(folderStorage(root, { writable: true }))
		await vault.unlock(manifest.password)
		const first = await vault.ensureDirectory('', 'Docs & Stuff')
		assert.equal(first.created, false)
		const inner = await vault.ensureDirectory(first.dirId, 'inner')
		assert.equal(inner.created, false)
		const fresh = await vault.ensureDirectory(inner.dirId, 'new below')
		assert.equal(fresh.created, true)
		assert.equal((await vault.ensureDirectory(inner.dirId, 'new below')).dirId, fresh.dirId)
		await assert.rejects(vault.ensureDirectory('', 'hello.txt'), { code: 'exists-other' })
		const entries = await walk(vault)
		assert.deepEqual(entries, { ...manifest.entries, 'Docs & Stuff/inner/new below': { type: 'dir' } })
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

