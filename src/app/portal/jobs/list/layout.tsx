import { ReactNode } from 'react';
import { routes } from '@/routes';
import { Header } from '@portal/header';
import { HeaderActions, HeaderActionAdd } from '@portal/header/actions';
import { HeaderTitle } from '@portal/header/title';
import { Separator } from '@/components/ui/separator';
import { getSignedUser } from '@/lib/user';
import { Filter } from './_components/filter';

type LayoutProps = {
  children: ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const user = await getSignedUser();

  return (
    <>
      <Header>
        <HeaderTitle text="Jobs Board" />
        {user && (
          <HeaderActions>
            <HeaderActionAdd label="Add Job" href={routes.portal.jobs.add()} />
          </HeaderActions>
        )}
      </Header>
      <div className="flex flex-col gap-4">
        <Filter />
        <Separator />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
      </div>
    </>
  );
}
