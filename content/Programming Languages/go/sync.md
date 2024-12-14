## Introduction

Package sync provides basic synchronization primitives such as mutual exclusion locks. Other than the [Once](https://pkg.go.dev/sync#Once) and [WaitGroup](https://pkg.go.dev/sync#WaitGroup) types, most are intended for use by low-level library routines. Higher-level synchronization is better done via channels and communication.

```go
func OnceFunc(f func()) func()
```

`OnceFunc` returns a function that invokes `f` only once. The returned function may be called concurrently.

```go
func OnceValue[T any](f func() T) func() T
```

`OnceValue` returns a function that invokes `f` only once and returns the value returned by f. The returned function may be called concurrently.

```go
func OnceValues[T1, T2 any](f func() (T1, T2)) func() (T1, T2)
```
