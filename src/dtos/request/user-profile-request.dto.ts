import { z } from "zod";

export const userProfileValidator = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { message: "Full name must be at least 3 characters" })
    .max(50, { message: "Full name must be at most 50 characters" })
    .regex(
      /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]+$/,
      "Full name may contain letters, spaces, hyphens, and apostrophes only",
    ),

  icon: z.string().optional(),

  email: z.email({ message: "Invalid email address" }),
});

export type UserProfileRequestDTO = z.infer<typeof userProfileValidator>;
