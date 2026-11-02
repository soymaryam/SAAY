# SAAY | سعي

Saudi service marketplace that connects people who need a service with local providers.

* **Service seekers** browse and book services, or post a custom request and compare the offers they receive.
* **Service providers** publish services, answer open requests with offers, manage bookings, their calendar, pricing and reviews.

One demo account can switch between both roles from the avatar menu.

> **Tech stack:** plain HTML, CSS and JavaScript. There is no framework, no bundler and no build step. The project was not built with React, so there is no component framework to preserve; the structure below is the original one.

---

## Project structure

```
index.html              Entry page: loads css/styles.css and the scripts below, in order
css/styles.css          Design tokens (light + dark) and all component styles
assets/logo/            SAAY logo: symbol, wordmark and lockup, brown and cream versions (PNG, transparent)
js/
  i18n/translations.js    UI strings: key → [English, Arabic]
  data/                   Taxonomy, cities, constants, name pools, sample copy,
                          service catalogue generator, application state, seed data
  core/                   Helpers (DOM, formatting, i18n), status glossary + transitions,
                          selectors, navigation / role / language switching, notifications
  ui/                     Icons and logo
  components/             Header, service card, request & job cards, shared primitives
  pages/                  home, explore, booking-drawer, provider-profile, post-request,
                          bookings, requests, messages, seeker-profile, business, dashboard
  app.js                  Page registry, footer, render loop, global listeners, boot
scripts/                serve.js, check-syntax.js, build-single-file.js
tests/smoke_test.py     Headless Playwright smoke test
docs/                   ARCHITECTURE.md, DESIGN_SYSTEM.md, GLOSSARY.md
```

* The date picker in the booking drawer is custom (to avoid right-to-left problems in native date fields); other date fields use the browser's native input.

## Browser support

Current Chrome, Edge, Safari and Firefox. Uses CSS `color-mix()`, `:has()`, logical properties and `inert`.
