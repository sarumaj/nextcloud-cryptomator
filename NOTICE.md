# Third-party software in the app

The app's own code is licensed under the AGPL-3.0-or-later (LICENSE). Its scripts
(`app/cryptomator_vaults/js/cryptomator_vaults-*.mjs`, built from `src/` by `npm run build`)
contain these packages, under their own licences, all compatible with the AGPL-3.0-or-later.
Each package's licence text is in its source, at the version given, on npm. This list is made
by `npm run notice`.

| Package                    | Version | Licence                   |
|----------------------------|---------|---------------------------|
| @file-type/xml             | 0.4.4   | MIT                       |
| @floating-ui/core          | 1.8.0   | MIT                       |
| @floating-ui/dom           | 1.8.0   | MIT                       |
| @floating-ui/utils         | 0.2.12  | MIT                       |
| @mdi/js                    | 7.4.47  | Apache-2.0                |
| @nextcloud/auth            | 2.6.0   | GPL-3.0-or-later          |
| @nextcloud/axios           | 2.6.0   | GPL-3.0-or-later          |
| @nextcloud/browser-storage | 0.5.0   | GPL-3.0-or-later          |
| @nextcloud/capabilities    | 1.2.1   | GPL-3.0-or-later          |
| @nextcloud/dialogs         | 8.0.0   | AGPL-3.0-or-later         |
| @nextcloud/event-bus       | 3.3.3   | GPL-3.0-or-later          |
| @nextcloud/files           | 4.1.1   | AGPL-3.0-or-later         |
| @nextcloud/initial-state   | 3.0.0   | GPL-3.0-or-later          |
| @nextcloud/l10n            | 3.4.1   | GPL-3.0-or-later          |
| @nextcloud/logger          | 3.0.3   | GPL-3.0-or-later          |
| @nextcloud/paths           | 3.1.0   | GPL-3.0-or-later          |
| @nextcloud/router          | 3.2.0   | GPL-3.0-or-later          |
| @nextcloud/sharing         | 0.4.0   | GPL-3.0-or-later          |
| @nextcloud/vue             | 9.14.1  | AGPL-3.0-or-later         |
| @nextcloud/vue-select      | 4.1.0   | MIT                       |
| @vue/reactivity            | 3.5.44  | MIT                       |
| @vue/runtime-core          | 3.5.44  | MIT                       |
| @vue/runtime-dom           | 3.5.44  | MIT                       |
| @vue/shared                | 3.5.44  | MIT                       |
| @vueuse/core               | 15.0.0  | MIT                       |
| @vueuse/shared             | 15.0.0  | MIT                       |
| axios                      | 1.21.0  | MIT                       |
| debounce                   | 3.0.0   | MIT                       |
| docx-preview               | 0.4.1   | Apache-2.0                |
| dompurify                  | 3.4.17  | (MPL-2.0 OR Apache-2.0)   |
| escape-html                | 1.0.3   | MIT                       |
| floating-vue               | 5.4.0   | MIT                       |
| focus-trap                 | 8.2.4   | MIT                       |
| is-svg                     | 6.1.0   | MIT                       |
| jszip                      | 3.10.2  | (MIT OR GPL-3.0-or-later) |
| libheif-js                 | 1.23.5  | LGPL-3.0                  |
| marked                     | 18.1.2  | MIT                       |
| p-queue                    | 10.0.0  | MIT                       |
| sax                        | 1.6.1   | BlueOak-1.0.0             |
| semver                     | 7.8.5   | ISC                       |
| tabbable                   | 6.5.1   | MIT                       |
| typescript-event-target    | 1.1.2   | MIT                       |
| vue-router                 | 5.4.0   | MIT                       |
| webdav                     | 5.11.0  | MIT                       |
| xlsx                       | 0.20.3  | Apache-2.0                |

The office previews use docx-preview and SheetJS (`xlsx`, from cdn.sheetjs.com). The vault
format is Cryptomator's, implemented here anew; Cryptomator's own libraries (cryptofs, cryptolib,
AGPL-3.0) are only used by the tests, which fetch them, and are not part of the app.
