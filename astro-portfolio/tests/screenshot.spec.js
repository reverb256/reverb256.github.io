import { test, expect } from '@playwright/test';

test('screenshot homepage', async ({ page }) => {
  await page.goto('http://localhost:4321');
  await page.screenshot({ path: 'homepage-screenshot.png', fullPage: true });
  console.log('Screenshot saved to homepage-screenshot.png');
});
