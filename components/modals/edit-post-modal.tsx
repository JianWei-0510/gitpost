"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { editPost } from "@/actions/editPost";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

const ReactMarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

function SubmitButton({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={title === "" || description === "" || pending}
      type='submit'>
      {pending && <Loader2 className='w-5 h-5 mr-2 animate-spin' />}
      Submit
    </Button>
  );
}

export const EditPostModal = () => {
  const { data, isOpen, onClose } = useProModal();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const modalOpen = searchParams.get("modal");

  const submitAction = async () => {
    const res = await editPost(title, description, data.url as string);
    if (!res.success) return toast.error(res.message);
    toast.success(res.message);
    router.push(pathname);
    onClose();
  };

  useEffect(() => {
    setTitle(data.title as string);
    setDescription(data.body as string);
  }, [data.title, data.body]);

  return (
    <Dialog open={isOpen && modalOpen === "edit"} onOpenChange={onClose}>
      <DialogContent className='min-w-full h-screen md:min-w-fit md:max-w-[750px] md:h-fit'>
        <form action={submitAction}>
          <DialogHeader>
            <DialogTitle className='flex flex-col justify-center items-center gap-y-4 pb-2'>
              <div className='flex items-center gap-x-2 font-bold py-1 mb-2 text-2xl'>
                Edit the post
              </div>
            </DialogTitle>
            <DialogDescription className='w-full h-full'>
              <Input
                name='title'
                value={title}
                defaultValue={data.title}
                type='text'
                placeholder='Title'
                className='mb-4'
                onChange={(e) => setTitle(e.target.value)}
              />
              <ReactMarkdownEditor
                value={description}
                defaultValue={data.body}
                onChange={(value) => setDescription(value)}
                className='w-full h-[650px] md:h-[450px] dark:text-white dark:bg-neutral-900 whitespace-pre-wrap'
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className='mt-6'>
            <div className='w-full flex items-center justify-between'>
              <DialogClose asChild>
                <Button variant='ghost' asChild>
                  <Link href={pathname}>Cancel</Link>
                </Button>
              </DialogClose>
              <SubmitButton title={title} description={description} />
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
