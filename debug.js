
const { chromium } = require('playwright-chromium');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:12445/print?print=true&range=10');
  await page.waitForTimeout(3000);
  const html = await page.content();
  await browser.close();
  console.log(html);
})();
