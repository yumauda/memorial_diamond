import puppeteer from 'puppeteer';

const url = process.env.FIGMA_URL || 'https://www.figma.com/design/AfnO68UtayrmzLuUaipcF6/%E6%B3%95%E6%9C%88%E6%A7%98%E3%80%80%E5%95%86%E5%93%81LP%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3-ver01?node-id=4037-5&t=2mWHbuMjEDvKkv4l-4';
const output = process.env.FIGMA_OUTPUT || '/private/tmp/figma-node-4037-5.png';

(async () => {
  const browser = await puppeteer.launch({headless: 'new', args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122.0 Safari/537.36');
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  } catch(e) { console.error('goto:', e.message); }
  await new Promise(r => setTimeout(r, 8000));
  await page.screenshot({ path: output, fullPage: false });
  console.log(output);
  await browser.close();
})();
