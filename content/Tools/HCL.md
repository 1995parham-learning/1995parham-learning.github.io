---
repo: https://github.com/1995parham-learning/hcl101
---

HCL is a toolkit for creating structured configuration languages that are both human- and machine-friendly, for use with command-line tools. Although intended to be generally useful, it is primarily targeted towards devops tools, servers, etc.

It includes an expression syntax that allows basic _inline computation_ and, with support from the calling application, _use of variables and functions_ for more dynamic configuration languages.

HCL provides a set of constructs that can be used by a calling application to construct a configuration language. **The application defines which attribute names and nested block types are expected, and HCL parses the configuration file, verifies that it conforms to the expected structure, and returns high-level objects that the application can use for further processing**.

```go
package main

import (
	"log"

	"github.com/hashicorp/hcl/v2/hclsimple"
)

type Config struct {
	IOMode  string        `hcl:"io_mode"`
	Service ServiceConfig `hcl:"service,block"`
}

type ServiceConfig struct {
	Protocol   string          `hcl:"protocol,label"`
	Type       string          `hcl:"type,label"`
	ListenAddr string          `hcl:"listen_addr"`
	Processes  []ProcessConfig `hcl:"process,block"`
}

type ProcessConfig struct {
	Type    string   `hcl:"type,label"`
	Command []string `hcl:"command"`
}

func main() {
	var config Config
	err := hclsimple.DecodeFile("config.hcl", nil, &config)
	if err != nil {
		log.Fatalf("Failed to load configuration: %s", err)
	}
	log.Printf("Configuration is %#v", config)
}
```

HCL is built around two primary concepts: _attributes_ and _blocks_.

Attribute values can be expressions as well as just literal values:

```hcl
# Arithmetic with literals and application-provided variables
sum = 1 + addend

# String interpolation and templates
message = "Hello, ${name}!"

# Application-provided functions
shouty_message = upper(message)
```

## Structural Elements

The primary structural element is the _body_, which is a container representing a set of zero or more _attributes_ and a set of zero or more _blocks_.

A _configuration file_ is the top-level object, and will usually be produced by reading a file from disk and parsing it as a particular syntax. A configuration file has its own _body_, representing the top-level attributes and blocks.

An _attribute_ is a name and value pair associated with a body. **Attribute names are unique within a given body**. Attribute values are provided as _expressions_, which are discussed in detail in a later section.

A _block_ is a nested structure that has a _type name_, zero or more string _labels_ (e.g. identifiers), and a nested body.

Together the structural elements create a hierarchical data structure, with attributes intended to represent the direct properties of a particular object in the calling application, and blocks intended to represent child objects of a particular object.

## Body Content

To support the expression of the HCL concepts in languages whose information model is a subset of HCL's, such as JSON, a _body_ is an opaque container whose content can only be accessed by providing information on the expected structure of the content.
