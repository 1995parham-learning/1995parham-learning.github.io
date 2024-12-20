---
title: Ceph
icon: simple-icons:ceph
---

Ceph delivers object, block, and file storage in one unified system.
Ceph is highly reliable, easy to manage, and free. The power of Ceph can transform your company's IT
infrastructure and your ability to manage vast amounts of data.

[Cephadm](https://docs.ceph.com/en/latest/cephadm/install/#cephadm-deploying-new-cluster)
is a tool that can be used to install and manage a Ceph cluster.

- cephadm supports only Octopus and newer releases.
- cephadm is fully integrated with the orchestration API and fully supports the CLI and dashboard features that are used to manage cluster deployment.
- cephadm requires container support (in the form of Podman or Docker) and Python 3.
- cephadm requires systemd.

[Rook](https://rook.io/) deploys and manages Ceph clusters running in Kubernetes, while also enabling management of storage resources and provisioning via Kubernetes APIs.
We recommend Rook as the way to run Ceph in Kubernetes or to connect an existing Ceph storage cluster to Kubernetes.

- Rook supports only Nautilus and newer releases of Ceph.
- Rook is the preferred method for running Ceph on Kubernetes, or for connecting a Kubernetes cluster to an existing (external) Ceph cluster.
- Rook supports the orchestrator API. Management features in the CLI and dashboard are fully supported.

## Ceph Object Gateway

Ceph Object Gateway is an object storage interface built on top of librados.
It provides a RESTful gateway between applications and Ceph Storage Clusters.
Ceph Object Storage supports two interfaces:

- S3-compatible: Provides object storage functionality with an interface that is compatible with a large subset of the Amazon S3 RESTful API.
- Swift-compatible: Provides object storage functionality with an interface that is compatible with a large subset of the OpenStack Swift API.
