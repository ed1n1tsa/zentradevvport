import { NextResponse } from "next/server";

import { createServerSupabaseAdminClient } from "@/lib/supabase-server";
import { assertAdminAuthenticated } from "../../../_auth";

function pathFromPublicUrl(url: string) {
  const marker = "/storage/v1/object/public/project-media/";
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}

export async function DELETE(
  request: Request,
  {
    params,
  }: { params: Promise<{ id: string; galleryId: string }> },
) {
  const authenticated = await assertAdminAuthenticated(request);
  if (!authenticated) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServerSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 });
  }

  const { id, galleryId } = await params;

  const { data: row, error: fetchError } = await supabase
    .from("project_gallery")
    .select("id,image_url,project_id")
    .eq("id", galleryId)
    .eq("project_id", id)
    .single();

  if (fetchError || !row) {
    return NextResponse.json({ error: "Gallery item not found." }, { status: 404 });
  }

  const { error: deleteError } = await supabase
    .from("project_gallery")
    .delete()
    .eq("id", galleryId)
    .eq("project_id", id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 400 });
  }

  const path = pathFromPublicUrl(row.image_url);
  if (path) {
    await supabase.storage.from("project-media").remove([path]);
  }

  return NextResponse.json({ ok: true });
}
