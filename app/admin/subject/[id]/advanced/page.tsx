import { getSubject } from "@/actions/subject/show";
import type { SubjectPageProps } from "@/types";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteSubjectButton from "./_components/delete-subject-button";

export default async function AdvancedPage({ params }: SubjectPageProps) {
  const subject = await getSubject(params.id);
  if (!subject) return <div>Subject not found</div>;
  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>Delete</CardTitle>
        <CardDescription>Delete {subject.name}</CardDescription>
      </CardHeader>
      <CardFooter className="border-t px-6 py-4">
        <DeleteSubjectButton subject={subject} />
      </CardFooter>
    </Card>
  );
}
