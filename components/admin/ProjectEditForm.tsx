"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GalleryItemDeleteButton } from "@/components/admin/GalleryItemDeleteButton";
import { ProjectFileDeleteButton } from "@/components/admin/ProjectFileDeleteButton";

const categories = [
  { id: "web", label: "Веб-сайты" },
  { id: "mobile", label: "Мобильные приложения" },
  { id: "telegram", label: "Telegram-боты" },
  { id: "ai", label: "AI-ассистенты" },
  { id: "ecommerce", label: "Интернет-магазины" },
  { id: "cabinet", label: "Windows приложения" },
];

type Localized = { ru: string; kk: string; en: string };

export interface ProjectEditInitial {
  id: string;
  slug: string;
  category_id: string;
  project_year: number;
  is_published: boolean;
  title: Localized;
  excerpt: Localized;
  description: Localized;
  story: Localized;
  review_title: Localized;
  review_text: Localized;
  review_author: Localized;
  cover_image_url: string | null;
  tech: string[];
  gallery: Array<{ id: string; image_url: string }>;
  files: Array<{ id: string; file_url: string; file_name: string }>;
}

interface ProjectEditFormProps {
  initial: ProjectEditInitial;
}

export function ProjectEditForm({ initial }: ProjectEditFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setError("");
    setSuccess("");

    const formData = new FormData(form);
    const response = await fetch(`/api/admin/projects/${initial.id}`, {
      method: "PATCH",
      body: formData,
    });
    const payload = (await response.json().catch(() => null)) as
      | { error?: string; ok?: boolean }
      | null;

    if (!response.ok) {
      setError(payload?.error ?? "Не удалось обновить проект.");
      setSubmitting(false);
      return;
    }

    setSuccess("Проект обновлён.");
    setSubmitting(false);
    router.refresh();
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <section className="glass-panel rounded-2xl bg-white p-6">
        <h2 className="text-lg font-semibold text-primary">Основное</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" required defaultValue={initial.slug} className="border-primary/20 !bg-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="project_year">Год</Label>
            <Input id="project_year" name="project_year" type="number" min={2000} max={2100} defaultValue={initial.project_year} required className="border-primary/20 !bg-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category_id">Категория</Label>
            <select id="category_id" name="category_id" required className="h-10 w-full rounded-lg border border-primary/20 bg-white px-3 text-sm text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" defaultValue={initial.category_id}>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="is_published">Статус</Label>
            <select id="is_published" name="is_published" className="h-10 w-full rounded-lg border border-primary/20 bg-white px-3 text-sm text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" defaultValue={String(initial.is_published)}>
              <option value="true">Опубликован</option>
              <option value="false">Черновик</option>
            </select>
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-2xl bg-white p-6">
        <h2 className="text-lg font-semibold text-primary">Локализация</h2>
        <div className="mt-4 grid gap-4">
          {(["ru", "kk", "en"] as const).map((locale) => (
            <div key={locale} className="rounded-xl border border-primary/15 p-4">
              <p className="text-sm font-semibold uppercase text-primary/70">{locale}</p>
              <div className="mt-3 grid gap-3">
                <Input name={`title_${locale}`} required defaultValue={initial.title[locale]} placeholder={`Название (${locale.toUpperCase()})`} className="border-primary/20 !bg-white" />
                <Input name={`excerpt_${locale}`} required defaultValue={initial.excerpt[locale]} placeholder={`Краткое описание (${locale.toUpperCase()})`} className="border-primary/20 !bg-white" />
                <Textarea name={`description_${locale}`} required rows={4} defaultValue={initial.description[locale]} placeholder={`Полное описание (${locale.toUpperCase()})`} className="border-primary/20 !bg-white" />
                <Textarea name={`story_${locale}`} rows={3} defaultValue={initial.story[locale]} placeholder={`История проекта (${locale.toUpperCase()}) — опционально`} className="border-primary/20 !bg-white" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-2xl bg-white p-6">
        <h2 className="text-lg font-semibold text-primary">Отзыв клиента</h2>
        <div className="mt-4 grid gap-4">
          {(["ru", "kk", "en"] as const).map((locale) => (
            <div key={`review-${locale}`} className="rounded-xl border border-primary/15 p-4">
              <p className="text-sm font-semibold uppercase text-primary/70">{locale}</p>
              <div className="mt-3 grid gap-3">
                <Input name={`review_title_${locale}`} required defaultValue={initial.review_title[locale]} placeholder={`Заголовок отзыва (${locale.toUpperCase()})`} className="border-primary/20 !bg-white" />
                <Textarea name={`review_text_${locale}`} required rows={3} defaultValue={initial.review_text[locale]} placeholder={`Текст отзыва (${locale.toUpperCase()})`} className="border-primary/20 !bg-white" />
                <Input name={`review_author_${locale}`} required defaultValue={initial.review_author[locale]} placeholder={`Автор отзыва (${locale.toUpperCase()})`} className="border-primary/20 !bg-white" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-2xl bg-white p-6">
        <h2 className="text-lg font-semibold text-primary">Технологии и изображения</h2>
        <div className="mt-4 grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="tech">Стек (через запятую или с новой строки)</Label>
            <Textarea id="tech" name="tech" rows={3} defaultValue={initial.tech.join(", ")} className="border-primary/20 !bg-white" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover_image">Новая обложка (опционально)</Label>
            <Input id="cover_image" name="cover_image" type="file" accept="image/*" className="border-primary/20 !bg-white file:text-primary" />
            {initial.cover_image_url ? (
              <Image
                src={initial.cover_image_url}
                alt="cover"
                width={240}
                height={96}
                className="mt-2 h-24 w-auto rounded-lg border border-primary/15 object-cover"
              />
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gallery_images">Добавить в галерею</Label>
            <Input id="gallery_images" name="gallery_images" type="file" accept="image/*" multiple className="border-primary/20 !bg-white file:text-primary" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project_files">Добавить файлы проекта (PDF, DOCX и т.д.)</Label>
            <Input
              id="project_files"
              name="project_files"
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip"
              className="border-primary/20 !bg-white file:text-primary"
            />
          </div>
        </div>
      </section>

      {initial.gallery.length > 0 ? (
        <section className="glass-panel rounded-2xl bg-white p-6">
          <h2 className="text-lg font-semibold text-primary">Текущая галерея</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {initial.gallery.map((item) => (
              <div key={item.id} className="rounded-xl border border-primary/15 p-3">
                <Image
                  src={item.image_url}
                  alt=""
                  width={640}
                  height={360}
                  className="h-36 w-full rounded-lg object-cover"
                />
                <div className="mt-2 flex justify-end">
                  <GalleryItemDeleteButton projectId={initial.id} galleryId={item.id} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {initial.files.length > 0 ? (
        <section className="glass-panel rounded-2xl bg-white p-6">
          <h2 className="text-lg font-semibold text-primary">Текущие файлы</h2>
          <div className="mt-4 space-y-2">
            {initial.files.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-primary/15 px-3 py-2"
              >
                <a
                  href={item.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {item.file_name}
                </a>
                <ProjectFileDeleteButton projectId={initial.id} fileId={item.id} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      {success ? <p className="text-sm text-emerald-500">{success}</p> : null}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={submitting} className="accent-gradient text-white">
          {submitting ? "Сохраняем..." : "Сохранить изменения"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/projects")}>
          Назад к проектам
        </Button>
      </div>
    </form>
  );
}
