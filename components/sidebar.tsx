"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  HiArrowLeftOnRectangle,
  HiMagnifyingGlass,
  HiUserCircle,
} from "react-icons/hi2";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { CreatePostButton } from "./create-post-button";
import { logout } from "@/actions/logout";

export const Sidebar = ({ user }: { user: any }) => {
  const pathname = usePathname();

  console.log(user);

  return (
    <aside className='hidden md:flex fixed w-64 h-full flex-col justify-between bg-neutral-900 border-r-2 border-neutral-800'>
      <div className='p-4'>
        <Image
          src='/logo-with-name.png'
          alt='Logo with name'
          width={1200}
          height={630}
        />
      </div>

      <div className='w-full px-2 py-2 mt-20'>
        <Link
          href={`/${user.name}`}
          className={cn(
            "group px-4 py-2 pl-12 rounded-lg flex items-center text-xl font-semibold uppercase gap-x-3 w-full hover:bg-neutral-500/10 active:bg-neutral-600/10 active:scale-95 active:text-neutral-400 transition mb-3",
            pathname.includes(`/${user.name}`) ? "bg-neutral-500/10" : ""
          )}>
          <HiUserCircle className='w-6 h-6' />
          <p>blog</p>
        </Link>
        <Link
          href='/search'
          className={cn(
            "group px-4 py-2 pl-12 rounded-lg flex items-center text-xl font-semibold uppercase gap-x-3 w-full hover:bg-neutral-500/10 active:bg-neutral-600/10 active:scale-95 active:text-neutral-400 transition mb-3",
            pathname.includes("/search") ? "bg-neutral-500/10" : ""
          )}>
          <HiMagnifyingGlass className='w-6 h-6' />
          <p>search</p>
        </Link>
        <div className='w-full flex items-center justify-center mt-8'>
          <CreatePostButton />
        </div>
      </div>

      {user && (
        <div className='group w-full mt-auto px-2 py-4 pb-6 flex items-center justify-between'>
          <div className='flex items-center'>
            <Avatar className='border-2 mr-2'>
              <AvatarImage src={user.avatar_url} />
            </Avatar>
            <div>
              <p className='text-sm mb-1'>{user.name}</p>
              <p className='text-xs text text-muted-foreground'>{user.email}</p>
            </div>
          </div>

          <form action={logout}>
            <Button size='icon' variant='ghost'>
              <HiArrowLeftOnRectangle className='w-6 h-6 text-red-500' />
            </Button>
          </form>
        </div>
      )}
    </aside>
  );
};
