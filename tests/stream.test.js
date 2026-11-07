// SPDX-License-Identifier: AGPL-3.0-or-later
//
// node --test tests/stream.test.js: a file opened for reads in ranges
// (Vault.openFile), as the stream worker asks for them for a player, in a copy of
// each test vault; and the worker's own helpers (js/stream-worker.js).

'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { randomBytes } = require('node:crypto')
const { Vault } = require('../app/cryptomator_vaults/js/vault.js')
const { parseRange, contentDisposition, playerPage, route, RANGE_LIMIT } = require('../app/cryptomator_vaults/js/stream-worker.js')
const { folderStorage } = require('./storage.js')
const { FIXTURES, PART_SIZE, copyVault, pieces } = require('./samples.js')

const CHUNK = 32 * 1024

/** The storage, counting the bytes read in ranges. */
function counting(storage) {
	const counted = { calls: 0, bytes: 0 }
	const readRange = storage.readRange
	storage.readRange = async (relative, start, end) => {
		counted.calls++
		counted.bytes += end - start
		return readRange(relative, start, end)
	}
	return counted
}

for (const name of ['vault-gcm', 'vault-ctrmac']) {
	const manifest = JSON.parse(fs.readFileSync(path.join(FIXTURES, name + '.json'), 'utf8'))

	test(`${name}: an opened file reads any range as written, fetching only its chunks`, async () => {
		const root = copyVault(name)
		const storage = folderStorage(root, { writable: true })
		const vault = await Vault.open(storage)
		await vault.unlock(manifest.password)
		// Larger than the chunks kept (4 MiB), and its last chunk not full.
		const data = randomBytes(5 * 1024 * 1024 + 4321)
		await vault.writeFileStream('', 'film.mp4', pieces(data), { partSize: PART_SIZE })
		const entry = (await vault.list('')).find((item) => item.name === 'film.mp4')
		const counted = counting(storage)
		const file = await vault.openFile(entry)
		assert.equal(file.size, data.length)

		const ranges = [[42, 3568], [0, 1], [CHUNK - 1, CHUNK + 1], [3 * CHUNK, 5 * CHUNK], [data.length - 10, data.length],
			[data.length - 100, data.length + 100], [1024 * 1024, 3 * 1024 * 1024], [0, data.length]]
		for (const [start, end] of ranges) {
			assert.ok(Buffer.from(await file.read(start, end)).equals(data.subarray(start, end)), `${start}-${end}`)
		}
		for (let i = 0; i < 20; i++) {
			const start = Math.floor(Math.random() * data.length)
			const end = start + Math.floor(Math.random() * 300000)
			assert.ok(Buffer.from(await file.read(start, end)).equals(data.subarray(start, end)), `${start}-${end}`)
		}
		assert.equal((await file.read(data.length, data.length + 5)).length, 0, 'past the end: nothing')
		assert.equal((await file.read(10, 10)).length, 0, 'an empty range: nothing')

		// A seek into the middle of a fresh file: the header and the chunks of the range, no more.
		const fresh = await vault.openFile(entry)
		counted.calls = 0
		counted.bytes = 0
		const start = 2 * 1024 * 1024 + 100
		assert.ok(Buffer.from(await fresh.read(start, start + 1000)).equals(data.subarray(start, start + 1000)))
		assert.equal(counted.calls, 2, 'the header, then one range')
		assert.ok(counted.bytes < 2 * (CHUNK + 48) + 88, `${counted.bytes} bytes read`)
		// Read again (players ask for overlapping ranges): from the chunks kept.
		assert.ok(Buffer.from(await fresh.read(start + 10, start + 900)).equals(data.subarray(start + 10, start + 900)))
		assert.equal(counted.calls, 2, 'nothing read again')
		fs.rmSync(root, { recursive: true })
	})

	test(`${name}: an opened file that is empty, or damaged, reads as it should`, async () => {
		const root = copyVault(name)
		const storage = folderStorage(root, { writable: true })
		const vault = await Vault.open(storage)
		await vault.unlock(manifest.password)
		const empty = await vault.openFile((await vault.list('')).find((item) => item.name === 'empty.txt'))
		assert.equal(empty.size, 0)
		assert.equal((await empty.read(0, 100)).length, 0)

		const entry = (await vault.list('')).find((item) => item.name === 'chunks.bin')
		const file = await vault.openFile(entry)
		assert.equal(file.size, manifest.entries['chunks.bin'].size)
		// A byte changed in the stored second chunk: its range is refused, the first still reads.
		const stored = path.join(root, entry.path)
		const bytes = fs.readFileSync(stored)
		const header = name === 'vault-gcm' ? 68 : 88
		const overhead = name === 'vault-gcm' ? 28 : 48
		bytes[header + CHUNK + overhead + 40] ^= 1
		fs.writeFileSync(stored, bytes)
		await assert.rejects(file.read(CHUNK + 10, CHUNK + 20), { code: 'corrupt' })
		assert.equal((await file.read(0, 10)).length, 10)
		fs.rmSync(root, { recursive: true })
	})
}

test('the worker reads Range headers as players send them', () => {
	const size = 100 * 1024 * 1024
	assert.deepEqual(parseRange('bytes=42-3567', size), { start: 42, end: 3568 })
	assert.deepEqual(parseRange('bytes=0-', size), { start: 0, end: RANGE_LIMIT }, 'the rest: at most RANGE_LIMIT')
	assert.deepEqual(parseRange('bytes=0-', 1000), { start: 0, end: 1000 })
	assert.deepEqual(parseRange('bytes=-500', 1000), { start: 500, end: 1000 }, 'the last bytes')
	assert.deepEqual(parseRange('bytes=-5000', 1000), { start: 0, end: 1000 })
	assert.deepEqual(parseRange('bytes=900-5000', 1000), { start: 900, end: 1000 }, 'cut at the end')
	assert.equal(parseRange('bytes=1000-', 1000), 'unsatisfiable')
	assert.equal(parseRange('bytes=0-', 0), 'unsatisfiable')
	for (const header of [null, '', 'bytes=-', 'bytes=0-1,5-9', 'items=0-1', 'bytes=a-b']) {
		assert.equal(parseRange(header, size), null, String(header))
	}
})

test('the worker names a download as the file is called, in ASCII and UTF-8', () => {
	assert.equal(contentDisposition('Urlaub "2026" ✓.mp4', true), 'attachment; filename="Urlaub _2026_ _.mp4"; filename*=UTF-8\'\'Urlaub%20%222026%22%20%E2%9C%93.mp4')
	assert.equal(contentDisposition("it's (1).pdf", false), 'inline; filename="it\'s (1).pdf"; filename*=UTF-8\'\'it%27s%20%281%29.pdf')
})

test('the worker answers only its own paths, and its player page runs nothing', () => {
	const id = 'a'.repeat(32)
	assert.deepEqual(route('probe', ''), { kind: 'probe' })
	assert.deepEqual(route(id + '/frame', ''), { kind: 'frame', id, download: false })
	assert.deepEqual(route(id + '/file', '?download'), { kind: 'file', id, download: true })
	for (const other of ['', id, id + '/other', 'x'.repeat(32) + '/file', id + '/file/more', '../' + id + '/file']) {
		assert.equal(route(other, ''), null, other)
	}
	for (const kind of ['video', 'audio']) {
		const page = playerPage(kind)
		assert.ok(page.includes('data-cryptomator-stream="ok"') && page.includes('<' + kind + ' src="file"'), kind)
		assert.ok(!/<script|\son\w+=/i.test(page), 'no script')
	}
})
