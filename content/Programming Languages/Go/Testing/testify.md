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
