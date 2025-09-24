'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ActionResponse } from '@/actions/types';
import { Pencil, Plus, Trash2, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

type HeaderActionContentProps = {
  icon?: LucideIcon;
  label?: string;
};

function HeaderActionContent({ icon: Icon, label }: HeaderActionContentProps) {
  return (
    <>
      {Icon && <Icon className="h-4 w-4" />}
      <span className="hidden lg:inline">{label}</span>
    </>
  );
}

type HeaderActionProps = {
  label?: string;
  href?: string;
  onClick?: () => void;
};

type HeaderActionLinkProps = HeaderActionContentProps & {
  href: string;
};

export function HeaderActionAdd(props: HeaderActionLinkProps) {
  const { label, href } = props;
  const router = useRouter();

  return (
    <Button type="button" onClick={() => router.push(href)} size="sm">
      <HeaderActionContent icon={Plus} label={label || 'Add Record'} />
    </Button>
  );
}

export function HeaderActionEdit(props: HeaderActionLinkProps) {
  const { label, href } = props;
  const router = useRouter();

  return (
    <Button type="button" onClick={() => router.push(href)} size="sm" variant="outline">
      <HeaderActionContent icon={Pencil} label={label || 'Edit Record'} />
    </Button>
  );
}

type HeaderActionButtonProps = HeaderActionContentProps & {
  handleDelete: () => Promise<ActionResponse>;
  redirectTo: string;
};

export function HeaderActionDelete(props: HeaderActionButtonProps) {
  const { label, handleDelete, redirectTo } = props;
  const router = useRouter();

  return (
    <Button
      type="button"
      onClick={async () => {
        const confirmed = window.confirm(
          'Are you sure you want to delete this record? This action cannot be undone.'
        );
        if (!confirmed) return;

        const { error } = await handleDelete();
        if (error) {
          alert(error);
          return;
        }

        router.push(redirectTo);
        router.refresh();
      }}
      size="sm"
      variant="destructive"
    >
      <HeaderActionContent icon={Trash2} label={label || 'Delete Record'} />
    </Button>
  );
}

type HeaderActionsProps = {
  children: ReactNode;
};

export function HeaderActions({ children }: HeaderActionsProps) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>;
}
