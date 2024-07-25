import { Skeleton } from "@/components/ui/skeleton";
import { getAllSubject } from "@/actions/subject/show";
import SubjectCard from "./subject-card";

interface Props {
  search?: string;
}
const SubjectList = async ({ search }: Props) => {
  const subjects = await getAllSubject(search);

  if (subjects.length > 0) {
    return (
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    );
  } else {
    return <div>Data tidak ditemukan</div>;
  }
};

SubjectList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  );
};

export default SubjectList;
