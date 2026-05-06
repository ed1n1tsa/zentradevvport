import { NextResponse } from "next/server";

import { createServerSupabaseAdminClient } from "@/lib/supabase-server";
import { assertAdminAuthenticated } from "../../../../_auth";

function pathFromPublicUrl(url: string) {
  const marker = "/storage/v1/object/public/project-media/";
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; fileId: string }> },
) {
  const authenticated = await assertAdminAuthenticated(request);
  if (!authenticated) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServerSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 });
  }

  const { id, fileId } = await params;

  const { data: row, error: fetchError } = await supabase
    .from("project_files")
    .select("id,file_url,storage_path,project_id")
    .eq("id", fileId)
    .eq("project_id", id)
    .single();
  if (fetchError || !row) {
    return NextResponse.json({ error: "File not found." }, { status: 404 });
  }

  const { error: deleteError } = await supabase
    .from("project_files")
    .delete()
    .eq("id", fileId)
    .eq("project_id", id);
  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 400 });
  }

  const path = row.storage_path || pathFromPublicUrl(row.file_url);
  if (path) {
    await supabase.storage.from("project-media").remove([path]);
  }

  return NextResponse.json({ ok: true });
}
