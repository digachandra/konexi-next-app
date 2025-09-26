import { routes } from '@/routes';
import { Briefcase } from 'lucide-react';
import { SidebarSection } from './sidebar';
import { SidebarAction } from './sidebar-action';

export function SidebarContent() {
  return (
    <>
      <SidebarSection as="actions">
        <SidebarAction href={routes.portal.jobs.list()} label="Jobs" icon={Briefcase} />
      </SidebarSection>
    </>
  );
}
