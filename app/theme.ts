import { createTheme } from "@mui/material/styles";

// โทนสีแบรนด์ร้านกาแฟ (ตามที่กำหนด 3 สี)
const espresso = "#361C0C"; // เข้มสุด
const caramel = "#A5652A"; // กลาง
const cream = "#F1E7D5"; // อ่อนสุด

// เฉดที่ derive จาก 3 สีหลัก ไว้ใช้กับ hover/พื้นผิวการ์ด (สีตระกูลเดียวกัน ไม่ใช่สีใหม่)
const espressoDark = "#210F05";
const caramelDark = "#7E4E20";
const paperCream = "#FBF6EC";
const mutedInk = "#6B4A2E";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: caramel,
      light: "#C08A52",
      dark: espresso,
      contrastText: cream,
    },
    secondary: {
      main: espresso,
      dark: espressoDark,
      contrastText: cream,
    },
    background: {
      default: cream,
      paper: paperCream,
    },
    text: {
      primary: espresso,
      secondary: mutedInk,
    },
    divider: "rgba(54, 28, 12, 0.14)",
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: "var(--font-kanit), 'Segoe UI', sans-serif",
    h3: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
      color: espresso,
    },
    h4: {
      fontWeight: 700,
      color: espresso,
    },
    h5: {
      fontWeight: 700,
      color: espresso,
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // พื้นหลังหลักของเว็บเป็นสีเข้มสุด (espresso) ตามดีไซน์ใหม่
        // ส่วนการ์ด/กล่องเนื้อหายังคงใช้สีอ่อนสุด (cream) ตัดกันด้านบน
        body: {
          backgroundColor: espresso,
          backgroundImage:
            "radial-gradient(circle at 15% 0%, rgba(165,101,42,0.22), transparent 45%), radial-gradient(circle at 85% 10%, rgba(165,101,42,0.14), transparent 50%)",
          backgroundAttachment: "fixed",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingLeft: 20,
          paddingRight: 20,
        },
        contained: {
          boxShadow: "0 6px 16px rgba(54, 28, 12, 0.25)",
          "&:hover": {
            boxShadow: "0 8px 20px rgba(54, 28, 12, 0.32)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // ใช้สีอ่อนสุด (cream) ตรงตามชุดสี 3 สีของแบรนด์ ให้การ์ดตัดกับพื้นหลังเข้มชัดเจน
          backgroundColor: cream,
          border: "1px solid rgba(54, 28, 12, 0.10)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 999,
        },
        outlined: {
          borderColor: "rgba(54, 28, 12, 0.35)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          backgroundColor: paperCream,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "0 10px 24px rgba(54, 28, 12, 0.35)",
        },
      },
    },
  },
});

export const brandColors = { espresso, caramel, cream, caramelDark, espressoDark };

export default theme;
