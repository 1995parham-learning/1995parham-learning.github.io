---
repo: https://github.com/1995parham-teaching/students-fall-2022
---
> [!quote]
> GraphQL ~~in Golang~~. Does it make sense?
>
> For a new project I'd go with old boring REST unless there's good reason not to. So I'd first try to answer that question.

GraphQL simplifies data communication between frontend and backend teams. Frontend developers can use GraphQL queries to request precisely the data they need, eliminating the need for creating and maintaining numerous REST endpoints. This unified API approach streamlines development and reduces the amount of data transferred, as clients only request what they need. Furthermore, GraphQL's schema provides a clear contract between the frontend and backend, improving communication and reducing the risk of integration issues. However, it's important to consider the learning curve associated with GraphQL and the potential for increased complexity in certain scenarios, such as handling file uploads or complex data relationships.

- [@99designs/gqlgen](https://github.com/99designs/gqlgen)

`gqlgen` can either automatically generate models based on your GraphQL schema or leverage your existing models.
When using your own models, `gqlgen` will automatically generate field resolvers to populate fields defined in the schema, but not defined in your model.

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
