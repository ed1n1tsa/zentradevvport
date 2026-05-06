"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { CategoryFilter, type CategoryFilterValue } from "@/components/CategoryFilter";
import { ProjectCard } from "@/components/ProjectCard";
import type { AppLocale, ProjectItem } from "@/lib/data";

interface ProjectsPageClientProps {
  locale: AppLocale;
  emptyLabel: string;
  initialCategory: CategoryFilterValue;
  projects: ProjectItem[];
}

export function ProjectsPageClient({
  locale,
  emptyLabel,
  initialCategory,
  projects,
}: ProjectsPageClientProps) {
  const t = useTranslations("Projects");
  const [category, setCategory] = useState<CategoryFilterValue>(initialCategory);

  const list = useMemo(
    () => (category === "all" ? projects : projects.filter((p) => p.category === category)),
    [category, projects],
  );

  return (
    <>
      <div className="mt-10">
        <div className="mb-3 text-xs font-medium uppercase tracking-wide text-primary/60">
          {t("filterLabel")}
        </div>
        <CategoryFilter
          locale={locale}
          value={category}
          onChange={setCategory}
          allLabel={t("all")}
        />
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <ProjectCard key={p.slug} project={p} locale={locale} index={i} />
        ))}
      </div>

      {list.length === 0 ? (
        <p className="mt-8 text-sm text-primary/55">{emptyLabel}</p>
      ) : null}
    </>
  );
}
