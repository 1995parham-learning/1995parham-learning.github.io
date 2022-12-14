---
title: golang
repositories:
  "go101": https://github.com/1995parham-learning/go101
---

## Configuration

Personally I love to have all configuration well-defined and structured,
the thing that I couldn't achieve with [viper](https://github.com/spf13/viper),
so I prefer:

- <https://github.com/knadh/koanf>

## Standard CLI

Having multiple sub-command for things like migrations, insert initiation data, etc.

- <https://github.com/spf13/cobra>

There is also another options, but I use it rarely:

- <https://github.com/urfave/cli>

## HTTP Frameworks

There are multiple frameworks in Go:

- <https://gofiber.io/> --- <https://github.com/gofiber/fiber>
- <https://echo.labstack.com/> --- <https://github.com/labstack/echo>

## Telemetry

I want to use a single library for all the logging, metrics and tracing
but until that day we have:

- <https://github.com/prometheus/client_golang>
- <https://github.com/open-telemetry/opentelemetry-go>
- <https://github.com/uber-go/zap>

Please note that for using open-telemetry you may need multiple packages,
so install them from an example.

## Advanced Console UIs

_pterm_ is useful when you need colors, and you need them easy, and fast.

- <https://github.com/pterm/>

but when you need more:

- <https://github.com/charmbracelet/bubbletea>
- <https://github.com/gizak/termui>

## Tests

- <https://github.com/stretchr/testify>

## ORM

_gorm_ is easy and fun, but you also prefer to write down your queries like man.

- <https://github.com/go-gorm/gorm> --- <https://gorm.io/>

## Redis

The popular and backward-compatible Redis library that has _context_ and awesome sub-package named `extra`
which has things like _tracing_, _monitoring_, etc.

- <https://github.com/go-redis/redis>
- <https://github.com/go-redis/redis/tree/master/extra>

There is a new library which is fun and only works on new versions of Redis:

- <https://github.com/rueian/rueidis>

## MongoDB

There is no good ORM for MongoDB in Go, so its official database driver is the best choice:

- <https://github.com/mongodb/mongo-go-driver>
- <https://github.com/open-telemetry/opentelemetry-go-contrib/tree/main/instrumentation/go.mongodb.org/mongo-driver/mongo/otelmongo>
