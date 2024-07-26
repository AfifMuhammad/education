"use server";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateSubjectImage } from "./schema";
import prisma from "@/lib/db";
import { Subject } from "@prisma/client";
import { revalidatePath } from "next/cache";

type InputType = z.infer<typeof UpdateSubjectImage>;
type ReturnType = ActionState<InputType, Subject>;

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user) {
    return {
      error: "Unauthorized",
    };
  }

  let subject = null;
  try {
    subject = await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        image: data.image,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update subject",
    };
  }

  revalidatePath(`/admin/subject/${data.id}`);
  return { data: subject };
};

export const updateSubjectImage = createSafeAction(UpdateSubjectImage, handler);
