import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import WeightedMeanCalculator from './WeightedMeanCalculator';
import { useState } from 'react';
import { VocationalHelperProps } from './types';
import { Button } from '@/components/ui/button';

/** Only present in vocational degrees and helps user to
 * calculate it's weighted means on each subject. Alternatively
 * just shows a help text to user.
 *
 */
export default function VocationalHelper({
  calculator: { subjects, gradeOptions, text },
  callback,
}: Readonly<VocationalHelperProps>) {
  const [open, setOpen] = useState(false);

  const saveAndClose = (result: number) => {
    setOpen(false);
    callback(result);
  };
  const handleInteractOutside = (event: Event) => {
    event.preventDefault();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div
          className={`font-bold text-2xl rounded-full bg-secondary text-secondary-foreground z-10 w-[35px] h-[35px] hover:bg-accent cursor-pointer`}
        >
          ?
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[21rem] md:w-[33rem] p-9 flex-col gap-5 mx-3"
        onInteractOutside={handleInteractOutside}
      >
        <Button
        type="button"
        variant="secondary"
        size="sm"
        className="absolute text-base top-2 right-5"
        onClick={function handleClick() {setOpen(false)}}
        >X</Button>
        {subjects.length < 1 ? (
          <>{text}</>
        ) : (
          <>
            <p>{text}</p>
            <WeightedMeanCalculator
              gradeOptions={gradeOptions}
              subjects={subjects}
              callback={callback}
              saveAndClose={saveAndClose}
            />
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
