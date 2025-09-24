import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { createUser, deleteUser } from './factories/user';
import { loginWithEmailPassword } from './lib/auth';

test.describe('portal access', () => {
  const email = faker.internet.email();
  const password = 'password';

  test.beforeAll(async () => {
    await createUser({ email, password });
  });

  test.afterAll(async () => {
    await deleteUser({ email });
  });

  test('allows valid sign in & sign out', async ({ page }) => {
    await loginWithEmailPassword(page, { email, password });

    await expect(page).toHaveURL(/\/portal/);

    await page.getByRole('button', { name: 'Logout' }).click();

    await expect(page).toHaveURL(/\/auth\/login/);
  });
});

test.describe('when user is unauthenticated', () => {
  test('redirects to auth login ', async ({ page }) => {
    await page.goto('/portal');
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});
