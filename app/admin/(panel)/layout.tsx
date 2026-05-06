import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopbar } from "@/components/AdminTopbar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mesh-bg flex min-h-screen">
      <div className="hidden w-[260px] shrink-0 border-r border-primary/15 md:block">
        <AdminSidebar />
      </div>
      <div className="min-w-0 flex-1 p-4 sm:p-8">
        <AdminTopbar />
        {children}
      </div>
    </div>
  );
}
