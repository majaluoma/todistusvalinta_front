import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { OptionCheckBoxProps } from '../types/types';
import { FieldValues } from 'react-hook-form';
import CheckboxWithHover from '@/components/customUi/CheckboxWithHover';

/** Allows user to input boolean-type data to form
 *
 *
 */
export default function OptionCheckBox<T extends FieldValues>({
  formcontrol,
  label,
  name,
  tooltip,
}: Readonly<OptionCheckBoxProps<T>>) {
  return (
    <FormField
      control={formcontrol}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
          <FormControl>
            <CheckboxWithHover
              tooltip={tooltip}
              value={field.value}
              onChange={field.onChange}
            />
          </FormControl>
          <FormLabel className="self-center">{label}</FormLabel>
        </FormItem>
      )}
    />
  );
}
