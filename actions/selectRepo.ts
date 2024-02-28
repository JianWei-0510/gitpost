"use server";

import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const selectRepo = async (formData: FormData) => {
  const user = await getUser();

  if (!user) return;

  const blog_repo = formData.get("repoName") as string;

  await db.user.update({
    where: {
      name: user.name,
    },
    data: {
      blog_repo,
    },
  });

  redirect(`/${user.name}`);
};
