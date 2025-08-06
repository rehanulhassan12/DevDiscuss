import { cn } from "@/lib/utils"
import React from "react"
export default function LabelInputContainer({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  )

}