'use client';

import { deleteJob } from '@/actions/job';
import { routes } from '@/routes';
import { HeaderActionDelete as RootHeaderActionDelete } from '@portal/header/actions';
import { DeleteDialogProvider } from '@/components/delete-dialog';

type HeaderActionDeleteProps = {
  recordId: string;
};

export function HeaderActionDelete({ recordId }: HeaderActionDeleteProps) {
  return (
    <DeleteDialogProvider>
      <RootHeaderActionDelete
        label="Delete Job"
        handleDelete={async () => {
          const res = await deleteJob(recordId);
          return res;
        }}
        redirectTo={routes.portal.jobs.list()}
      />
    </DeleteDialogProvider>
  );
}
