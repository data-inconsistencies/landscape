# Intent: a data lakehouse landscape

Status: draft. A maintainer accepts it by merging the pull request that adds it.

## Problem
The landscape was started from the CNCF landscape template in 2024 and never finished. Most entries were
placeholders ("Item 4", CNCF logo), several real entries had wrong links, the guide was lorem ipsum, the branding was
CNCF's, and the generator was two years old.

## Outcome
A landscape that helps a data engineer see which projects and products fit each layer of
- a data lakehouse with a SQL query engine, and
- a data lakehouse with an analytics processing engine,

with a correct name, logo, link and description for every entry, on the newest landscape2.

## Users
Data engineers and architects choosing components; contributors adding or fixing an entry.

## Constraints
- Static site on GitHub Pages at `/landscape/`. No backend.
- Adding a component is a data edit plus one SVG logo, reviewable in a pull request.
- Being listed is not an endorsement. No ranking here: that is what the ELO rankings on the website are for.

## Open questions
- Should archived projects be shown as archived, or left out? (Left out for now: Amundsen, the open source MinIO server.)
- Should Crunchbase data for companies be shown? (Not now: it needs an enterprise API key.)
