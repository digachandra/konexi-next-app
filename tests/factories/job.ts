import { Job, JobInput, JobTypeEnum } from '@/schemas/job';
import { faker } from '@faker-js/faker';
import { supabase } from '@tests/lib/supabase/client';

const JOB_COLUMNS = 'id, title, company_name, description, location, type, created_at, updated_at';

export function buildJob(overrides?: Partial<JobInput>): JobInput {
  return {
    title: faker.name.jobTitle(),
    company_name: faker.company.name(),
    description: faker.lorem.paragraph(),
    location: faker.address.city(),
    type: faker.helpers.arrayElement(JobTypeEnum.options),
    ...overrides,
  };
}

export async function createJob(input: Partial<JobInput> = {}): Promise<Job> {
  const builtInput = buildJob(input);
  const { data, error } = await supabase.from('jobs').insert(builtInput).select().single();

  if (error || !data) {
    throw error || new Error('Failed to create job');
  }

  return data as Job;
}

export async function findJobByTitle(title: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from('jobs')
    .select(JOB_COLUMNS)
    .eq('title', title)
    .single();

  if (error) {
    return null;
  }

  return data as Job;
}

export async function deleteJob(id: string): Promise<boolean> {
  const { error } = await supabase.from('jobs').delete().eq('id', id);
  if (error) {
    throw error;
  }
  return true;
}
