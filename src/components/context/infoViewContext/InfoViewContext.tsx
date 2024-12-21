import { createContext, useMemo, useState } from 'react';

import { ResultParams } from '@/features/gradesForm/types/types';
import { InfoViewContextProps, InfoViewContextType } from './types';
import { FullDegreeInfo } from '@/features/degreeFullInfo/types';

export const InfoViewContext = createContext<InfoViewContextType>({} as InfoViewContextType);

export default function InfoViewContextProvider({
  children,
}: Readonly<InfoViewContextProps>) {
  const [degrees, setDegrees] = useState<FullDegreeInfo[]>([]);
  const [resultParams, setResultParams] = useState<ResultParams | null>(null);
  const [infoViewOpen, setInfoViewOpen] = useState(false);

  const setDegreesAndOpen = (degree : FullDegreeInfo[]) => {
    setDegrees(degree);
    setInfoViewOpen(true);
  }

  const values = useMemo(
    () => ({
      degrees,
      setDegreesAndOpen,
      resultParams,
      setResultParams,
      infoViewOpen,
      setInfoViewOpen,
    }),
    [degrees, resultParams, infoViewOpen],
  );

  return (
    <InfoViewContext.Provider value={values}>{children}</InfoViewContext.Provider>
  );
}
