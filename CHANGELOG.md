# Changelog

## 0.4.0

- Uploads of 20 MB and more failed with "HTTP 200" on Nextcloud with object storage and Redis:
  Nextcloud answers a part of a chunked upload there with an empty 200 instead of 201. Writes now
  succeed on any 2xx that no redirect led to (a redirect to a sign-in page still fails), and an
  error names the request that failed.
- **Rename**, **Move …** (with a chooser of the vault's folders) and **Delete** for a vault's
  entries, several at once for moving and deleting. Between short names one move on the server;
  where a long name is involved the new entry is put together and checked beside the old one,
  which goes only after. A folder is deleted entry first, then the directories below it.
- The browser's Back to a parent folder stayed in *Vaults* only by chance: entries had negative IDs,
  which Files' router does not take in a URL, so it fell back to *All files*. Entries now have
  positive IDs above 2^52, and other apps' actions are switched off for a vault's entries in any
  view, not only in *Vaults*.

## 0.3.0

- Writing: **Upload files …**, **New folder …** and files dropped on the list put files and
  folders into an unlocked vault, encrypted in the browser as Cryptomator writes them. A file is
  written under a staging name, read back and compared, and only then moved into place in one
  step; a failed check leaves the vault as it was. A name that is taken is replaced only when asked
  (never a folder). Large files go up in chunks.
- `tests/compat.sh` (also in CI) has Cryptomator's own library read what the app writes, look up
  every file by its path and run its health checks.

## 0.2.0

- Vaults are browsed in the Files app: *Vaults* in its navigation lists them, and an unlocked
  vault shows in Files' own list (folders, breadcrumbs, sorting, grid view). *Vaults* in the app
  menu leads there; the separate page is gone.
- A vault's folder in your files is recognised as you open it: a notice above the list opens the
  vault, as does *Open vault* on the folder or its `vault.cryptomator`.
- *Open a vault folder …* chooses a vault with Nextcloud's file picker.
- Nothing decrypted reaches the server: entries have opaque addresses, every file shows the same
  icon (Files would ask the server for each file type's icon), and other apps' actions are not
  offered on a vault's entries.

## 0.1.0

- First version: finds the vaults in your files, unlocks one in the browser (vault format 8,
  `SIV_GCM` and `SIV_CTRMAC`), browses its folders, previews and downloads its files, and locks
  after 15 minutes without use. Read only.
