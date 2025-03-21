## Using GoConvey for Testing in Go

[GoConvey](https://github.com/smartystreets/goconvey) is a testing framework for Go that provides a readable DSL for writing test cases with nested structures and web UI support for test execution. It builds on Go’s standard `testing` package while making test outputs more structured and human-readable.

---

## Installation

You can install GoConvey using:

```sh
go get github.com/smartystreets/goconvey
```

---

## Hands-on Example: Testing a Function with GoConvey

### 1. Create a Function to Test

We'll write a simple function that adds two integers:

```go
package mathutils

func Add(a, b int) int {
    return a + b
}
```

### 2. Write a GoConvey Test

Create a test file (`mathutils_test.go`) in the same package:

```go
package mathutils

import (
    "testing"

    . "github.com/smartystreets/goconvey/convey"
)

func TestAdd(t *testing.T) {
    Convey("Given two numbers", t, func() {
        a, b := 3, 5

        Convey("When they are added", func() {
            result := Add(a, b)

            Convey("Then the result should be their sum", func() {
                So(result, ShouldEqual, 8)
            })
        })
    })
}
```

### 3. Run the Tests

To execute tests, use:

```sh
go test ./...
```

Or to use the GoConvey web UI, navigate to your project directory and run:

```sh
$GOPATH/bin/goconvey
```

Then open `http://localhost:8080` in a browser.

## Key Features of GoConvey in the Example

1. `Convey(description, t, func())` – Defines a test case with a clear description.
2. **Nested `Convey` blocks** – Allows structuring tests hierarchically.
3. `So(value, assertion, expected)` – Asserts conditions (`ShouldEqual`, `ShouldBeNil`, etc.).
4. **Readable output** – GoConvey enhances readability by showing structured test outputs.

---

## Key Features of GoConvey

### Nested Test Cases

GoConvey supports **hierarchical test structures**, making tests easier to read and maintain:

```go
func TestMathOperations(t *testing.T) {
    Convey("Given a set of numbers", t, func() {
        a, b := 10, 20

        Convey("When adding them", func() {
            result := Add(a, b)

            Convey("Then the result should be correct", func() {
                So(result, ShouldEqual, 30)
            })
        })

        Convey("When subtracting them", func() {
            result := a - b

            Convey("Then the result should be correct", func() {
                So(result, ShouldEqual, -10)
            })
        })
    })
}
```

This structure ensures **grouping of related tests** under a common setup.

### Assertions (`So` Function)

GoConvey provides **rich assertions** using the `So` function:

| Assertion        | Description                                  | Example                              |
| ---------------- | -------------------------------------------- | ------------------------------------ |
| `ShouldEqual`    | Checks if values are equal                   | `So(x, ShouldEqual, 5)`              |
| `ShouldNotEqual` | Checks if values are not equal               | `So(x, ShouldNotEqual, 10)`          |
| `ShouldBeNil`    | Checks if value is `nil`                     | `So(err, ShouldBeNil)`               |
| `ShouldNotBeNil` | Checks if value is **not** `nil`             | `So(obj, ShouldNotBeNil)`            |
| `ShouldBeTrue`   | Checks if value is `true`                    | `So(flag, ShouldBeTrue)`             |
| `ShouldBeFalse`  | Checks if value is `false`                   | `So(flag, ShouldBeFalse)`            |
| `ShouldContain`  | Checks if a slice or string contains a value | `So([]int{1,2,3}, ShouldContain, 2)` |
| `ShouldResemble` | Deep comparison of slices, structs, maps     | `So(slice1, ShouldResemble, slice2)` |

Example:

```go
So(5, ShouldEqual, 5)         // Pass
So(10, ShouldNotEqual, 5)     // Pass
So(nil, ShouldBeNil)          // Pass
So([]int{1, 2, 3}, ShouldContain, 2) // Pass
```

### Table-Driven Testing with GoConvey

For repetitive tests, GoConvey can be used in a **table-driven** manner.

```go
func TestAddMultipleCases(t *testing.T) {
    testCases := []struct {
        a, b     int
        expected int
    }{
        {1, 2, 3},
        {5, 5, 10},
        {10, -10, 0},
    }

    Convey("Testing Add function with multiple cases", t, func() {
        for _, tc := range testCases {
            Convey("Adding two numbers", func() {
                So(Add(tc.a, tc.b), ShouldEqual, tc.expected)
            })
        }
    })
}
```

### Handling Edge Cases and Error Conditions

Let's modify our function to return an error if inputs are negative:

```go
package mathutils

import "errors"

func SafeAdd(a, b int) (int, error) {
    if a < 0 || b < 0 {
        return 0, errors.New("negative numbers not allowed")
    }
    return a + b, nil
}
```

Now, let's test it:

```go
func TestSafeAdd(t *testing.T) {
    Convey("Given two numbers", t, func() {
        Convey("When both are positive", func() {
            result, err := SafeAdd(3, 5)

            Convey("Then it should return their sum without error", func() {
                So(result, ShouldEqual, 8)
                So(err, ShouldBeNil)
            })
        })

        Convey("When one is negative", func() {
            result, err := SafeAdd(-3, 5)

            Convey("Then it should return an error", func() {
                So(result, ShouldEqual, 0)
                So(err, ShouldNotBeNil)
                So(err.Error(), ShouldEqual, "negative numbers not allowed")
            })
        })
    })
}
```
