## Introduction

Let's begin our exploration of the `log/slog` package by walking through its design and architecture. It provides three main types that you should be familiar with:

- `Logger`: the logging "frontend" which provides level methods such as (`Info()` and `Error()`) for recording events of interest.
- `Record`: a representation of each self-contained log object created by a `Logger`.
- `Handler`: an interface that, once implemented, determines the formatting and destination of each `Record`. Two built-in handlers are included in the `log/slog` package: `TextHandler` and `JSONHandler` for `key=value` and JSON output respectively.

Like most Go logging libraries, the `slog` package exposes a default `Logger` that is accessible through top-level functions. This logger produces an almost identical output as the older `log.Printf()` method, except for the inclusion of log levels: