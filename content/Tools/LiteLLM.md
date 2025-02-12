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

## When to use LiteLLM Python SDK

> [!tip]
> Use LiteLLM Python SDK if you want to use LiteLLM in your **python code**
>
> Typically used by developers building llm projects

- LiteLLM SDK gives you a unified interface to access multiple LLMs (100+ LLMs)
- Retry/fallback logic across multiple deployments (e.g. Azure/OpenAI)

## `config.yaml`

Set model list, `api_base`, `api_key`, `temperature` & proxy server settings (`master-key`) on the config.yaml.

|Param Name|Description|
|---|---|
|`model_list`|List of supported models on the server, with model-specific configs|
|`router_settings`|litellm Router settings, example `routing_strategy="least-busy"` [**see all**](https://docs.litellm.ai/docs/proxy/configs#router-settings)|
|`litellm_settings`|litellm Module settings, example `litellm.drop_params=True`, `litellm.set_verbose=True`, `litellm.api_base`, `litellm.cache` [**see all**](https://docs.litellm.ai/docs/proxy/configs#all-settings)|
|`general_settings`|Server settings, example setting `master_key: sk-my_special_key`|
|`environment_variables`|Environment Variables example, `REDIS_HOST`, `REDIS_PORT`|
