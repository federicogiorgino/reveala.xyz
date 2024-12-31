import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { UserDropdown } from "@/components/user-dropdown";

async function Navbar() {
  const session = await auth.api.getSession({ headers: headers() });
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70">
      <div className="container mx-auto px-4 md:px-0">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="text-primary h-10 w-10" />
            <span className="text-lg font-bold select-none">
              reveala.<span className="">xyz</span>
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {session ? (
              <UserDropdown
                user={session.user}
                isAdmin={session.user.role === "admin"}
              />
            ) : (
              <Link
                href="/sign-in"
                className={buttonVariants({ variant: "default" })}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
