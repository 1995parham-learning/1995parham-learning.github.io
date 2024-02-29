---
title: Mirrors
icon: noto:mirror
---

One of the main issues in our country is finding the best mirror for removing sanctions.

- Debian: [https://www.debian.org/mirror/](https://www.debian.org/mirror/)
- Alpine: [https://mirrors.alpinelinux.org/](https://mirrors.alpinelinux.org/)
- ArchLinux: [https://archlinux.org/mirrors/](https://archlinux.org/mirrors/)

For _ArchLinux_ you can use `reflector` in your terminal as follows:

```bash title="using reflector to find 10 fastest mirror resides in Iran"
reflector -f 10 -p http,https -c IR --threads 10 | sudo tee /etc/pacman.d/mirrorlist
```

Trust me, `reflector` is awesome and has many useful flags.
