const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({headless: 'new', args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122.0 Safari/537.36');
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });
  const url = 'https://www.figma.com/design/3AR7Rvf8KL808ubcQUwrHe/?node-id=4003-5';
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  } catch(e) { console.error('goto:', e.message); }
  await new Promise(r => setTimeout(r, 8000));
  await page.screenshot({ path: '/tmp/figma-puppeteer-4003-5.png', fullPage: false });
  await browser.close();
})();
