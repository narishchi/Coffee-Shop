# 673450037-2 naris
# HOOK ที่รับผิดชอบ

โปรเจกต์ Coffee Shop Ordering System มีการใช้งาน React Hooks หลายชนิด โดย Hook ที่รับผิดชอบคือ `useState`, `useEffect` และ `useReducer`

---

# 1. useState

## หลักการทำงาน

useState เป็น React Hook ที่ใช้สำหรับเก็บและจัดการข้อมูล (State) ภายใน Function Component เมื่อ State เปลี่ยนแปลง React จะ Render Component ใหม่เพื่อแสดงข้อมูลล่าสุด

โดย useState จะคืนค่ากลับมาเป็นอาร์เรย์ที่ประกอบด้วยค่าปัจจุบันของ State และฟังก์ชันสำหรับอัปเดตค่า

---

## ตัวอย่างโค้ด

```tsx
const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
```

เมื่อผู้ใช้พิมพ์ข้อความในช่องค้นหา

```tsx
<TextField
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
```

---

## เหตุผลที่เลือกใช้

ใช้สำหรับเก็บข้อมูลที่เปลี่ยนแปลงตลอดเวลา เช่น คำค้นหา และหมวดหมู่สินค้า เนื่องจากเป็นข้อมูลที่มีความซับซ้อนไม่มาก จึงเหมาะกับ useState

---

## ข้อดี

- ใช้งานง่าย
- เหมาะกับ State ขนาดเล็ก
- React Render อัตโนมัติเมื่อข้อมูลเปลี่ยน

---

## ข้อจำกัด

- หากมี State หลายตัวและมีเงื่อนไขจำนวนมาก โค้ดจะซับซ้อน
- ไม่เหมาะกับการจัดการข้อมูลที่มีหลาย Action


---

# 2. useEffect

## หลักการทำงาน

useEffect ใช้สำหรับทำงานหลังจาก Component Render เช่น โหลดข้อมูลจาก Local Storage ติดต่อ API หรือบันทึกข้อมูลเมื่อ State เปลี่ยน

โดยสามารถกำหนด Dependency เพื่อควบคุมว่าจะให้ Effect ทำงานเมื่อใด

---

## ตัวอย่างโค้ด

### โหลดข้อมูลจาก Local Storage

```tsx
useEffect(() => {
  const savedCart = localStorage.getItem("cart");

  if (savedCart) {
    // โหลดข้อมูล
  }
}, []);
```

### บันทึกข้อมูล

```tsx
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
```

---

## เหตุผลที่เลือกใช้

ใช้สำหรับโหลดข้อมูลตะกร้าสินค้าเมื่อเปิดเว็บ และบันทึกข้อมูลเมื่อมีการเปลี่ยนแปลงของตะกร้าสินค้า

---

## ข้อดี

- ใช้งานกับ Local Storage และ API ได้
- ควบคุมช่วงเวลาการทำงานได้ด้วย Dependency

---

## ข้อจำกัด

- หากกำหนด Dependency ไม่ถูกต้อง อาจเกิดการ Render ซ้ำหรือทำงานวนลูป


---

# 3. useReducer

## หลักการทำงาน

useReducer ใช้จัดการ State ที่มีหลายการทำงาน โดยใช้ Reducer เป็นตัวกำหนดการเปลี่ยนแปลงของข้อมูลผ่าน Action ต่าง ๆ

เมื่อเรียก dispatch() Reducer จะคำนวณและคืนค่า State ใหม่

---

## ตัวอย่างโค้ด

### ประกาศ Reducer

```tsx
const [cart, dispatch] = useReducer(cartReducer, []);
```

### เพิ่มสินค้า

```tsx
dispatch({
  type: "ADD_TO_CART",
  payload: { product, options },
});
```

payload เป็น object ที่มีทั้ง `product` และ `options` (เช่น ร้อน/เย็น, ความหวาน) ไม่ใช่แค่ตัว product เฉยๆ เพราะสินค้าตัวเดียวกันแต่เลือกตัวเลือกต่างกัน ต้องนับเป็นคนละบรรทัดในตะกร้า

### Reducer

```tsx
case "ADD_TO_CART": {
  const { product, options } = action.payload;
  const cartItemId = buildCartItemId(product.id, options);
  // ถ้ามีอยู่แล้ว (สินค้า+ตัวเลือกเดียวกัน) เพิ่มจำนวน
  // ถ้ายังไม่มี เพิ่มเป็นรายการใหม่
  ...
}
```

---

## เหตุผลที่เลือกใช้

ตะกร้าสินค้ามีหลาย Action เช่น เพิ่มสินค้า ลบสินค้า เพิ่มจำนวน และลดจำนวน จึงเหมาะกับ useReducer

---

## ข้อดี

- โค้ดเป็นระเบียบ
- แยก Logic ออกจาก UI
- เพิ่ม Action ใหม่ได้ง่าย

---

## ข้อจำกัด

- เขียนโค้ดมากกว่า useState
- ผู้เริ่มต้นอาจเข้าใจยากกว่า
  
---

# 673450206-5 irada
# HOOK ที่รับผิดชอบ

 `useMemo`, `useCallback`, `useContext` และ Custom Hook (`useCart`)

---

# 4. useMemo

## หลักการทำงาน

useMemo เป็น React Hook เก็บผลลัพธ์จากการคำนวณ เพื่อไม่ต้องคำนวณใหม่ทุกครั้งที่ Component Render จะคำนวณใหม่เมื่อข้อมูลที่เกี่ยวข้องมีการเปลี่ยนแปลง

---

## ตัวอย่างโค้ด

### 1. คำนวณราคารวมของสินค้าในตะกร้า

```tsx
const totalPrice = useMemo(
  () => cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
  [cart]
);
```

จากโค้ดใช้ `useMemo` เพื่อคำนวณราคาสินค้าทั้งหมดในตะกร้า จะคำนวณใหม่เมื่อข้อมูล `cart` มีการเปลี่ยนแปลง โดยใช้ฟิลด์ `unitPrice` (ราคาต่อชิ้นหลังบวกส่วนเสริม เช่น ตัวเลือกปั่น +15 บาท) ไม่ใช่ `price` ตรงๆ เพราะราคาจริงต้องรวมตัวเลือกเสริมเข้าไปด้วย

---

### 2. กรองรายการสินค้าในหน้าเมนูตามชื่อสินค้าและหมวดหมู่

```tsx
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
```

จากโค้ดใช้ `useMemo` ในการกรองสินค้า โดยจะทำงานใหม่เมื่อค่าการค้นหา (`search`) หรือหมวดหมู่สินค้า (`category`) เปลี่ยนแปลง

---

## เหตุผลที่เลือกใช้

เลือกใช้ useMemo เพราะในระบบมีการคำนวณข้อมูล เช่น การหาราคารวมของสินค้า และการกรองเมนูสินค้า ถ้าข้อมูลไม่ได้เปลี่ยนก็ไม่ต้องคำนวณใหม่ทุกครั้ง ลดการทำงานของระบบ

---

## ข้อดี

- ช่วยลดการคำนวณซ้ำ
- ระบบทำงานได้มีประสิทธิภาพมากขึ้น
- เหมาะกับข้อมูลที่ต้องผ่านการคำนวณก่อนนำไปแสดงผล

---

## ข้อจำกัด

- ไม่จำเป็นต่อการคำนวณที่ง่ายใช้เวลาไม่นาน
- ถ้าใช้มากไปโค้ดจะดูซับซ้อน งง


---

# 5. useCallback

## หลักการทำงาน

useCallback เป็น React Hook ใช้จดจำฟังก์ชัน เพื่อไม่ให้สร้างฟังก์ชันใหม่ทุกครั้งที่ Component Render โดยฟังก์ชันจะถูกสร้างใหม่เมื่อค่าที่กำหนดไว้ใน Dependency เปลี่ยนแปลง

---

## ตัวอย่างโค้ด

```tsx
const addToCart = useCallback(
  (product: Product, options?: CartOptions) => {
    const cartItemId = buildCartItemId(product.id, options);
    const existing = cart.find((item) => item.cartItemId === cartItemId);

    if (existing && existing.quantity >= MAX_QUANTITY_PER_ITEM) {
      setWarning(`${product.name} สั่งได้สูงสุด ${MAX_QUANTITY_PER_ITEM} แก้ว/ชิ้นต่อออเดอร์`);
      return;
    }

    dispatch({ type: "ADD_TO_CART", payload: { product, options } });
  },
  [cart]
);
```

`addToCart` อยู่ใน `useCart.ts` รับ 2 พารามิเตอร์คือ `product` และ `options` (ตัวเลือกร้อน/เย็น, ความหวาน) และมี dependency เป็น `[cart]` เพราะต้องเช็คจำนวนสูงสุดต่อชิ้น (`MAX_QUANTITY_PER_ITEM`) จาก cart ปัจจุบันก่อนเพิ่ม ไม่ใช่ deps ว่างเหมือนตัวอย่างพื้นฐาน

ฟังก์ชันนี้ถูกส่งลงมาผ่าน `useCartContext()` ไปจนถึงหน้า `page.tsx` แล้วห่อด้วย `handleAddToCart` อีกชั้นก่อนส่งให้ Component ลูก `ProductCard`

```tsx
<ProductCard product={product} onAddToCart={handleAddToCart} />
```

---

## เหตุผลที่เลือกใช้

เลือกใช้ useCallback กับฟังก์ชัน addToCart เพราะฟังก์ชันนี้ถูกส่งไปให้ Component `ProductCard` ใช้งาน และ ProductCard มีการใช้ `memo` เพื่อช่วยลดการ Render ที่ไม่จำเป็น

ถ้าไม่มี useCallback ฟังก์ชันจะถูกสร้างใหม่ทุกครั้งที่หน้าเว็บ Render ทำให้ Component ลูกอาจ Render ใหม่โดยไม่จำเป็น

**ข้อสังเกตในโค้ดปัจจุบัน:** `handleAddToCart` ใน `page.tsx` เป็นฟังก์ชันธรรมดา ยังไม่ได้ห่อด้วย `useCallback` แม้ตัว `addToCart` ข้างในจะเป็น useCallback แล้วก็ตาม ทำให้ทุกครั้งที่ `page.tsx` render ฟังก์ชันที่ส่งเข้า `ProductCard` (คือ `handleAddToCart`) จะถูกสร้างใหม่เสมอ ส่งผลให้ `React.memo` ที่ `ProductCard` ยังไม่ได้ประโยชน์เต็มที่ตามที่ตั้งใจไว้ ควรห่อ `handleAddToCart` ด้วย `useCallback` เพิ่มด้วย เพื่อให้การ memo ทำงานได้จริง

---

## ข้อดี

- ลดการ Render ที่ไม่จำเป็นของ Component ลูก
- ทำงานร่วมกับ React.memo ได้ดี
- ช่วยจัดการฟังก์ชันที่ต้องส่งผ่าน Props

---

## ข้อจำกัด

- ไม่จำเป็นสำหรับฟังก์ชันทั่วไปที่ไม่ได้ส่งไป Component อื่น
- ถ้าใช้เยอะเกินไปอาจทำให้โค้ดอ่านยากขึ้น


---

# 6. useContext

## หลักการทำงาน

useContext ใช้สำหรับส่งข้อมูลหรือฟังก์ชันจาก Component แม่ ไปให้ Component ลูกที่อยู่ลึกหลายชั้นได้โดยตรง โดยไม่ต้องส่งผ่าน Props ทีละชั้น (ไม่ต้องทำ Props Drilling)

ต้องมี `createContext` เพื่อสร้าง Context ขึ้นมาก่อน แล้วห่อ Component ที่ต้องการแชร์ข้อมูลด้วย `<Context.Provider value={...}>` จากนั้น Component ลูกเรียกใช้ผ่าน `useContext(Context)`

---

## ตัวอย่างโค้ด

### สร้าง Context (`app/context/CartContext.tsx`)

```tsx
const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartValue = useCart();

  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext ต้องถูกเรียกใช้ภายใน <CartProvider>");
  }

  return context;
}
```

### ห่อทั้งแอปด้วย Provider (`app/layout.tsx`)

```tsx
<CartProvider>{children}</CartProvider>
```

### เรียกใช้ข้อมูลตะกร้าจากหน้าไหนก็ได้

```tsx
const { cart, addToCart, totalPrice } = useCartContext();
```

หน้า `page.tsx` (หน้าเมนู) และ `cart/page.tsx` (หน้าสรุปคำสั่งซื้อ) ต่างก็เรียก `useCartContext()` ตัวเดียวกัน โดยไม่ต้องส่ง state ตะกร้าผ่าน Props ข้ามหน้าเลย

---

## เหตุผลที่เลือกใช้

ข้อมูลตะกร้าสินค้าต้องถูกใช้ในหลายหน้า (หน้าเมนู, ป้าย badge จำนวนสินค้า, หน้าสรุปคำสั่งซื้อ) ถ้าส่งผ่าน Props จะต้องส่งลึกหลายชั้นและซับซ้อนขึ้นเรื่อยๆ เมื่อโปรเจกต์ใหญ่ขึ้น จึงใช้ useContext รวมกับ Custom Hook (`useCart`) เพื่อให้ทุก Component เข้าถึง state และฟังก์ชันจัดการตะกร้าชุดเดียวกันได้โดยตรง

---

## ข้อดี

- ไม่ต้องทำ Props Drilling ส่งข้อมูลผ่านหลายชั้น
- ทุก Component ที่อยู่ภายใน Provider เข้าถึงข้อมูลชุดเดียวกันได้ ข้อมูล sync กันอัตโนมัติ
- แยก Logic การจัดการตะกร้าออกจาก UI ทำให้โค้ดอ่านง่ายขึ้น

---

## ข้อจำกัด

- ถ้า value ใน Context เปลี่ยนบ่อย Component ลูกที่ใช้ useContext จะ re-render ทุกครั้งที่ค่าเปลี่ยน แม้จะใช้แค่บางส่วนของ value ก็ตาม
- ถ้าเรียก `useCartContext()` นอก `<CartProvider>` จะ throw error ทันที ต้องระวังตอนวาง Provider ให้ครอบคลุมทุกหน้าที่ต้องใช้


---

# 7. Custom Hook: useCart

## หลักการทำงาน

Custom Hook คือฟังก์ชันที่ขึ้นต้นด้วย `use` และรวม Hook อื่นๆ (useState, useEffect, useReducer, useCallback, useMemo) ไว้ด้วยกัน เพื่อดึง Logic ที่ซับซ้อนออกจาก Component ไปไว้ในที่เดียว แล้วเรียกใช้ซ้ำได้จากหลายที่

---

## ตัวอย่างโค้ด

```tsx
export function useCart() {
  const [cart, dispatch] = useReducer(cartReducer, [] as CartItem[]);
  const [warning, setWarning] = useState<string | null>(null);

  // โหลด cart จาก localStorage ตอน mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
    }
  }, []);

  // sync cart ลง localStorage ทุกครั้งที่ cart เปลี่ยน
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart
  // ทุกตัวเป็น useCallback ทั้งหมด
  // totalPrice, totalCount เป็น useMemo

  return { cart, addToCart, increaseQuantity, decreaseQuantity,
           removeFromCart, clearCart, warning, dismissWarning,
           totalPrice, totalCount };
}
```

`useCart` ถูกเรียกใช้เพียงครั้งเดียวใน `CartProvider` (`app/context/CartContext.tsx`) แล้วส่งค่าที่ return ออกมาทั้งหมดเข้าไปใน `CartContext.Provider` เพื่อให้ทุกหน้าที่เรียก `useCartContext()` ใช้ state และฟังก์ชันชุดเดียวกัน

---

## เหตุผลที่เลือกใช้

Logic การจัดการตะกร้า (โหลด/บันทึก localStorage, เพิ่ม/ลบ/แก้จำนวนสินค้า, เช็ค MAX_QUANTITY, คำนวณราคารวม) มีความซับซ้อนและใช้ Hook หลายตัวร่วมกัน ถ้าเขียนไว้ใน Component โดยตรงจะทำให้ไฟล์ยาวและอ่านยาก จึงแยกออกมาเป็น Custom Hook เพื่อให้ `page.tsx` และ `cart/page.tsx` โฟกัสที่ UI อย่างเดียว

---

## ข้อดี

- รวม Logic ที่ซับซ้อนไว้ที่เดียว ไม่ต้องเขียนซ้ำในหลาย Component
- ทดสอบ (test) Logic แยกจาก UI ได้ง่ายกว่า
- Component ที่เรียกใช้อ่านง่ายขึ้น เพราะไม่ต้องเห็น Logic เบื้องหลังทั้งหมด

---

## ข้อจำกัด

- ถ้า Custom Hook ทำหลายอย่างเกินไปในตัวเดียว (เหมือน useCart ที่นี่ที่รวมทั้ง state, localStorage, warning, คำนวณราคา) จะเริ่มอ่านยากขึ้นเมื่อโปรเจกต์ใหญ่ขึ้น อาจต้องแยกย่อยเพิ่มในอนาคต
- ต้องระวังชื่อ Hook ให้ขึ้นต้นด้วย `use` เสมอ ไม่งั้น React จะไม่รู้ว่านี่คือ Hook (เช่น เรื่อง Rule of Hooks)

---

# คำถามอภิปราย (Discussion Questions)

โปรเจกต์: Coffee Shop Ordering System
สมาชิก: 673450037-2 naris, 673450206-5 irada

---

## 1. useReducer vs useState ต่างกันอย่างไร แล้วทำไมโปรเจกต์นี้ถึงใช้ useReducer จัดการตะกร้าสินค้า

`useState` เหมาะกับ State ที่เรียบง่าย เปลี่ยนแปลงตรงไปตรงมา เช่น ค่าค้นหา (`search`) หรือหมวดหมู่ที่เลือก (`category`) ในโปรเจกต์นี้

`useReducer` เหมาะกับ State ที่มีหลาย Action และ Logic การเปลี่ยนแปลงซับซ้อนกว่า เช่นตะกร้าสินค้าที่ต้องรองรับหลาย Action: `ADD_TO_CART`, `REMOVE_FROM_CART`, `INCREASE_QUANTITY`, `DECREASE_QUANTITY`, `LOAD_CART`, `CLEAR_CART` แต่ละ Action มีเงื่อนไขของตัวเอง (เช่น เช็ค `MAX_QUANTITY_PER_ITEM`, สร้าง `cartItemId` จาก product + options) ถ้าใช้ `useState` เพียงอย่างเดียวจะต้องเขียนฟังก์ชันแก้ไข Array แยกจำนวนมากกระจายอยู่ใน Component ทำให้โค้ดซับซ้อนและดูแลยาก การรวม Logic ไว้ใน `cartReducer.ts` ทำให้แยก Logic ออกจาก UI ชัดเจน และเพิ่ม Action ใหม่ในอนาคต (เช่นที่เพิ่ง เพิ่ม `CLEAR_CART`) ทำได้ง่ายโดยไม่กระทบส่วนอื่น

---

## 2. useMemo ช่วยอะไรในโปรเจกต์นี้ และถ้าไม่ใช้จะเกิดอะไรขึ้น

`useMemo` ใช้เก็บผลลัพธ์การคำนวณไว้ ไม่ต้องคำนวณใหม่ทุกครั้งที่ Component render ถ้าค่าที่อยู่ใน dependency array ไม่เปลี่ยน ในโปรเจกต์นี้ใช้กับ:
- `totalPrice` ใน `useCart.ts` — คำนวณราคารวมของตะกร้า คำนวณใหม่เฉพาะตอน `cart` เปลี่ยน
- `filteredProducts` ใน `page.tsx` — กรองสินค้าตามคำค้นหาและหมวดหมู่ คำนวณใหม่เฉพาะตอน `search` หรือ `category` เปลี่ยน

ถ้าไม่ใช้ `useMemo` ทุกครั้งที่ Component นี้ render (ไม่ว่าจะด้วยเหตุผลอะไรก็ตาม เช่น state อื่นที่ไม่เกี่ยวข้องเปลี่ยน) ฟังก์ชัน `.reduce()` และ `.filter()` จะถูกรันซ้ำใหม่ทุกครั้ง ซึ่งถ้ารายการสินค้าหรือตะกร้ามีจำนวนมากขึ้น จะเริ่มกระทบ performance โดยไม่จำเป็น

---

## 3. useCallback ต่างจาก useMemo อย่างไร แล้วทำไมต้องใช้คู่กับ React.memo

`useMemo` ใช้จดจำ "ค่าผลลัพธ์" จากการคำนวณ ส่วน `useCallback` ใช้จดจำ "ตัวฟังก์ชัน" เอง เพื่อไม่ให้ React สร้างฟังก์ชันใหม่ทุกครั้งที่ render (ปกติทุกครั้งที่ Component render ฟังก์ชันที่ประกาศข้างในจะถูกสร้างใหม่เสมอ ถึงแม้เนื้อหาข้างในจะเหมือนเดิมก็ตาม)

เหตุผลที่ต้องใช้คู่กับ `React.memo` (เช่นที่ `ProductCard.tsx` ห่อด้วย `memo()`) คือ `React.memo` จะเช็คว่า Props ที่ส่งเข้ามาเปลี่ยนหรือไม่แบบ shallow compare ถ้าฟังก์ชันที่ส่งเป็น Prop (เช่น `onAddToCart`) ถูกสร้างใหม่ทุกครั้ง (reference ไม่เท่าเดิม) `React.memo` จะมองว่า Props เปลี่ยนเสมอ แล้ว re-render Component ลูกอยู่ดี ทำให้ `memo()` ไม่ได้ประโยชน์อะไรเลย การห่อฟังก์ชันด้วย `useCallback` จึงช่วยให้ reference คงเดิมตราบใดที่ dependency ไม่เปลี่ยน ทำให้ `React.memo` ทำงานได้ตามที่ตั้งใจจริง

**ข้อสังเกตจากโค้ดจริงของโปรเจกต์นี้:** `addToCart` ใน `useCart.ts` ห่อด้วย `useCallback` แล้ว แต่ตอนส่งเข้า `ProductCard` ใน `page.tsx` มันถูกห่ออีกชั้นด้วย `handleAddToCart` ซึ่งเป็นฟังก์ชันธรรมดา ไม่ได้เป็น `useCallback` ทำให้ reference ของ `handleAddToCart` เปลี่ยนทุกครั้งที่ `page.tsx` render อยู่ดี และ `React.memo` ที่ `ProductCard` จึงยังไม่ได้ประโยชน์เต็มที่ตามทฤษฎีข้างต้น เป็นตัวอย่างที่ดีว่าทำไมต้องห่อ `useCallback` ให้ครบทุกชั้นของฟังก์ชันที่ส่งต่อกัน ไม่ใช่แค่ชั้นแรก

---

## 4. useContext ต่างจากการส่ง Props (Props Drilling) อย่างไร

Props Drilling คือการส่งข้อมูลจาก Component แม่ลงไปให้ Component ลูกที่อยู่ลึกหลายชั้น โดยต้องส่งผ่าน Props ทีละชั้นแม้ Component ระหว่างทางจะไม่ได้ใช้ข้อมูลนั้นเลยก็ตาม ยิ่งโครงสร้างลึกเท่าไหร่ ยิ่งต้องส่งผ่านมากขึ้น โค้ดจะรกและแก้ไขยาก

`useContext` แก้ปัญหานี้โดยสร้าง "จุดกลาง" (Context) ที่ Component ไหนก็ได้ที่อยู่ภายใน `Provider` เดียวกัน สามารถดึงข้อมูลไปใช้ได้โดยตรง โดยไม่ต้องส่งผ่าน Props ทีละชั้น

ในโปรเจกต์นี้ `CartContext` ห่อทั้งแอปไว้ใน `app/layout.tsx` ทำให้ทั้งหน้าเมนู (`page.tsx`) และหน้าสรุปคำสั่งซื้อ (`cart/page.tsx`) ดึงข้อมูลตะกร้าสินค้าผ่าน `useCartContext()` ได้ทันที โดยไม่ต้องส่ง state ตะกร้าข้ามหน้าผ่าน Props เลย ซึ่งถ้าใช้ Props Drilling จะทำไม่ได้อยู่แล้ว เพราะเป็นคนละหน้า (คนละ route) กัน ไม่ได้อยู่ใน Component tree เดียวกันตั้งแต่ต้น
