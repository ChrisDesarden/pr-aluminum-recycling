# Recircular: Puerto Rico closed-loop aluminum recycling

A working proposal, version 1.0, for a 15,000 t/yr UBC (used beverage
can) recycling facility on PRIDCO land in Puerto Rico. Plain HTML,
CSS, and JavaScript — no build step, no framework. Designed to be
read on GitHub Pages and printed to a PDF.

**Bilingual:** Spanish is the primary language. Click the **ES / EN**
toggle in the header to switch to English.

**Plain-language cards:** every major section has a flip card that
explains the content in simple terms for any reader.

## Live site

<https://chrisdesarden.github.io/pr-aluminum-recycling/>

## What's here

- **`site/`** — the live site. Open `index.html` in a browser.
  - `assets/` — six JSON data files (budget, country cases,
    dropoff points, industrial zones, municipalities, timeline)
  - `DESIGN.md` — the 14-section design specification the site
    implements
- **`research/`** — five long-form research documents
  (PR context, country cases, engineering tech, engineering/budget,
  funding model). ~268 KB total. These are the source of every
  number on the site.
- **`docs/recircular-onepage.pdf`** — full-site PDF export,
  generated from the live site. ~26 pages, A4.
- **`audit/`** — local-only previews of the site (gitignored).
- **`docs/preview-*.png`** — local-only screenshots (gitignored).

## Headline numbers

| Metric                          | Value                              |
| ------------------------------- | ---------------------------------- |
| UBC generated in PR per year    | 17,000 t (1.4B cans)               |
| Current recovery rate           | 1.8%                               |
| Target recovery (Year 5, DRS 5¢)| 75%                                |
| CAPEX (medium scenario)         | $52 M                              |
| OPEX (annual)                   | $12.3 M                            |
| Payback                         | 3.0 yr                             |
| IRR                             | 14–18%                             |
| Direct FTE                      | 62                                 |
| Indirect + induced (IMPLAN 2.5×)| 155                                |
| Energy savings vs. virgin Al    | 95%                                |

## Run locally

```bash
cd site
python3 -m http.server 8765
# open http://127.0.0.1:8765
```

## Re-generate the PDF

The site has a print stylesheet. The simplest reproducible way uses Puppeteer:

```bash
cd tools/puppeteer
npm ci                          # install puppeteer + chromium once
node generate-pdf.js            # writes docs/recircular-onepage.pdf
```

Or use any headless browser pointed at the local server:

```bash
google-chrome --headless \
  --print-to-pdf=docs/recircular-onepage.pdf \
  --no-pagerender-await \
  http://127.0.0.1:8765/index.html
```

## Automated QA

The Puppeteer test runner clicks every case-study tab and captures console/page/network errors:

```bash
cd tools/puppeteer
node test-site.js
```

## License

Code: MIT. Data and research: CC-BY-4.0 — please cite as
"Recircular Puerto Rico, working proposal v1.0, 2026."

## Contributing

This is a working proposal, intentionally open. The data, sources,
and code are all public. To comment, contribute, or signal
interest: open an issue, or email
<ChrisDesarden@users.noreply.github.com>.
