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

Query arguments are passed directly to the underlying pgx conn so there is no need to implement driver. Valuer if pgx already understands the type.

```go
-, err = db. ExecContext(ctx, `insert into t (data) values ($1)`, []int32{1, 2, 3},)

if err != nil {

log. Fatal(err)

}
```