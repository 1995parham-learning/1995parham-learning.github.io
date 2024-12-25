## Models

Use `OuterRef` when a queryset in a `Subquery` needs to refer to a field from the outer query or its transform. It acts like an `F` expression except that the check to see if it refers to a valid field isn’t made until the outer queryset is resolved.
