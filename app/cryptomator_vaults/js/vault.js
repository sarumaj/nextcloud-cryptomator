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
			if (header.alg !== 'HS256') {
				throw new VaultError('unsupported-format', 'signature ' + header.alg)
			}
			const kid = String(header.kid || '')
			if (!kid.startsWith('masterkeyfile:')) {
				// Cryptomator Hub's vaults keep their key on the Hub, not in a file.
				throw new VaultError('unsupported-key', kid)
			}
			const name = kid.slice('masterkeyfile:'.length)
			if (!/^[^/\\]+$/.test(name)) {
				throw new VaultError('unsupported-key', kid)
			}
			const masterkeyFile = JSON.parse(decoder.decode(await storage.read(name)))
			return new Vault(storage, config, masterkeyFile)
		}

		get scheme() {
			return this.config.payload.cipherCombo
		}

		get unlocked() {
			return this.keys !== null
		}

		/** Derives the keys from the password; a VaultError 'wrong-password' if it is not the vault's. */
		async unlock(password) {
			const file = this.masterkeyFile
			const kek = await scrypt(encoder.encode(String(password).normalize('NFC')), base64Decode(file.scryptSalt),
				file.scryptCostParam, file.scryptBlockSize, 1, 32)
			const wrapping = await subtle.importKey('raw', kek, 'AES-KW', false, ['unwrapKey'])
			kek.fill(0)
			let encRaw
			let macRaw
			try {
				const unwrap = async (wrapped) => new Uint8Array(await subtle.exportKey('raw',
					await subtle.unwrapKey('raw', base64Decode(wrapped), wrapping, 'AES-KW', { name: 'HMAC', hash: 'SHA-256' }, true, ['sign'])))
				encRaw = await unwrap(file.primaryMasterKey)
				macRaw = await unwrap(file.hmacMasterKey)
			} catch (error) {
				throw new VaultError('wrong-password')
			}
			try {
				// The configuration is signed with both keys: a vault.cryptomator that
				// does not belong to this key file is refused.
				const jwtKey = await subtle.importKey('raw', concat(encRaw, macRaw), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])
				if (!(await subtle.verify('HMAC', jwtKey, this.config.signature, encoder.encode(this.config.signed)))) {
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
			} finally {
				encRaw.fill(0)
				macRaw.fill(0)
			}
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
				await onPiece(concat(...pieces))
				onProgress?.(Math.min(last * CHUNK, size), size)
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
	}

	return { Vault, VaultError, cleartextSize, checkName, scrypt, Siv, Cmac, base32Encode, base64UrlEncode, base64Decode, VAULT_CONFIG, STAGING_PREFIX }
})
