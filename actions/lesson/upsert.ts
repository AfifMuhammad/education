"use server";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpsertLesson } from "./schema";
import prisma from "@/lib/db";
import { Lesson } from "@prisma/client";

type InputType = z.infer<typeof UpsertLesson>;
type ReturnType = ActionState<InputType, Lesson>;

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user) {
    return {
      error: "Unauthorized",
    };
  }

  let lesson = null;
  try {
    if (!data.id) {
      lesson = await prisma.lesson.create({
        data: {
          subjectId: data.subjectId,
          title: data.title,
          image: data.image,
          content: data.content,
        },
      });
    } else {
      lesson = await prisma.lesson.update({
        where: {
          id: data.id,
        },
        data: {
          title: data.title,
          image: data.image,
          content: data.content,
        },
      });
    }
  } catch (error) {
    console.log(error);

    return {
      error: "Failed to create lesson",
    };
  }

  return { data: lesson };
};

export const upsertLesson = createSafeAction(UpsertLesson, handler);
