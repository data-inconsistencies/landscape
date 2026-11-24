#!/bin/bash

# Update settings.yml: the public site is served from a subpath of GitHub Pages, local `make serve` from the root
sed -i.bak 's|http://127.0.0.1:8000|https://data-inconsistencies.github.io/landscape|g' settings.yml && rm settings.yml.bak
printf '\nbase_path: /landscape\n' >> settings.yml

# Build the project
landscape2 build --data-file data.yml --settings-file settings.yml --guide-file guide.yml --games-file games.yml --logos-path logos --output-dir build
git checkout settings.yml

# Check for changes and deploy
if [[ -n $(git status --porcelain) ]]; then
    git checkout gh-pages
    git stage -f build
    git commit -m "update static build for pages"
    git subtree push -f --prefix build origin gh-pages
else
    echo "No changes to commit."
fi

# Checkout back to main branch
git checkout main
