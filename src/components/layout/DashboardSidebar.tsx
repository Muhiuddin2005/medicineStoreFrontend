import Link from "next/link";
import { LayoutDashboard, PlusCircle, Package, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  role: string;
}

export function DashboardSidebar({ role }: SidebarProps) {
  return (
    <aside className="w-64 border-r bg-muted/20 min-h-[calc(100vh-4rem)] flex flex-col p-4">
      <div className="mb-8 px-4">
        <h2 className="text-lg font-bold tracking-tight">Portal</h2>
        <p className="text-sm text-muted-foreground capitalize">{role.toLowerCase()} Account</p>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {/* Everyone gets a main dashboard link */}
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start gap-3">
            <LayoutDashboard className="h-4 w-4" />
            My Dashboard
          </Button>
        </Link>

        {/* Seller Specific Links */}
        {(role === "SELLER" || role === "ADMIN") && (
          <>
            <div className="mt-4 mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Seller Tools
            </div>
            <Link href="/seller/add-medicine">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <PlusCircle className="h-4 w-4" />
                Add Medicine
              </Button>
            </Link>
            <Link href="/seller/orders">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Package className="h-4 w-4" />
                Manage Orders
              </Button>
            </Link>
          </>
        )}

        {/* Admin Specific Links (Placeholder for next steps) */}
        {role === "ADMIN" && (
          <>
            <div className="mt-4 mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Admin Tools
            </div>
            <Link href="/admin/users">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Users className="h-4 w-4" />
                Manage Users
              </Button>
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}