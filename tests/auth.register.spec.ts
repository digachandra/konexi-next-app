import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { createUser, deleteUser } from './factories/user';
import { loginWithEmailPassword } from './lib/auth';

test.describe('email & password registration', () => {
  const email = faker.internet.email();
  const password = 'password';

  test.afterAll(async () => {
    await deleteUser({ email });
  });

  test('allows valid register', async ({ page }) => {
    await test.step('navigate to register page', async () => {
      await page.goto('/');
      await page.getByRole('link', { name: 'Sign In / Sign Up' }).click();

      await expect(page).toHaveURL(/\/auth\/login/);

      await page.getByRole('link', { name: 'or register your account' }).click();

      await expect(page).toHaveURL(/\/auth\/register/);
    });

    await test.step('create job record', async () => {
      await page.fill('input[name="email"]', email);
      await page.fill('input[name="password"]', password);
      await page.fill('input[name="password_confirmation"]', password);

      await page.getByRole('button', { name: 'Register' }).click();
    });

    await test.step('redirected to portal', async () => {
      await expect(page).toHaveURL(/\/portal/);

      await expect(page.getByText(email.toLowerCase(), { exact: true }).first()).toBeVisible();
      await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Sign In / Sign Up' })).not.toBeVisible();
    });
  });
});

test.describe('when user is authenticated', () => {
  const email = faker.internet.email();
  const password = 'password';

  test.beforeAll(async () => {
    await createUser({ email, password });
  });

  test.afterAll(async () => {
    await deleteUser({ email });
  });

  test('redirects to portal when user is authenticated', async ({ page }) => {
    await loginWithEmailPassword(page, { email, password });

    await page.goto('/auth/register');
    await expect(page).toHaveURL(/\/portal$/);
  });
});
