import { test, expect } from '@playwright/test';
import type { Page } from '@playwright/test';

type CredentialProps = {
  email: string;
  password: string;
};

export async function loginWithEmailPassword(page: Page, credential: CredentialProps) {
  await test.step('navigate to login page', async () => {
    await page.goto('/auth/login');
    await expect(page).toHaveURL(/\/auth\/login$/);
  });

  await test.step('fill in login form', async () => {
    await page.fill('input[name="email"]', credential.email);
    await page.fill('input[name="password"]', credential.password);
  });

  await test.step('submit and land on portal', async () => {
    await page.getByRole('button', { name: /login/i }).click();
    await page.waitForURL('**/portal', { timeout: 5_000 });
    await expect(page).toHaveURL(/\/portal$/);
  });
}
