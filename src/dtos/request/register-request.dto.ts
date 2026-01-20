import z from "zod";
import { credentialsValidator } from "./user-request.dto";

export const registerValidator = credentialsValidator.extend({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(16, "Username must be at most 16 characters")
    .regex(
      /^[a-zA-Z0-9._-]+$/,
      "Username may contain only letters, numbers, dots, underscores, and hyphens",
    ),

  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(64, "Full name is too long"),

  email: z.email("Invalid email address"),
});

export type RegisterRequestDTO = z.infer<typeof registerValidator>;
