import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { createJob, deleteJob } from './factories/job';

test.describe('public jobs access (read-only)', () => {
  let job_1: Awaited<ReturnType<typeof createJob>>;
  let job_2: Awaited<ReturnType<typeof createJob>>;

  test.beforeAll(async () => {
    job_1 = await createJob({ location: `test-${faker.location.city()}`, type: 'Full-Time' });
    job_2 = await createJob({ location: `test-${faker.location.city()}`, type: 'Contract' });
  });

  test.afterAll(async () => {
    await deleteJob(job_1.id);
    await deleteJob(job_2.id);
  });

  test('allow valid read', async ({ page }) => {
    await test.step('navigate to jobs page', async () => {
      await page.goto('/portal');

      await page.getByRole('link', { name: 'Jobs' }).click();

      await expect(page).toHaveURL(/\/portal\/jobs\/list/);
      await expect(page.getByRole('heading', { name: 'Jobs Board' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Add Job' })).not.toBeVisible();
    });

    await test.step('filter jobs', async () => {
      await expect(
        page.locator('[data-slot="card"]').filter({ hasText: job_1.title })
      ).toBeVisible();
      await expect(
        page.locator('[data-slot="card"]').filter({ hasText: job_2.title })
      ).toBeVisible();

      await page.getByLabel('Location').fill(job_2.location);
      await page.getByRole('button', { name: 'Apply' }).click();

      await expect(
        page.locator('[data-slot="card"]').filter({ hasText: job_1.title })
      ).not.toBeVisible();
      await expect(
        page.locator('[data-slot="card"]').filter({ hasText: job_2.title })
      ).toBeVisible();

      await page.getByLabel('Location').fill('');
      await page.getByRole('combobox', { name: 'Type' }).click();
      await page.getByRole('option', { name: job_1.type, exact: true }).click();
      await page.getByRole('button', { name: 'Apply' }).click();

      await expect(
        page.locator('[data-slot="card"]').filter({ hasText: job_1.title })
      ).toBeVisible();
      await expect(
        page.locator('[data-slot="card"]').filter({ hasText: job_2.title })
      ).not.toBeVisible();
    });

    await test.step('navigate to job detail page', async () => {
      await page
        .locator('[data-slot="card"]')
        .filter({ hasText: job_1.title })
        .getByRole('button', { name: 'See Job Detail' })
        .click();

      await expect(page).toHaveURL(`/portal/jobs/${job_1.id}/detail`);
      await expect(page.getByRole('heading', { name: 'Job Detail' })).toBeVisible();
      await expect(page.getByText(job_1.title)).toBeVisible();
      await expect(page.getByText(job_1.company_name)).toBeVisible();
      await expect(page.getByText(job_1.description)).toBeVisible();
      await expect(page.getByText(job_1.location)).toBeVisible();
      await expect(page.getByText(job_1.type)).toBeVisible();

      await expect(page.getByRole('button', { name: 'Edit Job' })).not.toBeVisible();
      await expect(page.getByRole('button', { name: 'Delete Job' })).not.toBeVisible();
    });
  });
});
