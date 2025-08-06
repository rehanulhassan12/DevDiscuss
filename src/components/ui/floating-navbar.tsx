"use client";

import { useState, JSX } from "react";
import { Button } from "./button";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useAuthStore } from "@/store/Auth";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function FloatingNav({
  navItems,
  className
}: {
  navItems: { name: string, link: string, icon?: JSX.Element }[];
  className?: string;
}) {
  const [visible, setVisible] = useState(true);
  const { scrollYProgress } = useScroll();
  const { session, logout } = useAuthStore();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious()!;

      {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem, Idx) => (
          <Link
            key={`nav-item-${Idx}`}
            href={navItem.link}
            className={cn("relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300")}
          >
            {navItem.icon && <span className="block sm:hidden">{navItem.icon}</span>}
            <span className="hidden sm:block">{navItem.name}</span>
          </Link>
        ))}

        {session ? (
          <Button onClick={logout} className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white">
            <span>Logout</span>
            <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </Button>
        ) : (
          <>
            <Link href="/login" className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white">
              <span>Login</span>
              <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </Link>
            <Link href="/register" className="relative rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-black dark:border-white/[0.2] dark:text-white">
              <span>Sign up</span>
              <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </Link>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
