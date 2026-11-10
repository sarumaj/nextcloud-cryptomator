# Vaults for Cryptomator

The Nextcloud app `cryptomator_vaults`: Cryptomator vaults stored in Nextcloud, browsed and
changed in the Files app; everything is decrypted and encrypted in the browser. The server part
(PHP) only serves the scripts. Not affiliated with Skymatic GmbH.

## Layout

- `app/cryptomator_vaults/`: the app as servers install it (from the repository, no build there).
  - `appinfo/info.xml`, `lib/` (PHP: the app, a redirect, two listeners), `l10n/`, `css/`.
  - `js/vault.js`: the vault format (hand-written); `js/stream-worker.js`: the service worker
    that streams videos, audio, PDFs and downloads (hand-written); `js/cryptomator_vaults-*.mjs` and
    `css/cryptomator_vaults-files.css`: the build of `src/`, committed, never edited by hand.
- `src/`: the Files integration, built by Vite (`vite.config.mjs`) into the app's `js/`.
- `tests/`: Node tests (no Nextcloud, no network), `tests/fixtures/` (vaults written by
  Cryptomator's library, and the Java generator), `tests/compat.sh` (Cryptomator's library reads
  what the app writes), `tests/php/` (PHPUnit, against Nextcloud's public API, no Nextcloud),
  `tests/server/check.sh` (what people get, on a real Nextcloud), `tests/e2e/` (Playwright
  against a Nextcloud), `tests/stubs/` (Psalm, and the server's parts PHPUnit needs).
- `docs/developer.md`: what the tests cover, releasing. `screenshots/`: the README's and the app
  store's pictures.
- `composer.json`: development tools only (PHPUnit, php-cs-fixer, Psalm); the app needs none.
  The tools need PHP 8.4 (`config.platform.php`, for PHPUnit 13); the app runs on PHP 8.2.

## Checks

Run what CI runs for what you changed, and look at each exit code:

```bash
npm ci && npm run build && git status --porcelain app/   # the build must be committed
npm test                                                 # Node tests and translations
npm run notice && git diff --exit-code NOTICE.md         # third-party notice
npm run test:compat                                      # Java 25 and Maven, or Docker
composer install && composer cs:check && composer psalm  # composer:2 in Docker if missing
composer test                                            # PHPUnit (tests/php)
npx --yes markdownlint-cli2 "*.md" "docs/**/*.md"
```

On a real Nextcloud (the CI jobs `server` and `e2e`, Docker and Python 3), with the shared
script `nextcloud-app-server.py` of `dawid/ci-actions`: `run --app-dir app/cryptomator_vaults
--nextcloud 35 --check tests/server/check.sh` (or `--check tests/e2e/run.sh`, the browser test);
`docs/developer.md` has the details.

`appinfo/info.xml` is checked against `https://apps.nextcloud.com/schema/apps/info.xsd` with
`xmllint --noout --schema`.

## Conventions

- Commit messages: one line, no trailers, as Conventional Commits with the area as scope
  (`feat(vault): …`, `fix(inbox): …`, `docs: …`, `chore: …`), which the release bot reads. A change
  comes with its README or `docs/` text and an entry under `## Unreleased` in `CHANGELOG.md` (Keep a
  Changelog: `### Added`, `### Changed`, `### Fixed`).
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

The release bot (`release-bot` on git.ciepiela.org, weekly) releases what is due, from the
Conventional Commits since the last tag (`feat` a minor, `fix`, `perf`, `refactor` and `fix(deps)` a
patch, `!` a major) and the `## Unreleased` entries (an `### Added` makes it at least a minor). It
moves the entries under `## X.Y.Z - YYYY-MM-DD` (adding Renovate's updates as `### Dependencies`),
sets `<version>` in `appinfo/info.xml` (`.cz.toml`), commits `chore(release): X.Y.Z`, tags `vX.Y.Z`
signed and pushes; `.forgejo/workflows/release.yml` then releases it.

To release at once by hand: move the entries, set the version, commit `chore(release): X.Y.Z`, tag
it annotated and signed as the earlier tags (`git tag -s vX.Y.Z -m "Vaults for Cryptomator X.Y.Z"`)
and push the tag.

## Screenshots

`screenshots/1-…png` to `4-…png` are the English shots of the homelab's guide
(`docs/assets/screenshots/vaults-*.png` in `dawid/HomeLab`), recorded against a demo Nextcloud
with demo people and data only, scaled down to 1600 pixels wide
(`vips thumbnail in.png out.png[compression=9,strip] 1600`). `appinfo/info.xml` links them by
their raw URLs on `main`. Never show real accounts, addresses or host names.
