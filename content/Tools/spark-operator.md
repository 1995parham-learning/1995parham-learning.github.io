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
oc project spark-operator

helm repo add spark-operator https://kubeflow.github.io/spark-operator
helm repo update

helm install spark-operator spark-operator/spark-operator --namespace spark-operator --set webhook.enable=true
```

After the installation, to make sure everything work as expected you can try out the `spark-pi` example:

```bash
wget https://raw.githubusercontent.com/kubeflow/spark-operator/master/examples/spark-pi.yaml
oc apply -f spark-pi.yaml
```

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
    name: spark-role
rules:
    - apiGroups:
          - ""
      resources:
          - pods
          - pods/log
          - services
          - configmaps
          - persistentvolumeclaims
      verbs:
          - create
          - delete
          - deletecollection
          - get
          - list
          - patch
          - update
          - watch
    - apiGroups:
          - sparkoperator.k8s.io
      resources:
          - sparkapplications
      verbs:
          - create
          - delete
          - deletecollection
          - get
          - list
          - patch
          - update
          - watch
    - apiGroups:
          - sparkoperator.k8s.io
      resources:
          - sparkapplications/status
      verbs:
          - get
          - list
          - watch
    - apiGroups:
          - sparkoperator.k8s.io
      resources:
          - scheduledsparkapplications
      verbs:
          - create
          - delete
          - deletecollection
          - get
          - list
          - patch
          - update
          - watch
```
