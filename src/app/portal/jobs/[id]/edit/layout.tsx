import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getJob } from '@/actions/job';
import { JobProvider } from '@/contexts/job';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ id: string }>;
};

export default async function Layout({ children, params }: LayoutProps) {
  const { id } = await params;
  const { success, data } = await getJob(id);

  if (!success || !data) {
    notFound();
  }

  return <JobProvider value={data}>{children}</JobProvider>;
}
