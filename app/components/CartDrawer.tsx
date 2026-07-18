"use client";

import {
  Drawer,
  Fab,
  Badge,
  Box,
  Typography,
  Stack,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import { CartItem } from "../reducers/cartReducer";
import { brandColors } from "../theme";

type CartDrawerProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  cart: CartItem[];
  totalPrice: number;
  totalCount: number;
  onIncrease: (cartItemId: string) => void;
  onDecrease: (cartItemId: string) => void;
  onRemove: (cartItemId: string) => void;
};

function formatOptions(item: CartItem) {
  if (!item.options) return null;
  const parts: string[] = [];
  if (item.options.temperature) parts.push(item.options.temperature);
  if (item.options.sweetness) parts.push(`หวาน ${item.options.sweetness}`);
  return parts.length ? parts.join(" · ") : null;
}

export default function CartDrawer({
  open,
  onOpen,
  onClose,
  cart,
  totalPrice,
  totalCount,
  onIncrease,
  onDecrease,
  onRemove,
}: CartDrawerProps) {
  return (
    <>
      {/* ปุ่มตะกร้าลอย เปิดป๊อปอัพ — ใช้สีกลาง (caramel) ตัดกับพื้นหลังเข้ม (espresso) ของหน้าเว็บ ไม่ให้กลืนไปกับพื้นหลัง */}
      <Fab
        variant="extended"
        onClick={onOpen}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1200,
          bgcolor: brandColors.caramel,
          color: brandColors.cream,
          fontWeight: 700,
          px: 3,
          boxShadow: "0 10px 26px rgba(0,0,0,0.45)",
          "&:hover": {
            bgcolor: brandColors.espressoDark,
          },
        }}
      >
        <Badge
          badgeContent={totalCount}
          sx={{
            mr: 1.5,
            "& .MuiBadge-badge": {
              bgcolor: brandColors.espresso,
              color: brandColors.cream,
            },
          }}
        >
          🛒
        </Badge>
        ตะกร้า
      </Fab>

      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box
          sx={{
            width: { xs: "100vw", sm: 380 },
            p: 3,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Stack
            direction="row"
            sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography variant="h5" sx={{ color: "primary.dark" }}>
              🛒 ตะกร้าสินค้า
            </Typography>
            <IconButton onClick={onClose}>✕</IconButton>
          </Stack>

          <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            {cart.length === 0 ? (
              <Typography>ตะกร้าว่างเปล่า</Typography>
            ) : (
              cart.map((item) => (
                <Box key={item.cartItemId} sx={{ mb: 2 }}>
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {item.name}
                      </Typography>
                      {formatOptions(item) && (
                        <Typography variant="body2" color="text.secondary">
                          {formatOptions(item)}
                        </Typography>
                      )}
                      <Typography variant="body2">
                        ฿{item.unitPrice} × {item.quantity}
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => onDecrease(item.cartItemId)}
                      >
                        -
                      </Button>
                      <Typography sx={{ minWidth: 20, textAlign: "center" }}>
                        {item.quantity}
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => onIncrease(item.cartItemId)}
                      >
                        +
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={() => onRemove(item.cartItemId)}
                      >
                        ลบ
                      </Button>
                    </Stack>
                  </Stack>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))
            )}
          </Box>

          <Box sx={{ pt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              รวมทั้งหมด : ฿{totalPrice}
            </Typography>
            <Button
              component={Link}
              href="/cart"
              variant="contained"
              color="secondary"
              fullWidth
              disabled={cart.length === 0}
              onClick={onClose}
            >
              ชำระเงิน
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}