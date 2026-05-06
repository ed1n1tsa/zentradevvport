"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Inbox, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";

import ru from "@/messages/ru.json";

const copy = ru.Admin;

const items = [
  { href: "/admin/dashboard", label: copy.nav.dashboard, icon: LayoutDashboard },
  { href: "/admin/projects", label: copy.nav.projects, icon: FolderKanban },
  { href: "/admin/requests", label: copy.nav.requests, icon: Inbox },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function onLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
      setLoggingOut(false);
    }
  }

  return (
    <aside className="glass-panel flex h-full w-full max-w-[260px] flex-col border-primary/15 bg-white/90 p-4">
      <div className="mb-8 px-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary/55">
          ZENTRA
        </div>
        <div className="mt-1 text-lg font-semibold text-primary">{copy.brand}</div>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                active
                  ? "bg-primary/12 text-primary"
                  : "text-primary/75 hover:bg-primary/8 hover:text-primary",
              )}
            >
              <Icon className="size-4 opacity-80" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <button
        type="button"
        onClick={onLogout}
        disabled={loggingOut}
        className="mt-auto flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-primary/75 transition hover:bg-primary/8 hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
      >
        <LogOut className="size-4" />
        {loggingOut ? "Выходим..." : "Выйти"}
      </button>
    </aside>
  );
}
