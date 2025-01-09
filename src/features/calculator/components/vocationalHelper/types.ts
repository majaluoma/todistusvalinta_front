import { MeanCalculator } from "../../types/types";

export type VocationalHelperProps = {
    calculator: MeanCalculator;
    callback : (result : number) => void;
  };

export type WeightedMeanCalculatorProps = {
    subjects: { subject: string; points: number }[];
    gradeOptions: number[];
    callback: (weightedMean: number) => void;
    saveAndClose: (weightedMean: number) => void;
  };
  