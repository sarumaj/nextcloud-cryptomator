/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * Reading Cryptomator vaults (vault format 8, cipher combinations SIV_GCM and
 * SIV_CTRMAC) in the browser: the password and the keys never leave it. The same
 * file runs under Node for the tests (tests/vault.test.js), against vaults that
 * Cryptomator's own library wrote.
 *
 * The browser's Web Crypto does the ciphers (AES-GCM, AES-CTR, AES key wrap,
 * HMAC, SHA-1); what it lacks is here: scrypt (RFC 7914), which derives the key
 * that unwraps the vault's two keys from the password, and AES-SIV (RFC 5297),
 * which encrypts the names, built on AES-CBC (for CMAC) and AES-CTR.
 *
 * Writing (Vault.writeFile, Vault.createDirectory, Vault.moveEntry,
 * Vault.removeEntry) follows Cryptomator's format and keeps the vault readable at
 * every step; see "Writing" and "Renaming, moving, deleting" below.
 */
(function (root, factory) {
	'use strict'
	if (typeof module === 'object' && module.exports) {
		module.exports = factory(globalThis.crypto)
	} else {
		root.CryptomatorVault = factory(root.crypto)
	}
})(typeof self !== 'undefined' ? self : this, function (crypto) {
	'use strict'

	const subtle = crypto.subtle
	const encoder = new TextEncoder()
	const decoder = new TextDecoder('utf-8', { fatal: true })

	/** A failure the page explains: code is one of the keys of its messages. */
	class VaultError extends Error {
		constructor(code, message) {
			super(message || code)
			this.name = 'VaultError'
			this.code = code
		}
	}

	// ----- Encodings -----

	function base64Decode(text) {
		const normal = text.replace(/-/g, '+').replace(/_/g, '/')
		const padded = normal + '='.repeat((4 - (normal.length % 4)) % 4)
		const binary = atob(padded)
		const bytes = new Uint8Array(binary.length)
		for (let i = 0; i < binary.length; i++) {
			bytes[i] = binary.charCodeAt(i)
		}
		return bytes
	}

	function base64UrlEncode(bytes, padding) {
		let binary = ''
		for (let i = 0; i < bytes.length; i++) {
			binary += String.fromCharCode(bytes[i])
		}
		const text = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_')
		return padding ? text : text.replace(/=+$/, '')
	}

	/** Standard base64 with padding, as cryptolib writes the key file's bytes. */
	function base64Encode(bytes) {
		let binary = ''
		for (let i = 0; i < bytes.length; i++) {
			binary += String.fromCharCode(bytes[i])
		}
		return btoa(binary)
	}

	const BASE32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

	function base32Encode(bytes) {
		let out = ''
		let buffer = 0
		let bits = 0
		for (const byte of bytes) {
			buffer = (buffer << 8) | byte
			bits += 8
			while (bits >= 5) {
				out += BASE32[(buffer >>> (bits - 5)) & 31]
				bits -= 5
			}
		}
		if (bits > 0) {
			out += BASE32[(buffer << (5 - bits)) & 31]
		}
		return out
	}

	function concat(...parts) {
		const out = new Uint8Array(parts.reduce((sum, part) => sum + part.length, 0))
		let offset = 0
		for (const part of parts) {
			out.set(part, offset)
			offset += part.length
		}
		return out
	}

	function uint64(value) {
		const out = new Uint8Array(8)
		new DataView(out.buffer).setBigUint64(0, BigInt(value))
		return out
	}

	function equalBytes(a, b) {
		if (a.length !== b.length) {
			return false
		}
		let diff = 0
		for (let i = 0; i < a.length; i++) {
			diff |= a[i] ^ b[i]
		}
		return diff === 0
	}

	// ----- scrypt (RFC 7914) -----

	// PBKDF2-HMAC-SHA256 with one iteration, all scrypt needs. HMAC in Web Crypto
	// refuses an empty key; HMAC pads a key with zeros to its block, so 64 zero
	// bytes are the same key.
	async function pbkdf2Once(password, salt, length) {
		const key = await subtle.importKey('raw', password.length ? password : new Uint8Array(64),
			{ name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
		const out = new Uint8Array(length)
		for (let block = 1, offset = 0; offset < length; block++, offset += 32) {
			const index = new Uint8Array([block >>> 24, (block >>> 16) & 255, (block >>> 8) & 255, block & 255])
			const part = new Uint8Array(await subtle.sign('HMAC', key, concat(salt, index)))
			out.set(part.subarray(0, Math.min(32, length - offset)), offset)
		}
		return out
	}

	function salsa20_8(b) {
		const x = b.slice()
		const rotl = (a, n) => (a << n) | (a >>> (32 - n))
		for (let i = 0; i < 8; i += 2) {
			x[4] ^= rotl(x[0] + x[12], 7); x[8] ^= rotl(x[4] + x[0], 9)
			x[12] ^= rotl(x[8] + x[4], 13); x[0] ^= rotl(x[12] + x[8], 18)
			x[9] ^= rotl(x[5] + x[1], 7); x[13] ^= rotl(x[9] + x[5], 9)
			x[1] ^= rotl(x[13] + x[9], 13); x[5] ^= rotl(x[1] + x[13], 18)
			x[14] ^= rotl(x[10] + x[6], 7); x[2] ^= rotl(x[14] + x[10], 9)
			x[6] ^= rotl(x[2] + x[14], 13); x[10] ^= rotl(x[6] + x[2], 18)
			x[3] ^= rotl(x[15] + x[11], 7); x[7] ^= rotl(x[3] + x[15], 9)
			x[11] ^= rotl(x[7] + x[3], 13); x[15] ^= rotl(x[11] + x[7], 18)
			x[1] ^= rotl(x[0] + x[3], 7); x[2] ^= rotl(x[1] + x[0], 9)
			x[3] ^= rotl(x[2] + x[1], 13); x[0] ^= rotl(x[3] + x[2], 18)
			x[6] ^= rotl(x[5] + x[4], 7); x[7] ^= rotl(x[6] + x[5], 9)
			x[4] ^= rotl(x[7] + x[6], 13); x[5] ^= rotl(x[4] + x[7], 18)
			x[11] ^= rotl(x[10] + x[9], 7); x[8] ^= rotl(x[11] + x[10], 9)
			x[9] ^= rotl(x[8] + x[11], 13); x[10] ^= rotl(x[9] + x[8], 18)
			x[12] ^= rotl(x[15] + x[14], 7); x[13] ^= rotl(x[12] + x[15], 9)
			x[14] ^= rotl(x[13] + x[12], 13); x[15] ^= rotl(x[14] + x[13], 18)
		}
		for (let i = 0; i < 16; i++) {
			b[i] = (b[i] + x[i]) | 0
		}
	}

	// BlockMix of one block B (2r words of 16) into Y; T is scratch.
	function blockMix(B, Y, r, T) {
		T.set(B.subarray((2 * r - 1) * 16, 2 * r * 16))
		for (let i = 0; i < 2 * r; i++) {
			for (let j = 0; j < 16; j++) {
				T[j] ^= B[i * 16 + j]
			}
			salsa20_8(T)
			Y.set(T, ((i & 1) * r + (i >> 1)) * 16)
		}
	}

	function roMix(B, N, r) {
		const words = 32 * r
		const V = new Int32Array(words * N)
		const X = new Int32Array(B)
		const Y = new Int32Array(words)
		const T = new Int32Array(16)
		for (let i = 0; i < N; i++) {
			V.set(X, i * words)
			blockMix(X, Y, r, T)
			X.set(Y)
		}
		for (let i = 0; i < N; i++) {
			const j = X[(2 * r - 1) * 16] & (N - 1)
			for (let k = 0; k < words; k++) {
				X[k] ^= V[j * words + k]
			}
			blockMix(X, Y, r, T)
			X.set(Y)
		}
		return X
	}

	function toWords(bytes) {
		const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
		const words = new Int32Array(bytes.length / 4)
		for (let i = 0; i < words.length; i++) {
			words[i] = view.getInt32(i * 4, true)
		}
		return words
	}

	function fromWords(words, bytes) {
		const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
		for (let i = 0; i < words.length; i++) {
			view.setInt32(i * 4, words[i], true)
		}
	}

	async function scrypt(password, salt, N, r, p, length) {
		if (N < 2 || (N & (N - 1)) !== 0) {
			throw new VaultError('corrupt', 'scrypt cost is not a power of two')
		}
		const blockBytes = 128 * r
		const B = await pbkdf2Once(password, salt, p * blockBytes)
		for (let i = 0; i < p; i++) {
			const block = B.subarray(i * blockBytes, (i + 1) * blockBytes)
			fromWords(roMix(toWords(block), N, r), block)
		}
		return pbkdf2Once(password, B, length)
	}

	// ----- AES-SIV (RFC 5297) -----

	function dbl(block) {
		const out = new Uint8Array(16)
		for (let i = 0; i < 15; i++) {
			out[i] = ((block[i] << 1) | (block[i + 1] >>> 7)) & 255
		}
		out[15] = (block[15] << 1) & 255
		if (block[0] & 0x80) {
			out[15] ^= 0x87
		}
		return out
	}

	function xor(a, b) {
		const out = new Uint8Array(a.length)
		for (let i = 0; i < a.length; i++) {
			out[i] = a[i] ^ b[i]
		}
		return out
	}

	/** CMAC with an AES key (imported for AES-CBC): CBC with a zero IV, last block masked. */
	class Cmac {
		constructor(key) {
			this.key = key
			this.subkeys = null
		}

		async cbcLast(data) {
			const out = new Uint8Array(await subtle.encrypt({ name: 'AES-CBC', iv: new Uint8Array(16) }, this.key, data))
			// Web Crypto pads with a block of its own; the MAC is the block before it.
			return out.subarray(data.length - 16, data.length)
		}

		async mac(message) {
			if (this.subkeys === null) {
				const L = await this.cbcLast(new Uint8Array(16))
				const K1 = dbl(L)
				this.subkeys = [K1, dbl(K1)]
			}
			const [K1, K2] = this.subkeys
			const blocks = Math.max(1, Math.ceil(message.length / 16))
			const data = new Uint8Array(blocks * 16)
			data.set(message)
			const last = data.subarray((blocks - 1) * 16)
			if (message.length > 0 && message.length % 16 === 0) {
				last.set(xor(last, K1))
			} else {
				last[message.length - (blocks - 1) * 16] = 0x80
				last.set(xor(last, K2))
			}
			return this.cbcLast(data)
		}
	}

	async function s2v(cmac, associated, plaintext) {
		let D = await cmac.mac(new Uint8Array(16))
		for (const data of associated) {
			D = xor(dbl(D), await cmac.mac(data))
		}
		let T
		if (plaintext.length >= 16) {
			T = plaintext.slice()
			T.set(xor(T.subarray(T.length - 16), D), T.length - 16)
		} else {
			const padded = new Uint8Array(16)
			padded.set(plaintext)
			padded[plaintext.length] = 0x80
			T = xor(dbl(D), padded)
		}
		return cmac.mac(T)
	}

	function sivCounter(V) {
		const Q = V.slice()
		Q[8] &= 0x7f
		Q[12] &= 0x7f
		return Q
	}

	/** AES-SIV with a MAC key (CMAC) and a CTR key, as Cryptomator's siv-mode. */
	class Siv {
		constructor(cmac, ctrKey) {
			this.cmac = cmac
			this.ctrKey = ctrKey
		}

		async encrypt(plaintext, associated) {
			const V = await s2v(this.cmac, associated, plaintext)
			const C = await subtle.encrypt({ name: 'AES-CTR', counter: sivCounter(V), length: 128 }, this.ctrKey, plaintext)
			return concat(V, new Uint8Array(C))
		}

		async decrypt(ciphertext, associated) {
			if (ciphertext.length < 16) {
				throw new VaultError('corrupt', 'name too short')
			}
			const V = ciphertext.subarray(0, 16)
			const P = new Uint8Array(await subtle.decrypt({ name: 'AES-CTR', counter: sivCounter(V), length: 128 },
				this.ctrKey, ciphertext.subarray(16)))
			if (!equalBytes(await s2v(this.cmac, associated, P), V)) {
				throw new VaultError('corrupt', 'name does not authenticate')
			}
			return P
		}
	}

	// ----- File contents -----

	const CHUNK = 32 * 1024
	// The chunks an opened file keeps decrypted (Vault.openFile): 4 MiB.
	const CACHED_CHUNKS = 128

	/** The two cipher combinations of vault format 8: their header and chunk layouts. */
	const SCHEMES = {
		SIV_GCM: { header: 68, nonce: 12, overhead: 28 },
		SIV_CTRMAC: { header: 88, nonce: 16, overhead: 48 },
	}

	function cleartextSize(scheme, ciphertextSize) {
		const { header, overhead } = SCHEMES[scheme]
		const payload = ciphertextSize - header
		if (payload <= 0) {
			return 0
		}
		const full = Math.floor(payload / (CHUNK + overhead))
		const rest = payload % (CHUNK + overhead)
		return full * CHUNK + Math.max(0, rest - overhead)
	}

	// ----- Names as Cryptomator finds them -----

	// The encrypted part of an entry's name (cryptofs' Constants.BASE64_PATTERN): a
	// sync tool may have added to it, e.g. "<name> (conflicted copy …).c9r".
	const BASE64_PATTERN = /[a-zA-Z0-9\-_]{20}(?:[a-zA-Z0-9\-_]{4})*(?:[a-zA-Z0-9\-_]{4}|[a-zA-Z0-9\-_]{3}=|[a-zA-Z0-9\-_]{2}==)/g
	// The longest a folder or a link entry's type file is compared (cryptofs' Constants).
	const MAX_DIR_ID_LENGTH = 36
	// cryptofs' limits and names for its health check (LongFileNameProvider, Constants).
	const MAX_NAME_FILE_SIZE = 10 * 1024
	const MIN_CIPHER_NAME_LENGTH = 28
	const RECOVERY_DIR_NAME = 'LOST+FOUND'
	const RECOVERY_DIR_ID = 'recovery'

	/** Runs task(item) for every item, at most limit at a time. */
	async function inTurn(items, limit, task) {
		let next = 0
		const worker = async () => {
			while (next < items.length) {
				await task(items[next++])
			}
		}
		await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
	}
	const MAX_SYMLINK_LENGTH = 32767

	// ----- Helpers for writing -----

	// Staging names of files and entries being written (Vault.stagingPath), in the
	// vault's top folder: Cryptomator passes them by.
	const STAGING_PREFIX = '.cryptomator-vaults-'
	// How old a staging name must be before Vault.removeLeftovers takes it for one a
	// browser left behind: a write still going on (in another tab or on another
	// device) keeps its staging name for as long as its upload and check take.
	const LEFTOVER_AGE = 24 * 60 * 60 * 1000
	const MAX_NAME_LENGTH = 255

	function randomBytes(length) {
		return crypto.getRandomValues(new Uint8Array(length))
	}

	function randomUuid() {
		return crypto.randomUUID()
	}

	async function sha256(data) {
		return new Uint8Array(await subtle.digest('SHA-256', data))
	}

	// ----- Keys: the key file, the vault's configuration, the recovery key -----
	//
	// As cryptolib (MasterkeyFileAccess) and cryptofs (VaultConfig) write them: the
	// two 32-byte keys wrapped (AES-KW) with a key derived from the password by
	// scrypt (8 bytes of salt, N = 2^15, r = 8), a version field from before vault
	// format 8 with its HMAC; the configuration a JWT signed with both keys (HS256
	// as cryptofs writes it; HS384 and HS512 read too, as cryptofs reads them).

	const MASTERKEY_VERSION = 999
	const JWT_HASHES = { HS256: 'SHA-256', HS384: 'SHA-384', HS512: 'SHA-512' }
	const SCRYPT_COST = 2 ** 15
	const SCRYPT_BLOCK_SIZE = 8
	const SHORTENING_THRESHOLD = 220
	const KEY_FILE_PREFIX = 'masterkeyfile:'

	async function deriveKek(password, salt, cost, blockSize, usages) {
		const kek = await scrypt(encoder.encode(String(password).normalize('NFC')), salt, cost, blockSize, 1, 32)
		try {
			return await subtle.importKey('raw', kek, 'AES-KW', false, usages)
		} finally {
			kek.fill(0)
		}
	}

	/**
	 * The raw keys {encRaw, macRaw} of a key file, or a VaultError 'wrong-password';
	 * 'unsupported-format' for a version other than Cryptomator 1.6's (999), and
	 * 'corrupt' if the version's HMAC (versionMac) does not authenticate with the
	 * MAC key, as cryptolib checks it.
	 */
	async function unwrapKeys(file, password) {
		if (file.version !== MASTERKEY_VERSION) {
			throw new VaultError('unsupported-format', 'key file version ' + file.version)
		}
		const kek = await deriveKek(password, base64Decode(file.scryptSalt), file.scryptCostParam, file.scryptBlockSize, ['unwrapKey'])
		let keys
		try {
			const unwrap = async (wrapped) => new Uint8Array(await subtle.exportKey('raw',
				await subtle.unwrapKey('raw', base64Decode(wrapped), kek, 'AES-KW', { name: 'HMAC', hash: 'SHA-256' }, true, ['sign'])))
			keys = { encRaw: await unwrap(file.primaryMasterKey), macRaw: await unwrap(file.hmacMasterKey) }
		} catch {
			throw new VaultError('wrong-password')
		}
		if (!(await authenticVersion(keys.macRaw, file))) {
			keys.encRaw.fill(0)
			keys.macRaw.fill(0)
			throw new VaultError('corrupt', 'the key file\'s version does not authenticate')
		}
		return keys
	}

	/** The version as cryptolib signs it: a 4-byte big-endian integer. */
	function versionBytes(version) {
		const bytes = new Uint8Array(4)
		new DataView(bytes.buffer).setInt32(0, version)
		return bytes
	}

	/** Whether a key file's versionMac is the HMAC-SHA256 of its version (compared in constant time by Web Crypto). */
	async function authenticVersion(macRaw, file) {
		let mac
		try {
			mac = base64Decode(String(file.versionMac ?? ''))
		} catch {
			return false
		}
		const key = await subtle.importKey('raw', macRaw, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])
		return subtle.verify('HMAC', key, mac, versionBytes(file.version))
	}

	/** A key file's contents for the keys and a password (with a new salt), as cryptolib's lock() makes them. */
	async function lockKeys({ encRaw, macRaw }, password, cost = SCRYPT_COST) {
		const salt = randomBytes(8)
		const kek = await deriveKek(password, salt, cost, SCRYPT_BLOCK_SIZE, ['wrapKey'])
		const wrap = async (raw) => new Uint8Array(await subtle.wrapKey('raw',
			await subtle.importKey('raw', raw, { name: 'HMAC', hash: 'SHA-256' }, true, ['sign']), kek, 'AES-KW'))
		const macKey = await subtle.importKey('raw', macRaw, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
		const file = {
			version: MASTERKEY_VERSION,
			scryptSalt: base64Encode(salt),
			scryptCostParam: cost,
			scryptBlockSize: SCRYPT_BLOCK_SIZE,
			primaryMasterKey: base64Encode(await wrap(encRaw)),
			hmacMasterKey: base64Encode(await wrap(macRaw)),
			versionMac: base64Encode(new Uint8Array(await subtle.sign('HMAC', macKey, versionBytes(MASTERKEY_VERSION)))),
		}
		return encoder.encode(JSON.stringify(file, null, 2))
	}

	/** A new vault's configuration (vault.cryptomator), signed with both keys. */
	async function signConfig({ encRaw, macRaw }, keyId, cipherCombo) {
		const part = (value) => base64UrlEncode(encoder.encode(JSON.stringify(value)), false)
		const signed = part({ kid: keyId, typ: 'JWT', alg: 'HS256' }) + '.'
			+ part({ jti: randomUuid(), format: 8, cipherCombo, shorteningThreshold: SHORTENING_THRESHOLD })
		const key = await subtle.importKey('raw', concat(encRaw, macRaw), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
		return signed + '.' + base64UrlEncode(new Uint8Array(await subtle.sign('HMAC', key, encoder.encode(signed))), false)
	}

	/** Whether a configuration is signed with these keys (it belongs to them), by its header's algorithm. */
	async function signedWith(config, { encRaw, macRaw }) {
		const hash = Object.hasOwn(JWT_HASHES, config.header.alg) ? JWT_HASHES[config.header.alg] : null
		if (hash === null) {
			return false
		}
		const key = await subtle.importKey('raw', concat(encRaw, macRaw), { name: 'HMAC', hash }, false, ['verify'])
		return subtle.verify('HMAC', key, config.signature, encoder.encode(config.signed))
	}

	const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
		let c = n
		for (let k = 0; k < 8; k++) {
			c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1
		}
		return c >>> 0
	})

	function crc32(bytes) {
		let crc = 0xFFFFFFFF
		for (const byte of bytes) {
			crc = CRC_TABLE[(crc ^ byte) & 0xFF] ^ (crc >>> 8)
		}
		return (crc ^ 0xFFFFFFFF) >>> 0
	}

	/**
	 * The recovery key of raw keys (64 bytes: the encryption key, then the MAC key),
	 * as Cryptomator's desktop app makes it (RecoveryKeyFactory, WordEncoder): the
	 * keys and the two low bytes of their CRC32 (lowest first, as Guava writes it),
	 * every 3 bytes two words of a list of 4096 (words: Cryptomator's list).
	 */
	function encodeRecoveryKey(raw, words) {
		const crc = crc32(raw)
		const padded = concat(raw, new Uint8Array([crc & 0xFF, (crc >>> 8) & 0xFF]))
		const out = []
		for (let i = 0; i < padded.length; i += 3) {
			out.push(words[(padded[i] << 4) | (padded[i + 1] >> 4)], words[((padded[i + 1] & 0x0F) << 8) | padded[i + 2]])
		}
		padded.fill(0)
		return out.join(' ')
	}

	/** The raw keys (64 bytes) in a recovery key; a VaultError 'invalid-recovery-key' if it is not one. */
	function decodeRecoveryKey(text, words) {
		const index = new Map(words.map((word, position) => [word, position]))
		const given = String(text).trim().toLowerCase().split(/\s+/).filter(Boolean)
		if (given.length !== 44) {
			throw new VaultError('invalid-recovery-key', given.length + ' words, not 44')
		}
		const unknown = given.find((word) => !index.has(word))
		if (unknown) {
			throw new VaultError('invalid-recovery-key', '"' + unknown + '" is not a word of the list')
		}
		const padded = new Uint8Array(66)
		for (let i = 0; i < given.length; i += 2) {
			const first = index.get(given[i])
			const second = index.get(given[i + 1])
			padded.set([first >> 4, ((first & 0x0F) << 4) | (second >> 8), second & 0xFF], i / 2 * 3)
		}
		const raw = padded.slice(0, 64)
		const crc = crc32(raw)
		if (padded[64] !== (crc & 0xFF) || padded[65] !== ((crc >>> 8) & 0xFF)) {
			throw new VaultError('invalid-recovery-key', 'its check sum does not match')
		}
		return raw
	}

	/** The backup name Cryptomator gives a key file it replaces (BackupHelper): .<4 bytes of its SHA-256>.bkup */
	async function backupName(name, contents) {
		const digest = await sha256(contents)
		return name + '.' + [...digest.slice(0, 4)].map((byte) => byte.toString(16).padStart(2, '0').toUpperCase()).join('') + '.bkup'
	}

	/** The parsed configuration of a vault's folder and the name of its key file. */
	async function readConfig(storage) {
		let config
		try {
			config = parseJwt(decoder.decode(await storage.read(VAULT_CONFIG)))
		} catch (error) {
			if (error instanceof VaultError) {
				throw error
			}
			throw new VaultError('unsupported-format', 'vault.cryptomator unreadable: ' + error.message)
		}
		const { header, payload } = config
		if (payload.format !== 8) {
			throw new VaultError('unsupported-format', 'vault format ' + payload.format)
		}
		if (!(payload.cipherCombo in SCHEMES)) {
			throw new VaultError('unsupported-format', 'cipher combination ' + payload.cipherCombo)
		}
		if (!Object.hasOwn(JWT_HASHES, header.alg)) {
			throw new VaultError('unsupported-format', 'signature ' + header.alg)
		}
		const kid = String(header.kid || '')
		if (!kid.startsWith(KEY_FILE_PREFIX)) {
			// Cryptomator Hub's vaults keep their key on the Hub, not in a file.
			throw new VaultError('unsupported-key', kid)
		}
		const name = kid.slice(KEY_FILE_PREFIX.length)
		if (!/^[^/\\]+$/.test(name)) {
			throw new VaultError('unsupported-key', kid)
		}
		return { config, name }
	}

	/**
	 * A name as Cryptomator stores it (Unicode NFC), refused where no vault or
	 * system could hold it: empty, . or .., with a slash, a backslash or a control
	 * character, or longer than MAX_NAME_LENGTH.
	 */
	function checkName(name) {
		const normal = String(name).normalize('NFC')
		// eslint-disable-next-line no-control-regex
		if (normal === '' || normal === '.' || normal === '..' || /[/\\\u0000-\u001f\u007f]/.test(normal) || normal.length > MAX_NAME_LENGTH) {
			throw new VaultError('invalid-name', normal)
		}
		return normal
	}

	// ----- The vault -----

	const VAULT_CONFIG = 'vault.cryptomator'

	function parseJwt(token) {
		const parts = token.trim().split('.')
		if (parts.length !== 3) {
			throw new VaultError('unsupported-format', 'vault.cryptomator is not a JWT')
		}
		const json = (part) => JSON.parse(decoder.decode(base64Decode(part)))
		return { header: json(parts[0]), payload: json(parts[1]), signed: parts[0] + '.' + parts[1], signature: base64Decode(parts[2]) }
	}

	function joinPath(...parts) {
		return parts.filter((part) => part !== '').join('/')
	}

	/**
	 * A vault in a storage: storage.read(path) gives a file's bytes (a VaultError
	 * 'not-found' if it is missing) and storage.list(path) a folder's entries
	 * ({name, isDir, size, mtime (a Date, if known)}); paths are relative to the
	 * vault's folder.
	 */
	class Vault {
		constructor(storage, config, masterkeyFile) {
			this.storage = storage
			this.config = config
			this.masterkeyFile = masterkeyFile
			this.keys = null
		}

		/** Reads the vault's configuration and key file; checks the format before any password. */
		static async open(storage) {
			const { config, name } = await readConfig(storage)
			const masterkeyFile = JSON.parse(decoder.decode(await storage.read(name)))
			const vault = new Vault(storage, config, masterkeyFile)
			vault.masterkeyName = name
			return vault
		}

		get scheme() {
			return this.config.payload.cipherCombo
		}

		get unlocked() {
			return this.keys !== null
		}

		/** Derives the keys from the password; a VaultError 'wrong-password' if it is not the vault's. */
		async unlock(password) {
			const keys = await unwrapKeys(this.masterkeyFile, password)
			try {
				await this.useKeys(keys)
			} finally {
				keys.encRaw.fill(0)
				keys.macRaw.fill(0)
			}
		}

		/** Takes raw keys into use (not kept raw); refused if the configuration is not signed with them. */
		async useKeys({ encRaw, macRaw }) {
			// The configuration is signed with both keys: a vault.cryptomator that
			// does not belong to this key file is refused.
			if (!(await signedWith(this.config, { encRaw, macRaw }))) {
				throw new VaultError('corrupt', 'vault.cryptomator is not signed with this key')
			}
			const importAes = (raw, name) => subtle.importKey('raw', raw, name, false, ['encrypt', 'decrypt'])
			this.keys = {
				gcm: await importAes(encRaw, 'AES-GCM'),
				ctr: await importAes(encRaw, 'AES-CTR'),
				mac: await subtle.importKey('raw', macRaw, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']),
			}
			this.siv = new Siv(new Cmac(await importAes(macRaw, 'AES-CBC')), this.keys.ctr)
			this.dirPaths = new Map()
		}

		/**
		 * Creates a vault in an empty folder of the storage, as Cryptomator's desktop
		 * app and cryptofs do: new keys, the key file, the configuration, the root
		 * directory with its ID's backup (dirid.c9r). Opened again from the storage
		 * and unlocked with the password before it is returned, unlocked.
		 */
		static async create(storage, password, { cipherCombo = 'SIV_GCM' } = {}) {
			if (typeof storage.write !== 'function') {
				throw new VaultError('read-only')
			}
			if (!(cipherCombo in SCHEMES)) {
				throw new VaultError('unsupported-format', 'cipher combination ' + cipherCombo)
			}
			const name = 'masterkey.cryptomator'
			for (const taken of [VAULT_CONFIG, name, 'd']) {
				if (await storage.stat(taken)) {
					throw new VaultError('exists-other', taken)
				}
			}
			const keys = { encRaw: randomBytes(32), macRaw: randomBytes(32) }
			try {
				await storage.write(name, await lockKeys(keys, password), { create: true })
				await storage.write(VAULT_CONFIG, encoder.encode(await signConfig(keys, KEY_FILE_PREFIX + name, cipherCombo)), { create: true })
				const vault = await Vault.open(storage)
				await vault.useKeys(keys)
				const root = await vault.dirPath('')
				await storage.mkdir('d', { existsOk: true })
				await storage.mkdir(root.split('/').slice(0, 2).join('/'), { existsOk: true })
				await storage.mkdir(root, { existsOk: true })
				await storage.write(joinPath(root, 'dirid.c9r'), await vault.encryptContents(new Uint8Array(0)), { create: true })
			} finally {
				keys.encRaw.fill(0)
				keys.macRaw.fill(0)
			}
			const created = await Vault.open(storage)
			await created.unlock(password)
			return created
		}

		/**
		 * Changes the password, as Cryptomator's desktop app does: the keys unwrapped
		 * with the old one and wrapped with the new one (a new salt, the same scrypt
		 * cost); the old key file kept beside as a backup (backupName). The new one
		 * is read back and must give the same keys, else the old one is put back.
		 * Nothing else changes: the files stay as they are encrypted.
		 */
		async changePassword(oldPassword, newPassword) {
			if (typeof this.storage.write !== 'function') {
				throw new VaultError('read-only')
			}
			const name = this.masterkeyName
			const before = await this.storage.read(name)
			const file = JSON.parse(decoder.decode(before))
			const keys = await unwrapKeys(file, oldPassword)
			try {
				await this.replaceKeyFile(name, before, await lockKeys(keys, newPassword, file.scryptCostParam), keys, newPassword)
			} finally {
				keys.encRaw.fill(0)
				keys.macRaw.fill(0)
			}
		}

		/**
		 * Puts a new key file in place of the old one (backed up beside it, if there
		 * was one) and reads it back: it must give these keys with the password, else
		 * the old file is put back (VaultError 'corrupt').
		 */
		async replaceKeyFile(name, before, after, keys, password) {
			if (before) {
				await this.storage.write(await backupName(name, before), before)
			}
			await this.storage.write(name, after, { create: !before })
			const stored = JSON.parse(decoder.decode(await this.storage.read(name)))
			let back = null
			try {
				back = await unwrapKeys(stored, password)
			} catch {
				// Checked below.
			}
			const same = back !== null && equalBytes(back.encRaw, keys.encRaw) && equalBytes(back.macRaw, keys.macRaw)
			back?.encRaw.fill(0)
			back?.macRaw.fill(0)
			if (!same) {
				if (before) {
					await this.storage.write(name, before)
				}
				throw new VaultError('corrupt', 'the new key file does not read back')
			}
			this.masterkeyFile = stored
		}

		/** The vault's recovery key (encodeRecoveryKey), after its password. */
		async recoveryKey(password, words) {
			const keys = await unwrapKeys(JSON.parse(decoder.decode(await this.storage.read(this.masterkeyName))), password)
			const raw = concat(keys.encRaw, keys.macRaw)
			try {
				return encodeRecoveryKey(raw, words)
			} finally {
				raw.fill(0)
				keys.encRaw.fill(0)
				keys.macRaw.fill(0)
			}
		}

		/**
		 * A new password with the recovery key, as Cryptomator's desktop app sets one:
		 * the keys from the recovery key, checked against the vault's configuration
		 * (signed with them), a new key file (the old one, if any, backed up). Also
		 * where the key file is lost. Returns the vault, unlocked.
		 */
		static async resetPassword(storage, recoveryKey, newPassword, words) {
			if (typeof storage.write !== 'function') {
				throw new VaultError('read-only')
			}
			const { config, name } = await readConfig(storage)
			const raw = decodeRecoveryKey(recoveryKey, words)
			const keys = { encRaw: raw.slice(0, 32), macRaw: raw.slice(32) }
			raw.fill(0)
			try {
				if (!(await signedWith(config, keys))) {
					throw new VaultError('invalid-recovery-key', 'it is not this vault\'s')
				}
				const before = await storage.read(name).catch((error) => {
					if (error?.code === 'not-found') {
						return null
					}
					throw error
				})
				const vault = new Vault(storage, config, null)
				vault.masterkeyName = name
				await vault.replaceKeyFile(name, before, await lockKeys(keys, newPassword), keys, newPassword)
			} finally {
				keys.encRaw.fill(0)
				keys.macRaw.fill(0)
			}
			const opened = await Vault.open(storage)
			await opened.unlock(newPassword)
			return opened
		}

		/** Forgets the keys; reading needs the password again. */
		lock() {
			this.keys = null
			this.siv = null
			this.dirPaths = null
		}

		requireKeys() {
			if (!this.keys) {
				throw new VaultError('locked')
			}
		}

		/** The storage folder of a directory: d/XX/YYYY… from the hash of its ID. */
		async dirPath(dirId) {
			this.requireKeys()
			if (!this.dirPaths.has(dirId)) {
				const encrypted = await this.siv.encrypt(encoder.encode(dirId), [])
				const hash = base32Encode(new Uint8Array(await subtle.digest('SHA-1', encrypted)))
				this.dirPaths.set(dirId, joinPath('d', hash.slice(0, 2), hash.slice(2)))
			}
			return this.dirPaths.get(dirId)
		}

		/**
		 * The name in an entry's file name, found as cryptofs finds it (C9rDecryptor):
		 * the first run of base64 in it that decrypts; where one does not, the run is
		 * narrowed at its first and last '-' or '_' and tried again. {name, extracted}
		 * or null.
		 */
		async extractName(basename, dirId, start = 0, end = basename.length) {
			const pattern = new RegExp(BASE64_PATTERN.source, 'g')
			pattern.lastIndex = start
			const match = pattern.exec(basename.slice(0, end))
			if (match === null) {
				return null
			}
			const valid = match[0]
			try {
				const name = decoder.decode(await this.siv.decrypt(base64Decode(valid), [encoder.encode(dirId)]))
				return { name, extracted: valid }
			} catch {
				const first = valid.search(/[-_]/)
				if (first === -1) {
					return null
				}
				const last = Math.max(valid.lastIndexOf('-'), valid.lastIndexOf('_'))
				const withNewStart = await this.extractName(basename, dirId, match.index + Math.max(1, first), end)
				if (withNewStart !== null) {
					return withNewStart
				}
				return this.extractName(basename, dirId, start, match.index + valid.length - Math.max(1, valid.length - last))
			}
		}

		async decryptName(encrypted, parentDirId) {
			const base = encrypted.endsWith('.c9r') ? encrypted.slice(0, -4) : encrypted
			try {
				return decoder.decode(await this.siv.decrypt(base64Decode(base), [encoder.encode(parentDirId)]))
			} catch (error) {
				throw error instanceof VaultError ? error : new VaultError('corrupt', 'name not decryptable')
			}
		}

		/**
		 * The entries of a directory (the root's ID is ''): {name, type ('file',
		 * 'dir', 'link'), size (of a file, decrypted), dirId (of a directory), path
		 * (in the storage), mtime (the storage's, if known)}. As Cryptomator lists a
		 * directory (cryptofs' NodeProcessor): an entry whose name does not decrypt is
		 * left out, a sync conflict's copy is resolved (resolveConflict), a folder whose
		 * directory is missing is left out (BrokenDirectoryFilter). An entry that cannot
		 * be read for another reason is listed as type 'broken'.
		 */
		async list(dirId) {
			const folder = await this.dirPath(dirId)
			const entries = await this.storage.list(folder)
			const results = await Promise.all(entries.map((entry) => this.describe(folder, entry, dirId)))
			const listed = results.filter((entry) => entry !== null && !entry.conflict)
			// One after another: two copies of one name must not race for it.
			for (const conflict of results.filter((entry) => entry?.conflict)) {
				const resolved = await this.resolveConflict(folder, dirId, conflict)
				if (resolved !== null) {
					listed.push(resolved)
				}
			}
			const present = await Promise.all(listed.map(async (entry) => entry.type !== 'dir'
				|| await this.storage.stat?.(await this.dirPath(entry.dirId)).then((found) => found !== null, () => true) !== false))
			// Folders first, then by name.
			return listed.filter((entry, index) => present[index])
				.sort((a, b) => (b.type === 'dir') - (a.type === 'dir') || a.name.localeCompare(b.name))
		}

		/**
		 * A sync conflict's copy, resolved as Cryptomator resolves it (cryptofs'
		 * C9rConflictResolver), so that the vault ends up as if Cryptomator had listed
		 * the directory: moved to its proper name if that is free; deleted if it and
		 * the entry of that name are the same folder or link; else renamed to its name
		 * with the sync tool's suffix, or " (1)" to " (9)". Left for the next listing
		 * (not listed now) if a folder's type cannot be told yet, or on an error.
		 * Returns the entry it became, or null.
		 */
		async resolveConflict(folder, dirId, conflict) {
			if (typeof this.storage.move !== 'function') {
				return null
			}
			const canonicalName = conflict.found.extracted + '.c9r'
			const canonicalPath = joinPath(folder, canonicalName)
			try {
				try {
					await this.storage.move(conflict.path, canonicalPath)
					return this.describe(folder, { ...conflict.entry, name: canonicalName }, dirId)
				} catch (error) {
					if (error?.code !== 'exists') {
						throw error
					}
				}
				const canonical = await this.storage.stat(canonicalPath)
				if (conflict.entry.isDir && canonical?.isDir) {
					const dir = await this.compareTypeFile(conflict.path, canonicalPath, 'dir.c9r', MAX_DIR_ID_LENGTH, true)
					if (dir.both) {
						return dir.same ? this.removeDuplicate(conflict.path) : this.renameConflict(folder, dirId, conflict)
					}
					const link = await this.compareTypeFile(conflict.path, canonicalPath, 'symlink.c9r', MAX_SYMLINK_LENGTH, false)
					if (link.both) {
						return link.same ? this.removeDuplicate(conflict.path) : this.renameConflict(folder, dirId, conflict)
					}
					if (!((dir.conflicting || link.conflicting) && (dir.canonical || link.canonical))) {
						return null
					}
				}
				return this.renameConflict(folder, dirId, conflict)
			} catch {
				return null
			}
		}

		async removeDuplicate(path) {
			await this.storage.remove(path)
			// The entry of the proper name is listed already.
			return null
		}

		/** The first bytes of a folder entry's type file in both entries, compared. */
		async compareTypeFile(conflictingPath, canonicalPath, file, length, fullLength) {
			const read = (path) => this.storage.read(joinPath(path, file)).then((data) => data.subarray(0, length), (error) => {
				if (error?.code === 'not-found') {
					return new Uint8Array(0)
				}
				throw error
			})
			const [a, b] = await Promise.all([read(conflictingPath), read(canonicalPath)])
			const least = fullLength ? length : 1
			const conflicting = a.length >= least
			const canonical = b.length >= least
			return { conflicting, canonical, both: conflicting && canonical, same: conflicting && canonical && equalBytes(a, b) }
		}

		/** Renames a conflict's copy as cryptofs does (renameConflictingFile). */
		async renameConflict(folder, dirId, conflict) {
			const cleartext = conflict.found.name
			const dot = cleartext.lastIndexOf('.')
			const extension = dot > 0 ? cleartext.slice(dot) : ''
			const basename = dot > 0 ? cleartext.slice(0, dot) : cleartext
			const full = conflict.entry.name
			const endOfCiphertext = full.indexOf(conflict.found.extracted) + conflict.found.extracted.length
			const originalSuffix = full.slice(endOfCiphertext, full.length - '.c9r'.length)
			const threshold = this.config.payload.shorteningThreshold ?? 220
			const maxCleartext = Math.trunc((threshold - 4) / 4) * 3 - 16
			const net = maxCleartext - extension.length
			const suffix = originalSuffix.slice(0, Math.min(originalSuffix.length, Math.trunc(net / 2)))
			const restricted = basename.slice(0, Math.max(0, Math.min(basename.length, net - Math.max(4, suffix.length))))
			const candidates = [restricted + suffix + extension]
			for (let i = 1; i < 10; i++) {
				candidates.push(restricted + ' (' + i + ')' + extension)
			}
			for (const name of candidates) {
				const fullName = base64UrlEncode(await this.siv.encrypt(encoder.encode(name), [encoder.encode(dirId)]), true) + '.c9r'
				const path = joinPath(folder, fullName)
				if (await this.storage.stat(path) === null) {
					await this.storage.move(conflict.path, path)
					return this.describe(folder, { ...conflict.entry, name: fullName }, dirId)
				}
			}
			// Every candidate taken: Cryptomator keeps the copy as it is, unlisted.
			return null
		}

		async describe(folder, entry, dirId) {
			const path = joinPath(folder, entry.name)
			const described = await this.describeEntry(folder, entry, dirId, path)
			if (described !== null && entry.mtime && !described.mtime) {
				described.mtime = entry.mtime
			}
			return described
		}

		async describeEntry(folder, entry, dirId, path) {
			try {
				if (entry.name.endsWith('.c9s') && entry.isDir) {
					// A long name: the encrypted name in name.c9s, the item beside it.
					const name = await this.decryptName(decoder.decode(await this.storage.read(joinPath(path, 'name.c9s'))).trim(), dirId)
					const inside = await this.storage.list(path)
					const contents = inside.find((item) => item.name === 'contents.c9r')
					if (contents) {
						return { name, type: 'file', size: cleartextSize(this.scheme, contents.size), path: joinPath(path, 'contents.c9r'), mtime: contents.mtime }
					}
					return this.describeNode(name, path, inside.map((item) => item.name))
				}
				// Anything without .c9r is not an entry (.c9u marks a file in use on
				// another device); dirid.c9r and other names without an encrypted name in
				// them are left out, as Cryptomator leaves them out.
				if (!entry.name.endsWith('.c9r')) {
					return null
				}
				const found = await this.extractName(entry.name.slice(0, -'.c9r'.length), dirId)
				if (found === null) {
					return null
				}
				if (entry.name !== found.extracted + '.c9r') {
					// A sync conflict's copy (resolved by list), unless hidden.
					return entry.name.startsWith('.') ? null : { conflict: true, entry, found, path }
				}
				const name = found.name
				if (!entry.isDir) {
					return { name, type: 'file', size: cleartextSize(this.scheme, entry.size), path }
				}
				return this.describeNode(name, path, null)
			} catch (error) {
				return { name: entry.name, type: 'broken', error: error.message, path }
			}
		}

		// A folder <name>.c9r (or .c9s): a directory (dir.c9r, its ID) or a link (symlink.c9r).
		async describeNode(name, path, names) {
			const tryRead = async (file) => {
				if (names !== null && !names.includes(file)) {
					return null
				}
				try {
					return await this.storage.read(joinPath(path, file))
				} catch (error) {
					if (error instanceof VaultError && error.code === 'not-found') {
						return null
					}
					throw error
				}
			}
			const dir = await tryRead('dir.c9r')
			if (dir !== null) {
				return { name, type: 'dir', dirId: decoder.decode(dir).trim(), path }
			}
			const link = await tryRead('symlink.c9r')
			if (link !== null) {
				const target = decoder.decode(await this.decryptContents(link))
				return { name, type: 'link', target, path }
			}
			throw new VaultError('corrupt', 'neither a directory nor a link')
		}

		/**
		 * A file's decrypted contents: onProgress(done, total) after each chunk,
		 * onDownload(done, total) while the storage reads it (if it reports that).
		 */
		async readFile(entry, onProgress, onDownload) {
			return this.decryptContents(await this.storage.read(entry.path, onDownload), onProgress)
		}

		async decryptContents(data, onProgress) {
			this.requireKeys()
			const scheme = SCHEMES[this.scheme]
			if (data.length === 0) {
				return new Uint8Array(0)
			}
			if (data.length < scheme.header) {
				throw new VaultError('corrupt', 'file header too short')
			}
			const header = data.subarray(0, scheme.header)
			const headerNonce = header.subarray(0, scheme.nonce)
			const contentKey = await this.decryptHeader(header, headerNonce)
			const body = data.subarray(scheme.header)
			const chunkSize = CHUNK + scheme.overhead
			const out = new Uint8Array(cleartextSize(this.scheme, data.length))
			for (let number = 0, offset = 0; offset < body.length; number++, offset += chunkSize) {
				const chunk = body.subarray(offset, Math.min(offset + chunkSize, body.length))
				const plain = await this.decryptChunk(chunk, number, headerNonce, contentKey)
				out.set(plain, number * CHUNK)
				if (onProgress) {
					onProgress(Math.min(offset + chunkSize, body.length), body.length)
				}
			}
			return out
		}

		async decryptHeader(header, nonce) {
			let payload
			if (this.scheme === 'SIV_GCM') {
				try {
					payload = new Uint8Array(await subtle.decrypt({ name: 'AES-GCM', iv: nonce }, this.keys.gcm, header.subarray(12)))
				} catch (error) {
					throw new VaultError('corrupt', 'file header does not authenticate')
				}
			} else {
				const encrypted = header.subarray(16, 56)
				if (!(await subtle.verify('HMAC', this.keys.mac, header.subarray(56, 88), header.subarray(0, 56)))) {
					throw new VaultError('corrupt', 'file header does not authenticate')
				}
				payload = new Uint8Array(await subtle.decrypt({ name: 'AES-CTR', counter: nonce, length: 128 }, this.keys.ctr, encrypted))
			}
			// 8 reserved bytes, then the file's own content key.
			const raw = payload.subarray(8, 40)
			const usage = this.scheme === 'SIV_GCM' ? 'AES-GCM' : 'AES-CTR'
			const key = await subtle.importKey('raw', raw, usage, false, ['decrypt'])
			payload.fill(0)
			return key
		}

		async decryptChunk(chunk, number, headerNonce, contentKey) {
			try {
				if (this.scheme === 'SIV_GCM') {
					const iv = chunk.subarray(0, 12)
					return new Uint8Array(await subtle.decrypt({ name: 'AES-GCM', iv, additionalData: concat(uint64(number), headerNonce) },
						contentKey, chunk.subarray(12)))
				}
				const nonce = chunk.subarray(0, 16)
				const encrypted = chunk.subarray(16, chunk.length - 32)
				const mac = chunk.subarray(chunk.length - 32)
				if (!(await subtle.verify('HMAC', this.keys.mac, mac, concat(headerNonce, uint64(number), nonce, encrypted)))) {
					throw new Error('mac')
				}
				return new Uint8Array(await subtle.decrypt({ name: 'AES-CTR', counter: nonce, length: 128 }, contentKey, encrypted))
			} catch (error) {
				throw new VaultError('corrupt', 'chunk ' + number + ' does not authenticate')
			}
		}

		// ----- Writing -----
		//
		// As Cryptomator writes (tests/compat.test.js has Cryptomator's own library
		// read and check what is written here). The vault must never be left in a
		// state Cryptomator cannot read:
		// - a file is written under a staging name that Cryptomator ignores (in the
		//   vault's top folder, outside d/), read back and compared, and only then moved into place in one
		//   step (over the old file when replacing): a failed check leaves the vault
		//   as it was, and what a browser that closed midway left there is removed
		//   when the vault is next unlocked (removeLeftovers);
		// - an entry of several files (a folder's dir.c9r, a long name's name.c9s) is
		//   put together in a staging folder and moved into place in one step;
		// - a new folder's own directory (with its dirid.c9r) exists before the entry
		//   that points to it;
		// - nothing is replaced unless asked to (a file only, never a folder), and a
		//   new entry is refused where one of that name appeared meanwhile;
		// - the encryption is undone in memory before anything is stored.

		requireWritable() {
			this.requireKeys()
			if (typeof this.storage.write !== 'function') {
				throw new VaultError('read-only')
			}
		}

		/**
		 * Where a directory's entry of this (checked) name lives: {path (its .c9r, or
		 * .c9s for a long name), long, fullName (the encrypted name)}.
		 */
		async entryPath(dirId, name) {
			const folder = await this.dirPath(dirId)
			const fullName = base64UrlEncode(await this.siv.encrypt(encoder.encode(name), [encoder.encode(dirId)]), true) + '.c9r'
			const threshold = this.config.payload.shorteningThreshold ?? 220
			if (fullName.length > threshold) {
				const short = base64UrlEncode(new Uint8Array(await subtle.digest('SHA-1', encoder.encode(fullName))), true) + '.c9s'
				return { folder, path: joinPath(folder, short), long: true, fullName }
			}
			return { folder, path: joinPath(folder, fullName), long: false, fullName }
		}

		/** What is stored at an entry's place: null, 'file', 'dir', 'link' or 'unknown'. */
		async existing(entry) {
			const found = await this.storage.stat(entry.path)
			if (!found) {
				return null
			}
			if (!found.isDir) {
				return 'file'
			}
			const names = (await this.storage.list(entry.path)).map((item) => item.name)
			if (names.includes('contents.c9r')) {
				return 'file'
			}
			if (names.includes('dir.c9r')) {
				return 'dir'
			}
			return names.includes('symlink.c9r') ? 'link' : 'unknown'
		}

		/**
		 * The start of a file's encryption: a new content key and the header that
		 * holds it; encryptChunk(number, plain) encrypts the file's chunks in turn.
		 */
		async startEncryption() {
			this.requireKeys()
			const scheme = SCHEMES[this.scheme]
			const gcm = this.scheme === 'SIV_GCM'
			const headerNonce = randomBytes(scheme.nonce)
			const rawKey = randomBytes(32)
			// 8 reserved bytes (all ones, as Cryptomator writes them), the content key.
			const payload = concat(new Uint8Array(8).fill(0xff), rawKey)
			let header
			if (gcm) {
				header = concat(headerNonce, new Uint8Array(await subtle.encrypt({ name: 'AES-GCM', iv: headerNonce }, this.keys.gcm, payload)))
			} else {
				const encrypted = new Uint8Array(await subtle.encrypt({ name: 'AES-CTR', counter: headerNonce, length: 128 }, this.keys.ctr, payload))
				const mac = new Uint8Array(await subtle.sign('HMAC', this.keys.mac, concat(headerNonce, encrypted)))
				header = concat(headerNonce, encrypted, mac)
			}
			const contentKey = await subtle.importKey('raw', rawKey, gcm ? 'AES-GCM' : 'AES-CTR', false, ['encrypt'])
			payload.fill(0)
			rawKey.fill(0)
			const keys = this.keys
			return {
				header,
				async encryptChunk(number, plain) {
					const nonce = randomBytes(scheme.nonce)
					if (gcm) {
						return concat(nonce, new Uint8Array(await subtle.encrypt(
							{ name: 'AES-GCM', iv: nonce, additionalData: concat(uint64(number), headerNonce) }, contentKey, plain)))
					}
					const encrypted = new Uint8Array(await subtle.encrypt({ name: 'AES-CTR', counter: nonce, length: 128 }, contentKey, plain))
					const mac = new Uint8Array(await subtle.sign('HMAC', keys.mac, concat(headerNonce, uint64(number), nonce, encrypted)))
					return concat(nonce, encrypted, mac)
				},
			}
		}

		/** The size of a file of this many bytes, encrypted. */
		encryptedSize(size) {
			const scheme = SCHEMES[this.scheme]
			return scheme.header + size + Math.ceil(size / CHUNK) * scheme.overhead
		}

		/** A file's contents encrypted as Cryptomator does: a new content key, header, chunks. */
		async encryptContents(data, onProgress) {
			const encryption = await this.startEncryption()
			// An empty file is its header alone; a full last chunk has none after it.
			const chunks = Math.ceil(data.length / CHUNK)
			const out = new Uint8Array(this.encryptedSize(data.length))
			out.set(encryption.header)
			for (let number = 0, offset = encryption.header.length; number < chunks; number++) {
				const chunk = await encryption.encryptChunk(number, data.subarray(number * CHUNK, Math.min((number + 1) * CHUNK, data.length)))
				out.set(chunk, offset)
				offset += chunk.length
				if (onProgress) {
					onProgress(number + 1, chunks)
				}
			}
			return out
		}

		// ----- Large files, in pieces -----
		//
		// A file too large to hold in memory twice: source.size and
		// source.read(start, end) give its plain bytes in pieces (a File's slices).
		// It is encrypted chunk by chunk into parts the storage takes in turn
		// (storage.writeParts), then read back in ranges (storage.readRange), each
		// chunk decrypted (which authenticates it) and compared byte for byte with
		// the source. As with writeFile, under a staging name and moved into place
		// only after; a failed check leaves the vault as it was. In memory: a part.

		/** The encrypted file in parts of about partSize bytes (an async iterable). */
		async * encryptedParts(source, partSize, onProgress) {
			const encryption = await this.startEncryption()
			const window = 32 * CHUNK
			let part = [encryption.header]
			let length = encryption.header.length
			for (let start = 0, number = 0; start < source.size; start += window) {
				const plain = await source.read(start, Math.min(start + window, source.size))
				for (let offset = 0; offset < plain.length; offset += CHUNK, number++) {
					const chunk = await encryption.encryptChunk(number, plain.subarray(offset, Math.min(offset + CHUNK, plain.length)))
					part.push(chunk)
					length += chunk.length
					if (length >= partSize) {
						yield concat(...part)
						part = []
						length = 0
					}
				}
				onProgress?.(Math.min(start + window, source.size), source.size)
			}
			if (length > 0) {
				yield concat(...part)
			}
		}

		/**
		 * Compares a stored file with its source, in ranges: each chunk decrypted and
		 * authenticated, its bytes equal to the source's.
		 */
		async checkStoredStream(path, source, onProgress) {
			const scheme = SCHEMES[this.scheme]
			const expected = this.encryptedSize(source.size)
			const found = await this.storage.stat(path)
			if (!found || found.size !== expected) {
				throw new VaultError('corrupt', 'the stored file has ' + (found?.size ?? 'no') + ' bytes, not ' + expected)
			}
			const header = await this.storage.readRange(path, 0, scheme.header)
			const headerNonce = header.subarray(0, scheme.nonce)
			const contentKey = await this.decryptHeader(header, headerNonce)
			const chunkSize = CHUNK + scheme.overhead
			const chunks = Math.ceil(source.size / CHUNK)
			const perRange = 32
			for (let first = 0; first < chunks; first += perRange) {
				const last = Math.min(first + perRange, chunks)
				const begin = scheme.header + first * chunkSize
				const stored = await this.storage.readRange(path, begin, Math.min(scheme.header + last * chunkSize, expected))
				const plain = await source.read(first * CHUNK, Math.min(last * CHUNK, source.size))
				for (let number = first; number < last; number++) {
					const offset = (number - first) * chunkSize
					const decrypted = await this.decryptChunk(stored.subarray(offset, Math.min(offset + chunkSize, stored.length)), number, headerNonce, contentKey)
					if (!equalBytes(decrypted, plain.subarray((number - first) * CHUNK, (number - first) * CHUNK + decrypted.length))) {
						throw new VaultError('corrupt', 'the stored file differs from the one written (chunk ' + number + ')')
					}
				}
				onProgress?.(Math.min(last * CHUNK, source.size), source.size)
			}
		}

		/**
		 * writeFile for a source read in pieces (see above). options: replace,
		 * onProgress(phase, done, total) with the phases 'upload' and 'verify',
		 * partSize (bytes per part handed to the storage).
		 */
		async writeFileStream(dirId, rawName, source, options = {}) {
			this.requireWritable()
			const { replace = false, onProgress, partSize = 10 * 1024 * 1024 } = options
			const progress = (phase) => (done, total) => onProgress?.(phase, done, total)
			const name = checkName(rawName)
			const entry = await this.entryPath(dirId, name)
			const before = await this.existing(entry)
			if (before !== null && (before !== 'file' || !replace)) {
				throw new VaultError(before === 'file' ? 'exists' : 'exists-other', name)
			}
			const total = this.encryptedSize(source.size)
			const contentsPath = entry.long ? joinPath(entry.path, 'contents.c9r') : entry.path
			const staging = this.stagingPath()
			const longNew = entry.long && before === null
			const stagedFile = longNew ? joinPath(staging, 'contents.c9r') : staging
			try {
				if (longNew) {
					await this.storage.mkdir(staging)
					await this.storage.write(joinPath(staging, 'name.c9s'), encoder.encode(entry.fullName), { create: true })
				}
				await this.storage.writeParts(stagedFile, total, this.encryptedParts(source, partSize, progress('upload')), { create: true })
				await this.checkStoredStream(stagedFile, source, progress('verify'))
				if (longNew) {
					await this.storage.move(staging, entry.path)
				} else {
					await this.storage.move(staging, contentsPath, { overwrite: before !== null })
				}
			} catch (error) {
				await this.storage.remove(staging).catch(() => {})
				throw error
			}
			return { name, path: contentsPath, size: source.size }
		}

		/**
		 * A file's decrypted contents in pieces, for a file too large to hold:
		 * onPiece(bytes) for each range of chunks in turn (awaited), each chunk
		 * authenticated; onProgress(done, total).
		 */
		async readFileStream(entry, onPiece, onProgress) {
			for await (const piece of this.decryptedPieces(entry, onProgress)) {
				await onPiece(piece)
			}
		}

		/**
		 * A file's decrypted contents in pieces of up to 64 chunks (2 MiB), in order,
		 * each read in one range and checked: what readFileStream hands on, for a
		 * reader that pulls (e.g. an upload in parts). Nothing for an empty file.
		 */
		async * decryptedPieces(entry, onProgress) {
			this.requireKeys()
			const scheme = SCHEMES[this.scheme]
			const found = await this.storage.stat(entry.path)
			if (!found || found.size === 0) {
				return
			}
			if (found.size < scheme.header) {
				throw new VaultError('corrupt', 'file header too short')
			}
			const header = await this.storage.readRange(entry.path, 0, scheme.header)
			const headerNonce = header.subarray(0, scheme.nonce)
			const contentKey = await this.decryptHeader(header, headerNonce)
			const chunkSize = CHUNK + scheme.overhead
			const size = cleartextSize(this.scheme, found.size)
			const chunks = Math.ceil((found.size - scheme.header) / chunkSize)
			const perRange = 64
			for (let first = 0; first < chunks; first += perRange) {
				const last = Math.min(first + perRange, chunks)
				const stored = await this.storage.readRange(entry.path, scheme.header + first * chunkSize, Math.min(scheme.header + last * chunkSize, found.size))
				const pieces = []
				for (let number = first; number < last; number++) {
					const offset = (number - first) * chunkSize
					pieces.push(await this.decryptChunk(stored.subarray(offset, Math.min(offset + chunkSize, stored.length)), number, headerNonce, contentKey))
				}
				yield concat(...pieces)
				onProgress?.(Math.min(last * CHUNK, size), size)
			}
		}

		/**
		 * A file opened for reads anywhere in it, as a player asks (a range of bytes,
		 * then another after a seek): { size, read(start, end) }. Each read fetches
		 * only the chunks its bytes are in, in one range, and decrypts them (which
		 * authenticates them); the header once. The chunks last read are kept
		 * (CACHED_CHUNKS), as players ask for overlapping ranges.
		 */
		async openFile(entry) {
			this.requireKeys()
			const scheme = SCHEMES[this.scheme]
			const found = await this.storage.stat(entry.path)
			if (!found) {
				throw new VaultError('not-found', entry.path)
			}
			if (found.size > 0 && found.size < scheme.header) {
				throw new VaultError('corrupt', 'file header too short')
			}
			const size = cleartextSize(this.scheme, found.size)
			const chunkSize = CHUNK + scheme.overhead
			// Chunk number to its decrypted bytes, the least recently used first.
			const cache = new Map()
			const use = (number, plain) => {
				cache.delete(number)
				cache.set(number, plain)
			}
			let header = null
			const keys = () => {
				header ??= this.storage.readRange(entry.path, 0, scheme.header).then(async (stored) => {
					const nonce = stored.subarray(0, scheme.nonce)
					return { nonce, contentKey: await this.decryptHeader(stored, nonce) }
				})
				// A failed read is tried again with the next one.
				header.catch(() => { header = null })
				return header
			}
			return {
				size,
				read: async (start, end) => {
					start = Math.max(0, start)
					end = Math.min(end, size)
					if (end <= start) {
						return new Uint8Array(0)
					}
					const first = Math.floor(start / CHUNK)
					const last = Math.ceil(end / CHUNK)
					// The chunks kept from the start on; the rest is read from the first one missing.
					let missing = first
					while (missing < last && cache.has(missing)) {
						use(missing, cache.get(missing))
						missing++
					}
					if (missing < last) {
						const { nonce, contentKey } = await keys()
						const stored = await this.storage.readRange(entry.path, scheme.header + missing * chunkSize, Math.min(scheme.header + last * chunkSize, found.size))
						for (let number = missing; number < last; number++) {
							const offset = (number - missing) * chunkSize
							use(number, await this.decryptChunk(stored.subarray(offset, Math.min(offset + chunkSize, stored.length)), number, nonce, contentKey))
						}
					}
					const out = new Uint8Array(end - start)
					for (let number = first; number < last; number++) {
						const plain = cache.get(number)
						const from = Math.max(start - number * CHUNK, 0)
						const to = Math.min(end - number * CHUNK, plain.length)
						out.set(plain.subarray(from, to), number * CHUNK + from - start)
					}
					while (cache.size > CACHED_CHUNKS) {
						cache.delete(cache.keys().next().value)
					}
					return out
				},
			}
		}

		/**
		 * A staging name in the vault's top folder, outside d/: Cryptomator passes it
		 * by, and its health checks (which look at d/) do not report one a browser
		 * left behind. Moving from there is still one rename on the server.
		 */
		stagingPath() {
			return STAGING_PREFIX + randomUuid() + '.tmp'
		}

		/**
		 * Removes the staging files and folders that writes which never finished (a
		 * browser closed midway) left in the vault's top folder, once they are older
		 * than olderThan (milliseconds; LEFTOVER_AGE), so that a write still going on
		 * elsewhere is left alone. Nothing for a vault that cannot be written. Returns
		 * the names removed.
		 */
		async removeLeftovers({ olderThan = LEFTOVER_AGE, now = Date.now() } = {}) {
			this.requireKeys()
			if (typeof this.storage.write !== 'function') {
				return []
			}
			const removed = []
			for (const item of await this.storage.list('')) {
				if (item.name.startsWith(STAGING_PREFIX) && item.name.endsWith('.tmp')
					&& item.mtime && now - item.mtime.getTime() >= olderThan) {
					await this.storage.remove(item.name)
					removed.push(item.name)
				}
			}
			return removed
		}

		/**
		 * Puts an entry of several files (name -> bytes) together in a staging folder,
		 * checks it (check(stagingFolder), if given) and moves it into
		 * place in one step; refused if the place is taken meanwhile. The staging
		 * folder goes on any failure.
		 */
		async stageAndMove(entry, files, check) {
			const staging = this.stagingPath()
			await this.storage.mkdir(staging)
			try {
				for (const [name, data] of Object.entries(files)) {
					await this.storage.write(joinPath(staging, name), data, { create: true })
				}
				if (check) {
					await check(staging)
				}
				await this.storage.move(staging, entry.path)
			} catch (error) {
				await this.storage.remove(staging).catch(() => {})
				throw error
			}
		}

		/** Reads a stored file back and compares it with what was written. */
		async checkStored(path, expected, onProgress) {
			const stored = await this.storage.read(path, onProgress)
			let plain
			try {
				plain = await this.decryptContents(stored)
			} catch (error) {
				throw new VaultError('corrupt', 'the stored file does not decrypt: ' + error.message)
			}
			if (!equalBytes(await sha256(plain), expected)) {
				throw new VaultError('corrupt', 'the stored file differs from the one written')
			}
		}

		/**
		 * Writes a file into a directory. options.replace allows replacing a file of
		 * that name (never a folder); onProgress(phase, done, total) with the phases
		 * 'encrypt', 'upload' and 'verify'. Returns {name, path, size}.
		 */
		async writeFile(dirId, rawName, data, options = {}) {
			this.requireWritable()
			const { replace = false, onProgress } = options
			const progress = (phase) => (done, total) => onProgress?.(phase, done, total)
			const name = checkName(rawName)
			const entry = await this.entryPath(dirId, name)
			const before = await this.existing(entry)
			if (before !== null && (before !== 'file' || !replace)) {
				throw new VaultError(before === 'file' ? 'exists' : 'exists-other', name)
			}
			const expected = await sha256(data)
			const ciphertext = await this.encryptContents(data, progress('encrypt'))
			if (!equalBytes(await sha256(await this.decryptContents(ciphertext)), expected)) {
				throw new VaultError('corrupt', 'the encryption does not read back')
			}
			const contentsPath = entry.long ? joinPath(entry.path, 'contents.c9r') : entry.path
			if (entry.long && before === null) {
				await this.stageAndMove(entry, { 'name.c9s': encoder.encode(entry.fullName), 'contents.c9r': ciphertext },
					(staging) => this.checkStored(joinPath(staging, 'contents.c9r'), expected, progress('verify')))
				return { name, path: contentsPath, size: data.length }
			}
			const staging = this.stagingPath()
			try {
				await this.storage.write(staging, ciphertext, { create: true, onProgress: progress('upload') })
				await this.checkStored(staging, expected, progress('verify'))
				await this.storage.move(staging, contentsPath, { overwrite: before !== null })
			} catch (error) {
				await this.storage.remove(staging).catch(() => {})
				throw error
			}
			return { name, path: contentsPath, size: data.length }
		}

		/** Creates a folder in a directory. Returns {name, dirId}. */
		async createDirectory(dirId, rawName) {
			this.requireWritable()
			const name = checkName(rawName)
			const entry = await this.entryPath(dirId, name)
			if (await this.existing(entry) !== null) {
				throw new VaultError('exists-other', name)
			}
			const newId = randomUuid()
			const own = await this.dirPath(newId)
			// The folder's own directory first, with its ID for recovery (dirid.c9r):
			// no entry ever points to a directory that is not there.
			await this.storage.mkdir(own.split('/').slice(0, 2).join('/'), { existsOk: true })
			await this.storage.mkdir(own)
			try {
				await this.storage.write(joinPath(own, 'dirid.c9r'), await this.encryptContents(encoder.encode(newId)), { create: true })
				const files = { 'dir.c9r': encoder.encode(newId) }
				if (entry.long) {
					files['name.c9s'] = encoder.encode(entry.fullName)
				}
				await this.stageAndMove(entry, files)
			} catch (error) {
				await this.storage.remove(own).catch(() => {})
				throw error
			}
			const listed = (await this.list(dirId)).find((item) => item.type === 'dir' && item.dirId === newId)
			if (!listed || listed.name !== name) {
				throw new VaultError('corrupt', 'the new folder does not read back')
			}
			return { name, dirId: newId }
		}

		/**
		 * The folder of this name in a directory: the one there (an upload of a folder
		 * merges into it), or a new one. Refused where a file or link has the name.
		 * Returns {name, dirId, created}.
		 */
		async ensureDirectory(dirId, rawName) {
			this.requireWritable()
			const found = await this.findEntry(dirId, rawName)
			if (found === null) {
				return { ...await this.createDirectory(dirId, rawName), created: true }
			}
			if (found.kind !== 'dir') {
				throw new VaultError('exists-other', found.name)
			}
			return { name: found.name, dirId: await this.entryDirId(found), created: false }
		}

		// ----- Renaming, moving, deleting -----
		//
		// A file's contents are not bound to its name or place, and a folder's entries
		// live under its ID, not its name: renaming or moving changes an entry alone.
		// Between two short names that is one move on the server. Where a long name
		// (.c9s) is involved, the new entry is put together under a staging name (the
		// contents copied on the server and checked), moved into place, and only then
		// is the old one removed: a crash leaves both, never neither. Deleting a folder
		// removes its entry first (all of it disappears at once), then the directories
		// of everything that was in it.

		/** An entry by name: {name, kind ('file', 'dir', 'link'), path, long, fullName, folder}, or null. */
		async findEntry(dirId, rawName) {
			const name = checkName(rawName)
			const entry = await this.entryPath(dirId, name)
			const kind = await this.existing(entry)
			if (kind === null) {
				return null
			}
			if (kind === 'unknown') {
				throw new VaultError('corrupt', 'the entry of ' + name + ' is neither file, folder nor link')
			}
			return { ...entry, name, kind }
		}

		async entryDirId(entry) {
			return decoder.decode(await this.storage.read(joinPath(entry.path, 'dir.c9r'))).trim()
		}

		/**
		 * Renames and/or moves an entry: from a directory to another (or the same)
		 * under a new (or the same) name. Refused where the new name is taken. A
		 * folder moved to another directory needs options.ancestors, the IDs of the
		 * target's directories from the vault's top ('' first): a folder cannot go into
		 * itself or below itself. Returns {name}.
		 */
		async moveEntry(fromDirId, rawName, toDirId, rawNewName, options = {}) {
			this.requireWritable()
			const source = await this.findEntry(fromDirId, rawName)
			if (source === null) {
				throw new VaultError('not-found', String(rawName))
			}
			const name = checkName(rawNewName ?? source.name)
			if (fromDirId === toDirId && name === source.name) {
				return { name }
			}
			if (source.kind === 'dir' && fromDirId !== toDirId) {
				const ancestors = options.ancestors
				if (!Array.isArray(ancestors) || ancestors[ancestors.length - 1] !== toDirId) {
					throw new VaultError('invalid-move', 'the target\'s ancestors are not known')
				}
				const own = await this.entryDirId(source)
				if (ancestors.includes(own)) {
					throw new VaultError('invalid-move', source.name)
				}
			}
			const target = await this.entryPath(toDirId, name)
			if (await this.existing(target) !== null) {
				throw new VaultError('exists-other', name)
			}
			if (!source.long && !target.long) {
				// A file, or the folder of a folder's or link's entry: one move.
				await this.storage.move(source.path, target.path)
				return { name }
			}
			await this.rebuildEntry(source, target)
			await this.storage.remove(source.path)
			return { name }
		}

		/**
		 * Puts an entry together anew at another place (for a change between short
		 * and long names): its files copied on the server into a staging name, a
		 * file's contents checked (they decrypt and authenticate), then moved into
		 * place in one step. The old entry stays.
		 */
		async rebuildEntry(source, target) {
			const staging = this.stagingPath()
			const marker = { file: 'contents.c9r', dir: 'dir.c9r', link: 'symlink.c9r' }[source.kind]
			const from = source.long || source.kind !== 'file' ? joinPath(source.path, marker) : source.path
			const stagedFile = target.long || source.kind !== 'file' ? joinPath(staging, marker) : staging
			try {
				if (stagedFile !== staging) {
					await this.storage.mkdir(staging)
				}
				await this.storage.copy(from, stagedFile)
				if (target.long) {
					await this.storage.write(joinPath(staging, 'name.c9s'), encoder.encode(target.fullName), { create: true })
				}
				if (source.kind !== 'dir') {
					await this.decryptContents(await this.storage.read(stagedFile))
				} else if (decoder.decode(await this.storage.read(stagedFile)).trim() !== await this.entryDirId(source)) {
					throw new VaultError('corrupt', 'the copied folder entry differs')
				}
				await this.storage.move(staging, target.path)
			} catch (error) {
				await this.storage.remove(staging).catch(() => {})
				throw error
			}
		}

		/** The IDs of a folder and of every folder below it. */
		async subtree(dirId) {
			const ids = [dirId]
			for (const entry of await this.list(dirId)) {
				if (entry.type === 'dir') {
					ids.push(...await this.subtree(entry.dirId))
				} else if (entry.type === 'broken' && entry.path.endsWith('.c9r')) {
					// An entry that does not decrypt may still be a folder: its directory goes too.
					const id = await this.storage.read(joinPath(entry.path, 'dir.c9r')).then((data) => decoder.decode(data).trim(), () => null)
					if (id !== null) {
						ids.push(...await this.subtree(id))
					}
				}
			}
			return ids
		}

		/**
		 * Deletes an entry: a file or link, or a folder with everything in it (its
		 * entry first, so that all of it disappears at once; then the directories of
		 * the folder and of every folder below it). Returns {name, folders}.
		 */
		async removeEntry(dirId, rawName) {
			this.requireWritable()
			const source = await this.findEntry(dirId, rawName)
			if (source === null) {
				throw new VaultError('not-found', String(rawName))
			}
			if (source.kind !== 'dir') {
				await this.storage.remove(source.path)
				return { name: source.name, folders: 0 }
			}
			const owned = await this.subtree(await this.entryDirId(source))
			await this.storage.remove(source.path)
			for (const id of owned) {
				await this.storage.remove(await this.dirPath(id))
			}
			return { name: source.name, folders: owned.length }
		}

		// ----- Health check -----
		//
		// cryptofs' checks (DirIdCheck, ShortenedNamesCheck, CiphertextFileTypeCheck),
		// their findings named as its kinds with its severities, and the repairs it
		// offers (repair): the vault's folder d/ walked as they walk it.

		/**
		 * The vault's findings, the worst first: {kind, severity ('CRITICAL', 'WARN' or
		 * 'INFO'), path (in the vault's folder), fixable, …}. onProgress(done, total)
		 * counts the directories looked into.
		 */
		async checkHealth(onProgress) {
			this.requireKeys()
			const findings = []
			const add = (kind, severity, path, extra = {}) => findings.push({ kind, severity, path, fixable: false, ...extra })
			const listed = async (path) => {
				try {
					return await this.storage.list(path)
				} catch (error) {
					if (error?.code === 'not-found') {
						return []
					}
					throw error
				}
			}
			// Every dir.c9r's directory ID (the root's is ''), and every d/XX/YYY with whether it holds dirid.c9r.
			const dirIds = new Map([['', null]])
			const contentDirs = new Map()
			const entryDirs = []
			for (const first of (await listed('d')).filter((item) => item.isDir)) {
				for (const second of (await listed('d/' + first.name)).filter((item) => item.isDir)) {
					const folder = joinPath('d', first.name, second.name)
					const inside = await listed(folder)
					contentDirs.set(folder, inside.some((item) => !item.isDir && item.name === 'dirid.c9r'))
					for (const item of inside) {
						if (item.isDir) {
							entryDirs.push(joinPath(folder, item.name))
						} else if (item.name === 'dir.c9r') {
							add('LooseDirFile', 'INFO', joinPath(folder, item.name), { fixable: true })
						}
					}
				}
			}
			let done = 0
			await inTurn(entryDirs, 8, async (path) => {
				const name = path.split('/').pop()
				const isC9r = name.endsWith('.c9r')
				const isC9s = name.endsWith('.c9s')
				const inside = await listed(path)
				const file = (wanted) => inside.find((item) => !item.isDir && item.name === wanted)
				const dirFile = file('dir.c9r')
				if (dirFile) {
					const at = joinPath(path, 'dir.c9r')
					if (!isC9r && !isC9s) {
						add('LooseDirFile', 'INFO', at, { fixable: true })
					} else if (dirFile.size > MAX_DIR_ID_LENGTH) {
						add('ObeseDirFile', 'CRITICAL', at)
					} else if (dirFile.size === 0) {
						add('EmptyDirFile', 'CRITICAL', at, { fixable: true })
					} else {
						const dirId = decoder.decode(await this.storage.read(at))
						if (dirIds.has(dirId)) {
							add('DirIdCollision', 'CRITICAL', at, { dirId, other: dirIds.get(dirId) })
						} else {
							dirIds.set(dirId, at)
						}
					}
				}
				if (isC9r || isC9s) {
					const types = [dirFile && 'DIRECTORY', file('symlink.c9r') && 'SYMLINK', isC9s && file('contents.c9r') && 'FILE'].filter(Boolean)
					if (types.length === 0) {
						// cryptofs deletes such a directory only if it is empty.
						add('UnknownType', 'CRITICAL', path, { fixable: inside.length === 0 })
					} else if (types.length > 1) {
						add('AmbiguousType', 'CRITICAL', path, { types })
					}
				}
				if (isC9s) {
					await this.checkShortened(path, file('name.c9s'), add)
				}
				onProgress?.(++done, entryDirs.length)
			})
			// Directory IDs and directories in pairs; what is left is missing or orphaned.
			for (const [dirId, dirFile] of dirIds) {
				const folder = await this.dirPath(dirId)
				if (contentDirs.has(folder)) {
					if (!contentDirs.get(folder)) {
						add('MissingDirIdBackup', 'INFO', folder, { dirId, fixable: true })
					}
					contentDirs.delete(folder)
				} else {
					add('MissingContentDir', 'WARN', dirFile ?? folder, { dirId, fixable: true })
				}
			}
			for (const folder of contentDirs.keys()) {
				add('OrphanContentDir', 'WARN', folder, { fixable: true })
			}
			const rank = { CRITICAL: 0, WARN: 1, INFO: 2 }
			return findings.sort((a, b) => rank[a.severity] - rank[b.severity] || a.kind.localeCompare(b.kind) || a.path.localeCompare(b.path))
		}

		/** cryptofs' ShortenedNamesCheck for one .c9s directory. */
		async checkShortened(path, nameFile, add) {
			const at = joinPath(path, 'name.c9s')
			if (!nameFile) {
				add('MissingLongName', 'CRITICAL', path)
				return
			}
			if (nameFile.size > MAX_NAME_FILE_SIZE) {
				add('ObeseNameFile', 'CRITICAL', at)
				return
			}
			const longName = decoder.decode(await this.storage.read(at))
			const end = longName.indexOf('.c9r')
			if (end === -1 || !/^[A-Za-z0-9_-]*={0,2}$/.test(longName.slice(0, end)) || longName.slice(0, end).length % 4 !== 0) {
				add('NotDecodableLongName', 'CRITICAL', at)
				return
			}
			if (longName.length > end + 4) {
				add('TrailingBytesInNameFile', 'WARN', at, { longName, fixable: true })
				return
			}
			const expected = base64UrlEncode(new Uint8Array(await subtle.digest('SHA-1', encoder.encode(longName))), true) + '.c9s'
			if (path.split('/').pop() !== expected) {
				add('LongShortNamesMismatch', 'WARN', path, { expected, fixable: true })
			}
		}

		/** Applies the repair cryptofs offers for a finding of checkHealth. */
		async repair(finding) {
			this.requireWritable()
			const parent = (path) => path.split('/').slice(0, -1).join('/')
			switch (finding.kind) {
			case 'LooseDirFile':
				await this.storage.remove(finding.path)
				return
			case 'EmptyDirFile': {
				// The empty dir.c9r and its directory, if nothing else is in it (as cryptofs: Files.delete).
				await this.storage.remove(finding.path)
				if ((await this.storage.list(parent(finding.path))).length === 0) {
					await this.storage.remove(parent(finding.path))
				}
				return
			}
			case 'MissingContentDir':
			case 'MissingDirIdBackup': {
				const folder = await this.dirPath(finding.dirId)
				await this.storage.mkdir(parent(folder), { existsOk: true })
				await this.storage.mkdir(folder, { existsOk: true })
				await this.storage.write(joinPath(folder, 'dirid.c9r'), await this.encryptContents(encoder.encode(finding.dirId)), { create: true })
				return
			}
			case 'LongShortNamesMismatch':
				await this.storage.move(finding.path, joinPath(parent(finding.path), finding.expected))
				return
			case 'TrailingBytesInNameFile':
				await this.storage.write(finding.path, encoder.encode(finding.longName.slice(0, finding.longName.indexOf('.c9r') + 4)))
				return
			case 'UnknownType':
				await this.storage.remove(finding.path)
				return
			case 'OrphanContentDir':
				await this.adoptOrphan(finding.path)
				return
			default:
				throw new VaultError('not-repairable', finding.kind)
			}
		}

		/**
		 * The entries of a directory no folder points to, rescued as cryptofs rescues
		 * them (OrphanContentDir): into /LOST+FOUND/<the directory's d/ path, XX and
		 * YYY joined>/, by their names where the directory's ID backup decrypts them,
		 * else as file1_…, directory1_…, symlink1_…; anything else in it moved along.
		 */
		async adoptOrphan(orphan) {
			const rootFolder = await this.dirPath('')
			const recoveryEntry = joinPath(rootFolder, await this.encryptedName(RECOVERY_DIR_NAME, ''))
			const recoveryDirFile = joinPath(recoveryEntry, 'dir.c9r')
			if (await this.storage.stat(recoveryDirFile)) {
				if (decoder.decode(await this.storage.read(recoveryDirFile)) !== RECOVERY_DIR_ID) {
					throw new VaultError('exists-other', '/' + RECOVERY_DIR_NAME)
				}
			} else {
				await this.storage.mkdir(recoveryEntry, { existsOk: true })
				await this.storage.write(recoveryDirFile, encoder.encode(RECOVERY_DIR_ID), { create: true })
			}
			const recoveryFolder = await this.ensureContentDir(RECOVERY_DIR_ID)
			if (recoveryFolder === orphan) {
				// The recovery folder was the orphan: recovered by giving it its entry.
				return
			}
			// The step parent: a folder named after the orphan's place in d/.
			const stepParentEntry = joinPath(recoveryFolder, await this.encryptedName(orphan.split('/').slice(1).join(''), RECOVERY_DIR_ID))
			const stepParentDirFile = joinPath(stepParentEntry, 'dir.c9r')
			let stepParentId
			if (await this.storage.stat(stepParentDirFile)) {
				stepParentId = decoder.decode(await this.storage.read(stepParentDirFile))
			} else {
				stepParentId = randomUuid()
				await this.storage.mkdir(stepParentEntry, { existsOk: true })
				await this.storage.write(stepParentDirFile, encoder.encode(stepParentId), { create: true })
			}
			const stepParent = await this.ensureContentDir(stepParentId)
			let orphanId = null
			try {
				orphanId = decoder.decode(await this.decryptContents(await this.storage.read(joinPath(orphan, 'dirid.c9r'))))
			} catch {
				// No backup, or one that does not decrypt: the entries get made-up names.
			}
			const run = Math.floor(Math.random() * 0x10000).toString(32)
			const counters = { file: 0, directory: 0, symlink: 0 }
			const longSuffix = '_withVeryLongName'.repeat(((((SHORTENING_THRESHOLD - 4) / 4 | 0) * 3 - 16) % '_withVeryLongName'.length) + 1)
			const contents = await this.storage.list(orphan)
			for (const item of contents) {
				if (item.name.length < MIN_CIPHER_NAME_LENGTH || !(item.name.endsWith('.c9r') || item.name.endsWith('.c9s'))) {
					continue
				}
				const shortened = item.name.endsWith('.c9s')
				const path = joinPath(orphan, item.name)
				let name = null
				if (orphanId !== null) {
					try {
						const stored = shortened ? decoder.decode(await this.storage.read(joinPath(path, 'name.c9s'))) : item.name
						name = await this.decryptName(stored, orphanId)
					} catch {
						// Made up below.
					}
				}
				if (name === null) {
					const inside = item.isDir ? await this.storage.list(path) : []
					const kind = inside.some((child) => child.name === 'dir.c9r') ? 'directory' : inside.some((child) => child.name === 'symlink.c9r') ? 'symlink' : 'file'
					name = kind + (++counters[kind]) + '_' + run + (shortened ? longSuffix : '')
				}
				const cipherName = await this.encryptedName(name, stepParentId)
				if (shortened) {
					const short = base64UrlEncode(new Uint8Array(await subtle.digest('SHA-1', encoder.encode(cipherName))), true) + '.c9s'
					await this.storage.move(path, joinPath(stepParent, short))
					await this.storage.write(joinPath(stepParent, short, 'name.c9s'), encoder.encode(cipherName))
				} else {
					await this.storage.move(path, joinPath(stepParent, cipherName))
				}
			}
			await this.storage.remove(joinPath(orphan, 'dirid.c9r'))
			for (const item of await this.storage.list(orphan)) {
				await this.storage.move(joinPath(orphan, item.name), joinPath(stepParent, item.name))
			}
			await this.storage.remove(orphan)
		}

		/** An entry's encrypted name (.c9r) in a directory, not shortened. */
		async encryptedName(name, dirId) {
			return base64UrlEncode(await this.siv.encrypt(encoder.encode(name), [encoder.encode(dirId)]), true) + '.c9r'
		}

		/** A directory's folder in d/, made with its ID's backup where missing. */
		async ensureContentDir(dirId) {
			const folder = await this.dirPath(dirId)
			await this.storage.mkdir(folder.split('/').slice(0, 2).join('/'), { existsOk: true })
			await this.storage.mkdir(folder, { existsOk: true })
			if (!(await this.storage.stat(joinPath(folder, 'dirid.c9r')))) {
				await this.storage.write(joinPath(folder, 'dirid.c9r'), await this.encryptContents(encoder.encode(dirId)), { create: true })
			}
			return folder
		}
	}

	return { Vault, VaultError, cleartextSize, checkName, scrypt, Siv, Cmac, base32Encode, base64UrlEncode, base64Decode, encodeRecoveryKey, decodeRecoveryKey, VAULT_CONFIG, STAGING_PREFIX }
})
