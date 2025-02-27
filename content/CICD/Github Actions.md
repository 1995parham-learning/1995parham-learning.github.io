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

```yaml
name: CI

on:
    push:
        branches: ["main"] # Run on pushes to the 'main' branch
jobs:
    build:
        runs-on: ubuntu-latest # Use the latest Ubuntu image

        steps:
            - uses: actions/checkout@v3 # Check out your repository's code

            - name: Set up Node.js
              uses: actions/setup-node@v3
              with:
                  node-version: 16 # Specify the desired Node.js version

            - name: Install dependencies
              run: npm install

            - name: Run tests
              run: npm test
```

**Explanation:**

- **`name`:** Gives a name to your workflow for easy identification.
- **`on`:** Defines the events that trigger the workflow (in this case, pushes to the "main" branch).
- **`jobs`:** A collection of jobs that run in parallel.
- **`runs-on`:** Specifies the virtual environment where the job will run.
- **`steps`:** A sequence of tasks that execute within the job.

## Triggers: The Heartbeat of Your Workflows

Triggers are the events that initiate the execution of your GitHub Actions workflows. They act as the starting point, determining when and why your workflows should run.

Common Triggers:

- `push`: This is the most common trigger. It initiates a workflow whenever code is pushed to the specified branches or tags in your repository.

```yaml
on:
    push:
        branches: ["main", "develop"]
        tags:
            - "v[0-9]+.[0-9]+.[0-9]+"
```

- `pull_request`: Triggers a workflow when a pull request is opened, edited, or closed.

```yaml
on:
    pull_request:
        branches: ["main"]
```

- `workflow_dispatch`: Allows you to manually trigger a workflow from the GitHub UI. This is useful for debugging, running one-off tasks, or executing workflows on demand

```yaml
on:
    workflow_dispatch:
        inputs:
            my_input:
                description: "A required input"
                required: true
```

- `schedule`: Enables you to schedule workflows to run periodically.

```yaml
on:
    schedule:
        - cron: "0 0 * * *" # Run daily at midnight
```

- `repository_dispatch`: Triggers workflows across all repositories in an organization when an event is dispatched from another repository.
- `workflow_call` is used to indicate that a workflow can be called by another workflow. When a workflow is triggered with the `workflow_call` event, the event payload in the called workflow is the same event payload from the calling workflow.
- Other events: Includes events like `issues`, `release`, `deployment`, and more.

## Pre-defined Actions

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

## Supercharging GitHub Actions with Job Summaries

The same familiar functionality that powers pull requests, issues, and README files has come to GitHub Actions! We’re thrilled to announce GitHub Actions Job Summaries, which allow for custom Markdown content on the run summary generated by each job. Custom Markdown content can be used for a variety of creative purposes, such as:

- Aggregating and displaying test results
- Generating reports
- Custom output independent of logs

### Create summaries

Simply output Markdown content to a new environment variable we’ve introduced called [$GITHUB_STEP_SUMMARY](https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables). Any Markdown content added to this file will then be displayed on the Actions run summary page. That’s it!

```yaml
steps:
  - name: Adding markdown
    run: echo '### Hello world! 🚀' >> $GITHUB_STEP_SUMMARY
```

![[Pasted image 20250129132409.png]]
To make it easier for Actions authors to generate Job Summaries, we’ve also added a new helper utility to the [@actions/core](https://www.npmjs.com/package/@actions/core) npm package.

## Actions Cheat Sheet

### Workflow Syntax

Workflow files use YAML syntax, and must have either a .yml or .yaml file extension. You must store workflow files in the `.github/workflows/` directory of your repository. Each different YAML file corresponds to a different workflow.

```yaml
name: My Workflow
on:
    push:
        branches:
            - "releases/*"
            - "!releases/**-alpha"
env:
    message: "conversation"
    my_token: ${{ secrets.GITHUB_TOKEN }}
jobs:
    my_build:
        runs-on: ubuntu-latest
        steps:
            - name: Checking out our code
              uses: actions/checkout@master
            - name: Say something
              run: |
                  echo "A little less ${message}"
                  echo "A little more action"
    my_job:
        needs: my_build
        container:
            image: node:10.16-jessie
            env:
                NODE_ENV: development
            ports:
                - 80
            volumes:
                - my_docker_volume:/volume_mount
            options: --cpus 1
        services:
            redis:
                image: redis
                ports:
                    - 6379/tcp
```

### Workflow `name`

The name of your workflow will be displayed on your repository’s actions page.

### Workflow, Job or Step `env`

A map of environment variables which can be set at different scopes. Several environment variables are available by default (`GITHUB_SHA`, `GITHUB_REF`, `GITHUB_EVENT_NAME`, `HOME`, `GITHUB_EVENT_PATH`…​) as well as a secret, `GITHUB_TOKEN`, which you can leverage for API calls or git commands through the `secrets` context.

### `on` Event

The type event that triggers the workflow. You can provide a single event string, an array of events, or an event configuration map that restricts the execution of a workflow:

- When using the `push` and `pull_request` events, `branches` and `tags` allow to select or exclude (with the `!` prefix) git references the workflow will run on, while `paths` specifies which files must have been modified in order to run the workflow.
- If your rules are only made of exclusions, you can use `branches-ignore`, `tags-ignore` and `paths-ignore`. The `-ignore` form and its inclusive version cannot be mixed.
- The `types` keyword enables you to narrow down activities (`opened`, `created`, `edited`…​) causing the workflow to run. The list of available activities depends on the event.
- A workflow trigger can also be scheduled:

```yaml
on:
    schedule:
        - cron: "*/15 * * * *"
```

### `jobs` Collection

A workflow run is made up of one or more jobs identified by a unique `job_id` (`my_build` or `my_job`). Jobs run in parallel by default unless queued with the `needs` attribute. Each job runs in a fresh instance of the virtual environment specified by `runs-on`.

#### Job `name`

The name of the job displayed on GitHub.

#### `needs`

Identifies any job that must complete successfully before this job will run. It can be a string or array of strings. If a job fails, all jobs that need it are skipped unless the jobs use a conditional statement that causes the job to continue.

#### `runs-on`

The type of virtual host machine to run the job on. Can be either a GitHub or self-hosted runner. Jobs can also run in user-specified containers (see: `container`). Available GitHub-hosted virtual machine types are `ubuntu-latest`, `windows-latest`, `macOS-latest` plus some other specific versions for each operating system, in the form of `ubuntu-xx.xx`, `macOS-xx.xx` or `windows-xxxx`. To specify a self-hosted runner for your job, configure `runs-on` in your workflow file with self-hosted runner labels. Example: `[self-hosted, linux]`.

#### `container`

Instead of running directly on a host selected with `runs-on`, a container can run any steps in a job that don’t already specify a container. If you have steps that use both script and container actions, the container actions will run as sibling containers on the same network with the same volume mounts. This object has the following attributes: `image`, `env`, `ports`, `volume` and `options`.

#### `timeout-minutes`

The maximum number of minutes to let a workflow run before GitHub automatically cancels it. Default: 360

#### `services`

Additional containers to host services for a job in a workflow. These are useful for creating databases or cache services. The runner on the virtual machine will automatically create a network and manage the lifecycle of the service containers. Each service is a named object in the `services` collection (`redis` or `nginx` for example) and can receive the same parameters than the `container` object.

### Job `steps`

A job contains a sequence of tasks called `steps`. Steps can run commands, run setup tasks, or run an action from your repository, a public repository, or an action published in a Docker registry. Each step runs in its own process in the virtual environment and has access to the workspace and filesystem.

#### Step `name`

Specify the label to be displayed for this step in GitHub. It’s not required but does improve readability in the logs.

#### `uses`

Specify an action to run as part of a step in your job. You can use an action defined in the same repository as the workflow, a public repository elsewhere on GitHub, or in a published Docker container image. Including the version of the action you are using by specifying a Git ref, branch, SHA, or Docker tag is strongly recommended:

- `uses: {owner}/{repo}@{ref}` for actions in a public repository
- `uses: {owner}/{repo}/{path}@{ref}` for actions in a subdirectory of a public repository
- `uses: ./path/to/dir` for actions in a a subdirectory of the same repository
- `uses: docker://{image}:{tag}` for actions on Docker Hub
- `uses: docker://{host}/{image}:{tag}` for actions in a public registry

#### `with`

A map of the input parameters defined by the action in its `action.yml` file. When the acion is container based, special parameter names are:

- `args`, a string that defines the inputs passed to a Docker container’s `ENTRYPOINT`. It is used in place of the `CMD` instruction in a `Dockerfile`.
- `entrypoint`, a string that defines or overrides the executable to run as the Docker container’s `ENTRYPOINT`.

#### `if`

Prevents a step from running unless a condition is met. The value is an expression without the `${{ …​ }}` block.

#### `run`

Instead of running an existing action, a command line program can be run using the operating system’s shell. Each run keyword represents a new process and shell in the virtual environment. A specific shell can be selected with the `shell` attribute. Multiple commands can be run in a single shell instance using the `|` (pipe) operator.

### Job `strategy`

A build matrix strategy is a set of different configurations of the virtual environment. The job’ set of steps will be executed on each of these configurations. The following exemple specifies 3 nodejs versions on 2 operating systems:

```yaml
runs-on: ${{ matrix.os }}
strategy:
    matrix:
        os: [ubuntu-16.04, ubuntu-18.04]
        node: [6, 8, 10]
steps:
    - uses: actions/setup-node@v1
      with:
          node-version: ${{ matrix.node }}
```

#### `fail-fast`

When set to `true` (default value), GitHub cancels all in-progress jobs if any of the matrix job fails.

### Context and expressions

Expressions can be used to programmatically set variables in workflow files and access contexts. An expression can be any combination of literal values, references to a context, or functions. You can combine literals, context references, and functions using operators. With the exception of the `if` key, expressions are written in a `${{ …​ }}` block. Contexts are objects providing access to runtime information. The following objects are available: `github`, `job`, `steps`, `runner`, `secrets`, `strategy` and `matrix`.

### Artifact storage & Caching

An artifact is a file or collection of files produced during a workflow run that can be stored and shared between jobs in a workflow run. Use actions `actions/upload-artifact` and `actions/download-artifact` with parameters `name` and `path` to manipulate artifacts. Artifacts can be downloaded through the Web interface for 90 days.

For dependencies and other commonly reused files across runs of a given workflow, use the `actions/cache` action with parameters:

- `key`: The key used to save and search for a cache.
- `path`: The file path (absolute or relative to the working directory) on the runner to cache or restore.
- `restore-keys`: Optional - An ordered list of alternative keys to use for finding the cache if no cache hit occurred for key.

```yaml
- uses: actions/checkout@v1
- name: Cache node modules
  uses: actions/cache@v1
  with:
      path: node_modules
      key: x-y-${{hashFiles('**/package-lock.json')}}
      restore-keys: |
          x-y-
          x-
```
