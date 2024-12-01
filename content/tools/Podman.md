## Podman vs Docker

![[Screenshot 2024-12-01 at 5.38.13 AM.png]]

Docker client-server architecture. The container is a direct descendant of `containerd`, not the Docker client. The kernel sees no relationship between the client program and the container.

![[Screenshot 2024-12-01 at 5.39.24 AM.png]]

Podman fork/exec architecture. The user launches Podman, which executes the OCI runtime, which then launches the container. The container is a direct descendant of Podman.

> [!info]
> Your container will continue to run without the overhead of running the multiple daemons.
