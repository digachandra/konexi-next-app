function Empty() {
  return <span className="text-muted-foreground/50 text-sm font-semibold">EMPTY</span>;
}

type RowProps = {
  label: string;
  value?: string | null;
  children?: React.ReactNode;
};

export function Row({ label, value, children }: RowProps) {
  return (
    <div className="flex flex-col text-sm">
      <span className="font-semibold">{label}</span>
      <div className="text-sm">{children || value || <Empty />}</div>
    </div>
  );
}
