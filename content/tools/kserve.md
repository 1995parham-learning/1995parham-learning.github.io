KServe provides a Kubernetes Custom Resource Definition for serving predictive and generative machine learning (ML) models.

![[Pasted image 20241213081011.png]]

## Control Plane

Responsible for reconciling the `InferenceService` custom resources. It creates the Knative serverless deployment for predictor, transformer, explainer to enable autoscaling based on incoming request workload including scaling down to zero when no traffic is received.

When raw deployment mode is enabled, control plane creates Kubernetes deployment, service, ingress, HPA.

### Control Plane Components

**KServe Controller**: Responsible for creating service, ingress resources, model server container
and model agent container for request/response logging, batching and model pulling.

**Ingress Gateway**: Gateway for routing external or internal requests.
