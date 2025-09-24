import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { createUser, deleteUser } from './factories/user';
import { loginWithEmailPassword } from './lib/auth';

test.describe('when user is authenticated', () => {
  const email = faker.internet.email();
  const password = 'password';

  test.beforeAll(async () => {
    await createUser({ email, password });
  });

  test.afterAll(async () => {
    await deleteUser({ email });
  });

  test('allows valid CRUD', async ({ page }) => {
    await loginWithEmailPassword(page, { email, password });
    await expect(page).toHaveURL(/\/portal/);

    await test.step('navigate to jobs page', async () => {
      await page.getByRole('link', { name: 'Jobs' }).click();

      await expect(page).toHaveURL(/\/portal\/jobs/);
      await expect(page.getByRole('heading', { name: 'Jobs Board' })).toBeVisible();
    });
  });
});

test.describe('when user is unauthenticated', () => {
  test('redirects to auth login ', async ({ page }) => {
    await page.goto('/portal/jobs');
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});
