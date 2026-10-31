// SPDX-License-Identifier: AGPL-3.0-or-later
//
// node --test tests/keys.test.js: creating a vault, changing its password, its
// recovery key and a new password with it, in folders as the server would hold
// them. tests/compat.test.js has Cryptomator's own library open what is made here.

'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { Vault, encodeRecoveryKey, decodeRecoveryKey } = require('../app/cryptomator_vaults/js/vault.js')
const { folderStorage } = require('./storage.js')
const { FIXTURES, copyVault, walk, writeSamples } = require('./samples.js')

const WORDS = fs.readFileSync(path.join(__dirname, '..', 'src', 'recovery-words.txt'), 'utf8').split('\n')
// Cryptomator's own test of a valid recovery key (RecoveryKeyFactoryTest), and the same with a wrong last word.
const CRYPTOMATOR_KEY = 'pathway lift abuse plenty export texture gentleman landscape beyond ceiling around leaf cafe charity '
	+ 'border breakdown victory surely computer cat linger restrict infer crowd live computer true written amazed '
	+ 'investor boot depth left theory snow whereby terminal weekly reject happiness circuit partial cup ad'

function emptyFolder() {
	return fs.mkdtempSync(path.join(os.tmpdir(), 'new-vault-'))
}

test('recovery keys are Cryptomator\'s: its test key decodes, and encodes back the same', () => {
	assert.equal(WORDS.length, 4096)
	const raw = decodeRecoveryKey(CRYPTOMATOR_KEY, WORDS)
	assert.equal(raw.length, 64)
	assert.equal(encodeRecoveryKey(raw, WORDS), CRYPTOMATOR_KEY)
	assert.throws(() => decodeRecoveryKey(CRYPTOMATOR_KEY.replace(/ ad$/, ' wrong'), WORDS), { code: 'invalid-recovery-key' })
	assert.throws(() => decodeRecoveryKey('pathway lift', WORDS), { code: 'invalid-recovery-key' })
	assert.throws(() => decodeRecoveryKey(CRYPTOMATOR_KEY.replace('pathway', 'Backpfeifengesicht'), WORDS), { code: 'invalid-recovery-key' })
	// Spaces and capitals as people type them.
	assert.deepEqual(decodeRecoveryKey('  ' + CRYPTOMATOR_KEY.toUpperCase().replace(/ /g, '\n  ') + ' ', WORDS), raw)
})

for (const cipherCombo of ['SIV_GCM', 'SIV_CTRMAC']) {
	test(`${cipherCombo}: a new vault opens with its password, takes files, and has Cryptomator's layout`, async () => {
		const root = emptyFolder()
		const vault = await Vault.create(folderStorage(root, { writable: true }), 'neues Passwort ✓', { cipherCombo })
		assert.deepEqual(fs.readdirSync(root).sort(), ['d', 'masterkey.cryptomator', 'vault.cryptomator'])
		const file = JSON.parse(fs.readFileSync(path.join(root, 'masterkey.cryptomator'), 'utf8'))
		assert.deepEqual(Object.keys(file), ['version', 'scryptSalt', 'scryptCostParam', 'scryptBlockSize', 'primaryMasterKey', 'hmacMasterKey', 'versionMac'])
		assert.equal(file.version, 999)
		assert.equal(file.scryptCostParam, 32768)
		assert.equal(file.scryptBlockSize, 8)
		assert.equal(Buffer.from(file.scryptSalt, 'base64').length, 8)
		const [header, payload] = fs.readFileSync(path.join(root, 'vault.cryptomator'), 'utf8').split('.').slice(0, 2).map((part) => JSON.parse(Buffer.from(part, 'base64url')))
		assert.deepEqual(header, { kid: 'masterkeyfile:masterkey.cryptomator', typ: 'JWT', alg: 'HS256' })
		assert.equal(payload.format, 8)
		assert.equal(payload.cipherCombo, cipherCombo)
		assert.equal(payload.shorteningThreshold, 220)
		// The root directory with its ID's backup, and nothing else yet.
		const dirs = fs.readdirSync(path.join(root, 'd'), { recursive: true })
		assert.equal(dirs.filter((item) => item.endsWith('dirid.c9r')).length, 1)
		assert.deepEqual(await walk(vault), {})
		const written = await writeSamples(vault)
		const again = await Vault.open(folderStorage(root, { writable: true }))
		await assert.rejects(again.unlock('falsch'), { code: 'wrong-password' })
		await again.unlock('neues Passwort ✓')
		assert.deepEqual(await walk(again), written)
		await assert.rejects(Vault.create(folderStorage(root, { writable: true }), 'x'), { code: 'exists-other' })
		fs.rmSync(root, { recursive: true })
	})
}

for (const name of ['vault-gcm', 'vault-ctrmac']) {
	const manifest = JSON.parse(fs.readFileSync(path.join(FIXTURES, name + '.json'), 'utf8'))

	test(`${name}: the password changes, the old key file is kept as Cryptomator keeps it, the files stay`, async () => {
		const root = copyVault(name)
		const before = fs.readFileSync(path.join(root, 'masterkey.cryptomator'))
		const vault = await Vault.open(folderStorage(root, { writable: true }))
		await assert.rejects(vault.changePassword('not the password', 'neu'), { code: 'wrong-password' })
		await vault.changePassword(manifest.password, 'ein ganz neues Passwort')
		const backups = fs.readdirSync(root).filter((item) => /^masterkey\.cryptomator\.[0-9A-F]{8}\.bkup$/.test(item))
		assert.equal(backups.length, 1)
		assert.deepEqual(fs.readFileSync(path.join(root, backups[0])), before)
		const reopened = await Vault.open(folderStorage(root))
		await assert.rejects(reopened.unlock(manifest.password), { code: 'wrong-password' })
		await reopened.unlock('ein ganz neues Passwort')
		assert.deepEqual(await walk(reopened), manifest.entries)
		fs.rmSync(root, { recursive: true })
	})

	test(`${name}: the recovery key gives a new password, also without a key file; another vault's is refused`, async () => {
		const root = copyVault(name)
		const vault = await Vault.open(folderStorage(root, { writable: true }))
		await assert.rejects(vault.recoveryKey('not the password', WORDS), { code: 'wrong-password' })
		const key = await vault.recoveryKey(manifest.password, WORDS)
		assert.equal(key.split(' ').length, 44)
		const reset = await Vault.resetPassword(folderStorage(root, { writable: true }), key, 'nach dem Vergessen', WORDS)
		assert.deepEqual(await walk(reset), manifest.entries)
		// Lost key file: made anew from the recovery key.
		fs.rmSync(path.join(root, 'masterkey.cryptomator'))
		const remade = await Vault.resetPassword(folderStorage(root, { writable: true }), key, 'noch einmal', WORDS)
		assert.deepEqual(await walk(remade), manifest.entries)
		await assert.rejects(Vault.resetPassword(folderStorage(root, { writable: true }), CRYPTOMATOR_KEY, 'x', WORDS), { code: 'invalid-recovery-key' })
		fs.rmSync(root, { recursive: true })
	})
}
