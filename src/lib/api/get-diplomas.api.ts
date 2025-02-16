"use server";

import { cookies } from "next/headers";
import { AUTHCOOKIES } from "../constants/token-cookies.constant";
import { decode } from "next-auth/jwt";

export async function fetchSubjects(page: number) {
  const baseUrl = process.env.API;

  // Cookies token from next auth
  const tokenCookies = cookies().get(AUTHCOOKIES)?.value;

  //  Decode token
  const token = await decode({
    token: tokenCookies,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  const response = await fetch(
    baseUrl +
      `/subjects?page=${page}&limit=3
    `,
    {
      headers: {
        token: token?.accessToken || "",
      },
    }
  );
  const payload: ApiResponse<PaginatedResponse<Subject[]>> =
    await response.json();

  return payload;
}
