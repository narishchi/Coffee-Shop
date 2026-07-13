"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { CartItem, CartAction } from "../reducers/cartReducer";

type CartProps = {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
};

export default function Cart({ cart, dispatch }: CartProps) {
  // ใช้ useMemo คำนวณราคารวม
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cart]);

  return (
    <Card sx={{ mt: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          🛒 Shopping Cart
        </Typography>

        {cart.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          <>
            {cart.map((item) => (
              <Stack
                direction="row"
                spacing={1}
                >
                <div>
                  <Typography
                    sx={{
                    fontWeight: "bold",
                }}
                >
                    {item.name}
                  </Typography>

                  <Typography>
                    ฿{item.price} × {item.quantity}
                  </Typography>
                </div>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      dispatch({
                        type: "DECREASE_QUANTITY",
                        payload: item.id,
                      })
                    }
                  >
                    -
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() =>
                      dispatch({
                        type: "INCREASE_QUANTITY",
                        payload: item.id,
                      })
                    }
                  >
                    +
                  </Button>

                  <Button
                    color="error"
                    variant="contained"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: item.id,
                      })
                    }
                  >
                    Remove
                  </Button>
                </Stack>
              </Stack>
            ))}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">
              Total : ฿{totalPrice}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}