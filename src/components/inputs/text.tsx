import { ReactNode } from 'react';
import { Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type TextInputProps<TFieldValues extends FieldValues = FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  type?: string | 'textarea';
  label: string;
  labelAction?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
};

export function TextInput<TFieldValues extends FieldValues = FieldValues>({
  control,
  type = 'text',
  name,
  label,
  labelAction,
  placeholder,
  disabled,
}: TextInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between gap-4">
            <FormLabel>{label}</FormLabel>
            {labelAction}
          </div>
          <FormControl>
            {type === 'textarea' ? (
              <Textarea {...field} disabled={disabled} />
            ) : (
              <Input type={type} placeholder={placeholder} {...field} disabled={disabled} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
