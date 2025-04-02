> Manage your database schema as code

## Introduction

Atlas is a language-independent tool for managing and migrating database schemas using modern DevOps principles. It offers two workflows:

- **Declarative**: Similar to Terraform, Atlas compares the current state of the database to the desired state, as defined in an HCL, SQL, or ORM schema. Based on this comparison, it generates and executes a migration plan to transition the database to its desired state.
- **Versioned**: Unlike other tools, Atlas automatically plans schema migrations for you. Users can describe their desired database schema in HCL, SQL, or their chosen ORM, and by utilizing Atlas, they can plan, lint, and apply the necessary migrations to the database.

## What is Atlas?

Atlas is an open-source database schema management tool. It helps you manage and evolve your database schema using a declarative approach (defining the _desired state_) or a versioned migration approach (defining changes step-by-step). It can inspect your current database, compare it to your desired state, and automatically generate/apply the necessary SQL migrations.

## Why use Atlas?

- **Declarative Schema:** Define what your schema _should_ look like, and let Atlas figure out how to get there.
- **Automatic Migration Planning:** Reduces manual SQL writing for schema changes.
- **Safety:** Atlas can analyze migrations for potential data loss or dangerous changes.
- **Integration:** Works well with Go, including specific providers like the one for GORM.
- **Version Control Friendly:** Schema definitions (HCL/SQL) and migration files are plain text, perfect for Git.

## Projects

I’ve used Atlas in the following hobby projects:

- [@1995parham-teaching/tinyurl](https://github.com/1995parham-teaching/tinyurl)
- [@1995parham-teaching/gorm-sample](https://github.com/1995parham-teaching/gorm-sample)

## References

- [https://atlasgo.io/guides](https://atlasgo.io/guides)
- [https://atlasgo.io/getting-started/](https://atlasgo.io/getting-started/)

## Tutorial

A tutorial for using Atlas, the database schema management tool, in a Go project. We'll cover two main scenarios:

1. **Using Atlas with plain SQL or HCL:** Managing your schema directly using Atlas's HCL format or standard SQL files.
2. **Using Atlas with GORM:** Leveraging the `atlas-provider-gorm` to generate the desired schema state directly from your GORM models.

### Prerequisites

1. **Go:** Installed (>= 1.18 recommended).
2. **Database:** A running database instance accessible from your machine (e.g., PostgreSQL, MySQL, SQLite). We'll use Docker for easy setup in examples.
3. **Docker (Recommended):** For easily spinning up a database.
4. **Atlas CLI:** Install the Atlas command-line tool. See installation instructions: [https://atlasgo.io/cli/getting-started/setting-up](https://atlasgo.io/cli/getting-started/setting-up)
    - macOS/Linux (Homebrew): `brew install ariga/tap/atlas`
    - Other methods available on the Atlas website.

### Let's Start a Sample Project

```bash
mkdir go-atlas-tutorial
cd go-atlas-tutorial
go mod init github.com/yourusername/go-atlas-tutorial # Replace with your path
# Create a placeholder main file (not strictly needed for Atlas setup, but good practice)
echo "package main\n\nfunc main() {}" > main.go
```

### Spin up a Database (using Docker & PostgreSQL)

```bash
# Run Postgres 15 in Docker, name it 'atlas-db', set password 'password'
# It will be accessible on localhost:5432
docker run --rm --name atlas-db -p 5432:5432 -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mydb -d postgres:15

# You might need to wait a few seconds for the DB to initialize
```

We'll use this database URL for Atlas: `postgres://postgres:password@localhost:5432/mydb?sslmode=disable`

### Scenario 1: Using Atlas with HCL or SQL Files

This approach is suitable when you're not using an ORM like GORM, or you prefer to define your schema explicitly in Atlas's HCL format or standard SQL.

**1. Define Your Desired Schema (HCL)**

Create a file named `schema.hcl`:

```hcl
# schema.hcl

# Define the 'users' table
table "users" {
  schema = schema.public # Specify the schema (e.g., public for PostgreSQL)
  column "id" {
    type = bigint # Use bigint for primary keys (good practice)
    identity {     # Define auto-incrementing behavior
      generated = "BY DEFAULT"
    }
  }
  column "name" {
    type = varchar(100)
    null = false
  }
  column "email" {
    type = varchar(255)
    null = true # Make email nullable initially
  }
  column "created_at" {
    type = timestamp
    default = sql("CURRENT_TIMESTAMP")
  }
  primary_key {
    columns = [column.id]
  }
  index "users_email_key" { # Add a unique index for email later
     columns = [column.email]
     unique  = false # Initially not unique
  }
}

# Define the 'public' schema explicitly (required by Atlas for some DBs like Postgres)
schema "public" {
  comment = "The default schema"
}
```

**2. Apply the Schema Directly (Simpler approach)**

You can ask Atlas to compare the HCL file directly with the database and apply the changes. This is often good for initial setup or simple projects.

```bash
# Define your database URL (replace if different)
export DB_URL="postgres://postgres:password@localhost:5432/mydb?sslmode=disable"

# Preview the changes Atlas would make
atlas schema apply --url $DB_URL -f schema.hcl --dry-run

# Apply the changes for real
atlas schema apply --url $DB_URL -f schema.hcl --auto-approve
```

- `--url $DB_URL`: Specifies the database connection string.
- `-f schema.hcl`: Specifies the file containing the desired schema state.
- `--dry-run`: Shows the SQL Atlas would execute without applying it.
- `--auto-approve`: Skips the interactive confirmation prompt.

**3. Manage Schema with Migration Files (Recommended for evolving schemas)**

This is the more robust approach for ongoing development. You generate versioned SQL migration files.

- **Establish a Baseline (Optional but Recommended):** If your database already has _some_ schema, you can inspect it and save it as the _current_ state. For a _new_ database, you can skip this or generate an initial migration from your desired state.
    ```bash
    # Inspect the *current* database state and save it to an HCL file
    atlas schema inspect --url $DB_URL -o current_schema.hcl
    # For a fresh DB, this will be mostly empty.
    ```
- **Create a Migrations Directory:**
    ```bash
    mkdir migrations
    ```
- **Generate the First Migration:** Atlas compares the _current_ database state (or an empty state if the DB is new/empty) with your _desired_ state (`schema.hcl`) and generates the SQL difference.
    ```bash
    # Generate a migration file based on the difference between the DB and schema.hcl
    atlas migrate diff create_users_table \
      --dir "file://migrations" \
      --to "file://schema.hcl" \
      --dev-url "docker://postgres/15/mydb" # Use a temporary dev DB for diffing
    ```
    - `migrate diff <migration_name>`: Command to generate a migration file.
    - `--dir "file://migrations"`: Specifies the directory to store migration files.
    - `--to "file://schema.hcl"`: Defines the _desired_ state using our HCL file.
    - `--dev-url "docker://postgres/15/mydb"`: **Crucial!** Atlas needs a _temporary, clean database_ to calculate the diff accurately. It spins up a temporary Docker container (if using `docker://`), applies the _current_ state (from the `migrations` dir history or by inspecting `--url` if provided), applies the _desired_ state (`--to`), and calculates the SQL needed. This avoids modifying your actual development DB during the diff process. _Make sure Docker is running if using `docker://`._
      This will create a file like `migrations/20250401XXXXXX_create_users_table.sql`. Inspect its contents. It should contain the `CREATE TABLE` statement.
- **Apply Migrations:**
    ```bash
    # Apply pending migrations in the 'migrations' directory to your actual database
    atlas migrate apply --url $DB_URL --dir "file://migrations"
    ```
    Atlas keeps track of applied migrations in a special `atlas_schema_revisions` table it creates in your database.
- **Make a Schema Change:** Let's make the email column non-null and unique. Update `schema.hcl`:
    ```hcl
    # schema.hcl (updated part)
    table "users" {
      # ... other columns ...
      column "email" {
        type = varchar(255)
        null = false # Changed from true
      }
      # ... created_at ...
      primary_key { ... }
      index "users_email_key" {
         columns = [column.email]
         unique  = true # Changed from false
      }
    }
    # ... schema public ...
    ```
- **Generate the Next Migration:**
    ```bash
    atlas migrate diff make_email_notnull_unique \
      --dir "file://migrations" \
      --to "file://schema.hcl" \
      --dev-url "docker://postgres/15/mydb"
    ```
    This creates a new SQL file (e.g., `migrations/20250401YYYYYY_make_email_notnull_unique.sql`) containing `ALTER TABLE` statements.
- **Apply the New Migration:**
    ```bash
    atlas migrate apply --url $DB_URL --dir "file://migrations"
    ```

**Using Plain SQL for Desired State:**

Instead of HCL (`schema.hcl`), you can provide a single SQL file defining the complete desired state.

```sql
# Example: desired_schema.sql
CREATE TABLE users (
    id bigserial PRIMARY KEY,
    name varchar(100) NOT NULL,
    email varchar(255) UNIQUE NOT NULL, -- Now unique and not null
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

-- Maybe other tables...
CREATE TABLE products (
   sku text PRIMARY KEY,
   name text
);
```

```bash
# Generate diff using the SQL file as the desired state
atlas migrate diff add_products_table \
  --dir "file://migrations" \
  --to "file://desired_schema.sql" \
  --dev-url "docker://postgres/15/mydb"

# Apply migrations as usual
atlas migrate apply --url $DB_URL --dir "file://migrations"
```

### Scenario 2: Using Atlas with GORM

This approach uses your GORM model structs as the source of truth for the desired schema.

**1. Add Dependencies:**

```bash
go get gorm.io/gorm
go get gorm.io/driver/postgres # Or your specific GORM driver
go get ariga.io/atlas-provider-gorm # The Atlas GORM provider
```

**2. Define Your GORM Models:**

Create a file, e.g., `models/models.go`:

```go
package models

import (
	"time"

	"gorm.io/gorm"
)

// User represents the user model
type User struct {
	ID        uint `gorm:"primarykey"` // GORM default maps to unsigned int, primary key
	Name      string `gorm:"size:100;not null"`
	Email     *string `gorm:"size:255;uniqueIndex"` // Pointer for nullable, unique index
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"` // For soft deletes
}

// Product represents a product
type Product struct {
  SKU  string `gorm:"primarykey;size:50"`
  Name string `gorm:"size:200;not null"`
  Price uint
  UserID uint // Foreign key
  User User   // Belongs to relationship
}

// GetAllModels returns a slice of all models for Atlas provider
func GetAllModels() []interface{} {
	return []interface{}{&User{}, &Product{}}
}

```

**3. Create an Atlas Loader Program:**

Atlas needs a small Go program that uses the provider to load your GORM models and output the corresponding Atlas HCL schema. Create `scripts/atlas-loader/main.go`:

```go
//go:build ignore

// This program prints the Atlas HCL schema generated from GORM models.
// Run it with: go run ./scripts/atlas-loader/main.go

package main

import (
	"fmt"
	"io"
	"os"

	"ariga.io/atlas-provider-gorm/gormschema"
	"github.com/yourusername/go-atlas-tutorial/models" // Adjust import path
)

func main() {
	// Get all GORM models
	allModels := models.GetAllModels()

	// Define options for the schema generation (e.g., which database dialect)
	opts := []gormschema.Option{
		gormschema.WithDialect("postgres"), // Or "mysql", "sqlite", "sqlserver"
	}

	// Generate the Atlas HCL schema representation
	schemaHCL, err := gormschema.New("postgres").Load(allModels, opts...) // Match dialect
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to load gorm schema: %v\n", err)
		os.Exit(1)
	}

	// Print the generated HCL schema to standard output
	io.WriteString(os.Stdout, schemaHCL)
}
```

- **Important:** Replace `github.com/yourusername/go-atlas-tutorial/models` with your actual module path + `/models`.
- The `//go:build ignore` tag prevents this from being built with your main application.
- Make sure the dialect (`"postgres"`) matches your database and GORM driver.

**4. Configure Atlas to Use the Loader:**

Now, instead of pointing Atlas to an HCL or SQL file for the desired state, you'll point it to the _output_ of this Go program.

- **Create Migrations Directory (if not done already):**

    ```bash
    mkdir -p migrations
    ```

- **Generate Migrations using the GORM Loader:**

    ```bash
    export DB_URL="postgres://postgres:password@localhost:5432/mydb?sslmode=disable"
    export LOADER_SCRIPT="go run ./scripts/atlas-loader/main.go" # Helper variable

    # Generate the initial migration based on GORM models
    atlas migrate diff initial_gorm_schema \
      --dir "file://migrations" \
      --to "exec://$LOADER_SCRIPT" \
      --dev-url "docker://postgres/15/mydb" # Use the dev-db for diffing
    ```

    - `--to "exec://go run ./scripts/atlas-loader/main.go"`: This tells Atlas to execute the command `go run ./scripts/atlas-loader/main.go` and use its standard output (which is the generated HCL schema) as the _desired_ state.
    - `--dev-url`: Still needed for accurate diffing.
      Inspect the generated SQL migration file in `migrations/`. It should contain `CREATE TABLE` statements matching your GORM `User` and `Product` structs, including constraints, indexes, and foreign keys.

- **Apply Migrations:**
    ```bash
    atlas migrate apply --url $DB_URL --dir "file://migrations"
    ```
- **Make a Model Change:** Let's add an `IsActive` field to the `User` model in `models/models.go`:
  Go
    ```
    // models/models.go (User struct updated)
    type User struct {
    	ID        uint           `gorm:"primarykey"`
    	Name      string         `gorm:"size:100;not null"`
    	Email     *string        `gorm:"size:255;uniqueIndex"`
    	IsActive  bool           `gorm:"not null;default:true"` // Added field
    	CreatedAt time.Time
    	UpdatedAt time.Time
    	DeletedAt gorm.DeletedAt `gorm:"index"`
    }
    ```
- **Generate the Next Migration:**
    ```bash
    # Re-run the diff command, Atlas will detect the change via the loader
    atlas migrate diff add_user_isactive \
      --dir "file://migrations" \
      --to "exec://$LOADER_SCRIPT" \
      --dev-url "docker://postgres/15/mydb"
    ```
    A new migration file will be created with the `ALTER TABLE users ADD COLUMN is_active...` statement.
- **Apply the New Migration:**
    ```bash
    atlas migrate apply --url $DB_URL --dir "file://migrations"
    ```

## General Tips & Best Practices

1. **`atlas.sum` File:** Atlas creates an `atlas.sum` file in your migration directory. This contains checksums of your migration files and the desired schema at the time of `migrate diff`. **Commit this file to Git.** It ensures the integrity and reproducibility of your migration history.
2. **Environment Variables:** Avoid hardcoding database URLs directly in commands. Use environment variables (`export DB_URL=...`) or a configuration file method.
3. **Makefile/Scripts:** Use `make` or shell scripts to simplify running common Atlas commands (e.g., `make migrate-diff NAME=my_change`, `make migrate-apply`).
4. **CI/CD:** Integrate `atlas migrate lint` (to analyze migrations for safety) and `atlas migrate apply` (with appropriate safeguards) into your CI/CD pipeline.
5. **`--dev-url`:** Always use the `--dev-url` flag with `atlas migrate diff`. It's the most reliable way to generate correct migrations by comparing against a clean, temporary database instance reflecting the _current_ migration state. Using `docker://<driver>` is often the easiest way if you have Docker installed.
6. **Manual SQL:** Sometimes, Atlas might not generate the exact SQL you need (e.g., complex data migrations, specific performance tweaks). You can always manually edit the generated SQL migration files _before_ applying them, or create purely manual SQL migration files.

## Justfile

Here's a sample `Justfile` designed to make using Atlas easier in your Go project. `just` is a handy command runner, similar to `make`, but often considered simpler and more modern.

First, ensure you have `just` installed: [https://github.com/casey/just#installation](https://www.google.com/search?q=https://github.com/casey/just%23installation)

Now, create a file named `Justfile` in the root of your Go project:

```just
# Justfile for simplifying Atlas commands

# --- Configuration ---
# Set these variables according to your project setup

# Database URL for applying migrations and inspecting schema
# Recommend using an environment variable (e.g., $DATABASE_URL) or a secret manager in production/CI
# Example: export DB_URL='postgres://user:pass@host:port/dbname?sslmode=disable'
DB_URL := env_var('DATABASE_URL', 'postgres://postgres:password@localhost:5432/mydb?sslmode=disable') # Default fallback

# Dev Database URL used by Atlas for diffing and linting.
# Needs a clean database state. 'docker://' driver is convenient if Docker is installed.
# It spins up a temporary container based on the specified image.
# Example: 'docker://postgres/15/devdb' or 'mysql://root:pass@localhost:3307/test'
DEV_DB_URL := 'docker://postgres/15/atlas_dev_db'

# Directory where migration files are stored
MIGRATIONS_DIR := 'file://migrations' # 'file://' prefix is important for Atlas

# Source of the desired schema state. Choose ONE and comment out/remove others.
# Option 1: Atlas HCL file
# SCHEMA_SOURCE := 'file://schema.hcl'
# Option 2: Plain SQL file
# SCHEMA_SOURCE := 'file://schema.sql'
# Option 3: GORM Loader (adjust path to your loader script)
SCHEMA_SOURCE := 'exec://go run ./scripts/atlas-loader/main.go' # Make sure loader exists

# --- Atlas Commands ---

# Default task: Show available commands
default:
    @just --list

# Generate a new migration file comparing the current state (from migrations dir/dev db)
# with the desired state defined by SCHEMA_SOURCE.
# Usage: just diff <migration_name>
# Example: just diff create_users_table
diff +name:
    @echo "==> Generating migration diff: {{name}}..."
    atlas migrate diff {{name}} \
      --dir {{MIGRATIONS_DIR}} \
      --to {{SCHEMA_SOURCE}} \
      --dev-url {{DEV_DB_URL}}

# Apply pending migrations to the database specified by DB_URL.
apply:
    @echo "==> Applying migrations to {{DB_URL}}..."
    atlas migrate apply \
      --dir {{MIGRATIONS_DIR}} \
      --url {{DB_URL}}

# Show SQL for pending migrations without applying them.
apply-dry:
    @echo "==> Dry-run applying migrations to {{DB_URL}}..."
    atlas migrate apply \
      --dir {{MIGRATIONS_DIR}} \
      --url {{DB_URL}} \
      --dry-run

# Lint migrations for potential issues (uses dev db).
# Lints the latest migration by default.
# Usage: just lint [N] (where N is number of latest migrations to lint, default 1)
lint N='1':
    @echo "==> Linting latest {{N}} migration(s) using dev DB {{DEV_DB_URL}}..."
    atlas migrate lint \
      --dir {{MIGRATIONS_DIR}} \
      --dev-url {{DEV_DB_URL}} \
      --latest {{N}}

# Inspect the current schema of the live database (DB_URL).
# Usage: just inspect [output_file.hcl] (optional output file)
inspect *ARGS:
    @echo "==> Inspecting schema of {{DB_URL}}..."
    atlas schema inspect --url {{DB_URL}} {{ARGS}} # Pass optional -o flag via ARGS

# Apply a desired schema state directly to the database (use with caution, bypasses migration files).
# Useful for bootstrapping dev environments if not using versioned migrations for that.
# NOTE: Assumes SCHEMA_SOURCE is correctly set for the method you want.
schema-apply:
    @echo "==> WARNING: Directly applying schema state from {{SCHEMA_SOURCE}} to {{DB_URL}}..."
    @read -p "Are you sure? This bypasses migration files. [y/N] " -n 1 -r; echo
    @if [[ $$REPLY =~ ^[Yy]$ ]]
    then
        # Atlas uses -f for files and -u for URLs/Executables
        _flag := ""
        if starts_with(SCHEMA_SOURCE, "file://") { _flag = "-f"; _source = replace(SCHEMA_SOURCE, "file://", ""); }
        else if starts_with(SCHEMA_SOURCE, "exec://") { _flag = "-u"; _source = SCHEMA_SOURCE; } # -u takes the full exec:// URL
        else { echo "Unsupported SCHEMA_SOURCE format for schema-apply"; exit 1; }

        atlas schema apply --url {{DB_URL}} {{_flag}} {{_source}} --auto-approve
        @echo "==> Schema apply complete."
    else
        @echo "Schema apply cancelled."
    fi

# --- Helper Tasks ---

# Check if Atlas CLI is installed
check-atlas:
    @atlas version || (echo "Error: Atlas CLI not found. Install from https://atlasgo.io/cli/getting-started/setting-up" && exit 1)

# Placeholder for cleaning the development database (implement according to your setup)
# Example for Docker: docker stop atlas-db && docker rm atlas-db && docker run ...
# clean-dev-db:
#    @echo "Implement database cleaning logic here"
```

### Explanation

1. **Configuration Variables:**

    - `DB_URL`: Your main database connection string. It tries to read from the `DATABASE_URL` environment variable first, falling back to a default localhost Postgres connection. **Adjust the fallback or ensure `DATABASE_URL` is set.**
    - `DEV_DB_URL`: The connection string for the temporary database Atlas uses for diffing/linting. Using `docker://...` is highly recommended if you have Docker installed, as it handles the temporary database creation/cleanup automatically.
    - `MIGRATIONS_DIR`: Specifies where your `YYYYMMDDHHMMSS_name.sql` files live. The `file://` prefix is required by Atlas.
    - `SCHEMA_SOURCE`: **This is crucial.** You define how Atlas determines the _desired_ schema state. Uncomment the line that matches your approach (HCL file, SQL file, or GORM loader script) and ensure the path/command is correct.

2. **Recipes (Commands):**

    - `default`: Running `just` with no arguments shows the available commands.
    - `diff +name`: Generates a migration. Requires a name (`+name` makes it mandatory). Uses the `DEV_DB_URL` and `SCHEMA_SOURCE`. Example: `just diff add_price_to_products`
    - `apply`: Applies pending migrations to the `DB_URL`. Example: `just apply`
    - `apply-dry`: Shows what SQL `apply` _would_ run. Example: `just apply-dry`
    - `lint [N]`: Checks migrations for safety/style issues using the `DEV_DB_URL`. Defaults to checking only the latest (`N=1`). Example: `just lint` or `just lint 3`
    - `inspect [*ARGS]`: Connects to `DB_URL` and prints its current schema. You can optionally pass arguments, like `-o current_schema.hcl`, which `*ARGS` will capture. Example: `just inspect -o current.hcl` or `just inspect`
    - `schema-apply`: Directly applies the `SCHEMA_SOURCE` to `DB_URL`, bypassing migrations. **Use carefully.** It includes a confirmation prompt. It dynamically determines whether to use `-f` (for files) or `-u` (for `exec://`) based on the `SCHEMA_SOURCE` variable.
    - `check-atlas`: A simple helper to verify the `atlas` command is available.

### How to Use

1. Save the code above as `Justfile` in your project root.
2. Install `just`.
3. **Crucially, configure the variables** (`DB_URL`, `DEV_DB_URL`, `MIGRATIONS_DIR`, `SCHEMA_SOURCE`) at the top of the file to match your project setup.
4. Run commands from your terminal in the project root:
    - `just diff add_indices`
    - `just apply`
    - `just lint`
    - `just inspect`
    - `just` (to see all commands)

This `Justfile` provides a much cleaner and more consistent way to interact with Atlas during your development workflow.
