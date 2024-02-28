"use client";

import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";

import { useProModal } from "@/hooks/use-post-modal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { deletePost } from "@/actions/deletePost";
import { toast } from "sonner";

async function waitThreeSeconds(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
}

export const DeletePostModal = () => {
  const { data, isOpen, onClose } = useProModal();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const modalOpen = searchParams.get("modal");

  const submitAction = async (formData: FormData) => {
    const res = await deletePost(formData);
    if (!res.success) return toast.error(res.message);

    toast.success(res.message);
    await waitThreeSeconds();
    redirect(res.redirectPath || "/");
  };

  return (
    <Dialog open={isOpen && modalOpen === "delete"} onOpenChange={onClose}>
      <DialogContent className='min-w-full h-screen md:min-w-fit md:max-w-[750px] md:h-fit'>
        <form action={submitAction}>
          <DialogHeader>
            <DialogTitle className='flex flex-col justify-center items-center gap-y-4 pb-2'>
              <div className='flex items-center gap-x-2 font-bold py-1 mb-2 text-2xl'>
                Delete the post
              </div>
            </DialogTitle>
            <DialogDescription className='my-4 w-full h-full flex flex-col items-center justify-center text-lg'>
              <p>Are you sure you want to delete this post?</p>
              <p>
                This post will be permanently removed and cannot be recovered
              </p>
              <input name='url' value={data.url} className='hidden' />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='mt-6'>
            <div className='w-full flex items-center justify-between'>
              <DialogClose asChild>
                <Button variant='ghost' asChild>
                  <Link href={pathname}>Cancel</Link>
                </Button>
              </DialogClose>
              <Button
                type='submit'
                className='bg-red-600 hover:bg-red-700 active:bg-red-700 text-white'>
                Delete
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
