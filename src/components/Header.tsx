"use client"
import React from "react"
import FloatingNav from "./ui/floating-navbar"
import { useAuthStore } from "@/store/Auth"
import slugify from "slugify"
import { IconHome, IconWorldQuestion, IconMessage } from "@tabler/icons-react"


export default function Header() {
  const { session, user } = useAuthStore();

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />
    },
    {
      name: "Questions",
      link: "/questions",
      icon: <IconWorldQuestion className="h-4 w-4 text-neutral-500 dark:text-white" />
    }
  ]

  if (session && user) {

    navItems.push({
      name: "Profile",
      link: `/users/${user.$id}/${slugify(user.name, { lower: true })}`,
      icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
    })
  }

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  )
}
