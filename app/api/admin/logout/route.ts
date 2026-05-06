import { NextResponse } from "next/server";

const ACCESS_COOKIE = "zentra_admin_access_token";
const REFRESH_COOKIE = "zentra_admin_refresh_token";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ACCESS_COOKIE);
  response.cookies.delete(REFRESH_COOKIE);
  return response;
}
