---
title: Proton
---

Proton is a streaming SQL engine, a fast and lightweight alternative to Apache Flink, powered by ClickHouse.
It enables developers to solve streaming data processing, routing and analytics challenges from Apache Kafka,
Redpanda and more sources, and send aggregated data to the downstream systems.

## Data storage

Users can create a stream by using `CREATE STREAM ...` DDL SQL.
Every stream has 2 parts at storage layer by default:

- The real-time streaming data part, backed by Timeplus NativeLog
- The historical data part, backed by ClickHouse historical data store.

Fundamentally, a stream in Proton is a regular database table with a replicated Write-Ahead-Log (WAL)
in front but is streaming queryable.
