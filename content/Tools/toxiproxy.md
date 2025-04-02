Toxiproxy is a framework for simulating network conditions.

Toxiproxy usage consists of two parts. A **TCP proxy** written in Go and a client communicating with _the proxy over HTTP_ to configure it (`toxiproxy-cli`). You configure your application to make all test connections go through Toxiproxy and can then manipulate their health via HTTP.
