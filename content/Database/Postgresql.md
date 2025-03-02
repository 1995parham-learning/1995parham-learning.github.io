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

set the characteristics of the current transaction