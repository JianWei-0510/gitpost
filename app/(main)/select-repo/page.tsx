import axios from "axios";

import { getUser } from "@/lib/auth";
import { RepoList } from "./repo-list";

export default async function SelectRepoPage() {
  const user = await getUser();
  const { data: repos } = await axios.get(
    `https://api.github.com/users/${user.name}/repos`,
    {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    }
  );

  return (
    <div className='w-full h-full flex flex-col items-center justify-center p-4'>
      {repos.length !== 0 ? (
        <>
          <h1 className="px-20 my-16 text-3xl md:text-4xl text-center font-extrabold text-balance'">
            Choose one of your repository&apos;s issues as your blog
          </h1>
          <RepoList repos={repos} />
        </>
      ) : (
        <h1 className='text-xl md:text-2xl text-center font-extrabold text-balance text-muted-foreground'>
          You haven&apos;t have any GitHub repository yet, go to your GitHub
          page and create one!
        </h1>
      )}
    </div>
  );
}
