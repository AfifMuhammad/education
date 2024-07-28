"use client";

import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { UpdateSubjectImage } from "@/actions/subject/schema";
import { useAction } from "@/hooks/use-action";
import type { Subject } from "@prisma/client";
import { updateSubjectImage } from "@/actions/subject/update-image";
import { AvatarUpload } from "@/components/avatar-upload";
import { useUploadThing } from "@/hooks/use-uploadthing";

interface Props {
  subject: Subject;
}
export default function EditSubjectImageForm({ subject }: Props) {
  const { toast } = useToast();
  const [image, setImage] = React.useState<string>("");

  const form = useForm<z.infer<typeof UpdateSubjectImage>>({
    resolver: zodResolver(UpdateSubjectImage),
    defaultValues: {
      id: subject.id,
      image: subject.image || "",
    },
  });

  const { startUpload, isUploading } = useUploadThing("image", {
    skipPolling: true,
    onClientUploadComplete: (res) => {
      setImage(res[0].url);
    },
    onUploadError: (err) => {
      setImage("");
      toast({
        variant: "destructive",
        description: err.message,
        title: "Error",
      });
    },
  });

  const { execute, isLoading } = useAction(updateSubjectImage, {
    onSuccess: async (data) => {
      toast({ title: `Subject "${data.name}" updated` });
      form.setValue("image", data.image || "");
    },
    onError: (error) => {
      toast({ variant: "destructive", description: error, title: "Error" });
    },
  });

  async function onSubmit(values: z.infer<typeof UpdateSubjectImage>) {
    execute({
      id: values.id,
      image: image,
    });
  }

  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>Image</CardTitle>
        <CardDescription>Upload a new image for the subject.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4 items-center">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AvatarUpload
                      defaultValue={field.value}
                      isUploading={isUploading}
                      onChange={startUpload}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" disabled={isUploading || isLoading}>
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
