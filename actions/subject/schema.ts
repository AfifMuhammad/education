import { z } from "zod";

export const CreateSubject = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  description: z.string(),
  image: z.string(),
});

export const UpdateSubject = z.object({
  id: z.string({ required_error: "Id is required" }),
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  description: z.string(),
});

export const UpdateSubjectImage = z.object({
  id: z.string({ required_error: "Id is required" }),
  image: z.string({ required_error: "Image is required" }),
});

export const DeleteSubject = z.object({
  id: z.string({ required_error: "Id is required" }),
});
