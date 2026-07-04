// Per-section screenshot capture for visual audit
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const PROJECT = path.resolve(__dirname, '../..');
const OUT = path.join(PROJECT, '.tmp-screens');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const SECTIONS = [
  // [section-anchor, name]
  ['hero',         'hero'],
  ['summary',      'summary'],
  ['pr-context',   'pr-context'],
  ['map',          'map'],
  ['case-studies', 'case-studies'],
  ['engineering',  'engineering'],
  ['budget',       'budget'],
  ['funding',      'funding'],
  ['timeline',     'timeline'],
  ['risks',        'risks'],
  ['conclusion',   'conclusion'],
  ['sources',      'sources'],
];

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errs.push('[console] ' + m.text()); });

  await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForSelector('#country-chart svg', { timeout: 10000 });
  await sleep(800);

  for (const lang of ['es', 'en']) {
    // Toggle language
    if ((await page.evaluate(() => document.documentElement.lang)) !== lang) {
      await page.click(`.lang-btn[data-lang="${lang}"]`);
      await sleep(500);
    }
    for (const [anchor, name] of SECTIONS) {
      const target = await page.$(`#${anchor}`);
      if (!target) { console.log(`SKIP ${lang} ${name} (no #${anchor})`); continue; }
      // Scroll into view
      await page.evaluate((sel) => {
        const el = document.querySelector('#' + sel);
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      }, anchor);
      await sleep(250);
      // Bounding box of the section element
      const box = await page.evaluate((sel) => {
        const el = document.querySelector('#' + sel);
        const r = el.getBoundingClientRect();
        return { x: 0, y: Math.max(0, r.top + window.scrollY), width: 1280, height: Math.min(2400, Math.max(400, r.height)) };
      }, anchor);
      const filename = path.join(OUT, `audit-${lang}-${name}.png`);
      await page.screenshot({ path: filename, fullPage: false, clip: box });
      console.log(`  ${lang}/${name}: ${filename}`);
    }
  }
  console.log('errors:', errs);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
