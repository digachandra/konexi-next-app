'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createJob } from '@/actions/job';
import { routes } from '@/routes';
import { JobTypeEnum, type JobInput } from '@/schemas/job';
import { getFormData } from '@/lib/form';
import { Form } from '../_components/form';

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(values: JobInput) {
    setError(null);

    const res = await createJob(getFormData(values));

    if (!res.success) {
      setError(res.error ?? 'Failed to create job');
      return;
    }

    router.push(routes.portal.jobs.detail(res.data?.id || ''));
    router.refresh();
  }

  const initialValues: Partial<JobInput> = {
    type: JobTypeEnum.enum['Full-Time'],
  };

  return (
    <Form
      initialValues={initialValues}
      error={error}
      onSubmit={handleSubmit}
      submitLabel="Create Job"
    />
  );
}
