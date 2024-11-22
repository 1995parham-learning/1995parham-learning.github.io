The Hierarchical navigable small world (HNSW) algorithm is a graph-based approximate nearest neighbor search technique used in many vector databases.

> [!info]
> Nearest neighbor search without an index involves computing the distance from the query to each point in the database, which for large datasets is computationally prohibitive.

> [!info]
> For high-dimensional data, tree-based exact vector search techniques such as the k-d tree and R-tree do not perform well enough because of the curse of dimensionality.

The HNSW graph offers an **approximate** k-nearest neighbor search which scales _logarithmically_ even in high-dimensional data.