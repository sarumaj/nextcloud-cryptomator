// SPDX-License-Identifier: AGPL-3.0-or-later
//
// node --test tests/compat.test.js (through tests/compat.sh): what the app writes,
// read by Cryptomator's own library. Into a copy of each test vault go the
// write samples (tests/samples.js) and a replaced file; then cryptofs
// (fixtures/generator/Verify.java) opens the vault, reads every file by its
// path, and runs its health checks; the same after renaming, moving and
// deleting (tests/samples.js, editSamples). Its entries must be exactly the expected
// ones, and its health checks must find nothing.
//
// VERIFY_COMMAND: the command that runs Verify (JSON array, the vault's folder
// and password are appended); tests/compat.sh sets it. Without it, skipped.

'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')
const { Vault, STAGING_PREFIX } = require('../app/cryptomator_vaults/js/vault.js')
const { folderStorage } = require('./storage.js')
const { FIXTURES, copyVault, editSamples, sha, writeSamples } = require('./samples.js')

const command = process.env.VERIFY_COMMAND ? JSON.parse(process.env.VERIFY_COMMAND) : null

function verify(root, password) {
	const result = spawnSync(command[0], [...command.slice(1), root, password], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
	assert.equal(result.status, 0, `Verify failed: ${result.stderr || result.stdout}`)
	// The document is the last line (Maven or the JVM may warn before it).
	return JSON.parse(result.stdout.trim().split('\n').pop())
}

for (const name of ['vault-gcm', 'vault-ctrmac']) {
	const manifest = JSON.parse(fs.readFileSync(path.join(FIXTURES, name + '.json'), 'utf8'))

	test(`${name}: Cryptomator reads what the app wrote, and finds nothing wrong`, { skip: command ? false : 'VERIFY_COMMAND not set (tests/compat.sh)' }, async () => {
		const root = copyVault(name)
		const vault = await Vault.open(folderStorage(root, { writable: true }))
		await vault.unlock(manifest.password)
		const written = await writeSamples(vault)
		const replaced = Buffer.from('replaced by the app\n')
		await vault.writeFile('', 'hello.txt', replaced, { replace: true })
		written['hello.txt'] = { type: 'file', size: replaced.length, sha256: sha(replaced) }
		const expected = await editSamples(vault, { ...manifest.entries, ...written })
		assert.deepEqual(fs.readdirSync(root, { recursive: true }).filter((item) => path.basename(item).startsWith(STAGING_PREFIX)), [])
		// What a browser that died midway leaves: a staging file and folder, which
		// Cryptomator must pass by, its health checks too.
		fs.writeFileSync(path.join(root, STAGING_PREFIX + 'left-behind.tmp'), 'half an upload')
		fs.mkdirSync(path.join(root, STAGING_PREFIX + 'left-behind-folder.tmp'))
		fs.writeFileSync(path.join(root, STAGING_PREFIX + 'left-behind-folder.tmp', 'dir.c9r'), 'x')

		const seen = verify(root, manifest.password)
		assert.deepEqual(seen.findings, [], 'cryptofs health checks')
		assert.deepEqual(seen.entries, expected)
		fs.rmSync(root, { recursive: true })
	})
}
