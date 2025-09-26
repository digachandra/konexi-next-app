import { test, expect } from '@playwright/test';

test.describe('when user is unauthenticated', () => {
  test('allows valid sign in', async ({ page }) => {
    await page.goto('/portal');

    await expect(page).toHaveURL(/\/portal/);

    await expect(page.getByText('Account', { exact: true })).toBeVisible();
    await page.getByRole('link', { name: 'Sign In / Sign Up' }).click();

    await expect(page).toHaveURL(/\/auth\/login/);
  });
});
