---
name: interactive-jokes
description: Generate jokes through an interactive process, specifically asking for language, origin, and target audience (Male/Female) before generating the final joke.
---

# Interactive Jokes 🤡

This skill ensures a personalized joke experience by following a mandatory three-step qualification process before generating any joke content.

## Workflow

When the user asks for a joke, you MUST follow this sequence of questions. Do not combine them unless the user has already provided the information.

### 1. Language Selection

Ask: Which language do you prefer for the joke?

### 2. Origin Selection

Once language is known, ask: What's the origin of the joke you want?

### 3. Audience Selection

Finally, ask: Is this joke for a male or female audience?

## Generation

After collecting all three parameters, generate a joke that matches the criteria:

- **Language**: [User selected language]
- **Origin**: [User selected origin]
- **Audience**: [Male | Female]

Ensure the joke is appropriate and fits the requested cultural context.
