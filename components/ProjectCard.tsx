"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/lib/data";
import { getLocalized, type ProjectItem } from "@/lib/data";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectItem;
  locale: AppLocale;
  index?: number;
}

export function ProjectCard({ project, locale, index = 0 }: ProjectCardProps) {
  const title = getLocalized(project.title, locale);
  const excerpt = getLocalized(project.excerpt, locale);
  const detailsLabel =
    locale === "ru" ? "Подробнее" : locale === "kk" ? "Толығырақ" : "Learn more";

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group"
    >
      <article
        className={cn(
          "glass-panel relative mx-auto w-full max-w-[430px] overflow-hidden rounded-3xl border border-primary/15 bg-white",
          "transition duration-300 hover:-translate-y-0.5 hover:border-primary/35",
        )}
      >
        <Link href={`/projects/${project.slug}`} className="block">
          <div className="p-5 pb-0">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={project.image}
              alt={title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width:768px) 100vw, 33vw"
            />
            </div>
          </div>
        </Link>
        <div className="px-6 pb-6 pt-5">
          <div className="text-xs font-semibold text-primary/55">{project.year}</div>
          <h3 className="mt-1 text-xl font-semibold text-primary">{title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-primary/80">{excerpt}</p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90"
            >
              {detailsLabel}
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="my-4 h-px bg-primary/10" />
          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </motion.article>
  );
}
