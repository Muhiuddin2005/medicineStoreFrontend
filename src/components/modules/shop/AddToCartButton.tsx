"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/CartProvider";
import { Medicine } from "@/types";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  medicine: Medicine;
  variant?: "default" | "outline" | "lg";
}

export function AddToCartButton({ medicine, variant = "default" }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  if (variant === "lg") {
    return (
      <Button 
        size="lg" 
        className="w-full md:w-auto gap-2" 
        onClick={() => addToCart(medicine)}
        disabled={medicine.stock === 0}
      >
        <ShoppingCart className="h-5 w-5" />
        Add to Cart
      </Button>
    );
  }

  return (
    <Button 
      size="sm" 
      onClick={() => addToCart(medicine)}
      disabled={medicine.stock === 0}
    >
      Add to Cart
    </Button>
  );
}