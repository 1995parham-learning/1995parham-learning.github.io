[Google - Site Reliability Engineering](https://sre.google/sre-book/monitoring-distributed-systems/)

## Definitions

### Monitoring

Collecting, processing, aggregating, and displaying real-time quantitative data about a system, such as query counts and types, error counts and types, processing times, and server lifetimes.

### White-box monitoring

Monitoring based on metrics exposed by the internals of the system, including logs, interfaces like the Java Virtual Machine Profiling Interface, or an HTTP handler that emits internal statistics.

### Black-box monitoring

Testing externally visible behavior as a user would see it.

### Dashboard

An application (usually web-based) that provides a summary view of a service's core metrics.
A dashboard may have filters, selectors, and so on, but is prebuilt to expose the metrics most important to its users.
The dashboard might also display team information such as ticket queue length, a list of high-priority bugs,
the current on-call engineer for a given area of responsibility, or recent pushes.

### Alert

A notification intended to be read by a human and that is pushed to a system such as a bug or ticket queue, an email alias, or a pager.

### Root cause

A defect in a software or human system that, if repaired, instills confidence that this event won't happen again in the same way.
A given incident might have multiple root causes: for example, perhaps it was caused by a combination of insufficient process automation,
software that crashed on bogus input, and insufficient testing of the script used to generate the configuration.
Each of these factors might stand alone as a root cause, and each should be repaired.

### Node and machine

Used interchangeably to indicate a single instance of a running kernel in either a physical server, virtual machine, or container.
There might be multiple **_services_** worth monitoring on a single machine. The services may either be:

- Related to each other: for example, a caching server and a web server
- Unrelated services sharing hardware: for example, a code repository and a master for a configuration
  system like [Puppet](https://puppetlabs.com/puppet/puppet-open-source) or [Chef](https://www.chef.io/chef/)

### Push

Any change to a service's running software or its configuration.

## The Four Golden Signals

### Latency

The time it takes to service a request. It's important to distinguish between the latency of successful requests and the latency of failed requests. For example, an HTTP 500 error triggered due to loss of connection to a database or other critical backend might be served very quickly; however, as an HTTP 500 error indicates a failed request, factoring 500s into your overall latency might result in misleading calculations. On the other hand, a slow error is even worse than a fast error! Therefore, it's important to track error latency, as opposed to just filtering out errors.

### Traffic

A measure of how much demand is being placed on your system, measured in a high-level system-specific metric.
For a web service, this measurement is usually HTTP requests per second,
perhaps broken out by the nature of the requests (e.g., static versus dynamic content).
For an audio streaming system, this measurement might focus on network I/O rate or concurrent sessions and
for a key-value storage system, this measurement might be transactions and retrievals per second.

### Errors

The rate of requests that fail, either explicitly (e.g., HTTP 500s), implicitly (for example, an HTTP 200 success response, but coupled with the wrong content), or by policy (for example, "If you committed to one-second response times, any request over one second is an error"). Where protocol response codes are insufficient to express all failure conditions, secondary (internal) protocols may be necessary to track partial failure modes. Monitoring these cases can be drastically different: catching HTTP 500s at your load balancer can do a decent job of catching all completely failed requests, while only end-to-end system tests can detect that you're serving the wrong content.

### Saturation

How "full" your service is. A measure of your system fraction,
emphasizing the resources that are most constrained (e.g., in a memory-constrained system, show memory;
in an I/O-constrained system, show I/O). Note that many systems degrade in performance before
they achieve 100% utilization, so having a utilization target is essential.

In complex systems, saturation can be supplemented with higher-level load measurement:
can your service properly handle double the traffic, handle only 10% more traffic, or handle even less traffic than it currently receives?
For very simple services that have no parameters that alter the complexity of the request (e.g., "Give me a nonce" or "I need a globally unique monotonic integer") that rarely change configuration, a static value from a load test might be adequate. As discussed in the previous paragraph, however, most services need to use indirect signals like CPU utilization or network bandwidth that have a known upper bound. Latency increases are often a leading indicator of saturation. Measuring your 99th percentile response time over some small window (e.g., one minute) can give a very early signal of saturation.

Finally, saturation is also concerned with predictions of impending saturation, such as "It looks like your database will fill its hard drive in 4 hours."

## Metrics 🌡️

Working with real metrics is hard. Metrics are needed to give you an understanding of how your service behaves.
That is, by definition, you have some uncertainty about the said behavior.
Therefore, you have to be _hell certain about your observability part_.
Otherwise, all sorts of metric misinterpretations and false conclusions will follow.

### `irate` vs `rate`

- `rate`: Use **first** and **last** data points in the group, divide by **query interval**.
- `irate`: Use **last 2** data points in the range, divide by **scrape interval**.

:::note
`rate()` is generally used when graphing the slow moving counters.
While `irate()` is used when graphing the high volatile counters.
:::

Look at the following picture for hypothetical `requests_total` counter:

```txt
v  20     50     100     200     201      230
----x-+----x------x-------x-------x--+-----x-----
t  10 |   20     30      40      50  |     60
      |   <--     range=40s      --> |
                                     ^
                                     t
```

It contains values `[20,50,100,200,201,230]` with timestamps `[10,20,30,40,50,60]` which means our scraping interval is `10s`.
Let's calculate `irate(requests_total[40s])` at the point `t`.
It is calculated as `dv/dt` for the last two points before `t` according to
[the documentation](https://prometheus.io/docs/prometheus/latest/querying/functions/#irate):

```txt
(201 - 200) / (50 - 40) = 0.1 rps
```

The `40s` range ending at `t` contains other per-second rates:

```txt
(100 - 50) / (30 - 20) = 5 rps
(200 - 100) / (40 - 30) = 10 rps
```

These rates are much larger than the captured rate at `t`. `irate` captures only 0.1 rps while skipping 5 and 10 rps.
Obviously `irate` doesn't capture spikes.
[Irate documentation](https://prometheus.io/docs/prometheus/latest/querying/functions/#irate) says:

> `irate` should only be used when graphing volatile, fast-moving counters.

### CPU Quota

The **`container_spec_cpu_quota`** is a configuration parameter used in container technologies, such as Docker.
This parameter represents the total CPU time that the container can use every **`cpu.cfs_period_us`** period.
The value is specified in microseconds. For example, if **`cpu.cfs_period_us`** is set to 100,000 microseconds (the default)
and **`container_spec_cpu_quota`** is set to 50,000, the container is allowed to use 50% of one CPU core.
