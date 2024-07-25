"use client";
import * as React from "react";

import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateSubject } from "@/actions/subject/schema";
import { useAction } from "@/hooks/use-action";
import { createSubject } from "@/actions/subject/create";
import { AvatarUpload } from "@/components/avatar-upload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUploadThing } from "@/hooks/use-uploadthing";

export default function CreateSubjectForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<string>("");
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

  const form = useForm<z.infer<typeof CreateSubject>>({
    resolver: zodResolver(CreateSubject),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  const { execute, isLoading } = useAction(createSubject, {
    onSuccess: async (data) => {
      toast({ title: `Subject "${data.name}" created` });
      form.reset();
      setOpen(false);
      router.refresh();
    },
    onError: (error) => {
      toast({ variant: "destructive", description: error, title: "Error" });
    },
  });

  async function onSubmit(values: z.infer<typeof CreateSubject>) {
    execute({
      name: values.name,
      description: values.description,
      image: image,
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Subject</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>New Subject</DialogTitle>
          <DialogDescription>Create a new subject.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 pt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel>Name</FormLabel>
                  <FormControl className="col-span-3">
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Description</FormLabel>
                  <FormControl className="col-span-3">
                    <Input
                      {...field}
                      placeholder="Description"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Image</FormLabel>
                  <FormControl className="col-span-3">
                    <AvatarUpload
                      isUploading={isUploading}
                      onChange={startUpload}
                    />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading || isUploading}>
                {isLoading ? (
                  <>
                    <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />{" "}
                    Saving
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
