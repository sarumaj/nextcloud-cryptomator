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

module.exports = { FIXTURES, copyVault, samples, sha, walk, writeSamples }
