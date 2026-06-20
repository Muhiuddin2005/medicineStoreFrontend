"use client";

import Link from "next/link";
import { ShoppingCart, Pill, LogOut, LayoutDashboard, UserCircle, Home, ShoppingBag, UserPlus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useCart } from "@/providers/CartProvider";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getSessionAction, logoutAction } from "../../../actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ROLES } from "@/types";

interface NavbarProps {
  initialUser: { id: number; email: string; role: (typeof ROLES)[keyof typeof ROLES] } | null;
}

export function Navbar({ initialUser }: NavbarProps) {
  const { totalItems } = useCart();
  const [user, setUser] = useState<{ id: number; email: string; role: (typeof ROLES)[keyof typeof ROLES] } | null>(initialUser);
  const router = useRouter();

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const handleLogout = async () => {
    await logoutAction();
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
          <Pill className="h-6 w-6 text-primary animate-pulse" />
          <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">MediStore</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/cart" className="relative mr-2 group">
            <Button variant="ghost" size="icon" className="group-hover:bg-primary/10 transition-colors">
              <ShoppingCart className="h-5 w-5 group-hover:text-primary transition-colors" />
            </Button>
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] animate-in zoom-in">
                {totalItems}
              </Badge>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link href={user.role === ROLES.ADMIN ? "/admin/users" : user.role === ROLES.SELLER ? "/seller/inventory" : "/dashboard"}>
                <Button variant="outline" size="sm" className="gap-2 hover:bg-primary hover:text-white transition-all">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 animate-in fade-in slide-in-from-right-4">
              <Link href="/login"><Button variant="ghost" size="sm" className="hover:bg-primary/10">Login</Button></Link>
              <Link href="/register"><Button size="sm" className="shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">Register</Button></Link>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center gap-2">
          <Link href="/cart" className="relative mr-2">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">{totalItems}</Badge>
            )}
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon"><UserCircle className="h-6 w-6" /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] p-6 flex flex-col justify-between bg-background/95 backdrop-blur-md border-l border-border/40 rounded-l-3xl">
              <div>
                <div className="flex items-center gap-2 pb-6 border-b border-border/50">
                  <Pill className="h-6 w-6 text-primary animate-pulse" />
                  <span className="font-black text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">MediStore</span>
                </div>
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <SheetDescription className="sr-only">Mobile navigation links and account settings</SheetDescription>
                
                <nav className="flex flex-col gap-2 mt-6">
                  <Link href="/" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/60 transition-all">
                    <Home className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Home</span>
                  </Link>
                  
                  <Link href="/shop" className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/60 transition-all">
                    <ShoppingBag className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Shop</span>
                  </Link>
                  
                  {user && (
                    <Link href={user.role === ROLES.ADMIN ? "/admin/users" : user.role === ROLES.SELLER ? "/seller/inventory" : "/dashboard"} className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/60 transition-all">
                      <LayoutDashboard className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Dashboard</span>
                    </Link>
                  )}
                </nav>
              </div>

              <div className="pt-6 border-t border-border/50">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-2 py-3 rounded-xl bg-muted/40">
                      <UserCircle className="h-10 w-10 text-primary" />
                      <div className="overflow-hidden">
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{user.role}</p>
                      </div>
                    </div>
                    <Button variant="destructive" className="w-full rounded-xl gap-2 shadow-xs hover:shadow-md transition-all" onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link href="/login" className="w-full">
                      <Button variant="outline" className="w-full rounded-xl gap-2 hover:bg-muted/80">
                        <LogIn className="h-4 w-4 text-primary" />
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" className="w-full">
                      <Button className="w-full rounded-xl gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/95 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all">
                        <UserPlus className="h-4 w-4" />
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}