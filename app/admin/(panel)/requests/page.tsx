import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createServerSupabaseAdminClient } from "@/lib/supabase-server";

import ru from "@/messages/ru.json";

const copy = ru.Admin;

const statusClass: Record<string, string> = {
  new: "border-sky-500/35 bg-sky-500/15 text-sky-700",
  in_review: "border-primary/35 bg-primary/15 text-primary",
  closed: "border-primary/25 bg-primary/10 text-primary/75",
};

interface LeadRequestRow {
  id: string;
  name: string;
  phone: string;
  project_type: string;
  status: "new" | "in_review" | "closed";
  created_at: string;
}

export default async function AdminRequestsPage() {
  const supabase = createServerSupabaseAdminClient();
  let rows: LeadRequestRow[] = [];
  let loadError = "";

  if (!supabase) {
    loadError =
      "Supabase не подключен. Проверьте NEXT_PUBLIC_SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY в .env.local";
  } else {
    const { data, error } = await supabase
      .from("lead_requests")
      .select("id,name,phone,project_type,status,created_at")
      .order("created_at", { ascending: false });

    if (error) {
      loadError = error.message;
    } else {
      rows = (data ?? []) as LeadRequestRow[];
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-primary sm:text-3xl">
        {copy.requests.title}
      </h1>

      <div className="glass-panel mt-8 overflow-hidden rounded-2xl bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-primary/10 hover:bg-transparent">
              <TableHead className="text-primary/70">{copy.requests.name}</TableHead>
              <TableHead className="text-primary/70">{copy.requests.phone}</TableHead>
              <TableHead className="text-primary/70">{copy.requests.type}</TableHead>
              <TableHead className="text-primary/70">{copy.requests.status}</TableHead>
              <TableHead className="text-primary/70">{copy.requests.date}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadError ? (
              <TableRow className="border-primary/10">
                <TableCell colSpan={5} className="py-6 text-sm text-rose-300">
                  Ошибка загрузки заявок: {loadError}
                </TableCell>
              </TableRow>
            ) : null}

            {!loadError && rows.length === 0 ? (
              <TableRow className="border-primary/10">
                <TableCell colSpan={5} className="py-6 text-sm text-primary/60">
                  Заявок пока нет.
                </TableCell>
              </TableRow>
            ) : null}

            {rows.map((row) => (
              <TableRow key={row.id} className="border-primary/10">
                <TableCell className="font-medium text-primary">{row.name}</TableCell>
                <TableCell className="text-primary/75">{row.phone}</TableCell>
                <TableCell className="text-primary/75">{row.project_type}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={statusClass[row.status] ?? ""}
                  >
                    {copy.status[row.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-primary/60">
                  {new Date(row.created_at).toLocaleDateString("ru-RU")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
