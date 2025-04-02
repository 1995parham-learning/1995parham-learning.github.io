
> Cassandra is a NoSQL distributed database.

## Distribution provides power and resilience

One important Cassandra attribute is that its databases are distributed. That yields both technical and business advantages.
Cassandra databases easily scale when an application is under high stress, and the distribution also prevents data loss from
any given datacenter's hardware failure. A distributed architecture also brings technical power;
for example, a developer can tweak the throughput of read queries or write queries in isolation.

![distribution](image.png)

"Distributed" means that Cassandra can run on multiple machines while appearing to users as a unified whole.
There is little point in running Cassandsra as a single node, although it is very helpful to do so to help
you get up to speed on how it works. But to get the maximum benefit out of Cassandra, you would run it on multiple machines.

Since it is a distributed database, Cassandra can (and usually does) have multiple nodes. A node represents a single instance of Cassandra.
These nodes communicate with one another through a protocol called **gossip**, which is a process of computer peer-to-peer communication.
Cassandra also has a **masterless** architecture -- any node in the database can provide the exact same functionality as any other node --
contributing to Cassandra's robustness and resilience.
Multiple nodes can be organized logically into a _cluster_, or _ring_.
You can also have multiple **datacenters**.

## Introducing partitions

In Cassandra, the data itself is **automatically distributed**, with (positive) performance consequences.
It accomplishes this using partitions. Each node owns a particular set of tokens, and Cassandra distributes
data based on the ranges of these tokens across the cluster. The partition key is responsible for distributing
data among nodes and is important for determining data locality. When data is inserted into the cluster,
the first step is to apply a hash function to the partition key.
The output is used to determine what node (based on the token range) will get the data.

## Replication ensures reliability and fault tolerance

One piece of data can be replicated to multiple (replica) nodes, ensuring reliability and fault tolerance.
Cassandra supports the notion of a replication factor (RF), which describes **how many copies of your data should exist in the database**.
So far, our data has only been replicated to one replica (RF = 1). If we up this to a replication factor of two (RF = 2), the data
needs to be stored on a second replica as well -- and hence each node becomes responsible for a _secondary range of tokens_,
in addition to its primary range. A replication factor of three ensures that there are three nodes (replicas) covering
that particular token range, and the data is stored on yet another one.
