import EditSubjectForm from "./_components/edit-subject-form";
import { getSubject } from "@/actions/subject/show";
import EditSubjectImageForm from "./_components/edit-subject-image-form";
import { SubjectPageProps } from "@/types";

export default async function SubjectPage({ params }: SubjectPageProps) {
  const subject = await getSubject(params.id);

  if (!subject) return <div>Subject not found</div>;
  return (
    <div className="grid gap-6">
      <EditSubjectForm subject={subject} />
      <EditSubjectImageForm subject={subject} />
    </div>
  );
}
