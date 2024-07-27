"use server";

import prisma from "@/lib/db";

export const getAllSubject = async (search?: string) => {
  if (!search) return await prisma.subject.findMany();
  return await prisma.subject.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
  });
};

export const getSubject = async (subjectId: string) => {
  const subject = await prisma.subject.findFirst({
    where: {
      id: subjectId,
    },
    include: {
      lessons: true,
    },
  });

  return subject;
};
