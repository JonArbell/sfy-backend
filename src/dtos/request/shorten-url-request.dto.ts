import { z } from "zod";

export const shortenUrlValidator = z.object({
  url: z.url(),
  password: z.string().min(5).max(15).optional(),
  expirationDate: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const inputDate = new Date(val);
        const now = new Date();

        inputDate.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);
        return inputDate > now;
      },
      {
        message: "Expiration date must be after today",
      },
    ),
});

export type ShortenUrlRequestDTO = z.infer<typeof shortenUrlValidator>;
