// SPDX-License-Identifier: AGPL-3.0-or-later
//
// node --test tests/inbox.test.mjs: the inbox contract's logic (src/inbox.mjs,
// docs/inbox.md): markers read and refused, where an inbox's files go in the
// vault, which files wait because they may still be written, and the names of
// files kept beside one of the same name.

import test from 'node:test'
import assert from 'node:assert/strict'
import { MARKER_NAME, SETTLE_MS, clashName, isSettled, makeMarker, normalizePath, parseMarker, planInbox, within } from '../src/inbox.mjs'

test('paths are normalized; . and .. are no paths', () => {
	assert.equal(normalizePath('Vaults//Family papers/'), '/Vaults/Family papers')
	assert.equal(normalizePath('/'), '/')
	assert.equal(normalizePath(''), '/')
	assert.equal(normalizePath('/Café'), '/Café')
	assert.equal(normalizePath('/a/../b'), null)
	assert.equal(normalizePath('/a/./b'), null)
	assert.equal(normalizePath(42), null)
	assert.ok(within('/a/b', '/a'))
	assert.ok(within('/a', '/a'))
	assert.ok(!within('/ab', '/a'))
	assert.ok(within('/x', '/'))
})

test('a marker names the vault, the folder in it and who fills it; unknown keys are ignored', () => {
	const text = JSON.stringify({ version: 1, vault: '/Vaults/Family papers', target: '/Magazines/', from: ' Harvester job "Mag" ', job: 7 })
	assert.deepEqual(parseMarker(text, '/Inboxes/Mag'), {
		inbox: { folder: '/Inboxes/Mag', vault: '/Vaults/Family papers', target: '/Magazines', from: 'Harvester job "Mag"' },
	})
	// target and from may be left out: the vault's top, no name.
	assert.deepEqual(parseMarker('{"version": 1, "vault": "Vault"}', '/In').inbox, { folder: '/In', vault: '/Vault', target: '/', from: '' })
})

test('what is no marker of this contract is refused', () => {
	for (const text of ['', 'not json', '[]', 'null', '{"vault": "/V"}', '{"version": 0, "vault": "/V"}', '{"version": "1", "vault": "/V"}',
		'{"version": 1}', '{"version": 1, "vault": "/V", "target": "/../x"}', '{"version": 1, "vault": "/V", "from": 3}', '{"version": 1.5, "vault": "/V"}']) {
		assert.equal(parseMarker(text, '/In').problem, 'invalid', text)
	}
})

test('a later version is left alone, telling its vault', () => {
	assert.deepEqual(parseMarker('{"version": 2, "vault": "/V/", "whatever": true}', '/In'), { problem: 'version', version: 2, vault: '/V', folder: '/In' })
})

test('an inbox cannot be its vault\'s folder, inside it or around it', () => {
	for (const [folder, vault] of [['/V', '/V'], ['/V/in', '/V'], ['/A', '/A/V'], ['/', '/V'], ['/In', '/']]) {
		assert.equal(parseMarker(JSON.stringify({ version: 1, vault }), folder).problem, 'loop', folder + ' ' + vault)
	}
	assert.ok(parseMarker(JSON.stringify({ version: 1, vault: '/V' }), '/V inbox').inbox)
})

test('a marker made here reads back', () => {
	const text = makeMarker({ vault: '/Vaults/Family papers', target: '/Magazines', from: 'Harvester' })
	assert.deepEqual(JSON.parse(text), { version: 1, vault: '/Vaults/Family papers', target: '/Magazines', from: 'Harvester' })
	assert.deepEqual(parseMarker(text, '/In').inbox, { folder: '/In', vault: '/Vaults/Family papers', target: '/Magazines', from: 'Harvester' })
	assert.deepEqual(JSON.parse(makeMarker({ vault: '/V', target: '/', from: '' })), { version: 1, vault: '/V', target: '/' })
})

test('a file waits while it was changed or uploaded in the last two minutes', () => {
	const now = Date.parse('2026-11-04T12:00:00Z')
	const ago = (ms) => new Date(now - ms)
	assert.ok(isSettled({ mtime: ago(SETTLE_MS) }, now))
	assert.ok(!isSettled({ mtime: ago(SETTLE_MS - 1) }, now))
	// An old mtime (set by the uploader) does not count when the upload was just now.
	assert.ok(!isSettled({ mtime: ago(365 * 24 * 3600 * 1000), uploadTime: ago(30 * 1000) }, now))
	assert.ok(isSettled({ mtime: ago(365 * 24 * 3600 * 1000), uploadTime: ago(SETTLE_MS + 1) }, now))
	assert.ok(!isSettled({}, now), 'no time: waits')
	assert.ok(!isSettled({ mtime: new Date('nonsense') }, now))
})

test('a name taken in the vault: the next one, as Nextcloud names them', () => {
	assert.equal(clashName('Report.pdf', 1), 'Report.pdf')
	assert.equal(clashName('Report.pdf', 2), 'Report (2).pdf')
	assert.equal(clashName('archive.tar.gz', 3), 'archive.tar (3).gz')
	assert.equal(clashName('README', 2), 'README (2)')
	assert.equal(clashName('.hidden', 2), '.hidden (2)')
})

test('an inbox\'s files go to target/<their path in the inbox>; the marker, recent files and inner inboxes or vaults stay', async () => {
	const now = Date.parse('2026-11-04T12:00:00Z')
	const old = new Date(now - 3600 * 1000)
	const fresh = new Date(now - 10 * 1000)
	const file = (name, size, mtime = old) => ({ name, isDir: false, size, mtime, etag: '"' + name + '"', permissions: 'RGDNVW' })
	const dir = (name) => ({ name, isDir: true, size: 0, mtime: old, etag: '"d"', permissions: 'RGDNVCK' })
	const tree = {
		'Inboxes/Mag': [file(MARKER_NAME, 80), file('Issue 1.pdf', 1000), file('partial.pdf', 5, fresh), dir('2026'), dir('Other inbox'), dir('Copied vault')],
		'Inboxes/Mag/2026': [dir('11'), file('Index.txt', 3)],
		'Inboxes/Mag/2026/11': [file('Issue 2.pdf', 2000)],
		'Inboxes/Mag/Other inbox': [file(MARKER_NAME, 80), file('theirs.pdf', 9)],
		'Inboxes/Mag/Copied vault': [file('vault.cryptomator', 9), dir('d')],
	}
	const listed = []
	const list = async (folder) => {
		listed.push(folder)
		return tree[folder]
	}
	const plan = await planInbox({ folder: '/Inboxes/Mag', vault: '/V', target: '/Magazines/Weekly', from: '' }, list, now)
	assert.deepEqual(plan.ready.map(({ path, dirs, name, size, etag }) => ({ path, dirs, name, size, etag })), [
		{ path: 'Inboxes/Mag/Issue 1.pdf', dirs: ['Magazines', 'Weekly'], name: 'Issue 1.pdf', size: 1000, etag: '"Issue 1.pdf"' },
		{ path: 'Inboxes/Mag/2026/11/Issue 2.pdf', dirs: ['Magazines', 'Weekly', '2026', '11'], name: 'Issue 2.pdf', size: 2000, etag: '"Issue 2.pdf"' },
		{ path: 'Inboxes/Mag/2026/Index.txt', dirs: ['Magazines', 'Weekly', '2026'], name: 'Index.txt', size: 3, etag: '"Index.txt"' },
	])
	assert.deepEqual(plan.recent, [{ path: 'Inboxes/Mag/partial.pdf', name: 'partial.pdf' }])
	assert.deepEqual(plan.skipped, [['Other inbox'], ['Copied vault']])
	assert.deepEqual(plan.folders, [['2026', '11'], ['2026']], 'deepest first, without those left alone')
	assert.ok(!listed.includes('Inboxes/Mag/Copied vault/d'), 'a vault inside is not walked')
	// The vault's top as the target.
	const top = await planInbox({ folder: '/Inboxes/Mag', vault: '/V', target: '/', from: '' }, list, now)
	assert.deepEqual(top.ready[0].dirs, [])
})
