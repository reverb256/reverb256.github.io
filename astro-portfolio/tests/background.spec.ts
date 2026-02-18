import { test, expect } from '@playwright/test';

test.describe('Portfolio Background Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('background gradient renders correctly', async ({ page }) => {
    const bgGradient = page.locator('#bg-gradient');
    const bgStyle = await bgGradient.evaluate((el) => 
      window.getComputedStyle(el).background
    );
    
    expect(bgStyle).toContain('linear-gradient');
    expect(bgStyle).toContain('rgb(10, 10, 10)');
  });

  test('glow elements are animating', async ({ page }) => {
    const glow1 = page.locator('#glow-1');
    const transform = await glow1.evaluate((el) => 
      window.getComputedStyle(el).transform
    );
    
    expect(transform).not.toBe('none');
  });

  test('particles canvas exists and has dimensions', async ({ page }) => {
    const canvas = page.locator('#particles');
    
    await expect(canvas).toBeVisible();
    
    const dimensions = await canvas.evaluate((el) => ({
      width: (el as HTMLCanvasElement).width,
      height: (el as HTMLCanvasElement).height,
    }));
    
    expect(dimensions.width).toBeGreaterThan(0);
    expect(dimensions.height).toBeGreaterThan(0);
  });

  test('cursor glow element exists', async ({ page }) => {
    const cursorGlow = page.locator('#cursor-glow');
    await expect(cursorGlow).toBeVisible();
  });

  test('h1 gradient text renders correctly', async ({ page }) => {
    const h1 = page.locator('h1');
    
    const styles = await h1.evaluate((el) => {
      const s = window.getComputedStyle(el);
      return {
        color: s.color,
        backgroundClip: s.backgroundClip,
      };
    });
    
    expect(styles.color).toBe('rgba(0, 0, 0, 0)');
    expect(styles.backgroundClip).toBe('text');
  });

  test('terminal is visible and interactive', async ({ page }) => {
    const terminal = page.locator('#term-wrapper');
    await expect(terminal).toBeVisible();
    
    const input = page.locator('#term-input');
    await expect(input).toBeVisible();
    
    await input.fill('list');
    await input.press('Enter');
    
    await expect(page.locator('#term-output')).toContainText('DATABASE SUBJECTS');
  });
});
