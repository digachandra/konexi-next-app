import { HeaderBack } from './back';

type HeaderTitleProps = {
  text: string;
  withBack?: boolean;
};

export function HeaderTitle({ text, withBack }: HeaderTitleProps) {
  return (
    <div className="flex items-center gap-2">
      {withBack && <HeaderBack />}
      <h1 className="truncate text-xl font-bold">{text}</h1>
    </div>
  );
}
