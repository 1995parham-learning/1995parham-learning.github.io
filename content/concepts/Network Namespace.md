I want to experiment with Network Namespaces on Linux. First enable routing:

```bash
sysctl -w net.ipv4.ip_forward=1
```

Then create a network namespace named `net1`:

```bash
sudo ip netns add net1
```

Create `veth` with two ends `veth0` and `veth1`, and put `veth1` into `net1` namespace:

```bash
sudo ip link add veth0 type veth peer name veth1

sudo ip link set veth1 netns net1
```

Set IP address for `veth1` and bring it up:

```bash
sudo ip -n net1 addr add 192.168.1.101/24 dev veth1
sudo ip -n net1 link set dev veth1 up

sudo ip -n net1 link set lo up
```

> [!info]
> The `-n` option is short for `ip netns exec`

```bash
sudo ip -n net1 addr show
```

```
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host proto kernel_lo
       valid_lft forever preferred_lft forever
6: veth1@if7: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether 8a:c4:62:3e:2d:23 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 192.168.1.101/24 scope global veth1
       valid_lft forever preferred_lft forever
    inet6 fe80::88c4:62ff:fe3e:2d23/64 scope link proto kernel_ll
       valid_lft forever preferred_lft forever
```

Then set IP address for `veth0` (which is attached to the root namespace) and bring it up:

```bash
sudo ip addr add 192.168.1.100/24 dev veth1
sudo ip link set dev veth0 up
```

Then you can ping the other end and also ping IP addresses that are accessible on the root namespace.

```bash
# ping the other side
sudo ip netns exec net1 ping 192.168.1.100
# ping an address that is accessible from the other side (?)
# no, it is not going to work, because the destination have no idea about 192.168.1.x
# range. SNAT (source NAT) is the answer!
sudo ip netns exec net1 ping 192.168.73.1
```

Let's do it with `iptables`:

```bash
sudo iptables -A FORWARD -j ACCEPT
sudo iptables -t nat -s 192.168.1.0/24 -A POSTROUTING -j MASQUERADE
```

```
Chain POSTROUTING (policy ACCEPT)
target     prot opt source               destination
MASQUERADE  all  --  10.254.1.0/24        anywhere
MASQUERADE  all  --  192.168.1.0/24       anywhere
```

```bash
sudo ip netns exec net1 mtr -rn 192.168.73.1
```

```
Start: 2024-11-12T20:10:32+0000
HOST: death-star                  Loss%   Snt   Last   Avg  Best  Wrst StDev
  1.|-- 192.168.1.100              0.0%    10    0.0   0.1   0.0   0.1   0.0
  2.|-- 192.168.73.1               0.0%    10    1.2   1.5   1.0   3.6   0.8
```
