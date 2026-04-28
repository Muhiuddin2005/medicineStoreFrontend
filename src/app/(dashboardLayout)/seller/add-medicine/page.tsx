"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { createMedicineAction } from "../../../../../actions/medicine";

const medicineSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Provide a detailed description"),
  price: z.number().min(1, "Price must be greater than 0"),
  stock: z.number().min(1, "Stock must be at least 1"),
  manufacturer: z.string().min(2, "Manufacturer is required"),
  categoryId: z.number().min(1, "Please select a category"),
});

export default function AddMedicinePage() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      manufacturer: "",
      categoryId: 1,
    },
    validators: {
      onChange: medicineSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Adding medicine to database...");

      const result = await createMedicineAction(value);

      if (result.error) {
        toast.error(result.error, { id: toastId });
      } else {
        toast.success("Medicine added successfully!", { id: toastId });
        form.reset();
        router.push("/shop");
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add New Medicine</CardTitle>
          <CardDescription>Enter the details to list a new product in your inventory.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="add-medicine-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              
              {/* Name Field */}
              <form.Field name="name">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Medicine Name</FieldLabel>
                      <Input
                        placeholder="e.g., Paracetamol 500mg"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors.map(err => ({ message: typeof err === 'string' ? err : (err as { message?: string })?.message }))} />}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Description Field */}
              <form.Field name="description">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Description</FieldLabel>
                      <Textarea
                        placeholder="Describe the uses and side effects..."
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="resize-none"
                        rows={3}
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors.map(err => ({ message: typeof err === 'string' ? err : (err as { message?: string })?.message }))} />}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Grid for Price and Stock */}
              <div className="grid grid-cols-2 gap-4">
                <form.Field name="price">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Price (৳)</FieldLabel>
                        <Input
                          type="number"
                          placeholder="0"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(Number(e.target.value))}
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors.map(err => ({ message: typeof err === 'string' ? err : (err as { message?: string })?.message }))} />}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="stock">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Initial Stock</FieldLabel>
                        <Input
                          type="number"
                          placeholder="0"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(Number(e.target.value))}
                        />
                        {isInvalid && <FieldError errors={field.state.meta.errors.map(err => ({ message: typeof err === 'string' ? err : (err as { message?: string })?.message }))} />}
                      </Field>
                    );
                  }}
                </form.Field>
              </div>

              {/* Manufacturer Field */}
              <form.Field name="manufacturer">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Manufacturer</FieldLabel>
                      <Input
                        placeholder="e.g., Square Pharmaceuticals"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && <FieldError errors={field.state.meta.errors.map(err => ({ message: typeof err === 'string' ? err : (err as { message?: string })?.message }))} />}
                    </Field>
                  );
                }}
              </form.Field>

            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                form="add-medicine-form"
                type="submit"
                className="w-full"
                disabled={!canSubmit || isSubmitting}
              >
                {isSubmitting ? "Adding to Database..." : "Add Medicine"}
              </Button>
            )}
          </form.Subscribe>
        </CardFooter>
      </Card>
    </div>
  );
}