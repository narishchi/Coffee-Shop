"use client";

import { useState, useMemo } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Box,
  Chip,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import ProductCard, { Product } from "./components/ProductCard";
import ProductOptionsDialog from "./components/ProductOptionsDialog";
import CartDrawer from "./components/CartDrawer";
import { useCartContext } from "./context/CartContext";
import { CartOptions } from "./reducers/cartReducer";
import { brandColors } from "./theme";

const products: Product[] = [
  { id: 1, name: "Cappuccino", price: 65, category: "Coffee", image: "cappu.jpg" },
  { id: 2, name: "Latte", price: 75, category: "Coffee", image: "lattee.jpg" },
  { id: 3, name: "Green Tea", price: 60, category: "Tea", image: "Gtea.jpg" },
  { id: 4, name: "Thai Tea", price: 65, category: "Tea", image: "thaitea.jpg" },
  { id: 5, name: "Croissant", price: 55, category: "Bakery", image: "cs.jpg" },
  { id: 6, name: "Cheesecake", price: 95, category: "Dessert", image: "c.jpg" },
  { id: 7, name: "Americano", price: 55, category: "Coffee", image: "ame.png" },
  { id: 8, name: "Mocha", price: 80, category: "Coffee", image: "Mocha.jpg" },
  { id: 9, name: "Earl Grey Tea", price: 60, category: "Tea", image: "earl.jpg" },
  { id: 10, name: "Peach Tea", price: 65, category: "Tea", image: "P.jpg" },
  { id: 11, name: "Butter Cookie", price: 45, category: "Bakery", image: "btcookie.jpg" },
  { id: 12, name: "Muffin", price: 50, category: "Bakery", image: "mff.jpg" },
  { id: 13, name: "Brownie", price: 75, category: "Dessert", image: "browni.jpg" },
];

// หมวดที่ต้องเลือกตัวเลือกก่อนเพิ่มลงตะกร้า (เครื่องดื่ม)
const CUSTOMIZABLE_CATEGORIES = ["Coffee", "Tea"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [optionsProduct, setOptionsProduct] = useState<Product | null>(null);

  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
    totalCount,
    warning,
    dismissWarning,
  } = useCartContext();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "All" || product.category === category;

      return matchSearch && matchCategory;
    });
  }, [search, category]);

  // กด Add to Cart: เครื่องดื่มต้องเลือกตัวเลือกก่อน ส่วนขนม/เบเกอรี่เพิ่มเข้าตะกร้าได้เลย
  const handleAddToCart = (product: Product) => {
    if (CUSTOMIZABLE_CATEGORIES.includes(product.category)) {
      setOptionsProduct(product);
    } else {
      addToCart(product);
    }
  };

  const handleConfirmOptions = (product: Product, options: CartOptions) => {
    addToCart(product, options);
  };

  return (
    <Container sx={{ py: 5, pb: 12 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
          textAlign: { xs: "center", md: "left" },
          mb: 5,
          py: { xs: 2, md: 3 },
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#F1E7D5",
              mb: 1,
              lineHeight: 1.1,
            }}
          >
            COFFEE
            <br />
            SHOP
          </Typography>
          <Typography sx={{ color: "rgba(241,231,213,0.8)" }}>
            กาแฟคั่วสด ชา และเบเกอรี่ เลือกได้ตามใจคุณ
          </Typography>
        </Box>

        <Box
          component="img"
          src="/coffee-hero.png"
          alt="แก้วกาแฟลาเต้อาร์ต"
          sx={{
            width: { xs: 220, sm: 230, md: 250 },
            height: "auto",
            objectFit: "contain",
            flexShrink: 0,
          }}
        />
      </Box>

      <TextField
        fullWidth
        label="ค้นหาเมนู..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                {search ? (
                  <IconButton
                    aria-label="ล้างช่องค้นหา"
                    size="small"
                    onClick={() => setSearch("")}
                  >
                    ✕
                  </IconButton>
                ) : (
                  <Box
                    component="svg"
                    viewBox="0 0 24 24"
                    sx={{ width: 22, height: 22, color: brandColors.espresso, opacity: 0.55 }}
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      d="M15.5 15.5 21 21M17 10.5A6.5 6.5 0 1 1 4 10.5a6.5 6.5 0 0 1 13 0Z"
                    />
                  </Box>
                )}
              </InputAdornment>
            ),
          },
        }}
      />

      <Box sx={{ display: "flex", gap: 1, mb: 4, flexWrap: "wrap" }}>
        {["All", "Coffee", "Tea", "Bakery", "Dessert"].map((item) => {
          const selected = category === item;
          return (
            <Chip
              key={item}
              label={item}
              clickable
              onClick={() => setCategory(item)}
              sx={{
                fontWeight: 600,
                bgcolor: selected ? brandColors.caramel : "transparent",
                color: brandColors.cream,
                border: `1px solid ${selected ? brandColors.caramel : "rgba(241,231,213,0.5)"}`,
                "&:hover": {
                  bgcolor: selected ? brandColors.caramel : "rgba(241,231,213,0.12)",
                },
              }}
            />
          );
        })}
      </Box>

      {filteredProducts.length === 0 ? (
        <Typography sx={{ textAlign: "center", color: "rgba(241,231,213,0.75)", py: 6 }}>
          ไม่พบเมนูที่ค้นหา ลองคำอื่นดูนะ
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      )}

      <ProductOptionsDialog
        product={optionsProduct}
        open={optionsProduct !== null}
        onClose={() => setOptionsProduct(null)}
        onConfirm={handleConfirmOptions}
      />

      <CartDrawer
        open={cartOpen}
        onOpen={() => setCartOpen(true)}
        onClose={() => setCartOpen(false)}
        cart={cart}
        totalPrice={totalPrice}
        totalCount={totalCount}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
      />

      <Snackbar
        open={warning !== null}
        autoHideDuration={3000}
        onClose={dismissWarning}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={dismissWarning} severity="warning" sx={{ width: "100%" }}>
          {warning}
        </Alert>
      </Snackbar>
    </Container>
  );
}