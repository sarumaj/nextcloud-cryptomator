# Changelog

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
