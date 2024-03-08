---
title: Python
description: Let's Learn Python
icon: skill-icons:python-dark
---

## Class and static methods

:::note
🧠 _Changed in version 3.9:_ Class methods can now wrap other [descriptors](https://docs.python.org/3/glossary.html#term-descriptor)
such as [`property()`](https://docs.python.org/3/library/functions.html#property).
:::

:::note
🦖 _Changed in version 3.10:_ Class methods now inherit the method attributes
(`__module__`, `__name__`, `__qualname__`,`__doc__` and `__annotations__`) and have a new `__wrapped__` attribute.
:::

:::note
🔥 _Changed in version 3.11:_ Class methods can no longer wrap other [descriptors](https://docs.python.org/3/glossary.html#term-descriptor)
such as [`property()`](https://docs.python.org/3/library/functions.html#property).
:::

## Generators

:::note
Have you ever had to work with a dataset so large that it overwhelmed your machine’s memory?
Or maybe you have a complex function that needs to maintain an internal state every time it’s called,
but the function is too small to justify creating its own class.
In these cases and more, generators and the Python yield statement are here to help.
:::

Introduced with PEP 255, generator functions are a special kind of function that return a **lazy iterator**.
These are objects that you can loop over like a list.
However, unlike lists, lazy iterators _do not store their contents in memory_.

A **generator expression** yields a new generator object. Its syntax is the same as for comprehensions, except
that it is enclosed in parentheses instead of brackets or curly braces.

## Operator

The [`operator`](https://docs.python.org/3/library/operator.html#module-operator)
module exports a set of efficient functions corresponding to the intrinsic operators of Python.
For example, `operator.add(x, y)` is equivalent to the expression `x+y`.

## Bisect

This module provides support for maintaining a list in sorted order without having to sort the list after each insertion. For long lists of items with expensive comparison operations, this can be an improvement over linear searches or frequent resorting.

```python
bisect.bisect_left(a, x, lo=0, hi=len(a), *, key=None)
```

Locate the insertion point for `x` in `a` to maintain sorted order.
The parameters `lo` and `hi` may be used to specify a subset of the list which should be considered;
by default the entire list is used.
If `x` is already present in `a`, the insertion point will be before (to the left of) any existing entries.
The return value is suitable for use as the first parameter to `list.insert()` assuming that `a` is already sorted.
The returned insertion point `ip` partitions the array `a` into two slices such that
`all(elem < x for elem in a[lo : ip])` is true for the left slice and `all(elem >= x for elem in a[ip : hi])` is true for the right slice.
`key` specifies a [key function](https://docs.python.org/3/glossary.html#term-key-function) of one argument that is used to extract
a comparison key from each element in the array. To support searching complex records, the key function is not applied to the `x` value.
If `key` is `None`, the elements are compared directly and no key function is called.

```python
bisect.bisect_right(a, x, lo=0, hi=len(a), *, key=None)
bisect.bisect(a, x, lo=0, hi=len(a), *, key=None)
```

Similar to [`bisect_left()`](https://docs.python.org/3/library/bisect.html#bisect.bisect_left),
but returns an insertion point which comes after (to the right of) any existing entries of `x` in `a`.

The returned insertion point `ip` partitions the array `a` into two slices such that
`all(elem <= x for elem in a[lo : ip])` is true for the left slice and
`all(elem > x for elem in a[ip : hi])` is true for the right slice.

## Itertools

[itertools — Functions creating iterators for efficient looping](https://docs.python.org/3/library/itertools.html)

This module implements a number of [iterator](https://docs.python.org/3/glossary.html#term-iterator)
building blocks inspired by constructs from APL, Haskell, and SML.
Each has been recast in a form suitable for Python.

The module standardizes a core set of fast, memory efficient tools that are useful by themselves or in combination. Together, they form an
"iterator algebra" making it possible to construct specialized tools succinctly and efficiently in pure Python.

**Infinite iterators:**

| Iterator                                                                      | Arguments         | Results                                               | Example                                 |
| ----------------------------------------------------------------------------- | ----------------- | ----------------------------------------------------- | --------------------------------------- |
| [`count`](https://docs.python.org/3/library/itertools.html#itertools.count)   | `[start[, step]]` | `start`, `start+step`, `start+2*step`, ...            | `count(10)` ⇾ `10 11 12 13 14 ...`      |
| [`cycle`](https://docs.python.org/3/library/itertools.html#itertools.cycle)   | `p`               | `p0`, `p1`, ... `plast`, `p0`, `p1`, ...              | `cycle('ABCD')` ⇾ `A B C D A B C D ...` |
| [`repeat`](https://docs.python.org/3/library/itertools.html#itertools.repeat) | `elem [,n]`       | `elem`, `elem`, `elem`,... endlessly or up to n times | `repeat(10, 3)` ⇾ `10 10 10`            |

**Iterators terminating on the shortest input sequence:**

| Iterator                                                                                                | Arguments                     | Results                                              | Example                                                    |
| ------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------- | ---------------------------------------------------------- |
| [`accumulate`](https://docs.python.org/3/library/itertools.html#itertools.accumulate)                   | `p [,func]`                   | `p0`, `p0+p1`, `p0+p1+p2`, ...                       | `accumulate([1,2,3,4,5])` → `1 3 6 10 15`                  |
| [`batched`](https://docs.python.org/3/library/itertools.html#itertools.batched)                         | `p, n`                        | `(p0, p1, ..., p_n-1)`, ...                          | `batched('ABCDEFG', n=3)` → `ABC DEF G`                    |
| [`chain`](https://docs.python.org/3/library/itertools.html#itertools.chain)                             | `p, q, ...`                   | `p0`, `p1`, ... `plast`, `q0`, `q1`, ...             | `chain('ABC', 'DEF')` → `A B C D E F`                      |
| [`chain.from_iterable`](https://docs.python.org/3/library/itertools.html#itertools.chain.from_iterable) | `iterable`                    | `p0`, `p1`, ... `plast`, `q0`, `q1`, ...             | `chain.from_iterable(['ABC', 'DEF'])` → `A B C D E F`      |
| [`compress`](https://docs.python.org/3/library/itertools.html#itertools.compress)                       | `data, selectors`             | `(d[0] if s[0])`, `(d[1] if s[1])`, ...              | `compress('ABCDEF', [1,0,1,0,1,1])` → `A C E F`            |
| [`dropwhile`](https://docs.python.org/3/library/itertools.html#itertools.dropwhile)                     | `pred, seq`                   | `seq[n]`, `seq[n+1]`, starting when `pred` fails     | `dropwhile(lambda x: x<5, [1,4,6,4,1])` → `6 4 1`          |
| [`filterfalse`](https://docs.python.org/3/library/itertools.html#itertools.filterfalse)                 | `pred, seq`                   | elements of `seq` where `pred(elem)` is false        | `filterfalse(lambda x: x%2, range(10))` → `0 2 4 6 8`      |
| [`groupby`](https://docs.python.org/3/library/itertools.html#itertools.groupby)                         | `iterable[, key]`             | sub-iterators grouped by value of `key(v)`           |                                                            |
| [`islice`](https://docs.python.org/3/library/itertools.html#itertools.islice)                           | `seq, [start,] stop [, step]` | elements from `seq[start:stop:step]`                 | `islice('ABCDEFG', 2, None)` → `C D E F G`                 |
| [`pairwise`](https://docs.python.org/3/library/itertools.html#itertools.pairwise)                       | `iterable`                    | `(p[0], p[1])`, `(p[1], p[2])`, ...                  | `pairwise('ABCDEFG')` → `AB BC CD DE EF FG`                |
| [`starmap`](https://docs.python.org/3/library/itertools.html#itertools.starmap)                         | `func, seq`                   | `func(*seq[0])`, `func(*seq[1])`, ...                | `starmap(pow, [(2,5), (3,2), (10,3)])` → `32 9 1000`       |
| [`takewhile`](https://docs.python.org/3/library/itertools.html#itertools.takewhile)                     | `pred, seq`                   | `seq[0]`, `seq[1]`, until `pred` fails               | `takewhile(lambda x: x<5, [1,4,6,4,1])` → `1 4`            |
| [`tee`](https://docs.python.org/3/library/itertools.html#itertools.tee)                                 | `it, n`                       | `it1`, `it2`, ... `itn` splits one iterator into `n` |                                                            |
| [`zip_longest`](https://docs.python.org/3/library/itertools.html#itertools.zip_longest)                 | `p, q, ...`                   | `(p[0], q[0])`, `(p[1], q[1])`, ...                  | `zip_longest('ABCD', 'xy', fillvalue='-')` → `Ax By C- D-` |

**Combinatoric iterators:**

| Iterator                                                                                                                    | Arguments              | Results                                                       |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------- |
| [`product`](https://docs.python.org/3/library/itertools.html#itertools.product)                                             | `p, q, ... [repeat=1]` | Cartesian product, equivalent to a nested for-loop            |
| [`permutations`](https://docs.python.org/3/library/itertools.html#itertools.permutations)                                   | `p[, r]`               | r-length tuples, all possible orderings, no repeated elements |
| [`combinations`](https://docs.python.org/3/library/itertools.html#itertools.combinations)                                   | `p, r`                 | r-length tuples, in sorted order, no repeated elements        |
| [`combinations_with_replacement`](https://docs.python.org/3/library/itertools.html#itertools.combinations_with_replacement) | `p, r`                 | r-length tuples, in sorted order, with repeated elements      |

### Batched

```python
itertools.batched(iterable, n)
```

Batch data from the _iterable_ into tuples of length _n_.

The last batch may be shorter than _n_.
Loops over the input iterable and accumulates data into tuples up to size _n_.
The input is consumed **lazily**, _just enough to fill a batch_.
The result is yielded as soon as the batch is full or when the input iterable is exhausted:

```python
>>> flattened_data = ['roses', 'red', 'violets', 'blue', 'sugar', 'sweet']
>>> unflattened = list(batched(flattened_data, 2))
>>> unflattened
[('roses', 'red'), ('violets', 'blue'), ('sugar', 'sweet')]

>>> for batch in batched('ABCDEFG', 3):
...     print(batch)
...('A', 'B', 'C')
('D', 'E', 'F')
('G',)
```

## Iterables and Iterators

Python's **iterators** and **iterables** are two different but related tools that come in handy when
you need to iterate over a data stream or container.
Iterators power and control the iteration process,
while iterables typically hold data that you want to iterate over one value at a time.

## Formatted Strings

A _formatted string literal_ or _f-string_ is a string literal that is prefixed with
`f` or `F`. These strings may contain replacement fields,
which are expressions delimited by curly braces `{}`.
While other string literals always have a constant value, formatted strings are really expressions evaluated at run time.

The parts of the string outside curly braces are treated literally, except that any doubled curly braces `{{` or `}}`
are replaced with the corresponding single curly brace. A single opening curly bracket `{` marks a replacement field,
which starts with a Python expression.
To **display both the expression text and its value after evaluation**, (useful in debugging), an equal sign `=`
may be added after the expression.
A **conversion field**, introduced by an exclamation point `!` may follow.
A **format specifier** may also be appended, introduced by a colon `:`.
A replacement field ends with a closing curly bracket `}`.

If a conversion is specified, the result of evaluating the expression is converted before formatting.
Conversion `!s` calls [`str()`](https://docs.python.org/3/library/stdtypes.html#str) on the result,
`!r` calls [`repr()`](https://docs.python.org/3/library/functions.html#repr),
and `!a` calls [`ascii()`](https://docs.python.org/3/library/functions.html#ascii).

The result is then formatted using the [`format()`](https://docs.python.org/3/library/functions.html#format) protocol.
The format specifier is passed to the [`__format__()`](https://docs.python.org/3/reference/datamodel.html#object.__format__) method of the expression or
conversion result. An empty string is passed when the format specifier is omitted. The formatted result is then included
in the final value of the whole string.

```python
width = 10
precision = 4
value = decimal.Decimal("12.34567")
f"result: {value:{width}.{precision}}"  # nested fields
```

:::note
🔧 _Changed in version 3.12:_ Prior to Python 3.12, reuse of the same quoting type of the outer f-string inside a replacement field was not possible.
:::

Backslashes are also allowed in replacement fields and are evaluated the same way as in any other context:

```python
a = ["a", "b", "c"]
print(f"List a contains:\n{"\n".join(a)}")
```

:::note
🔧 _Changed in version 3.12:_ Prior to Python 3.12, backslashes were not permitted inside an f-string replacement field.
:::

## Configuration 🔧

I love the way we can configure Golang applications **WITH TYPES**, but this library is in Python, and seems nice to me for doing the same in Python.

- [@dynaconf/dynaconf](https://github.com/dynaconf/dynaconf)
- [@pydantic/pydantic-settings](https://github.com/pydantic/pydantic-settings)

## HTTP Frameworks 🌐

Sometimes I don't want to set up the giant Django so, I have these options.
Sanic and FastAPI both are asynchronous and says they have good performance.

### Sanic

**Simple and lightweight**: Intuitive API with smart defaults and no bloat allows you to get straight to work building your app.
**Unopinionated and flexible**: Build the way you want to build without letting your tooling constrain you.
**Performant and scalable**: Built from the ground up with speed and scalability as a main concern. It is ready to power web applications big and small.
**Production ready**: Out of the box, it comes bundled with a web server ready to power your web applications.
**Trusted by millions**: Sanic is one of the overall most popular frameworks on PyPI, and the top async enabled framework
**Community driven**: The project is maintained and run by the community for the community.

- After installing, Sanic has all the tools you need for a scalable, production-grade server—out of the box!
- Running Sanic with TLS enabled is as simple as passing it the file paths…
- Up and running with websockets in no time using the [websockets](https://websockets.readthedocs.io/) package.
- Serving static files is of course intuitive and easy. Just name an endpoint and either a file or directory that should be served.
- Beginning or ending a route with functionality is as simple as adding a decorator.
- Raising errors will intuitively result in proper HTTP errors:
- Check in on your live, running applications (whether local or remote).
- In addition to the tools that Sanic comes with, the officially supported [Sanic Extensions](https://sanic.dev/en/plugins/sanic-ext/getting-started.html) provides lots of extra goodies to make development easier.
  - **CORS** protection
  - Template rendering with **Jinja**
  - **Dependency injection** into route handlers
  - OpenAPI documentation with **Redoc** and/or **Swagger**
  - Predefined, endpoint-specific response **serializers**
  - Request query arguments and body input **validation**
  - **Auto create** HEAD, OPTIONS, and TRACE endpoints
  - Live **health monitor**

[Sanic User Guide - The lightning-fast asynchronous Python web framework](https://sanic.dev/en/)

Dependency injection is a method to add arguments to a route handler based upon the defined function signature. Specifically,
it looks at the **type annotations** of the arguments in the handler. This can be useful in a number of cases like:

[Sanic User Guide - Sanic Extensions - Dependency Injection](https://sanic.dev/en/plugins/sanic-ext/injection.html#getting-started)

### Flask

[Welcome to Flask — Flask Documentation (3.0.x)](https://flask.palletsprojects.com/en/3.0.x/)

### FastAPI

[FastAPI](https://fastapi.tiangolo.com/)

## HTTP Client 🌐

- <https://github.com/psf/requests>
- <https://github.com/encode/httpx>

## Django 🦖

The Django documentation which is the best source for learning and reading about it.

[Django](https://docs.djangoproject.com/en)

Django has built-in support for GIS data. You can find more about it here (for Django 4.1):

[Django](https://docs.djangoproject.com/en/5.0/ref/contrib/gis/)

Writing REST API in a Django application using Django REST Framework is awesome, following links are the important concepts of the DRF (Django REST Framework):

[Home - Django REST framework](https://www.django-rest-framework.org/)

- [serializers](https://www.django-rest-framework.org/api-guide/serializers/)
- [fields](https://www.django-rest-framework.org/api-guide/fields)
- [parsers](https://www.django-rest-framework.org/api-guide/parsers/)
- [views](https://www.django-rest-framework.org/api-guide/views/)
- [viewsets](https://www.django-rest-framework.org/api-guide/viewsets/)
- [generic-views](https://www.django-rest-framework.org/api-guide/generic-views/)
- [filtering](https://www.django-rest-framework.org/api-guide/filtering/)

Sometimes it is better in DRF to read its code because its documentation is not complete:

- [@encode/django-rest-framework](https://github.com/encode/django-rest-framework)

Semi-automatic swagger documentation for the REST APIs:

- [@tfranzel/drf-spectacula](https://github.com/tfranzel/drf-spectacular)

### Datalcasses

Using data-classes to define request and response in Django REST Framework. There are cases in which your request or
response is not a model, in those cases you can define them as a dataclass using the following library.

- [@oxan/djangorestframework-dataclasses](https://github.com/oxan/djangorestframework-dataclasses)

Using the library instead of 😔:

```python
class Comment:
    def __init__(self, email, content, created=None):
        self.email = email
        self.content = content
        self.created = created or datetime.now()

class CommentSerializer(serializers.Serializer):
    email = serializers.EmailField()
    content = serializers.CharField(max_length=200)
    created = serializers.DateTimeField()
```

you can write 😍:

```python
@dataclass
class Person:
    name: str
    email: str
    alive: bool
    gender: typing.Literal['male', 'female']
    birth_date: typing.Optional[datetime.date]
    phone: typing.List[str]
    movie_ratings: typing.Dict[str, int]

class PersonSerializer(DataclassSerializer):
    class Meta:
        dataclass = Person
```

### Django Filters

Having reusable filters for models in Django REST Framework with Django-filter. These filters help you to write
viewsets easier and give client developers vast choices in getting the data.

- [Django filter documentation](https://django-filter.readthedocs.io/en/main/)

### `inspectdb`

There are cases in which you already have the database and want to describe it using Django models:

```bash
python manage.py inspectdb
```

## Tests

In python, you need a library for testing:

[pytest: helps you write better programs — pytest documentation](https://docs.pytest.org/en/stable/index.html)

But in Django you don't need anything and Django already has what you need.

## Standard CLI 💾

[Welcome to Click — Click Documentation (8.1.x)](https://click.palletsprojects.com/)

### [Typer](https://typer.tiangolo.com/)

> Typer, build great CLIs. Easy to code. Based on Python type hints.

Create a `typer.Typer()` app, and create two sub commands with their parameters

```python
import typer

app = typer.Typer()


@app.command()
def hello(name: str):
    print(f"Hello {name}")


@app.command()
def goodbye(name: str, formal: bool = False):
    if formal:
        print(f"Goodbye Ms. {name}. Have a good day.")
    else:
        print(f"Bye {name}!")


if __name__ == "__main__":
    app()
```

```console
python main.py --help

 Usage: main.py [OPTIONS] COMMAND [ARGS]...

╭─ Options ─────────────────────────────────────────╮
│ --install-completion          Install completion  │
│                               for the current     │
│                               shell.              │
│ --show-completion             Show completion for │
│                               the current shell,  │
│                               to copy it or       │
│                               customize the       │
│                               installation.       │
│ --help                        Show this message   │
│                               and exit.           │
╰───────────────────────────────────────────────────╯
╭─ Commands ────────────────────────────────────────╮
│ goodbye                                           │
│ hello                                             │
╰───────────────────────────────────────────────────╯
```

```console
python main.py hello --help

 Usage: main.py hello [OPTIONS] NAME

╭─ Arguments ───────────────────────────────────────╮
│ *    name      TEXT  [default: None] [required]   │
╰───────────────────────────────────────────────────╯
╭─ Options ─────────────────────────────────────────╮
│ --help          Show this message and exit.       │
╰───────────────────────────────────────────────────╯
```

## Console UIs 💅

[@Textualize/rich](https://github.com/Textualize/rich)

[@sepandhaghighi/art](https://github.com/sepandhaghighi/art)

## Pandas 🐼

The best way for working with data, doing math and statistics over it, etc. is using Pandas:

[API reference — pandas documentation](https://pandas.pydata.org/docs/reference/index.html)

Using it for reading/writing CSV is a better way than any other console application because you can actually do the query things after the reading phase.

## GIS

- [https://shapely.readthedocs.io/en/stable/](https://shapely.readthedocs.io/en/stable/)
- [https://geopandas.org/en/stable/](https://geopandas.org/en/stable/)

## Typing

The function below takes and returns a string and is annotated as follows:

```python
def greeting(name: str) -> str:
    return 'Hello ' + name
```

In the function `greeting`, the argument `name` is expected to be of type [`str`](https://docs.python.org/3/library/stdtypes.html#str)
and the return type [`str`](https://docs.python.org/3/library/stdtypes.html#str). Subtypes are accepted as arguments.

### Type aliases

A type alias is defined using the [`type`](https://docs.python.org/3/reference/simple_stmts.html#type) statement,
which creates an instance of [`TypeAliasType`](https://docs.python.org/3/library/typing.html#typing.TypeAliasType).
In this example, `Vector` and `list[float]` will be treated equivalently by static type checkers:

```python
type Vector = list[float]

def scale(scalar: float, vector: Vector) -> Vector:
    return [scalar * num for num in vector]

# passes type checking; a list of floats qualifies as a Vector.
new_vector = scale(2.0, [1.0, -4.2, 5.4])
```

Type aliases are useful for simplifying complex type signatures.

### Annotating callable objects

Functions - or other [callable](https://docs.python.org/3/glossary.html#term-callable) objects - can be annotated using
[`collections.abc.Callable`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Callable) or
[`typing.Callable`](https://docs.python.org/3/library/typing.html#typing.Callable).
`Callable[[int], str]` signifies a function that takes a single parameter of type [`int`](https://docs.python.org/3/library/functions.html#int)
and returns a [`str`](https://docs.python.org/3/library/stdtypes.html#str).

```python
from collections.abc import Callable, Awaitable

def feeder(get_next_item: Callable[[], str]) -> None:
    ...  # Body

def async_query(on_success: Callable[[int], None],
                on_error: Callable[[int, Exception], None]) -> None:
    ...  # Body

async def on_update(value: str) -> None:
    ...  # Body

callback: Callable[[str], Awaitable[None]] = on_update
```

The subscription syntax must always be used with exactly two values: the argument list and the return type.
The argument list must be a list of types, a [`ParamSpec`](https://docs.python.org/3/library/typing.html#typing.ParamSpec),
[`Concatenate`](https://docs.python.org/3/library/typing.html#typing.Concatenate), or an ellipsis.
The return type must be a single type.

If a literal ellipsis `...` is given as the argument list, it indicates that a callable with any arbitrary parameter list would be acceptable:

```python
def concat(x: str, y: str) -> str:
return x + y

x: Callable[..., str]
x = str# OKx = concat# Also OK
```

:::note
⚠️ `Callable` cannot express complex signatures such as functions that take a variadic number of arguments,
[overloaded functions](https://docs.python.org/3/library/typing.html#overload), or functions that have keyword-only parameters.
However, these signatures can be expressed by defining a [`Protocol`](https://docs.python.org/3/library/typing.html#typing.Protocol)
class with a [`__call__()`](https://docs.python.org/3/reference/datamodel.html#object.__call__) method.
:::

```python
from collections.abc import Iterable
from typing import Protocol

class Combiner(Protocol):
    def __call__(self, *vals: bytes, maxlen: int | None = None) -> list[bytes]: ...

def batch_proc(data: Iterable[bytes], cb_results: Combiner) -> bytes:
    for item in data:
        ...

def good_cb(*vals: bytes, maxlen: int | None = None) -> list[bytes]:
    ...
def bad_cb(*vals: bytes, maxitems: int | None) -> list[bytes]:
    ...

batch_proc([], good_cb)  # OK
batch_proc([], bad_cb)   # Error! Argument 2 has incompatible type because of
                         # different name and kind in the callback
```

### Generics

Since type information about objects kept in containers cannot be statically inferred in a generic way, many container classes in the standard library support subscription to denote the expected types of container elements.

```python
from collections.abc import Mapping, Sequence

class Employee: ...

# Sequence[Employee] indicates that all elements in the sequence
# must be instances of "Employee".
# Mapping[str, str] indicates that all keys and all values in the mapping
# must be strings.
def notify_by_email(employees: Sequence[Employee],
                    overrides: Mapping[str, str]) -> None: ...
```

Generic functions and classes can be parameterized by using [type parameter syntax](https://docs.python.org/3/reference/compound_stmts.html#type-params):

```python
from collections.abc import Sequence

def first[T](l: Sequence[T]) -> T:  # Function is generic over the TypeVar "T"
    return l[0]
```

:::note
⚠️ _Changed in version 3.12:_ Syntactic support for generics is new in Python 3.12.
:::

For most containers in Python, the typing system assumes that all elements in the container will be of the same type.
[`list`](https://docs.python.org/3/library/stdtypes.html#list) only accepts one type argument.
[`Mapping`](https://docs.python.org/3/library/collections.abc.html#collections.abc.Mapping) only accepts two type arguments:
the first indicates the type of the keys, and the second indicates the type of the values.

```python
from collections.abc import Mapping

# Type checker will infer that all elements in ``x`` are meant to be ints
x: list[int] = []

# Type checker error: ``list`` only accepts a single type argument:
y: list[int, str] = [1, 'foo']

# Type checker will infer that all keys in ``z`` are meant to be strings,
# and that all values in ``z`` are meant to be either strings or ints
z: Mapping[str, str | int] = {}
```

Unlike most other Python containers, however, it is common in idiomatic Python code for tuples to have elements which are not all of the same type.
For this reason, tuples are special-cased in Python's typing system. [`tuple`](https://docs.python.org/3/library/stdtypes.html#tuple)
accepts _any number_ of type arguments:

```python
# OK: ``x`` is assigned to a tuple of length 1 where the sole element is an int
x: tuple[int] = (5,)

# OK: ``y`` is assigned to a tuple of length 2;
# element 1 is an int, element 2 is a str
y: tuple[int, str] = (5, "foo")

# Error: the type annotation indicates a tuple of length 1,
# but ``z`` has been assigned to a tuple of length 3
z: tuple[int] = (1, 2, 3)
```

To denote a tuple which could be of _any_ length, and in which all elements are of the same type `T`, use `tuple[T, ...]`. To denote an empty tuple, use `tuple[()]`. Using plain `tuple` as an annotation is equivalent to using `tuple[Any, ...]` .

### **The type of class objects**

A variable annotated with `C` may accept a value of type `C`. In contrast, a variable annotated with `type[C]` (or [`typing.Type[C]`](https://docs.python.org/3/library/typing.html#typing.Type)) may accept values that are classes themselves - specifically, it will accept the _class object_ of `C`.

```python
a = 3         # Has type ``int``
b = int       # Has type ``type[int]``
c = type(a)   # Also has type ``type[int]``
```

Note that `type[C]` is covariant:

:::note
🧠 _Covariance and contravariance are terms that refer to the ability to use a more derived type (more specific) or a less derived type (less specific) than originally specified_
:::

```python
class User: ...
class ProUser(User): ...
class TeamUser(User): ...

def make_new_user(user_class: type[User]) -> User:
    # ...
    return user_class()

make_new_user(User)      # OK
make_new_user(ProUser)   # Also OK: ``type[ProUser]`` is a subtype of ``type[User]``
make_new_user(TeamUser)  # Still fine
make_new_user(User())    # Error: expected ``type[User]`` but got ``User``
make_new_user(int)       # Error: ``type[int]`` is not a subtype of ``type[User]``
```

The only legal parameters for [`type`](https://docs.python.org/3/library/functions.html#type) are classes,
[`Any`](https://docs.python.org/3/library/typing.html#typing.Any),
[type variables](https://docs.python.org/3/library/typing.html#generics), and unions of any of these types.

### Packages

We love types even in python 💘

[https://github.com/typeddjango/djangorestframework-stubs](https://github.com/typeddjango/djangorestframework-stubs)

[https://github.com/typeddjango/django-stubs](https://github.com/typeddjango/django-stubs)

[https://github.com/typeddjango/awesome-python-typing](https://github.com/typeddjango/awesome-python-typing)

[Typing (numpy.typing) — NumPy v1.26 Manual](https://numpy.org/doc/stable/reference/typing.html)

## Images

In python, you can even manipulate images.

- [https://pillow.readthedocs.io/en/stable/index.html](https://pillow.readthedocs.io/en/stable/index.html)

## [Pydantic](https://docs.pydantic.dev/latest/)

[Welcome to Pydantic - Pydantic](https://docs.pydantic.dev/latest/)

One of the primary ways of defining schema in Pydantic is via models.
Models are simply classes which inherit from
[`pydantic.BaseModel`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel)
and define fields as annotated attributes.

You can think of models as similar to structs in languages like C, or
as the requirements of a single endpoint in an API.

Models share many similarities with Python's `dataclasses`,
but have been designed with some subtle-yet-important differences that streamline
certain workflows related to **validation**, **serialization**, and **JSON schema generation**.

Untrusted data can be passed to a model and, after parsing and validation,
Pydantic guarantees that the fields of the resultant model instance
will conform to the field types defined on the model.

Beyond accessing model attributes directly via their field names
(e.g. `model.foobar`), models can be _converted_, _dumped_, _serialized_,
and _exported_ in a number of ways.

The [`Field`](https://docs.pydantic.dev/latest/api/fields/#pydantic.fields.Field)
function is used to customize and add metadata to fields of models.

### Examples

```python
class Comparable(pydantic.BaseModel):
    """
    ...
    It only handles deserialization from the
    API response.
    """

    class Config:
        use_enum_values = True

    @pydantic.field_validator("sold_date", mode="before")
    @classmethod
    def sold_date_from_rfc1123(cls, v: str):
        """
        sold date is in rfc1123, date-only, etc. formats and pydantic cannot parse
        it.
        """
        for fmt in [
            "%a, %d %b %Y %H:%M:%S GMT",
            "%Y-%m-%d",
        ]:
            try:
                return datetime.datetime.strptime(v, fmt).date()
            except ValueError:
                continue
        raise ValueError(f"unexpected date format for 'sold_date' {v}")

    address: str = pydantic.Field(validation_alias="Address")
    unit_number: int | typing.Literal["NA"] = pydantic.Field(validation_alias="AptUnit")
    sold_date: datetime.date = pydantic.Field(validation_alias="SoldDate")
    sold_price: float = pydantic.Field(validation_alias="SoldPrice")
```

## Asynchronous

### **Asynchronous I/O**

[asyncio — Asynchronous I/O](https://docs.python.org/3/library/asyncio.html)

Asyncio is used as a foundation for multiple Python asynchronous frameworks that provide high-performance
network and web-servers, database connection libraries, distributed task queues, etc.

#### Running an asyncio Program

Runners are built on top of an [event loop](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio-event-loop)
with the aim to simplify async code usage for common wide-spread scenarios.

```python
asyncio.run(coro, *, debug=None, loop_factory=None)
```

This function runs the passed coroutine, taking care of _managing the asyncio event loop_,
_finalizing asynchronous generators_, and _closing the executor_.

:::note
This function cannot be called when another asyncio event loop is running in the same thread.
:::

If _debug_ is `True`, the event loop will be run in debug mode.
`False` disables debug mode explicitly.
`None` is used to respect the global
[Debug Mode](https://docs.python.org/3/library/asyncio-dev.html#asyncio-debug-mode) settings.

If _loop_factory_ is not `None`, it is used to create a new event loop;
otherwise [`asyncio.new_event_loop()`](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio.new_event_loop)
is used.
The loop is closed at the end. This function should be used as a main entry point for asyncio programs,
and should ideally only be called once.
It is recommended to use _loop_factory_ to configure the event loop instead of policies.

```python
async def main():
    await asyncio.sleep(1)
    print('hello')

asyncio.run(main())
```

#### Runner context manager

```python
class asyncio.Runner(*, debug=None, loop_factory=None)
```

A context manager that simplifies _multiple_ async function calls in the same context.

Sometimes several top-level async functions should be called in the same
[event loop](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio-event-loop)
and [`contextvars.Context`](https://docs.python.org/3/library/contextvars.html#contextvars.Context).

If `debug` is `True`, the event loop will be run in debug mode.
`False` disables debug mode explicitly.
`None` is used to respect the global [Debug Mode](https://docs.python.org/3/library/asyncio-dev.html#asyncio-debug-mode) settings.

`loop_factory` could be used for overriding the loop creation.
It is the responsibility of the `loop_factory` to set the created loop as the current one.
By default, [`asyncio.new_event_loop()`](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio.new_event_loop)
is used and set as current event loop with [`asyncio.set_event_loop()`](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio.set_event_loop)
if `loop_factory` is `None`.

Basically, [`asyncio.run()`](https://docs.python.org/3/library/asyncio-runner.html#asyncio.run)
example can be rewritten with the runner usage:

```python
async def main():
    await asyncio.sleep(1)
    print('hello')

with asyncio.Runner() as runner:
    runner.run(main())
```

```python
run(coro, *, context=None)
```

Run a [coroutine](https://docs.python.org/3/glossary.html#term-coroutine) `coro` in the embedded loop.
Return the coroutine's result or raise its
exception. An optional keyword-only _context_ argument allows specifying a custom
[`contextvars.Context`](https://docs.python.org/3/library/contextvars.html#contextvars.Context)
for the `coro` to run in. The runner's default context is used if `None`.
This function cannot be called when another asyncio event loop is running in the same thread.

```python
close()
```

Close the runner. Finalize asynchronous generators, shutdown default executor,
close the event loop and release embedded [`contextvars.Context`](https://docs.python.org/3/library/contextvars.html#contextvars.Context).

```python
get_loop()
```

Return the event loop associated with the runner instance.

#### Coroutines

[Coroutines](https://docs.python.org/3/glossary.html#term-coroutine)
declared with the async/await syntax is the preferred way of writing asyncio applications.
To actually run a coroutine, asyncio provides the following mechanisms:

- The [`asyncio.run()`](https://docs.python.org/3/library/asyncio-runner.html#asyncio.run) function to run the top-level entry point "main()" function.
- Awaiting on a coroutine. The following snippet of code will print "hello" after waiting for 1 second, and then print "world" after waiting for _another_ 2 seconds:

  ```python
  import asyncio
  import time

  async def say_after(delay, what):
      await asyncio.sleep(delay)
      print(what)

  async def main():
      print(f"started at {time.strftime('%X')}")

      await say_after(1, 'hello')
      await say_after(2, 'world')

      print(f"finished at {time.strftime('%X')}")

  asyncio.run(main())
  ```

- The [`asyncio.create_task()`](https://docs.python.org/3/library/asyncio-task.html#asyncio.create_task)
  function to run coroutines concurrently as asyncio [`Tasks`](https://docs.python.org/3/library/asyncio-task.html#asyncio.Task).

  ```python
  async def main():
      task1 = asyncio.create_task(
          say_after(1, 'hello'))

      task2 = asyncio.create_task(
          say_after(2, 'world'))

      print(f"started at {time.strftime('%X')}")

      # Wait until both tasks are completed (should take
      # around 2 seconds.)
      # They ran with create_task and here we only wait
      # for their results.
      await task1
      await task2

      print(f"finished at {time.strftime('%X')}")
  ```

  The [`asyncio.TaskGroup`](https://docs.python.org/3/library/asyncio-task.html#asyncio.TaskGroup) class provides a more modern alternative to
  [`create_task()`](https://docs.python.org/3/library/asyncio-task.html#asyncio.create_task). Using this API, the last example becomes:

  ```python
  async def main():
      async with asyncio.TaskGroup() as tg:
          task1 = tg.create_task(
              say_after(1, 'hello'))

          task2 = tg.create_task(
              say_after(2, 'world'))

          print(f"started at {time.strftime('%X')}")

      # The await is implicit when the context manager exits.

      print(f"finished at {time.strftime('%X')}")
  ```

#### Awaitables

We say that an object is an **awaitable** object if it can be used in
an [`await`](https://docs.python.org/3/reference/expressions.html#await) expression.
Many asyncio APIs are designed to accept awaitables.

There are three main types of _awaitable_ objects:

- **coroutines**
- **Tasks**
- **Futures**

:::note
⚠️ A _coroutine function_: an [`async def`](https://docs.python.org/3/reference/compound_stmts.html#async-def) function.
A _coroutine object_: an object returned by calling a _coroutine function_.
:::

:::note
🔥 _Tasks_ are used to schedule coroutines _concurrently_.
:::

#### [Running Tasks Concurrently](https://docs.python.org/3/library/asyncio-task.html#id8)

```python
awaitable asyncio.gather(*aws, return_exceptions=False)
```

:::note
🚧 A new alternative to create and run tasks concurrently and wait for their completion is
[`asyncio.TaskGroup`](https://docs.python.org/3/library/asyncio-task.html#asyncio.TaskGroup)`.
_TaskGroup_ provides stronger safety guarantees than _gather_ for scheduling a nesting of subtasks:
if a task (or a subtask, a task scheduled by a task) raises an exception,
_TaskGroup_ will, while _gather_ will not, cancel the remaining scheduled tasks.
:::

#### [Task Groups](https://docs.python.org/3/library/asyncio-task.html#task-groups)

**Task groups** combine a task creation API with a convenient and reliable way
to wait for all tasks in the group to finish.

#### [Eager Task Factory](https://docs.python.org/3/library/asyncio-task.html#eager-task-factory)

A task factory for eager task execution.

When using this factory (via `loop.set_task_factory(asyncio.eager_task_factory)`),
coroutines begin execution synchronously during Task construction.
Tasks are **only scheduled on the event loop if they block**.
This can be a performance improvement as the overhead of
loop scheduling is avoided for coroutines that complete synchronously.

A common example where this is beneficial is coroutines which employ **caching** or **memoization**
to _avoid actual I/O_ when possible.

:::note
🐼 Immediate execution of the coroutine is a **semantic change**.
If the coroutine returns or raises, the task is never scheduled to the event loop.
If the coroutine execution blocks, the task is scheduled to the event loop.
This change may introduce behavior changes to existing applications.
For example, the application's task execution order is likely to change.
:::

### AIOfiles

**aiofiles** is an Apache2 licensed library,
written in Python, for handling local disk files in asyncio applications.

[@Tinche/aiofiles](https://github.com/Tinche/aiofiles)

### HTTPX

[HTTPX](https://www.python-httpx.org/)

HTTPX is a fully featured HTTP client for Python 3, which provides sync and async APIs, and support for both HTTP/1.1 and HTTP/2.

### **AIOHTTP**

[Welcome to AIOHTTP — aiohttp documentation](https://docs.aiohttp.org/en/stable/)

#### Key features

- Supports both [Client](https://docs.aiohttp.org/en/stable/client.html#aiohttp-client) and [HTTP Server](https://docs.aiohttp.org/en/stable/web.html#aiohttp-web).
- Supports both [Server WebSockets](https://docs.aiohttp.org/en/stable/web_quickstart.html#aiohttp-web-websockets) and [Client WebSockets](https://docs.aiohttp.org/en/stable/client_quickstart.html#aiohttp-client-websockets) out-of-the-box without the Callback Hell.
- Web-server has [Middlewares](https://docs.aiohttp.org/en/stable/web_advanced.html#aiohttp-web-middlewares), [Signals](https://docs.aiohttp.org/en/stable/web_advanced.html#aiohttp-web-signals) and plug-able routing.

```python
import aiohttp
import asyncio

async def main():
    async with aiohttp.ClientSession() as session:
        async with session.get('http://python.org') as response:
            print("Status:", response.status)
            print("Content-type:", response.headers['content-type'])
            html = await response.text()
            print("Body:", html[:15], "...")

asyncio.run(main())
```

Now, we have a [`ClientSession`](https://docs.aiohttp.org/en/stable/client_reference.html#aiohttp.ClientSession)
called `session` and a [`ClientResponse`](https://docs.aiohttp.org/en/stable/client_reference.html#aiohttp.ClientResponse)
object called `resp`. We can get all the information we need from the response. The mandatory parameter of
[`ClientSession.get()`](https://docs.aiohttp.org/en/stable/client_reference.html#aiohttp.ClientSession.get)
coroutine is an HTTP _url_ ([`str`](https://docs.python.org/3/library/stdtypes.html#str) or class:yarl.URL instance).

:::note
💡 **Don't create a session per request**. Most likely you need a session per application which performs all requests together.

More complex cases may require a session per site, e.g. one for Github and other one for Facebook APIs. Anyway making a session for every request is a **very bad** idea.

A session contains a connection pool inside. Connection reuse and keep-alive (both are on by default) may speed up total performance.
:::

A session context manager usage is not mandatory but `await session.close()` method should be called in this case.

#### Streaming Response Content

While methods [`read()`](https://docs.aiohttp.org/en/stable/client_reference.html#aiohttp.ClientResponse.read),
[`json()`](https://docs.aiohttp.org/en/stable/client_reference.html#aiohttp.ClientResponse.json)
and [`text()`](https://docs.aiohttp.org/en/stable/client_reference.html#aiohttp.ClientResponse.text)
are very convenient you should use them carefully. All these methods load the whole response in memory.
For example if you want to download several gigabyte sized files, these methods will load all the data in memory.
Instead you can use the [`content`](https://docs.aiohttp.org/en/stable/client_reference.html#aiohttp.ClientResponse.content) attribute.
It is an instance of the [`aiohttp.StreamReader`](https://docs.aiohttp.org/en/stable/streams.html#aiohttp.StreamReader) class.
The `gzip` and `deflate` transfer-encodings are automatically decoded for you:

```python
async with session.get('https://api.github.com/events') as resp:
    await resp.content.read(10)
```

In general, however, you should use a pattern like this to save what is being streamed to a file:

```python
with open(filename, *'wb'*) as fd:
    async for chunk in resp.content.iter_chunked(chunk_size):
        fd.write(chunk)
```

It is not possible to use [`read()`](https://docs.aiohttp.org/en/stable/client_reference.html#aiohttp.ClientResponse.read),
[`json()`](https://docs.aiohttp.org/en/stable/client_reference.html#aiohttp.ClientResponse.json)
and [`text()`](https://docs.aiohttp.org/en/stable/client_reference.html#aiohttp.ClientResponse.text)
after explicit reading from [`content`](https://docs.aiohttp.org/en/stable/client_reference.html#aiohttp.ClientResponse.content).
