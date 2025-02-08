> A distributed, reliable key-value store for the most critical data of a distributed system

> [!info] > **etcd** is a strongly consistent, distributed key-value store that provides a reliable way to store data that needs to be accessed by a distributed system or cluster of machines. It gracefully handles leader elections during network partitions and can tolerate machine failure, even in the leader node. [Learn more](https://etcd.io/docs/v3.5/)

## Reading from etcd

Use the `get` subcommand to read from etcd:

```shell
$ etcdctl --endpoints=$ENDPOINTS get foo
foo
Hello World!
$
```

where:

- `foo` is the requested key
- `Hello World!` is the retrieved value

Or, for formatted output:

```
$ etcdctl --endpoints=$ENDPOINTS --write-out="json" get foo
{"header":{"cluster_id":289318470931837780,"member_id":14947050114012957595,"revision":3,"raft_term":4,
"kvs":[{"key":"Zm9v","create_revision":2,"mod_revision":3,"version":2,"value":"SGVsbG8gV29ybGQh"}]}}
$
```

where `write-out="json"` causes the value to be output in JSON format (note that the key is not returned).
