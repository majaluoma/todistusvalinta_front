import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { AccordionFiltersProps, Filters } from './../types';
import CheckboxWithHover from '@/components/customUi/CheckboxWithHover';
import { SlidersHorizontal } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@radix-ui/react-label';

/** Only present in vocational degrees and helps user to
 * calculate it's weighted means on each subject. Alternatively
 * just shows a help text to user.
 *
 */
export default function AccordionFilters({
  filters: options,
  defaultFilters,
  callback,
}: Readonly<AccordionFiltersProps>) {
  const [open, setOpen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (key: keyof Filters, value?: boolean) => {
    const newOptions = { ...options, [key]: value ?? !options[key] };
    callback(newOptions);
  };

  useEffect(() => {
    setIsDirty(JSON.stringify(options) !== JSON.stringify(defaultFilters));
  }, [options, defaultFilters]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex items-center gap-1 text-secondary">
        <div
          className={`rounded-full ${isDirty ? 'bg-secondary' : 'bg-primary'} px-4 md:gap-3 gap-1 text-secondary-foreground z-10 h-[35px] hover:text-primary hover:bg-accent cursor-pointer flex items-center justify-center`}
        >
          <span className="font-bold hidden md:block">Suodata</span>
          <SlidersHorizontal size={20} />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[17rem] md:w-[19rem] md:p-9 p-7 flex flex-col gap-5 mx-3"
      >
        <CheckboxWithHover
          label="Näytä yliopistot"
          value={options.universities}
          onChange={() => handleChange('universities')}
        />
        <CheckboxWithHover
          label="Näytä ammattikorkeakoulut"
          value={options.vocationalUnviersities}
          onChange={() => handleChange('vocationalUnviersities')}
        />
        <CheckboxWithHover
          label="Näytä vain mihin olisit päässyt"
          value={options.onlyPassed}
          onChange={() => handleChange('onlyPassed')}
        />
        <RadioGroup
          value={options.isSpring ? 'true' : 'false'}
          onValueChange={(value: string) =>
            handleChange('isSpring', value === 'true')
          }
          className="flex flex-row gap-3 mb-4 flex-wrap "
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="true" id="isSpring" />
            <Label htmlFor="isSpring">Kevään yhteishaku</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="false" id="isAutumn" />
            <Label htmlFor="isAutumn">Syksyn yhteishaku</Label>
          </div>
        </RadioGroup>
      </PopoverContent>
    </Popover>
  );
}
