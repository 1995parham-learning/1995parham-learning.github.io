> Just-in-time Nodes for Any Kubernetes Cluster

Karpenter automatically launches just the right compute resources to handle your cluster's applications. It is designed to let you take full advantage of the cloud with fast and simple compute provisioning for Kubernetes clusters.

- <https://github.com/aws/karpenter-provider-aws>
- <https://github.com/Azure/karpenter-provider-azure>

---

Karpenter is an open-source node lifecycle management project built for Kubernetes. Adding Karpenter to a Kubernetes cluster can dramatically improve the efficiency and cost of running workloads on that cluster. Karpenter works by:

- **Watching** for pods that the Kubernetes scheduler has marked as unschedulable
- **Evaluating** scheduling constraints (resource requests, nodeselectors, affinities, tolerations, and topology spread constraints) requested by the pods
- **Provisioning** nodes that meet the requirements of the pods
- **Disrupting** the nodes when the nodes are no longer needed

As someone using Karpenter, once your Kubernetes cluster and the **Karpenter controller** are up and running, you can:

- **Set up NodePools**: By applying a NodePool to Karpenter, you can configure constraints on node provisioning and set values for node expiry, node consolidation, or Kubelet configuration values. NodePool-level constraints related to Kubernetes and your cloud provider (AWS, for example) include:
    - Taints (`taints`): Identify taints to add to provisioned nodes. If a pod doesn’t have a matching _toleration for the taint_, the effect set by the taint occurs (`NoSchedule`, `PreferNoSchedule`, or `NoExecute`).
    - Labels (`labels`): Apply arbitrary key-value pairs to nodes that can be matched by pods.
    - Requirements (`requirements`): Set acceptable (`In`) and unacceptable (`Out`) Kubernetes and Karpenter values for node provisioning based on [Well-Known Labels](https://kubernetes.io/docs/reference/labels-annotations-taints/) and [cloud-specific settings](https://karpenter.sh/docs/concepts/nodeclasses/). These can include [instance types](https://kubernetes.io/docs/reference/labels-annotations-taints/#nodekubernetesioinstance-type), [zones](https://kubernetes.io/docs/reference/labels-annotations-taints/#topologykubernetesiozone), [computer architecture](https://kubernetes.io/docs/reference/labels-annotations-taints/#kubernetes-io-arch), and [capacity type](https://karpenter.sh/docs/concepts/nodepools/#capacity-type) (such as AWS spot or on-demand).
    - Limits (`limits`): Lets you set limits on the total CPU and Memory that can be used by the cluster, effectively stopping further node provisioning when those limits have been reached.
- **Deploy workloads**: When deploying workloads, you can request that scheduling constraints be met to direct which nodes Karpenter provisions for those workloads. Use any of the following Pod spec constraints when you deploy pods:
    - Resources (`resources`): Make requests and set limits for memory and CPU for a Pod.
    - Nodes (`nodeSelector`): Use [nodeSelector](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector) to ask to match a node that includes one or more selected key-value pairs. These can be arbitrary labels you define, Kubernetes well-known labels, or Karpenter labels.
    - Node affinity (`NodeAffinity`): Set [nodeAffinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#node-affinity) to have the Pod run on nodes that have matching `nodeSelectorTerms` set or not set. Matching affinity can be a particular operating system or zone. You can set the node affinity to be required or simply preferred. `NotIn` and `DoesNotExist` allow you to define node anti-affinity behavior.
    - Pod affinity and anti-affinity (`podAffinity/podAntiAffinity`): Choose to run a pod on a node based on whether certain pods are running (`podAffinity`) or not running (`podAntiAffinity`) on the node. See [Inter-pod affinity and anti-affinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#inter-pod-affinity-and-anti-affinity) for details.
    - Tolerations (`tolerations`): Identify that a pod must match (tolerate) a taint on a node before the pod will run on it. Without the toleration, the effect set by the taint occurs (`NoSchedule`, `PreferNoSchedule`, or `NoExecute`).
    - Topology spread (`topologySpreadConstraints`): Request that pods be spread across zones (`topology.kubernetes.io/zone`) or hosts (`kubernetes.io/hostname`), or cloud provider capacity types (`karpenter.sh/capacity-type`). See [Pod Topology Spread Constraints](https://kubernetes.io/docs/concepts/workloads/pods/pod-topology-spread-constraints/) for details.
    - Persistent volume topology: Indicate that the Pod has a storage requirement that requires a node running in a particular zone that can make that storage available to the node.

---

Karpenter is designed to run on a node in your Kubernetes cluster. As part of the installation process, you need _credentials from the underlying cloud provider_ to allow nodes to be started up and added to the cluster as they are needed.

==Karpenter’s job is to add nodes to handle unschedulable pods, schedule pods on those nodes, and remove the nodes when they are not needed. ==

- **Unschedulable pods**: Karpenter only attempts to schedule pods that have a status condition `Unschedulable=True`, which the _kube scheduler_ sets when it fails to schedule the pod to existing capacity.
- **Defining Constraints**: Karpenter defines a Custom Resource called a _NodePool_ to specify configuration. Each NodePool manages a distinct set of nodes, but pods can be scheduled to any NodePool that supports its scheduling constraints. A NodePool contains constraints that impact the nodes that can be provisioned and attributes of those nodes.
- **Defining Disruption**: A NodePool can also include values to indicate when nodes should be disrupted.
- **Well-known labels**: The NodePool can use well-known Kubernetes labels to allow pods to request only certain instance types, architectures, operating systems, or other attributes when creating nodes.
- **Multiple NodePools**: Multiple NodePools can be configured on the same cluster. For example, you might want to configure different teams on the same cluster to run on completely separate capacity. One team could run on nodes using BottleRocket, while another uses EKSOptimizedAMI.
