## Introduction to CI/CD

- **CI (Continuous Integration):** This practice involves developers frequently merging their code changes into a central repository (like GitHub) throughout the development cycle.
    - **Benefits:**
        - Early detection of integration issues.
        - Faster feedback loops.
        - Improved code quality.
        - Reduced risk of errors.
- **CD (Continuous Delivery/Deployment):**
    - **Continuous Delivery:** Automates the release process, ensuring that software is always in a deployable state.
    - **Continuous Deployment:** Automates the release process further by automatically deploying every change to production after passing the necessary tests.

## Introduction

GitHub's actions is a powerful CI/CD platform built into GitHub. It allows you to automate your software workflows, from building and testing to deploying to various environments.

- **Workflows:** Define a series of jobs that run in sequence or in parallel.
- **Jobs:** A set of steps that execute on a virtual machine.
- **Steps:** Individual tasks within a job, such as running a script, checking out code, or deploying to a server.
- **Actions:** Reusable units of work, often provided by the community or created by you.
- **Integrations:** Seamlessly integrates with other GitHub features like issues, pull requests, and releases.

## Tutorial: Creating a Simple GitHub Action

Let's create a basic workflow that runs tests on your code whenever you push changes to your repository.

**1. Create a Workflow File**

- Create a new file named `.github/workflows/ci.yml` in your repository. This file defines your workflow.

**2. Define the Workflow**

YAML

It runs on **VM**, can run Container and even release things for you. First, you need to specify the events that trigger the action.

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
- [@extractions/setup-just](https://github.com/extractions/setup-just)

> [!note]
> To reduce the build time, use caching mechanisms. Usually official setup tools supports caching based on the dependency management tools (e.g. `go.sum`, `packages-lock.json`, etc.)

```yaml
- uses: actions/setup-python@v5
  with:
      python-version: "3.13"
      cache: "pipenv"

- uses: actions/setup-python@v5
  with:
      python-version: "3.13"
      cache: "poetry"

- uses: actions/setup-go@v5
  with:
      go-version-file: "go.mod"

- uses: actions/setup-node@v4
  with:
      node-version: 21
      cache: "npm"
      cache-dependency-path: "package-lock.json"
```

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
