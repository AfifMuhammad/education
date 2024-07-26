import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EditSubjectForm from "./_components/edit-subject-form";
import { getSubject } from "@/actions/subject/show";
import EditSubjectImageForm from "./_components/edit-subject-image-form";

interface Props {
  params: { id: string };
}
export default async function SubjectPage({ params }: Props) {
  const subject = await getSubject(params.id);

  if (!subject) return <div>Subject not found</div>;
  return (
    <div className="grid gap-6">
      <EditSubjectForm subject={subject} />
      <EditSubjectImageForm subject={subject} />
    </div>
  );
}
