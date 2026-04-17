# Automation Health Check

**Copilot prompt:** `#automation-health-check` | **Claude Code command:** `/automation-health-check`
**Copilot agent file:** `.github/agents/qa-automation-health-check.agent.md`
**Copilot prompt file:** `.github/prompts/automation-health-check.prompt.md`
**Claude Code command file:** `.claude/commands/automation-health-check.md`

---

## Purpose

Audits a QA automation codebase at a given path and returns a short improvement report plus 3 prioritized Jira tasks. Covers test files, fixtures, configs, page objects, and helpers. Focuses on maintainability, reliability, and coverage confidence.

## How to Use

### GitHub Copilot
1. Open Copilot Chat in VS Code.
2. Type `#automation-health-check` followed by the path to audit.

### Claude Code
1. Open Claude Code in the project root.
2. Type `/automation-health-check` followed by the path to audit.

Both tools behave identically: send the command with no input to see the required format.

If you send the command with no input, it will ask:

```
Please provide:

- The path to the automation codebase (tests, fixtures, configs, helpers, page objects)
```

## Required Input

| Field | Required | Description |
|---|---|---|
| Path | Yes | Path to the automation codebase directory to analyze |

## Output

A structured health report containing:

- **Health Score** — High / Medium / Low overall assessment
- **Analyzed** — summary of what was found at the path (file counts by type)
- **Improvement Report** — bullet observations across Code Quality and Architecture
- **3 Prioritized Jira Tasks** — each with title, description, in/out scope, and 2–3 acceptance criteria

### Task Priority Scale

| Priority | Meaning |
|---|---|
| **High** | Directly impacts reliability, maintainability, or coverage of critical flows |
| **Medium** | Meaningful improvement with moderate effort or impact |
| **Low** | Good-to-have cleanup or structural enhancement |

## Saved File Location

`qa-agent-hub/response/automation-health-check/YYYY-MM-DD-<slug>.md`

## Information Sources

| Source | Copilot path | Claude Code location |
|---|---|---|
| QA Core | `.github/instructions/qa-core.instructions.md` | `## QA Core Guidance` in `.claude/CLAUDE.md` |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | `## Documentation Output Guidance` in `.claude/CLAUDE.md` |
| Automation | `.github/instructions/automation.instructions.md` | `## Automation Guidance` in `.claude/CLAUDE.md` |
| Jira QA | `.github/instructions/jira.instructions.md` | `## Jira QA Guidance` in `.claude/CLAUDE.md` |
