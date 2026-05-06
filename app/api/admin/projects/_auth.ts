import { createClient } from "@supabase/supabase-js";

export async function assertAdminAuthenticated(request: Request) {
  const tokenCookie = request.headers.get("cookie") ?? "";
  const tokenMatch = tokenCookie.match(/zentra_admin_access_token=([^;]+)/);
  const token = tokenMatch?.[1];
  if (!token) return false;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return false;

  const authClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data, error } = await authClient.auth.getUser(token);
  return Boolean(data.user && !error);
}
