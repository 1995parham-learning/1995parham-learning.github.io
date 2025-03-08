## Introduction to Redpanda

Distributed systems often require data and system updates to happen as quickly as possible. In software architecture, ==these updates can be handled with either messages or events==.

- With messages, updates are sent directly from one component to another to trigger an action.
- With events, updates indicate that an action occurred at a specific time, and are not directed to a specific recipient.

**An event is simply a record of something changing state**. For example, the event of a credit card transaction includes the product purchased, the payment, the delivery, and the time of the purchase. The event occurred in the purchasing component, but it also impacted the inventory, the payment processing, and the shipping components.

In an event-driven architecture, all actions are defined and packaged as events to precisely identify individual actions and how they’re processed throughout the system. Instead of processing updates in consecutive order, event-driven architecture lets components process events at their own pace. This helps developers build fast and scalable systems.

### What is Redpanda?

Redpanda is an event streaming platform: it provides the infrastructure for streaming real-time data.

Producers are client applications that send data to Redpanda in the form of events. Redpanda safely stores these events in sequence and organizes them into topics, which represent a replayable log of changes in the system.

Consumers are client applications that subscribe to Redpanda topics to asynchronously read events. Consumers can store, process, or react to the events.

Redpanda decouples producers from consumers to allow for asynchronous event processing, event tracking, event manipulation, and event archiving. Producers and consumers interact with Redpanda using the Apache Kafka API.

| Event-driven architecture (Redpanda)                                                                                                                                                                      | Message-driven architecture                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Producers send events to an event processing system (Redpanda) that acknowledges receipt of the write. This guarantees that the write is durable within the system and can be read by multiple consumers. | Producers send messages directly to each consumer. The producer must wait for acknowledgement that the consumer received the message before it can continue with its processes. |

Event streaming lets you extract value out of each event by analyzing, mining, or transforming it for insights. You can:

- Take one event and consume it in multiple ways.
- Replay events from the past and route them to new processes in your application.
- Run transformations on the data in real-time or historically.
- Integrate with other event processing systems that use the Kafka API.

## Redpanda CLI

> The rpk stands for **Redpanda Keeper** —like the person who takes care of actual red pandas at a zoo, except in this case, you’re taking care of Redpanda clusters. In a nutshell, `rpk` consolidates all Redpanda's cluster management tasks into a single command-line interface so you can easily set up, configure, and manage your Redpanda clusters.

### Introduction to rpk

The `rpk` command line interface tool is designed to manage your entire Redpanda cluster, **without the need to run a separate script for each function, as with Apache Kafka**.
