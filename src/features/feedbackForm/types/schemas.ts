import { z } from 'zod';

export const formSchema = z.object({
  email: z.string().email("Sähköposti on virheellinen").min(1, 'Sähköposti puuttuu').nonempty('Sähköposti puuttuu'),
  message: z.string().min(10, 'Viesti puuttuu').nonempty('Viesti puuttuu'),
});
