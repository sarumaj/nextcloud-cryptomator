#!/usr/bin/env bash
# SPDX-License-Identifier: AGPL-3.0-or-later
#
# The browser test (tests/e2e/check.mjs) on the server of the shared action
# nextcloud-app-server of dawid/ci-actions: the CI job "e2e" gives it as the action's check,
# with OCC, NEXTCLOUD_URL, NEXTCLOUD_USER and NEXTCLOUD_PASSWORD set. It prepares what the
# test expects (docs/developer.md, "Tests"): the first-run wizard off, whose dialog covers the
# list, and tests/fixtures/vault-gcm uploaded as /Vault. The browser (Playwright's Chromium) runs
# beside the server, which it reaches on localhost, as Web Crypto needs HTTPS or localhost. With
# sudo (CI's ubuntu-latest) it installs the libraries Chromium needs, else they must be there.
# Run from the repository's top.
set -euo pipefail

# The version docs/developer.md pins for the test by hand.
playwright=1.49.1
user=${NEXTCLOUD_USER:?}
auth="$user:${NEXTCLOUD_PASSWORD:?}"
dav=$NEXTCLOUD_URL/remote.php/dav/files/$user

# Not every Nextcloud has the wizard enabled; disabling it then is a no-op.
"${OCC:?}" app:disable firstrunwizard

# The vault over WebDAV as the person's own upload would put it: folders first, then files.
curl -fsS -u "$auth" -X MKCOL "$dav/Vault" >/dev/null
(cd tests/fixtures/vault-gcm && find . -mindepth 1 -type d | sort) | while read -r folder; do
	curl -fsS -u "$auth" -X MKCOL "$dav/Vault/${folder#./}" >/dev/null
done
(cd tests/fixtures/vault-gcm && find . -type f | sort) | while read -r file; do
	curl -fsS -u "$auth" -T "tests/fixtures/vault-gcm/${file#./}" "$dav/Vault/${file#./}" >/dev/null
done
echo "tests/fixtures/vault-gcm uploaded as /Vault"

# The test makes its office files with the app's own libraries (node_modules), and needs
# Playwright's package beside them, not saved in package.json.
npm ci --no-audit --no-fund --loglevel=error
npm i --no-save --no-audit --no-fund --loglevel=error "playwright@$playwright"
if sudo -n true 2>/dev/null; then
	npx playwright install --with-deps chromium >/dev/null
else
	npx playwright install chromium >/dev/null
fi
NC_URL=$NEXTCLOUD_URL NC_USER=$user NC_PASSWORD=$NEXTCLOUD_PASSWORD node tests/e2e/check.mjs
