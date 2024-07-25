import * as React from "react";

import CreateSubjectForm from "./_components/create-subject-form";
import SubjectList from "./_components/subject-list";
import SearchSubjectInput from "./_components/search-subject-input";

interface Props {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}
export default function AdminPage({ searchParams }: Props) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 w-full max-w-7xl mx-auto">
      <div className="flex">
        <SearchSubjectInput />
        <CreateSubjectForm />
      </div>
      <React.Suspense fallback={<SubjectList.Skeleton />}>
        <SubjectList search={searchParams?.search} />
      </React.Suspense>
    </div>
  );
}
