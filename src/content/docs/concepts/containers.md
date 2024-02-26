---
title: Containers
icon: skill-icons:docker
---

## Distroless

[GoogleContainerTools' distroless](https://github.com/GoogleContainerTools/distroless) base images
are often mentioned as one of the ways to produce small(er), fast(er), secure(r) container.

### Pitfalls of scratch containers

- Scratch containers miss proper user management
- Scratch containers miss important folders
- Scratch containers miss CA certificates
- Scratch containers miss timezone info
