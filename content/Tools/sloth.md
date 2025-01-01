---
title: Sloth
---

Sloth uses Prometheus rules to generate SLOs (Service Level Objectives).
Based on the generated **recording and alert rules** it creates a reliable and uniform SLO implementation:

The Prometheus rules that Sloth generates, fall in 3 categories:

-   **SLIs**: These rules are the base, they use the _queries provided by the user_ to get a value used to show what
    is the _error service level (availability)_. It creates multiple rules for different time windows, these different
    results will be used for the alerts.
-   **Metadata**: These are used as informative metrics, like the remaining error budget, the SLO objective percent, etc.
    These are very handy for SLO visualization, e.g. Grafana dashboard.
-   **Alerts**: These are the multi-window/multi-burn alerts that are based on the SLI rules.

Sloth will take the service level spec and for each SLO in the spec will create 3 rule groups
with the above categories.
