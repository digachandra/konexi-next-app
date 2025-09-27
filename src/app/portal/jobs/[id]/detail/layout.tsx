import { ReactNode } from 'react';
import { getJob } from '@/actions/job';
import { routes } from '@/routes';
import { Header } from '@portal/header';
import { HeaderActions, HeaderActionEdit } from '@portal/header/actions';
import { HeaderTitle } from '@portal/header/title';
import { getSignedUser } from '@/lib/user';
import { HeaderActionDelete } from './_action-delete';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ id: string }>;
};

export default async function Layout({ children, params }: LayoutProps) {
  const { id } = await params;
  const user = await getSignedUser();
  const { success, data } = await getJob(id);

  const allowActions = user && success && data && data.created_by === user.id;

  return (
    <>
      <Header>
        <HeaderTitle text="Job Detail" withBack />
        {allowActions && (
          <HeaderActions>
            <HeaderActionEdit label="Edit Job" href={routes.portal.jobs.edit(id)} />
            <HeaderActionDelete recordId={id} />
          </HeaderActions>
        )}
      </Header>
      <div className="mx-auto w-full max-w-2xl space-y-4">{children}</div>
    </>
  );
}
