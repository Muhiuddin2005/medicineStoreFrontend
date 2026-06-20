"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateProfileAction } from "../../../../../actions/profile";
import { User, Lock, Settings, Eye, EyeOff } from "lucide-react";
import gsap from "gsap";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    tl.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8 },
      "-=0.5"
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name && !password) {
      toast.error("Please enter a new name or password to update.");
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password && !passwordRegex.test(password)) {
      setError("Password must be at least 8 characters, containing uppercase, lowercase, number, and special character (@$!%*?&)");
      return;
    }
    setError("");
    setIsSubmitting(true);
    const toastId = toast.loading("Updating profile...");
    
    const result = await updateProfileAction({ name, password });
    
    if (result.error) {
      setError(result.error);
      toast.dismiss(toastId);
    } else {
      toast.success("Profile updated successfully!", { id: toastId });
      setName("");
      setPassword("");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div ref={containerRef} className="mb-8 opacity-0">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent flex items-center gap-3">
          <Settings className="h-9 h-9 text-primary animate-spin-[20s]" />
          Account Settings
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">Manage your account details and update credentials.</p>
      </div>

      <div ref={cardRef} className="opacity-0">
        <Card className="border border-border/40 bg-card/60 backdrop-blur-md shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-border/40 pb-5">
            <CardTitle className="text-xl font-bold tracking-tight">Update Profile</CardTitle>
            <CardDescription className="text-sm">Leave fields blank if you do not wish to change them.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground/80 tracking-wide block">New Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
                  <Input 
                    placeholder="Enter new name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="pl-11 h-12 rounded-xl bg-background/50 border-border/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground/80 tracking-wide block">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60" />
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password} 
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }} 
                    className={`pl-11 pr-10 h-12 rounded-xl bg-background/50 focus:ring-1 focus:ring-primary/25 transition-all ${
                      error ? "border-red-500 focus:border-red-500" : "border-border/60 focus:border-primary/50"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60 hover:text-foreground transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {error && (
                  <p className="text-xs text-red-500 mt-1.5 font-semibold pl-1">
                    {error}
                  </p>
                )}
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full relative overflow-hidden h-12 rounded-full font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                {isSubmitting ? "Saving Changes..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
