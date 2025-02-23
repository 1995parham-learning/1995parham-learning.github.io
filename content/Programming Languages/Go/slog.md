## Introduction

Let's begin our exploration of the `log/slog` package by walking through its design and architecture. It provides three main types that you should be familiar with:

- `Logger`: the logging "frontend" which provides level methods such as (`Info()` and `Error()`) for recording events of interest.
- `Record`: a representation of each self-contained log object created by a `Logger`.
- `Handler`: an interface that, once implemented, determines the formatting and destination of each `Record`. Two built-in handlers are included in the `log/slog` package: `TextHandler` and `JSONHandler` for `key=value` and JSON output respectively.

Like most Go logging libraries, the `slog` package exposes a default `Logger` that is accessible through top-level functions. This logger produces an almost identical output as the older `log.Printf()` method, except for the inclusion of log levels:

```go
package main

import (
    "log"
    "log/slog"
)

func main() {
    log.Print("Info message")
    slog.Info("Info message")
}
```

```text
2024/01/03 10:24:22 Info message
2024/01/03 10:24:22 INFO Info message
```

This is a somewhat bizarre default since Slog's main purpose is to bring structured logging to the standard library.

It's easy enough to correct this by creating a custom `Logger` instance through the `slog.New()` method. It accepts an implementation of `Handler` interface, which determines how the logs are formatted and where they are written to.

Here's an example that uses the built-in `JSONHandler` type to output JSON logs to the `stdout`:

```go
func main() {
    logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
    logger.Debug("Debug message")
    logger.Info("Info message")
    logger.Warn("Warning message")
    logger.Error("Error message")
}
```

```json
{"time":"2023-03-15T12:59:22.227408691+01:00","level":"INFO","msg":"Info message"}
{"time":"2023-03-15T12:59:22.227468972+01:00","level":"WARN","msg":"Warning message"}
{"time":"2023-03-15T12:59:22.227472149+01:00","level":"ERROR","msg":"Error message"}
```

When the `TextHandler` type is used instead, each log record will be formatted according to the [Logfmt standard](https://betterstack.com/community/guides/logging/logfmt/):

```go
logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
```

```text
time=2023-03-15T13:00:11.333+01:00 level=INFO msg="Info message"
time=2023-03-15T13:00:11.333+01:00 level=WARN msg="Warning message"
time=2023-03-15T13:00:11.333+01:00 level=ERROR msg="Error message"
```

## Adding contextual attributes to log records

A significant advantage of structured logging over unstructured formats is the ability to add arbitrary attributes as key/value pairs in log records.

These attributes provide additional context about the logged event, which can be valuable for tasks such as troubleshooting, generating metrics, auditing, and various other purposes.

Here's an example illustrating how it works in Slog:

```go
logger.Info(
  "incoming request",
  "method", "GET",
  "time_taken_ms", 158,
  "path", "/hello/world?q=search",
  "status", 200,
  "user_agent", "Googlebot/2.1 (+http://www.google.com/bot.html)",
)
```

Another way to prevent such mistakes is by using strongly-typed contextual attributes as shown below:

```go
logger.Info(
  "incoming request",
  slog.String("method", "GET"),
  slog.Int("time_taken_ms", 158),
  slog.String("path", "/hello/world?q=search"),
  slog.Int("status", 200),
  slog.String(
    "user_agent",
    "Googlebot/2.1 (+http://www.google.com/bot.html)",
  ),
)
```
