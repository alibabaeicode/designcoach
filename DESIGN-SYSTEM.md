# Ali Babaei Site — Design System

Source of truth for visual/content consistency across `index.html`, `services.html`, `about.html`, `book.html` and `css/style.css`. Update this file in the same commit as any visual/content change so it never drifts from the live code.

## Color tokens

All colors are CSS custom properties in `:root` (`css/style.css`) — never a raw hex value in markup or in any rule outside `:root`.

| Token | Value | Use |
|---|---|---|
| `--cream` | `#F7F5F0` | Page background |
| `--ink` | `#121212` | Text, borders, dark panels |
| `--yellow` | `#FFD400` | Accents, primary CTAs, highlight panels, error banner |
| `--body-copy` | `#3A3833` | Body copy on cream |
| `--muted` | `#6B6862` | Muted label/meta text on cream |
| `--index-gold` | `#B79A00` | Index numerals/accents on cream, nav active-page indicator, form focus state (darker yellow, AA on cream) |
| `--on-yellow-strong` | `#5C4E00` | Kicker/eyebrow text on yellow panels |
| `--on-yellow-body` | `#2B2400` | Body text on yellow panels |
| `--dark-muted-1` | `#C9C5BC` | Muted text on `--ink` panels (brightest tier) |
| `--dark-muted-2` | `#A8A49B` | Muted text on `--ink` panels (mid tier) |
| `--dark-muted-3` | `#E4E0D7` | Muted text on `--ink` panels (list items, brightest-but-one) |
| `--hairline-light` | `#D8D4CB` | Hairline dividers on cream (lighter than ink borders) |
| `--hairline-dark` | `#35332E` | Hairline dividers on `--ink` panels |
| `--blue` | `#0074C2` | Secondary accent — strong blue, AA on cream |

**Rule: never introduce a new color.** Every surface is cream, ink, or yellow; every panel's body text uses the muted variant already listed for that surface. `--blue` is used **only** for the small mono meta/index label at the right of section header rows (e.g. `01 / Engagements`, `2017 — Present`) and the "On Medium" link — frequent, low-emphasis elements, never on primary CTAs, headlines, or body copy. Do not extend it to buttons, panels, or large fills.

`rgba(255, 212, 0, 0.12–0.16)` (form focus backgrounds) is `--yellow` at reduced opacity, not a new color.

## Type

- Display/headings: `Archivo`, weight 900 (h1/h2) or 700 (h3), `text-transform: uppercase`, `letter-spacing: -0.02em to -0.035em`.
- Body: `IBM Plex Sans`, 400–600, 16–19px, `line-height: 1.5–1.65`.
- Eyebrows/meta/mono labels: `IBM Plex Mono`, 11–12px, `letter-spacing: 0.1–0.18em`, uppercase.

### Desktop type scale (locked — do not shrink)

| Use | Size |
|---|---|
| Home H1 (hero) | `clamp(52px, 6.5vw, 108px)` |
| Services H1 | `clamp(46px, 5.5vw, 88px)` |
| About H1 | `clamp(44px, 5vw, 78px)` |
| Footer wordmark | `clamp(32px, 4.4vw, 60px)` |
| Section H2 (teaser headers) | `clamp(30px, 3.4vw, 48px)` |
| Section H2 (fixed, list headers) | `34px` |
| Yellow CTA band H2 | `clamp(28px, 3vw, 44px)` |
| Booking success H3 | `38px` |
| Card H3 (offer/pillar) | `24–30px` |
| Card H3 (teach/consulting/article) | `20–22px` |
| Stat numeral | `54px` |
| Pillar index numeral | `46px` |
| Process step numeral | `46px` (34px ≤900px) |
| Body copy (hero/services/about intro) | `19px` |
| Body copy (booking intro) | `18px` |
| Body copy (list/card text) | `16–17px` |
| Mono eyebrow/meta | `11–12px` |

Mobile override (≤900px) only touches `h1` → `clamp(34px, 9vw, 60px)`; nothing else shrinks. Never lower a desktop value below what's listed here — if a section reads too large, resize its container/grid, not the type scale.

## Spacing & grid

- Section padding: `72–88px` vertical, `40px` horizontal (`.pad-lg` drops horizontal to `20px` ≤900px). The yellow CTA band is a deliberate exception at `64px` vertical (a compact banner, not a full section).
- Card/cell padding: `26–48px`.
- Gaps: `10–16px` tight groups, `22–34px` card internals, `48px` marquee.
- All multi-item rows use flex/grid + `gap`, never margin-spaced siblings.

## Structural motif — the ruled grid

Every section is boxed with `1px solid var(--ink)` hairlines: outer `border-bottom` between sections, inner `border` around card grids with shared borders between cells (`border-right`/`border-bottom` on cells, not double borders). This is the single unifying device of the design — preserve it on any new section (no shadows, no rounded corners, no floating cards).

Every grid container that should render as columns must be in the shared `display: grid` rule near the top of `css/style.css` (currently: `.hero-grid, .about-grid, .book-grid, .services-hero, .grid-2, .grid-3, .pillars-grid, .consulting-grid, .writing-grid`). A grid class defined only with `grid-template-columns` and no `display: grid` silently renders as a stacked block — this exact bug hit `.pillars-grid`, `.consulting-grid` and `.writing-grid` during development and is the most likely regression if a new 2-up/3-up grid is added without registering it here.

## Recurring components

- **Eyebrow + heading + meta-right header row** (`.section-head`): flex row, `justify-content: space-between`, bottom hairline — used atop every major section.
- **Numbered index cards**: large `Archivo 900` numeral in `--yellow` (outlined `-webkit-text-stroke: 1px var(--ink)` on cream cards), used for lists of 2–4 offerings (`.pillar-num`).
- **2-column card grid** (`.consulting-grid` + `.consulting-cell`): the general-purpose pattern for any list of items on About/Services — client-line (title + meta tag) followed by a paragraph, bottom hairline on every cell, no vertical divider between columns (padding alone separates them). Used for Consulting Selection, Product Design Experience, and Speaking & Panels (the latter two reuse this exact class pair rather than a bespoke "row" layout). When the item count is odd, the lone last cell spans the full width (`.consulting-grid > .consulting-cell:nth-child(odd):last-child { grid-column: 1 / -1; }`) so its divider isn't a dangling half-width line — this rule must travel with the component wherever it's reused.
- **Yellow panel card**: one card per 2-up grid inverted to `--yellow` background — used once per section max, for the coaching/CTA half.
- **Dark inverse band**: `--ink` background + `--cream` text — used for stats band, footer, booking form's left panel.
- **Hover-invert links/buttons**: default ink-on-cream or cream-on-ink; hover swaps to the opposite panel's palette (never a new color).
- **Marquee**: single-row infinite scroll of plain mono text, doubled array in markup, 38s linear.
- **Process row** (`.process-row` + `.process-num` + `.process-copy`): outlined numeral + title + note in one flex row, bottom hairline. On mobile the row wraps but `.process-copy h3` must keep `white-space: normal` (not `nowrap`) or a long title forces the whole copy block to a new line below the numeral instead of wrapping in place — this exact bug hit "Answers to initial questions."

## Layout classes (breakpoint hooks — do not rename)

`.hero-grid` `.about-grid` `.book-grid` `.services-hero` `.grid-2` `.grid-3` `.pillars-grid` `.consulting-grid` `.writing-grid` `.stats-grid` `.pad-lg` `.nav-links` `.nav-toggle`

Breakpoints:
- **900px**: all grid classes above collapse to 1 column; nav collapses to hamburger; side padding tightens to 20px; hero portrait hidden (`.hero-portrait { display: none; }`, About's `.about-portrait` stays visible); `stats-grid` goes 4→2 columns; `.grid-2` gains an explicit `border-top` + `28px` margin-top since its box no longer sits directly under a bordered header on narrow layouts.
- **560px**: `.stats-grid` goes 2→1 columns.

## Pages & sections (current inventory)

1. **Home** (`index.html`) — hero (headline + portrait), stats band (4 stats), client marquee, "Two ways I work" (services teaser), teaching & mentoring (3 cards), process (6-step engagement flow), booking form.
2. **Services** (`services.html`) — hero intro, Four Areas of Work (pillars, numbered, 2-column), CTA yellow band.
3. **About** (`about.html`) — bio + portrait, Consulting Selection (8 clients, 2-column), Product Design Experience (5 roles, 2-column), Speaking & Panels (5 entries, 2-column), Writing (2 Medium articles, 2-column). All four post-hero sections are 2-column card grids on desktop and single-column lists on mobile.
4. **Book** (`book.html`) — booking form only.

Footer (all pages): name, tagline, email, social links (LinkedIn/Dribbble/Behance/Medium), copyright.

## Content rules

- Every stat/number must be real (resume-sourced), no filler metrics.
- One CTA style per context: primary = yellow filled button, secondary = ink-outline button, tertiary = plain link with arrow `→`.
- Section eyebrow on the right always states either an index (`01 / Engagements`) or a date range — pick whichever is more informative, never both.

## Imagery

- Portrait treatment: full-bleed illustration, `object-fit: cover`, no border/ring/shadow.
- Home hero and About page use the same file (`assets/portrait-home.jpg`) so the two portraits stay in sync — if one changes, check whether the other should too.
- Logo mark (nav): `30px` circle, `object-fit: cover`, no border (`assets/logo-mark.jpg`).
- Home hero portrait is hidden on mobile (≤900px); About's portrait stays visible at all sizes.

## Forms & inputs (booking form, on Home + Book)

- Inputs: transparent background, `1px solid var(--ink)` bottom-border only (no full box), `18px` text; focus state darkens border to `--index-gold` + faint yellow wash `rgba(255,212,0,0.16)`.
- Textarea: full `1px solid var(--ink)` box (not underline-only), same focus treatment at `rgba(255,212,0,0.12)`.
- Topic chips: outline buttons, toggle to filled `--yellow` on `.is-selected` (JS-driven class toggle, not inline styles); selected values are collected into a hidden `topics` input so they submit with the form.
- Submit: primary yellow button (`.btn-submit`); success state hides the `<form>` (`hidden` attribute — note `.booking-form[hidden] { display: none; }` must stay explicit, since `.booking-form`'s own `display: flex` would otherwise beat the browser's default `[hidden]` rule) and shows `.booking-success`, a yellow confirmation card with a "send another" reset action.
- Error state (`.form-error`): yellow background, ink border and bold ink text — deliberately reuses the existing palette rather than introducing a red/error color, per the "never a new color" rule. Used for submission-level failures (network/Formspree errors).
- Field-level validation (`.field-error`): the `<form>` has `novalidate` so the browser's native tooltip never appears; `js/main.js` validates `[required]` fields itself (on blur, and on submit before the fetch call) and prints a small mono message below the field — "This field is required." / "Enter a valid email address." The invalid field's border thickens to `2px solid var(--ink)` (`.field.has-error`); no red anywhere. Errors clear live as the user corrects the field.
- First session is free — always state this in the booking copy.
- Submissions post to Formspree (`action="https://formspree.io/f/myeggnpv"` on the `<form>`); `js/main.js` intercepts with `fetch()` for the app-like success/error swap, using `Accept: application/json`.

## Navigation

- Desktop: inline nav row + filled "Book a session" pill, sticky header with blur backdrop.
- The current page's nav link gets `aria-current="page"`, styled in `--index-gold`. This exists because the site uses real multi-page routing (see "Known intentional deviations") — a single-page mock has no "current page" to indicate.
- ≤900px: nav collapses behind a 3-line hamburger (`.nav-toggle`) into a dropdown panel (`.nav-links.nav-open`); `js/main.js` toggles the class and closes it on any nav link click.

## Known intentional deviations

1. **Real multi-page routing** instead of a single-page app with client-side tab state. `index.html` / `services.html` / `about.html` / `book.html` are separate documents with real URLs (shareable, SEO-friendly, working back/forward), unlike the original Claude Design prototype which faked "pages" with JS state in one HTML file. Header/footer markup is duplicated across the four files as a result — there's no shared templating layer in a plain static site.
2. **Nav active-page indicator** (`--index-gold` on the current page's link) — new, required by real routing; didn't exist in the single-page mock.
3. **Form error state uses yellow/ink**, not a red — see Forms section above.

## File map

- `index.html`, `services.html`, `about.html`, `book.html` — the four real pages. Each duplicates the header/nav/footer markup.
- `css/style.css` — all styles: tokens, every page's layout, and the responsive overrides.
- `js/main.js` — mobile nav toggle + booking form (topic chips, submit/success/error handling). Shared by every page that has a `[data-booking-form]` block.
- `assets/` — `portrait-home.jpg` (Home hero + About portrait), `logo-mark.jpg` (nav mark).
- This file (`DESIGN-SYSTEM.md`) — update in the same commit as any visual/content change so it never drifts from the live files.
