# Jira Bug

**Copilot prompt:** `#jira-bug` | **Claude Code command:** `/jira-bug`
**Copilot agent file:** `.github/agents/qa-jira-bug.agent.md`
**Copilot prompt file:** `.github/prompts/jira-bug.prompt.md`
**Claude Code command file:** `.claude/commands/jira-bug.md`

---

## Purpose

Creates a complete, Jira-ready bug ticket from a free-form issue description. The agent acts as a Senior QA Engineer, expanding raw observations into structured defect reports with reproducible steps.

## How to Use

### GitHub Copilot
1. Open Copilot Chat in VS Code.
2. Type `#jira-bug` followed by your issue description.
3. If you send `#jira-bug` with no input, the agent will ask:

### Claude Code
1. Open Claude Code in the project root.
2. Type `/jira-bug` followed by your issue description.
3. If you send `/jira-bug` with no input, the command will ask:

```
Please describe the issue:

- What happened?
- What did you expect?
- Steps to reproduce (if known)
```

Both tools behave identically: send the command with no input to see the required format.

## Required Input

| Field | Required | Description |
|---|---|---|
| What happened | Yes | Observable symptom or defect |
| Expected result | Yes | What the correct behavior should be |
| Steps to reproduce | Recommended | Ordered steps to trigger the issue |
| Environment | Optional | Browser, device, release — inferred if not provided |

## Output

The agent completes a full Analysis Process first. The limits below apply to the printed report, not to that analysis.

A one-screen ticket of about 200 words, not counting the diagram. See the [example](../examples/jira-bug.md). The exact template is in the command file.

| Part | Content | Limit |
|---|---|---|
| **Title** | The observable problem | 1 line |
| **Meta line** | Priority · Environment · Component · Labels | 4 labels |
| **Description** | What is wrong, who is affected, why it matters | 2 sentences |
| **Steps to Reproduce** | Preconditions when needed, then numbered steps | 6 steps |
| **Expected vs Actual** | One line each, with the exact error text | 2 lines |
| **In Scope** | What the fix must cover | 4 bullets |
| **Out of Scope** | Related behavior this ticket does not change | 4 bullets |
| **Acceptance Criteria** | Observable results that prove the fix | 4 bullets |
| **Diagram** | Optional Mermaid flow when the failure crosses components or depends on state | 1 diagram, 10 nodes |

Evidence to attach (screenshots, logs) and assumptions to confirm appear in chat under **Before you post** and are not saved to the file.

GitHub and GitLab render Mermaid. Jira needs a Mermaid app for that. Without one, the block shows as text.

## Saved File

| Property | Value |
|---|---|
| Directory | `qa-agent-hub/response/jira-bug/` |
| Filename | `YYYY-MM-DD-<slug>.md` |
| Condition | Only created when input is provided |

## Technical Information Sources

| Source | Copilot path | Claude Code location | Role |
|---|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | `## QA Core Guidance` in `.claude/CLAUDE.md` | QA tone, specificity, risk-based prioritization, assumptions handling |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | `## Documentation Output Guidance` in `.claude/CLAUDE.md` | Markdown structure, filename slugs, date format, heading standards |
| Jira QA Guidance | `.github/instructions/jira.instructions.md` | `## Jira QA Guidance` in `.claude/CLAUDE.md` | Severity vs priority, labels, reproduction quality, expected vs actual |
