# Root Cause Triage

**Prompt:** `#root-cause-triage`
**Agent file:** `.github/agents/qa-root-cause-triage.agent.md`
**Prompt file:** `.github/prompts/root-cause-triage.prompt.md`

---

## Purpose

Triages a failure or issue into the most likely root-cause category and recommends next actions. Helps teams quickly classify and route problems instead of wasting time on misdiagnosis.

## How to Use

1. Open Copilot Chat in VS Code.
2. Type `#root-cause-triage` followed by the failure details.
3. If you send `#root-cause-triage` with no input, the agent will ask:

```
Please provide:

- The failing test, defect, or issue summary
- Any error output, screenshots, or logs
- The affected environment and recent changes, if known
```

## Required Input

| Field | Required | Description |
|---|---|---|
| Failure summary | Yes | The failing test, defect, or issue description |
| Error output/logs | Recommended | Error messages, screenshots, or log excerpts |
| Environment/changes | Optional | Affected environment and recent changes |

## Root Cause Categories

The agent classifies into one primary category:

| Category | Description |
|---|---|
| Product Bug | Defect in the application code |
| Test Automation Issue | Flaky test, bad selector, timing issue |
| Environment Issue | Infrastructure, deployment, or config problem |
| Test Data Issue | Missing, stale, or incorrect test data |
| Requirement Gap | Unclear or missing specification |
| Unknown | Insufficient evidence to classify |

## Output

A structured triage report containing:

- **Most Likely Category** — primary classification
- **Confidence** — High/Medium/Low
- **Severity Signal** — High/Medium/Low
- **Issue Summary**
- **Evidence** — key signals analyzed
- **Likely Root Cause** — reasoned explanation
- **Alternative Hypotheses** — other possible explanations
- **What to Verify Next** — investigation steps
- **Recommended Action** — immediate next steps, escalation, ownership

### Output Template

```markdown
# Root Cause Triage - [Issue or Test Name]

**Most Likely Category:** [Category]
**Confidence:** High/Medium/Low
**Severity Signal:** High/Medium/Low

## Issue Summary
[Short summary of the observed problem]

## Evidence
- [Key signal]
- [Key signal]

## Likely Root Cause
[Reasoned explanation of the most likely cause]

## Alternative Hypotheses
- [Possible secondary explanation]

## What to Verify Next
1. [Verification step]
2. [Verification step]

## Recommended Action
- [Immediate next action]
- [Escalation or ownership suggestion]
- [Whether to log a bug, fix a test, or rerun]
```

## Saved File

| Property | Value |
|---|---|
| Directory | `qa-agent-hub/response/root-cause-triage/` |
| Filename | `YYYY-MM-DD-<slug>.md` |
| Condition | Only created when input is provided |

## Technical Information Sources

| Source | Path | Role |
|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | QA tone, risk-based prioritization |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | Markdown structure, filename conventions |
| Jira QA Guidance | `.github/instructions/jira.instructions.md` | Defect reporting standards |
| Automation Guidance | `.github/instructions/automation.instructions.md` | Separating product defects from flaky automation, environment, and data issues |
