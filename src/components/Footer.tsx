"use client";
import React from "react";
import { AnimatedGridPattern } from "./magicui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";


export default function Footer() {
  const footerItems = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Questions",
      href: "/questions",
    },
    {
      title: "Privicy Policy",
      href: "/privacy-policy",
    },

  ]


  return (
    <footer className="relative block overflow-hidden border-t border-solid border-white/30 py-20">
      <div className="container mx-auto px-4">

        <ul className="flex flex-wrap items-center justify-center gap-3">

          {footerItems.map((item) => (
            <li key={`footer-item-${item.href}`}>
              <Link
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-center"> &copy; {new Date().getFullYear()}  Dev Discuss</div>
      </div>

      <AnimatedGridPattern

        numSquares={40}
        maxOpacity={0.45}
        duration={3}
        repeatDelay={0.8}
        className={cn("[mask-image:radial-gradient(3000px_circle_at_center,white,transparent)]", "inset-y-[-50%] h-[200%] skew-y-6")}

      />


    </footer>
  )





}