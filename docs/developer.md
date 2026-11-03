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
  from its `vault.cryptomator`, and locks. It fails if any request carried the password, a
  decrypted name or content, a file type icon or an entry's address. With `EXPECTED_OUT` set, it
  writes the entries it expects; copy the vault out of Nextcloud's data directory afterwards (or
  download it over WebDAV) and run `Verify.java` on it to check what Nextcloud stored. Run it also
  against a Nextcloud with object storage as primary storage and Redis, as servers usually are:
  Nextcloud's chunked uploads take another path there (and answer a part with 200, not 201). Run
  it against each new Nextcloud version: the integration relies on how Files decides what to
  offer. Web Crypto needs HTTPS or `localhost`, so run the browser in the Nextcloud container's
  network:

  ```bash
  docker run --rm --network container:<nextcloud> -v "$PWD:/repo" -w /repo \
    -e NC_URL=http://localhost -e NC_USER=admin -e NC_PASSWORD=... \
    mcr.microsoft.com/playwright:v1.49.1-noble \
    sh -c 'npm i --no-save playwright@1.49.1 && node tests/e2e/check.mjs'
  ```

## Releasing

1. Move the `## [Unreleased]` entries of `CHANGELOG.md` under `## [X.Y.Z] - YYYY-MM-DD` and set
   `<version>` in `appinfo/info.xml` to `X.Y.Z`.
2. Commit as `release X.Y.Z`.
3. Tag it, annotated and signed: `git tag -s vX.Y.Z -m "Vaults for Cryptomator X.Y.Z"`, and push
   the tag.

A tag `vX.Y.Z` must carry the version in `appinfo/info.xml`. The release workflow
(`.forgejo/workflows/release.yml`) builds `cryptomator_vaults-X.Y.Z.tar.gz` and attaches it to the
release; with the secrets `APP_SIGNING_KEY` and `APPSTORE_TOKEN` it also signs it and publishes it
on the app store.
