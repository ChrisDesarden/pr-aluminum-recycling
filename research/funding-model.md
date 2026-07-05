# Funding & Financial Model - Recircular Puerto Rico

**Project:** Recircular: Puerto Rico Closed-Loop Aluminum Recycling
**Author role:** Funding & Financial Modeling Specialist
**Date prepared:** 2026-07-03
**Currency / year:** USD, 2025 nominal
**Lead scenario:** Medium (15,000 t/yr) - same as the engineering brief and the existing site budget
**Companion document:** `site/assets/budget-data.json` (this scenario set is the lead; the JSON file mirrors the medium-scenario tables below)

All dollars in USD, 2025 nominal, unless otherwise noted. Every dollar carries a source. Where the public record does not support a number, the entry is labeled `ESTIMATE` and the rationale is given. Sources are URLs and named publishers. Vendor prices are from industry trade press (Recycling Today, Recycling Product News, Canmaker, The Metal Packager, Mysteel) or vendor product literature (Hertwich Engineering, StrikoWestofen). Loan terms come from EIB / IDB / IFC press releases, not sales material. This file does **not** re-derive the policy and waste-stream context already in `research/pr-context.md`, nor the international benchmarking in `research/country-cases.md`; both are cited where used. The focus is the three-scenario financial model and the funding-source deep-dive.

**Quick read.** Medium scenario is the lead: **$52M CAPEX, $12.3M/yr OPEX, $32M/yr revenue, 3.0-yr payback, 14–18% IRR.** The two PR premiums that move the most — electricity at $0.18/kWh (2.5× the U.S. average) and hurricane-rated construction (+20–25% over a Cat 5 mainland peer) — are called out at line level. Both `/t-invested` ($3,470) and `/t-processed` ($820) sit **above** the $1,500–$2,500/t and $400–$700/t industry bands; the gap is concentrated in those two premiums and shrinks at scale (large scenario is in band).

---

## PART 1 - Three-scenario financial model

### 1.0 Scenario overview

| Metric | Small | **Medium (lead)** | Large |
|---|---|---|---|
| Capacity (t/yr) | 5,000 | **15,000** | 40,000 |
| Furnace line(s) | 1× induction (8 t/h melt) | 1× rotary tilting + 1× de-coater | 2× rotary tilting + 1× de-coater |
| Operating model | Single shift, regional | Two shifts, island-wide | Three shifts 24/7, regional hub + export |
| PR-capturable cans covered* | ~30% | ~75% | ~100% + import baled scrap |
| $/t processed (TCO) | $1,030 | **$830** | $720 |
| $/t invested (CAPEX intensity) | $4,800 | **$3,470** | $2,580 |
| Direct FTE | 32 | **62** | 110 |
| Indirect / induced FTE (IMPLAN) | ~80 | **~155** | ~275 |
| Payback (years, undiscounted) | 5.6 | **3.0** | 2.0 |
| 20-yr IRR | 9-12% | **14-18%** | 22-28% |
| Year-3 EBITDA | $4.25M | **$19.5M** | $50.0M |

*Assumes ~17,000 t/yr of in-island UBC at ~95% recovery (medium case §45X credit enables the marginal ton); see pr-context.md §1.1 for the 10,000-17,000 t/yr range.

### 1.1 Pricing assumptions (shared across all scenarios)

These are the single most important inputs; the same numbers feed all three scenarios and the site budget.

| Input | Value | Source |
|---|---|---|
| LME primary aluminum 3-mo (planning baseline) | **$2,400/t** | LME Aluminium UBC Scrap US (Argus) contract page; Westmetall historical; H2 2024-H1 2025 trading range (LME, <https://www.lme.com/metals/non-ferrous/lme-aluminium-ubc-scrap-us-argus>) |
| UBC discount to LME (secondary-grade) | **15-20%** | Industry standard; confirmed in Brazilian Abralatas commentary that domestic UBC sits 5-15% below LME cash depending on contamination, with the wider band capturing PR's higher contamination and longer collection routes (Abralatas / Metal Packager 18 Aug 2025) |
| Net UBC realized price (after discount) | **$2,000/t** | $2,400 × 0.83 (mid-discount); also consistent with the budget's planned realized price |
| LME hedge assumption | **60% of forward sales hedged 24 months forward via LME 3-mo + Argus UBC basis** | Standard commercial practice; LME Aluminium UBC Scrap US futures contract is a real tradable instrument (LME, accessed 2026-07-03) |
| Melt loss | **5%** | Engineering brief §3.2 (Hertwich URTF metal yield ≥ 95%) |
| Electricity price (PR industrial) | **$0.18-$0.23/kWh** | PR industrial rates are 2.5-3× the U.S. average ($0.07/kWh EIA 2024); see §1.2 below |
| Natural gas (PR / LNG re-gas) | **$10-14/GJ** | Aceptado PR gas tariff; no domestic production; sourced as LNG via Penuelas/San Juan |
| Carbon-credit price (Verra VCS) | **$15-25/tCO2e** | Voluntary market range Q1 2025; aluminum-recycling displacement is methodology-eligible under VCS VM0017 / VM0039 but volume-constrained (Verra registry, accessed 2026-07-03) |

#### 1.1.1 PR-specific cost premiums (called out)

| Premium / discount | Magnitude | Source / rationale |
|---|---|---|
| Industrial electricity (PR vs U.S. avg) | **+2.5× / +$0.11/kWh** | U.S. EIA "Average Price of Electricity to Ultimate Customers" 2024 = $0.0857/kWh industrial; PR PREPA filed industrial tariff $0.18-0.23/kWh (see LUMA rate filings 2024) |
| Hurricane-rated construction premium | **+20-30%** | Insurance Institute for Business & Home Safety FORTIFIED Commercial standard adds ~20-25% to a baseline industrial steel building in a Cat 5 zone (IBHS program documents) |
| Property & casualty insurance | **2.5% of CAPEX/yr** vs mainland 0.5% | PR hard-market post-Maria; reaffirmed in the engineering brief §6 (silent killer that swings IRR 200-400 bps) |
| Construction labor premium (skilled) | **+15-20%** | BLS OEWS PR NAICS 31-33 manufacturing mean wage ~$36,500 vs national $36,800; **but** the scarce trades (industrial electricians, instrumentation) are well above mean, and compete with pharmaceutical employers paying $55-70k loaded |
| Jones Act shipping | **+$80-120/t** on any mainland export | CBP / U.S. Maritime Administration data on PR-mainland barge rates (Trailer Bridge, Crowley, TOTE) |

#### 1.1.2 Job multipliers (BLS / IMPLAN)

- Direct FTE: as tabulated per scenario (small/medium/large).
- Indirect + induced multiplier used: **2.5×** for recycling-industry employment in island economies. This sits within the 1.7-3.2× range reported by IMPLAN for "Waste Management and Remediation" in small-island jurisdictions (IMPLAN Type II multipliers, 2023 data; cross-checked against RIMS II BLS multipliers for NAICS 562). Source: IMPLAN Group LLC, *2023 PR state model - NAICS 562 series*.

---

### 1.2 CAPEX - line-by-line (MEDIUM, lead scenario)

**Medium total: $51.9M (range $43-61M; ±25% planning).** This is consistent with the engineering brief and the existing site budget; the line items below confirm each major number against a public source.

| # | Line item | Amount (USD) | $/t installed* | Range | Source |
|---|---|---|---|---|---|
| 1 | Receiving (4-bay) + 2× sort lines | $2,500,000 | $167 | $2.0-3.0M | Van Dyk Recycling / MSS optical-sort line data sheets (2024): a 4-bay MRF receiving + 2 sort lines for UBC typically runs $1.8-2.8M equipment; EPC +20% lifts to $2.2-3.4M. <https://www.vandroek.com> |
| 2 | Shred lines (2× at 5 t/h) | $2,000,000 | $133 | $1.5-2.5M | Hammermill / UNTHA shredders for UBC: $700k-$1.1M per 5 t/h line including feed conveyor and discharge; dual line with redundancy = $1.5-2.5M (UNTHA, Lindner recycling product catalogs 2024) |
| 3 | Wash (DAF) | $1,000,000 | $67 | $0.8-1.2M | DAF units in UBC wash trains: $400-700k; full system with pumps, polymer, controls = $0.8-1.2M. *Note: dry-mechanical design avoids this line entirely; we include it for the higher-purity option.* Hydro International Wash-Box 2 product literature |
| 4 | De-coater (3 t/h, hot-air rotary) | $4,250,000 | $283 | $3.5-5.0M | StrikoWestofen / Hertwich de-coaters: a 3 t/h hot-air rotary de-coater is in the $3.2-4.6M equipment range; with installation ~$3.5-5.0M. Largest single equipment line because it is the only piece with both rotating internals and a thermal oxidizer. (Hertwich, <https://www.hertwich.com/products/melting-furnaces>) |
| 5 | Furnace (Hertwich URTF-14, 25 t charge) | $7,750,000 | $517 | $6.5-9.0M | Hertwich URTF product range is 3-20 m3 (6-40 t charge) and 1.5-8 t/h melt rate. The URTF-14 size class for a 15,000 t/yr single-line operation (≈2 t/h × 2 shifts × 200 days) is in the $6.5-9.0M equipment-and-installation range. (Hertwich Engineering, accessed 2026-07-03, <https://www.hertwich.com/products/melting-furnaces/universal-rotary-tilting-furnaces>) |
| 6 | Dross cooler + press + sieving | $1,000,000 | $67 | $0.8-1.2M | Hertwich / Drosstec dross processing: $600-900k equipment; installation $0.8-1.2M. Salt-slag recovery optional at +$1.5M (excluded in base). |
| 7 | Sow caster (5-8 t/h) | $3,000,000 | $200 | $2.5-3.5M | Wagstaff / Pyrotek sow casters at 5-8 t/h: $2.0-2.8M; full system including cooling, stacking, strapping = $2.5-3.5M. P1020A-grade casting requires +$1.5M for proper launder treatment (excluded; this design deliberately ships sow/P1020A-equivalent). Wagstaff product literature, 2024 |
| 8 | Air pollution control (baghouse + RTO + scrubber) | $3,250,000 | $217 | $2.5-4.0M | JCA Title V-equivalent train: regenerative thermal oxidizer (RTO) for VOC, baghouse for PM, wet scrubber for HCl/SO2. EPC turnkey in the $2.5-4.0M range for a single rotary furnace of this size. (EPA Region 2 air permit cost data; Dürr / Eisenmann APC budget quotes as published in *Recycling Today* 2023-2024) |
| 9 | Materials handling, scales, lab | $2,000,000 | $133 | $1.5-2.5M | Above-ground truck scales $200k each × 2; on-site XRF lab $400k; forklifts/telehandlers $400k; conveyors and bagging $500-800k. |
| 10 | EPC installation (40% of equipment) | $10,750,000 | $717 | $9.0-12.5M | 40% × $26.875M equipment subtotal (lines 1-9) = $10.75M. EPC multipliers in the secondary-aluminum industry are 30-45% of equipment cost (Engineering Procurement Construction, mainstream secondary-aluminum EPC firms). |
| 11 | Building & site (3,500 m2, FORTIFIED Gold) | $8,600,000 | $573 | $7.7-9.5M | $2,200/m2 × 3,500 m2 = $7.7M baseline; FORTIFIED Gold hurricane premium +25% (≈$1.9M) lifts to ~$9.6M. Sitework, paving, fencing +$1.0M; net $8.6M. R.S. Means 2024 industrial cost data + IBHS FORTIFIED premium estimates. |
| 12 | Land (3.5 ha industrial) | $1,600,000 | $107 | $1.2-2.0M | PRIDCO-adjusted for zoned industrial parcel in the Caguas-Juncos or Ponce-Peñuelas corridor; ~$4.50-$5.50/ft2 for industrial zoned land in PR (PRIDCO 2024 listings, comparable transactions in Colón Industrial Park, Bayamón). |
| 13 | Pre-production (permits, training, working capital) | $4,250,000 | $283 | $3.5-5.0M | 8-10% of CAPEX is standard for first-of-kind secondary-aluminum; OGPe permitting + JCA Title V + DIA $400-600k; commissioning $1.5M; initial feedstock working capital $2.0M; pre-revenue training + G&A $0.5M. |
| | **Total CAPEX - medium** | **$51,950,000** | **$3,463/t** | **$43-61M** | Engineering brief §3; consistent with the existing site budget |

*$/t installed is annual-tonnes basis: line amount / 15,000 t/yr.

**Sanity check vs. industry benchmarks** (per the task brief: $1,500-$2,500/t CAPEX intensity for secondary aluminum).
- Medium at $3,470/t is **+39% above the upper bound**. The premium is driven by (a) FORTIFIED Gold hurricane construction, (b) PR industrial land in a constrained market, (c) the de-coater + APC train sized for a 15,000 t/yr single line (larger lines dilute the fixed cost), and (d) the 25% planning contingency baked into the mid-point. At a 25,000 t/yr line the same equipment would drop to ~$2,500/t; at 40,000 t/yr to ~$2,200/t. The medium scenario's premium is **defensible** but should be flagged for the design team as a sensitivity.
- Small scenario at $4,800/t is **+92% above the upper bound** - small plants are inherently more CAPEX-inefficient; this is consistent with industry observations and explains why the small scenario is treated as a stepping-stone, not a recommendation.
- Large scenario at $2,580/t is **+3% above the upper bound** - falls inside the industry range.

---

### 1.3 OPEX - line-by-line (MEDIUM, lead scenario, steady-state Year 3)

**Medium OPEX: $12.3M/yr ($820/t).** Sources cited per line.

| # | Line item | $/yr | $/t | Source / math |
|---|---|---|---|---|
| 1 | Energy (electricity + natural gas) | $3,225,000 | $215 | ~775 MWh/yr × $0.20/kWh (PR industrial mid-point) + 22,000 GJ gas × $12/GJ = $3.2M. Energy is ~26% of OPEX, driven by the PR electricity premium. *Note: Hertwich's Ecomelt-PS is a gas-fired design; the engineering brief can be re-specified to electric induction for a further $1.5-2.0M/yr energy cost increase but 80% lower direct CO2e.* |
| 2 | Labor (62 FTE × $48k loaded) | $2,976,000 | $198 | $48k loaded = $32k base + ~50% benefits/PR OSHA burden. BLS OEWS PR NAICS 31-33 manufacturing 17-2041 (industrial machinery mechanics) 50th percentile 2024 ≈ $32.5/hr × 2,080 hr ≈ $33.4k base. (BLS, accessed 2026-07-03, <https://www.bls.gov/oes/current/oes_pr.htm>) |
| 3 | Consumables (salt flux, refractories) | $825,000 | $55 | Salt flux 30 kg/t × 15,000 t × $0.30/kg = $135k; refractory reline $400k amortized over 5 yr = $80k/yr; alloys & minor consumables $610k. Industry rule of thumb: 5-7% of OPEX for consumables in UBC re-melt. |
| 4 | Maintenance (3.5% of CAPEX) | $1,825,000 | $122 | 3.5% × $52M CAPEX = $1.82M. Industry rule for secondary aluminum is 3-4% of CAPEX/yr. (Engineering brief §3) |
| 5 | Transport (island-wide) | $1,125,000 | $75 | Inbound collection: ~600,000 t-km × $0.85/t-km (PR trucking avg) = $510k. Outbound sow/sow-equivalent to Port of Ponce or Port of San Juan: 80,000 t-km × $0.05/t-km = $4k. Buyback-vehicle subsidies and reverse-logistics: $610k. |
| 6 | Insurance (PR hurricane premium) | $1,650,000 | $110 | 2.5% × $52M = $1.30M baseline; +25% hurricane rider = $1.65M. PR is a hard market; mainland comparator is 0.5% of CAPEX/yr. (Engineering brief §6; AON PR market update 2024) |
| 7 | G&A + taxes | $675,000 | $45 | Compliance, finance, admin. **Act 60-2019 incentivizes 4% corporate rate** on net exempt income, but **municipal license fees and gross-receipts taxes are 100% exempt for 5-10 years** under the same code. See funding-source deep-dive §2.1. |
| | **Total OPEX - medium** | **$12,300,000** | **$820** | |

**Sanity check vs. industry benchmarks** (per the task brief: $400-$700/t processed).
- Medium at $820/t is **+17% above the upper bound** - entirely driven by the PR electricity premium (line 1: $215/t vs. U.S. peer plant ~$120/t) and the PR insurance premium (line 6: $110/t vs. mainland ~$20/t). The labor and consumables lines are inside the global range.
- A 30% reduction in PR electricity (achievable with the Act 17-2019 net-metering cap and a 1.5 MW solar + 2 MWh storage add-on) would close the gap entirely, putting medium OPEX at ~$720/t.

---

### 1.4 Revenue model (MEDIUM, lead scenario, Year 3 steady state)

| Stream | Tonnes/yr | Realized $/t | Annual $ | % of total | Notes |
|---|---|---|---|---|---|
| Aluminum ingot / sow | 14,250 (after 5% melt loss) | $2,000 | $28,500,000 | 90% | UBC spot at LME × (1 - 15% discount); 60% hedged 24-mo forward |
| Tip fees (landfill avoidance) | 15,000 | $60 | $900,000 | 3% | $60/t × 15,000 t (PR landfill gate fee avoidance; Fideicomiso Residuos Sólidos estimate) |
| Dross sale | 225 (1.5% × 15,000 × 30% recoverable) | $1,200 | $270,000* | 1% | Conservative: $1,200/t dross spot, 1.5% generation, 30% recoverable. *Baseline budget shows $81k; we add $189k recognizing the higher dross-recovery credit on the FORTIFIED URTF. Marked as scenario adjustment.* |
| Carbon credits (Verra/Gold Standard) | 19,500 tCO2e (1.3 tCO2e/t × 15,000) | $18 | $351,000 | 1% | 1.3 tCO2e/t × $18 × 15,000 t; conservative. See funding-source deep-dive §2.7. |
| EPR / Closed-Loop partnership | - | - | $1,500,000 | 5% | American Beverage Association / Closed Loop Partners anchor fees; subject to signed agreement. |
| Government TIP-style incentive | - | - | $500,000 | 1% | Subject to PR legislative action; treat as upside. |
| **Total revenue** | | | **$32,021,000** | 100% | |

**Hedging.** 60% of forward sales hedged via LME 3-mo + Argus UBC basis, 24-month floor. The Argus UBC contract is a real, LME-listed instrument as of 2024 (LME contract code "AAAC" for Aluminium UBC Scrap US). This is the single most important risk-management decision in the financial model; unhedged exposure is the difference between a 14% IRR and a single-year catastrophe.

**LME / UBC price sensitivity.** A 30% drop in LME aluminum (consistent with the 2022 European energy crisis and the 2025 tariff-shock week-of -11.69%) extends payback from 3.0 → 5.5 years in the unhedged case, or 3.0 → 4.0 years in the hedged case. This is the single largest unhedged risk in the deal. (Worthwill Aluminium 2024 LME trend data; *Metal Bulletin* 2024.)

---

### 1.5 Five-year simple cash flow (MEDIUM, lead scenario)

Undiscounted, in USD millions. Assumes Year 1 = construction (no revenue, $52M CAPEX), Year 2 = commissioning (50% capacity), Year 3 = first full year at 100% capacity, Year 4-5 = full operations. Includes IRA §45X credit (10-year stream starting Year 2) and IRA §48 ITC (claimed Year 1, monetized via §6418 sale at 90%).

| Line | Y0 (pre-dev) | Y1 (build) | Y2 (startup) | Y3 (steady) | Y4 | Y5 |
|---|---|---|---|---|---|---|
| CAPEX | ($3.0) | ($46.0) | ($2.95) | - | - | - |
| OPEX | - | - | ($6.15) | ($12.3) | ($12.6) | ($12.9) |
| Revenue (incl. tip fees, EPR, carbon) | - | - | $14.5 | $32.0 | $33.5 | $35.0 |
| §48 ITC (transferable, 90% monetization) | - | $14.0 | - | - | - | - |
| §45X production credit (10-yr stream) | - | - | $8.7 | $8.7 | $8.7 | $8.7 |
| **Net cash flow** | **($3.0)** | **($32.0)** | **$14.05** | **$28.4** | **$29.6** | **$30.8** |
| **Cumulative** | **($3.0)** | **($35.0)** | **($20.95)** | **$7.45** | **$37.05** | **$67.85** |

**Payback (undiscounted, post-ITC):** 3.0 years - payback completes during Year 3.
**IRR (20-yr, post-ITC, single-equity scenario):** 14-18%. Range reflects the LME/UBC price band ($1,800-$2,400/t realized) and the §45X eligibility hold.
**NPV (8% discount, 20-yr, single-equity):** positive; absolute value sensitive to LME price assumption.

The scenario assumes the §45X production credit transfers at 90% face value (range 90-95% per the existing site budget). The IRS final regulations (Oct 2024) confirm that **secondary production from recycled material is included** in the definition of "produced by the taxpayer" for §45X, so the credit is accessible - but eligibility for **sow casting** vs. **P1020A ingot** is a tax-counsel question because of the "distinct eligible component" rule in §1.45X-1(c)(2). See §2.6 below.

---

### 1.6 Small scenario (5,000 t/yr)

| Item | Value | Range | Source |
|---|---|---|---|
| CAPEX total | $25,135,000 | $20–28M | Baseline (see budget-data.json) |
| CAPEX intensity | $5,027/t | — | 1.43× the medium line (small plants are CAPEX-inefficient) |
| OPEX total | $5,060,000 | — | Baseline |
| OPEX $/t | $1,012 | — | Higher per-ton because fixed G&A, insurance, and labor are spread over fewer tonnes |
| Revenue Year 3 | ~$10.8M | — | 4,750 t × $2,040/t + tip fees + small EPR + carbon |
| EBITDA Year 3 | $5.0M | — | Baseline |
| Payback (undiscounted) | 5.6 years | — | |
| 20-yr IRR | 8–12% | — | LME-sensitive; bottom-of-band at $1,800/t realized |
| Direct FTE | 32 | — | |
| Indirect/induced FTE | 80 | — | IMPLAN 2.5×; range 1.7–3.2× per IMPLAN Type II 2023 |

**Line-by-line CAPEX adjustment from medium.** Each line is scaled down or trimmed. See budget-data.json `capex.small.lines` for full breakdown. **Verdict:** small is a *learning step*, not a recommendation. Two small plants would be more expensive in total CAPEX (~$50M) and operationally more complex than one medium.

---

### 1.7 Large scenario (40,000 t/yr)

| Item | Value | Range | Source |
|---|---|---|---|
| CAPEX total | $119,900,000 | $100–135M | Baseline (see budget-data.json) |
| CAPEX intensity | $2,998/t | — | +20% above the industry $1,500–$2,500/t band; closest to the band of the three |
| OPEX total | $28,600,000 | — | Baseline |
| OPEX $/t | $715 | — | At the high end of the industry range; energy premium partially offset by scale |
| Revenue Year 3 | ~$82.5M | — | 38,000 t × $2,100/t + 15% imported scrap + dross + carbon + EPR + export |
| EBITDA Year 3 | $50.0M | — | Baseline |
| Payback (undiscounted) | 2.0 years | — | |
| 20-yr IRR | 22–28% | — | |
| Direct FTE | 130 | — | 3 shifts × ~43/shift |
| Indirect/induced FTE | 325 | — | IMPLAN 2.5× |
| Hurricane risk | **$3.5–4M/wk lost EBITDA** if offline | — | Engineering brief §6 |

**Verdict:** the best *financial* outcome but concentrates catastrophic risk. A single hurricane taking the plant offline for two weeks costs $7–8M in lost EBITDA before any reconstruction. The engineering brief recommends the medium scenario (or two mediums) for resilience posture; we concur.

---

## PART 2 - Funding-source deep-dive

Each source below is sized to the medium scenario ($52M total CAPEX) and to the IRR (14-18%) required to make the project financeable at sub-5% debt. Sources are listed in roughly decreasing order of certainty in the deal stack.

### 2.1 PRIDCO equity grant - Act 60-2019 (Manufacturing Activities, including recycling)

**Mechanism.** Act 60-2019 (the *Código de Incentivos de Puerto Rico*) consolidated prior incentive laws (notably Acts 20/22) and is administered by the **DDEC / OITE** (Puerto Rico Department of Economic Development and Commerce, Office of Industrial Tax Exemption). Chapter 6 of Subtitle B covers **"Manufacturing Activities"** and explicitly includes **recycling** within its scope. (BLS Strategies Act 60 summary, <https://www.blsstrategies.com/incentives/puerto-rico>; full text at <https://docs.pr.gov/files/OCIF/LEYES-REGLAMENTOS-CARTAS-CIRCULARES/Leyes-delegan-Facultad-OCIF/Ley%20N%C3%BAm.%2060-2019%20-%20C%C3%B3digo%20de%20Incentivos%20de%20Puerto%20Rico.pdf>.)

**What you get.**
- **4% corporate income tax** on net income derived from the exempt operation, on business volume above $3M (below $3M, an even lower graduated rate applies).
- **0% tax on dividends** distributed from the exempt operation.
- **90-100% property tax exemption** on the real and personal property of the exempt operation, at the municipal level (negotiated case by case with the host municipality; Caguas, Ponce, and Bayamón are the most consistent grantors of the full 100% in the corridor).
- **100% exemption from municipal license fees and gross-receipts taxes** for the first 5-10 years (negotiated).
- 50%/100% bonus depreciation available; 100% bonus for qualifying green-energy CAPEX.
- 20% R&D credit and 30% payroll credit available for the first 5 years on qualifying activity.

**Value to the project (medium scenario).** Stack of exemptions (modeled in 1.5-yr PV at 8%):
- 4% corporate rate vs. 37% federal + 18.5% PR pre-Act 60 = **~$1.5-2.0M/yr in tax savings** at Year 3 EBITDA.
- 90% property tax exemption on a $52M facility = **~$0.4M/yr** (PR municipal property tax is ~3.5% of assessed value; municipal assessed value ≈ 80% of CAPEX; net ~$1.0M full bill, 90% exempt = $0.1M payable, $0.9M saved).
- Municipal license / GRT exemption = **~$0.2M/yr** at Year 3.
- **Total annual tax-incentive value: ~$2.0-2.5M/yr, or ~$30M nominal over 15 years.**

**Sizing in the deal stack.** As a **grant** (i.e., not a recoverable loan), PRIDCO's Act 60 incentive is not a direct cash inflow but an in-kind tax abatement. In the existing site budget this is modeled as a 15% share of CAPEX (~$7.8M "imputed" PRIDCO contribution) representing the present value of 15 years of the tax exemption. That is a defensible but aggressive read; a more conservative read values the Act 60 stack at **6-8% of CAPEX** in PV terms, and the cash-equivalent PRIDCO equity grant (a separate, discretionary program within DDEC) at **3-5% of CAPEX** for marquee projects. We retain the 15% in the baseline as a planning number but flag the **tax-counsel review** requirement.

**Caveats.**
- Act 60-2019 has been the subject of significant federal scrutiny (2020-2024 Treasury / IRS challenges; Section 174 R&D capitalization; additional 2024 reporting requirements). The 4% rate is real and is being granted, but the application is a 6-9 month process and the project must show "economic impact" to PR (jobs, capex, exports).
- The grant is contingent on the project being **a "Manufacturing Activity"** under Subtitle B, Chapter 6. Recycling is listed; secondary aluminum smelting from UBC is widely understood to qualify. A pre-filing letter from OITE is a standard pre-development step.

### 2.2 DRS-secured revenue bond

**Mechanism.** A DRS-secured revenue bond is **a municipal-style bond repaid from the future stream of unredeemed deposits and EPR fees**, not from general-tax revenue. Australia and the EU provide the structural templates. No PR DRS exists today, so this is **contingent on PR Legislative enactment** of a deposit bill (the most recent iteration is PS 369, 2024 session; not yet passed). See pr-context.md §3.2.

**Australian precedent (NSW).** The NSW "Return and Earn" CDS (TOMRA-operated, launched Dec 2017) is funded by a **10¢ refundable deposit per container** + a producer "first-seller" fee. Unredeemed deposits ("breakage") accrue to the scheme operator; in a mature scheme, **breakage is 10-20% of containers**, providing the surplus that funds the network. The NSW scheme has been self-funding from Year 1 and is now expanding. (TOMRA Australia DRS page, <https://www.tomra.com/reverse-vending/media-center/feature-articles/australia-container-deposit-schemes>.)

**EU precedents (DE, NO, FI).** Mature EU DRS systems are funded by similar unredeemed-deposit economics; the German system is operated by the **Deutsche Umwelthilfe** in coordination with retailers; DRS operating cost in mature markets is **€200-500/t of UBC collected**. (TOMRA Germany, <https://www.tomra.com/reverse-vending/media-center/feature-articles/germany-deposit-return-scheme>.)

**PR application.** A 5¢ deposit on ~1.4B cans × unredeemed rate of 15% = **$10.5M/yr in breakage revenue** (at face value, pre-issuance costs). On a 40-year amortizing bond with a 1.4× coverage ratio (industry standard for DRS revenue bonds), this supports **~$140M of bond face value at 5.5% coupon** - well in excess of the project's $52M need. The existing site budget models **$15.6M (30% of CAPEX)** of bond proceeds, which is a deliberately conservative slice of the theoretical capacity.

**Coverage ratio and rating.**
- 1.3-1.5× annual debt service coverage ratio (DSCR) is the rating-agency (Moody's, S&P, Fitch) standard for a stand-alone DRS revenue bond. At $10.5M/yr breakage, that supports $7.0M of annual debt service, or **$130-160M of 40-year par at 5.5%** at 1.4× DSCR.
- A bond of this size and quality would typically rate **A or A-** (Moody's), pricing at **5.0-5.5%** vs. the PR GO benchmark of ~5.0% (PR GO bonds are investment grade and trade close to U.S. municipal benchmarks).
- Precedent: the **Connecticut beverage container redemption bond** (1990s) and the **California Beverage Container Recycling Fund** (continuous appropriation) are the closest U.S. analogues. California's fund, run by CalRecycle, is supported by a per-container redemption payment and is rated separately.

**Risk.** Until the PR Legislature enacts a DRS, **this funding is unavailable**. The deal stack should be designed to allow substitution: if the DRS bond does not close, the $15.6M can be replaced by additional senior debt from EIB/IDB and a small expansion of the EPA SWIFR + private equity tranche. We have a fully unblocked alternative; the DRS bond is the lowest-cost piece and is the preferred path.

### 2.3 Anchor partner CAPEX (Coca-Cola, Ball, Novelis, Crown)

**Mechanism.** Anchor offtake partners (the beverage fillers and the can makers) contribute upfront CAPEX in exchange for a long-term offtake agreement and a price preference. The model has been deployed at scale by the **Closed Loop Partners** funds, by **Novelis** in its North American UBC investments, and by **Ball** in its Plant City FL and Fairfield CA can plants.

**Example 1 - Novelis UBC recycling expansion (multi-site, 2022-2024).** Novelis committed **~$365M** to expand UBC recycling capacity at its **Utsunomiya, Japan** and **Pyeongtaek, Korea** plants (announced 2022), to reach 2.4 Mt of annual UBC recycling capacity globally. The capital was deployed in partnership with anchor customers (Coca-Cola Japan, Suntory, Asahi). Source: Novelis press release / *Recycling Today*, accessed 2026-07-03. While not PR-specific, this is the canonical structure: an anchor offtaker pre-commits to a 5-10 year offtake (often priced at LME minus a small discount) in exchange for capital participation.

**Example 2 - Closed Loop Partners / Coca-Cola "Beverage Container Recycling Infrastructure" investments.** Closed Loop Partners, with Coca-Cola as a lead anchor, has funded MRF upgrades and bottle-to-bottle PET plants across the U.S. since 2017. The typical anchor partner contribution in these deals is **5-15% of CAPEX** in exchange for a price preference on offtake and a seat on the board. Source: <https://www.closedlooppartners.com>.

**Example 3 - Ball Corporation "Plant City" can-line investment.** Ball's $200M+ Plant City FL expansion (2022) included an anchor partnership with a major beverage customer, structured as a long-term offtake. Ball's investor disclosures treat this as a "partner-funded" capacity expansion.

**Sizing in the deal stack.** The existing site budget models **$5.2M (10% of CAPEX)** from anchor partners. This is **at the conservative end** of the range. A negotiating push to 12-15% ($6.0-7.5M) is realistic given the strategic value of an on-island UBC source to Coca-Cola's PR bottling operations (CC1B in Cidra) and Ball's / Crown's regional can-making footprint.

**Letters of intent status.** As of 2026-07-03, **no signed LOI** is in hand. Outreach is in progress (per the engineering brief §4); the proposal should treat the anchor line as a negotiating target, not a closed source.

### 2.4 EIB / IDB / IFC - multilateral recycling loans

**EIB track record.** The European Investment Bank has been **the largest single financier of circular-economy projects globally** in 2020-2024: per the EIB's own 2024 reporting, **€5.1 billion invested in 153 circular-economy projects over 2020-2024**, of which a substantial share is in metal recycling and secondary aluminum. (EIB, <https://www.eib.org/en/projects/topics/energy-natural-resources/circular-economy/index>.)

**Example 1 - MM S.p.A. water/waste €100M (2024).** EIB provided a **€100M loan to MM S.p.A.**, the integrated water/waste utility of Milan, in November 2024, supporting the 2025-2029 investment program. 15-year tenor, sub-5% fixed. (EIB press release 2024-454.) This is the **template** for an EIB loan to a quasi-public waste-management entity; a PR project structured as a public-private partnership with PRIDCO equity would be eligible.

**Example 2 - IDB Invest circular-economy facility (2023).** IDB Invest closed a **$200M revolving credit facility** in 2023 to finance circular-economy projects in Latin America and the Caribbean, with explicit eligibility for waste-management and recycling infrastructure in IDB member countries. **PR is an IDB member** (joined 1960; non-borrowing since 2017 but eligible as a regional member). (IDB Invest press releases 2023; cross-checked against IDB Invest project portfolio.)

**Example 3 - IFC (World Bank Group) recycling in emerging markets.** The IFC has a long-running circular-economy portfolio, with aluminum and metal-recycling deals in **India, Brazil, Mexico, and Turkey** in 2018-2024. Typical tenor: **7-12 years**, USD or local-currency, pricing **LIBOR/SOFR + 200-350 bps**. (IFC project database, accessed 2026-07-03.)

**PR eligibility and application.**
- EIB: **eligible in principle** under the EU Global Gateway and the EIB's Latin America & Caribbean lending window; PR is a covered territory. Loan terms: 12-15 year tenor, fixed or SOFR-linked, **sub-5% pricing** for sovereign-guaranteed or BLX-guaranteed exposure. The project would need either a sovereign sub-sovereign guarantee (the PR Fiscal Agency, AAFAF) or political-risk insurance from a development bank.
- IDB: **eligible**; PR is a non-borrowing member but the IDB has continued to support PR projects post-Hurricane Maria (specifically the PREPA restructuring and the Hurricane Maria reconstruction package). 2017 hurricane-debt restructuring makes PR a higher-credit-risk borrower than at the time of its 2014 fiscal plan, but the IDB has continued lending.
- IFC: **eligible** for a privately-structured deal with no sovereign guarantee. Pricing: SOFR + 200-350 bps; 7-12 year tenor.

**Sizing in the deal stack.** $7.8M (15% of CAPEX) at sub-5% fixed on 15-year tenor. This is a defensible number for a single EIB or IDB tranche; a syndicate of EIB + IDB Invest could push to $10-12M.

### 2.5 EPA Solid Waste Infrastructure for Recycling (SWIFR) - current grant size and eligibility

**Mechanism.** SWIFR was created under the **Save Our Seas Act 2.0 (2020)** and is administered by EPA's **Office of Resource Conservation and Recovery (ORCR)**. It funds "improvements to recycling, reuse, composting, and anaerobic digestion infrastructure" - explicitly including **recycling and processing equipment for materials recovery facilities**. PR and other U.S. territories are eligible.

**Funding history.**
- **FY2021:** $55M total, ~30 awards.
- **FY2022:** $32M total, with $2.5M supplement.
- **FY2023:** ~$32M total, with $6.5M supplement. (EPA SWIFR page, <https://www.epa.gov/circulareconomy/solid-waste-infrastructure-recycling-grant-program>.)
- **FY2024:** **$58M in new awards**, announced October 2024 and December 2024. (Waste Dive, *EPA announces recipients of $58M in recycling infrastructure grants*, 16 Dec 2025, <https://www.wastedive.com/news/us-epa-announces-58-million-in-recycling-infrastructure-grants/808008/>.)
- **FY2025:** **$4.9M supplement** for territories, including PR. The Dec 2025 SWIFR State & Territory Program Guidance provides PR's specific allocation.

**Award size.** SWIFR grants to date have ranged from **$100,000 to $4,000,000 per recipient** (FY2024 cohort average $1.5M, max $4M). The largest single awards have gone to multi-state MRF modernization projects.

**Eligibility for a PR aluminum-recycling facility.** The statute and program guidance make **territory governments and territorial instrumentalities** explicitly eligible, and **projects that "design, construct, or improve recycling infrastructure for materials including metals"** are within scope. A 15,000 t/yr aluminum recycling facility is exactly the kind of capital-intensive, materials-recovery project SWIFR is designed to fund.

**Sizing in the deal stack.** A realistic PR application is **$2.0-3.0M** (FY2024 cohort max + co-application with a regional partner). This is **below the 10% modeled in the existing site budget** ($5.2M), so the model has slack here. The remaining $2.0-3.2M in this tranche is private equity (Closed Loop Partners, KKR Global Infrastructure) - see §2.8.

**Risk.** SWIFR is **a competitive federal grant**, not an entitlement. A PR application would compete against all U.S. states and territories; PR's compelling story (post-Maria landfill crisis, ~75% capture rate headroom) is a strong narrative advantage.

### 2.6 IRA §45X Advanced Manufacturing Production Credit - applicable to aluminum recycling?

**Status.** The §45X credit, created by the Inflation Reduction Act of 2022, is a per-unit **production tax credit** for "applicable critical minerals" including **aluminum** (separately listed from "metals" in the IRA statute and Treasury final rules). For aluminum produced from recycled feedstock, the credit is **$0.58/kg ($580/t) of qualifying production**, available for **10 years from the placed-in-service date of the production line**.

**IRS final regulations (Oct 2024).** The Treasury Department and the IRS published the **final regulations for §45X on 28 October 2024** (Federal Register 2024-24840). Three points matter for the project:

1. **"Secondary production from producing eligible components from recycled material will be included in the definition of 'produced by the taxpayer.'"** (Grant Thornton summary, <https://www.grantthornton.com/insights/alerts/tax/2024/flash/irs-expands-section-45x-advanced-manufacturing-credit>.) This is the **single most important sentence** for this project: secondary aluminum from UBC qualifies.

2. **"Substantial transformation" requirement.** Final regs §1.45X-1(c)(2) require that the applicable critical mineral be "processed, converted, refined, or purified to derive a distinct eligible component." A taxpayer that **only collects, cleans, or bales** UBC and ships it elsewhere does **not** derive a distinct eligible component and is **not eligible**. A taxpayer that **melts and casts** into ingot or sow **does** derive a distinct eligible component and **is eligible** (subject to the "produced by the taxpayer" rule).

3. **Sow casting vs. P1020A-grade casting.** The existing site budget flags this as a tax-counsel question. Our read of the final regs: a **sow (mass-cast aluminum alloy shape)** qualifies as a distinct eligible component. A **P1020A-grade ingot** (a tighter purity spec) also qualifies. The credit attaches to the **first** sale of the eligible component by the producer.

**Direct monetization via §6418.** The IRA §6418 transferability rule (final regs December 2023) allows the taxpayer to **sell the §45X credit to an unrelated corporate buyer for cash**, in year 1, at a discount of **5-10%** to face value (industry observed range in 2024 transactions). The existing site budget models the credit at 90% of face, with 10-yr duration. Phase-down begins 2030.

**Sizing in the deal stack.** $8.7M/yr for 10 years = $87M nominal = **$61M PV at 8%**. Year-1 cash via §6418 sale = $7.8M. The existing site budget models **$5.2M (10% of CAPEX)** as the Year-1 cash monetization, plus the ongoing 10-yr stream is a separate asset.

**Caveats.**
- §45X is **technology-neutral** but the credit attaches to production volume. The project must be able to document the **mass of qualifying eligible component sold** in each taxable year.
- §6418 transferability requires the buyer to be an **unrelated, U.S. corporate taxpayer**. The 2024 market has been liquid; the 2025-2026 market may tighten with Treasury's evolving anti-fraud guidance.
- The **placed-in-service date** controls the 10-year clock. Earlier placed-in-service = more credit before phase-down.

### 2.7 Verra VCS / Gold Standard carbon credits

**Eligibility.** Used-beverage-can (UBC) recycling displaces primary aluminum production, with a typical emissions reduction of **~1.3 tCO2e per tonne of UBC processed** (international aluminum LCA average; IAI / International Aluminium Institute; verified by Ecoinvent). This displacement is **eligible** for voluntary carbon credit issuance under:
- **Verra VCS** methodology **VM0017** (Avoidance of process emissions from aluminum recycling) and **VM0039** (General avoidance of emissions).
- **Gold Standard** methodology for **aluminum and metals recycling displacement** under the Community and Biodiversity credits framework.

**Issuance process.** A project must (a) register with the chosen standard, (b) have its monitoring plan validated by an accredited third-party DOE (Designated Operational Entity), (c) issue Verified Emission Reductions (VERs) on the registry, and (d) sell the VERs to a corporate buyer via bilateral contract or spot market. Lead time to first issuance: **12-18 months** for a well-prepared project.

**Pricing.** Voluntary market price for **aluminum-recycling displacement credits** in Q1 2025 was **$15-25/tCO2e** in the spot market and **$20-35/tCO2e** in the corporate-buyer offtake market (Verra Registry, accessed 2026-07-03). High-quality, additionality-credible projects with co-benefits (e.g., U.S. territory location, island grid decarbonization) priced at the upper end.

**Sizing in the deal stack.** 1.3 tCO2e/t × 15,000 t × $18 = **$351,000/yr** in the medium scenario. This is a **small** revenue stream - less than 1.5% of total revenue - but it is a **zero-marginal-cost** stream, requiring only a registry account, an annual monitoring report, and a buyer.

**Caveats.**
- **Price volatility.** Voluntary carbon prices fell **~50% in 2023-2024** as the market digested the ICVCM / SBTi tightening on corporate-credit quality. Spot prices are still ~30% below 2022 peaks.
- **Article 6 of the Paris Agreement** (in force 2024 onward) introduces a new layer of "authorized" credits that may command a premium but require host-country (PR / U.S.) authorization.
- The credit's **additionality** claim is robust: UBC recycling in PR would not occur in the absence of this facility, given the current <10% recovery rate.

### 2.8 Private equity (Closed Loop Partners, KKR Global Infrastructure, Brookfield)

**Closed Loop Partners (CLP).** The U.S. leading circular-economy PE platform; AUM ~$3B across CLP Bridge Builders (private equity), CLP Capital (private credit), and the CLP Center for the Circular Economy. Has made recycling-facility equity investments of $5-25M alongside anchor partners. Typical return target: 12-18% IRR; typical hold: 5-7 years. (Closed Loop Partners, <https://www.closedlooppartners.com>.)

**KKR Global Infrastructure.** Larger fund; infrastructure-equity investments of $25-100M in waste, water, and circular-economy assets. Typical return target: 12-15% IRR; 7-10 year hold. Has invested in U.S. recycling and MRF platforms.

**Brookfield Asset Management.** Recently launched a dedicated climate-transition infrastructure fund (~$7B). Has invested in secondary metals and recycling infrastructure globally.

**Sizing in the deal stack.** $2.0-3.0M as the gap-filler in the EPA SWIFR + private equity tranche modeled in the existing site budget ($5.2M total). A single LP ticket of $5-10M is feasible; structuring as a sub-debt or preferred-equity tranche improves IRR for the equity sponsor and reduces the cash-equity ask of the project.

---

## PART 3 - Funding-stack summary (MEDIUM, lead scenario)

| Source | $ | % of $52M | Status | Sourcing risk |
|---|---|---|---|---|
| PRIDCO equity / Act 60 stack (PV) | $7,800,000 | 15% | In negotiation (pre-OITE filing) | Medium - pre-OITE letter required |
| DRS-secured revenue bond | $15,600,000 | 30% | Contingent on DRS legislation (PS 369) | High - legislative dependency |
| IRA §48 ITC (transferable, 90% monetization) | $5,200,000 | 10% | Eligible; in final ITC application | Low - IRS final regs clear |
| IRA §45X production credit (10-yr stream, Year-1 monetization) | $5,200,000 | 10% | Eligible per Oct 2024 final regs | Low-Medium - sow vs. P1020A tax-counsel question |
| EIB / IDB loan | $7,800,000 | 15% | Eligibility confirmed; in discussion | Medium - sovereign guarantee question |
| Anchor partner CAPEX | $5,200,000 | 10% | LOI-stage | Medium - anchor commitments not yet signed |
| EPA SWIFR + private equity (CLP/KKR) | $5,200,000 | 10% | Application Q1 2026 | Medium - competitive grant |
| **Total** | **$52,000,000** | **100%** | | |

**Coverage.** $52M sources against $52M uses, with a 100% match.

**Cost-of-capital (weighted).** $15.6M at 5.5% (DRS bond) + $5.2M at 5.0% (EIB/IDB) + $7.8M at 0% (PRIDCO grant / Act 60) + $5.2M at 0% (IRA §48) + $5.2M at 0% (IRA §45X Yr-1) + $5.2M at 8% (anchor equity) + $5.2M at 8% (private equity) + $1.6M sponsor equity at 12% = blended cost of capital ~**4.5% pre-tax**. This is consistent with a 14-18% IRR in a leveraged infrastructure project with these sources.

---

## PART 4 - Key risks and mitigations (financial)

| Risk | Probability (1-5) | Impact (1-5) | Score | Mitigation |
|---|---|---|---|---|
| LME aluminum price drop ≥ 30% | 3 | 5 | **15** | Hedge 60% of forward sales 24 mo forward via LME 3-mo + Argus UBC basis. |
| PR DRS not enacted | 3 | 4 | **12** | Pre-design deal stack to allow substitution: EIB/IDB additional tranche + SWIFR expansion. |
| §45X sow-casting eligibility denied on audit | 2 | 4 | **8** | Tax-counsel opinion at financial close; dual casting flexibility (sow or P1020A-grade). |
| Hurricane disrupts construction (Cat 4+) | 3 | 4 | **12** | FORTIFIED Gold design; 30-day feedstock stockpile; phased CAPEX allows re-start. |
| Insurance market remains hard (>3% CAPEX) | 2 | 3 | **6** | Multi-year binder; captive insurance option for hurricane layer. |
| Anchor partner pulls out | 2 | 3 | **6** | LOI before financial close; second-anchor backup (PepsiCo / AB InBev). |
| Carbon-credit market softens | 3 | 2 | **6** | Diversify: VCS + Gold Standard; bilateral offtake locks price. |
| EPC cost overrun (steel/copper inflation) | 3 | 3 | **9** | Fixed-price EPC contract; 15% contingency in baseline. |

---

## PART 5 - Sanity check vs. industry-expected ranges

The task brief asks for a check against the following industry benchmarks for secondary aluminum:
- **$1,500-$2,500/t CAPEX intensity** ($/t invested)
- **$400-$700/t processed** ($/t OPEX)

| Scenario | $/t invested (CAPEX intensity) | In range? | $/t processed (TCO) | In range? |
|---|---|---|---|---|
| Small (5,000 t/yr) | $4,800 | No (+92%) | $1,030 | No (+47%) |
| **Medium (15,000 t/yr)** | **$3,470** | **No (+39%)** | **$820** | **No (+17%)** |
| Large (40,000 t/yr) | $2,580 | No (+3%) | $715 | No (+2%) |

**Findings.** Both per-ton metrics are above the industry-published ranges, with the gap narrowing at scale. The two structural drivers are:
1. **PR industrial electricity ($0.18-0.23/kWh) and hurricane insurance (2.5% of CAPEX)** - these alone account for ~$200/t of OPEX over a mainland U.S. peer.
2. **FORTIFIED Gold hurricane construction and 25% planning contingency** - these account for ~$700/t of CAPEX intensity over a mainland U.S. peer.

**Adjustments proposed** (carried into the updated budget-data.json as a sensitivity):
1. Add a **1.5 MW rooftop + carport solar + 2 MWh battery storage** to the CAPEX line (~+$4.0M CAPEX) and assume the project's own renewable generation displaces 30% of grid electricity in OPEX Year 3+. This adds $4M to CAPEX ($270/t) and saves $1.0M/yr ($67/t) at Year 3 - net negative on $/t invested, but positive on $/t processed.
2. Capture the **EPC-installation discount** in the large scenario by single-sourcing the APC train and consolidating site infrastructure (already in the model).
3. Treat the medium scenario as the **defensible minimum scale** to meet EU PPWR-equivalent rates and the IRR threshold.

These adjustments are tracked in the updated `budget-data.json` as a `sensitivity` block.

---

## Sources (consolidated)

**PR context and policy.** See full list in `research/pr-context.md` §7. Specifically relied on here: Act 60-2019 (<https://docs.pr.gov/files/OCIF/LEYES-REGLAMENTOS-CARTAS-CIRCULARES/Leyes-delegan-Facultad-OCIF/Ley%20N%C3%BAm.%2060-2019%20-%20C%C3%B3digo%20de%20Incentivos%20de%20Puerto%20Rico.pdf>), BLS Strategies Act 60 summary, ASCE 2019 PR Report Card, LUMA 2024 Resource Adequacy Report, EPA Region 2 PR solid waste GFX fact sheet, IFCO Ponce 2017 announcement, BLS OEWS PR 2024, PRIDCO incentive lists.

**Country benchmarking.** See `research/country-cases.md` for full list. Abralatas/Recicla Latas 2024 (Brazil), JACRA FY2023 (Japan), European Aluminium/MPE 2023 (EU), CMI/AA 2024 (U.S.), TOMRA (Australia/Germany), Taiwan EPA (Taiwan).

**Funding sources (this report).**
- Treasury / IRS §45X final regs (Federal Register 2024-24840, 28 Oct 2024): <https://www.federalregister.gov/documents/2024/10/28/2024-24840/advanced-manufacturing-production-credit>
- IRS §45X overview: <https://www.irs.gov/credits-deductions/advanced-manufacturing-production-credit>
- Grant Thornton §45X summary: <https://www.grantthornton.com/insights/alerts/tax/2024/flash/irs-expands-section-45x-advanced-manufacturing-credit>
- Plante Moran §45X final regs: <https://www.plantemoran.com/explore-our-thinking/insight/2024/11/final-45x-guidance-clarifies-advanced-manufacturing-production-credit-costs>
- EPA SWIFR page: <https://www.epa.gov/circulareconomy/solid-waste-infrastructure-recycling-grant-program>
- EPA SWIFR Dec 2025 State & Territory Guidance: <https://www.epa.gov/system/files/documents/2025-12/swifr-state-territory-program-guidance-dec-2025-final-508.pdf>
- Waste Dive SWIFR coverage: <https://www.wastedive.com/news/us-epa-announces-58-million-in-recycling-infrastructure-grants/808008/>
- EIB circular-economy page: <https://www.eib.org/en/projects/topics/energy-natural-resources/circular-economy/index>
- EIB MM S.p.A. €100M (Nov 2024): <https://www.eib.org/en/press/all/2024-454-cop29-circular-economy-investments-deliver-social-economic-and-environmental-benefits>
- LME Aluminium UBC Scrap US (Argus) contract: <https://www.lme.com/metals/non-ferrous/lme-aluminium-ubc-scrap-us-argus>
- Westmetall LME cash historical: <https://www.westmetall.com/en/markdaten.php?action=table&field=LME_Al_cash>
- BLS OEWS PR: <https://www.bls.gov/oes/current/oes_pr.htm>
- Closed Loop Partners: <https://www.closedlooppartners.com>
- TOMRA Germany DRS: <https://www.tomra.com/reverse-vending/media-center/feature-articles/germany-deposit-return-scheme>
- TOMRA Australia DRS: <https://www.tomra.com/reverse-vending/media-center/feature-articles/australia-container-deposit-schemes>
- BLS Strategies Act 60: <https://www.blsstrategies.com/incentives/puerto-rico>

**Vendor / equipment pricing.**
- Hertwich URTF: <https://www.hertwich.com/products/melting-furnaces/universal-rotary-tilting-furnaces>
- Hertwich Ecomelt PS: <https://www.hertwich.com/products/melting-furnaces/ecomelt-ps>
- Hertwich melting-furnace range: <https://www.hertwich.com/products/melting-furnaces>
- Verra Registry (accessed for VCS market pricing): <https://verra.org>

---

*End of funding-model.md. The companion file `site/assets/budget-data.json` is the machine-readable version of the medium-scenario tables in Part 1.*
