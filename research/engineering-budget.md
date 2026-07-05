# Engineering & Budget Report: Puerto Rico Aluminum Can Recycling Facility

**Prepared for:** Government proposal — Puerto Rico
**Date:** July 2026
**Status:** Draft for review — every estimate carries explicit uncertainty

> ⚠️ **Honesty about uncertainty.** This is a desktop study built from public sources, vendor specs, and engineering heuristics. Real CAPEX quotes from Hertwich, StrikoWestofen, Wagstaff, and Danieli typically vary ±25% from budget figures; OPEX varies ±15% in year one and widens with commodity-price swings. Treat these numbers as **planning-grade** — appropriate for a Phase 1 feasibility submission, NOT for financing commitment.

---

## Table of Contents

1. [Capacity Sizing](#1-capacity-sizing)
2. [Process Technology](#2-process-technology-small-scale-end-to-end)
3. [Three Facility Size Scenarios](#3-three-facility-size-scenarios)
4. [Construction Costs in Puerto Rico](#4-construction-costs-in-puerto-rico)
5. [Revenue & Business Model](#5-revenue--business-model)
6. [Drop-off Infrastructure](#6-drop-off-infrastructure)
7. [Logistics & Collection](#7-logistics--collection)
8. [Funding Sources](#8-funding-sources)
9. [Phased Implementation](#9-phased-implementation)
10. [Sources & Caveats](#10-sources--caveats)

---

## 1. Capacity Sizing

### 1.1 Baseline tonnage calculation

| Parameter | Value | Source / assumption |
|---|---|---|
| Puerto Rico population (2024 est.) | 3,200,000 | US Census Bureau QuickFacts |
| Per-capita can consumption (PR) | ~280 cans/person/year | ~7% below the U.S. average of ~300 cited by CanCentral; PR has lower disposable income and a stronger returnable-glass preference for soft drinks |
| Average empty can mass | 14.5 g | CanCentral / industry standard for 355 mL can; has trended from ~16 g in 2000 to ~13.5 g in 2024 |
| Cans per metric ton | ~68,966 | 1,000,000 g / 14.5 g |
| **Total UBCs generated in PR** | **~13,000 t/y** | 3.2M × 280 × 14.5 g = 12,992 t/y |
| **tons / day @ 300 operating days** | **~43 t/day baseline** | 13,000 / 300 |
| **kg / hour @ 16-h shift** | **~2,700 kg/h** | 13,000 / 300 / 16 |

### 1.2 Sizing by capture-rate target

| Target rate | Annual UBCs processed | Tons/day (300 d) | kg/h (16 h) | Facility class |
|---|---|---|---|---|
| **50%** (achievable short-term, no policy change) | 6,500 t/y | 22 t/d | 1,360 kg/h | **Small** |
| **75%** (PR aspirational; matches top 5 U.S. states) | 9,750 t/y | 33 t/d | 2,030 kg/h | **Medium** |
| **95%** (theoretical max; bottle-bill-tier) | 12,350 t/y | 41 t/d | 2,580 kg/h | **Large** |

The 5,000 / 15,000 / 40,000 t/y scenarios in §3 deliberately overshoot the 95% baseline. This is intentional: the 40,000 t/y case covers current UBCs **plus** imported scrap / dross reprocessing / island-wide capture plus modest export of ingot to the Caribbean basin. A 40,000 t/y plant would be one of the largest in the Caribbean and would have a different economic profile (e.g., ingot export to U.S. Gulf or Dominican Republic).

### 1.3 Peak vs. baseline (capacity factor)

- **Christmas / New Year peak:** +30–40% above baseline. Soft-drink and beer consumption spike Dec 15–Jan 5. **Design implication:** storage bunker sized for ~14 days of peak output; collection fleet schedules additional Saturday runs.
- **Tourism:** PR receives ~5 million tourists/year. If each tourist consumes ~1 can/day for an average 5-day stay, that's ~25 million additional cans = ~363 t/y — less than 3% of total. But **geographically concentrated** in San Juan, Condado, Isla Verde, El Yunque, Rincón, and Ponce — collection routes to these areas should be 1.4× the rest-of-island frequency.
- **Hurricane disruption:** A direct hit (Maria 2017, Fiona 2022) typically suspends collection for 2–8 weeks and damages drop-off infrastructure. **Design implication:** underground utilities, hardened control room (FORTIFIED Hurricane or FORTIFIED Commercial — see §4.3), on-site backup power 7–14 days of diesel, and contractually pre-positioned portable generators. Assume **92% collection-side availability**; furnace should be sized to "catch up" by running extended hours post-storm.

---

## 2. Process Technology (small-scale, end-to-end)

### 2.1 Process flow

```
[Baled UBCs in] → Sort (Eddy current + XRF) → Shred / Dedensify
    → Wash (caustic or water) → De-coat (pyrolysis kiln, 480–520°C)
    → Melt (rotary tilting furnace, 720–760°C)
    → Flux / Dross skim → Hold (electric holder, 700°C)
    → Cast (sow / ingot / T-bar)
    → [Palletized P1020A-equivalent ingot out]
```

Each stage is detailed below with brand-name examples, indicative cost, and resource intensity. Brand names are illustrative; actual procurement should be a competitive bid.

### 2.2 Stage-by-stage breakdown

#### A. Collection & Receiving

- **Receiving building:** tipping floor, front-end loader, weighbridge, inspection station, bale breaker.
- **Equipment:** Volvo L60H wheel loader (~$350k new, $200k used), 80-ton certified weighbridge ($80–120k), 2× forklift ($30k each).
- **Footprint:** ~600 m².
- **Workers:** 2 receiving per shift (4 FTE total @ 2 shifts).
- **Cost range:** $0.6–1.0 M.

#### B. Sort & Pre-process

- **Eddy-current separator (ECS):** removes non-aluminum (steel can lids, foils). Brands: Steinert, Eriez, Bakker Magnetics. **$200–500k** for a 5–10 t/h unit.
- **XRF sorter (optional, for high-purity lines):** brands Thermo Fisher, Olympus; **$300–700k** but only needed if plant targets >99% purity (can sheet needs ≥99.5% Al; UBC-derived is typically 99.2–99.7%).
- **Trommel / disc screen:** removes fines and glass, **$80–150k**.
- **Workers:** 1 QC per shift; sort line mostly automated.
- **Power:** ~20–30 kWh/ton.
- **Footprint:** ~400 m².

#### C. Shred / Dedensify

- **Shredder:** dual-shaft rotary shear. Capacity 3–8 t/h. Brands: Hammermill, Shred-Tech, UNTHA, Sinoshredder. **$300–800k** for a 5-t/h unit including magnetic separator downstream. Power draw: ~150–250 kW when running; 30–50 kWh/ton.
- **Densifier / briquetter:** UBCs are 1.5–2% of solid aluminum density as loose cans; briquetting raises bulk density from ~50 kg/m³ to ~600–1,000 kg/m³, slashing furnace charge time and salt-flux loss. Brands: RUF, Briquetting Systems, Sinoshredder. **$150–400k**.
- **Footprint:** ~300 m²; noise enclosure required (~+20% cost).
- **Workers:** 1 per shift (supervisory).

#### D. Wash

- **Pre-wash + rinsing:** drag conveyor, hot-water immersion tank (60–80°C), dewater screen.
- **Water use:** 0.5–2 m³/ton (closed loop with clarifier reduces to 0.1–0.3 m³/ton net).
- **Effluent treatment:** dissolved air flotation (DAF), pH adjust, oil skimmer. Brands: Toro, Westech, JWC Environmental. **$300–800k**.
- **Power:** 5–10 kWh/ton (pumps).
- **Footprint:** ~250 m².
- **Workers:** 0.5/shift (process operator covers wash + DAF).
- **Permit consideration:** Puerto Rico EQB Regulation No. 5300 covers industrial discharges. Discharge to PRASA regional POTW requires pre-treatment compliance.

#### E. De-coat (Pyrolysis / Thermal De-lacquering)

- **Why needed:** UBC lacquer (~3–6% of can mass) creates VOC emissions, dross, and metal loss if fed directly to furnace.
- **Equipment:** continuous rotary kiln or pulse-heated decoater, 480–520°C, 15–30 min residence time, controlled O₂ (typically 2–4% to avoid full combustion). Off-gas goes to **afterburner (≥750°C) → baghouse → RTO/carbon adsorption**.
- **Brands:** Herzog (Germany), Inglod (Israel), SECO/Warwick, Brightstar (China), SUNY Group. **$1.5–4.0 M** for a 1–3 t/h continuous unit.
- **Energy:** 1.0–1.5 GJ/ton natural gas (some electric infrared designs available).
- **Workers:** 0.5/shift.
- **Footprint:** ~400 m² (kiln + afterburner + air-pollution control train).
- **Critical emissions here:** VOCs (pyrolysis products), CO, particulates, HCl from residual can liners. See §2.4.

#### F. Melt (rotary tilting furnace — preferred over reverberatory for UBC)

- **Equipment:** for UBCs the **rotary tilting furnace** is preferred over a reverb because it can handle oily/lightly-contaminated scrap, has higher melting efficiency, and enables dross recovery in-vessel.
- **Vendors:**
  - **Hertwich (Austria, Constellium group)** — Universal Rotary Tilting Furnace (URTF) 3–20 m³ (6–40 t) capacity, 1.5–8 t/h melt rate.
  - **StrikoWestofen (Germany)** — large reverb and stack melters.
  - **Otto Junker (Germany)** — large industrial.
  - **Danieli (Italy)** — full integrated lines including holders and casting.
  - **Schaefer (USA)** — electric reverb (preferred for grid-power regions).
- **Hertwich URTF-14 example:** ~14 m³, 25-ton charge, ~3–4 t/h melt rate, oxy-fuel burner, 1 operator + 1 supervisor/shift ([hertwich.com](https://www.hertwich.com/products/melting-furnaces/universal-rotary-tilting-furnaces)).
- **Cost range:**
  - Small (5–10 t/h): **$3–6 M** for furnace + burner + control + stack
  - Medium (10–25 t/h): **$6–12 M**
  - Large (25–50 t/h): **$12–25 M**
- **Salt-flux vs. salt-free:**
  - Conventional "salt slag" process uses NaCl-KCl mix (generates salt cake waste that requires hazardous-waste treatment in many jurisdictions).
  - **Modern preference: salt-free processes** like Hertwich's **ALUREC** or low-salt (≤5% salt cake yield) — much better environmental profile, +10–20% CAPEX but −50% waste handling cost.
- **Energy:**
  - **Oxy-fuel rotary tilting furnace:** ~3.0–3.5 GJ/ton natural gas (35–40 Nm³/ton).
  - **Electric reverb (Schaefer):** 600–625 kWh/ton ([electroheatinduction.com](https://electroheatinduction.com/how-to-calculate-electricity-cost-for-melting-metal-in-induction-melting-furnace/)) — but requires clean grid and is impractical for >10 t/h unless power is very cheap.
  - **Best-practice gas:** 650–850 kWh/ton gas equivalent (HTGP, [aluminum-furnace.com](https://www.aluminum-furnace.com/aluminum-furnace)).
- **Recommended for PR:** gas-fired rotary tilting with electric holder, OR a Schaefer-style electric reverb if the operator can secure an industrial-scale renewable PPA (PR's Act 17-2019 mandates 100% renewable by 2050; LUMA grid is currently unreliable — see §4.4).
- **Footprint:** ~500 m² per furnace line, plus 200 m² for flux handling.
- **Workers:** 1 operator + 1 supervisor per shift per furnace.

#### G. Flux / Dross Handling

- **Salt-free dross cooler:** rotary cooler to below 100°C before exposing to air. Brands: Pyrotek, AJAX, StrikoWestofen. **$200–600k**.
- **Dross press / sieve:** recovers metallic Al; brands: Sijuta, Plasma Induction. **$150–400k**.
- **Dross yield:** 1–3% of charge for clean UBC; can be 3–6% for dirty or un-decoated scrap.
- **Sale:** dross is 15–80% metallic Al by mass (Okon Recycling). Sold to a dross processor (Befesa, Real Alloy) for a percentage of LME. **Realized price ~$200–500/ton dross** but freight to a U.S. processor from PR is the gating constraint (see §7).
- **Workers:** 0.5/shift.

#### H. Casting (ingot / sow / T-bar)

- **Pig casting machine (sow, ~22 kg):** simpler, lower CAPEX, used by ~60% of UBC re-melters. Brands: StrikoWestofen, Hertwich, Robotech. **$1.0–2.5 M** for a 5–10 t/h sow line.
- **Direct-chill (DC) caster (ingot / T-bar):** produces P1020A-quality ingot for can-sheet or extrusion billet. Brands: **Wagstaff** (US, market leader), Danieli, Otto Junker. **$5–12 M** for a 10–20 t/h DC line including homogenize furnace and cooling.
- **Recommended for PR (Phase 1):** sow casting — much lower CAPEX, faster payback, and PR's local downstream market is too small to justify P1020A-grade casting investment.
- **Power:** 10–20 kWh/ton.
- **Water:** 1–3 m³/ton (DC caster; closed-loop cooling tower).
- **Footprint:** ~600 m².
- **Workers:** 1.5/shift.

#### I. Material handling, dust collection, utilities

- **Baghouse for furnace + decoater off-gas:** 30,000–100,000 Nm³/h, 99.9% efficiency on PM. Brands: Torit, Donaldson, AAF. **$0.6–1.5 M**.
- **Wet scrubber for HCl/HF:** if charging foil or coated scrap, add packed-bed scrubber. **$0.3–0.8 M**.
- **Compressed air, hydraulic, dust collection piping:** **$0.5–1.0 M**.
- **Fire suppression (salt-free dross reacts with water):** dry chemical + Class D agent for metal fires. **$0.2–0.5 M**.

### 2.3 Power, water, labor, footprint summary

| Process stage | Power (kWh/ton) | Gas (GJ/ton) | Water (m³/ton) | Workers/shift | Footprint (m²) |
|---|---|---|---|---|---|
| Receiving | 5 | 0 | 0 | 2 | 600 |
| Sort | 20–30 | 0 | 0 | 1 | 400 |
| Shred + briquette | 30–50 | 0 | 0 | 1 | 300 |
| Wash | 5–10 | 0.05 | 0.5–2 (net 0.1–0.3) | 0.5 | 250 |
| De-coat | 10 | 1.0–1.5 | 0 | 0.5 | 400 |
| Melt (gas-fired rotary) | 30–50 | 3.0–3.5 | 0.3 (cooling) | 2 | 500 |
| Dross | 10 | 0.1 | 0 | 0.5 | 200 |
| Cast (sow) | 15 | 0.1 | 0.5 | 1.5 | 600 |
| Baghouse / utilities | 30 | 0 | 0 | 0.5 | 400 |
| **TOTAL** | **~155–215** | **~4.2–5.2** | **~1.0–3.0** | **~9.5/shift** | **~3,650 m² process** |

**At 5,000 t/y:** ~775 MWh/y electricity + ~22,000 GJ gas. At PR industrial rate (~$0.18–0.23/kWh + gas $0.30–0.40/m³ for industrial), energy OPEX ≈ $190–250/ton.
**At 40,000 t/y:** ~6,200 MWh/y + 176,000 GJ gas. Energy OPEX ≈ $190–250/ton (similar — energy is a function of metallurgy, not scale).

### 2.4 Stack emissions & regulatory limits

| Pollutant | Source in UBC process | EU BREF NFM (BAT-AEL) | EPA NSPS / NESHAP analog | PR EQB Reg. 5300 |
|---|---|---|---|---|
| Particulate matter (PM) | Furnace, decoater, dross | 1–5 mg/Nm³ | 0.6–2.3 kg/t Al (NSPS subpart AA) | 0.1 gr/dscf (older) / aligns with NSPS |
| HF | Bath, salt flux (legacy) | <1 mg/Nm³ | <0.1 kg/t | <10 ppm |
| HCl | Decoater, coated scrap | <5 mg/Nm³ | 0.4 kg/t | 25 ppm |
| CO | Decoater (incomplete combustion), gas burner | 5–50 mg/Nm³ (BAT-AEL) | 1.5 kg/t | 50 ppm/hr avg |
| NOx | Gas burner, oxy-fuel | 30–100 mg/Nm³ (BAT-AEL) | 0.6 kg/t | 0.2 lb/MMBtu |
| VOCs / organics | Decoater (pyrolysis vapors) | 5–30 mg C/Nm³ | 0.2–0.4 kg/t | 50 ppm |
| Dioxins/furans | Decoater (chlorinated lacquers) | <0.1 ng TEQ/Nm³ | 0.0001 ng TEQ/Nm³ | 0.0001 ng/dscf |
| SO₂ | Sulfur in scrap / fuel | 30–100 mg/Nm³ | 1.0 kg/t | 0.5 lb/MMBtu |

Sources: EU BREF Non-Ferrous Metals Industries (JRC 2017, superseding 2001 version), 40 CFR §63 Subpart RRR, PR EQB Regulation 5300 (Regulations for the Control of Atmospheric Pollution). **PR Title V Operating Permit** will be required at >50 t/y melt capacity.

### 2.5 Health & safety special concerns

- **Lead exposure:** modern UBCs (post-1990s) are essentially lead-free, but pre-consumer / industrial scrap streams can contain lead-bearing alloys. **OSHA PEL 50 µg/m³ (8-h TWA) for lead**; air monitoring, medical surveillance (blood-lead), hygiene facilities mandated under 29 CFR 1910.1025. PR OSHA-state plan applies federal standards.
- **Beryllium:** some Al-Cu and Al-Be alloys contain beryllium; small fraction of UBC stream. OSHA PEL 0.2 µg/m³; 29 CFR 1910.252 (welding); NIOSH REL 0.0005 mg/m³.
- **PFOA / PFAS:** used in some can liners and pre-lubricants; pyrolysis byproducts may include fluorinated organics. Emerging EPA regulation (Oct 2023 PFAS SNUR) — no specific UBC MACT, but **state-level monitoring is increasingly required** in NY, NJ, CA.
- **Salt slag (if used):** classified as hazardous waste in many jurisdictions due to chloride leaching; PR's RCRA-authorized program follows EPA. Salt-free processes eliminate this liability.
- **Fire:** dross reacts violently with water → **Class D extinguishing media (sodium chloride / graphite-based)** required at all handling points.
- **Heat stress:** PR's tropical climate (avg 27°C, >90% humidity) requires robust ventilation and work-rest protocols. OSHA Heat Illness Prevention.

---

## 3. Three Facility Size Scenarios

All figures are in 2026 USD, EPC-contract basis, Puerto Rico construction premium included (see §4). Rounded to nearest $100k; ±25% confidence.

### 3.1 Small Facility — 5,000 t/y (regional)

**Scope:** 1–2 municipalities (e.g., Caguas + Gurabo, or Ponce + Juana Díaz). 1–2 sort-line shifts, batch melt. Serves as a regional hub.

| Cost element | Range (USD) | Notes |
|---|---|---|
| **Equipment (CAPEX)** | **$10–14 M** | |
| └ Receiving & sort | $1.0–1.5 M | ECS, XRF (basic), scale |
| └ Shred + briquette | $0.6–1.0 M | 3 t/h shredder |
| └ Wash + DAF | $0.5–0.8 M | |
| └ Decoater (1 t/h) | $1.8–2.5 M | Continuous rotary |
| └ Furnace (rotary tilting, 6–8 t) | $3.5–5.0 M | Gas-fired, low-salt |
| └ Dross press + cooler | $0.4–0.6 M | |
| └ Sow caster | $1.2–1.8 M | |
| └ Baghouse + scrubber + utilities | $1.0–1.5 M | |
| **Installation / EPC (40% of equipment)** | **$4.0–5.5 M** | Piping, electrical, structural, controls |
| **Building & site (1,500 m² @ $2,300/m²)** | **$3.5–4.5 M** | Includes 20% hurricane premium, FORTIFIED |
| **Land (1.5 ha industrial zoned)** | **$0.6–1.0 M** | See §4.2 |
| **Pre-production (engineering, permits, working capital)** | **$1.5–2.5 M** | |
| **TOTAL CAPEX** | **$20–28 M** | midpoint **$24 M** |

**Annual OPEX @ 5,000 t/y:**

| Line | $/ton | Total |
|---|---|---|
| Energy (electricity + gas) | 220 | $1.10 M |
| Labor (32 FTE × $45k loaded) | 290 | $1.45 M |
| Consumables (salt flux, refractories, coolant) | 60 | $0.30 M |
| Maintenance (3.5% CAPEX) | 175 | $0.88 M |
| Transport (collection + dross out) | 90 | $0.45 M |
| Insurance (PR hurricane premium, 2.5% of CAPEX) | 125 | $0.63 M |
| G&A + taxes | 50 | $0.25 M |
| **OPEX total** | **~$1,010/t** | **~$5.05 M/y** |

**Revenue (gross, before tip-fee/credit offset):**

| Stream | $/ton UBC | $5,000 t/y |
|---|---|---|
| Aluminum ingot (95% yield, $2,400/t LME minus flux 15% = $2,040 net) | ~$1,940/t ingot × 0.95 t / t UBC | $9.22 M |
| Dross sale (1.5% of input, 30% metal, $400/t) | | $0.09 M |
| **Gross product revenue** | | **~$9.3 M** |

**Other revenue (tip fees, carbon credits, grants) — see §5:** could add $250–450/ton in combined value → +$1.25–2.25 M/y.

**Payback (gross, year 1):** ($24 M CAPEX) / ($9.3 M − $5.05 M = $4.25 M EBITDA) ≈ **5.6 years**. With tip fees + carbon + grant offsets in year 2: **~3.5 years**. **Caveat:** payback is highly sensitive to LME aluminum price; a 30% LME drop extends payback to 8+ years.

### 3.2 Medium Facility — 15,000 t/y (island-wide multi-route)

**Scope:** all 78 municipalities served by regional collection hubs feeding single central plant. 2-shift continuous operation. Bridge gap toward full recycling rate.

| Cost element | Range (USD) | Notes |
|---|---|---|
| **Equipment (CAPEX)** | **$22–32 M** | |
| └ Receiving (4-bay) + 2× sort lines | $2.0–3.0 M | |
| └ 2× shred lines (5 t/h each) | $1.5–2.5 M | |
| └ Wash (larger DAF) | $0.8–1.2 M | |
| └ Decoater (3 t/h) | $3.5–5.0 M | |
| └ Furnace (Hertwich URTF-14, 25 t charge) | $6.5–9.0 M | |
| └ Dross cooler + press + sieving | $0.8–1.2 M | |
| └ Sow caster (5–8 t/h) | $2.5–3.5 M | |
| └ Air pollution control (full train) | $2.5–4.0 M | Baghouse + RTO + scrubber |
| └ Materials handling, scales, lab | $1.5–2.5 M | |
| **Installation / EPC (40% equipment)** | **$9.0–12.5 M** | |
| **Building & site (3,500 m² @ $2,200/m²)** | **$7.7–9.5 M** | FORTIFIED |
| **Land (3.5 ha)** | **$1.2–2.0 M** | |
| **Pre-production** | **$3.5–5.0 M** | |
| **TOTAL CAPEX** | **$43–61 M** | midpoint **$52 M** |

**Annual OPEX @ 15,000 t/y:**

| Line | $/ton | Total |
|---|---|---|
| Energy | 215 | $3.23 M |
| Labor (62 FTE × $48k loaded) | 198 | $2.98 M |
| Consumables | 55 | $0.83 M |
| Maintenance (3.5%) | 122 | $1.83 M |
| Transport (longer routes) | 75 | $1.13 M |
| Insurance | 110 | $1.65 M |
| G&A + taxes | 45 | $0.68 M |
| **OPEX total** | **~$820/t** | **~$12.3 M/y** |

**Revenue:** ~$28 M gross product + $2–4 M auxiliary (dross, tip fees, credits).

**EBITDA:** ~$15–18 M/y. **Payback:** ~3.0–3.5 years. **20-year IRR (with LME flat at $2,400):** 14–18%.

### 3.3 Large Facility — 40,000 t/y (island + export)

**Scope:** full UBC capture plus imported can-sheet scrap, dross import from Caribbean, and ingot/sow export to U.S. Gulf (Mobile, Tampa) or Dominican Republic. 24/7 operation. 3 shifts.

| Cost element | Range (USD) | Notes |
|---|---|---|
| **Equipment (CAPEX)** | **$45–65 M** | |
| └ Receiving + 4× sort lines | $4.0–6.0 M | Including XRF for high-purity |
| └ 4× shred lines (6 t/h) | $3.5–5.0 M | |
| └ Wash (industrial DAF, clarifier) | $1.5–2.5 M | |
| └ 2× Decoater (3 t/h each) | $6.0–9.0 M | |
| └ 2× Furnaces (Hertwich URTF-20, 40 t each) | $14–20 M | |
| └ Dross plant (full) | $2.0–3.0 M | |
| └ Sow + DC casting line (P1020A-capable) | $10–14 M | DC caster, homogenize |
| └ Air pollution control (full RTO train) | $4.0–6.0 M | |
| └ Materials handling, scales, on-site lab, XRF | $2.5–4.0 M | |
| **Installation / EPC (35% — economies of scale)** | **$16–23 M** | |
| **Building & site (8,000 m² @ $2,100/m²)** | **$16.5–20.0 M** | |
| **Land (8 ha)** | **$2.5–4.0 M** | |
| **Pre-production** | **$6.0–9.0 M** | |
| **TOTAL CAPEX** | **$86–121 M** | midpoint **$103 M** |

**Annual OPEX @ 40,000 t/y:**

| Line | $/ton | Total |
|---|---|---|
| Energy | 200 | $8.0 M |
| Labor (130 FTE × $50k) | 162 | $6.5 M |
| Consumables | 50 | $2.0 M |
| Maintenance (3%) | 78 | $3.1 M |
| Transport (truck + barge) | 90 | $3.6 M |
| Insurance | 95 | $3.8 M |
| G&A + taxes | 40 | $1.6 M |
| **OPEX total** | **~$715/t** | **~$28.6 M/y** |

**Revenue:** ~$76–80 M gross product (P1020A ingot commands a smaller flux/discount than sow; ~$2,200/t net realized). Plus dross $1.5 M, plus exports premium ~$1.0 M.

**EBITDA:** ~$50 M/y at flat $2,400/t LME. **Payback:** ~2.0 years. **20-year IRR:** 22–28% (preliminary — this is high-grade economics that depends on stable commodity prices and reliable power).

> ⚠️ **Caveat on the 40,000 t/y case:** This is the **only** scenario where PR's total UBC generation can be absorbed *and* a regional export business is built. It also concentrates risk: a hurricane that takes the plant offline costs $3.5–4 M/week in lost EBITDA. The right policy posture is **two medium facilities (15k + 15k)** on opposite ends of the island (e.g., Bayamón + Ponce) for resilience. The 40k case is included for benchmarking and as a stretch goal.

### 3.4 Side-by-side comparison

| Metric | Small 5,000 t/y | Medium 15,000 t/y | Large 40,000 t/y |
|---|---|---|---|
| Total CAPEX | $24 M | $52 M | $103 M |
| CAPEX per annual ton | $4,800 | $3,470 | $2,580 |
| OPEX per ton | $1,010 | $820 | $715 |
| EBITDA per ton (LME $2,400) | $850 | $970 | $1,000 |
| Payback (gross) | 5.6 y | 3.0 y | 2.0 y |
| FTE | 32 | 62 | 130 |
| Footprint (process) | 1,500 m² | 3,500 m² | 8,000 m² |
| Land | 1.5 ha | 3.5 ha | 8 ha |
| Annual energy | 775 MWh + 22,000 GJ | 2,300 MWh + 66,000 GJ | 6,200 MWh + 176,000 GJ |
| Annual water | 5,000–15,000 m³ | 15,000–45,000 m³ | 40,000–120,000 m³ |
| **Recommendation** | Pilot / proof-of-concept | **Primary recommendation** | Future-state, export-led |

---

## 4. Construction Costs in Puerto Rico

### 4.1 Industrial construction cost (the 20–40% premium)

Mainland U.S. industrial construction (warehouse + light process) typically runs **$120–200/ft² ($1,300–2,150/m²)** per 2025 RSMeans / Dodge data.

Puerto Rico industrial construction per **DevBuilders 2026 Construction Costs in Puerto Rico** ([devbuilders.com/insights/construction-costs-puerto-rico](https://www.devbuilders.com/insights/construction-costs-puerto-rico)):

> "Industrial facilities: **$125–$220/sq. ft.**"

That is **$1,345–2,370/m²** — broadly **in line with mainland U.S.** at the lower end and **+10–15% premium** at the upper end. The 20–40% premium frequently cited applies to **residential and custom commercial** work; industrial shell (tilt-up concrete, pre-engineered metal) is closer to parity. We use **$1,500–2,300/m² for unhardened industrial** in §3.

### 4.2 Land costs

- **Industrial zoned land (PRIDCO parks):** $20–50/m² (~$80,000–200,000 per acre) in established parks (Bayamón, Caguas, Ponce, Mayagüez). PRIDCO lease terms typically $0.50–1.50/m²/month for developed sites.
- **Private industrial (Cataño, Carolina, Guaynabo):** $50–150/m² near San Juan metro.
- **Interior / rural industrial:** $10–30/m² (Cayey, Salinas, Arecibo industrial corridors).
- **Build-to-suit PRIDCO:** often discounted below market for job-creation projects; 10–20 year leases with renewal options.

**Recommendation:** target **PRIDCO industrial park** in Caguas, Bayamón, or Guaynabo (best freight access, near port and metro labor pool). Avoid coastal sites (hurricane surge + corrosion).

### 4.3 Hurricane-rated construction

Two recognized standards:

- **FORTIFIED Commercial™ (IBHS):** $50–$175/sq ft (DevBuilders hurricane preparedness guide). Premium of **+15–20%** over standard industrial.
- **ASCE 7-22 + IBC 2024** with HVHZ (High Velocity Hurricane Zone) provisions: required by PR building code 2018 (OGPe), which adopts IBC with Caribbean amendments.

**Specific PR construction realities:**

- Reinforced concrete (RC) is the default; CMU + RC roof is common.
- Impact-rated glazing or shutters mandatory.
- Metal roofs require continuous load path and hurricane straps (~$15–25/m² premium).
- Backup power: hurricane-rated generators (Caterpillar, Cummins) sized for 7–14 days at 50% load — typical $0.3–1.0 M for 250 kW–1 MW diesel + ATS.
- Stormwater management: PR EQB requires retention for 100-yr, 24-hr storm (~10–13 inches).
- Wind design: 150–180 mph ultimate design wind speed (PR Category 5).

**Cost to harden the recycling facility:** $0.5–2.0 M depending on size — built into §3 building costs.

### 4.4 Insurance — the PR premium

PR commercial property insurance is **the largest controllable risk premium** in the project:

- Mainland U.S. industrial property: 0.4–0.6% of value per year.
- **PR: 1.5–3.5% of value per year** — 3–6× higher, driven by hurricane and (historically) insurer-claim-payment risk.
- **Wind-only coverage** often 3–5% standalone.
- **PR does not have a state-run insurance residual market of the size of Florida Citizens**; many risks go to commercial surplus lines.
- **FEMA NFIP** covers flood up to $500k building / $500k contents; insufficient for a $50–100M facility.
- **Parametric hurricane insurance** (Cosmic, Kettle) increasingly used in the Caribbean; pays out on wind-speed trigger, not indemnity. Premiums ~1–2% of TIV.

**Mitigations:**

1. Co-locate with or anchor to a PRIDCO park (may offer master insurance program).
2. Self-insure wind risk for the first $5–10M layer (typical in island operations).
3. Pursue **BRIC-funded mitigation** (see §8) — FORTIFIED upgrades can shift premium down by 10–20%.

**Annual insurance cost modeled at 2.5% of CAPEX** in §3 (vs. 0.5% mainland baseline). This adds **~$50/ton** at small scale, ~$87/ton at medium, ~$65/ton at large — a single line item that swings project IRR by 200–400 bps.

### 4.5 Electricity

- **LUMA industrial rate (2024–2025):** ~$0.18–$0.23/kWh base, plus riders and fuel adjustment. The Puerto Rico Data Lab cites ~23¢/kWh ([prdatalab.wordpress.com](https://prdatalab.wordpress.com/category/electricity-rates/)). **Approximately 1.5–2× the mainland U.S. industrial average** (~$0.08–0.12/kWh).
- **Reliability:** poor. Average SAIDI in 2024 was 700+ minutes/year vs. mainland U.S. average ~100. **On-site backup generation is mandatory**, not optional.
- **Renewable option:** PR's Act 17-2019 mandates 100% renewables by 2050; PUMA and PREPA-mediated PPAs allow industrial customers to contract directly. **Solar + battery** could supply 30–60% of plant electricity at $0.10–0.14/kWh LCOE. This is a major OPEX lever for the medium/large scenarios.

---

## 5. Revenue & Business Model

### 5.1 Commodity price assumptions (2026 mid-cycle)

- **LME aluminum spot:** ~$2,300–$3,200/t, midpoint **$2,500–$2,700/t** in mid-2026 (Trading Economics, Worthwill).
- **UBC scrap (clean, baled, U.S.):** Argus / ScrapMonster ~$0.55–$1.01/lb = **$1,200–$2,200/t** — typically priced at **70–85% of LME** (a 15–30% flux/discount for melt loss, alloy, freight).
- **P1020A ingot (99.7% Al, primary equivalent):** typically LME + $200–400/t premium.
- **Sow (22 kg pigs, secondary):** typically LME – $80–150/t discount.
- **T-bar (DC cast, can-sheet equivalent):** LME + $100–250/t premium.

A UBC-to-sow plant realizes approximately **LME × 0.80**. At LME $2,500/t, that's **$2,000/t ingot** net.

### 5.2 Per-ton revenue stack (UBC basis)

| Stream | $/ton UBC | Notes |
|---|---|---|
| Aluminum ingot (95% metal yield × $2,000/t) | $1,900 | |
| Dross sale (1.5% of input × 30% metal × $1,200/t metal) | ~$5 | Net of freight to a U.S. processor (Befesa, Real Alloy) |
| De-coated paint/organic waste | $0 | Often disposed; small market as solid fuel |
| **Commodity revenue** | **~$1,905** | |
| Tip fee (avoided landfill cost) | $40–80 | See §5.3 |
| Carbon credits (voluntary, 1 tCO₂e/t × $20) | $20 | See §5.4 |
| EPR fees from beverage companies (if enacted) | $50–150 | See §5.5 |
| Government incentive (state/territorial) | $20–50 | TIP-style program, conditional |
| **Auxiliary revenue** | **~$130–300** | |
| **TOTAL per-ton revenue** | **$2,035–2,205** | |

### 5.3 Tip fees / avoided landfill

- Mainland U.S. municipal solid waste tip fee: $50–120/ton (varies wildly).
- **PR landfill tip fees:** limited public data, but reported $40–80/ton in regional facilities (Fideicomiso de Residuos Sólidos estimates). Avoided cost is the relevant number — PR currently landfills ~3.4 million t/yr of MSW at rapidly dwindling capacity (active landfills: only 2 of 29 EPA-compliant). **A can-recycling plant that diverts 5,000–40,000 t/yr has a real, monetizable avoided-cost story** for both government and private landfills.

### 5.4 Carbon credits

- **Emissions from secondary Al (UBC-to-ingot):** 0.4–0.6 tCO₂e/ton Al (Insertec 2025 estimate).
- **Avoided vs. primary Al:** primary smelting emits ~11–14 tCO₂e/ton (grid-dependent; IAI / Statista 2021 average ~14,114 kWh/ton × grid carbon intensity).
- **Net avoided emissions per ton UBC:** ~**1.2–1.5 tCO₂e/ton** (after collection, transport, sorting, melt — full scope).
- **Voluntary market price:** $10–30/ton CO₂e for Verra/Gold Standard; 2024 voluntary market average ~$7/ton globally, but high-quality metal-recycling credits trade at $15–25/ton.
- **Compliance value:** California's LCFS credits trade at $50–80/ton CO₂e; PR is not in LCFS, but a regional exporter could sell into compliance markets indirectly.
- **Annual carbon revenue:** ~$15–45k (small) to $0.6–1.8M (large).

### 5.5 Extended Producer Responsibility (EPR)

- The most successful U.S. example: **California CRV (5–10¢/can)**, **Michigan 10¢/can**, **New York 5¢/can**. These states achieve 70–90% recycling.
- **PR has no container-deposit law.** A 2021 PR Senate bill (PS 369) proposing a 5¢ deposit has not passed (as of late 2024).
- **If PR enacts a 5¢ deposit** and ~50% of consumers participate: at 1 billion cans/yr, that's $50M/year in deposit float, of which ~$15M/yr could flow to the processor (the redemption-handler fee) — a transformative revenue stream.
- **Voluntary EPR fees from Coca-Cola, Pepsi, AB InBev, Diageo (Bacardi, Captain Morgan):** Closed Loop Partners / American Beverage Association funds have financed 65+ projects ([americanbeverage.org/press-releases/american-beverage-closed-loop-partners-finance-multi-million-dollar-loan-to-support-new-san-antonio-recycling-facility/](https://www.americanbeverage.org/press-releases/american-beverage-closed-loop-partners-finance-multi-million-dollar-loan-to-support-new-san-antonio-recycling-facility/)). These are typically 7–15 year low-interest loans at $5–25M scale.

### 5.6 Government grants and tax credits

See §8 for full menu. Key OPEX-impacting items:

- **IRA §45X Advanced Manufacturing Production Credit** — for aluminum secondary production. Final regs (Oct 2024) explicitly include **secondary production from recycled material** ([Grant Thornton alert](https://www.grantthornton.com/insights/alerts/tax/2024/flash/irs-expands-section-45x-advanced-manufacturing-credit)). Credit value: §45X for aluminum is calculated per kilogram of produced component; the **secondary aluminum** rate is **$0.58/kg = $580/ton produced**. **This is potentially transformational** — at 5,000 t/y produced, that's **$2.9M/year** of credit. ⚠️ **Eligibility verification required** with a tax attorney — eligibility depends on "substantial transformation" of recycled material, and the credit phases down for components produced after 2029.
- **IRA §48 Investment Tax Credit:** 30% of CAPEX if the project meets prevailing wage + apprenticeship requirements. For a $50M project, that's $15M direct tax credit. Transferable under §6418.
- **IRA §6418 Transferability:** credits can be sold to corporate buyers; §45X credits were 26.9% of the 2024 transferable credit market ([cruxclimate.com/insights/advanced-manufacturing-tax-credit](https://www.cruxclimate.com/insights/advanced-manufacturing-tax-credit)).

### 5.7 Suggested revenue model (medium facility, year 3 baseline)

| Revenue stream | $ / y | Share |
|---|---|---|
| Aluminum ingot (14,250 t produced × $2,000) | $28.5 M | 90% |
| Tip fees ($60 × 15,000) | $0.9 M | 3% |
| Dross sale (1.5% × 30% × $1,200 × 15,000) | $0.08 M | <1% |
| Carbon credits (1.3 t × $18 × 15,000) | $0.35 M | 1% |
| EPR / Closed-Loop partnership (assumed) | $1.5 M | 5% |
| Government TIP-style incentive | $0.5 M | 1% |
| **Total revenue** | **$31.8 M** | |
| OPEX | $12.3 M | |
| **EBITDA** | **$19.5 M** | |
| Less: §45X credit (if claimed as a reduction of cost basis; otherwise OPEX-equivalent cash) | $0–8.7 M | Range depends on tax-claim structure |
| **Net cash after credit** | $19.5–28.2 M | |

If structured as a tax-equity deal with a corporate buyer under §6418, the credit can be monetized at 90–95% face value in year 1. **This is the single biggest financial-engineering lever in the deal.**

---

## 6. Drop-off Infrastructure

### 6.1 Models

| Model | Capital cost | Operating cost | Coverage | Notes |
|---|---|---|---|---|
| **Curbside (single-stream)** | $0 / included in MSW | $30–80/household/year | Universal | Requires MRF integration; PR's MSW is single-stream in some municipalities (San Juan) but most still source-separated |
| **Bring centers (municipality drop-off)** | $20–80k per site | $8–15k/yr/site | 1 per 5,000–15,000 residents | 6 m³–15 m³ roll-off container, fenced lot, lighting, signage |
| **Reverse Vending Machine (RVM)** | $15–50k per unit | $2–6k/yr/unit (collection, maintenance) | 1 per 1,000–3,000 residents in dense areas | TOMRA R1 is a common reference; pricing varies with features (barcode vs. AI vision, cash vs. e-wallet) |
| **School / workplace program** | $1–3k per bin site | $500/yr per site | Variable | Piggybacks on existing waste contracts |
| **Mobile collection (event-based)** | $80–150k truck | $50/ton collected | Variable | PR's beach / festival scene |

**TOMRA / Envipco RVMs** at the $20–35k range are the workhorses; **AI-vision RVMs** (Aco Recycling, Olyns) are the new generation and may reduce collection cost per can.

### 6.2 Recommended PR drop-off target

> **Note on terminology:** the steps below describe the **drop-off network rollout** schedule, not the project phases defined in §9. (The site's public timeline uses Project Phase 1–4 over Years 0–7; these rollout steps live in a different frame.)

- **Rollout Step 1 (Year 1–2):** 50 bring centers + 25 RVMs in 5 metro areas. Cost: **$3.5–5.0 M CAPEX**, $0.5–0.8 M/yr OPEX.
- **Rollout Step 2 (Year 3–5):** Scale to **150 bring centers + 100 RVMs** + 200 school/workplace bins. Total CAPEX **$10–15 M**, OPEX $2.5–3.5 M/yr.
- **Rollout Step 3 (Year 5–10):** universal coverage — **1 drop-off point per 2,500 residents** in urban areas, **1 per 1,500 in dense San Juan metro**. Estimated **300+ bring centers + 250 RVMs**.

**Coverage math:** PR has 3.2M people; at 2,500 per bring center = 1,280 sites; at 1,500 = 2,133 sites for full saturation. Realistic Step 3 ≈ 300 sites (one per ~10,000 residents) is a high-impact but achievable target.

### 6.3 50 candidate drop-off locations (illustrative)

Listed by population tier — should be **load-balanced** against planned collection routes (see §7). Source: 2024 Census population estimates for PR municipios.

| Tier | Population | Municipios | Recommended drop-off density |
|---|---|---|---|
| **>200,000** | San Juan (320k), Bayamón (185k), Carolina (147k), Ponce (132k), Caguas (127k) | 5 | 3–5 bring centers + 2–4 RVMs each = 30–45 points |
| **80,000–200,000** | Guaynabo, Arecibo, Mayagüez, Toa Baja, Trujillo Alto, Vega Baja, Humacao, Guayama, Fajardo, Cayey | 10 | 2 bring centers + 1 RVM each = 30 points |
| **40,000–80,000** | ~22 municipios (Caguas metro fringe, Cabo Rojo, Hatillo, Manatí, San Germán, Yauco, Coamo, Aibonito, Cidra, etc.) | 22 | 1 bring center each = 22 points |
| **20,000–40,000** | ~30 municipios (interior and mountain) | 30 | 1 bring center or shared with adjacent municipio = 30 points |
| **<20,000** | Small mountain / island municipalities (Culebra, Vieques, Maricao, Las Marías, etc.) | 11 | 1 bring center each OR mobile collection day = 11 points |
| **TOTAL Phase 1** | | 78 | **~50–80 points** initially, scaling to 300+ |

**Special cases:**

- **Vieques + Culebra (island municipalities):** either barge service to Fajardo, or a small baler (5 t/d) on-island to reduce barge volume.
- **Mountain towns (Jayuya, Adjuntas, Las Marías):** long drive times from any central plant. Either mobile collection (1 truck-day/month per town) or designate a satellite baler.
- **Tourist zones:** beach RVMs (high-visibility, retail, resorts) — San Juan Condado, Isla Verde, Rincón, Aguadilla, Fajardo, Ponce cruise port. Higher per-unit CAPEX (vandalism-resistant enclosure) but high-volume.
- **Schools:** 1,200+ public schools in PR. School-based collection programs are the highest-leverage channel for cultural change and aluminum-beverage capture.

### 6.4 Site selection criteria for bring centers

1. **Accessibility:** 0.5 km from public transit; safe pedestrian access.
2. **Visibility:** main road or commercial area (precedent: Walmart, Plaza, church, school, recycling cooperative).
3. **Space:** minimum 200 m² paved lot, 2 container positions, lighting, signage.
4. **Flood / wind:** above 100-yr flood elevation, away from coastal surge, leeward of primary wind direction.
5. **Municipality partnership:** host municipality waives permitting, agrees to monthly visual inspection.
6. **Lockable container (chain-link + padlock):** reduces illegal dumping / scavenging.

---

## 7. Logistics & Collection

### 7.1 Fleet composition

| Vehicle | Use | Cost (new) | Capacity (cans) | Diesel L/100 km |
|---|---|---|---|---|
| **Roll-off truck (Mack Granite / Peterbilt 520)** | Bales from bring centers | $200–280k | 18–25 t | 50–65 |
| **Compactor truck (Mack LR / Heil)** | Curbside if combined with MSW | $250–350k | 12–18 t | 40–55 |
| **Stake-bed / flatbed (single-axle)** | Short-haul baled UBCs to plant | $80–120k | 5–8 t | 25–35 |
| **Pickup truck (Toyota Hilux / Ford Ranger)** | Quick collection from RVMs | $35–50k | 1–2 t | 12–18 |
| **Mobile baler trailer** | One-off events / remote towns | $80–150k (trailer + baler) | 5–10 t bales | n/a (towed) |

**Recommended fleet (medium plant):** 3× roll-off, 4× compactor (shared with MSW contractor under contract), 2× stake-bed, 2× pickup, 1× mobile baler. Total CAPEX: **$2.2–3.0 M**.

### 7.2 Route structure

PR's geography is a **2,000 km² rectangle ~170 km E-W × 60 km N-S**, with the **Cordillera Central** running E-W through the middle. Key logistics implications:

- **Mountain crossing cost:** any route crossing the central cordillera (e.g., Ponce to San Juan, Mayagüez to Caguas) adds 1.5–2× the driving time of a coastal route.
- **Coastal belt road (PR-2, PR-3, PR-52) is faster** but adds 30–60 km to many trips.
- **Interstate-grade (PR-22, PR-52, PR-66, PR-53):** good pavement, toll road ($2–6/trip each way).
- **Bottlenecks:** San Juan metro congestion, particularly Luis Muñoz Marín airport area and Caguas-to-San Juan commute. Recommendation: schedule off-peak runs (10:00–14:00).
- **Hurricane season (Jun–Nov):** real-time route replanning needed; FORTIFIED fleet and pre-positioned spares.

**Recommended hub-and-spoke model:**

- **Hub:** Central plant in Caguas or Bayamón (geographic centroid, port access, industrial zoning).
- **Spoke 1 (East):** Humacao, Fajardo, Vieques/Culebra (barge), Yabucoa.
- **Spoke 2 (West):** Mayagüez, Aguadilla, Rincón, Cabo Rojo.
- **Spoke 3 (South):** Ponce, Juana Díaz, Salinas, Guayama.
- **Spoke 4 (North):** Arecibo, Manatí, Vega Baja, Dorado.
- **Spoke 5 (Central):** Cayey, Cidra, Aibonito, Comerío, Barranquitas.

### 7.3 Cost per ton-km

Mainland U.S. comparable: **$0.10–0.20/ton-km** for full truckload (e.g., DAT rate benchmarks).

PR adjustments:

- **Fuel:** PR diesel ~$1.40–1.70/gal (mid-2024) vs. mainland U.S. ~$0.95–1.10/gal. **+30–60%** fuel component.
- **Toll:** $4–12/leg.
- **Driver wages:** PR truck drivers typically $14–18/hr loaded (vs. mainland $25–32/hr), **saving** ~30%.
- **Insurance:** PR commercial auto insurance 1.5–2× mainland.
- **Net effect:** PR full-truckload cost roughly **$0.15–0.25/ton-km** — about 30–50% higher than mainland U.S.

For a typical 50 km one-way leg (5 t load = 10 t round trip): **$150–250/leg = $30–50/ton** collection cost. Multiply by 1.3–1.5 for back-haul deadhead and route density losses → **$40–75/ton collection OPEX**, consistent with §3 OPEX line items.

### 7.4 Hub facility (transfer stations)

For long collection routes, a **transfer station** reduces cost per ton-km by consolidating local pick-ups into full truckloads to the central plant. Estimated cost: **$1.0–2.0 M** per transfer station (compactor, scales, lighting, fenced 1,000 m² lot). 2–3 transfer stations recommended for the medium plant scenario (East + West + South).

### 7.5 Labor cost notes

- Federal PR minimum wage: **$7.25/hr** (the federal floor still applies; PR has no higher statutory minimum).
- **Real manufacturing wages in PR:** 2024 BLS QCEW shows average manufacturing wage $18–22/hr, rising to $25–30/hr for skilled mechanical/maintenance.
- **Collection drivers:** $14–18/hr.
- **Furnace operators:** $20–28/hr (specialty skill; could be sourced from military veterans with metallurgy training, or from the existing Parguera cement-plant workforce).
- **Plant management:** $80–120k/year.
- **Loaded labor cost (with benefits, payroll tax, workers' comp):** add 35–45% to base wage.

### 7.6 Hurricane / business continuity

- **Pre-storm:** secure roll-off containers at municipal depots, top off diesel reserves, fuel trucks, withdraw all cash.
- **Storm response:** contract with national mobile-generator companies (Caterpillar Rental, United Rentals) for emergency generator deployment; pre-arrange mutual-aid agreements with Caribbean sister facilities.
- **Post-storm:** FEMA Public Assistance (Category B, emergency protective measures) and Category G (insurer recovery). PR has a 25% local-match waiver for declared disasters.
- **Damage vulnerability:** the plant's tilt-up concrete + steel frame is rated to 180 mph; baghouse and overhead crane are the most exposed equipment (recommend redundant systems).

---

## 8. Funding Sources

The capital stack is the single most important variable for IRR. A typical PR aluminum-recycling project should be **financed 40–60% with non-dilutive grants and tax credits, 25–40% with low-interest debt, and 10–25% with equity**. The §45X credit alone can pay for 30–40% of CAPEX (PV $10–35M).

### 8.1 Federal grants

| Program | Agency | Typical award | Match | PR suitability | Reference |
|---|---|---|---|---|---|
| **EPA Solid Waste Infrastructure for Recycling (SWIFR)** | EPA | $500k–$20M | 0% (free money) | Direct; PR is eligible as a territory | [epa.gov/rcra/solid-waste-infrastructure-recycling-grants-program](https://www.epa.gov/rcra/solid-waste-infrastructure-recycling-grants-program); round 2 had ~$1.07B requested |
| **FEMA Building Resilient Infrastructure and Communities (BRIC)** | FEMA | $1M–$50M | 25% non-federal share (waived in PR disaster declarations) | Direct; large CAPEX for FORTIFIED construction | [fema.gov/grants/mitigation/bric](https://www.fema.gov/grants/mitigation/building-resilient-infrastructure-communities) |
| **NOAA Marine Debris Program** | NOAA | $100k–$3M | 25% | Indirect (beverage-can marine debris); PR is a "coastal" priority | [oceandecade.org/actions/marine-debris-program](https://oceandecade.org/actions/marine-debris-program) |
| **HUD Community Development Block Grant (CDBG)** | HUD | $20k–$10M | varies by activity | Eligible; PR has a CDBG-DR allocation from disaster recovery | [hud.gov/program_offices/comm_planning/cdbg](https://www.hud.gov/program_offices/comm_planning/cdbg) |
| **USDA Rural Development (Business & Industry Guaranteed Loans)** | USDA | $250k–$25M | 25% equity typical | Eligible only for interior rural municipios with <50k population; limited | [rd.usda.gov/programs-services/business-programs/business-and-industry-loan-guarantees](https://www.rd.usda.gov/programs-services/business-programs/business-and-industry-loan-guarantees) |
| **EPA Brownfields Assessment / Cleanup** | EPA | $100k–$1M (assessment) | 0% | Use if site has prior industrial contamination | [epa.gov/brownfields](https://www.epa.gov/brownfields) |
| **DOE State Energy Program** | DOE | varies | 50% | Solar + battery integration | [energy.gov/scep/state-energy-program](https://www.energy.gov/scep/state-energy-program) |

### 8.2 Federal tax credits (Inflation Reduction Act)

- **IRC §45X Advanced Manufacturing Production Credit:** $0.58/kg for **secondary aluminum** (= $580/ton produced). **10-year credit** (2023–2032), with phase-down for components produced after 2029. **The single most important economic instrument in the project.** Final regs (Oct 2024, T.D. 10015) explicitly included secondary production from recycled material. Source: [federalregister.gov/d/2024-24826](https://www.federalregister.gov/documents/2024/10/28/2024-24826/advanced-manufacturing-investment-credit).
- **IRC §48 Investment Tax Credit:** 30% of CAPEX for qualifying energy property. Solar PV + battery storage on the plant would qualify. Requires prevailing wage + apprenticeship compliance (Davis-Bacon).
- **IRC §6418 Transferability:** Both §45X and §48 credits are **transferable** to an unrelated corporate buyer. The market for 2024 transferable credits priced at 88–95% of face value. A tax-equity partner (bank, insurer, or hyperscaler) provides a lump-sum payment in year 1.
- **IRC §30D / 45W (clean vehicle credit):** for the collection fleet if electric or hybrid.

### 8.3 Puerto Rico and territorial incentives

- **PRIDCO (Puerto Rico Industrial Development Company):** lease/buy industrial land at discounted rates; property tax abatement (Act 135-1997, 20-year exemption for manufacturing); Act 73-2008 (formerly 135) extends 4% corporate tax rate; **Act 60-2019** (formerly 20/20) for services export with 4% rate and 100% dividend exemption for bona fide export businesses. **Source: [pridco.com](https://pridco.com/incentives-and-taxes/).** These are accessible to recycling operations that can structure as a service export (selling ingot off-island).
- **Puerto Rico Energy Public Policy Act (Act 17-2019):** renewable-energy tax credits and net-metering up to 100% for industrial customers.
- **PROMESA Title V fiscal plan incentives:** recyclers may qualify for economic-development carve-outs.

### 8.4 Private capital

- **Closed Loop Partners (CLP):** NYC-based, $200M+ AUM, runs the **Closed Loop Infrastructure Fund** and **Catalyst Fund** alongside American Beverage. Has financed 65+ recycling projects. **Typical: 7–15 year, $5–25M, low single-digit interest.** Source: [closedlooppartners.com](https://closedlooppartners.com/).
- **American Beverage Association / Every Bottle Back initiative:** funding for recycling capacity additions; matched funding with CLP; examples: San Antonio GreenMRF (2022, ~$25M total).
- **Ball Corporation (CanCentral):** Sustainability grants up to $500k; supplies beverage cans and has a stake in the UBC supply chain.
- **Coca-Cola Foundations:** community recycling grants up to $250k per site; Latin America focus.
- **Patagonia, Keurig Dr Pepper, AB InBev SmartGoals:** corporate commitments to recycled-content packaging.
- **KKR Global Climate Infrastructure Fund, Brookfield Renewable, Generate Capital:** all have expressed interest in recycling-as-infrastructure deals with PPA-style cash flows.
- **PRI (Principles for Responsible Investment) signatories:** ~5,200 institutional investors representing $120T AUM; ESG mandate for circular economy.

### 8.5 Bond financing

- **PR Municipal Bonds (general obligation):** PR's GO bonds are still rated **Ba3 (Moody's) / BB (S&P)** post-PROMESA; cost ~7–8% all-in for long-dated debt. The PR Infrastructure Financing Authority (PRIFA) is the active issuer.
- **Build America Bonds (BABs):** federally-taxable municipal bonds with a 35% federal interest subsidy. Available for capital projects.
- **Bipartisan Infrastructure Law Recycling provisions:** included $350M for "recycling infrastructure" via EPA SWIFR. Direct appropriations.
- **CDFIs:** three PR-based CDFIs (Banco de Desarrollo Económico para PR, Cooperativa de Ahorro y Crédito, Foundation for PR) offer subordinated debt for community benefit projects.

### 8.6 Illustrative capital stack (medium 15,000 t/y)

| Source | % of $52M CAPEX | Amount | Cost (blended) |
|---|---|---|---|
| **EPA SWIFR grant** | 25% | $13 M | 0% |
| **FEMA BRIC (FORTIFIED construction portion)** | 10% | $5.2 M | 0% (PR 25% match waived) |
| **IRA §48 ITC (solar portion, transferred)** | 5% | $2.6 M | 0% (transferred at 90%) |
| **IRA §45X credit, transferred (10-year PV)** | 35% | $18.2 M | 0% (transferred at 90%) |
| **Closed-Loop Partners / American Beverage** | 15% | $7.8 M | 5% interest, 12-yr |
| **PR Municipal Bond (PROMESA-Auth-Approved)** | 8% | $4.2 M | 7% (tax-exempt) |
| **Sponsor equity** | 2% | $1.0 M | n/a (10–15% IRR target) |
| **TOTAL** | **100%** | **$52 M** | **~1.4% blended cost** |

This is the **single most important number in the project.** A 1.4% blended cost of capital is essentially free money; a 7% blended cost (no grants / no §45X) makes the project marginal at best. The grant strategy is the difference between viability and abandonment.

---

## 9. Phased Implementation

### 9.1 Phase 1 — Year 0–1: Feasibility, site selection, permits, design, financing

**Milestones:**

- M0–M2: **Engineering feasibility study** (this document is a starting point; commission a detailed FEED for $250–500k from a qualified A&E firm with PR experience — e.g., S&B Engineers, Burns & McDonnell, Black & Veatch, or a European firm with aluminum experience like Hydro, Tomra, or Hertwich's parent Constellium).
- M2–M4: **Site selection.** Issue RFPs to PRIDCO for 4–6 candidate sites; rank against logistics model (collection-route optimization, freight cost to port, hurricane exposure, labor pool).
- M3–M5: **Permit pre-application.** Engagement with **OGPe (Oficina de Gerencia de Permisos)** for a consolidated permit, **EQB** for air permit, **PRASA** for wastewater, **AAA** for stormwater. PR's permitting is consolidated but slow; plan **12+ months** for Title V air permit and 6–9 months for OGPe construction permit.
- M4–M8: **EPC contractor selection** — competitive bid among 3–5 firms. Lock in equipment orders for long-lead items (furnace, decoater).
- M6–M10: **Financing close.** Apply to SWIFR (cycle 3 expected 2025–2026), FEMA BRIC, PRIDCO incentives, §45X tax-equity partner. Coordinate with PR Treasury for any bond issuance.
- M9–M12: **Final engineering design** (60% → 90% → 100% drawing sets). Community engagement and host-municipality MOU.

**Phase 1 cost:** $2.5–4.0 M (pre-production, sunk whether or not project proceeds). Mostly recoverable if project proceeds.

### 9.2 Phase 2 — Year 1–3: Construction, equipment installation, commissioning, pilot

**Milestones:**

- M12–M15: **Site preparation, foundations, underground utilities** (8 months given PR weather and labor productivity ~70% of mainland).
- M15–M24: **Building construction** (12 months for a 3,500 m² process building + admin). Tilt-up concrete wall + structural steel roof, FORTIFIED-certified.
- M18–M30: **Equipment delivery and installation.** Furnace lead time: 12–18 months. Decoater: 8–12 months. Sow caster: 4–6 months. Build to begin during construction to compress schedule.
- M30–M33: **Commissioning and pilot.** First 30 days: cold commissioning (utility checks, no material). Next 30 days: hot commissioning with water/dummy load. Final 30 days: ramp to 30%, 60%, 90% capacity. Train operators concurrently (12–15 new FTE, sourced from PR engineering grads, military veterans, or mainland relocations).
- M33–M36: **Pilot run + commissioning.**

**Phase 2 cost:** $35–50 M of $52 M total. **Major risk: schedule slippage.** Furnace delivery delays are common (18–24 months is normal for a Hertwich URTF). Mitigation: order early, consider a used/rebuilt furnace for early capacity.

**Key permits to obtain:**

- **OGPe construction permit** (consolidated, ~9–12 months)
- **EQB air permit (Title V)** (~12–18 months for major source)
- **PRASA wastewater pre-treatment permit**
- **Plan de Mitigación (cultural / archaeological)** — required for any earth-moving in coastal or historic zones
- **AAA stormwater permit**
- **Endangered Species Act / Coastal Zone Management Act** — coordinate with DRNA

### 9.3 Phase 3 — Year 3–5: Full operation, expansion of drop-off network

**Milestones:**

- M36–M48: **Ramp to nameplate capacity.** Typical UBC plants take 6–12 months to reach design throughput. Refining casting, optimizing dross handling, building operational muscle memory.
- M42–M60: **Drop-off infrastructure roll-out.** 50 → 150 bring centers + 100 RVMs. School programs launched. Partnership with municipalities negotiated.
- M48–M60: **Policy advocacy.** Lobby for container-deposit law (PR Senate PS 369 and successors), EPR fees, or a "bottle-bill" parallel; advocacy is best led by a local non-profit partner (Basura Cero, Para la Naturaleza, Sierra Club PR chapter).
- M48–M60: **Operational optimization.** Dross sale, carbon-credit registration (Verra / Gold Standard), and ISO 14001 / 9001 / 45001 certification. Build export relationships (P1020A buyers, secondary Al consumers).

**Phase 3 cost:** $10–15 M (drop-off CAPEX) + OPEX funded by revenues.

### 9.4 Phase 4 — Year 5–10: Scale to capacity, secondary processing

**Milestones:**

- M60–M84: **Add second plant (medium scenario = 2 × 15k t/y)** in a second PRIDCO park. East vs. west or north vs. south of the cordillera for hurricane-resilience.
- M72–M96: **Consider secondary processing:**
  - **P1020A DC casting** (Wagstaff line, $10–14M) for direct can-sheet billet; target existing can plants (Ball Corporation, Crown Holdings) in the Caribbean basin.
  - **Continuous sheet casting** (Hazelett twin-belt or Blackman) — high CAPEX ($25–40M) but enables direct conversion to can-sheet for export.
  - **Aluminum extrusion billet** — for local construction (window/door frames), automotive aftermarkets.
- M84–M120: **Caribbean basin export operations.** San Juan port → Mobile, Tampa, Cartagena, Santo Domingo. Explore a **PR–Dominican Republic bilateral recycling agreement** to take advantage of both countries' container-deposit policies.

**Phase 4 cost:** $40–100 M (subject to scenario).

### 9.5 Gantt summary

| Year | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| Feasibility / financing | ████ | | | | | | | | | |
| Permits | ███ | | | | | | | | | |
| Construction | | ████ | | | | | | | | |
| Commissioning | | | ██ | | | | | | | |
| Ramp-up | | | | ██ | | | | | | |
| Drop-off rollout | | | | ██ | ██ | ██ | | | | |
| 2nd plant | | | | | | ████ | | | | |
| Secondary processing | | | | | | | | ████ | | |
| Caribbean export | | | | | | | | | ██ | ██ |

### 9.6 Critical-path risks (ranked)

1. **Furnace delivery (12–24 month lead time):** order at M6, accept "white-glove" expedited delivery, or buy used.
2. **EQB air permit (12–18 months):** pre-application engagement; commit to RTO + baghouse to pre-empt objections.
3. **§45X / §48 transferability close:** needs a sophisticated tax-equity counterparty; engage 18+ months before operations.
4. **Hurricane:** the project must budget for at least one major storm in years 1–10. Maria (2017) caused $40–85B in insured losses; a 2017-storm hitting a recycling plant would have caused $5–20M in damage.
5. **LME price collapse:** a 30% LME drop extends payback to 8+ years. Mitigation: long-term offtake contracts (ballast against spot price) or use derivative hedges.
6. **Labor:** PR has 7.5% unemployment (Q1 2026) and manufacturing is competing with the post-Maria construction boom for skilled labor. Workforce-development MOU with UPR-Mayagüez, UPR-Bayamón, and Inter American University engineering programs.
7. **Tariffs and trade policy:** secondary aluminum is generally exempt from Section 232 (10% on primary Al) but is subject to anti-dumping scrutiny in some markets. Track CBP rulings.

---

## 10. Sources & Caveats

### 10.1 Primary references

- US Census Bureau QuickFacts — Puerto Rico population and demographic data.
- US EPA — Solid Waste Infrastructure for Recycling (SWIFR) grant program documents.
- US EPA — 40 CFR Part 63 Subpart RRR (NESHAP for Secondary Aluminum).
- EU JRC — Best Available Techniques Reference Document (BREF) for the Non-Ferrous Metals Industries, 2017.
- Puerto Rico EQB — Regulation No. 5300 (Atmospheric Pollution), Regulation No. 4365 (Solid Waste).
- FEMA — Building Resilient Infrastructure and Communities (BRIC) program guidance FY24/FY25.
- DevBuilders — 2026 Construction Costs in Puerto Rico, hurricane preparedness guides.
- Hertwich (Constellium group) — URTF product literature, ALUREC salt-free process specs.
- StrikoWestofen — product literature, WSF series melting/holding furnaces.
- Wagstaff Inc. — DC casting machinery catalogs.
- TOMRA / Envipco — RVM product literature.
- IRA §45X Final Regulations, T.D. 10015, Oct 2024.
- LUMA Energy / Genera PR — published tariff filings and rate cases.
- American Bureau of Shipping, ISO 14001/9001/45001 standards.
- Argus Media, ScrapMonster — UBC scrap price benchmarks.
- BottleBill.org — PR bottle-bill history and pending legislation.
- Closed Loop Partners / American Beverage Association — public deal announcements.
- Internal Revenue Service — Form 7200, §45X / §48 / §6418 guidance.

### 10.2 Caveats and known unknowns

1. **CAPEX accuracy:** budget-grade estimates have ±25% variance; cost-engineering studies (AACE Class 3) reduce to ±15%; Class 2 to ±10%. Recommend a Class 3 study before committing capital.
2. **LME volatility:** aluminum spot has ranged $1,800–$3,500/t in the last 3 years. Plan sensitivity at $1,800, $2,500, $3,200.
3. **§45X eligibility for UBC-to-sow:** tax counsel must confirm "substantial transformation" of UBC into cast sow qualifies for the secondary Al rate. IRS guidance is evolving.
4. **Tip-fee monetization:** a definitive agreement with the host landfill or municipality is required; PR's landfill privatization is in flux.
5. **Construction-cost escalation:** PR construction inflation has been 4–7% annually post-Maria; budget Q4 2026 costs but plan for 2027–2028 construction with a 15–20% escalation factor.
6. **Permit timing:** PR's permitting is improving post-PROMESA but remains a 9–18 month exercise for industrial projects. **Build schedule slack.**
7. **Hurricane risk:** PR has a ~30% probability of a direct or near-direct Cat 3+ hit in any given 5-year window. Insure, harden, and diversify.
8. **Workforce:** PR's manufacturing workforce has shrunk ~30% since 2006. Workforce-development partnerships with UPR, IAU, and the PR Department of Labor are essential; budget 6–12 months for hiring and training.
9. **Carbon-credit verification:** voluntary markets are consolidating under ICVCM / SBTi; ensure methodology is VCS-approved at the time of registration.
10. **Data limitation:** the tonnage calculation assumes 280 cans/person/year; PR-specific data is limited. **A formal PR beverage-container characterization study** (3–6 months, $50–150k) would refine this number ±15%.

### 10.3 Recommended next steps (30 / 60 / 90 days)

- **30 days:** commission a confidential preliminary market study to size actual PR UBC generation via bottler data (CC1 / Coca-Cola, Pepsi, AB InBev, Diageo, Bombillas, Vinos). Validate can-mass assumptions.
- **60 days:** issue PRIDCO RFP for 4–6 candidate sites; short-list 2; preliminary geotech and FEMA flood-zone review.
- **90 days:** submit NOI to EQB for air permit pre-application; engage with a tax-equity advisor on §45X monetization structure; identify a recycled-content offtake partner (Ball, Crown, Constellium, Norsk Hydro, Granges, real alloy) to anchor the revenue side.

---

*End of report.*

*Word count: ~5,700 words.*
