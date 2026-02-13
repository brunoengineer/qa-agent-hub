# 🧪 QA Agent Hub

Reusable GitHub Copilot Chat prompts to speed up common QA work (bug tickets, QA tasks, test plans, test approaches, manual test cases, and coverage analysis).

This repo is meant to be opened in VS Code and used via Copilot Chat’s prompt picker.

## What’s in this repo

- Prompt files live in `.github/prompts/` as `*.prompt.md`.
- You run them from Copilot Chat by typing `#` and selecting a prompt.
- Each prompt documents:
	- What input it needs (or how it behaves when no input is provided)
	- What output format you’ll receive
	- How it saves a local response file for traceability

## Quick start

```bash
git clone https://github.com/brunoengineer/qa-agent-hub.git
cd qa-agent-hub
code .
```

In VS Code:

1. Open **Copilot Chat** (`Ctrl+Alt+I`).
2. Type `#`.
3. Pick a prompt (for example `#jira-bug`).
4. Paste the requested input.

Tip: send only the prompt name (for example `#jira-bug`) to see the exact input format required.

## Local response files (work log)

When you provide input, each prompt will:

1. Generate the answer in chat.
2. Create a local Markdown file under `response/<prompt-name>/`.
3. Use a dated filename like `YYYY-MM-DD-<slug>.md`.

The entire `response/` directory is ignored by Git (see `.gitignore`), so these generated files stay local and are never pushed to GitHub.

## Available prompts (inputs & outputs)

| Prompt | Use it for | Minimum input | Output you get |
|---|---|---|---|
| `#jira-bug` | Bug ticket for a defect | What happened / Expected / Steps | A Jira-ready bug report in Markdown |
| `#jira-task` | QA task ticket (automation/execution/maintenance) | What needs doing / Component / Priority | A Jira-ready QA task in Markdown |
| `#test-plan` | Full QA test plan | Feature/module + brief description | A structured test plan with scope/approach/risks |
| `#test-approach` | Short ISTQB-aligned test approach | Jira ticket or feature description | Test scope/levels/techniques/env/risks/exit criteria |
| `#test-suggestions` | Manual test cases (table format) | Feature + flows + constraints | A precondition line + a Markdown table of tests |
| `#coverage-analysis` | Coverage mapping vs requirements | Requirements list + existing test cases | Coverage table, gaps, and prioritized recommendations |


## Create a new prompt (template)

Add a new file under `.github/prompts/` named `<prompt-name>.prompt.md`.

Use this template (copy/paste):

```markdown
---
agent: agent
description: <one-line description>
---

You are a **Senior QA Engineer**.

## If No Input Provided

If the user only sends the prompt name without any input, respond ONLY with:

Please provide:

- <input field 1>
- <input field 2>
- <input field 3>

Do NOT explain the prompt. Just show the required input format.

## Your Task

When input is provided, produce the requested QA artifact.

## Output Format

Return the response in the exact structure below:

# <Title>

<sections / tables / bullets>


## File Output (Required)

When (and only when) input is provided and you generate the output:

1. Ensure the directory `response/<prompt-name>/` exists (create it if missing).
2. Create a Markdown file under `response/<prompt-name>/`.
3. Filename: `YYYY-MM-DD-<slug>.md` where `<slug>` is derived from the title or feature name (lowercase, hyphenated, max ~60 chars).
4. Save the final Markdown output as the file content.
5. Do not create any file when the user provided no input.

## Guidelines
- Only ask the user to describe what they need
- Infer...
- Be specific about...
- Include practical...
```

Guidelines for a “good prompt” here:
- Be strict about input requirements and output format.
- Make outputs immediately usable (Jira-ready, runnable tables, clear steps).
- Keep it deterministic: avoid vague language where possible.

## Requirements

- VS Code
- GitHub Copilot

## License

MIT
