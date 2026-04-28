"use client";

import Link from "next/link";
import { ShoppingCart, Menu, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/providers/CartProvider";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const { totalItems } = useCart();
  const user = null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Pill className="h-6 w-6 text-primary" />
          MediStore
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">Home</Link>
          <Link href="/shop" className="text-sm font-medium hover:text-primary">Shop</Link>
        </nav>

        {/* Desktop Auth / Cart */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart Icon with Badge */}
          <Link href="/cart" className="relative mr-2">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                {totalItems}
              </Badge>
            )}
          </Link>

          {user ? (
            <Button variant="outline" size="sm">Dashboard</Button>
          ) : (
            <div className="flex gap-2">
              <Link href="/login"><Button variant="ghost" size="sm">Login</Button></Link>
              <Link href="/register"><Button size="sm">Register</Button></Link>
            </div>
          )}
        </div>

        {/* Mobile Nav */}
        <Sheet>
          {/* ... Sheet Trigger ... */}
          <SheetContent side="right">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/cart" className="flex items-center justify-between">
                <span className="text-lg font-medium">Cart</span>
                {totalItems > 0 && <Badge>{totalItems}</Badge>}
              </Link>
              <Link href="/" className="text-lg font-medium">Home</Link>
              <Link href="/shop" className="text-lg font-medium">Shop</Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}