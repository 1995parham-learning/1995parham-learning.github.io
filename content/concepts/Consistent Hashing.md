> [!note]
> Consistent hashing evenly distributes cache keys across shards, even if some of the shards crash or become unavailable.

## Basic technique

In the problem of load balancing, for example, when a BLOB has to be assigned to one of $n$ servers on a cluster, a standard hash function could be used in such a way that we calculate the hash value for that BLOB, assuming the resultant value of the hash is $\beta$, we perform modular operation with the number of servers ($n$) to determine the server in which we can place the BLOB: $\sigma = \beta \mod{n}$ ; hence the BLOB will be placed in the server whose server ID is successor of $\sigma$ in this case. However, when a server is added or removed during outage or scaling (when $n$ changes), all the BLOBs in every server should be reassigned and moved due to rehashing, but this operation is expensive.