---
title: mirrors
---

One the main issues in our country is finding the best mirror for removing sanctions.

- Debian: <https://www.debian.org/mirror/>
- Alpine: <https://mirrors.alpinelinux.org/>
- ArchLinux: <https://archlinux.org/mirrors/>

For /ArchLinux/ you can use `reflector` in your terminal as follow:

{{< highlight bash >}}
reflector -f 10 -p http,https -c IR --threads 10 | sudo tee /etc/pacman.d/mirrorlist
{{< /highlight >}}

Trust me `reflector` is awesome and has many useful flags.
