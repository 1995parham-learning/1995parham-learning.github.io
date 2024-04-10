---
title: Hexagonal Architecture
---

The hexagonal architecture, or ports and adapters architecture, is an architectural pattern used in software design.
It aims at creating _loosely coupled application components_ that can be easily connected to their software
environment by means of **ports** and **adapters**.
This makes components exchangeable at any level and facilitates test automation.

The granularity of the ports and their number is not constrained:

- A single port could in some case be sufficient (e.g. in the case of a simple service consumer);
- Typically, there are ports for event sources (user interface, automatic feeding),
  notifications (outgoing notifications),
  database (in order to interface the component with any suitable DBMS),
  and administration (for controlling the component);
- In an extreme case, there could be a different port for every use case, if needed.
