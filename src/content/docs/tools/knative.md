---
title: Knative
---

## What is Knative?

Knative is a platform-agnostic solution for running serverless deployments.

## Knative Serving

Knative Serving defines a set of objects as Kubernetes Custom Resource Definitions (CRDs).
These resources are used to define and control how your serverless workload behaves on the cluster.

![Object Model](./knative/object_model.png)

The primary Knative Serving resources are Services, Routes, Configurations, and Revisions:

- **Services**: The `service.serving.knative.dev` resource automatically manages the whole lifecycle of your workload.
  It controls the creation of other objects to ensure that your app has a route, a configuration, and a new revision
  for each update of the service. Service can be defined to always route traffic to the _latest revision_ or
  to a _pinned revision_.
- **Routes**: The `route.serving.knative.dev` resource maps a network endpoint to one or more revisions.
  You can manage the traffic in several ways, including fractional traffic and named routes.
- **Configurations**: The `configuration.serving.knative.dev` resource maintains the desired state for your deployment.
  It provides a clean **separation between code and configuration** and follows the Twelve-Factor App methodology.
  Modifying a configuration creates a new revision.
- **Revisions**: The `revision.serving.knative.dev` resource is a point-in-time snapshot of the code and configuration
  for each modification made to the workload. Revisions are immutable objects and can be retained for as long as useful.
  Knative Serving Revisions can be automatically _scaled up and down according to incoming traffic_.
