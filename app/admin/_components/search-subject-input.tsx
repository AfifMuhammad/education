"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";
export default function SearchSubjectInput() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const debouncedValue = useDebounce<string>(searchTerm, 1000);

  React.useEffect(() => {
    if (debouncedValue) {
      router.replace(`/admin?search=${debouncedValue}`);
    } else {
      router.replace("/admin");
    }
  }, [debouncedValue, router]);

  return (
    <form className="flex-1 sm:flex-initial mr-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
}
