[The Kubernetes Test Tool (KUTTL)](https://kuttl.dev/) is a toolkit that makes it easy to test Kubernetes Operators,
just using YAML.

It provides a way to inject an operator (subject under test) during the `TestSuite` setup and allows tests to be
standard YAML files. Test assertions are often partial YAML documents which assert the state defined is true.

It is also possible to have KUTTL automate the setup of a cluster.

## Get KUTTL

```bash
brew tap kudobuilder/tap
brew install kuttl-cli
kubectl kuttl version
```
