> LMAX is a new retail financial trading platform. As a result it has to process many trades with low latency

> [!warning]
> The Business Logic Processor runs entirely in-memory using event sourcing.

At a top level, the architecture has three parts

-   business logic processor5
-   input disruptor
-   output disruptors

As its name implies, the business logic processor handles all the business logic in the application. It does this as a **single-threaded** java program which reacts to method calls and produces output events. Consequently it's a simple java program that doesn't require any platform frameworks to run other than the JVM itself, which allows it to be easily run in test environments.

The Business Logic Processor takes input messages sequentially (in the form of a method invocation), runs business logic on it, and emits output events. It operates entirely in-memory, there is no database or other persistent store.
