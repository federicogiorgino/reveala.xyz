import { ResetPasswordForm } from "@/components/reset-password-form";
import { Suspense } from "react";

function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}

export default ResetPasswordPage;
