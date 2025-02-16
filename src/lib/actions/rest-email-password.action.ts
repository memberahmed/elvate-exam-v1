"use server";

import { JSON_HEADER } from "../constants/api.contstans";

export async function resetNewPassword(userData: ResetPasswordForm) {
  const baseUrl = process.env.API + "/auth/resetPassword";

  const response = await fetch(baseUrl, {
    method: "PUT",
    headers: {
      ...JSON_HEADER,
    },
    body: JSON.stringify(userData),
  });
  const payload: ResetPasswordResponse = await response.json();
  return payload;
}
