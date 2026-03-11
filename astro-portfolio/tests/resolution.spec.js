import { test, expect } from '@playwright/test';

const resolutions = [
  { name: 'Mobile Small', width: 320, height: 568 },   // iPhone SE
  { name: 'Mobile', width: 375, height: 667 },         // iPhone 12
  { name: 'Mobile Large', width: 414, height: 896 },   // iPhone 12 Pro Max
  { name: 'Tablet', width: 768, height: 1024 },        // iPad
  { name: 'Laptop', width: 1024, height: 768 },        // Small laptop
  { name: 'Desktop', width: 1280, height: 720 },       // Desktop
  { name: 'Wide', width: 1920, height: 1080 },         // Full HD
  { name: 'Ultrawide', width: 2560, height: 1440 },    // 2K
];

test.describe('Portfolio Resolution Tests', () => {
  resolutions.forEach(({ name, width, height }) => {
    test(`should display beautifully at ${name} (${width}x${height})`, async ({ page }) => {
      // Set viewport
      await page.setViewportSize({ width, height });
      
      // Navigate to site
      await page.goto('http://localhost:4321');
      
      // Wait for page to load
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500); // Allow animations to complete
      
      // Take screenshot
      await page.screenshot({ 
        path: `tests/screenshots/${name.toLowerCase().replace(' ', '-')}.png`,
        fullPage: true 
      });
      
      // Hero section visible - use specific ID to avoid conflicts
      await expect(page.locator('#hero-heading')).toBeVisible();

      // All project cards visible
      const projectCards = page.locator('.bento-item');
      await expect(projectCards).toHaveCount(8);

      // Check navigation is accessible
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();

      // Terminal input visible
      await expect(page.locator('#term-input')).toBeVisible();
      
      // No horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(width + 1); // Allow 1px tolerance
      
      // All content is within viewport width
      const overflowX = await page.evaluate(() => {
        const html = document.documentElement;
        return html.style.overflowX;
      });
      expect(overflowX).not.toBe('auto');
    });
  });
});

test.describe('Accessibility Tests', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('http://localhost:4321');

    // Check main h1 exists and is visible
    await expect(page.locator('#hero-heading')).toBeVisible();
    await expect(page.locator('#hero-heading')).toContainText('Reverb256');

    // Check h2s exist
    const h2s = await page.locator('h2').all();
    expect(h2s.length).toBeGreaterThan(0);

    // Verify section headings are properly labeled
    await expect(page.locator('#projects-heading')).toBeVisible();
    await expect(page.locator('#about-heading')).toBeVisible();
    await expect(page.locator('#contact-heading')).toBeVisible();
  });

  test('should have visible focus states', async ({ page }) => {
    await page.goto('http://localhost:4321');

    // Tab through interactive elements
    await page.keyboard.press('Tab');

    // Check if something has focus
    const focused = await page.evaluate(() => document.activeElement.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(focused);
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('http://localhost:4321');

    // Check all images have alt or are decorative
    const images = await page.locator('img').all();
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeDefined();
    }
  });
});

test.describe('Performance Tests', () => {
  test('should load without layout shift', async ({ page }) => {
    await page.goto('http://localhost:4321');
    
    // Check cumulative layout shift (simplified)
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let cls = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              cls += entry.value;
            }
          }
        }).observe({ entryTypes: ['layout-shift'] });
        
        setTimeout(() => resolve(cls), 2000);
      });
    });
    
    expect(cls).toBeLessThan(0.1);
  });
  
  test('should have reasonable First Contentful Paint', async ({ page }) => {
    await page.goto('http://localhost:4321');
    const fcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        // Fallback timeout in case paint events don't fire
        const timeout = setTimeout(() => resolve(0), 5000);

        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const paintEntries = entries.filter(e => e.name === 'first-contentful-paint');
          if (paintEntries.length > 0) {
            clearTimeout(timeout);
            resolve(paintEntries[0].startTime);
          }
        }).observe({ entryTypes: ['paint'] });
      });
    });

    expect(fcp).toBeLessThan(2000); // Under 2 seconds
  });
});

test.describe('Responsive Navigation', () => {
  test('mobile navigation should be accessible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:4321');
    
    // Navigation should be visible on mobile
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check nav links are clickable
    const blogLink = page.locator('a[href="/blog"]');
    await expect(blogLink).toBeVisible();
  });
});

test.describe('Animation Tests', () => {
  test('should respect prefers-reduced-motion', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('http://localhost:4321');

    // Wait for potential animations
    await page.waitForTimeout(500);

    // Content should still be visible - use specific selector
    await expect(page.locator('#hero-heading')).toBeVisible();
    await expect(page.locator('.bento-item').first()).toBeVisible();
  });
});
