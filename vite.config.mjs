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
// The office previews' libraries (src/documents.js), loaded when a document is opened.
const DOCUMENTS = /node_modules\/(docx-preview|xlsx)\//
// JSZip and what it needs: every preview of a zipped format (and ZIP itself) uses it.
const ZIP = /node_modules\/(jszip|pako|lie|immediate|setimmediate|readable-stream|core-util-is|inherits|isarray|process-nextick-args|safe-buffer|string_decoder|util-deprecate)\//

/** Whether the entry imports a module statically (directly or through others): it is needed at once. */
function fromEntry(id, getModuleInfo, seen = new Map()) {
	if (seen.has(id)) {
		return seen.get(id)
	}
	seen.set(id, false)
	const info = getModuleInfo(id)
	const result = info !== null && (info.isEntry || info.importers.some((importer) => fromEntry(importer, getModuleInfo, seen)))
	seen.set(id, result)
	return result
}

/**
 * Whether a module is reached only through modules matching pattern (statically,
 * or by the integration's dynamic import of them): then it can wait in a lazy chunk.
 */
function onlyThrough(pattern, id, getModuleInfo, seen = new Map()) {
	if (pattern.test(id)) {
		return true
	}
	if (seen.has(id)) {
		return seen.get(id)
	}
	seen.set(id, true)
	const info = getModuleInfo(id)
	const importers = info?.importers ?? []
	const result = info !== null && !info.isEntry && importers.length > 0
		&& importers.every((importer) => onlyThrough(pattern, importer, getModuleInfo, seen))
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
				// components) and what only the office previews need, each in a chunk
				// loaded when first needed; the libraries the integration uses at once in
				// another. Fixed names, no hashes.
				chunkFileNames: 'js/cryptomator_vaults-[name].mjs',
				manualChunks(id, { getModuleInfo }) {
					if (!id.includes('node_modules')) {
						return undefined
					}
					if (onlyThrough(DOCUMENTS, id, getModuleInfo)) {
						return 'office-libraries'
					}
					if (ZIP.test(id) && !fromEntry(id, getModuleInfo)) {
						return 'zip'
					}
					if (onlyThrough(DIALOGS, id, getModuleInfo)) {
						return 'dialogs'
					}
					// What the entry needs at once in one chunk; the rest (the previews'
					// libraries) in chunks loaded with what imports them.
					return fromEntry(id, getModuleInfo) ? 'common' : undefined
				},
			},
		},
	},
})
