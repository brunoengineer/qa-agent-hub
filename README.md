# 🧪 QA Agent Hub

> Reusable Copilot prompts for QA Engineers

## Quick Start

```bash
git clone https://github.com/brunoengineer/qa-agent-hub.git
cd qa-agent-hub
code .
```

Open **Copilot Chat** (`Ctrl+Alt+I`) → Type `#` → Select a prompt.

## Available Prompts

| Prompt | What it does |
|--------|--------------|
| `#jira-bug` | Create a bug ticket from issue description |
| `#jira-task` | Create a QA task (implement tests, execute tests, update automation) |
| `#test-plan` | Generate a comprehensive Test Plan document |
| `#test-suggestions` | Generate ISTQB-aligned manual test cases |
| `#test-approach` | Generate a test approach from a Jira ticket or feature description |
| `#coverage-analysis` | Analyze test coverage against requirements |

> 💡 **Tip:** Send only the prompt name (e.g., `#jira-bug`) without any input to see the required input format.

## Response Artifacts (Local)

Each prompt is designed to **save its output locally** so you have a lightweight audit trail of QA work without needing to copy/paste results into files manually.

- Outputs are written under `response/<prompt-name>/` (the prompt creates the folder if it doesn’t exist).
- Filenames follow: `YYYY-MM-DD-<slug>.md` (based on the generated title/feature name).
- The `response/` folder is **ignored by Git** by default (see `.gitignore`), so generated responses are **not pushed to GitHub**.

This keeps the repository clean while still letting you keep local “work logs” for tickets, test plans, and test cases.

## Usage Examples

### Create a Bug Ticket

```
#jira-bug

Issue: User cannot login after password reset
Expected: User logs in successfully
Actual: "Invalid credentials" error shown
Steps: 1) Reset password 2) Try to login with new password
```

### Create a Test Plan

```
#test-plan

Feature: Shopping Cart Checkout
```

### Generate Test Cases

```
#test-suggestions

Feature: User Registration form with email, password, and confirm password fields
```

### Generate Test Approach

```
#test-approach

[Paste your Jira ticket content here]
```

Generates an ISTQB-aligned test approach with:
- 🎯 Objective
- 📋 Test Scope (Focus, Components, Exclusions)
- 🔍 Test Levels (Integration, Component, Performance, etc.)
- 🧪 Test Techniques (Equivalence Partitioning, BVA, Positive/Negative)
- 🖥️ Test Environment (Postman, Bender, Kibana, BO)
- ⚠️ Risk-Based Testing
- ✅ Exit Criteria

### Analyze Coverage

```
#coverage-analysis

Requirements: UC-001 User Login, UC-002 User Registration
Test Cases: TC-001 Valid login, TC-002 Invalid password
```

## Create Your Own Prompts

Add `.prompt.md` files to `.github/prompts/`:

```markdown
---
agent: agent
description: What this prompt does
---

Your instructions here...
```

## Requirements

- VS Code
- GitHub Copilot

## License

MIT
