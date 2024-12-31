"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/auth.client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { User2 } from "lucide-react";
interface ImpersonateUserProps {
  userId: string;
}
function ImpersonateUser({ userId }: ImpersonateUserProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleImpersonateUser = async () => {
    try {
      await authClient.admin.impersonateUser({
        userId: userId,
      });
      router.push("/");
      toast({
        title: "Impersonated user",
        description: "You are now impersonating this user",
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to impersonate user:", error);
    }
  };

  return (
    <Button onClick={handleImpersonateUser} variant="ghost" size="icon">
      <User2 />
    </Button>
  );
}

export { ImpersonateUser };
