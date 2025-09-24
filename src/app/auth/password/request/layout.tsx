import Container from '@/components/container';
import { Header } from '@/components/header';
import { requireNonAuth } from '@/lib/auth';

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  await requireNonAuth();

  return (
    <>
      <Header title="Reset Password Request" withBack />
      <Container className="max-w-lg justify-center">{children}</Container>
    </>
  );
}
