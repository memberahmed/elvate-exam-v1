import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Base Api Url
  const baseUrl = process.env.API;
  // Search params from request
  const { searchParams } = new URL(req.url);
  // Exam Params
  const exam = searchParams.get("exam");
  //  Jwt token
  const token = await getToken({ req });
  // Full api Url
  const endpoint = `${baseUrl}/questions?exam=${exam}`;
  const response = await fetch(endpoint, {
    headers: {
      token: token?.accessToken || "",
    },
  });
  const payload: ApiResponse<PaginatedResponse<Question[]>> =
    await response.json();

  return NextResponse.json(payload, { status: response.status });
}
