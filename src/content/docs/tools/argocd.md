---
title: ArgoCD
icon: devicon:argocd
---

## Argo CD

Argo CD is a declarative, GitOps continuous delivery tool for Kubernetes.

## Argo Workflows

Argo Workflows is an open source **container-native** workflow engine for orchestrating parallel jobs on Kubernetes.
It is implemented as a Kubernetes CRD.

- Define workflows where each step in the workflow is a container.
- Model multistep workflows as a sequence of tasks or capture the dependencies between tasks using a graph (DAG).
- Easily run compute intensive jobs for machine learning or data processing in a fraction of the time
  using Argo Workflows on Kubernetes.
- Run CI/CD pipelines natively on Kubernetes without configuring complex software development products.

### Hello World

Below, we run a container on a Kubernetes cluster using an Argo workflow template.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow # new type of k8s spec
metadata:
  generateName: hello-world- # name of the workflow spec
spec:
  entrypoint: whalesay # invoke the whalesay template
  templates:
    - name: whalesay # name of the template
      container:
        image: docker/whalesay
        command: [cowsay]
        args: ["hello world"]
        resources: # limit the resources
          limits:
            memory: 32Mi
            cpu: 100m
```

Argo adds a new kind of Kubernetes spec called a `Workflow`.
The above spec contains a single template called `whalesay` which runs the `docker/whalesay` container and
invokes `cowsay "hello world"`. The `whalesay` template is the `entrypoint` for the spec.
The `entrypoint` specifies **the initial template** that should be invoked when the workflow spec is executed by Kubernetes.
Being able to specify the `entrypoint` is more useful when there is more than one template defined in the Kubernetes workflow spec.

### The `Workflow`

The Workflow is the most important resource in Argo and serves two important functions:

- It defines the workflow to be executed.
- It stores the state of the workflow.

Because of these dual responsibilities, a Workflow should be treated as a _live object_.
It is not only a static definition, but is also an "instance" of said definition.
(If it isn't clear what this means, it will be explained below).

The workflow to be executed is defined in the `Workflow.spec` field.
The core structure of a Workflow spec is a list of `templates` and an `entrypoint`.

`templates` can be loosely thought of as "functions": they define instructions to be executed.
The `entrypoint` field defines what the "main" function will be – that is, the template that will be executed first.

### `template` Types

There are 6 types of templates, divided into two different categories.

These templates define work to be done, usually in a Container.

#### CONTAINER

Perhaps the most common template type, it will schedule a Container.
The spec of the template is the same as the Kubernetes container spec, so you can define
a container here the same way you do anywhere else in Kubernetes.

```yaml
- name: whalesay
  container:
    image: docker/whalesay
    command: [cowsay]
    args: ["hello world"]
```

#### SCRIPT

A convenience wrapper around a container. The spec is the same as a container, but adds the `source`
field which allows you to define a script in-place. The script will be saved into a file and executed for you.
The result of the script is automatically exported into an Argo variable either `{{tasks.<NAME>.outputs.result}}`
or `{{steps.<NAME>.outputs.result}}`, depending on how it was called.

```yaml
- name: gen-random-int
  script:
    image: python:alpine3.6
    command: [python]
    source: |
      import random
      i = random.randint(1, 100)
      print(i)
```

#### RESOURCE

Performs operations on cluster Resources directly. It can be used to get, create, apply, delete, replace,
or patch resources on your cluster.

```yaml
- name: k8s-owner-reference
  resource:
    action: create
    manifest: |
      apiVersion: v1
      kind: ConfigMap
      metadata:
        generateName: owned-eg-
      data:
        some: value
```

## Argo Events

Argo Events is an event-driven workflow automation framework for Kubernetes which helps you trigger K8s objects,
Argo Workflows, Serverless workloads, etc. on events from a variety of sources like webhooks, S3, schedules,
messaging queues, GCP PubSub, SNS, SQS, etc.

### Architecture

![argo-events-architecture](./argocd/argo-events-architecture.png)

### Event Source

An Event Source defines the configurations required to consume events from external sources like AWS SNS, SQS,
GCP PubSub, Webhooks, etc. It further transforms the events into
the [cloudevents](https://github.com/cloudevents/spec) and dispatches them over to the event bus.

### Event Bus

The Event Bus acts as the transport layer of Argo-Events by connecting the Event Sources and Sensors.

### Sensor

Sensor defines a set of event dependencies (inputs) and triggers (outputs).
It listens to events on the event bus and acts as an event dependency manager to resolve and execute the triggers.

### Trigger

A Trigger is the resource/workload executed by the sensor once the event dependencies are resolved.
