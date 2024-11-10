## Rocket 🚀

[https://github.com/SergioBenitez/Rocket](https://github.com/SergioBenitez/Rocket)

[rocket - Rust](https://docs.rs/rocket/latest/rocket/)

### **Lifecycle**

Rocket's main task is to listen for incoming web requests, dispatch the request to the application code, and return a response to the client. We call the process that goes from request to response the "lifecycle". We summarize the lifecycle as the following sequence of steps:

1. **Routing**

   Rocket parses an incoming HTTP request into native structures that your code operates on indirectly. Rocket determines which request handler to invoke by matching against route attributes declared in your application.

2. **Validation**

   Rocket validates the incoming request against types and guards present in the matched route. If validation fails, Rocket _forwards_ the request to the next matching route or calls an _error handler_.

3. **Processing**

   The request handler associated with the route is invoked with validated arguments. This is the main business logic of an application. Processing completes by returning a `Response`.

4. **Response**

   The returned `Response` is processed. Rocket generates the appropriate HTTP response and sends it to the client. This completes the lifecycle. Rocket continues listening for requests, restarting the lifecycle for each incoming request.

Rocket applications are centered around routes and handlers. A _route_ is a combination of:

- A set of parameters to match an incoming request against.
- A handler to process the request and return a response.

A _handler_ is simply a function that takes an arbitrary number of arguments and returns any arbitrary type.

### **State**

Many web applications have a need to maintain state. This can be as simple as maintaining a counter for the number of visits, or as complex as needing to access job queues and multiple databases. Rocket provides the tools to enable these kinds of interactions in a safe and simple manner.

The enabling feature for maintaining state is _managed state_. Managed state, as the name implies, is state that Rocket manages for your application. The state is managed on a per-type basis: Rocket will manage at most one value of a given type.

The process for using managed state is simple:

1. Call `manage` on the `Rocket` instance corresponding to your application with the initial value of the state.
2. Add a `&State<T>` type to any request handler, where `T` is the type of the value passed into `manage`.

> [!note]
> 💡 **Note:** All managed state must be thread-safe.
> Because Rocket automatically parallelizes your application, handlers can concurrently access managed state. As a result, managed state must be thread-safe. Thanks to Rust, this condition is checked at compile-time by ensuring that the type of values you store in managed state implement `Send` + `Sync`.

### **Adding State**

To instruct Rocket to manage state for your application, call the **`[manage](https://api.rocket.rs/v0.5/rocket/struct.Rocket.html#method.manage)`** method on an instance of `Rocket`. For example, to ask Rocket to manage a `HitCount` structure with an internal `AtomicUsize` with an initial value of `0`, we can write the following:

```rust
use std::sync::atomic::AtomicUsize;

struct HitCount {
    count: AtomicUsize
}

rocket::build().manage(HitCount { count: AtomicUsize::new(0) });
```

The `manage` method can be called any number of times, as long as each call refers to a value of a different type. For instance, to have Rocket manage both a `HitCount` value and a `Config` value, we can write:

```rust
rocket::build()
    .manage(HitCount { count: AtomicUsize::new(0) })
    .manage(Config::from(user_input));
```

### **Phases**

A `Rocket` instance represents a web server and its state. It progresses through three statically-enforced phases: build, ignite, orbit.

- **Build**: _application and server configuration_

  This phase enables:

  - setting configuration options
  - mounting/registering routes/catchers
  - managing state
  - attaching fairings

    This is the _only_ phase in which an instance can be modified. To finalize changes, an instance is ignited via `[Rocket::ignite()](https://api.rocket.rs/v0.5/rocket/struct.Rocket.html#method.ignite)`, progressing it into the _ignite_ phase, or directly launched into orbit with `[Rocket::launch()](https://api.rocket.rs/v0.5/rocket/struct.Rocket.html#method.launch)` which progress the instance through ignite into orbit.

- **Ignite**: _verification and finalization of configuration_

  An instance in the `[Ignite](https://api.rocket.rs/v0.5/rocket/enum.Ignite.html)` phase is in its final configuration, available via `[Rocket::config()](https://api.rocket.rs/v0.5/rocket/struct.Rocket.html#method.config)`. Barring user-supplied interior mutation, application state is guaranteed to remain unchanged beyond this point. An instance in the ignite phase can be launched into orbit to serve requests via `[Rocket::launch()](https://api.rocket.rs/v0.5/rocket/struct.Rocket.html#method.launch)`.

- **Orbit**: _a running web server_

  An instance in the `[Orbit](https://api.rocket.rs/v0.5/rocket/enum.Orbit.html)` phase represents a _running_ application, actively serving requests.
