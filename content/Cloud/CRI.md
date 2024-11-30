> CRI: the Container Runtime Interface

## What is CRI?

CRI (_Container Runtime Interface_) consists of a specifications/requirements, protobuf API, and libraries for container runtimes to integrate with kubelet on a node. The CRI API is currently in Alpha, and the CRI-Docker integration is used by default as of Kubernetes 1.7+.

## Why develop CRI?

Prior to the existence of CRI, container runtimes (e.g., `docker`, `rkt`) were integrated with kubelet through implementing an internal, high-level interface in kubelet. The entrance barrier for runtimes was high because the integration required understanding the internals of kubelet and contributing to the main Kubernetes repository. More importantly, this would not scale because every new addition incurs a significant maintenance overhead in the main Kubernetes repository.

Kubernetes aims to be extensible. CRI is one small, yet important step to enable pluggable container runtimes and build a healthier ecosystem.

## CRI runtimes

-   [cri-o](https://github.com/cri-o/cri-o)
-   [rktlet](https://github.com/kubernetes-retired/rktlet)
-   [frakti](https://github.com/kubernetes/frakti)
-   [cri-containerd](https://github.com/containerd/cri)
-   [singularity-cri](https://github.com/sylabs/singularity-cri)

## What is the OCI Runtime Spec?

The OCI Runtime Spec defines the behavior and the configuration interface of low-level container runtimes such as [runc](https://github.com/opencontainers/runc). The spec is also implemented by [crun](https://github.com/containers/crun), [youki](https://github.com/containers/youki), [gVisor](https://gvisor.dev/), [Kata Containers](https://katacontainers.io/), and others. These low-level container runtimes are usually called from high-level container runtimes such as [containerd](https://containerd.io/) and [CRI-O](https://cri-o.io/).

A Standard Container bundle contains all the information needed to load and run a container. This includes the following artifacts:
1. `config.json`: contains configuration data. This **REQUIRED** file **MUST** reside in the root of the bundle directory and **MUST** be named `config.json`.
2. container’s root filesystem: the directory referenced by `root.path`, if that property is set in `config.json`.