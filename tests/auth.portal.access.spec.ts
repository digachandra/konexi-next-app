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

  test('allows valid sign out', async ({ page }) => {
    await loginWithEmailPassword(page, { email, password });

    await expect(page).toHaveURL(/\/portal/);

    await expect(page.getByText(email.toLowerCase(), { exact: true }).first()).toBeVisible();
    await page.getByRole('button', { name: 'Logout' }).click();

    await expect(page).toHaveURL(/\/portal/);
  });
});
