import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FieldValues } from 'react-hook-form';
import { SeasonsRadioGroupProps } from '../types/types';

/** Allows user to change between seasons
 */
export default function SeasonsRadioGroup<T extends FieldValues>({
  formcontrol,
  name,
}: Readonly<SeasonsRadioGroupProps<T>>) {
  return (
    <FormField
      control={formcontrol}
      name={name}
      key="isSpring"
      render={(field) => (
        <FormItem>
          <div className="flex flex-wrap flex-row items-baseline gap-2">
            <RadioGroup
              name="isSpring"
              className="flex flex-row gap-3 mb-4 flex-wrap "
              value={field.field.value.toString()}
              onValueChange={(value) => field.field.onChange(value === 'true')}
            >
              <div className="flex items-center gap-3">
                <FormControl>
                  <RadioGroupItem
                    value="true"
                    id="isSpring"
                    className="size-6"
                  />
                </FormControl>
                <Label htmlFor="true">Kevään yhteishaku</Label>
              </div>
              <div className="flex items-center gap-3">
                <FormControl>
                  <RadioGroupItem
                    value="false"
                    id="notSpring"
                    className="size-6"
                  />
                </FormControl>
                <Label htmlFor="false">Syksyn yhteishaku</Label>
              </div>
            </RadioGroup>
          </div>
        </FormItem>
      )}
    />
  );
}
