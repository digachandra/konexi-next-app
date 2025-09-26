'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateJob } from '@/actions/job';
import { useJob } from '@/contexts/job';
import { routes } from '@/routes';
import { type JobInput } from '@/schemas/job';
import { getFormData } from '@/lib/form';
import { Form } from '../../_components/form';

export default function Page() {
  const job = useJob();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(values: JobInput) {
    setError(null);

    const res = await updateJob(job.id, getFormData(values));

    if (!res.success) {
      setError(res.error ?? 'Failed to update job');
      return;
    }

    router.push(routes.portal.jobs.detail(res.data?.id || ''));
    router.refresh();
  }

  const initialValues: Partial<JobInput> = {
    title: job.title,
    company_name: job.company_name,
    description: job.description,
    location: job.location,
    type: job.type,
  };

  return (
    <Form
      initialValues={initialValues}
      error={error}
      onSubmit={handleSubmit}
      submitLabel="Update Job"
    />
  );
}
