> CRI: the Container Runtime Interface

## What is CRI?

CRI (_Container Runtime Interface_) consists of a specifications/requirements, [protobuf API], and [libraries](https://git.k8s.io/kubernetes/pkg/kubelet/cri/streaming) for container runtimes to integrate with kubelet on a node. The CRI API is currently in Alpha, and the CRI-Docker integration is used by default as of Kubernetes 1.7+.