import ResultContextProvider from '@/features/calculator/context/resultContext/ResultContext';
import GradesForm from '@/features/calculator/components/gradesForm/GradesForm';
import { useEffect, useRef, useState } from 'react';
import InfoViewContextProvider from '@/features/calculator/context/infoViewContext/InfoViewContext';
import ThemeAccordion from './components/themeAccordion/ThemeAccordion';
import DegreeFullInfo from './components/degreeFullInfo/DegreeFullInfo';
import { EvaluationOptions, MeanCalculator } from './types/types';
import { ResultParams } from './components/gradesForm/types/types';
import useCookies from '@/hooks/useCookies';
import ErrorBlock from '@/components/error/ErrorBlock';

const initialSessionCookie: { degrees: SavedDegree[] } = {
  degrees: [],
};

type SavedDegree = { subjectValue: string; gradeValue: string };

type CalculatorProps = {
  evaluationOptions: EvaluationOptions[];
  addableOptions: boolean;
  vocational: boolean;
  helperCalculators?: MeanCalculator[];
  children?: JSX.Element;
};
export default function Calculator({
  evaluationOptions,
  addableOptions,
  vocational,
  helperCalculators,
  children,
}: Readonly<CalculatorProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const [readyOptions, setReadyOptions] = useState([] as EvaluationOptions[]);
  const { value, updateCookie, cookiesAccepted, allowCookies } = useCookies({
    name: `sessionDegrees${vocational ? 'Vocational' : 'Matriculation'}`,
    initialValue: JSON.stringify(initialSessionCookie),
    expireDays: 180,
  });

  const formOptionsFromResult = (result: ResultParams): SavedDegree[] => {
    return result.grades.map((grade) => {
      return {
        subjectValue: grade.subject,
        gradeValue: grade.grade,
      };
    });
  };


  const handleCalculation = (ref: React.RefObject<HTMLDivElement>) => {
    return function handleCalculation(result: ResultParams | null) {
      if (!result) {
        setError(true)
        return;
      }
      if (!ref.current) {
        console.warn('Calculation result not found');
        return;
      }

      if (result.saveDegrees) {
        allowCookies(true);
        const resultOptions = formOptionsFromResult(result);
        updateCookie(JSON.stringify({ degrees: resultOptions }), {
          expires: 180,
        });
      } else {
        updateCookie(JSON.stringify(initialSessionCookie), { expires: 1 });
      }
      ref.current.scrollIntoView({ behavior: 'smooth' });
    };
  };

  function injectSavedDegrees(
    options: EvaluationOptions[],
    savedDegree: SavedDegree[],
  ): EvaluationOptions[] {
    return savedDegree.map((savedDegree, index) => {
      const optionsInIndex = options[index] || options[0];
      return {
        ...optionsInIndex,
        initialGrade: savedDegree.gradeValue,
        initialSubject: savedDegree.subjectValue,
      };
    });
  }
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const jsonCookieValue = JSON.parse(value) as { degrees: SavedDegree[] };
        if (jsonCookieValue.degrees.length === 0) {
          setReadyOptions(evaluationOptions);
        } else {
          setReadyOptions(
            injectSavedDegrees(
              evaluationOptions,
              jsonCookieValue.degrees,
            ),
          );
        }
      } catch (e) {
        console.log(e);
        setError(true);
      }
    };
    fetchOptions();
  }, [evaluationOptions, value]);

  return (
    <ResultContextProvider>
      <div className="align-top flex flex-col gap-8 items-center">
        {!error ? (
          <GradesForm
            saveDegreesByDefault={
              JSON.parse(value).degrees.length > 0 || cookiesAccepted
            }
            readyOptions={readyOptions}
            handleCalculation={handleCalculation(ref)}
            addableOptions={addableOptions}
            vocational={vocational}
            helperCalculators={helperCalculators}
          />
        ) : (
          <ErrorBlock error={'Tapahtui virhe, koita myöhemmin uudestaan'} />
        )}{' '}
        <div ref={ref} className="align-top flex flex-col gap-8 items-center">
        {/* Isolate AdsBanner */}
          <div className="w-screen bg-background">
            <div className="flex justify-center gap-4 px-6 sm:px-12 md:px-6 lg:px-8 xl:px-16">
              {children}
            </div>
          </div>
        </div>
        <InfoViewContextProvider>
          <ThemeAccordion />
          <DegreeFullInfo />
        </InfoViewContextProvider>
      </div>
    </ResultContextProvider>
  );
}
