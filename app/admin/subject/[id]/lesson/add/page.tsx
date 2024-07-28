import * as React from "react";
import { getSubject } from "@/actions/subject/show";
import type { SubjectPageProps } from "@/types";
import LessonForm from "../_components/lesson-form";


export default async function LessonPage({ params }: SubjectPageProps) {
  const subject = await getSubject(params.id);
  if (!subject) return <div>Data not found</div>;

  return (
    <React.Fragment>
      <div>
        <LessonForm subjectId={subject.id} />
      </div>
      <div className="hidden text-sm xl:block">
      </div>
    </React.Fragment>
  );
}
