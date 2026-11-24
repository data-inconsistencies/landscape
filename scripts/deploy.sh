#!/bin/bash
# Build the public site and publish it as one normal commit on gh-pages (never a force-push).
set -euo pipefail
cd "$(dirname "$0")/.."

scripts/build-site.sh public

site=$(mktemp -d)
trap 'git worktree remove --force "$site"' EXIT
git fetch origin gh-pages
git worktree add --force --detach "$site" FETCH_HEAD
find "$site" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R build/. "$site"
cd "$site"
git add -A --force
if git diff --cached --quiet; then
    echo "No changes to deploy."
else
    git commit -m "Publish landscape"
    git push origin HEAD:gh-pages
fi
