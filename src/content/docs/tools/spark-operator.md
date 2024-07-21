---
title: Spark Operator
---

The Kubernetes Operator for Apache Spark aims to make specifying and running Spark applications as easy and idiomatic
as running other workloads on Kubernetes. It uses Kubernetes custom resources for specifying, running and surfacing
status of Spark applications.

## Introduction

In Spark 2.3, Kubernetes becomes an official scheduler backend for Spark, additionally to the standalone scheduler,
Mesos, and Yarn. Compared with the alternative approach of deploying a standalone Spark cluster on top of Kubernetes and
submit applications to run on the standalone cluster, having Kubernetes as a native scheduler backend offers some
important benefits.

However, the way life cycle of Spark applications are managed, e.g. how applications get submitted to run on Kubernetes
and how application status is tracked, are vastly different from other types of workloads on Kubernetes, e.g.,
deployments, daemonsets, and statefulsets.

## Installation

```bash
helm repo add spark-operator https://kubeflow.github.io/spark-operator
helm repo update

helm install spark-operator spark-operator/spark-operator --namespace spark-operator --set webhook.enable=true
```
