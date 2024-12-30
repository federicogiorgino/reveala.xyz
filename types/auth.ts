import { signInSchema, signUpSchema } from "@/schemas/auth";
import { z } from "zod";

export type SignUpValues = z.infer<typeof signUpSchema>;

export type SignInValues = z.infer<typeof signInSchema>;
