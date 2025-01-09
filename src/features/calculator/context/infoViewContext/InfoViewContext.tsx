import { createContext, useMemo, useState } from 'react';

import { ResultParams } from '@/features/calculator/components/gradesForm/types/types';
import { InfoViewContextProps, InfoViewContextType } from './types';
import { FullDegreeInfo } from '../../components/degreeFullInfo/types';

/** If user fetches more information on a specific degree
 * the degree is saved in InfoViewContext and the show on
 * user in a another component
 */
export const InfoViewContext = createContext<InfoViewContextType>(
  {} as InfoViewContextType,
);

/** If user fetches more information on a specific degree
 * the degree is saved in InfoViewContext and the show on
 * user in a another component
 */
export default function InfoViewContextProvider({
  children,
}: Readonly<InfoViewContextProps>) {
  const [degrees, setDegrees] = useState<FullDegreeInfo[]>([]);
  const [resultParams, setResultParams] = useState<ResultParams | null>(null);
  const [infoViewOpen, setInfoViewOpen] = useState(false);

  const setDegreesAndOpen = (degree: FullDegreeInfo[]) => {
    setInfoViewOpen(true);
    setDegrees(degree);
  };

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
    <InfoViewContext.Provider value={values}>
      {children}
    </InfoViewContext.Provider>
  );
}
