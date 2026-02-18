import { test } from '@playwright/test';

test('Live site Firefox check', async ({ page }) => {
  await page.goto('https://reverb256.github.io/', { waitUntil: 'networkidle' });
  
  const check = await page.evaluate(() => {
    const root = document.documentElement;
    const rootStyles = window.getComputedStyle(root);
    
    const vars = ['--base00', '--base05', '--base09'];
    const varValues = {};
    vars.forEach(v => {
      varValues[v] = rootStyles.getPropertyValue(v).trim();
    });
    
    const bg = document.getElementById('bg-gradient');
    const bgStyles = bg ? window.getComputedStyle(bg) : null;
    
    const term = document.getElementById('term-wrapper');
    const termStyles = term ? window.getComputedStyle(term) : null;
    
    const h1 = document.querySelector('h1');
    const h1Styles = h1 ? window.getComputedStyle(h1) : null;
    
    return {
      cssVars: varValues,
      background: bgStyles?.background?.substring(0, 60),
      terminal: {
        display: termStyles?.display,
        bg: termStyles?.background?.substring(0, 40)
      },
      h1: {
        text: h1?.textContent,
        color: h1Styles?.color
      }
    };
  });
  
  console.log('Firefox Live Site:', JSON.stringify(check, null, 2));
  
  // Assertions
  if (!check.cssVars['--base00']) throw new Error('CSS vars missing');
  if (!check.h1.text?.includes('Reverb256')) throw new Error('H1 missing');
});
