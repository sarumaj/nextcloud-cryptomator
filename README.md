# Cryptomator vaults for Nextcloud

Browse the [Cryptomator](https://cryptomator.org/) vaults you keep in Nextcloud in the Files
app: open their folders, preview files and download them, without installing Cryptomator.

- **In Files:** *Vaults* in the navigation lists your vaults. An unlocked vault shows in Files' own
  list, with its folders, breadcrumbs, sorting and grid view.
- **Recognised as you open it:** when you open a vault's folder in your files, a notice above the
  list offers to open the vault.
- **Unlocked in your browser:** the password, the vault's keys and every decrypted name and file
  stay in the browser tab. The server only sends the encrypted files, as it does when Cryptomator
  itself reads the vault.
- **Locks itself** after 15 minutes without use, when you choose **Lock**, and when you leave the
  page.
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
`occ app:enable cryptomator_vaults`. Files gets *Vaults* in its navigation; *Vaults* in the app
menu leads there.

## Using it

1. Open a vault, in one of these ways:
    - *Vaults* in Files' navigation lists the folders of your files that hold a vault
      (`vault.cryptomator`). Choose one.
    - Open a vault's folder in your files: the notice above the list has **Open vault**. So has
      the menu of the folder and of its `vault.cryptomator`; this also works for a vault in a share.
    - **Open a vault folder …** at the top of *Vaults* chooses one with Nextcloud's file picker.
2. Enter the vault's password.
3. Browse it like any folder in Files. Choose a file to preview it (pictures, PDFs, text, audio and
   video up to 100 MB); its menu has **Download**.
4. Choose **Lock** in the vault's menu in *Vaults*, or **Lock all vaults** at the top.

Large files are decrypted in the browser's memory, which holds them encrypted and decrypted at
once: above 1 GB the app asks first.

## How it works, and what it protects

The server only serves the app's scripts. Everything else runs in the browser:

1. It reads the vault's files over WebDAV, as the Files app does, with your Nextcloud login.
2. `js/vault.js` derives the key from your password (scrypt) and unwraps the vault's two keys
   with it. It checks that the configuration `vault.cryptomator` is signed with them, then keeps
   them as keys the browser won't export.
3. It decrypts names (AES-SIV) and contents (AES-GCM, or AES-CTR with HMAC), and checks that
   each part is authentic: a changed byte is reported, not shown.
4. `src/files.js` hands the decrypted folders to Files as a view of its own.

Files would ask the server for some things about what it shows, so the integration keeps it from
that:

- The vault's entries have addresses that are never requested and name nothing (hashes), and are
  not WebDAV files: Files' own actions that would reach the server (download, details, rename,
  move, favourite, open in the desktop client) are not offered for them. Other apps' actions are
  switched off in *Vaults* as well; the app's own **View**, **Download** and **Lock** take their
  place.
- A folder's URL (`?dir=/v…/d…`), which a reload sends to the server, holds only those hashes; the
  breadcrumbs show the names.
- Every file shows the same icon: Files would fetch each file type's icon from the server and tell
  it each file's type.
- Locking also removes the vault's entries from Files' memory.

What this protects against, and what it doesn't:

- **It keeps** Cryptomator's promise that the server never sees your files, their names or your
  password. The browser test checks every request for them.
- **It doesn't protect against a server that's been taken over:** such a server could send changed
  scripts that send the password elsewhere. That is true of every web page that encrypts in the
  browser. If you don't trust the server, use Cryptomator's own apps.
- **On the device,** decrypted files exist while the vault is unlocked: as previews and as
  downloads, which stay in your downloads folder. Locking drops the keys and the previews.

Decrypted files are shown so that they can't act as you in Nextcloud: HTML only as text, SVG only
as a picture, and downloads typed as plain data, which no browser renders.

## Developing

```bash
npm ci
npm run build                     # src/ into app/cryptomator_vaults/js and css (committed)
node --test tests/vault.test.js   # the decryption, against vaults Cryptomator wrote
node tests/l10n.js                # the translations cover the integration
```

The build is committed, because servers install the app from the repository without building it;
CI checks that it is what `src/` builds. The integration uses `@nextcloud/files` (Files' view and
actions) and loads `@nextcloud/dialogs` (toasts, the file picker, with Vue) only when first needed,
so that Files loads about 50 KB more (gzipped), not 350 KB.

CI (`.forgejo/workflows/ci.yml`) also lints the PHP and checks `appinfo/info.xml` against the app
store's schema.

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

- **The integration** in a real browser, `tests/e2e/check.mjs` (Playwright), against a Nextcloud
  with this app and `tests/fixtures/vault-gcm` uploaded as `/Vault`. It opens *Vaults*, refuses a
  wrong password, unlocks, browses in Files' list, previews, downloads, checks that only the app's
  own actions are offered on the vault's entries, opens the vault from the notice and from its
  `vault.cryptomator`, and locks. It fails if any request carried the password, a decrypted name, a
  file type icon or an entry's address. Run it against each new Nextcloud version: the integration
  relies on how Files decides what to offer. Web Crypto needs HTTPS or `localhost`, so run the
  browser in the Nextcloud container's network:

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
