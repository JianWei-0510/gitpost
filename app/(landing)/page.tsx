import Link from "next/link";
import qs from "query-string";
import { Github } from "lucide-react";

import { getUser } from "@/lib/auth";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/lib/db";
import Image from "next/image";

export default async function HomePage() {
  const user = await getUser();

  let blogUser = null;
  if (user)
    blogUser = await db.user.findUnique({
      where: {
        name: user.name,
      },
    });

  const githubLoginUrl = qs.stringifyUrl({
    url: "https://github.com/login/oauth/authorize",
    query: {
      client_id: process.env.GITHUB_CLIENT_ID,
      scope: "user,user:email,repo",
      redirect_url: "http://localhost:3000/callback",
    },
  });

  return (
    <div className='w-full h-full flex flex-col items-center'>
      <Image
        src='/logo-with-name.png'
        alt='Logo with name'
        width={600}
        height={315}
        className='mt-20 -mb-10'
      />

      <h1 className='text-2xl text-center text-balance font-bold mb-16 leading-relaxed'>
        Login with your Github, select a repository as your blog
      </h1>

      <div className='flex w-full items-center justify-center gap-x-10'>
        {blogUser ? (
          <>
            <form action={logout}>
              <Button variant='secondary' className='h-12'>
                Logout
              </Button>
            </form>
            <Button variant='outline' className='h-12 gap-x-4' asChild>
              <Link
                href={blogUser.blog_repo ? `/${user.name}` : "/select-repo"}>
                <Avatar className='h-7 w-7'>
                  <AvatarImage src={blogUser.avatar_url} />
                </Avatar>
                Keep using GitPost
              </Link>
            </Button>
          </>
        ) : (
          <Button asChild>
            <Link href={githubLoginUrl}>
              <Github className='w-4 h-4 mr-2' />
              Login
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
