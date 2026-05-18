"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createMedicineAction } from "../../../../../actions/medicine";
import { getCategoriesAction } from "../../../../../actions/category";
import { Category } from "@/types";
import imageCompression from "browser-image-compression";

const medicineSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Provide a detailed description"),
  price: z.number().min(1, "Price must be greater than 0"),
  stock: z.number().min(1, "Stock must be at least 1"),
  manufacturer: z.string().min(2, "Manufacturer is required"),
  categoryId: z.number().min(1, "Please select a category"),
  image: z.custom<File | null>((val) => val instanceof File, { message: "Product image is required" }),
});

const getErrorMessage = (err: unknown): string => {
  if (typeof err === "string") return err;
  if (err && typeof err === "object" && "message" in err) {
    return String((err as { message: unknown }).message);
  }
  return String(err);
};

export default function AddMedicinePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCats, setIsLoadingCats] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      const res = await getCategoriesAction();
      if (res.success) {
        setCategories(res.data);
      } else {
        toast.error("Failed to load categories");
      }
      setIsLoadingCats(false);
    }
    loadCategories();
  }, []);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "" as unknown as number,
      stock: "" as unknown as number,
      manufacturer: "",
      categoryId: "" as unknown as number,
      image: null as File | null,
    },
    validators: {
      onChange: medicineSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Adding medicine to database...");
      
      const formData = new FormData();
      formData.append("name", value.name);
      formData.append("description", value.description);
      formData.append("price", String(value.price));
      formData.append("stock", String(value.stock));
      formData.append("manufacturer", value.manufacturer);
      formData.append("categoryId", String(value.categoryId));
      if (value.image) {
        try {
          const options = {
            maxSizeMB: 0.8,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
          };
          toast.loading("Compressing product image...", { id: toastId });
          const compressedFile = await imageCompression(value.image, options);
          formData.append("image", compressedFile, value.image.name);
        } catch (error) {
          toast.error("Failed to compress image.", { id: toastId });
          return;
        }
      }

      const result = await createMedicineAction(formData);

      if (result.error) {
        toast.error(result.error, { id: toastId });
      } else {
        toast.success("Medicine added successfully!", { id: toastId });
        form.reset();
        router.push("/seller/inventory");
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
              
              const val = form.state.values;
              const hasEmptyFields = !val.name || !val.description || !val.price || !val.stock || !val.manufacturer || !val.categoryId || !val.image;
              
              if (!form.state.isValid || hasEmptyFields) {
                toast.error("Please fill out all required fields with valid details.", {
                  position: "bottom-center",
                });
              }
            }}
          >
            <FieldGroup>
              
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
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors.map((err) => ({
                            message: getErrorMessage(err),
                          }))}
                        />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="description">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Description</FieldLabel>
                      <Textarea
                        placeholder="Describe uses and side effects..."
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="resize-none"
                        rows={3}
                      />
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors.map((err) => ({
                            message: getErrorMessage(err),
                          }))}
                        />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <div className="grid grid-cols-2 gap-4">
                <form.Field name="price">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Price (৳)</FieldLabel>
                        <Input
                          type="number"
                          placeholder="Enter Price"
                          value={field.state.value || ""}
                          onChange={(e) =>
                            field.handleChange(
                              e.target.value === "" ? ("" as unknown as number) : Number(e.target.value)
                            )
                          }
                        />
                        {isInvalid && (
                          <FieldError
                            errors={field.state.meta.errors.map((err) => ({
                              message: getErrorMessage(err),
                            }))}
                          />
                        )}
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
                          placeholder="Enter Stock"
                          value={field.state.value || ""}
                          onChange={(e) =>
                            field.handleChange(
                              e.target.value === "" ? ("" as unknown as number) : Number(e.target.value)
                            )
                          }
                        />
                        {isInvalid && (
                          <FieldError
                            errors={field.state.meta.errors.map((err) => ({
                              message: getErrorMessage(err),
                            }))}
                          />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                        {isInvalid && (
                          <FieldError
                            errors={field.state.meta.errors.map((err) => ({
                              message: getErrorMessage(err),
                            }))}
                          />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>

                <form.Field name="categoryId">
                  {(field) => {
                    const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel>Category</FieldLabel>
                        <Select
                          disabled={isLoadingCats}
                          value={field.state.value ? String(field.state.value) : undefined}
                          onValueChange={(val) => field.handleChange(Number(val))}
                        >
                          <SelectTrigger className="w-full h-9">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={String(cat.id)}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError
                            errors={field.state.meta.errors.map((err) => ({
                              message: getErrorMessage(err),
                            }))}
                          />
                        )}
                      </Field>
                    );
                  }}
                </form.Field>
              </div>

              <form.Field name="image">
                {(field) => {
                  const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Product Image (Optional)</FieldLabel>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.handleChange(e.target.files?.[0] || null)}
                      />
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors.map((err) => ({
                            message: getErrorMessage(err),
                          }))}
                        />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <form.Subscribe selector={(state) => [state.isSubmitting]}>
            {([isSubmitting]) => (
              <Button
                form="add-medicine-form"
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Uploading Image & Adding..." : "Add Medicine"}
              </Button>
            )}
          </form.Subscribe>
        </CardFooter>
      </Card>
    </div>
  );
}