import { FolderGit2, Inbox, UserRound, Wrench } from "lucide-react";

import { createServerSupabaseAdminClient } from "@/lib/supabase-server";

import ru from "@/messages/ru.json";

const copy = ru.Admin;

const statConfig = [
  { statKey: "projects" as const, labelKey: "projects" as const, icon: FolderGit2 },
  { statKey: "requests" as const, labelKey: "requests" as const, icon: Inbox },
  {
    statKey: "activeClients" as const,
    labelKey: "clients" as const,
    icon: UserRound,
  },
  { statKey: "inProgress" as const, labelKey: "inProgress" as const, icon: Wrench },
] as const;

export default async function AdminDashboardPage() {
  const supabase = createServerSupabaseAdminClient();

  let projectsCount = 0;
  let requestsCount = 0;
  let activeClients = 0;
  let inProgress = 0;
  let loadError = "";

  if (!supabase) {
    loadError =
      "Supabase не подключен. Проверьте NEXT_PUBLIC_SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY в .env.local";
  } else {
    const [{ count: pCount, error: pErr }, { count: rCount, error: rErr }, { count: ipCount, error: ipErr }] =
      await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("lead_requests").select("id", { count: "exact", head: true }),
        supabase
          .from("lead_requests")
          .select("id", { count: "exact", head: true })
          .eq("status", "in_review"),
      ]);

    if (pErr || rErr || ipErr) {
      loadError = pErr?.message || rErr?.message || ipErr?.message || "Ошибка загрузки.";
    } else {
      projectsCount = pCount ?? 0;
      requestsCount = rCount ?? 0;
      inProgress = ipCount ?? 0;
      activeClients = projectsCount;
    }
  }

  const s = {
    projects: projectsCount,
    requests: requestsCount,
    activeClients,
    inProgress,
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-primary sm:text-3xl">
        {copy.nav.dashboard}
      </h1>
      <p className="mt-2 text-sm text-primary/60">
        {loadError
          ? `Ошибка загрузки данных: ${loadError}`
          : "Статистика загружена из базы данных Supabase."}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statConfig.map((item) => {
          const Icon = item.icon;
          const value = s[item.statKey];
          const label = copy.stats[item.labelKey];
          return (
            <div
              key={item.statKey}
              className="glass-panel flex items-center gap-4 rounded-2xl bg-white p-5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/12">
                <Icon className="size-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-primary">{value}</div>
                <div className="text-sm text-primary/60">{label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
