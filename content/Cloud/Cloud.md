[@1995parham-learning/cloud-roadmap](https://github.com/1995parham-learning/cloud-roadmap)

[Tutorials 📖 | iximiuz Labs](https://labs.iximiuz.com/tutorials)

## Terminology

Concepts from cloud computing that seems interesting to me and worth time.

-   SR-IOV
-   Data Plane Development Kit ([`dpdk`](https://github.com/DPDK/dpdk))
-   Dark Fiber
-   Open Virtual Network ([`ovn`](https://github.com/ovn-org/ovn))
-   CPU Pinning / Processor affinity
-   Steal time
-   Distribute Network cards between multiple CPU bus

## Container Networking

One of the Linux namespaces used to create containers is called `netns` or _network namespace_.
From [`man ip-netns`](https://man7.org/linux/man-pages/man8/ip-netns.8.html):

> Network namespace is logically another copy of the network stack,
> with its own routes, firewall rules, and network devices.

[[Network Namespace | read more...]]

## Set up your Kubernetes cluster

> Do you want to run Red Hat OpenShift Container Platform on bare metal?

Red Hat [CodeReady Containers](https://developers.redhat.com/products/codeready-containers/overview?intcmp=701f20000012ngPAAQ) (CRC) provides a minimal, preconfigured OpenShift 4 cluster on a laptop or desktop machine for development and testing purposes.

-   [Getting started with CodeReady Containers](https://www.redhat.com/sysadmin/codeready-containers)

## Runbook

In a computer system or network, a runbook is a _compilation of routine procedures and operations_ that the system administrator or operator carries out.
System administrators in IT departments and NOCs use runbooks as a reference. Runbooks can be in either electronic or in physical book form.

## Operators

Operators helps you to deploy and manage services on Kubernetes easier. These are the operators that I've used.

-   EMQX: [@emqx/emqx-operator](https://github.com/emqx/emqx-operator)
-   RabbitMQ: [@rabbitmq/cluster-operator](https://github.com/rabbitmq/cluster-operator)
-   NATS: [@nats-io/nats-operator](https://github.com/nats-io/nats-operator)
-   NATS: [@nats-io/nack](https://github.com/nats-io/nack)
-   Kafka: [@strimzi/strimzi-kafka-operator](https://github.com/strimzi/strimzi-kafka-operator)

## Ephemeral Container

> A special type of container that runs temporarily in an existing Pod to accomplish user-initiated actions
> such as troubleshooting.

```bash
kubectl debug -it --attach=false -c debugger --image=busybox ${POD_NAME}
```

The above command adds to the target Pod a new ephemeral container called `debugger` that uses the
`busybox:latest` image. I intentionally created it interactive (`-i`) and PTY-controlled (`-t`) so that attaching to it later would provide a typical interactive shell experience.

```bash
$ ps auxf

PID   USER     TIME  COMMAND
    1 root      0:00 sh
   14 root      0:00 ps auxf
```

The `ps` output from inside the `debugger` container shows only the processes of that container...
So, `kubectl debug` just gave me a shared net (and probably IPC) namespace, likely the same parent `cgroup` as for the other Pod's containers, and that's pretty much it! Sounds way too limited for a seamless debugging experience 🤔

> [!note]
> Enabling a shared PID namespace for all the containers in a Pod.

## Pause Container

The **pause** container is a container which holds the network namespace for the pod. Kubernetes creates pause containers to acquire the respective pod’s IP address and set up the network namespace for all other containers that join that pod.

## Readiness Gate

Pod Readiness Gates are **custom conditions that can be added to a pod's readiness check**.
By default, a pod is considered ready if all its containers are ready. However, in complex scenarios,
you might need more sophisticated checks. Readiness Gates allow you to define these additional checks,
which can be based on various criteria such as external dependencies, configuration availability, or custom logic.

Your application can inject extra feedback or signals into `PodStatus`: Pod readiness.
To use this, set `readinessGates` in the Pod's spec to specify a list of additional conditions that
the `kubelet` evaluates for Pod readiness.

Readiness gates are determined by the current state of `status.condition` fields for the Pod.
If Kubernetes cannot find such a condition in the `status.conditions` field of a Pod, the status
of the condition is defaulted to _False_.

```yaml
kind: Pod
---
spec:
    readinessGates:
        - conditionType: "www.example.com/feature-1"
status:
    conditions:
        - type: Ready # a built in PodCondition
          status: "False"
          lastProbeTime: null
          lastTransitionTime: 2018-01-01T00:00:00Z
        - type: "www.example.com/feature-1" # an extra PodCondition
          status: "False"
          lastProbeTime: null
          lastTransitionTime: 2018-01-01T00:00:00Z
    containerStatuses:
        - containerID: docker://abcd...
          ready: true
```

The Pod conditions you add must have names that meet the Kubernetes _label key format_.

To set these `status.conditions` for the Pod, **applications** and **operators** should use the _PATCH_ action.
You can use a _Kubernetes client library_ to write code that sets custom Pod conditions for Pod readiness.

## Service Accounts

A _service account_ provides an identity for processes that run in a Pod, and maps to a `ServiceAccount` object. When you authenticate to the API server, you identify yourself as a particular _user_.

> [!note]
> Kubernetes recognizes the concept of a user, however, Kubernetes itself does not have a User API.

## Affinity and Taints

Affinity and tolerations are two key concepts in Kubernetes that help manage the placement of pods on worker nodes.
They allow for fine-grained control over where pods are scheduled, ensuring optimal resource utilization and application performance.

> [!note]
> Node _affinity is a property of Pods_ that attracts them to a set of nodes (either as a preference or a hard requirement).
>
> Taints are the opposite -- they allow a node to repel a set of pods.

-   Affinity is used to proactively place pods on specific nodes based on desired criteria.
-   Tolerations are used to allow pods to be scheduled on nodes that might have restrictions (taints).

You add a taint to a node using `kubectl taint`. For example,

```bash
kubectl taint nodes node1 key1=value1:NoSchedule
```

places a taint on node `node1`. The taint has key `key1`, value `value1`, and taint effect `NoSchedule`.
This means that no pod will be able to schedule onto `node1` unless it has a matching toleration.

To remove the taint added by the command above, you can run:

```bash
kubectl taint nodes node1 key1=value1:NoSchedule-
```

You specify a toleration for a pod in the `PodSpec`. Both of the following toleration "match" the taint created by the `kubectl` taint line above, and thus a pod with either toleration would be able to schedule onto `node1`:

```yaml
tolerations:
    - key: "key1"
      operator: "Equal"
      value: "value1"
      effect: "NoSchedule"
```

```yaml
tolerations:
    - key: "key1"
      operator: "Exists"
      effect: "NoSchedule"
```

The default Kubernetes scheduler takes taint and toleration into account when selecting a node to run a particular Pod.

The allowed values for the `effect` field are:

-   `NoExecute`
    This affects pods that are already running on the node as follows:

    -   Pods that do not tolerate the taint are evicted immediately
    -   Pods that tolerate the taint without specifying `tolerationSeconds` in their toleration specification remain bound forever
    -   Pods that tolerate the taint with a specified `tolerationSeconds` remain bound for the specified amount of time.
        After that time elapses, the node lifecycle controller evicts the Pods from the node.

-   `NoSchedule`
    No new Pods will be scheduled on the tainted node unless they have a matching toleration. Pods currently running on the node are not evicted.
-   `PreferNoSchedule`
    `PreferNoSchedule` is a **preference** or **soft** version of `NoSchedule`. The control plane will try to avoid placing a pod that does not tolerate the taint on the node, but it is not guaranteed.

For setting affinity, there are constraints like:

```
requiredDuringSchedulingIgnoredDuringExecution
```

Which means, it should be forced during the scheduling, not when the pod is running.

## Static Pods

Static Pods are **managed directly by the `kubelet` daemon** on a specific node, without the API server observing them.
Unlike Pods that are managed by the control plane (for example, a Deployment); instead, the `kubelet` watches each static Pod (and restarts it if it fails).

> [!note]
> Static Pods are always bound to one `kubelet` on a specific node.

The `kubelet` automatically tries to create a mirror Pod on the Kubernetes API server for each static Pod.
This means that the pods running on a node are _visible on the API server_, but _cannot be controlled from there_.
The Pod names will be suffixed with the node hostname with a leading hyphen.

> [!note]
> If you are running clustered Kubernetes and are using static Pods to run a Pod on every node,
> you should probably be using a DaemonSet instead.

> [!note]
> The spec of a static Pod cannot refer to other API objects (e.g., ServiceAccount, ConfigMap, Secret, etc).

> [!note]
> Static pods do not support ephemeral containers.

## Kyverno

Kyverno (Greek for “govern”) is a policy engine designed specifically for Kubernetes. Some of its many features include:

-   policies as Kubernetes resources (no new language to learn!)
-   **validate**, **mutate**, **generate**, or **cleanup** (remove) any resource
-   verify container images for software supply chain security
-   inspect image metadata
-   match resources using label selectors and wildcards
-   validate and mutate using overlays (like Kustomize!)
-   synchronize configurations across Namespaces
-   block nonconforming resources using admission controls, or report policy violations
-   self-service reports (no proprietary audit log!)
-   self-service policy exceptions
-   test policies and validate resources using the Kyverno CLI, in your CI/CD pipeline, before applying to your cluster
-   manage policies as code using familiar tools like `git` and `kustomize`

Kyverno runs as a [dynamic admission controller](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/) in a Kubernetes cluster.
Kyverno receives validating and mutating admission webhook HTTP callbacks from the Kubernetes API server and applies matching policies to return results that enforce admission policies or reject requests.

## Requests and Limits

A request is what the container is **guaranteed to receive**. One of the most common discussions of requests is around _pod scheduling_. Kubernetes will only schedule a pod on a node that has enough resources to meet the requested resources.
For example, if a pod requests a total of 2 CPUs, but each node only has 1.9 available, Kubernetes will not schedule the pod.

A limit is a cap on the resources that a pod can use. Although small exceptions may exist, this is a very hard cap that Kubernetes enforces.
An important note is that the CPU is considered a **compressible** resource. As such, if your container attempts to exceed the limit, Kubernetes _throttles it_. This may result in degraded performance, but does not terminate or evict the pod. However, if a pod attempts to use more memory than the limit, Kubernetes _immediately terminates it_.

> [!info]
> The Container has no upper bound on the CPU resources it can use.
> The Container could use all the CPU resources available on the Node where it is running.

With a virtual machine (VM), you assign a certain whole number of vCPU cores. These are then available to the VM all the time.
However, Kubernetes allows you to specify fractional CPUs, down to 1/1000 of a CPU.
Unlike in the case with virtual machines, you cannot assign only part of a CPU core.
It is instead a timeshare of the CPUs available on a node.
This is true even if the limit is set to a whole number. This can be important as we explore how this works.

Kubernetes uses the **Completely Fair Scheduler (CFS)** groups, specifically the CFS `cgroup` Bandwidth control.
The way this works for a CPU limit is that every CPU is scheduled in _100ms_ periods with _5ms_ time slices.
Each pod is given a budget within that time slice. For example, a pod with a **limit** of _200m_,
the pod would be given a quota of four _5ms_ slices for a total of _20ms_ of every _100ms_ period.

The CFS continues to supply these _5ms_ slices to the pod until the quota has been exhausted.
Once the quota has been used up for the _100ms_ period, the CFS stops scheduling the pod for CPU time.
This is referred to as **throttling**. Once the new _100ms_ period begins, the quota is reset to the limit.
In our example, this is four slices.

> [!info]
> I want to take a brief diversion to discuss the throttling metric.
> Many people, set up alerts to see when a server is throttling as a warning of a potential problem
> (or a misconfiguration). However, if you do this you may find **high throttling** with _very low CPU utilization_.

> [!tip] Example of a pod with a limit of `200m` running on a single core machine
> Let us pretend we expect the pod to process 1 request every second and each request should take _70ms_ to complete.
>
> Given that, over a 1-second period, the pod will be using only about 35 percent of the limit set.
> However, for each _100ms_ period the pod is only allowed to use _20ms_ before being throttled, as we saw above.
> So for the first slice the pod uses _20ms_ and is throttled.
> In the second slice and third slice, we see the same.
> Finally, in the fourth slice, the pod uses _10ms_ of CPU and completes the request.
> For the remaining six slices, the pod does not request any CPU time.
> So for three of the four periods where the pod requested CPU, **it was throttled**.
>
> The latency of _70ms_ has grown to more than _300ms_. So despite the pod _only using 35 percent of our limit on a large timescale_, this pod is getting **heavily throttled**, and the **response time is degraded**.

### Resource units in Kubernetes

Limits and requests for CPU resources are measured in _CPU_ units. In Kubernetes, 1 CPU unit is equivalent to 1 physical CPU core, or 1 virtual core, depending on whether the node is a physical host or a virtual machine running inside a physical machine.

Fractional requests are allowed. When you define a container with `spec.containers[].resources.requests.cpu` set to 0.5, you are requesting half as much CPU time compared to if you asked for 1.0 CPU.

For CPU resource units, the quantity expression 0.1 is equivalent to the expression `100m`, which can be read as "one hundred millicpu". Some people say "one hundred millicores", and this is understood to mean the same thing.

Limits and requests for memory are measured in bytes. You can express memory as a plain integer or as a fixed-point number using one of these quantity suffixes: `E`, `P`, `T`, `G`, `M,` `k`. You can also use the power-of-two equivalents: `Ei`, `Pi`, `Ti`, `Gi`, `Mi`, `Ki`.

For example, the following represent roughly the same value:

```
128974848
123 * (2 ** 20)
123Mi
128974848000m
129e6
129M
```

> [!warning]
> Pay attention to the case of the suffixes. If you request `400m` of memory, this is a request for 0.4 bytes.
> Someone who types that probably meant to ask for 400 mebibytes (`400Mi`) or 400 megabytes (`400M`).

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

```text
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

### Minimizing Downtime With Pod Disruption Budgets

Draining a Node doesn't guarantee your workloads will remain accessible throughout.
Your other Nodes will need time to honor scheduling requests and create new containers.

This can be particularly impactful if you're draining multiple Nodes in a short space of time.
Draining the first Node could reschedule its Pods onto the second Node, which is itself then deleted.

Pod disruption budgets are a mechanism for avoiding this situation.
You can use them with `Deployments`, `ReplicationControllers`, `ReplicaSets`, and `StatefulSets`.

## Kubernetes Services

[Kubernetes Services](https://kubernetes.io/docs/concepts/services-networking/service/)

In Kubernetes, a Service is a method for exposing a network application that is running as one or more Pods in your cluster.

### Service type

Kubernetes Service types allow you to specify what kind of Service you want.

#### `ClusterIP`

Exposes the Service on a cluster-internal IP. Choosing this value makes the Service only reachable from within the cluster. This is the default that is used if you don't explicitly specify a type for a Service. You can expose the Service to the public internet using an Ingress or a Gateway.

#### `NodePort`

Exposes the Service on each Node's IP at a static port (the `NodePort`). To make the node port available, Kubernetes sets up a cluster IP address, the same as if you had requested a Service of type: `ClusterIP`.

#### `LoadBalancer`

Exposes the Service externally using an external load balancer. Kubernetes **does not directly offer a load balancing component**; you must provide one, or you can integrate your Kubernetes cluster with a cloud provider.

Metal-LB is a load balancer solution that works by:

-   Assigning IP addresses: It assigns specific IP addresses to individual services or a group of services.
-   Advertising to BGP neighbors: It then advertises these IP addresses to Border Gateway Protocol (BGP) neighbors. This means it informs other network devices (like routers) about the availability of these services and their corresponding IP addresses.

This process allows traffic to be directed to the correct services based on the IP addresses advertised by Metal-LB.

#### `ExternalName`

Maps the Service to the contents of the `externalName` field (for example, to the hostname `api.foo.bar.example`).
The mapping configures your cluster's DNS server to return a CNAME record with that external hostname value. No proxying of any kind is set up.

## Kubernetes Endpoint Slices

Kubernetes' `EndpointSlice` API provides a way to track network endpoints within a Kubernetes cluster. `EndpointSlice`s offer a more scalable and extensible alternative to `Endpoint`s.

In Kubernetes, a `EndpointSlice` contains references to a set of network endpoints. The control plane automatically creates `EndpointSlice`s for any Kubernetes `Service` that has a selector specified.

## Kubernetes Components

[Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/)

A Kubernetes cluster consists of a set of worker machines, called [nodes](https://kubernetes.io/docs/concepts/architecture/nodes/), that run containerized applications. Every cluster has at least one worker node.

The worker node(s) host the [Pods](https://kubernetes.io/docs/concepts/workloads/pods/) that are the components of the application workload. The [control plane](https://kubernetes.io/docs/reference/glossary/?all=true#term-control-plane) manages the worker nodes and the Pods in the cluster. In production environments, the control plane usually runs across multiple computers and a cluster usually runs multiple nodes, providing fault-tolerance and high availability.

### Control Plane Components

The control plane's components make global decisions about the cluster (for example, scheduling), as well as detecting and responding to cluster events (for example, starting up a new [pod](https://kubernetes.io/docs/concepts/workloads/pods/) when a Deployment's [`replicas`](https://kubernetes.io/docs/reference/glossary/?all=true#term-replica) field is unsatisfied).

Control plane components can be run on any machine in the cluster. However, for simplicity, set up scripts typically start all control plane components on the same machine, and do not run user containers on this machine. See [Creating Highly Available clusters with `kubeadm`](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/high-availability/) for an example control plane setup that runs across multiple machines.

#### 1. `kube-apiserver`

The API server is a component of the Kubernetes [control plane](https://kubernetes.io/docs/reference/glossary/?all=true#term-control-plane) that exposes the Kubernetes API. The API server is the front end for the Kubernetes control plane.

The main implementation of a Kubernetes API server is [`kube-apiserver`](https://kubernetes.io/docs/reference/generated/kube-apiserver/). `kube-apiserver` is designed to scale horizontally—that is, it scales by deploying more instances. You can run several instances of `kube-apiserver` and balance traffic between those instances.

#### 2. `etcd`

Consistent and highly-available key value store used as Kubernetes' backing store for all cluster data.

If your Kubernetes cluster uses `etcd` as its backing store, make sure you have a [back-up](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/#backing-up-an-etcd-cluster)
plan for the data.

You can find in-depth information about `etcd` in the official [documentation](https://etcd.io/docs/).

#### 3. `kube-scheduler`

Control plane component that watches for newly created [Pods](https://kubernetes.io/docs/concepts/workloads/pods/) with no assigned [node](https://kubernetes.io/docs/concepts/architecture/nodes/), and selects a node for them to run on.

Factors taken into account for scheduling decisions include:

-   Individual and collective resource requirements
-   Hardware/Software/Policy constraints, affinity and anti-affinity specifications, data locality, inter-workload interference, and deadlines.

#### 4. `kube-controller-manager`

Control plane component that runs [controller](https://kubernetes.io/docs/concepts/architecture/controller/) processes.

Logically, each [controller](https://kubernetes.io/docs/concepts/architecture/controller/) is a separate process, but to _reduce complexity, they are all compiled into a single binary and run in a single process_.

There are many different types of controllers. Some examples of them are:

-   **Node controller**: Responsible for noticing and responding when nodes go down.
-   **Job controller**: Watches for Job objects that represent one-off tasks, then creates Pods to run those tasks to completion.
-   **EndpointSlice controller**: Populates EndpointSlice objects (to provide a link between Services and Pods).
-   **ServiceAccount controller**: Create default ServiceAccounts for new namespaces.

> [!danger]
> The above is not an exhaustive list.

#### 5. `cloud-controller-manager`

A Kubernetes [control plane](https://kubernetes.io/docs/reference/glossary/?all=true#term-control-plane) component that embeds cloud-specific control logic. The [cloud controller manager](https://kubernetes.io/docs/concepts/architecture/cloud-controller/) lets you link your cluster into your cloud provider's API, and separates out the components that interact with that cloud platform from components that only interact with your cluster.

The cloud-controller-manager only runs controllers that are specific to your cloud provider.
If you are running Kubernetes on your own premises, or in a learning environment inside your own PC,
the cluster does not have a cloud controller manager.

As with the `kube-controller-manager`, the `cloud-controller-manager` combines several logically independent control
loops into a single binary that you run as a single process. You can scale horizontally (run more than one copy)
to improve performance or to help tolerate failures.

The following controllers can have cloud provider dependencies:

-   Node controller: For checking the cloud provider to determine if a node has been deleted in the cloud after it stops responding
-   Route controller: For setting up routes in the underlying cloud infrastructure
-   Service controller: For creating, updating and deleting cloud provider load balancers

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
