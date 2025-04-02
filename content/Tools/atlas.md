> Manage your database schema as code

## Introduction

Atlas is a language-independent tool for managing and migrating database schemas using modern DevOps principles. It offers two workflows:

- **Declarative**: Similar to Terraform, Atlas compares the current state of the database to the desired state, as defined in an HCL, SQL, or ORM schema. Based on this comparison, it generates and executes a migration plan to transition the database to its desired state.
- **Versioned**: Unlike other tools, Atlas automatically plans schema migrations for you. Users can describe their desired database schema in HCL, SQL, or their chosen ORM, and by utilizing Atlas, they can plan, lint, and apply the necessary migrations to the database.

## Projects

I’ve used Atlas in the following hobby projects:

- [@1995parham-teaching/tinyurl](https://github.com/1995parham-teaching/tinyurl)
- [@1995parham-teaching/gorm-sample](https://github.com/1995parham-teaching/gorm-sample)

## References

- [https://atlasgo.io/guides](https://atlasgo.io/guides)
- [https://atlasgo.io/getting-started/](https://atlasgo.io/getting-started/)
