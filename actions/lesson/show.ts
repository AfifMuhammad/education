"use server";

import prisma from "@/lib/db";

export const getLesson = async (lessonId: string) => {
  const lesson = await prisma.lesson.findFirst({
    where: {
      id: lessonId,
    },
  });

  return lesson;
};
