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
| `#jira-ticket` | Create a Jira bug ticket from test failure |
| `#bulk-tickets` | Process multiple failures from test report |
| `#coverage-analysis` | Analyze test coverage data |
| `#test-suggestions` | Suggest test cases for uncovered code |
| `#test-plan` | Create a test plan for a feature |
| `#write-tests` | Generate automated test code |

## Usage Examples

### Create a Jira Ticket

```
#jira-ticket

Test: Login Authentication
Error: TimeoutError waiting for selector "#dashboard"
Environment: staging
Severity: critical
```

### Analyze Coverage

```
#coverage-analysis

{paste your Jest/Istanbul coverage JSON}
```

### Write Tests

```
#write-tests

Write tests for the PaymentService class
```

## Create Your Own Prompts

Add `.md` files to `.github/prompts/`:

```markdown
---
mode: agent
description: What this prompt does
---

Your instructions here...
```

## Requirements

- VS Code
- GitHub Copilot

## License

MIT
