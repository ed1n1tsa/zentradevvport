import { ProjectCreateForm } from "@/components/admin/ProjectCreateForm";

export default function AdminProjectNewPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-primary sm:text-3xl">
        Добавить проект
      </h1>
      <p className="mt-2 text-sm text-primary/65">
        Заполните данные проекта, загрузите обложку и изображения галереи.
      </p>

      <div className="mt-6">
        <ProjectCreateForm />
      </div>
    </div>
  );
}
