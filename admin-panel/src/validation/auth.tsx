import * as z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const otpSchema = z.object({
  code: z.number().or(z.undefined()),
});

export const newPasswordSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});
