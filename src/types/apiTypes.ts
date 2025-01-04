export type DegreeObject = {
  vuosikerrat: VolumeObject[];
} & Degree;

export type VolumeObject = {
  laskumalli: CalculationModel;
} & Volume;

export type ThemeObject = {
  hakukohteet: DegreeObject[];
} & Theme;

export type Degree = {
  HakukohdeID: number;
  korkeakoulu : string
  AiheID : number;
  hakukohde: string;
  nimiVipusessa: string;
};

export type Volume = {
  VuosikertaID : number
  LaskumalliID: number;
  vuosi: number;
  pisteRaja: number;
  kynnysehtoOK : boolean;
};

export type CalculationModel = {
  summa: { pisteet: number };
};

export type Theme = {
  AiheID: number;
  aihe: string;
};

export type ApiData<T> = {
  data : T
}