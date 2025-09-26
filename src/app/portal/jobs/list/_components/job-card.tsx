import { ReactNode } from 'react';
import Link from 'next/link';
import { routes } from '@/routes';
import type { Job } from '@/schemas/job';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

type JobValueProps = {
  label: string;
  value?: string;
  children?: ReactNode;
};

function JobValue({ label, value, children }: JobValueProps) {
  return (
    <div className="flex flex-col gap-1 text-sm md:flex md:flex-row md:items-center md:gap-2">
      <span className="text-muted-foreground flex-1">{label}</span>
      {value ? <span>{value}</span> : children ? <div>{children}</div> : <></>}
    </div>
  );
}

export function JobCardSkeleton() {
  return (
    <Card className="py-4">
      <CardHeader className="px-4">
        <CardTitle>
          <Skeleton className="h-6 w-full" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-6 w-1/2" />
        </CardDescription>
      </CardHeader>
      <CardContent className="b flex-1 space-y-2 border-t px-4 !pt-4">
        <JobValue label="Location">
          <Skeleton className="h-6 w-40" />
        </JobValue>
        <Separator />
        <JobValue label="Type">
          <Skeleton className="h-6 w-32" />
        </JobValue>
      </CardContent>
      <CardFooter className="border-t px-4">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}

export function JobCard({ id, title, company_name, location, type }: Job) {
  return (
    <Card className="py-4">
      <CardHeader className="px-4">
        <CardTitle className="leading-snug">{title}</CardTitle>
        <CardDescription>{company_name}</CardDescription>
      </CardHeader>
      <CardContent className="b flex-1 space-y-2 border-t px-4 !pt-4">
        <JobValue label="Location" value={location} />
        <Separator />
        <JobValue label="Type" value={type} />
      </CardContent>
      <CardFooter className="border-t px-4">
        <Link href={routes.portal.jobs.detail(id)} className="w-full">
          <Button className="w-full">See Job Detail</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
