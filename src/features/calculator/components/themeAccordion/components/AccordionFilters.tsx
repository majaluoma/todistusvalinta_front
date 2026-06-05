import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { AccordionFiltersProps, Filters } from './../types';
import CheckboxWithHover from '@/components/customUi/CheckboxWithHover';
import { Filter } from 'lucide-react';

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

  const handleInteractOutside = (event: Event) => {
    event.preventDefault();
    setOpen(false);
  };

  const handleChange = (key: keyof Filters) => {
    const newOptions = { ...options, [key]: !options[key] };
    callback(newOptions);
    setIsDirty(JSON.stringify(newOptions) !== JSON.stringify(defaultFilters));
  };

  

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex items-center gap-1 text-secondary">
        <div className={`rounded-full ${isDirty ? 'bg-secondary' : 'bg-primary'} px-4 gap-1 text-secondary-foreground z-10 h-[35px] hover:text-primary hover:bg-accent cursor-pointer flex items-center justify-center`}>
          <span className="font-bold">Suodata</span>
          <Filter size={20} />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[17rem] md:w-[19rem] md:p-9 p-7 flex flex-col gap-5 mx-3"
        onInteractOutside={handleInteractOutside}
      >
        <CheckboxWithHover
          label="Näytä yliopistot"
          value={options.universities}
          onChange={() => handleChange('universities')}
          tooltip="Näytä vain yliopistot"
        />
        <CheckboxWithHover
          label="Näytä ammattikorkeakoulut"
          value={options.vocationalUnviersities}
          onChange={() => handleChange('vocationalUnviersities')}
          tooltip="Näytä vain ammattikorkeakoulut"
        />
        <CheckboxWithHover
          label="Näytä vain mihin olisit päässyt"
          value={options.onlyPassed}
          onChange={() => handleChange('onlyPassed')}
          tooltip="Näytä vain paikat joihin viime vuonna olisit päässyt"
        />
      </PopoverContent>
    </Popover>
  );
}
