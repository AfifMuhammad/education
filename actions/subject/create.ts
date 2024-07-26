"use server";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { auth } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateSubject } from "./schema";
import prisma from "@/lib/db";
import { Subject } from "@prisma/client";
import { revalidatePath } from "next/cache";

type InputType = z.infer<typeof CreateSubject>;
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
    subject = await prisma.subject.create({
      data,
    });
  } catch (error) {
    return {
      error: "Failed to create subject",
    };
  }

  revalidatePath("/admin");
  return { data: subject };
};

export const createSubject = createSafeAction(CreateSubject, handler);
