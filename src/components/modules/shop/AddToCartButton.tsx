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
        variant="outline" 
        size={isLg ? "lg" : isSm ? "sm" : "default"} 
        disabled
        className={`
          cursor-not-allowed border border-border bg-muted/20 text-muted-foreground opacity-60 rounded-full font-bold
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
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(37, 99, 235, 0.2), 0 0 2px rgba(37, 99, 235, 0.1); }
          50% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.5), 0 0 5px rgba(59, 130, 246, 0.3); }
        }
        .animate-premium-glow {
          animation: pulse-glow 3s infinite ease-in-out;
        }
      `}</style>

      <Button 
        size={isLg ? "lg" : isSm ? "sm" : "default"} 
        onClick={handleAdd}
        disabled={medicine.stock === 0}
        className={`
          relative overflow-hidden group border-0 rounded-full transition-all duration-300 font-bold
          bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white
          shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_12px_rgba(37,99,235,0.15)]
          
          ${isLg ? "h-14 px-8 text-lg w-full md:w-auto" : isSm ? "h-9.5 px-4.5 text-xs" : "h-11 px-6 text-base"}
          
          animate-premium-glow
          
          hover:scale-[1.04] hover:-translate-y-0.5
          hover:shadow-[0_8px_25px_rgba(79,70,229,0.45),inset_0_1px_0_rgba(255,255,255,0.3)]
          active:scale-[0.98] active:translate-y-0
        `}
      >
        <span className="relative z-10 flex items-center gap-1.5 font-bold tracking-wide">
          <ShoppingCart 
            className={`
              ${isSm ? "h-3.5 w-3.5" : "h-4.5 w-4.5"} 
              transition-transform duration-300 
              group-hover:rotate-[-10deg] group-hover:scale-110
            `} 
          />
          {medicine.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </span>
        
        {/* Shiny sweep effect */}
        <div className="absolute top-0 left-0 w-[150%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-120%] skew-x-[30deg] group-hover:translate-x-[120%] transition-transform duration-1000 ease-out z-0" />
      </Button>
    </>
  );
}