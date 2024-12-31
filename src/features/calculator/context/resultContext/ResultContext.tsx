import { postApi } from '@/lib/apiClient';
import { DegreeObject, Theme, ThemeObject } from '@/types/apiTypes';
import { createContext, useEffect, useMemo, useState } from 'react';
import {
  ResultContextProviderProps,
  ThemeResponse,
  ResultContextType,
  YearResponse,
} from './types';
import { ResultParams } from '@/features/calculator/components/gradesForm/types/types';

export const ResultContext = createContext<ResultContextType | null>(null);

export default function ResultContextProvider({
  children,
}: Readonly<ResultContextProviderProps>) {
  const [degrees, setDegrees] = useState<ThemeObject[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [resultParams, setResultParams] = useState<ResultParams | null>(null);
  const [year, setYear] = useState<number>(1994);
  
  useEffect(() => {
    const initialThemes = async () => {
      const query = {
        query: `query {aiheet {AiheID, aihe}}`,
      };
      const response = await postApi<ThemeResponse>(query);
      setThemes(response.data.aiheet);
    };
    initialThemes();

    const mostRecentYear = async () => {
      const query = {
        query: `query {viimeisin_vuosi}`,
      };
      const response = await postApi<YearResponse>(query);
      setYear(response.data.viimeisin_vuosi);
    };
    mostRecentYear();
  }, []);


  const setDegreesAndThemes = (degrees: DegreeObject[], resultParams : ResultParams) => {
    setResultParams(resultParams);
    if (resultParams.onlyPassed) {
      const onlyPassedDegrees = degrees.filter(degree => {
        return degree.vuosikerrat[0].kynnysehtoOK && degree.vuosikerrat[0].pisteRaja <= degree.vuosikerrat[0].laskumalli.summa.pisteet
      })
      setDegrees(formThemesFromDegrees(onlyPassedDegrees));
    }else {
      setDegrees(formThemesFromDegrees(degrees));
    }
  };

  const formThemesFromDegrees = (degrees: DegreeObject[]): ThemeObject[] => {
    const groupedByAiheID: Record<number, DegreeObject[]> = degrees.reduce(
      (acc, degree) => {
        if (!acc[degree.AiheID]) {
          acc[degree.AiheID] = [];
        }
        acc[degree.AiheID].push(degree);
        return acc;
      },
      {} as Record<number, DegreeObject[]>,
    );

    return Object.entries(groupedByAiheID).map(([AiheID, groupedDegrees]) => {
      const theme = themes.find((t) => t.AiheID === Number(AiheID));
      return {
        AiheID: theme?.AiheID ? theme.AiheID : -1,
        aihe: theme ? theme.aihe : 'Unknown',
        hakukohteet: groupedDegrees,
      };
    });
  };

  const values = useMemo(
    () => ({
      degrees,
      setDegreesAndThemes,
      themes,
      setThemes,
      resultParams,
      year
    }),
    [degrees, themes, resultParams, setThemes, year],
  );

  return (
    <ResultContext.Provider value={values}>{children}</ResultContext.Provider>
  );
}
