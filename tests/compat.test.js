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
// Sync conflicts: the same conflicted vault, resolved by this reader and by
// cryptofs (its listing resolves them), must end the same, file for file.
//
// VERIFY_COMMAND: the command that runs Verify (JSON array, the vault's folder
// and password are appended); tests/compat.sh sets it. Without it, skipped.

'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')
const os = require('node:os')
const { Vault, STAGING_PREFIX } = require('../app/cryptomator_vaults/js/vault.js')
const { folderStorage } = require('./storage.js')
const { DAMAGES, FIXTURES, copyVault, damage, editSamples, makeConflicts, sha, writeSamples } = require('./samples.js')

const command = process.env.VERIFY_COMMAND ? JSON.parse(process.env.VERIFY_COMMAND) : null

function verify(root, password, mode) {
	const result = spawnSync(command[0], [...command.slice(1), root, password, ...(mode ? [mode] : [])], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
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

/** Every file and folder of a vault's folder, relative and sorted: its encrypted state. */
function tree(root) {
	return fs.readdirSync(root, { recursive: true }).map((item) => item.split(path.sep).join('/')).sort()
}

for (const name of ['vault-gcm', 'vault-ctrmac']) {
	const manifest = JSON.parse(fs.readFileSync(path.join(FIXTURES, name + '.json'), 'utf8'))

	test(`${name}: sync conflicts end as Cryptomator ends them`, { skip: command ? false : 'VERIFY_COMMAND not set (tests/compat.sh)' }, async () => {
		const ours = copyVault(name)
		const vault = await Vault.open(folderStorage(ours, { writable: true }))
		await vault.unlock(manifest.password)
		await makeConflicts(vault, ours)
		// The same conflicts for Cryptomator: a copy before anything resolves them.
		const theirs = ours + '-cryptomator'
		fs.cpSync(ours, theirs, { recursive: true })
		await vault.list('')
		const seenTheirs = verify(theirs, manifest.password)
		const seenOurs = verify(ours, manifest.password)
		assert.deepEqual(tree(ours), tree(theirs), 'the same files on disk')
		assert.deepEqual(seenOurs.entries, seenTheirs.entries)
		assert.deepEqual(seenOurs.findings, [], 'cryptofs health checks')
		fs.rmSync(ours, { recursive: true })
		fs.rmSync(theirs, { recursive: true })
	})
}

// Vaults made here, and their keys changed here, opened by cryptofs with the
// password last set: its entries the ones written, its health checks finding nothing.
const WORDS = fs.readFileSync(path.join(__dirname, '..', 'src', 'recovery-words.txt'), 'utf8').split('\n')

for (const cipherCombo of ['SIV_GCM', 'SIV_CTRMAC']) {
	test(`${cipherCombo}: Cryptomator opens a vault made here, after a new password and after one set with the recovery key`, { skip: command ? false : 'VERIFY_COMMAND not set (tests/compat.sh)' }, async () => {
		const root = fs.mkdtempSync(path.join(process.env.VAULT_TEST_DIR || os.tmpdir(), 'vault-new-'))
		const vault = await Vault.create(folderStorage(root, { writable: true }), 'erstes Passwort', { cipherCombo })
		const empty = verify(root, 'erstes Passwort')
		assert.deepEqual(empty.findings, [], 'cryptofs health checks of the new vault')
		assert.deepEqual(empty.entries, {}, 'a new vault is empty')
		const written = await writeSamples(vault)
		const seen = verify(root, 'erstes Passwort')
		assert.deepEqual(seen.findings, [], 'cryptofs health checks')
		assert.deepEqual(seen.entries, written)
		await vault.changePassword('erstes Passwort', 'zweites Passwort')
		assert.deepEqual(verify(root, 'zweites Passwort').entries, written)
		const key = await vault.recoveryKey('zweites Passwort', WORDS)
		await Vault.resetPassword(folderStorage(root, { writable: true }), key, 'drittes Passwort', WORDS)
		const last = verify(root, 'drittes Passwort')
		assert.deepEqual(last.findings, [], 'cryptofs health checks after the new key files')
		assert.deepEqual(last.entries, written)
		fs.rmSync(root, { recursive: true })
	})
}

// The health check: the same damage found as cryptofs finds it, and repaired to
// what cryptofs' own repairs make of it (the made-up names of rescued entries,
// random in both, aside).
for (const name of ['vault-gcm', 'vault-ctrmac']) {
	const manifest = JSON.parse(fs.readFileSync(path.join(FIXTURES, name + '.json'), 'utf8'))

	test(`${name}: the health check finds and repairs damage as Cryptomator does`, { skip: command ? false : 'VERIFY_COMMAND not set (tests/compat.sh)' }, async () => {
		const ours = copyVault(name)
		const vault = await Vault.open(folderStorage(ours, { writable: true }))
		await vault.unlock(manifest.password)
		await damage(vault, ours)
		const theirs = copyVault(name)
		fs.rmSync(theirs, { recursive: true })
		fs.cpSync(ours, theirs, { recursive: true })
		const found = await vault.checkHealth()
		const judged = verify(ours, manifest.password, '--check').findings
		const kinds = (list) => list.map((finding) => finding.kind + ' ' + finding.severity).sort()
		assert.deepEqual(kinds(found), kinds(judged), 'the same findings as cryptofs')
		assert.deepEqual(found.map((finding) => finding.kind).sort(), [...DAMAGES].sort())
		for (const finding of found) {
			await vault.repair(finding)
		}
		const after = verify(ours, manifest.password)
		assert.deepEqual(after.findings, [], 'cryptofs finds nothing after our repairs')
		const repaired = verify(theirs, manifest.password, '--repair')
		// Rescued entries without a name are numbered with a random run: alike in both.
		const plain = (entries) => Object.fromEntries(Object.entries(entries).map(([item, value]) => [item.replace(/(file|directory|symlink)(\d+)_[^/]+/g, '$1$2_*'), value]))
		assert.deepEqual(plain(after.entries), plain(repaired.entries), 'the same vault as cryptofs makes of it')
		fs.rmSync(ours, { recursive: true })
		fs.rmSync(theirs, { recursive: true })
	})
}
