---
title: SQL
---

## Foreign Key

foreign key must be related to primary key of the destination table

## Composite Key

In [database design](https://en.wikipedia.org/wiki/Data_modeling),
a **composite key** is a [candidate key](https://en.wikipedia.org/wiki/Candidate_key)
that consists of two or more attributes (table columns) that together uniquely identify an entity occurrence (table row).
A **compound key** is a composite key for which each attribute that makes up the key is a [foreign](https://en.wikipedia.org/wiki/Foreign_key) key in its own right.

## [Index](https://en.wikipedia.org/wiki/Database_index)

A **database index** is a [data structure](https://en.wikipedia.org/wiki/Data_structure)
that improves the speed of data retrieval operations on
a [database table](<https://en.wikipedia.org/wiki/Table_(database)>)
at the cost of additional writes and storage space to maintain the index data structure.
Indexes are used to quickly locate data without having to search every row in a database table every time said table is accessed.
Indexes can be created using one or more [columns of a database table](<https://en.wikipedia.org/wiki/Column_(database)>),
providing the basis for both rapid random [lookups](https://en.wikipedia.org/wiki/Lookup)
and efficient access of ordered records.

The order that the index definition defines the columns in is important. It is possible to retrieve a set of row identifiers using only the first indexed column. However, it is not possible or efficient (on most databases) to retrieve the set of row identifiers using only the second or greater indexed column.

Indexes are useful for many applications but come with some limitations.
Consider the following SQL statement:

```sql
SELECT first_name FROM people WHERE last_name = 'Smith';
```

To process this statement without an index the database software must look at the `last_name` column on every row in the table
(this is known as a [full table scan](https://en.wikipedia.org/wiki/Full_table_scan)).
With an index the database simply follows the index data structure (typically a [B-tree](https://en.wikipedia.org/wiki/B-tree))
until the Smith entry has been found; this is much less computationally expensive than a full table scan.

Consider this SQL statement:

```sql
SELECT email_address FROM customers WHERE email_address LIKE '%@wikipedia.org';
```

This query would yield an email address for every customer whose email address ends with "@wikipedia.org",
but even if the `email_address` column has been indexed the database must perform a full index scan.
This is because the index is built with the assumption that words go from left to right.
With a [wildcard](https://en.wikipedia.org/wiki/Wildcard_character) at the beginning of the search-term,
the database software is unable to use the underlying index data structure (in other words, the WHERE-clause is _not [sargable](https://en.wikipedia.org/wiki/Sargable)_).

This problem can be solved through the addition of another index created on `reverse(email_address)`
and a SQL query like this:

```sql
SELECT email_address FROM customers WHERE reverse(email_address) LIKE reverse('%@wikipedia.org');
```

This puts the wild-card at the right-most part of the query (now `gro.aidepikiw@%`),
which the index on `reverse(email_address)` can satisfy.
