#!/bin/bash
# Build the landscape into build/.
#   scripts/build-site.sh          for local use, served from the root of http://127.0.0.1:8000
#   scripts/build-site.sh public   for https://data-inconsistencies.github.io/landscape/
#   scripts/build-site.sh preview  for a Netlify preview, served from the root of $DEPLOY_PRIME_URL
# GitHub data (stars, releases, ...) is only collected when GITHUB_TOKENS is set.
set -euo pipefail
cd "$(dirname "$0")/.."
if [[ -z "${LANDSCAPE2:-}" ]]; then
    if [[ -x .venv/bin/landscape2 ]]; then LANDSCAPE2=.venv/bin/landscape2; else LANDSCAPE2=landscape2; fi
fi

settings=settings.yml
case "${1:-}" in
    public)  url=https://data-inconsistencies.github.io/landscape; base_path=/landscape ;;
    preview) url="$DEPLOY_PRIME_URL"; base_path= ;;
    *)       url= ;;
esac
if [[ -n "$url" ]]; then
    # Kept next to settings.yml because logo paths in it are relative. Ignored by git.
    settings=settings.public.yml
    trap 'rm -f settings.public.yml' EXIT
    sed "s|^url: http://127.0.0.1:8000$|url: $url|" settings.yml > "$settings"
    if [[ -n "$base_path" ]]; then printf '\nbase_path: %s\n' "$base_path" >> "$settings"; fi
fi

rm -rf build
"$LANDSCAPE2" build --data-file data.yml --settings-file "$settings" --guide-file guide.yml --games-file games.yml \
    --logos-path logos --output-dir build

python3 scripts/version_data.py build
# Only the public site has analytics: not local builds, not previews.
if [[ "${1:-}" == public ]]; then python3 scripts/add_analytics.py build; fi

# GitHub Pages: no Jekyll, and let the app handle direct visits to pages such as /landscape/guide.
touch build/.nojekyll
cp build/index.html build/404.html
