"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";

interface ResponseType {
  success: boolean;
  message: string;
  redirectPath?: string;
}

export const deletePost = async (formData: FormData) => {
  let redirectPath = "/";

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

    const url = formData.get("url") as string;

    const { data: post } = await axios.patch(
      url,
      {
        state: "close",
      },
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      }
    );

    redirectPath = `/${post.user.login}`;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error,
    } as ResponseType;
  }

  revalidatePath("/");
  return {
    success: true,
    message: "Delete success",
    redirectPath,
  } as ResponseType;
};
