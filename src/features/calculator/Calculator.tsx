import ResultContextProvider from '@/features/calculator/context/resultContext/ResultContext';
import AdsBanner from '@/components/customUi/adsBanner/AdsBanner';
import GradesForm from '@/features/calculator/components/gradesForm/GradesForm';
import { useEffect, useRef, useState } from 'react';
import { BannerAdsMatriculation } from '@/data/adsData';
import InfoViewContextProvider from '@/features/calculator/context/infoViewContext/InfoViewContext';
import ThemeAccordion from './components/themeAccordion/ThemeAccordion';
import DegreeFullInfo from './components/degreeFullInfo/DegreeFullInfo';
import { getEvaluationOptions } from './api/getEvaluationOptions';
import { EvaluationOptions } from './types/types';

type CalculatorProps = {
  optionTypes: { type: string}[];
  addableOptions: boolean;
  vocational : boolean;
};
export default function Calculator({
  optionTypes,
  addableOptions,
  vocational
}: Readonly<CalculatorProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const [readyOptions, setReadyOptions] = useState(
    [] as EvaluationOptions[],
  );

  const handleCalculation = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn('Calculation result not found');
    }
  };

  useEffect(() => {
    const fetchOptions = async () => {
      const allOptions = await getEvaluationOptions();

      const filteredOptions = optionTypes.map((type) => {
        const option = allOptions.find((option) => {
          return option.tyyppi === type.type;
        });
        if (option) {
          return option;
        }
      });
      function filterDefined<T>(array: (T | undefined)[]): T[] {
        return array.filter((item): item is T => item !== undefined);
      }

      setReadyOptions(filterDefined(filteredOptions));
    };
    fetchOptions();
  }, [optionTypes]);

  return (
    <ResultContextProvider>
      <div className="flex flex-col gap-8">
        <GradesForm
          readyOptions={readyOptions}
          handleCalculation={() => handleCalculation(ref)}
          addableOptions={addableOptions}
          vocational={vocational}
          production={false}
        />
        <div ref={ref}>
          <AdsBanner ads={BannerAdsMatriculation}></AdsBanner>
        </div>
        <InfoViewContextProvider>
          <ThemeAccordion />
          <DegreeFullInfo />
        </InfoViewContextProvider>
      </div>
    </ResultContextProvider>
  );
}
