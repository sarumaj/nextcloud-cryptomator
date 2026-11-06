# Vaults for Cryptomator: developer's guide

## Tests

- **The primitives** against their RFCs' test vectors: scrypt (RFC 7914) and AES-SIV (RFC 5297).
- **The vaults** in `tests/fixtures/` were written by Cryptomator's own library (cryptofs), one
  per cipher combination, with names that need shortening, a link, nested and empty folders and
  files across chunk boundaries. `vault-*.json` lists every entry with its size and SHA-256, and
  the test compares everything it decrypts against it. To write them again (needs Docker; the
  new vaults have new keys):

  ```bash
  docker run --rm -v "$PWD/tests/fixtures:/f" -w /f/generator maven:3.9.11-eclipse-temurin-25 \
    sh -c 'mvn -q dependency:copy-dependencies -DoutputDirectory=/tmp/l &&
      javac -encoding UTF-8 -cp "/tmp/l/*" -d /tmp/c src/main/java/Generate.java &&
      java -Dfile.encoding=UTF-8 -Dsun.jnu.encoding=UTF-8 -cp "/tmp/c:/tmp/l/*" Generate /f'
  ```

  Changed copies of them, made in the test: the configuration signed anew with HS384 and HS512
  (opens) and with `none`, RS256 and others (refused), a key file with a tampered `versionMac`
  (corrupt) or another version than 999 (refused).

- **Writing** (`tests/write.test.js`): the format's edges (names of exactly 220 and 224 encrypted
  characters around the shortening threshold, decomposed Unicode, empty files, a full chunk, long
  names, nested new folders), what is refused (a taken name, a folder in the way, unusable names),
  and a storage that changes a file on the way, which must never reach the vault, not even when
  replacing.
- **Renaming, moving, deleting** (`tests/write.test.js`, `editSamples` in `tests/samples.js`):
  every change between short and long names for files and folders, moves into other folders (also
  below a moved folder, and with a new name), what is refused (a folder into itself, a taken name),
  and deletions of files, a link and a folder with folders in it, leaving no directory that no
  entry leads to.
- **Compatibility** (`tests/compat.sh`, needs Java 25 and Maven, or Docker): the same writes,
  renames, moves and deletions in copies of the test vaults, then Cryptomator's own library
  (`Verify.java`) opens each vault, looks up every file by its path as Cryptomator does, reads it,
  and runs cryptofs' health checks. Its
  entries must be exactly the expected ones, and the health checks must find nothing, also with the
  staging leftovers of a browser that died midway.
- **The integration** in a real browser, `tests/e2e/check.mjs` (Playwright), against a Nextcloud
  with this app and `tests/fixtures/vault-gcm` uploaded as `/Vault`. It opens *Vaults*, refuses a
  wrong password, unlocks, browses in Files' list, previews, downloads, creates a folder, uploads
  (a 25 MB file in chunks, a replacement after asking, a file into the new folder), renames, moves a
  folder into another, deletes a link and a folder, stays in *Vaults* on the browser's Back, checks
  that only
  the app's own actions are offered on the vault's entries, opens the vault from the notice and
  from its `vault.cryptomator`, and locks. It moves the files of two inboxes into the vault (by
  hand, then as it is unlocked: a name kept twice, the plain copies and the folder they emptied
  deleted for good, a file uploaded just before left) and makes an inbox from the vault's menu;
  the inboxes' files must wait 2 minutes after their upload, so the test waits for that where it
  gets there sooner. It fails if any request carried the password, a
  decrypted name or content, a file type icon or an entry's address. With `EXPECTED_OUT` set, it
  writes the entries it expects; copy the vault out of Nextcloud's data directory afterwards (or
  download it over WebDAV) and run `Verify.java` on it to check what Nextcloud stored. Run it also
  against a Nextcloud with object storage as primary storage and Redis, as servers usually are:
  Nextcloud's chunked uploads take another path there (and answer a part with 200, not 201). Run
  it against each new Nextcloud version: the integration relies on how Files decides what to
  offer. Switch the first-run wizard off (`occ app:disable firstrunwizard`): its dialog covers
  the list. Web Crypto needs HTTPS or `localhost`, so run the browser in the Nextcloud container's
  network:

  ```bash
  docker run --rm --network container:<nextcloud> -v "$PWD:/repo" -w /repo \
    -e NC_URL=http://localhost -e NC_USER=admin -e NC_PASSWORD=... \
    mcr.microsoft.com/playwright:v1.49.1-noble \
    sh -c 'npm i --no-save playwright@1.49.1 && node tests/e2e/check.mjs'
  ```

  CI runs it in the job `e2e` on Nextcloud 35 with PostgreSQL, on the server of the shared
  action `nextcloud-app-server` (below), with `tests/e2e/run.sh` as the action's check: it
  switches the wizard off, uploads the test vault as `/Vault` over WebDAV and runs the command
  test beside the server, Playwright's Chromium installed on the job's host (with the libraries
  it needs, through `sudo`). By hand, the same as CI (about 5 minutes; without `sudo` the
  libraries must be there, else use the container above):

  ```bash
  python3 nextcloud-app-server.py run --app-dir app/cryptomator_vaults --nextcloud 35 \
    --check tests/e2e/run.sh --port 8080
  ```

  Object storage, Redis and other Nextcloud versions remain by hand.

- **The server part** (`tests/php/`, PHPUnit against Nextcloud's public API `nextcloud/ocp`, no
  Nextcloud: `composer test`): the two listeners registered for their events; the Files page gets
  the integration as an init script after its translations, and its styles, each a file the app
  has; the policy for the previews adds only blob: media and frames and WebAssembly to
  Nextcloud's own, never eval of scripts; *Vaults* in the menu (info.xml, `routes.php`, the
  controller) redirects every person, not only admins, to the view `src/files.js` registers.
  `tests/stubs/server.php` stands in for the server's classes that the public API calls.
- **On a real Nextcloud** (the CI job `server`, Nextcloud 32 and 35 with PostgreSQL): the shared
  action `nextcloud-app-server` of `dawid/ci-actions` installs the app store's release, upgrades
  it to the checkout, checks that it is enabled, that occ loads, that it can be disabled and
  enabled again and that `nextcloud.log` has no error of it, and runs `tests/server/check.sh`:
  as a person who is no admin and reads German, *Tresore* in the app menu leads to the vaults'
  view in Files, a visitor not signed in to the login; the Files page loads the translations and
  the module before Files' own scripts, and its policy allows blob: media and frames and
  WebAssembly; every module of the integration (its imports followed), the translations, styles
  and icons are served with their types and as committed. By hand, with the action's script
  (`nextcloud-app-server.py` of `dawid/ci-actions`, needs Docker and Python 3):

  ```bash
  python3 nextcloud-app-server.py run --app-dir app/cryptomator_vaults --nextcloud 35 \
    --check tests/server/check.sh --port 8080
  ```

- **Inboxes** (`tests/inbox.test.mjs`, `src/inbox.mjs`): the marker of [the contract](inbox.md)
  read and refused (bad JSON, missing or wrong keys, `.` and `..`, a later version, an inbox that is
  its vault or lies in it), where an inbox's files go in the vault, which files wait (changed or
  uploaded in the last 2 minutes, also with an old modification time), subfolders that are an inbox
  or a vault of their own, and the names of files kept beside one of the same name.

## Releasing

The release bot (`release-bot` on git.ciepiela.org) does it weekly when a release is due, from
the Conventional Commits since the last tag and the `## Unreleased` entries of `CHANGELOG.md`
(`.cz.toml`). By hand, at once:

1. Move the `## Unreleased` entries of `CHANGELOG.md` under `## X.Y.Z - YYYY-MM-DD` and set
   `<version>` in `appinfo/info.xml` to `X.Y.Z`.
2. Commit as `chore(release): X.Y.Z`.
3. Tag it, annotated and signed: `git tag -s vX.Y.Z -m "Vaults for Cryptomator X.Y.Z"`, and push
   the tag.

A tag `vX.Y.Z` must carry the version in `appinfo/info.xml`. The release workflow
(`.forgejo/workflows/release.yml`, the shared action `nextcloud-app-release` of `dawid/ci-actions`)
builds `cryptomator_vaults-X.Y.Z.tar.gz` and attaches it to the release, whose text is the version's
section of `CHANGELOG.md` (a tag without one fails before anything is released); with the secrets
`NC_APP_SIGNING_KEY` and `NC_APPSTORE_TOKEN` it also signs it and publishes it on the app store (not
when the repository's variable `NC_APPSTORE` is `false`).
