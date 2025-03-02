## Schemas

A PostgreSQL database cluster _contains one or more named databases_. ==Roles and a few other object types are shared across the entire cluster==. ==A client connection to the server can only access data in a single database==, the one specified in the connection request.

A database contains one or more named _schemas_, which in turn contain tables. Schemas also contain other kinds of named objects, including data types, functions, and operators. ==Within one schema, two objects of the same type cannot have the same name==.

There are several reasons why one might want to use schemas:
- To allow many users to use one database without interfering with each other.
- To organize database objects into logical groups to make them more manageable.
- Third-party applications can be put into separate schemas so they do not collide with the names of other objects.
