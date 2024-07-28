import { BookOpenText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Subject } from "@prisma/client";
import Link from "next/link";

export default function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <Card
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${subject.image})` }}
    >
      <div className="backdrop-blur-[3px] bg-white/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subject</CardTitle>
          <BookOpenText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Link
              className="hover:underline"
              href={`/admin/subject/${subject.id}`}
            >
              {subject.name}
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">{subject.description}</p>
        </CardContent>
      </div>
    </Card>
  );
}
