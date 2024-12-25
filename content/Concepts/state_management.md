---
title: State Management
---

:::note
State?

Information _stored_ in entities connected through a network
:::

-   Updated when node or network **conditions** change
-   Stored in _end-points_ or _multiple nodes_
-   Often associated with end-system generated call or session
-   Examples:
    -   TCP: Sequence numbers, timer values, RTT estimates
    -   Scheduling a meeting with advisor

## Sender vs Receiver

-   Sender
    -   Network node that (re)generates signaling (control) messages to install, _keep-alive_, remove state from other nodes
    -   One sender can have multiple receivers E.g.: routing
-   Receiver - Node that _creates_, maintains, removes state based on
    signaling messages received from sender (or the absence of)

## Soft-state vs Hard-state

### Hard State

-   State **installed** by receiver on receipt of _setup message_ from sender.
-   State **removed** by receiver on receipt of _teardown message_ from sender.
-   Default assumption: state valid unless told otherwise

### Soft State

-   State **installed** by receiver on receipt of _setup (trigger) message_ from sender.
-   Sender sends periodic _refresh messages_ indicating receiver should continue to maintain state.
-   State **removed** by receiver via timeout, in absence of refresh message from sender.
-   Default assumption: State becomes invalid unless refreshed
-   **Easy** handling of changes
    -   _Recovery_ performed transparently to end-system by normal refresh procedures
    -   No need for network to signal failure/change to end system, or end system to respond to specific error
    -   Less signaling (volume, types of messages) than hard-state from network to end-system
    -   More signaling (volume) than hard-state from end-system to network for refreshes
-   Refresh messages serve many purposes:
    -   **Trigger**: first time state-installation
    -   **Refresh**: refresh state known to exist (“I am still here”)
    -   **Lack of refresh**: Remove state (“I am gone”)

### Discussion

-   Hard State
    -   Better if message overhead really high
    -   Potentially greater consistency
    -   System wide coupling → difficult to analyze
-   Soft State
    -   Implicit reliability
    -   Easier error recovery
    -   Easily decomposed → simpler analysis
