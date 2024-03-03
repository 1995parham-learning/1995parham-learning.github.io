---
title: ArgoCD
---

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
