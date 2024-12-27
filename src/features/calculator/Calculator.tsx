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
  optionTypes: { type: string; locked: boolean }[];
  addableOptionType: string;
};
export default function Calculator({
  optionTypes,
  addableOptionType,
}: Readonly<CalculatorProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const [readyOptions, setReadyOptions] = useState(
    [] as { option: EvaluationOptions; locked: boolean }[],
  );
  const [addableOptions, setAddableOptions] = useState<
    EvaluationOptions | undefined
  >({} as EvaluationOptions);

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
          return { option: option, locked: type.locked };
        }
      });
      function filterDefined<T>(array: (T | undefined)[]): T[] {
        return array.filter((item): item is T => item !== undefined);
      }

      setReadyOptions(filterDefined(filteredOptions));
      setAddableOptions(
        allOptions.find((e) => {
          return e.tyyppi === addableOptionType;
        }),
      );
    };
    fetchOptions();
  }, [addableOptionType, optionTypes]);

  return (
    <ResultContextProvider>
      <div className="flex flex-col gap-8">
        <GradesForm
          readyOptions={readyOptions}
          handleCalculation={() => handleCalculation(ref)}
          production={false}
          addableOptions={addableOptions}
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
