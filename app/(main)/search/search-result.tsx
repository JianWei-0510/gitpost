import Link from "next/link";
import { db } from "@/lib/db";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HiXCircle } from "react-icons/hi2";

export const SearchResult = async ({ query }: { query: string }) => {
  let users = await db.user.findMany({
    where: {
      name: {
        startsWith: query,
      },
    },
  });

  if (!query) users = [];

  return (
    <div className='w-full h-full flex flex-col gap-y-2 divide-y pt-4'>
      {users.map((user) => (
        <Link
          key={user.name}
          href={`/${user.name}`}
          className='px-3 py-4 w-full flex items-center text-lg rounded-xl hover:bg-neutral-500/10 active:bg-neutral-600/10 active:scale-95 active:text-neutral-400 transition'>
          <Avatar className='w-8 h-8 mr-2'>
            <AvatarImage src={user.avatar_url} />
          </Avatar>
          {user.name}
        </Link>
      ))}
      {query && users.length === 0 && (
        <div className='w-full h-full flex flex-col gap-y-6 items-center justify-center text-lg text-muted-foreground'>
          <HiXCircle className='w-12 h-12' />
          User not found
        </div>
      )}
    </div>
  );
};
