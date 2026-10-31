# Cryptomator vaults for Nextcloud

Open the [Cryptomator](https://cryptomator.org/) vaults you keep in Nextcloud in the browser:
browse their folders, preview files and download them, without installing Cryptomator.

- **Unlocked in your browser:** the password and the vault's keys stay in the browser tab. The
  server only sends the encrypted files, as it does when Cryptomator itself reads the vault.
- **Locks itself** after 15 minutes without use, when you choose **Lock**, and when you close or
  leave the page.
- **Finds your vaults** in your files, or opens one by its folder.
- **Read only:** nothing is written to the vault. To change it, use Cryptomator.

Not affiliated with Skymatic GmbH, the makers of Cryptomator.

## Requirements

- Nextcloud 32 to 36, reached over **HTTPS**: browsers offer their encryption (Web Crypto) only
  on secure pages.
- Vaults of **vault format 8** (Cryptomator 1.6 and later), with either cipher combination
  (`SIV_GCM`, the default, or `SIV_CTRMAC`). Older vaults: open them once in a current
  Cryptomator, which offers to upgrade them. Vaults whose key is on a Cryptomator Hub are not
  supported.

## Installing

Unpack a release's `cryptomator_vaults-X.Y.Z.tar.gz` into `custom_apps/` and run
`occ app:enable cryptomator_vaults`. The app adds **Vaults** to the app menu.

## Using it

1. Open **Vaults** in the app menu. The page lists the folders of your files that hold a vault
   (`vault.cryptomator`). To open another one, enter its folder, for example `/Documents/Vault`.
   A link to `/apps/cryptomator_vaults/?vault=/Documents/Vault` opens that vault directly.
2. Choose the vault and enter its password.
3. Browse its folders. Choose a file to preview it (pictures, PDFs, text, audio and video up to
   100 MB) or to download it.
4. Choose **Lock** when you're done.

Large files are decrypted in the browser's memory, which holds them encrypted and decrypted at
once: above 1 GB the page asks first.

## How it works, and what it protects

The page is the app's only server part. Everything else runs in the browser:

1. It reads the vault's files over WebDAV, as the Files app does, with your Nextcloud login.
2. `js/vault.js` derives the key from your password (scrypt) and unwraps the vault's two keys
   with it. It checks that the configuration `vault.cryptomator` is signed with them, then keeps
   them as keys the browser won't export.
3. It decrypts names (AES-SIV) and contents (AES-GCM, or AES-CTR with HMAC), and checks that
   each part is authentic: a changed byte is reported, not shown.

Neither the password nor a key nor a decrypted file reaches the server. What this protects
against, and what it doesn't:

- **It keeps** Cryptomator's promise that the server never sees your files or your password. The
  browser test checks that no request contains the password.
- **It doesn't protect against a server that's been taken over:** such a server could send a
  changed page that sends the password elsewhere. That is true of every web page that encrypts
  in the browser. If you don't trust the server, use Cryptomator's own apps.
- **On the device,** decrypted files exist while the vault is unlocked: as previews in the page
  and as downloads, which stay in your downloads folder. Locking drops the keys and the previews.

Decrypted files are shown so that they can't act as you in Nextcloud: HTML only as text, SVG only
as a picture, and downloads typed as plain data, which no browser renders.

## Developing

```bash
node --test tests/vault.test.js   # the decryption, against vaults Cryptomator wrote
node tests/l10n.js                # the translations cover the page
```

Neither needs Nextcloud nor network. CI (`.forgejo/workflows/ci.yml`) also lints the PHP and
checks `appinfo/info.xml` against the app store's schema.

### Tests

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

- **The page** in a real browser, `tests/e2e/check.mjs` (Playwright), against a Nextcloud with
  this app and `tests/fixtures/vault-gcm` uploaded as `/Vault`. It finds the vault, refuses a wrong
  password, unlocks, browses, previews, downloads, locks, and checks that no request contained the
  password. Web Crypto needs HTTPS or `localhost`, so run the browser in the Nextcloud container's
  network:

  ```bash
  docker run --rm --network container:<nextcloud> -v "$PWD:/repo" -w /repo \
    -e NC_URL=http://localhost -e NC_USER=admin -e NC_PASSWORD=... \
    mcr.microsoft.com/playwright:v1.49.1-noble \
    sh -c 'npm i --no-save playwright@1.49.1 && node tests/e2e/check.mjs'
  ```

To release, tag `vX.Y.Z` with the version in `appinfo/info.xml`. The release workflow
(`.forgejo/workflows/release.yml`) builds `cryptomator_vaults-X.Y.Z.tar.gz` and attaches it to the
release; with the secrets `APP_SIGNING_KEY` and `APPSTORE_TOKEN` it also signs it and publishes it
on the app store.

## Licence

[AGPL-3.0-or-later](LICENSE).
