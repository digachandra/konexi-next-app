'use server';

import { JobInputSchema, JobSchema, type Job } from '@/schemas/job';
import { createClient } from '@/lib/supabase/server';
import type { ActionResponse } from './types';

const JOB_TABLE = 'jobs';
const JOB_COLUMNS = 'id, title, company_name, description, location, type, created_at, updated_at';
const INVALID_REQUEST_PAYLOAD_ERROR: ActionResponse<never> = {
  success: false,
  error: 'Invalid request payload format',
};
const INVALID_RESPONSE_PAYLOAD_ERROR: ActionResponse<never> = {
  success: false,
  error: 'Invalid response payload format',
};

export async function createJob(formData: FormData): Promise<ActionResponse<Job>> {
  try {
    const rawPayload = Object.fromEntries(formData) as Record<string, unknown>;
    const requestPayload = JobInputSchema.safeParse(rawPayload);
    if (!requestPayload.success) {
      return INVALID_REQUEST_PAYLOAD_ERROR;
    }

    const supabase = await createClient();
    const queryResponse = await supabase
      .from(JOB_TABLE)
      .insert(requestPayload.data)
      .select(JOB_COLUMNS)
      .single();

    if (queryResponse.error) return { success: false, error: queryResponse.error.message };

    const responsePayload = JobSchema.safeParse(queryResponse.data);
    if (!responsePayload.success) {
      return INVALID_RESPONSE_PAYLOAD_ERROR;
    }

    return { success: true, data: queryResponse.data };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

export async function getJob(id: string): Promise<ActionResponse<Job>> {
  try {
    const supabase = await createClient();
    const queryResponse = await supabase.from(JOB_TABLE).select(JOB_COLUMNS).eq('id', id).single();

    if (queryResponse.error) return { success: false, error: queryResponse.error.message };

    const { success: isQueryResponseValid } = JobSchema.safeParse(queryResponse.data);
    if (!isQueryResponseValid) {
      return INVALID_RESPONSE_PAYLOAD_ERROR;
    }

    return { success: true, data: queryResponse.data };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Unknown error' };
  }
}
