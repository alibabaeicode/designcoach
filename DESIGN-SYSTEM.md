# Ali Babaei Site — Design System

Source of truth for visual/content consistency across `index.html`, `services.html`, `about.html`, `book.html`, `fa/index.html` and `css/style.css`. Update this file in the same commit as any visual/content change so it never drifts from the live code.

**Redesign note (Aug 2026):** the site was fully redesigned from an earlier cream/ink/yellow "ruled hairline grid" system (bordered boxy cards, condensed uppercase Archivo, no radius/shadow) to the rounded, soft-shadow, blue-accent system documented below, modelled after a reference site the user liked (`liquid-ali-lab.base44.app`) — same content and page structure throughout, new visual language. If you find a stray rule still describing borders-as-dividers, `--yellow`-as-a-big-fill, or condensed-uppercase body headings, it's a leftover from the old system — fix it forward to match this document, don't treat it as intentional.

## Color tokens

All colors are CSS custom properties in `:root` (`css/style.css`) — never a raw hex value in markup or in any rule outside `:root`.

| Token | Value | Use |
|---|---|---|
| `--cream` | `#FAFAF8` | Page background (light sections) |
| `--bg-soft` | `#F1F1EC` | Portrait/media placeholder fill |
| `--ink` | `#0B0B10` | Text, dark panels (footer, booking section, menu overlay, CTA band, the "B" offer card) |
| `--white` | `#FFFFFF` | Card fills |
| `--body-copy` | `#3A3A42` | Body copy on light backgrounds |
| `--muted` | `#6B6B76` | Muted label/meta text on light backgrounds |
| `--accent` | `#2F5DFA` | The **one** accent color — buttons, links, hover/active nav state, numeral/bullet accents, focus rings. Never a big surface fill (see rule below) |
| `--accent-pale` | `#E4EAFF` | Pale accent-tint chip background (`.mark-yellow`'s inline headline highlight) — dark text sits on top of this, not white |
| `--dark-muted-1` | `#C7C7CE` | Muted text on `--ink` panels (brightest tier) |
| `--dark-muted-2` | `#8C8C97` | Muted text on `--ink` panels (mid tier) |
| `--dark-muted-3` | `#D8D8DD` | Muted text on `--ink` panels (list items) |
| `--border-soft` | `#E5E5E0` | Card borders / dividers on light backgrounds |
| `--border-dark` | `rgba(255,255,255,0.12)` | Card borders / dividers on `--ink` backgrounds |
| `--error` | `#B3261E` | Field-level validation errors only (text, border, chip outline) |

**Rule: never introduce a new color without a narrow, explicit, documented scope.** Every surface is `--cream`/`--white`/`--ink` by default. `--accent` is the *only* colour allowed on a button, link, hover state, or small numeral/bullet accent — **never as a large background fill** (no blue panels, no blue CTA bands). Where the old system used a big colour-block fill (the "B" offer card, the CTA band, booking success, form-error), the redesign uses `--ink` (dark panel) or a *pale, low-opacity* tint (`--accent-pale`, or `rgba(47,93,250,…)` washes on inputs/success/error states) instead — dark-panel-with-white-text or pale-tint-with-dark-text, never a saturated colour block. `--error` stays the one deliberate exception, scoped exactly as before (field-level validation only, never the submission-failure banner).

**Legacy alias tokens**: `--yellow`, `--index-gold`, `--on-yellow-strong`, `--on-yellow-body`, `--hairline-light`, `--hairline-dark`, `--blue` still exist in `:root` as aliases pointing at the new tokens above, so a missed reference resolves to something reasonable rather than breaking. Don't write new `var(--yellow)` etc. — use `--accent` / `--accent-pale` / `--ink` directly. `.mark-yellow` (the hero headline's inline highlight box) keeps its old class name for now — it's a pale-blue chip today, not literally yellow; renaming it across 5 HTML files is a mechanical cleanup that hasn't been done yet, not a design decision.

Radius/shadow tokens:

| Token | Value | Use |
|---|---|---|
| `--radius-lg` | `22px` | Cards (offer/teach/pillar/consulting/article/process) |
| `--radius-md` | `14px` | Form inputs/textarea |
| `--radius-full` | `999px` | Buttons, pills, topic chips |
| `--shadow-card` | soft double shadow | Every light-background card, paired with `--radius-lg` and a `1px solid var(--border-soft)` border |

## Type

- Single typeface, `Inter` (Google Fonts, weights 400–800), for display *and* body — no separate mono/serif family. Eyebrows/meta labels reuse `Inter` too (`--font-mono` token still exists for the class names that reference it, but it now points at Inter, not a monospace face).
- Display/headings: weight `800` for real `h1`s (hero, services/about H1, footer wordmark) — kept **uppercase** as the one deliberate display-caps treatment, mirroring the reference's giant-name hero. Everything below H1 (`h2`/`h3`/card titles) is weight `700`, **sentence case** (no `text-transform: uppercase`) — this is a deliberate change from the old system, where every heading was forced uppercase.
- Body: `Inter` 400–500, 16–19px, `line-height: 1.5–1.65`.
- Eyebrows/meta labels: `Inter` 12–13px, light letter-spacing (`0.02–0.08em`, much looser-to-none vs. the old system's tracked mono caps).

### Desktop type scale (locked — do not shrink)

| Use | Size |
|---|---|
| Home H1 (hero) | `clamp(48px, 6.2vw, 100px)` |
| Services H1 | `clamp(44px, 5.2vw, 84px)` |
| About H1 | `clamp(42px, 4.8vw, 72px)` |
| Footer wordmark | `clamp(30px, 4.2vw, 56px)` |
| Section H2 (teaser headers) | `clamp(28px, 3.2vw, 44px)` |
| Section H2 (fixed, list headers) | `32px` |
| CTA band H2 | `clamp(26px, 2.8vw, 40px)` |
| Booking success H3 | `34px` |
| Card H3 (offer/pillar) | `23–28px` |
| Card H3 (teach/consulting/article) | `19–21px` |
| Stat numeral | `52px` |
| Pillar / process ghost numeral | `40px` |
| Full-screen menu link | `clamp(38px, 8.5vw, 92px)` |
| Body copy (hero/services/about intro) | `19px` |
| Body copy (booking intro) | `18px` |
| Body copy (list/card text) | `16–17px` |
| Meta/eyebrow label | `12–13px` |

Mobile override (≤900px) only touches `h1` → `clamp(34px, 9vw, 60px)`; nothing else shrinks. Never lower a desktop value below what's listed here — if a section reads too large, resize its container/grid, not the type scale.

## Spacing & grid

- Section padding: `72–96px` vertical, `40px` horizontal (`.pad-lg` drops horizontal to `20px` ≤900px). The dark CTA band is a deliberate exception at `64px` vertical (a compact banner, not a full section).
- Card/cell padding: `26–44px`.
- Gaps: `10–16px` tight groups, `20px` between cards in every grid (`.grid-2`, `.grid-3`, `.pillars-grid`, `.consulting-grid`, `.writing-grid`, `.process-list`) — cards are now separate rounded/shadowed elements, not edge-sharing boxes, so every multi-card grid needs an explicit `gap` (this replaced the old system's shared-border spacing; a new grid without a `gap` will visually collapse cards into each other).
- All multi-item rows use flex/grid + `gap`, never margin-spaced siblings.
- **Viewport-floored hero row** (desktop only, currently scoped to `.hero-grid:has(#system-loop)`): `min-height: calc(100vh - 73px)` on `.hero-grid`, plus `min-height: 680px` on `.hero-portrait`. Use `min-height` only, never a hard `height` — a hard `height` leaves no slack for `.hero-copy`'s bottom padding when its content is tall, crowding the CTAs against whatever follows. `73px` is the sticky header's rendered height; if the header's padding ever changes, update the `calc()` too. `.hero-portrait` deliberately has **no** `max-height`: with it removed, the grid's default `align-items: stretch` makes `.hero-portrait` match whichever column is naturally taller.

## Structural motif — rounded cards, soft shadow, restrained accent

Every card (`.offer-card`, `.teach-card`, `.pillar-card`, `.consulting-cell`, `.article-card`, `.process-row`) is `border-radius: var(--radius-lg)`, `1px solid var(--border-soft)`, `background: var(--white)`, `box-shadow: var(--shadow-card)` — a floating card, not a bordered grid cell sharing edges with its neighbours. Buttons and pills are `border-radius: var(--radius-full)`. There is **no** ruled hairline grid, no shared cell borders, no forced-uppercase body headings — that was the previous system. Sections alternate light (`--cream`/white) and dark (`--ink`) bands for rhythm, same as before, but the transition between them is a plain background change, not a `border-bottom: 1px solid var(--ink)` line.

Every grid container that should render as columns must still be in the shared `display: grid` rule near the top of `css/style.css` (currently: `.hero-grid, .about-grid, .book-grid, .services-hero, .grid-2, .grid-3, .pillars-grid, .consulting-grid, .writing-grid`) — a grid class defined only with `grid-template-columns` and no `display: grid` silently renders as a stacked block. This rule from the old system is unchanged and still the most likely regression if a new 2-up/3-up grid is added without registering it here.

## Recurring components

- **Eyebrow + heading + meta-right header row** (`.section-head`): flex row, `justify-content: space-between` — used atop every major section. No bottom hairline anymore, just spacing.
- **Ghost numeral**: large `Inter 800` numeral in `var(--border-soft)` (pale gray, solid fill, **no stroke/outline** — the old hollow `-webkit-text-stroke` treatment is gone entirely, which also means the Persian-digit-illegibility exception that used to live in the fa section no longer applies, since the base style was never stroke-only to begin with), used for `.pillar-num` and `.process-num`.
- **2-up / 3-up card grid**: the general pattern for any list of items (`.consulting-grid` + `.consulting-cell`, `.grid-3` + `.teach-card`, `.writing-grid` + `.article-card`, etc.) — each item is an independent rounded/shadowed card, grid uses `gap: 20px`, no shared-border bookkeeping needed (no more odd-count-last-cell-spans-full-width or `:nth-child` border removal — that entire class of bug was specific to the old shared-hairline system and doesn't exist anymore).
- **Dark inverse card/panel**: `--ink` background + light text (`--dark-muted-1/2/3` tiers) — used for the "B" offer card, the CTA band, the whole booking section (`.book-grid`), the footer, and the full-screen menu overlay.
- **Pale accent card**: `rgba(47,93,250,0.08–0.12)` background + `--accent`-tinted border — used for booking-success and the submission-error banner. Dark-panel and pale-accent-card are the *only* two "surface fill" treatments in the system; never a saturated `--accent` fill on a large area.
- **Hover-invert links/buttons**: default ink-on-cream or white-on-dark; hover swaps to `--accent` (text/border) or a darker accent shade (`#2249D6`, filled buttons) — never a new color.
- **Marquee**: single-row infinite scroll of plain text with a small `✦` separator between names, doubled array in markup, 38s linear.
- **Process card grid** (`.process-list` as `display:grid; grid-template-columns:repeat(3,1fr)`, `.process-row` as an individual rounded card, not a divided row): ghost numeral at the top of each card, then title + note. This replaced the old system's single-column divided-row list (`border-bottom` between rows) — six items now sit in a 2×3 (desktop) / 1-column (mobile) card grid, matching the reference's process section.

## Layout classes (breakpoint hooks — do not rename)

`.hero-grid` `.about-grid` `.book-grid` `.services-hero` `.grid-2` `.grid-3` `.pillars-grid` `.consulting-grid` `.writing-grid` `.stats-grid` `.pad-lg` `.process-list` `.site-menu` `.menu-trigger`

Breakpoints:
- **900px**: all grid classes above collapse to 1 column (including `.process-list`); hero/about portrait margins tighten; `stats-grid` goes 4→2 columns; the booking panel's email link (`.book-email`) is hidden (visible on desktop/tablet).
- **560px**: `.stats-grid` goes 2→1 columns.

The full-screen menu overlay (`.site-menu`) uses the *same* markup and CSS at every breakpoint — there is no separate "mobile nav" pattern anymore. `.menu-trigger` (the header's "Menu" button) is the only thing that opens it, at any width.

## Pages & sections (current inventory)

1. **Home** (`index.html`) — hero (headline + System Loop animation), stats band (4 stats), client marquee, "Two ways I work" (services teaser), teaching & mentoring (3 cards), process (6-card grid), booking form.
2. **Services** (`services.html`) — hero intro, Four Areas of Work (pillars, numbered, 2-column card grid), dark CTA band.
3. **About** (`about.html`) — bio + portrait, Consulting Selection (8 clients, 2-column card grid), Product Design Experience (5 roles, 2-column card grid), Speaking & Panels (5 entries, 2-column card grid), Writing (2 Medium articles, 2-column card grid).
4. **Book** (`book.html`) — booking form only.
5. **fa** (`fa/index.html`) — single Persian landing page; see "Persian (fa/) localization" below.

Footer (all pages): name + logo, tagline, email, social links (LinkedIn/Dribbble/Behance/Medium), copyright.

## Content rules

- Every stat/number must be real (resume-sourced), no filler metrics.
- One CTA style per context: primary = `--accent` filled pill, secondary = outline pill (`--border-soft` border, transparent fill), tertiary = plain link with arrow `→`, colored `--accent` on hover.
- Section eyebrow on the right always states either an index (`01 / Engagements`) or a date range — pick whichever is more informative, never both.

## Imagery

- Portrait treatment: full-bleed illustration inside a `border-radius: var(--radius-lg)` rounded frame (was a hard-edged full-bleed box in the old system), `object-fit: cover`, no ring/shadow.
- Home hero and About page use the same file (`assets/portrait-home.jpg`) so the two portraits stay in sync — currently the Home hero uses the System Loop animation instead of the photo (see "Hero animation" under Motion); About's portrait is the live reference for what the photo treatment looks like.
- Logo mark (nav): `30px` circle, `object-fit: cover`, no border (`assets/logo-mark.jpg`) — a yellow-circle illustrated mark, deliberately **not** repainted to the new blue accent. The logo is a distinct piece of brand artwork the user chose independently of the site's UI color system; a logo doesn't need to match every UI accent color, and this one wasn't part of the redesign's scope.
- Logo mark (footer): same file, sized relative to `.footer-wordmark`'s text (`.footer-mark { width/height: 0.85em }` inside `.footer-name-row`, which carries the responsive `clamp()` font-size) so logo and name scale together at any viewport.
- Favicon: generated from `assets/logo-mark.jpg`, not a separate design — `favicon.ico` at the repo root plus `assets/favicon-16x16.png` / `assets/favicon-32x32.png` (transparent) and `assets/apple-touch-icon.png` (180×180, opaque background — iOS renders alpha as black). If the logo mark ever changes, regenerate all four from the new source.

## Forms & inputs (booking form, on Home + Book)

- The whole booking section (`.book-grid`, both the intro and the form panel) is a dark `--ink` panel now, not a light-cream form next to a dark intro — matches the reference's unified dark booking band.
- Inputs (`.field input`, `.field textarea`): a filled rounded box (`background: rgba(255,255,255,0.05)`, `border: 1px solid var(--border-dark)`, `border-radius: var(--radius-md)`), not the old underline-only treatment. Focus state brightens the border to `--accent` and washes the background with a translucent `rgba(47,93,250,…)` tint.
- Topic chips: pill-shaped (`border-radius: var(--radius-full)`) outline buttons on the dark panel, toggle to a solid `--accent` fill + white text on `.is-selected` (JS-driven class toggle, unchanged); selected values are collected into a hidden `topics` input so they submit with the form.
- Submit: `--accent`-filled pill (`.btn-submit`); success state hides the `<form>` (`hidden` attribute — `.booking-form[hidden] { display: none; }` must stay explicit, since `.booking-form`'s own `display: flex` would otherwise beat the browser's default `[hidden]` rule) and shows `.booking-success`, a pale-accent-tinted rounded card with a "send another" reset action (also `--accent`-filled).
- Submission-level error (`.form-error`): pale red-tinted rounded banner (`rgba(255,138,128,…)` background/border, white text) — network/Formspree failures, not a validation problem. Deliberately distinct from field-level `--error` styling (see color-token rule).
- Field-level validation (`.field-error`, `.field.has-error`): unchanged logic from before — `novalidate` on the form, `js/main.js` builds an ordered list of validators (every `[required]` input/textarea, plus the topic-chip group), validates live on blur/input, and on submit shows only the **first** invalid field's message, scrolled/focused into view. Messages come from `data-required-message`/`data-invalid-message` attributes, never hardcoded strings. Any new required field: wrap it in `.field`, add a `<span class="field-error"></span>`, add the data attributes — `buildValidators()` picks it up automatically.
- First session is free — always state this in the booking copy.
- Submissions post to Formspree (`action="https://formspree.io/f/myeggnpv"`); `js/main.js` intercepts with `fetch()` for the app-like success/error swap, using `Accept: application/json`.

## Navigation

- **Full-screen menu overlay** — the *only* nav pattern now, at every breakpoint (replaced the old system's inline nav row + separate mobile hamburger-dropdown entirely). The header (`.site-header`) just holds the brand mark/name and a `.menu-trigger` button ("Menu", with a small two-bar icon that widens on hover); clicking it opens `.site-menu`, a fixed full-viewport dark (`--ink`) panel with:
  - `.site-menu-head`: an "Index"/"فهرست" label (left) and a "Close"/"بستن" button with an inline X icon (right, RTL-flips automatically since it's a flex row, no manual mirroring needed).
  - `.site-menu-links`: the real page list (Home/Services/About/Book a session + the fa/EN switch) as huge (`clamp(38px, 8.5vw, 92px)`) stacked links, each fading/sliding in with a per-`nth-child` staggered delay when the overlay opens; hover and `aria-current="page"` both turn the link `--accent`-colored.
  - `.site-menu-foot`: the founding date range and the email address, small tracked meta text.
  - `initSiteMenu()` in `js/main.js` handles open/close: click the trigger to open, click close/any link/press Escape to close; `.menu-open` is added to `<html>`/`<body>` while open to lock background scroll. Respects `prefers-reduced-motion` (transitions removed, not the toggle logic).
- The current page's link gets `aria-current="page"` inside `.site-menu-links`, styled `--accent`. This exists because the site uses real multi-page routing (see "Known intentional deviations") — a single-page mock has no "current page" to indicate.
- **Language switch**: no longer a separate `.lang-switch` pill in the header — it's just another row in the full-screen menu list (`"فا · Persian"` on the four English pages linking to `fa/`, `"English"` on the fa page linking back to `../index.html`).
- fa's overlay uses the same component with Persian labels and copy (خانه / خدمات / رزرو مشاوره / English, فهرست / بستن) — RTL flips the whole panel automatically via `dir="rtl"` on `<html>`, no separate CSS needed beyond the existing `html[lang="fa"] .site-menu-links a { line-height: 1.35; }` safety margin (Kalameh needs more line-height than Inter's tight `1.08` at this display size).

## Motion

- **Hero load-in**: above-the-fold hero content (`.hero-copy > *` / `.landing-hero > *` — eyebrow, headline, intro, CTA row) animates in once on page load via a choreographed CSS `@keyframes hero-in` cascade (fade + `translateY(22px→0)` + `blur(8px→0)`, `0.9s cubic-bezier(0.16,1,0.3,1)`, staggered `animation-delay` per child: `0s / 0.1s / 0.24s / 0.36s`). This is deliberately *not* the scroll-triggered `.reveal` mechanism below — it's above the fold and should play on paint, not wait for a scroll/intersection event. `prefers-reduced-motion` disables it entirely (`animation: none`). If a new hero variant is added, its direct children need to be in the right visual order for the stagger to read correctly — it delays by DOM position (`nth-child`), not by any explicit sequencing attribute.
- **Section reveal**: every direct `main > section` gets a fade + `translateY(24px→0)` + `blur(6px→0)` over `0.8s cubic-bezier(0.16,1,0.3,1)` the first time it's ~12% into the viewport (`initScrollReveal()` in `js/main.js`, via `IntersectionObserver`, `.reveal`/`.is-visible` classes). The blur was added in the redesign to match the hero load-in's "soft settle" feel — keep both in the same motion family if either is retuned. If `IntersectionObserver` is unavailable or `prefers-reduced-motion` is set, all sections are marked visible immediately with no animation.
- **Site-wide smooth scroll**: [Lenis](https://github.com/darkroomengineering/lenis) is loaded via CDN on every page, before `js/main.js`. `initSmoothScroll()` no-ops silently if the CDN failed to load or `prefers-reduced-motion` is set. Same-page anchor links (the fa/ page's `#services`/`#book`) route through Lenis's own `scrollTo()` instead of a native jump.
- **Full-screen menu open/close**: `.site-menu`'s own opacity/visibility transition (`0.5s cubic-bezier(0.16,1,0.3,1)`) plus each link's independent staggered fade/slide-in — see "Navigation" above for the full breakdown.
- **Button arrow hover**: every `→`/`←` arrow lives in a bare `<span>` inside its button; on desktop hover it nudges `5px` (English) or `-5px` (fa) via `transform: translateX()`, `0.3s cubic-bezier(0.34, 1.56, 0.64, 1)` for a slight overshoot/snap. Scoped inside `@media (hover: hover)`.
- **Hero word cycle**: in the Home hero's pale accent-chip mark (`.mark-yellow` — legacy class name, see color-token note), "actually" is static text; only the word after it (`.cycle-word`) rotates through a JSON array in `data-cycle-words` (currently: ship / defend / scale / repeat / trust — fa mirrors word-for-word: بسازد / دفاع کند / مقیاس کند / تکرار کند / اعتماد کند), via `initHeroTextCycle()`. Unchanged mechanism from before the redesign — drift-up-and-fade swap, `.cycle-word-mask` overflow-hidden mask, `prefers-reduced-motion` no-op. See the fa localization section for the two fa-specific baseline/line-break overrides this still needs.
- Any new motion should default to `opacity`/`transform`/`filter: blur()` only (compositor-friendly-ish; blur is the one exception that isn't fully cheap, used sparingly) and must have a `prefers-reduced-motion` path, per the patterns above.

## Known intentional deviations

1. **Real multi-page routing** instead of a single-page app with client-side tab state. `index.html` / `services.html` / `about.html` / `book.html` are separate documents with real URLs (shareable, SEO-friendly, working back/forward). Header/footer markup is duplicated across the files as a result — there's no shared templating layer in a plain static site.
2. **Nav active-page indicator** (`--accent` on the current page's link inside the full-screen menu) — required by real routing; a single-page mock has no "current page" to indicate.
3. **Two error colors, both deliberate**: submission-level failures use a pale red-tinted banner (`.form-error`); field-level validation uses `--error` (a more saturated red), scoped exactly as described in the color-token rule. Neither is a solid `--error` fill on a large area.
4. **External CDN dependencies (Lenis, Plausible)** — the only third-party scripts this project loads besides Google Fonts. Lenis was chosen over a hand-rolled scroll-smoothing script; kept to one narrow job (scroll feel) and always has a native-scroll fallback.
5. **Full visual redesign, Aug 2026** — the site moved from a self-originated cream/ink/yellow ruled-grid system to this rounded/blue-accent system, explicitly modelled after a reference the user liked. This is the one point in the project's history where the visual identity changed wholesale rather than iterating on the existing system — if asked to "match a reference site" again in the future, treat it with the same weight (confirm scope with the user before touching the whole stylesheet, since it's effectively a full rebrand, not a tweak).

## Analytics

- **Plausible**, placed in `<head>` right after the favicon/`apple-touch-icon` links, on all five pages — identical snippet on every page, including `fa/` (Plausible groups by domain, not path):
  ```html
  <!-- Privacy-friendly analytics by Plausible -->
  <script async src="https://plausible.io/js/pa-WlhEf1fv7_g-lryCSWBUS.js"></script>
  <script>
    window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
    plausible.init()
  </script>
  ```
  This is Plausible's per-site script tied to the `alibabaei.info` site specifically. If the site is ever recreated in Plausible, re-copy the fresh snippet from the dashboard.
- Chosen over Mixpanel/GA4: a marketing/coaching site with one conversion action (the booking form), not a product with complex funnels.
- Pageview tracking only for now — no custom events wired up.

## File map

- `index.html`, `services.html`, `about.html`, `book.html` — the four real English pages. Each duplicates the header/menu-overlay/footer markup.
- `fa/index.html` — the single Persian landing page. See "Persian (fa/) localization" below.
- `css/style.css` — all styles: tokens, every page's layout, the responsive overrides, and the Persian/RTL section at the end. One shared file for both languages — never fork a `style.fa.css`.
- `js/main.js` — full-screen menu toggle (`initSiteMenu()`) + booking form (topic chips, submit/success/error handling) + in-page anchor smooth-scroll + scroll-reveal + hero word-cycle. Shared verbatim by every page in both languages.
- `js/system-loop.js` — the Home hero animation. `PALETTE.accent` is `#2F5DFA` (updated in the redesign — was `#FFD400`), `PALETTE.ink` is `#0B0B10`; these are hardcoded hex, not CSS custom properties (the SVG is built with plain JS, no CSS var reads) — if the accent/ink tokens ever change again, this file needs a matching manual edit, `grep` for `PALETTE` to find it. Used only by `index.html` — `fa/index.html` uses the centered `.landing-hero` instead, with no animation.
- `assets/` — `portrait-home.jpg` (About portrait), `logo-mark.jpg` (nav mark, see Imagery), `favicon-16x16.png` / `favicon-32x32.png` / `apple-touch-icon.png` (generated from `logo-mark.jpg`), `fonts/kalameh/` (self-hosted Persian webfont).
- `favicon.ico` — repo root, so browsers that auto-probe `/favicon.ico` find it without a `<link>` tag.
- This file (`DESIGN-SYSTEM.md`) — update in the same commit as any visual/content change so it never drifts from the live files.

## Persian (fa/) localization

**One page, not four.** `fa/index.html` is a single, standalone landing page — not a Persian mirror of `index.html`/`services.html`/`about.html`/`book.html`. Do not re-split it into multiple fa/ pages without being asked.

**Structure** (four sections, reusing existing components):
1. `.landing-hero` — centered, single-column hero variant. No split copy/portrait layout, no System Loop animation — centered eyebrow → h1 (reusing `.hero-h1` and the same word-cycle mechanism) → intro copy → centered CTA row. Also gets the hero load-in animation (see Motion) since `.landing-hero > *` is included in that selector.
2. `#services` — the `.section.pad-lg` / `.section-head` / `.section-lede` / `.grid-2` / `.offer-card` components from the English homepage's "Two ways I work with you", reused verbatim. `meta-right` reads `۰۱ / خدمات`.
3. The Home page's process component (`.process-section` / `.process-head` / `.process-list` / `.process-row` / `.process-num` / `.process-copy`), reused verbatim — now a card grid (see Structural motif). Six steps translated for meaning, not word-for-word, since the fa page only offers two consulting/coaching paths rather than the English site's four service areas. `meta-right` reads `۰۲ / فرایند`.
4. `#book` — the `.book-grid` / `.book-intro` / `.book-form-panel` booking form component, reused verbatim, fully functional (now a unified dark panel, see Forms & inputs).

Nav is the same full-screen `.site-menu` overlay as the English pages, with Persian labels (خانه / خدمات / رزرو مشاوره / English) — see "Navigation" above.

- **`<html lang="fa" dir="rtl">`**. The `dir="rtl"` *attribute* is what makes the browser auto-mirror grid/flex column order and default text alignment for free — this is also why the full-screen menu overlay needs zero fa-specific layout CSS beyond the line-height fix below.
- **Logical CSS properties, not physical**: any directional CSS (`padding-inline-start`, `border-inline-end`, `inset-inline-start`, etc., not their physical `-left`/`-right` equivalents) so it resolves correctly for both `dir="ltr"` and `dir="rtl"` with no separate override. The redesign's card-based components mostly don't need directional borders anymore (no more shared hairline dividers between grid cells), which removes a whole category of physical-vs-logical bugs the old system had to watch for — but any *new* directional rule (padding, absolute positioning) should still default to the logical form.
- **Font — Kalameh, self-hosted, not Google Fonts**: `html[lang="fa"]` redefines `--font-display`/`--font-body`/`--font-mono` to `"KalamehWeb"`. Proprietary/commercial font licensed from fontiran.com — four weights (Light 300, Regular 400, Bold 700, Black 900) in `assets/fonts/kalameh/`, `@font-face`'d at the top of the Persian section of `css/style.css`. `assets/fonts/kalameh/FontLicense.txt` has the purchased license code (`1W30FEGU`) filled in; the vendor-mandated attribution badge (`.font-license-badge`) is in the fa page's footer, linking to `https://fontiran.com/license/1W30FEGU`. Body copy renders at `font-weight: 300`; headings render at `900`; a second tier of UI emphasis (buttons, stat numerals, index numbers) sits at `700`.
  - **Heading line-height**: fa headings use `line-height: 1.45` (`html[lang="fa"] h1, .services-hero h1, .about-h1, .book-intro h2`) — looser than Inter's tighter English values, since Kalameh's heavy 900 weight collides ascenders/descenders across lines at tight spacing.
- **Letter-spacing / uppercase reset**: `html[lang="fa"] * { letter-spacing: normal !important; text-transform: none !important; }` — Kalameh is a joined script (letter-spacing breaks joining), and uppercase is a no-op on Persian glyphs but would still wrongly shout embedded Latin. The one deliberate `!important` in the stylesheet.
- **Voice — written fresh, not translated**: fa copy is composed directly from Ali's brand/personality (pragmatic, hands-on, "turning abstract design principles into decisions teams can ship"), not a sentence-by-sentence translation of the English copy. Register is warm, semi-colloquial, personal: second-person `شما` (never intimate `تو`) with colloquial contractions throughout (`می‌تونه` not `می‌تواند`, `را`→`رو`, `-تان`→`-تون`). Avoid literal English-calque constructions. Keep this register consistent across any future fa content.
- **Arrow glyphs**: fa markup writes the CTA arrow as `←` directly in the HTML wherever English has `<span>→</span>`. Hover nudge direction flips to match (`translateX(-5px)`).
- **Hero word-cycle, two fa-specific overrides**: (1) `.cycle-word-mask`'s `vertical-align: bottom` lines up with Latin's descender space but sits visibly below Kalameh's baseline — `html[lang="fa"] .cycle-word-mask { vertical-align: baseline; transform: translateY(0.04em); }` fixes it (tuned by eye against a screenshot, not computed — Persian diacritics skew a plain `getBoundingClientRect()` reading). (2) English forces `.cycle-break` onto its own line ≤900px so long words don't overflow — fa's two-word verbs fit fine wrapping naturally, so `html[lang="fa"] .cycle-break { display: none; }` opts fa back out of the forced break.
- **Numerals**: real Persian digits (۰–۹) directly in the markup. Kalameh renders them natively — no CSS or JS needed, just type them. (The redesign's ghost-numeral component — see Recurring components — is solid-fill by default now, so there's no longer a hollow/outline legibility exception to track here; that was specific to the old system's stroke-outline numeral style.)
- **Client/company/institution names**: kept in their original Latin spelling (e.g. "Telewebion", "Amanj Academy") since inventing a Persian transliteration risks misspelling a real brand's identity. Well-known university names use their standard Persian names (e.g. "دانشگاه شهید بهشتی").
- **Booking form**: fully functional, posting to the same Formspree endpoint. All validator/error copy comes from data attributes read generically by `js/main.js` — never fork the JS to hardcode Persian text.
- **`hreflang` + Open Graph**: every page carries `<link rel="alternate" hreflang="en|fa">` — the four English pages point their `fa` alternate at `https://alibabaei.info/fa/`, plus `hreflang="x-default"` and `og:locale`/`og:locale:alternate`. `sitemap.xml` carries reciprocal `xhtml:link` alternates between the English homepage and `fa/`.
