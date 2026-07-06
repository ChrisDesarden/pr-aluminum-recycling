# Enable GitHub Pages for `pr-aluminum-recycling`

The repo has `/docs/` on `main` (commit `c81af29`) with all the site files. Pages
just needs to be turned on. This document is the exact sequence.

## Option A: web UI (30 seconds, the official path)

1. Open: https://github.com/ChrisDesarden/pr-aluminum-recycling/settings/pages
2. In the **"Build and deployment"** section, look for the row that says
   **"Source"** with a button or dropdown.
3. Click that button/dropdown. A menu appears with these options:
   - `GitHub Actions`  ← new recommended approach
   - `Deploy from a branch`  ← the classic approach
4. Select **`Deploy from a branch`**.
5. Below that, a second dropdown appears: **"Branch"**. Select `main`.
6. A third dropdown appears: **"Folder"**. The options are:
   - `/(root)`  ← currently selected (or default)
   - `/docs`  ← **select this one**
7. Click the green **Save** button.
8. Wait ~30–60 seconds. A banner will appear: *"Your site is live at
   https://chrisdesarden.github.io/pr-aluminum-recycling/"*
9. Open that URL — you should see the actual site, not the README.

## Option B: API (if you have a token)

```bash
curl -X POST -H "Authorization: token <YOUR_TOKEN>" \
     -H "Accept: application/vnd.github+json" \
     https://api.github.com/repos/ChrisDesarden/pr-aluminum-recycling/pages \
     -d '{"source":{"branch":"main","path":"/docs"},"build_type":"legacy"}'
```

The token needs `repo` scope. After this, wait 30–60s for the first build.

## After Pages is enabled, the URLs that should work

| URL | What it serves |
|---|---|
| `https://chrisdesarden.github.io/pr-aluminum-recycling/` | Site root (the actual website) |
| `https://chrisdesarden.github.io/pr-aluminum-recycling/index.html` | Same as above |
| `https://chrisdesarden.github.io/pr-aluminum-recycling/recircular-onepage.pdf` | The 32-page PDF |
| `https://chrisdesarden.github.io/pr-aluminum-recycling/assets/translations.json` | Translation data |

## If something goes wrong

| Symptom | Cause | Fix |
|---|---|---|
| 404 on `/pr-aluminum-recycling/` | Pages not enabled | Follow Option A step 3 |
| Site loads but it's the README, not the actual site | Folder = `/ (root)` | Switch folder to `/docs` |
| 404 on the PDF | PDF not in the published tree | Confirm `/docs/recircular-onepage.pdf` exists on main (it does at c81af29) |
| "There isn't a GitHub Pages site here" | Pages disabled or first build still in progress | Wait 60s, refresh, then check Settings → Pages |

## What I've already done (so you don't have to wonder)

- [x] Repo pushed: `c81af29` on `origin/main`
- [x] `/docs/` has `index.html`, `app.js`, `styles.css`, `recircular-onepage.pdf`, `assets/`, `DESIGN.md`
- [x] All `site/` → `docs/` references updated in README, AGENT-MEMORY, DESIGN.md, issue templates, puppeteer script
- [x] Local server verified: index.html serves, all 4 assets return 200, translations.json 329/329 keys, all 5 issue YAML templates parse
- [x] Committed and pushed

The only thing I cannot do from this host is click the **Save** button in
the GitHub Settings → Pages UI. Every other piece is in place.
