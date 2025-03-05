As I said there are mainly two types of applications developed by Golang.
In the terminal applications, it is better to use [pterm](https://pterm.sh) to show the logs and other information
instead of simply printing them.
In case of the server applications, [zap](https://github.com/uber-go/zap) is a better choice because it has structure logging,
and you can also write the logs on console and syslog at the same time.

Structure logging increase the search efficiency for when you want to search among your
logs on your log aggregation system.