import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { db } from "./db";
import { UserType } from "./type";

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 week from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getUser() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  const { user } = await decrypt(session);
  return user;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // 刷新 session 以確保不會過期
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export const checkUser = async (user: UserType) => {
  const userExist = await db.user.findUnique({
    where: {
      name: user.name,
    },
  });

  if (userExist) return;

  await db.user.create({
    data: {
      ...user,
    },
  });
};

export const getUserBlogRepo = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      name: username,
    },
  });

  if (!user || !user.blog_repo) return "";
  return user.blog_repo;
};
