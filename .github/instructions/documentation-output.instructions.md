---
description: "Use when producing Markdown QA deliverables or saving generated QA artifacts to files. Covers report design, length limits, headings, tables, filename slugs, date format, and keeping chat output aligned with saved content."
---
# QA Documentation Output Guidance

- Use concise Markdown with predictable section names.
- Keep the saved file content aligned with the final chat output unless the task explicitly requires extra file-only metadata.
- Use a single H1 title at the top of saved documents when a title is required.
- Use `YYYY-MM-DD-<slug>.md` for generated filenames.
- Keep slugs lowercase, short, and hyphenated.
- Use tables only when they improve scanning.
- Do not add filler sections that do not help execution or decision-making.

## Report Design Rules

Every report has the same shape, so a reader can stop as soon as they have what they need. An agent's own limits override these defaults.

- **Limits apply to the report, not the analysis.** Complete every step of the Analysis Process first, then choose what goes in the report. A short report must come from a full analysis.
- **Answer first.** After the H1, write one meta line (`**Field:** value · **Field:** value`), then the verdict or objective in a 1–2 sentence blockquote.
- **4 items per list at most.** Bullet, numbered, and checklist sections have 1–4 items, most important first, one idea per bullet, about 20 words at most, naming at most 3 things. Do not pack a list of topics into one bullet to stay under the limit.
- **8 rows per table at most.** Sort worst or riskiest first, and merge rows that say the same thing (for example, all passing areas in one row).
- **Never cut what blocks a decision.** Blockers, Critical and High findings, and failing tests are always listed, even past a limit.
- **Name what you cut.** If a cut item could change a decision, add one line under the list: `Left out: <topic>, <topic>.`
- **1 diagram at most.** Use Mermaid only when a flow, state, or dependency is clearer as a picture: 10 nodes at most, labels quoted like `id["label"]`, highlights that only change the border.
- **Emoji are status markers only.** Use ✅ ❌ ⚠️ ⏭️ for results. No decorative emoji in titles or headings.
- **Author to-dos stay in chat.** Unconfirmed assumptions, missing evidence, and split suggestions go in a chat-only **Before you post** list of at most 4 bullets, not in the saved file.
