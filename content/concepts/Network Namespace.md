I want to experiment with Network Namespaces on Linux. First enable routing:

```bash
echo 1 | sudo tee /proc/sys/net/ipv4/ip_forward
```

Then create a network namespace named `net1`:

```bash
sudo ip netns add net1
```