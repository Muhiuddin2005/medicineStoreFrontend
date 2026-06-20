"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Medicine } from "@/types";
import { toast } from "sonner";

interface CartContextType {
  cart: CartItem[];
  addToCart: (medicine: Medicine) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  setQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    const savedCart = localStorage.getItem("medistore-cart");
    if (savedCart) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCart(JSON.parse(savedCart));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        localStorage.removeItem("medistore-cart");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("medistore-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (medicine: Medicine) => {
    const existing = cart.find((item) => item.medicine.id === medicine.id);
    const currentQuantity = existing ? existing.quantity : 0;
    if (currentQuantity + 1 > medicine.stock) {
      toast.error(`Only ${medicine.stock} units available in stock.`);
      return;
    }

    if (existing) {
      toast.info(`Increased quantity for ${medicine.name}`);
      setCart((prev) =>
        prev.map((item) =>
          item.medicine.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      toast.success(`${medicine.name} added to cart`);
      setCart((prev) => [...prev, { medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.medicine.id !== id));
    toast.error("Item removed from cart");
  };

  const updateQuantity = (id: number, delta: number) => {
    const item = cart.find((i) => i.medicine.id === id);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty > item.medicine.stock) {
      toast.error(`Only ${item.medicine.stock} units available in stock.`);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.medicine.id === id
          ? { ...item, quantity: Math.max(1, newQty) }
          : item
      )
    );
  };

  const setQuantity = (id: number, quantity: number) => {
    const item = cart.find((i) => i.medicine.id === id);
    if (!item) return;
    if (quantity > item.medicine.stock) {
      toast.error(`Only ${item.medicine.stock} units available in stock.`);
      setCart((prev) =>
        prev.map((item) =>
          item.medicine.id === id
            ? { ...item, quantity: item.medicine.stock }
            : item
        )
      );
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.medicine.id === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("medistore-cart");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, setQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};