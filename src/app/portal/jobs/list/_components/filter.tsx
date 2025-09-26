'use client';

import { useSearchParams } from 'next/navigation';
import { JobTypeEnum } from '@/schemas/job';
import { Panel } from '@/components/panel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export function Filter() {
  const searchParams = useSearchParams();
  const defaultLocation = searchParams.get('location') ?? '';
  const defaultType = searchParams.get('type') ?? '';

  return (
    <Panel>
      <span className="text-base font-semibold">Filter</span>
      <form method="GET" className="mt-4 flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex flex-1 gap-4 md:flex-1 md:flex-row">
          <div className="flex-1 space-y-2">
            <Label htmlFor="filter-location">Location</Label>
            <Input
              id="filter-location"
              name="location"
              type="text"
              defaultValue={defaultLocation}
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label htmlFor="filter-type">Type</Label>
            <Select defaultValue={defaultType} name="type">
              <SelectTrigger id="filter-type" className="m-0 w-full">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={`filter-type-all`} value={'All Types'}>
                  All Types
                </SelectItem>
                {JobTypeEnum.options.map((opt) => (
                  <SelectItem key={`filter-all-${opt}`} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button type="submit" className="w-full md:w-auto">
          Apply
        </Button>
      </form>
    </Panel>
  );
}
