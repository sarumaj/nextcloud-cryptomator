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
 * Read only: nothing here writes to a vault.
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
		 * (in the storage), mtime (the storage's, if known)}. An entry that does not
		 * decrypt is listed as type 'broken'.
		 */
		async list(dirId) {
			const folder = await this.dirPath(dirId)
			const entries = await this.storage.list(folder)
			const results = await Promise.all(entries.map((entry) => this.describe(folder, entry, dirId)))
			// Folders first, then by name.
			return results.filter((entry) => entry !== null)
				.sort((a, b) => (b.type === 'dir') - (a.type === 'dir') || a.name.localeCompare(b.name))
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
				// dirid.c9r holds the directory's own ID (for recovery, not an entry);
				// anything without .c9r is not Cryptomator's.
				if (entry.name === 'dirid.c9r' || !entry.name.endsWith('.c9r')) {
					return null
				}
				const name = await this.decryptName(entry.name, dirId)
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
	}

	return { Vault, VaultError, cleartextSize, scrypt, Siv, Cmac, base32Encode, base64UrlEncode, base64Decode, VAULT_CONFIG }
})
