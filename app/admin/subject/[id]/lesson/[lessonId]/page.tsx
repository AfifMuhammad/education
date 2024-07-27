import * as React from "react";
import { TableOfContents } from "@/components/toc";
import { HeadingType, SubjectPageProps } from "@/types";
import LessonForm from "../_components/lesson-form";
import { getLesson } from "@/actions/lesson/show";

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
  const lesson = await getLesson(params.lessonId!);
  if (!lesson) return <div>Data not found</div>;

  return (
    <React.Fragment>
      <div>
        <LessonForm lesson={lesson} subjectId={lesson.subjectId} />
      </div>
      <div className="hidden text-sm xl:block">
        <TableOfContents headings={headings} />
      </div>
    </React.Fragment>
  );
}
