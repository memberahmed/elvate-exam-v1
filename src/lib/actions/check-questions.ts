"use server";

import { cookies } from "next/headers";
import { AUTHCOOKIES } from "../constants/token-cookies.constant";
import { decode } from "next-auth/jwt";
import { JSON_HEADER } from "../constants/api.contstans";

export async function checkQustion(anwesers: any) {
  const tokenCookies = cookies().get(AUTHCOOKIES)?.value;
  const token = await decode({ token: tokenCookies, secret: process.env.NEXTAUTH_SECRET! });
  const accessToken = token?.accessToken;
  const baseUrl = process.env.API;
  const response = await fetch(baseUrl + "/questions/check", {
    method: "POST",
    body: JSON.stringify(anwesers),
    headers: {
      ...JSON_HEADER,
      token: accessToken || "",
    },
  });
  const payload = await response.json();
  return payload;
}
