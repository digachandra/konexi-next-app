'use client';

import { useEffect, useMemo } from 'react';
import { JobInputSchema, JobTypeEnum, type JobInput } from '@/schemas/job';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Error } from '@/components/error';
import { SelectInput } from '@/components/inputs/select';
import { TextInput } from '@/components/inputs/text';
import { Panel } from '@/components/panel';
import { Button } from '@/components/ui/button';
import { Form as RootForm } from '@/components/ui/form';

type FormProps = {
  initialValues: Partial<JobInput>;
  loading?: boolean;
  error?: string | null;
  onSubmit: (values: JobInput) => Promise<void> | void;
  submitLabel?: string;
};

export function Form({
  initialValues,
  loading = false,
  error,
  onSubmit,
  submitLabel = 'Save',
}: FormProps) {
  const form = useForm<JobInput>({
    resolver: zodResolver(JobInputSchema),
    defaultValues: useMemo(
      () => ({
        title: initialValues.title ?? '',
        company_name: initialValues.company_name ?? '',
        description: initialValues.description ?? '',
        location: initialValues.location ?? '',
        type: initialValues.type ?? JobTypeEnum.enum['Full-Time'],
      }),
      [initialValues]
    ),
    mode: 'onTouched',
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  useEffect(() => {
    if (loading) return;
    reset({
      title: initialValues.title ?? '',
      company_name: initialValues.company_name ?? '',
      description: initialValues.description ?? '',
      location: initialValues.location ?? '',
      type: initialValues.type ?? JobTypeEnum.enum['Full-Time'],
    });
  }, [loading, initialValues, reset]);

  return (
    <RootForm {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-2xl">
        <Panel>
          <TextInput
            control={control}
            type="text"
            name="title"
            label="Job Title"
            disabled={loading}
          />
          <TextInput
            control={control}
            type="text"
            name="company_name"
            label="Company Name"
            disabled={loading}
          />
          <TextInput
            control={control}
            type="textarea"
            name="description"
            label="Job Description"
            disabled={loading}
          />
          <TextInput
            control={control}
            type="text"
            name="location"
            label="Job Location"
            disabled={loading}
          />
          <SelectInput
            control={control}
            name="type"
            label="Job Type"
            options={JobTypeEnum.options.map((s) => ({ value: s, label: s }))}
            disabled={loading || isSubmitting}
          />
          {error && <Error message={error} />}
          <Button type="submit" disabled={isSubmitting || loading} className="w-full">
            {isSubmitting ? 'Saving…' : submitLabel}
          </Button>
        </Panel>
      </form>
    </RootForm>
  );
}
