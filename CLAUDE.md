# CLAUDE.md

Data lakehouse landscape, built with [landscape2](https://github.com/cncf/landscape2) and served by GitHub Pages from
`gh-pages` at https://data-inconsistencies.github.io/landscape/.

## Commands
- `make setup` once, and `scripts/install-landscape2.sh` (pinned version and checksums; update them together)
- `make test` checks everything offline. `make links` checks links and archived repositories.
- `make build && make serve` for a local look. `make build-public` is what gets deployed.
- Deploy: run the Deploy workflow on GitHub, or `make deploy` with `GITHUB_TOKENS` set. A person starts it.

## Process
Intent, spec and plan are in `intent/`. Change the spec before changing the rules, and keep the plan in step with the
work. Every change goes through a pull request that a person approves; never push to `main`.

## Adding a component
1. Check the homepage, and that the repository is not archived or moved. Do not write descriptions from memory.
2. Add one entry to `data.yml` (rules in `intent/spec.md`). Use `second_path` for other layers.
3. Add an SVG to `logos/` and a row to `documentation/logo-sources.md`. Look at the rendered logo: a file with the
   right name can be another company's logo (cncf/landscape's `polaris.svg` is Fairwinds Polaris).

## Known mistakes
- `images.favicon` in `settings.yml` must be a URL. Header and footer logos can be paths.
- `sed -i` differs between macOS and Linux; write to a new file instead.
- Netlify's project settings use `build` as base directory, which is not in the repository. `netlify.toml` overrides it.
- landscape2 fetches `data/*.json` without a version and spins forever when an item is missing from it. GitHub Pages lets
  browsers cache files for 10 minutes, so `scripts/version_data.py` adds the version. Check it still works after a
  landscape2 update (`fetch("./data/full.json")` in its assets).
- landscape2 links stop click events from bubbling and some are buttons that call `window.open`: track both in
  `analytics/analytics.mjs`.
- ASF podlings need "(Incubating)" in the name. Check https://whimsy.apache.org/public/public_podlings.json.

## Done means
`make test` and `make build-public` pass, with the output shown. If a check fails, fix the data or the code, not the
check.
