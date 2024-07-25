"use client";
import * as React from "react";
import { LoaderCircle } from "lucide-react";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logOut } from "@/actions/auth/log-out";

const LogOutButton = () => {
  const [signingOut, setSigningOut] = React.useState<boolean>(false);

  const handleSignOut = async (event: Event) => {
    event.preventDefault();
    setSigningOut(true);
    await logOut();
    setSigningOut(false);
  };
  return (
    <DropdownMenuItem onSelect={handleSignOut}>
      {signingOut ? (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "Sign Out"
      )}
    </DropdownMenuItem>
  );
};

export default LogOutButton;
