import { NextResponse } from "next/server";

import { createServerSupabaseAdminClient } from "@/lib/supabase-server";
import { assertAdminAuthenticated } from "../_auth";

const ALLOWED_CATEGORIES = new Set([
  "web",
  "mobile",
  "telegram",
  "ai",
  "ecommerce",
  "cabinet",
]);

function buildLocalized(
  ru: FormDataEntryValue | null,
  kk: FormDataEntryValue | null,
  en: FormDataEntryValue | null,
) {
  return {
    ru: String(ru ?? "").trim(),
    kk: String(kk ?? "").trim(),
    en: String(en ?? "").trim(),
  };
}

function parseTech(raw: string) {
  return raw
    .split(/\r?\n|,/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildFileTitle(fileName: string) {
  const base = fileName.replace(/\.[^/.]+$/, "").trim() || "Документ";
  return {
    ru: base,
    kk: base,
    en: base,
  };
}

function pathFromPublicUrl(url: string) {
  const marker = "/storage/v1/object/public/project-media/";
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authenticated = await assertAdminAuthenticated(request);
  if (!authenticated) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServerSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 });
  }

  const { id } = await params;
  const formData = await request.formData();

  const slug = String(formData.get("slug") ?? "").trim();
  const categoryId = String(formData.get("category_id") ?? "").trim();
  const projectYear = Number(formData.get("project_year") ?? 0);
  const isPublished = String(formData.get("is_published") ?? "true") === "true";
  const techRaw = String(formData.get("tech") ?? "");

  const title = buildLocalized(
    formData.get("title_ru"),
    formData.get("title_kk"),
    formData.get("title_en"),
  );
  const excerpt = buildLocalized(
    formData.get("excerpt_ru"),
    formData.get("excerpt_kk"),
    formData.get("excerpt_en"),
  );
  const description = buildLocalized(
    formData.get("description_ru"),
    formData.get("description_kk"),
    formData.get("description_en"),
  );
  const story = buildLocalized(
    formData.get("story_ru"),
    formData.get("story_kk"),
    formData.get("story_en"),
  );
  const reviewTitle = buildLocalized(
    formData.get("review_title_ru"),
    formData.get("review_title_kk"),
    formData.get("review_title_en"),
  );
  const reviewText = buildLocalized(
    formData.get("review_text_ru"),
    formData.get("review_text_kk"),
    formData.get("review_text_en"),
  );
  const reviewAuthor = buildLocalized(
    formData.get("review_author_ru"),
    formData.get("review_author_kk"),
    formData.get("review_author_en"),
  );

  if (!slug || !ALLOWED_CATEGORIES.has(categoryId) || !projectYear) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const updatePayload: Record<string, unknown> = {
    slug,
    category_id: categoryId,
    project_year: projectYear,
    title,
    excerpt,
    description,
    story: story.ru || story.kk || story.en ? story : null,
    review_title: reviewTitle,
    review_text: reviewText,
    review_author: reviewAuthor,
    is_published: isPublished,
  };

  const coverFile = formData.get("cover_image");
  if (coverFile instanceof File && coverFile.size > 0) {
    const coverExt = coverFile.name.split(".").pop()?.toLowerCase() || "jpg";
    const coverPath = `projects/${slug}/cover-${Date.now()}.${coverExt}`;
    const coverBytes = new Uint8Array(await coverFile.arrayBuffer());
    const { error: uploadError } = await supabase.storage
      .from("project-media")
      .upload(coverPath, coverBytes, {
        contentType: coverFile.type || "image/jpeg",
        upsert: true,
      });
    if (uploadError) {
      return NextResponse.json(
        { error: `Cover upload failed: ${uploadError.message}` },
        { status: 400 },
      );
    }
    const { data } = supabase.storage.from("project-media").getPublicUrl(coverPath);
    updatePayload.cover_image_url = data.publicUrl;
  }

  const { error: projectUpdateError } = await supabase
    .from("projects")
    .update(updatePayload)
    .eq("id", id);

  if (projectUpdateError) {
    return NextResponse.json({ error: projectUpdateError.message }, { status: 400 });
  }

  await supabase.from("project_tech").delete().eq("project_id", id);
  const techItems = parseTech(techRaw);
  if (techItems.length > 0) {
    const techRows = techItems.map((name, idx) => ({
      project_id: id,
      name,
      sort_order: idx + 1,
    }));
    const { error: techError } = await supabase.from("project_tech").insert(techRows);
    if (techError) {
      return NextResponse.json(
        { error: `Project updated, but tech save failed: ${techError.message}` },
        { status: 400 },
      );
    }
  }

  const galleryFiles = formData
    .getAll("gallery_images")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (galleryFiles.length > 0) {
    const { count } = await supabase
      .from("project_gallery")
      .select("id", { count: "exact", head: true })
      .eq("project_id", id);
    let sortOrder = (count ?? 0) + 1;

    const galleryRows: Array<{
      project_id: string;
      image_url: string;
      caption: { ru: string; kk: string; en: string };
      sort_order: number;
    }> = [];

    for (let i = 0; i < galleryFiles.length; i += 1) {
      const file = galleryFiles[i];
      const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `projects/${slug}/gallery-${Date.now()}-${i + 1}.${ext}`;
      const bytes = new Uint8Array(await file.arrayBuffer());

      const { error: galleryUploadError } = await supabase.storage
        .from("project-media")
        .upload(path, bytes, {
          contentType: file.type || "image/jpeg",
          upsert: true,
        });
      if (galleryUploadError) {
        return NextResponse.json(
          { error: `Gallery upload failed: ${galleryUploadError.message}` },
          { status: 400 },
        );
      }

      const { data } = supabase.storage.from("project-media").getPublicUrl(path);
      galleryRows.push({
        project_id: id,
        image_url: data.publicUrl,
        caption: {
          ru: `${title.ru} — экран ${sortOrder}`,
          kk: `${title.kk} — экран ${sortOrder}`,
          en: `${title.en} — screen ${sortOrder}`,
        },
        sort_order: sortOrder,
      });
      sortOrder += 1;
    }

    const { error: galleryError } = await supabase
      .from("project_gallery")
      .insert(galleryRows);
    if (galleryError) {
      return NextResponse.json(
        { error: `Project updated, but gallery save failed: ${galleryError.message}` },
        { status: 400 },
      );
    }
  }

  const projectFiles = formData
    .getAll("project_files")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (projectFiles.length > 0) {
    const { count } = await supabase
      .from("project_files")
      .select("id", { count: "exact", head: true })
      .eq("project_id", id);
    let sortOrder = (count ?? 0) + 1;

    const fileRows: Array<{
      project_id: string;
      file_url: string;
      storage_path: string;
      title: { ru: string; kk: string; en: string };
      sort_order: number;
    }> = [];

    for (let i = 0; i < projectFiles.length; i += 1) {
      const file = projectFiles[i];
      const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
      const path = `projects/${slug}/files-${Date.now()}-${i + 1}.${ext}`;
      const bytes = new Uint8Array(await file.arrayBuffer());

      const { error: fileUploadError } = await supabase.storage
        .from("project-media")
        .upload(path, bytes, {
          contentType: file.type || "application/octet-stream",
          upsert: true,
        });
      if (fileUploadError) {
        return NextResponse.json(
          { error: `Files upload failed: ${fileUploadError.message}` },
          { status: 400 },
        );
      }

      const { data } = supabase.storage.from("project-media").getPublicUrl(path);
      fileRows.push({
        project_id: id,
        file_url: data.publicUrl,
        storage_path: path,
        title: buildFileTitle(file.name),
        sort_order: sortOrder,
      });
      sortOrder += 1;
    }

    const { error: fileInsertError } = await supabase
      .from("project_files")
      .insert(fileRows);
    if (fileInsertError) {
      return NextResponse.json(
        { error: `Project updated, but files save failed: ${fileInsertError.message}` },
        { status: 400 },
      );
    }
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const authenticated = await assertAdminAuthenticated(request);
  if (!authenticated) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = createServerSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 });
  }

  const { id } = await params;

  const { data: project } = await supabase
    .from("projects")
    .select("cover_image_url")
    .eq("id", id)
    .single();
  const { data: gallery } = await supabase
    .from("project_gallery")
    .select("image_url")
    .eq("project_id", id);
  const { data: files } = await supabase
    .from("project_files")
    .select("file_url,storage_path")
    .eq("project_id", id);

  const pathsToDelete: string[] = [];
  if (project?.cover_image_url) {
    const coverPath = pathFromPublicUrl(project.cover_image_url);
    if (coverPath) pathsToDelete.push(coverPath);
  }
  for (const row of gallery ?? []) {
    const path = pathFromPublicUrl(row.image_url);
    if (path) pathsToDelete.push(path);
  }
  for (const row of files ?? []) {
    const path = row.storage_path || pathFromPublicUrl(row.file_url);
    if (path) pathsToDelete.push(path);
  }

  const { error: deleteError } = await supabase.from("projects").delete().eq("id", id);
  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 400 });
  }

  if (pathsToDelete.length > 0) {
    await supabase.storage.from("project-media").remove(pathsToDelete);
  }

  return NextResponse.json({ ok: true });
}
