import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type PanelProps = {
  title?: string;
  className?: string;
  children: ReactNode;
};

export function Panel({ title, className, children }: PanelProps) {
  return (
    <Card className={cn('gap-4 py-4', className)}>
      {title && (
        <CardHeader className="block px-4">
          <CardTitle className="text-base leading-none">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-4 px-4">{children}</CardContent>
    </Card>
  );
}
