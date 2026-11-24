#!/bin/bash
# Install the pinned landscape2 into a directory (default: .venv/bin). Update the version and checksums together,
# from https://github.com/cncf/landscape2/releases.
set -euo pipefail
VERSION=1.1.0
dir="${1:-$(dirname "$0")/../.venv/bin}"

case "$(uname -s)-$(uname -m)" in
    Darwin-arm64)  target=aarch64-apple-darwin;      sha=316964ef0fb6bce0a6a539326eea6bc75bd9078807896820a7f6969257c5bf8d ;;
    Darwin-x86_64) target=x86_64-apple-darwin;       sha=c58fd4b015355db0896b66e1c6baa1d65f5b0b30b9e1fadab4d257ab4b760f92 ;;
    Linux-x86_64)  target=x86_64-unknown-linux-gnu;  sha=526f1d88b12edfd4c68d2347d9f835f053137c454e3f6e8620a5fe3d490329e9 ;;
    *) echo "No pinned landscape2 for $(uname -s) $(uname -m)." >&2; exit 1 ;;
esac

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
curl -sSfL -o "$tmp/landscape2.tar.xz" \
    "https://github.com/cncf/landscape2/releases/download/v$VERSION/landscape2-$target.tar.xz"
echo "$sha  $tmp/landscape2.tar.xz" | shasum -a 256 -c -
tar -xJf "$tmp/landscape2.tar.xz" -C "$tmp"
mkdir -p "$dir"
cp "$tmp/landscape2-$target/landscape2" "$dir/landscape2"
"$dir/landscape2" --version
