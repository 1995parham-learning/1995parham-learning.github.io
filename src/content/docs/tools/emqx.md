---
title: EMQX
---

## Introduction

EMQX is an open-source, highly scalable, and feature-rich MQTT broker designed for IoT and real-time messaging applications.
It supports up to 100 million concurrent IoT device connections per cluster while maintaining a throughput
of 1 million messages per second and a millisecond latency.

EMQX supports various protocols, including MQTT (3.1, 3.1.1, and 5.0), HTTP, QUIC, and Web Socket.
It also provides secure bidirectional communication with MQTT over TLS/SSL and various authentication mechanisms,
ensuring reliable and efficient communication infrastructure for IoT devices and applications.

## How Clustering in EMQX Work?

The basic function of a distributed EMQX cluster is to forward and publish messages to different subscribers.
In previous versions, EMQX utilizes Erlang/OTP's built-in database, _Mnesia_, to store MQTT session states.
The database replication channel is powered by the **Erlang distribution** protocol, enabling each node to function
as both a client and server. The default listening port number for this protocol is _4370_.
