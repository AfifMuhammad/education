"use client";

import Link from "next/link";
import type { Subject } from "@prisma/client";
import { usePathname } from "next/navigation";

interface Props {
  subject: Subject;
}
export default function SideNav({ subject }: Props) {
  const pathName = usePathname();

  return (
    <nav
      className="grid gap-4 text-sm text-muted-foreground"
      x-chunk="dashboard-04-chunk-0"
    >
      <Link
        href={`/admin/subject/${subject.id}`}
        className={
          pathName === `/admin/subject/${subject.id}`
            ? "font-semibold text-primary"
            : undefined
        }
      >
        General
      </Link>
      <Link
        href={`/admin/subject/${subject.id}/lesson`}
        className={
          pathName.startsWith(`/admin/subject/${subject.id}/lesson`)
            ? "font-semibold text-primary"
            : undefined
        }
      >
        Lessons
      </Link>
      <Link href="#">Quiz</Link>
      <Link href="#">VLab</Link>
      <Link
        href={`/admin/subject/${subject.id}/advanced`}
        className={
          pathName === `/admin/subject/${subject.id}/advanced`
            ? "font-semibold text-primary"
            : undefined
        }
      >
        Advanced
      </Link>
    </nav>
  );
}
