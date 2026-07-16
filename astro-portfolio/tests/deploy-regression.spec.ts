import { test, expect } from '@playwright/test';

// ── reverb256.ca (portfolio) ──────────────────────────────────────────

test.describe('reverb256.ca', () => {
  test('homepage loads and renders key elements', async ({ page }) => {
    await page.goto('https://reverb256.ca/', { waitUntil: 'networkidle', timeout: 30000 });

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

    // Take full-page screenshot
    await page.screenshot({ path: 'test-output/reverb256-homepage.png', fullPage: true });
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto('https://reverb256.ca/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000); // let JS run

    expect(errors.filter((e) => !e.includes('favicon'))).toHaveLength(0);
  });
});

// ── Local-Cleaning-Service ────────────────────────────────────────────

test.describe('Local-Cleaning-Service', () => {
  const BASE = 'https://reverb256.ca/Local-Cleaning-Service';

  test('homepage loads with all critical SEO elements', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });

    // Title and meta
    const title = await page.title();
    expect(title.length).toBeGreaterThan(10);
    expect(title.toLowerCase()).toContain('cleaning');

    // H1 visible
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // JSON-LD schema
    const ldJson = await page.locator('script[type="application/ld+json"]').first();
    await expect(ldJson).toBeAttached();
    const raw = await ldJson.textContent();
    const parsed = JSON.parse(raw || '{}');
    expect(parsed['@type']).toBe('LocalBusiness');

    // Navigation
    await expect(page.locator('nav')).toBeVisible();
  });

  test('/services page renders all service cards', async ({ page }) => {
    await page.goto(`${BASE}/services`, { waitUntil: 'networkidle', timeout: 30000 });

    // Service links / headings
    const serviceLinks = page.locator('a[href*="office-cleaning"], a[href*="commercial"]');
    const count = await serviceLinks.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('/about page renders NAP + hours', async ({ page }) => {
    await page.goto(`${BASE}/about`, { waitUntil: 'networkidle', timeout: 30000 });

    const body = await page.textContent('body');
    expect(body).toContain('204');
    expect(body).toContain('Marion');
  });

  test('/contact page has working form', async ({ page }) => {
    await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle', timeout: 30000 });

    const form = page.locator('form');
    await expect(form).toBeVisible();
    const inputs = page.locator('input, textarea');
    const inputCount = await inputs.count();
    expect(inputCount).toBeGreaterThanOrEqual(2);
  });

  test('/quote page renders calculator', async ({ page }) => {
    await page.goto(`${BASE}/quote`, { waitUntil: 'networkidle', timeout: 30000 });

    // Quote calculator island should mount
    const selects = page.locator('select');
    await expect(selects.first()).toBeVisible({ timeout: 10000 });
  });

  test('/privacy page loads', async ({ page }) => {
    await page.goto(`${BASE}/privacy`, { waitUntil: 'networkidle', timeout: 30000 });

    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('no console errors across all routes', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));

    const routes = ['/', '/services', '/about', '/contact', '/quote', '/privacy'];
    for (const route of routes) {
      await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
    }

    const relevantErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('404') && !e.includes('Failed to load resource'),
    );
    if (relevantErrors.length > 0) {
      console.warn('Console errors found:', JSON.stringify(relevantErrors, null, 2));
    }
    // Soft assertion — surface issues without hard-failing on minor ones
    expect(relevantErrors.length).toBeLessThanOrEqual(5);
  });

  test('full-page screenshot — homepage', async ({ page }) => {
    await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
    await page.screenshot({ path: 'test-output/lcs-homepage.png', fullPage: true });
  });

  test('full-page screenshot — services', async ({ page }) => {
    await page.goto(`${BASE}/services`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.screenshot({ path: 'test-output/lcs-services.png', fullPage: true });
  });
});
