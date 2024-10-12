#!/bin/bash

# Update settings.yml
sed -i 's|http://127.0.0.1:8000|https://landscape.data-inconsistencies.datajourney.expert|g' settings.yml

# Build the project
landscape2 build --data-file data.yml --settings-file settings.yml --guide-file guide.yml --games-file games.yml --logos-path logos --output-dir build

# Check for changes and deploy
if [[ -n $(git status --porcelain) ]]; then
    git checkout settings.yml
    git checkout gh-pages
    git stage -f build
    git commit -m "update static build for pages"
    git subtree push --prefix build origin gh-pages
else
    echo "No changes to commit."
fi

# Checkout back to main branch
git checkout main
