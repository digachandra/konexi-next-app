import { routes } from '@/routes';
import { HeaderActions, HeaderActionEdit } from '@portal-header/actions';
import { HeaderTitle } from '@portal-header/title';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <HeaderTitle text="Job Detail" withBack />
      <HeaderActions>
        <HeaderActionEdit label="Edit Job" href={routes.portal.jobs.edit(id)} />
      </HeaderActions>
    </>
  );
}
