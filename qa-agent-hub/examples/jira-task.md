# 🧪 Update E2E Tests for Offer & Bonus Preview Cards After List Component Feature Configs

**Type:** Task
**Priority:** High
**Estimate:** 3–5 days
**Component:** Offer & Bonus Preview Cards (List Components)

---

### Description
The FE team is rolling out feature config changes to the list components, which directly impact the **Offer** and **Bonus preview cards**. These changes affect the information displayed on the cards and the API endpoints they consume. As a result, the existing Playwright E2E test suite will break or produce false results if not updated in sync with the FE release.

This task covers updating all affected E2E tests, test fixtures, and configuration files to align with the new component behavior, data contracts, and endpoints.

### 📋 Acceptance Criteria
- [ ] All existing E2E tests covering Offer preview cards pass against the updated FE build
- [ ] All existing E2E tests covering Bonus preview cards pass against the updated FE build
- [ ] Test fixtures are updated to reflect new data shapes / endpoint responses
- [ ] Test config files are updated for any changed routes, feature flags, or environment variables
- [ ] No hardcoded values remain that reference deprecated endpoints or removed card fields
- [ ] New or changed card information fields have explicit assertions
- [ ] Test run produces zero false negatives related to the list component changes
- [ ] Any removed card fields are no longer asserted in tests
- [ ] CI pipeline runs green on the feature branch before merge

### 🔧 Implementation Notes
1. **Coordinate with FE team** – Obtain the list of specific changes: renamed/removed fields, new fields, updated endpoints, and any new feature flag keys.
2. **Endpoint updates** – Locate all mocked or intercepted API calls for offer/bonus list endpoints. Update request URLs, query parameters, and response payloads in fixtures.
3. **Fixture data** – Regenerate or manually update JSON fixture files to match the new API contracts. Validate against the actual API response schema if available.
4. **Selectors & assertions** – Audit selectors targeting card content (titles, labels, amounts, status badges, CTAs). Update any that reference changed DOM structure or text.
5. **Feature config / flags** – If new feature flags gate the updated cards, add the flags to the test config so tests run with the correct feature state.
6. **Regression sweep** – Run the full list-component test suite locally before pushing to confirm no collateral breakage.

### 📁 Suggested Scope
- **Tests to modify:** All Playwright spec files covering Offer list and Bonus list views (e.g., `offer-list.spec.ts`, `bonus-list.spec.ts`, or equivalent)
- **Fixtures to update:** API response fixtures for offer/bonus list and detail endpoints
- **Configs to update:** Feature flag configs, base URL mappings, environment-specific settings
- **Test types:** E2E (primary), smoke tests if they cover list views
- **Coverage expectation:** Maintain or improve existing coverage — every changed field/endpoint must have at least one assertion

### 🏷️ Labels
`qa`, `automation`, `e2e`, `playwright`, `offer`, `bonus`, `list-components`, `test-update`
