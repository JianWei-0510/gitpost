"use server";

import axios from "axios";

import { db } from "@/lib/db";
import { getUser } from "@/lib/auth";

interface ResponseType {
  success: boolean;
  message: string;
  newPostPath?: string;
}

export const createPost = async (title: string, body: string) => {
  let newPostPath = "";

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

    const { data: post } = await axios.post(
      `https://api.github.com/repos/${blogUser.name}/${blogUser.blog_repo}/issues`,
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

    if (post) newPostPath = `/${post.user.login}/${post.number}`;
  } catch (error) {
    console.log(error);
    return { success: false, message: error } as ResponseType;
  }

  return {
    success: true,
    message: "Create success",
    newPostPath,
  } as ResponseType;
};
