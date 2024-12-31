"use client";

import { authClient } from "@/auth.client";
import { Button } from "./ui/button";
import { UserDropdown } from "./user-dropdown";
import Link from "next/link";

function AuthButtons() {
  const { data: session } = authClient.useSession();

  return session ? (
    <UserDropdown user={session.user} />
  ) : (
    <Link href="/sign-in">
      <Button>Login</Button>
    </Link>
  );
}

export { AuthButtons };
