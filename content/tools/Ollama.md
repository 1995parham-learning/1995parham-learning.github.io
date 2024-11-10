## Configuration
Ollama is configurable using environment variables, all of these variables are available [here](https://github.com/ollama/ollama/blob/main/envconfig/config.go).



| Env                    | Description                                             |
| ---------------------- | ------------------------------------------------------- |
| OLLAMA_DEBUG           | Show additional debug information (e.g. OLLAMA_DEBUG=1) |
| OLLAMA_FLASH_ATTENTION | Enabled flash attention                                 |
|                        |                                                         |
|                        |                                                         |
|                        |                                                         |
|                        |                                                         |
|                        |                                                         |
|                        |                                                         |
|                        |                                                         |
|                        |                                                         |


```go
"OLLAMA_GPU_OVERHEAD":      {"OLLAMA_GPU_OVERHEAD", GpuOverhead(), "Reserve a portion of VRAM per GPU (bytes)"},
"OLLAMA_HOST":              {"OLLAMA_HOST", Host(), "IP Address for the ollama server (default 127.0.0.1:11434)"},
"OLLAMA_KEEP_ALIVE":        {"OLLAMA_KEEP_ALIVE", KeepAlive(), "The duration that models stay loaded in memory (default \"5m\")"},
"OLLAMA_LLM_LIBRARY":       {"OLLAMA_LLM_LIBRARY", LLMLibrary(), "Set LLM library to bypass autodetection"},
"OLLAMA_LOAD_TIMEOUT":      {"OLLAMA_LOAD_TIMEOUT", LoadTimeout(), "How long to allow model loads to stall before giving up (default \"5m\")"},
"OLLAMA_MAX_LOADED_MODELS": {"OLLAMA_MAX_LOADED_MODELS", MaxRunners(), "Maximum number of loaded models per GPU"},
"OLLAMA_MAX_QUEUE":         {"OLLAMA_MAX_QUEUE", MaxQueue(), "Maximum number of queued requests"},
"OLLAMA_MODELS":            {"OLLAMA_MODELS", Models(), "The path to the models directory"},
"OLLAMA_NOHISTORY":         {"OLLAMA_NOHISTORY", NoHistory(), "Do not preserve readline history"},
"OLLAMA_NOPRUNE":           {"OLLAMA_NOPRUNE", NoPrune(), "Do not prune model blobs on startup"},
"OLLAMA_NUM_PARALLEL":      {"OLLAMA_NUM_PARALLEL", NumParallel(), "Maximum number of parallel requests"},
"OLLAMA_ORIGINS":           {"OLLAMA_ORIGINS", Origins(), "A comma separated list of allowed origins"},
"OLLAMA_SCHED_SPREAD":      {"OLLAMA_SCHED_SPREAD", SchedSpread(), "Always schedule model across all GPUs"},
"OLLAMA_TMPDIR":            {"OLLAMA_TMPDIR", TmpDir(), "Location for temporary files"},
"OLLAMA_MULTIUSER_CACHE":   {"OLLAMA_MULTIUSER_CACHE", MultiUserCache(), "Optimize prompt caching for multi-user scenarios"},
```
