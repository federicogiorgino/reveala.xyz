import {
  forgotPasswordSchema,
  signInSchema,
  signUpSchema,
  resetPasswordSchema,
} from "@/schemas/auth";
import { z } from "zod";

export type SignUpValues = z.infer<typeof signUpSchema>;

export type SignInValues = z.infer<typeof signInSchema>;
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
