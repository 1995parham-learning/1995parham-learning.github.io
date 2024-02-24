---
title: Operating Systems
---

## Process

Process is the **running program**.
The program itself is a lifeless thing: it just sits there on the disk, a bunch of instructions
(and maybe some static data), waiting to spring into action.

**Time sharing** is a basic technique used by an OS to share a resource.
By allowing the resource to be used for a little while by one entity, and
then a little while by another, and so forth, the resource in question (e.g., the
CPU, or a network link) can be shared by many.
The counterpart of time sharing is **space sharing**, where a resource is divided (in space)
amon those who whish to use it.
For example, disk space is naturally a space-shared resource; once a block is assigned to a file,
it is normally not assigned to another file until the user deletes the original file.

## Policy and Mechanism

Separate high-level policies from low-level mechanisms.
Policies answer **Which** questions and mechanisms answer **How** questions.
