## with GORM

Working with Postgres in Golang is an important topic specially in the companies that have lots of data to model. Postgres support composite types with makes thing harder to work with. I prefer to use `gorm` but in case of these composite types you need to use [`pq`](https://github.com/lib/pq).

To use arrays in the query:

```go
db.Where("tags @> ?", pq.Array([]string{"t1"}))
```

The above query, check that all the tags in the given argument are exists in `tags` field.

## Libraries

- [jackc/pgx](https://github.com/jackc/pgx): pgx is a pure Go driver and toolkit for PostgreSQL.
    - The pgx driver is a low-level, high performance interface that exposes PostgreSQL-specific features such as `LISTEN` / `NOTIFY` and `COPY`. It also includes an adapter for the standard `database/sql` interface.
- [lib/pq](https://github.com/lib/pq): # A pure Go postgres driver for Go's database/sql package
    - This package is currently in maintenance mode, which means:
        1. It generally does not accept new features.
        2. It does accept bug fixes and version compatability changes provided by the community.
        3. Maintainers usually do not resolve reported issues.
        4. Community members are encouraged to help each other with reported issues.
    - For users that require new features or reliable resolution of reported bugs, we recommend using [pgx](https://github.com/jackc/pgx) which is under active development.

### pgx

- `github.com/jackc/pgx/v4/stdlib`: Package stdlib is the compatibility layer from pgx to database/sql.
- `github.com/jackc/pgx/v4/pgxpool`: Package pgxpool is a concurrency-safe connection pool for pgx. pgxpool implements a nearly identical interface to pgx connections.

Query arguments are passed directly to the underlying pgx conn so there is no need to implement driver. Valuer if pgx already understands the type.

```go
_, err = db. ExecContext(ctx,
	`insert into t (data) values ($1)`,
	[]int32{1, 2, 3},
)

if err != nil {
	log. Fatal(err)
}
```

The primary way of establishing a connection is with `pgxpool.Connect`.

```go
pool, err := pgxpool.Connect(context.Background(), os.Getenv("DATABASE_URL"))
```

The database connection string can be in URL or DSN format. PostgreSQL settings, pgx settings, and pool settings can be specified here. In addition, a config struct can be created by `ParseConfig` and modified before establishing the connection with `ConnectConfig`.

```go
config, err := pgxpool.ParseConfig(os.Getenv("DATABASE_URL"))
if err != nil {
    // ...
}
config.AfterConnect = func(ctx context.Context, conn *pgx.Conn) error {
    // do something with every new connection
}

pool, err := pgxpool.ConnectConfig(context.Background(), config)
```

Acquire returns a connection (`*Conn`) from the Pool:

```go
func (p *pgxpool.Pool) Acquire(ctx context.Context) (*pgxpool.Conn, error)
```

Hijack assumes ownership of the connection from the pool. Caller is responsible for closing the connection. Hijack will panic if called on an already released or hijacked connection.

```go
func (c *Conn) Hijack() *pgx.Conn
```

#### Basics

- `pgx` is connection oriented.
- Basic interface mimics `database/sql` _but with context by default_ (Query, Quer yRow, Exec).

```go
func main () {
	ctx := context.Background()

	conn, err := pgx.Connect(ctx, os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer conn. Close(ctx)

	var n int32

	if err := conn.QueryRow(ctx, "select $1::int", 42).Scan(&n); err != nil {
		log.Fatal(err)
	}

	fmt.Println(n) // => 42
```

```go
rows, __ := conn. Query(ctx,

"select generate

_series(1, 10)")

numbers, err := pgx. CollectRows(rows, func(row pgx. CollectableRow) (int32, error)

var n int32

err := row. Scan&n)

return n, err

})

if err != nil {

log. Fatal(err)

}

fmt. Println(numbers) // => [1 2 3 4 5 6 7 8 9 10]
```