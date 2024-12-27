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

-   **On-demand isolated infrastructure provisioning:** You don’t need to have a pre-provisioned integration testing infrastructure. Testcontainers will provide the required services before running your tests. There will be no test data pollution, even when multiple build pipelines run in parallel because each pipeline runs with an isolated set of services.
-   **Consistent experience on both local and CI environments:** You can run your integration tests right from your IDE, just like you run unit tests. _No need to push your changes and wait for the CI pipeline to complete_.
-   **Reliable test setup using wait strategies:** Docker containers need to be started and fully initialized before using them in your tests. The Testcontainers library offers several _out-of-the-box wait strategies_ implementations to make sure the containers (and the application within) are fully initialized. Testcontainers modules already implement the relevant wait strategies for a given technology, and you can always implement your own or create a composite strategy if needed.
-   **Advanced networking capabilities:** Testcontainers libraries map the container’s ports onto random ports available on the host machine so that your tests connect reliably to those services. You can even create a (Docker) network and connect multiple containers together so that they talk to each other via static Docker network aliases.
-   **Automatic clean up:** The Testcontainers library takes care of removing any created resources (containers, volumes, networks etc.) automatically after the test execution is complete by using the Ryuk sidecar container. While starting the required containers, Testcontainers attaches a set of labels to the created resources (containers, volumes, networks etc) and Ryuk automatically performs resource clean up by matching those labels. This works reliably even when the test process exits abnormally (e.g. sending a SIGKILL).

### Testcontainers workflow

You can use Testcontainers with any testing library you are already familiar with. A typical Testcontainers-based integration test works as follows:

![[Pasted image 20241120210040.png]]

-   **Before Test execution:** Start your required services (databases, messaging systems etc.) as Docker containers using the Testcontainers API. Once the required containers start, configure or update your application configuration to use these containerized services and optionally initialize data needed for the test.
-   **During Test execution:** Your tests run using these containerized services.
-   **After Test execution:** Testcontainers takes care of destroying containers irrespective of whether tests are executed successfully or there were any failures.

### `GenericContainer` abstraction

Testcontainers provides a programmatic abstraction called `GenericContainer` representing a Docker container. You can use `GenericContainer` to start a Docker container, get any container information such as hostname (the host under which the mapped ports are reachable), mapped ports, and stop the container.