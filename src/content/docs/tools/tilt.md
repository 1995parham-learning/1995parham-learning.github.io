---
title: Tilt
---

> Kubernetes for Prod, Tilt for Dev

Modern apps are made of too many services.
They're everywhere and in constant communication.
Tilt powers microservice development and makes sure they behave!
Run tilt up to work in a complete dev environment configured for your team.

Tilt automates all the steps from a code change to a new process:
watching files, building container images, and bringing your environment up-to-date.
Think `docker build && kubectl apply` or `docker-compose up`.

## Introduction

When you run tilt up, Tilt looks for a special file named `Tiltfile` in the current directory,
which defines your dev-environment-as-code.
A `Tiltfile` is written in [Starlark](https://bazel.build/rules/language), a simplified dialect of Python.
