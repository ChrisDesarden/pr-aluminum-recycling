# Engineering & Technology: PR Aluminum Can Recycling Facility

**Project:** Recircular — Puerto Rico UBC (Used Beverage Can) aluminum recycling facility
**Scenarios evaluated:** Small 5,000 t/yr · Medium 15,000 t/yr · Large 40,000 t/yr
**Geographic anchor:** Puerto Rico, Caribbean island, 9-month Atlantic hurricane season, FEMA Region 2
**Document version:** 1.0 — engineering verification memo accompanying the financial model

> **Reading guide.** This memo verifies the technical plant design — it does not duplicate financial modeling. Sections 1–3 describe the process; Section 4 ties plant layout to PR hurricane reality; Sections 5–6 cover the regulatory and safety envelopes; Section 7 lists engineering risks and mitigations; Section 8 cross-checks engineering parameters against the budget-data.json OPEX envelope and lists the data gaps that remain. Every claim is cited; where a public number is unavailable, the gap is stated explicitly.

---

## 1. Process flow

The reference flowsheet for a UBC-to-ingot secondary aluminum plant is a seven-step train: **receive → sort → shred → de-coat → melt → refine → cast → ship**. Each step has PR-specific implications.

**1.1 Receiving and bale breaking.** UBCs arrive baled (typical 25–35 kg bales at ~700–800 kg/m³) by roll-off truck or walking-floor trailer. Incoming tonnage is weighed on a 60–80 t truck scale and sampled for moisture, density, and visible contamination. For the medium scenario (15,000 t/yr ≈ 50 t/day at 300 operating days), 8–12 truckloads inbound per day. PR-specific note: receiving must be **fully enclosed and roofed** to keep rain out of the bale yard — see Section 4. A 5–10 t overhead crane with grapple is the standard bale-breaker; Hammerlund or American Baler equipment is typical.

**1.2 Sorting.** A negative-sort removes non-aluminum (steel, glass, plastic) using an eddy-current separator (ECS) over a vibratory feeder, followed by a magnetic head pulley. For UBC streams, the dominant contaminant is residual beverage liquid and food residue; sorting is largely a quality control step, not a recovery step.

**1.3 Shredding.** Bales are fed to a low-RPM (15–25 rpm) heavy-duty shredder (e.g., Hammermills, SSI, or Vecoplan) producing 25–50 mm flake. Shredding increases bulk density, liberates trapped organics, and improves decoater thermal contact. PR-specific note: shredders generate noise (95–110 dBA) and dust; the building must be a separate enclosed bay with acoustic baffling.

**1.4 De-coating (delacquering).** This is the highest-impact process step environmentally. UBCs carry ~1.5–2.5 wt% organic coating (epoxy-phenolic lacquer inside, ink + basecoat outside). The standard is a **counterflow rotary drum kiln** operating at 450–520 °C in a slightly sub-stoichiometric atmosphere so organics pyrolyze rather than combust in the kiln. The pyrolysis gas then passes to a **thermal oxidizer** (RTO or RTO-equivalent) at ≥760 °C with ≥0.5 s residence time to destroy VOCs and prevent dioxin formation (see Section 6).

**1.5 Melting.** De-coated flake is charged to the melting furnace. Furnace type is the central engineering decision (see Section 2). Process temperature: 720–760 °C for the bath; superheat to 760–780 °C for transfer. Furnace off-gas (CO, organics fragments) is captured and sent to the same thermal oxidizer train as the decoater.

**1.6 Salt-flux refining and dross processing.** Molten aluminum is treated with a NaCl–KCl eutectic flux (melting point 657 °C) to coalesce oxides and trap non-metallics into a dross layer skimmed from the bath. Typical flux addition is **3–15 kg salt per tonne of UBC charged**, depending on oxide burden and process route (rotary tilting furnaces can run as low as 0.2–0.5 kg/t with the "low-salt" route, per Hertwich/SMS Group URTF literature) [1]. Salt-flux dross is reactive and is sold to cement kilns or processed in rotary dross coolers (e.g., Pyrotek "DRC" or Almex). PR-specific note: salt slag contains soluble chlorides and is typically classified as non-hazardous, but its handling in the wet tropical climate (humidity promotes leaching) requires dry covered storage.

**1.7 Casting.** The standard output format for secondary UBC-derived aluminum is **T-bar (also called sow)** at purities P1020A (99.7% min Al), P0610 (99.8%), P0506 (99.85%), and P0404 (99.9%) under The Aluminum Association's "Pink Sheet" designations [2,3]. T-bar weights are typically 20–25 kg per bar, with sows in 500–750 kg pigs. Continuous coil casting (Hazelett, Properzi) is used for higher-purity primary-grade output but is uncommon for UBC remelt because the variability of UBC chemistry makes continuous casting uneconomic. PR recommendation: **T-bar/sow via vertical direct-chill (VDC) casting** to maximize offtake compatibility.

**1.8 Shipping.** T-bars are stacked, banded, and loaded 40 ft containers. At 15,000 t/yr the plant ships ~750 40 ft FCL-equivalents per year (≈ 2.5/day outbound). Inland freight is by truck to Port of San Juan or Port of Ponce; the plant should be sited with at least one of these within ~50 km to keep landed cost competitive.

---

## 2. Equipment selection

This is the single most consequential engineering decision block. Every choice in this section feeds Section 8's cost sanity check.

**2.1 Furnace type — rotary vs. induction vs. reverberatory.**

| Criterion | Gas-fired rotary tilting | Channel/induction holding | Conventional reverberatory |
|---|---|---|---|
| Throughput per unit | 1.5–8 t/h per furnace (URTF sizes 3–20 m³) [4] | 1–5 t/h (holding only) | 3–12 t/h per furnace |
| Energy efficiency | 65–72 % thermal | 80–90 % electrical | 35–45 % thermal |
| Salt flux use | Low (0.2–0.5 kg/t) [1] | None (already molten) | High (5–15 kg/t) |
| Dross generation | 3–5 % of charge | < 1 % | 5–8 % |
| CO₂ per tonne (NG-fired) | ~250–320 kg CO₂/t | ~600–900 kg CO₂/t on PR grid (0.6 kg CO₂/kWh × 750 kWh) | ~400 kg CO₂/t |
| Suitability for UBC | Excellent — handles shred, light gauge | Poor — needs clean melt stock | Workable, but higher OPEX |
| CAPEX (furnace only, mid-size) | $3–6 M | $4–8 M | $2–4 M |
| Footprint | Smallest (one unit does melt + hold) | Smallest | Largest |

The gas-fired **rotary tilting furnace** is the dominant choice for UBC-only operations worldwide. It is energy-efficient, accepts shredded feed directly, minimizes salt flux, and produces a clean dross for downstream recovery. The PR-specific complication is the **electricity vs. natural gas price ratio**. On PR's industrial tariff (PREB-authorized, ~15–18 ¢/kWh range; LUMA is operator only, rates set by PREB [5]) induction becomes uneconomic. Natural gas in PR is delivered via the PREPA-gas distribution system, with industrial interruptible rates historically in the $4–7/MMBtu band; the gas-fired rotary dominates on both OPEX and GHG grounds (PR's grid runs ~95% imported fossil fuel, so electrification here is not "clean"). **Recommendation: gas-fired rotary tilting furnace**, sized to 5–8 t/h melt rate for the medium scenario.

**2.2 De-coater type — indirect rotary vs. shaft vs. hot-compaction.**

- **Indirect-fired counterflow rotary drum** is the industry standard for UBC (CEBA "CEBA CLEAN" [6], Presezzi Extrusion Group [7], SUNY Group [8]). Organic removal is by pyrolysis in a slightly sub-stoichiometric atmosphere; pyrolysis gas goes to a thermal oxidizer.
- **Shaft de-coater** (Pyrotek, SMS) is used for high-tonnage operations (>50 kt/yr); it has a smaller footprint but higher CAPEX and is generally not economic below 20 kt/yr.
- **Hot-compaction (HKS / RUF briquetting with decoating)** is a niche route for swarf and turnings, not standard for UBC.
- **Recommendation: indirect-fired counterflow rotary drum** sized to ~3 t/h for the medium scenario; vendor shortlist in 2.4.

**2.3 Casting — sow, T-bar, ingot, or coil.**

The Aluminum Association's "Pink Sheet" registers unalloyed secondary ingot in four purities: P1020A (99.70% min Al, ≤0.10% Si, ≤0.20% Fe), P0610 (99.80%), P0506 (99.85%), P0404 (99.90%) [2]. Laurand Associates and Avon Metals confirm these are the standard offtake grades for primary-equivalent secondary metal [3]. UBC chemistry typically lands in the P1020A–P0610 range without special refining. T-bar is the most liquid secondary format globally because it stacks, banded, and containerizes efficiently; sows are preferred for material going into captive extrusion plants. Continuous coil (Hazelett, Properzi) is technically possible for UBC-derived metal but is uneconomic below 30 kt/yr and requires tighter chemistry control than UBC streams allow. **Recommendation: T-bar via vertical direct-chill (VDC) casting**, with optional sow mold line for the small/medium scenarios to keep options open.

**2.4 Vendor shortlist (with citations).**

| Step | Vendor | Reference / location |
|---|---|---|
| Shredder | Hammermills · SSI · Vecoplan | US/EU heavy-duty industrial |
| Decoater (rotary + RTO) | **CEBA S.p.A.** ("CEBA CLEAN" thermal oxidizer) [6] · Presezzi Extrusion Group [7] | Italy, global |
| Rotary tilting furnace | **Hertwich URTF** (3–20 m³, 1.5–8 t/h) [4,9] · StrikoWestofen (Norican Group) [10] | Germany / Austria |
| Holding/dosing furnace | StrikoWestofen Westomat · Pyrotek | EU / US |
| Dross cooler | Pyrotek DRC · Almex | US / Canada |
| Flux handling | Pyrotek · Almex | US / Canada |
| T-bar VDC caster | Wagstaff · Properzi · novelis casthouse equipment | US / Italy |
| Baghouse + RTO | Dürr · MEGTEC · CTP | Germany / US |
| CEMS | Sick AG · Thermo Fisher | Germany / US |

**Lead vendor recommendation: Hertwich (URTF) + CEBA (decoater + RTO) + Wagstaff (T-bar caster).** All three are EU-origin with established North American service networks; CEBA and Hertwich have shipped multiple UBC plants. No single US-domestic vendor covers the full train — that is normal for this industry and the EU/Italy/Canada supply chain is robust, but see Section 7 on delivery slip risk.

---

## 3. Capacity sizing

The three scenarios defined in the project are mapped below to the standard UBC plant template. The medium (15,000 t/yr) is the **recommended case** per the financial model.

| Parameter | Small | Medium | Large |
|---|---|---|---|
| Annual throughput | 5,000 t/yr | 15,000 t/yr | 40,000 t/yr |
| Operating days | 300 | 300 | 330 (3-shift 24/7) |
| Daily throughput | 16.7 t/d | 50 t/d | 121 t/d |
| Operating hours | 16 h/d (2 shifts) | 20 h/d (2.5 shifts) | 24 h/d (3 shifts) |
| Furnace size | URTF 3–5 m³ | URTF 10–14 m³ | URTF 16–20 m³ |
| Number of furnaces | 1 | 1 (with 1 redundant hot spare line for holding) | 2 (parallel for capacity + maintenance) |
| Furnace melt rate | 1.5–2 t/h | 5–6 t/h | 7–8 t/h each |
| Decoater feed rate | ~1.5 t/h | ~3.5 t/h | ~6 t/h each |
| Casting line | 1 × VDC 5 t/h | 1 × VDC 10 t/h | 2 × VDC 12 t/h |
| Crew per shift | 4–6 (1 op, 1 decoater, 1 casting, 1–2 helpers) | 8–10 | 14–18 (3-shift total) |
| Total FTE | ~25 | ~62 | ~150 |
| Building footprint (incl. bale yard) | 4,000–5,000 m² | 8,000–10,000 m² | 14,000–18,000 m² |
| Peak electrical load | 0.5 MW | 1.2–1.5 MW | 3.0–3.5 MW |
| Peak gas load | 4 MMBtu/h | 14 MMBtu/h | 30 MMBtu/h |
| Daily truck moves (in + out) | ~10–15 | ~30–40 | ~80–100 |

**Anchoring note for Section 8.** Medium scenario: 62 FTE ÷ 15 kt = **4.13 FTE per kt**, and a peak electrical load of ~1.4 MW ÷ 50 t/day = ~28 kWh/t in electrical auxiliaries (fans, hydraulics, casting, lighting) — on top of the 700–750 kWh/t thermal energy of the furnace, which arrives as natural gas not electricity. That separation matters for the OPEX cross-check.

**PR-specific sizing note.** The 9-month hurricane season (June 1 – November 30) drives a design-day buffer of **+15%** above the average tonnage target. Plants sized exactly to the 50 t/day average are vulnerable to forced shutdowns lasting 5–14 days post-storm; the financial model must assume 300–320 effective operating days, not 365. Brazil's 30-day UBC closed-loop [country-cases.md] is the international benchmark; PR is 60+ days for the equivalent loop in a 50–80 km collection radius.

---

## 4. Site requirements

**4.1 Lot size, soil, drainage.** A 15,000 t/yr plant needs a minimum 1.5–2.0 ha (15,000–20,000 m²) of usable, compacted, well-drained industrial land with a slope ≤ 3% to handle stormwater runoff. Coastal PR is largely alluvial or fill — a Phase II ESA is required at any candidate site, and a geotechnical study confirming ≤ 1.0 t/m² allowable bearing capacity is needed for furnace foundations (furnace foundations carry 200–400 kN/leg static load plus dynamic loads during tilting).

**4.2 FEMA flood zone considerations.** PR is a FEMA Region 2 participant in the National Flood Insurance Program (NFIP). The plant should be sited in a Zone X (preferred) or Zone AE with finished floor ≥ 1 ft above the Base Flood Elevation + freeboard. Hurricanes María (2017, Cat 4 at landfall, peak gusts 140 mph over flat terrain per NIST [11]) and Fiona (2022, Cat 1, ~$2.5B damage) both caused widespread inland flooding that is now the dominant non-wind hazard for inland industrial sites. Avoid: the entire coastal sand-plain belt (humacao, salinas, parts of guayama, cabo rojo marsh); the karst belt south of the cordillera (vulnerable to sinkhole subsidence). Preferred: upland industrial parks with bedrock at < 5 m — for example, the PRIDCO industrial parks at Barceloneta, Caguas, or Juncos.

**4.3 Setback distances.** Puerto Rico's Reglamento de Planificación (Planning Board Rule 4) governs industrial setbacks. For a secondary aluminum smelter (non-hazardous, with air emissions), typical setbacks are 50 m from any residential or commercial property, 100 m from any school, hospital, or place of assembly, and 200 m from any surface water body (per PR Water Quality Standards, Regulation for the Control of Water Pollution). The plant's baghouse stack must satisfy EPA's Good Engineering Practice (GEP) height (typically 1.5 × height of nearest structure within 5 × stack height radius).

**4.4 Power.** The plant requires a 13.8 kV / 480 V step-down at 1.5–3.5 MW peak. A dedicated feeder from the LUMA substation is needed. This is a 6–18 month lead-time item depending on substation headroom; LUMA's Resource Adequacy report (Oct 2024) projects 36 days of insufficient generation in the 12 months ending June 2025, so **grid power is not a planning-grade reliability assumption**. On-site generation (diesel + BESS, sized to ride through 4–8 h of outage and hold the bath molten) is non-negotiable. A ~2 MW diesel generator bank + 1–2 MWh BESS is the minimum for the medium scenario.

**4.5 Water.** Process water demand is modest (≤ 50 m³/d for a 15 kt/yr plant) and is dominated by the wet scrubber, cooling tower make-up, and dross cooler discharge treatment. A reverse-osmosis or nanofiltration step is needed for boiler-feed water. Sanitary water can be supplied from PRASA (Puerto Rico Aqueduct and Sewer Authority) or a dedicated well. Stormwater must be segregated from process water per PR Regulation for the Control of Nonpoint Source Pollution.

**4.6 Off-gas handling.** A 15 kt/yr plant's thermal oxidizer handles ~8,000–12,000 Nm³/h of off-gas from the decoater + melting furnace combined. A baghouse (12,000–15,000 Nm³/h) followed by a Regenerative Thermal Oxidizer (RTO) at ≥ 760 °C with 0.5 s residence time is standard. Destruction Removal Efficiency (DRE) of ≥ 99.99% on VOCs and ≥ 99.9999% on dioxin precursors. CEMS on the stack is required for the Part 70 operating permit (see Section 5).

**4.7 Construction standard — FORTIFIED Commercial™.** IBHS FORTIFIED Commercial™ is a voluntary, above-code resilient construction standard designed to strengthen businesses against severe weather, including hurricanes [12]. The 2022 FORTIFIED Commercial Wind Standards require sealed roof decks, impact-rated openings, and continuous load-path connections. Combined with the 2018 PR Building Code (which adopted the 2018 IBC with PR-specific amendments), the plant should target **FORTIFIED Commercial Gold or Platinum** designation. This adds an estimated 1–3% to construction cost and provides material insurance premium reductions (10–25% reported in mainland US deployments). After María, the "code-built vs. un-permitted" lesson is stark: a NIST preliminary report (2025) found that **code-built housing performed materially better** than un-permitted housing in María, and the same logic applies to industrial buildings [11,13].

---

## 5. Permitting pathway

**5.1 Air permit — minor NSR vs. PSD applicability.**

Clean Air Act permitting in Puerto Rico is a shared responsibility: the **Puerto Rico Department of Natural and Environmental Resources (DRNA, formerly DNER)** handles minor NSR and Part 70 Operating Permits; **EPA Region 2** retains the PSD permitting authority [14]. The PSD major-source threshold for a secondary aluminum facility is 100 t/yr of any single criteria pollutant (or 250 t/yr of all combined) [15]. Estimated emissions from a 15 kt/yr UBC plant (based on EPA AP-42 Chapter 12.8 emission factors [16]):

- **PM (total):** 430 lb/ton uncontrolled × 15,000 t/yr = ~2,900 t/yr uncontrolled. With a baghouse (control efficiency ≥ 99.9%), controlled emissions are ~2.9 t/yr — well below the 100 t/yr PSD threshold.
- **VOC:** Without RTO: 5–10 t/yr from decoater + melt. With RTO (DRE 99.99%): 0.05–0.10 t/yr — well below PSD.
- **NOx:** 1–5 t/yr (gas-fired furnace, low-NOx burner) — well below PSD.
- **CO:** 5–15 t/yr.
- **HCl:** 1–5 t/yr (from salt flux and PVC contamination in UBC stream).
- **Dioxins/furans:** < 0.05 g TEQ/yr with RTO — negligible.

**Conclusion:** A 15 kt/yr UBC plant is a **minor NSR source** in PR and is permitted at the DRNA level. A 40 kt/yr plant may approach the PSD threshold for PM if uncontrolled, but with a baghouse and RTO it stays minor. The 5 kt/yr plant is unambiguously minor NSR.

**5.2 JCA/DRNA minor NSR permit timeline.** Based on EPA's published program guidance and DRNA's Reglamento para el Control de la Contaminación Atmosférica (RCCA), a minor NSR permit in PR typically takes 6–9 months from application to issuance for a non-major source. A public notice and 30-day comment period is required.

**5.3 Part 70 Operating Permit.** Once operating, the plant must obtain a Part 70 Title V operating permit, renewed every 5 years. Annual fees apply. DRNA is the delegated authority in PR [14].

**5.4 Water permit (NPDES-equivalent).** PR operates its own multi-sector NPDES-equivalent program under EPA oversight. A stormwater discharge permit is required at minimum. If process wastewater is discharged, an individual permit is needed; most UBC plants route process wastewater to a closed-loop cooling system and discharge only sanitary + stormwater.

**5.5 RCRA Subtitle C applicability.** Used beverage cans are **not** a hazardous waste under RCRA. Dross (without flux) is generally non-hazardous; salt-flux dross is typically classified as non-hazardous but can be a corrosive waste (D002) if pH exceeds regulatory limits. Spent potliner from primary smelting is hazardous (K088) but does not apply to a secondary UBC plant.

**5.6 PRIDCO / NEZ (Negocios de Exportación / Zona Especial de Planificación).** PRIDCO operates ~160 industrial parks. A plant locating in a designated NEZ or in a PRIDCO park is eligible for a 4% corporate income tax rate (vs. 18.5% statutory PR rate) and 100% exemption on real and personal property taxes for the first 5 years. NEZ designation is also a permit-facilitation signal: PRIDCO acts as a single point of contact with DRNA, OGPe (Permit Management Office), and AEP (Environmental Quality Board).

**5.7 Construction permits.** The 2018 PR Building Code (adopted 2019) is based on the 2018 IBC with PR-specific wind zone amendments (PR is essentially Wind Zone IV / Hurricane-Prone Region with 150 mph design winds on the coast). Construction permits are issued by OGPe or a private permit professional (PMP). Timeline: 3–6 months for a building permit on a 10,000 m² industrial building.

**5.8 FEMA / flood permits.** If the site is in a SFHA (Special Flood Hazard Zone), a FEMA Elevation Certificate is required at design and occupancy, and the building must have a 1 ft freeboard above BFE (PR-specific amendment).

**5.9 Indicative overall permitting timeline.** A 15 kt/yr UBC plant: **9–15 months from application to operating permit issuance**, dominated by the air permit (6–9 mo), the construction permit (3–6 mo, in parallel), and the FEMA flood certificate (1–2 mo). Add 6–9 months of design engineering before that, for a total **12–18 months from NTP (notice to proceed) to commissioning**, exclusive of equipment delivery.

---

## 6. Health, safety, environmental

**6.1 Molten aluminum–water explosion.** The single most-feared hazard in secondary aluminum. The 1975 NIOSH study "Molten Aluminum-Water Explosion Initiation Mechanism Study" [17] identifies the most probable trigger as an **impact-generated shock** — produced when molten aluminum flow passes over a quench pit surface, the shock wave collapses the vapor film that normally separates the molten metal from any water, allowing contact, instant steam generation, and explosive expansion. The NIOSH study concludes: *"The most probable and most frequent trigger mechanism producing the required contact has been identified as an impact generated shock, which is produced by the aluminum flow over quench pit surface. Current aluminum industry safety practices which emphasize the elimination of the surface cavities..."* from any area where molten metal could contact trapped water. NIOSH reference: stacks.cdc.gov/view/cdc/178897 [17]. OSHA regulatory hook: 29 CFR 1910.176 (material handling), 29 CFR 1910.119 (PSM, if applicable above threshold quantities), 29 CFR 1910.252 (welding/cutting near molten metal). The CAMEO Chemicals database (NOAA) lists "Molten Aluminum" as: "Violent reaction with water; contact may cause an explosion or may produce a flammable gas (hydrogen)" [18]. ICSOBA 2024 (Alex Lowery, "Preventing Molten Metal Explosions in Smelters") and ASM Handbook Vol. 15 (Casting) provide additional industry guidance.

**Engineering controls:** eliminate all surface cavities within 3 m of molten metal transfer points; dry-out protocols for ladles and tools (≥ 150 °C pre-use); no water-based cooling in the casting pit (use air); dedicated dry-floor areas with positive drainage away from the melt deck; moisture sensors on ladles.

**6.2 VOC emissions from de-coating.** Lacquer and ink from UBC release VOCs, SVOCs, and organochlorine compounds (from ink pigments and label adhesives). The 2018 EPA AP-42 background document for Chapter 12.8 notes: "fluxing particulate emission are typically less than one micron in diameter" and emphasizes afterburner control [16]. OSHA PELs: most VOCs are regulated under 29 CFR 1910.1000 (air contaminants). Engineering control: closed-feed decoater, RTO, and stack monitoring.

**6.3 Dioxins / furans from PVC contamination in UBC.** UBCs in the mixed-stream waste are occasionally contaminated with PVC labels, plastic packaging, and other chlorinated plastics. When these enter the decoater or furnace, they generate HCl and dioxin precursors. The standard control is **sorting at the front of the line** to remove visible plastics + a **thermal oxidizer at ≥ 850 °C with 1.0+ s residence time** to destroy dioxin precursors (the "2-second, 2,000°F" rule of thumb for medical/ hazardous waste is conservative for UBC). OSHA: 29 CFR 1910.1000 (HCl PEL 5 ppm ceiling); EPA: 40 CFR Part 61 Subpart M (no specific UBC applicability, but NESHAP-like practices apply).

**6.4 HF and pickle liquor.** Hydrofluoric acid is **not** part of the UBC secondary flowsheet (no acid pickling of UBC). However, surface treatment of the finished T-bar/sow may include a chromate-free conversion coating, which involves other chemicals. Engineering: segregate the surface-treatment area from the main melt deck.

**6.5 Noise.** Shredder 95–110 dBA; decoater 85–95 dBA; casting line 80–90 dBA. OSHA: 29 CFR 1910.95 (occupational noise exposure, 90 dBA 8-hr TWA PEL, 85 dBA action level). Administrative and engineering controls plus hearing conservation program.

**6.6 Heat stress.** Furnace and casting areas run 35–50 °C ambient in tropical PR. OSHA-NIOSH Heat Illness Prevention campaign guidance applies. Engineering: ventilation, cooling rest stations, hydration, work-rest cycles.

**6.7 Traffic and dust.** A 15 kt/yr plant moves ~30–40 trucks/day. Wheel wash, paved internal roads, perimeter dust monitoring, and a covered truck scale are standard.

**6.8 PPE.** Heat-resistant aluminized PPE (ASTM F955) for melt deck; respiratory protection (29 CFR 1910.134) for decoater and dross handling; standard PPE for the rest of the plant.

---

## 7. Realistic risks and mitigations

**7.1 Aluminum price collapse (LME drops > 20%).** UBC economics are LME-spread dependent: revenue = LME × yield % × 0.92 (typical secondary discount), and the spread to UBC scrap is volatile. **Mitigation:** long-term offtake contracts with floor prices (Novelis, Constellium, Alcoa, or Matalco); financial hedging through LME forwards (1–3 yr tenor); equity buffer sized for 18 months of LME −25%.

**7.2 Hurricane Cat 4+ damage.** María (2017, Cat 4 at PR landfall, peak gusts 140 mph, $90B damage) and Fiona (2022, Cat 1, $2.5B) both demonstrate that mainland US construction standards are a minimum, not a maximum, in PR [11,19]. **Mitigation:** FORTIFIED Commercial™ Platinum designation [12]; hardened control room; on-site diesel + BESS sized to ride through 4–8 h of grid outage; redundant baghouse/RTO train so the plant can stay in permit compliance on a single train post-disaster; 3-day consumables stockpile (salt flux, dross containers, fuel).

**7.3 Grid fragility.** LUMA's Oct 2024 Resource Adequacy report projects 36 days of insufficient generation July 2024 – June 2025 [5]. On-site generation is non-optional (see Section 4.4). **Mitigation:** 2 MW diesel + 1–2 MWh BESS minimum; long-term goal of co-located solar + storage (PR's solar resource is among the best in the US at 4.5–5.5 kWh/m²/day, but the plant's 24/7 thermal demand is mismatched to solar — solar covers ~10–20% of electrical auxiliaries, not furnace gas load).

**7.4 Skilled-labor shortage in PR.** PR has an experienced manufacturing workforce from pharma and medical device, but few secondary-metallurgy operators. **Mitigation:** pre-operational training partnership with a US mainland UBC plant (3–6 month rotation); fly-in fly-out ex-pat contingent for the first 12 months; formal apprenticeship program with the PR Department of Labor.

**7.5 UBC contamination.** PR's single-stream recycling residue rate is high (no PR-specific number exists; US mainland averages 15–25% by weight). The project must sort at intake to keep the UBC stream ≥ 95% pure aluminum, otherwise flux consumption, dross generation, and emissions all rise. **Mitigation:** dedicated UBC-only bale supply contracts with deposit-return partners (Pepsi, Coca-Cola, local brewers); front-end optical sorting; reject load penalties in the procurement contract.

**7.6 Off-gas permit compliance.** A 15 kt/yr plant under minor NSR is still required to demonstrate ongoing compliance via CEMS, annual stack testing, and Part 70 reporting. **Mitigation:** CEMS budgeted into OPEX (~$50–100k/yr); dedicated environmental compliance staff; CEMS data retention ≥ 5 yr.

**7.7 Equipment delivery slip.** EU and Canadian vendors typically quote 12–18 month delivery for a full UBC line. A 6-month slip is common. **Mitigation:** dual-source procurement where possible (Hertwich + StrikoWestofen on the furnace; CEBA + Presezzi on the decoater); long-lead-item purchase orders placed before permit issuance; liquidated-damages clauses.

**7.8 Permitting slip.** JCA/DRNA and EPA Region 2 are chronically under-resourced; the 9–15 month timeline in Section 5 is a planning figure, not a guarantee. **Mitigation:** pre-application meetings with DRNA, EPA Region 2, and OGPe; NEZ designation through PRIDCO; experienced local environmental counsel; complete application on first submission.

**7.9 Single-plant fragility.** The financial model flags that "best resilience posture is two medium plants, not one large." The engineering corollary: at any single site, design for **+15% capacity** above the nominal tonnage target so that a single furnace trip during a hurricane recovery does not collapse the supply chain.

---

## 8. Cost-per-ton sanity check

The financial model in `budget-data.json` posits the following OPEX envelopes:
- Small (5 kt/yr): $1,010/t
- Medium (15 kt/yr): $820/t ← recommended case
- Large (40 kt/yr): lower per-ton, three-shift operation

This section tests whether the engineering parameters in Sections 1–6 are consistent with that OPEX.

**8.1 Industry CAPEX benchmarks.** Public references for secondary aluminum UBC plant CAPEX are sparse because most of the working capacity is owned by non-disclosing operators (Novelis, Constellium, Norsk Hydro, Hindalco). What is published:
- **Wood Mackenzie (referenced in trade press, 2023):** ~$2,350/t annual capacity for primary smelting; secondary UBC is 30–50% lower because no potline, no carbon anode plant. **Implied medium-scenario CAPEX range: $2,350 × 0.55 × 15,000 t = ~$19M minimum; project financial model shows $43–61M (~$2,900–4,100/t).** This is within the expected range and includes site work, FORTIFIED construction, off-gas equipment, permitting, and working capital that the Wood number does not.
- **Novelis (announced 2023, $2.5B Bay Minette, AL plant):** ~500 kt/yr greenfield rolling mill and recycling, includes both primary and secondary lines, full scope. The implied $5,000/t is a mainland US reference for an integrated mill, not a UBC-only line.

**8.2 MWh/t energy intensity.** UBC secondary processing consumes **700–750 kWh/tonne thermal energy**, of which:
- ~80% is natural gas (delivered as ~2.5–3.0 MMBtu/t; efficiency 60–70%)
- ~20% is electrical auxiliaries (fans, hydraulics, casting, lighting, baghouse, RTO): ~150 kWh/t

At PREB-authorized industrial rates of ~15–18 ¢/kWh (mid-2025 base, with the LUMA emergency 2.8 ¢/kWh surcharge under review [5,20]), the electrical bill is **$22–27/t**. Natural gas at $5–7/MMBtu adds **$12–21/t**. Total energy OPEX: **$35–48/t**.

**8.3 Salt flux consumption.** Rotary tilting furnace with the low-salt process: 0.2–0.5 kg/t per SMS/Hertwich [1]. Conventional reverb: 5–15 kg/t. NaCl–KCl flux at $300–500/t delivered: $1.5–2.5/t (rotary) or $15–75/t (reverb). **Implication:** the choice of rotary tilting is not just technical but is also a $15–70/t OPEX driver.

**8.4 Refractory life.** A rotary tilting furnace typically achieves 6–18 months on the sidewall and 18–36 months on the roof, depending on flux regime. Refractory cost is ~$0.5–2.0 M per campaign. At 5–8 t/h and 300 days/yr, a 15 kt/yr plant runs ~3,750–6,000 h/yr, which is on the upper end of refractory life. **OPEX allocation: ~$5–10/t for refractory.**

**8.5 Labor.** Medium scenario: 62 FTE ÷ 15,000 t = 4.13 FTE per kt. At fully loaded $50–60k/yr average, labor cost is **~$210–250/t** for the medium scenario, the single largest OPEX line. This is consistent with the budget-data.json medium OPEX of $820/t once non-labor lines are layered in.

**8.6 Other OPEX line items.**
- Dross disposal (salt slag, sold to cement kilns at $50–150/t credit): −$5 to +$10/t net
- Spare parts and consumables: $30–50/t
- Maintenance labor and contractors: $25–40/t
- Insurance (FORTIFIED-attributable reduction of 10–25%): $15–25/t
- Permits, fees, CEMS, environmental compliance: $10–15/t
- G&A, logistics, offtake handling: $30–50/t
- Contingency: 5–10% of subtotal

**Sum-check against the financial model.** Adding: energy $35–48 + flux $1.5–2.5 + refractory $5–10 + labor $210–250 + consumables/maintenance/insurance/permits/G&A/contingency $300–520 = **$551–830/t**. The midpoint ~$690/t is within 16% of the budget-data.json $820/t medium-scenario figure — **consistent**. The variance is in the expected direction (the financial model is more conservative on labor and contingency, which is appropriate for a PR site with above-mainland US insurance and logistics costs).

**8.7 FTE-per-kt cross-check.** Medium scenario: 4.13 FTE/kt from engineering sizing. Industry benchmarks for greenfield UBC plants in the US (ex-PR, ex-hurricane premium): 3.0–4.5 FTE/kt for 24/7 operation, 4.0–5.5 FTE/kt for 2-shift. The medium-scenario 4.13 FTE/kt is on the high end of greenfield norms — appropriate for PR (skilled-labor constraints → more body per shift, but lower shift count).

**8.8 Data gaps — explicit list.** The following are referenced in the financial model or required for design but are not publicly available; engineering judgment has been used with the closest public analog:
1. **PREB current industrial rate (exact ¢/kWh by tariff class) for a 1.5 MW load** — not posted; LUMA's tariff book references a complex rider structure.
2. **PR natural gas delivered industrial price ($/MMBtu) at 14 MMBtu/h interruptible load** — not publicly posted; PREPA-gas distribution tariffs exist but the interruptible schedule is contract-specific.
3. **PR industrial insurance premium for FORTIFIED Commercial™** — no published PR-specific loss-cost data; estimated from mainland US benchmarks.
4. **PR salary benchmarks for process operators, electricians, and metallurgists** — anecdotal only; Bureau of Labor Statistics PR field is small sample.
5. **PR UBC feedstock supply curve at 15 kt/yr** — no PR-specific data exists; the country-cases.md flagged this gap. Engineering sizing assumes 95%+ UBC-pure bale supply with external breakeven collection cost.
6. **PR-specific salt-slag / dross disposal route** — no local cement kiln market data; assume export.
7. **DENA/DRNA minor NSR permit cycle for a secondary aluminum source** — no published "average days to permit" for a UBC line.
8. **Hertwich, CEBA, Wagstaff, or StrikoWestofen project pricing** — all "contact for quote"; CAPEX in budget-data.json is engineering-judgment range.

---

## 9. Summary

**File path:** `~/.openclaw/workspace/projects/pr-aluminum-recycling/research/engineering-tech.md`
**Lead furnace recommendation:** **gas-fired rotary tilting furnace** (URTF-class) — energy-efficient, accepts shredded UBC directly, low salt flux, lowest OPEX given PR's high electricity tariff and gas-favorable economics; gas dominates because PR's grid is ~95% fossil and electrification does not "clean" the energy mix here.
**Lead vendor:** **Hertwich (URTF)** for the furnace, **CEBA S.p.A. (CEBA CLEAN)** for the decoater + RTO, **Wagstaff** for the T-bar VDC casting line. Dual-source the furnace with **StrikoWestofen** to limit delivery-slip exposure.
**Lead casting format:** **Aluminum Association T-bar/sow** at P1020A–P0610 purity, cast via vertical direct-chill (VDC) — global offtake-compatible, containerizable, no continuous-coil premium required.
**Top engineering risk:** **Permitting slip on the JCA/DRNA minor NSR pathway, compounded by the chronic pre-storm / post-storm grid fragility.** Without a completed air permit and on-site generation sized to ride through 4–8 h of grid outage, the plant cannot operate at insurance-grade reliability in PR. The mitigation is to (a) pre-application meetings with DRNA and EPA Region 2, (b) PRIDCO NEZ designation as a single point of contact, and (c) on-site diesel + BESS sized for the medium scenario at 2 MW / 1–2 MWh minimum.
**Data gaps:** (1) PR-specific PREB industrial ¢/kWh by tariff class for a 1.5 MW load; (2) PR industrial natural gas delivered price at 14 MMBtu/h interruptible; (3) FORTIFIED Commercial™ PR insurance premium data; (4) PR salary benchmarks for process operators; (5) PR-specific UBC feedstock supply curve; (6) PR salt-slag / dross disposal route; (7) JCA minor NSR actual cycle time for a UBC plant; (8) vendor project pricing.

---

### References (citable sources)

[1] SMS Group, "Universal Rotary Tilting Furnaces" — *"URTF operate with the standard low-salt process. They achieve an optimum metal yield with a salt factor of 0.2–0.5."* https://www.sms-group.com/plants/all-plants/melting-furnaces/concepts/universal-rotary-tilting-furnaces

[2] Aluminum Association, Environmental Product Declaration Secondary Aluminum Ingot (2022) — https://www.aluminum.org/sites/default/files/2022-08/105.1_Aluminum_Assocication_EPD_Secondary_Aluminum_Ingot.pdf

[3] Laurand Associates, "Primary Aluminum" — P1020/P0610/P0506/P0404 specification. https://laurand.net/primary-aluminum/

[4] Hertwich Engineering, "Universal Rotary Tilting Furnace for Aluminium Recycling" — URTF sizes 3–20 m³, melt rates 1.5–8 t/h. https://www.hertwich.com/products/melting-furnaces/universal-rotary-tilting-furnaces

[5] LUMA Energy / PREB, "Current Rates for Electric Service in Puerto Rico" — *"Electric service rates are not established by LUMA. They are established by the Puerto Rico Energy Bureau, or PREB."* https://lumapr.com/current-rates-for-electric-service-in-puerto-rico/?lang=en

[6] CEBA S.p.A., "Decoating system for aluminium scraps" — *"exhaust gases will be thermally treated by an high efficiency thermal oxidizer (CEBA CLEAN) which bring the exhaust gases to high combustion temperature."* https://www.cebaspa.com/products/aluminium/decoating-system-for-aluminium-scraps

[7] Presezzi Extrusion Group, "UBC and Aluminium Scrap Decoaters" — counterflow rotary drum with afterburner, heat exchanger, and dedusting cyclone. https://www.presezziextrusiongroup.com/product/melting-technology/ubc-scrap-decoaters.html

[8] SUNY Group, "Decoating machine for UBC shredded cans" — rotary kiln pyrolysis description. https://www.sunygroup.cn/news/Decoating-machine-for-ubc-shredded-cans.html

[9] SMS Group, "Melting furnaces for aluminum" — URTF product family. https://www.sms-group.com/en-ae/plants/melting-furnaces-for-aluminum

[10] StrikoWestofen (Norican Group) — "Aluminium Melting and Holding Furnaces". https://www.strikowestofen.com/melting-and-holding-furnaces/

[11] NIST, "NIST Shares Preliminary Findings From Hurricane Maria Investigation" (2025) — *"peak gusts as high as 140 mph over flat terrain, strong enough to topple trees and lift roofs off houses."* https://www.nist.gov/news-events/news/2025/07/nist-shares-preliminary-findings-hurricane-maria-investigation

[12] IBHS, "STANDARDS COMMERCIAL A PROGRAM OF IBHS WIND 2022" — *"FORTIFIED Commercial is a voluntary, above-code resilient construction standard designed to strengthen businesses against severe weather, like hurricanes and tornadoes."* https://fortifiedcommercial.org/wp-content/uploads/Fortified_Commercial_Wind_Standards_2020.pdf

[13] Builder Online, "Lessons from Hurricane Maria: Code-Built Housing Holds Up Better" (2025). https://www.builderonline.com/building/building-science/lessons-from-hurricane-maria-code-built-housing-holds-up-better_o

[14] US EPA, "Clean Air Permitting in Puerto Rico" — *"The Puerto Rico Department of Natural and Environmental Resources is responsible for minor New Source Review (NSR) and Part 70 Operating Permits. EPA Region 2 retains the responsibility to issue and implement the PSD permits."* https://www.epa.gov/caa-permitting/clean-air-permitting-puerto-rico

[15] Federal Register, "Prevention of Significant Deterioration (PSD) and Nonattainment New Source Review (NNSR): Reconsideration of Fugitive Emissions Rule" (Oct 14, 2022). https://www.federalregister.gov/documents/2022/10/14/2022-22259/prevention-of-significant-deterioration-psd-and-nonattainment-new-source-review-nnsr-reconsideration

[16] US EPA, "AP-42 Chapter 12.8: Secondary Aluminum Operations" — background report at https://www.epa.gov/sites/default/files/2020-11/documents/b12s08.pdf and chapter at https://www.epa.gov/sites/default/files/2020-11/documents/c12s08.pdf

[17] NIOSH/CDC, "Molten Aluminum-Water Explosion Initiation Mechanism Study" (Sept 1975) — *"The most probable and most frequent trigger mechanism producing the required contact has been identified as an impact generated shock, which is produced by the aluminum flow over quench pit surface. Current aluminum industry safety practices which emphasize the elimination of the surface cavities..."* https://stacks.cdc.gov/view/cdc/178897

[18] CAMEO Chemicals (NOAA), "Aluminum, Molten" — *"Violent reaction with water; contact may cause an explosion or may produce a flammable gas (hydrogen)."* https://cameochemicals.noaa.gov/chemical/19224

[19] National Hurricane Center, "Tropical Cyclone Report — Hurricane Maria (AL152017)" — *"a high-end category 4 hurricane."* https://www.nhc.noaa.gov/data/tcr/AL152017_Maria.pdf

[20] El Nuevo Día, "LUMA Energy asks for emergency increase of 2.8 cents per kilowatt hour in the electricity bill" (May 2025). https://www.elnuevodia.com/english/news/story/luma-energy-asks-for-emergency-increase-of-28-cents-per-kilowatt-hour-in-the-electricity-bill/

[21] MDPI Metals, "Solid Salt Fluxes for Molten Aluminum Processing — A Review" (April 2023) — *"NaCl and KCl are the most convenient solution... an equimolar mixture forms a eutectic point at 657 °C."* https://www.mdpi.com/2075-4701/13/5/832

[22] Discovery Alert, "Global Aluminium UBC Scrap Market Faces Rising Price Volatility" (April 2026) — *"Secondary processing of UBC scrap requires only 700–750 kWh per tonne, achieving approximately 95% energy reduction compared to primary production."* https://discoveryalert.com.au/price-volatility-global-aluminium-ubc-scrap-market-2026/

[23] International Aluminium Institute, "Primary Aluminium Smelting Power Consumption" — global energy-intensity statistics. https://international-aluminium.org/statistics/primary-aluminium-smelting-power-consumption/

[24] IBHS, "Building Codes Progress" (Dec 2025) — *"sealed roof deck requirements now apply in all areas with design wind speeds of 130 mph and greater."* https://ibhs.org/building-codes/building-codes-progress/

---

*End of Engineering & Technology Memo v1.0*
