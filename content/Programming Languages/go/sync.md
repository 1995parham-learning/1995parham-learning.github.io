## Introduction

Package sync provides basic synchronization primitives such as mutual exclusion locks. Other than the [Once](https://pkg.go.dev/sync#Once) and [WaitGroup](https://pkg.go.dev/sync#WaitGroup) types, most are intended for use by low-level library routines. Higher-level synchronization is better done via channels and communication.

## once

```go
func OnceFunc(f func()) func()
```

`OnceFunc` returns a function that invokes `f` only once. The returned function may be called concurrently.

```go
func OnceValue[T any](f func() T) func() T
```

`OnceValue` returns a function that invokes `f` only once and returns the value returned by `f`. The returned function may be called concurrently.

```go
func OnceValues[T1, T2 any](f func() (T1, T2)) func() (T1, T2)
```


## errgroup

Package errgroup provides synchronization, error propagation, and Context cancelation for groups of goroutines working on subtasks of a common task.

```go
package main

import (
	"fmt"
	"net/http"

	"golang.org/x/sync/errgroup"
)

func main() {
	g := new(errgroup.Group)
	var urls = []string{
		"http://www.golang.org/",
		"http://www.google.com/",
		"http://www.somestupidname.com/",
	}
	for _, url := range urls {
		// Launch a goroutine to fetch the URL.
		url := url // https://golang.org/doc/faq#closures_and_goroutines
		g.Go(func() error {
			// Fetch the URL.
			resp, err := http.Get(url)
			if err == nil {
				resp.Body.Close()
			}
			return err
		})
	}
	// Wait for all HTTP fetches to complete.
	if err := g.Wait(); err == nil {
		fmt.Println("Successfully fetched all URLs.")
	}
}
```