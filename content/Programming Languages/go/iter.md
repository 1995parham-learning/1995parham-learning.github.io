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
