"use client";

import { useReducer, useEffect, useCallback } from "react";
import { cartReducer, CartItem } from "../reducers/cartReducer";
import { Product } from "../components/ProductCard";

export function useCart() {
  const [cart, dispatch] = useReducer(cartReducer, [] as CartItem[]);

  // โหลดตะกร้าจาก localStorage ตอนเปิดหน้าเว็บ (ครั้งเดียว)
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const items: CartItem[] = JSON.parse(savedCart);
      dispatch({ type: "LOAD_CART", payload: items });
    }
  }, []);

  // เซฟตะกร้าลง localStorage ทุกครั้งที่ cart เปลี่ยน
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  }, []);

  return { cart, dispatch, addToCart };
}