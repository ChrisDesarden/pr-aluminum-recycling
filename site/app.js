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
  // Semantic chart palette — 4-color editorial family.
  // brand=teal (PR / primary data), light=light teal (alt / lead category),
  // amber=amber (target / highlight), gray=warm gray (context / fallback).
  const CHART_PALETTE = ['#0c5c8a', '#1f8fb8', '#5fb8d3', '#f5a524', '#d6c25a', '#e89c52', '#94a3b8', '#cbd5e1'];
  // 6-color brand-aligned ramp for CAPEX/funding categories
  const donutColor = (i) => CHART_PALETTE[i % CHART_PALETTE.length];
  // For 2-3 category charts, use only the first 2-3 slots
  const fundingColor = (i) => {
    // 0=largest=teal, 1=second=light teal, 2+=amber, 3+=gray
    if (i === 0) return '#0c5c8a';
    if (i === 1) return '#1f8fb8';
    if (i === 2) return '#5fb8d3';
    if (i === 3) return '#f5a524';
    if (i === 4) return '#d6c25a';
    return '#94a3b8';
  };
  // For stacked bar (CAPEX scenarios): same 6-color scheme as donut
  const capexColor = (i) => donutColor(i);

  // ---------- i18n ----------
  let currentLang = document.documentElement.lang || 'es';
  let translations = {};
  const loadTranslations = async () => {
    try {
      // Cache-bust — translations evolve frequently during i18n polish
      const res = await fetch(`assets/translations.json?v=${Date.now()}`);
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
    renderCases(lang);
    renderBudgetLegends(lang);
    $$('.lang-btn').forEach(btn => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
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
    const w = Math.min(host.clientWidth || 600, 720);
    const rowH = 30, padL = 96, padR = 92, padT = 28, padB = 44;
    const h = rates.length * rowH + padT + padB;
    const svg = d3.select(host).append('svg')
      .attr('viewBox', `0 0 ${w} ${h}`).attr('width', w).attr('height', h).attr('role','img')
      .attr('aria-label', t('chart_country_aria', lang));
    const x = d3.scaleLinear().domain([0, 1]).range([0, w - padL - padR]);
    const y = d3.scaleBand().domain(rates.map(d => d.iso)).range([padT, padT + rates.length * rowH]).padding(0.25);

    // Horizontal gridlines at 0, 25, 50, 75, 100%
    const gridG = svg.append('g').attr('class', 'gridlines');
    [0, 0.25, 0.5, 0.75, 1].forEach(v => {
      gridG.append('line').attr('class', 'gridline')
        .attr('x1', padL + x(v)).attr('x2', padL + x(v))
        .attr('y1', padT - 6).attr('y2', padT + rates.length * rowH)
        .attr('stroke', '#e4dcc4').attr('stroke-dasharray', '2 4').attr('opacity', 0.7);
    });

    // X axis with percent ticks
    const xAxis = svg.append('g').attr('class', 'axis')
      .attr('transform', `translate(${padL}, ${padT + rates.length * rowH})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format('.0%')));
    xAxis.selectAll('text').attr('font-size', 11).attr('fill', '#6b7c93');
    xAxis.select('.domain').attr('stroke', '#d6cbb4');
    xAxis.selectAll('.tick line').attr('stroke', '#d6cbb4');

    // X axis title
    svg.append('text').attr('class', 'axis-title')
      .attr('x', padL + (w - padL - padR) / 2).attr('y', h - 6)
      .attr('text-anchor', 'middle')
      .text(t('chart_country_axis', lang) || (lang === 'en' ? 'Reported recovery rate' : 'Tasa de recuperación reportada'));

    // Y axis (country labels)
    const yAxis = svg.append('g').attr('class', 'axis')
      .attr('transform', `translate(${padL}, 0)`)
      .call(d3.axisLeft(y).tickSize(0));
    yAxis.select('.domain').remove();
    yAxis.selectAll('text').attr('font-size', 12).attr('fill', '#0d1b2a').attr('font-weight', 600);

    const rows = svg.append('g').attr('transform', `translate(${padL}, 0)`);
    // Bars — semantic colors: PR current=red (status quo pain), PR target=amber
    // (the goal), leader=light teal (standout), others=warm gray gradient
    const colorFor = (d, i) => {
      if (d.iso === 'PR' && d.isCurrent) return '#c45a4a';
      if (d.iso === 'PR' && d.isTarget)  return '#f5a524';
      if (i === 0)                        return '#1f8fb8'; // leader gets light teal
      return '#cbd5e1';
    };
    rows.selectAll('rect.bar').data(rates).join('rect')
      .attr('class', 'bar')
      .attr('x', 0).attr('y', d => y(d.iso))
      .attr('height', y.bandwidth())
      .attr('width', d => x(d.rate))
      .attr('fill', (d, i) => colorFor(d, i))
      .attr('rx', 4)
      .append('title').text(d => `${d.name}\n${fmt.pct1(d.rate)} (${d.mechanism})`);
    // Value labels to the right of each bar
    rows.selectAll('text.value-label').data(rates).join('text')
      .attr('class', d => d.isTarget ? 'value-label value-label--accent' : 'value-label value-label--lead')
      .attr('x', d => x(d.rate) + 8)
      .attr('y', d => y(d.iso) + y.bandwidth() / 2 + 4)
      .attr('font-size', 11).attr('font-weight', 700)
      .text(d => fmt.pct1(d.rate));
  };

  // ---------- budget renderer helpers ----------
  // Returns an i18n key for a funding source's status (not the translated string)
  const fundingStatusKey = (source) => {
    const s = source.toLowerCase();
    if (s.includes('pridco')) return 'funding_status_assured';
    if (s.includes('drs')) return 'funding_status_pending_legislation';
    if (s.includes('anchor')) return 'funding_status_loi';
    if (s.includes('eib') || s.includes('idb')) return 'funding_status_applying';
    if (s.includes('swifr')) return 'funding_status_competitive';
    if (s.includes('45x') || s.includes('ira')) return 'funding_status_irs_final_2024';
    if (s.includes('carbon') || s.includes('verra') || s.includes('gold standard')) return 'funding_status_voluntary';
    return null;
  };
  // Returns an i18n key for a confidence/risk level. Strips parentheticals like "MEDIUM (note)".
  const riskLevelKey = (confidence) => {
    const c = (confidence || '').trim().toUpperCase();
    if (c.startsWith('LOW')) return 'funding_risk_low';
    if (c.startsWith('HIGH')) return 'funding_risk_high';
    if (c.startsWith('MEDIUM')) return 'funding_risk_medium';
    return null;
  };
  const sourceLabel = (f, lang) => {
    if (lang === 'en') return f.source_en || f.source;
    return f.source_es || f.source_en || f.source;
  };
  const trunc140 = (str) => {
    if (!str || str.length <= 140) return str || '';
    return str.slice(0, 137).trimEnd() + '…';
  };

  // ---------- case studies (jurisdictions) ----------
  // Pulls localized data from translations.case_studies[iso] and renders into .case-body[data-case="X"]
  const caseBadgeClass = (cls) => {
    if (cls === 'rate' || cls === 'scale' || cls === 'drs' || cls === 'no-drs') return `case-badge ${cls}`;
    return 'case-badge';
  };
  const escapeAttr = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const renderCases = (lang = currentLang) => {
    const data = translations[lang]?.case_studies;
    if (!data) return;
    const isos = Object.keys(data);
    for (const iso of isos) {
      const host = document.querySelector(`.case-body[data-case="${iso}"]`);
      if (!host) continue;
      const c = data[iso];
      const meta = (c.meta || []).map(b => `<span class="${caseBadgeClass(b.class)}">${escapeAttr(b.text)}</span>`).join('');
      const sections = (c.sections || []).map(sec => {
        const blocks = (sec.blocks || []).map(blk => {
          if (blk.type === 'p') return `<p>${blk.html}</p>`;
          if (blk.type === 'ul') return `<ul>${blk.items.map(it => `<li>${it}</li>`).join('')}</ul>`;
          return '';
        }).join('');
        return `<section class="case-section"><h4>${escapeAttr(sec.title)}</h4>${blocks}</section>`;
      }).join('');
      host.innerHTML = `<article class="case-report"><div class="case-meta">${meta}</div>${sections}</article>`;
    }
  };

  // Localized label for a CAPEX/OPEX category. Falls back to the canonical English string.
  const categoryLabel = (key, kind, lang = currentLang) => {
    const map = t(`chart_categories_${kind}`, lang);
    if (map && Object.prototype.hasOwnProperty.call(map, key)) return map[key];
    return key;
  };

  // Re-render just the legends (i18n-only) for the budget charts.
  // The SVGs are fixed on initial load; legends need language swap.
  const renderOpexTable = (lang = currentLang) => {
    if (!budgetData) return;
    const tbl = $('#budget-opex-table');
    if (!tbl) return;
    const lead = budgetData.scenario_lead || 'medium';
    const opex = budgetData.opexAnnual[lead];
    const perT = opex.total_per_t || Math.round(opex.total / budgetData.scenario_lead_capacity_tonnes_yr);
    const rows = opex.lines.map(l => `
      <tr>
        <th scope="row">${categoryLabel(l.category, 'opex', lang)}</th>
        <td class="num">${fmt.usd0.format(l.amount)}</td>
        <td class="num">${fmt.usd0.format(Math.round(l.amount / budgetData.scenario_lead_capacity_tonnes_yr))}</td>
        <td class="num pct">${(l.amount / opex.total * 100).toFixed(0)}%</td>
      </tr>`).join('');
    const leadLabel = t(`budget_scenarios_${lead}_short`, lang) || lead;
    tbl.innerHTML = `
      <caption>${t('budget_opex_caption_short', lang).replace('{scenario}', leadLabel)} <strong>${fmt.usd0.format(opex.total)}</strong> (${fmt.usd0.format(perT)}/t)</caption>
      <thead><tr><th scope="col">${t('budget_opex_col_category', lang)}</th><th scope="col" class="num">${t('budget_opex_col_usdyr', lang)}</th><th scope="col" class="num">${t('budget_opex_col_per_t', lang)}</th><th scope="col" class="num">${t('budget_opex_col_pct', lang)}</th></tr></thead>
      <tbody>${rows}</tbody>`;
  };

  const renderBudgetLegends = (lang = currentLang) => {
    if (!budgetData) return;
    // Re-render the OPEX table body (categories need lang swap)
    renderOpexTable(lang);
    const lead = budgetData.scenario_lead || 'medium';
    const capex = budgetData.capex[lead];
    // Donut legend (medium scenario, 13 lines)
    const donutLg = $('#budget-donut-legend');
    if (donutLg && capex.lines) {
      donutLg.innerHTML = capex.lines.map((l, i) =>
        `<li class="item"><span class="sw" style="background:${PALETTE[i % PALETTE.length]}"></span><span>${categoryLabel(l.category, 'capex', lang)}</span></li>`
      ).join('');
    }
    // Capex bar legend (categories from medium breakdown)
    const barLg = $('#budget-capex-legend');
    if (barLg && capex.lines) {
      const cats = capex.lines.map(l => l.category);
      barLg.innerHTML = cats.map((c, i) =>
        `<li class="item"><span class="sw" style="background:${PALETTE[i % PALETTE.length]}"></span><span>${categoryLabel(c, 'capex', lang)}</span></li>`
      ).join('');
    }
    // Revenue chart legend
    const revLg = $('#budget-revenue-legend');
    if (revLg) {
      const items = [
        { label: t('chart_legend_revenue', lang), color: PALETTE[0] },
        { label: t('chart_legend_opex', lang),     color: PALETTE[5] },
      ];
      revLg.innerHTML = items.map(it =>
        `<li class="item"><span class="sw" style="background:${it.color}"></span><span>${it.label}</span></li>`
      ).join('');
    }
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

    const w = Math.min(host.clientWidth || 500, 720);
    const h = 240, padL = 64, padR = 110, padT = 24, padB = 48;
    const svg = d3.select(host).append('svg')
      .attr('viewBox', `0 0 ${w} ${h}`).attr('width', w).attr('height', h).attr('role','img')
      .attr('aria-label', t('budget_revenue_aria', lang));
    const x = d3.scaleLinear().domain([1, 5]).range([padL, w - padR]);
    const yMax = Math.max(rev, opex) * 1.15;
    const y = d3.scaleLinear().domain([0, yMax]).range([h - padB, padT]);

    // Horizontal gridlines
    const gridG = svg.append('g').attr('class', 'gridlines');
    y.ticks(5).forEach(v => {
      gridG.append('line').attr('class', 'gridline')
        .attr('x1', padL).attr('x2', w - padR)
        .attr('y1', y(v)).attr('y2', y(v))
        .attr('stroke', '#e4dcc4').attr('stroke-dasharray', '2 4').attr('opacity', 0.7);
    });

    // Soft area under revenue (visual emphasis: revenue is the headline number)
    const areaGen = d3.area()
      .x(d => x(d.year))
      .y0(y(0))
      .y1(d => y(d.revenue))
      .curve(d3.curveMonotoneX);
    svg.append('path').datum(rows)
      .attr('class', 'series-area')
      .attr('fill', '#0c5c8a')
      .attr('opacity', 0.10)
      .attr('d', areaGen);

    // X axis
    const xAxis = svg.append('g').attr('class', 'axis')
      .attr('transform', `translate(0, ${h - padB})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => `${t('budget_year', lang) || 'Año'} ${d}`));
    xAxis.selectAll('text').attr('font-size', 11).attr('fill', '#6b7c93');
    xAxis.select('.domain').attr('stroke', '#d6cbb4');
    xAxis.selectAll('.tick line').attr('stroke', '#d6cbb4');
    svg.append('text').attr('class', 'axis-title')
      .attr('x', padL + (w - padL - padR) / 2).attr('y', h - 8)
      .attr('text-anchor', 'middle')
      .text(t('chart_budget_revenue_axis', lang) || (lang === 'en' ? 'Operating years' : 'Años operativos'));

    // Y axis
    const yAxis = svg.append('g').attr('class', 'axis')
      .attr('transform', `translate(${padL}, 0)`)
      .call(d3.axisLeft(y).ticks(5).tickFormat(d => '$' + (d/1e6).toFixed(0) + 'M'));
    yAxis.selectAll('text').attr('font-size', 10).attr('fill', '#6b7c93');
    yAxis.select('.domain').attr('stroke', '#d6cbb4');
    yAxis.selectAll('.tick line').attr('stroke', '#d6cbb4');
    svg.append('text').attr('class', 'axis-title')
      .attr('transform', `translate(14, ${padT + (h - padT - padB) / 2}) rotate(-90)`)
      .attr('text-anchor', 'middle')
      .text(t('budget_axis_y', lang) || (lang === 'en' ? 'Annual USD' : 'USD anual'));

    // Lines
    const lineGen = (accessor) => d3.line()
      .x(d => x(d.year)).y(d => y(accessor(d)))
      .curve(d3.curveMonotoneX);
    svg.append('path').datum(rows)
      .attr('class', 'series-line')
      .attr('stroke', '#0c5c8a')
      .attr('d', lineGen(d => d.revenue));
    svg.append('path').datum(rows)
      .attr('class', 'series-line')
      .attr('stroke', '#f5a524')
      .attr('stroke-dasharray', '6,4')
      .attr('d', lineGen(d => d.opex));

    // Dots
    svg.selectAll('circle.rev').data(rows).join('circle')
      .attr('class', 'series-dot')
      .attr('cx', d => x(d.year)).attr('cy', d => y(d.revenue))
      .attr('r', 4).attr('fill', '#0c5c8a');
    svg.selectAll('circle.op').data(rows).join('circle')
      .attr('class', 'series-dot')
      .attr('cx', d => x(d.year)).attr('cy', d => y(d.opex))
      .attr('r', 4).attr('fill', '#f5a524');

    // Direct labels at line ends
    const lastX = x(5);
    svg.append('text').attr('class', 'series-label series-label--revenue')
      .attr('x', lastX + 10).attr('y', y(rev) + 4)
      .text(`${t('chart_legend_revenue', lang)}  $${(rev/1e6).toFixed(1)}M`);
    svg.append('text').attr('class', 'series-label series-label--opex')
      .attr('x', lastX + 10).attr('y', y(opex) + 4)
      .text(`${t('chart_legend_opex', lang)}  $${(opex/1e6).toFixed(1)}M`);
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
      const statusKey = fundingStatusKey(f.source);
      const status = statusKey ? t(statusKey, lang) : '—';
      const riskKey = riskLevelKey(f.confidence);
      const risk = riskKey ? t(riskKey, lang) : (f.confidence || '—');
      const note = trunc140(f.note);
      return `<tr>
        <th scope="row">${escapeAttr(sourceLabel(f, lang))}</th>
        <td class="num">${(f.share * 100).toFixed(0)}%</td>
        <td class="num">$${(f.amount / 1e6).toFixed(1)} M</td>
        <td>${escapeAttr(status)}</td>
        <td>${escapeAttr(risk)}</td>
        <td class="note">${note}</td>
      </tr>`;
    }).join('');
    host.querySelector('tbody').innerHTML = rows;
    // Also localize the <thead> if present
    const head = host.querySelector('thead');
    if (head) {
      head.innerHTML = `<tr>
        <th scope="col">${t('funding_table_col_source', lang)}</th>
        <th scope="col" class="num">${t('funding_table_col_share', lang)}</th>
        <th scope="col" class="num">${t('funding_table_col_amount', lang)}</th>
        <th scope="col">${t('funding_table_col_status', lang)}</th>
        <th scope="col">${t('funding_table_col_risk', lang)}</th>
        <th scope="col">${t('funding_table_col_note', lang)}</th>
      </tr>`;
    }
  };

  const renderTimeline = (lang = currentLang) => {
    if (!timelineData) return;
    const host = $('#timeline-list');
    if (!host) return;
    // Always trust currentLang as source of truth — prevents any race where
    // a stale lang param would render English content in ES mode
    const useLang = currentLang;
    host.innerHTML = timelineData.phases.map((p, i) => {
      const span = useLang === 'en' ? p.span_en : p.span_es;
      const title = useLang === 'en' ? (p.title_en || p.title) : (p.title_es || p.title_en || p.title);
      const milestones = useLang === 'en' ? p.milestones : (p.milestones_es || p.milestones);
      return `<li class="timeline-item" id="${p.id}">
        <div class="timeline-dot" aria-hidden="true">${String(i + 1).padStart(2, '0')}</div>
        <div class="timeline-card">
          <h3>${title}</h3>
          <p class="timeline-span">${span}</p>
          <ul>${milestones.map(m => `<li>${m}</li>`).join('')}</ul>
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
      const res = await fetch(`assets/budget-data.json?v=${Date.now()}`);
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
      const w = donut.clientWidth || 360, size = Math.min(w, 320);
      const r = size/2 - 4, ir = r - 52;
      const svg = d3.select(donut).append('svg')
        .attr('viewBox', `0 0 ${size} ${size}`)
        .attr('width', size).attr('height', size)
        .attr('role','img')
        .attr('aria-label', `CAPEX composition for ${lead} scenario`);
      const g = svg.append('g').attr('transform', `translate(${size/2}, ${size/2})`);
      const pie = d3.pie().value(d => d.amount).sort(null);
      const arc = d3.arc().innerRadius(ir).outerRadius(r).cornerRadius(2).padAngle(0.012);
      const arcs = g.selectAll('path').data(pie(capex.lines)).join('path')
        .attr('class', 'donut-arc')
        .attr('d', arc).attr('fill', (d, i) => donutColor(i))
        .attr('stroke','#fff').attr('stroke-width', 2);
      arcs.append('title').text(d => `${categoryLabel(d.data.category, 'capex', currentLang)}\n${fmt.usd0.format(d.data.amount)}`);
      g.append('text').attr('class', 'center-sub')
        .attr('text-anchor','middle').attr('y', -18)
        .text(t('budget_donut_eyebrow', currentLang) || (currentLang === 'en' ? 'Total CAPEX' : 'CAPEX total'));
      g.append('text').attr('class', 'center-label')
        .attr('text-anchor','middle').attr('y', 8)
        .text(fmt.usd0.format(capex.total));
      g.append('text').attr('class', 'center-outer')
        .attr('text-anchor','middle').attr('y', 28)
        .text(`${lead} · ${fmt.usd0.format(km.capex_per_t)}/t`);

      // Legend (chip-row format, no amt/pct — those are in caption)
      const legend = $('#budget-donut-legend');
      if (legend) {
        legend.innerHTML = capex.lines.map((l, i) => `
          <li class="item"><span class="sw" style="background:${donutColor(i)}"></span><span>${categoryLabel(l.category, 'capex', currentLang)}</span></li>
        `).join('');
      }
    }

    // ----- CAPEX stacked bar (3 scenarios) -----
    const bar = $('#budget-capex-bar');
    if (bar) {
      // Build a unified line-item set across scenarios for stacking
      const scenarios = data.scenarios;
      const scenarioCapex = scenarios.map(s => ({ id: s, ...data.capex[s] }));
      const w = Math.min(bar.clientWidth || 600, 720);
      const h = 260, padL = 130, padR = 30, padT = 24, padB = 56;
      const svg = d3.select(bar).append('svg')
        .attr('viewBox', `0 0 ${w} ${h}`).attr('width', w).attr('height', h).attr('role','img')
        .attr('aria-label','CAPEX by scenario, stacked by category');
      const x = d3.scaleBand().domain(scenarios).range([padL, w - padR]).padding(0.4);
      const yMax = d3.max(scenarioCapex, d => d.total) * 1.22;
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
          const catIdx = cats.indexOf(key);
          return catIdx >= 0 ? (d.amounts[catIdx] || 0) : 0;
        });
      const series = stack(grouped);

      // Horizontal gridlines (subtle, behind the bars)
      const gridG = svg.append('g').attr('class', 'gridlines');
      y.ticks(5).forEach(v => {
        gridG.append('line').attr('class', 'gridline')
          .attr('x1', padL).attr('x2', w - padR)
          .attr('y1', y(v)).attr('y2', y(v))
          .attr('stroke', '#e4dcc4').attr('stroke-dasharray', '2 4').attr('opacity', 0.7);
      });

      svg.append('g').selectAll('g').data(series).join('g')
        .attr('fill', (d, i) => capexColor(i))
        .selectAll('rect').data((d, gi) => d.map((v, ri) => ({
          x: x(grouped[ri].scenarioId),
          y0: y(v[0]),
          y1: y(v[1]),
          width: x.bandwidth(),
          key: d.key,
          amount: v[1] - v[0],
        }))).join('rect')
        .attr('class', 'bar')
        .attr('x', d => d.x)
        .attr('y', d => Number.isFinite(d.y1) ? d.y1 : 0)
        .attr('height', d => Number.isFinite(d.y0) && Number.isFinite(d.y1) ? Math.max(0, d.y0 - d.y1) : 0)
        .attr('width', d => d.width)
        .attr('rx', 2)
        .append('title').text(d => `${categoryLabel(d.key, 'capex', currentLang)}\n${fmt.usd0.format(d.amount)}`);
      // X axis
      const xLabels = { small: t('budget_scenarios_small_short', currentLang) || (currentLang === 'en' ? 'Small' : 'Pequeño'),
                        medium: t('budget_scenarios_medium_short', currentLang) || (currentLang === 'en' ? 'Medium' : 'Mediano'),
                        large: t('budget_scenarios_large_short', currentLang) || (currentLang === 'en' ? 'Large' : 'Grande') };
      const xAxis = svg.append('g').attr('class', 'axis')
        .attr('transform', `translate(0, ${h - padB})`)
        .call(d3.axisBottom(x).tickFormat(id => xLabels[id] || id));
      xAxis.selectAll('text').attr('font-size', 12).attr('fill', '#0d1b2a').attr('font-weight', 600);
      xAxis.select('.domain').attr('stroke', '#d6cbb4');
      xAxis.selectAll('.tick line').attr('stroke', '#d6cbb4');
      // Y axis
      const yAxis = svg.append('g').attr('class', 'axis')
        .attr('transform', `translate(${padL}, 0)`)
        .call(d3.axisLeft(y).ticks(5).tickFormat(d => fmt.usd0.format(d).replace('$','$')));
      yAxis.selectAll('text').attr('font-size', 10).attr('fill', '#6b7c93');
      yAxis.select('.domain').attr('stroke', '#d6cbb4');
      yAxis.selectAll('.tick line').attr('stroke', '#d6cbb4');
      // Y axis title
      svg.append('text').attr('class', 'axis-title')
        .attr('transform', `translate(14, ${padT + (h - padT - padB) / 2}) rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(t('chart_budget_capex_axis', currentLang) || (currentLang === 'en' ? 'Total CAPEX (USD)' : 'CAPEX total (USD)'));
      // Total labels on top
      svg.append('g').selectAll('text').data(scenarioCapex).join('text')
        .attr('class', 'total-label')
        .attr('x', d => x(d.id) + x.bandwidth()/2)
        .attr('y', d => y(d.total) - 8)
        .attr('text-anchor','middle')
        .text(d => fmt.usd0.format(d.total));
      // Legend (chip-row format)
      const legend = $('#budget-capex-legend');
      if (legend) {
        legend.innerHTML = cats.map((c, i) =>
          `<li class="item"><span class="sw" style="background:${capexColor(i)}"></span><span>${categoryLabel(c, 'capex', currentLang)}</span></li>`
        ).join('');
      }
    }

    // ----- OPEX table (medium) -----
    renderOpexTable();

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
      const w = Math.min(fs.clientWidth || 600, 720), h = 200, padL = 220, padR = 100, padT = 8, padB = 8;
      const total = d3.sum(data.fundingSources, d => d.amount);
      const svg = d3.select(fs).append('svg')
        .attr('viewBox', `0 0 ${w} ${h}`).attr('width', w).attr('height', h).attr('role','img')
        .attr('aria-label', `Funding stack: ${fmt.usd0.format(total)} across ${data.fundingSources.length} sources`);
      const y = d3.scaleBand().domain(data.fundingSources.map(d => sourceLabel(d, currentLang))).range([padT, h - padB]).padding(0.28);
      const x = d3.scaleLinear().domain([0, total]).range([0, w - padL - padR]);

      // Faint gridlines (vertical, at 25/50/75/100% of total)
      const gridG = svg.append('g').attr('class', 'gridlines');
      [0.25, 0.5, 0.75, 1].forEach(v => {
        gridG.append('line').attr('class', 'gridline')
          .attr('x1', padL + x(total * v)).attr('x2', padL + x(total * v))
          .attr('y1', padT - 2).attr('y2', h - padB + 2)
          .attr('stroke', '#e4dcc4').attr('stroke-dasharray', '2 4').attr('opacity', 0.7);
      });

      svg.append('g').selectAll('rect').data(data.fundingSources).join('rect')
        .attr('class', 'bar')
        .attr('x', padL).attr('y', d => y(sourceLabel(d, currentLang)))
        .attr('height', y.bandwidth()).attr('width', d => x(d.amount))
        .attr('fill', (d, i) => fundingColor(i))
        .attr('rx', 3)
        .append('title').text(d => `${sourceLabel(d, currentLang)}\n${fmt.usd0.format(d.amount)} (${(d.share*100).toFixed(0)}%) — ${riskLevelKey(d.confidence) ? t(riskLevelKey(d.confidence), currentLang) : d.confidence}`);
      svg.append('g').selectAll('text.lbl').data(data.fundingSources).join('text')
        .attr('class','lbl')
        .attr('x', padL - 8).attr('y', d => y(sourceLabel(d, currentLang)) + y.bandwidth()/2 + 4)
        .attr('text-anchor','end').attr('font-size', 12).attr('font-weight', 600).attr('fill', '#0d1b2a')
        .text(d => sourceLabel(d, currentLang));
      svg.append('g').selectAll('text.amt').data(data.fundingSources).join('text')
        .attr('class','value-label')
        .attr('x', d => padL + x(d.amount) + 6)
        .attr('y', d => y(sourceLabel(d, currentLang)) + y.bandwidth()/2 + 4)
        .attr('font-size', 11).attr('font-weight', 700)
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
      // Cache-bust the data fetch — the timeline is small and changes often
      const res = await fetch(`assets/timeline-data.json?v=${Date.now()}`);
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
    initScrollspy();
    initCaseTabs();
    initFlipCards();
    renderCountryChart(currentLang);
    initMap();
    initTimeline();
    initFootnotes();
    await initBudgetCharts();  // populates budgetData + renders the chart-figures
    applyLang(currentLang);     // translates the static DOM + refreshes budget legends now that budgetData exists
  });
})();
