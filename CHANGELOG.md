# Changelog

## Unreleased

### Added

- Inboxes: folders linked to a vault by a marker file (`.cryptomator-inbox.json`), which an app
  without the vault's key, such as Harvester, fills with plain files. When the vault is unlocked,
  the bar above it offers to move them into it, encrypted and checked in the browser, a taken name
  kept beside (`Report (2).pdf`), and the plain copies deleted, also from the deleted files; or
  moves them as the vault is unlocked, if asked to. **Make an inbox for this vault …** in a vault's
  menu. The marker's format is a stable interface: `docs/inbox.md`.
- Vaults whose configuration (`vault.cryptomator`) is signed with HS384 or HS512 open, as
  Cryptomator reads them; any algorithm but HS256, HS384 and HS512 is still refused.

### Fixed

- The key file's `versionMac` is checked, as Cryptomator checks it: a key file whose version does
  not authenticate with its keys is refused as damaged, and one of another version than 999
  (Cryptomator 1.6 and later) as unsupported.

## 0.8.1 - 2026-11-03

### Fixed

- The app's build has marked 18.1.3 (Markdown previews), as `package-lock.json` does: 0.8.0
  still shipped the build with 18.1.2.

## 0.8.0 - 2026-11-03

### Added

- Screenshots in the README and on the app store (`screenshots/`, `<screenshot>` in
  `appinfo/info.xml`).
- Development checks in CI: php-cs-fixer with Nextcloud's coding standard and Psalm against
  `nextcloud/ocp` (`composer.json` holds these tools only), and markdownlint.
- `AGENTS.md`, `SECURITY.md`, `docs/developer.md` (the tests and releasing, from the README),
  `.editorconfig`, and the AI review workflow.

### Changed

- Releases through the shared action `nextcloud-app-release` of `dawid/ci-actions`: the release's
  text is the version's section of this changelog, and a tag without one fails.
- The app requires PHP 8.2, as Nextcloud 32 does.
- The changelog follows Keep a Changelog, with each version's date.

## 0.7.0 - 2026-10-31

### Added

- **New vault …** in *Vaults* creates a Cryptomator vault (format 8) in a folder of your files,
  opens it and shows its recovery key.
- In a vault's menu: **Change password …** (the old key file kept as a backup, as Cryptomator
  keeps it), **Show recovery key …** and **Reset password with recovery key …** (Cryptomator's
  44 words, which work in both), and **Check health …**, which finds what cryptofs' health check
  finds and repairs what it repairs (orphaned entries into `/LOST+FOUND`).
- Tests: cryptofs opens the vaults made here, after a password change and a reset; its findings on
  damaged vaults are the app's, and a vault the app repaired reads like one cryptofs repaired.

## 0.6.0 - 2026-10-31

### Added

- **Into a vault from your files:** **Add from your files …** copies or moves files and folders
  into the vault's folder shown, encrypted and checked as uploads are. Moving deletes the originals
  once all is in the vault and only if they did not change meanwhile, also from Nextcloud's
  deleted files (with their versions): no unencrypted copy stays on the server. What is shared with
  you is copied only; a folder holding a vault is refused.
- **Out of a vault into your files:** **Export to your files …** copies or moves entries, decrypted,
  into a folder chosen with Nextcloud's file picker, and checks what was written (a large file part
  by part, without holding it). Moving removes an entry from the vault once all of it is out.

### Changed

- **Slides look like their design:** the pptx and odp previews draw the slides' backgrounds
  (colours, gradients, pictures), the shapes their master and layout put on every slide, the
  theme's colours (with their lighter and darker variants) and fonts, the fills and outlines of
  shapes, groups, rounded and round shapes, bullets, and PowerPoint's default table style. Still
  left out: animations, charts, SmartArt and effects such as shadows.
- The vault picker (**Open a vault folder …**) starts at the top of your files.
- Markdown previews use marked 18.1.2 (was 18.1.1).

## 0.5.2 - 2026-10-31

### Changed

- The build writes invisible characters (control characters such as JSZip's `PK\x03\x04`,
  non-breaking spaces, joiners) as escapes, so that Forgejo and editors no longer warn of hidden
  text. The build checks, by parsing each chunk before and after, that the code means the same.

### Fixed

- After an update from 0.4, the app did not load at all (no *Vaults*, no notice above a
  vault's folder) until the browser's cache was emptied. Nextcloud has browsers keep the app's
  modules for half a year, and only the main one is loaded with the app's version: the browser
  combined the new one with the old version's shared module. Every other module's name now carries
  a hash of its contents.

## 0.5.1 - 2026-10-31

### Added

- Unlocking a vault removes the staging files and folders older than a day that uploads which never
  finished (a browser closed midway) left in its top folder.

## 0.5.0 - 2026-10-31

### Added

- **Lock** in a bar above an open vault's list, which says the vault is unlocked in this browser.
- **Folders:** dropped folders and **Upload folder …** go into the vault with everything in them;
  a folder of a name that is there merges into it.
- **Large files in pieces:** from 16 MB a file is encrypted, uploaded and checked part by part (read
  back in ranges, each chunk compared with the file), so the browser holds a part, not the file. A
  large file is downloaded in pieces where the browser lets it be saved so (Edge, Chrome).
- **Office previews** in the browser: Word (docx) with docx-preview, spreadsheets (xlsx, xls, ods)
  with SheetJS, in a frame with neither scripts nor network.
- **More previews:** Markdown (marked), the contents of ZIP archives (JSZip), HEIC photos (libheif,
  as WebAssembly), and PowerPoint (pptx), OpenDocument text (odt) and presentations (odp), drawn
  by the app's own renderers: text, tables, pictures and the slides' layout, no animations.
- **Sync conflicts as Cryptomator resolves them:** a copy a sync client made of an encrypted file
  (`… (conflicted copy …).c9r`) is moved to its proper name if that is free, deleted if it is a
  duplicate of a folder or link, and otherwise renamed so that both show, e.g.
  `Report (conflicted copy 2026-10-31).docx`. Entries that cannot be decrypted, and folders whose
  contents are missing, are hidden, as in Cryptomator.
- `NOTICE.md` lists the third-party packages in the build and their licences (`npm run notice`,
  checked in CI, in the release's archive).

### Changed

- The app is now called **Vaults for Cryptomator** (its ID stays `cryptomator_vaults`).

## 0.4.1 - 2026-10-31

### Changed

- The password dialog is a sign-in form as password managers know one: the vault's folder as the
  user name (read only) beside the password, so that a manager offers, fills and saves an entry
  per vault. An entry saved by Cryptomator's apps has the app as its address, not the site: add the
  site to it (see the README).

## 0.4.0 - 2026-10-31

### Added

- **Rename**, **Move …** (with a chooser of the vault's folders) and **Delete** for a vault's
  entries, several at once for moving and deleting. Between short names one move on the server;
  where a long name is involved the new entry is put together and checked beside the old one,
  which goes only after. A folder is deleted entry first, then the directories below it.

### Fixed

- Uploads of 20 MB and more failed with "HTTP 200" on Nextcloud with object storage and Redis:
  Nextcloud answers a part of a chunked upload there with an empty 200 instead of 201. Writes now
  succeed on any 2xx that no redirect led to (a redirect to a sign-in page still fails), and an
  error names the request that failed.
- The browser's Back to a parent folder stayed in *Vaults* only by chance: entries had negative IDs,
  which Files' router does not take in a URL, so it fell back to *All files*. Entries now have
  positive IDs above 2^52, and other apps' actions are switched off for a vault's entries in any
  view, not only in *Vaults*.

## 0.3.0 - 2026-10-31

### Added

- Writing: **Upload files …**, **New folder …** and files dropped on the list put files and
  folders into an unlocked vault, encrypted in the browser as Cryptomator writes them. A file is
  written under a staging name, read back and compared, and only then moved into place in one
  step; a failed check leaves the vault as it was. A name that is taken is replaced only when asked
  (never a folder). Large files go up in chunks.
- `tests/compat.sh` (also in CI) has Cryptomator's own library read what the app writes, look up
  every file by its path and run its health checks.

## 0.2.0 - 2026-10-31

### Added

- A vault's folder in your files is recognised as you open it: a notice above the list opens the
  vault, as does *Open vault* on the folder or its `vault.cryptomator`.
- *Open a vault folder …* chooses a vault with Nextcloud's file picker.

### Changed

- Vaults are browsed in the Files app: *Vaults* in its navigation lists them, and an unlocked
  vault shows in Files' own list (folders, breadcrumbs, sorting, grid view). *Vaults* in the app
  menu leads there; the separate page is gone.
- Nothing decrypted reaches the server: entries have opaque addresses, every file shows the same
  icon (Files would ask the server for each file type's icon), and other apps' actions are not
  offered on a vault's entries.

## 0.1.0 - 2026-10-31

### Added

- First version: finds the vaults in your files, unlocks one in the browser (vault format 8,
  `SIV_GCM` and `SIV_CTRMAC`), browses its folders, previews and downloads its files, and locks
  after 15 minutes without use. Read only.
- German and Polish translations.
