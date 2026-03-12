---
description: "Use when creating automation tasks, automation gap analysis, or future test-writing workflows. Covers maintainability, deterministic test design, selectors, fixtures, test data, and scope boundaries."
---
# QA Automation Guidance

- Prefer maintainable tests over broad but fragile coverage.
- Reuse existing fixtures, page objects, helpers, and setup flows before suggesting new abstractions.
- Design tests to be deterministic, isolated, and environment-aware.
- Call out test-data dependencies and cleanup requirements.
- Prefer stable selectors and clear assertion points.
- Separate product defects from flaky automation, environment issues, and bad test data.
- Recommend automation only where the scenario is repeatable and worth the maintenance cost.
