"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, ShieldCheck } from "lucide-react";

const titleByPath: Record<string, string> = {
  "/admin/dashboard": "Панель управление",
  "/admin/projects": "Проекты",
  "/admin/requests": "Заявки",
};

export function AdminTopbar() {
  const pathname = usePathname();

  const title = useMemo(() => {
    for (const key of Object.keys(titleByPath)) {
      if (pathname === key || pathname.startsWith(`${key}/`)) {
        return titleByPath[key];
      }
    }
    return "Админ-панель";
  }, [pathname]);

  return (
    <header className="mb-6 flex items-center justify-between rounded-2xl border border-primary/15 bg-white/85 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-sm text-primary/75">
        <span>Admin</span>
        <ChevronRight className="size-4 text-primary/45" />
        <span className="font-semibold text-primary">{title}</span>
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-medium text-primary">
        <ShieldCheck className="size-3.5" />
        Authenticated
      </div>
    </header>
  );
}
