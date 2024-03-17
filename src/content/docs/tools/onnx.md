---
title: ONNX
---

ONNX can be compared to a **programming language** specialized in mathematical functions.
It defines all the necessary operations a machine learning model needs to implement its _inference function_
with this language. A linear regression could be represented in the following way:

```python
def onnx_linear_regressor(X):
    "ONNX code for a linear regression"
    return onnx.Add(onnx.MatMul(X, coefficients), bias)
```

ONNX aims at providing a common language any machine learning framework can use to describe its models.

Building an ONNX graph means implementing a function with the ONNX language or more precisely the **ONNX Operators**.
A linear regression would be written this way. The following lines do not follow python syntax.
It is just a kind of pseudocode to illustrate the model.

```text
Input: float[M,K] x, float[K,N] a, float[N] c
Output: float[M, N] y

r = onnx.MatMul(x, a)
y = onnx.Add(r, c)
```

`x`, `a`, `c` are the **inputs**, `y` is the **output**.
`r` is an **intermediate result**.
`MatMul` and `Add` are the **nodes**.
They also have inputs and outputs. A node has also a type, one of the operators in ONNX Operators.

The graph could also have an **initializer**. When an input never changes such as the coefficients of
the linear regression, it is most efficient to turn it into a constant stored in the graph.

```text
Input: float[M,K] x
Initializer: float[K,N] a, float[N] c
Output: float[M, N] xac

xa = onnx.MatMul(x, a)
xac = onnx.Add(xa, c)
```

## Serialization with `protobuf`

The deployment of a machine-learned model into production usually _requires replicating_ the entire ecosystem used
to train the model, most of the time with a docker. Once a model is converted into ONNX, the production environment
only needs a **runtime** to execute the graph defined with ONNX operators.
This runtime can be developed in any language suitable for the production application, C, java, python, JavaScript,
C#, WebAssembly, ARM, etc.

But to make that happen, the ONNX graph needs to be saved. ONNX uses `protobuf` to serialize the graph into
one single block. It aims at optimizing the model size as much as possible.
