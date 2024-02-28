"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useProModal } from "@/hooks/use-post-modal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiEllipsisVertical, HiPencil, HiTrash } from "react-icons/hi2";

export const PostActionSelect = ({ post }: { post: any }) => {
  const { onOpen } = useProModal();
  const pathname = usePathname();

  return (
    <Popover>
      <PopoverTrigger asChild className='ml-auto'>
        <Button variant='ghost' size='icon'>
          <HiEllipsisVertical className='w-6 h-6' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-52 rounded-lg p-2'>
        <Link
          href={`${pathname}?modal=edit`}
          className='group p-2 rounded-lg flex items-center font-semibold gap-x-3 w-full cursor-pointer hover:bg-neutral-500/10 active:bg-neutral-600/10 active:scale-95 active:text-neutral-400 transition'
          onClick={() =>
            onOpen({ title: post.title, body: post.body, url: post.url })
          }>
          <HiPencil />
          <p>Edit</p>
        </Link>

        <Link
          href={`${pathname}?modal=delete`}
          className='group p-2 rounded-lg flex items-center font-semibold gap-x-3 w-full cursor-pointer text-red-500 hover:bg-neutral-500/10 active:bg-neutral-600/10 active:scale-95 active:text-red-700 transition'
          onClick={() => onOpen({ url: post.url })}>
          <HiTrash />
          <p>Delete</p>
        </Link>
      </PopoverContent>
    </Popover>
  );
};
