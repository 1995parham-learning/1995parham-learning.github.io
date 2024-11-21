FastEmbed is a lightweight Python library built for embedding generation. It supports popular embedding models and offers a user-friendly experience for embedding data into vector space.

By using FastEmbed, you can ensure that your embedding generation process is not only fast and efficient but also highly accurate, meeting the needs of various machine learning and natural language processing applications.

FastEmbed easily integrates with [[Qdrant]] for a variety of multimodal search purposes.

## Why is FastEmbed useful?

- _Light_: Unlike other inference frameworks, such as PyTorch, FastEmbed requires very little external dependencies. Because **it uses the ONNX runtime**, it is perfect for serverless environments like AWS Lambda.
- _Fast_: By using ONNX, FastEmbed ensures high-performance inference across various hardware platforms.
- _Accurate_: FastEmbed aims for better accuracy and recall than models like OpenAI’s `Ada-002`. It always uses model which demonstrate strong results on the MTEB leaderboard.
- _Support_: FastEmbed supports a wide range of models, including multilingual ones, to meet diverse use case needs.
