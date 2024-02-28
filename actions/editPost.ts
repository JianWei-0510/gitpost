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

export const editPost = async (title: string, body: string, url: string) => {
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

    if (!title || !body)
      return {
        success: false,
        message: "Missing post title or content",
      } as ResponseType;

    if (title && body && body.length < 30)
      return {
        success: false,
        message: "Post content must have at least 30 words",
      } as ResponseType;

    await axios.patch(
      url,
      {
        title,
        body,
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

  revalidatePath("/");
  return {
    success: true,
    message: "Edit success",
  } as ResponseType;
};
