---
title: Networking
---

## DNS Record Types

This list of DNS record types is an overview of resource records permissible in zone files of the
Domain Name System (DNS). It also contains pseudo-RRs.

| Type  | Description            | Function                                                                                                                                                                                                                                                        |
| :---: | :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   A   | Address record         | Returns a 32-bit IPv4 address, most commonly used to map hostnames to an IP address of the host, but it is also used for DNSBLs, storing subnet masks in RFC 1101, etc.                                                                                         |
| AAAA  | IPv6 address record    | Returns a 128-bit IPv6 address, most commonly used to map hostnames to an IP address of the host.                                                                                                                                                               |
| CNAME | Canonical name record  | Alias of one name to another: the DNS lookup will continue by retrying the lookup with the new name.                                                                                                                                                            |
| DNAME | Delegation name record | Alias for a name and all its sub-names, unlike CNAME, which is an alias for only the exact name. Like a CNAME record, the DNS lookup will continue by retrying the lookup with the new name.                                                                    |
|  MX   | Mail exchange record   | List of mail exchange servers that accept email for a domain                                                                                                                                                                                                    |
|  PTR  | PTR Resource Record    | Pointer to a canonical name. Unlike a CNAME, DNS processing stops and just the name is returned. The most common use is for implementing reverse DNS lookups, but other uses include such things as DNS-SD.                                                     |
|  TXT  | Text record            | Originally for arbitrary human-readable text in a DNS record. Since the early 1990s, however, this record more often carries machine-readable data, such as specified by RFC 1464, opportunistic encryption, Sender Policy Framework, DKIM, DMARC, DNS-SD, etc. |
|  SRV  | Service locator        | Generalized service location record, used for newer protocols instead of creating protocol-specific records such as MX.                                                                                                                                         |
|  NS   | Name server record     | Delegates a DNS zone to use the given authoritative name servers                                                                                                                                                                                                |

## Switch types

Cisco switches can be divided into two types:

-   Fixed configuration
    -   Capable of being stacked
    -   Back-plane limitation
-   Modular configuration (chassis-based)
    -   hundred of Ethernet ports
    -   processing modules (supervisor) upgrade
    -   Catalyst (4500, 6500 and 9500)

## Switch Planning

Installing chassis-based switches require more planning than installing smaller switches. There are many elements to consider when configuring a chassis switch.

-   Choosing modules (blades)
-   AC/DC power supply
-   Adequate rack-space (listed in RU)

## Auto-negotiation

Auto-negotiation is the feature that allows a port on a switch, router, server, or other device to communicate with the device on the other end of the link to determine the optimal duplex mode and speed for the connection. The driver then configures the interface to the values determined for the link.

-   Speed: speed is the rate of the interface, usually listed in megabits per second (Mbps). Common Ethernet speeds include 10 Mbps, 100 Mbps, and 1000 Mbps. 1000 Mbps Ethernet is also refereed to as Gigabit Ethernet. Many switches now support 10 Gbps Ethernet, and 100 Gbps is on the horizon as well.
-   Duplex: duplex refers to how data flows on the interface. On a half duplex interface, data can only be transmitted or received at any given time.
