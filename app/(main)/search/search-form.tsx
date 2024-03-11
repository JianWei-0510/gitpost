"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HiMagnifyingGlass } from "react-icons/hi2";

export const SearchForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form className='w-full flex items-center gap-y-2 rounded-3xl border p-3'>
      <Input
        className='col-span-5 md:col-span-4 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent text-lg'
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
        placeholder='Type some user name...'
      />
      <HiMagnifyingGlass className='w-6 h-6 mr-2' />
    </form>
  );
};
