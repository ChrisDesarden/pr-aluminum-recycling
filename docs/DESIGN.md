# Recircular — Design Specification

**Project:** Recircular: Puerto Rico Closed-Loop Aluminum Recycling
**Deliverable:** Static, single-page, scroll-driven interactive proposal site
**Hosting:** GitHub Pages
**Build pipeline:** None (plain HTML/CSS/JS, CDN libs only)
**Audience priority:** (1) PR government decision-makers, (2) private-sector partners, (3) public/journalists
**Document purpose:** Sufficient detail for a build agent to implement the site directly, end-to-end, without further design questions.

---

## 1. Page Structure

The page is one continuous HTML document. All sections stack in a single `<main>` element with `id`-anchored `<section>` blocks. A right-side dot navigator (see §3) reflects section order. Estimated total content length: **4,500–6,000 words** of body copy plus data visuals.

### Section map (top → bottom)

| # | ID | Section | Approx. words | Content type | Notes |
|---|----|---------|---------------|--------------|-------|
| 1 | `#hero` | Hero / cover | 30 | Title, lede, key stat, primary CTA, secondary CTA | Full viewport height |
| 2 | `#summary` | Executive summary | 350 | Dense paragraph + 4–6 KPI tiles | For the "60-second reader" |
| 3 | `#problem` | The problem | 550 | Prose + 2–3 charts (waste stream, import dependency, environmental cost) | Sets the stakes |
| 4 | `#cases` | Country case studies | 600 | Tabbed interface, 6 countries; per-tab mini-narrative + stat card | Tabs lazy-mount content |
| 5 | `#solution` | Proposed solution | 450 | Facility overview, process diagram (SVG), capacity statement | One big diagram |
| 6 | `#logistics` | Logistics and site selection | 400 | Map of candidate sites, criteria matrix, shortlist prose | 3–5 candidate municipalities |
| 7 | `#network` | Drop-off network | 250 | Leaflet map of PR with choropleth by municipality + point markers | Interactive, keyboard-navigable |
| 8 | `#budget` | Budget and funding | 500 | Stacked-bar or pie CAPEX breakdown + OPEX table + funding sources | "Show the math" |
| 9 | `#timeline` | Phased implementation | 350 | Vertical scrolling timeline, 4 phases (Years 0–1, 1–2, 2–4, 4–7) | Reveal on scroll |
| 10 | `#partners` | Partners and incentives | 350 | Logos / partner-type cards, DRS discussion, tax-incentive summary | Real entities only — placeholder if unconfirmed |
| 11 | `#impact` | Environmental impact / LCA | 450 | Lifecycle CO₂e savings, water use, energy; comparison chart vs. virgin Al | Numbers carry units + year |
| 12 | `#risks` | Risks and mitigations | 400 | Risk register table (likelihood × impact) + mitigations prose | Honest, not promotional |
| 13 | `#conclusion` | Conclusion / CTA | 200 | Restate ask, contact, next steps, three CTA buttons | Mirrors hero CTAs |
| 14 | `#about` | About, methodology, sources, download | 400 | Authorship, methodology, full source list with URLs, PDF download button, license | Required for credibility |

### Section content rules (apply throughout)

- Every claim that states a number, percentage, or fact carries a footnote or inline link.
- Footnote markers are `<sup><a href="#fn-N">[N]</a></sup>`; the source list in `#about` uses matching `id="fn-N"`.
- Every number has a unit and a year. Example: *"42,000 tonnes (2022)"* not *"42,000 tons"*.
- No emoji in body copy. Emoji are permitted only in the dot-nav tooltips if the build agent chooses (default: text labels).
- Section headings use the `serif` font family; body uses `sans`; data/numbers use `mono`.

### Section 1 — Hero (full viewport)

- **Layout:** Centered column, max-width 880px, vertically and horizontally centered.
- **Eyebrow text:** `A proposal for a closed-loop aluminum can recycling facility in Puerto Rico` (small caps, mono, 14px).
- **Title:** `Recircular` (display serif, 88–112px responsive). Subtitle: `Keeping Puerto Rico's aluminum circulating on the island.`
- **Key stat (large):** `1.4 billion` with caption `aluminum cans consumed in Puerto Rico per year (est., 2023)` — sourced.
- **Primary CTA:** `Read the proposal` (anchors to `#summary`).
- **Secondary CTA:** `Download PDF (1.2 MB)` (links to `/pdf/proposal.pdf`).
- **Background:** Subtle animated SVG of cans on a conveyor, or a static monochrome photograph of a recycling facility at 30% opacity, desaturated. A faint topographic line pattern overlay is acceptable. No full-bleed video.
- **Scroll cue:** A small "↓ scroll" indicator at the bottom, `prefers-reduced-motion` aware.

### Section 2 — Executive summary

- **Layout:** Single column, max-width 720px, centered.
- **Lead paragraph:** The proposal in one paragraph. What, where, how big, who pays, why now.
- **KPI tile grid (4 tiles, 2×2 on desktop, 1 column on mobile):**
  - `1.4 B` — cans/year on the island (2023)
  - `< 2%` — current PR aluminum recycling rate (2022)
  - `95%` — energy savings vs. virgin aluminum production
  - `$28 M` — Year-1 CAPEX (USD, 2025 dollars)
- **Right-rail or below:** A "What this proposal is not" 3-bullet list (e.g., "Not a refinery; not a substitute for DRS; not contingent on federal funds.").

### Section 3 — The problem

- **Sub-sections (each with its own `<h3>`):**
  - Current state of PR recycling
  - The waste stream (composition, volumes)
  - Environmental cost (landfill leachate, marine debris, virgin-aluminum import energy)
- **Charts (in order):**
  1. Horizontal bar: PR aluminum recycling rate vs. selected countries (placeholder data; flagged "illustrative" if not yet sourced).
  2. Sankey or flow diagram: where PR's aluminum goes (landfill / export / informal salvage / other).
  3. Small multiples: CO₂e per kg of virgin aluminum vs. recycled (kg CO₂e/kg).
- **Sidebars (callout boxes):**
  - One "JCA regulatory gap" callout (border-left, accent color).
  - One "Hurricane Maria landfill context" callout.

### Section 4 — Country case studies

- **Layout:** Tabbed interface. One row of 6 tabs at the top. Tab content area below.
- **Tabs:** `Brazil · Japan · EU · USA · Australia · Iceland / Taiwan`.
- **Each tab panel contains:**
  - Country flag emoji is forbidden; use a 2-letter ISO code in a mono badge.
  - 60–80 word mini-narrative.
  - 3 stat cards (rate, mechanism, scale).
  - One short "lessons for PR" bullet list (3–5 items).
- **Keyboard nav:** Left/right arrow keys cycle tabs; `Home`/`End` jump to first/last. Tabs have `role="tab"`, panels have `role="tabpanel"`, ARIA wiring per WAI-ARIA Authoring Practices.
- **Mobile:** Tabs collapse to an accordion (`<details>`-based) below 640px.

### Section 5 — Proposed solution

- **Layout:** Two-column on desktop. Left: prose. Right: process diagram.
- **Process diagram (SVG, hand-built, ~480 lines):** Five nodes with arrows:
  `Collection → Sort & shred → Decoating → Melt (rotary furnace) → Ingot / sheet / can-stock`
  - Each node is a clickable `<g>` with tooltip.
  - Hover/focus state shows input tonnage, output tonnage, energy intensity.
- **Prose covers:** Throughput (tonnes/year), furnace type rationale, why this capacity, slag handling, emissions controls.

### Section 6 — Logistics and site selection

- **Layout:** Map left, criteria matrix right on desktop. Stacked on mobile.
- **Map:** Leaflet map of PR with 3–5 candidate municipality markers. Click → sidebar with site facts (parcel size, road access, distance to port, power capacity, zoning).
- **Criteria matrix:** A simple 4×5 table (criteria × candidate sites), numeric scores, weighted total. Build from `assets/site-candidates.json`.

### Section 7 — Drop-off network

- **Layout:** Full-width Leaflet map (~480px height), legend and toggle controls below.
- **Map content:**
  - Choropleth fill of all 78 PR municipalities, colored by current recycling rate (5-step ramp, aluminum-gray → ocean-blue).
  - Optional point overlay: existing drop-off centers, color-coded by type (depot / supermarket / school / civic).
- **Interactions:**
  - Click a municipality → fly to bounds, open a popup with rate, population, nearest depot, projected tonnage.
  - Toggle layers: `Choropleth · Drop-off points · Both`.
  - Search box (type-ahead) to find a municipality by name.
- **Data file:** `assets/pr-map-data.json` (see §7 of this spec for schema).

### Section 8 — Budget and funding

- **Layout:**
  - Top: CAPEX stacked bar, total visible at the right edge.
  - Middle: OPEX table, 5-year projection.
  - Bottom: Funding sources table (e.g., PRIDCO equity, DRS-backed bond, partner CAPEX, EU grant) with % share.
- **"Show the math" accordion:** Every line item has an expandable "How we got this number" panel showing the calculation. Example:
  > Rotary furnace, 15,000 t/yr capacity: $7.2M
  > = $480/t installed × 15,000 t/yr (vendor quotes, 2024 USD; range $420–540)
- **Currency:** All dollars in USD with explicit year, default 2025 USD.

### Section 9 — Phased implementation timeline

- **Layout:** Vertical timeline, central line, alternating left/right cards on desktop, all-right on mobile.
- **Four phases:**
  - **Year 0–1:** Site acquisition, permits, EPC contract, equipment orders.
  - **Year 1–2:** Construction, commissioning, hire + train 38 FTE.
  - **Year 2–4:** Ramp to 70% capacity, second collection round, DRS pilot.
  - **Year 4–7:** Expansion to 100% capacity, second furnace optional, regional integration.
- **Each card:** Phase title, dates, 4–6 bullet milestones, 2–3 risk callouts.
- **Reveal:** Each phase card fades in on intersection.

### Section 10 — Partners and incentives

- **Layout:** 3-column card grid (desktop), 1-column (mobile).
- **Card types:**
  - **Anchor partners** (Coca-Cola, Ball, Walmart, PepsiCo, Novelis) — placeholder cards labeled "Outreach in progress" if no agreement exists.
  - **Government partners** (PRIDCO, JCA, FOMB, Municipal Offices).
  - **Incentive framework** (DRS, Act 60 tax credits, EPA brownfields, IRA §45X).
- Each card: name, role, what's asked of them, what's offered, status (Confirmed / In discussion / Hypothetical).

### Section 11 — Environmental impact / lifecycle

- **Layout:** Three-column KPI strip, then a comparison chart, then prose.
- **KPIs:** `kg CO₂e saved per kg Al`, `MWh saved per tonne`, `ML water saved per year`, `landfill diversion t/yr`.
- **Chart:** Grouped bar — Virgin vs. Recycled — across 4 metrics.
- **Prose:** Methodology (Ecoinvent boundary, system diagram), assumptions, sensitivity.
- **Honesty callout:** A small note acknowledging boundary choice and what is *not* counted (e.g., collection transport is, transoceanic shipping of bales prior is not).

### Section 12 — Risks and mitigations

- **Layout:** Risk register table (sticky-header) + mitigation narrative per top-3 risks.
- **Table columns:** ID · Risk · Likelihood (1–5) · Impact (1–5) · Score · Owner · Mitigation.
- **Top risks to surface (illustrative):**
  1. Insufficient collection volume (mitigation: DRS pilot Year 2, anchor-partner offtake).
  2. Energy price volatility (mitigation: PPA, on-site solar, demand response).
  3. Regulatory delay (mitigation: early JCA scoping, NEZ designation).
  4. Collection contamination (mitigation: deposit thresholds, public education).
  5. Hurricane disruption (mitigation: hardened site, 30-day feedstock stockpile).

### Section 13 — Conclusion / CTA

- **Restate the ask:** "Establish a 15,000 t/yr closed-loop aluminum recycling facility in Puerto Rico, financed through a public-private partnership, with phased ramp to 100% capacity by Year 4."
- **Three CTAs:**
  - `Download full proposal (PDF)` → `/pdf/proposal.pdf`
  - `Schedule a briefing` → `mailto:brief@recircular.pr` (placeholder)
  - `Sign the open letter` → anchors to a paragraph with signatory list / form (stretch goal).
- **Contact card:** Lead author, organization, email, phone, physical address.

### Section 14 — About / methodology / sources / download

- **About:** Who built this, why, governance, license (default: CC BY 4.0 for text; specific licenses for images and data).
- **Methodology:** 200-word description of how numbers were derived, what models used (Ecoinvent, EPA WARM, proprietary), confidence intervals.
- **Sources:** Numbered list, every fact-footnote in the document anchors here. Each source: author/agency, title, year, URL, accessed-on date. Group by section if the list is long.
- **Download:** `Download proposal.pdf (PDF, 1.2 MB)` and `Download data bundle (ZIP, 320 KB)` if available.
- **Colophon:** Fonts used, libraries used with versions, build-free note.

---

## 2. Visual Design System

### 2.1 Color palette

Five colors, semantic roles. All values verified for WCAG AA against both background and surface pairs.

| Token | Hex | Role | Contrast vs. `#F5F4F0` (paper) | Contrast vs. `#0E1116` (ink) |
|---|---|---|---|---|
| `--ink` | `#0E1116` | Primary text, headings on light | 17.4 : 1 | — |
| `--paper` | `#F5F4F0` | Default background (warm off-white) | — | 17.4 : 1 |
| `--aluminum-500` | `#9CA3AF` | Primary brand, dividers, axis lines | 2.7 : 1 (decorative only) | 7.6 : 1 |
| `--aluminum-700` | `#4B5563` | Secondary headings, captions | 7.5 : 1 | 4.7 : 1 |
| `--ocean-600` | `#0E6BA8` | Links, data emphasis, accent | 5.3 : 1 | 4.4 : 1 |
| `--leaf-600` | `#2F855A` | Positive metrics, growth, "savings" | 4.6 : 1 | 4.0 : 1 |
| `--ember-500` | `#C2410C` | Primary CTA, urgent CTAs, risk badges | 4.7 : 1 | 4.1 : 1 |
| `--rule` | `#D6D3CE` | 1px hairlines, table borders | — | — |

**Rationale.**
- `--aluminum-500` is the brand-neutral "silver." Use it for chrome, not text. For aluminum-toned body content, use `--aluminum-700`.
- `--ocean-600` carries the PR island/ocean context and is reserved for interactive/data emphasis.
- `--leaf-600` is for positive deltas only. It must never carry a negative meaning.
- `--ember-500` is CTA-only. Buttons using this color must have white text (`#FFFFFF`, contrast 4.7:1) and the words "Download" or "Read" — never "Submit" or "Click" (avoid imperative marketing voice).
- A neutral dark mode is **out of scope** for v1; document that fact in `#about` so it's not a surprise.

### 2.2 Typography

Three Google Fonts. All weights free and SIL OFL.

| Role | Family | Weights | Variable axis | Notes |
|---|---|---|---|---|
| Display & headings (serif) | **Source Serif 4** | 400, 600, 700 | opsz, wght | Editorial feel; pairs well with mono |
| Body (sans) | **Inter** | 400, 500, 600, 700 | opsz, wght, slnt | Optimized for screen |
| Data, captions, code (mono) | **JetBrains Mono** | 400, 500 | wght | For numbers, footnote markers, axis labels |

**Loading strategy.**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&family=JetBrains+Mono:wght@400;500&display=swap">
```

**Type scale (modular, base 1.25).**

| Token | px / line-height | Use |
|---|---|---|
| `--fs-display` | clamp(56px, 8vw, 104px) / 1.05 | Hero title |
| `--fs-h1` | clamp(40px, 5vw, 64px) / 1.1 | Section H1 |
| `--fs-h2` | clamp(28px, 3vw, 40px) / 1.15 | Sub H2 |
| `--fs-h3` | 22px / 1.25 | Sub H3 |
| `--fs-h4` | 18px / 1.3 | Card title |
| `--fs-body` | 17px / 1.6 | Body |
| `--fs-small` | 14px / 1.5 | Captions, footnotes |
| `--fs-mono` | 14px / 1.5 | Data, axis |

- Body line-length target: **60–75 characters** (`max-width: 38rem` on prose blocks).
- Headings: tighter line-height (1.05–1.15) and `-0.01em` letter-spacing on display sizes.
- Numbers: tabular figures (`font-variant-numeric: tabular-nums lining-nums;`) on all data tables and KPI tiles.

### 2.3 Spacing & layout

- **Grid:** 12-column, 24px gutter, max content width **1200px**, max prose width **720px**, max display width **1440px** for full-bleed sections only.
- **Spacing scale (8px base):** `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128` (Tailwind-aligned, easy mental math).
- **Section vertical rhythm:** `padding-block: 96px` on desktop, `64px` on mobile.
- **Reading width:** Prose blocks are constrained to 38rem; data-heavy blocks may extend to 56rem; full-bleed maps/charts may use 1200px.
- **Hairline rule:** 1px solid `--rule` between major subsections within a section (e.g., between sub-`<h3>` blocks inside `#problem`).
- **Container queries** preferred over media queries for cards and the case-study tabs so they reflow based on their own width.

### 2.4 Iconography

- **Library:** **Lucide** (`https://unpkg.com/lucide@latest`). MIT license, tree-shakeable SVG, no JS runtime required if inlined.
- **Usage rule:** icons appear at 20px in body, 24px in cards, 32px in hero. Always paired with a text label (icon-only buttons are forbidden).
- **Replacements:** for monochrome / facility-process icons, use a small set of custom inline SVGs (≤ 1KB each) — see §7.

### 2.5 Imagery

- **Treatment:** A consistent monochrome + selective-color rule. All photographs are desaturated to `--ink`-on-`--paper` duotone, except for **one** accent color per photograph (PR blue, leaf green, or ember orange) chosen to support the section.
- **Sources:** Free-license only — Unsplash, Wikimedia Commons, NASA, EPA, NOAA. Each image carries a `data-license` attribute and a `figcaption` with credit and source URL.
- **Archival vs. modern feel:**
  - Government / policy section: archival, high-grain, slightly sepia.
  - Engineering / process section: modern, clean, high-contrast.
  - Environmental / community section: warmer, more human, color richer.
- **No stock-photo "recycling bins" cliché.** The build agent must source specific images (e.g., a real PR landfill, a Ball plant in Georgia, a Brazilian recycling cooperative) — flagged in research notes.

---

## 3. Interactive Elements

All interactivity is **vanilla HTML/CSS/JS (ES2020+ modules allowed)**. No build step, no npm. A single `app.js` module imports only CDN libs.

### 3.1 Scroll-triggered reveals

- `IntersectionObserver` watches `[data-reveal]` elements.
- On intersection (threshold 0.15, rootMargin `0px 0px -10% 0px`), add `.is-visible`.
- Reveal is a single transform/opacity transition: `transform: translateY(12px); opacity: 0;` → `transform: none; opacity: 1;` over 600ms with `cubic-bezier(.2,.7,.1,1)`.
- One-shot: observer unobserves after first reveal.
- **`prefers-reduced-motion: reduce`** disables transforms and uses an opacity-only fade at 200ms.

### 3.2 Sticky section navigation (right dot nav)

- Fixed-position `<nav>` on the right edge, vertically centered, visible from viewport width ≥ 960px.
- 14 dots, one per section, current section scaled to 1.4× and filled with `--ember-500`.
- Tooltip on hover/focus shows section name (e.g., "Executive summary"). Tooltip is keyboard-accessible.
- Clicking a dot smooth-scrolls to the section.
- Active section tracked by an IntersectionObserver on the sections (use a 50%-of-viewport threshold for "current").
- On mobile: hidden, replaced by a top sticky `<select>` jump-menu.

### 3.3 Tabbed country case studies

- Implementation: `<div role="tablist">` with `<button role="tab">` children, and corresponding `<section role="tabpanel" hidden>`.
- Keyboard: `ArrowLeft` / `ArrowRight` move and activate; `Home` / `End` jump; `Enter` / `Space` activate (default button behavior).
- ARIA: `aria-selected`, `aria-controls`, `tabindex` roving pattern (only the active tab is `tabindex="0"`).
- URL hash sync: activating a tab sets `location.hash = "#cases-{country}"` so deep links work.
- Mobile fallback: tabs become an accordion (`<details>`) under 640px.

### 3.4 Leaflet map of PR with drop-off candidates

- Lib: **Leaflet 1.9.4** via `https://unpkg.com/leaflet@1.9.4/dist/leaflet.css` and `leaflet.js`.
- Tiles: OpenStreetMap standard (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`) with the required attribution. No Mapbox token required.
- Two layers:
  1. **Choropleth** — GeoJSON of 78 PR municipalities, joined with `pr-map-data.json` (`recyclingRate` field), styled with a 5-step color ramp in `--ocean-600` tones.
  2. **Drop-off points** — point markers from the same data file, color-coded by `type` (depot / supermarket / school / civic) using aluminum-gray tones plus a single accent for civic.
- Controls: `L.control.layers` with toggles; a top-of-map legend (HTML, not Leaflet built-in, for styling control).
- Search: a small input above the map that, on input, calls `map.fitBounds` to the matching municipality's polygon.
- Keyboard: every interactive element reachable; popups closeable with `Esc`.
- Boundary file source: PR GDB or shapefile from the US Census TIGER/Line program, simplified to ~50KB and committed as `assets/pr-municipalities.geojson`.

### 3.5 Animated bar chart for country recycling rates

- Lib: **D3 v7.9+** via `https://cdn.jsdelivr.net/npm/d3@7` (ESM build, `import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm"`).
- Hand-rolled SVG, no charting framework.
- Horizontal bars, sorted descending, country name on left, value on right, all in `JetBrains Mono`.
- Bars fill from 0 → final value over 900ms on intersection, using `d3.interpolateNumber`.
- Y-axis: country name; X-axis: % (0–100).
- Annotation: a vertical dashed line at the PR rate with the label "Puerto Rico (target: 75% by Year 7)".
- Reduced motion: bars appear at final value with no transition.

### 3.6 Budget breakdown visualization

- Primary: **stacked horizontal bar** showing CAPEX composition, with category labels inline if the segment is wide enough, otherwise in a legend below.
- Secondary: a small **donut chart** showing CAPEX vs. OPEX vs. contingency split.
- Hover (or focus) on a segment: highlight + show absolute $ and % in a tooltip.
- Built with D3 (same as §3.5). All numeric labels in mono, with units and year.
- A "Download budget as CSV" link sits below the chart.

### 3.7 Vertical timeline

- Pure HTML/CSS/JS. A central vertical rule in `--aluminum-500`, with phase cards alternating left/right on desktop, all-right on mobile.
- Each card reveals on intersection (see §3.1).
- A progress fill on the central rule (height = scroll progress through the timeline section) provides a sense of advancement.
- Keyboard: phases are reachable as a `<nav>` with anchor links; current phase bolded.

### 3.8 Smooth scrolling and anchor links

- `html { scroll-behavior: smooth; }` with a `prefers-reduced-motion` override.
- Anchor link clicks use `scrollIntoView({ behavior: 'smooth', block: 'start' })` from JS to ensure offset for the sticky header.
- Sticky header is **not** used. The dot nav is the primary wayfinding, so no offset is needed.

### 3.9 No other interactivity

- No carousels, no modals (except the small "How we got this number" accordion), no tooltips beyond what is specified. Density of interaction should feel restrained.

---

## 4. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Markup | HTML5, semantic | One `index.html`. |
| Styles | Hand-written CSS, custom properties, container queries | One `styles.css`. No preprocessor. |
| Script | ES2020+ module | One `app.js`. |
| Build | None | No bundler, no transpiler, no `package.json`. |
| Server | GitHub Pages | Static. Custom domain ready. |
| Libs (CDN) | D3 v7, Leaflet 1.9.4, Lucide latest | All via `cdn.jsdelivr.net` or `unpkg.com`. |
| Fonts | Google Fonts (Source Serif 4, Inter, JetBrains Mono) | Preconnect + `display=swap`. |
| Tiles | OpenStreetMap standard | Attribution required. |
| Charts | D3 hand-rolled SVG | No Chart.js, no Recharts. |
| Map | Leaflet | No Mapbox, no Google Maps. |
| Icons | Lucide (inline SVG) | No icon font. |
| PDF | `pdf/proposal.pdf` committed as binary | Not generated by site. |
| Hosting budget | Free, GitHub Pages | Site weight target: page itself < 500 KB (excluding CDN libs). |

### Page weight budget

| Component | Target |
|---|---|
| `index.html` | < 60 KB |
| `styles.css` | < 60 KB |
| `app.js` | < 80 KB |
| Inline SVGs (logo, process diagram, icons) | < 40 KB total |
| JSON data files (5) | < 200 KB total |
| GeoJSON (municipalities) | < 80 KB (pre-simplified) |
| Hero image (if raster) | < 80 KB, AVIF or WebP, lazy |
| **Total** | **< 500 KB** (excluding D3 + Leaflet from CDN) |

### Browser support

- Last 2 versions of Chrome, Firefox, Safari, Edge.
- iOS Safari 16+, Android Chrome 110+.
- No IE11. Note this in the about page.
- JS features used: `IntersectionObserver`, `fetch`, `URL`, `crypto.randomUUID`, top-level `import`.

---

## 5. Content Guidelines

These rules apply to every section and to the build agent populating the site from research.

### 5.1 Tone

- Serious, professional, data-driven.
- Not marketing-speak. Avoid: "revolutionary," "game-changing," "world-class," "transformative."
- Not patronizing. No "imagine if…" framings.
- Plain words. Prefer "use" over "utilize," "help" over "facilitate," "show" over "demonstrate."
- Active voice. Subject–verb–object.
- Short sentences. Aim for < 22 words per sentence in body prose.

### 5.2 Voice and language

- Primary language: **English**.
- Bilingual headers: every section H1 carries an italic Spanish translation on the same line, e.g., `The problem — *El problema*`.
- Full Spanish version: **stretch goal**, not v1. Note in `#about`: "A full Spanish translation is in progress. Contact [email] to contribute."
- Where PR-specific terms have no clean English equivalent (e.g., *caserío*, *junta comunitaria*), use the term in italics, gloss in parentheses on first use, and provide a brief glossary in `#about`.

### 5.3 Sourcing

- Every factual claim links to a source.
- Inline citation format: `<sup><a href="#fn-N" id="ref-N">[N]</a></sup>`. Footnotes are anchors back to the source list.
- The source list in `#about` must include for each entry: author/agency, title, year, URL, accessed-on date. Example:
  > [12] US EPA. (2022). *Advancing Sustainable Materials Management: 2018 Tables and Figures.* https://epa.gov/... Accessed 2025-03-14.
- If a source is paywalled, link to the publisher's abstract page, not a sci-hub mirror.
- If a number is estimated, say "est." and explain the estimation in the methodology section.

### 5.4 Numbers

- Always carry a unit. `42,000 tonnes` not `42,000`.
- Always carry a year. `(2022)` or `as of 2022`.
- Use thousands separators. Use `M` / `B` only for headline stats where space is tight, and always spell out `million`/`billion` in the first mention of the body.
- Currency: USD. Spell out "US dollars" on first mention; `$` thereafter.
- Percentages: no space before `%`; one decimal place unless integer is meaningful.

### 5.5 Place names and specificity

- Use real PR municipalities: `Arecibo`, `Bayamón`, `Caguas`, `Carolina`, `Guaynabo`, `Ponce`, `San Juan`, `Toa Baja`, etc.
- Use real neighborhood / barrio names where relevant: `Río Piedras`, `Santurce`, `Cataño`, `Hato Rey`.
- For partner entities, use the legal name and parent company: "The Coca-Cola Company (Atlanta, GA)" not just "Coca-Cola."
- No fake statistics to fill space. If a number is missing, write "data unavailable — see methodology."

### 5.6 Show the math

- Every budget line item, every projection, every environmental number has an expandable "How we got this" panel.
- The panel contains the formula, the inputs, and a source. Example:
  > **Collection rate Year 1: 18%**
  > = 0.18 × 1,400,000,000 cans × 14.7 g/can
  > = 37,000 tonnes
  > (Assumes 18% recovery; benchmarked to Brazil 2014 ramp; Novelis PR feasibility memo, 2024.)

### 5.7 What the proposal is not

Include a small "What this is not" panel in the executive summary and reiterate in the conclusion. Required non-claims:

- Not a primary aluminum smelter (no Bayer process, no anode plant).
- Not a deposit-return scheme on its own (DRS may be paired, not replaced).
- Not contingent on federal funds (IRA §45X noted as upside, not base case).
- Not a substitute for upstream reduction or reuse policy.

---

## 6. Accessibility

Target: **WCAG 2.1 Level AA**, with selected AAA behaviors where they cost little.

### 6.1 Color and contrast

- Body text on `--paper`: `--ink` (#0E1116) at 17.4:1 — passes AAA.
- Body text on `--aluminum-700`: `--paper` at 7.5:1 — passes AAA.
- Links (`--ocean-600` on `--paper`): 5.3:1 — passes AA.
- Large text (≥ 24px or 19px bold): 3:1 minimum.
- Never use color alone to convey information. Charts must have text labels, patterns, or direct labels in addition to color.
- Data viz: provide a high-contrast mode toggle? Out of scope for v1; instead, ensure all charts include direct numeric labels.

### 6.2 Keyboard

- All interactive elements reachable in logical tab order.
- Visible focus indicators: 2px solid `--ember-500` outline with 2px offset, never `outline: none` without replacement.
- Skip-to-content link as the first focusable element in `<body>`; jumps to `<main id="content">`.
- Dot nav: arrow keys move between dots; `Enter` activates; `Esc` removes focus.
- Tabs: ARIA tabs pattern with roving `tabindex`.
- Map: every marker and choropleth region must be keyboard-focusable; activation opens a popup reachable by keyboard.
- Modal-like elements (budget math accordion): standard disclosure pattern, `Enter`/`Space` to expand.

### 6.3 Screen readers

- Semantic HTML5 throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- All images have `alt`. Decorative images use `alt=""` and `role="presentation"`.
- Charts: each chart has a visually-hidden `<table>` of the underlying data (`<table class="sr-only">`) so screen-reader users can perceive the numbers.
- Footnote markers: `aria-describedby` on the back-link target.
- Live regions: the dot nav announces section changes via `aria-live="polite"` on a hidden status node.

### 6.4 Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  [data-reveal] { transform: none !important; opacity: 1 !important; }
}
```

- All reveal animations, smooth scroll, bar-chart fills, and timeline progress respect this.
- Parallax is forbidden.

### 6.5 Language

- `<html lang="en">`. When the Spanish stretch goal lands, alternate sections or pages can be `<html lang="es">` (no mixed-lang switching in v1).
- Bilingual headers are presentational, not linguistic switching; they remain in the same document language.

### 6.6 Forms (if sign-the-open-letter stretch goal is implemented)

- Labels associated with inputs (`<label for>`).
- Error messages tied to inputs via `aria-describedby` and `aria-invalid`.
- Visible focus on all inputs.
- No CAPTCHA; use a simple honeypot field.

---

## 7. Data File Schemas

All data files live in `docs/assets/`. The build agent must produce these files from `research/` notes.

### `assets/pr-map-data.json`

GeoJSON FeatureCollection of 78 PR municipalities. Each feature:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "municipality": "San Juan",
        "municipalityId": "PR-127",
        "population": 318441,
        "recyclingRate2022": 0.012,
        "projectedTonnageYr1": 320,
        "nearestDepotKm": 4.2,
        "candidateSite": false
      },
      "geometry": { "type": "Polygon", "coordinates": [ ... ] }
    }
  ]
}
```

Drop-off point overlay is a separate file:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Walmart Supercenter Bayamón",
        "type": "supermarket",
        "operator": "Walmart Inc.",
        "status": "in-discussion",
        "tonnagePerMonthEst": 1.2
      },
      "geometry": { "type": "Point", "coordinates": [-66.1557, 18.3986] }
    }
  ]
}
```

### `assets/country-data.json`

```json
{
  "year": 2022,
  "source": "[N] OECD or national stat. agency",
  "rates": [
    { "iso": "BR", "name": "Brazil",       "rate": 0.972, "mechanism": "DRS + EPR",        "scaleTonnesYr": 391000, "note": "..." },
    { "iso": "JP", "name": "Japan",        "rate": 0.978, "mechanism": "DRS",              "scaleTonnesYr": 185000 },
    { "iso": "DE", "name": "Germany (EU)", "rate": 0.985, "mechanism": "DRS",              "scaleTonnesYr": 152000 },
    { "iso": "US", "name": "United States","rate": 0.450, "mechanism": "Curbside + EPR-varied","scaleTonnesYr": 820000 },
    { "iso": "AU", "name": "Australia",    "rate": 0.730, "mechanism": "CDL + state EPR",  "scaleTonnesYr": 87000 },
    { "iso": "IS", "name": "Iceland",      "rate": 0.910, "mechanism": "EPR",              "scaleTonnesYr": 1800 },
    { "iso": "TW", "name": "Taiwan",       "rate": 0.940, "mechanism": "EPR",              "scaleTonnesYr": 91000 },
    { "iso": "PR", "name": "Puerto Rico",  "rate": 0.018, "mechanism": "Informal + export","scaleTonnesYr": 1200, "isTarget": true }
  ]
}
```

### `assets/budget-data.json`

```json
{
  "currency": "USD",
  "year": 2025,
  "capex": [
    { "category": "Site acquisition & preparation",   "amount":  2200000, "math": "..." },
    { "category": "Rotary furnace (15 kt/yr)",        "amount":  7200000, "math": "$480/t × 15,000 t/yr (vendor quotes, 2024)" },
    { "category": "Decoater & sort line",             "amount":  3100000, "math": "..." },
    { "category": "Building & utilities",             "amount":  5400000, "math": "..." },
    { "category": "Off-gas treatment",                "amount":  1900000, "math": "..." },
    { "category": "Yard, rolling stock, scales",      "amount":  1500000, "math": "..." },
    { "category": "Engineering, PM, contingency 12%", "amount":  6700000, "math": "..." }
  ],
  "capexTotal": 28000000,
  "opexAnnual": [
    { "category": "Energy (electricity + gas)",       "amount": 4200000 },
    { "category": "Labor (38 FTE)",                   "amount": 3100000 },
    { "category": "Maintenance",                      "amount":  900000 },
    { "category": "Consumables (salt flux, refractories)", "amount":  650000 },
    { "category": "Transport & logistics",            "amount":  780000 },
    { "category": "Insurance, compliance, G&A",       "amount":  420000 }
  ],
  "opexTotalAnnual": 10050000,
  "fundingSources": [
    { "source": "PRIDCO equity",                     "share": 0.25 },
    { "source": "DRS-secured revenue bond",          "share": 0.40 },
    { "source": "Anchor partner CAPEX (Coca-Cola/Ball)", "share": 0.15 },
    { "source": "EIB or IDB green-loan facility",    "share": 0.15 },
    { "source": "EPA / IRA §45X (upside, not base)", "share": 0.05 }
  ]
}
```

### `assets/timeline-data.json`

```json
{
  "phases": [
    {
      "id": "p1",
      "title": "Phase 1 — Site, permits, procurement",
      "start": "Year 0",
      "end": "Year 1",
      "milestones": [
        "Site optioned in [municipality]",
        "JCA air permit pre-application filed",
        "EPC RFP issued"
      ],
      "risks": ["Permit delay", "Site geotech surprises"]
    },
    {
      "id": "p2",
      "title": "Phase 2 — Construction and commissioning",
      "start": "Year 1",
      "end": "Year 2",
      "milestones": [
        "Furnace cold commissioning",
        "38 FTE hired and trained",
        "First heat"
      ],
      "risks": ["Equipment delivery slip", "Skilled-labor scarcity"]
    },
    {
      "id": "p3",
      "title": "Phase 3 — Ramp and DRS pilot",
      "start": "Year 2",
      "end": "Year 4",
      "milestones": [
        "70% nameplate throughput",
        "DRS pilot in [municipality]",
        "First coil shipment"
      ],
      "risks": ["Collection rate shortfall"]
    },
    {
      "id": "p4",
      "title": "Phase 4 — Full ramp and regional integration",
      "start": "Year 4",
      "end": "Year 7",
      "milestones": [
        "100% nameplate throughput",
        "Second furnace optionality study",
        "USVI and Caribbean export feasibility"
      ],
      "risks": ["Hurricane disruption", "Energy price volatility"]
    }
  ]
}
```

### `assets/process-diagram.svg`

Hand-built SVG, 480 lines, five nodes with arrows. Each node carries `<title>` and `<desc>` for accessibility, plus inline `data-*` attributes the JS can read for tooltips.

### `assets/logo.svg`

Wordmark "Recircular" in Source Serif 4 + a small aluminum-can glyph. Single-color (uses `currentColor`). Two variants are unnecessary for v1.

### `assets/favicon.svg`

Aluminum-can glyph, 32×32, single color `#0E1116`. No raster fallback required for v1 (modern browsers only).

---

## 8. File Structure

```
docs/
├── index.html              # The single page, semantic, all sections in <main>
├── styles.css              # All styles, custom properties at top
├── app.js                  # ES2020 module; imports D3 + Leaflet from CDN
├── DESIGN.md               # This file
├── assets/
│   ├── logo.svg
│   ├── favicon.svg
│   ├── pr-map-data.json
│   ├── pr-municipalities.geojson
│   ├── pr-dropoff-points.geojson
│   ├── country-data.json
│   ├── budget-data.json
│   ├── timeline-data.json
│   ├── process-diagram.svg
│   └── images/
│       ├── hero-facility.avif     # or .webp
│       ├── hero-facility-credit.txt
│       ├── landfill-pr-2022.avif
│       └── ...
└── pdf/
    └── proposal.pdf
```

`index.html` references `styles.css` and `app.js` with relative paths so the site works at the project root and at any subpath. For GitHub Pages, deploy from `main` branch, `/docs` directory.

---

## 9. Implementation Notes for the Build Agent

1. **Read this file end-to-end before writing any code.** Section §7's schemas are normative. If a data field is required, do not omit it.
2. **No build step.** Resist the urge to introduce a bundler. If you find yourself running `npm install`, stop.
3. **CDN pins:** pin D3 and Leaflet versions. Use `https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm` and `https://unpkg.com/leaflet@1.9.4/dist/leaflet.js`. Lucide is inlined, no CDN import needed (or use `https://unpkg.com/lucide@latest/dist/umd/lucide.js` for the sprite helper).
4. **Sticky elements:** only the dot nav is fixed. No sticky header.
5. **Bilingual headers:** add a `<span class="es" lang="es">` after every `<h1>` and `<h2>`. Example: `<h1>The problem <span class="es" lang="es">— El problema</span></h1>`.
6. **Footnotes:** implement as `<sup><a id="ref-N" href="#fn-N">[N]</a></sup>` and `<li id="fn-N">[N] ... <a href="#ref-N">↩</a></li>` in the source list.
7. **Show-the-math accordions:** use `<details><summary>How we got this</summary>...</details>`. The `<summary>` must restate the number.
8. **Real places only.** Do not invent municipalities, partners, or rates. If a number is uncertain, flag it `[research-pending]` in the data file and the build agent must show the field as "—" in the UI.
9. **Accessibility self-check before commit:** run the page through `axe` (browser extension) and `pa11y` CLI; both should report 0 AA violations. Document results in `assets/audit.md`.
10. **Performance budget self-check:** run Lighthouse on a deployed preview; target Performance ≥ 95, Accessibility = 100, Best Practices ≥ 95, SEO ≥ 95. Document results in `assets/audit.md`.
11. **GitHub Pages deploy:** commit `docs/` to `main`, configure Pages to serve from `/docs` on `main`. Custom domain `recircular.pr` (placeholder) is a future PR.
12. **No tracker scripts, no analytics by default.** If analytics is later added, prefer a single self-hosted Plausible or Umami instance; do not add Google Analytics.
13. **The "Spanish version stretch goal"** is logged at the end of `#about` as: "Translation to Spanish is a community contribution. See `CONTRIBUTING.md`." A `CONTRIBUTING.md` need not exist for v1; the line is a marker for future work.

---

## 10. Out of Scope (v1)

- Dark mode.
- Internationalization beyond bilingual H1/H2 glosses.
- A "Sign the open letter" interactive form (placeholder anchor only).
- Embedded video.
- Multi-page architecture (this is one page, by design).
- Search across the page (no in-page search field).
- Newsletter signup.
- Comments / discussion.

These are listed so the build agent does not silently include them.

---

## 11. Acceptance Criteria

The site is considered done when all of the following are true:

- [ ] `docs/index.html` validates as HTML5 (no console errors, no missing alt).
- [ ] All 14 sections render in order with stable IDs.
- [ ] Dot nav is keyboard-operable and reflects scroll position.
- [ ] Country-case-studies tabs are keyboard-operable; deep link to a specific tab works.
- [ ] PR map renders with both choropleth and point layers; municipality click opens a popup; search box filters.
- [ ] Country bar chart animates on scroll into view; reduced motion disables the animation.
- [ ] Budget stacked bar and donut render with data from `budget-data.json`; "How we got this" accordions expand.
- [ ] Timeline reveals each phase on scroll.
- [ ] Every section H1 has the Spanish gloss.
- [ ] Every factual claim has a footnote linking to the source list.
- [ ] Lighthouse: Performance ≥ 95, Accessibility = 100, Best Practices ≥ 95, SEO ≥ 95.
- [ ] `prefers-reduced-motion: reduce` disables all non-essential animation.
- [ ] Site weight (excluding CDN libs) < 500 KB.
- [ ] Site loads and is fully interactive on a throttled "Fast 3G" Lighthouse run in under 4 seconds.
- [ ] Page renders correctly at 360px, 768px, 1024px, 1440px, 1920px widths.
- [ ] `pdf/proposal.pdf` is present, downloads, and opens without error.

---

*End of design specification.*
