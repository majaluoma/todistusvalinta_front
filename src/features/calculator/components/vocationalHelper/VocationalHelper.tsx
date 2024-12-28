import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import WeightedMeanCalculator from './WeightedMeanCalculator';
import { MeanCalculator } from '../../types/types';
import { useState } from 'react';

type VocationalHelperProps = {
  calculator: MeanCalculator;
  callback : (result : number) => void;
};

export default function VocationalHelper({
  calculator: { subjects, gradeOptions, text },
  callback 
}: Readonly<VocationalHelperProps>) {
    const [open, setOpen] = useState(false)

    const closeWindow = (result : number) => {
        setOpen(false);
        callback(result)
    } 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
      <div
        className={`font-bold text-2xl rounded-full bg-secondary text-secondary-foreground z-10 w-[35px] h-[35px] hover:bg-accent cursor-pointer`}
      >
        ?
      </div>
      </PopoverTrigger>
      {subjects.length < 1 ? (
        <PopoverContent className='w-2/3 p-9'>{text}</PopoverContent>
      ) : (
        <PopoverContent className='w-2/3 p-9 flex flex-col gap-5'>
          <p>{text}</p>
          <WeightedMeanCalculator gradeOptions={gradeOptions} subjects={subjects} callback={closeWindow}/>
        </PopoverContent>
      )}
    </Popover>
  );
}
