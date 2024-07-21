"use server";

import axios from "axios";

export const getPost = async (
  user: any,
  access_token: string,
  page: number
) => {
  if (!user?.blog_repo) return { posts: [], postsCount: 0 };

  const { data: posts } = await axios.get(
    `https://api.github.com/repos/${user?.name}/${user?.blog_repo}/issues?state=open&per_page=10&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const { data: repo } = await axios.get(
    `https://api.github.com/repos/${user?.name}/${user?.blog_repo}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const postsCount = repo.open_issues_count;

  return { posts, postsCount };
};
