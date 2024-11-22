The Hierarchical navigable small world (HNSW) algorithm is a graph-based approximate nearest neighbor search technique used in many vector databases.

> [!info]
> Nearest neighbor search without an index involves computing the distance from the query to each point in the database, which for large datasets is computationally prohibitive.

> [!info]
> For high-dimensional data, tree-based exact vector search techniques such as the k-d tree and R-tree do not perform well enough because of the curse of dimensionality.

The HNSW graph offers an **approximate** k-nearest neighbor search which scales _logarithmically_ even in high-dimensional data.

## Probability Skip List

The probability skip list was introduced _way back_ in 1990 by _William Pugh_. It allows fast search like a sorted array, while using a linked list structure for easy (and fast) insertion of new elements (something that is not possible with sorted arrays).

Skip lists work by building several layers of linked lists. On the first layer, we find links that _skip_ many intermediate nodes/vertices. As we move down the layers, the number of _‘skips’_ by each link is decreased.

To search a skip list, we start at the highest layer with the longest _‘skips’_ and move along the edges towards the right (below). If we find that the current node ‘key’ is _greater than_ the key we are searching for — we know we have overshot our target, so we move down to previous node in the _next_ level.

![A probability skip list structure, we start on the top layer. If our current key is greater than the key we are searching for (or we reach end), we drop to the next layer.](https://www.pinecone.io/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fvr8gru94%2Fproduction%2F9065d31e1b2e33ca697a56082f0ece7eff1c2d9b-1920x500.png&w=3840&q=75)