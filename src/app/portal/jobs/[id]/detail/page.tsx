import { notFound } from 'next/navigation';
import { getJob } from '@/actions/job';
import { Row } from '@portal/row';
import { Panel } from '@/components/panel';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const { success, data } = await getJob(id);

  if (!success || !data) {
    notFound();
  }

  return (
    <>
      <Panel title="Data">
        <Row label="Job Title" value={data.title} />
        <Row label="Company Name" value={data.company_name} />
        <Row label="Job Description">{data.description}</Row>
        <Row label="Job Location" value={data.location} />
        <Row label="Job Type" value={data.type} />
      </Panel>
      <Panel title="Audit">
        <Row label="ID" value={data.id} />
        <Row label="Created At" value={data.created_at} />
        <Row label="Updated At" value={data.updated_at} />
      </Panel>
    </>
  );
}
