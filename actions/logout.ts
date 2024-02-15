"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  // 註銷 session
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/");

}
