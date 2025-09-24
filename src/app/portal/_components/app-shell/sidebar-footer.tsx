import { IdCard, LogOut } from 'lucide-react';
import { SidebarSection } from './sidebar';
import { SidebarAction } from './sidebar-action';

export type SidebarFooterProps = {
  userEmail: string;
  onSignOut: () => void;
};

export function SidebarFooter({ userEmail, onSignOut }: SidebarFooterProps) {
  return (
    <SidebarSection as="actions" label={userEmail}>
      <SidebarAction label="Profile" icon={IdCard} locked />
      <SidebarAction
        type="button"
        label="Logout"
        icon={LogOut}
        onClick={onSignOut}
        className="text-destructive"
      />
    </SidebarSection>
  );
}
