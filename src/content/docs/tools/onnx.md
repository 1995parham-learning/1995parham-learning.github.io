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
