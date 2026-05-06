"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

import { CategoryFilter, type CategoryFilterValue } from "@/components/CategoryFilter";
import { ProjectCard } from "@/components/ProjectCard";
import { Link } from "@/i18n/navigation";
import type { AppLocale, ProjectItem } from "@/lib/data";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HomeProjectsSectionProps {
  projects: ProjectItem[];
}

export function HomeProjectsSection({ projects }: HomeProjectsSectionProps) {
  const t = useTranslations("Projects");
  const locale = useLocale() as AppLocale;
  const [category, setCategory] = useState<CategoryFilterValue>("all");

  const filtered = useMemo(
    () =>
      (category === "all"
        ? projects
        : projects.filter((project) => project.category === category)
      ).slice(0, 6),
    [category, projects],
  );

  return (
    <section id="works" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-primary/70">{t("subtitle")}</p>
        </div>
        <Link
          href="/projects"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-fit border-primary/35 bg-white text-primary hover:bg-primary/10",
          )}
        >
          {t("viewAll")}
        </Link>
      </div>

      <div className="mt-8">
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
        {filtered.map((p, i) => (
          <ProjectCard key={p.slug} project={p} locale={locale} index={i} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-8 text-sm text-primary/55">{t("empty")}</p>
      ) : null}
    </section>
  );
}
