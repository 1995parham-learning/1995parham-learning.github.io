## How to use LiteLLM

You can use LiteLLM through either:

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

| Param Name              | Description                                                                                                                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model_list`            | List of supported models on the server, with model-specific configs                                                                                                                                 |
| `router_settings`       | litellm Router settings, example `routing_strategy="least-busy"` [**see all**](https://docs.litellm.ai/docs/proxy/configs#router-settings)                                                          |
| `litellm_settings`      | litellm Module settings, example `litellm.drop_params=True`, `litellm.set_verbose=True`, `litellm.api_base`, `litellm.cache` [**see all**](https://docs.litellm.ai/docs/proxy/configs#all-settings) |
| `general_settings`      | Server settings, example setting `master_key: sk-my_special_key`                                                                                                                                    |
| `environment_variables` | Environment Variables example, `REDIS_HOST`, `REDIS_PORT`                                                                                                                                           |

## All settings

```yaml
environment_variables: {}

model_list:
    - model_name: string
      litellm_params:
	      model: azure/my_azure_deployment
	      api_base: os.environ/AZURE_API_BASE
	      api_key: "os.environ/AZURE_API_KEY"
	      api_version: "2024-07-01-preview" # [OPTIONAL] litellm uses the latest azure api_version by default
      model_info:
          id: string
          mode: embedding
          input_cost_per_token: 0
          output_cost_per_token: 0
          max_tokens: 2048
          base_model: gpt-4-1106-preview

litellm_settings:
    # Logging/Callback settings
    success_callback: ["langfuse"] # list of success callbacks
    failure_callback: ["sentry"] # list of failure callbacks
    callbacks: ["otel"] # list of callbacks - runs on success and failure
    service_callbacks: ["datadog", "prometheus"] # logs redis, postgres failures on datadog, prometheus
    turn_off_message_logging: boolean # prevent the messages and responses from being logged to on your callbacks, but request metadata will still be logged.
    redact_user_api_key_info: boolean # Redact information about the user api key (hashed token, user_id, team id, etc.), from logs. Currently supported for Langfuse, OpenTelemetry, Logfire, ArizeAI logging.
    langfuse_default_tags: [
            "cache_hit",
            "cache_key",
            "proxy_base_url",
            "user_api_key_alias",
            "user_api_key_user_id",
            "user_api_key_user_email",
            "user_api_key_team_alias",
            "semantic-similarity",
            "proxy_base_url",
        ] # default tags for Langfuse Logging

    # Networking settings
    request_timeout: 10 # (int) llm requesttimeout in seconds. Raise Timeout error if call takes longer than 10s. Sets litellm.request_timeout
    force_ipv4: boolean # If true, litellm will force ipv4 for all LLM requests. Some users have seen httpx ConnectionError when using ipv6 + Anthropic API

    set_verbose: boolean # sets litellm.set_verbose=True to view verbose debug logs. DO NOT LEAVE THIS ON IN PRODUCTION
    json_logs: boolean # if true, logs will be in json format

    # Fallbacks, reliability
    default_fallbacks: ["claude-opus"] # set default_fallbacks, in case a specific model group is misconfigured / bad.
    content_policy_fallbacks: [{ "gpt-3.5-turbo-small": ["claude-opus"] }] # fallbacks for ContentPolicyErrors
    context_window_fallbacks: [{ "gpt-3.5-turbo-small": ["gpt-3.5-turbo-large", "claude-opus"] }] # fallbacks for ContextWindowExceededErrors

    # Caching settings
    cache: true
    cache_params: # set cache params for redis
        type: redis # type of cache to initialize

        # Optional - Redis Settings
        host: "localhost" # The host address for the Redis cache. Required if type is "redis".
        port: 6379 # The port number for the Redis cache. Required if type is "redis".
        password: "your_password" # The password for the Redis cache. Required if type is "redis".
        namespace: "litellm.caching.caching" # namespace for redis cache

        # Optional - Redis Cluster Settings
        redis_startup_nodes: [{ "host": "127.0.0.1", "port": "7001" }]

        # Optional - Redis Sentinel Settings
        service_name: "mymaster"
        sentinel_nodes: [["localhost", 26379]]

        # Optional - Qdrant Semantic Cache Settings
        qdrant_semantic_cache_embedding_model: openai-embedding # the model should be defined on the model_list
        qdrant_collection_name: test_collection
        qdrant_quantization_config: binary
        similarity_threshold: 0.8 # similarity threshold for semantic cache

        # Optional - S3 Cache Settings
        s3_bucket_name: cache-bucket-litellm # AWS Bucket Name for S3
        s3_region_name: us-west-2 # AWS Region Name for S3
        s3_aws_access_key_id: os.environ/AWS_ACCESS_KEY_ID # us os.environ/<variable name> to pass environment variables. This is AWS Access Key ID for S3
        s3_aws_secret_access_key: os.environ/AWS_SECRET_ACCESS_KEY # AWS Secret Access Key for S3
        s3_endpoint_url: https://s3.amazonaws.com # [OPTIONAL] S3 endpoint URL, if you want to use Backblaze/cloudflare s3 bucket

        # Common Cache settings
        # Optional - Supported call types for caching
        supported_call_types:
            ["acompletion", "atext_completion", "aembedding", "atranscription"]
            # /chat/completions, /completions, /embeddings, /audio/transcriptions
        mode: default_off # if default_off, you need to opt in to caching on a per call basis
        ttl: 600 # ttl for caching

callback_settings:
    otel:
        message_logging: boolean # OTEL logging callback specific settings

general_settings:
    completion_model: string
    disable_spend_logs: boolean # turn off writing each transaction to the db
    disable_master_key_return: boolean # turn off returning master key on UI (checked on '/user/info' endpoint)
    disable_retry_on_max_parallel_request_limit_error: boolean # turn off retries when max parallel request limit is reached
    disable_reset_budget: boolean # turn off reset budget scheduled task
    disable_adding_master_key_hash_to_db: boolean # turn off storing master key hash in db, for spend tracking
    enable_jwt_auth: boolean # allow proxy admin to auth in via jwt tokens with 'litellm_proxy_admin' in claims
    enforce_user_param: boolean # requires all openai endpoint requests to have a 'user' param
    allowed_routes: ["route1", "route2"] # list of allowed proxy API routes - a user can access. (currently JWT-Auth only)
    key_management_system: google_kms # either google_kms or azure_kms
    master_key: string

    # Database Settings
    database_url: string
    database_connection_pool_limit: 0 # default 100
    database_connection_timeout: 0 # default 60s
    allow_requests_on_db_unavailable: boolean # if true, will allow requests that can not connect to the DB to verify Virtual Key to still work

    custom_auth: string
    max_parallel_requests: 0 # the max parallel requests allowed per deployment
    global_max_parallel_requests: 0 # the max parallel requests allowed on the proxy all up
    infer_model_from_keys: true
    background_health_checks: true
    health_check_interval: 300
    alerting: ["slack", "email"]
    alerting_threshold: 0
    use_client_credentials_pass_through_routes: boolean # use client credentials for all pass through routes like "/vertex-ai", /bedrock/. When this is True Virtual Key auth will not be applied on these endpoints
```

### litellm_settings - Reference

| Name                                           | Type             | Description                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| success_callback                               | array of strings | List of success callbacks. [Doc Proxy logging callbacks](https://docs.litellm.ai/docs/proxy/logging), [Doc Metrics](https://docs.litellm.ai/docs/proxy/prometheus)                                                                                                                                                             |
| failure_callback                               | array of strings | List of failure callbacks [Doc Proxy logging callbacks](https://docs.litellm.ai/docs/proxy/logging), [Doc Metrics](https://docs.litellm.ai/docs/proxy/prometheus)                                                                                                                                                              |
| callbacks                                      | array of strings | List of callbacks - runs on success and failure [Doc Proxy logging callbacks](https://docs.litellm.ai/docs/proxy/logging), [Doc Metrics](https://docs.litellm.ai/docs/proxy/prometheus)                                                                                                                                        |
| service_callbacks                              | array of strings | System health monitoring - Logs redis, postgres failures on specified services (e.g. datadog, prometheus) [Doc Metrics](https://docs.litellm.ai/docs/proxy/prometheus)                                                                                                                                                         |
| turn_off_message_logging                       | boolean          | If true, prevents messages and responses from being logged to callbacks, but request metadata will still be logged [Proxy Logging](https://docs.litellm.ai/docs/proxy/logging)                                                                                                                                                 |
| modify_params                                  | boolean          | If true, allows modifying the parameters of the request before it is sent to the LLM provider                                                                                                                                                                                                                                  |
| enable_preview_features                        | boolean          | If true, enables preview features - e.g. Azure O1 Models with streaming support.                                                                                                                                                                                                                                               |
| redact_user_api_key_info                       | boolean          | If true, redacts information about the user api key from logs [Proxy Logging](https://docs.litellm.ai/docs/proxy/logging#redacting-userapikeyinfo)                                                                                                                                                                             |
| langfuse_default_tags                          | array of strings | Default tags for Langfuse Logging. Use this if you want to control which LiteLLM-specific fields are logged as tags by the LiteLLM proxy. By default LiteLLM Proxy logs no LiteLLM-specific fields as tags. [Further docs](https://docs.litellm.ai/docs/proxy/logging#litellm-specific-tags-on-langfuse---cache_hit-cache_key) |
| set_verbose                                    | boolean          | If true, sets litellm.set_verbose=True to view verbose debug logs. DO NOT LEAVE THIS ON IN PRODUCTION                                                                                                                                                                                                                          |
| json_logs                                      | boolean          | If true, logs will be in json format. If you need to store the logs as JSON, just set the `litellm.json_logs = True`. We currently just log the raw POST request from litellm as a JSON [Further docs](https://docs.litellm.ai/docs/proxy/debugging)                                                                           |
| default_fallbacks                              | array of strings | List of fallback models to use if a specific model group is misconfigured / bad. [Further docs](https://docs.litellm.ai/docs/proxy/reliability#default-fallbacks)                                                                                                                                                              |
| request_timeout                                | integer          | The timeout for requests in seconds. If not set, the default value is `6000 seconds`. [For reference OpenAI Python SDK defaults to `600 seconds`.](https://github.com/openai/openai-python/blob/main/src/openai/_constants.py)                                                                                                 |
| force_ipv4                                     | boolean          | If true, litellm will force ipv4 for all LLM requests. Some users have seen httpx ConnectionError when using ipv6 + Anthropic API                                                                                                                                                                                              |
| content_policy_fallbacks                       | array of objects | Fallbacks to use when a ContentPolicyViolationError is encountered. [Further docs](https://docs.litellm.ai/docs/proxy/reliability#content-policy-fallbacks)                                                                                                                                                                    |
| context_window_fallbacks                       | array of objects | Fallbacks to use when a ContextWindowExceededError is encountered. [Further docs](https://docs.litellm.ai/docs/proxy/reliability#context-window-fallbacks)                                                                                                                                                                     |
| cache                                          | boolean          | If true, enables caching. [Further docs](https://docs.litellm.ai/docs/proxy/caching)                                                                                                                                                                                                                                           |
| cache_params                                   | object           | Parameters for the cache. [Further docs](https://docs.litellm.ai/docs/proxy/caching#supported-cache_params-on-proxy-configyaml)                                                                                                                                                                                                |
| disable_end_user_cost_tracking                 | boolean          | If true, turns off end user cost tracking on prometheus metrics + litellm spend logs table on proxy.                                                                                                                                                                                                                           |
| disable_end_user_cost_tracking_prometheus_only | boolean          | If true, turns off end user cost tracking on prometheus metrics only.                                                                                                                                                                                                                                                          |
| key_generation_settings                        | object           | Restricts who can generate keys. [Further docs](https://docs.litellm.ai/docs/proxy/virtual_keys#restricting-key-generation)                                                                                                                                                                                                    |
| disable_add_transform_inline_image_block       | boolean          | For Fireworks AI models - if true, turns off the auto-add of `#transform=inline` to the url of the image_url, if the model is not a vision model.                                                                                                                                                                              |
| disable_hf_tokenizer_download                  | boolean          | If true, it defaults to using the openai tokenizer for all models (including huggingface models).                                                                                                                                                                                                                              |

## Caching

Cache LLM Responses. Send the same request twice:

```bash
curl http://0.0.0.0:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
     "model": "gpt-3.5-turbo",
     "messages": [{"role": "user", "content": "write a poem about litellm!"}],
     "temperature": 0.7
   }'

curl http://0.0.0.0:4000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
     "model": "gpt-3.5-turbo",
     "messages": [{"role": "user", "content": "write a poem about litellm!"}],
     "temperature": 0.7
   }'
```
