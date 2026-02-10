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
| `#coverage-analysis` | Analyze test coverage against requirements |

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
