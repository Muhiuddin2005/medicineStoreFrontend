"use client";

import Link from "next/link";
import { ShoppingCart, LogOut, Menu, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export function Navbar() {
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
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
        </nav>

        {/* Desktop Auth / Cart (Mocked) */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Button variant="outline" size="sm">Dashboard</Button>
          ) : (
            <div className="flex gap-2">
              <Link href="/login"><Button variant="ghost" size="sm">Login</Button></Link>
              <Link href="/register"><Button size="sm">Register</Button></Link>
            </div>
          )}
        </div>

        {/* Mobile Nav (Sheet) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/" className="text-lg font-medium">Home</Link>
              <Link href="/shop" className="text-lg font-medium">Shop</Link>
              <Link href="/login" className="text-lg font-medium">Login</Link>
              <Link href="/register" className="text-lg font-medium">Register</Link>
            </nav>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  );
}