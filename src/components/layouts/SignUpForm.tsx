"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import Image from "next/image";

import { SignupSchema } from "@/schema/signup";
import { signIn, signUp } from "@/lib/auth-client";

type SignupFormValues = z.infer<typeof SignupSchema>;

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  console.log(loading)
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async ({email, password, fullName}: SignupFormValues) => {
    await signUp.email({
      email: email,
      password: password,
      name: fullName,
      callbackURL: "/"
  }, {
      onRequest: () => {
          setLoading(true)
      },
      onSuccess: () => {
          setLoading(false)
      },
      onError: (ctx) => {
          // display the error message
          alert(ctx.error.message)
          setLoading(false)
      },
});
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Sign up for an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             
              {/* Google Sign Up */}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={async () => {
                  try {
                    await signIn.social({ provider: "google" });
                  } catch {
                    form.setError("root", {
                      message: "Failed to sign up with Google.",
                    });
                  }
                }}
              >
                <Image
                  src="/assets/google-icon.svg"
                  width={18}
                  height={18}
                  alt="Google Icon"
                />
                <span>Sign up with Google</span>
              </Button>

              {/* Link to Sign In */}
              <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <a href="/sign-in" className="underline underline-offset-4">
                  Sign in
                </a>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
