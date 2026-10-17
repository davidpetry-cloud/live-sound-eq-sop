#!/bin/sh
# Checks the simulator, compiles it to ../public/strip.js for the site, then
# restamps the pages' asset URLs.
# Run from anywhere: sh strip/build.sh
set -e
cd "$(dirname "$0")"
dart pub get >/dev/null
dart analyze --fatal-infos
dart test
dart compile js -O2 --no-source-maps -o ../public/strip.js web/main.dart
rm -f ../public/strip.js.deps
node ../scripts/stamp-assets.mjs   # new strip.js, new ?v= in strip.html
