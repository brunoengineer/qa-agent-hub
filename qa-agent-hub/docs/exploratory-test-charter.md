# Exploratory Test Charter

**Copilot prompt:** `#exploratory-test-charter` | **Claude Code command:** `/exploratory-test-charter`
**Copilot agent file:** `.github/agents/qa-exploratory-test-charter.agent.md`
**Copilot prompt file:** `.github/prompts/exploratory-test-charter.prompt.md`
**Claude Code command file:** `.claude/commands/exploratory-test-charter.md`

---

## Purpose

Creates a time-boxed exploratory test charter with risks, heuristics, and note-taking guidance. Helps a QA engineer execute a focused, structured exploratory session.

## How to Use

### GitHub Copilot
1. Open Copilot Chat in VS Code.
2. Type `#exploratory-test-charter` followed by the feature or risk area.

### Claude Code
1. Open Claude Code in the project root.
2. Type `/exploratory-test-charter` followed by the feature or risk area.

Both tools behave identically: send the command with no input to see the required format.

If you send the command with no input, it will ask:

```
Please provide:

- The feature, module, or risk area to explore
- Any environment, device, or user-role constraints
- Any recent changes or suspected weak points
```

## Required Input

| Field | Required | Description |
|---|---|---|
| Feature/risk area | Yes | What to explore |
| Constraints | Optional | Environment, device, or user-role constraints |
| Weak points | Optional | Recent changes or suspected problem areas |

## Output

A structured charter containing:

- **Mission** — what the session is trying to learn or break
- **Timebox** — suggested duration
- **Focus** — primary focus area
- **Target Risks** — list of risks to investigate
- **Test Setup** — environment, accounts, data, tools
- **Suggested Tours and Heuristics** — exploration strategies
- **Charter Scenarios** — numbered scenarios to try
- **What to Capture** — observations, logs, screenshots, metrics
- **Exit Conditions** — when to stop or escalate

### Output Template

```markdown
# Exploratory Test Charter - [Feature or Risk Area]

**Mission:** [What the session is trying to learn or break]
**Timebox:** [Suggested timebox]
**Focus:** [Primary focus area]

## Target Risks
- [Risk]
- [Risk]

## Test Setup
- [Environment]
- [Accounts, data, or devices]
- [Required tools or observability]

## Suggested Tours and Heuristics
- [Tour or heuristic]
- [Tour or heuristic]

## Charter Scenarios
1. [Scenario]
2. [Scenario]
3. [Scenario]

## What to Capture
- [Observation type]
- [Logs, screenshots, or metrics]
- [Unexpected behavior, inconsistencies, or dead ends]

## Exit Conditions
- [When to stop or escalate]
- [What constitutes a useful result]
```

## Saved File

| Property | Value |
|---|---|
| Directory | `qa-agent-hub/response/exploratory-test-charter/` |
| Filename | `YYYY-MM-DD-<slug>.md` |
| Condition | Only created when input is provided |

## Technical Information Sources

| Source | Copilot path | Claude Code location | Role |
|---|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | `## QA Core Guidance` in `.claude/CLAUDE.md` | QA tone, risk-based prioritization |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | `## Documentation Output Guidance` in `.claude/CLAUDE.md` | Markdown structure, filename conventions |
| Test Design Guidance | `.github/instructions/test-design.instructions.md` | `## Test Design Guidance` in `.claude/CLAUDE.md` | ISTQB techniques, exploratory vs deterministic distinction |
