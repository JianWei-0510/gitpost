"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { checkUser, encrypt } from "@/lib/auth";

export const login = async (code: string) => {
  console.log(code);
  let redirectPath = "/";
  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          accept: "application/json",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    const { data: userResponseData } = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { data: emailResponseData } = await axios.get(
      "https://api.github.com/user/emails",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const user = {
      name: userResponseData.login,
      email: emailResponseData[0].email,
      avatar_url: userResponseData.avatar_url,
      access_token,
    };

    await checkUser({
      name: user.name,
      email: user.email,
      avatar_url: user.avatar_url,
    });

    // 建立 session
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ user, expires });

    // 將 session 儲存在 cookie
    cookies().set("session", session, { expires, httpOnly: true });
    redirectPath = `/${user.name}`;
  } catch (error) {
    console.log(error);
  }
  redirect(redirectPath);
};
