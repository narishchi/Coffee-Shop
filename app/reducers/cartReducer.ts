import { Product } from "../components/ProductCard";

export interface CartItem extends Product {
  quantity: number;
}

export type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "INCREASE_QUANTITY"; payload: number }
  | { type: "DECREASE_QUANTITY"; payload: number };

export const cartReducer = (
  state: CartItem[],
  action: CartAction
): CartItem[] => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exist = state.find(
        (item) => item.id === action.payload.id
      );

      if (exist) {
        return state.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...state,
        {
          ...action.payload,
          quantity: 1,
        },
      ];
    }

    case "REMOVE_FROM_CART":
      return state.filter(
        (item) => item.id !== action.payload
      );

    case "INCREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

    case "DECREASE_QUANTITY":
      return state
        .map((item) =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0);

    default:
      return state;
  }
};