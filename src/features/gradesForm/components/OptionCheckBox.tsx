import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { OptionCheckBoxProps } from '../types/types';
import { FieldValues } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import HoverInfo from '@/components/customUi/HoverInfo';

export default function OptionCheckBox<T extends FieldValues>({
  formcontrol,
  label,
  name,
  tooltip,
}: OptionCheckBoxProps<T>) {
  return (
    <FormField
      control={formcontrol}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <HoverInfo text={tooltip}>
              <FormLabel>{label}</FormLabel>
            </HoverInfo>
          </div>
        </FormItem>
      )}
    />
  );
}