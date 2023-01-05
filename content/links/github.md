---
title: github
---

## Actions

GitHub actions are awesome way to have CI on GitHub. It can do VM, Container and even Release things for you.
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

- [Reference](https://docs.github.com/en/actions/reference)
- [GitHub Action for creating GitHub Releases](https://github.com/softprops/action-gh-release)
- [GitHub Action to build and push Docker images with Buildx](https://github.com/docker/build-push-action)
- [GitHub Action to compile LaTeX documents](https://github.com/xu-cheng/latex-action)
- [GitHub Action to extract metadata (tags, labels) from Git reference and GitHub events for Docker](https://github.com/docker/metadata-action)
- [A GitHub Action to turn a GitHub project into a self-hosted Helm chart repo, using helm/chart-releaser CLI tool](https://github.com/helm/chart-releaser-action)
