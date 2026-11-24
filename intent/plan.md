# Plan

| # | Change | Files | Proof |
|---|--------|-------|-------|
| 1 | Replace placeholders with researched components | `data.yml` | `make test`, `make links` |
| 2 | SVG logos with recorded sources | `logos/`, `documentation/logo-sources.md` | `make test`, contact sheet looked at by eye |
| 3 | Own branding, both groups, footer, featured formats | `settings.yml`, `branding/` | build, browser check |
| 4 | Real guide and quiz | `guide.yml`, `games.yml` | `make test` |
| 5 | landscape2 1.1.0, pinned with a checksum | `scripts/install-landscape2.sh` | CI build |
| 6 | Deterministic checks and their tests | `scripts/check.py`, `scripts/check_links.py`, `tests/` | `make test` |
| 7 | One build script, safe deploy (normal commit, no force-push) | `scripts/build-site.sh`, `scripts/deploy.sh` | deploy to a local copy of the repository |
| 8 | CI: test and build every pull request; deploy only when a person starts it | `.github/workflows/` | workflow runs |
| 9 | Working Netlify previews, no Netlify production site | `netlify.toml` | preview check on the pull request |
| 10 | Data Quality and Observability layer, in both groups | `data.yml`, `logos/`, `settings.yml`, `guide.yml`, `games.yml` | `make test`, build, browser check |
| 11 | CLAUDE.md and REVIEW.md | | none |

Riskiest step: 7, because it replaces everything on `gh-pages`.
Left out: Crunchbase data, archived projects, a scheduled link check.
