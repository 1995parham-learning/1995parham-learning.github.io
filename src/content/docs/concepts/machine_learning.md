---
title: Machine Learning
icon: carbon:machine-learning
---

:::note
Machine learning is an approach to learn complex pattern from existing
data and use these patterns to make predictions on unseen data.
:::

Inputs + Patterns → Traditional software → Outputs
Inputs + Outputs → Machine learning → Patterns

## Interview Questions

1. How do you handle missing or corrupted data in a data set?
2. Explain the difference between deep learning, artificial intelligence (AI), and machine learning.
3. Describe your favorite machine learning algorithm.
4. What's the difference between unsupervised learning and supervised learning?
5. What is overfitting, and how do you prevent it?
6. What are false positives and false negatives? Why are they significant?
7. What are some examples of supervised machine learning used in the world of business today?
8. Explain the difference between deductive and inductive reasoning in machine learning.
   - Inductive reasoning by stating that it involves deriving general principles or rules from specific observations or examples.
   - Deductive reasoning typically requires pre-existing knowledge or explicit rules to apply to new data.
9. How do you know when to use classification or regression?
10. Explain how a random forest works.

## Design a machine learning system

There are generally four main components of the process: - project setup - data pipeline - modeling (selecting, training, and debugging your model) - serving (testing, deploying, maintaining)

1. Project setup:
   - Goals
   - User experience
   - Performance constraints
   - Evaluation
   - Personalization
   - Project constraints
2. Data pipeline:
   - For every formulation of the problem, you should tell what kind of data and how much data you need.
   - Data availability and collection
   - User data
   - Storage
   - Data preprocessing and representation
   - Challenges
   - Privacy
   - Biases
3. Modeling
   - selection
   - training
   - debugging
   - hyperparameter tuning
   - scaling
4. Serving
   - Performance/Interpret-ability tradeoff
   - With data parallelism, each worker has its own copy of the model and does all the computation necessary for the model.

## Requirements for ML systems

- Reliability
- Scalability
- Maintainability
- Adaptability

## The relationship between MLOps and ML Systems Design

Ops in MLOps comes from DevOps, short for Developments and Operations. To
operationalize something means to bring it into production, which includes
deploying, monitoring, and maintaining it. MLOps is a set of tools and best
practices for bringing ML into production.

ML systems design takes a system approach to MLOps, which means that it considers
an ML system holistically to ensure that all the components and their stakeholders
can work together to satisfy the specified objectives and requirements.

## Recommender systems

- Content based system: recommends based on the items similarity
- Collaborative filtering: recommends based on the users usage similarity (based on matrix factorization)
