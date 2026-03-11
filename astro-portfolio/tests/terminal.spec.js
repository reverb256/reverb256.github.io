import { test, expect } from '@playwright/test';

test.describe('Terminal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('terminal elements exist', async ({ page }) => {
    await expect(page.locator('#term-wrapper')).toBeVisible();
    await expect(page.locator('#term-output')).toBeVisible();
    await expect(page.locator('#term-input')).toBeVisible();
    await expect(page.locator('.term-prompt')).toBeVisible();
  });

  test('can type in terminal', async ({ page }) => {
    const input = page.locator('#term-input');
    await input.click();
    await input.fill('help');
    await expect(input).toHaveValue('help');
  });

  test('help command shows output', async ({ page }) => {
    const input = page.locator('#term-input');
    await input.click();
    await input.fill('help');
    await input.press('Enter');

    // Wait for output
    await page.waitForTimeout(500);

    const output = page.locator('#term-output');
    await expect(output).toContainText('R256 Database Commands');
    await expect(output).toContainText('help');
    await expect(output).toContainText('list');
  });

  test('whoami command returns r256', async ({ page }) => {
    const input = page.locator('#term-input');
    await input.click();
    await input.fill('whoami');
    await input.press('Enter');

    await page.waitForTimeout(300);

    const output = page.locator('#term-output');
    await expect(output).toContainText('r256');
  });

  test('clear command empties output', async ({ page }) => {
    const input = page.locator('#term-input');
    await input.click();
    await input.fill('help');
    await input.press('Enter');
    await page.waitForTimeout(500);

    // Verify we have output
    const output = page.locator('#term-output');
    await expect(output).toContainText('R256 Database Commands');

    // Clear it
    await input.fill('clear');
    await input.press('Enter');
    await page.waitForTimeout(500);

    // After clear, the original welcome message should be gone
    // (it may have empty p tags, but the text should be cleared)
    await expect(output).not.toContainText('R256 Database Commands');
    await expect(output).not.toContainText('help for commands');
  });

  test('ls command shows files', async ({ page }) => {
    const input = page.locator('#term-input');
    await input.click();
    await input.fill('ls');
    await input.press('Enter');

    await page.waitForTimeout(300);

    const output = page.locator('#term-output');
    await expect(output).toContainText('Documents');
    await expect(output).toContainText('Projects');
  });

  test('list command shows database subjects', async ({ page }) => {
    const input = page.locator('#term-input');
    await input.click();
    await input.fill('list');
    await input.press('Enter');

    await page.waitForTimeout(300);

    const output = page.locator('#term-output');
    await expect(output).toContainText('JOURNEY_001');
  });

  test('clicking terminal focuses input', async ({ page }) => {
    const termWrapper = page.locator('#term-wrapper');
    const input = page.locator('#term-input');

    await termWrapper.click();
    // Check if input is focused by evaluating JavaScript
    const isFocused = await input.evaluate(el => document.activeElement === el);
    expect(isFocused).toBe(true);
  });
});
