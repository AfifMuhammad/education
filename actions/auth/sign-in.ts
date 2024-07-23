"use server";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { SignIn } from "./schema";

type InputType = z.infer<typeof SignIn>;
type ReturnType = ActionState<InputType, { success: boolean; message: string }>;

const handler = async (data: InputType): Promise<ReturnType> => {
  try {
    await signIn("credentials", data);
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        data: {
          success: false,
          message: error.cause?.err?.message || "Something went wrong",
        },
      };
    }
    throw error;
  }

  return { data: { success: true, message: "Sign in successful." } };
};

export const authenticate = createSafeAction(SignIn, handler);
