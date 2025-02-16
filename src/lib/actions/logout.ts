"use server";

import { decode } from "next-auth/jwt";
import { AUTHCOOKIES } from "../constants/token-cookies.constant";
import { cookies } from "next/headers";
import { JSON_HEADER } from "../constants/api.contstans";

export async function userLogOut() {
  const baseUrl = process.env.API + "/auth/logout";
  // Coockies token from next auth
  const tokenCookies = cookies().get(AUTHCOOKIES)?.value;

  // method to decode the token to get the back end token
  const token = await decode({
    token: tokenCookies,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  const response = await fetch(baseUrl, {
    headers: {
      ...JSON_HEADER,
      token: token?.accessToken || "",
    },
  });
  const payload: ApiResponse<LogOutResponse> = await response.json();
  return payload;
}
