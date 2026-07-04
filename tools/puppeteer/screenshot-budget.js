const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForSelector('#budget-revenue-line svg', { timeout: 10000 });
  await page.waitForSelector('#budget-scenarios tbody tr', { timeout: 10000 });
  await page.waitForSelector('#funding-table tbody tr', { timeout: 10000 });
  await page.waitForSelector('#timeline-list .timeline-item', { timeout: 10000 });
  const section = await page.$('#budget');
  await section.evaluate(el => el.scrollIntoView({ block: 'start' }));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: '/home/kriizo/.openclaw/workspace/.tmp-screens/fix-renderers.png', fullPage: false });
  const counts = await page.evaluate(() => ({
    revenuePaths: document.querySelectorAll('#budget-revenue-line path').length,
    scenarioRows: document.querySelectorAll('#budget-scenarios tbody tr').length,
    fundingRows: document.querySelectorAll('#funding-table tbody tr').length,
    timelineItems: document.querySelectorAll('#timeline-list .timeline-item').length,
  }));
  console.log(JSON.stringify(counts));
  await browser.close();
})();
