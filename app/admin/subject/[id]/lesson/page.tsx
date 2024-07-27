import { getSubject } from "@/actions/subject/show";
import CardList from "@/components/card-list";
import { buttonVariants } from "@/components/ui/button";
import { SubjectPageProps } from "@/types";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

export default async function LessonPage({ params }: SubjectPageProps) {
  const subject = await getSubject(params.id);
  if (!subject) return <div>Data not found</div>;

  return (
    <div>
      <Link
        className={buttonVariants({ variant: "default" })}
        href={`/admin/subject/${subject.id}/lesson/add`}
      >
        <PlusIcon className="mr-2 h-4 w-4" /> Add
      </Link>
      <div className="mt-2">
        <CardList
          list={subject.lessons}
          id="id"
          name="title"
          background="image"
          href={`/admin/subject/${subject.id}/lesson/[id]`}
          icon="editing"
          title="Lesson"
        />
      </div>
    </div>
  );
}
