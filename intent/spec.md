# Spec: data lakehouse landscape

## Layers
Eight categories, unchanged from the first version except for clearer subcategory names:
Compute (SQL), Compute (Python), Data Catalog, Data Table Format, Data Storage, Data Orchestration,
BI and Visualization, Semantic Layer.

Both groups (tabs) show every layer except the other group's compute layer. The first version left orchestration, BI
and semantic layers out of the SQL group.

## Entries
- One entry per product, in its main layer. `second_path` shows it in other layers. No duplicates.
- `description`: our own wording, one sentence, at most 160 characters, ending in a period. State what it is, not
  how good it is.
- `homepage_url`: the product page. `repo_url`: the main GitHub repository when it is open source and not archived.
- `logo`: SVG. Prefer the owner's file, then the CNCF or LF AI & Data landscape, then Simple Icons. A raster image
  wrapped in SVG is a last resort. Record the source in `documentation/logo-sources.md`.
- ASF podlings carry "(Incubating)" in the name.
- `project` (maturity) is not used: it means membership of a foundation that runs the landscape.

A project is left out when its repository is archived, or when it does not fit a layer.

## Site
- Open Table Format items are featured (larger), because they are what both kinds of lakehouse share.
- The guide has one chapter per category and subcategory. Quiz options must be items in the landscape.
- Public URL `https://data-inconsistencies.github.io/landscape/`, so the public build sets `url` and `base_path`.
- `404.html` is a copy of `index.html`, so direct visits to `/landscape/guide` and `/landscape/stats` work.

## Acceptance
- `make test` passes: our rules (`scripts/check.py`) and `landscape2 validate`.
- `make build-public` succeeds with the pinned landscape2, and the output has no `127.0.0.1` address.
- `make links` reports no dead link and no archived or moved repository.
- Every logo was looked at and belongs to the product it is on.
