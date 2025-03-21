## GoConvey

### Using GoConvey for Testing in Go

[GoConvey](https://github.com/smartystreets/goconvey) is a testing framework for Go that provides a readable DSL for writing test cases with nested structures and web UI support for test execution. It builds on Go’s standard `testing` package while making test outputs more structured and human-readable.

---

### Installation

You can install GoConvey using:

```sh
go get github.com/smartystreets/goconvey
```

---

### Hands-on Example: Testing a Function with GoConvey

#### 1. Create a Function to Test

We'll write a simple function that adds two integers:

```go
package mathutils

func Add(a, b int) int {
    return a + b
}
```

#### 2. Write a GoConvey Test

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

#### 3. Run the Tests

To execute tests, use:

```sh
go test ./...
```

Or to use the GoConvey web UI, navigate to your project directory and run:

```sh
$GOPATH/bin/goconvey
```

Then open `http://localhost:8080` in a browser.

### Key Features of GoConvey in the Example

1. `Convey(description, t, func())` – Defines a test case with a clear description.
2. **Nested `Convey` blocks** – Allows structuring tests hierarchically.
3. `So(value, assertion, expected)` – Asserts conditions (`ShouldEqual`, `ShouldBeNil`, etc.).
4. **Readable output** – GoConvey enhances readability by showing structured test outputs.

---

### Key Features of GoConvey

#### Nested Test Cases

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

#### Assertions (`So` Function)

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

#### Table-Driven Testing with GoConvey

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

#### Handling Edge Cases and Error Conditions

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

## testify

> Testify is being maintained at v1, no breaking changes will be accepted in this repo.

The [`@stretchr/testify`](https://github.com/stretchr/testify) library is a popular testing toolkit for the Go programming language. It provides a rich set of utilities to make writing tests more efficient and expressive. The library is widely used in the Go community due to its simplicity and powerful features. It extends the standard `testing` package in Go and offers additional functionalities such as assertions, mocking, and test suites.

1. **Assertions**:

    - `testify` provides a comprehensive set of assertion functions that make it easy to validate conditions in your tests.
    - These assertions are more expressive and provide better error messages compared to the standard `if` checks in Go.
    - Common assertions include `Equal`, `NotEqual`, `Nil`, `NotNil`, `True`, `False`, `Error`, `NoError`, and many more.

```go
package yours

import (
  "testing"
  "github.com/stretchr/testify/assert"
)

func TestSomething(t *testing.T) {

  // assert equality
  assert.Equal(t, 123, 123, "they should be equal")

  // assert inequality
  assert.NotEqual(t, 123, 456, "they should not be equal")

  // assert for nil (good for errors)
  assert.Nil(t, object)

  // assert for not nil (good when you expect something)
  if assert.NotNil(t, object) {

    // now we know that object isn't nil, we are safe to make
    // further assertions without causing any errors
    assert.Equal(t, "Something", object.Value)

  }
}
```

```go
package mypackage

import (
    "testing"

    "github.com/stretchr/testify/assert"
)

func Add(a, b int) int {
    return a + b
}

func TestAdd(t *testing.T) {
    result := Add(2, 3)

    // Basic equality assertion
    assert.Equal(t, 5, result, "The sum should be 5")

    // Inequality assertion
    assert.NotEqual(t, 6, result, "The sum should not be 6")

    // More specific type assertion
    assert.IsType(t, 5, result, "Result should be an int")

    // Boolean assertions
    assert.True(t, result > 0, "Result should be positive")
    assert.False(t, result < 0, "Result should not be negative")

    // String assertions
    myString := "hello world"
    assert.Contains(t, myString, "world", "String should contain 'world'")
    assert.StartsWith(t, myString, "hello", "String should start with 'hello'")

    // Nil assertions
    var myNilPointer *int
    assert.Nil(t, myNilPointer, "Pointer should be nil")

    // Error assertions
    err := someFunctionThatMightError()
    assert.NoError(t, err, "Should be no error")
    // OR, if you expect an error:
    // assert.Error(t, err, "An error should have occurred")
    // assert.ErrorContains(t, err, "specific error message", "Error should contain message")

}

func someFunctionThatMightError() error {
    // Simulate an error (or no error)
    // return errors.New("something went wrong") // Uncomment to simulate error
    return nil
}
```

2. **Mocking**:

    - The `testify/mock` package allows you to create mock objects for testing.
    - Mocking is useful when you want to isolate the unit under test by replacing dependencies with controlled implementations.
    - You can define expectations on mock objects, such as which methods should be called, with what arguments, and what they should return.

3. **Test Suites**:

    - The `testify/suite` package provides a way to organize tests into suites.
    - Test suites are useful for grouping related tests and sharing common setup and teardown logic.
    - You can define setup (`SetupTest`) and teardown (`TearDownTest`) methods that run before and after each test in the suite.

```go
package mypackage

import (
    "testing"

    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/suite"
)

type MyTestSuite struct {
	suite.Suite
	// Add fields here for setup/teardown if needed
	// Example: db *sql.DB
}

func (s *MyTestSuite) SetupSuite() {
    // This runs once before all tests in the suite
    // Example: s.db = connectToDatabase()
    println("SetupSuite")
}

func (s *MyTestSuite) TearDownSuite() {
    // This runs once after all tests in the suite
    // Example: s.db.Close()
    println("TearDownSuite")
}

func (s *MyTestSuite) SetupTest() {
    // This runs before each test in the suite
    println("SetupTest")
}

func (s *MyTestSuite) TearDownTest() {
    // This runs after each test in the suite
    println("TearDownTest")
}


func (s *MyTestSuite) TestAdd() {
    result := Add(2, 3)
    assert.Equal(s.T(), 5, result, "The sum should be 5") // Use s.T() to get the *testing.T
}

func (s *MyTestSuite) TestMultiply() {
    result := 2 * 3
    assert.Equal(s.T(), 6, result, "The product should be 6")
}

func TestMySuite(t *testing.T) {
    suite.Run(t, new(MyTestSuite))
}
```

> [!note]
> Always use `_test` prefix on packages for writing tests but in case of internal tests
> in which you have access to private package members use `_internal_test.go` as filename.

Define the suite, and absorb the built-in basic suite functionality from testify - including a `T()` method which returns the current testing context

```go
type ExampleTestSuite struct {
    suite.Suite
    VariableThatShouldStartAtFive int
}
```

Make sure that `VariableThatShouldStartAtFive` is set to five before each test

```go
func (suite *ExampleTestSuite) SetupTest() {
    suite.VariableThatShouldStartAtFive = 5
}
```

All methods that begin with **Test** are run as tests within a suite.

```go
func (suite *ExampleTestSuite) TestExample() {
    assert.Equal(suite.T(), 5, suite.VariableThatShouldStartAtFive)
    suite.Equal(5, suite.VariableThatShouldStartAtFive)
}
```

In order for `go test` to run this suite, we need to create a normal test function and pass our suite to `suite.Run`.

```go
func TestExampleTestSuite(t *testing.T) {
    suite.Run(t, new(ExampleTestSuite))
}
```

---

`SetupAllSuite` has a `SetupSuite` method, which will run _before the tests in the suite_ are run.

```go
type SetupAllSuite interface {
 SetupSuite()
}
```

`SetupTestSuite` has a `SetupTest` method, which will run _before each test in the suite_.

```go
type SetupTestSuite interface {
 SetupTest()
}
```

`TearDownAllSuite` has a `TearDownSuite` method, which will run _after all the tests in the suite_ have been run.

```go
type TearDownAllSuite interface {
 TearDownSuite()
}
```

`TearDownTestSuite` has a `TearDownTest` method, which will run _after each test in the suite_.

```go
type TearDownTestSuite interface {
 TearDownTest()
}
```

`BeforeTest` has a function to be executed _right before the test starts and receives the suite and test names as input_.

```go
type BeforeTest interface {
 BeforeTest(suiteName, testName string)
}
```

`AfterTest` has a function to be executed _right after the test finishes and receives the suite and test names as input_.

```go
type AfterTest interface {
 AfterTest(suiteName, testName string)
}
```

`WithStats` implements `HandleStats`, a function that will be _executed when a test suite is finished_. The stats contain information about the execution of that suite and its tests.

```go
type WithStats interface {
 HandleStats(suiteName string, stats *SuiteInformation)
}
```

Writing tests with `testify` is awesome, so use them. Also, I write tests with mock for the higher modules and tests the low level one with the real dependencies. For application that has really great mocks like `redis`, I have used them instead of real one.

## Test Containers

> Unit tests with real dependencies

Testcontainers is an open source library for providing throwaway, lightweight instances of databases, message brokers, web browsers, or just about anything that can run in a Docker container.

No more need for mocks or complicated environment configurations. Define your test dependencies as code, then simply run your tests and containers will be created and then deleted.

```go
container, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
    ContainerRequest: testcontainers.ContainerRequest{
        Image:        "redis:5.0.3-alpine",
        ExposedPorts: []string{"6379/tcp"},
        WaitingFor:   wait.ForLog("Ready to accept connections"),
    },
    Started:          true,
})
```

### What is Testcontainers?

Testcontainers is a library that provides easy and lightweight APIs for bootstrapping local development and test dependencies with real services wrapped in Docker containers. Using Testcontainers, you can write tests that depend on the same services you use in production without mocks or in-memory services.

#### Benefits of using Testcontainers

- **On-demand isolated infrastructure provisioning:** You don’t need to have a pre-provisioned integration testing infrastructure. Testcontainers will provide the required services before running your tests. There will be no test data pollution, even when multiple build pipelines run in parallel because each pipeline runs with an isolated set of services.
- **Consistent experience on both local and CI environments:** You can run your integration tests right from your IDE, just like you run unit tests. _No need to push your changes and wait for the CI pipeline to complete_.
- **Reliable test setup using wait strategies:** Docker containers need to be started and fully initialized before using them in your tests. The Testcontainers library offers several _out-of-the-box wait strategies_ implementations to make sure the containers (and the application within) are fully initialized. Testcontainers modules already implement the relevant wait strategies for a given technology, and you can always implement your own or create a composite strategy if needed.
- **Advanced networking capabilities:** Testcontainers libraries map the container’s ports onto random ports available on the host machine so that your tests connect reliably to those services. You can even create a (Docker) network and connect multiple containers together so that they talk to each other via static Docker network aliases.
- **Automatic clean up:** The Testcontainers library takes care of removing any created resources (containers, volumes, networks etc.) automatically after the test execution is complete by using the Ryuk sidecar container. While starting the required containers, Testcontainers attaches a set of labels to the created resources (containers, volumes, networks etc) and Ryuk automatically performs resource clean up by matching those labels. This works reliably even when the test process exits abnormally (e.g. sending a SIGKILL).

### Testcontainers workflow

You can use Testcontainers with any testing library you are already familiar with. A typical Testcontainers-based integration test works as follows:

![[Pasted image 20241120210040.png]]

- **Before Test execution:** Start your required services (databases, messaging systems etc.) as Docker containers using the Testcontainers API. Once the required containers start, configure or update your application configuration to use these containerized services and optionally initialize data needed for the test.
- **During Test execution:** Your tests run using these containerized services.
- **After Test execution:** Testcontainers takes care of destroying containers irrespective of whether tests are executed successfully or there were any failures.

### `GenericContainer` abstraction

Testcontainers provides a programmatic abstraction called `GenericContainer` representing a Docker container. You can use `GenericContainer` to start a Docker container, get any container information such as hostname (the host under which the mapped ports are reachable), mapped ports, and stop the container.
