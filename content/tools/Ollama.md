## Configuration

Ollama is configurable using environment variables, all of these variables are available [here](https://github.com/ollama/ollama/blob/main/envconfig/config.go).

| Env                      | Description                                                            |
| ------------------------ | ---------------------------------------------------------------------- |
| OLLAMA_DEBUG             | Show additional debug information (e.g. OLLAMA_DEBUG=1)                |
| OLLAMA_FLASH_ATTENTION   | Enabled flash attention                                                |
| OLLAMA_GPU_OVERHEAD      | Reserve a portion of VRAM per GPU (bytes)                              |
| OLLAMA_HOST              | IP Address for the ollama server (default 127.0.0.1:11434)             |
| OLLAMA_KEEP_ALIVE        | The duration that models stay loaded in memory (default "5m")          |
| OLLAMA_LLM_LIBRARY       | Set LLM library to bypass autodetection                                |
| OLLAMA_LOAD_TIMEOUT      | How long to allow model loads to stall before giving up (default "5m") |
| OLLAMA_MAX_LOADED_MODELS | Maximum number of loaded models per GPU                                |
| OLLAMA_MAX_QUEUE         | Maximum number of queued requests                                      |
| OLLAMA_MODELS            | The path to the models directory                                       |
| OLLAMA_NOHISTORY         | Do not preserve readline history                                       |
| OLLAMA_NOPRUNE           | Do not prune model blobs on startup                                    |
| OLLAMA_NUM_PARALLEL      | Maximum number of parallel requests                                    |
| OLLAMA_ORIGINS           | A comma separated list of allowed origins                              |
| OLLAMA_SCHED_SPREAD      | Always schedule model across all GPUs                                  |
| OLLAMA_TMPDIR            | Location for temporary files                                           |
| OLLAMA_MULTIUSER_CACHE   | Optimize prompt caching for multi-user scenarios                       |
