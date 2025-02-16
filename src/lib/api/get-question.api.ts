"use server";

import { cookies } from "next/headers";
import { AUTHCOOKIES } from "../constants/token-cookies.constant";
import { decode } from "next-auth/jwt";

export async function fetchQuestion(endPoint: string) {
  const baseUrl = process.env.API;

  // Cookies token from next auth
  const tokenCookies = cookies().get(AUTHCOOKIES)?.value;

  // Jwt decode token
  const decodedToken = await decode({
    token: tokenCookies,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const response = await fetch(baseUrl + endPoint, {
    headers: {
      token: decodedToken?.accessToken || "",
    },
  });

  const payload: ApiResponse<PaginatedResponse<Question[]>> =
    await response.json();

  return payload;
}
