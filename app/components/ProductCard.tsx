"use client";

import { memo } from "react";
import { Card, CardContent, CardMedia, Typography, Button, Chip, Stack } from "@mui/material";
import { brandColors } from "../theme";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: "Coffee" | "Tea" | "Bakery" | "Dessert";
  image: string;
};

export const DEFAULT_PRODUCT_PRICE = 50;

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

function ProductCard({
  product,
  onAddToCart,
}: 
ProductCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "14px",
        boxShadow: 3,
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        image={`/${product.image}`}
        alt={product.name}
        sx={{
          height: 160,
          objectFit: "cover",
        }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
          "&:last-child": { pb: 2 },
        }}
      >
        <Chip
          label={product.category}
          size="small"
          variant="outlined"
          sx={{ alignSelf: "flex-start", mb: 1 }}
        />

        <Typography
            variant="h6"
            sx={{
            fontWeight: "bold"
        }}
        >
          {product.name}
        </Typography>

        <Stack
          direction="row"
          sx={{
            mt: "auto",
            pt: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ color: brandColors.caramelDark, fontWeight: 800 }}
          >
            ฿{product.price}
          </Typography>

          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: brandColors.espresso,
              color: brandColors.cream,
              px: 2.5,
              "&:hover": { bgcolor: "#210F05" },
            }}
            onClick={() => onAddToCart(product)}
          >
            Add
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
} 
export default memo(ProductCard);
