# Design system

All tokens are CSS custom properties on `:root` in `css/styles.css`; a dark set is applied through `prefers-color-scheme`.

## Colour

| Token | Light | Use |
|---|---|---|
| `--br` | `#6A4530` | Brand brown: primary buttons, active states |
| `--cr` | `#FAF6EE` | Page background |
| `--wh` | `#FFFDF9` | Cards and inputs |
| `--sd` | `#F2EDE4` | Soft surfaces, tiles |
| `--ink` / `--mu` | `#2E2018` / `#6E5C50` | Text / secondary text |
| `--ln` | `#E6DCCB` | Borders |
| `--ok` / `--bad` | `#4C6B45` / `#9A3B2E` | Success / destructive |

## Typography

* Display (page titles, hero): Cormorant Garamond. Section headings and UI: Inter. Arabic: Tajawal throughout.
* Scale: page title 34px, section heading 20–22px, card title 17px, body 15px, small 13px.

## Components (class → purpose)

`.b` button (`.o` outline, `.s` small, `.d` destructive) · `.chip` filter / toggle pill · `.st` status badge (`.ok .w .bad`) · `.bx` panel · `.card` content card · `.gx` / `.gc` / `.gp` grids · `.tabs` / `.vt` tabs and chip tabs · `.ov` + `.md` dialog · `.ov2` + `.drw` slide-over drawer · `.stp2` labelled stepper · `.fcard` filter panel · `.pbanner` provider banner · `.top2` About + Details row · `.ts` toast · `.bd` count badge.

## Patterns

* **Page header:** `.pt` title on the left, the page's single primary action on the right.
* **Profile pages:** header (avatar, name, subtitle, actions) → facts strip → About + Details row → full-width sections.
* **Actions:** primary first, secondary next, destructive last and outlined in red. Destructive actions always ask for confirmation (`cfm()`).
* **Status badge:** always top-right of its card header (`.hd2`).
* **Accessibility target:** WCAG 2.2 AA: visible focus ring, labelled controls, dialogs with focus management and `inert` background, `aria-live` toasts, `aria-current`/`aria-selected` on navigation and tabs, reduced-motion support.
