#!/bin/sh
# SPDX-License-Identifier: AGPL-3.0-or-later
#
# Has Cryptomator's own library check what the app writes (tests/compat.test.js).
# With java (25 or later) and mvn on the path, as in CI, they are used; otherwise
# Docker runs them (maven:3.9.11-eclipse-temurin-25), as on a workstation.
set -eu
cd "$(dirname "$0")/.."
work=$(mktemp -d "${TMPDIR:-/tmp}/vault-compat-XXXXXX")
trap 'rm -rf "$work"' EXIT
image=docker.io/library/maven:3.9.11-eclipse-temurin-25
generator=tests/fixtures/generator
# The checker: cryptofs and its dependencies in $work/lib, Verify in $work/classes.
build="mvn -q -f $generator/pom.xml dependency:copy-dependencies -DoutputDirectory=$work/lib && javac -encoding UTF-8 -cp '$work/lib/*' -d $work/classes $generator/src/main/java/*.java"
classpath="$work/classes:$work/lib/*"

if command -v java >/dev/null && command -v mvn >/dev/null; then
	sh -c "$build"
	VERIFY_COMMAND=$(printf '["java", "-Dfile.encoding=UTF-8", "-Dsun.jnu.encoding=UTF-8", "-cp", "%s", "Verify"]' "$classpath")
else
	mkdir -p "$HOME/.m2"
	docker run --rm -v "$HOME/.m2:/root/.m2" -v "$PWD:$PWD" -v "$work:$work" -w "$PWD" "$image" sh -c "$build"
	VERIFY_COMMAND=$(printf '["docker", "run", "--rm", "-e", "LANG=C.UTF-8", "-v", "%s:%s", "%s", "java", "-Dfile.encoding=UTF-8", "-Dsun.jnu.encoding=UTF-8", "-cp", "%s", "Verify"]' "$work" "$work" "$image" "$classpath")
fi
export VERIFY_COMMAND VAULT_TEST_DIR="$work"
node --test tests/compat.test.js
