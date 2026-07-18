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
import { useRouter } from "next/navigation";
import { useCartContext } from "../context/CartContext";
import { brandColors } from "../theme";

export default function CartPage() {

  
  const { cart, clearCart } = useCartContext();
  const router = useRouter();

  const totalPrice = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
  }, [cart]);

  const handleBackToHome = () => {
    clearCart();
    router.push("/");
  };

  

  return (
    <Container sx={{ py: 5 }}>
      <Typography
        variant="h3"
        sx={{ 
        fontWeight: "bold",
        textAlign: "center",
        mb: 4,
        color: brandColors.cream,
        }}
        >
        🛒 สรุปคำสั่งซื้อ
      
      </Typography>

      {cart.length === 0 ? (
        <Typography align="center" sx={{ color: "rgba(241,231,213,0.8)" }}>
          ตะกร้าสินค้าว่างเปล่า
        </Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Card key={item.cartItemId} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">
                  {item.name}
                </Typography>

                <Typography>
                  หมวดหมู่ : {item.category}
                </Typography>

                {item.options && (
                  <Typography color="text.secondary">
                    {[
                      item.options.temperature,
                      item.options.sweetness ? `หวาน ${item.options.sweetness}` : null,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </Typography>
                )}

                <Typography>
                  ราคา : ฿{item.unitPrice}
                </Typography>

                <Typography>
                  จำนวน : {item.quantity}
                </Typography>

                <Typography 
                sx={{ 
                fontWeight : "bold"
                }}>
                  ยอดรวมย่อย : ฿{item.unitPrice * item.quantity}
                </Typography>
              </CardContent>
            </Card>
          ))}

          <Divider sx={{ my: 3, borderColor: "rgba(241,231,213,0.25)" }} />

          <Typography
            variant="h4"
            sx={{
            textAlign: "right",
            fontWeight: "bold",
            color: brandColors.cream,
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
          onClick={handleBackToHome}
          variant="contained"
          sx={{
            bgcolor: brandColors.cream,
            color: brandColors.espresso,
            "&:hover": { bgcolor: "#E4D5B8" },
          }}
        >
          กลับไปหน้าหลัก
        </Button>
      </Box>
    </Container>
  );
}