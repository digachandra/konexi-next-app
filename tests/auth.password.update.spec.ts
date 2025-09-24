import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { createUser, deleteUser } from './factories/user';
import { loginWithEmailPassword } from './lib/auth';

test.describe('password update flow', () => {
  test.describe('user is authenticated', () => {
    const email = faker.internet.email();
    const password = 'password';

    test.beforeAll(async () => {
      await createUser({ email, password });
    });

    test.afterAll(async () => {
      await deleteUser({ email });
    });

    test('allows to update password', async ({ page }) => {
      await loginWithEmailPassword(page, { email, password });

      await test.step('navigate to password update page', async () => {
        await page.goto('/auth/password/update');
        await expect(page).toHaveURL(/\/auth\/password\/update/);
        await expect(page.getByRole('heading', { name: 'Reset Your Password' })).toBeVisible();
      });

      await test.step('fill in reset password update form', async () => {
        await page.fill('input[name="password"]', 'new password');
        await page.fill('input[name="confirmPassword"]', 'new password');
      });

      await test.step('submit form', async () => {
        await page.getByRole('button', { name: 'Reset Password' }).click();
      });

      await test.step('redirects to feedback page', async () => {
        await expect(page).toHaveURL(/\/auth\/password\/updated/);
        await expect(page.getByRole('heading', { name: 'Password updated' })).toBeVisible();
      });

      await test.step('redirects to login page', async () => {
        await page.getByRole('button', { name: 'Go to login now' }).click();
        await expect(page).toHaveURL(/\/auth\/login/);
      });
    });
  });

  test.describe('user is unauthenticated', () => {
    test('redirects to login', async ({ page }) => {
      await page.goto('/auth/password/update');
      await expect(page).toHaveURL(/\/auth\/login/);
    });
  });
});

test.describe('password updated page', () => {
  test.describe('user is unauthenticated', () => {
    test('redirects to login', async ({ page }) => {
      await page.goto('/auth/password/updated');

      await expect(page).toHaveURL(/\/auth\/login/);
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

    test('redirects to portal', async ({ page }) => {
      await loginWithEmailPassword(page, { email, password });

      await page.goto('/auth/password/updated');

      await expect(page).toHaveURL(/\/portal/);
    });
  });
});
