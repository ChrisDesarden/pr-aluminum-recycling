const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const projectRoot = path.resolve(__dirname, '../..');
  const outLog = path.join(projectRoot, 'tools', 'puppeteer', 'test-site.log.json');
  const logs = [];
  const errors = [];
  const pageErrors = [];

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  page.on('console', msg => {
    const entry = { type: msg.type(), text: msg.text(), location: msg.location() };
    logs.push(entry);
    console.log(`[console.${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', err => {
    pageErrors.push(err.message);
    console.error(`[pageerror] ${err.message}`);
  });

  page.on('response', response => {
    if (response.status() >= 400) {
      errors.push({ resource: response.url(), status: response.status() });
      console.error(`[response error] ${response.status()} ${response.url()}`);
    }
  });

  page.on('requestfailed', request => {
    errors.push({ resource: request.url(), failure: request.failure().errorText });
    console.error(`[requestfailed] ${request.url()} : ${request.failure().errorText}`);
  });

  try {
    await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle2', timeout: 60000 });

    // Wait for d3 chart
    await page.waitForSelector('#country-chart svg', { timeout: 10000 });

    const tabs = await page.$$('[role="tab"]');
    const tabTexts = await Promise.all(tabs.map(t => t.evaluate(el => el.textContent.trim())));
    console.log('Tabs found:', tabTexts);

    const results = [];
    for (let i = 0; i < tabs.length; i++) {
      await tabs[i].click();
      await sleep(300);
      const activePanelId = await page.evaluate(() => {
        const active = document.querySelector('[role="tabpanel"]:not([hidden])');
        return active ? active.id : null;
      });
      const activeTab = await tabs[i].evaluate(el => ({
        text: el.textContent.trim(),
        selected: el.getAttribute('aria-selected'),
        controls: el.getAttribute('aria-controls'),
      }));
      results.push({ clicked: activeTab.text, activePanelId, selected: activeTab.selected, controls: activeTab.controls });
    }

    const chartData = await page.evaluate(() => {
      const rects = Array.from(document.querySelectorAll('#country-chart rect'));
      return rects.map(r => ({
        width: r.getAttribute('width'),
        fill: r.getAttribute('fill'),
      }));
    });

    const jsonCountryData = await (await fetch('http://127.0.0.1:8765/assets/country-data.json')).json();

    await fs.promises.writeFile(outLog, JSON.stringify({ logs, pageErrors, networkErrors: errors, tabs: results, chartRects: chartData, countryDataRates: jsonCountryData.rates.map(r => ({ iso: r.iso, rate: r.rate, name: r.name })) }, null, 2));

    console.log('\n=== TAB RESULTS ===');
    console.log(JSON.stringify(results, null, 2));
    console.log('\n=== PAGE ERRORS ===');
    console.log(pageErrors.length ? pageErrors.join('\n') : 'None');
    console.log('\n=== NETWORK ERRORS ===');
    console.log(errors.length ? JSON.stringify(errors, null, 2) : 'None');

    const allOk = pageErrors.length === 0 && errors.length === 0 && results.every(r => r.activePanelId === r.controls);
    process.exitCode = allOk ? 0 : 1;
  } catch (e) {
    console.error('Test runner error:', e);
    await fs.promises.writeFile(outLog, JSON.stringify({ logs, pageErrors, networkErrors: errors, error: e.message }, null, 2));
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
