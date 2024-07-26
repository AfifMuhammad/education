"use client";

import * as React from "react";
import { DeleteSubject } from "@/actions/subject/schema";
import { Subject } from "@prisma/client";
import { deleteSubject } from "@/actions/subject/delete";
import DeleteButton from "@/components/delete-button";

interface Props {
  subject: Subject;
}
export default function DeleteSubjectButton({ subject }: Props) {
  return (
    <DeleteButton
      data={subject}
      zodObject={DeleteSubject}
      action={deleteSubject}
      confirmationText={subject.name}
      redirectTo="/admin"
    />
  );
}
