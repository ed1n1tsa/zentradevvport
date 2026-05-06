import { notFound } from "next/navigation";

import {
  ProjectEditForm,
  type ProjectEditInitial,
} from "@/components/admin/ProjectEditForm";
import { createServerSupabaseAdminClient } from "@/lib/supabase-server";

interface Localized {
  ru?: string;
  kk?: string;
  en?: string;
}

interface ProjectDbRow {
  id: string;
  slug: string;
  category_id: string;
  project_year: number;
  is_published: boolean;
  title: Localized | null;
  excerpt: Localized | null;
  description: Localized | null;
  story: Localized | null;
  review_title: Localized | null;
  review_text: Localized | null;
  review_author: Localized | null;
  cover_image_url: string | null;
}

function toLocalized(value: Localized | null) {
  return {
    ru: value?.ru ?? "",
    kk: value?.kk ?? "",
    en: value?.en ?? "",
  };
}

export default async function AdminProjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServerSupabaseAdminClient();
  if (!supabase) notFound();

  const [{ data: project, error: projectError }, { data: tech }, { data: gallery }, { data: files }] =
    await Promise.all([
      supabase
        .from("projects")
        .select(
          "id,slug,category_id,project_year,is_published,title,excerpt,description,story,review_title,review_text,review_author,cover_image_url",
        )
        .eq("id", id)
        .single(),
      supabase
        .from("project_tech")
        .select("name,sort_order")
        .eq("project_id", id)
        .order("sort_order", { ascending: true }),
      supabase
        .from("project_gallery")
        .select("id,image_url,sort_order")
        .eq("project_id", id)
        .order("sort_order", { ascending: true }),
      supabase
        .from("project_files")
        .select("id,file_url,sort_order")
        .eq("project_id", id)
        .order("sort_order", { ascending: true }),
    ]);

  if (projectError || !project) notFound();

  const p = project as ProjectDbRow;
  const initial: ProjectEditInitial = {
    id: p.id,
    slug: p.slug,
    category_id: p.category_id,
    project_year: p.project_year,
    is_published: p.is_published,
    title: toLocalized(p.title),
    excerpt: toLocalized(p.excerpt),
    description: toLocalized(p.description),
    story: toLocalized(p.story),
    review_title: toLocalized(p.review_title),
    review_text: toLocalized(p.review_text),
    review_author: toLocalized(p.review_author),
    cover_image_url: p.cover_image_url,
    tech: (tech ?? []).map((t: { name: string }) => t.name),
    gallery: (gallery ?? []).map((g: { id: string; image_url: string }) => ({ id: g.id, image_url: g.image_url })),
    files: (files ?? []).map((f: { id: string; file_url: string }) => ({
      id: f.id,
      file_url: f.file_url,
      file_name: f.file_url.split("/").pop() ?? "file",
    })),
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-primary sm:text-3xl">
        Редактировать проект
      </h1>
      <p className="mt-2 text-sm text-primary/65">
        Обновите контент, изображения и статус проекта.
      </p>

      <div className="mt-6">
        <ProjectEditForm initial={initial} />
      </div>
    </div>
  );
}
