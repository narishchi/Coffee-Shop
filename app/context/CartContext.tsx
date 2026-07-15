"use client";

import { createContext, ReactNode, useContext } from "react";
import { useCart } from "../hooks/useCart";

type CartContextValue = ReturnType<typeof useCart>;

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartValue = useCart();

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext ต้องถูกเรียกใช้ภายใน <CartProvider>");
  }

  return context;
}