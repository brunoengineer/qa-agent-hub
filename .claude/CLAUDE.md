# QA Agent Hub — Claude Code Instructions

## Workspace Defaults

- Generated outputs go under `qa-agent-hub/response/`.
- Use `YYYY-MM-DD-<slug>.md` for generated filenames (slugs: lowercase, hyphenated).
- Be specific and actionable.
- Prioritize by risk and business impact.
- Use concise Markdown outputs with strong structure.
- Infer reasonable QA assumptions when safe; ask only when a missing detail would change the outcome materially.

---

## QA Core Guidance

- Be concrete and action-oriented.
- Prioritize by customer impact, business risk, and execution risk.
- Prefer precise observations over generic wording.
- Infer reasonable QA assumptions when the missing detail does not materially change the output.
- Ask for more input only when a missing detail would change scope, priority, or the recommendation.
- Call out important assumptions when they influence the result.
- Keep outputs usable by developers, QAs, and product stakeholders without extra rewriting.

---

## Documentation Output Guidance

- Use concise Markdown with predictable section names.
- Keep the saved file content aligned with the final chat output unless the task explicitly requires extra file-only metadata.
- Use a single H1 title at the top of saved documents when a title is required.
- Use `YYYY-MM-DD-<slug>.md` for generated filenames.
- Keep slugs lowercase, short, and hyphenated.
- Use tables only when they improve scanning.
- Do not add filler sections that do not help execution or decision-making.

### Report Design Rules

Every report has the same shape, so a reader can stop as soon as they have what they need. A command's own limits override these defaults.

- **Limits apply to the report, not the analysis.** Complete every step of the Analysis Process first, then choose what goes in the report. A short report must come from a full analysis.
- **Answer first.** After the H1, write one meta line (`**Field:** value · **Field:** value`), then the verdict or objective in a 1–2 sentence blockquote.
- **4 items per list at most.** Bullet, numbered, and checklist sections have 1–4 items, most important first, one idea per bullet, about 20 words at most, naming at most 3 things. Do not pack a list of topics into one bullet to stay under the limit.
- **8 rows per table at most.** Sort worst or riskiest first, and merge rows that say the same thing (for example, all passing areas in one row).
- **Never cut what blocks a decision.** Blockers, Critical and High findings, and failing tests are always listed, even past a limit.
- **Name what you cut.** If a cut item could change a decision, add one line under the list: `Left out: <topic>, <topic>.`
- **1 diagram at most.** Use Mermaid only when a flow, state, or dependency is clearer as a picture: 10 nodes at most, labels quoted like `id["label"]`, highlights that only change the border.
- **Emoji are status markers only.** Use ✅ ❌ ⚠️ ⏭️ for results. No decorative emoji in titles or headings.
- **Author to-dos stay in chat.** Unconfirmed assumptions, missing evidence, and split suggestions go in a chat-only **Before you post** list of at most 4 bullets, not in the saved file.

---

## Test Design Guidance

- Apply risk-based thinking first: protect critical paths, critical states, and critical integrations.
- Cover happy path, alternate flows, negative scenarios, and edge conditions.
- Use ISTQB-aligned techniques where relevant: equivalence partitioning, boundary value analysis, decision tables, state transitions, and error guessing.
- Keep test steps executable and expected results observable.
- Prefer traceable coverage: tie test ideas back to requirements, states, or user outcomes.
- Call out meaningful exclusions instead of implying full coverage.
- Distinguish exploratory ideas from deterministic regression coverage.

---

## Jira QA Guidance

- Titles should describe the observable problem or task outcome clearly.
- Distinguish impact from urgency when choosing priority.
- Bugs should state expected result, actual result, and reliable reproduction steps.
- Include environment details only when they help narrow the issue.
- Acceptance criteria should be specific, testable, and written so another QA can verify them.
- Labels should reflect capability, component, and work type without becoming noisy. Use 4 at most.
- Cosmetic issues should not be overstated unless they create clear user risk or brand risk.
- Every ticket has a Description, In Scope, Out of Scope, and Acceptance Criteria. Add a Mermaid diagram only when it explains the issue better than text.
- In Scope, Out of Scope, and Acceptance Criteria have at most 4 bullets each, most important first.
- When a ticket needs more than 4 acceptance criteria, suggest splitting it instead of adding bullets.

---

## Automation Guidance

- Prefer maintainable tests over broad but fragile coverage.
- Reuse existing fixtures, page objects, helpers, and setup flows before suggesting new abstractions.
- Design tests to be deterministic, isolated, and environment-aware.
- Call out test-data dependencies and cleanup requirements.
- Prefer stable selectors and clear assertion points.
- Separate product defects from flaky automation, environment issues, and bad test data.
- Recommend automation only where the scenario is repeatable and worth the maintenance cost.
