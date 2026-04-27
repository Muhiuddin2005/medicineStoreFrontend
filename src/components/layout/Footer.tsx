import { Pill } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <Pill className="h-5 w-5 text-primary" />
              MediStore
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted online medicine shop. Quality OTC medicines delivered to your door.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/shop" className="hover:text-foreground transition-colors">Shop Medicines</Link>
              <Link href="/login" className="hover:text-foreground transition-colors">Login</Link>
              <Link href="/register" className="hover:text-foreground transition-colors">Register</Link>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Email: support@medistore.com</p>
              <p>Phone: +880-1234-567890</p>
              <p>Cash on Delivery Only</p>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} MediStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}