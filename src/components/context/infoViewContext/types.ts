import { FullDegreeInfo } from '@/features/degreeFullInfo/types';
import { ResultParams } from '@/features/gradesForm/types/types';
import { ReactNode } from 'react';

export type FullDegreeInfoResponse = {
    data: {kaikkiTiedotHakukohteesta: FullDegreeInfo};
}

export type InfoViewContextProps = {
  children: ReactNode;
};

export type InfoViewContextType = {
    degrees : FullDegreeInfo []
    setDegreesAndOpen : (degrees: FullDegreeInfo[]) => void;
    resultParams : ResultParams | null,
    setResultParams: (resultParams: ResultParams) => void;
    infoViewOpen : boolean;
    setInfoViewOpen: (infoViewOpen : boolean) => void
  };