import { z } from "zod";

export const formSchema = z.object({
  firstGo: z.boolean().default(false),
  onlyPassed: z.boolean().default(false),
  grades: z.array(
    z.object({
      subject: z.string().min(1, 'Syötä oppiaine'),
      grade: z.string().min(1, 'Syötä arvosana'),
    }),
  )
});