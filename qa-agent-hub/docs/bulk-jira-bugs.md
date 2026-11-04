# Bulk Jira Bugs

**Copilot prompt:** `#bulk-jira-bugs` | **Claude Code command:** `/bulk-jira-bugs`
**Copilot agent file:** `.github/agents/qa-bulk-jira-bugs.agent.md`
**Copilot prompt file:** `.github/prompts/bulk-jira-bugs.prompt.md`
**Claude Code command file:** `.claude/commands/bulk-jira-bugs.md`

---

## Purpose

Creates multiple Jira bug tickets from a single source such as triage notes, test execution reports, or defect lists. The agent identifies distinct defects, merges duplicates when appropriate, and produces a batch-ready document.

## How to Use

### GitHub Copilot
1. Open Copilot Chat in VS Code.
2. Type `#bulk-jira-bugs` followed by your issue list or report.

### Claude Code
1. Open Claude Code in the project root.
2. Type `/bulk-jira-bugs` followed by your issue list or report.

Both tools behave identically: send the command with no input to see the required format.

If you send the command with no input, it will ask:

```
Please provide:

- A list of issues, report content, or triage notes
- Any environment or release context
- Whether similar items should be merged or kept separate
```

## Required Input

| Field | Required | Description |
|---|---|---|
| Issue list / report | Yes | Multiple issues, triage notes, or test execution report |
| Environment context | Optional | Release, browser, or environment details |
| Merge preference | Optional | Whether to merge similar items or keep them separate |

## Output

The agent completes a full Analysis Process first. The limits below apply to the printed report, not to that analysis.

A batch document with one short summary and compact tickets of about 120 words each, ordered by priority. See the [example](../examples/bulk-jira-bugs.md). The exact template is in the command file.

| Part | Content | Limit |
|---|---|---|
| **Meta line** | Source · Bugs · Environment | 1 line |
| **Summary** | What the batch shows, the most urgent bug, what was merged | 2 sentences |
| **Summary table** | Title, Priority, Component | 1 row per bug |
| **Each ticket** | Meta line, description, steps, expected, actual, scope, acceptance criteria | 6 steps, 4 criteria |

Details missing from the source are written as `Not specified in source` and flagged in chat under **Before you post**. Diagrams are left out of a batch. Use the Jira Bug flow when one bug needs a diagram.

## Saved File

| Property | Value |
|---|---|
| Directory | `qa-agent-hub/response/bulk-jira-bugs/` |
| Filename | `YYYY-MM-DD-<slug>.md` |
| Condition | Only created when input is provided |

## Technical Information Sources

| Source | Copilot path | Claude Code location | Role |
|---|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | `## QA Core Guidance` in `.claude/CLAUDE.md` | QA tone, specificity, risk-based prioritization |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | `## Documentation Output Guidance` in `.claude/CLAUDE.md` | Markdown structure, filename conventions |
| Jira QA Guidance | `.github/instructions/jira.instructions.md` | `## Jira QA Guidance` in `.claude/CLAUDE.md` | Bug ticket standards, severity, labels |
