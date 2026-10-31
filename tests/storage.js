// SPDX-License-Identifier: AGPL-3.0-or-later
//
// A vault's folder in the file system as the storage js/vault.js reads and
// writes, with the same answers as the WebDAV storage of the browser
// (src/storage.js): 'not-found', 'exists'.

'use strict'

const fs = require('node:fs')
const path = require('node:path')
const { VaultError } = require('../app/cryptomator_vaults/js/vault.js')

function folderStorage(root, { writable = false } = {}) {
	const at = (relative) => path.join(root, relative)
	const storage = {
		async read(relative) {
			try {
				return new Uint8Array(await fs.promises.readFile(at(relative)))
			} catch (error) {
				if (error.code === 'ENOENT' || error.code === 'EISDIR') {
					throw new VaultError('not-found', relative)
				}
				throw error
			}
		},
		async list(relative) {
			const entries = await fs.promises.readdir(at(relative), { withFileTypes: true })
			return Promise.all(entries.map(async (entry) => {
				const stat = await fs.promises.stat(path.join(at(relative), entry.name))
				return { name: entry.name, isDir: entry.isDirectory(), size: entry.isDirectory() ? 0 : stat.size, mtime: stat.mtime }
			}))
		},
	}
	if (!writable) {
		return storage
	}
	return Object.assign(storage, {
		async stat(relative) {
			try {
				const stat = await fs.promises.stat(at(relative))
				return { isDir: stat.isDirectory(), size: stat.size }
			} catch (error) {
				if (error.code === 'ENOENT') {
					return null
				}
				throw error
			}
		},
		// Written to a temporary file and renamed, as Nextcloud does with a PUT.
		async write(relative, data, { create = false } = {}) {
			if (create && fs.existsSync(at(relative))) {
				throw new VaultError('exists', relative)
			}
			const temporary = at(relative) + '.part'
			await fs.promises.writeFile(temporary, data)
			await fs.promises.rename(temporary, at(relative))
		},
		async mkdir(relative, { existsOk = false } = {}) {
			try {
				await fs.promises.mkdir(at(relative))
			} catch (error) {
				if (error.code === 'EEXIST') {
					if (existsOk) {
						return
					}
					throw new VaultError('exists', relative)
				}
				throw error
			}
		},
		async move(from, to, { overwrite = false } = {}) {
			if (!overwrite && fs.existsSync(at(to))) {
				throw new VaultError('exists', to)
			}
			await fs.promises.rename(at(from), at(to))
		},
		async remove(relative) {
			await fs.promises.rm(at(relative), { recursive: true, force: true })
		},
	})
}

module.exports = { folderStorage }
