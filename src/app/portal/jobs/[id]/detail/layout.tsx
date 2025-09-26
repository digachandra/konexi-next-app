import { ReactNode } from 'react';
import { routes } from '@/routes';
import { Header } from '@portal/header';
import { HeaderActions, HeaderActionEdit } from '@portal/header/actions';
import { HeaderTitle } from '@portal/header/title';
import { HeaderActionDelete } from './_action-delete';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ id: string }>;
};

export default async function Layout({ children, params }: LayoutProps) {
  const { id } = await params;

  return (
    <>
      <Header>
        <HeaderTitle text="Job Detail" withBack />
        <HeaderActions>
          <HeaderActionEdit label="Edit Job" href={routes.portal.jobs.edit(id)} />
          <HeaderActionDelete recordId={id} />
        </HeaderActions>
      </Header>
      <div className="mx-auto w-full max-w-2xl space-y-4">{children}</div>
    </>
  );
}
