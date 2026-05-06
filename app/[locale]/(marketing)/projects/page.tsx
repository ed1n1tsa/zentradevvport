import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale, ProjectCategoryId } from "@/lib/data";
import { getPublishedProjects } from "@/lib/projects-db";
import { ProjectsPageClient } from "./ProjectsPageClient";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export default async function ProjectsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ProjectsPage" });
  const initialCategory =
    category &&
    ["web", "mobile", "telegram", "ai", "ecommerce", "cabinet"].includes(category)
      ? (category as ProjectCategoryId)
      : "all";
  const projects = await getPublishedProjects();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <section id="projects-intro" className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-primary/70">{t("subtitle")}</p>
      </section>

      <section id="projects-list" className="mt-10">
        <ProjectsPageClient
          locale={locale as AppLocale}
          emptyLabel={t("empty")}
          initialCategory={initialCategory}
          projects={projects}
        />
      </section>
    </div>
  );
}
