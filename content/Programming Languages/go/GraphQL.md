---
repo: https://github.com/1995parham-learning/rust101
---
GraphQL is an awesome way to communicate data with the frontend team. Using GraphQL you can ask the frontend team to write queries for accessing the backend data and because of that there is no need to design different APIs for different requests. You have one API to rule them all.

-   [@99designs/gqlgen](https://github.com/99designs/gqlgen)
-   [@1995parham-teaching/students-fall-2022]()

`gqlgen` can either automatically generate models based on your GraphQL schema or leverage your existing models.
When using your own models, `gqlgen` will automatically generate field resolvers to populate fields defined in the
schema, but not defined in your model.

`gqlgen.yml`:

```yaml
models:
    Student:
        model:
            - github.com/1995parham-teaching/students/internal/model.Student
    Course:
        model:
            - github.com/1995parham-teaching/students/internal/model.Course
```

`model.go`:

```go
package model

type Student struct {
	Name    string   `json:"name"`
	ID      string   `json:"id"`
	Courses []Course `json:"courses"`
}

type Course struct {
	Name string
	ID   string
}
```

`schema.graphql`:

```graphql
type Student {
    id: String!
    name: String!
    courses: [Course!]

    enterance: Int
}
```

`resolver.go`:

```go
// Enterance is the resolver for the enterance field.
func (r *studentResolver) Enterance(ctx context.Context, obj *model.Student) (*int, error) {
	enterance := 1401
	return &enterance, nil
}

// Student returns graph.StudentResolver implementation.
func (r *Resolver) Student() graph.StudentResolver { return &studentResolver{r} }
```