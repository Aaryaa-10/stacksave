# Pricing Data Documentation

## Overview

StackSave uses a structured pricing dataset to evaluate AI tooling subscriptions, compare plans, and identify potential optimization opportunities.

The pricing dataset acts as the foundation of the audit engine and powers recommendation generation logic.

---

# Supported AI Tools

Current tools included in the pricing dataset:

- ChatGPT
- Claude
- Gemini
- Cursor
- GitHub Copilot
- OpenAI API
- Anthropic API

---

# Dataset Structure

Each tool contains:

- Tool name
- Available plans
- Monthly pricing
- Plan-specific metadata

Example structure:

```ts
{
  tool: "ChatGPT",
  plans: [
    {
      name: "Free",
      monthlyPrice: 0,
    },
    {
      name: "Plus",
      monthlyPrice: 20,
    },
    {
      name: "Team",
      monthlyPrice: 30,
    },
  ],
}