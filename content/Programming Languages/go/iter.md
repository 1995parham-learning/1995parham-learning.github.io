## Introduction

Package iter provides basic definitions and operations related to iterators over sequences.

## Iterators

An iterator is a function that passes successive elements of a sequence to a callback function, conventionally named `yield`. The function stops either when the sequence is finished or when `yield` returns `false`, indicating to stop the iteration early. This package defines `Seq` and `Seq2` (pronounced like seek—the first syllable of sequence) as shorthands for iterators that pass 1 or 2 values per sequence element to yield:

```go
type (
	Seq[V any]     func(yield func(V) bool)
	Seq2[K, V any] func(yield func(K, V) bool)
)
```

`Seq2` represents a sequence of paired values, conventionally key-value or index-value pairs.

`yield` returns true if the iterator should continue with the next element in the sequence, false if it should stop.

Iterator functions are most often called by a range loop, as in:

```go
func PrintAll[V any](seq iter.Seq[V]) {
	for v := range seq {
		fmt.Println(v)
	}
}
```

## Naming Conventions

Iterator functions and methods are named for the sequence being walked:

```go
// All returns an iterator over all elements in s.
func (s *Set[V]) All() iter.Seq[V]
```

The iterator method on a collection type is conventionally named `All`, because it iterates a sequence of all the values in the collection.

For a type containing multiple possible sequences, the iterator's name can indicate which sequence is being provided:

```go
// Cities returns an iterator over the major cities in the country.
func (c *Country) Cities() iter.Seq[*City]

// Languages returns an iterator over the official spoken languages of the country.
func (c *Country) Languages() iter.Seq[string]
```

If an iterator requires additional configuration, the constructor function can take additional configuration arguments:

```go
// Scan returns an iterator over key-value pairs with min ≤ key ≤ max.
func (m *Map[K, V]) Scan(min, max K) iter.Seq2[K, V]

// Split returns an iterator over the (possibly-empty) substrings of s
// separated by sep.
func Split(s, sep string) iter.Seq[string]
```
