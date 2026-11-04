# Release Readiness

**Copilot prompt:** `#release-readiness` | **Claude Code command:** `/release-readiness`
**Copilot agent file:** `.github/agents/qa-release-readiness.agent.md`
**Copilot prompt file:** `.github/prompts/release-readiness.prompt.md`
**Claude Code command file:** `.claude/commands/release-readiness.md`

---

## Purpose

Evaluates release readiness and produces a recommendation of **Go**, **Go with Risks**, or **No-Go** based on test status, open defects, scope confidence, and business impact.

## How to Use

### GitHub Copilot
1. Open Copilot Chat in VS Code.
2. Type `#release-readiness` followed by your release status information.

### Claude Code
1. Open Claude Code in the project root.
2. Type `/release-readiness` followed by your release status information.

Both tools behave identically: send the command with no input to see the required format.

If you send the command with no input, it will ask:

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

The agent completes a full Analysis Process first. The limits below apply to the printed report, not to that analysis.

A one-screen readiness report of about 300 words. The first 3 lines carry the decision. See the [example](../examples/release-readiness.md). The exact template is in the command file.

| Part | Content | Limit |
|---|---|---|
| **Meta line** | Recommendation (Go, Go with Risks, No-Go) · Confidence · Scope | 1 line |
| **Summary** | Why this recommendation and what could change it | 2 sentences |
| **Test Status** | Area, status marker, notes, worst first | 8 rows |
| **Open Risks** | Risk, severity, impact, owner and next step | 4 rows; every Blocker and High always listed |
| **Required Follow-ups** | Actions, most urgent first | 4 actions |

## Saved File

| Property | Value |
|---|---|
| Directory | `qa-agent-hub/response/release-readiness/` |
| Filename | `YYYY-MM-DD-<slug>.md` |
| Condition | Only created when input is provided |

## Technical Information Sources

| Source | Copilot path | Claude Code location | Role |
|---|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | `## QA Core Guidance` in `.claude/CLAUDE.md` | QA tone, risk-based prioritization |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | `## Documentation Output Guidance` in `.claude/CLAUDE.md` | Markdown structure, filename conventions |
| Test Design Guidance | `.github/instructions/test-design.instructions.md` | `## Test Design Guidance` in `.claude/CLAUDE.md` | Coverage standards, risk-based design |
| Jira QA Guidance | `.github/instructions/jira.instructions.md` | `## Jira QA Guidance` in `.claude/CLAUDE.md` | Defect severity, bug management context |
