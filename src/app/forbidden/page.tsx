import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Siren, Home } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-background">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
        <Siren className="h-32 w-32 text-red-600 animate-pulse relative z-10" />
      </div>
      
      <h1 className="text-5xl font-extrabold tracking-tight text-foreground mb-4">
        ACCESS DENIED
      </h1>
      <p className="text-xl text-muted-foreground max-w-md mb-8">
        Police have blocked your path! You are attempting to enter a restricted security zone. 
        Please step back to the home page immediately.
      </p>

      <Link href="/">
        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8">
          <Home className="mr-2 h-5 w-5" />
          Back to Safety
        </Button>
      </Link>
    </div>
  );
}
