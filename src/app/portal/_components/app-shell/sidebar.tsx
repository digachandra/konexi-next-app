import {
  Sidebar as RootSidebar,
  SidebarHeader,
  SidebarContent as RootSidebarContent,
  SidebarFooter as RootSidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Account } from './account';
import { SidebarScrolls } from './scrolls';
import { SidebarContent } from './sidebar-content';

type SidebarSectionProps = {
  as: 'content' | 'actions';
  label?: string;
  className?: string;
  children: React.ReactNode;
};

export function SidebarSection({
  as = 'content',
  label,
  className,
  children,
}: SidebarSectionProps) {
  return (
    <SidebarGroup className={className}>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      {as === 'actions' ? (
        <SidebarGroupContent>
          <SidebarMenu>{children}</SidebarMenu>
        </SidebarGroupContent>
      ) : (
        <SidebarGroupContent className="space-y-2 px-2">{children}</SidebarGroupContent>
      )}
    </SidebarGroup>
  );
}

export function Sidebar() {
  return (
    <RootSidebar variant="inset" className="py-6 [&_[data-slot=sidebar-separator]]:mx-0">
      <SidebarHeader className="hidden items-start px-3 md:block">
        <span className="text-base font-semibold">Portal</span>
      </SidebarHeader>
      <RootSidebarContent>
        <SidebarContent />
      </RootSidebarContent>
      <RootSidebarFooter className="px-0">
        <Account />
        <SidebarSection as="content" className="hidden md:block">
          <SidebarSeparator />
        </SidebarSection>
        <SidebarSection as="actions" className="hidden md:block">
          <SidebarScrolls />
        </SidebarSection>
      </RootSidebarFooter>
    </RootSidebar>
  );
}
