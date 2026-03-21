import { test, expect } from '@playwright/test';

const breakpoints = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1024, height: 768 },
  { name: 'desktop', width: 1920, height: 1080 },
];

breakpoints.forEach(({ name, width, height }) => {
  test.describe(`Infrastructure page - ${name} (${width}x${height})`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/infrastructure/');
    });

    test(`should load without errors at ${name} breakpoint`, async ({ page }) => {
      // Wait for page to load
      await page.waitForLoadState('networkidle');

      // Check that main content is visible
      const main = page.locator('main.infrastructure-page');
      await expect(main).toBeVisible();

      // Check that title is visible
      const title = page.locator('h2.section-title').first();
      await expect(title).toBeVisible();
    });

    test(`should display scroll progress indicator at ${name} breakpoint`, async ({ page }) => {
      const scrollProgress = page.locator('.scroll-progress');
      await expect(scrollProgress).toBeVisible();

      // Scroll down and check that progress bar changes
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(100);

      const width = await scrollProgress.evaluate(el => getComputedStyle(el).width);
      expect(parseInt(width)).toBeGreaterThan(0);
    });

    test(`should display section navigation at ${name} breakpoint`, async ({ page }) => {
      const sectionNav = page.locator('.section-nav');

      // Section navigation should be hidden on mobile
      if (width >= 768) {
        await expect(sectionNav).toBeVisible();

        // Check that all navigation dots are present
        const dots = page.locator('.section-nav-dot');
        await expect(dots).toHaveCount(6);
      } else {
        await expect(sectionNav).not.toBeVisible();
      }
    });

    test(`should display all sections at ${name} breakpoint`, async ({ page }) => {
      const sections = [
        'section[data-section="intro"]',
        'section[data-section="innovation"]',
        'section[data-section="operations"]',
        'section[data-section="capabilities"]',
        'section[data-section="timeline"]',
        'section[data-section="code"]',
      ];

      for (const section of sections) {
        const element = page.locator(section);
        await expect(element).toBeVisible();

        // Check section title - use first() to handle sections with multiple h2 elements
        const title = element.locator('h2.section-title').first();
        await expect(title).toBeVisible();
      }
    });

    test(`should display glass cards at ${name} breakpoint`, async ({ page }) => {
      const glassCards = page.locator('.glass-card');
      const count = await glassCards.count();

      // Should have at least some cards
      expect(count).toBeGreaterThan(0);

      // Check first card content
      const firstCard = glassCards.first();
      await expect(firstCard).toBeVisible();
    });

    test(`should display cluster stats at ${name} breakpoint`, async ({ page }) => {
      const statItems = page.locator('.stat-item');
      await expect(statItems).toHaveCount(4); // CPU, RAM, GPU, Storage

      // Check each stat is visible
      for (let i = 0; i < 4; i++) {
        const stat = statItems.nth(i);
        await expect(stat).toBeVisible();

        const value = stat.locator('.stat-value');
        const label = stat.locator('.stat-label');
        await expect(value).toBeVisible();
        await expect(label).toBeVisible();
      }
    });

    test(`should display code explorer at ${name} breakpoint`, async ({ page }) => {
      const codeExplorer = page.locator('.code-explorer');
      await expect(codeExplorer).toBeVisible();

      // Check tabs are present
      const tabs = codeExplorer.locator('.tabs button[role="tab"]');
      await expect(tabs).toHaveCount(3); // Overview, Key Patterns, Deep Dive

      // Check code block is visible
      const codeBlock = codeExplorer.locator('.code-block').first();
      await expect(codeBlock).toBeVisible();
    });

    test(`should handle responsive layout at ${name} breakpoint`, async ({ page }) => {
      const container = page.locator('.container').first();
      await expect(container).toBeVisible();

      // Check container width is within viewport
      const containerBox = await container.boundingBox();
      expect(containerBox?.width).toBeLessThanOrEqual(width);
    });

    test(`should scroll smoothly to sections at ${name} breakpoint`, async ({ page }) => {
      // Only test section navigation on tablet and above
      if (width >= 768) {
        const firstDot = page.locator('.section-nav-dot').first();
        await firstDot.click();

        // Wait for smooth scroll to complete
        await page.waitForTimeout(500);

        // Check that we scrolled to a section
        const scrollY = await page.evaluate(() => window.scrollY);
        expect(scrollY).toBeGreaterThan(0);
      }
    });
  });
});

test.describe('Infrastructure page - accessibility', () => {
  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/infrastructure/');

    // Check section navigation has proper ARIA
    const sectionNav = page.locator('.section-nav');
    await expect(sectionNav).toHaveAttribute('aria-label', 'Section navigation');

    // Check nav dots have proper labels
    const dots = page.locator('.section-nav-dot');
    const count = await dots.count();

    for (let i = 0; i < count; i++) {
      const dot = dots.nth(i);
      await expect(dot).toHaveAttribute('aria-label');
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/infrastructure/');

    // Test tab navigation
    await page.keyboard.press('Tab');

    // Check that something is focused
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['BUTTON', 'A', 'INPUT']).toContain(focusedElement);
  });
});

test.describe('Infrastructure page - performance', () => {
  test('should load within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/infrastructure/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    // Page should load in less than 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should not have console errors', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/infrastructure/');
    await page.waitForLoadState('networkidle');

    expect(errors).toHaveLength(0);
  });
});
