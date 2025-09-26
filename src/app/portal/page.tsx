import { Center } from '@/components/center';
import { createClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Center>
      <span className="text-4xl">👋</span>
      <div className="text-muted-foreground flex flex-col gap-0 text-center">
        <p className="text-lg">Welcome to portal</p>
        {user?.email && <span className="text-sm">{user?.email}</span>}
      </div>
    </Center>
  );
}
