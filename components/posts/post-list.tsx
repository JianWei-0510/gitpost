"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

import { getPost } from "@/actions/getPost";
import { cn } from "@/lib/utils";
import { PostPreview } from "./post-preview";

export const PostList = ({
  user,
  initialPosts,
}: {
  user: any;
  initialPosts: any;
}) => {
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    const loadMorPost = async () => {
      if (inView) {
        const next = page + 1;
        const { posts: newPosts } = await getPost(user, next);
        if (newPosts?.length) {
          setPage(next);
          setPosts((prev: any | undefined) => [
            ...(prev?.length ? prev : []),
            ...newPosts,
          ]);
          return;
        } else setIsEnd(true);
      }
    };

    loadMorPost();
  }, [inView]);

  return (
    <div className='w-full'>
      {posts.map((post: any) => (
        <PostPreview key={post.id} user={user} post={post} />
      ))}

      {!isEnd && (
        <div
          ref={ref}
          className={cn("flex items-center justify-center w-full h-32 py-4")}>
          <Loader2 className='w-10 h-10 mr-2 animate-spin' />
          Loading...
        </div>
      )}
    </div>
  );
};
