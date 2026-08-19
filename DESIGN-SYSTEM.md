# Ali Babaei Site — Design System

Source of truth for visual/content consistency across `index.html`, `services.html`, `about.html`, `book.html`, `fa/index.html` and `css/style.css`. Update this file in the same commit as any visual/content change so it never drifts from the live code.

**Redesign note (Aug 2026):** the site was fully redesigned in four successive passes, all modelled after a reference site the user liked (`liquid-ali-lab.base44.app`, a Base44/React SPA — its demo content turned out to be generated from Ali's own resume data, which is why the copy lines up so closely with ours). **Pass 1** (rounded 22px cards, soft shadows, Inter-only, filled rounded inputs) was a visual approximation from screenshots alone. **Pass 2** used the reference's compiled Tailwind CSS plus a generated design-system spec document to correct radius/shadow/font/input-style to exact values (0px radius except pill buttons, no default shadows, Space Grotesk + Inter, underline inputs, Ghost secondary button) and shortened the hero H1 to just "Ali Babaei". **Pass 3** used the reference's actual compiled JSX source (real ground truth, superseding the pass-2 spec doc wherever they conflicted) to fix: the hero H1 is **fluid viewport-relative** (`16vw` mobile / `13vw` desktop), not a fixed 187px breakpoint jump; every card grid uses a **shared-hairline pattern** (`gap: 1px` + `background: var(--border-soft)` on the grid) instead of individually-bordered cards; and the marquee band is **dark**, not a light cream strip. **Pass 4**, prompted by the user sharing a full-page screenshot of the live reference for direct pixel comparison, fixed two more structural gaps the JSX alone hadn't made obvious: the **Home hero is a single centered column** (`.landing-hero--full`, full-viewport height, scroll hint) — the old split `.hero-grid` layout with the System Loop SVG animation on the right was dropped entirely, since the reference has no side visual in its hero at all; and **Teaching & mentoring is a stacked row-list** (`.teach-row`: period / title+role / description, hairline dividers), not a 3-up card grid. **Pass 5**, from the same screenshot comparison, removed the page-wide "aurora" gradient background entirely — `body` is now a flat `--cream`, no drifting blue/violet blobs; the reference's background is plain. If you find a card with its own full border instead of a shared hairline, a fixed-px hero size, a split hero-grid layout, a 3-card teaching grid, or a gradient/blob background on `body`, it's a leftover from an earlier pass — fix it forward.

## Color tokens

All colors are CSS custom properties in `:root` (`css/style.css`) — never a raw hex value in markup or in any rule outside `:root`.

| Token | Value | Use |
|---|---|---|
| `--cream` | `#F8F9FA` | Page background tint (stats band, marquee) |
| `--bg-soft` | `#F1F2F4` | Portrait/media placeholder fill |
| `--ink` | `#0A0A0B` | Text, dark panels (footer, booking section, menu overlay, CTA band, dark offer card) |
| `--white` | `#FFFFFF` | Card fills, header |
| `--body-copy` | `#0A0A0B` | Body copy on light backgrounds |
| `--muted` | `rgba(10,10,11,.6)` | Muted label/meta text on light backgrounds |
| `--muted-88` / `--muted-40` / `--muted-30` | `rgba(10,10,11,.88/.40/.30)` | Opacity-tier text hierarchy on light backgrounds — use a tier instead of inventing a new gray |
| `--accent` | `#2E5BFF` | The **one** accent — buttons, links, focus, active nav, numeral/bullet accents |
| `--accent-hover` | `#1E4AB8` | Button/link hover state |
| `--accent-active` | `#1538A0` | Button :active state |
| `--accent-pale` | `#E7ECFF` | Pale accent-tint chip background (`.mark-yellow` inline headline highlight) |
| `--dark-muted-1` / `--dark-muted-2` / `--dark-muted-3` | `rgba(248,249,250,.95/.7/.88)` | Opacity-tier text hierarchy on `--ink` panels |
| `--dark-30` | `rgba(248,249,250,.3)` | Placeholder text on dark form inputs |
| `--border-soft` | `#CDCFD6` | Card borders on light backgrounds |
| `--border-light` | `#E2E4E9` | Lighter dividers on light backgrounds (header, stat cells, tools row) |
| `--border-dark` | `rgba(248,249,250,.2)` | Borders/dividers on `--ink` panels (menu, form inputs, topic chips) |
| `--border-dark-hover` | `rgba(248,249,250,.4)` | Hover state for the above |
| `--error` | `#DC2626` | Field-level validation only |

**Rule: never introduce a new color without a narrow, explicit, documented scope.** `--accent` is the *only* colour allowed on a button, link, hover state, or small numeral/bullet accent — never a large saturated background fill. Large dark surfaces use `--ink`; large light surfaces use `--white`/`--cream`. Text hierarchy is expressed through the opacity tiers above, not new named grays.

**Legacy alias tokens**: `--yellow`, `--index-gold`, `--on-yellow-strong`, `--on-yellow-body`, `--hairline-light`, `--hairline-dark`, `--blue` still exist in `:root` as aliases pointing at the tokens above (a holdover from the original pre-redesign system), so a missed reference resolves to something reasonable. Don't write new `var(--yellow)` etc. — use `--accent` / `--accent-pale` / `--ink` directly. `.mark-yellow` (the hero headline's inline highlight box, used on the fa page's word-cycle) keeps its old class name — it's a pale-blue chip, not literally yellow.

### Radius / shadow / easing tokens

| Token | Value | Use |
|---|---|---|
| `--radius` / `--radius-lg` / `--radius-md` | `0px` | **Every card, panel, input, section — sharp corners are the rule**, not the exception |
| `--radius-full` | `9999px` | Buttons, pills, topic chips, brand/footer logo mark (the only rounded elements in the system) |
| `--shadow-card` | `none` | Cards have **no** shadow by default |
| `--shadow-hover` | `0px 1px 3px rgba(0,0,0,.08)` | The one permitted shadow, on hover only (currently used on `.article-card:hover`) |
| `--ease-lux` | `cubic-bezier(.33,1,.68,1)` | The system's primary motion easing — hero load-in, scroll reveal, menu overlay, marquee-adjacent transitions |
| `--ease-inertia` | `cubic-bezier(.76,0,.24,1)` | Reserved for inertial/drag-style motion — defined but not yet consumed by any rule; keep it in `:root` for future use rather than inventing a second easing token |

**This is a deliberate, hard-learned correction**: the redesign's first pass used 22px-rounded cards with soft shadows, which looked plausible from screenshots but was wrong — the reference's actual spec is 0px radius everywhere except pill-shaped buttons, and no shadow except a subtle one on hover. Don't reintroduce rounded cards or default shadows.

## Type

- **Two typefaces**: `Space Grotesk` (weights 400/500/600/700) for **all headings, buttons, labels, numerals, brand name, and eyebrow/meta text**; `Inter` (weights 400/500/600) for **body copy and form inputs only**. Both loaded from Google Fonts (English pages); the fa page self-hosts Kalameh for both roles instead (see Persian localization).
- `--font-display` / `--font-mono` both resolve to Space Grotesk (kept as two token names for historical reasons — every heading/label/numeral rule references one or the other, they're identical). `--font-body` resolves to Inter.
- Headings: weight `600`, `letter-spacing: -0.02em`. `h1` is additionally `text-transform: uppercase` with `line-height: 0.85` — the one deliberate display-caps treatment. `h2`/`h3`/card titles are **not** uppercase.
- Body: Inter `400`, `18px` desktop / `16px` ≤900px, `line-height: 1.556`, `letter-spacing: -0.02em` (set once on `body`, inherited).

### Desktop type scale (exact values from the reference spec — do not approximate)

| Use | Size / weight / line-height |
|---|---|
| Home hero H1 (`.hero-h1`) | **Fluid, viewport-relative**: `16vw` below 768px, `13vw` at ≥768px (this is the reference's actual rule, confirmed from its compiled JSX — not a fixed px breakpoint). At a ~1440px viewport this computes to ~187px, which is where the design-system spec doc's "187px" figure came from — treat that number as a snapshot, not the rule. Reserved for a **short** headline (the reference's own hero is just a name); do not put long copy in this class |
| `.landing-hero`/`.services-hero`/`.about-h1`/`.book-intro h2` (fluid `clamp()` variants, unrelated to `.hero-h1`) | `60px` base tier scaling up via `clamp()` |
| Section H2 (`.section-head h2`) | `clamp(32px, 5vw, 60px)` / 600 |
| Section H2, fixed-width lists (`.section-head-fixed h2`) | `40px` / 600 |
| H3 (card titles, `.offer-card`/`.pillar-card`) | `30px` / `23px` depending on card density / 600 / `1.2` |
| H3 (denser cards — teach/consulting/article/process) | `19–21px` / 600 |
| Stat numeral (`.stat-value`) | `60px` / 600 / `1` |
| Ghost numeral (`.pillar-num`/`.process-num`) | `40px` / 600, color `--border-soft` |
| Full-screen menu link | `clamp(38px, 8.5vw, 92px)` / 600 |
| Body copy (hero/services/about intro, `.intro-copy`) | `18px` / 400 / `1.556` |
| Body copy (card/list text) | `15–17px` / 400 |
| Button label | `12px` / 400, uppercase, `letter-spacing: 0.02em` |
| Field label (`.field label` / `.topics-label`) | `10px` / 400 (Space Grotesk), uppercase, `letter-spacing: 0.04em` |
| Eyebrow / meta / marquee text | `12–13px`, Space Grotesk |

Mobile override (≤900px): `body { font-size: 16px; }`. `.hero-h1`'s own fluid `vw` sizing already scales down naturally on mobile (see the fluid-sizing note above) — nothing else needs a breakpoint override. Never lower a desktop value below what's listed here outside `.hero-h1`'s intentional fluidity.

## Spacing & grid

- **4px base spacing unit** — all paddings/gaps are multiples of 4 (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96px in active use).
- Section padding: `96px 40px` desktop (`.section`), `48px 32px` tablet (≤1023px), `24px` mobile (≤900px, both axes via `.pad-lg`/`.section`).
- Card padding: `24px` (dense cards) to `32px 24px` (offer/pillar cards) to `40px 48px` (dark offer card).
- Grid gaps: `1px` (shared-hairline, see Structural motif below) in every card grid (`.grid-2`, `.pillars-grid`, `.consulting-grid`, `.process-list`, `.stats-grid`); `20px` in `.writing-grid` (the one standalone-card exception).
- **Container max-width**: `--container-max: 1200px`, centered via `margin-inline: auto`, applied to `.section`, `.about-grid`, `.services-hero`, `.landing-hero`, `.stats-band > .stats-grid`, `.pillars-grid`, `.cta-band-inner`, `.section--rowlist`. **Known compromise**: dark full-bleed bands (footer, `.book-grid`, `.cta-band`) keep their background edge-to-edge and don't get a hard max-width on their inner content — separating "full-bleed background" from "centered inner content" for those would need a wrapper `<div>` this static markup doesn't have. Don't silently "fix" this without adding that wrapper first.
- **Full-viewport hero** (Home only, `.landing-hero--full`): `min-height: 100svh`, content vertically centered, a `.hero-scroll-hint` ("Scroll ↓") pinned to the bottom via `position: absolute`. This modifier class only applies to the Home hero — the fa page's `.landing-hero` (no `--full` modifier) stays a normal-height content hero, not full-screen.

## Structural motif — sharp corners, no default shadow, restrained accent

**Card grids use a shared-hairline pattern, not individually-bordered cards.** For `.stats-grid`, `.grid-2` (offer cards), `.process-list`, `.pillars-grid`, and `.consulting-grid`: the grid container itself gets `gap: 1px`, `background: var(--border-soft)` (or `--border-light` for stats), and `border: 1px solid` that same color; each cell (`.stat-cell`, `.offer-card`, `.process-row`, `.pillar-card`, `.consulting-cell`) just gets `background: var(--white)` with no border of its own — the 1px gap plus the container's background color is what renders as a shared hairline between cells, confirmed from the reference's actual compiled source. **Do not give individual cells their own border** — that was pass-2's approximation (matching the generated spec doc's literal "1px solid border" card description) and produces double-thickness lines plus a visible gap instead of a true shared hairline.

**Gotcha — odd item counts.** `.consulting-grid` is reused across About's Consulting/Product-experience/Speaking lists with varying item counts (8, 5, 5). In a `background`-on-container hairline grid, a lone trailing item in an odd-count list leaves an empty grid cell that shows the container's background color as a visible gray box. Fixed via `.consulting-cell:last-child:nth-child(odd) { grid-column: 1 / -1; }` — spans the lone last item full-width instead. Any new grid reused for variable-length content needs the same guard.

`.article-card` (Writing section only) is the one exception that keeps a real individual border (`1px solid var(--border-soft)`, `background: var(--white)`) plus a hover treatment (`border-color: var(--accent); box-shadow: var(--shadow-hover)`) — it isn't part of the reference and has no shared-grid counterpart to match, so it kept the simpler standalone-card pattern.

Every element in this system has **no radius, no shadow** except: buttons/pills (`border-radius: var(--radius-full)`), `.article-card`'s hover shadow, and the circular logo mark.

A subtle full-page **grain/noise texture sits ABOVE all content**, not behind it: `body::after` is a fixed, `pointer-events: none` radial-gradient dot pattern (`rgba(10,10,11,.04) 1px, transparent 1px` at `4px 4px`), `z-index: 5` — higher than `.site`'s `z-index: 2`, so it paints over the opaque header, white cards, everything. This is deliberate and was fixed forward from an earlier mistake: `z-index: 1` (below `.site`) made the grain invisible anywhere an opaque element sat on top of it, most visibly the solid-white header — a zoomed screenshot of the reference's header confirmed the grain is meant to be visible everywhere uniformly, like a print/paper texture over the whole page, not just in gaps between opaque elements. `pointer-events: none` keeps it from blocking clicks. `body`'s own background is a **flat `--cream`, no gradient** — an earlier pass added a drifting multi-blob blue/violet gradient behind the whole page, but a direct screenshot comparison against the reference showed its actual background is plain and flat; the gradient was removed. Don't reintroduce a page-wide gradient/aurora effect, and don't drop the grain's z-index back below `.site`'s.

Every grid container that should render as columns must be in the shared `display: grid` rule near the top of `css/style.css` (currently: `.about-grid, .book-grid, .services-hero, .grid-2, .pillars-grid, .consulting-grid, .writing-grid`) — a grid class defined only with `grid-template-columns` and no `display: grid` silently renders as a stacked block.

## Recurring components

- **Eyebrow + heading + meta-right header row** (`.section-head`): flex row, `justify-content: space-between`, used atop every major section.
- **Ghost numeral**: `Space Grotesk 600`, `40px`, solid-fill `var(--border-soft)` (pale gray, no stroke/outline) — `.pillar-num` / `.process-num`.
- **2-up card grid**: shared-hairline cards (see Structural motif above), `gap: 1px` — `.grid-2`/`.offer-card`, `.pillars-grid`/`.pillar-card`, `.consulting-grid`/`.consulting-cell`.
- **Row list**: a stacked list with hairline dividers between entries, not a card grid — `.teach-list`/`.teach-row` (Teaching & mentoring: period / title+role / description in a 3-column row, collapsing to 1 column ≤900px).
- **Dark inverse panel**: `--ink` background + light text (`--dark-muted-1/2/3` tiers) — the dark offer card, the CTA band, the whole booking section, the footer, the full-screen menu overlay.
- **Buttons** — three variants, all `Space Grotesk 400 12px` uppercase unless noted:
  - **Primary** (`.btn-primary`, `.btn-invert`, `.btn-submit`, `.btn-reset`): filled `--accent` pill, white text, `padding: 16px 32px`, `min-height: 48px`, `border-radius: var(--radius-full)`, no shadow; hover `--accent-hover`, active `--accent-active`.
  - **Ghost / text-only** (`.btn-secondary`): transparent, no padding/border, `color: var(--ink)`; hover `color: var(--muted)`, active `color: var(--accent)`. Used where the reference shows plain text next to a filled pill (e.g. "See engagements").
  - **Topic chip** (`.topic-chip`, form only): outline pill on dark panels, `border: 1px solid var(--border-dark)`, transparent fill, `padding: 6px 12px`, `min-height: 30px`; selected state fills `--accent` + white text.
- **Marquee**: a **dark band** (`background: var(--ink)`, white text) — not a light cream strip — single-row infinite scroll of large `Space Grotesk 500 24px` client names, `✦` (`\2726`, colored `--accent`) separator after each item via `::after`, doubled array in markup, **40s** linear.

## Layout classes (breakpoint hooks — do not rename)

`.landing-hero` `.about-grid` `.book-grid` `.services-hero` `.grid-2` `.pillars-grid` `.consulting-grid` `.writing-grid` `.stats-grid` `.pad-lg` `.process-list` `.teach-row` `.site-menu` `.menu-trigger`

Breakpoints:
- **1023px**: `.process-list` collapses 3→2 columns; `.section` padding drops to `48px 32px`.
- **900px**: all grid classes collapse to 1 column (including `.process-list`); `.teach-row` collapses to a single stacked column; `.stats-grid` goes 4→2; About's portrait margin tightens; `.book-email` hidden; body font drops to `16px`. `.hero-h1` needs no override — its `vw` sizing already scales down.
- **560px**: `.stats-grid` goes 2→1.

The full-screen menu overlay (`.site-menu`) uses the same markup/CSS at every breakpoint — no separate mobile-nav pattern.

## Pages & sections (current inventory)

1. **Home** (`index.html`) — full-viewport centered hero (headline just **"Ali Babaei"**, no side visual — see Content rules below for why the copy is this short), stats band (4 stats), client marquee, "Two ways I work" (services teaser), teaching & mentoring (row list), process (6-card grid), booking form.
2. **Services** (`services.html`) — hero intro ("Engagements"), Four Areas of Work (pillars, numbered, 2-column card grid), dark CTA band.
3. **About** (`about.html`) — bio + portrait, Consulting Selection (8 clients, 2-column card grid), Product Design Experience (5 roles, 2-column card grid), Speaking & Panels (5 entries, 2-column card grid), Writing (2 Medium articles, 2-column card grid).
4. **Book** (`book.html`) — booking form only.
5. **fa** (`fa/index.html`) — single Persian landing page; see "Persian (fa/) localization" below.

Footer (all pages): name + logo, tagline, email, social links (LinkedIn/Dribbble/Behance/Medium), copyright.

## Content rules

- **Hero headline length is load-bearing.** The `187px` desktop hero H1 size is calibrated (by the reference itself) for a very short headline — literally a name. This is why the Home hero's copy was shortened from a full tagline to just **"Ali Babaei"**: the original longer headline broke into 5–6 giant overflowing lines at this size. If the hero headline ever needs to say something longer again, shrink the type scale deliberately (and update the table above) rather than letting a long string silently overflow at 187px.
- Every stat/number must be real (resume-sourced), no filler metrics.
- One CTA style per context: primary = `--accent` filled pill, secondary = ghost text-only, tertiary = plain link with arrow `→` that turns `--accent` on hover.
- Section eyebrow on the right always states either an index (`01 / Engagements`) or a date range — pick whichever is more informative, never both.
- **Known open inconsistency**: `fa/index.html`'s hero still uses the original longer tagline + word-cycle mechanism ("تصمیم‌های طراحی که تیم‌تون می‌تونه [بسازه/دفاع کنه/...]"), unlike the English homepage's new name-only hero — this was a deliberate scope decision (Persian names read differently in a giant single-word treatment) but hasn't been explicitly confirmed with the user. Don't change it without checking first.

## Imagery

- Portrait treatment: full-bleed illustration, `background: var(--bg-soft)`, `object-fit: cover`, **no radius, no ring/shadow** (sharp-edged box, not the earlier redesign's rounded frame).
- `assets/portrait-home.jpg` is used only on the About page portrait now — the Home hero has no image or animation at all (matching the reference exactly: a centered, illustration-free hero). `js/system-loop.js` (the old hero animation) is no longer referenced by any page; it's dead code left in the repo, not deleted outright, in case it's wanted again elsewhere — don't re-add its `<script>` tag to `index.html`.
- Logo mark (nav, `30px`; footer, sized to `0.85em` of the wordmark): `assets/logo-mark.jpg`, `border-radius: 50%` (the one non-pill rounded element, since it's a circular photo mark, not a card/button), `object-fit: cover` — a yellow-circle illustrated mark, deliberately **not** repainted to the blue accent; it's brand artwork independent of the UI color system.
- Favicon: generated from `assets/logo-mark.jpg` — `favicon.ico` at repo root plus `assets/favicon-16x16.png` / `favicon-32x32.png` (transparent) and `assets/apple-touch-icon.png` (180×180, opaque — iOS renders alpha as black). Regenerate all four if the logo mark changes.

## Forms & inputs (booking form, on Home + Book)

- The whole booking section (`.book-grid`, both intro and form panel) is a single dark `--ink` panel.
- **Inputs are underline-only, not boxed** (`.field input`, `.field textarea`): `background: transparent`, `border: none`, `border-bottom: 1px solid var(--border-dark)`, `padding: 8px 0`, `min-height: 46px` (inputs), Inter `18px` white text. Hover brightens the underline to `--border-dark-hover`; focus thickens it to `border-bottom: 2px solid var(--accent)`. This replaced the first redesign pass's filled rounded box — do not reintroduce a background fill or full border on these.
- Labels (`.field label`, `.topics-label`): Space Grotesk `10px` uppercase, `--dark-muted-3`.
- Topic chips: outline pill (`--border-dark`) on the dark panel, toggle to solid `--accent` fill + white on `.is-selected` (JS-driven, `js/main.js`); selected values collect into a hidden `topics` input.
- Submit: `.btn-submit`, primary-style filled pill; success state hides `<form>` (`[hidden]`, with an explicit `.booking-form[hidden] { display: none; }` override since `.booking-form`'s own `display: flex` would otherwise beat the browser default) and shows `.booking-success`, a pale-accent-tinted panel (`rgba(46,91,255,.1)` bg, `rgba(46,91,255,.3)` border — no radius) with a "send another" reset (also primary-style).
- Submission-level error (`.form-error`): pale red-tinted banner (`rgba(220,38,38,.16)` bg) — network/Formspree failures, distinct from field-level `--error` styling (used for the sharper `#DC2626`).
- Field-level validation (`.field-error`, `.field.has-error`): unchanged logic — `novalidate` on the form, `js/main.js` builds an ordered list of validators (every `[required]` input/textarea, plus the topic-chip group), validates live on blur/input, shows only the first invalid field's message on submit, scrolled/focused into view. Messages come from `data-required-message`/`data-invalid-message` attributes.
- First session is free — always state this in the booking copy.
- Submissions post to Formspree (`action="https://formspree.io/f/myeggnpv"`); `js/main.js` intercepts with `fetch()` for the app-like success/error swap (`Accept: application/json`).

## Navigation

- **Full-screen menu overlay** — the only nav pattern, every breakpoint. `.site-header` (`64px` tall, white, `1px solid var(--border-light)` bottom border) holds only the brand mark/name and a `.menu-trigger` button; clicking it opens `.site-menu`, a fixed full-viewport `--ink` panel:
  - `.site-menu-head`: "Index"/"فهرست" label + "Close"/"بستن" button with inline X icon.
  - `.site-menu-links`: real page list (Home/Services/About/Book a session + fa/EN switch) as huge (`clamp(38px,8.5vw,92px)`) stacked links with per-`nth-child` staggered fade/slide-in; hover and `aria-current="page"` both turn `--accent`.
  - `.site-menu-foot`: founding date range + email, small tracked meta text.
  - `initSiteMenu()` in `js/main.js`: click trigger to open, click close/any link/Escape to close; `.menu-open` locks background scroll on `<html>`/`<body>`. Respects `prefers-reduced-motion`.
- Current page gets `aria-current="page"` inside `.site-menu-links`, styled `--accent`.
- **Language switch**: a row in the full-screen menu list (`"فا · Persian"` on English pages, `"English"` on the fa page) — not a separate header pill.
- fa's overlay uses the same component with Persian labels — RTL flips automatically via `dir="rtl"`, plus `html[lang="fa"] .site-menu-links a { line-height: 1.35; }` (Kalameh needs more line-height than Space Grotesk's tight `1.08` at this display size).

## Motion

- **Hero load-in**: `.landing-hero > *:not(.hero-scroll-hint)` (eyebrow, headline, intro, CTA row) animates in once on paint via `@keyframes hero-in` — fade + `translateY(22px→0)` + `blur(8px→0)`, `0.9s var(--ease-lux)`, staggered `animation-delay` per child (`0s / 0.1s / 0.24s / 0.36s`). The `:not(.hero-scroll-hint)` exclusion matters — without it the scroll hint's own bounce animation gets clobbered by the later, equal-specificity `hero-in` rule. Not the scroll-triggered `.reveal` mechanism below — plays on paint, above the fold. `prefers-reduced-motion` disables it (`animation: none`).
- **Section reveal**: every direct `main > section` fades + `translateY(24px→0)` + `blur(6px→0)` over `0.8s var(--ease-lux)` the first time it's ~12% into the viewport (`initScrollReveal()`, `IntersectionObserver`, `.reveal`/`.is-visible`). Falls back to immediately-visible, no animation, if `IntersectionObserver` is unavailable or `prefers-reduced-motion` is set.
- **Site-wide smooth scroll**: [Lenis](https://github.com/darkroomengineering/lenis) via CDN on every page before `js/main.js`; `initSmoothScroll()` no-ops silently on load failure or `prefers-reduced-motion`. `html { scroll-behavior: smooth }` is also set as a lightweight native fallback/complement. Same-page anchors (fa page's `#services`/`#book`) route through Lenis's `scrollTo()`.
- **Full-screen menu open/close**: `.site-menu` opacity/visibility transition (`0.5s var(--ease-lux)`) plus each link's staggered fade/slide — see Navigation.
- **Button arrow hover**: `→`/`←` in a bare `<span>`; desktop hover nudges `5px` (English) / `-5px` (fa) via `translateX()`, `0.3s cubic-bezier(0.34,1.56,0.64,1)` for a slight overshoot. Scoped to `@media (hover: hover)`.
- **Hero word cycle** (fa page and, historically, the English hero — now fa-only since the English hero is a static short name): in `.mark-yellow`, "actually"/static lead word stays put; the following `.cycle-word` rotates through `data-cycle-words` JSON via `initHeroTextCycle()`, drift-up-and-fade swap, `.cycle-word-mask` overflow-hidden mask, `prefers-reduced-motion` no-op.
- Any new motion should default to `opacity`/`transform`/`filter: blur()` and must have a `prefers-reduced-motion` path.

## Known intentional deviations

1. **Real multi-page routing** instead of the reference's single-page app. `index.html` / `services.html` / `about.html` / `book.html` are separate documents with real URLs. Header/footer markup is duplicated across files — no shared templating layer in a plain static site.
2. **Nav active-page indicator** — required by real routing.
3. **English homepage hero content was shortened to match the reference's short-hero pattern** (see Content rules) — a deliberate content change, not just a style change, made at the user's explicit request to match "even the text, its layout, font, size and hierarchy."
4. **`fa/index.html`'s hero content was not shortened** to match — see the "known open inconsistency" note under Content rules.
5. **Container max-width doesn't apply to dark full-bleed bands' backgrounds** (footer, booking, CTA band) — see Spacing & grid.
6. **External CDN dependencies (Lenis, Plausible)** — the only third-party scripts besides Google Fonts.
7. **Two-pass redesign, Aug 2026** — see the note at the top of this document. If asked to "match a reference site" again, get the actual compiled CSS / DOM / generated spec up front rather than approximating from screenshots — the gap between the two passes here was entirely radius/shadow/input-style/font-pairing assumptions that turned out wrong.

## Analytics

- **Plausible**, in `<head>` right after the favicon/`apple-touch-icon` links, on all five pages, identical snippet (Plausible groups by domain, not path):
  ```html
  <!-- Privacy-friendly analytics by Plausible -->
  <script async src="https://plausible.io/js/pa-WlhEf1fv7_g-lryCSWBUS.js"></script>
  <script>
    window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
    plausible.init()
  </script>
  ```
- Chosen over Mixpanel/GA4: a marketing/coaching site with one conversion action (the booking form), not a product with complex funnels.
- Pageview tracking only for now — no custom events wired up.

## File map

- `index.html`, `services.html`, `about.html`, `book.html` — the four real English pages. Each duplicates the header/menu-overlay/footer markup.
- `fa/index.html` — the single Persian landing page. See "Persian (fa/) localization" below.
- `css/style.css` — all styles: tokens, every page's layout, the responsive overrides, and the Persian/RTL section at the end. One shared file for both languages.
- `js/main.js` — full-screen menu toggle (`initSiteMenu()`) + booking form (topic chips, submit/success/error handling) + in-page anchor smooth-scroll + scroll-reveal + hero word-cycle. Shared verbatim by every page.
- `js/system-loop.js` — **orphaned**: the old Home hero animation, no longer referenced by any page (Home's hero is now the plain centered `.landing-hero--full`, matching the reference exactly). Left in the repo rather than deleted. If it's ever reused, note `PALETTE.accent`/`PALETTE.ink` are hardcoded hex (`#2E5BFF`/`#0A0A0B`), not CSS custom properties — `grep` for `PALETTE` and update manually if the tokens change.
- `assets/` — `portrait-home.jpg` (About portrait), `logo-mark.jpg` (nav mark), `favicon-16x16.png` / `favicon-32x32.png` / `apple-touch-icon.png` (generated from `logo-mark.jpg`), `fonts/kalameh/` (self-hosted Persian webfont).
- `favicon.ico` — repo root, so browsers that auto-probe `/favicon.ico` find it without a `<link>` tag.
- This file (`DESIGN-SYSTEM.md`) — update in the same commit as any visual/content change.

## Persian (fa/) localization

**One page, not four.** `fa/index.html` is a single, standalone landing page — not a Persian mirror of the four English pages. Do not re-split it without being asked.

**Structure** (four sections, reusing existing components):
1. `.landing-hero` — centered, single-column hero variant, reusing `.hero-h1` and the word-cycle mechanism (unlike the English homepage, fa's hero keeps its full tagline — see the "known open inconsistency" note). Also gets the hero load-in animation (`.landing-hero > *` is in that selector).
2. `#services` — `.section.pad-lg` / `.section-head` / `.section-lede` / `.grid-2` / `.offer-card` reused verbatim. `meta-right` reads `۰۱ / خدمات`.
3. The process component (`.process-section` / `.process-head` / `.process-list` / `.process-row` / `.process-num` / `.process-copy`) reused verbatim, as a card grid. Six steps translated for meaning, not word-for-word. `meta-right` reads `۰۲ / فرایند`.
4. `#book` — `.book-grid` / `.book-intro` / `.book-form-panel`, reused verbatim, fully functional.

Nav is the same full-screen `.site-menu` overlay as the English pages, with Persian labels (خانه / خدمات / رزرو مشاوره / English).

- **`<html lang="fa" dir="rtl">`**. The `dir="rtl"` attribute auto-mirrors grid/flex column order and default text alignment — this is also why the menu overlay needs zero fa-specific layout CSS beyond the line-height fix.
- **Logical CSS properties, not physical**: any directional CSS (`padding-inline-start`, `border-inline-start`, `inset-inline-start`) so it resolves correctly for both `dir="ltr"` and `dir="rtl"`.
- **Font — Kalameh, self-hosted, not Google Fonts**: `html[lang="fa"]` redefines `--font-display`/`--font-body`/`--font-mono` to `"KalamehWeb"`. Four weights (Light 300, Regular 400, Bold 700, Black 900) in `assets/fonts/kalameh/`, `@font-face`'d at the top of the Persian section of `css/style.css`. License code `1W30FEGU`, attribution badge (`.font-license-badge`) in the fa footer linking to `https://fontiran.com/license/1W30FEGU`. Body copy renders at `font-weight: 300`, `line-height: 1.85`; headings render at `900`; buttons/numerals/UI emphasis sit at `700`.
  - **Heading line-height**: fa headings use `line-height: 1.45` (`html[lang="fa"] h1, .services-hero h1, .about-h1, .book-intro h2`) — looser than the Latin values, since Kalameh's heavy 900 weight collides ascenders/descenders at tight spacing.
- **Letter-spacing / uppercase reset**: `html[lang="fa"] * { letter-spacing: normal !important; text-transform: none !important; }` — Kalameh is a joined script (letter-spacing breaks joining), uppercase is a no-op on Persian glyphs but would still wrongly shout embedded Latin. The one deliberate `!important` in the stylesheet.
- **Voice — written fresh, not translated**: fa copy is composed directly from Ali's brand/personality, not a sentence-by-sentence translation. Register is warm, semi-colloquial, personal: second-person `شما` (never intimate `تو`) with colloquial contractions (`می‌تونه` not `می‌تواند`, `را`→`رو`, `-تان`→`-تون`). Avoid literal English-calque constructions.
- **Arrow glyphs**: fa markup writes `←` directly wherever English has `<span>→</span>`. Hover nudge direction flips to match (`translateX(-5px)`).
- **Hero word-cycle, two fa-specific overrides**: (1) `html[lang="fa"] .cycle-word-mask { vertical-align: baseline; transform: translateY(0.04em); }` — Kalameh's baseline sits differently than Latin's (tuned by eye). (2) `html[lang="fa"] .cycle-break { display: none; }` (≤900px) — fa's two-word verbs fit fine wrapping naturally, so it opts out of English's forced line-break.
- **Numerals**: real Persian digits (۰–۹) directly in the markup — Kalameh renders them natively.
- **Client/company/institution names**: kept in original Latin spelling (e.g. "Telewebion") since inventing a Persian transliteration risks misspelling a real brand. Well-known university names use their standard Persian names (e.g. "دانشگاه شهید بهشتی").
- **Booking form**: fully functional, same Formspree endpoint, validator/error copy from data attributes read generically by `js/main.js` — never fork the JS to hardcode Persian text.
- **`hreflang` + Open Graph**: every page carries `<link rel="alternate" hreflang="en|fa">` — English pages point their `fa` alternate at `https://alibabaei.info/fa/`, plus `hreflang="x-default"` and `og:locale`/`og:locale:alternate`. `sitemap.xml` carries reciprocal `xhtml:link` alternates.
</content>
</invoke>
