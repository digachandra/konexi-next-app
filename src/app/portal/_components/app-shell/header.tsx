import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  return (
    <div
      className={cn('bg-background sticky top-0 z-50 flex h-12 items-center gap-2 px-4', className)}
    >
      <SidebarTrigger variant="outline" size="icon" />
      <span className="text-base font-semibold">Portal</span>
    </div>
  );
}
