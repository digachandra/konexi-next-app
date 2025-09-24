import { routes } from '@/routes';
import { HeaderActions, HeaderActionAdd } from '@portal-header/actions';
import { HeaderTitle } from '@portal-header/title';

export default function Page() {
  return (
    <>
      <HeaderTitle text="Jobs Board" />
      <HeaderActions>
        <HeaderActionAdd label="Add Job" href={routes.portal.jobs.add()} />
      </HeaderActions>
    </>
  );
}
