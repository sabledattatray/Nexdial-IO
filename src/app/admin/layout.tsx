import { redirect } from "next/navigation";
import { getAuthenticatedSession } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthenticatedSession();

  // Protect the entire /admin path
  if (!session || !session.user || (session.user as any).role !== "ADMIN") {
    redirect("/crm"); // Redirect non-admins to their CRM dashboard
  }

  return (
    <div className="bg-[#081120] min-h-screen flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 min-h-screen">
        {children}
      </div>
    </div>
  );
}
