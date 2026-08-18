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
| `--error` | `#B3261E` | Field-level validation errors only (text, border, chip outline) |

**Rule: never introduce a new color without a narrow, explicit, documented scope.** Every surface is cream, ink, or yellow by default; every panel's body text uses the muted variant already listed for that surface. The two exceptions, and *only* these two:
- `--blue` — **only** the small mono meta/index label at the right of section header rows (e.g. `01 / Engagements`, `2017 — Present`) and the "On Medium" link. Never on primary CTAs, headlines, or body copy.
- `--error` — **only** the booking form's field-level validation state (`.field-error` text, `.field.has-error` input/textarea border, `.field.has-error .topic-chip` outline). Never on the form-level submission-failure banner (`.form-error`, still yellow/ink), never elsewhere on the site.

Do not extend either color to buttons, panels, headlines, or large fills, and do not add a third without updating this rule explicitly.

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

- Section padding: `72–88px` vertical, `40px` horizontal (`.pad-lg` drops horizontal to `20px` ≤900px). The yellow CTA band is a deliberate exception at `64px` vertical (a compact banner, not a full section). `.hero-copy` stays inside this range on both edges (`88px` top and bottom) — don't push either past `88px` even to fix a spacing complaint; fix the row's height instead (see below).
- Card/cell padding: `26–48px`.
- Gaps: `10–16px` tight groups, `22–34px` card internals, `48px` marquee.
- All multi-item rows use flex/grid + `gap`, never margin-spaced siblings.
- **Viewport-floored hero row** (desktop only, currently scoped to `.hero-grid:has(#system-loop)`): `min-height: calc(100vh - 72px)` on `.hero-grid`, plus `min-height: 680px` on `.hero-portrait`. Use `min-height` only, never a hard `height` — a hard `height` leaves no slack for `.hero-copy`'s bottom padding when its content is tall, crowding the CTAs against whatever follows. `72px` is the sticky header's rendered height; if the header's padding ever changes, update the `calc()` too. `.hero-portrait` deliberately has **no** `max-height`: with it removed, the grid's default `align-items: stretch` makes `.hero-portrait` match whichever column is naturally taller — normally `.hero-copy`'s text (its own aspect-ratio-driven height, from the SVG's cropped `viewBox`, stays comfortably under the text column's height at realistic desktop widths, so text drives the row and the animation stretches to match, not the other way round). If a future edit to the SVG's crop or the copy makes the animation the taller column instead, re-check this balance rather than reaching for `max-height` again — that's what caused the "animation stuck near the top with the text column running taller and overflowing past it" bug this replaced.

## Structural motif — the ruled grid

Every section is boxed with `1px solid var(--ink)` hairlines: outer `border-bottom` between sections, inner `border` around card grids with shared borders between cells (`border-right`/`border-bottom` on cells, not double borders). This is the single unifying device of the design — preserve it on any new section (no shadows, no rounded corners, no floating cards).

Every grid container that should render as columns must be in the shared `display: grid` rule near the top of `css/style.css` (currently: `.hero-grid, .about-grid, .book-grid, .services-hero, .grid-2, .grid-3, .pillars-grid, .consulting-grid, .writing-grid`). A grid class defined only with `grid-template-columns` and no `display: grid` silently renders as a stacked block — this exact bug hit `.pillars-grid`, `.consulting-grid` and `.writing-grid` during development and is the most likely regression if a new 2-up/3-up grid is added without registering it here.

## Recurring components

- **Eyebrow + heading + meta-right header row** (`.section-head`): flex row, `justify-content: space-between`, bottom hairline — used atop every major section.
- **Numbered index cards**: large `Archivo 900` numeral in `--yellow` (outlined `-webkit-text-stroke: 1px var(--ink)` on cream cards), used for lists of 2–4 offerings (`.pillar-num`).
- **2-column card grid** (`.consulting-grid` + `.consulting-cell`): the general-purpose pattern for any list of items on About/Services — client-line (title + meta tag) followed by a paragraph, bottom hairline on every cell, `border-right` divider between columns (removed on the right-column cell via `:nth-child(2n)`, and on mobile where the grid is one column). Used for Consulting Selection, Product Design Experience, and Speaking & Panels (the latter two reuse this exact class pair rather than a bespoke "row" layout). When the item count is odd, the lone last cell spans the full width (`.consulting-grid > .consulting-cell:nth-child(odd):last-child { grid-column: 1 / -1; border-right: 0; }`) so neither its bottom divider nor a stray right-border dangles — this rule must travel with the component wherever it's reused.
- **Yellow panel card**: one card per 2-up grid inverted to `--yellow` background — used once per section max, for the coaching/CTA half.
- **Dark inverse band**: `--ink` background + `--cream` text — used for stats band, footer, booking form's left panel.
- **Hover-invert links/buttons**: default ink-on-cream or cream-on-ink; hover swaps to the opposite panel's palette (never a new color).
- **Marquee**: single-row infinite scroll of plain mono text, doubled array in markup, 38s linear.
- **Process row** (`.process-row` + `.process-num` + `.process-copy`): outlined numeral + title + note in one flex row, bottom hairline. On mobile the row wraps but `.process-copy h3` must keep `white-space: normal` (not `nowrap`) or a long title forces the whole copy block to a new line below the numeral instead of wrapping in place — this exact bug hit "Answers to initial questions."

## Layout classes (breakpoint hooks — do not rename)

`.hero-grid` `.about-grid` `.book-grid` `.services-hero` `.grid-2` `.grid-3` `.pillars-grid` `.consulting-grid` `.writing-grid` `.stats-grid` `.pad-lg` `.nav-links` `.nav-toggle`

Breakpoints:
- **900px**: all grid classes above collapse to 1 column; nav collapses to hamburger; side padding tightens to 20px; hero portrait hidden (`.hero-portrait { display: none; }`, About's `.about-portrait` stays visible); the booking panel's email link (`.book-email`) is also hidden at this breakpoint (visible on desktop/tablet); `stats-grid` goes 4→2 columns; `.grid-2` gains an explicit `border-top` + `28px` margin-top since its box no longer sits directly under a bordered header on narrow layouts.
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
- Home hero portrait is hidden on mobile (≤900px); About's portrait stays visible at all sizes. **Currently swapped for a trial** — see "Current trial (Home hero)" below; this row describes the default/fallback state to restore if the trial is dropped.
- Favicon: generated from `assets/logo-mark.jpg` (same yellow-circle mark as the nav), not a separate design — `favicon.ico` (16/32/48, transparent corners) at the repo root plus `assets/favicon-16x16.png` / `assets/favicon-32x32.png` (transparent) and `assets/apple-touch-icon.png` (180×180, opaque background — iOS renders alpha as black, so this one is never transparent) referenced from every page's `<head>`. If the logo mark ever changes, regenerate all four from the new source so the tab icon stays in sync with the nav mark.

## Forms & inputs (booking form, on Home + Book)

- Inputs: transparent background, `1px solid var(--ink)` bottom-border only (no full box), `18px` text; focus state darkens border to `--index-gold` + faint yellow wash `rgba(255,212,0,0.16)`.
- Textarea: full `1px solid var(--ink)` box (not underline-only), same focus treatment at `rgba(255,212,0,0.12)`.
- Topic chips: outline buttons, toggle to filled `--yellow` on `.is-selected` (JS-driven class toggle, not inline styles); selected values are collected into a hidden `topics` input so they submit with the form.
- Submit: primary yellow button (`.btn-submit`); success state hides the `<form>` (`hidden` attribute — note `.booking-form[hidden] { display: none; }` must stay explicit, since `.booking-form`'s own `display: flex` would otherwise beat the browser's default `[hidden]` rule) and shows `.booking-success`, a yellow confirmation card with a "send another" reset action.
- Submission-level error (`.form-error`): yellow background, ink border and bold ink text — network/Formspree failures, not a validation problem. Stays yellow/ink, not `--error` (see color-token rule).
- Field-level validation (`.field-error`, `.field.has-error`): the `<form>` has `novalidate` so the browser's native tooltip never appears. `js/main.js` builds an ordered list of validators (every `[required]` input/textarea, plus a custom one for the topic-chip group — at least one chip must be selected) and:
  - validates a field live on blur, and clears its error live on input once corrected;
  - on submit, clears all errors, finds the **first** invalid validator in document order, shows only that one's message, focuses/scrolls to it, and stops — it does not surface every problem in the form at once, and never checks a later field until the earlier one is fixed.
  - Messages are specific per field, sourced from `data-required-message` / `data-invalid-message` attributes on the input (e.g. "Please enter your work email." vs. the email-format message "Please enter a valid email address."), not a generic "this field is required."
  - Styling uses `--error` (red): `.field-error` text, `.field.has-error input/textarea` border, `.field.has-error .topic-chip` outline. This is the one deliberate exception to "cream/ink/yellow only" — see the color-token rule above.
  - Any new required field must follow this pattern: wrap it in `.field`, add a `<span class="field-error"></span>` after it, add `data-required-message` (and `data-invalid-message` if it has a format constraint), and it's automatically picked up by `buildValidators()` — no per-field JS needed.
- First session is free — always state this in the booking copy.
- Submissions post to Formspree (`action="https://formspree.io/f/myeggnpv"` on the `<form>`); `js/main.js` intercepts with `fetch()` for the app-like success/error swap, using `Accept: application/json`.

## Navigation

- Desktop: inline nav row + filled "Book a session" pill, sticky header with blur backdrop.
- The pill (`.btn-book`) must never get `.nav-links a:hover`'s underline: that selector includes a type selector (`a`), so it out-specifies a bare `.btn-book:hover` rule regardless of source order. Its hover rule is written as `.nav-links a.btn-book:hover` to match/beat that specificity — any other button-style link nested inside `.nav-links` needs the same treatment, not just `text-decoration: none` on its own class.
- The current page's nav link gets `aria-current="page"`, styled in `--index-gold`. This exists because the site uses real multi-page routing (see "Known intentional deviations") — a single-page mock has no "current page" to indicate.
- ≤900px: nav collapses behind a 3-line hamburger (`.nav-toggle`) into a dropdown panel (`.nav-links.nav-open`); `js/main.js` toggles the class and closes it on any nav link click. The panel is always `display: flex` at this breakpoint — open/closed is opacity + `translateY(-6px→0)` over `0.2s ease`, with `visibility`/`pointer-events` fully disabling it when closed (visibility change delayed on close so the fade-out is visible first). Respects `prefers-reduced-motion`. This is the pattern for any future show/hide UI that should animate — don't reach for a plain `display: none/flex` toggle, it can't transition.

## Motion

- **Section reveal**: every direct `main > section` gets a subtle fade + `translateY(22px→0)` over `0.7s ease` the first time it's ~12% into the viewport (`initScrollReveal()` in `js/main.js`, via `IntersectionObserver`, `.reveal`/`.is-visible` classes — see also the mobile-nav pattern note above). Above-the-fold sections reveal almost immediately on load; this is deliberately the same mechanism for both "page load" and "scroll into view," not two separate systems. If `IntersectionObserver` is unavailable or `prefers-reduced-motion` is set, all sections are marked visible immediately with no animation. Sections never start hidden in markup — the `.reveal` class is only added by JS right before observing, so content is never stuck invisible if a script fails to run.
- **Site-wide smooth scroll**: [Lenis](https://github.com/darkroomengineering/lenis) is loaded via CDN (`<script src="https://unpkg.com/lenis@^1/dist/lenis.min.js">`, pinned to major version 1) on every page, before `js/main.js`. `initSmoothScroll()` checks `typeof Lenis` and no-ops silently if the CDN failed to load or `prefers-reduced-motion` is set — native scroll is the fallback, never broken. Don't add a second smooth-scroll mechanism (e.g. `scroll-behavior: smooth`) alongside it; the site currently has no same-page anchor links, so this hasn't come up, but if one is added, scroll to it through Lenis's own `scrollTo()`, not native anchor jump, to avoid the two fighting.
- **Hamburger → X**: `.nav-toggle span:nth-child(1/2/3)` rotate/translate/fade into an X via `.nav-toggle[aria-expanded="true"] span` rules — pure CSS, driven by the `aria-expanded` attribute `js/main.js` already sets on toggle, no separate open/closed JS class needed.
- **Button arrow hover**: every `→` arrow lives in a bare `<span>` inside its button (`.btn`, `.btn-book`, `.btn-invert`, `.btn-submit`); on desktop hover the arrow nudges 5px right (`transform: translateX(5px)`, `0.3s cubic-bezier(0.34, 1.56, 0.64, 1)` for a slight overshoot/snap feel). Scoped inside `@media (hover: hover)` so touch devices' simulated `:hover` doesn't leave it stuck shifted, same reasoning as the topic-chip fix. Any future button with an arrow span just needs to be added to this selector list — no per-button CSS.
- **Hero word cycle**: in the Home hero's yellow mark, "actually" is static text; only the word after it (`.cycle-word`, wrapped in an overflow-hidden `.cycle-word-mask`) rotates through a JSON array in its `data-cycle-words` attribute (currently: ship / defend / own / repeat / trust), via `initHeroTextCycle()` in `js/main.js`. Each swap: drift up + fade out (`.cycle-out`, translateY(-20%), 0.75s `cubic-bezier(0.33, 1, 0.68, 1)` transform + 0.65s opacity — a soft settle-style easing, not a sharp linear one), then — with the element's transition briefly forced to `none` so the reposition itself doesn't animate — the text is swapped and the element is nudged just below its resting spot (`.cycle-in`, translateY(20%) opacity 0), reflowed, transition restored, and `.cycle-in` removed on the next frame so it drifts back up into place. Deliberately a short partial-height drift (20% of the word's own box), not a full-height slide or a typewriter/type-and-erase effect — both were tried and rejected as too abrupt/gimmicky for this headline's Swiss-grid tone; keep future tuning in this "gentle drift + fade" family, don't reach for a different animation genre without checking back.
  - **Containment fix**: `.mark-yellow` must stay `display: inline` (with `box-decoration-break: clone`) — this is what gives each *wrapped line* its own tightly-fit yellow box (e.g. "ACTUALLY" and "SHIP" on separate lines each get their own snug highlight) rather than one full-width block. An `inline-block` version was tried and reverted: it fixed vertical containment but broke this per-line hugging, stretching the highlight to the container's full width whenever the phrase wrapped. The actual fix is a `mark-yellow--cycle` modifier that just sets `line-height: 1.15` to match `.cycle-word`/`.cycle-word-mask`'s own line-height — an inline element's painted background height comes from *its own* line-height (inherited as `0.92` from `.hero-h1` otherwise), so without this it was shorter than its inline-block child and the sliding word's fade could show above the yellow rectangle mid-transition even though `.cycle-word-mask` was still clipping it correctly. Keep any future fix to this line-height-matching approach — don't reach for `inline-block`/`overflow:hidden` on `.mark-yellow` itself again, it costs the wrap-hugging behavior.
  - This is the general pattern for any future "rotating word" effect: a fixed overflow-hidden mask on the animated word, with its own line-height matched to any inline ancestor that paints a highlight background behind it — plus one element that drifts out one side and back in from the other, never a plain opacity swap in place. Two fixed lines above it ("Design decisions" / "your team can") and the word "actually" itself are static markup/text, never touched by the script. No-ops entirely under `prefers-reduced-motion` (first word just stays put, no interval started). To change the word list, edit the JSON in the `data-cycle-words` attribute — no JS changes needed.
- Any new motion should default to `opacity`/`transform` only (compositor-friendly) and must have a `prefers-reduced-motion` path, per the patterns above.

## Current trial (Home hero) — not yet locked in

Two live-site experiments, both easy to revert, both **not** part of the locked color/imagery rules above until confirmed permanent:

1. **Animated background wash**: `body`'s flat `--cream` fill is temporarily replaced with a white base + slow-drifting blue/pink radial-gradient (`@keyframes aurora-drift` in `css/style.css`), and `.site` is `background: transparent` so it shows through. Bordered grid cards (`.offer-card`, `.teach-card`, `.pillar-card`, `.consulting-cell`, `.article-card`) were given an explicit `#FFFFFF` background so they still read as solid cards against the moving gradient — keep this pairing together; removing the gradient without checking these card backgrounds is fine (white ≈ invisible against cream too), but reverting the gradient without them would silently leave dead white card fills against a cream page. To revert fully: restore `background: var(--cream)` on `body` and `.site`, drop the `#system-loop`-adjacent hero rules described below, and the card-background additions can stay (harmless either way) or be removed.
2. **Home hero animation**: the portrait photo (`<img>`) is swapped for a framework-free SVG animation, `js/system-loop.js` (`#system-loop` div in `index.html`'s hero), recolored from its original palette to the site's `--ink`/`--yellow`. Mouse-parallax was tried and explicitly rejected (removed) — it must stay a fixed, non-interactive loop. Plays once on page load and freezes on its fully-drawn frame (`FREEZE_AT = 12.5` in the boot section) instead of looping forever back through the authored Fade-to-empty stage — never restore the `% AUTHORED_TOTAL` looping `requestAnimationFrame` without being asked; if `FREEZE_AT` ever needs to move, it must stay before `CUES.Fade` (`13.2`) and after every element's pop-in/draw finishes (currently all done by ~`10.4`). All of its container sizing lives in `:has(#system-loop)`-scoped rules (`.hero-grid`, `.hero-portrait`, `.hero-copy`) precisely so that reverting to the `<img>` automatically drops every animation-specific override with no manual cleanup. Do not hand-tune these `:has()` rules for the photo case — if the photo comes back, delete the rules, don't repurpose them. The SVG's own `viewBox` (`VIEW_Y_SHIFT` / `VIEW_H` in `mount()`) is cropped tight to the diagram's actual drawn bounding box at the frozen frame (measured via `getBoundingClientRect()`, not guessed) rather than the full authored `0 0 1080 1920` canvas — this is what makes it render large and centered instead of small with dead space around it. If the diagram's content changes (new shapes, different camera drift range), re-measure the frozen frame's bounding box and recompute these two numbers rather than eyeballing a new crop.

## Known intentional deviations

1. **Real multi-page routing** instead of a single-page app with client-side tab state. `index.html` / `services.html` / `about.html` / `book.html` are separate documents with real URLs (shareable, SEO-friendly, working back/forward), unlike the original Claude Design prototype which faked "pages" with JS state in one HTML file. Header/footer markup is duplicated across the four files as a result — there's no shared templating layer in a plain static site.
2. **Nav active-page indicator** (`--index-gold` on the current page's link) — new, required by real routing; didn't exist in the single-page mock.
3. **Two error colors, both deliberate**: submission-level failures stay yellow/ink (`.form-error`); field-level validation uses `--error` (red), scoped exactly as described in the color-token rule. Neither extends beyond its stated use.
4. **External CDN dependency (Lenis)** — the only third-party script this project loads besides Google Fonts. Chosen over a hand-rolled scroll-smoothing script per the project's "don't reinvent what a small, well-tested library already solves" stance; kept to one narrow job (scroll feel) and always has a native-scroll fallback.

## File map

- `index.html`, `services.html`, `about.html`, `book.html` — the four real English pages. Each duplicates the header/nav/footer markup.
- `fa/index.html` — the single Persian landing page (not a per-page mirror of the English site). See "Persian (fa/) localization" below.
- `css/style.css` — all styles: tokens, every page's layout, the responsive overrides, and the Persian/RTL section at the end. One shared file for both languages — never fork a `style.fa.css`.
- `js/main.js` — mobile nav toggle + booking form (topic chips, submit/success/error handling) + in-page anchor smooth-scroll. Shared verbatim by every page in both languages that has a `[data-booking-form]` block; see the localization note in its own header comment.
- `js/system-loop.js` — the Home hero animation (see "Current trial" above). Used only by `index.html` — `fa/index.html` uses the centered `.landing-hero` instead, with no animation.
- `assets/` — `portrait-home.jpg` (About portrait — the Home hero currently uses the animation instead, see "Current trial"), `logo-mark.jpg` (nav mark), `favicon-16x16.png` / `favicon-32x32.png` / `apple-touch-icon.png` (generated from `logo-mark.jpg`, see Imagery), `fonts/kalameh/` (self-hosted Persian webfont — see Persian localization).
- `favicon.ico` — repo root (not in `assets/`), so browsers that auto-probe `/favicon.ico` find it without a `<link>` tag.
- This file (`DESIGN-SYSTEM.md`) — update in the same commit as any visual/content change so it never drifts from the live files.

## Persian (fa/) localization

**One page, not four.** `fa/index.html` is a single, standalone landing page — not a Persian mirror of `index.html`/`services.html`/`about.html`/`book.html`. It was a full 4-page localization at first; that was deliberately collapsed back into one focused page because keeping four pages of translated content in sync with every future edit didn't scale. Do not re-split it into multiple fa/ pages without being asked — if Persian content needs to grow, grow this one page (or explicitly propose a multi-page structure again), don't default back to page-for-page parity.

**Structure** (three sections, reusing existing components, not new ones invented for Persian):
1. `.landing-hero` — a new centered, single-column hero variant, defined right after `.btn-secondary` in `css/style.css` next to the other hero rules. Deliberately *not* `.hero-grid` — no split copy/portrait layout, no System Loop animation, just centered eyebrow → h1 (reusing `.hero-h1` and the same yellow word-cycle mechanism, unchanged) → intro copy → centered CTA row. This is a generic reusable component, not fa-scoped, in case a future centered-hero page in either language wants it.
2. `#services` — the exact `.section.pad-lg` / `.section-head` / `.section-lede` / `.grid-2` / `.offer-card` components from the English homepage's "Two ways I work with you", reused verbatim.
3. `#book` — the exact `.book-grid` / `.book-intro` / `.book-form-panel` booking form component, reused verbatim, fully functional (see Booking form below).

Nav is in-page anchors (`#services`, `#book`), not page links — there is nothing else to link to. `initSmoothScroll()` in `js/main.js` now also wires any `a[href^="#"]` to Lenis's `scrollTo()` instead of the native instant jump (generic addition, inert on pages with no hash links — i.e. every English page today).

**Entry point live**: the `.lang-switch` pill linking each English page to `fa/` is active in `.nav-links` on all four English pages, now that the fa page has its own licensed font and finished layout.

- **`<html lang="fa" dir="rtl">`**. The `dir="rtl"` *attribute* (not a CSS property) is what makes the browser auto-mirror grid/flex column order and default text alignment for free.
- **Logical CSS properties, not physical**: every divider border in the base stylesheet (`border-right` on grid-cell dividers, `padding-left`/`border-left` on the brand-tag divider, the pillar-list bullet's `left` position, etc.) was converted to `border-inline-end` / `padding-inline-start` / `inset-inline-start` and so on. In `dir="ltr"` (every English page) these resolve to the exact same physical side as before — zero visual change, verified by screenshot diff — but they now also resolve correctly for `dir="rtl"` with no separate override needed. **Any new directional CSS (a new border-right, padding-left, absolutely-positioned left/right, etc.) must use the logical form**, or it will render on the wrong side on `fa/index.html`. The one exception left as physical `border-left`/`border-right` is `.consulting-grid`'s outer box (unused on the fa page, but still shared CSS), which sets both sides to the same value (direction-agnostic).
- **Font — Kalameh, self-hosted, not Google Fonts**: `html[lang="fa"]` redefines `--font-display`/`--font-body`/`--font-mono` to `"KalamehWeb"`. It's a proprietary/commercial font licensed from fontiran.com — the four weight files actually used (Light 300, Regular 400, Bold 700, Black 900, both woff2+woff) live in `assets/fonts/kalameh/`, declared via `@font-face` at the top of the Persian section of `css/style.css`. `assets/fonts/kalameh/FontLicense.txt` sits next to them per the license's own requirement, with the site's purchased license code (`1W30FEGU`) filled in; the same code is referenced in the `@font-face` comment, and the vendor-mandated attribution badge (`.font-license-badge`) is displayed in the fa page's footer, linking to `https://fontiran.com/license/1W30FEGU`. Body copy renders at `font-weight: 300` (the explicit "باریک" / thin brief); headings (`h1`/`h2`/`h3`/`.footer-wordmark`/`.brand-name`) render at `900` (Black — "خیلی ضخیم" / very heavy, deliberately heavier than a normal bold, for max contrast against the thin body); a second tier of UI emphasis (buttons, stat numerals, index numbers, list-item numerals — see the selector list in `css/style.css`) sits one step down at `700`. Any new heading or button-like element added to the fa page must be added to the matching weight list, or it will render at the body's thin default.
  - **Heading line-height**: the English display headings (`h1`, `.services-hero h1`, `.about-h1`, `.book-intro h2`) use very tight (0.92–0.98) line-heights tuned for condensed uppercase Latin type. At Kalameh's heavy 900 weight, Persian ascenders/descenders visibly collide across lines at that tightness — `html[lang="fa"] h1, .services-hero h1, .about-h1, .book-intro h2 { line-height: 1.45; }` fixes it. Any *other* heading-weight Persian text pulled in from the English side needs the same check — if it looks cramped/overlapping, it's this, not a font bug.
- **Letter-spacing / uppercase reset**: Kalameh, like any Persian type, is a joined (cursive) script — `letter-spacing` breaks the letter joining, and `text-transform: uppercase` is a no-op on Persian glyphs but would still incorrectly shout any embedded Latin (client names, tool names). Both are reset with `html[lang="fa"] * { letter-spacing: normal !important; text-transform: none !important; }` rather than chasing the 30+ individual rules that set them for the English version — this is the one deliberate `!important` in the stylesheet, scoped narrowly to the fa language root, and it's there on purpose; don't "clean it up" into per-selector overrides.
- **Arrow glyphs**: fa markup writes the CTA arrow as `←` (not `→`) directly in the HTML wherever the English version has `<span>→</span>`, since it's simpler and more robust than mirroring a single glyph with `transform: scaleX(-1)`. The hover "nudge" animation direction is flipped to match (`translateX(-5px)` under `html[lang="fa"]`, vs. `+5px` on English).
- **Numerals**: real Persian digits (۰–۹) directly in the markup wherever the English version has Latin digits (stats, dates, index numbers). Kalameh renders them natively — no CSS or JS needed, just type them.
- **Client/company/institution names**: kept in their original Latin spelling (client companies, academies, colleges — e.g. "Telewebion", "Amanj Academy") since inventing a Persian transliteration risks misspelling a real brand's actual identity. Well-known university names, where they still appear, use their standard Persian names (e.g. "Shahid Beheshti University" → "دانشگاه شهید بهشتی").
- **Booking form**: fully functional, posting to the same Formspree endpoint. All validator/error copy comes from data attributes already read generically by `js/main.js` (`data-required-message`, `data-invalid-message`, plus `data-required-message` on `[data-topics-group]` and `data-network-error-message` on `[data-booking-form]`, both added to `js/main.js` specifically to remove its last two hardcoded English strings) — never fork the JS to hardcode Persian text, add/adjust the data attribute instead.
- **`hreflang` + Open Graph**: every page (both languages) carries `<link rel="alternate" hreflang="en|fa">` — the four English pages all point their `fa` alternate at the one `https://alibabaei.info/fa/` landing (not a page-for-page match, since there isn't one), plus `hreflang="x-default"` pointing at the English homepage, and `og:locale`/`og:locale:alternate` (`en_US`/`fa_IR`, flipped per language). `sitemap.xml` only carries reciprocal `xhtml:link` alternates between the English homepage and `fa/` for the same reason.
