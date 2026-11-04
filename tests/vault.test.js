// SPDX-License-Identifier: AGPL-3.0-or-later
//
// node --test tests/: the primitives against their RFCs' test vectors, and the
// vaults Cryptomator's own library wrote (tests/fixtures, generator/) against
// their manifests: every name, size, link target and file's SHA-256.

'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { createHash, createHmac } = require('node:crypto')
const { Vault, VaultError, scrypt, Siv, Cmac, cleartextSize, decodeRecoveryKey } = require('../app/cryptomator_vaults/js/vault.js')

const hex = (text) => Uint8Array.from(Buffer.from(text.replace(/\s+/g, ''), 'hex'))
const toHex = (bytes) => Buffer.from(bytes).toString('hex')
const FIXTURES = path.join(__dirname, 'fixtures')

/** The vault in a folder of the file system, as the page reads it over WebDAV. */
function folderStorage(root) {
	return {
		async read(relative) {
			try {
				return new Uint8Array(await fs.promises.readFile(path.join(root, relative)))
			} catch (error) {
				if (error.code === 'ENOENT' || error.code === 'EISDIR') {
					throw new VaultError('not-found', relative)
				}
				throw error
			}
		},
		async list(relative) {
			const entries = await fs.promises.readdir(path.join(root, relative), { withFileTypes: true })
			return Promise.all(entries.map(async (entry) => ({
				name: entry.name,
				isDir: entry.isDirectory(),
				size: entry.isDirectory() ? 0 : (await fs.promises.stat(path.join(root, relative, entry.name))).size,
			})))
		},
	}
}

test('scrypt matches RFC 7914', async () => {
	assert.equal(toHex(await scrypt(new Uint8Array(0), new Uint8Array(0), 16, 1, 1, 64)),
		'77d6576238657b203b19ca42c18a0497f16b4844e3074ae8dfdffa3fede21442'
		+ 'fcd0069ded0948f8326a753a0fc81f17e8d3e0fb2e0d3628cf35e20c38d18906')
	assert.equal(toHex(await scrypt(Buffer.from('password'), Buffer.from('NaCl'), 1024, 8, 16, 64)),
		'fdbabe1c9d3472007856e7190d01e9fe7c6ad7cbc8237830e77376634b373162'
		+ '2eaf30d92e22a3886ff109279d9830dac727afb94a83ee6d8360cbdfa2cc0640')
})

test('AES-SIV matches RFC 5297 A.1', async () => {
	const key = hex('fffefdfc fbfaf9f8 f7f6f5f4 f3f2f1f0 f0f1f2f3 f4f5f6f7 f8f9fafb fcfdfeff')
	const subtle = globalThis.crypto.subtle
	const mac = await subtle.importKey('raw', key.subarray(0, 16), 'AES-CBC', false, ['encrypt'])
	const ctr = await subtle.importKey('raw', key.subarray(16), 'AES-CTR', false, ['encrypt', 'decrypt'])
	const siv = new Siv(new Cmac(mac), ctr)
	const ad = hex('10111213 14151617 18191a1b 1c1d1e1f 20212223 24252627')
	const plaintext = hex('11223344 55667788 99aabbcc ddee')
	const expected = '85632d07c6e8f37f950acd320a2ecc9340c02b9690c4dc04daef7f6afe5c'
	assert.equal(toHex(await siv.encrypt(plaintext, [ad])), expected)
	assert.equal(toHex(await siv.decrypt(hex(expected), [ad])), toHex(plaintext))
	const tampered = hex(expected)
	tampered[20] ^= 1
	await assert.rejects(siv.decrypt(tampered, [ad]), { code: 'corrupt' })
})

test('the decrypted size of a file follows from its encrypted size', () => {
	assert.equal(cleartextSize('SIV_GCM', 0), 0)
	assert.equal(cleartextSize('SIV_GCM', 68), 0)
	assert.equal(cleartextSize('SIV_GCM', 68 + 28 + 1), 1)
	assert.equal(cleartextSize('SIV_GCM', 68 + 32768 + 28), 32768)
	assert.equal(cleartextSize('SIV_CTRMAC', 88 + 2 * (32768 + 48) + 48 + 5), 2 * 32768 + 5)
})

for (const name of ['vault-gcm', 'vault-ctrmac']) {
	const manifest = JSON.parse(fs.readFileSync(path.join(FIXTURES, name + '.json'), 'utf8'))

	test(`${name}: a wrong password is refused`, async () => {
		const vault = await Vault.open(folderStorage(path.join(FIXTURES, name)))
		await assert.rejects(vault.unlock('wrong password'), { code: 'wrong-password' })
		assert.equal(vault.unlocked, false)
	})

	test(`${name}: every entry decrypts as Cryptomator wrote it`, async () => {
		const vault = await Vault.open(folderStorage(path.join(FIXTURES, name)))
		assert.equal(vault.scheme, manifest.cipherCombo)
		// Decomposed (NFD) on purpose: Cryptomator normalises the password to NFC.
		await vault.unlock(manifest.password.normalize('NFD'))
		const found = {}
		const walk = async (dirId, prefix) => {
			for (const entry of await vault.list(dirId)) {
				const at = prefix + entry.name
				assert.notEqual(entry.type, 'broken', `${at}: ${entry.error}`)
				if (entry.type === 'dir') {
					found[at] = { type: 'dir' }
					await walk(entry.dirId, at + '/')
				} else if (entry.type === 'link') {
					found[at] = { type: 'link', target: entry.target }
				} else {
					const data = await vault.readFile(entry)
					assert.equal(entry.size, data.length, `${at}: listed size`)
					found[at] = { type: 'file', size: data.length, sha256: createHash('sha256').update(data).digest('hex') }
				}
			}
		}
		await walk('', '')
		assert.deepEqual(found, manifest.entries)
		vault.lock()
		await assert.rejects(vault.list(''), { code: 'locked' })
	})

	test(`${name}: a changed byte in a file is detected`, async () => {
		const storage = folderStorage(path.join(FIXTURES, name))
		const vault = await Vault.open(storage)
		await vault.unlock(manifest.password)
		const entry = (await vault.list('')).find((item) => item.name === 'chunks.bin')
		const data = await storage.read(entry.path)
		data[data.length - 40] ^= 1
		await assert.rejects(vault.decryptContents(data), { code: 'corrupt' })
	})
}

test('a vault of another format is refused before the password', async () => {
	const payload = Buffer.from(JSON.stringify({ format: 7, cipherCombo: 'SIV_GCM' })).toString('base64url')
	const header = Buffer.from(JSON.stringify({ alg: 'HS256', kid: 'masterkeyfile:masterkey.cryptomator' })).toString('base64url')
	const storage = { read: async () => Buffer.from(`${header}.${payload}.c2ln`), list: async () => [] }
	await assert.rejects(Vault.open(storage), { code: 'unsupported-format' })
})

test('a Cryptomator Hub vault is refused: its key is not in a file', async () => {
	const payload = Buffer.from(JSON.stringify({ format: 8, cipherCombo: 'SIV_GCM' })).toString('base64url')
	const header = Buffer.from(JSON.stringify({ alg: 'HS256', kid: 'hub+https://hub.example/vaults/1' })).toString('base64url')
	const storage = { read: async () => Buffer.from(`${header}.${payload}.c2ln`), list: async () => [] }
	await assert.rejects(Vault.open(storage), { code: 'unsupported-key' })
})

// The fixtures' raw keys (encryption key, MAC key), from their recovery keys.
const WORDS = fs.readFileSync(path.join(__dirname, '..', 'src', 'recovery-words.txt'), 'utf8').split('\n')
async function fixtureKeys(name, password) {
	const vault = await Vault.open(folderStorage(path.join(FIXTURES, name)))
	const raw = Buffer.from(decodeRecoveryKey(await vault.recoveryKey(password, WORDS), WORDS))
	return { encRaw: raw.subarray(0, 32), macRaw: raw.subarray(32) }
}

/** A fixture's folder with some of its files replaced (path: bytes). */
function changedStorage(name, files) {
	const storage = folderStorage(path.join(FIXTURES, name))
	const read = storage.read
	storage.read = async (relative) => relative in files ? new Uint8Array(files[relative]) : read(relative)
	return storage
}

/** A fixture's vault.cryptomator signed anew: its payload, a header with this alg, an HMAC with this hash (or none). */
function resigned(name, alg, hash, keys) {
	const token = fs.readFileSync(path.join(FIXTURES, name, 'vault.cryptomator'), 'utf8').trim().split('.')
	const header = { ...JSON.parse(Buffer.from(token[0], 'base64url')), alg }
	const signed = Buffer.from(JSON.stringify(header)).toString('base64url') + '.' + token[1]
	const signature = hash ? createHmac(hash, Buffer.concat([keys.encRaw, keys.macRaw])).update(signed).digest('base64url') : ''
	return Buffer.from(signed + '.' + signature)
}

for (const name of ['vault-gcm', 'vault-ctrmac']) {
	const { password } = JSON.parse(fs.readFileSync(path.join(FIXTURES, name + '.json'), 'utf8'))

	for (const [alg, hash] of [['HS384', 'sha384'], ['HS512', 'sha512']]) {
		test(`${name}: a configuration signed with ${alg} opens, as cryptofs reads it`, async () => {
			const keys = await fixtureKeys(name, password)
			const vault = await Vault.open(changedStorage(name, { 'vault.cryptomator': resigned(name, alg, hash, keys) }))
			await vault.unlock(password)
			assert.ok((await vault.list('')).some((item) => item.name === 'hello.txt'))
			// Signed with the right algorithm but another key: not this vault's.
			const other = { encRaw: Buffer.alloc(32, 1), macRaw: keys.macRaw }
			const foreign = await Vault.open(changedStorage(name, { 'vault.cryptomator': resigned(name, alg, hash, other) }))
			await assert.rejects(foreign.unlock(password), { code: 'corrupt' })
		})
	}

	for (const [alg, hash] of [['none', null], ['RS256', 'sha256'], ['HS1', 'sha1'], ['hasOwnProperty', 'sha256']]) {
		test(`${name}: a configuration signed with ${alg} is refused before the password`, async () => {
			const keys = await fixtureKeys(name, password)
			const storage = changedStorage(name, { 'vault.cryptomator': resigned(name, alg, hash, keys) })
			await assert.rejects(Vault.open(storage), { code: 'unsupported-format' })
		})
	}

	test(`${name}: a key file whose versionMac does not authenticate is refused as corrupt`, async () => {
		const file = JSON.parse(fs.readFileSync(path.join(FIXTURES, name, 'masterkey.cryptomator'), 'utf8'))
		const mac = Buffer.from(file.versionMac, 'base64')
		mac[0] ^= 1
		for (const versionMac of [mac.toString('base64'), '', 'not base64!']) {
			const storage = changedStorage(name, { 'masterkey.cryptomator': Buffer.from(JSON.stringify({ ...file, versionMac })) })
			const vault = await Vault.open(storage)
			await assert.rejects(vault.unlock(password), { code: 'corrupt' })
			assert.equal(vault.unlocked, false)
		}
	})

	test(`${name}: a key file of another version than 999 is refused, even with its versionMac`, async () => {
		const keys = await fixtureKeys(name, password)
		const file = JSON.parse(fs.readFileSync(path.join(FIXTURES, name, 'masterkey.cryptomator'), 'utf8'))
		for (const version of [998, 1000, '999']) {
			const number = Buffer.alloc(4)
			number.writeInt32BE(Number(version))
			const versionMac = createHmac('sha256', keys.macRaw).update(number).digest('base64')
			const storage = changedStorage(name, { 'masterkey.cryptomator': Buffer.from(JSON.stringify({ ...file, version, versionMac })) })
			const vault = await Vault.open(storage)
			await assert.rejects(vault.unlock(password), { code: 'unsupported-format' })
		}
	})
}
