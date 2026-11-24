# Data lakehouse landscape

https://data-inconsistencies.github.io/landscape/

Projects and products for a data lakehouse with a SQL query engine, or with an analytics processing engine. Built from
the CNCF cloud native landscape template. To add or fix an entry, follow [CLAUDE.md](CLAUDE.md) and open a pull request.

## toolstack overview

- frontend
    - landscape2 https://github.com/cncf/landscape2 (version pinned in `scripts/install-landscape2.sh`)
- dev/secops
    - make
    - age
    - sops
    - git


## development setup

### pre-requisites

- zshell with oh-my-zsh and automatic loading of `.env` to environment variables
- git client with ssh authentication
- make
- sops (only for the secrets)
- age (only for the secrets)
- text editor of choice (Vscode?)

- python 3.9 or newer, for the checks

### steps

> prior to moving forward if you need the secrets you MUST have obtained an authorized key. See [Adding a new age key](documentation/secops/add-key.md) for details how to get access.

```bash
git clone git@github.com:data-inconsistencies/landscape.git
cd landscape

make setup
scripts/install-landscape2.sh
make test
make build
make serve
```

Deploy with the Deploy workflow on GitHub. To deploy from your machine instead, run `make secrets-decrypt` so
`GITHUB_TOKENS` is set, then `make deploy`.
