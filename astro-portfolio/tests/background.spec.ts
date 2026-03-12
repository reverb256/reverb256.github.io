import { test, expect } from '@playwright/test';

test.describe('Portfolio Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321/');
    await page.waitForLoadState('networkidle');
  });

  test('hero section exists', async ({ page }) => {
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
  });

  test('projects section exists', async ({ page }) => {
    const projects = page.locator('#projects');
    await expect(projects).toBeVisible();
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

  test('h1 exists with correct text', async ({ page }) => {
    const h1 = page.locator('#hero h1');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Reverb256');
  });

  test('beat indicators exist', async ({ page }) => {
    const beatIndicators = page.locator('.beat-indicator');
    const count = await beatIndicators.count();
    expect(count).toBeGreaterThan(0);
  });
});
