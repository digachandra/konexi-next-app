import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PanelProps = {
  title?: string;
  className?: string;
  children: ReactNode;
};

export function Panel({ title, className, children }: PanelProps) {
  return (
    <Card className={className}>
      {title && (
        <CardHeader className="block">
          <CardTitle className="text-lg leading-none">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}
