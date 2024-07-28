"use server";
import type { z } from "zod";

import type { ActionState } from "@/lib/create-safe-action";
import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteLesson } from "./schema";
import prisma from "@/lib/db";
import type { Lesson } from "@prisma/client";

type InputType = z.infer<typeof DeleteLesson>;
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
    lesson = await prisma.lesson.delete({
      where: {
        id: data.id,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update lesson",
    };
  }

  return { data: lesson };
};

export const deleteLesson = createSafeAction(DeleteLesson, handler);
