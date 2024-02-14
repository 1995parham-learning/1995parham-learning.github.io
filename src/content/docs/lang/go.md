---
title: Golang
description: Learn to use Golang and its related libraries.
icon: skill-icons:golang
---

- [Go Wiki: Home - The Go Programming Language](https://go.dev/wiki/)

## Context

:::note
⭐ There are three main rules to observe when handling context plumbing in Go: only entrypoint functions
should create new contexts, contexts are only passed down the call chain,
and don't store contexts or otherwise use them after the function returns.
:::

Context is one of the foundational building blocks in Go.
Anyone with even a cursory experience with the language is likely to have encountered it,
as it's the first argument passed to functions that accept contexts. I see the purpose of context as twofold:

1. Provide a **[control-flow](https://en.wikipedia.org/wiki/Control_flow)** mechanism across API boundaries with signals.
2. Carrying request-scoped data across API boundaries.

### A couple of rules of thumb to start

1. Only entry-point functions (the one at the top of a call chain) should create an empty context
   (i.e., `context.Background()`). For example, `main()`, `TestXxx()`.
   The HTTP library creates a custom context for each request,
   which you should access and pass. Of course, mid-chain functions can create child contexts
   to pass along if they need to share data or have flow control over the functions they call.

   ```go {4,5}
   // Create a new context.
   parent, cancelParent := context.WithCancel(context.Background())
   // Derive child contexts from parent.
   childA, _ := context.WithTimeout(parent, 5 * time.Secound)
   childB, _ := context.WithDeadline(parent, time.Now().Add(1 * time.Minute)
   ```

2. Contexts are (only) passed down the call chain.
   If you're not in an entry-point function, and you need to call a function that takes a context,
   your function should accept a context and pass that along.
   But what if, for some reason, you can't currently get access to the context at the top of the chain?
   In that case, use `context.TODO()`. This signals that the context is not yet available,
   and further work is required. Perhaps maintainers of another library you depend on will need to extend their
   functions to accept a context so that you, in turn, can pass it on. Of course,
   a function should never be returning a context.

## `Rangefunc`

- [Go Wiki: `Rangefunc` Experiment - The Go Programming Language](https://go.dev/wiki/RangefuncExperiment)

## Generics

- [Tutorial: Getting started with generics - The Go Programming Language](https://go.dev/doc/tutorial/generics)
- [An Introduction To Generics - The Go Programming Language](https://go.dev/blog/intro-generics)
- [Type Parameters Proposal](https://go.googlesource.com/proposal/+/HEAD/design/43651-type-parameters.md)

The Go 1.18 release adds support for generics.
Generics are a way of writing code that is independent of the specific types being used.
Functions and types may now be written to use any of a set of types.

### Type Parameters

Functions and types are now permitted to have type parameters.
A type parameter list looks like an ordinary parameter list,
except that it uses square brackets instead of parentheses.

To show how this works, let's start with the basic non-generic `Min` function for floating point values:

```go
func Min(x, y float64) float64 {
    if x < y {
        return x
    }
    return y
}
```

We can make this function generic-make it work for different types-by adding a type parameter list.
In this example we add a type parameter list with a single type parameter `T`,
and replace the uses of `float64` with `T`.

```go
import "constraints"

func GMin[T constraints.Ordered](x, y T) T {
    if x < y {
        return x
    }
    return y
}
```

It is now possible to call this function with a type argument by writing a call like

```go
x := GMin[int](2, 3)
```

Providing the type argument to `GMin`, in this case `int`, is called *instantiation*. Instantiation happens in two steps. First, the compiler substitutes all type arguments for their respective type parameters throughout the generic function or type. Second, the compiler verifies that each type argument satisfies the respective constraint.

After successful instantiation we have a non-generic function that can be called just like any other function. For example, in code like

```go
fmin := GMin[float64]
m := fmin(2.71, 3.14)
```

#### Type Sets

In Go, type constraints must be interfaces. That is, an interface type can be used as a value type, and it can also be used as a meta-type. Interfaces define methods, so obviously we can express type constraints that require certain methods to be present. But `constraints.Ordered` is an interface type too, and the < operator is not a method.

To make this work, we look at interfaces in a new way.

Until recently, the Go spec said that an interface defines a method set, which is roughly the set of methods enumerated in the interface. Any type that implements all those methods implements that interface.

But another way of looking at this is to say that the interface defines a set of types, namely the types that implement those methods. From this perspective, any type that is an element of the interface's type set implements the interface.

For our purposes, though, the type set view has an advantage over the method set view: we can explicitly add types to the set, and thus control the type set in new ways.

We have extended the syntax for interface types to make this work. For instance, `interface{ int|string|bool }` defines the type set containing the types `int`, `string`, and `bool`.

Now let's look at the actual definition of `constraints.Ordered`:

```go
type Ordered interface {
    Integer|Float|~string
}
```

This declaration says that the `Ordered` interface is the set of all integer, floating-point, and string types.
The vertical bar expresses a union of types (or sets of types in this case). `Integer` and `Float` are interface
types that are similarly defined in the `constraints` package.
Note that there are no methods defined by the `Ordered` interface.

For type constraints we usually don't care about a specific type, such as `string`; we are interested in all string types.
That is what the `~` token is for. The expression `~string` means the set of all types whose underlying type is `string`.
This includes the type `string` itself as well as all types declared with definitions such as `type MyString string`.

## Configuration 🔧

Personally, I love to have all configuration well-defined and structured, the thing that I couldn't achieve with
[viper](https://github.com/spf13/viper), so I prefer [koanf](https://github.com/knadh/koanf).
For using `koanf` you need to install its core package besides the required providers and parsers as follows:

```shell
go get -u github.com/knadh/koanf/v2

go get -u github.com/knadh/koanf/providers/file
go get -u github.com/knadh/koanf/providers/env
go get -u github.com/knadh/koanf/providers/structs

go get -u github.com/knadh/koanf/parsers/toml
```

`koanf.Provider` is a generic interface that provides configuration, for example, from files, environment variables, HTTP sources, or anywhere.
The configuration can either be raw bytes that a parser can parse, or it can be a nested `map[string]interface{}` that can be directly loaded.

`koanf.Parser` is a generic interface that takes raw bytes, parses, and returns a nested `map[string]interface{}`.
For example, JSON and YAML parsers.

```go
// Load JSON config.
if err := k.Load(file.Provider("mock/mock.json"), json.Parser()); err != nil {
 log.Fatalf("error loading config: %v", err)
}
```

```go
// Load environment variables and merge into the loaded config.
// "MYVAR" is the prefix to filter the env vars by.
// "." is the delimiter used to represent the key hierarchy in env vars.
// The (optional, or can be nil) function can be used to transform
// the env var names, for instance, to lowercase them.
//
// For example, env vars: MYVAR_TYPE and MYVAR_PARENT1__CHILD1__NAME
// will be merged into the "type" and the nested "parent1.child1.name"
// keys in the config file here as we lowercase the key,
// replace `_` with `.` and strip the MYVAR_ prefix so that
// only "parent1.child1.name" remains.
k.Load(env.Provider("MYVAR_", ".", func(s string) string {
 return strings.ReplaceAll(strings.ToLower(
  strings.TrimPrefix(s, "MYVAR_")), "__", ".")
}), nil)
```

## Standard CLI 💾

Having multiple sub-command for things like migrations, insert ground data, etc.

[cobra](https://github.com/spf13/cobra)

There is also another options, which uses generics and more advance concepts:

[cli](https://github.com/urfave/cli)

## HTTP Frameworks

There are multiple frameworks in Go. I prefer echo for general use cases, but when there are performance criteria, I will choose fiber.

- [fiber](https://github.com/gofiber/fiber)
- [echo](https://github.com/labstack/echo)

## Telemetry

I want to use a single library for all the logging, metrics and tracing,
but until that day we need to use different libraries for each of them.

For tracing and metrics:

[https://github.com/open-telemetry/opentelemetry-go](https://github.com/open-telemetry/opentelemetry-go)

For logging:

[https://github.com/uber-go/zap](https://github.com/uber-go/zap)

For metrics:

[https://github.com/prometheus/client_golang](https://github.com/prometheus/client_golang)

Please note that for using open-telemetry you need multiple dependencies, so install them from an example.

## Advanced Console UIs 💅

[`pterm`](https://github.com/pterm/pterm) is useful when you need colorful texts.
But when you need advance TUI features:

- [bubbletea](https://github.com/charmbracelet/bubbletea)
- [termui](https://github.com/gizak/termui)

## Testing 🧨

You can write tests using suites or using the behavior testing.

[https://github.com/onsi/ginkgo](https://github.com/onsi/ginkgo)

[https://github.com/stretchr/testify](https://github.com/stretchr/testify)

## ORM

ORM means Object Relational Mapper, it helps you to manage your database models and queries easier. In Go, people may prefer to write down their queries like man, but we have the following ORMs in Go:

- [`ent`](https://github.com/ent/ent)
- [`bun`](https://github.com/uptrace/bun) is a *SQL-first Golang ORM* provided by Uptrace.
- [`gorm`](https://github.com/go-gorm/gorm) is easy and fun, but you also prefer to write down your queries, like man 💪.
- [`sqlboiler`](https://github.com/volatiletech/sqlboiler)

## Redis

### [`go-redis`](https://github.com/redis/go-redis)

The popular and backward-compatible Redis library which has *context* and an awesome sub-package named [`extra`](https://github.com/redis/go-redis/tree/master/extra)
which has things like *tracing*, *monitoring*, etc.

### [`rueidis`](https://github.com/redis/rueidis)

It is a new library which is fun and only works on new versions of Redis:

## MongoDB 🥭

There is no good ORM for MongoDB in Go, so its official database driver is the best choice.
Besides that, it has [`otelmongo`](https://github.com/open-telemetry/opentelemetry-go-contrib/tree/main/instrumentation/go.mongodb.org/mongo-driver/mongo/otelmongo) telemetry package.

- [mongo-go-driver](https://github.com/mongodb/mongo-go-driver)

## Task Queue 😴

Sometimes you want to queue tasks and process them later. `Asynq` library can do it for you with Redis,
but I think using Redis on scale is a drawback of this library.
I prefer to use Jetstream for these kinds of things.

- [asynq](https://github.com/hibiken/asynq)

## Dependency Injection 💉

Generating code on Golang is not my interest, but this framework is really nice and easily can generate useful binding.
These frameworks can do the dependency injection without code generation, and I kinda like them:

- [do](https://github.com/samber/do)
- [wire](https://github.com/google/wire)

### [Fx](https://github.com/uber-go/fx)

> Dependency injection system for Go.

**Eliminate globals**: Fx helps you remove global state from your application. No more init() or global variables. Use Fx-managed singletons.

**Code reuse**: Fx lets teams within your organization build loosely-coupled and well-integrated shareable components.

**Battle-tested**: Fx is the backbone of nearly all Go services at Uber.

We built an empty Fx application by calling `fx.New` with no arguments.
Applications will normally pass arguments to `fx.New` to set up their components.

We then run this application with the `App.Run` method. This method blocks until it receives a signal to stop,
and it then runs any cleanup operations necessary before exiting.

Fx is primarily intended for long-running server applications; these applications typically receive a signal from the deployment system when it's time to shut down.

An App is a modular application built around dependency injection. Most users will only need to use the New constructor and the all-in-one Run convenience method. In more unusual cases, users may need to use the Err, Start, Done, and Stop methods by hand instead of relying on Run.

In addition to that built-in functionality, users typically pass a handful of **Provide** options and one or more **Invoke** options. The Provide options teach the application how to instantiate a variety of types, and the Invoke options describe how to initialize the application.

When created, the application immediately executes all the functions passed via Invoke options. To supply these functions with the parameters they need, the application looks for constructors that return the appropriate types; if constructors for any required types are missing or any invocations return an error, the application will fail to start (and Err will return a descriptive error message).

Once all the invocations (and any required constructors) **have been called**, New returns and the application is ready to be started using `Run` or `Start` . On startup, it executes any OnStart hooks registered with its Lifecycle.

```go
func Provide(lc fx.Lifecycle, store *urlsvc.URLSvc, logger *zap.Logger, tele telemetry.Telemetery) *echo.Echo {
 app := echo.New()

 handler.URL{
  Store:  store,
  Logger: logger.Named("handler").Named("url"),
  Tracer: tele.TraceProvider.Tracer("handler.url"),
 }.Register(app.Group("/api"))

 handler.Healthz{
  Logger: logger.Named("handler").Named("healthz"),
  Tracer: tele.TraceProvider.Tracer("handler.healthz"),
 }.Register(app.Group(""))

 lc.Append(
  fx.Hook{
   OnStart: func(_ context.Context) error {
    go func() {
     if err := app.Start(":1378"); !errors.Is(err, http.ErrServerClosed) {
      logger.Fatal("echo initiation failed", zap.Error(err))
     }
    }()

    return nil
   },
   OnStop: app.Shutdown,
  },
 )

 return app
}
```

#### Application lifecycle

The lifecycle of an Fx application has two high-level phases: *initialization* and *execution*.
Both of these, in turn are comprised of multiple steps.

During **initialization**, Fx will,

- register all constructors passed to `fx.Provide`
- register all decorators passed to `fx.Decorate`
- run all functions passed to `fx.Invoke`, calling constructors and decorators as needed

During **execution**, Fx will,

- run all startup hooks appended to the application by providers, decorators, and invoked functions
- wait for a signal to stop running
- run all shutdown hooks appended to the application

![fx-flow](./go/fx-flow.png)

#### Lifecycle hooks

Lifecycle hooks provide the ability to schedule work to be executed by Fx,
when the application starts up or shuts down. Fx provides two kinds of hooks:

- *Startup hooks*, also referred to as `OnStart` hooks. These run in the order they were appended.
- *Shutdown hooks*, also referred to as `OnStop` hooks. These run in the **reverse** of the order they were appended.

Typically, components that provide a startup hook also provide a corresponding shutdown hook to release the resources they acquired at startup.

Fx runs both kinds of hooks with a hard timeout enforcement (by default, 15 seconds).
Therefore, hooks are expected to block only as long as they need to *schedule* work. In other words,

- hooks **must not** block to run long-running tasks synchronously
- hooks **should** schedule long-running tasks in background goroutines
- shutdown hooks **should** stop the background work started by startup hooks

#### Modules

A Fx module is a shareable Go library or package that provides self-contained functionality to an Fx application.\*\*\*\*

#### Result Structs

Result structs are the inverse of parameter structs. These structs represent multiple outputs from a single function as fields. Fx treats all structs embedding fx.Out as result structs, so other constructors can rely on the result struct's fields directly.

Without result structs, we sometimes have function definitions like this:

```go
func SetupGateways(conn *sql.DB) (*UserGateway, *CommentGateway, *PostGateway, error) {
  // ...
}
```

With result structs, we can make this both more readable and easier to modify in the future:

```go
type Gateways struct {
  fx.Out

  Users    *UserGateway
  Comments *CommentGateway
  Posts    *PostGateway
}

func SetupGateways(conn *sql.DB) (Gateways, error) {
  // ...
}
```

## GraphQL

GraphQL is an awesome way to communicate data with the frontend team. Using GraphQL you can ask the frontend team to write queries for accessing the backend data and because of that there is no need to design different APIs for different requests. You have one API to rule them all.

[https://github.com/99designs/gqlgen](https://github.com/99designs/gqlgen)
