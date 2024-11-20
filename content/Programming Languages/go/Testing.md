## Testing with `testify`

To write tests in Go, [@stretchr/testify](https://pkg.go.dev/github.com/stretchr/testify) is an awesome library. It has _suite_, _require_ and _assert_.

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

```go
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
```