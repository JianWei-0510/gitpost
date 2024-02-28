"use client";

import Link from "next/link";
import { HiPlus } from "react-icons/hi2";
import { usePathname } from "next/navigation";

import { useProModal } from "@/hooks/use-post-modal";
import { Button } from "./ui/button";

export const CreatePostButton = () => {
  const { onOpen } = useProModal();
  const pathname = usePathname();

  return (
    <Button
      className='rounded-full gap-x-2 uppercase text-xl font-bold'
      size='lg'
      onClick={() => onOpen()}
      asChild>
      <Link href={`${pathname}?modal=create`}>
        <HiPlus className='w-6 h-6' />
        post
      </Link>
    </Button>
  );
};
