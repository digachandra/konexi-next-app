import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getJob } from '@/actions/job';
import { JobProvider } from '@/contexts/job';
import { Header } from '@portal/header';
import { HeaderTitle } from '@portal/header/title';

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

  return (
    <>
      <Header>
        <HeaderTitle text="Edit Job" withBack />
      </Header>
      <JobProvider value={data}>{children}</JobProvider>
    </>
  );
}
