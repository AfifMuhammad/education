import { z } from "zod";

export const UpsertLesson = z.object({
  id: z.string().optional(),
  title: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  image: z.string(),
  content: z.string(),
  subjectId: z.string(),
});

export const DeleteLesson = z.object({
  id: z.string({ required_error: "Id is required" }),
});