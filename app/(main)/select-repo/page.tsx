import axios from "axios";

import { getUser } from "@/lib/auth";
import { RepoList } from "./repo-list";

export default async function SelectRepoPage() {
  const user = await getUser();
  const { data: repos } = await axios.get(
    `https://api.github.com/users/${user.name}/repos`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_CLIENT_SECRET}`,
      },
    }
  );

  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <h1 className="px-20 my-16 text-3xl md:text-4xl text-center font-extrabold text-balance'">
        Choose one of your repository&apos;s issues as your blog
      </h1>
      <RepoList repos={repos} />
    </div>
  );
}
