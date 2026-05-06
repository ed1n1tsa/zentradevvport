import createMiddleware from "next-intl/middleware";
import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);
const ACCESS_COOKIE = "zentra_admin_access_token";

async function isValidAdminSession(request: NextRequest) {
  const token = request.cookies.get(ACCESS_COOKIE)?.value;
  if (!token) return false;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return false;

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return false;
  return true;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname.startsWith("/admin/login")) {
      return NextResponse.next();
    }

    const valid = await isValidAdminSession(request);
    if (!valid) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!api|_next|_vercel|client|.*\\..*).*)",
    "/([\\w-]+)?/users/(.+)",
  ],
};
