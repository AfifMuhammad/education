import * as React from "react";
import type { SubjectPageProps } from "@/types";
import LessonForm from "../_components/lesson-form";
import { getLesson } from "@/actions/lesson/show";

export default async function LessonPage({ params }: SubjectPageProps) {
  if (!params.lessonId) return <div>Lesson not found</div>;
  const lesson = await getLesson(params.lessonId);
  if (!lesson) return <div>Data not found</div>;

  return (
    <React.Fragment>
      <div>
        <LessonForm lesson={lesson} subjectId={lesson.subjectId} />
      </div>
      <div className="hidden text-sm xl:block">
      </div>
    </React.Fragment>
  );
}
