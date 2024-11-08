## Distroless

[GoogleContainerTools' distroless](https://github.com/GoogleContainerTools/distroless) base images are often mentioned as one of the ways to produce small(er), fast(er), secure(r) container.

> [!note]
> The idea behind the GoogleContainerTools/distroless project is pretty simple - make a bunch of minimal viable base mages (keeping them as close to _scratch_ as possible) and automate the creation procedure.

### Pitfalls of scratch containers

- Scratch containers miss **proper user management**
- Scratch containers miss **important folders** (`/tmp`, `/home`, `/var`)
- Scratch containers miss **CA certificates**
- Scratch containers miss **timezone info**

While technically scratch base images remain a valid option to produce slim containers, in reality, _using them for production workloads would likely impose significant operational overhead_.

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

### Not every program is statically linked

A nice by-product of experimenting with "from scratch" containers is that it allows you to learn what is actually needed for a program to run.
For a **statically linked** executable, it seems to be just a bunch of config files and a proper rootfs directory structure.
But what would it take for a **dynamically linked** one?
### Distroless/base

The `distroless/static` image sounds like a perfect choice for a base image if your program is a statically linked Go binary.
But what if you absolutely have to use CGO and the libraries you depend on can't be statically linked (I'm looking at your, glibc)?
Or you write things in Rust, or C, or any other compiled language with less perfect support of static builds than in Go?

What the `dive` output tells us:

```bash title="dive into distroless/base"
docker pull gcr.io/distroless/base

dive gcr.io/distroless/base
```

- It's 10 times bigger than distroless/static (but still just around _20 MB_).
- It has two layers (and the first layer IS distroless/static).
- The second layer brings tons of shared libraries - most notably `libc` and `openssl`.

### Distroless/cc

For some reason, Rust has a runtime dependency on `libgcc`, and it's not present in the `distroless/base`.

```bash title="dive into distroless/cc"
docker pull gcr.io/distroless/cc

dive gcr.io/distroless/cc
```

The `dive` output tells us that:

- It's a three-layered image (based on distroless/base),
- The new layer is just about _2 MB_ big.
- The new layer contains `libstdc++`, a bunch of static assets, and even some Python scripts (but no Python itself)!

### At A Glance

![distroless-at-a-glance](distroless-at-a-glance.png)

## References

- <https://iximiuz.com/en/posts/containers-distroless-images/>
