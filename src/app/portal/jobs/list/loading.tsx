import { JobCardSkeleton } from './_components/job-card';

export default function Layout() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <JobCardSkeleton key={`job-card-skeleton-${i}`} />
      ))}
    </>
  );
}
