import * as React from "react";
import { getSubject } from "@/actions/subject/show";
import { TableOfContents } from "@/components/toc";
import { HeadingType, SubjectPageProps } from "@/types";
import LessonForm from "../_components/lesson-form";

const headings: HeadingType[] = [
  {
    id: "identity",
    title: "Identitas Umum",
  },
  {
    id: "address",
    title: "Alamat",
  },
  {
    id: "residence-address",
    title: "Alamat Domisili",
  },
  {
    id: "consent",
    title: "Persetujuan Umum",
  },
];

export default async function LessonPage({ params }: SubjectPageProps) {
  const subject = await getSubject(params.id);
  if (!subject) return <div>Data not found</div>;

  return (
    <React.Fragment>
      <div>
        <LessonForm subjectId={subject.id} />
      </div>
      <div className="hidden text-sm xl:block">
        <TableOfContents headings={headings} />
      </div>
    </React.Fragment>
  );
}
