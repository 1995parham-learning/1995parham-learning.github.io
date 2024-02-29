---
title: Networking
---

## Switch types

Cisco switches can be divided into two types:

- Fixed configuration
  - Capable of being stacked
  - Back-plane limitation
- Modular configuration (chassis-based)
  - hundred of Ethernet ports
  - processing modules (supervisor) upgrade
  - Catalyst (4500, 6500 and 9500)

## Switch Planning

Installing chassis-based switches require more planning than installing smaller switches. There are many elements to consider when configuring a chassis switch.

- Choosing modules (blades)
- AC/DC power supply
- Adequate rack-space (listed in RU)

## Auto-negotiation

Auto-negotiation is the feature that allows a port on a switch, router, server, or other device to communicate with the device on the other end of the link to determine the optimal duplex mode and speed for the connection. The driver then configures the interface to the values determined for the link.

- Speed: speed is the rate of the interface, usually listed in megabits per second (Mbps). Common Ethernet speeds include 10 Mbps, 100 Mbps, and 1000 Mbps. 1000 Mbps Ethernet is also refereed to as Gigabit Ethernet. Many switches now support 10 Gbps Ethernet, and 100 Gbps is on the horizon as well.
- Duplex: duplex refers to how data flows on the interface. On a half duplex interface, data can only be transmitted or received at any given time.
