import { z } from 'zod';

export const formSchema = z.object({
  firstTimer: z.boolean().default(false),
  vocational: z.boolean().default(false),
  test: z.boolean().default(false),
  isSpring: z.boolean().default(true),
  saveDegrees: z.boolean().default(false),
  grades: z
    .array(
      z.object({
        subject: z.string().min(1, 'Syötä oppiaine').nonempty('Syötä oppiaine'),
        grade: z.string().min(1, 'Syötä arvosana').nonempty('Syötä arvosana'),
      }),
    )
    .min(4, 'Lisää oppiaineita')
    .refine(
      (grades) => {
        const subjects = grades
          .filter((g) => {
            return g.subject !== '';
          })
          .map((grade) => grade.subject);
        const uniqueSubjects = new Set(subjects);
        return uniqueSubjects.size === subjects.length;
      },
      {
        message: 'Oppiaineet eivät voi olla samoja',
        path: ['root'],
      },
    ),
});
