"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, hydrated: isHydrated } = useAuthStore();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isHydrated) {
      if (user) router.push("/");
      else setChecked(true);
    }
  }, [user, isHydrated, router]);

  if (!isHydrated || !checked) return null; // Prevent flicker

  return <>{children}</>;
}
