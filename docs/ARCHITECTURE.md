# Architecture

## Load order

`index.html` loads, in this order: data → i18n → core → ui → components → pages → `app.js`. Everything is a classic script in one global scope. `npm run check` compiles them together to catch mistakes early.

## State (`S`)

| Group | Fields |
|---|---|
| Session | `lang` (`en`/`ar`), `role` (`seeker`/`provider`), `page`, `p` (page param), `hist` (back stack) |
| UI | `menu`, `nm` (notifications open), `modal` (HTML), `pm` (post-request dialog step), `drw` (service id open in drawer), `dr2` (drawer form), `fv` (filters visible), `f` (explore filters), `pq` (provider request filters), `bkp` (bookings tab), `rvn`/`rvd` (reviews shown) |
| Domain | `bk` bookings, `rq` requests, `of` offers, `th` threads, `nt` notifications, `rv` reviews, `saved`, `cmp` |
| Profiles | `sp` seeker profile, `pf` provider business profile, `pc` pricing rules, `av` weekly availability, `pw` portfolio |

## Entities

* **Service listing** (`SV[i]`): `id, pid` (provider id), `c` (service type index), `g` (group), `pv` (provider name), `city`, `sv` (cities served in person), `mode` (`in` / `online` / `both`), `price` (starting price, SAR), `r`, `n` (rating and review count), `yrs`, `proj`, `since`.
* **Booking**: `id, sid` (listing), `cust, date, time, loc` (`home` / `studio` / `online` / `auto`), `addr, notes, items` (price lines), `total`, `status`, `rev`.
* **Request**: `id, mine, by, t` ([en, ar] title), `c, city, date, b` (budget `{lo,hi}` or `{neg:1}`), `d` description, `rq` requirements, `mode`, `loc`, `att` (file names), `st`, `posted`.
* **Offer**: `id, rid, by, price, dur` (hours) or `days` (digital work), `loc, inc` (included items), `msg, r, n, st`.
* **Thread**: `sid, cust, prov, m` (messages: `text`, `file`, `quote`, `status` cards), `ur` (unread per role).
* **Notification**: `r` (role), `type` (`offer`, `accepted`, `completed`, `status`, `booking`, `review`), `x`, `at`, `s` (read), `p`/`a` (target page and param).

## Business rules encoded in the data layer (`js/data/catalog.js`)

* Only service types in `ONL` can be offered online; all others are in-person only.
* Location options depend on the type: `HOMEO` (at the client's location or venue), `VENUEO` (at a court / club), otherwise client place or provider studio.
* A listing is visible to a client in city *X* if it serves *X* in person (`sv`), or it can be delivered online. Local listings are sorted first.
* Booking in person requires the provider to serve the client's profile city (`canBook`).

## Rendering and focus

`render()` builds the page string, assigns it to `#app`, forces `dir="ltr"` on date and time inputs, restores focus and scroll, makes `header/main/footer` `inert` while a dialog or drawer is open, and focuses the first control inside it.
