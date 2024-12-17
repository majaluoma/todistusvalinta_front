export type Degree = {
  degreeId: number;
  name: string;
  volumes: Volume[];
};

type Volume = {
  volumeId: number;
  degreeId: number;
  calculationModel: CalculationModel;
  year: number;
  percentAccepted: number;
  selectionType: 0 | 1 | 2 | 3 | 4;
};

type CalculationModel = {
  calculationModelId: number;
};

export type Theme = {
  themeId: number;
  name: string;
  degrees: Degree[];
};
