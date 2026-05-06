import { ClientProjectStatus } from "@/components/ClientProjectStatus";
import { mockClientProject } from "@/lib/data";

import ru from "@/messages/ru.json";

const copy = ru.Client;

export default function ClientDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm text-white/55">{copy.note}</p>
      <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
        {mockClientProject.projectName}
      </h1>

      <div className="mt-10">
        <ClientProjectStatus data={mockClientProject} />
      </div>
    </div>
  );
}
