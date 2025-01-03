import AdsBanner from '@/components/customUi/adsBanner/AdsBanner';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BannerAdsVocational } from '@/data/adsData';
import Calculator from '@/features/calculator/Calculator';
import { MeanCalculator } from '@/features/calculator/types/types';
import { useState } from 'react';

type ScaleOptions = {
  scale: string;
  optionTypes: {
    type: string;
  }[];
  gradeOptions : number [];
  helperCalculators : MeanCalculator[]
};

const optionType5 = [
  { type: 'ammVivu1-5' },
  { type: 'ammMalu1-5' },
  { type: 'ammYhty1-5' },
  { type: 'ammKa1-5' },
];
const optionType3 = [
  { type: 'ammVivu1-3' },
  { type: 'ammMalu1-3' },
  { type: 'ammYhty1-3' },
  { type: 'ammKa1-3' },
];

const gradeOptions5 = [1, 2, 3, 4, 5];

const gradeOptions3 = [1, 2, 3];

const helperCalculator5: MeanCalculator[] = [
  {
    subjects: [
      { subject: 'Äidinkieli', points: 4 },
      { subject: 'Toinen kotimainen kieli', points: 1 },
      { subject: 'Vieras kieli', points: 3 },
      { subject: 'Toiminta digitaalisessa ympäristössä', points: 2 },
      { subject: 'Taide ja luova ilmaisu', points: 1 },
    ],
    gradeOptions: gradeOptions5,
    text: 'Löydät tarvitsemasi tarkemmat arvosanat todistuksestasi esimerkiksi opintopolusta',
  },
  {
    subjects: [
      { subject: 'Matematiikka', points: 4 },
      { subject: 'Fysikaaliset ja kemialliset ilmiöt', points: 1 },
    ],
    gradeOptions: gradeOptions5,
    text: 'Löydät tarvitsemasi tarkemmat arvosanat todistuksestasi esimerkiksi opintopolusta',
  },
  {
    subjects: [
      { subject: 'Yhteiskunnassa ja kansalaisena toimiminen', points: 2 },
      { subject: 'Työelämässä toimiminen', points: 2 },
      { subject: 'Opiskelu- ja urasuunnitteluvalmiudet', points: 1 },
      { subject: 'Yrittäjyys ja yrittäjämäinen toiminta', points: 1 },
      { subject: 'Työkyvyn ja hyvinvoinnin ylläpitäminen', points: 1 },
      { subject: 'Kestävän kehityksen edistäminen', points: 1 },
    ],
    gradeOptions: gradeOptions5,
    text: 'Löydät tarvitsemasi tarkemmat arvosanat todistuksestasi esimerkiksi opintopolusta',
  },
  {
    subjects: [],
    gradeOptions: gradeOptions5,
    text: 'Tutkinnon painotettu keskiarvo löytyy suoraan ammatillisen perustutkinnon todistuksesta. Sen löydät myös oma Opintopolku -palvelusta.',
  },
];

const helperCalculator3 = helperCalculator5.map((calculator) => {
  return { ...calculator, gradeOptions: gradeOptions3 };
});

export default function VocationalDegree() {
  const [degreeScale, setDegreeScale] = useState<ScaleOptions>({
    scale:'1-5',
    optionTypes: optionType5,
    gradeOptions: gradeOptions5,
    helperCalculators: helperCalculator5
  });

  const handleChange = (value: string) => {
    if (value === '1-3') {
      setDegreeScale({
        scale:'1-3',
        optionTypes: optionType3,
        gradeOptions: gradeOptions3,
        helperCalculators: helperCalculator3
      });
    }else {
      setDegreeScale({
        scale:'1-5',
        optionTypes: optionType5,
        gradeOptions: gradeOptions5,
        helperCalculators: helperCalculator5
      });
    }
  };

 

  return (
    <div className="flex flex-col items-center">
      <RadioGroup
        defaultValue="1-5"
        onValueChange={handleChange}
        className="flex flex-row gap-3 mb-4 flex-wrap mx-4"
      >
        <p>Valitse todistuksesi arviointiasteikko:</p>
        <div className="flex items-center">
          <RadioGroupItem value="1-5" id="1-5" />
          <Label htmlFor="1-5">1-5</Label>
        </div>
        <div className="flex items-center ">
          <RadioGroupItem value="1-3" id="1-3" />
          <Label htmlFor="1-3">1-3</Label>
        </div>
      </RadioGroup>
        <Calculator
          optionTypes={degreeScale.optionTypes}
          addableOptions={false}
          vocational={true}
          helperCalculators={degreeScale.helperCalculators}
        >
          <AdsBanner ads={BannerAdsVocational} />
        </Calculator>
    </div>
  );
}
