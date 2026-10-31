// SPDX-License-Identifier: AGPL-3.0-or-later
//
// npm run build: src/files.js (the Files integration) into the ES module the app
// loads in the Files app, js/cryptomator_vaults-files.mjs (the file picker in a
// chunk beside it, loaded when it is opened), and the styles of the
// libraries it uses (the file picker) into css/cryptomator_vaults-files.css. The
// output is committed: the server installs the app from the repository, without a
// build of its own.
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const vaultJs = fileURLToPath(new URL('./app/cryptomator_vaults/js/vault.js', import.meta.url))
const DIALOGS = /node_modules\/@nextcloud\/dialogs\//

/**
 * Whether a module is reached only through @nextcloud/dialogs (statically, or by
 * the integration's dynamic import of it): then it can wait in the lazy chunk.
 */
function onlyThroughDialogs(id, getModuleInfo, seen = new Map()) {
	if (DIALOGS.test(id)) {
		return true
	}
	if (seen.has(id)) {
		return seen.get(id)
	}
	seen.set(id, true)
	const info = getModuleInfo(id)
	const importers = info?.importers ?? []
	const result = info !== null && !info.isEntry && importers.length > 0
		&& importers.every((importer) => onlyThroughDialogs(importer, getModuleInfo, seen))
	seen.set(id, result)
	return result
}

export default defineConfig({
	define: { 'process.env.NODE_ENV': JSON.stringify('production') },
	build: {
		outDir: 'app/cryptomator_vaults',
		emptyOutDir: false,
		minify: true,
		sourcemap: false,
		target: 'es2022',
		cssCodeSplit: false,
		// js/vault.js is also a plain script for Node's tests (CommonJS there).
		commonjsOptions: { include: [/node_modules/, vaultJs] },
		lib: {
			entry: 'src/files.js',
			formats: ['es'],
			fileName: () => 'js/cryptomator_vaults-files.mjs',
			cssFileName: 'css/cryptomator_vaults-files',
		},
		rollupOptions: {
			output: {
				// What only @nextcloud/dialogs needs (toasts, the file picker: Vue and its
				// components) in a chunk loaded when first needed; the libraries the
				// integration uses at once in another. Fixed names, no hashes.
				chunkFileNames: 'js/cryptomator_vaults-[name].mjs',
				manualChunks(id, { getModuleInfo }) {
					if (!id.includes('node_modules')) {
						return undefined
					}
					return onlyThroughDialogs(id, getModuleInfo) ? 'dialogs' : 'common'
				},
			},
		},
	},
})
