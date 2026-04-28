"use client";

import { useForm } from "@tanstack/react-form";
import { useCart } from "@/providers/CartProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { createOrderAction } from "../../../../actions/order";

const checkoutSchema = z.object({
  shippingAddress: z
    .string()
    .min(10, "Please provide a detailed shipping address."),
});

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      shippingAddress: "",
    },
    validators: {
      onChange: checkoutSchema,
    },
    onSubmit: async ({ value }) => {
      if (cart.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      const toastId = toast.loading("Processing your order...");

      const orderPayload = {
        shippingAddress: value.shippingAddress,
        items: cart.map((item) => ({
          medicineId: item.medicine.id,
          quantity: item.quantity,
          price: item.medicine.price,
        })),
        totalPrice: totalPrice,
      };

      const result = await createOrderAction(orderPayload);

      if (result.error) {
        toast.error(result.error, { id: toastId });
      } else {
        toast.success("Order placed successfully!", { id: toastId });
        clearCart();
        router.push("/");
      }
    },
  });

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold">No items to checkout</h2>
        <Button onClick={() => router.push("/shop")}>Return to Shop</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Address Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                id="checkout-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
              >
                <FieldGroup>
                  <form.Field name="shippingAddress">
                    {(field) => {
                      const isInvalid =
                        field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel>Full Delivery Address</FieldLabel>
                          <Input
                            placeholder="House #, Road #, Area, City"
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          {isInvalid && (
                            <FieldError
                              errors={field.state.meta.errors.map((err) => ({
                                message:
                                  typeof err === "string"
                                    ? err
                                    : ((err as { message?: string }).message ??
                                      "Invalid input"),
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
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 text-sm">
              <p className="font-semibold text-primary">Cash on Delivery</p>
              <p className="text-muted-foreground">
                You will pay ৳{totalPrice} to the delivery person when you
                receive your medicines.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right: Order Review */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.medicine.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.medicine.name} x {item.quantity}
                </span>
                <span className="font-medium">
                  ৳{item.medicine.price * item.quantity}
                </span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">৳{totalPrice}</span>
            </div>
          </CardContent>
          <CardFooter>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  form="checkout-form"
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? "Placing Order..." : "Confirm Order"}
                </Button>
              )}
            </form.Subscribe>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
