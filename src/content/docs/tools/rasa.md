---
title: Rasa
---

> With over 25 million downloads, Rasa Open Source is the most popular open source framework
> for building chat and voice-based AI assistants.

## NLU Training Data

The goal of NLU (Natural Language Understanding) is to **extract structured information from user messages**.
This usually includes the _user's intent_ and any entities their message contains.
You can add extra information such as regular expressions and lookup tables to your
training data to help the model identify intents and entities correctly.

NLU training data consists of example user utterances categorized by intent.
To make it easier to use your intents, give them names that relate to what the user wants
to accomplish with that intent, keep them in lowercase, and avoid spaces and special characters.

```yaml
version: "3.1"

nlu:
  - intent: greet
    examples: |
      - Hey
      - Hi
      - hey there [Sara](name)

  - intent: faq/language
    examples: |
      - What language do you speak?
      - Do you only handle english?

stories:
  - story: greet and faq
    steps:
      - intent: greet
      - action: utter_greet
      - intent: faq
      - action: utter_faq

rules:
  - rule: Greet user
    steps:
      - intent: greet
      - action: utter_greet
```

### Gather Real Data

When it comes to building out NLU training data, developers are sometimes tempted to use text
generation tools or templates to quickly increase the number of training examples. This is a **bad idea**.

## Entity

Keywords that can be extracted from a user message.
For example: a telephone number, a person's name, a location, the name of a product
