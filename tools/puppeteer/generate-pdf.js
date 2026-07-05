const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const projectRoot = path.resolve(__dirname, '../..');
  const outPdf = path.join(projectRoot, 'site', 'recircular-onepage.pdf');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('response', response => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  page.on('requestfailed', request => errors.push(`failed ${request.url()}: ${request.failure().errorText}`));

  await page.goto('http://127.0.0.1:8765/', { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise(r => setTimeout(r, 1500)); // give d3/leaflet/render a beat

  await page.pdf({
    path: outPdf,
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', right: '15mm', bottom: '20mm', left: '15mm' },
    preferCSSPageSize: false,
  });

  await browser.close();

  const stats = fs.statSync(outPdf);
  console.log(`PDF written: ${outPdf}`);
  console.log(`Size: ${stats.size} bytes`);
  console.log(`Errors during render: ${errors.length ? errors.join('\n') : 'none'}`);
})();
