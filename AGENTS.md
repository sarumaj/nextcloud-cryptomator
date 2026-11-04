# Vaults for Cryptomator

The Nextcloud app `cryptomator_vaults`: Cryptomator vaults stored in Nextcloud, browsed and
changed in the Files app; everything is decrypted and encrypted in the browser. The server part
(PHP) only serves the scripts. Not affiliated with Skymatic GmbH.

## Layout

- `app/cryptomator_vaults/`: the app as servers install it (from the repository, no build there).
  - `appinfo/info.xml`, `lib/` (PHP: the app, a redirect, two listeners), `l10n/`, `css/`.
  - `js/vault.js`: the vault format (hand-written); `js/cryptomator_vaults-*.mjs` and
    `css/cryptomator_vaults-files.css`: the build of `src/`, committed, never edited by hand.
- `src/`: the Files integration, built by Vite (`vite.config.mjs`) into the app's `js/`.
- `tests/`: Node tests (no Nextcloud, no network), `tests/fixtures/` (vaults written by
  Cryptomator's library, and the Java generator), `tests/compat.sh` (Cryptomator's library reads
  what the app writes), `tests/e2e/` (Playwright against a Nextcloud), `tests/stubs/` (Psalm).
- `docs/developer.md`: what the tests cover, releasing. `screenshots/`: the README's and the app
  store's pictures.
- `composer.json`: development tools only (php-cs-fixer, Psalm); the app needs none.

## Checks

Run what CI runs for what you changed, and look at each exit code:

```bash
npm ci && npm run build && git status --porcelain app/   # the build must be committed
npm test                                                 # Node tests and translations
npm run notice && git diff --exit-code NOTICE.md         # third-party notice
npm run test:compat                                      # Java 25 and Maven, or Docker
composer install && composer cs:check && composer psalm  # composer:2 in Docker if missing
npx --yes markdownlint-cli2 "*.md" "docs/**/*.md"
```

`appinfo/info.xml` is checked against `https://apps.nextcloud.com/schema/apps/info.xsd` with
`xmllint --noout --schema`.

## Conventions

- Commit messages: one line, no trailers. A change comes with its README or `docs/` text and an
  entry under `## Unreleased` in `CHANGELOG.md` (Keep a Changelog: `### Added`, `### Changed`,
  `### Fixed`).
- Markdown: lines of at most 100 characters (tables excepted), tables aligned.
- PHP, JavaScript and CSS indented with tabs (`.editorconfig`); PHP formatted by `composer cs:fix`.
  A reformatting is a commit of its own.
- Settings save as they change, as Nextcloud's own do (its declarative forms, or a page of our
  own doing the same): no Save button; what happened is shown (saved, or why not, at the field),
  never silently. The README and `docs/` name where the settings are, by Nextcloud's menu names.
- Every source file starts with `SPDX-License-Identifier: AGPL-3.0-or-later`.
- The privacy promise: nothing decrypted (names, contents, file types) and no password reaches
  the server, except what an export is asked to write. `tests/e2e/check.mjs` checks the requests.
- A write keeps the vault readable by Cryptomator at every step (stage, read back, compare, move
  into place); `tests/compat.sh` must pass.

## Releasing

1. Move the `## Unreleased` entries under `## X.Y.Z - YYYY-MM-DD` and set `<version>` in
   `appinfo/info.xml` to `X.Y.Z`.
2. Commit as `release X.Y.Z`.
3. Tag it, annotated and signed as the earlier tags:
   `git tag -s vX.Y.Z -m "Vaults for Cryptomator X.Y.Z"`, and push the tag.
   `.forgejo/workflows/release.yml` builds, signs and publishes the release.

## Screenshots

`screenshots/1-…png` to `4-…png` are the English shots of the homelab's guide
(`docs/assets/screenshots/vaults-*.png` in `dawid/HomeLab`), recorded against a demo Nextcloud
with demo people and data only, scaled down to 1600 pixels wide
(`vips thumbnail in.png out.png[compression=9,strip] 1600`). `appinfo/info.xml` links them by
their raw URLs on `main`. Never show real accounts, addresses or host names.
