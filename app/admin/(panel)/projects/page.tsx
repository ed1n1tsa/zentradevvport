import { Pencil, Plus } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createServerSupabaseAdminClient } from "@/lib/supabase-server";
import { ProjectDeleteButton } from "@/components/admin/ProjectDeleteButton";

import ru from "@/messages/ru.json";

const copy = ru.Admin;

const statusClass: Record<string, string> = {
  published: "border-emerald-500/45 bg-emerald-500/20 text-emerald-700 font-semibold",
  draft: "border-amber-500/45 bg-amber-500/20 text-amber-700 font-semibold",
};

interface AdminProjectDbRow {
  id: string;
  slug: string;
  project_year: number;
  title: { ru?: string; kk?: string; en?: string } | null;
  is_published: boolean;
  updated_at: string;
  category: {
    label?: { ru?: string; kk?: string; en?: string } | null;
  } | null;
}

function getRuLocalized(value: { ru?: string; kk?: string; en?: string } | null) {
  if (!value) return "—";
  return value.ru || value.kk || value.en || "—";
}

export default async function AdminProjectsPage() {
  const supabase = createServerSupabaseAdminClient();
  let rows: AdminProjectDbRow[] = [];
  let loadError = "";

  if (!supabase) {
    loadError =
      "Supabase не подключен. Проверьте NEXT_PUBLIC_SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY в .env.local";
  } else {
    const { data, error } = await supabase
      .from("projects")
      .select(
        "id,slug,project_year,title,is_published,updated_at,category:project_categories(label)",
      )
      .order("updated_at", { ascending: false });

    if (error) {
      loadError = error.message;
    } else {
      rows = (data ?? []) as AdminProjectDbRow[];
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-primary sm:text-3xl">
          {copy.projects.title}
        </h1>
        <Link
          href="/admin/projects/new"
          className={cn(buttonVariants(), "accent-gradient text-white")}
        >
          <Plus className="mr-2 size-4" />
          {copy.projects.add}
        </Link>
      </div>

      <div className="glass-panel mt-8 overflow-hidden rounded-2xl bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-primary/10 hover:bg-transparent">
              <TableHead className="text-primary/70">{copy.projects.name}</TableHead>
              <TableHead className="text-primary/70">Категория / Год</TableHead>
              <TableHead className="text-primary/70">{copy.projects.status}</TableHead>
              <TableHead className="text-primary/70">{copy.projects.updated}</TableHead>
              <TableHead className="text-right text-primary/70">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadError ? (
              <TableRow className="border-primary/10">
                <TableCell colSpan={5} className="py-6 text-sm text-rose-300">
                  Ошибка загрузки проектов: {loadError}
                </TableCell>
              </TableRow>
            ) : null}

            {!loadError && rows.length === 0 ? (
              <TableRow className="border-primary/10">
                <TableCell colSpan={5} className="py-6 text-sm text-primary/60">
                  Проекты пока не добавлены.
                </TableCell>
              </TableRow>
            ) : null}

            {rows.map((row) => {
              const status = row.is_published ? "published" : "draft";
              return (
                <TableRow key={row.id} className="border-primary/10">
                  <TableCell className="font-medium text-primary">
                    <div className="flex flex-col">
                      <span>{getRuLocalized(row.title)}</span>
                      <span className="text-xs text-primary/50">{row.slug}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-primary/75">
                    <div className="flex flex-col">
                      <span>{getRuLocalized(row.category?.label ?? null)}</span>
                      <span className="text-xs text-primary/50">{row.project_year}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusClass[status] ?? ""}>
                      {status === "published" ? "Опубликован" : "Черновик"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-primary/60">
                    {new Date(row.updated_at).toLocaleDateString("ru-RU")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/projects/${row.id}/edit`}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "sm" }),
                          "text-primary hover:bg-primary/10",
                        )}
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <ProjectDeleteButton
                        projectId={row.id}
                        projectName={getRuLocalized(row.title)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
