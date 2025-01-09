import { z } from "zod";

export const meanFormSchema = z.object({
  grades: z.array(
    z.object({
      subject: z.string(),
      points: z.string(),
      grade: z.string(),
    }),
  ),
});