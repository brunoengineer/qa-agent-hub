# Test Approach

**Copilot prompt:** `#test-approach` | **Claude Code command:** `/test-approach`
**Copilot agent file:** `.github/agents/qa-test-approach.agent.md`
**Copilot prompt file:** `.github/prompts/test-approach.prompt.md`
**Claude Code command file:** `.claude/commands/test-approach.md`

---

## Purpose

Generates a short, effective test approach document from a Jira ticket or feature description. Covers objective, scope, test levels, techniques, environment, data, risks, and exit criteria.

## How to Use

### GitHub Copilot
1. Open Copilot Chat in VS Code.
2. Type `#test-approach` followed by a Jira ticket or feature description.

### Claude Code
1. Open Claude Code in the project root.
2. Type `/test-approach` followed by a Jira ticket or feature description.

Both tools behave identically: send the command with no input to see the required format.

If you send the command with no input, it will ask:

```
Please provide the ticket or feature description:

- Paste the Jira ticket content
- Or describe what needs to be tested
```

## Required Input

| Field | Required | Description |
|---|---|---|
| Ticket or feature description | Yes | Jira ticket content or feature description |

## Available Test Environment

The agent considers these tools when suggesting test environments:

| Tool | Purpose |
|---|---|
| **Postman** | API request/response testing with automated tests |
| **Bender** | Test casino for game launcher and transactions |
| **Kibana** | Log analysis and monitoring |
| **BO (BackOffice)** | Verify transactions, Freebets, round details, game list |

## Output

A structured test approach with emoji section headers:

- 🎯 **Objective** — what needs validation, referencing acceptance criteria
- 📋 **Test Scope** — focus, components, exclusions
- 🔍 **Test Levels** — unit, component, integration, system, usability, performance, regression
- 🧪 **Test Techniques** — equivalence partitioning, boundary value analysis, positive/negative, exploratory, state transition
- 🖥️ **Test Environment** — which tools will be used and how
- 📝 **Test Data Requirements**
- ⚠️ **Risk-Based Testing** — high/medium priority risks and mitigation
- ✅ **Exit Criteria** — pass rate, defect threshold, coverage requirement

### Output Template

```markdown
# Test Approach - <Feature/Ticket>

🎯 Objective
[Clear statement of what needs to be validated]

📋 Test Scope
**Focus:** [Main area]
**Components:** [Specific components]
**Exclusions:** [Out of scope]

🔍 Test Levels
- **Integration Testing:** [...]
- **System Testing:** [...]
- **Regression Testing:** [...]

🧪 Test Techniques
- **Equivalence Partitioning:** [...]
- **Boundary Value Analysis:** [...]
- **Positive/Negative Testing:** [...]

🖥️ Test Environment
[Tools and how they will be used]

📝 Test Data Requirements
[Specific data needed]

⚠️ Risk-Based Testing
**High Priority:** [Critical risks]
**Medium Priority:** [Secondary concerns]
**Mitigation:** [How risks will be addressed]

✅ Exit Criteria
- [Pass rate requirement]
- [Defect severity threshold]
- [Coverage requirement]
```

## Saved File

| Property | Value |
|---|---|
| Directory | `qa-agent-hub/response/test-approach/` |
| Filename | `YYYY-MM-DD-<slug>.md` |
| File starts with | `# Test Approach - <Feature/Ticket>` |
| Condition | Only created when input is provided |

## Technical Information Sources

| Source | Copilot path | Claude Code location | Role |
|---|---|---|---|
| QA Core Guidance | `.github/instructions/qa-core.instructions.md` | `## QA Core Guidance` in `.claude/CLAUDE.md` | QA tone, risk-based prioritization |
| Documentation Output | `.github/instructions/documentation-output.instructions.md` | `## Documentation Output Guidance` in `.claude/CLAUDE.md` | Markdown structure, filename conventions |
| Test Design Guidance | `.github/instructions/test-design.instructions.md` | `## Test Design Guidance` in `.claude/CLAUDE.md` | ISTQB techniques, risk-based design, traceability |
| Jira QA Guidance | `.github/instructions/jira.instructions.md` | `## Jira QA Guidance` in `.claude/CLAUDE.md` | Used when the input comes from a Jira ticket |
