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

  // ---------- i18n ----------
  let currentLang = document.documentElement.lang || 'es';
  let translations = {};
  const loadTranslations = async () => {
    try {
      const res = await fetch('assets/translations.json');
      translations = await res.json();
    } catch (e) { translations = {}; }
  };
  const t = (key, lang = currentLang) => {
    if (!translations[lang]) return key;
    const val = translations[lang][key];
    if (val == null && lang !== 'en') return translations.en?.[key] ?? key;
    return val ?? key;
  };
  const applyLang = (lang) => {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.title = t('brand_name', lang) + ' — ' + (lang === 'es' ? 'Planta de reciclaje de aluminio' : 'Closed-loop aluminum recycling facility');
    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = t(key, lang);
      if (typeof val === 'string') {
        el.innerHTML = val;
      } else {
        el.textContent = val;
      }
    });
    $$('[data-i18n-aria]').forEach(el => {
      const key = el.dataset.i18nAria;
      const val = t(key, lang);
      if (val != null) el.setAttribute('aria-label', val);
    });
    $$('[data-i18n-title]').forEach(el => {
      const key = el.dataset.i18nTitle;
      const val = t(key, lang);
      if (val != null) el.setAttribute('title', val);
    });
    $$('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      const val = t(key, lang);
      if (val != null) el.setAttribute('placeholder', val);
    });
    renderScenariosTable(lang);
    renderFundingTable(lang);
    renderTimeline(lang);
    $$('.lang-btn').forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    renderCountryChart(lang);
  };

  const initI18n = () => {
    $$('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang && lang !== currentLang && translations[lang]) {
          applyLang(lang);
          try { localStorage.setItem('recirc-lang', lang); } catch (e) {}
        }
      });
    });
    const saved = (() => { try { return localStorage.getItem('recirc-lang'); } catch (e) { return null; } })();
    if (saved && saved !== currentLang && translations[saved]) {
      applyLang(saved);
    }
  };

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
    const tablist = $('#case-studies [role="tablist"]');
    if (!tablist) return;
    const tabs = $$('[role="tab"]', tablist);
    const panels = tabs.map(t => $(`#${t.getAttribute('aria-controls')}`)).filter(Boolean);
    if (!tabs.length || !panels.length) return;

    const setActiveTab = (i) => {
      tabs.forEach((t, j) => {
        const on = i === j;
        t.setAttribute('aria-selected', String(on));
        t.setAttribute('tabindex', on ? '0' : '-1');
        if (on) {
          t.classList.add('is-active');
          t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'nearest' });
        } else {
          t.classList.remove('is-active');
        }
      });
      panels.forEach((p, j) => {
        const on = i === j;
        if (on) {
          p.removeAttribute('hidden');
          p.classList.add('is-entering');
          requestAnimationFrame(() => {
            p.classList.remove('is-entering');
            p.classList.add('is-visible');
          });
        } else {
          p.setAttribute('hidden', '');
          p.classList.remove('is-visible');
        }
      });
      history.replaceState(null, '', `#case-${panels[i].id.replace('panel-', '')}`);
    };

    const activate = (i) => {
      if (i < 0 || i >= tabs.length) return;
      setActiveTab(i);
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activate(i));
      tab.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); activate((i + 1) % tabs.length); tabs[(i + 1) % tabs.length].focus(); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); activate((i - 1 + tabs.length) % tabs.length); tabs[(i - 1 + tabs.length) % tabs.length].focus(); }
        else if (e.key === 'Home') { e.preventDefault(); activate(0); tabs[0].focus(); }
        else if (e.key === 'End') { e.preventDefault(); activate(tabs.length - 1); tabs[tabs.length - 1].focus(); }
      });
    });

    // Deep-link to a specific case (#case-...)
    const resolveFromHash = () => {
      const m = location.hash.match(/^#case-([a-z-]+)$/);
      if (!m) return -1;
      return tabs.findIndex(t => t.dataset.target === m[1] || t.getAttribute('aria-controls') === `panel-${m[1]}`);
    };

    const initialIndex = resolveFromHash();
    activate(initialIndex >= 0 ? initialIndex : 0);

    window.addEventListener('hashchange', () => {
      const idx = resolveFromHash();
      if (idx >= 0) activate(idx);
    });
  };
  // ---------- country recovery-rate bar chart ----------
  let budgetData = null, timelineData = null;
  const renderCountryChart = async (lang = currentLang) => {
    const host = $('#country-chart');
    if (!host || typeof d3 === 'undefined') return;
    host.innerHTML = '';
    let data;
    try {
      const res = await fetch('assets/country-data.json');
      data = await res.json();
    } catch (e) { host.textContent = t('chart_country_error', lang); return; }
    const rates = data.rates.slice().sort((a, b) => b.rate - a.rate);
    const w = host.clientWidth || 600;
    const rowH = 32, padL = 110, padR = 70;
    const h = rates.length * rowH + 24;
    const svg = d3.select(host).append('svg')
      .attr('viewBox', `0 0 ${w} ${h}`).attr('role','img')
      .attr('aria-label', t('chart_country_aria', lang));
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

  // ---------- budget renderer helpers ----------
  const fundingStatusText = (source) => {
    const s = source.toLowerCase();
    if (s.includes('pridco')) return 'Asegurado';
    if (s.includes('drs')) return 'Pendiente legislativo';
    if (s.includes('anchor')) return 'LOI';
    if (s.includes('eib') || s.includes('idb')) return 'En aplicación';
    if (s.includes('swifr')) return 'Competitivo';
    if (s.includes('45x') || s.includes('ira')) return 'IRS final 2024';
    if (s.includes('carbon') || s.includes('verra') || s.includes('gold standard')) return 'Voluntario';
    return '—';
  };
  const trunc140 = (str) => {
    if (!str || str.length <= 140) return str || '';
    return str.slice(0, 137).trimEnd() + '…';
  };

  const renderRevenueChart = (lang = currentLang) => {
    if (!budgetData) return;
    const host = $('#budget-revenue-line');
    if (!host || typeof d3 === 'undefined') return;
    host.innerHTML = '';
    const rev = budgetData.revenueAnnual.medium.total;
    const opex = budgetData.opexAnnual.medium.total;
    const years = [1, 2, 3, 4, 5];
    const rows = years.map(y => ({ year: y, revenue: rev, opex }));

    const w = host.clientWidth || 500;
    const h = 220, padL = 56, padR = 24, padT = 16, padB = 56;
    const svg = d3.select(host).append('svg')
      .attr('viewBox', `0 0 ${w} ${h}`).attr('role','img')
      .attr('aria-label', t('budget_revenue_aria', lang));
    const x = d3.scaleLinear().domain([1, 5]).range([padL, w - padR]);
    const y = d3.scaleLinear().domain([0, Math.max(rev, opex) * 1.1]).range([h - padB, padT]);

    const line = (accessor) => d3.line()
      .x(d => x(d.year))
      .y(d => y(accessor(d)))
      .curve(d3.curveMonotoneX);

    svg.append('g').attr('transform', `translate(0, ${h - padB})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => `${t('budget_year', lang) || 'Año'} ${d}`))
      .call(g => g.selectAll('text').attr('font-size', 11).attr('fill', '#475467'))
      .call(g => g.select('.domain').attr('stroke', '#cdd5df'));

    svg.append('g').attr('transform', `translate(${padL}, 0)`)
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => '$' + (d/1e6).toFixed(0) + 'M'))
      .call(g => g.selectAll('text').attr('font-size', 10).attr('fill', '#475467'))
      .call(g => g.select('.domain').attr('stroke', '#cdd5df'));

    const g = svg.append('g');
    g.append('path').datum(rows).attr('fill','none').attr('stroke', PALETTE[0]).attr('stroke-width', 2.5)
      .attr('d', line(d => d.revenue));
    g.append('path').datum(rows).attr('fill','none').attr('stroke', PALETTE[5]).attr('stroke-width', 2.5).attr('stroke-dasharray','6,4')
      .attr('d', line(d => d.opex));

    // dots
    g.selectAll('circle.rev').data(rows).join('circle').attr('class','rev')
      .attr('cx', d => x(d.year)).attr('cy', d => y(d.revenue))
      .attr('r', 3.5).attr('fill', PALETTE[0]);
    g.selectAll('circle.op').data(rows).join('circle').attr('class','op')
      .attr('cx', d => x(d.year)).attr('cy', d => y(d.opex))
      .attr('r', 3.5).attr('fill', PALETTE[5]);

    // legend
    const legend = svg.append('g').attr('transform', `translate(${padL + 8}, ${padT})`);
    const legItems = [
      { label: 'Ingresos', color: PALETTE[0] },
      { label: 'OPEX', color: PALETTE[5], dash: '6,4' },
    ];
    legItems.forEach((item, i) => {
      const lx = i * 90;
      legend.append('line').attr('x1', lx).attr('x2', lx + 18).attr('y1', 0).attr('y2', 0)
        .attr('stroke', item.color).attr('stroke-width', 2.5).attr('stroke-dasharray', item.dash || 'none');
      legend.append('text').attr('x', lx + 24).attr('y', 4)
        .attr('font-size', 11).attr('fill', '#1d2939').text(item.label);
    });
  };

  const renderScenariosTable = (lang = currentLang) => {
    if (!budgetData) return;
    const host = $('#budget-scenarios');
    if (!host) return;
    const scenarios = ['small', 'medium', 'large'];
    const metricRow = (key, label, vals) => {
      return `<tr><th scope="row">${label}</th>` +
        vals.map(v => `<td class="num">${v}</td>`).join('') + '</tr>';
    };
    const capex = s => fmt.usd0.format(budgetData.capex[s].total);
    const opex = s => fmt.usd0.format(budgetData.opexAnnual[s].total);
    const rev = s => {
      // budget-data.json only has revenueAnnual.medium (modeled in detail);
      // scale small/large by capacity ratio. Mark estimated rows.
      const cap = s === 'small' ? 5000 : (s === 'medium' ? 15000 : 40000);
      const leadCap = budgetData.scenario_lead_capacity_tonnes_yr || 15000;
      const r = budgetData.revenueAnnual[s] || budgetData.revenueAnnual.medium;
      const total = r.total * (cap / leadCap);
      return fmt.usd0.format(total);
    };
    const payback = s => {
      const m = budgetData.key_metrics[s] || budgetData.key_metrics.medium;
      return (m.payback_years ?? budgetData.key_metrics.medium.payback_years).toFixed(1);
    };
    const irr = s => (budgetData.key_metrics[s] || budgetData.key_metrics.medium).irr_20y || budgetData.key_metrics.medium.irr_20y;
    const jobs = s => (budgetData.key_metrics[s] || budgetData.key_metrics.medium).direct_fte || budgetData.key_metrics.medium.direct_fte;

    host.querySelector('tbody').innerHTML = [
      metricRow('capex', 'CAPEX total', scenarios.map(capex)),
      metricRow('opex', 'OPEX / año', scenarios.map(opex)),
      metricRow('revenue', 'Ingresos / año (bruto + auxiliar)', scenarios.map(rev)),
      metricRow('payback', 'Payback (años)', scenarios.map(payback)),
      metricRow('irr', 'IRR 20 años', scenarios.map(irr)),
      metricRow('jobs', 'Empleos (FTE directos)', scenarios.map(jobs)),
    ].join('');
  };

  const renderFundingTable = (lang = currentLang) => {
    if (!budgetData) return;
    const host = $('#funding-table');
    if (!host) return;
    const rows = budgetData.fundingSources.map(f => {
      const status = fundingStatusText(f.source);
      const risk = (f.confidence || f.sourcing_risk || 'MEDIUM').toUpperCase();
      const note = trunc140(f.note);
      return `<tr>
        <th scope="row">${f.source}</th>
        <td class="num">${(f.share * 100).toFixed(0)}%</td>
        <td class="num">$${(f.amount / 1e6).toFixed(1)} M</td>
        <td>${status}</td>
        <td>${risk}</td>
        <td class="note">${note}</td>
      </tr>`;
    }).join('');
    host.querySelector('tbody').innerHTML = rows;
  };

  const renderTimeline = (lang = currentLang) => {
    if (!timelineData) return;
    const host = $('#timeline-list');
    if (!host) return;
    host.innerHTML = timelineData.phases.map((p, i) => {
      const span = lang === 'en' ? p.span_en : p.span_es;
      return `<li class="timeline-item" id="${p.id}">
        <div class="timeline-dot" aria-hidden="true">${String(i + 1).padStart(2, '0')}</div>
        <div class="timeline-card">
          <h3>${p.title}</h3>
          <p class="timeline-span">${span}</p>
          <ul>${p.milestones.map(m => `<li>${m}</li>`).join('')}</ul>
        </div>
      </li>`;
    }).join('');
    host.querySelectorAll('.timeline-item').forEach(el => el.classList.add('is-visible'));
  };

  // ---------- budget charts ----------
  const initBudgetCharts = async () => {
    if (typeof d3 === 'undefined') return;
    let data;
    try {
      const res = await fetch('assets/budget-data.json');
      data = await res.json();
    } catch (e) { return; }
    budgetData = data;
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
      const h = 320, padL = 130, padR = 30, padT = 24, padB = 60;
      const svg = d3.select(bar).append('svg')
        .attr('viewBox', `0 0 ${w} ${h}`).attr('role','img')
        .attr('aria-label','CAPEX by scenario, stacked by category');
      const x = d3.scaleBand().domain(scenarios).range([padL, w - padR]).padding(0.3);
      const yMax = d3.max(scenarioCapex, d => d.total) * 1.18;
      const y = d3.scaleLinear().domain([0, yMax]).range([h - padB, padT]);
      // Use the medium scenario's line items as the canonical list (only scenario with full breakdown)
      const medium = scenarioCapex.find(s => s.id === data.scenario_lead || s.id === 'medium') || scenarioCapex[0];
      const cats = (medium.lines || []).map(l => l.category);
      // For each scenario, sum amounts by category (fall back to medium's distribution for scenarios without line items)
      const grouped = scenarioCapex.map((s, sIdx) => {
        let amounts;
        if (s.lines && s.lines.length) {
          const map = new Map(s.lines.map(l => [l.category, l.amount]));
          amounts = cats.map(c => map.get(c) || 0);
        } else {
          const ratio = s.total / medium.total;
          amounts = (medium.lines || []).map(l => l.amount * ratio);
        }
        return { scenarioId: s.id, scenarioIdx: sIdx, amounts };
      });
      const stack = d3.stack().keys(cats)
        .value((d, key) => {
          // Map category → amount within this scenario
          const catIdx = cats.indexOf(key);
          return catIdx >= 0 ? (d.amounts[catIdx] || 0) : 0;
        });
      const series = stack(grouped);
      svg.append('g').selectAll('g').data(series).join('g')
        .attr('fill', (d, i) => PALETTE[i % PALETTE.length])
        .selectAll('rect').data((d, gi) => d.map((v, ri) => ({
          x: x(grouped[ri].scenarioId),
          y0: y(v[0]),
          y1: y(v[1]),
          width: x.bandwidth(),
          key: d.key,
          amount: v[1] - v[0],
        }))).join('rect')
        .attr('x', d => d.x)
        .attr('y', d => Number.isFinite(d.y1) ? d.y1 : 0)
        .attr('height', d => Number.isFinite(d.y0) && Number.isFinite(d.y1) ? Math.max(0, d.y0 - d.y1) : 0)
        .attr('width', d => d.width)
        .append('title').text(d => `${d.key}\n${fmt.usd0.format(d.amount)}`);
      // X axis
      const xLabels = { small: t('budget_scenarios_small_short', currentLang) || (currentLang === 'en' ? 'Small' : 'Pequeño'),
                        medium: t('budget_scenarios_medium_short', currentLang) || (currentLang === 'en' ? 'Medium' : 'Mediano'),
                        large: t('budget_scenarios_large_short', currentLang) || (currentLang === 'en' ? 'Large' : 'Grande') };
      svg.append('g').attr('transform', `translate(0, ${h - padB})`)
        .call(d3.axisBottom(x).tickFormat(id => xLabels[id] || id))
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
      const perT = opex.total_per_t || Math.round(opex.total / data.scenario_lead_capacity_tonnes_yr);
      const rows = opex.lines.map(l => `
        <tr>
          <th scope="row">${l.category}</th>
          <td class="num">${fmt.usd0.format(l.amount)}</td>
          <td class="num">${fmt.usd0.format(Math.round(l.amount / data.scenario_lead_capacity_tonnes_yr))}</td>
          <td class="num pct">${(l.amount / opex.total * 100).toFixed(0)}%</td>
        </tr>`).join('');
      tbl.innerHTML = `
        <caption>Annual OPEX, ${lead} scenario · total <strong>${fmt.usd0.format(opex.total)}</strong>
          (${fmt.usd0.format(perT)}/t)</caption>
        <thead><tr><th scope="col">Line</th><th scope="col" class="num">USD/yr</th><th scope="col" class="num">$/t</th><th scope="col" class="num">%</th></tr></thead>
        <tbody>${rows}</tbody>`;
    }

    // ----- Revenue line/bar -----
    const rline = $('#budget-revenue-line');
    if (rline) {
      rline.innerHTML = '';
      renderRevenueChart();
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
      // Keep allMetrics for potential future use; render via shared function
    }
    renderScenariosTable();

    // ----- Funding table -----
    const ftbl = $('#funding-table');
    if (ftbl && data.fundingSources) {
      renderFundingTable();
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
        .append('title').text(d => `${d.source}\n${fmt.usd0.format(d.amount)} (${(d.share*100).toFixed(0)}%) — ${d.confidence}`);
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
    const host = $('#timeline-list');
    if (!host) return;
    try {
      const res = await fetch('assets/timeline-data.json');
      timelineData = (await res.json());
    } catch (e) { return; }
    renderTimeline();
  };

  // ---------- flip cards (a11y + reduced motion) ----------
  const initFlipCards = () => {
    const cards = $$('.flip-card');
    if (!cards.length) return;
    cards.forEach(card => {
      const toggle = () => {
        const flipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-pressed', String(flipped));
      };
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
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
  document.addEventListener('DOMContentLoaded', async () => {
    await loadTranslations();
    initNav();
    initI18n();
    applyLang(currentLang);
    initScrollspy();
    initCaseTabs();
    initFlipCards();
    renderCountryChart(currentLang);
    initBudgetCharts();
    initMap();
    initTimeline();
    initFootnotes();
  });
})();
