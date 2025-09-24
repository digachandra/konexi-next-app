import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { createUser, deleteUser } from './factories/user';
import { loginWithEmailPassword } from './lib/auth';

test.describe('email & password login', () => {
  const email = faker.internet.email();
  const password = 'password';

  test.beforeAll(async () => {
    await createUser({ email, password });
  });

  test.afterAll(async () => {
    await deleteUser({ email });
  });

  test('allows valid sign in', async ({ page }) => {
    await loginWithEmailPassword(page, { email, password });
  });

  test('redirects to admin when user is authenticated', async ({ page }) => {
    await loginWithEmailPassword(page, { email, password });

    await page.goto('/auth/login');
    await expect(page).toHaveURL(/\/admin$/);
  });
});
