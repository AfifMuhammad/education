"use client";
import { useEffect, useState } from "react";

import type { HeadingType } from "@/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";

interface Props {
	headings: HeadingType[];
}

export const TableOfContents = ({ headings }: Props) => {
	const [activeId, setActiveId] = useState<string>();

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{ rootMargin: "0px 0px -80% 0px" },
		);

		for (const heading of headings) {
			const element = document.getElementById(heading.id);
			if (element) {
				observer.observe(element);
			}
		}

		return () => {
			for (const heading of headings) {
				const element = document.getElementById(heading.id);
				if (element) {
					observer.unobserve(element);
				}
			}
		};
	}, [headings]);

	return (
		<div className="sticky top-16 -mt-10 pt-4">
			<ScrollArea className="pb-10">
				<div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
					<ul className={cn("m-0 list-none")}>
						{headings.map((heading) => {
							return (
								<li key={heading.id} className={cn("mt-0 pt-2")}>
									<a
										href={`#${heading.id}`}
										className={cn(
											"inline-block no-underline transition-colors hover:text-foreground",
											heading.id === activeId
												? "font-medium text-foreground"
												: "text-muted-foreground",
										)}
									>
										{heading.title}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			</ScrollArea>
		</div>
	);
};
