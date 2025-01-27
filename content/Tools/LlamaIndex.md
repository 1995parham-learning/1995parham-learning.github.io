LlamaIndex is a data framework for [LLM](https://en.wikipedia.org/wiki/Large_language_model)-based applications to ingest, structure, and access **private** or **domain-specific** data.

> [!note]
> The OpenAI API incorporates a hyperparameter known as temperature that affects the computation of token probabilities when generating output through the large language model. **The temperature value ranges from 0 to 2**, with lower values indicating greater determinism and higher values indicating more randomness.

## 🚀 Why LlamaIndex?

LLMs offer a natural language interface between humans and data. Widely available models come pre-trained on huge amounts of publicly available data like Wikipedia, mailing lists, textbooks, source code and more.

However, while LLMs are trained on a great deal of data, they are not trained on **your** data, which may be private or specific to the problem you're trying to solve. It's behind APIs, in SQL databases, or trapped in PDFs and slide decks.

You may choose to **fine-tune** a LLM with your data, but:

- Training a LLM is **expensive**.
- Due to the cost to train, it's **hard to update** a LLM with latest information.
- **Observability** is lacking. When you ask a LLM a question, it's not obvious how the LLM arrived at its answer.

LlamaIndex takes a different approach called [[LlamaIndex#Retrieval Augmented Generation (RAG)|Retrival Augmented Generation (RAG)]]. Instead of asking LLM to generate an answer immediately, LlamaIndex:

1. Retrieves information from your data sources first,
2. Adds it to your question as context, and
3. Asks the LLM to answer based on the enriched prompt.

RAG overcomes all three weaknesses of the fine-tuning approach:

- There's no training involved, so it's **cheap**.
- Data is fetched only when you ask for them, so it's **always up-to-date**.
- LlamaIndex can show you the retrieved documents, so it's **more trustworthy**.

LlamaIndex imposes no restriction on how you use LLMs. You can still use LLMs as auto-complete, chatbots, semi-autonomous agents, and more (see Use Cases on the left). _It only makes LLMs more relevant to you_.

## 🦙 How can LlamaIndex help?

LlamaIndex provides the following tools:

- **Data connectors** ingest your existing data from their native source and format. These could be APIs, PDFs, SQL, and (much) more.
- **Data indexes** structure your data in intermediate representations that are easy and performant for LLMs to consume.
- **Engines** provide natural language access to your data. For example:
    - Query engines are powerful retrieval interfaces for knowledge-augmented output.
    - Chat engines are conversational interfaces for multi-message, "back and forth" interactions with your data.
- **Data agents** are LLM-powered knowledge workers augmented by tools, from simple helper functions to API integrations and more.
- **Application integrations** tie LlamaIndex back into the rest of your ecosystem. This could be LangChain, Flask, Docker, ChatGPT, or... anything else!

## Retrieval Augmented Generation (RAG)

LLMs are trained on enormous bodies of data, but they aren't trained on **your** data.
Retrieval-Augmented Generation (RAG) solves this problem by adding your data to the data LLMs already have access to.

In RAG, your data is loaded and prepared for queries or "indexed". User queries act on the index, which filters your
data down to the most relevant context.
This context and your query then go to the LLM along with a prompt, and the LLM provides a response.

Even if what you're building is a chatbot or an agent, you'll want to know RAG techniques for getting data into your application.

![pipeline](pipeline.png)

## Stages within RAG

There are five key stages within RAG, which in turn will be a part of any larger application you build. These are:

- **Loading**: this refers to getting your data from where it lives - whether it's text files, PDFs, another website, a database, or an API - into your pipeline.
  [LlamaHub](https://llamahub.ai/) provides hundreds of connectors to choose from.
- **Indexing**: this means creating a data structure that allows for querying the data. For LLMs this nearly always means creating `vector embeddings`,
  numerical representations of the meaning of your data, as well as numerous other metadata strategies to make it easy to accurately find contextually relevant data.
- **Storing**: once your data is indexed you will almost always want to store your index, as well as other metadata, to avoid having to re-index it.
- **Querying**: for any given indexing strategy there are many ways you can utilize LLMs and LlamaIndex data structures to query, including sub-queries, multi-step queries and hybrid strategies.
- **Evaluation**: a critical step in any pipeline is checking how effective it is relative to other strategies, or when you make changes.
  Evaluation provides objective measures of how accurate, faithful and fast your responses to queries are.

### Loading stage

**[Nodes and Documents](https://docs.llamaindex.ai/en/stable/module_guides/loading/documents_and_nodes/root.html)**:
A `Document` is a container around any data source - for instance, a PDF, an API output, or retrieve data from a database.
A `Node` is the atomic unit of data in LlamaIndex and represents a "chunk" of a source `Document`.
Nodes have metadata that relate them to the document they are in and to other nodes.

**[Connectors](https://docs.llamaindex.ai/en/stable/module_guides/loading/connector/root.html)**:
A data connector (often called a `Reader`) ingests data from different data sources
and data formats into `Documents` and `Nodes`.

### Indexing Stage

**[Indexes](https://docs.llamaindex.ai/en/stable/module_guides/indexing/indexing.html)**: Once you've ingested your data,
LlamaIndex will help you index the data into a structure that's easy to retrieve.
This usually involves generating `vector embeddings` which are stored in a specialized database called a `vector store`.
Indexes can also store a variety of metadata about your data.

**[Embeddings](https://docs.llamaindex.ai/en/stable/module_guides/models/embeddings.html)** LLMs generate numerical representations of data called `embeddings`.
When filtering your data for relevance, LlamaIndex will convert queries into embeddings, and your vector store will find data that is numerically similar to the embedding of your query.

In LlamaIndex terms, an **Index** is a data structure composed of **Document** objects, designed to enable querying by an LLM.
Your Index is designed to be complementary to your querying strategy.

A `VectorStoreIndex` is by far the most frequent type of Index you'll encounter. The Vector Store Index takes your Documents and splits them up into Nodes.
It then creates `vectorembeddings` of the text of every node, ready to be queried by an LLM.

### Querying Stage

- **[Retrievers](https://docs.llamaindex.ai/en/stable/module_guides/querying/retriever/root.html)**: A retriever defines how to efficiently retrieve
  relevant context from an index when given a query.
  Your retrieval strategy is key to the relevancy of the data retrieved and the efficiency with which it's done.
- **[Routers](https://docs.llamaindex.ai/en/stable/module_guides/querying/router/root.html)**: A router determines which retriever will be used to retrieve relevant context from the knowledge base.
  More specifically, the `RouterRetriever` class, is responsible for selecting one or multiple candidate retrievers to execute a query. They use a selector to choose the best option based on each candidate's metadata and the query.
- **[Node Postprocessors](https://docs.llamaindex.ai/en/stable/module_guides/querying/node_postprocessors/root.html)**: A node postprocessor takes in a set of retrieved nodes and applies transformations,
  filtering, or re-ranking logic to them.
- **[Response Synthesizers](https://docs.llamaindex.ai/en/stable/module_guides/querying/response_synthesizers/root.html)**: A response synthesizer
  generates a response from an LLM, using a user query and a given set of retrieved text chunks.

## Putting it all together

There are endless use cases for data-backed LLM applications but they can be roughly grouped into three categories:

- **[Query Engines](https://docs.llamaindex.ai/en/stable/module_guides/deploying/query_engine/root.html)**: A query engine is an end-to-end pipeline that allows you to ask questions over your data. It takes in a natural language query, and returns a response, along with reference context retrieved and passed to the LLM.
- **[Chat Engines](https://docs.llamaindex.ai/en/stable/module_guides/deploying/chat_engines/root.html)**: A chat engine is an end-to-end pipeline for having a conversation with your data (multiple back-and-forth instead of a single question-and-answer).
- **[Agents](https://docs.llamaindex.ai/en/stable/module_guides/deploying/agents/root.html)**: An agent is an automated decision-maker powered by an LLM that interacts with the world via a set of
  [tools](https://docs.llamaindex.ai/en/stable/module_guides/deploying/agents/tools/llamahub_tools_guide.html).
  Agents can take an arbitrary number of steps to complete a given task, dynamically deciding on the best course of action rather than following pre-determined steps.
  This gives it additional flexibility to tackle more complex tasks.

## Embeddings

:::note
⭐ `text-embedding-3-small` and `text-embedding-3-large`, our newest and most performant embedding models are now available,
with lower costs, higher multilingual performance, and new parameters to control the overall size.
:::

OpenAI's text embeddings measure the relatedness of text strings.
Embeddings are commonly used for:

- **Search** (where results are ranked by relevance to a query string)
- **Clustering** (where text strings are grouped by similarity)
- **Recommendations** (where items with related text strings are recommended)
- **Anomaly detection** (where outliers with little relatedness are identified)
- **Diversity measurement** (where similarity distributions are analyzed)
- **Classification** (where text strings are classified by their most similar label)

An embedding is a vector (list) of floating point numbers. The [distance](https://platform.openai.com/docs/guides/embeddings/which-distance-function-should-i-use)
between two vectors measures their relatedness. Small distances suggest high relatedness and large distances suggest low relatedness.
