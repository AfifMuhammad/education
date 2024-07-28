"use client";

import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { type DefaultValues, useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/use-action";
import { Form } from "./ui/form";
import type { ActionState } from "@/lib/create-safe-action";

interface Props<T extends z.ZodRawShape> {
  data: DefaultValues<z.infer<z.ZodObject<T>>>;
  zodObject: z.ZodObject<T>;
  confirmationText?: string;
  redirectTo?: string;
  action: (
    data: z.infer<z.ZodObject<T>>
  ) => Promise<
    ActionState<z.infer<z.ZodObject<T>>, DefaultValues<z.infer<z.ZodObject<T>>>>
  >;
}
export default function DeleteButton<T extends z.ZodRawShape>({
  zodObject,
  data,
  confirmationText,
  redirectTo,
  action,
}: Props<T>) {
  const { toast } = useToast();
  const router = useRouter();

  const [confirmationString, setConfirmationString] =
    React.useState<string>("");

  const isDeletable = confirmationText
    ? confirmationString === confirmationText
    : true;

  const form = useForm<z.infer<typeof zodObject>>({
    resolver: zodResolver(zodObject),
    defaultValues: data,
  });

  const { execute, isLoading } = useAction(action, {
    onSuccess: async () => {
      toast({ title: "Delete success" });
      redirectTo && router.replace(redirectTo);
    },
    onError: (error) => {
      toast({ variant: "destructive", description: error, title: "Error" });
    },
  });

  async function onSubmit(values: z.infer<typeof zodObject>) {
    execute(values);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete and
            remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {confirmationText ? (
          <Input
            value={confirmationString}
            onChange={(e) => setConfirmationString(e.target.value)}
            placeholder={`Type "${confirmationText}" to confirm`}
          />
        ) : null}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Button
                variant="destructive"
                type="submit"
                disabled={isLoading || !isDeletable}
              >
                {isLoading ? (
                  <LoaderCircle className="w-6 h-6 animate-spin" />
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
