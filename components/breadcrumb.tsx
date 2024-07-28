"use client";
import * as React from "react";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
	const pathName = usePathname();
	const paths = pathName.split("/").filter((path) => path !== "");

	return (
		<div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
			{paths.map((path, index) => {
				if (index !== paths.length - 1) {
					return (
						<React.Fragment key={path}>
							<Link href={`/${paths.slice(0, index + 1).join("/")}`}>
								<div className="overflow-hidden text-ellipsis whitespace-nowrap hover:underline">
									{path.charAt(0).toUpperCase() + path.slice(1)}
								</div>
							</Link>
							{index !== paths.length - 1 && <ChevronRightIcon />}
						</React.Fragment>
					);
				}
				return (
					<div className="font-medium text-foreground" key={path}>
						{path.charAt(0).toUpperCase() + path.slice(1)}
					</div>
				);
			})}
		</div>
	);
};

export default Breadcrumbs;
