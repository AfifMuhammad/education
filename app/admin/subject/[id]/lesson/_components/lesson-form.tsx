"use client";
import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "@/hooks/use-action";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlateEditor } from "@/components/plate-editor";
import { Button } from "@/components/ui/button";
import { AvatarUpload } from "@/components/avatar-upload";
import { Input } from "@/components/ui/input";
import { useUploadThing } from "@/hooks/use-uploadthing";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteLesson, UpsertLesson } from "@/actions/lesson/schema";
import { upsertLesson } from "@/actions/lesson/upsert";
import type { Value } from "@udecode/plate-common";
import { useRouter } from "next/navigation";
import type { Lesson } from "@prisma/client";
import DeleteButton from "@/components/delete-button";
import { deleteLesson } from "@/actions/lesson/delete";

interface Props {
  subjectId: string;
  lesson?: Lesson;
}
export default function LessonForm({ subjectId, lesson }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const [image, setImage] = React.useState<string>(lesson?.image || "");

  const initialContent: Value = lesson
    ? JSON.parse(lesson.content)
    : [
      {
        children: [{ text: "" }],
        type: "p",
      },
    ];

  const form = useForm<z.infer<typeof UpsertLesson>>({
    resolver: zodResolver(UpsertLesson),
    defaultValues: {
      id: lesson?.id || undefined,
      title: lesson?.title || "",
      image: lesson?.image || "",
      content: lesson?.content || undefined,
      subjectId: subjectId,
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

  const { execute, isLoading } = useAction(upsertLesson, {
    onSuccess: async (data) => {
      toast({ title: `Lesson "${data.title}" saved` });
      form.reset();
      router.push(`/admin/subject/${subjectId}/lesson`);
    },
    onError: (error) => {
      toast({ variant: "destructive", description: error, title: "Error" });
    },
  });

  async function onSubmit(values: z.infer<typeof UpsertLesson>) {
    execute({
      ...values,
      image,
    });
  }

  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>Lesson</CardTitle>
        <CardDescription>{lesson?.title}</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid md:grid-cols-5 items-center gap-x-5">
                  <FormLabel className="md:text-right">Title</FormLabel>
                  <FormControl className="col-span-4">
                    <Input {...field} placeholder="Title" />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-4" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="grid md:grid-cols-5 items-center gap-x-5">
                  <FormLabel className="md:text-right">Image</FormLabel>
                  <FormControl className="col-span-4">
                    <AvatarUpload
                      defaultValue={field.value}
                      isUploading={isUploading}
                      onChange={startUpload}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-4" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PlateEditor
                      initialValue={initialContent}
                      onChange={(value) =>
                        field.onChange(JSON.stringify(value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4 gap-x-2">
            {lesson ? <DeleteButton action={deleteLesson} data={lesson} redirectTo={`/admin/subject/${subjectId}/lesson`} zodObject={DeleteLesson} /> : null}
            <Button type="submit" disabled={isLoading || isUploading}>
              {isLoading ? (
                <>
                  <LoaderCircle className="w-4 h-4 mr-2 animate-spin" /> Saving
                </>
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
