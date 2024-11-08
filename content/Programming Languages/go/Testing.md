## Testing with `testify`

To write tests in Go, [@stretchr/testify](https://pkg.go.dev/github.com/stretchr/testify) is an awesome library. It has _suite_, _require_ and _assert_.

> [!note]
> Always use `_test` prefix on packages for writing tests but in case of internal tests
> in which you have access to private package members use `_internal_test.go` as filename.

Define the suite, and absorb the built-in basic suite
functionality from testify - including a T() method which
returns the current testing context
```go
type ExampleTestSuite struct {
    suite.Suite
    VariableThatShouldStartAtFive int
}
```

Make sure that VariableThatShouldStartAtFive is set to five before each test
```go

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
