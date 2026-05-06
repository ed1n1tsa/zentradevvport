import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ACCESS_COOKIE = "zentra_admin_access_token";
const REFRESH_COOKIE = "zentra_admin_refresh_token";

export async function POST(request: Request) {
  try {
    const { email, password } = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Supabase environment variables are missing." },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      return NextResponse.json(
        { error: error?.message ?? "Invalid credentials." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ ok: true });
    const isProduction = process.env.NODE_ENV === "production";

    response.cookies.set(ACCESS_COOKIE, data.session.access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: data.session.expires_in ?? 3600,
    });

    response.cookies.set(REFRESH_COOKIE, data.session.refresh_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Unexpected error." }, { status: 500 });
  }
}
