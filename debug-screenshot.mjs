import { chromium } from 'playwright-chromium';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1960, height: 1104 } });
  await page.goto('http://localhost:3030/10');
  await page.waitForTimeout(3000);

  const small = await page.$('.attach-metric-grid small');
  if (small) {
    await small.screenshot({ path: 'small-screenshot.png' });
    console.log('Small screenshot saved');
  } else {
    console.log('Small element not found');
  }

  const stability = await page.$('.attach-stability-row');
  if (stability) {
    await stability.screenshot({ path: 'stability-screenshot.png' });
    console.log('Stability screenshot saved');
  } else {
    console.log('Stability element not found');
  }

  await browser.close();
})();
