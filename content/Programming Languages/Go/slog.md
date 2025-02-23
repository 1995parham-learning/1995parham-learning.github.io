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