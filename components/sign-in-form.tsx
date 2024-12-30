"use client";

import { authClient } from "@/auth.client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { signInSchema } from "@/schemas/auth";
import { SignInValues } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorContext } from "better-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";

function SignInForm() {
  const router = useRouter();

  const [pending, setPending] = useState(false);
  const { toast } = useToast();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInValues) => {
    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setPending(true);
        },
        onSuccess: async () => {
          router.push("/");
          router.refresh();
        },
        onError: (ctx: ErrorContext) => {
          console.log(ctx);
          toast({
            title: "Something went wrong",
            description: ctx.error.message ?? "Something went wrong.",
            variant: "destructive",
          });
        },
      }
    );
    setPending(false);
  };
  return (
    <div className="grow flex items-center justify-center p-4">
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-4xl font-bold">Login</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Enter your email below to login to your account.
            </p>
          </div>
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <div className="text-right text-sm">
                      <Link
                        href="/password-forgot"
                        className="font-medium text-primary underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
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
              Login
            </LoadingButton>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <Button variant="outline" className="w-full">
              <Icons.github />
              Login with GitHub
            </Button>
          </div>

          <div className="text-center text-sm">
            Dont have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-primary underline"
            >
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}

export { SignInForm };
