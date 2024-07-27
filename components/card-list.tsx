import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Icons } from "./icons";
import { Skeleton } from "./ui/skeleton";

interface Props<T> {
  title?: string;
  list: T[];
  id: keyof T;
  name: keyof T;
  description?: keyof T;
  background?: keyof T;
  href: string;
  icon: keyof typeof Icons;
}

export default function CardList<T>({
  title,
  list,
  id,
  name,
  description,
  href,
  background,
  icon,
}: Props<T>) {
  if (list.length === 0) return <div>Data empty</div>;
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
      {list.map((item) => (
        <Card
          key={item[id] as string}
          className="bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage:
              background && item[background] && `url(${item[background]})`,
          }}
        >
          <div className="backdrop-blur-[3px] bg-white/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">{title}</CardTitle>
              {React.createElement(Icons[icon], {
                className: "h-4 w-4",
              })}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Link
                  className="hover:underline"
                  href={href.replace("[id]", item[id] as string)}
                >
                  {item[name] as string}
                </Link>
              </div>
              <p className="text-xs">
                {description ? (item[description] as string) : ""}
              </p>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}

CardList.Skeleton = function SkeletonBoardList() {
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
