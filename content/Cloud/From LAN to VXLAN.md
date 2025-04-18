## What is a LAN?

[**LAN (Local Area Network)**](https://en.wikipedia.org/wiki/Local_area_network) - [broadly] a computer network that interconnects computers within a **limited area** such as a residence, school, office building, or data center. A LAN is not limited to a single [IP subnetwork](https://labs.iximiuz.com/courses/computer-networking-fundamentals/from-lan-to-vxlan#L3-segment). Like a [Wide area network (WAN)](https://en.wikipedia.org/wiki/Wide_area_network), a LAN can consist of multiple IP networks communicating via routers. The main determinant of a LAN is the locality (i.e. proximity) of the participants, not the L3 topology.

## Whats is a Network Link?

**Network link** - a physical and logical network component used to interconnect any kind of nodes in the network. All nodes of a single network link use the same [link-layer protocol](https://en.wikipedia.org/wiki/Link_layer).

Examples:

- A group of computers connected to a network switch (Ethernet)
- A set of smartphones connected to a [Wi-Fi access point](https://en.wikipedia.org/wiki/Wireless_access_point) (non-Ethernet)
- Etc.

## What is an L1 Segment?

[**L1 segment**](https://en.wikipedia.org/wiki/Network_segment#Ethernet) (*aka* **physical segment**, *aka* **Ethernet segment**) - a *network segment* formed by an electrical (or optical) connection between networked devices using a shared medium. Nodes on a single L1 segment have a common [physical layer](https://en.wikipedia.org/wiki/Physical_layer).

The simplest example of the contemporary L1 segment is a point-to-point connection between two end-nodes via a [patch](https://en.wikipedia.org/wiki/Patch_cable) or [crossover](https://en.wikipedia.org/wiki/Ethernet_crossover_cable) cable.

![[l1-patch-cable-2000-opt.png|Two computers connected with a patch cable.]]

The most typical occurrence of L1 segment today, though, are the links between servers and the corresponding top-of-rack switch in a data center:

![[l1-network-switch-2000-opt.png|Ethernet via network switch, present day.]]

_Blue lines are the L1 segments._
