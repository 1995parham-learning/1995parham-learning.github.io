---
title: GitHub Actions
icon: skill-icons:githubactions-light
---

## Introduction

GitHub's actions are an awesome way to have CI on GitHub.
It runs on **VM**, can run Container and even release things for you.
First, you need to specify the events that trigger the action.

```yaml
name: install dotfiles
on:
  push:
    paths:
      - .github/workflows/install.yaml
      - install.sh
      - scripts/env.sh
      - start.sh
```

Then you need to use pre-defined actions to install the required tools:

- [@actions/setup-node](https://github.com/actions/setup-node)
- [@actions/setup-go](https://github.com/actions/setup-go)
- [@actions/setup-python](https://github.com/actions/setup-python)
- [@azure/setup-helm](https://github.com/azure/setup-helm)

:::note
To reduce the build time, use caching mechanisms. Usually official setup tools supports caching
based on the dependency management tools (e.g. `go.sum`, `packages-lock.json`, etc.)
:::

For some programming languages, there is no official action:

- [GitHub Action to compile LaTeX documents](https://github.com/xu-cheng/latex-action)
- [Sets up `Tectonic` in your GitHub Actions workflow, so you can compile your LaTeX documents](https://github.com/wtfjoke/setup-tectonic)

For building docker images and pushing them you can use:

- [GitHub Action to build and push Docker images with `Buildx`](https://github.com/docker/build-push-action)
- [GitHub Action to extract metadata (tags, labels) from Git reference and GitHub events for Docker](https://github.com/docker/metadata-action)

For releasing Helm charts (using HTTP Helm repositories not OCI one):

- [A GitHub Action to turn a GitHub project into a self-hosted Helm chart repo, using helm/chart-releaser CLI tool](https://github.com/helm/chart-releaser-action)

For doing release:

- [GitHub Action for creating GitHub Releases](https://github.com/softprops/action-gh-release)

## References

- [Reference](https://docs.github.com/en/actions/reference)
