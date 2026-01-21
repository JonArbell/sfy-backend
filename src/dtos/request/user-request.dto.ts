import z from "zod";
import { AuthProvider } from "../../prisma/generated/prisma/enums";

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

export const credentialsValidator = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(16, "Username must be at most 16 characters")
    .regex(
      /^[a-zA-Z0-9._-]+$/,
      "Username may contain only letters, numbers, dots, underscores, and hyphens",
    ),

  password: passwordSchema,
  provider: z.enum(AuthProvider),
});

export const updateCredentialsValidator = credentialsValidator
  .extend({
    oldPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UpdateUserRequestDTO = z.infer<typeof updateCredentialsValidator>;

export type UserRequestDTO = z.infer<typeof credentialsValidator>;
