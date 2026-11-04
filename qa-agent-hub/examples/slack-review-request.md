# Slack Review Request - SHOP-1234: Fix broken payment widget tests in checkout

```text
*Review request:* SHOP-1234: Fix broken payment widget tests in checkout
https://github.com/example/shop/pull/1482

*What:* Repairs the 4 failing payment widget tests in checkout.
*Why:* The payment iframe wrapper was renamed, so every test failed before reaching the widget.
*How:* Updates one iframe selector in the page object and opens the New card tab first on mobile. Tested on staging: 4/4 passing on desktop and mobile.
```
