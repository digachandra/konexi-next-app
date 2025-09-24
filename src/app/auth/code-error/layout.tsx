import Container from '@/components/container';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <Container className="flex max-w-sm flex-1 justify-center gap-8">{children}</Container>;
}
