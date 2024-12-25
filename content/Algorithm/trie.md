---
title: Trie
---

A trie (derived from retrieval) is a multiway tree data structure used for storing strings over an alphabet.
It is used to store a large amount of strings. The pattern matching can be done efficiently using tries.
Trie is also known as digital tree or prefix tree.

## Structure of Trie node

Every node of Trie consists of multiple branches.
Each branch represents a possible character of keys.
Mark the last node of every key as the end of the word node.
A Trie node field `isEndOfWord` is used to distinguish the node as the end of the word node.

## Insert Operation in Trie

Inserting a key into Trie is a simple approach.

-   Every character of the input key is inserted as an individual Trie node. Note that the children is an array of pointers (or references) to next-level trie nodes.
-   The key character acts as an index to the array children.
-   If the input key is new or an extension of the existing key, construct non-existing nodes of the key, and mark the end of the word for the last node.
-   If the input key is a prefix of the existing key in Trie, Simply mark the last node of the key as the end of a word.

## Search Operation in Trie

Searching for a key is similar to the insert operation. However, It only compares the characters and moves down.
The search can terminate due to the end of a string or lack of key in the trie.

-   In the former case, if the `isEndofWord` field of the last node is true, then the key exists in the trie.
-   In the second case, the search terminates without examining all the characters of the key, since the key is not present in the trie.
