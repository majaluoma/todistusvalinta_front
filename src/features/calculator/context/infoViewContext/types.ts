
import { ResultParams } from '@/features/calculator/components/gradesForm/types/types';
import { ReactNode } from 'react';
import { FullDegreeInfo } from '../../components/degreeFullInfo/types';

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