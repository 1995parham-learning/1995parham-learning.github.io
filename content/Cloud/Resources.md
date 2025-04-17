In Kubernetes, `requests.cpu` **is used** after the scheduling phase, too.

In cgroup.v2 `cpu.weight` is applied to the containers of a single pod. For example, each `thanos-querier-custom` pod has 5 containers. For them, the `cpu.weight` values are set as follows:

```
cpu.weight limits.cpu requests.cpu container-name ------------------------------------------------------- 106 9000 2700 thanos-query 36 3000 900 oauth-proxy 12 1000 300 prom-label-proxy-federate 7 600 180 kube-rbac-proxy-federate 1 None None thanos-federate-proxy
```

More info:

- [RedHat's doc on cgroups-v2](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/managing_monitoring_and_updating_the_kernel/using-cgroups-v2-to-control-distribution-of-cpu-time-for-applications_managing-monitoring-and-updating-the-kernel)

## Requests and Limits

A request is what the container is **guaranteed to receive**. One of the most common discussions of requests is around _pod scheduling_. Kubernetes will only schedule a pod on a node that has enough resources to meet the requested resources. For example, if a pod requests a total of 2 CPUs, but each node only has 1.9 available, Kubernetes will not schedule the pod.

A limit is a cap on the resources that a pod can use. Although small exceptions may exist, this is a very hard cap that Kubernetes enforces.

An important note is that the CPU is considered a **compressible** resource. As such, if your container attempts to exceed the limit, Kubernetes _throttles it_. This may result in degraded performance, but does not terminate or evict the pod. However, if a pod attempts to use more memory than the limit, Kubernetes _immediately terminates it_.

> [!info]
> The Container has no upper bound on the CPU resources it can use.
> The Container could use all the CPU resources available on the Node where it is running.

With a virtual machine (VM), you assign a certain whole number of vCPU cores. These are then available to the VM all the time. However, Kubernetes allows you to specify fractional CPUs, down to 1/1000 of a CPU. Unlike in the case with virtual machines, you cannot assign only part of a CPU core. It is instead a timeshare of the CPUs available on a node. This is true even if the limit is set to a whole number. This can be important as we explore how this works.

Kubernetes uses the **Completely Fair Scheduler (CFS)** groups, specifically the CFS `cgroup` Bandwidth control. The way this works for a CPU limit is that every CPU is scheduled in _100ms_ periods with _5ms_ time slices. Each pod is given a budget within that time slice. For example, a pod with a **limit** of _200m_, the pod would be given a quota of four _5ms_ slices for a total of _20ms_ of every _100ms_ period.

The CFS continues to supply these _5ms_ slices to the pod until the quota has been exhausted. Once the quota has been used up for the _100ms_ period, the CFS stops scheduling the pod for CPU time. This is referred to as **throttling**. Once the new _100ms_ period begins, the quota is reset to the limit. In our example, this is four slices.

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
