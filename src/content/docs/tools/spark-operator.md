---
title: Spark Operator
---

In Spark 2.3, Kubernetes becomes an official scheduler backend for Spark, additionally to the standalone scheduler,
Mesos, and Yarn. Compared with the alternative approach of deploying a standalone Spark cluster on top of Kubernetes and
submit applications to run on the standalone cluster, having Kubernetes as a native scheduler backend offers some
important benefits.

However, the way life cycle of Spark applications are managed, e.g. how applications get submitted to run on Kubernetes
and how application status is tracked, are vastly different from other types of workloads on Kubernetes, e.g.,
deployments, daemonsets, and statefulsets.
