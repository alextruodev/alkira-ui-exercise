import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const mfaSchema = z.object({
  code: z
    .string()
    .min(1, "MFA code is required")
    .regex(/^\d{6}$/, "Enter a 6-digit code"),
});

export type MfaFormData = z.infer<typeof mfaSchema>;

export const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;