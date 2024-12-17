export type DegreeObject =  {
  vuosikerrat : VolumeObject [];
} & Degree

export type VolumeObject =  {
  laskumallit : CalculationModel
} & Volume

export type ThemeObject =  {
  hakukohteet : DegreeObject []; 
} & Theme

export type Degree = {
  HakukohdeID : number;
  KorkeakouluID : number;
  AiheID : number;
  hakukohde : string;
  nimiVipusessa : string;
}

export type Volume = {
  LaskumalliID : number;
  HakukohdeID : number;
  vuosi : number;
  prosentti : number;
  valintajono : 0 | 1 | 2 | 3 | 4
}

export type CalculationModel = {
  laskumalliNimi : string;
  LaskumalliID : number;
  maxPiste : number;
  maxAine : number;
}

export type Theme = {
  AiheID : number;
  aihe : string;
}