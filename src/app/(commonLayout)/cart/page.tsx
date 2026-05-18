"use client";
import React from "react";

import { useCart } from "@/providers/CartProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, setQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="flex justify-center">
          <ShoppingBag className="h-20 w-20 text-muted-foreground/20" />
        </div>
        <h1 className="text-3xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground">Looks like you haven&apos;t added any medicines yet.</p>
        <Link href="/shop">
          <Button size="lg">Browse Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({totalItems} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={item.medicine.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <Link href={`/shop/${item.medicine.id}`} className="flex items-center gap-4 flex-1 min-w-0 group">
                  <div className="h-20 w-20 bg-muted rounded-lg flex items-center justify-center shrink-0 group-hover:bg-muted/80 transition-colors">
                    <Pill className="h-8 w-8 text-muted-foreground/40 group-hover:scale-110 transition-transform" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">{item.medicine.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.medicine.category.name}</p>
                    <p className="font-bold text-primary mt-1">৳{item.medicine.price}</p>
                  </div>
                </Link>

                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded-md bg-background">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-r-none border-r shrink-0" 
                      onClick={() => updateQuantity(item.medicine.id, -1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <input 
                      type="number"
                      value={item.quantity}
                      min={1}
                      max={item.medicine.stock}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val)) {
                          setQuantity(item.medicine.id, val);
                        }
                      }}
                      className="w-12 text-center text-sm font-medium bg-transparent border-0 focus:ring-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-l-none border-l shrink-0" 
                      onClick={() => updateQuantity(item.medicine.id, 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeFromCart(item.medicine.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>৳{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-medium">Free (COD)</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">৳{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full mt-4 gap-2" size="lg">
                  Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <p className="text-[10px] text-muted-foreground text-center mt-4">
                * Prices are inclusive of all taxes. Delivery is via Cash on Delivery.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Pill(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
  );
}