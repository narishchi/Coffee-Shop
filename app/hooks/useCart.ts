"use client";

import { useCallback, useEffect, useReducer } from "react";
import { Product } from "../components/ProductCard";
import { cartReducer, CartItem } from "../reducers/cartReducer";

const CART_STORAGE_KEY = "cart";

export function useCart() {
  const [cart, dispatch] = useReducer(cartReducer, [] as CartItem[]);

  // โหลด cart จาก localStorage ตอน mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (savedCart) {
      const items: CartItem[] = JSON.parse(savedCart);

      dispatch({
        type: "LOAD_CART",
        payload: items,
      });
    }
  }, []);

  // sync cart ลง localStorage ทุกครั้งที่ cart เปลี่ยน
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product: Product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
  }, []);

  return { cart, dispatch, addToCart };
}