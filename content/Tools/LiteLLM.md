## How to use LiteLLM

You can use litellm through either:

1. [LiteLLM Proxy Server](https://docs.litellm.ai/docs/#litellm-proxy-server-llm-gateway) - Server (LLM Gateway) to call 100+ LLMs, load balance, cost tracking across projects
2. [LiteLLM python SDK](https://docs.litellm.ai/docs/#basic-usage) - Python Client to call 100+ LLMs, load balance, cost tracking
## When to use LiteLLM Proxy Server (LLM Gateway)

> [!tip]
> Use LiteLLM Proxy Server if you want a **central service (LLM Gateway) to access multiple LLMs**
>
> Typically used by Gen AI Enablement / ML PLatform Teams

- LiteLLM Proxy gives you a unified interface to access multiple LLMs (100+ LLMs)
- Track LLM Usage and setup guardrails
- Customize Logging, Guardrails, Caching per project
