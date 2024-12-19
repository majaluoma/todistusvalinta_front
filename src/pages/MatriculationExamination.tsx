import ResultContextProvider from '@/components/context/resultContext/ResultContext';
import AdsBanner from '@/features/adsBanner/AdsBanner';
import GradesForm from '@/features/gradesForm/GradesForm';
import ThemeAccordion from '@/features/themeAccordion/ThemeAccordion';
import { useRef } from 'react';
import { BannerAdsMatriculation } from '@/data/adsData';

const gradeOptions = [
  { value: 'l', label: 'L' },
  { value: 'e', label: 'E' },
  { value: 'm', label: 'M' },
  { value: 'c', label: 'C' },
  { value: 'b', label: 'B' },
];

const subjectOptions = [
  { value: 'ai', label: 'Äidinkieli' },
  { value: 's2', label: 'Suomi toisena kielenä' },
  { value: 'r2', label: 'Ruotsi toisena kielenä' },
  { value: 'ena', label: 'Englanti, pitkä' },
  { value: 'enb', label: 'Englanti, lyhyt' },
  { value: 'rua', label: 'Toinen kotimainen kieli, pitkä' },
  { value: 'rub', label: 'Toinen kotimainen kieli, keskipitkä' },
  { value: 'maa', label: 'Matematiikka, pitkä' },
  { value: 'mab', label: 'Matematiikka, lyhyt' },
];

export default function MatriculationExamination() {
  const ref = useRef<HTMLDivElement>(null);

  const handleCalculation = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn('Calculation result not found');
    }
  };

  return (
    <ResultContextProvider>
      <div className='flex flex-col gap-8'>
        <GradesForm
          gradeOptions={gradeOptions}
          subjectOptions={subjectOptions}
          handleCalculation={() => handleCalculation(ref)}
          production={false}
        />
        <div ref={ref}>
          <AdsBanner ads={BannerAdsMatriculation}></AdsBanner>
        </div>
        <h2 className='text-lg font-bold'>Tulokset</h2>
          <ThemeAccordion />
      </div>
    </ResultContextProvider>
  );
}
