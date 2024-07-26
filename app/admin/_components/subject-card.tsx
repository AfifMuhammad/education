import { BookOpenText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Subject } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <Card className="relative overflow-hidden rounded-lg flex items-end shadow-lg hover:shadow-xl">
      {subject.image ? (
        <Image
          src={subject.image}
          alt={subject.name}
          width={200}
          height={200}
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
      ) : null}
      <div className="z-10 w-full bg-white/5 backdrop-blur-[3px]">
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
