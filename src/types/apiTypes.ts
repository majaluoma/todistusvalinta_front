import { AdSchema, CustomAdSchema } from '@/features/adsBanner/types';
import { z } from 'zod';

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
  KorkeakouluID: number;
  AiheID: number;
  hakukohde: string;
  nimiVipusessa: string;
};

export type Volume = {
  LaskumalliID: number;
  HakukohdeID: number;
  vuosi: number;
  prosentti: number;
  valintajono: 0 | 1 | 2 | 3 | 4;
  pisteRaja: number;
};

export type CalculationModel = {
  laskumalliNimi: string;
  LaskumalliID: number;
  maxPiste: number;
  maxAine: number;
  summa: { pisteet: number };
};

export type Theme = {
  AiheID: number;
  aihe: string;
};

export const AdsArraySchema = z.array(z.union([AdSchema, CustomAdSchema]));
export type AdsArray = z.infer<typeof AdsArraySchema>;
