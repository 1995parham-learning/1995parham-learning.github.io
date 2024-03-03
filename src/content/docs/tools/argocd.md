---
title: ArgoCD
---

## Argo Workflows

Argo Workflows is an open source container-native workflow engine for orchestrating parallel jobs on Kubernetes.
Argo Workflows is implemented as a Kubernetes CRD.

- Define workflows where each step in the workflow is a container.
- Model multistep workflows as a sequence of tasks or capture the dependencies between tasks using a graph (DAG).
- Easily run compute intensive jobs for machine learning or data processing in a fraction of the time
  using Argo Workflows on Kubernetes.
- Run CI/CD pipelines natively on Kubernetes without configuring complex software development products.

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
