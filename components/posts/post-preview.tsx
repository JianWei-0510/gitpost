import Link from "next/link";
import ReactMarkdown from "react-markdown";

export const PostPreview = ({ user, post }: { user: any; post: any }) => {
  return (
    <Link
      href={`/${user?.name}/${post.number}`}
      className='p-6 w-full flex flex-col gap-y-4 border-b bg-[#141414] cursor-pointer hover:bg-neutral-500/10 active:bg-neutral-600/10 active:scale-95 active:text-neutral-400 transition'>
      <h2 className='text-xl sm:text-2xl font-semibold'>{post.title}</h2>
      <ReactMarkdown className='line-clamp-3'>{post.body}</ReactMarkdown>
    </Link>
  );
};
