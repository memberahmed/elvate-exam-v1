import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Base API Url
  const baseUrl = process.env.API;
  // search params
  const { searchParams } = new URL(req.url);
  // Page number
  const page = searchParams.get("page");
  // Jwt token
  const token = await getToken({ req });
  const endpoint = `${baseUrl}/subjects?limit=3&page=${page}`;
  const response = await fetch(endpoint, {
    headers: {
      token: token?.accessToken || "",
    },
  });
  const payload: ApiResponse<PaginatedResponse<Subject[]>> =
    await response.json();

  return NextResponse.json(payload, { status: response.status });
}
