![architecture](architecture.svg)

## Concepts

- **Events** represent the individual units of data in Vector. Vector defines subtypes for events. This is necessary to establish domain-specific requirements enabling interoperability with existing monitoring and observability systems.
    - A **log event** is a generic key/value representation of an event.
    - A **metric event** represents a numerical operation performed on a time series. Vector’s metric events are fully interoperable.
