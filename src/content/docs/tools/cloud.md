---
title: Cloud
icon: skill-icons:kubernetes
---

[@1995parham-learning/cloud-roadmap](https://github.com/1995parham-learning/cloud-roadmap)

[Tutorials 📖 | iximiuz Labs](https://labs.iximiuz.com/tutorials)

## Terminology

Concepts from cloud computing that seems interesting to me and worth time.

- SR-IOV
- Data Plane Development Kit ([`dpdk`](https://github.com/DPDK/dpdk))
- Dark Fiber
- Open Virtual Network ([`ovn`](https://github.com/ovn-org/ovn))
- CPU Pinning / Processor affinity
- Steal time
- Distribute Network cards between multiple CPU bus

## Container Networking

One of the Linux namespaces used to create containers is called `netns` or _network namespace_.
From [`man ip-netns`](https://man7.org/linux/man-pages/man8/ip-netns.8.html):

> Network namespace is logically another copy of the network stack,
> with its own routes, firewall rules, and network devices.

## How to set up?

> Do you want to run Red Hat OpenShift Container Platform on bare metal?

Red Hat [CodeReady Containers](https://developers.redhat.com/products/codeready-containers/overview?intcmp=701f20000012ngPAAQ) (CRC)
provides a minimal, preconfigured OpenShift 4 cluster on a laptop or desktop machine for development and testing purposes.
CRC is delivered as a platform inside the VM. Now, let's look at how to configure it!

[Getting started with CodeReady Containers](https://www.redhat.com/sysadmin/codeready-containers)

[odo - Developer CLI for OpenShift and Kubernetes | Red Hat Developer](https://developers.redhat.com/products/odo/overview)

## Runbook

In a computer system or network, a runbook is a _compilation of routine procedures and operations_
that the system administrator or operator carries out.
System administrators in IT departments and NOCs use runbooks as a reference.
Runbooks can be in either electronic or in physical book form.

## Operators

- EMQX: [@emqx/emqx-operator](https://github.com/emqx/emqx-operator)
- RabbitMQ: [@rabbitmq/cluster-operator](https://github.com/rabbitmq/cluster-operator)
- NATS: [@nats-io/nats-operator](https://github.com/nats-io/nats-operator)
- NATS: [@nats-io/nack](https://github.com/nats-io/nack)
- Kafka: [@strimzi/strimzi-kafka-operator](https://github.com/strimzi/strimzi-kafka-operator)

## Affinity and Taints

Using **taints**, you can **forbid** pods from schedule over specific nodes.
Using **affinity**, you can **make sure** pods schedule over specific nodes.

For setting affinity, there are constraints like:

```
requiredDuringSchedulingIgnoredDuringExecution
```

Which means, it should be forced during the scheduling, not when the pod is running.

## Kyverno

Kyverno (Greek for “govern”) is a policy engine designed specifically for Kubernetes. Some of its many features include:

- policies as Kubernetes resources (no new language to learn!)
- **validate**, **mutate**, **generate**, or **cleanup** (remove) any resource
- verify container images for software supply chain security
- inspect image metadata
- match resources using label selectors and wildcards
- validate and mutate using overlays (like Kustomize!)
- synchronize configurations across Namespaces
- block nonconforming resources using admission controls, or report policy violations
- self-service reports (no proprietary audit log!)
- self-service policy exceptions
- test policies and validate resources using the Kyverno CLI, in your CI/CD pipeline, before applying to your cluster
- manage policies as code using familiar tools like `git` and `kustomize`

Kyverno runs as a [dynamic admission controller](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/) in a Kubernetes cluster.
Kyverno receives validating and mutating admission webhook HTTP callbacks from the Kubernetes API server
and applies matching policies to return results that enforce admission policies or reject requests.

## Cordon and Drain

Kubernetes Nodes need occasional maintenance.
You could be updating the Node's kernel, resizing its compute resource in your cloud account,
or replacing physical hardware components in a self-hosted installation.

Cordons and Drains are two mechanisms you can use to safely prepare for Node downtime.
They allow workloads running on a target Node to be rescheduled onto other ones.
You can then shut down the Node or remove it from your cluster without impacting service availability.

### Applying a Node Cordon

Cordoning a Node marks it as unavailable to the Kubernetes scheduler.
The Node will be ineligible to host any new Pods subsequently added to your cluster.

```bash
kubectl cordon <node-id>
```

Existing Pods already running on the Node won't be affected by the cordon.
They'll remain accessible and will still be hosted by the cordoned Node.

You can check which of your Nodes are currently cordoned with the `get nodes` command:

```bash
kubectl get nodes
```

```output
NAME STATUS ROLES AGE VERSION
node-1  Ready,SchedulingDisabled    control-plane,master    26m v1.23.3
```

### Draining a node

The next step is to drain remaining Pods out of the Node.
This procedure will evict the Pods, so they're rescheduled onto other Nodes in your cluster.
Pods are allowed to gracefully terminate before they're forcefully removed from the target Node.

Run `kubectl drain` to initiate a drain procedure.

Drains can sometimes take a while to complete if your Pods have long grace periods.
This might not be ideal when you need to urgently take a Node offline.
Use the `--grace-period` flag to override Pod termination grace periods and force an immediate eviction.

You can proceed with the eviction by adding the `--ignore-daemonsets` flag.
This will evict everything else while overlooking any DaemonSets that exist.

## Kubernetes Services

[Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)

In Kubernetes, a Service is a method for exposing a network application that is running
as one or more Pods in your cluster.

### Service type

Kubernetes Service types allow you to specify what kind of Service you want.

#### `ClusterIP`

Exposes the Service on a cluster-internal IP. Choosing this value makes the Service only reachable from within
the cluster. This is the default that is used if you don't explicitly specify a type for a Service.
You can expose the Service to the public internet using an Ingress or a Gateway.

#### `NodePort`

Exposes the Service on each Node's IP at a static port (the `NodePort`). To make the node port available,
Kubernetes sets up a cluster IP address, the same as if you had requested a Service of type: `ClusterIP`.

#### `LoadBalancer`

Exposes the Service externally using an external load balancer. Kubernetes does not directly offer
a load balancing component; you must provide one, or you can integrate your Kubernetes cluster with a cloud provider.

#### `ExternalName`

Maps the Service to the contents of the `externalName` field (for example, to the hostname `api.foo.bar.example`).
The mapping configures your cluster's DNS server to return a CNAME record with that external hostname value.
No proxying of any kind is set up.

## Kubernetes Endpoint Slices

Kubernetes' `EndpointSlice` API provides a way to track network endpoints within a Kubernetes cluster.
`EndpointSlice`s offer a more scalable and extensible alternative to `Endpoint`s.

In Kubernetes, a `EndpointSlice` contains references to a set of network endpoints.
The control plane automatically creates `EndpointSlice`s for any Kubernetes `Service` that has a selector specified.

## Kubernetes Components

[Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/)

A Kubernetes cluster consists of a set of worker machines, called
[nodes](https://kubernetes.io/docs/concepts/architecture/nodes/), that run containerized applications.
Every cluster has at least one worker node.

The worker node(s) host the [Pods](https://kubernetes.io/docs/concepts/workloads/pods/) that are the components of
the application workload.
The [control plane](https://kubernetes.io/docs/reference/glossary/?all=true#term-control-plane) manages the worker
nodes and the Pods in the cluster. In production environments, the control plane usually runs across multiple computers
and a cluster usually runs multiple nodes, providing fault-tolerance and high availability.

### Control Plane Components

The control plane's components make global decisions about the cluster (for example, scheduling), as well as detecting
and responding to cluster events (for example, starting up a new [pod](https://kubernetes.io/docs/concepts/workloads/pods/)
when a Deployment's [`replicas`](https://kubernetes.io/docs/reference/glossary/?all=true#term-replica) field is unsatisfied).

Control plane components can be run on any machine in the cluster.
However, for simplicity, set up scripts typically start all control plane components on the same machine,
and do not run user containers on this machine.
See [Creating Highly Available clusters with `kubeadm`](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/)
for an example control plane setup that runs across multiple machines.

#### 1. `kube-apiserver`

The API server is a component of the Kubernetes [control plane](https://kubernetes.io/docs/reference/glossary/?all=true#term-control-plane)
that exposes the Kubernetes API. The API server is the front end for the Kubernetes control plane.

The main implementation of a Kubernetes API server is [`kube-apiserver`](https://kubernetes.io/docs/reference/generated/kube-apiserver/).
`kube-apiserver` is designed to scale horizontally—that is, it scales by deploying more instances. You can run
several instances of `kube-apiserver` and balance traffic between those instances.

#### 2. `etcd`

Consistent and highly-available key value store used as Kubernetes' backing store for all cluster data.

If your Kubernetes cluster uses `etcd` as its backing store, make sure you have a
[back-up](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#backing-up-an-etcd-cluster)
plan for the data.

You can find in-depth information about `etcd` in the official [documentation](https://etcd.io/docs/).

#### 3. `kube-scheduler`

Control plane component that watches for newly created [Pods](https://kubernetes.io/docs/concepts/workloads/pods/)
with no assigned [node](https://kubernetes.io/docs/concepts/architecture/nodes/), and selects a node for them to run on.

Factors taken into account for scheduling decisions include:

- Individual and collective resource requirements
- Hardware/Software/Policy constraints, affinity and anti-affinity specifications, data locality, inter-workload interference, and deadlines.

#### 4. `kube-controller-manager`

Control plane component that runs [controller](https://kubernetes.io/docs/concepts/architecture/controller/) processes.

Logically, each [controller](https://kubernetes.io/docs/concepts/architecture/controller/) is a separate process,
but to _reduce complexity, they are all compiled into a single binary and run in a single process_.

There are many different types of controllers. Some examples of them are:

- Node controller: Responsible for noticing and responding when nodes go down.
- Job controller: Watches for Job objects that represent one-off tasks, then creates Pods to run those tasks to completion.
- EndpointSlice controller: Populates EndpointSlice objects (to provide a link between Services and Pods).
- ServiceAccount controller: Create default ServiceAccounts for new namespaces.

The above is not an exhaustive list.

#### 5. `cloud-controller-manager`

A Kubernetes [control plane](https://kubernetes.io/docs/reference/glossary/?all=true#term-control-plane) component that
embeds cloud-specific control logic. The [cloud controller manager](https://kubernetes.io/docs/concepts/architecture/cloud-controller/)
lets you link your cluster into your cloud provider's API, and separates out the components that interact with
that cloud platform from components that only interact with your cluster.

The cloud-controller-manager only runs controllers that are specific to your cloud provider.
If you are running Kubernetes on your own premises, or in a learning environment inside your own PC,
the cluster does not have a cloud controller manager.

As with the `kube-controller-manager`, the `cloud-controller-manager` combines several logically independent control
loops into a single binary that you run as a single process. You can scale horizontally (run more than one copy)
to improve performance or to help tolerate failures.

The following controllers can have cloud provider dependencies:

- Node controller: For checking the cloud provider to determine if a node has been deleted in the cloud after it stops responding
- Route controller: For setting up routes in the underlying cloud infrastructure
- Service controller: For creating, updating and deleting cloud provider load balancers

### Node Components

Node components run on every node, maintaining running pods and providing the Kubernetes runtime environment.

#### 1. `kubelet`

An agent that runs on each [node](https://kubernetes.io/docs/concepts/architecture/nodes/) in the cluster.
It makes sure that [containers](https://kubernetes.io/docs/concepts/containers/) are running
in a [Pod](https://kubernetes.io/docs/concepts/workloads/pods/).

The [`kubelet`](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) takes a set of PodSpecs
that are provided through various mechanisms and ensures that the containers described in those PodSpecs are running
and healthy. The `kubelet` doesn't manage containers which were not created by Kubernetes.

#### 2. `kube-proxy`

`kube-proxy` is a network proxy that runs on each
[node](https://kubernetes.io/docs/concepts/architecture/nodes/) in your cluster,
implementing part of the Kubernetes [Service](https://kubernetes.io/docs/concepts/services-networking/service/) concept.

[`kube-proxy`](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/) maintains network rules on nodes.
These network rules allow network communication to your Pods from network sessions inside or outside your cluster.

:::note
`kube-proxy` uses the operating system packet filtering layer if there is one, and it's available.
Otherwise, `kube-proxy` forwards the traffic itself.
:::

#### 3. Container runtime

A fundamental component that empowers Kubernetes to run containers effectively. It is responsible for managing the execution and lifecycle of containers within the Kubernetes environment.

Kubernetes supports container runtimes such as
[containerd](https://containerd.io/docs/),
[CRI-O](https://cri-o.io/#what-is-cri-o),
and any other implementation of the
[Kubernetes CRI (Container Runtime Interface)](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-node/container-runtime-interface.md).
