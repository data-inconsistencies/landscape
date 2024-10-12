# data architecture landscape

## toolstack overview

- frontend
    - landscape2 https://github.com/cncf/landscape2
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
- sops
- age
- text editor of choice (Vscode?)

> on osx brew is an easy package manager to get all the requirements 

```bash
brew install cncf/landscape2/landscape2
# TODO add other tools
```

### steps

> prior to moving forward if you need the secrets you MUST have obtained an authorized key. See [Adding a new age key](documentation/secops/add-key.md) for details how to get access.

```bash
git clone git@github.com:data-inconsistencies/landscape.git
cd landscape

make secrets-decrypt
```

then read the readme there:

```bash
make build
make serve
make deploy
```
