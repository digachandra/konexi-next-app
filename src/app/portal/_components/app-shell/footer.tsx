import { copyrightText } from '@/lib/copyright';
import { cn } from '@/lib/utils';
import { FooterScrolls } from './scrolls';

export async function Footer() {
  return (
    <div
      className={cn(
        'flex h-12 items-center gap-4 px-4',
        'sticky bottom-0 z-50 justify-between border-t bg-white',
        'md:relative md:mb-4 md:justify-center md:border-none md:bg-transparent'
      )}
    >
      <span className="text-xs">{copyrightText}</span>
      <FooterScrolls />
    </div>
  );
}
