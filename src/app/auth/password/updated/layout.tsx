import Container from '@/components/container';
import { requireNonAuth } from '@/lib/auth';

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  await requireNonAuth();

  return <Container className="flex max-w-sm flex-1 justify-center gap-8">{children}</Container>;
}
