---
repo: https://github.com/1995parham-learning/qdrant101
---

![[Pasted image 20241111201405.png]]

## Introduction

Vector databases are a relatively new way for interacting with abstract data representations derived from opaque machine learning models such as deep learning architectures. These representations are often called _vectors_ or _embeddings_, and they are a compressed version of the data used to train a machine learning model to accomplish a task like sentiment analysis, speech recognition, object detection, and many others.

These new databases shine in many applications like [semantic search](https://en.wikipedia.org/wiki/Semantic_search) and [recommendation systems](https://en.wikipedia.org/wiki/Recommender_system), and here, we’ll learn about one of the most popular and fastest growing vector databases in the market, [Qdrant](https://github.com/qdrant/qdrant).

## What Are Vector Databases?

![dbs](https://raw.githubusercontent.com/ramonpzg/mlops-sydney-2023/main/images/databases.png)

Vector databases are a type of database designed to _store_ and _query_ **high-dimensional vectors** efficiently. In traditional [OLTP](https://www.ibm.com/topics/oltp) and [OLAP](https://www.ibm.com/topics/olap) databases (as seen in the image above), data is organized in rows and columns (and these are called **Tables**), and queries are performed based on the values in those columns. However, in certain applications including image recognition, natural language processing, and recommendation systems, data is often represented as vectors in a high-dimensional space, and these vectors, plus an ID and a payload, are the elements we store in something called a **Collection** within a vector database like Qdrant.

> [!info]
> A vector in this context is a mathematical representation of an object or data point, where elements of the vector implicitly or explicitly correspond to specific features or attributes of the object.

For example, in an image recognition system, a vector could represent an image, with each element of the vector representing a pixel value or a descriptor/characteristic of that pixel. In a music recommendation system, each vector could represent a song, and elements of the vector would capture song characteristics such as tempo, genre, lyrics, and so on.

Vector databases are optimized for **storing** and **querying** these high-dimensional vectors efficiently, and they're often using specialized data structures and indexing techniques such as Hierarchical Navigable Small World (HNSW) – which is used to implement Approximate Nearest Neighbors – and Product Quantization, among others. These databases enable fast similarity and semantic search while allowing users to find vectors that are the closest to a given query vector based on some distance metric. The most commonly used distance metrics are Euclidean Distance, Cosine Similarity, and Dot Product, and these three are fully supported Qdrant.

Here’s a quick overview of the three:

- [**Cosine Similarity**](https://en.wikipedia.org/wiki/Cosine_similarity) - Cosine similarity is a way to measure how similar two vectors are. To simplify, it reflects whether the vectors have the same direction (similar) or are poles apart. Cosine similarity is often used with **text representations** to compare how similar two documents or sentences are to each other. The output of cosine similarity _ranges from -1 to 1_, where _-1 means the two vectors are completely dissimilar_, and _1 indicates maximum similarity_.
- [**Dot Product**](https://en.wikipedia.org/wiki/Dot_product) - The dot product similarity metric is another way of measuring how similar two vectors are. Unlike cosine similarity, it also considers the length of the vectors. This might be important when, for example, vector representations of your documents are built based on the term (word) frequencies. The dot product similarity is calculated by multiplying the respective values in the two vectors and then summing those products. The higher the sum, the more similar the two vectors are. If you normalize the vectors (so the numbers in them sum up to 1), the dot product similarity will become the cosine similarity.
- [**Euclidean Distance**](https://en.wikipedia.org/wiki/Euclidean_distance) - Euclidean distance is a way to measure the distance between two points in space, similar to how we measure the distance between two places on a map. It’s calculated by finding the square root of the sum of the squared differences between the two points’ coordinates. This distance metric is also commonly used in machine learning to measure how similar or dissimilar two vectors are.

Now that we know what vector databases are and how they are structurally different than other databases, let’s go over why they are important.

## Payload

One of the significant features of Qdrant is the ability to store additional information along with vectors. This information is called `payload` in Qdrant terminology.

Qdrant allows you to store any information that can be represented using JSON.
## Installation requirements

### CPU and memory

The preferred size of your CPU and RAM depends on:

- Number of vectors
- Vector dimensions
- [Payloads](https://qdrant.tech/documentation/concepts/payload/) and their indexes
- Storage
- Replication
- How you configure quantization

Our [Cloud Pricing Calculator](https://cloud.qdrant.io/calculator?_gl=1*1sxmy7s*_gcl_au*MzQ2NTQzNzYzLjE3MzA5MTUyMTY.*_ga*MTIwOTgxNzc1OC4xNzMwOTE1MjEz*_ga_NZYW2651NE*MTczMTYwNTU3NS42LjEuMTczMTYwNTU4MC4wLjAuMA..) can help you estimate required resources without payload or index data.
### Storage

For persistent storage, Qdrant requires block-level access to storage devices with a [POSIX-compatible file system](https://www.quobyte.com/storage-explained/posix-filesystem/).