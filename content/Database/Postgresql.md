## Schemas

A PostgreSQL database cluster _contains one or more named databases_. ==Roles and a few other object types are shared across the entire cluster==. ==A client connection to the server can only access data in a single database==, the one specified in the connection request.

A database contains one or more named _schemas_, which in turn contain tables. Schemas also contain other kinds of named objects, including data types, functions, and operators. ==Within one schema, two objects of the same type cannot have the same name==.

There are several reasons why one might want to use schemas:

- To allow many users to use one database without interfering with each other.
- To organize database objects into logical groups to make them more manageable.
- Third-party applications can be put into separate schemas so they do not collide with the names of other objects.

In addition to `public` and user-created schemas, each database contains a `pg_catalog` schema, which contains the system tables and all the built-in data types, functions, and operators.

To create a schema, use the `CREATE SCHEMA` command. Give the schema a name of your choice. For example:

```sql
CREATE SCHEMA myschema;
```

To create or access objects in a schema, write a _qualified name_ consisting of the schema name and table name separated by a dot:

```sql
schema.table
```

This works anywhere a table name is expected, including the table modification commands and the data access commands discussed in the following chapters. (For brevity we will speak of tables only, but the same ideas apply to other kinds of named objects, such as types and functions.)

Actually, the even more general syntax

```sql
database.schema.table
```

can be used too, but at present this is just for pro forma compliance with the SQL standard. If you write a database name, it must be the same as the database you are connected to.

So to create a table in the new schema, use:

```sql
CREATE TABLE myschema.mytable (
...
);
```

To drop a schema _if it's empty (all objects in it have been dropped)_, use:

```sql
DROP SCHEMA myschema;
```

To drop a schema including all contained objects, use:

```sql
DROP SCHEMA myschema CASCADE;
```

## `SET TRANSACTION`

The `SET TRANSACTION` command sets the characteristics of the current transaction. It has no effect on any subsequent transactions. `SET SESSION CHARACTERISTICS` sets the default transaction characteristics for subsequent transactions of a session. These defaults can be overridden by `SET TRANSACTION` for an individual transaction.

The available transaction characteristics are the _transaction isolation level_, the _transaction access mode (read/write or read-only)_, and the _deferrable mode_.

### Transaction Isolation Level

The isolation level of a transaction determines what data the transaction can see when other transactions are running concurrently:

`READ COMMITTED`

A statement can only see rows committed before it began. This is the default.

`REPEATABLE READ`

All statements of the current transaction can only see rows committed before the first query or data-modification statement was executed in this transaction.

`SERIALIZABLE`

All statements of the current transaction can only see rows committed before the first query or data-modification statement was executed in this transaction. If a pattern of reads and writes among concurrent serializable transactions would create a situation which could not have occurred for any serial (one-at-a-time) execution of those transactions, one of them will be rolled back with a `serialization_failure` error.

### Transaction Access Mode

The transaction access mode determines whether the transaction is _read/write_ or _read-only_. Read/write is the default.

## Concurrency Control

PostgreSQL provides a rich set of tools for developers to manage concurrent access to data. Internally, data consistency is maintained by using a multiversion model (Multiversion Concurrency Control, MVCC). This means that each SQL statement sees a snapshot of data (a _database version_) as it was some time ago, regardless of the current state of the underlying data.

> [!info]
> The main advantage of using the MVCC model of concurrency control rather than locking is that in MVCC locks acquired for querying (reading) data do not conflict with locks acquired for writing data, and so reading never blocks writing and writing never blocks reading.

Table- and row-level locking facilities are also available in PostgreSQL for applications which don't generally need full transaction isolation and prefer to explicitly manage particular points of conflict. However, proper use of MVCC will generally provide better performance than locks. In addition, application-defined advisory locks provide a mechanism for acquiring locks that are not tied to a single transaction.

The SQL standard defines four levels of transaction isolation. **The most strict is Serializable**, which is defined by the standard in a paragraph which says that any concurrent execution of a set of Serializable transactions is guaranteed to produce the same effect as running them one at a time in some order.

The phenomena which are **prohibited at various levels** are:

- **dirty read**: A transaction reads data written by a concurrent uncommitted transaction.
- **nonrepeatable read**:A transaction re-reads data it has previously read and finds that data has been modified by another transaction (that committed since the initial read).
- **phantom read**: A transaction re-executes a query returning a set of rows that satisfy a search condition and finds that the set of rows satisfying the condition has changed due to another recently-committed transaction.
- **serialization anomaly**: The result of successfully committing a group of transactions is inconsistent with all possible orderings of running those transactions one at a time.

| Isolation Level  | Dirty Read             | Nonrepeatable Read | Phantom Read           | Serialization Anomaly |
| ---------------- | ---------------------- | ------------------ | ---------------------- | --------------------- |
| Read uncommitted | Allowed, but not in PG | Possible           | Possible               | Possible              |
| Read committed   | Not possible           | Possible           | Possible               | Possible              |
| Repeatable read  | Not possible           | Not possible       | Allowed, but not in PG | Possible              |
| Serializable     | Not possible           | Not possible       | Not possible           | Not possible          |

In PostgreSQL, you can request any of the four standard transaction isolation levels, but internally only three distinct isolation levels are implemented, i.e., PostgreSQL's Read Uncommitted mode behaves like Read Committed. This is because it is the only sensible way to map the standard isolation levels to PostgreSQL's multiversion concurrency control architecture.

### Read Committed

_Read Committed_ is the default isolation level in PostgreSQL. When a transaction uses this isolation level, a `SELECT` query (without a `FOR UPDATE/SHARE` clause) sees only data committed before the query began; it never sees either uncommitted data or changes committed by concurrent transactions during the query's execution.

==It is possible for an updating command to see an inconsistent snapshot==: it can see the effects of concurrent updating commands on the same rows it is trying to update, but it does not see effects of those commands on other rows in the database. This behavior makes Read Committed mode unsuitable for commands that involve complex search conditions;

### Repeatable Read

The _Repeatable Read_ isolation level only sees data committed before the transaction began; it never sees either uncommitted data or changes committed by concurrent transactions during the transaction's execution. (However, each query does see the effects of previous updates executed within its own transaction, even though they are not yet committed.)

### Serializable

The _Serializable_ isolation level provides the strictest transaction isolation. This level emulates serial transaction execution for all committed transactions; as if transactions had been executed one after another, serially, rather than concurrently.