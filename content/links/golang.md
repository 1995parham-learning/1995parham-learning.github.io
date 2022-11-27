---
title: golang
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

/pterm/ is useful when you need colors, and you need them easy, and fast.

- <https://github.com/pterm/>

but when you need more:

- <https://github.com/charmbracelet/bubbletea>
- <https://github.com/gizak/termui>

## Tests

- <https://github.com/stretchr/testify>

## ORM

/gorm/ is easy and fun, but you also prefer to write down your queries like man.

- <https://github.com/go-gorm/gorm> --- <https://gorm.io/>

## Redis

the popular and backward-compatible redis library that has _context_:

- <https://github.com/go-redis/redis>

this new library is also fun on new versions of redis:

- <https://github.com/rueian/rueidis>
