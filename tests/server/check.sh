#!/usr/bin/env bash
# SPDX-License-Identifier: AGPL-3.0-or-later
#
# What people get from the app on a real Nextcloud: the CI job "server" runs it through the
# shared action nextcloud-app-server of dawid/ci-actions, which installs the app and sets OCC,
# NEXTCLOUD_URL, NEXTCLOUD_USER and NEXTCLOUD_PASSWORD (an admin). As a person who is no admin
# and reads German: "Vaults" in the app menu, translated, leads to the vaults' view in Files;
# the Files page loads the integration (translations and module before Files' own scripts) and
# its styles, and its Content Security Policy allows the previews (blob: media and frames,
# WebAssembly); every script of the integration, its imports followed, is served as JavaScript
# (a module of another type is refused by the browser) and as the checkout has it. A visitor
# who is not signed in is sent to the login. Run from the repository's top.
set -euo pipefail

app=cryptomator_vaults
dir=app/$app
url=${NEXTCLOUD_URL:?}
admin="${NEXTCLOUD_USER:?}:${NEXTCLOUD_PASSWORD:?}"
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT

fail() {
	echo "::error::$*" >&2
	exit 1
}

ocs() {
	curl -fsS -u "$admin" -H 'OCS-APIRequest: true' -H 'Accept: application/json' "$@"
}

# The person, made afresh (also when the server was kept from an earlier run).
person=anna
password="anna-example-$RANDOM-$RANDOM-Tresor"
ocs -X DELETE "$url/ocs/v2.php/cloud/users/$person" >/dev/null 2>&1 || true
ocs -X POST "$url/ocs/v2.php/cloud/users" -d userid="$person" --data-urlencode password="$password" \
	-d displayName='Anna Example' >/dev/null
ocs -X PUT "$url/ocs/v2.php/cloud/users/$person" -d key=language -d value=de >/dev/null
as_person=(-u "$person:$password")

# The app was disabled and enabled again just before: the web server may take a moment to
# see it enabled (its caches), so the menu's route is waited for.
location=
for _ in $(seq 30); do
	read -r status location < <(curl -sS -o /dev/null "${as_person[@]}" \
		-w '%{http_code} %header{location}\n' "$url/index.php/apps/$app/")
	[ "$status" = 303 ] && break
	sleep 1
done
[ "$status" = 303 ] || fail "/apps/$app/ answered $status, not a redirect"
case $location in
*/apps/files/cryptomator-vaults) echo "OK: Vaults in the menu leads to the vaults' view in Files" ;;
*) fail "/apps/$app/ leads to $location, not to Files' view cryptomator-vaults" ;;
esac

# As a browser asks: Nextcloud answers other clients 401.
read -r status location < <(curl -sS -o /dev/null -H 'Accept: text/html' \
	-w '%{http_code} %header{location}\n' "$url/index.php/apps/$app/")
if [ "$status" != 303 ] || [[ $location != /login* ]]; then
	fail "/apps/$app/ without signing in answered $status $location, not the login"
fi
echo "OK: without signing in, the login"

entry=$(curl -fsS "${as_person[@]}" -H 'OCS-APIRequest: true' -H 'Accept: application/json' \
	"$url/ocs/v2.php/core/navigation/apps" | jq -c --arg app "$app" '.ocs.data[] | select(.app == $app)')
if [ "$(jq -r .href <<<"$entry")" != "/apps/$app/" ] || [ "$(jq -r .name <<<"$entry")" != Tresore ]; then
	fail "the app menu's entry is not \"Tresore\" at /apps/$app/: ${entry:-none}"
fi
echo "OK: the app menu has Tresore, in the person's language"

curl -fsS "${as_person[@]}" -D "$work/headers" -o "$work/files.html" "$url/index.php/apps/files/"
policy=$(tr -d '\r' <"$work/headers" | sed -n 's/^content-security-policy: *//Ip')
for wanted in "media-src [^;]*blob:" "frame-src [^;]*blob:" "script-src [^;]*'wasm-unsafe-eval'"; do
	grep -Eq "(^|;)$wanted" <<<"$policy" || fail "the Files page's policy lacks $wanted: $policy"
done
echo "OK: the Files page's policy allows blob: media and frames, and WebAssembly"

# The page's scripts in their order, each as its path without the cache's ?v=.
sed -n 's/.*<script[^>]* src="\([^"?]*\).*/\1/p' "$work/files.html" >"$work/scripts"
line() {
	grep -nxF -m1 -- "$1" "$work/scripts" | cut -d: -f1
}
module=$(grep -m1 "/$app/js/$app-files\.mjs$" "$work/scripts") || fail "the Files page has no $app-files.mjs"
web=${module%/js/*}
translations=$(line "$web/l10n/de.js") || fail "the Files page has no $web/l10n/de.js"
files=$(line /dist/files-main.js) || fail "the Files page has no /dist/files-main.js"
if [ "$translations" -gt "$(line "$module")" ] || [ "$(line "$module")" -gt "$files" ]; then
	fail "the integration's translations and module are not before Files' scripts"
fi
grep -q "type=\"module\" src=\"$module?" "$work/files.html" || fail "$module is not loaded as a module"
grep -q "href=\"$web/css/files.css?" "$work/files.html" || fail "the Files page has no $web/css/files.css"
echo "OK: the Files page loads the translations, then the module, before Files' own scripts"

# Served as the checkout has it, with its type; a module's imports are followed.
served() {
	local path=$1 type=$2 got
	got=$(curl -fsS -o "$work/served" -w '%{content_type}' "$url$web/$path") || fail "$web/$path is not served"
	[[ $got == "$type"* ]] || fail "$web/$path is served as $got, not $type"
	cmp -s "$work/served" "$dir/$path" || fail "$web/$path is not the checkout's"
}
queue=("js/$app-files.mjs")
declare -A seen=()
while [ "${#queue[@]}" -gt 0 ]; do
	path=${queue[0]}
	queue=("${queue[@]:1}")
	[ -z "${seen[$path]:-}" ] || continue
	seen[$path]=1
	served "$path" text/javascript
	while read -r imported; do
		queue+=("js/${imported#./}")
	done < <(grep -o "\"\./$app-[A-Za-z0-9._-]*\.mjs\"" "$dir/$path" | tr -d '"' | sort -u)
done
modules=("$dir"/js/"$app"-*.mjs)
[ "${#seen[@]}" -eq "${#modules[@]}" ] \
	|| fail "the integration loads ${#seen[@]} of the ${#modules[@]} modules in js/"
for path in l10n/de.js l10n/pl.js; do served "$path" text/javascript; done
for path in css/files.css "css/$app-files.css"; do served "$path" text/css; done
for path in img/app.svg img/file.svg; do served "$path" image/svg+xml; done
echo "OK: the ${#seen[@]} modules, the translations, styles and icons are served as committed"

ocs -X DELETE "$url/ocs/v2.php/cloud/users/$person" >/dev/null
