"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { HiBars3 } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  HiArrowLeftOnRectangle,
  HiMagnifyingGlass,
  HiUserCircle,
} from "react-icons/hi2";

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";
import { CreatePostButton } from "./create-post-button";
import { logout } from "@/actions/logout";
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

export const Header = ({ user }: { user: any }) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          if (direction !== 1) setVisible(false);
        }
      }
    }
  });

  const pathname = usePathname();

  return (
    <AnimatePresence mode='wait'>
      <motion.header
        initial={{ opacity: 1 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className='fixed flex items-center justify-between z-50 w-full h-[64px] backdrop-blur-md border-b md:hidden p-2'>
        <Sheet>
          <SheetTrigger>
            <Button size='icon' variant='ghost'>
              <HiBars3 className='w-6 h-6' />
            </Button>
          </SheetTrigger>
          <SheetContent
            side='left'
            className='w-64 h-full flex flex-col justify-between bg-neutral-900 p-0'>
            <div className='w-full px-2 py-2 mt-40'>
              <SheetClose asChild>
                <Link
                  href={`/${user.name}`}
                  className={cn(
                    "group px-4 py-2 pl-12 rounded-lg flex items-center text-xl font-semibold uppercase gap-x-3 w-full hover:bg-neutral-500/10 active:bg-neutral-600/10 active:scale-95 active:text-neutral-400 transition mb-3",
                    pathname.includes(`/${user.name}`)
                      ? "bg-neutral-500/10"
                      : ""
                  )}>
                  <HiUserCircle className='w-6 h-6' />
                  <p>blog</p>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href='/search'
                  className={cn(
                    "group px-4 py-2 pl-12 rounded-lg flex items-center text-xl font-semibold uppercase gap-x-3 w-full hover:bg-neutral-500/10 active:bg-neutral-600/10 active:scale-95 active:text-neutral-400 transition mb-3",
                    pathname.includes("/search") ? "bg-neutral-500/10" : ""
                  )}>
                  <HiMagnifyingGlass className='w-6 h-6' />
                  <p>search</p>
                </Link>
              </SheetClose>
              <div className='w-full flex items-center justify-center mt-8'>
                <SheetClose asChild>
                  <CreatePostButton />
                </SheetClose>
              </div>
            </div>

            {user && (
              <div className='group w-full flex items-center justify-between  px-2 py-4 pb-6 pl-4'>
                <div className='flex items-center'>
                  <Avatar className='border-2 mr-2'>
                    <AvatarImage src={user.avatar_url} />
                  </Avatar>
                  <div>
                    <p className='text-sm mb-1'>{user.name}</p>
                    <p className='text-xs text text-muted-foreground'>
                      {user.email}
                    </p>
                  </div>
                </div>
                <form action={logout}>
                  <Button size='icon' variant='ghost'>
                    <HiArrowLeftOnRectangle className='w-6 h-6 text-red-500' />
                  </Button>
                </form>
              </div>
            )}
          </SheetContent>
        </Sheet>

        <div>
          <Image
            src='/logo.png'
            width={50}
            height={50}
            alt='Logo'
            className='mr-10'
          />
        </div>

        <div />
      </motion.header>
    </AnimatePresence>
  );
};
