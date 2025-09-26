import { notFound } from 'next/navigation';
import { getJobs } from '@/actions/job';
import { JobCard, JobCardSkeleton } from './_components/job-card';

export default async function Page() {
  const { success, data } = await getJobs();

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
