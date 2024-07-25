import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import CreateSubjectForm from "./_components/create-subject-form";
import SubjectList from "./_components/subject-list";

export default function AdminPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 w-full max-w-7xl mx-auto">
      <div className="flex">
        <form className="flex-1 sm:flex-initial mr-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <CreateSubjectForm />
      </div>
      <React.Suspense fallback={<SubjectList.Skeleton />}>
        <SubjectList />
      </React.Suspense>
    </div>
  );
}
