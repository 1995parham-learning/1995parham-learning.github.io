---
title: Containers
icon: skill-icons:docker
---

## Distroless

[GoogleContainerTools' distroless](https://github.com/GoogleContainerTools/distroless) base images
are often mentioned as one of the ways to produce small(er), fast(er), secure(r) container.

:::note
The idea behind the GoogleContainerTools/distroless project is pretty simple - make a bunch of minimal viable base
images (keeping them as close to _scratch_ as possible) and automate the creation procedure.
:::

### Pitfalls of scratch containers

- Scratch containers miss **proper user management**
- Scratch containers miss **important folders** (`/tmp`, `/home`, `/var`)
- Scratch containers miss **CA certificates**
- Scratch containers miss **timezone info**

While technically scratch base images remain a valid option to produce slim containers, in reality, _using them for
production workloads would likely impose significant operational overhead_.

### Distroless/static

A good starting point to become familiar with the project's offering is the distroless/static base image:

```bash title="dive into distroless/static"
docker pull gcr.io/distroless/static
dive gcr.io/distroless/static
```

The `dive` output tells us:

- The image is **Debian-based**
- It's just around _2 MB_ big and has a single layer (which is just great).
- There is a Linux distro-like directory structure inside.
- The `/etc/passwd`, `/etc/group`, and even `/etc/nsswitch.conf` files are present.
- Certificates and the timezone db seem to be in place as well.

## References

- <https://iximiuz.com/en/posts/containers-distroless-images/>
