# คำถามอภิปราย (Discussion Questions)

โปรเจกต์: Coffee Shop Ordering System
สมาชิก: 673450037-2 naris, 673450206-5 irada

---

## 1. เหตุใดจึงเลือกใช้ useReducer แทน useState ในการจัดการตะกร้าสินค้า

ตะกร้าสินค้ามี action เยอะ (เพิ่ม/ลบ/เพิ่มจำนวน/ลดจำนวน/โหลดจาก localStorage/เคลียร์ตะกร้า) แต่ละอันมีเงื่อนไขของตัวเอง ถ้าใช้ `useState` ต้องเขียนฟังก์ชันแก้ array กระจายเต็ม component รกและดูแลยาก `useReducer` รวม logic ไว้ที่เดียวใน `cartReducer.ts` แค่ dispatch action ไป ก็เพิ่ม/แก้ทีหลังได้ง่ายกว่า

---

## 2. useMemo ช่วยเพิ่มประสิทธิภาพของระบบอย่างไร

จำผลลัพธ์การคำนวณไว้ ไม่คิดใหม่ทุก render ถ้า dependency ไม่เปลี่ยน ใช้กับ `totalPrice` (คิดใหม่แค่ตอน `cart` เปลี่ยน) และ `filteredProducts` (กรองใหม่แค่ตอน `search`/`category` เปลี่ยน) ถ้าไม่ใช้ ทุก render จะรัน `.reduce()`/`.filter()` ซ้ำหมด ต่อให้ค่าไม่ได้เปลี่ยนก็ตาม พอข้อมูลเยอะขึ้นจะเริ่มหน่วง

---

## 3. useCallback มีประโยชน์ในสถานการณ์ใด และหากไม่ใช้จะเกิดผลอย่างไร

ใช้ตอนส่งฟังก์ชันเป็น prop ให้ component ที่ห่อด้วย `React.memo` (เช่น `ProductCard`) ปกติฟังก์ชันจะถูกสร้างใหม่ทุก render ทำให้ `memo` มองว่า prop เปลี่ยนตลอด แล้ว re-render ลูกอยู่ดี ไม่ได้ประโยชน์อะไรเลย `useCallback` ช่วยให้ reference คงเดิมถ้า dependency ไม่เปลี่ยน `memo` เลยทำงานได้จริง

**เจอในโค้ดจริง:** `addToCart` ห่อ `useCallback` แล้ว แต่ตอนส่งเข้า `ProductCard` ถูกห่ออีกชั้นด้วย `handleAddToCart` ที่เป็นฟังก์ชันธรรมดา ไม่ใช่ `useCallback` เลยยังเปลี่ยน reference ทุก render อยู่ดี `memo` ที่ ProductCard เลยยังไม่ได้ผลเต็มที่ — ต้องห่อให้ครบทุกชั้น ไม่ใช่แค่ชั้นแรก

---

## 4. useContext ต่างจากการส่ง Props ไปเรื่อยๆ (Props Drilling) อย่างไร

Props Drilling คือส่งข้อมูลผ่าน props ทีละชั้นลงไปจนถึงลูกที่ต้องใช้จริง แม้ชั้นระหว่างทางจะไม่ได้ใช้เลยก็ต้องรับส่งต่อ ยิ่งลึกยิ่งรก `useContext` สร้างจุดกลาง (Context) ให้ component ไหนก็ได้ใต้ `Provider` เดียวกันดึงข้อมูลไปใช้ตรงๆ ไม่ต้องส่งผ่านทีละชั้น

ในโปรเจกต์นี้ `CartContext` ห่อทั้งแอปที่ `layout.tsx` ทำให้ `page.tsx` กับ `cart/page.tsx` ดึงข้อมูลตะกร้าผ่าน `useCartContext()` ได้ทันทีทั้งที่เป็นคนละหน้ากัน ซึ่ง Props Drilling ทำแบบนี้ไม่ได้อยู่แล้วเพราะไม่ได้อยู่ใน component tree เดียวกัน
