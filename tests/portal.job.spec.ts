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

  const job = {
    title: `test-${faker.person.jobTitle()}`,
    company_name: `test-${faker.company.name()}`,
    description: `test-${faker.lorem.paragraph()}`,
    location: `test-${faker.location.city()}`,
    type: 'Full-Time',
  };

  test('allows valid CRUD', async ({ page }) => {
    await loginWithEmailPassword(page, { email, password });
    await expect(page).toHaveURL(/\/portal/);

    await test.step('navigate to jobs page', async () => {
      await page.getByRole('link', { name: 'Jobs' }).click();

      await expect(page).toHaveURL(/\/portal\/jobs/);
      await expect(page.getByRole('heading', { name: 'Jobs Board' })).toBeVisible();
    });

    await test.step('create job record', async () => {
      await page.getByRole('button', { name: 'Add Job' }).click();

      await expect(page).toHaveURL(/\/portal\/jobs\/add/);

      await page.fill('input[name="title"]', job.title);
      await page.fill('input[name="company_name"]', job.company_name);
      await page.fill('textarea[name="description"]', job.description);
      await page.fill('input[name="location"]', job.location);
      await page.getByRole('combobox', { name: 'Job Type' }).click();
      await page.getByRole('option', { name: job.type }).click();

      await page.getByRole('button', { name: 'Create Job' }).click();

      await expect(page).toHaveURL(/\/portal\/jobs\/[0-9a-f-]+\/detail$/i);
      await expect(page.getByRole('heading', { name: 'Job Detail' })).toBeVisible();
      await expect(page.getByText(job.title)).toBeVisible();
      await expect(page.getByText(job.company_name)).toBeVisible();
      await expect(page.getByText(job.description)).toBeVisible();
      await expect(page.getByText(job.location)).toBeVisible();
      await expect(page.getByText(job.type)).toBeVisible();
    });
  });
});

test.describe('when user is unauthenticated', () => {
  test('redirects to auth login ', async ({ page }) => {
    await page.goto('/portal/jobs');
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});
