import { z } from 'zod';

export const JobTypeEnum = z.enum(['Full-Time', 'Part-Time', 'Contract']);
export type JobType = z.infer<typeof JobTypeEnum>;

export const JobInputSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  company_name: z.string().min(1, 'Company Name is required'),
  description: z.string().min(1, 'Job description is required'),
  location: z.string().min(1, 'Job location is required'),
  type: JobTypeEnum,
});

export type JobInput = z.infer<typeof JobInputSchema>;

export const JobSchema = z.object({
  id: z.string(),
  title: z.string(),
  company_name: z.string(),
  description: z.string(),
  location: z.string(),
  type: JobTypeEnum,
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export type Job = z.infer<typeof JobSchema>;
