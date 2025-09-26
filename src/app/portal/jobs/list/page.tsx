import { notFound } from 'next/navigation';
import { getJobs } from '@/actions/job';
import { JobCard } from './_components/job-card';

type PageProps = {
  searchParams: Promise<{ location?: string; type?: string }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { location, type } = await searchParams;
  const { success, data } = await getJobs({ location, type });

  if (!success || !data || data.length === 0) {
    notFound();
  }

  return (
    <>
      {data.map((job) => (
        <JobCard key={`job-card-${job.id}`} {...job} />
      ))}
    </>
  );
}
