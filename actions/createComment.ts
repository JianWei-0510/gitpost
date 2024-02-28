"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";

interface ResponseType {
  success: boolean;
  message: string;
  newPostPath?: string;
}

export const createComment = async (
  comment: string,
  comments_url: string,
  revalidate_path: string
) => {
  try {
    const user = await getUser();

    if (!user)
      return {
        success: false,
        message: "You have not login yet!",
      } as ResponseType;

    const blogUser = await db.user.findUnique({
      where: {
        name: user.name,
      },
    });

    if (!blogUser || !blogUser.blog_repo)
      return {
        success: false,
        message: "You haven't choose your blog repository",
      } as ResponseType;

    await axios.post(
      comments_url,
      {
        body: comment,
      },
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return { success: false, message: error } as ResponseType;
  }

  revalidatePath(revalidate_path, "layout");
  return {
    success: true,
    message: "Comment success",
  } as ResponseType;
};
