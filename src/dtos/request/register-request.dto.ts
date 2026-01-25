import z from "zod";
import { credentialsValidator } from "./user-request.dto";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password must be at most 32 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^a-zA-Z0-9]/,
    "Password must contain at least one special character",
  );

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

  password: passwordSchema,
  confirmPassword: passwordSchema,
});

export type RegisterRequestDTO = z.infer<typeof registerValidator>;
