# Automation Gap Analysis

**Copilot prompt:** `#automation-gap-analysis` | **Claude Code command:** `/automation-gap-analysis`
**Copilot agent file:** `.github/agents/qa-automation-gap-analysis.agent.md`
**Copilot prompt file:** `.github/prompts/automation-gap-analysis.prompt.md`
**Claude Code command file:** `.claude/commands/automation-gap-analysis.md`

---

## Purpose

Compares current manual and automated coverage, identifies the most important gaps, and recommends what should be automated next. Favors repeatable, high-risk, and high-value scenarios over broad but fragile automation.

## How to Use

### GitHub Copilot
1. Open Copilot Chat in VS Code.
2. Type `#automation-gap-analysis` followed by your coverage information.

### Claude Code
1. Open Claude Code in the project root.
2. Type `/automation-gap-analysis` followed by your coverage information.

Both tools behave identically: send the command with no input to see the required format.

If you send the command with no input, it will ask:

```
Please provide:

- The feature, module, or scope area
- What is already covered manually and automatically
- Any pain points, risks, or high-value flows
```

## Required Input

| Field | Required | Description |
|---|---|---|
| Feature/scope | Yes | Feature, module, or scope area |
| Current coverage | Recommended | What is already covered manually and automated |
| Pain points/risks | Optional | Issues, risks, or high-value flows to prioritize |

## Output

A structured gap analysis containing:

- **Automation Readiness** — High/Medium/Low
- **Primary Goal** — why automation is needed
- **Current State** — summary of existing manual and automated coverage
- **Coverage Matrix** — table with area, manual coverage, automated coverage, gap, and risk
- **Best Automation Candidates** — ranked with reasoning
- **Recommended Order** — implementation sequence
- **Dependencies and Blockers** — missing test data, selectors, environment needs
- **Out of Scope for Now** — low-value or unstable scenarios

### Output Template

```markdown
# Automation Gap Analysis - [Feature or Scope]

**Automation Readiness:** High/Medium/Low
**Primary Goal:** [Why automation is needed here]

## Current State
[Summary of existing manual and automated coverage]

## Coverage Matrix

| Area | Manual Coverage | Automated Coverage | Gap | Risk |
|---|---|---|---|---|

## Best Automation Candidates
1. [Candidate and why it matters]
2. [Candidate and why it matters]

## Recommended Order
1. [First implementation step]
2. [Second implementation step]

## Dependencies and Blockers
- [Dependency]
- [Blocker]

## Out of Scope for Now
- [Low-value or unstable scenario]
```

## Saved File

| Property | Value |
|---|---|
| Directory | `qa-agent-hub/response/automation-gap-analysis/` |
| Filename | `YYYY-MM-DD-<slug>.md` |
| Condition | Only created when input is provided |

## Technical Information Sources

| Source | Copilot path | Claude Code location | Role |
|---|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | `## QA Core Guidance` in `.claude/CLAUDE.md` | QA tone, risk-based prioritization |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | `## Documentation Output Guidance` in `.claude/CLAUDE.md` | Markdown structure, filename conventions |
| Test Design Guidance | `.github/instructions/test-design.instructions.md` | `## Test Design Guidance` in `.claude/CLAUDE.md` | ISTQB techniques, coverage and traceability |
| Automation Guidance | `.github/instructions/automation.instructions.md` | `## Automation Guidance` in `.claude/CLAUDE.md` | Maintainability, deterministic tests, selectors, fixtures, scope boundaries |
