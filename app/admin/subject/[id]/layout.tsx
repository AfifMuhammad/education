import { getSubject } from "@/actions/subject/show";
import SideNav from "./_components/side-nav";

interface Props {
  children: React.ReactNode;
  params: { id: string };
}

export default async function SubjectLayout({ children, params }: Props) {
  const subject = await getSubject(params.id);

  if (!subject) return <div>Subject not found</div>;

  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8">
      <div className="mx-auto grid w-full max-w-7xl gap-2">
        <h1 className="text-3xl font-semibold">{subject.name}</h1>
      </div>
      <div className="mx-auto grid w-full max-w-7xl items-start gap-6 md:grid-cols-[180px_1fr] xl:grid-cols-[250px_1fr_180px]">
        <SideNav subject={subject} />
        {children}
      </div>
    </div>
  );
}
