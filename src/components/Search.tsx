"use client"
import React from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Input } from './ui/input'
import { Button } from './ui/button'

function Search() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [search, setSearch] = React.useState(searchParams.get("search") || "");

  React.useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("search", search);
    router.push(`${pathname}?${newSearchParams.toString()}`);

  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-row gap-4"  >
      <Input
        value={search}
        onChange={(e) => setSearch(() => e.target.value)}
        placeholder="Search questions"
        type='text'
      />
      <Button
        disabled={!search || search.trim().length === 0}
        className="shrink-0 rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600" >Submit</Button>
    </form>
  )

}
export default Search