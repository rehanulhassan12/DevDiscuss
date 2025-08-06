"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import React from 'react'

function Pagination({
  className,
  total,
  limit
}: {
  className?: string,
  total: number,
  limit: number
}) {

  const searchParams = useSearchParams()
  const page = searchParams.get("page") || "1";
  const router = useRouter();
  const pathname = usePathname();
  const totalPages = Math.ceil(total / limit);

  function prev() {
    if (page <= "1") return;
    const pageNumber = parseInt(page)
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", (pageNumber - 1).toString());
    router.push(`${pathname}?${newSearchParams.toString()}`);

  }
  function next() {
    if (page >= totalPages.toString()) return;
    const pageNumber = parseInt(page)
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", (pageNumber + 1).toString());
    router.push(`${pathname}?${newSearchParams.toString()}`);

  }

  return (
    <div className="flex items-center justify-center gap-4" >
      <button
        onClick={prev}
        disabled={page <= "1"}
        className={`${className} rounded-lg bg-white/10 px-2 py-0.5 duration-200 hover:bg-white/20`}
      >Previous</button>
      <span>{page} of {totalPages || "1"}</span>
      <button
        onClick={next}
        disabled={page >= totalPages.toString()}
        className={`${className} rounded-lg bg-white/10 px-2 py-0.5 duration-200 hover:bg-white/20`}
      >Next</button>
    </div>
  )
}

export default Pagination




