---
title: Rasa
icon: simple-icons:rasa
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

:::note
Remember that if you use a script to generate training data, the only thing your model can
learn is how to reverse-engineer the script.
:::

### Avoiding Intent Confusion#

Intents are classified using character and word-level features extracted from your training examples,
depending on what _featurizers_ you've added to your NLU pipeline. When different intents contain
the same words ordered similarly, this can create confusion for the intent classifier.

## Entity

Keywords that can be extracted from a user message.
For example: a telephone number, a person's name, a location, the name of a product

```yaml
stories:
    - story: migrate from IBM Watson
      steps:
          - intent: migration
            entities:
                - product
          - slot_was_set:
                - product: Watson
          - action: utter_watson_migration

    - story: migrate from Dialogflow
      steps:
          - intent: migration
            entities:
                - product
          - slot_was_set:
                - product: Dialogflow
          - action: utter_dialogflow_migration

    - story: migrate from unspecified
      steps:
          - intent: migration
          - action: utter_ask_migration_product
```

To avoid intent confusion, group these training examples into single migration intent and make the
response depend on the value of a categorical product slot that comes from an entity.
