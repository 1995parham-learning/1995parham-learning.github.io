In kubernetes, `requests.cpu` **is used** after the scheduling phase, too.

In cgroup.v2 `cpu.weight` is applied to the containers of a single pod. For example, each `thanos-querier-custom` pod has 5 containers. For them, the `cpu.weight` values are set as follows:

```
cpu.weight limits.cpu requests.cpu container-name ------------------------------------------------------- 106 9000 2700 thanos-query 36 3000 900 oauth-proxy 12 1000 300 prom-label-proxy-federate 7 600 180 kube-rbac-proxy-federate 1 None None thanos-federate-proxy
```

More info:

- [RedHat's doc on cgroups-v2](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/8/html/managing_monitoring_and_updating_the_kernel/using-cgroups-v2-to-control-distribution-of-cpu-time-for-applications_managing-monitoring-and-updating-the-kernel)