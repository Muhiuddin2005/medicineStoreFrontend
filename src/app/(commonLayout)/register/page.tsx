"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";


const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["CUSTOMER", "SELLER"]),
});

export default function RegisterPage() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CUSTOMER" as "CUSTOMER" | "SELLER",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating account...");
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        console.log("Registration Data:", value);
        toast.success("Account created successfully!", { id: toastId });
        router.push("/login");
      } catch (err: unknown) {
        toast.error((err as { message?: string }).message || "Registration failed", { id: toastId });
      }
    },
  });

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Join MediStore as a Customer or Seller</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              id="register-form"
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                
                {/* Name Field */}
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

                {/* Email Field */}
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

                {/* Password Field */}
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
                        <Input
                          type="password"
                          id={field.name}
                          name={field.name}
                          placeholder="••••••••"
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

                {/* Role Selection Dropdown */}
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
                        <FieldLabel htmlFor={field.name}>Account Type</FieldLabel>
                        <select
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            field.handleChange(e.target.value as "CUSTOMER" | "SELLER")
                          }
                          className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="CUSTOMER" className="text-foreground bg-background">
                            Customer
                          </option>
                          <option value="SELLER" className="text-foreground bg-background">
                            Seller
                          </option>
                        </select>
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

              </FieldGroup>
            </form>
            
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login here
              </Link>
            </p>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-5 justify-end">
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
  );
}