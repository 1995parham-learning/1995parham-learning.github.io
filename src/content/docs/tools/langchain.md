---
title: LangChain
---

> LangChain is a framework for developing applications powered by large language models (LLMs).

LangChain simplifies every stage of the LLM application lifecycle:

- Development: Build your applications using LangChain's open-source building blocks and components.
  Hit the ground running using third-party integrations and Templates.-
- Productionization: Use `LangSmith` to inspect, monitor and evaluate your chains,
  so that you can continuously optimize and deploy with confidence.
- Deployment: Turn any chain into an API with `LangServe`.

Concretely, the framework consists of the following open-source libraries:

- `langchain-core`: Base abstractions and LangChain Expression Language.
- `langchain-community`: Third party integrations.
  - Partner packages (e.g. `langchain-openai`, `langchain-anthropic`, etc.): Some integrations have been
    further split into their own lightweight packages that only depend on `langchain-core`.
- `langchain`: Chains, agents, and retrieval strategies that make up an application's cognitive architecture.
- `langgraph`: Build robust and stateful multi-actor applications with LLMs by modeling steps as edges and nodes in a graph.
- `langserve`: Deploy LangChain chains as REST APIs.
