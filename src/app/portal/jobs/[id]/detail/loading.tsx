import { Row } from '@/app/portal/_components/row';
import { Panel } from '@/components/panel';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <Panel title="Data">
        <Row label="Job Title">
          <Skeleton className="h-4 w-48" />
        </Row>
        <Row label="Company Name">
          <Skeleton className="h-4 w-40" />
        </Row>
        <Row label="Job Description">
          <Skeleton className="h-20 w-full" />
        </Row>
        <Row label="Job Location">
          <Skeleton className="h-4 w-40" />
        </Row>
        <Row label="Job Type">
          <Skeleton className="h-4 w-32" />
        </Row>
      </Panel>
      <Panel title="Audit">
        <Row label="ID">
          <Skeleton className="h-4 w-64" />
        </Row>
        <Row label="Created At">
          <Skeleton className="h-4 w-32" />
        </Row>
        <Row label="Updated At">
          <Skeleton className="h-4 w-32" />
        </Row>
      </Panel>
    </>
  );
}
