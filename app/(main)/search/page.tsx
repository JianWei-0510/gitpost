import { Suspense } from "react";

import { SearchForm } from "./search-form";
import { SearchResult } from "./search-result";
import { SearchLoading } from "./search-loading";

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";
  return (
    <div className='w-full h-full p-4'>
      <SearchForm />
      <Suspense fallback={<SearchLoading />}>
        <SearchResult query={query} />
      </Suspense>
    </div>
  );
}
