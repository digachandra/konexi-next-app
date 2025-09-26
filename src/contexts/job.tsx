'use client';

import { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import type { Job } from '@/schemas/job';

const ClientContext = createContext<Job | null>(null);

export function useJob() {
  const ctx = useContext(ClientContext);
  if (!ctx) throw new Error('useJob must be used within JobProvider');
  return ctx;
}

type JobProviderProps = {
  value: Job;
  children: ReactNode;
};

export function JobProvider({ value, children }: JobProviderProps) {
  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
}
