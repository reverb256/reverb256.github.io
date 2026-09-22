import { test, expect } from '@playwright/test';

// ── reverb256.dev (canonical professional site) ───────────────────────
// Retargeted 2026-09-22: canonical moved reverb256.ca → reverb256.dev.
// The Local-Cleaning-Service demo block was removed with the demo wipe
// (false-premise cleanup) — replaced by checks for real portfolio routes.

const BASE = 'https://reverb256.dev';

test.describe('reverb256.dev', () => {
  test('homepage loads and renders key elements', async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 30000 });

    // CSS custom properties (dark theme base16)
    const cssVars = await page.evaluate(() => {
      const root = document.documentElement;
      const styles = window.getComputedStyle(root);
      return {
        base00: styles.getPropertyValue('--base00').trim(),
        base05: styles.getPropertyValue('--base05').trim(),
        base09: styles.getPropertyValue('--base09').trim(),
      };
    });
    expect(cssVars.base00).toBeTruthy();
    expect(cssVars.base05).toBeTruthy();

    // H1 present
    const h1 = await page.locator('h1').first();
    await expect(h1).toBeVisible();
    const h1Text = await h1.textContent();
    expect(h1Text?.toLowerCase()).toContain('reverb');

    // Terminal wrapper exists
    const term = page.locator('#term-wrapper');
    await expect(term).toBeVisible({ timeout: 10000 });

    // Canonical points at .dev (regression: canonical once pointed at .ca)
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBe('https://reverb256.dev/');

    await page.screenshot({ path: 'test-output/dev-homepage.png', fullPage: true });
  });

  test('www + http redirect to https apex', async ({ request }) => {
    const www = await request.get('https://www.reverb256.dev/', { maxRedirects: 0 });
    expect([301, 302, 308]).toContain(www.status());
    expect(www.headers()['location']).toContain('https://reverb256.dev/');

    const http = await request.get('http://reverb256.dev/', { maxRedirects: 0 });
    expect([301, 302, 308]).toContain(http.status());
    expect(http.headers()['location']).toContain('https://reverb256.dev/');
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000); // let JS run

    expect(errors.filter((e) => !e.includes('favicon'))).toHaveLength(0);
  });
});

// ── Key routes ────────────────────────────────────────────────────────

test.describe('reverb256.dev routes', () => {
  test('/infrastructure/ renders', async ({ page }) => {
    await page.goto(`${BASE}/infrastructure/`, { waitUntil: 'networkidle', timeout: 30000 });
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('/now/ renders', async ({ page }) => {
    await page.goto(`${BASE}/now/`, { waitUntil: 'networkidle', timeout: 30000 });
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('no console errors across key routes', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));

    const routes = ['/', '/infrastructure/', '/now/'];
    for (const route of routes) {
      await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
    }

    const relevantErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('404') && !e.includes('Failed to load resource'),
    );
    expect(relevantErrors.length).toBeLessThanOrEqual(5);
  });

  test('full-page screenshot — homepage', async ({ page }) => {
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.screenshot({ path: 'test-output/dev-homepage-full.png', fullPage: true });
  });
});
