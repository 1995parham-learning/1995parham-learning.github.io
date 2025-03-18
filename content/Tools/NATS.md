![[GjHgquTWMA051kn.png]]

To ensure message order in NATS, set the **pending acknowledgment limit** to **1**. This prevents the server from dispatching multiple messages concurrently, ensuring that messages are processed sequentially by the consumer

You can utilize an **ephemeral consumer** to perform a SQL-like query over your NATS cluster. To maximize the number of messages retrieved in a single request, adjust the **request batch size** parameter accordingly. This allows efficient data retrieval without creating persistent consumers.

> [!info]
> `MaxRequestBatch` is the optional maximum batch size a single pull request can make. When set with MaxRequestMaxBytes, the batch size will be constrained by whichever limit is hit first.

The **DeliverLast** and **DeliverLastPerSubject** delivery policies can be useful when treating NATS as a lightweight database. These options ensure that consumers receive the most recent message for a subject or per subject group, making it suitable for event-driven state retrieval.

With the **Direct Get** API and its batch variant, you can retrieve messages directly from NATS JetStream **without needing a consumer**. This provides an efficient way to query stored messages on demand, reducing consumer overhead in scenarios requiring ad-hoc data access.
