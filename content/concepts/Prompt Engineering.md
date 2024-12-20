Prompt engineering is a relatively new discipline for developing and optimizing prompts to efficiently use
language models (LMs) for a wide variety of applications and research topics.
Prompt engineering skills **help to better understand the capabilities and limitations of large language models (LLMs)**.

Researchers use prompt engineering to improve the capacity of LLMs on a wide range of common and complex tasks
such as question answering and arithmetic reasoning. Developers use prompt engineering to design robust and
effective prompting techniques that interface with LLMs and other tools.

Prompt engineering is not just about designing and developing prompts.
It encompasses a wide range of skills and techniques that are useful for interacting and developing with LLMs.
It's an important skill to interface, build with, and understand capabilities of LLMs.
You can use prompt engineering to improve safety of LLMs and build new capabilities like augmenting
LLMs with domain knowledge and external tools.

## LLM Settings

When designing and testing prompts, you typically interact with the LLM via an API.
You can configure a few parameters to get different results for your prompts.

### Temperature

In short, the lower the temperature, the more deterministic the results in the sense that
the highest probable next token is always picked.
Increasing temperature could lead to more randomness, which encourages more diverse or creative outputs.

### Top P

A sampling technique with temperature, called nucleus sampling, where you can control how deterministic the model is.
If you are looking for exact and factual answers keep this low. If you are looking for more diverse responses,
increase to a higher value.

> [!note]
> The general recommendation is to alter temperature or Top P but not both.

### Max Length

You can manage the number of tokens the model generates by adjusting the max length.
Specifying a max length helps you prevent long or irrelevant responses and control costs.

### Stop Sequences

A stop sequence is a string that stops the model from generating tokens.
Specifying stop sequences is another way to control the length and structure of the model's response.

### Frequency Penalty

The frequency penalty applies a penalty on the next token proportional to how many times that token already
appeared in the response and prompt. The higher the frequency penalty, the less likely a word will appear again.
This setting reduces the repetition of words in the model's response by giving tokens that appear more a higher penalty.

### Presence Penalty

The presence penalty also applies a penalty on repeated tokens but, unlike the frequency penalty,
the penalty is the same for all repeated tokens. A token that appears twice and a token that
appears 10 times are penalized the same.

> [!info]
> Similar to temperature and Top P, the general recommendation is to alter the frequency or presence penalty but not both.

## Prompting an LLM

You can achieve a lot with simple prompts, but the quality of results depends on **how much information
you provide it** and how well-crafted the prompt is. A prompt can contain information like the instruction
or question you are passing to the model and _include other details such as context, inputs, or examples_.
You can use these elements to instruct the model more effectively to improve the quality of results.

Something to note is that when using the OpenAI chat models like gpt-3.5-turbo or gpt-4,
you can structure your prompt using three different roles: **system**, **user**, and **assistant**.

The **system** message is not required but helps to set the overall behavior of the assistant.
You can also define an **assistant message** to pass examples of the desired behavior you want.

### Zero shot prompting

-   Q. Explain the different types of banks
-   A. Banks along a river can take various forms depending on whether they are natural or artificial

### Few shots prompting

-   Q. What is the primary function of a bank?
-   A. A bank's primary function is to accept deposits, provide loans and offer other financial services
    to individuals and businesses.
-   Q. Explain the different types of banks

### Chain of thought (CoT)

Asking LLM to think step by step and document its chain of thoughts.

## RAG

RAG takes input and retrieves a set of **relevant/supporting documents given a source** (e.g., Wikipedia).
The documents are _concatenated as context with the original input prompt_ and fed to the text generator which produces
the final output. This makes RAG adaptive for situations where facts could evolve over time.
This is very useful as LLMs's parametric knowledge is static. RAG allows language models to bypass retraining,
enabling access to the latest information for generating reliable outputs via retrieval-based generation.

## References

-   <https://www.promptingguide.ai/>
