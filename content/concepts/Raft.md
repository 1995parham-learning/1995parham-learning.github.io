## What is Raft?

Raft is a consensus algorithm that is designed to be easy to understand. It's equivalent to _Paxos_ in fault-tolerance and performance. The difference is that it's decomposed into relatively independent sub-problems, and it cleanly addresses all major pieces needed for practical systems.
We hope Raft will make consensus available to a wider audience, and that this wider audience will be able to develop a variety of higher quality consensus-based systems than are available today.

## Hold on - what is consensus?

Consensus is a fundamental problem in fault-tolerant distributed systems. _Consensus involves multiple servers agreeing on values_. Once they reach a decision on a value, that decision is final. Typical consensus algorithms make progress when any majority of their servers is available; for example, a cluster of 5 servers can continue to operate even if 2 servers fail. If more servers fail, they stop making progress (but will never return an incorrect result).

Consensus typically arises in the context of replicated state machines, a general approach to building fault-tolerant systems. Each server has a state machine and a log. The state machine is the component that we want to make fault-tolerant, such as a hash table. It will appear to clients that they are interacting with a single, reliable state machine, even if a _minority_ of the servers in the cluster fail. Each state machine takes as input commands from its log. In our hash table example, the log would include commands like _set x to 3_. A consensus algorithm is used to agree on the commands in the servers' logs. The consensus algorithm must ensure that if any state machine applies _set x to 3_ as the _n_th_ command, no other state machine will ever apply a different _n_th_ command. As a result, each state machine processes the _same series of commands_ and thus produces the same series of results and arrives at the same series of states.

> [!info]
> Consensus means multiple servers agreeing on same information, something imperative to design fault-tolerant distributed systems.
