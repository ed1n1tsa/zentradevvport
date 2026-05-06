"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  { id: "web", label: "Веб-сайты" },
  { id: "mobile", label: "Мобильные приложения" },
  { id: "telegram", label: "Telegram-боты" },
  { id: "ai", label: "AI-ассистенты" },
  { id: "ecommerce", label: "Интернет-магазины" },
  { id: "cabinet", label: "Windows приложения" },
];

export function ProjectCreateForm() {
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

    const response = await fetch("/api/admin/projects", {
      method: "POST",
      body: formData,
    });

    const payload = (await response.json().catch(() => null)) as
      | { error?: string; ok?: boolean }
      | null;

    if (!response.ok) {
      setError(payload?.error ?? "Не удалось создать проект.");
      setSubmitting(false);
      return;
    }

    setSuccess("Проект успешно создан.");
    form.reset();
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
            <Input
              id="slug"
              name="slug"
              required
              placeholder="my-project-slug"
              className="border-primary/20 !bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project_year">Год</Label>
            <Input
              id="project_year"
              name="project_year"
              type="number"
              min={2000}
              max={2100}
              defaultValue={new Date().getFullYear()}
              required
              className="border-primary/20 !bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category_id">Категория</Label>
            <select
              id="category_id"
              name="category_id"
              required
              className="h-10 w-full rounded-lg border border-primary/20 bg-white px-3 text-sm text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              defaultValue="web"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="is_published">Статус</Label>
            <select
              id="is_published"
              name="is_published"
              className="h-10 w-full rounded-lg border border-primary/20 bg-white px-3 text-sm text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              defaultValue="true"
            >
              <option value="true">Опубликован</option>
              <option value="false">Черновик</option>
            </select>
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-2xl bg-white p-6">
        <h2 className="text-lg font-semibold text-primary">Локализация</h2>
        <div className="mt-4 grid gap-4">
          {["ru", "kk", "en"].map((locale) => (
            <div key={locale} className="rounded-xl border border-primary/15 p-4">
              <p className="text-sm font-semibold uppercase text-primary/70">{locale}</p>
              <div className="mt-3 grid gap-3">
                <Input
                  name={`title_${locale}`}
                  required
                  placeholder={`Название (${locale.toUpperCase()})`}
                  className="border-primary/20 !bg-white"
                />
                <Input
                  name={`excerpt_${locale}`}
                  required
                  placeholder={`Краткое описание (${locale.toUpperCase()})`}
                  className="border-primary/20 !bg-white"
                />
                <Textarea
                  name={`description_${locale}`}
                  required
                  rows={4}
                  placeholder={`Полное описание (${locale.toUpperCase()})`}
                  className="border-primary/20 !bg-white"
                />
                <Textarea
                  name={`story_${locale}`}
                  rows={3}
                  placeholder={`История проекта (${locale.toUpperCase()}) — опционально`}
                  className="border-primary/20 !bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-2xl bg-white p-6">
        <h2 className="text-lg font-semibold text-primary">Отзыв клиента (для страницы проекта)</h2>
        <div className="mt-4 grid gap-4">
          {["ru", "kk", "en"].map((locale) => (
            <div key={`review-${locale}`} className="rounded-xl border border-primary/15 p-4">
              <p className="text-sm font-semibold uppercase text-primary/70">{locale}</p>
              <div className="mt-3 grid gap-3">
                <Input
                  name={`review_title_${locale}`}
                  required
                  placeholder={`Заголовок отзыва (${locale.toUpperCase()})`}
                  className="border-primary/20 !bg-white"
                />
                <Textarea
                  name={`review_text_${locale}`}
                  required
                  rows={3}
                  placeholder={`Текст отзыва (${locale.toUpperCase()})`}
                  className="border-primary/20 !bg-white"
                />
                <Input
                  name={`review_author_${locale}`}
                  required
                  placeholder={`Автор отзыва (${locale.toUpperCase()})`}
                  className="border-primary/20 !bg-white"
                />
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
            <Textarea
              id="tech"
              name="tech"
              rows={3}
              placeholder="Next.js, TypeScript, Supabase"
              className="border-primary/20 !bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover_image">Обложка проекта</Label>
            <Input
              id="cover_image"
              name="cover_image"
              type="file"
              accept="image/*"
              required
              className="border-primary/20 !bg-white file:text-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gallery_images">Галерея (можно несколько файлов)</Label>
            <Input
              id="gallery_images"
              name="gallery_images"
              type="file"
              accept="image/*"
              multiple
              className="border-primary/20 !bg-white file:text-primary"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project_files">Файлы проекта (PDF, DOCX и т.д.)</Label>
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

      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
      {success ? <p className="text-sm text-emerald-500">{success}</p> : null}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={submitting} className="accent-gradient text-white">
          {submitting ? "Сохраняем..." : "Создать проект"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/projects")}>
          Назад к проектам
        </Button>
      </div>
    </form>
  );
}
