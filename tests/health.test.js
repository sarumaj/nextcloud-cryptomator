// SPDX-License-Identifier: AGPL-3.0-or-later
//
// node --test tests/health.test.js: the health check finds what a damaged vault
// has (tests/samples.js: damage) as cryptofs' checks name it, and its repairs
// leave a healthy vault with the orphans' entries in /LOST+FOUND.
// tests/compat.test.js has cryptofs check and repair the same damage.

'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { Vault } = require('../app/cryptomator_vaults/js/vault.js')
const { folderStorage } = require('./storage.js')
const { DAMAGES, FIXTURES, copyVault, damage, walk } = require('./samples.js')

for (const name of ['vault-gcm', 'vault-ctrmac']) {
	const manifest = JSON.parse(fs.readFileSync(path.join(FIXTURES, name + '.json'), 'utf8'))

	test(`${name}: a healthy vault has no findings; a damaged one has cryptofs' findings, and is repaired`, async () => {
		const root = copyVault(name)
		const vault = await Vault.open(folderStorage(root, { writable: true }))
		await vault.unlock(manifest.password)
		assert.deepEqual(await vault.checkHealth(), [])
		await damage(vault, root)
		const findings = await vault.checkHealth()
		assert.deepEqual(findings.map((finding) => finding.kind).sort(), [...DAMAGES].sort())
		assert.ok(findings.every((finding) => finding.fixable), 'each can be repaired')
		for (const finding of findings) {
			await vault.repair(finding)
		}
		assert.deepEqual(await vault.checkHealth(), [], 'healthy after the repairs')
		const entries = await walk(vault)
		// The orphans' entries in LOST+FOUND: by their names where the backup decrypts them.
		const rescued = Object.keys(entries).filter((item) => item.startsWith('LOST+FOUND/'))
		assert.ok(rescued.some((item) => item.endsWith('/inner/deep.txt')), rescued.join(', '))
		assert.ok(rescued.some((item) => /\/file1_[^/]+$/.test(item)), rescued.join(', '))
		assert.equal(entries['Leer ✓']?.type, 'dir', 'the folder whose directory was gone is there again, empty')
		assert.equal(entries['Docs & Stuff'], undefined)
		// The long names: their entries back under the right names.
		for (const [item, value] of Object.entries(manifest.entries).filter(([item]) => item.startsWith('a-very-long-name'))) {
			assert.deepEqual(entries[item], value, item)
		}
		fs.rmSync(root, { recursive: true })
	})
}
