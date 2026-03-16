# Bulk Jira Bugs

**Prompt:** `#bulk-jira-bugs`
**Agent file:** `.github/agents/qa-bulk-jira-bugs.agent.md`
**Prompt file:** `.github/prompts/bulk-jira-bugs.prompt.md`

---

## Purpose

Creates multiple Jira bug tickets from a single source such as triage notes, test execution reports, or defect lists. The agent identifies distinct defects, merges duplicates when appropriate, and produces a batch-ready document.

## How to Use

1. Open Copilot Chat in VS Code.
2. Type `#bulk-jira-bugs` followed by your issue list or report.
3. If you send `#bulk-jira-bugs` with no input, the agent will ask:

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

A batch document containing:

- **Summary table** — all identified bugs with proposed title, priority, component, and reason to separate
- **Individual tickets** — each using the same visual style as the Jira Bug agent (emojis, section markers)
- **Horizontal separators** between each ticket for clear visual boundaries

Each individual ticket includes: Description, Expected Result, Actual Result, Steps to Reproduce, Reproduction Tips, and Labels.

### Output Template

```markdown
# 🐛 Bulk Jira Bugs - [Source or Feature]

**Source:** [Report, ticket, execution notes, or release name]
**Bugs Identified:** [Number]
**Environment:** [If known]

## Summary

| # | Proposed Title | Priority | Component | Reason to Separate |
|---|---|---|---|---|

## Tickets

### 1. [Bug Title]
**Priority:** High/Medium/Low
**Component:** [Area impacted]

#### Description
[Concise defect description]

#### ✅ Expected Result
[What should happen]

#### ⛔ Actual Result
[What actually happens]

#### 🔄 Steps to Reproduce
1. [Step]
2. [Step]

#### 💡 Reproduction Tips
- [Tips]

#### 🏷️ Labels
`bug`, `[component]`, `[priority]`

---

### 2. [Bug Title]
[Repeat for each additional bug]
```

## Saved File

| Property | Value |
|---|---|
| Directory | `qa-agent-hub/response/bulk-jira-bugs/` |
| Filename | `YYYY-MM-DD-<slug>.md` |
| Condition | Only created when input is provided |

## Technical Information Sources

| Source | Path | Role |
|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | QA tone, specificity, risk-based prioritization |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | Markdown structure, filename conventions |
| Jira QA Guidance | `.github/instructions/jira.instructions.md` | Bug ticket standards, severity, labels |
