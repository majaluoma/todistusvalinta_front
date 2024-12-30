import ResultContextProvider from '@/features/calculator/context/resultContext/ResultContext';
import AdsBanner from '@/components/customUi/adsBanner/AdsBanner';
import GradesForm from '@/features/calculator/components/gradesForm/GradesForm';
import { useEffect, useRef, useState } from 'react';
import { BannerAdsMatriculation } from '@/data/adsData';
import InfoViewContextProvider from '@/features/calculator/context/infoViewContext/InfoViewContext';
import ThemeAccordion from './components/themeAccordion/ThemeAccordion';
import DegreeFullInfo from './components/degreeFullInfo/DegreeFullInfo';
import { getEvaluationOptions } from './api/getEvaluationOptions';
import { EvaluationOptions, MeanCalculator } from './types/types';
import { ResultParams } from './components/gradesForm/types/types';
import useCookies from '@/hooks/useCookies';

const initialSessionCookie  : {degrees:  SavedDegree []} = {
  degrees: [
  ]
} 

type SavedDegree = {subjectValue: string, gradeValue : string}

type CalculatorProps = {
  optionTypes: { type: string}[];
  addableOptions: boolean;
  vocational : boolean;
  helperCalculators? : MeanCalculator [];
};
export default function Calculator({
  optionTypes,
  addableOptions,
  vocational,
  helperCalculators
}: Readonly<CalculatorProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const [readyOptions, setReadyOptions] = useState(
    [] as EvaluationOptions[],
  );
  const {value, updateCookie, cookiesAccepted, allowCookies } = useCookies({name: `sessionDegrees${vocational? "Vocational" : "Matriculation"}`, initialValue: JSON.stringify(initialSessionCookie), expireDays: 180})


  const formOptionsFromResult = ( result : ResultParams) : SavedDegree [] => {
    return result.grades.map( (grade) => {
      return {
        subjectValue: grade.subject,
        gradeValue: grade.grade
      }
    }
    )
  } 

  const handleCalculation = (ref: React.RefObject<HTMLDivElement>) => {
    return function handleCalculation (result : ResultParams) {
      if (ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
        if (result.saveDegrees)  {
          allowCookies();
          const resultOptions = formOptionsFromResult(result);
          updateCookie(JSON.stringify({degrees: resultOptions}), {expires: 180});
        }
      } else {
        console.warn('Calculation result not found');
      }
    }
  };

  function injectSavedDegrees(options: EvaluationOptions[], savedDegree : SavedDegree[]): EvaluationOptions[] {
    return savedDegree.map((savedDegree, index) => {
      const optionsInIndex = options[index] || options[0]  
      return {
        ...optionsInIndex,
        initialGrade: savedDegree.gradeValue,
        initialSubject: savedDegree.subjectValue
      }
    })
   
  }
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
      const jsonCookieValue = JSON.parse(value) as {degrees:  SavedDegree []};
      if (jsonCookieValue.degrees.length === 0) {
        setReadyOptions(filterDefined(filteredOptions));
      } else {
        setReadyOptions(injectSavedDegrees(filterDefined(filteredOptions), jsonCookieValue.degrees));
      }
    };
    fetchOptions();
  }, [optionTypes, value]);

  return (
    <ResultContextProvider>
      <div className="flex flex-col gap-8">
        <GradesForm
          saveDegreesByDefault = {JSON.parse(value).degrees.length > 0 || cookiesAccepted}
          readyOptions={readyOptions}
          handleCalculation={handleCalculation(ref)}
          addableOptions={addableOptions}
          vocational={vocational}
          helperCalculators={helperCalculators}
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
