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

/** A file read in pieces, as a browser's File: the largest piece asked for is noted. */
function pieces(data) {
	const source = {
		size: data.length,
		largest: 0,
		async read(start, end) {
			source.largest = Math.max(source.largest, end - start)
			return Uint8Array.from(data.subarray(start, end))
		},
	}
	return source
}

// Parts of 64 KiB for the files written in pieces: many parts from small files.
const PART_SIZE = 64 * 1024

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
	// Written in pieces (large files): a short and a long name, and a size that ends a
	// chunk exactly.
	for (const [name, size] of [['streamed.bin', 1234567], ['streamed-' + 'long-'.repeat(40) + '.bin', 300000], ['streamed-exact.bin', 32 * 32768]]) {
		const data = randomBytes(size)
		const source = pieces(data)
		await vault.writeFileStream('', name, source, { partSize: PART_SIZE })
		assert.ok(source.largest <= 32 * 32768, `read in pieces, not whole (${source.largest})`)
		written[name] = { type: 'file', size, sha256: sha(data) }
	}
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

/**
 * Sync conflicts as sync tools leave them, in a vault's top directory: a file's
 * copy with Nextcloud's suffix (other contents), a copy whose proper name is free,
 * a folder's identical copy and a folder of another ID under its name, a link's
 * identical copy, a copy with a suffix of base64 characters (cryptofs narrows the
 * name at '-'), and a hidden copy, which Cryptomator passes by. Returns what each
 * should become in this reader's listing (null: gone).
 */
async function makeConflicts(vault, root) {
	const fs = require('node:fs')
	const top = path.join(root, await vault.dirPath(''))
	const entries = await vault.list('')
	const enc = (name) => path.basename(entries.find((entry) => entry.name === name).path.replace(/\/(contents|dir|symlink)\.c9r$/, ''))
	const copy = (from, to) => fs.cpSync(path.join(top, from), path.join(top, to), { recursive: true })
	const hello = enc('hello.txt').slice(0, -4)
	copy(enc('chunks.bin'), hello + ' (conflicted copy 2026-10-31 120000).c9r')
	const empty = enc('empty.txt').slice(0, -4)
	fs.renameSync(path.join(top, empty + '.c9r'), path.join(top, empty + ' (1).c9r'))
	const docs = enc('Docs & Stuff').slice(0, -4)
	copy(docs + '.c9r', docs + ' (1).c9r')
	const other = await vault.createDirectory('', 'other folder')
	const otherEntry = (await vault.list('')).find((entry) => entry.name === 'other folder')
	fs.renameSync(path.join(top, path.basename(otherEntry.path)), path.join(top, docs + ' (2).c9r'))
	const link = enc('link-to-hello').slice(0, -4)
	copy(link + '.c9r', link + ' (1).c9r')
	// A file whose encrypted name has no padding, so that the suffix's characters
	// join the base64 run and only narrowing at '-' finds the name.
	let unpadded = null
	for (let i = 0; unpadded === null; i++) {
		const entry = await vault.entryPath('', 'unpadded ' + i + '.txt')
		if (!entry.fullName.includes('=') && !entry.long) {
			await vault.writeFile('', 'unpadded ' + i + '.txt', Buffer.from('unpadded\n'))
			unpadded = { name: 'unpadded ' + i + '.txt', enc: entry.fullName.slice(0, -4) }
		}
	}
	copy(unpadded.enc + '.c9r', unpadded.enc + '-conflict.c9r')
	copy(hello + '.c9r', '.' + hello + ' (1).c9r')
	return {
		'hello (conflicted copy 2026-10-31 120000).txt': 'file',
		'empty.txt': 'file',
		'Docs & Stuff (2)': 'dir',
		[unpadded.name.replace('.txt', '-conflict.txt')]: 'file',
		otherDirId: other.dirId,
	}
}

/**
 * Damages an unlocked, writable vault (a copy of a test vault) in every way
 * cryptofs' health check repairs, through the files as a broken sync or an
 * interrupted program would leave them. The kinds of finding it makes: DAMAGES.
 */
async function damage(vault, root) {
	const at = (path) => require('node:path').join(root, path)
	const entries = await vault.list('')
	const docs = entries.find((entry) => entry.name === 'Docs & Stuff')
	const longFolder = entries.find((entry) => entry.type === 'dir' && entry.name.startsWith('a-very-long-name'))
	const longFile = entries.find((entry) => entry.type === 'file' && entry.name.startsWith('a-very-long-name'))
	const rootFolder = await vault.dirPath('')
	// A folder's entry lost, its contents (with its ID's backup, and the folder inner) left: an orphan.
	fs.rmSync(at(docs.path), { recursive: true })
	// An orphan without the backup: its entries get made-up names.
	const lost = await vault.createDirectory('', 'Verlust ✓')
	await vault.writeFile(lost.dirId, 'darin.txt', Buffer.from('verloren\n'))
	fs.rmSync(at((await vault.findEntry('', 'Verlust ✓')).path), { recursive: true })
	fs.rmSync(at(require('node:path').join(await vault.dirPath(lost.dirId), 'dirid.c9r')))
	// A folder whose directory is gone.
	const gone = await vault.createDirectory('', 'Leer ✓')
	fs.rmSync(at(await vault.dirPath(gone.dirId)), { recursive: true })
	// A directory without its ID's backup.
	fs.rmSync(at(require('node:path').join(await vault.dirPath(longFolder.dirId), 'dirid.c9r')))
	// A dir.c9r loose in a directory, an empty one in an entry, an entry of no type.
	fs.writeFileSync(at(rootFolder + '/dir.c9r'), 'loose')
	const empty = rootFolder + '/' + await vault.encryptedName('leere Ordnerdatei', '')
	fs.mkdirSync(at(empty))
	fs.writeFileSync(at(empty + '/dir.c9r'), '')
	fs.mkdirSync(at(rootFolder + '/' + await vault.encryptedName('ohne Art', '')))
	// A long name's file with bytes after its name, and a long folder under the wrong short name.
	fs.appendFileSync(at(longFile.path.replace(/\/contents\.c9r$/, '') + '/name.c9s'), 'trailing')
	const longPath = longFolder.path.replace(/\/dir\.c9r$/, '')
	fs.renameSync(at(longPath), at(longPath.replace(/[^/]+\.c9s$/, 'AAAAAAAAAAAAAAAAAAAAAAAAAAA=.c9s')))
}
const DAMAGES = ['EmptyDirFile', 'LongShortNamesMismatch', 'LooseDirFile', 'MissingContentDir', 'MissingDirIdBackup',
	'OrphanContentDir', 'OrphanContentDir', 'TrailingBytesInNameFile', 'UnknownType']

module.exports = { DAMAGES, damage, FIXTURES, PART_SIZE, makeConflicts, copyVault, dirIdOf, editSamples, orphans, pieces, samples, sha, walk, writeSamples }
