import { ResultParams } from '@/features/calculator/components/gradesForm/types/types';
import { DegreeObject, Theme, ThemeObject } from '@/types/apiTypes';
import { ReactNode } from 'react';

export type ThemeResponse = { aiheet: Theme[] };

export type YearResponse = { viimeisin_vuosi: number };

export type ResultContextProviderProps = {
  children: ReactNode;
};

export type ResultContextType = {
  degrees: ThemeObject[];
  setDegreesAndThemes: (
    degrees: DegreeObject[],
    resultParams: ResultParams,
  ) => void;
  setThemes: (themes: Theme[]) => void;
  themes: Theme[];
  resultParams: ResultParams | null;
  year: number | undefined;
};
