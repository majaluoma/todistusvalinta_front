import { DegreeObject, Theme, ThemeObject } from '@/types/apiTypes';
import { ReactNode } from 'react';

export type ThemeResponse = {
  data: {aiheet: Theme []};
};


export type ResultContextProviderProps = {
  children: ReactNode;
};

export type ResultContextType = {
    degrees: ThemeObject[];
    setDegreesAndThemes: (degrees: DegreeObject[]) => void;
    setThemes: (themes: Theme[]) => void;
    themes: Theme[];
    passedTotal: Map<string, number>;
  };