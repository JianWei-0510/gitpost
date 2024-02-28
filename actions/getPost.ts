"use server";

import axios from "axios";

export const getPost = async (user: any, page: number) => {
  const { data: posts } = await axios.get(
    `https://api.github.com/repos/${user?.name}/${user?.blog_repo}/issues?state=open&per_page=10&page=${page}`
  );

  const { data: repo } = await axios.get(
    `https://api.github.com/repos/${user?.name}/${user?.blog_repo}`
  );

  const postsCount = repo.open_issues_count;

  return { posts, postsCount };
};
