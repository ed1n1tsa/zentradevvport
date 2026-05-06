import { NextResponse } from "next/server";

import { createServerSupabaseAdminClient } from "@/lib/supabase-server";
import { assertAdminAuthenticated } from "./_auth";

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

export async function POST(request: Request) {
  const authenticated = await assertAdminAuthenticated(request);
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured." },
      { status: 500 },
    );
  }

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
  if (!title.ru || !title.kk || !title.en) {
    return NextResponse.json(
      { error: "Title is required for all locales." },
      { status: 400 },
    );
  }
  if (!excerpt.ru || !excerpt.kk || !excerpt.en) {
    return NextResponse.json(
      { error: "Excerpt is required for all locales." },
      { status: 400 },
    );
  }
  if (!description.ru || !description.kk || !description.en) {
    return NextResponse.json(
      { error: "Description is required for all locales." },
      { status: 400 },
    );
  }
  if (!reviewTitle.ru || !reviewTitle.kk || !reviewTitle.en) {
    return NextResponse.json(
      { error: "Review title is required for all locales." },
      { status: 400 },
    );
  }
  if (!reviewText.ru || !reviewText.kk || !reviewText.en) {
    return NextResponse.json(
      { error: "Review text is required for all locales." },
      { status: 400 },
    );
  }
  if (!reviewAuthor.ru || !reviewAuthor.kk || !reviewAuthor.en) {
    return NextResponse.json(
      { error: "Review author is required for all locales." },
      { status: 400 },
    );
  }

  const coverFile = formData.get("cover_image");
  if (!(coverFile instanceof File) || coverFile.size === 0) {
    return NextResponse.json(
      { error: "Cover image is required." },
      { status: 400 },
    );
  }

  const coverExt = coverFile.name.split(".").pop()?.toLowerCase() || "jpg";
  const coverPath = `projects/${slug}/cover-${Date.now()}.${coverExt}`;
  const coverBytes = new Uint8Array(await coverFile.arrayBuffer());

  const { error: coverUploadError } = await supabase.storage
    .from("project-media")
    .upload(coverPath, coverBytes, {
      contentType: coverFile.type || "image/jpeg",
      upsert: true,
    });

  if (coverUploadError) {
    return NextResponse.json(
      { error: `Cover upload failed: ${coverUploadError.message}` },
      { status: 400 },
    );
  }

  const { data: coverPublic } = supabase.storage
    .from("project-media")
    .getPublicUrl(coverPath);

  const { data: projectRow, error: insertProjectError } = await supabase
    .from("projects")
    .insert({
      slug,
      category_id: categoryId,
      project_year: projectYear,
      title,
      excerpt,
      description,
      story:
        story.ru || story.kk || story.en
          ? story
          : null,
      review_title: reviewTitle,
      review_text: reviewText,
      review_author: reviewAuthor,
      is_published: isPublished,
      cover_image_url: coverPublic.publicUrl,
    })
    .select("id")
    .single();

  if (insertProjectError || !projectRow) {
    return NextResponse.json(
      { error: insertProjectError?.message ?? "Failed to create project." },
      { status: 400 },
    );
  }

  const techItems = parseTech(techRaw);
  if (techItems.length > 0) {
    const techRows = techItems.map((name, idx) => ({
      project_id: projectRow.id,
      name,
      sort_order: idx + 1,
    }));
    const { error: techError } = await supabase.from("project_tech").insert(techRows);
    if (techError) {
      return NextResponse.json(
        { error: `Project created, but tech save failed: ${techError.message}` },
        { status: 400 },
      );
    }
  }

  const galleryFiles = formData
    .getAll("gallery_images")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (galleryFiles.length > 0) {
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

      const { data: publicData } = supabase.storage
        .from("project-media")
        .getPublicUrl(path);

      galleryRows.push({
        project_id: projectRow.id,
        image_url: publicData.publicUrl,
        caption: {
          ru: `${title.ru} — экран ${i + 1}`,
          kk: `${title.kk} — экран ${i + 1}`,
          en: `${title.en} — screen ${i + 1}`,
        },
        sort_order: i + 1,
      });
    }

    const { error: galleryError } = await supabase
      .from("project_gallery")
      .insert(galleryRows);

    if (galleryError) {
      return NextResponse.json(
        { error: `Project created, but gallery save failed: ${galleryError.message}` },
        { status: 400 },
      );
    }
  }

  const projectFiles = formData
    .getAll("project_files")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (projectFiles.length > 0) {
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
          { error: `File upload failed: ${fileUploadError.message}` },
          { status: 400 },
        );
      }

      const { data: publicData } = supabase.storage
        .from("project-media")
        .getPublicUrl(path);

      fileRows.push({
        project_id: projectRow.id,
        file_url: publicData.publicUrl,
        storage_path: path,
        title: buildFileTitle(file.name),
        sort_order: i + 1,
      });
    }

    const { error: fileError } = await supabase.from("project_files").insert(fileRows);
    if (fileError) {
      return NextResponse.json(
        { error: `Project created, but files save failed: ${fileError.message}` },
        { status: 400 },
      );
    }
  }

  return NextResponse.json({ ok: true, id: projectRow.id });
}
