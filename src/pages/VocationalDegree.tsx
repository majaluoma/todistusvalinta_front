import AdsBanner from '@/components/customUi/adsBanner/AdsBanner';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BannerAdsVocational } from '@/data/adsData';
import {
  evaluationOptionsVocational3Ka,
  evaluationOptionsVocational3Malu,
  evaluationOptionsVocational3Vivu,
  evaluationOptionsVocational3Yhty,
  evaluationOptionsVocational5Ka,
  evaluationOptionsVocational5Malu,
  evaluationOptionsVocational5Vivu,
  evaluationOptionsVocational5Yhty,
} from '@/data/evaluationOptions';
import Calculator from '@/features/calculator/Calculator';
import {
  EvaluationOptions,
  MeanCalculator,
} from '@/features/calculator/types/types';
import { useState } from 'react';

type ScaleOptions = {
  scale: string;
  evaluationOptions: EvaluationOptions[];
  gradeOptions: number[];
  helperCalculators: MeanCalculator[];
};

const evaluationOptions3 = [
  evaluationOptionsVocational3Vivu,
  evaluationOptionsVocational3Malu,
  evaluationOptionsVocational3Yhty,
  evaluationOptionsVocational3Ka,
];
const evaluationOptions5 = [
  evaluationOptionsVocational5Vivu,
  evaluationOptionsVocational5Malu,
  evaluationOptionsVocational5Yhty,
  evaluationOptionsVocational5Ka,
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
      { subject: 'Fysikaaliset ja kemialliset ilmiöt', points: 2 },
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
      { subject: 'Työkyvyn ja hyvinvoinnin ylläpitäminen', points: 2 },
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

const helperCalculator3 = [
  {
    subjects: [],
    gradeOptions: gradeOptions5,
    text: 'Aineen painotettu keskiarvo löytyy suoraan ammatillisen perustutkinnon todistuksesta. Sen löydät myös oma Opintopolku -palvelusta.',
  },
  {
    subjects: [],
    gradeOptions: gradeOptions5,
    text: 'Aineen painotettu keskiarvo löytyy suoraan ammatillisen perustutkinnon todistuksesta. Sen löydät myös oma Opintopolku -palvelusta.',
  },
  {
    subjects: [],
    gradeOptions: gradeOptions5,
    text: 'Aineen painotettu keskiarvo löytyy suoraan ammatillisen perustutkinnon todistuksesta. Sen löydät myös oma Opintopolku -palvelusta.',
  },
  {
    subjects: [],
    gradeOptions: gradeOptions5,
    text: 'Tutkinnon painotettu keskiarvo löytyy suoraan ammatillisen perustutkinnon todistuksesta. Sen löydät myös oma Opintopolku -palvelusta.',
  },
];
export default function VocationalDegree() {
  const [degreeScale, setDegreeScale] = useState<ScaleOptions>({
    scale: '1-5',
    evaluationOptions: evaluationOptions5,
    gradeOptions: gradeOptions5,
    helperCalculators: helperCalculator5,
  });

  const handleChange = (value: string) => {
    if (value === '1-3') {
      setDegreeScale({
        scale: '1-3',
        evaluationOptions: evaluationOptions3,
        gradeOptions: gradeOptions3,
        helperCalculators: helperCalculator3,
      });
    } else {
      setDegreeScale({
        scale: '1-5',
        evaluationOptions: evaluationOptions5,
        gradeOptions: gradeOptions5,
        helperCalculators: helperCalculator5,
      });
    }
  };

  return (
    <div className=" flex flex-col">
      <div className="justify-center flex flex-wrap flex-row items-baseline gap-2">
        <p>Valitse todistuksesi arviointiasteikko:</p>

        <RadioGroup
          defaultValue="1-5"
          onValueChange={handleChange}
          className="flex flex-row gap-3 mb-4 flex-wrap "
        >
          <div className="flex items-center">
            <RadioGroupItem value="1-5" id="1-5" />
            <Label htmlFor="1-5">1-5</Label>
          </div>
          <div className="flex items-center ">
            <RadioGroupItem value="1-3" id="1-3" />
            <Label htmlFor="1-3">1-3</Label>
          </div>
        </RadioGroup>
      </div>
      <Calculator
        evaluationOptions={degreeScale.evaluationOptions}
        addableOptions={false}
        vocational={true}
        helperCalculators={degreeScale.helperCalculators}
      >
        <div className="w-screen px-0 sm:px-1 md:px-6 lg:px-8 xl:px-16 flex justify-center gap-4">
          <AdsBanner ads={BannerAdsVocational} className="block lg:hidden" />
          <AdsBanner
            ads={BannerAdsVocational.slice(0, 1)}
            className="hidden lg:block"
          />
          <AdsBanner
            ads={BannerAdsVocational.slice(1)}
            className="hidden lg:block"
          />
        </div>
      </Calculator>
    </div>
  );
}
