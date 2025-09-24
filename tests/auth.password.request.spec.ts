import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { createUser, deleteUser } from './factories/user';
import { loginWithEmailPassword } from './lib/auth';

test.describe('user is unauthenticated', () => {
  test('allows to request a password reset', async ({ page }) => {
    await test.step('navigate to password request page', async () => {
      await page.goto('/auth/password/request');
      await expect(page.getByRole('heading', { name: 'Reset Password Request' })).toBeVisible();
    });

    await test.step('fill in reset password request form', async () => {
      await page.fill('input[name="email"]', faker.internet.email());
    });

    await test.step('submit form', async () => {
      await page.getByRole('button', { name: 'Send Confirmation Email' }).click();
      await expect(page).toHaveURL(/\/auth\/password\/request/);
    });

    await test.step('expecting feedback', async () => {
      await expect(page.getByText('Check your inbox')).toBeVisible();
      await expect(
        page.getByText('if that email address is registered, a password reset link has been sent.')
      ).toBeVisible();
    });
  });
});

test.describe('user is authenticated', () => {
  const email = faker.internet.email();
  const password = 'password';

  test.beforeAll(async () => {
    await createUser({ email, password });
  });

  test.afterAll(async () => {
    await deleteUser({ email });
  });

  test('redirects to admin', async ({ page }) => {
    await loginWithEmailPassword(page, { email, password });

    await page.goto('/auth/password/request');
    await expect(page).toHaveURL(/\/admin/);
  });
});
