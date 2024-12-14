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

`WithContext` returns a new Group and an associated Context derived from `ctx`.

The derived Context is canceled the first time a function passed to `Go` returns a non-nil error or the first time `Wait` returns, whichever occurs first.

```go
package main

import (
	"context"
	"fmt"
	"os"

	"golang.org/x/sync/errgroup"
)

var (
	Web   = fakeSearch("web")
	Image = fakeSearch("image")
	Video = fakeSearch("video")
)

type Result string
type Search func(ctx context.Context, query string) (Result, error)

func fakeSearch(kind string) Search {
	return func(_ context.Context, query string) (Result, error) {
		return Result(fmt.Sprintf("%s result for %q", kind, query)), nil
	}
}

func main() {
	Google := func(ctx context.Context, query string) ([]Result, error) {
		g, ctx := errgroup.WithContext(ctx)

		searches := []Search{Web, Image, Video}
		results := make([]Result, len(searches))
		for i, search := range searches {
			i, search := i, search // https://golang.org/doc/faq#closures_and_goroutines
			g.Go(func() error {
				result, err := search(ctx, query)
				if err == nil {
					results[i] = result
				}
				return err
			})
		}
		if err := g.Wait(); err != nil {
			return nil, err
		}
		return results, nil
	}

	results, err := Google(context.Background(), "golang")
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		return
	}
	for _, result := range results {
		fmt.Println(result)
	}

}
```

```go
func (g *Group) SetLimit(n int)
```

`SetLimit` limits the number of active goroutines in this group to at most n. A negative value indicates no limit.

Any subsequent call to the Go method will block until it can add an active goroutine without exceeding the configured limit.

The limit must not be modified while any goroutines in the group are active.