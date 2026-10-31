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

// Characters that show as nothing: control characters (but tab and line ends)
// and Unicode's invisible ones (spaces that do not break, joiners, direction
// marks and overrides, the byte order mark). Libraries write them as escapes,
// esbuild's minifier writes them as they are (JSZip's "PK\x03\x04"), which
// Forgejo and editors flag as hidden text.
const INVISIBLE = /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f\xa0\xad\u061c\u200b-\u200f\u2028-\u202e\u2060-\u2069\ufeff]/g

/**
 * The node without where it stands and how its literals were spelled: what the
 * code means. A tagged template's raw text stays, since the tag function sees it.
 */
function meaning(node) {
	const spelling = (item, tagged = false) => {
		if (Array.isArray(item)) {
			item.forEach((child) => spelling(child))
		} else if (item && typeof item === 'object') {
			if (item.type === 'TemplateLiteral' && !tagged) {
				item.quasis.forEach((quasi) => delete quasi.value.raw)
			}
			for (const [key, child] of Object.entries(item)) {
				spelling(child, item.type === 'TaggedTemplateExpression' && key === 'quasi')
			}
		}
	}
	spelling(node)
	return JSON.stringify(node, function (key, value) {
		if (key === 'start' || key === 'end' || (key === 'raw' && this.type === 'Literal')) {
			return undefined
		}
		return typeof value === 'bigint' ? value.toString() + 'n' : value
	})
}

/**
 * Writes the invisible characters of the output as escapes. A minified chunk has
 * them only in strings, template literals and regular expressions, where an
 * escape means the same; the chunk is parsed before and after to be sure.
 */
function escapeInvisible() {
	return {
		name: 'escape-invisible',
		generateBundle(options, bundle) {
			for (const chunk of Object.values(bundle)) {
				if (chunk.type !== 'chunk' || chunk.code.search(INVISIBLE) === -1) {
					continue
				}
				const code = chunk.code.replace(INVISIBLE, (character) => '\\u' + character.charCodeAt(0).toString(16).padStart(4, '0'))
				if (meaning(this.parse(code)) !== meaning(this.parse(chunk.code))) {
					this.error(`${chunk.fileName}: escaping its invisible characters would change the code`)
				}
				chunk.code = code
			}
		},
	}
}

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
	plugins: [escapeInvisible()],
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
