"use client";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";

import React, { ReactNode, useEffect } from "react";
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, hydrated: isHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !user) router.push("/login");
  }, [isHydrated, user]);

  if (!isHydrated || !user) return null;

  return <>{children}</>;
}
