## with GORM

Working with Postgres in Golang is an important topic specially in the companies that have lots of data to model. Postgres support composite types with makes thing harder to work with. I prefer to use `gorm` but in case of these composite types you need to use [`pq`](https://github.com/lib/pq).

To use arrays in the query:

```go
db.Where("tags @> ?", pq.Array([]string{"t1"}))
```

The above query, check that all the tags in the given argument are exists in `tags` field.

## Libraries

- [jackc/pgx](https://github.com/jackc/pgx): pgx is a pure Go driver and toolkit for PostgreSQL.
- [lib/pq](https://github.com/lib/pq): # A pure Go postgres driver for Go's database/sql package