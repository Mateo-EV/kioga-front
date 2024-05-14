"use client";

import AuthPage from "@/app/(home)/(auth)/_components/auth-page";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const onOpenChange = (v: boolean) => {
    if (!v) {
      setTimeout(() => router.back(), 100);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <AuthPage isLoginPage isModal />
      </DialogContent>
    </Dialog>
  );
}