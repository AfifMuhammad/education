import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { getSubject } from "@/actions/subject/show";

interface Props {
  children: React.ReactNode;
  params: { id: string };
}

export default async function SubjectLayout({ children, params }: Props) {
  const subject = await getSubject(params.id);

  if (!subject) return <div>Subject not found</div>;

  return (
    <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">{subject.name}</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <Link href="#" className="font-semibold text-primary">
            General
          </Link>
          <Link href="#">Lessons</Link>
          <Link href="#">Quiz</Link>
          <Link href="#">VLab</Link>
          <Link href="#">Advanced</Link>
        </nav>
        {children}
      </div>
    </div>
  );
}
