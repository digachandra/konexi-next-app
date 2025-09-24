import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Lock } from 'lucide-react';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

type SidebarActionProps = {
  type?: 'link' | 'button';
  label: string;
  href?: string;
  onClick?: () => void;
  icon: LucideIcon;
  locked?: boolean;
  className?: string;
};

export function SidebarAction({
  type = 'link',
  label,
  href = '#',
  onClick,
  icon: Icon,
  locked,
  className,
}: SidebarActionProps) {
  const Content = (
    <>
      <Icon className="size-4 shrink-0" />
      <span className="truncate">{label}</span>
      {locked && <Lock className="ml-auto size-4 opacity-70" />}
    </>
  );

  if (locked) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild aria-disabled={true}>
          <span className="text-muted-foreground pointer-events-none cursor-not-allowed">
            {Content}
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  if (type === 'button') {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          type="button"
          className={cn(className)}
          onClick={locked ? undefined : onClick}
          disabled={locked}
        >
          {Content}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={href} className={cn(className)}>
          {Content}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
