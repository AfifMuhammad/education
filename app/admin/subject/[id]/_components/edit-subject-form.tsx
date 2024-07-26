"use client";

import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UpdateSubject } from "@/actions/subject/schema";
import { useAction } from "@/hooks/use-action";
import { updateSubject } from "@/actions/subject/update";
import { Subject } from "@prisma/client";

interface Props {
  subject: Subject;
}
export default function EditSubjectForm({ subject }: Props) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof UpdateSubject>>({
    resolver: zodResolver(UpdateSubject),
    defaultValues: {
      id: subject.id,
      name: subject.name,
      description: subject.description || "",
    },
  });

  const { execute, isLoading } = useAction(updateSubject, {
    onSuccess: async (data) => {
      toast({ title: `Subject "${data.name}" updated` });
      form.setValue("name", data.name);
      form.setValue("description", data.description || "");
    },
    onError: (error) => {
      toast({ variant: "destructive", description: error, title: "Error" });
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateSubject>) {
    execute(values);
  }

  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>General Information</CardTitle>
        <CardDescription>Used to identify the subject.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid md:grid-cols-5 items-center gap-x-5">
                  <FormLabel className="md:text-right">Name</FormLabel>
                  <FormControl className="md:col-span-4">
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                  <FormMessage className="col-start-2 md:col-span-4" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid md:grid-cols-5 items-center gap-x-4">
                  <FormLabel className="md:text-right">Description</FormLabel>
                  <FormControl className="md:col-span-4">
                    <Input {...field} placeholder="Description" />
                  </FormControl>
                  <FormMessage className="col-start-2 md:col-span-4" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
