import Link from 'next/link';
import { routes } from '@/routes';
import Container from '@/components/container';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { requireNonAuth } from '@/lib/auth';

type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  await requireNonAuth();

  return (
    <Container className="flex max-w-lg flex-1 justify-center gap-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Register Your Account</CardTitle>
          <CardDescription>
            Sign up with your email & password to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="justify-center">
          <Link href={routes.auth.login()} className="text-muted-foreground underline">
            or back to login page
          </Link>
        </CardFooter>
      </Card>
    </Container>
  );
}
