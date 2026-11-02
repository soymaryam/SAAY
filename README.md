# SAAY | سعي

A bilingual (English / Arabic, LTR / RTL) front-end prototype of **SAAY**, a Saudi service marketplace that connects people who need a service with local providers.

* **Service seekers** browse and book services, or post a custom request and compare the offers they receive.
* **Service providers** publish services, answer open requests with offers, manage bookings, their calendar, pricing and reviews.

One demo account can switch between both roles from the avatar menu.

> **Tech stack:** plain HTML, CSS and JavaScript. There is **no framework, no bundler and no build step**. The project was not built with React, so there is no component framework to preserve; the structure below is the original one.

---

## Run it locally

You need nothing installed to try it:

1. **Quickest:** double-click `index.html` (works from `file://`).
2. **With a local server (recommended):**
   * Node 18+: `npm start`, then open <http://localhost:8080> (a dependency-free static server in `scripts/serve.js`; pass another port with `npm start -- 3000`).
   * or Python: `python3 -m http.server 8080`
   * or VS Code "Live Server".

Fonts (Cormorant Garamond, Inter, Tajawal) load from Google Fonts. Offline, the browser falls back to system fonts and everything still works.

### Other commands

| Command | What it does |
|---|---|
| `npm start` | Static dev server on port 8080 |
| `npm run check` | Compiles every script listed in `index.html` as one program (catches syntax errors and duplicate declarations) |
| `npm run build` | Writes `dist/saay.html`, a single self-contained file (CSS, JS and logos inlined) |
| `npm test` | Headless smoke test (needs `pip install playwright && playwright install chromium`) |

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository (branch `main`).
2. In the repository go to **Settings → Pages → Source → GitHub Actions**.
3. The included workflow `.github/workflows/pages.yml` publishes the site on every push. (You can also choose "Deploy from a branch" and select `main` / root. `.nojekyll` is included.)

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

### Important: scripts share one global scope

The files are **classic scripts** (not ES modules), loaded in the order listed in `index.html`. They share one global scope on purpose: it keeps the project runnable by double-clicking `index.html`, and inline `onclick="…"` handlers can call the functions directly. If you add a file, add its `<script>` tag in dependency order (data → core → ui → components → pages → `app.js` last).

## How it works (short version)

* **State:** one object, `S` (`js/data/state.js`). Pages are functions that return an HTML string (`home()`, `explore()`, …).
* **Rendering:** `render()` in `js/app.js` rebuilds the page from `S` after every action, then restores scroll and focus. Dialogs and the booking drawer are layered on top, and the page behind them is made `inert`.
* **Navigation:** `go('page', param)`. `go('service', id)` opens the owning provider's profile with the booking drawer open (there is no standalone service page).
* **Roles:** `S.role` is `'seeker'` or `'provider'`; `setRole()` switches. Each role has its own navigation, home, bookings and requests views.
* **Languages:** `S.lang` is `'en'` or `'ar'`. `t('key')` reads `js/i18n/translations.js`; `x('English', 'عربي')` is used for one-off strings. `<html dir>` flips to RTL, and the CSS uses logical properties so no second stylesheet is needed.
* **Data:** about 360 generated service listings across 55 service types and 60 Saudi cities, plus seeded bookings, requests, offers, conversations and notifications. All people, businesses, reviews and prices are **fictional sample data**.

More detail: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md), [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md), [`docs/GLOSSARY.md`](docs/GLOSSARY.md).

## Common tasks

* **Add a service type:** add it to its group string in `js/data/taxonomy.js` (`English|Arabic`, separated by `;`). If it can be done remotely, add its English name to `ONL` in `js/data/catalog.js`; if it always happens at the client's location/venue, add it to `HOMEO`; if it happens at a club or court, add it to `VENUEO`. Add an optional price in `PRC` and unit in `UOV`.
* **Add a city:** append `English|Arabic` to `js/data/geo.js`. To make nearby cities share providers, add them to a group in the `MG` list in `js/data/catalog.js`.
* **Add or change text:** edit `js/i18n/translations.js` (both languages).
* **Change brand colours:** edit the tokens on `:root` at the top of `css/styles.css` (a dark-mode set follows it).

## Known limitations

* **Prototype only:** state lives in memory; reloading the page resets it. There is no backend, authentication, or payment integration. Prices are shown but nothing is charged.
* Some actions are simulated for demonstration: offers arrive a few seconds after you post a request, and providers accept some bookings automatically.
* Portfolio and service images are colour tiles with icons; there is no photography or file upload storage.
* The date picker in the booking drawer is custom (to avoid right-to-left problems in native date fields); other date fields use the browser's native input.

## Browser support

Current Chrome, Edge, Safari and Firefox. Uses CSS `color-mix()`, `:has()`, logical properties and `inert`.

## License

No license has been chosen yet. Add a `LICENSE` file before making the repository public.
