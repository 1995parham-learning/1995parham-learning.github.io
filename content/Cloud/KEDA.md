> Kubernetes Event-driven Autoscaling

KEDA is a Kubernetes-based Event Driven Autoscaler. With KEDA, you can drive the scaling of any container in Kubernetes based on the number of events needing to be processed.

KEDA is a single-purpose and lightweight component that can be added into any Kubernetes cluster. KEDA works alongside standard Kubernetes components like the Horizontal Pod Autoscaler and can extend functionality without overwriting or duplication. With KEDA you can explicitly map the apps you want to use event-driven scale, with other apps continuing to function. This makes KEDA a flexible and safe option to run alongside any number of any other Kubernetes applications or frameworks.

## How KEDA works

KEDA performs three key roles within Kubernetes:

1. **Agent** — KEDA activates and deactivates Kubernetes [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment) to scale to and from zero on no events. This is one of the primary roles of the `keda-operator` container that runs when you install KEDA.
2. **Metrics** — KEDA acts as a [Kubernetes metrics server](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#support-for-custom-metrics) that exposes rich event data like queue length or stream lag to the Horizontal Pod Autoscaler to drive scale out. It is up to the Deployment to consume the events directly from the source. This preserves rich event integration and enables gestures like completing or abandoning queue messages to work out of the box. The metric serving is the primary role of the `keda-operator-metrics-apiserver` container that runs when you install KEDA.
3. **Admission Webhooks** - Automatically validate resource changes to prevent misconfiguration and enforce best practices by using an [admission controller](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/). As an example, it will prevent multiple ScaledObjects to target the same scale target.
