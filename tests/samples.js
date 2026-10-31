// SPDX-License-Identifier: AGPL-3.0-or-later
//
// What the write tests put into a vault (tests/write.test.js, tests/compat.test.js),
// and how a vault's entries are listed for comparison: as the manifests of the
// fixtures and the output of the Java checker (fixtures/generator/Verify.java).

'use strict'

const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { createHash, randomBytes } = require('node:crypto')

const FIXTURES = path.join(__dirname, 'fixtures')
const sha = (data) => createHash('sha256').update(data).digest('hex')

/** What the write tests put into a vault: names that test the format's edges. */
function samples() {
	return {
		'new.txt': Buffer.from('written by the app\n'),
		'empty-new.txt': Buffer.alloc(0),
		'exact-chunk.bin': randomBytes(32768),
		'three-chunks.bin': randomBytes(2 * 32768 + 1234),
		// Decomposed on purpose: stored as NFC, as Cryptomator does.
		['Zdjęcie ✓ ünïcode.txt'.normalize('NFD')]: Buffer.from('nfc\n'),
		// Encrypted names of exactly 220 characters (kept) and 224 (shortened).
		['k'.repeat(146)]: Buffer.from('220\n'),
		['s'.repeat(147)]: Buffer.from('224\n'),
		['long-'.repeat(40) + '.txt']: Buffer.from('long name\n'),
	}
}

function copyVault(name) {
	const target = fs.mkdtempSync(path.join(process.env.VAULT_TEST_DIR || os.tmpdir(), 'vault-write-'))
	fs.cpSync(path.join(FIXTURES, name), target, { recursive: true })
	return target
}

/** Writes the samples (and two folders with files in them) into a vault; the expected entries. */
async function writeSamples(vault) {
	const written = {}
	for (const [name, data] of Object.entries(samples())) {
		await vault.writeFile('', name, data)
		written[name.normalize('NFC')] = { type: 'file', size: data.length, sha256: sha(data) }
	}
	const folder = await vault.createDirectory('', 'New folder')
	written['New folder'] = { type: 'dir' }
	const inner = await vault.createDirectory(folder.dirId, 'd'.repeat(160))
	written['New folder/' + 'd'.repeat(160)] = { type: 'dir' }
	const deep = Buffer.from('deep inside new folders\n')
	await vault.writeFile(inner.dirId, 'deep.txt', deep)
	written['New folder/' + 'd'.repeat(160) + '/deep.txt'] = { type: 'file', size: deep.length, sha256: sha(deep) }
	return written
}

async function walk(vault, dirId = '', prefix = '') {
	const found = {}
	for (const entry of await vault.list(dirId)) {
		const at = prefix + entry.name
		assert.notEqual(entry.type, 'broken', `${at}: ${entry.error}`)
		if (entry.type === 'dir') {
			found[at] = { type: 'dir' }
			Object.assign(found, await walk(vault, entry.dirId, at + '/'))
		} else if (entry.type === 'link') {
			found[at] = { type: 'link', target: entry.target }
		} else {
			const data = await vault.readFile(entry)
			found[at] = { type: 'file', size: data.length, sha256: sha(data) }
		}
	}
	return found
}

/** A directory's ID by its path ('' for the top), from the listings. */
async function dirIdOf(vault, path) {
	let dirId = ''
	for (const part of path.split('/').filter(Boolean)) {
		const entry = (await vault.list(dirId)).find((item) => item.name === part && item.type === 'dir')
		assert.ok(entry, `no folder ${path}`)
		dirId = entry.dirId
	}
	return dirId
}

/** Moves the expected entries under from to to (an entry and everything below it). */
function moved(entries, from, to) {
	const out = {}
	for (const [path, value] of Object.entries(entries)) {
		if (path === from || path.startsWith(from + '/')) {
			out[to + path.slice(from.length)] = value
		} else {
			out[path] = value
		}
	}
	return out
}

function removed(entries, gone) {
	return Object.fromEntries(Object.entries(entries).filter(([path]) => path !== gone && !path.startsWith(gone + '/')))
}

const LONG_FIXTURE_FILE = 'a-very-long-name-'.repeat(10) + 'end.txt'
const LONG_FIXTURE_FOLDER = 'a-very-long-name-'.repeat(10) + 'end-folder'
const INNER = 'New folder/' + 'd'.repeat(160)

/**
 * Renames, moves and deletes in a vault the samples were written into: every
 * change between short and long names, for files and folders, moves into other
 * folders (one below a moved folder), and deletions of files, a link and a
 * folder with folders in it; and what is refused. Returns the entries expected
 * afterwards.
 */
async function editSamples(vault, entries) {
	let expected = { ...entries }
	const rename = async (dir, from, to) => {
		await vault.moveEntry(await dirIdOf(vault, dir), from, await dirIdOf(vault, dir), to)
		const prefix = dir ? dir + '/' : ''
		expected = moved(expected, prefix + from, prefix + to)
	}
	await rename('', 'new.txt', 'renamed.txt')
	await rename('', 'hello.txt', 'h'.repeat(180) + '.txt')
	await rename('', 'long-'.repeat(40) + '.txt', 'was-long.txt')
	await rename('', LONG_FIXTURE_FILE, 'b-'.repeat(100) + '.txt')
	await rename('', 'Docs & Stuff', 'D'.repeat(170))
	await rename('', LONG_FIXTURE_FOLDER, 'short folder')

	const top = ''
	const newFolder = await dirIdOf(vault, 'New folder')
	const inner = await dirIdOf(vault, INNER)
	await vault.moveEntry(top, 'three-chunks.bin', newFolder)
	expected = moved(expected, 'three-chunks.bin', 'New folder/three-chunks.bin')
	await vault.moveEntry(top, 'short folder', inner, undefined, { ancestors: [top, newFolder, inner] })
	expected = moved(expected, 'short folder', INNER + '/short folder')
	await vault.moveEntry(top, 'empty-new.txt', inner, 'E'.repeat(200))
	expected = moved(expected, 'empty-new.txt', INNER + '/' + 'E'.repeat(200))

	// Refused: a folder into a folder below itself, without the target's ancestors,
	// onto a taken name, and an entry that is not there.
	await assert.rejects(vault.moveEntry(top, 'New folder', inner, undefined, { ancestors: [top, newFolder, inner] }), { code: 'invalid-move' })
	await assert.rejects(vault.moveEntry(top, 'New folder', inner), { code: 'invalid-move' })
	await assert.rejects(vault.moveEntry(top, 'renamed.txt', top, 'empty.txt'), { code: 'exists-other' })
	await assert.rejects(vault.moveEntry(top, 'not there.txt', top, 'x.txt'), { code: 'not-found' })

	await vault.removeEntry(top, 'exact-chunk.bin')
	expected = removed(expected, 'exact-chunk.bin')
	await vault.removeEntry(top, 's'.repeat(147))
	expected = removed(expected, 's'.repeat(147))
	await vault.removeEntry(top, 'link-to-hello')
	expected = removed(expected, 'link-to-hello')
	const deleted = await vault.removeEntry(top, 'D'.repeat(170))
	assert.equal(deleted.folders, 2, 'the folder and the one in it')
	expected = removed(expected, 'D'.repeat(170))
	return expected
}

/** The directories under d/ that no entry leads to (orphans), as storage paths. */
async function orphans(vault, root) {
	const fs = require('node:fs')
	const reachable = new Set()
	const visit = async (dirId) => {
		reachable.add(await vault.dirPath(dirId))
		for (const entry of await vault.list(dirId)) {
			if (entry.type === 'dir') {
				await visit(entry.dirId)
			}
		}
	}
	await visit('')
	const present = []
	for (const two of fs.readdirSync(path.join(root, 'd'))) {
		for (const rest of fs.readdirSync(path.join(root, 'd', two))) {
			present.push(['d', two, rest].join('/'))
		}
	}
	return present.filter((dir) => !reachable.has(dir))
}

module.exports = { FIXTURES, copyVault, dirIdOf, editSamples, orphans, samples, sha, walk, writeSamples }
