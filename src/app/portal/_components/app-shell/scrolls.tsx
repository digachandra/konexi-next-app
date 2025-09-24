'use client';

import { ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToTop, scrollToBottom } from '@/lib/scroll';
import { cn } from '@/lib/utils';
import { SidebarAction } from './sidebar-action';

export function SidebarScrolls() {
  return (
    <>
      <SidebarAction type="button" onClick={scrollToTop} icon={ArrowUp} label="Scroll to top" />
      <SidebarAction
        type="button"
        onClick={scrollToBottom}
        icon={ArrowDown}
        label="Scroll to bottom"
      />
    </>
  );
}

export function FooterScrolls() {
  return (
    <div
      className={cn(
        '-mt-1 flex gap-1 md:hidden',
        '[&_[data-slot=button]]:bg-transparent [&_[data-slot=button]]:shadow-none'
      )}
    >
      <Button variant="outline" size="sm" onClick={scrollToTop}>
        <ArrowUp />
      </Button>
      <Button variant="outline" size="sm" onClick={scrollToBottom}>
        <ArrowDown />
      </Button>
    </div>
  );
}
