"use server";

import prisma from "@/lib/db";

export const getAllSubject = async () => {
  const subjects = await prisma.subject.findMany();
  return subjects;
};

export const getSubject = async (subjectId: string) => {
  const subject = await prisma.subject.findFirst({
    where: {
      id: subjectId,
    },
  });

  return subject;
};
