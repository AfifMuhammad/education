"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { authenticate } from "@/actions/auth/sign-in";
import { useAction } from "@/hooks/use-action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignIn } from "@/actions/auth/schema";

export default function SignInForm() {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const form = useForm<z.infer<typeof SignIn>>({
    resolver: zodResolver(SignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { execute, isLoading } = useAction(authenticate, {
    onSuccess: async (data) => {
      if (data.success) {
        return;
      }
      setErrorMessage(data.message);
    },
    onError: (error) => {
      setErrorMessage(error.toString());
    },
  });

  async function onSubmit(values: z.infer<typeof SignIn>) {
    setErrorMessage(null);
    execute(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
