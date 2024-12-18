import { post } from '@/lib/apiClient';
import { DegreeObject, Theme, ThemeObject } from '@/types/apiTypes';
import { createContext, useEffect, useMemo, useState } from 'react';
import { ResultContextProviderProps, ThemeResponse, ResultContextType } from './types';



export const ResultContext = createContext<ResultContextType | null>(null);


export default function ResultContextProvider({
  children,
}: Readonly<ResultContextProviderProps>) {
  const [degrees, setDegrees] = useState<ThemeObject[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);

  useEffect(() => {
    const initialThemes = async () => {
      const query = {
        query: `query {aiheet {AiheID, aihe}}`,
      };
      const response = await post<ThemeResponse>(query);
      setThemes(response.data.aiheet)
    }
    initialThemes();
  }, []);

  const setDegreesAndThemes = (degrees : DegreeObject []) => {
    setDegrees (formThemesFromDegrees (degrees))
  } 

  const formThemesFromDegrees = (degrees : DegreeObject []) : ThemeObject [] => {
    const groupedByAiheID: Record<number, DegreeObject[]> = degrees.reduce(
      (acc, degree) => {
        if (!acc[degree.AiheID]) {
          acc[degree.AiheID] = [];
        }
        acc[degree.AiheID].push(degree);
        return acc;
      },
      {} as Record<number, DegreeObject[]>
    );
  
    return Object.entries(groupedByAiheID).map(([AiheID, groupedDegrees]) => {
      const theme = themes.find((t) => t.AiheID === Number(AiheID));
      return {
        AiheID: theme?.AiheID? theme.AiheID : -1,
        aihe: theme ? theme.aihe : "Unknown",
        hakukohteet: groupedDegrees,
      };
    });
  }

  const values = useMemo(
    () => ({
      degrees,
      setDegreesAndThemes,
      themes,
      setThemes,
    }),
    [degrees, themes],
  );

  return (
    <ResultContext.Provider value={values}>{children}</ResultContext.Provider>
  );
}
