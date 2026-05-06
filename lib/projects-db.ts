import type { ProjectCategoryId, ProjectItem } from "@/lib/data";
import { createServerSupabaseAdminClient } from "@/lib/supabase-server";

interface DbLocalized {
  ru?: string;
  kk?: string;
  en?: string;
}

interface ProjectRow {
  id: string;
  slug: string;
  category_id: ProjectCategoryId;
  project_year: number;
  title: DbLocalized | null;
  excerpt: DbLocalized | null;
  description: DbLocalized | null;
  cover_image_url: string | null;
}

interface TechRow {
  project_id: string;
  name: string;
}

interface ProjectIdRow {
  id: string;
}

interface GalleryRow {
  image_url: string;
}

interface FileRow {
  file_url: string;
}

function toLocalized(input: DbLocalized | null) {
  return {
    ru: input?.ru ?? "",
    kk: input?.kk ?? "",
    en: input?.en ?? "",
  };
}

export async function getPublishedProjects(): Promise<ProjectItem[]> {
  const supabase = createServerSupabaseAdminClient();
  if (!supabase) return [];

  const { data: projects, error } = await supabase
    .from("projects")
    .select("id,slug,category_id,project_year,title,excerpt,description,cover_image_url")
    .eq("is_published", true)
    .order("project_year", { ascending: false });

  if (error || !projects || projects.length === 0) return [];

  const typedProjects = projects as ProjectRow[];
  const projectIds = typedProjects.map((p) => p.id);

  const { data: techRows } = await supabase
    .from("project_tech")
    .select("project_id,name,sort_order")
    .in("project_id", projectIds)
    .order("sort_order", { ascending: true });

  const techByProject = new Map<string, string[]>();
  (techRows as TechRow[] | null)?.forEach((row) => {
    const bucket = techByProject.get(row.project_id) ?? [];
    bucket.push(row.name);
    techByProject.set(row.project_id, bucket);
  });

  return typedProjects.map((row) => ({
    slug: row.slug,
    category: row.category_id,
    year: String(row.project_year),
    tech: techByProject.get(row.id) ?? [],
    image: row.cover_image_url || "/globe.svg",
    title: toLocalized(row.title),
    excerpt: toLocalized(row.excerpt),
    description: toLocalized(row.description),
  }));
}

export async function getProjectGalleryBySlug(slug: string): Promise<string[]> {
  const supabase = createServerSupabaseAdminClient();
  if (!supabase) return [];

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (projectError || !project) return [];

  const projectId = (project as ProjectIdRow).id;
  const { data: galleryRows, error: galleryError } = await supabase
    .from("project_gallery")
    .select("image_url,sort_order")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });

  if (galleryError || !galleryRows) return [];
  return (galleryRows as GalleryRow[])
    .map((row) => row.image_url)
    .filter(Boolean);
}

export async function getProjectPdfBySlug(slug: string): Promise<string | null> {
  const supabase = createServerSupabaseAdminClient();
  if (!supabase) return null;

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (projectError || !project) return null;
  const projectId = (project as ProjectIdRow).id;

  const { data: fileRows, error: filesError } = await supabase
    .from("project_files")
    .select("file_url,sort_order")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });

  if (filesError || !fileRows) return null;

  const pdf = (fileRows as FileRow[]).find((row) =>
    /\.pdf(?:$|\?)/i.test(row.file_url),
  );
  return pdf?.file_url ?? null;
}
