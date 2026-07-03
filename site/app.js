/* Recircular Puerto Rico — interactive components
 * No build step. ES2020+ in browser.
 * Modules: utils, mobile nav, scrollspy, case tabs, country chart,
 *          budget charts, scenario comparison, map, timeline, footnotes.
 */
(() => {
  'use strict';

  // ---------- utils ----------
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const fmt = {
    usd0: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
    usd1: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 1 }),
    num0: new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }),
    num1: new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }),
    pct1: (x) => `${(x * 100).toFixed(1)}%`,
  };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PALETTE = ['#0c5c8a','#1f8fb8','#5fb8d3','#a3d9b1','#d6c25a','#e89c52','#c45a4a','#7a4a96','#444'];

  // ---------- mobile nav ----------
  const initNav = () => {
    const btn = $('.nav-toggle');
    const list = $('#nav-list');
    if (!btn || !list) return;
    btn.addEventListener('click', () => {
      const open = list.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
    $$('#nav-list a').forEach(a => a.addEventListener('click', () => {
      list.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }));
  };

  // ---------- scrollspy ----------
  const initScrollspy = () => {
    const sections = $$('main section[id]');
    const links = $$('.nav-list a[href^="#"]');
    if (!sections.length || !links.length) return;
    const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(a => a.classList.remove('is-active'));
          const a = map.get(e.target.id);
          if (a) a.classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(s => io.observe(s));
  };

  // ---------- case study tabs (a11y + deep-link) ----------
  const initCaseTabs = () => {
    const tablist = $('[role="tablist"][data-tablist="cases"]');
    if (!tablist) return;
    const tabs = $$('[role="tab"]', tablist);
    const panels = tabs.map(t => $(`#${t.getAttribute('aria-controls')}`));
    const activate = (i) => {
      tabs.forEach((t, j) => {
        const on = i === j;
        t.setAttribute('aria-selected', String(on));
        t.setAttribute('tabindex', on ? '0' : '-1');
        if (panels[j]) panels[j].hidden = !on;
      });
      if (panels[i]) {
        panels[i].querySelectorAll('.case-chart').forEach(c => c.__render && c.__render());
      }
      history.replaceState(null, '', `#${panels[i].id}`);
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activate(i));
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); activate((i + 1) % tabs.length); tabs[(i+1)%tabs.length].focus(); }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); activate((i - 1 + tabs.length) % tabs.length); tabs[(i-1+tabs.length)%tabs.length].focus(); }
        if (e.key === 'Home')       { e.preventDefault(); activate(0); tabs[0].focus(); }
        if (e.key === 'End')        { e.preventDefault(); activate(tabs.length-1); tabs[tabs.length-1].focus(); }
      });
    });
    // Deep-link to a specific case
    const m = location.hash.match(/^#case-([a-z]+)$/);
    if (m) {
      const idx = tabs.findIndex(t => t.getAttribute('aria-controls') === `case-${m[1]}`);
      if (idx >= 0) activate(idx);
    }
  };

  // ---------- country recovery-rate bar chart ----------
  const initCountryChart = async () => {
    const host = $('#country-chart');
    if (!host || typeof d3 === 'undefined') return;
    let data;
    try {
      const res = await fetch('assets/country-data.json');
      data = await res.json();
    } catch (e) { host.textContent = 'Failed to load country data.'; return; }
    const rates = data.rates.slice().sort((a, b) => b.rate - a.rate);
    const w = host.clientWidth || 600;
    const rowH = 32, padL = 110, padR = 70;
    const h = rates.length * rowH + 24;
    const svg = d3.select(host).append('svg')
      .attr('viewBox', `0 0 ${w} ${h}`).attr('role','img')
      .attr('aria-label','Aluminum can recovery rates by jurisdiction');
    const x = d3.scaleLinear().domain([0, 1]).range([0, w - padL - padR]);
    const y = d3.scaleBand().domain(rates.map(d => d.iso)).range([0, rates.length * rowH]).padding(0.2);
    svg.append('g').attr('transform', `translate(${padL}, 0)`)
      .call(d3.axisLeft(y).tickSize(0))
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('text').attr('font-size', 12).attr('fill', '#1d2939'));
    // X axis with percent ticks
    svg.append('g').attr('transform', `translate(${padL}, ${rates.length * rowH})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format('.0%')))
      .call(g => g.selectAll('text').attr('font-size', 11).attr('fill', '#475467'))
      .call(g => g.select('.domain').attr('stroke', '#cdd5df'));
    const rows = svg.append('g').attr('transform', `translate(${padL}, 0)`);
    rows.selectAll('rect').data(rates).join('rect')
      .attr('x', 0).attr('y', d => y(d.iso))
      .attr('height', y.bandwidth())
      .attr('width', d => x(d.rate))
      .attr('fill', (d, i) => i === rates.length - 1 ? '#c45a4a' : (d.iso === 'PR' ? '#0c5c8a' : PALETTE[i % PALETTE.length]))
      .attr('rx', 3);
    rows.selectAll('text.val').data(rates).join('text')
      .attr('class','val')
      .attr('x', d => x(d.rate) + 6)
      .attr('y', d => y(d.iso) + y.bandwidth()/2 + 4)
      .attr('font-size', 12).attr('font-weight','600').attr('fill', '#1d2939')
      .text(d => fmt.pct1(d.rate));
    // Tooltip
    rows.selectAll('title').data(rates).join('title')
      .text(d => `${d.name}\n${fmt.pct1(d.rate)} (${d.mechanism})`);
  };

  // ---------- budget charts ----------
  const initBudgetCharts = async () => {
    if (typeof d3 === 'undefined') return;
    let data;
    try {
      const res = await fetch('assets/budget-data.json');
      data = await res.json();
    } catch (e) { return; }
    const lead = data.scenario_lead || 'medium';
    const capex = data.capex[lead];
    const opex  = data.opexAnnual[lead];
    const rev   = data.revenueAnnual[lead];
    const km    = data.key_metrics[lead];

    // ----- CAPEX donut (medium) -----
    const donut = $('#budget-donut');
    if (donut) {
      const w = donut.clientWidth || 360, size = Math.min(w, 360);
      const r = size/2 - 8, ir = r - 60;
      const svg = d3.select(donut).append('svg')
        .attr('viewBox', `0 0 ${size} ${size}`).attr('role','img')
        .attr('aria-label', `CAPEX composition for ${lead} scenario`);
      const g = svg.append('g').attr('transform', `translate(${size/2}, ${size/2})`);
      const pie = d3.pie().value(d => d.amount).sort(null);
      const arc = d3.arc().innerRadius(ir).outerRadius(r);
      const arcs = g.selectAll('path').data(pie(capex.lines)).join('path')
        .attr('d', arc).attr('fill', (d, i) => PALETTE[i % PALETTE.length])
        .attr('stroke','#fff').attr('stroke-width', 1.5);
      arcs.append('title').text(d => `${d.data.category}\n${fmt.usd0.format(d.data.amount)}`);
      g.append('text').attr('text-anchor','middle').attr('y', -8)
        .attr('font-size', 13).attr('fill', '#475467').text('Total CAPEX');
      g.append('text').attr('text-anchor','middle').attr('y', 14)
        .attr('font-size', 20).attr('font-weight','700').attr('fill', '#0c5c8a')
        .text(fmt.usd0.format(capex.total));
      g.append('text').attr('text-anchor','middle').attr('y', 34)
        .attr('font-size', 11).attr('fill', '#7a8699')
        .text(`${lead} scenario · ${fmt.usd0.format(km.capex_per_t)}/t`);

      // Legend
      const legend = $('#budget-donut-legend');
      if (legend) {
        legend.innerHTML = capex.lines.map((l, i) => `
          <li><span class="sw" style="background:${PALETTE[i % PALETTE.length]}"></span>
              <span class="lbl">${l.category}</span>
              <span class="amt">${fmt.usd0.format(l.amount)}</span>
              <span class="pct">${(l.amount / capex.subtotal * 100).toFixed(0)}%</span></li>
        `).join('');
      }
    }

    // ----- CAPEX stacked bar (3 scenarios) -----
    const bar = $('#budget-capex-bar');
    if (bar) {
      // Build a unified line-item set across scenarios for stacking
      const scenarios = data.scenarios;
      const scenarioCapex = scenarios.map(s => ({ id: s, ...data.capex[s] }));
      const w = bar.clientWidth || 600;
      const h = 280, padL = 130, padR = 30, padT = 16, padB = 60;
      const svg = d3.select(bar).append('svg')
        .attr('viewBox', `0 0 ${w} ${h}`).attr('role','img')
        .attr('aria-label','CAPEX by scenario, stacked by category');
      const x = d3.scaleBand().domain(scenarios).range([padL, w - padR]).padding(0.3);
      const yMax = d3.max(scenarioCapex, d => d.total) * 1.05;
      const y = d3.scaleLinear().domain([0, yMax]).range([h - padB, padT]);
      // Use the largest scenario's line items as the canonical list
      const big = scenarioCapex.find(s => s.id === 'large') || scenarioCapex[scenarioCapex.length-1];
      const cats = big.lines.map(l => l.category);
      // For each scenario, sum amounts by category (or use same line items where present)
      const grouped = scenarioCapex.map(s => {
        const map = new Map(s.lines.map(l => [l.category, l.amount]));
        return cats.map(c => ({ category: c, amount: map.get(c) || 0 }));
      });
      const stack = d3.stack().keys(cats);
      const series = stack(grouped);
      svg.append('g').selectAll('g').data(series).join('g')
        .attr('fill', (d, i) => PALETTE[i % PALETTE.length])
        .selectAll('rect').data(d => d.map(v => ({ ...v, key: d.key }))).join('rect')
        .attr('x', d => x(d.data ? scenarios[grouped.findIndex(g => g === d)] : 0) || 0)
        .attr('y', d => y(d[1])).attr('height', d => Math.max(0, y(d[0]) - y(d[1])))
        .attr('width', x.bandwidth())
        .append('title').text(d => `${d.key || ''}\n${d.category}: ${fmt.usd0.format(d[1] - d[0])}`);
      // X axis
      svg.append('g').attr('transform', `translate(0, ${h - padB})`)
        .call(d3.axisBottom(x))
        .call(g => g.selectAll('text').attr('font-size', 12).attr('fill', '#1d2939'))
        .call(g => g.select('.domain').attr('stroke', '#cdd5df'));
      // Y axis
      svg.append('g').attr('transform', `translate(${padL}, 0)`)
        .call(d3.axisLeft(y).ticks(5).tickFormat(d => fmt.usd0.format(d).replace('$','$')))
        .call(g => g.selectAll('text').attr('font-size', 10).attr('fill', '#475467'))
        .call(g => g.select('.domain').attr('stroke', '#cdd5df'));
      // Total labels on top
      svg.append('g').selectAll('text').data(scenarioCapex).join('text')
        .attr('x', d => x(d.id) + x.bandwidth()/2)
        .attr('y', d => y(d.total) - 6)
        .attr('text-anchor','middle')
        .attr('font-size', 12).attr('font-weight','700').attr('fill', '#0c5c8a')
        .text(d => fmt.usd0.format(d.total));
      // Legend
      const legend = $('#budget-capex-legend');
      if (legend) {
        legend.innerHTML = cats.map((c, i) =>
          `<li><span class="sw" style="background:${PALETTE[i % PALETTE.length]}"></span><span>${c}</span></li>`
        ).join('');
      }
    }

    // ----- OPEX table (medium) -----
    const tbl = $('#budget-opex-table');
    if (tbl) {
      const rows = opex.lines.map(l => `
        <tr>
          <th scope="row">${l.category}</th>
          <td class="num">${fmt.usd0.format(l.amount)}</td>
          <td class="num pct">${(l.amount / opex.total * 100).toFixed(0)}%</td>
        </tr>`).join('');
      tbl.innerHTML = `
        <caption>Annual OPEX, ${lead} scenario · total <strong>${fmt.usd0.format(opex.total)}</strong>
          (${fmt.usd0.format(opex.total_per_t || Math.round(opex.total/data.scenario_lead_capacity_tonnes_yr))}/t)</caption>
        <thead><tr><th scope="col">Line</th><th scope="col" class="num">USD/yr</th><th scope="col" class="num">%</th></tr></thead>
        <tbody>${rows}</tbody>`;
    }

    // ----- Revenue line/bar -----
    const rline = $('#budget-revenue-line');
    if (rline) {
      const w = rline.clientWidth || 500, h = 220, padL = 56, padR = 16, padT = 16, padB = 56;
      const svg = d3.select(rline).append('svg')
        .attr('viewBox', `0 0 ${w} ${h}`).attr('role','img')
        .attr('aria-label', `Annual revenue composition (${lead} scenario)`);
      const streams = [
        { name: 'Aluminum ingot / sow', amount: 28500000, color: PALETTE[0] },
        { name: 'EPR / Closed-Loop',     amount: 1500000,  color: PALETTE[1] },
        { name: 'Tip fees',              amount: 900000,   color: PALETTE[2] },
        { name: 'Government TIP-style',  amount: 500000,   color: PALETTE[3] },
        { name: 'Carbon credits',        amount: 351000,   color: PALETTE[4] },
        { name: 'Dross sale',            amount: 270000,   color: PALETTE[5] },
      ];
      const y = d3.scaleLinear().domain([0, 30000000]).range([h - padB, padT]);
      const x = d3.scaleBand().domain(streams.map(s => s.name)).range([padL, w - padR]).padding(0.25);
      svg.append('g').selectAll('rect').data(streams).join('rect')
        .attr('x', d => x(d.name)).attr('y', d => y(d.amount))
        .attr('width', x.bandwidth())
        .attr('height', d => h - padB - y(d.amount))
        .attr('fill', d => d.color).attr('rx', 3)
        .append('title').text(d => `${d.name}\n${fmt.usd0.format(d.amount)}`);
      svg.append('g').selectAll('text.val').data(streams).join('text')
        .attr('class','val')
        .attr('x', d => x(d.name) + x.bandwidth()/2)
        .attr('y', d => y(d.amount) - 6)
        .attr('text-anchor','middle')
        .attr('font-size', 10).attr('font-weight','600').attr('fill', '#1d2939')
        .text(d => fmt.usd0.format(d.amount));
      svg.append('g').attr('transform', `translate(0, ${h - padB})`)
        .call(d3.axisBottom(x))
        .call(g => g.selectAll('text')
          .attr('font-size', 10).attr('fill', '#475467')
          .attr('transform', 'rotate(-22)').attr('text-anchor','end'))
        .call(g => g.select('.domain').attr('stroke', '#cdd5df'));
      svg.append('g').attr('transform', `translate(${padL}, 0)`)
        .call(d3.axisLeft(y).ticks(4).tickFormat(d => '$' + (d/1e6).toFixed(0) + 'M'))
        .call(g => g.selectAll('text').attr('font-size', 10).attr('fill', '#475467'))
        .call(g => g.select('.domain').attr('stroke', '#cdd5df'));
    }

    // ----- Scenario comparison table -----
    const sc = $('#budget-scenarios');
    if (sc) {
      const allMetrics = data.scenarios.map(s => ({
        id: s,
        capex: data.capex[s].total,
        opex: data.opexAnnual[s].total,
        capacity: s === 'small' ? 5000 : (s === 'medium' ? 15000 : 40000),
        capexPerT: data.key_metrics[s].capex_per_t,
        opexPerT: data.key_metrics[s].opex_per_t,
        payback: data.key_metrics[s].payback_years,
        fte: data.key_metrics[s].direct_fte,
        irr: data.key_metrics[s].irr_20y,
      }));
      sc.innerHTML = `
        <caption>Side-by-side scenario comparison (CAPEX/OPEX in USD, undiscounted payback, FTE direct, 20-yr IRR band)</caption>
        <thead><tr>
          <th scope="col">Metric</th>
          <th scope="col" class="num">Small (5,000 t/yr)</th>
          <th scope="col" class="num">Medium (15,000 t/yr) <span class="lead-tag">lead</span></th>
          <th scope="col" class="num">Large (40,000 t/yr)</th>
        </tr></thead>
        <tbody>
          <tr><th scope="row">CAPEX total</th>
            <td class="num">${fmt.usd0.format(allMetrics[0].capex)}</td>
            <td class="num">${fmt.usd0.format(allMetrics[1].capex)}</td>
            <td class="num">${fmt.usd0.format(allMetrics[2].capex)}</td></tr>
          <tr><th scope="row">CAPEX $/t</th>
            <td class="num">${fmt.usd0.format(allMetrics[0].capexPerT)}</td>
            <td class="num">${fmt.usd0.format(allMetrics[1].capexPerT)}</td>
            <td class="num">${fmt.usd0.format(allMetrics[2].capexPerT)}</td></tr>
          <tr><th scope="row">Annual OPEX</th>
            <td class="num">${fmt.usd0.format(allMetrics[0].opex)}</td>
            <td class="num">${fmt.usd0.format(allMetrics[1].opex)}</td>
            <td class="num">${fmt.usd0.format(allMetrics[2].opex)}</td></tr>
          <tr><th scope="row">OPEX $/t</th>
            <td class="num">${fmt.usd0.format(allMetrics[0].opexPerT)}</td>
            <td class="num">${fmt.usd0.format(allMetrics[1].opexPerT)}</td>
            <td class="num">${fmt.usd0.format(allMetrics[2].opexPerT)}</td></tr>
          <tr><th scope="row">Payback (years)</th>
            <td class="num">5.6</td>
            <td class="num">3.0</td>
            <td class="num">2.0</td></tr>
          <tr><th scope="row">Direct FTE</th>
            <td class="num">32</td>
            <td class="num">62</td>
            <td class="num">110</td></tr>
          <tr><th scope="row">20-yr IRR</th>
            <td class="num">9-12%</td>
            <td class="num">14-18%</td>
            <td class="num">22-28%</td></tr>
        </tbody>`;
    }

    // ----- Funding table -----
    const ftbl = $('#funding-table');
    if (ftbl && data.fundingSources) {
      const totalSources = d3.sum(data.fundingSources, d => d.amount);
      const capexTarget = data.capex[data.scenario_lead || 'medium'].total;
      const rows = data.fundingSources.map(f => {
        const statusPill = f.status || '';
        const riskClass = (f.sourcing_risk || 'medium').toLowerCase().replace(/[^a-z]/g, '');
        return `
          <tr>
            <th scope="row">${f.source}</th>
            <td class="num">${(f.share*100).toFixed(0)}%</td>
            <td class="num">${fmt.usd0.format(f.amount)}</td>
            <td><span class="pill pill-${statusPill.includes('Eligible') || statusPill.includes('legislation') ? 'amber' : 'ink'}">${statusPill}</span></td>
            <td><span class="pill pill-${riskClass}">${f.sourcing_risk || '—'}</span></td>
            <td class="note">${f.note || ''}</td>
          </tr>`;
      }).join('');
      ftbl.innerHTML = `
        <caption>Funding stack totals <strong>${fmt.usd0.format(totalSources)}</strong> · medium CAPEX target ${fmt.usd0.format(capexTarget)}</caption>
        <thead><tr>
          <th scope="col">Source</th>
          <th scope="col" class="num">%</th>
          <th scope="col" class="num">$</th>
          <th scope="col">Status</th>
          <th scope="col">Risk</th>
          <th scope="col">Note</th>
        </tr></thead>
        <tbody>${rows}</tbody>`;
    }

    // ----- Funding stack bar (CAPEX sources) -----
    const fs = $('#budget-funding');
    if (fs && data.fundingSources) {
      const w = fs.clientWidth || 600, h = 220, padL = 200, padR = 90, padT = 8, padB = 8;
      const total = d3.sum(data.fundingSources, d => d.amount);
      const svg = d3.select(fs).append('svg')
        .attr('viewBox', `0 0 ${w} ${h}`).attr('role','img')
        .attr('aria-label', `Funding stack: ${fmt.usd0.format(total)} across ${data.fundingSources.length} sources`);
      const y = d3.scaleBand().domain(data.fundingSources.map(d => d.source)).range([padT, h - padB]).padding(0.2);
      const x = d3.scaleLinear().domain([0, total]).range([0, w - padL - padR]);
      svg.append('g').selectAll('rect').data(data.fundingSources).join('rect')
        .attr('x', padL).attr('y', d => y(d.source))
        .attr('height', y.bandwidth()).attr('width', d => x(d.amount))
        .attr('fill', (d, i) => PALETTE[i % PALETTE.length]).attr('rx', 2)
        .append('title').text(d => `${d.source}\n${fmt.usd0.format(d.amount)} (${(d.share*100).toFixed(0)}%) — ${d.status}`);
      svg.append('g').selectAll('text.lbl').data(data.fundingSources).join('text')
        .attr('class','lbl')
        .attr('x', padL - 8).attr('y', d => y(d.source) + y.bandwidth()/2 + 4)
        .attr('text-anchor','end').attr('font-size', 12).attr('fill', '#1d2939')
        .text(d => d.source);
      svg.append('g').selectAll('text.amt').data(data.fundingSources).join('text')
        .attr('class','amt')
        .attr('x', d => padL + x(d.amount) + 6)
        .attr('y', d => y(d.source) + y.bandwidth()/2 + 4)
        .attr('font-size', 11).attr('font-weight','600').attr('fill', '#0c5c8a')
        .text(d => `${fmt.usd0.format(d.amount)}  (${(d.share*100).toFixed(0)}%)`);
    }
  };

  // ---------- map (Leaflet) ----------
  const initMap = async () => {
    const host = $('#pr-map');
    if (!host || typeof L === 'undefined') return;
    // San Juan center
    const map = L.map(host, { scrollWheelZoom: false, zoomControl: true }).setView([18.22, -66.59], 9);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    // Layer groups
    const dropLayer = L.layerGroup().addTo(map);
    const zoneLayer = L.layerGroup();
    const munLayer  = L.layerGroup();

    // Drop-off points
    let dropoff = [];
    try {
      const res = await fetch('assets/dropoff-points.json');
      const j = await res.json();
      dropoff = j.drop_off_points || [];
    } catch (e) {}
    dropoff.forEach(p => {
      const color = p.status === 'confirmed' ? '#1f8fb8' : (p.status === 'in-discussion' ? '#e89c52' : '#7a4a96');
      const m = L.circleMarker([p.lat, p.lng], {
        radius: 7, fillColor: color, color: '#fff', weight: 2, fillOpacity: 0.95,
      }).bindPopup(`
        <strong>${p.name}</strong><br>
        <em>${p.municipality} · ${p.type}</em><br>
        Operator: ${p.operator}<br>
        Status: ${p.status}<br>
        Est. tonnage: ${p.tonnagePerMonthEst} t/month
      `);
      dropLayer.addLayer(m);
    });

    // Industrial zones
    try {
      const res = await fetch('assets/pr-industrial-zones.json');
      const j = await res.json();
      (j.zones || []).forEach(z => {
        const m = L.marker([z.lat, z.lng]).bindPopup(`
          <strong>${z.name}</strong><br>
          ${z.municipality} · ${z.type}<br>
          ${z.size_ha} ha · ${z.note || ''}
        `);
        zoneLayer.addLayer(m);
      });
    } catch (e) {}

    // Municipality candidates (top 10 by population)
    try {
      const res = await fetch('assets/pr-municipalities.json');
      const j = await res.json();
      const top = (j.municipalities || []).slice().sort((a, b) => b.population - a.population).slice(0, 12);
      top.forEach(m => {
        const c = L.circle([m.lat, m.lng], {
          radius: Math.sqrt(m.population) * 8,
          color: '#0c5c8a', weight: 1, fillColor: '#0c5c8a', fillOpacity: 0.06,
        }).bindPopup(`<strong>${m.name}</strong><br>Population: ${fmt.num0.format(m.population)}<br>${m.note || ''}`);
        munLayer.addLayer(c);
      });
    } catch (e) {}

    // Layer control
    L.control.layers(
      { 'Drop-off points': dropLayer },
      { 'Industrial zones': zoneLayer, 'Municipality candidates': munLayer }
    ).addTo(map);

    // Search filter
    const search = $('#map-search');
    if (search) {
      search.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        dropLayer.clearLayers();
        dropoff
          .filter(p => !q || p.name.toLowerCase().includes(q) || p.municipality.toLowerCase().includes(q))
          .forEach(p => {
            const color = p.status === 'confirmed' ? '#1f8fb8' : (p.status === 'in-discussion' ? '#e89c52' : '#7a4a96');
            dropLayer.addLayer(L.circleMarker([p.lat, p.lng], {
              radius: 7, fillColor: color, color: '#fff', weight: 2, fillOpacity: 0.95,
            }).bindPopup(`<strong>${p.name}</strong><br>${p.municipality} · ${p.type}<br>${p.tonnagePerMonthEst} t/mo`));
          });
      });
    }
  };

  // ---------- timeline (IntersectionObserver scroll reveal) ----------
  const initTimeline = async () => {
    const host = $('#timeline');
    if (!host) return;
    let phases = [];
    try {
      const res = await fetch('assets/timeline-data.json');
      const j = await res.json();
      phases = j.phases || [];
    } catch (e) { return; }
    host.innerHTML = phases.map((p, i) => `
      <li class="timeline-item" id="${p.id}">
        <div class="timeline-dot" aria-hidden="true"></div>
        <div class="timeline-card">
          <h3>${p.title}</h3>
          <p class="timeline-span">${p.span_en} <span lang="es">/ ${p.span_es}</span></p>
          <h4>Milestones</h4>
          <ul>${p.milestones.map(m => `<li>${m}</li>`).join('')}</ul>
          ${p.risks && p.risks.length ? `
            <h4>Risks &amp; mitigations</h4>
            <dl class="risk-list">
              ${p.risks.map(r => `<dt>${r.name}</dt><dd>${r.mitigation}</dd>`).join('')}
            </dl>` : ''}
        </div>
      </li>`).join('');
    if (reduceMotion) {
      host.querySelectorAll('.timeline-item').forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    host.querySelectorAll('.timeline-item').forEach(el => io.observe(el));
  };

  // ---------- footnotes (hover + click) ----------
  const initFootnotes = () => {
    $$('.footnote-ref').forEach(ref => {
      ref.addEventListener('click', (e) => {
        e.preventDefault();
        const id = ref.getAttribute('href').slice(1);
        const tgt = document.getElementById(id);
        if (tgt) tgt.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      });
    });
  };

  // ---------- boot ----------
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initScrollspy();
    initCaseTabs();
    initCountryChart();
    initBudgetCharts();
    initMap();
    initTimeline();
    initFootnotes();
  });
})();
