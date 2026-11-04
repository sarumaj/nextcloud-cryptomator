# Vaults for Cryptomator: inboxes

An app that fills your files on its own, such as Harvester (which downloads files on a schedule),
cannot write into a vault: it has no key, and should have none. It saves plain files into an
**inbox** instead, a folder linked to a vault. When you unlock that vault in the browser, the app
offers to move the inbox's files into it, encrypted in the browser exactly as its uploads are, and
then deletes the plain copies.

The password, the keys and everything decrypted stay in the browser, as everywhere in the app.
What waits in an inbox is an ordinary file on the server until it is moved; the server saw it, and
can tell from the time and sizes that it went into the vault.

## Using an inbox

- **Make one:** a vault's menu in *Vaults* has **Make an inbox for this vault …**. It proposes a
  folder beside the vault, `<vault name> inbox`, which it creates if need be, and the vault's top
  as the folder the files go to; *Filled by* names who fills it (optional). An app such as
  Harvester can make the inbox itself, by writing the marker below.
- **When you unlock the vault,** the bar above its list says what waits, per inbox: *3 files from
  Harvester job "Mag" are waiting in “/Vaults/Family papers inbox” (12 MB).* **Move into the
  vault** moves them, with a line per file (its progress, or what went wrong), **Stop** after the
  file being written, and a summary.
- **Move files from inboxes automatically when I unlock** (under the notice) moves them as soon as
  the vault is unlocked, in this browser. The setting is kept per vault and account in the
  browser's storage, as the vaults opened by hand are.

## What happens to a file

1. Every file in the inbox but the marker, also in its subfolders, goes to
   `<target>/<its path in the inbox>` inside the vault; missing folders are created there.
2. It is encrypted and checked as an upload is (see the README, "Writing without harming the
   vault"): read back from the server and compared before it enters the vault.
3. A name taken in the vault keeps both: the new file is named as Nextcloud names a second copy,
   `Report (2).pdf`, `Report (3).pdf` and so on. Nothing in the vault is replaced.
4. Once it is in the vault, its plain copy is deleted from the inbox, only if it did not change
   meanwhile (its ETag, `If-Match`), and then also from Nextcloud's deleted files, with its
   versions: a plain copy in the deleted files would defeat the vault. Where the deleted files
   cannot be reached, the summary says how many copies may still be there.
5. Subfolders of the inbox that this emptied are removed, also from the deleted files (only if
   nothing is in them there). The marker and the inbox folder stay.

Left where they are:

- **Files still being written:** a file changed or uploaded in the last 2 minutes (its
  modification time and Nextcloud's upload time) waits for the next time; the notice counts them.
- **A subfolder with a marker or a `vault.cryptomator` of its own:** another inbox, or a vault.
- **An inbox shared with you:** its files are its owner's, not yours to delete.
- **An inbox of a vault you cannot write to** (the vault's folder lacks the permission to create
  files and folders), and an inbox that is the vault's folder, inside a vault, or holds one.
- **A marker of a later version:** the bar says that the inbox needs a newer version of the app.

Inboxes are found by Nextcloud's search for the marker's name in your files, at most every 10
minutes and when an inbox was just made here; what waits in them is listed afresh at every unlock
and before every move.

## The marker: a stable interface

The contract between the vault app and whatever fills an inbox (Harvester follows it). Version 1;
a change that an older vault app would misread gets a new version.

An inbox is a folder of the person's files with a file named `.cryptomator-inbox.json` directly
in it, UTF-8 JSON:

```json
{
  "version": 1,
  "vault": "/Vaults/Family papers",
  "target": "/Magazines",
  "from": "Harvester job \"Mag\""
}
```

| Key       | Required | Meaning                                                                            |
| --------- | -------- | ---------------------------------------------------------------------------------- |
| `version` | yes      | The contract's version, an integer: `1`. A greater one: left alone, with a notice. |
| `vault`   | yes      | The vault's folder (holding `vault.cryptomator`), from the user's files root.      |
| `target`  | no, `/`  | The folder inside the vault the files go to; `/` is the vault's top.               |
| `from`    | no       | Who fills the inbox, shown to the person.                                          |

- Paths start with `/` (a missing one is added), use `/` between folders, may end with `/`, and
  must not contain `.` or `..` as a folder. They are compared in Unicode NFC.
- Unknown keys are ignored; a writer may add its own (e.g. a job's ID).
- A marker that is not this JSON, not an object, larger than 64 KB, or with `version` not a
  positive integer, makes no inbox. So does an inbox whose folder is the vault's folder, lies
  inside it, or holds it.
- `target` is stored unencrypted: the name of the folder inside the vault is visible to the
  server. Use `/`, or a name that may be known.

For a writer such as Harvester:

- **Everything in the inbox folder except the marker** waits to be moved, recursively, keeping
  subfolders. Do not keep other files there (state, logs): they would end up in the vault.
- **Upload each file in one piece** (a single `PUT`, or a chunked upload, which appears only at its
  final `MOVE`). A file that changed or was uploaded in the last 2 minutes is left for the next
  time; partial files must not stay in the inbox longer than that.
- **The vault app deletes** each file once it is in the vault, and the subfolders that emptied;
  create folders again as needed (`MKCOL`). It never deletes or changes the marker or the inbox
  folder. A file changed while it is moved is kept in the inbox (it may then also be in the vault).
- **Write the marker** only into a folder of the person's own (not one shared with them), and
  leave it as it is once there: the vault app refuses to write a marker over an existing one.
