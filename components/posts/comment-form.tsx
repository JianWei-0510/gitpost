"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Loader2 } from "lucide-react";
import { HiPaperAirplane } from "react-icons/hi2";
import { Button } from "../ui/button";

import { createComment } from "@/actions/createComment";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";

const ReactMarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

function SubmitButton({ comment }: { comment: string }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={comment === "" || pending} type='submit'>
      {pending ? (
        <Loader2 className='w-5 h-5 mr-2 animate-spin' />
      ) : (
        <HiPaperAirplane className='w-5 h-5 mr-2' />
      )}
      Send
    </Button>
  );
}

export const CommentForm = ({ commentUrl }: { commentUrl: string }) => {
  const [comment, setComment] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const submitAction = async () => {
    const res = await createComment(comment, commentUrl, pathname);
    if (!res.success) return toast.error(res.message);

    toast.success(res.message);
    setComment("");
    router.refresh();
  };

  return (
    <form
      action={submitAction}
      className='w-full h-full flex flex-col justify-center items-center gap-y-4 p-6 bg-[#151515]'>
      <ReactMarkdownEditor
        className='w-full h-72 dark:text-white dark:bg-[#151515] whitespace-pre-wrap'
        value={comment}
        onChange={setComment}
      />
      <input name='comment' value={comment} className='hidden' />
      <div className='w-full flex items-center justify-center text-xl my-2'>
        <SubmitButton comment={comment} />
      </div>
    </form>
  );
};
