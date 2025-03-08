## Introduction to Redpanda

Distributed systems often require data and system updates to happen as quickly as possible. In software architecture, ==these updates can be handled with either messages or events==.

- With messages, updates are sent directly from one component to another to trigger an action.
- With events, updates indicate that an action occurred at a specific time, and are not directed to a specific recipient.

**An event is simply a record of something changing state**. For example, the event of a credit card transaction includes the product purchased, the payment, the delivery, and the time of the purchase. The event occurred in the purchasing component, but it also impacted the inventory, the payment processing, and the shipping components.

In an event-driven architecture, all actions are defined and packaged as events to precisely identify individual actions and how they’re processed throughout the system. Instead of processing updates in consecutive order, event-driven architecture lets components process events at their own pace. This helps developers build fast and scalable systems.

## Redpanda CLI

>The rpk stands for **Redpanda Keeper** —like the person who takes care of actual red pandas at a zoo, except in this case, you’re taking care of Redpanda clusters. In a nutshell, `rpk` consolidates all Redpanda's cluster management tasks into a single command-line interface so you can easily set up, configure, and manage your Redpanda clusters.

### Introduction to rpk

The `rpk` command line interface tool is designed to manage your entire Redpanda cluster, **without the need to run a separate script for each function, as with Apache Kafka**.
