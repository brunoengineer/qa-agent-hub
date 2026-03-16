# Release Readiness

**Prompt:** `#release-readiness`
**Agent file:** `.github/agents/qa-release-readiness.agent.md`
**Prompt file:** `.github/prompts/release-readiness.prompt.md`

---

## Purpose

Evaluates release readiness and produces a recommendation of **Go**, **Go with Risks**, or **No-Go** based on test status, open defects, scope confidence, and business impact.

## How to Use

1. Open Copilot Chat in VS Code.
2. Type `#release-readiness` followed by your release status information.
3. If you send `#release-readiness` with no input, the agent will ask:

```
Please provide:

- Release, feature, or rollout name
- Test execution status or summary
- Open defects, known risks, and scope notes
```

## Required Input

| Field | Required | Description |
|---|---|---|
| Release/feature name | Yes | What is being released |
| Test execution status | Yes | Summary of test results |
| Open defects/risks | Recommended | Known issues and risk factors |

## Output

A structured readiness report containing:

- **Recommendation** — Go / Go with Risks / No-Go
- **Confidence** — High/Medium/Low
- **Scope Evaluated** — short scope summary
- **Test Status Summary** — table with area, status, and notes
- **Open Defects and Risks** — table with severity, impact, and owner/next step
- **Coverage Confidence** — assessment of validated vs not validated areas
- **Blocking Considerations** — blockers or explicit absence of blockers
- **Recommendation Rationale** — clear explanation
- **Required Follow-up Actions** — numbered action items

### Output Template

```markdown
# Release Readiness - [Release or Feature]

**Recommendation:** Go / Go with Risks / No-Go
**Confidence:** High/Medium/Low
**Scope Evaluated:** [Short scope summary]

## Test Status Summary

| Area | Status | Notes |
|---|---|---|

## Open Defects and Risks

| Item | Severity | Impact | Owner or Next Step |
|---|---|---|---|

## Coverage Confidence
[Assessment of what was and was not validated]

## Blocking Considerations
- [Blocking issue or statement that none were found]

## Recommendation Rationale
[Clear explanation for the recommendation]

## Required Follow-up Actions
1. [Action]
2. [Action]
```

## Saved File

| Property | Value |
|---|---|
| Directory | `qa-agent-hub/response/release-readiness/` |
| Filename | `YYYY-MM-DD-<slug>.md` |
| Condition | Only created when input is provided |

## Technical Information Sources

| Source | Path | Role |
|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | QA tone, risk-based prioritization |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | Markdown structure, filename conventions |
| Test Design Guidance | `.github/instructions/test-design.instructions.md` | Coverage standards, risk-based design |
| Jira QA Guidance | `.github/instructions/jira.instructions.md` | Defect severity, bug management context |
