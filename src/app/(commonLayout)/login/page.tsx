"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { loginAction } from "../../../../actions/auth";
import { Eye, EyeOff } from "lucide-react";
import AuthSidebar from "@/components/layout/AuthSidebar";


const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Minimum length is 6"),
});

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const reason = searchParams.get("reason");
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (reason === "confirm-order") {
      toast.info("Log in to confirm your order.");
    }
  }, [reason]);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setSubmitError("");
      const toastId = toast.loading("Logging in...");
      const result = await loginAction(value);
      
      if (result.error) {
        setSubmitError(result.error);
        toast.dismiss(toastId);
        return;
      }

      toast.success("Logged in successfully!", { id: toastId });
      router.refresh(); 
      router.push(redirectTo);
    },
  });

  return (
    <div className="flex min-h-[85vh] w-full items-center justify-center p-4 sm:p-6 md:p-10 lg:p-14">
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl overflow-hidden border border-border/40 bg-card/60 backdrop-blur-xl shadow-2xl min-h-[600px] lg:min-h-[700px]">
        {/* Left Side: Animated Hero Sidebar */}
        <AuthSidebar />

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-sm">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="text-center p-0 pb-6">
                <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back</CardTitle>
                <CardDescription>Login to your MediStore account</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <form
                  id="login-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                  }}
                >
                  <FieldGroup>
                    <form.Field
                      name="email"
                      validators={{
                        onChange: ({ value }) => {
                          const res = loginSchema.shape.email.safeParse(value);
                          return res.success ? undefined : res.error.issues[0].message;
                        },
                      }}
                    >
                      {(field) => {
                        const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                            <Input
                              type="email"
                              id={field.name}
                              name={field.name}
                              placeholder="you@example.com"
                              value={field.state.value}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value)}
                            />
                            {isInvalid && (
                              <FieldError
                                errors={field.state.meta.errors.map((err) => ({
                                  message: (err as { message?: string })?.message ?? String(err),
                                }))}
                              />
                            )}
                          </Field>
                        );
                      }}
                    </form.Field>

                    <form.Field
                      name="password"
                      validators={{
                        onChange: ({ value }) => {
                          const res = loginSchema.shape.password.safeParse(value);
                          return res.success ? undefined : res.error.issues[0].message;
                        },
                      }}
                    >
                      {(field) => {
                        const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                id={field.name}
                                name={field.name}
                                placeholder="••••••••"
                                value={field.state.value}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value)}
                                className="pr-10"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60 hover:text-foreground transition-colors cursor-pointer"
                              >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                            {isInvalid && (
                              <FieldError
                                errors={field.state.meta.errors.map((err) => ({
                                  message: (err as { message?: string })?.message ?? String(err),
                                }))}
                              />
                            )}
                          </Field>
                        );
                      }}
                    </form.Field>

                    {submitError && (
                      <div className="p-3 text-xs bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl font-medium flex items-center gap-2 mt-2">
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        {submitError}
                      </div>
                    )}
                  </FieldGroup>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-6">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-primary hover:underline font-semibold">
                    Register
                  </Link>
                </p>
              </CardContent>

              <CardFooter className="flex flex-col gap-5 justify-end p-0 pt-6">
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Button
                      form="login-form"
                      type="submit"
                      className="w-full"
                      disabled={!canSubmit || isSubmitting}
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                  )}
                </form.Subscribe>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}