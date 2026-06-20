import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { getSessionAction, logoutAction } from "../../../actions/auth";
import { ROLES, type Role } from "@/types";
import { redirect } from "next/navigation";
import { DashboardBackground } from "@/components/layout/DashboardBackground";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionAction();
  const role = (session?.role as Role | undefined) || ROLES.CUSTOMER;
  const logout = async () => {
    "use server";
    await logoutAction();
    redirect("/login");
  };

  return (
    <div className="flex min-h-screen relative">
      <DashboardBackground />
      <DashboardSidebar role={role} />
      <div className="flex flex-1 flex-col z-10 bg-transparent">
        <header className="h-16 border-b px-4 flex items-center justify-end bg-background/50 backdrop-blur-md z-20">
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium hover:bg-accent transition-colors"
            >
              Logout
            </button>
          </form>
        </header>
        <main className="flex-1 z-10">{children}</main>
      </div>
    </div>
  );
}
