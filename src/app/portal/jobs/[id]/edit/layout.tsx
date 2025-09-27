import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getJob } from '@/actions/job';
import { JobProvider } from '@/contexts/job';
import { Header } from '@portal/header';
import { HeaderTitle } from '@portal/header/title';
import { requireAuth } from '@/lib/auth';
import { getSignedUser } from '@/lib/user';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ id: string }>;
};

export default async function Layout({ children, params }: LayoutProps) {
  await requireAuth();

  const { id } = await params;
  const { success, data } = await getJob(id);
  const user = await getSignedUser();
  const allowEdit = data?.created_by == user?.id;

  if (!success || !data || !allowEdit) {
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
