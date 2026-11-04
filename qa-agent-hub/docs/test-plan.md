# Test Plan

**Copilot prompt:** `#test-plan` | **Claude Code command:** `/test-plan`
**Copilot agent file:** `.github/agents/qa-test-plan.agent.md`
**Copilot prompt file:** `.github/prompts/test-plan.prompt.md`
**Claude Code command file:** `.claude/commands/test-plan.md`

---

## Purpose

Generates a focused QA Test Plan for a feature or module: objective, scope, approach, risk-ranked priorities, environment, entry and exit criteria, and top risks.

## How to Use

### GitHub Copilot
1. Open Copilot Chat in VS Code.
2. Type `#test-plan` followed by the feature or module description.

### Claude Code
1. Open Claude Code in the project root.
2. Type `/test-plan` followed by the feature or module description.

Both tools behave identically: send the command with no input to see the required format.

If you send the command with no input, it will ask:

```
Please provide:

- Feature/module name
- Brief description of what it does
- Any specific requirements or constraints (optional)
```

## Required Input

| Field | Required | Description |
|---|---|---|
| Feature/module name | Yes | Name of the feature or module |
| Description | Yes | Brief description of what it does |
| Requirements/constraints | Optional | Specific requirements or limitations |

## Output

The agent completes a full Analysis Process first. The limits below apply to the printed report, not to that analysis.

A focused Test Plan of about 500 words, not counting the diagram. See the [example](../examples/test-plan.md). The exact template is in the command file.

| Part | Content | Limit |
|---|---|---|
| **Meta line** | Overall Risk · Environment · Timeline (when known) | 1 line |
| **Objective** | What testing must prove before this ships | 2 sentences |
| **Scope** | In Scope and Out of Scope | 4 bullets each |
| **Flow Under Test** | Optional Mermaid flow with the riskiest states marked | 1 diagram, 10 nodes |
| **Test Approach** | Test type, what it proves, how | 4 rows |
| **Test Priorities** | WRPN table, highest first | 8 rows |
| **Environment and Data** | Platforms, browsers, flags, test data | 4 bullets |
| **Entry and Exit Criteria** | Measurable checklists | 4 bullets each |
| **Top Risks** | Risk, severity, likelihood, RPN, mitigation | 4 rows |

*WRPN = Likelihood × Impact × Detectability × Effort*

*RPN = Severity × Likelihood × Detectability*

Bug management, deliverables, and a communication plan rarely change between features, so they are added only when you ask for them.

## Saved File

| Property | Value |
|---|---|
| Directory | `qa-agent-hub/response/test-plan/` |
| Filename | `YYYY-MM-DD-<slug>.md` |
| File starts with | `# QA Test Plan - <Feature/Module>` |
| Condition | Only created when input is provided |

## Technical Information Sources

| Source | Copilot path | Claude Code location | Role |
|---|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | `## QA Core Guidance` in `.claude/CLAUDE.md` | QA tone, risk-based prioritization |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | `## Documentation Output Guidance` in `.claude/CLAUDE.md` | Markdown structure, filename conventions |
| Test Design Guidance | `.github/instructions/test-design.instructions.md` | `## Test Design Guidance` in `.claude/CLAUDE.md` | ISTQB techniques, risk-based design, traceability |
| Jira QA Guidance | `.github/instructions/jira.instructions.md` | `## Jira QA Guidance` in `.claude/CLAUDE.md` | Used when input includes Jira workflow or bug-management expectations |
