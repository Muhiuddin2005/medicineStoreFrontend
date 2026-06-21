"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { User, Store, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { registerAction } from "../../../../actions/auth";
import { ROLES } from "@/types";
import AuthSidebar from "@/components/layout/AuthSidebar";


const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters, containing uppercase, lowercase, number, and special character (@$!%*?&)"
    ),
  role: z.enum([ROLES.CUSTOMER, ROLES.SELLER]),
});

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSellerRegistration = searchParams.get("role")?.toLowerCase() === "seller";
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: isSellerRegistration ? ROLES.SELLER : ROLES.CUSTOMER,
    },
    onSubmit: async ({ value }) => {
      setSubmitError("");
      const toastId = toast.loading("Creating account...");
      const result = await registerAction(value);
      
      if (result.error) {
        setSubmitError(result.error);
        toast.dismiss(toastId);
        return;
      }

      toast.success("Account created successfully!", { id: toastId });
      router.refresh();
      router.push("/");
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
                <CardTitle className="text-2xl font-bold tracking-tight">Create Account</CardTitle>
                <CardDescription>
                  {isSellerRegistration ? "Create your seller account to start listing medicines." : "Join MediStore as a Customer or Seller"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <form
                  id="register-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                  }}
                >
                  <FieldGroup>
                    <form.Field
                      name="name"
                      validators={{
                        onChange: ({ value }) => {
                          const res = registerSchema.shape.name.safeParse(value);
                          return res.success ? undefined : res.error.issues[0].message;
                        },
                      }}
                    >
                      {(field) => {
                        const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                            <Input
                              id={field.name}
                              name={field.name}
                              placeholder="John Doe"
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
                      name="email"
                      validators={{
                        onChange: ({ value }) => {
                          const res = registerSchema.shape.email.safeParse(value);
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
                          const res = registerSchema.shape.password.safeParse(value);
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

                    <form.Field
                      name="role"
                      validators={{
                        onChange: ({ value }) => {
                          const res = registerSchema.shape.role.safeParse(value);
                          return res.success ? undefined : res.error.issues[0].message;
                        },
                      }}
                    >
                      {(field) => {
                        const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel>Account Type</FieldLabel>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                              <div
                                onClick={() => !isSellerRegistration && field.handleChange(ROLES.CUSTOMER)}
                                className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-4 transition-colors duration-300 ${
                                  field.state.value === ROLES.CUSTOMER
                                    ? "border-transparent bg-primary/5 text-primary"
                                    : "border-border/60 bg-transparent text-muted-foreground hover:border-primary/30 hover:bg-muted/50"
                                } ${isSellerRegistration ? "opacity-50 cursor-not-allowed" : "active:scale-[0.98]"}`}
                              >
                                <User className="mb-2 h-7 w-7" />
                                <span className="text-sm font-bold tracking-wide">Customer</span>
                                {field.state.value === ROLES.CUSTOMER && (
                                  <motion.div
                                    layoutId="activeRoleIndicator"
                                    className="absolute inset-0 rounded-xl border-2 border-primary shadow-[0_0_15px_rgba(37,99,235,0.15)]"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                  />
                                )}
                              </div>

                              <div
                                onClick={() => !isSellerRegistration && field.handleChange(ROLES.SELLER)}
                                className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 p-4 transition-colors duration-300 ${
                                  field.state.value === ROLES.SELLER
                                    ? "border-transparent bg-primary/5 text-primary"
                                    : "border-border/60 bg-transparent text-muted-foreground hover:border-primary/30 hover:bg-muted/50"
                                } ${isSellerRegistration ? "cursor-not-allowed" : "active:scale-[0.98]"}`}
                              >
                                <Store className="mb-2 h-7 w-7" />
                                <span className="text-sm font-bold tracking-wide">Seller</span>
                                {field.state.value === ROLES.SELLER && (
                                  <motion.div
                                    layoutId="activeRoleIndicator"
                                    className="absolute inset-0 rounded-xl border-2 border-primary shadow-[0_0_15px_rgba(37,99,235,0.15)]"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                  />
                                )}
                              </div>
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
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline font-semibold">
                    Login here
                  </Link>
                </p>
              </CardContent>

              <CardFooter className="flex flex-col gap-5 justify-end p-0 pt-6">
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Button
                      form="register-form"
                      type="submit"
                      className="w-full"
                      disabled={!canSubmit || isSubmitting}
                    >
                      {isSubmitting ? "Creating account..." : "Register"}
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