import * as z from "zod";

const passwordSchema = z
  .string({ required_error: "Password is required" })
  .min(8, "Password must be atleast 8 characters")
  .max(32, "Password can not exceed 32 characters");

const confirmPasswordSchema = z
  .string({ required_error: "Confirm Password is required" })
  .min(8, "Confirm Password must be atleast 8 characters")
  .max(32, "Confirm Password can not exceed 32 characters");

const emailSchema = z
  .string({ required_error: "Email is required" })
  .min(1, "Email is required")
  .email("Invalid email");

const nameSchema = z
  .string({ required_error: "Name is required" })
  .min(1, "Name is required")
  .max(50, "Name must be less than 50 characters");

export const signUpSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
