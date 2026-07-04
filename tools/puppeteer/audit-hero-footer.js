// Hero + footer capture
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const PROJECT = path.resolve(__dirname, '../..');
const OUT = path.join(PROJECT, '.tmp-screens');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });

  await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForSelector('#country-chart svg', { timeout: 10000 });
  await sleep(800);

  for (const lang of ['es', 'en']) {
    if ((await page.evaluate(() => document.documentElement.lang)) !== lang) {
      await page.click(`.lang-btn[data-lang="${lang}"]`);
      await sleep(400);
    }
    // Hero
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(200);
    let box = await page.evaluate(() => {
      const el = document.querySelector('#top');
      const r = el.getBoundingClientRect();
      return { x: 0, y: Math.max(0, r.top + window.scrollY), width: 1280, height: Math.min(1600, r.height) };
    });
    await page.screenshot({ path: path.join(OUT, `audit-${lang}-hero.png`), fullPage: false, clip: box });
    console.log(`  ${lang}/hero`);

    // Footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(200);
    box = await page.evaluate(() => {
      const el = document.querySelector('footer.site-footer') || document.querySelector('footer');
      const r = el.getBoundingClientRect();
      return { x: 0, y: Math.max(0, r.top + window.scrollY), width: 1280, height: Math.min(800, r.height) };
    });
    await page.screenshot({ path: path.join(OUT, `audit-${lang}-footer.png`), fullPage: false, clip: box });
    console.log(`  ${lang}/footer`);
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
