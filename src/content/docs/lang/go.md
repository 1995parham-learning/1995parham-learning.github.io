---
title: Golang
description: Learn to use Golang and its related libraries.
icon: skill-icons:golang
---

- [Go Wiki: Home - The Go Programming Language](https://go.dev/wiki/)

The Go programming language, also known as Golang, has gained popularity among software practitioners since its release in 2009.
This language offers various features and advantages that make it a preferred choice for many developers.
Golang is an awesome language, but it has sanctioned our country. It is similar to C programming language.

We can use it for writing code as terminal applications or servers. I had experience in using it for writing ReST API
and GraphQL servers.

## Multiple Errors

Go 1.20 expands support for error wrapping to permit an error to wrap multiple other errors:

- An error `e` can wrap more than one error by providing an Unwrap method that returns a `[]error`.
- The `errors.Is` and `errors.As` functions have been updated to inspect multiply wrapped errors.
- The `fmt.Errorf` function now supports multiple occurrences of the `%w` format verb,
  which will cause it to return an error that wraps all of those error operands.
- The new function `errors.Join` returns an error wrapping a list of errors.

### `func As(err error, target any) bool`

`As` finds the first error in `err`'s tree that matches target, and if one is found,
sets target to that error value and returns true. Otherwise, it returns false.

The tree consists of `err` itself, followed by the errors obtained by repeatedly calling its `Unwrap() error` or
`Unwrap() []error` method.
When `err` wraps multiple errors, As examines `err` followed by a **depth-first traversal** of its children.

## Enum

```go
type Weekday int {
    Sunday Weekday = iota
    Monday
    Tuesday
    Wednesday
    Thursday
    Friday
    Saturday
}
```

In this example, we're defining a new type named Weekday which is based on the int type.
We then define constants for each day of the week. The `iota` keyword is a special constant that is used in
conjunction with the `const` keyword. It starts at zero and increments by one for each constant defined,
so Sunday will be 0, Monday will be 1, and so on.

You can then use these values like so:

```go
var today Weekday = Monday
fmt.Println(today)  // prints "1"
```

This approach provides some of the benefits of enums, such as type safety and readable code,
but it's not a perfect replacement. For example, Go doesn't prevent you from assigning
any int value to a Weekday variable, whereas true enums in other languages often restrict
you to a specific set of values.

- [`go-enum`](https://github.com/abice/go-enum)

`go-enum` will take a commented type declaration like this:

```go
// ENUM(jpeg, jpg, png, tiff, gif)
type ImageType int
```

and generate a file with the iota definition along various optional niceties that you may need:

```go
const (
 // ImageTypeJpeg is a ImageType of type Jpeg.
 ImageTypeJpeg ImageType = iota
 // ImageTypeJpg is a ImageType of type Jpg.
 ImageTypeJpg
 // ImageTypePng is a ImageType of type Png.
 ImageTypePng
 // ImageTypeTiff is a ImageType of type Tiff.
 ImageTypeTiff
 // ImageTypeGif is a ImageType of type Gif.
 ImageTypeGif
)

// String implements the Stringer interface.
func (x ImageType) String() string

// ParseImageType attempts to convert a string to a ImageType.
func ParseImageType(name string) (ImageType, error)

// MarshalText implements the text marshaller method.
func (x ImageType) MarshalText() ([]byte, error)

// UnmarshalText implements the text unmarshaller method.
func (x *ImageType) UnmarshalText(text []byte) error
```

## Nil Away

NilAway is a static analysis tool that seeks to help developers avoid nil panics in production by catching them
at compile time rather than runtime. NilAway is similar to the standard nilness analyzer,
however, it employs much more sophisticated and powerful static analysis techniques to track nil flows within
a package as well across packages, and report errors providing users with the nilness flows for easier debugging.

<https://github.com/uber-go/nilaway>

## `comparable`

```go
type comparable interface{}
```

`comparable` is an interface that is implemented by all comparable types (booleans, numbers, strings,
pointers, channels, arrays of comparable types, structs whose fields are all comparable types).
The comparable interface may only be used as a _type parameter constraint_, not as the type of variable.

## `cmp` package

### `cmp.Or`

`Or` returns the first of its arguments that is not equal to the zero value.
If no argument is non-zero, it returns the zero value.

```go
func Or[T comparable](vals ...T) T
```

```go
// Suppose we have some user input
// that may or may not be an empty string
userInput1 := ""
userInput2 := "some text"

fmt.Println(cmp.Or(userInput1, "default"))
fmt.Println(cmp.Or(userInput2, "default"))
fmt.Println(cmp.Or(userInput1, userInput2, "default"))
```

### `cmp.Ordered`

Ordered is a constraint that permits any ordered type: any type that supports the operators `< <= >= >`.
If future releases of Go add new ordered types, this constraint will be modified to include them.

## `slices` package

Package `slices` defines various functions useful with slices of any type.

### `slices.Contains`

Contains reports whether `v` is present in `s`.

```go
func Contains[S ~[]E, E comparable](s S, v E) bool
```

## `maps` package

Package `maps` defines various functions useful with maps of any type.

### `maps.Equal`

Equal reports whether two maps contain the same key/value pairs. Values are compared using `==`.

```go
func Equal[M1, M2 ~map[K]V, K, V comparable](m1 M1, m2 M2) bool
```

## `log/slog` package

Package `slog` provides structured logging, in which log records include a message,
a severity level, and various other attributes expressed as key-value pairs.

It defines a type, Logger, which provides several methods (such as `Logger.Info` and `Logger.Error`)
for reporting events of interest.

## `intrange`

From Go 1.22 (expected release February 2024), you will be able to write:

```go
for i := range 10 {
    fmt.Println(i+1)
}
```

(ranging over an integer in Go iterates from 0 to one less than that integer).

For versions of Go before 1.22, the idiomatic approach is to write a for loop like this.

```go
for i := 1; i <= 10; i++ {
    fmt.Println(i)
}
```

## Modules

In Go 1.16, module-aware commands **report an error** after discovering a problem in `go.mod` or `go.sum` instead
of attempting to fix the problem automatically. In most cases, the error message recommends a command to fix the problem.

## `gotip`

One useful tool that comes with Golang is `gotip`, which allows you to test upcoming changes and experimental features.

```bash title="installing gotip"
go install golang.org/dl/gotip@latest
gotip download
```

After installation, use the `gotip` command instead of your normal `go` command to have latest experimental features.
To update, run `gotip download` again. This will always download the main branch.
To download an alternative branch, run `gotip download BRANCH` and to download a specific CL, run `gotip download NUMBER`.

## `libc`

You can control to use `cgo` with `CGO_ENABLED` flag in go build.
We have different implementation of C standard library.

- [GNU C Library (`glibc`)](https://www.gnu.org/software/libc/)
- [`musl`](https://musl.libc.org/)
- [Microsoft C Runtime Library](https://learn.microsoft.com/en-us/cpp/c-runtime-library/c-run-time-library-reference?view=msvc-170)

## Testing with `testify`

To test with go, [@stretchr/testify](https://pkg.go.dev/github.com/stretchr/testify) is an awesome library.
It has suite, require and assert.

:::note
Always use `_test` prefix on packages for writing tests but in case of internal tests
in which you have access to private package members use `_internal_test.go` as filename.
:::

```go
// Define the suite, and absorb the built-in basic suite
// functionality from testify - including a T() method which
// returns the current testing context
type ExampleTestSuite struct {
    suite.Suite
    VariableThatShouldStartAtFive int
}

// Make sure that VariableThatShouldStartAtFive is set to five
// before each test
func (suite *ExampleTestSuite) SetupTest() {
    suite.VariableThatShouldStartAtFive = 5
}

// All methods that begin with "Test" are run as tests within a
// suite.
func (suite *ExampleTestSuite) TestExample() {
    assert.Equal(suite.T(), 5, suite.VariableThatShouldStartAtFive)
    suite.Equal(5, suite.VariableThatShouldStartAtFive)
}

// In order for 'go test' to run this suite, we need to create
// a normal test function and pass our suite to suite.Run
func TestExampleTestSuite(t *testing.T) {
    suite.Run(t, new(ExampleTestSuite))
}
```

```go
// SetupAllSuite has a SetupSuite method, which will run before the
// tests in the suite are run.
type SetupAllSuite interface {
 SetupSuite()
}

// SetupTestSuite has a SetupTest method, which will run before each
// test in the suite.
type SetupTestSuite interface {
 SetupTest()
}

// TearDownAllSuite has a TearDownSuite method, which will run after
// all the tests in the suite have been run.
type TearDownAllSuite interface {
 TearDownSuite()
}

// TearDownTestSuite has a TearDownTest method, which will run after
// each test in the suite.
type TearDownTestSuite interface {
 TearDownTest()
}

// BeforeTest has a function to be executed right before the test
// starts and receives the suite and test names as input
type BeforeTest interface {
 BeforeTest(suiteName, testName string)
}

// AfterTest has a function to be executed right after the test
// finishes and receives the suite and test names as input
type AfterTest interface {
 AfterTest(suiteName, testName string)
}

// WithStats implements HandleStats, a function that will be executed
// when a test suite is finished. The stats contain information about
// the execution of that suite and its tests.
type WithStats interface {
 HandleStats(suiteName string, stats *SuiteInformation)
}
```

Writing tests with `testify` is awesome, so use them. Also, I write tests with mock for the higher modules and tests the low level one with the real dependencies.
For application that has really great mocks like `redis`, I have used them instead of real one.

## Logging

As I said there are mainly two types of applications developed by Golang.
In the terminal applications, it is better to use [pterm](https://pterm.sh) to show the logs and other information
instead of simply printing them.
In case of the server applications, [zap](https://github.com/uber-go/zap) is a better choice because it has structure logging,
and you can also write the logs on console and syslog at the same time.

Structure logging increase the search efficiency for when you want to search among your
logs on your log aggregation system.

## Observability

Observability lets us understand a system from the outside, by letting us ask questions
about that system without knowing its inner workings.

**Telemetry** refers to data emitted from a system, about its behavior. The data can come in the
form of _traces_, _metrics_, and _logs_.

**Instrumentation** is the act of adding observability code to an app yourself.

**SLI**, or Service Level Indicator, represents a measurement of a service's behavior.
**SLO**, or Service Level Objective, is the means by which reliability is communicated to an organization/other teams.

I want to use a single library for all the telemetries, but until that day we need to use different libraries for each of them.

For tracing and metrics:

[@open-telemetry/opentelemetry-go](https://github.com/open-telemetry/opentelemetry-go)

For logging:

[@uber-go/zap](https://github.com/uber-go/zap)

For metrics:

[@prometheus/client_golang](https://github.com/prometheus/client_golang)

### Span

A **span** represents a unit of work or operation. It tracks specific operation that a request
makes, painting a picture of what happen during the time in which that operation was executed.

An **event** is a human-readable message on a span that represents "something happening"
during its lifetime.

A **status** can be set on a span, typically used to specify that a span has not completed successfully.
If you have an operation that failed, and you wish to capture the error it produced, you can record that error.

### Distributed Traces

A **distributed trace**, more commonly known as a trace, records the paths taken by requests
(made by application or end-user) as they propagate through multiservice architectures, like
microservice and serverless applications.

Traces can extend beyond a single process. This requires context propagation, a mechanism
where identifiers for a trace are sent to remote process.

### OpenTelemetry

OpenTelemetry is an Observability framework and toolkit designed to create and manage
telemetry data such as **traces**, **metrics** and **logs**.
A major goal of OpenTelemetry is that you can easily instrument your applications or systems,
no matter their language, infrastructure, or runtime environment.

The current status of the major functional components for OpenTelemetry Go is as follows:

| Tracing | Metrics | Logging        |
| ------- | ------- | -------------- |
| Stable  | Stable  | In development |

[OpenTelemetry Go API and SDK](https://github.com/open-telemetry/opentelemetry-go)

#### Exporter

The SDK requires an exporter to be created. Exporters are **packages** that allow telemetry data to be emitted somewhere - either to the console (which is what we're doing here),
or to a remote system or collector for further analysis and/or enrichment.
OpenTelemetry supports a variety of exporters through its ecosystem including popular open source tools like Jaeger, Zipkin, and Prometheus.

```go
import stdout "go.opentelemetry.io/otel/exporters/stdout/stdouttrace"

func main() {
 exporter, err := stdout.New(
  stdout.WithPrettyPrint(),
 )
 if err != nil {
  log.Fatalf("failed to initialize stdout export pipeline: %v", err)
 }
}
```

|                                                                              Exporter Package                                                                              | Metrics | Traces |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----: | :----: |
| [go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetricgrpc](https://github.com/open-telemetry/opentelemetry-go/blob/main/exporters/otlp/otlpmetric/otlpmetricgrpc) |    ✓    |        |
| [go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp](https://github.com/open-telemetry/opentelemetry-go/blob/main/exporters/otlp/otlpmetric/otlpmetrichttp) |    ✓    |        |
|   [go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc](https://github.com/open-telemetry/opentelemetry-go/blob/main/exporters/otlp/otlptrace/otlptracegrpc)   |         |   ✓    |
|   [go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp](https://github.com/open-telemetry/opentelemetry-go/blob/main/exporters/otlp/otlptrace/otlptracehttp)   |         |   ✓    |
|                     [go.opentelemetry.io/otel/exporters/prometheus](https://github.com/open-telemetry/opentelemetry-go/blob/main/exporters/prometheus)                     |    ✓    |        |
|            [go.opentelemetry.io/otel/exporters/stdout/stdoutmetric](https://github.com/open-telemetry/opentelemetry-go/blob/main/exporters/stdout/stdoutmetric)            |    ✓    |        |
|             [go.opentelemetry.io/otel/exporters/stdout/stdouttrace](https://github.com/open-telemetry/opentelemetry-go/blob/main/exporters/stdout/stdouttrace)             |         |   ✓    |
|                         [go.opentelemetry.io/otel/exporters/zipkin](https://github.com/open-telemetry/opentelemetry-go/blob/main/exporters/zipkin)                         |         |   ✓    |

#### Tracer Provider

This block of code will create a new batch span processor, a type of span processor that batches up multiple spans over a period of time, that writes to the exporter we created in the previous step.

```go
ctx := context.Background()

bsp := sdktrace.NewBatchSpanProcessor(exporter)
s := sdktrace.AlwaysSampler()
tp := sdktrace.NewTracerProvider(sdktrace.WithSpanProcessor(bsp), sdktrace.WithSampler(s))

// Handle this error in a sensible manner where possible
defer func() { _ = tp.Shutdown(ctx) }()
```

OpenTelemetry requires a trace provider to be initialized in order to generate traces.
A trace provider can have multiple span processors, which are components that allow for span data
to be modified or exported after it's created.

#### Metric Provider

To start producing metrics, you'll need to have an initialized `MetricProvider` that lets you
create a `Meter`.
Meters let you create instruments that you can use to create different kinds of metrics.
OpenTelemetry Go currently supports the following instruments:

- **Counter**, a synchronous instrument that supports non-negative increments.
- **Asynchronous Counter**, an asynchronous instrument which supports non-negative increments
- **Histogram**, a synchronous instrument that supports arbitrary values that are statistically meaningful, such as histograms summaries, or percentile
- **Asynchronous Gauge**, an asynchronous instrument that supports increments and decrements, such as the number of active requests
- **UpDownCounter**, a synchronous instrument that supports increments and decrements, such as the number of active requests
- **Asynchronous UpDown Counter**, an asynchronous instrument that supports increments and decrements

#### Sampler

Sampling is a process that restricts the amount of traces that are generated by a system.

#### Resource

Resource holds information about the entities for which telemetry is exported.

```go
res, err := resource.Merge(
    resource.Default(),
    resource.NewSchemaless(
        semconv.ServiceNamespaceKey.String(cfg.Namespace),
        semconv.ServiceNameKey.String(cfg.ServiceName),
    ),
)
if err != nil {
    panic(err)
}
```

#### Quick Start

First, we're asking the global trace provider for an instance of a tracer,
which is the object that manages spans for our service.

```go
tracer := otel.Tracer("ex.com/basic")
ctx = baggage.ContextWithValues(ctx,
    fooKey.String("foo1"),
    barKey.String("bar1"),
)

func(ctx context.Context) {
    var span trace.Span
    ctx, span = tracer.Start(ctx, "operation")
    defer span.End()

    span.AddEvent("Nice operation!", trace.WithAttributes(attribute.Int("bogons", 100)))
    span.SetAttributes(anotherKey.String("yes"))

    meter.RecordBatch(
        // Note: call-site variables added as context Entries:
        baggage.ContextWithValues(ctx, anotherKey.String("xyz")),
        commonAttributes,

        valueRecorder.Measurement(2.0),
    )

    func(ctx context.Context) {
        var span trace.Span
        ctx, span = tracer.Start(ctx, "Sub operation...")
        defer span.End()

        span.SetAttributes(lemonsKey.String("five"))
        span.AddEvent("Sub span event")
        boundRecorder.Record(ctx, 1.3)
    }(ctx)
}(ctx)
```

## RabbitMQ

There is an official library for AMQP in Golang:

[An AMQP 0-9-1 Go client maintained by the RabbitMQ team](https://github.com/rabbitmq/amqp091-go)

Also, there is another official library for Streams in Golang:

[A client library for RabbitMQ streams](https://github.com/rabbitmq/rabbitmq-stream-go-client)

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

Providing the type argument to `GMin`, in this case `int`, is called _instantiation_. Instantiation happens in two steps. First, the compiler substitutes all type arguments for their respective type parameters throughout the generic function or type. Second, the compiler verifies that each type argument satisfies the respective constraint.

After successful instantiation we have a non-generic function that can be called just like any other function. For example, in code like

```go
fmin := GMin[float64]
m := fmin(2.71, 3.14)
```

#### Type Sets

In Go, type constraints must be interfaces. That is, an interface type can be used as a value type,
and it can also be used as a meta-type. Interfaces define methods, so obviously we can express type constraints that
require certain methods to be present. But `constraints.Ordered` is an interface type too, and the `<`
operator is not a method.

To make this work, we look at interfaces in a new way.

Until recently, the Go spec said that an interface defines a **method set**,
which is roughly the set of methods enumerated in the interface.
Any type that implements all those methods implements that interface.

But another way of looking at this is to say that the interface defines a **set of types**,
namely the types that implement those methods.
From this perspective, any type that is an element of the interface's type set implements the interface.

For our purposes, though, the type set view has an advantage over the method set view:

:::note
we can explicitly add types to the set, and thus control the type set in new ways.
:::

We have extended the syntax for interface types to make this work.
For instance, `interface{ int|string|bool }` defines the type set containing the types `int`, `string`, and `bool`.

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

```bash title="installing koanf with its plugins"
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

There are multiple frameworks in Go. I prefer echo for general use cases,
but when there are performance criteria,
I will choose fiber (seems there is no need for fiber since 1.22).
Huma is something new which wraps currently implemented routers and provides general
add-ons like OpenAPI specification, CLI, etc.

- [`fiber`](https://github.com/gofiber/fiber)
- [`echo`](https://github.com/labstack/echo)
- [`huma`](https://huma.rocks/)

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
- [`bun`](https://github.com/uptrace/bun) is a _SQL-first Golang ORM_ provided by Uptrace.
- [`gorm`](https://github.com/go-gorm/gorm) is easy and fun, but you also prefer to write down your queries, like man 💪.
- [`sqlboiler`](https://github.com/volatiletech/sqlboiler)

## Redis

### [`go-redis`](https://github.com/redis/go-redis)

The popular and backward-compatible Redis library which has _context_ and an awesome sub-package named [`extra`](https://github.com/redis/go-redis/tree/master/extra)
which has things like _tracing_, _monitoring_, etc.

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

The lifecycle of an Fx application has two high-level phases: _initialization_ and _execution_.
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

- _Startup hooks_, also referred to as `OnStart` hooks. These run in the order they were appended.
- _Shutdown hooks_, also referred to as `OnStop` hooks. These run in the **reverse** of the order they were appended.

Typically, components that provide a startup hook also provide a corresponding shutdown hook to release the resources they acquired at startup.

Fx runs both kinds of hooks with a hard timeout enforcement (by default, 15 seconds).
Therefore, hooks are expected to block only as long as they need to _schedule_ work. In other words,

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
