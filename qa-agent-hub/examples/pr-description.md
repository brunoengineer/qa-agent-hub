# GX-5329: Fix broken Exalogic tests on StarCasino

**Ticket:** GX-5329 · **Type:** Test fix · **Risk:** Low (page object only, verified on prod desktop + mobile)

All four Exalogic sportsbook tests were failing on StarCasino with `element(s) not found`. The ticket listed four bad locators, but the real cause was one renamed element around the sportsbook iframe, plus a different default view on mobile. Fixing the iframe selector unblocks all four tests. The inner locators were already correct.

| Before | After |
|---|---|
| 4 / 4 failing (scheduled run 2026-10-05) | 4 / 4 passing on prod, desktop + mobile |

## Root cause

### 1. The iframe wrapper was renamed (all 4 tests)

Every locator reaches into the sportsbook through the same iframe selector. That selector no longer matched anything, so every check inside the iframe failed, even though the inner elements were still there.

| | Selector | Matches |
|---|---|---|
| Old | `gaming-exalogic_iframe_container>iframe` | 0 |
| New | `gaming-integrations-exalogic iframe` | 1 |

Current structure on the page:

```
www.starcasino.it/scommesse
└─ <gaming-integrations-exalogic>
   └─ #shadow-root (open)
      └─ iframe  /api/v1/Gamelauncher?gameId=exalogicSportsbook
         └─ div#exa-sportAppContainer
            └─ #sidebar-sx, .swiper-wrapper, .live-matches, #xs_sportMenu ...
```

The iframe now sits inside the host element's shadow DOM. Playwright CSS selectors pierce open shadow roots, so the new selector works with `frameLocator`. Once the iframe was reachable, every existing inner selector matched.

Each test failed at its first check inside the iframe:

| Test | Ticket said | First check | Real cause |
|---|---|---|---|
| Desktop `/scommesse` | Bad locator | `#sidebar-sx` | Wrapper renamed |
| Desktop `/scommesse-live` | Bad locator | `.icons-slider-container` | Wrapper renamed |
| Mobile `/scommesse` | Swiper missing | `.swiper-wrapper` | Wrapper renamed + mobile view change |
| Mobile `/scommesse-live` | Bad locator | `#xs_sportMenu` | Wrapper renamed |

### 2. Mobile opens the Calcio view, not Home Sport (mobile `/scommesse` only)

A fresh mobile load of `/scommesse` opens the **Calcio** view, which has no live matches block. The live block (`.c_68` with `.c_15_5` match rows) only exists on the **Home Sport** view. The selectors were correct, but the test was checking a different screen.

## Changes

One file: `pageObjects/sportsbookExalogicPageObject.ts`

1. **Point at the new iframe wrapper.** Replaces `gaming-exalogic_iframe_container>iframe` with `gaming-integrations-exalogic iframe`. Fixes all four tests.
2. **Tap Home Sport on mobile before checking live matches**, inside `verifyLiveMatchesVisible()`. The selector uses the bottom-nav id and icon (same style as the existing betslip button), so it doesn't depend on Italian text.

**Unchanged:** the spec, the fixtures, every other selector, and the mobile betslip check (`#betslip-overlay` still appears after tapping Schedina).

## Verification

Run locally on prod, logged in, one worker:

```bash
brand=starcasino environment=prod npx playwright test tests/FrontendE2E/sportsbookLobby.spec.ts -g "Exalogic" --workers=1
```

| Project | Test | Result | Time |
|---|---|---|---|
| starcasino-prod-setup | authenticate | ✅ Pass | 5.0s |
| starcasino-prod-desktop | Exalogic sportsbook lobby | ✅ Pass | 19.7s |
| starcasino-prod-desktop | Exalogic Live Betting lobby | ✅ Pass | 13.3s |
| starcasino-prod-mobile | Exalogic sportsbook lobby | ✅ Pass | 17.4s |
| starcasino-prod-mobile | Exalogic Live Betting lobby | ✅ Pass | 17.1s |

TypeScript and ESLint pass on the changed file.

**Not covered:** other brands and non-prod environments. Only StarCasino prod was run.

## Notes for reviewers

- **Where to look:** the iframe selector and the new Home Sport tap in `verifyLiveMatchesVisible()`. Nothing else in the file changed.
- **Low footprint on prod:** one worker means two logins in total. No bets or odds selections, only page loads, the Home Sport tap and an empty betslip.
- **Live data dependency:** the live match checks (desktop, and mobile after the tap) still need live events at run time. That was already the case before this change.
- **If it breaks again:** if every test fails at its first check inside the iframe, check the wrapper element before changing the inner locators.
