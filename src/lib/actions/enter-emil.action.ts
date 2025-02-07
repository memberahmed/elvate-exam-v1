"use server";

import { JSON_HEADER } from "../constants/api.contstans";

const baseUrl = process.env.API + "/auth/forgotPassword";

export default async function enterEmail(userData: EmailForm) {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
    },
    body: JSON.stringify(userData),
  });
  const payload: ApiResponse<ReceiveOtpRespone> = await response.json();

  return payload;
}
