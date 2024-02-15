import Link from "next/link";
import qs from "query-string";
import { Github } from "lucide-react";

import { getUser } from "@/lib/auth";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";

export default async function HomePage() {
  const user = await getUser();
  const githubLoginUrl = qs.stringifyUrl({
    url: "https://github.com/login/oauth/authorize",
    query: {
      client_id: process.env.GITHUB_CLIENT_ID,
      scope: "read:user,user:email,repo",
      redirect_url: "http://localhost:3000/callback",
    },
  });

  const { data: repoResopnseData } = await axios.get(
    "https://api.github.com/user/repos",
    {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        accept: "application/vnd.github+json",
      },
    }
  );

  console.log(repoResopnseData);

  if (user)
    return (
      <div>
        <Avatar>
          <AvatarImage src={user.avatar_url} />
        </Avatar>
        <form action={logout}>
          <Button>登出</Button>
        </form>
        <div>
          {repoResopnseData.map((r) => (
            <p>{r.name}</p>
          ))}
        </div>
      </div>
    );

  return (
    <div className='w-full h-[1000px] flex items-center justify-center'>
      <Button asChild>
        <Link href={githubLoginUrl}>
          <Github className='w-4 h-4 mr-2' />
          使用 Github 登入
        </Link>
      </Button>
    </div>
  );
}
