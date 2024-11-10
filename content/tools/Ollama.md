## Configuration
Ollama is configurable using environment variables, all of these variables are available [here](https://github.com/ollama/ollama/blob/main/envconfig/config.go).

	```go
```
	// Debug enabled additional debug information.
	Debug = Bool("OLLAMA_DEBUG")
	// FlashAttention enables the experimental flash attention feature.
	FlashAttention = Bool("OLLAMA_FLASH_ATTENTION")
	// NoHistory disables readline history.
	NoHistory = Bool("OLLAMA_NOHISTORY")
	// NoPrune disables pruning of model blobs on startup.
	NoPrune = Bool("OLLAMA_NOPRUNE")
	// SchedSpread allows scheduling models across all GPUs.
	SchedSpread = Bool("OLLAMA_SCHED_SPREAD")
	// IntelGPU enables experimental Intel GPU detection.
	IntelGPU = Bool("OLLAMA_INTEL_GPU")
	// MultiUserCache optimizes prompt caching for multi-user scenarios
	MultiUserCache = Bool("OLLAMA_MULTIUSER_CACHE")