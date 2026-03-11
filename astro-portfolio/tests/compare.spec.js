import { test, expect } from '@playwright/test';

test('compare local vs live', async ({ page }) => {
  // Check live site
  await page.goto('https://reverb256.github.io/');
  const liveH1 = await page.locator('h1').textContent();
  const liveTerminal = await page.locator('#term-output').textContent();
  const liveStats = await page.locator('.stat-value').allTextContents();
  
  console.log('LIVE SITE:');
  console.log('  H1:', liveH1?.trim());
  console.log('  Stats:', liveStats);
  console.log('  Terminal preview:', liveTerminal?.substring(0, 50) + '...');
  
  // Check local
  await page.goto('http://localhost:4321');
  const localH1 = await page.locator('h1').textContent();
  const localTerminal = await page.locator('#term-output').textContent();
  const localStats = await page.locator('.stat-value').allTextContents();
  
  console.log('LOCAL SITE:');
  console.log('  H1:', localH1?.trim());
  console.log('  Stats:', localStats);
  console.log('  Terminal preview:', localTerminal?.substring(0, 50) + '...');
  
  // Compare
  expect(liveH1).toBe(localH1);
  expect(liveStats).toEqual(localStats);
});
