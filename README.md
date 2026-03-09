# 🧪 QA Agent Hub

Reusable GitHub Copilot agents and prompts to speed up common QA work (bug tickets, QA tasks, test plans, test approaches, manual test cases, and coverage analysis).

This repo is meant to be opened in VS Code and used via Copilot Chat's agent and prompt picker.

## Repository structure

```
.github/
├── agents/                        # Agent definitions (instructions + tools)
│   ├── jira-bug.agent.md
│   ├── jira-task.agent.md
│   ├── test-approach.agent.md
│   ├── coverage-analysis.agent.md
│   ├── test-plan.agent.md
│   └── test-suggestions.agent.md
├── prompts/                       # Prompt triggers (thin wrappers that invoke agents)
│   ├── jira/
│   │   ├── jira-bug.prompt.md
│   │   ├── jira-task.prompt.md
│   │   └── test-approach.prompt.md
│   ├── qa-documentation/
│   │   ├── coverage-analysis.prompt.md
│   │   └── test-plan.prompt.md
│   └── test-suggestions.prompt.md
└── copilot-instructions.md        # Global Copilot context for this repo

response/                          # Local work log (generated files, not committed)
├── jira-bug/
├── jira-task/
├── test-approach/
├── coverage-analysis/
├── test-plan/
└── test-suggestions/
```

## How it works

Each QA task is backed by two files:

- **Agent** (`.github/agents/<name>.agent.md`) — contains the full system instructions: persona, output format, guidelines, and file-saving rules.
- **Prompt** (`.github/prompts/**/<name>.prompt.md`) — a thin trigger that routes to the agent via `agent: <Agent Name>` in its frontmatter.

When you invoke a prompt, Copilot Chat switches to the corresponding agent mode automatically.

## Quick start

```bash
git clone https://github.com/brunoengineer/qa-agent-hub.git
cd qa-agent-hub
code .
```

In VS Code:

1. Open **Copilot Chat** (`Ctrl+Alt+I`).
2. Type `#` and pick a prompt (e.g. `#jira-bug`).
3. Paste the requested input.

Tip: send only the prompt name (e.g. `#jira-bug`) with no input to see the exact format required.

## Available agents

| Prompt | Agent | Use it for | Minimum input | Output |
|---|---|---|---|---|
| `#jira-bug` | Jira Bug | Bug ticket for a defect | What happened / Expected / Steps | Jira-ready bug report |
| `#jira-task` | Jira Task | QA task (automation/execution/maintenance) | What needs doing / Component / Priority | Jira-ready QA task |
| `#test-approach` | Test Approach | Short ISTQB-aligned test approach | Jira ticket or feature description | Scope/levels/techniques/env/risks/exit criteria |
| `#coverage-analysis` | Coverage Analysis | Coverage mapping vs requirements | Requirements list + existing test cases | Coverage table, gaps, recommendations |
| `#test-plan` | Test Plan | Full QA test plan | Feature/module + brief description | Structured test plan with scope/approach/risks |
| `#test-suggestions` | Test Suggestions | Manual test cases (table format) | Feature + flows + constraints | Precondition line + Markdown table of tests |

## Local response files (work log)

When you provide input, the agent will:

1. Generate the answer in chat.
2. Create a local Markdown file under `response/<name>/`.
3. Use a dated filename like `YYYY-MM-DD-<slug>.md`.

The folder structure under `response/` is committed to Git, but generated files inside each folder are ignored (see `.gitignore`).

## Add a new agent

1. Create `.github/agents/<name>.agent.md` with the full instructions:

\`\`\`markdown
---
name: My Agent Name
description: One-line description
tools:
  - createFile
---

You are a **Senior QA Engineer**.

...instructions, output format, file output rules...
\`\`\`

2. Create `.github/prompts/<name>.prompt.md` to invoke it:

\`\`\`markdown
---
agent: My Agent Name
description: One-line description
---
\`\`\`

3. Add a `.gitkeep` to `response/<name>/` and update `.gitignore` with `response/<name>/*`.
