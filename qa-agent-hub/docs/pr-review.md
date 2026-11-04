# PR Review

**Copilot prompt:** `#pr-review` | **Claude Code command:** `/pr-review`
**Copilot agent file:** `.github/agents/qa-pr-review.agent.md`
**Copilot prompt file:** `.github/prompts/pr-review.prompt.md`
**Claude Code command file:** `.claude/commands/pr-review.md`

---

## Purpose

Reviews a GitHub Pull Request as a senior code reviewer and returns a concise approval-risk report with actionable inline review comments. Determines whether the PR is safe to approve, covering user impact, regressions, UI behavior, event handling, accessibility, contract changes, maintainability, code quality, and test correctness.

## How to Use

### GitHub Copilot
1. Open Copilot Chat in VS Code.
2. Type `#pr-review` followed by the PR URL and diff content.

### Claude Code
1. Open Claude Code in the project root.
2. Type `/pr-review` followed by the PR URL and diff content.

Both tools behave identically: send the command with no input to see the required format.

If you send the command with no input, it will ask:

```
Please provide:

- The GitHub Pull Request URL
- The .diff content (paste the raw diff)
```

## Required Input

| Field | Required | Description |
|---|---|---|
| PR URL | Yes | The GitHub Pull Request URL |
| Diff content | Yes | The raw `.diff` content of the PR |
| Existing review comments | Optional | Any existing review comments on the PR |

## Review Dimensions

The agent inspects the diff across multiple dimensions:

| Dimension | Description |
|---|---|
| Code quality & good practices | Debugging artifacts, function correctness, error handling, naming, dead code, security, performance |
| Frontend-specific | Functional correctness, regression risk, component contracts, events, rendering stability, accessibility, styling |
| Test & automation | Missing coverage, test correctness, Playwright/E2E specifics, unit/integration tests, naming & structure |
| Existing comments | Whether previous review comments are still valid in the latest diff |

## Output

The agent completes a full Analysis Process first. The limits below apply to the printed report, not to that analysis.

A short approval-risk report, about 350 words when there are few findings. The first 3 lines carry the decision. See the [example](../examples/pr-review.md). The exact template is in the command file.

| Part | Content | Limit |
|---|---|---|
| **Meta line** | Verdict · Trust (0–100%) · Confirmed issue counts by severity | 1 line |
| **Summary** | What the PR does and what stands between it and approval | 2 sentences |
| **Checked** | Which review areas ran, with ⏭️ for areas that do not apply | 1 line |
| **Confirmed Issues** | Severity, file and line, problem with evidence, fix | Every Critical, High, and Medium, then 4 Low. One issue per row |
| **Verify Before Merge** | Risks that cannot be proven from the diff | 4 bullets |
| **Review Comments** | Ready-to-post comments with file and line | 1 per listed issue |

The agent still works through every check under Review Dimensions, but it reports only what it finds. A check with nothing to report does not appear in the output.

### Severity Scale

| Level | Meaning |
|---|---|
| **Critical** | Security issue, broken core production flow, or severe user-facing regression |
| **High** | Likely bug/regression with significant user or business impact |
| **Medium** | Real issue with moderate impact or unclear behavior — fix before merge |
| **Low** | Minor bug, maintainability concern, naming issue, or non-blocking cleanup |

### Trust Scoring

- Starts at **100 %** and subtracts based on findings
- Critical → heavy deduction
- High → clear deduction
- Medium → moderate deduction
- Low → light deduction
- Does not invent issues to balance the review

## Saved File Location

`qa-agent-hub/response/pr-review/YYYY-MM-DD-<slug>.md`

## Information Sources

| Source | Copilot path | Claude Code location |
|---|---|---|
| QA Core | `.github/instructions/qa-core.instructions.md` | `## QA Core Guidance` in `.claude/CLAUDE.md` |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | `## Documentation Output Guidance` in `.claude/CLAUDE.md` |
| Automation | `.github/instructions/automation.instructions.md` | `## Automation Guidance` in `.claude/CLAUDE.md` |
| Test Design | `.github/instructions/test-design.instructions.md` | `## Test Design Guidance` in `.claude/CLAUDE.md` |
