"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/CartProvider";
import { Medicine } from "@/types";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  medicine: Medicine;
  variant?: "default" | "outline" | "lg" | "sm";
}

export function AddToCartButton({ medicine, variant = "default" }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const isOutOfStock = medicine.stock === 0;
  const isLg = variant === "lg";
  const isSm = variant === "sm";

  if (isOutOfStock) {
    return (
      <Button 
        variant="destructive" 
        size={isLg ? "lg" : isSm ? "sm" : "default"} 
        disabled
        className={`
          cursor-not-allowed opacity-70
          ${isLg ? "h-14 px-8 text-lg w-full md:w-auto" : isSm ? "h-9 px-3 text-xs" : "h-11 px-5 text-base"}
        `}
      >
        Out of Stock
      </Button>
    );
  }

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(medicine);
  };

  return (
    <>
      <style>{`
        @keyframes breathe-glow {
          0%, 100% { transform: scale(1); box-shadow: 0 0 8px rgba(37,99,235,0.3); }
          50% { transform: scale(1.04); box-shadow: 0 0 18px rgba(37,99,235,0.6); }
        }
        .animate-breathe {
          animation: breathe-glow 2.5s infinite ease-in-out;
        }
      `}</style>

      <Button 
        size={isLg ? "lg" : isSm ? "sm" : "default"} 
        onClick={handleAdd}
        disabled={medicine.stock === 0}
        className={`
          relative overflow-hidden group border-0 transition-all duration-300
          bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-indigo-600 text-white
          
          ${isLg ? "h-14 px-8 text-lg w-full md:w-auto" : isSm ? "h-9 px-3.5 text-xs font-bold" : "h-11 px-5 text-base"}
          
          animate-breathe
          
          group-hover:![animation:none] 
          ${isSm ? "group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(37,99,235,0.6)]" : "group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(37,99,235,0.9)]"}
        `}
      >
        <span className="relative z-10 flex items-center gap-1.5 font-bold tracking-wide">
          <ShoppingCart className={`${isSm ? "h-3.5 w-3.5" : "h-5 w-5"} transition-transform duration-300 group-hover:animate-bounce`} />
          {medicine.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </span>
        
        <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-150%] skew-x-[30deg] group-hover:translate-x-[50%] transition-transform duration-500 ease-out z-0" />
      </Button>
    </>
  );
}