"use client";

import Link from "next/link";
import { Home, LayoutDashboard, Menu, Moon, Package, PlusCircle, Settings, ShoppingBag, Sun, SunMoon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useState, type ComponentType } from "react";
import { useTheme } from "next-themes";
import { ROLES, type Role } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  role: Role;
}

type NavLink = { href: string; label: string; icon: ComponentType<{ className?: string }> };

export function DashboardSidebar({ role }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const commonLinks: NavLink[] = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/profile", label: "Profile", icon: Settings },
    { href: "/", label: "Home", icon: Home },
    { href: "/shop", label: "Shop", icon: ShoppingBag },
  ];

  const sellerLinks: NavLink[] = [
    { href: "/seller/add-medicine", label: "Add Medicine", icon: PlusCircle },
    { href: "/seller/orders", label: "Seller Orders", icon: Package },
    { href: "/seller/inventory", label: "Inventory", icon: Package },
  ];

  const adminLinks: NavLink[] = [
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/orders", label: "Orders", icon: Package },
    { href: "/admin/medicines", label: "Medicines", icon: Package },
    { href: "/admin/categories", label: "Categories", icon: LayoutDashboard },
  ];

  const roleLinks = role === ROLES.ADMIN ? adminLinks : role === ROLES.SELLER ? sellerLinks : [];

  const renderLinkGroup = (links: NavLink[]) => (
    <div className="space-y-1">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <Button 
              variant={isActive ? "secondary" : "ghost"} 
              className={`w-full justify-start gap-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? "bg-primary/10 text-primary font-bold shadow-xs border border-primary/20 hover:bg-primary/15" 
                  : "hover:bg-muted/60"
              }`}
            >
              <link.icon className={`h-4 w-4 ${isActive ? "text-primary scale-110" : "text-muted-foreground group-hover:text-foreground"}`} />
              {link.label}
            </Button>
          </Link>
        );
      })}
    </div>
  );

  const renderNavLinks = () => (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="mb-6 px-3 py-4 rounded-2xl bg-gradient-to-r from-primary/10 via-blue-500/5 to-transparent border border-primary/10">
          <h2 className="text-lg font-black tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">MediStore</h2>
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1">{role.toLowerCase()} Account</p>
        </div>

        <nav className="flex flex-col gap-6">
          {renderLinkGroup(commonLinks)}
          {roleLinks.length > 0 && (
            <div className="space-y-3">
              <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Role Routes</p>
              {renderLinkGroup(roleLinks)}
            </div>
          )}
        </nav>
      </div>

      <div className="pt-4 border-t border-border/50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start gap-3 rounded-xl hover:bg-muted/80 transition-colors">
              <SunMoon className="h-4 w-4 text-primary" />
              Theme Appearance
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 rounded-xl shadow-xl border-border/60">
            <DropdownMenuLabel className="font-semibold text-xs text-muted-foreground">Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
              <DropdownMenuRadioItem value="light" className="rounded-lg gap-2">
                <Sun className="h-4 w-4 text-yellow-500" />
                Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark" className="rounded-lg gap-2">
                <Moon className="h-4 w-4 text-blue-500" />
                Dark
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="system" className="rounded-lg gap-2">
                <SunMoon className="h-4 w-4 text-purple-500" />
                System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex w-72 border-r bg-background/90 min-h-[calc(100vh-4rem)] flex-col p-4">
        {renderNavLinks()}
      </aside>

      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" className="h-12 w-12 rounded-full shadow-2xl bg-gradient-to-tr from-primary to-blue-600 hover:from-primary/95 hover:to-blue-700 text-white transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center border border-primary/20">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[340px] p-6 flex flex-col bg-background/95 backdrop-blur-md border-r border-border/40 rounded-r-3xl">
            <SheetTitle className="sr-only">Dashboard Menu</SheetTitle>
            <SheetDescription className="sr-only">Navigation links for dashboard management</SheetDescription>
            {renderNavLinks()}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}