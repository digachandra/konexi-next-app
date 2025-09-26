import { test, expect } from '@playwright/test';
import { createJob, deleteJob } from './factories/job';

test.describe('public jobs access (read-only)', () => {
  let job: Awaited<ReturnType<typeof createJob>>;

  test.beforeAll(async () => {
    job = await createJob({});
  });

  test.afterAll(async () => {
    await deleteJob(job.id);
  });

  test('allow valid read', async ({ page }) => {
    await test.step('navigate to jobs page', async () => {
      await page.goto('/portal');

      await page.getByRole('link', { name: 'Jobs' }).click();

      await expect(page).toHaveURL(/\/portal\/jobs\/list/);
      await expect(page.getByRole('heading', { name: 'Jobs Board' })).toBeVisible();

      await expect(page.getByRole('button', { name: 'Add Job' })).not.toBeVisible();

      await page
        .locator('[data-slot="card"]')
        .filter({ hasText: job.title })
        .getByRole('button', { name: 'See Job Detail' })
        .click();

      await expect(page).toHaveURL(`/portal/jobs/${job.id}/detail`);
      await expect(page.getByRole('heading', { name: 'Job Detail' })).toBeVisible();
      await expect(page.getByText(job.title)).toBeVisible();
      await expect(page.getByText(job.company_name)).toBeVisible();
      await expect(page.getByText(job.description)).toBeVisible();
      await expect(page.getByText(job.location)).toBeVisible();
      await expect(page.getByText(job.type)).toBeVisible();

      await expect(page.getByRole('button', { name: 'Edit Job' })).not.toBeVisible();
      await expect(page.getByRole('button', { name: 'Delete Job' })).not.toBeVisible();
    });
  });
});
