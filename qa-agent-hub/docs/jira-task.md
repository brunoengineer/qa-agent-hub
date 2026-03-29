# Jira Task

**Copilot prompt:** `#jira-task` | **Claude Code command:** `/jira-task`
**Copilot agent file:** `.github/agents/qa-jira-task.agent.md`
**Copilot prompt file:** `.github/prompts/jira-task.prompt.md`
**Claude Code command file:** `.claude/commands/jira-task.md`

---

## Purpose

Creates a QA task ticket for work such as implementing new tests, executing test suites, updating existing automation, or test maintenance. The agent adapts the output to the type of task detected.

## How to Use

### GitHub Copilot
1. Open Copilot Chat in VS Code.
2. Type `#jira-task` followed by your task description.

### Claude Code
1. Open Claude Code in the project root.
2. Type `/jira-task` followed by your task description.

Both tools behave identically: send the command with no input to see the required format.

If you send the command with no input, it will ask:

```
Please describe the QA task:

- What needs to be done?
- Feature/component involved?
- Any deadline or priority?
```

## Required Input

| Field | Required | Description |
|---|---|---|
| Task description | Yes | What needs to be done |
| Feature/component | Recommended | Area of the product involved |
| Deadline/priority | Optional | Urgency or schedule constraints |

## Task Types Recognized

| Type | Focus |
|---|---|
| Implement new tests | What to test and coverage goals |
| Execute test suite | Environment, scope, and reporting |
| Update existing tests | What changed and what needs updating |
| Test maintenance | Flaky tests, refactoring, and cleanup |

## Output

A structured Markdown task ticket containing:

- **Title** with test tube emoji (`🧪`)
- **Type**, **Priority**, **Estimate**, **Component**
- **Description** — expanded context
- **Acceptance Criteria** — testable checklist items
- **Implementation Notes** — technical guidance and approach
- **Suggested Scope** — files, test types, and coverage expectations
- **Labels** — `qa`, `automation`, component tags

### Output Template

```markdown
# 🧪 [Brief title describing the QA task]

**Type:** Task
**Priority:** High/Medium/Low
**Estimate:** [X hours/days]
**Component:** (infer from description)

---

### Description
[Expand on what needs to be done]

### 📋 Acceptance Criteria
- [ ] [Specific criteria 1]
- [ ] [Specific criteria 2]

### 🔧 Implementation Notes
[Technical guidance - approach, files/areas to look at]

### 📁 Suggested Scope
- Files/tests to create or modify
- Test types needed (unit, integration, e2e)
- Coverage expectations

### 🏷️ Labels
`qa`, `automation`, `[component]`
```

## Saved File

| Property | Value |
|---|---|
| Directory | `qa-agent-hub/response/jira-task/` |
| Filename | `YYYY-MM-DD-<slug>.md` |
| Condition | Only created when input is provided |

## Technical Information Sources

| Source | Copilot path | Claude Code location | Role |
|---|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | `## QA Core Guidance` in `.claude/CLAUDE.md` | QA tone, specificity, risk-based prioritization |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | `## Documentation Output Guidance` in `.claude/CLAUDE.md` | Markdown structure, filename conventions |
| Jira QA Guidance | `.github/instructions/jira.instructions.md` | `## Jira QA Guidance` in `.claude/CLAUDE.md` | Task ticket standards, acceptance criteria, labels |
| Automation Guidance | `.github/instructions/automation.instructions.md` | `## Automation Guidance` in `.claude/CLAUDE.md` | Used when task relates to automation or test maintenance |
