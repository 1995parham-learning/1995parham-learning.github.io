---
repo: https://github.com/1995parham-learning/hcl101
---

HCL is a toolkit for creating structured configuration languages that are both human- and machine-friendly, for use with command-line tools. Although intended to be generally useful, it is primarily targeted towards devops tools, servers, etc.

It includes an expression syntax that allows basic _inline computation_ and, with support from the calling application, use of variables and functions for more dynamic configuration languages.

HCL provides a set of constructs that can be used by a calling application to construct a configuration language. The application defines which attribute names and nested block types are expected, and HCL parses the configuration file, verifies that it conforms to the expected structure, and returns high-level objects that the application can use for further processing.