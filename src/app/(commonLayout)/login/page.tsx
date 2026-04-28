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
import { loginAction } from "../../../../actions/auth";


const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Minimum length is 6"),
});

export default function LoginPage() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...");
      const result = await loginAction(value);
      
      if (result.error) {
        toast.error(result.error, { id: toastId });
        return;
      }

      toast.success("Logged in successfully!", { id: toastId });
      router.refresh(); 
      router.push("/");
    },
  });

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Login to your MediStore account</CardDescription>
          </CardHeader>
          <CardContent>
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

              </FieldGroup>
            </form>
            
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Register
              </Link>
            </p>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-5 justify-end">
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
  );
}