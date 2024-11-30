> CRI: the Container Runtime Interface

## What is CRI?

CRI (_Container Runtime Interface_) consists of a specifications/requirements, protobuf API, and libraries for container runtimes to integrate with kubelet on a node. The CRI API is currently in Alpha, and the CRI-Docker integration is used by default as of Kubernetes 1.7+.

## CRI runtimes

- [cri-o](https://github.com/cri-o/cri-o)
- [rktlet](https://github.com/kubernetes-retired/rktlet)
- [frakti](https://github.com/kubernetes/frakti)
- [cri-containerd](https://github.com/containerd/cri)
- [singularity-cri](https://github.com/sylabs/singularity-cri)