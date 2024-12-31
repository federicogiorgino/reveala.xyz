"use client";

import { authClient } from "@/auth.client";
import { useToast } from "@/hooks/use-toast";
import { resetPasswordSchema } from "@/schemas/auth";
import { ResetPasswordValues } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoadingButton } from "./ui/loading-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { XCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
function ResetPasswordForm() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const [pending, setPending] = useState(false);

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordValues) => {
    setPending(true);
    const { error } = await authClient.resetPassword({
      newPassword: data.password,
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Password reset successful. Login to continue.",
      });
      router.push("/sign-in");
    }
    setPending(false);
  };

  if (error === "invalid_token") {
    return (
      <div className="grow flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <XCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
          <h1 className="text-2xl font-bold mb-4">Invalid or Expired Link</h1>
        </div>
        <div className="text-center mb-6">
          <p className="text-muted-foreground">
            The password reset link you clicked is invalid or has expired.
          </p>
          <p className="text-muted-foreground">
            Please request a new link to reset your password.
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <Link
            href="/forgot-password"
            className={buttonVariants({
              variant: "default",
            })}
          >
            Request Password Reset
          </Link>
          <Link
            href="/sign-in"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Return to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grow flex items-center justify-center p-4">
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-4xl font-bold">Reset Password</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Enter a new password and confirm it.
            </p>
          </div>

          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={"*************"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={"*************"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              type="submit"
              className="w-full"
              loading={pending}
              disabled={!form.formState.isValid}
            >
              Send
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}

export { ResetPasswordForm };
