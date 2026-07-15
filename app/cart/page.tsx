"use client";

import { useMemo } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useCartContext } from "../context/CartContext";

export default function CartPage() {
  const { cart } = useCartContext();

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cart]);

  return (
    <Container sx={{ py: 5 }}>
      <Typography
        variant="h3"
        sx={{ 
        fontWeight: "bold",
        textAlign: "center",
        mb: 4,
        }}
        >
        🛒 Order Summary
      
      </Typography>

      {cart.length === 0 ? (
        <Typography align="center">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">
                  {item.name}
                </Typography>

                <Typography>
                  Category : {item.category}
                </Typography>

                <Typography>
                  Price : ฿{item.price}
                </Typography>

                <Typography>
                  Quantity : {item.quantity}
                </Typography>

                <Typography 
                sx={{ 
                fontWeight : "bold"
                }}>
                  Subtotal : ฿{item.price * item.quantity}
                </Typography>
              </CardContent>
            </Card>
          ))}

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="h4"
            sx={{
            textAlign: "right",
            fontWeight: "bold",
         }}
       >
            Total : ฿{totalPrice}
          </Typography>
        </>
      )}

      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          component={Link}
          href="/"
          variant="contained"
        >
          Back to Menu
        </Button>
      </Box>
    </Container>
  );
}