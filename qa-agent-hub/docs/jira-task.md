# Jira Task

**Prompt:** `#jira-task`
**Agent file:** `.github/agents/qa-jira-task.agent.md`
**Prompt file:** `.github/prompts/jira-task.prompt.md`

---

## Purpose

Creates a QA task ticket for work such as implementing new tests, executing test suites, updating existing automation, or test maintenance. The agent adapts the output to the type of task detected.

## How to Use

1. Open Copilot Chat in VS Code.
2. Type `#jira-task` followed by your task description.
3. If you send `#jira-task` with no input, the agent will ask:

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

| Source | Path | Role |
|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | QA tone, specificity, risk-based prioritization |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | Markdown structure, filename conventions |
| Jira QA Guidance | `.github/instructions/jira.instructions.md` | Task ticket standards, acceptance criteria, labels |
| Automation Guidance | `.github/instructions/automation.instructions.md` | Used when task relates to automation or test maintenance |
