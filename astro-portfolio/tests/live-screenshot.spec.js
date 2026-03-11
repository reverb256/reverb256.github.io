import { test, expect } from '@playwright/test';

test('screenshot live site', async ({ page }) => {
  await page.goto('https://reverb256.github.io/');
  await page.screenshot({ path: 'live-screenshot.png', fullPage: true });
  
  // Check for stats element
  const statsExist = await page.locator('.hero-stats').count();
  console.log('Stats section exists on live:', statsExist > 0);
  
  // Check for terminal
  const termExists = await page.locator('#term-wrapper').count();
  console.log('Terminal exists on live:', termExists > 0);
});
