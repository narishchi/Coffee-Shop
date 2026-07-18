import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import ThemeRegistry from "./ThemeRegistry";

// Kanit: ฟอนต์ไทยแบบไม่มีหัว (loopless) อ่านง่าย โทนโมเดิร์น
const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Coffee Shop",
  description: "สั่งกาแฟ ชา และเบเกอรี่ออนไลน์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${kanit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeRegistry>
          <CartProvider>{children}</CartProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}