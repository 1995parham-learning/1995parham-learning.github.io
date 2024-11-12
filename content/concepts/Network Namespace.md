I want to experiment with Network Namespaces on Linux. First enable routing:

```bash
echo 1 | sudo tee /proc/sys/net/ipv4/ip_forward
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