import { db } from "@/lib/db";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { getPost } from "@/actions/getPost";
import { PostList } from "@/components/posts/post-list";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";

export const revalidate = 0;

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const curUser = await getUser();

  const blogUser = await db.user.findUnique({
    where: {
      name: params.username,
    },
  });

  if (curUser.name === blogUser?.name && !blogUser?.blog_repo)
    return redirect("/select-repo");

  const { posts, postsCount } = await getPost(
    blogUser,
    curUser?.access_token,
    1
  );

  return (
    <div className='w-full h-full'>
      <div className='px-6 py-10 w-full flex flex-col items-center justify-center sm:flex-row sm:justify-start gap-y-4 border-b'>
        <Avatar className='w-20 h-20 sm:mr-5'>
          <AvatarImage src={blogUser?.avatar_url} />
        </Avatar>
        <div className='flex flex-col gap-2 justify-center items-center sm:items-start'>
          <p className='text-2xl sm:text-4xl font-semibold'>{blogUser?.name}</p>
          <p className='text-lg text-muted-foreground'>{`${postsCount} Post${
            parseInt(postsCount) > 1 ? "s" : ""
          }`}</p>
        </div>
      </div>

      <PostList user={blogUser} initialPosts={posts} />
    </div>
  );
}
