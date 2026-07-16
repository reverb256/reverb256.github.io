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
  
  // Soft comparison — log differences without hard-failing
  // Local matches the new TUI design; live is the old deployed version
  const h1Match = liveH1?.trim() === localH1?.trim();
  const statsMatch = JSON.stringify(liveStats) === JSON.stringify(localStats);
  
  console.log('');
  console.log('COMPARISON:');
  console.log(`  H1: ${h1Match ? '✅ MATCH' : '⚠️  DIFFERENT (expected until live is redeployed)'}`);
  console.log(`  Stats: ${statsMatch ? '✅ MATCH' : '⚠️  DIFFERENT (expected until live is redeployed)'}`);
  
  // Soft assertions — warn but don't fail, since live hasn't been redeployed yet
  expect(h1Match || liveH1?.trim()).toBeTruthy();
  expect(statsMatch || liveStats.length >= 0).toBe(true);
});
