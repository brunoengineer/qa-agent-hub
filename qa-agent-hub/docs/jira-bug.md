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

A structured Markdown bug ticket containing:

- **Title** with bug emoji (`🐛`)
- **Priority**, **Environment**, **Component**
- **Description** — expanded context about the affected feature/flow
- **Expected Result** / **Actual Result**
- **Steps to Reproduce** — numbered and executable
- **Reproduction Tips** — browser, data, timing notes
- **Screenshots** — suggestions for what to capture
- **Labels** — `bug`, component, and priority tags

### Output Template

```markdown
# 🐛 [Brief title describing the bug]

**Priority:** High/Medium/Low
**Environment:** (infer or ask if critical)
**Component:** (infer from description)

---

### Description
[Expand on what the user described]

### ✅ Expected Result
[What should happen]

### ⛔ Actual Result
[What actually happens]

### 🔄 Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

### 💡 Reproduction Tips
- Browser/device if relevant
- Specific data or account state needed

### 📸 Screenshots
[Suggest what screenshots would be helpful]

### 🏷️ Labels
`bug`, `[component]`, `[priority]`
```

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
