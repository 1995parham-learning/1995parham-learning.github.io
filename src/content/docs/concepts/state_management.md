---
title: State Management
---

:::note
State?

Information _stored_ in entities connected through a network
:::

- Updated when node or network **conditions** change
- Stored in _end-points_ or _multiple nodes_
- Often associated with end-system generated call or session
- Examples:
  - TCP: Sequence numbers, timer values, RTT estimates
  - Scheduling a meeting with advisor

## Sender vs Receiver

- Sender
  - Network node that (re)generates signaling (control) messages to install, _keep-alive_, remove state from other nodes
  - One sender can have multiple receivers E.g.: routing
- Receiver - Node that _creates_, maintains, removes state based on
  signaling messages received from sender (or the absence of)

## Soft-state vs Hard-state

### Hard State

- State **installed** by receiver on receipt of _setup message_ from sender.
- State **removed** by receiver on receipt of _teardown message_ from sender.
