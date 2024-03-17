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

## Supported Types

ONNX specifications are optimized for numerical computation with tensors.
A tensor is a multidimensional array. It is defined by:

- a type: the element type, the same for all elements in the tensor
- a shape: an array with all dimensions, this array can be empty, a dimension can be null
- a contiguous array: it represents all the values

ONNX is **strongly typed**, and its definition does not support implicit cast.
It is _impossible_ to add two tensors or matrices with different types even if other languages does.
That's why an explicit cast must be inserted in a graph.

## What is a `opset` version?

The `opset` is mapped to the version of the ONNX package.
It is incremented every time the minor version increases.
Every version brings _updated or new operators_.

```python
import onnx
print(onnx.__version__, " opset=", onnx.defs.onnx_opset_version())
```

```text
1.17.0  opset= 22
```

## Tools

- [`netron`](https://netron.app/) is very useful to help visualize ONNX graphs.
  That's the only one without programming.

## A simple example: a linear regression

The linear regression is the most naive model in machine learning described by the following expression.

```
Y = XA + B
```

We can see it as a function of three variables `Y = f(X, A, B)`
decomposed into `y = Add(MatMul(X, A), B)`. That what we need to represent with ONNX operators.
The first thing is to implement a function with ONNX operators.
ONNX is strongly typed. Shape and type must be defined for both input and output of the function.
That said, we need four functions to build the graph among the make function:

- `make_tensor_value_info`: declares a variable (input or output) given its shape and type
- `make_node`: creates a node defined by an operation (an operator type), its inputs and outputs
- `make_graph`: a function to create an ONNX graph with the objects created by the two previous functions
- `make_model`: a last function which merges the graph and additional metadata

All along the creation, we need to give a name to every input, output of every node of the graph.
Input and output of the graph are defined by ONNX objects, strings are used to refer to intermediate results.
This is how it looks like.

```python
# imports

from onnx import TensorProto
from onnx.helper import (
    make_model, make_node, make_graph,
    make_tensor_value_info)
from onnx.checker import check_model

# inputs

# 'X' is the name, TensorProto.FLOAT the type, [None, None] the shape
X = make_tensor_value_info('X', TensorProto.FLOAT, [None, None])
A = make_tensor_value_info('A', TensorProto.FLOAT, [None, None])
B = make_tensor_value_info('B', TensorProto.FLOAT, [None, None])

# outputs, the shape is left undefined

Y = make_tensor_value_info('Y', TensorProto.FLOAT, [None])

# nodes

# It creates a node defined by the operator type MatMul,
# 'X', 'A' are the inputs of the node, 'XA' the output.
node1 = make_node('MatMul', ['X', 'A'], ['XA'])
node2 = make_node('Add', ['XA', 'B'], ['Y'])

# from nodes to graph
# the graph is built from the list of nodes, the list of inputs,
# the list of outputs and a name.

graph = make_graph([node1, node2],  # nodes
                    'lr',  # a name
                    [X, A, B],  # inputs
                    [Y])  # outputs

# onnx graph
# there is no metadata in this case.

onnx_model = make_model(graph)

# Let's check the model is consistent,
# this function is described in section
# Checker and Shape Inference.
check_model(onnx_model)

# the work is done, let's display it...
print(onnx_model)
```
