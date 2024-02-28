import axios from "axios";
import { MDXRemote } from "next-mdx-remote/rsc";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getUser, getUserBlogRepo } from "@/lib/auth";
import { PostActionSelect } from "./post-action-select";
import { CommentForm } from "@/components/posts/comment-form";

export const revalidate = 0;

export default async function PostPage({
  params,
}: {
  params: { username: string; postNum: number };
}) {
  const user = await getUser();
  const blogRepo = await getUserBlogRepo(params.username);

  const { data: post } = await axios.get(
    `https://api.github.com/repos/${params.username}/${blogRepo}/issues/${params.postNum}`,
    {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    }
  );

  const { data: comments } = await axios.get(post.comments_url);

  const havePermission = user.name === params.username;

  return (
    <div className='w-full'>
      <div className='p-6 w-full flex flex-col gap-y-4 border-b'>
        <div className='w-full flex items-center'>
          <Avatar className='w-8 h-8 mr-3'>
            <AvatarImage src={post.user.avatar_url} />
          </Avatar>
          <p className='text-lg font-semibold'>{post.user.login}</p>
          {havePermission && <PostActionSelect post={post} />}
        </div>
        <div className='w-full max-w-none p-2 prose prose-neutral prose-invert'>
          <h1>{post.title}</h1>
          <MDXRemote source={post.body} />
        </div>
      </div>

      <div className='w-full border-y'>
        <div className='w-full bg-[#151515] h-30 p-6 justify-items-end font-semibold'>
          {`${post.comments} comment${parseInt(post.comments) > 1 ? "s" : ""}`}
        </div>
      </div>

      <div className='w-full'>
        {comments?.length > 0 ? (
          comments.map((comment: any) => (
            <div
              key={comment.id}
              className='p-6 w-full flex flex-col gap-y-4 border-b'>
              <div className='w-full flex items-center'>
                <Avatar className='w-5 h-5 mr-2'>
                  <AvatarImage src={comment.user.avatar_url} />
                </Avatar>
                <p className='text-sm'>{comment.user.login}</p>
              </div>
              <div className='w-full max-w-none p-2 prose prose-neutral prose-invert'>
                <MDXRemote source={comment.body} />
              </div>
            </div>
          ))
        ) : (
          <div className='text-muted-foreground w-full h-52 flex flex-col items-center justify-center text-center my-6 gap-y-4'>
            <div className='w-full flex items-center justify-center'>
              <HiChatBubbleBottomCenter className='w-16 h-16' />
            </div>
            <p className='text-balance text-xl md:text-2xl font-semibold '>
              Nobody leaves a comment yet, become the first one!
            </p>
          </div>
        )}
      </div>

      <CommentForm commentUrl={post.comments_url} />
    </div>
  );
}
