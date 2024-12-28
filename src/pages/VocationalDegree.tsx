import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Calculator from '@/features/calculator/Calculator';
import { useState } from 'react';

export default function VocationalDegree() {
  const [degreeScale, setDegreeScale] = useState<"1-3" | "1-5">("1-5");

  const handleChange = (value : string) => {
    if (value === "1-3" || value === "1-5") {
      setDegreeScale(value);
    }
  }

  const optionType5 = [
    {
      type: 'ammMalu1-5',
    },
    {
      type: 'ammYhty1-5',
    },
    {
      type: 'ammVivu1-5',
    },
    {
      type: 'ammKa1-5',
    },
  ];
  const optionType3 = [
    {
      type: 'ammMalu1-3',
    },
    {
      type: 'ammYhty1-3',
    },
    {
      type: 'ammVivu1-3',
    },
    {
      type: 'ammKa1-3',
    },
  ];
  return (
    <>
      <RadioGroup defaultValue="1-5" onValueChange={handleChange} className='flex flex-row gap-6 mb-4'  >
        <p>Valitse todistuksesi arviointiasteikko:</p>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="1-5" id="1-5" />
          <Label htmlFor="1-5">1-5</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="1-3" id="1-3"/>
          <Label htmlFor="1-3">1-3</Label>
        </div>
      </RadioGroup>
      {degreeScale === "1-5" ? (
        <Calculator
          optionTypes={optionType5}
          addableOptions={false}
          vocational={true}
        />
      ) : (
        <Calculator
          optionTypes={optionType3}
          addableOptions={false}
          vocational={true}
        />
      )}
    </>
  );
}
