import Container from '@/components/container';
import { Header } from '@/components/header';
import { Panel } from '@/components/inputs/panel';
import { requireAuth } from '@/lib/auth';

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  const { data } = await requireAuth();

  return (
    <>
      <Header title="Reset Your Password" withBack />
      <Container className="max-w-lg justify-center space-y-8">
        <Panel>
          <p className="text-sm">
            Change password for <strong>{data.user.email}</strong>
          </p>
        </Panel>
        {children}
      </Container>
    </>
  );
}
