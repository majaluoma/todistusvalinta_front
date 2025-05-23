import { z } from 'zod';

export type AdsBannerProps = {
  ads: Ad[] | CustomAd[];
  className? : string;
};

export type CustomAdProps = {
  ad: CustomAd;
};

export const AdSchema = z.object({
  id: z.string(),
  mainospalvelu: z.union([z.literal('adsense'), z.literal('custom')]),
});
export type Ad = z.infer<typeof AdSchema>;

export const CustomAdSchema = AdSchema.merge(
  z.object({
    kuva: z.string(),
    kuvaus: z.string(),
    osoite: z.string(),
  }),
);

export type CustomAd = z.infer<typeof CustomAdSchema>;

export const AdsArraySchema = z.array(z.union([AdSchema, CustomAdSchema]));
export type AdsArray = z.infer<typeof AdsArraySchema>;