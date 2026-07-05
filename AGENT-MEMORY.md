# Agent Memory — Recircular Puerto Rico

> Project-scoped memory for the sub-agent (kimi-k2.7-code:cloud) auditing and
> completing the Recircular PR proposal site. This is **not** the workspace-level
> MEMORY.md — it lives here so it scopes cleanly to the project and travels
> with the repo.

---

## What this project is

**Recircular: Puerto Rico closed-loop aluminum recycling** — a working proposal
for a 15,000 t/yr Used Beverage Can (UBC) recycling facility in PR. Government-
ready. Targets PRIDCO, EPA Region 2, FEMA, USDA-RD, AAA, and Department of
Economic Development.

## The current state of the work

- **Repo:** `~/.openclaw/workspace/projects/pr-aluminum-recycling/`
- **Git:** `dc661f3` is HEAD. Working tree is clean. `main` branch.
- **No GitHub remote yet.** Chris is the owner. Decision: push to
  `chrisdesarden/pr-aluminum-recycling` after sub-agent passes acceptance.
- **Live preview:** site is being served locally at `http://127.0.0.1:8765/`
  via `python3 -m http.server 8765` from `site/`. Check if still running
  (`lsof -i :8765` or `ss -tlnp | grep 8765`); if not, start it.

## Hard headline numbers (do not change without a research justification)

- **Capture rate today:** 1.8% (PR baseline)
- **Target capture rate:** 75% (Brazil/Iceland operating benchmark)
- **Throughput target:** 15,000 t/yr UBC (≈17,000 t/yr mixed aluminum incl. sheet)
- **CAPEX:** $52M USD
- **OPEX:** $12.3M/yr
- **Payback:** 3.0 yr base case; 2.5-3.5 yr across scenarios
- **IRR:** 14-18% over 20-yr horizon (budget-data.json medium scenario)
- **FTE:** 62 direct + 155 indirect/induced
- **Energy savings vs. virgin Al:** 95% (industry standard for closed-loop UBC)

## Lead site decision

**Ponce (lead); Guayama (fallback).** This is in the live site and the PDF.
Justification is in `research/funding-model.md`. Flagged back to Chris for
confirmation/override. If Chris wants TBD, roll back two `index.html` strings
near "site selection" and regenerate PDF.

## File map (the things you may need)

```
pr-aluminum-recycling/
├── README.md                  (project overview, license, run-locally)
├── AGENT-MEMORY.md            (this file)
├── .gitignore
├── site/                      ← the actual deliverable
│   ├── index.html             689 lines, 12 sections
│   ├── app.js                 566 lines, all interactive logic
│   ├── styles.css             814 lines
│   ├── DESIGN.md              778 lines, the spec the site was built from
│   ├── assets/                6 JSONs driving charts and the map
│   ├── preview-*.png          (gitignored; old preview screenshots)
│   └── docs/recircular-onepage.pdf  (the 19-page A4 PDF, 1.2 MB)
├── research/                  5 deep docs, ~268KB
│   ├── pr-context.md          PR industrial/economic/regulatory baseline
│   ├── country-cases.md       4 country/regional comparators
│   ├── engineering-tech.md    process flow, equipment, energy math
│   ├── engineering-budget.md  CAPEX line items, OPEX buildup
│   └── funding-model.md       7-source capital stack, DR/green bond sources
└── docs/
    └── recircular-onepage.pdf 19 pages A4
```

## The 12 site sections (in DOM order)

1. `hero` — title, 4 stat tiles, CTA buttons
2. `summary` — TL;DR for skimmers
3. `pr-context` — why PR specifically (Marico reboot, energy grid, MSW, etc.)
4. `map` — Leaflet PR map with 78 municipalities, dropoff points, industrial zones
5. `case-studies` — country/region comparators (Brazil, Iceland, California CRV, NY)
6. `engineering` — process flow, equipment list, energy/water math
7. `budget` — donut chart (CAPEX breakdown), OPEX table, revenue table, scenarios
8. `funding` — 7-source capital stack
9. `timeline` — 7-phase Gantt-style
10. `risks` — risk register with mitigations
11. `conclusion` — **3 ask cards (5¢ DRS, PRIDCO Ponce site MOU, $52M green bond)
    + 9-stakeholder ordered list + "economic case in one paragraph" callout +
    PDF download link + GitHub/email contact**
12. `sources` — bibliography / about

## Critical rules for any edits

1. **No build step.** Plain HTML/CSS/JS. Leaflet and d3 come from CDN. Don't
   introduce npm/webpack/vite.
2. **All numbers in HTML must match the research.** If you change a number,
   update the matching section in `research/*.md` and the PDF. The PDF is
   regenerated via the same data — see "Regenerating the PDF" below.
3. **No placeholder text.** If you find `TODO`, `TBD`, `XXX`, or
   `lorem ipsum`, fix it.
4. **Tone:** government-ready, evidence-based, blunt. PR is a hurricane-prone
   jurisdiction — be concrete about risk and resilience.
5. **No external/paid image hosts.** If you need imagery, inline SVG.
6. **Mobile responsive** — already implemented at multiple breakpoints; keep
   it.
7. **No jQuery** — vanilla JS only.
8. **Map must use Leaflet** with OpenStreetMap tiles (free, no key needed).
9. **Charts must use d3 v7** from cdn.jsdelivr.net. Already loaded.

## How to verify the site is "working" (acceptance test)

A change is not done until you have:

1. **Local preview renders correctly:**
   - `python3 -m http.server 8765` from `site/`
   - Firefox headless screenshot:
     `firefox --headless --window-size=1280,HEIGHT --screenshot=/tmp/x.png file://...`
   - For full-page screenshot, use a very tall window-size (e.g. `--window-size=1280,4000`)
   - Read the PNG with the `read` tool and visually inspect

2. **All interactive elements work.** Walk through every button/tab/control:
   - Hero CTA buttons scroll smoothly to sections
   - Nav links work (incl. mobile menu)
   - Donut chart shows tooltip on hover
   - OPEX/revenue tables are sortable (or documented as static)
   - Scenario buttons toggle IRR/payback
   - Map: pin clusters, zoom controls, popup on click
   - Tab switches in case studies and risks

3. **No console errors.** Open DevTools-equivalent: serve the page and run
   `node -e "const x=require('jsdom'); ..."` is overkill. Easier: open the
   page in firefox headless and tail the JS errors:
   `firefox --headless --console file:///...` and check stderr. Or use
   `puppeteer` (already in the project: `node /tmp/pdfgen/generate.js` shows
   the pattern; puppeteer is at `~/.cache/puppeteer/`).

4. **All assets load (HTTP 200).** After the server is up, hit each asset:
   `curl -sI http://127.0.0.1:8765/assets/budget-data.json | head -1` and
   repeat for all 6 JSONs.

5. **PDF regenerates cleanly.** See below.

## Regenerating the PDF

The PDF is generated from the live site via puppeteer (chromium). The script
lives at `/tmp/pdfgen/generate.js`. To regenerate after HTML changes:

```bash
# Server must be running on 8765
curl -sI http://127.0.0.1:8765/ | head -1   # confirm 200

node /tmp/pdfgen/generate.js
# This produces /home/kriizo/.openclaw/workspace/projects/pr-aluminum-recycling/docs/recircular-onepage.pdf
```

If `generate.js` doesn't exist or is stale, you can write a new one with:

```js
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: 'new', args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:8765/', {waitUntil: 'networkidle0'});
  await page.pdf({
    path: '/home/kriizo/.openclaw/workspace/projects/pr-aluminum-recycling/docs/recircular-onepage.pdf',
    format: 'A4',
    printBackground: true,
    margin: {top: '20mm', right: '15mm', bottom: '20mm', left: '15mm'}
  });
  await browser.close();
})();
```

Puppeteer is at `~/.cache/puppeteer/`. Chromium is downloaded there (~200MB).
If disk space is tight and you don't need to regenerate, **don't.**

## Decisions already locked in (don't re-litigate)

- License: **MIT (code) + CC-BY-4.0 (data)**
- Citation string: "Recircular Puerto Rico, working proposal v1.0, 2026."
- Repo identity (when published): `chrisdesarden/pr-aluminum-recycling`
- Git author: `Chris <ChrisDesarden@users.noreply.github.com>` (noreply form)
- No real email in git history.
- No GitHub Pages for now (decision pending Chris's call).

## Past session history (what NOT to redo)

- 2026-07-02: Original overnight dead session (`cfcbdda3-...`) — wasted
  4.5 hours on idle-timeout, then panicked at 15:55 and tried to
  re-render the PDF. The PDF was already fine. Lesson: **check the artifact
  first** with `pdfinfo` / `pdftotext` / `file` / `ls -la` before redoing
  work.
- 2026-07-03 ~16:00: Confirmed the live site is up. TBDs resolved (Ponce).
  Conclusion section added. PDF regenerated to 19 pages A4 (1.2 MB).
- 2026-07-03 ~16:08: Wrapped session, asked Chris for GitHub push call.
  Chris at 20:09 asked for site URL (gave it). No further reply yet.
- 2026-07-03 ~17:00: Chris asked for a kimi-k2.7-code sub-agent to audit
  the site. **This is your task.**

## TBDs / open questions for Chris (do not resolve yourself)

- Should the lead-site copy be reverted to "TBD pending PRIDCO response"?
  Default: keep "Ponce (lead); Guayama (fallback)" because research supports
  it and Chris has not pushed back.
- Should the repo be pushed to GitHub? (Default: yes, when site is done.)
- Should GitHub Pages be enabled? (Default: yes, after push.)
- Should I be writing a longer narrative for the conclusion "economic case"
  paragraph? Currently 1 paragraph. Default: no, Chris asked for "everything
  working," not longer copy.

## Useful commands

```bash
# Local server (run from site/ dir)
python3 -m http.server 8765

# Full-page screenshot of the live site
firefox --headless --window-size=1280,4000 \
  --screenshot=/tmp/recirc-full.png \
  file:///home/kriizo/.openclaw/workspace/projects/pr-aluminum-recycling/site/index.html

# Just the visible viewport
firefox --headless --window-size=1280,900 \
  --screenshot=/tmp/recirc-hero.png \
  file:///home/kriizo/.openclaw/workspace/projects/pr-aluminum-recycling/site/index.html

# PDF check
pdfinfo /home/kriizo/.openclaw/workspace/projects/pr-aluminum-recycling/docs/recircular-onepage.pdf
pdftotext /home/kriizo/.openclaw/workspace/projects/pr-aluminum-recycling/docs/recircular-onepage.pdf - | head -20

# Git state
cd /home/kriizo/.openclaw/workspace/projects/pr-aluminum-recycling && git status

# OpenClaw model sanity check
/home/kriizo/.openclaw/workspace/scripts/ollama-bridge.sh generate \
  ollama/kimi-k2.7-code:cloud "test"
```

## Sub-agent self-test

You are kimi-k2.7-code:cloud, configured to handle this project. To confirm
you can reach the model, run:

```bash
/home/kriizo/.openclaw/workspace/scripts/ollama-bridge.sh generate \
  kimi-k2.7-code:cloud "Reply: OK" --no-stream
```

If that succeeds, you're good. If it fails, escalate back to the parent
session (Iris / `main` agent).
