import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

async function EmailVerifiedPage() {
  return (
    <div className="flex flex-col items-center justify-center grow p-4">
      <h1 className="mb-4 text-2xl font-bold text-primary">Email Verified!</h1>
      <p className="mb-4 text-muted-foreground">
        Your email has been successfully verified.
      </p>
      <Link
        href="/"
        className={buttonVariants({
          variant: "default",
        })}
      >
        Go to home
      </Link>
    </div>
  );
}

export default EmailVerifiedPage;
